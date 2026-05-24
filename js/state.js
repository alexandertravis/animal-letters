window.APP = window.APP || {};

(function (APP) {
  // Default max length = longest name in the animal list (so all animals are in play by default).
  // data/animals.js loads before state.js, so APP.ANIMALS is available here.
  const _lengths = (APP.ANIMALS || []).map(a => a.name.length);
  const _maxInList = _lengths.length ? Math.max(..._lengths) : 6;

  const DEFAULT_SETTINGS = {
    maxLength: _maxInList,
    letterCase: "upper",   // "upper" | "proper" | "lower"
    depiction: "cartoon",  // "cartoon" | "realistic"
    revealMode: "faint",   // "faint" | "hidden"
    gameMode: "trace",     // "trace" | "find"
    volume: 0.7,           // 0–1
    lastVolume: 0.7,       // last non-zero volume; restored when un-muting from 0
    muted: false,
    locale: "en",          // "en" | "pt" | … — overwritten by APP.loadLocale() on boot
    phonics: true,         // speak letter name aloud after each trace
  };

  // ── Locale-independent animal ID (private copy) ──────────────────────────
  // APP.animalId (utils.js) is not yet loaded when state.js executes, so we
  // define the same logic privately for use during the migration below.
  // At runtime (startGame, advanceLetter) APP.animalId is always available.
  function _animalId(animal) {
    return animal.images.cartoon.split('/').pop().replace('.svg', '');
  }

  // ── Persisted progress ───────────────────────────────────────────────────
  // Load completedAnimals and animalCompletionCounts from localStorage so the
  // gallery survives page reloads. Wrapped in try/catch — private browsing
  // or storage-quota errors should never crash the game.
  const _saved = (() => {
    try { return JSON.parse(localStorage.getItem('animalProgress') || '{}'); }
    catch (_) { return {}; }
  })();

  // Migrate old-format completedAnimals. Before this change, entries were stored
  // as uppercase animal names (e.g. 'DOG'). Now they are locale-independent IDs
  // derived from the image path (e.g. 'dog'). Convert any old entries on first load.
  function _migrateCompletedAnimals(saved) {
    if (!saved || saved.length === 0) return [];
    // New format is always lowercase — if all entries are already lowercase, no migration needed.
    if (saved.every(s => s === s.toLowerCase())) return saved;
    const allAnimals = [...(APP.ANIMALS || []), ...(APP.ANIMALS_PT || [])];
    const nameToId = {};
    allAnimals.forEach(a => { nameToId[a.name] = _animalId(a); });
    // deduplicate with Set in case two names mapped to the same creature
    return [...new Set(saved.map(name => nameToId[name]).filter(Boolean))];
  }

  // Migrate animalCompletionCounts the same way: rekey from name → id.
  function _migrateCompletionCounts(saved) {
    if (!saved || typeof saved !== 'object') return {};
    const keys = Object.keys(saved);
    if (keys.length === 0) return {};
    if (keys.every(k => k === k.toLowerCase())) return saved; // already new format
    const allAnimals = [...(APP.ANIMALS || []), ...(APP.ANIMALS_PT || [])];
    const nameToId = {};
    allAnimals.forEach(a => { nameToId[a.name] = _animalId(a); });
    const out = {};
    keys.forEach(name => {
      const id = nameToId[name];
      if (id) out[id] = (out[id] || 0) + saved[name];
    });
    return out;
  }

  APP.state = {
    screen: "landing",     // "landing" | "setup" | "game" | "complete" | "gallery"
    settings: { ...DEFAULT_SETTINGS },
    currentAnimal: null,   // { name, displayName, images, audio }
    letterIndex: 0,        // index into currentAnimal.name
    completedLetters: [],  // letters already finished this animal
    sessionExists: false,  // true once a game has been started this session
    completedAnimals: new Set(_migrateCompletedAnimals(_saved.completedAnimals || [])),

    // ── Completion tracking ───────────────────────────────────────────────────
    // Per-animal completion counts. Incremented each time the child traces every
    // letter of an animal (skip does not count). Keyed by animal ID (image stem).
    // Reserved for the upcoming challenges feature.
    animalCompletionCounts: _migrateCompletionCounts(_saved.animalCompletionCounts || {}),

    // Counts how many consecutively completed animals were already in the gallery
    // (i.e. previously found). Resets to 0 whenever an unfound animal is presented.
    // When it reaches 2, pickNext() biases the next selection toward unfound animals.
    consecutiveFoundCount: 0,

    // ── Letter mastery tracking ───────────────────────────────────────────────
    // Per-character tracing history. Keyed by the cased character (e.g. 'A', 'a').
    // Each entry: { attempts: number, bestStars: 0|1|2|3 }
    letterMastery: {},

    // ── Story library (transient — not persisted) ─────────────────────────────
    // Stories that just became unlocked by the last animal completion.
    // Read by complete.js to show the unlock banner; cleared after navigation.
    newlyUnlockedStories: [],
    // Story currently open in the reader. Set by library.js / complete.js.
    currentStory: null,
    currentPage:  0,
    // Active library/reader theme (transient, session-only). Switchable from the
    // header dropdown on the library screen. Drives BOTH the shelf room AND every
    // book cover/spread skin together (see APP.LIBRARY_THEMES below).
    libraryTheme: "storybook",   // key into APP.LIBRARY_THEMES
  };

  // ── Library / reader theme ─────────────────────────────────────────────────
  // One dial drives the shelf room AND the book skin together. Each story carries
  // both a `leather` (classic) and a `board` (watercolour) colour so it renders in
  // whichever theme is active. Shared by js/screens/library.js (shelf + cover) and
  // js/screens/storyreader.js (open spread + cover).
  APP.LIBRARY_THEMES = {
    storybook: { label: "Storybook", shelf: "skin-storybook", book: "watercolour" },
    walnut:    { label: "Walnut",    shelf: "skin-walnut",    book: "classic"     },
    // Plain, unskinned baseline (flat covers + cream pages + plain text) for testing.
    basic:     { label: "Basic",     shelf: "skin-basic",     book: "basic"       },
  };
  APP.DEFAULT_LIBRARY_THEME = "storybook";

  // Resolve the active theme object (falls back to default if unset/invalid).
  APP.activeTheme = function () {
    const key = APP.LIBRARY_THEMES[APP.state.libraryTheme]
      ? APP.state.libraryTheme : APP.DEFAULT_LIBRARY_THEME;
    return APP.LIBRARY_THEMES[key];
  };
  // Convenience: the book skin ('classic' | 'watercolour') for the active theme.
  APP.activeBookSkin = function () { return APP.activeTheme().book; };

  // Writes gallery progress to localStorage. Called after every animal completion.
  // Settings and in-progress game state are intentionally not persisted.
  APP.saveProgress = function () {
    try {
      localStorage.setItem('animalProgress', JSON.stringify({
        completedAnimals: [...APP.state.completedAnimals],
        animalCompletionCounts: APP.state.animalCompletionCounts,
      }));
    } catch (_) {}
  };

  APP.clearProgress = function () {
    try { localStorage.removeItem('animalProgress'); } catch (_) {}
    APP.state.completedAnimals = new Set();
    APP.state.animalCompletionCounts = {};
    APP.state.consecutiveFoundCount = 0;
  };

  // ── Letter mastery persistence ────────────────────────────────────────────

  APP.recordLetterTrace = function (char, stars) {
    const m = APP.state.letterMastery;
    if (!m[char]) m[char] = { attempts: 0, bestStars: 0 };
    m[char].attempts++;
    if (stars > m[char].bestStars) m[char].bestStars = stars;
    APP.saveMastery();
  };

  APP.saveMastery = function () {
    try {
      localStorage.setItem('letterMastery', JSON.stringify(APP.state.letterMastery));
    } catch (_) {}
  };

  APP.loadMastery = function () {
    try {
      const raw = localStorage.getItem('letterMastery');
      if (raw) APP.state.letterMastery = JSON.parse(raw);
    } catch (_) {}
  };

  APP.clearMastery = function () {
    APP.state.letterMastery = {};
    try { localStorage.removeItem('letterMastery'); } catch (_) {}
  };

  APP.resetSettings = function () {
    APP.state.settings = { ...DEFAULT_SETTINGS };
  };

  APP.startGame = function (animal) {
    // Reset the consecutive-found counter whenever the child is given an animal
    // they haven't completed before — presenting a fresh challenge breaks the streak.
    if (!APP.state.completedAnimals.has(APP.animalId(animal))) {
      APP.state.consecutiveFoundCount = 0;
    }
    APP.state.currentAnimal = animal;
    APP.state.letterIndex = 0;
    APP.state.completedLetters = [];
    APP.state.sessionExists = true;
    APP.state.screen = "game";
  };

  APP.advanceLetter = function () {
    const animal = APP.state.currentAnimal;
    if (!animal) return;
    APP.state.completedLetters.push(animal.name[APP.state.letterIndex]);
    APP.state.letterIndex += 1;
    if (APP.state.letterIndex >= animal.name.length) {
      const id = APP.animalId(animal);

      // Check before adding — was this animal already found before this completion?
      const alreadyFound = APP.state.completedAnimals.has(id);

      // Snapshot which stories are unlocked BEFORE changing counts, so we can
      // detect stories that become newly unlocked by this completion.
      // APP.getUnlockedStories is defined in utils.js (loaded after state.js)
      // but is always available by the time advanceLetter() is called at runtime.
      const _prevUnlocked = APP.getUnlockedStories
        ? new Set(APP.getUnlockedStories().map(function (s) { return s.id; }))
        : new Set();

      // Increment per-animal completion count (keyed by locale-independent id).
      APP.state.animalCompletionCounts[id] =
        (APP.state.animalCompletionCounts[id] || 0) + 1;

      // Track consecutive already-found completions so pickNext() can bias toward
      // unfound animals once the streak reaches 2.
      if (alreadyFound) {
        APP.state.consecutiveFoundCount++;
      }

      // Only mark as completed when the child traced every letter themselves.
      APP.state.completedAnimals.add(id);
      APP.saveProgress();

      // Detect stories newly unlocked by this completion.
      if (APP.getUnlockedStories) {
        APP.state.newlyUnlockedStories = APP.getUnlockedStories().filter(function (s) {
          return !_prevUnlocked.has(s.id);
        });
      }

      APP.state.screen = "complete";
    }
  };

  APP.skipAnimal = function () {
    // Pick a new animal without going through the complete screen.
    // Does not count as a completion — completedAnimals is not updated.
    const next = APP.animals
      ? APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal)
      : null;
    if (next) {
      APP.state.currentAnimal = next;
      APP.state.letterIndex = 0;
      APP.state.completedLetters = [];
    } else {
      // No eligible animals left — go home rather than loop forever.
      APP.state.screen = "landing";
    }
  };

  // ── Centralised state mutation ───────────────────────────────────────────
  // Apply a partial patch to APP.state. Prefer this over direct property
  // assignment in screen modules so mutations are easy to grep and future
  // subscriber hooks can be added here without touching every call site.
  APP.setState = function (patch) {
    Object.assign(APP.state, patch);
  };

  // ── Story navigation helper ──────────────────────────────────────────────
  // Open a story in the reader. Used by complete.js (read-now banner) and
  // library.js (book card click) so the three-line setup is not duplicated.
  APP.goToStory = function (story, ctx) {
    APP.setState({ currentStory: story, currentPage: 0, newlyUnlockedStories: [] });
    ctx.go('storyreader');
  };

  APP.goHome = function () {
    APP.state.screen = "landing";
  };

  // Load letter mastery from localStorage on startup (mirrors the inline _saved
  // load for animal progress above, but uses a method since it runs after
  // APP.loadMastery is defined).
  APP.loadMastery();
})(window.APP);

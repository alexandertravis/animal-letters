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
    volume: 0.7,           // 0–1
    muted: false
  };

  // ── Persisted progress ───────────────────────────────────────────────────
  // Load completedAnimals and animalCompletionCounts from localStorage so the
  // gallery survives page reloads. Wrapped in try/catch — private browsing
  // or storage-quota errors should never crash the game.
  const _saved = (() => {
    try { return JSON.parse(localStorage.getItem('animalProgress') || '{}'); }
    catch (_) { return {}; }
  })();

  APP.state = {
    screen: "landing",     // "landing" | "setup" | "game" | "complete" | "gallery"
    settings: { ...DEFAULT_SETTINGS },
    currentAnimal: null,   // { name, displayName, images, audio }
    letterIndex: 0,        // index into currentAnimal.name
    completedLetters: [],  // letters already finished this animal
    sessionExists: false,  // true once a game has been started this session
    completedAnimals: new Set(_saved.completedAnimals || []),

    // ── Completion tracking ───────────────────────────────────────────────────
    // Per-animal completion counts. Incremented each time the child traces every
    // letter of an animal (skip does not count). Keyed by animal.name.
    // Reserved for the upcoming challenges feature.
    animalCompletionCounts: _saved.animalCompletionCounts || {},

    // Counts how many consecutively completed animals were already in the gallery
    // (i.e. previously found). Resets to 0 whenever an unfound animal is presented.
    // When it reaches 2, pickNext() biases the next selection toward unfound animals.
    consecutiveFoundCount: 0,
  };

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

  APP.resetSettings = function () {
    APP.state.settings = { ...DEFAULT_SETTINGS };
  };

  APP.startGame = function (animal) {
    // Reset the consecutive-found counter whenever the child is given an animal
    // they haven't completed before — presenting a fresh challenge breaks the streak.
    if (!APP.state.completedAnimals.has(animal.name)) {
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
      // Check before adding — was this animal already found before this completion?
      const alreadyFound = APP.state.completedAnimals.has(animal.name);

      // Increment per-animal completion count (keyed by name).
      // Used by the upcoming challenges feature; also drives consecutiveFoundCount.
      APP.state.animalCompletionCounts[animal.name] =
        (APP.state.animalCompletionCounts[animal.name] || 0) + 1;

      // Track consecutive already-found completions so pickNext() can bias toward
      // unfound animals once the streak reaches 2.
      if (alreadyFound) {
        APP.state.consecutiveFoundCount++;
      }

      // Only mark as completed when the child traced every letter themselves.
      APP.state.completedAnimals.add(animal.name);
      APP.saveProgress();
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

  APP.goHome = function () {
    APP.state.screen = "landing";
  };
})(window.APP);

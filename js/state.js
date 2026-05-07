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

  APP.state = {
    screen: "landing",     // "landing" | "setup" | "game" | "complete" | "gallery"
    settings: { ...DEFAULT_SETTINGS },
    currentAnimal: null,   // { name, displayName, images, audio }
    letterIndex: 0,        // index into currentAnimal.name
    completedLetters: [],  // letters already finished this animal
    sessionExists: false,  // true once a game has been started this session
    completedAnimals: new Set() // animal names fully traced this session
  };

  APP.resetSettings = function () {
    APP.state.settings = { ...DEFAULT_SETTINGS };
  };

  APP.startGame = function (animal) {
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
      // Only mark as completed when the child traced every letter themselves.
      APP.state.completedAnimals.add(animal.name);
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

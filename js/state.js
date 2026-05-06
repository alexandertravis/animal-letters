window.APP = window.APP || {};

(function (APP) {
  const DEFAULT_SETTINGS = {
    maxLength: 5,
    letterCase: "upper",   // "upper" | "lower"
    depiction: "cartoon",  // "cartoon" | "realistic"
    revealMode: "faint"    // "faint" | "hidden"
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

  APP.restartLetter = function () {
    // Tracer module re-renders current letter; nothing to mutate here.
  };

  APP.skipAnimal = function () {
    APP.state.screen = "complete";
  };

  APP.goHome = function () {
    APP.state.screen = "landing";
  };
})(window.APP);

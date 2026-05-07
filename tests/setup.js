/**
 * tests/setup.js
 *
 * Bootstraps window.APP by loading the four pure-logic modules in the correct
 * dependency order. Must run before any test file.
 *
 * Load order (mirrors index.html, critical):
 *   1. data/animals.js   → APP.ANIMALS[]
 *   2. js/state.js       → APP.state, APP.startGame(), etc.
 *   3. js/letterData.js  → APP.LETTERS{}, APP.getLetter(), APP.GUIDE_CONFIG
 *   4. js/utils.js       → APP.caseOf(), APP.isDot(), etc.
 *   5. js/animals.js     → APP.animals.pickRandom(), .pickNext(), .eligibleCount()
 *
 * IMPORTANT: global.window = global MUST come before any import so that
 * the IIFE modules that read/write window.APP find the expected global object.
 */

// Step 1 — make `window` === `global` so IIFEs attach to the right object.
global.window = global;

// Step 2 — load modules as side-effects in dependency order.
await import('../data/animals.js');
await import('../js/state.js');
await import('../js/letterData.js');
await import('../js/utils.js');
await import('../js/animals.js');

// Step 3 — snapshot the original ANIMALS array so tests can restore it.
const ORIGINAL_ANIMALS = [...global.APP.ANIMALS];

// Step 4 — before each test: reset all mutable APP.state fields so tests
// never accidentally share state with each other.
beforeEach(() => {
  // Restore ANIMALS in case a test replaced it.
  global.APP.ANIMALS = [...ORIGINAL_ANIMALS];

  // Reset state to a clean slate.
  global.APP.state.screen = 'landing';
  global.APP.state.currentAnimal = null;
  global.APP.state.letterIndex = 0;
  global.APP.state.completedLetters = [];
  global.APP.state.sessionExists = false;
  global.APP.state.completedAnimals = new Set();
  global.APP.state.animalCompletionCounts = {};
  global.APP.state.consecutiveFoundCount = 0;

  // Reset settings to defaults.
  global.APP.state.settings = {
    maxLength: 6,
    letterCase: 'upper',
    depiction: 'cartoon',
    revealMode: 'faint',
    volume: 0.7,
    muted: false,
  };
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

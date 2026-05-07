/**
 * tests/fixtures.js
 *
 * Shared test fixtures and factory functions for the letter-tracing game test suite.
 * Import what you need in individual test files:
 *
 *   import { makeAnimal, makeGlyph, ANIMALS_FIXTURE, DOT_STROKE_PATH,
 *            NORMAL_STROKE_PATH, mockLocalStorage } from './fixtures.js';
 *
 * All data shapes mirror the live source files exactly:
 *   - Animal objects  → data/animals.js / APP.ANIMALS[]
 *   - Glyph objects   → js/letterData.js / APP.LETTERS{}
 *   - Dot path format → js/utils.js / APP.isDot()
 */

// ---------------------------------------------------------------------------
// 1. makeAnimal — animal object factory
// ---------------------------------------------------------------------------

/**
 * Returns a minimal, fully-valid animal object matching the shape used in
 * data/animals.js and consumed by APP.startGame(), APP.animals.pickRandom(),
 * and the game/complete screens.
 *
 * @param {object} [overrides={}] - Any fields to override on the default object.
 * @returns {{ name: string, displayName: string, images: { cartoon: string, realistic: string }, audio: string }}
 *
 * @example
 * const dog = makeAnimal({ name: 'DOG', displayName: 'Dog' });
 * const longAnimal = makeAnimal({ name: 'RABBIT', displayName: 'Rabbit' });
 */
export function makeAnimal(overrides = {}) {
  const base = {
    name: 'CAT',
    displayName: 'Cat',
    images: {
      cartoon:   'assets/images/cartoon/cat.svg',
      realistic: 'assets/images/realistic/cat.jpg',
    },
    audio: 'assets/audio/cat.mp3',
  };

  // Deep-merge the images sub-object so a partial override like
  // { images: { cartoon: 'foo.svg' } } doesn't wipe out `realistic`.
  const merged = { ...base, ...overrides };
  if (overrides.images) {
    merged.images = { ...base.images, ...overrides.images };
  }
  return merged;
}

// ---------------------------------------------------------------------------
// 2. makeGlyph — letter glyph object factory
// ---------------------------------------------------------------------------

/**
 * Returns a minimal, fully-valid glyph object matching the shape stored in
 * APP.LETTERS[char] (see js/letterData.js). Suitable for injecting into
 * APP.getLetter() return values or directly into tracer tests.
 *
 * Default is a two-stroke uppercase-style glyph (viewBox '0 0 200 250').
 * Override `viewBox` to '0 0 200 268' for lowercase glyph tests.
 *
 * @param {object} [overrides={}] - Any fields to override on the default object.
 * @returns {{ viewBox: string, strokes: Array<{ d: string }> }}
 *
 * @example
 * const singleStroke = makeGlyph({ strokes: [{ d: 'M 50,30 L 50,220' }] });
 * const lowercase = makeGlyph({ viewBox: '0 0 200 268', strokes: [{ d: 'M 100,110 L 100,210' }] });
 */
export function makeGlyph(overrides = {}) {
  const base = {
    viewBox: '0 0 200 250',
    strokes: [
      { d: 'M 100,30 L 30,220' },   // left diagonal — mirrors LETTERS['A'] stroke 1
      { d: 'M 100,30 L 170,220' },  // right diagonal — mirrors LETTERS['A'] stroke 2
    ],
  };

  const merged = { ...base, ...overrides };
  // If the caller supplies strokes, use them as-is (no deep merge needed here).
  return merged;
}

// ---------------------------------------------------------------------------
// 3. ANIMALS_FIXTURE — small controlled animal array
// ---------------------------------------------------------------------------

/**
 * A hardcoded array of 6 animals with names of varying lengths for use in
 * tests that set APP.ANIMALS = ANIMALS_FIXTURE. Using this instead of the
 * full 25-animal list keeps tests deterministic and fast.
 *
 * Breakdown:
 *   3-letter: ANT, BEE, CAT
 *   4-letter: BEAR, DUCK
 *   6-letter: RABBIT
 *
 * All names are UPPERCASE, matching the data/animals.js convention where
 * APP.caseOf() applies the display-case transform at render time.
 *
 * @type {Array<{ name: string, displayName: string, images: { cartoon: string, realistic: string }, audio: string }>}
 */
export const ANIMALS_FIXTURE = [
  {
    name: 'ANT',
    displayName: 'Ant',
    images: {
      cartoon:   'assets/images/cartoon/ant.svg',
      realistic: 'assets/images/realistic/ant.jpg',
    },
    audio: 'assets/audio/ant.mp3',
  },
  {
    name: 'BEE',
    displayName: 'Bee',
    images: {
      cartoon:   'assets/images/cartoon/bee.svg',
      realistic: 'assets/images/realistic/bee.jpg',
    },
    audio: 'assets/audio/bee.mp3',
  },
  {
    name: 'CAT',
    displayName: 'Cat',
    images: {
      cartoon:   'assets/images/cartoon/cat.svg',
      realistic: 'assets/images/realistic/cat.jpg',
    },
    audio: 'assets/audio/cat.mp3',
  },
  {
    name: 'BEAR',
    displayName: 'Bear',
    images: {
      cartoon:   'assets/images/cartoon/bear.svg',
      realistic: 'assets/images/realistic/bear.jpg',
    },
    audio: 'assets/audio/bear.mp3',
  },
  {
    name: 'DUCK',
    displayName: 'Duck',
    images: {
      cartoon:   'assets/images/cartoon/duck.svg',
      realistic: 'assets/images/realistic/duck.jpg',
    },
    audio: 'assets/audio/duck.mp3',
  },
  {
    name: 'RABBIT',
    displayName: 'Rabbit',
    images: {
      cartoon:   'assets/images/cartoon/rabbit.svg',
      realistic: 'assets/images/realistic/rabbit.jpg',
    },
    audio: 'assets/audio/rabbit.mp3',
  },
];

// ---------------------------------------------------------------------------
// 4. DOT_STROKE_PATH — zero-length dot path string
// ---------------------------------------------------------------------------

/**
 * A realistic zero-length dot stroke path, identical in structure to the dot
 * strokes used for lowercase 'i' and 'j' in js/letterData.js.
 *
 * APP.isDot() detects these by matching /M x,y L x,y/ where both coordinate
 * pairs are identical. Use this constant to test isDot() true-positive cases
 * and to test tracer behaviour when rendering dot glyphs.
 *
 * Taken verbatim from LETTERS['i'] stroke 0: 'M 100,56 L 100,56'
 *
 * @type {string}
 */
export const DOT_STROKE_PATH = 'M 100,56 L 100,56';

// ---------------------------------------------------------------------------
// 5. NORMAL_STROKE_PATH — standard multi-point stroke path string
// ---------------------------------------------------------------------------

/**
 * A realistic non-dot stroke path with distinct start and end coordinates.
 * Use this constant to test isDot() false-positive cases and as a default
 * stroke in tracer/checkpoint tests that need a path with non-zero length.
 *
 * Taken from LETTERS['A'] stroke 0: 'M 100,30 L 30,220'
 *
 * @type {string}
 */
export const NORMAL_STROKE_PATH = 'M 100,30 L 30,220';

// ---------------------------------------------------------------------------
// 6. mockLocalStorage — in-memory localStorage substitute
// ---------------------------------------------------------------------------

/**
 * Returns a plain-object implementation of the Web Storage API with
 * Vitest-compatible spy-able methods. Use it to replace global.localStorage
 * in state.js tests that exercise APP.saveProgress() and APP.clearProgress(),
 * so those tests never touch real browser storage.
 *
 * @returns {{ getItem: Function, setItem: Function, removeItem: Function, clear: Function, _store: object }}
 *
 * @example
 * import { vi } from 'vitest';
 * import { mockLocalStorage } from './fixtures.js';
 *
 * const ls = mockLocalStorage();
 * vi.stubGlobal('localStorage', ls);
 *
 * // After the test:
 * vi.unstubAllGlobals();
 */
export function mockLocalStorage() {
  const _store = Object.create(null);

  return {
    /** Internal store — inspectable in tests without going through getItem. */
    _store,

    getItem(key) {
      return Object.prototype.hasOwnProperty.call(_store, key)
        ? _store[key]
        : null;
    },

    setItem(key, value) {
      _store[key] = String(value);
    },

    removeItem(key) {
      delete _store[key];
    },

    clear() {
      for (const key of Object.keys(_store)) {
        delete _store[key];
      }
    },
  };
}

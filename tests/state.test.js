/**
 * tests/state.test.js
 *
 * Unit tests for js/state.js — covers APP.startGame(), APP.advanceLetter(),
 * APP.skipAnimal(), APP.saveProgress(), and APP.clearProgress().
 *
 * Modules are loaded by tests/setup.js (side-effects only). Tests read from
 * and write to global.APP which equals window.APP in jsdom.
 */

import { makeAnimal, mockLocalStorage, ANIMALS_FIXTURE } from './fixtures.js';

// ---------------------------------------------------------------------------
// APP.startGame
// ---------------------------------------------------------------------------
describe('APP.startGame', () => {
  it('sets currentAnimal, resets letterIndex to 0, completedLetters to [], and sessionExists to true', () => {
    const animal = makeAnimal({ name: 'DOG', displayName: 'Dog' });
    // Pre-corrupt state to ensure reset actually happens.
    APP.state.letterIndex = 3;
    APP.state.completedLetters = ['D', 'O'];
    APP.state.sessionExists = false;

    APP.startGame(animal);

    expect(APP.state.currentAnimal).toBe(animal);
    expect(APP.state.letterIndex).toBe(0);
    expect(APP.state.completedLetters).toEqual([]);
    expect(APP.state.sessionExists).toBe(true);
  });

  it('resets consecutiveFoundCount to 0 when animal is NOT already found', () => {
    const animal = makeAnimal({ name: 'FOX', displayName: 'Fox' });
    APP.state.consecutiveFoundCount = 3;
    // FOX is not in completedAnimals.

    APP.startGame(animal);

    expect(APP.state.consecutiveFoundCount).toBe(0);
  });

  it('does NOT reset consecutiveFoundCount when animal is already found', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.state.completedAnimals = new Set(['CAT']);
    APP.state.consecutiveFoundCount = 2;

    APP.startGame(animal);

    expect(APP.state.consecutiveFoundCount).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// APP.advanceLetter
// ---------------------------------------------------------------------------
describe('APP.advanceLetter', () => {
  it('increments letterIndex and pushes to completedLetters on a non-final letter', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(animal);
    // letterIndex is 0 → 'C', not final (length=3)

    APP.advanceLetter();

    expect(APP.state.letterIndex).toBe(1);
    expect(APP.state.completedLetters).toEqual(['C']);
    expect(APP.state.screen).toBe('game');
  });

  it('keeps screen as "game" for non-final letters', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(animal);

    APP.advanceLetter(); // letter 0 → 'C'

    expect(APP.state.screen).toBe('game');
  });

  it('sets screen to "complete" and adds to completedAnimals on the final letter', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(animal);
    APP.state.letterIndex = 2; // 'T' is the last letter

    APP.advanceLetter();

    expect(APP.state.screen).toBe('complete');
    expect(APP.state.completedAnimals.has('CAT')).toBe(true);
  });

  it('increments animalCompletionCounts correctly on first completion', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(animal);
    APP.state.letterIndex = 2; // final letter

    APP.advanceLetter();

    expect(APP.state.animalCompletionCounts['CAT']).toBe(1);
  });

  it('increments animalCompletionCounts correctly on repeat completion', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.state.animalCompletionCounts['CAT'] = 2; // already completed twice before

    APP.startGame(animal);
    APP.state.letterIndex = 2; // final letter

    APP.advanceLetter();

    expect(APP.state.animalCompletionCounts['CAT']).toBe(3);
  });

  it('increments consecutiveFoundCount only when animal was already found before the call', () => {
    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.state.completedAnimals = new Set(['CAT']); // already found
    APP.state.consecutiveFoundCount = 1;

    APP.startGame(animal);
    APP.state.letterIndex = 2; // final letter

    APP.advanceLetter();

    expect(APP.state.consecutiveFoundCount).toBe(2);
  });

  it('does NOT increment consecutiveFoundCount when animal was NOT previously found', () => {
    const animal = makeAnimal({ name: 'DOG', displayName: 'Dog' });
    APP.state.consecutiveFoundCount = 1;
    // DOG is not in completedAnimals.

    APP.startGame(animal);
    APP.state.letterIndex = 2; // final letter

    APP.advanceLetter();

    // consecutiveFoundCount should have been reset to 0 by startGame (unfound animal),
    // then NOT incremented by advanceLetter.
    expect(APP.state.consecutiveFoundCount).toBe(0);
  });

  it('calls saveProgress after completing the final letter', () => {
    const ls = mockLocalStorage();
    vi.stubGlobal('localStorage', ls);
    const spy = vi.spyOn(ls, 'setItem');

    const animal = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(animal);
    APP.state.letterIndex = 2; // final letter

    APP.advanceLetter();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('animalProgress', expect.any(String));
    const [, rawValue] = spy.mock.calls[0];
    const parsed = JSON.parse(rawValue);
    expect(Array.isArray(parsed.completedAnimals)).toBe(true);
    expect(parsed.completedAnimals).toContain('CAT');
    expect(parsed.completedAnimals).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// APP.saveProgress
// ---------------------------------------------------------------------------
describe('APP.saveProgress', () => {
  it('writes completedAnimals (as array) and animalCompletionCounts to localStorage under key "animalProgress"', () => {
    const ls = mockLocalStorage();
    vi.stubGlobal('localStorage', ls);
    const spy = vi.spyOn(ls, 'setItem');

    APP.state.completedAnimals = new Set(['CAT', 'DOG']);
    APP.state.animalCompletionCounts = { CAT: 2, DOG: 1 };

    APP.saveProgress();

    expect(spy).toHaveBeenCalledWith('animalProgress', expect.any(String));
    const [key, rawValue] = spy.mock.calls[0];
    expect(key).toBe('animalProgress');
    const parsed = JSON.parse(rawValue);
    expect(Array.isArray(parsed.completedAnimals)).toBe(true);
    expect(parsed.completedAnimals).toEqual(expect.arrayContaining(['CAT', 'DOG']));
    expect(parsed.completedAnimals).toHaveLength(2);
    expect(parsed.animalCompletionCounts).toEqual({ CAT: 2, DOG: 1 });
  });
});

// ---------------------------------------------------------------------------
// APP.clearProgress
// ---------------------------------------------------------------------------
describe('APP.clearProgress', () => {
  it('removes the localStorage key and resets completedAnimals, animalCompletionCounts, and consecutiveFoundCount', () => {
    const ls = mockLocalStorage();
    ls.setItem('animalProgress', JSON.stringify({ completedAnimals: ['CAT'], animalCompletionCounts: { CAT: 1 } }));
    vi.stubGlobal('localStorage', ls);
    const removeSpy = vi.spyOn(ls, 'removeItem');

    APP.state.completedAnimals = new Set(['CAT']);
    APP.state.animalCompletionCounts = { CAT: 1 };
    APP.state.consecutiveFoundCount = 3;

    APP.clearProgress();

    expect(removeSpy).toHaveBeenCalledWith('animalProgress');
    expect(APP.state.completedAnimals.size).toBe(0);
    expect(APP.state.animalCompletionCounts).toEqual({});
    expect(APP.state.consecutiveFoundCount).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// APP.skipAnimal
// ---------------------------------------------------------------------------
describe('APP.skipAnimal', () => {
  // Ensure ANIMALS_FIXTURE is in place for every test in this block.
  // Individual tests that need a different ANIMALS array (e.g. []) override
  // this within the test body; the global beforeEach in setup.js restores
  // the original list after each test regardless.
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('picks a new animal without updating completedAnimals or navigating to "complete"', () => {
    const original = makeAnimal({ name: 'ANT', displayName: 'Ant' });
    APP.startGame(original);
    const originalName = original.name;

    APP.skipAnimal();

    // completedAnimals should still be empty — skip is not a completion.
    expect(APP.state.completedAnimals.size).toBe(0);
    expect(APP.state.screen).toBe('game');
    // A different animal should be selected (ANIMALS_FIXTURE has 6, so guaranteed).
    expect(APP.state.currentAnimal.name).not.toBe(originalName);
  });

  it('sets screen to "landing" when no eligible animals remain', () => {
    // Replace ANIMALS with an empty array so pickRandom returns null.
    APP.ANIMALS = [];
    const original = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(original);

    APP.skipAnimal();

    expect(APP.state.screen).toBe('landing');
  });

  it('resets letterIndex to 0 and completedLetters to [] on skip', () => {
    const original = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(original);
    APP.state.letterIndex = 2;
    APP.state.completedLetters = ['C', 'A'];

    APP.skipAnimal();

    expect(APP.state.letterIndex).toBe(0);
    expect(APP.state.completedLetters).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// APP.advanceLetter — null currentAnimal guard
// ---------------------------------------------------------------------------
describe('APP.advanceLetter — null guard', () => {
  it('returns without modifying state when currentAnimal is null', () => {
    APP.state.currentAnimal = null;
    APP.state.letterIndex = 5;
    APP.state.completedAnimals = new Set(['DOG']);
    APP.state.screen = 'game';

    APP.advanceLetter();

    expect(APP.state.letterIndex).toBe(5);
    expect(APP.state.completedAnimals.has('DOG')).toBe(true);
    expect(APP.state.screen).toBe('game');
  });
});

// ---------------------------------------------------------------------------
// APP.startGame — sets screen to "game"
// ---------------------------------------------------------------------------
describe('APP.startGame — screen', () => {
  it('sets screen to "game" after starting', () => {
    const animal = makeAnimal({ name: 'DOG', displayName: 'Dog' });
    APP.state.screen = 'landing';

    APP.startGame(animal);

    expect(APP.state.screen).toBe('game');
  });
});

// ---------------------------------------------------------------------------
// APP.goHome
// ---------------------------------------------------------------------------
describe('APP.goHome', () => {
  it('sets screen to "landing" regardless of current screen', () => {
    APP.state.screen = 'complete';

    APP.goHome();

    expect(APP.state.screen).toBe('landing');
  });
});

// ---------------------------------------------------------------------------
// APP.resetSettings
// ---------------------------------------------------------------------------
describe('APP.resetSettings', () => {
  it('restores all settings to their documented defaults', () => {
    APP.state.settings.letterCase = 'lower';
    APP.state.settings.volume = 0.1;
    APP.state.settings.depiction = 'realistic';
    APP.state.settings.revealMode = 'hidden';
    APP.state.settings.muted = true;
    // Also corrupt maxLength so we can verify it gets reset to the real default.
    APP.state.settings.maxLength = 1;

    APP.resetSettings();

    expect(APP.state.settings.letterCase).toBe('upper');
    expect(APP.state.settings.depiction).toBe('cartoon');
    expect(APP.state.settings.revealMode).toBe('faint');
    expect(APP.state.settings.volume).toBe(0.7);
    expect(APP.state.settings.muted).toBe(false);
    // maxLength default is the longest name in the full APP.ANIMALS list.
    // Compute it dynamically so the assertion stays correct if animals are added.
    const expectedMaxLength = Math.max(...APP.ANIMALS.map(a => a.name.length));
    expect(APP.state.settings.maxLength).toBe(expectedMaxLength);
  });
});

// ---------------------------------------------------------------------------
// APP.saveProgress / APP.clearProgress — localStorage error swallowing
// ---------------------------------------------------------------------------
describe('APP.saveProgress — error resilience', () => {
  it('does not throw when localStorage.setItem throws', () => {
    const ls = mockLocalStorage();
    vi.spyOn(ls, 'setItem').mockImplementation(() => { throw new Error('QuotaExceeded'); });
    vi.stubGlobal('localStorage', ls);

    expect(() => APP.saveProgress()).not.toThrow();
  });
});

describe('APP.clearProgress — error resilience', () => {
  it('does not throw when localStorage.removeItem throws', () => {
    const ls = mockLocalStorage();
    vi.spyOn(ls, 'removeItem').mockImplementation(() => { throw new Error('SecurityError'); });
    vi.stubGlobal('localStorage', ls);

    APP.state.completedAnimals = new Set(['CAT']);
    APP.state.animalCompletionCounts = { CAT: 1 };
    APP.state.consecutiveFoundCount = 3;

    expect(() => APP.clearProgress()).not.toThrow();

    // State should be reset even when the storage call throws.
    expect(APP.state.completedAnimals.size).toBe(0);
    expect(APP.state.animalCompletionCounts).toEqual({});
    expect(APP.state.consecutiveFoundCount).toBe(0);
  });
});

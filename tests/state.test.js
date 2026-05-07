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

    expect(spy).toHaveBeenCalled();
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
  it('picks a new animal without updating completedAnimals or navigating to "complete"', () => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
    const original = makeAnimal({ name: 'ANT', displayName: 'Ant' });
    APP.startGame(original);

    APP.skipAnimal();

    // completedAnimals should still be empty — skip is not a completion.
    expect(APP.state.completedAnimals.size).toBe(0);
    expect(APP.state.screen).not.toBe('complete');
  });

  it('sets screen to "landing" when no eligible animals remain', () => {
    // Replace ANIMALS with an empty array so pickRandom returns null.
    APP.ANIMALS = [];
    const original = makeAnimal({ name: 'CAT', displayName: 'Cat' });
    APP.startGame(original);

    APP.skipAnimal();

    expect(APP.state.screen).toBe('landing');
  });
});

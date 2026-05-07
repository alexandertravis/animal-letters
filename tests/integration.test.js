/**
 * tests/integration.test.js
 *
 * Integration tests — verifies that multiple APP modules work correctly
 * together across cross-module flows. Does not duplicate assertions already
 * present in the unit test files.
 *
 * Modules are loaded by tests/setup.js (side-effects only).
 * Tests read from and write to global.APP.
 */

import { makeAnimal, ANIMALS_FIXTURE, mockLocalStorage } from './fixtures.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Advance through every letter of the current animal. */
function completeCurrentAnimal() {
  const animal = APP.state.currentAnimal;
  for (let i = 0; i < animal.name.length; i++) {
    APP.advanceLetter();
  }
}

// ---------------------------------------------------------------------------
// 1. Full game round-trip — state + animals + letterData working together
// ---------------------------------------------------------------------------
describe('Integration: full game round-trip', () => {
  it('picks a random animal, starts the game, advances through every letter, and ends in the complete screen', () => {
    const animal = APP.animals.pickRandom(APP.state.settings.maxLength);
    expect(animal).not.toBeNull();

    APP.startGame(animal);
    expect(APP.state.screen).toBe('game');
    expect(APP.state.letterIndex).toBe(0);

    completeCurrentAnimal();

    expect(APP.state.screen).toBe('complete');
    expect(APP.state.completedAnimals.has(animal.name)).toBe(true);
    expect(APP.state.letterIndex).toBe(animal.name.length);
    expect(APP.state.completedLetters).toHaveLength(animal.name.length);
  });

  it('completedLetters matches every character of the animal name in order', () => {
    const animal = APP.animals.pickRandom(3); // short name — deterministic letter order
    APP.startGame(animal);

    completeCurrentAnimal();

    const expectedLetters = animal.name.split('');
    expect(APP.state.completedLetters).toEqual(expectedLetters);
  });
});

// ---------------------------------------------------------------------------
// 2. Full game round-trip with persistence — state + animals + localStorage
// ---------------------------------------------------------------------------
describe('Integration: save → reload persistence cycle', () => {
  it('saveProgress writes the completed animal; cleared and restored localStorage contains the same animal', () => {
    const ls = mockLocalStorage();
    vi.stubGlobal('localStorage', ls);

    const animal = APP.animals.pickRandom(APP.state.settings.maxLength);
    APP.startGame(animal);
    completeCurrentAnimal();

    // saveProgress is called automatically by advanceLetter on completion,
    // but let's also verify it explicitly.
    APP.saveProgress();

    const rawSaved = ls.getItem('animalProgress');
    expect(rawSaved).not.toBeNull();
    const saved = JSON.parse(rawSaved);
    expect(saved.completedAnimals).toContain(animal.name);

    // Simulate a "page reload": clear in-memory state, then restore from storage.
    APP.clearProgress();
    expect(APP.state.completedAnimals.size).toBe(0);

    // Reconstruct completedAnimals from the previously saved JSON.
    const restored = JSON.parse(rawSaved);
    APP.state.completedAnimals = new Set(restored.completedAnimals);

    expect(APP.state.completedAnimals.has(animal.name)).toBe(true);
  });

  it('clearProgress removes the localStorage entry so a subsequent reload starts fresh', () => {
    const ls = mockLocalStorage();
    vi.stubGlobal('localStorage', ls);

    const animal = APP.animals.pickRandom(APP.state.settings.maxLength);
    APP.startGame(animal);
    completeCurrentAnimal();

    // Entry should exist after completion.
    expect(ls.getItem('animalProgress')).not.toBeNull();

    APP.clearProgress();

    // Entry should be gone after clearProgress.
    expect(ls.getItem('animalProgress')).toBeNull();
    expect(APP.state.completedAnimals.size).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// 3. Letter case flows through to glyph lookup — utils + letterData
// ---------------------------------------------------------------------------
describe('Integration: caseOf output is always a valid getLetter key', () => {
  const animalName = 'DOG'; // uppercase, all letters have known glyphs in A-Z and a-z

  it('upper case — every character returned by caseOf resolves to a valid glyph', () => {
    APP.state.settings.letterCase = 'upper';
    const display = APP.caseOf(animalName);
    expect(display).toBe('DOG');
    for (const ch of display) {
      expect(APP.getLetter(ch)).not.toBeNull();
    }
  });

  it('lower case — every character returned by caseOf resolves to a valid glyph', () => {
    APP.state.settings.letterCase = 'lower';
    const display = APP.caseOf(animalName);
    expect(display).toBe('dog');
    for (const ch of display) {
      expect(APP.getLetter(ch)).not.toBeNull();
    }
  });

  it('proper case — every character returned by caseOf resolves to a valid glyph', () => {
    APP.state.settings.letterCase = 'proper';
    const display = APP.caseOf(animalName);
    expect(display).toBe('Dog');
    for (const ch of display) {
      expect(APP.getLetter(ch)).not.toBeNull();
    }
  });

  it('all three case modes work for a longer animal name (RABBIT)', () => {
    const name = 'RABBIT';
    for (const lc of ['upper', 'lower', 'proper']) {
      APP.state.settings.letterCase = lc;
      const display = APP.caseOf(name);
      for (const ch of display) {
        expect(APP.getLetter(ch)).not.toBeNull();
      }
    }
  });
});

// ---------------------------------------------------------------------------
// 4. Smart randomiser resets after finding a new animal — state + animals
// ---------------------------------------------------------------------------
describe('Integration: consecutiveFoundCount streak and pickNext bias', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('startGame resets consecutiveFoundCount to 0 when the new animal is unfound', () => {
    APP.state.completedAnimals = new Set(['ANT', 'BEE']);
    APP.state.consecutiveFoundCount = 2;

    const cat = ANIMALS_FIXTURE.find(a => a.name === 'CAT');
    APP.startGame(cat);

    expect(APP.state.consecutiveFoundCount).toBe(0);
  });

  it('first completion of an unfound animal does not increment consecutiveFoundCount', () => {
    APP.state.completedAnimals = new Set(['ANT', 'BEE']);
    APP.state.consecutiveFoundCount = 2;

    const cat = ANIMALS_FIXTURE.find(a => a.name === 'CAT');
    APP.startGame(cat); // resets count to 0 (CAT is unfound)
    completeCurrentAnimal();

    // CAT was unfound at the time startGame ran, so consecutiveFoundCount stays 0.
    expect(APP.state.consecutiveFoundCount).toBe(0);
  });

  it('second play-through of an already-found animal increments consecutiveFoundCount to 1', () => {
    // CAT is already found before startGame is called.
    APP.state.completedAnimals = new Set(['CAT']);
    APP.state.consecutiveFoundCount = 0;

    const cat = ANIMALS_FIXTURE.find(a => a.name === 'CAT');
    APP.startGame(cat); // CAT is found → count stays at 0
    completeCurrentAnimal(); // CAT was already found → count increments to 1

    expect(APP.state.consecutiveFoundCount).toBe(1);
  });

  it('third play-through of an already-found animal increments consecutiveFoundCount to 2', () => {
    APP.state.completedAnimals = new Set(['CAT']);
    APP.state.consecutiveFoundCount = 1;

    const cat = ANIMALS_FIXTURE.find(a => a.name === 'CAT');
    APP.startGame(cat); // CAT already found → count stays 1
    completeCurrentAnimal(); // increments to 2

    expect(APP.state.consecutiveFoundCount).toBe(2);
  });

  it('pickNext returns an unfound animal when consecutiveFoundCount reaches 2 — end-to-end bias check', () => {
    // Mark ANT and BEE as found; CAT, BEAR, DUCK, RABBIT are unfound.
    APP.state.completedAnimals = new Set(['ANT', 'BEE']);
    APP.state.consecutiveFoundCount = 2;

    const cat = ANIMALS_FIXTURE.find(a => a.name === 'CAT');
    const result = APP.animals.pickNext(6, cat);

    // Result must be unfound (not ANT or BEE) and not the excluded animal (CAT).
    const unfoundNames = ['CAT', 'BEAR', 'DUCK', 'RABBIT'];
    expect(unfoundNames).toContain(result.name);
    expect(result.name).not.toBe('CAT'); // excluded
    expect(['ANT', 'BEE']).not.toContain(result.name); // bias working
  });
});

// ---------------------------------------------------------------------------
// 5. skipAnimal does not corrupt the next game — state + animals
// ---------------------------------------------------------------------------
describe('Integration: skipAnimal state integrity', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('after skip, letterIndex is 0 and completedLetters is empty', () => {
    const ant = ANIMALS_FIXTURE.find(a => a.name === 'ANT');
    APP.startGame(ant);
    APP.advanceLetter(); // advance one letter, do not complete

    APP.skipAnimal();

    expect(APP.state.letterIndex).toBe(0);
    expect(APP.state.completedLetters).toHaveLength(0);
  });

  it('after skip, currentAnimal is a valid animal from APP.ANIMALS', () => {
    const ant = ANIMALS_FIXTURE.find(a => a.name === 'ANT');
    APP.startGame(ant);
    APP.advanceLetter();

    APP.skipAnimal();

    const validNames = ANIMALS_FIXTURE.map(a => a.name);
    expect(validNames).toContain(APP.state.currentAnimal.name);
  });

  it('completing the animal after a skip adds only that animal to completedAnimals', () => {
    const ant = ANIMALS_FIXTURE.find(a => a.name === 'ANT');
    APP.startGame(ant);
    APP.advanceLetter();

    APP.skipAnimal();

    const nextAnimal = APP.state.currentAnimal;
    APP.startGame(nextAnimal);
    completeCurrentAnimal();

    expect(APP.state.completedAnimals.has(nextAnimal.name)).toBe(true);
    // ANT was never completed — skip does not add it.
    expect(APP.state.completedAnimals.has('ANT')).toBe(false);
  });

  it('animalCompletionCounts has exactly one entry after skip + completion of next animal', () => {
    const ant = ANIMALS_FIXTURE.find(a => a.name === 'ANT');
    APP.startGame(ant);
    APP.advanceLetter();

    APP.skipAnimal();

    const nextAnimal = APP.state.currentAnimal;
    APP.startGame(nextAnimal);
    completeCurrentAnimal();

    expect(Object.keys(APP.state.animalCompletionCounts)).toHaveLength(1);
    expect(APP.state.animalCompletionCounts[nextAnimal.name]).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// 6. Settings maxLength filters animals consistently — state + animals
// ---------------------------------------------------------------------------
describe('Integration: maxLength setting filters pickRandom consistently', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  // ANIMALS_FIXTURE: 3-letter: ANT BEE CAT (3), 4-letter: BEAR DUCK (2), 6-letter: RABBIT (1)

  it('eligibleCount(3) returns 3 — the three 3-letter animals', () => {
    expect(APP.animals.eligibleCount(3)).toBe(3);
  });

  it('pickRandom(3) always returns an animal with name.length <= 3 across 20 calls', () => {
    for (let i = 0; i < 20; i++) {
      const result = APP.animals.pickRandom(3);
      expect(result).not.toBeNull();
      expect(result.name.length).toBeLessThanOrEqual(3);
    }
  });

  it('pickRandom(4) always returns an animal with name.length <= 4 across 20 calls', () => {
    for (let i = 0; i < 20; i++) {
      const result = APP.animals.pickRandom(4);
      expect(result).not.toBeNull();
      expect(result.name.length).toBeLessThanOrEqual(4);
    }
  });

  it('pickRandom(3) results are drawn only from the 3-letter subset', () => {
    const validNames = ANIMALS_FIXTURE.filter(a => a.name.length <= 3).map(a => a.name);
    for (let i = 0; i < 20; i++) {
      const result = APP.animals.pickRandom(3);
      expect(validNames).toContain(result.name);
    }
  });

  it('pickRandom(4) never returns RABBIT (6 letters)', () => {
    for (let i = 0; i < 20; i++) {
      const result = APP.animals.pickRandom(4);
      expect(result.name).not.toBe('RABBIT');
    }
  });
});

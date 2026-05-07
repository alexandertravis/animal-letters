/**
 * tests/animals.test.js
 *
 * Unit tests for js/animals.js — covers APP.animals.pickRandom(),
 * APP.animals.pickNext(), and APP.animals.eligibleCount().
 *
 * Modules are loaded by tests/setup.js. Tests read from global.APP.
 * Each test that needs a controlled animal set sets APP.ANIMALS = ANIMALS_FIXTURE
 * at the start of the describe block (setup.js restores the original after each test).
 */

import { makeAnimal, ANIMALS_FIXTURE } from './fixtures.js';

// ANIMALS_FIXTURE breakdown:
//   3-letter: ANT, BEE, CAT
//   4-letter: BEAR, DUCK
//   6-letter: RABBIT

// ---------------------------------------------------------------------------
// APP.animals.eligibleCount
// ---------------------------------------------------------------------------
describe('APP.animals.eligibleCount', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('returns correct count for maxLength=3 (3-letter animals only)', () => {
    expect(APP.animals.eligibleCount(3)).toBe(3); // ANT BEE CAT
  });

  it('returns correct count for maxLength=4', () => {
    expect(APP.animals.eligibleCount(4)).toBe(5); // ANT BEE CAT BEAR DUCK
  });

  it('returns correct count for maxLength=6 (all animals)', () => {
    expect(APP.animals.eligibleCount(6)).toBe(6); // all
  });

  it('returns 0 when maxLength is below every animal name length', () => {
    expect(APP.animals.eligibleCount(1)).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// APP.animals.pickRandom
// ---------------------------------------------------------------------------
describe('APP.animals.pickRandom', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('returns an animal with name.length <= maxLength', () => {
    const result = APP.animals.pickRandom(3);
    expect(result).not.toBeNull();
    expect(result.name.length).toBeLessThanOrEqual(3);
  });

  it('excludes the specified animal when alternatives exist', () => {
    const ant = ANIMALS_FIXTURE.find(a => a.name === 'ANT');
    // maxLength=3 gives ANT, BEE, CAT — three options, so ANT can be excluded
    const result = APP.animals.pickRandom(3, ant);
    expect(result.name).not.toBe('ANT');
  });

  it('returns the excluded animal when it is the only eligible one', () => {
    // Only RABBIT has length 6 that is exactly 6. maxLength=6 includes all,
    // but we want a scenario where the excluded animal is the only one.
    // Use maxLength=1 → pool is empty → falls back to eligible list (also empty).
    // Better: replace ANIMALS with a single animal and try to exclude it.
    APP.ANIMALS = [makeAnimal({ name: 'CAT', displayName: 'Cat' })];
    const cat = APP.ANIMALS[0];

    const result = APP.animals.pickRandom(3, cat);

    // Only one eligible animal — returns it even though it is excluded.
    expect(result.name).toBe('CAT');
  });

  it('returns null when no animals are eligible', () => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
    const result = APP.animals.pickRandom(1); // nothing has length <= 1
    expect(result).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// APP.animals.pickNext — bias toward unfound animals
// ---------------------------------------------------------------------------
describe('APP.animals.pickNext', () => {
  beforeEach(() => {
    APP.ANIMALS = [...ANIMALS_FIXTURE];
  });

  it('returns an unfound animal when consecutiveFoundCount >= 2 and unfound animals exist', () => {
    // Mark ANT and BEE as found; CAT, BEAR, DUCK, RABBIT remain unfound.
    APP.state.completedAnimals = new Set(['ANT', 'BEE']);
    APP.state.consecutiveFoundCount = 2;

    // Force Math.random to 0 so the first item in the unfound pool is chosen.
    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = APP.animals.pickNext(6, null);

    // Must be one of the unfound animals.
    const unfoundNames = ['CAT', 'BEAR', 'DUCK', 'RABBIT'];
    expect(unfoundNames).toContain(result.name);
  });

  it('falls back to pickRandom when consecutiveFoundCount >= 2 but ALL eligible animals are already found', () => {
    // Mark every animal in the fixture as found.
    APP.state.completedAnimals = new Set(ANIMALS_FIXTURE.map(a => a.name));
    APP.state.consecutiveFoundCount = 2;

    vi.spyOn(Math, 'random').mockReturnValue(0);

    const result = APP.animals.pickNext(6, null);

    // Should still return *some* animal (falls back to normal random pick).
    expect(result).not.toBeNull();
    expect(typeof result.name).toBe('string');
  });

  it('does NOT apply unfound bias when consecutiveFoundCount < 2', () => {
    // Mark most animals as found — if bias were applied, only CAT would come back.
    APP.state.completedAnimals = new Set(['ANT', 'BEE', 'BEAR', 'DUCK', 'RABBIT']);
    APP.state.consecutiveFoundCount = 1; // below threshold

    // Run pickNext many times and check that we get animals from the full pool.
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      const r = APP.animals.pickNext(6, null);
      if (r) results.add(r.name);
    }

    // With 50 picks and no bias, we should eventually see some of the found animals.
    const foundAnimals = ['ANT', 'BEE', 'BEAR', 'DUCK', 'RABBIT'];
    const gotFoundAnimal = foundAnimals.some(n => results.has(n));
    expect(gotFoundAnimal).toBe(true);
  });
});

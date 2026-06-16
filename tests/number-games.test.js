import { describe, it, expect } from 'vitest';

// setup.js loads state/utils/animals. Number games need i18n, locations and the
// numberbonds screen (which exposes the pure APP.numberBonds helper).
await import('../data/i18n.js');
await import('../data/locations.js');
await import('../js/screens/numberbonds.js');

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];

describe('APP.numberBonds', () => {
  it('enumerates distinct unordered bonds of n', () => {
    expect(APP.numberBonds(5)).toEqual([[0, 5], [1, 4], [2, 3]]);
    expect(APP.numberBonds(4)).toEqual([[0, 4], [1, 3], [2, 2]]);
    expect(APP.numberBonds(10)).toHaveLength(6);
    expect(APP.numberBonds(0)).toEqual([[0, 0]]);
  });

  it('every pair sums to n with a <= b', () => {
    [3, 5, 8, 10, 12].forEach((n) => {
      APP.numberBonds(n).forEach(([a, b]) => {
        expect(a + b).toBe(n);
        expect(a).toBeLessThanOrEqual(b);
      });
    });
  });
});

describe('Numbers building wiring', () => {
  const counting = () => APP.LOCATIONS.find((l) => l.id === 'counting');
  const school = () => APP.LOCATIONS.find((l) => l.id === 'school');

  it('has a counting hub with the five number activities', () => {
    const loc = counting();
    expect(loc).toBeTruthy();
    expect(loc.direct).toBeFalsy();
    const screens = loc.games.map((g) => g.screen);
    expect(screens).toEqual(['numbers', 'countmatch', 'addition', 'numberbonds', 'times']);
    expect(loc.labelKey).toBe('loc.numbers');
  });

  it('removed digit-tracing from School (which keeps the letters games)', () => {
    const screens = school().games.map((g) => g.screen);
    expect(screens).toEqual(['game', 'findletter']);
  });

  it('locationOf maps the new game screens to the counting hub', () => {
    ['countmatch', 'addition', 'numberbonds', 'times', 'numbers'].forEach((s) => {
      expect(APP.locationOf(s)).toBe('counting');
    });
  });
});

describe('number-games i18n completeness', () => {
  const keys = [
    'loc.numbers', 'counting.write',
    'game.countmatch.title', 'game.addition.title', 'game.numberbonds.title', 'game.times.title',
    'intro.countmatch', 'intro.addition', 'intro.numberbonds', 'intro.times',
    'countmatch.range', 'countmatch.prompt', 'countmatch.win',
    'addition.range', 'addition.win',
    'numberbonds.total', 'numberbonds.prompt', 'numberbonds.win',
    'times.tables', 'times.win',
  ];

  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every number-games key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = keys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

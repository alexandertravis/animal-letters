import { describe, it, expect } from 'vitest';

// setup.js loads state/utils/animals. Reading games need i18n + locations.
await import('../data/i18n.js');
await import('../data/locations.js');

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];

describe('Reading games wiring', () => {
  const school = () => APP.LOCATIONS.find((l) => l.id === 'school');

  it('School hosts trace, find and the two reading games', () => {
    const screens = school().games.map((g) => g.screen);
    expect(screens).toEqual(['game', 'findletter', 'wordmatch', 'firstletter']);
  });

  it('locationOf maps the reading games to School', () => {
    expect(APP.locationOf('wordmatch')).toBe('school');
    expect(APP.locationOf('firstletter')).toBe('school');
  });
});

describe('reading-games i18n completeness', () => {
  const keys = [
    'game.wordmatch.title', 'game.firstletter.title',
    'intro.wordmatch', 'intro.firstletter',
    'wordmatch.pairs', 'wordmatch.win',
    'firstletter.prompt', 'firstletter.win',
  ];

  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every reading-games key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = keys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

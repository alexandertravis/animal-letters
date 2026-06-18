/**
 * tests/space.test.js
 *
 * Space data integrity (8 ordered planets, constellations), building wiring,
 * and i18n completeness across all six locales (including planet + constellation
 * labels referenced from the data).
 */
import { describe, it, expect, beforeAll } from 'vitest';

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];
const UI_KEYS = [
  'loc.space', 'game.solarsystem.title', 'intro.solarsystem',
  'game.planetorder.title', 'intro.planetorder', 'game.stars.title', 'intro.stars',
  'solarsystem.win', 'planetorder.prompt', 'planetorder.fromSun', 'planetorder.win',
  'stars.prompt', 'stars.win',
];

beforeAll(async () => {
  await import('../data/space.js');
  await import('../data/i18n.js');
  await import('../data/locations.js');
});

describe('space data', () => {
  it('has the 8 planets in order from the Sun', () => {
    expect(APP.SPACE.planets.map((p) => p.id)).toEqual(
      ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']);
  });
  it('every planet has color, numeric size, labelKey and fact', () => {
    APP.SPACE.planets.forEach((p) => {
      expect(p.color, p.id).toBeTruthy();
      expect(typeof p.size, p.id).toBe('number');
      expect(p.labelKey, p.id).toBeTruthy();
      expect(p.fact, p.id).toBeTruthy();
    });
  });
  it('each constellation has a label and at least 2 stars', () => {
    expect(APP.SPACE.constellations.length).toBeGreaterThan(0);
    APP.SPACE.constellations.forEach((c) => {
      expect(c.labelKey, c.id).toBeTruthy();
      expect(c.stars.length, c.id).toBeGreaterThanOrEqual(2);
    });
  });
});

describe('Space wiring', () => {
  it('the space location hosts the three games', () => {
    const loc = APP.LOCATIONS.find((l) => l.id === 'space');
    expect(loc).toBeTruthy();
    const screens = loc.games.map((g) => g.screen);
    ['solarsystem', 'planetorder', 'stars'].forEach((s) => expect(screens).toContain(s));
  });
  it('locationOf maps all three games to space', () => {
    ['solarsystem', 'planetorder', 'stars'].forEach((s) => expect(APP.locationOf(s)).toBe('space'));
  });
});

describe('space i18n completeness', () => {
  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every space key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const keys = UI_KEYS
        .concat(APP.SPACE.planets.map((p) => p.labelKey))
        .concat(APP.SPACE.constellations.map((c) => c.labelKey));
      const missing = keys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

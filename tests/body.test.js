/**
 * tests/body.test.js
 *
 * Human Body data integrity (layer order, digestion stops), building wiring,
 * and i18n completeness across all six locales (including every layer/organ
 * label referenced from the data).
 */
import { describe, it, expect, beforeAll } from 'vitest';

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];
const UI_KEYS = [
  'loc.humanbody', 'game.bodylayers.title', 'intro.bodylayers',
  'game.digestion.title', 'intro.digestion',
  'bodylayers.peel', 'bodylayers.win', 'digestion.prompt', 'digestion.win',
];

beforeAll(async () => {
  await import('../data/body.js');
  await import('../data/i18n.js');
  await import('../data/locations.js');
});

describe('body data', () => {
  it('has 5 layers in outer→inner order', () => {
    expect(APP.BODY.layers.map((l) => l.id)).toEqual(['skin', 'muscles', 'nerves', 'organs', 'bones']);
  });
  it('every layer has color, badge, labelKey and fact', () => {
    APP.BODY.layers.forEach((l) => {
      expect(l.color, l.id).toBeTruthy();
      expect(l.badge, l.id).toBeTruthy();
      expect(l.labelKey, l.id).toBeTruthy();
      expect(l.fact, l.id).toBeTruthy();
    });
  });
  it('digestion has 5 ordered stops mouth→largeInt', () => {
    expect(APP.BODY.digestion.map((s) => s.id)).toEqual(['mouth', 'foodpipe', 'stomach', 'smallInt', 'largeInt']);
  });
});

describe('Human Body wiring', () => {
  it('the humanbody location hosts both games', () => {
    const loc = APP.LOCATIONS.find((l) => l.id === 'humanbody');
    expect(loc).toBeTruthy();
    const screens = loc.games.map((g) => g.screen);
    expect(screens).toContain('bodylayers');
    expect(screens).toContain('digestion');
  });
  it('locationOf maps both games to humanbody', () => {
    expect(APP.locationOf('bodylayers')).toBe('humanbody');
    expect(APP.locationOf('digestion')).toBe('humanbody');
  });
});

describe('body i18n completeness', () => {
  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every body key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const keys = UI_KEYS
        .concat(APP.BODY.layers.map((l) => l.labelKey))
        .concat(APP.BODY.digestion.map((s) => s.labelKey));
      const missing = keys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

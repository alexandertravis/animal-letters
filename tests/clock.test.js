/**
 * tests/clock.test.js
 *
 * Pure clock-hand angle maths (shared by both clock games), Clock-building
 * wiring, and i18n completeness across all six locales.
 */
import { describe, it, expect, beforeAll } from 'vitest';

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];
const KEYS = [
  'loc.clock', 'game.readclock.title', 'intro.readclock',
  'game.sethands.title', 'intro.sethands',
  'readclock.prompt', 'readclock.win',
  'sethands.prompt', 'sethands.win', 'sethands.check',
  'clock.level', 'clock.oclock', 'clock.half', 'clock.quarter', 'clock.five', 'clock.aids',
];

beforeAll(async () => {
  await import('../js/clockFace.js');
  await import('../data/i18n.js');
  await import('../data/locations.js');
});

describe('clockHandAngles (degrees clockwise from 12)', () => {
  it('3:00 → hour 90°, minute 0°', () => {
    const a = APP.clockHandAngles(3, 0);
    expect(a.hour).toBe(90); expect(a.minute).toBe(0);
  });
  it('6:30 → hour 195° (drifts past 6), minute 180°', () => {
    const a = APP.clockHandAngles(6, 30);
    expect(a.hour).toBe(195); expect(a.minute).toBe(180);
  });
  it('12:00 → hour 0°, minute 0°', () => {
    const a = APP.clockHandAngles(12, 0);
    expect(a.hour).toBe(0); expect(a.minute).toBe(0);
  });
  it('9:15 → hour 277.5°, minute 90°', () => {
    const a = APP.clockHandAngles(9, 15);
    expect(a.hour).toBeCloseTo(277.5); expect(a.minute).toBe(90);
  });
});

describe('Clock building wiring', () => {
  it('the Clock location hosts both clock games', () => {
    const clk = APP.LOCATIONS.find((l) => l.id === 'clock');
    expect(clk).toBeTruthy();
    const screens = clk.games.map((g) => g.screen);
    expect(screens).toContain('readclock');
    expect(screens).toContain('sethands');
  });
  it('locationOf maps both games to the clock building', () => {
    expect(APP.locationOf('readclock')).toBe('clock');
    expect(APP.locationOf('sethands')).toBe('clock');
  });
});

describe('clock i18n completeness', () => {
  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every clock key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = KEYS.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

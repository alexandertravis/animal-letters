/**
 * tests/memory.test.js
 *
 * i18n completeness for the Memory Pairs 2-player mode strings. The turn-passing
 * logic itself lives in the screen closure and is verified in-browser; this
 * guards the localized labels across all six locales.
 */
import { describe, it, expect, beforeAll } from 'vitest';

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];
const KEYS = [
  'game.memory.mode', 'game.memory.modeSolo', 'game.memory.modeTwo',
  'game.memory.player1', 'game.memory.player2', 'game.memory.winner', 'game.memory.tie',
];

beforeAll(async () => {
  await import('../data/i18n.js');
});

describe('memory 2-player i18n', () => {
  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every 2-player memory key`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = KEYS.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });

  it('the winner string keeps the {n} placeholder in every locale', () => {
    LOCALES.forEach((loc) => {
      expect(APP.I18N[loc]['game.memory.winner'], loc).toContain('{n}');
    });
  });
});

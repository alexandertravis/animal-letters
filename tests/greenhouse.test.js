import { describe, it, expect } from 'vitest';

// setup.js loads state/utils/animals. Greenhouse needs its data + i18n + stickers.
await import('../data/i18n.js');
await import('../data/greenhouse.js');
await import('../data/stickers.js');

const LOCALES = ['en', 'pt', 'fr', 'es', 'de', 'it'];

describe('greenhouse data', () => {
  const G = () => APP.GREENHOUSE;

  it('has 8 well-formed life-cycle stages', () => {
    const stages = G().stages;
    expect(stages).toHaveLength(8);
    stages.forEach((s) => {
      expect(['drag', 'collect', 'continue']).toContain(s.type);
      expect(typeof s.instr).toBe('string');
      expect(typeof s.fact).toBe('string');
      if (s.type === 'drag') expect(typeof s.target).toBe('string');
      if (s.type === 'collect') expect(Array.isArray(s.items)).toBe(true);
    });
    // exactly one terminal (win) stage, and it is the last
    const winStages = stages.filter((s) => s.win);
    expect(winStages).toHaveLength(1);
    expect(stages[stages.length - 1].win).toBe(true);
  });

  it('has 4 needs and at least 3 distractors', () => {
    expect(G().needs).toHaveLength(4);
    expect(G().distractors.length).toBeGreaterThanOrEqual(3);
    G().needs.forEach((n) => {
      expect(n.emoji).toBeTruthy();
      expect(n.label).toBeTruthy();
      expect(n.fact).toBeTruthy();
    });
    G().distractors.forEach((d) => expect(d.emoji).toBeTruthy());
  });

  it('has 4 seasons each with crops and a creature', () => {
    expect(G().seasons).toHaveLength(4);
    G().seasons.forEach((s) => {
      expect(Array.isArray(s.crops)).toBe(true);
      expect(s.crops.length).toBeGreaterThan(0);
      expect(s.bug).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.fact).toBeTruthy();
      expect(typeof s.sky).toBe('string');
    });
  });
});

describe('greenhouse i18n completeness', () => {
  // Every key the greenhouse data references…
  const dataKeys = new Set();
  APP.GREENHOUSE.stages.forEach((s) => { dataKeys.add(s.instr); dataKeys.add(s.fact); });
  APP.GREENHOUSE.needs.forEach((n) => { dataKeys.add(n.label); dataKeys.add(n.fact); });
  APP.GREENHOUSE.seasons.forEach((s) => { dataKeys.add(s.label); dataKeys.add(s.fact); });

  // …plus the keys the screens reference directly.
  const screenKeys = [
    'loc.greenhouse',
    'game.plantgrow.title', 'game.plantneeds.title', 'game.pollinate.title', 'game.seasons.title',
    'intro.plantgrow', 'intro.plantneeds', 'intro.pollinate', 'intro.seasons',
    'plantgrow.win',
    'plantneeds.instr', 'plantneeds.win', 'plantneeds.no',
    'pollinate.instr', 'pollinate.fact', 'pollinate.win',
    'seasons.quiz', 'seasons.quizPrompt', 'seasons.win',
    'sticker.greenThumb',
  ];

  const allKeys = Array.from(dataKeys).concat(screenKeys);

  LOCALES.forEach((loc) => {
    it(`locale "${loc}" defines every greenhouse key (no fallbacks)`, () => {
      const strings = APP.I18N[loc];
      expect(strings).toBeTruthy();
      const missing = allKeys.filter((k) => !(k in strings));
      expect(missing).toEqual([]);
    });
  });
});

describe('greenhouse sticker', () => {
  it('green-thumb is registered and triggered by a plantgrow win', () => {
    const sticker = APP.STICKERS.find((s) => s.id === 'green-thumb');
    expect(sticker).toBeTruthy();
    expect(sticker.check({ plantgrow: { wins: 1 } })).toBe(true);
    expect(sticker.check({ plantgrow: { wins: 0 } })).toBe(false);
    expect(sticker.check({})).toBeFalsy();
  });
});

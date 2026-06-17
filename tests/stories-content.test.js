/**
 * tests/stories-content.test.js
 *
 * Structural integrity of the whole story library: ids, pages, and that every
 * animal / requirement / cover-palette a story references actually exists.
 * Guards the explore-expansion batch (and all existing stories) against typos
 * that would yield broken covers or missing images.
 */
import { describe, it, expect, beforeAll } from 'vitest';

const LEATHER = ['burgundy','forest','navy','tan','plum','chestnut','slate','teal',
  'mauve','sienna','gold','russet','amber','terracotta','leaf','arctic','midnight',
  'buff','dustblue','sage','charcoal'];
const BOARD = ['rose','sage','sky','sun'];

beforeAll(async () => {
  await import('../data/stories.js');         // APP.Story + APP.STORIES = []
  await import('../data/stories/_shared.js');  // APP.storyPrompt
  const mods = import.meta.glob('../data/stories/*.js');
  const paths = Object.keys(mods).filter((p) => !/_shared\.js$/.test(p)).sort();
  for (const p of paths) { await mods[p](); }
});

describe('story library content', () => {
  it('loads the full library (existing baseline intact + new ones added)', () => {
    // 28 original stories; the explore-expansion batch adds up to 20 more.
    expect(APP.STORIES.length).toBeGreaterThanOrEqual(28);
  });

  it('every story id is unique', () => {
    const ids = APP.STORIES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every story has title, a requirements array, and non-empty pages with images', () => {
    APP.STORIES.forEach((s) => {
      expect(s.title, s.id + ' title').toBeTruthy();
      expect(Array.isArray(s.requirements), s.id + ' requirements').toBe(true);
      expect(s.pages.length, s.id + ' pages').toBeGreaterThan(0);
      s.pages.forEach((p) => expect(p.image, s.id + ' page image').toBeTruthy());
    });
  });

  it('every coverAnimal and listed animal exists in APP.ANIMALS', () => {
    const ids = new Set(APP.ANIMALS.map((a) => APP.animalId(a)));
    APP.STORIES.forEach((s) => {
      if (s.coverAnimal) expect(ids.has(s.coverAnimal), s.id + ' coverAnimal=' + s.coverAnimal).toBe(true);
      (s.animals || []).forEach((a) => expect(ids.has(a), s.id + ' animal=' + a).toBe(true));
    });
  });

  it('every requirement animalId exists in APP.ANIMALS', () => {
    const ids = new Set(APP.ANIMALS.map((a) => APP.animalId(a)));
    APP.STORIES.forEach((s) => {
      (s.requirements || []).forEach((r) =>
        expect(ids.has(r.animalId), s.id + ' req animalId=' + r.animalId).toBe(true));
    });
  });

  it('cover palette names are valid for the chosen skin (no transparent covers)', () => {
    APP.STORIES.forEach((s) => {
      if (s.skin === 'classic' && s.leather)
        expect(LEATHER.includes(s.leather), s.id + ' leather=' + s.leather).toBe(true);
      if (s.skin === 'watercolour' && s.board)
        expect(BOARD.includes(s.board), s.id + ' board=' + s.board).toBe(true);
    });
  });
});

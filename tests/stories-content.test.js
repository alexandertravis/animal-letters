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
  it('loads the full library (28 original + 20 explore-expansion + 50 animals-stories-expansion)', () => {
    expect(APP.STORIES.length).toBeGreaterThanOrEqual(98);
  });

  it('includes all 50 animals-stories-expansion stories', () => {
    const NEW_IDS = [
      // batch 2-3: one per new animal
      'patient-ox', 'little-bat-night', 'elk-and-echo', 'toads-umbrella', 'seal-song',
      'mole-window', 'kind-llama', 'slow-sloth', 'otters-stone', 'rhino-soft-heart',
      'counting-sheep', 'goose-golden-egg', 'snail-carries-home', 'robin-spring', 'walrus-winter',
      'beaver-bridge', 'badger-garden', 'turkey-talent', 'octopus-juggle', 'peacock-colours',
      // batch 4: classic fables & tales
      'fox-and-grapes', 'dog-reflection', 'frog-and-ox', 'lamb-cried-wolf', 'bear-and-bees',
      'three-kittens', 'farm-friends-count', 'elephant-trunk', 'how-camel-hump', 'rabbit-in-moon',
      // batch 5-6: existing-animal tales
      'monkey-caps', 'lions-whisker', 'penguin-egg', 'brave-duckling', 'two-squirrels',
      'tiger-and-the-pool', 'giraffe-high-note', 'zebra-stripes-night', 'kangaroo-helps', 'koala-sleepy-tree',
      'panda-bamboo-share', 'hippo-dance', 'crocodile-tears', 'flamingo-flock', 'gorilla-quiet-strength',
      'hedgehog-prickles', 'parrot-secret', 'whale-lullaby', 'dolphin-rescue', 'owls-night-school',
    ];
    expect(NEW_IDS.length).toBe(50);
    const have = new Set(APP.STORIES.map((s) => s.id));
    const missing = NEW_IDS.filter((id) => !have.has(id));
    expect(missing).toEqual([]);
  });

  it('includes all 20 new explore-expansion stories', () => {
    const NEW_IDS = [
      'giraffe-friend', 'panda-garden', 'tiger-stripes', 'whale-little-fish', 'horse-wings',
      'kangaroo-pocket', 'koala-big-day', 'flamingo-balance', 'polite-crocodile', 'gorilla-gentle-hands',
      'hippo-hum', 'deer-first-snow', 'camel-stars', 'squirrel-acorn', 'moose-antlers',
      'gentle-bull', 'snake-song', 'lobster-new-shell', 'city-rat', 'shark-smile',
    ];
    const have = new Set(APP.STORIES.map((s) => s.id));
    const missing = NEW_IDS.filter((id) => !have.has(id));
    expect(missing).toEqual([]);
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

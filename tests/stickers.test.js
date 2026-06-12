import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Real modules. setup.js already loads state/utils; stickers must load before use.
await import('../js/store.js');
await import('../data/stickers.js');
await import('../js/progress.js');

const GAMES_KEY = 'al.progress.games';
const STICKERS_KEY = 'al.progress.stickers';
const ALL_IDS = ['letters', 'findletter', 'memory', 'tictactoe', 'maze', 'shapes',
  'colours', 'washing', 'music', 'puzzles', 'dots', 'recipes', 'painting'];

describe('sticker awards', () => {
  beforeEach(() => {
    const dom = new JSDOM('', { url: 'http://localhost' });
    global.localStorage = dom.window.localStorage;
    APP.state.newStickers = [];
    if (!APP.STORIES) APP.STORIES = []; // setup.js doesn't load data/stories.js
  });

  it('awards first-word after the first letters win and persists it', () => {
    APP.progress.recordWin('letters');
    expect(APP.progress.stickers()).toContain('first-word');
    expect(JSON.parse(localStorage.getItem(STICKERS_KEY))).toContain('first-word');
    expect(APP.state.newStickers.map(s => s.id)).toContain('first-word');
  });

  it('never awards the same sticker twice', () => {
    APP.progress.recordWin('letters');
    APP.state.newStickers = []; // drained by the UI
    APP.progress.recordWin('letters');
    expect(APP.state.newStickers).toHaveLength(0);
    expect(APP.progress.stickers().filter(id => id === 'first-word')).toHaveLength(1);
  });

  it('maze-master requires 3 stars', () => {
    APP.progress.recordWin('maze', { stars: 2 });
    expect(APP.progress.stickers()).not.toContain('maze-master');
    APP.progress.recordWin('maze', { stars: 3 });
    expect(APP.progress.stickers()).toContain('maze-master');
  });

  it('word-ten requires ten letters wins', () => {
    for (let i = 0; i < 9; i++) APP.progress.recordWin('letters');
    expect(APP.progress.stickers()).not.toContain('word-ten');
    APP.progress.recordWin('letters');
    expect(APP.progress.stickers()).toContain('word-ten');
  });

  it('try-everything requires a play in all 13 games', () => {
    ALL_IDS.slice(0, 12).forEach(id => APP.progress.recordPlay(id));
    expect(APP.progress.stickers()).not.toContain('try-everything');
    APP.progress.recordPlay(ALL_IDS[12]);
    expect(APP.progress.stickers()).toContain('try-everything');
  });

  it('animal-friend reads animalCompletionCounts from state', () => {
    for (let i = 0; i < 10; i++) APP.state.animalCompletionCounts['animal' + i] = 1;
    APP.progress.recordWin('washing');
    expect(APP.progress.stickers()).toContain('animal-friend');
  });

  it('bookworm uses APP.getUnlockedStories', () => {
    const real = APP.getUnlockedStories;
    APP.getUnlockedStories = () => [{ id: 'goldilocks' }];
    APP.progress.recordWin('washing');
    APP.getUnlockedStories = real;
    expect(APP.progress.stickers()).toContain('bookworm');
  });

  it('a throwing check never breaks recording', () => {
    APP.STICKERS.push({ id: 'broken', icon: 'x', labelKey: 'x', check: () => { throw new Error('boom'); } });
    let g;
    try {
      g = APP.progress.recordWin('letters');
    } finally {
      APP.STICKERS.pop();
    }
    expect(g.wins).toBe(1);
    expect(APP.progress.stickers()).toContain('first-word');
    expect(APP.progress.stickers()).not.toContain('broken');
  });

  it('recovers from corrupt sticker storage', () => {
    localStorage.setItem(STICKERS_KEY, '{not json');
    APP.progress.recordWin('letters');
    expect(APP.progress.stickers()).toContain('first-word');
  });

  it('every sticker check is safe against empty progress and bare state', () => {
    APP.STICKERS.forEach(st => {
      expect(() => st.check({}, APP.state), st.id).not.toThrow();
      expect(() => st.check({}, undefined), st.id).not.toThrow();
    });
  });
});

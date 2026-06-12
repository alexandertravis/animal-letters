import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Load the real modules (IIFEs attach to window.APP; window === global via setup.js).
// The vitest jsdom env does not expose a working bare `localStorage` global, so each
// test gets a fresh JSDOM-backed one (same approach as store.test.js).
await import('../js/store.js');
await import('../js/progress.js');

const KEY = 'al.progress.games';

describe('APP.progress', () => {
  beforeEach(() => {
    const dom = new JSDOM('', { url: 'http://localhost' });
    global.localStorage = dom.window.localStorage;
  });

  it('returns zeros for an unknown gameId', () => {
    expect(APP.progress.get('maze')).toEqual({ plays: 0, wins: 0, bestStars: 0, lastPlayed: null });
  });

  it('recordWin round-trips through localStorage', () => {
    APP.progress.recordWin('memory', { stars: 2 });
    const g = APP.progress.get('memory');
    expect(g.plays).toBe(1);
    expect(g.wins).toBe(1);
    expect(g.bestStars).toBe(2);
    expect(g.lastPlayed).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('defaults stars to 1 when not given', () => {
    APP.progress.recordWin('shapes');
    expect(APP.progress.get('shapes').bestStars).toBe(1);
  });

  it('bestStars never decreases', () => {
    APP.progress.recordWin('memory', { stars: 3 });
    APP.progress.recordWin('memory', { stars: 1 });
    expect(APP.progress.get('memory').bestStars).toBe(3);
    expect(APP.progress.get('memory').wins).toBe(2);
  });

  it('clamps stars to the 0-3 range', () => {
    APP.progress.recordWin('maze', { stars: 99 });
    expect(APP.progress.get('maze').bestStars).toBe(3);
  });

  it('stars: 0 is respected, not treated as missing', () => {
    APP.progress.recordWin('maze', { stars: 0 });
    expect(APP.progress.get('maze').bestStars).toBe(0);
    expect(APP.progress.get('maze').wins).toBe(1);
  });

  it('stars: 0 does not overwrite an earlier higher bestStars', () => {
    APP.progress.recordWin('maze', { stars: 2 });
    APP.progress.recordWin('maze', { stars: 0 });
    expect(APP.progress.get('maze').bestStars).toBe(2);
    expect(APP.progress.get('maze').wins).toBe(2);
  });

  it('recordPlay counts a play but not a win and leaves bestStars alone', () => {
    APP.progress.recordPlay('tictactoe');
    const g = APP.progress.get('tictactoe');
    expect(g.plays).toBe(1);
    expect(g.wins).toBe(0);
    expect(g.bestStars).toBe(0);
  });

  it('tracks games independently', () => {
    APP.progress.recordWin('memory');
    APP.progress.recordWin('maze', { stars: 2 });
    expect(APP.progress.get('memory').bestStars).toBe(1);
    expect(APP.progress.get('maze').bestStars).toBe(2);
    expect(Object.keys(APP.progress.all()).sort()).toEqual(['maze', 'memory']);
  });

  it('falls back to empty on corrupt stored JSON', () => {
    localStorage.setItem(KEY, '{not json');
    expect(APP.progress.get('memory')).toEqual({ plays: 0, wins: 0, bestStars: 0, lastPlayed: null });
    APP.progress.recordWin('memory');
    expect(APP.progress.get('memory').plays).toBe(1);
  });

  it('falls back to empty when stored value is not an object', () => {
    localStorage.setItem(KEY, JSON.stringify([1, 2]));
    expect(APP.progress.get('memory').plays).toBe(0);
    APP.progress.recordWin('memory');
    expect(APP.progress.get('memory').plays).toBe(1);
  });

  it('recordWin with no gameId is a no-op', () => {
    expect(APP.progress.recordWin()).toBeNull();
    expect(APP.progress.all()).toEqual({});
  });
});

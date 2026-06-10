import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

function makeApp() {
  const dom = new JSDOM('', { url: 'http://localhost' });
  global.localStorage = dom.window.localStorage;

  const APP = {};

  // Inline APP.store
  APP.store = {
    get: function(key, fallback) {
      try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch(_){ return fallback; }
    },
    set: function(key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch(_){}
    },
    remove: function(key) {
      try { localStorage.removeItem(key); } catch(_){} }
  };

  // Minimal APP.state
  APP.state = {
    settings: {
      maxLength: 6,
      letterCase: 'upper',
      depiction: 'cartoon',
      revealMode: 'faint',
      gameMode: 'trace',
      volume: 0.7,
      lastVolume: 0.7,
      muted: false,
      sfxVol: 0.7,
      sfxMuted: false,
      lastSfxVol: 0.7,
      bgMusicVol: 0.6,
      bgMusicEnabled: true,
      locale: 'en',
      phonics: true,
    }
  };

  // Inline APP.settings
  var GLOBAL_KEYS = ['sfxVol', 'sfxMuted', 'lastSfxVol', 'bgMusicVol', 'bgMusicEnabled'];
  var LETTER_KEYS = ['maxLength', 'letterCase', 'depiction', 'revealMode', 'phonics'];

  function load() {
    var g = APP.store.get('al.global', {});
    if (g.sfxVol !== undefined) { APP.state.settings.sfxVol = g.sfxVol; APP.state.settings.volume = g.sfxVol; }
    if (g.sfxMuted !== undefined) { APP.state.settings.sfxMuted = g.sfxMuted; APP.state.settings.muted = g.sfxMuted; }
    if (g.lastSfxVol !== undefined) { APP.state.settings.lastSfxVol = g.lastSfxVol; APP.state.settings.lastVolume = g.lastSfxVol; }
    if (g.bgMusicVol !== undefined) APP.state.settings.bgMusicVol = g.bgMusicVol;
    if (g.bgMusicEnabled !== undefined) APP.state.settings.bgMusicEnabled = g.bgMusicEnabled;
    var l = APP.store.get('al.game.letters', {});
    LETTER_KEYS.forEach(function(k) { if (l[k] !== undefined) APP.state.settings[k] = l[k]; });
  }

  function update(patch) {
    Object.assign(APP.state.settings, patch);
    if (patch.sfxVol !== undefined) APP.state.settings.volume = patch.sfxVol;
    if (patch.volume !== undefined) { APP.state.settings.sfxVol = patch.volume; patch = Object.assign({}, patch, { sfxVol: patch.volume }); }
    if (patch.sfxMuted !== undefined) APP.state.settings.muted = patch.sfxMuted;
    if (patch.muted !== undefined) { APP.state.settings.sfxMuted = patch.muted; patch = Object.assign({}, patch, { sfxMuted: patch.muted }); }
    if (patch.lastSfxVol !== undefined) APP.state.settings.lastVolume = patch.lastSfxVol;
    if (patch.lastVolume !== undefined) { APP.state.settings.lastSfxVol = patch.lastVolume; patch = Object.assign({}, patch, { lastSfxVol: patch.lastVolume }); }
    var gPatch = {};
    var anyGlobal = false;
    GLOBAL_KEYS.forEach(function(k) { if (patch[k] !== undefined) { gPatch[k] = patch[k]; anyGlobal = true; } });
    if (anyGlobal) { var cur = APP.store.get('al.global', {}); APP.store.set('al.global', Object.assign(cur, gPatch)); }
    var lPatch = {};
    var anyLetter = false;
    LETTER_KEYS.forEach(function(k) { if (patch[k] !== undefined) { lPatch[k] = patch[k]; anyLetter = true; } });
    if (anyLetter) { var curL = APP.store.get('al.game.letters', {}); APP.store.set('al.game.letters', Object.assign(curL, lPatch)); }
  }

  function game(gameId, defaults) {
    var saved = APP.store.get('al.game.' + gameId, {});
    return Object.assign({}, defaults, saved);
  }

  function saveGame(gameId, obj) { APP.store.set('al.game.' + gameId, obj); }

  function updateGame(gameId, patch, defaults) {
    var cur = game(gameId, defaults || {});
    var merged = Object.assign(cur, patch);
    saveGame(gameId, merged);
    return merged;
  }

  APP.settings = { update, load, get: function() { return APP.state.settings; }, game, saveGame, updateGame };

  return APP;
}

describe('APP.settings.update', () => {
  it('persists sfxVol to al.global', () => {
    const APP = makeApp();
    APP.settings.update({ sfxVol: 0.5 });
    const stored = APP.store.get('al.global', {});
    expect(stored.sfxVol).toBe(0.5);
  });

  it('syncs legacy volume alias when sfxVol updated', () => {
    const APP = makeApp();
    APP.settings.update({ sfxVol: 0.3 });
    expect(APP.state.settings.volume).toBe(0.3);
  });

  it('syncs sfxVol when volume updated', () => {
    const APP = makeApp();
    APP.settings.update({ volume: 0.4 });
    expect(APP.state.settings.sfxVol).toBe(0.4);
    const stored = APP.store.get('al.global', {});
    expect(stored.sfxVol).toBe(0.4);
  });

  it('persists bgMusicVol to al.global', () => {
    const APP = makeApp();
    APP.settings.update({ bgMusicVol: 0.3 });
    const stored = APP.store.get('al.global', {});
    expect(stored.bgMusicVol).toBe(0.3);
  });

  it('persists letterCase to al.game.letters', () => {
    const APP = makeApp();
    APP.settings.update({ letterCase: 'lower' });
    const stored = APP.store.get('al.game.letters', {});
    expect(stored.letterCase).toBe('lower');
  });

  it('does not persist gameMode (not in GLOBAL_KEYS or LETTER_KEYS)', () => {
    const APP = makeApp();
    APP.settings.update({ gameMode: 'find' });
    const g = APP.store.get('al.global', {});
    const l = APP.store.get('al.game.letters', {});
    expect(g.gameMode).toBeUndefined();
    expect(l.gameMode).toBeUndefined();
  });
});

describe('APP.settings.load', () => {
  it('restores sfxVol from al.global', () => {
    const APP = makeApp();
    APP.store.set('al.global', { sfxVol: 0.2 });
    APP.settings.load();
    expect(APP.state.settings.sfxVol).toBe(0.2);
    expect(APP.state.settings.volume).toBe(0.2);
  });

  it('restores letterCase from al.game.letters', () => {
    const APP = makeApp();
    APP.store.set('al.game.letters', { letterCase: 'proper' });
    APP.settings.load();
    expect(APP.state.settings.letterCase).toBe('proper');
  });
});

describe('APP.settings.game', () => {
  it('returns defaults when nothing persisted', () => {
    const APP = makeApp();
    const result = APP.settings.game('test', { x: 1, y: 2 });
    expect(result).toEqual({ x: 1, y: 2 });
  });

  it('merges saved over defaults', () => {
    const APP = makeApp();
    APP.store.set('al.game.test', { x: 99 });
    const result = APP.settings.game('test', { x: 1, y: 2 });
    expect(result).toEqual({ x: 99, y: 2 });
  });

  it('saveGame round-trips', () => {
    const APP = makeApp();
    APP.settings.saveGame('test', { foo: 'bar' });
    expect(APP.settings.game('test', {})).toEqual({ foo: 'bar' });
  });

  it('updateGame merges and persists', () => {
    const APP = makeApp();
    APP.settings.saveGame('test', { a: 1, b: 2 });
    const result = APP.settings.updateGame('test', { b: 99 }, { a: 0, b: 0 });
    expect(result.a).toBe(1);
    expect(result.b).toBe(99);
    expect(APP.settings.game('test', {}).b).toBe(99);
  });
});

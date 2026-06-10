import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('APP.store', () => {
  let dom;
  let APP;
  beforeEach(() => {
    dom = new JSDOM('', { url: 'http://localhost' });
    global.window = dom.window;
    global.localStorage = dom.window.localStorage;
    APP = {};
    // inline the store implementation
    (function(APP) {
      APP.store = {
        get: function(key, fallback) { try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch(_){ return fallback; } },
        set: function(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch(_){} },
        remove: function(key) { try { localStorage.removeItem(key); } catch(_){} }
      };
    })(APP);
  });
  it('returns fallback for missing key', () => expect(APP.store.get('x', 42)).toBe(42));
  it('round-trips a value', () => { APP.store.set('k', {a:1}); expect(APP.store.get('k', null)).toEqual({a:1}); });
  it('remove works', () => { APP.store.set('k', 1); APP.store.remove('k'); expect(APP.store.get('k', 99)).toBe(99); });
});

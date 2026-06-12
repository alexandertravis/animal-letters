import { describe, it, expect, beforeEach, vi } from 'vitest';

// Real module (IIFE attaches to window.APP; window === global via setup.js).
// jsdom has no speechSynthesis — stubbed per test below.
await import('../js/audio.js');

describe('APP.audio.speak / speakLetter', () => {
  let spoken;
  let cancelSpy;

  beforeEach(() => {
    spoken = [];
    cancelSpy = vi.fn();
    global.SpeechSynthesisUtterance = function (text) { this.text = text; };
    global.speechSynthesis = {
      cancel: cancelSpy,
      speak: (utt) => spoken.push(utt),
    };
    global.window.speechSynthesis = global.speechSynthesis;
    // setup.js resets settings without these fields — set what speech needs.
    Object.assign(APP.state.settings, {
      sfxMuted: false,
      phonics: true,
      locale: 'en',
      sfxVol: 0.5,
    });
  });

  it('speaks text verbatim with settings locale and sfx volume', () => {
    APP.audio.speak('Find the matching pairs!');
    expect(spoken).toHaveLength(1);
    expect(spoken[0].text).toBe('Find the matching pairs!');
    expect(spoken[0].lang).toBe('en-GB');
    expect(spoken[0].volume).toBe(0.5);
    expect(cancelSpy).toHaveBeenCalledOnce();
  });

  it('explicit locale argument overrides the settings locale', () => {
    APP.audio.speak('Bonjour', 'fr');
    expect(spoken[0].lang).toBe('fr-FR');
  });

  it('is silent when sfxMuted', () => {
    APP.state.settings.sfxMuted = true;
    APP.audio.speak('hello');
    expect(spoken).toHaveLength(0);
  });

  it('is silent when legacy muted flag is set', () => {
    APP.state.settings.muted = true;
    APP.audio.speak('hello');
    expect(spoken).toHaveLength(0);
  });

  it('volume 0 is respected, not treated as missing', () => {
    APP.state.settings.sfxVol = 0;
    APP.audio.speak('hello');
    expect(spoken[0].volume).toBe(0);
  });

  it('falls back to legacy volume field when sfxVol is null', () => {
    APP.state.settings.sfxVol = null;
    APP.state.settings.volume = 0.3;
    APP.audio.speak('hello');
    expect(spoken[0].volume).toBe(0.3);
  });

  it('no-ops without speechSynthesis support', () => {
    global.window.speechSynthesis = undefined;
    expect(() => APP.audio.speak('hello')).not.toThrow();
    expect(spoken).toHaveLength(0);
  });

  it('speakLetter lowercases and delegates to speak', () => {
    APP.audio.speakLetter('A', 'de');
    expect(spoken).toHaveLength(1);
    expect(spoken[0].text).toBe('a');
    expect(spoken[0].lang).toBe('de-DE');
  });

  it('speakLetter respects the phonics gate; speak does not', () => {
    APP.state.settings.phonics = false;
    APP.audio.speakLetter('A');
    expect(spoken).toHaveLength(0);
    APP.audio.speak('instructions still speak');
    expect(spoken).toHaveLength(1);
  });
});

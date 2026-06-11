window.APP = window.APP || {};

(function (APP) {
  var ac = null;          // AudioContext — created lazily on first user gesture
  var sfxMaster = null;   // SFX gain node (was masterGain)
  var bgMaster = null;    // Background music gain node (independent of sfxMaster)
  var currentAudio = null; // HTMLAudioElement for animal sound files
  var fileTimerId = null;  // setTimeout ID for the deferred playFile inside playComplete

  // Create / resume the AudioContext. Must be called from within a user gesture
  // (pointerdown, click, etc.) to satisfy browser autoplay policy.
  function getAC() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }

  // Returns the SFX master gain node, creating it on first call.
  // All synthesised SFX tones connect here so volume/mute applies globally.
  function getMaster() {
    var a = getAC();
    if (!sfxMaster) {
      sfxMaster = a.createGain();
      sfxMaster.connect(a.destination);
      // Initialise from current settings (may be called before any sound).
      var s = APP.state && APP.state.settings;
      sfxMaster.gain.value = s ? (s.sfxMuted || s.muted ? 0 : (s.sfxVol != null ? s.sfxVol : s.volume || 0.7)) : 0.7;
    }
    return sfxMaster;
  }

  // Returns the background music gain node, creating it on first call.
  function getBgMaster() {
    var a = getAC();
    if (!bgMaster) {
      bgMaster = a.createGain();
      bgMaster.connect(a.destination);
      var s = APP.state && APP.state.settings;
      var enabled = s ? s.bgMusicEnabled : true;
      var vol = s ? (s.bgMusicVol != null ? s.bgMusicVol : 0.3) : 0.3;
      bgMaster.gain.value = enabled ? vol : 0;
    }
    return bgMaster;
  }

  // Play a single oscillator tone. gain fades to silence over `dur` seconds.
  function tone(freq, dur, type, gainVal) {
    type = type || 'sine';
    gainVal = gainVal !== undefined ? gainVal : 0.3;
    try {
      var a = getAC();
      var osc  = a.createOscillator();
      var gain = a.createGain();
      osc.connect(gain);
      gain.connect(getMaster());   // route through sfx master volume
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainVal, a.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      osc.start(a.currentTime);
      osc.stop(a.currentTime + dur + 0.01);
    } catch (_) {}
  }

  // Play a tone with a frequency ramp (start → end freq over dur seconds).
  function tone2(startFreq, endFreq, dur, type, gainVal) {
    type = type || 'sine';
    gainVal = gainVal !== undefined ? gainVal : 0.3;
    try {
      var a = getAC();
      var osc  = a.createOscillator();
      var gain = a.createGain();
      osc.connect(gain);
      gain.connect(getMaster());
      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, a.currentTime);
      osc.frequency.linearRampToValueAtTime(endFreq, a.currentTime + dur);
      gain.gain.setValueAtTime(gainVal, a.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      osc.start(a.currentTime);
      osc.stop(a.currentTime + dur + 0.01);
    } catch (_) {}
  }

  // ── Background Music ──────────────────────────────────────────────────────

  var bgCurrent = null; // { id, stop() } — currently playing track

  // Schedule a single note on the bgMaster. Returns { stop() }.
  function bgNote(freq, startTime, dur, type, gainVal) {
    type = type || 'sine';
    gainVal = gainVal !== undefined ? gainVal : 0.08;
    var a = getAC();
    var osc = a.createOscillator();
    var g = a.createGain();
    osc.connect(g);
    g.connect(getBgMaster());
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(gainVal, startTime);
    g.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);
    osc.start(startTime);
    osc.stop(startTime + dur + 0.01);
    return {
      stop: function () {
        try { osc.stop(); } catch (_) {}
        try { osc.disconnect(); g.disconnect(); } catch (_) {}
      }
    };
  }

  // Generic looping track builder.
  // notes: [{freq, offset, dur, type, gain}], barDurMs: bar duration in ms
  // Returns a stop() function.
  function makeLoop(notes, barDurMs) {
    var active = true;
    var timerId = null;
    var activeNotes = [];

    function scheduleBar(barStart) {
      if (!active) return;
      var a = getAC();
      notes.forEach(function (n) {
        var t = barStart + n.offset;
        if (t >= a.currentTime - 0.01) {
          var nd = bgNote(n.freq, t, n.dur, n.type || 'sine', n.gain || 0.08);
          activeNotes.push(nd);
        }
      });
      // Schedule next bar with 20% lookahead
      var nextBarDelay = barDurMs * 0.8;
      var nextBarStart = barStart + barDurMs / 1000;
      timerId = setTimeout(function () {
        // Clean up old note objects (already stopped by WebAudio scheduler)
        activeNotes = [];
        scheduleBar(nextBarStart);
      }, nextBarDelay);
    }

    scheduleBar(getAC().currentTime + 0.05);

    return function stop() {
      active = false;
      if (timerId !== null) { clearTimeout(timerId); timerId = null; }
      activeNotes.forEach(function (n) { try { n.stop(); } catch (_) {} });
      activeNotes = [];
      // Fade out bgMaster quickly
      try {
        var a = getAC();
        getBgMaster().gain.setTargetAtTime(0, a.currentTime, 0.1);
        // Restore after fade
        setTimeout(function () {
          var s = APP.state && APP.state.settings;
          if (s && bgMaster) {
            var vol = s.bgMusicVol != null ? s.bgMusicVol : 0.3;
            bgMaster.gain.value = s.bgMusicEnabled ? vol : 0;
          }
        }, 500);
      } catch (_) {}
    };
  }

  // Beat duration helpers (seconds per beat at given BPM)
  function spb(bpm) { return 60 / bpm; }

  var TRACKS = {
    // Gentle pentatonic sparkle: C5 E5 G5 A5 notes, ~120bpm, sine, 4-beat bar
    map: function () {
      var b = spb(120);
      var notes = [
        { freq: 523, offset: 0,     dur: b * 0.8 },
        { freq: 659, offset: b,     dur: b * 0.8 },
        { freq: 784, offset: b * 2, dur: b * 0.8 },
        { freq: 880, offset: b * 3, dur: b * 0.8 }
      ];
      return makeLoop(notes, b * 4 * 1000);
    },
    // C major arpeggio: C4 E4 G4 C5, 160bpm, triangle
    school: function () {
      var b = spb(160);
      var notes = [
        { freq: 262, offset: 0,     dur: b * 0.7, type: 'triangle' },
        { freq: 330, offset: b,     dur: b * 0.7, type: 'triangle' },
        { freq: 392, offset: b * 2, dur: b * 0.7, type: 'triangle' },
        { freq: 523, offset: b * 3, dur: b * 1.2, type: 'triangle' }
      ];
      return makeLoop(notes, b * 4 * 1000);
    },
    // Slow harp-like drone: C3 + G3 sustained
    library: function () {
      var b = spb(60);
      var notes = [
        { freq: 131, offset: 0,     dur: b * 3, gain: 0.06 },
        { freq: 196, offset: b * 0.5, dur: b * 3, gain: 0.05 }
      ];
      return makeLoop(notes, b * 4 * 1000);
    },
    // Bright bouncy 6/8: C5 D5 E5 G5, 180bpm, square at low gain
    kitchen: function () {
      var b = spb(180);
      var notes = [
        { freq: 523, offset: 0,     dur: b * 0.5, type: 'square', gain: 0.04 },
        { freq: 587, offset: b,     dur: b * 0.5, type: 'square', gain: 0.04 },
        { freq: 659, offset: b * 2, dur: b * 0.5, type: 'square', gain: 0.04 },
        { freq: 784, offset: b * 3, dur: b * 1.0, type: 'square', gain: 0.04 }
      ];
      return makeLoop(notes, b * 4 * 1000);
    },
    // Upbeat march: alternating fifths, 140bpm, sawtooth soft
    games: function () {
      var b = spb(140);
      var notes = [
        { freq: 262, offset: 0,     dur: b * 0.6, type: 'sawtooth', gain: 0.04 },
        { freq: 392, offset: b,     dur: b * 0.6, type: 'sawtooth', gain: 0.04 },
        { freq: 262, offset: b * 2, dur: b * 0.6, type: 'sawtooth', gain: 0.04 },
        { freq: 392, offset: b * 3, dur: b * 0.6, type: 'sawtooth', gain: 0.04 }
      ];
      return makeLoop(notes, b * 4 * 1000);
    },
    // Slow C-E-G-C cycle, 80bpm, sine soft
    'default': function () {
      var b = spb(80);
      var notes = [
        { freq: 262, offset: 0,     dur: b * 1.5, gain: 0.07 },
        { freq: 330, offset: b * 1.5, dur: b * 1.5, gain: 0.07 },
        { freq: 392, offset: b * 3, dur: b * 1.5, gain: 0.07 }
      ];
      return makeLoop(notes, b * 4 * 1000);
    }
  };
  TRACKS.park = TRACKS.map;

  // ── APP.audio ─────────────────────────────────────────────────────────────

  APP.audio = {
    // Short "tick" — played each time a stroke is completed.
    strokeDone: function () {
      tone(880, 0.12, 'sine', 0.18);
    },

    // Ascending arpeggio — played when a whole letter is finished.
    letterDone: function () {
      tone(523, 0.18, 'sine', 0.22);
      setTimeout(function () { tone(659, 0.18, 'sine', 0.22); }, 90);
      setTimeout(function () { tone(784, 0.28, 'sine', 0.22); }, 180);
    },

    // Fanfare — played when the full word is complete.
    wordDone: function () {
      tone(523, 0.18, 'sine', 0.28);
      setTimeout(function () { tone(659, 0.18, 'sine', 0.28); }, 110);
      setTimeout(function () { tone(784, 0.18, 'sine', 0.28); }, 220);
      setTimeout(function () {
        tone(523, 0.5, 'sine', 0.2);
        tone(659, 0.5, 'sine', 0.2);
        tone(784, 0.5, 'sine', 0.2);
      }, 330);
    },

    // Play an animal-sound file. Falls back silently if missing/blocked.
    playFile: function (src) {
      this.stopFile();
      if (!src) return;
      var el = new Audio(src);
      var s = APP.state && APP.state.settings;
      el.volume = (s && (s.sfxMuted || s.muted)) ? 0 : ((s && s.sfxVol != null) ? s.sfxVol : (s && s.volume) || 0.7);
      el.addEventListener('error', function () {});
      el.play().catch(function () {});
      currentAudio = el;
    },

    stopFile: function () {
      // Cancel any pending deferred playFile from playComplete so navigating
      // away before 900 ms does not start the animal sound on the wrong screen.
      if (fileTimerId !== null) { clearTimeout(fileTimerId); fileTimerId = null; }
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    },

    // Convenience: play file + fanfare together on the complete screen.
    playComplete: function (src) {
      var self = this;
      this.wordDone();
      fileTimerId = setTimeout(function () { fileTimerId = null; self.playFile(src); }, 900);
    },

    // ── Volume control ───────────────────────────────────────────────────────

    // Set master SFX volume (0–1). Saves the last non-zero level so un-muting
    // can restore it. Auto-mutes when dragged to 0.
    setVolume: function (v) {
      v = Math.max(0, Math.min(1, v));
      var patch = { sfxVol: v, volume: v, sfxMuted: v === 0, muted: v === 0 };
      if (v > 0) { patch.lastSfxVol = v; patch.lastVolume = v; }
      if (APP.settings) {
        APP.settings.update(patch);
      } else {
        Object.assign(APP.state.settings, patch);
      }
      this._applyGain();
    },

    // Toggle or explicitly set mute state.
    // Un-muting from volume=0 restores the last non-zero level.
    setMuted: function (bool) {
      var s = APP.state.settings;
      var patch = { sfxMuted: bool, muted: bool };
      if (!bool && (s.sfxVol === 0 || s.volume === 0)) {
        // Slider was at 0 — restore to last audible position (or default 0.7).
        var restoreVol = s.lastSfxVol || s.lastVolume || 0.7;
        patch.sfxVol = restoreVol;
        patch.volume = restoreVol;
      }
      if (APP.settings) {
        APP.settings.update(patch);
      } else {
        Object.assign(APP.state.settings, patch);
      }
      this._applyGain();
      // Adjust any currently-playing file element.
      if (currentAudio) {
        currentAudio.volume = bool ? 0 : (APP.state.settings.sfxVol || APP.state.settings.volume || 0.7);
      }
    },

    // Apply current SFX volume + mute to the sfxMaster gain node.
    // Calls getMaster() lazily so it works even before the first tone plays.
    _applyGain: function () {
      try {
        var master = getMaster();
        var s = APP.state.settings;
        var muted = s.sfxMuted || s.muted;
        var vol = s.sfxVol != null ? s.sfxVol : (s.volume || 0.7);
        master.gain.setTargetAtTime(muted ? 0 : vol, ac.currentTime, 0.015);
      } catch (_) {}
    },

    // Wake / resume the AudioContext during a user gesture so later sounds fire instantly.
    _wake: function () { try { getMaster(); } catch (_) {} },

    // Exposed for external use (music.js instruments)
    tone: tone,
    master: function () { return getMaster(); }
  };

  // ── SFX namespace (mirrors top-level methods + new ones) ──────────────────
  APP.audio.sfx = {
    strokeDone: function () { APP.audio.strokeDone(); },
    letterDone: function () { APP.audio.letterDone(); },
    wordDone: function () { APP.audio.wordDone(); },
    playComplete: function (src) { APP.audio.playComplete(src); },
    stopFile: function () { APP.audio.stopFile(); },
    click: function () { tone(660, 0.06, 'sine', 0.15); },
    wrong: function () { tone2(340, 220, 0.18, 'sawtooth', 0.12); },
    pop: function () { tone2(880, 1760, 0.08, 'triangle', 0.18); },
    setVol: function (v) { APP.audio.setVolume(v); },
    setMuted: function (b) { APP.audio.setMuted(b); }
  };

  // ── Background music files (one per location) ─────────────────────────────
  // Real MP3 tracks served from assets/music/. If a file fails to load we fall
  // back to the synthesised TRACKS oscillator for that id.
  var MUSIC_FILES = {
    map:     'assets/music/the_mountain-happy-peaceful-522464.mp3',
    school:  'assets/music/nastelbom-children-291652.mp3',
    library: 'assets/music/the_mountain-children-522447.mp3',
    kitchen: 'assets/music/the_mountain-cartoon-522446.mp3',
    games:   'assets/music/nastelbom-children-436855.mp3',
    music:   'assets/music/the_mountain-children-483305.mp3',
    default: 'assets/music/the_mountain-children-commercial-129872.mp3'
  };
  var bgAudio = null;   // active HTMLAudioElement for file-based music

  // ── Music namespace ───────────────────────────────────────────────────────
  APP.audio.music = {
    play: function (trackId) {
      var s = APP.state && APP.state.settings;
      if (s && !s.bgMusicEnabled) return;
      var file = MUSIC_FILES[trackId] || MUSIC_FILES['default'];
      // Already playing the same file — leave it running.
      if (bgAudio && bgAudio._trackId === trackId && !bgAudio.paused) return;
      // Stop any synthesised oscillator track first.
      if (bgCurrent) { try { bgCurrent.stop(); } catch (_) {} bgCurrent = null; }
      // Stop any previously-playing file.
      if (bgAudio) { bgAudio.pause(); bgAudio = null; }
      var vol = s ? (s.bgMusicVol != null ? s.bgMusicVol : 0.3) : 0.3;
      var el = new Audio(file);
      el._trackId = trackId;
      el.loop = true;
      el.volume = vol;
      el.addEventListener('error', function () {
        // File failed to load — fall back to the synthesised track.
        if (bgAudio === el) bgAudio = null;
        var fn = TRACKS[trackId] || TRACKS['default'];
        if (!fn) return;
        var bm = getBgMaster();
        if (bm && ac) bm.gain.setValueAtTime(vol, ac.currentTime);
        bgCurrent = { id: trackId, stop: fn() };
      });
      // play() may reject until a user gesture — that's fine, it retries on the
      // next navigation (which is always inside a click/tap gesture).
      el.play().catch(function () {});
      bgAudio = el;
    },
    stop: function () {
      if (bgAudio) { bgAudio.pause(); bgAudio = null; }
      if (bgCurrent) { try { bgCurrent.stop(); } catch (_) {} bgCurrent = null; }
    },
    setVol: function (v) {
      if (APP.settings) APP.settings.update({ bgMusicVol: v });
      else if (APP.state) APP.state.settings.bgMusicVol = v;
      var s = APP.state && APP.state.settings;
      var enabled = s ? s.bgMusicEnabled : true;
      if (bgAudio) bgAudio.volume = enabled ? v : 0;
      if (bgMaster && ac) {
        bgMaster.gain.setTargetAtTime(enabled ? v : 0, getAC().currentTime, 0.1);
      }
    },
    setEnabled: function (b) {
      if (APP.settings) APP.settings.update({ bgMusicEnabled: b });
      else if (APP.state) APP.state.settings.bgMusicEnabled = b;
      var s = APP.state && APP.state.settings;
      var vol = s ? (s.bgMusicVol != null ? s.bgMusicVol : 0.6) : 0.6;
      // Keep the file element alive but silence it when disabled, so re-enabling
      // is instant without needing a fresh user gesture to restart playback.
      if (bgAudio) bgAudio.volume = b ? vol : 0;
      if (bgMaster && ac) {
        bgMaster.gain.setTargetAtTime(b ? vol : 0, getAC().currentTime, 0.3);
      }
    }
  };

  // Pause background music when the page is hidden (lock screen, tab switch).
  // Resume when it becomes visible again. Registered once per page load.
  if (!APP.audio._visibilityBound) {
    APP.audio._visibilityBound = true;
    document.addEventListener('visibilitychange', function () {
      if (!bgAudio) return;
      if (document.hidden) {
        bgAudio.pause();
      } else {
        var s = APP.state && APP.state.settings;
        if (s && s.bgMusicEnabled !== false) bgAudio.play().catch(function () {});
      }
    });
    // pagehide fires on iOS Safari when the app moves to the background.
    window.addEventListener('pagehide', function () {
      if (bgAudio) bgAudio.pause();
    });
  }

  APP.audio.speakLetter = function (char, locale) {
    if (!window.speechSynthesis) return;
    if (!APP.state.settings.phonics) return;
    var s = APP.state.settings;
    if (s.sfxMuted || s.muted) return;
    // Pass the character as lowercase so iOS TTS does not prepend "Capital" before
    // uppercase letter names (e.g. "A" → "Capital A"). Lowercase reads the letter
    // sound directly on all tested voices.
    var utt = new SpeechSynthesisUtterance(char.toLowerCase());
    var langMap = { en: 'en-GB', pt: 'pt-PT', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', it: 'it-IT' };
    utt.lang = langMap[locale || 'en'] || 'en-GB';
    utt.rate = 0.85;
    var vol = s.sfxVol != null ? s.sfxVol : (s.volume != null ? s.volume : 1);
    utt.volume = vol;
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  };
})(window.APP);

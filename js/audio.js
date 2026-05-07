window.APP = window.APP || {};

(function (APP) {
  let ac = null;             // AudioContext — created lazily on first user gesture
  let masterGain = null;     // Single gain node all sounds route through
  let currentAudio = null;   // HTMLAudioElement for animal sound files
  let fileTimerId = null;    // setTimeout ID for the deferred playFile inside playComplete

  // Create / resume the AudioContext. Must be called from within a user gesture
  // (pointerdown, click, etc.) to satisfy browser autoplay policy.
  function getAC() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }

  // Returns the master gain node, creating it on first call.
  // All synthesised tones connect here so volume/mute applies globally.
  function getMaster() {
    const a = getAC();
    if (!masterGain) {
      masterGain = a.createGain();
      masterGain.connect(a.destination);
      // Initialise from current settings (may be called before any sound).
      const s = APP.state && APP.state.settings;
      masterGain.gain.value = s ? (s.muted ? 0 : s.volume) : 0.7;
    }
    return masterGain;
  }

  // Play a single oscillator tone. gain fades to silence over `dur` seconds.
  function tone(freq, dur, type = 'sine', gainVal = 0.3) {
    try {
      const a = getAC();
      const osc  = a.createOscillator();
      const gain = a.createGain();
      osc.connect(gain);
      gain.connect(getMaster());   // route through master volume
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(gainVal, a.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
      osc.start(a.currentTime);
      osc.stop(a.currentTime + dur + 0.01);
    } catch (_) {}
  }

  function schedule(fn, delayMs) { setTimeout(fn, delayMs); }

  APP.audio = {
    // Short "tick" — played each time a stroke is completed.
    strokeDone() {
      tone(880, 0.12, 'sine', 0.18);
    },

    // Ascending arpeggio — played when a whole letter is finished.
    letterDone() {
      tone(523, 0.18, 'sine', 0.22);
      schedule(() => tone(659, 0.18, 'sine', 0.22), 90);
      schedule(() => tone(784, 0.28, 'sine', 0.22), 180);
    },

    // Fanfare — played when the full word is complete.
    wordDone() {
      tone(523, 0.18, 'sine', 0.28);
      schedule(() => tone(659, 0.18, 'sine', 0.28), 110);
      schedule(() => tone(784, 0.18, 'sine', 0.28), 220);
      schedule(() => {
        tone(523, 0.5, 'sine', 0.2);
        tone(659, 0.5, 'sine', 0.2);
        tone(784, 0.5, 'sine', 0.2);
      }, 330);
    },

    // Play an animal-sound file. Falls back silently if missing/blocked.
    playFile(src) {
      this.stopFile();
      if (!src) return;
      const el = new Audio(src);
      el.volume = APP.state.settings.muted ? 0 : APP.state.settings.volume;
      el.addEventListener('error', () => {});
      el.play().catch(() => {});
      currentAudio = el;
    },

    stopFile() {
      // Cancel any pending deferred playFile from playComplete so navigating
      // away before 900 ms does not start the animal sound on the wrong screen.
      if (fileTimerId !== null) { clearTimeout(fileTimerId); fileTimerId = null; }
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    },

    // Convenience: play file + fanfare together on the complete screen.
    playComplete(src) {
      this.wordDone();
      fileTimerId = setTimeout(() => { fileTimerId = null; this.playFile(src); }, 900);
    },

    // ── Volume control ───────────────────────────────────────────────────────

    // Set master volume (0–1). Un-mutes automatically.
    setVolume(v) {
      v = Math.max(0, Math.min(1, v));
      APP.state.settings.volume = v;
      APP.state.settings.muted  = v === 0;
      this._applyGain();
    },

    // Toggle or explicitly set mute state.
    setMuted(bool) {
      APP.state.settings.muted = bool;
      this._applyGain();
      // Adjust any currently-playing file element.
      if (currentAudio) {
        currentAudio.volume = bool ? 0 : APP.state.settings.volume;
      }
    },

    // Apply current volume + mute to the master gain node (if it exists).
    _applyGain() {
      if (!masterGain || !ac) return;
      const s = APP.state.settings;
      masterGain.gain.setTargetAtTime(s.muted ? 0 : s.volume, ac.currentTime, 0.015);
    },

    // Wake / resume the AudioContext during a user gesture so later sounds fire instantly.
    _wake() { try { getMaster(); } catch (_) {} }
  };
})(window.APP);

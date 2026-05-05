window.APP = window.APP || {};

(function (APP) {
  let ac = null;           // AudioContext — created lazily on first user gesture
  let currentAudio = null; // HTMLAudioElement for animal sound files

  // Create / resume the AudioContext. Must be called from within a user gesture
  // (pointerdown, click, etc.) to satisfy browser autoplay policy.
  function getAC() {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    return ac;
  }

  // Play a single oscillator tone. gain fades to silence over `dur` seconds.
  function tone(freq, dur, type = 'sine', gainVal = 0.3) {
    try {
      const a = getAC();
      const osc  = a.createOscillator();
      const gain = a.createGain();
      osc.connect(gain);
      gain.connect(a.destination);
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
      el.addEventListener('error', () => {});
      el.play().catch(() => {});
      currentAudio = el;
    },

    stopFile() {
      if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    },

    // Convenience: play file + fanfare together on the complete screen.
    playComplete(src) {
      this.wordDone();
      // Delay the animal sound slightly so the fanfare isn't swamped.
      schedule(() => this.playFile(src), 900);
    },

    // Wake / resume the AudioContext during a user gesture so later sounds fire instantly.
    _wake() { try { getAC(); } catch (_) {} }
  };
})(window.APP);

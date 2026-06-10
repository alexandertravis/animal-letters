window.APP = window.APP || {};
(function (APP) {

  var WHITE_KEYS = [
    { note: 'C4', freq: 261.63 }, { note: 'D4', freq: 293.66 }, { note: 'E4', freq: 329.63 },
    { note: 'F4', freq: 349.23 }, { note: 'G4', freq: 392.00 }, { note: 'A4', freq: 440.00 },
    { note: 'B4', freq: 493.88 }, { note: 'C5', freq: 523.25 }
  ];
  var BLACK_KEYS = [
    { note: 'C#4', freq: 277.18, pos: 0.6 }, { note: 'D#4', freq: 311.13, pos: 1.6 },
    { note: 'F#4', freq: 369.99, pos: 3.6 }, { note: 'G#4', freq: 415.30, pos: 4.6 },
    { note: 'A#4', freq: 466.16, pos: 5.6 }
  ];

  function injectStyles() {
    if (document.getElementById('music-css')) return;
    var s = document.createElement('style');
    s.id = 'music-css';
    s.textContent = [
      '.music-screen{display:flex;flex-direction:column;min-height:100vh;}',
      '.music-tabs{display:flex;border-bottom:2px solid #e0e0e0;}',
      '.music-tab{flex:1;padding:12px;background:none;border:none;font-size:1rem;font-weight:700;cursor:pointer;opacity:.6;}',
      '.music-tab.active{opacity:1;border-bottom:3px solid #a78bfa;margin-bottom:-2px;}',
      '.music-content{flex:1;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;}',
      '.piano-wrap{position:relative;height:160px;width:min(500px,90vw);}',
      '.piano-white{position:absolute;bottom:0;border:2px solid #999;border-radius:0 0 6px 6px;background:#fff;cursor:pointer;}',
      '.piano-white:active,.piano-white.pressed{background:#e8e0ff;}',
      '.piano-black{position:absolute;top:0;background:#222;border-radius:0 0 4px 4px;z-index:2;cursor:pointer;}',
      '.piano-black:active,.piano-black.pressed{background:#5b21b6;}',
      '.drum-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;width:min(360px,90vw);}',
      '.drum-pad{height:100px;border:none;border-radius:16px;font-size:1.2rem;font-weight:800;cursor:pointer;color:#fff;box-shadow:0 4px 0 rgba(0,0,0,.3);}',
      '.drum-pad:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.3);}',
      '.shaker-grid{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;}',
      '.shaker-btn{width:110px;height:110px;border-radius:50%;border:none;font-size:2rem;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.2);}',
      '.shaker-btn:active{transform:scale(.95);}',
      '@keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-15deg)}75%{transform:rotate(15deg)}}',
      '.wiggle{animation:wiggle .3s ease;}',
    ].join('');
    document.head.appendChild(s);
  }

  // ── Audio helpers ──────────────────────────────────────────────────────────

  function playNote(freq) {
    try {
      var master = APP.audio.master();
      var ac = master.context;
      var osc = ac.createOscillator();
      var env = ac.createGain();
      osc.connect(env); env.connect(master);
      osc.type = 'triangle'; osc.frequency.value = freq;
      env.gain.setValueAtTime(0.5, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 1.0);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + 1.1);
    } catch(e){}
  }

  function playKick() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var osc = ac.createOscillator(), env = ac.createGain();
      osc.connect(env); env.connect(master);
      osc.type = 'sine'; osc.frequency.setValueAtTime(120, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ac.currentTime + 0.15);
      env.gain.setValueAtTime(0.8, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + 0.35);
    } catch(e){}
  }

  function playSnare() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var buf = ac.createBuffer(1, ac.sampleRate * 0.15, ac.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
      var src = ac.createBufferSource(), env = ac.createGain();
      src.buffer = buf; src.connect(env); env.connect(master);
      env.gain.setValueAtTime(0.6, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.15);
      src.start(ac.currentTime);
    } catch(e){}
  }

  function playHihat() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var buf = ac.createBuffer(1, ac.sampleRate * 0.04, ac.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      var src = ac.createBufferSource(), env = ac.createGain();
      src.buffer = buf; src.connect(env); env.connect(master);
      env.gain.setValueAtTime(0.4, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.04);
      src.start(ac.currentTime);
    } catch(e){}
  }

  function playTom() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var osc = ac.createOscillator(), env = ac.createGain();
      osc.connect(env); env.connect(master);
      osc.type = 'sine'; osc.frequency.setValueAtTime(200, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ac.currentTime + 0.2);
      env.gain.setValueAtTime(0.7, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + 0.35);
    } catch(e){}
  }

  function playTambourine() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var buf = ac.createBuffer(1, ac.sampleRate * 0.25, ac.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ac.sampleRate * 0.08));
      var src = ac.createBufferSource(), env = ac.createGain();
      src.buffer = buf; src.connect(env); env.connect(master);
      env.gain.setValueAtTime(0.5, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.25);
      src.start(ac.currentTime);
    } catch(e){}
  }

  function playMaracas() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var buf = ac.createBuffer(1, ac.sampleRate * 0.12, ac.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
      var src = ac.createBufferSource(), env = ac.createGain();
      src.buffer = buf; src.connect(env); env.connect(master);
      env.gain.setValueAtTime(0.4, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
      src.start(ac.currentTime);
    } catch(e){}
  }

  function playClaves() {
    try {
      var master = APP.audio.master(), ac = master.context;
      var osc = ac.createOscillator(), env = ac.createGain();
      osc.connect(env); env.connect(master);
      osc.type = 'sine'; osc.frequency.value = 1200;
      env.gain.setValueAtTime(0.6, ac.currentTime);
      env.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + 0.07);
    } catch(e){}
  }

  function addWiggle(el) {
    el.classList.remove('wiggle');
    void el.offsetWidth; // reflow to restart animation
    el.classList.add('wiggle');
    el.addEventListener('animationend', function () { el.classList.remove('wiggle'); }, { once: true });
  }

  // ── Tab content builders ───────────────────────────────────────────────────

  function buildKeyboard(content) {
    content.innerHTML = '';
    var pianoWrap = document.createElement('div');
    pianoWrap.className = 'piano-wrap';

    var numWhite = WHITE_KEYS.length;

    WHITE_KEYS.forEach(function (key, i) {
      var el = document.createElement('div');
      el.className = 'piano-white';
      var pct = (i / numWhite) * 100;
      var widthPct = (1 / numWhite) * 100;
      el.style.left   = pct + '%';
      el.style.width  = (widthPct - 0.5) + '%';
      el.style.height = '100%';
      el.setAttribute('aria-label', key.note);
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        playNote(key.freq);
        el.classList.add('pressed');
      });
      el.addEventListener('pointerup', function () { el.classList.remove('pressed'); });
      el.addEventListener('pointerleave', function () { el.classList.remove('pressed'); });
      pianoWrap.appendChild(el);
    });

    BLACK_KEYS.forEach(function (key) {
      var el = document.createElement('div');
      el.className = 'piano-black';
      // pos is the fractional white-key position for placement
      var leftPct = ((key.pos + 0.65) / numWhite) * 100;
      var widthPct = (0.6 / numWhite) * 100;
      el.style.left   = leftPct + '%';
      el.style.width  = widthPct + '%';
      el.style.height = '60%';
      el.setAttribute('aria-label', key.note);
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        playNote(key.freq);
        el.classList.add('pressed');
      });
      el.addEventListener('pointerup', function () { el.classList.remove('pressed'); });
      el.addEventListener('pointerleave', function () { el.classList.remove('pressed'); });
      pianoWrap.appendChild(el);
    });

    content.appendChild(pianoWrap);
  }

  function buildDrums(content) {
    content.innerHTML = '';
    var grid = document.createElement('div');
    grid.className = 'drum-grid';

    var pads = [
      { label: '🥁 ' + (APP.t('game.music.kick') || 'Kick'),   color: '#e74c3c', fn: playKick },
      { label: '🥁 ' + (APP.t('game.music.snare') || 'Snare'), color: '#3498db', fn: playSnare },
      { label: '🎵 ' + (APP.t('game.music.hihat') || 'Hi-hat'),color: '#f39c12', fn: playHihat },
      { label: '🥁 ' + (APP.t('game.music.tom') || 'Tom'),     color: '#2ecc71', fn: playTom },
    ];

    pads.forEach(function (pad) {
      var btn = document.createElement('button');
      btn.className = 'drum-pad';
      btn.style.background = pad.color;
      btn.textContent = pad.label;
      btn.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        pad.fn();
      });
      grid.appendChild(btn);
    });

    content.appendChild(grid);
  }

  function buildShakers(content) {
    content.innerHTML = '';
    var shakers = [
      { label: '🪘 ' + (APP.t('game.music.tambourine') || 'Tambourine'), color: '#e67e22', fn: playTambourine },
      { label: '🎶 ' + (APP.t('game.music.maracas') || 'Maracas'),       color: '#9b59b6', fn: playMaracas },
      { label: '🪵 ' + (APP.t('game.music.claves') || 'Claves'),          color: '#1abc9c', fn: playClaves },
    ];
    var grid = document.createElement('div');
    grid.className = 'shaker-grid';
    shakers.forEach(function (shaker) {
      var btn = document.createElement('button');
      btn.className = 'shaker-btn';
      btn.style.background = shaker.color;
      btn.style.color = '#fff';
      btn.textContent = shaker.label;
      btn.style.fontWeight = '700';
      btn.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        shaker.fn();
        addWiggle(btn);
      });
      grid.appendChild(btn);
    });
    content.appendChild(grid);
  }

  // ── Main render ────────────────────────────────────────────────────────────

  function render(root, ctx) {
    // Stop background music
    if (APP.audio && APP.audio.music) try { APP.audio.music.stop(); } catch(e){}

    injectStyles();
    root.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'music-screen';

    // Topbar — no settings gear for music
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('game.music.title') || 'Music Shed',
      home: true,
      back: true
    }));

    // Tab bar
    var tabs = document.createElement('div');
    tabs.className = 'music-tabs';

    var tabDefs = [
      { key: 'keyboard', label: APP.t('game.music.keyboard') || 'Keyboard', fn: buildKeyboard },
      { key: 'drums',    label: APP.t('game.music.drums') || 'Drums',        fn: buildDrums },
      { key: 'shakers',  label: APP.t('game.music.shakers') || 'Maracas',    fn: buildShakers },
    ];

    var activeTab = 'keyboard';
    var content = document.createElement('div');
    content.className = 'music-content';

    var tabBtns = [];
    tabDefs.forEach(function (def) {
      var btn = document.createElement('button');
      btn.className = 'music-tab' + (def.key === activeTab ? ' active' : '');
      btn.textContent = def.label;
      btn.addEventListener('click', function () {
        activeTab = def.key;
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        def.fn(content);
      });
      tabBtns.push(btn);
      tabs.appendChild(btn);
    });

    wrap.appendChild(tabs);
    wrap.appendChild(content);
    root.appendChild(wrap);

    // Build initial tab
    buildKeyboard(content);
  }

  APP.screens = APP.screens || {};
  APP.screens.music = { render: render };
})(window.APP);

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
      '.music-content{flex:1;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:24px;}',
      '.piano-wrap{position:relative;height:160px;width:min(500px,90vw);}',
      '.piano-white{position:absolute;bottom:0;border:2px solid #999;border-radius:0 0 6px 6px;background:#fff;cursor:pointer;}',
      '.piano-white:active,.piano-white.pressed{background:#e8e0ff;}',
      '.piano-black{position:absolute;top:0;background:#222;border-radius:0 0 4px 4px;z-index:2;cursor:pointer;}',
      '.piano-black:active,.piano-black.pressed{background:#5b21b6;}',
      '.drum-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;width:min(360px,90vw);}',
      '.drum-pad{height:100px;border:none;border-radius:16px;font-size:1.2rem;font-weight:800;cursor:pointer;color:#fff;box-shadow:0 4px 0 rgba(0,0,0,.3);}',
      '.drum-pad:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.3);}',
      '.shaker-grid{display:flex;gap:24px;flex-wrap:wrap;justify-content:center;}',
      '.shaker-btn{width:130px;height:130px;border-radius:50%;border:none;font-size:0.9rem;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.2);display:flex;flex-direction:column;align-items:center;justify-content:center;}',
      '.shaker-btn:active{transform:scale(.95);}',
      '@keyframes wiggle{0%,100%{transform:rotate(0)}25%{transform:rotate(-15deg)}75%{transform:rotate(15deg)}}',
      '.wiggle{animation:wiggle .3s ease;}',
      '.song-select-row{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:6px 0 14px;}',
      '.song-btn{font-size:.85rem;}',
      '.piano-white.key-next,.piano-black.key-next{animation:key-pulse .8s ease-in-out infinite;}',
      '.piano-white.key-active{background:#fff176;}',
      '.piano-black.key-active{background:#b9952b;}',
      '@keyframes key-pulse{0%,100%{box-shadow:0 0 0 3px #f9c74f inset}50%{box-shadow:0 0 0 6px #f9c74f inset,0 0 12px #f9c74f}}',
      '.drum-kit-wrap{display:flex;justify-content:center;align-items:center;width:100%;padding:8px;}',
      '.drum-kit-svg{width:min(340px,92vw);height:auto;}',
      '.drum-part{cursor:pointer;}',
      '@media (orientation:portrait){.song-select-row{order:-1;}}',
      '@media (orientation:landscape) and (max-height:520px){',
        '.music-content{flex-direction:row;align-items:stretch;padding:8px 12px;gap:12px;padding-top:8px;}',
        '.piano-wrap{flex:1;min-width:0;height:min(140px,35vh);}',
        '.song-select-row{flex-direction:column;align-items:stretch;width:160px;flex-shrink:0;overflow-y:auto;padding:0;gap:4px;order:0;}',
        '.song-btn{font-size:0.75rem;padding:6px 8px;text-align:left;}',
        '.song-stop-btn{position:sticky;top:0;z-index:2;}',
      '}',
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

  // ── Nursery-rhyme sequences (C-major, matches the white/black keys above) ───
  var SONGS = [
    { name: 'Twinkle Twinkle', notes: [262,262,392,392,440,440,392,349,349,330,330,294,294,262] },
    { name: 'Mary Had a Lamb',  notes: [330,294,262,294,330,330,330,294,294,294,330,392,392] },
    { name: 'Baa Baa Sheep',    notes: [262,262,392,392,440,494,523,440,392] }
  ];
  var activeSong = null;     // { song, stepIndex }
  var activeSongNote = null; // freq the player must press next

  function startSong(song, songRow, pianoWrap) {
    activeSong = { song: song, stepIndex: 0 };
    activeSongNote = song.notes[0];
    var stop = songRow.querySelector('.song-stop-btn');
    if (stop) stop.style.display = '';
    songRow.querySelectorAll('.song-btn').forEach(function (b) { b.style.opacity = '0.4'; });
    updateKeyHighlights(pianoWrap);
  }

  function stopSong(songRow, pianoWrap) {
    activeSong = null; activeSongNote = null;
    var stop = songRow.querySelector('.song-stop-btn');
    if (stop) stop.style.display = 'none';
    songRow.querySelectorAll('.song-btn').forEach(function (b) { b.style.opacity = ''; });
    pianoWrap.querySelectorAll('.key-next,.key-active').forEach(function (k) {
      k.classList.remove('key-next', 'key-active');
    });
  }

  function updateKeyHighlights(pianoWrap) {
    pianoWrap.querySelectorAll('[data-freq]').forEach(function (k) {
      k.classList.remove('key-next');
      var freq = parseFloat(k.getAttribute('data-freq'));
      if (activeSongNote != null && Math.abs(freq - activeSongNote) < 5) k.classList.add('key-next');
    });
  }

  // Advance the active song when the correct key is pressed. Returns nothing.
  function songProgress(keyFreq, el, songRow, pianoWrap) {
    if (!activeSong || activeSongNote == null) return;
    if (Math.abs(keyFreq - activeSongNote) >= 5) return;
    el.classList.add('key-active');
    setTimeout(function () { el.classList.remove('key-active'); }, 200);
    activeSong.stepIndex++;
    if (activeSong.stepIndex >= activeSong.song.notes.length) {
      stopSong(songRow, pianoWrap);
      if (APP.launchConfetti) APP.launchConfetti();
    } else {
      activeSongNote = activeSong.song.notes[activeSong.stepIndex];
      updateKeyHighlights(pianoWrap);
    }
  }

  // ── Tab content builders ───────────────────────────────────────────────────

  function buildKeyboard(content) {
    content.innerHTML = '';
    activeSong = null; activeSongNote = null;

    var songRow = document.createElement('div');
    songRow.className = 'song-select-row';

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
      el.setAttribute('data-freq', key.freq);
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        playNote(key.freq);
        el.classList.add('pressed');
        songProgress(key.freq, el, songRow, pianoWrap);
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
      el.setAttribute('data-freq', key.freq);
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        playNote(key.freq);
        el.classList.add('pressed');
        songProgress(key.freq, el, songRow, pianoWrap);
      });
      el.addEventListener('pointerup', function () { el.classList.remove('pressed'); });
      el.addEventListener('pointerleave', function () { el.classList.remove('pressed'); });
      pianoWrap.appendChild(el);
    });

    // Song selector row (above the keyboard)
    var stopBtn = document.createElement('button');
    stopBtn.className = 'song-stop-btn btn ghost';
    stopBtn.textContent = '⏹ Stop';
    stopBtn.style.display = 'none';
    stopBtn.addEventListener('click', function () { stopSong(songRow, pianoWrap); });
    songRow.appendChild(stopBtn);
    SONGS.forEach(function (song) {
      var b = document.createElement('button');
      b.className = 'btn secondary song-btn';
      b.textContent = '🎵 ' + song.name;
      b.addEventListener('click', function () {
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        startSong(song, songRow, pianoWrap);
      });
      songRow.appendChild(b);
    });

    content.appendChild(pianoWrap);
    content.appendChild(songRow);
  }

  function buildDrums(content) {
    content.innerHTML = '';
    var kick  = APP.t('game.music.kick')  || 'Kick';
    var snare = APP.t('game.music.snare') || 'Snare';
    var hihat = APP.t('game.music.hihat') || 'Hi-hat';
    var tom   = APP.t('game.music.tom')   || 'Tom';

    var wrap = document.createElement('div');
    wrap.className = 'drum-kit-wrap';
    wrap.innerHTML =
      '<svg viewBox="0 0 320 240" class="drum-kit-svg" xmlns="http://www.w3.org/2000/svg">' +
        // Hi-hat (top left) + stand
        '<line x1="62" y1="68" x2="62" y2="150" stroke="#7f8c8d" stroke-width="3"/>' +
        '<ellipse cx="62" cy="68" rx="32" ry="6" fill="#f39c12" stroke="#d68910" stroke-width="2" class="drum-part" data-drum="hihat"/>' +
        '<ellipse cx="62" cy="61" rx="32" ry="6" fill="#f9ca24" stroke="#d68910" stroke-width="2" class="drum-part" data-drum="hihat"/>' +
        '<text x="62" y="46" text-anchor="middle" font-size="10" fill="#555" font-weight="bold" pointer-events="none">' + hihat + '</text>' +
        // Snare (left)
        '<ellipse cx="80" cy="150" rx="44" ry="17" fill="#3498db" stroke="#1a5276" stroke-width="2.5" class="drum-part" data-drum="snare"/>' +
        '<rect x="36" y="133" width="88" height="18" fill="#2980b9" stroke="#1a5276" stroke-width="2.5" class="drum-part" data-drum="snare"/>' +
        '<ellipse cx="80" cy="133" rx="44" ry="16" fill="#5dade2" stroke="#1a5276" stroke-width="2.5" class="drum-part" data-drum="snare"/>' +
        '<text x="80" y="142" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#fff" font-weight="bold" pointer-events="none">' + snare + '</text>' +
        // Tom (right)
        '<ellipse cx="244" cy="134" rx="40" ry="15" fill="#27ae60" stroke="#1a5226" stroke-width="2.5" class="drum-part" data-drum="tom"/>' +
        '<rect x="204" y="119" width="80" height="16" fill="#229954" stroke="#1a5226" stroke-width="2.5" class="drum-part" data-drum="tom"/>' +
        '<ellipse cx="244" cy="119" rx="40" ry="14" fill="#58d68d" stroke="#1a5226" stroke-width="2.5" class="drum-part" data-drum="tom"/>' +
        '<text x="244" y="127" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="#fff" font-weight="bold" pointer-events="none">' + tom + '</text>' +
        // Kick (large, centre bottom)
        '<rect x="92" y="172" width="136" height="34" fill="#e74c3c" stroke="#7b241c" stroke-width="3" class="drum-part" data-drum="kick"/>' +
        '<ellipse cx="160" cy="206" rx="68" ry="30" fill="#c0392b" stroke="#7b241c" stroke-width="3" class="drum-part" data-drum="kick"/>' +
        '<ellipse cx="160" cy="172" rx="68" ry="26" fill="#ff6b6b" stroke="#7b241c" stroke-width="3" class="drum-part" data-drum="kick"/>' +
        '<text x="160" y="174" text-anchor="middle" dominant-baseline="middle" font-size="13" fill="#fff" font-weight="bold" pointer-events="none">' + kick + '</text>' +
        // Decorative sticks
        '<line x1="104" y1="54" x2="142" y2="120" stroke="#a0856c" stroke-width="4" stroke-linecap="round"/>' +
        '<line x1="216" y1="54" x2="178" y2="120" stroke="#a0856c" stroke-width="4" stroke-linecap="round"/>' +
      '</svg>';

    var fns = { kick: playKick, snare: playSnare, hihat: playHihat, tom: playTom };
    wrap.querySelectorAll('.drum-part').forEach(function (el) {
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
        var id = el.getAttribute('data-drum');
        if (fns[id]) fns[id]();
        el.style.filter = 'brightness(1.3)';
        setTimeout(function () { el.style.filter = ''; }, 150);
      });
    });

    content.appendChild(wrap);
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
      btn.style.fontWeight = '700';
      var shakerEmoji = shaker.label.split(' ')[0];
      var shakerName  = shaker.label.split(' ').slice(1).join(' ');
      btn.innerHTML = '<div style="font-size:2.4rem;line-height:1.2">' + shakerEmoji + '</div>' +
                      '<div style="font-size:0.75rem;margin-top:4px">' + shakerName + '</div>';
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

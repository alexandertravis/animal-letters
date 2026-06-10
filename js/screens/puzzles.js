window.APP = window.APP || {};

(function (APP) {
  'use strict';

  // ── GSAP guard ─────────────────────────────────────────────────────────────
  var G = window.gsap || null;
  function gto(t, v) { if (G) { G.to(t, v); } else if (v && v.onComplete) { v.onComplete(); } }

  // ── Image cache ────────────────────────────────────────────────────────────
  var _imgCache = {};
  function loadImg(src, cb) {
    if (_imgCache[src]) { cb(_imgCache[src]); return; }
    var img = new Image();
    // No crossOrigin attr — required for canvas drawImage on file://
    img.onload  = function () { _imgCache[src] = img; cb(img); };
    img.onerror = function () { cb(null); };
    img.src = src;
  }

  // ── Static data ────────────────────────────────────────────────────────────
  var COLORING = [
    { id: 'unicorn',      label: 'Unicorn',      src: 'assets/images/coloring/unicorn.webp'      },
    { id: 'dinosaurs',    label: 'Dinosaurs',    src: 'assets/images/coloring/dinosaurs.webp'    },
    { id: 'animals',      label: 'Animals',      src: 'assets/images/coloring/animals.webp'      },
    { id: 'food',         label: 'Food',         src: 'assets/images/coloring/food.webp'         },
    { id: 'mushrooms',    label: 'Mushrooms',    src: 'assets/images/coloring/mushrooms.webp'    },
    { id: 'space-rabbit', label: 'Space Rabbit', src: 'assets/images/coloring/space-rabbit.webp' },
  ];

  var STORIES = [
    { id: 'three-pigs-1', label: 'Three Little Pigs I',   src: 'assets/images/story/three-pigs/page-01.webp' },
    { id: 'three-pigs-2', label: 'Three Little Pigs II',  src: 'assets/images/story/three-pigs/page-02.webp' },
    { id: 'three-pigs-3', label: 'Three Little Pigs III', src: 'assets/images/story/three-pigs/page-03.webp' },
    { id: 'lion-mouse-1', label: 'Lion & Mouse I',         src: 'assets/images/story/lion-mouse/page-01.webp' },
    { id: 'lion-mouse-2', label: 'Lion & Mouse II',        src: 'assets/images/story/lion-mouse/page-02.webp' },
    { id: 'lion-mouse-3', label: 'Lion & Mouse III',       src: 'assets/images/story/lion-mouse/page-03.webp' },
    { id: 'lion-mouse-4', label: 'Lion & Mouse IV',        src: 'assets/images/story/lion-mouse/page-04.webp' },
  ];

  var ALL_IMAGES = COLORING.concat(STORIES);

  var SETTINGS_KEY = 'pz_settings_v1';
  var PZ_DEFAULTS = { mode: 'jigsaw', rows: 3, cols: 3, hintMode: 'faint', showGrid: false, imageSrc: null };

  function loadSettings() {
    // Try APP.settings.game first (Phase 1 infrastructure)
    if (APP.settings && APP.settings.game) {
      var gs = APP.settings.game('puzzles', PZ_DEFAULTS);
      if (gs && Object.keys(gs).length > 0) return gs;
    }
    // Fallback: legacy localStorage key
    try { var s = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null'); if (s) return s; } catch(_){}
    return null;
  }
  function saveSettings(cfg) {
    var toSave = { mode: cfg.mode, rows: cfg.rows, cols: cfg.cols, hintMode: cfg.hintMode, showGrid: cfg.showGrid, imageSrc: cfg.imageSrc };
    // Persist via APP.settings if available
    if (APP.settings && APP.settings.saveGame) {
      APP.settings.saveGame('puzzles', toSave);
    } else {
      try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(toSave)); } catch(_){}
    }
  }
  function pickRandomImage(exclude) {
    var pool = exclude ? ALL_IMAGES.filter(function(i) { return i.src !== exclude; }) : ALL_IMAGES;
    if (!pool.length) pool = ALL_IMAGES;
    return pool[Math.floor(Math.random() * pool.length)].src;
  }

  var EMOJI_LIST = [
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯',
    '🦁','🐮','🐷','🐸','🐵','🦋','🌈','🍕','🎂','⭐',
  ];

  var SHAPES = ['circle', 'square', 'triangle', 'hexagon'];

  // ── Drag helper (adapted from recipes.js) ──────────────────────────────────
  function makeDraggable(node, onDrop) {
    var dragging = false, startX = 0, startY = 0;
    function down(e) {
      if (node._pzLocked) return;
      e.preventDefault();
      dragging = true;
      startX = e.clientX; startY = e.clientY;
      node.classList.add('dragging');
      node.style.zIndex = 100;
      if (APP.audio) APP.audio._wake();
      try { node.setPointerCapture(e.pointerId); } catch (_) {}
    }
    function move(e) {
      if (!dragging) return;
      node.style.transform = 'translate(' + (e.clientX - startX) + 'px,' + (e.clientY - startY) + 'px)';
    }
    function up(e) {
      if (!dragging) return;
      dragging = false;
      node.classList.remove('dragging');
      var consumed = onDrop ? onDrop(e.clientX, e.clientY) : false;
      if (!consumed) {
        node.style.zIndex = 10;
        if (G) {
          G.to(node, { x: 0, y: 0, duration: 0.35, ease: 'back.out(2)', clearProps: 'transform' });
        } else {
          node.style.transform = '';
        }
      }
    }
    node.addEventListener('pointerdown',  down);
    node.addEventListener('pointermove',  move);
    node.addEventListener('pointerup',    up);
    node.addEventListener('pointercancel', up);
  }

  // ── Shape path helpers ─────────────────────────────────────────────────────
  // All shapes centred in (w, h) with radius r = min(w,h)*0.42
  function drawShapePath(ctx, shape, w, h) {
    var cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.42;
    ctx.beginPath();
    if (shape === 'circle') {
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
    } else if (shape === 'square') {
      var s = r * 1.4;
      ctx.rect(cx - s, cy - s, s * 2, s * 2);
    } else if (shape === 'triangle') {
      ctx.moveTo(cx, cy - r);
      ctx.lineTo(cx + r * Math.cos(Math.PI / 6), cy + r * Math.sin(Math.PI / 6));
      ctx.lineTo(cx - r * Math.cos(Math.PI / 6), cy + r * Math.sin(Math.PI / 6));
      ctx.closePath();
    } else if (shape === 'hexagon') {
      for (var i = 0; i < 6; i++) {
        var a = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
        else ctx.lineTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    }
  }

  // Centred at (0,0) — used in composite operations
  function drawShapePathAt(ctx, shape, r) {
    ctx.beginPath();
    if (shape === 'circle') {
      ctx.arc(0, 0, r, 0, Math.PI * 2);
    } else if (shape === 'square') {
      var s = r * 1.4;
      ctx.rect(-s, -s, s * 2, s * 2);
    } else if (shape === 'triangle') {
      ctx.moveTo(0, -r);
      ctx.lineTo(r * Math.cos(Math.PI / 6), r * Math.sin(Math.PI / 6));
      ctx.lineTo(-r * Math.cos(Math.PI / 6), r * Math.sin(Math.PI / 6));
      ctx.closePath();
    } else if (shape === 'hexagon') {
      for (var i = 0; i < 6; i++) {
        var a = (Math.PI / 3) * i - Math.PI / 6;
        if (i === 0) ctx.moveTo(r * Math.cos(a), r * Math.sin(a));
        else ctx.lineTo(r * Math.cos(a), r * Math.sin(a));
      }
      ctx.closePath();
    }
  }

  // ── Jigsaw tab bezier path ─────────────────────────────────────────────────
  //
  // Outward normal for a directed edge: rotate travel vector 90° CW → (dy/len, -dx/len).
  // This gives: top edge (→) → up (-y) ✓, right edge (↓) → right (+x) ✓,
  //             bottom edge (←) → down (+y) ✓, left edge (↑) → left (-x) ✓.
  //
  // tabSign: +1 = tab protrudes outward, -1 = blank dents inward, 0 = flat border.
  //
  function drawEdge(ctx, ax, ay, bx, by, tabSign, tb) {
    if (tabSign === 0) { ctx.lineTo(bx, by); return; }
    var dx  = bx - ax, dy = by - ay;
    var len = Math.sqrt(dx * dx + dy * dy);
    var nx  =  dy / len;   // outward normal x (CW rotation of travel dir)
    var ny  = -dx / len;   // outward normal y
    var bH  = tb * 0.8 * tabSign;  // bump height (positive = outward)
    var p0x = ax + dx * 0.30, p0y = ay + dy * 0.30;
    var p1x = ax + dx * 0.70, p1y = ay + dy * 0.70;
    var midx = ax + dx * 0.50, midy = ay + dy * 0.50;
    var pkx = midx + nx * bH, pky = midy + ny * bH;
    ctx.lineTo(p0x, p0y);
    ctx.bezierCurveTo(
      p0x + nx * bH * 0.5,  p0y + ny * bH * 0.5,
      pkx - dx * 0.15,       pky - dy * 0.15,
      pkx, pky
    );
    ctx.bezierCurveTo(
      pkx + dx * 0.15,       pky + dy * 0.15,
      p1x + nx * bH * 0.5,  p1y + ny * bH * 0.5,
      p1x, p1y
    );
    ctx.lineTo(bx, by);
  }

  // Trace the full closed jigsaw-piece boundary clockwise starting at top-left corner.
  // Cell rectangle occupies [tb, tb] → [tb+cW, tb+cH] in canvas coords.
  // edges: { top, right, bottom, left } where each is +1 / -1 / 0.
  function buildJigsawPath(ctx, cW, cH, tb, edges) {
    var x0 = tb, y0 = tb, x1 = tb + cW, y1 = tb + cH;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    drawEdge(ctx, x0, y0, x1, y0, edges.top,    tb);  // top:    left → right
    drawEdge(ctx, x1, y0, x1, y1, edges.right,  tb);  // right:  top → bottom
    drawEdge(ctx, x1, y1, x0, y1, edges.bottom, tb);  // bottom: right → left  (outward = down ✓)
    drawEdge(ctx, x0, y1, x0, y0, edges.left,   tb);  // left:   bottom → top  (outward = left ✓)
    ctx.closePath();
  }

  // ── Tab grid ───────────────────────────────────────────────────────────────
  function buildTabGrid(rows, cols) {
    var grid = [];
    for (var r = 0; r < rows; r++) {
      grid[r] = [];
      for (var c = 0; c < cols; c++) {
        grid[r][c] = {
          right:  c < cols - 1 ? (Math.random() < 0.5 ? 1 : -1) : 0,
          bottom: r < rows - 1 ? (Math.random() < 0.5 ? 1 : -1) : 0,
        };
      }
    }
    return grid;
  }

  function pieceEdges(grid, r, c, rows, cols) {
    return {
      top:    r > 0        ? -grid[r - 1][c].bottom : 0,
      right:  c < cols - 1 ?  grid[r][c].right      : 0,
      bottom: r < rows - 1 ?  grid[r][c].bottom     : 0,
      left:   c > 0        ? -grid[r][c - 1].right  : 0,
    };
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  function render(root, ctx) {
    if (G) G.killTweensOf('*');
    root.innerHTML = '';

    // ── Settings migration: pz_settings_v1 → APP.settings ──────────────────
    var legacy = APP.store ? APP.store.get(SETTINGS_KEY, null) : null;
    if (!legacy) {
      // Also check raw localStorage for the old key
      try { legacy = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null'); } catch(_){}
    }
    if (legacy) {
      if (APP.settings) APP.settings.saveGame('puzzles', legacy);
      if (APP.store) APP.store.remove(SETTINGS_KEY);
      try { localStorage.removeItem(SETTINGS_KEY); } catch(_){}
    }

    var S = {
      mode: 'jigsaw',
      imageSrc: null,
      rows: 3, cols: 3,
      hintMode: 'faint',
      showGrid: false,
      srcImg: null,
      pieces: [],
      tabGrid: null,
      lockedCount: 0,
      totalPieces: 0,
      boardX: 0, boardY: 0, boardW: 0, boardH: 0,
      cellW: 0,  cellH: 0,
    };

    // Apply saved settings (or keep defaults)
    var _saved = loadSettings();
    if (_saved) {
      if (_saved.mode)     S.mode     = _saved.mode;
      if (_saved.rows)     S.rows     = _saved.rows;
      if (_saved.cols)     S.cols     = _saved.cols;
      if (_saved.hintMode) S.hintMode = _saved.hintMode;
      if (_saved.showGrid != null) S.showGrid = _saved.showGrid;
      if (_saved.imageSrc) S.imageSrc = _saved.imageSrc;
    }
    if (!S.imageSrc) { S.imageSrc = pickRandomImage(); }

    var wrap = document.createElement('div');
    wrap.className = 'pz-screen';
    root.appendChild(wrap);

    var confettiCleanup = null;

    // Advanced settings schema for the gear button
    var advancedSchema = [
      {
        key: 'hintMode',
        label: (APP.t && APP.t('puzzles.hintMode')) || 'Background Hint',
        type: 'segmented',
        options: [
          { value: 'faint', label: (APP.t && APP.t('puzzles.hintFaint')) || 'Faint' },
          { value: 'grey',  label: (APP.t && APP.t('puzzles.hintGrey'))  || 'Grey'  },
        ]
      },
      {
        key: 'showGrid',
        label: (APP.t && APP.t('puzzles.showGrid')) || 'Show Grid',
        type: 'toggle'
      },
    ];

    function onSettingsChange(key, val, all) {
      if (key === 'hintMode') S.hintMode = val;
      if (key === 'showGrid') S.showGrid = val;
      saveSettings(S);
    }

    // ── Step router ──────────────────────────────────────────────────────────
    function setStep(step) {
      if (confettiCleanup) { confettiCleanup(); confettiCleanup = null; }
      if (G) G.killTweensOf('*');
      wrap.innerHTML = '';

      // Standard topbar
      var topbarEl;
      if (APP.ui && APP.ui.topbar) {
        if (step === 'play') {
          var nextBtn = document.createElement('button');
          nextBtn.className = 'btn secondary pz-next-btn';
          nextBtn.textContent = (APP.t && APP.t('puzzles.next')) || 'Next ▶';
          nextBtn.addEventListener('click', function () { playNext(); });
          topbarEl = APP.ui.topbar({
            ctx: ctx,
            title: (APP.t && APP.t('puzzles.title')) || 'Puzzles',
            home: true,
            back: function () { if (G) G.killTweensOf('*'); setStep('setup'); },
            right: [nextBtn]
          });
        } else {
          topbarEl = APP.ui.topbar({
            ctx: ctx,
            title: (APP.t && APP.t('puzzles.title')) || 'Puzzles',
            home: true,
            back: true,
            settings: {
              gameId: 'puzzles',
              title: (APP.t && APP.t('puzzles.settings')) || 'Puzzle Settings',
              schema: advancedSchema,
              onChange: onSettingsChange
            }
          });
        }
      } else {
        // Fallback topbar without APP.ui
        topbarEl = document.createElement('div');
        topbarEl.className = 'pz-topbar';
        var backBtn = document.createElement('button');
        backBtn.className = 'btn icon';
        backBtn.innerHTML = (APP.ICONS && APP.ICONS.back) || '&#8592;';
        if (step === 'play') {
          backBtn.addEventListener('click', function () { if (G) G.killTweensOf('*'); setStep('setup'); });
        } else {
          backBtn.addEventListener('click', function () { if (G) G.killTweensOf('*'); ctx.go('landing'); });
        }
        var titleEl = document.createElement('h1');
        titleEl.textContent = (APP.t && APP.t('puzzles.title')) || 'Puzzles';
        topbarEl.appendChild(backBtn);
        topbarEl.appendChild(titleEl);
        if (step === 'play') {
          var topNextBtn2 = document.createElement('button');
          topNextBtn2.className = 'btn secondary pz-next-btn';
          topNextBtn2.textContent = 'Next ▶';
          topNextBtn2.addEventListener('click', function () { playNext(); });
          topbarEl.appendChild(topNextBtn2);
        }
      }
      wrap.appendChild(topbarEl);

      var stage = document.createElement('div');
      stage.className = 'pz-stage';
      wrap.appendChild(stage);

      if (step === 'setup') { stepSetup(stage); }
      else if (step === 'play') { stepPlay(stage); }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SETUP STEP — compact layout for small phones
    // ═══════════════════════════════════════════════════════════════════════
    function stepSetup(stage) {
      var setup = document.createElement('div');
      setup.className = 'pz-setup';
      stage.appendChild(setup);

      var inner = document.createElement('div');
      inner.className = 'pz-setup-inner';
      setup.appendChild(inner);

      // ── Mode tabs ────────────────────────────────────────────────────────
      var modeField = makeField((APP.t && APP.t('puzzles.mode')) || 'Mode');
      var tabs = document.createElement('div');
      tabs.className = 'pz-tabs';
      [
        { id: 'jigsaw', label: '🧩 ' + ((APP.t && APP.t('puzzles.modeJigsaw')) || 'Jigsaw') },
        { id: 'shapes', label: '🔷 ' + ((APP.t && APP.t('puzzles.modeShapes')) || 'Shapes') },
        { id: 'emoji',  label: '😀 ' + ((APP.t && APP.t('puzzles.modeEmoji'))  || 'Emoji')  },
      ].forEach(function (m) {
        var btn = document.createElement('button');
        btn.className = 'pz-tab' + (S.mode === m.id ? ' active' : '');
        btn.textContent = m.label;
        btn.addEventListener('click', function () {
          S.mode = m.id;
          // Reset image selection when switching between emoji ↔ image modes
          if (m.id === 'emoji' && S.imageSrc && !S.imageSrc.startsWith('emoji:')) S.imageSrc = null;
          if (m.id !== 'emoji' && S.imageSrc && S.imageSrc.startsWith('emoji:')) S.imageSrc = null;
          tabs.querySelectorAll('.pz-tab').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
          renderGallery();
          checkStart();
        });
        tabs.appendChild(btn);
      });
      modeField.appendChild(tabs);
      inner.appendChild(modeField);

      // ── Gallery (compact grid) ───────────────────────────────────────────
      var galleryWrap = document.createElement('div');
      galleryWrap.className = 'pz-gallery-wrap';
      inner.appendChild(galleryWrap);

      var gallery = document.createElement('div');
      galleryWrap.appendChild(gallery);

      var galleryLabel;  // used inside renderGallery for emoji/image label swap
      var galleryArrow;  // keep reference for toggle

      function renderGallery() {
        galleryWrap.innerHTML = '';
        gallery = document.createElement('div');

        if (S.mode === 'emoji') {
          gallery.className = 'pz-gallery--emoji';
          EMOJI_LIST.forEach(function (emoji) {
            var key = 'emoji:' + emoji;
            var btn = document.createElement('button');
            btn.className = 'pz-gallery-emoji' + (S.imageSrc === key ? ' active' : '');
            btn.textContent = emoji;
            btn.addEventListener('click', function () {
              S.imageSrc = key;
              gallery.querySelectorAll('.pz-gallery-emoji').forEach(function (b) { b.classList.remove('active'); });
              btn.classList.add('active');
              checkStart();
            });
            gallery.appendChild(btn);
          });
        } else {
          gallery.className = 'pz-gallery';
          gallery.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:8px;';

          function makeSection(label, items) {
            var sec = document.createElement('div');
            sec.className = 'pz-gallery-section';
            sec.style.gridColumn = '1 / -1';
            var lbl = document.createElement('div');
            lbl.className = 'pz-gallery-label';
            lbl.textContent = label;
            sec.appendChild(lbl);
            var grid = document.createElement('div');
            grid.className = 'pz-gallery-grid';
            items.forEach(function (item) {
              var btn = document.createElement('button');
              btn.className = 'pz-gallery-item' + (S.imageSrc === item.src ? ' active' : '');
              btn.title = item.label;
              var img = document.createElement('img');
              img.src = item.src;
              img.alt = item.label;
              btn.appendChild(img);
              btn.addEventListener('click', function () {
                S.imageSrc = item.src;
                gallery.querySelectorAll('.pz-gallery-item').forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');
                checkStart();
              });
              grid.appendChild(btn);
            });
            sec.appendChild(grid);
            gallery.appendChild(sec);
          }

          makeSection((APP.t && APP.t('puzzles.coloring')) || 'Coloring', COLORING);
          makeSection((APP.t && APP.t('puzzles.stories'))  || 'Story Books', STORIES);
          makeSection((APP.t && APP.t('puzzles.animals'))  || 'Animals', (APP.ANIMALS || []).map(function (a) {
            return { src: a.images.cartoon, label: a.displayName };
          }));
        }
        galleryWrap.appendChild(gallery);
      }

      renderGallery();

      // ── Difficulty / pieces row ──────────────────────────────────────────
      var diffField = makeField((APP.t && APP.t('puzzles.pieces')) || 'Pieces');
      var seg = document.createElement('div');
      seg.className = 'pz-seg';
      [
        { label: '4',  r: 2, c: 2 },
        { label: '9',  r: 3, c: 3 },
        { label: '16', r: 4, c: 4 },
        { label: '25', r: 5, c: 5 },
      ].forEach(function (d) {
        var btn = document.createElement('button');
        btn.className = 'pz-seg-btn' + (S.rows === d.r ? ' active' : '');
        btn.textContent = d.label + ' ' + ((APP.t && APP.t('puzzles.piecesUnit')) || 'pieces');
        btn.addEventListener('click', function () {
          S.rows = d.r; S.cols = d.c;
          seg.querySelectorAll('.pz-seg-btn').forEach(function (b) { b.classList.remove('active'); });
          btn.classList.add('active');
        });
        seg.appendChild(btn);
      });
      diffField.appendChild(seg);
      inner.appendChild(diffField);

      // ── Play button ──────────────────────────────────────────────────────
      var startBtn = document.createElement('button');
      startBtn.className = 'btn pz-start-btn';
      startBtn.textContent = (APP.t && APP.t('puzzles.start')) || 'Play ▶';
      startBtn.disabled = !S.imageSrc;
      startBtn.addEventListener('click', function () { if (S.imageSrc) startPuzzle(); });
      inner.appendChild(startBtn);

      function checkStart() { startBtn.disabled = !S.imageSrc; }
    }

    function makeField(labelText) {
      var f = document.createElement('div');
      f.className = 'pz-field';
      var lbl = document.createElement('label');
      lbl.textContent = labelText;
      f.appendChild(lbl);
      return f;
    }

    // ── Image loading bridge ─────────────────────────────────────────────────
    function playNext() {
      S.imageSrc = pickRandomImage(S.imageSrc);
      startPuzzle();
    }

    function startPuzzle() {
      saveSettings(S);
      if (S.imageSrc.startsWith('emoji:')) {
        buildEmojiCanvas(S.imageSrc.slice(6), function (img) {
          S.srcImg = img; setStep('play');
        });
      } else {
        loadImg(S.imageSrc, function (img) {
          if (!img) return;
          S.srcImg = img; setStep('play');
        });
      }
    }

    function buildEmojiCanvas(emoji, cb) {
      var SIZE = 600;
      var c = document.createElement('canvas');
      c.width = c.height = SIZE;
      var cx = c.getContext('2d');
      cx.fillStyle = '#fef6e4';
      cx.fillRect(0, 0, SIZE, SIZE);
      cx.font = '360px serif';
      cx.textAlign = 'center';
      cx.textBaseline = 'middle';
      cx.fillText(emoji, SIZE / 2, SIZE / 2);
      var img = new Image();
      img.onload = function () { cb(img); };
      img.src = c.toDataURL();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PLAY STEP
    // ═══════════════════════════════════════════════════════════════════════
    function stepPlay(stage) {
      S.pieces = [];
      S.lockedCount = 0;

      // Board layout is computed in rAF after the stage has been painted
      requestAnimationFrame(function () {
        var stageR = stage.getBoundingClientRect();
        var sw = stageR.width, sh = stageR.height;

        // SVG naturalWidth can be 0 on file:// — default to square
        var aw = S.srcImg.naturalWidth  || 200;
        var ah = S.srcImg.naturalHeight || 200;
        var aspect = aw / ah;

        // Portrait: board fills top 62%, pieces scatter below.
        // Landscape: left gutter with board on the right.
        var bW, bH;
        if (sh > sw) {
          // Portrait
          var topH = Math.floor(sh * 0.62);
          var pW = sw - 12, pH = topH - 12;
          if (pW / pH > aspect) { bH = pH; bW = Math.round(bH * aspect); }
          else                   { bW = pW; bH = Math.round(bW / aspect); }
          bW = Math.floor(bW); bH = Math.floor(bH);
          S.boardX = Math.floor((sw - bW) / 2);
          S.boardY = Math.floor((topH - bH) / 2);
        } else {
          // Landscape
          var gutter  = Math.min(sw * 0.28, 160);
          var availW  = sw - gutter - 8;
          var availH  = sh - 16;
          if (availW / availH > aspect) { bH = availH; bW = Math.round(bH * aspect); }
          else                           { bW = availW; bH = Math.round(bW / aspect); }
          bW = Math.floor(bW); bH = Math.floor(bH);
          S.boardX = Math.floor(gutter + (availW - bW) / 2);
          S.boardY = Math.floor((sh - bH) / 2);
        }
        S.boardW = bW; S.boardH = bH;
        S.cellW  = bW / S.cols;
        S.cellH  = bH / S.rows;

        // ── Board element ──────────────────────────────────────────────────
        var board = document.createElement('div');
        board.className = 'pz-board';
        board.style.left   = S.boardX + 'px';
        board.style.top    = S.boardY + 'px';
        board.style.width  = S.boardW + 'px';
        board.style.height = S.boardH + 'px';
        stage.appendChild(board);

        // ── Hint canvas ────────────────────────────────────────────────────
        if (S.mode === 'shapes') {
          buildShapesBoard(board);
        } else {
          var hc = document.createElement('canvas');
          hc.className = 'pz-board-hint hint-' + S.hintMode;
          hc.width = bW; hc.height = bH;
          hc.getContext('2d').drawImage(S.srcImg, 0, 0, bW, bH);
          board.appendChild(hc);
        }

        // ── Optional grid overlay ──────────────────────────────────────────
        if (S.showGrid) {
          var gc = document.createElement('canvas');
          gc.className = 'pz-board-grid';
          gc.width = bW; gc.height = bH;
          var gx = gc.getContext('2d');
          gx.strokeStyle = 'rgba(0,0,0,0.15)';
          gx.lineWidth = 1;
          for (var ci = 1; ci < S.cols; ci++) {
            var x = Math.round(ci * S.cellW);
            gx.beginPath(); gx.moveTo(x, 0); gx.lineTo(x, bH); gx.stroke();
          }
          for (var ri = 1; ri < S.rows; ri++) {
            var y = Math.round(ri * S.cellH);
            gx.beginPath(); gx.moveTo(0, y); gx.lineTo(bW, y); gx.stroke();
          }
          board.appendChild(gc);
        }

        // ── Generate pieces ────────────────────────────────────────────────
        if (S.mode === 'jigsaw') {
          S.tabGrid = buildTabGrid(S.rows, S.cols);
        }
        S.totalPieces = S.rows * S.cols;

        for (var row = 0; row < S.rows; row++) {
          for (var col = 0; col < S.cols; col++) {
            var piece = buildPiece(row, col, stage);
            S.pieces.push(piece);
          }
        }

        scatterPieces(sw, sh);

        // Wire drag
        S.pieces.forEach(function (p) {
          makeDraggable(p.node, function (cx2, cy2) {
            return trySnap(p, cx2, cy2, stage);
          });
        });
      });
    }

    // ── Shape-fit board (image with holes punched out) ─────────────────────
    function buildShapesBoard(board) {
      var hc = document.createElement('canvas');
      hc.className = 'pz-board-hint hint-' + S.hintMode;
      hc.width = S.boardW; hc.height = S.boardH;
      var cx = hc.getContext('2d');
      cx.drawImage(S.srcImg, 0, 0, S.boardW, S.boardH);
      cx.globalCompositeOperation = 'destination-out';
      for (var r = 0; r < S.rows; r++) {
        for (var c = 0; c < S.cols; c++) {
          var shape = SHAPES[(r * S.cols + c) % SHAPES.length];
          var hcx = c * S.cellW + S.cellW / 2;
          var hcy = r * S.cellH + S.cellH / 2;
          var hr  = Math.min(S.cellW, S.cellH) * 0.42;
          cx.save();
          cx.translate(hcx, hcy);
          drawShapePathAt(cx, shape, hr);
          cx.fill();
          cx.restore();
        }
      }
      cx.globalCompositeOperation = 'source-over';
      board.appendChild(hc);

      // Hole shadow divs (visual depth)
      for (var r2 = 0; r2 < S.rows; r2++) {
        for (var c2 = 0; c2 < S.cols; c2++) {
          var hole = document.createElement('div');
          var sh2 = SHAPES[(r2 * S.cols + c2) % SHAPES.length];
          hole.className = 'pz-hole pz-hole--' + sh2;
          hole.style.left   = Math.round(c2 * S.cellW) + 'px';
          hole.style.top    = Math.round(r2 * S.cellH) + 'px';
          hole.style.width  = Math.round(S.cellW) + 'px';
          hole.style.height = Math.round(S.cellH) + 'px';
          board.appendChild(hole);
        }
      }
    }

    // ── Build one piece canvas ─────────────────────────────────────────────
    function buildPiece(row, col, stage) {
      var mode = S.mode;
      var tb   = (mode === 'jigsaw') ? Math.max(8, Math.round(Math.min(S.cellW, S.cellH) * 0.25)) : 0;
      var cW   = Math.round(S.cellW);
      var cH   = Math.round(S.cellH);
      var cnvW = cW + 2 * tb;
      var cnvH = cH + 2 * tb;

      var cnv = document.createElement('canvas');
      cnv.width = cnvW; cnv.height = cnvH;
      var cx = cnv.getContext('2d');

      if (mode === 'jigsaw') {
        var edges = pieceEdges(S.tabGrid, row, col, S.rows, S.cols);
        buildJigsawPath(cx, cW, cH, tb, edges);
        cx.save();
        cx.clip();
        // Draw full board image shifted so piece (row,col) lands at (tb,tb)
        cx.drawImage(S.srcImg, tb - col * S.cellW, tb - row * S.cellH, S.boardW, S.boardH);
        cx.restore();
        // Outline stroke
        buildJigsawPath(cx, cW, cH, tb, edges);
        cx.strokeStyle = 'rgba(0,0,0,0.22)';
        cx.lineWidth   = 1.5;
        cx.stroke();

      } else if (mode === 'shapes') {
        var shape = SHAPES[(row * S.cols + col) % SHAPES.length];
        drawShapePath(cx, shape, cW, cH);
        cx.save();
        cx.clip();
        cx.drawImage(S.srcImg, -col * S.cellW, -row * S.cellH, S.boardW, S.boardH);
        cx.restore();
        drawShapePath(cx, shape, cW, cH);
        cx.strokeStyle = 'rgba(0,0,0,0.28)';
        cx.lineWidth   = 2;
        cx.stroke();

      } else {
        // Square / emoji — simple rectangle
        cx.drawImage(S.srcImg, -col * S.cellW, -row * S.cellH, S.boardW, S.boardH);
        cx.strokeStyle = 'rgba(255,255,255,0.45)';
        cx.lineWidth   = 1;
        cx.strokeRect(0.5, 0.5, cW - 1, cH - 1);
      }

      var node = document.createElement('div');
      node.className = 'pz-piece';
      node.style.width  = cnvW + 'px';
      node.style.height = cnvH + 'px';
      node.appendChild(cnv);
      stage.appendChild(node);

      var piece = {
        id:      row * S.cols + col,
        row: row, col: col,
        node: node,
        tabW: cnvW, tabH: cnvH, tb: tb,
        locked: false,
      };
      node._piece    = piece;
      node._pzLocked = false;
      return piece;
    }

    // ── Scatter pieces ─────────────────────────────────────────────────────
    function scatterPieces(sw, sh) {
      var order = S.pieces.slice().sort(function () { return Math.random() - 0.5; });

      if (sh > sw) {
        // Portrait: random scatter in the strip below the board
        var stripY = S.boardY + S.boardH + 8;
        order.forEach(function (piece) {
          var px = Math.random() * Math.max(0, sw - piece.tabW);
          var py = stripY + Math.random() * Math.max(0, sh - stripY - piece.tabH);
          piece.node.style.left = Math.round(Math.max(0, px)) + 'px';
          piece.node.style.top  = Math.round(Math.max(stripY, py)) + 'px';
        });
        return;
      }

      // Landscape: columnar scatter in left gutter, overflow to right
      var gutterW = S.boardX - 4;
      var cols    = Math.max(1, Math.floor(gutterW / (S.cellW * 0.75 + 4)));
      var colW    = gutterW / cols;
      var colY    = [];
      for (var i = 0; i < cols; i++) colY.push(6);

      order.forEach(function (piece) {
        var mc = 0;
        for (var i2 = 1; i2 < cols; i2++) { if (colY[i2] < colY[mc]) mc = i2; }
        var px = mc * colW + (Math.random() - 0.5) * 6;
        var py = colY[mc];

        if (py + piece.tabH > sh - 4) {
          var rg = S.boardX + S.boardW + 8;
          px = rg + Math.random() * Math.max(0, sw - rg - piece.tabW - 8);
          py = Math.random() * Math.max(4, sh - piece.tabH - 8);
        }

        px = Math.max(0, Math.min(px, sw - piece.tabW));
        py = Math.max(0, Math.min(py, sh - piece.tabH));
        piece.node.style.left = Math.round(px) + 'px';
        piece.node.style.top  = Math.round(py) + 'px';
        colY[mc] += piece.tabH + 4;
      });
    }

    // ── Try snap on drop ────────────────────────────────────────────────────
    function trySnap(piece, dropClientX, dropClientY, stage) {
      if (piece.locked) return false;

      // Resolve current position (transform may still be active)
      var stageR = stage.getBoundingClientRect();
      var nodeR  = piece.node.getBoundingClientRect();
      var resolvedL = nodeR.left - stageR.left;
      var resolvedT = nodeR.top  - stageR.top;

      // Commit position and clear transform
      piece.node.style.left      = resolvedL + 'px';
      piece.node.style.top       = resolvedT + 'px';
      piece.node.style.transform = '';
      if (G) G.set(piece.node, { x: 0, y: 0 });

      // Cell top-left in stage coords (tb is canvas overhang for jigsaw tabs)
      var cellL = resolvedL + piece.tb;
      var cellT = resolvedT + piece.tb;
      var slotL = S.boardX + piece.col * S.cellW;
      var slotT = S.boardY + piece.row * S.cellH;

      if (Math.abs(cellL - slotL) > S.cellW * 0.38 ||
          Math.abs(cellT - slotT) > S.cellH * 0.38) {
        return false;
      }

      // ── Snap! ──────────────────────────────────────────────────────────
      var targetL = slotL - piece.tb;
      var targetT = slotT - piece.tb;
      piece.locked = true;
      piece.node._pzLocked = true;
      piece.node.classList.add('locked');
      piece.node.style.zIndex = 5;

      if (G) {
        G.to(piece.node, {
          left: targetL, top: targetT,
          duration: 0.22, ease: 'back.out(1.8)',
          onComplete: function () {
            S.lockedCount++;
            if (APP.audio) APP.audio.strokeDone();
            checkDone(stage);
          },
        });
      } else {
        piece.node.style.left = targetL + 'px';
        piece.node.style.top  = targetT + 'px';
        S.lockedCount++;
        if (APP.audio) APP.audio.strokeDone();
        checkDone(stage);
      }
      return true;
    }

    function checkDone(stage) {
      if (S.lockedCount >= S.totalPieces) {
        setTimeout(function () { showDone(stage); }, 450);
      }
    }

    // ── Done overlay (overlaid on completed board) ─────────────────────────
    function showDone(stage) {
      if (APP.audio) APP.audio.wordDone();
      confettiCleanup = APP.launchConfetti({ count: 130, duration: 3800 });

      var overlay = document.createElement('div');
      overlay.className = 'pz-done-overlay';
      overlay.style.zIndex = '200';

      // Completed image above the message
      if (S.srcImg) {
        var doneImg = document.createElement('img');
        doneImg.className = 'pz-done-img';
        doneImg.src = S.srcImg.src;
        overlay.appendChild(doneImg);
      }

      var msg = document.createElement('div');
      msg.className = 'pz-done-title';
      msg.textContent = '🎉 Hooray!';
      overlay.appendChild(msg);

      var actions = document.createElement('div');
      actions.className = 'pz-done-actions';

      var againBtn = document.createElement('button');
      againBtn.className = 'btn';
      againBtn.textContent = 'Play Again';
      againBtn.addEventListener('click', function () { startPuzzle(); });

      var nextBtn2 = document.createElement('button');
      nextBtn2.className = 'btn secondary';
      nextBtn2.textContent = 'Next ▶';
      nextBtn2.addEventListener('click', function () { playNext(); });

      var optBtn = document.createElement('button');
      optBtn.className = 'btn ghost';
      optBtn.textContent = 'Options';
      optBtn.addEventListener('click', function () { setStep('setup'); });

      actions.appendChild(againBtn);
      actions.appendChild(nextBtn2);
      actions.appendChild(optBtn);
      overlay.appendChild(actions);
      stage.appendChild(overlay);
    }

    startPuzzle();
  }

  APP.screens      = APP.screens || {};
  APP.screens.puzzles = { render: render };
})(window.APP);

window.APP = window.APP || {};
(function (APP) {

  var SHAPES = [
    { id: 'circle',   path: 'M30,5 A25,25,0,1,1,29.9,5 Z', color: '#e74c3c' },
    { id: 'square',   path: 'M5,5 H55 V55 H5 Z', color: '#3498db' },
    { id: 'triangle', path: 'M30,5 L55,55 L5,55 Z', color: '#2ecc71' },
    { id: 'star',     path: 'M30,4 L37,22 L57,22 L42,34 L48,54 L30,42 L12,54 L18,34 L3,22 L23,22 Z', color: '#f39c12' },
    { id: 'heart',    path: 'M30,50 C10,35 5,20 15,12 C20,8 28,10 30,15 C32,10 40,8 45,12 C55,20 50,35 30,50 Z', color: '#9b59b6' },
    { id: 'hexagon',  path: 'M30,5 L55,17 L55,43 L30,55 L5,43 L5,17 Z', color: '#1abc9c' },
  ];

  var COLOURS = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  var DEFAULTS = { count: 4, colourHints: true, difficulty: 'shapes' };

  // Build the list of target items for the chosen difficulty. Each item maps to
  // one hole at the same index; matching is by index, so distinct items are all
  // that's required. size is a multiplier (1 = default).
  function buildItems(difficulty, count) {
    var items = [];
    var i;
    if (difficulty === 'colour') {
      // One shape type, many colours — child must match colour.
      var base = SHAPES[0];
      for (i = 0; i < count; i++) {
        items.push({ path: base.path, color: COLOURS[i % COLOURS.length], size: 1 });
      }
    } else if (difficulty === 'size') {
      // Same shape (circle), different sizes — child must match size.
      var sizesOnly = [0.6, 0.85, 1.05, 1.3, 1.6];
      var baseShape = SHAPES[0];
      for (i = 0; i < count; i++) {
        items.push({ path: baseShape.path, color: baseShape.color, size: sizesOnly[i % sizesOnly.length] });
      }
    } else if (difficulty === 'sizeColour') {
      // Alternate two shapes, vary both size and colour.
      var sizes = [0.7, 1.0, 1.3];
      for (i = 0; i < count; i++) {
        var sh = SHAPES[i % 2];
        items.push({ path: sh.path, color: COLOURS[i % COLOURS.length], size: sizes[i % sizes.length] });
      }
    } else {
      // 'shapes' — distinct shapes, each its own colour.
      for (i = 0; i < count; i++) {
        var s = SHAPES[i % SHAPES.length];
        items.push({ path: s.path, color: s.color, size: 1 });
      }
    }
    return items;
  }

  function injectStyles() {
    if (document.getElementById('shapes-css')) return;
    var s = document.createElement('style');
    s.id = 'shapes-css';
    s.textContent = [
      '.shapes-screen{display:flex;flex-direction:column;min-height:100vh;}',
      '.shapes-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:24px;}',
      '.shapes-board{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center;}',
      '.shape-hole{display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;border-radius:12px;background:#f0f0f0;border:3px dashed #bbb;position:relative;}',
      '.shape-hole.filled{border-style:solid;background:#e8ffe8;}',
      '.shapes-tray{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;padding:16px;background:#fafafa;border-radius:16px;}',
      '.shape-piece{display:inline-flex;align-items:center;justify-content:center;width:72px;height:72px;border-radius:10px;background:#fff;border:2px solid #ddd;cursor:grab;user-select:none;touch-action:none;transition:box-shadow 0.15s;}',
      '.shape-piece:active{cursor:grabbing;box-shadow:0 8px 24px rgba(0,0,0,.25);}',
      '.shape-piece.placed{opacity:0;pointer-events:none;}',
      '.shape-clone{position:fixed;pointer-events:none;z-index:999;width:72px;height:72px;display:flex;align-items:center;justify-content:center;background:#fff;border:2px solid #ddd;border-radius:10px;box-shadow:0 8px 24px rgba(0,0,0,.3);}',
      '@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}',
      '.shake{animation:shake .35s ease;}',
      '.shapes-win{display:flex;flex-direction:column;align-items:center;gap:16px;padding:32px;text-align:center;}',
      '.shapes-win h2{font-size:2rem;color:#2ecc71;}',
    ].join('');
    document.head.appendChild(s);
  }

  function makeSvg(path, color, size) {
    size = size || 60;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 60 60');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', path);
    p.setAttribute('fill', color);
    svg.appendChild(p);
    return svg;
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('shapes', DEFAULTS);
    var count = settings.count || DEFAULTS.count;
    var colourHints = settings.colourHints !== undefined ? settings.colourHints : DEFAULTS.colourHints;
    var difficulty = settings.difficulty || DEFAULTS.difficulty;

    var activeShapes = buildItems(difficulty, count);
    // Colour/size modes need coloured holes to be solvable; otherwise the holes
    // are coloured only when the colour-hints toggle is on.
    var holeColoured = colourHints || difficulty !== 'shapes';
    var pieceColoured = colourHints || difficulty !== 'shapes';
    // Track which holes are filled
    var filled = new Array(count).fill(false);
    var holeEls = [];
    var pieceEls = [];

    var wrap = document.createElement('div');
    wrap.className = 'shapes-screen';

    // Topbar
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('game.shapes.title') || 'Shape Sorter',
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); },
      settings: {
        gameId: 'shapes',
        title: APP.t('game.shapes.title') || 'Shape Settings',
        schema: [
          {
            type: 'segmented', key: 'count', label: APP.t('game.shapes.count') || 'Shapes',
            options: [{ value: 3, label: '3' }, { value: 4, label: '4' }, { value: 6, label: '6' }]
          },
          {
            type: 'segmented', key: 'difficulty', label: APP.t('game.shapes.difficulty') || 'Difficulty',
            options: [
              { value: 'shapes',     label: 'Shapes' },
              { value: 'colour',     label: 'Colours' },
              { value: 'size',       label: 'Size' },
              { value: 'sizeColour', label: 'Size+colour' }
            ]
          },
          { type: 'toggle', key: 'colourHints', label: APP.t('game.shapes.hints') || 'Colour hints' }
        ],
        onChange: function (key, val, all) {
          APP.settings.saveGame('shapes', all);
          render(root, ctx);
        }
      }
    }));

    var body = document.createElement('div');
    body.className = 'shapes-body';

    // Board with holes
    var board = document.createElement('div');
    board.className = 'shapes-board';
    activeShapes.forEach(function (shape, i) {
      var sz = shape.size || 1;
      var hole = document.createElement('div');
      hole.className = 'shape-hole';
      hole.dataset.index = i;
      hole.style.width = Math.round(80 * sz) + 'px';
      hole.style.height = Math.round(80 * sz) + 'px';
      // Ghost of the shape outline — coloured (low-opacity) when hints are on.
      var ghostColor = holeColoured ? shape.color : '#ccc';
      var ghost = makeSvg(shape.path, ghostColor, Math.round(56 * sz));
      if (holeColoured) {
        ghost.style.opacity = '0.45';
        hole.style.borderColor = shape.color;
        hole.style.background = shape.color + '22';  // ~13% tint
      }
      hole.appendChild(ghost);
      holeEls.push(hole);
      board.appendChild(hole);
    });
    body.appendChild(board);

    // Tray with draggable pieces
    var tray = document.createElement('div');
    tray.className = 'shapes-tray';

    // Shuffle piece order so pieces don't trivially match hole order
    var order = activeShapes.map(function (_, i) { return i; });
    order.sort(function () { return Math.random() - 0.5; });

    order.forEach(function (shapeIndex) {
      var shape = activeShapes[shapeIndex];
      var sz = shape.size || 1;
      var piece = document.createElement('div');
      piece.className = 'shape-piece';
      piece.dataset.shapeIndex = shapeIndex;
      piece.style.width = Math.round(72 * sz) + 'px';
      piece.style.height = Math.round(72 * sz) + 'px';
      var color = pieceColoured ? shape.color : '#555';
      piece.appendChild(makeSvg(shape.path, color, Math.round(52 * sz)));
      pieceEls.push(piece);
      tray.appendChild(piece);
    });
    body.appendChild(tray);
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('shapes');

    // Drag state
    var dragging = null;   // { el (clone), pieceEl, shapeIndex, startX, startY }

    function startDrag(pieceEl, clientX, clientY) {
      if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.click(); } catch(e){}
      var shapeIndex = parseInt(pieceEl.dataset.shapeIndex, 10);
      var clone = document.createElement('div');
      clone.className = 'shape-clone';
      var shape = activeShapes[shapeIndex];
      var sz = shape.size || 1;
      clone.style.width = Math.round(72 * sz) + 'px';
      clone.style.height = Math.round(72 * sz) + 'px';
      var color = pieceColoured ? shape.color : '#555';
      clone.appendChild(makeSvg(shape.path, color, Math.round(52 * sz)));
      clone.style.left = (clientX - 36) + 'px';
      clone.style.top  = (clientY - 36) + 'px';
      document.body.appendChild(clone);
      dragging = { clone: clone, pieceEl: pieceEl, shapeIndex: shapeIndex };
    }

    function moveDrag(clientX, clientY) {
      if (!dragging) return;
      dragging.clone.style.left = (clientX - 36) + 'px';
      dragging.clone.style.top  = (clientY - 36) + 'px';
    }

    function endDrag(clientX, clientY) {
      if (!dragging) return;
      var d = dragging;
      dragging = null;
      d.clone.remove();

      // Find matching hole (same shape index)
      var matched = false;
      for (var i = 0; i < holeEls.length; i++) {
        if (filled[i]) continue;
        if (i !== d.shapeIndex) continue;
        var rect = holeEls[i].getBoundingClientRect();
        var cx = rect.left + rect.width / 2;
        var cy = rect.top  + rect.height / 2;
        var dist = Math.sqrt(Math.pow(clientX - cx, 2) + Math.pow(clientY - cy, 2));
        if (dist <= 50) {
          // Correct hole
          filled[i] = true;
          var shape = activeShapes[i];
          holeEls[i].innerHTML = '';
          holeEls[i].style.background = '#e8ffe8';
          holeEls[i].appendChild(makeSvg(shape.path, shape.color, Math.round(60 * (shape.size || 1))));
          holeEls[i].classList.add('filled');
          d.pieceEl.classList.add('placed');
          if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.pop(); } catch(e){}
          matched = true;
          // Check win
          if (filled.every(function (f) { return f; })) {
            setTimeout(function () { showWin(wrap, ctx); }, 300);
          }
          break;
        }
      }

      if (!matched) {
        // Wrong drop — try any hole at drop position
        var wrongHole = false;
        for (var j = 0; j < holeEls.length; j++) {
          if (filled[j]) continue;
          var rect2 = holeEls[j].getBoundingClientRect();
          var cx2 = rect2.left + rect2.width / 2;
          var cy2 = rect2.top  + rect2.height / 2;
          var dist2 = Math.sqrt(Math.pow(clientX - cx2, 2) + Math.pow(clientY - cy2, 2));
          if (dist2 <= 50) { wrongHole = true; break; }
        }
        if (wrongHole) {
          if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.wrong(); } catch(e){}
          d.pieceEl.classList.add('shake');
          d.pieceEl.addEventListener('animationend', function () {
            d.pieceEl.classList.remove('shake');
          }, { once: true });
        }
      }
    }

    // Attach pointer events to each piece
    pieceEls.forEach(function (piece) {
      piece.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        piece.setPointerCapture(e.pointerId);
        startDrag(piece, e.clientX, e.clientY);
      });
      piece.addEventListener('pointermove', function (e) {
        if (dragging && dragging.pieceEl === piece) moveDrag(e.clientX, e.clientY);
      });
      piece.addEventListener('pointerup', function (e) {
        if (dragging && dragging.pieceEl === piece) endDrag(e.clientX, e.clientY);
      });
      piece.addEventListener('pointercancel', function () {
        if (dragging && dragging.pieceEl === piece) {
          dragging.clone.remove();
          dragging = null;
        }
      });
    });
  }

  function showWin(wrap, ctx) {
    // Pop × 3
    var delay = 0;
    for (var i = 0; i < 3; i++) {
      (function (d) {
        setTimeout(function () {
          if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.pop(); } catch(e){}
        }, d);
      })(delay);
      delay += 200;
    }
    if (APP.launchConfetti) APP.launchConfetti();

    var body = wrap.querySelector('.shapes-body');
    if (body) {
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'shapes-win';
      var h2 = document.createElement('h2');
      h2.textContent = (APP.t('game.shapes.win') || 'All sorted!') + ' 🎉';
      var replayBtn = document.createElement('button');
      replayBtn.className = 'btn';
      replayBtn.textContent = APP.t('ui.restart') || 'Play again';
      replayBtn.addEventListener('click', function () {
        var root = wrap.parentElement;
        render(root, ctx);
      });
      win.appendChild(h2);
      win.appendChild(replayBtn);
      body.appendChild(win);
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.shapes = { render: render };
})(window.APP);

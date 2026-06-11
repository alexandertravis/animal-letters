window.APP = window.APP || {};
(function (APP) {

  // ── Pure maze generation ────────────────────────────────────────────────────

  // Returns a 2D array of cells [row][col], each: {top,right,bottom,left} — true = wall present
  // Uses recursive backtracker (DFS stack-based).
  // seed: integer used for deterministic random (simple LCG)
  function generateMaze(N, seed) {
    // Simple seeded LCG random
    var s = (seed !== undefined && seed !== null) ? (seed | 0) : 0;
    function rand() {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return (s >>> 0) / 0x100000000;
    }
    function randInt(max) { return Math.floor(rand() * max); }

    // Init all cells with all walls
    var grid = [];
    for (var r = 0; r < N; r++) {
      grid[r] = [];
      for (var c = 0; c < N; c++) {
        grid[r][c] = { top: true, right: true, bottom: true, left: true };
      }
    }

    var visited = [];
    for (var i = 0; i < N; i++) {
      visited[i] = [];
      for (var j = 0; j < N; j++) {
        visited[i][j] = false;
      }
    }

    var stack = [];
    visited[0][0] = true;
    stack.push([0, 0]);

    var dirs = [
      { dr: -1, dc:  0, wall: 'top',    opp: 'bottom' },
      { dr:  0, dc:  1, wall: 'right',  opp: 'left'   },
      { dr:  1, dc:  0, wall: 'bottom', opp: 'top'    },
      { dr:  0, dc: -1, wall: 'left',   opp: 'right'  }
    ];

    while (stack.length > 0) {
      var cur = stack[stack.length - 1];
      var cr = cur[0], cc = cur[1];

      // Find unvisited neighbours
      var neighbours = [];
      for (var d = 0; d < dirs.length; d++) {
        var nr = cr + dirs[d].dr;
        var nc = cc + dirs[d].dc;
        if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
          neighbours.push({ r: nr, c: nc, dir: dirs[d] });
        }
      }

      if (neighbours.length === 0) {
        stack.pop();
      } else {
        // Pick random neighbour
        var pick = neighbours[randInt(neighbours.length)];
        // Remove wall between current and neighbour
        grid[cr][cc][pick.dir.wall] = false;
        grid[pick.r][pick.c][pick.dir.opp] = false;
        visited[pick.r][pick.c] = true;
        stack.push([pick.r, pick.c]);
      }
    }

    return grid;
  }

  // ── Styles ──────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('maze-css')) return;
    var s = document.createElement('style');
    s.id = 'maze-css';
    s.textContent = [
      '.maze-screen { flex:1; display:flex; flex-direction:column; min-height:0; }',
      '.maze-body { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:12px; }',
      '.maze-svg-wrap { width:min(90vw,70vh); aspect-ratio:1; touch-action:none; user-select:none; }',
      '.maze-svg-wrap svg { width:100%; height:100%; display:block; }',
      '.maze-result { display:flex; flex-direction:column; align-items:center; gap:12px; }',
      '.maze-result-msg { font-size:1.5rem; font-weight:700; text-align:center; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  function render(root, ctx) {
    injectStyles();

    var T = APP.t || function (k) { return k; };
    var MAZE_DEFAULTS = { size: 6, trailMode: 'twoColor' };
    var settings = (APP.settings && APP.settings.game)
      ? APP.settings.game('maze', MAZE_DEFAULTS)
      : Object.assign({}, MAZE_DEFAULTS);
    settings.size = parseInt(settings.size, 10) || 6;
    if (!settings.trailMode) settings.trailMode = 'twoColor';

    function saveSettings(patch) {
      if (APP.settings && APP.settings.updateGame) {
        APP.settings.updateGame('maze', patch, MAZE_DEFAULTS);
      }
    }

    var N = settings.size;
    var seed = Math.floor(Math.random() * 0x7fffffff);
    var maze = generateMaze(N, seed);

    // Player position
    var playerRow = 0, playerCol = 0;
    var gameOver = false;

    // Trail tracking: currentPath is the non-backtracked forward route from start.
    // breadcrumbs holds cells that were on the path but got backtracked from.
    var currentPath = [[0, 0]];
    var breadcrumbs = [];

    function doRender() {
      root.innerHTML = '';
      var screen = document.createElement('div');
      screen.className = 'maze-screen';

      // ── Topbar ──────────────────────────────────────────────────────────────
      var topbar = APP.ui.topbar({
        ctx: ctx,
        title: T('game.maze.title') || 'Maze',
        home: true,
        back: true,
        onRestart: function () { startNew(settings.size); },
        settings: {
          gameId: 'maze',
          title: T('ui.settings') || 'Settings',
          schema: [
            {
              key: 'size',
              label: T('game.maze.size') || 'Size',
              type: 'segmented',
              options: [
                { value: 6,  label: '6×6'   },
                { value: 8,  label: '8×8'   },
                { value: 10, label: '10×10' },
                { value: 12, label: '12×12' },
                { value: 14, label: '14×14' }
              ]
            },
            {
              key: 'trailMode',
              label: 'Trail',
              type: 'segmented',
              options: [
                { value: 'twoColor', label: '2 colours' },
                { value: 'erase',    label: 'Erase' },
                { value: 'none',     label: 'None' }
              ]
            }
          ],
          onChange: function (key, val, all) {
            all.size = parseInt(all.size, 10) || 6;
            settings = all;
            saveSettings(all);
            startNew(all.size);
          }
        }
      });
      screen.appendChild(topbar);

      var body = document.createElement('div');
      body.className = 'maze-body';

      if (gameOver) {
        var resultDiv = document.createElement('div');
        resultDiv.className = 'maze-result';
        var msgEl = document.createElement('div');
        msgEl.className = 'maze-result-msg';
        msgEl.textContent = T('game.maze.win') || 'You found it!';
        resultDiv.appendChild(msgEl);
        var nextBtn = document.createElement('button');
        nextBtn.className = 'btn';
        nextBtn.textContent = T('game.maze.next') || 'Next maze';
        nextBtn.addEventListener('click', function () { startNew(settings.size); });
        resultDiv.appendChild(nextBtn);
        body.appendChild(resultDiv);
      } else {
        var wrap = document.createElement('div');
        wrap.className = 'maze-svg-wrap';

        // SVG viewBox: cells are CELL_SIZE wide/tall, with MARGIN on each side
        var CELL = 40;
        var WALL = 3;
        var MARGIN = WALL;
        var VW = N * CELL + MARGIN * 2;
        var VH = N * CELL + MARGIN * 2;

        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 ' + VW + ' ' + VH);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

        // Draw maze background
        var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bg.setAttribute('x', '0'); bg.setAttribute('y', '0');
        bg.setAttribute('width', VW); bg.setAttribute('height', VH);
        bg.setAttribute('fill', '#f0ede8');
        svg.appendChild(bg);

        // Highlight goal cell
        var goalRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        goalRect.setAttribute('x', MARGIN + (N-1)*CELL + WALL/2);
        goalRect.setAttribute('y', MARGIN + (N-1)*CELL + WALL/2);
        goalRect.setAttribute('width', CELL - WALL);
        goalRect.setAttribute('height', CELL - WALL);
        goalRect.setAttribute('fill', '#fff9c4');
        goalRect.setAttribute('rx', '4');
        svg.appendChild(goalRect);

        // Draw walls as lines
        var wallGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        wallGroup.setAttribute('stroke', '#555');
        wallGroup.setAttribute('stroke-width', WALL);
        wallGroup.setAttribute('stroke-linecap', 'square');

        for (var r = 0; r < N; r++) {
          for (var c = 0; c < N; c++) {
            var cell = maze[r][c];
            var x = MARGIN + c * CELL;
            var y = MARGIN + r * CELL;
            if (cell.top) {
              var lt = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              lt.setAttribute('x1', x); lt.setAttribute('y1', y);
              lt.setAttribute('x2', x + CELL); lt.setAttribute('y2', y);
              wallGroup.appendChild(lt);
            }
            if (cell.right) {
              var lr = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              lr.setAttribute('x1', x + CELL); lr.setAttribute('y1', y);
              lr.setAttribute('x2', x + CELL); lr.setAttribute('y2', y + CELL);
              wallGroup.appendChild(lr);
            }
            if (cell.bottom) {
              var lb = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              lb.setAttribute('x1', x); lb.setAttribute('y1', y + CELL);
              lb.setAttribute('x2', x + CELL); lb.setAttribute('y2', y + CELL);
              wallGroup.appendChild(lb);
            }
            if (cell.left) {
              var ll = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              ll.setAttribute('x1', x); ll.setAttribute('y1', y);
              ll.setAttribute('x2', x); ll.setAttribute('y2', y + CELL);
              wallGroup.appendChild(ll);
            }
          }
        }
        svg.appendChild(wallGroup);

        // Draw trail based on trailMode setting
        var trailMode = settings.trailMode || 'twoColor';

        // Breadcrumb dots (cells visited but backtracked from) — twoColor mode only
        var breadcrumbsEl = null;
        if (trailMode === 'twoColor') {
          breadcrumbsEl = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          breadcrumbs.forEach(function(pt) {
            var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            c.setAttribute('cx', MARGIN + pt[1] * CELL + CELL/2);
            c.setAttribute('cy', MARGIN + pt[0] * CELL + CELL/2);
            c.setAttribute('r', CELL * 0.15);
            c.setAttribute('fill', '#d4b8fa');
            c.setAttribute('opacity', '0.45');
            breadcrumbsEl.appendChild(c);
          });
          svg.appendChild(breadcrumbsEl);
        }

        // Current-path polyline (bright) — hidden in 'none' mode
        var trailEl = null;
        if (trailMode !== 'none') {
          trailEl = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
          var trailPts = currentPath.map(function (pt) {
            return (MARGIN + pt[1] * CELL + CELL/2) + ',' + (MARGIN + pt[0] * CELL + CELL/2);
          }).join(' ');
          trailEl.setAttribute('points', trailPts);
          trailEl.setAttribute('fill', 'none');
          trailEl.setAttribute('stroke', '#a78bfa');
          trailEl.setAttribute('stroke-width', '8');
          trailEl.setAttribute('stroke-linecap', 'round');
          trailEl.setAttribute('stroke-linejoin', 'round');
          trailEl.setAttribute('opacity', '0.85');
          svg.appendChild(trailEl);
        }

        // Goal emoji
        var goalText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        goalText.setAttribute('x', MARGIN + (N-1)*CELL + CELL/2);
        goalText.setAttribute('y', MARGIN + (N-1)*CELL + CELL/2);
        goalText.setAttribute('text-anchor', 'middle');
        goalText.setAttribute('dominant-baseline', 'middle');
        goalText.setAttribute('font-size', Math.floor(CELL * 0.65));
        goalText.textContent = '🧀';
        svg.appendChild(goalText);

        // Player emoji
        var playerText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        playerText.setAttribute('x', MARGIN + playerCol * CELL + CELL/2);
        playerText.setAttribute('y', MARGIN + playerRow * CELL + CELL/2);
        playerText.setAttribute('text-anchor', 'middle');
        playerText.setAttribute('dominant-baseline', 'middle');
        playerText.setAttribute('font-size', Math.floor(CELL * 0.65));
        playerText.textContent = '🐭';
        svg.appendChild(playerText);

        wrap.appendChild(svg);
        body.appendChild(wrap);

        // ── Drag / swipe input ───────────────────────────────────────────────
        var dragStart = null;
        var MIN_DRAG = 6; // px in screen coords per cell-step

        function clientToSvgCoord(e) {
          var ctm = svg.getScreenCTM();
          if (!ctm) return null;
          var pt = svg.createSVGPoint();
          var src = e.touches ? e.touches[0] : e;
          pt.x = src.clientX;
          pt.y = src.clientY;
          return pt.matrixTransform(ctm.inverse());
        }

        function tryMove(dRow, dCol) {
          if (gameOver) return false;
          var cell = maze[playerRow][playerCol];
          var canMove = false;
          if (dRow === -1 && !cell.top)    canMove = true;
          if (dRow ===  1 && !cell.bottom) canMove = true;
          if (dCol === -1 && !cell.left)   canMove = true;
          if (dCol ===  1 && !cell.right)  canMove = true;

          if (!canMove) return false;

          var newRow = playerRow + dRow;
          var newCol = playerCol + dCol;

          // Detect backtracking: stepping back to the cell before us on currentPath
          var prevOnPath = currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
          if (prevOnPath && prevOnPath[0] === newRow && prevOnPath[1] === newCol) {
            // Pop the current position off the path and add it to breadcrumbs
            var popped = currentPath.pop();
            if (trailMode === 'twoColor') breadcrumbs.push(popped);
          } else {
            // Moving to a new cell: push it onto the path
            currentPath.push([newRow, newCol]);
            // If revisiting a breadcrumb cell, remove it from breadcrumbs
            for (var bi = breadcrumbs.length - 1; bi >= 0; bi--) {
              if (breadcrumbs[bi][0] === newRow && breadcrumbs[bi][1] === newCol) {
                breadcrumbs.splice(bi, 1); break;
              }
            }
          }

          playerRow = newRow;
          playerCol = newCol;

          if (APP.audio && APP.audio.sfx) APP.audio.sfx.click();

          // Update player emoji position
          playerText.setAttribute('x', MARGIN + playerCol * CELL + CELL/2);
          playerText.setAttribute('y', MARGIN + playerRow * CELL + CELL/2);

          // Update trail polyline (current path)
          if (trailEl) {
            var newPts = currentPath.map(function (pt) {
              return (MARGIN + pt[1] * CELL + CELL/2) + ',' + (MARGIN + pt[0] * CELL + CELL/2);
            }).join(' ');
            trailEl.setAttribute('points', newPts);
          }

          // Rebuild breadcrumb dots
          if (breadcrumbsEl) {
            while (breadcrumbsEl.firstChild) breadcrumbsEl.removeChild(breadcrumbsEl.firstChild);
            breadcrumbs.forEach(function(pt) {
              var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              c.setAttribute('cx', MARGIN + pt[1] * CELL + CELL/2);
              c.setAttribute('cy', MARGIN + pt[0] * CELL + CELL/2);
              c.setAttribute('r', CELL * 0.15);
              c.setAttribute('fill', '#d4b8fa');
              c.setAttribute('opacity', '0.45');
              breadcrumbsEl.appendChild(c);
            });
          }

          if (playerRow === N - 1 && playerCol === N - 1) {
            gameOver = true;
            if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
            if (APP.launchConfetti) APP.launchConfetti();
            setTimeout(function () { doRender(); }, 400);
          }
          return true;
        }

        // Continuous drag: keep moving through cells as the pointer travels,
        // re-anchoring after each step so one long swipe walks several cells.
        function onPointerDown(e) {
          var src = e.touches ? e.touches[0] : e;
          dragStart = { x: src.clientX, y: src.clientY };
          if (svg.setPointerCapture && e.pointerId != null) {
            try { svg.setPointerCapture(e.pointerId); } catch (_) {}
          }
          e.preventDefault();
        }

        function onPointerMove(e) {
          if (!dragStart || gameOver) return;
          var src = e.touches ? e.touches[0] : e;
          var dx = src.clientX - dragStart.x;
          var dy = src.clientY - dragStart.y;
          if (Math.abs(dx) < MIN_DRAG && Math.abs(dy) < MIN_DRAG) return;
          var moved;
          if (Math.abs(dx) >= Math.abs(dy)) {
            moved = tryMove(0, dx > 0 ? 1 : -1);
          } else {
            moved = tryMove(dy > 0 ? 1 : -1, 0);
          }
          // Re-anchor so the next cell-step needs a fresh drag delta.
          if (moved) dragStart = { x: src.clientX, y: src.clientY };
          e.preventDefault();
        }

        function onPointerUp() { dragStart = null; }

        svg.addEventListener('pointerdown', onPointerDown);
        svg.addEventListener('pointermove', onPointerMove);
        svg.addEventListener('pointerup', onPointerUp);
        svg.addEventListener('pointercancel', onPointerUp);

        // Arrow key support
        function onKeyDown(e) {
          if (gameOver) return;
          var moved = false;
          if (e.key === 'ArrowUp')    { tryMove(-1, 0); moved = true; }
          if (e.key === 'ArrowDown')  { tryMove( 1, 0); moved = true; }
          if (e.key === 'ArrowLeft')  { tryMove( 0,-1); moved = true; }
          if (e.key === 'ArrowRight') { tryMove( 0, 1); moved = true; }
          if (moved) e.preventDefault();
        }
        document.addEventListener('keydown', onKeyDown);

        // Clean up key listener when screen changes
        var origGo = ctx && ctx.go;
        if (ctx) {
          ctx.go = function () {
            document.removeEventListener('keydown', onKeyDown);
            ctx.go = origGo;
            origGo.apply(ctx, arguments);
          };
        }
      }

      screen.appendChild(body);
      root.appendChild(screen);
    }

    function startNew(size) {
      N = parseInt(size, 10) || 6;
      seed = Math.floor(Math.random() * 0x7fffffff);
      maze = generateMaze(N, seed);
      playerRow = 0; playerCol = 0;
      currentPath = [[0, 0]];
      breadcrumbs = [];
      gameOver = false;
      doRender();
    }

    doRender();
  }

  // ── Exports ─────────────────────────────────────────────────────────────────
  APP.screens = APP.screens || {};
  APP.screens.maze = { render: render };

  // Expose pure maze generator for unit tests
  APP.maze = { generateMaze: generateMaze };

})(window.APP);

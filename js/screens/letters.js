window.APP = window.APP || {};

// Letter-patterns review screen.
// Shows all 26 glyphs for one case with stroke order (Overview) or
// progressive build-up step-by-step (Stages).
// Accessible from the Settings screen.
(function (APP) {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  // One colour per stroke (up to 5 before cycling)
  const COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  function svgEl(tag, attrs) {
    const e = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    return e;
  }

  // Parse the starting point of an SVG path ("M x,y …" or "M x y …")
  function startPt(d) {
    const m = d.match(/M\s*([\-\d.]+)[,\s]+([\-\d.]+)/);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : null;
  }

  // ── Overview SVG ──────────────────────────────────────────────────────────
  // Ghost outline of the full letter, then each stroke in its own colour with
  // a numbered circle at the start point.
  function overviewSVG(data, px) {
    const svg = svgEl('svg', { viewBox: data.viewBox, width: px, height: px });

    // Ghost: all strokes at low opacity for shape reference
    const ghost = svgEl('g', {
      stroke: 'rgba(0,24,88,0.13)', 'stroke-width': 48,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => ghost.appendChild(svgEl('path', { d: s.d })));
    svg.appendChild(ghost);

    // Each stroke in a unique colour + numbered start dot
    data.strokes.forEach((s, i) => {
      const color = COLORS[i % COLORS.length];
      svg.appendChild(svgEl('path', {
        d: s.d, stroke: color, 'stroke-width': 13,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));

      const pt = startPt(s.d);
      if (pt) {
        svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 20, fill: 'white' }));
        svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 15, fill: color }));
        const t = document.createElementNS(SVG_NS, 'text');
        [['x', pt.x], ['y', pt.y], ['text-anchor', 'middle'],
         ['dominant-baseline', 'central'], ['font-size', 18],
         ['font-weight', 800], ['fill', 'white']].forEach(([k, v]) => t.setAttribute(k, v));
        t.textContent = String(i + 1);
        svg.appendChild(t);
      }
    });
    return svg;
  }

  // ── Stages element ────────────────────────────────────────────────────────
  // N small SVGs side-by-side, each revealing one more stroke:
  //   previous strokes = dark blue (done), current = orange, future = ghost.
  function stagesEl(data, px) {
    const wrap = document.createElement('div');
    wrap.className = 'letter-stages';

    data.strokes.forEach((_, idx) => {
      const svg = svgEl('svg', { viewBox: data.viewBox, width: px, height: px });

      // Done
      const doneG = svgEl('g', {
        stroke: '#001858', 'stroke-width': 48,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      for (let j = 0; j < idx; j++) doneG.appendChild(svgEl('path', { d: data.strokes[j].d }));
      svg.appendChild(doneG);

      // Future (ghost)
      const futureG = svgEl('g', {
        stroke: 'rgba(0,24,88,0.10)', 'stroke-width': 48,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      for (let j = idx + 1; j < data.strokes.length; j++) futureG.appendChild(svgEl('path', { d: data.strokes[j].d }));
      svg.appendChild(futureG);

      // Active stroke (orange)
      svg.appendChild(svgEl('path', {
        d: data.strokes[idx].d, stroke: '#ff8906', 'stroke-width': 48,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));

      // Start dot on active stroke
      const pt = startPt(data.strokes[idx].d);
      if (pt) {
        svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 22, fill: 'white' }));
        svg.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 16, fill: '#ff8906' }));
      }

      // Cell wrapper + stage number badge
      const cell = document.createElement('div');
      cell.className = 'stage-cell';
      cell.appendChild(svg);
      const badge = document.createElement('div');
      badge.className = 'stage-badge';
      badge.textContent = idx + 1;
      cell.appendChild(badge);
      wrap.appendChild(cell);
    });

    return wrap;
  }

  // ── Main render ───────────────────────────────────────────────────────────
  function render(root, ctx) {
    // Persist toggle state across redraws without re-entering render()
    let caseMode = APP.state.settings.letterCase === 'lower' ? 'lower' : 'upper';
    let viewMode = 'overview';

    function draw() {
      root.innerHTML = '';

      const chars = (caseMode === 'lower'
        ? 'abcdefghijklmnopqrstuvwxyz'
        : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ').split('');

      const wrap = document.createElement('div');
      wrap.className = 'letters-screen';

      // ── Header ──
      const header = document.createElement('div');
      header.className = 'letters-header';
      header.innerHTML = `
        <button class="btn icon ghost" id="ltr-back" aria-label="Back">&#8592;</button>
        <h2>Letter Patterns</h2>
        <div class="ltr-controls">
          <div class="seg">
            <button data-case="upper" class="${caseMode === 'upper' ? 'on' : ''}">ABC</button>
            <button data-case="lower" class="${caseMode === 'lower' ? 'on' : ''}">abc</button>
          </div>
          <div class="seg">
            <button data-view="overview" class="${viewMode === 'overview' ? 'on' : ''}">Overview</button>
            <button data-view="stages"   class="${viewMode === 'stages'   ? 'on' : ''}">Stages</button>
          </div>
        </div>
      `;
      header.querySelector('#ltr-back').addEventListener('click', () => ctx.go('setup'));
      header.querySelectorAll('[data-case]').forEach(b =>
        b.addEventListener('click', () => { caseMode = b.dataset.case; draw(); }));
      header.querySelectorAll('[data-view]').forEach(b =>
        b.addEventListener('click', () => { viewMode = b.dataset.view; draw(); }));
      wrap.appendChild(header);

      // ── Body ──
      const body = document.createElement('div');
      body.className = viewMode === 'overview' ? 'letters-grid' : 'letters-stages-list';

      chars.forEach(ch => {
        const data = APP.getLetter(ch);
        const card = document.createElement('div');

        if (viewMode === 'overview') {
          card.className = 'letter-card';
          const lbl = document.createElement('div');
          lbl.className = 'letter-card-char';
          lbl.textContent = ch;
          card.appendChild(lbl);

          if (data) {
            card.appendChild(overviewSVG(data, 100));
            const info = document.createElement('div');
            info.className = 'letter-card-info';
            info.textContent = `${data.strokes.length} stroke${data.strokes.length !== 1 ? 's' : ''}`;
            card.appendChild(info);
          } else {
            const miss = document.createElement('div');
            miss.className = 'letter-card-missing';
            miss.textContent = 'no data';
            card.appendChild(miss);
          }

        } else {
          // Stages row
          card.className = 'letter-stages-row';
          const lbl = document.createElement('div');
          lbl.className = 'letter-stages-char';
          lbl.textContent = ch;
          card.appendChild(lbl);

          if (data) {
            card.appendChild(stagesEl(data, 76));
          } else {
            const miss = document.createElement('span');
            miss.className = 'letter-card-missing';
            miss.textContent = 'no data';
            card.appendChild(miss);
          }
        }

        body.appendChild(card);
      });

      wrap.appendChild(body);
      root.appendChild(wrap);
    }

    draw();
  }

  APP.screens = APP.screens || {};
  APP.screens.letters = { render };
})(window.APP);

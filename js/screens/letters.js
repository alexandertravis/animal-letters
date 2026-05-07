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

  const SW = 48; // base stroke width — matches tracer STROKE_WIDTH
  const SW_OUTLINE = SW + 8; // outline width — 4 units of border visible per side
  const GHOST_COLOR = '#dde0ea'; // solid light blue-grey ≈ rgba(0,24,88,0.12) over white

  // Appends horizontal writing guidelines to an SVG element.
  // Reads from APP.GUIDE_CONFIG — edit that object in letterData.js to restyle.
  function addGuidelines(svg, viewBox) {
    const gc = APP.GUIDE_CONFIG;
    if (!gc) return;
    const vb = viewBox.split(/\s+/).map(Number);
    const x1 = vb[0], x2 = vb[0] + vb[2];
    const g = svgEl('g', { 'pointer-events': 'none' });
    Object.values(gc.lines).forEach(line => {
      const color   = line.color   || gc.defaults.color;
      const opacity = line.opacity !== undefined ? line.opacity : gc.defaults.opacity;
      const width   = line.width   || gc.defaults.width;
      const attrs = {
        x1, y1: line.y, x2, y2: line.y,
        stroke: color, 'stroke-width': width, opacity
      };
      if (line.dash) attrs['stroke-dasharray'] = line.dash;
      g.appendChild(svgEl('line', attrs));
    });
    svg.appendChild(g);
  }

  // ── Overview SVG ──────────────────────────────────────────────────────────
  // Thin dark outline + solid light-grey ghost interior (matches game style),
  // then each stroke in its own colour with a numbered circle at the start point.
  function overviewSVG(data, char, px) {
    const svg = svgEl('svg', { viewBox: data.viewBox, width: px, height: px });
    addGuidelines(svg, data.viewBox);

    // All letter content sits in a transformed group so paths align with guidelines.
    const { a, b } = APP.getLetterYTransform(char);
    const ltr = svgEl('g', { transform: `translate(0,${b.toFixed(3)}) scale(1,${a.toFixed(6)})` });

    // Outline: wider dark stroke — border ring visible around the ghost on top
    const outline = svgEl('g', {
      stroke: '#001858', 'stroke-width': SW_OUTLINE,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => outline.appendChild(svgEl('path', { d: s.d })));
    ltr.appendChild(outline);

    // Ghost: solid light grey covers the outline interior, leaving the border ring
    const ghost = svgEl('g', {
      stroke: GHOST_COLOR, 'stroke-width': SW,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => ghost.appendChild(svgEl('path', { d: s.d })));
    ltr.appendChild(ghost);

    // Depth: cascading opacity per stroke — first stroke lightest, last darkest.
    const depth = svgEl('g', {
      'stroke-width': SW, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    const _dn = data.strokes.length;
    data.strokes.forEach((s, i) => {
      const t = i / Math.max(_dn - 1, 1);
      const opacity = (0.08 + t * 0.37).toFixed(2);
      depth.appendChild(svgEl('path', { d: s.d, stroke: `rgba(0,24,88,${opacity})` }));
    });
    ltr.appendChild(depth);

    // Each stroke in a unique colour + numbered start dot
    data.strokes.forEach((s, i) => {
      const color = COLORS[i % COLORS.length];
      ltr.appendChild(svgEl('path', {
        d: s.d, stroke: color, 'stroke-width': 13,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));

      const pt = startPt(s.d);
      if (pt) {
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 20, fill: 'white' }));
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 15, fill: color }));
        const t = document.createElementNS(SVG_NS, 'text');
        [['x', pt.x], ['y', pt.y], ['text-anchor', 'middle'],
         ['dominant-baseline', 'central'], ['font-size', 18],
         ['font-weight', 800], ['fill', 'white']].forEach(([k, v]) => t.setAttribute(k, v));
        t.textContent = String(i + 1);
        ltr.appendChild(t);
      }
    });
    svg.appendChild(ltr);
    return svg;
  }

  // ── Stages element ────────────────────────────────────────────────────────
  // N small SVGs side-by-side, each revealing one more stroke:
  //   previous strokes = dark blue (done), current = orange, future = ghost.
  function stagesEl(data, char, px) {
    const wrap = document.createElement('div');
    wrap.className = 'letter-stages';

    const vbParts = data.viewBox.split(/\s+/).map(Number);
    const aspect  = vbParts[3] / vbParts[2];
    const svgH    = Math.round(px * aspect);

    const { a, b } = APP.getLetterYTransform(char);
    const ltrTransform = `translate(0,${b.toFixed(3)}) scale(1,${a.toFixed(6)})`;

    data.strokes.forEach((_, idx) => {
      const svg = svgEl('svg', {
        viewBox: data.viewBox, width: px, height: svgH,
        style: 'display:block;flex-shrink:0'
      });
      addGuidelines(svg, data.viewBox);

      // All letter content in a transformed group aligned to guidelines
      const ltr = svgEl('g', { transform: ltrTransform });

      const outlineG = svgEl('g', {
        stroke: '#001858', 'stroke-width': SW_OUTLINE,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      data.strokes.forEach(s => outlineG.appendChild(svgEl('path', { d: s.d })));
      ltr.appendChild(outlineG);

      const ghostG = svgEl('g', {
        stroke: GHOST_COLOR, 'stroke-width': SW,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      data.strokes.forEach(s => ghostG.appendChild(svgEl('path', { d: s.d })));
      ltr.appendChild(ghostG);

      const depthG = svgEl('g', {
        'stroke-width': SW, fill: 'none',
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      const _dn2 = data.strokes.length;
      data.strokes.forEach((s, i) => {
        const t = i / Math.max(_dn2 - 1, 1);
        const opacity = (0.08 + t * 0.37).toFixed(2);
        depthG.appendChild(svgEl('path', { d: s.d, stroke: `rgba(0,24,88,${opacity})` }));
      });
      ltr.appendChild(depthG);

      const doneG = svgEl('g', {
        stroke: '#001858', 'stroke-width': SW_OUTLINE,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      for (let j = 0; j < idx; j++) doneG.appendChild(svgEl('path', { d: data.strokes[j].d }));
      ltr.appendChild(doneG);

      const color = COLORS[idx % COLORS.length];
      ltr.appendChild(svgEl('path', {
        d: data.strokes[idx].d, stroke: color, 'stroke-width': SW,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));

      const pt = startPt(data.strokes[idx].d);
      if (pt) {
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 22, fill: 'white' }));
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 16, fill: color }));
        const t = document.createElementNS(SVG_NS, 'text');
        [['x', pt.x], ['y', pt.y], ['text-anchor', 'middle'],
         ['dominant-baseline', 'central'], ['font-size', 18],
         ['font-weight', 800], ['fill', 'white'],
         ['pointer-events', 'none']].forEach(([k, v]) => t.setAttribute(k, v));
        t.textContent = String(idx + 1);
        ltr.appendChild(t);
      }
      svg.appendChild(ltr);

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
          <div class="toggle-group">
            <button data-case="upper" class="${caseMode === 'upper' ? 'on' : ''}">ABC</button>
            <button data-case="lower" class="${caseMode === 'lower' ? 'on' : ''}">abc</button>
          </div>
          <div class="toggle-group">
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
            card.appendChild(overviewSVG(data, ch, 100));
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
            card.appendChild(stagesEl(data, ch, 76));
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

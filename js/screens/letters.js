window.APP = window.APP || {};

// Letter-patterns review screen.
// Shows all 26 glyphs for one case with stroke order (Overview) or
// progressive build-up step-by-step (Stages).
// Accessible from the Settings screen.
(function (APP) {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  // One colour per stroke (up to 5 before cycling)
  const COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  // Confetti burst (same implementation as complete.js)
  const CONFETTI_COLORS = ['#ff8906','#f582ae','#8bd3dd','#5390d9','#7c3aed','#e74c3c','#2ecc71','#f1c40f'];
  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const DURATION = 3500;
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 5,
      vy: 2.5 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      w: 7 + Math.random() * 9,
      h: 4 + Math.random() * 6,
      shape: Math.random() > 0.35 ? 'rect' : 'circle',
      opacity: 1,
    }));
    let startTs = null, rafId;
    function draw(ts) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.vx *= 0.993; p.rotation += p.rotSpeed;
        if (elapsed > DURATION - 1000) p.opacity = Math.max(0, (DURATION - elapsed) / 1000);
        if (p.y < canvas.height + 50) alive++;
        ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.fillStyle = p.color;
        if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
        ctx.restore();
      });
      if (elapsed < DURATION && alive > 0) { rafId = requestAnimationFrame(draw); } else { canvas.remove(); }
    }
    rafId = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafId); canvas.remove(); };
  }

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

  const GHOST_COLOR  = '#dde0ea'; // solid light blue-grey ≈ rgba(0,24,88,0.12) over white
  const X_SCALE_UP   = 0.85;      // horizontal squeeze for uppercase — must match tracer.js
  const X_SCALE_LOW  = 0.80;      // horizontal squeeze for lowercase — must match tracer.js
  const X_CENTER     = 100;       // viewBox midpoint

  function strokeWidths(char) {
    const up = /[A-Z]/.test(char);
    const SW = up ? 42 : 30;
    return { SW, SW_OUTLINE: SW + 8 };
  }

  // Dot-stroke helpers — mirror of tracer.js logic.
  function isDot(d) {
    const m = d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)\s+L\s*([\d.-]+)[,\s]+([\d.-]+)/);
    return !!(m && parseFloat(m[1]) === parseFloat(m[3]) && parseFloat(m[2]) === parseFloat(m[4]));
  }
  function dotDisplayPos(d, char) {
    const m = d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)/);
    if (!m) return null;
    const { a, b } = APP.getLetterYTransform(char);
    const isUpper = /[A-Z]/.test(char);
    const xScale  = isUpper ? X_SCALE_UP : X_SCALE_LOW;
    const xOffset = isUpper ? X_CENTER * (1 - X_SCALE_UP) : X_CENTER * (1 - X_SCALE_LOW);
    return { x: xScale * parseFloat(m[1]) + xOffset, y: a * parseFloat(m[2]) + b };
  }

  // Returns the SVG transform string for a glyph — combines the y-axis
  // guide mapping with the optional x-axis squeeze for lowercase.
  function letterTransform(char) {
    const { a, b } = APP.getLetterYTransform(char);
    const isUpper  = /[A-Z]/.test(char);
    const xScale   = isUpper ? X_SCALE_UP  : X_SCALE_LOW;
    const xOffset  = isUpper ? X_CENTER * (1 - X_SCALE_UP) : X_CENTER * (1 - X_SCALE_LOW);
    return `translate(${xOffset},${b.toFixed(3)}) scale(${xScale},${a.toFixed(6)})`;
  }

  // Appends horizontal writing guidelines to an SVG element.
  // Reads from APP.GUIDE_CONFIG — edit that object in letterData.js to restyle.
  function addGuidelines(svg, viewBox) {
    const gc = APP.GUIDE_CONFIG;
    if (!gc) return;
    const vb = viewBox.split(/\s+/).map(Number);
    const x1 = vb[0], x2 = vb[0] + vb[2];
    const g = svgEl('g', { 'pointer-events': 'none' });
    Object.values(gc.lines).forEach(line => {
      if (line.hidden) return;
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
    const { SW, SW_OUTLINE } = strokeWidths(char);
    const svg = svgEl('svg', { viewBox: data.viewBox, width: px, height: px });
    addGuidelines(svg, data.viewBox);

    // All letter content sits in a transformed group so paths align with guidelines.
    const ltr = svgEl('g', { transform: letterTransform(char) });

    // Outline: wider dark stroke — border ring visible around the ghost on top
    const outline = svgEl('g', {
      stroke: '#001858', 'stroke-width': SW_OUTLINE,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => { if (!isDot(s.d)) outline.appendChild(svgEl('path', { d: s.d })); });
    ltr.appendChild(outline);

    // Ghost: solid light grey covers the outline interior, leaving the border ring
    const ghost = svgEl('g', {
      stroke: GHOST_COLOR, 'stroke-width': SW,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => { if (!isDot(s.d)) ghost.appendChild(svgEl('path', { d: s.d })); });
    ltr.appendChild(ghost);

    // Depth: cascading opacity per stroke — first stroke lightest, last darkest.
    const depth = svgEl('g', {
      'stroke-width': SW, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    const _dn = data.strokes.length;
    data.strokes.forEach((s, i) => {
      if (isDot(s.d)) return;
      const t = i / Math.max(_dn - 1, 1);
      const opacity = (0.08 + t * 0.37).toFixed(2);
      depth.appendChild(svgEl('path', { d: s.d, stroke: `rgba(0,24,88,${opacity})` }));
    });
    ltr.appendChild(depth);
    svg.appendChild(ltr);

    // Dot overlay — circles rendered outside the transform group so they stay round.
    data.strokes.forEach((s, i) => {
      if (!isDot(s.d)) return;
      const pos = dotDisplayPos(s.d, char);
      if (!pos) return;
      const t = i / Math.max(_dn - 1, 1);
      const opacity = (0.08 + t * 0.37).toFixed(2);
      svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW_OUTLINE / 2, fill: '#001858' }));
      svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: GHOST_COLOR }));
      svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: `rgba(0,24,88,${opacity})` }));
    });

    // Each stroke in a unique colour + numbered start dot
    data.strokes.forEach((s, i) => {
      const color = COLORS[i % COLORS.length];
      if (isDot(s.d)) {
        const pos = dotDisplayPos(s.d, char);
        if (pos) {
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 6.5, fill: color }));
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 10, fill: 'white', opacity: 0.7 }));
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 7.5, fill: color }));
        }
        return;
      }
      // Regular stroke: coloured path + numbered start dot, both inside ltr transform group.
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
    // ltr was already appended to svg above (before the dot overlay circles).
    return svg;
  }

  // ── Stages element ────────────────────────────────────────────────────────
  // N small SVGs side-by-side, each revealing one more stroke:
  //   previous strokes = dark blue (done), current = orange, future = ghost.
  function stagesEl(data, char, px) {
    const { SW, SW_OUTLINE } = strokeWidths(char);
    const wrap = document.createElement('div');
    wrap.className = 'letter-stages';

    const vbParts = data.viewBox.split(/\s+/).map(Number);
    const aspect  = vbParts[3] / vbParts[2];
    const svgH    = Math.round(px * aspect);

    const ltrTransform = letterTransform(char);

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
      data.strokes.forEach(s => { if (!isDot(s.d)) outlineG.appendChild(svgEl('path', { d: s.d })); });
      ltr.appendChild(outlineG);

      const ghostG = svgEl('g', {
        stroke: GHOST_COLOR, 'stroke-width': SW,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      data.strokes.forEach(s => { if (!isDot(s.d)) ghostG.appendChild(svgEl('path', { d: s.d })); });
      ltr.appendChild(ghostG);

      const depthG = svgEl('g', {
        'stroke-width': SW, fill: 'none',
        'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      const _dn2 = data.strokes.length;
      data.strokes.forEach((s, i) => {
        if (isDot(s.d)) return;
        const t = i / Math.max(_dn2 - 1, 1);
        const opacity = (0.08 + t * 0.37).toFixed(2);
        depthG.appendChild(svgEl('path', { d: s.d, stroke: `rgba(0,24,88,${opacity})` }));
      });
      ltr.appendChild(depthG);

      const doneG = svgEl('g', {
        stroke: '#001858', 'stroke-width': SW_OUTLINE,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      });
      for (let j = 0; j < idx; j++) {
        if (!isDot(data.strokes[j].d)) doneG.appendChild(svgEl('path', { d: data.strokes[j].d }));
      }
      ltr.appendChild(doneG);

      const color = COLORS[idx % COLORS.length];
      const curStroke = data.strokes[idx];
      if (!isDot(curStroke.d)) {
        ltr.appendChild(svgEl('path', {
          d: curStroke.d, stroke: color, 'stroke-width': SW,
          fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));
        const pt = startPt(curStroke.d);
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
      }
      svg.appendChild(ltr);

      // Dot overlay — circles outside the transform group so they stay perfectly round.
      data.strokes.forEach((s, i) => {
        if (!isDot(s.d)) return;
        const pos = dotDisplayPos(s.d, char);
        if (!pos) return;
        const tVal = i / Math.max(_dn2 - 1, 1);
        const opacity = (0.08 + tVal * 0.37).toFixed(2);
        const isDone = i < idx;
        const isCurrent = i === idx;
        if (isDone) {
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW_OUTLINE / 2, fill: '#001858' }));
        } else {
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW_OUTLINE / 2, fill: '#001858' }));
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: GHOST_COLOR }));
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: `rgba(0,24,88,${opacity})` }));
          if (isCurrent) {
            svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: color }));
            svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 22, fill: 'white' }));
            svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 16, fill: color }));
            const t = document.createElementNS(SVG_NS, 'text');
            [['x', pos.x], ['y', pos.y], ['text-anchor', 'middle'],
             ['dominant-baseline', 'central'], ['font-size', 18],
             ['font-weight', 800], ['fill', 'white'],
             ['pointer-events', 'none']].forEach(([k, v]) => t.setAttribute(k, v));
            t.textContent = String(idx + 1);
            svg.appendChild(t);
          }
        }
      });

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
    // Active practice tracer — kept here so switching views always cleans it up.
    let practiceTracer = null;

    function draw() {
      if (practiceTracer) { practiceTracer.destroy(); practiceTracer = null; }
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
        <button class="btn icon ghost" id="ltr-back" aria-label="Back">${APP.ICONS.back}</button>
        <h2>Letter Patterns</h2>
        <div class="ltr-controls">
          <div class="toggle-group">
            <button data-case="upper" class="${caseMode === 'upper' ? 'on' : ''}">ABC</button>
            <button data-case="lower" class="${caseMode === 'lower' ? 'on' : ''}">abc</button>
          </div>
          <div class="toggle-group">
            <button data-view="overview"  class="${viewMode === 'overview'  ? 'on' : ''}">Overview</button>
            <button data-view="stages"    class="${viewMode === 'stages'    ? 'on' : ''}">Stages</button>
            <button data-view="practice"  class="${viewMode === 'practice'  ? 'on' : ''}">Practice</button>
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

      if (viewMode === 'overview') {
        // ── Overview grid ──────────────────────────────────────────────────
        body.className = 'letters-grid';
        chars.forEach(ch => {
          const data = APP.getLetter(ch);
          const card = document.createElement('div');
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
          body.appendChild(card);
        });

      } else if (viewMode === 'stages') {
        // ── Stages grid ────────────────────────────────────────────────────
        body.className = 'letters-stages-list';
        chars.forEach(ch => {
          const data = APP.getLetter(ch);
          const card = document.createElement('div');
          card.className = 'letter-stages-row';
          const lbl = document.createElement('div');
          lbl.className = 'letter-stages-char';
          lbl.textContent = ch;
          card.appendChild(lbl);
          if (data) {
            card.appendChild(stagesEl(data, ch, 100));
          } else {
            const miss = document.createElement('span');
            miss.className = 'letter-card-missing';
            miss.textContent = 'no data';
            card.appendChild(miss);
          }
          body.appendChild(card);
        });

      } else if (viewMode === 'practice') {
        // ── Practice view ──────────────────────────────────────────────────
        body.className = 'practice-panel';

        // Letter picker — compact row of all letters
        const picker = document.createElement('div');
        picker.className = 'practice-picker';
        chars.forEach(ch => {
          const btn = document.createElement('button');
          btn.className = 'practice-letter-btn';
          btn.textContent = ch;
          btn.addEventListener('click', () => mountPractice(ch));
          picker.appendChild(btn);
        });
        body.appendChild(picker);

        // Stage — the tracer mounts here
        const stageWrap = document.createElement('div');
        stageWrap.className = 'practice-stage-wrap';
        const stage = document.createElement('div');
        stage.className = 'practice-stage';

        // Placeholder shown before a letter is chosen
        const placeholder = document.createElement('div');
        placeholder.className = 'practice-placeholder';
        placeholder.textContent = 'Select a letter above to start practising';
        stage.appendChild(placeholder);

        stageWrap.appendChild(stage);
        body.appendChild(stageWrap);

        // Controls bar — two centred buttons side by side.
        // "Great job" uses visibility:hidden as a placeholder so "Try again"
        // never shifts position when the completion button appears/disappears.
        const controls = document.createElement('div');
        controls.className = 'practice-controls';

        const greatBtn = document.createElement('button');
        greatBtn.className = 'btn practice-great-btn';
        greatBtn.textContent = 'Great Job! 🎉';
        greatBtn.style.visibility = 'hidden';
        controls.appendChild(greatBtn);

        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn practice-reset-btn';
        resetBtn.textContent = 'Try Again';
        resetBtn.disabled = true;
        controls.appendChild(resetBtn);

        body.appendChild(controls);

        // Mount a letter into the practice stage
        function mountPractice(ch) {
          if (practiceTracer) { practiceTracer.destroy(); practiceTracer = null; }

          // Highlight selected button
          picker.querySelectorAll('.practice-letter-btn').forEach(b =>
            b.classList.toggle('active', b.textContent === ch));

          stage.innerHTML = '';
          resetBtn.disabled = false;
          greatBtn.style.visibility = 'hidden';

          practiceTracer = APP.tracer.mount(stage, ch, {
            onComplete() {
              greatBtn.style.visibility = 'visible';
            }
          });
        }

        greatBtn.addEventListener('click', () => {
          launchConfetti();
        });

        resetBtn.addEventListener('click', () => {
          const active = picker.querySelector('.practice-letter-btn.active');
          if (active) mountPractice(active.textContent);
        });
      }

      wrap.appendChild(body);
      root.appendChild(wrap);
    }

    draw();
  }

  APP.screens = APP.screens || {};
  APP.screens.letters = { render };
})(window.APP);

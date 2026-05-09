window.APP = window.APP || {};

// Letter-patterns review screen.
// Shows all 26 glyphs for one case with stroke order (Overview) or
// progressive build-up step-by-step (Stages).
// Accessible from the Settings screen.
(function (APP) {
  // Alias shared utilities for brevity.
  const svgEl = APP.svgEl;
  const isDot = APP.isDot;

  // One colour per stroke (up to 5 before cycling)
  const COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  const GHOST_COLOR = '#dde0ea'; // solid light blue-grey ≈ rgba(0,24,88,0.12) over white

  // Read shared letter metrics — single source of truth with tracer.js.
  const { X_SCALE_UP, X_SCALE_LOW, X_CENTER } = APP.LETTER_METRICS;

  function strokeWidths(char) {
    const up = /[A-Z]/.test(char);
    const SW = up ? 42 : 30;
    return { SW, SW_OUTLINE: SW + 8 };
  }

  // Parse the starting point of an SVG path ("M x,y …" or "M x y …")
  function startPt(d) {
    const m = d.match(/M\s*([\-\d.]+)[,\s]+([\-\d.]+)/);
    return m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : null;
  }

  // Returns the display-space position of a dot stroke, binding the given
  // character's affine transform. Delegates to APP.dotTransformPos for the math.
  function dotDisplayPos(d, char) {
    const { a, b } = APP.getLetterYTransform(char);
    const isUpper  = /[A-Z]/.test(char);
    const xScale   = isUpper ? X_SCALE_UP : X_SCALE_LOW;
    const xOffset  = isUpper ? X_CENTER * (1 - X_SCALE_UP) : X_CENTER * (1 - X_SCALE_LOW);
    return APP.dotTransformPos(d, xScale, xOffset, a, b);
  }

  // Returns the SVG transform string for a glyph — combines the y-axis
  // guide mapping with the horizontal squeeze.
  function letterTransform(char) {
    const { a, b } = APP.getLetterYTransform(char);
    const isUpper  = /[A-Z]/.test(char);
    const xScale   = isUpper ? X_SCALE_UP  : X_SCALE_LOW;
    const xOffset  = isUpper ? X_CENTER * (1 - X_SCALE_UP) : X_CENTER * (1 - X_SCALE_LOW);
    return `translate(${xOffset},${b.toFixed(3)}) scale(${xScale},${a.toFixed(6)})`;
  }

  // ── Ghost text helper ─────────────────────────────────────────────────────
  // Returns a <text> element rendering the Quicksand glyph at low opacity —
  // the "target letter shape" the child traces inside in the review screens.
  function ghostText(char, vb) {
    const fc = APP.FONT_CONFIG;
    const { fontSize, baseline } = APP.getFontPos(char);
    const cx = vb[0] + vb[2] / 2;
    return svgEl('text', {
      class: 'letter-ghost',
      x: cx,
      y: baseline,
      'font-family': fc.family,
      'font-size': fontSize,
      'font-weight': fc.weight,
      'text-anchor': 'middle',
      'dominant-baseline': 'auto',
      fill: GHOST_COLOR,
      stroke: '#001858',
      'stroke-width': 10,
      'paint-order': 'stroke fill',
    }, char);
  }

  // Returns a unique clipPath id and appends the <clipPath><text> to defs.
  function addClipPath(defs, char, vb) {
    const fc = APP.FONT_CONFIG;
    const { fontSize, baseline } = APP.getFontPos(char);
    const cx = vb[0] + vb[2] / 2;
    const clipId = `ltr-clip-${Math.random().toString(36).slice(2, 9)}`;
    const cp = svgEl('clipPath', { id: clipId });
    cp.appendChild(svgEl('text', {
      x: cx,
      y: baseline,
      'font-family': fc.family,
      'font-size': fontSize,
      'font-weight': fc.weight,
      'text-anchor': 'middle',
      'dominant-baseline': 'auto',
    }, char));
    defs.appendChild(cp);
    return clipId;
  }

  // ── Overview SVG ──────────────────────────────────────────────────────────
  // Ghost Quicksand letter shape + each stroke in its own colour with a
  // numbered circle at the start point. Strokes clipped to the font glyph
  // so any guide paths that overshoot the letter are hidden (Phase 3 audit).
  function overviewSVG(data, char, px) {
    const vb = data.viewBox.split(/\s+/).map(Number);
    const svg = svgEl('svg', { viewBox: data.viewBox, width: px, height: px });

    // defs — clipPath for coloured strokes
    const defs = svgEl('defs');
    const clipId = addClipPath(defs, char, vb);
    svg.appendChild(defs);

    APP.addGuidelines(svg, data.viewBox);

    // Ghost: Quicksand glyph with dark border + light fill
    svg.appendChild(ghostText(char, vb));

    // Coloured stroke paths + numbered start dots, clipped to font glyph
    const ltr = svgEl('g', {
      transform: letterTransform(char),
      'clip-path': `url(#${clipId})`,
    });

    data.strokes.forEach((s, i) => {
      if (isDot(s.d)) return;
      const color = COLORS[i % COLORS.length];
      ltr.appendChild(svgEl('path', {
        d: s.d, stroke: color, 'stroke-width': 13,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
      }));
      const pt = startPt(s.d);
      if (pt) {
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 20, fill: 'white' }));
        ltr.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 15, fill: color }));
        ltr.appendChild(svgEl('text', {
          x: pt.x, y: pt.y, 'text-anchor': 'middle', 'dominant-baseline': 'central',
          'font-size': 18, 'font-weight': 700, fill: 'white'
        }, String(i + 1)));
      }
    });
    svg.appendChild(ltr);

    // Dot stroke indicators — drawn in display space (no letterTransform distortion)
    data.strokes.forEach((s, i) => {
      if (!isDot(s.d)) return;
      const pos = dotDisplayPos(s.d, char);
      if (!pos) return;
      const color = COLORS[i % COLORS.length];
      svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 10, fill: 'white', opacity: 0.7 }));
      svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 7.5, fill: color }));
    });

    return svg;
  }

  // ── Stages element ────────────────────────────────────────────────────────
  // N small SVGs side-by-side, each revealing one more stroke:
  //   previous strokes = dark blue (done), current = orange, future = ghost.
  // All stroke content is clipped to the Quicksand glyph outline.
  function stagesEl(data, char, px) {
    const { SW, SW_OUTLINE } = strokeWidths(char);
    const wrap = document.createElement('div');
    wrap.className = 'letter-stages';

    const vbParts = data.viewBox.split(/\s+/).map(Number);
    const aspect  = vbParts[3] / vbParts[2];
    const svgH    = Math.round(px * aspect);
    const vb      = vbParts;

    const glyphTransform = letterTransform(char);

    data.strokes.forEach((_, idx) => {
      const svg = svgEl('svg', {
        viewBox: data.viewBox, width: px, height: svgH,
        style: 'display:block;flex-shrink:0'
      });

      // Each SVG gets its own clipPath (ids must be unique per document)
      const defs = svgEl('defs');
      const clipId = addClipPath(defs, char, vb);
      svg.appendChild(defs);

      APP.addGuidelines(svg, data.viewBox);

      // Ghost: Quicksand letter shape as the background target
      svg.appendChild(ghostText(char, vb));

      // Done strokes (strokes before idx) — dark blue, clipped to font glyph
      const doneG = svgEl('g', {
        stroke: '#001858', 'stroke-width': SW_OUTLINE,
        fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        transform: glyphTransform,
        'clip-path': `url(#${clipId})`,
      });
      for (let j = 0; j < idx; j++) {
        if (!isDot(data.strokes[j].d)) doneG.appendChild(svgEl('path', { d: data.strokes[j].d }));
      }
      svg.appendChild(doneG);

      // Current stroke — coloured, with numbered start dot; clipped to font glyph
      const color = COLORS[idx % COLORS.length];
      const curStroke = data.strokes[idx];
      if (!isDot(curStroke.d)) {
        const curG = svgEl('g', {
          transform: glyphTransform,
          'clip-path': `url(#${clipId})`,
        });
        curG.appendChild(svgEl('path', {
          d: curStroke.d, stroke: color, 'stroke-width': SW,
          fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round'
        }));
        const pt = startPt(curStroke.d);
        if (pt) {
          curG.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 22, fill: 'white' }));
          curG.appendChild(svgEl('circle', { cx: pt.x, cy: pt.y, r: 16, fill: color }));
          curG.appendChild(svgEl('text', {
            x: pt.x, y: pt.y, 'text-anchor': 'middle', 'dominant-baseline': 'central',
            'font-size': 18, 'font-weight': 700, fill: 'white', 'pointer-events': 'none'
          }, String(idx + 1)));
        }
        svg.appendChild(curG);
      }

      // Dot strokes — circles in display space (avoids transform distortion)
      data.strokes.forEach((s, i) => {
        if (!isDot(s.d)) return;
        const pos = dotDisplayPos(s.d, char);
        if (!pos) return;
        const isDone    = i < idx;
        const isCurrent = i === idx;
        if (isDone) {
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: SW_OUTLINE / 2, fill: '#001858' }));
        } else if (isCurrent) {
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 22, fill: 'white' }));
          svg.appendChild(svgEl('circle', { cx: pos.x, cy: pos.y, r: 16, fill: color }));
          svg.appendChild(svgEl('text', {
            x: pos.x, y: pos.y, 'text-anchor': 'middle', 'dominant-baseline': 'central',
            'font-size': 18, 'font-weight': 700, fill: 'white', 'pointer-events': 'none'
          }, String(idx + 1)));
        }
        // Future dot strokes — shown via the ghost text element, no extra circle needed
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
    // Persist toggle state across redraws without re-entering render().
    // This screen only supports two case modes (upper/lower); 'proper' from settings
    // falls back to 'upper' intentionally — the toggle lets the user switch manually.
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
          APP.launchConfetti();
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

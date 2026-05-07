window.APP = window.APP || {};

// Renders a single letter and lets the child trace it stroke-by-stroke.
// API: APP.tracer.mount(stageEl, character, { onComplete })
//      returns { destroy() }
(function (APP) {
  // Alias shared utilities for brevity within this module.
  const el = APP.svgEl;
  const { X_SCALE_UP, X_SCALE_LOW, X_CENTER } = APP.LETTER_METRICS;

  const STROKE_WIDTH_UP  = 42;   // uppercase letter thickness in viewBox units
  const STROKE_WIDTH_LOW = 30;   // lowercase letter thickness
  const INK_WIDTH_UP     = 38;   // user ink thickness — uppercase
  const INK_WIDTH_LOW    = 26;   // user ink thickness — lowercase
  const TOLERANCE    = 32;       // viewBox units — how close pointer must come to next checkpoint
  const DRAW_RADIUS  = 52;       // viewBox units — how close to the dot before ink is deposited
  const CHECKPOINTS_PER_STROKE = 18;

  // One colour per stroke — matches the letter-patterns review screen so
  // the child sees the same numbering system in both places.
  const STROKE_COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  function mount(stageEl, character, opts) {
    const data = APP.getLetter(character);
    if (!data) {
      stageEl.innerHTML = `<div class="fallback-graphic">${character}</div>`;
      // Letters not in data set: auto-complete after a brief pause.
      const t = setTimeout(() => opts && opts.onComplete && opts.onComplete(), 600);
      return { destroy() { clearTimeout(t); stageEl.innerHTML = ''; } };
    }

    stageEl.innerHTML = '';

    // ---- SVG scaffold ----
    const svg = el('svg', {
      class: 'tracer-letter',
      viewBox: data.viewBox,
      preserveAspectRatio: 'xMidYMid meet'
    });

    // Per-character stroke widths — uppercase slightly thinner than before,
    // lowercase noticeably thinner so letters fit better within the smaller zone.
    const isUpper = /[A-Z]/.test(character);
    const SW  = isUpper ? STROKE_WIDTH_UP  : STROKE_WIDTH_LOW;
    const INK = isUpper ? INK_WIDTH_UP     : INK_WIDTH_LOW;

    // Compute y-axis transform: maps design coordinates → current guide positions.
    const { a: tA, b: tB } = APP.getLetterYTransform(character);
    // Lowercase letters get a horizontal squeeze so they look more circular.
    // Scaling around the viewBox centre (x=100): new_x = xScale*x + X_CENTER*(1-xScale).
    const xScale  = isUpper ? X_SCALE_UP  : X_SCALE_LOW;
    const xOffset = isUpper ? X_CENTER * (1 - X_SCALE_UP) : X_CENTER * (1 - X_SCALE_LOW);
    const letterTransform = `translate(${xOffset},${tB.toFixed(3)}) scale(${xScale},${tA.toFixed(6)})`;

    // Zero-length "dot" strokes (M x,y L x,y with identical coords) need special
    // handling: a non-uniform scale turns the round linecap elliptical. Detect them
    // and render as real <circle> elements in transform-free overlay groups instead.
    // isDot is shared (APP.isDot); dotPos is a thin wrapper that binds this letter's transform.
    const isDot = APP.isDot;
    function dotPos(d) { return APP.dotTransformPos(d, xScale, xOffset, tA, tB); }

    // Parse viewBox once — used for the mask rect and guideline x-extents.
    const vb = data.viewBox.split(/\s+/).map(Number);

    // Mask: white letter shape on black bg → confines user ink to inside the letter.
    const defs = el('defs');
    const maskId = `mask-${Math.random().toString(36).slice(2, 9)}`;
    const mask = el('mask', { id: maskId, maskUnits: 'userSpaceOnUse' });
    mask.appendChild(el('rect', {
      x: vb[0], y: vb[1], width: vb[2], height: vb[3], fill: 'black'
    }));
    const maskShapes = el('g', {
      stroke: 'white', 'stroke-width': SW, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: letterTransform
    });
    data.strokes.forEach(s => {
      if (isDot(s.d)) {
        const pos = dotPos(s.d);
        if (pos) mask.appendChild(el('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: 'white' }));
      } else {
        maskShapes.appendChild(el('path', { d: s.d }));
      }
    });
    mask.appendChild(maskShapes);
    defs.appendChild(mask);
    svg.appendChild(defs);

    // ── Writing guidelines (bottom of stack, behind all letter layers) ──
    APP.addGuidelines(svg, data.viewBox);

    // Outline layer — slightly wider dark stroke, rendered first so it peeks out
    // around the edges of the ghost on top, creating a thin dark border.
    // SW + 8 = 4 units visible per side (border ring).
    const outlineGroup = el('g', {
      class: 'outline-group',
      stroke: '#001858', 'stroke-width': SW + 8, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: letterTransform
    });
    data.strokes.forEach(s => { if (!isDot(s.d)) outlineGroup.appendChild(el('path', { d: s.d })); });
    svg.appendChild(outlineGroup);

    // Ghost layer — solid light blue-grey covers the outline interior, leaving
    // only the border ring visible.
    const ghostGroup = el('g', {
      class: 'ghost-group',
      stroke: '#dde0ea', 'stroke-width': SW, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: letterTransform
    });
    data.strokes.forEach(s => { if (!isDot(s.d)) ghostGroup.appendChild(el('path', { d: s.d })); });
    svg.appendChild(ghostGroup);

    // Per-stroke depth layer — first stroke is lightest, each subsequent stroke
    // is slightly more opaque (0.10 → 0.30 across the range). Where paths overlap
    // the opacity compounds, so junctions and crossings appear darker still.
    // All tints stay within the same blue-grey hue as the ghost.
    const depthGroup = el('g', {
      class: 'depth-group',
      'stroke-width': SW, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: letterTransform
    });
    const strokeCount = data.strokes.length;
    data.strokes.forEach((s, i) => {
      if (isDot(s.d)) return;
      const t = i / Math.max(strokeCount - 1, 1);
      const opacity = (0.08 + t * 0.37).toFixed(2);
      depthGroup.appendChild(el('path', { d: s.d, stroke: `rgba(0,24,88,${opacity})` }));
    });
    svg.appendChild(depthGroup);

    // Dot base layer — perfect circles for zero-length dot strokes (i, j dots etc).
    // Lives outside the letterTransform group so the non-uniform scale can't distort them.
    // Stacks outline → ghost → depth tint, matching the visual layering of regular strokes.
    const dotBaseLayer = el('g', { 'pointer-events': 'none' });
    data.strokes.forEach((s, i) => {
      if (!isDot(s.d)) return;
      const pos = dotPos(s.d);
      if (!pos) return;
      const t = i / Math.max(strokeCount - 1, 1);
      const opacity = (0.08 + t * 0.37).toFixed(2);
      dotBaseLayer.appendChild(el('circle', { cx: pos.x, cy: pos.y, r: (SW + 8) / 2, fill: '#001858' }));
      dotBaseLayer.appendChild(el('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: '#dde0ea' }));
      dotBaseLayer.appendChild(el('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: `rgba(0,24,88,${opacity})` }));
    });
    svg.appendChild(dotBaseLayer);

    // Done strokes layer — same width as the outline so completed strokes fill
    // all the way to the edge with no gap or light ring between the fill and border.
    const doneGroup = el('g', {
      class: 'done-group',
      stroke: '#001858', 'stroke-width': SW + 8, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: letterTransform
    });
    svg.appendChild(doneGroup);

    // Overlay for completed dot strokes — sits above the done group.
    const doneDotLayer = el('g', { 'pointer-events': 'none' });
    svg.appendChild(doneDotLayer);

    // User ink layer (masked to letter shape).
    // No group-level stroke colour — each path gets its own colour from STROKE_COLORS.
    const inkGroup = el('g', {
      class: 'ink-group',
      mask: `url(#${maskId})`,
      'stroke-width': INK, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    svg.appendChild(inkGroup);

    // Guide layer (animated dashed path showing current stroke).
    const guideGroup = el('g', { class: 'guide-group' });
    svg.appendChild(guideGroup);

    stageEl.appendChild(svg);

    // ---- State ----
    const totalStrokes = data.strokes.length;
    let currentStroke = 0;
    let currentCheckpoint = 0;
    let activeInkPath = null;             // SVG path for current pointer drag
    let activeInkPoints = [];             // points in viewBox coords
    let pointerActive = false;

    // Build per-stroke checkpoint lists using a hidden temp path for getPointAtLength.
    const checkpoints = data.strokes.map(s => {
      const p = el('path', { d: s.d });
      // path must be in document tree for getTotalLength on some browsers — append to defs.
      defs.appendChild(p);
      const len = p.getTotalLength();
      const pts = [];
      if (len === 0) {
        // Dot stroke (M x,y L x,y with identical coords): zero length means every
        // getPointAtLength call returns the same point. Fill all checkpoints with
        // that single point explicitly so the intent is clear — checkProgress will
        // satisfy all 18 at once on the first proximity hit in onDown.
        const pt = p.getPointAtLength(0);
        const dot = { x: xScale * pt.x + xOffset, y: tA * pt.y + tB };
        for (let i = 0; i < CHECKPOINTS_PER_STROKE; i++) pts.push(dot);
      } else {
        for (let i = 0; i < CHECKPOINTS_PER_STROKE; i++) {
          const t = (i / (CHECKPOINTS_PER_STROKE - 1)) * len;
          const pt = p.getPointAtLength(t);
          pts.push({ x: xScale * pt.x + xOffset, y: tA * pt.y + tB }); // same transform as visual groups
        }
      }
      defs.removeChild(p);
      return pts;
    });

    // Render (or re-render) the guide starting from the current checkpoint.
    // Called on every new stroke AND every time a checkpoint is hit, so the
    // guide visually shrinks as the child traces and the dot advances with them.
    function updateGuide() {
      guideGroup.innerHTML = '';
      if (currentStroke >= totalStrokes) return;

      // Start the remaining guide from the last *completed* checkpoint so the dot
      // sits flush with the end of the ink — no gap between what's filled and
      // where the guide continues.
      const sliceFrom = currentCheckpoint > 0 ? currentCheckpoint - 1 : 0;
      const remaining = checkpoints[currentStroke].slice(sliceFrom);
      if (remaining.length === 0) return;

      // Build a polyline from the remaining checkpoints so the guide
      // disappears behind the user's ink as they progress.
      const d = 'M ' + remaining.map(p => `${p.x},${p.y}`).join(' L ');

      // White halo — rendered first so it sits behind the orange dashes.
      // This keeps the guide legible even when pink ink fills the same area.
      guideGroup.appendChild(el('path', {
        d,
        fill: 'none',
        stroke: 'rgba(255,255,255,0.90)',
        'stroke-width': 18,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }));

      // Dashed guide path — colour matches the current stroke number.
      const color = STROKE_COLORS[currentStroke % STROKE_COLORS.length];
      guideGroup.appendChild(el('path', {
        class: 'guide',
        d,
        fill: 'none',
        stroke: color,
        'stroke-width': 9,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-dasharray': '14 12'
      }));

      // Dot sits at the last completed position — the trailing edge of the ink.
      const lead = remaining[0];
      // White ring gives the dot a clear border against the ink.
      guideGroup.appendChild(el('circle', { cx: lead.x, cy: lead.y, r: 17, fill: 'white' }));
      guideGroup.appendChild(el('circle', {
        class: 'startDot',
        cx: lead.x, cy: lead.y, r: 13,
        fill: color
      }));
      // Stroke number inside the dot so the child can follow the order.
      guideGroup.appendChild(el('text', {
        x: lead.x, y: lead.y,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': 15, 'font-weight': 800, fill: 'white', 'pointer-events': 'none'
      }, String(currentStroke + 1)));
    }

    function markStrokeDone(strokeIdx) {
      const s = data.strokes[strokeIdx];
      if (isDot(s.d)) {
        const pos = dotPos(s.d);
        if (pos) doneDotLayer.appendChild(el('circle', { cx: pos.x, cy: pos.y, r: (SW + 8) / 2, fill: '#001858' }));
      } else {
        doneGroup.appendChild(el('path', { d: s.d }));
      }
    }

    updateGuide();

    // ---- Coordinate mapping ----
    function clientToSvg(clientX, clientY) {
      const pt = svg.createSVGPoint();
      pt.x = clientX; pt.y = clientY;
      const ctm = svg.getScreenCTM();
      if (!ctm) return { x: 0, y: 0 };
      const inv = ctm.inverse();
      const r = pt.matrixTransform(inv);
      return { x: r.x, y: r.y };
    }

    function dist(a, b) {
      const dx = a.x - b.x, dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    // Returns true when the pointer is close enough to the current guide dot
    // to be allowed to deposit ink. Prevents colouring random parts of the letter.
    function isNearGuide(p) {
      if (currentStroke >= totalStrokes) return false;
      const dotIdx = currentCheckpoint > 0 ? currentCheckpoint - 1 : 0;
      return dist(p, checkpoints[currentStroke][dotIdx]) <= DRAW_RADIUS;
    }

    // ---- Pointer handling ----
    function pointsToPath(pts) {
      if (pts.length === 0) return '';
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x},${pts[i].y}`;
      return d;
    }

    function startStrokeIfNeeded() {
      if (activeInkPath) return;
      const color = STROKE_COLORS[currentStroke % STROKE_COLORS.length];
      activeInkPath = el('path', { d: '', stroke: color });
      inkGroup.appendChild(activeInkPath);
      activeInkPoints = [];
    }

    function endActiveInk() {
      activeInkPath = null;
      activeInkPoints = [];
    }

    function onDown(e) {
      if (currentStroke >= totalStrokes) return;
      // Wake the AudioContext on the first user gesture so sounds play without delay.
      if (APP.audio) APP.audio._wake();
      // Capture the pointer so pointermove/pointerup continue to fire on stageEl
      // even when the pointer drifts outside it. Without this, pointerleave fires
      // and ends the stroke prematurely when tracing near the stage edge on desktop.
      try { stageEl.setPointerCapture(e.pointerId); } catch (_) {}
      pointerActive = true;
      const p = clientToSvg(e.clientX, e.clientY);
      if (isNearGuide(p)) {
        // Seed the ink path at the touch point so the very first move draws
        // a line from here rather than jumping. Progress is NOT checked on
        // pointerdown for regular strokes — dragging must occur first.
        startStrokeIfNeeded();
        activeInkPoints.push(p);
        activeInkPath.setAttribute('d', pointsToPath(activeInkPoints));
        // Exception: dot strokes (i/j dot) have no length to drag along.
        // A tap on the dot is the correct gesture — complete it immediately.
        if (isDot(data.strokes[currentStroke].d)) {
          checkProgress(p);
        }
      }
      e.preventDefault();
    }

    function onMove(e) {
      if (!pointerActive) return;
      const p = clientToSvg(e.clientX, e.clientY);
      if (isNearGuide(p)) {
        // In range — draw ink and check progress.
        startStrokeIfNeeded();
        addPoint(p);
      } else {
        // Strayed too far from the guide dot — stop drawing.
        endActiveInk();
      }
      e.preventDefault();
    }

    function onUp() {
      pointerActive = false;
      endActiveInk();
    }

    function addPoint(p) {
      activeInkPoints.push(p);
      activeInkPath.setAttribute('d', pointsToPath(activeInkPoints));
      checkProgress(p);
    }

    function checkProgress(p) {
      if (currentStroke >= totalStrokes) return;
      const cps = checkpoints[currentStroke];
      // Advance through any consecutive checkpoints within tolerance (handles fast drags).
      let advanced = false;
      while (currentCheckpoint < cps.length && dist(p, cps[currentCheckpoint]) <= TOLERANCE) {
        currentCheckpoint++;
        advanced = true;
      }
      // Shrink the guide to reflect progress whenever a checkpoint is newly hit.
      if (advanced && currentCheckpoint < cps.length) {
        updateGuide();
      }
      if (currentCheckpoint >= cps.length) {
        // Stroke complete.
        markStrokeDone(currentStroke);
        currentStroke++;
        currentCheckpoint = 0;
        endActiveInk();
        updateGuide();
        if (currentStroke >= totalStrokes) {
          // All strokes done — play letter-complete sound then fire callback.
          if (APP.audio) APP.audio.letterDone();
          setTimeout(() => opts && opts.onComplete && opts.onComplete(), 350);
        } else {
          // Individual stroke done — short tick.
          if (APP.audio) APP.audio.strokeDone();
          // If the finger is still down AND near the new stroke's start dot,
          // seamlessly begin the next stroke so the child never has to re-tap
          // at intersection points. isNearGuide now checks the new stroke.
          if (pointerActive && isNearGuide(p)) {
            startStrokeIfNeeded();
            activeInkPoints.push(p);
            activeInkPath.setAttribute('d', pointsToPath(activeInkPoints));
          }
        }
      }
    }

    // Bind pointer events on the stage (covers svg).
    // pointerleave is intentionally omitted: setPointerCapture in onDown keeps
    // the pointer routed to stageEl for the full drag even outside its bounds,
    // so pointerleave would fire only after the finger is genuinely gone.
    // pointercancel covers unexpected interruptions (e.g. browser gesture takeover).
    stageEl.addEventListener('pointerdown', onDown);
    stageEl.addEventListener('pointermove', onMove);
    stageEl.addEventListener('pointerup', onUp);
    stageEl.addEventListener('pointercancel', onUp);

    return {
      destroy() {
        stageEl.removeEventListener('pointerdown', onDown);
        stageEl.removeEventListener('pointermove', onMove);
        stageEl.removeEventListener('pointerup', onUp);
        stageEl.removeEventListener('pointercancel', onUp);
        stageEl.innerHTML = '';
      }
    };
  }

  APP.tracer = { mount };
})(window.APP);

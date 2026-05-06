window.APP = window.APP || {};

// Renders a single letter and lets the child trace it stroke-by-stroke.
// API: APP.tracer.mount(stageEl, character, { onComplete })
//      returns { destroy() }
(function (APP) {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STROKE_WIDTH = 48;       // letter thickness in viewBox units
  const INK_WIDTH    = 44;       // user's drawing thickness
  const TOLERANCE    = 32;       // viewBox units — how close pointer must come to next checkpoint
  const DRAW_RADIUS  = 52;       // viewBox units — how close to the dot before ink is deposited
  const CHECKPOINTS_PER_STROKE = 18;

  // One colour per stroke — matches the letter-patterns review screen so
  // the child sees the same numbering system in both places.
  const STROKE_COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  function el(tag, attrs, children) {
    const e = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, attrs[k]);
    if (children) children.forEach(c => e.appendChild(c));
    return e;
  }

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

    // Mask: white letter shape on black bg → confines user ink to inside the letter.
    const defs = el('defs');
    const maskId = `mask-${Math.random().toString(36).slice(2, 9)}`;
    const mask = el('mask', { id: maskId, maskUnits: 'userSpaceOnUse' });
    const vbParts = data.viewBox.split(/\s+/).map(Number);
    mask.appendChild(el('rect', {
      x: vbParts[0], y: vbParts[1], width: vbParts[2], height: vbParts[3], fill: 'black'
    }));
    const maskShapes = el('g', {
      stroke: 'white', 'stroke-width': STROKE_WIDTH, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => maskShapes.appendChild(el('path', { d: s.d })));
    mask.appendChild(maskShapes);
    defs.appendChild(mask);
    svg.appendChild(defs);

    // Outline layer — drawn first so it sits behind everything else.
    // A slightly wider dark stroke creates a visible border around the letter
    // shape, giving it the defined printed/block-letter appearance from the
    // reference image rather than a plain filled blob. 'square' linecap means
    // stroke ends are cut flat rather than rounded, which reduces the "blobby"
    // appearance at stroke tips (e.g. top of A, ends of E's bars).
    const OUTLINE_WIDTH = STROKE_WIDTH + 24; // 12 extra viewBox units of border on each side
    const outlineGroup = el('g', {
      class: 'outline-group',
      stroke: '#001858', 'stroke-width': OUTLINE_WIDTH, fill: 'none',
      'stroke-linecap': 'square', 'stroke-linejoin': 'miter'
    });
    data.strokes.forEach(s => outlineGroup.appendChild(el('path', { d: s.d })));
    svg.appendChild(outlineGroup);

    // Ghost layer (full letter, pale) — sits on top of the outline, making the
    // letter interior visible as a light shape against the dark border.
    // Also uses 'square' linecap so ghost tips match the outline silhouette.
    const ghostGroup = el('g', {
      class: 'ghost-group',
      stroke: 'rgba(0,24,88,0.10)', 'stroke-width': STROKE_WIDTH, fill: 'none',
      'stroke-linecap': 'square', 'stroke-linejoin': 'miter'
    });
    data.strokes.forEach(s => ghostGroup.appendChild(el('path', { d: s.d })));
    svg.appendChild(ghostGroup);

    // Done strokes layer (rendered solid as user finishes them).
    // Matches ghost linecap so completed strokes fit cleanly inside the outline.
    const doneGroup = el('g', {
      class: 'done-group',
      stroke: '#001858', 'stroke-width': STROKE_WIDTH, fill: 'none',
      'stroke-linecap': 'square', 'stroke-linejoin': 'miter'
    });
    svg.appendChild(doneGroup);

    // User ink layer (masked to letter shape).
    // No group-level stroke colour — each path gets its own colour from STROKE_COLORS.
    const inkGroup = el('g', {
      class: 'ink-group',
      mask: `url(#${maskId})`,
      'stroke-width': INK_WIDTH, fill: 'none',
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
      const p = document.createElementNS(SVG_NS, 'path');
      p.setAttribute('d', s.d);
      // path must be in document tree for getTotalLength on some browsers — append to defs.
      defs.appendChild(p);
      const len = p.getTotalLength();
      const pts = [];
      for (let i = 0; i < CHECKPOINTS_PER_STROKE; i++) {
        const t = (i / (CHECKPOINTS_PER_STROKE - 1)) * len;
        const pt = p.getPointAtLength(t);
        pts.push({ x: pt.x, y: pt.y });
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
      const numLabel = document.createElementNS(SVG_NS, 'text');
      numLabel.setAttribute('x', lead.x);
      numLabel.setAttribute('y', lead.y);
      numLabel.setAttribute('text-anchor', 'middle');
      numLabel.setAttribute('dominant-baseline', 'central');
      numLabel.setAttribute('font-size', '15');
      numLabel.setAttribute('font-weight', '800');
      numLabel.setAttribute('fill', 'white');
      numLabel.setAttribute('pointer-events', 'none');
      numLabel.textContent = String(currentStroke + 1);
      guideGroup.appendChild(numLabel);
    }

    function markStrokeDone(strokeIdx) {
      doneGroup.appendChild(el('path', { d: data.strokes[strokeIdx].d }));
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
      pointerActive = true;
      const p = clientToSvg(e.clientX, e.clientY);
      if (isNearGuide(p)) {
        // Seed the ink path at the touch point so the very first move draws
        // a line from here rather than jumping. Progress is NOT checked on
        // pointerdown — dragging must occur before checkpoints advance.
        startStrokeIfNeeded();
        activeInkPoints.push(p);
        activeInkPath.setAttribute('d', pointsToPath(activeInkPoints));
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
    stageEl.addEventListener('pointerdown', onDown);
    stageEl.addEventListener('pointermove', onMove);
    stageEl.addEventListener('pointerup', onUp);
    stageEl.addEventListener('pointercancel', onUp);
    stageEl.addEventListener('pointerleave', onUp);

    return {
      destroy() {
        stageEl.removeEventListener('pointerdown', onDown);
        stageEl.removeEventListener('pointermove', onMove);
        stageEl.removeEventListener('pointerup', onUp);
        stageEl.removeEventListener('pointercancel', onUp);
        stageEl.removeEventListener('pointerleave', onUp);
        stageEl.innerHTML = '';
      }
    };
  }

  APP.tracer = { mount };
})(window.APP);

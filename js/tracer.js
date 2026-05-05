window.APP = window.APP || {};

// Renders a single letter and lets the child trace it stroke-by-stroke.
// API: APP.tracer.mount(stageEl, character, { onComplete })
//      returns { destroy() }
(function (APP) {
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const STROKE_WIDTH = 48;       // letter thickness in viewBox units
  const INK_WIDTH    = 44;       // user's drawing thickness
  const TOLERANCE    = 32;       // viewBox units — how close pointer must come to next checkpoint
  const CHECKPOINTS_PER_STROKE = 18;

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

    // Ghost layer (full letter, pale).
    const ghostGroup = el('g', {
      class: 'ghost-group',
      stroke: 'rgba(0,24,88,0.12)', 'stroke-width': STROKE_WIDTH, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    data.strokes.forEach(s => ghostGroup.appendChild(el('path', { d: s.d })));
    svg.appendChild(ghostGroup);

    // Done strokes layer (rendered solid as user finishes them).
    const doneGroup = el('g', {
      class: 'done-group',
      stroke: '#001858', 'stroke-width': STROKE_WIDTH, fill: 'none',
      'stroke-linecap': 'round', 'stroke-linejoin': 'round'
    });
    svg.appendChild(doneGroup);

    // User ink layer (masked to letter shape).
    const inkGroup = el('g', {
      class: 'ink-group',
      mask: `url(#${maskId})`,
      stroke: '#f582ae', 'stroke-width': INK_WIDTH, fill: 'none',
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
      const path = el('path', {
        class: 'guide',
        d,
        fill: 'none',
        stroke: '#ff8906',
        'stroke-width': 8,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-dasharray': '14 12'
      });
      guideGroup.appendChild(path);

      // Dot sits at the last completed position — the trailing edge of the ink.
      const lead = remaining[0];
      const dot = el('circle', {
        class: 'startDot',
        cx: lead.x, cy: lead.y, r: 10,
        fill: '#ff8906'
      });
      guideGroup.appendChild(dot);
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

    // ---- Pointer handling ----
    function pointsToPath(pts) {
      if (pts.length === 0) return '';
      let d = `M ${pts[0].x},${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) d += ` L ${pts[i].x},${pts[i].y}`;
      return d;
    }

    function startStrokeIfNeeded() {
      if (activeInkPath) return;
      activeInkPath = el('path', { d: '' });
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
      startStrokeIfNeeded();
      addPoint(clientToSvg(e.clientX, e.clientY));
      e.preventDefault();
    }

    function onMove(e) {
      if (!pointerActive) return;
      addPoint(clientToSvg(e.clientX, e.clientY));
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
          // If the finger is still down, seamlessly begin the next stroke from
          // the current position so the child never has to lift and re-tap.
          if (pointerActive) {
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

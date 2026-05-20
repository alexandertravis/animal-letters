window.APP = window.APP || {};

// Shared utilities used across tracer.js, letters.js, and the screen modules.
// Loaded after letterData.js (needs APP.GUIDE_CONFIG) and before tracer.js.
(function (APP) {

  // ── Shared letter metrics ──────────────────────────────────────────────────
  // Horizontal squeeze applied to every glyph so letters look less wide.
  // Both tracer.js and letters.js read from here — edit once, applies everywhere.
  APP.LETTER_METRICS = {
    X_SCALE_UP:  0.85,  // squeeze factor for uppercase
    X_SCALE_LOW: 0.80,  // squeeze factor for lowercase
    X_CENTER:    100,   // viewBox midpoint around which x-scale is applied
  };

  // ── Tracer visual & interaction config ────────────────────────────────────
  // All tunable constants for the letter-tracing mechanic in one place.
  // Edit here; tracer.js reads from this object at runtime.
  //
  // Stroke widths (viewBox units):
  //   Thicker = letter looks bolder but narrows enclosed gaps (e.g. eye of 'e',
  //   angles in 'k'). Reduce if strokes overlap or gaps close up.
  //
  // Tolerances (viewBox units):
  //   CHECKPOINT_TOLERANCE — how close the pointer must come to advance through
  //     mid-stroke waypoints. Larger = more forgiving, smaller = stricter.
  //   FINAL_TOLERANCE — applied only to the last checkpoint of each stroke.
  //     Kept tighter than CHECKPOINT_TOLERANCE so a stroke doesn't snap complete
  //     before the child has actually reached the end.
  //   DRAW_RADIUS — how close to the start-dot before ink begins depositing.
  APP.TRACER_CONFIG = {
    SW_UP:                36,   // uppercase outline stroke width
    SW_LOW:               24,   // lowercase outline stroke width
    INK_UP:               32,   // uppercase user-ink width
    INK_LOW:              20,   // lowercase user-ink width
    CHECKPOINT_TOLERANCE: 28,   // mid-stroke checkpoint proximity (viewBox units)
    FINAL_TOLERANCE:      14,   // last-checkpoint proximity — tighter to prevent early completion
    DRAW_RADIUS:          52,   // proximity to start-dot before ink is deposited
    // Guide-line offsets: each line shifts outward so the guide sits at the visual
    // edge of a stroke rather than its centreline.
    // top/middle shift UP, bottom/lower shift DOWN (see expand: ±1 in GUIDE_CONFIG).
    // Correct values are SW/2 per case — half the stroke width places the guide
    // exactly at the outer edge of the rendered stroke.
    // Set both to 0 to restore exact centreline positions.
    GUIDE_OFFSET_UP:      18,   // uppercase: SW_UP/2  = 36/2 = 18
    GUIDE_OFFSET_LOW:     12,   // lowercase: SW_LOW/2 = 24/2 = 12
    // Start-dot radius for the coloured guide dot on each stroke.
    // SW/2 places the dot edge exactly on the letter border (half inside, half outside).
    // Smaller = dot sits fully inside the letter; larger = dot overlaps the border more.
    // DOT_RING_PAD adds extra radius to the white halo behind the dot for legibility.
    DOT_RADIUS_UP:        12,   // uppercase dot radius  — reduce toward 0 to move fully inside letter
    DOT_RADIUS_LOW:       10,   // lowercase dot radius  — reduce toward 0 to move fully inside letter
    DOT_RING_PAD:          4,   // white ring = dot radius + this value
    // Extra upward shift (viewBox units) applied to accent marks that sit ABOVE the letter body:
    // acute, grave, circumflex, tilde, diaeresis, ring — NOT cedilla (which sits below).
    // Increase to pull accents further from thick letter strokes. 0 = use as authored.
    // NOTE: VB_UP_ACCENT in letterData.js must provide (ACCENT_OFFSET_ABOVE + SW_UP/2 + ~20)
    // units of headroom above y=0 or the shifted accents will be clipped by the viewBox.
    ACCENT_OFFSET_ABOVE:  24,
    // When true, uppercase letters use a tighter canvas (sized to just accommodate
    // Q's tail and cedilla below the baseline). This makes uppercase glyphs appear
    // larger on screen. Set false to restore the wider canvas with more bottom padding.
    TIGHT_UPPER_CANVAS:   true,
    // Accuracy score thresholds — average deviation of pointer from checkpoint
    // is subtracted from 100. Scores are clamped to [0, 100].
    SCORE_3STAR: 85,   // score >= this → 3 stars
    SCORE_2STAR: 60,   // score >= this → 2 stars (else 1 star)
  };

  // ── Stroke colours ─────────────────────────────────────────────────────────
  // One colour per stroke, cycled. Shared by tracer.js and letters.js so both
  // always use the same sequence — edit once here, applies everywhere.
  APP.STROKE_COLORS = ['#ff8906', '#f582ae', '#8bd3dd', '#5390d9', '#7c3aed'];

  // ── SVG element factory ────────────────────────────────────────────────────
  // Replaces local `el` in tracer.js and `svgEl` in letters.js.
  // Accepts attrs object and optional textContent string.
  const SVG_NS = 'http://www.w3.org/2000/svg';
  APP.svgEl = function (tag, attrs, textContent) {
    const e = document.createElementNS(SVG_NS, tag);
    if (attrs) for (const k in attrs) e.setAttribute(k, String(attrs[k]));
    if (textContent !== undefined) e.textContent = String(textContent);
    return e;
  };

  // ── Writing guidelines ─────────────────────────────────────────────────────
  // Appends horizontal guide lines to an SVG element. Call before other layers
  // so the lines sit at the bottom of the stacking order.
  // Reads APP.GUIDE_CONFIG — edit that object in letterData.js to restyle.
  // isUpper — pass true for uppercase letters, false/omitted for lowercase.
  // Selects GUIDE_OFFSET_UP or GUIDE_OFFSET_LOW so the guide sits at the stroke
  // edge regardless of case (uppercase strokes are wider than lowercase ones).
  APP.addGuidelines = function (svg, viewBox, isUpper) {
    const gc = APP.GUIDE_CONFIG;
    if (!gc) return;
    const vb = viewBox.split(/\s+/).map(Number);
    const x1 = vb[0], x2 = vb[0] + vb[2];
    const cfg = APP.TRACER_CONFIG;
    const offset = cfg
      ? (isUpper ? (cfg.GUIDE_OFFSET_UP || 0) : (cfg.GUIDE_OFFSET_LOW || 0))
      : 0;
    const g = APP.svgEl('g', { class: 'writing-guidelines', 'pointer-events': 'none' });
    Object.values(gc.lines).forEach(line => {
      if (line.hidden) return;
      // Apply outward shift: top/middle lines move up (expand:-1), bottom/lower move down (expand:+1).
      const y = line.y + (line.expand || 0) * offset;
      // Use nullish coalescing so an explicit 0 width or '' color is not
      // accidentally overridden by the default (unlike the || fallback).
      const color   = line.color   ?? gc.defaults.color;
      const opacity = line.opacity ?? gc.defaults.opacity;
      const width   = line.width   ?? gc.defaults.width;
      const attrs   = { x1, y1: y, x2, y2: y, stroke: color, 'stroke-width': width, opacity };
      if (line.dash) attrs['stroke-dasharray'] = line.dash;
      g.appendChild(APP.svgEl('line', attrs));
    });
    svg.appendChild(g);
  };

  // ── Locale-independent animal ID ──────────────────────────────────────────
  // Derives a stable ID from the cartoon image path so found status is shared
  // across languages — the same creature has the same ID regardless of locale.
  // e.g. { images: { cartoon: 'assets/images/cartoon/dog.svg' } } → 'dog'
  //      GATO and DOG both resolve to 'dog' since they share the same SVG.
  APP.animalId = function (animal) {
    return animal.images.cartoon.split('/').pop().replace('.svg', '');
  };

  // ── Unicode-safe case detection ────────────────────────────────────────────
  // /[A-Z]/ misses accented uppercase letters (Á, Ã, É, Ç …).
  // This helper works for any Unicode character without a hardcoded list.
  // Digits 0-9 are treated as "upper" — they use the same canvas size, stroke
  // widths, and guide offsets as uppercase letters.
  APP.isUpperLetter = function (ch) {
    if (ch.length === 1 && ch >= '0' && ch <= '9') return true;
    return ch.length === 1 && ch.toUpperCase() === ch && ch.toLowerCase() !== ch;
  };

  // ── Dot stroke helpers ─────────────────────────────────────────────────────
  // A "dot" stroke is M x,y L x,y where both coordinates are identical.
  // Used for i/j dots — zero-length paths need special rendering to avoid
  // elliptical distortion from the non-uniform letter transform.

  APP.isDot = function (d) {
    const m = d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)\s+L\s*([\d.-]+)[,\s]+([\d.-]+)/);
    if (!m) return false;
    const dx = parseFloat(m[1]) - parseFloat(m[3]);
    const dy = parseFloat(m[2]) - parseFloat(m[4]);
    // Treat any path shorter than 4 viewBox units as a dot. This handles both
    // exact zero-length paths (M x,y L x,y) and near-zero paths from the authoring
    // tool, which outputs M x,y L x,y+1 rather than identical coordinates.
    return Math.sqrt(dx * dx + dy * dy) < 4;
  };

  // Returns the display-space centre of a dot stroke after applying the
  // letter's affine transform: new_x = xScale·x + xOffset, new_y = tA·y + tB.
  APP.dotTransformPos = function (d, xScale, xOffset, tA, tB) {
    const m = d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)/);
    if (!m) return null;
    return { x: xScale * parseFloat(m[1]) + xOffset, y: tA * parseFloat(m[2]) + tB };
  };

  // ── Case conversion ────────────────────────────────────────────────────────
  // Converts an animal name string to the display case from current settings.
  // Used by game.js, complete.js, and anywhere else a name needs case-aware display.
  APP.caseOf = function (name) {
    const lc = APP.state.settings.letterCase;
    if (lc === 'lower')  return name.toLowerCase();
    if (lc === 'proper') return name[0].toUpperCase() + name.slice(1).toLowerCase();
    return name.toUpperCase(); // default: 'upper'
  };

  // ── Confetti ───────────────────────────────────────────────────────────────
  // Launches a canvas confetti animation. Returns a cleanup function that
  // cancels the animation early (useful when the user navigates away).
  // Calling this multiple times intentionally stacks independent animations —
  // each canvas cleans itself up after its duration expires.
  const CONFETTI_COLORS = ['#ff8906','#f582ae','#8bd3dd','#5390d9','#7c3aed','#e74c3c','#2ecc71','#f1c40f'];
  APP.launchConfetti = function (opts) {
    const colors   = (opts && opts.colors)   || CONFETTI_COLORS;
    const count    = (opts && opts.count)    || 120;
    const duration = (opts && opts.duration) || 3500;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      vx: (Math.random() - 0.5) * 5,
      vy: 2.5 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      color: colors[Math.floor(Math.random() * colors.length)],
      w: 7 + Math.random() * 9,
      h: 4 + Math.random() * 6,
      shape: Math.random() > 0.35 ? 'rect' : 'circle',
      opacity: 1,
    }));
    let startTs = null, rafId;
    function drawFrame(ts) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = 0;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.09; p.vx *= 0.993; p.rotation += p.rotSpeed;
        if (elapsed > duration - 1000) p.opacity = Math.max(0, (duration - elapsed) / 1000);
        if (p.y < canvas.height + 50) alive++;
        ctx.save(); ctx.globalAlpha = p.opacity; ctx.translate(p.x, p.y); ctx.rotate(p.rotation); ctx.fillStyle = p.color;
        if (p.shape === 'circle') { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2); ctx.fill(); }
        else { ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); }
        ctx.restore();
      });
      if (elapsed < duration && alive > 0) { rafId = requestAnimationFrame(drawFrame); } else { canvas.remove(); }
    }
    rafId = requestAnimationFrame(drawFrame);
    return () => { cancelAnimationFrame(rafId); canvas.remove(); };
  };

})(window.APP);

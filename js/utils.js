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
  APP.addGuidelines = function (svg, viewBox) {
    const gc = APP.GUIDE_CONFIG;
    if (!gc) return;
    const vb = viewBox.split(/\s+/).map(Number);
    const x1 = vb[0], x2 = vb[0] + vb[2];
    const g = APP.svgEl('g', { class: 'writing-guidelines', 'pointer-events': 'none' });
    Object.values(gc.lines).forEach(line => {
      if (line.hidden) return;
      // Use nullish coalescing so an explicit 0 width or '' color is not
      // accidentally overridden by the default (unlike the || fallback).
      const color   = line.color   ?? gc.defaults.color;
      const opacity = line.opacity ?? gc.defaults.opacity;
      const width   = line.width   ?? gc.defaults.width;
      const attrs   = { x1, y1: line.y, x2, y2: line.y, stroke: color, 'stroke-width': width, opacity };
      if (line.dash) attrs['stroke-dasharray'] = line.dash;
      g.appendChild(APP.svgEl('line', attrs));
    });
    svg.appendChild(g);
  };

  // ── Dot stroke helpers ─────────────────────────────────────────────────────
  // A "dot" stroke is M x,y L x,y where both coordinates are identical.
  // Used for i/j dots — zero-length paths need special rendering to avoid
  // elliptical distortion from the non-uniform letter transform.

  APP.isDot = function (d) {
    const m = d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)\s+L\s*([\d.-]+)[,\s]+([\d.-]+)/);
    return !!(m && parseFloat(m[1]) === parseFloat(m[3]) && parseFloat(m[2]) === parseFloat(m[4]));
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

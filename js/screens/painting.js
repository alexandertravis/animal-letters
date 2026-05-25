window.APP = window.APP || {};

// Free-paint screen: a finger-painting canvas with brush / eraser / fill-bucket /
// emoji-sticker tools, preset colours, three brush sizes, and undo / clear.
// Session-only (nothing is persisted). Two stacked canvases: the bottom one holds
// all paint pixels; the top overlay is unused in this MVP but reserved for Phase 2
// colour-in templates.
(function (APP) {
  const COLORS = [
    '#000000', '#e84393', '#e74c3c', '#f39c12',
    '#f6e58d', '#27ae60', '#2980d9', '#8e44ad',
  ];
  const SIZES = [8, 16, 30];
  const STICKERS = ['😀', '🐶', '🐱', '🌟', '❤️', '🌈', '🚗', '🦄', '🌸', '🍎'];
  const MAX_DPR = 2;
  const HISTORY_CAP = 6;
  const FILL_TOLERANCE = 40; // per-channel; squared-sum threshold below

  // Module-scoped so we can detach the resize listener from a previous mount.
  // main.js has no destroy hook, so we clean up at the top of the next render.
  let resizeHandler = null;

  function render(root, ctx) {
    if (resizeHandler) { window.removeEventListener('resize', resizeHandler); resizeHandler = null; }

    root.innerHTML = '';

    const paint = {
      tool: 'brush',
      color: COLORS[1],
      size: SIZES[1],
      sticker: STICKERS[0],
      history: [],
      dpr: 1,
      drawing: false,
      last: null,
    };

    const wrap = document.createElement('div');
    wrap.className = 'painting';
    wrap.innerHTML = `
      <div class="painting-topbar">
        <button class="btn icon ghost" data-act="back" aria-label="Back">${APP.ICONS.back}</button>
        <h2>${APP.t('painting.title')}</h2>
        <div class="painting-topbar-actions">
          <button class="btn icon ghost" data-act="undo" aria-label="${APP.t('painting.undo')}">${APP.ICONS.undo}</button>
          <button class="btn icon ghost" data-act="clear" aria-label="${APP.t('painting.clear')}">${APP.ICONS.trash}</button>
        </div>
      </div>
      <div class="painting-stage">
        <canvas class="paint-layer"></canvas>
        <canvas class="overlay-layer"></canvas>
      </div>
      <div class="painting-toolbar">
        <div class="tool-group tools">
          <button class="tool-btn" data-tool="brush" aria-label="${APP.t('painting.brush')}">${APP.ICONS.brush}</button>
          <button class="tool-btn" data-tool="eraser" aria-label="${APP.t('painting.eraser')}">${APP.ICONS.eraser}</button>
          <button class="tool-btn" data-tool="fill" aria-label="${APP.t('painting.fill')}">${APP.ICONS.fill}</button>
          <button class="tool-btn" data-tool="sticker" aria-label="${APP.t('painting.sticker')}">${APP.ICONS.sticker}</button>
        </div>
        <div class="tool-group swatches">
          ${COLORS.map(c => `<button class="swatch" data-color="${c}" style="background:${c}" aria-label="colour ${c}"></button>`).join('')}
        </div>
        <div class="tool-group sizes">
          ${SIZES.map(s => `<button class="size-btn" data-size="${s}" aria-label="size ${s}"><span style="width:${s}px;height:${s}px"></span></button>`).join('')}
        </div>
        <div class="tool-group stickers">
          ${STICKERS.map(e => `<button class="sticker-btn" data-sticker="${e}">${e}</button>`).join('')}
        </div>
      </div>
    `;
    root.appendChild(wrap);

    const stage = wrap.querySelector('.painting-stage');
    const canvas = wrap.querySelector('.paint-layer');
    const cx = canvas.getContext('2d');

    // ---- Sizing (devicePixelRatio aware) -----------------------------------
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cssW = stage.clientWidth, cssH = stage.clientHeight;
      if (!cssW || !cssH) return;
      // Preserve current pixels across a resize.
      let snapshot = null;
      if (canvas.width && canvas.height) {
        try { snapshot = cx.getImageData(0, 0, canvas.width, canvas.height); } catch (_) {}
      }
      paint.dpr = dpr;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      if (snapshot) {
        try { cx.putImageData(snapshot, 0, 0); } catch (_) {}
      }
    }

    resizeHandler = function () { resize(); };
    window.addEventListener('resize', resizeHandler);
    // Stage is already laid out at this point (clientWidth/Height are non-zero
    // immediately after appendChild in a flex container). Call resize() directly.
    resize();

    // ---- History ------------------------------------------------------------
    function pushHistory() {
      if (!canvas.width || !canvas.height) return;
      try {
        paint.history.push(cx.getImageData(0, 0, canvas.width, canvas.height));
        if (paint.history.length > HISTORY_CAP) paint.history.shift();
      } catch (_) {}
    }
    function undo() {
      const img = paint.history.pop();
      if (!img) return;
      cx.save();
      cx.setTransform(1, 0, 0, 1, 0, 0); // putImageData ignores transform; reset for safety
      cx.putImageData(img, 0, 0);
      cx.restore();
    }
    function clearAll() {
      pushHistory();
      cx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // ---- Coordinate helpers -------------------------------------------------
    function cssPoint(e) {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function devicePoint(e) {
      const r = canvas.getBoundingClientRect();
      return {
        x: Math.floor((e.clientX - r.left) * paint.dpr),
        y: Math.floor((e.clientY - r.top) * paint.dpr),
      };
    }

    // ---- Drawing ------------------------------------------------------------
    function strokeSegment(from, to) {
      cx.globalCompositeOperation = paint.tool === 'eraser' ? 'destination-out' : 'source-over';
      cx.strokeStyle = paint.color;
      cx.lineWidth = paint.size;
      cx.beginPath();
      cx.moveTo(from.x, from.y);
      cx.lineTo(to.x, to.y);
      cx.stroke();
      cx.globalCompositeOperation = 'source-over';
    }
    function dab(p) {
      // A single tap should leave a dot.
      cx.globalCompositeOperation = paint.tool === 'eraser' ? 'destination-out' : 'source-over';
      cx.fillStyle = paint.color;
      cx.beginPath();
      cx.arc(p.x, p.y, paint.size / 2, 0, Math.PI * 2);
      cx.fill();
      cx.globalCompositeOperation = 'source-over';
    }
    function stampSticker(p) {
      cx.globalCompositeOperation = 'source-over';
      cx.font = (paint.size * 4) + 'px serif';
      cx.textAlign = 'center';
      cx.textBaseline = 'middle';
      cx.fillText(paint.sticker, p.x, p.y);
    }

    // ---- Flood fill (scanline) ---------------------------------------------
    function hexToRgba(hex) {
      const h = hex.replace('#', '');
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255];
    }
    function floodFill(sx, sy, fill) {
      const W = canvas.width, H = canvas.height;
      if (sx < 0 || sy < 0 || sx >= W || sy >= H) return;
      const img = cx.getImageData(0, 0, W, H), d = img.data;
      const idx = (x, y) => (y * W + x) * 4;
      const s = idx(sx, sy);
      const target = [d[s], d[s + 1], d[s + 2], d[s + 3]];
      const tol2 = FILL_TOLERANCE * FILL_TOLERANCE * 4;
      const close = (i, ref) => {
        const dr = d[i] - ref[0], dg = d[i + 1] - ref[1], db = d[i + 2] - ref[2], da = d[i + 3] - ref[3];
        return dr * dr + dg * dg + db * db + da * da <= tol2;
      };
      if (close(idx(sx, sy), fill)) return; // already this colour
      const seen = new Uint8Array(W * H);
      const stack = [[sx, sy]];
      while (stack.length) {
        const [x, y] = stack.pop();
        let xL = x;
        while (xL >= 0 && !seen[y * W + xL] && close(idx(xL, y), target)) xL--;
        xL++;
        let up = false, down = false;
        for (let xi = xL; xi < W && !seen[y * W + xi] && close(idx(xi, y), target); xi++) {
          const p = idx(xi, y);
          d[p] = fill[0]; d[p + 1] = fill[1]; d[p + 2] = fill[2]; d[p + 3] = fill[3];
          seen[y * W + xi] = 1;
          if (y > 0 && close(idx(xi, y - 1), target)) { if (!up) { stack.push([xi, y - 1]); up = true; } }
          else up = false;
          if (y < H - 1 && close(idx(xi, y + 1), target)) { if (!down) { stack.push([xi, y + 1]); down = true; } }
          else down = false;
        }
      }
      cx.save();
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.putImageData(img, 0, 0);
      cx.restore();
    }

    // ---- Pointer handling ---------------------------------------------------
    function onDown(e) {
      if (APP.audio) APP.audio._wake();
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();

      if (paint.tool === 'fill') {
        pushHistory();
        const dp = devicePoint(e);
        floodFill(dp.x, dp.y, hexToRgba(paint.color));
        if (APP.audio) APP.audio.strokeDone();
        return;
      }
      if (paint.tool === 'sticker') {
        pushHistory();
        stampSticker(cssPoint(e));
        if (APP.audio) APP.audio.strokeDone();
        return;
      }
      // brush / eraser
      pushHistory();
      paint.drawing = true;
      const p = cssPoint(e);
      paint.last = p;
      dab(p);
    }
    function onMove(e) {
      if (!paint.drawing) return;
      e.preventDefault();
      const p = cssPoint(e);
      strokeSegment(paint.last, p);
      paint.last = p;
    }
    function onUp(e) {
      if (!paint.drawing) return;
      paint.drawing = false;
      paint.last = null;
      if (APP.audio) APP.audio.strokeDone();
    }

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);

    // ---- UI wiring ----------------------------------------------------------
    function setActive(selector, attr, value) {
      wrap.querySelectorAll(selector).forEach(b => {
        b.classList.toggle('active', b.getAttribute(attr) === String(value));
      });
    }
    wrap.querySelectorAll('[data-tool]').forEach(b => b.addEventListener('click', () => {
      paint.tool = b.getAttribute('data-tool');
      setActive('[data-tool]', 'data-tool', paint.tool);
    }));
    wrap.querySelectorAll('[data-color]').forEach(b => b.addEventListener('click', () => {
      paint.color = b.getAttribute('data-color');
      if (paint.tool === 'eraser' || paint.tool === 'sticker') {
        paint.tool = 'brush';
        setActive('[data-tool]', 'data-tool', 'brush');
      }
      setActive('[data-color]', 'data-color', paint.color);
    }));
    wrap.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => {
      paint.size = Number(b.getAttribute('data-size'));
      setActive('[data-size]', 'data-size', paint.size);
    }));
    wrap.querySelectorAll('[data-sticker]').forEach(b => b.addEventListener('click', () => {
      paint.sticker = b.getAttribute('data-sticker');
      paint.tool = 'sticker';
      setActive('[data-tool]', 'data-tool', 'sticker');
      setActive('[data-sticker]', 'data-sticker', paint.sticker);
    }));

    wrap.querySelector('[data-act=undo]').addEventListener('click', undo);
    wrap.querySelector('[data-act=clear]').addEventListener('click', clearAll);
    wrap.querySelector('[data-act=back]').addEventListener('click', () => {
      if (resizeHandler) { window.removeEventListener('resize', resizeHandler); resizeHandler = null; }
      const prev = APP.state.previousScreen;
      ctx.go(prev && prev !== 'painting' ? prev : 'landing');
    });

    // Initial active states.
    setActive('[data-tool]', 'data-tool', paint.tool);
    setActive('[data-color]', 'data-color', paint.color);
    setActive('[data-size]', 'data-size', paint.size);
    setActive('[data-sticker]', 'data-sticker', paint.sticker);
  }

  APP.screens = APP.screens || {};
  APP.screens.painting = { render };
})(window.APP);

window.APP = window.APP || {};

(function (APP) {
  const COLORS = [
    '#000000', '#e84393', '#e74c3c', '#f39c12',
    '#f6e58d', '#27ae60', '#2980d9', '#8e44ad',
  ];
  const SIZES = [8, 16, 30];
  const STICKERS = ['😀', '🐶', '🐱', '🌟', '❤️', '🌈', '🚗', '🦄', '🌸', '🍎'];
  const MAX_DPR = 2;
  const HISTORY_CAP = 6;
  const FILL_TOLERANCE = 40;

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
      mode: 'free',       // 'free' | 'template'
      template: null,     // selected APP.PAINTING_TEMPLATES entry
      pbnDone: new Set(), // region numbers completed this session
    };

    const wrap = document.createElement('div');
    wrap.className = 'painting';
    wrap.innerHTML = `
      <div class="painting-topbar">
        <button class="btn icon ghost" data-act="back" aria-label="Back">${APP.ICONS.back}</button>
        <div class="paint-mode-toggle">
          <button class="paint-mode-btn active" data-mode="free">${APP.t('painting.draw')}</button>
          <button class="paint-mode-btn" data-mode="template">${APP.t('painting.colourIn')}</button>
        </div>
        <div class="painting-topbar-actions">
          <button class="btn icon ghost" data-act="undo" aria-label="${APP.t('painting.undo')}">${APP.ICONS.undo}</button>
          <button class="btn icon ghost" data-act="clear" aria-label="${APP.t('painting.clear')}">${APP.ICONS.trash}</button>
        </div>
      </div>
      <div class="paint-template-picker hidden">
        <p class="pick-label">${APP.t('painting.pickTemplate')}</p>
        <div class="template-grid">
          ${(APP.PAINTING_TEMPLATES || []).map(tpl => `
            <button class="template-thumb" data-tpl="${tpl.id}" aria-label="${tpl.label}">
              <canvas width="80" height="80"></canvas>
              <span>${tpl.label}</span>
            </button>
          `).join('')}
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

    const picker = wrap.querySelector('.paint-template-picker');
    const stage = wrap.querySelector('.painting-stage');
    const canvas = wrap.querySelector('.paint-layer');
    const overlay = wrap.querySelector('.overlay-layer');
    const cx = canvas.getContext('2d');
    const ox = overlay.getContext('2d');

    // ---- Sizing ---------------------------------------------------------------
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const cssW = stage.clientWidth, cssH = stage.clientHeight;
      if (!cssW || !cssH) return;
      let snapshot = null;
      if (canvas.width && canvas.height) {
        try { snapshot = cx.getImageData(0, 0, canvas.width, canvas.height); } catch (_) {}
      }
      paint.dpr = dpr;
      [canvas, overlay].forEach(c => {
        c.style.width = cssW + 'px';
        c.style.height = cssH + 'px';
        c.width = Math.round(cssW * dpr);
        c.height = Math.round(cssH * dpr);
      });
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      ox.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (snapshot) {
        try { cx.putImageData(snapshot, 0, 0); } catch (_) {}
      }
      if (paint.mode === 'template' && paint.template) {
        drawTemplate(paint.template);
      }
    }

    resizeHandler = function () { resize(); };
    window.addEventListener('resize', resizeHandler);
    resize();

    // ---- Template rendering ---------------------------------------------------
    function templateTransform(tpl) {
      const cssW = stage.clientWidth, cssH = stage.clientHeight;
      const scale = Math.min(cssW, cssH) / 400 * 0.85;
      const tx = (cssW - 400 * scale) / 2;
      const ty = (cssH - 400 * scale) / 2;
      return { scale, tx, ty };
    }

    function drawOutlineTo(context, tpl, scl, tx, ty, lineWidth) {
      context.save();
      context.setTransform(scl * paint.dpr, 0, 0, scl * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      context.strokeStyle = '#1a1a1a';
      context.lineWidth = lineWidth || tpl.lineWidth || 6;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      tpl.outline.forEach(d => {
        const p = new Path2D(d);
        context.stroke(p);
      });
      context.restore();
    }

    function drawTemplate(tpl) {
      const { scale, tx, ty } = templateTransform(tpl);

      // Clear overlay and redraw outline crisply
      ox.clearRect(0, 0, overlay.width, overlay.height);
      drawOutlineTo(ox, tpl, scale, tx, ty);

      // Draw opaque barrier into paint layer (without clearing user's paint)
      cx.save();
      cx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      cx.strokeStyle = '#1a1a1a';
      cx.lineWidth = tpl.lineWidth || 6;
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      tpl.outline.forEach(d => {
        const p = new Path2D(d);
        cx.stroke(p);
      });
      cx.restore();

      // If PBN template, render region numbers on overlay
      if (tpl.regions && tpl.regions.length) {
        renderPbnNumbers(tpl, scale, tx, ty);
      }
    }

    function renderPbnNumbers(tpl, scale, tx, ty) {
      ox.save();
      ox.font = 'bold 18px sans-serif';
      ox.textAlign = 'center';
      ox.textBaseline = 'middle';
      tpl.regions.forEach(r => {
        // Approximate centroid: sample the path bounding box via a scratch canvas
        const centroid = getPathCentroid(r.d, scale, tx, ty);
        ox.fillStyle = '#ffffff';
        ox.fillText(String(r.number), centroid.x + 1, centroid.y + 1);
        ox.fillStyle = '#1a1a1a';
        ox.fillText(String(r.number), centroid.x, centroid.y);
      });
      ox.restore();
    }

    function getPathCentroid(d, scale, tx, ty) {
      // Parse first M command to get a reasonable anchor point
      const m = d.match(/M\s*([\d.]+)[,\s]+([\d.]+)/);
      if (!m) return { x: stage.clientWidth / 2, y: stage.clientHeight / 2 };
      // Use midpoint between first M and first subsequent coordinate pair
      const coords = [...d.matchAll(/[\d.]+[,\s]+[\d.]+/g)].map(c => {
        const parts = c[0].trim().split(/[,\s]+/);
        return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
      });
      if (!coords.length) return { x: stage.clientWidth / 2, y: stage.clientHeight / 2 };
      const sumX = coords.reduce((s, p) => s + p.x, 0);
      const sumY = coords.reduce((s, p) => s + p.y, 0);
      const avgX = sumX / coords.length;
      const avgY = sumY / coords.length;
      return { x: avgX * scale + tx, y: avgY * scale + ty };
    }

    function drawBarrier(tpl) {
      const { scale, tx, ty } = templateTransform(tpl);
      cx.save();
      cx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      cx.strokeStyle = '#1a1a1a';
      cx.lineWidth = tpl.lineWidth || 6;
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      tpl.outline.forEach(d => cx.stroke(new Path2D(d)));
      cx.restore();
    }

    // ---- Thumbnail rendering --------------------------------------------------
    function drawThumbnails() {
      const thumbs = wrap.querySelectorAll('.template-thumb');
      thumbs.forEach(btn => {
        const id = btn.getAttribute('data-tpl');
        const tpl = (APP.PAINTING_TEMPLATES || []).find(t => t.id === id);
        if (!tpl) return;
        const tc = btn.querySelector('canvas');
        const tcx = tc.getContext('2d');
        const size = 80;
        const scl = size / 400 * 0.8;
        const ttx = (size - 400 * scl) / 2;
        const tty = (size - 400 * scl) / 2;
        tcx.clearRect(0, 0, size, size);
        tcx.save();
        tcx.setTransform(scl, 0, 0, scl, ttx, tty);
        tcx.strokeStyle = '#1a1a1a';
        tcx.lineWidth = tpl.lineWidth || 6;
        tcx.lineCap = 'round';
        tcx.lineJoin = 'round';
        tpl.outline.forEach(d => tcx.stroke(new Path2D(d)));
        tcx.restore();
      });
    }

    // ---- History ---------------------------------------------------------------
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
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.putImageData(img, 0, 0);
      cx.restore();
      // Re-draw overlay in template mode
      if (paint.mode === 'template' && paint.template) {
        const { scale, tx, ty } = templateTransform(paint.template);
        ox.clearRect(0, 0, overlay.width, overlay.height);
        drawOutlineTo(ox, paint.template, scale, tx, ty);
        if (paint.template.regions && paint.template.regions.length) {
          renderPbnNumbers(paint.template, scale, tx, ty);
        }
      }
    }
    function clearAll() {
      pushHistory();
      cx.clearRect(0, 0, canvas.width, canvas.height);
      if (paint.mode === 'template' && paint.template) {
        paint.pbnDone.clear();
        drawBarrier(paint.template);
        const { scale, tx, ty } = templateTransform(paint.template);
        ox.clearRect(0, 0, overlay.width, overlay.height);
        drawOutlineTo(ox, paint.template, scale, tx, ty);
        if (paint.template.regions && paint.template.regions.length) {
          renderPbnNumbers(paint.template, scale, tx, ty);
        }
      }
    }

    // ---- Coordinate helpers ---------------------------------------------------
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

    // ---- Drawing --------------------------------------------------------------
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

    // ---- Flood fill -----------------------------------------------------------
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
      if (close(idx(sx, sy), fill)) return;
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
          if (y > 0 && close(idx(xi, y - 1), target)) { if (!up) { stack.push([xi, y - 1]); up = true; } } else up = false;
          if (y < H - 1 && close(idx(xi, y + 1), target)) { if (!down) { stack.push([xi, y + 1]); down = true; } } else down = false;
        }
      }
      cx.save();
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.putImageData(img, 0, 0);
      cx.restore();
    }

    // ---- PBN hit detection ---------------------------------------------------
    function checkPbnHit(cssX, cssY) {
      const tpl = paint.template;
      if (!tpl || !tpl.regions || !tpl.regions.length) return;
      const { scale, tx, ty } = templateTransform(tpl);
      // Convert CSS tap point to template coordinates
      const templateX = (cssX - tx) / scale;
      const templateY = (cssY - ty) / scale;

      // Use a scratch canvas to test isPointInPath without disturbing the real contexts
      const scratch = document.createElement('canvas');
      scratch.width = 400;
      scratch.height = 400;
      const scx = scratch.getContext('2d');

      for (const region of tpl.regions) {
        if (paint.pbnDone.has(region.number)) continue;
        const path = new Path2D(region.d);
        if (scx.isPointInPath(path, templateX, templateY)) {
          const targetRgba = hexToRgba(region.targetColor);
          const fillRgba = hexToRgba(paint.color);
          const match = targetRgba[0] === fillRgba[0] &&
                        targetRgba[1] === fillRgba[1] &&
                        targetRgba[2] === fillRgba[2];
          if (match) {
            paint.pbnDone.add(region.number);
            if (APP.audio) APP.audio.strokeDone();
            // Check full completion
            const allDone = tpl.regions.every(r => paint.pbnDone.has(r.number));
            if (allDone) {
              setTimeout(() => {
                if (APP.launchConfetti) APP.launchConfetti();
                if (APP.audio) APP.audio.wordDone();
              }, 200);
            }
          } else {
            // Wrong colour — shake the stage briefly
            stage.classList.add('pbn-shake');
            setTimeout(() => stage.classList.remove('pbn-shake'), 400);
          }
          return;
        }
      }
    }

    // ---- Pointer handling -----------------------------------------------------
    function onDown(e) {
      if (APP.audio) APP.audio._wake();
      try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();

      if (paint.tool === 'fill') {
        pushHistory();
        const dp = devicePoint(e);
        floodFill(dp.x, dp.y, hexToRgba(paint.color));
        if (APP.audio) APP.audio.strokeDone();
        // PBN check after fill
        if (paint.mode === 'template' && paint.template) {
          const cp = cssPoint(e);
          checkPbnHit(cp.x, cp.y);
        }
        return;
      }
      if (paint.tool === 'sticker') {
        pushHistory();
        stampSticker(cssPoint(e));
        if (APP.audio) APP.audio.strokeDone();
        return;
      }
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

    // ---- Mode toggle ----------------------------------------------------------
    wrap.querySelectorAll('.paint-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        if (mode === paint.mode) return;
        paint.mode = mode;
        wrap.querySelectorAll('.paint-mode-btn').forEach(b =>
          b.classList.toggle('active', b.getAttribute('data-mode') === mode));
        if (mode === 'template') {
          picker.classList.remove('hidden');
          drawThumbnails();
          // Don't auto-select; wait for user to pick
        } else {
          picker.classList.add('hidden');
          paint.template = null;
          paint.pbnDone.clear();
          // Clear overlay
          ox.clearRect(0, 0, overlay.width, overlay.height);
          // Switch back to brush
          paint.tool = 'brush';
          setActive('[data-tool]', 'data-tool', 'brush');
        }
      });
    });

    // ---- Template selection ---------------------------------------------------
    wrap.querySelectorAll('.template-thumb').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-tpl');
        const tpl = (APP.PAINTING_TEMPLATES || []).find(t => t.id === id);
        if (!tpl) return;
        wrap.querySelectorAll('.template-thumb').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        paint.template = tpl;
        paint.pbnDone.clear();
        // Clear both canvases
        cx.clearRect(0, 0, canvas.width, canvas.height);
        ox.clearRect(0, 0, overlay.width, overlay.height);
        drawTemplate(tpl);
        // Default to fill for colour-in
        paint.tool = 'fill';
        setActive('[data-tool]', 'data-tool', 'fill');
      });
    });

    // ---- UI wiring -----------------------------------------------------------
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

    setActive('[data-tool]', 'data-tool', paint.tool);
    setActive('[data-color]', 'data-color', paint.color);
    setActive('[data-size]', 'data-size', paint.size);
    setActive('[data-sticker]', 'data-sticker', paint.sticker);
  }

  APP.screens = APP.screens || {};
  APP.screens.painting = { render };
})(window.APP);

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
  const imageCache = {};

  function loadImg(src) {
    return new Promise((resolve, reject) => {
      if (imageCache[src]) { resolve(imageCache[src]); return; }
      const img = new Image();
      // No crossOrigin: same-origin on Vercel never taints canvas; on file://
      // crossOrigin causes image load to fail entirely (CORS with no server).
      img.onload = () => { imageCache[src] = img; resolve(img); };
      img.onerror = reject;
      img.src = src;
    });
  }

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
      mode: 'free',
      template: null,
      pbnDone: new Set(),
      wallPixels: null,   // Uint8Array — barrier pixel positions; checked by floodFill
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
        redrawOverlay(paint.template);
        // Wall map is indexed by device pixel — rebuild whenever canvas dimensions change
        if (paint.template.type === 'image') {
          buildWallMapFromCanvas();
        } else {
          buildWallMap(paint.template);
        }
      }
    }

    resizeHandler = function () { resize(); };
    window.addEventListener('resize', resizeHandler);
    resize();

    // ---- Wall map (flood-fill barrier) ----------------------------------------
    // buildWallMap renders the barrier strokes to an offscreen canvas and marks
    // every covered pixel in a flat Uint8Array. floodFill treats marked pixels as
    // hard walls regardless of their colour, so tapping on an outline never
    // floods it, and black paint (#000000) can't leak through near-black barriers.
    function buildWallMap(tpl) {
      const W = canvas.width, H = canvas.height;
      paint.wallPixels = new Uint8Array(W * H);
      if (!tpl || tpl.type === 'image') return; // image walls built separately
      const tmp = document.createElement('canvas');
      tmp.width = W; tmp.height = H;
      const tcx = tmp.getContext('2d');
      const { scale, tx, ty } = templateTransform(tpl);
      tcx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      tcx.strokeStyle = '#000000';
      tcx.lineWidth = (tpl.lineWidth || 6) * 2;
      tcx.lineCap = 'round';
      tcx.lineJoin = 'round';
      tpl.outline.forEach(d => tcx.stroke(new Path2D(d)));
      const data = tcx.getImageData(0, 0, W, H).data;
      for (let i = 0, len = W * H; i < len; i++) {
        if (data[i * 4 + 3] > 64) paint.wallPixels[i] = 1;
      }
    }

    // For image templates: sample the paint canvas after drawing white+image.
    // Any pixel darker than threshold is a printed outline → mark as wall.
    function buildWallMapFromCanvas() {
      const W = canvas.width, H = canvas.height;
      paint.wallPixels = new Uint8Array(W * H);
      try {
        const data = cx.getImageData(0, 0, W, H).data;
        for (let i = 0, len = W * H; i < len; i++) {
          const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
          if (a > 128 && r < 80 && g < 80 && b < 80) paint.wallPixels[i] = 1;
        }
      } catch (_) {}
    }

    // ---- Template transforms --------------------------------------------------
    function templateTransform(tpl) {
      const cssW = stage.clientWidth, cssH = stage.clientHeight;
      const scale = Math.min(cssW, cssH) / 400 * 0.85;
      const tx = (cssW - 400 * scale) / 2;
      const ty = (cssH - 400 * scale) / 2;
      return { scale, tx, ty };
    }

    function imageTransform(img) {
      const cssW = stage.clientWidth, cssH = stage.clientHeight;
      const scale = Math.min(cssW / img.naturalWidth, cssH / img.naturalHeight) * 0.9;
      const tx = (cssW - img.naturalWidth * scale) / 2;
      const ty = (cssH - img.naturalHeight * scale) / 2;
      return { scale, tx, ty, w: img.naturalWidth, h: img.naturalHeight };
    }

    // ---- Template rendering ---------------------------------------------------
    function drawOutlineTo(context, tpl, scl, tx, ty, lineWidth) {
      context.save();
      context.setTransform(scl * paint.dpr, 0, 0, scl * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      context.strokeStyle = '#1a1a1a';
      context.lineWidth = lineWidth || tpl.lineWidth || 6;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      tpl.outline.forEach(d => context.stroke(new Path2D(d)));
      context.restore();
    }

    function drawTemplate(tpl) {
      if (tpl.type === 'image') {
        loadImg(tpl.src).then(img => {
          const { scale, tx, ty } = imageTransform(img);
          const t = [scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr];
          // Overlay: permanent visual layer (lines stay on top of all paint)
          ox.clearRect(0, 0, overlay.width, overlay.height);
          ox.save(); ox.setTransform(...t); ox.drawImage(img, 0, 0); ox.restore();
          // Paint layer: white fill then image. Pre-filling white makes the
          // coloring regions opaque so flood fill stays inside the image bounds
          // rather than bleeding into the surrounding transparent canvas.
          cx.save();
          cx.setTransform(...t);
          cx.fillStyle = '#ffffff';
          cx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
          cx.drawImage(img, 0, 0);
          cx.restore();
          buildWallMapFromCanvas(); // mark dark outline pixels as hard walls
        }).catch(() => {});
        return;
      }
      // Path-based template
      const { scale, tx, ty } = templateTransform(tpl);
      ox.clearRect(0, 0, overlay.width, overlay.height);
      drawOutlineTo(ox, tpl, scale, tx, ty);
      // Paint-layer barrier uses 2× lineWidth so strokes overlap at junctions,
      // preventing flood-fill leaking between adjacent same-coloured regions.
      cx.save();
      cx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      cx.strokeStyle = '#1a1a1a';
      cx.lineWidth = (tpl.lineWidth || 6) * 2;
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      tpl.outline.forEach(d => cx.stroke(new Path2D(d)));
      cx.restore();
      buildWallMap(tpl); // mark barrier stroke pixels as hard walls
      if (tpl.regions && tpl.regions.length) {
        renderPbnNumbers(tpl, scale, tx, ty);
      }
    }

    // Redraw overlay only (used after undo / resize where paint canvas is already correct)
    function redrawOverlay(tpl) {
      if (tpl.type === 'image') {
        loadImg(tpl.src).then(img => {
          const { scale, tx, ty } = imageTransform(img);
          ox.clearRect(0, 0, overlay.width, overlay.height);
          ox.save();
          ox.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
          ox.drawImage(img, 0, 0);
          ox.restore();
        }).catch(() => {});
        return;
      }
      const { scale, tx, ty } = templateTransform(tpl);
      ox.clearRect(0, 0, overlay.width, overlay.height);
      drawOutlineTo(ox, tpl, scale, tx, ty);
      if (tpl.regions && tpl.regions.length) {
        renderPbnNumbers(tpl, scale, tx, ty);
      }
    }

    // Redraw paint-layer barrier only (used after clearAll)
    function drawBarrier(tpl) {
      if (tpl.type === 'image') {
        loadImg(tpl.src).then(img => {
          const { scale, tx, ty } = imageTransform(img);
          cx.save();
          cx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
          cx.fillStyle = '#ffffff';
          cx.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
          cx.drawImage(img, 0, 0);
          cx.restore();
          buildWallMapFromCanvas();
        }).catch(() => {});
        return;
      }
      const { scale, tx, ty } = templateTransform(tpl);
      cx.save();
      cx.setTransform(scale * paint.dpr, 0, 0, scale * paint.dpr, tx * paint.dpr, ty * paint.dpr);
      cx.strokeStyle = '#1a1a1a';
      cx.lineWidth = (tpl.lineWidth || 6) * 2;
      cx.lineCap = 'round';
      cx.lineJoin = 'round';
      tpl.outline.forEach(d => cx.stroke(new Path2D(d)));
      cx.restore();
      buildWallMap(tpl);
    }

    function renderPbnNumbers(tpl, scale, tx, ty) {
      ox.save();
      ox.font = 'bold 18px sans-serif';
      ox.textAlign = 'center';
      ox.textBaseline = 'middle';
      tpl.regions.forEach(r => {
        const centroid = getPathCentroid(r.d, scale, tx, ty);
        ox.fillStyle = '#ffffff';
        ox.fillText(String(r.number), centroid.x + 1, centroid.y + 1);
        ox.fillStyle = '#1a1a1a';
        ox.fillText(String(r.number), centroid.x, centroid.y);
      });
      ox.restore();
    }

    function getPathCentroid(d, scale, tx, ty) {
      const coords = [...d.matchAll(/[\d.]+[,\s]+[\d.]+/g)].map(c => {
        const parts = c[0].trim().split(/[,\s]+/);
        return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
      });
      if (!coords.length) return { x: stage.clientWidth / 2, y: stage.clientHeight / 2 };
      const avgX = coords.reduce((s, p) => s + p.x, 0) / coords.length;
      const avgY = coords.reduce((s, p) => s + p.y, 0) / coords.length;
      return { x: avgX * scale + tx, y: avgY * scale + ty };
    }

    // ---- Thumbnail rendering --------------------------------------------------
    function drawThumbnails() {
      wrap.querySelectorAll('.template-thumb').forEach(btn => {
        const id = btn.getAttribute('data-tpl');
        const tpl = (APP.PAINTING_TEMPLATES || []).find(t => t.id === id);
        if (!tpl) return;
        const tc = btn.querySelector('canvas');
        const tcx = tc.getContext('2d');
        const size = 80;

        if (tpl.type === 'image') {
          loadImg(tpl.src).then(img => {
            const scl = Math.min(size / img.naturalWidth, size / img.naturalHeight) * 0.85;
            const ttx = (size - img.naturalWidth * scl) / 2;
            const tty = (size - img.naturalHeight * scl) / 2;
            tcx.clearRect(0, 0, size, size);
            tcx.save();
            tcx.setTransform(scl, 0, 0, scl, ttx, tty);
            tcx.drawImage(img, 0, 0);
            tcx.restore();
          }).catch(() => {});
          return;
        }

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

    // ---- History --------------------------------------------------------------
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
      if (paint.mode === 'template' && paint.template) {
        redrawOverlay(paint.template);
      }
    }
    function clearAll() {
      pushHistory();
      cx.clearRect(0, 0, canvas.width, canvas.height);
      if (paint.mode === 'template' && paint.template) {
        paint.pbnDone.clear();
        drawBarrier(paint.template);
        redrawOverlay(paint.template);
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
      let img;
      try { img = cx.getImageData(0, 0, W, H); } catch (_) { return; }
      const d = img.data;
      const pidx = (x, y) => y * W + x;
      const idx = (x, y) => pidx(x, y) * 4;
      const walls = paint.wallPixels; // Uint8Array of barrier positions (or null)
      const isWall = (x, y) => walls && walls[pidx(x, y)];
      const s = idx(sx, sy);
      const target = [d[s], d[s + 1], d[s + 2], d[s + 3]];
      const tol2 = FILL_TOLERANCE * FILL_TOLERANCE * 4;
      const close = (i, ref) => {
        const dr = d[i] - ref[0], dg = d[i + 1] - ref[1], db = d[i + 2] - ref[2], da = d[i + 3] - ref[3];
        return dr * dr + dg * dg + db * db + da * da <= tol2;
      };
      // Don't fill if tap landed on a barrier stroke (would flood entire outline network)
      if (isWall(sx, sy)) return;
      if (close(idx(sx, sy), fill)) return;
      const seen = new Uint8Array(W * H);
      const stack = [[sx, sy]];
      while (stack.length) {
        const [x, y] = stack.pop();
        let xL = x;
        while (xL >= 0 && !seen[pidx(xL, y)] && !isWall(xL, y) && close(idx(xL, y), target)) xL--;
        xL++;
        let up = false, down = false;
        for (let xi = xL; xi < W && !seen[pidx(xi, y)] && !isWall(xi, y) && close(idx(xi, y), target); xi++) {
          const p = idx(xi, y);
          d[p] = fill[0]; d[p + 1] = fill[1]; d[p + 2] = fill[2]; d[p + 3] = fill[3];
          seen[pidx(xi, y)] = 1;
          if (y > 0 && !isWall(xi, y - 1) && close(idx(xi, y - 1), target)) { if (!up) { stack.push([xi, y - 1]); up = true; } } else up = false;
          if (y < H - 1 && !isWall(xi, y + 1) && close(idx(xi, y + 1), target)) { if (!down) { stack.push([xi, y + 1]); down = true; } } else down = false;
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
      if (!tpl || !tpl.regions || !tpl.regions.length || tpl.type === 'image') return;
      const { scale, tx, ty } = templateTransform(tpl);
      const templateX = (cssX - tx) / scale;
      const templateY = (cssY - ty) / scale;
      const scratch = document.createElement('canvas');
      scratch.width = 400; scratch.height = 400;
      const scx = scratch.getContext('2d');
      for (const region of tpl.regions) {
        if (paint.pbnDone.has(region.number)) continue;
        const path = new Path2D(region.d);
        if (scx.isPointInPath(path, templateX, templateY)) {
          const targetRgba = hexToRgba(region.targetColor);
          const fillRgba = hexToRgba(paint.color);
          const match = targetRgba[0] === fillRgba[0] && targetRgba[1] === fillRgba[1] && targetRgba[2] === fillRgba[2];
          if (match) {
            paint.pbnDone.add(region.number);
            if (APP.audio) APP.audio.strokeDone();
            const allDone = tpl.regions.every(r => paint.pbnDone.has(r.number));
            if (allDone) {
              setTimeout(() => {
                if (APP.launchConfetti) APP.launchConfetti();
                if (APP.audio) APP.audio.wordDone();
              }, 200);
            }
          } else {
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
        if (paint.mode === 'template' && paint.template) {
          checkPbnHit(cssPoint(e).x, cssPoint(e).y);
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

    // ---- Picker show/hide ----------------------------------------------------
    function showPicker() {
      picker.classList.remove('hidden');
      drawThumbnails();
      setTimeout(resize, 0);
    }
    function hidePicker() {
      picker.classList.add('hidden');
      setTimeout(resize, 0);
    }

    // ---- Mode toggle ----------------------------------------------------------
    wrap.querySelectorAll('.paint-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-mode');
        if (mode === 'template') {
          if (paint.mode === 'template') { showPicker(); return; }
          paint.mode = 'template';
          wrap.querySelectorAll('.paint-mode-btn').forEach(b =>
            b.classList.toggle('active', b.getAttribute('data-mode') === 'template'));
          showPicker();
        } else {
          paint.mode = 'free';
          wrap.querySelectorAll('.paint-mode-btn').forEach(b =>
            b.classList.toggle('active', b.getAttribute('data-mode') === 'free'));
          hidePicker();
          paint.template = null;
          paint.pbnDone.clear();
          ox.clearRect(0, 0, overlay.width, overlay.height);
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
        hidePicker();
        setTimeout(() => {
          cx.clearRect(0, 0, canvas.width, canvas.height);
          ox.clearRect(0, 0, overlay.width, overlay.height);
          drawTemplate(tpl);
        }, 20);
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

window.APP = window.APP || {};

(function (APP) {
  const HIT = 28; // snap radius in SVG units

  // ── Styles ──────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('dots-css')) return;
    const s = document.createElement('style');
    s.id = 'dots-css';
    s.textContent = `
      .dots-screen {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 0;
        overflow: hidden;
      }
      .dots-screen .topbar {
        justify-content: space-between;
      }
      .dots-screen .topbar .group {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      /* Picker */
      .dots-picker-body {
        flex: 1;
        overflow-y: auto;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
        gap: 12px;
        padding: 4px 14px 20px;
        align-content: start;
      }
      .dots-card {
        background: #fff;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        padding: 16px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        border: 3px solid transparent;
        transition: border-color 0.15s;
        -webkit-tap-highlight-color: transparent;
        touch-action: manipulation;
      }
      .dots-card:hover { border-color: var(--primary); }
      .dots-card svg { width: 80px; height: 80px; }
      .dots-card .card-name {
        font-size: 1rem;
        font-weight: 700;
        color: var(--ink);
      }
      .dots-card .card-count { font-size: 0.8rem; color: #888; }
      .dots-card.create-card {
        border: 3px dashed var(--muted);
        background: transparent;
        box-shadow: none;
      }
      .dots-card.create-card:hover { border-color: var(--primary); }
      /* Play */
      .dots-play-body {
        flex: 1;
        min-height: 0;
        padding: 0 12px 12px;
        display: flex;
        flex-direction: column;
      }
      .dots-stage {
        position: relative;
        flex: 1;
        min-height: 0;
        background: #fff;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .dots-stage svg {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        display: block;
        touch-action: none;
      }
      .dots-complete-overlay {
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.9);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        border-radius: var(--radius);
        z-index: 10;
      }
      .dots-complete-overlay .stars { font-size: 2.6rem; letter-spacing: 4px; }
      .dots-complete-overlay h2 { font-size: 1.8rem; color: var(--ink); margin: 0; }
      .dots-complete-overlay .btn { min-width: 180px; }
      /* Author */
      .dots-author-body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 12px 12px;
      }
      .author-toolbar {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        flex-shrink: 0;
      }
      .author-toolbar .btn {
        min-width: 0;
        font-size: 1rem;
        padding: 12px 16px;
        min-height: 48px;
      }
      .author-name-input {
        border: 2px solid var(--muted);
        border-radius: 12px;
        padding: 10px 14px;
        font-size: 1rem;
        font-family: inherit;
        color: var(--ink);
        background: #fff;
        width: 160px;
        min-height: 48px;
        box-sizing: border-box;
      }
      .author-canvas-wrap {
        position: relative;
        flex: 1;
        min-height: 0;
        background: #fff;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #author-canvas {
        display: block;
        max-width: 100%;
        max-height: 100%;
        touch-action: none;
        cursor: crosshair;
      }
      .author-dot-label {
        position: absolute;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        background: var(--primary);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        font-family: system-ui, sans-serif;
        display: flex;
        align-items: center;
        justify-content: center;
        transform: translate(-50%, -50%);
        pointer-events: none;
        border: 2px solid #fff;
        box-shadow: 0 2px 5px rgba(0,0,0,0.25);
      }
      .author-hint {
        text-align: center;
        color: #999;
        font-size: 0.88rem;
        margin: 0;
        flex-shrink: 0;
      }
    `;
    document.head.appendChild(s);
  }

  // ── Utilities ────────────────────────────────────────────────────────────────

  function clientToSvg(svg, clientX, clientY) {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    return pt.matrixTransform(ctm.inverse());
  }

  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function makeTopbar(title, onBack) {
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" aria-label="Back">${APP.ICONS.back}</button>
      </div>
      <div class="group">
        <span class="screen-title">${title}</span>
      </div>
      <div class="group" style="width:56px"></div>
    `;
    bar.querySelector('.btn.icon').addEventListener('click', onBack);
    return bar;
  }

  // ── Picker ───────────────────────────────────────────────────────────────────

  function previewSvg(puzzle) {
    const vb = puzzle.viewBox || '0 0 200 200';
    const dots = puzzle.dots;
    const total = puzzle.closed ? dots.length : dots.length - 1;
    let d = '';
    for (let i = 0; i < total; i++) {
      const a = dots[i], b = dots[(i + 1) % dots.length];
      d += `M${a.x},${a.y}L${b.x},${b.y}`;
    }
    const circles = dots.map(p =>
      `<circle cx="${p.x}" cy="${p.y}" r="7" fill="var(--primary)"/>`
    ).join('');
    return `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">
      <path d="${d}" fill="none" stroke="var(--ink)" stroke-width="5"
        stroke-linecap="round" stroke-linejoin="round" opacity="0.25"/>
      ${circles}
    </svg>`;
  }

  function renderPicker(wrap, ctx) {
    wrap.innerHTML = '';
    wrap.appendChild(makeTopbar('Connect the Dots', () => ctx.go('landing')));

    const body = document.createElement('div');
    body.className = 'dots-picker-body';

    (APP.DOT_PUZZLES || []).forEach(puzzle => {
      const card = document.createElement('div');
      card.className = 'dots-card';
      card.innerHTML = `
        ${previewSvg(puzzle)}
        <span class="card-name">${puzzle.name}</span>
        <span class="card-count">${puzzle.dots.length} dots</span>
      `;
      card.addEventListener('click', () => renderPlay(wrap, ctx, puzzle));
      body.appendChild(card);
    });

    const createCard = document.createElement('div');
    createCard.className = 'dots-card create-card';
    createCard.innerHTML = `
      <div style="font-size:2.4rem;color:var(--muted)">✏️</div>
      <span class="card-name">Create your own</span>
      <span class="card-count">Upload an image</span>
    `;
    createCard.addEventListener('click', () => renderAuthor(wrap, ctx));
    body.appendChild(createCard);

    wrap.appendChild(body);
  }

  // ── Play ─────────────────────────────────────────────────────────────────────

  function renderPlay(wrap, ctx, puzzle) {
    const vb = puzzle.viewBox || '0 0 200 200';
    const dots = puzzle.dots;
    const total = puzzle.closed ? dots.length : dots.length - 1;
    let connected = 0;
    let dragging = false;
    let showGuides = true;

    wrap.innerHTML = '';

    // Topbar with guide toggle in the right slot
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" id="dots-back" aria-label="Back">${APP.ICONS.home}</button>
      </div>
      <div class="group">
        <span class="screen-title">${puzzle.name}</span>
      </div>
      <div class="group">
        <button class="btn ghost" id="guide-toggle" style="font-size:0.85rem;min-width:0;padding:8px 10px;border-radius:12px;background:var(--accent);color:var(--accent-ink)">
          ···  Guides
        </button>
      </div>
    `;
    bar.querySelector('#dots-back').addEventListener('click', () => renderPicker(wrap, ctx));
    bar.querySelector('#guide-toggle').addEventListener('click', function () {
      showGuides = !showGuides;
      guideLines.setAttribute('visibility', showGuides ? 'visible' : 'hidden');
      this.style.background = showGuides ? 'var(--accent)' : 'transparent';
      this.style.color = showGuides ? 'var(--accent-ink)' : '#aaa';
    });
    wrap.appendChild(bar);

    const playBody = document.createElement('div');
    playBody.className = 'dots-play-body';

    const stage = document.createElement('div');
    stage.className = 'dots-stage';
    playBody.appendChild(stage);
    wrap.appendChild(playBody);

    // Build SVG
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', vb);
    stage.appendChild(svg);

    // Background image (if any)
    let bgImg = null;
    if (puzzle.image) {
      bgImg = document.createElementNS(NS, 'image');
      bgImg.setAttribute('href', puzzle.image);
      bgImg.setAttribute('x', '0');
      bgImg.setAttribute('y', '0');
      bgImg.setAttribute('width', '200');
      bgImg.setAttribute('height', '200');
      bgImg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      bgImg.setAttribute('opacity', '0.2');
      svg.appendChild(bgImg);
    }

    const guideLines = document.createElementNS(NS, 'g');
    svg.appendChild(guideLines);

    const doneLines = document.createElementNS(NS, 'g');
    svg.appendChild(doneLines);

    const rubberBand = document.createElementNS(NS, 'line');
    rubberBand.setAttribute('stroke', 'var(--guide)');
    rubberBand.setAttribute('stroke-width', '4');
    rubberBand.setAttribute('stroke-dasharray', '8,5');
    rubberBand.setAttribute('stroke-linecap', 'round');
    rubberBand.setAttribute('opacity', '0');
    svg.appendChild(rubberBand);

    const dotGroup = document.createElementNS(NS, 'g');
    svg.appendChild(dotGroup);

    function src() { return dots[connected % dots.length]; }
    function tgt() { return dots[(connected + 1) % dots.length]; }

    function drawGuideLines() {
      guideLines.innerHTML = '';
      for (let i = connected; i < total; i++) {
        const a = dots[i % dots.length];
        const b = dots[(i + 1) % dots.length];
        const line = document.createElementNS(NS, 'line');
        line.setAttribute('x1', a.x);
        line.setAttribute('y1', a.y);
        line.setAttribute('x2', b.x);
        line.setAttribute('y2', b.y);
        line.setAttribute('stroke', '#ccc');
        line.setAttribute('stroke-width', '3');
        line.setAttribute('stroke-dasharray', '6,5');
        line.setAttribute('stroke-linecap', 'round');
        guideLines.appendChild(line);
      }
    }

    function drawDots() {
      dotGroup.innerHTML = '';
      const allDone = connected >= total;

      dots.forEach(function (d, i) {
        const isFinalTarget = !allDone && i === ((connected + 1) % dots.length);
        const isUsed = !isFinalTarget && (allDone || i < connected);
        const isActive = !allDone && !isFinalTarget && i === (connected % dots.length);

        const g = document.createElementNS(NS, 'g');

        if (isActive) {
          const pulse = document.createElementNS(NS, 'circle');
          pulse.setAttribute('cx', d.x);
          pulse.setAttribute('cy', d.y);
          pulse.setAttribute('r', '20');
          pulse.setAttribute('fill', 'none');
          pulse.setAttribute('stroke', 'var(--primary)');
          pulse.setAttribute('stroke-width', '3');
          pulse.setAttribute('opacity', '0.45');
          g.appendChild(pulse);
        }

        const circle = document.createElementNS(NS, 'circle');
        circle.setAttribute('cx', d.x);
        circle.setAttribute('cy', d.y);
        circle.setAttribute('r', isUsed ? '6' : isActive ? '13' : '11');
        circle.setAttribute('fill',
          isUsed ? 'var(--letter-done)' :
          isActive ? 'var(--primary)' :
          '#bbb'
        );
        if (!isUsed) {
          circle.setAttribute('stroke', '#fff');
          circle.setAttribute('stroke-width', '2');
        }
        g.appendChild(circle);

        if (!isUsed) {
          const label = document.createElementNS(NS, 'text');
          label.setAttribute('x', d.x);
          label.setAttribute('y', d.y);
          label.setAttribute('text-anchor', 'middle');
          label.setAttribute('dominant-baseline', 'central');
          label.setAttribute('font-size', '8.5');
          label.setAttribute('font-weight', '700');
          label.setAttribute('fill', isActive ? '#fff' : 'var(--ink)');
          label.setAttribute('font-family', 'system-ui, sans-serif');
          label.setAttribute('pointer-events', 'none');
          label.textContent = i + 1;
          g.appendChild(label);
        }

        dotGroup.appendChild(g);
      });
    }

    function addDoneLine(a, b) {
      const line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', a.x);
      line.setAttribute('y1', a.y);
      line.setAttribute('x2', b.x);
      line.setAttribute('y2', b.y);
      line.setAttribute('stroke', 'var(--letter-done)');
      line.setAttribute('stroke-width', '5');
      line.setAttribute('stroke-linecap', 'round');
      doneLines.appendChild(line);
    }

    function onComplete() {
      if (bgImg) bgImg.setAttribute('opacity', '1');
      if (APP.audio) {
        APP.audio.letterDone();
        setTimeout(function () { APP.audio.wordDone(); }, 500);
      }
      if (APP.launchConfetti) APP.launchConfetti();

      setTimeout(function () {
        const overlay = document.createElement('div');
        overlay.className = 'dots-complete-overlay';
        overlay.innerHTML = `
          <div class="stars">⭐ ⭐ ⭐</div>
          <h2>Well done!</h2>
          <button class="btn" id="play-again">Play again</button>
          <button class="btn secondary" id="choose-another">Choose another</button>
        `;
        stage.appendChild(overlay);
        overlay.querySelector('#play-again').addEventListener('click', function () {
          renderPlay(wrap, ctx, puzzle);
        });
        overlay.querySelector('#choose-another').addEventListener('click', function () {
          renderPicker(wrap, ctx);
        });
      }, 700);
    }

    drawGuideLines();
    drawDots();

    svg.addEventListener('pointerdown', function (e) {
      if (connected >= total) return;
      if (APP.audio && APP.audio._wake) APP.audio._wake();
      const p = clientToSvg(svg, e.clientX, e.clientY);
      if (dist(p, src()) <= HIT) {
        dragging = true;
        svg.setPointerCapture(e.pointerId);
        rubberBand.setAttribute('x1', src().x);
        rubberBand.setAttribute('y1', src().y);
        rubberBand.setAttribute('x2', p.x);
        rubberBand.setAttribute('y2', p.y);
        rubberBand.setAttribute('opacity', '1');
      }
    });

    svg.addEventListener('pointermove', function (e) {
      if (!dragging || connected >= total) return;
      const p = clientToSvg(svg, e.clientX, e.clientY);
      rubberBand.setAttribute('x2', p.x);
      rubberBand.setAttribute('y2', p.y);

      if (dist(p, tgt()) <= HIT) {
        addDoneLine(src(), tgt());
        if (APP.audio) APP.audio.strokeDone();
        connected++;
        drawGuideLines();
        drawDots();
        if (connected >= total) {
          dragging = false;
          rubberBand.setAttribute('opacity', '0');
          onComplete();
        } else {
          // Flow on — keep dragging from the new source dot
          rubberBand.setAttribute('x1', src().x);
          rubberBand.setAttribute('y1', src().y);
          rubberBand.setAttribute('x2', p.x);
          rubberBand.setAttribute('y2', p.y);
        }
      }
    });

    svg.addEventListener('pointerup', function () {
      dragging = false;
      rubberBand.setAttribute('opacity', '0');
    });

    svg.addEventListener('pointercancel', function () {
      dragging = false;
      rubberBand.setAttribute('opacity', '0');
    });
  }

  // ── Author ───────────────────────────────────────────────────────────────────

  function renderAuthor(wrap, ctx) {
    wrap.innerHTML = '';
    let _resizeObs = null;
    wrap.appendChild(makeTopbar('Create Puzzle', () => {
      if (_resizeObs) { _resizeObs.disconnect(); _resizeObs = null; }
      renderPicker(wrap, ctx);
    }));

    const authorBody = document.createElement('div');
    authorBody.className = 'dots-author-body';

    authorBody.innerHTML = `
      <div class="author-toolbar">
        <label class="btn secondary" style="cursor:pointer;touch-action:manipulation">
          📁 Upload image
          <input type="file" accept="image/*" id="author-img-input" style="display:none"/>
        </label>
        <button class="btn secondary" id="author-undo" disabled>↩ Undo</button>
        <button class="btn secondary" id="author-closed">Closed ✓</button>
        <input type="text" class="author-name-input" id="author-name" placeholder="Puzzle name" value="My Puzzle"/>
        <button class="btn" id="author-save" disabled>▶ Save &amp; Play</button>
      </div>
      <div class="author-canvas-wrap" id="author-canvas-wrap">
        <canvas id="author-canvas" width="400" height="400"></canvas>
      </div>
      <p class="author-hint" id="author-hint">Upload an image, then click to place numbered dots in order.</p>
    `;
    wrap.appendChild(authorBody);

    const canvas = authorBody.querySelector('#author-canvas');
    const ctx2d = canvas.getContext('2d');
    const canvasWrap = authorBody.querySelector('#author-canvas-wrap');
    const undoBtn = authorBody.querySelector('#author-undo');
    const saveBtn = authorBody.querySelector('#author-save');
    const closedBtn = authorBody.querySelector('#author-closed');

    let uploadedImage = null;
    let dots = [];
    let isClosed = true;
    let dotLabels = [];

    function redrawCanvas() {
      ctx2d.clearRect(0, 0, 400, 400);
      if (uploadedImage) {
        ctx2d.drawImage(uploadedImage, 0, 0, 400, 400);
      } else {
        ctx2d.fillStyle = '#f5f5f5';
        ctx2d.fillRect(0, 0, 400, 400);
        ctx2d.fillStyle = '#bbb';
        ctx2d.font = '16px system-ui, sans-serif';
        ctx2d.textAlign = 'center';
        ctx2d.fillText('Upload an image to get started', 200, 200);
      }
      if (dots.length >= 2) {
        ctx2d.save();
        ctx2d.strokeStyle = '#001858';
        ctx2d.lineWidth = 3;
        ctx2d.lineCap = 'round';
        ctx2d.setLineDash([6, 4]);
        ctx2d.beginPath();
        ctx2d.moveTo(dots[0].x, dots[0].y);
        for (let i = 1; i < dots.length; i++) {
          ctx2d.lineTo(dots[i].x, dots[i].y);
        }
        if (isClosed && dots.length >= 3) {
          ctx2d.lineTo(dots[0].x, dots[0].y);
        }
        ctx2d.stroke();
        ctx2d.restore();
      }
    }

    function syncLabels() {
      dotLabels.forEach(function (el) { el.remove(); });
      dotLabels = [];

      const canvasRect = canvas.getBoundingClientRect();
      const wrapRect = canvasWrap.getBoundingClientRect();
      const scaleX = canvasRect.width / canvas.width;
      const scaleY = canvasRect.height / canvas.height;
      const offsetX = canvasRect.left - wrapRect.left;
      const offsetY = canvasRect.top - wrapRect.top;

      dots.forEach(function (d, i) {
        const el = document.createElement('div');
        el.className = 'author-dot-label';
        el.textContent = i + 1;
        el.style.left = (offsetX + d.x * scaleX) + 'px';
        el.style.top = (offsetY + d.y * scaleY) + 'px';
        canvasWrap.appendChild(el);
        dotLabels.push(el);
      });
    }

    function updateButtons() {
      undoBtn.disabled = dots.length === 0;
      saveBtn.disabled = dots.length < 3;
    }

    authorBody.querySelector('#author-img-input').addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (ev) {
        const img = new Image();
        img.onload = function () {
          uploadedImage = img;
          redrawCanvas();
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    canvas.addEventListener('pointerdown', function (e) {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) * (canvas.width / rect.width));
      const y = Math.round((e.clientY - rect.top) * (canvas.height / rect.height));
      dots.push({ x: x, y: y });
      redrawCanvas();
      syncLabels();
      updateButtons();
    });

    undoBtn.addEventListener('click', function () {
      dots.pop();
      redrawCanvas();
      syncLabels();
      updateButtons();
    });

    closedBtn.addEventListener('click', function () {
      isClosed = !isClosed;
      closedBtn.textContent = isClosed ? 'Closed ✓' : 'Open ✗';
      redrawCanvas();
    });

    saveBtn.addEventListener('click', function () {
      const name = authorBody.querySelector('#author-name').value.trim() || 'My Puzzle';
      const normalized = dots.map(function (d) {
        return { x: Math.round(d.x / 2), y: Math.round(d.y / 2) };
      });
      const imgData = uploadedImage ? canvas.toDataURL('image/jpeg', 0.7) : null;
      const puzzle = {
        id: 'custom_' + Date.now(),
        name: name,
        viewBox: '0 0 200 200',
        closed: isClosed,
        image: imgData,
        dots: normalized
      };
      APP.DOT_PUZZLES.push(puzzle);
      renderPlay(wrap, ctx, puzzle);
    });

    _resizeObs = new ResizeObserver(function () { syncLabels(); });
    _resizeObs.observe(canvas);

    redrawCanvas();
    updateButtons();
  }

  // ── Entry point ──────────────────────────────────────────────────────────────

  function render(root, ctx) {
    root.innerHTML = '';
    injectStyles();
    const wrap = document.createElement('div');
    wrap.className = 'dots-screen';
    root.appendChild(wrap);
    renderPicker(wrap, ctx);
  }

  APP.screens = APP.screens || {};
  APP.screens.dots = { render };
})(window.APP);

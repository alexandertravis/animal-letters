window.APP = window.APP || {};

(function (APP) {
  // ── Confetti ─────────────────────────────────────────────────────────────
  const CONFETTI_COLORS = [
    '#ff6b9d', '#ffd166', '#06d6a0', '#118ab2',
    '#ff9f1c', '#c77dff', '#ff595e', '#4ecdc4'
  ];
  const CONFETTI_COUNT  = 140;
  const CONFETTI_DURATION = 4000; // ms

  function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText =
      'position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:999';
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const c = canvas.getContext('2d');

    const particles = Array.from({ length: CONFETTI_COUNT }, () => ({
      x:        Math.random() * canvas.width,
      y:        -20 - Math.random() * 120,       // start above viewport
      vx:       (Math.random() - 0.5) * 5,
      vy:       2.5 + Math.random() * 4,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.18,
      color:    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      w:        7 + Math.random() * 9,
      h:        4 + Math.random() * 6,
      shape:    Math.random() > 0.35 ? 'rect' : 'circle',
      opacity:  1,
    }));

    let startTs = null;
    let rafId;

    function draw(ts) {
      if (!startTs) startTs = ts;
      const elapsed = ts - startTs;

      c.clearRect(0, 0, canvas.width, canvas.height);

      let alive = 0;
      particles.forEach(p => {
        p.x        += p.vx;
        p.y        += p.vy;
        p.vy       += 0.09;   // gravity
        p.vx       *= 0.993;  // gentle air drag
        p.rotation += p.rotSpeed;

        // Fade out over the final 1 s
        if (elapsed > CONFETTI_DURATION - 1000) {
          p.opacity = Math.max(0, (CONFETTI_DURATION - elapsed) / 1000);
        }

        if (p.y < canvas.height + 50) alive++;

        c.save();
        c.globalAlpha = p.opacity;
        c.translate(p.x, p.y);
        c.rotate(p.rotation);
        c.fillStyle = p.color;

        if (p.shape === 'circle') {
          c.beginPath();
          c.arc(0, 0, p.w / 2, 0, Math.PI * 2);
          c.fill();
        } else {
          c.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        }

        c.restore();
      });

      if (elapsed < CONFETTI_DURATION && alive > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        canvas.remove();
      }
    }

    rafId = requestAnimationFrame(draw);

    // Return a cleanup handle so navigation can kill it early
    return () => { cancelAnimationFrame(rafId); canvas.remove(); };
  }

  // ── Screen render ─────────────────────────────────────────────────────────
  function render(root, ctx) {
    root.innerHTML = '';
    const animal = APP.state.currentAnimal;
    if (!animal) { ctx.go('landing'); return; }

    const wrap = document.createElement('div');
    wrap.className = 'complete';

    const imgSrc = animal.images[APP.state.settings.depiction] || animal.images.cartoon;

    // Top bar — matches game screen layout
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" data-act="home" aria-label="Home">&#8962;</button>
        <button class="btn icon ghost" data-act="settings" aria-label="Settings">&#9881;</button>
      </div>
    `;
    wrap.appendChild(bar);

    const body = document.createElement('div');
    body.className = 'complete-body';
    body.innerHTML = `
      <h1>Hooray!</h1>
      <div class="animalName">${animal.displayName.toUpperCase()}</div>
      <div class="animalImg" id="animalImg"></div>
      <div class="actions">
        <button class="btn" data-act="next">Next animal</button>
        <button class="btn secondary" data-act="gallery">My Animals</button>
        <button class="btn practice-great-btn" data-act="replay">Great job! 🎉</button>
      </div>
    `;
    wrap.appendChild(body);
    root.appendChild(wrap);

    // Start confetti; keep cleanup handle so early navigation removes the canvas
    const stopConfetti = launchConfetti();

    function navigate(fn) {
      stopConfetti();
      APP.audio.stopFile();
      fn();
    }

    bar.querySelector('[data-act=home]').addEventListener('click', () =>
      navigate(() => ctx.go('landing')));
    bar.querySelector('[data-act=settings]').addEventListener('click', () =>
      navigate(() => ctx.go('setup')));

    const imgBox = wrap.querySelector('#animalImg');
    const img = new Image();
    img.alt = animal.displayName;
    img.onerror = () => {
      imgBox.innerHTML = `<div class="fallback-graphic">${animal.displayName[0].toUpperCase()}</div>`;
    };
    img.src = imgSrc;
    imgBox.appendChild(img);

    APP.audio.playComplete(animal.audio);

    wrap.querySelector('[data-act=next]').addEventListener('click', () => {
      const next = APP.animals.pickRandom(APP.state.settings.maxLength, animal);
      navigate(() => {
        if (!next) { ctx.go('landing'); return; }
        APP.startGame(next);
        ctx.go('game');
      });
    });
    wrap.querySelector('[data-act=gallery]').addEventListener('click', () =>
      navigate(() => ctx.go('gallery')));
    wrap.querySelector('[data-act=replay]').addEventListener('click', () => {
      APP.audio.playComplete(animal.audio);
      launchConfetti();
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.complete = { render };
})(window.APP);

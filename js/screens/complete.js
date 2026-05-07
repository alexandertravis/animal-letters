window.APP = window.APP || {};

(function (APP) {
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
        <button class="btn icon ghost" data-act="home" aria-label="Home">${APP.ICONS.home}</button>
        <button class="btn icon ghost" data-act="settings" aria-label="Settings">${APP.ICONS.settings}</button>
      </div>
    `;
    wrap.appendChild(bar);

    const body = document.createElement('div');
    body.className = 'complete-body';
    body.innerHTML = `
      <h1>Hooray!</h1>
      <div class="animalName">${APP.caseOf(animal.displayName)}</div>
      <div class="animalImg" id="animalImg"></div>
      <div class="actions">
        <button class="btn secondary" data-act="gallery">My Animals</button>
        <button class="btn" data-act="next">Next Animal</button>
        <button class="btn success" data-act="replay">Great Job! 🎉</button>
      </div>
    `;
    wrap.appendChild(body);
    root.appendChild(wrap);

    // Collect all confetti cleanup handles. Stacking multiple animations on
    // "Great Job!" replay clicks is intentional — each canvas is independent.
    // All are cancelled together when the user navigates away.
    const confettiHandles = [APP.launchConfetti({ count: 140, duration: 4000 })];

    function navigate(fn) {
      confettiHandles.forEach(h => h());
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
    img.className = 'animal-reveal';
    img.onerror = () => {
      // Fallback graphic skips the reveal — just show the letter immediately.
      imgBox.innerHTML = `<div class="fallback-graphic">${animal.displayName[0].toUpperCase()}</div>`;
    };
    img.src = imgSrc;
    imgBox.appendChild(img);

    // Tap anywhere in the photo box to spin and reveal the colour.
    // Listening on imgBox (not img) so the full square is the hit target —
    // transparent/empty areas around the silhouette still respond.
    // pointerdown fires immediately on touch (no 300 ms click delay).
    imgBox.addEventListener('pointerdown', () => {
      if (img.classList.contains('spinning') || img.classList.contains('revealed')) return;
      img.classList.add('spinning');
      img.addEventListener('animationend', () => {
        img.classList.remove('spinning');
        img.classList.add('revealed');
        imgBox.style.cursor = 'default';
      }, { once: true });
    });

    APP.audio.playComplete(animal.audio);

    wrap.querySelector('[data-act=next]').addEventListener('click', () => {
      const next = APP.animals.pickNext(APP.state.settings.maxLength, animal);
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
      // Store the handle so this canvas is also cancelled on navigation.
      confettiHandles.push(APP.launchConfetti({ count: 140, duration: 4000 }));
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.complete = { render };
})(window.APP);

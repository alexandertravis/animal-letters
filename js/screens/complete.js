window.APP = window.APP || {};

(function (APP) {
  // ── Screen render ─────────────────────────────────────────────────────────
  function render(root, ctx) {
    root.innerHTML = '';
    const animal = APP.state.currentAnimal;
    if (!animal) { ctx.go(APP.screens && APP.screens.map ? 'map' : 'landing'); return; }

    const wrap = document.createElement('div');
    wrap.className = 'complete';

    const imgSrc = animal.images[APP.state.settings.depiction] || animal.images.cartoon;

    // Lazy cleanup reference — confettiHandles populated below, but the function
    // is safe to call before that point (no-op on empty array).
    const confettiHandles = [];
    function cleanup() {
      confettiHandles.forEach(function(h) { h(); });
      APP.audio.stopFile();
    }
    // Wrap ctx so topbar home button also triggers cleanup before navigating.
    const wrappedCtx = { go: function(screen) { cleanup(); ctx.go(screen); } };

    // Top bar — home only, no back during complete screen
    const bar = APP.ui.topbar({ ctx: wrappedCtx, title: '', home: true, back: false });
    wrap.appendChild(bar);

    const body = document.createElement('div');
    body.className = 'complete-body';
    body.innerHTML = `
      <h1>${APP.t('complete.hooray')}</h1>
      <div class="animalName">${APP.caseOf(animal.displayName)}</div>
      <div class="animalImg" id="animalImg"></div>
    `;
    wrap.appendChild(body);

    // ── Story unlock banner ─────────────────────────────────────────────────
    // Shown when completing this animal triggered a new story unlock.
    // Sits inside .complete-body (centre column) so it appears near the image.
    if (APP.state.newlyUnlockedStories && APP.state.newlyUnlockedStories.length > 0) {
      const newStory = APP.state.newlyUnlockedStories[0];
      const banner = document.createElement('div');
      banner.className = 'story-unlock-banner';
      banner.innerHTML = `
        <span>📚 <strong>${newStory.title}</strong> unlocked!</span>
        <button class="btn" data-act="readnow">${APP.t('complete.readNow')}</button>
      `;
      body.appendChild(banner);
    }

    // ── Action buttons — sibling of .complete-body so CSS Grid can place them
    //    in the right column in landscape while they flow below in portrait.
    const actions = document.createElement('div');
    actions.className = 'complete-actions';
    actions.innerHTML = `
      <button class="btn secondary" data-act="gallery">${APP.t('complete.myAnimals')}</button>
      <button class="btn" data-act="next">${APP.t('complete.next')}</button>
      <button class="btn success" data-act="replay">${APP.t('complete.greatJob')}</button>
    `;
    wrap.appendChild(actions);

    root.appendChild(wrap);

    // Collect all confetti cleanup handles. Stacking multiple animations on
    // "Great Job!" replay clicks is intentional — each canvas is independent.
    // All are cancelled together when the user navigates away.
    confettiHandles.push(APP.launchConfetti({ count: 140, duration: 4000 }));

    function navigate(fn) {
      cleanup();
      fn();
    }

    // Wire the story unlock "Read now" button (banner may not exist)
    const readNowBtn = wrap.querySelector('[data-act=readnow]');
    if (readNowBtn) {
      readNowBtn.addEventListener('click', () => {
        const story = APP.state.newlyUnlockedStories && APP.state.newlyUnlockedStories[0];
        if (!story) return;
        navigate(() => APP.goToStory(story, ctx));
      });
    }

    const imgBox = wrap.querySelector('#animalImg');

    // Stars badge — top-right corner of the image box, always shown
    const stars = APP.animalStars ? APP.animalStars(animal) : 0;
    const badge = document.createElement('div');
    badge.className = 'animal-stars-badge animal-stars-badge--lg';
    badge.innerHTML = APP.starsHtml ? APP.starsHtml(stars, 3) : '';
    imgBox.appendChild(badge);

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
        APP.audio.speakLetter(animal.displayName, APP.state.settings.locale);
      }, { once: true });
    });

    APP.audio.playComplete(animal.audio);

    wrap.querySelector('[data-act=next]').addEventListener('click', () => {
      const next = APP.animals.pickNext(APP.state.settings.maxLength, animal);
      navigate(() => {
        if (!next) { ctx.go(APP.screens && APP.screens.map ? 'map' : 'landing'); return; }
        APP.startGame(next);
        const mode = (APP.state && APP.state.settings && APP.state.settings.gameMode) || 'trace';
        ctx.go(mode === 'find' ? 'findletter' : 'game');
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

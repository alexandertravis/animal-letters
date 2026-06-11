window.APP = window.APP || {};

(function (APP) {
  // Paint the filled (left) portion of a range input purple on webkit browsers.
  // Firefox uses ::-moz-range-progress in CSS; this handles Chrome/Safari/Edge.
  function fillRange(input) {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.background =
      `linear-gradient(to right, #a78bfa ${pct}%, #e0e0e0 ${pct}%)`;
  }

  function render(root, ctx) {
    root.innerHTML = '';
    const s = APP.state.settings;

    // .setup is full-width so the scrollbar reaches the screen edge.
    // .setup-inner is the centred content column.
    const wrap = document.createElement('div');
    wrap.className = 'setup';

    const inner = document.createElement('div');
    inner.className = 'setup-inner';

    // Standard topbar: home + back, title "Parent Corner"
    inner.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('setup.parents'),
      home: true,
      back: true
    }));

    // Language selector — dropdown at the top with flag emoji
    const f0 = document.createElement('div');
    f0.className = 'field';
    f0.innerHTML = `<label for="locale-select">${APP.t('setup.language')}</label>`;
    const locales = (APP.I18N && APP.I18N.LOCALES) || [
      { code: 'en', label: 'English', flag: '🇬🇧' },
    ];
    const select = document.createElement('select');
    select.id = 'locale-select';
    select.className = 'locale-select';
    locales.forEach(loc => {
      const opt = document.createElement('option');
      opt.value = loc.code;
      opt.textContent = loc.flag + ' ' + loc.label;
      if (loc.code === s.locale) opt.selected = true;
      select.appendChild(opt);
    });
    select.addEventListener('change', () => {
      const v = select.value;
      APP.setLocale(v);
      // Reset maxLength to match the new locale's animal list, then re-render.
      const newList = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
      const newMax  = Math.max(...newList.map(a => a.name.length));
      APP.settings.update({ maxLength: newMax });
      render(root, ctx);
    });
    f0.appendChild(select);
    inner.appendChild(f0);

    // ── Background Music section ─────────────────────────────────────────────
    const musicSection = document.createElement('div');
    musicSection.className = 'field';

    const musicLabelRow = document.createElement('div');
    musicLabelRow.className = 'volume-row';
    const musicLabel = document.createElement('label');
    musicLabel.textContent = APP.t('setup.music');

    const musicToggle = document.createElement('input');
    musicToggle.type = 'checkbox';
    musicToggle.checked = s.bgMusicEnabled !== false;
    musicToggle.setAttribute('aria-label', APP.t('setup.music'));

    musicLabelRow.appendChild(musicLabel);
    musicLabelRow.appendChild(musicToggle);
    musicSection.appendChild(musicLabelRow);

    // Volume slider for bgMusicVol
    const musicVolRow = document.createElement('div');
    musicVolRow.className = 'field';
    musicVolRow.style.display = s.bgMusicEnabled !== false ? '' : 'none';
    const musicVolLabel = document.createElement('label');
    musicVolLabel.textContent = APP.t('audio.bgMusic');
    const musicVolInput = document.createElement('input');
    musicVolInput.type = 'range';
    musicVolInput.min = '0';
    musicVolInput.max = '1';
    musicVolInput.step = '0.05';
    musicVolInput.value = String(s.bgMusicVol != null ? s.bgMusicVol : 0.3);
    fillRange(musicVolInput);
    musicVolInput.addEventListener('input', function() {
      fillRange(musicVolInput);
      const v = parseFloat(musicVolInput.value);
      APP.settings.update({ bgMusicVol: v });
      if (APP.audio.music) APP.audio.music.setVol(v);
    });
    musicVolRow.appendChild(musicVolLabel);
    musicVolRow.appendChild(musicVolInput);
    musicSection.appendChild(musicVolRow);

    musicToggle.addEventListener('change', function() {
      const enabled = musicToggle.checked;
      APP.settings.update({ bgMusicEnabled: enabled });
      if (APP.audio.music) APP.audio.music.setEnabled(enabled);
      musicVolRow.style.display = enabled ? '' : 'none';
    });

    inner.appendChild(musicSection);

    // ── Sound Effects section ────────────────────────────────────────────────
    const sfxSection = document.createElement('div');
    sfxSection.className = 'field';

    const sfxLabelRow = document.createElement('div');
    sfxLabelRow.className = 'volume-row';
    const sfxLabel = document.createElement('label');
    sfxLabel.textContent = APP.t('setup.sfx');

    const sfxMuteToggle = document.createElement('input');
    sfxMuteToggle.type = 'checkbox';
    sfxMuteToggle.checked = s.sfxMuted === true;
    sfxMuteToggle.setAttribute('aria-label', APP.t('setup.sfx'));

    sfxLabelRow.appendChild(sfxLabel);
    sfxLabelRow.appendChild(sfxMuteToggle);
    sfxSection.appendChild(sfxLabelRow);

    // Volume slider for sfxVol
    const sfxVolRow = document.createElement('div');
    sfxVolRow.className = 'field';
    const sfxVolLabel = document.createElement('label');
    sfxVolLabel.textContent = APP.t('audio.sfx');
    const sfxVolInput = document.createElement('input');
    sfxVolInput.type = 'range';
    sfxVolInput.min = '0';
    sfxVolInput.max = '1';
    sfxVolInput.step = '0.05';
    sfxVolInput.value = String(s.sfxVol != null ? s.sfxVol : 0.7);
    fillRange(sfxVolInput);

    // Debounce the preview tone so rapid dragging doesn't stack up.
    let sfxPreviewTimer = null;
    sfxVolInput.addEventListener('input', function() {
      fillRange(sfxVolInput);
      const v = parseFloat(sfxVolInput.value);
      APP.settings.update({ sfxVol: v });
      if (APP.audio.sfx) APP.audio.sfx.setVol(v);
      clearTimeout(sfxPreviewTimer);
      sfxPreviewTimer = setTimeout(function() { APP.audio.strokeDone(); }, 80);
    });
    sfxVolRow.appendChild(sfxVolLabel);
    sfxVolRow.appendChild(sfxVolInput);
    sfxSection.appendChild(sfxVolRow);

    sfxMuteToggle.addEventListener('change', function() {
      const muted = sfxMuteToggle.checked;
      APP.settings.update({ sfxMuted: muted });
      if (APP.audio.sfx) APP.audio.sfx.setMuted(muted);
      // Play a preview tone so the user hears the result of un-muting.
      if (!muted) APP.audio.strokeDone();
    });

    inner.appendChild(sfxSection);

    // Progress reset
    const resetField = document.createElement('div');
    resetField.className = 'field';
    resetField.innerHTML = `<label>${APP.t('setup.gallery')}</label>`;
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn secondary';
    resetBtn.textContent = APP.t('setup.clearGallery', { n: APP.state.completedAnimals.size });
    resetBtn.addEventListener('click', () => {
      if (!confirm(APP.t('setup.clearConfirm'))) return;
      APP.clearProgress();
      APP.clearMastery();
      render(root, ctx); // refresh count in button label
    });
    resetField.appendChild(resetBtn);
    inner.appendChild(resetField);

    // Dev / review tools
    const devTools = document.createElement('div');
    devTools.className = 'field setup-dev-tools';
    devTools.innerHTML = `<label>${APP.t('setup.reviewTools')}</label>`;
    const devBtns = document.createElement('div');
    devBtns.className = 'seg';
    const lettersBtn = document.createElement('button');
    lettersBtn.type = 'button';
    lettersBtn.textContent = APP.t('setup.letterPatterns');
    lettersBtn.addEventListener('click', () => ctx.go('letters'));
    const animalsBtn = document.createElement('button');
    animalsBtn.type = 'button';
    animalsBtn.textContent = APP.t('setup.animalImages');
    animalsBtn.addEventListener('click', () => ctx.go('devanimals'));
    devBtns.appendChild(lettersBtn);
    devBtns.appendChild(animalsBtn);
    devTools.appendChild(devBtns);
    inner.appendChild(devTools);

    wrap.appendChild(inner);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.setup = { render };
})(window.APP);

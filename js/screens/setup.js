window.APP = window.APP || {};

(function (APP) {
  // Paint the filled (left) portion of a range input purple on webkit browsers.
  function fillRange(input) {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.background =
      `linear-gradient(to right, #a78bfa ${pct}%, #e0e0e0 ${pct}%)`;
  }

  function makeAudioSection(opts) {
    // opts: { title, muteState, vol, onMuteToggle, onVol }
    const section = document.createElement('div');
    section.className = 'field';

    const titleEl = document.createElement('label');
    titleEl.className = 'field-label';
    titleEl.textContent = opts.title;
    section.appendChild(titleEl);

    const controlRow = document.createElement('div');
    controlRow.className = 'audio-control-row';

    const muteBtn = document.createElement('button');
    muteBtn.type = 'button';
    muteBtn.className = 'btn icon ghost audio-mute-btn';
    muteBtn.setAttribute('aria-label', opts.muteState ? 'Unmute' : 'Mute');
    muteBtn.textContent = opts.muteState ? '🔇' : '🔊';
    muteBtn.addEventListener('click', function () {
      const muted = opts.onMuteToggle();
      muteBtn.textContent = muted ? '🔇' : '🔊';
      muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    });

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = '0';
    slider.max = '1';
    slider.step = '0.05';
    slider.value = String(opts.vol);
    slider.className = 'audio-slider';
    fillRange(slider);
    slider.addEventListener('input', function () {
      fillRange(slider);
      const v = parseFloat(slider.value);
      opts.onVol(v);
      // If slider moves off 0, un-mute icon
      if (v > 0 && muteBtn.textContent === '🔇') {
        muteBtn.textContent = '🔊';
        muteBtn.setAttribute('aria-label', 'Mute');
      } else if (v === 0) {
        muteBtn.textContent = '🔇';
        muteBtn.setAttribute('aria-label', 'Unmute');
      }
    });

    controlRow.appendChild(muteBtn);
    controlRow.appendChild(slider);
    section.appendChild(controlRow);
    return section;
  }

  // Parent gate: hold-to-enter, unlocked once per session (in-memory only).
  let gateUnlocked = false;
  const GATE_HOLD_MS = 3000;

  function renderGate(root, ctx) {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'setup';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('setup.parents'),
      home: true,
      back: true
    }));

    const inner = document.createElement('div');
    inner.className = 'setup-inner gate-inner';

    const title = document.createElement('div');
    title.className = 'gate-title';
    title.textContent = APP.t('setup.gateTitle');
    inner.appendChild(title);

    const hint = document.createElement('div');
    hint.className = 'gate-hint';
    hint.textContent = APP.t('setup.gateHold');
    inner.appendChild(hint);

    const holdBtn = document.createElement('button');
    holdBtn.className = 'gate-hold-btn';
    holdBtn.innerHTML = '🔒<span class="gate-hold-fill"></span>';

    let timer = null;
    function start(e) {
      e.preventDefault();
      if (timer) return;
      holdBtn.classList.add('holding');
      timer = setTimeout(function () {
        timer = null;
        // Guard: the user may have navigated away mid-hold.
        if (!holdBtn.isConnected) return;
        gateUnlocked = true;
        if (APP.audio && APP.audio.sfx && APP.audio.sfx.pop) APP.audio.sfx.pop();
        render(root, ctx);
      }, GATE_HOLD_MS);
    }
    function stop() {
      if (timer) { clearTimeout(timer); timer = null; }
      holdBtn.classList.remove('holding');
    }
    holdBtn.addEventListener('pointerdown', start);
    holdBtn.addEventListener('pointerup', stop);
    holdBtn.addEventListener('pointerleave', stop);
    holdBtn.addEventListener('pointercancel', stop);

    inner.appendChild(holdBtn);
    wrap.appendChild(inner);
    root.appendChild(wrap);
  }

  function render(root, ctx) {
    if (!gateUnlocked) { renderGate(root, ctx); return; }
    root.innerHTML = '';
    const s = APP.state.settings;

    const wrap = document.createElement('div');
    wrap.className = 'setup';

    // Topbar appended to wrap (full-width), not to the inner content column
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('setup.parents'),
      home: true,
      back: true
    }));

    const inner = document.createElement('div');
    inner.className = 'setup-inner';

    // Language selector
    const f0 = document.createElement('div');
    f0.className = 'field';
    f0.innerHTML = `<label class="field-label" for="locale-select">${APP.t('setup.language')}</label>`;
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
      const newList = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
      const newMax  = Math.max(...newList.map(a => a.name.length));
      APP.settings.update({ maxLength: newMax });
      render(root, ctx);
    });
    f0.appendChild(select);
    inner.appendChild(f0);

    // Background Music section
    inner.appendChild(makeAudioSection({
      title: APP.t('setup.music'),
      muteState: s.bgMusicEnabled === false,
      vol: s.bgMusicVol != null ? s.bgMusicVol : 0.3,
      onMuteToggle: function () {
        const nowEnabled = s.bgMusicEnabled === false; // toggling: was disabled → now enable
        APP.settings.update({ bgMusicEnabled: nowEnabled });
        if (APP.audio && APP.audio.music) APP.audio.music.setEnabled(nowEnabled);
        s.bgMusicEnabled = nowEnabled;
        return !nowEnabled; // return muted state
      },
      onVol: function (v) {
        APP.settings.update({ bgMusicVol: v });
        if (APP.audio && APP.audio.music) APP.audio.music.setVol(v);
      }
    }));

    // Sound Effects section
    let sfxPreviewTimer = null;
    inner.appendChild(makeAudioSection({
      title: APP.t('setup.sfx'),
      muteState: s.sfxMuted === true,
      vol: s.sfxVol != null ? s.sfxVol : 0.7,
      onMuteToggle: function () {
        const nowMuted = !(s.sfxMuted === true);
        APP.settings.update({ sfxMuted: nowMuted });
        if (APP.audio && APP.audio.sfx) APP.audio.sfx.setMuted(nowMuted);
        if (!nowMuted && APP.audio) APP.audio.strokeDone();
        s.sfxMuted = nowMuted;
        return nowMuted;
      },
      onVol: function (v) {
        APP.settings.update({ sfxVol: v });
        if (APP.audio && APP.audio.sfx) APP.audio.sfx.setVol(v);
        clearTimeout(sfxPreviewTimer);
        sfxPreviewTimer = setTimeout(function () { if (APP.audio) APP.audio.strokeDone(); }, 80);
      }
    }));

    // Progress reset
    const resetField = document.createElement('div');
    resetField.className = 'field';
    resetField.innerHTML = `<label class="field-label">${APP.t('setup.gallery')}</label>`;
    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.className = 'btn secondary';
    resetBtn.textContent = APP.t('setup.clearGallery', { n: APP.state.completedAnimals.size });
    resetBtn.addEventListener('click', () => {
      if (!confirm(APP.t('setup.clearConfirm'))) return;
      APP.clearProgress();
      APP.clearMastery();
      render(root, ctx);
    });
    resetField.appendChild(resetBtn);
    inner.appendChild(resetField);

    // Dev / review tools
    const devTools = document.createElement('div');
    devTools.className = 'field setup-dev-tools';
    devTools.innerHTML = `<label class="field-label">${APP.t('setup.reviewTools')}</label>`;
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

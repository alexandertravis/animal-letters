window.APP = window.APP || {};

(function (APP) {
  // Paint the filled (left) portion of a range input purple on webkit browsers.
  // Firefox uses ::-moz-range-progress in CSS; this handles Chrome/Safari/Edge.
  function fillRange(input) {
    const pct = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.background =
      `linear-gradient(to right, #a78bfa ${pct}%, #e0e0e0 ${pct}%)`;
  }

  function seg(name, options, current, onPick) {
    const wrap = document.createElement('div');
    wrap.className = 'seg';
    options.forEach(opt => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = opt.label;
      if (opt.value === current) b.classList.add('on');
      b.addEventListener('click', () => onPick(opt.value));
      wrap.appendChild(b);
    });
    return wrap;
  }

  function render(root, ctx) {
    root.innerHTML = '';
    const s = APP.state.settings;

    // Derive min/max from the actual animal list so the slider always reflects
    // what's really available — no magic numbers that drift out of sync.
    const nameLengths = APP.ANIMALS.map(a => a.name.length);
    const minLen = Math.min(...nameLengths);
    const maxLen = Math.max(...nameLengths);

    // .setup is full-width so the scrollbar reaches the screen edge.
    // .setup-inner is the centred content column.
    const wrap = document.createElement('div');
    wrap.className = 'setup';

    const inner = document.createElement('div');
    inner.className = 'setup-inner';

    // Topbar: home icon + title
    const topbar = document.createElement('div');
    topbar.className = 'setup-topbar';
    topbar.innerHTML = `
      <button class="btn icon ghost" id="setup-home" aria-label="Home">${APP.ICONS.home}</button>
      <h2>Settings</h2>
    `;
    topbar.querySelector('#setup-home').addEventListener('click', () => ctx.go('landing'));
    inner.appendChild(topbar);

    // Max name length
    const f1 = document.createElement('div');
    f1.className = 'field';
    f1.innerHTML = `
      <label>Longest animal name to use: <span class="lengthValue">${s.maxLength}</span> letters</label>
      <input type="range" min="${minLen}" max="${maxLen}" step="1" value="${s.maxLength}"/>
    `;
    const range = f1.querySelector('input');
    const lengthValue = f1.querySelector('.lengthValue');
    fillRange(range);
    range.addEventListener('input', () => {
      const v = range.valueAsNumber;
      APP.settings.update({ maxLength: v });
      lengthValue.textContent = v;
      fillRange(range);
    });
    inner.appendChild(f1);

    // Letter case
    const f2 = document.createElement('div');
    f2.className = 'field';
    f2.innerHTML = `<label>Letter style</label>`;
    f2.appendChild(seg('case', [
      { value: 'upper',  label: 'ABC (uppercase)' },
      { value: 'proper', label: 'Abc (proper case)' },
      { value: 'lower',  label: 'abc (lowercase)' }
    ], s.letterCase, v => { APP.settings.update({ letterCase: v }); render(root, ctx); }));
    inner.appendChild(f2);

    // Depiction
    const f3 = document.createElement('div');
    f3.className = 'field';
    f3.innerHTML = `<label>Animal pictures</label>`;
    f3.appendChild(seg('depict', [
      { value: 'cartoon', label: 'Cartoon' },
      { value: 'realistic', label: 'Realistic' }
    ], s.depiction, v => { APP.settings.update({ depiction: v }); render(root, ctx); }));
    inner.appendChild(f3);

    // Reveal mode
    const f4 = document.createElement('div');
    f4.className = 'field';
    f4.innerHTML = `<label>Show the word as you build it</label>`;
    f4.appendChild(seg('reveal', [
      { value: 'faint', label: 'Faint → bold' },
      { value: 'hidden', label: 'Hidden → reveal' }
    ], s.revealMode, v => { APP.settings.update({ revealMode: v }); render(root, ctx); }));
    inner.appendChild(f4);

    // Volume
    const f5 = document.createElement('div');
    f5.className = 'field';
    f5.innerHTML = `<label>Volume</label>`;

    const volRow = document.createElement('div');
    volRow.className = 'volume-row';

    const muteBtn = document.createElement('button');
    muteBtn.type = 'button';
    muteBtn.className = 'btn icon ghost mute-btn';
    muteBtn.setAttribute('aria-label', 'Toggle mute');

    const volSlider = document.createElement('input');
    volSlider.type  = 'range';
    volSlider.min   = '0';
    volSlider.max   = '100';
    volSlider.step  = '1';
    volSlider.value = String(Math.round(s.volume * 100));
    fillRange(volSlider);

    function refreshMuteBtn() {
      const muted = APP.state.settings.muted || APP.state.settings.volume < 0.01;
      muteBtn.innerHTML = muted ? APP.ICONS.volumeOff : APP.ICONS.volumeOn;
      volRow.classList.toggle('muted', muted);
    }
    refreshMuteBtn();

    muteBtn.addEventListener('click', () => {
      APP.audio.setMuted(!APP.state.settings.muted);
      refreshMuteBtn();
      // Play a preview tone so the user hears the result of un-muting.
      if (!APP.state.settings.muted) APP.audio.strokeDone();
    });

    // Debounce the preview tone slightly so rapid dragging doesn't stack up.
    let volPreviewTimer = null;
    volSlider.addEventListener('input', () => {
      const v = volSlider.valueAsNumber / 100;
      APP.audio.setVolume(v);
      refreshMuteBtn();
      fillRange(volSlider);
      clearTimeout(volPreviewTimer);
      volPreviewTimer = setTimeout(() => APP.audio.strokeDone(), 80);
    });

    volRow.appendChild(muteBtn);
    volRow.appendChild(volSlider);
    f5.appendChild(volRow);
    inner.appendChild(f5);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'actions';
    const back = document.createElement('button');
    back.className = 'btn secondary';
    back.textContent = 'Back';
    back.addEventListener('click', () => {
      const prev = APP.state.previousScreen;
      ctx.go(prev && prev !== 'setup' ? prev : 'landing');
    });
    const start = document.createElement('button');
    start.className = 'btn';
    start.textContent = 'New Game';
    start.addEventListener('click', () => {
      const animal = APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal);
      if (!animal) {
        alert('No animals fit that length. Try a longer name length.');
        return;
      }
      APP.startGame(animal);
      ctx.go('game');
    });
    actions.appendChild(back);
    actions.appendChild(start);
    inner.appendChild(actions);

    // Dev / review tools
    const devTools = document.createElement('div');
    devTools.className = 'field setup-dev-tools';
    devTools.innerHTML = `<label>Review tools</label>`;
    const devBtns = document.createElement('div');
    devBtns.className = 'seg';
    const lettersBtn = document.createElement('button');
    lettersBtn.type = 'button';
    lettersBtn.textContent = 'Letter Patterns';
    lettersBtn.addEventListener('click', () => ctx.go('letters'));
    const animalsBtn = document.createElement('button');
    animalsBtn.type = 'button';
    animalsBtn.textContent = 'Animal Images';
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

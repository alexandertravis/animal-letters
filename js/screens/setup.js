window.APP = window.APP || {};

(function (APP) {
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

    const wrap = document.createElement('div');
    wrap.className = 'setup';

    // Topbar: home icon + title
    const topbar = document.createElement('div');
    topbar.className = 'setup-topbar';
    topbar.innerHTML = `
      <button class="btn icon ghost" id="setup-home" aria-label="Home">&#8962;</button>
      <h2>Settings</h2>
    `;
    topbar.querySelector('#setup-home').addEventListener('click', () => ctx.go('landing'));
    wrap.appendChild(topbar);

    // Max name length
    const f1 = document.createElement('div');
    f1.className = 'field';
    f1.innerHTML = `
      <label>Longest animal name to use: <span class="lengthValue">${s.maxLength}</span> letters</label>
      <input type="range" min="${minLen}" max="${maxLen}" step="1" value="${s.maxLength}"/>
    `;
    const range = f1.querySelector('input');
    const lengthValue = f1.querySelector('.lengthValue');
    range.addEventListener('input', () => {
      const v = parseInt(range.value, 10);
      APP.settings.update({ maxLength: v });
      lengthValue.textContent = v;
    });
    wrap.appendChild(f1);

    // Letter case
    const f2 = document.createElement('div');
    f2.className = 'field';
    f2.innerHTML = `<label>Letter style</label>`;
    f2.appendChild(seg('case', [
      { value: 'upper',  label: 'ABC (uppercase)' },
      { value: 'proper', label: 'Abc (proper case)' },
      { value: 'lower',  label: 'abc (lowercase)' }
    ], s.letterCase, v => { APP.settings.update({ letterCase: v }); render(root, ctx); }));
    wrap.appendChild(f2);

    // Depiction
    const f3 = document.createElement('div');
    f3.className = 'field';
    f3.innerHTML = `<label>Animal pictures</label>`;
    f3.appendChild(seg('depict', [
      { value: 'cartoon', label: 'Cartoon' },
      { value: 'realistic', label: 'Realistic' }
    ], s.depiction, v => { APP.settings.update({ depiction: v }); render(root, ctx); }));
    wrap.appendChild(f3);

    // Reveal mode
    const f4 = document.createElement('div');
    f4.className = 'field';
    f4.innerHTML = `<label>Show the word as you build it</label>`;
    f4.appendChild(seg('reveal', [
      { value: 'faint', label: 'Faint → bold' },
      { value: 'hidden', label: 'Hidden → reveal' }
    ], s.revealMode, v => { APP.settings.update({ revealMode: v }); render(root, ctx); }));
    wrap.appendChild(f4);

    // Actions
    const actions = document.createElement('div');
    actions.className = 'actions';
    const back = document.createElement('button');
    back.className = 'btn ghost';
    back.textContent = 'Back';
    back.addEventListener('click', () => ctx.go(APP.state.sessionExists ? 'game' : 'landing'));
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
    wrap.appendChild(actions);

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
    wrap.appendChild(devTools);

    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.setup = { render };
})(window.APP);

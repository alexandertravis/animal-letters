window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'landing';
    wrap.innerHTML = `
      <h1>${APP.t('landing.title')}</h1>
      <p class="subtitle">${APP.t('landing.subtitle')}</p>
      <div class="menu">
        <button class="btn" data-act="new">${APP.t('landing.newGame')}</button>
        <button class="btn secondary" data-act="continue" ${APP.state.sessionExists ? '' : 'disabled'}>${APP.t('landing.continue')}</button>
        <button class="btn secondary" data-act="gallery">${APP.t('landing.myAnimals')}</button>
        <button class="btn secondary" data-act="library">${APP.t('landing.library')}</button>
        <button class="btn secondary" data-act="progress">${APP.t('landing.progress')}</button>
        <button class="btn secondary" data-act="numbers">${APP.t('landing.numbers')}</button>
        <button class="btn secondary" data-act="painting">${APP.t('landing.painting')}</button>
        <button class="btn secondary" data-act="puzzles">${APP.t('landing.puzzles')}</button>
        <button class="btn secondary" data-act="recipes">${APP.t('landing.recipes')}</button>
        <button class="btn ghost" data-act="settings">${APP.t('landing.settings')}</button>
      </div>
    `;
    root.appendChild(wrap);

    wrap.querySelector('[data-act=new]').addEventListener('click', () => {
      const animal = APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal);
      if (!animal) { ctx.go('setup'); return; } // fallback: open settings if nothing fits
      APP.startGame(animal);
      const mode = APP.state.settings.gameMode || 'trace';
      ctx.go(mode === 'find' ? 'findletter' : 'game');
    });
    const cont = wrap.querySelector('[data-act=continue]');
    if (cont && !cont.disabled) {
      cont.addEventListener('click', () => {
        const mode = APP.state.settings.gameMode || 'trace';
        ctx.go(mode === 'find' ? 'findletter' : 'game');
      });
    }
    wrap.querySelector('[data-act=gallery]').addEventListener('click', () => ctx.go('gallery'));
    wrap.querySelector('[data-act=library]').addEventListener('click', () => ctx.go('library'));
    wrap.querySelector('[data-act=progress]').addEventListener('click', () => ctx.go('progress'));
    wrap.querySelector('[data-act=numbers]').addEventListener('click', () => ctx.go('numbers'));
    wrap.querySelector('[data-act=painting]').addEventListener('click', () => ctx.go('painting'));
    wrap.querySelector('[data-act=puzzles]').addEventListener('click', () => ctx.go('puzzles'));
    wrap.querySelector('[data-act=recipes]').addEventListener('click', () => ctx.go('recipes'));
    wrap.querySelector('[data-act=settings]').addEventListener('click', () => ctx.go('setup'));
  }

  APP.screens = APP.screens || {};
  APP.screens.landing = { render };
})(window.APP);

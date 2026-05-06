window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'landing';
    wrap.innerHTML = `
      <h1>Animal Letters</h1>
      <p class="subtitle">Trace the letters. Meet the animal!</p>
      <div class="menu">
        <button class="btn" data-act="new">New Game</button>
        <button class="btn secondary" data-act="continue" ${APP.state.sessionExists ? '' : 'disabled'}>Continue</button>
        <button class="btn secondary" data-act="gallery">My Animals</button>
        <button class="btn ghost" data-act="settings">Settings</button>
      </div>
    `;
    root.appendChild(wrap);

    wrap.querySelector('[data-act=new]').addEventListener('click', () => {
      const animal = APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal);
      if (!animal) { ctx.go('setup'); return; } // fallback: open settings if nothing fits
      APP.startGame(animal);
      ctx.go('game');
    });
    const cont = wrap.querySelector('[data-act=continue]');
    if (cont && !cont.disabled) {
      cont.addEventListener('click', () => {
        if (APP.state.currentAnimal && APP.state.letterIndex < APP.state.currentAnimal.name.length) {
          ctx.go('game');
        } else {
          ctx.go('setup');
        }
      });
    }
    wrap.querySelector('[data-act=gallery]').addEventListener('click', () => ctx.go('gallery'));
    wrap.querySelector('[data-act=settings]').addEventListener('click', () => ctx.go('setup'));
  }

  APP.screens = APP.screens || {};
  APP.screens.landing = { render };
})(window.APP);

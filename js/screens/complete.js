window.APP = window.APP || {};

(function (APP) {
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
    body.innerHTML = `
      <h1>Hooray!</h1>
      <div class="animalName">${animal.displayName.toUpperCase()}</div>
      <div class="animalImg" id="animalImg"></div>
      <div class="actions">
        <button class="btn" data-act="next">Next animal</button>
        <button class="btn secondary" data-act="gallery">My Animals</button>
        <button class="btn secondary" data-act="replay">Play sound</button>
      </div>
    `;
    wrap.appendChild(body);
    root.appendChild(wrap);

    bar.querySelector('[data-act=home]').addEventListener('click', () => {
      APP.audio.stopFile();
      ctx.go('landing');
    });
    bar.querySelector('[data-act=settings]').addEventListener('click', () => {
      APP.audio.stopFile();
      ctx.go('setup');
    });

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
      if (!next) { ctx.go('landing'); return; }
      APP.startGame(next);
      ctx.go('game');
    });
    wrap.querySelector('[data-act=gallery]').addEventListener('click', () => { APP.audio.stopFile(); ctx.go('gallery'); });
    wrap.querySelector('[data-act=replay]').addEventListener('click', () => APP.audio.playComplete(animal.audio));
  }

  APP.screens = APP.screens || {};
  APP.screens.complete = { render };
})(window.APP);

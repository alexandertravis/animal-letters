window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    const animal = APP.state.currentAnimal;
    if (!animal) { ctx.go('landing'); return; }

    const wrap = document.createElement('div');
    wrap.className = 'complete';

    const imgSrc = animal.images[APP.state.settings.depiction] || animal.images.cartoon;

    wrap.innerHTML = `
      <h1>Hooray!</h1>
      <div class="animalName">${animal.displayName.toUpperCase()}</div>
      <div class="animalImg" id="animalImg"></div>
      <div class="actions">
        <button class="btn" data-act="next">Next animal</button>
        <button class="btn secondary" data-act="replay">Play sound</button>
        <button class="btn ghost" data-act="home">Home</button>
      </div>
    `;
    root.appendChild(wrap);

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
    wrap.querySelector('[data-act=replay]').addEventListener('click', () => APP.audio.playComplete(animal.audio));
    wrap.querySelector('[data-act=home]').addEventListener('click', () => {
      APP.audio.stopFile();
      ctx.go('landing');
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.complete = { render };
})(window.APP);

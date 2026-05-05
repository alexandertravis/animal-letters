window.APP = window.APP || {};

(function (APP) {
  let activeTracer = null;

  function caseOf(name) {
    return APP.state.settings.letterCase === 'lower' ? name.toLowerCase() : name.toUpperCase();
  }

  function buildStrip(animal) {
    const strip = document.createElement('div');
    strip.className = 'strip';
    const name = caseOf(animal.name);
    const reveal = APP.state.settings.revealMode;
    for (let i = 0; i < name.length; i++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.textContent = name[i];
      if (i < APP.state.letterIndex) {
        tile.classList.add('done');
      } else if (reveal === 'faint') {
        tile.classList.add('faint');
      } else {
        tile.classList.add('hidden');
      }
      strip.appendChild(tile);
    }
    return strip;
  }

  function render(root, ctx) {
    if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
    root.innerHTML = '';

    const animal = APP.state.currentAnimal;
    if (!animal) { ctx.go('landing'); return; }

    const wrap = document.createElement('div');
    wrap.className = 'game';

    // Top bar
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" data-act="home" aria-label="Home">&#8962;</button>
      </div>
      <div class="group">
        <button class="btn ghost" data-act="restart">Restart letter</button>
        <button class="btn ghost" data-act="skip">Skip animal</button>
      </div>
    `;
    wrap.appendChild(bar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'stage';
    wrap.appendChild(stage);

    // Strip
    wrap.appendChild(buildStrip(animal));

    root.appendChild(wrap);

    // Wire bar buttons
    bar.querySelector('[data-act=home]').addEventListener('click', () => {
      if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
      ctx.go('landing');
    });
    bar.querySelector('[data-act=restart]').addEventListener('click', () => mountCurrentLetter(stage, ctx));
    bar.querySelector('[data-act=skip]').addEventListener('click', () => {
      if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
      APP.skipAnimal();
      ctx.go('complete');
    });

    mountCurrentLetter(stage, ctx);
  }

  function mountCurrentLetter(stage, ctx) {
    if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
    const animal = APP.state.currentAnimal;
    const rawChar = animal.name[APP.state.letterIndex];
    const ch = APP.state.settings.letterCase === 'lower' ? rawChar.toLowerCase() : rawChar.toUpperCase();
    activeTracer = APP.tracer.mount(stage, ch, {
      onComplete: () => {
        APP.advanceLetter();
        if (APP.state.screen === 'complete') {
          ctx.go('complete');
        } else {
          // Re-render to update strip + load next letter
          ctx.go('game');
        }
      }
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.game = { render };
})(window.APP);

window.APP = window.APP || {};

(function (APP) {
  let activeTracer = null;

  function caseOf(name) {
    const lc = APP.state.settings.letterCase;
    if (lc === 'lower')  return name.toLowerCase();
    if (lc === 'proper') return name[0].toUpperCase() + name.slice(1).toLowerCase();
    return name.toUpperCase();
  }

  // Calculate tile dimensions so all letters fit in one row regardless of name length.
  // Available width = viewport width minus strip horizontal padding (16px each side).
  function tileMetrics(nameLength) {
    const available = Math.min(window.innerWidth, 760) - 32;
    const gap = 6;
    const naturalW = 56;
    const tileW = Math.min(naturalW, Math.floor((available - (nameLength - 1) * gap) / nameLength));
    const tileH = Math.round(tileW * (72 / 56));          // keep natural aspect ratio
    const fontSize = ((tileW / naturalW) * 2.4).toFixed(2); // scale 2.4rem linearly
    return { tileW, tileH, fontSize: `${fontSize}rem`, gap };
  }

  function buildStrip(animal) {
    const strip = document.createElement('div');
    strip.className = 'strip';
    const name = caseOf(animal.name);
    const reveal = APP.state.settings.revealMode;
    const { tileW, tileH, fontSize, gap } = tileMetrics(name.length);
    strip.style.gap = `${gap}px`;

    for (let i = 0; i < name.length; i++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.textContent = name[i];
      tile.style.width    = `${tileW}px`;
      tile.style.height   = `${tileH}px`;
      tile.style.fontSize = fontSize;
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

    // Animal already fully traced (e.g. user pressed Home on the complete screen
    // then hit Continue). Silently start the next animal instead of showing a
    // blank strip with nothing left to trace.
    if (APP.state.letterIndex >= animal.name.length) {
      const next = APP.animals.pickRandom(APP.state.settings.maxLength, animal);
      if (!next) { ctx.go('landing'); return; }
      APP.startGame(next);
      render(root, ctx);
      return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'game';

    // Top bar
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" data-act="home" aria-label="Home">${APP.ICONS.home}</button>
        <button class="btn icon ghost" data-act="settings" aria-label="Settings">${APP.ICONS.settings}</button>
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
    bar.querySelector('[data-act=settings]').addEventListener('click', () => {
      if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
      ctx.go('setup');
    });
    bar.querySelector('[data-act=restart]').addEventListener('click', () => mountCurrentLetter(stage, ctx));
    bar.querySelector('[data-act=skip]').addEventListener('click', () => {
      if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
      APP.skipAnimal();
      // skipAnimal picks a new animal (no complete screen) or falls back to landing.
      ctx.go(APP.state.screen === 'landing' ? 'landing' : 'game');
    });

    mountCurrentLetter(stage, ctx);
  }

  function mountCurrentLetter(stage, ctx) {
    if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
    const animal = APP.state.currentAnimal;
    const rawChar = animal.name[APP.state.letterIndex];
    const lc = APP.state.settings.letterCase;
    let ch;
    if (lc === 'lower')       ch = rawChar.toLowerCase();
    else if (lc === 'proper') ch = APP.state.letterIndex === 0 ? rawChar.toUpperCase() : rawChar.toLowerCase();
    else                      ch = rawChar.toUpperCase();
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

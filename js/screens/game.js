window.APP = window.APP || {};

(function (APP) {
  let activeTracer = null;

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
    const name = APP.caseOf(animal.name);
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

    let animal = APP.state.currentAnimal;
    if (!animal) { ctx.go('landing'); return; }

    // Animal already fully traced (e.g. user pressed Home on the complete screen
    // then hit Continue). Silently start the next animal instead of showing a
    // blank strip with nothing left to trace.
    // Uses a loop rather than recursion — avoids stack growth if somehow
    // startGame produces another exhausted animal (impossible with current data
    // but defensive programming against future edge cases).
    while (APP.state.letterIndex >= animal.name.length) {
      const next = APP.animals.pickNext(APP.state.settings.maxLength, animal);
      if (!next) { ctx.go('landing'); return; }
      APP.startGame(next);
      animal = APP.state.currentAnimal; // re-read after startGame resets letterIndex
    }

    const wrap = document.createElement('div');
    wrap.className = 'game';

    // Top bar
    const bar = document.createElement('div');
    bar.className = 'topbar';
    const volPct = Math.round((APP.state.settings.volume || 0.7) * 100);
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" data-act="home" aria-label="Home">${APP.ICONS.home}</button>
        <button class="btn icon ghost" data-act="settings" aria-label="Settings">${APP.ICONS.settings}</button>
      </div>
      <div class="group vol-ctrl">
        <button class="btn icon ghost" data-act="mute" aria-label="Mute">${APP.state.settings.muted ? APP.ICONS.volumeOff : APP.ICONS.volumeOn}</button>
        <input type="range" class="vol-slider" min="0" max="100" step="1" value="${volPct}" aria-label="Volume">
      </div>
      <div class="group">
        <button class="btn ghost" data-act="restart">${APP.t('game.restart')}</button>
        <button class="btn ghost" data-act="skip">${APP.t('game.skip')}</button>
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

    // Volume / mute controls
    const muteBtn   = bar.querySelector('[data-act=mute]');
    const volSlider = bar.querySelector('.vol-slider');
    function refreshMute() {
      muteBtn.innerHTML = APP.state.settings.muted ? APP.ICONS.volumeOff : APP.ICONS.volumeOn;
    }
    muteBtn.addEventListener('click', () => {
      APP.audio.setMuted(!APP.state.settings.muted);
      refreshMute();
    });
    volSlider.addEventListener('input', () => {
      APP.audio.setVolume(volSlider.valueAsNumber / 100);
      refreshMute();
    });

    mountCurrentLetter(stage, ctx);
  }

  function mountCurrentLetter(stage, ctx) {
    if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
    const animal = APP.state.currentAnimal;
    // APP.caseOf applied to the full name ensures the per-character case (including
    // the 'proper' first-letter rule) is defined in exactly one place.
    const ch = APP.caseOf(animal.name)[APP.state.letterIndex];

    // Announce the letter as soon as it appears so the child knows what to trace.
    APP.audio.speakLetter(ch, APP.state.settings.locale);

    activeTracer = APP.tracer.mount(stage, ch, {
      onComplete: (score) => {
        const completedChar = APP.caseOf(animal.name)[APP.state.letterIndex]; // capture before advance

        // Compute stars for mastery: use accuracy score if available (Feature 3),
        // otherwise fall back to attempt-count heuristic.
        let masteryStars;
        if (score != null) {
          const cfg = APP.TRACER_CONFIG || {};
          masteryStars = score >= (cfg.SCORE_3STAR || 85) ? 3 : score >= (cfg.SCORE_2STAR || 60) ? 2 : 1;
        } else {
          const existing = APP.state.letterMastery[completedChar];
          const attempts = existing ? existing.attempts + 1 : 1;
          masteryStars = attempts >= 5 ? 3 : attempts >= 3 ? 2 : 1;
        }

        APP.recordLetterTrace(completedChar, masteryStars);
        APP.advanceLetter();
        // Speak the completed letter as confirmation, then pause so the speech
        // finishes before the next letter (or complete screen) renders.
        // Without the delay the new screen cancels the utterance mid-word.
        APP.audio.speakLetter(completedChar, APP.state.settings.locale);
        const delay = (APP.TRACER_CONFIG && APP.TRACER_CONFIG.PHONICS_ADVANCE_DELAY) || 700;
        setTimeout(() => {
          if (APP.state.screen === 'complete') {
            ctx.go('complete');
          } else {
            // Re-render to update strip + load next letter
            ctx.go('game');
          }
        }, delay);
      }
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.game = { render };
})(window.APP);

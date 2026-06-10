window.APP = window.APP || {};

(function (APP) {
  let activeTracer = null;
  let _advanceTimer = null;

  // Calculate tile dimensions so all letters fit in one row regardless of name length.
  // Available width = viewport width minus strip horizontal padding (16px each side).
  function tileMetrics(nameLength) {
    const available = Math.min(window.innerWidth, 760) - 32;
    const gap = 6;
    const naturalW = 56;
    // In landscape (short viewport) use smaller tiles so the tracing stage gets more height
    const isLandscape = APP.ui ? APP.ui.isShortLandscape() : window.innerHeight < 600;
    const maxW = isLandscape ? 40 : naturalW;
    const tileW = Math.min(maxW, Math.floor((available - (nameLength - 1) * gap) / nameLength));
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

    // Build letters schema for settings gear
    const list = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
    const lens = list.map(function(a) { return a.name.length; });
    const minLen = Math.min.apply(null, lens);
    const maxLen = Math.max.apply(null, lens);
    const lettersSchema = [
      { type: 'slider', key: 'maxLength', label: APP.t('setup.nameLength', { n: String(APP.state.settings.maxLength) }), min: minLen, max: maxLen, step: 1,
        display: function(raw) { return Math.round(raw); } },
      { type: 'segmented', key: 'letterCase', label: APP.t('setup.letterStyle'), options: [
          { value: 'upper',  label: APP.t('setup.case.upper') },
          { value: 'proper', label: APP.t('setup.case.proper') },
          { value: 'lower',  label: APP.t('setup.case.lower') }
      ]},
      { type: 'segmented', key: 'depiction', label: APP.t('setup.pictures'), options: [
          { value: 'cartoon',   label: APP.t('setup.cartoon') },
          { value: 'realistic', label: APP.t('setup.realistic') }
      ]},
      { type: 'segmented', key: 'revealMode', label: APP.t('setup.reveal'), options: [
          { value: 'faint',  label: APP.t('setup.faint') },
          { value: 'hidden', label: APP.t('setup.hidden') }
      ]},
      { type: 'toggle', key: 'phonics', label: APP.t('settings.phonics') }
    ];

    // SFX mute toggle button (goes into topbar right group)
    const sfxBtn = document.createElement('button');
    sfxBtn.className = 'btn icon ghost';
    sfxBtn.innerHTML = APP.state.settings.sfxMuted ? APP.ICONS.volumeOff : APP.ICONS.volumeOn;
    sfxBtn.setAttribute('aria-label', APP.state.settings.sfxMuted ? 'Unmute' : 'Mute');
    sfxBtn.addEventListener('click', function() {
      const nowMuted = !APP.state.settings.sfxMuted;
      APP.settings.update({ sfxMuted: nowMuted });
      sfxBtn.innerHTML = nowMuted ? APP.ICONS.volumeOff : APP.ICONS.volumeOn;
      sfxBtn.setAttribute('aria-label', nowMuted ? 'Unmute' : 'Mute');
      if (APP.audio.sfx && APP.audio.sfx.setMuted) APP.audio.sfx.setMuted(nowMuted);
    });

    // Skip button (goes into topbar right group)
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn icon ghost';
    skipBtn.innerHTML = APP.ICONS.skip;
    skipBtn.setAttribute('aria-label', APP.t('game.skip'));
    skipBtn.addEventListener('click', function() {
      if (_advanceTimer) { clearTimeout(_advanceTimer); _advanceTimer = null; }
      if (activeTracer) { activeTracer.destroy(); activeTracer = null; }
      APP.skipAnimal();
      // skipAnimal picks a new animal (no complete screen) or falls back to landing.
      ctx.go(APP.state.screen === 'landing' ? 'landing' : 'game');
    });

    // Standard topbar: home, no back, settings gear, sfx mute + skip on right
    const bar = APP.ui.topbar({
      ctx: ctx,
      title: '',
      home: true,
      back: false,
      onRestart: function() { mountCurrentLetter(stage, ctx); },
      settings: {
        gameId: 'letters',
        title: APP.t('setup.title'),
        schema: lettersSchema,
        onChange: function(key, val) {
          APP.settings.update({ [key]: val });
        }
      },
      right: [sfxBtn, skipBtn]
    });
    wrap.appendChild(bar);

    // Stage
    const stage = document.createElement('div');
    stage.className = 'stage';
    wrap.appendChild(stage);

    // Strip
    wrap.appendChild(buildStrip(animal));

    root.appendChild(wrap);

    mountCurrentLetter(stage, ctx);
  }

  function mountCurrentLetter(stage, ctx) {
    if (_advanceTimer) { clearTimeout(_advanceTimer); _advanceTimer = null; }
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
        _advanceTimer = setTimeout(() => {
          _advanceTimer = null;
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

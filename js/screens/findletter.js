window.APP = window.APP || {};

(function (APP) {

  let confettiCleanup = null;
  let _advanceTimer = null;

  // Inline speakLetter fallback (removed once feature/phonics merges)
  function speakLetter(char, locale) {
    if (APP.audio && typeof APP.audio.speakLetter === 'function') {
      APP.audio.speakLetter(char, locale);
      return;
    }
    if (!window.speechSynthesis) return;
    if (APP.state.settings.muted) return;
    const utt = new SpeechSynthesisUtterance(char);
    const langMap = { en: 'en-GB', pt: 'pt-PT', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', it: 'it-IT' };
    utt.lang = langMap[locale || 'en'] || 'en-GB';
    utt.rate = 0.85;
    utt.volume = APP.state.settings.volume != null ? APP.state.settings.volume : 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(utt);
  }

  // Build the letter strip (mirrors game.js buildStrip)
  function buildStrip(animal) {
    const strip = document.createElement('div');
    strip.className = 'strip';
    const name = APP.caseOf(animal.name);
    const available = Math.min(window.innerWidth, 760) - 32;
    const gap = 6;
    const naturalW = 56;
    // In landscape (short viewport) use smaller tiles
    const isLandscape = APP.ui ? APP.ui.isShortLandscape() : window.innerHeight < 600;
    const maxW = isLandscape ? 40 : naturalW;
    const tileW = Math.min(maxW, Math.floor((available - (name.length - 1) * gap) / name.length));
    const tileH = Math.round(tileW * (72 / 56));
    const fontSize = ((tileW / naturalW) * 2.4).toFixed(2) + 'rem';
    const reveal = APP.state.settings.revealMode;
    strip.style.gap = gap + 'px';

    for (let i = 0; i < name.length; i++) {
      const tile = document.createElement('div');
      tile.className = 'tile';
      tile.textContent = name[i];
      tile.style.width = tileW + 'px';
      tile.style.height = tileH + 'px';
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

  // Compute the SVG transform string for a character (matches letters.js letterTransform)
  function letterTransform(char) {
    const data = APP.getLetter(char);
    if (data && data.coords === 'display') {
      return 'translate(0,0) scale(1,1)';
    }
    const { a, b } = APP.getLetterYTransform(char);
    const isUpper = APP.isUpperLetter(char);
    const M = APP.LETTER_METRICS;
    const xScale  = isUpper ? M.X_SCALE_UP  : M.X_SCALE_LOW;
    const xOffset = M.X_CENTER * (1 - xScale);
    return 'translate(' + xOffset + ',' + b.toFixed(3) + ') scale(' + xScale + ',' + a.toFixed(6) + ')';
  }

  // Render a letter as a small SVG for the choice tile (outline + ghost, no guidelines)
  function letterTileSVG(ch) {
    const isUpper = APP.isUpperLetter(ch);
    const data = APP.getLetter(ch);

    if (!data) {
      // Fallback: plain text SVG
      const svg = APP.svgEl('svg', { viewBox: '0 0 200 220', width: '100%', height: '100%' });
      svg.appendChild(APP.svgEl('text', {
        x: 100, y: 130, 'text-anchor': 'middle',
        'font-size': 140, 'font-weight': 800, fill: '#001858',
        'font-family': 'Quicksand, sans-serif'
      }, ch));
      return svg;
    }

    const cfg = APP.TRACER_CONFIG || {};
    const SW = isUpper ? (cfg.SW_UP || 36) : (cfg.SW_LOW || 24);
    const sessionVb = APP.getSessionViewBox(isUpper, ch);
    const svg = APP.svgEl('svg', {
      viewBox: sessionVb,
      preserveAspectRatio: 'xMidYMid meet',
      width: '100%',
      height: '100%'
    });

    const transform = letterTransform(ch);

    // Outline: wider dark stroke — border ring visible around the ghost
    const outline = APP.svgEl('g', {
      stroke: '#001858', 'stroke-width': SW + 8,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: transform
    });

    // Ghost: solid light grey covers the outline interior
    const ghost = APP.svgEl('g', {
      stroke: '#dde0ea', 'stroke-width': SW,
      fill: 'none', 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      transform: transform
    });

    data.strokes.forEach(function (s) {
      if (!APP.isDot(s.d)) {
        outline.appendChild(APP.svgEl('path', { d: s.d }));
        ghost.appendChild(APP.svgEl('path', { d: s.d }));
      }
    });

    svg.appendChild(outline);
    svg.appendChild(ghost);

    // Dot strokes: render as circles outside the transform group (matches letters.js)
    data.strokes.forEach(function (s) {
      if (!APP.isDot(s.d)) return;
      const data2 = APP.getLetter(ch);
      if (!data2) return;
      const isD = data2.coords === 'display';
      let pos;
      if (isD) {
        const m = s.d.match(/M\s*([\d.-]+)[,\s]+([\d.-]+)/);
        pos = m ? { x: parseFloat(m[1]), y: parseFloat(m[2]) } : null;
      } else {
        const M = APP.LETTER_METRICS;
        const xScale  = isUpper ? M.X_SCALE_UP  : M.X_SCALE_LOW;
        const xOffset = M.X_CENTER * (1 - xScale);
        const { a, b } = APP.getLetterYTransform(ch);
        pos = APP.dotTransformPos(s.d, xScale, xOffset, a, b);
      }
      if (pos) {
        svg.appendChild(APP.svgEl('circle', { cx: pos.x, cy: pos.y, r: (SW + 8) / 2, fill: '#001858' }));
        svg.appendChild(APP.svgEl('circle', { cx: pos.x, cy: pos.y, r: SW / 2, fill: '#dde0ea' }));
      }
    });

    return svg;
  }

  // Pick 3 random distractor letters (same case as target)
  function pickDistractors(target, isUpper) {
    const pool = [];
    for (let i = 65; i <= 90; i++) {
      const ch = isUpper ? String.fromCharCode(i) : String.fromCharCode(i + 32);
      if (ch !== target) pool.push(ch);
    }
    // Fisher-Yates shuffle
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, 3);
  }

  function render(root, ctx) {
    if (confettiCleanup) { confettiCleanup(); confettiCleanup = null; }
    root.innerHTML = '';

    let animal = APP.state.currentAnimal;
    if (!animal) { ctx.go('landing'); return; }

    // Guard: if animal is already fully done, start next
    while (APP.state.letterIndex >= animal.name.length) {
      const next = APP.animals.pickNext
        ? APP.animals.pickNext(APP.state.settings.maxLength, animal)
        : APP.animals.pickRandom(APP.state.settings.maxLength, animal);
      if (!next) { ctx.go('landing'); return; }
      APP.startGame(next);
      animal = APP.state.currentAnimal;
    }

    const wrap = document.createElement('div');
    wrap.className = 'game'; // reuse game layout styles

    // Top bar
    const target = APP.caseOf(animal.name)[APP.state.letterIndex];
    const locale = APP.state.settings.locale || 'en';

    // SFX mute toggle button
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

    // Speak button
    const speakBtn = document.createElement('button');
    speakBtn.className = 'btn icon ghost';
    speakBtn.innerHTML = APP.ICONS.volumeOn;
    speakBtn.setAttribute('aria-label', 'Repeat');
    speakBtn.addEventListener('click', function() {
      speakLetter(target, locale);
    });

    // Skip button
    const skipBtn = document.createElement('button');
    skipBtn.className = 'btn ghost';
    skipBtn.textContent = APP.t('game.skip');
    skipBtn.addEventListener('click', function() {
      if (_advanceTimer) { clearTimeout(_advanceTimer); _advanceTimer = null; }
      APP.skipAnimal();
      ctx.go(APP.state.screen === 'landing' ? 'landing' : 'findletter');
    });

    const bar = APP.ui.topbar({
      ctx: ctx,
      title: '',
      home: true,
      back: false,
      right: [sfxBtn, speakBtn, skipBtn]
    });
    wrap.appendChild(bar);

    // Stage — find prompt + choice grid
    const stage = document.createElement('div');
    stage.className = 'stage';
    stage.style.display = 'flex';
    stage.style.flexDirection = 'column';
    stage.style.alignItems = 'center';
    stage.style.justifyContent = 'center';

    // Prompt label
    const prompt = document.createElement('div');
    prompt.className = 'find-prompt';
    prompt.innerHTML = (APP.t ? APP.t('settings.gameMode.find') : 'Find') + ': <strong>' + target + '</strong>';
    stage.appendChild(prompt);

    // Choice grid
    const isUpper = APP.isUpperLetter(target);
    const distractors = pickDistractors(target, isUpper);
    const choices = [target].concat(distractors).sort(function () { return Math.random() - 0.5; });

    const grid = document.createElement('div');
    grid.className = 'find-grid';

    choices.forEach(function (ch) {
      const tile = document.createElement('div');
      tile.className = 'find-tile';
      tile.dataset.ch = ch;
      tile.appendChild(letterTileSVG(ch));
      grid.appendChild(tile);

      tile.addEventListener('pointerdown', function () {
        if (tile.classList.contains('correct') || tile.classList.contains('wrong')) return;
        if (ch === target) {
          tile.classList.add('correct');
          if (APP.audio) APP.audio.letterDone();
          confettiCleanup = APP.launchConfetti({ count: 40, duration: 1200 });
          _advanceTimer = setTimeout(function () {
            _advanceTimer = null;
            APP.advanceLetter();
            if (APP.state.screen === 'complete') {
              ctx.go('complete');
            } else {
              ctx.go('findletter');
            }
          }, 600);
        } else {
          tile.classList.add('wrong');
          if (APP.audio) APP.audio.strokeDone();
          setTimeout(function () { tile.classList.remove('wrong'); }, 400);
        }
      });
    });

    stage.appendChild(grid);
    wrap.appendChild(stage);

    // Strip
    wrap.appendChild(buildStrip(animal));

    root.appendChild(wrap);

    // Announce target letter on mount
    speakLetter(target, locale);
  }

  APP.screens = APP.screens || {};
  APP.screens.findletter = { render };
})(window.APP);

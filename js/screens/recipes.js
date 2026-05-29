window.APP = window.APP || {};

// Recipes play mode: pick a recipe, drag ingredients into a bowl, stir,
// cook (oven / pan / fry depending on recipe), decorate, reveal the treat.
// DOM-based pointer dragging (no canvas, no HTML5 DnD) so it works on file:// too.
(function (APP) {
  function t(key, fallback) {
    const v = APP.t && APP.t(key);
    return v && v !== key ? v : fallback;
  }
  function audio(method) {
    if (APP.audio && typeof APP.audio[method] === 'function') {
      try { APP.audio[method](); } catch (_) {}
    }
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }

  // Pointer dragging. onDrop(clientX, clientY, el) returns true if the item was
  // consumed (stays where it is / removed by caller); false snaps it back.
  function makeDraggable(node, onDrop) {
    let dragging = false, startX = 0, startY = 0;
    function down(e) {
      e.preventDefault();
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      node.classList.add('dragging');
      audio('_wake');
      try { node.setPointerCapture(e.pointerId); } catch (_) {}
    }
    function move(e) {
      if (!dragging) return;
      node.style.transform = 'translate(' + (e.clientX - startX) + 'px,' + (e.clientY - startY) + 'px)';
    }
    function up(e) {
      if (!dragging) return;
      dragging = false;
      node.classList.remove('dragging');
      const consumed = onDrop ? onDrop(e.clientX, e.clientY, node) : false;
      if (!consumed) node.style.transform = '';
    }
    node.addEventListener('pointerdown', down);
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', up);
    node.addEventListener('pointercancel', up);
  }

  function hitTest(zone, x, y) {
    const r = zone.getBoundingClientRect();
    // Forgiving hit-box: 18% padding around the visual drop zone.
    const px = r.width * 0.18, py = r.height * 0.18;
    return x >= r.left - px && x <= r.right + px && y >= r.top - py && y <= r.bottom + py;
  }

  function render(root, ctx) {
    root.innerHTML = '';
    const wrap = el('div', 'recipes');
    root.appendChild(wrap);

    const S = { recipe: null, step: 'pick', placed: [] };

    // ── Top bar ──
    const topbar = el('div', 'recipes-topbar');
    const backBtn = el('button', 'btn icon', (APP.ICONS && APP.ICONS.back) || '←');
    backBtn.setAttribute('aria-label', t('recipes.back', 'Back'));
    const title = el('h1', 'recipes-title');
    topbar.appendChild(backBtn);
    topbar.appendChild(title);
    wrap.appendChild(topbar);

    const stage = el('div', 'recipes-stage');
    wrap.appendChild(stage);

    backBtn.addEventListener('click', function () {
      if (S.step !== 'pick') {
        setStep('pick');
      } else {
        const prev = APP.state.previousScreen;
        ctx.go(prev && prev !== 'recipes' ? prev : 'landing');
      }
    });

    function setStep(step) {
      S.step = step;
      stage.innerHTML = '';
      if (step === 'pick') stepPick();
      else if (step === 'ingredients') stepIngredients();
      else if (step === 'mix') stepMix();
      else if (step === 'cook') stepCook();
      else if (step === 'decorate') stepDecorate();
      else if (step === 'done') stepDone();
    }

    // ── Step: pick ──
    function stepPick() {
      title.textContent = t('recipes.title', 'Recipes');
      const grid = el('div', 'recipe-cards');
      (APP.RECIPES || []).forEach(function (recipe) {
        const card = el('button', 'recipe-card',
          '<span class="recipe-card-emoji">' + recipe.emoji + '</span>' +
          '<span class="recipe-card-name">' + recipe.name + '</span>');
        card.addEventListener('click', function () {
          S.recipe = recipe;
          S.placed = [];
          setStep('ingredients');
        });
        grid.appendChild(card);
      });
      stage.appendChild(grid);
    }

    // ── Step: ingredients ──
    function stepIngredients() {
      title.textContent = t('recipes.ingredients', 'Add the ingredients');
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene');

      const bowl = el('div', 'recipe-bowl recipe-drop',
        '<svg viewBox="0 0 200 140" width="100%" height="100%" aria-hidden="true">' +
        '<ellipse cx="100" cy="40" rx="86" ry="22" fill="#cfd8e3"/>' +
        '<path d="M16 40 a84 84 0 0 0 168 0 Z" fill="#e8edf3"/>' +
        '<path d="M16 40 a84 84 0 0 0 168 0" fill="none" stroke="#b6c2d1" stroke-width="4"/>' +
        '<ellipse cx="100" cy="40" rx="70" ry="16" fill="#fff8ec"/>' +
        '</svg>');
      scene.appendChild(bowl);

      const tray = el('div', 'recipe-tray');
      let remaining = recipe.ingredients.length;
      recipe.ingredients.forEach(function (ing) {
        const chip = el('div', 'recipe-item',
          '<span class="recipe-item-emoji">' + ing.emoji + '</span>' +
          '<span class="recipe-item-label">' + ing.label + '</span>');
        makeDraggable(chip, function (x, y) {
          if (hitTest(bowl, x, y)) {
            chip.classList.add('used');
            audio('strokeDone');
            remaining -= 1;
            if (remaining === 0) {
              audio('letterDone');
              mixBtn.disabled = false;
              mixBtn.classList.add('ready');
            }
            return true;
          }
          return false;
        });
        tray.appendChild(chip);
      });
      scene.appendChild(tray);
      stage.appendChild(scene);

      const mixBtn = el('button', 'recipe-action', t('recipes.mix', 'Mix it!'));
      mixBtn.disabled = true;
      mixBtn.addEventListener('click', function () { setStep('mix'); });
      stage.appendChild(mixBtn);
    }

    // ── Step: mix ──
    function stepMix() {
      title.textContent = t('recipes.stir', 'Stir it round and round');
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene');

      const C = 100, R = 70, CIRC = 2 * Math.PI * R;
      const mixArea = el('div', 'recipe-mix',
        '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' +
        '<path d="M26 70 a74 74 0 0 0 148 0 Z" fill="#e8edf3"/>' +
        '<ellipse cx="100" cy="70" rx="74" ry="20" fill="#cfd8e3"/>' +
        '<ellipse class="recipe-batter" cx="100" cy="72" rx="62" ry="15" fill="' + recipe.batterColor + '" opacity="0"/>' +
        '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#e4e9f0" stroke-width="10"/>' +
        '<circle class="recipe-ring" cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#ff8fb1" stroke-width="10" ' +
        'stroke-linecap="round" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" ' +
        'transform="rotate(-90 ' + C + ' ' + C + ')"/>' +
        '</svg>' +
        '<div class="recipe-spoon">🥄</div>');
      scene.appendChild(mixArea);
      stage.appendChild(scene);

      const hint = el('p', 'recipe-hint', t('recipes.stirHint', 'Drag the spoon around in circles'));
      stage.appendChild(hint);

      const ring = mixArea.querySelector('.recipe-ring');
      const batter = mixArea.querySelector('.recipe-batter');
      const spoon = mixArea.querySelector('.recipe-spoon');

      const NEEDED = 2 * Math.PI * 3; // three full turns
      let lastAngle = null, total = 0, dragging = false, advanced = false;

      function center() {
        const r = mixArea.getBoundingClientRect();
        return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, r: r };
      }
      function onDown(e) {
        e.preventDefault();
        dragging = true;
        lastAngle = null;
        audio('_wake');
        try { mixArea.setPointerCapture(e.pointerId); } catch (_) {}
        onMove(e);
      }
      function onMove(e) {
        if (!dragging) return;
        const c = center();
        spoon.style.transform = 'translate(' + (e.clientX - c.r.left - c.r.width / 2) + 'px,' +
          (e.clientY - c.r.top - c.r.height / 2) + 'px)';
        const ang = Math.atan2(e.clientY - c.cy, e.clientX - c.cx);
        if (lastAngle !== null) {
          let d = ang - lastAngle;
          if (d > Math.PI) d -= 2 * Math.PI;
          if (d < -Math.PI) d += 2 * Math.PI;
          total += Math.abs(d);
        }
        lastAngle = ang;
        const p = Math.min(1, total / NEEDED);
        ring.setAttribute('stroke-dashoffset', String(CIRC * (1 - p)));
        batter.setAttribute('opacity', String(p));
        if (p >= 1 && !advanced) {
          advanced = true;
          audio('letterDone');
          setTimeout(function () { setStep('cook'); }, 450);
        }
      }
      function onUp() { dragging = false; lastAngle = null; }
      mixArea.addEventListener('pointerdown', onDown);
      mixArea.addEventListener('pointermove', onMove);
      mixArea.addEventListener('pointerup', onUp);
      mixArea.addEventListener('pointercancel', onUp);
    }

    // Shared cook timer: animates a ring + invokes onDone. Returns nothing.
    function runTimer(ringEl, circ, ms, onDone) {
      const start = performance.now();
      function frame(now) {
        const p = Math.min(1, (now - start) / ms);
        if (ringEl) ringEl.setAttribute('stroke-dashoffset', String(circ * (1 - p)));
        if (p < 1) {
          requestAnimationFrame(frame);
        } else {
          audio('letterDone');
          onDone();
        }
      }
      requestAnimationFrame(frame);
    }

    // ── Step: cook (dispatch on recipe.cookType) ──
    function stepCook() {
      title.textContent = t('recipes.cook', 'Time to cook');
      const type = S.recipe.cookType;
      if (type === 'pan') cookPan();
      else if (type === 'fry') cookFry();
      else cookOven();
    }

    function advanceToDecorate() {
      setTimeout(function () { setStep('decorate'); }, 600);
    }

    function timerRingSvg(extraInner) {
      const C = 100, R = 60, CIRC = 2 * Math.PI * R;
      return {
        circ: CIRC,
        markup: '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#ffffff55" stroke-width="9"/>' +
          '<circle class="recipe-timer-ring" cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#ffd166" ' +
          'stroke-width="9" stroke-linecap="round" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" ' +
          'transform="rotate(-90 ' + C + ' ' + C + ')"/>' + (extraInner || ''),
      };
    }

    function cookOven() {
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene');
      const oven = el('div', 'recipe-oven recipe-drop',
        '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' +
        '<rect x="20" y="20" width="160" height="160" rx="14" fill="#5b6472"/>' +
        '<rect x="34" y="58" width="132" height="104" rx="10" fill="#2c3340"/>' +
        '<rect class="oven-door" x="34" y="58" width="132" height="104" rx="10" fill="#3a4250" stroke="#1b2029" stroke-width="3"/>' +
        '<rect x="48" y="72" width="104" height="76" rx="6" fill="#11151c"/>' +
        '<circle class="oven-glow" cx="100" cy="110" r="34" fill="#ff8c42" opacity="0"/>' +
        '<rect x="40" y="30" width="120" height="14" rx="7" fill="#3a4250"/>' +
        '<circle cx="150" cy="37" r="6" fill="#ffd166"/>' +
        '</svg>');
      scene.appendChild(oven);

      const tin = el('div', 'recipe-carry', '🥣');
      scene.appendChild(tin);
      stage.appendChild(scene);
      const hint = el('p', 'recipe-hint', t('recipes.ovenHint', 'Put it in the oven to bake'));
      stage.appendChild(hint);

      makeDraggable(tin, function (x, y) {
        if (hitTest(oven, x, y)) {
          tin.style.display = 'none';
          hint.textContent = t('recipes.baking', 'Baking…');
          const door = oven.querySelector('.oven-door');
          const glow = oven.querySelector('.oven-glow');
          if (door) door.setAttribute('opacity', '0.9');
          // build a timer ring overlay
          const ringWrap = el('div', 'recipe-timer');
          const tr = timerRingSvg();
          ringWrap.innerHTML = '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' + tr.markup + '</svg>';
          oven.appendChild(ringWrap);
          let g = 0;
          const glowTimer = setInterval(function () {
            g = Math.min(0.75, g + 0.05);
            if (glow) glow.setAttribute('opacity', String(g));
          }, 150);
          runTimer(ringWrap.querySelector('.recipe-timer-ring'), tr.circ, 3000, function () {
            clearInterval(glowTimer);
            advanceToDecorate();
          });
          return true;
        }
        return false;
      });
    }

    function cookFry() {
      const scene = el('div', 'recipe-scene');
      const pot = el('div', 'recipe-pot recipe-drop',
        '<svg viewBox="0 0 200 160" width="100%" height="100%" aria-hidden="true">' +
        '<rect x="30" y="50" width="140" height="92" rx="16" fill="#454c59"/>' +
        '<ellipse cx="100" cy="56" rx="74" ry="16" fill="#2c3340"/>' +
        '<ellipse class="oil" cx="100" cy="60" rx="64" ry="12" fill="#e0a83a"/>' +
        '<rect x="8" y="50" width="26" height="10" rx="5" fill="#2c3340"/>' +
        '<rect x="166" y="50" width="26" height="10" rx="5" fill="#2c3340"/>' +
        '</svg>');
      scene.appendChild(pot);
      const ball = el('div', 'recipe-carry', '⚪');
      scene.appendChild(ball);
      stage.appendChild(scene);
      const hint = el('p', 'recipe-hint', t('recipes.fryHint', 'Drop it into the hot oil'));
      stage.appendChild(hint);

      makeDraggable(ball, function (x, y) {
        if (hitTest(pot, x, y)) {
          hint.textContent = t('recipes.frying', 'Frying…');
          ball.classList.add('frying');
          ball.style.transform = '';
          // reposition ball over the oil and bob it
          const ringWrap = el('div', 'recipe-timer');
          const tr = timerRingSvg();
          ringWrap.innerHTML = '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' + tr.markup + '</svg>';
          pot.appendChild(ringWrap);
          runTimer(ringWrap.querySelector('.recipe-timer-ring'), tr.circ, 3000, function () {
            ball.textContent = '🍩';
            ball.classList.add('golden');
            advanceToDecorate();
          });
          return true;
        }
        return false;
      });
    }

    function cookPan() {
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene');
      const pan = el('div', 'recipe-pan',
        '<svg viewBox="0 0 240 160" width="100%" height="100%" aria-hidden="true">' +
        '<ellipse cx="100" cy="100" rx="84" ry="40" fill="#3a3f49"/>' +
        '<ellipse cx="100" cy="94" rx="84" ry="40" fill="#4a505c"/>' +
        '<ellipse cx="100" cy="92" rx="72" ry="32" fill="#2c3038"/>' +
        '<rect x="178" y="86" width="58" height="14" rx="7" fill="#2c3038"/>' +
        '<ellipse class="cake-batter" cx="100" cy="92" rx="46" ry="20" fill="' + recipe.batterColor + '"/>' +
        '</svg>' +
        '<div class="recipe-flyer">🥞</div>');
      scene.appendChild(pan);
      stage.appendChild(scene);
      const hint = el('p', 'recipe-hint', t('recipes.panWait', 'Cooking on one side…'));
      stage.appendChild(hint);

      const flyer = pan.querySelector('.recipe-flyer');
      const batter = pan.querySelector('.cake-batter');

      // First side cooks automatically, then prompt for a flip.
      const ringWrap = el('div', 'recipe-timer');
      const tr = timerRingSvg();
      ringWrap.innerHTML = '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' + tr.markup + '</svg>';
      pan.appendChild(ringWrap);
      runTimer(ringWrap.querySelector('.recipe-timer-ring'), tr.circ, 2200, function () {
        ringWrap.remove();
        if (batter) batter.setAttribute('fill', '#d9a55a');
        flyer.classList.add('ready');
        hint.textContent = t('recipes.flipHint', 'Tap to flip!');
        const flipBtn = el('button', 'recipe-action ready', t('recipes.flip', 'Flip!'));
        stage.appendChild(flipBtn);
        let flipped = false;
        flipBtn.addEventListener('click', function () {
          if (flipped) return;
          flipped = true;
          audio('_wake');
          flyer.classList.add('flipping');
          flipBtn.disabled = true;
          setTimeout(function () {
            if (batter) batter.setAttribute('fill', '#c98f44');
            audio('letterDone');
            advanceToDecorate();
          }, 900);
        });
      });
    }

    // ── Step: decorate ──
    function stepDecorate() {
      title.textContent = t('recipes.decorate', 'Decorate your treat');
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene');

      const treat = el('div', 'recipe-treat recipe-drop',
        '<span class="recipe-treat-emoji">' + recipe.cookedEmoji + '</span>');
      scene.appendChild(treat);

      const tray = el('div', 'recipe-tray');
      recipe.toppings.forEach(function (top) {
        const chip = el('div', 'recipe-item topping', '<span class="recipe-item-emoji">' + top + '</span>');
        makeDraggable(chip, function (x, y) {
          if (hitTest(treat, x, y)) {
            const r = treat.getBoundingClientRect();
            const fx = (x - r.left) / r.width;
            const fy = (y - r.top) / r.height;
            placeTopping(treat, top, fx, fy);
            S.placed.push({ emoji: top, fx: fx, fy: fy });
            audio('strokeDone');
          }
          return false; // chip snaps back so more can be added
        });
        tray.appendChild(chip);
      });
      scene.appendChild(tray);
      stage.appendChild(scene);

      const doneBtn = el('button', 'recipe-action ready', t('recipes.done', 'All done!'));
      doneBtn.addEventListener('click', function () { setStep('done'); });
      stage.appendChild(doneBtn);
    }

    function placeTopping(treat, emoji, fx, fy) {
      const t2 = el('span', 'recipe-placed', emoji);
      t2.style.left = (fx * 100) + '%';
      t2.style.top = (fy * 100) + '%';
      treat.appendChild(t2);
    }

    // ── Step: done ──
    function stepDone() {
      title.textContent = t('recipes.finished', 'Yummy!');
      const recipe = S.recipe;
      const scene = el('div', 'recipe-scene done');

      const treat = el('div', 'recipe-treat big',
        '<span class="recipe-treat-emoji">' + recipe.cookedEmoji + '</span>');
      S.placed.forEach(function (p) { placeTopping(treat, p.emoji, p.fx, p.fy); });
      scene.appendChild(treat);
      stage.appendChild(scene);

      const row = el('div', 'recipe-done-actions');
      const again = el('button', 'recipe-action', t('recipes.makeAnother', 'Make another'));
      again.addEventListener('click', function () { S.recipe = null; S.placed = []; setStep('pick'); });
      const home = el('button', 'recipe-action secondary', t('recipes.home', 'Home'));
      home.addEventListener('click', function () { ctx.go('landing'); });
      row.appendChild(again);
      row.appendChild(home);
      stage.appendChild(row);

      audio('wordDone');
      if (typeof APP.launchConfetti === 'function') {
        try { APP.launchConfetti(); } catch (_) {}
      }
    }

    setStep('pick');
  }

  APP.screens = APP.screens || {};
  APP.screens.recipes = { render: render };
})(window.APP);

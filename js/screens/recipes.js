window.APP = window.APP || {};

// Recipes play mode: pick a recipe, drag ingredients into a bowl (which fills),
// stir with a moving SVG spoon, cook (cake: tin -> oven; pancake: flip in the pan;
// doughnut: fry in oil), decorate, reveal the treat.
// SVG scene backdrops + DOM objects animated with GSAP. DOM pointer dragging
// (no canvas / no HTML5 DnD) so it works on file:// too.
(function (APP) {
  var G = window.gsap || null;

  function t(key, fallback) {
    var v = APP.t && APP.t(key);
    return v && v !== key ? v : fallback;
  }
  function audio(method) {
    if (APP.audio && typeof APP.audio[method] === 'function') {
      try { APP.audio[method](); } catch (_) {}
    }
  }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function centerOf(node) {
    var r = node.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2, r: r };
  }
  // Position `node` at fraction (fx, fy) of `anchorEl`'s bounding rect using
  // position:fixed coordinates — works at any viewport size.
  // fx=0 → left edge, fx=1 → right edge; fy=0 → top, fy=1 → bottom.
  function anchorFixed(node, anchorEl, fx, fy) {
    var r = anchorEl.getBoundingClientRect();
    node.style.position = 'fixed';
    node.style.left = (r.left + r.width  * fx) + 'px';
    node.style.top  = (r.top  + r.height * fy) + 'px';
  }
  // GSAP guards — if the lib failed to load, fire onComplete so logic still flows.
  function gto(target, vars) {
    if (G) return G.to(target, vars);
    if (vars && vars.onComplete) vars.onComplete();
    return null;
  }
  function gset(target, vars) { if (G) G.set(target, vars); }
  function gtl(vars) {
    if (G) return G.timeline(vars || {});
    var stub = { to: function () { return stub; }, fromTo: function () { return stub; },
      set: function () { return stub; }, add: function (fn) { if (typeof fn === 'function') fn(); return stub; },
      call: function (fn) { if (typeof fn === 'function') fn(); return stub; } };
    if (vars && vars.onComplete) vars.onComplete();
    return stub;
  }

  // Pointer dragging. onDrop(clientX, clientY, node) returns true if consumed.
  function makeDraggable(node, onDrop) {
    var dragging = false, startX = 0, startY = 0;
    function down(e) {
      e.preventDefault();
      dragging = true;
      startX = e.clientX; startY = e.clientY;
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
      var consumed = onDrop ? onDrop(e.clientX, e.clientY, node) : false;
      if (!consumed) {
        if (G) G.to(node, { x: 0, y: 0, duration: 0.35, ease: 'back.out(2)', clearProps: 'transform' });
        else node.style.transform = '';
      }
    }
    node.addEventListener('pointerdown', down);
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerup', up);
    node.addEventListener('pointercancel', up);
  }

  // Rectangle hit test — used for oven, pot, pan (non-circular targets).
  function hitTest(zone, x, y) {
    var r = zone.getBoundingClientRect();
    var px = r.width * 0.2, py = r.height * 0.2;
    return x >= r.left - px && x <= r.right + px && y >= r.top - py && y <= r.bottom + py;
  }

  // Circular hit test — used for the treat in the decorate step.
  function hitCircle(node, x, y, slack) {
    var r = node.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var rad = Math.min(r.width, r.height) / 2;
    return Math.hypot(x - cx, y - cy) <= rad * (slack || 1.1);
  }

  // Squash-and-stretch: squashes el then springs back.
  function squash(node, sx, sy) {
    if (!G) return;
    G.timeline()
      .to(node, { scaleX: sx || 1.4, scaleY: sy || 0.55, duration: 0.07, ease: 'none' })
      .to(node, { scaleX: 1, scaleY: 1, duration: 0.22, ease: 'back.out(2.5)' });
  }

  // Bowl jiggle — called every time an ingredient settles.
  function jiggleBowl(bowlWrap) {
    if (!G) return;
    G.timeline()
      .to(bowlWrap, { rotation: 4, duration: 0.08, ease: 'power2.out' })
      .to(bowlWrap, { rotation: -3, duration: 0.10, ease: 'power2.inOut' })
      .to(bowlWrap, { rotation: 1.5, duration: 0.08 })
      .to(bowlWrap, { rotation: 0, duration: 0.10, ease: 'power2.in' });
  }

  // Shared bowl-settle logic: add a blob inside the bowl and raise the batter level.
  function settleBowl(ing, contents, level, idx, total, bowlWrap) {
    var blob = el('span', 'bowl-bit', ing.emoji);
    var spread = (idx - (total - 1) / 2) / total;
    blob.style.left = (50 + spread * 60) + '%';
    blob.style.bottom = (8 + (idx % 2) * 10) + '%';
    contents.appendChild(blob);
    gset(blob, { scale: 0 });
    gto(blob, { scale: 1, duration: 0.3, ease: 'back.out(2)',
      onComplete: function () { squash(blob, 1.3, 0.7); } });
    var h = 12 + ((idx + 1) / total) * 34;
    gto(level, { height: h + '%', opacity: 0.55 + (idx + 1) / total * 0.35, duration: 0.4, ease: 'power2.out' });
    if (bowlWrap) jiggleBowl(bowlWrap);
  }

  // ── Shared SVG art ──
  function bowlSvg() {
    return '<svg viewBox="0 0 240 180" width="100%" height="100%" aria-hidden="true">' +
      '<defs>' +
      '<linearGradient id="bowlG" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="#fdfdff"/><stop offset="1" stop-color="#c3cede"/></linearGradient>' +
      '<radialGradient id="bowlIn" cx="0.5" cy="0.25" r="0.8">' +
      '<stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e3dccb"/></radialGradient>' +
      '</defs>' +
      '<ellipse cx="120" cy="160" rx="86" ry="14" fill="rgba(0,24,88,0.12)"/>' +
      '<path d="M28 66 a92 60 0 0 0 184 0 Z" fill="url(#bowlG)"/>' +
      '<ellipse cx="120" cy="66" rx="92" ry="26" fill="#aebccd"/>' +
      '<ellipse cx="120" cy="66" rx="78" ry="20" fill="url(#bowlIn)"/>' +
      '<path d="M44 70 a76 50 0 0 0 152 0" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.5"/>' +
      '</svg>';
  }

  // SVG wooden spoon for the mix step (bowl at top so it tracks pointer, handle extends down).
  function spoonSvg() {
    return '<svg class="spoon-svg" viewBox="0 0 24 96" width="24" height="96" aria-hidden="true">' +
      // Bowl
      '<ellipse cx="12" cy="14" rx="11" ry="13" fill="#b8732e"/>' +
      '<ellipse cx="11.5" cy="13" rx="7.5" ry="9" fill="#d4954a"/>' +
      '<ellipse cx="10.5" cy="11" rx="5" ry="6" fill="rgba(255,220,160,0.35)"/>' +
      // Neck
      '<rect x="9" y="24" width="6" height="10" rx="3" fill="#b8732e"/>' +
      // Handle
      '<rect x="9.5" y="32" width="5" height="56" rx="2.5" fill="#c4843a"/>' +
      '<rect x="10.5" y="32" width="2.5" height="56" rx="1.5" fill="#dba95a"/>' +
      // Handle end knob
      '<ellipse cx="12" cy="90" rx="4.5" ry="5" fill="#b8732e"/>' +
      '</svg>';
  }

  function render(root, ctx) {
    root.innerHTML = '';
    var wrap = el('div', 'recipes');
    root.appendChild(wrap);

    var S = { recipe: null, step: 'pick', placed: [] };

    // ── Topbar ──
    var topbarEl, title, backBtn;
    if (APP.ui && APP.ui.topbar) {
      topbarEl = APP.ui.topbar({ ctx: ctx, title: t('recipes.title', 'Recipes'), home: true, back: true });
      wrap.appendChild(topbarEl);
      title = topbarEl.querySelector('.tb-title, h1, h2, .topbar-title');
      backBtn = null; // APP.ui.topbar handles back navigation
    } else {
      topbarEl = el('div', 'recipes-topbar');
      backBtn = el('button', 'btn icon', (APP.ICONS && APP.ICONS.back) || '←');
      backBtn.setAttribute('aria-label', t('recipes.back', 'Back'));
      title = el('h1', 'recipes-title');
      topbarEl.appendChild(backBtn);
      topbarEl.appendChild(title);
      wrap.appendChild(topbarEl);
    }

    var stage = el('div', 'recipes-stage');
    wrap.appendChild(stage);

    // Safe title setter — works whether title is a real h1 or a fallback container.
    function setTitle(text) {
      if (title && typeof title.textContent !== 'undefined') title.textContent = text;
    }

    // ── Re-anchor registry: tracks { node, anchorEl, fx, fy } pairs for any
    //    in-flight body-level fixed elements so resize can reposition them.
    //    GSAP positions elements via CSS transform (x/y), so on resize we use
    //    G.set() to update their coordinates from fresh getBoundingClientRect(). ──
    var _anchored = [];
    function trackAnchor(node, anchorEl, fx, fy) {
      _anchored.push({ node: node, anchorEl: anchorEl, fx: fx, fy: fy });
    }
    function untrackNode(node) {
      _anchored = _anchored.filter(function (a) { return a.node !== node; });
    }
    function reanchorAll() {
      _anchored = _anchored.filter(function (a) { return !!a.node.parentNode; });
      _anchored.forEach(function (a) {
        var r = a.anchorEl.getBoundingClientRect();
        var newLeft = r.left + r.width  * a.fx;
        var newTop  = r.top  + r.height * a.fy;
        // Update GSAP's x/y (which are offsets from the element's CSS left/top=0).
        if (G) G.set(a.node, { x: newLeft, y: newTop });
        else { a.node.style.left = newLeft + 'px'; a.node.style.top = newTop + 'px'; }
      });
    }
    // Observe body for size changes (covers both window resize and layout reflow).
    var _resizeObs = null;
    if (typeof ResizeObserver !== 'undefined') {
      _resizeObs = new ResizeObserver(reanchorAll);
      _resizeObs.observe(document.body);
    } else {
      window.addEventListener('resize', reanchorAll);
    }
    // Wrap ctx.go so we always clean up the resize watcher before navigating away.
    var _goOrig = ctx.go.bind(ctx);
    ctx.go = function (screen) {
      cleanupResizeWatcher();
      _goOrig(screen);
    };

    // ── Kitchen background ──
    var kitchenBg = el('div', 'kitchen-bg');
    kitchenBg.setAttribute('aria-hidden', 'true');
    kitchenBg.innerHTML =
      '<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
      '<pattern id="wallTile" x="0" y="0" width="100" height="80" patternUnits="userSpaceOnUse">' +
      '<rect width="100" height="80" fill="#fff9f0"/>' +
      '<rect width="50" height="40" fill="#fdeedd"/>' +
      '<rect x="50" y="40" width="50" height="40" fill="#fdeedd"/>' +
      '</pattern>' +
      '</defs>' +
      // Wall
      '<rect width="800" height="300" fill="url(#wallTile)"/>' +
      // Tile grout lines horizontal
      '<line x1="0" y1="80" x2="800" y2="80" stroke="#e8d8c0" stroke-width="2"/>' +
      '<line x1="0" y1="160" x2="800" y2="160" stroke="#e8d8c0" stroke-width="2"/>' +
      '<line x1="0" y1="240" x2="800" y2="240" stroke="#e8d8c0" stroke-width="2"/>' +
      // Window frame
      '<rect x="300" y="22" width="200" height="150" rx="10" fill="#cceeff" stroke="#c4843a" stroke-width="7"/>' +
      '<line x1="400" y1="22" x2="400" y2="172" stroke="#c4843a" stroke-width="4"/>' +
      '<line x1="300" y1="97" x2="500" y2="97" stroke="#c4843a" stroke-width="4"/>' +
      // Curtains
      '<path d="M300 22 Q280 60 292 110 Q282 150 300 172" fill="#f4845a" opacity="0.85"/>' +
      '<path d="M500 22 Q520 60 508 110 Q518 150 500 172" fill="#f4845a" opacity="0.85"/>' +
      // Curtain rod
      '<rect x="285" y="14" width="230" height="12" rx="6" fill="#c4843a"/>' +
      '<circle cx="285" cy="20" r="8" fill="#d4944a"/>' +
      '<circle cx="515" cy="20" r="8" fill="#d4944a"/>' +
      // Left shelf
      '<rect x="30" y="100" width="150" height="12" rx="4" fill="#c4843a"/>' +
      '<rect x="30" y="112" width="8" height="50" rx="3" fill="#a86820"/>' +
      '<rect x="172" y="112" width="8" height="50" rx="3" fill="#a86820"/>' +
      // Jar on shelf
      '<rect x="55" y="62" width="34" height="40" rx="6" fill="#a0d8b0" stroke="#68b880" stroke-width="2"/>' +
      '<rect x="53" y="58" width="38" height="10" rx="4" fill="#68b880"/>' +
      // Book on shelf
      '<rect x="108" y="60" width="22" height="42" rx="3" fill="#f4845a"/>' +
      '<rect x="112" y="60" width="4" height="42" fill="#d4643a" opacity="0.5"/>' +
      // Green backsplash strip
      '<rect x="0" y="284" width="800" height="28" fill="#b8dca0"/>' +
      '<line x1="0" y1="284" x2="800" y2="284" stroke="#98c080" stroke-width="2"/>' +
      '<line x1="0" y1="312" x2="800" y2="312" stroke="#98c080" stroke-width="2"/>' +
      // Countertop
      '<rect x="0" y="312" width="800" height="188" fill="#e8c98a"/>' +
      '<rect x="0" y="312" width="800" height="14" fill="#d4a85a"/>' +
      // Countertop highlight
      '<rect x="0" y="326" width="800" height="4" fill="rgba(255,255,255,0.25)"/>' +
      '</svg>';
    stage.appendChild(kitchenBg);

    if (backBtn) {
      backBtn.addEventListener('click', function () {
        if (G) G.killTweensOf('*');
        cleanBodyEls();
        if (S.step !== 'pick') setStep('pick');
        else {
          var prev = APP.state && APP.state.previousScreen;
          ctx.go(prev && prev !== 'recipes' ? prev : (APP.screens && APP.screens.map ? 'map' : 'landing'));
        }
      });
    }

    function cleanBodyEls() {
      [
        'egg-top', 'egg-bot', 'egg-yolk',
        'pour-jug', 'pour-stream-milk', 'milk-ripple',
        'butter-chunk', 'sift-cloud', 'flour-particle',
        'recipe-flier', 'steam-puff',
      ].forEach(function (cls) {
        document.querySelectorAll('.' + cls).forEach(function (node) { node.remove(); });
      });
      // Clear the re-anchor registry since all body-level elements are gone.
      _anchored = [];
    }
    // Tear down the resize observer/listener when leaving the screen.
    function cleanupResizeWatcher() {
      if (_resizeObs) { _resizeObs.disconnect(); _resizeObs = null; }
      else window.removeEventListener('resize', reanchorAll);
    }

    function setStep(step) {
      if (G) G.killTweensOf('*');
      cleanBodyEls();
      S.step = step;
      stage.innerHTML = '';
      stage.appendChild(kitchenBg);
      if (step === 'pick') stepPick();
      else if (step === 'ingredients') stepIngredients();
      else if (step === 'mix') stepMix();
      else if (step === 'cook') stepCook();
      else if (step === 'decorate') stepDecorate();
      else if (step === 'done') stepDone();
    }

    // ───────────────────────── Pick ─────────────────────────
    function stepPick() {
      setTitle(t('recipes.title', 'Recipes'));
      var grid = el('div', 'recipe-cards');
      (APP.RECIPES || []).forEach(function (recipe, i) {
        var card = el('button', 'recipe-card',
          '<span class="recipe-card-emoji">' + recipe.emoji + '</span>' +
          '<span class="recipe-card-name">' + recipe.name + '</span>');
        card.addEventListener('click', function () {
          S.recipe = recipe; S.placed = []; setStep('ingredients');
        });
        grid.appendChild(card);
        gset(card, { opacity: 0, y: 24 });
        gto(card, { opacity: 1, y: 0, duration: 0.4, delay: i * 0.08, ease: 'back.out(1.7)' });
      });
      stage.appendChild(grid);
    }

    // ──────────────────────── Ingredients ────────────────────────
    function stepIngredients() {
      setTitle(t('recipes.ingredients', 'Add the ingredients'));
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');

      var bowlWrap = el('div', 'recipe-bowl recipe-drop', bowlSvg());
      var level = el('div', 'bowl-level');
      level.style.background = recipe.batterColor;
      var contents = el('div', 'bowl-contents');
      bowlWrap.appendChild(level);
      bowlWrap.appendChild(contents);
      scene.appendChild(bowlWrap);

      var tray = el('div', 'recipe-tray');
      var total = recipe.ingredients.length;
      var added = 0;
      recipe.ingredients.forEach(function (ing) {
        var chip = el('div', 'recipe-item',
          '<span class="recipe-item-emoji">' + ing.emoji + '</span>' +
          '<span class="recipe-item-label">' + ing.label + '</span>');
        makeDraggable(chip, function (x, y) {
          if (!hitTest(bowlWrap, x, y)) return false;
          chip.classList.add('used');
          animateIngredient(ing, x, y, bowlWrap, contents, level, added, total, function () {
            added += 1;
            audio('strokeDone');
            if (added === total) {
              audio('letterDone');
              mixBtn.disabled = false;
              mixBtn.classList.add('ready');
              gto(mixBtn, { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1, ease: 'power2.inOut' });
            }
          });
          return true;
        });
        tray.appendChild(chip);
      });
      scene.appendChild(tray);
      stage.appendChild(scene);

      var mixBtn = el('button', 'recipe-action', t('recipes.mix', 'Mix it!'));
      mixBtn.disabled = true;
      mixBtn.addEventListener('click', function () { setStep('mix'); });
      stage.appendChild(mixBtn);
    }

    // ── Ingredient animation dispatch ──
    function animateIngredient(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone) {
      switch (ing.animType) {
        case 'crack': animCrack(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone); break;
        case 'pour':  animPour (ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone); break;
        case 'chunk': animChunk(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone); break;
        case 'sift':  animSift (ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone); break;
        default:      flyIntoBowl(ing.emoji, fromX, fromY, bowlWrap, contents, level, idx, total);
                      if (onDone) onDone(); break;
      }
    }

    // ── Egg crack: two CSS half-shells separate, yolk drops into bowl ──
    function animCrack(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone) {
      if (!G) { settleBowl(ing, contents, level, idx, total, bowlWrap); if (onDone) onDone(); return; }
      var bc = centerOf(bowlWrap);
      var landX = bc.x;
      var landY = bc.r.top + bc.r.height * 0.12;
      var bowlDropY = bc.r.top + bc.r.height * 0.32;

      var top = el('div', 'egg-top');
      var bot = el('div', 'egg-bot');
      var yolk = el('div', 'egg-yolk');
      document.body.appendChild(top);
      document.body.appendChild(bot);
      document.body.appendChild(yolk);

      // Start parts stacked at drop point
      gset(top,  { x: fromX - 20, y: fromY - 30, opacity: 1, rotation: 0 });
      gset(bot,  { x: fromX - 20, y: fromY - 4,  opacity: 1, rotation: 0 });
      gset(yolk, { x: fromX - 8,  y: fromY - 12, opacity: 0, scale: 0 });

      var tl = gtl();
      // Arc egg to above bowl rim
      tl.to(top, { x: landX - 20, y: landY - 30, duration: 0.32, ease: 'power2.out' })
        .to(bot, { x: landX - 20, y: landY - 4,  duration: 0.32, ease: 'power2.out' }, '<')
        // Crack halves apart
        .to(top, { rotation: 38, y: '-=16', duration: 0.2, ease: 'power2.out' })
        .to(bot, { rotation: -24, y: '+=7', duration: 0.2, ease: 'power2.out' }, '<')
        // Show yolk at crack and drop
        .set(yolk, { x: landX - 8, y: landY - 4, opacity: 1, scale: 1 })
        .to(yolk, { y: bowlDropY, duration: 0.38, ease: 'power2.in' })
        // Yolk squash on landing
        .to(yolk, { scaleY: 0.55, scaleX: 1.45, duration: 0.07, ease: 'none' })
        .to(yolk, { scaleY: 1,    scaleX: 1,    duration: 0.22, ease: 'back.out(2.5)' })
        // Shells fade out
        .to([top, bot], { opacity: 0, duration: 0.22, y: '-=8' }, '<0.1')
        .call(function () {
          top.remove(); bot.remove(); yolk.remove();
          settleBowl(ing, contents, level, idx, total, bowlWrap);
          if (onDone) onDone();
        });
    }

    // ── Milk pour: jug moves above bowl, tips forward, stream falls straight down ──
    function animPour(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone) {
      if (!G) { settleBowl(ing, contents, level, idx, total, bowlWrap); if (onDone) onDone(); return; }
      var bc = centerOf(bowlWrap);
      var jugW = 48, jugH = 60;
      // Jug target: top-center of bowl (fy=0 → bowl rim), offset up by jug height.
      // Use anchorFixed fractions so position scales with bowl size at any viewport.
      var bowlR = bowlWrap.getBoundingClientRect();
      var jugTX = bowlR.left + bowlR.width * 0.5 - jugW / 2;  // horizontally centred over bowl
      var jugTY = bowlR.top - jugH * 1.08;                     // jug bottom sits ~8% above bowl rim
      // Stream: hangs from near the jug spout (fx=0.45 of jug, fy=0.9 — near bottom),
      // falls down to bowl surface (fy=0.3 of bowl).
      var streamTopY  = jugTY + jugH * 0.9;
      var streamBotY  = bowlR.top + bowlR.height * 0.3;
      var streamX     = jugTX + jugW * 0.45;
      var streamH     = Math.max(streamBotY - streamTopY, 10);

      var jug = el('div', 'pour-jug');
      jug.innerHTML =
        '<svg viewBox="0 0 48 60" width="48" height="60" aria-hidden="true">' +
        '<defs><linearGradient id="jugG2" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#edf6ff"/><stop offset="1" stop-color="#b8d8f0"/>' +
        '</linearGradient></defs>' +
        '<rect x="4" y="8" width="36" height="44" rx="8" fill="url(#jugG2)" stroke="#7ab0d4" stroke-width="1.5"/>' +
        '<path d="M4 12 Q-4 10 -4 17 Q-4 22 4 20" fill="none" stroke="#7ab0d4" stroke-width="2.5" stroke-linecap="round"/>' +
        '<path d="M40 18 Q50 20 50 30 Q50 40 40 42" fill="none" stroke="#7ab0d4" stroke-width="3" stroke-linecap="round"/>' +
        '<rect x="4" y="6" width="36" height="6" rx="3" fill="#cce4f6" stroke="#7ab0d4" stroke-width="1"/>' +
        '<rect x="7" y="26" width="30" height="23" rx="4" fill="rgba(235,248,255,0.75)"/>' +
        '</svg>';
      jug.style.position = 'fixed';
      document.body.appendChild(jug);
      gset(jug, { x: fromX - jugW / 2, y: fromY - jugH / 2 });
      // Track jug so resize re-anchors it to bowl top-center.
      trackAnchor(jug, bowlWrap, 0.5, 0);

      var stream = el('div', 'pour-stream-milk');
      stream.style.height = streamH + 'px';
      stream.style.position = 'fixed';
      document.body.appendChild(stream);
      gset(stream, { x: streamX, y: streamTopY, scaleY: 0, opacity: 0 });
      // Track stream near jug spout (fraction 0.45, 0.9 of jug).
      trackAnchor(stream, bowlWrap, 0.45, 0);

      var ripple = el('div', 'milk-ripple');
      ripple.style.position = 'fixed';
      document.body.appendChild(ripple);
      gset(ripple, { x: streamX - 12, y: streamBotY - 6, opacity: 0, scale: 0.3 });
      // Track ripple at bowl surface (fraction 0.45, 0.3 of bowl).
      trackAnchor(ripple, bowlWrap, 0.45, 0.3);

      var tl = gtl();
      tl.to(jug, { x: jugTX, y: jugTY, duration: 0.32, ease: 'power2.out' })
        // Tip jug forward; pivot at bottom-center keeps the pour point anchored
        .to(jug, { rotation: -28, transformOrigin: '50% 100%', duration: 0.38, ease: 'power2.inOut' })
        .to(stream, { opacity: 1, scaleY: 1, duration: 0.22, ease: 'power1.out' }, '-=0.15')
        .to(ripple, { opacity: 0.9, scale: 1, duration: 0.15 }, '<0.15')
        .to(ripple, { opacity: 0, scale: 2.8, duration: 0.5, ease: 'power1.out' }, '<')
        .to(jug, { duration: 0.55 })
        .to(stream, { scaleY: 0, opacity: 0, duration: 0.18 })
        .to(jug, { rotation: 0, duration: 0.32, ease: 'power2.inOut' }, '<')
        .to(jug, { opacity: 0, duration: 0.18 })
        .call(function () {
          untrackNode(jug); untrackNode(stream); untrackNode(ripple);
          jug.remove(); stream.remove(); ripple.remove();
          settleBowl(ing, contents, level, idx, total, bowlWrap);
          if (onDone) onDone();
        });
    }

    // ── Butter/sugar chunks: two small rectangles tumble into bowl ──
    function animChunk(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone) {
      if (!G) { settleBowl(ing, contents, level, idx, total, bowlWrap); if (onDone) onDone(); return; }
      var bc = centerOf(bowlWrap);
      var targetX = bc.x + (Math.random() - 0.5) * bc.r.width * 0.25;
      var targetY = bc.r.top + bc.r.height * 0.3;
      var offsets = [{ dx: -11, delay: 0 }, { dx: 14, delay: 0.07 }];
      var done = 0;
      offsets.forEach(function (o, i) {
        var chunk = el('div', 'butter-chunk');
        document.body.appendChild(chunk);
        gset(chunk, { x: fromX - 9 + o.dx, y: fromY - 6,
                      rotation: (Math.random() - 0.5) * 30, opacity: 1 });
        var tl2 = gtl({ delay: o.delay });
        tl2.to(chunk, { y: fromY - 62, duration: 0.2, ease: 'power2.out' })
           .to(chunk, {
             x: targetX - 9 + o.dx * 0.4,
             y: targetY,
             rotation: '+=' + (80 + Math.random() * 100),
             duration: 0.44, ease: 'bounce.out'
           })
           .call(function () {
             chunk.remove();
             done += 1;
             if (done === offsets.length) {
               settleBowl(ing, contents, level, idx, total, bowlWrap);
               if (onDone) onDone();
             }
             squash(chunk, 1.5, 0.45);
           });
      });
    }

    // ── Flour/salt sift: cloud puff at drop point, particles drift down to bowl ──
    function animSift(ing, fromX, fromY, bowlWrap, contents, level, idx, total, onDone) {
      if (!G) { settleBowl(ing, contents, level, idx, total, bowlWrap); if (onDone) onDone(); return; }
      var bc = centerOf(bowlWrap);
      // Particles start where the ingredient was dropped, drift down into bowl center
      var sourceX = fromX, sourceY = fromY - 5;
      var landX = bc.x, landY = bc.r.top + bc.r.height * 0.28;

      var cloud = el('div', 'sift-cloud');
      cloud.style.width = '64px'; cloud.style.height = '32px';
      document.body.appendChild(cloud);
      gset(cloud, { x: sourceX - 32, y: sourceY - 16, scale: 0, opacity: 0.85 });
      gto(cloud, { scale: 1.6, opacity: 0, duration: 0.65, ease: 'power1.out',
        onComplete: function () { cloud.remove(); } });

      var COUNT = 24;
      for (var i = 0; i < COUNT; i++) {
        (function (i) {
          setTimeout(function () {
            if (S.step !== 'ingredients') return;
            var p = el('div', 'flour-particle');
            document.body.appendChild(p);
            gset(p, { x: sourceX + (Math.random() - 0.5) * 40 - 2, y: sourceY, opacity: 0.9 });
            gto(p, {
              x: landX + (Math.random() - 0.5) * bc.r.width * 0.35,
              y: landY + (Math.random() - 0.5) * 12,
              opacity: 0,
              duration: 0.55 + Math.random() * 0.5,
              ease: 'power1.in',
              onComplete: function () { p.remove(); }
            });
          }, i * 44);
        })(i);
      }

      setTimeout(function () {
        if (S.step !== 'ingredients') return;
        settleBowl(ing, contents, level, idx, total, bowlWrap);
        if (onDone) onDone();
      }, COUNT * 44 + 300);
    }

    // Fallback generic arc-into-bowl (used when no animType is set).
    function flyIntoBowl(emoji, fromX, fromY, bowlWrap, contents, level, idx, total) {
      var bc = centerOf(bowlWrap);
      var targetX = bc.x + (Math.random() - 0.5) * bc.r.width * 0.4;
      var targetY = bc.r.top + bc.r.height * 0.34;
      var flier = el('div', 'recipe-flier', emoji);
      flier.style.left = fromX + 'px';
      flier.style.top = fromY + 'px';
      document.body.appendChild(flier);
      var tl = gtl();
      tl.to(flier, { x: (targetX - fromX) * 0.5, y: -70, duration: 0.22, ease: 'power2.out' })
        .to(flier, { x: targetX - fromX, y: targetY - fromY, scale: 0.6, rotation: (Math.random() - 0.5) * 60,
          duration: 0.42, ease: 'bounce.out' })
        .call(function () {
          flier.remove();
          var blob = el('span', 'bowl-bit', emoji);
          var spread = (idx - (total - 1) / 2) / total;
          blob.style.left = (50 + spread * 60) + '%';
          blob.style.bottom = (8 + (idx % 2) * 10) + '%';
          contents.appendChild(blob);
          gset(blob, { scale: 0 });
          gto(blob, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
          var h = 12 + ((idx + 1) / total) * 34;
          gto(level, { height: h + '%', opacity: 0.55 + (idx + 1) / total * 0.35, duration: 0.4, ease: 'power2.out' });
        });
    }

    // ──────────────────────────── Mix ────────────────────────────
    function stepMix() {
      setTitle(t('recipes.stir', 'Stir it round and round'));
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');

      var C = 100, R = 70, CIRC = 2 * Math.PI * R;
      var mixArea = el('div', 'recipe-mix',
        bowlSvg().replace('width="100%" height="100%"', 'class="mix-bowl" width="100%" height="100%"') +
        '<svg class="mix-ring" viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' +
        '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="rgba(0,24,88,0.10)" stroke-width="9"/>' +
        '<circle class="recipe-ring" cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#ff8fb1" stroke-width="9" ' +
        'stroke-linecap="round" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" ' +
        'transform="rotate(-90 ' + C + ' ' + C + ')"/>' +
        '</svg>' +
        '<div class="mix-batter" style="background:radial-gradient(circle at 40% 35%, ' + lighten(recipe.batterColor) + ', ' + recipe.batterColor + ')"></div>' +
        '<div class="recipe-spoon">' + spoonSvg() + '</div>');
      scene.appendChild(mixArea);
      stage.appendChild(scene);
      var hint = el('p', 'recipe-hint', t('recipes.stirHint', 'Drag the spoon around in circles'));
      stage.appendChild(hint);

      var ring = mixArea.querySelector('.recipe-ring');
      var batter = mixArea.querySelector('.mix-batter');
      var spoon = mixArea.querySelector('.recipe-spoon');

      var setX = G ? G.quickTo(spoon, 'x', { duration: 0.18, ease: 'power2.out' }) : null;
      var setY = G ? G.quickTo(spoon, 'y', { duration: 0.18, ease: 'power2.out' }) : null;
      var batterSpin = G ? G.to(batter, { rotation: 360, duration: 1.4, repeat: -1, ease: 'none', paused: true }) : null;

      var NEEDED = 2 * Math.PI * 3;
      var lastAngle = null, totalAng = 0, dragging = false, advanced = false;

      function animSplash(e) {
        if (!G) return;
        var mr = mixArea.getBoundingClientRect();
        var localX = e.clientX - mr.left;
        var localY = e.clientY - mr.top;
        for (var i = 0; i < 3; i++) {
          var s = el('div', 'mix-splash');
          s.style.background = recipe.batterColor;
          mixArea.appendChild(s);
          var ang2 = Math.random() * Math.PI * 2;
          var dist2 = 18 + Math.random() * 22;
          gset(s, { x: localX, y: localY, scale: 0.5 + Math.random() * 0.7 });
          (function (s2) {
            gto(s2, {
              x: localX + Math.cos(ang2) * dist2,
              y: localY + Math.sin(ang2) * dist2 - 22,
              opacity: 0,
              duration: 0.4 + Math.random() * 0.3,
              ease: 'power2.out',
              onComplete: function () { s2.remove(); }
            });
          })(s);
        }
      }

      function place(e) {
        var c = centerOf(mixArea);
        var dx = e.clientX - c.x, dy = e.clientY - c.y;
        var dist = Math.min(Math.hypot(dx, dy), c.r.width * 0.28);
        var ang = Math.atan2(dy, dx);
        var px = Math.cos(ang) * dist, py = Math.sin(ang) * dist;
        if (setX) { setX(px); setY(py); } else spoon.style.transform = 'translate(' + px + 'px,' + py + 'px)';
        if (G) G.to(spoon, { rotation: ang * 180 / Math.PI + 90, duration: 0.18, ease: 'power2.out' });
        return ang;
      }
      function onDown(e) {
        e.preventDefault(); dragging = true; lastAngle = null; audio('_wake');
        if (batterSpin) batterSpin.play();
        try { mixArea.setPointerCapture(e.pointerId); } catch (_) {}
        onMove(e);
      }
      function onMove(e) {
        if (!dragging) return;
        var ang = place(e);
        if (lastAngle !== null) {
          var d = ang - lastAngle;
          if (d > Math.PI) d -= 2 * Math.PI;
          if (d < -Math.PI) d += 2 * Math.PI;
          totalAng += Math.abs(d);
          // Batter wave distortion follows stir direction
          var skew = Math.min(8, Math.max(-8, d * 110));
          gto(batter, { skewX: skew, duration: 0.25, ease: 'power1.out' });
          // Splashes on fast stirs
          if (Math.abs(d) > 0.19 && totalAng > 0.3) animSplash(e);
        }
        lastAngle = ang;
        var p = Math.min(1, totalAng / NEEDED);
        if (G) G.to(ring, { attr: { 'stroke-dashoffset': CIRC * (1 - p) }, duration: 0.2, ease: 'power1.out' });
        else ring.setAttribute('stroke-dashoffset', String(CIRC * (1 - p)));
        gto(batter, { opacity: 0.35 + p * 0.6, duration: 0.2 });
        if (p >= 1 && !advanced) {
          advanced = true; audio('letterDone');
          if (batterSpin) batterSpin.timeScale(2);
          gto(mixArea, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1, ease: 'power2.inOut',
            onComplete: function () { setStep('cook'); } });
        }
      }
      function onUp() { dragging = false; lastAngle = null; if (batterSpin) batterSpin.pause(); }
      mixArea.addEventListener('pointerdown', onDown);
      mixArea.addEventListener('pointermove', onMove);
      mixArea.addEventListener('pointerup', onUp);
      mixArea.addEventListener('pointercancel', onUp);
    }

    // ──────────────────────────── Cook ────────────────────────────
    function stepCook() {
      setTitle(t('recipes.cook', 'Time to cook'));
      var type = S.recipe.cookType;
      if (type === 'pan') cookPan();
      else if (type === 'fry') cookFry();
      else cookOven();
    }

    function advanceToDecorate() { setTimeout(function () { setStep('decorate'); }, 650); }

    // ── Cake: pour batter into a tin, then bake in the oven ──
    function cookOven() {
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');
      var hint = el('p', 'recipe-hint', t('recipes.pour', 'Pouring into the tin…'));

      var pourWrap = el('div', 'cook-pour');
      pourWrap.innerHTML =
        '<div class="pour-bowl">' + bowlSvg() + '</div>' +
        '<div class="pour-stream"></div>' +
        '<div class="cake-tin"><div class="tin-fill" style="background:' + recipe.batterColor + '"></div></div>';
      scene.appendChild(pourWrap);
      stage.appendChild(scene);
      stage.appendChild(hint);

      var pourBowl = pourWrap.querySelector('.pour-bowl');
      var stream = pourWrap.querySelector('.pour-stream');
      var tinFill = pourWrap.querySelector('.tin-fill');
      stream.style.background = recipe.batterColor;

      var tl = gtl({ onComplete: showOven });
      tl.to(pourBowl, { rotation: 38, x: 30, duration: 0.5, ease: 'power2.inOut' })
        .to(stream, { opacity: 1, scaleY: 1, duration: 0.2 }, '-=0.1')
        .to(tinFill, { height: '70%', duration: 0.9, ease: 'power1.inOut' }, '<')
        .to(stream, { opacity: 0, duration: 0.2 })
        .to(pourBowl, { rotation: 0, x: 0, duration: 0.4, ease: 'power2.inOut' });

      function showOven() {
        scene.innerHTML = '';
        hint.textContent = t('recipes.ovenHint', 'Put the tin in the oven');

        var oven = el('div', 'recipe-oven recipe-drop',
          '<svg viewBox="0 0 220 220" width="100%" height="100%" aria-hidden="true">' +
          '<defs><linearGradient id="ovBody" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#6b7484"/><stop offset="1" stop-color="#48505d"/></linearGradient></defs>' +
          '<rect x="18" y="16" width="184" height="188" rx="16" fill="url(#ovBody)"/>' +
          '<rect x="34" y="26" width="152" height="16" rx="8" fill="#3a4250"/>' +
          '<circle cx="160" cy="34" r="6" fill="#ffd166"/><circle cx="142" cy="34" r="6" fill="#8bd3dd"/>' +
          '<rect x="34" y="56" width="152" height="130" rx="12" fill="#222a36"/>' +
          '<rect x="50" y="72" width="120" height="98" rx="8" fill="#10141b"/>' +
          '<ellipse class="oven-glow" cx="110" cy="124" rx="48" ry="30" fill="#ff8c42" opacity="0"/>' +
          '</svg>' +
          '<div class="oven-door"><div class="oven-window"></div><div class="oven-handle"></div></div>');
        scene.appendChild(oven);

        var tin = el('div', 'recipe-carry cake-carry',
          '<div class="cake-tin filled"><div class="tin-fill" style="height:70%;background:' + recipe.batterColor + '"></div></div>');
        scene.appendChild(tin);

        var door = oven.querySelector('.oven-door');
        var glow = oven.querySelector('.oven-glow');

        makeDraggable(tin, function (x, y) {
          if (!hitTest(oven, x, y)) return false;
          hint.textContent = t('recipes.baking', 'Baking…');
          var oRect = oven.getBoundingClientRect();
          var tRect = tin.getBoundingClientRect();
          var dx = (oRect.left + oRect.width / 2) - (tRect.left + tRect.width / 2);
          var dy = (oRect.top + oRect.height * 0.56) - (tRect.top + tRect.height / 2);
          var bake = gtl({ onComplete: function () { advanceToDecorate(); } });

          // Open door, slide tin in, close door
          bake.to(door, { rotationX: -82, duration: 0.4, ease: 'power2.out', transformOrigin: '50% 100%' })
            .to(tin, { x: '+=' + dx, y: '+=' + dy, scale: 0.7, duration: 0.45, ease: 'power2.in' }, '<0.1')
            .set(tin, { opacity: 0 })
            .to(door, { rotationX: 0, duration: 0.35, ease: 'power2.in' });

          // Add oven interior view: cake rising inside
          bake.add(function () {
            var innerView = el('div', 'oven-inner-view');
            oven.appendChild(innerView);
            innerView.innerHTML =
              '<div class="oven-tin-view">' +
              '<div class="oven-cake-fill" style="background:' + recipe.batterColor + '"></div>' +
              '<div class="oven-cake-dome" style="background:' + recipe.cookedColor + '"></div>' +
              '</div>';
            var fill = innerView.querySelector('.oven-cake-fill');
            var dome = innerView.querySelector('.oven-cake-dome');
            // Batter rises over bake duration
            gto(fill, { height: '64%', duration: 2.2, ease: 'power1.inOut' });
            // Dome appears at ~65% through bake
            setTimeout(function () {
              if (S.step !== 'cook') return;
              gto(dome, { scaleY: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' });
            }, 1430);
            // Steam puffs
            spawnSteam(innerView, 1900);
          });

          // Glow pulses + timer
          bake.to(glow, { opacity: 0.75, duration: 0.5, yoyo: true, repeat: 4, ease: 'sine.inOut' })
            .add(addTimerRing(oven, 2600), '<')
            .call(function () { audio('letterDone'); })
            // Door opens, baked cake emoji rises out
            .to(door, { rotationX: -82, duration: 0.35, ease: 'power2.out' })
            .add(function () {
              var cake = el('div', 'baked-cake', recipe.cookedEmoji);
              oven.appendChild(cake);
              gset(cake, { left: '50%', top: '58%', xPercent: -50, yPercent: -50, scale: 0.4, opacity: 0 });
              gto(cake, { scale: 1.1, opacity: 1, top: '20%', duration: 0.6, ease: 'back.out(1.6)' });
            })
            .to(door, { rotationX: 0, duration: 0.3, ease: 'power2.in' }, '+=0.5');
          return true;
        });
      }
    }

    // Returns a tween that runs a timer ring inside `host` for `ms`.
    function addTimerRing(host, ms) {
      var C = 100, R = 60, CIRC = 2 * Math.PI * R;
      var wrap = el('div', 'recipe-timer',
        '<svg viewBox="0 0 200 200" width="100%" height="100%" aria-hidden="true">' +
        '<circle cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="8"/>' +
        '<circle class="tr" cx="' + C + '" cy="' + C + '" r="' + R + '" fill="none" stroke="#ffd166" stroke-width="8" ' +
        'stroke-linecap="round" stroke-dasharray="' + CIRC + '" stroke-dashoffset="' + CIRC + '" ' +
        'transform="rotate(-90 ' + C + ' ' + C + ')"/></svg>');
      host.appendChild(wrap);
      var r = wrap.querySelector('.tr');
      if (!G) { r.setAttribute('stroke-dashoffset', '0'); return function () {}; }
      return G.to(r, { attr: { 'stroke-dashoffset': 0 }, duration: ms / 1000, ease: 'none',
        onComplete: function () { wrap.remove(); } });
    }

    // Organic steam — meanders in lazy S-curves, body-level fixed positioning.
    function spawnSteam(host, ms) {
      if (!G) return;
      var hostR = host.getBoundingClientRect();
      var end = Date.now() + ms;
      (function loop() {
        if (Date.now() > end || S.step !== 'cook') return;
        var b = el('div', 'steam-puff');
        var size = 8 + Math.random() * 9;
        b.style.width = size + 'px'; b.style.height = size + 'px';
        var startX = hostR.left + hostR.width * (0.22 + Math.random() * 0.56);
        var startY = hostR.top + hostR.height * 0.12;
        document.body.appendChild(b);
        gset(b, { x: startX, y: startY, opacity: 0.72, scale: 0.6 });
        var drift = (Math.random() - 0.5) * 32;
        G.timeline()
          .to(b, { y: startY - 20, x: startX + drift * 0.35, opacity: 0.88, scale: 1.05, duration: 0.38, ease: 'power1.out' })
          .to(b, { y: startY - 52, x: startX + drift, opacity: 0, scale: 1.55, duration: 0.68, ease: 'power1.in',
                   onComplete: function () { b.remove(); } });
        setTimeout(loop, 280 + Math.random() * 280);
      })();
    }

    // ── Doughnut: fry in hot oil ──
    function cookFry() {
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');
      var pot = el('div', 'recipe-pot recipe-drop',
        '<svg viewBox="0 0 240 170" width="100%" height="100%" aria-hidden="true">' +
        '<defs><linearGradient id="oilG" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" stop-color="#f2c053"/><stop offset="1" stop-color="#d08a1f"/></linearGradient></defs>' +
        '<ellipse cx="120" cy="150" rx="92" ry="12" fill="rgba(0,24,88,0.12)"/>' +
        '<rect x="30" y="52" width="180" height="92" rx="18" fill="#4a505c"/>' +
        '<rect x="6" y="54" width="30" height="11" rx="5" fill="#2c3340"/>' +
        '<rect x="204" y="54" width="30" height="11" rx="5" fill="#2c3340"/>' +
        '<ellipse cx="120" cy="58" rx="86" ry="18" fill="#2c3340"/>' +
        '<ellipse class="oil" cx="120" cy="62" rx="76" ry="14" fill="url(#oilG)"/>' +
        '</svg>');
      scene.appendChild(pot);
      var ball = el('div', 'recipe-carry dough-ball');
      scene.appendChild(ball);
      stage.appendChild(scene);
      var hint = el('p', 'recipe-hint', t('recipes.fryHint', 'Drop it into the hot oil'));
      stage.appendChild(hint);

      makeDraggable(ball, function (x, y) {
        if (!hitTest(pot, x, y)) return false;
        hint.textContent = t('recipes.frying', 'Frying…');
        gset(ball, { position: 'absolute', left: '50%', top: '38%', xPercent: -50, yPercent: -50 });
        ball.style.transform = '';
        squash(ball, 1.3, 0.6);
        var bob = G ? G.to(ball, { y: 8, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }) : null;
        // Oil shimmer — pulse opacity on oil ellipse while frying
        var oilEl = pot.querySelector('.oil');
        var shimmer = (G && oilEl) ? G.to(oilEl, { opacity: 0.65, duration: 0.38, yoyo: true, repeat: -1, ease: 'sine.inOut' }) : null;
        spawnBubbles(pot, 2400);
        var tl = gtl({ onComplete: function () {
          if (bob) bob.kill();
          ball.classList.add('golden');
          gto(ball, { y: -90, scale: 1.05, duration: 0.6, ease: 'power2.out',
            onComplete: advanceToDecorate });
        } });
        tl.to(ball, { backgroundColor: '#caa24a', duration: 1.6, ease: 'power1.in' })
          .add(addTimerRing(pot, 2400), 0);
        return true;
      });
    }

    function spawnBubbles(pot, ms) {
      if (!G) return;
      var end = performance.now() + ms;
      var count = 0;
      (function loop() {
        if (performance.now() > end || S.step !== 'cook') return;
        count++;
        var b = el('div', 'fry-bubble');
        var sz = 0.4 + Math.random() * 0.9; // vary sizes
        b.style.left = (28 + Math.random() * 44) + '%';
        pot.appendChild(b);
        G.fromTo(b, { y: 0, opacity: 0.85, scale: sz },
          { y: -(28 + Math.random() * 18), opacity: 0, scale: sz * 1.6,
            duration: 0.6 + Math.random() * 0.45, ease: 'power1.out',
            onComplete: function () { b.remove(); } });
        setTimeout(loop, 150 + Math.random() * 200);
      })();
    }

    // ── Pancake: cook one side, then flip in the pan ──
    function cookPan() {
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');
      var pan = el('div', 'recipe-pan',
        '<svg viewBox="0 0 300 180" width="100%" height="100%" aria-hidden="true">' +
        '<defs><radialGradient id="panG" cx="0.5" cy="0.4" r="0.7">' +
        '<stop offset="0" stop-color="#525866"/><stop offset="1" stop-color="#2c3038"/></radialGradient></defs>' +
        '<ellipse cx="120" cy="120" rx="92" ry="44" fill="rgba(0,24,88,0.12)"/>' +
        '<ellipse cx="120" cy="100" rx="92" ry="44" fill="#3a3f49"/>' +
        '<ellipse cx="120" cy="94" rx="92" ry="44" fill="#4a505c"/>' +
        '<ellipse cx="120" cy="92" rx="78" ry="34" fill="url(#panG)"/>' +
        '<rect x="208" y="84" width="86" height="15" rx="7" fill="#2c3038"/>' +
        '<rect x="284" y="80" width="14" height="24" rx="6" fill="#22262d"/>' +
        '</svg>' +
        '<div class="pancake"></div>');
      scene.appendChild(pan);
      stage.appendChild(scene);
      var hint = el('p', 'recipe-hint', t('recipes.panWait', 'Cooking on one side…'));
      stage.appendChild(hint);

      var pancake = pan.querySelector('.pancake');
      pancake.style.background = pancakeShade(0);

      var brown = 0;
      var browning = setInterval(function () {
        brown = Math.min(1, brown + 0.04);
        pancake.style.background = pancakeShade(brown * 0.6);
      }, 90);
      var firstSide = gto({ p: 0 }, { p: 1, duration: 2.2, ease: 'power1.in', onComplete: showFlip });

      function showFlip() {
        clearInterval(browning);
        hint.textContent = t('recipes.flipHint', 'Tap to flip!');
        var flipBtn = el('button', 'recipe-action ready', t('recipes.flip', 'Flip!'));
        stage.appendChild(flipBtn);
        gto(flipBtn, { scale: 1.06, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        var flipped = false;
        flipBtn.addEventListener('click', function () {
          if (flipped) return;
          flipped = true; audio('_wake');
          if (G) G.killTweensOf(flipBtn);
          flipBtn.disabled = true;
          var tl = gtl({ onComplete: function () {
            audio('letterDone'); advanceToDecorate();
          } });
          // Pan tilts sharply to launch the pancake
          tl.to(pan, { rotation: -22, transformOrigin: '68% 55%', duration: 0.16, ease: 'power3.out' })
            // Pancake launches from the tilted pan
            .to(pancake, { y: -160, scaleX: 1.12, duration: 0.32, ease: 'power2.out' }, '<0.04')
            .to(pancake, { rotationX: '+=180', duration: 0.58, ease: 'none' }, '<')
            // Pan swings back level while pancake is in the air
            .to(pan, { rotation: 0, duration: 0.3, ease: 'back.out(1.8)' }, '<0.08')
            // Pancake lands with bounce + squash
            .to(pancake, { y: 0, scaleX: 1, duration: 0.4, ease: 'bounce.out' })
            // Pan small recoil on landing
            .to(pan, { y: -7, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.out' }, '<')
            .call(function () {
              pancake.style.background = pancakeShade(0.85);
              squash(pancake, 1.25, 0.65);
              // Sizzle steam burst from above pan centre — anchorFixed-style fractions.
              var pr = pan.getBoundingClientRect();
              var cx = pr.left + pr.width * 0.42;
              var cy = pr.top + pr.height * 0.15;
              for (var si = 0; si < 6; si++) {
                (function (si) {
                  var s = el('div', 'steam-puff');
                  var sz = 6 + Math.random() * 6;
                  s.style.width = sz + 'px'; s.style.height = sz + 'px';
                  document.body.appendChild(s);
                  var ox = (Math.random() - 0.5) * 70;
                  var drift = (Math.random() - 0.5) * 24;
                  gset(s, { x: cx + ox, y: cy, opacity: 0.8, scale: 0.5 });
                  G.timeline({ delay: si * 0.04 })
                    .to(s, { y: cy - 20, x: cx + ox + drift * 0.4, opacity: 0.9, scale: 1, duration: 0.28, ease: 'power1.out' })
                    .to(s, { y: cy - 48, x: cx + ox + drift, opacity: 0, scale: 1.4, duration: 0.5, ease: 'power1.in',
                             onComplete: function () { s.remove(); } });
                })(si);
              }
            });
        });
      }
    }

    // ─────────────────────────── Decorate ───────────────────────────
    function stepDecorate() {
      setTitle(t('recipes.decorate', 'Decorate your treat'));
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene');

      var treat = el('div', 'recipe-treat recipe-drop',
        '<span class="recipe-treat-emoji">' + recipe.cookedEmoji + '</span>');
      scene.appendChild(treat);
      gset(treat.querySelector('.recipe-treat-emoji'), { scale: 0 });
      gto(treat.querySelector('.recipe-treat-emoji'), { scale: 1, duration: 0.5, ease: 'back.out(1.7)' });

      var tray = el('div', 'recipe-tray');
      recipe.toppings.forEach(function (top) {
        var chip = el('div', 'recipe-item topping', '<span class="recipe-item-emoji">' + top + '</span>');
        makeDraggable(chip, function (x, y) {
          if (hitCircle(treat, x, y)) {
            var r = treat.getBoundingClientRect();
            var fx = (x - r.left) / r.width, fy = (y - r.top) / r.height;
            placeTopping(treat, top, fx, fy, true);
            S.placed.push({ emoji: top, fx: fx, fy: fy });
            audio('strokeDone');
          }
          return false; // always snap back so more can be added
        });
        tray.appendChild(chip);
      });
      scene.appendChild(tray);
      stage.appendChild(scene);

      var doneBtn = el('button', 'recipe-action ready', t('recipes.done', 'All done!'));
      doneBtn.addEventListener('click', function () { setStep('done'); });
      stage.appendChild(doneBtn);
    }

    function placeTopping(treat, emoji, fx, fy, animate) {
      var s = el('span', 'recipe-placed', emoji);
      s.style.left = (fx * 100) + '%';
      s.style.top = (fy * 100) + '%';
      treat.appendChild(s);
      if (animate) {
        gset(s, { scale: 0, y: -30 });
        gto(s, { scale: 1, y: 0, duration: 0.4, ease: 'bounce.out' });
      }
    }

    // ───────────────────────────── Done ─────────────────────────────
    function stepDone() {
      setTitle(t('recipes.finished', 'Yummy!'));
      var recipe = S.recipe;
      var scene = el('div', 'recipe-scene done');

      var treat = el('div', 'recipe-treat big',
        '<span class="recipe-treat-emoji">' + recipe.cookedEmoji + '</span>');
      S.placed.forEach(function (p) { placeTopping(treat, p.emoji, p.fx, p.fy, false); });
      scene.appendChild(treat);
      stage.appendChild(scene);
      gset(treat, { scale: 0, rotation: -12 });
      gto(treat, { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
      if (G) G.to(treat, { y: -10, duration: 1.2, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.7 });

      var row = el('div', 'recipe-done-actions');
      var again = el('button', 'recipe-action', t('recipes.makeAnother', 'Make another'));
      again.addEventListener('click', function () { S.recipe = null; S.placed = []; setStep('pick'); });
      var home = el('button', 'recipe-action secondary', t('recipes.home', 'Home'));
      home.addEventListener('click', function () { ctx.go(APP.screens && APP.screens.map ? 'map' : 'landing'); });
      row.appendChild(again); row.appendChild(home);
      stage.appendChild(row);

      audio('wordDone');
      if (typeof APP.launchConfetti === 'function') { try { APP.launchConfetti(); } catch (_) {} }
    }

    setStep('pick');
  }

  // colour helpers
  function lighten(hex) {
    var c = hex.replace('#', '');
    var n = parseInt(c.length === 3 ? c.replace(/(.)/g, '$1$1') : c, 16);
    var r = Math.min(255, ((n >> 16) & 255) + 40), g = Math.min(255, ((n >> 8) & 255) + 40), b = Math.min(255, (n & 255) + 40);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
  function pancakeShade(brown) {
    var top = mix([245, 222, 168], [196, 140, 60], brown);
    var bot = mix([224, 188, 120], [150, 95, 38], brown);
    return 'radial-gradient(circle at 42% 38%, rgb(' + top.join(',') + '), rgb(' + bot.join(',') + '))';
  }
  function mix(a, b, t2) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * t2); }); }

  APP.screens = APP.screens || {};
  APP.screens.recipes = { render: render };
})(window.APP);

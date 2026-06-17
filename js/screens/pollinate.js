window.APP = window.APP || {};
// Pollination & fruiting. A row of flowers; the child drags the bee onto each
// one. A pollinated flower sparkles and turns into a fruit. When every flower
// has been visited they are all fruit — win. Teaches pollination -> fruit.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  // Flower -> fruit pairings (view data; small enough to keep local).
  var BLOOMS = [
    { flower: '🌸', fruit: '🍓' },
    { flower: '🌼', fruit: '🍊' },
    { flower: '🌷', fruit: '🍎' },
    { flower: '🌺', fruit: '🍑' }
  ];

  function injectStyles() {
    if (document.getElementById('pollinate-css')) return;
    var s = document.createElement('style');
    s.id = 'pollinate-css';
    s.textContent = [
      '.po-screen{display:flex;flex-direction:column;flex:1;min-height:0;background:linear-gradient(180deg,#bfe9ff 0%,#d6f3dc 55%,#9fde7a 100%);}',
      '.po-scene{flex:1;position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:18px;padding:20px;overflow:hidden;min-height:0;}',
      '.po-flower{width:84px;height:84px;border-radius:50%;background:rgba(255,255,255,.55);display:flex;align-items:center;justify-content:center;font-size:2.8rem;transition:transform .3s;box-shadow:0 3px 10px rgba(0,0,0,.12);}',
      '.po-flower.pollinated{transform:scale(1.05);}',
      '.po-flower.fruited{animation:po-pop .5s cubic-bezier(.34,1.56,.64,1);background:rgba(255,244,214,.8);}',
      '@keyframes po-pop{0%{transform:scale(.5)}60%{transform:scale(1.25)}100%{transform:scale(1)}}',
      '.po-prompt{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.72);}',
      '.po-instr{font-size:1.15rem;font-weight:700;color:#256145;text-align:center;}',
      '.po-bee{width:62px;height:62px;border-radius:50%;border:none;background:#fff;box-shadow:0 3px 12px rgba(0,0,0,.22);font-size:2.1rem;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;animation:po-buzz 1.4s ease-in-out infinite;}',
      '.po-bee:active{cursor:grabbing;animation:none;}',
      '@keyframes po-buzz{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-5px) rotate(4deg)}}',
      '.po-bee-clone{position:fixed;z-index:999;width:62px;height:62px;border-radius:50%;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3);font-size:2.1rem;display:flex;align-items:center;justify-content:center;pointer-events:none;}',
      '.po-star{position:absolute;pointer-events:none;font-size:1.5rem;z-index:6;animation:po-spark .9s ease-out forwards;}',
      '@keyframes po-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-24px);opacity:0}}',
      '.po-win{display:flex;flex-direction:column;align-items:center;gap:12px;}',
      '.po-win h2{font-size:1.45rem;color:#256145;margin:0;text-align:center;}',
      // Short-landscape: compact flowers + bee so the bee control stays visible.
      '@media (orientation:landscape) and (max-height:520px){',
      '.po-scene{gap:12px;padding:10px;}',
      '.po-flower{width:68px;height:68px;font-size:2.2rem;}',
      '.po-prompt{padding:6px 14px calc(6px + env(safe-area-inset-bottom,0px));gap:6px;}',
      '.po-instr{font-size:1rem;}',
      '.po-bee{width:54px;height:54px;font-size:1.8rem;}',
      '}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var blooms = shuffle(BLOOMS);
    var total = blooms.length;
    var pollinatedCount = 0;
    var spokenFact = false;
    var done = false;

    var wrap = document.createElement('div');
    wrap.className = 'po-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.pollinate.title'),
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); }
    }));

    var scene = document.createElement('div');
    scene.className = 'po-scene';
    var flowerEls = blooms.map(function (b) {
      var el = document.createElement('div');
      el.className = 'po-flower';
      el.textContent = b.flower;
      el._bloom = b;
      el._pollinated = false;
      scene.appendChild(el);
      return el;
    });
    wrap.appendChild(scene);

    var prompt = document.createElement('div');
    prompt.className = 'po-prompt';
    var instr = document.createElement('div');
    instr.className = 'po-instr';
    instr.textContent = t('pollinate.instr');
    var bee = document.createElement('button');
    bee.className = 'po-bee';
    bee.textContent = '🐝';
    bee.setAttribute('aria-label', 'bee');
    prompt.appendChild(instr);
    prompt.appendChild(bee);
    wrap.appendChild(prompt);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('pollinate');

    function burstStars(anchor, n) {
      var rect = scene.getBoundingClientRect();
      var ar = anchor.getBoundingClientRect();
      var cx = ar.left - rect.left + ar.width / 2;
      var cy = ar.top - rect.top + ar.height / 2;
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'po-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (cx + (Math.random() * 40 - 20)) + 'px';
        star.style.top = (cy + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        scene.appendChild(star);
      }
    }

    function pollinate(flowerEl) {
      if (flowerEl._pollinated || done) return;
      flowerEl._pollinated = true;
      pollinatedCount += 1;
      flowerEl.classList.add('pollinated');
      sfx('pop');
      burstStars(flowerEl, 5);
      if (!spokenFact) { spokenFact = true; speak(t('pollinate.fact')); }
      setTimeout(function () {
        if (!wrap.isConnected) return;
        flowerEl.textContent = flowerEl._bloom.fruit;
        flowerEl.classList.remove('pollinated');
        flowerEl.classList.add('fruited');
      }, 380);
      if (pollinatedCount >= total) finish();
    }

    function finish() {
      if (done) return;
      done = true;
      if (APP.progress) { try { APP.progress.recordWin('pollinate', { stars: 3 }); } catch (_) {} }
      setTimeout(function () {
        if (!wrap.isConnected) return;
        if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
        if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
        instr.textContent = '';
        prompt.removeChild(bee);
        var win = document.createElement('div');
        win.className = 'po-win';
        var h2 = document.createElement('h2');
        h2.textContent = t('pollinate.win') + ' 🍓';
        var again = document.createElement('button');
        again.className = 'btn';
        again.textContent = t('ui.playAgain');
        again.addEventListener('click', function () { render(root, ctx); });
        win.appendChild(h2);
        win.appendChild(again);
        prompt.appendChild(win);
        speak(t('pollinate.win'));
      }, 700);
    }

    // ── Bee drag (clone stays-at-home pattern) ────────────────────────────────
    var dragging = null;
    function moveClone(clone, x, y) { clone.style.left = (x - 31) + 'px'; clone.style.top = (y - 31) + 'px'; }
    bee.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      if (done) return;
      if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
      try { bee.setPointerCapture(e.pointerId); } catch (_) {}
      sfx('click');
      var clone = document.createElement('div');
      clone.className = 'po-bee-clone';
      clone.textContent = '🐝';
      document.body.appendChild(clone);
      moveClone(clone, e.clientX, e.clientY);
      bee.style.opacity = '0.3';
      dragging = { clone: clone };
    });
    bee.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      moveClone(dragging.clone, e.clientX, e.clientY);
    });
    bee.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging.clone.remove();
      dragging = null;
      bee.style.opacity = '';
      for (var i = 0; i < flowerEls.length; i++) {
        var r = flowerEls[i].getBoundingClientRect();
        var pad = 18;
        if (e.clientX >= r.left - pad && e.clientX <= r.right + pad &&
            e.clientY >= r.top - pad && e.clientY <= r.bottom + pad) {
          pollinate(flowerEls[i]);
          return;
        }
      }
    });
    bee.addEventListener('pointercancel', function () {
      if (dragging) { dragging.clone.remove(); dragging = null; bee.style.opacity = ''; }
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.pollinate = { render: render };
})(window.APP);

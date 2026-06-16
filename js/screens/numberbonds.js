window.APP = window.APP || {};
// Number Bonds / partitioning. N dots sit in two boxes; the child drags dots
// between the boxes to show different splits (0+N, 1+(N-1) …). Each distinct
// (unordered) bond lights up in the tracker; find them all to win.
(function (APP) {
  function t(key, vars) { return (APP.t && APP.t(key, vars)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }

  // Pure helper (exposed for unit tests): the distinct unordered number bonds of
  // n, as [a, b] pairs with a <= b and a + b === n. e.g. 5 -> [[0,5],[1,4],[2,3]].
  APP.numberBonds = function (n) {
    var out = [];
    for (var a = 0; a <= Math.floor(n / 2); a++) out.push([a, n - a]);
    return out;
  };

  var DEFAULTS = { total: 5 };

  function injectStyles() {
    if (document.getElementById('numberbonds-css')) return;
    var s = document.createElement('style');
    s.id = 'numberbonds-css';
    s.textContent = [
      '.nb-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#eef0ff,#eef8ef);}',
      '.nb-body{flex:1;display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px 14px;overflow-y:auto;}',
      '.nb-prompt{font-size:1.05rem;font-weight:700;color:#4636a3;text-align:center;}',
      '.nb-track{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}',
      '.nb-bond{font-size:.95rem;font-weight:800;padding:5px 9px;border-radius:10px;background:#fff;color:#888;box-shadow:0 2px 6px rgba(0,0,0,.12);}',
      '.nb-bond.found{background:#06d6a0;color:#fff;}',
      '.nb-eq{font-size:1.5rem;font-weight:800;color:#2a2a4a;}',
      '.nb-boxes{display:flex;gap:12px;width:100%;max-width:480px;}',
      '.nb-box{flex:1;min-height:170px;border-radius:18px;padding:10px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;justify-content:center;border:3px dashed rgba(0,0,0,.18);box-sizing:border-box;}',
      '.nb-box.left{background:rgba(116,160,230,.18);}',
      '.nb-box.right{background:rgba(245,166,90,.18);}',
      '.nb-box.over{border-color:#4a90d9;background:rgba(116,160,230,.34);}',
      '.nb-count{font-size:1.2rem;font-weight:800;text-align:center;color:#555;margin-top:2px;}',
      '.nb-token{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fb3ee,#3a78c2);box-shadow:0 2px 5px rgba(0,0,0,.25);cursor:grab;touch-action:none;}',
      '.nb-token:active{cursor:grabbing;}',
      '.nb-token-clone{position:fixed;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fb3ee,#3a78c2);box-shadow:0 6px 14px rgba(0,0,0,.3);pointer-events:none;z-index:999;}',
      '.nb-star{position:fixed;pointer-events:none;font-size:1.6rem;z-index:200;animation:nb-spark .9s ease-out forwards;}',
      '@keyframes nb-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-28px);opacity:0}}',
      '.nb-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:26px;text-align:center;}',
      '.nb-win h2{font-size:1.55rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('numberbonds', DEFAULTS);
    var N = settings.total || DEFAULTS.total;
    var targets = APP.numberBonds(N);
    var found = {};
    var foundCount = 0;
    var done = false;

    var wrap = document.createElement('div');
    wrap.className = 'nb-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.numberbonds.title'),
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); },
      settings: {
        gameId: 'numberbonds',
        title: t('game.numberbonds.title'),
        schema: [{
          type: 'segmented', key: 'total', label: t('numberbonds.total'),
          options: [{ value: 5, label: '5' }, { value: 10, label: '10' }]
        }],
        onChange: function (key, val, all) { APP.settings.saveGame('numberbonds', all); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'nb-body';

    var prompt = document.createElement('div');
    prompt.className = 'nb-prompt';
    prompt.textContent = t('numberbonds.prompt', { n: N });
    body.appendChild(prompt);

    // bond tracker
    var track = document.createElement('div');
    track.className = 'nb-track';
    var bondEls = {};
    targets.forEach(function (pair) {
      var chip = document.createElement('span');
      chip.className = 'nb-bond';
      chip.textContent = pair[0] + '+' + pair[1];
      bondEls[pair[0] + '-' + pair[1]] = chip;
      track.appendChild(chip);
    });
    body.appendChild(track);

    var eq = document.createElement('div');
    eq.className = 'nb-eq';
    body.appendChild(eq);

    var boxesWrap = document.createElement('div');
    boxesWrap.className = 'nb-boxes';
    var leftBox = document.createElement('div'); leftBox.className = 'nb-box left';
    var rightBox = document.createElement('div'); rightBox.className = 'nb-box right';
    boxesWrap.appendChild(leftBox);
    boxesWrap.appendChild(rightBox);
    body.appendChild(boxesWrap);

    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('numberbonds');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'nb-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function boxAt(x, y) {
      var boxes = [leftBox, rightBox];
      for (var i = 0; i < boxes.length; i++) {
        var r = boxes[i].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return boxes[i];
      }
      return null;
    }

    function recount(silent) {
      var l = leftBox.querySelectorAll('.nb-token').length;
      var r = rightBox.querySelectorAll('.nb-token').length;
      eq.textContent = l + ' + ' + r + ' = ' + N;
      var key = Math.min(l, r) + '-' + Math.max(l, r);
      if (bondEls[key] && !found[key]) {
        found[key] = true;
        foundCount += 1;
        bondEls[key].classList.add('found');
        if (!silent) {
          sfx('pop');
          var br = bondEls[key].getBoundingClientRect();
          burstStars(br.left + br.width / 2, br.top, 4);
        }
        if (foundCount >= targets.length) finish();
      }
    }

    function makeToken() {
      var el = document.createElement('div');
      el.className = 'nb-token';
      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - 17) + 'px'; clone.style.top = (y - 17) + 'px'; }
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (done) return;
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        try { el.setPointerCapture(e.pointerId); } catch (_) {}
        var clone = document.createElement('div');
        clone.className = 'nb-token-clone';
        document.body.appendChild(clone);
        moveClone(clone, e.clientX, e.clientY);
        el.style.opacity = '0.3';
        dragging = { clone: clone };
      });
      el.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        moveClone(dragging.clone, e.clientX, e.clientY);
        var b = boxAt(e.clientX, e.clientY);
        leftBox.classList.toggle('over', b === leftBox && b !== el.parentElement);
        rightBox.classList.toggle('over', b === rightBox && b !== el.parentElement);
      });
      el.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging.clone.remove();
        dragging = null;
        el.style.opacity = '';
        leftBox.classList.remove('over'); rightBox.classList.remove('over');
        var target = boxAt(e.clientX, e.clientY);
        if (target && target !== el.parentElement) {
          target.appendChild(el);
          recount();
        }
      });
      el.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; el.style.opacity = ''; leftBox.classList.remove('over'); rightBox.classList.remove('over'); }
      });
      return el;
    }

    // Start: all dots in the left box → registers the 0+N bond silently.
    for (var i = 0; i < N; i++) leftBox.appendChild(makeToken());
    recount(true);

    function finish() {
      if (done) return;
      done = true;
      if (APP.progress) { try { APP.progress.recordWin('numberbonds', { stars: 3 }); } catch (_) {} }
      setTimeout(function () {
        if (!wrap.isConnected) return;
        if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
        if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
        body.innerHTML = '';
        var win = document.createElement('div');
        win.className = 'nb-win';
        var h2 = document.createElement('h2');
        h2.textContent = t('numberbonds.win') + ' 🎉';
        var again = document.createElement('button');
        again.className = 'btn';
        again.textContent = t('ui.playAgain');
        again.addEventListener('click', function () { render(root, ctx); });
        win.appendChild(h2);
        win.appendChild(again);
        body.appendChild(win);
        speak(t('numberbonds.win'));
      }, 500);
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.numberbonds = { render: render };
})(window.APP);

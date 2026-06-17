window.APP = window.APP || {};
// Number Bonds / partitioning. A target equation (a + b = N) is shown as the
// goal; the N balls start randomly split between two boxes, and the child drags
// balls between the boxes until each holds the target amount. The live sum
// (L + R = N) updates as they drag — every split makes the same N. On success
// the commutative twin (a + b and b + a) is revealed: they make the same total.
// Work through every distinct bond of N to win.
(function (APP) {
  function t(key, vars) { return (APP.t && APP.t(key, vars)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  // Pure helper (exposed for unit tests): the distinct unordered number bonds of
  // n, as [a, b] pairs with a <= b and a + b === n. e.g. 5 -> [[0,5],[1,4],[2,3]].
  APP.numberBonds = function (n) {
    var out = [];
    for (var a = 0; a <= Math.floor(n / 2); a++) out.push([a, n - a]);
    return out;
  };

  // Pure helper (exposed for unit tests): a random split {left, right} of total
  // whose left count is NOT targetLeft — so the balls never start already solved.
  // rnd defaults to Math.random; inject a stub for deterministic tests.
  APP.numberBondsScramble = function (total, targetLeft, rnd) {
    rnd = rnd || Math.random;
    if (total <= 0) return { left: 0, right: 0 };
    var left, guard = 0;
    do {
      left = Math.floor(rnd() * (total + 1)); // 0..total inclusive
      guard++;
    } while (left === targetLeft && guard < 100);
    return { left: left, right: total - left };
  };

  var DEFAULTS = { total: 5 };

  function injectStyles() {
    if (document.getElementById('numberbonds-css')) return;
    var s = document.createElement('style');
    s.id = 'numberbonds-css';
    s.textContent = [
      '.nb-screen{display:flex;flex-direction:column;flex:1;min-height:0;background:linear-gradient(180deg,#eef0ff,#eef8ef);}',
      '.nb-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:12px;padding:14px;overflow-y:auto;}',
      '.nb-progress{font-size:.9rem;font-weight:700;color:#6a5acd;}',
      // goal banner — the target arrangement to build
      '.nb-goal{display:flex;align-items:center;gap:8px;font-size:1.05rem;font-weight:700;color:#4636a3;background:#fff;border-radius:14px;padding:8px 16px;box-shadow:0 2px 8px rgba(0,0,0,.1);}',
      '.nb-chip-num{display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:32px;border-radius:9px;font-size:1.3rem;font-weight:800;color:#fff;padding:0 6px;}',
      '.nb-chip-num.left{background:#4a90d9;}',
      '.nb-chip-num.right{background:#ef8a3c;}',
      '.nb-op{font-size:1.25rem;font-weight:800;color:#777;}',
      // boxes (left=blue, right=orange to match the equation colours)
      '.nb-boxes{display:flex;gap:12px;width:100%;max-width:480px;}',
      '.nb-box{flex:1;min-height:150px;border-radius:18px;padding:10px;display:flex;flex-wrap:wrap;gap:8px;align-content:flex-start;justify-content:center;border:3px dashed rgba(0,0,0,.18);box-sizing:border-box;transition:border-color .2s,background .2s;}',
      '.nb-box.left{background:rgba(74,144,217,.16);}',
      '.nb-box.right{background:rgba(239,138,60,.16);}',
      '.nb-box.left.over{border-color:#4a90d9;background:rgba(74,144,217,.32);}',
      '.nb-box.right.over{border-color:#ef8a3c;background:rgba(239,138,60,.32);}',
      '.nb-box.match{border-style:solid;border-color:#06d6a0;}',
      // live sum: [L] + [R] = [N]
      '.nb-sum{display:flex;align-items:center;gap:10px;font-size:1.9rem;font-weight:800;color:#2a2a4a;}',
      '.nb-num{display:inline-flex;align-items:center;justify-content:center;min-width:44px;height:44px;border-radius:10px;color:#fff;}',
      '.nb-num.left{background:#4a90d9;}',
      '.nb-num.right{background:#ef8a3c;}',
      '.nb-num.total{background:#6a5acd;}',
      '.nb-status{font-size:1.05rem;font-weight:700;color:#4636a3;text-align:center;min-height:1.4em;display:flex;flex-direction:column;gap:2px;align-items:center;}',
      '.nb-status.solved{color:#1a8a6a;}',
      '.nb-same{font-size:1.15rem;color:#06a37a;}',
      // tokens
      '.nb-token{width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fb3ee,#3a78c2);box-shadow:0 2px 5px rgba(0,0,0,.25);cursor:grab;touch-action:none;}',
      '.nb-token:active{cursor:grabbing;}',
      '.nb-token-clone{position:fixed;width:34px;height:34px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#7fb3ee,#3a78c2);box-shadow:0 6px 14px rgba(0,0,0,.3);pointer-events:none;z-index:999;}',
      '.nb-star{position:fixed;pointer-events:none;font-size:1.6rem;z-index:200;animation:nb-spark .9s ease-out forwards;}',
      '@keyframes nb-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-28px);opacity:0}}',
      '.nb-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:26px;text-align:center;}',
      '.nb-win h2{font-size:1.55rem;color:#06a37a;margin:0;}',
      // Short-landscape: shrink boxes / numbers / balls so it all fits.
      '@media (orientation:landscape) and (max-height:520px){',
      '.nb-body{gap:8px;padding:8px 14px;}',
      '.nb-box{min-height:92px;}',
      '.nb-sum{font-size:1.5rem;}',
      '.nb-num{min-width:36px;height:36px;}',
      '.nb-token,.nb-token-clone{width:28px;height:28px;}',
      '}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('numberbonds', DEFAULTS);
    var N = settings.total || DEFAULTS.total;
    var bonds = shuffle(APP.numberBonds(N));
    var roundIdx = -1;
    var target = null;            // { left, right } for the current round
    var solvedThisRound = false;
    var done = false;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { timers = timers.filter(function (x) { return x !== id; }); if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    // small DOM builders (no outer deps)
    function numEl(side) { var e = document.createElement('span'); e.className = 'nb-num ' + side; e.textContent = '0'; return e; }
    function op(ch) { var e = document.createElement('span'); e.className = 'nb-op'; e.textContent = ch; return e; }
    function chip(n, side) { var e = document.createElement('span'); e.className = 'nb-chip-num ' + side; e.textContent = n; return e; }

    var wrap = document.createElement('div');
    wrap.className = 'nb-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.numberbonds.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('numberbonds')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'numberbonds',
        title: t('game.numberbonds.title'),
        schema: [{
          type: 'segmented', key: 'total', label: t('numberbonds.total'),
          options: [{ value: 5, label: '5' }, { value: 10, label: '10' }]
        }],
        onChange: function (key, val, all) { APP.settings.saveGame('numberbonds', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'nb-body';

    var progressEl = document.createElement('div');
    progressEl.className = 'nb-progress';
    body.appendChild(progressEl);

    var goalEl = document.createElement('div');
    goalEl.className = 'nb-goal';
    body.appendChild(goalEl);

    var boxesWrap = document.createElement('div');
    boxesWrap.className = 'nb-boxes';
    var leftBox = document.createElement('div'); leftBox.className = 'nb-box left';
    var rightBox = document.createElement('div'); rightBox.className = 'nb-box right';
    boxesWrap.appendChild(leftBox);
    boxesWrap.appendChild(rightBox);
    body.appendChild(boxesWrap);

    var sumEl = document.createElement('div');
    sumEl.className = 'nb-sum';
    var sumLeft = numEl('left');
    var sumRight = numEl('right');
    var sumTotal = numEl('total'); sumTotal.textContent = N;
    sumEl.appendChild(sumLeft);
    sumEl.appendChild(op('+'));
    sumEl.appendChild(sumRight);
    sumEl.appendChild(op('='));
    sumEl.appendChild(sumTotal);
    body.appendChild(sumEl);

    var statusEl = document.createElement('div');
    statusEl.className = 'nb-status';
    body.appendChild(statusEl);

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

    function recount() {
      var l = leftBox.querySelectorAll('.nb-token').length;
      var r = rightBox.querySelectorAll('.nb-token').length;
      sumLeft.textContent = l;
      sumRight.textContent = r;
      if (!solvedThisRound && target && l === target.left && r === target.right) solveRound();
    }

    function makeToken() {
      var el = document.createElement('div');
      el.className = 'nb-token';
      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - 17) + 'px'; clone.style.top = (y - 17) + 'px'; }
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (done || solvedThisRound) return;
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
        var tb = boxAt(e.clientX, e.clientY);
        if (tb && tb !== el.parentElement) { tb.appendChild(el); recount(); }
      });
      el.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; el.style.opacity = ''; leftBox.classList.remove('over'); rightBox.classList.remove('over'); }
      });
      return el;
    }

    function setGoal(a, b) {
      goalEl.innerHTML = '';
      var label = document.createElement('span');
      label.textContent = t('numberbonds.make');
      goalEl.appendChild(label);
      goalEl.appendChild(chip(a, 'left'));
      goalEl.appendChild(op('+'));
      goalEl.appendChild(chip(b, 'right'));
    }

    function showTwin(a, b) {
      statusEl.className = 'nb-status solved';
      statusEl.innerHTML = '';
      var l1 = document.createElement('div'); l1.textContent = a + ' + ' + b + ' = ' + N;
      statusEl.appendChild(l1);
      if (a !== b) { var l2 = document.createElement('div'); l2.textContent = b + ' + ' + a + ' = ' + N; statusEl.appendChild(l2); }
      var same = document.createElement('div'); same.className = 'nb-same'; same.textContent = t('numberbonds.same');
      statusEl.appendChild(same);
      speak(t('numberbonds.same'));
    }

    function solveRound() {
      solvedThisRound = true;
      leftBox.classList.add('match'); rightBox.classList.add('match');
      sfx('pop');
      var br = boxesWrap.getBoundingClientRect();
      burstStars(br.left + br.width / 2, br.top + br.height / 2, 6);
      showTwin(target.left, target.right);
      if (roundIdx + 1 >= bonds.length) later(finish, 1800);
      else later(nextRound, 2100);
    }

    function nextRound() {
      roundIdx += 1;
      if (roundIdx >= bonds.length) { finish(); return; }
      solvedThisRound = false;
      statusEl.className = 'nb-status';
      statusEl.textContent = t('numberbonds.prompt');
      leftBox.classList.remove('match'); rightBox.classList.remove('match');

      var bond = bonds[roundIdx];
      var a = bond[0], b = bond[1];
      if (a !== b && Math.random() < 0.5) { var tmp = a; a = b; b = tmp; } // vary which side is the target
      target = { left: a, right: b };

      progressEl.textContent = (roundIdx + 1) + ' / ' + bonds.length;
      setGoal(a, b);

      leftBox.innerHTML = ''; rightBox.innerHTML = '';
      var split = APP.numberBondsScramble(N, target.left);
      var i;
      for (i = 0; i < split.left; i++) leftBox.appendChild(makeToken());
      for (i = 0; i < split.right; i++) rightBox.appendChild(makeToken());
      recount();
    }

    function finish() {
      if (done) return;
      done = true;
      if (APP.progress) { try { APP.progress.recordWin('numberbonds', { stars: 3 }); } catch (_) {} }
      later(function () {
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
        again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
        win.appendChild(h2);
        win.appendChild(again);
        body.appendChild(win);
        speak(t('numberbonds.win'));
      }, 500);
    }

    nextRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.numberbonds = { render: render };
})(window.APP);

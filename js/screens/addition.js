window.APP = window.APP || {};
// Adding Up. An addition problem shown with both objects and numerals
// (e.g. 3 🍎 + 2 🍎 = ?); the child counts and taps the answer from four
// choices. Five correct rounds win. Difficulty `maxSum` (5 / 10 / 20).
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  var ITEMS = ['🍎', '⭐', '🍓', '🐞', '🌸', '🍊', '🐥', '🎈'];
  var DEFAULTS = { maxSum: 10 };
  var ROUNDS = 5;

  function injectStyles() {
    if (document.getElementById('addition-css')) return;
    var s = document.createElement('style');
    s.id = 'addition-css';
    s.textContent = [
      '.ad-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#fff3e6,#eef8ef);}',
      '.ad-body{flex:1;display:flex;flex-direction:column;align-items:center;gap:18px;padding:16px;overflow-y:auto;}',
      '.ad-progress{font-size:.95rem;font-weight:700;color:#e07a2c;}',
      '.ad-problem{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:10px;width:100%;max-width:480px;}',
      '.ad-group{display:flex;flex-wrap:wrap;gap:4px;justify-content:center;align-items:center;background:rgba(255,255,255,.6);border-radius:14px;padding:10px;max-width:200px;}',
      '.ad-obj{font-size:1.9rem;line-height:1;animation:ad-drop .3s ease both;}',
      '@keyframes ad-drop{from{transform:scale(.5);opacity:0}to{transform:none;opacity:1}}',
      '.ad-op{font-size:2.1rem;font-weight:800;color:#c0612a;}',
      '.ad-q{font-size:2.2rem;font-weight:800;color:#1a4a6b;min-width:34px;text-align:center;}',
      '.ad-options{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}',
      '.ad-opt{min-width:64px;height:64px;font-size:1.7rem;font-weight:800;border:none;border-radius:14px;background:#fff;color:#1a4a6b;box-shadow:0 3px 9px rgba(0,0,0,.18);cursor:pointer;}',
      '.ad-opt:active{transform:translateY(2px);}',
      '.ad-opt.right{background:#06d6a0;color:#fff;}',
      '.ad-opt.wrong{animation:ad-nope .4s ease;}',
      '@keyframes ad-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.ad-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:ad-spark .9s ease-out forwards;}',
      '@keyframes ad-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.ad-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;}',
      '.ad-win h2{font-size:1.7rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function makeOptions(answer, maxSum) {
    var pool = [];
    for (var n = 1; n <= Math.max(maxSum, answer + 3); n++) { if (n !== answer) pool.push(n); }
    pool = shuffle(pool);
    // Prefer near-neighbours for plausible distractors.
    pool.sort(function (a, b) { return Math.abs(a - answer) - Math.abs(b - answer); });
    var opts = [answer].concat(pool.slice(0, 3));
    return shuffle(opts);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('addition', DEFAULTS);
    var maxSum = settings.maxSum || DEFAULTS.maxSum;
    var roundsDone = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'ad-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.addition.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('addition')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'addition',
        title: t('game.addition.title'),
        schema: [{
          type: 'segmented', key: 'maxSum', label: t('addition.range'),
          options: [{ value: 5, label: '5' }, { value: 10, label: '10' }, { value: 20, label: '20' }]
        }],
        onChange: function (key, val, all) { APP.settings.saveGame('addition', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'ad-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('addition');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'ad-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function group(n, emoji) {
      var g = document.createElement('div');
      g.className = 'ad-group';
      for (var i = 0; i < n; i++) {
        var o = document.createElement('span');
        o.className = 'ad-obj';
        o.textContent = emoji;
        o.style.animationDelay = (i * 0.04) + 's';
        g.appendChild(o);
      }
      return g;
    }

    function newRound() {
      body.innerHTML = '';
      var answer = 2 + Math.floor(Math.random() * (maxSum - 1)); // 2..maxSum
      var a = 1 + Math.floor(Math.random() * (answer - 1));      // 1..answer-1
      var b = answer - a;
      var emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      var answered = false;

      var prog = document.createElement('div');
      prog.className = 'ad-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      var problem = document.createElement('div');
      problem.className = 'ad-problem';
      problem.appendChild(group(a, emoji));
      var plus = document.createElement('span'); plus.className = 'ad-op'; plus.textContent = '+';
      problem.appendChild(plus);
      problem.appendChild(group(b, emoji));
      var eq = document.createElement('span'); eq.className = 'ad-op'; eq.textContent = '=';
      problem.appendChild(eq);
      var q = document.createElement('span'); q.className = 'ad-q'; q.textContent = '?';
      problem.appendChild(q);
      body.appendChild(problem);

      var options = document.createElement('div');
      options.className = 'ad-options';
      makeOptions(answer, maxSum).forEach(function (opt) {
        var b2 = document.createElement('button');
        b2.className = 'ad-opt';
        b2.textContent = opt;
        b2.addEventListener('click', function () {
          if (answered) return;
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          if (opt === answer) {
            answered = true;
            b2.classList.add('right');
            q.textContent = answer;
            sfx('pop');
            speak(String(answer));
            var r = b2.getBoundingClientRect();
            burstStars(r.left + r.width / 2, r.top, 5);
            roundsDone += 1;
            if (roundsDone >= ROUNDS) later(showWin, 850);
            else later(newRound, 950);
          } else {
            sfx('wrong');
            b2.classList.remove('wrong'); void b2.offsetWidth; b2.classList.add('wrong');
          }
        });
        options.appendChild(b2);
      });
      body.appendChild(options);
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('addition', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'ad-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('addition.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2);
      win.appendChild(again);
      body.appendChild(win);
      speak(t('addition.win'));
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.addition = { render: render };
})(window.APP);

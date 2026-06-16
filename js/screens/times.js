window.APP = window.APP || {};
// Times Tables. A multiplication shown as groups of items (e.g. 3 groups of 2
// stars) plus the numerals "3 × 2 = ?"; the child taps the product from four
// choices. Small products show a countable array; larger ones are numerals
// only. Difficulty `tables`: easy (×2,5,10) / mid (×2–5) / hard (×2–12).
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  var DEFAULTS = { tables: 'easy' };
  var ROUNDS = 5;
  var ARRAY_MAX = 30; // show the countable array only up to this product
  var DIFFS = {
    easy: { tables: [2, 5, 10], maxGroups: 10 },
    mid:  { tables: [2, 3, 4, 5], maxGroups: 10 },
    hard: { tables: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], maxGroups: 12 }
  };

  function injectStyles() {
    if (document.getElementById('times-css')) return;
    var s = document.createElement('style');
    s.id = 'times-css';
    s.textContent = [
      '.tx-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#f3e9ff,#eef8ef);}',
      '.tx-body{flex:1;display:flex;flex-direction:column;align-items:center;gap:16px;padding:16px;overflow-y:auto;}',
      '.tx-progress{font-size:.95rem;font-weight:700;color:#7c4ddb;}',
      '.tx-eq{font-size:2rem;font-weight:800;color:#3a2a5a;}',
      '.tx-array{display:flex;flex-direction:column;gap:8px;align-items:center;}',
      '.tx-group{display:flex;gap:5px;background:rgba(255,255,255,.6);border-radius:12px;padding:6px 9px;}',
      '.tx-dot{font-size:1.5rem;line-height:1;animation:tx-pop .3s ease both;}',
      '@keyframes tx-pop{from{transform:scale(.4);opacity:0}to{transform:none;opacity:1}}',
      '.tx-options{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}',
      '.tx-opt{min-width:64px;height:64px;font-size:1.6rem;font-weight:800;border:none;border-radius:14px;background:#fff;color:#3a2a5a;box-shadow:0 3px 9px rgba(0,0,0,.18);cursor:pointer;}',
      '.tx-opt:active{transform:translateY(2px);}',
      '.tx-opt.right{background:#06d6a0;color:#fff;}',
      '.tx-opt.wrong{animation:tx-nope .4s ease;}',
      '@keyframes tx-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.tx-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:tx-spark .9s ease-out forwards;}',
      '@keyframes tx-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.tx-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;}',
      '.tx-win h2{font-size:1.6rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function makeOptions(groups, per, product) {
    var cand = [product + per, product - per, product + groups, product - groups,
      product + 1, product - 1, (groups + 1) * per, (groups > 1 ? (groups - 1) * per : product + 2)];
    var opts = [product];
    shuffle(cand).forEach(function (c) {
      if (opts.length < 4 && c > 0 && opts.indexOf(c) < 0) opts.push(c);
    });
    var f = 2;
    while (opts.length < 4) { var v = product + f; if (v > 0 && opts.indexOf(v) < 0) opts.push(v); f++; }
    return shuffle(opts);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('times', DEFAULTS);
    var diffKey = DIFFS[settings.tables] ? settings.tables : 'easy';
    var cfg = DIFFS[diffKey];
    var roundsDone = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'tx-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.times.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('times')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'times',
        title: t('game.times.title'),
        schema: [{
          type: 'segmented', key: 'tables', label: t('times.tables'),
          options: [
            { value: 'easy', label: t('ui.easy') },
            { value: 'mid', label: t('ui.medium') },
            { value: 'hard', label: t('ui.hard') }
          ]
        }],
        onChange: function (key, val, all) { APP.settings.saveGame('times', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'tx-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('times');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'tx-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function newRound() {
      body.innerHTML = '';
      var per = cfg.tables[Math.floor(Math.random() * cfg.tables.length)];
      var groups = 1 + Math.floor(Math.random() * cfg.maxGroups);
      var product = groups * per;
      var answered = false;

      var prog = document.createElement('div');
      prog.className = 'tx-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      var eq = document.createElement('div');
      eq.className = 'tx-eq';
      eq.textContent = groups + ' × ' + per + ' = ?';
      body.appendChild(eq);

      if (product <= ARRAY_MAX) {
        var array = document.createElement('div');
        array.className = 'tx-array';
        for (var g = 0; g < groups; g++) {
          var grp = document.createElement('div');
          grp.className = 'tx-group';
          for (var k = 0; k < per; k++) {
            var dot = document.createElement('span');
            dot.className = 'tx-dot';
            dot.textContent = '⭐';
            dot.style.animationDelay = ((g * per + k) * 0.02) + 's';
            grp.appendChild(dot);
          }
          array.appendChild(grp);
        }
        body.appendChild(array);
      }

      var options = document.createElement('div');
      options.className = 'tx-options';
      makeOptions(groups, per, product).forEach(function (opt) {
        var b = document.createElement('button');
        b.className = 'tx-opt';
        b.textContent = opt;
        b.addEventListener('click', function () {
          if (answered) return;
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          if (opt === product) {
            answered = true;
            b.classList.add('right');
            eq.textContent = groups + ' × ' + per + ' = ' + product;
            sfx('pop');
            speak(String(product));
            var r = b.getBoundingClientRect();
            burstStars(r.left + r.width / 2, r.top, 5);
            roundsDone += 1;
            if (roundsDone >= ROUNDS) later(showWin, 850);
            else later(newRound, 950);
          } else {
            sfx('wrong');
            b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
          }
        });
        options.appendChild(b);
      });
      body.appendChild(options);
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('times', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'tx-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('times.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2);
      win.appendChild(again);
      body.appendChild(win);
      speak(t('times.win'));
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.times = { render: render };
})(window.APP);

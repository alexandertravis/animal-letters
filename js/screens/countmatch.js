window.APP = window.APP || {};
// Count & Match. A bunch of identical items appears; the child counts them and
// taps the matching numeral from the number line. Five correct rounds win.
// Difficulty `range` sets how high we count (1-5 / 1-10 / 1-20).
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }

  var ITEMS = ['🦆', '🍎', '⭐', '🐢', '🌸', '🐝', '🐞', '🍓', '🐟', '🎈', '🍊', '🐥'];
  var DEFAULTS = { range: 10 };
  var ROUNDS = 5;

  function injectStyles() {
    if (document.getElementById('countmatch-css')) return;
    var s = document.createElement('style');
    s.id = 'countmatch-css';
    s.textContent = [
      '.cm-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#eaf4ff,#eef8ef);}',
      '.cm-body{flex:1;display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 16px;overflow-y:auto;}',
      '.cm-progress{font-size:.95rem;font-weight:700;color:#3a7ca5;}',
      '.cm-prompt{font-size:1.3rem;font-weight:800;color:#1a4a6b;}',
      '.cm-items{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;width:100%;max-width:460px;min-height:120px;background:rgba(255,255,255,.55);border-radius:18px;padding:14px;box-sizing:border-box;}',
      '.cm-item{font-size:2.6rem;line-height:1;animation:cm-drop .35s ease both;}',
      '@keyframes cm-drop{from{transform:translateY(-12px) scale(.6);opacity:0}to{transform:none;opacity:1}}',
      // Mini-win: counted items do a Mexican wave on a correct answer.
      '@keyframes cm-wave{0%{transform:translateY(0)}40%{transform:translateY(-20px) scale(1.12)}100%{transform:translateY(0)}}',
      '.cm-item.cm-wave{animation:cm-wave .45s ease;}',
      '.cm-numline{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;width:100%;max-width:460px;}',
      '.cm-num{min-width:46px;height:52px;font-size:1.4rem;font-weight:800;border:none;border-radius:12px;background:#fff;color:#1a4a6b;box-shadow:0 3px 8px rgba(0,0,0,.16);cursor:pointer;}',
      '.cm-num:active{transform:translateY(2px);}',
      '.cm-num.wrong{animation:cm-nope .4s ease;}',
      '.cm-num.right{background:#06d6a0;color:#fff;}',
      '@keyframes cm-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.cm-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:cm-spark .9s ease-out forwards;}',
      '@keyframes cm-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.cm-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;}',
      '.cm-win h2{font-size:1.7rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('countmatch', DEFAULTS);
    var range = settings.range || DEFAULTS.range;
    var roundsDone = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'cm-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.countmatch.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('countmatch')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'countmatch',
        title: t('game.countmatch.title'),
        schema: [{
          type: 'segmented', key: 'range', label: t('countmatch.range'),
          options: [{ value: 5, label: '1–5' }, { value: 10, label: '1–10' }, { value: 20, label: '1–20' }]
        }],
        onChange: function (key, val, all) { APP.settings.saveGame('countmatch', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'cm-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('countmatch');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'cm-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function newRound() {
      body.innerHTML = '';
      var count = 1 + Math.floor(Math.random() * range);
      var emoji = ITEMS[Math.floor(Math.random() * ITEMS.length)];
      var answered = false;

      var prog = document.createElement('div');
      prog.className = 'cm-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      var prompt = document.createElement('div');
      prompt.className = 'cm-prompt';
      prompt.textContent = t('countmatch.prompt');
      body.appendChild(prompt);

      var items = document.createElement('div');
      items.className = 'cm-items';
      for (var i = 0; i < count; i++) {
        var it = document.createElement('span');
        it.className = 'cm-item';
        it.textContent = emoji;
        it.style.animationDelay = (i * 0.04) + 's';
        items.appendChild(it);
      }
      body.appendChild(items);

      // Sweep a bounce across the counted items, left to right. The crest
      // spans a fixed 0.34s regardless of count, so the wave always finishes
      // before the round advances.
      function mexicanWave() {
        var els = items.querySelectorAll('.cm-item');
        var stag = els.length > 1 ? 0.34 / (els.length - 1) : 0;
        for (var i = 0; i < els.length; i++) {
          els[i].classList.remove('cm-wave');
          void els[i].offsetWidth;
          els[i].style.animationDelay = (i * stag) + 's';
          els[i].classList.add('cm-wave');
        }
      }

      var numline = document.createElement('div');
      numline.className = 'cm-numline';
      for (var n = 1; n <= range; n++) {
        (function (n) {
          var b = document.createElement('button');
          b.className = 'cm-num';
          b.textContent = n;
          b.addEventListener('click', function (e) {
            if (answered) return;
            if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
            if (n === count) {
              answered = true;
              b.classList.add('right');
              sfx('pop');
              speak(String(count));
              var r = b.getBoundingClientRect();
              burstStars(r.left + r.width / 2, r.top, 5);
              mexicanWave();
              roundsDone += 1;
              if (roundsDone >= ROUNDS) later(showWin, 950);
              else later(newRound, 1000);
            } else {
              sfx('wrong');
              b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
            }
          });
          numline.appendChild(b);
        })(n);
      }
      body.appendChild(numline);
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('countmatch', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'cm-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('countmatch.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2);
      win.appendChild(again);
      body.appendChild(win);
      speak(t('countmatch.win'));
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.countmatch = { render: render };
})(window.APP);

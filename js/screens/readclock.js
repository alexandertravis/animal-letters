window.APP = window.APP || {};
// Read the Clock. A clock shows a random time; the child taps the matching
// digital time from four choices. Five correct rounds win. Difficulty `level`
// controls the minutes used; `aids` toggles the hour/minute number guides.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }

  var DEFAULTS = { level: 'oclock', aids: true };
  var ROUNDS = 5;

  // Allowed minute values per difficulty level.
  var MINUTES = {
    oclock:  [0],
    half:    [0, 30],
    quarter: [0, 15, 30, 45],
    five:    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  };

  function fmt(h, m) { return h + ':' + (m < 10 ? '0' + m : m); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[rnd(arr.length)]; }

  function injectStyles() {
    if (document.getElementById('readclock-css')) return;
    var s = document.createElement('style');
    s.id = 'readclock-css';
    s.textContent = [
      '.rc-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#eaf1ff,#eef6ff);}',
      '.rc-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 16px;overflow-y:auto;}',
      '.rc-progress{font-size:.95rem;font-weight:700;color:#3a4a6b;}',
      '.rc-prompt{font-size:1.25rem;font-weight:800;color:#1a3a6b;text-align:center;}',
      '.rc-clock{width:min(58vw,240px);}',
      '.rc-choices{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;width:100%;max-width:340px;}',
      '.rc-choice{font-size:1.6rem;font-weight:800;border:none;border-radius:14px;background:#fff;color:#1a3a6b;box-shadow:0 3px 8px rgba(0,0,0,.16);cursor:pointer;padding:14px 8px;font-family:sans-serif;}',
      '.rc-choice:active{transform:translateY(2px);}',
      '.rc-choice.right{background:#06d6a0;color:#fff;}',
      '.rc-choice.wrong{animation:rc-nope .4s ease;}',
      '@keyframes rc-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.rc-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:rc-spark .9s ease-out forwards;}',
      '@keyframes rc-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.rc-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;}',
      '.rc-win h2{font-size:1.7rem;color:#06a37a;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.rc-body{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px;}.rc-clock{width:min(34vh,170px);}.rc-prompt{width:100%;font-size:1.05rem;}.rc-choices{max-width:280px;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('readclock'); } catch (_) {} }

    var settings = APP.settings.game('readclock', DEFAULTS);
    var level = MINUTES[settings.level] ? settings.level : 'oclock';
    var aids = settings.aids !== false;
    var roundsDone = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'rc-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.readclock.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('readclock')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'readclock',
        title: t('game.readclock.title'),
        schema: [
          { type: 'segmented', key: 'level', label: t('clock.level'), options: [
            { value: 'oclock', label: t('clock.oclock') },
            { value: 'half', label: t('clock.half') },
            { value: 'quarter', label: t('clock.quarter') },
            { value: 'five', label: t('clock.five') }
          ] },
          { type: 'toggle', key: 'aids', label: t('clock.aids') }
        ],
        onChange: function (key, val, all) { APP.settings.saveGame('readclock', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'rc-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('readclock');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'rc-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function makeTime() { return { h: 1 + rnd(12), m: pick(MINUTES[level]) }; }

    function newRound() {
      body.innerHTML = '';
      var target = makeTime();
      var answered = false;

      var prog = document.createElement('div');
      prog.className = 'rc-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      var prompt = document.createElement('div');
      prompt.className = 'rc-prompt';
      prompt.textContent = t('readclock.prompt');
      body.appendChild(prompt);

      var clockBox = document.createElement('div');
      clockBox.className = 'rc-clock';
      clockBox.appendChild(APP.clockFace({ hour: target.h, minute: target.m, showNumbers: aids, showMinutes: aids }));
      body.appendChild(clockBox);

      // Build 4 unique choices including the correct one.
      var correct = fmt(target.h, target.m);
      var choices = [correct];
      var guard = 0;
      while (choices.length < 4 && guard++ < 50) {
        var d = fmt(1 + rnd(12), pick(MINUTES[level]));
        if (choices.indexOf(d) < 0) choices.push(d);
      }
      // Shuffle
      for (var i = choices.length - 1; i > 0; i--) { var j = rnd(i + 1); var tmp = choices[i]; choices[i] = choices[j]; choices[j] = tmp; }

      var grid = document.createElement('div');
      grid.className = 'rc-choices';
      choices.forEach(function (label) {
        var b = document.createElement('button');
        b.className = 'rc-choice';
        b.textContent = label;
        b.addEventListener('click', function () {
          if (answered) return;
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          if (label === correct) {
            answered = true;
            b.classList.add('right');
            sfx('pop');
            var r = b.getBoundingClientRect();
            burstStars(r.left + r.width / 2, r.top, 5);
            roundsDone += 1;
            if (roundsDone >= ROUNDS) later(showWin, 900);
            else later(newRound, 950);
          } else {
            sfx('wrong');
            b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
          }
        });
        grid.appendChild(b);
      });
      body.appendChild(grid);
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('readclock', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'rc-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('readclock.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2); win.appendChild(again);
      body.appendChild(win);
      speak(t('readclock.win'));
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.readclock = { render: render };
})(window.APP);

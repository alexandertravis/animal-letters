window.APP = window.APP || {};
// Set the Hands. A target time is given; the child drags the hour and minute
// hands to set the clock, then taps Check. Five correct rounds win. The hour
// hand snaps to whole hours and the minute hand to 5-minute marks (a beginner
// clock model — no minute drift on the hour hand). `aids` toggles the guides.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }

  var DEFAULTS = { level: 'oclock', aids: true };
  var ROUNDS = 5;
  var MINUTES = {
    oclock:  [0],
    half:    [0, 30],
    quarter: [0, 15, 30, 45],
    five:    [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  };

  function fmt(h, m) { return h + ':' + (m < 10 ? '0' + m : m); }
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[rnd(arr.length)]; }
  function angDist(a, b) { var d = Math.abs(((a - b) % 360 + 360) % 360); return Math.min(d, 360 - d); }

  function injectStyles() {
    if (document.getElementById('sethands-css')) return;
    var s = document.createElement('style');
    s.id = 'sethands-css';
    s.textContent = [
      '.sh-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#fff3e6,#eef6ff);}',
      '.sh-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:12px;padding:14px 16px;overflow-y:auto;}',
      '.sh-progress{font-size:.95rem;font-weight:700;color:#3a4a6b;}',
      '.sh-prompt{font-size:1.2rem;font-weight:800;color:#1a3a6b;text-align:center;}',
      '.sh-target{font-size:2.2rem;font-weight:900;color:#e07a2a;font-family:sans-serif;}',
      '.sh-clock{width:min(64vw,260px);touch-action:none;cursor:grab;}',
      '.sh-clock .clock-hand-hour,.sh-clock .clock-hand-minute{cursor:grab;}',
      '.sh-check{font-size:1.2rem;font-weight:800;border:none;border-radius:14px;background:#06d6a0;color:#fff;box-shadow:0 3px 8px rgba(0,0,0,.18);cursor:pointer;padding:12px 28px;}',
      '.sh-check:active{transform:translateY(2px);}',
      '.sh-clock.shake{animation:sh-nope .4s ease;}',
      '@keyframes sh-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}',
      '.sh-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:sh-spark .9s ease-out forwards;}',
      '@keyframes sh-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.sh-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:28px;text-align:center;}',
      '.sh-win h2{font-size:1.7rem;color:#06a37a;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.sh-body{flex-direction:row;flex-wrap:wrap;justify-content:center;gap:10px;}.sh-clock{width:min(40vh,180px);}.sh-prompt,.sh-target{width:100%;}.sh-prompt{font-size:1rem;}.sh-target{font-size:1.6rem;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('sethands'); } catch (_) {} }

    var settings = APP.settings.game('sethands', DEFAULTS);
    var level = MINUTES[settings.level] ? settings.level : 'oclock';
    var aids = settings.aids !== false;
    var roundsDone = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'sh-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.sethands.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('sethands')); },
      onRestart: function () { clearTimers(); render(root, ctx); },
      settings: {
        gameId: 'sethands',
        title: t('game.sethands.title'),
        schema: [
          { type: 'segmented', key: 'level', label: t('clock.level'), options: [
            { value: 'oclock', label: t('clock.oclock') },
            { value: 'half', label: t('clock.half') },
            { value: 'quarter', label: t('clock.quarter') },
            { value: 'five', label: t('clock.five') }
          ] },
          { type: 'toggle', key: 'aids', label: t('clock.aids') }
        ],
        onChange: function (key, val, all) { APP.settings.saveGame('sethands', all); clearTimers(); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'sh-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('sethands');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'sh-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function newRound() {
      body.innerHTML = '';
      var target = { h: 1 + rnd(12), m: pick(MINUTES[level]) };
      var setHourDeg = 0, setMinDeg = 0;   // start at 12:00
      var grabbed = null;

      var prog = document.createElement('div');
      prog.className = 'sh-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      var prompt = document.createElement('div');
      prompt.className = 'sh-prompt';
      prompt.textContent = t('sethands.prompt');
      body.appendChild(prompt);

      var targetEl = document.createElement('div');
      targetEl.className = 'sh-target';
      targetEl.textContent = fmt(target.h, target.m);
      body.appendChild(targetEl);

      var clockBox = document.createElement('div');
      clockBox.className = 'sh-clock';
      var svg = APP.clockFace({ hour: 12, minute: 0, showNumbers: aids, showMinutes: aids });
      APP.clockSetHandAngles(svg, setHourDeg, setMinDeg);
      clockBox.appendChild(svg);
      body.appendChild(clockBox);

      function pointerAngle(e) {
        var ctm = svg.getScreenCTM();
        if (!ctm) return null;
        var p = svg.createSVGPoint();
        p.x = e.clientX; p.y = e.clientY;
        var loc = p.matrixTransform(ctm.inverse());
        var dx = loc.x - 100, dy = loc.y - 100;
        if (dx === 0 && dy === 0) return null;
        return ((Math.atan2(dx, -dy) * 180 / Math.PI) + 360) % 360;
      }
      function applyDrag(ang) {
        if (grabbed === 'hour') { setHourDeg = (Math.round(ang / 30) * 30) % 360; }
        else { setMinDeg = (Math.round(ang / 30) * 30) % 360; }
        APP.clockSetHandAngles(svg, setHourDeg, setMinDeg);
      }
      svg.addEventListener('pointerdown', function (e) {
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        var a = pointerAngle(e);
        if (a == null) return;
        grabbed = angDist(a, setHourDeg) <= angDist(a, setMinDeg) ? 'hour' : 'minute';
        try { svg.setPointerCapture(e.pointerId); } catch (_) {}
        applyDrag(a);
        e.preventDefault();
      });
      svg.addEventListener('pointermove', function (e) {
        if (!grabbed) return;
        var a = pointerAngle(e);
        if (a != null) applyDrag(a);
      });
      function release(e) { grabbed = null; try { svg.releasePointerCapture(e.pointerId); } catch (_) {} }
      svg.addEventListener('pointerup', release);
      svg.addEventListener('pointercancel', release);

      var check = document.createElement('button');
      check.className = 'sh-check';
      check.textContent = t('sethands.check');
      check.addEventListener('click', function () {
        var setHour = (Math.round(setHourDeg / 30) % 12) || 12;
        var setMin = (Math.round(setMinDeg / 30) * 5) % 60;
        if (setHour === target.h && setMin === target.m) {
          sfx('pop');
          var r = clockBox.getBoundingClientRect();
          burstStars(r.left + r.width / 2, r.top + r.height / 2, 6);
          roundsDone += 1;
          if (roundsDone >= ROUNDS) later(showWin, 900);
          else later(newRound, 900);
        } else {
          sfx('wrong');
          clockBox.classList.remove('shake'); void clockBox.offsetWidth; clockBox.classList.add('shake');
        }
      });
      body.appendChild(check);
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('sethands', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'sh-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('sethands.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2); win.appendChild(again);
      body.appendChild(win);
      speak(t('sethands.win'));
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.sethands = { render: render };
})(window.APP);

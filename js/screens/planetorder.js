window.APP = window.APP || {};
// Order the Planets. The eight planets appear shuffled; the child taps them in
// order outward from the Sun (Mercury first … Neptune last). Tapping all eight
// in the right order wins.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }

  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function injectStyles() {
    if (document.getElementById('planetorder-css')) return;
    var s = document.createElement('style');
    s.id = 'planetorder-css';
    s.textContent = [
      '.po-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#0b1437,#1a2a5c);}',
      '.po-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 16px;overflow-y:auto;}',
      '.po-prompt{font-size:1.1rem;font-weight:800;color:#ffe9a8;text-align:center;}',
      '.po-sun{font-size:.85rem;color:#ffd166;font-weight:700;}',
      '.po-grid{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;width:100%;max-width:480px;}',
      '.po-planet{position:relative;border:none;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px;}',
      '.po-orb{border-radius:50%;display:inline-block;box-shadow:inset -4px -4px 8px rgba(0,0,0,.35);}',
      '.po-name{font-size:.74rem;font-weight:700;color:#cdd6f5;}',
      '.po-badge{position:absolute;top:-4px;right:-4px;width:20px;height:20px;border-radius:50%;background:#06d6a0;color:#fff;font-size:.75rem;font-weight:800;display:flex;align-items:center;justify-content:center;}',
      '.po-planet.locked{opacity:.55;}',
      '.po-planet.wrong{animation:po-nope .4s ease;}',
      '@keyframes po-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.po-win{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;text-align:center;color:#fff;}',
      '.po-win h2{font-size:1.6rem;color:#9be29b;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.po-body{gap:8px;padding:8px 14px;}.po-grid{max-width:none;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('planetorder'); } catch (_) {} }

    var PLANETS = (APP.SPACE && APP.SPACE.planets) || [];
    var next = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'po-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.planetorder.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('planetorder')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'po-body';
    wrap.appendChild(body);

    var prompt = document.createElement('div');
    prompt.className = 'po-prompt';
    prompt.textContent = t('planetorder.prompt');
    body.appendChild(prompt);

    var sun = document.createElement('div');
    sun.className = 'po-sun';
    sun.textContent = '☀️ ' + (t('planetorder.fromSun'));
    body.appendChild(sun);

    var grid = document.createElement('div');
    grid.className = 'po-grid';
    body.appendChild(grid);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('planetorder');

    shuffle(PLANETS).forEach(function (p) {
      var btn = document.createElement('button');
      btn.className = 'po-planet';
      var d = Math.round(20 + p.size * 12);
      var orb = document.createElement('span');
      orb.className = 'po-orb';
      orb.style.width = d + 'px'; orb.style.height = d + 'px'; orb.style.background = p.color;
      var nm = document.createElement('span'); nm.className = 'po-name'; nm.textContent = t(p.labelKey);
      btn.appendChild(orb); btn.appendChild(nm);
      btn.addEventListener('click', function () {
        if (btn.classList.contains('locked')) return;
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        if (p.id === PLANETS[next].id) {
          btn.classList.add('locked');
          var badge = document.createElement('span');
          badge.className = 'po-badge'; badge.textContent = (next + 1);
          btn.appendChild(badge);
          sfx('pop');
          speak(t(p.labelKey));
          next += 1;
          if (next >= PLANETS.length) later(win, 700);
        } else {
          sfx('wrong');
          btn.classList.remove('wrong'); void btn.offsetWidth; btn.classList.add('wrong');
        }
      });
      grid.appendChild(btn);
    });

    function win() {
      if (APP.progress) { try { APP.progress.recordWin('planetorder', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var w = document.createElement('div');
      w.className = 'po-win';
      var h2 = document.createElement('h2'); h2.textContent = t('planetorder.win') + ' 🎉';
      var again = document.createElement('button'); again.className = 'btn'; again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      w.appendChild(h2); w.appendChild(again);
      body.appendChild(w);
      speak(t('planetorder.win'));
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.planetorder = { render: render };
})(window.APP);

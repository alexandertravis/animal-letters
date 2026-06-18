window.APP = window.APP || {};
// Solar System. The Sun and the eight planets; tap each planet to hear its name
// and a short fact. Exploring all eight wins.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }

  function injectStyles() {
    if (document.getElementById('solarsystem-css')) return;
    var s = document.createElement('style');
    s.id = 'solarsystem-css';
    s.textContent = [
      '.ss-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#0b1437,#1a2a5c);}',
      '.ss-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:14px;padding:14px 16px;overflow-y:auto;}',
      '.ss-progress{font-size:.95rem;font-weight:700;color:#ffe9a8;}',
      '.ss-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;width:100%;max-width:520px;}',
      '.ss-sun{width:54px;height:54px;border-radius:50%;background:radial-gradient(circle at 40% 38%,#fff3b0,#ffb302);box-shadow:0 0 18px rgba(255,196,40,.8);flex:none;}',
      '.ss-planet{position:relative;border:none;background:transparent;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px;}',
      '.ss-orb{border-radius:50%;box-shadow:inset -4px -4px 8px rgba(0,0,0,.35);}',
      '.ss-planet.visited .ss-name{color:#9be29b;}',
      '.ss-name{font-size:.72rem;font-weight:700;color:#cdd6f5;}',
      '.ss-ring{position:absolute;top:50%;left:50%;width:160%;height:46%;border:3px solid rgba(230,210,150,.8);border-radius:50%;transform:translate(-50%,-60%) rotate(-18deg);pointer-events:none;}',
      '.ss-info{min-height:3.2em;max-width:380px;text-align:center;color:#eaf0ff;}',
      '.ss-info .ss-title{font-size:1.3rem;font-weight:800;color:#ffe9a8;}',
      '.ss-info .ss-fact{font-size:1rem;line-height:1.35;}',
      '.ss-win{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;text-align:center;color:#fff;}',
      '.ss-win h2{font-size:1.6rem;color:#9be29b;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.ss-body{gap:8px;padding:8px 14px;}.ss-row{max-width:none;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('solarsystem'); } catch (_) {} }

    var PLANETS = (APP.SPACE && APP.SPACE.planets) || [];
    var visited = {};
    var done = false;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'ss-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.solarsystem.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('solarsystem')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'ss-body';
    wrap.appendChild(body);

    var prog = document.createElement('div');
    prog.className = 'ss-progress';
    body.appendChild(prog);

    var row = document.createElement('div');
    row.className = 'ss-row';
    var sun = document.createElement('div'); sun.className = 'ss-sun'; sun.title = 'Sun'; row.appendChild(sun);
    body.appendChild(row);

    var info = document.createElement('div');
    info.className = 'ss-info';
    info.innerHTML = '<div class="ss-title"></div><div class="ss-fact"></div>';
    body.appendChild(info);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('solarsystem');

    function updateProgress() {
      var n = Object.keys(visited).length;
      prog.textContent = n + ' / ' + PLANETS.length;
    }
    updateProgress();

    PLANETS.forEach(function (p) {
      var btn = document.createElement('button');
      btn.className = 'ss-planet';
      var d = Math.round(18 + p.size * 12);
      var orb = document.createElement('span');
      orb.className = 'ss-orb';
      orb.style.width = d + 'px'; orb.style.height = d + 'px'; orb.style.background = p.color;
      orb.style.display = 'inline-block';
      if (p.id === 'saturn') { var ring = document.createElement('span'); ring.className = 'ss-ring'; orb.appendChild(ring); orb.style.position = 'relative'; }
      var nm = document.createElement('span'); nm.className = 'ss-name'; nm.textContent = t(p.labelKey);
      btn.appendChild(orb); btn.appendChild(nm);
      btn.addEventListener('click', function () {
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        sfx('click');
        info.querySelector('.ss-title').textContent = t(p.labelKey);
        info.querySelector('.ss-fact').textContent = p.fact;
        speak(t(p.labelKey));
        if (!visited[p.id]) {
          visited[p.id] = true;
          btn.classList.add('visited');
          updateProgress();
          if (!done && Object.keys(visited).length === PLANETS.length) { done = true; later(win, 900); }
        }
      });
      row.appendChild(btn);
    });

    function win() {
      if (APP.progress) { try { APP.progress.recordWin('solarsystem', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      var w = document.createElement('div');
      w.className = 'ss-win';
      var h2 = document.createElement('h2'); h2.textContent = t('solarsystem.win') + ' 🎉';
      var again = document.createElement('button'); again.className = 'btn'; again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      w.appendChild(h2); w.appendChild(again);
      body.appendChild(w);
      speak(t('solarsystem.win'));
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.solarsystem = { render: render };
})(window.APP);

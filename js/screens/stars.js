window.APP = window.APP || {};
// Stars. The child connects the numbered stars in order to draw a constellation,
// which is then named. Completing all the constellations wins.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }
  var NS = 'http://www.w3.org/2000/svg';

  function injectStyles() {
    if (document.getElementById('stars-css')) return;
    var s = document.createElement('style');
    s.id = 'stars-css';
    s.textContent = [
      '.st-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#070d24,#12204a);}',
      '.st-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:12px;padding:14px 16px;overflow-y:auto;}',
      '.st-prompt{font-size:1.1rem;font-weight:800;color:#ffe9a8;text-align:center;}',
      '.st-sky{width:min(82vw,360px);background:radial-gradient(circle at 30% 20%,rgba(255,255,255,.08),transparent 60%);border-radius:16px;touch-action:manipulation;}',
      '.st-star{cursor:pointer;}',
      '.st-star circle{fill:#cdd6f5;transition:fill .2s;}',
      '.st-star.next circle{fill:#ffe9a8;animation:st-pulse 1.1s ease-in-out infinite;}',
      '.st-star.lit circle{fill:#fff3b0;}',
      '@keyframes st-pulse{0%,100%{r:4}50%{r:6}}',
      '.st-star text{fill:#0b1437;font-size:5px;font-weight:800;font-family:sans-serif;pointer-events:none;}',
      '.st-name{font-size:1.3rem;font-weight:800;color:#ffe9a8;min-height:1.4em;}',
      '.st-win{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;text-align:center;color:#fff;}',
      '.st-win h2{font-size:1.6rem;color:#9be29b;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.st-sky{width:min(40vh,260px);}.st-body{gap:8px;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('stars'); } catch (_) {} }

    var CONSTS = (APP.SPACE && APP.SPACE.constellations) || [];
    var cIdx = 0;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'st-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.stars.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('stars')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'st-body';
    wrap.appendChild(body);

    var prompt = document.createElement('div');
    prompt.className = 'st-prompt';
    prompt.textContent = t('stars.prompt');
    body.appendChild(prompt);

    var skyWrap = document.createElement('div');
    skyWrap.className = 'st-sky';
    body.appendChild(skyWrap);

    var nameEl = document.createElement('div');
    nameEl.className = 'st-name';
    body.appendChild(nameEl);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('stars');

    function drawConstellation() {
      skyWrap.innerHTML = '';
      nameEl.textContent = '';
      var c = CONSTS[cIdx];
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.style.width = '100%'; svg.style.display = 'block';
      var lineGroup = document.createElementNS(NS, 'g');
      svg.appendChild(lineGroup);
      var next = 0;
      var starEls = [];

      function highlight() {
        starEls.forEach(function (g, i) { g.classList.toggle('next', i === next); });
      }

      c.stars.forEach(function (pos, i) {
        var g = document.createElementNS(NS, 'g');
        g.setAttribute('class', 'st-star');
        var circ = document.createElementNS(NS, 'circle');
        circ.setAttribute('cx', pos.x); circ.setAttribute('cy', pos.y); circ.setAttribute('r', 4);
        var num = document.createElementNS(NS, 'text');
        num.setAttribute('x', pos.x); num.setAttribute('y', pos.y + 1.8); num.setAttribute('text-anchor', 'middle');
        num.textContent = (i + 1);
        g.appendChild(circ); g.appendChild(num);
        g.addEventListener('click', function () {
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          if (i !== next) { sfx('wrong'); return; }
          if (i > 0) {
            var prev = c.stars[i - 1];
            var ln = document.createElementNS(NS, 'line');
            ln.setAttribute('x1', prev.x); ln.setAttribute('y1', prev.y);
            ln.setAttribute('x2', pos.x); ln.setAttribute('y2', pos.y);
            ln.setAttribute('stroke', '#ffe9a8'); ln.setAttribute('stroke-width', '1.4'); ln.setAttribute('stroke-linecap', 'round');
            lineGroup.appendChild(ln);
          }
          g.classList.add('lit'); g.classList.remove('next');
          sfx('click');
          next += 1;
          highlight();
          if (next >= c.stars.length) {
            nameEl.textContent = t(c.labelKey);
            speak(t(c.labelKey));
            sfx('pop');
            cIdx += 1;
            if (cIdx >= CONSTS.length) later(win, 1300);
            else later(drawConstellation, 1500);
          }
        });
        starEls.push(g);
        svg.appendChild(g);
      });
      skyWrap.appendChild(svg);
      highlight();
    }

    function win() {
      if (APP.progress) { try { APP.progress.recordWin('stars', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var w = document.createElement('div');
      w.className = 'st-win';
      var h2 = document.createElement('h2'); h2.textContent = t('stars.win') + ' 🎉';
      var again = document.createElement('button'); again.className = 'btn'; again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      w.appendChild(h2); w.appendChild(again);
      body.appendChild(w);
      speak(t('stars.win'));
    }

    if (CONSTS.length) drawConstellation(); else win();
  }

  APP.screens = APP.screens || {};
  APP.screens.stars = { render: render };
})(window.APP);

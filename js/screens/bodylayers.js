window.APP = window.APP || {};
// Body Layers. A simple figure is shown skin-first; tapping "peel" reveals the
// next layer inward (skin → muscles → nerves → organs → bones), each with its
// name and a short fact. Revealing all five layers wins.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }
  var NS = 'http://www.w3.org/2000/svg';

  function injectStyles() {
    if (document.getElementById('bodylayers-css')) return;
    var s = document.createElement('style');
    s.id = 'bodylayers-css';
    s.textContent = [
      '.bl-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#fff0f3,#eef6ff);}',
      '.bl-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:12px;padding:14px 16px;overflow-y:auto;}',
      '.bl-figure{width:min(46vw,180px);cursor:pointer;}',
      '.bl-figure g{transition:opacity .45s ease;}',
      '.bl-dots{display:flex;gap:8px;}',
      '.bl-dot{width:13px;height:13px;border-radius:50%;background:#cdd3e0;}',
      '.bl-dot.on{background:#e06666;}',
      '.bl-info{display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;max-width:360px;}',
      '.bl-badge{font-size:2rem;}',
      '.bl-name{font-size:1.3rem;font-weight:800;color:#b23b5e;}',
      '.bl-fact{font-size:1rem;color:#3a4a6b;line-height:1.35;}',
      '.bl-peel{font-size:1.1rem;font-weight:800;border:none;border-radius:14px;background:#e06666;color:#fff;box-shadow:0 3px 8px rgba(0,0,0,.18);cursor:pointer;padding:11px 24px;}',
      '.bl-peel:active{transform:translateY(2px);}',
      '.bl-win h2{font-size:1.6rem;color:#06a37a;margin:0;}',
      '.bl-win{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;text-align:center;}',
      '@media (orientation:landscape) and (max-height:520px){.bl-body{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:center;gap:10px;}.bl-figure{width:min(34vh,150px);}.bl-info{max-width:300px;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function rect(g, x, y, w, h, rx, fill) {
    var r = document.createElementNS(NS, 'rect');
    r.setAttribute('x', x); r.setAttribute('y', y); r.setAttribute('width', w); r.setAttribute('height', h);
    r.setAttribute('rx', rx); r.setAttribute('fill', fill); r.setAttribute('stroke', 'rgba(0,0,0,.12)'); r.setAttribute('stroke-width', '1.5');
    g.appendChild(r);
  }
  function bodyGroup(color) {
    var g = document.createElementNS(NS, 'g');
    var head = document.createElementNS(NS, 'circle');
    head.setAttribute('cx', 60); head.setAttribute('cy', 30); head.setAttribute('r', 20);
    head.setAttribute('fill', color); head.setAttribute('stroke', 'rgba(0,0,0,.12)'); head.setAttribute('stroke-width', '1.5');
    g.appendChild(head);
    rect(g, 42, 52, 36, 82, 14, color);  // torso
    rect(g, 22, 58, 16, 62, 8, color);   // left arm
    rect(g, 82, 58, 16, 62, 8, color);   // right arm
    rect(g, 44, 130, 14, 72, 7, color);  // left leg
    rect(g, 62, 130, 14, 72, 7, color);  // right leg
    return g;
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('bodylayers'); } catch (_) {} }

    var LAYERS = (APP.BODY && APP.BODY.layers) || [];
    var peeled = 0;          // how many outer layers have been peeled away
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'bl-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.bodylayers.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('bodylayers')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'bl-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('bodylayers');

    // Figure: stack all layers, innermost (bones) at the bottom, skin on top.
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 120 210');
    svg.setAttribute('class', 'bl-figure');
    var groups = [];
    for (var i = LAYERS.length - 1; i >= 0; i--) {
      var g = bodyGroup(LAYERS[i].color);
      svg.appendChild(g);
      groups[i] = g;   // groups[0] = skin (added last, on top)
    }
    body.appendChild(svg);

    var dots = document.createElement('div');
    dots.className = 'bl-dots';
    LAYERS.forEach(function () { var d = document.createElement('span'); d.className = 'bl-dot'; dots.appendChild(d); });
    body.appendChild(dots);

    var info = document.createElement('div');
    info.className = 'bl-info';
    var badge = document.createElement('div'); badge.className = 'bl-badge';
    var name = document.createElement('div'); name.className = 'bl-name';
    var fact = document.createElement('div'); fact.className = 'bl-fact';
    info.appendChild(badge); info.appendChild(name); info.appendChild(fact);
    body.appendChild(info);

    var peelBtn = document.createElement('button');
    peelBtn.className = 'bl-peel';
    peelBtn.textContent = t('bodylayers.peel');
    body.appendChild(peelBtn);

    function showLayer(idx) {
      var L = LAYERS[idx];
      badge.textContent = L.badge;
      name.textContent = t(L.labelKey);
      fact.textContent = L.fact;
      var ds = dots.querySelectorAll('.bl-dot');
      for (var k = 0; k < ds.length; k++) ds[k].classList.toggle('on', k <= idx);
      speak(t(L.labelKey));
    }

    function win() {
      if (APP.progress) { try { APP.progress.recordWin('bodylayers', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      peelBtn.remove();
      var w = document.createElement('div');
      w.className = 'bl-win';
      var h2 = document.createElement('h2'); h2.textContent = t('bodylayers.win') + ' 🎉';
      var again = document.createElement('button'); again.className = 'btn'; again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      w.appendChild(h2); w.appendChild(again);
      body.appendChild(w);
      speak(t('bodylayers.win'));
    }

    function peel() {
      if (peeled >= LAYERS.length - 1) return;
      if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
      groups[peeled].style.opacity = '0';   // hide current outer layer
      peeled += 1;
      sfx('pop');
      showLayer(peeled);
      if (peeled >= LAYERS.length - 1) { peelBtn.disabled = true; later(win, 1400); }
    }
    peelBtn.addEventListener('click', peel);
    svg.addEventListener('click', peel);

    showLayer(0);  // start on skin
  }

  APP.screens = APP.screens || {};
  APP.screens.bodylayers = { render: render };
})(window.APP);

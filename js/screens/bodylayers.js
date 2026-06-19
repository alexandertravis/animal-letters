window.APP = window.APP || {};
// Body Layers. A figure is shown skin-first; tapping "peel" reveals the next
// layer inward (skin → muscles → nerves → organs → bones), each with its own
// recognisable drawing, name and a short fact. Revealing all five layers wins.
//
// Every layer fills the SAME body envelope (head circle + torso + four limbs)
// so the opacity cross-fade lines up and peeling reads as going deeper inside,
// then overlays layer-specific anatomy on top. See
// docs/superpowers/specs/2026-06-19-body-layers-art-design.md.
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
      '.bl-figure{width:min(46vw,180px);cursor:pointer;filter:drop-shadow(0 4px 7px rgba(40,40,70,.18));}',
      // Each layer fades AND lifts slightly as it peels off, so it feels like a
      // sheet being lifted rather than a flat dissolve.
      '.bl-figure g{transition:opacity .45s ease,transform .55s ease;transform-box:fill-box;transform-origin:center;}',
      '.bl-figure g.peeling{transform:scale(1.12) translateY(-5px);}',
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

  // ── tiny SVG helpers ────────────────────────────────────────────────────────
  function mk(tag, attrs) {
    var n = document.createElementNS(NS, tag);
    for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
    return n;
  }
  function circ(g, cx, cy, r, attrs) { g.appendChild(mk('circle', Object.assign({ cx: cx, cy: cy, r: r }, attrs || {}))); }
  function ell(g, cx, cy, rx, ry, attrs) { g.appendChild(mk('ellipse', Object.assign({ cx: cx, cy: cy, rx: rx, ry: ry }, attrs || {}))); }
  function rrect(g, x, y, w, h, rx, attrs) { g.appendChild(mk('rect', Object.assign({ x: x, y: y, width: w, height: h, rx: rx }, attrs || {}))); }
  function path(g, d, attrs) { g.appendChild(mk('path', Object.assign({ d: d }, attrs || {}))); }

  // Shared body silhouette (the envelope every layer registers against).
  // Parts overlap slightly (arms meet the torso, torso meets the head) so no
  // gaps remain through which an inner layer could bleed once skin is opaque.
  function silhouette(g, fill, stroke) {
    var st = stroke || 'rgba(0,0,0,.12)';
    circ(g, 60, 30, 20, { fill: fill, stroke: st, 'stroke-width': 1.5 });          // head
    rrect(g, 42, 50, 36, 84, 14, { fill: fill, stroke: st, 'stroke-width': 1.5 });  // torso (up to the neck)
    rrect(g, 22, 58, 20, 62, 8, { fill: fill, stroke: st, 'stroke-width': 1.5 });   // left arm (meets torso at x42)
    rrect(g, 78, 58, 20, 62, 8, { fill: fill, stroke: st, 'stroke-width': 1.5 });   // right arm (meets torso at x78)
    rrect(g, 44, 130, 14, 72, 7, { fill: fill, stroke: st, 'stroke-width': 1.5 });  // left leg
    rrect(g, 62, 130, 14, 72, 7, { fill: fill, stroke: st, 'stroke-width': 1.5 });  // right leg
  }

  // ── per-layer art ──────────────────────────────────────────────────────────
  function drawSkin(g, color) {
    silhouette(g, color);
    // hair fringe over the top of the head
    path(g, 'M40,30 A20,20 0 0 1 80,30 C72,17 48,17 40,30 Z', { fill: '#7a4a22' });
    // eyes
    circ(g, 52, 30, 3.4, { fill: '#fff' }); circ(g, 52, 30, 1.7, { fill: '#33312e' });
    circ(g, 68, 30, 3.4, { fill: '#fff' }); circ(g, 68, 30, 1.7, { fill: '#33312e' });
    // rosy cheeks
    circ(g, 47, 37, 3, { fill: '#f29ba0', opacity: 0.6 });
    circ(g, 73, 37, 3, { fill: '#f29ba0', opacity: 0.6 });
    // smile
    path(g, 'M52,39 Q60,46 68,39', { fill: 'none', stroke: '#9a4b3b', 'stroke-width': 2, 'stroke-linecap': 'round' });
  }

  function drawMuscles(g, color) {
    silhouette(g, color);
    var fib = { fill: 'none', stroke: '#962f2a', 'stroke-width': 2, 'stroke-linecap': 'round', opacity: 0.55 };
    // pecs / chest split
    path(g, 'M60,58 L60,84', fib);
    path(g, 'M48,64 Q54,74 60,67', fib); path(g, 'M72,64 Q66,74 60,67', fib);
    // abdomen striations
    path(g, 'M51,86 Q49,108 52,130', fib); path(g, 'M60,86 L60,130', fib); path(g, 'M69,86 Q71,108 68,130', fib);
    // biceps
    path(g, 'M30,66 Q34,88 30,112', fib); path(g, 'M90,66 Q86,88 90,112', fib);
    // thighs/calves
    path(g, 'M51,138 Q49,170 51,198', fib); path(g, 'M69,138 Q71,170 69,198', fib);
  }

  function drawNerves(g) {
    silhouette(g, '#f7ead0', 'rgba(150,120,60,.22)');
    var nv = { fill: 'none', stroke: '#e8950c', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' };
    // brain
    ell(g, 60, 26, 13, 10, { fill: 'none', stroke: '#e8950c', 'stroke-width': 2 });
    path(g, 'M53,26 Q60,20 67,26 M56,31 Q60,27 64,31', nv);
    // spine
    path(g, 'M60,40 L60,128', Object.assign({}, nv, { 'stroke-width': 2.6 }));
    // branches to the arms
    path(g, 'M60,62 L42,60 L31,72', nv); path(g, 'M60,62 L78,60 L89,72', nv);
    // branches to the legs
    path(g, 'M60,126 L51,150 L51,192', nv); path(g, 'M60,126 L69,150 L69,192', nv);
    // nerve endings
    [[31, 72], [89, 72], [51, 192], [69, 192]].forEach(function (p) { circ(g, p[0], p[1], 2.2, { fill: '#e8950c' }); });
  }

  function drawOrgans(g) {
    silhouette(g, '#e8b9c8', 'rgba(150,80,110,.25)');
    // brain hint
    ell(g, 60, 28, 10, 8, { fill: '#e29ab0', stroke: '#c77f95', 'stroke-width': 1 });
    // lungs
    ell(g, 51, 75, 7, 12, { fill: '#f0a6bd', stroke: '#cf7e98', 'stroke-width': 1 });
    ell(g, 69, 75, 7, 12, { fill: '#f0a6bd', stroke: '#cf7e98', 'stroke-width': 1 });
    // heart
    path(g, 'M60,66 C57,61 50,63 51,69 C52,74 60,79 60,79 C60,79 68,74 69,69 C70,63 63,61 60,66 Z',
      { fill: '#d8344a', stroke: '#a8273a', 'stroke-width': 1 });
    // stomach
    ell(g, 55, 99, 9, 7, { fill: '#e8923a', stroke: '#c1762a', 'stroke-width': 1 });
    // coiled intestine
    path(g, 'M51,110 q11,-3 12,5 q-11,3 0,9 q12,3 0,9',
      { fill: 'none', stroke: '#c9772e', 'stroke-width': 3, 'stroke-linecap': 'round' });
  }

  function drawBones(g) {
    silhouette(g, '#34404f', 'rgba(0,0,0,.25)');   // x-ray backdrop
    var bone = '#eef0e6', edge = '#c7cbbe';
    var limb = { fill: 'none', stroke: bone, 'stroke-width': 6, 'stroke-linecap': 'round' };
    // skull
    circ(g, 60, 30, 17, { fill: bone, stroke: edge, 'stroke-width': 1 });
    circ(g, 53, 30, 4, { fill: '#34404f' }); circ(g, 67, 30, 4, { fill: '#34404f' });
    path(g, 'M60,34 L57,40 L63,40 Z', { fill: '#34404f' });
    path(g, 'M53,44 H67', { stroke: '#34404f', 'stroke-width': 2 });
    // spine — stack of vertebrae
    for (var y = 50; y <= 116; y += 11) rrect(g, 57, y, 6, 7, 2, { fill: bone, stroke: edge, 'stroke-width': 0.8 });
    // ribcage
    var rib = { fill: 'none', stroke: bone, 'stroke-width': 2 };
    path(g, 'M60,60 Q45,66 47,82 M60,68 Q43,74 46,92 M60,76 Q44,82 48,100', rib);
    path(g, 'M60,60 Q75,66 73,82 M60,68 Q77,74 74,92 M60,76 Q76,82 72,100', rib);
    // arm bones
    path(g, 'M30,60 L30,118', limb); path(g, 'M90,60 L90,118', limb);
    // pelvis
    path(g, 'M48,122 Q60,134 72,122 Q70,130 60,130 Q50,130 48,122 Z', { fill: bone, stroke: edge, 'stroke-width': 1 });
    // leg bones
    path(g, 'M51,134 L51,200', limb); path(g, 'M69,134 L69,200', limb);
  }

  function buildLayer(id, color) {
    var g = document.createElementNS(NS, 'g');
    if (id === 'skin') drawSkin(g, color);
    else if (id === 'muscles') drawMuscles(g, color);
    else if (id === 'nerves') drawNerves(g);
    else if (id === 'organs') drawOrgans(g);
    else if (id === 'bones') drawBones(g);
    else silhouette(g, color);   // graceful fallback for any future layer
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
      var g = buildLayer(LAYERS[i].id, LAYERS[i].color);
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
      groups[peeled].classList.add('peeling');   // lift…
      groups[peeled].style.opacity = '0';        // …and fade the current outer layer
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

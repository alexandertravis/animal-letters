window.APP = window.APP || {};
// Digestion Journey. The child drags a piece of food down through the digestive
// stops in order (mouth → food pipe → stomach → small intestine → large
// intestine). Each stop reached reveals a short fact. Reaching the end wins.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(s) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(s); } catch (e) {} } }

  function injectStyles() {
    if (document.getElementById('digestion-css')) return;
    var s = document.createElement('style');
    s.id = 'digestion-css';
    s.textContent = [
      '.dg-screen{flex:1;min-height:0;display:flex;flex-direction:column;background:linear-gradient(180deg,#fff3e6,#eef8ef);}',
      '.dg-body{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 16px;overflow-y:auto;}',
      '.dg-prompt{font-size:1.1rem;font-weight:800;color:#1a4a3b;text-align:center;}',
      '.dg-stage{position:relative;width:min(86vw,300px);height:340px;flex:none;}',
      '.dg-track{position:absolute;left:50%;top:24px;bottom:24px;width:8px;transform:translateX(-50%);background:#ffe0c2;border-radius:6px;}',
      '.dg-node{position:absolute;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;border-radius:50%;background:#fff;border:3px solid #e3c9a8;display:flex;align-items:center;justify-content:center;font-size:1.7rem;box-shadow:0 2px 6px rgba(0,0,0,.12);}',
      '.dg-node .dg-node-label{position:absolute;left:74px;white-space:nowrap;font-size:.8rem;font-weight:700;color:#7a5a3a;}',
      '.dg-node.active{border-color:#06d6a0;animation:dg-pulse 1.1s ease-in-out infinite;}',
      '.dg-node.done{background:#e8f7ef;border-color:#06d6a0;}',
      '@keyframes dg-pulse{0%,100%{box-shadow:0 0 0 0 rgba(6,214,160,.5)}50%{box-shadow:0 0 0 10px rgba(6,214,160,0)}}',
      '.dg-food{position:absolute;width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:grab;touch-action:none;z-index:5;transition:left .25s ease,top .25s ease;}',
      '.dg-food.dragging{transition:none;cursor:grabbing;}',
      '.dg-fact{font-size:1rem;color:#3a4a6b;text-align:center;min-height:2.6em;max-width:340px;line-height:1.35;}',
      '.dg-win{display:flex;flex-direction:column;align-items:center;gap:12px;padding:18px;text-align:center;}',
      '.dg-win h2{font-size:1.6rem;color:#06a37a;margin:0;}',
      '@media (orientation:landscape) and (max-height:520px){.dg-body{flex-direction:row;flex-wrap:wrap;justify-content:center;align-items:flex-start;gap:10px;}.dg-stage{height:300px;width:min(40vw,220px);}.dg-prompt,.dg-fact{width:100%;}}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('digestion'); } catch (_) {} }

    var STOPS = (APP.BODY && APP.BODY.digestion) || [];
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'dg-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.digestion.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('digestion')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'dg-body';
    wrap.appendChild(body);

    var prompt = document.createElement('div');
    prompt.className = 'dg-prompt';
    prompt.textContent = t('digestion.prompt');
    body.appendChild(prompt);

    var stage = document.createElement('div');
    stage.className = 'dg-stage';
    var track = document.createElement('div'); track.className = 'dg-track'; stage.appendChild(track);
    body.appendChild(stage);

    var fact = document.createElement('div');
    fact.className = 'dg-fact';
    body.appendChild(fact);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('digestion');

    // Place nodes evenly down the track.
    var nodeEls = [];
    STOPS.forEach(function (stop, i) {
      var n = document.createElement('div');
      n.className = 'dg-node';
      n.style.top = (12 + i * (76 / Math.max(1, STOPS.length - 1))) + '%';
      n.textContent = stop.badge;
      var lab = document.createElement('span');
      lab.className = 'dg-node-label';
      lab.textContent = t(stop.labelKey);
      n.appendChild(lab);
      stage.appendChild(n);
      nodeEls.push(n);
    });

    var food = document.createElement('div');
    food.className = 'dg-food';
    food.textContent = '🍎';
    stage.appendChild(food);

    var activeTarget = 1;   // node 0 (mouth) is the start; first goal is node 1
    var homeLeft = 0, homeTop = 0;

    function nodeCenter(i) {
      var nr = nodeEls[i].getBoundingClientRect();
      var sr = stage.getBoundingClientRect();
      return { x: nr.left + nr.width / 2 - sr.left, y: nr.top + nr.height / 2 - sr.top };
    }
    function placeFoodAt(i) {
      var c = nodeCenter(i);
      homeLeft = c.x - food.offsetWidth / 2;
      homeTop = c.y - food.offsetHeight / 2;
      food.style.left = homeLeft + 'px';
      food.style.top = homeTop + 'px';
    }
    function markDone(i) { nodeEls[i].classList.add('done'); nodeEls[i].classList.remove('active'); }
    function setActive(i) {
      nodeEls.forEach(function (n, k) { n.classList.toggle('active', k === i); });
    }
    function reveal(i) {
      fact.textContent = STOPS[i].fact;
      speak(t(STOPS[i].labelKey));
    }

    // Initial state: food at the mouth, mouth done, next stop active.
    later(function () {   // wait a frame so layout is measured
      placeFoodAt(0);
      markDone(0);
      reveal(0);
      if (STOPS.length > 1) setActive(1);
      else win();
    }, 30);

    // Drag
    var dragging = false, grabDX = 0, grabDY = 0;
    function pointFromEvent(e) {
      var sr = stage.getBoundingClientRect();
      return { x: e.clientX - sr.left, y: e.clientY - sr.top };
    }
    food.addEventListener('pointerdown', function (e) {
      if (activeTarget >= STOPS.length) return;
      if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
      dragging = true;
      food.classList.add('dragging');
      var p = pointFromEvent(e);
      grabDX = p.x - parseFloat(food.style.left || 0);
      grabDY = p.y - parseFloat(food.style.top || 0);
      try { food.setPointerCapture(e.pointerId); } catch (_) {}
      e.preventDefault();
    });
    food.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var p = pointFromEvent(e);
      food.style.left = (p.x - grabDX) + 'px';
      food.style.top = (p.y - grabDY) + 'px';
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      food.classList.remove('dragging');
      try { food.releasePointerCapture(e.pointerId); } catch (_) {}
      // Hit-test against the active node (padded 35%).
      var fr = food.getBoundingClientRect();
      var fx = fr.left + fr.width / 2, fy = fr.top + fr.height / 2;
      var nr = nodeEls[activeTarget].getBoundingClientRect();
      var padX = nr.width * 0.35, padY = nr.height * 0.35;
      if (fx >= nr.left - padX && fx <= nr.right + padX && fy >= nr.top - padY && fy <= nr.bottom + padY) {
        sfx('pop');
        markDone(activeTarget);
        reveal(activeTarget);
        placeFoodAt(activeTarget);
        activeTarget += 1;
        if (activeTarget >= STOPS.length) { later(win, 1100); }
        else setActive(activeTarget);
      } else {
        sfx('wrong');
        food.style.left = homeLeft + 'px';
        food.style.top = homeTop + 'px';
      }
    }
    food.addEventListener('pointerup', endDrag);
    food.addEventListener('pointercancel', endDrag);

    function win() {
      if (APP.progress) { try { APP.progress.recordWin('digestion', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      var w = document.createElement('div');
      w.className = 'dg-win';
      var h2 = document.createElement('h2'); h2.textContent = t('digestion.win') + ' 🎉';
      var again = document.createElement('button'); again.className = 'btn'; again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      w.appendChild(h2); w.appendChild(again);
      body.appendChild(w);
      speak(t('digestion.win'));
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.digestion = { render: render };
})(window.APP);

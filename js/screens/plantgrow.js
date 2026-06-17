window.APP = window.APP || {};
// Life-cycle journey (greenhouse centrepiece). A persistent SVG plant is built
// up part-by-part across the stages defined in APP.GREENHOUSE.stages: the child
// plants a seed, gives it water/sun/air, grows roots/stem/leaves, watches
// photosynthesis, sees it flower, helps a bee pollinate, and harvests the fruit.
// Animation is CSS-only (removing the DOM stops everything — no GSAP cleanup
// needed). Narration via APP.audio.speak.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) {
    if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} }
  }
  function speak(text) {
    if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} }
  }

  function injectStyles() {
    if (document.getElementById('plantgrow-css')) return;
    var s = document.createElement('style');
    s.id = 'plantgrow-css';
    s.textContent = [
      '.pg-screen{display:flex;flex-direction:column;flex:1;min-height:0;background:linear-gradient(180deg,#dff3ff 0%,#eafaf0 55%,#d6f0d6 100%);}',
      '.pg-scene{flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;min-height:0;}',
      '.pg-svg{width:min(420px,92vw);height:auto;max-height:62vh;}',
      // needs panel
      '.pg-needs{position:absolute;top:10px;left:50%;transform:translateX(-50%);display:flex;gap:14px;z-index:4;}',
      '.pg-need{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;background:rgba(255,255,255,.55);filter:grayscale(1);opacity:.5;transition:filter .3s,opacity .3s,transform .3s;}',
      '.pg-need.filled{filter:none;opacity:1;transform:scale(1.12);box-shadow:0 2px 10px rgba(0,0,0,.18);}',
      // plant parts
      '.pg-part{opacity:0;transition:opacity .5s ease;}',
      '.pg-part.show{opacity:1;}',
      '.pg-seed{transform-box:fill-box;transform-origin:center;transform:scale(.3);transition:opacity .4s ease,transform .5s cubic-bezier(.34,1.56,.64,1);}',
      '.pg-seed.show{transform:scale(1);}',
      '.pg-stem{stroke-dasharray:170;stroke-dashoffset:170;transition:stroke-dashoffset 1s ease;}',
      '.pg-stem.show{stroke-dashoffset:0;}',
      '.pg-leaf{transform-box:fill-box;transform:scale(0);transition:transform .55s cubic-bezier(.34,1.56,.64,1);}',
      '.pg-leafL{transform-origin:100% 50%;}.pg-leafR{transform-origin:0% 50%;}',
      '.pg-leaf.show{transform:scale(1);}',
      '.pg-bud,.pg-flower,.pg-fruit{transform-box:fill-box;transform-origin:center bottom;transform:scale(0);transition:opacity .4s ease,transform .55s cubic-bezier(.34,1.56,.64,1);}',
      '.pg-bud.show,.pg-flower.show,.pg-fruit.show{transform:scale(1);}',
      '.pg-sun{transform-box:fill-box;transform-origin:center;transition:transform .4s ease,filter .4s ease;}',
      '.pg-sun.bright{transform:scale(1.18);filter:drop-shadow(0 0 14px #ffd54a);}',
      '.pg-rays{opacity:.85;transform-box:fill-box;transform-origin:center;animation:pg-spin 22s linear infinite;}',
      '@keyframes pg-spin{to{transform:rotate(360deg);}}',
      // fx particles
      '.pg-fx{pointer-events:none;}',
      '@keyframes pg-drop{0%{transform:translateY(-30px);opacity:0;}20%{opacity:1;}100%{transform:translateY(70px);opacity:0;}}',
      '@keyframes pg-rise{0%{transform:translateY(0);opacity:0;}25%{opacity:1;}100%{transform:translateY(-130px);opacity:0;}}',
      '@keyframes pg-spark{0%{transform:scale(.2);opacity:1;}100%{transform:scale(1.5) translateY(-26px);opacity:0;}}',
      // prompt bar
      '.pg-prompt{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.7);}',
      '.pg-instr{font-size:1.15rem;font-weight:700;color:#256145;text-align:center;}',
      '.pg-ctrls{display:flex;gap:16px;align-items:center;justify-content:center;min-height:64px;}',
      '.pg-chip{width:60px;height:60px;border-radius:50%;border:none;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.2);font-size:2rem;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;}',
      '.pg-chip:active{cursor:grabbing;}',
      '.pg-chip.pulse{animation:pg-pulse 1s ease-in-out infinite;}',
      '@keyframes pg-pulse{0%,100%{transform:scale(1);box-shadow:0 3px 10px rgba(0,0,0,.2);}50%{transform:scale(1.12);box-shadow:0 5px 16px rgba(0,0,0,.28);}}',
      '.pg-chip.collected{opacity:.35;pointer-events:none;filter:grayscale(1);}',
      '.pg-chip-clone{position:fixed;z-index:999;width:60px;height:60px;border-radius:50%;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3);font-size:2rem;display:flex;align-items:center;justify-content:center;pointer-events:none;}',
      '.pg-star{position:absolute;pointer-events:none;font-size:1.7rem;z-index:6;animation:pg-spark .9s ease-out forwards;}',
      '.pg-win{display:flex;flex-direction:column;align-items:center;gap:12px;}',
      '.pg-win h2{font-size:1.6rem;color:#256145;margin:0;}',
      // Short-landscape: cap the plant so scene + prompt controls both fit.
      '@media (orientation:landscape) and (max-height:520px){',
      '.pg-svg{max-height:48vh;}',
      '.pg-prompt{padding:6px 14px calc(6px + env(safe-area-inset-bottom,0px));gap:6px;}',
      '.pg-instr{font-size:1rem;}',
      '.pg-ctrls{min-height:52px;gap:12px;}',
      '.pg-chip{width:52px;height:52px;font-size:1.7rem;}',
      '.pg-need{width:38px;height:38px;font-size:1.2rem;}',
      '}',
    ].join('');
    document.head.appendChild(s);
  }

  // Persistent plant scene. Returns the <svg> element; parts are queried by class.
  function sceneSvg() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 300 380');
    svg.setAttribute('class', 'pg-svg');
    svg.innerHTML = [
      // sun (faint until photosynthesis)
      '<g class="pg-sun"><circle cx="250" cy="54" r="24" fill="#ffd54a"/>',
        '<g class="pg-rays" stroke="#ffd54a" stroke-width="4" stroke-linecap="round">',
          '<line x1="250" y1="14" x2="250" y2="2"/><line x1="250" y1="106" x2="250" y2="94"/>',
          '<line x1="210" y1="54" x2="198" y2="54"/><line x1="302" y1="54" x2="290" y2="54"/>',
          '<line x1="222" y1="26" x2="214" y2="18"/><line x1="286" y1="90" x2="278" y2="82"/>',
          '<line x1="222" y1="82" x2="214" y2="90"/><line x1="286" y1="18" x2="278" y2="26"/>',
        '</g></g>',
      // soil
      '<g class="pg-soil"><rect x="0" y="288" width="300" height="92" fill="#8a5a33"/>',
        '<rect x="0" y="288" width="300" height="9" rx="4" fill="#9c6b3f"/></g>',
      // roots (lighter than soil so they read)
      '<path class="pg-part pg-roots" d="M150,306 C150,328 137,346 126,364 M150,308 C150,332 162,350 175,366 M150,310 L150,360" fill="none" stroke="#d9a36b" stroke-width="3" stroke-linecap="round"/>',
      // stem (draws on)
      '<path class="pg-stem" d="M150,300 L150,150" fill="none" stroke="#3fa86a" stroke-width="9" stroke-linecap="round"/>',
      // leaves
      '<g class="pg-part pg-leaf pg-leafL"><ellipse cx="118" cy="214" rx="28" ry="12.5" fill="#5bc06f" transform="rotate(-26 118 214)"/></g>',
      '<g class="pg-part pg-leaf pg-leafR"><ellipse cx="182" cy="186" rx="28" ry="12.5" fill="#5bc06f" transform="rotate(26 182 186)"/></g>',
      // seed
      '<ellipse class="pg-part pg-seed" cx="150" cy="300" rx="9" ry="6.5" fill="#5a3a1a"/>',
      // bud
      '<ellipse class="pg-part pg-bud" cx="150" cy="146" rx="9" ry="13" fill="#4fb06a"/>',
      // flower
      '<g class="pg-part pg-flower">',
        '<circle cx="150" cy="126" r="11" fill="#f582ae"/><circle cx="171" cy="140" r="11" fill="#f582ae"/>',
        '<circle cx="163" cy="162" r="11" fill="#f582ae"/><circle cx="137" cy="162" r="11" fill="#f582ae"/>',
        '<circle cx="129" cy="140" r="11" fill="#f582ae"/><circle cx="150" cy="144" r="10" fill="#ffd166"/>',
      '</g>',
      // fruit
      '<g class="pg-part pg-fruit">',
        '<circle cx="150" cy="150" r="20" fill="#e23b3b"/>',
        '<path d="M150,131 q5,-9 12,-9" fill="none" stroke="#3fa86a" stroke-width="3" stroke-linecap="round"/>',
        '<ellipse cx="158" cy="124" rx="8" ry="4" fill="#5bc06f" transform="rotate(-20 158 124)"/>',
      '</g>',
      // fx layer (particles appended here)
      '<g class="pg-fx"></g>',
    ].join('');
    return svg;
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var STAGES = (APP.GREENHOUSE && APP.GREENHOUSE.stages) || [];
    var timers = [];
    function later(fn, ms) {
      var id = setTimeout(function () {
        timers = timers.filter(function (x) { return x !== id; });
        if (!wrap.isConnected) return; // bailed out via Home/Back
        fn();
      }, ms);
      timers.push(id);
      return id;
    }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'pg-screen';

    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.plantgrow.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('plantgrow')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    // Scene
    var scene = document.createElement('div');
    scene.className = 'pg-scene';

    var needs = document.createElement('div');
    needs.className = 'pg-needs';
    var needEls = {};
    [['water', '💧'], ['sun', '☀️'], ['air', '💨']].forEach(function (n) {
      var d = document.createElement('div');
      d.className = 'pg-need';
      d.textContent = n[1];
      needEls[n[0]] = d;
      needs.appendChild(d);
    });
    scene.appendChild(needs);

    var svg = sceneSvg();
    scene.appendChild(svg);

    var parts = {
      soil: svg.querySelector('.pg-soil'),
      seed: svg.querySelector('.pg-seed'),
      roots: svg.querySelector('.pg-roots'),
      stem: svg.querySelector('.pg-stem'),
      leafL: svg.querySelector('.pg-leafL'),
      leafR: svg.querySelector('.pg-leafR'),
      bud: svg.querySelector('.pg-bud'),
      flower: svg.querySelector('.pg-flower'),
      fruit: svg.querySelector('.pg-fruit'),
      sun: svg.querySelector('.pg-sun'),
    };
    var fxLayer = svg.querySelector('.pg-fx');

    wrap.appendChild(scene);

    // Prompt bar
    var prompt = document.createElement('div');
    prompt.className = 'pg-prompt';
    var instr = document.createElement('div');
    instr.className = 'pg-instr';
    var ctrls = document.createElement('div');
    ctrls.className = 'pg-ctrls';
    prompt.appendChild(instr);
    prompt.appendChild(ctrls);
    wrap.appendChild(prompt);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('plantgrow');

    // ── Celebration particles ────────────────────────────────────────────────
    function burstStars(n) {
      var rect = scene.getBoundingClientRect();
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'pg-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (40 + Math.random() * (rect.width - 80)) + 'px';
        star.style.top = (rect.height * 0.35 + Math.random() * rect.height * 0.3) + 'px';
        star.addEventListener('animationend', function () {
          if (this.parentNode) this.parentNode.removeChild(this);
        });
        scene.appendChild(star);
      }
    }

    // ── FX particles inside the SVG ──────────────────────────────────────────
    function spawnParticles(kind) {
      var ns = 'http://www.w3.org/2000/svg';
      var n = 5;
      for (var i = 0; i < n; i++) {
        var c = document.createElementNS(ns, 'circle');
        var cfg;
        if (kind === 'water') cfg = { x: 150 + (Math.random() * 40 - 20), y: 250, r: 4, fill: '#5aa9e6', anim: 'pg-drop' };
        else if (kind === 'flow') cfg = { x: 150 + (Math.random() * 8 - 4), y: 290, r: 4, fill: '#5aa9e6', anim: 'pg-rise' };
        else cfg = { x: 150 + (Math.random() * 80 - 40), y: 200, r: 4, fill: '#bfe6a0', anim: 'pg-spark' };
        c.setAttribute('cx', cfg.x);
        c.setAttribute('cy', cfg.y);
        c.setAttribute('r', cfg.r);
        c.setAttribute('fill', cfg.fill);
        c.style.transformBox = 'fill-box';
        c.style.transformOrigin = 'center';
        c.style.animation = cfg.anim + ' 1s ease-out ' + (i * 0.12) + 's forwards';
        c.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        fxLayer.appendChild(c);
      }
    }

    function runFx(anim) {
      if (anim === 'water') spawnParticles('water');
      else if (anim === 'flow') spawnParticles('flow');
      else if (anim === 'photo') { parts.sun.classList.add('bright'); spawnParticles('photo'); }
      else if (anim === 'bloom' || anim === 'pollen' || anim === 'fruit') spawnParticles('photo');
    }

    // ── Stage progression ────────────────────────────────────────────────────
    function reveal(stage) {
      (stage.reveal || []).forEach(function (k) { if (parts[k]) parts[k].classList.add('show'); });
      (stage.hide || []).forEach(function (k) { if (parts[k]) parts[k].classList.remove('show'); });
    }

    function completeStage(stage) {
      if (stage.anim) runFx(stage.anim);
      reveal(stage);
      sfx('pop');
      burstStars(5);
      if (stage.win) { later(finish, 1100); return; }
      later(function () { setStage(S.stage + 1); }, 1200);
    }

    var S = { stage: -1, busy: false };

    function setStage(i) {
      S.stage = i;
      S.busy = false;
      var stage = STAGES[i];
      if (!stage) return;
      instr.textContent = t(stage.instr);
      speak(t(stage.fact));
      ctrls.innerHTML = '';
      if (stage.type === 'drag') buildDrag(stage);
      else if (stage.type === 'collect') buildCollect(stage);
      else buildContinue(stage);
    }

    function trigger(stage) {
      if (S.busy) return;
      S.busy = true;
      completeStage(stage);
    }

    // drag a chip onto a target plant part / zone
    function buildDrag(stage) {
      var chip = document.createElement('button');
      chip.className = 'pg-chip pulse';
      chip.textContent = stage.chip;
      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - 30) + 'px'; clone.style.top = (y - 30) + 'px'; }
      chip.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        try { chip.setPointerCapture(e.pointerId); } catch (_) {}
        sfx('click');
        var clone = document.createElement('div');
        clone.className = 'pg-chip-clone';
        clone.textContent = stage.chip;
        document.body.appendChild(clone);
        moveClone(clone, e.clientX, e.clientY);
        chip.style.opacity = '0.3';
        dragging = { clone: clone };
      });
      chip.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        moveClone(dragging.clone, e.clientX, e.clientY);
      });
      chip.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging.clone.remove();
        dragging = null;
        chip.style.opacity = '';
        var tgt = parts[stage.target] || parts.soil;
        var r = tgt.getBoundingClientRect();
        var pad = Math.max(r.width, r.height) * 0.35 + 24;
        if (e.clientX >= r.left - pad && e.clientX <= r.right + pad &&
            e.clientY >= r.top - pad && e.clientY <= r.bottom + pad) {
          chip.classList.remove('pulse');
          chip.style.visibility = 'hidden';
          trigger(stage);
        } else {
          sfx('wrong');
        }
      });
      chip.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; chip.style.opacity = ''; }
      });
      ctrls.appendChild(chip);
    }

    // tap each item to collect it; fills the needs panel
    function buildCollect(stage) {
      var remaining = stage.items.length;
      stage.items.forEach(function (item) {
        var chip = document.createElement('button');
        chip.className = 'pg-chip pulse';
        chip.textContent = item.emoji;
        chip.addEventListener('click', function () {
          if (chip.classList.contains('collected')) return;
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          chip.classList.add('collected');
          chip.classList.remove('pulse');
          if (needEls[item.id]) needEls[item.id].classList.add('filled');
          sfx('pop');
          remaining -= 1;
          if (remaining <= 0) trigger(stage);
        });
        ctrls.appendChild(chip);
      });
    }

    // tap a pulsing chip to play the stage animation and advance
    function buildContinue(stage) {
      var chip = document.createElement('button');
      chip.className = 'pg-chip pulse';
      chip.textContent = stage.chip;
      chip.addEventListener('click', function () {
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        chip.classList.remove('pulse');
        chip.style.visibility = 'hidden';
        trigger(stage);
      });
      ctrls.appendChild(chip);
    }

    function finish() {
      if (APP.progress) { try { APP.progress.recordWin('plantgrow', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      instr.textContent = '';
      ctrls.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'pg-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('plantgrow.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2);
      win.appendChild(again);
      ctrls.appendChild(win);
      speak(t('plantgrow.win'));
    }

    // kick off
    setStage(0);
  }

  APP.screens = APP.screens || {};
  APP.screens.plantgrow = { render: render };
})(window.APP);

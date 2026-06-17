window.APP = window.APP || {};
// "What plants need" — the child drags the four real needs (water, sun, air,
// soil) onto a wilted plant, which perks up leaf-by-leaf and finally blooms.
// Distractor items (toy, sweet, shoe…) shake and are rejected. Teaches needs vs
// non-needs. Reuses the clone-drag + target hit-test pattern.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function injectStyles() {
    if (document.getElementById('plantneeds-css')) return;
    var s = document.createElement('style');
    s.id = 'plantneeds-css';
    s.textContent = [
      '.pn-screen{display:flex;flex-direction:column;flex:1;min-height:0;background:linear-gradient(180deg,#eaf6ff 0%,#eafaf0 60%,#dcefdc 100%);}',
      '.pn-scene{flex:1;position:relative;display:flex;align-items:center;justify-content:center;overflow:hidden;min-height:0;}',
      '.pn-svg{width:min(300px,72vw);height:auto;max-height:46vh;}',
      '.pn-needs{position:absolute;top:10px;left:50%;transform:translateX(-50%);display:flex;gap:12px;z-index:4;}',
      '.pn-need{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.3rem;background:rgba(255,255,255,.6);filter:grayscale(1);opacity:.45;transition:filter .3s,opacity .3s,transform .3s;}',
      '.pn-need.filled{filter:none;opacity:1;transform:scale(1.14);box-shadow:0 2px 10px rgba(0,0,0,.18);}',
      '.pn-leaf{transform-box:fill-box;opacity:.5;filter:grayscale(.55) brightness(.9);transform:scale(.78);transition:transform .55s cubic-bezier(.34,1.56,.64,1),opacity .45s,filter .45s;}',
      '.pn-leafTL{transform-origin:100% 50%;}.pn-leafTR{transform-origin:0% 50%;}',
      '.pn-leafBL{transform-origin:100% 50%;}.pn-leafBR{transform-origin:0% 50%;}',
      '.pn-leaf.perk{opacity:1;filter:none;transform:scale(1);}',
      '.pn-flower{transform-box:fill-box;transform-origin:center bottom;opacity:0;transform:scale(0);transition:opacity .4s,transform .6s cubic-bezier(.34,1.56,.64,1);}',
      '.pn-flower.show{opacity:1;transform:scale(1);}',
      '.pn-pot-shake{animation:pn-nope .4s ease;}',
      '@keyframes pn-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}',
      '.pn-prompt{flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));background:rgba(255,255,255,.72);}',
      '.pn-instr{font-size:1.15rem;font-weight:700;color:#256145;text-align:center;}',
      '.pn-tray{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;}',
      '.pn-chip{width:56px;height:56px;border-radius:50%;border:none;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.2);font-size:1.9rem;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;user-select:none;}',
      '.pn-chip:active{cursor:grabbing;}',
      '.pn-chip.used{opacity:.3;pointer-events:none;filter:grayscale(1);}',
      '.pn-chip.wrong{animation:pn-nope .4s ease;}',
      '.pn-chip-clone{position:fixed;z-index:999;width:56px;height:56px;border-radius:50%;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.3);font-size:1.9rem;display:flex;align-items:center;justify-content:center;pointer-events:none;}',
      '.pn-star{position:absolute;pointer-events:none;font-size:1.6rem;z-index:6;animation:pn-spark .9s ease-out forwards;}',
      '@keyframes pn-spark{0%{transform:scale(.2);opacity:1;}100%{transform:scale(1.5) translateY(-26px);opacity:0;}}',
      '.pn-win{display:flex;flex-direction:column;align-items:center;gap:12px;}',
      '.pn-win h2{font-size:1.45rem;color:#256145;margin:0;text-align:center;}',
      // Short-landscape: cap the plant + compact the tray so all chips fit.
      '@media (orientation:landscape) and (max-height:520px){',
      '.pn-svg{max-height:42vh;}',
      '.pn-prompt{padding:6px 14px calc(6px + env(safe-area-inset-bottom,0px));gap:6px;}',
      '.pn-instr{font-size:1rem;}',
      '.pn-tray{gap:8px;}',
      '.pn-chip{width:48px;height:48px;font-size:1.6rem;}',
      '.pn-need{width:36px;height:36px;font-size:1.1rem;}',
      '}',
    ].join('');
    document.head.appendChild(s);
  }

  function plantSvg() {
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 240 250');
    svg.setAttribute('class', 'pn-svg');
    svg.innerHTML = [
      '<g class="pn-plant">',
        // stem
        '<path d="M120,200 L120,92" fill="none" stroke="#3fa86a" stroke-width="8" stroke-linecap="round"/>',
        // leaves (start pale + small; .perk makes them vivid + full)
        '<g class="pn-leaf pn-leafBL"><ellipse cx="92" cy="158" rx="26" ry="11" fill="#5bc06f" transform="rotate(-28 92 158)"/></g>',
        '<g class="pn-leaf pn-leafBR"><ellipse cx="148" cy="158" rx="26" ry="11" fill="#5bc06f" transform="rotate(28 148 158)"/></g>',
        '<g class="pn-leaf pn-leafTL"><ellipse cx="94" cy="120" rx="24" ry="10" fill="#6cc97e" transform="rotate(-22 94 120)"/></g>',
        '<g class="pn-leaf pn-leafTR"><ellipse cx="146" cy="116" rx="24" ry="10" fill="#6cc97e" transform="rotate(22 146 116)"/></g>',
        // flower (blooms on win)
        '<g class="pn-flower">',
          '<circle cx="120" cy="74" r="9" fill="#f582ae"/><circle cx="137" cy="86" r="9" fill="#f582ae"/>',
          '<circle cx="131" cy="104" r="9" fill="#f582ae"/><circle cx="109" cy="104" r="9" fill="#f582ae"/>',
          '<circle cx="103" cy="86" r="9" fill="#f582ae"/><circle cx="120" cy="90" r="8" fill="#ffd166"/>',
        '</g>',
        // pot
        '<rect x="70" y="190" width="100" height="12" rx="3" fill="#cf6a48"/>',
        '<polygon points="76,202 164,202 154,240 86,240" fill="#e8855f"/>',
        '<ellipse cx="120" cy="198" rx="46" ry="7" fill="#6b4423"/>',
      '</g>',
    ].join('');
    return svg;
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var NEEDS = (APP.GREENHOUSE && APP.GREENHOUSE.needs) || [];
    var DISTRACTORS = (APP.GREENHOUSE && APP.GREENHOUSE.distractors) || [];
    var leafOrder = ['pn-leafBL', 'pn-leafBR', 'pn-leafTR', 'pn-leafTL'];

    var wrap = document.createElement('div');
    wrap.className = 'pn-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.plantneeds.title'),
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); }
    }));

    var scene = document.createElement('div');
    scene.className = 'pn-scene';

    // needs panel
    var needsPanel = document.createElement('div');
    needsPanel.className = 'pn-needs';
    var needEls = {};
    NEEDS.forEach(function (n) {
      var d = document.createElement('div');
      d.className = 'pn-need';
      d.textContent = n.emoji;
      d.setAttribute('aria-label', t(n.label));
      needEls[n.id] = d;
      needsPanel.appendChild(d);
    });
    scene.appendChild(needsPanel);

    var svg = plantSvg();
    scene.appendChild(svg);
    var plantG = svg.querySelector('.pn-plant');
    var leaves = leafOrder.map(function (c) { return svg.querySelector('.' + c); });
    var flower = svg.querySelector('.pn-flower');
    wrap.appendChild(scene);

    // prompt + tray
    var prompt = document.createElement('div');
    prompt.className = 'pn-prompt';
    var instr = document.createElement('div');
    instr.className = 'pn-instr';
    instr.textContent = t('plantneeds.instr');
    var tray = document.createElement('div');
    tray.className = 'pn-tray';
    prompt.appendChild(instr);
    prompt.appendChild(tray);
    wrap.appendChild(prompt);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('plantneeds');

    var given = {};       // need id -> true
    var givenCount = 0;
    var done = false;

    function burstStars(n) {
      var rect = scene.getBoundingClientRect();
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'pn-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (40 + Math.random() * (rect.width - 80)) + 'px';
        star.style.top = (rect.height * 0.3 + Math.random() * rect.height * 0.35) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        scene.appendChild(star);
      }
    }

    function shakePlant() {
      plantG.classList.remove('pn-pot-shake');
      void plantG.getBBox; // touch
      plantG.classList.add('pn-pot-shake');
      plantG.addEventListener('animationend', function () { plantG.classList.remove('pn-pot-shake'); }, { once: true });
    }

    function giveNeed(need, chip) {
      given[need.id] = true;
      givenCount += 1;
      if (needEls[need.id]) needEls[need.id].classList.add('filled');
      if (leaves[givenCount - 1]) leaves[givenCount - 1].classList.add('perk');
      chip.classList.add('used');
      sfx('pop');
      burstStars(4);
      speak(t(need.fact));
      if (givenCount >= NEEDS.length) finish();
    }

    function finish() {
      if (done) return;
      done = true;
      flower.classList.add('show');
      if (APP.progress) { try { APP.progress.recordWin('plantneeds', { stars: 3 }); } catch (_) {} }
      setTimeout(function () {
        if (!wrap.isConnected) return;
        if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
        if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
        instr.textContent = '';
        tray.innerHTML = '';
        var win = document.createElement('div');
        win.className = 'pn-win';
        var h2 = document.createElement('h2');
        h2.textContent = t('plantneeds.win') + ' 🌼';
        var again = document.createElement('button');
        again.className = 'btn';
        again.textContent = t('ui.playAgain');
        again.addEventListener('click', function () { render(root, ctx); });
        win.appendChild(h2);
        win.appendChild(again);
        tray.appendChild(win);
        speak(t('plantneeds.win'));
      }, 600);
    }

    // ── Build the shuffled tray (4 needs + 3 random distractors) ──────────────
    var picks = NEEDS.map(function (n) { return { kind: 'need', data: n }; })
      .concat(shuffle(DISTRACTORS).slice(0, 3).map(function (d) { return { kind: 'distractor', data: d }; }));
    picks = shuffle(picks);

    picks.forEach(function (item) {
      var chip = document.createElement('button');
      chip.className = 'pn-chip';
      chip.textContent = item.data.emoji;
      if (item.kind === 'need') chip.setAttribute('aria-label', t(item.data.label));

      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - 28) + 'px'; clone.style.top = (y - 28) + 'px'; }

      chip.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (chip.classList.contains('used') || done) return;
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        try { chip.setPointerCapture(e.pointerId); } catch (_) {}
        sfx('click');
        var clone = document.createElement('div');
        clone.className = 'pn-chip-clone';
        clone.textContent = item.data.emoji;
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
        var r = svg.getBoundingClientRect();
        var pad = 20;
        var onPlant = e.clientX >= r.left - pad && e.clientX <= r.right + pad &&
                      e.clientY >= r.top - pad && e.clientY <= r.bottom + pad;
        if (!onPlant) return;
        if (item.kind === 'need' && !given[item.data.id]) {
          giveNeed(item.data, chip);
        } else if (item.kind === 'distractor') {
          sfx('wrong');
          chip.classList.remove('wrong'); void chip.offsetWidth; chip.classList.add('wrong');
          shakePlant();
          speak(t('plantneeds.no'));
        }
      });
      chip.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; chip.style.opacity = ''; }
      });

      tray.appendChild(chip);
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.plantneeds = { render: render };
})(window.APP);

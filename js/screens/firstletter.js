window.APP = window.APP || {};
// Starting Letter. An animal picture appears (tap to hear its name); the child
// drags it onto the letter it starts with, chosen from four options. Five
// correct rounds win. Distinct from `findletter` (tap a letter from choices).
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text, loc) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text, loc); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var ROUNDS = 5;

  function injectStyles() {
    if (document.getElementById('firstletter-css')) return;
    var s = document.createElement('style');
    s.id = 'firstletter-css';
    s.textContent = [
      '.fl-screen{display:flex;flex-direction:column;flex:1;min-height:0;background:linear-gradient(180deg,#e9f7ff,#eef8ef);}',
      '.fl-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:14px;padding:16px;overflow-y:auto;}',
      '.fl-progress{font-size:.95rem;font-weight:700;color:#2c7bb5;}',
      '.fl-prompt{font-size:1.1rem;font-weight:700;color:#1a4a6b;text-align:center;}',
      '.fl-pic{width:140px;height:140px;border-radius:20px;background:rgba(255,255,255,.7);box-shadow:0 4px 12px rgba(0,0,0,.14);display:flex;align-items:center;justify-content:center;padding:12px;box-sizing:border-box;cursor:grab;touch-action:none;}',
      '.fl-pic:active{cursor:grabbing;}',
      '.fl-pic img{width:100%;height:100%;object-fit:contain;pointer-events:none;}',
      '.fl-pic-fallback{font-size:4rem;font-weight:800;color:#e07a2c;}',
      '.fl-pic-clone{position:fixed;z-index:999;width:120px;height:120px;border-radius:20px;background:rgba(255,255,255,.95);box-shadow:0 8px 20px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;padding:10px;box-sizing:border-box;pointer-events:none;}',
      '.fl-pic-clone img{width:100%;height:100%;object-fit:contain;}',
      '.fl-letters{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;}',
      '.fl-letter{width:64px;height:64px;font-size:2rem;font-weight:800;border:none;border-radius:14px;background:#fff;color:#1a4a6b;box-shadow:0 3px 9px rgba(0,0,0,.18);cursor:pointer;border:3px solid transparent;transition:border-color .2s,background .2s;}',
      '.fl-letter.over{border-color:#4a90d9;background:#eaf3ff;}',
      '.fl-letter.right{background:#06d6a0;color:#fff;}',
      '.fl-letter.wrong{animation:fl-nope .4s ease;}',
      '@keyframes fl-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.fl-star{position:fixed;pointer-events:none;font-size:1.7rem;z-index:200;animation:fl-spark .9s ease-out forwards;}',
      '@keyframes fl-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-30px);opacity:0}}',
      '.fl-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px;text-align:center;}',
      '.fl-win h2{font-size:1.6rem;color:#06a37a;margin:0;}',
      // Short-landscape: compact so the picture + letter targets all fit.
      '@media (orientation:landscape) and (max-height:520px){',
      '.fl-body{justify-content:center;gap:10px;padding:10px;}',
      '.fl-pic{width:104px;height:104px;}',
      '.fl-pic-clone{width:96px;height:96px;}',
      '.fl-prompt{font-size:1rem;}',
      '.fl-letters{gap:10px;}',
      '.fl-letter{width:54px;height:54px;font-size:1.6rem;}',
      '}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var locale = APP.state && APP.state.settings ? APP.state.settings.locale : 'en';
    var roundsDone = 0;
    var lastAnimal = null;
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'fl-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.firstletter.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('firstletter')); },
      onRestart: function () { clearTimers(); render(root, ctx); }
    }));

    var body = document.createElement('div');
    body.className = 'fl-body';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('firstletter');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'fl-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function newRound() {
      body.innerHTML = '';
      var animal = APP.animals && APP.animals.pickRandom ? APP.animals.pickRandom(12, lastAnimal) : null;
      if (!animal) { var all = (APP.animals && APP.animals.eligibleAll) ? APP.animals.eligibleAll() : (APP.ANIMALS || []); animal = all[Math.floor(Math.random() * all.length)]; }
      lastAnimal = animal;
      var correct = animal.name.charAt(0).toUpperCase();
      var answered = false;

      var prog = document.createElement('div');
      prog.className = 'fl-progress';
      prog.textContent = (roundsDone + 1) + ' / ' + ROUNDS;
      body.appendChild(prog);

      // picture (draggable + tappable to hear the name)
      var pic = document.createElement('div');
      pic.className = 'fl-pic';
      var img = document.createElement('img');
      img.src = animal.images.cartoon;
      img.alt = animal.displayName;
      img.addEventListener('error', function () {
        var fb = document.createElement('div');
        fb.className = 'fl-pic-fallback';
        fb.textContent = correct;
        pic.replaceChild(fb, img);
      });
      pic.appendChild(img);
      body.appendChild(pic);

      var prompt = document.createElement('div');
      prompt.className = 'fl-prompt';
      prompt.textContent = t('firstletter.prompt');
      body.appendChild(prompt);

      var letters = document.createElement('div');
      letters.className = 'fl-letters';
      var distractors = shuffle(ALPHA.replace(correct, '').split('')).slice(0, 3);
      var options = shuffle([correct].concat(distractors));
      var letterEls = [];
      options.forEach(function (L) {
        var b = document.createElement('button');
        b.className = 'fl-letter';
        b.textContent = L;
        b.dataset.letter = L;
        letterEls.push(b);
        letters.appendChild(b);
      });
      body.appendChild(letters);

      function letterAt(x, y) {
        for (var i = 0; i < letterEls.length; i++) {
          var r = letterEls[i].getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return letterEls[i];
        }
        return null;
      }

      // speak the animal name so the child knows what it is
      speak(animal.displayName, locale);

      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - 60) + 'px'; clone.style.top = (y - 60) + 'px'; }
      pic.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (answered) return;
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        try { pic.setPointerCapture(e.pointerId); } catch (_) {}
        speak(animal.displayName, locale);
        var clone = document.createElement('div');
        clone.className = 'fl-pic-clone';
        var ci = img.cloneNode(true);
        clone.appendChild(ci);
        document.body.appendChild(clone);
        moveClone(clone, e.clientX, e.clientY);
        pic.style.opacity = '0.3';
        dragging = { clone: clone };
      });
      pic.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        moveClone(dragging.clone, e.clientX, e.clientY);
        var L = letterAt(e.clientX, e.clientY);
        letterEls.forEach(function (le) { le.classList.toggle('over', le === L); });
      });
      pic.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging.clone.remove();
        dragging = null;
        pic.style.opacity = '';
        letterEls.forEach(function (le) { le.classList.remove('over'); });
        var L = letterAt(e.clientX, e.clientY);
        if (!L) return;
        if (L.dataset.letter === correct) {
          answered = true;
          L.classList.add('right');
          sfx('pop');
          speak(correct.toLowerCase(), locale);
          var r = L.getBoundingClientRect();
          burstStars(r.left + r.width / 2, r.top, 5);
          roundsDone += 1;
          if (roundsDone >= ROUNDS) later(showWin, 850);
          else later(newRound, 950);
        } else {
          sfx('wrong');
          L.classList.remove('wrong'); void L.offsetWidth; L.classList.add('wrong');
        }
      });
      pic.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; pic.style.opacity = ''; letterEls.forEach(function (le) { le.classList.remove('over'); }); }
      });
    }

    function showWin() {
      if (APP.progress) { try { APP.progress.recordWin('firstletter', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      body.innerHTML = '';
      body.style.justifyContent = 'center';
      var win = document.createElement('div');
      win.className = 'fl-win';
      var h2 = document.createElement('h2');
      h2.textContent = t('firstletter.win') + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { clearTimers(); render(root, ctx); });
      win.appendChild(h2);
      win.appendChild(again);
      body.appendChild(win);
      speak(t('firstletter.win'), locale);
    }

    newRound();
  }

  APP.screens = APP.screens || {};
  APP.screens.firstletter = { render: render };
})(window.APP);

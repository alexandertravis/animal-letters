window.APP = window.APP || {};
// Word-Picture Match. A row of animal pictures and a shuffled row of word
// cards; the child drags each word onto its matching picture. Tapping a word
// speaks it. Match them all to win. Difficulty `pairs` (3 / 4 / 5).
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  var DEFAULTS = { pairs: 4 };

  function injectStyles() {
    if (document.getElementById('wordmatch-css')) return;
    var s = document.createElement('style');
    s.id = 'wordmatch-css';
    s.textContent = [
      '.wm-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#fff6e9,#eef8ef);}',
      '.wm-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:space-between;gap:16px;padding:16px;overflow-y:auto;}',
      '.wm-pics{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:flex-start;}',
      '.wm-pic{width:104px;min-height:104px;border-radius:16px;background:rgba(255,255,255,.7);box-shadow:0 3px 9px rgba(0,0,0,.14);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;box-sizing:border-box;border:3px solid transparent;transition:border-color .2s,background .2s;}',
      '.wm-pic.over{border-color:#4a90d9;background:#eaf3ff;}',
      '.wm-pic.matched{border-color:#06d6a0;background:#e9fff7;}',
      '.wm-pic img{width:74px;height:74px;object-fit:contain;pointer-events:none;}',
      '.wm-pic-fallback{width:74px;height:74px;display:flex;align-items:center;justify-content:center;font-size:2.4rem;font-weight:800;color:#e07a2c;}',
      '.wm-pic-label{font-size:.95rem;font-weight:800;color:#1a6b46;margin-top:4px;min-height:1.1em;}',
      '.wm-cards{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}',
      '.wm-card{padding:12px 16px;border-radius:14px;background:#ffd166;color:#5a3a00;font-size:1.2rem;font-weight:800;box-shadow:0 3px 8px rgba(0,0,0,.18);cursor:grab;touch-action:none;user-select:none;}',
      '.wm-card:active{cursor:grabbing;}',
      '.wm-card.matched{opacity:0;pointer-events:none;}',
      '.wm-card-clone{position:fixed;z-index:999;padding:12px 16px;border-radius:14px;background:#ffd166;color:#5a3a00;font-size:1.2rem;font-weight:800;box-shadow:0 7px 18px rgba(0,0,0,.3);pointer-events:none;}',
      '.wm-star{position:fixed;pointer-events:none;font-size:1.6rem;z-index:200;animation:wm-spark .9s ease-out forwards;}',
      '@keyframes wm-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-28px);opacity:0}}',
      '.wm-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px;text-align:center;}',
      '.wm-win h2{font-size:1.6rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('wordmatch', DEFAULTS);
    var pairs = settings.pairs || DEFAULTS.pairs;
    var all = (APP.animals && APP.animals.eligibleAll) ? APP.animals.eligibleAll() : (APP.ANIMALS || []);
    var chosen = shuffle(all).slice(0, Math.min(pairs, all.length));
    var matched = 0;
    var done = false;

    var wrap = document.createElement('div');
    wrap.className = 'wm-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.wordmatch.title'),
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); },
      settings: {
        gameId: 'wordmatch',
        title: t('game.wordmatch.title'),
        schema: [{
          type: 'segmented', key: 'pairs', label: t('wordmatch.pairs'),
          options: [{ value: 3, label: '3' }, { value: 4, label: '4' }, { value: 5, label: '5' }]
        }],
        onChange: function (key, val, all2) { APP.settings.saveGame('wordmatch', all2); render(root, ctx); }
      }
    }));

    var body = document.createElement('div');
    body.className = 'wm-body';

    // pictures (drop targets) — displayed in their own shuffled order
    var pics = document.createElement('div');
    pics.className = 'wm-pics';
    var picEls = [];
    shuffle(chosen).forEach(function (animal) {
      var pic = document.createElement('div');
      pic.className = 'wm-pic';
      pic.dataset.name = animal.name;
      var img = document.createElement('img');
      img.src = animal.images.cartoon;
      img.alt = animal.displayName;
      img.addEventListener('error', function () {
        var fb = document.createElement('div');
        fb.className = 'wm-pic-fallback';
        fb.textContent = (animal.displayName || animal.name).charAt(0);
        pic.replaceChild(fb, img);
      });
      pic.appendChild(img);
      var label = document.createElement('div');
      label.className = 'wm-pic-label';
      pic.appendChild(label);
      pic._label = label;
      picEls.push(pic);
      pics.appendChild(pic);
    });
    body.appendChild(pics);

    // word cards (draggable)
    var cards = document.createElement('div');
    cards.className = 'wm-cards';
    shuffle(chosen).forEach(function (animal) {
      cards.appendChild(makeCard(animal));
    });
    body.appendChild(cards);

    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('wordmatch');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'wm-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function picAt(x, y) {
      for (var i = 0; i < picEls.length; i++) {
        var r = picEls[i].getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return picEls[i];
      }
      return null;
    }

    function makeCard(animal) {
      var card = document.createElement('div');
      card.className = 'wm-card';
      card.dataset.name = animal.name;
      card.textContent = animal.displayName;
      var dragging = null;
      function moveClone(clone, x, y) { clone.style.left = (x - clone.offsetWidth / 2) + 'px'; clone.style.top = (y - 22) + 'px'; }
      card.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        if (done || card.classList.contains('matched')) return;
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        try { card.setPointerCapture(e.pointerId); } catch (_) {}
        speak(animal.displayName);
        var clone = document.createElement('div');
        clone.className = 'wm-card-clone';
        clone.textContent = animal.displayName;
        document.body.appendChild(clone);
        moveClone(clone, e.clientX, e.clientY);
        card.style.opacity = '0.3';
        dragging = { clone: clone };
      });
      card.addEventListener('pointermove', function (e) {
        if (!dragging) return;
        moveClone(dragging.clone, e.clientX, e.clientY);
        var p = picAt(e.clientX, e.clientY);
        picEls.forEach(function (pe) { pe.classList.toggle('over', pe === p && !pe.classList.contains('matched')); });
      });
      card.addEventListener('pointerup', function (e) {
        if (!dragging) return;
        dragging.clone.remove();
        dragging = null;
        card.style.opacity = '';
        picEls.forEach(function (pe) { pe.classList.remove('over'); });
        var p = picAt(e.clientX, e.clientY);
        if (p && !p.classList.contains('matched') && p.dataset.name === animal.name) {
          p.classList.add('matched');
          p._label.textContent = animal.displayName;
          card.classList.add('matched');
          sfx('pop');
          speak(animal.displayName);
          var r = p.getBoundingClientRect();
          burstStars(r.left + r.width / 2, r.top, 4);
          matched += 1;
          if (matched >= chosen.length) finish();
        } else if (p) {
          sfx('wrong');
        }
      });
      card.addEventListener('pointercancel', function () {
        if (dragging) { dragging.clone.remove(); dragging = null; card.style.opacity = ''; picEls.forEach(function (pe) { pe.classList.remove('over'); }); }
      });
      return card;
    }

    function finish() {
      if (done) return;
      done = true;
      if (APP.progress) { try { APP.progress.recordWin('wordmatch', { stars: 3 }); } catch (_) {} }
      setTimeout(function () {
        if (!wrap.isConnected) return;
        if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
        if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
        body.innerHTML = '';
        body.style.justifyContent = 'center';
        var win = document.createElement('div');
        win.className = 'wm-win';
        var h2 = document.createElement('h2');
        h2.textContent = t('wordmatch.win') + ' 🎉';
        var again = document.createElement('button');
        again.className = 'btn';
        again.textContent = t('ui.playAgain');
        again.addEventListener('click', function () { render(root, ctx); });
        win.appendChild(h2);
        win.appendChild(again);
        body.appendChild(win);
        speak(t('wordmatch.win'));
      }, 500);
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.wordmatch = { render: render };
})(window.APP);

window.APP = window.APP || {};
// Days & Months. Two tabs: "Days" — drag the seven day chips into their
// numbered slots in order; "Months" — a "what comes next?" quiz over the twelve
// months. Both speak the names and award a star on completion.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text, loc) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text, loc); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  var MONTH_ROUNDS = 5;

  function injectStyles() {
    if (document.getElementById('calendar-css')) return;
    var s = document.createElement('style');
    s.id = 'calendar-css';
    s.textContent = [
      '.cal-screen{display:flex;flex-direction:column;min-height:100vh;background:linear-gradient(180deg,#fff0f5,#eef8ef);}',
      '.cal-tabs{display:flex;border-bottom:2px solid #e7d7e0;}',
      '.cal-tab{flex:1;padding:11px 14px;background:none;border:none;font-size:1rem;font-weight:700;color:#b5557f;opacity:.6;cursor:pointer;}',
      '.cal-tab.active{opacity:1;border-bottom:3px solid #d6336c;margin-bottom:-2px;color:#a61e4d;}',
      '.cal-content{flex:1;display:flex;flex-direction:column;align-items:center;gap:14px;padding:16px;overflow-y:auto;}',
      '.cal-prompt{font-size:1.15rem;font-weight:800;color:#a61e4d;text-align:center;}',
      // days
      '.cal-slots{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}',
      '.cal-slot{min-width:96px;height:54px;border-radius:12px;border:3px dashed rgba(0,0,0,.18);display:flex;align-items:center;justify-content:center;gap:4px;font-weight:800;color:#999;background:rgba(255,255,255,.5);box-sizing:border-box;}',
      '.cal-slot .cal-slot-num{font-size:.8rem;color:#c98aaf;}',
      '.cal-slot.over{border-color:#d6336c;background:#ffe3ef;}',
      '.cal-slot.filled{border-style:solid;border-color:#06d6a0;color:#1a6b46;background:#e9fff7;}',
      '.cal-tray{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;}',
      '.cal-chip{padding:11px 14px;border-radius:12px;background:#ffd6e7;color:#a61e4d;font-weight:800;box-shadow:0 3px 8px rgba(0,0,0,.16);cursor:grab;touch-action:none;user-select:none;}',
      '.cal-chip:active{cursor:grabbing;}',
      '.cal-chip.used{opacity:0;pointer-events:none;}',
      '.cal-chip-clone{position:fixed;z-index:999;padding:11px 14px;border-radius:12px;background:#ffd6e7;color:#a61e4d;font-weight:800;box-shadow:0 7px 18px rgba(0,0,0,.3);pointer-events:none;}',
      // months quiz
      '.cal-q-month{font-size:1.6rem;font-weight:800;color:#a61e4d;}',
      '.cal-options{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}',
      '.cal-opt{min-width:120px;padding:14px 16px;font-size:1.05rem;font-weight:800;border:none;border-radius:14px;background:#fff;color:#a61e4d;box-shadow:0 3px 9px rgba(0,0,0,.16);cursor:pointer;}',
      '.cal-opt.right{background:#06d6a0;color:#fff;}',
      '.cal-opt.wrong{animation:cal-nope .4s ease;}',
      '@keyframes cal-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
      '.cal-progress{font-size:.95rem;font-weight:700;color:#b5557f;}',
      '.cal-star{position:fixed;pointer-events:none;font-size:1.6rem;z-index:200;animation:cal-spark .9s ease-out forwards;}',
      '@keyframes cal-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-28px);opacity:0}}',
      '.cal-win{display:flex;flex-direction:column;align-items:center;gap:14px;padding:20px;text-align:center;}',
      '.cal-win h2{font-size:1.5rem;color:#06a37a;margin:0;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('calendar'); } catch (_) {} }

    var locale = APP.state && APP.state.settings ? APP.state.settings.locale : 'en';
    var days = APP.calendarList ? APP.calendarList('days', locale) : [];
    var months = APP.calendarList ? APP.calendarList('months', locale) : [];
    var timers = [];
    function later(fn, ms) { var id = setTimeout(function () { if (wrap.isConnected) fn(); }, ms); timers.push(id); return id; }
    function clearTimers() { timers.forEach(clearTimeout); timers = []; }

    var wrap = document.createElement('div');
    wrap.className = 'cal-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.calendar.title'),
      home: true,
      back: function () { clearTimers(); ctx.go(APP.ui.defaultBackTarget('calendar')); }
    }));

    var tabs = document.createElement('div');
    tabs.className = 'cal-tabs';
    var content = document.createElement('div');
    content.className = 'cal-content';
    var tabBtns = [];
    function selectTab(btn, fn) {
      clearTimers();
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      content.innerHTML = '';
      fn();
    }
    [['days', t('calendar.days'), function () { buildDays(); }], ['months', t('calendar.months'), function () { buildMonths(); }]].forEach(function (def) {
      var btn = document.createElement('button');
      btn.className = 'cal-tab';
      btn.textContent = def[1];
      btn.addEventListener('click', function () { if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} } selectTab(btn, def[2]); });
      tabBtns.push(btn);
      tabs.appendChild(btn);
    });

    wrap.appendChild(tabs);
    wrap.appendChild(content);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('calendar');

    function burstStars(x, y, n) {
      for (var i = 0; i < n; i++) {
        var star = document.createElement('span');
        star.className = 'cal-star';
        star.textContent = ['⭐', '✨', '💫'][i % 3];
        star.style.left = (x + (Math.random() * 50 - 25)) + 'px';
        star.style.top = (y + (Math.random() * 30 - 15)) + 'px';
        star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
        document.body.appendChild(star);
      }
    }

    function celebrate(winKey, rebuild) {
      if (APP.progress) { try { APP.progress.recordWin('calendar', { stars: 3 }); } catch (_) {} }
      if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
      if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
      content.innerHTML = '';
      var win = document.createElement('div');
      win.className = 'cal-win';
      var h2 = document.createElement('h2');
      h2.textContent = t(winKey) + ' 🎉';
      var again = document.createElement('button');
      again.className = 'btn';
      again.textContent = t('ui.playAgain');
      again.addEventListener('click', function () { content.innerHTML = ''; rebuild(); });
      win.appendChild(h2);
      win.appendChild(again);
      content.appendChild(win);
      speak(t(winKey), locale);
    }

    // ── Days: drag chips into numbered slots in order ─────────────────────────
    function buildDays() {
      var prompt = document.createElement('div');
      prompt.className = 'cal-prompt';
      prompt.textContent = t('calendar.daysPrompt');
      content.appendChild(prompt);

      var slotsRow = document.createElement('div');
      slotsRow.className = 'cal-slots';
      var slotEls = [];
      days.forEach(function (_, i) {
        var slot = document.createElement('div');
        slot.className = 'cal-slot';
        slot.dataset.index = i;
        slot.innerHTML = '<span class="cal-slot-num">' + (i + 1) + '</span>';
        slotEls.push(slot);
        slotsRow.appendChild(slot);
      });
      content.appendChild(slotsRow);

      var tray = document.createElement('div');
      tray.className = 'cal-tray';
      content.appendChild(tray);

      var placed = 0;
      function slotAt(x, y) {
        for (var i = 0; i < slotEls.length; i++) {
          var r = slotEls[i].getBoundingClientRect();
          if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return slotEls[i];
        }
        return null;
      }

      shuffle(days.map(function (name, i) { return { name: name, index: i }; })).forEach(function (day) {
        var chip = document.createElement('div');
        chip.className = 'cal-chip';
        chip.textContent = day.name;
        var dragging = null;
        function moveClone(c, x, y) { c.style.left = (x - c.offsetWidth / 2) + 'px'; c.style.top = (y - 20) + 'px'; }
        chip.addEventListener('pointerdown', function (e) {
          e.preventDefault();
          if (chip.classList.contains('used')) return;
          if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
          try { chip.setPointerCapture(e.pointerId); } catch (_) {}
          speak(day.name, locale);
          var clone = document.createElement('div');
          clone.className = 'cal-chip-clone';
          clone.textContent = day.name;
          document.body.appendChild(clone);
          moveClone(clone, e.clientX, e.clientY);
          chip.style.opacity = '0.3';
          dragging = { clone: clone };
        });
        chip.addEventListener('pointermove', function (e) {
          if (!dragging) return;
          moveClone(dragging.clone, e.clientX, e.clientY);
          var sl = slotAt(e.clientX, e.clientY);
          slotEls.forEach(function (s2) { s2.classList.toggle('over', s2 === sl && !s2.classList.contains('filled')); });
        });
        chip.addEventListener('pointerup', function (e) {
          if (!dragging) return;
          dragging.clone.remove();
          dragging = null;
          chip.style.opacity = '';
          slotEls.forEach(function (s2) { s2.classList.remove('over'); });
          var sl = slotAt(e.clientX, e.clientY);
          if (sl && !sl.classList.contains('filled') && parseInt(sl.dataset.index, 10) === day.index) {
            sl.classList.add('filled');
            sl.innerHTML = '<span class="cal-slot-num">' + (day.index + 1) + '</span>' + day.name;
            chip.classList.add('used');
            sfx('pop');
            var r = sl.getBoundingClientRect();
            burstStars(r.left + r.width / 2, r.top, 4);
            placed += 1;
            if (placed >= days.length) later(function () { celebrate('calendar.daysWin', buildDays); }, 500);
          } else if (sl) {
            sfx('wrong');
          }
        });
        chip.addEventListener('pointercancel', function () {
          if (dragging) { dragging.clone.remove(); dragging = null; chip.style.opacity = ''; slotEls.forEach(function (s2) { s2.classList.remove('over'); }); }
        });
        tray.appendChild(chip);
      });
    }

    // ── Months: "what comes next?" quiz ───────────────────────────────────────
    function buildMonths() {
      var roundsDone = 0;
      var quiz = document.createElement('div');
      quiz.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;';
      content.appendChild(quiz);

      function showRound() {
        quiz.innerHTML = '';
        var i = Math.floor(Math.random() * months.length);
        var answer = months[(i + 1) % months.length];
        var answered = false;

        var prog = document.createElement('div');
        prog.className = 'cal-progress';
        prog.textContent = (roundsDone + 1) + ' / ' + MONTH_ROUNDS;
        quiz.appendChild(prog);

        var prompt = document.createElement('div');
        prompt.className = 'cal-prompt';
        prompt.textContent = t('calendar.next');
        quiz.appendChild(prompt);

        var cur = document.createElement('div');
        cur.className = 'cal-q-month';
        cur.textContent = months[i] + ' →';
        quiz.appendChild(cur);
        speak(months[i], locale);

        var distractors = shuffle(months.filter(function (m) { return m !== answer; })).slice(0, 3);
        var opts = shuffle([answer].concat(distractors));
        var optRow = document.createElement('div');
        optRow.className = 'cal-options';
        opts.forEach(function (m) {
          var b = document.createElement('button');
          b.className = 'cal-opt';
          b.textContent = m;
          b.addEventListener('click', function () {
            if (answered) return;
            if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
            if (m === answer) {
              answered = true;
              b.classList.add('right');
              sfx('pop');
              speak(answer, locale);
              var r = b.getBoundingClientRect();
              burstStars(r.left + r.width / 2, r.top, 5);
              roundsDone += 1;
              if (roundsDone >= MONTH_ROUNDS) later(function () { celebrate('calendar.monthsWin', buildMonths); }, 800);
              else later(showRound, 850);
            } else {
              sfx('wrong');
              b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
            }
          });
          optRow.appendChild(b);
        });
        quiz.appendChild(optRow);
      }
      showRound();
    }

    // default to the Days tab
    if (tabBtns.length) selectTab(tabBtns[0], function () { buildDays(); });
  }

  APP.screens = APP.screens || {};
  APP.screens.calendar = { render: render };
})(window.APP);

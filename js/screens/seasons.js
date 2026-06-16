window.APP = window.APP || {};
// Vegetable patch & seasons. Four explorable tabs (one per season: sky tint,
// crop emoji, a seasonal creature and a spoken fact) plus a "Which season is
// this?" quiz that awards stars. Teaches the seasons, what happens in the patch
// and which insects appear. Modelled on the Music Shed tab pattern.
(function (APP) {
  function t(key) { return (APP.t && APP.t(key)) || key; }
  function sfx(name) { if (APP.audio && APP.audio.sfx && APP.audio.sfx[name]) { try { APP.audio.sfx[name](); } catch (e) {} } }
  function speak(text) { if (APP.audio && APP.audio.speak) { try { APP.audio.speak(text); } catch (e) {} } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; } return a; }

  function injectStyles() {
    if (document.getElementById('seasons-css')) return;
    var s = document.createElement('style');
    s.id = 'seasons-css';
    s.textContent = [
      '.se-screen{display:flex;flex-direction:column;min-height:100vh;background:#eef8ef;}',
      '.se-tabs{display:flex;border-bottom:2px solid #d7e7d7;overflow-x:auto;}',
      '.se-tab{flex:1 0 auto;padding:11px 14px;background:none;border:none;font-size:.95rem;font-weight:700;color:#3a5;opacity:.6;cursor:pointer;white-space:nowrap;}',
      '.se-tab.active{opacity:1;border-bottom:3px solid #3fa86a;margin-bottom:-2px;color:#256145;}',
      '.se-content{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:18px 16px;gap:16px;overflow-y:auto;}',
      '.se-stage{position:relative;width:min(440px,94vw);height:min(240px,38vh);border-radius:20px;overflow:hidden;box-shadow:0 4px 14px rgba(0,0,0,.12);display:flex;align-items:flex-end;}',
      '.se-creature{position:absolute;top:14px;right:18px;font-size:2.4rem;animation:se-float 3s ease-in-out infinite;}',
      '@keyframes se-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}',
      '.se-soil{width:100%;height:42%;background:linear-gradient(180deg,#a9743f,#8a5a33);display:flex;align-items:center;justify-content:space-around;padding:0 10px 6px;box-sizing:border-box;}',
      '.se-crop{font-size:2.6rem;line-height:1;}',
      '.se-fact{font-size:1.1rem;font-weight:600;color:#256145;text-align:center;max-width:440px;line-height:1.4;}',
      '.se-title{font-size:1.5rem;font-weight:800;color:#256145;}',
      // quiz
      '.se-quiz{display:flex;flex-direction:column;align-items:center;gap:16px;width:100%;}',
      '.se-q-prompt{font-size:1.2rem;font-weight:700;color:#256145;text-align:center;}',
      '.se-q-options{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;}',
      '.se-q-opt{min-width:120px;padding:14px 18px;font-size:1rem;font-weight:700;border:none;border-radius:14px;background:#fff;box-shadow:0 3px 10px rgba(0,0,0,.15);cursor:pointer;color:#256145;}',
      '.se-q-opt.wrong{animation:se-nope .4s ease;}',
      '@keyframes se-nope{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}',
      '.se-q-progress{font-size:.95rem;color:#3a5;font-weight:700;}',
      '.se-star{position:absolute;pointer-events:none;font-size:1.7rem;z-index:6;animation:se-spark .9s ease-out forwards;}',
      '@keyframes se-spark{0%{transform:scale(.2);opacity:1}100%{transform:scale(1.5) translateY(-26px);opacity:0}}',
      '.se-win{display:flex;flex-direction:column;align-items:center;gap:12px;}',
      '.se-win h2{font-size:1.45rem;color:#256145;margin:0;text-align:center;}',
    ].join('');
    document.head.appendChild(s);
  }

  // Build a patch scene for a season. When `hideName` is true the season title
  // is omitted (used by the quiz).
  function makeStage(season) {
    var stage = document.createElement('div');
    stage.className = 'se-stage';
    stage.style.background = 'linear-gradient(180deg,' + season.sky + ' 0%,#eafaf0 100%)';
    var creature = document.createElement('span');
    creature.className = 'se-creature';
    creature.textContent = season.bug;
    stage.appendChild(creature);
    var soil = document.createElement('div');
    soil.className = 'se-soil';
    season.crops.forEach(function (c) {
      var span = document.createElement('span');
      span.className = 'se-crop';
      span.textContent = c;
      soil.appendChild(span);
    });
    stage.appendChild(soil);
    return stage;
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';
    if (APP.progress) { try { APP.progress.recordPlay('seasons'); } catch (_) {} }

    var SEASONS = (APP.GREENHOUSE && APP.GREENHOUSE.seasons) || [];

    var wrap = document.createElement('div');
    wrap.className = 'se-screen';
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: t('game.seasons.title'),
      home: true,
      back: true
    }));

    var tabs = document.createElement('div');
    tabs.className = 'se-tabs';
    var content = document.createElement('div');
    content.className = 'se-content';

    var tabBtns = [];
    function selectTab(btn, fn) {
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      content.innerHTML = '';
      fn();
    }

    SEASONS.forEach(function (season) {
      var btn = document.createElement('button');
      btn.className = 'se-tab';
      btn.textContent = t(season.label);
      btn.addEventListener('click', function () {
        if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
        selectTab(btn, function () { buildSeason(season); });
      });
      tabBtns.push(btn);
      tabs.appendChild(btn);
    });

    var quizBtn = document.createElement('button');
    quizBtn.className = 'se-tab';
    quizBtn.textContent = t('seasons.quiz');
    quizBtn.addEventListener('click', function () {
      if (APP.audio && APP.audio._wake) { try { APP.audio._wake(); } catch (_) {} }
      selectTab(quizBtn, function () { buildQuiz(); });
    });
    tabBtns.push(quizBtn);
    tabs.appendChild(quizBtn);

    wrap.appendChild(tabs);
    wrap.appendChild(content);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('seasons');

    function buildSeason(season) {
      var title = document.createElement('div');
      title.className = 'se-title';
      title.textContent = t(season.label);
      content.appendChild(title);
      content.appendChild(makeStage(season));
      var fact = document.createElement('div');
      fact.className = 'se-fact';
      fact.textContent = t(season.fact);
      content.appendChild(fact);
      speak(t(season.fact));
    }

    // ── Quiz: "Which season is this?" ────────────────────────────────────────
    function buildQuiz() {
      var rounds = shuffle(SEASONS);
      var qi = 0;
      var quiz = document.createElement('div');
      quiz.className = 'se-quiz';
      content.appendChild(quiz);

      function burstStars(anchor, n) {
        var rect = quiz.getBoundingClientRect();
        var ar = anchor.getBoundingClientRect();
        var cx = ar.left - rect.left + ar.width / 2;
        var cy = ar.top - rect.top + ar.height / 2;
        for (var i = 0; i < n; i++) {
          var star = document.createElement('span');
          star.className = 'se-star';
          star.textContent = ['⭐', '✨', '💫'][i % 3];
          star.style.left = (cx + (Math.random() * 50 - 25)) + 'px';
          star.style.top = (cy + (Math.random() * 30 - 15)) + 'px';
          star.addEventListener('animationend', function () { if (this.parentNode) this.parentNode.removeChild(this); });
          quiz.appendChild(star);
        }
      }

      function showRound() {
        quiz.innerHTML = '';
        var season = rounds[qi];
        var prog = document.createElement('div');
        prog.className = 'se-q-progress';
        prog.textContent = (qi + 1) + ' / ' + rounds.length;
        quiz.appendChild(prog);
        quiz.appendChild(makeStage(season));
        var prompt = document.createElement('div');
        prompt.className = 'se-q-prompt';
        prompt.textContent = t('seasons.quizPrompt');
        quiz.appendChild(prompt);
        var opts = document.createElement('div');
        opts.className = 'se-q-options';
        shuffle(SEASONS).forEach(function (opt) {
          var b = document.createElement('button');
          b.className = 'se-q-opt';
          b.textContent = t(opt.label);
          b.addEventListener('click', function () {
            if (opt.id === season.id) {
              sfx('pop');
              burstStars(b, 5);
              qi += 1;
              if (qi >= rounds.length) quizWin();
              else setTimeout(function () { if (quiz.isConnected) showRound(); }, 500);
            } else {
              sfx('wrong');
              b.classList.remove('wrong'); void b.offsetWidth; b.classList.add('wrong');
            }
          });
          opts.appendChild(b);
        });
        quiz.appendChild(opts);
      }

      function quizWin() {
        if (APP.progress) { try { APP.progress.recordWin('seasons', { stars: 3 }); } catch (_) {} }
        if (APP.launchConfetti) { try { APP.launchConfetti(); } catch (_) {} }
        if (APP.audio && APP.audio.wordDone) { try { APP.audio.wordDone(); } catch (_) {} }
        quiz.innerHTML = '';
        var win = document.createElement('div');
        win.className = 'se-win';
        var h2 = document.createElement('h2');
        h2.textContent = t('seasons.win') + ' 🌻';
        var again = document.createElement('button');
        again.className = 'btn';
        again.textContent = t('ui.playAgain');
        again.addEventListener('click', function () { buildQuiz(); });
        win.appendChild(h2);
        win.appendChild(again);
        quiz.appendChild(win);
        speak(t('seasons.win'));
      }

      showRound();
    }

    // default to the first season tab
    if (tabBtns.length) selectTab(tabBtns[0], function () { buildSeason(SEASONS[0]); });
  }

  APP.screens = APP.screens || {};
  APP.screens.seasons = { render: render };
})(window.APP);

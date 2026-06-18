window.APP = window.APP || {};
(function (APP) {

  // ── Emoji sets ──────────────────────────────────────────────────────────────

  var EMOJI_SETS = {
    animals: ['🐶','🐱','🐭','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐸','🐵','🐔','🐧','🦆'],
    fruit:   ['🍎','🍊','🍋','🍇','🍓','🍉','🍑','🍒','🫐','🍌','🍍','🥭','🍈','🥝','🥥'],
    shapes:  ['⭕','🔷','🔶','⭐','💠','🔺','🔹','🔸','🟡','🟢','🟣','🔵','🟠','🟤','⬛']
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }

  function buildDeck(pairs, theme) {
    var pool = EMOJI_SETS[theme] || EMOJI_SETS.animals;
    var picked = pool.slice(0, pairs);
    var cards = picked.concat(picked).map(function (emoji, idx) {
      return { id: idx, emoji: emoji, matched: false, flipped: false };
    });
    return shuffle(cards);
  }

  function starsForMoves(moves, pairs) {
    if (moves <= pairs * 1.5) return 3;
    if (moves <= pairs * 2.5) return 2;
    return 1;
  }

  // ── Styles ──────────────────────────────────────────────────────────────────

  function injectStyles() {
    if (document.getElementById('memory-css')) return;
    var s = document.createElement('style');
    s.id = 'memory-css';
    s.textContent = [
      '.mem-screen { flex:1; display:flex; flex-direction:column; min-height:0; }',
      '.mem-body { flex:1; display:flex; flex-direction:column; align-items:center; gap:12px; padding:12px; overflow-y:auto; }',
      '.mem-info { font-size:1rem; font-weight:600; color:#555; }',
      '.mem-turnbar { display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }',
      '.mem-pchip { font-size:0.95rem; font-weight:700; padding:6px 12px; border-radius:14px; background:#eee; color:#777; border:2px solid transparent; transition:all 0.2s; }',
      '.mem-pchip.active.p1 { color:#3b34c9; background:#efeefc; border-color:#6c63ff; box-shadow:0 2px 8px rgba(108,99,255,0.3); transform:scale(1.06); }',
      '.mem-pchip.active.p2 { color:#b23b3b; background:#fcefef; border-color:#e06666; box-shadow:0 2px 8px rgba(224,102,102,0.3); transform:scale(1.06); }',
      '.mem-grid { display:grid; gap:8px; width:100%; max-width:480px; }',
      '.mem-grid-6  { grid-template-columns:repeat(4,1fr); }',
      '.mem-grid-8  { grid-template-columns:repeat(4,1fr); }',
      '.mem-grid-12 { grid-template-columns:repeat(6,1fr); }',
      '.memory-card { aspect-ratio:1; perspective:600px; cursor:pointer; -webkit-tap-highlight-color:transparent; }',
      '.memory-card-inner { width:100%; height:100%; position:relative; transform-style:preserve-3d; transition:transform 0.35s; border-radius:10px; }',
      '.memory-card.flipped .memory-card-inner,',
      '.memory-card.matched .memory-card-inner { transform:rotateY(180deg); }',
      '.memory-card-front,',
      '.memory-card-back { position:absolute; inset:0; border-radius:10px; display:flex; align-items:center; justify-content:center; backface-visibility:hidden; -webkit-backface-visibility:hidden; }',
      '.memory-card-front { background:#6c63ff; font-size:2.2rem; color:#fff; font-weight:700; border:3px solid rgba(255,255,255,0.3); }',
      '.memory-card-back { background:#fff; border:3px solid #ddd; font-size:clamp(2rem,9vw,3.4rem); transform:rotateY(180deg); }',
      '.memory-card.matched .memory-card-back { background:#e8f5e9; border-color:#81c784; }',
      '@keyframes matchBounce{0%{transform:scale(1)}25%{transform:scale(1.18) rotate(6deg)}55%{transform:scale(1.08) rotate(-3deg)}80%{transform:scale(1.03)}100%{transform:scale(1)}}',
      '.memory-card.matched{animation:matchBounce 0.83s ease-out;}',
      '@keyframes matchGlow{0%{box-shadow:0 0 0 0 rgba(255,215,0,0)}35%{box-shadow:0 0 0 14px rgba(255,215,0,0.6)}100%{box-shadow:0 0 0 0 rgba(255,215,0,0)}}',
      '.memory-card.matched .memory-card-inner{animation:matchGlow 0.83s ease-out;}',
      '@keyframes starPop{0%{transform:translate(var(--sx),var(--sy)) scale(0);opacity:1}70%{opacity:1}100%{transform:translate(calc(var(--sx)*3.5),calc(var(--sy)*3.5)) scale(0.4);opacity:0}}',
      '.mem-star{position:absolute;pointer-events:none;font-size:2rem;z-index:50;animation:starPop 0.9s ease-out forwards;}',
      '@keyframes emojiWiggle{0%{transform:scale(1)}20%{transform:scale(1.45) rotate(-15deg)}40%{transform:scale(1.3) rotate(12deg)}60%{transform:scale(1.12) rotate(-6deg)}80%{transform:scale(1.05) rotate(3deg)}100%{transform:scale(1)}}',
      '.memory-card.matched .memory-card-back span{display:block;animation:emojiWiggle 0.83s 0.35s ease-out both;}',
      '.mem-result { display:flex; flex-direction:column; align-items:center; gap:12px; padding:24px; }',
      '.mem-stars { font-size:2.5rem; letter-spacing:4px; }',
      '.mem-result-msg { font-size:1.4rem; font-weight:700; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Star burst helper ────────────────────────────────────────────────────────
  function spawnStars(anchor, count) {
    var angles = [], step = (Math.PI * 2) / count;
    for (var i = 0; i < count; i++) angles.push(i * step + Math.random() * 0.4);
    angles.forEach(function (a) {
      var star = document.createElement('span');
      star.className = 'mem-star';
      star.textContent = ['⭐','✨','💫'][Math.floor(Math.random() * 3)];
      var r = 40 + Math.random() * 25;
      star.style.setProperty('--sx', Math.round(Math.cos(a) * r) + 'px');
      star.style.setProperty('--sy', Math.round(Math.sin(a) * r) + 'px');
      star.style.left = '50%';
      star.style.top  = '50%';
      star.style.marginLeft = '-0.55rem';
      star.style.marginTop  = '-0.55rem';
      anchor.appendChild(star);
      star.addEventListener('animationend', function () {
        if (star.parentNode) star.parentNode.removeChild(star);
      }, { once: true });
    });
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  function render(root, ctx) {
    injectStyles();

    var T = APP.t || function (k) { return k; };
    var settings = (APP.settings && APP.settings.game)
      ? APP.settings.game('memory', { pairs: 8, theme: 'animals', mode: 'solo' })
      : { pairs: 8, theme: 'animals', mode: 'solo' };
    // Coerce pairs to number in case it came from localStorage as string
    settings.pairs = parseInt(settings.pairs, 10) || 8;
    if (settings.mode !== '2player') settings.mode = 'solo';

    var deck = buildDeck(settings.pairs, settings.theme);
    var flippedIdx = []; // indices into deck of currently face-up (unmatched) cards
    var moves = 0;
    var matchedCount = 0;
    var locked = false;
    var gameOver = false;
    var playerTurn = 0;        // 0 = Player 1, 1 = Player 2 (2-player mode only)
    var playerScores = [0, 0]; // pairs matched per player (2-player mode only)

    function saveSettings(patch) {
      if (APP.settings && APP.settings.updateGame) {
        APP.settings.updateGame('memory', patch, { pairs: 8, theme: 'animals', mode: 'solo' });
      }
    }

    function doRender() {
      root.innerHTML = '';
      var twoPlayer = settings.mode === '2player';
      var screen = document.createElement('div');
      screen.className = 'mem-screen';

      // ── Topbar ──────────────────────────────────────────────────────────────
      var topbar = APP.ui.topbar({
        ctx: ctx,
        title: T('game.memory.title') || 'Memory Pairs',
        home: true,
        back: true,
        onRestart: function () { startNew(); },
        settings: {
          gameId: 'memory',
          title: T('ui.settings') || 'Settings',
          schema: [
            {
              key: 'mode',
              label: T('game.memory.mode') || 'Players',
              type: 'segmented',
              options: [
                { value: 'solo',    label: T('game.memory.modeSolo') || '1 Player'  },
                { value: '2player', label: T('game.memory.modeTwo')  || '2 Players' }
              ]
            },
            {
              key: 'pairs',
              label: T('game.memory.pairs') || 'Number of pairs',
              type: 'segmented',
              options: [
                { value: 6,  label: '6' },
                { value: 8,  label: '8' },
                { value: 12, label: '12' }
              ]
            },
            {
              key: 'theme',
              label: T('game.memory.theme') || 'Theme',
              type: 'segmented',
              options: [
                { value: 'animals', label: T('game.memory.themeAnimals') || 'Animals' },
                { value: 'fruit',   label: T('game.memory.themeFruit')   || 'Fruit' },
                { value: 'shapes',  label: T('game.memory.themeShapes')  || 'Shapes' }
              ]
            }
          ],
          onChange: function (key, val, all) {
            all.pairs = parseInt(all.pairs, 10) || 8;
            if (all.mode !== '2player') all.mode = 'solo';
            settings = all;
            saveSettings(all);
            startNew();
          }
        }
      });
      screen.appendChild(topbar);

      var body = document.createElement('div');
      body.className = 'mem-body';

      if (gameOver) {
        var resultDiv = document.createElement('div');
        resultDiv.className = 'mem-result';

        if (twoPlayer) {
          var p1 = playerScores[0], p2 = playerScores[1];
          var faceEl = document.createElement('div');
          faceEl.className = 'mem-stars';
          var winMsg;
          if (p1 === p2) {
            faceEl.textContent = '🤝';
            winMsg = T('game.memory.tie') || "It's a tie!";
          } else {
            var w = p1 > p2 ? 1 : 2;
            faceEl.textContent = w === 1 ? '🔵' : '🔴';
            winMsg = (T('game.memory.winner') || 'Player {n} wins!').replace('{n}', w);
          }
          resultDiv.appendChild(faceEl);

          var msgEl = document.createElement('div');
          msgEl.className = 'mem-result-msg';
          msgEl.textContent = winMsg;
          resultDiv.appendChild(msgEl);

          var scoreEl = document.createElement('div');
          scoreEl.className = 'mem-info';
          scoreEl.textContent = '🔵 ' + p1 + '  —  ' + p2 + ' 🔴';
          resultDiv.appendChild(scoreEl);
        } else {
          var stars = starsForMoves(moves, settings.pairs);
          var starStr = '';
          for (var si = 0; si < stars; si++) starStr += '⭐';
          for (var sj = stars; sj < 3; sj++) starStr += '☆';

          var starsEl = document.createElement('div');
          starsEl.className = 'mem-stars';
          starsEl.textContent = starStr;
          resultDiv.appendChild(starsEl);

          var msgEl = document.createElement('div');
          msgEl.className = 'mem-result-msg';
          msgEl.textContent = T('game.memory.win') || 'All matched!';
          resultDiv.appendChild(msgEl);

          var movesEl = document.createElement('div');
          movesEl.className = 'mem-info';
          movesEl.textContent = (T('game.memory.moves') || 'Moves') + ': ' + moves;
          resultDiv.appendChild(movesEl);
        }

        var againBtn = document.createElement('button');
        againBtn.className = 'btn';
        againBtn.textContent = T('ui.playAgain') || 'Play again';
        againBtn.addEventListener('click', function () { startNew(); });
        resultDiv.appendChild(againBtn);

        var greatJobBtn = document.createElement('button');
        greatJobBtn.className = 'btn success';
        greatJobBtn.textContent = T('complete.greatJob') || 'Great Job! 🎉';
        greatJobBtn.addEventListener('click', function () {
          if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
          if (APP.launchConfetti) APP.launchConfetti({ count: 120, duration: 3500 });
        });
        resultDiv.appendChild(greatJobBtn);

        body.appendChild(resultDiv);
      } else {
        var infoEl = document.createElement('div');
        infoEl.className = 'mem-info';
        body.appendChild(infoEl);
        function updateInfo() {
          if (twoPlayer) {
            infoEl.className = 'mem-turnbar';
            infoEl.innerHTML = '';
            [0, 1].forEach(function (pi) {
              var chip = document.createElement('span');
              chip.className = 'mem-pchip' + (pi === 0 ? ' p1' : ' p2') + (playerTurn === pi ? ' active' : '');
              var who = pi === 0
                ? (T('game.memory.player1') || 'Player 1')
                : (T('game.memory.player2') || 'Player 2');
              chip.textContent = (pi === 0 ? '🔵 ' : '🔴 ') + who + ': ' + playerScores[pi];
              infoEl.appendChild(chip);
            });
          } else {
            infoEl.className = 'mem-info';
            infoEl.textContent = (T('game.memory.moves') || 'Moves') + ': ' + moves;
          }
        }
        updateInfo();

        // Responsive column count: portrait gets fewer columns (taller grid),
        // landscape gets more columns (wider grid). Even layouts per pair count.
        var layout = { 6: { p: 3, l: 6 }, 8: { p: 4, l: 8 }, 12: { p: 4, l: 6 } };
        var lo = layout[settings.pairs] || { p: 4, l: 6 };
        var cols = (window.innerHeight >= window.innerWidth) ? lo.p : lo.l;
        var gridEl = document.createElement('div');
        gridEl.className = 'mem-grid';
        gridEl.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
        gridEl.style.maxWidth = 'min(95vw, ' + (cols * 108) + 'px)';
        body.appendChild(gridEl);

        deck.forEach(function (card, idx) {
          var cardEl = document.createElement('div');
          cardEl.className = 'memory-card' +
            (card.flipped || card.matched ? ' flipped' : '') +
            (card.matched ? ' matched' : '');

          var inner = document.createElement('div');
          inner.className = 'memory-card-inner';

          var front = document.createElement('div');
          front.className = 'memory-card-front';
          front.textContent = '?';

          var back = document.createElement('div');
          back.className = 'memory-card-back';
          var emojiSpan = document.createElement('span');
          emojiSpan.textContent = card.emoji;
          back.appendChild(emojiSpan);

          inner.appendChild(front);
          inner.appendChild(back);
          cardEl.appendChild(inner);

          cardEl.addEventListener('click', function () {
            if (locked || card.matched || card.flipped) return;
            if (APP.audio && APP.audio.sfx) APP.audio.sfx.click();
            card.flipped = true;
            cardEl.classList.add('flipped');
            flippedIdx.push(idx);

            if (flippedIdx.length === 2) {
              moves++;
              var fi = flippedIdx[0], si = flippedIdx[1];
              flippedIdx = [];
              locked = true;

              if (deck[fi].emoji === deck[si].emoji) {
                // Match — in 2-player the current player scores and keeps their turn
                deck[fi].matched = true;
                deck[si].matched = true;
                matchedCount++;
                if (twoPlayer) playerScores[playerTurn]++;
                locked = false;
                if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
                updateInfo();
                // Mark matched visually + mini-win burst
                var cards = gridEl.querySelectorAll('.memory-card');
                [cards[fi], cards[si]].forEach(function (c) {
                  c.classList.add('matched');
                  spawnStars(c, 5);
                });
                if (matchedCount === settings.pairs) {
                  gameOver = true;
                  if (APP.progress) APP.progress.recordWin('memory', { stars: twoPlayer ? 3 : starsForMoves(moves, settings.pairs) });
                  setTimeout(function () {
                    if (APP.launchConfetti) APP.launchConfetti({ count: 120, duration: 3500 });
                    if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
                    doRender();
                  }, 600);
                }
              } else {
                // No match — in 2-player the turn passes to the other player
                if (APP.audio && APP.audio.sfx) APP.audio.sfx.wrong();
                updateInfo();
                setTimeout(function () {
                  deck[fi].flipped = false;
                  deck[si].flipped = false;
                  locked = false;
                  if (twoPlayer) { playerTurn = 1 - playerTurn; updateInfo(); }
                  var cards = gridEl.querySelectorAll('.memory-card');
                  cards[fi].classList.remove('flipped');
                  cards[si].classList.remove('flipped');
                }, 800);
              }
            }
          });

          gridEl.appendChild(cardEl);
        });
      }

      screen.appendChild(body);
      root.appendChild(screen);
      if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('memory');
    }

    function startNew() {
      deck = buildDeck(settings.pairs, settings.theme);
      flippedIdx = [];
      moves = 0;
      matchedCount = 0;
      locked = false;
      gameOver = false;
      playerTurn = 0;
      playerScores = [0, 0];
      doRender();
    }

    doRender();
  }

  // ── Exports ─────────────────────────────────────────────────────────────────
  APP.screens = APP.screens || {};
  APP.screens.memory = { render: render };

})(window.APP);

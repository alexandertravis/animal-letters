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
      '.memory-card-front { background:#6c63ff; font-size:1.4rem; color:#fff; font-weight:700; border:3px solid rgba(255,255,255,0.3); }',
      '.memory-card-back { background:#fff; border:3px solid #ddd; font-size:1.6rem; transform:rotateY(180deg); }',
      '.memory-card.matched .memory-card-back { background:#e8f5e9; border-color:#81c784; }',
      '.mem-result { display:flex; flex-direction:column; align-items:center; gap:12px; padding:24px; }',
      '.mem-stars { font-size:2.5rem; letter-spacing:4px; }',
      '.mem-result-msg { font-size:1.4rem; font-weight:700; }',
    ].join('\n');
    document.head.appendChild(s);
  }

  // ── Render ──────────────────────────────────────────────────────────────────

  function render(root, ctx) {
    injectStyles();

    var T = APP.t || function (k) { return k; };
    var settings = (APP.settings && APP.settings.game)
      ? APP.settings.game('memory', { pairs: 8, theme: 'animals' })
      : { pairs: 8, theme: 'animals' };
    // Coerce pairs to number in case it came from localStorage as string
    settings.pairs = parseInt(settings.pairs, 10) || 8;

    var deck = buildDeck(settings.pairs, settings.theme);
    var flippedIdx = []; // indices into deck of currently face-up (unmatched) cards
    var moves = 0;
    var matchedCount = 0;
    var locked = false;
    var gameOver = false;

    function saveSettings(patch) {
      if (APP.settings && APP.settings.updateGame) {
        APP.settings.updateGame('memory', patch, { pairs: 8, theme: 'animals' });
      }
    }

    function doRender() {
      root.innerHTML = '';
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
        var stars = starsForMoves(moves, settings.pairs);
        var starStr = '';
        for (var si = 0; si < stars; si++) starStr += '⭐';
        for (var sj = stars; sj < 3; sj++) starStr += '☆';

        var resultDiv = document.createElement('div');
        resultDiv.className = 'mem-result';

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

        var againBtn = document.createElement('button');
        againBtn.className = 'btn';
        againBtn.textContent = T('ui.playAgain') || 'Play again';
        againBtn.addEventListener('click', function () { startNew(); });
        resultDiv.appendChild(againBtn);

        body.appendChild(resultDiv);
      } else {
        var infoEl = document.createElement('div');
        infoEl.className = 'mem-info';
        infoEl.textContent = (T('game.memory.moves') || 'Moves') + ': ' + moves;
        body.appendChild(infoEl);

        var gridEl = document.createElement('div');
        gridEl.className = 'mem-grid mem-grid-' + settings.pairs;
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
          back.textContent = card.emoji;

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
                // Match
                deck[fi].matched = true;
                deck[si].matched = true;
                matchedCount++;
                locked = false;
                if (APP.audio && APP.audio.sfx) APP.audio.sfx.pop();
                // Update move count display
                infoEl.textContent = (T('game.memory.moves') || 'Moves') + ': ' + moves;
                // Mark matched visually
                gridEl.querySelectorAll('.memory-card')[fi].classList.add('matched');
                gridEl.querySelectorAll('.memory-card')[si].classList.add('matched');
                if (matchedCount === settings.pairs) {
                  gameOver = true;
                  setTimeout(function () { doRender(); }, 600);
                }
              } else {
                // No match
                if (APP.audio && APP.audio.sfx) APP.audio.sfx.wrong();
                infoEl.textContent = (T('game.memory.moves') || 'Moves') + ': ' + moves;
                setTimeout(function () {
                  deck[fi].flipped = false;
                  deck[si].flipped = false;
                  locked = false;
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
    }

    function startNew() {
      deck = buildDeck(settings.pairs, settings.theme);
      flippedIdx = [];
      moves = 0;
      matchedCount = 0;
      locked = false;
      gameOver = false;
      doRender();
    }

    doRender();
  }

  // ── Exports ─────────────────────────────────────────────────────────────────
  APP.screens = APP.screens || {};
  APP.screens.memory = { render: render };

})(window.APP);

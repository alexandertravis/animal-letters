window.APP = window.APP || {};

(function (APP) {

  function getCharList() {
    // Base A–Z
    const chars = [];
    for (let i = 0; i < 26; i++) chars.push(String.fromCharCode(65 + i));
    // Add locale-specific accented chars from animal names (mirrors letters.js logic)
    const baseSet = new Set(chars);
    const list = (APP.animals && APP.animals.eligibleAll()) || APP.ANIMALS || [];
    list.forEach(function (animal) {
      animal.name.split('').forEach(function (ch) {
        const upper = ch.toUpperCase();
        if (!baseSet.has(upper) && APP.getLetter && APP.getLetter(upper)) {
          chars.push(upper);
          baseSet.add(upper);
        }
      });
    });
    return chars;
  }

  // One entry per game recorded by APP.progress; art/labels mirror data/locations.js.
  const GAMES = [
    { id: 'letters',    labelKey: 'school.trace',         art: '✏️' },
    { id: 'findletter', labelKey: 'school.find',          art: '🔍' },
    { id: 'puzzles',    labelKey: 'puzzles.title',        art: '🧩' },
    { id: 'dots',       labelKey: 'dots.title',           art: '🔵' },
    { id: 'tictactoe',  labelKey: 'game.tictactoe.title', art: '❌' },
    { id: 'memory',     labelKey: 'game.memory.title',    art: '🃏' },
    { id: 'maze',       labelKey: 'game.maze.title',      art: '🌀' },
    { id: 'shapes',     labelKey: 'game.shapes.title',    art: '🔷' },
    { id: 'colours',    labelKey: 'game.colours.title',   art: '🌈' },
    { id: 'washing',    labelKey: 'game.washing.title',   art: '🫧' },
    { id: 'music',      labelKey: 'game.music.title',     art: '🎵' },
    { id: 'recipes',    labelKey: 'recipes.title',        art: '🍳' },
    { id: 'painting',   labelKey: 'painting.title',       art: '🎨' }
  ];

  function buildGamesSection() {
    const frag = document.createDocumentFragment();

    const heading = document.createElement('h2');
    heading.className = 'progress-section-title';
    heading.textContent = APP.t ? APP.t('screens.progress.games') : 'Games';
    frag.appendChild(heading);

    const gamesGrid = document.createElement('div');
    gamesGrid.className = 'progress-games';

    GAMES.forEach(function (g) {
      const rec = APP.progress ? APP.progress.get(g.id) : { plays: 0, bestStars: 0 };
      const tile = document.createElement('div');
      tile.className = 'progress-game' + (rec.plays > 0 ? '' : ' is-unplayed');

      const art = document.createElement('div');
      art.className = 'progress-game-art';
      art.textContent = g.art;
      tile.appendChild(art);

      const name = document.createElement('div');
      name.className = 'progress-game-name';
      name.textContent = APP.t ? APP.t(g.labelKey) : g.id;
      tile.appendChild(name);

      const starRow = document.createElement('div');
      starRow.className = 'star-row';
      starRow.innerHTML = APP.starsHtml ? APP.starsHtml(rec.bestStars) : '';
      tile.appendChild(starRow);

      if (rec.plays > 0) {
        const badge = document.createElement('div');
        badge.className = 'progress-badge';
        badge.textContent = rec.plays;
        tile.appendChild(badge);
      }

      gamesGrid.appendChild(tile);
    });

    frag.appendChild(gamesGrid);
    return frag;
  }

  function render(root, ctx) {
    root.innerHTML = '';
    const wrap = document.createElement('div');
    wrap.className = 'progress-screen';

    // Top bar
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t ? APP.t('screens.progress.title') : 'My Progress',
      home: true,
      back: true
    }));

    // Single scroll container for both sections
    const body = document.createElement('div');
    body.className = 'progress-body';

    // Grid
    const grid = document.createElement('div');
    grid.className = 'progress-grid';

    const chars = getCharList();
    chars.forEach(function (ch) {
      const mastery = APP.state.letterMastery[ch] || { attempts: 0, bestStars: 0 };
      const cell = document.createElement('div');
      cell.className = 'progress-cell';

      // Letter display (large text, styled)
      const letterEl = document.createElement('div');
      letterEl.className = 'progress-letter';
      letterEl.textContent = ch;
      letterEl.style.opacity = mastery.attempts > 0 ? '1' : '0.25';
      cell.appendChild(letterEl);

      // Stars
      const starRow = document.createElement('div');
      starRow.className = 'star-row';
      starRow.textContent = mastery.bestStars > 0
        ? '⭐'.repeat(mastery.bestStars) + '☆'.repeat(3 - mastery.bestStars)
        : '☆☆☆';
      cell.appendChild(starRow);

      // Attempt count badge
      if (mastery.attempts > 0) {
        const badge = document.createElement('div');
        badge.className = 'progress-badge';
        badge.textContent = mastery.attempts;
        cell.appendChild(badge);
      }

      grid.appendChild(cell);
    });

    body.appendChild(grid);
    body.appendChild(buildGamesSection());
    wrap.appendChild(body);
    root.appendChild(wrap);

  }

  APP.screens = APP.screens || {};
  APP.screens.progress = { render };
})(window.APP);

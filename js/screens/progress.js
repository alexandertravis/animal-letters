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

    wrap.appendChild(grid);
    root.appendChild(wrap);

  }

  APP.screens = APP.screens || {};
  APP.screens.progress = { render };
})(window.APP);

window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    // Show the current locale's animals.
    // Found-status is tracked by creature ID (image path), so completing "DOG" in
    // English marks the same creature as found when you switch to Portuguese (CÃO).
    const animalList = APP.animals ? APP.animals.eligibleAll() : (APP.ANIMALS || []);

    const total     = animalList.length;
    // Count only found creatures that are in this locale's list
    const localIds  = new Set(animalList.map(a => APP.animalId(a)));
    const doneCount = [...APP.state.completedAnimals].filter(id => localIds.has(id)).length;

    const wrap = document.createElement('div');
    wrap.className = 'gallery';

    // Header
    const countBadge = document.createElement('span');
    countBadge.className = 'gallery-count';
    countBadge.textContent = doneCount + ' / ' + total;

    const topbar = APP.ui.topbar({
      ctx: ctx,
      title: APP.t('landing.myAnimals'),
      home: true,
      back: true,
      right: [countBadge]
    });
    wrap.appendChild(topbar);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    animalList.forEach(function (animal) {
      const done   = APP.state.completedAnimals.has(APP.animalId(animal));
      const imgSrc = animal.images.cartoon;

      const tile = document.createElement('div');
      tile.className = 'gallery-tile ' + (done ? 'unlocked' : 'locked');

      // Name row — full name when done, spaced underscores when locked
      const nameEl = document.createElement('div');
      nameEl.className = 'gallery-tile-name';
      if (done) {
        nameEl.textContent = animal.displayName;
      } else {
        // No space separator — CSS letter-spacing provides the gap.
        // Scale font-size so all underscores fit on one row.
        nameEl.textContent = Array(animal.name.length).fill('_').join('');
        nameEl.style.whiteSpace = 'nowrap';
        const n = animal.name.length;
        nameEl.style.fontSize = (n <= 6 ? 1.2 : n <= 8 ? 1.0 : n <= 10 ? 0.85 : 0.72) + 'rem';
      }

      tile.appendChild(nameEl);

      if (done) {
        // Stars row — sits in flex flow immediately below the name
        const starsRow = document.createElement('div');
        starsRow.className = 'gallery-stars-row';
        starsRow.innerHTML = APP.starsHtml ? APP.starsHtml(APP.animalStars(animal), 3) : '';
        tile.appendChild(starsRow);

        // Full image centred in remaining space
        const imgWrap = document.createElement('div');
        imgWrap.className = 'gallery-tile-full';

        const img = new Image();
        img.alt = animal.displayName;

        const fallback = document.createElement('div');
        fallback.className = 'gallery-fallback';
        fallback.textContent = animal.displayName[0].toUpperCase();
        fallback.style.display = 'none';

        img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
        img.src = imgSrc;

        imgWrap.appendChild(img);
        imgWrap.appendChild(fallback);
        tile.appendChild(imgWrap);

      } else {
        // Spacer pushes the peek strip to the bottom
        const spacer = document.createElement('div');
        spacer.className = 'gallery-tile-spacer';
        tile.appendChild(spacer);

        // Peek strip — shows just the top portion of the image
        const peek = document.createElement('div');
        peek.className = 'gallery-tile-peek';

        const img = new Image();
        img.alt = '';
        img.src = imgSrc;
        // If image fails to load the peek is just empty — that's fine

        peek.appendChild(img);
        tile.appendChild(peek);
      }

      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.gallery = { render };
})(window.APP);

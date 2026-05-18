window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    // Build a deduplicated list of all unique animals across every language list,
    // preferring the current locale's entry for display names and images.
    // This means the gallery always shows every creature regardless of language,
    // and found status is shared — completing "DOG" marks "CÃO" as found too.
    const currentList = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
    const allLists    = [APP.ANIMALS || [], APP.ANIMALS_PT || []];
    const byId        = new Map();
    // Seed with all known animals (any locale), then override with current locale
    // so the display name and image match what the child is currently playing in.
    allLists.forEach(list => list.forEach(a => {
      if (!byId.has(APP.animalId(a))) byId.set(APP.animalId(a), a);
    }));
    currentList.forEach(a => byId.set(APP.animalId(a), a));
    const animalList = [...byId.values()];

    const total     = animalList.length;
    const doneCount = [...APP.state.completedAnimals]
      .filter(id => byId.has(id)).length;

    const wrap = document.createElement('div');
    wrap.className = 'gallery';

    // Header
    const header = document.createElement('div');
    header.className = 'gallery-header';
    header.innerHTML = `
      <button class="btn icon ghost" aria-label="Back">${APP.ICONS.back}</button>
      <h2>${APP.t('landing.myAnimals')}</h2>
      <span class="gallery-count">${doneCount}&thinsp;/&thinsp;${total}</span>
    `;
    header.querySelector('button').addEventListener('click', () => {
      const prev = APP.state.previousScreen;
      ctx.go(prev && prev !== 'gallery' ? prev : 'landing');
    });
    wrap.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    animalList.forEach(animal => {
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

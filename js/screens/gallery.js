window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    const total     = APP.ANIMALS.length;
    const doneCount = APP.state.completedAnimals.size;

    const wrap = document.createElement('div');
    wrap.className = 'gallery';

    // Header
    const header = document.createElement('div');
    header.className = 'gallery-header';
    header.innerHTML = `
      <button class="btn icon ghost" aria-label="Back">&#8592;</button>
      <h2>My Animals</h2>
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

    APP.ANIMALS.forEach(animal => {
      const done   = APP.state.completedAnimals.has(animal.name);
      const imgSrc = animal.images.cartoon;

      const tile = document.createElement('div');
      tile.className = 'gallery-tile ' + (done ? 'unlocked' : 'locked');

      // Name row — full name when done, spaced underscores when locked
      const nameEl = document.createElement('div');
      nameEl.className = 'gallery-tile-name';
      nameEl.textContent = done
        ? animal.displayName
        : Array(animal.name.length).fill('_').join(' ');

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

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
    header.querySelector('button').addEventListener('click', () => ctx.go('landing'));
    wrap.appendChild(header);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    APP.ANIMALS.forEach(animal => {
      const done   = APP.state.completedAnimals.has(animal.name);
      const imgSrc = animal.images.cartoon; // always cartoon in the gallery

      const tile = document.createElement('div');
      tile.className = 'gallery-tile' + (done ? ' unlocked' : ' locked');
      tile.setAttribute('aria-label', done ? animal.displayName : 'Locked');

      // Image box
      const imgBox = document.createElement('div');
      imgBox.className = 'gallery-img';

      const img = new Image();
      img.alt = animal.displayName;
      img.onerror = () => {
        img.style.display = 'none';
        fallback.style.display = 'flex';
      };
      img.src = imgSrc;

      const fallback = document.createElement('div');
      fallback.className = 'gallery-fallback';
      fallback.style.display = 'none';
      fallback.textContent = animal.displayName[0].toUpperCase();

      imgBox.appendChild(img);
      imgBox.appendChild(fallback);

      if (!done) {
        const overlay = document.createElement('div');
        overlay.className = 'gallery-overlay';
        overlay.innerHTML = '&#128274;'; // lock emoji
        imgBox.appendChild(overlay);
      }

      // Name label
      const nameEl = document.createElement('div');
      nameEl.className = 'gallery-name';
      nameEl.textContent = done ? animal.displayName : '???';

      tile.appendChild(imgBox);
      tile.appendChild(nameEl);
      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.gallery = { render };
})(window.APP);

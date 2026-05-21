window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    const stories  = APP.STORIES || [];
    const unlocked = stories.filter(APP.isStoryUnlocked);
    const locked   = stories.filter(s => !APP.isStoryUnlocked(s));

    const wrap = document.createElement('div');
    wrap.className = 'library';

    // ── Topbar ──────────────────────────────────────────────────────────────
    const topbar = document.createElement('div');
    topbar.className = 'topbar';
    topbar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" id="lib-back" aria-label="Back">${APP.ICONS.back}</button>
      </div>
      <h2>${APP.t('library.title')}</h2>
      <div style="width:44px"></div>
    `;
    topbar.querySelector('#lib-back').addEventListener('click', () => ctx.go('landing'));
    wrap.appendChild(topbar);

    // ── Scrollable body ──────────────────────────────────────────────────────
    const body = document.createElement('div');
    body.className = 'library-body';

    // ── Section 1: Achievements ──────────────────────────────────────────────
    const achTitle = document.createElement('div');
    achTitle.className = 'library-section-title';
    achTitle.textContent = APP.t('library.achievements');
    body.appendChild(achTitle);

    if (unlocked.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'achievement-empty';
      empty.textContent = APP.t('library.noAchievements');
      body.appendChild(empty);
    } else {
      const list = document.createElement('div');
      list.className = 'achievement-list';
      unlocked.forEach(story => {
        const chip = document.createElement('div');
        chip.className = 'achievement-chip';
        chip.style.background = story.color;
        // Ensure readable contrast — use dark ink on light colours, white on dark
        chip.style.color = '#001858';
        chip.textContent = '✓ ' + story.title;
        list.appendChild(chip);
      });
      body.appendChild(list);
    }

    // ── Section 2: Books grid ────────────────────────────────────────────────
    const bookTitle = document.createElement('div');
    bookTitle.className = 'library-section-title';
    bookTitle.textContent = APP.t('library.books');
    body.appendChild(bookTitle);

    const grid = document.createElement('div');
    grid.className = 'books-grid';

    // Unlocked books first, then locked
    [...unlocked, ...locked].forEach(story => {
      const isUnlocked = APP.isStoryUnlocked(story);
      const tile = document.createElement('div');
      tile.className = 'book-tile' + (isUnlocked ? '' : ' locked');

      if (isUnlocked) {
        tile.style.background = story.color;
        // Cover: primary animal's cartoon SVG
        const cover = document.createElement('img');
        cover.className = 'book-tile-cover';
        cover.src = 'assets/images/cartoon/' + story.requirements[0].animalId + '.svg';
        cover.alt = story.title;
        tile.appendChild(cover);
      } else {
        // Locked: show lock emoji
        const icon = document.createElement('div');
        icon.className = 'book-tile-icon';
        icon.textContent = '🔒';
        tile.appendChild(icon);
      }

      const titleEl = document.createElement('div');
      titleEl.className = 'book-tile-title';
      titleEl.textContent = story.title;
      tile.appendChild(titleEl);

      if (isUnlocked) {
        // "Read" label — visual only, the whole tile is the click target
        const readLabel = document.createElement('span');
        readLabel.className = 'book-tile-read-label';
        readLabel.textContent = APP.t('library.read');
        tile.appendChild(readLabel);

        // Fade library out, then navigate so the reader appears smoothly
        tile.addEventListener('click', () => {
          APP.state.currentStory = story;
          APP.state.currentPage  = 0;
          wrap.style.transition = 'opacity 0.3s ease';
          wrap.style.opacity    = '0';
          setTimeout(() => ctx.go('storyreader'), 320);
        });
      } else {
        // Show requirement hints so child knows what to do
        const hints = story.requirements.map(r => r.label).join('\n');
        const hintEl = document.createElement('div');
        hintEl.className = 'book-tile-hint';
        hintEl.textContent = hints;
        tile.appendChild(hintEl);
      }

      grid.appendChild(tile);
    });

    body.appendChild(grid);
    wrap.appendChild(body);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.library = { render };
})(window.APP);

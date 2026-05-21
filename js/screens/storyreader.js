window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    const story = APP.state.currentStory;
    if (!story) { ctx.go('library'); return; }
    if (!story.pages || story.pages.length === 0) { ctx.go('library'); return; }

    // ── Build spread list ────────────────────────────────────────────────────
    // Spread 0: title page  (left = cover colour, right = title + cover image)
    // Spreads 1..N: story pages  (left = text, right = image)
    // Spread N+1: outro  (left = "The End", right = cover colour)
    const coverImg = 'assets/images/cartoon/' + story.requirements[0].animalId + '.svg';
    const spreads = [
      {
        leftType: 'color',  leftContent: story.color,
        rightType: 'title', rightContent: { title: story.title, image: coverImg }
      },
      ...story.pages.map(function (p) {
        return {
          leftType:  'text',  leftContent: p.text,
          rightType: 'image', rightContent: p.image
        };
      }),
      {
        leftType: 'theend', leftContent: null,
        rightType: 'color', rightContent: story.color
      }
    ];

    let spreadIdx = 0;
    let phase     = 'closed';   // 'closed' | 'opening' | 'open' | 'closing'
    let turning   = false;       // true while a page-turn animation is in flight

    // ── Scene overlay ────────────────────────────────────────────────────────
    const scene = document.createElement('div');
    scene.className = 'reader-scene';

    // ── Floating controls (close + page counter) ─────────────────────────────
    const controls = document.createElement('div');
    controls.className = 'reader-controls';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'btn icon ghost reader-close-btn';
    closeBtn.setAttribute('aria-label', 'Close book');
    closeBtn.textContent = '✕';
    closeBtn.addEventListener('click', function () {
      if (phase !== 'open') return;
      phase = 'closing';
      scene.classList.add('scene-fade-out');
      setTimeout(function () { ctx.go('library'); }, 320);
    });

    const pageCounter = document.createElement('span');
    pageCounter.className = 'reader-page-count';
    pageCounter.style.opacity = '0';   // hidden on title/outro spreads

    controls.appendChild(closeBtn);
    controls.appendChild(pageCounter);
    scene.appendChild(controls);

    // ── Book container ───────────────────────────────────────────────────────
    const bookEl = document.createElement('div');
    bookEl.className = 'book';
    bookEl.dataset.phase = 'closed';

    // ── Closed cover ─────────────────────────────────────────────────────────
    const bookClosed = document.createElement('div');
    bookClosed.className = 'book-closed';
    bookClosed.style.background = story.color;

    const closedImg = document.createElement('img');
    closedImg.className = 'book-closed-img';
    closedImg.src = coverImg;
    closedImg.alt = '';

    const closedTitle = document.createElement('div');
    closedTitle.className = 'book-closed-title';
    closedTitle.textContent = story.title;

    const closedHint = document.createElement('div');
    closedHint.className = 'book-closed-hint';
    closedHint.textContent = 'Tap to open';

    bookClosed.appendChild(closedImg);
    bookClosed.appendChild(closedTitle);
    bookClosed.appendChild(closedHint);
    bookEl.appendChild(bookClosed);

    // ── Open spread ──────────────────────────────────────────────────────────
    const bookSpread = document.createElement('div');
    bookSpread.className = 'book-spread';
    bookSpread.style.display = 'none';

    // Background layer (incoming page during turns)
    const spreadBg = document.createElement('div');
    spreadBg.className = 'spread-bg';
    spreadBg.style.display = 'none';

    const bgLeft  = document.createElement('div');
    bgLeft.className  = 'bg-left  book-page-inner';
    const bgRight = document.createElement('div');
    bgRight.className = 'bg-right book-page-inner';
    spreadBg.appendChild(bgLeft);
    spreadBg.appendChild(bgRight);
    bookSpread.appendChild(spreadBg);

    // Left page
    const leftPage  = document.createElement('div');
    leftPage.className  = 'book-page left';
    const leftInner = document.createElement('div');
    leftInner.className = 'book-page-inner';
    const foldPrev = document.createElement('div');
    foldPrev.className = 'page-fold prev';
    foldPrev.setAttribute('aria-label', 'Previous page');
    leftPage.appendChild(leftInner);
    leftPage.appendChild(foldPrev);
    bookSpread.appendChild(leftPage);

    // Right page
    const rightPage  = document.createElement('div');
    rightPage.className  = 'book-page right';
    const rightInner = document.createElement('div');
    rightInner.className = 'book-page-inner';
    const foldNext = document.createElement('div');
    foldNext.className = 'page-fold next';
    foldNext.setAttribute('aria-label', 'Next page');
    rightPage.appendChild(rightInner);
    rightPage.appendChild(foldNext);
    bookSpread.appendChild(rightPage);

    // Spine
    const spine = document.createElement('div');
    spine.className = 'book-spine';
    bookSpread.appendChild(spine);

    bookEl.appendChild(bookSpread);

    // ── Outer nav arrows ─────────────────────────────────────────────────────
    const navPrev = document.createElement('button');
    navPrev.className = 'book-nav prev';
    navPrev.setAttribute('aria-label', 'Previous page');
    navPrev.innerHTML = '&#9664;';
    navPrev.style.display = 'none';

    const navNext = document.createElement('button');
    navNext.className = 'book-nav next';
    navNext.setAttribute('aria-label', 'Next page');
    navNext.innerHTML = '&#9654;';
    navNext.style.display = 'none';

    bookEl.appendChild(navPrev);
    bookEl.appendChild(navNext);

    scene.appendChild(bookEl);
    root.appendChild(scene);

    // ── Panel rendering helpers ──────────────────────────────────────────────
    function applyLeft(container, spread) {
      container.style.background = '';
      if (spread.leftType === 'color') {
        container.innerHTML = '';
        container.style.background = spread.leftContent;
      } else if (spread.leftType === 'theend') {
        container.innerHTML = '<p class="book-the-end">The End</p>';
      } else {
        container.innerHTML = '<p class="book-text"></p>';
        container.querySelector('.book-text').textContent = spread.leftContent;
      }
    }

    function applyRight(container, spread) {
      container.style.background = '';
      if (spread.rightType === 'color') {
        container.innerHTML = '';
        container.style.background = spread.rightContent;
      } else if (spread.rightType === 'title') {
        var d = spread.rightContent;
        container.innerHTML = '';
        var img = document.createElement('img');
        img.className = 'book-cover-img';
        img.src = d.image;
        img.alt = '';
        var ttl = document.createElement('p');
        ttl.className = 'book-cover-title';
        ttl.textContent = d.title;
        container.appendChild(img);
        container.appendChild(ttl);
      } else {
        container.innerHTML = '';
        var img2 = document.createElement('img');
        img2.className = 'book-img';
        img2.src = spread.rightContent;
        img2.alt = '';
        container.appendChild(img2);
      }
    }

    // ── Counter + nav state ──────────────────────────────────────────────────
    function updateNav() {
      var isTitle  = spreadIdx === 0;
      var isOutro  = spreadIdx === spreads.length - 1;
      var isStory  = !isTitle && !isOutro;
      var storyIdx = spreadIdx - 1;   // 0-based index into story.pages

      // Page counter: only show on story pages
      if (isStory) {
        pageCounter.textContent = 'Page ' + (storyIdx + 1) + ' of ' + story.pages.length;
        pageCounter.style.opacity = '1';
      } else {
        pageCounter.style.opacity = '0';
      }

      // Outer arrows
      navPrev.disabled = isTitle;
      navNext.disabled = isOutro;

      // Corner folds
      foldPrev.style.visibility = isTitle  ? 'hidden' : 'visible';
      foldNext.style.visibility = isOutro  ? 'hidden' : 'visible';
    }

    // ── Apply a spread (no animation) ────────────────────────────────────────
    function showSpread(idx) {
      spreadIdx = idx;
      applyLeft(leftInner,  spreads[idx]);
      applyRight(rightInner, spreads[idx]);
      updateNav();
    }

    // ── Page turn ────────────────────────────────────────────────────────────
    function turnPage(direction) {
      if (turning) return;
      var nextIdx = direction === 'next' ? spreadIdx + 1 : spreadIdx - 1;
      if (nextIdx < 0 || nextIdx >= spreads.length) return;

      turning = true;
      var blockEl = bookSpread;   // use spread as hit-block
      blockEl.style.pointerEvents = 'none';

      var incoming = spreads[nextIdx];

      if (direction === 'next') {
        // Pre-render incoming into bg layer
        applyLeft(bgLeft,   incoming);
        applyRight(bgRight,  incoming);
        spreadBg.style.display = 'flex';

        // Phase A: right panel collapses toward spine
        rightPage.classList.add('collapsing-next');

        setTimeout(function () {
          // Swap left content at midpoint (right is now hidden behind clip)
          applyLeft(leftInner, incoming);
          spreadIdx = nextIdx;
          updateNav();

          // Phase B: left panel grows from spine outward
          leftPage.classList.add('expanding-next');
        }, 300);

        setTimeout(function () {
          // Finalise right panel with incoming content, reset clips
          applyRight(rightInner, incoming);
          rightPage.classList.remove('collapsing-next');
          leftPage.classList.remove('expanding-next');
          spreadBg.style.display = 'none';
          blockEl.style.pointerEvents = '';
          turning = false;
        }, 630);

      } else {
        // PREV: mirror
        applyLeft(bgLeft,   incoming);
        applyRight(bgRight,  incoming);
        spreadBg.style.display = 'flex';

        // Phase A: left panel collapses toward spine
        leftPage.classList.add('collapsing-prev');

        setTimeout(function () {
          applyRight(rightInner, incoming);
          spreadIdx = nextIdx;
          updateNav();

          // Phase B: right panel grows from spine outward
          rightPage.classList.add('expanding-prev');
        }, 300);

        setTimeout(function () {
          applyLeft(leftInner, incoming);
          leftPage.classList.remove('collapsing-prev');
          rightPage.classList.remove('expanding-prev');
          spreadBg.style.display = 'none';
          blockEl.style.pointerEvents = '';
          turning = false;
        }, 630);
      }
    }

    // ── Wire nav controls ────────────────────────────────────────────────────
    foldNext.addEventListener('click', function () { turnPage('next'); });
    foldPrev.addEventListener('click', function () { turnPage('prev'); });
    navNext.addEventListener('click',  function () { turnPage('next'); });
    navPrev.addEventListener('click',  function () { turnPage('prev'); });

    // ── Book open sequence ───────────────────────────────────────────────────
    bookClosed.addEventListener('click', function () {
      if (phase !== 'closed') return;
      phase = 'opening';
      bookEl.dataset.phase = 'opening';

      // Show spread behind the cover immediately
      showSpread(0);
      bookSpread.style.display = 'flex';

      // Swing cover open
      bookClosed.classList.add('cover-open');

      setTimeout(function () {
        bookClosed.style.display = 'none';
        phase = 'open';
        bookEl.dataset.phase = 'open';
        navPrev.style.display = '';
        navNext.style.display = '';
        updateNav();
      }, 420);
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.storyreader = { render };
})(window.APP);

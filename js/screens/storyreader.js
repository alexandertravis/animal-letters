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
      // If the book hasn't been opened yet (or has been collapsed back to cover),
      // skip the animation and return to library immediately.
      if (phase === 'closed' || phase === 'closing-to-cover') {
        ctx.go('library');
        return;
      }
      closeBook();
    });

    const pageCounter = document.createElement('span');
    pageCounter.className = 'reader-page-count';
    pageCounter.style.opacity = '0';   // hidden on title/outro spreads

    controls.appendChild(closeBtn);
    controls.appendChild(pageCounter);
    scene.appendChild(controls);

    // ── Book container ───────────────────────────────────────────────────────
    const bookEl = document.createElement('div');
    bookEl.className = 'book book-closed-state';
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

    bookClosed.appendChild(closedImg);
    bookClosed.appendChild(closedTitle);
    bookEl.appendChild(bookClosed);

    // ── Open spread ──────────────────────────────────────────────────────────
    const bookSpread = document.createElement('div');
    bookSpread.className = 'book-spread';
    bookSpread.style.display = 'none';

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

    // ── Leaf builder (shared by page turns + cover open/close) ───────────────
    var FLIP_MS = 600;   // keep in sync with .page-leaf transition / leafShade

    // side: 'right' (leaf over right half, pivots left) or 'left' (mirror).
    // Returns { leaf, front, back } — front/back are containers ready for
    // applyLeft / applyRight / renderCover.
    function buildLeaf(side) {
      var leaf = document.createElement('div');
      leaf.className = 'page-leaf ' + side;
      var front = document.createElement('div');
      front.className = 'leaf-face front';
      var back = document.createElement('div');
      back.className = 'leaf-face back';
      var shade = document.createElement('div');
      shade.className = 'leaf-shade';
      leaf.appendChild(front);
      leaf.appendChild(back);
      leaf.appendChild(shade);
      return { leaf: leaf, front: front, back: back };
    }

    // Paint the front cover (colour + art + title) into a leaf face.
    function renderCover(face) {
      face.innerHTML = '';
      face.classList.add('cover-face');
      face.style.background = story.color;
      var img = document.createElement('img');
      img.className = 'book-closed-img';
      img.src = coverImg; img.alt = '';
      var ttl = document.createElement('div');
      ttl.className = 'book-closed-title';
      ttl.textContent = story.title;
      face.appendChild(img);
      face.appendChild(ttl);
    }

    // (Spine fade during a flip is handled in CSS via .book-spread.is-flipping
    //  .book-spine → @keyframes spineFlip, tied to the flip duration.)

    // Show the dark scene background through a page (used during cover open/close
    // so no cream page or stale content shows behind the moving cover).
    function blankPage(pageEl, innerEl) {
      innerEl.innerHTML = '';
      innerEl.style.background = '';
      pageEl.classList.add('is-blank');
    }
    function unblankPage(pageEl) { pageEl.classList.remove('is-blank'); }

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

      // On the outro spread the right panel is the back cover → tap to close.
      rightPage.classList.toggle('is-back-cover', isOutro);
    }

    // ── Apply a spread (no animation) ────────────────────────────────────────
    function showSpread(idx) {
      spreadIdx = idx;
      applyLeft(leftInner,  spreads[idx]);
      applyRight(rightInner, spreads[idx]);
      updateNav();
    }

    // ── Page turn (3D leaf flip) ─────────────────────────────────────────────
    function turnPage(direction) {
      if (turning || phase !== 'open') return;
      var nextIdx = direction === 'next' ? spreadIdx + 1 : spreadIdx - 1;
      if (nextIdx < 0 || nextIdx >= spreads.length) return;

      turning = true;
      bookSpread.style.pointerEvents = 'none';
      bookSpread.classList.add('is-flipping');    // hide folds + fade spine

      var current  = spreads[spreadIdx];
      var incoming = spreads[nextIdx];

      if (direction === 'next') {
        // Leaf over the right half: front = current right, back = incoming left.
        var L = buildLeaf('right');
        applyRight(L.front, current);
        applyLeft(L.back,  incoming);
        bookSpread.appendChild(L.leaf);

        // Reveal incoming right under the leaf (hidden behind the front face).
        applyRight(rightInner, incoming);

        void L.leaf.offsetWidth;                  // commit start state
        L.leaf.classList.add('flipping');         // rotateY 0 → -180deg

        setTimeout(function () { spreadIdx = nextIdx; updateNav(); }, FLIP_MS / 2);
        setTimeout(function () {
          applyLeft(leftInner, incoming);         // static left = incoming left
          if (L.leaf.parentNode) L.leaf.parentNode.removeChild(L.leaf);
          bookSpread.classList.remove('is-flipping');
          bookSpread.style.pointerEvents = '';
          turning = false;
        }, FLIP_MS);

      } else {
        // PREV — mirror: leaf over the left half, front = current left,
        // back = incoming right, rotateY 0 → +180deg.
        var Lp = buildLeaf('left');
        applyLeft(Lp.front, current);
        applyRight(Lp.back, incoming);
        bookSpread.appendChild(Lp.leaf);

        applyLeft(leftInner, incoming);           // reveal incoming left under leaf

        void Lp.leaf.offsetWidth;
        Lp.leaf.classList.add('flipping');

        setTimeout(function () { spreadIdx = nextIdx; updateNav(); }, FLIP_MS / 2);
        setTimeout(function () {
          applyRight(rightInner, incoming);       // static right = incoming right
          if (Lp.leaf.parentNode) Lp.leaf.parentNode.removeChild(Lp.leaf);
          bookSpread.classList.remove('is-flipping');
          bookSpread.style.pointerEvents = '';
          turning = false;
        }, FLIP_MS);
      }
    }

    // ── Wire nav controls ────────────────────────────────────────────────────
    foldNext.addEventListener('click', function () { turnPage('next'); });
    foldPrev.addEventListener('click', function () { turnPage('prev'); });
    navNext.addEventListener('click',  function () { turnPage('next'); });
    navPrev.addEventListener('click',  function () { turnPage('prev'); });

    // ── Book open sequence (cover = first leaf) ──────────────────────────────
    bookClosed.addEventListener('click', function () {
      if (phase !== 'closed') return;
      phase = 'opening';
      bookEl.dataset.phase = 'opening';

      // Prepare the spread underneath. Mirror a NEXT turn: reveal only the
      // right page (title) now; leave the left page BLANK so the inside cover
      // isn't shown before the cover swings over it. The left is filled at the
      // end, under the landing leaf.
      spreadIdx = 0;
      applyRight(rightInner, spreads[0]);
      blankPage(leftPage, leftInner);             // left = dark scene until cover lands
      bookSpread.style.display = 'flex';
      bookSpread.classList.add('is-flipping');    // hide folds + fade spine

      // Cover leaf over the right half: front = cover, back = inside-front
      // cover (spread 0 left = story colour). Hide the static closed cover.
      var L = buildLeaf('right');
      L.leaf.classList.add('cover-leaf');         // solid cover: no curl shade
      renderCover(L.front);
      applyLeft(L.back, spreads[0]);
      bookSpread.appendChild(L.leaf);
      // Hide via opacity + pointer-events (not display:none) so the element stays
      // in layout, avoiding a flex reflow on restoration. Also pause the idle-shake
      // animation so it doesn't advance while hidden — we'll reset it on show so the
      // cover always reappears at rotate(0) rather than mid-tilt.
      bookClosed.style.opacity = '0';
      bookClosed.style.pointerEvents = 'none';
      bookClosed.style.animationPlayState = 'paused';

      // Slide the book to its centred 2-page position while the cover flips.
      bookEl.classList.remove('book-closed-state');

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');           // rotateY 0 → -180deg

      setTimeout(function () {
        unblankPage(leftPage);
        applyLeft(leftInner, spreads[0]);          // inside cover, under the leaf
        if (L.leaf.parentNode) L.leaf.parentNode.removeChild(L.leaf);
        bookSpread.classList.remove('is-flipping');
        phase = 'open';
        bookEl.dataset.phase = 'open';
        navPrev.style.display = '';
        navNext.style.display = '';
        updateNav();
      }, FLIP_MS);
    });

    // ── Book close sequence (reverse cover swing) ────────────────────────────
    function closeBook() {
      if (phase !== 'open' || turning) return;
      phase = 'closing';
      bookEl.dataset.phase = 'closing';
      bookSpread.style.pointerEvents = 'none';
      bookSpread.classList.add('is-flipping');    // hide folds + fade spine

      // Clear the spread to the dark scene background so no stale page content
      // shows behind the closing cover.
      blankPage(leftPage, leftInner);
      blankPage(rightPage, rightInner);

      // Cover leaf over the left half: front = the inside-front cover (plain
      // story colour, NOT the last page), back = the outer cover. Rotates
      // 0 → +180deg, landing the closed cover on the right.
      var L = buildLeaf('left');
      L.leaf.classList.add('cover-leaf');         // solid cover: no curl shade
      L.front.style.background = story.color;
      renderCover(L.back);
      bookSpread.appendChild(L.leaf);

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');
      bookEl.classList.add('book-closed-state');  // slide back to single page

      setTimeout(function () { scene.classList.add('scene-fade-out'); }, FLIP_MS - 120);
      setTimeout(function () { ctx.go('library'); }, FLIP_MS + 220);
    }

    // ── Collapse back to closed cover (left page click on title spread) ────────
    // Reverses the open animation: cover swings back over the spread, book
    // returns to single-page closed state. No navigation — user can reopen.
    function collapseToClosedCover() {
      if (phase !== 'open' || turning) return;
      phase = 'closing-to-cover';
      bookEl.dataset.phase = 'closing-to-cover';
      bookSpread.style.pointerEvents = 'none';
      bookSpread.classList.add('is-flipping');

      // Blank the left page and append the cover leaf in the same synchronous block
      // so the browser paints them together in one frame — the leaf (front =
      // story.color) immediately covers the blank left, preventing a dark flash.
      // The right page (title content) stays visible and is covered as the leaf sweeps.
      // Cover leaf over the left half: front = inside cover colour, back = outer cover.
      var L = buildLeaf('left');
      L.leaf.classList.add('cover-leaf');
      L.front.style.background = story.color;
      renderCover(L.back);
      blankPage(leftPage, leftInner);
      bookSpread.appendChild(L.leaf);

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');
      bookEl.classList.add('book-closed-state');   // slide back to single page

      setTimeout(function () {
        if (L.leaf.parentNode) L.leaf.parentNode.removeChild(L.leaf);
        bookSpread.classList.remove('is-flipping');
        // Restore page backgrounds so they show cream on the next open, not the
        // dark scene background left by blankPage().
        unblankPage(leftPage);
        unblankPage(rightPage);
        bookSpread.style.display = 'none';
        bookSpread.style.pointerEvents = '';
        // Reset the idle-shake animation so the cover reappears at rotate(0) rather
        // than wherever the animation was when it was paused. Setting animation:none
        // then forcing a style flush then removing it causes the browser to restart
        // the animation from the beginning (with its 2 s initial delay).
        bookClosed.style.animation = 'none';
        void bookClosed.offsetWidth;               // flush: force style recalculation
        bookClosed.style.animation = '';           // re-attach from CSS — fresh start
        bookClosed.style.animationPlayState = '';
        bookClosed.style.opacity = '';             // restore closed cover face
        bookClosed.style.pointerEvents = '';
        navPrev.style.display = 'none';
        navNext.style.display = 'none';
        phase = 'closed';
        bookEl.dataset.phase = 'closed';
      }, FLIP_MS);
    }

    // ── Flutter close (back cover click) ─────────────────────────────────────
    // Fans 4 rapid decorative leaves backwards, then swings the cover shut and
    // navigates to the library. Only wired to the back-cover (outro) click.
    function flutterAndClose() {
      if (phase !== 'open' || turning) return;
      phase = 'closing';
      bookEl.dataset.phase = 'closing';
      bookSpread.style.pointerEvents = 'none';
      // is-flipping hides corner folds, fades spine, drops spread shadow.
      // Replace "The End" on the left with the inside-cover colour (story.color)
      // so it disappears without leaving a dark hole. The left half stays story.color
      // throughout the flutter — the cream flutter leaves contrast against it cleanly.
      // The right page (back cover colour) is kept visible throughout the flutter.
      bookSpread.classList.add('is-flipping');
      applyLeft(leftInner, spreads[0]);  // inside-cover colour, clears "The End" text

      var FLUTTER_MS    = 250;   // duration of each rapid leaf
      var STAGGER_MS    = 90;    // gap between leaf launches
      var FLUTTER_COUNT = 4;

      // Launch staggered flutter leaves over the left half (backwards direction)
      for (var i = 0; i < FLUTTER_COUNT; i++) {
        (function (idx) {
          setTimeout(function () {
            var Lf = buildLeaf('left');
            Lf.leaf.classList.add('flutter-leaf');
            Lf.front.style.background = '#f5f0e8';   // page cream
            Lf.back.style.background  = '#e8dfd0';   // slightly warmer back
            bookSpread.appendChild(Lf.leaf);
            void Lf.leaf.offsetWidth;
            Lf.leaf.classList.add('flipping');
            setTimeout(function () {
              if (Lf.leaf.parentNode) Lf.leaf.parentNode.removeChild(Lf.leaf);
            }, FLUTTER_MS + 50);
          }, idx * STAGGER_MS);
        })(i);
      }

      // After all flutter leaves finish, run the cover swing + navigate
      var flutterTotal = STAGGER_MS * (FLUTTER_COUNT - 1) + FLUTTER_MS + 30;
      setTimeout(function () {
        // Snap right page to the title spread so the cover swings over it.
        unblankPage(rightPage);
        applyRight(rightInner, spreads[0]);

        // Blank the left page and build the cover leaf in the same synchronous
        // block. The browser paints them together in one frame — the leaf is already
        // covering the blank left when it first renders, so no dark gap flashes.
        blankPage(leftPage, leftInner);
        var L = buildLeaf('left');
        L.leaf.classList.add('cover-leaf');
        L.front.style.background = story.color;
        renderCover(L.back);
        bookSpread.appendChild(L.leaf);

        void L.leaf.offsetWidth;
        L.leaf.classList.add('flipping');
        bookEl.classList.add('book-closed-state');

        setTimeout(function () { scene.classList.add('scene-fade-out'); }, FLIP_MS - 120);
        setTimeout(function () { ctx.go('library'); }, FLIP_MS + 220);
      }, flutterTotal);
    }

    // Tapping the inside front cover (left page, title spread) collapses the
    // book back to its closed cover without navigating away.
    leftPage.addEventListener('click', function () {
      if (phase === 'open' && !turning && spreadIdx === 0) {
        collapseToClosedCover();
      }
    });

    // Tapping the back cover (right panel of the outro spread) triggers the
    // flutter-fan animation then closes to library.
    rightPage.addEventListener('click', function () {
      if (phase === 'open' && !turning && spreadIdx === spreads.length - 1) {
        flutterAndClose();
      }
    });
  }

  APP.screens = APP.screens || {};
  APP.screens.storyreader = { render };
})(window.APP);

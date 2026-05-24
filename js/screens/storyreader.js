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

    // Pre-fetch all story images as soon as the reader opens so the resource
    // (disk → HTTP cache) is ready before any panel needs it.  The primary
    // decode step — at the element's actual CSS size — happens inside
    // applyRight/applyLeft via makeImg().decode().  This pre-fetch ensures
    // the data is already parsed by the time makeImg() is called.
    (function () {
      var srcs = [coverImg].concat(story.pages.map(function (p) { return p.image; }).filter(Boolean));
      srcs.forEach(function (src) { var img = new Image(); img.src = src; });
    })();

    // ── Skin (driven by the shared theme dial; same as the library shelf) ─────
    const bookSkin = (APP.activeBookSkin && APP.activeBookSkin()) || 'classic';
    const skin     = bookSkin === 'watercolour' ? 'book-watercolour'
                   : bookSkin === 'basic'       ? 'book-basic'
                   :                              'book-classic';
    const palette  = bookSkin === 'classic'     ? 'l-' + (story.leather || 'burgundy')
                   : bookSkin === 'watercolour' ? 'b-' + (story.board   || 'sage')
                   :                              '';
    const defaultFrame = bookSkin === 'watercolour' ? 'wash' : 'rect';

    const spreads = [
      {
        leftType: 'color',  leftContent: story.color,
        rightType: 'title', rightContent: { title: story.title, image: coverImg }
      },
      ...story.pages.map(function (p, i) {
        return {
          leftType:  'text',  leftContent: p.text,
          rightType: 'image', rightContent: p.image,
          frame: p.frame, pageNum: i + 1
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
    bookEl.className = 'book book-closed-state ' + skin + ' ' + palette;
    bookEl.dataset.phase = 'closed';

    // ── Closed cover (the shared skinned cover; box-shadow/idle-shake live on
    //    .book-closed, the painted face is the .story-cover inside it) ─────────
    const bookClosed = document.createElement('div');
    bookClosed.className = 'book-closed';
    bookClosed.appendChild(APP.bookCover(story, { skin: bookSkin }));
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

    // ── Animated shadow companion ────────────────────────────────────────────
    // Sibling of bookSpread: animates scaleX 0.5 → 1 on cover open and
    // 1 → 0.5 on close so the shadow grows/shrinks with the cover.
    const bookShadow = document.createElement('div');
    bookShadow.className = 'book-spread-shadow';
    bookEl.appendChild(bookShadow);

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
    // These paint into BOTH the static pages (.book-page-inner) and the flipping
    // leaf faces (.leaf-face), so the skin markup rides the leaf during a turn.

    // Inside-cover panel that fills the whole leaf side (no parchment gutter).
    function insideCover() {
      var inside = document.createElement('div');
      inside.className = 'inside-cover-' + (skin === 'book-watercolour' ? 'watercolour' : 'classic');
      return inside;
    }

    // Gilded page frame (corners + pendant) for classic; looser/empty for watercolour.
    function buildPageFrame() {
      var f = document.createElement('div');
      f.className = 'page-frame';
      if (skin === 'book-classic') {
        ['tl','tr','bl','br'].forEach(function (p) {
          var c = document.createElement('div');
          c.className = 'corner ' + p;
          c.innerHTML = '<svg viewBox="0 0 120 120"><use href="#corner-flourish"/></svg>';
          f.appendChild(c);
        });
        var pendant = document.createElement('div');
        pendant.className = 'pendant';
        pendant.innerHTML = '<svg viewBox="0 0 60 80"><use href="#pendant"/></svg>';
        f.appendChild(pendant);
      }
      return f;
    }

    // Page number, centred at the bottom of each panel (clear of the corner
    // folds). Left/right panels of one story spread read as consecutive pages
    // (e.g. story page 1 → left "1", right "2").
    function appendPageNum(container, spread, side) {
      if (!spread.pageNum) return;
      var num = side === 'left' ? (spread.pageNum * 2 - 1) : (spread.pageNum * 2);
      var n = document.createElement('div');
      n.className = 'page-num';
      n.textContent = '· ' + num + ' ·';
      container.appendChild(n);
    }

    // ── Panel-image factory ─────────────────────────────────────────────────
    // Creates an <img> with the .book-panel-img base class (layout reservation
    // + consistent defaults) plus an optional skin size-class, then calls
    // decode() on the live DOM element so the browser rasterises it at the
    // element's actual CSS dimensions.  The returned Promise is collected by
    // applyLeft / applyRight and surfaced to callers that need to gate on it.
    //
    // New skins: just call makeImg() for every panel <img> and pass your
    // size class — no other animation-related wiring is needed.
    function makeImg(pending, sizeClass, src) {
      var el = document.createElement('img');
      el.className = sizeClass ? 'book-panel-img ' + sizeClass : 'book-panel-img';
      el.src = src;
      el.alt = '';
      pending.push(el.decode().catch(function () {}));
      return el;
    }

    // applyLeft and applyRight both:
    //   • use makeImg() for every <img> they create
    //   • return Promise.all(pending) — resolves when every image in that
    //     panel is decoded and ready to paint.
    // Callers that need to gate a reveal on decode just .then() the result.
    // Callers that don't care can ignore it — no existing call sites break.

    function applyLeft(container, spread) {
      container.style.background = '';
      container.innerHTML = '';
      var pending = [];
      if (bookSkin === 'basic') {
        // Plain testing baseline — flat colour / plain text, no frames.
        if (spread.leftType === 'color') {
          container.style.background = spread.leftContent;
        } else if (spread.leftType === 'theend') {
          var pe = document.createElement('p'); pe.className = 'book-the-end'; pe.textContent = 'The End';
          container.appendChild(pe);
        } else {
          var pt = document.createElement('p'); pt.className = 'book-text'; pt.textContent = spread.leftContent;
          container.appendChild(pt);
        }
        return Promise.all(pending);
      }
      if (spread.leftType === 'color') {
        // Inside front cover — fill the full leaf side.
        container.appendChild(insideCover());
      } else if (spread.leftType === 'theend') {
        container.appendChild(buildPageFrame());
        var end = document.createElement('div');
        end.className = 'theend';
        end.innerHTML = '<div class="big">The End</div>'
          + '<div class="vine"><svg viewBox="0 0 100 14"><use href="#vine"/></svg></div>';
        container.appendChild(end);
      } else {
        // Text page — frame + drop-capped content + page number.
        container.appendChild(buildPageFrame());
        var content = document.createElement('div');
        content.className = 'page-content';
        var p = document.createElement('p');
        p.textContent = spread.leftContent;
        content.appendChild(p);
        container.appendChild(content);
        appendPageNum(container, spread, 'left');
      }
      return Promise.all(pending);
    }

    function applyRight(container, spread) {
      container.style.background = '';
      container.innerHTML = '';
      var pending = [];
      if (bookSkin === 'basic') {
        // Plain testing baseline.
        if (spread.rightType === 'color') {
          container.style.background = spread.rightContent;
        } else if (spread.rightType === 'title') {
          var bd = spread.rightContent;
          var bi = makeImg(pending, 'book-cover-img', bd.image);
          var bt = document.createElement('p'); bt.className = 'book-cover-title'; bt.textContent = bd.title;
          container.appendChild(bi); container.appendChild(bt);
        } else {
          container.appendChild(makeImg(pending, 'book-img', spread.rightContent));
        }
        return Promise.all(pending);
      }
      if (spread.rightType === 'color') {
        // Inside back cover — fill the full leaf side.
        container.appendChild(insideCover());
      } else if (spread.rightType === 'title') {
        var td = spread.rightContent;
        var tp = document.createElement('div'); tp.className = 'title-page';
        var th = document.createElement('div'); th.className = 'title-h'; th.textContent = td.title;
        var ti = makeImg(pending, 'title-img', td.image);
        tp.appendChild(th); tp.appendChild(ti);
        container.appendChild(tp);
      } else {
        // Image page — frame + framed illustration + page number.
        container.appendChild(buildPageFrame());
        var wrap = document.createElement('div');
        wrap.className = 'page-img frame-' + (spread.frame || defaultFrame);
        wrap.appendChild(makeImg(pending, '', spread.rightContent));
        container.appendChild(wrap);
        appendPageNum(container, spread, 'right');
      }
      return Promise.all(pending);
    }

    // ── Leaf builder (shared by page turns + cover open/close) ───────────────
    var FLIP_MS      = 600;    // page turn speed — keep in sync with .page-leaf transition
    var COVER_MS     = 950;    // cover open/close speed — keep in sync with .cover-leaf transition
    var COVER_PAUSE  = 550;   // ms to show closed cover before fading to library

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

    // Paint the front cover (the shared skinned cover) into a leaf face.
    // Pre-set a background matching the cover colour so there is no parchment
    // flash between innerHTML clearing and the cover component rendering.
    function renderCover(face) {
      face.innerHTML = '';
      face.classList.add('cover-face');
      face.style.background = story.color || '#888';
      face.appendChild(APP.bookCover(story, { skin: bookSkin }));
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
        // Move existing rightInner children to the leaf front face rather than
        // re-creating them. This transfers already-decoded GPU textures so the
        // image never blanks — no re-decode step, no flash.
        L.front.style.background = rightInner.style.background;
        while (rightInner.firstChild) { L.front.appendChild(rightInner.firstChild); }
        applyLeft(L.back,  incoming);
        bookSpread.appendChild(L.leaf);

        // Reveal incoming right under the leaf (hidden behind the front face).
        applyRight(rightInner, incoming);

        void L.leaf.offsetWidth;                  // commit start state
        L.leaf.classList.add('flipping');         // rotateY 0 → -180deg
        // Hide the front face at the exact midpoint via a CSS keyframe animation
        // (same duration as the flip transition). A CSS animation is evaluated on
        // the compositor thread, frame-accurately, eliminating the 10–20 ms
        // event-loop jitter of setTimeout that lets the face show reversed after
        // the leaf passes 90°. See @keyframes leaf-front-hide in styles.css.
        L.front.style.animation = 'leaf-front-hide ' + FLIP_MS + 'ms linear forwards';

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
        // Same move-children pattern as the next branch: transfer decoded textures.
        Lp.front.style.background = leftInner.style.background;
        while (leftInner.firstChild) { Lp.front.appendChild(leftInner.firstChild); }
        applyRight(Lp.back, incoming);
        bookSpread.appendChild(Lp.leaf);

        applyLeft(leftInner, incoming);           // reveal incoming left under leaf

        void Lp.leaf.offsetWidth;
        Lp.leaf.classList.add('flipping');
        Lp.front.style.animation = 'leaf-front-hide ' + FLIP_MS + 'ms linear forwards';

        setTimeout(function () { spreadIdx = nextIdx; updateNav(); }, FLIP_MS / 2);
        setTimeout(function () {
          // Move Lp.back children to rightInner — the image has been in the live
          // DOM for the full FLIP_MS so it is fully rasterised at the correct CSS
          // size.  Moving it transfers the GPU texture with no re-decode step,
          // eliminating the blank-then-reappear flash on SVGs (e.g. the owl).
          rightInner.style.background = Lp.back.style.background;
          rightInner.innerHTML = '';   // clear outgoing content before moving in the decoded back face
          while (Lp.back.firstChild) { rightInner.appendChild(Lp.back.firstChild); }
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

      spreadIdx = 0;
      applyRight(rightInner, spreads[0]);

      // Build the cover leaf and append it to the spread BEFORE the spread
      // becomes visible.  On mobile, display:flex triggers a paint; if the
      // leaf isn't already in the DOM at that moment the title page flashes
      // through for one frame before the cover appears.  Building here
      // (spread still display:none) guarantees the leaf is in place the
      // instant the spread is shown.
      var L = buildLeaf('right');
      L.leaf.classList.add('cover-leaf');         // solid cover: no curl shade
      renderCover(L.front);
      applyLeft(L.back, spreads[0]);
      bookSpread.appendChild(L.leaf);

      // Blank the left page, hide the closed cover, and show the spread in
      // one synchronous block — browser paints them as a single frame so
      // there is no intermediate state where both covers are visible or
      // neither is visible.
      blankPage(leftPage, leftInner);
      // Hide via opacity + pointer-events (not display:none) so the element
      // stays in layout, avoiding a flex reflow on restoration.  Pause idle-
      // shake so the cover reappears at rotate(0) rather than mid-tilt.
      bookClosed.style.opacity = '0';
      bookClosed.style.pointerEvents = 'none';
      bookClosed.style.animationPlayState = 'paused';
      bookSpread.style.display = 'flex';
      bookSpread.classList.add('is-flipping');    // hide folds + fade spine

      // Shadow: reveal from right-half (cover position) to full spread.
      // clip-path animates inset(0 0 0 50%) → inset(0 0 0 0%) — it clips the
      // box-shadow too, so the shadow visually grows with the cover as it opens.
      // opacity:1 is set instantly (no display toggle) so void offsetWidth
      // reliably commits the initial clip-path before the transition starts.
      bookShadow.style.transition = 'none';
      bookShadow.style.clipPath = 'inset(0 0 0 50%)';
      bookShadow.style.opacity = '1';
      void bookShadow.offsetWidth;
      bookShadow.style.transition = 'clip-path ' + COVER_MS + 'ms ease';
      bookShadow.style.clipPath = 'inset(0 0 0 0%)';

      // Slide the book to its centred 2-page position while the cover flips.
      bookEl.classList.remove('book-closed-state');

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');           // rotateY 0 → -180deg
      L.front.style.animation = 'cover-front-hide ' + COVER_MS + 'ms linear forwards';

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
      }, COVER_MS);
    });

    // ── Book close sequence (reverse cover swing) ────────────────────────────
    function closeBook() {
      if (phase !== 'open' || turning) return;
      phase = 'closing';
      bookEl.dataset.phase = 'closing';
      bookSpread.style.pointerEvents = 'none';
      bookSpread.classList.add('is-flipping');    // hide folds + fade spine

      // Mirror the current left page content onto the leaf's front face, then
      // blank the page behind it in the same synchronous block — the swap is
      // invisible (one frame). The leaf rotates carrying that content away;
      // once it passes 90° the cover art (back face) sweeps into view.
      var L = buildLeaf('left');
      L.leaf.classList.add('cover-leaf');         // solid cover: no curl shade
      applyLeft(L.front, spreads[spreadIdx]);
      renderCover(L.back);
      blankPage(leftPage, leftInner);
      bookSpread.appendChild(L.leaf);

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');
      bookEl.classList.add('book-closed-state');  // slide back to single page
      L.front.style.animation = 'cover-front-hide ' + COVER_MS + 'ms linear forwards';

      // Shadow: retract from full spread to cover width as the book closes.
      bookShadow.style.transition = 'clip-path ' + COVER_MS + 'ms ease';
      bookShadow.style.clipPath = 'inset(0 0 0 50%)';

      setTimeout(function () { scene.classList.add('scene-fade-out'); }, COVER_MS + COVER_PAUSE);
      setTimeout(function () { ctx.go('library'); }, COVER_MS + COVER_PAUSE + 350);
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
      // skinned inside cover) immediately covers the blank left, preventing a flash.
      // The right page (title content) stays visible and is covered as the leaf sweeps.
      // Cover leaf over the left half: front = inside (skinned) cover, back = outer cover.
      var L = buildLeaf('left');
      L.leaf.classList.add('cover-leaf');
      applyLeft(L.front, spreads[0]);   // skinned inside front cover (not flat colour)
      renderCover(L.back);
      blankPage(leftPage, leftInner);
      bookSpread.appendChild(L.leaf);

      void L.leaf.offsetWidth;
      L.leaf.classList.add('flipping');
      bookEl.classList.add('book-closed-state');   // slide back to single page
      L.front.style.animation = 'cover-front-hide ' + COVER_MS + 'ms linear forwards';

      // Shadow: retract from full spread to cover width as the book closes.
      bookShadow.style.transition = 'clip-path ' + COVER_MS + 'ms ease';
      bookShadow.style.clipPath = 'inset(0 0 0 50%)';

      setTimeout(function () {
        if (L.leaf.parentNode) L.leaf.parentNode.removeChild(L.leaf);
        bookSpread.classList.remove('is-flipping');
        // Hide shadow — .book-closed has its own shadow in the closed state.
        bookShadow.style.transition = 'none';
        bookShadow.style.opacity = '0';
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
      }, COVER_MS);
    }

    // ── Flutter close (back cover click) ─────────────────────────────────────
    // Fans 4 rapid decorative leaves backwards, then swings the cover shut and
    // navigates to the library. Only wired to the back-cover (outro) click.
    function flutterAndClose() {
      if (phase !== 'open' || turning) return;
      phase = 'closing';
      bookEl.dataset.phase = 'closing';
      bookSpread.style.pointerEvents = 'none';
      // is-flipping hides corner folds and fades spine.
      // Replace "The End" on the left with the inside-cover colour (story.color)
      // so it disappears without leaving a dark hole. The left half stays story.color
      // throughout the flutter — the cream flutter leaves contrast against it cleanly.
      // The right page (back cover colour) is kept visible throughout the flutter.
      bookSpread.classList.add('is-flipping');
      applyLeft(leftInner, spreads[0]);  // inside-cover colour, clears "The End" text

      // Kick off a pre-decode of the title spread image RIGHT NOW, in parallel
      // with the flutter animation, so it is fully rasterised (at its natural
      // intrinsic size) before the cover swing needs it.  applyRight() will call
      // decode() again on the live DOM element (at its CSS size) — because the
      // image data is already decoded, that second pass is just a rasterise step
      // and completes in the same frame.  Both the flutter timeout AND this
      // promise must resolve before the cover swing starts.
      var titleDecodeReady = (function () {
        var tmp = new Image(); tmp.src = coverImg; return tmp.decode().catch(function () {});
      })();

      var FLUTTER_MS    = 250;   // duration of each rapid leaf
      var STAGGER_MS    = 90;    // gap between leaf launches
      var FLUTTER_COUNT = 4;

      // Flutter leaf colours matched to the active book skin. Literal hex values
      // are used (not CSS var() references) because the inline style is set before
      // the element is in the DOM, so custom properties cannot be resolved yet.
      var flutterFront = bookSkin === 'watercolour' ? '#fbf6ea'   // --paper-1
                       : bookSkin === 'basic'       ? '#f5f0e8'
                       :                              '#ecdcb0';  // --parch-2
      var flutterBack  = bookSkin === 'watercolour' ? '#f3ebd6'   // --paper-2
                       : bookSkin === 'basic'       ? '#e8dfd0'
                       :                              '#d8c490';  // --parch-3

      // Launch staggered flutter leaves over the left half (backwards direction)
      for (var i = 0; i < FLUTTER_COUNT; i++) {
        (function (idx) {
          setTimeout(function () {
            var Lf = buildLeaf('left');
            Lf.leaf.classList.add('flutter-leaf');
            Lf.front.style.background = flutterFront;
            Lf.back.style.background  = flutterBack;
            bookSpread.appendChild(Lf.leaf);
            void Lf.leaf.offsetWidth;
            Lf.leaf.classList.add('flipping');
            Lf.front.style.animation = 'leaf-front-hide ' + FLUTTER_MS + 'ms linear forwards';
            setTimeout(function () {
              if (Lf.leaf.parentNode) Lf.leaf.parentNode.removeChild(Lf.leaf);
            }, FLUTTER_MS + 50);
          }, idx * STAGGER_MS);
        })(i);
      }

      // Wait for both the flutter animation to finish AND the title image to be
      // decoded.  On local files this is always the flutter timer that wins
      // (decode finishes in < 50 ms); the Promise.all just ensures the cover
      // swing never starts with a blank image rectangle showing on the right page.
      var flutterTotal = STAGGER_MS * (FLUTTER_COUNT - 1) + FLUTTER_MS + 30;
      Promise.all([
        new Promise(function (r) { setTimeout(r, flutterTotal); }),
        titleDecodeReady
      ]).then(function () {
        // Snap right page to the title spread so the cover swings over it.
        // applyRight calls makeImg().decode() on the live element — because the
        // data is already pre-decoded above, this resolves in the same frame.
        unblankPage(rightPage);
        applyRight(rightInner, spreads[0]);

        // Blank the left page and build the cover leaf in the same synchronous
        // block. The browser paints them together in one frame — the leaf is already
        // covering the blank left when it first renders, so no dark gap flashes.
        blankPage(leftPage, leftInner);
        var L = buildLeaf('left');
        L.leaf.classList.add('cover-leaf');
        applyLeft(L.front, spreads[0]);   // skinned inside front cover (not flat colour)
        renderCover(L.back);
        bookSpread.appendChild(L.leaf);

        void L.leaf.offsetWidth;
        L.leaf.classList.add('flipping');
        bookEl.classList.add('book-closed-state');
        L.front.style.animation = 'cover-front-hide ' + COVER_MS + 'ms linear forwards';

        // Shadow: retract from full spread to cover width as the book closes.
        bookShadow.style.transition = 'clip-path ' + COVER_MS + 'ms ease';
        bookShadow.style.clipPath = 'inset(0 0 0 50%)';

        setTimeout(function () { scene.classList.add('scene-fade-out'); }, COVER_MS + COVER_PAUSE);
        setTimeout(function () { ctx.go('library'); }, COVER_MS + COVER_PAUSE + 350);
      });
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

window.APP = window.APP || {};

(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    const story = APP.state.currentStory;
    if (!story) { ctx.go('library'); return; }

    const pages = story.pages || [];
    if (pages.length === 0) { ctx.go('library'); return; }

    // Clamp page index in case state is stale
    if (APP.state.currentPage >= pages.length) APP.state.currentPage = 0;

    const wrap = document.createElement('div');
    wrap.className = 'reader';

    // ── Topbar ─────────────────────────────────────────────────────────────
    const topbar = document.createElement('div');
    topbar.className = 'topbar reader-topbar';
    topbar.innerHTML = `
      <button class="btn icon ghost" id="reader-close" aria-label="Close">${APP.ICONS.back}</button>
      <span class="reader-page-count"></span>
      <div style="width:44px"></div>
    `;
    wrap.appendChild(topbar);

    const pageCount = topbar.querySelector('.reader-page-count');
    topbar.querySelector('#reader-close').addEventListener('click', () => ctx.go('library'));

    // ── Page area ───────────────────────────────────────────────────────────
    const pageArea = document.createElement('div');
    pageArea.className = 'reader-page';

    const illus = document.createElement('img');
    illus.className = 'reader-illustration';
    illus.alt = '';
    pageArea.appendChild(illus);

    const textEl = document.createElement('p');
    textEl.className = 'reader-text';
    pageArea.appendChild(textEl);

    wrap.appendChild(pageArea);

    // ── Nav ─────────────────────────────────────────────────────────────────
    const nav = document.createElement('div');
    nav.className = 'reader-nav';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn ghost';
    prevBtn.innerHTML = '&#9664; Prev';

    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn';

    nav.appendChild(prevBtn);
    nav.appendChild(nextBtn);
    wrap.appendChild(nav);

    root.appendChild(wrap);

    // ── Page rendering ──────────────────────────────────────────────────────

    // Applies content to the DOM immediately — used both on initial render
    // and at the midpoint of a flip (when the page is edge-on and invisible).
    function _applyPage(idx, page, total) {
      pageCount.textContent = 'Page ' + (idx + 1) + ' of ' + total;
      textEl.textContent = page.text;

      if (page.animal) {
        illus.src = 'assets/images/cartoon/' + page.animal + '.svg';
        illus.style.display = '';
      } else {
        illus.style.display = 'none';
      }

      prevBtn.disabled = idx === 0;

      if (idx === total - 1) {
        nextBtn.textContent = 'Finish ✓';
        nextBtn.className = 'btn success';
      } else {
        nextBtn.innerHTML = 'Next &#9654;';
        nextBtn.className = 'btn';
      }
    }

    // Orchestrates the 3D flip animation, then swaps content at the midpoint
    // when the page is edge-on and invisible. direction: 'next' | 'prev' | null.
    // Passing no direction (initial render) skips animation entirely.
    function showPage(direction) {
      const idx   = APP.state.currentPage;
      const page  = pages[idx];
      const total = pages.length;

      if (!direction) {
        _applyPage(idx, page, total);
        return;
      }

      const outClass = direction === 'next' ? 'flip-out-next' : 'flip-out-prev';
      const inClass  = direction === 'next' ? 'flip-in-next'  : 'flip-in-prev';

      // Block nav clicks for the full ~440 ms flip so rapid taps don't stack.
      nav.style.pointerEvents = 'none';

      pageArea.classList.add(outClass);

      setTimeout(() => {
        // Page is now edge-on (invisible) — safe to swap content.
        pageArea.classList.remove(outClass);
        _applyPage(idx, page, total);
        pageArea.classList.add(inClass);
        pageArea.addEventListener('animationend', () => {
          pageArea.classList.remove(inClass);
          nav.style.pointerEvents = '';   // restore interaction
        }, { once: true });
      }, 220);   // matches pageFlipOut* animation duration
    }

    prevBtn.addEventListener('click', () => {
      if (APP.state.currentPage > 0) {
        APP.state.currentPage--;
        showPage('prev');
      }
    });

    nextBtn.addEventListener('click', () => {
      if (APP.state.currentPage < pages.length - 1) {
        APP.state.currentPage++;
        showPage('next');
      } else {
        ctx.go('library');
      }
    });

    showPage(); // initial render — no direction, no animation
  }

  APP.screens = APP.screens || {};
  APP.screens.storyreader = { render };
})(window.APP);

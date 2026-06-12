window.APP = window.APP || {};

/* ╭──────────────────────────────────────────────────────────────────────╮
   │ js/screens/library.js — skinnable bookshelf                           │
   │                                                                       │
   │ Renders APP.STORIES onto a `.bookshelf.skin-walnut` (or skin-storybook)│
   │ with face-out `.book` cards mixed with decorative `.shelf-prop` items.│
   │ The CSS for both lives in styles.css. Defs (corner-flourish, padlock, │
   │ candle, etc.) live in index.html.                                     │
   ╰──────────────────────────────────────────────────────────────────────╯ */

(function (APP) {

  /* The theme dial (shelf room + book skin together) lives on APP.state and is
     defined once in js/state.js (APP.LIBRARY_THEMES / APP.activeTheme), shared
     with the reader so switching the dropdown re-skins both. */
  const THEMES = APP.LIBRARY_THEMES;

  function el(tag, props) {
    const n = document.createElement(tag);
    const kids = [].slice.call(arguments, 2);
    if (props) for (const k in props) {
      if (k === 'class')      n.className = props[k];
      else if (k === 'html')  n.innerHTML = props[k];
      else if (k === 'on')    for (const ev in props.on) n.addEventListener(ev, props.on[ev]);
      else                    n.setAttribute(k, props[k]);
    }
    kids.forEach(kid => {
      if (kid == null) return;
      n.appendChild(typeof kid === 'string' ? document.createTextNode(kid) : kid);
    });
    return n;
  }
  const useSym = (id, w, h) =>
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><use href="#${id}"/></svg>`;

  /* Build a face-out book card for a single story. The painted cover is the
     shared APP.bookCover component (also used by the reader); the `.book` card
     only provides on-shelf geometry (size + hover lift). */
  function buildBook(story, isUnlocked, bookSkin, ctx) {
    const locked = !isUnlocked;

    const root = el('div', {
      class: `book${locked ? ' is-locked' : ''}`,
      'data-story-id': story.id,
      'aria-label': story.title,
      role: 'button',
      tabindex: locked ? '-1' : '0',
    });

    root.appendChild(APP.bookCover(story, { skin: bookSkin, locked }));

    // Append the requirements panel as a sibling of .story-cover (not a child),
    // so it sits outside the is-locked desaturation filter on .story-cover.
    if (locked) root.appendChild(APP.buildLockReqs(story));

    if (!locked) {
      root.addEventListener('click', () => {
        APP.setState({ currentStory: story, currentPage: 0 });
        const wrap = root.closest('.library');
        if (wrap) { wrap.style.transition = 'opacity 0.3s ease'; wrap.style.opacity = '0'; }
        setTimeout(() => ctx.go('storyreader'), wrap ? 320 : 0);
      });
    } else {
      // Show requirements as a tooltip-style hint
      root.title = (story.requirements || []).map(r => {
        const animal = APP.animals.displayName(r.animalId);
        return r.minCount > 1
          ? APP.t('library.req.complete', { animal, n: r.minCount })
          : APP.t('library.req.find', { animal });
      }).join('\n');
    }

    return root;
  }

  /* Build a decorative shelf prop (candle / hourglass / quill / key / teapot / lamp). */
  function shelfProp(kind, label) {
    const sizes = {
      candle:[36,96], hourglass:[46,80], quill:[42,78],
      key:[62,24], teapot:[84,62], lamp:[64,96]
    };
    const dim = sizes[kind] || [40,80];
    return el('div', { class:`shelf-prop prop-${kind}`, title: label || kind, html: useSym(kind, dim[0], dim[1]) });
  }

  /* Compute how many books fit per shelf row at the current viewport width.
     Must stay in sync with the CSS media queries in styles.css:
       max-height:600px  → .bookshelf padding 12px, .book width 96px
       max-width:479px   → .bookshelf padding 16px, .book width 100px, row-pad 8px
       480–767px         → .bookshelf padding 24px, .book width 120px
       ≥768px            → .bookshelf padding 36px, .book width 148px
     Shelf props (candle/teapot/…) are shown at W≥768; the widest (teapot=84px)
     plus one gap (8px) is reserved so rows never overflow. */
  function booksPerRow() {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const landscape  = H < 600 && W >= 480;
    const SHELF_PAD  = landscape ? 12 : W < 480 ? 16 : W < 768 ? 24 : 36;
    const ROW_PAD    = W < 480 ? 8 : 14;
    const BOOK_W     = landscape ? 96 : W < 480 ? 100 : W < 768 ? 120 : 148;
    // Props are visible (not display:none) only when W ≥ 768. Reserve the width
    // of the widest prop (teapot 84px) plus one gap so even rows don't overflow.
    const PROP_SPACE = W >= 768 ? 84 + 8 : 0;
    const available  = W - 2 * SHELF_PAD - 2 * ROW_PAD - PROP_SPACE;
    return Math.max(1, Math.floor((available + 8) / (BOOK_W + 8)));
  }

  /* Lay books across shelf rows; mix in shelf props every few books for visual rhythm. */
  function layOutShelves(stories) {
    const PROPS = ['candle','hourglass','quill','key','teapot','lamp'];
    const PER_ROW = booksPerRow();
    const rows = [];
    let propIdx = 0;
    for (let i = 0; i < stories.length; i += PER_ROW) {
      const row = stories.slice(i, i + PER_ROW);
      rows.push({ books: row, prop: PROPS[propIdx % PROPS.length] });
      propIdx++;
    }
    // Always have a row, even if empty
    if (rows.length === 0) rows.push({ books: [], prop: 'candle' });
    return rows;
  }

  function render(root, ctx) {
    root.innerHTML = '';

    // Active theme (session-only), resolved by the shared helper in state.js.
    const theme      = APP.activeTheme();
    const themeKey   = THEMES[APP.state.libraryTheme] ? APP.state.libraryTheme : APP.DEFAULT_LIBRARY_THEME;
    const SHELF_SKIN = theme.shelf;
    const BOOK_SKIN  = theme.book;

    // Sync current theme into the settings store so the gear panel shows the right selection.
    if (APP.settings) APP.settings.saveGame('library', { theme: themeKey });

    const stories  = APP.STORIES || [];
    const unlocked = stories.filter(APP.isStoryUnlocked);
    const allBooks = [...unlocked, ...stories.filter(s => !APP.isStoryUnlocked(s))];

    const wrap = el('div', { class:'library' });

    // ── Topbar: back + title + theme gear ────────────────────────────
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('library.title'),
      home: true,
      back: true,
      settings: {
        gameId: 'library',
        title: APP.t('ui.settings') || 'Settings',
        schema: [
          {
            key: 'theme',
            label: APP.t('library.theme') || 'Theme',
            type: 'segmented',
            options: Object.keys(THEMES).map(function(k) { return { value: k, label: THEMES[k].label }; })
          },
          {
            key: 'textSize',
            label: APP.t('library.textSize') || 'Text Size',
            type: 'segmented',
            options: [
              { value: 'small',  label: 'S' },
              { value: 'medium', label: 'M' },
              { value: 'large',  label: 'L' }
            ]
          }
        ],
        onChange: function(key, val, all) {
          var newTheme = all.theme || val;
          APP.setState({ libraryTheme: newTheme });
          if (APP.settings) APP.settings.saveGame('library', all);
          render(root, ctx);
        }
      }
    }));

    // ── Body — bookshelf fills the area below the header ──────────────────
    const body = el('div', { class:'library-body' });

    const shelf = el('div', { class:`bookshelf ${SHELF_SKIN}` });
    const rows  = layOutShelves(allBooks);
    rows.forEach((row, rIdx) => {
      const r = el('div', { class:'bookshelf-row' });
      row.books.forEach((story, bIdx) => {
        // Sprinkle a prop into the middle of every other row
        if (rIdx % 2 === 0 && bIdx === Math.floor(row.books.length / 2)) {
          r.appendChild(shelfProp(row.prop, row.prop));
        }
        r.appendChild(buildBook(story, APP.isStoryUnlocked(story), BOOK_SKIN, ctx));
      });
      // Always end with one prop for visual rhythm if the row has space
      if (rIdx % 2 === 1) r.appendChild(shelfProp(row.prop, row.prop));
      shelf.appendChild(r);
      shelf.appendChild(el('div', { class:'bookshelf-plank' }));
    });
    body.appendChild(shelf);

    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('library');

    // Re-render when the viewport is resized so booksPerRow() stays accurate.
    // The handler is a no-op once `wrap` leaves the DOM (user navigated away),
    // so there is no need to explicitly remove it.
    let _resizeTimer;
    window.addEventListener('resize', function _libResize() {
      clearTimeout(_resizeTimer);
      _resizeTimer = setTimeout(() => {
        if (document.contains(wrap)) render(root, ctx);
        else window.removeEventListener('resize', _libResize);
      }, 150);
    }, { passive: true });
  }

  APP.screens = APP.screens || {};
  APP.screens.library = { render };
})(window.APP);

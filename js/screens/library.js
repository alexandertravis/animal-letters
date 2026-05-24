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
        APP.state.currentStory = story;
        APP.state.currentPage  = 0;
        const wrap = root.closest('.library');
        if (wrap) { wrap.style.transition = 'opacity 0.3s ease'; wrap.style.opacity = '0'; }
        setTimeout(() => ctx.go('storyreader'), wrap ? 320 : 0);
      });
    } else {
      // Show requirements as a tooltip-style hint
      root.title = (story.requirements || []).map(r => r.label).join('\n');
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
     Uses the same padding values as the CSS media queries in styles.css. */
  function booksPerRow() {
    const W = window.innerWidth;
    const SHELF_PAD = W < 480 ? 16 : W < 768 ? 24 : 36;
    const ROW_PAD   = W < 480 ?  8 : 14;
    const BOOK_W    = W < 480 ? 100 : W < 768 ? 120 : 148;
    const available = W - 2 * SHELF_PAD - 2 * ROW_PAD;
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

    const stories  = APP.STORIES || [];
    const unlocked = stories.filter(APP.isStoryUnlocked);
    const allBooks = [...unlocked, ...stories.filter(s => !APP.isStoryUnlocked(s))];

    const wrap = el('div', { class:'library' });

    // ── Topbar: back + title + theme switcher ────────────────────────────
    const topbar = el('div', { class:'topbar' });

    const leftGroup = el('div', { class:'group' });
    leftGroup.appendChild(el('button', {
      class:'btn icon ghost', 'aria-label':'Back', html: APP.ICONS.back,
      on: { click: () => ctx.go('landing') }
    }));
    topbar.appendChild(leftGroup);

    topbar.appendChild(el('h2', null, APP.t('library.title')));

    const themeSelect = el('select', {
      class:'locale-select library-theme-select', 'aria-label':'Theme',
      on: { change: (e) => { APP.state.libraryTheme = e.target.value; render(root, ctx); } }
    });
    Object.keys(THEMES).forEach(key => {
      const opt = el('option', { value: key }, THEMES[key].label);
      if (key === themeKey) opt.selected = true;
      themeSelect.appendChild(opt);
    });
    topbar.appendChild(themeSelect);

    wrap.appendChild(topbar);

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
  }

  APP.screens = APP.screens || {};
  APP.screens.library = { render };
})(window.APP);

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

  /* Single theme dial. Each theme flips BOTH the shelf/room AND every book
     cover together. Each story carries both a `leather` (classic) and a
     `board` (watercolour) colour, so it renders correctly whichever theme is
     active. The active theme lives on APP.state.libraryTheme (session-only)
     and is switchable from the dropdown in the header.                      */
  const THEMES = {
    storybook: { label:'Storybook', shelf:'skin-storybook', book:'watercolour' },
    walnut:    { label:'Walnut',    shelf:'skin-walnut',    book:'classic'     },
  };
  const DEFAULT_THEME = 'storybook';

  /* Per-colour fallbacks if a story is missing the field for the active skin. */
  const FALLBACK = { leather:'burgundy', board:'sage' };

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

  /* Build a face-out book card for a single story. */
  function buildBook(story, isUnlocked, bookSkin) {
    const skin    = bookSkin;   // driven by active theme, not per-story
    const leather = story.leather || FALLBACK.leather;
    const board   = story.board   || FALLBACK.board;
    const palette = skin === 'classic' ? `l-${leather}` : `b-${board}`;
    const animal  = (story.requirements && story.requirements[0] && story.requirements[0].animalId) || 'cat';
    const locked  = !isUnlocked;

    const root = el('div', {
      class: `book skin-${skin} ${palette}${locked ? ' is-locked' : ''}`,
      'data-story-id': story.id,
      'aria-label': story.title,
      role: 'button',
      tabindex: locked ? '-1' : '0',
    });

    const cover = el('div', { class:'cover' });
    cover.appendChild(el('div', { class:'cover-inner' }));

    if (skin === 'classic') {
      ['tl','tr','bl','br'].forEach(p =>
        cover.appendChild(el('div', { class:`corner ${p}`, html: useSym('corner-flourish', 120, 120) }))
      );
    }

    const portrait = el('div', { class:'cover-portrait' });
    if (!locked) {
      portrait.appendChild(el('img', { src:`assets/images/cartoon/${animal}.svg`, alt:'' }));
    }
    cover.appendChild(portrait);

    const title = el('div', { class:'cover-title' });
    title.appendChild(el('span', { class:'cover-title-text' }, locked ? APP.t('library.locked') : story.title));
    cover.appendChild(title);

    root.appendChild(cover);

    if (!locked) {
      root.addEventListener('click', () => {
        APP.state.currentStory = story;
        APP.state.currentPage  = 0;
        const wrap = root.closest('.library');
        if (wrap) { wrap.style.transition = 'opacity 0.3s ease'; wrap.style.opacity = '0'; }
        setTimeout(() => APP._libCtx.go('storyreader'), wrap ? 320 : 0);
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

  /* Lay books across shelf rows; mix in shelf props every few books for visual rhythm. */
  function layOutShelves(stories) {
    const PROPS = ['candle','hourglass','quill','key','teapot','lamp'];
    const PER_ROW = 6;
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
    APP._libCtx = ctx;  // stashed for the click handlers above
    root.innerHTML = '';

    // Active theme (session-only). Falls back to the default if unset/invalid.
    const themeKey  = THEMES[APP.state.libraryTheme] ? APP.state.libraryTheme : DEFAULT_THEME;
    const theme     = THEMES[themeKey];
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
        r.appendChild(buildBook(story, APP.isStoryUnlocked(story), BOOK_SKIN));
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

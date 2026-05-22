window.APP = window.APP || {};

/* ╭──────────────────────────────────────────────────────────────────────╮
   │ js/screens/bookCover.js — shared book-cover component                 │
   │                                                                       │
   │ Builds the painted `.story-cover` element used in THREE places, so    │
   │ the shelf card and the reader's closed/swing cover always match:      │
   │   • library.js     — wrapped in a `.bookshelf .book` card             │
   │   • storyreader.js — inside `.book-closed` (static) and the cover     │
   │                       leaf face (open/close swing)                    │
   │                                                                       │
   │ The skin (classic | watercolour) and palette (leather/board) come     │
   │ from the active theme + the story's colour fields. Visual CSS lives   │
   │ in styles.css under `.story-cover…`; geometry is the caller's job.    │
   ╰──────────────────────────────────────────────────────────────────────╯ */

(function (APP) {

  const FALLBACK = { leather: 'burgundy', board: 'sage' };

  const useSym = (id, w, h) =>
    `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg"><use href="#${id}"/></svg>`;

  function div(cls, html) {
    const n = document.createElement('div');
    if (cls)  n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  /* Build a `.story-cover` for a story.
       story  — story object (uses title, requirements[0].animalId, leather, board)
       opts   — { skin: 'classic'|'watercolour', locked: bool }
                skin defaults to the active theme's book skin.                */
  APP.bookCover = function (story, opts) {
    opts = opts || {};
    const skin    = opts.skin || (APP.activeBookSkin ? APP.activeBookSkin() : 'classic');
    const locked  = !!opts.locked;
    const leather = story.leather || FALLBACK.leather;
    const board   = story.board   || FALLBACK.board;
    const palette = skin === 'classic' ? `l-${leather}` : `b-${board}`;
    const animal  = (story.requirements && story.requirements[0] && story.requirements[0].animalId) || 'cat';

    // Basic (testing) skin — plain flat cover: solid colour + animal + title.
    if (skin === 'basic') {
      const basic = div('story-cover skin-basic' + (locked ? ' is-locked' : ''));
      basic.style.background = locked ? '#cfcfcf' : (story.color || '#888');
      if (!locked) {
        const im = document.createElement('img');
        im.src = `assets/images/cartoon/${animal}.svg`;
        im.alt = '';
        basic.appendChild(im);
      }
      const t = div('basic-title');
      t.textContent = locked ? (APP.t ? APP.t('library.locked') : 'Locked') : story.title;
      basic.appendChild(t);
      return basic;
    }

    const cover = div(`story-cover skin-${skin} ${palette}${locked ? ' is-locked' : ''}`);

    cover.appendChild(div('cover-inner'));

    if (skin === 'classic') {
      ['tl', 'tr', 'bl', 'br'].forEach(p =>
        cover.appendChild(div(`corner ${p}`, useSym('corner-flourish', 120, 120)))
      );
    }

    const portrait = div('cover-portrait');
    if (!locked) {
      const img = document.createElement('img');
      img.src = `assets/images/cartoon/${animal}.svg`;
      img.alt = '';
      portrait.appendChild(img);
    }
    cover.appendChild(portrait);

    const title = div('cover-title');
    const span  = document.createElement('span');
    span.className = 'cover-title-text';
    span.textContent = locked
      ? (APP.t ? APP.t('library.locked') : 'Locked')
      : story.title;
    title.appendChild(span);
    cover.appendChild(title);

    return cover;
  };

})(window.APP);

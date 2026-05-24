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

  // Star colours — single source of truth for all themes (bookCover is shared).
  var STAR_GOLD = '#ffc72c';   // bright warm gold; readable on dark leather and watercolour
  var STAR_GREY = '#a09890';   // muted warm grey for unearned stars

  // Small 12×12 star SVG.
  function starSvg(color) {
    return '<svg viewBox="0 0 12 12" width="11" height="11" aria-hidden="true">' +
      '<path d="M6,.5 L7.3,4.2 L11.2,4.3 L8.1,6.7 L9.2,10.5 L6,8.2 L2.8,10.5 L3.9,6.7 L.8,4.3 L4.7,4.2 Z"' +
      ' fill="' + color + '"/></svg>';
  }

  // Padlock icon as an inline SVG (matches the data-URI used in the CSS ::after version).
  var LOCK_SVG = '<svg viewBox="0 0 60 70" xmlns="http://www.w3.org/2000/svg">' +
    '<g fill="#6a6258">' +
    '<path d="M16 30 L16 22 Q16 8 30 8 Q44 8 44 22 L44 30 L40 30 L40 22 Q40 12 30 12 Q20 12 20 22 L20 30 Z"/>' +
    '<rect x="10" y="30" width="40" height="32" rx="3"/>' +
    '<circle cx="30" cy="44" r="3" fill="#1a1612"/>' +
    '<rect x="29" y="44" width="2" height="10" fill="#1a1612"/>' +
    '</g></svg>';

  /* Build the requirements panel shown on locked covers.
     Each row: filled-gold stars up to completionCount, grey stars for the rest,
     then the animal name.  Rows match story.requirements order. */
  function buildLockReqs(story) {
    const counts = (APP.state && APP.state.animalCompletionCounts) || {};
    const reqs   = story.requirements || [];
    const wrap   = div('cover-reqs');
    reqs.forEach(function (req) {
      const done  = Math.min(counts[req.animalId] || 0, req.minCount);
      const empty = req.minCount - done;
      const row   = div('cover-req-row');
      var   stars = div('cover-req-stars');
      var i;
      for (i = 0; i < done;  i++) stars.innerHTML += starSvg(STAR_GOLD);
      for (i = 0; i < empty; i++) stars.innerHTML += starSvg(STAR_GREY);
      row.appendChild(stars);
      var name = div('cover-req-name');
      name.textContent = req.animalId.charAt(0).toUpperCase() + req.animalId.slice(1);
      row.appendChild(name);
      wrap.appendChild(row);
    });
    return wrap;
  }

  /* Build a `.story-cover` for a story.
       story  — story object (uses title, requirements[0].animalId, leather, board)
       opts   — { skin: 'classic'|'watercolour', locked: bool }
                skin defaults to the active theme's book skin.                */
  /* Exposed so callers (e.g. library.js) can append the requirements panel
     outside the .story-cover element, keeping it clear of any is-locked filter. */
  APP.buildLockReqs = buildLockReqs;

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
      if (locked) {
        basic.appendChild(div('basic-lock-icon', LOCK_SVG));
      } else {
        const im = document.createElement('img');
        im.src = `assets/images/cartoon/${animal}.svg`;
        im.alt = '';
        basic.appendChild(im);
        const t = div('basic-title');
        t.textContent = story.title;
        basic.appendChild(t);
      }
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

    if (!locked) {
      const title = div('cover-title');
      const span  = document.createElement('span');
      span.className = 'cover-title-text';
      span.textContent = story.title;
      title.appendChild(span);
      cover.appendChild(title);
    }

    return cover;
  };

})(window.APP);

window.APP = window.APP || {};

// Each letter is a list of strokes drawn in order. Each stroke is an SVG path `d`.
// The tracer renders these thick to form the letter's visible shape (no separate outline path).
// Coordinate system per letter:
//   Uppercase:            cap line y=30, baseline y=220. Transform maps → guide top/bottom.
//   Lowercase ascenders:  ascender y=30, baseline y=210. Transform maps → guide top/bottom.
//   Lowercase default:    x-height top y=100, baseline y=210. Transform maps → guide middle/bottom.
//   Lowercase descenders (g j p q y): paths authored directly in guide coordinates —
//     bowl top y=100 (middle guide), bowl bottom y=170 (bottom guide), tail to y=240 (lower guide).
//     Identity transform applied (a=1, b=0). No distortion.
//   All letters use viewBox '0 0 200 268' (lowercase) or '0 0 200 250' (uppercase).
//   Extra viewBox height beyond paths gives round stroke caps room to breathe.
(function (APP) {
  const VB_UP  = '0 0 200 250';
  const VB_LOW = '0 0 200 270'; // matches the 270-high viewBox used by all display-coord lowercase entries

  const LETTERS = {};

  // ----- Uppercase -----
  LETTERS['A'] = { viewBox: VB_UP, strokes: [
    { d: 'M 100,30 L 30,220' },
    { d: 'M 100,30 L 170,220' },
    { d: 'M 60,150 L 140,150' }
  ]};
  LETTERS['B'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 Q 150,30 150,80 Q 150,125 50,125' },
    { d: 'M 50,125 Q 160,125 160,170 Q 160,220 50,220' }
  ]};
  LETTERS['C'] = { viewBox: VB_UP, strokes: [
    { d: 'M 165,55 Q 30,30 30,125 Q 30,220 165,195' }
  ]};
  LETTERS['D'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 Q 170,30 170,125 Q 170,220 50,220' }
  ]};
  LETTERS['E'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 L 160,30' },
    { d: 'M 50,125 L 140,125' },
    { d: 'M 50,220 L 160,220' }
  ]};
  LETTERS['F'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 L 160,30' },
    { d: 'M 50,125 L 140,125' }
  ]};
  LETTERS['G'] = { viewBox: VB_UP, strokes: [
    { d: 'M 165,55 Q 30,30 30,125 Q 30,220 165,195 L 165,135' },
    { d: 'M 165,135 L 110,135' }
  ]};
  LETTERS['H'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 150,30 L 150,220' },
    { d: 'M 50,125 L 150,125' }
  ]};
  LETTERS['I'] = { viewBox: VB_UP, strokes: [
    // Quicksand uppercase I has no serifs — plain vertical stem only.
    { d: 'M 100,30 L 100,220' }
  ]};
  LETTERS['J'] = { viewBox: VB_UP, strokes: [
    { d: 'M 70,30 L 150,30' },
    { d: 'M 130,30 L 130,170 Q 130,220 80,220 Q 30,220 30,180' }
  ]};
  LETTERS['K'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 150,30 L 50,125' },
    { d: 'M 50,125 L 160,220' }
  ]};
  LETTERS['L'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,220 L 160,220' }
  ]};
  LETTERS['M'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 30,220' },
    { d: 'M 30,30 L 100,170' },
    { d: 'M 100,170 L 170,30' },
    { d: 'M 170,30 L 170,220' }
  ]};
  LETTERS['N'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 L 150,220' },
    { d: 'M 150,30 L 150,220' }
  ]};
  LETTERS['O'] = { viewBox: VB_UP, strokes: [
    { d: 'M 100,30 Q 30,30 30,125 Q 30,220 100,220 Q 170,220 170,125 Q 170,30 100,30' }
  ]};
  LETTERS['P'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 Q 160,30 160,80 Q 160,125 50,125' }
  ]};
  LETTERS['Q'] = { viewBox: VB_UP, strokes: [
    { d: 'M 100,30 Q 30,30 30,125 Q 30,220 100,220 Q 170,220 170,125 Q 170,30 100,30' },
    // Tail repositioned to stay within Quicksand Q's glyph area.
    // Old path (M 130,170 L 180,225) ended outside the oval; this one ends
    // near the lower-right edge of the Quicksand glyph where Q's tail sits.
    { d: 'M 130,155 L 168,195' }
  ]};
  LETTERS['R'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 Q 160,30 160,80 Q 160,125 50,125' },
    { d: 'M 90,125 L 165,220' }
  ]};
  LETTERS['S'] = { viewBox: VB_UP, strokes: [
    { d: 'M 140,75 C 140,30 60,30 60,75 C 60,105 60,105 100,125 S 140,145 140,175 C 140,220 60,220 60,175' }
  ]};
  LETTERS['T'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 170,30' },
    { d: 'M 100,30 L 100,220' }
  ]};
  LETTERS['U'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,170 Q 50,220 100,220 Q 150,220 150,170 L 150,30' }
  ]};
  LETTERS['V'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 100,220' },
    { d: 'M 170,30 L 100,220' }
  ]};
  LETTERS['W'] = { viewBox: VB_UP, strokes: [
    { d: 'M 20,30 L 60,220' },
    { d: 'M 60,220 L 100,90' },
    { d: 'M 100,90 L 140,220' },
    { d: 'M 140,220 L 180,30' }
  ]};
  LETTERS['X'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 170,220' },
    { d: 'M 170,30 L 30,220' }
  ]};
  LETTERS['Y'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 100,125' },
    { d: 'M 170,30 L 100,125' },
    { d: 'M 100,125 L 100,220' }
  ]};
  LETTERS['Z'] = { viewBox: VB_UP, strokes: [
    { d: 'M 30,30 L 170,30' },
    { d: 'M 170,30 L 30,220' },
    { d: 'M 30,220 L 170,220' }
  ]};

  // ----- Lowercase -----
  LETTERS['a'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 122,98 C 72,74 64,118 66,135 C 68,195 127,174 123,90' },
      { d: 'M 123,90 L 123,156 C 123,173 138,173 145,156' }
    ]
  };
  LETTERS['b'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 74,31 L 74,169' },
      { d: 'M 74,165 C 79,103 89,96 109,91 C 129,90 137,122 131,140 C 124,173 94,174 78,162' }
    ]
  };
  LETTERS['c'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 128,101 C 91,73 74,113 74,130 C 71,151 96,195 132,151' }
    ]
  };
  LETTERS['d'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 123,101 C 96,78 68,98 67,120 C 59,174 94,174 105,161 C 115,146 125,131 123,87 L 123,33' },
      { d: 'M 123,33 L 123,157 C 123,167 136,177 145,158' }
    ]
  };
  LETTERS['e'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
    { d: 'M 74,139 C 120,131 130,114 126,102 C 111,74 65,101 74,138 C 78,186 125,169 131,151' }
  ]};
  LETTERS['f'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 135,41 C 110,18 97,38 98,52 L 97,214 C 98,226 87,238 67,221' },
      { d: 'M 77,94 L 127,94' }
    ]
  };
  LETTERS['g'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 124,99 C 102,82 75,94 70,111 C 59,154 80,169 90,168 C 103,170 117,149 120,136 C 124,123 125,107 124,93' },
      { d: 'M 124,92 L 124,200 C 122,246 76,227 71,216' }
    ]
  };
  LETTERS['h'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 70,32 L 70,168' },
      { d: 'M 70,168 C 72,105 96,90 108,91 C 136,90 121,133 126,158 C 126,168 141,175 148,157' }
    ]
  };
  LETTERS['i'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 97,93 L 97,155 C 96,172 113,174 119,158' },
      { d: 'M 97,53 L 97,54' }
    ]
  };
  LETTERS['j'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 99,92 L 99,209 C 100,235 78,231 71,221' },
      { d: 'M 99,53 L 99,54' }
    ]
  };
  LETTERS['k'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 79,33 L 79,168' },
      { d: 'M 79,168 L 79,135 C 86,101 105,83 122,96 C 136,114 104,130 79,135' },
      { d: 'M 86,134 L 106,158 C 117,172 134,174 141,156' }
    ]
  };
  LETTERS['l'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 97,32 L 97,146 C 95,186 119,164 120,157' }
    ]
  };
  LETTERS['m'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 44,92 L 44,167' },
      { d: 'M 44,168 C 44,133 56,88 82,92 C 104,93 97,134 97,168' },
      { d: 'M 97,168 C 103,113 111,93 134,92 C 157,92 150,129 151,151 C 150,185 172,164 174,157' }
    ]
  };
  LETTERS['n'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 69,93 L 69,168' },
      { d: 'M 69,168 C 70,121 88,94 102,92 C 131,87 125,117 126,133 C 122,183 138,171 148,157' }
    ]
  };
  LETTERS['o'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,91 C 82,90 67,111 68,130 C 67,152 81,170 100,170 C 123,169 132,146 131,130 C 132,109 118,90 100,91' }
    ]
  };
  LETTERS['p'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 74,93 L 74,229' },
      { d: 'M 74,229 L 74,148 C 79,117 87,93 107,91 C 133,91 133,122 133,125 C 132,176 94,175 74,159' }
    ]
  };
  LETTERS['q'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 125,99 C 101,85 73,89 68,125 C 63,165 90,176 105,163 C 118,153 126,129 126,92' },
      { d: 'M 126,92 L 126,229' },
      { d: 'M 126,229 L 148,198' }
    ]
  };
  LETTERS['r'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 85,92 L 85,169' },
      { d: 'M 85,168 C 89,92 113,83 130,96' }
    ]
  };
  LETTERS['s'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 123,100 C 106,83 81,93 81,109 C 80,130 121,127 124,147 C 129,174 90,177 75,157' }
    ]
  };
  LETTERS['t'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 95,58 L 95,149 C 93,179 120,168 123,154' },
      { d: 'M 78,94 L 120,94' }
    ]
  };
  LETTERS['u'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 70,93 L 70,142 C 68,188 107,164 112,150 C 123,133 123,102 124,93' },
      { d: 'M 124,93 L 124,155 C 123,164 133,181 147,157' }
    ]
  };
  LETTERS['v'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 69,92 L 100,167' },
      { d: 'M 100,167 L 131,92' }
    ]
  };
  LETTERS['w'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 45,92 L 70,167' },
      { d: 'M 70,167 L 100,92' },
      { d: 'M 100,92 L 129,167' },
      { d: 'M 129,167 L 155,92' }
    ]
  };
  LETTERS['x'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 70,92 L 131,169' },
      { d: 'M 131,92 L 68,169' }
    ]
  };
  LETTERS['y'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 71,92 L 71,142 C 69,177 97,171 107,160 C 114,151 127,128 126,92' },
      { d: 'M 126,92 L 126,195 C 125,225 116,227 101,230 C 85,228 81,225 72,216' }
    ]
  };
  LETTERS['z'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 75,94 L 127,94' },
      { d: 'M 127,94 L 75,165' },
      { d: 'M 75,166 L 130,166' }
    ]
  };

  // ── Accented character skeletons (Portuguese set) ────────────────────────────
  // These entries are placeholders — strokes:[] means the tracer shows the
  // fallback graphic and auto-completes, so the game still runs while stroke
  // paths are being authored via dev/playwrite-author.html.
  //
  // To author a glyph: open playwrite-author.html, load PlaywriteGBSGuides-Regular.ttf,
  // click the character, trace strokes, then paste the exported entry here to replace
  // the skeleton. All accented chars use coords:'display' (guide-line coordinate space).
  //
  // ViewBox conventions:
  //   Uppercase accented (Á Â Ã É Ê Ó Ô Ú Ç): VB_UP — accent fits in y=0..30 above cap line
  //   Lowercase accented (á â ã é ê ó ô ú ç):  VB_LOW — accent fits in y=65..90 above x-height

  // — Á / á ——————————————————————————————————————————————————————————————————
  LETTERS['Á'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['á'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Â / â ——————————————————————————————————————————————————————————————————
  LETTERS['Â'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['â'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ã / ã ——————————————————————————————————————————————————————————————————
  LETTERS['Ã'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ã'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — É / é ——————————————————————————————————————————————————————————————————
  LETTERS['É'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['é'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ê / ê ——————————————————————————————————————————————————————————————————
  LETTERS['Ê'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ê'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Í / í ——————————————————————————————————————————————————————————————————
  LETTERS['Í'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['í'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ó / ó ——————————————————————————————————————————————————————————————————
  LETTERS['Ó'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ó'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ô / ô ——————————————————————————————————————————————————————————————————
  LETTERS['Ô'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ô'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Õ / õ ——————————————————————————————————————————————————————————————————
  LETTERS['Õ'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['õ'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ú / ú ——————————————————————————————————————————————————————————————————
  LETTERS['Ú'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ú'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  // — Ç / ç ——————————————————————————————————————————————————————————————————
  // ç has a cedilla below the baseline; use VB_LOW for lowercase to give room.
  LETTERS['Ç'] = { viewBox: VB_UP,  coords: 'display', strokes: [] };
  LETTERS['ç'] = { viewBox: VB_LOW, coords: 'display', strokes: [] };

  APP.LETTERS = LETTERS;

  APP.getLetter = function (char) {
    return LETTERS[char] || null;
  };

  // Returns {a, b} — the y-axis linear transform for a character.
  // Transforms original DESIGN coordinates → current GUIDE_CONFIG positions.
  //   y_display = a * y_design + b
  //
  // Design ranges — the y coordinates used when these paths were authored.
  // These are FIXED and must not change even when guide positions are updated.
  // Changing GUIDE_CONFIG moves where guides render; these anchors describe
  // where the paths sit in design space so the transform maps them correctly.
  //
  //   Uppercase           : top=30,  base=220  (cap line → baseline)
  //   Lowercase ascenders : top=30,  base=210  (b d f h k l t)
  //   Lowercase default   : xh=100,  base=210  (paths top at x-height)
  //   Lowercase descenders: xh=100,  desc=240  (g j p q y — originally authored
  //                                              at old guide coords mid=100,low=240)
  //
  // DESIGN_COORDS are the fixed authored anchors for each group.
  // They never change. Only GUIDE_CONFIG.lines.*.y changes per font.
  const DESIGN_COORDS = {
    UP:   { s1: 30,  s2: 220 },  // uppercase
    ASC:  { s1: 30,  s2: 210 },  // ascending lowercase
    DEF:  { s1: 100, s2: 210 },  // default lowercase
    DESC: { s1: 100, s2: 240 },  // descending lowercase (authored at old mid=100, low=240)
  };

  APP.getLetterYTransform = function (char) {
    const gc  = APP.GUIDE_CONFIG;
    const top = gc.lines.top.y;
    const mid = gc.lines.middle.y;
    const bot = gc.lines.bottom.y;
    const low = gc.lines.lower.y;

    let s1, s2, t1, t2;
    if (APP.isUpperLetter(char)) {
      ({ s1, s2 } = DESIGN_COORDS.UP);   t1 = top; t2 = bot;
    } else if ('bdfhklt'.includes(char)) {
      ({ s1, s2 } = DESIGN_COORDS.ASC);  t1 = top; t2 = bot;
    } else if ('gjpqy'.includes(char)) {
      // Authored at old guide coords (mid=100, low=240). Pinning to those fixed
      // values means changing guide positions shifts/scales paths correctly.
      ({ s1, s2 } = DESIGN_COORDS.DESC); t1 = mid; t2 = low;
    } else {
      ({ s1, s2 } = DESIGN_COORDS.DEF);  t1 = mid; t2 = bot;
    }
    const a = (t2 - t1) / (s2 - s1);
    const b = t1 - a * s1;
    return { a, b };
  };

  // ── Font profile ──────────────────────────────────────────────────────────
  //
  // Documents which font's metrics were used to derive GUIDE_CONFIG below.
  // When switching fonts, run dev/playwrite-author.html → "Generate config"
  // to get a new FONT_PROFILE + GUIDE_CONFIG block to paste here.
  //
  // To add a new font:
  //   1. Open dev/playwrite-author.html and pick the new font's TTF file
  //   2. The guide-position table shows exact viewBox y values per metric
  //   3. Click "Generate config" → copy the output block
  //   4. Replace FONT_PROFILE and GUIDE_CONFIG below with the new block
  //   5. Re-author any stroke paths that land outside the new guide zones
  //
  APP.FONT_PROFILE = {
    name:            'Playwrite GB S Guides',
    file:            'PlaywriteGBSGuides-Regular.ttf',
    unitsPerEm:      1000,
    sCapHeight:       875,
    sxHeight:         500,
    sTypoAscender:   1275,
    sTypoDescender:  -375,
    // Scale factor: maps font units → viewBox units.
    // Derived by anchoring capHeight → y=30, baseline → y=170.
    // scale = (170 - 30) / sCapHeight = 140 / 875 ≈ 0.16
    scale:           0.16,
  };

  // ── Writing-line configuration ────────────────────────────────────────────
  //
  // Four horizontal reference lines rendered behind every letter SVG.
  // All y values are in the shared SVG coordinate space (viewBox width = 200).
  // Derived from FONT_PROFILE metrics:  y = 170 - fontUnits * scale
  //
  // Zone meanings
  //   top    – cap height; uppercase letters reach here; ascending lowercase too (b d f h k l t)
  //   middle – x-height;  regular lowercase letters reach here
  //   bottom – baseline;  all letters sit on this line
  //   lower  – descender; only g j p q y extend below bottom to reach here
  //
  // Tweakable per line
  //   y       – position in viewBox units  (change to move a line up/down)
  //   dash    – stroke-dasharray string    ('' = solid, '12 7' = dashes, '3 5' = dots)
  //   color   – overrides the default colour for just this line (optional)
  //   opacity – overrides the default opacity for just this line (optional)
  //
  // Global defaults (apply when a line doesn't override them)
  //   defaults.color   – line colour
  //   defaults.opacity – 0 = invisible, 1 = fully opaque
  //   defaults.width   – stroke thickness in viewBox units
  //
  APP.GUIDE_CONFIG = {
    defaults: {
      color:   '#b89a3a',   // warm amber
      opacity: 0.50,
      width:   2,
    },
    lines: {
      // expand: -1 = line shifts UP   by APP.TRACER_CONFIG.GUIDE_OFFSET (top-zone lines)
      // expand: +1 = line shifts DOWN by APP.TRACER_CONFIG.GUIDE_OFFSET (bottom-zone lines)
      // Set GUIDE_OFFSET to 0 in TRACER_CONFIG to restore exact centreline positions.
      top:    { y:  30, dash: '',     expand: -1 },  // cap height  — shifts up  to stroke top edge
      middle: { y:  90, dash: '12 7', expand: -1 },  // x-height    — shifts up  to stroke top edge
      bottom: { y: 170, dash: '',     expand:  1 },  // baseline    — shifts down to stroke bottom edge
      lower:  { y: 230, dash: '7 7',  expand:  1 },  // descender   — shifts down to stroke bottom edge
    }
  };
})(window.APP);

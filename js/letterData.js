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
  const VB_UP  = '0 0 200 270';
  const VB_LOW = '0 0 200 270'; // matches the 270-high viewBox used by all display-coord lowercase entries
  // Expanded viewBox for uppercase letters with above-accent marks (acute, grave, circumflex,
  // tilde, diaeresis, ring). Adds 60 units of headroom above y=0 so accent strokes (which can
  // reach y≈-12 as authored, then shifted up a further ACCENT_OFFSET_ABOVE units) are not
  // clipped. Total height 330 keeps the same physical canvas; letter body appears ~10% smaller.
  // If you increase ACCENT_OFFSET_ABOVE beyond ~25, also increase this pad accordingly.
  const VB_UP_ACCENT = '0 -60 200 330';

  const LETTERS = {};

  // ----- Uppercase -----
  LETTERS['A'] = { 
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
    { d: 'M 100,30 L 49,168' },
    { d: 'M 100,30 L 151,168' },
    { d: 'M 65,125 L 135,125' }
  ]};
  LETTERS['B'] = { 
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
    { d: 'M 69,34 L 69,165' },
    { d: 'M 69,34 L 106,34 C 121,34 139,39 140,61 C 140,72 125,95 101,95 L 69,95' },
    { d: 'M 69,96 L 102,96 C 146,100 147,123 146,132 C 144,153 120,166 101,166 L 69,166' }
  ]};
  LETTERS['C'] = {
    viewBox: '0 0 200 270',
     coords: 'display',
     strokes: [
    { d: 'M 146,46 C 101,9 67,52 62,69 C 55,91 55,123 67,144 C 88,177 125,179 151,140' }
  ]};
  LETTERS['D'] = { 
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
    { d: 'M 57,34 L 58,165' },
    { d: 'M 57,34 L 89,34 C 130,34 149,62 150,93 C 151,124 132,165 88,165 L 58,165' }
  ]};
  LETTERS['E'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 74,34 L 74,165' },
      { d: 'M 74,34 L 143,34' },
      { d: 'M 74,96 L 133,96' },
      { d: 'M 74,165 L 143,165' }
  ]};
  LETTERS['F'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 77,34 L 77,168' },
      { d: 'M 77,34 L 144,34' },
      { d: 'M 77,100 L 134,100' }
  ]};
  LETTERS['G'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 146,47 C 125,25 87,26 67,49 C 54,64 49,88 49,106 C 48,160 83,168 93,168 C 126,169 145,117 149,97' },
      { d: 'M 150,97 L 149,167' }
  ]};
  LETTERS['H'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 56,31 L 56,170' },
      { d: 'M 56,96 L 144,96' },
      { d: 'M 144,31 L 144,170' }
    ]};
  LETTERS['I'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,31 L 100,169' }
    ]};
  LETTERS['J'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 128,31 L 128,136 C 128,156 113,170 98,169 C 79,171 65,156 61,144' }
    ]};
  LETTERS['K'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 72,31 L 72,169' },
      { d: 'M 147,31 L 78,96' },
      { d: 'M 78,96 L 149,169' }
  ]};
  LETTERS['L'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 77,31 L 77,166' },
      { d: 'M 77,166 L 144,166' }
    ]};
  LETTERS['M'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 52,32 L 26,168' },
      { d: 'M 52,32 L 100,168' },
      { d: 'M 100,168 L 147,32' },
      { d: 'M 147,32 L 174,168' }
  ]};
  LETTERS['N'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 55,31 L 56,168' },
      { d: 'M 55,31 L 144,168' },
      { d: 'M 144,168 L 144,31' }
  ]};
  LETTERS['O'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,32 C 57,36 45,75 45,100 C 45,128 58,166 100,169 C 142,168 156,126 155,100 C 154,63 138,34 100,32' }
    ]};
  LETTERS['P'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 71,34 L 71,167' },
      { d: 'M 71,34 L 100,34 C 130,34 148,47 145,68 C 142,100 107,107 72,108' }
    ]};
  LETTERS['Q'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,32 C 57,36 45,75 45,100 C 45,128 58,166 100,169 C 142,168 156,126 155,100 C 154,63 138,34 100,32' },
      { d: 'M 103,147 L 135,193' }
  ]};
  LETTERS['R'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 72,34 L 71,167' },
      { d: 'M 72,34 C 138,31 140,48 140,66 C 136,95 108,99 72,102' },
      { d: 'M 75,102 L 144,167' }
    ]};
  LETTERS['S'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 136,47 C 113,20 72,32 68,53 C 61,79 83,93 109,101 C 153,115 140,156 122,164 C 101,176 75,165 61,152' }
    ]};
  LETTERS['T'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 50,34 L 150,34' },
      { d: 'M 100,34 L 100,170' }
    ]};
  LETTERS['U'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 55,31 L 54,119 C 52,144 62,168 82,168 C 130,167 144,103 144,83 L 144,31' },
      { d: 'M 144,31 L 144,168' }
    ]};
  LETTERS['V'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 50,31 L 100,168' },
      { d: 'M 100,168 L 150,31' }
    ]};
  LETTERS['W'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 12,31 L 53,168' },
      { d: 'M 53,168 L 100,31' },
      { d: 'M 100,31 L 146,168' },
      { d: 'M 146,168 L 188,31' }
    ]};
  LETTERS['X'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 58,31 L 143,169' },
      { d: 'M 143,31 L 56,169' }
    ]};
  LETTERS['Y'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 57,31 L 100,108' },
      { d: 'M 143,31 L 100,108' },
      { d: 'M 100,108 L 100,167' }
    ]};
  LETTERS['Z'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 62,34 L 139,34' },
      { d: 'M 139,34 L 59,166' },
      { d: 'M 59,166 L 143,166' }
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
      { d: 'M 97,53 L 97,53' }  // dot — equal coords so APP.isDot detects it correctly
    ]
  };
  LETTERS['j'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 99,92 L 99,209 C 100,235 78,231 71,221' },
      { d: 'M 99,53 L 99,53' }  // dot — equal coords so APP.isDot detects it correctly
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

  // ── Generic accent system ─────────────────────────────────────────────────
  //
  // Accent marks are defined once here. Each accent has two stroke-path arrays:
  //   upper — paths authored in VB_UP space (y=0..30 above cap line, x centred at 100)
  //   lower — paths authored in VB_LOW space (y=65..90 above x-height, x centred at 100)
  //
  // All paths use coords:'display' (guide-line coordinate space, no transform applied).
  //
  // To author accent strokes:
  //   1. Open dev/playwrite-author.html, load PlaywriteGBSGuides-Regular.ttf
  //   2. Pick the accented glyph (e.g. Á), trace only the accent portion
  //   3. Paste the resulting stroke `d` strings into the appropriate upper/lower array
  //
  // Cedilla hangs below the C baseline, so its upper strokes occupy y=220..260 and
  // its lower strokes occupy y=210..250 (below baseline in VB_UP / VB_LOW respectively).
  //
  // strokes:[] means the accent is not yet authored — the base letter is traced
  // alone (graceful degradation) while paths are pending.
  // above:true  — accent sits above the letter body (acute, grave, circumflex, tilde,
  //               diaeresis, ring). ACCENT_OFFSET_ABOVE shifts these upward at render time
  //               to reduce overlap with thick strokes, and VB_UP_ACCENT expands the canvas.
  // above:false — accent sits below baseline (cedilla). No upward shift or canvas expansion.
  APP.ACCENTS = {
    acute:      { above: true,  upper: [{ d: 'M 91,16 L 117,-7' }], lower: [{ d: 'M 90,67 L 111,40' }] },  // ´
    circumflex: { above: true,  upper: [{ d: 'M 75,16 L 100,-6' }, { d: 'M 100,-6 L 125,16' }],
                                lower: [{ d: 'M 74,67 L 98,41' },  { d: 'M 98,41 L 121,67' }] },            // ^
    tilde:      { above: true,  upper: [{ d: 'M 75,11 C 76,1 82,-11 102,6 C 115,17 126,10 124,-4' }],
                                lower: [{ d: 'M 73,62 C 75,48 80,40 100,56 C 115,67 122,60 122,47' }] },    // ~
    grave:      { above: true,  upper: [{ d: 'M 82,-7 L 109,16' }], lower: [{ d: 'M 84,40 L 106,67' }] },  // `
    cedilla:    { above: false, upper: [{ d: 'M 109,169 L 101,187' }, { d: 'M 101,187 C 126,180 128,219 93,206' }],
                                lower: [{ d: 'M 103,170 L 96,187' }, { d: 'M 96,187 C 128,185 115,219 88,206' }] }, // ¸
    diaeresis:  { above: true,  upper: [{ d: 'M 80,6 L 80,6' }, { d: 'M 120,6 L 120,6' }],
                                lower: [{ d: 'M 80,52 L 80,52' }, { d: 'M 116,52 L 116,52' }] },           // ¨
    ring:       { above: true,  upper: [{ d: 'M 100,-12 C 78,-12 78,18 100,18 C 122,18 122,-12 100,-12' }],
                                lower: [{ d: 'M 98,37 C 75,37 75,69 98,70 C 120,69 120,37 98,37' }] },     // °
  };

  // ── Accented character references ─────────────────────────────────────────
  // Each entry points to a base letter and an accent type.
  // APP.getLetter() composes them at runtime — no duplicate stroke data needed.
  // To add a new accented character, append one line here.
  LETTERS['Á'] = { base: 'A', accent: 'acute' };
  LETTERS['á'] = { base: 'a', accent: 'acute' };
  LETTERS['Â'] = { base: 'A', accent: 'circumflex' };
  LETTERS['â'] = { base: 'a', accent: 'circumflex' };
  LETTERS['Ã'] = { base: 'A', accent: 'tilde' };
  LETTERS['ã'] = { base: 'a', accent: 'tilde' };
  LETTERS['É'] = { base: 'E', accent: 'acute' };
  LETTERS['é'] = { base: 'e', accent: 'acute' };
  LETTERS['Ê'] = { base: 'E', accent: 'circumflex' };
  LETTERS['ê'] = { base: 'e', accent: 'circumflex' };
  LETTERS['Î'] = { base: 'I', accent: 'circumflex' };
  LETTERS['î'] = { base: 'i', accent: 'circumflex' };
  LETTERS['Í'] = { base: 'I', accent: 'acute' };
  LETTERS['í'] = { base: 'i', accent: 'acute' };
  LETTERS['Ó'] = { base: 'O', accent: 'acute' };
  LETTERS['ó'] = { base: 'o', accent: 'acute' };
  LETTERS['Ô'] = { base: 'O', accent: 'circumflex' };
  LETTERS['ô'] = { base: 'o', accent: 'circumflex' };
  LETTERS['Õ'] = { base: 'O', accent: 'tilde' };
  LETTERS['õ'] = { base: 'o', accent: 'tilde' };
  LETTERS['Û'] = { base: 'U', accent: 'circumflex' };
  LETTERS['û'] = { base: 'u', accent: 'circumflex' };
  LETTERS['Ú'] = { base: 'U', accent: 'acute' };
  LETTERS['ú'] = { base: 'u', accent: 'acute' };
  LETTERS['Ç'] = { base: 'C', accent: 'cedilla' };
  LETTERS['ç'] = { base: 'c', accent: 'cedilla' };

  // ── Grave accent ──────────────────────────────────────────────────────────
  LETTERS['À'] = { base: 'A', accent: 'grave' };
  LETTERS['à'] = { base: 'a', accent: 'grave' };
  LETTERS['È'] = { base: 'E', accent: 'grave' };
  LETTERS['è'] = { base: 'e', accent: 'grave' };
  LETTERS['Ì'] = { base: 'I', accent: 'grave' };
  LETTERS['ì'] = { base: 'i', accent: 'grave' };
  LETTERS['Ò'] = { base: 'O', accent: 'grave' };
  LETTERS['ò'] = { base: 'o', accent: 'grave' };
  LETTERS['Ù'] = { base: 'U', accent: 'grave' };
  LETTERS['ù'] = { base: 'u', accent: 'grave' };

  // ── Diaeresis (umlaut) ────────────────────────────────────────────────────
  LETTERS['Ä'] = { base: 'A', accent: 'diaeresis' };
  LETTERS['ä'] = { base: 'a', accent: 'diaeresis' };
  LETTERS['Ë'] = { base: 'E', accent: 'diaeresis' };
  LETTERS['ë'] = { base: 'e', accent: 'diaeresis' };
  LETTERS['Ï'] = { base: 'I', accent: 'diaeresis' };
  LETTERS['ï'] = { base: 'i', accent: 'diaeresis' };
  LETTERS['Ö'] = { base: 'O', accent: 'diaeresis' };
  LETTERS['ö'] = { base: 'o', accent: 'diaeresis' };
  LETTERS['Ü'] = { base: 'U', accent: 'diaeresis' };
  LETTERS['ü'] = { base: 'u', accent: 'diaeresis' };

  // ── Ring ──────────────────────────────────────────────────────────────────
  LETTERS['Å'] = { base: 'A', accent: 'ring' };
  LETTERS['å'] = { base: 'a', accent: 'ring' };

  // ── Tilde on N (Spanish) ──────────────────────────────────────────────────
  LETTERS['Ñ'] = { base: 'N', accent: 'tilde' };
  LETTERS['ñ'] = { base: 'n', accent: 'tilde' };

  // ── Ligatures & special characters ───────────────────────────────────────
  // These cannot be expressed as base+accent; each needs its own authored strokes.
  // strokes:[] = graceful degradation until paths are authored in the dev tool.
  LETTERS['Æ'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,33 L 31,167' },
      { d: 'M 104,33 L 106,167' },
      { d: 'M 104,33 L 167,33' },
      { d: 'M 67,100 L 155,100' },
      { d: 'M 106,167 L 167,167' }
    ]};
  LETTERS['æ'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 111,98 C 73,79 47,99 44,126 C 40,161 60,175 69,169 C 91,163 99,116 110,99' },
      { d: 'M 104,138 C 143,137 165,110 157,103 C 136,75 95,97 104,138 C 111,179 145,175 161,151' }
    ]};
  LETTERS['Œ'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 123,96 C 124,52 90,31 70,32 C 26,35 16,78 17,96 C 18,144 35,165 70,168 C 113,167 124,123 123,96' },
      { d: 'M 123,34 L 123,167' },
      { d: 'M 123,34 L 192,34' },
      { d: 'M 123,96 L 183,96' },
      { d: 'M 123,167 L 192,167' }
    ] };
  LETTERS['œ'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 103,129 C 104,106 87,89 72,91 C 54,92 42,108 43,130 C 43,159 60,170 73,169 C 99,166 104,144 103,130' },
      { d: 'M 104,139 C 148,133 157,115 157,106 C 157,93 143,90 132,92 C 106,94 99,128 108,152 C 115,171 144,178 161,151' }
    ] };
  LETTERS['ß'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 70,229 L 70,79 C 67,57 79,31 103,30 C 132,32 136,50 133,67 C 128,85 114,89 95,92' },
      { d: 'M 96,93 C 134,95 139,120 139,134 C 140,163 109,178 86,164' }
    ]};
  LETTERS['Ø'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,32 C 56,35 45,67 45,100 C 45,157 85,170 102,169 C 149,165 155,114 155,102 C 157,63 136,34 100,32' },
      { d: 'M 144,24 L 56,178' }
    ]};
  LETTERS['ø'] = {
    viewBox: '0 0 200 270',
    coords: 'display',
    strokes: [
      { d: 'M 100,91 C 84,91 68,106 69,130 C 69,151 79,169 100,169 C 123,169 132,146 131,128 C 130,105 117,91 100,91' },
      { d: 'M 127,83 L 72,178' }
    ]};

  APP.LETTERS = LETTERS;

  // ── Path y-shift helper ────────────────────────────────────────────────────
  // Shifts all y-coordinates in an absolute SVG path `d` string by `dy` units.
  // Only handles absolute M, L, C, Q — which covers all game stroke paths.
  // Used to apply ACCENT_OFFSET_ABOVE to above-letter accent strokes at runtime.
  function shiftPathY(d, dy) {
    if (!dy) return d;
    return d.replace(/([MLCQ])([^MLCQZmlcqz]*)/g, function (_, cmd, coords) {
      const nums = coords.trim().split(/[\s,]+/).filter(Boolean).map(Number);
      const out  = [];
      for (let i = 0; i < nums.length; i++) {
        // Coordinates alternate x, y — shift only y (odd index)
        out.push(i % 2 === 0 ? nums[i] : +(nums[i] + dy).toFixed(1));
      }
      return cmd + ' ' + out.join(',');
    });
  }

  // Resolve a character to its letter definition, composing base + accent strokes
  // for accented characters. Returns null if the character is unknown.
  APP.getLetter = function (char) {
    const entry = LETTERS[char];
    if (!entry) return null;

    // Accented character: compose base strokes + accent strokes at runtime.
    if (entry.base !== undefined) {
      const baseDef = LETTERS[entry.base];
      if (!baseDef) return null;

      const accentDef = APP.ACCENTS && APP.ACCENTS[entry.accent];
      const isUpper   = APP.isUpperLetter(char);
      const rawAccent = accentDef
        ? (isUpper ? (accentDef.upper || []) : (accentDef.lower || []))
        : [];

      // For above-letter accents (acute, grave, tilde, etc.), shift the stroke
      // paths upward by ACCENT_OFFSET_ABOVE to reduce overlap with thick letter
      // strokes. Cedilla (above:false) is never shifted — it sits below baseline.
      const isAbove = accentDef && accentDef.above;
      const cfg     = APP.TRACER_CONFIG;
      const dy      = (isAbove && cfg && cfg.ACCENT_OFFSET_ABOVE)
        ? -cfg.ACCENT_OFFSET_ABOVE
        : 0;
      const accentStrokes = dy
        ? rawAccent.map(s => ({ d: shiftPathY(s.d, dy) }))
        : rawAccent;

      // Uppercase above-accent characters need extra canvas headroom above y=0.
      // VB_UP_ACCENT extends the viewBox to y=-60, accommodating the authored
      // positions (some reach y≈-12) plus the upward shift.
      const viewBox = (isUpper && isAbove) ? VB_UP_ACCENT : baseDef.viewBox;

      return {
        viewBox,
        coords:  baseDef.coords,
        strokes: [...baseDef.strokes, ...accentStrokes],
      };
    }

    return entry;
  };

  // ── Session-level viewBox ─────────────────────────────────────────────────
  // Returns one viewBox string to use for ALL letters in the current session
  // (accented or not), so the canvas never shifts size between individual letters.
  //
  // Logic: if any character in the current locale's animal names is an above-accent
  // uppercase char (acute, grave, tilde, circumflex, diaeresis, ring), ALL uppercase
  // letters in this session use VB_UP_ACCENT. Lowercase accents fit within the
  // standard viewBox so they always use VB_LOW.
  //
  // Called by tracer.js and letters.js instead of data.viewBox.
  APP.getSessionViewBox = function (isUpper) {
    if (!isUpper) return VB_LOW;  // lowercase accents (y≈37-70) fit within 0..270

    // Scan the current locale's animal names for any above-accent uppercase character.
    const list = (APP.animals && APP.animals.eligibleAll()) || APP.ANIMALS || [];
    const needsAccentPad = list.some(function (animal) {
      return animal.name.split('').some(function (ch) {
        // Animal names are stored uppercase (per CLAUDE.md) — ch is already uppercase.
        const entry = LETTERS[ch];
        if (!entry || entry.accent === undefined) return false;
        const accentDef = APP.ACCENTS && APP.ACCENTS[entry.accent];
        return accentDef && accentDef.above === true;
      });
    });

    return needsAccentPad ? VB_UP_ACCENT : VB_UP;
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

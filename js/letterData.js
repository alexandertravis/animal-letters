window.APP = window.APP || {};

// Each letter is a list of strokes drawn in order. Each stroke is an SVG path `d`.
// The tracer renders these thick to form the letter's visible shape (no separate outline path).
// Coordinate system per letter:
//   Uppercase: viewBox 0 0 200 240, baseline y=220, cap line y=30.
//   Lowercase: viewBox 0 0 200 240, ascender top y=30, x-height top y=110, baseline y=210, descender to y=240.
(function (APP) {
  const VB_UP  = '0 0 200 240';
  const VB_LOW = '0 0 200 240';

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
    { d: 'M 70,30 L 130,30' },
    { d: 'M 100,30 L 100,220' },
    { d: 'M 70,220 L 130,220' }
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
    { d: 'M 150,220 L 150,30' }
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
    { d: 'M 130,170 L 180,225' }
  ]};
  LETTERS['R'] = { viewBox: VB_UP, strokes: [
    { d: 'M 50,30 L 50,220' },
    { d: 'M 50,30 Q 160,30 160,80 Q 160,125 50,125' },
    { d: 'M 90,125 L 165,220' }
  ]};
  LETTERS['S'] = { viewBox: VB_UP, strokes: [
    { d: 'M 165,55 Q 90,15 50,80 Q 30,140 100,150 Q 170,160 150,200 Q 130,235 50,210' }
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
  LETTERS['a'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 145,140 Q 145,100 90,100 Q 40,100 40,160 Q 40,210 90,210 Q 145,210 145,170' },
    { d: 'M 145,100 L 145,210' }
  ]};
  LETTERS['b'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,30 L 50,210' },
    { d: 'M 50,160 Q 50,100 100,100 Q 155,100 155,155 Q 155,210 100,210 Q 50,210 50,160' }
  ]};
  LETTERS['c'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 150,120 Q 50,90 50,160 Q 50,230 150,200' }
  ]};
  LETTERS['d'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 150,160 Q 150,100 100,100 Q 45,100 45,155 Q 45,210 100,210 Q 150,210 150,160' },
    { d: 'M 150,30 L 150,210' }
  ]};
  LETTERS['e'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,160 L 145,160 Q 145,100 90,100 Q 40,100 40,160 Q 40,215 145,200' }
  ]};
  LETTERS['f'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 150,40 Q 100,30 100,80 L 100,210' },
    { d: 'M 70,110 L 140,110' }
  ]};
  LETTERS['g'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 145,140 Q 145,100 90,100 Q 40,100 40,160 Q 40,210 90,210 Q 145,210 145,170' },
    { d: 'M 145,100 L 145,225 Q 145,245 80,238' }
  ]};
  LETTERS['h'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,30 L 50,210' },
    { d: 'M 50,140 Q 80,100 110,100 Q 150,100 150,150 L 150,210' }
  ]};
  LETTERS['i'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 100,55 L 100,57' },
    { d: 'M 100,110 L 100,210' }
  ]};
  LETTERS['j'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 130,55 L 130,57' },
    { d: 'M 130,110 L 130,210 Q 130,238 70,235' }
  ]};
  LETTERS['k'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,30 L 50,210' },
    { d: 'M 150,110 L 50,170' },
    { d: 'M 90,150 L 160,210' }
  ]};
  LETTERS['l'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 100,30 L 100,210' }
  ]};
  LETTERS['m'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 30,110 L 30,210' },
    { d: 'M 30,110 Q 70,90 100,130 L 100,210' },
    { d: 'M 100,130 Q 130,90 170,110 L 170,210' }
  ]};
  LETTERS['n'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,110 L 50,210' },
    { d: 'M 50,110 Q 100,90 150,130 L 150,210' }
  ]};
  LETTERS['o'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 100,100 Q 40,100 40,160 Q 40,220 100,220 Q 160,220 160,160 Q 160,100 100,100' }
  ]};
  LETTERS['p'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,110 L 50,240' },
    { d: 'M 50,210 Q 50,100 100,100 Q 160,100 160,155 Q 160,210 100,210 Q 50,210 50,160' }
  ]};
  LETTERS['q'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 150,210 Q 150,100 100,100 Q 40,100 40,155 Q 40,210 100,210 Q 150,210 150,160' },
    { d: 'M 150,110 L 150,240' }
  ]};
  LETTERS['r'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,110 L 50,210' },
    { d: 'M 50,140 Q 80,90 140,110' }
  ]};
  LETTERS['s'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 150,115 Q 90,90 50,135 Q 30,170 100,180 Q 165,190 145,210 Q 120,225 50,210' }
  ]};
  LETTERS['t'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 100,50 L 100,200 Q 100,215 130,210' },
    { d: 'M 60,110 L 140,110' }
  ]};
  LETTERS['u'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,110 L 50,180 Q 50,210 100,210 Q 150,210 150,180 L 150,110' }
  ]};
  LETTERS['v'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 30,110 L 100,210' },
    { d: 'M 170,110 L 100,210' }
  ]};
  LETTERS['w'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 20,110 L 60,210' },
    { d: 'M 60,210 L 100,140' },
    { d: 'M 100,140 L 140,210' },
    { d: 'M 140,210 L 180,110' }
  ]};
  LETTERS['x'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 40,110 L 160,210' },
    { d: 'M 160,110 L 40,210' }
  ]};
  LETTERS['y'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 50,110 L 100,200' },
    { d: 'M 150,110 L 80,238' }
  ]};
  LETTERS['z'] = { viewBox: VB_LOW, strokes: [
    { d: 'M 40,110 L 160,110' },
    { d: 'M 160,110 L 40,210' },
    { d: 'M 40,210 L 160,210' }
  ]};

  APP.LETTERS = LETTERS;

  APP.getLetter = function (char) {
    return LETTERS[char] || null;
  };
})(window.APP);

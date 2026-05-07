/**
 * tests/letterData.test.js
 *
 * Schema completeness checks for js/letterData.js.
 * Verifies that all 52 glyphs (A–Z, a–z) are present and correctly shaped.
 * Also checks APP.getLetter() and validates the APP.ANIMALS array.
 *
 * Modules are loaded by tests/setup.js. Tests read from global.APP.
 */

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
const ALL_LETTERS = [...UPPERCASE, ...LOWERCASE];

// ---------------------------------------------------------------------------
// APP.LETTERS — glyph definitions
// ---------------------------------------------------------------------------
describe('APP.LETTERS', () => {
  it('defines all 26 uppercase letters A–Z', () => {
    for (const ch of UPPERCASE) {
      expect(APP.LETTERS, `Expected APP.LETTERS['${ch}'] to be defined`).toHaveProperty(ch);
    }
  });

  it('defines all 26 lowercase letters a–z', () => {
    for (const ch of LOWERCASE) {
      expect(APP.LETTERS, `Expected APP.LETTERS['${ch}'] to be defined`).toHaveProperty(ch);
    }
  });

  it('gives every glyph a non-empty viewBox string', () => {
    for (const ch of ALL_LETTERS) {
      const glyph = APP.LETTERS[ch];
      expect(typeof glyph.viewBox, `${ch}.viewBox should be a string`).toBe('string');
      expect(glyph.viewBox.length, `${ch}.viewBox should not be empty`).toBeGreaterThan(0);
    }
  });

  it('gives every glyph at least one stroke', () => {
    for (const ch of ALL_LETTERS) {
      const glyph = APP.LETTERS[ch];
      expect(Array.isArray(glyph.strokes), `${ch}.strokes should be an array`).toBe(true);
      expect(glyph.strokes.length, `${ch} should have at least one stroke`).toBeGreaterThan(0);
    }
  });

  it('gives every stroke a non-empty d property', () => {
    for (const ch of ALL_LETTERS) {
      const glyph = APP.LETTERS[ch];
      for (let i = 0; i < glyph.strokes.length; i++) {
        const stroke = glyph.strokes[i];
        expect(typeof stroke.d, `${ch} stroke[${i}].d should be a string`).toBe('string');
        expect(stroke.d.length, `${ch} stroke[${i}].d should not be empty`).toBeGreaterThan(0);
      }
    }
  });
});

// ---------------------------------------------------------------------------
// APP.getLetter
// ---------------------------------------------------------------------------
describe('APP.getLetter', () => {
  it('returns the correct glyph for a known character', () => {
    const glyph = APP.getLetter('A');
    expect(glyph).toBe(APP.LETTERS['A']);
  });

  it('returns null for an unknown character', () => {
    expect(APP.getLetter('1')).toBeNull();
    expect(APP.getLetter('!')).toBeNull();
    expect(APP.getLetter('')).toBeNull();
  });

  it('returns the correct glyph for a lowercase character', () => {
    const glyph = APP.getLetter('a');
    expect(glyph).not.toBeNull();
    expect(glyph).toBe(APP.LETTERS['a']);
  });
});

// ---------------------------------------------------------------------------
// APP.getLetterYTransform — four branches
// ---------------------------------------------------------------------------
describe('APP.getLetterYTransform', () => {
  // GUIDE_CONFIG: top.y=30, middle.y=100, bottom.y=170, lower.y=240

  it('uppercase branch (e.g. "A"): maps y=30→top(30), y=220→bottom(170)', () => {
    const { a, b } = APP.getLetterYTransform('A');
    // a = (170-30)/(220-30) = 140/190 ≈ 0.7368...
    // b = 30 - a*30 ≈ 7.894...
    expect(a).toBeCloseTo(140 / 190, 10);
    expect(b).toBeCloseTo(30 - (140 / 190) * 30, 10);
  });

  it('lowercase ascender branch (e.g. "b"): maps y=30→top(30), y=210→bottom(170)', () => {
    const { a, b } = APP.getLetterYTransform('b');
    // a = (170-30)/(210-30) = 140/180 ≈ 0.7778...
    // b = 30 - a*30 ≈ 6.667...
    expect(a).toBeCloseTo(140 / 180, 10);
    expect(b).toBeCloseTo(30 - (140 / 180) * 30, 10);
  });

  it('lowercase descender branch (e.g. "g"): identity transform — a=1, b=0', () => {
    const { a, b } = APP.getLetterYTransform('g');
    expect(a).toBe(1);
    expect(b).toBe(0);
  });

  it('lowercase descender branch (e.g. "j"): identity transform — a=1, b=0', () => {
    const { a, b } = APP.getLetterYTransform('j');
    expect(a).toBe(1);
    expect(b).toBe(0);
  });

  it('lowercase descender branch (e.g. "p"): identity transform — a=1, b=0', () => {
    const { a, b } = APP.getLetterYTransform('p');
    expect(a).toBe(1);
    expect(b).toBe(0);
  });

  it('lowercase default branch (e.g. "a"): maps y=100→middle(100), y=210→bottom(170)', () => {
    const { a, b } = APP.getLetterYTransform('a');
    // a = (170-100)/(210-100) = 70/110 ≈ 0.6364...
    // b = 100 - a*100 ≈ 36.364...
    expect(a).toBeCloseTo(70 / 110, 10);
    expect(b).toBeCloseTo(100 - (70 / 110) * 100, 10);
  });
});

// ---------------------------------------------------------------------------
// APP.GUIDE_CONFIG — schema check
// ---------------------------------------------------------------------------
describe('APP.GUIDE_CONFIG', () => {
  it('exists with a defaults object and a lines object', () => {
    expect(APP.GUIDE_CONFIG).toBeDefined();
    expect(typeof APP.GUIDE_CONFIG.defaults).toBe('object');
    expect(typeof APP.GUIDE_CONFIG.lines).toBe('object');
  });

  it('defaults has string color, numeric opacity, and numeric width', () => {
    const { defaults } = APP.GUIDE_CONFIG;
    expect(typeof defaults.color).toBe('string');
    expect(typeof defaults.opacity).toBe('number');
    expect(typeof defaults.width).toBe('number');
  });

  it('lines has top, middle, bottom, lower — each with a numeric y property', () => {
    const { lines } = APP.GUIDE_CONFIG;
    for (const key of ['top', 'middle', 'bottom', 'lower']) {
      expect(lines, `lines.${key} should exist`).toHaveProperty(key);
      expect(typeof lines[key].y, `lines.${key}.y should be a number`).toBe('number');
    }
  });
});

// ---------------------------------------------------------------------------
// APP.ANIMALS — data schema checks
// ---------------------------------------------------------------------------
describe('APP.ANIMALS', () => {
  it('every entry has the required fields: name, displayName, images, audio', () => {
    for (const animal of APP.ANIMALS) {
      expect(animal, `animal should have a name`).toHaveProperty('name');
      expect(animal, `animal should have a displayName`).toHaveProperty('displayName');
      expect(animal, `animal should have images`).toHaveProperty('images');
      expect(animal.images, `animal.images should have cartoon`).toHaveProperty('cartoon');
      expect(animal.images, `animal.images should have realistic`).toHaveProperty('realistic');
      expect(animal, `animal should have audio`).toHaveProperty('audio');
    }
  });

  it('every animal name is uppercase and contains only A–Z characters', () => {
    for (const animal of APP.ANIMALS) {
      expect(/^[A-Z]+$/.test(animal.name), `"${animal.name}" should match /^[A-Z]+$/`).toBe(true);
    }
  });
});

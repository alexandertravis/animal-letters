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
      expect(animal.name, `"${animal.name}" should be a non-empty string`).toBeTruthy();
      expect(/^[A-Z]+$/.test(animal.name), `"${animal.name}" should match /^[A-Z]+$/`).toBe(true);
    }
  });
});

/**
 * tests/utils.test.js
 *
 * Unit tests for js/utils.js — covers APP.caseOf(), APP.isDot(),
 * APP.dotTransformPos(), and APP.launchConfetti().
 *
 * Modules are loaded by tests/setup.js. Tests read from global.APP.
 */

import { DOT_STROKE_PATH, NORMAL_STROKE_PATH } from './fixtures.js';

// ---------------------------------------------------------------------------
// APP.caseOf
// ---------------------------------------------------------------------------
describe('APP.caseOf', () => {
  it('returns full uppercase string when letterCase is "upper"', () => {
    APP.state.settings.letterCase = 'upper';
    expect(APP.caseOf('cat')).toBe('CAT');
  });

  it('returns full lowercase string when letterCase is "lower"', () => {
    APP.state.settings.letterCase = 'lower';
    expect(APP.caseOf('CAT')).toBe('cat');
  });

  it('capitalises only the first letter when letterCase is "proper"', () => {
    APP.state.settings.letterCase = 'proper';
    expect(APP.caseOf('CAT')).toBe('Cat');
  });
});

// ---------------------------------------------------------------------------
// APP.isDot
// ---------------------------------------------------------------------------
describe('APP.isDot', () => {
  it('returns true for a zero-length dot path (M x,y L x,y with identical coordinates)', () => {
    expect(APP.isDot(DOT_STROKE_PATH)).toBe(true);
  });

  it('returns false for a normal multi-point path', () => {
    expect(APP.isDot(NORMAL_STROKE_PATH)).toBe(false);
  });

  it('returns true for a dot path with space-separated coordinates', () => {
    expect(APP.isDot('M 100 56 L 100 56')).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// APP.dotTransformPos
// ---------------------------------------------------------------------------
describe('APP.dotTransformPos', () => {
  it('returns the correct {x, y} after applying scale and transform parameters', () => {
    // DOT_STROKE_PATH = 'M 100,56 L 100,56'
    // xScale=0.85, xOffset=15, tA=0.9, tB=10
    // expected x = 0.85 * 100 + 15 = 100
    // expected y = 0.9  *  56 + 10 = 60.4
    const result = APP.dotTransformPos(DOT_STROKE_PATH, 0.85, 15, 0.9, 10);
    expect(result).not.toBeNull();
    expect(result.x).toBeCloseTo(100, 5);
    expect(result.y).toBeCloseTo(60.4, 5);
  });

  it('returns null for an invalid path string', () => {
    const result = APP.dotTransformPos('invalid', 1, 0, 1, 0);
    expect(result).toBeNull();
  });

  it('returns the same {x, y} for space-separated coordinates as for comma-separated', () => {
    // 'M 100 56 L 100 56' should parse identically to 'M 100,56 L 100,56'
    const commaSep = APP.dotTransformPos('M 100,56 L 100,56', 0.85, 15, 0.9, 10);
    const spaceSep = APP.dotTransformPos('M 100 56 L 100 56', 0.85, 15, 0.9, 10);
    expect(spaceSep).not.toBeNull();
    expect(spaceSep.x).toBeCloseTo(commaSep.x, 5);
    expect(spaceSep.y).toBeCloseTo(commaSep.y, 5);
  });
});

// ---------------------------------------------------------------------------
// APP.launchConfetti
// ---------------------------------------------------------------------------
describe('APP.launchConfetti', () => {
  it('returns a cancel function', () => {
    // jsdom supports document.createElement("canvas") and getContext returns null,
    // but launchConfetti only needs requestAnimationFrame to schedule the first draw.
    // We stub requestAnimationFrame so the animation never actually fires.
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 42));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const cancel = APP.launchConfetti();

    expect(typeof cancel).toBe('function');

    // Call cancel to avoid any lingering canvas/raf state.
    cancel();
  });

  it('appends a canvas to the body and removes it when the cancel handle is called', () => {
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 42));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const cancel = APP.launchConfetti();

    // Canvas should be in the DOM after launch.
    expect(document.body.querySelector('canvas')).not.toBeNull();

    cancel();

    // Canvas should be removed after cancel.
    expect(document.body.querySelector('canvas')).toBeNull();
  });
});

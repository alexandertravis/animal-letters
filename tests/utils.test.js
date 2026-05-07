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

  it('accepts custom opts (count, duration) and still returns a function and appends a canvas', () => {
    vi.stubGlobal('requestAnimationFrame', vi.fn(() => 42));
    vi.stubGlobal('cancelAnimationFrame', vi.fn());

    const cancel = APP.launchConfetti({ count: 5, duration: 100 });

    expect(typeof cancel).toBe('function');
    expect(document.body.querySelector('canvas')).not.toBeNull();

    cancel();
  });
});

// ---------------------------------------------------------------------------
// APP.svgEl
// ---------------------------------------------------------------------------
describe('APP.svgEl', () => {
  const SVG_NS = 'http://www.w3.org/2000/svg';

  it('creates an element in the SVG namespace', () => {
    const el = APP.svgEl('circle');
    expect(el.namespaceURI).toBe(SVG_NS);
  });

  it('returns an element with the correct tag name', () => {
    const el = APP.svgEl('rect');
    expect(el.tagName).toBe('rect');
  });

  it('applies attributes correctly', () => {
    const el = APP.svgEl('circle', { cx: '100', cy: '50', r: '10' });
    expect(el.getAttribute('cx')).toBe('100');
    expect(el.getAttribute('cy')).toBe('50');
    expect(el.getAttribute('r')).toBe('10');
  });

  it('sets textContent when provided as third argument', () => {
    const el = APP.svgEl('text', {}, 'Hello');
    expect(el.textContent).toBe('Hello');
  });

  it('does not set textContent when third argument is omitted', () => {
    const el = APP.svgEl('text', {});
    expect(el.textContent).toBe('');
  });
});

// ---------------------------------------------------------------------------
// APP.addGuidelines
// ---------------------------------------------------------------------------
describe('APP.addGuidelines', () => {
  // GUIDE_CONFIG has 4 lines: top, middle, bottom, lower — none hidden by default.
  // addGuidelines uses line.y directly (no y-transform applied) for x1/x2 from viewBox.

  it('appends the correct number of <line> elements (one per non-hidden guide line)', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    expect(g).not.toBeNull();
    // All 4 lines in GUIDE_CONFIG are visible by default.
    const visibleCount = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden).length;
    expect(g.querySelectorAll('line').length).toBe(visibleCount);
  });

  it('does not append hidden guide lines', () => {
    // Temporarily mark the top line as hidden.
    const origTop = APP.GUIDE_CONFIG.lines.top.hidden;
    APP.GUIDE_CONFIG.lines.top.hidden = true;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    const visibleCount = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden).length;
    expect(g.querySelectorAll('line').length).toBe(visibleCount);

    // Restore.
    if (origTop === undefined) delete APP.GUIDE_CONFIG.lines.top.hidden;
    else APP.GUIDE_CONFIG.lines.top.hidden = origTop;
  });

  it('appended lines use y1 and y2 equal to the guide line y value', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    const lines = [...g.querySelectorAll('line')];
    const visibleLines = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden);

    lines.forEach((lineEl, i) => {
      const expectedY = String(visibleLines[i].y);
      expect(lineEl.getAttribute('y1')).toBe(expectedY);
      expect(lineEl.getAttribute('y2')).toBe(expectedY);
    });
  });

  it('lines use the correct stroke color from GUIDE_CONFIG defaults when no per-line color is set', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    const lines = [...g.querySelectorAll('line')];
    const visibleLines = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden);

    lines.forEach((lineEl, i) => {
      const lineConfig = visibleLines[i];
      const expectedColor = lineConfig.color ?? APP.GUIDE_CONFIG.defaults.color;
      expect(lineEl.getAttribute('stroke')).toBe(expectedColor);
    });
  });
});

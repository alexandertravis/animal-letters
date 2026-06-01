/**
 * tests/utils.test.js
 *
 * Unit tests for js/utils.js — covers APP.caseOf(), APP.isDot(),
 * APP.dotTransformPos(), and APP.launchConfetti().
 *
 * Modules are loaded by tests/setup.js. Tests read from global.APP.
 */

import { DOT_STROKE_PATH, NORMAL_STROKE_PATH, makeAnimal } from './fixtures.js';

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

  it('returns false when coordinates differ by more than the 4-unit tolerance', () => {
    // Distance of 5 units exceeds the < 4 threshold → not a dot.
    expect(APP.isDot('M 100,56 L 100,61')).toBe(false);
  });

  it('returns true for a near-zero path within the 4-unit tolerance', () => {
    // Distance of 1 unit is < 4 → treated as a dot (handles authoring-tool off-by-one).
    expect(APP.isDot('M 100,56 L 100,57')).toBe(true);
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

    // Use try/finally so cancel() always runs even if an assertion throws,
    // preventing a canvas leak that would affect subsequent tests.
    try {
      // Canvas should be in the DOM after launch.
      expect(document.body.querySelector('canvas')).not.toBeNull();
    } finally {
      cancel();
    }

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

  it('appended lines use y1 and y2 with the guide offset applied', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // No isUpper argument → lowercase offset (GUIDE_OFFSET_LOW).
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    const lines = [...g.querySelectorAll('line')];
    const visibleLines = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden);
    const cfg = APP.TRACER_CONFIG;
    const offset = cfg ? (cfg.GUIDE_OFFSET_LOW || 0) : 0;

    lines.forEach((lineEl, i) => {
      const expectedY = String(visibleLines[i].y + (visibleLines[i].expand || 0) * offset);
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

  it('sets stroke-dasharray on dashed lines and omits it on solid lines', () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    APP.addGuidelines(svg, '0 0 200 250');

    const g = svg.querySelector('g.writing-guidelines');
    const lines = [...g.querySelectorAll('line')];
    const visibleLines = Object.values(APP.GUIDE_CONFIG.lines).filter(l => !l.hidden);

    lines.forEach((lineEl, i) => {
      const dash = visibleLines[i].dash;
      if (dash) {
        expect(lineEl.getAttribute('stroke-dasharray')).toBe(dash);
      } else {
        const attr = lineEl.getAttribute('stroke-dasharray');
        expect(!attr || attr === '').toBe(true);
      }
    });
  });
});

// ---------------------------------------------------------------------------
// APP.isStoryUnlocked
// ---------------------------------------------------------------------------
describe('APP.isStoryUnlocked', () => {
  // Helper: build a minimal story object with the given requirements array.
  function makeStory(requirements) {
    return { id: 'test', title: 'Test', requirements, pages: [] };
  }

  beforeEach(() => {
    // Start with a clean slate for completion counts.
    APP.state.animalCompletionCounts = {};
  });

  it('returns false for null or a story with no requirements field', () => {
    expect(APP.isStoryUnlocked(null)).toBe(false);
    expect(APP.isStoryUnlocked(undefined)).toBe(false);
    expect(APP.isStoryUnlocked({ id: 'x' })).toBe(false);
  });

  it('returns true for a story with an empty requirements array (vacuously unlocked)', () => {
    expect(APP.isStoryUnlocked(makeStory([]))).toBe(true);
  });

  it('returns false when a single requirement is not yet met', () => {
    APP.state.animalCompletionCounts = { bear: 2 };
    const story = makeStory([{ animalId: 'bear', minCount: 3 }]);

    expect(APP.isStoryUnlocked(story)).toBe(false);
  });

  it('returns true when a single requirement is exactly met', () => {
    APP.state.animalCompletionCounts = { bear: 3 };
    const story = makeStory([{ animalId: 'bear', minCount: 3 }]);

    expect(APP.isStoryUnlocked(story)).toBe(true);
  });

  it('returns true when a single requirement is exceeded', () => {
    APP.state.animalCompletionCounts = { bear: 5 };
    const story = makeStory([{ animalId: 'bear', minCount: 3 }]);

    expect(APP.isStoryUnlocked(story)).toBe(true);
  });

  it('returns false when any one of multiple requirements is not met', () => {
    APP.state.animalCompletionCounts = { pig: 3, wolf: 0 };
    const story = makeStory([
      { animalId: 'pig',  minCount: 3 },
      { animalId: 'wolf', minCount: 1 },
    ]);

    expect(APP.isStoryUnlocked(story)).toBe(false);
  });

  it('returns true when all multiple requirements are met', () => {
    APP.state.animalCompletionCounts = { pig: 3, wolf: 1 };
    const story = makeStory([
      { animalId: 'pig',  minCount: 3 },
      { animalId: 'wolf', minCount: 1 },
    ]);

    expect(APP.isStoryUnlocked(story)).toBe(true);
  });

  it('returns false when the animal has never been completed (key absent from counts)', () => {
    APP.state.animalCompletionCounts = {}; // bear not in counts at all
    const story = makeStory([{ animalId: 'bear', minCount: 1 }]);

    expect(APP.isStoryUnlocked(story)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// APP.animalStars
// ---------------------------------------------------------------------------
describe('APP.animalStars', () => {
  // makeAnimal is not imported here — construct inline since utils.test.js
  // only imports fixtures for dot/stroke paths.
  function makeAnimalFor(id) {
    return {
      name: id.toUpperCase(),
      displayName: id.charAt(0).toUpperCase() + id.slice(1),
      images: { cartoon: `assets/images/cartoon/${id}.svg`, realistic: `assets/images/realistic/${id}.jpg` },
      audio: `assets/audio/${id}.mp3`,
    };
  }

  beforeEach(() => {
    APP.state.animalCompletionCounts = {};
  });

  it('returns 0 stars when the animal has never been completed', () => {
    const animal = makeAnimalFor('cat');
    expect(APP.animalStars(animal)).toBe(0);
  });

  it('returns 1 star after 1 completion', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 1;
    expect(APP.animalStars(animal)).toBe(1);
  });

  it('returns 1 star after 2 completions (boundary below 3)', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 2;
    expect(APP.animalStars(animal)).toBe(1);
  });

  it('returns 2 stars after exactly 3 completions', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 3;
    expect(APP.animalStars(animal)).toBe(2);
  });

  it('returns 2 stars after 4 completions (boundary below 5)', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 4;
    expect(APP.animalStars(animal)).toBe(2);
  });

  it('returns 3 stars after exactly 5 completions', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 5;
    expect(APP.animalStars(animal)).toBe(3);
  });

  it('returns 3 stars for any count above 5', () => {
    const animal = makeAnimalFor('cat');
    APP.state.animalCompletionCounts['cat'] = 99;
    expect(APP.animalStars(animal)).toBe(3);
  });
});

// ---------------------------------------------------------------------------
// APP.animalId
// ---------------------------------------------------------------------------
describe('APP.animalId', () => {
  it('extracts the filename stem from the cartoon image path', () => {
    const animal = makeAnimal({ images: { cartoon: 'assets/images/cartoon/dog.svg' } });
    expect(APP.animalId(animal)).toBe('dog');
  });

  it('returns the same id for two animals that share an image file', () => {
    const en = makeAnimal({ name: 'DOG',  images: { cartoon: 'assets/images/cartoon/dog.svg' } });
    const pt = makeAnimal({ name: 'GATO', images: { cartoon: 'assets/images/cartoon/dog.svg' } });
    expect(APP.animalId(en)).toBe(APP.animalId(pt));
  });

  it('handles nested path segments correctly', () => {
    const animal = makeAnimal({ images: { cartoon: 'assets/images/cartoon/rabbit.svg' } });
    expect(APP.animalId(animal)).toBe('rabbit');
  });
});

// ---------------------------------------------------------------------------
// APP.starsHtml
// ---------------------------------------------------------------------------
describe('APP.starsHtml', () => {
  it('returns empty stars when filled=0 and total=0 (defaults total to 3)', () => {
    const html = APP.starsHtml(0, 0);
    expect(html).toContain('star-empty');
    expect(html).not.toContain('star-filled');
  });

  it('produces the correct number of star spans for all filled', () => {
    const html = APP.starsHtml(3, 3);
    const fullCount = (html.match(/star-full/g) || []).length;
    const emptyCount = (html.match(/star-empty/g) || []).length;
    expect(fullCount).toBe(3);
    expect(emptyCount).toBe(0);
  });

  it('produces the correct number of star spans for none filled', () => {
    const html = APP.starsHtml(0, 3);
    const fullCount = (html.match(/star-full/g) || []).length;
    const emptyCount = (html.match(/star-empty/g) || []).length;
    expect(fullCount).toBe(0);
    expect(emptyCount).toBe(3);
  });

  it('produces the correct split for partially filled (2 of 3)', () => {
    const html = APP.starsHtml(2, 3);
    const fullCount = (html.match(/star-full/g) || []).length;
    const emptyCount = (html.match(/star-empty/g) || []).length;
    expect(fullCount).toBe(2);
    expect(emptyCount).toBe(1);
  });

  it('defaults total to 3 when omitted', () => {
    const html = APP.starsHtml(1);
    const fullCount = (html.match(/star-full/g) || []).length;
    const emptyCount = (html.match(/star-empty/g) || []).length;
    expect(fullCount).toBe(1);
    expect(emptyCount).toBe(2);
  });

  it('uses the ★ glyph (U+2605) for both full and empty stars', () => {
    const html = APP.starsHtml(1, 2);
    const starChars = (html.match(/★/g) || []).length;
    expect(starChars).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// APP.getUnlockedStories
// ---------------------------------------------------------------------------
describe('APP.getUnlockedStories', () => {
  afterEach(() => { delete APP.STORIES; });

  it('returns an empty array when APP.STORIES is undefined', () => {
    delete APP.STORIES;
    expect(APP.getUnlockedStories()).toEqual([]);
  });

  it('returns an empty array when APP.STORIES is empty', () => {
    APP.STORIES = [];
    expect(APP.getUnlockedStories()).toEqual([]);
  });

  it('returns only stories whose requirements are met', () => {
    APP.state.animalCompletionCounts = { cat: 2 };
    APP.STORIES = [
      { id: 'locked',   requirements: [{ animalId: 'cat', minCount: 5 }], pages: [] },
      { id: 'unlocked', requirements: [{ animalId: 'cat', minCount: 1 }], pages: [] },
    ];
    const result = APP.getUnlockedStories();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('unlocked');
  });

  it('returns a story with empty requirements (vacuously unlocked)', () => {
    APP.STORIES = [{ id: 'free', requirements: [], pages: [] }];
    const result = APP.getUnlockedStories();
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('free');
  });

  it('returns all stories when all requirements are met', () => {
    APP.state.animalCompletionCounts = { cat: 5, dog: 3 };
    APP.STORIES = [
      { id: 'a', requirements: [{ animalId: 'cat', minCount: 5 }], pages: [] },
      { id: 'b', requirements: [{ animalId: 'dog', minCount: 3 }], pages: [] },
    ];
    const result = APP.getUnlockedStories();
    expect(result).toHaveLength(2);
  });
});

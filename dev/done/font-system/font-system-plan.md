# font-system — Plan

## Goal

Replace the hand-authored geometric letter shapes in `js/letterData.js` with
glyphs rendered directly from the Quicksand variable font, and lay the
architectural groundwork so that (a) the font can be swapped out in future with
minimal code change, and (b) the game can be extended to support accented
European characters without redesigning the coordinate system.

## Motivation

- The current letter shapes are hand-drawn SVG paths that approximate geometric
  letterforms. They are visually inconsistent with any real typeface and require
  substantial manual effort to author each new glyph (including any accented
  character needed for language extension).
- Quicksand (OFL licensed, 808 glyphs) covers all Western and Central European
  Latin scripts (U+0020–017E + Latin Extended Additional), making it an
  excellent single-font solution for the initial language-extension target.
- Using the font's own glyph outlines as the clip mask gives children a
  canonical, high-quality letterform to colour in — matching what they see in
  books and classroom materials.
- Designing a font-system abstraction layer now means a future swap to a
  different typeface (e.g. a child's handwriting font, a sans-serif, a
  locale-specific font) requires changing one config object and the font file,
  not 52+ hand-authored glyph records.

## Approach

### Letter rendering — SVG text clip mask

The chosen approach uses an SVG `<text>` element (Quicksand, font-weight 600)
as the `<clipPath>` mask that confines the child's ink to the letter interior:

```
<clipPath id="letter-clip">
  <text x="100" y="baseline" font-family="Quicksand" font-size="N"
        font-weight="600" text-anchor="middle">A</text>
</clipPath>
```

The ink canvas (the child's drawing) and the ghost layer (faint letter outline)
are both clipped to this path. The visual letter shape is therefore the real
Quicksand glyph — automatic for any character the font supports.

This approach avoids pre-extracting path data from the TTF (no build step) and
is naturally swappable (change `font-family` in one place).

### Stroke guide paths

The hand-authored stroke paths in `letterData.js` are **retained** as stroke
guides — they define the order and direction the child traces, not the shape.
They are NOT used for the clip mask or the ghost layer after this change.

Each guide path must be checked to ensure it falls entirely within the
corresponding Quicksand glyph outline. Some paths will need adjustment
because the geometric shapes in the current data do not always match the
Quicksand letterforms (e.g. S, G, Q).

### Font system abstraction

A single `APP.FONT_CONFIG` object in a new file `js/fontConfig.js` captures
all font-specific parameters:

```js
APP.FONT_CONFIG = {
  family:     'Quicksand',
  weight:     600,
  file:       'assets/fonts/Quicksand-VariableFont_wght.ttf',
  // SVG rendering dimensions
  fontSize:   185,          // px, tuned so uppercase fills viewBox vertically
  baselineUC: 210,          // y in viewBox for uppercase baseline
  baselineLC: 210,          // y for standard lowercase baseline
  // viewBox dimensions
  viewBoxW:   200,
  viewBoxH:   270,          // taller than current 250 to accommodate accents
  viewBoxH_accent: 300,     // extra-tall viewBox for accented characters
};
```

`tracer.js` and `letters.js` read from `APP.FONT_CONFIG` instead of hardcoding
values. To swap the font: update the `family` and `file` fields, re-tune
`fontSize` / `baseline`, and the entire game re-renders with the new typeface.

### Language extension — coordinate system changes

The current viewBox (200×250 uppercase, 200×268 lowercase) has no room above
the cap-height (y=30) for diacritical marks. Accented capital letters (É, Ñ,
Ö) need ~30–40 SVG units of headroom above the letter.

Changes required:
- **New viewBox:** 200×300 for accented characters, 200×270 for unaccented.
  `getLetterViewBox(char)` returns the appropriate dimensions.
- **GUIDE_CONFIG update:** add an `accent` guideline at y≈15 (visual reference
  for where accent marks sit above cap-height).
- **Hidden accent line by default:** shown automatically when the current
  character is accented (detected by Unicode range U+00C0–017E).

No changes to the tracer's coordinate mapping logic — the SVG viewBox handles
the scaling automatically.

## Phases

### Phase 1 — Font foundation
1. Copy font files to `assets/fonts/`
2. Add `@font-face` declaration in `styles.css`
3. Apply Quicksand to all UI text (buttons, headings, name strip, tiles)
4. Create `js/fontConfig.js` with `APP.FONT_CONFIG`
5. Add `fontConfig.js` to `index.html` load order (before `tracer.js`)
6. Verify font renders correctly in browser on both mobile and desktop

### Phase 2 — SVG clip mask integration
1. In `tracer.js`: replace the thickened-stroke `<mask>` with an SVG
   `<clipPath>` containing a `<text>` element using Quicksand
2. Replace the ghost layer strokes with a `<text>` ghost (same font, low
   opacity, no clip)
3. Remove the per-glyph outline rendering from `tracer.js` — the font handles it
4. Confirm ink is correctly clipped to the Quicksand glyph outline

### Phase 3 — Stroke guide audit and alignment
1. Open the `letters.js` review screen — visually compare each guide path
   against the Quicksand letter shape for all 52 glyphs
2. Identify and fix any guide strokes that overshoot the Quicksand outline
3. Pay particular attention to: S, G, Q, g, s, a (these diverged most from the
   current geometric shapes)
4. Re-run the 102-test suite — confirm all tests still pass

### Phase 4 — Accent viewBox and guidelines
1. Update `getLetterViewBox(char)` to return 200×300 for U+00C0–017E
2. Add `accent` line to `APP.GUIDE_CONFIG` (y≈15, hidden by default)
3. Auto-show the accent line in `tracer.js` when the character is accented
4. Update `letters.js` review screen to render accented chars in the taller
   viewBox

### Phase 5 — First language pack: European accented letters
1. Add stroke guide paths for the most common accented characters:
   - French: à â é è ê î ô ù û ü ç œ (+ uppercase variants)
   - Spanish: á é í ó ú ü ñ (+ uppercase)
   - German: ä ö ü ß
2. Extend `data/animals.js` schema to support non-ASCII animal names
3. Verify each new glyph renders correctly in the review screen
4. Add a small set of test animals using accented names to confirm end-to-end

## Known risks / constraints

- **Font loading timing:** `@font-face` fonts load asynchronously. The tracer
  must not mount until the font is ready. Use `document.fonts.ready` promise
  in `main.js` before calling the initial `route()`.
- **`<clipPath>` and `<text>`:** Some browsers historically had issues with
  text inside `<clipPath>`. All modern browsers (Chrome 80+, Safari 14+, FF
  75+) handle this correctly. Test on actual iOS Safari before shipping.
- **Stroke guides inside glyph bounds:** Not all of the existing 52 guide paths
  will land perfectly inside Quicksand's letterforms — the audit in Phase 3 is
  not optional. A guide stroke that pokes outside the clip area will be
  invisible to the child, breaking the tracing UX.
- **SVG font metrics vary by platform:** `<text>` positioning (baseline,
  ascender height) uses the font's built-in metrics. The `baseline` value in
  `APP.FONT_CONFIG` will need empirical tuning per glyph category.
- **Lowercase dot characters (i, j) with accents (ï, î, ì):** The existing
  special-case rendering for i/j dots will need extending for accented variants.
- **No breaking changes to letterData.js shape:** Tests in `tests/letterData.test.js`
  check that all 52 entries exist with valid stroke paths. The stroke data
  stays — tests will continue to pass.

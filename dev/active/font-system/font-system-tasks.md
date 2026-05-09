# font-system — Tasks

## Section 1 — Housekeeping & Branch Setup
- [x] Move `dev/active/add-tests/` → `dev/done/add-tests/`
- [x] Tag stable release `v1.0.0` on `main`
- [x] Create `feature/font-system` branch from `main`
- [x] Create `dev/active/font-system/` dev docs

## Section 2 — Font Foundation
- [ ] Copy `Quicksand-VariableFont_wght.ttf` to `assets/fonts/`
- [ ] Add `@font-face` in `styles.css` (family name, file path, weight range,
      `font-display: swap`)
- [ ] Apply `font-family: 'Quicksand'` to UI text (body, buttons, headings,
      name strip tiles, gallery tile names)
- [ ] Create `js/fontConfig.js` — `APP.FONT_CONFIG` object with:
      - `family`, `weight`, `file`
      - `fontSize` (SVG units, tune so uppercase fills viewBox)
      - `baselineUC`, `baselineLC`, `baselineAscender`, `baselineDescender`
      - `viewBoxW`, `viewBoxH`, `viewBoxH_accent`
- [ ] Add `fontConfig.js` to `index.html` load order (after `letterData.js`,
      before `utils.js`)
- [ ] Gate initial `route()` in `main.js` behind `document.fonts.ready` promise
- [ ] Verify Quicksand renders correctly on desktop Chrome, iOS Safari, Android Chrome

## Section 3 — SVG Clip Mask Integration (tracer.js)
- [ ] Replace the thickened-stroke `<mask>` in `tracer.js` with a
      `<clipPath id="letter-clip"><text>` using Quicksand
- [ ] Set `<text>` attributes from `APP.FONT_CONFIG`:
      `font-family`, `font-size`, `font-weight`, `x`, `y`, `text-anchor="middle"`
- [ ] Replace ghost layer strokes with a `<text>` ghost element (same font,
      low opacity, no clip)
- [ ] Remove per-glyph stroke outline rendering from tracer layers (mask and
      ghost no longer use `letterData.js` stroke paths for shape)
- [ ] Confirm ink canvas is correctly clipped to the Quicksand glyph outline
- [ ] Confirm `destroy()` cleans up the new element structure correctly
- [ ] Test A, B, C, a, b, c, i, j manually in browser (including dot rendering)

## Section 4 — Sync letters.js Review Screen
- [ ] Apply the same `<clipPath><text>` approach to `js/screens/letters.js`
      so the review screen faithfully matches in-game rendering
- [ ] Update ghost rendering in `letters.js` to use `<text>` element
- [ ] Confirm review screen still shows all 52 glyphs correctly

## Section 5 — Stroke Guide Audit (Phase 3)
Open the "Letter Patterns" review screen, scroll through all 52 glyphs,
compare stroke guide paths against the Quicksand letter shapes.
- [ ] **Uppercase A–Z audit** — check all 26; note any that overshoot
- [ ] **Lowercase a–z audit** — check all 26; note any that overshoot
- [ ] Fix any guide paths that fall outside the Quicksand glyph outline
      (priority: S, G, Q, g, s, a — these diverge most from geometric shapes)
- [ ] Re-run `npm test` — confirm all 102 tests still pass after guide adjustments
- [ ] Document which glyphs were adjusted in the Decisions Log

## Section 6 — Accent ViewBox & Guidelines (Phase 4)
- [ ] Add `getLetterViewBox(char)` helper to `letterData.js`:
      - Returns `{ w: 200, h: 300 }` for U+00C0–017E (accented range)
      - Returns `{ w: 200, h: 270 }` for standard ASCII characters
- [ ] Add `accent` line to `APP.GUIDE_CONFIG` (y≈15, hidden by default)
- [ ] In `tracer.js` and `letters.js`: call `getLetterViewBox(char)` to set
      the SVG `viewBox` attribute dynamically
- [ ] Auto-show the accent guideline when the current character codepoint is
      in the accented range (U+00C0–017E)
- [ ] Update `js/fontConfig.js` with accent-character baseline offset
- [ ] Test with manually entered accented characters in the review screen

## Section 7 — First Language Pack: Western European Accents
- [ ] Add stroke guide paths for French characters:
      à â é è ê î ô ù û ü ç œ (lowercase)
      À Â É È Ê Î Ô Ù Û Ü Ç Œ (uppercase)
- [ ] Add stroke guide paths for Spanish characters:
      á é í ó ú ü ñ (lowercase)
      Á É Í Ó Ú Ü Ñ (uppercase)
- [ ] Add stroke guide paths for German characters:
      ä ö ü ß (lowercase)
      Ä Ö Ü (uppercase)
- [ ] Verify each new glyph in the review screen
- [ ] Add 2–3 test animals using accented names to `data/animals.js`
      (e.g. a French animal to verify end-to-end flow)
- [ ] Confirm gallery, complete screen, name strip all handle accented names

## Section 8 — Test Coverage Extension
- [ ] Update `tests/letterData.test.js` to include accented character entries
      (loop over expected accented chars, verify same schema as A–Z)
- [ ] Add integration test: accented animal runs through startGame →
      advanceLetter cycle without errors
- [ ] Run full test suite — confirm all tests pass

## Section 9 — Pre-commit & Merge
- [ ] Run `/pre-commit` across all changed files
- [ ] Fix any blocking issues found
- [ ] Push `feature/font-system` to origin
- [ ] Open PR to merge into `main`
- [ ] Update `CLAUDE.md` to reflect the new font-based rendering approach
      and `APP.FONT_CONFIG` config object

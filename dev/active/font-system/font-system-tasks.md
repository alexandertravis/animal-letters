# font-system — Tasks

## Section 1 — Housekeeping & Branch Setup
- [x] Move `dev/active/add-tests/` → `dev/done/add-tests/`
- [x] Tag stable release `v1.0.0` on `main`
- [x] Create `feature/font-system` branch from `main`
- [x] Create `dev/active/font-system/` dev docs

## Section 2 — Font Foundation
- [x] Copy `Quicksand-VariableFont_wght.ttf` to `assets/fonts/`
- [x] Add `@font-face` in `styles.css` (family name, file path, weight range,
      `font-display: block` — changed from swap to correctly hold fonts.ready)
- [x] Apply `font-family: 'Quicksand'` to UI text (body, buttons, headings,
      name strip tiles, gallery tile names)
- [x] Create `js/fontConfig.js` — `APP.FONT_CONFIG` object with:
      - `family`, `weight`, `file`
      - `fontSizeUC/LC/Ascender/Descender` (calibrated to guide positions)
      - `baselineUC`, `baselineLC`, `baselineAscender`, `baselineDescender`
      - `viewBoxW`, `viewBoxH`, `viewBoxHAccent`
- [x] Add `fontConfig.js` to `index.html` load order (after `letterData.js`,
      before `utils.js`)
- [x] Gate initial `route()` in `main.js` behind `document.fonts.ready` promise
- [x] Extract real Quicksand OS/2 metrics via dev/font-metrics.ps1 and update
      FONT_CONFIG with exact values (fontSizeUC=200, fontSizeLC=139,
      fontSizeDescender=186, baselineDescender=193.5)
- [ ] Verify Quicksand renders correctly on desktop Chrome, iOS Safari, Android Chrome

## Section 3 — SVG Clip Mask Integration (tracer.js)
- [x] Replace the thickened-stroke `<mask>` in `tracer.js` with a
      `<clipPath id="letter-clip"><text>` using Quicksand
- [x] Set `<text>` attributes from `APP.FONT_CONFIG` via `APP.getFontPos()`:
      `font-family`, `font-size`, `font-weight`, `x`, `y`, `text-anchor="middle"`
- [x] Replace ghost layer strokes with a `<text>` ghost element (same font,
      dark border via `paint-order:stroke fill`, light fill, no clip)
- [x] Remove per-glyph stroke outline rendering from tracer layers (mask and
      ghost no longer use `letterData.js` stroke paths for shape)
- [x] Confirm ink canvas is correctly clipped to the Quicksand glyph outline
- [x] Confirm `destroy()` cleans up the new element structure correctly
      (`stageEl.innerHTML=''` removes the SVG including defs/clipPath)
- [ ] Test A, B, C, a, b, c, i, j manually in browser (including dot rendering)

## Section 4 — Sync letters.js Review Screen
- [x] Apply the same `<clipPath><text>` approach to `js/screens/letters.js`
      so the review screen faithfully matches in-game rendering
- [x] Update ghost rendering in `letters.js` to use `<text>` element
- [ ] Confirm review screen still shows all 52 glyphs correctly

## Section 5 — Stroke Guide Audit (Phase 3)
Use `dev/stroke-author.html` to check each letter. Red overflow = path exits
glyph; coloured (clipped) layer = what child actually sees in game.
- [x] **Uppercase A–Z audit** — A, D, E, I, Q, S, T, U visually confirmed;
      I simplified to 1 stroke (no serifs in Quicksand); Q tail repositioned
      to M 130,155 L 168,195 to stay inside clip boundary
- [ ] **Uppercase A–Z audit** — complete remaining letters (B, C, F, G, H, J,
      K, L, M, N, O, P, R, V, W, X, Y, Z)
- [x] **Lowercase a–z audit** — a, b, f, g, h, i, j, n, p, q, r, s, v, y, z
      visually confirmed; all sit correctly in x-height / descender zones
- [ ] **Lowercase a–z audit** — complete remaining letters (c, d, e, k, l, m,
      o, t, u, w, x)
- [ ] Fix any guide paths still found outside the Quicksand glyph outline
- [x] Re-run `npm test` — all 102 tests pass
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

## Section 5b — Dev Tooling
- [x] `dev/font-metrics.ps1` — extracts OS/2 metrics from any TTF, prints exact
      FONT_CONFIG values to copy into fontConfig.js
- [x] `dev/stroke-author.html` — visual overlay: font glyph + guide lines +
      stroke paths; red = overflow (clipped away); coloured = what child sees;
      toggle layers; stroke path text selectable; keyboard navigation

## Section 9 — Pre-commit & Merge
- [ ] Run `/pre-commit` across all changed files
- [ ] Fix any blocking issues found
- [ ] Push `feature/font-system` to origin
- [ ] Open PR to merge into `main`
- [ ] Update `CLAUDE.md` to reflect the new font-based rendering approach
      and `APP.FONT_CONFIG` config object

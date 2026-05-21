# font-system — Context

## Key Files

| File | Role |
|---|---|
| `assets/fonts/` | (to create) Font files. Use variable font for single-file deployment. |
| `js/fontConfig.js` | (to create) `APP.FONT_CONFIG` — single source of truth for all font parameters. Swapping fonts = editing this file. |
| `js/tracer.js` | Core change: replace thickened-stroke `<mask>` with `<clipPath><text>`. Remove per-glyph outline rendering. |
| `js/letterData.js` | Stroke guide paths retained. `viewBox` field updated for accented characters. New `getLetterViewBox(char)` helper. |
| `js/utils.js` | `addGuidelines()` may need accent-line support. `APP.GUIDE_CONFIG` gains an `accent` line entry. |
| `js/screens/letters.js` | Review screen — must use same clip approach as tracer for faithful rendering. Also needs taller viewBox for accented chars. |
| `styles.css` | `@font-face` declaration + Quicksand applied to all UI text. |
| `index.html` | Script load order: `fontConfig.js` must load before `tracer.js`. `document.fonts.ready` gate before initial `route()`. |
| `data/animals.js` | Schema extension needed to support non-ASCII animal names (displayName already works; `name` field currently ASCII-only). |
| `tests/letterData.test.js` | No changes expected — stroke data remains. Must pass throughout. |

## Font Details

- **Font:** Quicksand Variable Font (`Quicksand-VariableFont_wght.ttf`)
- **License:** SIL Open Font License (OFL) — free for commercial use, can be
  bundled in the app
- **Glyph count:** 808
- **Key coverage:**
  - U+0020–007E: Basic Latin (A–Z, a–z, digits, punctuation)
  - U+00A0–017E: Latin-1 Supplement + Latin Extended-A (entire range, single
    cmap segment). Covers: French, Spanish, German, Italian, Portuguese,
    Polish, Czech, Slovak, Romanian, Turkish, Scandinavian, Hungarian,
    Latvian, Lithuanian — all accented characters confirmed present.
  - U+1EA0–1EF9: Latin Extended Additional (Vietnamese)
  - Greek: only π (U+03C0) — Greek alphabet NOT usable
  - Cyrillic: NOT present
- **Variable axis:** `wght` (Light → Bold). Use weight 600 for tracing glyphs
  — thick enough to trace comfortably; Bold (700) for headings.
- **Static fallbacks:** `static/Quicksand-Regular.ttf` etc. available if
  variable font is not supported (all modern browsers support variable fonts).

## Decisions Log

2026-05-10 - Decision: `font-display: block` (not swap). With swap, browsers
             resolve `document.fonts.ready` after only a 100 ms block period
             regardless of whether the font actually loaded. Block holds the
             promise until the font loads or times out (~3 s), which is required
             for the Phase 2 `<clipPath><text>` gate to be effective.

2026-05-10 - Decision: Separate fontSizeUC / fontSizeLC / fontSizeAscender /
             fontSizeDescender (not collapsed to one value). Uppercase and ascender
             letters fill the full cap zone (y=30→170, fontSize=200); standard
             lowercase fills only the x-height zone (y=100→170, fontSize=139);
             descenders need a third size (fontSize=186, baseline=193.5) to
             position both bowl and tail relative to the guides. All values
             derived from real OS/2 font metrics via dev/font-metrics.ps1.

2026-05-10 - Decision: FONT_CONFIG values must come from real OS/2 font metrics,
             not estimates. Estimated xHeightRatio=0.56 gave fontSizeLC=125 and
             produced visibly undersized lowercase glyphs. Real ratio (0.503 from
             OS/2 sxHeight=503/UPM=1000) gives fontSizeLC=139 — all lowercase
             letters now sit correctly in the x-height zone. For future font swaps:
             run dev/font-metrics.ps1 to regenerate the four fontSize values.

2026-05-10 - Decision: `APP.getFontPos(char)` in utils.js (not local to tracer/
             letters). Centralises character → font-size/baseline dispatch so
             adding a new character group is a one-file change.

2026-05-09 - Decision: Use Quicksand variable font (not static weights) for
             deployment — single file, weight range accessible via CSS
             `font-weight`. Use `Quicksand-VariableFont_wght.ttf`.

2026-05-09 - Decision: SVG `<clipPath><text>` approach for letter mask (not
             pre-extracted path data, not canvas). Reasons: no build step, font
             is automatically swappable by changing `font-family`, works for
             any character the font supports (critical for language extension).

2026-05-09 - Decision: Stroke guide paths in `letterData.js` are retained as
             tracing guides. They define stroke order and direction, not letter
             shape. The font provides the shape; the stroke data provides the
             choreography.

2026-05-09 - Decision: `APP.FONT_CONFIG` abstraction object in new
             `js/fontConfig.js`. All font-specific numeric constants (fontSize,
             baseline y, viewBox dimensions) live there. Swapping fonts = one
             file change.

2026-05-09 - Decision: viewBox extended to 200×300 for accented characters
             (U+00C0–017E). `getLetterViewBox(char)` returns the appropriate
             size. Standard 200×270 (slightly taller than current 250) for
             unaccented glyphs.

2026-05-09 - Decision: Language extension starts with Western/Central European
             accented Latin (French, Spanish, German) — all covered by Quicksand
             U+00A0–017E. Greek and Cyrillic are out of scope for this font.

2026-05-09 - Decision: `document.fonts.ready` gate added to `main.js` before
             initial `route()` call. Prevents tracer mounting before Quicksand
             is loaded (otherwise `<clipPath><text>` renders in fallback font).

## Constraints & Gotchas

- **`<clipPath>` + `<text>` browser support:** Works in all modern browsers.
  Test specifically on iOS Safari 14+ (historically the most problematic).
  Known to work correctly in Chrome 80+, Firefox 75+, Safari 14+.

- **`document.fonts.ready` is a Promise:** `main.js` currently calls `route()`
  synchronously. This must change to:
  ```js
  document.fonts.ready.then(() => route());
  ```
  Adds a small startup delay (font parse time) but prevents unstyled letter
  flash. Consider adding a loading indicator.

- **Stroke guide path bounds checking is manual:** There is no automated way to
  verify a stroke path falls inside a Quicksand glyph outline. The Phase 3
  audit uses the `letters.js` review screen visually. Strokes that overshoot
  become invisible to the child because the clip mask cuts them off.

- **Baseline position varies by character category:** Uppercase, standard
  lowercase, ascender-group, descender-group — each needs a different `y`
  value for the `<text>` element. `APP.FONT_CONFIG` should expose per-category
  baseline values, not a single number.

- **i/j dots and accented dot-carrying letters (ï, ì, î):** The existing
  dot special-case (zero-length M x,y L x,y path → rendered as `<circle>` in
  transform-free overlay) will need extending. Accented i variants carry an
  accent above the x-height but no dot — this may require per-character
  overrides in the stroke data.

- **Non-ASCII animal `name` field:** Currently `name` is uppercase ASCII
  (e.g. "CAT"). For French "ÉLÉPHANT" or German "BÄR", the `name` field must
  support Unicode uppercase. `APP.caseOf()` uses `toUpperCase()` which is
  Unicode-aware, so this works automatically. The `pickRandom` / `pickNext`
  functions use `a.name.length` — Unicode `.length` counts UTF-16 code units,
  which is correct for all European characters (no surrogates in U+00A0–017E).

- **`letterData.js` test coverage:** `tests/letterData.test.js` checks all
  52 entries (A–Z, a–z) by iterating expected keys. New accented character
  entries will not be covered by the existing loop — add a separate test or
  expand the loop once entries are added.

- **Font file size:** `Quicksand-VariableFont_wght.ttf` is 127 KB. Acceptable
  for web. Using `font-display: block` (not swap) to ensure `document.fonts.ready`
  correctly gates the first render. Slow connections see a brief blank screen
  (max ~3 s browser timeout) before the app loads.

- **FONT_CONFIG values derived from real OS/2 metrics (not estimated):**
  Quicksand OS/2 table (version 4): unitsPerEm=1000, sCapHeight=700, sxHeight=503,
  sTypoDescender=-250. Ratios: capHeight=0.70, xHeight=0.503, descender=0.25.
  NOTE: The OS/2 table has `sxHeight` at byte offset +86 and `sCapHeight` at +88
  from the table start — off-by-two from what one might expect reading the spec;
  `dev/font-metrics.ps1` now uses the correct offsets.
  Computed FONT_CONFIG values that place guides exactly on target lines:
    fontSizeUC=200   (cap-top = 170 − 200×0.70 = 30 ✓)
    fontSizeLC=139   (x-top   = 170 − 139×0.503 = 100 ✓)
    fontSizeDescender=186, baselineDescender=193.5
                     (x-top = 100 ✓, tail = 240 ✓)
  The old estimated xHeightRatio of 0.56 gave fontSizeLC=125, which caused
  the lowercase letters to render noticeably too small, misaligning guides.

- **clipPath coordinate system:** The `<clipPath><text>` is positioned in SVG display
  space (FONT_CONFIG coordinates). The stroke guide paths (letterTransform group) are
  also mapped to display space via `getLetterYTransform`. These two systems should
  broadly overlap; Phase 3 audit confirms alignment letter by letter.

- **Phase 2 APP.getFontPos() helper:** Added to `utils.js`. Returns `{ fontSize, baseline }`
  for a character, dispatching to the correct FONT_CONFIG group. Both tracer.js and
  letters.js call this — change the group logic here, applies everywhere.

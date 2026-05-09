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
  for web; add `font-display: swap` in `@font-face` to prevent invisible text
  during load on slow connections.

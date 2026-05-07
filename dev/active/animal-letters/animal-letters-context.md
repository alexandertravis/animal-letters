# Animal Letters — Context

## Key Files

| File | Role |
|---|---|
| `index.html` | Entry point. Script load order is strictly enforced — do not reorder tags. |
| `styles.css` | All layout, colours (CSS vars), animations. Guide animation via `@keyframes marching`. |
| `data/animals.js` | Sets `window.APP.ANIMALS[]`. 25 animals, 3–6 letter names. Edit here to add animals. |
| `js/state.js` | Central state object. `APP.startGame()`, `APP.advanceLetter()`, `APP.skipAnimal()`. `completedAnimals` is a `Set` populated only on full word completion. |
| `js/audio.js` | Web Audio API synthesiser. `_wake()` on first gesture, `strokeDone()`, `letterDone()`, `wordDone()`, `playComplete(src)`. |
| `js/letterData.js` | 52 glyphs (A–Z, a–z). Each: `{ viewBox, strokes: [{ d }] }`. Hand-authored SVG paths. |
| `js/tracer.js` | Core mechanic. Mounts 5-layer SVG, samples checkpoints, handles pointer events. Constants: `STROKE_WIDTH=48`, `INK_WIDTH=44`, `TOLERANCE=32`, `DRAW_RADIUS=52`, `CHECKPOINTS_PER_STROKE=18`. |
| `js/animals.js` | `APP.animals.pickRandom(maxLength, exclude)` — picks a random animal whose name length ≤ maxLength. |
| `js/settings.js` | In-memory settings, no persistence. |
| `js/main.js` | Screen router. Reads `APP.state.screen`, calls `APP.screens[name].render(root, ctx)`. |
| `js/screens/landing.js` | Landing screen. New Game / Continue / My Animals / Settings buttons. |
| `js/screens/setup.js` | Setup screen. Max length slider, case/depiction/reveal toggles, Start button. |
| `js/screens/game.js` | Game screen. Mounts tracer, builds name strip, handles letter advance and completion. |
| `js/screens/complete.js` | Complete screen. Shows animal image, fires `playComplete()`, Next / Gallery / Home. |
| `js/screens/gallery.js` | Gallery screen. Fixed 140px tile grid. Locked: underscores + greyed peek-of-head. Unlocked: full centred image + display name. |
| `assets/images/cartoon/` | 25 SVG placeholder files (simple shapes, no real art). |
| `assets/images/realistic/` | Empty — user supplies real images. |
| `assets/audio/` | Empty — user supplies real MP3s. Missing audio is silently skipped. |
| `CLAUDE.md` | Architecture reference committed to repo. Keep in sync with actual code. |

## Decisions Log

**2026-05-06** — Decision: Use `data/animals.js` (not `animals.json`) because `fetch()` fails on `file://` protocol. The JS file simply sets `window.APP.ANIMALS`.

**2026-05-06** — Decision: Web Audio API for all game sounds (no audio files required). `HTMLAudioElement` used only for optional real animal sounds that may or may not exist.

**2026-05-06** — Decision: SVG `<mask>` (not canvas, not CSS clip-path) to confine user ink to the letter interior. The mask is defined from the same stroke paths as the ghost layer, thickened to `stroke-width: 48`.

**2026-05-06** — Decision: Ink gates on `DRAW_RADIUS = 52` proximity to the current guide dot. This prevents children from colouring unrelated parts of the letter while still being forgiving enough for imprecise young fingers.

**2026-05-06** — Decision: Progress only advances on pointer *move* (not `pointerdown`). This prevents a static tap on the guide dot from advancing the checkpoint without visible drawing.

**2026-05-06** — Decision: Guide dot renders at last-*completed* checkpoint position (not next-required). This eliminates the visual gap between completed ink and the guide dot.

**2026-05-06** — Decision: Gallery tiles are fixed 140×140px with `justify-content: center`. Avoids the stretching that occurred with `minmax(100px, 1fr)` on wide screens.

**2026-05-06** — Decision: Session-only state — no `localStorage`. Settings reset on page refresh by design (user opted out of persistence).

**2026-05-06** — Decision: `completedAnimals` Set is populated only in `advanceLetter()` when the full word is complete, not in `skipAnimal()`. Skipping does not count as completion.

**2026-05-07** — Decision: X-scale squeeze applied (uppercase 0.85, lowercase 0.80) centred at X_CENTER=100 via `translate(xOffset, tB) scale(xScale, tA)`. Both `tracer.js` and `letters.js` use identical constants so the review screen matches in-game rendering.

**2026-05-07** — Decision: i/j dots detected as zero-length `M x,y L x,y` paths and rendered as `<circle>` elements in separate transform-free SVG overlay groups (dotBaseLayer, doneDotLayer). This avoids elliptical distortion from the non-uniform scale transform.

**2026-05-07** — Decision: Descender letters (g, j, p, q, y) use identity y-transform (a=1, b=0) — their paths are authored directly in guide coordinates rather than being remapped. This is the only way to allow the bowl to touch the x-height line AND the tail to reach the descender line without two separate transforms.

**2026-05-07** — Decision: Circular counters achieved by compensating the design rx: `rx_design = display_ry / X_SCALE`. For standard lowercase (a=0.636): rx=43.75. For ascenders (a=0.778): rx=53.5. For identity descenders: rx=44.

**2026-05-07** — Decision: `APP.GUIDE_CONFIG` centralises guideline appearance. Lines: top y=30, middle y=100, bottom y=170, lower y=240. Plan to add `hidden: true` to middle to suppress it from rendering while keeping it as an internal anchor for `getLetterYTransform`.

## Session End — 2026-05-07
Git status: 3 uncommitted modified files — `js/letterData.js`, `js/screens/letters.js`, `js/tracer.js`

## Constraints & Gotchas

- **Script load order matters.** `data/animals.js` must load before `js/state.js`, which must load before everything else. See the ordered list in `CLAUDE.md` and `index.html`.
- **`window.APP = window.APP || {}` at the top of every file.** This is the pattern — every file is an IIFE extending the shared namespace.
- **AudioContext lazy init.** `getAC()` in `audio.js` creates/resumes the context. Must be called from within a user gesture chain. `_wake()` is the entry point — called from `onDown` in tracer.js.
- **SVG paths need DOM attachment for `getPointAtLength()`.** In `tracer.js`, temp paths are appended to `<defs>` before measurement, then removed. Some browsers throw if the element is detached.
- **`touch-action: none` is required in two places:** `html, body` (global) and `svg.tracer-letter` (specific). Missing either causes scroll interference on mobile.
- **`APP.audio.stopFile()` must be called before navigating away** from the complete screen, or the animal sound keeps playing in the background.
- **Gallery uses `APP.state.completedAnimals` (a `Set`).** The gallery screen reads this on every render — it does not cache. Navigating back and forth always shows fresh state.
- **Lowercase letters share the same viewBox as uppercase** but have different coordinate conventions: ascender `y=30`, x-height `y=110`, baseline `y=210`, descender `y=240`. The STROKE_WIDTH=48 mask covers the full stroke.
- **Non-uniform SVG scale distorts circles.** The `scale(xScale, tA)` transform makes circles elliptical. Any stroke that is a dot (zero-length `M x,y L x,y`) must be rendered as a `<circle>` in a transform-free overlay group. See `isDot()` and `dotPos()` helpers in `tracer.js` and `letters.js`.
- **Capital S cubic bezier is sensitive to control point placement.** Control points too wide (e.g. x=195/5) cause the thick stroke to balloon grotesquely. The target is a point-symmetric pair of cubics through centre (100,125). Good candidate: `M 150,50 C 175,50 175,140 100,125 C 25,110 25,200 50,200`.
- **Lowercase coordinate conventions:** ascender `y=30`, x-height `y=110` (not 100), baseline `y=210`, descender `y=240`. `GUIDE_CONFIG.middle.y = 100` is the rendering position (guide coordinate), but `getLetterYTransform` maps from design coordinate 100 (x-height) to that guide y.
- **`pickRandom` in animals.js excludes the last-played animal** to avoid immediate repeats. With maxLength=3 and only a few 3-letter animals, exhaustion is possible — the function returns `null` and the game falls back to landing.

## Session Summary — 2026-05-07
Completed: horizontal squeeze (uppercase 0.85, lowercase 0.80); GUIDE_CONFIG + getLetterYTransform; descender identity-transform fix; i/j spherical dot (circle overlay groups); n arch fix; circular counters for a/b/c/d/e/g/o/p/q; g tail extended to bowl width; letters.js review screen kept in sync
NEXT STEP: In `js/letterData.js` update `LETTERS['S'].strokes[0].d` to `'M 150,50 C 175,50 175,140 100,125 C 25,110 25,200 50,200'`. Then add `hidden: true` to `APP.GUIDE_CONFIG.lines.middle`. Then in `js/tracer.js` and `js/screens/letters.js`, filter guideline rendering with `if (cfg.hidden) continue`.
Blockers: none
Half-finished: capital S fix and 3-line guideline change — both described above, no code written yet
Security flags added: none

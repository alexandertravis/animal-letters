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

## Session End — 2026-05-07 (session 2)
Git status: clean — all changes committed and pushed

**2026-05-07** — Decision: `APP.ICONS` SVG module (`js/icons.js`) provides all icon strings. Every button that previously used a Unicode char (⌂ ⚙ 🔊 🔇) now uses `innerHTML = APP.ICONS.foo`. `currentColor` means icons inherit the button's CSS color automatically.

**2026-05-07** — Decision: `APP.state.previousScreen` set in `ctx.go()` before every screen transition. Back buttons read this and fall back to `'landing'` if undefined or if it would create a loop (e.g. gallery→gallery).

**2026-05-07** — Decision: Volume/mute routed through a single master `GainNode` in `audio.js`. All `tone()` calls connect to `getMaster()`. `setVolume()` and `setMuted()` update both settings and the node gain atomically. The `HTMLAudioElement` (for animal sound files) has its `.volume` set separately on each `playFile()` call.

**2026-05-07** — Decision: Range slider fill colour uses JS `fillRange(input)` — sets `input.style.background` to a `linear-gradient(to right, #a78bfa NN%, #e0e0e0 NN%)`. `::-webkit-slider-fill-track` is not reliably supported. Firefox uses `::-moz-range-progress` in CSS. Custom `-webkit-appearance: none` CSS with explicit `:hover`/`:active` rules matching the normal state eliminates the browser default hover darkening.

**2026-05-07** — Decision: `.setup` is a full-width scroll container (no `max-width`); `.setup-inner` is the centred content column (`max-width: 720px; margin: 0 auto`). This pushes the scrollbar to the screen edge rather than the content column edge.

**2026-05-07** — Decision: `tileMetrics(nameLength)` in `game.js` calculates tile `width`, `height`, and `fontSize` from `window.innerWidth` at render time. The name strip uses `flex-wrap: nowrap` and each tile gets inline `style.width/height/fontSize`. This guarantees a single-row strip at all viewport widths.

**2026-05-07** — Decision: Complete screen uses CSS Grid (`grid-template-columns: 1fr 1fr`) with the last button (`grid-column: 1 / -1`) spanning full width. Order: My Animals (left), Next Animal (right), Great Job! (full row). Consistent on all viewports.

**2026-05-07** — Decision: Animal name on complete screen respects `APP.state.settings.letterCase`: `lower` → `displayName.toLowerCase()`, `proper` → `displayName`, otherwise uppercase. This matches what the child just practised.

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

## Session Summary — 2026-05-07 (session 1)
Completed: horizontal squeeze (uppercase 0.85, lowercase 0.80); GUIDE_CONFIG + getLetterYTransform; descender identity-transform fix; i/j spherical dot (circle overlay groups); n arch fix; circular counters for a/b/c/d/e/g/o/p/q; g tail extended to bowl width; letters.js review screen kept in sync
NEXT STEP: In `js/letterData.js` update `LETTERS['S'].strokes[0].d` to `'M 150,50 C 175,50 175,140 100,125 C 25,110 25,200 50,200'`. Then add `hidden: true` to `APP.GUIDE_CONFIG.lines.middle`. Then in `js/tracer.js` and `js/screens/letters.js`, filter guideline rendering with `if (cfg.hidden) continue`.
Blockers: none
Half-finished: capital S fix and 3-line guideline change — both described above, no code written yet
Security flags added: none

## Session Summary — 2026-05-07 (session 2)
Completed: SVG icons system (`js/icons.js` with home/settings/volumeOn/volumeOff/back); previousScreen back-navigation; volume slider + mute button in Settings (with tone preview, purple fill, hover-fix, screen-edge scrollbar); master GainNode in audio.js; tileMetrics for single-row mobile name strip; Complete screen Great Job button + 2-column grid + letterCase-aware name; Gallery previous-screen back + underscore wrapping fix + larger font; Letter Patterns "Great Job!" confetti button; Animal Review Test tab (full word tracing with picker, case toggle, name strip, auto-advance); consistent Title Case labels throughout; consistent blue back button and equal button sizing on Setup screen.
NEXT STEP: In `js/letterData.js` update `LETTERS['S'].strokes[0].d` to `'M 150,50 C 175,50 175,140 100,125 C 25,110 25,200 50,200'`. Then add `hidden: true` to `APP.GUIDE_CONFIG.lines.middle`. Then in `js/tracer.js` and `js/screens/letters.js`, filter guideline rendering with `if (cfg.hidden) continue`.
Blockers: none
Half-finished: capital S fix and 3-line guideline change — carried over from previous session, still not started
Security flags added: none

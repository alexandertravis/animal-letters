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

## Constraints & Gotchas

- **Script load order matters.** `data/animals.js` must load before `js/state.js`, which must load before everything else. See the ordered list in `CLAUDE.md` and `index.html`.
- **`window.APP = window.APP || {}` at the top of every file.** This is the pattern — every file is an IIFE extending the shared namespace.
- **AudioContext lazy init.** `getAC()` in `audio.js` creates/resumes the context. Must be called from within a user gesture chain. `_wake()` is the entry point — called from `onDown` in tracer.js.
- **SVG paths need DOM attachment for `getPointAtLength()`.** In `tracer.js`, temp paths are appended to `<defs>` before measurement, then removed. Some browsers throw if the element is detached.
- **`touch-action: none` is required in two places:** `html, body` (global) and `svg.tracer-letter` (specific). Missing either causes scroll interference on mobile.
- **`APP.audio.stopFile()` must be called before navigating away** from the complete screen, or the animal sound keeps playing in the background.
- **Gallery uses `APP.state.completedAnimals` (a `Set`).** The gallery screen reads this on every render — it does not cache. Navigating back and forth always shows fresh state.
- **Lowercase letters share the same viewBox as uppercase** but have different coordinate conventions: ascender `y=30`, x-height `y=110`, baseline `y=210`, descender `y=240`. The STROKE_WIDTH=48 mask covers the full stroke.
- **`pickRandom` in animals.js excludes the last-played animal** to avoid immediate repeats. With maxLength=3 and only a few 3-letter animals, exhaustion is possible — the function returns `null` and the game falls back to landing.

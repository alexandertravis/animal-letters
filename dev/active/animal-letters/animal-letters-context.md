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

**2026-05-07** — Decision: `APP.GUIDE_CONFIG` centralises guideline appearance. Lines: top y=30, middle y=100, bottom y=170, lower y=240. All four lines render visibly — the middle (x-height) line is kept visible and is used as an anchor by `getLetterYTransform`.

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
- **Capital S** uses smooth opposing cubics with a shorthand `S` command: `M 140,75 C 140,30 60,30 60,75 C 60,105 60,105 100,125 S 140,145 140,175 C 140,220 60,220 60,175`. Control points too far outside (e.g. x=195/5) cause the thick stroke to balloon grotesquely.
- **Lowercase coordinate conventions:** ascender `y=30`, x-height `y=110` (not 100), baseline `y=210`, descender `y=240`. `GUIDE_CONFIG.middle.y = 100` is the rendering position (guide coordinate), but `getLetterYTransform` maps from design coordinate 100 (x-height) to that guide y.
- **`pickRandom` in animals.js excludes the last-played animal** to avoid immediate repeats. With maxLength=3 and only a few 3-letter animals, exhaustion is possible — the function returns `null` and the game falls back to landing.

## Session Summary — 2026-05-07 (session 1)
Completed: horizontal squeeze (uppercase 0.85, lowercase 0.80); GUIDE_CONFIG + getLetterYTransform; descender identity-transform fix; i/j spherical dot (circle overlay groups); n arch fix; circular counters for a/b/c/d/e/g/o/p/q; g tail extended to bowl width; letters.js review screen kept in sync
NEXT STEP: Capital S path was subsequently fixed. No outstanding letter data tasks — pick up next from Section 11 (real assets) or Section 12 UI items.
Blockers: none
Half-finished: none
Security flags added: none

## Session Summary — 2026-05-07 (session 2)
Completed: SVG icons system (`js/icons.js` with home/settings/volumeOn/volumeOff/back); previousScreen back-navigation; volume slider + mute button in Settings (with tone preview, purple fill, hover-fix, screen-edge scrollbar); master GainNode in audio.js; tileMetrics for single-row mobile name strip; Complete screen Great Job button + 2-column grid + letterCase-aware name; Gallery previous-screen back + underscore wrapping fix + larger font; Letter Patterns "Great Job!" confetti button; Animal Review Test tab (full word tracing with picker, case toggle, name strip, auto-advance); consistent Title Case labels throughout; consistent blue back button and equal button sizing on Setup screen. Capital S path also fixed.
NEXT STEP: No outstanding letter-shape or infrastructure tasks. Next work is likely real asset integration (cartoon SVGs, realistic photos, audio MP3s) or new feature requests.
Blockers: none
Half-finished: none
Security flags added: none

**2026-05-21** — Decision: Story page format changed from `{ animal, text }` to `{ text, image }` (explicit SVG path) — storyreader uses `page.image` directly, no lookup needed, and future non-SVG images are trivially supported.

**2026-05-21** — Decision: Synthetic title and outro spreads generated at runtime by storyreader — not stored in `stories.js` pages array. Keeps data clean; storyreader always wraps any story with a cover spread and "The End" spread.

**2026-05-21** — Decision: `clip-path: inset()` for page turns (not `scaleX` or `rotateY`) — non-distorting, text stays readable, direction-aware collapse/expand via CSS class application.

**2026-05-21** — Decision: `.spread-bg` background layer pre-renders the incoming spread behind current front panels. Becomes visible as the outgoing panel's clip-path collapses — no visual gap during the turn.

**2026-05-21** — Decision: `perspective()` function inside keyframe `transform` values, not `perspective` CSS property on parent, to avoid nested 3D rendering context distortion (which squashes the element).

**2026-05-21** — Decision: Dev Counts tab added to Animal Review screen (Settings → Animal Review → Counts) for manual testing of story unlock thresholds. Provides +/- steppers per animal and a "Reset all" button that also syncs `completedAnimals` Set.

## Session Summary — 2026-05-21 (session 1)
Completed: Story Library (8 unlockable stories, library screen, storyreader, unlock detection, complete-screen banner, i18n keys); Dev Counts tab for unlock testing; 4 new stories (Three Billy Goats Gruff, Three Blind Mice, Hey Diddle Diddle, Owl & Pussy-Cat); first book animation attempt (3D perspective flip); full open-book simulation rewrite (cover swing open, two-panel spread, clip-path page turns, corner folds, outer nav arrows, synthetic title/outro spreads, library fade-out transition); stars system (0–3 stars on complete + gallery); phonics/audio (speak letter on mount + completion, volume in topbar); memory written to `~/.claude/memory/domain/childrens-app.md`.
NEXT STEP: Open the app in browser and test the book simulation — specifically page turn timing, cover open feel, corner fold hit targets on mobile, and the "The End" outro spread. Adjust CSS/timing in `styles.css` and `js/screens/storyreader.js` as needed.
Blockers: none
Half-finished: none
Security flags added: none

**2026-05-21** — Decision: CSS 3D leaf-flip replaces clip-path page turns. `perspective` set on `.book-spread` (NOT `.book` which carries `translateX`). Each leaf uses `transform-style: preserve-3d` + `backface-visibility: hidden` on both faces. `buildLeaf(side)` returns `{ leaf, front, back }`. Left leaf pivots at right edge (+180°), right leaf pivots at left edge (-180°).

**2026-05-21** — Decision: `blankPage(pageEl, innerEl)` adds `.is-blank` class (transparent bg) + clears inner content. Must be called synchronously with `appendChild(leaf)` in the same JS task so browser paints them together in one frame — prevents any exposed background gap.

**2026-05-21** — Decision: `is-flipping` class on `.book-spread` hides corner folds (scale→0), fades spine (opacity→0), and removes spread box-shadow while a leaf is in flight.

**2026-05-21** — Decision: `bookClosed` hidden via `opacity: 0` + `pointerEvents: none` (not `display: none`) when book opens, to preserve flex layout dimensions. Idle shake animation paused (`animationPlayState: paused`) while hidden, and reset (`animation: none` → `void offsetWidth` → `animation: ''`) on restore so cover always reappears at `rotate(0deg)` not mid-tilt.

**2026-05-21** — Decision: `.leaf-face.cover-face` has `padding: 0` to match `.book-closed`'s zero container padding. The `.leaf-face` base rule has `padding: 28px 24px` needed for content pages, but the cover face must have identical available width to the static closed cover — both at 50% book width minus the title's own `padding: 0 20px`.

**2026-05-21** — Decision: Naming convention — "flap" = the lifted triangle (back of page, darker gradient), "shadow" = the cast shadow above the fold crease. Consistent across all future references.

## Session End — 2026-05-21 (session 2)
Git status: clean — all changes committed, amended, and pushed. Merged to main as v1.1.0. Branch `feature/library-theming` created for next feature.

## Session Summary — 2026-05-21 (session 2)
Completed: Full CSS 3D leaf-flip animation system replacing clip-path turns; Round 2 polish (spine fade, curl shading, corner folds); Round 3 polish (realistic curl gradient, fold hide during flip, background fix on pages); Round 4 polish (darker flap + outline, collapseToClosedCover, ✕ on closed, flutter close, idle shake replaces hint, cover image stability fix, title wrapping fix); all merged branches deleted; v1.1.0 tagged on main; feature/library-theming branch created.
NEXT STEP: Start `feature/library-theming` — design and implement visual theming for book tiles and bookshelf in the story library screen (`js/screens/library.js`, `styles.css` library section, `data/stories.js` for per-story theme data).
Blockers: none
Half-finished: none
Security flags added: none

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

**2026-05-22** — Decision: `closeBook()` (✕ mid-read) uses `applyLeft(L.front, spreads[spreadIdx])` to mirror current left page content onto the leaf front face, then `blankPage` the page behind it in the same synchronous block. Right page stays untouched. Both pages visible as cover swings shut — physically natural.

**2026-05-22** — Decision: Cover open/close speed separated from page turns. `.page-leaf.cover-leaf { transition: transform 0.95s }` overrides the base 0.6s. `COVER_MS = 950` JS constant mirrors CSS. `FLIP_MS = 600` untouched for page turns. `COVER_PAUSE = 550` delay between cover landing and fade (user-tuned).

## Session End — 2026-05-22
Git status: clean — committed to feature/library-theming, pushed.

## Session Summary — 2026-05-22
Completed: mid-book close animation (current pages visible as cover swings); cover speed slowed to 0.95s; COVER_MS/COVER_PAUSE constants; COVER_PAUSE user-tuned to 550ms.
NEXT STEP: Begin `feature/library-theming` work — add per-story theme/skin data to `data/stories.js`, then apply visual theming to book tiles (spine colour, cover texture) and bookshelf background in `js/screens/library.js` + `styles.css`.
Blockers: none
Half-finished: none
Security flags added: none

---

## Library Theming feature (feature/library-theming → merged to main, 2026-05-23)

### Key files added/changed
| File | Role |
|---|---|
| `js/screens/bookCover.js` | **NEW.** `APP.bookCover(story, {skin, locked})` → builds the painted `.story-cover` element. Single source for the cover, used by the shelf card AND the reader's closed/swing cover. Loaded in index.html **before** library.js. |
| `js/state.js` | Added `APP.LIBRARY_THEMES` (storybook/walnut/basic), `APP.activeTheme()`, `APP.activeBookSkin()`, and `state.libraryTheme` (session-only). The single theme dial. |
| `js/screens/library.js` | Renders `.bookshelf` (skinned) of face-out `.book` cards (geometry only) wrapping `.story-cover`. Header has a **theme dropdown** (`.library-theme-select`). No achievements row / "Stories" title; shelf is full-bleed. |
| `js/screens/storyreader.js` | Derives `skin`+`palette` from `APP.activeBookSkin()`. `applyLeft`/`applyRight` emit skin markup (inside-cover fill, `.page-content`+drop-cap, `.page-img`+frame, `.title-page`, `.theend`, centred consecutive page-nums) OR plain markup when skin is `basic`. `renderCover`/`bookClosed` use `APP.bookCover`. **Flip choreography untouched.** |
| `styles.css` | `.bookshelf.skin-*`, `.story-cover.skin-*` (shared cover visuals), full reader skin block, `@font-face` (Cinzel/EB Garamond/Fraunces in `assets/fonts/<Family>/`). |
| `data/stories.js` | Each story now carries BOTH `leather` (classic) and `board` (watercolour); legacy `color` kept (used by basic skin). |
| `assets/fonts/{Cinzel,EB_Garamond,Fraunces}/` | Bundled reader fonts (variable + static weights). |

### Decisions Log
**2026-05-23** — One theme dial drives everything. `state.libraryTheme` ∈ {storybook, walnut, basic}; each maps to a shelf skin + a book skin (`APP.LIBRARY_THEMES`). storybook→watercolour, walnut→classic, basic→plain. Switching the dropdown re-skins shelf AND reader together. Per-story `skin` field was removed — the theme owns that choice; stories only carry colour options (`leather`+`board`).

**2026-05-23** — CSS collision fix: the design drop-in used a bare `.book{width:148px;…}` rule that would clobber the reader's open-book `.book` (`width:min(740px,92vw)`). All shelf-card visual rules are scoped under `.bookshelf .book`; the painted cover lives on unscoped `.story-cover.skin-*` so both shelf and reader reuse it. `.bookshelf .book` also resets `animation:none` (it matches the reader's bare `.book{animation:bookIn}`).

**2026-05-23** — Reader skin is content-only; flip choreography/timing/state-machine in storyreader.js is byte-for-byte unchanged. Skin markup is emitted by `applyLeft`/`applyRight` into BOTH static `.book-page-inner` and the flipping `.leaf-face`, so it rides the leaf. Added reconciliation CSS: `.book-page-inner`/`.leaf-face` get `padding:0;position:relative` under skin so absolute skin layers reach the edges.

**2026-05-23** — "Basic" theme = plain testing baseline. Reuses the original reader classes (`.book-text`/`.book-img`/`.book-cover-img`/`.book-cover-title`/`.book-the-end`) and flat covers; no frames/drop-caps/page-numbers. These classes are therefore NOT dead code.

**2026-05-23** — Review-round animation fixes: (a) blanked page kept showing parchment during the cover swing — skin paper rules (spec 0,3,0) outranked `.book-page.is-blank` (0,2,0); added matching-specificity `.is-blank` overrides. (b) collapse/flutter flashed flat `story.color` on the inside-cover face → use `applyLeft(L.front, spreads[0])` (skinned). (c) page numbers moved to bottom-centre of each panel (were under corner folds) and made consecutive (left `2n-1`, right `2n`). (d) **removed `spreadReveal` opacity fade on `.book-spread`** — it replayed on display:none→flex at open, fading the cover leaf up from transparent (the book "disappeared then reappeared"); obvious only once covers got darker.

### Constraints & Gotchas (theming)
- **`.story-cover` is the shared cover** — change cover look in ONE place: `bookCover.js` (markup) + `.story-cover.skin-*` CSS. Shelf geometry (size/hover) stays on `.bookshelf .book`.
- **Theme is session-only** (`state.libraryTheme`, not persisted). Resets to `storybook` on reload.
- **`@font-face` paths** point at subfolders: `assets/fonts/Cinzel/Cinzel-VariableFont_wght.ttf`, `assets/fonts/EB_Garamond/EBGaramond-VariableFont_wght.ttf` (+Italic), `assets/fonts/Fraunces/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf`. Fonts lazy-load (font-display:swap) — only when a skinned reader uses them.
- **Preview screenshots time out** on the library/reader (continuous SVG animations: candle flame, lamp glow, quill, hourglass). Verify via `preview_eval` DOM/computed-style checks, not screenshots.
- **No `develop` branch** in this repo — features integrate into `main` directly.

## Session End — 2026-05-23
Git status: clean — feature/library-theming committed + pushed; merged into main (merge commit 6347da6) and pushed to origin/main. Working tree back on feature/library-theming.

## Session Summary — 2026-05-23
Completed: Full library-theming feature in 2 phases + fixes. Phase 1: skinnable bookshelf (storybook/walnut) with face-out covers, shelf props, locked padlock cameo, full-bleed shelf, header theme dropdown. Phase 2: reader skin (parchment/painted paper, gilt frames + drop caps, inside-cover fill, framed images, centred consecutive page numbers) sharing the theme dial via `APP.bookCover` + `state.js` helpers — animations preserved. Added "Basic" plain testing theme. Bundled + wired Cinzel/EB Garamond/Fraunces fonts. Fixed 6 review issues (blank-page specificity, skinned collapse/flutter cover, page-number placement+numbering, open-disappear fade). Merged to main.
NEXT STEP: Feature complete on main. Optional follow-ups only: Phase 3 per-page `frame:` variants in stories.js; dead-CSS cleanup (`.book-tile`/`.books-grid`, `.book-closed-img`/`.book-closed-title` now unused — but NOT the basic-reused classes); decide theme dropdown placement (keep/settings/hide) and whether to drop the floating "Page X of Y" counter; `assets/fonts/Playwrite_GB_S_Guides/` left untracked (unrelated, near-dup) — delete or keep locally.
Blockers: none
Half-finished: none
Security flags added: none

---

## Constraints & Gotchas (iOS / animation — added 2026-05-24)
- **`clip-path` on perspective parent = iOS pop**: Adding `clip-path` to `.book-spread` (which has `perspective:1700px` and 3D-transformed children) creates a composited layer on iOS WebKit that pops visually when `display:none → display:flex`. Remove `clip-path` from `.book-spread` entirely; the spread contents fit naturally within bounds.
- **`display:none → block` + `void offsetWidth` unreliable on iOS**: When `display` transitions, iOS batches style updates and `void offsetWidth` may not commit the initial state before a CSS transition fires. Use `opacity:0/1` transitions instead to avoid the need for a display change.
- **Moving DOM children vs re-creating**: Moving existing child nodes transfers already-decoded GPU textures, eliminating the re-decode flash. Critical for SVGs (e.g. owl) which take longer to rasterise. Always prefer `while (src.firstChild) dst.appendChild(src.firstChild)` over creating fresh `applyRight(dst, spread)` inside animation timeouts.
- **CSS `filter` on parent always wins**: A `filter:` on a parent element composites all descendants before applying — a child's own filter cannot counteract the parent's. The ONLY fix is to move the element outside the filtered subtree. Counter-filter maths on a child element does NOT work.

## Constraints & Gotchas (lock requirements panel — added 2026-05-24)
- **`.cover-reqs` is a child of `.book`, NOT `.story-cover`**: This is intentional — `.story-cover.is-locked` has a desaturation filter that would degrade star colours if `.cover-reqs` were inside it. `APP.buildLockReqs(story)` is exposed from `bookCover.js`; `library.js` appends it to the `.book` wrapper after the cover. If this ever needs to change, re-read the filter inheritance gotcha above first.
- **`STAR_GOLD` / `STAR_GREY` in `bookCover.js`**: single source of truth for star colours across all three themes. Change them there only.
- **`.cover-reqs` needs its own `border-radius: 0 0 6px 3px`**: as a sibling of `.story-cover` it is NOT clipped by the cover's `clip-path`. The bottom corners must match `clip-path: inset(0 round 3px 6px 6px 3px)` on the cover.

## Session End — 2026-05-24
Git status: clean on main. All work committed directly to main (no develop branch in this repo).
Branches deleted: `feature/animation-fixes` (local), `feature/library-theming` (local + remote). `origin/feature/mobile-responsiveness` was a stale remote-tracking ref (already merged) — pruned.
Remaining: `worktree-agent-aea84726d2291558e` (locked worktree at `.claude/worktrees/agent-aea84726d2291558e`) has one unmerged commit: `feat(game): add Find the Letter mode — tap the correct letter from 4 choices`. Not merged to main; decision deferred.
Untracked: `assets/fonts/Playwrite_GB_S_Guides/` — unrelated near-duplicate, left locally, not committed.

## Session Summary — 2026-05-24 (holistic review)
Completed:
1. **iOS reader animation fixes** (Section 23): cover-open enlarging pop, fold/spine jump, image flash at turn start, owl SVG flash after PREV turn, shadow full-width on open, corner colour bleed, page content outside decorative borders, basic skin back-face texture.
2. **Lock requirements overlay** (Section 24): padlock on basic skin, `.cover-reqs` panel (stars + animal name rows) on all three themes, star progress from `animalCompletionCounts`, star colour standardised as `STAR_GOLD`/`STAR_GREY` constants, filter inheritance bug fixed by moving panel outside filtered subtree.

## Constraints & Gotchas (responsive / landscape — added 2026-05-24)
- **`justify-content:center` + no `overflow-y`**: When a flex column overflows upward, the start edge is inaccessible — you can't scroll to clipped top content. Always pair centred flex layouts with `overflow-y: auto` + `justify-content: flex-start`.
- **Base `.topbar` must be `display:flex`**: only `.game .topbar` and `.complete .topbar` had `display:flex` rules. Library/numbers/progress topbars were `display:block`, stacking vertically. Base rule added before all screen-specific topbar overrides.
- **`min-height` beats `height` on `.btn`**: `.btn { min-height:64px }` overrides `.btn.icon { height:56px }`. Icon buttons are 64px tall, not 56px. Don't try to change the base without auditing the game screen grid rows.
- **`booksPerRow()` must match CSS book width**: the JS calculation and CSS `.bookshelf .book { width }` must agree. In landscape (`H<600 && W>=480`) both use 96px. If you change the CSS override, update `booksPerRow()` too.
- **Trailing `.bookshelf-plank`**: `library.js` appends a plank after every row including the last. The `display:none` last-child override was removed in 2026-05-25 so all rows have visible planks. The plank is 12px in landscape — negligible scroll cost.
- **`@media (max-height:600px)` landscape threshold**: iPhone SE landscape = 375px (well below 600px). Desktop chrome dev tools emulation at 667×375 is a reliable test. Portrait devices (375×667) are above 600px — queries do not fire in portrait.

## Session Summary — 2026-05-24 (responsive layout)
Completed:
1. **Responsive / landscape layout** (Section 25): `viewport-fit=cover`, safe-area insets on `#app`, landing + complete scroll fixes, base `.topbar` rule, landscape `@media (max-height:600px)` compact overrides for all screens, `booksPerRow()` landscape sync.
Commit: `7498711` fix(responsive): landscape layout fixes across all screens.
2. **Library booksPerRow fix** (same day, follow-up): corrected SHELF_PAD for landscape, added PROP_SPACE, window resize listener, `flex-wrap:wrap` on `.bookshelf-row`. Commits `fd3516b`, `f3d48ea`.
3. **Game vertical sidebar + complete 2-col**: `.game` landscape becomes sidebar grid; `.complete` becomes 2-col grid with topbar in right `nav` area. Commit `f3d48ea`.

---

## Constraints & Gotchas (landscape polish — added 2026-05-25)
- **Complete screen `flex:1` + `display:grid`**: In portrait `.complete` is `flex:1` (fills `#app` flex container). In landscape it switches to `display:grid` internally. These coexist: `flex:1` controls sizing within the parent; `display:grid` only changes internal layout. No conflict.
- **`tileMetrics()` uses `window.innerWidth`, not strip width**: In landscape the strip is narrower (full width minus 56px sidebar), but `window.innerWidth` overestimates. Tiles are still capped at 40px in landscape so they always fit — the JS doesn't need to know the actual strip width.
- **Restart/skip are now icon buttons**: Both use `class="btn icon ghost"` in portrait AND landscape. The sidebar's `.game .topbar .btn.icon { width:40px; height:40px }` applies equally. No `writing-mode` or text-specific sidebar rules needed.
- **`.bookshelf .book` overrides the reader `.book`**: In `@media(max-height:600px)`, `.book { width: min(…) }` is the reader rule. `.bookshelf .book { width: 96px }` comes after and has higher specificity (2 selectors), so shelf books stay at 96px. Don't reorder these rules.
- **Tap-to-complete threshold is 75%**: `onDown` calls `checkProgress` for regular strokes when `currentCheckpoint >= Math.floor(checkpoints[currentStroke].length * 0.75)`. Below that threshold, dragging is still required — prevents a tap at the start dot from skipping through clustered early checkpoints.

## Session Summary — 2026-05-25 (landscape polish round 2)
Completed (Section 26):
1. Library: shelf planks visible under every row; `booksPerRow()` SHELF_PAD landscape fix + PROP_SPACE; resize listener.
2. Game: restart/skip icon buttons (`APP.ICONS.restart`/`.skip`); tile size capped at 40px in landscape → ~21px more stage height; removed rotated-text CSS.
3. Tracer: tap-to-complete when ≥75% of stroke done — children no longer stuck dragging the invisible tail.
4. Complete: 3-column landscape grid (`nav|body|actions`), fixing both the "header bar" appearance and the nav/actions placement; stars badge reduced to 1.4rem in landscape.
5. Story reader: book width constrained by `calc(88vh × 2/1.35)` in landscape — no more overflow on iPhone SE.
Commit: `3fda88f` — pushed to main, Vercel deploying.
NEXT STEP: No active work items. Optional follow-ups: merge Find-the-Letter worktree branch; Phase 3 per-page frame variants; dead-CSS cleanup; Playwrite_GB_S_Guides/ decision.
Blockers: none
Half-finished: none

---

## Session End — 2026-05-25 (story library expansion)
Git status: clean. Branch: `feature/story-library-expansion`. Untracked: `assets/fonts/Playwrite_GB_S_Guides/` (do not commit).

## Session Summary — 2026-05-25 (tooling / MCPmarket setup)
Completed:
1. **MCPmarket plugin fully configured**: `pluginConfigs` added to `~/.claude/settings.json` with `toolkit_url` + `api_token` (copied from existing plaintext `.mcp.json`); remote control now authenticates on startup.
2. **kids-book-writer skill installed**: manually placed downloaded SKILL.md into `~/.claude/plugins/mcpmarket-my-toolkit/skills/kids-book-writer/SKILL.md` — available immediately without sync.
3. **Diagnosed Remote Control failure**: caused by missing `api_token` in secure storage; resolved by adding token to `pluginConfigs` in `settings.json`.
4. **Claude Code CLI architecture clarified**: `claude.exe` in `AppData/Roaming/Claude/claude-code/2.1.149/` is a Windows launcher; actual binary is an ELF Linux executable in `claude-code-vm/2.1.149/claude` running inside Claude Code's built-in Linux VM — cannot be invoked directly from PowerShell/cmd/Git Bash.

## Constraints & Gotchas (mobile reader layout — added 2026-05-25)
- **Landscape proportional mismatch**: The landscape leaf is ~1.9× wider than portrait (~326px vs ~172px). Copying portrait pixel values for frame/inset produces visually tighter gaps in landscape. Always scale proportionally: e.g. 8px frame at 4.7% of 172px portrait = 15px for 326px landscape.
- **Ornament clearance formula**: `frame_inset + corner_size − 6px` is the minimum safe content inset for classic skin. Changing frame or corner size without rechecking this will clip text under the corner ornaments.
- **16 leather colour names**: `chestnut`, `slate`, `teal`, `mauve`, `sienna`, `gold`, `russet`, `amber`, `terracotta`, `leaf`, `arctic`, `midnight`, `buff`, `dustblue`, `sage`, `charcoal`. All must have `:root` variable triplets (`--leather-*`, `--leather-*-hi`, `--leather-*-lo`) AND matching `.story-cover.skin-classic.l-*` + `.book.book-classic.l-* .inside-cover-classic` CSS rules. Missing either causes transparent covers.
- **Walnut theme = classic skin**: `APP.LIBRARY_THEMES.walnut.book = 'classic'` — walnut shelf + leather book skin. Transparent walnut covers always means missing `l-{leather}` CSS rules.
- **Portrait aspect ratio `2/1.72`**: chosen to be "slightly taller" than 2/1.45 base while not being extreme. Do not increase beyond 1.9 — book becomes too tall for the viewport on short devices.

## Session Summary — 2026-05-25 (mobile reader layout polish)
Completed (Section 27):
1. Scroll indicators (`.page-scroll-over` + gradient fades + JS `.up`/`.down` toggle).
2. Portrait aspect ratio corrected to `2/1.72`.
3. 16 missing leather CSS variables + cover/inside-cover rules — transparent walnut covers fixed.
4. Landscape proportional scaling: frame and content insets scaled to match visual proportions of portrait (not just pixel values).
Commits: multiple on main — latest `15ee69f`.
Branches cleaned: `feature/story-library-expansion` deleted (local + remote — all work was on main).
NEXT STEP: No active work. Pick up from story library expansion (new stories) or any new feature request.
Blockers: none
Half-finished: none
Security flags added: none

---

## Constraints & Gotchas (story illustrations — added 2026-05-25)
- **Image format:** Store illustrations as WebP at quality 82. Convert from PNG source using Python Pillow (`Image.open().save('out.webp', 'WEBP', quality=82)`). PNG originals stay in Downloads — do NOT commit them.
- **Directory convention:** `assets/images/story/<story-id>/page-NN.webp` (zero-padded, 1-indexed).
- **stories.js paragraph `image` field:** Each paragraph has its own `image` path. The `pages` getter on `APP.Story` maps `p.image` transparently — just update the `image` field on the relevant paragraph object.
- **Classic skin fill:** `.book.book-classic .page-img img` was `78%/78%/contain` — updated to `100%/100%/cover` so illustrations fill the page. Watercolour was already `cover`. Don't revert this.
- **Landscape `.page-img` insets:** Added `inset: 26px 22px` in `@media(max-width:480px)` and `inset: 32px 40px` in `@media(max-height:600px)` for classic skin — matches content inset and clears ornaments.
- **Conversion tool:** `magick` (ImageMagick) not available on this machine. Use Windows Python at `C:\Users\alext\AppData\Local\Programs\Python\Python313\python.exe` with Pillow (already installed).
- **Scene order vs filename order may differ:** Always verify which image is which before mapping to page numbers.

## Session End — 2026-05-25 (story illustrations)
Git status: clean — commit `fb507da` pushed to main.
Untracked: `assets/fonts/Playwrite_GB_S_Guides/` (do not commit).

---

## Painting Feature (feature/painting, 2026-05-25)

### Key files added/changed
| File | Role |
|---|---|
| `js/screens/painting.js` | **NEW.** Full painting screen IIFE. Two-canvas stack (paint layer + overlay), DPR-aware sizing (synchronous resize, clamped at 2), brush / eraser / scanline flood-fill / emoji-sticker tools, preset colours + sizes, undo (6-deep `ImageData` stack), clear, window resize listener lifecycle. |
| `js/icons.js` | Added `brush`, `eraser`, `fill`, `sticker`, `undo`, `trash` icons. |
| `data/i18n.js` | Added `landing.painting`, `painting.title`, plus aria-label keys to `en` block (other locales fall back automatically). |
| `styles.css` | Added `/* ── Painting ── */` section: full-bleed stage with white background, absolutely-positioned stacked canvases, toolbar (tools / swatches / sizes / stickers), portrait bottom-bar + landscape side-column layout. |
| `js/screens/landing.js` | Added Painting button + click handler → `ctx.go('painting')`. |
| `index.html` | Added `<script src="js/screens/painting.js">` before `js/main.js`. |

### Decisions Log
**2026-05-25** — Two stacked canvases: transparent paint layer (bottom, pointer events) + overlay (top, `pointer-events:none`). Stage has white CSS background so "white" = absence of paint. `destination-out` composite for eraser — consistent regardless of painted colours and doesn't require knowing the background colour. Overlay unused in MVP; reserved for Phase 2 template outlines.

**2026-05-25** — `resize()` called synchronously (not via `requestAnimationFrame`). The stage (`flex:1` in a `flex-column #app`) has correct `clientWidth/Height` immediately after `root.appendChild(wrap)`. rAF doesn't fire in hidden/background tabs (preview environment), making rAF-based init unreliable.

**2026-05-25** — Flood fill is scanline-based over `getImageData`. Fill tap point converted to device pixels (`clientX * dpr`) because `getImageData`/`putImageData` ignore `setTransform`. Tolerance = 40 per-channel (summed-squared comparison) to swallow anti-aliased edges.

**2026-05-25** — Emoji stickers stamped into the bitmap via `ctx.fillText` — simplest approach; sticker becomes part of the paint so eraser/fill interact naturally. No per-sticker reposition (planned for a later iteration).

**2026-05-25** — Never `drawImage` an external file on the paint canvas before `getImageData` — SecurityError on `file://`. Phase 2 templates must use inline `Path2D` paths only.

### Constraints & Gotchas (painting — added 2026-05-25)
- **DPR coordinate split:** brush/sticker draw in CSS px (honoured by `setTransform`); flood-fill and `getImageData`/`putImageData` operate on raw backing-store px. Convert fill/erase tap points by multiplying by `paint.dpr`.
- **`touch-action:none`** required on `.painting-stage canvas` (plus global `html,body` rule already present). Without it, finger drags trigger page scroll.
- **`setPointerCapture` in try/catch:** mirrors tracer.js — prevents stroke-end when pointer drifts outside canvas edge, no-op when pointer ID is invalid.
- **`resize()` synchronous init:** rAF doesn't fire in hidden tabs. Always call resize() directly in render() after appendChild. The window `resize` listener covers orientation changes.
- **Undo memory:** each `ImageData` snapshot at dpr=2 on a tablet ≈ 12 MB. Stack capped at 6. `MAX_DPR` clamped to 2.
- **Phase 2 tainting:** loading external SVG/img onto canvas via `drawImage` before `getImageData` = SecurityError on `file://`. Templates must be inline vector paths drawn via `Path2D`.

## Session Summary — 2026-05-25 (painting feature)
Completed (Section 29):
1. New `feature/painting` branch.
2. Painting screen with brush, eraser, fill-bucket (scanline flood fill), emoji sticker, undo, clear.
3. Preset colour swatches (8 colours), 3 brush sizes, 10 emoji stickers.
4. Portrait (bottom toolbar) + landscape (side toolbar) responsive layout.
5. All tools verified in browser: brush paints, eraser uses `destination-out`, fill floods correctly, stickers stamp to bitmap, undo restores prior state, clear resets, back returns to landing. Console clean.
NEXT STEP: Open in a real browser / tablet and test with finger input. Refine colour palette, sizes, and toddler-friendliness as needed. Phase 2 = template colour-in mode (hand-coded outline paths → `data/painting-templates.js`).
Blockers: none
Half-finished: none

**2026-05-25** — Decision: WebP at quality 82 chosen for story illustrations (5–10× smaller than PNG, 188–236 KB per image vs ~2 MB). PNG sources kept locally in Downloads, not committed. `assets/images/story/<id>/` directory structure established.

**2026-05-25** — Decision: Classic skin image fill changed from `78%/78%/contain` to `100%/100%/cover` globally (not just for three-pigs). Rationale: placeholder SVGs are unaffected visually; all future real illustrations should fill the page. Landscape inset overrides added to both mobile breakpoints to match content alignment.

## Session Summary — 2026-05-25 (story illustrations)
Completed (Section 28, partial):
1. Three Little Pigs pages 1–3 wired to real watercolour WebP illustrations.
2. Classic skin image CSS updated to fill page within borders (cover/100%).
3. Landscape `.page-img` inset overrides added for classic skin.
4. Commit `fb507da` pushed to main.
NEXT STEP: Generate remaining 8 illustrations for Three Little Pigs (pages 4–11: wolf scenes, brick house, ending). Use the existing `imagePrompt` fields in `data/stories/three-pigs.js` as generation prompts. Convert PNGs → WebP using same Python command, save to `assets/images/story/three-pigs/page-04.webp` through `page-11.webp`, update `data/stories/three-pigs.js` paragraph `image` fields accordingly.
Blockers: none
Half-finished: none
Security flags added: none

## Session End — 2026-06-01
Git status: clean. Only untracked files are screenshots (.png), `.playwright-cli/`, `assets/fonts/Playwrite_GB_S_Guides/` (do not commit). No staged/modified tracked files.

## Decisions Log — 2026-06-01
2026-06-01 — Decision: Puzzles and Recipes merged to main directly (no PR); dot-to-dot branch was a remote-only branch (claude/branch-status-check-f240A) merged via conflict resolution.
2026-06-01 — Decision: GSAP vendored at `js/vendor/gsap.min.js` is shared between puzzles.js and recipes.js — single copy, one script tag in index.html.
2026-06-01 — Decision: Done overlay in puzzles appended to `.pz-stage` (not `.pz-board`) with `z-index:200` and `paddingLeft:boardX` so it appears above locked pieces (which are also children of stage at z-index:5).
2026-06-01 — Decision: GSAP `killAll` unavailable in vendored build — use `G.killTweensOf('*')` instead.

## Session Summary — 2026-06-01
Completed:
- Puzzles feature built and merged to main: jigsaw (bezier tabs), shapes (destination-out compositing), emoji (canvas fillText), 4 difficulties, faint/grey hints, grid overlay, confetti done screen
- Dot-to-dot feature merged from claude/branch-status-check-f240A: Connect the Dots game, authoring tool, faint guide lines, toggle
- All feature branches deleted (local + remote); only origin/main remains
- Landing page confirmed: Painting, Puzzles, Recipes, Connect the Dots all present and wired
- Recipes dev docs archived to dev/done/recipes/

NEXT STEP: Review `js/screens/dots.js` architecture (no dev docs exist for that branch) — read the file and add an architecture note to animal-letters-context.md before extending the feature. Then consider adding remaining story illustrations (Three Little Pigs pages 4–11).
Blockers: none
Half-finished: none
Security flags added: none

---

## Connect the Dots Feature (`js/screens/dots.js`) — Architecture Notes (2026-06-10)

### Key files
| File | Role |
|---|---|
| `js/screens/dots.js` | Single-file screen IIFE. Injects its own `<style>` tag on first render. |
| `data/dotPuzzles.js` | Sets `APP.DOT_PUZZLES[]`. Built-in puzzles. Author tool pushes custom entries at runtime (session-only). |

### Internal architecture
The screen has three sub-views, all rendered into a single `.dots-screen` wrapper div (replacing its `innerHTML`):

1. **`renderPicker(wrap, ctx)`** — scrollable grid of `.dots-card` tiles, one per `APP.DOT_PUZZLES` entry, plus a "Create your own" card. Clicking a card calls `renderPlay`; clicking Create calls `renderAuthor`. Preview SVGs are generated inline with a faint polyline and numbered dot circles.

2. **`renderPlay(wrap, ctx, puzzle)`** — the game. Layered SVG groups in z-order:
   - `bgImg` (optional faint background image, opacity 0.2 during play, 1.0 on complete)
   - `guideLines` group — remaining connections as dashed grey lines (toggle via "Guides" button)
   - `doneLines` group — completed connections as solid blue lines
   - `rubberBand` — single dashed line from current source dot to pointer position (opacity 0 when not dragging)
   - `dotGroup` — all dots re-rendered on each state change (active = large + pulsing ring, future = medium grey, done = small blue)

   **Interaction**: single pointer drag. `pointerdown` near the source dot (`HIT = 28` SVG units) starts drag + pointer capture. `pointermove` updates rubber band and snaps when pointer is within `HIT` of the target. On snap: draw done line, increment `connected`, redraw guide + dots. **Flow-on**: rubber band reanchors to new source immediately — child doesn't lift finger between dots. `pointerup` / `pointercancel` cancels drag.

3. **`renderAuthor(wrap, ctx)`** — authoring tool. 400×400 `<canvas>` (fixed internal size, CSS-scaled). `pointerdown` on canvas places a dot; coordinates are halved (`/2`) to normalise to the 200×200 viewBox. Numbered labels are `position:absolute` divs in the canvas wrapper, synced via `syncLabels()` on click + `ResizeObserver`. Upload via `FileReader` → `drawImage`. "Save & Play" pushes to `APP.DOT_PUZZLES` and immediately calls `renderPlay`.

### Puzzle data format
```js
{
  id: 'unique-id',       // string
  name: 'Display Name',  // shown in card + topbar
  viewBox: '0 0 200 200', // always 200×200 for built-in puzzles
  closed: true,          // true = last dot connects back to first
  image: null,           // null or data-URL (set by author tool for image-backed puzzles)
  dots: [{ x, y }, ...]  // in connection order, viewBox coordinates
}
```

### Cleanup / lifecycle
- No explicit `destroy()` — event listeners live on elements that are removed when `wrap.innerHTML = ''`.
- **One exception**: `renderAuthor` creates a `ResizeObserver` (`_resizeObs`) that must be manually disconnected. It's stored as a local closure variable and disconnected on the back button click. This pattern must be preserved if `renderAuthor` is extended.
- `injectStyles()` is idempotent (checks for `#dots-css`).

### Constraints & Gotchas
- **`clientToSvg()` in dots.js is a local copy** of the same helper in `tracer.js`. If coordinate mapping logic needs changing, update both.
- **Author canvas is fixed 400×400** internally (not DPR-aware). This is deliberate — the canvas is only used for layout reference, not final art. Coordinates are halved to 200×200, so `canvas.width/height` must stay at 400 for the normalisation to hold.
- **Custom puzzles are session-only**: `APP.DOT_PUZZLES.push(puzzle)` adds to the runtime array only. On page reload, only the built-in puzzles in `data/dotPuzzles.js` survive.
- **`puzzle.image` on built-in puzzles is `null`**: only author-created puzzles carry a data-URL image. The `bgImg` SVG `<image>` element is only created when `puzzle.image` is truthy.

## Session Summary — 2026-06-10
Completed:
1. Reviewed dots.js architecture — notes added above.
2. Added 4 new built-in dot puzzles to `data/dotPuzzles.js`: Crown, Tree, Arrow, Moon.
3. Merged iPad portrait/landscape optimisation (puzzle + painting) from claude/continue-task-gmhwx0 to main.
NEXT STEP: Consider adding remaining story illustrations (Three Little Pigs pages 4–11, then other stories). No active code tasks.
Blockers: none
Half-finished: none
Security flags added: none

## Session Summary — Phase 1 Overhaul (2026-06-10)
Completed all 12 steps of Phase 1 shared infrastructure:
1. `js/store.js` — APP.store localStorage wrapper (get/set/remove with JSON + error handling)
2. `js/settings.js` rework — persistent settings (al.global, al.game.letters), per-game registry, sfxVol/sfxMuted/bgMusicVol/bgMusicEnabled keys, legacy alias sync
3. `js/audio.js` rework — split sfxMaster/bgMaster gain nodes; APP.audio.sfx namespace (click/wrong/pop + tone2 ramp); APP.audio.music namespace (play/stop/setVol/setEnabled with 6 WebAudio background tracks); backward compat preserved
4. `js/ui.js` — APP.ui.topbar (std-topbar grid, smart back), APP.ui.settingsPanel (declarative modal), APP.ui.bigButton, APP.ui.defaultBackTarget, APP.ui.isShortLandscape
5. `styles.css` — bounded Phase 1 section appended; painting refactored to --paint-topbar-w / --paint-rail-w CSS vars
6. `data/i18n.js` — ~80 new keys in all 6 locales (en/pt/fr/es/de/it)
7. `data/locations.js` — APP.LOCATIONS registry + APP.locationOf()
8. 9 stub screens — map, location, tictactoe, memory, maze, shapes, colours, washing, music
9. `index.html` — store.js before state.js; ui.js after icons.js; all new scripts added
10. `js/main.js` — APP.settings.load() called on boot
11. `CLAUDE.md` — Phase 1 architecture section added
12. Tests — store.test.js (3) + settings.test.js (12) = 15 new tests; all 166 tests pass

NEXT STEP: Phase 2 — implement real map screen, location sub-menu, and connect landing to map as default.
Blockers: none
Half-finished: none
Security flags added: none

# Animal Letters — Tasks

## Section 1 — Core Infrastructure
- [x] Create project directory structure (`js/`, `js/screens/`, `data/`, `assets/`)
- [x] `index.html` — single page, correct script load order, `<main id="app">`
- [x] `styles.css` — CSS variables, layouts for all screens, button styles, animations
- [x] `js/main.js` — screen router, `ctx.go()`, initial render
- [x] `js/state.js` — central state object, `startGame()`, `advanceLetter()`, `skipAnimal()`
- [x] `js/settings.js` — in-memory settings, no persistence
- [x] `js/animals.js` — `pickRandom(maxLength, exclude)`

## Section 2 — Letter Data
- [x] `js/letterData.js` — uppercase A–Z (26 glyphs) with stroke paths
- [x] `js/letterData.js` — lowercase a–z (26 glyphs) with stroke paths
- [x] `APP.getLetter(char)` helper respects `APP.state.settings.letterCase`

## Section 3 — Tracer Engine
- [x] `js/tracer.js` — 5-layer SVG stack (mask, ghost, done, ink, guide)
- [x] SVG `<mask>` confinement — ink stays inside letter shape
- [x] Checkpoint sampling via `getPointAtLength()` (18 points per stroke)
- [x] `clientToSvg()` coordinate mapping using `getScreenCTM().inverse()`
- [x] Pointer events — `pointerdown`, `pointermove`, `pointerup`, `pointercancel`, `pointerleave`
- [x] Checkpoint-walk progress detection (TOLERANCE = 32 viewBox units)
- [x] Stroke completion → done group, guide advances to next stroke
- [x] All strokes complete → `onComplete()` fires after 350 ms delay
- [x] `destroy()` method cleans up event listeners and clears DOM

## Section 4 — Tracer Polish
- [x] Guide dot renders at last-completed position (not next-required) — eliminates ink gap
- [x] Ink gating: only deposit ink within DRAW_RADIUS (52 units) of guide dot
- [x] Progress advances on pointer *move* only — static tap does not advance checkpoint
- [x] White halo behind orange guide dashes — readable over pink ink
- [x] White ring behind orange guide dot
- [x] Seamless cross-stroke tracing — no lift required at stroke intersections

## Section 5 — Screens
- [x] `js/screens/landing.js` — New Game / Continue / My Animals / Settings
- [x] `js/screens/setup.js` — max length, case, depiction, reveal mode; Start button
- [x] `js/screens/game.js` — tracer mount, name strip (faint/hidden modes), letter advance
- [x] `js/screens/complete.js` — hooray screen, animal image, Next / Gallery / Home
- [x] `js/screens/gallery.js` — locked/unlocked tile grid, peek-of-head effect

## Section 6 — Audio
- [x] `js/audio.js` — full Web Audio API rewrite (no audio files required)
- [x] `_wake()` — AudioContext init from first user gesture
- [x] `strokeDone()` — short 880 Hz tick
- [x] `letterDone()` — ascending C–E–G arpeggio
- [x] `wordDone()` — fanfare sequence
- [x] `playComplete(src)` — fanfare + animal sound file 900 ms later
- [x] `stopFile()` — stops HTMLAudioElement on navigation
- [x] Autoplay policy handled correctly (lazy AudioContext)

## Section 7 — Animal Data & Assets
- [x] `data/animals.js` — 3 seed animals (CAT, DOG, OWL)
- [x] `data/animals.js` — expanded to 25 animals (3–6 letter names)
- [x] `assets/images/cartoon/` — SVG placeholder for each of the 25 animals
- ~~`assets/images/realistic/` — real photos~~ (dropped 2026-05-21 — see Section 11b)
- ~~`assets/audio/` — real animal sound MP3s~~ (dropped 2026-05-21 — see Section 11b)

## Section 8 — Gallery
- [x] Gallery screen accessible from landing and complete screens
- [x] Fixed 140×140px tile grid (`repeat(auto-fill, 140px)` + `justify-content: center`)
- [x] Locked tile: name as underscores, greyed peek-of-head at bottom, no lock icon
- [x] Unlocked tile: full centred image, display name, accent border ring
- [x] Completed animals tracked in `APP.state.completedAnimals` Set
- [x] Count badge in gallery header (`done / total`)
- [x] Back button → previous screen (via `APP.state.previousScreen`)
- [x] Locked tile underscores: `join('')` + `white-space: nowrap` + JS font-size scaling (≤6→1.2rem, ≤8→1.0rem, ≤10→0.85rem, 11+→0.72rem) — prevents wrapping for long names
- [x] Animal name font size increased to 1.2rem with fixed 36px height row

## Section 9 — Infrastructure & Deployment
- [x] `CLAUDE.md` committed — architecture reference for Claude Code
- [x] GitHub repo created (`alexandertravis/animal-letters`)
- [x] Initial push to `main` branch
- [x] Dev docs directory: `dev/active/animal-letters/`
- [x] `animal-letters-plan.md`
- [x] `animal-letters-context.md`
- [x] `animal-letters-tasks.md` (this file)

## Section 12 — UI Polish & Settings (2026-05-07 session)
- [x] `js/icons.js` — `APP.ICONS` SVG icon system: home, settings, volumeOn, volumeOff, back — all `currentColor`, consistent across platforms
- [x] `js/main.js` — `APP.state.previousScreen` tracking in `ctx.go()` for correct back-navigation
- [x] `js/state.js` — `volume: 0.7` and `muted: false` added to `DEFAULT_SETTINGS`
- [x] `js/audio.js` — master `GainNode` routing all synth tones; `setVolume()`, `setMuted()`, `_applyGain()`; tone-on-drag volume preview
- [x] `js/screens/setup.js` — volume slider + mute button with SVG icons; `fillRange()` for purple webkit fill; scrollbar at screen edge (`.setup` full-width / `.setup-inner` centred); back button → blue secondary style; equalised button widths
- [x] `js/screens/game.js` — `tileMetrics(nameLength)` calculates tile size from viewport width; name strip always single row on mobile; icon buttons use `APP.ICONS`
- [x] `js/screens/complete.js` — "Great Job! 🎉" replaces "Play Sound"; 2-column grid (My Animals | Next Animal, then Great Job full-width); animal name respects `letterCase` setting; clamp font size matches "Hooray!"; icons use `APP.ICONS`
- [x] `js/screens/gallery.js` — back uses `APP.state.previousScreen`; back button uses `APP.ICONS.back`; locked tile underscore fix; name font size increase
- [x] `js/screens/letters.js` — `launchConfetti()` on "Great Job!" click; button labels "Great Job! 🎉" / "Try Again"; back button uses `APP.ICONS.back`
- [x] `js/screens/devanimals.js` — Test tab: animal picker, ABC/abc case toggle, tracer stage, clickable name strip, auto-advance 600ms, confetti; Review tab retained; back uses `APP.ICONS.back`
- [x] `styles.css` — custom range slider (no hover colour change, purple `#a78bfa` fill via `fillRange()` JS gradient + `::-moz-range-progress`); `.btn.success` green; complete screen action grid; setup full-width scroller pattern; name strip `flex-wrap: nowrap`; icon button alignment

## Section 10 — Letter Shape Polish
- [x] Add horizontal X-scale squeeze to all letters (uppercase 0.85, lowercase 0.80, centred at X_CENTER=100)
- [x] Add `APP.GUIDE_CONFIG` object to `letterData.js` — centralises guideline appearance (color, opacity, dash patterns, y positions)
- [x] Map each letter to correct guideline anchors via `APP.getLetterYTransform(char)`:
  - Uppercase A–Z: cap-height → baseline
  - Ascender group (b, d, f, h, k, l, t): top guide → baseline
  - Descender group (g, j, p, q, y): identity transform, paths authored in guide coordinates
  - Standard lowercase (others): x-height → baseline
- [x] Fix descender letters (g, j, p, q, y) — bowl squash resolved by using identity transform
- [x] Fix i/j dot — rendered as `<circle>` in transform-free overlay groups to avoid elliptical distortion from non-uniform SVG scale
- [x] Fix lowercase n arch — double-quadratic so hump sits at x-height, not above
- [x] Make circular counters for a, b, c, d, e, g, o, p, q — compensated rx so display ratio is 1:1
- [x] Extend lowercase g tail to width of bowl
- [x] Horizontal squeeze applied to `js/screens/letters.js` (letter-patterns review screen) to match tracer rendering
- [x] **Fix capital S** — updated to smooth opposing cubics: `M 140,75 C 140,30 60,30 60,75 C 60,105 60,105 100,125 S 140,145 140,175 C 140,220 60,220 60,175`

## Section 11 — Known Behaviour (intentional)
- ℹ️ **Stacked confetti** — clicking "Great Job! 🎉" multiple times layers additional confetti canvas animations. Each canvas self-removes after its duration. This is intentional — it's a feature, not a bug.

## Section 13 — i18n + Accented Characters (feature/accents branch)
- [x] `data/i18n.js` — all UI strings EN + PT (27 keys each) with `{placeholder}` syntax
- [x] `js/i18n.js` — `APP.t(key, vars)`, `APP.setLocale()`, `APP.loadLocale()` with localStorage persistence
- [x] `js/state.js` — `locale: 'en'` added to DEFAULT_SETTINGS
- [x] `js/main.js` — `APP.loadLocale()` called on boot before route
- [x] `js/utils.js` — `APP.isUpperLetter(ch)` Unicode-safe uppercase detection
- [x] `js/tracer.js` — `/[A-Z]/` replaced with `APP.isUpperLetter()`
- [x] `js/screens/letters.js` — `/[A-Z]/` replaced with `APP.isUpperLetter()`
- [x] `js/letterData.js` — `getLetterYTransform()` uses `APP.isUpperLetter()`
- [x] `js/screens/landing.js` — all strings → `APP.t('landing.*')`
- [x] `js/screens/game.js` — button labels → `APP.t('game.*')`
- [x] `js/screens/complete.js` — all strings → `APP.t('complete.*')`
- [x] `js/screens/setup.js` — all strings → `APP.t('setup.*')`; language dropdown with flags at top
- [x] `js/screens/gallery.js` — locale-aware animal list via `APP.animals.eligibleAll()`; "My Animals" → `APP.t()`
- [x] `js/animals.js` — `getAnimalList()` locale switch; `eligibleAll()` added to `APP.animals`
- [x] `data/animals-pt.js` — 19 Portuguese animals using confirmed-existing SVG images
- [x] `js/letterData.js` — `APP.ACCENTS` generic accent system (acute, circumflex, tilde, grave, cedilla)
- [x] `js/letterData.js` — 22 accented char references (`{ base, accent }`) replacing 22 skeleton entries
- [x] `APP.getLetter()` updated to compose base + accent strokes at runtime
- [x] `styles.css` — `.locale-select` dropdown styled to match design (muted bg, custom caret, 48px min-height)
- [x] Accent strokes authored for `acute.upper/lower` (Á á É é Í í Ó ó Ú ú)
- [x] Accent strokes authored for `circumflex.upper/lower` (Â â Ê ê Ô ô)
- [x] Accent strokes authored for `tilde.upper/lower` (Ã ã Õ õ)
- [x] Accent strokes authored for `cedilla.upper/lower` (Ç ç)
- [x] Uncomment CÃO and LEÃO in `data/animals-pt.js` once tilde + cedilla strokes ready

## Section 14 — Story Library (2026-05-21 session)
- [x] `data/stories.js` — 8 unlockable stories (Goldilocks, Three Pigs, Hare & Tortoise, Ugly Duckling, Three Billy Goats, Three Blind Mice, Hey Diddle Diddle, Owl & Pussy-Cat)
- [x] Page format: `{ text, image }` (explicit SVG path, NOT `animal` id)
- [x] `js/utils.js` — `APP.isStoryUnlocked(story)`, `APP.getUnlockedStories()`
- [x] `js/utils.js` — `APP.animalStars(animal)` (0–3 stars), `APP.starsHtml(filled, total)`
- [x] `js/state.js` — `newlyUnlockedStories[]`, `currentStory`, `currentPage` added to state
- [x] `js/state.js` — `advanceLetter()` snapshots unlocked stories before incrementing count, detects newly unlocked after save
- [x] `js/screens/library.js` — achievements section + books grid; unlocked/locked tiles; fade-out before ctx.go
- [x] `js/screens/storyreader.js` — full open-book simulation (see Section 15)
- [x] `js/screens/complete.js` — unlock banner + "Read now →" button when story newly unlocked
- [x] `js/screens/landing.js` — "Story Library" button added
- [x] `data/i18n.js` — all 6 locales: `landing.library`, `library.*`, `reader.finish`, `complete.readNow`
- [x] `index.html` — `data/stories.js`, `js/screens/library.js`, `js/screens/storyreader.js` script tags
- [x] `styles.css` — library, book-tile, achievement, unlock-banner, reader CSS

## Section 15 — Book Simulation Reader (2026-05-21 session)
- [x] Phase state machine: `'closed'` → `'opening'` → `'open'` → `'closing'`
- [x] Closed cover: cover colour + title + animal art + "Tap to open"; swings open via `coverSwingOpen` keyframe (perspective rotateY, 420ms)
- [x] Two-panel spread: left = text, right = SVG image; `.book-page.left` / `.book-page.right`
- [x] Synthetic spreads: title (left=colour, right=title+art) and outro (left="The End", right=colour) generated at runtime
- [x] Background layer `.spread-bg` pre-renders incoming spread for page-turn visibility
- [x] Page turns via `clip-path: inset()` — direction-aware; right collapses then left grows (or mirror for prev)
- [x] Corner triangle folds (bottom-left/right) as nav controls
- [x] Outer nav arrows positioned left/right of book
- [x] Page counter floats top-centre; hidden on title/outro spreads
- [x] Scene overlay fades in/out; book zooms in via `bookIn` keyframe
- [x] Library fades out (0.3s) before `ctx.go('storyreader')`

## Section 16 — Dev Tools (2026-05-21 session)
- [x] Animal Review → "Counts" tab: alphabetical list of all animals with +/− steppers to manually set `animalCompletionCounts`, for testing story unlock requirements
- [x] "Reset all counts to 0" button; keeps `completedAnimals` Set in sync
- [x] `styles.css` — `.devanimals-counts*` CSS

## Section 17 — Audio & Phonics (2026-05-21 session)
- [x] Speak letter on mount (child knows what to trace)
- [x] Speak letter on completion (confirmation before advancing)
- [x] `APP.TRACER_CONFIG.PHONICS_ADVANCE_DELAY` (currently 1400ms) — configurable delay before screen advance
- [x] Animal name spoken after image spin on complete screen
- [x] Volume slider in game topbar; hidden below 480px, visible at 480px+
- [x] Mute button in game topbar
- [x] `lastVolume` setting: saves last non-zero volume; restores on un-mute from 0
- [x] `setVolume(0)` auto-mutes; `setMuted(false)` restores from `lastVolume`

## Section 18 — Stars System (2026-05-21 session)
- [x] `APP.animalStars(animal)` — 0-3 stars based on `animalCompletionCounts` (≥1=1★, ≥3=2★, ≥5=3★)
- [x] `APP.starsHtml(filled, total)` — `★` U+2605 for both states, CSS colour classes
- [x] Complete screen: large star badge (top-right of image box, `animal-stars-badge--lg`)
- [x] Gallery screen: star row between name and image (in flex flow, not absolutely positioned)
- [x] Removed per-letter score overlay (was broken; replaced by animal-level stars)

## Section 19 — Book Animation Round 4 Polish (2026-05-21 session)
- [x] Corner fold flap: darken gradient stops (#9e9080 / #b5a995 / #8a7d6c) + `outline: 1px solid rgba(0,0,0,0.14)` for clear physical separation from page
- [x] `collapseToClosedCover()` — click inside front cover (left page, spread 0) reverses open animation back to closed state without navigating
- [x] Close button (✕) navigates to library immediately when `phase === 'closed'` or `'closing-to-cover'`
- [x] `flutterAndClose()` — tapping back cover fans 4 rapid flutter leaves (250ms each, 90ms stagger) before cover swing; `.page-leaf.flutter-leaf` CSS rule
- [x] Removed "Tap to open" hint text from closed cover; replaced with `bookIdleShake` periodic CSS animation (5s cycle, 2s initial delay, ~12% motion)
- [x] Cover image size stability: hide bookClosed via `opacity/pointerEvents` (not `display:none`) to preserve flex layout; pause `animationPlayState` when hidden; reset animation on restore so cover reappears at `rotate(0deg)`
- [x] Title text wrapping fix: removed `padding: 28px 24px` from `.leaf-face.cover-face` (was narrowing text container by 48px vs `.book-closed`); leaf face and bookClosed now have identical layout width (verified: both 330.68px at 1280px viewport)
- [x] Naming convention established: **flap** = lifted triangle (back-of-page, darker); **shadow** = cast shadow above the crease

## Section 20 — Book Close Polish (feature/library-theming, 2026-05-22)
- [x] Mid-book close (✕ mid-read): left page content mirrored onto cover leaf front face; right page stays visible; cover sweeps across both pages naturally
- [x] Cover open/close speed: `.page-leaf.cover-leaf` CSS override at 0.95s (page turns stay at 0.6s)
- [x] `COVER_MS = 950` constant alongside `FLIP_MS = 600` — all cover timeouts use COVER_MS, page-turn timeouts unchanged
- [x] `COVER_PAUSE = 550` — delay between cover landing and scene fade (user-tuned)

## Section 21 — Library Theming / Skin System (feature/library-theming, 2026-05-22)
### Phase 1 — Bookshelf + face-out book tiles ✅
- [x] `index.html` — injected SVG defs (gold gradients, corner-flourish, crest, pendant, padlock, shelf props candle/hourglass/quill/key/teapot/lamp, page-illustration frames) after `<body>`, before `<main>`
- [x] `styles.css` — appended Phase-1 skin CSS (design tokens, `.bookshelf` walnut/storybook, face-out `.book` classic/watercolour skins, locked padlock cameo, `.shelf-prop`). **All `.book…` selectors scoped under `.bookshelf`** to protect the reader's `.book` container; `animation:none` reset added so shelf books don't inherit the reader's `bookIn`
- [x] `js/screens/library.js` — replaced with skinnable bookshelf renderer; `SHELF_SKIN = 'skin-storybook'`; topbar/achievements/fade-out/i18n preserved; locked label uses `APP.t('library.locked')`
- [x] `data/stories.js` — added `skin` + `leather`/`board` to all 8 stories (legacy `color` kept as fallback)
- [x] Verified: storybook shelf renders 8 books (2 unlocked / 6 locked), props present, no console errors; **reader regression check passed** — open-book `.book` retains width 740px / aspect 2:1.35 / transition 0.55s, animations untouched (storyreader.js not edited)

### Phase 2 — Reader skin ✅ (links to the same theme dial)
- [x] Shared theme helper in `js/state.js` — `APP.LIBRARY_THEMES` + `APP.activeTheme()`/`APP.activeBookSkin()`; `state.libraryTheme` (session-only). `library.js` consumes it
- [x] Shared cover component `js/screens/bookCover.js` → `APP.bookCover(story,{skin,locked})` building `.story-cover`; new `<script>` in `index.html` before library.js. Used by shelf card AND reader (closed cover + swing leaf)
- [x] Migrated cover visual CSS from `.bookshelf .book .cover…` → unscoped `.story-cover.skin-*`; shelf geometry stays on `.bookshelf .book`
- [x] `storyreader.js`: derive `skin` + `palette` from `APP.activeBookSkin()`; `buildPageFrame()`; rewrote `applyLeft`/`applyRight` for our real spread types (`color`→inside-cover fill, `text`→frame+page-content+page-num, `image`→frame+page-img+page-num, `title`→title-page, `theend`→theend); `renderCover` + static `.book-closed` use `APP.bookCover`. **Flip choreography / timing / state machine untouched**
- [x] Appended reader CSS (paper, foxing, page-frame, page-content+drop-cap, page-img, page-num, inside-cover-*, title-page, theend, frame-* variants). Reconciliations: skipped handoff `.page-fold`; scoped gilt shimmer to `:not(.cover-leaf):not(.flutter-leaf)`; `.book-page-inner`/`.leaf-face` padding/position reset; leaf-face paper tone
- [x] Verified both skins in-browser + full animation regression (open swing, turn next/prev with skin riding the leaf, collapse-to-cover, close→library); transition 0.55s intact; no console errors
- [x] Animation fix round (post-review):
  - [x] Blank page showing during open/close swing — the skin paper rules (spec 0,3,0) outranked `.book-page.is-blank` (0,2,0); added matching-specificity `.is-blank` overrides (transparent bg + no shadow + hide foxing)
  - [x] Collapse/flutter cover flashing flat `story.color` — replaced `L.front.style.background = story.color` with `applyLeft(L.front, spreads[0])` so the inside cover stays skinned through the swing
  - [x] Page numbers obscured by corner folds → centred at bottom of each panel (`left:50%`+translateX)
  - [x] Page numbers identical (1,1) → now consecutive per panel (left `2n-1`, right `2n` → 1,2 / 3,4)
  - [x] Book briefly disappeared on open — `.book-spread` had `animation:spreadReveal` (opacity 0→1) that replayed on display:none→flex, fading the cover leaf up from transparent (obvious with the darker covers). Removed the fade; cover leaf now visible from frame one
- [x] Reader fonts bundled — user added font folders; fixed `@font-face` `src` to the subfolder paths (`assets/fonts/Cinzel/…`, `EB_Garamond/…`, `Fraunces/…`). All three load (verified `document.fonts.check`); classic drop cap now renders in real Cinzel
- [x] **Basic theme** (3rd dial option, for testing) — plain unskinned baseline: `APP.LIBRARY_THEMES.basic` (shelf `skin-basic`, book `basic`); `bookCover.js` basic branch (flat colour + animal + title); `storyreader.js` basic branches in applyLeft/applyRight (plain `.book-text`/`.book-img`/colour fills, no frames/page-nums); CSS `.bookshelf.skin-basic` + `.story-cover.skin-basic`. Verified plain in shelf + reader; classic/watercolour unaffected

### Phase 3 — Per-page image frames (DEFERRED)
- [ ] Optional `frame` field per page (`vignette`/`rect`/`oval`/`circle`/`arch`/`wash`); default rect (classic) / wash (watercolour)

### Cleanup (follow-up)
- [ ] Remove now-dead `.book-tile` / `.books-grid` CSS (`styles.css` ~1125-1205) and the old `.book-tile-*` rules once Phase 1 is accepted

## Section 22 — Animation & Phonics Bug Fixes (feature/animation-fixes, 2026-05-23)
- [x] **Issue 1 — White flash on cover open/close**: `renderCover()` now pre-sets `face.style.background = story.color` before appending the cover component, so no parchment shows during DOM construction
- [x] **Issue 2 — Flutter leaves hardcoded cream**: Flutter leaf background colours now derived from `bookSkin` (walnut→`var(--parch-2/3)`, watercolour→`var(--paper-1/2)`, basic→original hex)
- [x] **Issue 3 — Corner folds too large on mobile**: `.page-fold` width/height → `clamp(36px, 7.5vw, 60px)`
- [x] **Issue 4 — Pendant doesn't scale**: `.book.book-classic .page-frame .pendant` width/height → `clamp(16px,3vw,32px)` / `clamp(20px,4vw,42px)`
- [x] **Issue 5 — Page number position**: `.page-num` bottom → `clamp(4px,1.2vw,14px)`, font-size → `clamp(8px,1vw,11px)`
- [x] **Issue 6 — iOS/Chrome page flip backface bug**: Added `-webkit-transform-style: preserve-3d` and `will-change: transform` to `.page-leaf`
- [x] **Issue 7 — Watercolour portrait miscentred**: `.story-cover.skin-watercolour .cover-portrait` changed `left:50%` → `left:calc(50% + 4px)` to account for 8px spine shadow
- [x] **Issue 8 — iOS TTS says "Capital A"**: `speakLetter()` now passes `char.toLowerCase()` to `SpeechSynthesisUtterance`

## Section 23 — iOS / Mobile Reader Animation Fixes (main, 2026-05-24)
- [x] **Book enlarges on cover open**: `clip-path` on `.book-spread` created a composited iOS layer that popped on `display:none → display:flex`. Removed `clip-path` from `.book-spread` entirely.
- [x] **Fold/spine jump before page turn**: spring overshoot on `.page-fold` transition caused jump when `is-flipping` added. Fixed: `transition:none` on `.book-spread.is-flipping .page-fold`.
- [x] **Image flash at page-turn start (NEXT)**: `applyRight(L.front, current)` created off-DOM image decoded at wrong size. Fixed: move existing `rightInner` children to `L.front` (preserves GPU-decoded texture).
- [x] **Owl SVG flash after PREV page turn**: `applyRight(rightInner, incoming)` post-timeout created fresh undecoded SVG. Fixed: move `Lp.back` children (already rasterised in-DOM for FLIP_MS) to `rightInner` + `rightInner.innerHTML = ''` before move.
- [x] **Shadow full-width on cover open**: `display:none → block` + `void offsetWidth` unreliable on iOS (browser batches). Fixed: `clip-path:inset(0 0 0 50%) → inset(0 0 0 0%)` transition on `.book-spread-shadow` (no display change); `opacity:0/1` instead of display.
- [x] **Corner colour bleed at curved cover corners**: `.book-page` had square corners exposing dark background behind `.book-spread` border-radius. Fixed: matching `border-radius` on `.book-page.left/.right`; `clip-path: inset(0 round …)` on `.leaf-face.front/.back` per direction.
- [x] **Page content outside decorative border**: classic inset raised to `clamp(34px,8vw,80px)` uniform (clears 74px ornament extent); watercolour sides raised to `clamp(20px,3.8vw,46px)`.
- [x] **Basic skin page-flip texture**: added `radial-gradient` back-face rules for `.book.book-basic .page-leaf .leaf-face.back` with focal point mirrored left↔right vs front face.

## Section 24 — Lock Requirements Overlay (main, 2026-05-24)
- [x] **Padlock on basic skin**: basic locked covers previously showed no padlock. Added inline SVG padlock icon (`basic-lock-icon`) inside locked basic cover.
- [x] **Requirements panel on all themes**: `.cover-reqs` overlay (dark semi-transparent panel, `position:absolute;bottom:0`) appended to `.book` wrapper (NOT `.story-cover`) so it sits outside the is-locked desaturation filter.
- [x] **Star progress rows**: `buildLockReqs(story)` builds one row per requirement — filled gold stars up to `animalCompletionCounts[animalId]`, grey stars for remainder, then animal name. Live from state on every library render.
- [x] **Star colour standardised**: `STAR_GOLD = '#ffc72c'` / `STAR_GREY = '#a09890'` as named constants in `bookCover.js`. Single source of truth across all three themes (bookCover is shared).
- [x] **Filter inheritance fix**: CSS `filter` on a parent composites children before applying — child filters cannot undo it. Correct fix: moved `.cover-reqs` to be a sibling of `.story-cover` (child of `.book`) so the is-locked filter never reaches it. `APP.buildLockReqs` exposed publicly; `library.js` calls it after appending the cover.

## Section 25 — Responsive / Landscape Layout (main, 2026-05-24)
- [x] **`viewport-fit=cover`**: added to viewport meta in `index.html` to enable `env(safe-area-inset-*)` on iOS
- [x] **`#app` safe-area insets**: `padding: env(safe-area-inset-top/left/right/bottom, 0px)` so notch/home-bar never hides content
- [x] **Landing scroll fix**: `overflow-y: auto` + `justify-content: flex-start` + `padding: max(24px, 8dvh)` — Settings button no longer clipped in landscape
- [x] **Landing 2-col landscape menu**: `@media (max-height:600px)` gives `.landing .menu` `flex-wrap:wrap` 2-column layout; all 7 buttons fit within 375px landscape height
- [x] **Complete scroll fix**: `overflow-y: auto` on `.complete`, `justify-content: flex-start` on `.complete-body` — hooray title + image + buttons all scrollable
- [x] **Base `.topbar` rule**: added `display:flex; align-items:center; flex-shrink:0` — library, numbers, progress topbars were `display:block`, causing vertical stacking
- [x] **Game landscape compact**: `grid-template-rows: 48px 1fr auto; gap: 4px` in `@media (max-height:600px)` — stage gains a few more pixels
- [x] **FindLetter 4×1 landscape**: `grid-template-columns: repeat(4, 1fr)` in landscape — tiles stay visible in a single row (was 2×2, overflowed)
- [x] **Numbers compact picker**: `min-width/height: 36px` on buttons in landscape
- [x] **Library landscape**: books shrink to 96px, rows to 150px min-height, trailing plank hidden (`bookshelf > .bookshelf-plank:last-child { display:none }`)
- [x] **`booksPerRow()` landscape sync**: added `H < 600 && W >= 480 ? 96` branch so JS row grouping matches CSS book width in landscape

## Section 26 — Landscape Polish Round 2 (main, 2026-05-25)
- [x] **Library shelf planks**: removed `.bookshelf > .bookshelf-plank:last-child { display:none }` — every row now has a visible plank underneath it in landscape
- [x] **Library `booksPerRow()` sync**: corrected SHELF_PAD for landscape (12px not 24/36px), added PROP_SPACE=92px reservation for shelf props at W≥768, added self-cleaning window resize listener (re-renders only while `wrap` is in DOM)
- [x] **Game sidebar icons**: `APP.ICONS.restart` (circular arrow) + `APP.ICONS.skip` (skip-forward) added to `js/icons.js`; restart/skip buttons converted from `btn ghost` text to `btn icon ghost` — fit the 40px sidebar column without rotation
- [x] **Game landscape sidebar cleanup**: removed `writing-mode:vertical-rl` + height/padding overrides from `.game .topbar .group:last-child .btn` (now unneeded with icon buttons)
- [x] **Strip height in landscape**: `tileMetrics()` caps tile width at 40px in landscape (`window.innerHeight < 600`), reducing tile height 72→51px and strip height ~80→59px; gives stage ~21px more tracing room
- [x] **Tap-to-complete strokes**: `tracer.js` `onDown` now calls `checkProgress()` for regular strokes when `currentCheckpoint ≥ 75%` of total — tapping the near-invisible tail of a stroke finishes it without requiring a drag
- [x] **Stars badge in landscape**: `.animal-stars-badge--lg` overridden to `font-size:1.4rem` in `@media(max-height:600px)` — scales with the smaller 200px/40vh landscape image box
- [x] **Complete screen 3-column layout**: changed from 2-column `"body nav"/"body actions"` to single-row 3-column `"nav body actions"` (`60px | 1fr | 140px`); home/settings LEFT sidebar, animal content CENTRE, action buttons RIGHT; topbar uses `border-right` not `border-bottom`
- [x] **Complete topbar group stacking**: `.complete .topbar .group { flex-direction:column }` so two icon buttons fit within the 60px nav column
- [x] **Story reader landscape**: `.book { width: min(740px, 92vw, calc(88vh * 2 / 1.35)) }` in landscape — prevents the 2:1.35 aspect-ratio spread from overflowing the viewport height (e.g. 489px × 330px on iPhone SE landscape)

## Section 11b — Future / Nice-to-Have
- [ ] Real cartoon SVG artwork for all animals
- [ ] Real realistic photos for all animals
- [ ] Real animal audio MP3s for all animals
- [ ] Additional animals (target: full A–Z coverage by first letter)
- [ ] Replace story SVG illustrations with real hand-drawn page images (storyreader `page.image` already accepts any path)
- [ ] Book simulation: test on mobile/tablet and tune book aspect ratio + font sizes
- [ ] Story Library: "Read" label on locked tiles showing remaining requirements more visually
- [ ] Difficulty levels (stroke tolerance, draw radius)
- [ ] Accessibility audit (ARIA labels, keyboard fallback)
- [ ] Accent strokes for PT locale (acute, circumflex, tilde, cedilla) — see Section 13

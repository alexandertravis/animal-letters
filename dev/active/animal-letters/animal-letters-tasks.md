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

## Section 11b — Future / Nice-to-Have
- [ ] Real cartoon SVG artwork for all animals
- [ ] Real realistic photos for all animals
- [ ] Real animal audio MP3s for all animals
- [ ] Additional animals (target: full A–Z coverage by first letter)
- [ ] Replace story SVG illustrations with real hand-drawn page images (storyreader `page.image` already accepts any path)
- [ ] Book simulation: test on mobile/tablet and tune book aspect ratio + font sizes
- [ ] Book simulation: close animation (cover swings back shut before scene fades)
- [ ] Story Library: "Read" label on locked tiles showing remaining requirements more visually
- [ ] Difficulty levels (stroke tolerance, draw radius)
- [ ] Accessibility audit (ARIA labels, keyboard fallback)
- [ ] Accent strokes for PT locale (acute, circumflex, tilde, cedilla) — see Section 13

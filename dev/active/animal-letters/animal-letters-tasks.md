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
- [ ] `assets/images/realistic/` — real photos (user to supply)
- [ ] `assets/audio/` — real animal sound MP3s (user to supply)

## Section 8 — Gallery
- [x] Gallery screen accessible from landing and complete screens
- [x] Fixed 140×140px tile grid (`repeat(auto-fill, 140px)` + `justify-content: center`)
- [x] Locked tile: name as underscores, greyed peek-of-head at bottom, no lock icon
- [x] Unlocked tile: full centred image, display name, accent border ring
- [x] Completed animals tracked in `APP.state.completedAnimals` Set
- [x] Count badge in gallery header (`done / total`)
- [x] Back button → landing

## Section 9 — Infrastructure & Deployment
- [x] `CLAUDE.md` committed — architecture reference for Claude Code
- [x] GitHub repo created (`alexandertravis/animal-letters`)
- [x] Initial push to `main` branch
- [x] Dev docs directory: `dev/active/animal-letters/`
- [x] `animal-letters-plan.md`
- [x] `animal-letters-context.md`
- [x] `animal-letters-tasks.md` (this file)

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
- [ ] **Fix capital S** — current path `M 155,55 C 168,55 168,125 100,125 C 32,125 32,195 45,195` looks bad. Need two equal opposing curves with smooth diagonal crossing, point-symmetric about centre
- [ ] **Reposition guidelines to 3 visible lines** — remove visible middle (x-height) line. Keep: top y=30 (cap height), bottom y=170 (baseline), lower y=240 (descender). Add `hidden: true` to middle entry in `APP.GUIDE_CONFIG` and filter it out in rendering loops in `tracer.js` and `js/screens/letters.js`

## Section 11 — Future / Nice-to-Have
- [ ] Real cartoon SVG artwork for all 25 animals
- [ ] Real realistic photos for all 25 animals
- [ ] Real animal audio MP3s for all 25 animals
- [ ] Additional animals (target: full A–Z coverage by first letter)
- [ ] Difficulty levels (stroke tolerance, draw radius)
- [ ] Celebration animations (confetti, bounce) on word complete
- [ ] Accessibility audit (ARIA labels, keyboard fallback)
- [ ] Cross-session save via localStorage (user opted out initially)
- [ ] Progress bar or star rating on complete screen

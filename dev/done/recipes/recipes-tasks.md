# Recipes — Tasks

## Section 1 — Core Infrastructure ✅
- [x] `data/recipes.js` — 3 recipes: Cake (`oven`), Pancake (`pan`), Doughnut (`fry`)
- [x] `js/vendor/gsap.min.js` — GSAP vendored (works on `file://`)
- [x] `index.html` — `data/recipes.js`, `gsap.min.js`, `screens/recipes.js` script tags
- [x] `data/i18n.js` — `recipes.*` keys added to `en` locale
- [x] Landing button: `data-act="recipes"` → `ctx.go('recipes')`
- [x] `APP.screens.recipes` registered in `js/screens/recipes.js`

## Section 2 — Step Flow ✅
- [x] `setStep(step)` — clears stage, routes to step function, kills tweens on change
- [x] `stepPick()` — recipe card grid, GSAP stagger card entrance
- [x] `stepIngredients()` — drag chips to bowl, `flyIntoBowl` arc, bowl-bit blobs, level rise, Mix button enables
- [x] `stepMix()` — GSAP quickTo spoon tracking, accumulated angle progress, ring fill, batter disc spin
- [x] `stepCook()` — routes to `cookOven` / `cookPan` / `cookFry`
- [x] `stepDecorate()` — drag toppings onto treat, snap-back, `S.placed[]` persists positions
- [x] `stepDone()` — elastic reveal, confetti, Make another / Home buttons

## Section 3 — Cook Variants ✅
- [x] `cookOven()` — pour-into-tin animation (bowl tilts, stream, tin fills) → oven SVG → drag tin to oven → door opens + closes → glow pulses → timer ring → cake rises out
- [x] `cookPan()` — pancake disc in SVG pan, `setInterval` browning, Flip button → pancake tosses + rotationX + bounces back → pan nudge
- [x] `cookFry()` — SVG oil pot, dough-ball drag, fry bubbles spawn loop, golden colour tween, timer ring, ball rises out

## Section 4 — GSAP Animation Upgrade ✅
- [x] **Commit** the 4 modified files (`data/i18n.js`, `index.html`,
  `js/screens/recipes.js`, `styles.css`) with message:
  `feat(recipes): GSAP-animated bowl filling, stir spoon, oven bake, pancake flip`

## Section 5 — Phase 2 Animation Polish ✅
- [x] **Pancake flip — pan tilt**: pan tilts -22° with `transformOrigin: '68% 55%'`,
  recovers with `back.out(1.8)`, recoil nudge on landing.
- [x] **Spoon appearance**: replaced `🥄` emoji with inline SVG wooden spoon (bowl at top,
  handle below, 24×96px). Z-index layering: batter z-index 2, spoon z-index 1 → bowl submerged.
- [x] **Oven — cake rise + steam**: `.oven-inner-view` injected over SVG window after door closes;
  batter fill rises to 64%, dome appears, `spawnSteam` runs for 1900ms.
- [x] **Per-ingredient animations**: `animCrack` (egg halves + yolk), `animPour` (SVG jug + stream
  + ripple), `animChunk` (2 tumbling chunks), `animSift` (24 flour particles + cloud).
- [x] **Batter wave + splashes**: `skewX` distortion on stir, `animSplash` on fast direction change.
- [x] **Circular hit test for decorating**: `hitCircle` replaces `hitTest` for topping placement.
- [x] **New CSS classes**: egg-top/bot/yolk, pour-jug/stream/ripple, butter-chunk, flour-particle,
  sift-cloud, spoon-svg, mix-splash, steam-puff, oven-inner-view/tin/cake-fill/dome.
- [ ] **Fry — oil shimmer**: animate the oil ellipse (subtle opacity pulse or
  small scale oscillation) while frying to reinforce the "hot oil" feeling. (deferred)

## Section 6 — More Recipes (Phase 3, future)
- [ ] Muffin — `cookType: 'oven'`, muffin tray (12-cup tin SVG) instead of
  single cake tin; toppings are sprinkles/chocolate chips
- [ ] Cookie — `cookType: 'oven'`, drag cookie-cutter to cut shapes, then
  decorate with frosting squeeze
- [ ] Pasta — `cookType: 'boil'` (new cook variant): boiling water SVG,
  drag pasta in, drain, add sauce

## Section 7 — i18n (future)
- [ ] Add `recipes.*` keys to other locales (pt, fr, es, de, it) once
  content is stable — currently falls back to English

# Recipes — Plan

## Goal & Motivation

Add a "Recipes" play mode to Animal Letters. Children pick a recipe (cake,
pancake, doughnut, etc.), then work through a tactile multi-step sequence:
add ingredients to a bowl → stir → cook → decorate → reveal. Every step
involves a physical action (drag, stir, flip) with immediate animated feedback,
making the process feel hands-on rather than passive.

## Agreed Approach

**No canvas, no HTML5 drag-and-drop.** The app runs on `file://` — canvas
`getImageData` is blocked by CORS, and HTML5 drag-and-drop doesn't work on
touch. Everything is DOM pointer events (the same pattern as `painting.js` and
`tracer.js`).

**GSAP for animations.** GSAP (loaded from `js/vendor/gsap.min.js` before
`recipes.js`) handles tweens, timelines, and spring eases. A thin guard layer
(`gto`, `gset`, `gtl`) lets all logic still run if GSAP fails to load — the
callbacks fire immediately as fallbacks.

**SVG scene art in-line.** All cooking vessels (bowl, oven, frying pot, pan)
are inline `<svg>` elements rather than image files, so they work on
`file://` and can be tinted/animated via GSAP `attr` tweens and CSS variables.

**Recipe data in `data/recipes.js`.** Adding a new recipe = one object in
`APP.RECIPES[]`. Each recipe declares `cookType` (`'oven'`, `'pan'`, `'fry'`)
which selects the cook mini-step automatically.

## Step Flow

```
Pick recipe → Ingredients → Mix → Cook → Decorate → Done
```

| Step | Mechanic |
|------|----------|
| **Pick** | Card grid; tap to select |
| **Ingredients** | Drag chips from tray into bowl; each flies in and settles; batter level rises |
| **Mix** | Drag `recipe-spoon` SVG in circles; progress ring fills; batter disc spins |
| **Cook (oven)** | Auto-pour into tin → drag tin to oven → door opens, tin slides in, glows, timer ring, cake rises out |
| **Cook (pan)** | Pancake browns over time → Flip button → pan tilts + pancake tosses + lands browned |
| **Cook (fry)** | Drag dough ball into oil pot → bobs, bubbles, timer ring, turns golden → rises out |
| **Decorate** | Drag toppings onto treat (snap-back so more can be added) |
| **Done** | Elastic reveal + confetti + Make another / Home |

## Phases of Work

### Phase 1 — Core flow ✅
- `data/recipes.js` — 3 recipes (Cake, Pancake, Doughnut)
- `js/screens/recipes.js` — all 6 steps, DOM drag, SVG vessels, GSAP animations
- `styles.css` — full recipe CSS, landscape breakpoints
- `data/i18n.js` — `recipes.*` keys in `en`
- `index.html` — GSAP vendor + data/recipes.js + screens/recipes.js wired
- Landing button wired (`ctx.go('recipes')`)

### Phase 2 — Animation quality polish (next)
- Pancake flip: pan should tilt/rise dramatically before pancake launches, not just a 8px nudge
- Spoon in mix step: replace 🥄 emoji with an SVG spoon for crisper rotation + scaling
- Oven bake: heat shimmer or steam effect rising from the cake as it emerges
- Fry: more active oil surface (ripple or shimmer on the oil ellipse during frying)

### Phase 3 — More recipes (future)
- Muffin (oven cook, muffin tray instead of single tin)
- Pasta (boil water → cook pasta → drain → add sauce)
- Cookie (oven, cut-out shapes, frosting decorations)

## Known Risks & Constraints

- **`file://` CORS**: no `fetch()`, no `getImageData` on external images. All
  art must be inline SVG or CSS.
- **GSAP load order**: `js/vendor/gsap.min.js` must load *before*
  `js/screens/recipes.js`. The guard (`var G = window.gsap || null`) makes
  the screen functional without GSAP but without smooth animations.
- **Touch-action**: the mix area and ingredient chips need `touch-action:none`
  so pointer-move doesn't trigger scroll; global `html,body` rule already
  covers this.
- **`setPointerCapture` is try/catch guarded** (same as tracer.js) — pointer
  IDs can become invalid on cancel events.

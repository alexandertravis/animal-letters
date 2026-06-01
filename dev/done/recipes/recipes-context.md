# Recipes — Context

## Key Files

| File | Role |
|------|-------|
| `data/recipes.js` | `APP.RECIPES[]` — 3 recipes. Each: `id`, `name`, `emoji`, `cookType`, `batterColor`, `cookedEmoji`, `ingredients[]`, `toppings[]`. |
| `js/screens/recipes.js` | All logic. IIFE, `render(root, ctx)`. State in `S = {recipe, step, placed}`. Step router calls `stepPick/Ingredients/Mix/Cook/Decorate/Done`. |
| `js/vendor/gsap.min.js` | GSAP 3 — animations. Must load *before* `recipes.js`. |
| `styles.css` | `/* ── Recipes ──*/` section (~line 3102). All recipe CSS. Landscape `@media(max-height:600px)` overrides at bottom of section. |
| `data/i18n.js` | `recipes.*` keys under `en:`. Other locales fall back to English automatically. |
| `index.html` | `data/recipes.js` loads after `data/i18n.js`. `gsap.min.js` + `recipes.js` load just before `main.js`. |
| `js/screens/landing.js` | Recipes button: `data-act="recipes"` → `ctx.go('recipes')`. |

## Architecture Notes

**GSAP guards** — Three thin wrappers handle the GSAP-absent case:
- `gto(target, vars)` — calls `G.to`; fires `onComplete` immediately if no GSAP
- `gset(target, vars)` — no-op if no GSAP
- `gtl(vars)` — returns a timeline or a stub that immediately fires `onComplete` + any `.call()` functions

**Dragging** — `makeDraggable(node, onDrop)` wraps the node in pointer events.
`onDrop(x, y, node)` returns `true` if the drop was consumed (so the node
stays where it was dropped), `false` to snap back.

**Hit testing** — `hitTest(zone, x, y)` pads the bounding rect by 20% in
each direction — forgiving for small fingers.

**Bowl filling** (`flyIntoBowl`)  
Ingredient `emoji` flies from drop position to bowl center via a 2-step GSAP
timeline (arc up, bounce down). On landing: a `bowl-bit` span appears inside
`.bowl-contents`, and `.bowl-level` height + opacity animate up. The level
height formula: `12 + ((idx+1) / total) * 34` → goes from ~14% to ~46%.

**Mix step**  
Mix area is an SVG bowl + overlay SVG (progress ring) + a `.mix-batter` div
+ `.recipe-spoon` emoji. `G.quickTo` drives the spoon position for smooth
lag-less tracking. A `batterSpin` tween (rotation 360, repeat:-1) plays while
pointer is down. Accumulated angle from `atan2` (delta-wrapped to ±π)
tracks progress; 3 full rotations = done.

**Cook — oven** (`cookOven`)  
Phase 1 (auto): bowl tilts + stream appears + tin fills (GSAP timeline).  
Phase 2: oven SVG + draggable tin. On drop: door opens (rotationX -82°) →
tin slides in → door closes → glow pulses + `addTimerRing(oven, 2600)` →
door opens → baked-cake emoji rises out → door closes → `advanceToDecorate`.

**Cook — pan** (`cookPan`)  
`.pancake` div sits in SVG pan. `setInterval` updates `pancakeShade(brown)` 
radial-gradient over 2.2s. After browning: Flip button appears.  
On click: pancake `y: -120` + `rotationX: +=180` toss, then bounce back.
Pan does a small `y: -8` nudge — this is where Phase 2 improvement lives.

**Cook — fry** (`cookFry`)  
Dough ball (`.dough-ball`) dragged into pot. On drop: `G.to(ball,
{backgroundColor})` fades to golden over 1.6s; `spawnBubbles` loop spawns
`.fry-bubble` elements for ms duration; `addTimerRing`; ball rises out golden.

**Decorate**  
Topping chips always snap back (`return false` from `onDrop`) so multiple
of the same topping can be added. Each drop spawns a `.recipe-placed` span
at `fx/fy` percentages (relative to the treat). `S.placed[]` stores positions
for replay on the Done screen.

**addTimerRing(host, ms)**  
Injects a `.recipe-timer` overlay with an SVG countdown ring into `host`.
Returns the `G.to` tween so it can be added to a timeline at the right position.

## Decisions Log

**2026-05-30** — Decision: GSAP loaded from `js/vendor/gsap.min.js` (vendored,
not CDN) so it works on `file://`. Guard wrappers (`gto`/`gset`/`gtl`) ensure
logic flows even if GSAP fails — fallback fires `onComplete` callbacks
immediately.

**2026-05-30** — Decision: DOM pointer events (not HTML5 drag-and-drop, not
canvas) for all dragging — matches the pattern in `tracer.js` and `painting.js`,
and works on `file://`.

**2026-05-30** — Decision: All cooking vessels (bowl, oven, pot, pan) are
inline SVGs so they're tintable, animatable, and never blocked by CORS.

**2026-05-30** — Decision: `makeDraggable` snaps back by default (if
`onDrop` returns false). This allows toppings to be added multiple times from
the same chip.

**2026-05-30** — Decision: Recipe data (`data/recipes.js`) is separate from
screen logic so new recipes can be added without touching `recipes.js`.
`cookType` drives which cook variant runs — no per-recipe if/else in the main
screen code.

## Constraints & Gotchas

- **`file://` CORS** — no `fetch()`, no `getImageData` on external images.
  All art is inline SVG or CSS gradients.
- **`touch-action: none`** — required on draggable items and the mix area.
  Global `html,body` rule already covers this app-wide.
- **GSAP load order** — `gsap.min.js` must be before `recipes.js` in
  `index.html`. Both are already in the correct position.
- **`setPointerCapture` in try/catch** — pointer IDs can be invalid during
  cancel events; matches pattern used in `tracer.js`.
- **`G.killTweensOf('*')` on step change** — prevents orphaned tweens from a
  previous step interfering with the new one. Called at the top of `setStep()`.
- **Pancake browning uses `setInterval`** — GSAP `onUpdate` for a
  dummy object runs separately; `clearInterval` on `showFlip`. No cleanup issue
  because `G.killTweensOf('*')` in `setStep` kills the dummy tween, and
  `clearInterval` is called before adding the Flip button.

## Session End — 2026-06-01
Git status: clean — all changes committed and merged to main.

## Session Summary — 2026-05-30 (session 1 — interrupted)
Work completed in this session:
1. Initial recipes screen committed to `feature/recipes` as
   `e14d251 feat(recipes): add Recipes play mode with per-food cooking`.
2. Full GSAP animation upgrade applied (uncommitted):
   - GSAP vendored to `js/vendor/gsap.min.js`
   - `recipes.js` rewritten with GSAP quickTo, timelines, spring eases
   - Bowl filling, spoon animation, oven pour+bake, pancake flip, fry bubbles
   - All CSS for new elements added to `styles.css`
   - i18n keys confirmed in `data/i18n.js`
   - Script tags added to `index.html`
3. Dev docs were NOT created before session ended.

NEXT STEP: Commit the uncommitted GSAP changes, then work through Phase 2
animation quality polish — starting with the pancake flip pan tilt.

Blockers: none  
Half-finished: uncommitted GSAP upgrade (4 modified files)  
Security flags: none

## Session Summary — 2026-06-01 (session 2 — feature complete)
Completed:
- Phase 2 animation polish (Sections 4 & 5) all committed on feature/recipes
- Merged feature/recipes into main (local merge commit b8f374e, PR #8 eda6f24 on origin)
- Feature branch deleted locally and from origin

NEXT STEP: Phase 3 (more recipes) is future/optional — start with Muffin recipe in data/recipes.js and add `cookType: 'oven'` variant to handle muffin tray.
Blockers: none
Half-finished: none — fry oil shimmer deferred by design (marked with [ ] in tasks.md)
Security flags added: none

## Session Summary — 2026-06-01 (session 3 — visual quality exploration)

Explored upgrading visual quality using paths extracted from two Lottie-exported animated SVGs
(provided by user, located in Downloads). Decided on this approach over AI-generated WebP images
because the SVG paths animate with GSAP identically to existing art — no new pipeline needed.

**Lottie file analysis:**

File 1 (`82d7185c-1153-11ee-b7f1-1bc16f35848b.svg`) — cooking ingredient animation:
- **Measuring jug** (Shape Layer 8): body `M92,-178L-82.5,-178...`, left spout triangle, right handle arc, yellow fill `#ffbb54`/`#f9a72c`, teal stroke `#00b494`, measurement lines + thermometer window. viewBox approach: `-130 -185 275 220` at 100×80px.
- **Bowl** (Shape Layer 5, 4 paths): white outer body with `#00b494` teal stroke-5, cream interior `#fff8f0`/`#f0e6d8`, right shadow `#e0e0e0`, rim face path (white U-shape with `#424242` outline). Transform group: `translate(120,4) scale(0.8,0.9)` maps Lottie coords → `0 0 240 180` viewBox.
- **Egg top half** (Shape Layer 14): `M-19,-73.5C-102.198,-71.742,...L-84,43.5L-33,10.5L-9.5,32.5L24,4L62.5,21...Z` — organic oval with real jagged crack line at bottom. Fill `#ffd085`, stroke `#8c8c8c` stroke-8. viewBox: `-108 -78 176 130` at 50×37px.
- **Egg bottom half** (Shape Layer 16): `M22,-4L-7.25,21...L-93,28.25...Z` — matching jagged top edge, fill `#ffd085`. viewBox: `-97 -8 162 134` at 50×42px.
- **Gold star burst** (Shape Layers 22–31): shared path `M65,-55C65,-55,63.5,14,-1.5,14...Z`. Colors `#ffc664`/`#ffd964`/`#ffc000`. Usable for celebration effects.
- **Pancake stack** (Layers 18–21): ellipses `ry=27.5 rx=49`, cream `#eddec0`/`#e2e0dd`, white stroke-13.

File 2 (`a6309fa0-1151-11ee-b271-bb42fb1b548d.svg`) — 554 paths, different palette (purples, pinks, greens). Named layers: `bowlrose/kitchencooking`, `container02/kitchen1`, `star/kitchencooking`. Colors: `#863576`, `#f06363`, `#ffd687`, `#6abc45`. Lower priority — likely a dessert scene rather than baking ingredients.

**Bugs found this session:**
- `setStep()` calls `stage.innerHTML = ''` which wipes the kitchen-bg on every step change. Fix: re-append `kitchenBg` after clearing — `stage.appendChild(kitchenBg)` inside `setStep()`. Code change was reverted with rest of session work; needs re-applying.

**Code changes attempted but reverted this session:**
- `bowlSvg()` rewritten with Lottie paths in transform group
- `animPour` jug replaced with Lottie measuring jug SVG (jugW=100, jugH=78, transformOrigin `50% 97%`)
- `animCrack` egg-top/egg-bot replaced with inline SVG using Lottie crack paths
- CSS `.egg-top`/`.egg-bot` updated to SVG containers (no border-radius)

NEXT STEP (visual quality): Re-apply the Lottie path extractions above — start with jug (highest impact), then bowl, then egg crack paths. Fix `setStep` kitchen-bg bug simultaneously.
Blockers: none
Half-finished: none committed
Security flags: none

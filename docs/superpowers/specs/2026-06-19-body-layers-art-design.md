# Body Layers — Richer Per-Layer Art (design)

**Date:** 2026-06-19
**Branch:** `feature/body-layers-art`
**Scope:** Visual upgrade to the existing **Body Layers** game
(`js/screens/bodylayers.js`) only. No new game, no data changes, no i18n
changes, no map/locations changes.

> Note: the user delegated the art-direction decision ("go with your best
> judgement … document some of the alternatives for me to review at a later
> stage"). This doc records the chosen approach **and** the alternatives so the
> direction can be revisited or edited later without re-deriving the context.

## Problem

In `bodylayers.js` today, `bodyGroup(color)` draws the **same silhouette for
every layer** — a circle head plus five rounded rectangles (torso, two arms,
two legs) — and only the fill `color` changes between skin, muscles, nerves,
organs and bones. The peel mechanic fades the outer group's opacity to 0 to
reveal the identical shape underneath in a different colour. Result: the five
"layers" are visually indistinguishable; peeling reads as a colour swap, not as
seeing *inside* a body. The educational point (each layer looks and does
something different) is lost.

## Goal

Give each layer its own **recognisable drawing** inside the same body envelope,
so peeling skin → muscles → nerves → organs → bones genuinely looks like going
deeper into the body, while keeping the existing peel/cross-fade mechanic,
data, facts, dots, win flow and mobile-clipping layout untouched.

## Chosen approach — B: distinct anatomical art, shared body envelope

Replace `bodyGroup(color)` with a `buildLayer(id, color)` dispatcher. Every
layer still **fills the same body silhouette** (so the cross-fade always shows a
body shape and the footprint lines up during peel), but overlays
layer-specific, child-friendly detail:

| Layer   | Silhouette fill        | Distinctive detail drawn on top |
|---------|------------------------|----------------------------------|
| skin    | skin tone (`l.color`)  | friendly face — eyes, smile, rosy cheeks, simple hair |
| muscles | muscle red (`l.color`) | curved muscle-fibre striations on torso, arms, legs |
| nerves  | pale cream             | brain blob + spine + branching nerve lines with end-dots (gold) |
| organs  | soft flesh             | heart, two lungs, stomach, coiled intestine, brain hint |
| bones   | dark slate (x-ray bg)  | skeleton — skull with eye sockets, ribcage, spine, limb bones, pelvis |

Implementation notes:
- Small SVG helpers (`mk`, `addCirc`, `addRect`, `addPath`, `addEll`,
  `silhouette`) keep each layer builder short and readable.
- `viewBox` stays `0 0 120 210`; the envelope coordinates are unchanged so the
  layers register exactly on top of each other.
- The data `color` is still honoured as the dominant fill for skin/muscles; for
  nerves/organs/bones the silhouette uses a layer-appropriate base so the
  overlaid anatomy reads clearly (data `color` kept as an accent). No change to
  `data/body.js`.
- Small peel polish: the peeling layer lifts slightly (`scale`/`translateY`) as
  it fades, so it feels like a layer being lifted off rather than a flat
  dissolve. Pure CSS, additive to the existing `.45s` opacity transition.

**Why this one:** best ratio of educational payoff to effort and risk. It reuses
the entire existing mechanic (only the per-layer drawing changes), stays inside
one file, needs no new assets, and works on `file://` (all inline SVG — no
images, so no CORS issue). It directly fixes the "all layers look the same"
problem.

## Alternatives considered (for later review / possible edits)

- **A — minimal icon swap.** Just enlarge the existing emoji badge (🧑 💪 ⚡ ❤️
  🦴) over the plain silhouette. Cheapest, but barely improves the figure and
  still doesn't show anatomy *within the body*. Rejected: too little payoff.
- **C — full illustrated images per layer** (WebP per layer, like the story
  illustration pipeline). Highest visual fidelity, but: needs an asset pipeline,
  breaks the lightweight inline-SVG approach, and `getImageData`/CORS issues on
  `file://` (the project runs by opening `index.html` directly). Heavyweight for
  a single mini-game. **Documented as the future high-fidelity option** if Body
  Layers becomes a "promising area" worth investing art in.
- **Peel-animation variants** (independent of art choice): a vertical wipe/reveal
  instead of a cross-fade, or a torn-paper edge. Deferred — the subtle lift
  chosen above is enough; revisit if we want more drama.

## Out of scope (explicitly)

- No new game (label-the-part / senses / organ-function matching were the other
  "deepen Human Body" directions — see
  `dev/active/explore-expansion-followups/`).
- No changes to the Digestion game, data, i18n, stickers, map or locations.
- No fact-text translation (still English-only by the project's deliberate i18n
  scope choice).

## Verification plan

- `npm test` stays green (322 tests; body.test.js asserts data/wiring/i18n only,
  none of which change).
- In-browser (`py -m http.server 3456` + Claude Preview): each peel shows a
  visibly different figure; dots/name/fact/win flow unchanged; layout intact.
- Mobile-clipping rule preserved: `.bl-screen` keeps `flex:1;min-height:0` and
  the landscape `@media (max-height:520px)` compaction; verify the figure +
  peel button sit within `innerHeight` at 375×812 and 812×375.

# Explore-Expansion Follow-ups — Plan

## Status
**No implementation in flight.** The 7-stage explore-expansion feature is
COMPLETE, merged to `main` (`c3d9823`), pushed, and its docs archived to
`dev/done/explore-expansion/`. This folder is a **backlog + handoff** for the
next session: deferred items from that feature, plus candidate directions for
deepening the new areas. Pick a direction with the user before building.

## What just shipped (2026-06-18)
Library +20 stories (now 48); reader text-size gear; +3 recipes; Memory 2-player;
and 3 NEW map buildings — **Clock** (Read-the-Clock, Set-the-Hands), **Human
Body** (Body Layers, Digestion), **Space** (Solar System, Order-the-Planets,
Stars). Map is now 12 buildings + Sticker Book. 322 tests pass.

## Candidate next directions (await user steer)
The user's framing: *"build up different areas to explore, then focus in on the
ones that show promise."* So the natural next step is to **deepen whichever new
area lands well** with their daughter. Options, roughly independent:

- **Clock** — add "quarter to" phrasing, a digital→analog variant, or a
  word-clock ("half past three") reading mode.
- **Human Body** — a third game (label-the-body-part drag, or the senses);
  richer per-layer art; "what does this organ do?" matching.
- **Space** — more constellations; planet facts quiz; day/night or moon-phases;
  rocket-launch counting tie-in with Numbers.
- **Library** — real illustrations for the new stories (pipeline exists), or
  more stories; "read to me" auto-advance.
- **Cross-cutting** — clear the two deferred items below.

## Deferred from explore-expansion (small, well-scoped)
1. **Per-game stickers** for the 5 new games (clock/body/space). Add entries to
   `data/stickers.js` (+ i18n `sticker.*` ×6); mind that `stickers.test.js` may
   need the new ids. Suggested: `clock-master`, `body-explorer`, `star-gazer`.
2. **Fact-text translation** — educational facts (`data/body.js`,
   `data/space.js`) and story prose are English-only by design; translate if a
   non-EN locale becomes a priority.

## Constraints
Same as always: vanilla JS / `window.APP` IIFE / strict index.html load order;
work inline (no parallel subagents); per-stage commit→test→verify; merge/push
needs explicit approval.

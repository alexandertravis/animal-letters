# map-polish — Plan

## Goal & Motivation

Raise the map hub toward library/storyreader visual quality. Phase 4 of the master plan
(`~/.claude/plans/review-the-entire-project-hidden-plum.md`). The map is the screen every
child sees most; today its buildings are flat SVGs with emoji pasted on top and the scene
is static.

## Scope (adjusted from master plan)

1. **Building art**: replace the emoji `<text>` overlay in each of the 7 BUILDINGS SVGs
   (js/screens/map.js:3-11) with drawn SVG details (doors, windows, dice face, music
   notes, paw print…). The sticker-album card is already pure SVG.
2. **Scene life**: drifting clouds (2 groups, slow CSS keyframe drift), soft sun glow.
   Hills already layered — keep.
3. **Touch targets**: `.map-building` padding 8px → `10px 8px` + `min-height:96px`.
4. **Badge pop-in**: when a building's ★ is NEW since the last map visit, play a pop
   animation. Snapshot under `al.progress.lastSeenStars` ({locId: bool}) via APP.store.
5. **DROPPED from master plan**: "extract shared confetti" — `APP.launchConfetti` already
   exists and is shared; per-screen code is call sites, not copies. No work needed.

## Constraints

- All changes confined to js/screens/map.js (injected map-css) — no styles.css edits.
- Continuous cloud animation means map screenshots may time out — verify via
  preview_eval computed styles/DOM (established pattern).
- No new i18n strings, no new tests expected (UI-only screen; screens have no test
  coverage by project convention).
- Keep short-landscape breakpoint behaviour (4-col grid) intact.

## Checkpoints
1. Building art + scene + touch targets + badge pop — single commit (one file)
2. Review + verify

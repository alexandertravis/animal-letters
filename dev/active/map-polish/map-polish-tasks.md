# map-polish — Tasks

## Section 1 — Art + scene + interactions (checkpoint 1)
- [x] All 7 BUILDINGS emoji overlays replaced with drawn SVG (clock/doors, book spines,
      steaming pot, palette+brush, dice, beamed notes, paw print); sticker card's
      vestigial <text> removed — 0 <text> nodes in building SVGs (live-verified)
- [x] 2 drifting clouds (75s/105s CSS drift, outer-g positioning so CSS transform
      doesn't clobber placement) + sun glow halo
- [x] Touch target: padding 10px 8px + min-height 96px (measured 119px live)
- [x] Badge pop-in: is-new class on first visit after a star, absent on second visit;
      al.progress.lastSeenStars snapshot persisted (live-verified both states)
- [x] vitest 227/227; screenshot captured (map renders correctly); no console errors → commit

## Section 2 — Review + verify (checkpoint 2)
- [x] preview_eval verified: 0 emoji <text> nodes, 2 clouds with mapCloudDrift running,
      is-new on first visit / absent on second, building height 119px, screenshot OK,
      no console errors
- [x] Review done INLINE (single-file ~70-line logic diff, token-conscious decision):
      snapshot ordering correct, store-missing degrades safely, static SVG only — GREEN
- [x] Docs + memory updated — PHASE 4 COMPLETE (commit 7604eba, not merged)

## Branch
feature/map-polish (off main fcd391c). Resume: all work in js/screens/map.js only.

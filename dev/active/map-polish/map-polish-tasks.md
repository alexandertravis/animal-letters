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
- [ ] preview_eval: no emoji <text> in building SVGs, clouds animating, badge pop class
      applied on first visit after new star, touch target ≥96px, short-landscape intact
- [ ] /review-section
- [ ] Update docs + memory

## Branch
feature/map-polish (off main fcd391c). Resume: all work in js/screens/map.js only.

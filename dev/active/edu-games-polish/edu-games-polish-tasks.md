# Educational Games Polish — Tasks

## Section A — Phone-layout bugs: First Letter + Word Match ✅
- [x] `firstletter.js` — `.fl-screen` min-height:100vh → flex:1;min-height:0
- [x] `firstletter.js` — ensure 4 letter targets visible (portrait); landscape compaction media query
- [x] `wordmatch.js` — `.wm-screen` min-height:100vh → flex:1;min-height:0
- [x] `wordmatch.js` — pics + word-card rows both fit (portrait + landscape)
- [x] Verify both on phone portrait (375×812) and short landscape (812×375) — drag targets within viewport
      - firstletter: 4 letters within viewport both orientations (pic/letters compact in landscape)
      - wordmatch @ 5 pairs: all cards within viewport both orientations; no console errors
- [x] Run full test suite — 266 passing

## Section B — Greenhouse size-awareness (4 screens) ✅
- [x] `plantgrow.js` — height fix + SVG cap (48vh) for landscape; ctrls visible. Landscape: svg 180 ≤ scene 216.
- [x] `plantneeds.js` — height fix + SVG cap (42vh) + tray compaction. Landscape: svg 158 ≤ scene 220.
- [x] `pollinate.js` — height fix + flower/bee compaction. Landscape: bee bottom 371 ≤ 375.
- [x] `seasons.js` — height fix + `min-height:0` on content (scroll) + stage 120px/quiz compaction. Landscape quiz: all 4 options visible, no scroll.
- [x] Verify all 4 on phone portrait (375×812) + landscape (812×375) — controls within viewport, SVGs fit scenes
- [x] Run full test suite — 266 passing

## Section C — Adding Up numerals (#1) ✅
- [x] `addition.js` — `.ad-group` now a column: `.ad-group-num` numeral above `.ad-objs`
- [x] Verify renders; numerals match group sizes (2→"2", 4→"4"); numeral above objects
- [x] Run full test suite — 266 passing

## Section D — Count & Match Mexican wave (#3) ✅
- [x] `countmatch.js` — `@keyframes cm-wave` + `mexicanWave()`: staggered bounce across `.cm-item` (crest spans fixed 0.34s)
- [x] Advance delays bumped (800→950 / 850→1000) so the ~0.79s wave completes before the round changes
- [x] Verify: count=10 → delays sweep 0→0.34s monotonically, all items waved; no console errors
- [x] Run full test suite — 266 passing

## Section E — Number Bonds redesign (#2)
- [ ] `numberbonds.js` — target-equation round model (keep `APP.numberBonds`)
- [ ] Random initial split that is NOT the target (pure helper, unit-testable)
- [ ] Big per-box counts + total, live
- [ ] Solve detection (left==a, right==b) → commutative twin reveal (a+b / b+a)
- [ ] Round progression through each bond → win
- [ ] `data/i18n.js` — new strings ×6 locales
- [ ] `tests/number-games.test.js` — tests for new NB logic + i18n keys
- [ ] Verify in browser; run full test suite

## Wrap-up
- [ ] Update dev docs; archive to dev/done/ when complete
- [ ] Final merge to main + push (on user approval)

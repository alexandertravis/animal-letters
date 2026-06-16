# Greenhouse — Tasks

## Section 1 — Building + hub wiring  ✅ COMPLETE
- [x] Add `greenhouse` building SVG to `BUILDINGS` in `js/screens/map.js`
- [x] Add greenhouse hub entry to `APP.LOCATIONS` in `data/locations.js` (`id:'greenhouse'`, `direct:null`, `bgTrack:'map'`, `games:[plantgrow, plantneeds, pollinate, seasons]`)
- [x] Create stub `js/screens/plantgrow.js`, `plantneeds.js`, `pollinate.js`, `seasons.js` (render topbar + placeholder so hub links resolve)
- [x] Create `data/greenhouse.js` (initial data scaffold)
- [x] Add script tags to `index.html` (data before locations; screens before main.js)
- [x] Add i18n keys: `loc.greenhouse`, 4 `game.*.title`, 4 `intro.*` — all 6 locales
- [x] Verify: map shows Greenhouse → opens hub → 4 buttons → each stub renders + back works, no console errors

## Section 2 — Life-cycle journey (`plantgrow`)  ✅ COMPLETE
- [x] 8-stage flow driven by `APP.GREENHOUSE.stages` (seed→needs→roots→stem→photo→flower→bee→fruit)
- [x] Persistent inline-SVG plant built up part-by-part (CSS-only animation; no GSAP cleanup needed)
- [x] Three interaction types: drag-chip-to-target, tap-collect (needs panel), tap-continue
- [x] Narration via `APP.audio.speak` per stage; sfx + star burst on each step
- [x] Win → confetti + `recordWin('plantgrow',{stars:3})` + Play again; navigation-safe timers (isConnected guard)
- [x] i18n: 17 `plantgrow.*` keys across all 6 locales
- [x] Verified full playthrough via preview_eval: all parts reveal, win records 0→3 stars, map ★ appears, no console errors

## Section 3 — What Plants Need (`plantneeds`)  ✅ COMPLETE
- [x] Drag 4 real needs (water/sun/air/soil) vs 3 random distractors onto the plant
- [x] Needs fill a panel + perk leaves one by one; 4th need blooms flower
- [x] Distractors shake + sfx.wrong + spoken "a plant does not need that"; spoken fact per need
- [x] Win → confetti + recordWin('plantneeds',{stars:3}) + Play again
- [x] data/greenhouse.js needs+distractors; 11 i18n keys × 6 locales
- [x] Verified via preview_eval: distractor rejected, 4 needs → bloom, 0→3 stars, no console errors

## Section 4 — Pollination & Fruiting (`pollinate`)  ✅ COMPLETE
- [x] Row of 4 flowers; drag the bee (stays-home clone) onto each
- [x] Pollinated flower sparkles then morphs to fruit; spoken fact on first pollination
- [x] All pollinated → win + confetti + recordWin('pollinate',{stars:3}) + Play again
- [x] Flower→fruit data inline in screen; 3 i18n keys × 6 locales
- [x] Verified via preview_eval: bee pollinates all 4, flowers become fruit, 0→3 stars, no console errors

## Section 5 — Vegetable Patch & Seasons (`seasons`)  ✅ COMPLETE
- [x] Four season tabs (sky tint + crop emoji + seasonal creature + spoken fact) + Quiz tab
- [x] recordPlay('seasons') on entry; explore teaches seasons + which insects appear
- [x] "Which season is this?" quiz: 4 rounds, star bursts, win → recordWin('seasons',{stars:3})
- [x] data/greenhouse.js seasons; 11 i18n keys × 6 locales
- [x] Verified via preview_eval: tab switch, quiz playthrough 0→3 stars, no console errors

## Section 6 — Polish & tests
- [ ] Progress/stickers wiring, navigation-safety audit, unit tests for `data/greenhouse.js` helpers, i18n backfill

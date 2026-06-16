# Number Games — Tasks

## Section 1 — Numbers building + hub wiring  ✅ COMPLETE
- [x] Add `counting` building SVG (number blocks 1-2-3) to `BUILDINGS` in `js/screens/map.js`
- [x] Add `counting` hub location to `data/locations.js` (label `loc.numbers`, `bgTrack:'school'`, games: write/count/add/bonds/times)
- [x] Remove `numbers` game from the School location (digit tracing moved to Numbers building)
- [x] Create stub `js/screens/countmatch.js`, `addition.js`, `numberbonds.js`, `times.js`
- [x] i18n: 4 `game.*.title` + `counting.write` + 4 `intro.*` — all 6 locales (building reuses `loc.numbers`)
- [x] index.html: 4 new screen script tags before main.js
- [x] Verified via preview_eval: Numbers building on map, hub shows 5 games, all render, no console errors

## Section 2 — Count & Match (`countmatch`)  ✅ COMPLETE
- [x] N identical emoji + number line 1..range; tap the matching numeral
- [x] Correct → pop + star + speak the number; wrong → shake (no advance)
- [x] 5 rounds → win + confetti + recordWin('countmatch',{stars:3}); difficulty `range` 5/10/20
- [x] 3 i18n keys × 6 locales
- [x] Verified via preview_eval: wrong tap shakes, 5 rounds → win 0→3 stars, no console errors

## Section 3 — Addition (`addition`)  ✅ COMPLETE
- [x] Problem shown as objects + numerals (a 🍎 + b 🍎 = ?); 4 answer choices (near-neighbour distractors)
- [x] Correct → reveal answer + pop + star + speak; wrong → shake (no advance)
- [x] 5 rounds → win + confetti + recordWin('addition',{stars:3}); difficulty `maxSum` 5/10/20
- [x] 2 i18n keys × 6 locales
- [x] Verified via preview_eval: wrong tap shakes, 5 rounds → win 0→3 stars, no console errors

## Section 4 — Number Bonds (`numberbonds`)
- [ ] N items, two boxes, drag to split; track which splits found; difficulty total; win when all found

## Section 5 — Times Tables (`times`)
- [ ] visual arrays → numerals; pick product; difficulty tables; win

## Section 6 — Polish & tests
- [ ] Unit tests for pure helpers (bond enumeration, problem generation); i18n completeness; suite green

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

## Section 4 — Number Bonds (`numberbonds`)  ✅ COMPLETE
- [x] N dots in two boxes; drag dots between boxes; live `l + r = N` equation
- [x] Bond tracker chips light as each distinct unordered bond is shown (0+N pre-found silently)
- [x] `APP.numberBonds(n)` pure helper exposed (for unit tests); difficulty `total` 5/10
- [x] All bonds found → win + confetti + recordWin('numberbonds',{stars:3})
- [x] 3 i18n keys × 6 locales (prompt uses {n})
- [x] Verified via preview_eval: helper correct, drag discovers bonds, all-found → win 0→3 stars, no console errors

## Section 5 — Times Tables (`times`)  ✅ COMPLETE
- [x] Multiplication as groups of items (array for products ≤30) + numerals; 4 answer choices
- [x] Difficulty `tables`: easy(×2,5,10)/mid(×2–5)/hard(×2–12); speak product; wrong-tap shake
- [x] 5 rounds → win + confetti + recordWin('times',{stars:3}); 2 i18n keys × 6 locales
- [x] Verified via preview_eval: array for small products, numerals for large, win 0→3 stars, no console errors

## Section 6 — Polish & tests  ✅ COMPLETE
- [x] tests/number-games.test.js: APP.numberBonds correctness, counting-hub wiring (5 games, school slimmed, locationOf), i18n completeness across 6 locales
- [x] Navigation safety: timer screens guard with `wrap.isConnected`; back clears timers
- [x] Full suite green: 248 passed (was 237; +11)
- [x] Map ★ verified for the Numbers building after wins

## Feature complete
Numbers building + 5 activities (Write Numbers + countmatch, addition, numberbonds, times). 248 tests pass.

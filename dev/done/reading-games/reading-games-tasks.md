# Reading Games — Tasks

## Section 1 — Wiring  ✅ COMPLETE
- [x] Add `wordmatch` + `firstletter` to the `school` location games in `data/locations.js`
- [x] Create stub `js/screens/wordmatch.js`, `js/screens/firstletter.js`
- [x] i18n: `game.wordmatch.title`, `game.firstletter.title`, `intro.wordmatch`, `intro.firstletter` — all 6 locales
- [x] index.html: 2 screen script tags before main.js
- [x] Verified via preview_eval: School hub shows 4 games incl. 2 new stubs, both render, no console errors

## Section 2 — Word–Picture Match (`wordmatch`)  ✅ COMPLETE
- [x] N animal pictures (cartoon SVGs) + shuffled word cards; drag word → matching picture
- [x] Tap/pickup speaks the word; correct → lock + label + star; wrong → sfx.wrong; img onerror → first-letter fallback
- [x] All matched → win + confetti + recordWin('wordmatch',{stars:3}); difficulty `pairs` 3/4/5
- [x] 2 i18n keys × 6 locales
- [x] Verified via preview_eval: wrong drop rejected, all matched → win 0→3 stars, no console errors

## Section 3 — Starting Letter (`firstletter`)  ✅ COMPLETE
- [x] Round-based: animal picture (tap/pickup speaks name) + 4 letter targets (correct + 3 distractors)
- [x] Drag picture to its starting letter; correct → star + speak letter; wrong → shake; 5 rounds → win
- [x] win + confetti + recordWin('firstletter',{stars:3}); 2 i18n keys × 6 locales
- [x] Verified via preview_eval: wrong drop shakes, 5 rounds → win 0→3 stars, no console errors

## Section 4 — Polish & tests  ✅ COMPLETE
- [x] tests/reading-games.test.js: School wiring (4 games, locationOf) + i18n completeness across 6 locales
- [x] Fixed Phase-2 number-games test (School-list assertion → robust `not.toContain('numbers')`)
- [x] Full suite green: 256 passed (was 248; +8)

## Feature complete
School now hosts Trace, Find, Word Match, First Letter. 256 tests pass.

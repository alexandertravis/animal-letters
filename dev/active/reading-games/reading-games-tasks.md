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

## Section 3 — Starting Letter (`firstletter`)
- [ ] Animal picture (tap = speak name) + 4 letter targets; drag picture to its starting letter; 5 rounds → win

## Section 4 — Polish & tests
- [ ] Unit tests: i18n completeness + School wiring; suite green

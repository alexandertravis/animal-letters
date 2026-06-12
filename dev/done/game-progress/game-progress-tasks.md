# game-progress — Tasks

## Section 1 — Core module + tests
- [x] Create `js/progress.js` (recordWin/recordPlay/get/all, key `al.progress.games`, settings.js style)
- [x] Add script tag to index.html (after js/store.js, before js/state.js)
- [x] Write `tests/progress.test.js` (11 tests: round-trip, bestStars monotonic, clamping, stars:0, recordPlay, unknown id → zeros, corrupt JSON fallback)
- [x] `npx vitest run` green (204/204; includes fixing pre-existing stale depiction assertion in tests/state.test.js)

## Section 2 — Wire win moments
- [x] letters + findletter — single hook in js/state.js `advanceLetter` (gameMode 'trace'→letters, 'find'→findletter; both modes funnel through it), stars 3
- [x] memory — gameOver site (memory.js:281), stars from starsForMoves
- [x] tictactoe — `gameOver && !recorded` funnel (tictactoe.js:143); human win (P, or R in friend mode) = win stars 3, robot win/draw = recordPlay
- [x] maze — both win sites, stars by size (6→1, 8/10→2, 12/14→3)
- [x] shapes — showWin, stars 3
- [x] colours — showWin, stars 3
- [x] washing — showWin, stars 3
- [x] music — song complete, stars 3
- [x] puzzles — showDone, stars by totalPieces (4→1, 9→2, 16/25→3)
- [x] dots — onComplete, stars 3 (matches the ⭐⭐⭐ its own overlay shows)
- [x] recipes — done step render, stars 3
- [x] painting — paint-by-numbers allDone, stars 3 (NO save-to-gallery feature exists — plan over-assumed; free-draw has no end state, records nothing)

## Section 3 — Progress screen Games section
- [x] "Games" section under letter grid (13 tiles: art emoji, i18n name, APP.starsHtml stars, plays badge; unplayed = dimmed .is-unplayed)
- [x] Single scroll container `.progress-body` wraps both sections (scroll moved off .progress-grid)

## Section 4 — Map star badges
- [x] Gold ★ chip (.map-building-star) on buildings with any bestStars > 0; screen→gameId map ('game'→'letters', else screen name)
- [x] Short-landscape breakpoint checked at 844×390: 4-col grid, ★ chip inside card, no label overlap

## Section 5 — i18n + verification
- [x] `screens.progress.games` added to all 6 locales (all other game-name keys already existed)
- [x] `npx vitest run` — 204/204 green
- [x] Preview verification: recordWin/recordPlay round-trip live; survives full page reload; progress screen renders 13 tiles with correct stars/badges/dimming; map shows ★ on Kitchen + Games Room only (a11y snapshot); zero console errors. Seeded test data cleaned up.
- [x] /review-section: bug review 0 critical / 1 major / 3 minor — all 4 fixed
      (puzzles `S.doneShown` guard against double showDone→double recordWin; `!= null`
      convention in progress.js; bestStars-not-overwritten-by-0 test added; starsHtml
      null-guard). Security triage GREEN. 205/205 tests.
- [ ] Commit (awaiting user approval of commit message)

# game-progress — Context

## Key Files

| File | Role |
|---|---|
| `js/progress.js` | NEW — APP.progress module (recordWin/get/all), key `al.progress.games` |
| `js/store.js` | Existing localStorage wrapper — APP.store.get/set, reuse as-is |
| `js/settings.js` | Style reference for a thin store-backed module |
| `index.html` | Script tag for progress.js goes after js/store.js, before js/state.js |
| `js/state.js` | `APP.advanceLetter` (~line 218 increments animalCompletionCounts) — add `recordWin('letters', …)` alongside on full word completion |
| `js/screens/{memory,tictactoe,maze,shapes,colours,washing,music,puzzles,dots,recipes,painting,findletter}.js` | One recordWin call at each existing win/celebration moment |
| `js/screens/progress.js` | Screen — add "Games" section under animal stars |
| `js/screens/map.js` | Star chip per building; games→building via APP.LOCATIONS[].games |
| `data/locations.js` | `APP.LOCATIONS` registry (id, games[]) |
| `js/utils.js` | `APP.starsHtml(filled, total)` — REUSE, do not reimplement |
| `data/i18n.js` | All 6 locales — new keys identical across blocks |
| `tests/progress.test.js` | NEW — follow tests/store.test.js + tests/setup.js mock patterns |

## Branch
feature/game-progress (off main — no develop branch in this repo)

## Decisions Log
2026-06-12 - Decision: single localStorage key `al.progress.games` (not per-game keys)
because sticker checks and the progress screen read all games at once.
2026-06-12 - Decision: tictactoe draw = play only, not a win.
2026-06-12 - Decision: bestStars monotonic (never decreases) — children must not see
stars disappear.
2026-06-12 - Decision: map badge = single gold ★ chip (presence, not count) — Phase 4
adds the pop-in animation, not this branch.
2026-06-12 - Decision: uncommitted local `.gitignore` change (.vercel/.env*) predates
this branch — leave it out of feature commits.
2026-06-12 - Decision: added `APP.progress.recordPlay(gameId)` (play without win) so
tictactoe draws can be recorded — recordWin alone couldn't express it.
2026-06-12 - Found pre-existing red test on main: tests/state.test.js asserted
`depiction` restored by resetSettings, but the depiction feature was deliberately
removed from state.js DEFAULT_SETTINGS. Removed the stale assertion in this branch
(2-line test fix). Remaining stale depiction refs (CLAUDE.md:104,130, tests/setup.js:52,
settings.test.js inline copy) deferred to Phase 5 cleanup — they don't fail.
2026-06-12 - Gotcha confirmed: vitest jsdom env exposes no working bare `localStorage`
global — storage tests must create a JSDOM and assign global.localStorage (see
store.test.js / progress.test.js).
2026-06-12 - Decision: star scheme — difficulty-graded where the game has a knob
(memory: starsForMoves; maze: size 6→1★ 8/10→2★ 12/14→3★; puzzles: pieces 4→1★ 9→2★
16/25→3★); flat 3★ for completion-only games (shapes, colours, washing, music, dots,
recipes, painting, letters, findletter) — a permanent 1/3 display reads as failure to a
child (mini-wins principle).
2026-06-12 - Decision: painting records the paint-by-numbers completion; there is NO
save-to-gallery feature (plan over-assumed). Free-draw records nothing.
2026-06-12 - Decision: letters + findletter both recorded from the single
`advanceLetter` hook in state.js, branched on `settings.gameMode`.
2026-06-12 - Found: shared `APP.launchConfetti` already exists (utils?) — Phase 4's
"extract shared confetti" item is already done upstream; per-screen code is call sites,
not copies. Soften that item when Phase 4 starts.

## Constraints & Gotchas
- New JS files need a `<script>` tag in index.html in the correct load slot —
  "Unknown screen: X" / undefined APP.x is the symptom.
- Every setTimeout/GSAP tween/ResizeObserver must be cancelled before `ctx.go()`.
- Use `!= null ? x : default`, never `|| default`, where 0 is valid (counts, stars).
- Star glyph: `★` U+2605 for full AND empty, colour via CSS (.star-full/.star-empty).
- All user-visible strings into ALL 6 locales in data/i18n.js, keys identical to `en`.
- Verify over HTTP: `py -m http.server 3456` (npx serve hangs). Screenshots time out on
  screens with continuous SVG animation — use preview_eval DOM/computed-style checks.
- Tests: `npx vitest run` — 193 currently green; keep them green.
- Old localStorage persists across sessions — when manually testing, a stale
  `al.progress.games` may already exist; `localStorage.removeItem('al.progress.games')`
  to reset.

## Open Questions
(none — plan approved 2026-06-12)

# game-progress — Plan

## Goal & Motivation

Make every game's win moment write a persistent record so play in any mode feeds visible,
cumulative progression. Today only the letter-tracing loop has a reward spine
(completions → stars → story unlocks); the 7 newer mini-games (tictactoe, memory, maze,
shapes, colours, washing, music) plus puzzles, dots, recipes and painting are
celebration-only dead ends — confetti fires once and the win evaporates.

This is Phase 1 of the 5-phase engagement plan
(`~/.claude/plans/review-the-entire-project-hidden-plum.md`). The sticker book
(Phase 3, user's priority) consumes the data this phase creates — nothing here is
speculative plumbing.

## Approach

1. **New module `js/progress.js`** — thin, store-backed, mirroring `js/settings.js` style:
   - `APP.progress.recordWin(gameId, { stars })` — increments plays/wins, keeps
     `bestStars` (never decreases), sets `lastPlayed` (ISO date)
   - `APP.progress.get(gameId)` → `{ plays, wins, bestStars, lastPlayed }` (zeros on miss)
   - `APP.progress.all()` → whole map
   - Single localStorage key `al.progress.games` via `APP.store.get/set`
   - Script tag in index.html after `js/store.js`, before `js/state.js`
2. **Wire each game's existing win moment** — one `recordWin` call at each game's
   existing completion point (where confetti/fanfare already fires). Game ids:
   `letters`, `findletter`, `memory`, `tictactoe`, `maze`, `shapes`, `colours`,
   `washing`, `music`, `puzzles`, `dots`, `recipes`, `painting`.
3. **Surface it:**
   - progress.js screen: "Games" section below the animal stars — per-game row with
     play count + best stars (reuse `APP.starsHtml` from js/utils.js)
   - map.js: small gold ★ chip on buildings whose games have `bestStars > 0`
     (map games → buildings via `APP.LOCATIONS[].games` in data/locations.js)
4. **Tests** — `tests/progress.test.js` following tests/store.test.js patterns.
5. **i18n** — all new strings in all 6 locales in data/i18n.js.

## Alternatives considered

- Per-game localStorage keys (`al.progress.<id>`) — rejected: one key is simpler to
  read for sticker checks and the progress screen.
- Recording inside `APP.settings` — rejected: settings is config, progress is data;
  separate module keeps responsibilities clean.

## Phases of work (sections in tasks file)

1. Core module + tests
2. Wire win moments (13 games)
3. Progress screen Games section
4. Map star badges
5. i18n + full verification

## Risks / Constraints

- Win-moment wiring touches 13 files — keep each edit to a single added call so review
  stays trivial; do not refactor surrounding celebration code in this branch.
- tictactoe draws: record as a play (not a win).
- `painting` "win" = save-to-gallery action; `recipes` "win" = reaching Done step.
- Do not touch the existing `animalCompletionCounts` / story-unlock logic in
  `APP.advanceLetter` — recordWin is added alongside, not integrated into it.

## Follow-up phases (separate branches, in order)

2. `feature/audio-guidance` — `APP.audio.speak` + per-screen spoken intros (6 locales)
3. `feature/sticker-book` — collectibles consuming this phase's data (USER PRIORITY)
4. `feature/map-polish` — SVG building art, scene depth, shared `APP.ui.confetti`
5. `feature/parent-gate-cleanup` — hold-to-enter Parent Corner gate, focus styles,
   dead-CSS + stale-doc cleanup

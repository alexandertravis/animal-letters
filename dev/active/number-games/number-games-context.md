# Number Games — Context

## Key files
| File | Role |
|---|---|
| `js/screens/map.js` | `BUILDINGS` SVG. Add `counting` building. |
| `data/locations.js` | Add `counting` hub; remove `numbers` from School. |
| `js/screens/numbers.js` | Existing digit-tracing screen (0–9). Moves into Numbers building (no code change; just relocated in locations). |
| `index.html` | Add 4 new screen scripts before `js/main.js`. |
| `data/i18n.js` | Add titles/intros + difficulty labels. `loc.numbers` already = "Numbers" in all 6 locales (reuse for building). |
| `js/screens/countmatch.js` etc. | NEW game screens. |

## Reuse references
- Topbar + settings gear with `segmented` schema: `js/ui.js` (see colours.js/memory.js/shapes.js usage).
- `APP.settings.game(id,defaults)` / `saveGame` / `updateGame`: `js/settings.js`.
- `APP.progress.recordWin(id,{stars})` / `recordPlay`: `js/progress.js`.
- `APP.launchConfetti`, `APP.audio.speak(text)`, `APP.audio.sfx.click/pop/wrong`.
- Clone-drag-into-target: colours.js / plantneeds.js. Tap-target: tictactoe/findletter style.
- Star burst: copy the local `burstStars` used in greenhouse screens.

## Decisions log
- (2026-06-16) Building id `counting` (screen id `numbers` is taken by digit tracing). Building label reuses `loc.numbers`.
- (2026-06-16) Digit-tracing `numbers` moved from School into the Numbers building for thematic grouping; School keeps trace + find.
- (2026-06-16) Each game has a `segmented` difficulty so it grows from early counting to times tables (roadmap decision).

## Difficulty keys (per game settings)
- countmatch: `range` ∈ 5/10/20
- addition: `maxSum` ∈ 5/10/20
- numberbonds: `total` ∈ 5/10
- times: `tables` ∈ 'easy'(×2,5,10)/'mid'(×2–5)/'hard'(×2–12)

## Open questions
- none

## Session log
- (2026-06-16) Phase 1 Greenhouse done + archived. Branch `feature/number-games` created off main (ae73647). Starting Section 1.
- (2026-06-16) All sections complete. Numbers building + 5 activities. Commits 70af1a3→39af5bd ff-merged to main + pushed (one transient DNS push failure mid-way, retried OK). `APP.numberBonds(n)` exposed for tests. 248 tests pass. Section 6 commit pending; then archive docs + delete branch.

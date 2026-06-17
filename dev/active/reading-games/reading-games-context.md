# Reading Games — Context

## Key files
| File | Role |
|---|---|
| `data/locations.js` | Add `wordmatch` + `firstletter` to the `school` location games. |
| `js/screens/wordmatch.js` / `firstletter.js` | NEW game screens. |
| `index.html` | 2 new screen scripts before `js/main.js`. |
| `data/i18n.js` | Titles, intros, win/prompt keys. |

## Reuse references
- `APP.animals.eligibleAll()` → locale-aware animal list; each `{name(UPPER), displayName, images:{cartoon}}` (`js/animals.js`).
- `APP.animals.pickRandom(maxLen, exclude)` for single-animal rounds.
- `APP.audio.speak(text, locale)`; `APP.audio.sfx.click/pop/wrong`.
- Topbar + settings: `APP.ui.topbar`. Progress: `APP.progress.recordWin`. Confetti: `APP.launchConfetti`.
- Clone-drag onto target + hit-test: see greenhouse `plantneeds.js` / `colours.js`.
- Animal cartoon images at `assets/images/cartoon/<id>.svg` (need HTTP).

## Decisions log
- (2026-06-16) Reading games live in the existing School building (no new building); School grows to trace/find/wordmatch/firstletter.
- (2026-06-16) `firstletter` is round-based drag-animal-to-letter, distinct from `findletter` (tap-letter-from-choices).

## Open questions
- none

## Session log
- (2026-06-16) Phase 2 done + archived. Branch `feature/reading-games` off main (dd39ed9). Starting Section 1.

# Calendar — Context

## Key files
| File | Role |
|---|---|
| `data/calendar.js` | NEW. `APP.CALENDAR.days[locale]` (7) + `.months[locale]` (12), Monday-first. |
| `data/locations.js` | Add `calendar` to the `school` games. |
| `js/screens/calendar.js` | NEW. Two tabs: Days order + Months quiz. |
| `index.html` | data/calendar.js before data/locations.js; screen before main.js. |
| `data/i18n.js` | UI strings only (names live in data/calendar.js). |

## Reuse references
- Tab pattern + makeStage: `js/screens/seasons.js`.
- Clone-drag onto slot/target: `wordmatch.js` / `plantneeds.js`.
- `APP.audio.speak(text, locale)`; `APP.audio.sfx.*`; `APP.progress.recordWin`; `APP.launchConfetti`.
- Current locale: `APP.state.settings.locale` (fallback 'en').

## Decisions log
- (2026-06-16) Localized day/month names in `data/calendar.js` per-locale arrays (avoids ~114 i18n keys); UI strings stay in i18n.js.
- (2026-06-16) Calendar lives in School. Week Monday-first across all six locales.
- (2026-06-16) Days = order-into-slots; Months = "what comes next" 4-choice quiz (12 too many to order).

## Open questions
- none

## Session log
- (2026-06-16) Phase 3 done + archived. Branch `feature/calendar` off main (ff936d3). Starting Section 1.
- (2026-06-16) All sections complete. Days-order + Months-quiz tabs. Commits 666ce7e→(this). Relaxed Phase-3 reading test to toContain. 266 tests pass. Section 2-3 commit pending; then archive + delete branch. ROADMAP COMPLETE.

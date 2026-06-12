# audio-guidance — Context

## Key Files
| File | Role |
|---|---|
| `js/audio.js` | `speakLetter` at ~line 463 (phonics gate, lowercase, langMap, mute, vol) — split into `speak` + delegating `speakLetter` |
| `js/screens/colours.js` | `speakColour` ~line 49 — duplicate TTS body, becomes delegate to APP.audio.speak |
| `js/screens/findletter.js` | inline `speakLetter` fallback ~lines 8-22 ("removed once feature/phonics merges" — it has) — simplify to delegate |
| `js/ui.js` | add `APP.ui.speakIntro(screenId)` (in-memory once-per-session map) |
| `js/main.js` | `ctx.go()` — add `speechSynthesis.cancel()` before route() |
| `data/i18n.js` | 13 `intro.*` keys × 6 locale blocks |
| 13 screens | one `APP.ui.speakIntro('<id>')` line at end of render(): map, library, painting, recipes, puzzles, dots, maze, memory, tictactoe, shapes, colours, washing, music |
| `tests/audio-speak.test.js` | NEW — mock speechSynthesis (see findletter pattern); jsdom env has no real one |

## Branch
feature/audio-guidance (off main at 65efd9d-era HEAD; Phase 1 = feature/game-progress,
commit dd37a15, NOT merged yet — this branch intentionally does not contain it)

## Decisions Log
2026-06-12 - Decision: phonics gate stays ONLY on speakLetter (it means "speak letter
sounds while tracing", not "enable all speech"). speak() checks mute only.
2026-06-12 - Decision: intro repeats once per screen per SESSION (in-memory object in
ui.js), not persisted — repetition across sessions is desirable for pre-readers.
2026-06-12 - Decision: speech-cancel on navigation lives in ctx.go() in main.js (single
funnel), not per-screen cleanup.
2026-06-12 - Decision: user approved auto-commit at green checkpoints for this phase
(no per-commit approval needed). Merging/pushing still needs approval.

## Constraints & Gotchas
- jsdom/vitest: no speechSynthesis — tests must stub global.window.speechSynthesis +
  SpeechSynthesisUtterance. No bare localStorage either (JSDOM per test, see
  tests/progress.test.js on the game-progress branch).
- `!= null ? x : default`, never `|| default` (0 is valid for volumes).
- All new strings in ALL 6 locales, keys identical to en block.
- Verify over HTTP: preview server config exists (.claude/launch.json, py http.server
  3456). Screenshots time out on animated screens — use preview_eval.
- KNOWN RED inherited from main: tests/state.test.js "restores all settings to their
  documented defaults" (stale depiction assertion). Fixed on feature/game-progress
  (dd37a15) — do NOT duplicate the fix here; resolves when that branch merges first.
  "Green" on this branch = that 1 failure only, everything else passing.

## Resume-here state (update on every checkpoint)
- [x] Dev docs created
- [ ] Checkpoint 1: audio.js speak/speakLetter split + colours/findletter dedupe + tests — IN PROGRESS
- [ ] Checkpoint 2: ui.speakIntro + main.js cancel + i18n ×6 + wire 13 screens + tests
- [ ] Review (/review-section) + preview verification

## Open Questions
(none)

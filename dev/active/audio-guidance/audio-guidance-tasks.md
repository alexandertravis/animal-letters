# audio-guidance — Tasks

## Section 1 — APP.audio.speak (checkpoint commit 1)
- [x] audio.js: extract `APP.audio.speak(text, locale)` (no phonics gate, no lowercase)
- [x] audio.js: `speakLetter` = phonics gate + lowercase + delegate
- [x] colours.js: `speakColour` delegates to APP.audio.speak
- [x] findletter.js: removed inline TTS fallback body, thin delegate kept
- [x] tests/audio-speak.test.js: 9 tests (mute, legacy mute, vol 0 respected, vol fallback, locale override, no-TTS no-op, lowercase, phonics gate on speakLetter only)
- [x] vitest: 201/202 — only failure is the known main-inherited depiction red (see context doc) → commit

## Section 2 — speakIntro + wiring (checkpoint commit 2)
- [ ] ui.js: `APP.ui.speakIntro(screenId)` — i18n `intro.<id>`, once per session per screen
- [ ] main.js: `speechSynthesis.cancel()` in ctx.go()
- [ ] i18n: 13 intro.* keys × 6 locales
- [ ] Wire: map, library, painting, recipes, puzzles, dots, maze, memory, tictactoe, shapes, colours, washing, music (one line at end of each render())
- [ ] tests: speakIntro once-per-session + missing-key no-op
- [ ] vitest green → commit

## Section 3 — Review + verify
- [ ] /review-section (bug review + inline security triage)
- [ ] Preview: boot clean, intro speaks on map (stub-check via preview_eval), no console errors
- [ ] Update dev docs + memory, mark phase complete

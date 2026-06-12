# audio-guidance — Tasks

## Section 1 — APP.audio.speak (checkpoint commit 1)
- [x] audio.js: extract `APP.audio.speak(text, locale)` (no phonics gate, no lowercase)
- [x] audio.js: `speakLetter` = phonics gate + lowercase + delegate
- [x] colours.js: `speakColour` delegates to APP.audio.speak
- [x] findletter.js: removed inline TTS fallback body, thin delegate kept
- [x] tests/audio-speak.test.js: 9 tests (mute, legacy mute, vol 0 respected, vol fallback, locale override, no-TTS no-op, lowercase, phonics gate on speakLetter only)
- [x] vitest: 201/202 — only failure is the known main-inherited depiction red (see context doc) → commit

## Section 2 — speakIntro + wiring (checkpoint commit 2)
- [x] ui.js: `APP.ui.speakIntro(screenId)` — once per screen per session; guards APP.t
      key-echo; only consumes the session slot when speech actually happened (speak()
      now returns boolean — muted child still hears intro after unmuting)
- [x] main.js: `speechSynthesis.cancel()` in ctx.go()
- [x] i18n: 13 intro.* keys × 6 locales (78 strings)
- [x] Wired all 13 screens (idempotent — safe inside doRender re-renders)
- [x] tests: 3 speakIntro tests (once-per-session, key-echo no-op, mute-then-unmute)
- [x] vitest 204/205 (only the known main-inherited depiction red) → commit
- [x] Live verify: maze intro spoke once across two renders; tictactoe intro in fr-FR;
      no console errors. GOTCHA: window.speechSynthesis is readonly in real browsers —
      stub by patching speechSynthesis.speak/.cancel instance methods, not the property.

## Section 3 — Review + verify
- [x] /review-section: bug review PASS (0 critical / 0 major / 3 minor — fixed
      speakLetter defensive guard + APP.t test cleanup; third minor is documented
      _spokenIntros test fragility, accepted). Security triage GREEN (bundled locale
      strings only, no user input, no secrets).
- [x] Preview verified live: maze intro once across two renders, fr-FR locale intro,
      no console errors
- [x] Docs + memory updated — PHASE 2 COMPLETE (3 commits on feature/audio-guidance,
      not merged)

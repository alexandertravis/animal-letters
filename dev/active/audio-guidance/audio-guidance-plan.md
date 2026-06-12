# audio-guidance — Plan

## Goal & Motivation

Every screen a 3–6 year old reaches alone should speak one short instruction aloud.
Today spoken guidance exists only in the tracing game, findletter, complete, gallery and
colours; everything else assumes the child can read. Phase 2 of the 5-phase engagement
plan (`~/.claude/plans/review-the-entire-project-hidden-plum.md`). Independent of
Phase 1 (game-progress, committed dd37a15 on its own branch).

## Approach

1. **Generalise speech** (js/audio.js): new `APP.audio.speak(text, locale)` with the
   body of `speakLetter` (mute + volume + langMap + cancel-before-speak) but WITHOUT the
   phonics gate and WITHOUT lowercasing. `speakLetter` keeps its phonics gate +
   lowercase and delegates to `speak`.
2. **Dedupe TTS copies**: colours.js `speakColour` (lines ~49-59) and findletter.js
   inline fallback (lines ~8-22, comment says remove post-phonics-merge — phonics has
   merged) both become thin delegates to APP.audio.
3. **Per-screen intro** (js/ui.js): `APP.ui.speakIntro(screenId)` — looks up i18n key
   `intro.<screenId>`, speaks once per screen per session (in-memory object, NOT
   localStorage — cross-session repetition is good at this age).
4. **Wire 13 screens** — call `APP.ui.speakIntro('<id>')` at the end of render():
   map, library, painting, recipes, puzzles, dots, maze, memory, tictactoe, shapes,
   colours, washing, music. (colours' bespoke spoken colour names stay; intro is extra.)
5. **Cancel on navigation** (js/main.js): `speechSynthesis.cancel()` inside `ctx.go()`
   before route() — one place, no per-screen cleanup needed.
6. **i18n**: 13 `intro.*` keys × 6 locales (en/pt/fr/es/de/it), ≤8 words, imperative.
7. **Tests**: tests/audio-speak.test.js — speak respects mute; speakLetter keeps
   phonics gate; speakIntro once-per-session and key lookup (mock speechSynthesis).

## Constraints

- `speak()` must NOT apply the phonics gate (that setting means "speak letter sounds in
  the tracing game", not "speak at all").
- Keep `speechSynthesis.cancel()` before each speak (existing pattern, prevents queue
  buildup on iOS).
- Volume: `sfxVol != null ? sfxVol : (volume != null ? volume : 1)` — `!= null`, never `||`.
- Mute check: `s.sfxMuted || s.muted` (legacy aliases kept in sync by APP.settings).

## Checkpoint commits (auto-commit at each green-test point — user approved 2026-06-12)

1. `feat(audio): generalise speech into APP.audio.speak + dedupe TTS copies`
2. `feat(audio): spoken intro per screen with i18n strings x6 locales`
3. (tests may fold into 1/2)

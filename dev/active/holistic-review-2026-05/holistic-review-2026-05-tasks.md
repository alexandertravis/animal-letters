# Holistic Review 2026-05 — Tasks

## NOW (correctness bugs)

- [x] Create dev docs (plan, context, tasks)
- [x] Fix storyreader.js: `destroyed` flag on all setTimeout callbacks
- [x] Fix storyreader.js: ✕ button add `|| phase === 'closing'` to early-exit
- [x] Fix data/i18n.js: translate library/reader keys in PT, FR, ES, DE, IT
- [x] Fix tests: animalId uppercase → lowercase in state.test.js
- [x] Fix tests: animalId uppercase → lowercase in animals.test.js
- [x] Fix tests: animalId uppercase → lowercase in integration.test.js
- [x] Fix index.html: remove `maximum-scale=1,user-scalable=no` from viewport meta
- [x] Commit: correctness fixes (4b2a62f)

## SOON (short-term UX + quality)

- [x] Fix library.js: replace APP._libCtx with ctx parameter in buildBook()
- [ ] Fix bookCover.js: use APP.starsHtml() in buildLockReqs (deferred — starSvg gives more colour control on varied cover backgrounds)
- [x] Remove dead CSS: .books-grid, .book-tile, .achievement-* (~40 lines)
- [x] Fix styles.css: --card → rgba(0,0,0,0.05)
- [x] Fix styles.css: remove --reader-ink-2 orphaned token
- [x] Fix styles.css: add touch-action: none to .book-spread
- [ ] Fix styles.css: merge 3 separate :root blocks (cosmetic, deferred)
- [ ] Fix tracer.js: clear orphaned single-point paths in endActiveInk (minor perf, deferred)
- [x] Commit: quality + CSS fixes (c9e7316)

## LATER (architecture + tests)

- [x] Story text translation: APP.storyText() + PT/FR/ES/DE/IT for all 8 stories (07b1e95)
- [x] Translate lock requirement hints on book covers: APP.animals.displayName() + library.req.complete/find i18n keys (7f5e92b)
- [x] Merge review/holistic-2026-05 → main and push to origin (deployed to Vercel)
- [x] Implement APP.setState(patch) to centralise state mutations (77d83c1)
- [x] Decouple complete.js + library.js: APP.goToStory(story, ctx) helper (77d83c1)
- [x] Add critical tests: APP.isStoryUnlocked() all boundary cases (77d83c1)
- [x] Add critical tests: APP.animalStars() all boundary values 0–5+ (77d83c1)
- [x] Add tests: advanceLetter() → newlyUnlockedStories (first unlock, already unlocked, not met) (77d83c1)
- [x] Add tests: APP.setState and APP.goToStory (77d83c1)
- [ ] Add tests: _migrateCompletedAnimals / _migrateCompletionCounts (not unit-testable without module reload — deferred)
- [ ] Move activeTracer/confettiCleanup inside render() in game.js and findletter.js
- [ ] Consider screen/game mode registry for extensibility

## Review Batches Status

- [x] A — Architecture & Extensibility (reviewed, findings documented)
- [x] B — Core Engine (reviewed, findings documented)
- [x] C — Screen Modules (reviewed, findings documented)
- [x] D — i18n & Data (reviewed, findings documented)
- [x] E — CSS & Responsive (reviewed, findings documented)
- [x] F — Test Coverage (reviewed, findings documented)

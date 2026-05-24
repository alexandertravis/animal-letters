# Holistic Review 2026-05 — Tasks

## NOW (correctness bugs)

- [x] Create dev docs (plan, context, tasks)
- [ ] Fix storyreader.js: `destroyed` flag on all setTimeout callbacks
- [ ] Fix storyreader.js: ✕ button add `|| phase === 'closing'` to early-exit
- [ ] Fix data/i18n.js: translate library/reader keys in PT, FR, ES, DE, IT
- [ ] Fix tests: animalId uppercase → lowercase in state.test.js
- [ ] Fix tests: animalId uppercase → lowercase in animals.test.js
- [ ] Fix tests: animalId uppercase → lowercase in integration.test.js
- [ ] Fix index.html: remove `maximum-scale=1,user-scalable=no` from viewport meta
- [ ] Commit: correctness fixes

## SOON (short-term UX + quality)

- [ ] Fix library.js: replace APP._libCtx with ctx parameter in buildBook()
- [ ] Fix bookCover.js: use APP.starsHtml() in buildLockReqs instead of inline SVG
- [ ] Remove dead CSS: .books-grid, .book-tile, .achievement-* (~40 lines)
- [ ] Fix styles.css: define --card token (or replace with existing token)
- [ ] Fix styles.css: remove --reader-ink-2 orphaned token
- [ ] Fix styles.css: add touch-action: none to .book-spread
- [ ] Fix styles.css: merge 3 separate :root blocks into one
- [ ] Fix tracer.js: clear orphaned single-point paths in endActiveInk
- [ ] Commit: quality + CSS fixes

## LATER (architecture + tests)

- [ ] Implement APP.setState(patch) to centralise state mutations
- [ ] Decouple complete.js: extract APP.goToStory(story, ctx) helper
- [ ] Move activeTracer/confettiCleanup inside render() in game.js and findletter.js
- [ ] Consider screen/game mode registry for extensibility
- [ ] Add critical tests: APP.isStoryUnlocked(), APP.animalStars() boundary values
- [ ] Add tests: advanceLetter() → newlyUnlockedStories
- [ ] Add tests: _migrateCompletedAnimals / _migrateCompletionCounts
- [ ] Story text translation design (Option A: inline multilingual per page field)

## Review Batches Status

- [x] A — Architecture & Extensibility (reviewed, findings documented)
- [x] B — Core Engine (reviewed, findings documented)
- [x] C — Screen Modules (reviewed, findings documented)
- [x] D — i18n & Data (reviewed, findings documented)
- [x] E — CSS & Responsive (reviewed, findings documented)
- [x] F — Test Coverage (reviewed, findings documented)

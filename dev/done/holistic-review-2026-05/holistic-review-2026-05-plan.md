# Holistic Review 2026-05 — Plan

## Goal
Systematic code review of the Animal Letters app to validate correctness, identify extensibility gaps, and fix bugs found by the review. Branch: `review/holistic-2026-05`.

## Agreed Approach
Run review agents in 6 batches (A–F). Implement all NOW fixes on the branch, then SOON, then LATER. No code changes in review sessions — only in implementation sessions.

## Batches

### A — Architecture & Extensibility ✅ (reviewed)
Key findings: 6-file addition cost for new game mode, APP._readerCtx/libCtx smell, no screen registry.

### B — Core Engine ✅ (reviewed)
Key findings: tracer.js ink path accumulation (minor), state.js _prevUnlocked guard asymmetry (low risk).

### C — Screen Modules ✅ (reviewed)
Key findings: storyreader timer leak (critical), ✕ button silent during 'closing' phase, APP._libCtx smell.

### D — i18n & Data ✅ (reviewed)
Key findings: 8 library keys malformed in all 5 non-EN locales (concatenated on one line, untranslated).

### E — CSS & Responsive ✅ (reviewed)
Key findings: dead CSS (~40 lines), --card undefined token, --reader-ink-2 orphaned, user-scalable=no WCAG violation.

### F — Test Coverage ✅ (reviewed)
Key findings: 26/102 tests failing due to animalId uppercase/lowercase mismatch.

## Phases

### Phase 1 — NOW fixes ← current
Critical correctness bugs: timer leak, i18n keys, test failures, viewport meta.

### Phase 2 — SOON fixes
Library ctx smell, dead CSS, token cleanup, touch-action on book-spread.

### Phase 3 — LATER
Architecture (setState, screen registry), test coverage, ES modules consideration.

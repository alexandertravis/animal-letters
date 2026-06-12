# parent-gate-cleanup — Tasks (Phase 5 of master plan)

Branch: feature/parent-gate-cleanup (off main). Plan: phase 5 of
`~/.claude/plans/review-the-entire-project-hidden-plum.md`. Small single-commit phase;
plan/context folded into this file.

## Section 1 — everything (single checkpoint)
- [x] Parent gate on setup.js: hold-3s-to-enter (`renderGate`, in-memory `gateUnlocked`
      once per session; timer cleared on release/leave/cancel; isConnected guard against
      mid-hold navigation). i18n setup.gateTitle/gateHold × 6 locales.
- [x] Global `:focus-visible` outline rule (styles.css shared section)
- [x] Dead CSS removed: .book-closed-img / .book-closed-title (verified 0 js refs;
      .book-tile/.books-grid were already gone)
- [x] Stale `depiction` refs removed: tests/setup.js, tests/settings.test.js (fixture +
      LETTER_KEYS — no assertions existed), CLAUDE.md:104/109/130 (also corrected the
      "settings lost on refresh" claim — they persist via APP.settings since Phase 1
      overhaul; documented al.progress.* keys)
- [x] "Clear Gallery" confirm — verified already present (setup.js:158), no change
- [x] vitest 227/227
- [x] Live-verified: gate hides settings, holding class on press, early release cancels
      and stays gated, full 3s hold unlocks (gate gone, settings visible)
- [x] Review done INLINE (small diff, token-conscious): timer lifecycle sound,
      no user input paths, security GREEN

## Decisions
2026-06-12 - Hold-to-enter (not PIN): standard kids-app pattern, no persistence burden,
adults understand it instantly; PIN can layer on later if needed.
2026-06-12 - Gate unlock is per-session (in-memory) — refresh re-locks.

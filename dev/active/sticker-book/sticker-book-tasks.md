# sticker-book — Tasks

## Section 1 — Data + award engine (checkpoint 1, commit bbaf3ec)
- [x] data/stickers.js — 12 defs with defensive check(games, state)
- [x] index.html — script tag after data/locations.js
- [x] js/progress.js — checkStickers() after each record; al.progress.stickers; APP.state.newStickers (guarded); APP.progress.stickers()
- [x] tests/stickers.test.js — 10 tests (predicates, award-once, persistence, throwing-check safety, all-checks-safe-on-empty)
- [x] vitest 227/227 → committed

## Section 2 — Surfaces (checkpoint 2)
- [x] js/ui.js stickerToast (pop sfx + speak + 3.5s auto-dismiss + tap-to-dismiss; CSS in shared styles.css section)
- [x] js/main.js — drain newStickers after route render, toasts staggered from +2200ms (after the game's own celebration)
- [x] js/screens/stickers.js — grid screen, count header, grey filter ON THE ICON SPAN, tap earned sticker = pop + speak label, topbar back:'map', intro.stickers wired
- [x] index.html — screen script tag (after music.js)
- [x] js/screens/map.js — sticker-album building card (inline SVG art), NOT in APP.LOCATIONS
- [x] data/i18n.js — 15 keys × 6 locales (90 strings)
- [x] vitest 227/227; live-verified: earn→navigate→drain scheduled at +2200ms, toast renders (icon+title+label), stickers screen 1/12 with 11 greyed, computed filter grayscale(1) opacity(.35) on icon span, no console errors → commit

## Section 3 — Review + verify (checkpoint 3)
- [x] /review-section: 0 critical / 2 major / 2 minor. Fixed: (1) toast speech no
      longer cuts off the stickers screen's own intro — drain passes {silent:true}
      when destination is 'stickers'; (2) persist-divergence — toasts only queue for
      stickers whose localStorage write verifiably landed (read-back check), so a
      quota failure re-toasts once later instead of every record; (3) try/finally
      around APP.STICKERS mutation in the throwing-check test. Accepted: localStorage
      stub pattern (consistent with other test files); bookworm check signature.
      Security triage GREEN (localStorage arrays + bundled strings; no user input in
      markup — all textContent except static SVG).
- [x] Preview verified (pre-fix run): full earn→navigate→toast loop, screen
      earned/unearned rendering, computed grey filter, no console errors
- [x] Docs + memory updated — PHASE 3 COMPLETE (3 commits, not merged)

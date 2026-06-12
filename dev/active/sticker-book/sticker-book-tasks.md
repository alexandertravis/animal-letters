# sticker-book — Tasks

## Section 1 — Data + award engine (checkpoint 1)
- [ ] data/stickers.js — 12 defs with defensive check(games, state)
- [ ] index.html — script tag after data/locations.js
- [ ] js/progress.js — checkStickers() after each record; al.progress.stickers; APP.state.newStickers (guarded); APP.progress.stickers()
- [ ] tests/stickers.test.js — predicates, award-once, persistence, throwing-check safety
- [ ] vitest green → commit

## Section 2 — Surfaces (checkpoint 2)
- [ ] js/ui.js stickerToast (pop sfx + speak + auto-dismiss; CSS in shared styles.css section)
- [ ] js/main.js — drain newStickers after route render
- [ ] js/screens/stickers.js — grid screen (grey icon filter on span), topbar back:'map'
- [ ] index.html — screen script tag
- [ ] js/screens/map.js — stickers building card
- [ ] data/i18n.js — 12 labels + stickers.title + stickers.earned + intro.stickers ×6
- [ ] vitest green → commit

## Section 3 — Review + verify (checkpoint 3)
- [ ] /review-section
- [ ] Preview: seed progress → recordWin → toast on next nav; stickers screen renders earned/unearned; no console errors
- [ ] Update docs + memory

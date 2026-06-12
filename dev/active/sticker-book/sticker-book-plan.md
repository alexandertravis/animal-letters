# sticker-book — Plan

## Goal & Motivation

Collectible meta-reward layer tying all games together (USER PRIORITY). Children earn
stickers for cross-game achievements; a sticker-book screen shows earned (full colour)
vs unearned (grey silhouette). Consumes Phase 1's APP.progress data. Phase 3 of the
master plan (`~/.claude/plans/review-the-entire-project-hidden-plum.md`).

## Approach

1. **Data `data/stickers.js`** (script tag after data/locations.js): `APP.STICKERS` —
   12 stickers v1 (data-driven, trivially extensible):
   `{ id, icon (emoji), labelKey, check(games, state) }` where games = APP.progress.all().
2. **Award evaluation in `js/progress.js` recordWin/recordPlay**: after store.set, for
   each unearned sticker run check(); newly earned → persist id under
   `al.progress.stickers` (array) + push full sticker onto transient
   `APP.state.newStickers[]` (guarded — APP.state may not exist in tests).
   Expose `APP.progress.stickers()` (earned id array) + `APP.progress.checkStickers()`.
3. **Toast on NEXT screen render** (js/main.js route()): after render, read+clear
   `APP.state.newStickers`, show `APP.ui.stickerToast(sticker)` — never interrupts the
   game's own win celebration. Toast: slide-in card, pop sfx, speaks i18n
   `stickers.earned` via APP.audio.speak, auto-dismiss ~3.5s.
4. **Screen `js/screens/stickers.js`** (script tag + APP.screens.stickers): grid of 12
   slots; unearned = `filter: grayscale(1) opacity(.35)` ON THE ICON SPAN (iOS gotcha:
   parent filter wins — never on a wrapper that holds the label). Topbar back:'map'.
5. **Entry point**: map building card 'stickers' appended to the map grid (own SVG art
   + 🏅) navigating to 'stickers' screen.
6. **i18n**: 12 labels + screen title + toast line + intro.stickers, ×6 locales.
7. **Tests** `tests/stickers.test.js`: each predicate vs fixture progress; award fires
   once; persistence round-trip; newStickers populated + clearable.

## The 12 stickers (v1)

| id | icon | earn condition (games = progress map, state = APP.state) |
|---|---|---|
| first-word | ✏️ | letters wins ≥ 1 |
| word-ten | 🏆 | letters wins ≥ 10 |
| letter-spotter | 🔍 | findletter wins ≥ 1 |
| little-artist | 🎨 | painting wins ≥ 1 |
| little-chef | 🍳 | recipes wins ≥ 1 |
| busy-baker | 🧁 | recipes wins ≥ 5 |
| puzzle-pro | 🧩 | puzzles wins ≥ 5 |
| maze-master | 🌀 | maze bestStars ≥ 3 |
| memory-whiz | 🧠 | memory bestStars ≥ 3 |
| try-everything | 🌟 | every one of the 13 game ids has plays ≥ 1 |
| animal-friend | 🦁 | ≥ 10 keys in state.animalCompletionCounts |
| bookworm | 📚 | ≥ 1 story unlocked (APP.getUnlockedStories) |

## Constraints

- check() must be defensive: games[id] may be undefined; state may be partial.
- recordWin runs in unit tests without state.js/utils.js → all state-dependent checks
  guard their inputs; evaluation wrapped so a throwing check never breaks recordWin.
- Sticker evaluation must not double-award (earned array is the guard).
- All i18n keys in ALL 6 locales.

## Checkpoint commits
1. data/stickers.js + progress.js evaluation + tests
2. toast + screen + map entry + i18n + wiring
3. review + fixes

# Explore & Expand — Tasks

## Stage 1 — Reader text-size fix + settings-in-reader  `feature/reader-textsize`
- [x] Add settings gear (textSize) to storyreader topbar; live-apply on change
- [x] Verify library→reader persistence + live change in-browser (gear S/M/L →
      live `large`/`medium` on `.book`, reader stays open, persists to al.game.library)
- [x] Ensure `library.textSize` i18n in all 6 locales
- [x] Tests green (270/270); commit
- [ ] (gate) merge to main + push  ← awaiting approval

## Stage 2 — +20 stories  (on `feature/explore-expansion`)
- [x] Authored 20 full-length stories (~9–10 pages) across all 21 unused animals
- [x] Shared `data/stories/_shared.js` (APP.storyPrompt) + one file per story + index.html tags
- [x] `tests/stories-content.test.js` (ids, pages, animal refs, palettes, 20 new-ids)
- [x] In-browser: 48 books/covers on shelf, new watercolour story opens in reader, console clean
- [x] 277 tests pass; committed in 4 batches
- [ ] (gate) merge + push  ← batched for approval

## Stage 3 — +3 cooking items  `feature/cooking-items`
- [ ] Add 3 recipes to `data/recipes.js` (reuse oven/pan/fry)
- [ ] `tests/recipes.test.js` data integrity
- [ ] In-browser cook each; commit
- [ ] (gate) merge + push

## Stage 4 — Memory 2-player  `feature/memory-2player`
- [ ] mode setting + playerTurn/playerScores + turn-pass logic
- [ ] turn badge + 2-player win screen
- [ ] i18n (6 locales); `tests/memory.test.js`
- [ ] In-browser 2-player run; commit
- [ ] (gate) merge + push

## Stage 5 — Clock building  `feature/clock-games`
- [ ] `js/clockFace.js` helper (pure angle maths)
- [ ] `readclock.js` + `sethands.js` screens (+ visualAids/difficulty settings)
- [ ] map building + location + index.html tags
- [ ] i18n (6 locales) + optional sticker
- [ ] `tests/clock.test.js`; in-browser both orientations; commit
- [ ] (gate) merge + push

## Stage 6 — Human Body building  `feature/human-body`
- [ ] `data/body.js` (layers + digestion)
- [ ] `bodylayers.js` + `digestion.js` screens
- [ ] map building + location + index.html tags
- [ ] i18n (6 locales) + optional sticker
- [ ] `tests/body.test.js`; in-browser; commit
- [ ] (gate) merge + push

## Stage 7 — Space building  `feature/space`
- [ ] `data/space.js` (8 planets + constellations)
- [ ] `solarsystem.js` + `planetorder.js` + `stars.js` screens
- [ ] map building + location + index.html tags
- [ ] i18n (6 locales) + optional sticker
- [ ] `tests/space.test.js`; in-browser; commit
- [ ] (gate) merge + push

## Wrap-up
- [ ] Map layout flows 12 buildings + sticker book on phone/tablet
- [ ] Update MEMORY.md; archive docs to dev/done/explore-expansion/

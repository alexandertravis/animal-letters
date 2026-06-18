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

## Stage 3 — +3 cooking items  (on `feature/explore-expansion`)
- [x] Added Cookies (oven), Pizza (oven), Waffle (pan) to `data/recipes.js`
- [x] `tests/recipes.test.js` data integrity (cookType + animType valid)
- [x] In-browser: 6 recipes in picker, new ones shown, console clean
- [x] Committed

## Stage 4 — Memory 2-player  (on `feature/explore-expansion`)
- [x] `mode` setting (solo/2player) + playerTurn/playerScores + turn-pass logic
- [x] turn bar (🔵/🔴 chips, active highlighted) + 2-player win screen (winner/tie)
- [x] i18n ×6 (mode/modeSolo/modeTwo/player1/player2/winner/tie); `tests/memory.test.js`
- [x] In-browser: miss→turn passes, match→scores+keeps turn; solo unchanged; console clean
- [x] 288 tests pass; committed

## Stage 5 — Clock building  (on `feature/explore-expansion`)
- [x] `js/clockFace.js` helper (pure clockHandAngles + SVG + clockSetHandAngles)
- [x] `readclock.js` (tap matching time) + `sethands.js` (drag hands + Check)
      with `level` (oclock/half/quarter/five) + `aids` (number guides) settings
- [x] Clock building SVG in map.js + hub location + index.html tags
- [x] i18n ×6 (loc.clock + 15 keys). Sticker deferred (optional)
- [x] `tests/clock.test.js` (angles + wiring + i18n); 300 tests pass
- [x] In-browser: building on map; readclock loop (read→match→advance); sethands
      drag→Check→advance; flex "1 1 0%" + targets within view at 375×812 & 812×375;
      console clean
- [x] Committed

## Stage 6 — Human Body building  (on `feature/explore-expansion`)
- [x] `data/body.js` (5 layers skin→bones + 5 digestion stops; EN facts in data)
- [x] `bodylayers.js` (peel through layers) + `digestion.js` (drag food through stops)
- [x] Human Body building SVG (heart+cross) in map.js + hub location + index.html tags
- [x] i18n ×6 (loc.humanbody + 18 keys incl. layer/organ labels). Sticker deferred
- [x] `tests/body.test.js` (data order + wiring + i18n); 311 tests pass
- [x] In-browser: building on map; layers peel skin→bones+win; digestion drag all
      5 stops+win; flex "1 1 0%" + targets in view at 375×812 & 812×375; console clean
      (note: snap-transition is a visual nicety; rapid sim reads it mid-animation)
- [x] Committed

## Stage 7 — Space building  (on `feature/explore-expansion`)
- [x] `data/space.js` (8 ordered planets + 2 constellations; EN facts in data)
- [x] `solarsystem.js` (tap planets to explore) + `planetorder.js` (tap in order
      from Sun) + `stars.js` (connect constellations)
- [x] Space building SVG (rocket) in map.js + hub location + index.html tags
- [x] i18n ×6 (loc.space + 23 keys incl. planet/constellation names). Sticker deferred
- [x] `tests/space.test.js` (data + wiring + i18n); 322 tests pass
- [x] In-browser: building on map; all 3 games win; constellation names shown;
      flex "1 1 0%" + targets in view at 375×812 & 812×375; console clean
- [x] Committed

## Wrap-up
- [x] Map now flows 12 buildings + Sticker Book (scrollable grid; verified Space
      + Human Body + Clock all present alongside originals)
- [x] Update MEMORY.md; archive docs to dev/done/explore-expansion/
- [x] (gate) merged feature/explore-expansion → main (ff f1d97d1→f698f62) + pushed.
      ALL 7 STAGES COMPLETE. 322 tests pass.

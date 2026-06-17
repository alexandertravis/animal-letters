# Explore & Expand — Context

## Key files by stage
- **S1 reader text-size:** `js/screens/storyreader.js` (topbar ~:63, textSize
  read :92–93, bookEl :90), `js/screens/library.js` (settings schema ~:144–177),
  `styles.css` (`[data-text-size]` rules ~:4320), `data/i18n.js` (`library.textSize`).
- **S2 stories:** `data/stories/<slug>.js` (one per story), `data/stories.js`
  (`APP.Story` class), `index.html` (stories script group), `data/animals.js`.
- **S3 cooking:** `data/recipes.js` (`APP.RECIPES`), `js/screens/recipes.js`
  (`stepCook()` routes oven/pan/fry).
- **S4 memory:** `js/screens/memory.js` only.
- **S5 clock:** NEW `js/clockFace.js`, `js/screens/readclock.js`,
  `js/screens/sethands.js`; `js/screens/map.js` BUILDINGS, `data/locations.js`.
- **S6 body:** NEW `data/body.js`, `js/screens/bodylayers.js`,
  `js/screens/digestion.js`; map + locations.
- **S7 space:** NEW `data/space.js`, `js/screens/solarsystem.js`,
  `js/screens/planetorder.js`, `js/screens/stars.js`; map + locations.

## Reusable patterns (verified during planning)
- Screen skeleton: `js/screens/countmatch.js`, `calendar.js`, `plantgrow.js`.
- Topbar settings gear: `APP.ui.topbar({settings:{gameId,title,schema,onChange}})`;
  schema field types segmented/toggle/slider/select (`js/ui.js`).
- Per-game persistence: `APP.settings.game/saveGame/updateGame(gameId,…)` →
  `al.game.<id>`.
- Pointer→SVG mapping for dragging: `getScreenCTM().inverse()` in `tracer.js`,
  `maze.js`, `dots.js` (null-check getScreenCTM).
- Drag + hitTest: `recipes.js makeDraggable/hitTest`, `pollinate.js`.
- Ordering drag-into-slots: `calendar.js` (Days).
- Data-driven staged reveal: `plantgrow.js` + `data/greenhouse.js`.
- Progress/stickers: `APP.progress.recordPlay/recordWin`, `data/stickers.js`.

## Known gotchas (carry forward)
- **Mobile clipping:** screen wrapper `flex:1;min-height:0` (NOT 100vh) +
  landscape `@media (max-height:520px)` compaction; inner scroll areas need
  `min-height:0`. Preview browser doesn't reproduce; verify the fix (computed
  flex=="1 1 0%", targets within innerHeight at 375×812 AND 812×375).
- **Browser cache at port 3456:** force-refresh data/JS via
  `fetch(url+'?t='+Date.now(),{cache:'no-store'})`+`(0,eval)` before checking
  registry/i18n/map. Serve via `py -m http.server 3456`.
- **i18n tests:** later phases adding games to a hub break exact-list asserts —
  use `toContain`/`not.toContain` for membership.
- **New screen needs an index.html `<script>` tag** or `APP.screens[x]` is undefined.

## Self-serve micro-decisions log
(populate as stages run — story pairings, recipe choices, stars game form, etc.)

## Animals available (unused → prioritise for stories)
bull, camel, crocodile, deer, fish, flamingo, giraffe, gorilla, hippo, horse,
kangaroo, koala, lobster, moose, panda, rat, shark, snake, squirrel, tiger, whale
(21). Already have stories: ant, bee, cat, cow, dog, fox, hen, owl, pig, rabbit,
bear, duck, eagle, elephant, frog, goat, hedgehog, lion, monkey, mouse, parrot,
penguin, swan, tortoise, turtle, wolf, zebra, dolphin.

## Test baseline
270 tests passing at session start (HEAD f1d97d1).

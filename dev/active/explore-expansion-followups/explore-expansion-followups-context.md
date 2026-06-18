# Explore-Expansion Follow-ups — Context

Durable reference for anyone extending the areas added on 2026-06-18.
(Full session detail: `dev/done/explore-expansion/`, plan
`~/.claude/plans/i-would-like-to-typed-gizmo.md`.)

## New files & APIs
| File | Provides |
|---|---|
| `js/clockFace.js` | `APP.clockHandAngles(h,m)` (pure: hour `((h%12)+m/60)*30`, min `m*6`); `APP.clockFace({hour,minute,showNumbers,showMinutes,size})`→`<svg>` (sets `svg.__clock`); `APP.clockUpdate(svg,h,m)`; `APP.clockSetHandAngles(svg,hourDeg,minDeg)` (explicit, no minute drift) |
| `data/stories/_shared.js` | `APP.storyPrompt({cast,scene,composition,light})` — shared house-style for NEW stories (originals still inline their own STYLE/NEGATIVE) |
| `data/body.js` | `APP.BODY.layers[]` (skin→bones), `APP.BODY.digestion[]` (mouth→largeInt); `labelKey`→i18n, `fact` EN-only |
| `data/space.js` | `APP.SPACE.planets[]` (8, ordered from Sun), `APP.SPACE.constellations[]` (star arrays = connect order); `labelKey`→i18n, `fact` EN-only |
| `js/screens/{readclock,sethands,bodylayers,digestion,solarsystem,planetorder,stars}.js` | the 7 new game screens |

## Where things plug in
- **New screen** → `js/screens/X.js` (IIFE, `APP.screens.X={render}`) + `<script>`
  in `index.html` **before** `js/main.js` (data files before core before screens;
  `js/clockFace.js` loads right after `js/tracer.js`).
- **New building** → SVG in `js/screens/map.js` `BUILDINGS` (keyed by location id)
  + a `data/locations.js` entry. Hub (multi-game) = `direct:null` + `games[]`
  (opened via the generic `location` screen); single-game = `direct:'screen'`.
  Map grid auto-flows + scrolls; now 12 buildings + Sticker Book.
- **i18n** → add keys to ALL 6 locale blocks in `data/i18n.js` (`game.X.title`,
  `intro.X`, prompts/wins, labels). Tests assert completeness ×6.
- **Progress/stickers** → `APP.progress.recordPlay/recordWin('screen',{stars})`;
  stickers in `data/stickers.js` (`check(games,state)`).

## Reusable patterns (verified)
- **Mobile-clipping (MUST):** screen wrapper `flex:1;min-height:0` (NOT 100vh) —
  it's the sole flex child of `#app` (`height:100dvh; body{overflow:hidden}`).
  Add `@media (orientation:landscape) and (max-height:520px)` compaction; inner
  scroll areas also need `min-height:0`. Preview headless browser does NOT
  reproduce the clip — verify the fix: computed `flex`=="1 1 0%" + interactive
  targets within `innerHeight` at **375×812 AND 812×375**.
- **Pointer→SVG drag:** `getScreenCTM().inverse()` (null-check it). Used in
  `sethands` (hand angle) and tracer/maze/dots.
- **Plain pointer drag + hitTest:** `digestion` (food token, padded 35% hit) —
  same family as recipes/pollinate.
- **Data-driven staged reveal:** `bodylayers` (stacked SVG `<g>`, opacity-0 the
  top layer to reveal inner) — cf. plantgrow/greenhouse.
- **Tap-in-order:** `planetorder` (sequence check + lock) / `stars` (connect).
- **Round loop:** `readclock`/`sethands` mirror `countmatch` (roundsDone, ROUNDS,
  later()/clearTimers(), showWin()).

## Gotchas (carry forward)
- **i18n strategy:** UI chrome ×6 (tested); educational FACT text + story prose
  English-only in data files (deliberate scope choice).
- **Port-3456 cache:** edited data/JS served stale after reload — force-refresh
  `fetch(url+'?t='+Date.now(),{cache:'no-store'})`+`(0,eval)` before checking
  registry/i18n/map. Serve via `py -m http.server 3456`; drive via Claude Preview
  (`launch.json` "test-project" already exists).
- **Snap-transition vs synthetic drag:** digestion's `transition:left .25s` makes
  rapid programmatic getBoundingClientRect reads land mid-animation — a TEST
  artifact only (set `transition:none` to test). Real one-at-a-time dragging fine.
- **Hub-membership asserts:** use `toContain`/`not.toContain`, never exact list.

## Test baseline
322 tests pass (`npm test`). New: stories-content / recipes / memory / clock /
body / space `.test.js`.

# Greenhouse — Context

## Key files
| File | Role |
|---|---|
| `js/screens/map.js` | `BUILDINGS` SVG map; grid auto-renders from `APP.LOCATIONS`. Add `greenhouse` SVG. |
| `data/locations.js` | `APP.LOCATIONS` registry + `APP.locationOf`. Add greenhouse hub entry. |
| `js/screens/location.js` | Generic hub menu; renders `loc.games` via `APP.ui.bigButton`. No edit needed. |
| `index.html` | Script load order. New `data/greenhouse.js` before `data/locations.js`; new screens before `js/main.js`. |
| `data/i18n.js` | 6 locales, flat keys, auto-fallback to `en`. Add greenhouse keys. |
| `data/greenhouse.js` | NEW — stage scripts, needs/distractors, season + insect data (text via i18n keys). |
| `js/screens/plantgrow.js` | NEW — life-cycle journey (centrepiece). |
| `js/screens/plantneeds.js` | NEW — what plants need. |
| `js/screens/pollinate.js` | NEW — pollination & fruiting. |
| `js/screens/seasons.js` | NEW — vegetable patch & seasons. |

## Reuse references (exact signatures)
- `APP.ui.topbar({ ctx, title, home, back, onRestart, settings:{gameId,title,schema,onChange}, right:[] })` — `js/ui.js`
- Settings schema field types: `segmented`/`toggle`/`slider`/`select` — `js/ui.js`
- `APP.settings.game(id, defaults)` / `saveGame(id,obj)` / `updateGame(id,patch,defaults)` — `js/settings.js`
- `APP.progress.recordWin(id,{stars})` / `recordPlay(id)` / `get(id)` — `js/progress.js` (key `al.progress.games`)
- `APP.launchConfetti({count,duration,colors})` — `js/utils.js`
- `APP.audio.speak(text, locale)` returns bool; `APP.audio.sfx.click()/pop()/wrong()` — `js/audio.js`
- `APP.ui.speakIntro('<screen>')` — once/screen/session; needs `intro.<screen>` i18n key — `js/ui.js`
- recipes drag: `makeDraggable(node,onDrop)`, `hitTest(zone,x,y)` (pad 20%), `hitCircle(node,x,y,slack)` — `js/screens/recipes.js`
- recipes staged flow: `S={step}` + `setStep(step)` rebuilds stage — `js/screens/recipes.js`
- colours drag-into-target: clone + `getBoundingClientRect` hit-test + `sfx.wrong` shake — `js/screens/colours.js`
- memory `spawnStars(anchor,count)` + `@keyframes starPop` + `.mem-star` — `js/screens/memory.js`
- GSAP: vendored `js/vendor/gsap.min.js`; `var G = window.gsap||null`; thin `gto/gset/gtl` wrappers fire onComplete immediately when G is null — `js/screens/recipes.js`
- Map building auto-render + ★ badge from `APP.progress.get(gameId).bestStars` (gameId = screen, except `game`→`letters`) — `js/screens/map.js`

## Decisions log
- (2026-06-16) Greenhouse is a multi-game hub (`direct:null` + `games[]`), opened via the existing `location` screen — no new menu code.
- (2026-06-16) `bgTrack:'map'` reuses the gentle pentatonic track — no new audio asset.
- (2026-06-16) Plant rendered as inline SVG built up per stage; CSS/GSAP animation with non-GSAP fallback.

## Open questions
- none

## Session log
- (2026-06-16) Branch `feature/greenhouse` created off `main` (HEAD bb9b706→93afabf range already on main). Dev docs created. Starting Section 1.
- (2026-06-16) Section 1 complete + merged to main (ff to 1df011f, pushed). Greenhouse building, hub, 4 stubs, i18n×6.
- (2026-06-16) Section 2 complete + merged to main (634f247). `plantgrow` centrepiece, 8-stage journey, 17 i18n keys×6.
- (2026-06-16) Section 3 complete (`plantneeds`). Drag needs vs distractors; perk-and-bloom plant. 11 i18n keys×6. Verified via preview_eval. Not yet committed.

## Section 2 notes (plantgrow)
- Stages are data (`APP.GREENHOUSE.stages`); interaction handlers (drag/collect/continue) in `js/screens/plantgrow.js`.
- Plant parts are SVG elements toggled via `.show` class; CSS transitions handle grow/scale/draw-on. transform-box:fill-box used for per-part scale origins (leaves: 100%/0% 50%).
- Animation is CSS-only on purpose — removing the DOM stops it; no GSAP/tween cleanup. Timers guarded by `wrap.isConnected`; back clears timers.
- Test-env gotcha reconfirmed: browser caches data files at port 3456 across server restarts. Force-refresh via `fetch(url+'?t='+Date.now(),{cache:'no-store'})` + `(0,eval)` before testing registry/i18n/map changes.

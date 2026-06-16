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

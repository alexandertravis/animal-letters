# sticker-book — Context

## Key Files
| File | Role |
|---|---|
| `data/stickers.js` | NEW — APP.STICKERS (12 defs). index.html tag after data/locations.js |
| `js/progress.js` | recordWin/recordPlay → evaluate stickers after store.set; `al.progress.stickers` earned ids; APP.state.newStickers transient |
| `js/main.js` | route(): after render, drain APP.state.newStickers → APP.ui.stickerToast |
| `js/ui.js` | stickerToast(sticker) — slide-in, pop sfx, speak, ~3.5s auto-dismiss |
| `js/screens/stickers.js` | NEW screen — grid; index.html tag with other screens; remember APP.screens.stickers |
| `js/screens/map.js` | extra 'stickers' building card appended after APP.LOCATIONS loop |
| `data/i18n.js` | 12 labels + stickers.title + stickers.earned + intro.stickers, ×6 |
| `tests/stickers.test.js` | NEW — predicates, award-once, persistence, newStickers drain |

## Branch
feature/sticker-book (off main c7b37ca — phases 1+2 merged, 217/217 green)

## Decisions Log
2026-06-12 - Decision: 12 stickers v1 (not the plan's ~20) to keep i18n volume sane;
data-driven so adding more later is a data+i18n-only change.
2026-06-12 - Decision: emoji icons (consistent with map/recipes current art; Phase 4
upgrades art app-wide).
2026-06-12 - Decision: toast shown on NEXT screen render (drain in route()), never
during the game's own celebration.
2026-06-12 - Decision: map entry = extra building card appended to the grid (not a
location in APP.LOCATIONS — it has no games[] and locationOf must not match it).

## Constraints & Gotchas
- Unearned grey filter goes ON THE ICON SPAN, never a wrapper with the label
  (iOS: parent filter always wins — see childrens-app.md).
- progress.js loads BEFORE state.js → guard all APP.state access at call time.
- stickers.js (data) loads before js/progress.js — APP.STICKERS referenced at call
  time only, so order is safe either way; keep data tag after locations.js anyway.
- check() functions must never throw (wrap evaluation in try/catch per sticker).
- New screen file needs BOTH the index.html script tag AND APP.screens.stickers.
- vitest jsdom: no bare localStorage — JSDOM per test (pattern in tests/progress.test.js).
- Auto-commit at green checkpoints approved (2026-06-12, extended from phase 2 policy).

## Resume-here state (update on every checkpoint)
- [x] Branch + dev docs created
- [ ] Checkpoint 1: data/stickers.js + progress.js evaluation + index.html tag + tests
- [ ] Checkpoint 2: ui.stickerToast + main.js drain + stickers screen + map entry + i18n ×6
- [ ] Checkpoint 3: /review-section + preview verify + archive decision

## Open Questions
(none)

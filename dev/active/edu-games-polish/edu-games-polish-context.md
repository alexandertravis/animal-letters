# Educational Games Polish — Context

## Key Files

| File | Role | Items |
|---|---|---|
| `js/screens/addition.js` | Adding Up game. `group(n,emoji)` builds object groups. | #1 |
| `js/screens/numberbonds.js` | Number Bonds. `APP.numberBonds(n)` pure helper (keep). Drag tokens between `.nb-box.left/.right`; `recount()` updates eq. | #2 |
| `js/screens/countmatch.js` | Count & Match. `.cm-item` emoji in `.cm-items`. | #3 |
| `js/screens/firstletter.js` | Drag animal pic → starting letter. `.fl-body` space-between. | #4 |
| `js/screens/wordmatch.js` | Drag word card → animal pic. `.wm-body` space-between. | #5 |
| `js/screens/plantgrow.js` | Greenhouse centrepiece. `.pg-scene` flex:1 + `.pg-prompt` flex-shrink:0; `.pg-svg` max-height:62vh. | #6 |
| `js/screens/plantneeds.js` | Drag needs onto plant. `.pn-svg` max-height:46vh; tray in prompt. | #6 |
| `js/screens/pollinate.js` | Drag bee onto flowers. Bee in `.po-prompt`. | #6 |
| `js/screens/seasons.js` | Season tabs + quiz. `.se-content` flex:1 overflow-y:auto; `.se-stage` height:min(240px,38vh). | #6 |
| `data/i18n.js` | All 6 locales. New NB strings go here ×6. | #2 |
| `tests/number-games.test.js` | NB/addition/etc data+wiring+i18n tests. | #2 |

## Layout primitives (styles.css)

- `html, body { height:100%; overflow:hidden; touch-action:none }` (line ~20)
- `#app { height:100dvh; display:flex; flex-direction:column; padding: safe-area insets }` (line ~37)
- `.std-topbar { display:grid; flex-shrink:0; ... }` (line ~4054); icon btns 40px in compact.
- Canonical breakpoints (CLAUDE.md): short landscape = `(orientation:landscape) and (max-height:520px)`.

## Decisions Log

**2026-06-17** — Core height fix is `min-height:100vh` → `flex:1; min-height:0`
(NOT `height:100%`), because the screen is the sole flex child of `#app` and
flex:1 stretches it to fill exactly the dynamic viewport minus safe-area insets.

**2026-06-17** — Fix stays inside each screen's injected `<style>` string — no
shared styles.css edits, keeping blast radius per-screen and matching the
established pattern for these screens.

**2026-06-17** — For space-between screens (firstletter/wordmatch), once the
screen == viewport height the bottom drag-row sits at the visible bottom (fixed
in portrait). Landscape gets a compaction media query; if content can still
overflow, prefer `justify-content:flex-start` + working overflow over
center/space-between (those clip the FIRST item on overflow in a scroll box).

## Gotchas

- These screens inject their own CSS; editing `styles.css` won't affect them.
- Screenshots time out on continuously-animated screens (pulse/float/buzz) —
  verify layout via `preview_eval` bounding-rect / computed-style checks.
- Browser caches data/JS at port 3456 across restarts — force-refresh via
  `fetch(url+'?t='+Date.now(),{cache:'no-store'})` + `(0,eval)` when checking.
- i18n test files assert key completeness ×6 — any new key must exist in all
  locales or tests fail. Avoid `toEqual(exact game list)` assertions.
- `APP.numberBonds(n)` is unit-tested — keep its signature/behaviour intact even
  after the game redesign (it's a pure helper).

## Open Questions
none

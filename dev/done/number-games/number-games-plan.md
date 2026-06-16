# Number Games — Plan

## Goal
Add a **Numbers building** to the village map opening a hub of counting/maths games,
each with a difficulty setting spanning early counting up to times tables. Phase 2 of
the educational-games roadmap (`~/.claude/plans/i-want-to-include-sparkling-boot.md`).

## Approach
Reuse all existing infrastructure (topbar + settings schema, progress, confetti, speak,
clone-drag/tap patterns). New hub location `counting` (label reuses `loc.numbers` =
"Numbers", `bgTrack:'school'`). Move the existing digit-tracing `numbers` screen into this
building (remove it from School). Four new game screens, each with a `segmented` difficulty.

## Games
| Screen | Game | Difficulty setting |
|---|---|---|
| `countmatch` | Count & Match — count emoji items, pick the numeral | range 1–5 / 1–10 / 1–20 |
| `addition`   | Addition — objects + numerals, pick the answer | sums to 5 / 10 / 20 |
| `numberbonds`| Number Bonds — split N items between two boxes (find all ways) | total 5 / 10 |
| `times`      | Times Tables — visual arrays (young) → numerals (older) | ×2,5,10 / ×2–5 / ×2–12 |
| `numbers`    | (moved) digit tracing 0–9 | — |

## Sections
1. Building + hub wiring (map SVG, `counting` location, move digit-tracing, 4 stubs, i18n, index.html).
2. `countmatch`.
3. `addition`.
4. `numberbonds`.
5. `times`.
6. Polish + unit tests (pure maths helpers: bond enumeration, problem generation).

## Constraints
- No build step; serve over HTTP. Strict index.html load order (data before locations; screens before main.js).
- Navigation safety: guard timers with `wrap.isConnected`; clear before `ctx.go` where needed.
- Speak numbers/answers aloud via `APP.audio.speak`. Use `sfx.click/pop/wrong`.
- Work inline/sequentially; commit + ff-merge to main + push at each green checkpoint.
- Test-env: force-refresh cached data files via `fetch(url+'?t='+Date.now(),{cache:'no-store'})`+`(0,eval)`.

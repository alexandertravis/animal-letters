# add-tests — Context

## Key Files

| File | Role |
|---|---|
| `package.json` | (to create) devDependency on vitest; `test` script |
| `vitest.config.js` | (to create) jsdom environment, test file glob |
| `tests/setup.js` | (to create) shared helper that bootstraps window.APP in load order |
| `tests/state.test.js` | (to create) tests for state.js logic |
| `tests/animals.test.js` | (to create) tests for animals.js pickers |
| `tests/utils.test.js` | (to create) tests for utils.js helpers |
| `tests/letterData.test.js` | (to create) schema completeness checks |
| `data/animals.js` | Source of APP.ANIMALS — must load first in test bootstrap |
| `js/state.js` | APP.state, startGame, advanceLetter, skipAnimal, saveProgress, clearProgress |
| `js/animals.js` | pickRandom, pickNext, eligibleCount |
| `js/utils.js` | caseOf, isDot, dotTransformPos, launchConfetti, svgEl, addGuidelines |
| `js/letterData.js` | APP.LETTERS — 52 glyph definitions (A–Z, a–z) |

## Decisions Log

2026-05-07 - Decision: Vitest + jsdom over browser-based QUnit because it runs
             in Node (no dev server), has watch mode, and is CI-friendly.

2026-05-07 - Decision: No app code changes. IIFEs self-attach to window.APP in
             jsdom just as they do in the browser; tests read from window.APP.

2026-05-07 - Decision: Unit tests only (no E2E/Playwright) for this task.
             tracer.js and screen renders are DOM/canvas-heavy and better
             covered by E2E if that task is ever added.

2026-05-07 - Decision: Scope limited to state.js, animals.js, utils.js,
             letterData.js — the four pure-logic modules with no DOM dependency.

2026-05-07 - Decision: Integration tests added in tests/integration.test.js
             covering 6 cross-module scenarios (20 tests). Wires state +
             animals + letterData + localStorage together.

2026-05-09 - Decision: Pre-commit pipeline run before task close. All blocking
             issues fixed: resetSettings maxLength assertion added dynamically
             (Math.max over APP.ANIMALS), skipAnimal describe given its own
             beforeEach, spy.mock.calls[0] guarded with toHaveBeenCalledTimes(1),
             canvas DOM leak prevented with try/finally, redundant beforeEach
             blocks in animals.test.js consolidated to file-level.

## Session End — 2026-05-09
Git status: clean (all committed and pushed to origin/main)

## Constraints & Gotchas

- **IIFE load order**: data/animals.js must be imported before state.js
  (state.js reads APP.ANIMALS at module evaluation time to set maxLength
  default). state.js must load before animals.js (animals.js reads APP.state).
  The setup helper must enforce this order.

- **No exports**: modules have no `export` statements. Tests import them for
  side-effects and then read `window.APP` (or `global.APP` in Node/jsdom).

- **localStorage in jsdom**: jsdom ships a working localStorage stub, so
  saveProgress/clearProgress will work. Use `vi.spyOn` to assert calls.

- **APP.ICONS / APP.audio stubs**: state.js and animals.js don't use these,
  but if the bootstrap imports files that reference them (e.g. screens),
  stubs will be needed. Solution: only import the four target modules, not
  the full app stack.

- **letterData.js size**: the file defines 52 glyphs. Schema tests should
  loop over expected keys rather than hardcode individual assertions.

- **launchConfetti in utils.js**: calls document.createElement('canvas') —
  jsdom supports this, but requestAnimationFrame is a no-op. Tests should
  only verify the returned cancel handle is a function, not the animation.

- **resetSettings maxLength**: DEFAULT_SETTINGS.maxLength is computed at module
  evaluation time from the live APP.ANIMALS list. setup.js beforeEach hardcodes
  maxLength:6 for isolation, but the resetSettings test must use
  Math.max(...APP.ANIMALS.map(a => a.name.length)) to assert the correct default.

## Session Summary — 2026-05-09
Completed:
- Full /pre-commit pipeline (bug review, security triage GREEN, code quality)
- Fixed CRITICAL: resetSettings test now asserts maxLength dynamically
- Fixed HIGH: skipAnimal describe block has own beforeEach (no test-order dep)
- Fixed MEDIUM: spy.mock.calls[0] guarded with toHaveBeenCalledTimes(1)
- Fixed MEDIUM: canvas DOM leak in launchConfetti tests prevented with try/finally
- Fixed Quality HIGH: consolidated 3 redundant APP.ANIMALS beforeEach into
  file-level beforeEach in animals.test.js
- All 102 tests pass; committed and pushed to origin/main
NEXT STEP: Task is complete. Move dev/active/add-tests/ to dev/complete/ or
           start the next task (e.g. challenges feature using animalCompletionCounts)
Blockers: none
Half-finished: none
Security flags added: none

# add-tests — Plan

## Goal
Add appropriate unit test coverage to the animal-letters game so that
regressions in core logic are caught before they reach the browser.

## Motivation
- The project has grown through several refactor sessions (quality cleanup,
  smart randomiser, localStorage persistence) with no automated safety net.
- The Map-vs-bracket bug in devanimals.js (caught manually) is a good example
  of the kind of regression a test suite would have surfaced immediately.
- The upcoming challenges feature (animalCompletionCounts) will build on top of
  the same state logic — tests now protect that foundation.

## Approach

### Framework: Vitest + jsdom
- Vitest runs in Node; jsdom provides a `window` object so the existing
  `window.APP` IIFE modules load and self-attach without any app code changes.
- Zero-config for this pattern; starts in milliseconds.
- Alternative considered: plain browser HTML test page (QUnit). Rejected —
  requires a dev server or browser tab, harder to run in CI, no watch mode.

### No app code changes
- All test infrastructure (package.json, vitest.config.js, tests/) sits
  alongside the app. index.html and all js/ files are untouched.

### Module loading strategy
Each test file manually loads modules in dependency order:
  data/animals.js → state.js → utils.js → animals.js → letterData.js
using Vitest's `await import()` after setting `global.window = global`.
jsdom makes `window` available so the IIFEs self-attach as normal.

### Scope: unit tests for pure-logic modules only
| Module | What to test |
|---|---|
| `state.js` | startGame, advanceLetter, skipAnimal, saveProgress, clearProgress |
| `animals.js` | pickRandom, pickNext, eligibleCount |
| `utils.js` | caseOf, isDot, dotTransformPos, launchConfetti handle |
| `letterData.js` | Schema completeness — all A–Z + a–z defined, each has ≥1 stroke |

Out of scope for this task:
- tracer.js (SVG/canvas, requires full browser)
- Screen renders (DOM-heavy)
- E2E / Playwright tests

## Phases

### Phase 1 — Infrastructure
1. Add package.json with vitest devDependency
2. Add vitest.config.js (jsdom environment, test glob)
3. Add tests/setup.js (shared APP bootstrap helper)
4. Verify `npm test` runs and exits cleanly with zero tests

### Phase 2 — state.js tests
Cover all exported functions + localStorage interaction (mock localStorage).

### Phase 3 — animals.js tests
Cover pickRandom, pickNext (streak logic), eligibleCount.

### Phase 4 — utils.js tests
Cover caseOf (upper/lower/proper), isDot, dotTransformPos.

### Phase 5 — letterData.js tests
Schema checks: every letter A–Z and a–z is present; each entry has a
viewBox string and at least one stroke with a non-empty `d` property.

## Known risks / constraints
- The IIFE pattern means modules have no exports — tests must load files
  via import side-effects and read from `window.APP`.
- `localStorage` must be mocked in state.js tests (jsdom provides a basic
  implementation, but it should be spied on to verify save/clear calls).
- Load order matters: animals.js depends on APP.ANIMALS (data/animals.js)
  and APP.state (state.js) being present before it runs.

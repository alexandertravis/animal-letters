# Educational Games Polish — Plan

## Goal & Motivation

Six user-reported improvements to the educational games shipped in the
2026-06-16 roadmap (Greenhouse / Numbers / Reading). Two are **blocking bugs**
(drag targets clipped off-screen on phones), three are engagement/clarity
enhancements, and one is a small game redesign.

## Items

1. **Adding Up** (`addition.js`) — show the numeral for each object group above
   the objects (e.g. **3** over the 3 apples) to reinforce quantity↔symbol.
2. **Number Bonds** (`numberbonds.js`) — redesign from free-exploration to
   target-matching: show a target equation, start balls randomly split, child
   moves balls to match; show the commutative twin (3+4 = 4+3); clearer per-box
   counts + total.
3. **Count & Match** (`countmatch.js`) — counted emoji do a Mexican wave on each
   correct answer (mini-win feel).
4. **First Letter** (`firstletter.js`) — letters not visible on phone (clipped).
5. **Word Match** (`wordmatch.js`) — word cards not visible on phone (clipped).
6. **Greenhouse** (`plantgrow/plantneeds/pollinate/seasons.js`) — size-aware in
   phone portrait AND landscape.

## Root-Cause Diagnosis (#4, #5, #6)

All new edu screens set `.<x>-screen { min-height: 100vh }`. But `#app` is
`height: 100dvh` and `body { overflow: hidden }`. On mobile `100vh ≥ 100dvh`
(the `vh` unit ignores browser toolbars), so each screen overflows `#app` and
the bottom slice is **clipped, not scrollable**.

- First Letter / Word Match additionally use `justify-content: space-between`,
  which parks the drag targets in that clipped bottom slice → invisible.
- Greenhouse screens have no responsive breakpoints; bottom prompt/controls get
  clipped and SVG `max-height` (62/46/38vh) is too tall in landscape.

**Core fix:** per screen, change `min-height:100vh` → `flex:1; min-height:0` so
the screen fills `#app` exactly (the screen is the sole child of `#app`, which
is a flex column). Add a short-landscape `@media (orientation:landscape) and
(max-height:520px)` block per screen to compact sizes. Each screen injects its
own `<style>`, so changes stay localized — no shared `styles.css` change needed.

## Approach / Phases (sections)

- **A** — First Letter + Word Match layout bugs (shared fix pattern). [bugs]
- **B** — Greenhouse size-awareness (4 screens). [bugs]
- **C** — Adding Up numerals. [enhancement]
- **D** — Count & Match Mexican wave. [enhancement]
- **E** — Number Bonds redesign. [redesign + i18n×6 + tests]

Order chosen: unblock phone play first (A, B), then enhancements (C, D), then
the larger redesign (E).

## Number Bonds redesign (confirmed with user)

- Round shows target equation `a + b = N`.
- N balls start randomly split between the two boxes (NOT the target split).
- Big live count under each box + the total, updating as balls move.
- Child drags balls until left = a and right = b → round solved.
- On success show commutative twin: `a + b = N` and `b + a = N` → "same total!".
- Repeat through each distinct bond of N, then win.
- Defaults: target is a specific left/right arrangement; each bond once per game;
  difficulty `total` = 5 / 10 retained.

## Constraints

- Vanilla JS, no build. `window.APP` IIFE pattern, strict script load order.
- Each screen injects its own `<style id="<screen>-css">`.
- i18n must stay complete across all 6 locales (test suite enforces it).
- 266 tests currently pass — must stay green; add tests for new NB logic.
- Per-section rhythm: commit → ff-merge to main → push (user-directed).

## Verification

- `py -m http.server 3456`; preview at ~375px portrait AND short landscape.
- Confirm drag targets are within the viewport (preview_eval bounding-rect
  checks; screenshots may be flaky on animated screens — memory note).
- Run full vitest suite after each section.

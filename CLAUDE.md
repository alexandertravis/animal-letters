# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the project

No build step. Open `index.html` directly in Chrome or Edge. There is no dev server, no package.json, and no dependencies to install.

## Architecture

All JavaScript shares a single global namespace object (`window.APP`). Each file is an IIFE that extends it:

```
window.APP = window.APP || {};
(function (APP) { ... })(window.APP);
```

**Script load order in `index.html` is load-order dependent and must be preserved:**

```
data/animals.js       → APP.ANIMALS[]
js/state.js           → APP.state, APP.startGame(), APP.advanceLetter(), etc.
js/settings.js        → APP.settings
js/audio.js           → APP.audio
js/animals.js         → APP.animals.pickRandom()
js/letterData.js      → APP.LETTERS{}, APP.getLetter()
js/tracer.js          → APP.tracer.mount()
js/screens/*.js       → APP.screens.landing/setup/game/complete
js/main.js            → router entry point
```

## Screen routing

`APP.state.screen` is a string (`"landing"` | `"setup"` | `"game"` | `"complete"`). `main.js` calls `APP.screens[screen].render(rootEl, ctx)` on every transition. Each screen module receives a `ctx` object with a single method: `ctx.go(screenName)` which sets `APP.state.screen` and re-renders. There is no virtual DOM — every transition calls `root.innerHTML = ''` and rebuilds from scratch.

## Letter-tracing mechanic (`js/tracer.js`)

`APP.tracer.mount(stageEl, char, { onComplete })` builds a layered SVG inside the stage element:

1. **Mask** (`<defs><mask>`) — all letter strokes thickened to `stroke-width: 48`, white on black. Confines user ink to the letter interior.
2. **Ghost group** — same strokes at low opacity (the faint letter outline the child traces over).
3. **Done group** — completed strokes rendered solid dark blue.
4. **Ink group** — user's polyline, masked to the letter shape, drawn in pink.
5. **Guide group** — dashed orange path for the current stroke with a start-dot; animates via CSS `stroke-dashoffset`.

**Stroke completion:** Each stroke's SVG path is sampled into 18 checkpoints via `getPointAtLength()`. As the pointer moves, `checkProgress()` advances through checkpoints within a tolerance of 32 viewBox units. When all 18 are hit, the stroke is marked done. When all strokes are done, `onComplete` fires after a 350 ms delay.

**Coordinate mapping:** `clientToSvg()` uses `svg.getScreenCTM().inverse()` to convert pointer client coordinates into SVG viewBox coordinates. This works correctly regardless of how the SVG is scaled.

## Letter data (`js/letterData.js`)

Each glyph is defined as:
```js
LETTERS['A'] = {
  viewBox: '0 0 200 240',   // same for all uppercase; lowercase uses same but paths differ
  strokes: [
    { d: 'M 30,220 L 100,30' },  // SVG path for one stroke, in drawing order
    ...
  ]
};
```

Coordinate conventions:
- **Uppercase:** baseline `y=220`, cap line `y=30`, left `x=30`, right `x=170`
- **Lowercase:** ascender top `y=30`, x-height top `y=110`, baseline `y=210`, descenders to `y=240`

Strokes are drawn thick (`stroke-width: 48`) — there is no separate outline path. The letter shape *is* the union of the thickened strokes.

## Adding animals (`data/animals.js`)

Append to the `APP.ANIMALS` array:
```js
{
  name: "BEE",             // uppercase; the game applies case at render time
  displayName: "Bee",
  images: {
    cartoon:   "assets/images/cartoon/bee.svg",
    realistic: "assets/images/realistic/bee.jpg"
  },
  audio: "assets/audio/bee.mp3"
}
```

Drop matching files into `assets/images/cartoon/`, `assets/images/realistic/`, and `assets/audio/`. Missing images fall back to a large single-letter placeholder; missing audio is silently skipped.

## Audio (`js/audio.js`)

All game sounds are synthesised via the Web Audio API — no sound files are required for the game to work.

| Method | When called | Sound |
|---|---|---|
| `APP.audio._wake()` | First `pointerdown` in the game | Resumes / initialises `AudioContext` |
| `APP.audio.strokeDone()` | Each stroke completed | Short 880 Hz tick |
| `APP.audio.letterDone()` | All strokes for a letter done | Ascending C–E–G arpeggio |
| `APP.audio.wordDone()` | Full word complete (called by `playComplete`) | Fanfare |
| `APP.audio.playComplete(src)` | Complete screen mounts | Fanfare, then animal sound file 900 ms later |

`AudioContext` is created lazily inside `getAC()` and must be first called from within a user gesture to satisfy browser autoplay policy.

## State

`APP.state` is the single source of truth. Key fields:
- `screen` — active screen name
- `settings` — `{ maxLength, letterCase, depiction, revealMode }` (in-memory only, no persistence)
- `currentAnimal` — the animal object currently being traced
- `letterIndex` — index into `currentAnimal.name` for the letter currently on screen
- `sessionExists` — enables the "Continue" button on the landing screen

Settings are lost on page refresh by design.

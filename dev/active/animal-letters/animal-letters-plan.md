# Animal Letters — Plan

## Goal & Motivation

Build a browser-based, touch-first letter-tracing game for young children. The child is given an animal name, traces each letter stroke-by-stroke following animated guides, and on completion sees a congratulations screen with the animal's image and a sound. The game is designed to run directly from `index.html` with no server or build step, making it trivially deployable and shareable.

## Agreed Approach

**Stack:** Vanilla HTML/CSS/JS — no framework, no bundler, no dependencies. All files loaded via `<script>` tags in strict order, sharing `window.APP` as the global namespace.

**Letter rendering:** SVG-based 5-layer stack inside a single `<svg>` element:
1. `<mask>` in `<defs>` — thickened stroke paths (white on black) confine user ink to letter interior
2. Ghost group — same strokes at low opacity (the faint letter outline)
3. Done group — completed strokes rendered solid dark blue
4. Ink group — user's polyline, masked to letter shape, drawn in pink
5. Guide group — dashed orange path for current stroke with animated start-dot

**Stroke detection:** Each stroke path sampled into 18 checkpoints via `getPointAtLength()`. Pointer proximity (TOLERANCE = 32 viewBox units) advances checkpoints in order. Forgiving by design — young children won't trace precisely.

**Ink gating:** Ink only deposits when the pointer is within DRAW_RADIUS (52 units) of the current guide dot. Progress only advances on pointer *move* (not tap), preventing accidental completion.

**Audio:** Fully synthesised via Web Audio API — no audio files required for the game to function. Real animal sounds can be added later as MP3s.

**Alternatives considered:**
- Canvas-based drawing: rejected because SVG masking handles the "ink stays inside letter" requirement more cleanly without per-pixel hit testing
- JSON data file: rejected because `file://` protocol blocks `fetch()`. Converted to a `.js` file that sets `window.APP.ANIMALS`
- localStorage persistence: user opted out — session-only state

## Phases of Work

### Phase 1 — Core infrastructure ✅
- Project structure, index.html, styles.css
- Global namespace pattern, screen router (main.js)
- State object (state.js), settings (settings.js)
- Animal data file (data/animals.js) with 3 seed animals

### Phase 2 — Letter tracing engine ✅
- letterData.js: 52 glyphs (A–Z, a–z) with stroke paths
- tracer.js: SVG layer stack, checkpoint system, pointer events
- Coordinate mapping (getScreenCTM inverse)

### Phase 3 — Game screens ✅
- Landing, Setup, Game, Complete screens
- Name strip with faint/hidden reveal modes
- Settings UI (max length, case, depiction, reveal mode)

### Phase 4 — Polish & fixes ✅
- Audio rewrite to Web Audio API (synthesised sounds)
- Guide dot at last-completed position (not next-required)
- Continuous cross-stroke tracing (no lift required at intersections)
- Ink gating to guide dot proximity
- Static tap no longer advances progress (move required)
- Guide contrast: white halo behind orange dashes

### Phase 5 — Animal expansion & gallery ✅
- 25 animals (3–6 letter names) with SVG placeholder images
- Gallery screen: locked/unlocked tiles, peek-of-head effect
- Fixed 140px tile grid (consistent across devices)
- Completed animals tracked in `APP.state.completedAnimals` Set

### Phase 6 — Future (user-supplied assets)
- Real cartoon SVG / realistic JPG images per animal
- Real animal audio MP3s
- Additional animals beyond the current 25

## Known Risks & Constraints

- **Script load order is fragile.** Adding a new JS file requires inserting it in the correct position in `index.html`. See CLAUDE.md for the required order.
- **`file://` protocol limitations.** No `fetch()`, no ES modules. All data must be inline JS.
- **AudioContext autoplay policy.** `_wake()` must be called from within a user gesture (`pointerdown`). Do not call `getAC()` outside of a user interaction chain.
- **SVG `getPointAtLength()` requires DOM attachment.** Temp paths must be appended to `<defs>` before calling `getTotalLength()` / `getPointAtLength()`, then removed.
- **Touch-action must be `none`.** Both `html, body` and `svg.tracer-letter` set `touch-action: none` to prevent scroll interference during tracing.
- **letterData.js is hand-authored.** Stroke paths are geometric approximations. Some glyphs (e.g. S, s, G) use curves that required careful tuning. Do not auto-generate from font outlines without verifying checkpoint spacing.

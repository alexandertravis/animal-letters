# Painting Templates — Context

## Key Files

| File | Role |
|---|---|
| `js/screens/painting.js` | Painting screen IIFE. All changes for templates go here — mode switch, template rendering, PBN hit detection. |
| `data/painting-templates.js` | NEW. `APP.PAINTING_TEMPLATES = [...]`. Inline Path2D path data for all templates + regions. |
| `styles.css` | Painting section already exists. Add template-picker + mode-toggle styles here. |
| `data/i18n.js` | Add `painting.draw`, `painting.colourIn`, `painting.pickTemplate`, `painting.pbn` keys to `en`. |
| `index.html` | Add `<script src="data/painting-templates.js">` before `js/state.js`. |
| `js/utils.js` | `APP.launchConfetti()` available for PBN completion. |
| `js/audio.js` | `strokeDone()` for region hit, `wordDone()` for full template complete. |

## Architecture Notes

### Two-canvas split (already in place)
- `.paint-layer` (bottom) — all pixels that `getImageData` touches. Outline drawn here
  opaquely as fill barrier.
- `.overlay-layer` (top, `pointer-events:none`) — crisp visual line-art + PBN region numbers.
- Stage background is white CSS; paint layer is transparent (absence of paint = white shows).

### Template coordinate system
- Each template authored in a `400 × 400` viewBox.
- At render time: compute `scale = Math.min(canvasW, canvasH) / 400 * 0.85` (85% to leave
  padding) and `tx = (canvasW - 400*scale)/2`, `ty = (canvasH - 400*scale)/2`.
- Apply `ctx.setTransform(scale, 0, 0, scale, tx, ty)` before drawing, reset after.
- **Important:** fill tap point must be converted from canvas CSS px → backing-store px
  (multiply by dpr) — NOT into template coordinates. `getImageData` sees the rasterised
  pixels; the transform was already applied when the outline was drawn.

### Outline as flood-fill barrier
- Outline strokes drawn with `strokeStyle = '#1a1a1a'`, `lineWidth = 6` (template coords,
  scaled). At the rasterised boundary the dark pixels `[26, 26, 26, 255]` differ by >> 40
  from any bright fill colour → flood-fill stops cleanly.
- Must be drawn to BOTH canvases: overlay (visual) + paint layer (barrier).
- `clearAll()` in template mode must re-draw barrier after clearing paint layer.

### PBN region hit detection
- Each region has a `d` (SVG path string) and a `targetColor` hex.
- On fill tap: iterate `regions`, build `Path2D(r.d)`, apply same scale transform to a
  scratch context (or use `ctx.isPointInPath` with a transform), check if tap falls inside.
- `isPointInPath(path, x, y)` uses the current transform — set the scale transform before
  checking.
- Tap point for `isPointInPath`: CSS pixel coordinates (not device pixels), because
  `isPointInPath` respects the current context transform (unlike `getImageData`).
- Track completed regions in a `Set` per template session.

## Decisions Log

**2026-05-25** — Templates as inline `Path2D` only (not `<img>` or external SVG).
Reason: `drawImage` of an external file before `getImageData` = SecurityError on `file://`.

**2026-05-25** — Fixed 400×400 viewBox for all templates. Letterboxed with 85% fill and
centred at render time. Simpler than per-template viewBoxes.

**2026-05-25** — Mode switch is a two-button toggle in the topbar (Draw | Colour-in).
Colour-in shows a template picker below the topbar. PBN is a sub-mode of Colour-in,
activated when a template has `regions[]` populated.

## Open Questions
- None currently.

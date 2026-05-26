# Painting Templates & Paint-by-Numbers — Plan

## Goal & Motivation

Extend the free-paint screen (feature/painting, merged to main) with two new modes:

1. **Colour-in / Fill-over (Phase 2):** A set of simple outline templates (flower, star,
   house, fish, sun, balloon, butterfly, cat) the child can fill with the paint-bucket tool.
   Outlines act as fill boundaries. Child can also paint freely over the template.

2. **Paint-by-numbers (Phase 3):** Same outlines, but regions are pre-labelled with colour
   numbers. Filling a region with the correct colour gives a success sound + star. Completing
   the full template triggers confetti.

The primary user is a 3-year-old; all UI must remain large-touch-target, toddler-friendly.

## Agreed Approach

**Architecture (two-canvas, already in place):**
- Paint canvas (bottom) — all brush/fill/sticker pixels, writable by `getImageData`.
- Overlay canvas (top, `pointer-events:none`) — template line-art drawn here for visual
  crispness. Same outline drawn opaquely into the paint canvas as fill barriers.

**Template data — inline `Path2D` paths only.**
Never `drawImage` an external file before `getImageData` — SecurityError on `file://`.
Templates live in `data/painting-templates.js` as `APP.PAINTING_TEMPLATES = [...]`.

**Mode switch** within the single painting screen. Topbar gets a Draw / Colour-in toggle.
Switching to Colour-in shows a template picker (small thumbnails). Selecting a template:
- Clears both canvases.
- Draws outline into overlay canvas (crisp, dark).
- Draws opaque outline into paint canvas (barrier for flood-fill).
- Switches default tool to fill-bucket.

**Phase 3 (PBN)** adds `regions[]` to each template: each region has `{ d, number,
targetColor }`. On fill, compare chosen colour to the region's `targetColor` for a
hit/miss. Hit = success tick + `strokeDone()` sound. All regions filled = confetti +
`wordDone()` sound.

## Phases

### Phase 2 — Colour-in templates ✅ (this branch)
- `data/painting-templates.js` — 8 hand-coded outline templates (Path2D paths)
- Mode toggle (Draw | Colour-in) in painting topbar
- Template picker (thumbnail grid)
- Outline rendering into overlay + paint layer
- Fill stops cleanly at outlines (dark pixels mismatch target colour in flood-fill)
- Clear in template mode re-draws outline barriers

### Phase 3 — Paint-by-numbers ✅ (this branch)
- `regions[]` added to each template with `{ number, d, targetColor, label }`
- PBN mode toggle (or sub-mode of Colour-in)
- Region numbers rendered as text on overlay canvas
- On fill: detect which region was tapped, compare to targetColor
- Hit: green flash + `strokeDone()` sound
- All regions complete: `APP.launchConfetti()` + `wordDone()` sound
- Colour swatches highlight the "target" colour for each numbered region (optional guide)

## Known Risks

- **Canvas tainting** — all template paths must be inline `Path2D`, never external images.
- **Path2D hit testing** — detecting which region was tapped uses `ctx.isPointInPath(path, x, y)`
  on device pixels. Must check all regions; first match wins.
- **Outline as fill barrier** — outline strokes must be opaque and dark enough that the
  flood-fill tolerance (40) rejects them as matching the fill target.
- **Scale mapping** — template paths are authored in a fixed viewBox (e.g. 0 0 400 400);
  must be scaled + centred into the actual canvas size using a transform.
- **Clear in template mode** — must re-draw the barrier outline into the paint layer after
  clearing, or fill will flood outside the shapes.

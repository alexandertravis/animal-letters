# Painting Templates — Tasks

## Section 1 — Template Data
- [x] `data/painting-templates.js` — `APP.PAINTING_TEMPLATES = [...]`; 8 templates:
  flower, star, house, fish, sun, balloon, butterfly, cat; each with `id`, `label`,
  `outline` (array of SVG path strings), `lineWidth`, and `regions[]` populated for all 8
- [x] `index.html` — add `<script src="data/painting-templates.js">` in data block,
  before `js/state.js`

## Section 2 — Mode Toggle + Template Picker UI
- [x] `data/i18n.js` — add `painting.draw`, `painting.colourIn`, `painting.pickTemplate`
  keys to `en` block
- [x] `styles.css` — mode toggle buttons, template picker grid (thumbnail canvases),
  active template highlight
- [x] `js/screens/painting.js` — add mode toggle (Draw | Colour-in) to topbar HTML
- [x] `js/screens/painting.js` — template picker panel (hidden in Draw mode): thumbnail
  grid with mini-canvas previews of each template outline
- [x] `js/screens/painting.js` — `paint.mode` state field (`'free'` | `'template'`);
  mode switch handler: clear both canvases, show/hide picker

## Section 3 — Outline Rendering + Fill Barrier
- [x] `js/screens/painting.js` — `drawTemplate(tpl)`: compute scale + offset for 400×400
  viewBox → canvas, draw outline into overlay canvas (crisp) AND paint layer (barrier)
- [x] `js/screens/painting.js` — template selection handler: call `drawTemplate()`, set
  default tool to fill, store `paint.template`
- [x] `js/screens/painting.js` — `clearAll()` in template mode: clear paint layer, then
  re-draw barrier outline (so flood-fill still stops at lines)
- [x] `js/screens/painting.js` — thumbnail rendering: draw each template outline into a
  small `<canvas>` in the picker

## Section 4 — Paint-by-Numbers
- [x] `data/painting-templates.js` — populate `regions[]` for at least 2 templates
  (e.g. flower, fish); each region: `{ number, d, targetColor, label }` — done for all 8
- [x] `data/i18n.js` — add `painting.pbn` key to `en`
- [x] `js/screens/painting.js` — `renderPbnNumbers()`: draw region numbers as text on
  overlay canvas at each region's centroid
- [x] `js/screens/painting.js` — PBN fill handler: on fill tap, `isPointInPath` check
  against all regions (scale transform applied); if hit and correct colour → mark
  complete + `strokeDone()`; if wrong colour → gentle shake/miss indication
- [x] `js/screens/painting.js` — completion detection: when all regions filled correctly
  → `APP.launchConfetti()` + `APP.audio.wordDone()`
- [x] `styles.css` — PBN region number style on overlay; completion animation

## Section 5 — Verify & Polish
- [ ] Test all 8 templates: outlines render, fill stops at lines, colours work
- [ ] Test PBN templates: region detection, correct/wrong colour feedback, completion
- [ ] Test clear in template mode re-draws barrier
- [ ] Test back button, mode switch back to free-paint, re-entering template mode
- [ ] Console clean, no errors

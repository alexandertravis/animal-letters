// ─── Shared story house-style helper ─────────────────────────────────────────
//
// The original story files each pasted the full STYLE / NEGATIVE blocks inline.
// Stories added in the explore-expansion batch share the canonical house style
// from here instead, so each file stays focused on its own text + scenes.
//
//   APP.storyPrompt({ cast, scene, composition, light })
//     cast        — optional array of character-bible strings (joined into SCENE)
//     scene       — what is happening in the picture
//     composition — framing / where the eye goes
//     light       — lighting note
//
// Returns the same STYLE + SCENE + COMPOSITION + LIGHT + NEGATIVE string shape
// the illustration pipeline expects.
// ─────────────────────────────────────────────────────────────────────────────

window.APP = window.APP || {};

(function (APP) {

  var STYLE = `STYLE:
Classic English children's book watercolour illustration, in the lineage of Beatrix Potter,
Jan Brett, E. H. Shepard and Arnold Lobel. Hand-painted on textured cold-press watercolour
paper — visible paper grain, soft pigment blooms at the edges, gentle wet-on-wet washes.
Fine sepia ink linework, slightly broken and hand-drawn, never a hard digital outline.
Warm, soft, ambient natural light — golden-afternoon or candlelit interiors.

Palette: cream, oat, honey, soft sage, dusty rose, faded cornflower blue, walnut brown,
gentle ochre. Muted, harmonious, earthy. NO neons, NO high-saturation primaries, NO
synthetic gradients, NO airbrushed glow.

Character design: anthropomorphic animals proportioned realistically (not chibi, not Disney).
They wear simple cottagecore clothing — apron, waistcoat, dungarees, neckerchief, bonnet,
straw hat — rendered in muted period tones. Faces are expressive but gentle; eyes are
small, kind, watercolour-painted dots, never large anime eyes.

Composition: classical storybook framing, one clear focal moment per image, gentle
vignetting that fades into the paper at the edges. Painted from a child's eye-level
where possible. Background is sketched and atmospheric, not photographic.

No text, no captions, no borders, no frames, no logos, no watermarks. Square-ish 4:3 aspect ratio.`;

  var NEGATIVE = `NEGATIVE:
no text, no captions, no borders, no frames, no logos, no watermarks, no modern objects
(no plastics, no electronics, no contemporary clothing), no anime eyes, no neon colours,
no airbrushed digital glow, no photorealism, no 3D-rendered look, no chibi proportions,
no horror or gore, no scary expressions, no real-world brands.`;

  APP.storyPrompt = function (o) {
    o = o || {};
    var castLine = (o.cast && o.cast.length) ? (o.cast.join(' ') + '\n') : '';
    return STYLE
      + '\n\nSCENE:\n' + castLine + (o.scene || '')
      + '\n\nCOMPOSITION:\n' + (o.composition || '')
      + '\n\nLIGHT:\n' + (o.light || '')
      + '\n\n' + NEGATIVE;
  };

})(window.APP);

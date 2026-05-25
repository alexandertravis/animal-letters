// ─── The Ugly Duckling ────────────────────────────────────────────────────────
//
// Hans Christian Andersen's tale retold in lyrical prose for young children.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Moral: every creature grows into exactly what they were always meant to be.
//
// Image prompts follow the locked house style from image-style-guide.md.
// ─────────────────────────────────────────────────────────────────────────────

window.APP = window.APP || {};

(function (APP) {

  /* ── Style block — pasted verbatim into every imagePrompt ────────────── */
  const STYLE = `STYLE:
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
small, kind, watercolour-painted dots, never large anime eyes. Humans (when present) are
rosy-cheeked, modestly drawn, period-appropriate.

Composition: classical storybook framing, one clear focal moment per image, gentle
vignetting that fades into the paper at the edges. Painted from a child's eye-level
where possible. Background is sketched and atmospheric, not photographic.

No text, no captions, no borders, no frames, no logos, no watermarks. The book frames
the image; keep the image clean. Square-ish 4:3 aspect ratio.`;

  const NEGATIVE = `NEGATIVE:
no text, no captions, no borders, no frames, no logos, no watermarks, no modern objects
(no plastics, no electronics, no contemporary clothing), no anime eyes, no neon colours,
no airbrushed digital glow, no photorealism, no 3D-rendered look, no chibi proportions,
no horror or gore, no scary expressions, no real-world brands.`;

  /* ── Character bible — paste verbatim into every SCENE ───────────────── */
  const CAST = {
    duckling: `A large grey-brown duckling, notably bigger and longer-necked than a typical duckling, gentle and serious dark eyes, an air of quiet puzzlement about his place in the world.`,
    mother:   `A plump golden-brown mother duck, a white bonnet with a yellow ribbon, warm and practical eyes, a reassuring and capable manner.`,
    swans:    `Graceful white swans with long arching necks, black-tipped orange beaks, calm dark eyes. They move through water with effortless slow grace.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'ugly-duckling',
    title:    { en: 'The Ugly Duckling' },
    subtitle: 'after Hans Christian Andersen',

    // Library presentation
    skin:    'classic',
    leather: 'navy',
    board:   'sky',
    color:   '#5390d9',

    // Reading metadata
    wordCount:   497,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['duck', 'swan'],
    coverAnimal: 'duck',

    // Unlock requirement
    requirements: [
      { animalId: 'duck', minCount: 3, label: 'Complete Duck 3×' },
      { animalId: 'swan', minCount: 1, label: 'Find the Swan'   }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/duck.svg',
      imageAlt: 'A large grey duckling sitting alone at the edge of a river bank, head slightly bowed, while small golden ducklings swim happily past.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.duckling} sits at the edge of a river bank, slightly apart. Three small fluffy golden ducklings swim past in the water below, cheerful and oblivious. The grey duckling watches them with gentle sad eyes. Reeds and river flowers frame the scene.`,
        composition: `Wide portrait. The grey duckling is on the bank at the left, the golden ducklings are in the water to the right. The bank curves away behind. Eye lands first on the alone, larger figure and then travels to the golden group.`,
        light:       `Warm summer morning light on the river. The golden ducklings shimmer in the water. The grey duckling is in softer, shadowed light — separate from the brightness.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In a warm nest beside a winding river, a mother duck waited for her eggs to hatch. One by one the shells cracked and out tumbled soft golden ducklings, cheeping and blinking in the summer light. But the last egg was much larger than the others, and when it finally broke, out came a grey, long-necked creature who looked nothing like the rest.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A mother duck in a white bonnet at a river-bank nest, surrounded by small golden ducklings, with one large grey duckling among them.',
        imagePrompt: prompt({
          scene:       `${CAST.mother} at her nest by the river, surrounded by four small golden ducklings who are cheeping and shaking their wings. Beside them sits ${CAST.duckling} — visibly larger, grey-brown, long-necked, looking around with wide, quiet eyes. The mother looks at him with a loving but puzzled expression.`,
          composition: `Close mid shot, level with the nest. The mother fills the left. The golden ducklings are a cluster of movement. The grey duckling is to the right, slightly separated by space.`,
          light:       `Warm summer morning light on the river bank. The golden ducklings catch the light brightly. The grey duckling is in the same light but somehow slightly apart from it.`
        })
      },

      {
        id: 2,
        text: { en: `The other animals on the farm looked at the grey duckling and shook their heads. The ducks splashed away from him in the pond. The hens clucked sharply. Even the farmer's dog barked once and turned away. The grey duckling stood at the edge of the pond and watched them all, and said nothing.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling standing alone at the edge of a pond, other ducks swimming away, looking quietly sad.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} stands at the muddy edge of a farm pond, watching. In the water, other ducks swim deliberately away from him, beaks turned. On the bank, two hens watch with their heads tilted. The grey duckling's posture is quiet and dignified, not cringing.`,
          composition: `Mid shot from behind and slightly to the side of the grey duckling. He looks out across the pond where others have moved away. The loneliness is spatial — created by the empty water between him and them.`,
          light:       `Flat, even farmyard light. No drama, just the ordinary unkindness of an ordinary day.`
        })
      },

      {
        id: 3,
        text: { en: `His mother tried her best, but the grey duckling was different and everyone could see it. He was bigger and he swam differently, not bobbing neatly but cutting through the water in a long, quiet way. The other ducklings did not like it. They kept to their own side of the pond.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling swimming alone on one side of a pond, golden ducklings clustered on the other side, mother duck watching with a worried expression.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} swimming across a pond, cutting cleanly through the water in a long glide, his long neck stretched forward. On the far side, the golden ducklings bob in a tight group. ${CAST.mother} watches from the bank, her expression a mixture of love and worry. The distance between the grey duckling and the others is visible.`,
          composition: `Wide shot across the pond. The grey duckling is mid-water, alone. The golden cluster is on the far bank. The mother is on the near bank. The pond water is the whole middle of the image.`,
          light:       `Soft morning light on the water. The grey duckling's wake is a clean line. The golden ducklings reflect warmly.`
        })
      },

      {
        id: 4,
        text: { en: `One morning before the farm was awake, the grey duckling slipped away. He did not know where he was going. He only knew he was tired of the sideways looks and the sharp words. He followed the river as the mist rose, alone in the wide, quiet morning.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling walking alone along a misty river bank at dawn, the farm small and distant behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} walking alone along a misty river bank at early morning. The farm is small and fading in the mist behind him. He does not look back. His path leads into the wide, open country ahead. Reeds and morning mist on either side.`,
          composition: `Wide shot from behind the duckling. He is small in the lower centre, the misty river stretching ahead. The receding farm is behind and above. A sense of the whole world opening up.`,
          light:       `Very early morning light, blue and grey. The mist diffuses everything. A thin warm line at the horizon suggests dawn is coming.`
        })
      },

      {
        id: 5,
        text: { en: `He spent the autumn in a grey marsh, alone except for the wild ducks who barely noticed him. The world grew cold and the reeds turned brown. He sheltered under a frozen bank as the first snow fell, curled small against the ice, waiting for the world to change.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling huddled alone in the reeds of a frozen marsh, snow falling softly around him.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} huddled in the rushes at the edge of a marsh, snow falling softly around him. The marsh is grey and frozen, the reeds brown and brittle. He is curled as small as he can be, his long neck tucked down. The world around him is still and cold. Snowflakes rest on his back.`,
          composition: `Close mid shot. The duckling is in the lower centre, framed by frozen reeds. The falling snow fills the air. The marsh stretches cold and empty behind. A still, enduring image.`,
          light:       `Cold winter grey. No warmth in the light. The only softness is the falling snowflakes.`
        })
      },

      {
        id: 6,
        text: { en: `Winter was long and very cold. Frost settled each night and the river ran dark and fast. The grey duckling kept himself alive, finding seeds at the water's edge, moving a little each day, growing quietly through the long dark months without knowing he was growing at all.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling walking alone along a dark winter river bank, frost on the ground, bare trees above.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} walking slowly along the edge of a dark winter river. Frost patterns the mud. Bare trees rise on the far bank. He is alone but not entirely broken — there is something in his posture that holds. He is larger than he was. Ice floats on the river.`,
          composition: `Wide side-on shot. The duckling is in the lower left, moving slowly right along the river edge. The dark river takes the middle. The bare trees on the far bank frame the right. A cold, enduring image.`,
          light:       `Flat grey winter light. Cold and still. A hint of slightly warmer grey at the top of the sky — the long winter is not quite endless.`
        })
      },

      {
        id: 7,
        text: { en: `Then one morning the ice cracked and the river ran clear, and the first green shoots pushed up through the mud. Spring arrived overnight, warm and sudden, filling the air with returning birds. The grey duckling stretched out his wings and found they had grown very large indeed.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A grey duckling stretching wide wings beside a river bank, green shoots around him, spring sunlight on the water.',
        imagePrompt: prompt({
          scene:       `${CAST.duckling} standing on a river bank, wings spread wide, discovering their span for the first time. The wings are large and powerful, edged with white. Around him the first green shoots push through the mud. The river runs clear and bright. Birds fly across the sky above. His expression is surprised and wondering.`,
          composition: `Mid shot, full width. The spread wings fill the frame. The duckling's face is the centre of the image, lit with surprise. The green of the first spring is below.`,
          light:       `First spring morning light, warm and clear after the long winter. The wings catch the light — they are beginning to show white at the edges.`
        })
      },

      {
        id: 8,
        text: { en: `He followed the sound of other birds to a wide, still lake where the water reflected the sky like a mirror. Around the lake he saw the most graceful creatures he had ever seen, great white birds moving in silence, their long necks curved like questions. They were swans.` },
        image:    'assets/images/cartoon/swan.svg',
        imageAlt: 'Three graceful white swans on a still lake, their long necks reflected in the water, a grey figure approaching from the reeds.',
        imagePrompt: prompt({
          scene:       `A wide still lake. ${CAST.swans} move slowly across the centre of the water, their white reflected perfectly in the mirror surface. At the edge of the reeds, ${CAST.duckling} watches them, partially hidden. His expression is wonder and a long-held longing.`,
          composition: `Wide shot across the lake. The swans are in the middle distance, centred, perfectly reflected. The duckling is in the reeds at the edge of the frame. The lake surface takes up the lower half — a vast mirror of sky and white birds.`,
          light:       `Clear spring afternoon light on still water. The swans are brilliantly white. The light is generous and open.`
        })
      },

      {
        id: 9,
        text: { en: `He swam toward them, bracing himself to be turned away as always. But as he drew near, one swan stretched out her long neck and touched her beak gently to his forehead. The others moved toward him on the still water, unhurried and welcoming, as if they had been waiting.` },
        image:    'assets/images/cartoon/swan.svg',
        imageAlt: 'A swan leaning forward to touch a grey duckling\'s forehead with her beak, the still lake reflecting them both.',
        imagePrompt: prompt({
          scene:       `One of ${CAST.swans} leans her long neck forward and touches her beak very gently to ${CAST.duckling}'s forehead. He is still, eyes half-closed, receiving this. The other swans drift forward on either side. The water is perfectly still. A moment of profound quiet recognition.`,
          composition: `Close mid shot on the water. The swan's long neck fills the upper left. The duckling is at the centre-right. The reflection of the swan's white curves in the dark water below. An intimate, tender image.`,
          light:       `Soft, warm afternoon light. The swan is luminous. The grey duckling is lit by proximity to the white.`
        })
      },

      {
        id: 10,
        text: { en: `He looked down at the surface of the lake. He did not see the grey duckling he had always known. He saw a long white neck. He saw broad white wings. He saw a swan's calm dark eye looking back at him from the water. He was very still for a long moment.` },
        image:    'assets/images/cartoon/swan.svg',
        imageAlt: 'A young swan looking down at his own reflection in still water, seeing a white swan looking back at him for the first time.',
        imagePrompt: prompt({
          scene:       `A young white swan looks down at his own reflection in the perfectly still lake. The reflection is clear and complete: a graceful white swan with a long curving neck. His expression is one of very quiet, very deep surprise. One of the other ${CAST.swans} is visible at the edge of the frame, watching gently.`,
          composition: `Close shot, from the side. The swan's head and neck are in the upper half of the frame, bent down. The reflection fills the lower half. The two — real and reflected — are the whole image.`,
          light:       `Still, clear afternoon light. The water is a mirror. The white of the swan's feathers and neck gleam in the reflection.`
        })
      },

      {
        id: 11,
        text: { en: `The swans moved around him on the still lake, and for the first time in his life he did not feel out of place. He felt, in the most simple and quiet way, exactly right. He spread his great white wings to the morning light, and the whole lake shimmered around him.` },
        image:    'assets/images/cartoon/swan.svg',
        imageAlt: 'A young white swan with wings spread wide on a still lake, sunlight on white feathers, other swans around him.',
        imagePrompt: prompt({
          scene:       `${CAST.swans} and the newly discovered young swan on the lake together. The young swan has his great wings half-spread, white and luminous. The others move around him in a loose, welcoming circle. His face is raised, expression open and calm. The lake reflects everything in pale gold.`,
          composition: `Wide shot across the lake. The young swan is central, wings spread. The other swans are around him, framing. The lake surface mirrors everything below. A generous, radiant image.`,
          light:       `Golden late-afternoon light across the still water. The white wings catch and scatter the light. Everything is open and warm.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `He had not become something other than himself. He had simply grown, at last, into exactly what he had always been and always would be.` },
      image:    'assets/images/cartoon/swan.svg',
      imageAlt: 'A single swan feather floating on perfectly still water, reflected beneath it, surrounded by the pale gold of late afternoon.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. A single large white swan feather rests on the surface of the still lake, perfectly reflected in the water below. A few water lily pads float nearby. The late sun has turned the water pale gold. No characters present. A still, complete image.`,
        composition: `Close shot on the water surface. The feather is central, the reflection directly below it. The lily pads are soft accents. The gold of the water fills the rest of the frame. A finished, peaceful feeling.`,
        light:       `Very late afternoon light, the water turning gold. The feather is white against the gold. Quiet and complete.`
      })
    }

  }));

})(window.APP);

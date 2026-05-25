// ─── Three Billy Goats Gruff ──────────────────────────────────────────────────
//
// A Norwegian fairy tale retold in lyrical prose for young children.
// 11 paragraphs · ~488 words · 4½ min read-aloud at toddler pace.
// Moral: working together, even the small can help the large triumph.
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
    little: `Small white goat, a light tin bell on a cord around the neck, neat small curved horns, bright curious eyes, steps lightly.`,
    middle: `Medium tan-brown goat, a braided leather collar, stocky and steady, calm expression, firm footing.`,
    great:  `Very large grey goat, great sweeping curved horns, heavy sure hooves, a slow and deliberate manner, kind amber eyes in a broad face.`,
    troll:  `A squat lumpy troll, mossy grey-green skin, enormous pale eyes like lamps, a great warty nose, wearing nothing but river weed and shadows, crouched under the bridge.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'three-billy-goats',
    title:    { en: 'Three Billy Goats Gruff' },
    subtitle: 'a Norwegian fairy tale, retold',

    // Library presentation
    skin:    'classic',
    leather: 'tan',
    board:   'sage',
    color:   '#2dc653',

    // Reading metadata
    wordCount:   488,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['goat'],
    coverAnimal: 'goat',

    // Unlock requirement
    requirements: [
      { animalId: 'goat', minCount: 3, label: 'Complete Goat 3×' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/goat.svg',
      imageAlt: 'Three billy goats of different sizes looking longingly across a wooden bridge toward a lush green meadow on the far side of a rushing river.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.little}, ${CAST.middle}, and ${CAST.great} stand side by side on a dry hillside, looking across a wooden bridge over a rushing river toward a lush green meadow beyond. The bridge is narrow and the meadow looks extraordinarily inviting. The troll is not visible yet.`,
        composition: `Wide portrait. The three goats are on the near hillside, left, in size order. The bridge is central. The lush green meadow is on the right and behind. The rushing river divides the two worlds.`,
        light:       `Warm late-afternoon light. The far meadow glows green and gold. The near hillside is drier and more muted.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `On one side of a wide rushing river there was a dry hillside, thin from the long summer. On the other side lay the most wonderful meadow in the world, thick with sweet green grass and white clover, golden in the afternoon light. Three billy goats stood and gazed at it every single day.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Three goats of different sizes standing on a dry hillside, gazing across a rushing river toward a lush green meadow.',
        imagePrompt: prompt({
          scene:       `${CAST.little}, ${CAST.middle}, and ${CAST.great} stand in a row on a dry grassy hillside, all three gazing toward the river and the green meadow beyond. The hillside grass is thin and yellow. Across the river the meadow is extravagantly green. The wooden bridge is visible in the middle distance.`,
          composition: `Wide establishing shot. The dry hillside in the foreground, the three goats in size order left to right. The river cuts across the middle. The lush meadow is in the background, bright.`,
          light:       `Golden afternoon light. The meadow beyond is warmer and more inviting than the hillside. The bridge is in slight shadow.`
        })
      },

      {
        id: 2,
        text: { en: `Between the two sides ran the river, cold and fast, and over the river there was only one bridge. Under that bridge, crouched in the cool shadow below the planks, lived a troll with enormous pale eyes, a great warty nose, and a roaring voice that shook the wood above him.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A view of a wooden bridge over a rushing river, with the dim shape of a huge-eyed troll visible in the dark shadow beneath it.',
        imagePrompt: prompt({
          scene:       `A wooden plank bridge over a rushing river. Viewed from the side, the bridge looks ordinary enough from above — but in the dark shadow beneath it, ${CAST.troll} crouches, his enormous lamp-like eyes just visible in the dimness, one warty hand on a bridge support. The water rushes around the bridge posts.`,
          composition: `Mid shot from the river bank, looking at the bridge side-on. The bridge takes the upper half of the frame. The shadow below is deep. The troll's eyes are the only bright points in the darkness.`,
          light:       `The bridge is lit from above by afternoon sun. The shadow beneath is very dark by contrast. The troll's eyes glow faintly.`
        })
      },

      {
        id: 3,
        text: { en: `Little Billy Goat Gruff decided to go first. Trip-trap, trip-trap went the bridge under his light hooves and his little bell rang with each step. Up from the shadow came the troll's voice, loud as a river in flood: "Who's that trip-trapping over my bridge?"` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A small white goat picking his way across a wooden bridge, bell ringing, while beneath the bridge huge eyes glow in the shadow.',
        imagePrompt: prompt({
          scene:       `${CAST.little} midway across the bridge, each small hoof placed carefully. His bell is lifted mid-ring. His ears are perked forward, alert. Below the bridge, the glow of ${CAST.troll}'s enormous eyes is just visible in the darkness. The river rushes on both sides of the goat's small hooves.`,
          composition: `Mid shot from the side, eye level with the bridge planks. The small goat is central, the planks stretching away on either side. The troll's eyes are a faint glow below the lower edge of the frame.`,
          light:       `Afternoon sun on the bridge, the goat well-lit and clear. The shadow below is distinctly darker and threatening.`
        })
      },

      {
        id: 4,
        text: { en: `Little Billy Goat's bell trembled but his voice was steady. "It is only I, Little Billy Goat. I am going to eat the sweet green grass." The troll announced that he would eat the goat up. Little Billy Goat thought quickly. "Wait for my brother behind me. He is much bigger."` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A small goat looking down through the bridge planks, speaking bravely to a pair of huge eyes below.',
        imagePrompt: prompt({
          scene:       `${CAST.little} looks down through a gap in the bridge planks, speaking with surprising composure to the troll below. The troll's enormous eyes are angled upward, calculating. The little goat's bell hangs still. His small horns are up, his chin firm.`,
          composition: `Close shot from below the bridge looking up. The goat's face and the plank gap are in the centre. The troll is partially visible below. Eye moves from the goat's small determined face down to the troll's enormous calculating eyes.`,
          light:       `The goat is in full sunlight from above. The troll is in deep shadow below. The contrast is stark.`
        })
      },

      {
        id: 5,
        text: { en: `Middle Billy Goat Gruff was next. Trip-trap, trip-TRAP went the bridge, louder now. The troll roared again. "Only me, Middle Billy Goat," said he, steadily. "But my great big brother is coming right behind me, and he is much, much bigger than I am." The troll waited again, grumbling.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A medium brown goat crossing the bridge steadily, the bridge vibrating under his weight, large troll eyes visible below.',
        imagePrompt: prompt({
          scene:       `${CAST.middle} crossing the bridge with steady, heavier steps, the bridge planks flexing slightly under him. His braided collar is visible. Below the bridge, the troll has risen slightly, his nose now just below the planks. The middle goat's expression is matter-of-fact and unafraid.`,
          composition: `Wide mid shot from the side. The bridge is fuller with the larger goat. His heavier presence makes the bridge look less steady. The troll below is more present than before.`,
          light:       `Still afternoon light, slightly cooler as the sun begins to move. The troll's silhouette under the bridge is larger and more defined.`
        })
      },

      {
        id: 6,
        text: { en: `Then came Great Big Billy Goat Gruff. TRIP-TRAP, TRIP-TRAP, TRIP-TRAP. The whole bridge shuddered. The planks groaned. The river rushed and churned below. The troll sprang up with a great shout, spreading both arms wide. Great Big Billy Goat looked down at him with calm amber eyes. "I am," he said.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A very large grey goat standing on a shaking bridge, facing a surprised troll who has leapt up below him, the river churning below.',
        imagePrompt: prompt({
          scene:       `${CAST.great} stands solidly on the bridge, the planks bowed under his weight, looking calmly down at ${CAST.troll} who has leapt up beside the bridge, arms spread, roaring. The great goat's curved horns are magnificent. His expression is unhurried and untroubled. The river churns below them.`,
          composition: `Wide dramatic shot. The great goat fills the upper part of the frame, solid and immovable. The troll is below and to the side, all drama and loud presence. The churning river is below. Eye reads the contrast in size and composure.`,
          light:       `The afternoon light catches the great goat's grey flanks, making him look very solid indeed. The troll is partly in shadow.`
        })
      },

      {
        id: 7,
        text: { en: `The great goat lowered his magnificent horns and charged. With one sweep he tossed the troll high into the air. The troll sailed out over the river in a wide, startled arc, hit the water with an enormous splash, and was carried away downstream, tumbling and spluttering, until he was gone.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A great grey goat on the bridge with head lowered, the troll flying through the air above the river in a surprised arc.',
        imagePrompt: prompt({
          scene:       `${CAST.great} on the bridge, head lowered after the charge, horns swept forward. ${CAST.troll} is airborne above the river, limbs splayed, expression one of complete astonishment. Below, the river waits. The scene is more comic than frightening.`,
          composition: `Wide dramatic shot. The goat is on the bridge left, solid and settled after the charge. The troll is the central figure in the air — small against the sky — above the rushing river below. Eye reads the arc of flight.`,
          light:       `Full afternoon light. The troll in the air is well-lit and clearly seen. The river below catches the light in a churning, welcoming way.`
        })
      },

      {
        id: 8,
        text: { en: `The troll was never seen near that bridge again. Great Big Billy Goat crossed to the far meadow where his two brothers were already nose-deep in the sweet grass, tails wagging. He found the very best patch of all, right in the sunny middle, and settled in with great satisfaction.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Three goats of different sizes grazing contentedly in a lush green meadow, tails wagging, the bridge just visible in the background.',
        imagePrompt: prompt({
          scene:       `${CAST.little}, ${CAST.middle}, and ${CAST.great} all grazing in the lush green meadow. Little Billy Goat is near the edge, his bell resting still. Middle Billy Goat munches steadily. Great Big Billy Goat has found the very best patch of all and has his broad head down in the deepest grass. All three tails wag gently. The bridge is visible in the far background.`,
          composition: `Wide shot of the meadow. The three goats spread across the lower half of the frame at different points. The meadow is full of grass and clover. The bridge is small in the background. A generous, satisfied scene.`,
          light:       `Warm golden afternoon light on the meadow. The grass glows. The three goats are content shapes against the green.`
        })
      },

      {
        id: 9,
        text: { en: `They grazed all afternoon as the bees hummed and the river rushed below. Middle Billy Goat ate until his sides were round as a barrel. Little Billy Goat ran and leapt and rolled in the clover. Great Big Billy Goat ate the most of all, slowly and with great thoroughness.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Little Billy Goat leaping joyfully in a clover meadow, Middle Billy Goat round and contented beside him, Great Billy Goat still eating methodically.',
        imagePrompt: prompt({
          scene:       `${CAST.little} is mid-leap in the clover, all four hooves off the ground, bell ringing. ${CAST.middle} stands nearby, visibly rounder, looking pleased. ${CAST.great} is in the background, still steadily eating, head down. Clover and grass everywhere. Bees are visible as small dots.`,
          composition: `Wide mid shot. Little Billy Goat is the energetic focal point in the centre, airborne. Middle is a round satisfied presence left. Great is still and large in the background right.`,
          light:       `Long afternoon sun, warm and golden. The leaping goat is caught in mid-air against the meadow light.`
        })
      },

      {
        id: 10,
        text: { en: `As the sky turned pink and the river turned gold, they walked back across the bridge together. TRIP-TRAP, trip-TRAP, trip-trap went their three sets of hooves on the planks. There was nothing under the bridge but the sound of the river and the last light on the water.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Three goats crossing a bridge together at sunset, the river below them turning gold, no troll in sight.',
        imagePrompt: prompt({
          scene:       `${CAST.great}, ${CAST.middle}, and ${CAST.little} crossing the bridge together at sunset, walking in single file. Great Billy Goat leads, the bridge solid under his broad hooves. Below the bridge, only the river is visible in the fading light — the shadow beneath is empty. The sky is pink and amber behind them.`,
          composition: `Wide side-on shot. The three goats in single file across the bridge, Great leading. The river below is visible, catching the last light. The empty shadow under the bridge is prominent and clearly unoccupied.`,
          light:       `Sunset light, pink and warm. The river turns gold. The bridge planks are amber. The empty shadow below is cool blue-grey.`
        })
      },

      {
        id: 11,
        text: { en: `That evening the three brothers settled together on the warm hillside, their stomachs full and the night coming in gently around them. Little Billy Goat's bell made one last quiet note. The stars came out one by one above the river, and everything was exactly as it should be.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Three goats of different sizes resting together on a hillside in the evening light, the river and bridge below them in the twilight.',
        imagePrompt: prompt({
          scene:       `${CAST.great}, ${CAST.middle}, and ${CAST.little} resting together on the hillside in the blue evening light, three shapes of different sizes settled companionably together. The river is just visible below, and the bridge. The first stars are appearing in the sky above. Little Billy Goat's bell is still.`,
          composition: `Wide quiet shot. The three goats are together in the lower half of the frame, the hillside behind them, the darkening sky above. The bridge and river are small below. A still, companionable, complete scene.`,
          light:       `Blue evening light, soft and cool. The first stars are bright. The river below still catches a thin line of the last daylight.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `After that the three brothers crossed the bridge every morning without a care in the world, and the meadow always tasted every bit as sweet as it had looked.` },
      image:    'assets/images/cartoon/goat.svg',
      imageAlt: 'A close view of a wooden bridge over a rushing river in morning light, empty of all but sunlight, the lush meadow visible beyond.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The wooden bridge in morning light, viewed straight on from the near bank. The planks are warm in the early sun. The river runs clear below. The lush meadow is just visible beyond the far end of the bridge. The shadow under the bridge is empty and light. No characters present.`,
        composition: `Portrait shot facing the bridge from the near bank. The bridge is central, framed by the river on both sides. The meadow glows invitingly beyond. The empty shadow below is clearly, peacefully unoccupied.`,
        light:       `Fresh morning light, clean and clear. The bridge planks are warm. The meadow beyond is bright green.`
      })
    }

  }));

})(window.APP);

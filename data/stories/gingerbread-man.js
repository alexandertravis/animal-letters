// ─── The Gingerbread Man ──────────────────────────────────────────────────────
//
// A traditional cumulative chase story retold for young children. Lyrical prose.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Moral: running away from everything catches up with you sooner or later.
// (Child-friendly ending: the gingerbread man finds his way back to where he belongs.)
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
    gbm:  `The Gingerbread Man: a small, sprightly gingerbread figure with currant eyes and a candy-button smile, iced zigzag trim across his chest, two candy-button arms, small iced boots. He runs with tremendous energy and self-confidence.`,
    cow:  `A gentle dun-coloured cow in a large white apron, always carrying a milk pail or a bundle of hay, slow-moving and good-natured.`,
    pig:  `A round rosy pig in a faded pink smock, trotting with short, earnest steps, always slightly out of breath.`,
    cat:  `A slim tortoiseshell cat in a green striped waistcoat, long and fluid in motion, very interested in anything that moves quickly.`,
    dog:  `A shaggy amber dog in blue dungarees, bounding with enthusiasm, great floppy ears flying.`,
    fox:  `A slim russet fox in a honey-coloured coat and a soft felt hat, clever, quick-eyed, and completely still when thinking.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'gingerbread-man',
    title:    { en: 'The Gingerbread Man' },
    subtitle: 'a traditional tale, retold',

    // Library presentation
    skin:    'classic',
    leather: 'amber',
    board:   null,
    color:   '#8a6010',

    // Reading metadata
    wordCount:   501,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['pig', 'cat', 'dog', 'fox', 'cow'],
    coverAnimal: 'fox',

    // Unlock requirement
    requirements: [
      { animalId: 'fox', minCount: 1, label: 'Find the Fox' },
      { animalId: 'dog', minCount: 1, label: 'Find the Dog' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/fox.svg',
      imageAlt: 'A small gingerbread man running along a country lane, a crowd of animals chasing behind him.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.gbm} running at full speed along a winding country lane, arms pumping, currant eyes wide with delight. Behind him, at various distances, ${CAST.cow}, ${CAST.pig}, ${CAST.cat}, and ${CAST.dog} all in pursuit, a comedy of different sizes and running styles. In the foreground, watching from beside the lane, ${CAST.fox} stands perfectly still with a knowing expression.`,
        composition: `Wide shot, the lane receding into the background. The gingerbread man is centre-left and closest. The chasing animals trail behind in a ragged, energetic line. The fox is in the right foreground, watching. Eye drawn first to the gingerbread man's joyful sprint, then to the fox's stillness.`,
        light:       `Bright, breezy afternoon sun from the left, the lane golden, everything warm and comic in tone.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `One autumn morning, in a warm kitchen that smelled of spice and butter, a baker took a tray from the oven. There he was: a gingerbread man, brown and perfect, with currant eyes and a smile made of white icing and a row of candy buttons down his chest. He was quite wonderful.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'A perfect gingerbread man on a baking tray on a warm kitchen table.',
        imagePrompt: prompt({
          scene:       `A kitchen table seen from just above, a warm baking tray in the centre. ${CAST.gbm} lies on the tray, freshly baked, steam still rising gently. The kitchen around him is warm and amber with oven heat. Jars of spice and a rolling pin on the table. He looks perfect and pleased with himself even lying flat.`,
          composition: `Top-down close shot. The gingerbread man is the centred focal point on the tray. The kitchen elements around him provide context. Eye goes immediately to his currant-eyed smile.`,
          light:       `Warm oven-glow amber light, the tray still hot, soft steam catching the light above the figure.`
        })
      },

      {
        id: 2,
        text: { en: `The baker set him on the sill to cool. The gingerbread man looked out at the world, at the lane and the field and the wide blue sky, and something in his candy-button heart said: run. So he jumped off the sill, landed on his iced boots, and ran.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'A gingerbread man jumping from a windowsill, arms wide, the lane and fields ahead of him.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} mid-leap from a stone windowsill, arms flung wide, iced boots pointed downward, currant eyes bright with excitement. Below him the country lane stretches away between hedgerows and fields. The kitchen window is behind him, the wide world ahead. He has never run before and is utterly delighted.`,
          composition: `Dynamic mid shot. The gingerbread man caught at the apex of his leap, the windowsill behind, the lane below and ahead. Eye drawn to the joyful, airborne figure.`,
          light:       `Bright morning light, the lane sunny and inviting, the window behind warm. A contrast of inside warmth and outside brightness that makes the freedom feel thrilling.`
        })
      },

      {
        id: 3,
        text: { en: `The baker ran after him. "Stop! Come back!" But the gingerbread man laughed and ran faster. He passed a cow by the gate. "Stop, little gingerbread man!" called the cow. "Run, run, as fast as you can," he sang back. "You can't catch me, I'm the gingerbread man!"` },
        image:    'assets/images/cartoon/cow.svg',
        imageAlt: 'A gingerbread man sprinting past an astonished cow at a farm gate.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} running at full tilt past a farm gate where ${CAST.cow} stands with a milk pail, looking startled. The gingerbread man is mid-stride, one arm pointing forward, his candy-button smile enormous. The cow reaches out one large hoof toward him, too surprised to give proper chase.`,
          composition: `Side-on mid shot, the lane crossing the frame left to right. The gingerbread man is left and moving right, the cow is right and stationary. Speed versus stillness. Eye follows the gingerbread man.`,
          light:       `Clear morning sun from the left, the lane warm and bright, a cloud-specked blue sky above.`
        })
      },

      {
        id: 4,
        text: { en: `He passed a pig in the lane. "Stop, little gingerbread man, I could eat you all up!" "Run, run, as fast as you can," he sang. "You can't catch me, I'm the gingerbread man!" The pig trotted after him for three steps, then stopped, quite out of breath already.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'A gingerbread man running away from a rosy pig who has given up the chase after a few steps.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} far ahead on the lane, tiny in the distance and still sprinting. In the foreground, ${CAST.pig} stands bent forward, both trotters on her knees, breathing hard. She has clearly tried and very much failed. Her expression is more rueful than cross. The cow is a small figure further back down the lane.`,
          composition: `Wide shot with depth. The pig large and still in the foreground, the gingerbread man small and fast in the background. A comic contrast of scale and speed. Eye drawn to the pig's defeated posture, then to the tiny distant runner.`,
          light:       `Mid-morning sun, warm and clear.`
        })
      },

      {
        id: 5,
        text: { en: `He passed a cat on a wall, and a dog by a haystack, and they all called "Stop!" and they all ran, and he sang his song to every one of them and left them all behind. He ran so fast the world blurred into a green and golden streak on either side.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A gingerbread man running along a lane with a cat and a dog both bounding behind him at various distances.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} centre-lane at full sprint, ${CAST.cat} leaping from a wall just behind him, ${CAST.dog} bounding farther behind still. The gingerbread man has his arms raised triumphantly, his currant eyes bright. The cat is aerially graceful but losing ground; the dog is enthusiastic but even further behind.`,
          composition: `Side-on wide shot, all three figures in motion across the frame. The gingerbread man leads, the cat is close second, the dog further back. A sense of comic, energetic chase. Eye moves through them in sequence.`,
          light:       `Bright midday sun from directly above, the lane bleached warm, everything fast and clear.`
        })
      },

      {
        id: 6,
        text: { en: `The lane curved down to a wide, flat river. The gingerbread man stopped at the bank. The water was brown and smooth and he could not swim. He looked back down the lane. He could hear the dog barking and the pig puffing, coming closer. He needed to cross.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The gingerbread man standing at the edge of a wide brown river, looking worried.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} standing at the river bank, looking down at the wide, smooth brown water. His arms hang at his sides, his currant eyes troubled. The river blocks his way entirely. Behind him, just rounding the curve of the lane, the distant shapes of ${CAST.cat} and ${CAST.dog} can be seen approaching.`,
          composition: `Mid shot. The gingerbread man stands at the centre, the river takes the lower half of the frame. The lane curves behind him, the approaching animals are small but visible. The water feels like an obstacle, a pause in the story.`,
          light:       `The light is somewhat cooler here by the river, the sky reflected in the water, a quieter, more uncertain mood than the bright chase.`
        })
      },

      {
        id: 7,
        text: { en: `"Good afternoon," said a quiet voice. There on the bank sat a fox in a honey-coloured coat, watching him with bright, patient eyes. "I know this river well," said the fox. "If you sit on my tail, I can carry you across." The gingerbread man thought about it for exactly one second. "Very well," he said.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A slim russet fox sitting very still by the river, talking to the gingerbread man with a polite expression.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} seated calmly on the river bank, one paw resting on his knee, looking at ${CAST.gbm} with an expression of easy politeness. The gingerbread man stands before him, slightly uncertain for the first time. The fox's felt hat is tilted at a comfortable angle. The river glitters behind them.`,
          composition: `Close mid shot. The two characters face each other, the river behind. The fox is still and composed; the gingerbread man is small and slightly unsure. Eye moves between the two faces.`,
          light:       `Warm afternoon light from the right catching the fox's russet coat and the gingerbread man's brown surface. Bright river reflections behind them.`
        })
      },

      {
        id: 8,
        text: { en: `The fox waded in and the gingerbread man sat on his tail. The river was cool and the current was slow. "You are getting wet there," said the fox kindly. "Better climb to my back." The gingerbread man moved to the fox's back. The fox kept walking. The gingerbread man watched the water.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The fox swimming calmly across a river with the small gingerbread man perched on his back.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} swimming smoothly across the wide brown river, head up, russet coat half-submerged. ${CAST.gbm} is perched on the fox's back, above the waterline, looking at the water around them with wide currant eyes. The far bank is visible ahead. The fox's expression is calm and focused.`,
          composition: `Side-on wide shot, fox and gingerbread man crossing the frame from right to left. The water fills the lower two-thirds of the frame. A sense of crossing, of the middle of something.`,
          light:       `Soft afternoon light on the water, the far bank ahead slightly brighter, suggesting a destination.`
        })
      },

      {
        id: 9,
        text: { en: `"Better climb to my nose," said the fox, "you will be safer." And the gingerbread man, who had not thought for a single moment that the fox might be cleverer than him, climbed to the fox's nose. The fox lifted his muzzle very slightly. The gingerbread man wobbled. Then with a soft plop, he fell into the river.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The gingerbread man tumbling off the fox\'s nose into the river, about to land in the water.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} falling sideways off ${CAST.fox}'s upturned muzzle, arms flailing, currant eyes round with surprise. The fox's expression is sheepish and immediately regretful. The river water is below. The gingerbread man has not yet hit the surface.`,
          composition: `Close dynamic shot. The fox's muzzle is in the left foreground, the gingerbread man tumbling through the centre of the frame, the water below. Eye follows the falling figure.`,
          light:       `The light is on the water surface, bright and splintered, the gingerbread man falling toward it. A clear, comic moment.`
        })
      },

      {
        id: 10,
        text: { en: `He landed on a large lily pad. It held him. He sat very still, wet and surprised, listening to the water and the wind and the distant sound of his chasers who had arrived at the bank and stopped. The fox swam to the bank looking ashamed, which, for a fox, was quite something.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The gingerbread man sitting on a lily pad in the middle of the river, wet but safe, looking thoughtful.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} seated on a large round lily pad in the middle of the wide river, slightly soggy, his icing softened at the edges. His currant eyes are wide and contemplative. On the far bank the cat, dog, and pig have arrived and look at him. On the near bank, ${CAST.fox} has climbed out and sits with a distinctly embarrassed expression, his felt hat dripping.`,
          composition: `Wide river shot. The gingerbread man on the lily pad is centred. The animals are on the far bank to the right, the fox is on the near bank to the left. The gingerbread man is alone in the middle, literally at a crossroads.`,
          light:       `Soft late-afternoon light on the river, the lily pad catching a warm gleam, the water calm around it.`
        })
      },

      {
        id: 11,
        text: { en: `A breeze came up the river. The lily pad drifted. Slowly, gently, the current carried it around a bend, and there on the bank was the baker's cottage, and the baker's garden, and the open kitchen window that smelled of spice. The gingerbread man stepped off the lily pad and walked home. He had, he decided, run quite far enough.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The gingerbread man stepping off a lily pad onto a river bank, the baker\'s cottage and warm kitchen window visible ahead.',
        imagePrompt: prompt({
          scene:       `${CAST.gbm} stepping carefully off a lily pad onto a mossy river bank. Ahead of him, just up a short garden path, is the baker's stone cottage with a warm kitchen window glowing. The smell of baking is implied in the wisps of steam from the chimney. His expression has changed from triumph to something quieter and quite content.`,
          composition: `Wide mid shot. The gingerbread man is small left-of-centre, the cottage ahead right-of-centre, the river behind him. A sense of return, of a circle completed. Eye moves from the figure to the warm window ahead.`,
          light:       `Late afternoon golden light on the cottage, the window warm amber, the path inviting. The river behind is cooler, the cottage ahead is warm — home.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And that evening, the baker made six more gingerbread men and set them on the sill to cool. This time, they stayed put. They had heard the story.` },
      image:    'assets/images/cartoon/fox.svg',
      imageAlt: 'Six small gingerbread men cooling on a windowsill, all sitting very still.',
      imagePrompt: prompt({
        scene:       `A stone kitchen windowsill with six small gingerbread men cooling on a tray, all sitting neatly in a row with their currant eyes looking outward. Through the window behind them, the lane, the field, and the distant river are just visible in the golden evening light. None of them look tempted to move.`,
        composition: `Wide close shot of the windowsill from outside. The six figures are evenly spaced across the frame, the world behind them in soft focus. A quiet, funny, satisfying end image.`,
        light:       `Warm amber kitchen light from inside illuminating the gingerbread men from behind, the evening outside cool and golden.`
      })
    }

  }));

})(window.APP);

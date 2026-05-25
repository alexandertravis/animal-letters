// ─── The Little Red Hen ───────────────────────────────────────────────────────
//
// A traditional English folk tale retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: those who share in the work share in the reward.
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
    hen:  `The Little Red Hen: a small rust-red hen in a white flour-dusted apron and a pale yellow kerchief tied over her head. Bright, purposeful eyes and quick, capable wings-as-hands. Always busy, always cheerful.`,
    cat:  `The Cat: a long-limbed tabby cat in a green striped waistcoat, stretched out languidly wherever there is a patch of sunlight. An expression of supreme contentment and vague disinterest in anything resembling effort.`,
    dog:  `The Dog: a shaggy golden dog in a faded blue dungarees, usually sitting in a comfortable slouch with both ears flopped forward, a good-natured but thoroughly lazy expression.`,
    pig:  `The Pig: a round, rosy pig in a loose oatmeal linen shirt, invariably half-asleep wherever pigs can sleep, which is everywhere. Good-humoured but slow to move.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'little-red-hen',
    title:    { en: 'The Little Red Hen' },
    subtitle: 'a traditional tale, retold',

    // Library presentation
    skin:    'classic',
    leather: 'terracotta',
    board:   null,
    color:   '#8b3a2a',

    // Reading metadata
    wordCount:   492,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['hen', 'cat', 'dog', 'pig'],
    coverAnimal: 'hen',

    // Unlock requirement
    requirements: [
      { animalId: 'hen', minCount: 1, label: 'Find the Hen'  },
      { animalId: 'pig', minCount: 1, label: 'Find the Pig'  }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/hen.svg',
      imageAlt: 'A cheerful red hen in an apron holding a sheaf of golden wheat, a farmyard behind her.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.hen} stands in the centre of a sunny farmyard, holding a small sheaf of golden wheat stalks in her wing-hands. Behind her a low stone cottage with a warm kitchen window, a stack of firewood, and a well. In the corners of the scene ${CAST.cat} naps on a wall, ${CAST.dog} dozes in a doorway, and ${CAST.pig} leans against a gate, eyes half-closed.`,
        composition: `Wide establishing shot. The hen is bright and central, upright and busy. The other three animals are peripheral and horizontal, in relaxed contrast. Eye lands first on the hen and her wheat, then drifts to each lazy companion.`,
        light:       `Warm full afternoon sun from the upper right, the farmyard golden and generous, long soft shadows.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `On a warm farm at the edge of a barley field, there lived a little red hen. She lived with a cat, a dog, and a pig, who were all very kind in their hearts, but also very, very fond of doing absolutely nothing. The little red hen, on the other hand, was extremely fond of doing things.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'A busy red hen in an apron striding across a sunny farmyard while a cat, dog, and pig sleep nearby.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} striding purposefully across the farmyard, apron strings flying, kerchief on straight. In the background, ${CAST.cat} is draped over a sunny wall, ${CAST.dog} is curled in the cottage doorway, and ${CAST.pig} is slumped against a fence post, all three fast asleep. The hen is in busy, cheerful motion; the others are completely still.`,
          composition: `Wide establishing shot. The hen dominates the centre-left, moving with purpose. The sleeping animals are distributed around the background. The visual rhythm is: one busy, three still.`,
          light:       `Broad, warm summer sunlight filling the farmyard. No dramatic shadows, just the generous, sleepy warmth of a summer afternoon.`
        })
      },

      {
        id: 2,
        text: { en: `One morning she found some grains of wheat by the old stone wall. She looked at them with her bright eyes and had a good idea. "Who will help me plant this wheat?" she called. The cat opened one eye. The dog rolled over. The pig gave a comfortable snore.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen holding a handful of wheat grains, looking at three snoozing companions.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} standing by a low stone wall, a small handful of golden wheat grains cupped in her wing. She looks expectantly toward the background where ${CAST.cat} opens a single eye without lifting his head, ${CAST.dog} rolls to face the other way, and ${CAST.pig} produces a visible snore (small breath-cloud). The hen's expression is patient.`,
          composition: `Mid shot. The hen is right-of-centre foreground, the stone wall behind her. The three sleepy companions are loosely arranged in the middle distance. Eye travels from the wheat grains in the hen's wing to the non-reaction of the others.`,
          light:       `Morning light from the left, fresh and clear, falling on the hen and her grains. The others are in softer, sleepier shade.`
        })
      },

      {
        id: 3,
        text: { en: `"Not I," said the cat, and went back to sleep. "Not I," said the dog, and tucked his nose under his tail. "Not I," said the pig, who had not even fully woken up. "Very well," said the little red hen, "I shall plant it myself." And she did.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen planting wheat seeds in a tidy row, alone in the field, her companions visible and sleeping in the background.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} alone in the barley field, bent over a tidy furrow she has scraped in the earth, pressing wheat grains in one by one. Her apron is slightly dusty. Far in the background the cottage wall is just visible with three sleepy animal shapes arranged against it. The hen's expression is cheerful and intent.`,
          composition: `Mid-wide shot in the field. The hen is centred, bent to her work, the furrow line leading the eye forward. The distant cottage and sleeping animals give depth and contrast. The field is the hen's world right now.`,
          light:       `Bright mid-morning sun from above. The field is warm gold, the earth the hen works in is darker and cool. A productive, satisfying scene.`
        })
      },

      {
        id: 4,
        text: { en: `The wheat grew tall and green in the summer and turned golden in the autumn. The little red hen watched it every day with great satisfaction. "Who will help me cut the wheat?" she called. The cat stretched. The dog yawned. The pig shifted to a more comfortable position.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'Tall golden wheat standing in a field, the little red hen looking at it proudly.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} standing at the edge of her wheat field, now tall and heavy-headed and golden in the autumn sun. She looks at it with visible pride, wings folded behind her back. The field stretches away, ripe and beautiful. A few sparrows sit on the wheat heads. The farmyard with the other animals is just glimpsed behind the hedgerow.`,
          composition: `Wide mid shot. The hen is small left-of-centre, the tall wheat field sweeping away to the right. The scale of the field relative to the hen makes her success feel enormous. Eye drawn first to the bright golden wheat, then to the hen's proud stance.`,
          light:       `Rich, warm autumn afternoon light from the right, the wheat glowing amber-gold, the hen's red feathers warm against it.`
        })
      },

      {
        id: 5,
        text: { en: `"Not I," said the cat. "Not I," said the dog. "Not I," said the pig. "Very well," said the little red hen, and she fetched the small sickle from the barn and cut every golden stalk herself, tied them into bundles, and carried them to the threshing floor.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen cutting wheat with a small sickle, bundles of golden wheat around her.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} mid-field, wielding a small curved sickle, cutting a row of wheat. Several neat bundles of tied wheat are already stacked behind her. Her kerchief is slightly askew from the effort, her expression cheerful and determined. The remaining uncut wheat stretches before her.`,
          composition: `Mid shot. The hen is slightly left of centre, mid-action with the sickle raised. The tied bundles behind her show progress, the uncut field ahead shows work remaining. A dynamic, working image.`,
          light:       `Low golden autumn afternoon light, long shadows from the wheat bundles, the sickle catching a glint of sunlight.`
        })
      },

      {
        id: 6,
        text: { en: `"Who will help me take the wheat to the mill?" she called. "Not I," said the cat. "Not I," said the dog. "Not I," said the pig. So the little red hen loaded the wheat into her barrow, wheeled it all the way to the miller's, and came home with a fine sack of flour on her back.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen wheeling a barrow of wheat along a country lane toward a windmill.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} pushing a small wooden wheelbarrow piled with wheat bundles along a winding lane. A windmill is visible on the hill in the distance. The hedgerow lines the lane. Her expression is purposeful and cheerful. The lane stretches ahead, the mill beckons.`,
          composition: `Side-on mid shot. The hen and barrow move left to right across the frame, the lane receding behind and curving toward the windmill in the background. A sense of journey and purpose.`,
          light:       `Clear autumn light, slightly cooler than before, the windmill on the hill lit against a pale sky.`
        })
      },

      {
        id: 7,
        text: { en: `When she came home, the flour sack was heavy but the little red hen did not mind at all. She set it on the kitchen table, put on her clean apron, and began to mix and knead and shape the dough. The smell of yeast and warm bread began to drift through the cottage walls.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen kneading bread dough on a kitchen table, flour in the air.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} in her kitchen, both wing-hands deep in a large mound of bread dough on a flour-dusted table. A large flour sack sits open beside her. Earthenware bowls and a small jug are nearby. Flour floats in the warm air. Through the kitchen window, summer-green outside. Her expression is absorbed and happy.`,
          composition: `Interior mid shot. The hen is centred at the table, the kneading action dynamic. The table fills the lower frame. The window behind provides light and a sense of outside world she will shortly impress.`,
          light:       `Warm kitchen light from the window, flour dust catching in the shafts of light, a domestic, golden atmosphere.`
        })
      },

      {
        id: 8,
        text: { en: `"Who will help me bake the bread?" she called. "Not I," said the cat. "Not I," said the dog. "Not I," said the pig. So the little red hen put the loaves in the oven herself, and waited while the kitchen filled with the best smell in the whole world.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'Two golden loaves of bread on a kitchen windowsill cooling, the little red hen watching them proudly.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} lifting two golden loaves of bread out of a small stone oven onto a rack. Steam rises from the perfect crusts. The kitchen glows warm and amber. Her apron has fresh flour marks. Her expression is one of complete, quiet satisfaction. The smell is implied in every soft cloud of steam.`,
          composition: `Interior close-mid shot. The hen and the two loaves take the centre, the oven to her left, the steaming bread the clear focal point. Eye drawn immediately to the perfect golden loaves.`,
          light:       `Warm oven-glow from the left, general kitchen warmth from above. The steam from the loaves catches the light beautifully.`
        })
      },

      {
        id: 9,
        text: { en: `When the bread had cooled on the sill and the kitchen smelled of warm golden crusts, the little red hen called out one last time. "Who will help me eat the bread?" The cat sat up very straight. The dog came to attention. The pig arrived at a trot. "I will!" "I will!" "I will!"` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'Three animals looking eagerly at two golden loaves of bread, the cat, dog, and pig suddenly very alert.',
        imagePrompt: prompt({
          scene:       `${CAST.cat}, ${CAST.dog}, and ${CAST.pig} all crowded in the kitchen doorway looking with bright, eager eyes at the two golden loaves cooling on the windowsill. The cat is sitting upright and attentive for the first time, the dog's ears are pricked, the pig is jostling for position. All three look very, very interested.`,
          composition: `Interior mid shot. The three animals fill the doorway at the back, looking toward the loaves in the foreground. The bread is in sharp focus, the eager faces behind it equally readable. Eye moves from the bread to each face.`,
          light:       `The late afternoon kitchen light, warm and golden, falls on the bread and catches the three eager faces in the doorway.`
        })
      },

      {
        id: 10,
        text: { en: `The little red hen looked at the cat. She looked at the dog. She looked at the pig. She thought about who had planted the wheat, and cut it, and taken it to the mill, and kneaded the dough, and watched the oven. Then she looked at the bread. "No," she said. "I shall eat it myself."` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen with her wings crossed, looking calmly at her three companions, the bread behind her.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} standing with her wings crossed in front of the two loaves on the windowsill, looking calmly and pleasantly at the three animals in the doorway. Her expression is serene, not unkind. The cat, dog, and pig have deflated slightly. The bread is warm and golden behind her.`,
          composition: `Interior mid shot. The hen is centred, arms folded, bread behind her. The three animals are a soft, slightly drooping cluster in the background. Eye rests on the hen's calm, decisive face.`,
          light:       `Warm late kitchen light. The bread glows behind the hen, emphasising what is not about to be shared.`
        })
      },

      {
        id: 11,
        text: { en: `She called her six chicks in from the garden, and they sat around the kitchen table, and the little red hen sliced both loaves from end to end and spread each piece with fresh butter from the cool shelf. They ate every crumb. It was the best bread any of them had ever tasted.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little red hen and her six fluffy chicks sitting around a kitchen table eating fresh bread with butter.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} seated at the kitchen table with six small fluffy chicks around her, each with a generous slice of bread spread with pale butter. The hen is mid-bite, happy and relaxed. Crumbs are everywhere. The empty sill where the loaves cooled is visible behind them. The cat, dog, and pig are faintly visible looking in through the window from outside.`,
          composition: `Interior wide shot. The family at the table fills the frame warmly. The hen at the head, chicks around. The three outside animals are small in the window background, a gentle reminder of consequence without dwelling on it.`,
          light:       `Warm, low evening kitchen light. Candlelight on the table, the butter gleaming, the bread golden-brown. A cosy, complete scene.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The next morning, the cat and the dog and the pig were up bright and early. They wanted to be very, very helpful with whatever the little red hen had planned for today.` },
      image:    'assets/images/cartoon/hen.svg',
      imageAlt: 'An empty kitchen table with a few bread crumbs, a butter dish, and a flour-dusted apron hanging on a hook.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story kitchen vignette. The table holds only bread crumbs and a small butter dish scraped clean. A flour-dusted apron hangs neatly on a hook by the door. Through the window the morning is bright and fresh. On the windowsill, the bread rack is empty.`,
        composition: `Interior mid shot. The table and its few crumbs take the foreground, the apron on the hook is the warm accent detail. The bright window behind gives a sense of a new day beginning.`,
        light:       `Fresh morning sunlight through the window, cool and clear, new beginning energy after the warm lamplight of the night before.`
      })
    }

  }));

})(window.APP);

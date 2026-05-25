// ─── The Owl and the Pussy-Cat ────────────────────────────────────────────────
//
// Edward Lear's nonsense poem retold as lyrical prose for young children.
// 11 paragraphs · ~492 words · 4½ min read-aloud at toddler pace.
// A story of friendship, a long voyage, and a very good wedding.
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
    owl: `Tall soft-feathered tawny owl, a dark green waistcoat with brass buttons, a small round hat worn very straight, round warm amber eyes, a calm and careful manner.`,
    cat: `Slim grey cat, a white collar with a small ivory bow, neat white-tipped paws, bright expressive green eyes, a quiet and musical voice.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'owl-pussy-cat',
    title:    { en: 'The Owl and the Pussy-Cat' },
    subtitle: 'after Edward Lear',

    // Library presentation
    skin:    'classic',
    leather: 'navy',
    board:   'sky',
    color:   '#0077b6',

    // Reading metadata
    wordCount:   492,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['owl', 'cat'],
    coverAnimal: 'owl',

    // Unlock requirement
    requirements: [
      { animalId: 'owl', minCount: 1, label: 'Find the Owl' },
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'A tawny owl in a green waistcoat and a grey cat in a white collar sitting together in a small pea-green boat on a bright blue sea.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.owl} at the oars of a small round pea-green boat on a bright sea, his round hat perfectly on. ${CAST.cat} sits at the bow, white collar tidy, green eyes bright, looking ahead. Between them, a small bundle and a jar of honey. The sea is wide and the sky is blue and everything is exactly right.`,
        composition: `Wide portrait. The small boat is central, bright pea-green against the blue sea. The owl takes the back half, the cat the front. The wide sea and sky surround them. A small, complete world.`,
        light:       `Bright morning sea light, clear and generous. The sea is brilliant blue. The boat's pea-green glows.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `The Owl and the Pussy-Cat had known each other for a long time. The Owl lived in a tall oak at the edge of the harbour and the Cat lived in the blue house beside it. Every evening the Owl flew down to the harbour wall and the Cat sat beside him, and they watched the sea together without needing to say very much.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl in a green waistcoat and a grey cat in a white collar sitting together on a harbour wall at evening, the sea before them.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} and ${CAST.cat} side by side on a stone harbour wall at evening, watching the sea. The owl sits upright, round hat on, amber eyes ahead. The cat sits beside him, tail curled, green eyes on the horizon. The harbour is behind them, boats moored. The sea is the colour of pewter and pink in the evening light.`,
          composition: `Wide mid shot from behind, looking out to sea over their shoulders. The two figures are in the lower centre, the sea and sky taking the upper two-thirds. A quiet, established friendship in a single image.`,
          light:       `Evening light on the harbour, warm amber from the west, the sea reflecting pink and silver. Peaceful and habitual.`
        })
      },

      {
        id: 2,
        text: { en: `One autumn morning the Owl came to the blue house door with a small bundle under each wing. "I have a pea-green boat," he said. "I have been saving for it for a year." The Cat looked at him, then at the sea, then at her own neat white paws. "When do we leave?" she said.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl standing at the door of a blue house holding two small bundles, while a grey cat in the doorway looks at him with bright green eyes.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} at the door of a small blue harbourside house, a bundle tucked under each wing, hat perfectly level, expression hopeful. ${CAST.cat} stands in the doorway looking at him, white collar neat, green eyes bright and direct. The sea is visible in the gap between houses behind the owl.`,
          composition: `Mid shot, eye level with the doorway. The owl fills the left of the frame, the cat is in the doorway right. The sea glimpsed behind. Eye reads the owl's hopeful expression, then the cat's considering one.`,
          light:       `Autumn morning light, clear and cool. The blue house is vivid. The sea glimpsed behind is bright.`
        })
      },

      {
        id: 3,
        text: { en: `They packed together carefully: a jar of honey with a tight lid, a small bundle of provisions, two warm blankets, the Owl's best hat in a round hatbox, and a small notebook with the Cat's favourite songs. The Owl sealed the hatbox three times to make sure. The Cat wore her best white collar.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A grey cat and a tawny owl side by side in a cosy room, packing careful small bundles, a round hatbox prominent between them.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} and ${CAST.owl} packing together in a small cosy room. On a table between them: a jar of honey, two folded blankets, a round hatbox (sealed with string), and a small notebook. The cat is folding something carefully with her white-tipped paws. The owl is tying the string on the hatbox for the third time, expression very serious about it.`,
          composition: `Wide interior shot. The table is central with the items laid out. The cat is left, the owl is right. The hatbox is the comedic focal point between them.`,
          light:       `Warm interior light from a window. The honey jar glows amber. The hatbox is pale against the warm wood of the table.`
        })
      },

      {
        id: 4,
        text: { en: `The pea-green boat was small and round and perfectly seaworthy. They set out on a still morning with the tide, the Owl at the oars, the Cat at the bow, watching the harbour grow small behind them. The sea was wide and kind and smelled of salt and distance and the beginning of things.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A small pea-green boat on a bright sea, the owl rowing steadily, the cat at the bow, the harbour small and distant behind.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} rowing the small pea-green boat with steady strokes, hat on, green waistcoat catching the light. ${CAST.cat} sits at the bow, looking ahead, white collar bright. Behind them the harbour and the blue house are already small. Ahead the sea is wide and open. The boat is very small against the immensity of the sea.`,
          composition: `Wide shot. The boat is in the lower centre, small against the sea. The retreating harbour is upper left. The open sea is the right and ahead. Eye reads the contrast between the small boat and the big journey.`,
          light:       `Clear morning sea light. The pea-green boat is vivid. The sea sparkles. Everything suggests a good beginning.`
        })
      },

      {
        id: 5,
        text: { en: `On the second evening, when the sky was full of stars and the sea was very still, the Cat sat at the bow and sang. It was a short song, and not a complicated one. But the Owl put down his oars and listened, and when she had finished he put his wing very quietly over her white paw.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A grey cat at the bow of a boat under a star-filled sky, singing, while an owl behind her listens with his oars still, wings folded.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} at the bow of the boat, head slightly raised, singing to the night. The stars are very many and close. The sea is perfectly still and mirrors them. ${CAST.owl} sits behind her, oars laid across his knees, amber eyes on her, wings folded, listening completely. His expression is tender and attentive.`,
          composition: `Mid shot. The cat is in the foreground at the bow. The owl is behind her, softer. The star-filled sky fills the upper half. The still sea reflects below. A still, tender scene.`,
          light:       `Starlight and the faint glow of a very new moon. Silver and dark blue. The cat is lit softly from above.`
        })
      },

      {
        id: 6,
        text: { en: `The Owl looked at the stars for a while, and then at the sea, and then at the Cat. He straightened his round hat, which had slipped slightly to the left. "Will you marry me?" he said. The stars reflected in the still water. The Cat's green eyes were very bright. "Yes," she said.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl straightening his hat and looking at a cat in a small boat on a star-reflecting sea, both of them lit by starlight.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} sitting in the boat, one wing raised to straighten his round hat, looking at ${CAST.cat} with his amber eyes. The cat looks back at him, green eyes bright and steady. The sea around them is a mirror of stars. The moment between the question and the answer fills the image.`,
          composition: `Close mid shot. The two animals face each other in the boat, the sea around them reflected in stars. The owl's slightly-askew hat and adjusting wing is the gentle comedic counterpoint to the seriousness of the moment.`,
          light:       `Starlight only. Still and intimate. The reflected stars in the water give the sense of being surrounded by light from above and below.`
        })
      },

      {
        id: 7,
        text: { en: `They sailed for a year and a day, through warm green seas and cool blue ones, past flying fish and distant green islands. The Owl rowed each morning and the Cat steered each afternoon, and every evening they ate honey with a little spoon and talked quietly until the stars came out.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A pea-green boat on a tropical sea, an owl rowing, a cat steering, flying fish leaping on either side, a distant green island ahead.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} rowing, ${CAST.cat} steering, the boat moving through a warm green sea. Flying fish leap on both sides of the boat. A green island with palm trees is visible in the middle distance. The honey jar sits between them, open, with a small spoon. The mood is companionable and adventurous.`,
          composition: `Wide shot. The boat is central on the water. The flying fish frame left and right. The island is ahead in the background. The open honey jar between them is a small warm detail.`,
          light:       `Warm tropical light, full and golden. The sea is green and brilliant. The flying fish catch the light in silver arcs.`
        })
      },

      {
        id: 8,
        text: { en: `At last they came to a warm shore where a great Bong-tree grew right to the water's edge, its roots in the sand and its branches full of small golden birds. On the beach below it sat a round and cheerful pig with a gold ring at the end of his nose, selling it to whoever might need one.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A warm tropical beach with a great tree full of golden birds, and a cheerful pig sitting beneath it with a ring, two travellers arriving in a small boat.',
        imagePrompt: prompt({
          scene:       `A warm tropical beach. A magnificent Bong-tree grows to the water's edge, its branches full of small golden birds. Beneath it, a round cheerful pig sits cross-legged, a gold ring at the end of his nose, wearing a palm-leaf hat. ${CAST.cat} and ${CAST.owl} are arriving in the pea-green boat at the water's edge, the cat already reaching toward the shore.`,
          composition: `Wide beach shot. The Bong-tree is the large background element. The pig is in the left middle ground. The arriving boat is in the right foreground. The golden birds in the tree are the sky's decoration.`,
          light:       `Warm tropical afternoon light. The beach is golden. The Bong-tree is deep green. The golden birds catch the sun.`
        })
      },

      {
        id: 9,
        text: { en: `They bought the ring for a shilling, the pig counting it carefully into the Owl's wing feathers. That very afternoon, on the warm beach under the Bong-tree, a large and dignified turkey who lived just over the hill married them. The small golden birds sang from every branch above.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl and a cat being married on a tropical beach under a great tree full of golden birds, a dignified turkey officiating.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} and ${CAST.cat} standing together under the Bong-tree, facing a large dignified turkey in a dark coat who holds a small book. The owl's round hat is very straight. The cat holds a small spray of flowers. The golden birds fill the branches above, singing. The sea glints behind them.`,
          composition: `Mid shot. The turkey is central and behind. The owl and cat are in the foreground facing him, slightly smaller. The Bong-tree branches and golden birds fill the upper half. A joyful, dignified ceremony.`,
          light:       `Warm afternoon beach light. Golden and full. The golden birds in the tree above catch the light and add their own luminosity.`
        })
      },

      {
        id: 10,
        text: { en: `That evening they walked together along the shore where the sand was white and cool and the sea came in with the softest possible sound. They ate mince and slices of quince with a small runcible spoon, and the honey from the jar, and they were perfectly happy and not at all hungry.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'An owl and a cat walking along a white sand beach at sunset, a small picnic spread on the sand, the sea coming in gently.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} and ${CAST.cat} walking along a white sand beach at sunset. Beside them on the sand, a small picnic: a plate of food, the honey jar with the spoon, and a quince laid open. They walk slowly, the cat's white collar catching the last light. The sea comes in very gently beside them. The golden birds from the Bong-tree fly in a small group overhead.`,
          composition: `Wide shot along the beach. The two figures walk left-to-right, the sea on one side. The small picnic in the sand is a warm foreground detail. The sunset fills the sky behind.`,
          light:       `Sunset light, warm pink and amber on the sand and the water. The owl's amber eyes catch it. The cat's white collar glows.`
        })
      },

      {
        id: 11,
        text: { en: `When the stars rose, the Cat began to sing again and the Owl took her paw, and they danced at the edge of the water in the moonlight. Their shadows were long and soft on the white sand. The sea moved quietly around their feet, and the world was very good.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl and a cat dancing at the water\'s edge in moonlight, long soft shadows on the white sand, the sea around their feet.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} and ${CAST.cat} dancing at the very edge of the sea, their feet in the shallow water. The owl holds her paw with his wing. The cat's head is slightly raised, singing. Their shadows are long on the white sand behind them. The sea is calm and moon-silver. Stars are all around.`,
          composition: `Wide shot. The two dancers are centred at the water's edge, the sea extending behind and to the sides. Their long shadows stretch toward the viewer. The moon is reflected in the water around their feet.`,
          light:       `Full moonlight, silver and generous. The sand is white. The water around their feet catches moon-silver. Long, warm shadows.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `They stayed a long time on that warm shore. And when they finally sailed home in the pea-green boat, the harbour looked exactly the same as when they had left it, but nothing else was quite the same at all.` },
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'The small pea-green boat back in its harbour berth, a sprig of tropical flowers tucked at the bow, morning light on the water.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The small pea-green boat moored back in its harbour berth, rocking gently. A sprig of tropical golden flowers has been tucked into the rope at the bow. The honey jar sits empty in the boat. The round hatbox is there, lid slightly ajar. Morning light on the harbour water. No characters present.`,
        composition: `Mid shot at water level. The boat is centred, reflected in the harbour water. The flowers at the bow are a bright accent. The empty honey jar and the open hatbox tell the story of a very long and very good journey.`,
        light:       `Clear morning harbour light. The water is still. The boat's pea-green reflects. Warm, clear, and home.`
      })
    }

  }));

})(window.APP);

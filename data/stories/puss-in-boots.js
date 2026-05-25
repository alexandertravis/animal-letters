// ─── Puss in Boots ────────────────────────────────────────────────────────────
//
// A traditional tale retold for young children (all-animal cast). Lyrical prose.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Moral: a good friend sees what you are worth, even when you cannot.
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
    pasha: `Pasha the cat: a handsome tabby cat in a fine pair of leather boots, a dark green cloak, and a plumed hat worn at an angle. Quick, clever, fond of dramatic gestures, deeply loyal. The boots are clearly his pride and joy.`,
    bram:  `Bram the rabbit: a young brown rabbit in a plain grey smock, modest and quiet, with large ears that droop when he is doubtful of himself and stand up straight when he has remembered his confidence. He does not yet know how capable he is.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'puss-in-boots',
    title:    { en: 'Puss in Boots' },
    subtitle: 'a traditional tale, retold',

    // Library presentation
    skin:    'classic',
    leather: 'midnight',
    board:   null,
    color:   '#1a2a5a',

    // Reading metadata
    wordCount:   503,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['cat', 'rabbit'],
    coverAnimal: 'cat',

    // Unlock requirement
    requirements: [
      { animalId: 'cat',    minCount: 1, label: 'Find the Cat'    },
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'A handsome tabby cat in a plumed hat and leather boots, striking a confident pose.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.pasha} in a heroic pose: one booted foot on a stone, hat plumed and angled, green cloak swept back. Behind him ${CAST.bram} stands in his plain smock, looking at the cat with a mixture of admiration and bewilderment. A village market is suggested in the background.`,
        composition: `Wide mid shot. Pasha dominates the foreground in his full regalia. Bram is slightly behind, smaller. The background is soft. Eye drawn to the cat's extravagant confidence, then to the rabbit's reaction.`,
        light:       `Warm afternoon sun from the right, catching the plume on Pasha's hat and the sheen of his boots.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Bram the rabbit had always believed he was the least remarkable creature in the valley. He could not carry loads like the horse. He could not make honey like the bee. He lived alone in a burrow at the edge of a field, growing turnips, which he was excellent at, though he did not consider this remarkable.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A quiet rabbit in a plain smock standing in a turnip field, looking uncertain about himself.',
        imagePrompt: prompt({
          scene:       `${CAST.bram} standing alone in his small turnip field, looking at a row of very fine turnips with a modest, slightly deflated expression. The burrow entrance is visible behind him. The field is tidy and productive. He does not look at the turnips as though they are an achievement.`,
          composition: `Mid shot. Bram centred in his turnip field, the rows of vegetables around him. The burrow behind. His ears droop slightly. Eye drawn to his unimpressed self-assessment despite the very good turnips.`,
          light:       `Soft overcast morning light. Gentle, not dramatic, as befits someone who has not yet understood what he is.`
        })
      },

      {
        id: 2,
        text: { en: `One morning he found a cat on his doorstep. The cat was wearing boots. He wore a dark green cloak and a hat with an excellent plume, and he carried himself as though he had somewhere very important to be and was pausing here out of generosity. "Good morning," he said. "I am Pasha. I believe I can help you."` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat in boots and a plumed hat on a rabbit\'s doorstep, looking like he has a plan.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} standing on ${CAST.bram}'s burrow doorstep, hat on at a perfect angle, green cloak settled, boots polished. He looks at the rabbit with bright, confident eyes. Bram peers around the door, ears fully up with surprise. The turnip field is visible behind the cat.`,
          composition: `Mid shot at the doorstep. Pasha on the step, extravagant and composed. Bram peering around the door, surprised. Eye drawn to the contrast between the dramatic cat and the cautious rabbit.`,
          light:       `Bright morning sun catching Pasha's plume and boots beautifully. Bram is in slight shadow inside his doorway.`
        })
      },

      {
        id: 3,
        text: { en: `Bram was not sure he needed helping. He said so. Pasha said, very patiently, "You grow the finest turnips in the valley. I have spoken to the market-keeper's rabbit and the miller's hedgehog and the keeper of the bridge, and they would all like more turnips." Bram's ears went all the way up. He had not known this.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit with ears straight up in surprise, listening to a cat in boots who is gesturing at the turnip field.',
        imagePrompt: prompt({
          scene:       `${CAST.bram}'s ears are bolt upright as ${CAST.pasha} gestures with great enthusiasm toward the turnip field, clearly explaining the demand for Bram's produce. Bram looks from the field to the cat to the field again. His expression is surprised, disbelieving, and beginning to shift toward something else.`,
          composition: `Mid shot. The two characters together, Pasha gesturing, Bram listening with sudden attention. The turnip field is behind them. Eye drawn to Bram's rocket-straight ears as the news lands.`,
          light:       `Morning sun, warm and clear. The turnip field looks excellent in this light.`
        })
      },

      {
        id: 4,
        text: { en: `Pasha did not do things by halves. He went to the market first, in his boots and his hat, and told every stall-holder that the finest turnips in the valley came from one particular field, and that if they wanted them they must come and order them properly. Seven stalls sent word the same afternoon.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'Pasha the cat at a busy market, talking animatedly to various animal stall-holders, all of them leaning in.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} at the centre of a small outdoor market, hat plumed, cloak sweeping, talking with great energy to a ring of interested animal stall-holders: a badger, a hedgehog, a rabbit, an older goat. All lean toward him. He is clearly selling Bram's story with conviction and style.`,
          composition: `Wide mid shot at the market. Pasha is the energetic centre, the stall-holders a ring around him. Market stalls with produce behind them. Eye drawn to the cat's animated performance.`,
          light:       `Bright midday market sun, warm and busy, the whole scene lively.`
        })
      },

      {
        id: 5,
        text: { en: `When Bram heard this he felt very strange. He sat down. Pasha sat down beside him and waited. "I don't know how to deal with seven orders," said Bram. "Yes you do," said Pasha. "How do you grow the turnips?" Bram told him, in detail. Pasha listened. "That," he said, "is exactly how you deal with the orders. One at a time."` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit and a cat sitting together in the turnip field, in quiet conversation.',
        imagePrompt: prompt({
          scene:       `${CAST.bram} and ${CAST.pasha} sitting side by side in the turnip field, between the rows. Bram's ears are soft and thoughtful. Pasha sits with one leg crossed, hat tilted back, listening attentively. A calm, intimate moment between two friends.`,
          composition: `Close mid shot between the turnip rows. Both seated, close. The rows of turnips recede behind them. Eye drawn to the ease of this conversation in contrast to Bram's earlier uncertainty.`,
          light:       `Afternoon light, warm and direct. The turnips around them in good growing light.`
        })
      },

      {
        id: 6,
        text: { en: `Bram delivered the first order himself, which was very difficult, and the second, which was less difficult, and by the fifth he had begun to notice that the recipients seemed genuinely pleased, and by the seventh he had stopped doubting whether he was doing it right. Pasha walked beside him for every one.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit carrying a basket of turnips to a door, a cat walking beside him, both looking purposeful.',
        imagePrompt: prompt({
          scene:       `${CAST.bram} walking along a village lane, carrying a basket of fine turnips, ${CAST.pasha} striding beside him in his boots and cloak. Bram's ears are up. His posture is a little straighter than it used to be. A cottage door ahead suggests a delivery in progress.`,
          composition: `Side-on mid shot. Both characters walking together, the lane and cottages as background. Bram slightly ahead, Pasha beside. A companionable, purposeful walk. Eye drawn to Bram's improving posture.`,
          light:       `Warm afternoon village light, the lane pleasant, the cottages welcoming.`
        })
      },

      {
        id: 7,
        text: { en: `"They all asked if they could have an order every week," said Bram that evening, sitting outside his burrow. He sounded as if he still could not entirely believe this. Pasha stretched out on the doorstep in the last of the sun and said: "I know. That is what I told them to ask for." Bram looked at him. "You knew they would want one?"` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat stretched out on a doorstep in the evening sun, and a rabbit sitting next to him looking surprised.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} stretched luxuriously on ${CAST.bram}'s burrow doorstep in the last of the evening sun, hat over his face, one booted foot dangling. ${CAST.bram} sits beside him, ears up, a look of dawning realisation on his face. The turnip field glows behind them in the evening light.`,
          composition: `Interior-exterior close mid shot. The doorstep fills the lower frame. Pasha is horizontal and at ease. Bram sits upright beside him. A contrast in posture. Eye moves between them.`,
          light:       `Warm low evening sun, golden on the turnip field and the doorstep. Comfortable and resolved.`
        })
      },

      {
        id: 8,
        text: { en: `"I knew they would want your turnips," said Pasha, lifting the hat from his face and looking at the sky, "because they are the best turnips. I knew you could do the deliveries because you knew where everything was and how to talk to people. I knew both of these things from watching you for ten minutes." Bram was quiet for a while.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat looking up at the evening sky, speaking to a rabbit who is listening very carefully.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} lying back on the doorstep, looking up at the evening sky, speaking with a relaxed certainty. ${CAST.bram} sits beside him, looking at him rather than at the sky, listening with full attention. Both are still. The sky above is warm amber and rose.`,
          composition: `Close mid shot. Pasha's face tilted up to the sky, Bram's face toward Pasha. A conversation about seeing what someone is worth. Eye drawn to Bram's listening face.`,
          light:       `Evening amber light, low and warm, the sky behind them the warmest it has been all story.`
        })
      },

      {
        id: 9,
        text: { en: `"Why did you help me?" asked Bram. Pasha considered this seriously. "Because I walked past your field one morning and saw how carefully you grew things, and I thought: that rabbit does not know what he has." He put his hat back on. "I find it very difficult to leave that sort of situation alone."` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'The cat settling his plumed hat back on his head with a small smile, the rabbit watching him.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} adjusting his plumed hat with a small, genuine smile. Not his performance smile, but a real one. ${CAST.bram} watches him with a quiet, warm expression. The evening is deepening. The two of them together on the doorstep, the field behind.`,
          composition: `Close mid shot. Pasha and his hat are the focus. Bram is close beside him. The field glows behind. Intimate and warm.`,
          light:       `Deepening evening light, soft and golden. The warmest moment in the story.`
        })
      },

      {
        id: 10,
        text: { en: `Bram's field grew. He hired a mole to help with the digging and a hedgehog to help with the deliveries. He built a new door on his burrow, oak rather than pine, because he could. He still wore his plain grey smock. He had not stopped being quiet and modest. He had simply stopped thinking that quiet and modest meant unremarkable.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit in his plain smock overseeing a much larger and better tended field, looking calm and capable.',
        imagePrompt: prompt({
          scene:       `${CAST.bram} standing in his much-expanded turnip field, which is now well-ordered and thriving. A mole and a hedgehog are working in the rows behind him. Bram holds a small ledger under one arm, surveying his field with calm, quiet satisfaction. A new oak door on his burrow is visible. His ears are straight up.`,
          composition: `Wide mid shot. Bram centred in his expanded field, the workers behind, the new burrow door to the side. A sense of quiet, earned success. Eye rests on Bram's calm capable stance.`,
          light:       `Clear, generous afternoon light on the prosperous field. Everything is in good order.`
        })
      },

      {
        id: 11,
        text: { en: `Pasha still came by, most Tuesdays. He had a route he covered, and Bram's burrow was on it. He was always in his boots, his cloak, his hat. He always accepted a cup of tea and a slice of whatever bread was going. He never said, I told you so. He never needed to.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat in boots and hat sitting at a rabbit\'s table, drinking tea, both looking entirely comfortable.',
        imagePrompt: prompt({
          scene:       `${CAST.pasha} sitting at a small table inside ${CAST.bram}'s burrow, hat on, boots crossed at the ankle, cup of tea in both paws. ${CAST.bram} sits across from him with his own cup. The burrow is more comfortable than before, with a good rug and a shelf of labelled jars. Both look entirely at ease.`,
          composition: `Interior close mid shot. Both at the table, facing each other. The burrow interior around them is warm and improved. Eye drawn to the ease and friendship of this Tuesday ritual.`,
          light:       `Warm afternoon burrow light, cosy and domestic.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The boots, incidentally, are still excellent. Pasha has them polished every week, which he considers a reasonable priority.` },
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'A pair of fine leather boots on a cottage step, a polishing cloth beside them.',
      imagePrompt: prompt({
        scene:       `A close vignette: a pair of well-maintained leather boots, clearly Pasha's, sitting on a cottage step. A small cloth and a tin of polish sit neatly beside them. The boots are immaculate. A plume from his hat hangs over the door frame above. The step is stone, the door is warm oak.`,
        composition: `Close shot of the boots on the step. The boots are the only subject. The polish cloth and tin are small accent details. The door frame and plume above give context. A small, funny, fond ending.`,
        light:       `Warm afternoon light on the boots, the leather catching a satisfying gleam.`
      })
    }

  }));

})(window.APP);

// ─── The Brave Little Bee ─────────────────────────────────────────────────────
//
// An original story. Lyrical prose, no rhyme.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Moral: small is not the same as powerless. Speaking up makes a difference.
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
    bonnie: `Bonnie the bee: a small yellow-and-black bee in a striped ochre waistcoat. Tiny, quick, and quick-thinking. Her wings are always in motion and her voice, though small, is very clear.`,
    bear:   `The bear: a large, soft-furred brown bear with round honest eyes, wearing no clothes, as bears do not. He is large and warm and entirely not malicious — he simply has not thought carefully enough about other people's honey. His expression, when he pauses to think, is genuinely contrite.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'brave-bee',
    title:    { en: 'The Brave Little Bee' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'gold',
    board:   null,
    color:   '#7a6818',

    // Reading metadata
    wordCount:   497,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['bee', 'bear'],
    coverAnimal: 'bee',

    // Unlock requirement
    requirements: [
      { animalId: 'bee',  minCount: 1, label: 'Find the Bee'  },
      { animalId: 'bear', minCount: 1, label: 'Find the Bear' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/bee.svg',
      imageAlt: 'A tiny bee perched on the nose of a very large surprised bear, the hive in the pear tree behind.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.bonnie} perched on the very tip of ${CAST.bear}'s broad nose, wings open, looking directly at him. The bear's eyes are crossed, looking at the tiny bee. His expression is startled and slightly ashamed. Behind them, a round golden hive hangs in an old pear tree, other bees visible at the entrance.`,
        composition: `Wide mid shot. The bear's face fills the right half of the frame, the bee tiny on his nose. The hive in the pear tree fills the left background. Eye drawn first to the bee's confident tiny figure, then to the bear's expression.`,
        light:       `Warm summer afternoon sun from the left, catching the hive in gold and the bee's wings in a shimmer.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In the old pear tree at the edge of the orchard, there was a round golden hive. Inside it, three hundred and twelve bees lived and worked, filling each cell of the comb with honey, which was the work they were best at and which they did with great care and attention from April to September.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A round golden hive in an old pear tree, bees coming and going in the summer light.',
        imagePrompt: prompt({
          scene:       `A large, round golden hive hanging in an old pear tree. Bees hover around the entrance and spiral through the air around it. Pears hang among the leaves. The hive glows warm in summer light. It is a picture of industry and home.`,
          composition: `Wide mid shot. The hive is centred in the pear tree, occupying the middle of the frame. Bees create movement around it. Eye drawn first to the hive, then to the activity around it.`,
          light:       `Warm summer afternoon sun filtering through pear-tree leaves, dappled on the hive, golden and green.`
        })
      },

      {
        id: 2,
        text: { en: `Every summer, when the honey was at its richest, a large brown bear came to the orchard. He would lean against the pear tree and reach up toward the hive. He was not angry, or cruel. He simply liked honey very much, and had not spent a great deal of time thinking about whose honey it was.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'A large brown bear leaning against a pear tree, reaching up toward the hive with a longing expression.',
        imagePrompt: prompt({
          scene:       `${CAST.bear} leaning comfortably against the old pear tree, one enormous paw reaching up toward the hive. His expression is one of simple, comfortable want. He is not threatening — he just really likes honey and has not considered the matter further. The hive is just above his reach.`,
          composition: `Wide mid shot. The bear against the tree occupies the left and centre, the hive above-right just out of reach. Eye drawn to the gap between his reaching paw and the hive.`,
          light:       `Late afternoon summer light, warm and sleepy. The bear is in soft dappled shade under the tree.`
        })
      },

      {
        id: 3,
        text: { en: `When the bear came, the bees went inside the hive. All of them, every time, in a frightened rush of wings. They pressed together in the dark and listened to the tree shake. Inside the hive it was warm and smelled of honey and beeswax, but it was also very crowded, and nobody felt well until the bear went away.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'Bees crowded inside the golden hive, pressed together, listening, while outside the tree shakes.',
        imagePrompt: prompt({
          scene:       `Interior of the hive: hundreds of bees pressed together in the golden combs, all very still. The sound of the tree shaking is implied in their tense stillness. Bonnie is visible among them, her expression different from the others: she is looking toward the entrance, thinking.`,
          composition: `Interior close shot inside the hive, the golden comb cells in the background, bees filling the space. Bonnie is slightly forward, facing outward. Eye drawn to her different expression among the frightened crowd.`,
          light:       `Warm amber interior of the hive. No outside light penetrating. A shut-in, waiting quality.`
        })
      },

      {
        id: 4,
        text: { en: `Bonnie was afraid too, the same as the others. But she was also rather cross, which is sometimes what comes after fear if you have been afraid of the same thing too many times. She thought about it through the long afternoon while the bear searched below.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee inside the hive looking toward the entrance with a determined, thinking expression.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} alone near the entrance of the hive, looking out through the small opening. The interior is warm and amber behind her. Outside through the entrance, the blurred large shape of the bear is visible below. Her expression is a private mixture of worry and resolve.`,
          composition: `Interior close shot at the hive entrance. Bonnie in the foreground facing outward, the entrance as a small opening of outside light ahead of her. The warm hive behind, the problem outside.`,
          light:       `The amber interior light behind Bonnie, the bright afternoon light ahead of her in the entrance. She is between two worlds.`
        })
      },

      {
        id: 5,
        text: { en: `When the tree had stopped shaking, Bonnie flew out before anyone could ask her not to. She flew down to where the bear was sitting at the base of the tree, looking up with a patient, hopeful expression. She landed right on the end of his broad, warm nose.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A tiny bee landing on the nose of a surprised bear sitting at the base of a tree.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} landing with a decisive little thump on the very tip of ${CAST.bear}'s nose. The bear's eyes go wide and slightly crossed looking at her. He has frozen completely still. His large paws are planted in the grass. Bonnie stands with her wings held out, looking directly at him.`,
          composition: `Close mid shot. The bear's face fills the frame, his nose prominent. The bee is tiny but perfectly centred on it, the focal point of everything. Eye drawn to the bee's tiny confident figure on the enormous nose.`,
          light:       `Clear afternoon sun from above. The bee is in full light. The bear's surprised face below is lit warmly.`
        })
      },

      {
        id: 6,
        text: { en: `The bear went completely still. His eyes, being rather close together on a bear's face, both tried to look at the bee at the same time, which gave him a slightly confused expression. He said nothing. He was a large animal that was waiting to see what a very small animal was going to say.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'A large bear with eyes crossed, perfectly still, looking at a tiny bee on the end of his nose.',
        imagePrompt: prompt({
          scene:       `${CAST.bear} frozen with his eyes crossed, both trying to focus on ${CAST.bonnie} on his nose. His body is huge and still. His expression is bewildered and waiting. The orchard around him is quiet. The hive in the tree above has gone silent.`,
          composition: `Wide mid shot. The bear large and centred, frozen still. The bee is the tiny focal point on his nose. The pear tree with the hive is visible above. Eye drawn to the bear's comic frozen expression and the tiny bee.`,
          light:       `Afternoon sun, clear and full. Everything visible and warm. No shadow on this scene.`
        })
      },

      {
        id: 7,
        text: { en: `"We have worked all spring and summer on this honey," said Bonnie, in the smallest-but-firmest voice she had. "Every drop of it. Every one of us. It took a great deal of time and care and flying. It is ours." She was shaking slightly, which she had not expected. But her voice did not shake.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A tiny bee on a bear\'s nose, speaking with great seriousness, her wings quivering slightly.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} on the bear's nose, her wings trembling slightly but her posture upright and her expression serious. She is speaking. The bear listens, his huge eyes focused on her. The pear tree and hive are above them both.`,
          composition: `Close shot focused on the nose and bee. The bear's eyes fill the background. Bonnie is tiny and entirely in focus. A portrait of small courage.`,
          light:       `The same clear afternoon light. Nothing dramatic. The courage is in the stillness.`
        })
      },

      {
        id: 8,
        text: { en: `The bear sat back on his haunches. This was a new experience. A bee had never said that to him before, because the bees had always gone inside. He looked up at the hive and then down at the small bee. He felt, in a slow and thorough way, a little bit ashamed.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'The bear sitting back on his haunches, looking up at the hive with a sheepish expression.',
        imagePrompt: prompt({
          scene:       `${CAST.bear} has sat back on his haunches, and his expression has changed: he is looking up at the hive with a genuine, dawning contrition. The bee stands nearby on a grass stem, watching him. The bear's posture is slumped, not threatening.`,
          composition: `Wide mid shot. The bear is centred and large, looking upward. The hive is above-right. Bonnie is small left-foreground watching him. The shift in his posture is the subject.`,
          light:       `The afternoon light is a little lower now, softer, slightly more forgiving.`
        })
      },

      {
        id: 9,
        text: { en: `"I am sorry," said the bear, in a large, quiet voice. "I did not think of it that way." He was quiet for a moment. "I do not have anything to trade," he said. "But I know where the best wildflowers are. If I brought some, for the spring?" Bonnie considered this. It was, actually, a very good offer.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'A bear and a bee facing each other, the bear making an offer with one large paw open.',
        imagePrompt: prompt({
          scene:       `${CAST.bear} sitting in the orchard, one large paw extended open in the gesture of an offer. ${CAST.bonnie} hovers before him, wings beating, considering. His expression is genuinely hopeful and contrite. Her expression is weighing, thoughtful.`,
          composition: `Mid shot. The bear's open paw is the central gesture. The bee hovers before it. A moment of negotiation between very different-sized parties.`,
          light:       `The light is warm and equal on both. A fair light for a fair offer.`
        })
      },

      {
        id: 10,
        text: { en: `She went back to the hive and explained the arrangement. There was quite a lot of buzzing. Then there was a quiet, which in a hive of three hundred and twelve bees is unusual and means they are all thinking at the same time. Then there was a different buzzing, which meant yes.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee addressing the buzzing hive entrance from outside, all the bees listening.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} hovering at the hive entrance, addressing the bees inside. Many bee faces crowd the entrance, all focused on her. The bear sits at the base of the tree below, waiting, clearly visible but now keeping a respectful distance.`,
          composition: `Mid shot at the hive entrance. Bonnie is at the entrance level, the bee faces clustered inside. The bear is small but visible below. A public meeting of the hive.`,
          light:       `Late afternoon light on the hive, warm and golden. The bees at the entrance are lit from outside.`
        })
      },

      {
        id: 11,
        text: { en: `Every spring after that, the bear came first with a great armful of wildflowers, which he placed at the base of the pear tree. And every summer, toward the end, when the combs were full, Bonnie would fly down and leave a small piece of honeycomb on a flat stone. They never became friends exactly, but they understood each other very well.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee leaving a small piece of honeycomb on a flat stone at the base of a pear tree, wildflowers nearby.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} placing a small piece of honeycomb on a flat stone at the base of the pear tree. A large bundle of wildflowers is already there, left earlier by the bear. The hive glows above in the tree. The bear is not in the frame but the flowers are evidence of him.`,
          composition: `Mid shot in the orchard. The flat stone with the honeycomb and the wildflowers are centred. Bonnie is just above them, wings out. The hive is in the tree above. An exchange without either party present at the same time.`,
          light:       `Late summer afternoon light, rich and amber, the honeycomb glowing, the wildflowers bright.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `Bonnie never quite stopped shaking when she flew down to the stone. But she always flew down. And that, in the end, is what brave means.` },
      image:    'assets/images/cartoon/bee.svg',
      imageAlt: 'A flat stone at the base of a pear tree, a small honeycomb on it, a bunch of wildflowers beside it, the hive glowing above.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: a flat mossy stone at the base of the old pear tree. A small golden piece of honeycomb rests on it. Beside it, a bunch of mixed wildflowers: clover, buttercup, forget-me-not. The round golden hive is visible above in the branches. Neither bee nor bear in the frame, only the evidence of their agreement.`,
        composition: `Close shot of the stone and its offerings. The hive is above in the background. No characters, just the exchange they have left for each other. A still, complete image.`,
        light:       `Warm late-afternoon light on the stone. The hive above glows. The wildflowers are bright. A satisfying, golden end.`
      })
    }

  }));

})(window.APP);

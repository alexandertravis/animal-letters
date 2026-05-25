// ─── The Fox and the Crow ─────────────────────────────────────────────────────
//
// An Aesop fable retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Moral: be wary of flattery from those who want something from you.
// (The fox has a moment of honesty at the end, making the moral complete.)
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
    parrot: `Perla the parrot: a vivid green parrot with a scarlet cap and yellow cheek patches, wearing a small teal neckerchief, perched with great dignity on high branches. Beautiful and aware of it, though not unkind.`,
    fox:    `Freddo the fox: a slim russet fox in a honey-coloured coat and a soft felt hat, with quick clever eyes and a smile that is friendlier than he quite means. Genuinely witty but not entirely trustworthy, though capable of honesty when it costs him.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'fox-crow',
    title:    { en: 'The Fox and the Parrot' },
    subtitle: 'after Aesop',

    // Library presentation
    skin:    'classic',
    leather: 'sienna',
    board:   null,
    color:   '#7a3a20',

    // Reading metadata
    wordCount:   496,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['parrot', 'fox'],
    coverAnimal: 'parrot',

    // Unlock requirement
    requirements: [
      { animalId: 'parrot', minCount: 1, label: 'Find the Parrot' },
      { animalId: 'fox',    minCount: 1, label: 'Find the Fox'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/parrot.svg',
      imageAlt: 'A beautiful green parrot on a high branch holding a golden cracker, a fox looking up at her from below.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.parrot} perched high on an oak branch, holding a large golden cracker in her talons, looking down with regal confidence. ${CAST.fox} stands at the base of the tree looking up, hat in hand, smiling much too broadly. The forest around them is warm and golden.`,
        composition: `Wide vertical shot. The parrot is in the upper-left on her branch, the cracker visible in her talons. The fox is small below at the tree base, his gaze and smile directed upward. Eye moves from the parrot down to the fox.`,
        light:       `Warm afternoon sunlight from the right, catching the parrot's green and scarlet plumage and the golden cracker beautifully.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In the oak wood that smelled of autumn and wet leaves, Perla the parrot found something wonderful: a large golden cracker, thick and seeded and perfectly round. She picked it up in her curved beak, flew to the highest branch of the tallest tree, and settled down with it in her talons, very pleased with herself.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'A green parrot high in an oak tree, a golden cracker held in her talons, looking satisfied.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} perched on a high oak branch, a large round golden cracker held firmly in her talons. She sits upright and pleased, surveying the autumn woodland below. The branch is high, the forest floor far below. Fallen leaves drift in the air around the lower branches.`,
          composition: `Wide high shot, looking up at the parrot from below. She is small but clearly dominant, the cracker visible in her talons. The forest floor is far below. Eye drawn upward to her and her prize.`,
          light:       `Warm afternoon autumn light from the right, the parrot's plumage lit richly, the cracker gleaming golden.`
        })
      },

      {
        id: 2,
        text: { en: `Below the tree, a slim russet fox was walking through the wood, and his nose had told him something interesting was nearby before his eyes found it. He stopped. He looked up. He saw the parrot. He saw the cracker. He sat down at the base of the tree and thought about this for a moment.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A fox sitting at the base of a tree, looking up with a calculating expression.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} sitting at the base of a large oak tree, looking up at a distant bright green shape in the canopy above. His expression is alert, thinking. One paw is on his knee, his hat slightly back on his head. His nose is raised slightly, the scent of the cracker still in the air.`,
          composition: `Mid shot at tree-base level. The fox is lower-centre, looking up. The tree trunk recedes above. The canopy is glimpsed at the top of the frame. Eye drawn to the fox's calculating upward look.`,
          light:       `Autumn woodland light, dappled and warm, slightly dim at tree base level, brighter above.`
        })
      },

      {
        id: 3,
        text: { en: `"Good afternoon," called the fox, in the warmest and most polite voice he owned. "What a perfectly magnificent day for a walk in the forest." Perla the parrot looked down from her branch and nodded pleasantly. She kept both talons firmly on the cracker.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A fox looking up at a parrot in a tree, his hat raised in greeting, smiling very warmly.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} standing at the tree base, hat raised slightly in a polite gesture, smiling up at ${CAST.parrot} above. His smile is very warm, almost too warm. The parrot looks down at him, composed, her talons steady on the cracker. A clear beginning of a game of wits.`,
          composition: `Mid shot. The fox below with his raised hat, the parrot above on her branch. The tree trunk connects them. Eye moves between the two faces, reading the dynamic.`,
          light:       `Warm afternoon light, the fox well-lit, the parrot slightly shadowed by the canopy above her but her colours bright.`
        })
      },

      {
        id: 4,
        text: { en: `"I must say," the fox continued, taking a few steps nearer, "I have never seen a bird with such a remarkable coat of feathers. Green as a summer leaf. Red as a rowan berry. Yellow as the morning sun. You are, if I may say so, quite extraordinarily beautiful." Perla's feathers ruffled just a little with pleasure.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'A parrot preening slightly on her branch, looking pleased, while the fox watches from below.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} on her branch, feathers slightly puffed with pleasure, her head tilted at a modest angle as if accepting a compliment. One wing is slightly open, displaying the colours. ${CAST.fox} below watches with bright, patient eyes. The cracker is still in her talons.`,
          composition: `Two-level mid shot. The parrot above in a preening pose, the fox watching below. The parrot is the larger figure, dominant, but listening. Eye moves between her pleased display and his watchful face.`,
          light:       `The sun catches the parrot's green and scarlet beautifully from the side, as if even the light agrees with the fox's assessment.`
        })
      },

      {
        id: 5,
        text: { en: `She appreciated good taste in a visitor. The fox leaned against the trunk and sighed admiringly. "And I have always heard," he said, as if the thought had only just occurred to him, "that the most beautiful birds have the most beautiful voices to match. But that, I suppose, is probably a lot to ask."` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A fox leaning against a tree trunk, looking wistfully upward in a theatrical way.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} leaning against the oak trunk in a studied, theatrical pose, one paw on his chest, looking up at ${CAST.parrot} with an expression of wistful longing, as if hoping very much but not quite daring to ask. His hat is tilted. His smile is barely there. The parrot above him looks very interested in what he has just said.`,
          composition: `Mid shot. The fox against the trunk is the lower figure, languid and theatrical. The parrot above is alert, drawn in. Eye reads the fox's manipulation and the parrot's interest.`,
          light:       `The late afternoon light has shifted slightly, a little dimmer, adding a slight dramatic atmosphere to the scene.`
        })
      },

      {
        id: 6,
        text: { en: `Perla looked down at him. She had, in fact, an excellent voice. Everyone said so. She had been told so many times that she had quite stopped doubting it. She drew in a long breath. She opened her beak. She let out a long, clear, ringing cry of "HELLO!" She had not thought about the cracker.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'The parrot mid-cry, beak wide open, the cracker tumbling away from her talons.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} on her branch, beak wide open in a full-throated cry, wings slightly spread. The golden cracker has slipped from her talons and is falling, tumbling through the air below her. Her eyes are closed with the effort of the cry. She has not noticed the cracker is gone.`,
          composition: `Dynamic mid shot. The parrot is upper-centre, beak open, feathers fanned. The falling cracker is a spinning golden shape below her, mid-air. Eye drawn to the open beak and the falling cracker.`,
          light:       `The same warm afternoon light catches the falling cracker, making it glow as it falls. A brief, bright moment of consequence.`
        })
      },

      {
        id: 7,
        text: { en: `The cracker fell. The fox caught it neatly in both paws, without appearing to hurry. He looked at it, and then up at the parrot, and then at it again. "Thank you," he said, and turned to go. Perla stared down from her branch. Her beak was still slightly open.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The fox holding the cracker in both paws, looking up at the parrot above with a polite expression.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} standing at the tree base, the golden cracker held neatly in both paws. He looks up at ${CAST.parrot} with an expression that is almost apologetic, or would be if it were not quite so calm. The parrot above stares down, beak still open. A moment of total stillness after the action.`,
          composition: `Two-level mid shot. The fox below with the cracker, the parrot above without it. The tree trunk between them. Eye moves from the cracker in the fox's paws up to the parrot's expression.`,
          light:       `The light is calm and even, no drama — this makes the moment feel more matter-of-fact, which is worse.`
        })
      },

      {
        id: 8,
        text: { en: `He had gone three steps down the path when he stopped. He stood with his back to her for a moment. Then he turned around. "I was not entirely honest," he said, which surprised them both. He looked at the cracker. "You found this. You earned it." He set it carefully on a root at the base of the tree.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The fox placing the cracker back on a tree root at the base of the oak, his expression sheepish.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} crouching to set the golden cracker carefully on a gnarled tree root at the base of the oak, his expression genuinely sheepish and a little rueful. The parrot above watches this with wide, unbelieving eyes. The cracker sits on the root, returned.`,
          composition: `Mid shot. The fox is bent low setting the cracker down, his back slightly angled toward the viewer. The cracker on the root is central. The parrot above is visible in the upper frame, watching. Eye drawn to the returned cracker.`,
          light:       `The light softens slightly at this moment, gentler and more forgiving.`
        })
      },

      {
        id: 9,
        text: { en: `"The flattery was dishonest," he said. "You should not lose what you have because someone calls you beautiful. You are beautiful, by the way, but that is not the same as true." He put his hat back on, adjusted it, and walked away down the autumn path.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'The fox walking away down a leaf-strewn path, adjusting his hat, his back to the parrot.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} walking away from the tree down a winding autumn path, adjusting his felt hat as he goes. Fallen leaves crunch under his feet. His posture is a mixture of dignity and slight embarrassment. The oak tree is visible behind him, the parrot a small bright shape on her branch.`,
          composition: `Wide rear mid shot. The fox walks away from the camera toward the path. The tree and parrot are behind in the upper background. A departure scene with unexpected gentleness.`,
          light:       `Warm autumn afternoon light on the leaf-strewn path, slanting through the trees, a beautiful light for an unexpected moment.`
        })
      },

      {
        id: 10,
        text: { en: `Perla sat on her branch for a long time after he had gone. She picked the cracker up again and turned it in her talons and thought about what the fox had said. It was, she decided, rather a strange compliment. But it was the truest one she had ever received.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'The parrot sitting alone on her branch, turning the cracker in her talons, thinking.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} alone on her branch in the autumn light, the golden cracker back in her talons. She is looking at it thoughtfully, head tilted, her expression somewhere between rueful and pleased. The wood around her is quiet and golden. The fox is long gone.`,
          composition: `Close mid shot. The parrot centred on her branch, the cracker in her talons at a middle level. The autumn light is warm around her. Eye rests on her thoughtful face and the cracker.`,
          light:       `Rich autumn afternoon light, warm and slanting, the parrot's colours at their most vivid in this light.`
        })
      },

      {
        id: 11,
        text: { en: `She ate the cracker slowly, enjoying every bite. Then she groomed her feathers in the last of the evening sun. They were, she thought, genuinely very good feathers. She had not needed a fox to tell her so. But it was still, she admitted, rather nice to have heard it.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'A parrot grooming her feathers in the evening sunlight on a high branch, looking composed and content.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} alone on her branch in the warm evening sun, carefully preening one wing with her beak. The cracker is gone (eaten). Her expression is composed, self-possessed, entirely content. The autumn woodland is golden around her.`,
          composition: `Close mid shot. The parrot centred on her branch, mid-groom, the last sunlight catching her feathers. A quiet, self-contained ending image. Eye rests on her comfortable, knowing expression.`,
          light:       `The last warm gold of the evening sun catching the parrot's feathers from the left. Beautiful, rich, entirely her own.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And she never again opened her beak without thinking first about what she was holding.` },
      image:    'assets/images/cartoon/parrot.svg',
      imageAlt: 'An empty autumn branch with a single bright green feather resting on it and a scattering of golden cracker crumbs below.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. An oak branch in autumn, empty but for a single bright green parrot feather resting in the groove of the bark. On the forest floor below, a faint scatter of golden cracker crumbs. The late light is warm on both. No characters.`,
        composition: `Close shot of the branch and feather, the forest floor with crumbs below. The feather is the warm green accent in an amber scene. Eye rests on the feather, then drops to the crumbs. The story is done.`,
        light:       `Last golden evening light, warm and final.`
      })
    }

  }));

})(window.APP);

// ─── The Happy Hedgehog ───────────────────────────────────────────────────────
//
// An original solo adventure. Lyrical prose, no rhyme.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Theme: the joy of going further than you usually do, and finding the way home.
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
    harriet: `Harriet the hedgehog: a small, round hedgehog with bright inquisitive eyes, a small brown cotton apron, and spines that she is rather proud of. She moves at hedgehog pace, which looks slow until you realise she has covered a great deal of ground. Her nose twitches constantly, which is how she knows where she is.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'happy-hedgehog',
    title:    { en: 'The Happy Hedgehog' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'russet',
    board:   null,
    color:   '#6a3a1a',

    // Reading metadata
    wordCount:   490,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['hedgehog'],
    coverAnimal: 'hedgehog',

    // Unlock requirement
    requirements: [
      { animalId: 'hedgehog', minCount: 1, label: 'Find the Hedgehog' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/hedgehog.svg',
      imageAlt: 'A small hedgehog in an apron standing in a sunny clearing full of wild strawberries, looking very pleased.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.harriet} standing in the centre of a sunlit forest clearing, surrounded by wild strawberry plants in full fruit. She is looking around with an expression of pure, uncomplicated delight. Her apron has a small leaf tucked in the pocket. The clearing is warm and full of red strawberries and green leaves.`,
        composition: `Wide mid shot. Harriet is small and centred in the clearing, the strawberry plants surrounding her. The forest is glimpsed at the edges. Eye drawn first to Harriet and her delight, then to the abundance of strawberries.`,
        light:       `Warm summer sun through the clearing's open canopy, the strawberries catching the light, Harriet lit fully and warmly.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Harriet the hedgehog lived in a nest of dry oak leaves at the foot of an old oak tree, at the edge of a wood she knew very well. She knew where the beetles were and where the worms came up after rain and which bit of the path was softest underfoot. She was, on the whole, perfectly content.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog in an apron at her cosy leaf-nest home at the foot of an oak tree.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} at the entrance of her leaf nest, set into the roots of a great old oak tree. The nest is round and snug, well-made of dry leaves and moss. She is standing in the opening with a cup of something warm, looking out at her familiar wood. Everything is comfortable and known.`,
          composition: `Mid shot at the nest entrance. Harriet fills the opening, the oak root curving around her. The wood stretches out behind her in soft focus.`,
          light:       `Warm forest-edge morning light, dappled through the oak leaves above, familiar and good.`
        })
      },

      {
        id: 2,
        text: { en: `But one September morning she woke up and thought: I have never gone further than the third beech tree. The third beech tree was quite far enough for her daily purposes, but today, for no particular reason she could name, she put on her apron, tucked a leaf in the pocket for luck, and walked past the third beech tree.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog walking purposefully past a large beech tree, a new path ahead of her.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} walking past a large beech tree, leaving behind the familiar territory of her wood. Her nose is up and her eyes are forward. The wood ahead is slightly different in character from her usual path: deeper, with more undergrowth and a different quality of light. She walks with purpose.`,
          composition: `Wide mid shot. Harriet is right-of-centre passing the beech tree, the familiar wood behind her left, the new territory ahead-right. A threshold moment.`,
          light:       `Soft September morning light, slightly cooler and more atmospheric than her usual surroundings.`
        })
      },

      {
        id: 3,
        text: { en: `The wood changed beyond the third beech tree. The path was different underfoot: softer and darker, with fallen leaves she had not seen before. The trees were older and closer together. A wood pigeon she did not recognise called from somewhere above. She walked more slowly, which is hedgehog pace for very interested.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog on a new, darker path deep in the wood, nose up, very curious.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} on an unfamiliar path deeper in the wood, walking slowly with her nose raised, sampling everything. The trees here are older and closer, the undergrowth different. A wood pigeon is visible on a branch above. The light is more filtered. She is very alert and very interested.`,
          composition: `Wide mid shot on the forest path. Harriet is small on the path, the older trees closing in around her. The canopy is thicker. Eye drawn to her alert, nose-up posture in this new space.`,
          light:       `More filtered light, the canopy thicker, patches of sun and shadow alternating on the path.`
        })
      },

      {
        id: 4,
        text: { en: `She found a fallen tree covered entirely in shelf fungi, which she had seen before, and a stream she had not heard of, and three different kinds of mushroom she could identify, and one she could not, and a patch of very late blackberries, which she ate until she felt she should probably stop.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog eating blackberries from a briar patch, thoroughly happy.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} standing in a briar patch, eating late blackberries with great happiness. The berries are dark and full. Her nose and paws are slightly stained. The forest around the patch is old and dappled. She is absorbed in the eating.`,
          composition: `Close mid shot. Harriet among the briars and berries, the berries at her level. She is eating with small, happy movements. The forest is soft focus around her.`,
          light:       `A sunlit gap in the canopy above the berry patch, warm and direct. The berries catch the light.`
        })
      },

      {
        id: 5,
        text: { en: `Beyond the berries, she found the clearing. It was small and round and completely unexpected, like a room with no ceiling, and on the floor of it, in the warm afternoon sun, wild strawberry plants grew so thickly she could barely see the ground. She stood at the edge and looked at it for a moment.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog standing at the edge of a sun-filled clearing, seeing wild strawberries for the first time.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} standing at the very edge of the clearing, looking in at the wild strawberry carpet. She has not yet entered. Her expression is of pure, still wonder. The clearing is ahead of her, bright and red and green and warm. She is in the darker forest edge, about to step forward.`,
          composition: `Wide shot. Harriet is at the left edge, just inside the tree line. The clearing opens ahead to the right, bright and full of strawberries. A threshold image of discovery.`,
          light:       `The clearing is flooded with warm afternoon sun, brilliant compared to the forest shade where Harriet stands. The contrast draws the eye and her into the light.`
        })
      },

      {
        id: 6,
        text: { en: `She walked in. She ate a great many wild strawberries, which were smaller and more intensely flavoured than any strawberry she had eaten before, which is always the way with things you find rather than things you are given. She sat in the sun with a full and happy stomach and felt very glad she had walked past the third beech tree.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog sitting in a sunny clearing surrounded by wild strawberries, looking completely satisfied.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} sitting in the full sun of the clearing, surrounded by wild strawberry plants. She is slightly pink about the nose, well-fed, perfectly still, and entirely content. The clearing is warm and quiet around her.`,
          composition: `Wide close shot. Harriet centred in the clearing, the strawberry plants thick around her. The open sky is above. A picture of small, perfect happiness.`,
          light:       `Full warm afternoon sun, the clearing bright and still. The most content, warmest image in the story.`
        })
      },

      {
        id: 7,
        text: { en: `When the sun began to go lower she realised she should go home. She turned around to face the forest she had come from. The trees looked different from this direction. The path she had come along was not immediately obvious. For the first time since leaving the third beech tree, she felt a small uncertain feeling.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog standing at the edge of the forest, looking in at the trees, uncertain of the direction.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} standing at the edge of the clearing facing the forest. The trees look different from this direction. She has her nose up, sniffing. Her expression has shifted to uncertain but not frightened. The clearing is golden behind her, the forest ahead is cooler.`,
          composition: `Mid shot. Harriet facing the forest from the clearing edge, her back to the strawberries. The trees ahead are the challenge. Eye drawn to her thoughtful, nose-up posture.`,
          light:       `The afternoon light is behind her now, casting her shadow into the forest ahead. The forest is cooler and more ambiguous.`
        })
      },

      {
        id: 8,
        text: { en: `Harriet sat down and thought about what her nose knew. It knew: oak leaves, her own nest, the specific damp of the path she usually used. She raised her nose and turned slowly, degree by degree. There. Not a strong smell, but her smell, pointing through the trees like a very faint thread.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog sitting very still with nose raised, turning slowly, identifying a direction.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} sitting completely still at the forest edge, nose raised to the maximum height she can manage, turning very slowly. Her eyes are closed with concentration. This is serious nose-work. The forest around her is still.`,
          composition: `Close mid shot. Harriet centred, nose up and turned. The forest is soft focus around her. All attention is on her nose and the invisible information it processes.`,
          light:       `Low afternoon light filtering through the trees, cool and dappled. A focused, thoughtful scene.`
        })
      },

      {
        id: 9,
        text: { en: `She followed her nose. It took her off the path she had used on the way, through a different part of the undergrowth, under a root she would not have chosen. But the smell grew stronger, and the trees became more familiar, and a wood pigeon she did recognise called from the tall ash tree she always used as a marker.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog pushing through undergrowth, following her nose home through the forest.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} pushing through low undergrowth, following an invisible scent trail. She is purposeful now, not lost. The path is different from the one she came by, but she is moving with increasing confidence. A familiar ash tree is visible ahead.`,
          composition: `Mid shot. Harriet pushing through the undergrowth, forward momentum. The ash tree is visible in the background, a landmark. Eye follows her direction.`,
          light:       `The light ahead through the trees is warmer, suggesting familiar territory.`
        })
      },

      {
        id: 10,
        text: { en: `The third beech tree appeared exactly where it should have been. She touched it with one paw as she went past, which she did not usually do but which felt right. The wood around it was her wood again: familiar beetles in familiar bark, familiar damp in familiar roots. She walked the last part quickly.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog touching a beech tree with one paw as she passes, recognising familiar territory.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} at the third beech tree, her paw resting briefly on its bark as she passes. The familiar wood is around her now. Her expression is relief and happiness. The beech tree is large and known. She is nearly home.`,
          composition: `Mid shot at the beech tree. Harriet's paw on the bark is the focal gesture. The familiar forest is warm around her.`,
          light:       `Warm late-afternoon light through the familiar canopy. Home light.`
        })
      },

      {
        id: 11,
        text: { en: `She came home when the first stars were coming out. She rolled herself into her leaf nest and looked up through the oak roots at the darkening sky, thinking about the clearing. She decided she would go back the next day. There might be more strawberries. And even if there were not, she liked knowing it was there.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog rolled up in her leaf nest, looking up through the oak roots at the first stars of evening.',
        imagePrompt: prompt({
          scene:       `${CAST.harriet} rolled comfortably into her leaf nest, not quite asleep, looking up through the oak roots at the evening sky where the first stars are appearing. Her expression is warm and planning. The nest is snug around her.`,
          composition: `Low interior shot of the nest. Harriet is in the centre, the oak roots curve above, the evening sky is visible through the gaps. Stars just appearing. A peaceful, complete end.`,
          light:       `Soft evening light from above through the roots. The first stars are tiny points. The nest is warm and enclosed.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `She did go back. The strawberries were there. And the beech tree was there on the way home, exactly as reliable as it had always been.` },
      image:    'assets/images/cartoon/hedgehog.svg',
      imageAlt: 'A cosy leaf nest at the foot of an oak tree with a single wild strawberry sitting on the doorstep.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: Harriet's round leaf nest in the oak roots, the entrance visible. On the ground at the entrance, a single wild strawberry, bright red, has been brought home. Evening light is on the nest. The familiar wood is around it.`,
        composition: `Close shot of the nest entrance and the strawberry. The nest is warm and round. The strawberry is the single bright accent. A small, complete, contented ending.`,
        light:       `Warm evening light on the nest and the strawberry. Soft and golden.`
      })
    }

  }));

})(window.APP);

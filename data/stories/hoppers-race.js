// ─── Hopper's Big Race ────────────────────────────────────────────────────────
//
// An original story (not a retelling of hare and tortoise). Lyrical prose.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Moral: being fast is good; paying attention is better.
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
    hopper: `Hopper the rabbit: a young brown rabbit in a soft yellow running-jacket and a red kerchief, with enormously powerful hind legs and ears that fly back when she sprints. The fastest in the meadow and she knows it, though not unkindly.`,
    theo:   `Theo the turtle: an old tortoise in a faded green waistcoat and a small panama hat, moving with the careful deliberateness of someone who has decided that speed is a matter of perspective and has made peace with this.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'hoppers-race',
    title:    { en: "Hopper's Big Race" },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'leaf',
    board:   null,
    color:   '#3a5a2a',

    // Reading metadata
    wordCount:   496,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['rabbit', 'turtle'],
    coverAnimal: 'rabbit',

    // Unlock requirement
    requirements: [
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit'   },
      { animalId: 'turtle', minCount: 1, label: 'Find the Tortoise' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/rabbit.svg',
      imageAlt: 'A rabbit and a tortoise both wearing daisy crowns, walking home together side by side.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.hopper} and ${CAST.theo} walking side by side along a meadow path, both wearing crowns of daisy-chains on their heads. The old gate they raced to is just behind them. Hopper walks at a comfortable pace. Theo walks at his usual pace. Both look entirely satisfied.`,
        composition: `Wide mid shot. Both characters walking together, daisy crowns on, the gate behind them, the meadow ahead. Eye drawn to the daisy crowns and the companionable walking pace.`,
        light:       `Warm afternoon sun from the left, the meadow green and golden, both animals in full light.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Hopper the rabbit was the fastest animal in the meadow, the neighbouring meadow, and probably the one beyond that. She had never officially tested this claim but she was confident. She could cover the full length of the meadow in eleven hops and was never quite sure why this was not more impressive to other people.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit in a yellow jacket mid-leap across a wide meadow, ear streaming back.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} at the apex of a great leap across the meadow, hind legs extended, ears streaming back, yellow jacket a streak of colour. The meadow is wide below her, clover and grasses, the hedgerow distant. She is the only moving thing in a still landscape and she is moving very fast indeed.`,
          composition: `Wide shot. Hopper in mid-leap is the subject, small and fast against the large meadow. Speed is everything in this image.`,
          light:       `Bright clear summer sun, the meadow vivid green, the rabbit lit full and warm.`
        })
      },

      {
        id: 2,
        text: { en: `She challenged Theo the turtle to a race on a Tuesday, mostly because she had not had a race in three weeks and was feeling underutilised. The course was across the meadow from the old oak to the gate at the far end. Theo accepted, adjusting his panama hat, with an expression of deep equanimity.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A tortoise adjusting his panama hat and looking at a rabbit with calm equanimity.',
        imagePrompt: prompt({
          scene:       `${CAST.theo} adjusting his small panama hat with one front foot, looking at ${CAST.hopper} with complete composure. Hopper is mid-bounce, eager and assuming. The old oak behind them and the meadow gate in the far distance frame the race course.`,
          composition: `Mid shot. Theo calm and centred, Hopper energetic to his left. The meadow gate is visible in the background. Eye drawn to the contrast in their postures.`,
          light:       `Clear morning sun, the meadow ahead bright and open.`
        })
      },

      {
        id: 3,
        text: { en: `Ready, steady, go. Hopper was gone. She covered a quarter of the meadow in the time Theo took to take three steps. She looked back once and saw him setting off steadily with his hat on, and she turned around and ran some more, and did not look back again for some time.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit far ahead in the meadow, the tiny figure of the tortoise just beginning at the distant start.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} in full sprint, a quarter of the meadow ahead of her. Behind her in the far distance, ${CAST.theo} is just three steps from the start, walking steadily. The meadow between them is wide and green. The rabbit is fast; the turtle is just beginning.`,
          composition: `Wide shot. Hopper fills the right foreground, fast and close. Theo is tiny in the left background, at the start. The full meadow is between them.`,
          light:       `Full midday summer sun, the meadow bright, the distance clear.`
        })
      },

      {
        id: 4,
        text: { en: `She stopped to look at a dragonfly. It was a remarkable dragonfly, iridescent blue and perfectly still on a stem, and she had never looked carefully at a dragonfly before. She looked at it for what turned out to be four minutes. Then she ran on.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit crouched in the grass examining a blue dragonfly on a stem.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} crouched low in the meadow grass, face very close to a stem where a perfect iridescent blue dragonfly rests. Her ears are forward, all her attention on the dragonfly. She has completely forgotten she is in a race.`,
          composition: `Close mid shot. Hopper and the dragonfly are the subjects, close together. The meadow grass surrounds them. The dragonfly is the focal point, small and exquisite.`,
          light:       `The sunlight catches the dragonfly's wings in a shimmer of iridescent colour. Hopper is in the shade of the grass stems.`
        })
      },

      {
        id: 5,
        text: { en: `She chased a butterfly in three broad circles over the clover patch, and caught it, and let it go, and then felt very pleased about this for approximately another three minutes. Then she ran on. When she looked back, Theo was visible now, about a third of the way across the meadow, making steady progress.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit spinning in circles after a butterfly over a clover patch, carefree.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} jumping in a spiral after a yellow butterfly over a clover patch. She is mid-spin, coat flying. The butterfly is ahead of her. She is entirely absorbed in this. In the background, ${CAST.theo} is a small steady shape crossing the meadow.`,
          composition: `Wide mid shot. Hopper's spiral is the energetic centre. Theo's steady progress is a small background note. The clover patch is bright around her.`,
          light:       `Full afternoon sun, the clover patch warm, the butterfly catching light.`
        })
      },

      {
        id: 6,
        text: { en: `She found a small stream she had not noticed before, crossing the meadow diagonally. She sat on the bank and watched the water beetles for six full minutes, which are quite long minutes when you are also supposed to be winning a race.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit sitting by a small stream watching water beetles, comfortable and forgetful.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} sitting comfortably on the bank of a narrow stream, watching small water beetles skimming the surface. Her racing posture is entirely gone. She is relaxed, curious, chin on one paw. The stream is unexpected and the beetles are interesting.`,
          composition: `Close mid shot. Hopper on the bank, the stream below her, the beetles on the surface. A quiet, absorbed scene. The race is not in this image at all.`,
          light:       `Afternoon sun on the stream, the water glittering. Cool shade from the bank. A gentle, pleasant scene.`
        })
      },

      {
        id: 7,
        text: { en: `She lay in the clover on the far side of the stream and watched the clouds for a while. There was one that looked like a very large cabbage and one that looked like a cart and one that she could not decide about. She decided to rest her eyes, just for a moment.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit lying in the clover looking up at clouds, entirely at rest.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} lying flat on her back in the long clover, both ears spread on the grass, looking up at summer clouds. Her expression is entirely peaceful and not at all racing. A cabbage-shaped cloud is visible above her. The meadow around her is still and warm.`,
          composition: `Close wide shot. Hopper flat on the grass, the sky above her filling the upper half of the frame. The clouds are the world above. A perfect resting image.`,
          light:       `Warm afternoon sun, slightly filtered by the clouds. The clover is warm around her.`
        })
      },

      {
        id: 8,
        text: { en: `She was not asleep. She was almost asleep. She woke to find that the sky had shifted and a shadow had fallen across her face. The shadow was Theo, walking past her at his steady pace, hat on, four steps from the gate. He looked at her with kind, patient eyes and said nothing, which was very tactful.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A tortoise walking calmly past a rabbit who has just woken up in the clover, four steps from the finish.',
        imagePrompt: prompt({
          scene:       `${CAST.theo} walking steadily past ${CAST.hopper} who is sitting up from the clover, blinking, just woken. The gate is four paces ahead of Theo. He looks at her with gentle patience. She looks at the gate and at him.`,
          composition: `Mid shot. Theo walking past, the gate close ahead. Hopper sitting up in the clover to the side. The distance between them and the gate is the whole scene.`,
          light:       `Afternoon sun, lower now, longer shadows. Theo's shadow falls across Hopper. Time has passed.`
        })
      },

      {
        id: 9,
        text: { en: `Hopper bounded to her feet and ran. She covered the last twenty paces in two leaps and touched the gate a good second before Theo. She won. She stood at the gate, panting, and watched him arrive. He touched the gate and said, politely: "A good race." "For who?" said Hopper. Theo smiled. "For both of us," he said.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit touching the gate first, looking back at a tortoise arriving steadily behind.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} at the gate, one paw on it, panting, looking back. ${CAST.theo} approaches steadily and arrives, placing his front foot on the gate beside her paw. Both at the gate. The meadow behind them. Both expressions different: she looks thoughtful; he looks entirely satisfied.`,
          composition: `Mid shot at the gate. Both characters arriving at it from the same direction. The meadow behind. Eye drawn to the two paws on the gate and the two very different expressions.`,
          light:       `Late afternoon light, warm and long. The gate and the meadow behind are golden.`
        })
      },

      {
        id: 10,
        text: { en: `Hopper thought about this for a while. Then she took off her kerchief and tied it into a ring of loops and set it on Theo's head like a crown. Then she made herself one from the daisies in the clover nearby. They stood at the gate in their crowns for a while. It felt like the right thing to do.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit placing a daisy crown on a tortoise\'s head, both at the finishing gate.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} standing on her hind legs to place a daisy crown on ${CAST.theo}'s head. He is still and patient for this. Her own kerchief-crown is on her head already. Both are at the gate. It is a moment of genuine friendship at the end of a race.`,
          composition: `Close mid shot. Hopper is reaching up, the crown in her paws. Theo receives it with dignity. The gate is behind them, the meadow gold in the late sun.`,
          light:       `Warm golden late afternoon light, everything bathed in it. The most golden scene in the story.`
        })
      },

      {
        id: 11,
        text: { en: `They walked home together, one at bounding-pace and one at steady-pace, which meant Hopper went ahead and then came back and went ahead again, and in this way they covered the meadow at roughly the same time. She had seen more of the meadow today than she ever had. She was glad she had looked.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit bounding ahead, then stopping to wait for a steady tortoise, both crossing a golden meadow.',
        imagePrompt: prompt({
          scene:       `${CAST.hopper} bounding ahead on the meadow path, then turning back to wait for ${CAST.theo} who comes steadily behind. Both wearing crowns. The meadow around them is golden in the evening light. A pattern of coming and going that adds up to together.`,
          composition: `Wide shot. Hopper is ahead-and-turning, Theo is steady behind. The meadow around them glows. A dynamic but warm companionship scene.`,
          light:       `Evening golden light, the meadow rich and warm. The two crowns catch the light.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `She still wins every race. But she stops for the dragonflies now. And the beetles, and the clouds, and whatever else the meadow has put there. It turns out the meadow has put quite a lot.` },
      image:    'assets/images/cartoon/rabbit.svg',
      imageAlt: 'A daisy chain crown on a fence post at the old gate, the evening meadow behind it.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: a daisy chain crown resting on the top of the old gate post at the meadow edge. The evening meadow stretches behind it, golden and still. A single blue dragonfly perches on the gate rail below the crown. The meadow is beautiful and full.`,
        composition: `Close shot of the gate post and crown, the meadow behind. The dragonfly is a small accent below. A still, beautiful, remembering end image.`,
        light:       `Evening golden light on the crown and gate. The dragonfly catches a shimmer. The meadow glows behind.`
      })
    }

  }));

})(window.APP);

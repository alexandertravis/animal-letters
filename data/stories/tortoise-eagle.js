// ─── The Tortoise and the Eagle ───────────────────────────────────────────────
//
// An original story. Lyrical prose, no rhyme.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Theme: wonder, perspective, the gift of seeing the world differently.
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
    teo:   `Old Teo the tortoise: a large, ancient tortoise with a domed shell of dark olive and amber, a wrinkled patient face, slow wise eyes, and a small green waistcoat. He moves with deliberate care and has seen many seasons, though never the horizon.`,
    eagle: `Serena the eagle: a large golden eagle with tawny-gold feathers, a white-feathered head, wide watchful eyes, and enormous wing-span. She wears a simple leather bracer on one wing, not unkind, and not accustomed to being asked favours.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'tortoise-eagle',
    title:    { en: 'The Tortoise and the Eagle' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'dustblue',
    board:   null,
    color:   '#3a5a7a',

    // Reading metadata
    wordCount:   502,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['turtle', 'eagle'],
    coverAnimal: 'eagle',

    // Unlock requirement
    requirements: [
      { animalId: 'turtle', minCount: 1, label: 'Find the Tortoise' },
      { animalId: 'eagle',  minCount: 1, label: 'Find the Eagle'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/eagle.svg',
      imageAlt: 'A great golden eagle carrying an old tortoise gently in her talons, both high above a wide landscape.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.eagle} in full flight, wings spread wide against a soft blue sky. Held gently in her talons below, ${CAST.teo} the tortoise looks down at the world with wide, astonished eyes. The landscape far below shows meadow, river, and distant hills. The eagle is enormous and the tortoise is small but clearly safe.`,
        composition: `Wide aerial shot. The eagle fills the upper half of the frame, wings spread. The tortoise hangs below her, the world spread below him. Sky and landscape give enormous depth. Eye drawn to the tortoise's face of wonder.`,
        light:       `Clear high-altitude light, the sun from the right catching the eagle's gold feathers and the tortoise's amber-olive shell. Crisp and open.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Old Teo the tortoise lived in a meadow beside a stream, and he had lived there for so long that the grasses had grown tall around his shell and he had learned the name of every beetle in the bank. He was not unhappy. But one autumn, when the eagles came south on the wind, something began to stir in him.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'An old tortoise sitting in a meadow, watching eagles soar overhead in the autumn sky.',
        imagePrompt: prompt({
          scene:       `${CAST.teo} sitting in a lush meadow, tall grasses and wildflowers around his shell. He is looking up at the sky where two distant eagle shapes soar in wide circles. His expression is thoughtful and yearning. The meadow is rich and detailed around him: small beetles in the grass, stream visible at the edge, autumn colour on the far hedgerow.`,
          composition: `Wide mid shot, low angle. Teo is centred and low, close to the ground. The sky above is large and open, the eagles tiny distant shapes. Eye drawn to the contrast between his earthbound world and the open sky.`,
          light:       `Rich autumn afternoon light, the meadow amber and gold, the sky a clear washed blue.`
        })
      },

      {
        id: 2,
        text: { en: `Every morning he watched the eagles circle higher and higher on the warm air, until they were small as seeds against the blue sky. He wondered what the meadow looked like from up there. He wondered what was beyond the hill. He had never seen beyond the hill. He was a tortoise, and the hill was a very long walk away.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'An old tortoise watching a distant eagle high in the sky, a hill on the horizon.',
        imagePrompt: prompt({
          scene:       `${CAST.teo} standing at the highest point of his meadow, looking at the hill on the horizon and the single eagle circling above it. His neck is extended, head tilted up and forward. The hill is far and soft, the eagle barely visible. The sense of distance between where he stands and where he wishes to see from is vast.`,
          composition: `Wide shot. Teo small in the left foreground, the meadow rolling toward the hill in the centre, the eagle tiny in the upper right sky. The whole image breathes distance and longing.`,
          light:       `Morning light from the right, clear and directional. Long shadows across the meadow from Teo.`
        })
      },

      {
        id: 3,
        text: { en: `One morning he found an eagle sitting on his favourite flat rock. She was very large and very still and was regarding a beetle with calm professional interest. "Good morning," said Teo. She looked at him. "Good morning," she said. "Would you," said Teo, as carefully as he could, "ever consider carrying someone?"` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'An old tortoise talking to a large golden eagle sitting on a flat rock.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} perched on a large flat rock in the meadow, regarding a beetle below with one eye. ${CAST.teo} stands near her, his head slightly raised. Their size difference is considerable. The eagle is calm and alert; the tortoise is gathering his courage. A small beetle is just visible between them.`,
          composition: `Mid shot. The eagle on the rock takes the right side and upper portion of the frame. Teo is smaller on the left, ground level. Eye drawn to the size contrast and Teo's earnest upturned face.`,
          light:       `Clear morning sun from the left, catching the eagle's golden feathers and Teo's domed shell.`
        })
      },

      {
        id: 4,
        text: { en: `The eagle looked at him for a long time. "You want to fly," she said. "Not fly," said Teo. "Just see. Once. I would like to see what you see." She looked at the hill on the horizon and then back at him. "I can carry you safely," she said, at last. "Your shell will hold."` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'The eagle looking down at the tortoise with a thoughtful expression, the horizon behind her.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} looking down at ${CAST.teo} with a measuring, thoughtful gaze. Her head is tilted. Her wings are folded. Teo meets her gaze steadily. The horizon with the distant hill is visible behind the eagle. A moment of decision.`,
          composition: `Mid shot, the eagle upper and right, the tortoise lower and left. Eye moves between their two faces. The hill on the horizon is visible behind the eagle's wing.`,
          light:       `Clear, even morning light. Neither shadow nor drama, just two creatures making a careful agreement.`
        })
      },

      {
        id: 5,
        text: { en: `She gripped his shell gently in both talons. She opened her wings, and they rose. Teo felt the ground leave and his heart did something it had never done before. He looked down. The grass was already small. The stream was a shining thread. His flat rock was a pebble. He held very still.` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'The eagle rising with the tortoise held in her talons, the meadow and stream shrinking below.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} in rising flight, wings fully spread, ${CAST.teo} held safely below in her talons. Below them the meadow is already distant, the stream a thin silver line, the flat rock just visible. Teo looks down with wide, held-breath eyes. The sky opens above.`,
          composition: `Wide upward shot from below and behind. The eagle's wings spread across the upper frame. Teo is below her, looking down at the shrinking world. Eye travels from the great wings to the tortoise's face to the landscape below.`,
          light:       `Clear open sky light, the sun above them, the world below lit from above. Bright, open, exhilarating.`
        })
      },

      {
        id: 6,
        text: { en: `Higher still. He could see the whole meadow now, a green-and-gold patch between the dark of the forest and the silver of the river. He could see two other rivers. He had not known there were two. He could see the hill, and beyond the hill, another valley full of something he could not quite make out.` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'The view from above: meadow, two rivers, the hill, and a distant valley, seen from the perspective of the eagle and tortoise.',
        imagePrompt: prompt({
          scene:       `An aerial view looking downward from a great height. The meadow is a small coloured patch below, the river glinting in two separate channels, the forest dark, the hill visible with its valley beyond. ${CAST.teo}'s small shell is visible in the lower part of the frame in the eagle's grip, and his face looks down at it all with overwhelming wonder.`,
          composition: `Aerial wide shot looking down. The world below is the subject. Teo's shell and face are in the lower frame looking at it. Eye sweeps the landscape and rests on his expression.`,
          light:       `High, open, clear sky light. The landscape below is lit from above, shadows soft and small. Everything wide and exposed.`
        })
      },

      {
        id: 7,
        text: { en: `"What is that?" he called up to her. "A village," she called back. "I have seen it every morning for twelve years." He had never seen a village before. He had known about them, in the way that you can know about something without having any idea what it actually looks like. It looked like firelight arranged in squares.` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'High above, a tiny village visible far below, the tortoise looking toward it with wonder.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} in level flight, ${CAST.teo} held below her, both looking toward the horizon where a small cluster of cottages is visible in a valley, smoke curling from chimneys, sunlight on windows. The village is tiny and perfect at this distance. Teo's face is toward it.`,
          composition: `Wide aerial mid shot. The eagle and tortoise cross the left side of the frame, the village small in the right distance. A sense of approaching something new.`,
          light:       `Clear afternoon light from the side, the village catching warm sun in its windows, the smoke pale against the sky.`
        })
      },

      {
        id: 8,
        text: { en: `And then, quite unexpectedly, he began to cry. It was not sadness. He did not have a word for what it was. He had lived a hundred and twelve years in the meadow, and the meadow was sixty metres wide, and the world was enormous and beautiful and he had not known, had not known, had not known.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'The tortoise held high in the sky, face wet with tears of wonder, looking at the wide world below.',
        imagePrompt: prompt({
          scene:       `Close on ${CAST.teo}'s face as he hangs in the eagle's grip above the world. His ancient eyes are wet. His expression is not sad: it is overwhelmed with something wordless and large. The sky is all around him. The world is vast below. His face is the whole picture.`,
          composition: `Close shot on the tortoise's face. The sky is all background. His face, wet with tears, is entirely readable and expressive. A portrait of wonder.`,
          light:       `Open sky light, clear and soft. The light on his ancient face is gentle.`
        })
      },

      {
        id: 9,
        text: { en: `"Are you all right?" called the eagle. "Yes," he said. "More than all right." He looked at the rivers and the village and the forest and the hills beyond the hills, and he stayed like that for what felt like a long time and was probably ten minutes. Then he said, very quietly: "Thank you. I am ready now."` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'The eagle and tortoise high in the sky, the tortoise looking peaceful and complete, the world spread below.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} and ${CAST.teo} in level flight in the wide sky. Both are calm now. Teo's expression has settled into something peaceful and complete. He is still looking at the world below. The eagle's head is tilted toward him slightly.`,
          composition: `Wide mid-aerial shot. Both characters in the sky, the world below. A calm, harmonious image after the emotional peak. Eye rests on the two figures together.`,
          light:       `The light has shifted to a slightly lower afternoon angle, warmer, gentler. Everything golden and settling.`
        })
      },

      {
        id: 10,
        text: { en: `The eagle brought him down as slowly as she could, banking in long circles, and he watched the meadow grow and grow until he could see his stream and his flat rock and the exact patch of grass where he had stood that morning and looked up. He set his feet on the ground and she released him.` },
        image:    'assets/images/cartoon/eagle.svg',
        imageAlt: 'The eagle setting the tortoise gently down in his meadow, the stream and flat rock behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.eagle} landing gently in the meadow, setting ${CAST.teo} down on the grass with great care. His flat rock and the stream are visible behind him. The eagle's wings are still partially spread from landing. Teo's feet are on his grass. His face is still, calm, utterly changed.`,
          composition: `Wide mid shot in the meadow. The eagle landing takes the left, Teo touching down on the right. The familiar meadow details are in the background. A return scene, but nothing is quite the same.`,
          light:       `Warm late-afternoon light in the meadow. The same light as always in the meadow, but Teo sees it differently now.`
        })
      },

      {
        id: 11,
        text: { en: `He sat in his meadow for a long time and looked at the sky. He looked at his beetles and his stream and his flat rock. He knew now what was beyond the hill. And what was beyond that hill. He felt very full, and very still. When the eagle circled overhead at dawn, he lifted one slow paw in greeting.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'An old tortoise sitting quietly in his meadow, raising one slow paw toward an eagle soaring high overhead.',
        imagePrompt: prompt({
          scene:       `${CAST.teo} seated in his meadow in the early morning, one paw raised slowly in greeting toward a distant eagle shape soaring high in the pale sky above. His expression is peaceful and rich. The meadow is the same as always but he sits in it differently now. His flat rock is behind him.`,
          composition: `Wide shot. Teo small and centred in his meadow, the raised paw the focal gesture. The eagle is a small shape in the pale morning sky above. The space between them is the whole story.`,
          light:       `Early morning light, pale and clear. The meadow is still in dew. The eagle in the sky catches the first sun. A quiet, complete image.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `He still lives in his meadow. He knows all the same beetles. But now he knows what the meadow looks like from far above, and that knowledge has changed everything about how he sees the ground beneath his feet.` },
      image:    'assets/images/cartoon/turtle.svg',
      imageAlt: 'A flat rock in a meadow with a single eagle feather resting on it, the sky reflected in the stream nearby.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: Teo's flat rock in the meadow, a single golden eagle feather resting across it. The stream nearby reflects a clear blue sky. Small beetles move in the grass around the rock. The world is small and peaceful and now known to be enormous.`,
        composition: `Close shot of the rock and feather. The feather is the warm accent. The stream reflection is behind. The beetles are tiny detail around the base. A beautiful, quiet, complete ending.`,
        light:       `Warm afternoon meadow light. Still and golden.`
      })
    }

  }));

})(window.APP);

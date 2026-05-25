// ─── The Frog Who Wished to Fly ───────────────────────────────────────────────
//
// An original story in the Aesop tradition. Lyrical prose, no rhyme.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: the things you have are worth celebrating, not exchanging.
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
    felix: `Felix the frog: a small bright-green frog with wide amber eyes and long, powerful hind legs. He wears a tiny sage-green waistcoat, unbuttoned, and sits very upright when thinking and very compact when about to jump. His expression is earnest and frequently wistful.`,
    owl:   `An old tawny owl in a deep burgundy waistcoat and half-moon spectacles, perched on high things and viewing the world with patient, well-informed calm. Not unkind, but also not in the business of pretending things are other than they are.`,
    duck:  `A friendly white duck in a blue pinafore, always in or near the water, cheerful and unhurried, fond of Felix and occasionally baffled by him.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'frog-wishes',
    title:    { en: 'The Frog Who Wished to Fly' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'teal',
    board:   null,
    color:   '#2a5a5a',

    // Reading metadata
    wordCount:   493,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['frog', 'owl', 'duck'],
    coverAnimal: 'frog',

    // Unlock requirement
    requirements: [
      { animalId: 'frog', minCount: 1, label: 'Find the Frog' },
      { animalId: 'owl',  minCount: 1, label: 'Find the Owl'  }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/frog.svg',
      imageAlt: 'A small green frog sitting on a lily pad, looking up at swallows wheeling in the blue sky above.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.felix} sitting very upright on a large lily pad, both hands on his knees, face tilted upward. Above him in the open sky, two swallows wheel in graceful arcs. The pond around him reflects the sky. The bank is lush with rushes and water-meadow flowers. His expression is wistful and yearning.`,
        composition: `Wide shot. Felix is small and centred on the lily pad in the lower half of the frame. The swallows are tiny and high in the upper half. The sky and its reflection in the pond give a great sense of open space around the small wishing frog.`,
        light:       `Clear, bright summer light, the sky a washed blue, the pond glittering, warm sun on Felix's green back.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Felix the frog lived on a lily pad in the middle of a round green pond, and he was very good at being a frog. He could swim. He could dive. He could sit completely still for so long that dragonflies landed on his head. But every time he looked up at the sky, he felt a great empty wishing feeling in his chest.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A green frog sitting on a lily pad looking up at the sky, a dragonfly on his head.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} sitting on a lily pad, perfectly still, a small blue dragonfly perched on top of his head. He is looking up at the sky above him, his amber eyes wide and dreaming. The pond is calm around him. The bank with rushes is soft in the background. His expression is gentle and longing.`,
          composition: `Close mid shot. Felix centred on the lily pad, the sky above occupying the upper third of the frame. The dragonfly on his head is a small, charming detail. Eye drawn to his upward gaze.`,
          light:       `Soft summer morning light on the pond, the sky above clear and blue, bright reflections on the water around the lily pad.`
        })
      },

      {
        id: 2,
        text: { en: `Swallows flew above the pond every evening, and Felix watched them with his chin on his knees. "How do you do it?" he called up one day. A swallow curved down close. "Hollow bones," she said cheerfully, "and feathers, and wings. You would need all three." She swept back up and was gone.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A swallow swooping close to a frog on a lily pad, the two in brief conversation.',
        imagePrompt: prompt({
          scene:       `A swallow in a steep dive, wings pulled back, coming within a metre of ${CAST.felix} on his lily pad. The frog leans forward eagerly. The swallow's expression is friendly and brief. The sky and pond stretch around them, the swallow's arc cutting through the frame.`,
          composition: `Dynamic mid shot. The swallow's dive is the dominant line in the frame, the frog at the bottom of the arc. A sense of speed and lightness from the bird, weight and stillness from the frog.`,
          light:       `Evening light from the right, warm amber, the swallow catching the glow on its breast, the frog lit from the side.`
        })
      },

      {
        id: 3,
        text: { en: `"Wings," said Felix to himself. He climbed to the very top of the tallest lily pad stem, which was not very tall, and spread his arms as wide as they would go. He had good arms for a frog. He jumped. He went up, and sideways, and very much down. He landed in the pond with a tremendous splash.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog mid-leap from a lily pad, arms spread wide, a large splash beneath him.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} mid-leap from a lily pad stem, arms spread wide, face determined. His legs are trailing behind him. Below him a large splash is already beginning where he is about to land. The trajectory is very clearly sideways and downward, not up. A comic moment of genuine effort and immediate consequence.`,
          composition: `Action mid shot. The frog is caught at the apex of his leap, the splash below. His spread arms create a wide silhouette. Eye follows his arc from stem to imminent splash.`,
          light:       `Clear daylight, the pond bright, the splash catching the light in droplets.`
        })
      },

      {
        id: 4,
        text: { en: `He tried from a tall rush stalk. He tried from the bank. He tried from a mossy log. Each time the result was instructive but wet. The duck, who had watched all of this with mild interest, paddled over and said, "Felix, what exactly are you doing?" "Trying to fly," he said. "Ah," she said, and paddled away.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A duck watching from the water as a frog climbs a mossy log, preparing to jump again.',
        imagePrompt: prompt({
          scene:       `${CAST.duck} floating in the pond, watching with polite bewilderment as ${CAST.felix} climbs a mossy half-submerged log at the water's edge. Several splashmarks on the nearby water suggest previous attempts. The frog is focused and determined. The duck's expression is kind and confused.`,
          composition: `Wide mid shot. The log and frog are on the left, the duck in the water to the right. The evidence of previous attempts (ripple marks) surrounds them. A quiet comedy of persistence and witness.`,
          light:       `Afternoon light, the pond in soft shadow near the log, brighter in the open water where the duck floats.`
        })
      },

      {
        id: 5,
        text: { en: `That evening the old owl came to his branch above the pond, as he did every evening at dusk. Felix swam over and looked up at him. "Owl," he said, "I want to fly. What should I do?" The owl looked down over his spectacles for a long time without saying anything. Then he said: "What can you already do?"` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An old owl on a branch above the pond, looking down at a small frog in the water below.',
        imagePrompt: prompt({
          scene:       `${CAST.owl} perched on a low branch above the pond's edge, looking down over his half-moon spectacles at ${CAST.felix} in the water below. The owl is calm and large on his branch. The frog is small and earnest in the water. Dusk is beginning, the sky pink-amber.`,
          composition: `Mid shot from water level. The frog is in the foreground, small and looking up. The owl is above on his branch, looking down. The sky behind is dusk-coloured. The height difference tells the story.`,
          light:       `Dusk light, warm amber and pink, the owl's branch in the last of the light, the pond surface reflecting the coloured sky.`
        })
      },

      {
        id: 6,
        text: { en: `Felix told him about the swimming, and the diving, and the sitting still. The owl listened to all of it. "And the jumping?" said the owl. "Oh," said Felix. "Yes, the jumping." He had not thought much of the jumping. "Show me," said the owl. Felix gathered himself on a lily pad and jumped.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog leaping powerfully from a lily pad, the owl watching from his branch.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} in a perfect, powerful leap from a large lily pad, hind legs fully extended, body long and arcing. This jump looks different from the splashy attempts before: it is clean and high and purposeful. ${CAST.owl} watches from his branch, spectacles on, expression attentive.`,
          composition: `Side-on mid shot. The frog's arc is the main line, starting from the lily pad left and peaking right-centre. The owl on his branch is in the upper right, watching. A clean, beautiful jump, different in character from the clumsy earlier attempts.`,
          light:       `Dusk light, the frog's arc catching the last amber sun, the lily pad and pond below in shadow.`
        })
      },

      {
        id: 7,
        text: { en: `He went very high. He hung for a moment at the top, suspended above the pond, the whole world spread below him: the water and the rushes and the meadow and the far hills. Then he came back down. "That," said the owl quietly, "was as close to flying as most things ever get."` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog at the apex of a great leap, suspended above the pond, the world spread below him.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} at the very top of his arc, suspended in the air above the pond. Below him the pond is a mirror, the rushes are tiny, the meadow stretches away to soft hills on the horizon. His eyes are wide open, taking it all in. For one moment he is as close to flying as a frog has ever been.`,
          composition: `Wide aerial shot, the frog small and centred, the world spread below him. The horizon is visible. A moment of wonder and perspective.`,
          light:       `The last warm light of dusk from the right, catching the frog from the side, the world below in the rich amber of late evening.`
        })
      },

      {
        id: 8,
        text: { en: `Felix sat on the lily pad and thought about what he had seen. He had seen the whole pond at once. He had seen the lane beyond the meadow and the hill with the windmill on it and the tiny shape of the village. He had not known any of those things were there. He sat with this for a while.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog sitting quietly on a lily pad in the evening, thinking, the pond calm around him.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} sitting quietly on his lily pad, chin on hand, thinking. The pond is still. The sky above is deepening to evening purple-blue. His expression is thoughtful and somehow more at peace than before. The world around the pond is soft and still.`,
          composition: `Quiet close mid shot. Felix centred on the lily pad, the still pond around him, the darkening sky above. No movement, all reflection. A contemplative scene.`,
          light:       `Evening light, sky deepening to a soft blue-purple, the pond reflecting it, everything calm and settling.`
        })
      },

      {
        id: 9,
        text: { en: `The next evening he jumped again. And the next. He began to find that every jump was slightly different if he changed the angle or the force or the curve of his back. He discovered he could spin. He discovered he could twist. He discovered that jumping, done with care, was quite complicated and rather wonderful.` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog mid-spin in the air, a joyful and precise jump, the pond below.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} mid-air in a controlled spiral twist, hind legs tucked, body rotating beautifully above the pond. This is clearly a practiced and deliberate movement. His amber eyes are bright with concentration and joy. The pond glitters below.`,
          composition: `Dynamic mid shot. The frog's twist is the main figure, caught in mid-rotation. The lily pad is visible below-left, the sky above. A technical, beautiful, joyful image.`,
          light:       `Clear afternoon light, the frog catching sunlight at the top of his arc, the pond glittering below.`
        })
      },

      {
        id: 10,
        text: { en: `The duck started coming to watch. A pair of moorhens came. Even the swallows sometimes looped lower in their evening circles, and once, on a Friday in August, the old owl flew over the pond twice in the same minute, which was very unusual for him.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A frog jumping with an audience of animals watching admiringly from the bank and the water.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} at the peak of a high jump, watched from the bank by a small audience: ${CAST.duck} in the water, two moorhens on the bank, and ${CAST.owl} on his branch, all watching. The swallows loop in the sky above. Felix is the clear star of the scene.`,
          composition: `Wide mid shot. Felix is in the upper-centre of the frame at the apex of his jump. His audience is arranged below and around. The swallows are small in the sky above. Eye goes to Felix, then tours the watching figures.`,
          light:       `Golden August afternoon light, warm and full, everything lit and clear.`
        })
      },

      {
        id: 11,
        text: { en: `One evening the duck swam alongside and said: "Felix, you are the best jumper I have ever seen." Felix looked at the sky and then at the pond and then at his own strong legs. He had not thought of himself that way before. "Thank you," he said. He was quiet for a moment. "I think I might jump again."` },
        image:    'assets/images/cartoon/frog.svg',
        imageAlt: 'A frog and a duck side by side at sunset, the frog looking thoughtful and happy.',
        imagePrompt: prompt({
          scene:       `${CAST.felix} and ${CAST.duck} side by side at the edge of the lily pad, in the warm light of a summer sunset. The frog is looking at his own hind legs with a new, gentle pride. The duck watches him with a warm, fond expression. The pond is golden with reflected sunset.`,
          composition: `Close mid shot. Both characters side by side, the sunset pond behind them. Felix's downward gaze at his legs is the focal point. A quiet, warm friendship scene.`,
          light:       `Warm sunset gold, the pond a mirror of it. Everything amber and content.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `He is still jumping. Every evening, just at dusk, if you watch the pond carefully, you might see him go up. Just for a moment, he is at the top, and the world is very wide.` },
      image:    'assets/images/cartoon/frog.svg',
      imageAlt: 'A lily pad on a still evening pond, a perfect ring of ripples on the water where a frog has just leaped.',
      imagePrompt: prompt({
        scene:       `A still evening pond at dusk. A single large lily pad in the centre. On the water around it, a perfect ring of ripples expands outward from where Felix has just leaped. He is not in frame yet, only the evidence of his departure. The sky above is deep amber and soft purple. The pond reflects it.`,
        composition: `Wide still shot, the lily pad centred, the ripples expanding around it. Sky above, reflection below. No frog visible — just his trace. A beautiful, light-touch ending.`,
        light:       `Dusk, amber and purple, the pond a soft mirror of the sky above.`
      })
    }

  }));

})(window.APP);

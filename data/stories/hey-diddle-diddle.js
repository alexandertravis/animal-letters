// ─── Hey Diddle Diddle ────────────────────────────────────────────────────────
//
// A classic nursery rhyme expanded into a lyrical story for young children.
// 11 paragraphs · ~488 words · 4 min read-aloud at toddler pace.
// A story of magic, music, and the wonderful silliness of midsummer nights.
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
    cat: `Elegant tabby cat, a cream waistcoat with small pearl buttons, a dark green velvet collar, carrying a tiny fiddle tucked under one arm, an expression of quiet musical authority.`,
    cow: `Gentle black-and-white dairy cow, a daisy chain crown around her head, large soft dark eyes, an air of deep and genuine happiness.`,
    dog: `Small scruffy brown terrier dog, a red spotted neckerchief knotted loosely, warm laughing eyes, absolutely incapable of remaining still for more than a moment.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'hey-diddle-diddle',
    title:    { en: 'Hey Diddle Diddle' },
    subtitle: 'a nursery rhyme, retold',

    // Library presentation
    skin:    'classic',
    leather: 'forest',
    board:   'sage',
    color:   '#1b4332',

    // Reading metadata
    wordCount:   490,
    readMinutes: 4,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['cat', 'cow', 'dog'],
    coverAnimal: 'cat',

    // Unlock requirement
    requirements: [
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' },
      { animalId: 'dog', minCount: 1, label: 'Find the Dog' },
      { animalId: 'cow', minCount: 1, label: 'Find the Cow' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'A tabby cat on a garden wall under a full moon, bow raised to her tiny fiddle, the night sky brilliant with stars behind her.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.cat} stands on a garden wall in the midsummer night, bow raised to her small fiddle, about to play. The full moon hangs enormously behind her. The night sky is extraordinary with stars. Below, the garden is dark and fragrant. In the garden, ${CAST.cow} and ${CAST.dog} are small figures just beginning to gather.`,
        composition: `Wide portrait. The cat on the wall is central and upper, against the huge moon. The garden below is the lower half, the cow and dog small in the darkness. The moon frames the cat perfectly.`,
        light:       `Full moon light, silver-white and magical. The cat is lit from behind and above. The garden below is in warm shadow.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `On a warm midsummer evening when the air smelled of honeysuckle and the sky turned the colour of the inside of a shell, a tabby cat sat on the garden wall and drew a bow very slowly across the strings of her small fiddle. One note, sweet and round, floated up into the sky. Then another.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A tabby cat in a cream waistcoat sitting on a garden wall at dusk, raising her bow to a small fiddle, the first star appearing in the sky.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} seated on top of a stone garden wall, fiddle raised, bow just beginning its first stroke. Her cream waistcoat is warm in the dusk light. The sky behind her is pink and peach, the first star just visible. Honeysuckle climbs the wall on either side of her. The garden below is quiet and waiting.`,
          composition: `Mid shot. The cat is on the wall, centred, against the dusk sky. The honeysuckle frames her left and right. Eye lands on the raised bow and then the first star above.`,
          light:       `Warm dusk light, golden-pink. The sky is a wash of peach and rose. The first star is a bright pinpoint.`
        })
      },

      {
        id: 2,
        text: { en: `The cow heard the music from the far field. She lifted her great head and the daisy chain around it swayed. Something happened inside her chest, something light and rising and impossible to argue with. She took three small steps toward the gate, then three big ones, and then she was simply running.` },
        image:    'assets/images/cartoon/cow.svg',
        imageAlt: 'A black-and-white cow running across a field toward a distant garden wall, daisy chain flying, the moon rising.',
        imagePrompt: prompt({
          scene:       `${CAST.cow} running across a field at dusk, heading toward the garden wall visible in the far distance where a tiny figure with a fiddle is just visible. Her daisy chain crown flies slightly behind her head. Her large dark eyes are bright and purposeful. The moon is rising behind her.`,
          composition: `Wide shot. The cow is in the lower centre, running toward the distance. The garden and wall are small in the background, the moon rising behind them. The field stretches away on either side.`,
          light:       `Dusk light behind the cow. The rising moon ahead of her. She runs from the last of the day toward the first of the night.`
        })
      },

      {
        id: 3,
        text: { en: `Up she soared, daisy chain streaming, over the patchwork fields and the sleeping farmhouse and the winding river, up and up until the air was thin and cool and the stars pressed close. The moon, round and luminous, turned to watch as she passed with a soft moo of pure wonder.` },
        image:    'assets/images/cartoon/cow.svg',
        imageAlt: 'A black-and-white cow sailing through a moonlit sky above a patchwork of fields far below, daisy chain trailing, looking wonderfully surprised.',
        imagePrompt: prompt({
          scene:       `${CAST.cow} in mid-flight through a luminous moonlit sky, high above the earth. Below her, the patchwork of fields and the farmhouse and river are tiny. The daisy chain trails behind her head. Stars are very close. Her expression is one of total, open-mouthed wonder. The moon is beside her, huge and round.`,
          composition: `Wide dramatic shot. The cow is central in the night sky, the earth far below. The moon is to her right. Stars fill the background. The view from up here is extraordinary.`,
          light:       `Full moonlight, silver-white, from the right. The cow is lit on one side, the other in soft shadow. Stars add their small bright lights.`
        })
      },

      {
        id: 4,
        text: { en: `She hung there for one perfect moment above the world, all the lights of all the farms scattered below her like seeds. Then she began to come down, very gently and slowly, floating through the cool night air, and she landed as softly as a sigh in the field on the far side.` },
        image:    'assets/images/cartoon/cow.svg',
        imageAlt: 'A cow floating gently down from the sky, eyes half-closed in contentment, farm lights scattered far below like golden seeds.',
        imagePrompt: prompt({
          scene:       `${CAST.cow} floating gently downward through the night sky, eyes half-closed, daisy chain resting softly around her head again. Below her, the farms are lights scattered across dark fields. She descends slowly, peacefully. The moon watches from the side. Her expression is the very definition of contentment.`,
          composition: `Wide shot. The cow in the upper-centre of the frame, descending. The earth is the lower third, dark with scattered golden lights. The moon is at the upper right. A peaceful, dreamy image.`,
          light:       `Soft moonlight. The cow is luminous, her white patches bright. The farm lights below are warm gold against the dark earth.`
        })
      },

      {
        id: 5,
        text: { en: `Down in the garden the little dog had heard the music and was flat on his back in the grass with all four paws in the air, laughing so hard his neckerchief had come undone. He rolled upright, looked at the sky where the cow had been, looked at the cat on the wall, and laughed again.` },
        image:    'assets/images/cartoon/dog.svg',
        imageAlt: 'A small scruffy dog on his back in the garden grass, paws in the air, laughing, his neckerchief loose, the moon above him.',
        imagePrompt: prompt({
          scene:       `${CAST.dog} on his back in the garden grass, all four paws in the air, mouth open in a wide laugh, eyes crinkled shut. His red spotted neckerchief has come loose and lies beside him. Daisies and grass around him. Above, the full moon is visible and the sound of the fiddle continues.`,
          composition: `Close mid shot from slightly above, looking down at the dog in the grass. He fills the lower half of the frame. The moon is visible in the upper part of the sky above him.`,
          light:       `Moonlight from above, silver on the garden grass, warm on the dog's scruffy fur.`
        })
      },

      {
        id: 6,
        text: { en: `The dish and the spoon had been standing on the kitchen windowsill all evening, as they did every evening. But tonight was different. The dish took the spoon by the handle, very gently. The spoon leaned in. And then they were running, out through the kitchen garden gate and away down the road.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A round dish and a long spoon running hand in hand along a moonlit road at the edge of the world, a silver flash.',
        imagePrompt: prompt({
          scene:       `A round china dish and a silver spoon running hand in hand along a moonlit country road, viewed from behind as they grow smaller with distance. The road curves away toward the horizon, silver in the moonlight. They are small and getting smaller but clearly full of joy. The garden gate is just visible behind them.`,
          composition: `Wide shot along the road, from behind. The dish and spoon are central, shrinking with distance. The road stretches to the horizon. The gate is in the lower foreground.`,
          light:       `Full moonlight on the road, silver-white and clear. The dish and spoon catch the light as they run.`
        })
      },

      {
        id: 7,
        text: { en: `The cat played on, one note after another lifting into the night. Rabbits appeared at the edge of the garden to listen, sitting very still with their ears turned toward the sound. Even the old apple trees seemed to lean in slightly, their branches tilted toward the wall.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A tabby cat playing her fiddle on a moonlit garden wall while rabbits sit in a row at the garden edge, ears toward the music, apple trees leaning in.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} playing her fiddle on the garden wall, bow moving with quiet assurance. Below and around the garden, three rabbits sit at the garden's edge, ears turned precisely toward the sound. Two old apple trees in the background lean slightly toward the wall. The moon hangs above everything.`,
          composition: `Wide mid shot. The cat on the wall is elevated, upper centre. The rabbits are in the lower foreground. The apple trees frame left and right. The moon is above. A scene of concentrated, quiet listening.`,
          light:       `Full moonlight, cool silver. The cat is lit from above. The rabbits are in softer shadow. The apple tree leaves catch occasional silver edges.`
        })
      },

      {
        id: 8,
        text: { en: `The cow came floating back from the far field as the night deepened, landing without a sound at the garden gate, her daisy chain still perfectly on. She walked to the wall where the cat was playing and stood very close, her great soft eyes open and still and full of the sky.` },
        image:    'assets/images/cartoon/cow.svg',
        imageAlt: 'A black-and-white cow standing close to a garden wall in moonlight, listening to the fiddle music, her eyes deep and full of sky.',
        imagePrompt: prompt({
          scene:       `${CAST.cow} standing close to the garden wall, looking up at ${CAST.cat} who plays on above. The cow's daisy chain is still in place. Her large dark eyes reflect moonlight. Her expression is deep and still and full of something that cannot quite be named. The moon is high above.`,
          composition: `Mid shot. The cow in the lower half, standing at the wall. The cat is visible above on the wall top. The cow's face is the centre of the image — her deep eyes and the reflection of the night in them.`,
          light:       `Full moonlight. The cow's white patches are luminous. The cat above is silver. Everything is cool and still.`
        })
      },

      {
        id: 9,
        text: { en: `The dog had settled on his back in the grass again, paws crossed on his chest now, smiling up at the stars. The moon had drifted a little further along its path but had slowed, just slightly, as if it preferred this particular garden to any other place in the whole night sky.` },
        image:    'assets/images/cartoon/dog.svg',
        imageAlt: 'A small terrier dog lying in the garden grass at night, paws crossed, smiling up at the stars, completely at peace.',
        imagePrompt: prompt({
          scene:       `${CAST.dog} lying in the garden grass, paws crossed on his chest, smiling up at the stars. His red spotted neckerchief has been retied, slightly imperfectly. His eyes are open and content. Stars are clear above. The moon is in the upper corner of the frame, having moved on slightly. The fiddle music is implied in the air.`,
          composition: `Low mid shot, almost at ground level. The dog fills the lower half. The night sky with stars fills the upper half. The moon is a soft presence in one corner.`,
          light:       `Starlight and moonlight, soft and silver on the garden grass and the dog's warm fur. Peaceful and still.`
        })
      },

      {
        id: 10,
        text: { en: `The cat played on. Note by note the music grew and opened, something that had no name but that every listener felt in a different place. A last long note rose and hung in the air above the garden, thin and sweet and perfect, and then was done.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A tabby cat on a garden wall, bow lifted after the final note, the night very still around her, moon above.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} on the wall, bow just lifted after the very last note, held in the air. Her eyes are half-closed. The garden below is completely still. The cow, the dog, the rabbits, the apple trees are all motionless, holding the music. The moon is at its highest point above.`,
          composition: `Mid shot. The cat is central on the wall, bow raised. Everything around her is still. The moon is directly above. A single suspended moment of completion.`,
          light:       `The moonlight is at its fullest and most direct. Everything is silver and white. The last note seems to have brightened everything.`
        })
      },

      {
        id: 11,
        text: { en: `For a long moment nobody moved or spoke. The garden held the music a little longer before letting it go. Then the cow breathed out slowly. The dog's tail moved once in the grass. And everything was exactly, completely, perfectly fine.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'The garden at night after the music is done: cow, cat, and dog resting together in the moonlight, the garden still and peaceful.',
        imagePrompt: prompt({
          scene:       `${CAST.cat}, ${CAST.cow}, and ${CAST.dog} in the garden after the music. The cat has climbed down from the wall and sits on the grass. The cow is beside her, head lowered peacefully. The dog is still on his back but with one paw raised in a small contented gesture. The garden is still, the moon high, the night complete.`,
          composition: `Wide shot of the garden, the three animals arranged naturally close together. The wall is behind them. The moon is above. The garden is soft and dark around them.`,
          light:       `Full moonlight, soft and even now. The music is over and the light has settled to its natural silver. Still, complete, and warm.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The dish and the spoon were gone a long time, but they came back eventually, as the best adventures always end up doing.` },
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'A kitchen windowsill at first morning light: a round dish and a silver spoon back in their place, a single daisy laid beside them.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. A kitchen windowsill in early morning light. A round dish and a silver spoon are back in their usual place, side by side. Beside them, someone has left a single daisy. The window glass shows the garden outside, the wall, and the moonflowers just closing with the dawn. No characters present.`,
        composition: `Close shot of the windowsill. The dish and spoon are central. The daisy is a small warm accent. The window behind shows the morning garden soft and just waking.`,
        light:       `Very early morning light, blue and cool, with the first warmth just touching the windowsill. Quiet and complete.`
      })
    }

  }));

})(window.APP);

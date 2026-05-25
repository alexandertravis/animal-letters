// ─── The Hare and the Tortoise ────────────────────────────────────────────────
//
// An Aesop fable retold in lyrical prose for young children.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: slow and steady wins the race.
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
    hare:     `Long-legged brown hare, a bright yellow waistcoat with polished brass buttons, a red neckerchief at the throat, quick energetic eyes, always moving or about to move.`,
    tortoise: `Old grey-green tortoise, a small checked cap worn at a slight angle, unhurried round eyes, deliberate careful steps, a calm and patient expression.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'hare-tortoise',
    title:    { en: 'The Hare and the Tortoise' },
    subtitle: 'an Aesop fable, retold',

    // Library presentation
    skin:    'classic',
    leather: 'forest',
    board:   'sky',
    color:   '#8bd3dd',

    // Reading metadata
    wordCount:   493,
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
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' },
      { animalId: 'turtle', minCount: 1, label: 'Find the Turtle' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/rabbit.svg',
      imageAlt: 'A long-legged hare in a yellow waistcoat and a steady old tortoise in a checked cap standing together at a starting line, a sunny meadow ahead.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.hare} and ${CAST.tortoise} stand side by side at an informal starting line marked by two small flags stuck in the ground. The hare is coiled with energy, bouncing on his heels. The tortoise stands four-square, cap steady, expression calm. A sunny meadow stretches away ahead of them.`,
        composition: `Wide portrait. The two characters side by side, the hare taller and more dynamic on the left, the tortoise solid and low on the right. The path stretches ahead between them into the sunny distance.`,
        light:       `Bright morning sun from behind the viewer, casting long shadows ahead. An optimistic, race-morning light.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `At the edge of a sunny meadow there lived a hare who was the fastest runner for miles around, and he knew it very well. He wore his bright yellow waistcoat like a prize and could cross the whole meadow in the time it took a sparrow to blink.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A long-legged hare in a bright yellow waistcoat standing in a sunny meadow, looking proud, the meadow stretching wide behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} stands in the centre of a wide sunny meadow, yellow waistcoat bright in the sun, long ears upright, expression pleased and confident. A small crowd of forest animals watches from the edge of the meadow. The meadow stretches wide and flat behind him.`,
          composition: `Wide mid shot. The hare is central, tall and proud. The meadow rolls behind him. The watching animals are small figures at the edges. Eye lands on the hare's confident stance.`,
          light:       `Bright, clear morning sun. The yellow waistcoat is the brightest point in the image.`
        })
      },

      {
        id: 2,
        text: { en: `One still morning the hare was boasting loudly in the middle of the meadow. "I am the fastest! No one can beat me! No one even comes close!" He laughed and did a quick lap just to prove it, his yellow waistcoat a golden flash in the morning sun.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A hare mid-sprint across a meadow, yellow waistcoat flashing, while other animals watch from the sidelines.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} mid-sprint across the meadow, showing off, yellow waistcoat a blur of motion. Various small animals — a hedgehog, a robin, a squirrel — watch from the edge of the meadow with a mixture of admiration and mild exasperation. The hare's ears are flat with speed.`,
          composition: `Wide shot. The hare in the centre of the frame, blurred with motion. The spectators are at the edges. Eye follows the motion line of the sprinting hare.`,
          light:       `Bright morning sun. The yellow waistcoat catches the light and is clearly the fastest thing in the frame.`
        })
      },

      {
        id: 3,
        text: { en: `An old tortoise was making his way slowly along the path at the meadow's edge. He heard the boasting, stopped, and pushed his checked cap up with one careful claw. He looked at the hare for one long quiet moment. "I will race you," said the tortoise. The hare laughed until he had to sit down.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A small steady tortoise in a checked cap looking up calmly at a laughing hare who is doubled over with mirth.',
        imagePrompt: prompt({
          scene:       `${CAST.tortoise} stands at the side of the path, looking up at ${CAST.hare} with complete composure. The hare is doubled over laughing, holding his sides, ears flopped forward. The other animals watching seem more interested now. The tortoise's expression is unchanged.`,
          composition: `Mid shot. The tortoise is in the lower foreground, small and solid, looking up. The laughing hare towers above left. The watching animals frame the background. A quiet, good-humoured contrast.`,
          light:       `Even morning light, soft and unhurried. The tortoise's shadow is short and compact.`
        })
      },

      {
        id: 4,
        text: { en: `But the tortoise was perfectly serious. The other animals gathered along the path to watch. A hedgehog stood at the far oak tree holding a handkerchief ready to wave at the finish. The hare crouched low. The tortoise set his four feet in order. The handkerchief dropped and they were off.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A hare and tortoise at a starting line, the hare already flying ahead, the tortoise beginning his first careful step.',
        imagePrompt: prompt({
          scene:       `The start of the race. ${CAST.hare} explodes from the starting line, already a blur of motion. ${CAST.tortoise} takes his first deliberate step forward, unhurried. A hedgehog in the background waves a white handkerchief. Other animals line the path. Two small flag markers indicate the starting line.`,
          composition: `Wide shot. The starting line is left, the path ahead stretches to the right. The hare is already halfway across the frame. The tortoise is just beginning. The contrast in pace is immediately clear.`,
          light:       `Bright race-morning sun. The hare kicks up a small cloud of dust as he springs.`
        })
      },

      {
        id: 5,
        text: { en: `The hare shot away so fast that dust rose up in a little cloud behind him. In a moment he was at the middle of the course, then three-quarters. He glanced back and saw the tortoise, still tiny and slow at the very start of the path, and he laughed again.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A hare far ahead on a long path, glancing back to see a tiny tortoise just visible at the distant start.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} stands at three-quarters of the way along the race path, turned back to look behind him. Far in the distance, barely visible, ${CAST.tortoise} is a tiny figure just beginning. The hare's expression is amusement and dismissal.`,
          composition: `Wide landscape shot along the path. The hare is in the middle distance, turned sideways. The tortoise is tiny at the far end. The long empty path between them is the story.`,
          light:       `Clear bright afternoon light. The path is warm and open.`
        })
      },

      {
        id: 6,
        text: { en: `He sat down under a wide oak tree at the side of the path and fanned himself with a leaf. The afternoon was warm and the grass was soft. He told himself he would wait until the tortoise reached the halfway mark. He closed his eyes for just a moment. Then he was asleep.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A hare asleep under a large oak tree by the side of a path, yellow waistcoat visible, ears flat, a leaf fan fallen from his paw.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} asleep under a wide oak tree beside the race path, legs stretched out, yellow waistcoat bright, long ears flat. A large leaf has fallen from his relaxed paw. Dappled shade from the oak covers him. The path stretches empty beyond.`,
          composition: `Mid shot. The sleeping hare is centred under the oak, the tree framing him above and behind. The empty path is visible to the right. A drowsy, idle scene.`,
          light:       `Warm afternoon dappled shade. The light has moved since the race began. Drowsy and quiet.`
        })
      },

      {
        id: 7,
        text: { en: `The tortoise walked. One step, then the next, then the next. He did not look at the sleeping hare. He did not look at the watching animals. He looked at the path ahead of him and put one foot down and then the other, quiet and steady, his checked cap tilted against the sun.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A tortoise walking steadily along a sun-dappled path, checked cap on, four feet making deliberate progress.',
        imagePrompt: prompt({
          scene:       `${CAST.tortoise} walking along the race path, shot from slightly in front and low. His four feet are in a steady walking pattern. His checked cap is level. His expression is concentrated but serene. The path ahead is clear. The sleeping hare is just visible, small and distant to one side.`,
          composition: `Low-angle mid shot, eye level with the tortoise. He walks toward the viewer. The path unfolds behind him. The sleeping hare is a soft accent to the side. The tortoise's steadiness is the whole image.`,
          light:       `Warm afternoon light, slightly lower now. The tortoise's shadow is longer than it was.`
        })
      },

      {
        id: 8,
        text: { en: `The shadows grew long. The hedgehog at the finish line leaned forward. The tortoise came around the last bend at exactly the same pace he had started, still moving, still steady, his round eyes calm. He passed the sleeping hare's oak tree without making a sound.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A tortoise rounding the last bend of a race path, the finish oak tree just visible ahead, long shadows around him.',
        imagePrompt: prompt({
          scene:       `${CAST.tortoise} rounding the last bend of the race path, the finish oak tree and the waiting hedgehog just visible ahead. His cap is still perfectly on. The shadows are long now — late afternoon. In the distance behind him, the hare is still asleep under his oak tree.`,
          composition: `Wide shot. The tortoise in the lower centre, the path curving ahead. The finish is visible in the far background. The sleeping hare is tiny in the far distance behind. The tortoise has made remarkable ground.`,
          light:       `Long late-afternoon light, warm and golden. The shadows stretch dramatically. A sense of time having passed.`
        })
      },

      {
        id: 9,
        text: { en: `The hedgehog raised the handkerchief and the watching animals cheered. The noise reached the hare like a shout through a dream. He sprang to his feet, looked ahead, and saw the tortoise already crossing the finish line with four deliberate, unhurried steps. His mouth fell open.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A tortoise crossing a finish line under an oak tree, a hedgehog waving a handkerchief, animals cheering on both sides.',
        imagePrompt: prompt({
          scene:       `${CAST.tortoise} crossing the finish line under the oak tree, four feet moving in that same steady pattern. A hedgehog waves the white handkerchief above him. Animals cheer on both sides of the path. In the far background, ${CAST.hare} is just visible sprinting desperately toward them, far too late.`,
          composition: `Wide shot centred on the finish line. The tortoise is the calm focal point in the middle. The cheering animals frame both sides. The hare is small and frantic in the far background. Eye reads from the calm finish to the distant, desperate sprint.`,
          light:       `Golden late-afternoon light. The finish line is bright, warm, celebratory.`
        })
      },

      {
        id: 10,
        text: { en: `The hare ran as fast as he had ever run, yellow waistcoat a golden blur. He skidded to a halt at the finish oak, panting so hard the dust flew from his feet. The tortoise was already sitting quietly there, checked cap still perfectly on. "Finished," said the tortoise, without excitement.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A panting hare skidding to a stop at the finish line, where a calm tortoise already sits quietly, cap on.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} has just skidded to a halt at the finish oak, panting enormously, ears wilting, yellow waistcoat askew, dust still settling around his feet. ${CAST.tortoise} sits beside the finish line, cap on, four feet together, looking at the hare with quiet composure. His expression is kind, not triumphant.`,
          composition: `Mid shot. The two characters side by side at the finish line. The panting hare is left, all dust and deflation. The composed tortoise is right, small but settled. A perfect contrast.`,
          light:       `Warm late-afternoon light, gentle on both of them. The drama is over. The light is kind.`
        })
      },

      {
        id: 11,
        text: { en: `The hare looked at the tortoise for a long moment, still breathing hard. For once he had nothing at all to say. The hedgehog offered them both a blackberry, and the three of them sat together in the long grass as the sun went slowly down over the meadow.` },
        image:    'assets/images/cartoon/turtle.svg',
        imageAlt: 'A hare and tortoise sitting side by side in long meadow grass at sunset, a hedgehog between them offering blackberries.',
        imagePrompt: prompt({
          scene:       `${CAST.hare} and ${CAST.tortoise} sitting side by side in the long meadow grass. A small hedgehog between them holds out a stem of blackberries. The hare's yellow waistcoat is slightly rumpled. His expression is quiet and thoughtful. The tortoise's expression is warm and easy. The meadow glows in the evening light.`,
          composition: `Low, intimate mid shot. The three animals in the grass together, the meadow behind them, the sky warm above. A gentle, companionable scene.`,
          light:       `Golden evening light, long and warm, the sun low and orange behind the meadow. Everything is soft and at peace.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The hare grew to be a very fine racer indeed, and a somewhat quieter one. But the tortoise's pace never changed, not once, not ever.` },
      image:    'assets/images/cartoon/turtle.svg',
      imageAlt: 'A small checked cap hanging on a wooden peg beside a yellow waistcoat, side by side, a meadow visible through a window behind.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. A wooden peg rack on a wall holding two items side by side: a small checked cap and a bright yellow waistcoat. Through a window behind them, the meadow is just visible in the evening light. No characters in frame. A sense of two friends hanging up their things at the end of the day.`,
        composition: `Close shot, centred on the peg rack. The cap and waistcoat hang at the same level. The window behind is soft and blurred. A still, companionable image.`,
        light:       `Warm evening light through the window, catching the yellow waistcoat and the cap's check pattern softly.`
      })
    }

  }));

})(window.APP);

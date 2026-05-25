// ─── Professor Tawny's Counting Night ─────────────────────────────────────────
//
// An original story. Lyrical prose, no rhyme.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Theme: there is always more to discover; that is a wonderful thing.
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
    tawny:   `Professor Tawny: a large, elderly tawny owl in a deep navy waistcoat with a magnifying glass on a chain and a small notebook tucked under one wing. Spectacles on his beak, pencil behind his ear. Patient, precise, and genuinely delighted by things that cannot be finished.`,
    mouse:   `A small field mouse in a pale cream smock, curious and quick, the first to arrive and ask questions. Her eyes are large and her questions are always the best ones.`,
    rabbit:  `A young rabbit in a soft grey jacket, who counts in hops and finds numbers very satisfying when done properly.`,
    hedgehog:`A small hedgehog in a brown waistcoat, precise and careful, best at counting small groups.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'professor-tawny',
    title:    { en: "Professor Tawny's Counting Night" },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'navy',
    board:   null,
    color:   '#1a2a4a',

    // Reading metadata
    wordCount:   499,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['owl', 'mouse', 'rabbit', 'hedgehog'],
    coverAnimal: 'owl',

    // Unlock requirement
    requirements: [
      { animalId: 'owl',      minCount: 1, label: 'Find the Owl'      },
      { animalId: 'hedgehog', minCount: 1, label: 'Find the Hedgehog' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'An elderly owl in a navy waistcoat sitting in a counting tree at night, surrounded by small animals, all looking up at the stars.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.tawny} perched in his large counting tree at night, notebook open, pencil raised, surrounded by ${CAST.mouse}, ${CAST.rabbit}, and ${CAST.hedgehog} all gathered on branches and roots around him. Above them the night sky is full of stars. Everyone is looking up. The tree branches frame the stars.`,
        composition: `Wide night shot. The tree fills the frame, the owl at its centre. The small animals are distributed around him on branches and below. The starred sky is visible through the canopy. Eye drawn first to Tawny and his notebook, then to the sky above.`,
        light:       `Moonlight and starlight, cool and silver. The notebook page catches a little light. A lantern at the base of the tree gives warm amber below.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Every evening when the sun went down and the first stars appeared, Professor Tawny climbed to the top of the old beech tree at the edge of the meadow. He settled his spectacles, opened his notebook to a fresh page, and began. He was counting the stars. He had been doing this for seven years and had not yet finished.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl high in a beech tree at night, a notebook open, the first stars appearing above.',
        imagePrompt: prompt({
          scene:       `${CAST.tawny} perched at the top of the old beech tree against a deepening twilight sky. His notebook is open on his knee, pencil in wing. The first bright stars are appearing. The meadow is dark below. He is utterly absorbed and content.`,
          composition: `Wide shot. The owl is small at the top of the tall tree, the twilight sky large around him. A few stars are visible. The meadow dark below. A sense of him at his regular appointment.`,
          light:       `Deep blue twilight, the last traces of sunset at the horizon. The first stars pure points of light. The owl is in silhouette against the sky.`
        })
      },

      {
        id: 2,
        text: { en: `He had a system. He divided the sky into sections, like the squares of a window. He counted each section carefully, made a mark, moved to the next. It was very orderly and very satisfying, and he had counted eleven thousand, four hundred and seven stars so far, though he knew there were more.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'The owl\'s notebook open, showing careful tally marks in a grid pattern.',
        imagePrompt: prompt({
          scene:       `Close on ${CAST.tawny}'s open notebook in the moonlight. The pages show a careful grid, each square filled with neat tally marks. His pencil is poised over the next empty square. His magnifying glass chain catches the light. A very organised, very satisfying page.`,
          composition: `Close shot of the notebook page, the pencil at the ready. The night sky is visible above and around the edges of the book.`,
          light:       `Moonlight on the notebook pages, bright and silver-white. The tally marks are clear.`
        })
      },

      {
        id: 3,
        text: { en: `One night, a small mouse climbed up to his branch. "What are you doing?" she asked. Professor Tawny told her. She sat down and looked up at the sky for a long time. Then she said: "Can I help?" He moved his notebook to one side to make room. "Count that section there," he said. "One star, two stars..."` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A small mouse sitting beside the owl on a branch, both looking up at the stars.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} settling onto the branch beside ${CAST.tawny}, both looking up at the starred sky. The owl has made space for her. She is pointing at a section of sky, beginning to count. Her face is full of the particular pleasure of a new task well begun.`,
          composition: `Close mid shot on the branch. Two characters side by side, both looking up. The sky is the world above them.`,
          light:       `Clear moonlit night, the stars sharp. The branch is in cool silver light.`
        })
      },

      {
        id: 4,
        text: { en: `She counted well for three minutes. Then she lost count. She started again. She lost count again at seventeen. "There are too many," she said. "Not too many," said Professor Tawny. "Just many. There is a difference." He showed her how to use the sections. She started again, more slowly this time.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A mouse pointing at the stars with her paw, counting carefully, the owl watching beside her.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} with one paw raised, pointing at the sky section by section, counting with great concentration. ${CAST.tawny} watches her with patient encouragement. Her tongue is slightly out with the effort of counting carefully.`,
          composition: `Close mid shot on the branch. The mouse is slightly forward, her pointing paw the focal gesture. The owl is attentive beside her. The stars are above.`,
          light:       `The same clear moonlight. The stars she is counting are visible above her raised paw.`
        })
      },

      {
        id: 5,
        text: { en: `A rabbit arrived next, hopping up through the low branches. He had seen the light of Professor Tawny's notebook from the meadow below. "I count in threes," he said, without preamble. "Excellent," said Professor Tawny, who considered all counting methods equally valid. "Take that cluster there." The rabbit began at once.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit who has climbed a tree, settling onto a branch and looking up at a cluster of stars.',
        imagePrompt: prompt({
          scene:       `${CAST.rabbit} arriving on a branch below ${CAST.tawny} and ${CAST.mouse}, looking up at a particular cluster of stars with focused attention. He is already counting in his head, eyes moving in threes. The owl looks satisfied at the new arrival. The mouse is still working on her section.`,
          composition: `Wide mid shot. Three characters on different branches of the tree, all looking up. The notebook is on the owl's knee, each working on their own section of sky.`,
          light:       `Moonlit, the tree branches silver. The star clusters above are clustered and clear.`
        })
      },

      {
        id: 6,
        text: { en: `A hedgehog arrived at the base of the tree and could not climb, which she mentioned to no one. Instead she looked straight up through the branches at the sky above and said: "I can see the seven stars of the Plough from here. Shall I count those?" "Excellent," said Professor Tawny.` },
        image:    'assets/images/cartoon/hedgehog.svg',
        imageAlt: 'A hedgehog standing at the base of the tree, looking straight up through the branches at the stars.',
        imagePrompt: prompt({
          scene:       `${CAST.hedgehog} standing at the base of the old beech tree, head tilted all the way back to look straight up through the branches at the night sky. She is identifying a specific cluster of stars with a careful expression. The tree rises above her, the other animals are glimpsed in the branches.`,
          composition: `Low-angle shot from the base of the tree. The hedgehog is at the bottom, the tree recedes upward, the sky and stars are at the top. A different perspective from the others.`,
          light:       `Moonlight filtering down through the branches, the stars visible through the canopy gaps. A lantern at the tree base gives warm light on the hedgehog.`
        })
      },

      {
        id: 7,
        text: { en: `By midnight there were eight animals in or around the counting tree. A squirrel had come. A dormouse was counting from a nearby stone wall. A young rabbit had fallen asleep on a low branch, which was acceptable because she had contributed forty-two stars to the total before doing so.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A tree at night with many small animals on different branches, all looking up at the stars, one asleep.',
        imagePrompt: prompt({
          scene:       `The old beech tree at midnight, seen from a short distance. Several small animals occupy different branches at different heights: the owl at the top with his notebook, the mouse and rabbit below, a squirrel on a branch to one side. At the base, the hedgehog looks up. One small rabbit is curled asleep on a low branch. Stars are visible above.`,
          composition: `Wide night shot of the whole tree. The animals are distributed up and down it. The tree is a community of counters. Eye moves from the top owl down through the occupied branches.`,
          light:       `Full moonlight on the tree, cool silver. The lantern at the base warm. Stars above the canopy. A beautiful, full night-scene.`
        })
      },

      {
        id: 8,
        text: { en: `Nobody had finished counting all the stars. The total in the notebook had grown considerably, but the sky had simply more of them than anyone had yet been able to confirm. The mouse looked at the notebook. The notebook had many pages left. She looked up at the sky. The sky had no pages.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A mouse looking at an open notebook of tally marks, then looking up at the vast sky.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} on her branch, the open notebook in front of her. She looks down at the dense tally marks, then lifts her face to the sky which is impossibly full of stars. The contrast between the finite notebook and the infinite sky is the image.`,
          composition: `Close mid shot on the branch. The notebook below her gaze, the star-filled sky above. Eye moves between the finite pages and the infinite sky.`,
          light:       `The notebook catches moonlight. The sky above is vast and dark and full of light.`
        })
      },

      {
        id: 9,
        text: { en: `"There are too many," she said again. "We will never finish." Professor Tawny closed his notebook carefully and looked up at the sky himself for a long moment. "No," he said. "We will not. But we will always have more to count. Do you find that frustrating?" The mouse thought about it seriously. "No," she said slowly. "I think I find it comforting."` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl and a mouse on a branch at night, both looking up at the stars with peaceful expressions.',
        imagePrompt: prompt({
          scene:       `${CAST.tawny} and ${CAST.mouse} on their branch, both looking up at the stars. The notebook is closed on the owl's knee. Both expressions are peaceful and thoughtful. The stars above are many and bright.`,
          composition: `Close mid shot. The owl and mouse side by side on the branch, both looking up. The notebook closed between them. The sky is the world above.`,
          light:       `Quiet moonlit night. The stars the only active light. Both faces upward in the same cool silver.`
        })
      },

      {
        id: 10,
        text: { en: `He opened his notebook again. "Come back tomorrow," he said, "and we will count more of them." The rabbit woke from his branch and said he would come back. The hedgehog said she could bring her own notebook. The squirrel said she would bring her sister, who was very good with numbers. It was all arranged.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'The owl and assembled animals making plans for tomorrow\'s counting night, all looking pleased.',
        imagePrompt: prompt({
          scene:       `The tree at midnight, the animals in an animated but quiet exchange of plans for tomorrow. ${CAST.tawny} makes a note in his book. ${CAST.rabbit} has woken from his nap and looks alert. ${CAST.hedgehog} at the base looks up, engaged. Everyone making arrangements.`,
          composition: `Wide mid shot of the tree and assembled animals, all in quiet animated discussion. The stars above, the meadow below. The notebook the centre of future plans.`,
          light:       `Moonlight, warm lantern at the base. A cheerful but calm nighttime scene.`
        })
      },

      {
        id: 11,
        text: { en: `They came back the next night, and the night after, and the night after that. The notebook filled and was followed by another. The total grew and grew and was still never finished. Professor Tawny had suspected this would be the case. That was, in fact, precisely why he had started counting.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A stack of filled notebooks beside a new empty one, the counting tree at night in the background.',
        imagePrompt: prompt({
          scene:       `${CAST.tawny} in his counting tree, a small stack of filled notebooks on the branch beside him, a new blank notebook open in front. The animals are arranged around the tree again. The sky above is full of stars, as many as ever. He is entirely content.`,
          composition: `Wide night shot with the tree and all the counters. The stack of notebooks is the visual record of time and effort. The unchanged sky above is the reason they keep coming.`,
          light:       `Clear midnight, the stars bright, the lantern warm at the base. The notebooks catch the moonlight.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The stars, for their part, are not particularly concerned about being counted. But they do not mind it, either.` },
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'An open notebook with tally marks on a tree branch, a pencil beside it, stars above through the leaves.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: an open notebook on a tree branch, pages filled with careful tally marks in neat grids. A small pencil lies across the spine. Through the leaves above, the night sky is full of stars, uncountable and calm. No animals in the frame. Just the counting, and the sky.`,
        composition: `Close shot of the notebook on the branch, stars visible above through the leaves. Simple and still. The notebook is the work; the sky is the reason.`,
        light:       `Moonlight on the notebook pages. Stars visible through the leaves. Cool, clear, and infinite.`
      })
    }

  }));

})(window.APP);

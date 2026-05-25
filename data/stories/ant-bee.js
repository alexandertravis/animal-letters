// ─── The Ant and the Bee ──────────────────────────────────────────────────────
//
// An original cooperation story. Lyrical prose, no rhyme.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: the things you cannot do alone, you can do together.
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
    archie: `Archie the ant: a small, strong black ant in a tiny dark-blue dungaree, carrying things much larger than himself with great determination. Has a very steady, purposeful walk and takes his work seriously. Eyes bright with quiet pride.`,
    bonnie: `Bonnie the bee: a yellow-and-black striped bee in a striped ochre waistcoat with small wings always in motion, the fastest flier in the meadow. Buzzes with energy, moves in quick spirals, and talks at a pace that matches her flight.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'ant-bee',
    title:    { en: 'The Ant and the Bee' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'amber',
    board:   null,
    color:   '#7a6010',

    // Reading metadata
    wordCount:   491,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['ant', 'bee'],
    coverAnimal: 'bee',

    // Unlock requirement
    requirements: [
      { animalId: 'ant', minCount: 1, label: 'Find the Ant' },
      { animalId: 'bee', minCount: 1, label: 'Find the Bee' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/bee.svg',
      imageAlt: 'A bee carrying an ant through the air toward a golden piece of honeycomb on a high twig.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.bonnie} flying upward, carrying ${CAST.archie} on her back, wings buzzing, both heading toward a glowing piece of honeycomb balanced on a high twig in a flowering meadow. The meadow is spread below, the sky above. Archie holds on with both front legs, looking ahead with determination. Bonnie's wings are a blur of effort and speed.`,
        composition: `Wide mid shot. The two characters are mid-flight in the centre, heading upward toward the honeycomb in the upper right. The meadow below provides scale and context. Eye travels up with them.`,
        light:       `Warm summer sun from above, catching the honeycomb in a golden glow and illuminating the bee's wings.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In a meadow full of clover and tall grasses, Bonnie the bee was the fastest flier anyone had ever seen. She could cover the whole meadow in the time it took a butterfly to find a flower. She was very proud of this, though she tried not to show it more than about forty per cent of the time.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A striped bee in flight, leaving a trail of motion behind her, the meadow below a blur.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} in full, fast flight across the meadow, wings a blur, creating a small wake in the clover-heads she passes. The meadow below is soft and detailed, the sky above clear. Her path is a swift curve. Her expression is one of pure enjoyment of speed.`,
          composition: `Wide action shot. Bonnie crosses the frame in a fast arc. The meadow below and sky above give scale. Motion lines or disturbed clover-heads show her speed. Eye follows her path.`,
          light:       `Bright summer sun from above, the meadow a rich green-gold, Bonnie lit fully in the open sky.`
        })
      },

      {
        id: 2,
        text: { en: `In the same meadow, Archie the ant was the strongest carrier anyone had ever seen. He could carry a crumb six times his own size from the cornfield all the way to his nest without stopping once. He was very proud of this too, and he showed it precisely as much as forty per cent of the time, which was perhaps not a coincidence.` },
        image:    'assets/images/cartoon/ant.svg',
        imageAlt: 'A small ant carrying a huge crumb of bread over his head, walking steadily across the meadow floor.',
        imagePrompt: prompt({
          scene:       `${CAST.archie} walking steadily across the meadow floor, carrying above his head a crumb that is several times his own size, completely balanced and controlled. The grass stems tower around him like trees. His expression is composed and focused. A tiny trail of ant footsteps behind him in the soft earth.`,
          composition: `Low-angle worm's-eye mid shot from ground level. Archie is the subject, the crumb above him is the impressive feat. The grasses tower on either side, giving the meadow floor its own grand scale.`,
          light:       `Filtered light through the grasses, greenish and dappled at ground level. The crumb catches any light that reaches it.`
        })
      },

      {
        id: 3,
        text: { en: `One summer morning they both noticed the same thing at the same moment: a large piece of honeycomb, golden and perfect, balanced on a twig of the tall hawthorn at the meadow's edge. It was at least twenty bee-lengths off the ground, which was also about two hundred ant-lengths. Both of them wanted it very much.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A golden piece of honeycomb gleaming on a high hawthorn twig, a bee and an ant both looking up at it from below.',
        imagePrompt: prompt({
          scene:       `A large hawthorn twig high above the meadow, with a perfect piece of golden honeycomb resting balanced on it. Below on the ground, ${CAST.bonnie} and ${CAST.archie} both stand looking up at it — the bee from one side, the ant from the other, not yet noticing each other. The honeycomb glows.`,
          composition: `Mid shot. The honeycomb is in the upper centre, glowing. The bee is lower-left looking up, the ant lower-right looking up. They mirror each other without knowing it. Eye drawn first to the honeycomb, then discovers both admirers.`,
          light:       `Summer sun catching the honeycomb beautifully, making it glow gold. The two tiny creatures below are in relative shade.`
        })
      },

      {
        id: 4,
        text: { en: `Bonnie flew up to it at once. She hovered beside it. She tried to grip it in her front legs. It was very heavy. She tilted. The honeycomb tilted. She released it before it could fall and landed back on a leaf below, slightly out of breath. She looked at the honeycomb. The honeycomb did not look back.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee hovering beside a piece of honeycomb, struggling to grip it, tilting sideways.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} hovering beside the honeycomb on the twig, one front leg gripping it, wings working hard. The honeycomb is clearly tilting, about to slip. Her expression is strained with effort. The hawthorn twig and the meadow below are visible.`,
          composition: `Close mid shot at twig height. The bee and the tilting honeycomb take the centre. The meadow far below is visible. A dynamic, effortful moment.`,
          light:       `Sun catching the bee's wings in a buzz of light, the honeycomb golden, the struggle clear in the tilt.`
        })
      },

      {
        id: 5,
        text: { en: `Archie started climbing the hawthorn from the base. He was extremely good at climbing. He reached the first branch in no time at all. He reached the second branch. He reached the third branch and looked up. The twig with the honeycomb was still a very long way above him. He looked down. He was also very far above the ground. He sat down.` },
        image:    'assets/images/cartoon/ant.svg',
        imageAlt: 'A small ant high on a hawthorn branch, looking up at the honeycomb above and down at the ground below, uncertain.',
        imagePrompt: prompt({
          scene:       `${CAST.archie} sitting on a hawthorn branch, three branches up, looking up at the distant honeycomb above and then down at the distant ground below. His expression is the expression of someone who has discovered that up is as intimidating as down. A thorny branch is in the foreground.`,
          composition: `Mid shot at branch level. Archie sits on his branch, the ground far below-left, the honeycomb far above-right. He is caught between two distances. Eye drawn to his stuck expression.`,
          light:       `Dappled light through hawthorn leaves, the honeycomb a warm glow far above.`
        })
      },

      {
        id: 6,
        text: { en: `They both ended up on the same leaf at the base of the hawthorn at the same time, which is how they noticed each other. They sat side by side and did not say anything for a moment. The honeycomb was still up there, glowing in the sun. "Too heavy," said Bonnie. "Too high," said Archie.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee and an ant sitting side by side on a leaf below a hawthorn tree, both looking up.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} and ${CAST.archie} sitting side by side on a large dock leaf at the base of the hawthorn, both looking upward at the distant honeycomb. Their poses mirror each other: slightly slumped, chin-in-hand. The honeycomb glows above them between the branches. They have noticed each other without yet having spoken.`,
          composition: `Close mid shot from leaf level. Both characters on the leaf, side by side, looking up. The honeycomb is a small golden shape in the upper centre of the frame. Eye drawn to the matching slumped postures.`,
          light:       `The leaf is in shade at the base of the tree. The honeycomb above is in bright sun. The contrast between where they are and where they want to be.`
        })
      },

      {
        id: 7,
        text: { en: `They looked at each other. Then they looked at each other's specific and separate qualities. Bonnie could carry Archie to the twig in about four seconds. Archie could grip the honeycomb and loosen it from the bark with his jaws in the time it takes to say honeycomb three times. They had not thought of this until this exact moment.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee and an ant looking at each other with the dawning light of a very good idea.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} and ${CAST.archie} on the leaf, now both turned to look at each other. Their expressions have shifted from defeat to something new and brightening. An implied idea hangs in the air between them. The honeycomb above is out of frame, but its existence is in both their faces.`,
          composition: `Close two-character shot. The bee and ant face each other on the leaf. The dawning-idea expressions are the subject. Simple, close, and full of energy.`,
          light:       `A shaft of light seems to find them at this moment, warm and illuminating, which is either metaphor or coincidence.`
        })
      },

      {
        id: 8,
        text: { en: `"I could carry you," said Bonnie. "I could grip it," said Archie. "And carry it down," she said. "And carry you while you carry it," he said. They looked at each other. "That is the plan," said Bonnie. "That is entirely the plan," said Archie. They did not waste any more time.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'The bee and ant both looking upward together with clear, shared purpose.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} and ${CAST.archie} side by side on the leaf, both now looking up at the honeycomb with identical expressions of confident purpose. The idea has become a plan. Both are mid-lean, about to act.`,
          composition: `Wide close shot. Both characters looking up together. Their matching purposeful postures tell the story. Eye follows their gaze up to the honeycomb.`,
          light:       `The sun is bright on the honeycomb above, beckoning.`
        })
      },

      {
        id: 9,
        text: { en: `Bonnie carried Archie to the twig. Her wings worked hard. Archie held on with all six legs. When they reached the honeycomb he gripped it in his powerful jaws, worked it free from the sticky bark, and held on. "Ready," he said. "Ready," she said. And they came down together, very slowly, the honey dripping in small golden drops below them.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee flying carefully downward carrying an ant who is holding the honeycomb in his jaws, honey dripping below.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} flying slowly downward, carrying ${CAST.archie} on her back, who in turn holds the large piece of honeycomb in his jaws. Golden honey drips from the comb in small drops below them. Bonnie's wings work with effort. Archie holds on completely steady. Together they are bringing the honeycomb down.`,
          composition: `Dynamic mid shot. The three-part assembly (bee, ant, honeycomb) moves downward through the frame. Honey drips catch the light below. Eye follows their careful descent.`,
          light:       `The sun catches the dripping honey in golden drops. The whole scene is warm and golden with success.`
        })
      },

      {
        id: 10,
        text: { en: `They landed on a flat clover patch and set the honeycomb down between them. They looked at it. It was even more beautiful up close: golden cells, warm wax, and a smell that was better than almost any smell in the meadow. They had both been alone all morning and now they were not. It seemed like a good thing to notice.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee and an ant sitting together with a piece of honeycomb between them in a clover patch, looking at it.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} and ${CAST.archie} sitting on either side of the piece of honeycomb in a sunny clover patch. The honeycomb is beautiful up close, golden cells visible. Both of them look at it with quiet satisfaction. Then one of them looks at the other. A moment of recognition.`,
          composition: `Close mid shot from slightly above. The honeycomb is centred between them, both characters on either side. Eye drawn to the honeycomb, then to each face.`,
          light:       `Full warm sun on the clover patch, the honeycomb at its most golden in this light. A settled, satisfying warmth.`
        })
      },

      {
        id: 11,
        text: { en: `They shared it there in the clover, and the honey was exactly as good as they had both imagined it would be. When they had finished, Archie cleaned his jaws carefully and said: "The same time tomorrow?" Bonnie was already spiralling upward to check the morning air. "The same time tomorrow," she called back down.` },
        image:    'assets/images/cartoon/bee.svg',
        imageAlt: 'A bee spiralling upward into the morning sky, an ant watching her from the clover patch below.',
        imagePrompt: prompt({
          scene:       `${CAST.bonnie} spiralling upward into the bright morning sky, her wings catching the light, looking back down. Below in the clover patch, ${CAST.archie} watches her go, a content expression on his face, an empty honeycomb between them. It is a parting that is also a making of plans.`,
          composition: `Wide shot. Bonnie spirals up in the upper half of the frame. Archie is small below in the clover. The sky between them is open and bright. Eye follows the bee up and then finds the ant watching below.`,
          light:       `Morning sun, fresh and clear, the bee's wings bright in the light.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `They have been meeting every morning in the meadow ever since. The strongest and the fastest, working together, which turns out to be the best thing either of them has ever been.` },
      image:    'assets/images/cartoon/bee.svg',
      imageAlt: 'A piece of empty golden honeycomb on a clover leaf, a bee track and ant track crossing beside it.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: an empty piece of honeycomb on a clover leaf, its cells drained but still beautiful in the golden light. A bee's wing-print in the morning dew on one side, a line of tiny ant footprints on the other. Two paths that have met.`,
        composition: `Close overhead shot. The honeycomb on the clover leaf fills the frame. The wing-print and ant footprints are visible in the dew. A simple, lovely, finished image.`,
        light:       `Morning dew light, soft and gold, the honeycomb catching the warmth of the early sun.`
      })
    }

  }));

})(window.APP);

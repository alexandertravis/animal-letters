// ─── The Elephant Who Forgot ─────────────────────────────────────────────────
//
// An original story. Lyrical prose, no rhyme.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Theme: asking for help is wisdom, not weakness. Kindness remembered is kindness repaid.
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
    esme:    `Esme the elephant: a large, kind African elephant with a dusty-rose apron tied around her middle, warm wise eyes, and a magnificent memory. She is the keeper of the valley's important dates, and has never forgotten anything until today. She moves with gentle, dignified care.`,
    monkey:  `A cheerful brown monkey in a yellow neckerchief, quick-moving and warm-hearted, who helps Esme retrace her morning.`,
    rabbit:  `A patient brown rabbit in blue dungarees, methodical and helpful, who helps Esme retrace her steps.`,
    parrot:  `A green parrot in a teal neckerchief, bright-eyed and with a remarkable memory for things she has heard, including a particular tune.`,
    zebra:   `Zebra: a gentle, striped zebra in a cream linen shirt, whose birthday it turns out to be. Easy-going, kind, genuinely pleased to see Esme when she arrives.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'elephant-forgot',
    title:    { en: 'The Elephant Who Forgot' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'mauve',
    board:   null,
    color:   '#6a3a5a',

    // Reading metadata
    wordCount:   496,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['elephant', 'monkey', 'rabbit', 'parrot', 'zebra'],
    coverAnimal: 'elephant',

    // Unlock requirement
    requirements: [
      { animalId: 'elephant', minCount: 1, label: 'Find the Elephant' },
      { animalId: 'zebra',    minCount: 1, label: 'Find the Zebra'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/elephant.svg',
      imageAlt: 'A large elephant in a pink apron standing with a worried expression, a notebook in her trunk, surrounded by smaller helpful friends.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.esme} standing in the valley, notebook held in her trunk, a worried expression on her wise face. Around her, ${CAST.monkey}, ${CAST.rabbit}, and ${CAST.parrot} look up at her helpfully, each offering something. The valley is warm and green behind them.`,
        composition: `Wide mid shot. Esme large and central, her worried expression the focal point. The three smaller animals around her at various heights. Eye drawn to Esme and then to her helpers.`,
        light:       `Warm morning valley light, open and golden.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Esme the elephant had the finest memory in the valley. She remembered every birthday, every anniversary, every occasion that mattered to any creature she had ever met. She kept a notebook, but she rarely needed it: the dates lived in her head like well-loved furniture, always exactly where they should be.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'A large elephant in a pink apron in the valley, surrounded by friendly smaller animals who she keeps track of.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} in the valley, holding her open notebook in her trunk but clearly not needing it: her eyes are bright and knowing. Around her the valley is full of life: small figures in the background who are her friends. She looks confident and warm.`,
          composition: `Wide establishing shot. Esme centred in the valley, the world around her. Her notebook is open but she is not consulting it. The valley is rich and full behind her.`,
          light:       `Clear, generous morning light. The valley is warm and well-lit. A confident, settled scene.`
        })
      },

      {
        id: 2,
        text: { en: `One morning she woke and tried to reach for a particular piece of knowledge she was certain she possessed, and found, to her complete surprise, that it was not where she had left it. She lay still for a while, reaching carefully into different parts of her memory. The knowledge was not there. Something important was gone.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'An elephant lying in her bed in the early morning, looking puzzled and inward.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} lying in her sleeping place in the early morning, awake but eyes slightly unfocused, as if looking inward. Her expression is one of careful puzzlement, reaching for something she cannot find. The morning is just beginning outside.`,
          composition: `Mid shot. Esme lying down, face and expression the focus. The morning light just beginning around her. A quiet, inward, puzzled scene.`,
          light:       `Very early morning light, pale and cool. The day has not fully arrived.`
        })
      },

      {
        id: 3,
        text: { en: `She got up. She put on her apron. She stood in the morning with her notebook and looked at yesterday's page and the day before that and the day before that, and found the names of everyone she had recently seen, and still could not remember what the missing thing was. She decided to ask for help. This was harder than it sounds, for an elephant with a perfect memory.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'An elephant standing in the morning light with an open notebook, looking thoughtful.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} standing in her clearing in the morning, notebook open in her trunk, reading through previous pages with a searching expression. Her apron is on. The morning is clear. She is alone, but about to decide to not be.`,
          composition: `Mid shot. Esme and her notebook. The morning light around her. The notebook is the active object.`,
          light:       `Early morning light, clearing now, slightly warmer.`
        })
      },

      {
        id: 4,
        text: { en: `She went first to the monkey, who was the quickest thinker she knew. She explained the situation. He swung down from his branch and thought about yesterday. "You were humming when I saw you," he said. "In the morning, coming down the valley path. Something you were thinking about." He demonstrated the rhythm. Esme listened.` },
        image:    'assets/images/cartoon/monkey.svg',
        imageAlt: 'A monkey hanging from a branch making a rhythm with his hands while the elephant listens.',
        imagePrompt: prompt({
          scene:       `${CAST.monkey} hanging from a low branch, tapping a rhythm on the bark with his hands and humming, recreating what he heard. ${CAST.esme} stands below, ears forward, listening with great attention. Her expression is searching.`,
          composition: `Mid shot. The monkey on the branch above, Esme below listening. A consultation scene.`,
          light:       `Morning tree shade, dappled. Warm light breaks through above the monkey.`
        })
      },

      {
        id: 5,
        text: { en: `She went to the rabbit, who was the most methodical creature she knew. The rabbit thought about yesterday's path, step by step. "You went to the river in the morning," he said. "Then to the fig tree. Then you paused by the acacia. Then you walked home faster than usual." Esme closed her eyes. The acacia. Something about the acacia.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit walking through yesterday\'s path with an elephant, retracing steps carefully.',
        imagePrompt: prompt({
          scene:       `${CAST.rabbit} walking slowly and methodically along the valley path with ${CAST.esme}, pointing to different places as they retrace her yesterday. The rabbit points ahead to an acacia tree in the distance. Esme looks at it with a focused expression.`,
          composition: `Wide mid shot. Both characters on the path, rabbit slightly ahead and pointing. The acacia in the background draws the eye.`,
          light:       `Morning valley light, clear and open.`
        })
      },

      {
        id: 6,
        text: { en: `She went to the parrot, who was the best listener she knew. "You were humming when you went past my tree," said the parrot, bright-eyed. "I heard it." She whistled the tune the monkey had demonstrated. "That is not quite right," said Esme. "There was a different note at the end." "Yes," said the parrot. "Like this." And she sang it.` },
        image:    'assets/images/cartoon/parrot.svg',
        imageAlt: 'A parrot singing a tune on a branch while an elephant listens with great attention.',
        imagePrompt: prompt({
          scene:       `${CAST.parrot} on a branch, head tilted back, reproducing the tune with complete accuracy. ${CAST.esme} stands below, trunk raised slightly, listening with all of herself. Her expression is on the edge of recognition.`,
          composition: `Mid shot. The parrot singing on the branch, Esme below in the attitude of maximum listening. A moment before recognition.`,
          light:       `Clear morning light, the parrot's green plumage bright.`
        })
      },

      {
        id: 7,
        text: { en: `Esme stood perfectly still. She knew that tune. She had been humming it, yesterday, because she had been thinking about someone, because today was that someone's special day. It arrived, all at once, complete and certain: it was Zebra's birthday. The first of summer. She had known it for twelve years.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'An elephant with her trunk raised, a look of complete recognition and relief spreading across her face.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} with her trunk raised and her eyes lit up with the sudden return of the lost memory. Her expression shifts from searching to clear recognition, relief and joy together. The parrot on the branch watches her with pleased satisfaction.`,
          composition: `Close mid shot on Esme's face and raised trunk. The moment of remembering. The parrot is in the upper background.`,
          light:       `A shaft of morning sun falls exactly on Esme at this moment. Her face is lit and open.`
        })
      },

      {
        id: 8,
        text: { en: `She walked quickly to the acacia grove where Zebra liked to spend the mornings. Zebra was there, in his cream shirt, eating his breakfast with a quiet and unhurried air. "Esme!" he said, looking up. "What brings you here?" Esme arrived in front of him, slightly out of breath, which did not often happen to an elephant.` },
        image:    'assets/images/cartoon/zebra.svg',
        imageAlt: 'An elephant arriving at an acacia grove, slightly out of breath, to find a zebra having breakfast.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} arriving at the acacia grove, slightly winded but radiant. ${CAST.zebra} looks up from his breakfast with a warm, surprised expression. Acacia trees frame the scene. Morning light fills the grove.`,
          composition: `Wide mid shot. The acacia grove with its shade. Zebra at his breakfast right, Esme arriving left. Eye drawn to the meeting.`,
          light:       `Warm morning acacia-grove light, the trees casting elegant dappled shadows.`
        })
      },

      {
        id: 9,
        text: { en: `"I nearly forgot," said Esme. "It is your birthday. The first of summer." Zebra looked at her with his warm, steady eyes. "You remembered," he said. "Eventually," said Esme. "With help." She said it without embarrassment, which surprised her a little. "That is still remembering," said Zebra. "Come and have breakfast."` },
        image:    'assets/images/cartoon/zebra.svg',
        imageAlt: 'A zebra and an elephant having breakfast together under an acacia tree.',
        imagePrompt: prompt({
          scene:       `${CAST.zebra} and ${CAST.esme} sitting together under an acacia tree. Breakfast is spread between them. Both have easy, warm expressions. They are mid-conversation. The grove is bright and pleasant around them.`,
          composition: `Close mid shot. The two characters together under the acacia, breakfast between them. An easy friendship.`,
          light:       `Warm morning light through the acacia leaves, dappled and golden.`
        })
      },

      {
        id: 10,
        text: { en: `She stayed for the morning. In the afternoon she went to thank the monkey, and the rabbit, and the parrot. Each of them said that it was nothing, which it was not. She wrote their names in her notebook in a new section at the back, with the heading: People who helped me when I forgot. She thought she would rather have this record than not have it.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'An elephant writing in a notebook, surrounded by her three helpers, all looking pleased.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} writing in her notebook, seated under a tree. ${CAST.monkey}, ${CAST.rabbit}, and ${CAST.parrot} are around her. She is writing something specific at the back of the book. All three look pleased. Her expression is warm and purposeful.`,
          composition: `Close mid shot. Esme writing, the three helpers around her. The notebook is the active centre.`,
          light:       `Afternoon light, warm and clear.`
        })
      },

      {
        id: 11,
        text: { en: `That evening she went to the old fever tree at the edge of the valley and carved, very carefully with a stick pressed into the soft bark: Zebra, first of summer. She added a small star. Then she stood back and looked at it, and felt satisfied in a different way than she usually felt satisfied. "Just in case," she said to herself. And walked home in the dark.` },
        image:    'assets/images/cartoon/elephant.svg',
        imageAlt: 'An elephant at an old fever tree at dusk, pressing a marking into the bark with a stick.',
        imagePrompt: prompt({
          scene:       `${CAST.esme} at the old fever tree at dusk, pressing careful marks into the soft bark with a stick. The marking is a name and a date. She stands back to look at it with quiet satisfaction. The valley behind her is gold and fading. The tree bark holds the record.`,
          composition: `Mid shot. Esme at the tree, the marking in the bark visible. She has stepped back slightly to look at it. The dusk valley is behind her.`,
          light:       `Dusk, golden and fading, the fever tree lit from the last sun. A moment of completion.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The tree still has the marks. There are quite a few of them now. Just in case was, it turned out, an excellent policy.` },
      image:    'assets/images/cartoon/elephant.svg',
      imageAlt: 'The bark of an old fever tree with carefully pressed marks and a small star, evening light on it.',
      imagePrompt: prompt({
        scene:       `A close vignette of the fever tree bark. Several carefully marked dates and names are pressed into the soft surface, each with a small star. The oldest marks are slightly faded; the newest are fresh. Evening light falls across the bark, making the marks readable and warm.`,
        composition: `Close shot of the tree bark. The marks fill the frame. The light falls across them warmly. No characters, just the record.`,
        light:       `Evening golden light on the bark. Warm and definite.`
      })
    }

  }));

})(window.APP);

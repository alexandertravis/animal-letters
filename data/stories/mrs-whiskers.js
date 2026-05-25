// ─── Mrs Whiskers and the Midnight Tea ───────────────────────────────────────
//
// An original cosy story. Lyrical prose, no rhyme.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Theme: the unexpected comfort of company in the small hours.
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
    whiskers: `Mrs Whiskers the cat: a plump tortoiseshell cat in a long cream dressing-gown with a lace collar, grey-streaked fur, half-moon spectacles pushed up on her nose, and a cap that sits slightly askew when she has just woken up. Makes excellent biscuits and has a large collection of teas.`,
    meadows:  `Mrs Meadows the mouse: a small grey mouse in a lavender dressing-gown and matching night-bonnet, a pale blue knitting bag over one arm. Always worries slightly about whether she is imposing, but she never is.`,
    hoot:     `Professor Hoot the owl: a large tawny owl in a plum velvet dressing-gown and slippers, very tall and slightly stooped in low doorways, with a deep, careful voice and an expression of great patience. He comes to the window, never the door, because he is too large for the door.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'mrs-whiskers',
    title:    { en: 'Mrs Whiskers and the Midnight Tea' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'plum',
    board:   null,
    color:   '#5a2a5a',

    // Reading metadata
    wordCount:   496,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['cat', 'mouse', 'owl'],
    coverAnimal: 'cat',

    // Unlock requirement
    requirements: [
      { animalId: 'cat',   minCount: 1, label: 'Find the Cat'   },
      { animalId: 'owl',   minCount: 1, label: 'Find the Owl'   }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'Three animals in dressing-gowns sitting around a candlelit table with three mismatched teacups, the moon outside the window.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.whiskers}, ${CAST.meadows}, and ${CAST.hoot} sitting around a small round table with three mismatched teacups and a teapot between them. A candle glows in the centre. Outside the window, the full moon is visible. All three are in dressing-gowns and look simultaneously tired and quietly happy.`,
        composition: `Interior mid shot. The table with its candle and three cups is centred. The three characters sit around it, the moon window behind them. Eye drawn to the warm candlelight and the three nighttime faces.`,
        light:       `Candlelight from the table centre, warm amber. Cool moonlight from the window behind. The two lights meeting beautifully around the three friends.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Mrs Whiskers woke at midnight, as she sometimes did, and lay in the dark for a while listening to the house. It ticked. It settled. A pipe somewhere made a comfortable knock. She had heard all of these sounds a hundred times, but tonight she found she did not want to hear them alone. She got up and put on her dressing-gown.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat in a cream dressing-gown sitting up in bed in the dark, listening to the quiet house.',
        imagePrompt: prompt({
          scene:       `${CAST.whiskers} sitting up in a high bed in a darkened bedroom, dressing-gown around her shoulders, spectacles pushed up on her nose. She is listening. The room is in night shadow, the window shows a dark sky. Her expression is thoughtful and awake, not frightened, but in need of company.`,
          composition: `Interior mid shot. The cat in her bed fills the frame, the dark room around her. The window is a lighter rectangle. A quiet, wakeful night scene.`,
          light:       `Very dim. Moonlight through the window, soft and blue-white. A single candle on the bedside table casting warm amber on her face.`
        })
      },

      {
        id: 2,
        text: { en: `She went to the kitchen and put the kettle on and took down her second-best teapot, which was the one she used when she was not sure how many cups she would need. She set out one cup to start with. While the kettle was coming to the boil, there was a small knock at the door.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat in a dressing-gown setting out a teacup in a candlelit kitchen, the kettle on the stove.',
        imagePrompt: prompt({
          scene:       `${CAST.whiskers} in her kitchen at night, setting one teacup on a round table. The kettle is on the small stove behind her, a faint steam beginning. The kitchen is lit by a single candle on the windowsill and the stove's warm glow. Her second-best teapot sits on the table. The back door is visible.`,
          composition: `Interior mid shot. The kitchen table with its solitary cup is the focus. Whiskers is behind it at the stove. The candle provides a single warm point of light. A quiet, late-night domestic scene.`,
          light:       `Candlelight on the windowsill, stove-glow from the left. Warm amber in a dark kitchen. Very cosy.`
        })
      },

      {
        id: 3,
        text: { en: `It was Mrs Meadows, holding her knitting bag, in her lavender bonnet. "I hope I am not imposing," she said. "I woke up and the house was very quiet and I thought perhaps I would walk around the lane." "You are not imposing at all," said Mrs Whiskers, who had already taken down a second cup. "Come in."` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A small mouse in a lavender night-bonnet on a doorstep, holding a knitting bag, looking apologetic.',
        imagePrompt: prompt({
          scene:       `${CAST.meadows} standing on Mrs Whiskers' back doorstep in her lavender bonnet and dressing-gown, knitting bag on her arm. Her expression is pleasantly apologetic. The dark garden is behind her. Through the open door, warm candlelight spills out toward her.`,
          composition: `Shot from inside the doorway looking out. Mrs Meadows is centred in the doorway, the warm kitchen light behind and around the viewer, the dark garden behind her. A threshold between dark and warmth.`,
          light:       `The warm kitchen light spills out to welcome the mouse. The garden behind her is dark and cool.`
        })
      },

      {
        id: 4,
        text: { en: `They sat with their tea. The kettle had done its work well. Mrs Meadows got out her knitting, which was something pale blue that was going to be a sock, and the needles clicked softly. Mrs Whiskers got out her tin of ginger biscuits, which she had baked that afternoon. They did not need to say much.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat and a mouse sitting at a kitchen table at midnight, tea and biscuits between them, the mouse knitting.',
        imagePrompt: prompt({
          scene:       `${CAST.whiskers} and ${CAST.meadows} sitting at the kitchen table, a teapot between them, two cups poured, a tin of ginger biscuits open. ${CAST.meadows} is knitting, needles clicking, pale-blue wool in her lap. ${CAST.whiskers} is settled back in her chair with her cup. Both are quiet and comfortable. Candlelight.`,
          composition: `Interior mid shot. The table between them, the teapot and biscuit tin central. Two characters on either side in their chairs. The knitting needles give movement to the still scene.`,
          light:       `Candlelight, warm amber, the best light for this kind of conversation. The rest of the kitchen is in comfortable shadow.`
        })
      },

      {
        id: 5,
        text: { en: `There was a tap at the window. It was not the tap of a branch. It was a deliberate, careful tap. Mrs Whiskers pushed up her spectacles and looked. Outside, filling most of the window, was the large round face of Professor Hoot, and he was mouthing something that looked very much like "May I come in?"` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A large owl\'s face filling the window frame, tapping on the glass politely.',
        imagePrompt: prompt({
          scene:       `${CAST.hoot}'s large face and chest fill the kitchen window frame from outside, his great eyes looking in warmly. One large wing-tip is raised in a polite knock. His plum dressing-gown is visible. Inside, ${CAST.whiskers} and ${CAST.meadows} look at him from their chairs, entirely unsurprised.`,
          composition: `Interior mid shot. The owl's face fills the window behind the table. The two characters inside look toward him. The window frames him like a portrait. Eye drawn to his large, gentle face.`,
          light:       `The owl is in moonlight from behind. The kitchen light falls on the window glass. His face is visible as a warm-eyed shape against the outside dark.`
        })
      },

      {
        id: 6,
        text: { en: `Professor Hoot was too large for the door. He always came to the window, which they had long ago agreed was perfectly acceptable. He arranged himself on the sill with his wings folded and his slippered feet tucked under him, and Mrs Whiskers added another cup. The tea was still hot. This was all working out well.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A large owl arranged on a windowsill from outside, while a cat pours a third cup of tea inside.',
        imagePrompt: prompt({
          scene:       `${CAST.hoot} arranged on the windowsill from outside, large and comfortable, wings folded, slippered feet tucked. The window is open. Inside, ${CAST.whiskers} pours a third cup of tea from the pot, which she passes to the windowsill. ${CAST.meadows} knits on. Everything is entirely natural.`,
          composition: `Interior shot taking in both inside and through the window. The owl fills the window right. Whiskers is left pouring. Meadows is seated in the middle-background. A companionable, absurd, charming arrangement.`,
          light:       `Inside candlelight meeting the moonlight outside. The owl is half in each. Both lights are warm in their different ways.`
        })
      },

      {
        id: 7,
        text: { en: `They talked about small things. Professor Hoot described the wood at midnight, which none of them had seen for some time. Mrs Meadows described the dream that had woken her, which involved a lot of stairs and a door that would not stay closed. Mrs Whiskers said: "There is always a door that will not stay closed."` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'Three animals in their nightclothes having a peaceful conversation by candlelight.',
        imagePrompt: prompt({
          scene:       `${CAST.hoot} on the sill, ${CAST.whiskers} in her chair, ${CAST.meadows} with her knitting, all in quiet conversation. The owl gestures with one wing-tip describing something. The two inside lean slightly toward him. Biscuit crumbs on the table. The teapot is half-empty.`,
          composition: `Interior wide shot. All three characters in their positions, the conversation among them. The candlelit table is the visual centre. Eye moves through the three faces.`,
          light:       `Warm candlelight, the conversation lit by it. The room is deeply comfortable in this light.`
        })
      },

      {
        id: 8,
        text: { en: `Professor Hoot said that midnight was the hinge of the night, the place where it stopped getting later and started getting earlier. Mrs Meadows said that was a very comforting thought. Mrs Whiskers agreed. They looked at the candle, which was burning well, and at the moon, which was moving slowly past the window.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'Three animals watching the moon move slowly past the window, all quiet.',
        imagePrompt: prompt({
          scene:       `All three friends turned toward the window watching the moon. ${CAST.hoot} on his sill looks at it from close quarters. ${CAST.whiskers} and ${CAST.meadows} at their table look through the window past him. The moon is large and round and moving slowly. A still, contemplative moment.`,
          composition: `Interior shot focusing on the window and the moon. The owl frames the window from outside. The two inside look past him. The moon is the destination of all gazes. A meditation on night.`,
          light:       `The moonlight has shifted stronger now, a blue-white rectangle of it on the kitchen floor. The candle is the amber counterpoint.`
        })
      },

      {
        id: 9,
        text: { en: `Mrs Meadows dropped her knitting. Mrs Whiskers' spectacles slid down her nose in the way they did when she was almost asleep. Professor Hoot's head was tilting sideways on the sill, which for an owl is not unusual, but tonight it meant something. The candle guttered once and stood tall again.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'Three animals beginning to fall asleep at the midnight tea table, the candle burning low.',
        imagePrompt: prompt({
          scene:       `${CAST.whiskers} with spectacles sliding down her nose, ${CAST.meadows} with dropped knitting in her lap, ${CAST.hoot} on the sill with his head tilted sideways: all three in the gentle slide of unexpected sleep. The teacups are mostly empty. The candle is lower. The moon is still in the window.`,
          composition: `Interior wide shot. Three sleeping figures in their positions, all mid-drift. The guttering candle is the lower-centre warm point. A picture of accidental, comfortable sleep.`,
          light:       `The candle is lower, flickering. The moonlight through the window is the steadier light now. The room has dimmed very slightly and comfortably.`
        })
      },

      {
        id: 10,
        text: { en: `They slept. The candle burned down and went out, but the moon came through the window and lit the kitchen in quiet silver. The teapot kept the last of its warmth a little longer. Outside, the wood was still, and the lane was empty, and the sky was turning from deep blue toward the very first grey of dawn.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'Three friends asleep in the kitchen, moonlight on them, the candle out, dawn just beginning outside.',
        imagePrompt: prompt({
          scene:       `The kitchen now lit only by moonlight, the candle out. ${CAST.whiskers} asleep in her chair, ${CAST.meadows} asleep with her knitting, ${CAST.hoot} asleep on the sill. The moon lights them all in silver. Through the window, the sky has the very first grey of pre-dawn. The teapot sits between them.`,
          composition: `Interior wide shot. Three sleeping figures in moonlight. The dark teapot is centred. The window shows the beginning of dawn. Peaceful, silver, complete.`,
          light:       `Moonlight only, silver-blue, the candle gone. Pre-dawn begins at the window. The most beautiful and still light of the story.`
        })
      },

      {
        id: 11,
        text: { en: `When they woke the sun was coming in and the kettle was cold. Professor Hoot had already gone, silently, as owls do, sometime in the turning hours. Mrs Meadows found her knitting on the table, neatly folded. They looked at the empty sill and the three empty cups and felt, though they could not quite say why, that they had spent the night very well.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat and mouse in morning light looking at an empty windowsill, three empty teacups on the table.',
        imagePrompt: prompt({
          scene:       `${CAST.whiskers} and ${CAST.meadows} standing in the morning kitchen, looking at the empty windowsill where the owl had been. Three empty teacups on the table. The knitting folded neatly. Morning sun coming in bright and warm. Both expressions are quiet and content.`,
          composition: `Interior mid shot. The two friends look at the empty sill. The morning light streams in. The three cups on the table are the record of the night. Eye drawn to the empty sill and the full cups.`,
          light:       `Morning sun, bright and warm, entirely different from the candlelight and moonlight of the night. A good, settled morning.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `Mrs Whiskers always kept her second-best teapot on the table after that. Just in case.` },
      image:    'assets/images/cartoon/cat.svg',
      imageAlt: 'A round kitchen table with three mismatched teacups and a teapot, a burned-down candle, moonlight through the window.',
      imagePrompt: prompt({
        scene:       `A quiet vignette of the kitchen table: three mismatched teacups, a teapot, a burned-down candle in its holder, and a small pile of pale-blue knitting. Moonlight comes through the window, and one large owl feather rests on the windowsill. The table is set for whoever might need to arrive.`,
        composition: `Close overhead shot of the table and its objects. The three cups are arranged around the teapot. The feather on the windowsill behind. The candle stub is the warm centre. A still life of friendship.`,
        light:       `Moonlight through the window, the candle stub barely glowing. Between the two: warmth.`
      })
    }

  }));

})(window.APP);

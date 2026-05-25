// ─── The Three Little Pigs ────────────────────────────────────────────────────
//
// A classic fairy tale retold in lyrical prose for young children.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Moral: hard work and careful preparation pay off.
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
    pig1: `Plump pink pig, a cheerful straw hat tilted to one side, bright blue dungarees, quick and good-natured, always a little in a hurry.`,
    pig2: `Plump pink pig, a green cap, brown leather apron, easy-going and cheerful, whistles while he works.`,
    pig3: `Plump pink pig, round wire spectacles, a sturdy grey apron dusted with brick dust, careful and methodical, takes great pride in a job done properly.`,
    wolf: `Lean grey wolf, a dark coat with a turned-up collar, sharp amber eyes beneath heavy brows, long jaw set in a calculating half-smile.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'three-pigs',
    title:    { en: 'The Three Little Pigs' },
    subtitle: 'a fairy tale',

    // Library presentation
    skin:    'classic',
    leather: 'plum',
    board:   'rose',
    color:   '#f582ae',

    // Reading metadata
    wordCount:   503,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['pig', 'wolf'],
    coverAnimal: 'pig',

    // Unlock requirement
    requirements: [
      { animalId: 'pig',  minCount: 3, label: 'Complete Pig 3×' },
      { animalId: 'wolf', minCount: 1, label: 'Find the Wolf'   }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/pig.svg',
      imageAlt: 'Three little pigs in dungarees and aprons setting off along a sunny road, each carrying a toolbox, the forest ahead of them.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.pig1}, ${CAST.pig2}, and ${CAST.pig3} walk together along a sunny country road, each carrying a small toolbox. They are cheerful and full of purpose. The road leads into a bright pastoral landscape. No wolf visible yet.`,
        composition: `Wide shot. The three pigs walk side by side filling the lower half of the frame, the bright country road receding behind them. Eye lands first on their determined, cheerful faces.`,
        light:       `Bright morning sun from behind the viewer, casting long warm shadows ahead of the pigs on the road. An optimistic, setting-out-on-an-adventure light.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Once upon a time three little pig brothers set off to build homes of their very own, each with a toolbox over one shoulder and a song in their heart. The eldest said he would be done by teatime. The middle one agreed. The youngest shook his head and said he would take as long as the work needed.` },
        image:    'assets/images/story/three-pigs/page-01.webp',
        imageAlt: 'Three cheerful little pigs walking along a sunny road, each carrying a toolbox, setting off to build their homes.',
        imagePrompt: prompt({
          scene:       `${CAST.pig1}, ${CAST.pig2}, and ${CAST.pig3} walk along a sunny country lane together. Each carries a small wooden toolbox. Pig1 is striding ahead confidently. Pig2 is whistling. Pig3 is consulting a small notebook. Rolling hills behind them, birds in the sky.`,
          composition: `Wide mid shot. The three pigs across the width of the frame on the lane, facing the viewer at a three-quarter angle. The country lane stretches away behind. Cheerful and full of energy.`,
          light:       `Bright, even morning light. Warm sun on pink snouts and dungarees. Clear sky.`
        })
      },

      {
        id: 2,
        text: { en: `The eldest pig gathered armfuls of golden straw from a sunny meadow and built himself a cosy thatched house in a single afternoon. He tucked his toolbox under the eaves, put a pot on the stove, and sat down on the front step, very pleased with himself.` },
        image:    'assets/images/story/three-pigs/page-03.webp',
        imageAlt: 'A pig in dungarees and a straw hat sitting contentedly on the step of a small thatched straw house, the meadow behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.pig1} sits on the front step of a freshly built straw house, small and round with a thatched roof, his straw hat pushed back on his head, looking thoroughly pleased. A pot of steam drifts from the chimney. Sunny meadow behind.`,
          composition: `Mid shot. The pig on the step is central. The straw house fills the background. The toolbox is tucked to one side. Cosy, satisfied, slightly ramshackle.`,
          light:       `Warm late-afternoon sun, golden and long. The straw of the house glows.`
        })
      },

      {
        id: 3,
        text: { en: `The second pig found a pile of dry sticks at the edge of the wood and built a neat house by mid-morning. He swept the front path, planted a small window box full of pansies, and settled inside just as the first clouds rolled in from the west.` },
        image:    'assets/images/story/three-pigs/page-02.webp',
        imageAlt: 'A pig in a green cap sweeping the front path of a stick house, a cheerful window box of pansies beside the door.',
        imagePrompt: prompt({
          scene:       `${CAST.pig2} sweeps the front path of his stick house with a small broom. The house is built of bundled sticks, slightly rough but charming, with a window box of yellow and purple pansies. Clouds gathering in the background sky.`,
          composition: `Mid shot. The pig and his house take the centre. The window box is a bright accent. The gathering clouds in the background create gentle tension.`,
          light:       `Soft morning light, slightly cooler than the previous scene. The approaching clouds are visible in the upper corners.`
        })
      },

      {
        id: 4,
        text: { en: `The third pig spent many days choosing the best bricks, mixing the stoutest mortar, and laying each course straight and true. His brothers visited and laughed and called him slow. The youngest pig smiled, pushed his spectacles up, and kept laying bricks.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'A pig in spectacles and a grey apron laying bricks carefully, a half-built brick house rising behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.pig3} kneels beside a half-built brick wall, trowel in hand, pressing a brick carefully into place and checking the level. His grey apron is dusty. In the background, ${CAST.pig1} and ${CAST.pig2} lean on a fence watching and laughing. Pig3's expression is undisturbed and focused.`,
          composition: `Mid shot. Pig3 is in the foreground, the wall he is building just below eye level. His brothers are small figures in the background. Eye lands on his careful, competent hands.`,
          light:       `Even, practical afternoon light. No drama yet. Solid and methodical.`
        })
      },

      {
        id: 5,
        text: { en: `Then a big grey wolf came prowling through the wood. He sniffed at the straw house and knocked on the door with one sharp knuckle. "Little pig, little pig, let me come in!" "Not by the hair of my chinny-chin-chin!" called the pig. The wolf took a huge breath and blew.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A lean grey wolf standing before a small straw house, taking a deep breath to blow, his eyes sharp and calculating.',
        imagePrompt: prompt({
          scene:       `${CAST.wolf} stands before the straw house, one paw raised as if having just knocked, head tilted back as he draws in a great breath to blow. His dark coat is blown slightly back. The small straw house looks fragile against his lean frame.`,
          composition: `Mid shot. The wolf is left of centre, his head turned toward the house. The straw house is right. The tension of the held breath fills the image.`,
          light:       `Cooler, more overcast light than before. A slight shadow falls across the scene.`
        })
      },

      {
        id: 6,
        text: { en: `He huffed and he puffed and he blew the straw house flat. The first pig ran squealing to his brother's stick house. The wolf followed, knocked, and got the same reply. He huffed and puffed again, and down came the stick house with a tremendous rattling crash.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A wolf blowing a great breath, straw flying in all directions, a small pig running away toward the trees.',
        imagePrompt: prompt({
          scene:       `${CAST.wolf} mid-blow, cheeks puffed, the straw house in the process of disintegrating around him — straw flying in great swirls. ${CAST.pig1} is a small pink figure running away toward the edge of the frame. The wolf's eyes are triumphant.`,
          composition: `Wide dramatic shot. The wolf central, the exploding straw house behind him. The running pig is small in the lower right. The straw fills the air with movement and energy.`,
          light:       `Stormy grey-green light, dramatic. The flying straw catches it in sharp lines.`
        })
      },

      {
        id: 7,
        text: { en: `The two pigs ran as fast as their trotters would carry them to the brick house. They dived inside and bolted the door and leaned against it, breathing hard. "No more running," said the youngest pig. "This house will hold." Outside, footsteps crunched slowly around the walls.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'Two little pigs leaning against a solid brick door, out of breath, while a third pig stands calmly in the middle of the room.',
        imagePrompt: prompt({
          scene:       `Interior of the brick house. ${CAST.pig1} and ${CAST.pig2} lean against the bolted door, out of breath, ears back. ${CAST.pig3} stands in the centre of the room, calm, adjusting his spectacles. A good fire burns in the hearth. The room is snug and solid. Through the small window, a dark shape is just visible outside.`,
          composition: `Wide interior shot. The two pigs at the door on the left, Pig3 centre-right. The hearth is the warm centre point. The window with the lurking shape in the background creates tension.`,
          light:       `Warm firelight from the hearth, contrasting with the cooler grey light from the small window.`
        })
      },

      {
        id: 8,
        text: { en: `The wolf huffed and he puffed. He puffed and he huffed. He took the biggest breath he had ever taken in his life, filled his chest until it ached, and blew with everything he had. The brick house did not move at all. Not one single brick even trembled.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A wolf blowing with all his might at a solid brick house, his cheeks huge, but the house standing completely firm.',
        imagePrompt: prompt({
          scene:       `${CAST.wolf} blows with enormous effort at the brick house, cheeks hugely puffed, feet braced, his dark coat streaming behind him. The brick house stands completely unmoved. Not a leaf stirs near it. The contrast between his extreme effort and the house's total stillness is the centre of the image.`,
          composition: `Mid shot, the wolf left and the brick house right. The wolf's effort takes the left half; the solid house the right. Eye reads left to right, from effort to immovable stone.`,
          light:       `Dark, stormy light. The wolf is in shadow; the brick house catches a small warm gleam from its own chimney.`
        })
      },

      {
        id: 9,
        text: { en: `The wolf circled the house, growling softly to himself. He looked up at the chimney, showed his pointed teeth in a slow smile, and began to climb the drainpipe. Inside, the three little pigs heard the scraping above them, and the youngest pig put a very large pot of water on the fire.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A wolf climbing up the side of a brick house toward the chimney, while inside the glow of a big pot on the fire is visible through the window.',
        imagePrompt: prompt({
          scene:       `${CAST.wolf} partway up the side of the brick house, one paw on the drainpipe, looking up at the chimney with a sly expression. Through the small window below him, the warm glow of a fire is visible and the silhouette of a large pot. The wolf does not see the pot.`,
          composition: `Mid shot from outside. The wolf climbing takes the left of the frame; the illuminated window is below right. Eye travels from the wolf's face up to the chimney, then down to the warning glow of the window.`,
          light:       `Dark evening light. The wolf is a shadow figure. The window glows warmly beneath him.`
        })
      },

      {
        id: 10,
        text: { en: `Down the chimney came the wolf with a great whoosh, straight into the pot of hot water. He leapt out with a tremendous yelp, scrambled back up the chimney, and ran away through the forest so fast that his dark coat was nothing but a blur between the trees.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A wolf leaping from a steaming pot in a brick fireplace, an expression of utter shock, bolting for the door.',
        imagePrompt: prompt({
          scene:       `Interior of the brick house. ${CAST.wolf} is mid-leap out of a large steaming pot in the fireplace, his coat soaking, his expression one of total shock and horror. Steam billows around him. ${CAST.pig1}, ${CAST.pig2}, and ${CAST.pig3} watch from the far side of the room, startled.`,
          composition: `Wide interior shot. The fireplace and leaping wolf take the left and centre. The three pigs are small in the right background. Steam and motion fill the air.`,
          light:       `Firelight and steam, bright and chaotic. The wolf is dramatically lit by the fire as he leaps.`
        })
      },

      {
        id: 11,
        text: { en: `The three little pigs danced and sang and had the most tremendous supper that evening. The eldest and the middle pig moved their things into the brick house, and between the three of them they made it the warmest, merriest, most wonderful home in the whole wood.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'Three little pigs dancing together in a cosy brick house, firelight on their faces, a big supper on the table behind them.',
        imagePrompt: prompt({
          scene:       `${CAST.pig1}, ${CAST.pig2}, and ${CAST.pig3} dancing together in a circle in the warm brick house, holding each other's trotters. A big supper is laid on the table behind them. The fire burns brightly. All three faces are lit with relief and happiness. Cosy curtains are drawn against the night.`,
          composition: `Wide interior shot. The three dancing pigs fill the centre of the frame, the laden supper table behind them, the glowing fire to one side. A warm, triumphant scene.`,
          light:       `Warm firelight from the hearth, golden on three happy pink faces. Candles on the table add to the glow. Cosy and complete.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And the wolf, having learned that a well-built house and three united brothers are more than a match for any huff and puff, found something else entirely to do with his afternoons.` },
      image:    'assets/images/cartoon/pig.svg',
      imageAlt: 'A view of the solid brick chimney of the three pigs\' house, a warm curl of smoke rising from it into a peaceful evening sky.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The chimney of the brick house, solid and well-built, with a warm curl of smoke rising steadily into a clear evening sky. A weathervane on the roof turns gently. A window below glows warmly. No wolf in sight. Everything is peaceful and resolved.`,
        composition: `Portrait shot looking up at the chimney against the evening sky. The warm window is visible below. The weathervane is a small accent at the top. Peaceful and settled.`,
        light:       `Soft evening light, the sky fading from blue to amber at the horizon. The chimney smoke is a warm grey against it.`
      })
    }

  }));

})(window.APP);

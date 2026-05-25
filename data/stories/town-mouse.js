// ─── The Town Mouse and the Country Mouse ────────────────────────────────────
//
// An Aesop fable retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~510 words · 4½ min read-aloud at toddler pace.
// Moral: a simple, safe life is worth more than a grand, dangerous one.
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
    daisy: `Small brown field mouse named Daisy, a cream linen apron tied at her waist, small straw bonnet with a daisy tucked in the ribbon band, gentle round eyes, flour often on her paws. Warm and unhurried in her manner.`,
    cobble: `Sleek grey town mouse named Cobble, a neat indigo waistcoat with tiny brass buttons, a crisp white cravat, carefully combed whiskers, quick bright eyes. Carries himself with great self-importance.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'town-mouse',
    title:    { en: 'The Town Mouse and the Country Mouse' },
    subtitle: 'an Aesop fable, retold',

    // Library presentation
    skin:    'classic',
    leather: 'sage',
    board:   null,
    color:   '#4a6741',

    // Reading metadata
    wordCount:   512,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['mouse'],
    coverAnimal: 'mouse',

    // Unlock requirement
    requirements: [
      { animalId: 'mouse', minCount: 2, label: 'Find two Mice' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/mouse.svg',
      imageAlt: 'A cosy round mouse burrow door in the roots of an apple tree, with a smart grey mouse in a waistcoat arriving at the door.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.daisy} stands in the doorway of her round burrow entrance, set into the roots of a gnarled apple tree. ${CAST.cobble} stands on the doorstep, one paw raised in greeting, his indigo waistcoat and white cravat immaculate. The meadow stretches behind him, wild poppies and clover in the grass. Ripe apples hang overhead.`,
        composition: `Wide mid shot. The apple tree roots and doorway take the centre-left, Cobble slightly right of centre, meadow background behind. Eye lands first on the contrast between Cobble's city finery and the simple country burrow.`,
        light:       `Warm morning sunlight from the right, catching the brass buttons on Cobble's waistcoat and the daisy in Daisy's bonnet. Soft dappled shadows from the apple branches above.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In the roots of an old apple tree, at the edge of a meadow full of clover and wild poppies, lived a small brown mouse named Daisy. Her home was a warm burrow lined with wool and dry grass, and her pantry held seeds, crumbs, and a pot of last autumn's apple jam.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A cosy round mouse burrow interior with a tiny pantry, wool lining, and a pot of jam on a shelf.',
        imagePrompt: prompt({
          scene:       `Interior of ${CAST.daisy}'s burrow. A small round room with walls lined in soft grey wool and dried grass. Shelves cut into the earth hold seed-filled jars and a small pot labelled with a painted apple. A rag rug on the floor, a low stool, a window that looks out to poppy stalks and clover. Warm and tidy. Daisy sits at her small table with a cup of tea.`,
          composition: `Interior wide shot, the burrow room filling the frame. The pantry shelves on the right, the round window on the left. Daisy is central, small and comfortable. Everything is scaled to mouse-size.`,
          light:       `Warm candlelight from a small tallow candle on the table, soft morning light filtering through the round window, a gentle glow throughout.`
        })
      },

      {
        id: 2,
        text: { en: `One bright morning there came a knock at the round wooden door. On the step stood a sleek grey mouse in an indigo waistcoat, his white cravat perfectly tied and his whiskers combed to a point. It was Daisy's cousin Cobble, come all the way from the city. He looked around at the meadow and wrinkled his nose just a little.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A smartly dressed grey mouse standing on a country doorstep, looking around at the meadow with polite uncertainty.',
        imagePrompt: prompt({
          scene:       `${CAST.cobble} standing on ${CAST.daisy}'s doorstep. He holds a small leather travel bag in one paw. Behind him the meadow stretches out, poppies and grasses in the breeze. He looks around with a faintly puzzled expression, nose slightly wrinkled. Daisy's round door is open behind him, warm light from inside.`,
          composition: `Mid shot from inside the doorway looking out. Cobble dominates the frame, the meadow behind him in soft focus. His finery contrasts with the wildflower meadow backdrop. Eye drawn to his expression.`,
          light:       `Bright clear morning sunlight on Cobble's waistcoat, warm light from inside the burrow spilling forward across the doorstep.`
        })
      },

      {
        id: 3,
        text: { en: `Cobble stayed for supper. Daisy served barleybread and clover honey, and he ate every crumb. But when she offered him a second helping, he leaned forward and said, quite seriously: "My dear Daisy, you really ought to visit me. I have cheeses and cakes and cold meats. Why eat meadow seeds when you could eat like a king?"` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Two mice sitting at a tiny table with bread and honey, the town mouse leaning forward persuasively.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} and ${CAST.cobble} seated across a small round table spread with a barleybread loaf, a honeypot, and two tiny cups of chamomile tea. Cobble leans forward on his elbows, gesturing with one paw, speaking earnestly. Daisy listens with a patient, slightly amused expression. The burrow interior around them is warm and candlelit.`,
          composition: `Interior mid shot. The table is centred with both characters facing each other across it. Eye drawn first to Cobble's forward-leaning posture and gesturing paw, then to Daisy's calm expression.`,
          light:       `Warm candlelight central on the table between them, catching the honeypot and the bread, soft shadows at the walls.`
        })
      },

      {
        id: 4,
        text: { en: `Daisy agreed to go, just for a look. The city was enormous. Wheels rumbled on cobblestones. Pigeons clattered overhead. Cobble led her through a gap in a skirting board and along a hidden passage into the grandest room she had ever seen. There was a table so piled with food she could barely see the far end.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Two tiny mice peeping out from a gap in a skirting board into a grand dining room with a vast table.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} and ${CAST.cobble} poking their heads through a gap at the base of a richly painted skirting board, into a vast, dimly lit dining room. A grand table stretches away from them, laden with bread, cheese wheels, a cut cake, fruit. The scale dwarfs both mice utterly. Daisy's eyes are wide.`,
          composition: `Low-angle wide shot from mouse height. The gap in the skirting board is in the left foreground, the table receding dramatically away to the right. Eye lands on the two tiny mice, then sweeps to the immense table beyond.`,
          light:       `Dim, grand room lit by a chandelier far above. Candlelight falls richly on the food, cooler light in the foreground near the mice.`
        })
      },

      {
        id: 5,
        text: { en: `There were crumbs of cake, scraps of cheese, a whole half-biscuit with currants in it. Daisy had taken exactly three nibbles when a shadow fell across the floor. The largest, fluffiest, most enormous cat she had ever seen stepped slowly into the room, its great green eyes sweeping from side to side.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Two mice frozen with a biscuit between them as the shadow of a huge cat falls across the floor.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} frozen mid-nibble on a large currant biscuit, ${CAST.cobble} beside her equally still. A vast shadow of a cat falls across the floorboards toward them from off-frame right. The biscuit crumbs, cheese scraps, and cake pieces are scattered around the mice. The shadow is unmistakable.`,
          composition: `Mid shot, close to the floor. The two mice are centred, the biscuit between them. The dark cat shadow enters from the right edge, cutting diagonally across the frame. Eye drawn to the contrast between the cosy food and the encroaching shadow.`,
          light:       `The chandelier above casts warm light on the table; the cat shadow cuts coldly across that warmth, creating a stark tonal contrast.`
        })
      },

      {
        id: 6,
        text: { en: `Cobble hissed, "Run!" They ran. Daisy ran so fast her apron flew straight out behind her. They wedged themselves into a tiny gap between two floorboards, pressed flat and breathless, hearts hammering, until the cat's slow padded footsteps eventually moved away down the hall.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Two mice pressed flat and breathless in a crack between floorboards, wide-eyed with relief as the cat moves away.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} and ${CAST.cobble} squeezed flat into a narrow crack between two dark floorboards, only their heads and shoulders visible. Both are pressed in tight, eyes wide, whiskers trembling. Daisy's apron is rucked up. The cat's large, fluffy tail is disappearing around a corner in the background.`,
          composition: `Worm's-eye mid shot from floorboard level. The two mice in the crack take the centre foreground. The retreating tail is small in the background. A sense of tight, anxious space.`,
          light:       `Dark, dim floor-level light. Only the mice's eyes and Cobble's brass buttons catch any light. The cat's retreating shape is in shadow.`
        })
      },

      {
        id: 7,
        text: { en: `Cobble said, briskly, "She's gone. Come back!" They crept out again. Daisy had barely reached the biscuit when a great booming bark rang out and a large shaggy dog bounded into the room, nose sweeping the floorboards. They fled again, faster still, Daisy's bonnet nearly coming off this time.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Two mice sprinting away across floorboards while a large shaggy dog\'s nose sweeps toward them.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} sprinting at full speed, her straw bonnet lifted off at an angle, ${CAST.cobble} racing just ahead of her. Behind them an enormous shaggy dog has its head down, nose dragging along the floorboards toward them. The biscuit and food scraps are scattered in the distance behind the dog.`,
          composition: `Low-angle wide shot. The two mice sprint diagonally across the frame left-to-right, the dog looms in the background right. A sense of frantic, noisy speed. Eye follows the mice.`,
          light:       `Bright room light exposing everything — nowhere to hide, the scene feels open and exposed, heightening the urgency.`
        })
      },

      {
        id: 8,
        text: { en: `When they were safely behind the skirting board, Daisy sat down and caught her breath. Cobble was already straightening his cravat. "You see?" he said. "Exciting, isn't it?" Daisy looked at him for a long moment. Then she picked up her basket. "I think," she said very politely, "I would like to go home."` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Daisy the country mouse sitting calmly in a hidden passage, picking up her basket, while the town mouse straightens his cravat.',
        imagePrompt: prompt({
          scene:       `The hidden passage behind the skirting board. ${CAST.cobble} stands upright straightening his white cravat with both paws, a slightly smug expression on his face. ${CAST.daisy} sits on the floor of the passage, catching her breath, one paw on her bonnet and the other reaching for her small wicker basket. Her expression is polite but decided.`,
          composition: `Interior corridor shot. Both mice are in the narrow passage, Cobble left and standing, Daisy right and seated. The contrast in postures tells the story. Eye moves between them.`,
          light:       `Dim, close passage light. A faint crack of bright room light from the skirting board gap to the left. The light emphasises the cosy-dark contrast of this hidden space.`
        })
      },

      {
        id: 9,
        text: { en: `Cobble tried to persuade her with talk of future feasts and dancing evenings and very fine cheeses. But Daisy had already tied her bonnet strings. She kissed him on both cheeks and thanked him most sincerely for the three nibbles of biscuit she had managed to eat. Then she squeezed back through the gap into the cool evening air.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Daisy kissing Cobble goodbye on the cheek before squeezing through the skirting board gap to freedom.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} standing on tiptoe to kiss ${CAST.cobble} on the cheek, her basket over one arm, bonnet strings neatly tied. Cobble's expression is half-amused and half-resigned. The skirting board gap is open behind Daisy, cool evening light visible beyond it. Her small paw is patting his shoulder in farewell.`,
          composition: `Close mid shot. The two mice centred, the gesture of the kiss the focal point. The open gap glows behind Daisy, drawing the eye toward her exit. A warm, affectionate but resolute goodbye.`,
          light:       `The cool evening light from the gap behind Daisy lights her from behind, giving her a gentle halo effect against the dim passage.`
        })
      },

      {
        id: 10,
        text: { en: `She walked all the way home through the cool twilight. By the time she reached the meadow, the moon was up, round and gold above the apple tree. Crickets sang in the long grass. A frog croaked twice near the stream. It was the most beautiful sound she had heard all day.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A small mouse walking home alone through a moonlit meadow, the apple tree visible ahead.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} walking along a narrow field path through tall grasses and clover, her basket swinging, her bonnet on straight. The full moon hangs above the silhouette of the apple tree in the middle distance. Wild poppies have closed for the night. Cricket song implied in the peaceful stillness.`,
          composition: `Wide shot, the path receding toward the apple tree in the centre-background. Daisy is small on the path, her figure silhouetted against the warm moonlit meadow. The apple tree is a welcoming beacon.`,
          light:       `Soft cool moonlight from above and to the right, pale blue-silver on the grass tops and Daisy's bonnet. Warm gold glow around the moon itself.`
        })
      },

      {
        id: 11,
        text: { en: `Daisy hung up her bonnet and stoked the little stove. She made a pot of mint tea and sat with her feet up, listening to the quiet. Through the round window she could see the moon and the meadow and the apple tree, silver and still. Simple, she decided, was exactly right.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Daisy the mouse sitting contentedly in her armchair with a cup of mint tea, moonlit meadow visible through the round window.',
        imagePrompt: prompt({
          scene:       `${CAST.daisy} in her burrow interior, feet up on a small footstool, a steaming cup of mint tea in her paws. Her bonnet hangs on a peg by the door. A small stove glows warmly to one side. Through the round window, the moonlit meadow and the apple tree are visible, peaceful and silver. Her expression is perfectly content.`,
          composition: `Interior mid shot. Daisy centred in her chair, the round window behind her framing the moonlit meadow like a picture. The stove glows to the left. Everything warm and small and right. Eye rests on Daisy's face.`,
          light:       `Warm stove-glow on Daisy's face and paws, cool moonlight coming through the window behind her, the two light sources meeting softly around her.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And Daisy never stopped being glad she had gone. But she was even gladder to be home.` },
      image:    'assets/images/cartoon/mouse.svg',
      imageAlt: 'A small round window above a moonlit meadow, a half-drunk cup of mint tea on the windowsill, a single daisy on the saucer.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The round burrow window from inside, the moonlit apple tree and meadow visible through the glass. On the windowsill sits a small earthenware cup, half-drunk, a sprig of fresh mint across the rim. A single daisy is laid on the saucer. The stove casts a warm reflected glow on the wall below the window.`,
        composition: `Near-close shot of the windowsill and window. The daisy on the saucer is the single warm detail in a cool, peaceful scene. Eye rests first on the daisy, then lifts to the moonlit tree outside.`,
        light:       `Cool moonlight through the glass, warm amber stove-glow reflected on the wall and sill below. Still and peaceful.`
      })
    }

  }));

})(window.APP);

// ─── The Bremen Town Musicians ────────────────────────────────────────────────
//
// A Brothers Grimm tale retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~510 words · 4½ min read-aloud at toddler pace.
// Moral: old friends, working together, can find a new home.
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
    donkey: `Old Dusty the donkey: a grey donkey with a white muzzle and a kind, slow face, wearing a faded blue work-shirt with the collar unbuttoned and a battered straw hat. Moves with dignified, unhurried patience. Has seen a great deal of life.`,
    dog:    `Old Bram the dog: a shaggy grey-muzzled hound in a worn brown waistcoat and a patched neckerchief. One ear always folded. Slower than he was, but his bark is still magnificent.`,
    cat:    `Old Mira the cat: a silver-tabby cat in a dusty rose shawl and small wire spectacles she doesn't actually need. Dignified, slightly stiff in the joints, but her voice is still music.`,
    hen:    `Old Hattie the hen: a rust-and-white hen in a grey linen apron, smaller than she used to be, but her crow still rings like a bell and she walks with great purpose for a bird of her age.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'bremen-musicians',
    title:    { en: 'The Bremen Town Musicians' },
    subtitle: 'after the Brothers Grimm',

    // Library presentation
    skin:    'classic',
    leather: 'slate',
    board:   null,
    color:   '#3d4f6b',

    // Reading metadata
    wordCount:   508,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['donkey', 'dog', 'cat', 'hen'],
    coverAnimal: 'donkey',

    // Unlock requirement
    requirements: [
      { animalId: 'donkey', minCount: 1, label: 'Find the Donkey' },
      { animalId: 'hen',    minCount: 1, label: 'Find the Hen'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/donkey.svg',
      imageAlt: 'Four old animals walking together down a road toward a distant town, making music.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.donkey} walking along a winding road, ${CAST.dog} walking beside him, ${CAST.cat} following behind, and ${CAST.hen} perched on the donkey's back and crowing. All four look cheerful, unhurried, and purposeful. A distant town is visible on the horizon. Each animal has a look of quiet joy at being together.`,
        composition: `Wide shot, the road receding toward the distant town. The four animals are in a loose group, the donkey largest and leading. Eye drawn first to the hen perched high on the donkey's back, then to the whole companionable group.`,
        light:       `Golden late-afternoon sun from the right, long shadows on the road, the distant town a warm glow on the horizon.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Old Dusty the donkey had worked on the farm for many, many years. He had carried more loads than he could count, and his back was stiff and his coat was grey, and one morning the farmer decided he was too old to be useful. So Dusty made a decision. He put on his hat and walked away down the road.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'An old grey donkey in a straw hat walking away down a road, the farm gate behind him.',
        imagePrompt: prompt({
          scene:       `${CAST.donkey} walking away from a farm gate, his back to the viewer, straw hat on, a small bundle tied to a stick over his shoulder. The farm buildings are behind him, the open road ahead. His step is slow but decided. A distant figure at the gate (implied farmer) grows smaller behind him.`,
          composition: `Wide rear shot. The donkey moves away from the camera down the centre of the road, the farm receding behind. Eye follows him toward the open horizon. A leaving scene, but not sad.`,
          light:       `Morning light from the front, ahead of the donkey, drawing him toward a new day.`
        })
      },

      {
        id: 2,
        text: { en: `Not far down the lane he met old Bram the dog, sitting by a stile with his head in his paws. "Too old to hunt," said Bram. "Too slow. Nowhere to go." Dusty said, "Come with me. We are going to make music in the town." The dog lifted one ear. Then he stood up, shook himself, and joined the road.` },
        image:    'assets/images/cartoon/dog.svg',
        imageAlt: 'An old hound dog sitting sadly by a stile, looking up as a grey donkey arrives.',
        imagePrompt: prompt({
          scene:       `${CAST.dog} sitting hunched at a mossy stile, head on paws, ears down. ${CAST.donkey} has stopped beside him, looking at him with calm, encouraging eyes. A moment before the dog decides to get up. The lane stretches behind them, empty.`,
          composition: `Mid shot. Both animals at the stile, the dog low and the donkey standing beside him. Eye drawn to the dog's sad posture and the donkey's gentle attention.`,
          light:       `Cool morning shade by the stile, the lane beyond in warmer light, inviting.`
        })
      },

      {
        id: 3,
        text: { en: `They found old Mira the cat on a garden wall, wrapped in her shawl and staring at nothing. "Too old to catch mice," she said. "They just laugh at me now." "Can you sing?" asked Dusty. "I used to," said Mira. "Then come and sing," said Dusty. Mira adjusted her spectacles and stepped down from the wall.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'An elderly tabby cat on a garden wall, a donkey and dog inviting her to come along.',
        imagePrompt: prompt({
          scene:       `${CAST.cat} perched on a low stone garden wall, shawl around her, wire spectacles on her nose, staring into the middle distance with a melancholy expression. ${CAST.donkey} and ${CAST.dog} stand in the lane below, looking up at her encouragingly. A cottage garden behind the wall.`,
          composition: `Mid shot. The cat on the wall is slightly above the other two. She looks down at them, they look up at her. A three-character invitation scene. Eye moves between the cat's pensiveness and the others' encouragement.`,
          light:       `Soft morning light on the garden wall, warmer in the lane below.`
        })
      },

      {
        id: 4,
        text: { en: `And then there was old Hattie the hen, standing in the yard of a house that had grown too busy for her. She crowed at the dawn and the family slept through it. "No one needs me," she said. "I need you," said Dusty. "Climb up." So Hattie rode on the donkey's back, and together all four set off down the road.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'A hen perched proudly on the back of a donkey, a dog and cat walking beside them.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} perched on ${CAST.donkey}'s back, wings out for balance, head high and proud. The donkey walks steadily, ${CAST.dog} trots to his left, ${CAST.cat} walks to his right. All four are in motion, the road ahead of them wide and clear. A genuine sense of companionable forward movement.`,
          composition: `Wide mid shot, the group moving left to right across the frame. The hen is the highest point. Eye drawn to the four animals together, finally a proper company.`,
          light:       `The day has brightened, clear midday sun, the road warm and open ahead.`
        })
      },

      {
        id: 5,
        text: { en: `They walked all day, singing in a ragged and rather wonderful way. The donkey's bray was deep and low. The dog's howl was broad and echoing. The cat's voice wound up and down through the middle. The hen's crow rang over the top of all of it. None of it matched, but all of it was happy, and that was enough.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'Four animals walking along a forest path, all singing together, heads up.',
        imagePrompt: prompt({
          scene:       `The four friends walking through a dappled forest path, all mid-song. ${CAST.donkey} head thrown back in a bray. ${CAST.dog} howling with eyes closed. ${CAST.cat} mouth open in a sustained note, eyes half-shut. ${CAST.hen} on the donkey's back, crowing at full volume. Birds scatter from the branches above. The effect is clearly loud and completely joyful.`,
          composition: `Wide mid shot, the forest path framing the group. All four in full voice. Eye drawn to the variety of singing postures and the general cheerful chaos of their sound.`,
          light:       `Dappled late-afternoon light through the trees, warm patches on the singers.`
        })
      },

      {
        id: 6,
        text: { en: `At evening, deep in the forest, they saw a light. Through the trees there was a little stone cottage with warm candlelight in every window. They crept closer and looked in. Inside were four rough-looking stoats counting a pile of gold coins and eating a very fine supper.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'Four animals peering through a lighted cottage window at shadowy figures inside.',
        imagePrompt: prompt({
          scene:       `The four friends crouched below a lit cottage window at night, peering over the sill. Inside, visible through the glass, four rough stoat figures sit at a table with a pile of coins and a spread of food. The animals outside are lit from the window's warm glow, their expressions curious and hungry.`,
          composition: `Exterior night shot. The window is the light source, the animals are silhouetted and half-lit against it. Eye drawn to the warm golden window, then to the animals peering in.`,
          light:       `Warm candlelight from inside the cottage illuminates the animals' faces from below. The forest around them is dark and cool. A cosy light in darkness scene.`
        })
      },

      {
        id: 7,
        text: { en: `"We need to make them leave," said the cat. "How?" said the dog. The donkey thought for a moment. Then he said, very quietly: "We make our music." The dog climbed on the donkey's back. The cat climbed on the dog. The hen flew to the top of the cat. Then they looked at each other. "Ready?" said Dusty.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'A tower of four animals stacked outside the cottage window: donkey at the bottom, dog, cat, and hen at the top.',
        imagePrompt: prompt({
          scene:       `Outside the cottage window: ${CAST.donkey} standing firm, ${CAST.dog} balanced on his back with legs wide, ${CAST.cat} perched on the dog with great dignity, and ${CAST.hen} balancing on the cat's head with wings out. All four face the window. The tower is wobbly but holding. Their expressions are determined.`,
          composition: `Vertical wide shot. The animal tower fills the frame top to bottom, the lit window behind them. Eye travels up from the donkey's hooves to the hen's crest. The window glow provides backlight.`,
          light:       `The warm cottage window light glows behind and around them. The night forest is dark on either side. A dramatic, comic silhouette.`
        })
      },

      {
        id: 8,
        text: { en: `They did not wait. The donkey brayed. The dog howled. The cat yowled. The hen crowed. All four at once, as loud as they had ever been. The window burst open. Four stoats flew out through the door in a tremendous panic and disappeared into the dark trees. The cottage fell silent.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'The cottage window flung open, shadowy figures fleeing into the night, the four musicians triumphant.',
        imagePrompt: prompt({
          scene:       `The cottage door flung wide, four small stoat figures scrambling away into the dark trees in the background, hats flying. In the foreground the four friends are mid-concert: the donkey braying, dog howling, cat yowling, hen crowing. The tower has collapsed forward, all four now standing side by side, mouths open, making an extraordinary noise.`,
          composition: `Wide night shot. The departing stoats are small in the background. The four animals dominate the foreground, caught in their musical moment. Eye drawn to the fleeing figures and then back to the triumphant noise-makers.`,
          light:       `Warm cottage light spills from the open door. The night forest is dark beyond the fleeing figures. Drama and comedy in equal measure.`
        })
      },

      {
        id: 9,
        text: { en: `They went inside. The fire was warm, the supper was good, and there were exactly four chairs. The cat slept on the hearth. The dog curled by the door. The hen settled in the rafters. The donkey lay down in the soft hay of the little stable room. All four slept better than they had in years.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'The inside of a warm cottage: a cat on the hearth, a dog by the door, a hen in the rafters, and a donkey in the stable corner.',
        imagePrompt: prompt({
          scene:       `The cottage interior at night. ${CAST.cat} curled on the warm hearthrug, spectacles folded beside her. ${CAST.dog} asleep across the doormat, one ear down. ${CAST.hen} asleep in the rafters above, feathers puffed. Through an open archway to a small stable room, ${CAST.donkey} lies in clean hay. All four asleep, the fire low and warm.`,
          composition: `Wide interior shot, the whole cottage visible. Each sleeping animal in their natural place. The fire at the centre glows low. Eye moves from one sleeper to the next, tracing the warmth of the room.`,
          light:       `Low firelight, amber and warm, the only light source. Deep, contented shadows everywhere. The most comfortable image in the story.`
        })
      },

      {
        id: 10,
        text: { en: `In the morning they ate the leftover supper and made the cottage tidy. They talked about going on to the town to make music, as they had planned. But the cottage was warm, and the fire was still going, and they had all slept so well. "We could stay for a day," said the dog. "Just one day," agreed the cat.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'Four animals sitting around a cottage table eating a peaceful breakfast.',
        imagePrompt: prompt({
          scene:       `Morning inside the cottage. ${CAST.donkey}, ${CAST.dog}, ${CAST.cat}, and ${CAST.hen} are gathered around a low table with the remains of a good supper repurposed into breakfast. The fire is freshly stoked. Morning light comes through the window. All four look comfortable, sleepy, and in absolutely no hurry to leave.`,
          composition: `Interior mid shot. The four friends around the table, the fire glowing behind. A relaxed, domestic scene after the excitement of the night. Eye rests on the four content faces.`,
          light:       `Morning light from the window mixing with the low fire glow. Warm, unhurried, golden.`
        })
      },

      {
        id: 11,
        text: { en: `That was a long time ago. They never did get to the town. But on quiet evenings, if you stand in the forest and listen, you can sometimes hear a donkey's bray, a dog's howl, a cat's high note, and a hen's crow, all at once and not quite in tune. And they do not sound unhappy at all.` },
        image:    'assets/images/cartoon/donkey.svg',
        imageAlt: 'The little stone cottage in the forest at evening, warm light in every window, music implied.',
        imagePrompt: prompt({
          scene:       `The little stone cottage at evening, glimpsed through the trees. Warm amber light in all the windows. The chimney puts out a comfortable curl of smoke. The forest around it is deep green and cool. There is no other building visible. Just this one warm, lit, occupied cottage in the forest.`,
          composition: `Wide establishing shot from within the forest, trees framing either side, the cottage centred in a clearing. Warm light from the windows is the focal point. A deeply cosy image.`,
          light:       `Evening golden light in the windows, cool blue forest dusk around them. The contrast makes the cottage look like the warmest place in the world.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And if you listen on a still evening, you may hear them still.` },
      image:    'assets/images/cartoon/donkey.svg',
      imageAlt: 'A cottage window at night with warm light inside, the faint suggestion of four silhouettes making music.',
      imagePrompt: prompt({
        scene:       `A single cottage window at night, warm amber light within. The faint silhouettes of four animals are visible inside through the glass: a large long-eared shape, a hound shape, a cat shape, and a small bird shape in the upper corner. They appear to be in mid-song. Outside, the forest is dark and still.`,
        composition: `Close shot of the window from outside. The warm silhouettes inside are the entire story. The glass and night frame them. Eye goes immediately to the light and the shapes within.`,
        light:       `All light from inside the cottage, amber and warm. The outside is night-dark, making the window a small bright world.`
      })
    }

  }));

})(window.APP);

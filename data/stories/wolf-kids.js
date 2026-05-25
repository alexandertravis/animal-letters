// ─── The Wolf and the Seven Kids ─────────────────────────────────────────────
//
// A Brothers Grimm tale retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Moral: be clever, listen carefully, and trust what you notice.
// (Child-friendly version: the kids outsmart the wolf; everyone stays safe.)
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
    mama:  `Mama Goat: a graceful white nanny goat in a dusty-rose apron and a cream bonnet, calm and warm, with gentle eyes and a soft voice. She is the wisest person the kids know.`,
    kids:  `The seven kids: seven small white goat children of various sizes, all in simple smocks and short trousers of different soft colours (sage, yellow, pale blue, rose, lavender, oat, cream). They look almost identical except for size, and they cluster together naturally in clusters of twos and threes.`,
    wolf:  `The wolf: a large grey wolf in a battered dark coat and a pulled-down hat, trying very hard to sound friendly, which does not entirely suit him. His paws, when visible, are grey and large. He is not quite clever enough.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'wolf-kids',
    title:    { en: 'The Wolf and the Seven Kids' },
    subtitle: 'after the Brothers Grimm',

    // Library presentation
    skin:    'classic',
    leather: 'charcoal',
    board:   null,
    color:   '#3a3a3a',

    // Reading metadata
    wordCount:   501,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['goat', 'wolf'],
    coverAnimal: 'goat',

    // Unlock requirement
    requirements: [
      { animalId: 'goat', minCount: 1, label: 'Find the Goat' },
      { animalId: 'wolf', minCount: 1, label: 'Find the Wolf' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/goat.svg',
      imageAlt: 'Seven small goat kids clustered together by a bolted cottage door, listening carefully.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.kids} clustered together just inside a cosy cottage, all looking toward the bolted wooden door with various expressions of alertness, worry, and determination. The smallest is holding the hand of the second-smallest. A wolf's shadow is faintly visible under the door gap. The cottage interior is warm and safe.`,
        composition: `Interior wide shot. The seven kids fill the frame in a cluster, the bolted door behind them. Eye drawn to the cluster of faces and their variety of cautious expressions, then to the shadow at the door.`,
        light:       `Warm cottage interior light, candle and firelight, contrasting with the cool shadow at the base of the door.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `In a cottage at the edge of the meadow, a mother goat lived with her seven kids. Each morning she put on her apron and her bonnet and kissed each of them in order from tallest to smallest. She loved them all completely, which is why, one morning, she sat them all down for a serious talk.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A mother goat in an apron sitting with seven small goat kids around her in a cosy cottage.',
        imagePrompt: prompt({
          scene:       `${CAST.mama} sitting in a low chair in the cottage kitchen, ${CAST.kids} arranged in a cluster around her, all looking up at her attentively. Seven small faces in a range of sizes, all wearing their soft-coloured smocks. Mama's expression is warm but serious. A wicker basket and a shopping list are on the table.`,
          composition: `Interior mid shot. Mama centred, the kids in a ring around her. All faces readable. The cottage kitchen warm behind them. Eye drawn first to Mama's serious expression, then to the attentive kids.`,
          light:       `Warm morning kitchen light, sunlight from the window, comfortable and domestic.`
        })
      },

      {
        id: 2,
        text: { en: `"I must go to market," said Mama. "You are to stay inside, bolt the door, and open it for no one except me. You will know my voice because it is soft. You will know my paw because it is white. If anything seems wrong, trust what you notice." Seven small heads nodded, very seriously.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Seven small goat kids nodding very seriously while their mother points to the door bolt.',
        imagePrompt: prompt({
          scene:       `${CAST.mama} standing by the cottage door, pointing to the bolt with one hoof. ${CAST.kids} stand in a line of seven from tallest to smallest, all nodding with great seriousness. Their expressions are a mix of concentration and the desire to get this right.`,
          composition: `Interior mid shot. Mama at the door left, the row of seven kids right. The door bolt is highlighted by her pointing hoof. Eye travels from Mama's gesture to the line of nodding kids.`,
          light:       `Morning light from a small window, the door itself a darker, more serious presence in the warm room.`
        })
      },

      {
        id: 3,
        text: { en: `She kissed them all again and went. They bolted the door behind her. They could hear her footsteps on the path until they could not. Then the cottage was quiet, and the seven kids sat together by the hearth and waited, which was not their favourite thing but which they were doing their very best at.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Seven small goat kids sitting together by the hearth, waiting quietly.',
        imagePrompt: prompt({
          scene:       `${CAST.kids} settled around a low hearth in the cottage living room. Some sit, some stand, the smallest is curled in the biggest's lap. All are quiet and listening. The bolted door is visible across the room. A clock on the mantelpiece. Comfortable but watchful.`,
          composition: `Interior wide shot. The kids cluster around the hearth which is warm and central. The bolted door is visible in the background. A waiting scene, warm but alert.`,
          light:       `Warm hearth-fire light, the room amber and cosy. The door at the back is cooler, slightly dim.`
        })
      },

      {
        id: 4,
        text: { en: `It was not long before there was a knock at the door. A voice called: "It is I, children, your dear mother! Open the door!" The eldest kid pressed his ear to the wood. The voice was not soft. It was rough and low and quite wrong. "That is not Mama," he said. "Do not open."` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'The eldest kid with his ear pressed to the door, the others watching him.',
        imagePrompt: prompt({
          scene:       `The tallest of ${CAST.kids} with his ear pressed flat against the cottage door, one hoof raised to shush the others. The other six kids stand in a cluster behind him, eyes wide, listening. All are still. Outside the door, ${CAST.wolf}'s grey paw is visible in the gap at the threshold.`,
          composition: `Interior mid shot from inside the cottage. The eldest kid and the door take the right side. The other kids cluster left and behind. The wolf's grey paw at the door gap is a small but unmistakable detail.`,
          light:       `The cottage interior is warm. The gap at the door base shows cool outside light. The wolf's paw is grey against that light.`
        })
      },

      {
        id: 5,
        text: { en: `"Go away," said the eldest, very clearly. The voice went away, and they heard footsteps in the grass. They waited. Not long after, the knock came again. This time the voice was softer, but something about it was still not right. The middle kid pointed to the door gap. Under it lay a large grey paw.` },
        image:    'assets/images/cartoon/wolf.svg',
        imageAlt: 'A grey wolf paw visible under a cottage door, and seven small goats inside pointing at it.',
        imagePrompt: prompt({
          scene:       `Inside the cottage, one of the middle-sized kids pointing down at the bottom of the door where a large grey wolf's paw is pressed against the threshold, not quite hidden. The other kids crowd around to look. All faces show quiet alarm. One holds another's hand.`,
          composition: `Low interior shot, close to the floor. The wolf's grey paw under the door is the focal point, the cluster of young goat faces above it. Eye drawn immediately to the paw.`,
          light:       `Low interior firelight. The light at the base of the door is cooler, and the grey paw shows up clearly against it.`
        })
      },

      {
        id: 6,
        text: { en: `"Your paw is grey," said the smallest kid, in the clearest voice she had, through the door. "Mama's paw is white." There was a silence. Then there were footsteps again. Then silence again. The seven kids looked at each other. "It is still out there," said the middle kid. "It is trying to think of something."` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Seven small goat kids standing together looking at the door, looking alert and united.',
        imagePrompt: prompt({
          scene:       `${CAST.kids} standing in a group by the door, having delivered their message, now listening to the silence beyond. Their postures are united and alert. The smallest stands at the front, chin up, having just spoken. The others look at the door and then at each other.`,
          composition: `Interior mid shot. The kids face the door in a loose cluster. The smallest is slightly forward. All are turned toward the door. A moment of collective determination.`,
          light:       `Warm firelight on the kids, the door dim ahead. The contrast between the warm children and the uncertain door.`
        })
      },

      {
        id: 7,
        text: { en: `A third knock came. The voice was softer still, and this time a white-wrapped paw appeared under the door. But the second kid was already kneeling on the floor, looking carefully. "The shadow is too big," she whispered. "Too big for Mama. Much too big." She stood up. "Still not right," she told the door.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A kid kneeling on the floor looking at the shadow of the paw under the door, looking suspicious.',
        imagePrompt: prompt({
          scene:       `One of the middle-sized kids kneeling on the floor, looking at the shadow cast by the white-wrapped paw under the door. The shadow on the floorboards is clearly too large for a goat. The other kids stand behind, watching. The wrapped paw itself is visible at the door base.`,
          composition: `Interior low shot from floor level. The kid kneeling takes the left foreground, the shadow on the floorboards is the central focus, the wrapped paw at the door base to the right. Eye drawn to the shadow and its revelation.`,
          light:       `Light at the base of the door from outside. The shadow falls inward onto the floorboards, clear and telling. The warm interior firelight from behind the kids.`
        })
      },

      {
        id: 8,
        text: { en: `There was a long silence. Then, with a great deal of grumbling and muttering, the footsteps moved away from the cottage and did not come back. The seven kids stood very still and listened for a long time. At last the eldest said: "I think it has gone." They did not open the door. They had their instructions.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Seven small goats standing still and listening, the cottage around them quiet.',
        imagePrompt: prompt({
          scene:       `${CAST.kids} standing in perfect stillness throughout the cottage, ears pricked, listening. Some have their eyes closed to concentrate. The bolted door is closed. The room is entirely quiet. No wolf shadow at the door. The hearth fire glows. They are listening to absence.`,
          composition: `Interior wide shot. The seven kids are distributed through the room in their listening stances, the door safely bolted across the room. A still, suspended image. Eye moves between the listening faces.`,
          light:       `The hearth fire continues to glow. The room is warm and quiet. No cold at the door. Safety implied in the light.`
        })
      },

      {
        id: 9,
        text: { en: `They waited, and waited, until at last there came a familiar sound: footsteps on the path that were exactly the right weight, and then a knock that sounded entirely like the one they knew, and a voice that was soft as clover and warm as wool. "Children," said Mama. "I am home."` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'Seven kids rushing to unbolt the door as their mother\'s voice is heard from outside.',
        imagePrompt: prompt({
          scene:       `${CAST.kids} in a rush toward the cottage door, the tallest reaching for the bolt, the others pressing in behind. Joy and relief on every face. ${CAST.mama}'s voice is arriving from the other side of the door. They are unbolting it because this time, every single thing is right.`,
          composition: `Interior action mid shot. The kids in motion toward the door, the tallest at the bolt. Energy and relief. Eye follows the movement toward the door.`,
          light:       `The hearth fire is still warm, but now there is light at the edges of the door frame too: Mama's presence outside.`
        })
      },

      {
        id: 10,
        text: { en: `She stood in the doorway with her basket and looked at all seven of them crowding around her, and she said nothing for a moment. Then she set her basket down and put both arms out as wide as they would go, and all seven of them pressed in, from the biggest to the smallest, and she held them tight.` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A mother goat embracing all seven of her kids in the open cottage doorway.',
        imagePrompt: prompt({
          scene:       `${CAST.mama} in the open cottage doorway, arms spread wide, all ${CAST.kids} pressed into her embrace from all sides, from tallest to smallest. Her shopping basket sits on the step. Her expression is relief and love. Every kid's face shows the same. Afternoon light comes in from the meadow behind her.`,
          composition: `Mid shot at the doorway. Mama is centred, kids pressing in from both sides and front. The open meadow is bright behind her. A warm, full, open embrace. The whole image is a hug.`,
          light:       `Afternoon sunlight from behind Mama, the cottage warm behind the kids, meeting in the doorway. The warmest image in the story.`
        })
      },

      {
        id: 11,
        text: { en: `When they had all had supper and the youngest was asleep, the six remaining kids told Mama everything: the rough voice and the grey paw and the white-wrapped paw and the shadow that was too big. Mama listened to all of it without interrupting once. "You remembered," she said. "You noticed. I am very proud."` },
        image:    'assets/images/cartoon/goat.svg',
        imageAlt: 'A mother goat listening to six kids telling their story around the fireplace, the youngest asleep.',
        imagePrompt: prompt({
          scene:       `${CAST.mama} sitting by the hearth in her chair, the six larger kids arranged around her, all talking at once, animated and proud. One of them demonstrates the grey paw with their own hoof. The smallest kid is asleep in a small blanket by the fire. Mama listens with a warm, proud expression.`,
          composition: `Interior wide shot. The hearth at centre, Mama in her chair, kids around her. The sleeping youngest is at the edge, a small warm bundle. A safe, family scene.`,
          light:       `Evening firelight, warm and amber, the cottage completely safe and enclosed. The outside world does not exist in this light.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The bolt was always kept well-oiled after that. And the seven kids grew up knowing that the things you notice are exactly as important as the things you are told.` },
      image:    'assets/images/cartoon/goat.svg',
      imageAlt: 'A close view of a well-kept cottage door bolt, a garland of clover above it.',
      imagePrompt: prompt({
        scene:       `A close vignette of the cottage door: a well-made iron bolt, recently oiled and gleaming. Above the door frame, a small garland of white clover has been hung. The door itself is solid, warm-coloured wood. Everything about it says: safe inside.`,
        composition: `Close shot of the door bolt and garland. The bolt is the focal point, the clover a gentle, domestic accent. No characters — just the quiet evidence of a household that learned what matters.`,
        light:       `Soft interior light on the door and bolt. The clover garland is lit warmly from inside.`
      })
    }

  }));

})(window.APP);

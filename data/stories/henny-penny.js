// ─── Henny Penny ─────────────────────────────────────────────────────────────
//
// A traditional cumulative tale retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: think before you panic, and be careful who you follow.
// (Child-friendly ending: the friends see through the fox and run safely home.)
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
    hen:    `Henny Penny: a small chestnut-brown hen in a pale yellow apron and a white bonnet with a blue ribbon. Earnest, easily alarmed, but kind-hearted. Currently convinced of something very important.`,
    duck:   `Ducky Lucky: a plump white duck in a cornflower-blue pinafore, wide-eyed and willing to believe almost anything Henny Penny says. Walks with a side-to-side waddle and a look of permanent concern.`,
    pig:    `Piggy Wiggy: a round, cheerful pig in a soft green smock, good-natured and easily carried along by the enthusiasm of others. Slightly out of breath.`,
    rabbit: `Rabbity Rabbity: a slim brown rabbit in a lavender waistcoat, the most sensible of the group, whose ears are always swivelling for new information. Beginning to have doubts.`,
    fox:    `Foxy Loxy: a slim russet fox in a honey-coloured coat and a wide-brimmed felt hat, speaking with exaggerated friendliness and smiling rather too much.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'henny-penny',
    title:    { en: 'Henny Penny' },
    subtitle: 'a traditional tale, retold',

    // Library presentation
    skin:    'classic',
    leather: 'forest',
    board:   null,
    color:   '#2d5a3d',

    // Reading metadata
    wordCount:   488,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['hen', 'duck', 'pig', 'rabbit', 'fox'],
    coverAnimal: 'hen',

    // Unlock requirement
    requirements: [
      { animalId: 'hen',    minCount: 1, label: 'Find the Hen'    },
      { animalId: 'fox',    minCount: 1, label: 'Find the Fox'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/hen.svg',
      imageAlt: 'A small alarmed hen under an oak tree, an acorn at her feet, her friends gathering around her.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.hen} standing under a great oak tree, one wing pressed dramatically to her bonnet, eyes wide. At her feet lies a single fallen acorn. ${CAST.duck}, ${CAST.pig}, and ${CAST.rabbit} gather around her looking worried, curious, and slightly sceptical respectively. In the far background, just visible at the edge of the trees, a slim fox shape watches.`,
        composition: `Wide mid shot under the oak. Henny Penny is the focal centre, her dramatic posture drawing the eye. The friends cluster around her, the fox is barely visible in the background. Eye lands on the hen, sweeps to her friends, notices the fox.`,
        light:       `Dappled morning light through oak leaves, a mix of sunny patches and shade. The fallen acorn is in a small shaft of light.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Henny Penny was pecking for seeds under the old oak tree when something fell on her head. It was not large. It was not heavy. It was, in fact, an acorn, though Henny Penny did not look down to see this. She pressed her wing to her bonnet and announced to the world: "The sky is falling!"` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'A small hen standing under an oak tree, wing pressed to her bonnet, an acorn at her feet.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} standing under a large oak tree, one wing raised dramatically to her bonnet, eyes wide. She is facing away from the acorn that lies visible at her feet. Oak leaves and a few more acorns are in the branches above. The acorn that struck her is small and perfectly visible to the viewer, but not to her.`,
          composition: `Mid shot. The hen centred, the oak tree behind her, the acorn visible in the grass just below the frame's eye-level. The comedy of what she cannot see is the whole point. Eye goes to the hen's alarm and then to the small acorn.`,
          light:       `Bright morning sunlight through the oak canopy, dappled on the grass and the hen.`
        })
      },

      {
        id: 2,
        text: { en: `She set off at once down the lane to tell the king. She had not gone far when she met Ducky Lucky. "Where are you going, Henny Penny?" "The sky is falling and I am going to tell the king!" Ducky Lucky's eyes went very wide. "Then I shall come too," she said, and waddled along beside her.` },
        image:    'assets/images/cartoon/duck.svg',
        imageAlt: 'A hen and a duck walking together down a country lane, both looking very concerned.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} walking briskly along a country lane, ${CAST.duck} joining her at a waddle, both heading in the same direction. The hen looks urgent. The duck looks wide-eyed and convinced. The lane stretches ahead through a summer meadow. Both characters are mid-stride, the duck slightly behind trying to keep up.`,
          composition: `Side-on mid shot, both characters moving right. The hen leads, the duck follows. A comic pair in earnest motion. Eye moves from the purposeful hen to the waddling duck.`,
          light:       `Clear summer morning, the lane bright and warm.`
        })
      },

      {
        id: 3,
        text: { en: `They met Piggy Wiggy at the stile. "Where are you going?" "The sky is falling and we are going to tell the king!" Piggy Wiggy did not stop to think about this very carefully. "I shall come too!" he said, climbing over the stile with some effort. Then they met Rabbity Rabbity at the gate.` },
        image:    'assets/images/cartoon/pig.svg',
        imageAlt: 'A pig climbing over a stile to join a hen and duck, all three looking alarmed.',
        imagePrompt: prompt({
          scene:       `${CAST.pig} halfway over a moss-covered stile, one trotter raised, a look of earnest alarm on his face. ${CAST.hen} and ${CAST.duck} wait in the lane below, looking up at him. The pig is clearly struggling a little with the stile but very committed to coming.`,
          composition: `Mid shot at the stile. The pig is the focus, mid-clamber. The hen and duck are smaller in the foreground below. A comic geometry of animals at different heights.`,
          light:       `Warm mid-morning sun, the stile and hedgerow casting soft shadows.`
        })
      },

      {
        id: 4,
        text: { en: `Rabbity Rabbity was standing at the gate with his ears up, listening to the wind. "Where are you all going?" "The sky is falling and we are going to tell the king!" Rabbity Rabbity was not entirely sure about this. But his friends looked very certain, and it seemed wrong to be left behind, so he joined the end of the line.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit standing at a gate with ears pricked, watching a procession of alarmed animals go past.',
        imagePrompt: prompt({
          scene:       `${CAST.rabbit} standing at a farm gate, ears up and alert, watching ${CAST.hen}, ${CAST.duck}, and ${CAST.pig} filing past with their urgent expressions. His own face is more thoughtful than alarmed. He is clearly deciding. One paw is raised slightly as if about to ask a question.`,
          composition: `Mid shot at the gate. The rabbit is right-of-centre, the three marching animals cross the left side of the frame. His pensive expression contrasts with their certainty. Eye drawn to the rabbit's thoughtful face.`,
          light:       `Morning sun on the lane, the gate in soft dappled shade.`
        })
      },

      {
        id: 5,
        text: { en: `So four of them walked together down the lane: Henny Penny, Ducky Lucky, Piggy Wiggy, and Rabbity Rabbity. Henny Penny led the way and set the pace. The duck waddled. The pig huffed. The rabbit's ears swivelled at every rustle. They were all very sure they were doing exactly the right thing.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'Four animals marching in a line along a country lane, all looking very important and purposeful.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} at the front of a single-file line, followed by ${CAST.duck}, ${CAST.pig}, and ${CAST.rabbit}. All four are marching with great purpose along a winding lane between summer hedgerows. Their expressions range from urgent to worried to huffy to quietly doubtful. They are an earnest little procession.`,
          composition: `Wide side-on shot, the line of four crossing the frame. The hen leads, the rabbit brings up the rear. The lane stretches ahead and behind. Eye moves along the line of characters.`,
          light:       `Full midday summer sun, warm and clear, slightly bleached. The shadow of the hedgerow falls across the lane.`
        })
      },

      {
        id: 6,
        text: { en: `They had not gone far into the cool shade of the wood when they met Foxy Loxy. He was standing very still at the side of the path, and he smiled at them in a way that showed rather more teeth than necessary. "Good day," he said. "Where are you all going in such a hurry?"` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A slim fox standing at the side of a woodland path, smiling at four approaching animals with an overly friendly expression.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} standing at the edge of a forest path between tall trees, arms folded loosely, smiling broadly. His felt hat is tilted. ${CAST.hen}, ${CAST.duck}, ${CAST.pig}, and ${CAST.rabbit} have stopped in the path before him. The forest behind the fox is darker than the lane behind the animals. His smile is very wide.`,
          composition: `Mid shot from behind the group, looking toward the fox. The four animals are small in the foreground, the fox larger ahead on the path. The dark forest behind him is an atmospheric detail.`,
          light:       `The path is in forest shade, cooler and more ambiguous than the bright lane before. The fox is lit slightly from above, his smile visible.`
        })
      },

      {
        id: 7,
        text: { en: `"The sky is falling," said Henny Penny, "and we are going to tell the king." "How wonderful," said Foxy Loxy. "I know a shortcut to the palace. Right this way." He pointed deeper into the trees. The path he pointed to was narrow and dark. Rabbity Rabbity looked at it carefully. His ears went flat.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A fox pointing down a dark narrow path into the forest while a rabbit looks at it with clear suspicion.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} pointing with a long elegant paw toward a narrow dark path leading deeper into the forest. The path is shadowed and overgrown. The other animals look in that direction. ${CAST.rabbit} stands with ears flat, looking at the path with visible unease. The wide sunny lane is visible behind the group.`,
          composition: `Mid shot. The fox pointing right fills the left side. The dark path recedes right. The rabbit in the foreground looks toward it with flat ears. Eye drawn to the contrast between the inviting fox gesture and the rabbit's doubt.`,
          light:       `The narrow path ahead is dark and cool. The fox's face is in partial shadow. The open lane behind the group is bright and inviting by contrast.`
        })
      },

      {
        id: 8,
        text: { en: `"Excuse me," said Rabbity Rabbity, in a very polite but very clear voice. "But that path does not go toward the palace. The palace is that way," and he pointed back down the lane they had come from, "and the sun is that way," pointing right, "and that path goes into the darkest part of the wood." Everyone stopped.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit standing forward with one paw raised, pointing away from the dark path, the others listening.',
        imagePrompt: prompt({
          scene:       `${CAST.rabbit} stepping forward, one paw raised pointing firmly back down the lane. ${CAST.hen}, ${CAST.duck}, and ${CAST.pig} look at him, then at the fox, then back at the rabbit. ${CAST.fox} has his smile fixed but his eyes are narrowed. The rabbit's expression is clear and calm.`,
          composition: `Mid shot. The rabbit is centred and forward, his paw raised in clear direction. The other animals are behind him listening. The fox is to one side, slightly diminished. Eye lands on the rabbit's steady, pointing figure.`,
          light:       `The rabbit stands where the path meets the open lane, in slightly warmer light. His clarity is reflected in the light around him.`
        })
      },

      {
        id: 9,
        text: { en: `Foxy Loxy dropped his smile. "Well," he said, "I was only trying to help." "Thank you," said Henny Penny, who had very good manners even when frightened. "We will find our own way." The fox turned and walked quietly into the trees. Rabbity Rabbity watched until he could not be seen. Then he let out a breath.` },
        image:    'assets/images/cartoon/fox.svg',
        imageAlt: 'A fox walking away into the trees, the four friends watching him go with relief.',
        imagePrompt: prompt({
          scene:       `${CAST.fox} walking away into the trees, back to the viewer, hat slightly drooped. The four friends stand in a cluster watching him go. ${CAST.rabbit} is watchful, ears up. ${CAST.hen} has her wing to her chest. ${CAST.duck} and ${CAST.pig} lean slightly together. The fox is getting smaller between the trees.`,
          composition: `Wide mid shot. The fox walks away into the background. The four friends are in the foreground, watching. The open lane is visible to the left, a safer world. Eye follows the retreating fox.`,
          light:       `The forest around the fox is dim. The lane to the left is bright. Relief is in the light.`
        })
      },

      {
        id: 10,
        text: { en: `They turned around and walked back along the lane. Nobody mentioned the palace. The sky looked, on reflection, perfectly solid and blue and very much in its proper place. By the time they reached the meadow, the whole thing seemed like a story that had happened to someone else.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'Four animals walking homeward along a sunny lane, the sky blue and clearly fine above them.',
        imagePrompt: prompt({
          scene:       `${CAST.hen}, ${CAST.duck}, ${CAST.pig}, and ${CAST.rabbit} walking back along the sunny lane, heading left now instead of right. The sky above them is open, blue, and entirely intact. The hen walks with slightly less urgency. The rabbit walks calmly. The pig has found something to eat in the hedgerow. Everyone is fine.`,
          composition: `Wide side-on shot. The four animals moving in the opposite direction from before, relaxed and spread out. The sky takes the upper third of the frame, clearly, demonstrably fine. Eye drawn to their altered, calmer gait.`,
          light:       `Full warm afternoon sun, the lane gilded. A peaceful, resolved light.`
        })
      },

      {
        id: 11,
        text: { en: `When they got back to the oak tree, Henny Penny looked down at the ground. There was the acorn, small and smooth and brown, lying in the grass exactly where she had been standing. She picked it up. She looked at it for a while. Then she put it carefully in her apron pocket and went home for tea.` },
        image:    'assets/images/cartoon/hen.svg',
        imageAlt: 'The little hen standing under the oak tree, holding a small acorn and looking at it thoughtfully.',
        imagePrompt: prompt({
          scene:       `${CAST.hen} standing under the oak tree exactly as at the start, but now she is holding the small acorn in her wing and looking at it with a thoughtful, slightly sheepish expression. The sun is lower now, the afternoon mellow. Her bonnet is slightly askew from the day. Her friends are in the background, heading to their own homes.`,
          composition: `Close mid shot. The hen and the acorn are the focus, the oak tree behind her. The acorn is small but central. Her expression of recognition is the whole story. Eye drawn to the hen's face and the small acorn.`,
          light:       `Warm late-afternoon light, soft and golden, the oak tree casting long shadows. A settling, resolved moment.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The sky stayed up. It has been doing so ever since. It is, as it happens, very good at this.` },
      image:    'assets/images/cartoon/hen.svg',
      imageAlt: 'A single acorn on a patch of mossy ground under an oak tree, blue sky above.',
      imagePrompt: prompt({
        scene:       `A close view of the ground under the old oak tree. A single acorn sits in a patch of soft moss. Oak roots curve around it. Above, through the gap in the canopy, a clear blue sky is visible. The acorn is the only thing on the ground. The sky above it is entirely, solidly, reassuringly fine.`,
        composition: `Low-angle close shot looking up through the oak canopy to the sky. The acorn is at the base of the frame, the sky at the top. The tree trunk and roots frame the shot on either side. A quiet, funny reversal of the story's opening.`,
        light:       `Clear, open blue sky light from above. The acorn is in soft afternoon shade. Peaceful.`
      })
    }

  }));

})(window.APP);

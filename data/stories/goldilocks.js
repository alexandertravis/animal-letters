// ─── Goldilocks and the Three Bears ──────────────────────────────────────────
//
// A classic fairy tale retold in lyrical prose for young children.
// 11 paragraphs · ~490 words · 4½ min read-aloud at toddler pace.
// Moral: respect others' homes and belongings.
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
    papa:      `Large brown bear, a neat grey waistcoat, round spectacles pushed to the end of his muzzle, quiet and deliberate in manner.`,
    mama:      `Medium brown bear, a pale blue apron and matching bonnet, warm steady eyes, gentle and practical.`,
    baby:      `Very small brown bear, a little knitted yellow scarf looped twice around his neck, bright curious eyes, energetic and endearing.`,
    goldilocks: `A rosy-cheeked girl with a cloud of golden curls, a white pinafore over a cornflower-blue dress, red boots, wide blue eyes full of curiosity.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'goldilocks',
    title:    { en: 'Goldilocks and the Three Bears' },
    subtitle: 'a fairy tale',

    // Library presentation
    skin:    'classic',
    leather: 'burgundy',
    board:   'sun',
    color:   '#ff8906',

    // Reading metadata
    wordCount:   491,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['bear'],
    coverAnimal: 'bear',

    // Unlock requirement
    requirements: [
      { animalId: 'bear', minCount: 3, label: 'Complete Bear 3×' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/bear.svg',
      imageAlt: 'Goldilocks with golden curls peering round the open door of a cosy cottage in the forest, three bowls of porridge on the table inside.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.goldilocks} stands at the open door of a neat forest cottage, one hand on the doorframe, leaning in with round eyes. Through the open door we see a warm kitchen with a scrubbed table and three bowls of steaming porridge. Birch trees and wild roses frame the cottage outside. No bears visible yet.`,
        composition: `Wide portrait. The cottage door takes the centre of the frame, Goldilocks small in the doorway. The warm interior is visible beyond her. Eye lands on her curious face then travels into the inviting kitchen.`,
        light:       `Morning sun filtering through birch leaves onto the cottage wall, warm golden light from the kitchen interior beyond the door.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Deep in a forest where birch trees shimmered silver and wild roses grew along the path, three bears lived in a neat little cottage. That morning Mama Bear had made porridge, and while it cooled on the table, the family went out for a walk.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Three bears in a cosy cottage kitchen, a table set with three steaming bowls of porridge, morning light through the window.',
        imagePrompt: prompt({
          scene:       `Establishing shot: a cosy cottage kitchen interior. Three bowls of steaming porridge sit on a scrubbed wooden table — one large, one medium, one very small. Three chairs of matching sizes are tucked neatly underneath. No bears present — the room is empty and warm. A window looks out onto birch trees and morning light.`,
          composition: `Wide interior shot. The table with three bowls dominates the centre. The chairs are arranged neatly. The window provides a soft background framing the birch forest. A warm, inviting, slightly too-orderly scene.`,
          light:       `Soft morning light through the window, catching the steam rising from the porridge bowls, warm amber tones on the wooden surfaces.`
        })
      },

      {
        id: 2,
        text: { en: `Along the forest path came a girl named Goldilocks, her golden curls bouncing with every step. She spotted the bears' cottage through the trees, found the door standing a little bit open, and, because she was curious, she pushed it gently wide and stepped inside.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'A golden-haired girl in a blue dress pushing open the door of a forest cottage, peering inside with wide curious eyes.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} stands at the open front door of the cottage, one hand on the door, leaning forward to look inside. Her expression is curious and excited, not alarmed. Wild roses grow beside the doorstep. Through the door the warm kitchen is just visible.`,
          composition: `Mid shot from outside, looking toward the open door. Goldilocks is in the foreground to the left, the doorway is central. Eye lands on her curious face, then is drawn through the doorway into the warm interior.`,
          light:       `Warm filtered morning light in the forest, casting a golden glow through the birch trees, with warmer amber light spilling from the open door.`
        })
      },

      {
        id: 3,
        text: { en: `On the kitchen table she found three bowls of porridge. She tasted the big bowl first: too hot! She tried the middle bowl: too cold. She tried the little bowl: perfectly just right, warm and sweet and creamy, and she ate every last spoonful.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks sitting at a kitchen table, holding a small bowl of porridge, looking very pleased as she eats.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} sits at the kitchen table, leaning forward over the smallest bowl, spoon raised. The large bowl sits pushed aside, a small wisp of steam showing it is too hot. The middle bowl is also pushed aside. Her expression is one of complete satisfaction.`,
          composition: `Mid shot, eye level with the table. Goldilocks takes the right of the frame, the three bowls arranged before her. The small empty bowl is central. A warm, contented scene.`,
          light:       `Warm kitchen light, golden on the table surface and the porridge bowls. Soft and comfortable.`
        })
      },

      {
        id: 4,
        text: { en: `She wandered into the sitting room where three chairs stood in a row. She sat in the big chair: too hard. She sat in the middle chair: too soft and squishy. She sat in the little chair: perfectly just right. Then, with a sharp crack, the little chair broke.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks sitting in a tiny chair that is breaking beneath her, looking startled, pieces of chair around her on the floor.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} has just sat down in a small wooden chair and it is breaking beneath her — one leg splaying out. Her arms are flung wide, her expression is startled surprise rather than fear. Pieces of broken wood scatter across the floor. Two other chairs (one large, one medium) are visible in the background.`,
          composition: `Mid shot. Goldilocks is central in the frame, the broken chair beneath her. The two intact chairs frame left and right. Eye lands on her surprised face and the splintering chair.`,
          light:       `Warm sitting-room light from a window to the left, catching the scattered chair pieces on the floor.`
        })
      },

      {
        id: 5,
        text: { en: `Up the stairs she went and found three beds. She tried the big bed: too hard. She tried the middle bed: too soft and billowy. At last she climbed into the little bed and pulled up the small quilt, and it was perfectly just right in every way.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks lying in a small cosy bed with a patchwork quilt, looking very comfortable and peaceful.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} lies in a small wooden bed with a patchwork quilt pulled up to her chin, her golden curls spread across the little pillow. Her eyes are just closing, her expression serene and comfortable. Two other beds — one very large, one medium — are visible in the background, their covers rumpled.`,
          composition: `Mid shot from slightly above. The small bed with Goldilocks is in the foreground, the two larger beds recede behind. Eye drawn first to her peaceful face, then the snug patchwork quilt.`,
          light:       `Soft, warm bedroom light, the curtains half-drawn, a gentle glow across the bed and the patchwork quilt.`
        })
      },

      {
        id: 6,
        text: { en: `The soft pillow and the warm quilt folded around her, and in two blinks Goldilocks was fast asleep, her golden curls spread wide and her red boots still on her feet, dangling cheerfully over the foot of the little bed.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks sound asleep in a small bed, golden curls on the pillow, red boots dangling over the end.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} asleep in the small bed, mouth slightly open, deeply and contentedly unconscious. Her golden curls are spread across the pillow. Her red boots are still on her feet, pointing upward from the end of the bed. The patchwork quilt is tucked around her. A little teddy bear sits on the bedside table watching over her.`,
          composition: `Low-angle mid shot, from beside the bed. The boots in the foreground, her sleeping face in the mid-distance. The teddy on the bedside table is a small warm accent.`,
          light:       `Quiet, soft bedroom light, warm and still. The curtains filter the afternoon sun to a gentle glow.`
        })
      },

      {
        id: 7,
        text: { en: `The three bears came home, their paws muddy and their cheeks rosy from the morning air. Papa Bear looked at his porridge bowl and said, in his deep slow voice, "Someone has been eating my porridge." Mama Bear looked at hers and said the same.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Three bears standing in their kitchen, looking with surprise at their porridge bowls, which have clearly been touched.',
        imagePrompt: prompt({
          scene:       `${CAST.papa}, ${CAST.mama}, and ${CAST.baby} stand around their kitchen table, staring at their porridge bowls. Papa Bear's expression is measured and puzzled. Mama Bear leans forward to look more closely. Baby Bear has not yet looked at his bowl. Their paws are slightly muddy from the walk.`,
          composition: `Wide shot of the three bears around the table, framed from the doorway. Papa Bear left, Mama Bear centre, Baby Bear right. Eye lands first on Papa Bear's questioning expression, then reads across the three faces.`,
          light:       `Midday light through the kitchen window, warm and clear. The steam from the porridge is gone — the bowls have cooled.`
        })
      },

      {
        id: 8,
        text: { en: `Baby Bear looked at his little bowl and his eyes went very wide. "Someone has been eating my porridge and has eaten it all up!" In the sitting room, one by one, they found that someone had been sitting in their chairs too, and Baby Bear's little chair was broken to pieces.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Baby Bear looking at his empty bowl with wide, dismayed eyes, while Papa and Mama Bear look on with concern.',
        imagePrompt: prompt({
          scene:       `${CAST.baby} stares down at his completely empty little bowl, his small paws gripping the table edge, expression a picture of dismayed disbelief. His yellow scarf has come slightly undone. ${CAST.papa} looks over his shoulder from behind. ${CAST.mama} has a gentle hand on Baby Bear's shoulder.`,
          composition: `Close shot, eye-level with Baby Bear. His empty bowl is central in the foreground. His wide-eyed face is just behind it. The comforting presence of the other two bears is felt but not fully in frame.`,
          light:       `Clear midday kitchen light, focused on the empty bowl and Baby Bear's distressed little face.`
        })
      },

      {
        id: 9,
        text: { en: `They climbed the stairs together, very quietly. Papa Bear looked at his bed and said someone had been lying in it. Mama Bear said the same. Then Baby Bear pointed at his little bed and cried out: "Someone has been sleeping in my bed, and she is still there!"` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Three bears standing in a bedroom doorway, Baby Bear pointing with a small paw at a golden-haired girl asleep in his little bed.',
        imagePrompt: prompt({
          scene:       `${CAST.papa}, ${CAST.mama}, and ${CAST.baby} stand in the bedroom doorway. Baby Bear is in front, one paw pointing at the small bed where ${CAST.goldilocks} is still sound asleep, golden curls vivid on the pillow. The bears' faces are astonished but not fierce.`,
          composition: `Mid shot from inside the bedroom, framing the doorway with the three bears and the small bed in the foreground. Eye lands on the pointing paw and travels to the sleeping girl.`,
          light:       `Soft afternoon bedroom light, dim and quiet. The golden curls on the pillow catch the light distinctively.`
        })
      },

      {
        id: 10,
        text: { en: `At the sound of Baby Bear's voice, Goldilocks opened her eyes. Three bears were looking at her. She let out a very loud shriek, flung back the quilt, leapt out of the bed, and ran straight to the window at the end of the room.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks sitting up in bed with wide frightened eyes, three bears watching from the doorway, quilt flying.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} is sitting bolt upright in the small bed, eyes enormous, quilt flung back. She is in the act of swinging her red boots over the side of the bed. ${CAST.papa}, ${CAST.mama}, and ${CAST.baby} stand in the doorway watching, more bewildered than threatening.`,
          composition: `Wide shot of the bedroom. Goldilocks is in the foreground right, the bears in the left background at the doorway. The sense of motion as she leaps is the focal point.`,
          light:       `Sudden alert light as if the afternoon has brightened — the mood has shifted from quiet to startled.`
        })
      },

      {
        id: 11,
        text: { en: `She did not stop to say sorry. She climbed out of the window, dropped into the soft moss below, and ran through the forest all the way home without looking back once. She ran so fast that her golden curls flew out behind her like a banner.` },
        image:    'assets/images/cartoon/bear.svg',
        imageAlt: 'Goldilocks running away through the birch forest, golden curls flying, red boots flashing, the cottage receding behind her.',
        imagePrompt: prompt({
          scene:       `${CAST.goldilocks} running at full speed along a forest path away from the cottage, which is visible small and far behind her. Her golden curls stream out behind, her red boots flash. She is looking ahead, not back. Birch trees on either side, dappled light on the path.`,
          composition: `Mid shot from behind and slightly to the side. Goldilocks is in the centre, running away from the viewer. The cottage is small in the far background. The eye follows her movement down the path.`,
          light:       `Afternoon light through birch trees, dappled and active, catching her golden curls and red boots as she runs.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `From that day on, Goldilocks always knocked before entering, and the three bears always made sure to close their door when they went out for their morning walk.` },
      image:    'assets/images/cartoon/bear.svg',
      imageAlt: 'A neat cottage door firmly closed, a small hand-painted notice on it reading "Back soon", wild roses blooming beside the step.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The cottage front door, firmly and neatly closed. A small hand-lettered card in the door reads "Back soon." Wild roses bloom beside the doorstep. A blackbird sits on the cottage roof. The morning light is bright and everything is tidy. No characters present.`,
        composition: `Portrait shot of the cottage door. The door takes the centre of the frame, the roses frame left and right at the bottom, the blackbird on the roof is a small upper accent. Peaceful and resolved.`,
        light:       `Clear morning light, warm and uncomplicated. Everything is in order.`
      })
    }

  }));

})(window.APP);

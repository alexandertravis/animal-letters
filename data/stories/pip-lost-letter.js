// ─── Pip and the Lost Letter ──────────────────────────────────────────────────
//
// An original postal adventure. Lyrical prose, no rhyme.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Theme: small mistakes can lead to unexpected kindness.
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
    pip:    `Pip the owl: a small tawny owl in a neat grey postal uniform jacket with two small brass buttons, a postbag slung across one wing. Alert, conscientious, and mildly horrified when things go wrong. She runs the village post office from a hollow oak tree.`,
    clover: `Clover the cat: a soft ginger cat in a sage-green pinafore and a cream apron, warm-eyed and tidy, who lives in a cottage with a cheerful red letterbox and a garden of marigolds. Not remotely flustered by receiving someone else's letter.`,
    bramble:`Bramble the rabbit: a young brown rabbit in blue dungarees and a yellow kerchief, who has been waiting for an invitation with more hope than they have admitted to anyone.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'pip-lost-letter',
    title:    { en: 'Pip and the Lost Letter' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'buff',
    board:   null,
    color:   '#6a4a28',

    // Reading metadata
    wordCount:   499,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['owl', 'cat', 'rabbit'],
    coverAnimal: 'owl',

    // Unlock requirement
    requirements: [
      { animalId: 'owl',    minCount: 1, label: 'Find the Owl'    },
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'A small owl postmistress in a grey postal uniform, postbag over one wing, looking at a letter with a worried expression in a foggy lane.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.pip} standing in a foggy village lane, holding a letter and looking at it with a worried expression. Her postbag is over one wing. Behind her, the lane disappears into fog. Ahead, the cheerful red letterbox of Clover's cottage is visible. A wrong turn has already been made.`,
        composition: `Mid shot. Pip centred in the foggy lane, letter in wing, surrounded by the grey mist. The red letterbox is a warm accent in the background. Eye drawn to Pip's worried face and the letter.`,
        light:       `Foggy morning light, diffused and grey, the red letterbox the only warm colour in the scene.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Pip the owl ran the village post office from a hollow oak tree at the top of the lane. She knew every letter by feel, every address by heart, and had never in four years of service delivered a letter to the wrong place. She was very proud of this. She was about to be slightly less proud of it.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A small owl in a postal uniform in her hollow-tree post office, sorting letters with great efficiency.',
        imagePrompt: prompt({
          scene:       `${CAST.pip} inside her hollow-oak post office, surrounded by neat cubbyholes of sorted letters. She holds a stack of envelopes and is sorting them with great concentration. The office is warm and wooden, with a small brass counter, cubbyhole shelves, and a little round window. Everything is in perfect order.`,
          composition: `Interior mid shot. Pip is centred behind her counter, the letter cubbyholes behind her. The round window gives light. Everything neat and small and right. Eye drawn to her efficient, confident posture.`,
          light:       `Warm morning light through the round window, the cubbyholes in good amber light. A productive, orderly scene.`
        })
      },

      {
        id: 2,
        text: { en: `One October morning, a fog came in from the fields. It was a thick, white, opinionated fog that made every cottage look like every other cottage and every gate look like every other gate. Pip set out with her bag, which held eleven letters and one small parcel, and she walked briskly into the white.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'A small owl postmistress walking into a thick white fog along a village lane.',
        imagePrompt: prompt({
          scene:       `${CAST.pip} walking into a thick October fog, her postbag on her wing, the lane barely visible ahead. The fog is white and close, the hedgerows and cottages becoming indistinct shapes. She walks with purpose but the world has become difficult to read.`,
          composition: `Wide mid shot. Pip is centre-left walking into the fog, the lane receding ahead into whiteness. The fog fills the frame. Eye follows her into the uncertainty.`,
          light:       `Diffused, opaque fog light. No sun visible, everything equal and grey-white. Direction is hard to read.`
        })
      },

      {
        id: 3,
        text: { en: `She stopped at the fourth gate on the left, which was Bramble's gate, and pushed the letter through the red letterbox. At least, she was almost certain it was the fourth gate. The fog had made counting difficult. She moved on, delivering the other ten, and came home feeling only slightly uneasy.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'Pip pushing a letter through a red letterbox in the fog, looking slightly uncertain.',
        imagePrompt: prompt({
          scene:       `${CAST.pip} pushing an envelope through a red letterbox on a garden gate, her head slightly turned as if she is not entirely sure of her counting. The fog is thick around her. The cottage behind the gate is barely visible. A nagging uncertainty in her posture.`,
          composition: `Mid shot at the gate. Pip at the letterbox, letter going in. The fog swallows the world beyond. Her posture carries a question.`,
          light:       `Fog light, grey and flat, no shadows. The red letterbox is the only warm colour in the frame.`
        })
      },

      {
        id: 4,
        text: { en: `It was Clover the cat who opened the letterbox. She sat at her kitchen table and looked at the envelope, which had Bramble Rabbit, 3 Meadow Lane on the front. Clover lived at Number 4. She turned the envelope over carefully. It smelled of fresh paper and apple jam, which was not her smell at all.` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A ginger cat sitting at her kitchen table, turning a wrongly delivered envelope over in her paws.',
        imagePrompt: prompt({
          scene:       `${CAST.clover} sitting at her kitchen table, holding the envelope up and looking at the name on the front with a calm, curious expression. She is clearly reading someone else's name. The kitchen around her is tidy and comfortable, marigolds in a jug on the windowsill.`,
          composition: `Interior mid shot. Clover centred at the table, the envelope visible in her paws. The kitchen is warm around her. Eye drawn to the envelope and her considering expression.`,
          light:       `Warm kitchen morning light from the window, the fog outside visible but the kitchen itself cosy.`
        })
      },

      {
        id: 5,
        text: { en: `Pip arrived at Bramble's gate at Number 3. Bramble was at the window, watching for the post as she had been doing every morning that week, because she was hoping for something and had not told anyone this. Pip came through the gate and reached into her bag and found: no letter. Her heart did something uncomfortable.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'An owl postmistress standing at a gate, searching her empty postbag with a stricken expression.',
        imagePrompt: prompt({
          scene:       `${CAST.pip} at Bramble's garden gate, postbag open, searching it with both wings with a stricken expression. The bag is clearly empty. ${CAST.bramble} can just be seen at the cottage window behind, watching. Pip's expression is professional horror.`,
          composition: `Mid shot at the gate. Pip with her open empty bag is the subject. Bramble's face is small in the window behind. Eye drawn to Pip's searching expression and the empty bag.`,
          light:       `The fog has thinned slightly, a cooler clearer morning light. The mistake is visible in this light.`
        })
      },

      {
        id: 6,
        text: { en: `She knew immediately. She retraced her steps to Number 4. Clover answered the door on the first knock, holding the envelope in both paws, neatly refolded. "I thought it might not be mine," she said. "It did not smell right." She held it out politely. "I did not open it."` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A ginger cat at her door, holding a refolded envelope out to an owl, looking entirely unruffled.',
        imagePrompt: prompt({
          scene:       `${CAST.clover} in her open doorway, holding the refolded envelope out to ${CAST.pip} with both paws, her expression perfectly composed. The envelope is unopen. Pip looks relieved and ashamed in equal measure. The garden behind Clover has marigolds, bright even in the October air.`,
          composition: `Mid shot at the doorway. Clover offers the envelope. Pip receives it. The transaction between the two is the whole scene.`,
          light:       `Soft October morning light on the doorstep. The marigolds are warm behind Clover. The fog behind Pip has thinned.`
        })
      },

      {
        id: 7,
        text: { en: `"How did you know it was not yours?" asked Pip. "The name on the front," said Clover. "And the smell. Apple jam. I do not use apple jam." She tilted her head. "Is Bramble Rabbit expecting something important?" "I believe so," said Pip. Clover looked at the envelope. Then she looked at Pip. "Shall we take it together?"` },
        image:    'assets/images/cartoon/cat.svg',
        imageAlt: 'A cat and an owl standing in a doorway in conversation, the cat with a kind and practical expression.',
        imagePrompt: prompt({
          scene:       `${CAST.clover} and ${CAST.pip} standing in the open doorway in conversation. Clover looks at the envelope and then at Pip with a warm, practical expression. Pip looks slightly uncertain but grateful. The marigold garden is behind Clover.`,
          composition: `Close mid shot at the doorway. The two characters face each other. The envelope is between them, the focus of the negotiation.`,
          light:       `Morning light from behind Pip, warm kitchen light from behind Clover. Between the two, the conversation happens.`
        })
      },

      {
        id: 8,
        text: { en: `They walked together to Number 3. Pip carried the bag. Clover carried the envelope on both paws as though it were something precious, which she thought it probably was to someone. Bramble met them at the gate before they had even knocked.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit waiting at a gate, eyes wide, as a cat and owl arrive together with a letter.',
        imagePrompt: prompt({
          scene:       `${CAST.bramble} at her garden gate, eyes wide and hopeful, watching ${CAST.clover} and ${CAST.pip} come up the lane toward her. Clover carries the envelope in both paws, Pip walks beside her. Bramble's ears are up. She has been at the gate, or close to it.`,
          composition: `Wide mid shot on the lane. Bramble is at the gate right, Clover and Pip approach from the left. The lane between them. Eye drawn to Bramble's face of barely contained hope.`,
          light:       `The fog has lifted now. A clear, crisp October morning, bright and resolved.`
        })
      },

      {
        id: 9,
        text: { en: `Pip held out the envelope and said: "I am very sorry. I left this at Number 4." Bramble took it with both paws. She turned it over. She looked at the wax seal. Pip and Clover watched her. Her ears, which had been very still, began very slowly to rise. "It is from my aunt," she said. "She has invited me to visit."` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'A rabbit opening a letter, her ears slowly rising as she reads it, the owl and cat watching.',
        imagePrompt: prompt({
          scene:       `${CAST.bramble} standing at her gate, reading the letter, ears rising slowly as she reads. Her expression shifts from careful hope to clear joy. ${CAST.pip} and ${CAST.clover} watch from the lane, both looking relieved and pleased.`,
          composition: `Mid shot at the gate. Bramble is the focus, the letter in her paws, her ears the visual measure of her joy. Pip and Clover are sympathetic background figures.`,
          light:       `Clear October morning sun, the first proper sun of the day. Bramble is in full warm light.`
        })
      },

      {
        id: 10,
        text: { en: `There was a moment of quiet happiness on the lane outside Number 3, which is one of the best things a lane can have. Then Bramble looked at Clover and said: "Would you like to come in? I have made a great deal of soup and I was going to eat it alone." Clover looked at Pip. Pip looked at her postbag. The rest of the post could wait ten minutes.` },
        image:    'assets/images/cartoon/rabbit.svg',
        imageAlt: 'Three animals going through a garden gate together, the rabbit leading the way with the letter held to her chest.',
        imagePrompt: prompt({
          scene:       `${CAST.bramble} pushing open her garden gate and gesturing warmly for ${CAST.pip} and ${CAST.clover} to follow her in. She holds the letter to her chest. Her expression is generous and glad. The three of them are about to go inside together.`,
          composition: `Wide mid shot at the gate. Bramble is slightly ahead, the gate open, gesturing in. Pip and Clover are just behind. The cottage and garden are ahead. A welcoming scene.`,
          light:       `Clear warm morning light now fully established. The garden and cottage are bright and inviting.`
        })
      },

      {
        id: 11,
        text: { en: `The soup was carrot and barley and very warm, and the three of them ate it around Bramble's small table while the October sun came through the window and the letter sat on the dresser in a place of honour. Pip had one bowl, and then another. She forgot entirely to feel embarrassed about the fog.` },
        image:    'assets/images/cartoon/owl.svg',
        imageAlt: 'Three animals eating soup together at a small table in a cosy cottage, warm morning sun coming through the window.',
        imagePrompt: prompt({
          scene:       `${CAST.pip}, ${CAST.clover}, and ${CAST.bramble} eating soup at Bramble's small table. The letter is propped on the dresser behind them. The October sun comes through the window. Three bowls of soup, a loaf of bread between them, and three contented faces. Pip is halfway through her second bowl.`,
          composition: `Interior wide shot. The three friends around the table, the letter on the dresser behind. The window light falls across them. Eye drawn to the warm, accidental friendship of the scene.`,
          light:       `October morning sunlight through the window, warm and clear after the fog. The room is bright and comfortable.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `Pip has not delivered a letter to the wrong house since. But she does sometimes, on foggy mornings, slow down a little at Number 4 on her way to Number 3. Just in case Clover is also awake.` },
      image:    'assets/images/cartoon/owl.svg',
      imageAlt: 'A cheerful red letterbox on a garden gate, morning fog behind it, a letter being posted through.',
      imagePrompt: prompt({
        scene:       `A close vignette: a cheerful red letterbox on a garden gate, the October morning behind it foggy and soft. An envelope is halfway through the slot. On the gate beside it, a small marigold has been tucked through the latch, bright orange in the grey. The fog softens everything else.`,
        composition: `Close shot of the letterbox and gate. The marigold is the warm accent. The letter is mid-post. The fog behind is soft. A small, warm, funny ending image.`,
        light:       `Fog light, diffused and grey, the marigold the single warm colour. The letter catching a little light as it goes in.`
      })
    }

  }));

})(window.APP);

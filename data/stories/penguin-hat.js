// ─── The Penguin Who Lost Her Hat ────────────────────────────────────────────
//
// An original cosy winter story. Lyrical prose, no rhyme.
// 11 paragraphs · ~495 words · 4½ min read-aloud at toddler pace.
// Theme: kindness shared; endings that leave everyone a little warmer.
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
    petra:   `Petra the penguin: a small black-and-white penguin in a knitted red hat that she wears every single day and a warm dark-blue coat. Cheerful, methodical, knits very well. She is almost never seen without the hat.`,
    dolphin: `A friendly grey dolphin who lives in the bay near the shore and sees what blows across the water. Playful and helpful, talks quickly, always wet.`,
    crab:    `A small red shore crab who lives at the tide line, practical and deliberate, unexpectedly eloquent when there is something important to say. Tends to sidle when thinking.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'penguin-hat',
    title:    { en: 'The Penguin Who Lost Her Hat' },
    subtitle: 'an original story',

    // Library presentation
    skin:    'classic',
    leather: 'arctic',
    board:   null,
    color:   '#3a5a7a',

    // Reading metadata
    wordCount:   494,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['penguin', 'dolphin', 'crab'],
    coverAnimal: 'penguin',

    // Unlock requirement
    requirements: [
      { animalId: 'penguin', minCount: 1, label: 'Find the Penguin' },
      { animalId: 'crab',    minCount: 1, label: 'Find the Crab'    }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/penguin.svg',
      imageAlt: 'A penguin in a blue coat with no hat, looking at a small red crab sitting under a round red hat at the tide line.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.petra} standing on the rocky shore, bare-headed, her blue coat buttoned against the cold. At the tide line before her, ${CAST.crab} sits very comfortably under the round red hat, which has settled over his shell. The sea is bright behind them. The hat is clearly the right size for a penguin and the wrong size for a crab, which has not stopped the crab enjoying it.`,
        composition: `Wide mid shot. Petra on the shore, the crab at the tide line before her, the hat between them as the focal point. The sea behind is blue and bright. Eye drawn first to the hat, then to the two faces.`,
        light:       `Clear winter coastal light, bright and slightly cold. The hat is the warm red accent.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Petra the penguin wore a round red hat every single day. She had knitted it herself three winters ago, in the particular red that she liked best, and it had the exact shape of a hat that was made for someone who knew exactly what they wanted. She wore it to go fishing. She wore it to sleep in. She wore it in the rain, which, for a penguin, is quite a lot.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin in a round red hat and blue coat, standing happily in the rain on a rocky shore.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} standing on a rocky shore in light rain, her round red hat on, her blue coat buttoned. She is entirely content. The sea is grey and the rain is light. The hat is vivid red against the grey world. She is fishing or about to fish, holding a small rod.`,
          composition: `Mid shot. Petra centred, hat on, the grey sea and shore behind her. The hat is the colour note. Eye drawn to her cheerful presence in the grey coastal scene.`,
          light:       `Grey, soft rain light. The red hat is the only warm accent. Comfortable and coastal.`
        })
      },

      {
        id: 2,
        text: { en: `One winter morning she woke and put her flipper out to where the hat usually sat, on the small stone beside her bed, and felt nothing. She felt around more carefully. Still nothing. She sat up. The stone was bare. She looked around the room. The hat was not there. She checked the peg by the door. No hat.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin sitting up in bed, feeling an empty stone where her hat usually sits, looking dismayed.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} sitting up in her bed, flipper outstretched to the small stone beside it. The stone is empty and bare. Her expression is dismayed. The room is small and tidy, with a peg by the door where nothing hangs. The morning outside the window is grey.`,
          composition: `Interior mid shot. Petra in her bed, the bare stone the focal point. Her extended flipper and the empty space tell the story.`,
          light:       `Grey winter morning light through the window. The room is cool without the usual red warmth of the hat.`
        })
      },

      {
        id: 3,
        text: { en: `She put on her coat and went out to look. She searched her house, and then the path outside her house, and then the rock where she usually sat in the evenings. She went down to the shore and looked along the tide line in both directions. She found four pieces of kelp, a very small crab claw, and no hat.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin searching along the tide line on a cold grey shore, no hat on her head.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} walking along the tide line, head bare, blue coat done up, looking left and right along the shore. The beach is grey and windswept. Kelp is visible along the tide line. The sea is beyond. She is clearly searching.`,
          composition: `Wide mid shot. Petra on the beach, the tide line running across the frame. The sea beyond. Her bare head is the absence the eye notices.`,
          light:       `Cool grey winter coastal light. Flat and searching.`
        })
      },

      {
        id: 4,
        text: { en: `She went down to the bay to ask the dolphin, who saw most things from the water. The dolphin arced out of the water cheerfully. "Something red?" she said. "Yes! Blown across the bay in last night's wind. It went toward the south shore." Petra thanked her and walked along the cliff path to the south shore.` },
        image:    'assets/images/cartoon/dolphin.svg',
        imageAlt: 'A dolphin arcing out of the bay water, speaking to a penguin on the shore.',
        imagePrompt: prompt({
          scene:       `${CAST.dolphin} mid-arc above the bay water, speaking to ${CAST.petra} who stands on the shore. The dolphin is bright and animated, clearly giving useful information. Petra is attentive. The bay is grey-blue behind the dolphin, the cliff path visible to the south.`,
          composition: `Wide mid shot. The dolphin in the air above the water, Petra on the shore. The bay background connects them.`,
          light:       `Grey winter coastal light, the sea a muted blue-grey. The dolphin arcs in the cooler light.`
        })
      },

      {
        id: 5,
        text: { en: `The south shore was rockier and quieter. She walked along the stones and looked in all the crevices that the wind might have blown something into. She was beginning to feel the cold on the top of her head, which she had never felt before, and which was a strange and draughty sensation.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin on a rocky south shore, searching rock crevices, looking slightly cold without her hat.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} on a rocky, quieter shore, peering into rock crevices. The rocks are larger here, the shore less sandy. She rubs the top of her bare head with one flipper, unaccustomed to the cold there. Her expression is determined but chilly.`,
          composition: `Mid shot on the rocks. Petra searching, the rocks around her. The bare top of her head is the focal absence.`,
          light:       `Rockier, cooler coastal light. The rocks are dark and grey.`
        })
      },

      {
        id: 6,
        text: { en: `And then, at the very end of the tide line, she saw it. Round and red, sitting over something. It was not blowing. It was quite still, in fact, settled rather comfortably over a small red crab who had both claws tucked under it and appeared to be very warm.` },
        image:    'assets/images/cartoon/crab.svg',
        imageAlt: 'A small red crab sitting very comfortably under a round red hat, looking cosy.',
        imagePrompt: prompt({
          scene:       `${CAST.crab} at the tide line, settled under ${CAST.petra}'s round red hat, which has come to rest over his shell. His claws are neatly tucked. He looks entirely comfortable and quite warm. He has not noticed the approaching penguin yet.`,
          composition: `Close mid shot. The crab under the hat is the subject. The tide line is around him, the sea behind. The hat is clearly a penguin's hat, clearly in use by a crab.`,
          light:       `Grey coastal light, the red hat warm against it. The crab in shade under the hat.`
        })
      },

      {
        id: 7,
        text: { en: `Petra stood very still and looked at this. The crab had very good taste in hats. "Excuse me," she said, as politely as she could. "I believe that may be my hat." The crab looked out from under it with bright sideways eyes. He did not immediately reply, which crabs sometimes do when they are thinking seriously.` },
        image:    'assets/images/cartoon/crab.svg',
        imageAlt: 'A penguin standing over a crab under a hat, the crab looking up at her with bright sideways eyes.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} standing above ${CAST.crab}, looking down at him. He looks up at her from under the hat with his sideways bright eyes. Both are still. The hat is between them as the subject of negotiation.`,
          composition: `Mid shot from Petra's height. The crab below, the hat over him, Petra above. A polite standoff.`,
          light:       `Grey coastal light on both. The hat is the warm focus.`
        })
      },

      {
        id: 8,
        text: { en: `He sidled left and right a little, which is how crabs pace when thinking. Then he said, in a small but very clear voice: "It is a very good hat." Petra said: "Thank you. I knitted it myself." The crab considered this. "It is very warm," he said. "Yes," said Petra. "It is." There was a pause.` },
        image:    'assets/images/cartoon/crab.svg',
        imageAlt: 'A crab sidling left and right under a hat, thinking, while a penguin waits patiently.',
        imagePrompt: prompt({
          scene:       `${CAST.crab} sidling slightly under the hat, in the act of thinking. ${CAST.petra} stands patiently before him. The pause between them is visible in their stillness.`,
          composition: `Close mid shot. The crab in motion under the hat, Petra still. The hat is the shared object between them.`,
          light:       `The same grey light. The red hat glows between them.`
        })
      },

      {
        id: 9,
        text: { en: `The crab lifted the hat off his shell. He held it out in both claws. Petra took it and put it on. The cold left the top of her head immediately, and she felt completely herself again. She looked at the crab. He was looking at the sea with the expression of someone who has done the right thing and is not going to make a fuss about it.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin putting her red hat back on, the crab beside her looking at the sea.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} putting her red hat back on her head, her expression one of relief and returned warmth. ${CAST.crab} sits beside her, looking out to sea with a quietly satisfied expression. The hat is back where it belongs.`,
          composition: `Mid shot. Petra putting the hat on, the crab to one side. The sea is the background for both.`,
          light:       `The red hat is back and warm in the grey light. The scene has its colour note returned.`
        })
      },

      {
        id: 10,
        text: { en: `She went home and spent the afternoon knitting. She had, she decided, a great deal of red wool and she was very fast at it. By the time the stars came out she had finished something round and blue, which was a colour she thought would suit a crab.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin knitting by lamplight, a round blue hat taking shape in her flippers.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} in her home, sitting by a lamp in the evening, knitting. A round blue hat is taking shape in her flippers, almost complete. Her red hat is on her head. Needles click. The window shows the stars beginning outside.`,
          composition: `Interior close mid shot. Petra and her knitting, the lamp and the evening window. The blue hat in progress is the new colour note.`,
          light:       `Warm lamp-light interior, the stars just beginning outside. Cosy and productive.`
        })
      },

      {
        id: 11,
        text: { en: `In the morning she went to the south shore and left the blue hat on the flat rock at the tide line. She did not wait to see if the crab found it. She walked home along the cliff path with her red hat on and the wind off the sea, and felt, for no reason she could quite explain, very glad.` },
        image:    'assets/images/cartoon/penguin.svg',
        imageAlt: 'A penguin walking home along a cliff path, red hat on, having left a blue hat at the tide line below.',
        imagePrompt: prompt({
          scene:       `${CAST.petra} walking along the cliff path, red hat on, wind in her coat. Behind her below on the south shore, the small blue hat is visible on the flat rock at the tide line. She is not looking back. She does not need to.`,
          composition: `Wide shot. Petra on the cliff path in the foreground, the south shore below with the blue hat visible. The two hats are both in the image: one leaving, one arriving.`,
          light:       `Winter morning coastal light, clear and bright. The red hat warm, the blue hat a new warm accent below.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The crab found it, of course. He wears it every single day. It fits him perfectly, which surprised everyone who saw it, but perhaps should not have.` },
      image:    'assets/images/cartoon/crab.svg',
      imageAlt: 'Two small knitted hats side by side on a rock: one round and red, one round and blue, the sea sparkling behind.',
      imagePrompt: prompt({
        scene:       `A quiet vignette: two round knitted hats sitting side by side on a flat rock at the tide line. One is red, one is blue. The sea sparkles behind them. Neither crab nor penguin is in the frame. Just the two hats, matching in quality and care, different in colour, side by side.`,
        composition: `Close shot of the two hats on the rock. The sea sparkles behind. Both hats equal in the frame.`,
        light:       `Winter coastal light, clear and bright, the sea glittering. Both hats warm against it.`
      })
    }

  }));

})(window.APP);

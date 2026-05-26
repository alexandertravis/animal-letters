// ─── The Lion and the Mouse ──────────────────────────────────────────────────
//
// An Aesop fable retold for young children. Lyrical prose, no rhyme.
// 11 paragraphs · ~500 words · 4½ min read-aloud at toddler pace.
// Moral: even the smallest friend can help the greatest.
//
// Image prompts follow the locked house style from image-style-guide.md.
// All SCENE descriptions name the character from the CAST bible below so
// that every illustration stays visually consistent.
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
    lion:  `Large tawny lion, unclothed — his warm amber mane is his only adornment. Heavy-lidded kind eyes, great soft paws, a gentle giant of the forest. Proportioned realistically, never cartoonish.`,
    mouse: `Tiny grey mouse, a small crimson neckerchief knotted neatly at the throat, bright inquisitive eyes, delicate pink paws and ears. Barely reaches the lion's ankle.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'lion-mouse',
    title:    { en: 'The Lion and the Mouse' },
    subtitle: 'an Aesop fable, retold',

    // Library presentation
    skin:    'classic',
    leather: 'chestnut',
    board:   null,
    color:   '#7a4a1e',

    // Reading metadata
    wordCount:   529,
    readMinutes: 4.5,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['lion', 'mouse'],
    coverAnimal: 'lion',

    // Unlock requirement
    requirements: [
      { animalId: 'lion',  minCount: 1, label: 'Find the Lion'  },
      { animalId: 'mouse', minCount: 1, label: 'Find the Mouse' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/lion.svg',
      imageAlt: 'A great sleeping lion in a sun-dappled forest clearing, a tiny mouse with a red neckerchief tiptoeing past his enormous paw.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.lion} lies asleep in a sun-dappled forest clearing, his head resting on his great paws, mane spread softly across the mossy ground. ${CAST.mouse} tiptoes past on the very tips of her pink paws, eyes wide, her crimson neckerchief bright against the soft greens and golds of the forest floor. A shaft of warm afternoon light falls exactly between them.`,
        composition: `Wide portrait. The lion fills the lower two-thirds of the frame, head and mane central. The mouse is small in the lower-right corner, caught mid-tiptoe. Eye lands first on the lion's peaceful face, then travels down to find the tiny mouse.`,
        light:       `Warm dappled afternoon sun filtering through tall oak canopy, soft golden pools on the moss, cool green shadows in the background.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Deep in a sun-warm forest, where tall oaks spread their arms wide and bluebells nodded in the breeze, a great lion lay sleeping. His amber mane fanned out across the soft moss. His enormous paws rose and fell with each slow, rumbling breath.` },
        image:    'assets/images/story/lion-mouse/page-01.webp',
        imageAlt: 'A great lion asleep in a forest clearing, amber mane spread across green moss, bluebells around him.',
        imagePrompt: prompt({
          scene:       `Establishing shot. ${CAST.lion} asleep in a wide forest clearing. His great head rests on crossed paws, amber mane fanned out across deep green moss. Tall oak trunks frame the background. Bluebells and soft ferns grow around him. A butterfly rests on one ear. No other characters in frame.`,
          composition: `Wide shot. The lion centred and low in the frame, the tall trees receding behind him, the canopy forming a soft arch above. Eye drawn first to his peaceful, heavy-lidded face.`,
          light:       `Warm late-morning sun filtering through oak leaves, dappled golden patches on the moss and the lion's mane, cool green shadow in the depths behind.`
        })
      },

      {
        id: 2,
        text: { en: `Along came a small grey mouse, whiskers twitching, red neckerchief bright in the morning light. She was so busy sniffing for seeds that she did not see the enormous lion until, oh dear, her tiny feet scurried right across the tip of his nose.` },
        image:    'assets/images/story/lion-mouse/page-02.webp',
        imageAlt: 'A tiny mouse with a red neckerchief perched on the nose of a sleeping lion, eyes wide with surprise.',
        imagePrompt: prompt({
          scene:       `Close shot. ${CAST.mouse} stands right on the end of the sleeping lion's enormous nose, frozen mid-step, eyes round with sudden alarm. Her crimson neckerchief is a bright spot against the lion's tawny fur. The lion's mane and closed eyes fill the background.`,
          composition: `Mid-close shot. The lion's face fills the lower half of the frame. The mouse is tiny but central, on the very tip of his nose. Eye lands on her tiny startled face, then widens to take in just how enormous the nose beneath her is.`,
          light:       `Bright dappled morning light from above, warm on the mouse's grey fur, cooler in the shadows of the lion's mane.`
        })
      },

      {
        id: 3,
        text: { en: `One golden eye opened. Then the other. Quick as sunrise, a great warm paw pressed gently down, holding the mouse in place. She trembled from the tips of her whiskers to the end of her tail, and looked up at the most enormous face she had ever seen.` },
        image:    'assets/images/story/lion-mouse/page-03.webp',
        imageAlt: 'A lion\'s great paw resting lightly over a tiny mouse who looks up with wide, frightened eyes.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} is now awake, sitting upright. One of his great paws rests gently but firmly on the ground, with ${CAST.mouse} caught beneath it — just her head, shoulders and forepaws visible. She looks straight up at the lion's face. His expression is curious rather than fierce.`,
          composition: `Mid shot from a low angle, looking up with the mouse. The lion's paw dominates the foreground. His face looms large above, framed by his mane. The mouse is tiny but her face is clearly readable.`,
          light:       `Warm afternoon light falls on the lion's mane from the left, leaving his face in a gentle half-shadow that softens any sense of menace.`
        })
      },

      {
        id: 4,
        text: { en: `"Little creature," said the lion, his voice rolling through the forest like far-away thunder, "you have woken me from the most wonderful dream." The mouse took the deepest breath she could manage. "Please," she said, very steadily. "Let me go. One day, I promise, I will repay you."` },
        image:    'assets/images/story/lion-mouse/page-04.webp',
        imageAlt: 'A tiny mouse standing upright and speaking bravely up to a great lion whose face fills the background.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} stands upright on her hind paws, tiny forepaws clasped together, looking directly up at ${CAST.lion}. Her expression is earnest and brave, not cringing. The lion looks down at her with mild curiosity, one ear tilted forward. Soft fern fronds and tree roots around them.`,
          composition: `Mid shot. The mouse small and upright in the lower-centre of the frame, the lion's head and chest filling the upper half. Eye lands first on the mouse's determined little face, then rises to the lion's questioning gaze.`,
          light:       `Soft, even forest light. Neither character in harsh shadow — the mood is thoughtful, not threatening.`
        })
      },

      {
        id: 5,
        text: { en: `The lion looked at her for one long, quiet moment. Then a rumble began deep in his chest, and it turned into a laugh, a big warm rolling laugh that shook the bluebells all around them. "You? Repay me?" But his eyes were kind. He lifted his paw. "Go safely, little one."` },
        image:    'assets/images/cartoon/lion.svg',
        imageAlt: 'A laughing lion with lifted paw, the tiny mouse scampering free toward the ferns.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} seated, head thrown back slightly in a warm, open-mouthed laugh, one great paw raised. ${CAST.mouse} darts away toward the ferns in the lower-right corner, her crimson neckerchief a flash of colour. Bluebells tremble around them. The lion's face is full of amusement and warmth — not mockery.`,
          composition: `Wide mid shot. The lion takes the left two-thirds of the frame, the mouse is small in the lower right. Eye lands on the lion's laughing face, then follows the mouse's escape direction toward the ferns.`,
          light:       `Warm golden light from above, catching the lion's mane and the mouse's neckerchief, soft green shadow in the ferns ahead of her.`
        })
      },

      {
        id: 6,
        text: { en: `The mouse scurried away into the cool ferns. The lion stretched his great golden back, yawned so wide the birds scattered from the branches, and padded off to find a shady pool. For a while, the forest was peaceful, full of birdsong and soft breezes and the smell of warm earth.` },
        image:    'assets/images/cartoon/lion.svg',
        imageAlt: 'A lion drinking from a still forest pool, his reflection golden in the water, birds in the branches above.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} alone at the edge of a still, dark forest pool, bent to drink. His reflection shimmers gold in the water. Two small birds perch on a branch above him. Tall ferns and oak roots frame the pool. Soft afternoon light. No mouse in this scene.`,
          composition: `Mid shot. The lion and his reflection form a symmetrical focal point. The pool takes the lower half of the frame, the birds are small accent points in the upper left. A quiet, settling scene.`,
          light:       `Still golden afternoon light, soft and warm, the pool a mirror of the canopy above.`
        })
      },

      {
        id: 7,
        text: { en: `Then one day, hunters came to the forest on quiet feet. They stretched a great rope net between the trees, strong enough to hold the mightiest animal in the world. The lion, following a trail of interesting smells through the undergrowth, walked right into it.` },
        image:    'assets/images/cartoon/lion.svg',
        imageAlt: 'A lion entangled in a rope net strung between forest trees, struggling and confused.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} caught in a thick rope net strung between two oak trunks. He is part-risen, one paw raised, the ropes pressing down on his mane and shoulders. His expression is confused and alarmed but not in pain. No hunters visible in the frame — the empty forest is silent around him.`,
          composition: `Wide mid shot. The lion central, ropes crossing the frame diagonally. The empty forest path visible behind him, suggesting the hunters have gone ahead. Eye lands on the lion's caught paw and alarmed face.`,
          light:       `Lower, cooler afternoon light filtering through dense canopy. The mood is stiller and quieter than earlier scenes — a sense of the forest holding its breath.`
        })
      },

      {
        id: 8,
        text: { en: `He twisted and pulled and roared until the whole forest rang with the sound of it. But the ropes held tight, and every struggle only knotted them closer. At last the lion lay still, panting, the net pressing heavy on his great warm mane.` },
        image:    'assets/images/cartoon/lion.svg',
        imageAlt: 'A lion lying still inside a rope net, head resting on the ground, expression tired and sad.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} lying still on the forest floor, the thick rope net draped over him. His chin rests on the ground between his forepaws. His eyes are open but heavy, expression sad and tired rather than fierce. The ropes are knotted tightly around his mane. Fallen leaves around him.`,
          composition: `Low-angle mid shot, close to the forest floor. The lion's face is at the centre, the net a web of lines around him. The empty forest stretches away behind. A quiet, still image — the eye rests on his tired face.`,
          light:       `Cool, dim forest light — the sun has moved further behind the canopy. A single thin shaft of light falls across the lion's mane.`
        })
      },

      {
        id: 9,
        text: { en: `Far away, in the roots of an old oak tree, the little grey mouse heard something. She lifted her nose. She knew that sound: a great voice, calling. She had heard it once before. She did not stop to think. She tucked her neckerchief tight and ran.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A tiny mouse running along a forest path, ears pricked, red neckerchief flying, purpose in every step.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} running at full speed along a winding forest path between tall roots and ferns, ears pricked forward, crimson neckerchief streaming back behind her. Her expression is alert and determined. The path curves away into soft forest shadow ahead.`,
          composition: `Side-on mid shot. The mouse is small but central, captured mid-sprint with one paw raised. The path curves away from her toward the upper right. A sense of urgency and purpose without panic.`,
          light:       `Cool dappled light on the forest floor, a warmer glow ahead of her where the path opens out — drawing the eye and the mouse toward it.`
        })
      },

      {
        id: 10,
        text: { en: `She found him tangled and exhausted, the ropes as thick as her whole body. She did not say a word. Snip, gnaw, snip. Her small sharp teeth worked quickly, cutting one strand, then another, then another, until the net fell open like a dropped basket.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'A tiny mouse gnawing through the ropes of a net, the lion\'s great patient eye watching her from behind the strands.',
        imagePrompt: prompt({
          scene:       `${CAST.mouse} perched on the thick ropes of the net, gnawing intently through a strand, both forepaws gripping the rope on either side. Several strands already hang loose and frayed. Behind the net, close up, ${CAST.lion}'s great patient eye watches her work. His expression is soft and still.`,
          composition: `Close shot. The mouse and the rope take the centre and foreground. The lion's eye fills the background, large and warm. The contrast in scale — tiny mouse, enormous eye — is the emotional heart of the image.`,
          light:       `Low, quiet light. The fraying rope fibres catch the light in fine detail. The lion's eye reflects a small warm glint.`
        })
      },

      {
        id: 11,
        text: { en: `The lion stepped free and shook his mane in the cool forest air. He looked down at the mouse, so small, so steady on her pink paws, and said nothing for a long moment. Then he lowered his great head gently toward hers. "I remember now," he said quietly, "what kindness is for."` },
        image:    'assets/images/cartoon/lion.svg',
        imageAlt: 'A great lion bowing his huge head down to touch noses gently with a tiny mouse, the forest bright and open around them.',
        imagePrompt: prompt({
          scene:       `${CAST.lion} standing free in a bright forest clearing, his great head bowed low until his nose almost touches ${CAST.mouse}'s tiny nose. She stands on her hind paws, forepaws resting lightly on his muzzle, looking up at him. Both faces are calm and warm. The broken net lies behind them on the forest floor.`,
          composition: `Mid shot. The two characters face each other across the centre of the frame, their sizes in dramatic contrast. The lion's head sweeps down from upper left, the mouse stands in the lower right. The broken net is visible but soft in the background.`,
          light:       `The light has opened out — warm late-afternoon gold pouring into the clearing from the right, catching the lion's mane and the mouse's neckerchief equally.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `And from that day on, the lion and the mouse walked different paths, but they were never really far from each other.` },
      image:    'assets/images/cartoon/mouse.svg',
      imageAlt: 'A quiet forest floor vignette: the severed rope net folded on a mossy stone, a tiny crimson neckerchief tied around one of the cut strands.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette on the forest floor. The severed rope net is folded neatly on a mossy stone. A tiny crimson neckerchief is tied with a small bow around one of the cut rope ends. Fallen oak leaves around the stone. A single bluebell growing at the base. No characters in frame.`,
        composition: `Mid shot, low angle, close to the ground. The stone with the folded net takes the centre. The neckerchief bow is the only warm colour. A calm, finished feeling — the story is over, something small but important has been left behind.`,
        light:       `Late golden light, long shadows, the warm glow of late afternoon. Still and peaceful.`
      })
    }

  }));

})(window.APP);

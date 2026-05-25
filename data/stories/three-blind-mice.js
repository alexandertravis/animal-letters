// ─── Three Blind Mice ─────────────────────────────────────────────────────────
//
// A classic nursery rhyme expanded into a lyrical story for young children.
// 11 paragraphs · ~485 words · 4 min read-aloud at toddler pace.
// Moral: good friends make any adventure joyful.
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
    percy: `Round grey mouse, a tiny red cap, round wire spectacles on a button nose, a small white-tipped walking stick, bright if myopic eyes behind the lenses.`,
    betty: `Plump warm-brown mouse, a cheerful yellow headscarf tied under the chin, an upturned sniffing nose, always tilting her head to catch a smell.`,
    tom:   `Slight grey mouse, very long and magnificent whiskers, a blue spotted handkerchief knotted at the neck, careful precise movements despite his limited vision.`
  };

  /* ── Prompt helper ────────────────────────────────────────────────────── */
  const prompt = ({ scene, composition, light }) =>
    `${STYLE}\n\nSCENE:\n${scene}\n\nCOMPOSITION:\n${composition}\n\nLIGHT:\n${light}\n\n${NEGATIVE}`;

  /* ── Story ───────────────────────────────────────────────────────────── */
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({

    // Identity
    id:       'three-blind-mice',
    title:    { en: 'Three Blind Mice' },
    subtitle: 'a nursery rhyme, retold',

    // Library presentation
    skin:    'classic',
    leather: 'plum',
    board:   'rose',
    color:   '#7b2d8b',

    // Reading metadata
    wordCount:   487,
    readMinutes: 4,
    readingAge:  { listen: '3-6', read: '6+' },
    rhyme:       false,
    rhymeScheme: null,
    meter:       null,

    // Cast
    animals:     ['mouse'],
    coverAnimal: 'mouse',

    // Unlock requirement
    requirements: [
      { animalId: 'mouse', minCount: 3, label: 'Complete Mouse 3×' }
    ],

    // ── Cover ──────────────────────────────────────────────────────────
    cover: {
      image:    'assets/images/cartoon/mouse.svg',
      imageAlt: 'Three mice in caps and headscarves linked arm in arm, the smallest tapping a tiny white-tipped stick, all three looking cheerfully confident.',
      imagePrompt: prompt({
        scene:       `Cover illustration. ${CAST.percy}, ${CAST.betty}, and ${CAST.tom} walk arm in arm through a warm farmhouse kitchen. Percy taps his small stick ahead. Betty's nose is tipped upward, sniffing. Tom's long whiskers are spread wide. All three are cheerful and completely at ease with each other. The kitchen is warm and full of good smells.`,
        composition: `Wide portrait. The three mice walk toward the viewer, linked arm in arm, filling the lower half of the frame. The warm kitchen is the background. Eye lands on their linked arms and their cheerful, individual expressions.`,
        light:       `Warm kitchen light, golden and inviting. The three mice are lit from a window to the right.`
      })
    },

    // ── Story paragraphs ───────────────────────────────────────────────
    paragraphs: [

      {
        id: 1,
        text: { en: `Three little mice lived together behind the kitchen wall of a great old farmhouse: Percy in a red cap and round spectacles, Betty in a yellow headscarf with an excellent nose, and Tom with very long whiskers and a blue spotted handkerchief. They were the very best of friends and had lived together as long as any of them could remember.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice in their cosy home behind the kitchen wall, a small lamp lit, three little beds and three tiny chairs.',
        imagePrompt: prompt({
          scene:       `Interior of the mice's cosy home behind the kitchen wall. ${CAST.percy} sits at a small table polishing his spectacles. ${CAST.betty} stands at a tiny shelf, arranging crumbs. ${CAST.tom} is at the far wall, hanging up his blue spotted handkerchief neatly. The home is snug and orderly, lit by a tiny lamp.`,
          composition: `Wide interior shot. The three mice in their home, each occupied. Percy left, Betty centre, Tom right. The tiny domestic details — miniature furniture, small lamp, crumb-shelf — give the scene warmth and scale.`,
          light:       `Warm lamplight, golden and intimate. The kitchen wall above them is just visible at the top of the frame.`
        })
      },

      {
        id: 2,
        text: { en: `One frosty morning the three mice woke to an extraordinary smell. It floated under the kitchen door and through the gap in the wainscot, rich and round and absolutely wonderful. Percy sat up straight. Betty twitched her nose three times in quick succession. "Cheese," said Tom, very softly, as if the word itself might run away.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice in their beds, all sitting up at once, their noses raised to the ceiling, eyes wide with the most wonderful smell.',
        imagePrompt: prompt({
          scene:       `${CAST.percy}, ${CAST.betty}, and ${CAST.tom} all sitting bolt upright in their three tiny beds. Percy's spectacles are askew. Betty's nose is pointed straight up, twitching. Tom's long whiskers are trembling with anticipation. All three faces are pointed in the same direction — toward the gap in the wainscot.`,
          composition: `Wide shot of the three little beds in a row. The mice are upright and alert in them. The gap in the wainscot is just visible, a thin line of warmer kitchen light. Eye reads across the three simultaneous reactions.`,
          light:       `Dim early morning light in their home, the faint golden line of kitchen warmth through the wainscot gap above.`
        })
      },

      {
        id: 3,
        text: { en: `They set off in single file through the gap in the skirting board, tapping and sniffing and feeling their way along the warm kitchen wall. Percy led with his small stick. Betty followed with her nose. Tom came last, whiskers spread wide to sense the air on either side. The smell grew stronger with every step.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice in single file along a kitchen wall, the smallest in front with a stick, following a delicious scent.',
        imagePrompt: prompt({
          scene:       `${CAST.percy} leading the line along the base of the kitchen wall, stick tapping the floor ahead. ${CAST.betty} behind him, nose up and twitching. ${CAST.tom} at the rear, whiskers spread wide as sensors. The kitchen floor is wooden and wide. A great kitchen table looms in the background. The scale of the mice makes the kitchen look enormous.`,
          composition: `Side-on shot at floor level. The three mice are in their line, small against the vast kitchen. The table leg in the background establishes scale. Eye follows the line of three from the front stick-tap to the rear whiskers.`,
          light:       `Morning kitchen light from a window high above — far above the mice, who are in the warm low light of the kitchen floor.`
        })
      },

      {
        id: 4,
        text: { en: `Up the table leg they went, one after another, and there in the centre of the great table sat the most magnificent cheese they had ever smelled: golden and crumbly, enormous as a cartwheel, and entirely unguarded. Percy ran his paws along the rind. Betty pressed her nose to it and breathed in deeply. Tom sat down and simply smiled.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three tiny mice on a kitchen table next to a huge round golden cheese, each reacting in their own delighted way.',
        imagePrompt: prompt({
          scene:       `${CAST.percy}, ${CAST.betty}, and ${CAST.tom} on top of the kitchen table beside a magnificent large round cheese, golden and crumbly. Percy runs his small paws along the rind, inspecting it. Betty has her nose pressed against it in ecstasy. Tom sits back, paws in his lap, long whiskers spread in a smile. The cheese is enormous relative to the mice.`,
          composition: `Mid shot at table height. The great cheese takes the right half of the frame. The three mice are on the left, tiny against it. Eye lands on the cheese's magnificent golden presence and then reads the three different reactions.`,
          light:       `Warm morning kitchen light. The cheese is lit from above and glows gold. The three mice are in the same warm light.`
        })
      },

      {
        id: 5,
        text: { en: `They had just begun to nibble a small polite piece when they heard footsteps. Heavy, deliberate footsteps crossing the stone floor. Percy froze. Betty pressed herself flat. Tom pulled his spotted handkerchief over his head. The farmer's wife came into the kitchen carrying a great wooden spoon and an expression of considerable determination.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice frozen in various hiding poses on a kitchen table as a large pair of boots approaches across the stone floor below.',
        imagePrompt: prompt({
          scene:       `${CAST.percy} frozen rigid, spectacles slightly crooked. ${CAST.betty} pressed flat against the cheese. ${CAST.tom} has pulled his blue spotted handkerchief completely over his face. On the stone floor below the table, a pair of large boots approaches. A wooden spoon is just visible at the edge of the frame above. The atmosphere is instantly comic rather than frightening.`,
          composition: `Wide shot at table height. The three mice and the cheese in the upper part of the frame. The approaching boots are in the lower part, viewed from above. The juxtaposition of the tiny mice and the large boots is the joke.`,
          light:       `The kitchen light is the same, but the shadow of the approaching figure falls across the mice from the right.`
        })
      },

      {
        id: 6,
        text: { en: `She saw that the cheese had been nibbled. She looked around the kitchen with narrowed eyes. Then she spotted three small tails sticking out from around the back of the cheese and said something very loud indeed. The three mice bolted. Percy left, Betty right, Tom straight ahead, all at top speed.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice shooting off the kitchen table in three different directions, a large wooden spoon visible behind them.',
        imagePrompt: prompt({
          scene:       `${CAST.percy} shooting off the left edge of the table, cap flying. ${CAST.betty} off the right, headscarf askew. ${CAST.tom} heading straight toward the viewer, whiskers back, blue handkerchief streaming. Behind them, the farmer's wife's wooden spoon is raised. The cheese sits untouched in the middle. A perfect moment of comic chaos.`,
          composition: `Wide shot. The cheese is central. The three mice radiate outward from it in three directions. The wooden spoon is large above. Eye takes in all three escape trajectories at once.`,
          light:       `The same kitchen light, but everything is in fast motion. A sense of action and speed.`
        })
      },

      {
        id: 7,
        text: { en: `They tumbled off the table, skittered across the flagstone floor, and dived through the gap in the skirting board together in a tremendous heap. They lay in their home, breathless and slightly cheese-scented and absolutely delighted with themselves. Tom dropped his handkerchief over Percy's face, which helped everyone feel better.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice in a cheerful heap in their cosy home behind the wall, out of breath, laughing, one with a handkerchief over his face.',
        imagePrompt: prompt({
          scene:       `${CAST.percy}, ${CAST.betty}, and ${CAST.tom} in a cheerful, panting heap in their home. Percy is on the bottom, Tom's blue handkerchief over his face. Betty is draped over both of them, sides heaving with laughter. Tom is on top, trying to look dignified. The gap in the wainscot above them is their safe entrance.`,
          composition: `Close mid shot of their cosy home. The three mice are a cheerful tangle in the centre. Their little home is around them. The mood is pure relief and delight.`,
          light:       `Warm lamplight as before. Safe, snug, and very funny.`
        })
      },

      {
        id: 8,
        text: { en: `After a rest and a good deal of discussion, they decided to be more organised. Percy made a careful plan. Betty drew a map on a piece of brown paper. Tom sat on the map by accident and had to remember which part was the kitchen, but the general idea was preserved and everyone agreed it was very good.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice around a tiny table with a piece of brown paper, Percy drawing a plan, Betty pointing, Tom looking guilty about sitting on part of it.',
        imagePrompt: prompt({
          scene:       `${CAST.percy} bent over a piece of brown paper at the tiny table, stick pointing to marks he has made. ${CAST.betty} leans in from one side, pointing enthusiastically at a specific spot on the map. ${CAST.tom} sits on a corner of the map, having just realized it, whiskers low with mild guilt. Small lamp on the table.`,
          composition: `Close mid shot at table level. The three mice around the table, the map the centre of attention. Their individual reactions — concentration, enthusiasm, guilt — make the scene. The tiny lamp glows between them.`,
          light:       `Warm lamplight on the table and the brown paper. Cosy and conspiratorial.`
        })
      },

      {
        id: 9,
        text: { en: `The second expedition was far more successful. They found a large piece of rind that had rolled under the dresser and several excellent crumbs of the same wonderful cheese caught in the cracks of the table leg. They carried the pieces back one by one, with great ceremony and considerable pride.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice carrying pieces of cheese along the base of a kitchen wall, each holding a morsel carefully, looking extremely pleased.',
        imagePrompt: prompt({
          scene:       `${CAST.percy} carrying a piece of cheese rind almost as big as his head, navigating with his stick. ${CAST.betty} has a large crumb pressed to her chest, nose tipped up with satisfaction. ${CAST.tom} brings up the rear with a smaller piece, his long whiskers swept back with pride. They process along the skirting board like a small triumphant parade.`,
          composition: `Side-on shot at floor level. The three mice in their procession, each with their prize. The skirting board and kitchen floor give scale. A quiet, triumphant parade.`,
          light:       `Kitchen afternoon light, warm and slanted. The cheese pieces glow gold. The mice are well-lit and clearly pleased.`
        })
      },

      {
        id: 10,
        text: { en: `That evening Percy lit the small lamp, Betty spread out the special checked cloth they used for celebrations, and Tom arranged the cheese pieces in the centre as if he were setting out a grand feast. They sat down at their little table in their little home and had the most splendid supper imaginable.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice at a tiny table laid with a checked cloth, cheese pieces in the centre, lamp glowing, all three looking very satisfied.',
        imagePrompt: prompt({
          scene:       `${CAST.percy}, ${CAST.betty}, and ${CAST.tom} at their tiny table, a checked cloth spread, the cheese pieces arranged in the centre as if at a grand feast. Percy's spectacles glint in the lamplight. Betty's nose is twitching with pleasure. Tom's whiskers are spread in a satisfied arc. The lamp casts a warm circle around all three.`,
          composition: `Close mid shot at table level. The checked cloth and cheese fill the centre. The three faces are above, lit by the lamp. A warm, intimate dining scene in miniature.`,
          light:       `Warm lamplight, the single best source of light in the frame. The cheese glows. The faces glow. Everything is golden and good.`
        })
      },

      {
        id: 11,
        text: { en: `When supper was done they pushed back their chairs and Tom began to hum. Percy tapped his stick in time. Betty began to dance. Round and round their little table they went, three mice together in their warm home, dancing and singing and perfectly happy.` },
        image:    'assets/images/cartoon/mouse.svg',
        imageAlt: 'Three mice dancing in a circle around their tiny table, the lamp glowing, the checked cloth still on the table, everyone laughing.',
        imagePrompt: prompt({
          scene:       `${CAST.percy}, ${CAST.betty}, and ${CAST.tom} dancing in a circle around their little table, holding each other's paws. Percy's stick is tucked under one arm. Betty's headscarf is flying slightly. Tom's whiskers sweep back and forth with the movement. The lamp is on the table, the checked cloth still spread. All three mouths are open in song.`,
          composition: `Wide interior shot. The three mice circle the table, filling the frame with movement and warmth. The lamp is the warm centre of the image. The circle of dance is the whole story.`,
          light:       `Warm lamplight, exactly as before. The lamp is unchanging at the centre. The mice dance around it. Everything is warm and alive.`
        })
      }

    ],

    // ── Closing vignette ───────────────────────────────────────────────
    closing: {
      text:     { en: `The cheese was long gone, but the dancing went on and on, as it always does in the very best homes.` },
      image:    'assets/images/cartoon/mouse.svg',
      imageAlt: 'A tiny checked cloth spread on a small table, the lamp still glowing, three empty chairs pushed back at angles as if their owners have just leapt up to dance.',
      imagePrompt: prompt({
        scene:       `A quiet end-of-story vignette. The mice's tiny table with the checked cloth, the small lamp still glowing warmly. Three tiny chairs pushed back from the table at different angles, as if their owners have just leapt up to dance. The cheese is gone. A few crumbs remain on the cloth. The lamp burns on.`,
        composition: `Close shot at table level. The three pushed-back chairs and the glowing lamp are the whole image. The empty chairs have personality — each pushed back in its owner's distinctive way. The lamp is the warm heart.`,
        light:       `The lamp's warm glow, unchanged. The rest of the image falls gently into shadow. Still and complete.`
      })
    }

  }));

})(window.APP);

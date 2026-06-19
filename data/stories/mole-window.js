// ─── Mole Makes a Window ──────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: curiosity and courage bring wonders.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/mole.svg';
  var CAST = {
    mole: `Monty the mole: a small velvety dark-grey mole with a pink pointed snout, big digging paws and tiny eyes; curious and gentle, usually a little dusty from digging.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'mole-window',
    title:    { en: "Mole Makes a Window" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'chestnut', board: null, color: '#6a4a32',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['mole'], coverAnimal: 'mole',
    requirements: [{ animalId: 'mole', minCount: 1, label: 'Find the Mole' }],
    cover: {
      image: IMG, imageAlt: 'A little mole poking its nose up out of the earth into daylight.',
      imagePrompt: P({ cast: [CAST.mole], scene: 'Monty the mole pokes his pink nose up out of the soft earth into daylight for the first time.', composition: 'Mole emerging from a molehill, green grass around.', light: 'Bright fresh daylight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Deep beneath the meadow, in a cosy tunnel of soft brown earth, lived a little mole named Monty. His home was warm and snug and dark, just the way moles like it, with winding passages he had dug all by himself. Monty had never once been up to the world above.` },
        image: IMG, imageAlt: 'A mole in a cosy underground tunnel.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty sits content in his cosy dark underground tunnel of soft earth.', composition: 'Mole in a snug burrow, roots overhead.', light: 'Warm dim earthy glow.' }) },
      { id: 2, text: { en: `But Monty had a great deal of curiosity, and lately he could think of nothing else. "What is UP there?" he wondered, peering at the ceiling of his tunnel. The old earthworms told him tales of a thing called the Sky — but no two told it the same, and Monty simply had to know.` },
        image: IMG, imageAlt: 'A curious mole looking up and wondering, with earthworms nearby.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty peers curiously upward while earthworms tell him muddled tales of the Sky.', composition: 'Mole looking up, worms around him.', light: 'Soft underground gloom.' }) },
      { id: 3, text: { en: `"It will be frightening," warned a worm. "It is ever so big and ever so bright." Monty's tummy fluttered. It did sound frightening. But it sounded wonderful too, and the wondering would not leave him be. "I shall dig myself a little window," he decided, "and see for myself."` },
        image: IMG, imageAlt: 'A determined mole deciding to dig upward.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty sets his paws to the tunnel roof, determined to dig a window upward.', composition: 'Mole reaching up to dig.', light: 'Dim earthy light.' }) },
      { id: 4, text: { en: `So Monty began to dig upward — scoop, scoop, scoop — pushing the soft soil behind him. Up and up he tunnelled, his little heart thumping, the earth growing looser and the air growing fresher, until suddenly his digging paws broke through into open space.` },
        image: IMG, imageAlt: 'A mole digging steadily upward through the soil.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty digs steadily upward, soil loosening as he nears the surface.', composition: 'Mole tunnelling up toward a hint of light.', light: 'Darkness giving way to a glimmer above.' }) },
      { id: 5, text: { en: `Monty froze. Light poured down through the little round window he had made — warm, golden light, brighter than anything he had ever known. For a moment he was so dazzled and so scared that he nearly dived straight back down into the safe dark.` },
        image: IMG, imageAlt: 'A mole blinking at bright light pouring through a hole.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty blinks, half-dazzled, as warm light pours through the little hole he has dug.', composition: 'Mole at the threshold of light and dark.', light: 'Brilliant shaft of golden light.' }) },
      { id: 6, text: { en: `But his curiosity was braver than his fear. Slowly, carefully, Monty poked his pink nose out into the world above — and gasped. There it was. The Sky. It was not a ceiling at all, but a great blue dome stretching up and up forever, with not a speck of earth in the way.` },
        image: IMG, imageAlt: 'A mole gazing up at a vast blue sky for the first time.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty pokes out and gazes in wonder at the vast open blue sky.', composition: 'Tiny mole, enormous sky above.', light: 'Bright clear daylight.' }) },
      { id: 7, text: { en: `He saw the green grass swaying like a sea. He saw a butterfly stitch a wobbly path through the air. He smelled flowers and warm hay and rain that had only just stopped. There was so much, so very much, that Monty laughed out loud with the sheer surprise of it all.` },
        image: IMG, imageAlt: 'A delighted mole watching a butterfly above the grass.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'A delighted Monty watches a butterfly flutter over the swaying meadow grass.', composition: 'Mole at his molehill, butterfly above.', light: 'Warm sunny meadow light.' }) },
      { id: 8, text: { en: `Monty stayed up there a long, happy while, soaking it all in. He did not need to live in the Sky — his cosy dark home was still where he belonged. But now he knew the wonder was there, just above his head, whenever he was brave enough to dig up and look.` },
        image: IMG, imageAlt: 'A content mole sitting at the top of its molehill in the sun.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty sits contentedly at the top of his molehill, soaking up the sunny world.', composition: 'Happy mole on his little hill.', light: 'Golden afternoon.' }) },
      { id: 9, text: { en: `That evening he tucked back down into his snug tunnel, dusty and tired and full of marvels to tell. And ever after, whenever Monty felt the old curiosity tickle his nose, he simply dug himself a brand new little window — and let the wide world in.` },
        image: IMG, imageAlt: 'A happy mole back in its burrow at evening, dreaming of the sky.',
        imagePrompt: P({ cast: [CAST.mole], scene: 'Monty curls up cosy in his burrow at evening, head full of the wonders above.', composition: 'Mole snug below, a little window of light above.', light: 'Warm dim burrow, soft glow from the window.' }) }
    ],
    closing: {
      text: { en: `For the world is far bigger than the corner we know — and all it takes to find its wonders is a curious heart, and the courage to dig a little window.` },
      image: IMG, imageAlt: 'A small round molehill with light shining from inside at dusk.',
      imagePrompt: P({ scene: 'End vignette: a small molehill in a meadow at dusk, a warm glow within.', composition: 'Simple molehill in evening grass.', light: 'Gentle dusk with inner glow.' })
    }
  }));
})(window.APP);

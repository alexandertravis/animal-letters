// ─── How the Zebra Got Her Stripes ────────────────────────────────────────────
// Gentle 'just-so' tale. ~9 pages. Moral: what makes you unlike the others can be
// your greatest protection and your truest beauty.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/zebra.svg';
  var CAST = {
    zebra: `Zola the zebra: a gentle horse-like creature, plain white at first, then beautifully striped black-and-white, with a flowing mane and soft dark eyes.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'zebra-stripes-night',
    title:    { en: "How the Zebra Got Her Stripes" },
    subtitle: "a 'just-so' tale",
    skin: 'classic', leather: 'charcoal', board: null, color: '#4a4a4a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['zebra'], coverAnimal: 'zebra',
    requirements: [{ animalId: 'zebra', minCount: 1, label: 'Find the Zebra' }],
    cover: {
      image: IMG, imageAlt: 'A beautifully striped zebra standing in moonlit grass.',
      imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola the zebra stands in tall moonlit grass, her black-and-white stripes glowing.', composition: 'Striped zebra in silver grassland.', light: 'Soft silver moonlight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Long ago, in the High and Far-Off Times, the zebra was not striped at all, but plain and white all over, like a little white horse. Her name was Zola, and though she was gentle and good, she was a little sad, for she felt she was the plainest creature on the whole golden plain.` },
        image: IMG, imageAlt: 'A plain white zebra-horse on a golden plain.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola, plain white all over, stands looking a little sad on the golden plain.', composition: 'White zebra in dry grassland.', light: 'Warm plain daylight.' }) },
      { id: 2, text: { en: `"The leopard has his lovely spots," Zola sighed, "and the tiger her bold stripes, and the peacock his jewelled feathers. But I am only plain white, with nothing special about me at all." She did not know that her plain white coat was about to cause her quite a lot of trouble.` },
        image: IMG, imageAlt: 'A plain white zebra wishing for markings like other animals.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola gazes wistfully at the spotted and patterned animals, wishing for markings of her own.', composition: 'Plain zebra among patterned animals.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `For out on the open plain, Zola's bright white coat could be seen from miles and miles away. When a hungry lion prowled the grass at dusk, there was Zola, standing out white as the moon, with nowhere to hide. She had to gallop and gallop to stay safe, and she grew very tired and very frightened.` },
        image: IMG, imageAlt: 'A white zebra easy to spot against the dark grass.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola\'s bright white coat stands out starkly against the dusky grass, easily seen.', composition: 'Conspicuous white zebra at dusk.', light: 'Dimming dusk light.' }) },
      { id: 4, text: { en: `One evening, worn out from running, Zola went down to drink at a shadowy water hole, where tall dark reeds grew thick against the pale evening sky. As she stood among them, the low sun cast the long shadows of the reeds right across her white coat — dark stripe, pale stripe, dark stripe, pale.` },
        image: IMG, imageAlt: 'Reed shadows falling in stripes across a white zebra.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'The shadows of tall reeds fall in dark stripes across Zola\'s white coat at the water hole.', composition: 'Zebra among reeds, striped shadows on her.', light: 'Long low golden shadows.' }) },
      { id: 5, text: { en: `Now the wise old Spirit of the Plain had been watching gentle Zola, and seen how she suffered for being so easy to spot. "Those shadow-stripes suit her well," mused the Spirit. "Among the reeds and the long grass, stripes would hide her far better than plain white ever could." And the Spirit decided to help.` },
        image: IMG, imageAlt: 'A spirit of the plain watching a zebra among the reeds.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'The wise Spirit of the Plain watches Zola among the striped reed-shadows.', composition: 'Zebra and a soft swirl of plain-spirit.', light: 'Golden shimmering dusk.' }) },
      { id: 6, text: { en: `With a touch as soft as evening, the Spirit made the shadow-stripes stay. The dark bars sank gently into Zola's white coat and became her own — beautiful black stripes across white, from her nose to the tip of her tail. When Zola looked down at herself, she gasped in delight. "Stripes! I have STRIPES!"` },
        image: IMG, imageAlt: 'A zebra delighted to find she now has real stripes.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola looks down in delight to find the shadow-stripes have become her own real black stripes.', composition: 'Newly striped zebra, joyful.', light: 'Magical golden glow.' }) },
      { id: 7, text: { en: `And the stripes were not only beautiful — they were clever, too. The very next time a lion came prowling, Zola simply stood still among the tall grass and reeds, and her stripes blurred and blended with the shadows until she all but vanished. The lion looked right past her and wandered away.` },
        image: IMG, imageAlt: 'A striped zebra hidden among tall grass and shadows.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola stands still among the tall striped grass, her stripes hiding her perfectly.', composition: 'Camouflaged zebra in striped grass.', light: 'Dappled dusk shadows.' }) },
      { id: 8, text: { en: `Zola could hardly believe it. The very stripes that made her beautiful also kept her safe. "I spent so long wishing to be different," she said, "and now my difference protects me AND makes me lovely!" She tossed her striped mane proudly and pranced across the plain, no longer plain at all.` },
        image: IMG, imageAlt: 'A proud striped zebra prancing on the plain.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'Zola prances proudly across the plain, beautiful and safe in her new stripes.', composition: 'Joyful striped zebra in motion.', light: 'Warm proud light.' }) },
      { id: 9, text: { en: `And so, says the old tale, the zebra has worn her stripes ever since — black and white and beautiful, a gift of the evening shadows. And every zebra's stripes are different from every other's, so that each one is special in her very own way, just as gentle Zola always wished to be.` },
        image: IMG, imageAlt: 'A herd of uniquely striped zebras on the moonlit plain.',
        imagePrompt: P({ cast: [CAST.zebra], scene: 'A herd of beautifully and uniquely striped zebras stands on the moonlit plain.', composition: 'Several zebras, each with unique stripes.', light: 'Soft silver moonlight.' }) }
    ],
    closing: {
      text: { en: `For the thing that sets you apart from all the rest may be your truest beauty — and no two are ever striped quite the same.` },
      image: IMG, imageAlt: 'Tall striped grass swaying against a moonlit sky.',
      imagePrompt: P({ scene: 'End vignette: tall grass swaying in dark-and-pale stripes against a moonlit sky.', composition: 'Simple striped grass and moon.', light: 'Gentle silver moonlight.' })
    }
  }));
})(window.APP);

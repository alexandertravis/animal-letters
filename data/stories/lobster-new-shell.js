// ─── Lobster's New Shell ──────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: growing up means outgrowing the old and trusting the new.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    lobster: `Lulu the lobster: a bright red-orange lobster with big curious eyes and waving feelers, young and a little nervous about change, snug in her favourite tide-pool.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'lobster-new-shell',
    title:    { en: "Lobster's New Shell" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'rose', color: '#d4674a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['lobster'], coverAnimal: 'lobster',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/lobster.svg',
      imageAlt: 'A bright lobster in a colourful tide-pool among shells and seaweed.',
      imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu the lobster sits in a colourful tide-pool surrounded by shells and waving seaweed.', composition: 'Lobster centred in a jewel-like pool.', light: 'Clear bright rock-pool light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Lulu the lobster lived in a cosy tide-pool, and she loved her shell. It was hard and snug and had kept her safe since she was tiny. But lately it had begun to feel a little tight — a little pinchy round the edges.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A lobster in a tide-pool noticing her shell feels tight.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu wriggles a little in her snug shell, noticing it feels tight.', composition: 'Close on the lobster in her pool.', light: 'Bright clear water light.' }) },
      { id: 2, text: { en: `"You're growing," said her wise old aunt. "Soon you must shed your shell and grow a bigger one. All lobsters do." Lulu was alarmed. "Shed my shell? But then I'd have no shell at all! I'd be soft and bare. That sounds frightening!"` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A young lobster looking worried as an older lobster explains.',
        imagePrompt: P({ scene: 'A wise older lobster explains to a worried young Lulu about shedding her shell.', composition: 'Two lobsters in conversation in the pool.', light: 'Soft underwater light.' }) },
      { id: 3, text: { en: `"It is a little frightening," her aunt agreed. "For a while you will be soft, and you must hide until your new shell hardens. But the new shell will be bigger and stronger — and you cannot grow while clinging to the old one."` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'An older lobster reassuring a young one in the pool.',
        imagePrompt: P({ scene: 'The older lobster reassures young Lulu gently in the tide-pool.', composition: 'Tender exchange between two lobsters.', light: 'Calm dappled light.' }) },
      { id: 4, text: { en: `For days Lulu put it off. The tight shell pinched more and more, but the thought of being soft and bare frightened her too much. "Maybe I just won't grow," she said. But of course, deep down, she was growing all the same.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A lobster squeezed uncomfortably in a too-tight shell.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu looks uncomfortable and cramped in her now-too-tight shell.', composition: 'Lobster squeezed and unhappy.', light: 'Cool water light.' }) },
      { id: 5, text: { en: `At last the pinching grew too much to bear. With a deep breath, Lulu found a safe crevice in the rocks, tucked herself in, and — wriggling and pushing — slipped at last right out of her old hard shell. And there she was: soft, and new, and bare.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A soft new lobster emerging from her old shell in a rock crevice.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu wriggles free of her old shell in a safe rock crevice, soft and new.', composition: 'Lobster emerging, empty shell beside her.', light: 'Sheltered dim crevice light.' }) },
      { id: 6, text: { en: `It felt strange to be so soft. Lulu stayed very still and hidden in her crevice, just as her aunt had said, while the days passed and the sea rocked gently around her. And slowly, slowly, she felt her new shell beginning to harden.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A soft lobster hiding safely in a rocky crevice.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu rests hidden in her crevice as her new soft shell slowly hardens.', composition: 'Lobster tucked safely in the rocks.', light: 'Soft sheltered light.' }) },
      { id: 7, text: { en: `When at last she crept out, her new shell was bigger, smoother, and stronger than the old one had ever been. She stretched her claws — and they did not pinch at all. There was room now to grow, and to move, and to breathe.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A lobster stretching happily in her bigger new shell.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu stretches her claws happily in her bigger, stronger new shell.', composition: 'Confident lobster in her new shell.', light: 'Bright clear water light.' }) },
      { id: 8, text: { en: `Lulu looked back at her little old shell, lying empty in the crevice. It had served her well, and she was grateful for it. But she knew now that she could never have grown if she had stayed inside it forever.` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A lobster looking back at her small empty old shell.',
        imagePrompt: P({ cast: [CAST.lobster], scene: 'Lulu looks back fondly at her small empty old shell in the crevice.', composition: 'Lobster and the discarded old shell.', light: 'Gentle dappled light.' }) },
      { id: 9, text: { en: `"It was frightening to let go of the old," Lulu told her aunt, "but it would have been worse to stay too small forever." Her aunt smiled. "That," she said, "is the truest thing about growing up there is."` },
        image: 'assets/images/cartoon/lobster.svg', imageAlt: 'Two lobsters together happily in a bright tide-pool.',
        imagePrompt: P({ scene: 'Lulu and her wise aunt rest contentedly together in the bright tide-pool.', composition: 'Two lobsters at ease in the pool.', light: 'Warm clear water light.' }) }
    ],
    closing: {
      text: { en: `And every time after that, when her shell grew tight again, Lulu remembered: growing means letting go of the old, and trusting that something stronger is on its way.` },
      image: 'assets/images/cartoon/lobster.svg', imageAlt: 'A small empty lobster shell resting among pebbles in a pool.',
      imagePrompt: P({ scene: 'End vignette: a small empty lobster shell resting among smooth pebbles in a clear pool.', composition: 'Simple still life in the water.', light: 'Soft bright pool light.' })
    }
  }));
})(window.APP);

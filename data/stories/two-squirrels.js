// ─── The Two Squirrels ────────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: what we share comes back to us; what we
// hoard alone helps no one, not even ourselves.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/squirrel.svg';
  var CAST = {
    squirrel: `the two squirrels: Nib, a bright generous red squirrel, and Gripe, a hoarding squirrel with a bulging cheek and a worried frown; both bushy-tailed.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'two-squirrels',
    title:    { en: "The Two Squirrels" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'russet', board: null, color: '#a9542a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['squirrel'], coverAnimal: 'squirrel',
    requirements: [{ animalId: 'squirrel', minCount: 1, label: 'Find the Squirrel' }],
    cover: {
      image: IMG, imageAlt: 'Two squirrels in an autumn tree full of acorns.',
      imagePrompt: P({ cast: [CAST.squirrel], scene: 'Two squirrels gather acorns in a golden autumn tree.', composition: 'Two squirrels among autumn leaves and acorns.', light: 'Warm autumn-gold light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a great oak tree at the edge of the wood lived two squirrels: Nib and Gripe. All through the golden autumn, the two of them gathered acorns for the long winter ahead — scampering up and down, their cheeks bulging, burying their treasure away. But the two squirrels gathered in very different ways.` },
        image: IMG, imageAlt: 'Two squirrels gathering acorns in autumn.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Nib and Gripe scamper about gathering acorns in the golden autumn wood.', composition: 'Two busy squirrels among falling leaves.', light: 'Warm autumn light.' }) },
      { id: 2, text: { en: `Nib gathered just what he needed, and whenever he found more than enough, he gladly shared it — with the old mouse, with the young birds, with anyone hungry. Gripe, on the other paw, gathered and gathered and gathered, far more than he could ever eat, and hid every last acorn away for himself alone.` },
        image: IMG, imageAlt: 'One squirrel sharing acorns, another hoarding them.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Nib shares acorns with woodland friends while Gripe hoards a huge secret pile.', composition: 'Generous squirrel and hoarding squirrel.', light: 'Bright autumn light.' }) },
      { id: 3, text: { en: `"You're a fool, Nib," Gripe scoffed, guarding his enormous hoard. "Why give your acorns away? Winter is coming, and only a full store will see you through. Keep everything for yourself, like I do — that is the clever way." Nib only smiled. "Perhaps," he said. "But sharing makes the gathering merrier."` },
        image: IMG, imageAlt: 'A hoarding squirrel scolding a generous one.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Gripe scolds Nib for sharing, guarding his great hoard jealously.', composition: 'Hoarder squirrel, generous squirrel.', light: 'Cool clear light.' }) },
      { id: 4, text: { en: `Then the winter came, white and hard and long. Snow buried the wood, and finding food became almost impossible. Gripe felt very pleased with himself — until he went to dig up his great secret hoard, and found, to his horror, that he had buried it so well and in so many scattered places that he could not remember where most of it was!` },
        image: IMG, imageAlt: 'A worried squirrel digging in the snow, unable to find his acorns.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Gripe digs frantically in the snow, unable to find his scattered hidden hoard.', composition: 'Frantic squirrel in the deep snow.', light: 'Cold blue-white winter light.' }) },
      { id: 5, text: { en: `Gripe dug and dug until his paws were frozen, but most of his hoard stayed lost beneath the snow. Soon he was cold and hungry and all alone, for he had never shared with anyone, and so now there was no one who wished to share with him. His greed had left him with nothing at all.` },
        image: IMG, imageAlt: 'A cold, hungry, lonely squirrel in the snow.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Gripe sits cold, hungry and alone in the snow, his hoard lost.', composition: 'Forlorn squirrel in a wintry wood.', light: 'Bleak grey light.' }) },
      { id: 6, text: { en: `Nib, meanwhile, had no great hoard of his own — but he was not hungry, not one bit. For all through the autumn he had shared so freely that now, in the cold, his many friends shared right back. The mouse brought him seeds, the birds brought him berries, and no one let kind Nib go without.` },
        image: IMG, imageAlt: 'Woodland friends sharing food with a generous squirrel in winter.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'In winter, the mouse and birds bring food to share with the generous Nib.', composition: 'Squirrel among grateful, sharing friends.', light: 'Warm light amid the snow.' }) },
      { id: 7, text: { en: `When Nib saw poor Gripe shivering and hungry in the snow, he did not gloat or turn away. "Come, Gripe," he said kindly. "Share what we have. There is always enough when everyone shares." And he led the cold, ashamed squirrel back to the warm gathering of friends.` },
        image: IMG, imageAlt: 'A kind squirrel inviting the cold hoarder to share.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Nib kindly invites the shivering Gripe to come and share with the friends.', composition: 'Generous squirrel welcoming the hoarder.', light: 'Warm forgiving light.' }) },
      { id: 8, text: { en: `Gripe could hardly believe it. After all his scoffing, here was Nib, sharing with him anyway. Warm food and warm company thawed him right through, and for the first time in his life, Gripe felt the glow of being cared for. "I was so wrong," he said quietly. "I see it now."` },
        image: IMG, imageAlt: 'A grateful squirrel warmed by sharing friends.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Gripe is warmed by food and friendship, ashamed but grateful.', composition: 'Hoarder squirrel among welcoming friends.', light: 'Cosy warm glow.' }) },
      { id: 9, text: { en: `That spring, Gripe was a changed squirrel. He shared his acorns freely, just as Nib did, and found he was never lonely or fearful again. For the two squirrels had learned the truth of it at last: a hoard kept for yourself can be lost or forgotten — but kindness, once shared, always finds its way home.` },
        image: IMG, imageAlt: 'Two squirrels happily sharing acorns with friends in spring.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Nib and a reformed Gripe happily share acorns with their woodland friends in spring.', composition: 'Two squirrels sharing among friends.', light: 'Bright fresh spring light.' }) }
    ],
    closing: {
      text: { en: `For a hoard kept all to yourself may be lost or forgotten — but kindness, once given, has a way of always coming home.` },
      image: IMG, imageAlt: 'A single acorn resting on a mossy branch in spring.',
      imagePrompt: P({ scene: 'End vignette: a single acorn resting on a mossy branch in the spring sun.', composition: 'Simple still life, one acorn.', light: 'Soft spring glow.' })
    }
  }));
})(window.APP);

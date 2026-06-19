// ─── Rhino's Soft Heart ───────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: do not judge by looks; kindness is inside.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/rhino.svg';
  var CAST = {
    rhino: `Rumble the rhino: a huge grey rhino with a thick hide, two stout horns and small gentle eyes; enormous and tough-looking, but soft and shy at heart.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'rhino-soft-heart',
    title:    { en: "Rhino's Soft Heart" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'slate', board: null, color: '#6a727a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['rhino'], coverAnimal: 'rhino',
    requirements: [{ animalId: 'rhino', minCount: 1, label: 'Find the Rhino' }],
    cover: {
      image: IMG, imageAlt: 'A large grey rhino standing alone on a wide savanna.',
      imagePrompt: P({ cast: [CAST.rhino], scene: 'Rumble the rhino stands alone on a wide golden savanna, looking gentle and a little shy.', composition: 'Big rhino centred, grassland stretching out.', light: 'Warm savanna afternoon.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On the wide golden grassland lived a rhino named Rumble. He was enormous — as big as a boulder — with a thick grey hide and two great horns, and when he walked, the ground trembled beneath him. Every animal on the plain took one look at Rumble and ran the other way.` },
        image: IMG, imageAlt: 'Animals scattering as a huge rhino walks across the plain.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Small animals scatter in all directions as the huge rhino walks across the plain.', composition: 'Rhino striding, others fleeing.', light: 'Bright dusty savanna light.' }) },
      { id: 2, text: { en: `"Look out, here comes the big scary rhino!" the meerkats would squeak, diving into their burrows. The birds flew up in a flurry. The gazelles bounded away. And Rumble would sigh a great sad sigh, for the truth was that he was not scary at all — he was lonely.` },
        image: IMG, imageAlt: 'A sad lonely rhino watching animals flee from him.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Rumble sighs sadly as meerkats and birds flee from him across the grass.', composition: 'Lonely rhino, animals vanishing away.', light: 'Soft melancholy light.' }) },
      { id: 3, text: { en: `Inside his great grey body, Rumble had the softest, gentlest heart on the whole savanna. He loved butterflies and birdsong and the smell of rain. He would not hurt a single soul. But nobody ever stayed long enough to find that out, and so nobody knew.` },
        image: IMG, imageAlt: 'A gentle rhino watching a butterfly with a soft smile.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Rumble gazes softly at a butterfly resting on his horn, a gentle smile on his face.', composition: 'Tender close-up, butterfly on horn.', light: 'Warm tender light.' }) },
      { id: 4, text: { en: `One blazing afternoon, a tiny bird named Pip was learning to fly when a gust of wind tumbled her down, down, down into a deep thornbush, where she stuck fast and could not get free. "Help!" she cheeped. "Somebody, please help me!" But everyone was too far away to hear.` },
        image: IMG, imageAlt: 'A tiny bird stuck in a thornbush calling for help.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'A tiny bird is tangled and stuck fast in a deep thornbush, cheeping for help.', composition: 'Little bird caught among thorns.', light: 'Harsh bright afternoon.' }) },
      { id: 5, text: { en: `Everyone, that is, except Rumble. He heard the little cry and came thundering over at once. When Pip saw the enormous rhino looming above her, she shut her eyes tight with fright. "Oh no," she squeaked, "now the big scary rhino will get me too!"` },
        image: IMG, imageAlt: 'A frightened little bird as a big rhino approaches the thornbush.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Pip shuts her eyes in fright as the enormous rhino looms over the thornbush.', composition: 'Huge rhino above tiny scared bird.', light: 'Tense bright light.' }) },
      { id: 6, text: { en: `But Rumble did not get her. Ever so gently — far more gently than such a big creature should be able to be — he used the very tip of his horn to part the cruel thorns, one by one, until there was a little gap just big enough for a little bird to wriggle free.` },
        image: IMG, imageAlt: 'A rhino gently parting thorns with his horn to free a bird.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Rumble ever so gently parts the thorns with the tip of his horn to free Pip.', composition: 'Careful giant, delicate rescue.', light: 'Soft warm light breaking the tension.' }) },
      { id: 7, text: { en: `Pip tumbled out, ruffled but safe, and looked up at her rescuer in amazement. "You... you saved me," she said. "But I thought you were scary!" Rumble smiled his shy soft smile. "I look scary," he said quietly, "but I would never, ever hurt you. I only ever wanted a friend."` },
        image: IMG, imageAlt: 'A freed bird looking up in wonder at the gentle rhino.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Pip looks up in wonder at the shy, smiling rhino who freed her.', composition: 'Bird and gentle giant, eyes meeting.', light: 'Warm gentle light.' }) },
      { id: 8, text: { en: `Pip flew straight home and told everyone the truth: the big grey rhino was the kindest, gentlest creature on the whole plain. At first the others could hardly believe it. But one by one, they crept a little closer — and found that Pip was right all along.` },
        image: IMG, imageAlt: 'Animals gathering shyly around the gentle rhino.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'Animals creep shyly closer to Rumble as Pip tells them how kind he is.', composition: 'Rhino surrounded by curious, warming animals.', light: 'Soft golden afternoon.' }) },
      { id: 9, text: { en: `Before long, Rumble was the most popular friend on the savanna. The little birds rode on his broad back; the meerkats napped in his cool shadow. He was never lonely again. And the animals learned the truest lesson of all: you cannot tell a heart by the size of its body.` },
        image: IMG, imageAlt: 'A happy rhino with birds on his back and animals all around.',
        imagePrompt: P({ cast: [CAST.rhino], scene: 'A happy Rumble carries little birds on his back, animals resting in his shade.', composition: 'Beloved rhino among many friends.', light: 'Warm joyful savanna glow.' }) }
    ],
    closing: {
      text: { en: `So never run from a creature just because it is big, or grey, or different from you — for the softest heart of all may be waiting quietly inside.` },
      image: IMG, imageAlt: 'A butterfly resting on a rhino horn against the sunset.',
      imagePrompt: P({ scene: 'End vignette: a single butterfly resting on a curved rhino horn against a soft sunset.', composition: 'Simple, horn and butterfly silhouette.', light: 'Gentle golden sunset.' })
    }
  }));
})(window.APP);

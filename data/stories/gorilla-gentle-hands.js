// ─── Gorilla's Gentle Hands ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: true strength is knowing how to be gentle.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    gorilla: `Goro the gorilla: a huge, broad-shouldered silverback with enormous strong hands and a deep rumbling voice, but the calmest, gentlest manner in the whole forest.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'gorilla-gentle-hands',
    title:    { en: "Gorilla's Gentle Hands" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'charcoal', board: null, color: '#3a3a3a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['gorilla'], coverAnimal: 'gorilla',
    requirements: [{ animalId: 'gorilla', minCount: 1, label: 'Find the Gorilla' }],
    cover: {
      image: 'assets/images/cartoon/gorilla.svg',
      imageAlt: 'A huge gorilla cradling a tiny egg carefully in his enormous hands.',
      imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro the great gorilla cradles a tiny speckled egg with infinite care in his enormous hands.', composition: 'Huge hands, tiny egg as the focal point.', light: 'Soft dappled forest light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Goro was the strongest creature in the forest. His hands were huge. He could bend a young tree, lift a fallen log, and push aside a boulder as if it were a pebble. The little animals were rather in awe of him.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A huge gorilla effortlessly lifting a fallen log.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro lifts a heavy fallen log with ease in a misty forest clearing.', composition: 'Powerful gorilla, log raised high.', light: 'Cool misty forest light.' }) },
      { id: 2, text: { en: `But Goro never boasted of his strength, and he never used it roughly. "Strong hands," his mother had told him long ago, "must learn to be gentle hands. That is the harder thing, and the better one." Goro had never forgotten.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla looking thoughtfully at his own large hands.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro sits quietly, regarding his own enormous hands with thoughtful calm.', composition: 'Reflective close shot of the gorilla.', light: 'Gentle dappled light.' }) },
      { id: 3, text: { en: `One morning a tiny bird flew down in a panic. "My egg!" she cried. "It has rolled from the nest onto the high ledge, and I am too small to reach it, and it will fall!" The other animals were all too small, or too clumsy, to help.` },
        image: 'assets/images/cartoon/eagle.svg', imageAlt: 'A small bird in a panic pointing at a high ledge.',
        imagePrompt: P({ scene: 'A small distressed bird flutters before Goro, pointing up at a high rocky ledge.', composition: 'Anxious bird, ledge looming above.', light: 'Bright morning light.' }) },
      { id: 4, text: { en: `Goro looked up at the ledge, far above, where the little speckled egg teetered on the very edge. His great strength could carry him up the rocks with ease. But could his enormous hands be gentle enough for so small and fragile a thing?` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla gazing up at a tiny egg on a high ledge.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro gazes up at a tiny egg teetering on a distant high ledge, considering carefully.', composition: 'Gorilla below, fragile egg far above.', light: 'Bright upward light.' }) },
      { id: 5, text: { en: `Up he climbed, slow and sure, his powerful arms finding every hold. At the top, the egg wobbled on the brink. Goro held his breath. He reached out one vast hand — and then, ever so softly, curled it almost closed.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla reaching carefully toward a wobbling egg on a ledge.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro reaches out a huge hand, curling it softly toward the wobbling egg on the ledge.', composition: 'Tense reach, egg on the brink.', light: 'Clear high light.' }) },
      { id: 6, text: { en: `With a touch as soft as a falling leaf, Goro cupped the egg in the very tips of his fingers. It was so small in his great palm that it looked like a tiny moon. He did not squeeze. He did not fumble. He simply held it, safe and still.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla cradling a tiny egg safely in his huge cupped hand.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'The tiny egg rests safely cupped in Goro\'s enormous gentle hand, like a small moon.', composition: 'Extreme tenderness, scale contrast.', light: 'Warm soft light.' }) },
      { id: 7, text: { en: `Slowly, so slowly, Goro climbed back down with the egg held close to his chest. He carried it as if it were the most precious thing in the world — which, to the little bird watching below, it certainly was.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla climbing down carefully, an egg held to his chest.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro descends the rocks with great care, the egg held protectively to his chest.', composition: 'Careful descent, protective posture.', light: 'Dappled descending light.' }) },
      { id: 8, text: { en: `He set the egg back in its mossy nest as softly as a whisper. The little bird wept with joy and thanked him a hundred times. "Such strong hands," she marvelled, "and so very, very gentle."` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla settling an egg back into a mossy nest as a bird rejoices.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro settles the egg gently back into its mossy nest while the bird rejoices.', composition: 'Tender placement, grateful bird.', light: 'Warm nesting light.' }) },
      { id: 9, text: { en: `"My mother was right," Goro rumbled softly, smiling. "Anyone can be strong. The hard part — and the best part — is being gentle." And the whole forest, which had been a little in awe of him before, now loved him besides.` },
        image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A gorilla smiling gently as forest animals gather around him fondly.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro smiles softly as the forest animals gather around him with fondness, not fear.', composition: 'Gentle giant among friends.', light: 'Golden forest light.' }) }
    ],
    closing: {
      text: { en: `And from then on, whenever something small and precious needed careful keeping, the forest knew exactly whose gentle hands to trust.` },
      image: 'assets/images/cartoon/gorilla.svg', imageAlt: 'A tiny speckled egg safe in a mossy nest in soft light.',
      imagePrompt: P({ scene: 'End vignette: a tiny speckled egg resting safe in a mossy nest, dappled light around it.', composition: 'Simple still life of the nest.', light: 'Soft warm forest light.' })
    }
  }));
})(window.APP);

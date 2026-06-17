// ─── Panda's Quiet Garden ─────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a garden, like kindness, grows when shared.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    panda: `Bao the panda: a round, calm panda in a soft grey gardening apron, slow-moving and thoughtful, with gentle dark-ringed eyes and a quiet smile.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'panda-garden',
    title:    { en: "Panda's Quiet Garden" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sage', color: '#6b8e5a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['panda'], coverAnimal: 'panda',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/panda.svg',
      imageAlt: 'A panda in a gardening apron tending a green bamboo garden.',
      imagePrompt: P({ cast: [CAST.panda], scene: 'Bao the panda stands proudly in a tidy green garden full of young bamboo, a small watering can in his paw.', composition: 'Panda centred among neat rows of bamboo shoots.', light: 'Soft, fresh morning light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `High on a misty mountain, Bao the panda kept the quietest garden in the world. He grew bamboo in tidy green rows, and he liked it best when everything was still and silent and just so.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda standing among neat rows of bamboo in the mist.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao stands among tidy bamboo rows on a misty mountain terrace, perfectly content in the quiet.', composition: 'Wide calm shot, rows receding into mist.', light: 'Pale misty morning.' }) },
      { id: 2, text: { en: `Every day Bao watered each shoot, brushed each leaf, and sat down to eat his lunch in the hush. "Lovely and quiet," he would sigh. "Just the way I like it."` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda sitting peacefully eating bamboo.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao sits cross-legged munching a bamboo stalk, eyes half-closed in peaceful enjoyment.', composition: 'Cosy close shot of the seated panda.', light: 'Gentle dappled light.' }) },
      { id: 3, text: { en: `But one morning a little wind blew a seed over the wall, and up popped a flower — bright, red, and not at all quiet-looking. Bao frowned. "That does not belong in a tidy garden," he said.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda frowning at a single bright red flower among the bamboo.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao peers down, puzzled, at a single bold red poppy that has sprung up among his orderly bamboo.', composition: 'The red flower pops as the one bright accent.', light: 'Clear morning light.' }) },
      { id: 4, text: { en: `He almost pulled it up. But the flower turned its face to the sun so happily that Bao paused. "Well," he said. "Perhaps just one. For now." And he gave it a little water.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda gently watering a single red flower.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao tips his watering can over the cheerful red flower, his frown softening.', composition: 'Close on the watering, panda leaning in gently.', light: 'Warm soft light.' }) },
      { id: 5, text: { en: `The next day a bee came for the flower. Then a butterfly. Then a small bird to sing in the bamboo. Bao's quiet garden was suddenly full of little sounds — humming and fluttering and tweeting.` },
        image: 'assets/images/cartoon/bee.svg', imageAlt: 'A bee and butterfly visiting a red flower in a bamboo garden.',
        imagePrompt: P({ scene: 'A bee, a butterfly and a small songbird gather around the bright red flower in the green bamboo garden.', composition: 'Lively little creatures arranged around the flower.', light: 'Bright cheerful daylight.' }) },
      { id: 6, text: { en: `At first the noise made Bao fidget. But the bee's hum was soft, and the bird's song was sweet, and the butterfly made no sound at all. Slowly, Bao began to listen instead of frown.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda sitting still, listening, with a small smile.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao sits very still among the bamboo, head tilted, a small new smile growing as he listens to the visitors.', composition: 'Calm close shot, panda listening.', light: 'Warm dappled light.' }) },
      { id: 7, text: { en: `So Bao planted another flower. And another. He left a corner wild for the bees and a pool for the birds. His garden was not so tidy any more — but it was alive, and somehow it felt even more peaceful than before.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda planting flowers among the bamboo, garden now full of colour.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao kneels planting more flowers; his garden is now a happy mix of green bamboo and bright blooms.', composition: 'Wider shot of the flourishing, fuller garden.', light: 'Golden midday light.' }) },
      { id: 8, text: { en: `Word travelled down the mountain, and other animals climbed up to sit a while in Bao's garden. He gave them bamboo tea and a quiet place to rest, and he found he liked the company very much.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda sharing tea with visiting animals in a flowering garden.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao pours bamboo tea for a few gentle visiting animals seated among the flowers.', composition: 'Warm group scene in the garden.', light: 'Soft afternoon light.' }) },
      { id: 9, text: { en: `"I thought quiet meant empty," said Bao one evening, watching the fireflies. "But the best quiet is the kind you share." And he smiled his slow, gentle smile in the warm and gently humming dark.` },
        image: 'assets/images/cartoon/panda.svg', imageAlt: 'A panda watching fireflies in his garden at dusk, content.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao sits contentedly at dusk as fireflies drift over his flowering bamboo garden.', composition: 'Peaceful dusk scene, tiny lights in the air.', light: 'Deep blue dusk with golden firefly glow.' }) }
    ],
    closing: {
      text: { en: `And from then on, the quietest garden in the world was also the most welcoming — which, Bao decided, was the very best kind to keep.` },
      image: 'assets/images/cartoon/panda.svg', imageAlt: 'A watering can resting beside a red flower and a bamboo shoot.',
      imagePrompt: P({ scene: 'End vignette: a small watering can resting beside one red flower and one bamboo shoot in soft evening light.', composition: 'Simple still life.', light: 'Last gentle gold of evening.' })
    }
  }));
})(window.APP);

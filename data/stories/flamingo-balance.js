// ─── The Flamingo Who Wobbled ─────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: everyone wobbles before they find their balance.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    flamingo: `Fizz the flamingo: a tall pink flamingo with long spindly legs and a curved beak, eager and earnest, who wants very much to stand gracefully on one leg like the grown-ups.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'flamingo-balance',
    title:    { en: "The Flamingo Who Wobbled" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'rose', color: '#e08aa0',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['flamingo'], coverAnimal: 'flamingo',
    requirements: [{ animalId: 'flamingo', minCount: 1, label: 'Find the Flamingo' }],
    cover: {
      image: 'assets/images/cartoon/flamingo.svg',
      imageAlt: 'A young pink flamingo wobbling as it tries to stand on one leg in a lagoon.',
      imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz the flamingo teeters on one leg in a calm pink lagoon, wings out for balance.', composition: 'Flamingo mid-wobble, reflection below.', light: 'Soft dawn lagoon light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a wide pink lagoon stood a flock of flamingos, every one of them balanced perfectly on a single slender leg, still as statues. Every one, that is, except young Fizz, who could not manage it at all.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flock of flamingos on one leg, one young one on two.',
        imagePrompt: P({ scene: 'A flock of elegant flamingos stand each on one leg, while one small young flamingo stands awkwardly on two.', composition: 'Row of poised birds, one odd-one-out.', light: 'Calm pink lagoon light.' }) },
      { id: 2, text: { en: `Every time Fizz lifted one leg, he tipped and tilted and toppled with a great pink splash. "How do you do it?" he asked the elders. "Practice," they said serenely, not wobbling in the least. That was no help at all.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A young flamingo splashing into the water after losing balance.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz topples sideways into the lagoon with a splash, legs in the air.', composition: 'Comical tumble, water spraying.', light: 'Bright morning light.' }) },
      { id: 3, text: { en: `Fizz tried in the morning. He tried at noon. He tried until the sun went down, and the only thing he was truly good at was falling over. The other young birds began to giggle, and Fizz felt very small for such a tall bird.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A discouraged flamingo dripping wet as others giggle.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'A dripping, discouraged Fizz stands while other young flamingos giggle nearby.', composition: 'Sad central bird, amused others behind.', light: 'Lowering evening light.' }) },
      { id: 4, text: { en: `An old heron, wise and grey, had been watching from the reeds. "I see you trying to stand still as a stone," she said. "But balance is not stillness. Balance is a thousand tiny movements, too small to see. You must not freeze. You must sway."` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A grey heron speaking to a young flamingo among the reeds.',
        imagePrompt: P({ scene: 'A wise grey heron speaks gently to Fizz the flamingo at the reedy edge of the lagoon.', composition: 'Heron and flamingo in quiet conversation.', light: 'Soft reed-shadow light.' }) },
      { id: 5, text: { en: `"Sway?" said Fizz. "But the others are so still!" "They only look still," said the heron. "Inside, they are forever making little corrections. Stop trying to be a statue. Be a reed in the wind — bend a little, all the time."` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flamingo watching reeds sway gently in the breeze.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz watches the lagoon reeds sway gently, a new idea dawning.', composition: 'Flamingo observing the swaying reeds.', light: 'Gentle breezy light.' }) },
      { id: 6, text: { en: `So Fizz tried again — but this time he did not try to freeze. He lifted one leg and let himself sway, just a little, this way and that, like a reed. His wings made tiny adjustments. His body breathed and shifted.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flamingo swaying gently on one leg, beginning to balance.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz balances on one leg, swaying gently with tiny wing adjustments.', composition: 'Flamingo poised but softly moving.', light: 'Warm steady light.' }) },
      { id: 7, text: { en: `And he stood. One leg up, gently swaying, for one whole minute — then two. He did not topple. He did not splash. He simply stood in the warm water, wobbling ever so slightly, exactly as the heron had said.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flamingo standing successfully on one leg, calm and pleased.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz stands triumphantly on one leg, calm and softly swaying, his reflection clear below.', composition: 'Elegant balanced pose with reflection.', light: 'Warm golden lagoon light.' }) },
      { id: 8, text: { en: `The other young flamingos stopped giggling and stared. "Teach us!" they cried, for many of them, it turned out, had been trying to freeze too. So Fizz, who had wobbled the most, became the one who taught them all to sway.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flamingo teaching other young flamingos to balance.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fizz shows a row of young flamingos how to sway and balance on one leg.', composition: 'Fizz leading, others copying.', light: 'Bright cheerful lagoon light.' }) },
      { id: 9, text: { en: `"I thought wobbling meant I was bad at it," Fizz told the heron that evening. "But wobbling was the whole secret all along." The heron smiled. "It usually is," she said, and stood beside him in the pink and quiet dusk.` },
        image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A flamingo and a heron standing together at dusk in the lagoon.',
        imagePrompt: P({ scene: 'Fizz and the wise heron stand together, both balanced, in the pink dusk lagoon.', composition: 'Two birds side by side, reflections below.', light: 'Soft rosy dusk.' }) }
    ],
    closing: {
      text: { en: `And so the wobbliest flamingo in the lagoon grew up to be the steadiest of all — because he never once forgot to sway.` },
      image: 'assets/images/cartoon/flamingo.svg', imageAlt: 'A single pink feather floating on the still lagoon at dusk.',
      imagePrompt: P({ scene: 'End vignette: a single pink flamingo feather resting on the still, rosy lagoon water.', composition: 'Minimal, calm reflection.', light: 'Last rose-gold of dusk.' })
    }
  }));
})(window.APP);

// ─── The Whale's Lullaby ──────────────────────────────────────────────────────
// Original gentle bedtime tale. ~9 pages. Moral: a gentle song of comfort can
// reach further than you know.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/whale.svg';
  var CAST = {
    whale: `Wendell the whale: an enormous gentle blue whale with kind eyes and a deep, soft, soothing voice that hums through the whole ocean.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'whale-lullaby',
    title:    { en: "The Whale's Lullaby" },
    subtitle: 'an original bedtime tale',
    skin: 'classic', leather: 'navy', board: null, color: '#2f4a6a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['whale'], coverAnimal: 'whale',
    requirements: [{ animalId: 'whale', minCount: 1, label: 'Find the Whale' }],
    cover: {
      image: IMG, imageAlt: 'A great gentle whale singing in the moonlit deep sea.',
      imagePrompt: P({ cast: [CAST.whale], scene: 'Wendell the great whale drifts singing in the deep moonlit sea.', composition: 'Huge whale in the vast dark ocean.', light: 'Cool moonlit underwater blue.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Far down in the deep, dark, gentle sea lived an enormous whale named Wendell, who had the most beautiful, soothing voice in all the ocean. Every night, when the moon rose pale over the waves, Wendell would sing a slow, deep, humming lullaby that drifted through the water for miles and miles.` },
        image: IMG, imageAlt: 'A big whale singing softly in the deep sea at night.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Wendell sings his deep soothing lullaby in the dark, peaceful sea.', composition: 'Whale singing in the deep ocean.', light: 'Soft moonlit blue.' }) },
      { id: 2, text: { en: `And all through the ocean, as Wendell's lullaby reached them, the sea creatures grew sleepy and snug. The little fish nestled into the swaying weeds. The crabs tucked under their cosy rocks. The seahorses curled their tails around the coral. One by one, the whole wide sea drifted gently off to sleep.` },
        image: IMG, imageAlt: 'Sea creatures settling sleepily as the whale\'s song spreads.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Fish, crabs and seahorses settle sleepily as Wendell\'s lullaby drifts through the water.', composition: 'Sleepy sea creatures, song-ripples spreading.', light: 'Dreamy dim blue.' }) },
      { id: 3, text: { en: `But one night, far away near the moonlit surface, a tiny fish named Fin simply could not sleep. He tossed and he turned in his little anemone bed. The water was too wide, the dark was too deep, and his eyes would not stay shut, no matter how hard he tried. "I'll never get to sleep," he sighed.` },
        image: IMG, imageAlt: 'A tiny fish wide awake in an anemone bed at night.',
        imagePrompt: P({ scene: 'A tiny fish lies wide awake and restless in a soft anemone near the moonlit surface.', composition: 'Little sleepless fish in the anemone.', light: 'Pale surface moonlight.' }) },
      { id: 4, text: { en: `Fin was so far up near the surface, you see, that Wendell's lullaby had grown faint and thin by the time it reached him — just a whisper of a hum, too soft to soothe him to sleep. "If only I could hear the whale's song properly," Fin thought. "They say it's the most peaceful sound in all the sea."` },
        image: IMG, imageAlt: 'A small fish straining to hear a faint, distant song.',
        imagePrompt: P({ scene: 'The little fish strains to hear the faint, distant hum of the whale\'s lullaby.', composition: 'Tiny fish listening upward in the dark.', light: 'Faint moonlit blue.' }) },
      { id: 5, text: { en: `So brave little Fin set off down, down, down into the deep, swimming toward the source of the faraway hum. Down past the swaying kelp, down past the sleeping crabs, down through the cool dark water — following the lullaby as it grew, little by little, deeper and warmer and clearer.` },
        image: IMG, imageAlt: 'A tiny fish swimming down into the deep toward the song.',
        imagePrompt: P({ scene: 'The little fish bravely swims down into the deep toward the growing whale-song.', composition: 'Tiny fish descending past kelp and coral.', light: 'Deepening blue, faint glow below.' }) },
      { id: 6, text: { en: `And there, at last, in the deep blue dark, was Wendell himself — vast and gentle and glowing softly in the moonlight that filtered down. His great lullaby surrounded little Fin completely now, deep and warm and soft, wrapping around him like the cosiest of blankets.` },
        image: IMG, imageAlt: 'A tiny fish reaching the great gentle whale in the deep.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Little Fin reaches the vast, gentle Wendell, wrapped in his warm deep song.', composition: 'Tiny fish beside the enormous gentle whale.', light: 'Soft glowing deep blue.' }) },
      { id: 7, text: { en: `"Hello, little one," hummed Wendell, his voice a soft deep rumble. "Can't sleep? Then stay close, and let my song hold you." And Wendell sang just for Fin — a slow, warm, rolling lullaby that filled the whole sea. Fin felt his little eyes grow heavy at last, heavy and warm and wonderfully sleepy.` },
        image: IMG, imageAlt: 'A gentle whale singing softly to a tiny sleepy fish.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Wendell sings a warm lullaby just for the tiny fish, whose eyes grow heavy.', composition: 'Whale and sleepy little fish together.', light: 'Warm dreamy deep glow.' }) },
      { id: 8, text: { en: `"Sleep now, little Fin," Wendell hummed, ever so softly. "The sea is wide, but you are safe. The dark is deep, but you are held. Close your eyes, and drift, and dream..." And cradled in the great whale's gentle song, little Fin's eyes drifted shut, and he fell fast, fast asleep.` },
        image: IMG, imageAlt: 'A tiny fish falling asleep beside the gentle whale.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Little Fin drifts fast asleep, cradled by Wendell\'s gentle lullaby.', composition: 'Sleeping fish nestled by the whale.', light: 'Soft peaceful glow.' }) },
      { id: 9, text: { en: `Wendell carried the sleeping little fish gently back up to his anemone bed, and tucked him in, and hummed on through the night. And from then on, whenever Fin couldn't sleep, he had only to close his eyes and remember the whale's warm song — and off to dreamland he would softly, sweetly go.` },
        image: IMG, imageAlt: 'A whale tucking a sleeping fish back into its anemone bed.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Wendell gently returns the sleeping Fin to his cosy anemone bed.', composition: 'Whale tucking in the tiny sleeping fish.', light: 'Tender moonlit blue.' }) }
    ],
    closing: {
      text: { en: `So when the night is dark and sleep won't come, listen softly — somewhere out in the deep, a gentle song is humming, just for you. Sleep now, and dream.` },
      image: IMG, imageAlt: 'A calm moonlit sea, still and peaceful at night.',
      imagePrompt: P({ scene: 'End vignette: a calm, still, moonlit sea, peaceful and quiet at night.', composition: 'Simple serene moonlit seascape.', light: 'Tranquil silver moonlight.' })
    }
  }));
})(window.APP);

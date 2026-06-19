// ─── Pippin's First Night ─────────────────────────────────────────────────────
// Original gentle bedtime tale. ~9 pages. Moral: the dark is full of wonders.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/bat.svg';
  var CAST = {
    bat: `Pippin the bat: a tiny soft grey-violet bat with big round eyes, neat little ears and velvety wings; shy and gentle, clinging to a branch upside-down.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'little-bat-night',
    title:    { en: "Pippin's First Night" },
    subtitle: 'an original bedtime tale',
    skin: 'classic', leather: 'midnight', board: null, color: '#3a3454',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['bat'], coverAnimal: 'bat',
    requirements: [{ animalId: 'bat', minCount: 1, label: 'Find the Bat' }],
    cover: {
      image: IMG, imageAlt: 'A tiny bat peeping out at a starry night sky from a tree hollow.',
      imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin the bat peeps shyly from a cosy tree hollow out at a vast starry night.', composition: 'Small bat framed in a round hollow, stars beyond.', light: 'Deep blue night with soft star glow.' })
    },
    paragraphs: [
      { id: 1, text: { en: `High in the old oak tree, in a snug little hollow, lived a tiny bat named Pippin. All day he slept hanging upside-down beside his mother, wrapped in his velvet wings. But Pippin had never once flown out into the night, for the dark world outside seemed terribly big.` },
        image: IMG, imageAlt: 'A small bat hanging upside-down asleep in a tree hollow.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin sleeps upside-down beside his mother, wrapped in his wings, inside a cosy hollow.', composition: 'Two bats snug in a tree hollow.', light: 'Dim warm daytime gloom.' }) },
      { id: 2, text: { en: `"Tonight is the night, little one," said his mother gently, as the sky turned from gold to deep blue. "It is time for your very first flight." Pippin peeped out at the great dark sky and shivered. "But it's so dark out there, Mama," he whispered. "I'm frightened."` },
        image: IMG, imageAlt: 'A mother bat nudging a nervous little bat toward the night sky.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'The mother bat gently nudges a nervous Pippin toward the mouth of the hollow at dusk.', composition: 'Mother encouraging, little bat hesitant.', light: 'Twilight blue settling in.' }) },
      { id: 3, text: { en: `"The dark is not empty, Pippin," said his mother. "It is full of wonderful things, waiting just for us. Spread your wings and trust them. I will be right beside you the whole way." And so, with a deep breath and a tremble, little Pippin let go of his branch.` },
        image: IMG, imageAlt: 'A little bat spreading its wings to fly for the first time.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin spreads his velvet wings and drops into his first flight, mother close behind.', composition: 'Bat tipping into the open air.', light: 'Soft moonlight breaking through.' }) },
      { id: 4, text: { en: `Down he swooped, then up — and oh! His wings caught the cool air and held him. He was flying! The fear melted away into a giggle. Below him the moon lay silver on the pond, and the whole quiet world glittered in a way he had never, ever seen by day.` },
        image: IMG, imageAlt: 'A bat flying joyfully over a moonlit pond.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin swoops joyfully over a moonlit pond, the moon mirrored in the water.', composition: 'Bat aloft, silver pond below.', light: 'Bright silvery moonlight.' }) },
      { id: 5, text: { en: `His mother showed him how to listen — how a bat can hear the night the way others see the day. Click, click went Pippin's tiny voice, and back came the shape of every twig and moth and branch. The dark was not blind at all; it sang back to him.` },
        image: IMG, imageAlt: 'A bat sending out little sound-clicks among the trees at night.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin clicks softly and ripples of sound show him the moths and branches in the dark.', composition: 'Bat among trees, gentle sound ripples.', light: 'Dappled moonlight through leaves.' }) },
      { id: 6, text: { en: `They flew past the sleeping flowers that only open at night, white and sweet-smelling. They flew through a drifting cloud of fireflies that blinked like tiny lanterns. "I had no idea," breathed Pippin, "that the night could be so beautiful."` },
        image: IMG, imageAlt: 'A bat flying among glowing fireflies and night flowers.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin flits through a drift of fireflies past pale night-blooming flowers.', composition: 'Bat amid glowing specks and white blooms.', light: 'Dark blue with firefly sparkle.' }) },
      { id: 7, text: { en: `A soft hoot made Pippin jump — but it was only a kindly old owl, who dipped her wing in greeting. "Welcome to the night, little flyer," she called. Pippin waved a wing back, and felt very brave indeed to have a friend of the dark.` },
        image: IMG, imageAlt: 'A bat greeting a friendly owl in the moonlight.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'A kindly owl dips a wing in greeting to the little bat in the moonlight.', composition: 'Bat and owl passing in flight.', light: 'Calm moonlit sky.' }) },
      { id: 8, text: { en: `At last, as the sky began to pale at its edges, his mother turned for home. "You were so brave tonight," she said. Pippin yawned a happy yawn. "I wasn't brave at the start," he admitted. "But you were beside me, and that made the dark feel friendly."` },
        image: IMG, imageAlt: 'A mother and baby bat flying home as the sky begins to lighten.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'The two bats wheel toward home as the eastern sky just begins to pale.', composition: 'Bats heading to the oak, dawn edge glowing.', light: 'Pre-dawn blue with a thread of pink.' }) },
      { id: 9, text: { en: `Back in the snug hollow, Pippin wrapped himself in his wings beside his mother, warm and sleepy and proud. He was not frightened of the dark any more. For now he knew a secret: the night was not something to fear — it was simply his to explore.` },
        image: IMG, imageAlt: 'A contented little bat settling to sleep in a tree hollow at dawn.',
        imagePrompt: P({ cast: [CAST.bat], scene: 'Pippin settles contentedly to sleep beside his mother as dawn light touches the hollow.', composition: 'Two bats snug, soft dawn at the opening.', light: 'Gentle early-morning glow.' }) }
    ],
    closing: {
      text: { en: `So if ever the dark seems big and frightening, remember little Pippin — and that the bravest thing of all is simply to spread your wings and look.` },
      image: IMG, imageAlt: 'A single star shining over a quiet sleeping tree.',
      imagePrompt: P({ scene: 'End vignette: one bright star shining softly over the quiet sleeping oak.', composition: 'Simple, a tree and a single star.', light: 'Tranquil deep-blue night.' })
    }
  }));
})(window.APP);

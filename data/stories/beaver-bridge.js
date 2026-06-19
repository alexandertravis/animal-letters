// ─── Beaver Builds a Bridge ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: helping others is the best use of a gift.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/beaver.svg';
  var CAST = {
    beaver: `Bella the beaver: a sturdy brown beaver with a broad flat tail, two big front teeth and busy capable paws, always carrying a twig or two.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'beaver-bridge',
    title:    { en: "Beaver Builds a Bridge" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'tan', board: null, color: '#b58a4a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['beaver'], coverAnimal: 'beaver',
    requirements: [{ animalId: 'beaver', minCount: 1, label: 'Find the Beaver' }],
    cover: {
      image: IMG, imageAlt: 'A busy beaver carrying a branch beside a river.',
      imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella the beaver carries a branch along the bank of a wide rushing river.', composition: 'Beaver at work by the riverside.', light: 'Bright busy daylight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Beside a wide, rushing river lived a beaver named Bella, who was the best builder for miles around. With her strong teeth and her busy paws, she could turn a heap of branches into something sturdy and clever in no time at all. Building was the thing she loved most in the world.` },
        image: IMG, imageAlt: 'A beaver building with branches by the river.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella busily weaves branches together into a sturdy structure by the river.', composition: 'Beaver mid-build, branches all around.', light: 'Warm working light.' }) },
      { id: 2, text: { en: `Now the river was wide and the water ran fast, and it cut the wood neatly in two. The animals on the near bank could not visit their friends on the far bank, nor reach the fine berry patches over there, for the only way across was to swim — and many of them could not swim at all.` },
        image: IMG, imageAlt: 'Animals on one riverbank looking longingly across fast water.',
        imagePrompt: P({ scene: 'Small animals on a riverbank gaze longingly across the fast, wide water.', composition: 'Animals at the water\'s edge, far bank beyond.', light: 'Bright daylight on rushing water.' }) },
      { id: 3, text: { en: `One morning a little hedgehog stood weeping at the water's edge. "My grandmother lives across the river," he sobbed, "and I cannot get to her. The water is far too deep and fast, and I cannot swim a stroke." Bella's kind heart ached at the sight. "Don't cry," she said. "I think I can help."` },
        image: IMG, imageAlt: 'A beaver comforting a weeping hedgehog by the river.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella comforts a weeping little hedgehog at the rushing water\'s edge.', composition: 'Beaver and tearful hedgehog by the river.', light: 'Soft caring light.' }) },
      { id: 4, text: { en: `Bella looked at the wide river, and then at her own clever paws, and an idea began to build itself in her mind. "I cannot make the river smaller," she said, "but I can build a way over it. I shall build a bridge — a strong, safe bridge that anyone at all can cross."` },
        image: IMG, imageAlt: 'A beaver looking thoughtfully across the river, planning a bridge.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella studies the wide river, picturing the bridge she will build across it.', composition: 'Beaver planning, river stretching across.', light: 'Clear bright daylight.' }) },
      { id: 5, text: { en: `So Bella set to work. She gnawed down slim strong saplings — gnaw, gnaw, gnaw — and dragged them to the bank. She laid the longest ones across the narrowest part, and wove smaller branches between, working from dawn till dusk, day after day, never once grumbling.` },
        image: IMG, imageAlt: 'A beaver laying branches to build a bridge across a river.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella lays and weaves branches steadily across the river, building her bridge.', composition: 'Beaver mid-construction over the water.', light: 'Long working daylight.' }) },
      { id: 6, text: { en: `It was hard work, and slow, and her paws grew tired. Some animals doubted her. "It's too wide, Bella," they said. "You'll never reach the other side." But Bella only smiled and laid the next branch, and the next, for she knew a bridge is built not all at once, but one branch at a time.` },
        image: IMG, imageAlt: 'A determined beaver building a bridge halfway across the river.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella works on, her half-built bridge reaching bravely out across the water.', composition: 'Bridge stretching halfway, beaver determined.', light: 'Steady afternoon light.' }) },
      { id: 7, text: { en: `And then, one golden evening, Bella laid the very last branch — and her bridge reached all the way across at last, strong and sturdy and snug. She tested it with her own weight, paw by paw, until she was quite, quite sure that it was perfectly safe for everyone.` },
        image: IMG, imageAlt: 'A beaver standing proudly on a finished bridge across the river.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Bella stands proudly on her finished bridge, spanning the whole river.', composition: 'Completed bridge, beaver testing it.', light: 'Warm golden evening.' }) },
      { id: 8, text: { en: `The little hedgehog was the very first to cross. Trembling at first, then faster, he pattered all the way over the bridge and into the waiting arms of his grandmother on the far side. "Thank you, Bella!" he called back, beaming, as the two hugged tight.` },
        image: IMG, imageAlt: 'A hedgehog crossing a bridge to hug his grandmother.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'The little hedgehog scampers across the bridge into his grandmother\'s waiting hug.', composition: 'Hedgehog crossing, joyful reunion beyond.', light: 'Warm joyful light.' }) },
      { id: 9, text: { en: `Soon the whole wood was using Bella's bridge — friends visiting friends, families sharing berries, everyone coming and going freely between the two banks at last. Bella had built many fine things in her time, but none, she thought happily, half so fine as a bridge that brought everyone together.` },
        image: IMG, imageAlt: 'Many animals happily crossing a beaver-built bridge.',
        imagePrompt: P({ cast: [CAST.beaver], scene: 'Many animals come and go happily across Bella\'s bridge, friends reunited.', composition: 'Busy bridge full of crossing animals.', light: 'Bright cheerful daylight.' }) }
    ],
    closing: {
      text: { en: `For the finest thing you can ever build with a gift like Bella's is not a thing for yourself at all — but a way to bring others together.` },
      image: IMG, imageAlt: 'A sturdy little branch bridge over a calm river at dusk.',
      imagePrompt: P({ scene: 'End vignette: a sturdy little branch bridge arching over a calm river at dusk.', composition: 'Simple bridge over quiet water.', light: 'Soft dusk reflection.' })
    }
  }));
})(window.APP);

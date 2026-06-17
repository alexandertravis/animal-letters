// ─── The Whale and the Little Fish ────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: the biggest and smallest can help each other.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    whale: `Wally the whale: an enormous, gentle blue whale with kind half-moon eyes and a slow, rumbling, friendly voice. Vast but never frightening.`,
    fish:  `Finn the little fish: a tiny silver fish with a bright orange fin, quick and chatty and brave for his size.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'whale-little-fish',
    title:    { en: "The Whale and the Little Fish" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sky', color: '#3f7fb0',
    wordCount: 440, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['whale', 'fish'], coverAnimal: 'whale',
    requirements: [{ animalId: 'whale', minCount: 1, label: 'Find the Whale' }],
    cover: {
      image: 'assets/images/cartoon/whale.svg',
      imageAlt: 'An enormous blue whale swimming beside one tiny silver fish in the deep sea.',
      imagePrompt: P({ cast: [CAST.whale, CAST.fish], scene: 'The vast gentle whale glides through blue water beside one tiny silver fish.', composition: 'Huge whale filling most of the frame, tiny fish for scale.', light: 'Soft underwater light from above.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Wally was the biggest creature in the whole wide ocean. When he sang, the water hummed for miles. When he swam, the little waves rolled out behind him all the way to shore.` },
        image: 'assets/images/cartoon/whale.svg', imageAlt: 'An enormous whale swimming through the open ocean.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Wally the whale glides slowly through the wide open ocean, vast and calm.', composition: 'Whale spanning the frame in deep blue water.', light: 'Dappled light shafts from the surface.' }) },
      { id: 2, text: { en: `Finn was just about the smallest. He was a tiny silver fish with one bright orange fin, and he darted about asking everyone a hundred questions a day. One morning he darted right up to Wally's enormous eye.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'A tiny silver fish hovering by the huge eye of a whale.',
        imagePrompt: P({ cast: [CAST.fish, CAST.whale], scene: 'Tiny Finn hovers right beside Wally\'s great half-moon eye, asking a question.', composition: 'Extreme scale contrast: small fish, vast eye.', light: 'Soft blue underwater glow.' }) },
      { id: 3, text: { en: `"Hello!" said Finn. "You're VERY big. Aren't you ever lonely, all the way up here at the top of being big?" Wally rumbled a slow, kind laugh. "Sometimes," he admitted. "The big ones don't always have small friends."` },
        image: 'assets/images/cartoon/whale.svg', imageAlt: 'A whale smiling gently down at a tiny fish.',
        imagePrompt: P({ cast: [CAST.whale, CAST.fish], scene: 'Wally smiles gently as little Finn chatters by his cheek.', composition: 'Whale\'s smiling face, tiny fish beside it.', light: 'Warm filtered light.' }) },
      { id: 4, text: { en: `So Finn decided to be Wally's small friend. He swam in loops around the whale's great fins and told him every bit of news from the reef — who had hatched, who had hidden, and where the warm currents ran.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'A tiny fish swimming in loops around a whale, chattering.',
        imagePrompt: P({ cast: [CAST.fish, CAST.whale], scene: 'Finn loops playfully around Wally\'s broad fin, full of reef news.', composition: 'Fish tracing a bright spiral against the whale\'s side.', light: 'Bright shallow-sea light.' }) },
      { id: 5, text: { en: `One day a great storm churned the sea and tangled a fishing net around the rocks. A whole shoal of little fish was trapped inside, frightened and unable to find the way out.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'A shoal of small fish trapped behind a net among rocks.',
        imagePrompt: P({ scene: 'A shoal of small frightened fish is caught behind a tangled net among dark storm-stirred rocks.', composition: 'Net across the frame, anxious fish behind.', light: 'Dim greenish stormy water.' }) },
      { id: 6, text: { en: `Finn was small enough to slip through the net, but far too small to break it. "I know who can help," he said, and he swam faster than he ever had, all the way out to the deep where Wally was singing.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'A tiny fish racing through the open water as fast as it can.',
        imagePrompt: P({ cast: [CAST.fish], scene: 'Finn streaks through open water at top speed, orange fin flashing, on an urgent errand.', composition: 'Fish racing across a wide blue frame, motion trailing.', light: 'Open-sea blue light.' }) },
      { id: 7, text: { en: `Wally came at once. He was far too big to fit among the rocks — but he was strong. Gently, carefully, he took the edge of the net in his great mouth and pulled. The net slid free of the rocks.` },
        image: 'assets/images/cartoon/whale.svg', imageAlt: 'A huge whale gently pulling a net free from the rocks.',
        imagePrompt: P({ cast: [CAST.whale], scene: 'Wally takes the edge of the tangled net carefully in his mouth and draws it gently off the rocks.', composition: 'Whale\'s great effort, net coming loose.', light: 'Stormy light clearing a little.' }) },
      { id: 8, text: { en: `Then Finn darted in and out, in and out, showing the freed shoal the way through the loosened net to open water. The big one and the small one had done together what neither could do alone.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'Small fish escaping through a loosened net to open water.',
        imagePrompt: P({ cast: [CAST.fish], scene: 'Finn leads the freed shoal out through the loosened net into bright open water.', composition: 'A stream of little fish flowing free, Finn at the front.', light: 'Brightening hopeful light.' }) },
      { id: 9, text: { en: `That evening Wally sang his deepest, happiest song, and all the little fish of the reef came to listen, with Finn proudest of all in the front. The biggest creature in the ocean was not lonely any more.` },
        image: 'assets/images/cartoon/whale.svg', imageAlt: 'A whale singing while many small fish gather to listen at dusk.',
        imagePrompt: P({ cast: [CAST.whale, CAST.fish], scene: 'Wally sings while a crowd of little fish, Finn at the front, gathers to listen in the dusky sea.', composition: 'Whale large, a cloud of small fish around him.', light: 'Deep blue evening sea, soft glow.' }) }
    ],
    closing: {
      text: { en: `And from then on, wherever the great whale went, one tiny silver fish with a bright orange fin was never far behind.` },
      image: 'assets/images/cartoon/fish.svg', imageAlt: 'A tiny orange-finned fish and a whale-shaped shadow in calm water.',
      imagePrompt: P({ scene: 'End vignette: calm blue water with a tiny orange-finned fish near a vast soft whale-shaped shadow.', composition: 'Minimal, peaceful, scale contrast.', light: 'Calm twilight underwater glow.' })
    }
  }));
})(window.APP);

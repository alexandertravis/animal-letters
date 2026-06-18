// ─── The Shark Who Smiled ─────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: don't judge a friend by how they look.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    shark: `Sherman the shark: a sleek grey reef shark with a big toothy smile that frightens everyone, though he is friendly, lonely, and longs only for someone to play with.`,
    fish:  `Pearl the pufferfish: a small round spotted pufferfish, bubbly and brave, who puffs up when startled but has a very big heart.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'shark-smile',
    title:    { en: "The Shark Who Smiled" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sky', color: '#4a7088',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['shark', 'fish'], coverAnimal: 'shark',
    requirements: [{ animalId: 'shark', minCount: 1, label: 'Find the Shark' }],
    cover: {
      image: 'assets/images/cartoon/shark.svg',
      imageAlt: 'A friendly grey shark with a big smile swimming hopefully among colourful reef fish.',
      imagePrompt: P({ cast: [CAST.shark], scene: 'Sherman the shark swims hopefully among a colourful reef, smiling a wide toothy smile.', composition: 'Shark approaching a bright reef, fish scattering.', light: 'Bright tropical underwater light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Sherman the shark only wanted a friend. But every time he swam up to the bright reef with a hopeful smile, all the little fish took one look at his rows of teeth and shot away into the coral, quick as quick.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A smiling shark as reef fish dart away into coral.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'Sherman smiles hopefully as the reef fish dart away into the coral.', composition: 'Shark approaching, fish fleeing.', light: 'Bright reef light.' }) },
      { id: 2, text: { en: `"It's the teeth," Sherman sighed, drifting away alone into the blue. "Nobody waits long enough to find out I'm friendly." Day after day he swam by himself, watching the others play their games from far away.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A lonely shark drifting alone in the open blue.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'Sherman drifts alone in the empty blue, watching distant fish play.', composition: 'Lone shark in vast open water.', light: 'Cool lonely blue light.' }) },
      { id: 3, text: { en: `One day a small pufferfish named Pearl got swept far from the reef by a strong current, out into the deep blue where the big creatures roamed. She was frightened, and the more frightened she got, the bigger she puffed.` },
        image: 'assets/images/cartoon/fish.svg', imageAlt: 'A small puffed-up pufferfish lost in the open sea.',
        imagePrompt: P({ scene: 'A small spotted pufferfish, puffed round with fright, drifts lost in the open blue.', composition: 'Tiny round fish in big empty water.', light: 'Open-sea blue light.' }) },
      { id: 4, text: { en: `Sherman saw her — and so did a snappish eel, sliding out of the dark with hungry eyes. The eel darted at Pearl. But quick as a flash, Sherman swam between them, and with one flick of his powerful tail, sent the eel slinking away.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A shark swimming protectively in front of a small pufferfish.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'Sherman swims boldly between the frightened pufferfish and a retreating eel.', composition: 'Shark shielding the small fish.', light: 'Tense deep-blue light.' }) },
      { id: 5, text: { en: `Pearl, still puffed and shaking, was sure the shark would gobble her next. But Sherman just smiled his big toothy smile — gently — and said, "Don't be afraid, little one. I won't hurt you. You're a long way from home. Let me take you back."` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A shark smiling gently at a frightened puffed-up fish.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'Sherman smiles gently at the puffed, frightened Pearl, reassuring her.', composition: 'Shark and tiny puffed fish, close.', light: 'Soft blue light.' }) },
      { id: 6, text: { en: `His voice was so kind that Pearl slowly, slowly began to deflate. She climbed onto his broad nose, and Sherman swam her carefully all the way back across the deep, telling cheerful jokes the whole way to keep her brave.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A pufferfish riding on a shark’s nose across the sea.',
        imagePrompt: P({ cast: [CAST.shark, CAST.fish], scene: 'A calmed Pearl rides on Sherman\'s broad nose as he swims her home, chatting cheerfully.', composition: 'Shark with tiny passenger on his nose.', light: 'Warming blue light.' }) },
      { id: 7, text: { en: `When they reached the reef, all the little fish gasped to see Pearl riding safely on the dreaded shark. "He saved me!" Pearl announced proudly. "From an eel! And he tells wonderful jokes! He's the kindest fish in the whole sea!"` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'Reef fish amazed to see a pufferfish safe with the shark.',
        imagePrompt: P({ cast: [CAST.shark, CAST.fish], scene: 'The reef fish gather in amazement as Pearl proudly introduces her shark rescuer.', composition: 'Shark and Pearl, astonished reef fish around.', light: 'Bright reef light.' }) },
      { id: 8, text: { en: `Slowly, one by one, the little fish came closer. They saw, behind the big toothy smile, the gentle, lonely, friendly shark who had been there all along. And then — at last — they asked him to join their games.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A shark playing happily with reef fish at last.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'The reef fish gather close and invite a delighted Sherman to play their games.', composition: 'Shark joyfully among accepting fish.', light: 'Bright happy reef light.' }) },
      { id: 9, text: { en: `Sherman was never lonely again. He played hide-and-seek through the coral and gave the littlest fish rides on his back. "You just have to look past my smile," he said happily. And now, everyone did.` },
        image: 'assets/images/cartoon/shark.svg', imageAlt: 'A happy shark giving little fish rides through the coral.',
        imagePrompt: P({ cast: [CAST.shark], scene: 'A joyful Sherman gives little reef fish rides through the bright coral.', composition: 'Playful shark surrounded by happy fish.', light: 'Warm sunlit reef.' }) }
    ],
    closing: {
      text: { en: `And the little fish of the reef learned the truest lesson of the sea: you must never judge a friend by how they look — only by the kindness in their heart.` },
      image: 'assets/images/cartoon/shark.svg', imageAlt: 'A bright coral reef glowing in the warm sunlit sea.',
      imagePrompt: P({ scene: 'End vignette: a bright, peaceful coral reef glowing softly in warm sunlit water.', composition: 'Calm reef still life, no characters.', light: 'Warm gentle underwater light.' })
    }
  }));
})(window.APP);

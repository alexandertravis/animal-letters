// ─── The Deer and the First Snow ──────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: new things are less frightening when shared.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    deer: `Dilly the deer: a young fawn with soft dappled fur and big curious eyes, new to the world and a little timid about everything she has never seen before.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'deer-first-snow',
    title:    { en: "The Deer and the First Snow" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sky', color: '#9fb3c4',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['deer'], coverAnimal: 'deer',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/deer.svg',
      imageAlt: 'A young dappled fawn looking up in wonder at falling snowflakes.',
      imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly the fawn gazes up in wonder as the first soft snowflakes fall around her.', composition: 'Fawn looking up, snow drifting down.', light: 'Soft pale winter light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Dilly the fawn had been born in the spring, and she had seen many wonderful things since — green leaves, summer rain, the gold of autumn. But she had never, ever seen snow.` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A young fawn standing in an autumn wood.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly the fawn stands amid the last golden leaves of autumn, curious and young.', composition: 'Fawn in a wood of falling leaves.', light: 'Soft autumn light.' }) },
      { id: 2, text: { en: `One grey morning, the world went very quiet. Then, from the heavy sky, white flakes began to drift down — slowly at first, then thicker and thicker. Dilly froze. "What IS it?" she whispered, trembling. "Is it falling stars? Is it dangerous?"` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A fawn standing very still, alarmed at the first falling snow.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly freezes, trembling, as thick white flakes begin to fall from a grey sky.', composition: 'Still anxious fawn, snow thickening.', light: 'Flat grey snow-light.' }) },
      { id: 3, text: { en: `She wanted to run and hide. But her mother stepped close and pressed warm against her side. "Hush, little one," she said gently. "This is snow. It is new to you, but it is not to be feared. Watch with me a while."` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A mother deer comforting a frightened fawn in the snow.',
        imagePrompt: P({ scene: 'A gentle mother deer presses warmly against the frightened fawn as snow falls around them.', composition: 'Two deer close together, snow drifting.', light: 'Soft grey-white light.' }) },
      { id: 4, text: { en: `So Dilly watched. A single flake landed on her black nose — cold, and light, and gone in a blink. Another caught on her eyelash. They did not bite. They did not roar. They only drifted, soft and silent, like falling feathers.` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A snowflake landing on a fawn’s nose.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'A single snowflake lands on Dilly\'s black nose; she goes cross-eyed looking at it.', composition: 'Close on the fawn\'s nose and flake.', light: 'Soft pale light.' }) },
      { id: 5, text: { en: `Slowly, Dilly's fear melted away. She took one careful step. The snow crunched softly under her hoof, leaving a perfect little print. She took another, and another, and a small thrill of delight ran all the way to her tail.` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A fawn stepping carefully into fresh snow, leaving prints.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly takes careful first steps in the fresh snow, leaving neat little hoofprints.', composition: 'Fawn mid-step, trail of prints.', light: 'Bright fresh snow-light.' }) },
      { id: 6, text: { en: `Soon she was leaping and twirling, kicking up little clouds of white. She caught flakes on her tongue. She made a tangle of looping prints all across the meadow. The thing she had feared had become the best game she had ever played.` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A fawn leaping joyfully through the snow.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly leaps and twirls joyfully through the falling snow, kicking up white clouds.', composition: 'Dynamic happy leap, snow flying.', light: 'Bright sparkling snow.' }) },
      { id: 7, text: { en: `The whole wood was changed — soft and white and hushed and beautiful, every branch lined with sugar. "I almost ran away from all this," said Dilly, amazed. "I almost missed the most beautiful day of my life."` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A fawn gazing at a snow-covered wood, branches white.',
        imagePrompt: P({ cast: [CAST.deer], scene: 'Dilly gazes in wonder at the hushed, snow-covered wood, every branch lined white.', composition: 'Fawn small in a vast white wood.', light: 'Soft bright winter light.' }) },
      { id: 8, text: { en: `"New things often look frightening at first," said her mother, nuzzling her. "That is why it helps to face them with someone you love. The fear passes — and very often, the wonder stays."` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A mother deer and fawn nuzzling in the snowy wood.',
        imagePrompt: P({ scene: 'The mother deer nuzzles the happy fawn in the gently falling snow.', composition: 'Tender pair, snow around them.', light: 'Soft warm-grey light.' }) },
      { id: 9, text: { en: `That evening they bedded down together, warm in the soft snow, and Dilly watched the last flakes spin down through the dusk. She was not afraid any more. She could hardly wait for the morning, and all the white wonder of it.` },
        image: 'assets/images/cartoon/deer.svg', imageAlt: 'A fawn and mother resting together in the snow at dusk.',
        imagePrompt: P({ scene: 'Dilly and her mother bed down together in the soft snow as dusk falls.', composition: 'Two deer resting, snowy dusk.', light: 'Cool blue dusk with soft glow.' }) }
    ],
    closing: {
      text: { en: `And every winter after, when the first snow came drifting down, Dilly would lift her face to the sky — not in fear, but in joy.` },
      image: 'assets/images/cartoon/deer.svg', imageAlt: 'A single small hoofprint in fresh snow.',
      imagePrompt: P({ scene: 'End vignette: a single small hoofprint in smooth fresh snow, a flake or two settling near it.', composition: 'Minimal print in white.', light: 'Soft pale winter light.' })
    }
  }));
})(window.APP);

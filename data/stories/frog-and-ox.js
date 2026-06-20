// ─── The Frog and the Ox ──────────────────────────────────────────────────────
// Gentle retelling of the Aesop fable. ~9 pages. Moral: be happy as you are; do not
// puff yourself up trying to be something you're not. (Kindly — the frog deflates,
// no harm done.)
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/frog.svg';
  var CAST = {
    frog: `Freddie the frog: a small bright-green pond frog with big round eyes and a wide grin; spirited and a touch boastful.`,
    ox: `the great ox: an enormous calm toffee-brown ox with broad shoulders and gentle eyes.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'frog-and-ox',
    title:    { en: "The Frog and the Ox" },
    subtitle: 'after Aesop',
    skin: 'classic', leather: 'leaf', board: null, color: '#4f7a3a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['frog', 'ox'], coverAnimal: 'frog',
    requirements: [{ animalId: 'frog', minCount: 1, label: 'Find the Frog' }],
    cover: {
      image: IMG, imageAlt: 'A small green frog puffing himself up beside a huge ox.',
      imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie the frog puffs himself up proudly on a lily pad beside a vast calm ox.', composition: 'Tiny puffed frog, enormous ox behind.', light: 'Bright pondside light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `By the edge of a sunny pond lived a little green frog named Freddie, who was rather pleased with himself. He could leap the furthest, croak the loudest, and catch the most flies of any frog on the lily pads, and he liked everyone to know it. "I am quite the grandest frog around," he often said.` },
        image: IMG, imageAlt: 'A proud little frog on a lily pad by a pond.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie sits proudly on a lily pad, pleased with himself.', composition: 'Frog centre on a lily pad.', light: 'Sunny pondside light.' }) },
      { id: 2, text: { en: `One morning, a great ox came down to the pond to drink. He was ENORMOUS — as big as a barn, it seemed to Freddie — with broad shoulders and a deep rumbling moo, and when he lowered his huge head to the water, his shadow fell right across the whole lily pad.` },
        image: IMG, imageAlt: 'A huge ox lowering his head to drink at the pond.',
        imagePrompt: P({ cast: [CAST.frog, CAST.ox], scene: 'A great ox lowers his huge head to drink, his shadow falling over Freddie\'s lily pad.', composition: 'Enormous ox, tiny frog below.', light: 'Bright morning, long shadow.' }) },
      { id: 3, text: { en: `The other frogs stared up at the ox in wonder. "Have you ever seen anything so BIG?" they gasped. This nettled Freddie's pride more than a little. "Big?" he scoffed. "He's not so very big. Why, I could puff myself up just as big as that, if I cared to. Just watch me!"` },
        image: IMG, imageAlt: 'A frog boasting to other frogs beside the ox.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie scoffs and boasts to the other amazed frogs that he could be as big as the ox.', composition: 'Boastful frog, frogs listening, ox beyond.', light: 'Clear daylight.' }) },
      { id: 4, text: { en: `So Freddie took a great deep breath and puffed himself up — bigger, and bigger, and BIGGER. His little green sides swelled out like a balloon. "There!" he wheezed. "Am I as big as the ox yet?" "Not nearly," said the other frogs. "You're only the size of a teacup."` },
        image: IMG, imageAlt: 'A frog puffing himself up bigger and bigger.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie puffs his sides out round as a balloon, straining to grow.', composition: 'Puffed-up frog, doubtful frogs around.', light: 'Bright light.' }) },
      { id: 5, text: { en: `Freddie huffed and puffed himself up even more, until he was round as an apple and quite red in the face. "NOW am I as big as the ox?" he squeaked. "Not even close," said the frogs. "You're about the size of a turnip. The ox is as big as a HOUSE, Freddie."` },
        image: IMG, imageAlt: 'A frog puffed up round as an apple, straining.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie puffs up round as an apple, red-faced and straining hard.', composition: 'Over-puffed frog, calm huge ox behind.', light: 'Bright daylight.' }) },
      { id: 6, text: { en: `Determined not to be beaten, Freddie sucked in one more enormous breath and puffed with all his might — when all at once, PFFFFT! — out rushed all the air in a great rude raspberry, and Freddie deflated like a popped bubble, flopping back down to his own small frog size with a comical squeak.` },
        image: IMG, imageAlt: 'A frog deflating with a puff after over-puffing.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie deflates with a comical puff, flopping back to his ordinary small size.', composition: 'Deflated, dizzy little frog.', light: 'Bright comic light.' }) },
      { id: 7, text: { en: `Freddie sat on his lily pad, dizzy and breathless and a little bit silly, no bigger than he had ever been. The great ox, who had been quietly watching, gave a deep, gentle chuckle. "Little frog," he rumbled kindly, "why ever would you want to be an ox? The world has plenty of oxen already."` },
        image: IMG, imageAlt: 'A gentle ox chuckling kindly at the dizzy little frog.',
        imagePrompt: P({ cast: [CAST.frog, CAST.ox], scene: 'The great ox chuckles kindly down at the dizzy little frog on his pad.', composition: 'Big gentle ox, small sheepish frog.', light: 'Warm friendly light.' }) },
      { id: 8, text: { en: `"But there is only one of YOU," the ox went on. "Only one frog who can leap so far and croak so loud and catch so many flies. That is a fine and special thing to be — far better than a poor puffed-up copy of somebody else." Freddie's cheeks went pink, this time with a sheepish little smile.` },
        image: IMG, imageAlt: 'A wise ox encouraging a sheepish smiling frog.',
        imagePrompt: P({ cast: [CAST.frog, CAST.ox], scene: 'The ox gently encourages the frog, who smiles sheepishly up at him.', composition: 'Ox and frog, kindly moment.', light: 'Soft warm light.' }) },
      { id: 9, text: { en: `"You're quite right," laughed Freddie, and he gave a happy little hop. "I'm a much better frog than I'd ever be an ox!" And from then on he was proud of being exactly what he was — the grandest leaping, loudest croaking, fly-catchingest little green frog on the whole sunny pond.` },
        image: IMG, imageAlt: 'A happy frog leaping joyfully on his lily pad.',
        imagePrompt: P({ cast: [CAST.frog], scene: 'Freddie hops joyfully on his lily pad, proud to be just himself.', composition: 'Happy leaping frog, sparkling pond.', light: 'Bright joyful light.' }) }
    ],
    closing: {
      text: { en: `For there is no sense in puffing yourself up to be somebody else — the world has only one of you, and that is exactly enough.` },
      image: IMG, imageAlt: 'A single lily pad floating on a calm sunny pond.',
      imagePrompt: P({ scene: 'End vignette: a single green lily pad floating on a calm, sparkling pond.', composition: 'Simple still life, lily pad on water.', light: 'Bright gentle pond glow.' })
    }
  }));
})(window.APP);

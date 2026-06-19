// ─── Otter's Special Stone ────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: shared joy is the truest treasure.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/otter.svg';
  var CAST = {
    otter: `Ollie the otter: a sleek brown river otter with a whiskery face, bright eyes and quick paws, forever floating on his back in the river.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'otters-stone',
    title:    { en: "Otter's Special Stone" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'teal', board: null, color: '#2f7a7a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['otter'], coverAnimal: 'otter',
    requirements: [{ animalId: 'otter', minCount: 1, label: 'Find the Otter' }],
    cover: {
      image: IMG, imageAlt: 'An otter floating on its back holding a smooth stone.',
      imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie the otter floats happily on his back in the river, holding a smooth round stone on his tummy.', composition: 'Otter floating, stone on belly, ripples around.', light: 'Sparkling sunlit water.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a bright, busy river lived an otter named Ollie, and Ollie had a treasure. It was a smooth grey stone, round as an egg and polished by the water until it shone, and he had found it himself on the riverbed. He loved it more than anything in the whole wide world.` },
        image: IMG, imageAlt: 'An otter proudly holding a smooth shiny stone.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie holds up his smooth shiny stone proudly, eyes shining.', composition: 'Otter and stone close, river behind.', light: 'Bright riverside light.' }) },
      { id: 2, text: { en: `Ollie carried his stone everywhere. He juggled it, he polished it, he tucked it under his arm when he slept. "It is MINE," he would say, "and I shall keep it safe forever." And whenever another otter came near, Ollie held his stone a little tighter and turned away.` },
        image: IMG, imageAlt: 'An otter clutching his stone and turning away from others.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie clutches his stone tightly and turns away as other otters drift near.', composition: 'Otter guarding his stone, others at a distance.', light: 'Clear daylight on water.' }) },
      { id: 3, text: { en: `The other otters of the river loved to play together — they slid down muddy banks, they chased and tumbled, they raced the silver fish. But Ollie never joined in. He was far too busy keeping watch over his stone, in case anyone should try to take it.` },
        image: IMG, imageAlt: 'Otters playing together while one sits apart guarding a stone.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Otters slide and tumble joyfully while Ollie sits apart, guarding his stone.', composition: 'Playful otters, one solitary watcher.', light: 'Lively sunlit river.' }) },
      { id: 4, text: { en: `Now the very best game on the river was Pebble-Toss, where the otters tossed a stone from paw to paw, faster and faster, splashing and laughing. One sunny day they had no pebble smooth enough to play with. "If only we had a really good stone," they sighed.` },
        image: IMG, imageAlt: 'Otters looking for a smooth stone to play with.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'A group of otters search the bank for a smooth stone to play Pebble-Toss.', composition: 'Otters hunting along the pebbly shore.', light: 'Warm midday sun.' }) },
      { id: 5, text: { en: `Ollie froze. HIS stone was the smoothest, roundest stone on the whole river — perfect for the game. He clutched it close. "What if they drop it? What if they lose it? What if they keep it?" he fretted. But the otters looked so glum, and the game looked so very much fun.` },
        image: IMG, imageAlt: 'An otter looking torn, holding his stone and watching the others.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie hesitates, torn between his precious stone and his glum, longing friends.', composition: 'Otter wavering, friends hopeful nearby.', light: 'Bright, slightly tense light.' }) },
      { id: 6, text: { en: `For the first time ever, Ollie took a deep breath and swam over. "Here," he said, his voice a little shaky. "You can play with my stone. Just... be gentle with it." The otters gasped with delight. "Truly? Oh, thank you, Ollie! Come and play with us!"` },
        image: IMG, imageAlt: 'An otter shyly offering his stone to the other otters.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie shyly offers his special stone to the delighted group of otters.', composition: 'Otter holding out the stone, friends gathering.', light: 'Warm welcoming light.' }) },
      { id: 7, text: { en: `And oh, what a game they had! The stone flew from paw to paw, flashing in the sun, and the river rang with splashes and laughter. Best of all, Ollie was right in the middle of it — tossing, catching, tumbling, shrieking with joy. He had never, ever had such fun.` },
        image: IMG, imageAlt: 'Otters joyfully tossing a stone in a splashing river game.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'The otters joyfully toss the shining stone paw to paw, Ollie laughing among them.', composition: 'Whirl of playful otters and flying stone.', light: 'Sparkling joyful sunlight.' }) },
      { id: 8, text: { en: `When the game was done, the otters handed the stone carefully back. "Thank you for sharing," they said. "That was the best Pebble-Toss ever." Ollie held his stone — and realised, with a happy little jolt, that it felt even more precious now than it had before.` },
        image: IMG, imageAlt: 'Otters gently returning a stone to a happy otter.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'The otters carefully hand the stone back to a beaming Ollie.', composition: 'Stone returned, otters smiling together.', light: 'Soft golden afternoon.' }) },
      { id: 9, text: { en: `From then on, Ollie still treasured his stone — but he treasured his friends more. Every sunny day he brought it out for a game of Pebble-Toss, and the more he shared it, the happier it made him. For a treasure kept all alone, he found, is the loneliest treasure of all.` },
        image: IMG, imageAlt: 'An otter playing happily with friends, sharing his stone.',
        imagePrompt: P({ cast: [CAST.otter], scene: 'Ollie plays happily with his friends, freely sharing his treasured stone.', composition: 'Otter among friends, stone in play.', light: 'Warm contented light.' }) }
    ],
    closing: {
      text: { en: `For the finest treasures only shine their brightest when they are shared — and the warmest of all is a good friend to share them with.` },
      image: IMG, imageAlt: 'A smooth grey stone resting on a sunlit riverbank.',
      imagePrompt: P({ scene: 'End vignette: a smooth grey river-stone resting on a sunlit pebbly bank.', composition: 'Simple still life, stone on the shore.', light: 'Warm riverside glow.' })
    }
  }));
})(window.APP);

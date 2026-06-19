// ─── The Peacock Who Shared His Colours ───────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: beauty grows when it is shared with joy.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/peacock.svg';
  var CAST = {
    peacock: `Percy the peacock: a magnificent teal-and-blue peacock with a tall crown and a great fan of jewelled eye-spotted feathers; proud, then warm-hearted.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'peacock-colours',
    title:    { en: "The Peacock Who Shared His Colours" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'teal', board: null, color: '#1f7a8a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['peacock'], coverAnimal: 'peacock',
    requirements: [{ animalId: 'peacock', minCount: 1, label: 'Find the Peacock' }],
    cover: {
      image: IMG, imageAlt: 'A magnificent peacock fanning his jewelled tail feathers.',
      imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy the peacock fans his magnificent jewelled tail in a sunny garden.', composition: 'Peacock displaying his great fan of feathers.', light: 'Brilliant warm garden light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a grand old garden lived a peacock named Percy, who had the most magnificent tail in all the land. When he spread it wide, it shimmered with a hundred jewelled eyes of blue and green and gold, and everyone who saw it gasped. Percy knew it, too — and was terribly, terribly proud.` },
        image: IMG, imageAlt: 'A proud peacock showing off his shimmering tail.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy proudly shows off his shimmering jewelled tail to admirers.', composition: 'Peacock displaying grandly.', light: 'Bright glittering light.' }) },
      { id: 2, text: { en: `All day long, Percy strutted about, fanning his feathers and admiring his own reflection in the garden pond. "Am I not the most beautiful creature alive?" he would say. But he only ever looked at himself, and he never once thought to share his beauty with anyone else.` },
        image: IMG, imageAlt: 'A peacock admiring his reflection in a pond.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy admires his own dazzling reflection in the still garden pond.', composition: 'Peacock and mirror-image in water.', light: 'Clear reflective light.' }) },
      { id: 3, text: { en: `Near the bottom of the garden lived a flock of small brown birds — sparrows and wrens — who were plain and grey and rather sad about it. "How dull we are," they sighed, watching Percy gleam. "We have no fine colours at all. Nobody ever stops to look at the likes of us."` },
        image: IMG, imageAlt: 'Small plain brown birds looking sadly at a bright peacock.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'A flock of plain brown sparrows watch the glittering peacock and sigh.', composition: 'Drab little birds, dazzling peacock beyond.', light: 'Soft muted light on the birds.' }) },
      { id: 4, text: { en: `Percy heard them, but he only fluffed his feathers higher. "Quite right," he said grandly. "Beauty like mine is rare. It would not do for EVERYONE to be lovely." And he turned his splendid back on the little grey birds and went on admiring himself in the pond.` },
        image: IMG, imageAlt: 'A haughty peacock turning his back on the plain birds.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy haughtily turns his splendid back on the plain little birds.', composition: 'Proud peacock, dejected birds behind.', light: 'Bright but cold light.' }) },
      { id: 5, text: { en: `But that night, a great storm blew in. The wind howled and the rain lashed down, and a young sparrow was tumbled from her nest and lay shivering, soaked and frightened, on the cold ground. Her family cheeped in terror — but they were too small and too weak to help her in the gale.` },
        image: IMG, imageAlt: 'A tiny sparrow fallen and shivering in a storm.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'A young sparrow lies shivering on the ground, fallen from her nest in a storm.', composition: 'Tiny soaked bird in the wind and rain.', light: 'Dark stormy night.' }) },
      { id: 6, text: { en: `Percy saw the little bird in trouble, and for the very first time in his life, he forgot all about himself. He rushed over and spread his enormous tail wide — not to show it off, but as a great glittering roof, sheltering the trembling sparrow from the wind and the rain.` },
        image: IMG, imageAlt: 'A peacock spreading his tail to shelter a sparrow from the storm.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy spreads his great tail like a roof to shelter the little sparrow from the storm.', composition: 'Peacock tail shielding the small bird.', light: 'Dim storm light, warm shelter beneath.' }) },
      { id: 7, text: { en: `All through the wild night Percy held his tail out wide and steady, until the storm blew over and the dawn came pink and calm. The little sparrow was warm and dry and quite unharmed. "You saved me," she peeped. "You gave up showing off your beautiful tail — to shelter plain little me."` },
        image: IMG, imageAlt: 'A safe little sparrow thanking a peacock at dawn.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'At calm pink dawn, the safe little sparrow thanks Percy warmly.', composition: 'Peacock and grateful sparrow, storm passed.', light: 'Gentle pink dawn.' }) },
      { id: 8, text: { en: `And something had changed in Percy. Sheltering that little bird had felt better — far better — than all the admiring looks in the world. "Your colours are inside you," he told the brown birds, "in how you sing, and how you care. And mine are best of all when I use them to help."` },
        image: IMG, imageAlt: 'A warm-hearted peacock talking kindly with the little birds.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'A changed, warm-hearted Percy talks kindly with the little brown birds.', composition: 'Peacock among the small birds, gentle.', light: 'Soft warm morning light.' }) },
      { id: 9, text: { en: `From then on, Percy still spread his glorious tail — but now he did it to delight his friends, not just himself. He sheltered the little ones in storms and danced his colours to cheer the sad. And his beautiful tail, everyone agreed, had never once looked half so lovely as it did now.` },
        image: IMG, imageAlt: 'A peacock joyfully displaying his tail to delight a crowd of birds.',
        imagePrompt: P({ cast: [CAST.peacock], scene: 'Percy joyfully fans his tail to delight a gathered crowd of happy birds.', composition: 'Peacock sharing his beauty with a glad flock.', light: 'Warm radiant light.' }) }
    ],
    closing: {
      text: { en: `For beauty kept only for oneself soon grows cold and small — but beauty shared with kindness shines brighter than any jewel.` },
      image: IMG, imageAlt: 'A single shimmering peacock feather resting in the morning light.',
      imagePrompt: P({ scene: 'End vignette: a single shimmering jewelled peacock feather resting in soft morning light.', composition: 'Simple still life, one feather.', light: 'Gentle glowing light.' })
    }
  }));
})(window.APP);

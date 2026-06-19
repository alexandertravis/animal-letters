// ─── The Goose and the Golden Egg ─────────────────────────────────────────────
// Gentle retelling of the Aesop fable. ~9 pages. Moral: greed loses what
// patience earns. (Kindly version — no harm comes to the goose.)
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/goose.svg';
  var CAST = {
    goose: `Greta the goose: a plump white goose with a bright orange beak, neat folded wings and calm friendly eyes, waddling in a farmyard.`,
    fox: `Mr Fox: a lean russet fox with a bushy tail and a sly, clever grin.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'goose-golden-egg',
    title:    { en: "The Goose and the Golden Egg" },
    subtitle: 'after Aesop',
    skin: 'classic', leather: 'gold', board: null, color: '#caa23a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['goose', 'fox'], coverAnimal: 'goose',
    requirements: [{ animalId: 'goose', minCount: 1, label: 'Find the Goose' }],
    cover: {
      image: IMG, imageAlt: 'A white goose standing proudly beside a shining golden egg.',
      imagePrompt: P({ cast: [CAST.goose], scene: 'Greta the goose stands beside a single shining golden egg in a sunny farmyard.', composition: 'Goose and one golden egg, warm yard behind.', light: 'Bright golden farmyard light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a tidy little farmyard lived a white goose named Greta. She was a gentle, ordinary goose in every way — except for one quite extraordinary thing. Every single morning, when the sun came up, Greta laid one perfect egg made of solid, shining gold.` },
        image: IMG, imageAlt: 'A goose laying a golden egg in a sunny farmyard.',
        imagePrompt: P({ cast: [CAST.goose], scene: 'Greta proudly reveals a single golden egg in the morning sunshine.', composition: 'Goose with one gleaming egg in a nest of straw.', light: 'Warm sunrise gold.' }) },
      { id: 2, text: { en: `One golden egg a day was a fine and lucky thing. With it, the farm bought all it needed and a little more besides, and everyone was happy and content. Greta liked her quiet life: one egg each morning, then a good long day of waddling, paddling and nibbling clover.` },
        image: IMG, imageAlt: 'A content goose paddling in a farm pond.',
        imagePrompt: P({ cast: [CAST.goose], scene: 'Greta paddles contentedly across a sunlit farm pond.', composition: 'Goose on calm water, ripples spreading.', light: 'Peaceful afternoon light.' }) },
      { id: 3, text: { en: `Now a sly fox named Mr Fox lived in the wood nearby, and when he heard of the golden goose, his eyes lit up with greed. "One egg a day?" he muttered. "Why wait about for ONE, when surely there must be a whole heap of gold tucked away inside her all at once!"` },
        image: IMG, imageAlt: 'A sly fox peering greedily over a farm fence.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Mr Fox peers greedily over the farmyard fence, eyes gleaming.', composition: 'Sly fox at the fence, plotting.', light: 'Dappled woodland-edge light.' }) },
      { id: 4, text: { en: `So Mr Fox crept up to Greta with his slyest, friendliest grin. "Good day, dear goose," he purred. "I have a marvellous idea. Why give just one little egg a day, when you could give ALL your gold at once and be famous? Come along with me, and I'll show you how."` },
        image: IMG, imageAlt: 'A sly fox sweet-talking a goose in the farmyard.',
        imagePrompt: P({ cast: [CAST.goose, CAST.fox], scene: 'Mr Fox grins and sweet-talks the calm goose in the farmyard.', composition: 'Fox leaning in, goose listening calmly.', light: 'Clear daylight.' }) },
      { id: 5, text: { en: `Greta tilted her head. "All at once?" she said. "But that is not how it works, Mr Fox. There is no heap of gold inside me. There is just one little egg each morning — no more, no less. Good things come in their own good time. They cannot be hurried."` },
        image: IMG, imageAlt: 'A wise calm goose explaining patiently to a fox.',
        imagePrompt: P({ cast: [CAST.goose, CAST.fox], scene: 'Greta calmly explains that her gift comes one egg at a time.', composition: 'Patient goose, attentive fox.', light: 'Soft warm light.' }) },
      { id: 6, text: { en: `But Mr Fox would not listen. Greed had stopped up his ears. That night he sneaked into the yard, snatched up Greta's nest, and shook it and squeezed it and turned it upside-down, certain that a great pile of gold would come tumbling out. But of course, none did.` },
        image: IMG, imageAlt: 'A greedy fox shaking an empty nest in the dark.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Mr Fox shakes and searches the empty nest by night, finding no gold.', composition: 'Frantic fox, scattered straw, no treasure.', light: 'Dim moonlit night.' }) },
      { id: 7, text: { en: `There was no hidden hoard — there never had been. All his shaking and snatching found him exactly nothing. And worse: poor Greta was so startled and upset by all the fuss that, the very next morning, she was far too rattled to lay any egg at all.` },
        image: IMG, imageAlt: 'An upset goose and an empty nest in the morning.',
        imagePrompt: P({ cast: [CAST.goose], scene: 'Greta looks ruffled and upset beside her empty nest in the morning.', composition: 'Distressed goose, no egg in the straw.', light: 'Cool grey morning.' }) },
      { id: 8, text: { en: `Mr Fox slunk away with empty paws and a red face, having gained not a single speck of gold for all his greedy trouble. He had been so busy grabbing for everything at once that he had spoiled the steady, lovely gift that was already there for the taking.` },
        image: IMG, imageAlt: 'A glum fox slinking away empty-handed.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'A glum, empty-pawed Mr Fox slinks away from the farmyard.', composition: 'Defeated fox retreating.', light: 'Flat disappointed light.' }) },
      { id: 9, text: { en: `The kind farm folk soothed Greta with soft words and warm straw, and in a day or two she was calm and happy again — and there, one fine morning, was her single golden egg, right on time. One a day, no more, no less. And that, they all agreed, was quite enough.` },
        image: IMG, imageAlt: 'A calm happy goose back beside her golden egg.',
        imagePrompt: P({ cast: [CAST.goose], scene: 'A calm, happy Greta sits beside her single golden egg once more.', composition: 'Content goose, one gleaming egg.', light: 'Warm restored sunshine.' }) }
    ],
    closing: {
      text: { en: `For greed grabs at everything and ends with nothing — but patience treasures each small gift, and is rich every single day.` },
      image: IMG, imageAlt: 'A single golden egg resting in a nest of straw.',
      imagePrompt: P({ scene: 'End vignette: a single golden egg resting in a cosy nest of straw.', composition: 'Simple still life, egg in straw.', light: 'Soft golden glow.' })
    }
  }));
})(window.APP);

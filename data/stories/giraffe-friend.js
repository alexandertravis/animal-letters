// ─── The Giraffe Who Couldn't Bend Down ──────────────────────────────────────
// Original gentle tale. ~10 pages. Moral: there is always a way to meet a friend.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    giraffe: `Gita the giraffe: a tall, gentle giraffe with soft golden patches and long curling eyelashes, wearing a little knitted scarf. Kind, patient, a touch shy about her height.`,
    mouse:   `Milo the mouse: a tiny brown field-mouse in a red neckerchief, brave and bright-eyed, very small and very friendly.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'giraffe-friend',
    title:    { en: "The Giraffe Who Couldn't Bend Down" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'gold', board: null, color: '#b8860b',
    wordCount: 470, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['giraffe', 'mouse'], coverAnimal: 'giraffe',
    requirements: [{ animalId: 'giraffe', minCount: 1, label: 'Find the Giraffe' }],
    cover: {
      image: 'assets/images/cartoon/giraffe.svg',
      imageAlt: 'A tall giraffe leaning her long neck all the way down to a tiny mouse in the grass.',
      imagePrompt: P({ cast: [CAST.giraffe, CAST.mouse], scene: 'Gita the giraffe curves her long neck down in a great gentle loop to meet Milo the tiny mouse standing in the meadow grass.', composition: 'The giraffe makes a tall arch across the frame; the mouse is a small bright dot at the bottom where her nose reaches.', light: 'Warm afternoon savannah light, soft and golden.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Gita the giraffe was the tallest creature on the whole green hill. Her head was up among the leaves where the wind lived, and the world below looked very small and very far away.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A tall giraffe with her head up among the treetops.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gita stands tall among the high leaves of an acacia tree, her head in the canopy, the meadow tiny far below.', composition: 'Vertical frame, giraffe filling its height, ground small at the base.', light: 'High bright daylight at the treetops.' }) },
      { id: 2, text: { en: `One morning a tiny voice called up from the grass. "Hello! Hello up there!" Gita looked down, and down, and down. Far below stood the smallest mouse she had ever seen, waving both paws.` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'A tiny mouse in the grass waving both paws upward.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'Milo the mouse stands in tall meadow grass, both paws raised, calling cheerfully upward.', composition: 'Low close shot of the mouse, blades of grass towering around him.', light: 'Soft morning light through the grass.' }) },
      { id: 3, text: { en: `"I should like to be your friend," squeaked the mouse. "But you are so very high and I am so very low." Gita smiled. "Then I shall come down to you," she said. And she began to bend her long, long neck.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A giraffe beginning to lower her long neck toward the ground.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gita begins to lower her great neck in a slow careful curve toward the meadow floor.', composition: 'The neck sweeps in a diagonal arc across the frame.', light: 'Warm late-morning light.' }) },
      { id: 4, text: { en: `But bending was not easy. Her knees wobbled. Her neck creaked like an old gate. She got halfway down and stuck, swaying gently, with her nose pointing at a cloud instead of at the mouse.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A giraffe stuck halfway bent, swaying, nose pointing sideways.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gita is caught halfway in her bend, legs splayed and wobbling, her nose comically pointed off at the sky.', composition: 'Awkward off-balance pose, gentle and funny, filling the frame.', light: 'Bright midday light.' }) },
      { id: 5, text: { en: `"Oh dear," said Gita. "I am very good at being tall, but not at all good at being small." The mouse thought hard. "Then perhaps," he said, "I should come up to you instead."` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'A tiny mouse with one paw to his chin, thinking hard.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'Milo sits in the grass, one paw on his chin, a bright idea dawning on his small face.', composition: 'Close shot of the thoughtful mouse.', light: 'Soft warm light.' }) },
      { id: 6, text: { en: `So the mouse scampered up Gita's front leg, along her shoulder, and all the way up her spotted neck, his little claws tickling as he climbed. Gita giggled and had to hold very still.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A tiny mouse climbing up the long neck of a giraffe.',
        imagePrompt: P({ cast: [CAST.giraffe, CAST.mouse], scene: 'Milo scrambles up the length of Gita\'s spotted neck while she stands very still, eyes crinkled with a giggle.', composition: 'The neck runs diagonally; the tiny mouse climbs along it.', light: 'Warm afternoon light on golden patches.' }) },
      { id: 7, text: { en: `At the very top, the mouse sat between Gita's ears and gasped. He could see the whole hill, the silver river, the far blue hills, and a hawk turning slow circles below them. "Oh," he breathed. "Oh, it's wonderful up here."` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'A tiny mouse perched high, gazing out over a wide green landscape.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'Milo sits between the giraffe\'s ears, gazing out over a vast green valley with a river and far hills.', composition: 'Mouse small in the foreground, huge sweeping landscape beyond.', light: 'Wide golden afternoon light over the valley.' }) },
      { id: 8, text: { en: `"I have lived on this hill all my life," said the mouse, "and I never knew it was so big." Gita walked slowly so he would not fall, and showed him the orchard, the pond, and the meadow where the bees were dancing.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A giraffe walking gently across a meadow with a mouse riding on her head.',
        imagePrompt: P({ cast: [CAST.giraffe, CAST.mouse], scene: 'Gita strolls carefully across a blooming meadow, Milo riding proudly between her ears.', composition: 'Wide side view, giraffe striding, tiny passenger up top.', light: 'Golden meadow light, bees in the air.' }) },
      { id: 9, text: { en: `When evening came, Gita lay down at last — slowly, carefully — and the mouse hopped off into the cool grass beside her. They had found, between them, a way to be together: one very tall, one very small, and both exactly right.` },
        image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A giraffe resting in the grass at dusk with a small mouse curled beside her.',
        imagePrompt: P({ cast: [CAST.giraffe, CAST.mouse], scene: 'Gita folds down to rest in the dusky grass; Milo settles cosily beside her great cheek.', composition: 'Restful low composition, the two friends together.', light: 'Soft violet-and-gold dusk.' }) },
      { id: 10, text: { en: `After that, every morning the mouse climbed up to see the wide world, and every evening the giraffe lay down to share the small one. Neither had to change who they were. They only had to meet halfway.` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'A mouse and a giraffe together at sunrise, happy.',
        imagePrompt: P({ cast: [CAST.giraffe, CAST.mouse], scene: 'Sunrise on the hill; Milo waves from the grass as Gita lowers her head to greet him for the day.', composition: 'Warm reunion framing, sun rising behind.', light: 'Fresh pink-gold sunrise.' }) }
    ],
    closing: {
      text: { en: `And the tallest creature on the hill and the smallest creature in the grass were the very best of friends, all their days.` },
      image: 'assets/images/cartoon/giraffe.svg', imageAlt: 'A little scarf and a tiny neckerchief hanging side by side on a fence.',
      imagePrompt: P({ scene: 'A quiet end vignette: a giraffe-sized knitted scarf and a tiny mouse neckerchief hung together on a meadow fence at sunset.', composition: 'Simple still life of the two scarves side by side.', light: 'Last warm gold of evening.' })
    }
  }));
})(window.APP);

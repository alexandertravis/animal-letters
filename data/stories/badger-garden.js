// ─── Badger's Quiet Garden ────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: there is a quiet kind of happiness that
// rushing about will always miss.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/badger.svg';
  var CAST = {
    badger: `Bramble the badger: a calm old badger with a black-and-white striped face, a broad grey body and slow, kindly eyes, often found tending a garden.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'badger-garden',
    title:    { en: "Badger's Quiet Garden" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'charcoal', board: null, color: '#4a4a4a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['badger'], coverAnimal: 'badger',
    requirements: [{ animalId: 'badger', minCount: 1, label: 'Find the Badger' }],
    cover: {
      image: IMG, imageAlt: 'A striped badger tending a peaceful woodland garden.',
      imagePrompt: P({ cast: [CAST.badger], scene: 'Bramble the badger tends a peaceful, tidy garden at the edge of a quiet wood.', composition: 'Badger among neat garden rows.', light: 'Soft dappled woodland light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `At the quiet edge of the wood, an old badger named Bramble kept the most peaceful garden you ever saw. Neat rows of vegetables, a little pond, a bench beneath a pear tree — and over it all, a lovely deep hush, broken only by birdsong and the hum of bees.` },
        image: IMG, imageAlt: 'A peaceful garden with a pond and a pear tree.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'Bramble\'s peaceful garden with neat rows, a little pond and a pear tree.', composition: 'Tranquil garden, badger at work.', light: 'Calm gentle daylight.' }) },
      { id: 2, text: { en: `One day a young squirrel named Nutkin came whirling through, in a terrible hurry as always. "Hello-Bramble-can't-stop-too-busy-so-much-to-do!" he gabbled, racing in three directions at once. He skidded, he fretted, he dropped half of everything, and he never, ever stood still.` },
        image: IMG, imageAlt: 'A frantic squirrel rushing about in a calm garden.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'A frantic young squirrel whirls about, dropping things, in Bramble\'s calm garden.', composition: 'Blur of busy squirrel, calm badger watching.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `"Whatever is the matter, Nutkin?" asked Bramble gently. "No time, no time!" puffed the squirrel. "I have a hundred things to do and they all need doing NOW and I never get them done and I'm always tired and cross!" And he flopped down, quite worn out, in a heap on the path.` },
        image: IMG, imageAlt: 'An exhausted squirrel flopping down in a garden path.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'The worn-out squirrel flops in a heap on the garden path while Bramble looks on kindly.', composition: 'Collapsed squirrel, gentle badger near.', light: 'Soft warm light.' }) },
      { id: 4, text: { en: `Bramble sat down beside him on the bench beneath the pear tree. "Sit with me a moment," he said. "Just a moment. There is no hurry here." Nutkin twitched and fidgeted — sitting still felt almost impossible — but Bramble was so calm that, little by little, the squirrel grew still too.` },
        image: IMG, imageAlt: 'A badger and squirrel sitting together on a garden bench.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'Bramble and the squirrel sit together on a bench beneath the pear tree.', composition: 'Two on a bench, garden around them.', light: 'Dappled peaceful light.' }) },
      { id: 5, text: { en: `"Now," said Bramble softly, "just listen." And in the quiet, Nutkin began to hear it all: the bees humming in the beans, a blackbird singing, the little pond going plip, the leaves whispering overhead. It was a hundred lovely small sounds he had always been far too busy to notice.` },
        image: IMG, imageAlt: 'A squirrel sitting quietly, beginning to notice the garden sounds.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'The squirrel sits quietly, beginning to truly hear the bees, birds and pond.', composition: 'Still squirrel, living garden around.', light: 'Warm tranquil light.' }) },
      { id: 6, text: { en: `"I never noticed any of that before," whispered Nutkin in wonder. Bramble nodded slowly. "When you rush, the world rushes past you in a blur," he said. "But when you are still — truly still — the world comes and sits beside you. And that is where the quiet happiness lives."` },
        image: IMG, imageAlt: 'A calm badger talking gently to a now-still squirrel.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'Bramble shares gentle wisdom with the now-calm, attentive squirrel.', composition: 'Badger and squirrel in quiet talk.', light: 'Soft golden light.' }) },
      { id: 7, text: { en: `They sat a while longer, doing nothing much at all — and it was wonderful. Nutkin felt the tight, frantic knot inside him slowly loosen and melt away. When at last he stood up, he felt rested, and clear, and ready. The hundred things did not seem so frightening any more.` },
        image: IMG, imageAlt: 'A rested, calm squirrel standing up peacefully in the garden.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'The squirrel rises, rested and calm, the frantic knot inside him gone.', composition: 'Peaceful squirrel, content badger.', light: 'Mellow afternoon glow.' }) },
      { id: 8, text: { en: `"I shall still have my hundred things to do," said Nutkin, "but I think I'll do them one at a time now — and stop, every day, to sit and listen." Bramble smiled his slow warm smile. "Then you have learned the secret of my garden," he said, "and you may visit it whenever you please."` },
        image: IMG, imageAlt: 'A badger and squirrel smiling together in the garden.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'Bramble and Nutkin smile warmly together among the garden rows.', composition: 'Two friends, peaceful garden.', light: 'Warm friendly light.' }) },
      { id: 9, text: { en: `And so he did. Every day, however busy he was, Nutkin came to sit a while in Badger's quiet garden — to be still, and listen, and let the world come and sit beside him. And he was never quite so frantic, nor half so tired and cross, ever again.` },
        image: IMG, imageAlt: 'A calm squirrel visiting a peaceful garden at evening.',
        imagePrompt: P({ cast: [CAST.badger], scene: 'A calmer Nutkin sits peacefully in Bramble\'s garden as evening falls.', composition: 'Squirrel at rest in the quiet garden.', light: 'Gentle evening glow.' }) }
    ],
    closing: {
      text: { en: `For some happiness can only be found by holding still — sitting quietly, listening softly, and letting the whole wide world come and sit beside you.` },
      image: IMG, imageAlt: 'An empty garden bench under a pear tree at dusk.',
      imagePrompt: P({ scene: 'End vignette: a quiet wooden garden bench beneath a pear tree at dusk.', composition: 'Simple still life, bench and tree.', light: 'Peaceful dusk hush.' })
    }
  }));
})(window.APP);

// ─── How the Elephant Got His Trunk ───────────────────────────────────────────
// Gentle 'just-so' tale after Kipling. ~9 pages. Moral: curiosity, gently handled,
// can turn into a wonderful gift.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/elephant.svg';
  var CAST = {
    elephant: `Ellie the elephant child: a small grey elephant with big ears and bright eager eyes, and (at first) only a short little nose; endlessly curious.`,
    crocodile: `the river crocodile: a long green crocodile lazing at the water's edge, drawn gently and not frightening.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'elephant-trunk',
    title:    { en: "How the Elephant Got His Trunk" },
    subtitle: "a 'just-so' tale, after Kipling",
    skin: 'classic', leather: 'dustblue', board: null, color: '#6a7a8a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['elephant', 'crocodile'], coverAnimal: 'elephant',
    requirements: [{ animalId: 'elephant', minCount: 1, label: 'Find the Elephant' }],
    cover: {
      image: IMG, imageAlt: 'A small elephant with a short nose by a wide green river.',
      imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie the little elephant, with only a short nose, stands curiously by a wide green river.', composition: 'Little elephant at the riverbank.', light: 'Warm hazy river light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Long, long ago, in the High and Far-Off Times, the elephant had no trunk at all — only a little stubby nose, no bigger than a boot, that he could waggle from side to side but could not pick up a single thing with. And of all the elephants, the most curious was a little elephant child named Ellie.` },
        image: IMG, imageAlt: 'A small elephant with a short little nose long ago.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie the elephant child with her little short nose, looking curious.', composition: 'Small elephant, short nose, eager face.', light: 'Soft golden ancient light.' }) },
      { id: 2, text: { en: `Ellie was full of questions — oh, so many questions! "Why do the birds sing? Why is the grass green? What does the moon eat for supper?" She asked questions all day long, and the grown-up animals grew quite worn out. But there was one question that Ellie wanted answered most of all.` },
        image: IMG, imageAlt: 'A curious little elephant asking questions of the animals.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie peppers the weary grown-up animals with endless eager questions.', composition: 'Little elephant amid patient animals.', light: 'Bright daytime.' }) },
      { id: 3, text: { en: `"What," she wondered, "does the Crocodile have for dinner?" Nobody would tell her. "Hush, child," they said with a shiver. "Don't go asking about the Crocodile." But the not-knowing only made Ellie MORE curious — and at last she set off, all by herself, to the great grey-green river to find out.` },
        image: IMG, imageAlt: 'A determined little elephant setting off toward a river.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie sets off bravely and curiously toward the great grey-green river.', composition: 'Little elephant on a path to the river.', light: 'Hazy adventurous light.' }) },
      { id: 4, text: { en: `At the muddy bank she found the Crocodile, lazing in the reeds with a long toothy smile. "Good morning!" said Ellie politely. "Please, I should so like to know — what do you have for dinner?" The Crocodile blinked one slow eye. "Come a little closer, little one," he said softly, "and I will whisper it to you."` },
        image: IMG, imageAlt: 'A little elephant politely meeting a crocodile at the river.',
        imagePrompt: P({ cast: [CAST.elephant, CAST.crocodile], scene: 'Ellie politely greets the long crocodile lazing in the river reeds.', composition: 'Elephant and crocodile meeting at the water.', light: 'Warm hazy riverbank.' }) },
      { id: 5, text: { en: `So trusting Ellie leaned in close — and the Crocodile gently took hold of her little short nose, just to give it the softest tug! "Why," he said, with a twinkle, "for dinner, I believe I shall start with elephant!" Ellie sat back hard in surprise, and the Crocodile held on, and her little nose began to stretch.` },
        image: IMG, imageAlt: 'A crocodile gently tugging a little elephant\'s nose by the river.',
        imagePrompt: P({ cast: [CAST.elephant, CAST.crocodile], scene: 'The crocodile gently tugs Ellie\'s short nose; she pulls back in surprise.', composition: 'Gentle tug-of-war at the river\'s edge.', light: 'Bright playful light.' }) },
      { id: 6, text: { en: `Ellie pulled, and the Crocodile pulled, and — being a clever little elephant — Ellie braced her feet and tugged with all her might to get free. And the more she pulled, the longer her nose stretched: longer, and longer, and LONGER, until at last she popped loose and sat down in the mud with a bump.` },
        image: IMG, imageAlt: 'A little elephant pulling free, her nose now long.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie braces and pulls free at last, her nose now stretched long.', composition: 'Elephant tumbling back, long new trunk.', light: 'Dynamic bright light.' }) },
      { id: 7, text: { en: `Ellie looked down at her nose in dismay. It was ever so long now — a great dangling thing! "Oh dear," she said. "Whatever shall I do with a nose like this?" But then a fly buzzed by and tickled her, and without even thinking, she flicked it away — with her brand new, bendy, marvellous trunk!` },
        image: IMG, imageAlt: 'A surprised elephant discovering she can use her new long trunk.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie discovers, surprised and delighted, that she can flick a fly with her new long trunk.', composition: 'Elephant testing her wonderful new trunk.', light: 'Bright cheerful light.' }) },
      { id: 8, text: { en: `And oh, what a wonderful thing that long nose turned out to be! Ellie found she could pluck sweet fruit from the highest branches, suck up cool water to drink, give herself a lovely shower, and trumpet a grand hello. Her curiosity had earned her the most useful nose in all the world.` },
        image: IMG, imageAlt: 'An elephant happily using her trunk to pick fruit and spray water.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Ellie joyfully uses her new trunk to pluck fruit and spray cool water.', composition: 'Elephant delighting in her trunk\'s many uses.', light: 'Warm golden light.' }) },
      { id: 9, text: { en: `When Ellie came home, all the other elephants stared at her marvellous trunk with envy. So off they all hurried to the river to be tugged too! And that — so the old tales say — is how every elephant came to have a long and clever trunk, all thanks to one little elephant's great curiosity.` },
        image: IMG, imageAlt: 'Many elephants now with long trunks, gathered happily.',
        imagePrompt: P({ cast: [CAST.elephant], scene: 'Many elephants now sport long trunks, gathered happily around Ellie.', composition: 'A herd of long-trunked elephants together.', light: 'Warm communal glow.' }) }
    ],
    closing: {
      text: { en: `And so the elephant's curiosity, which got it into a spot of bother by the river, gave it the most wonderful gift of all — proof that asking 'why?' can lead to marvellous things.` },
      image: IMG, imageAlt: 'A calm grey-green river winding through the reeds at dusk.',
      imagePrompt: P({ scene: 'End vignette: a calm grey-green river winding through tall reeds at dusk.', composition: 'Simple peaceful river scene.', light: 'Soft hazy dusk.' })
    }
  }));
})(window.APP);

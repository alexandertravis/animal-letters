// ─── The Penguin Who Kept the Egg ─────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: patient, steadfast love keeps a promise
// through the longest, darkest wait.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/penguin.svg';
  var CAST = {
    penguin: `Pero the penguin: a sturdy black-and-white emperor penguin with a warm orange throat and steady, loving eyes, balancing an egg on his feet.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'penguin-egg',
    title:    { en: "The Penguin Who Kept the Egg" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'arctic', board: null, color: '#5a7a9a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['penguin'], coverAnimal: 'penguin',
    requirements: [{ animalId: 'penguin', minCount: 1, label: 'Find the Penguin' }],
    cover: {
      image: IMG, imageAlt: 'A penguin carefully balancing an egg on his feet in the snow.',
      imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero the penguin carefully balances a single egg on his feet in the snowy twilight.', composition: 'Penguin with egg tucked on his feet.', light: 'Cool blue polar twilight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On the great white ice at the bottom of the world, where the wind blows hard and the winter is long and dark, lived a penguin named Pero. And Pero had been given the most precious task of all: to keep one small egg safe and warm until, at last, it was ready to hatch.` },
        image: IMG, imageAlt: 'A penguin gently holding an egg on the icy plain.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero gently settles a single egg onto his warm feet on the vast icy plain.', composition: 'Penguin and egg on the white ice.', light: 'Pale cold polar light.' }) },
      { id: 2, text: { en: `Pero tucked the egg up high on the tops of his feet, snug beneath a warm flap of feathery tummy, where the cold could never reach it. "There now, little one," he murmured. "I will keep you warm and safe, no matter what. That is my promise." And he settled in to wait.` },
        image: IMG, imageAlt: 'A penguin tucking an egg snugly under his warm tummy.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero tucks the egg snugly beneath the warm feathery flap of his tummy.', composition: 'Close on penguin cradling the egg.', light: 'Soft warm-against-cold light.' }) },
      { id: 3, text: { en: `The long polar winter came down, and with it came the dark — for at the bottom of the world, the sun goes away for weeks and weeks on end. The wind howled and the snow flew, and the cold was bitter beyond anything. But Pero stood firm, his egg held warm, and he did not move.` },
        image: IMG, imageAlt: 'A penguin standing firm with his egg through a snowstorm.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero stands firm through a howling polar snowstorm, his egg kept warm.', composition: 'Steadfast penguin in the blizzard.', light: 'Dark blue storm light.' }) },
      { id: 4, text: { en: `Day after day, in the long darkness, Pero kept his patient watch. He could not waddle off to swim or play. He could not even lie down to sleep properly, for fear of letting the cold creep in. He simply stood, and shuffled, and held his egg, warm and safe, hour after hour after hour.` },
        image: IMG, imageAlt: 'A patient penguin keeping watch in the dark polar night.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero keeps his patient, unmoving watch through the long dark polar night.', composition: 'Lone penguin under a starry polar sky.', light: 'Deep blue starlit dark.' }) },
      { id: 5, text: { en: `When the wind blew its very coldest, Pero huddled close with all the other penguins, pressing together in a great warm crowd, each one sheltering the next. Round and round they shuffled, taking turns at the cold outside edge, so that every egg in every nest of feet stayed warm and safe.` },
        image: IMG, imageAlt: 'Many penguins huddling together to keep their eggs warm.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero huddles with a great crowd of penguins, all sheltering their eggs together.', composition: 'Tight huddle of penguins on the ice.', light: 'Warm centre against blue cold.' }) },
      { id: 6, text: { en: `It was a long, long wait — longer than you can imagine — and sometimes Pero grew so tired and so cold that he wondered if the dark would ever end. But whenever he felt the little egg warm against him, he remembered his promise, and found he had just a little more patience left to give.` },
        image: IMG, imageAlt: 'A weary but determined penguin holding his egg in the dark.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'A weary but determined Pero holds his egg close, drawing on his love and patience.', composition: 'Tired penguin, faint hope in his eyes.', light: 'Dim, tender light.' }) },
      { id: 7, text: { en: `And then, one day, far off on the edge of the white world, a thin golden line appeared — the sun, coming back at last! The long dark winter was ending. And at that very moment, Pero felt the tiniest tap... tap... tap... against his feet. The egg was beginning to hatch!` },
        image: IMG, imageAlt: 'A penguin feeling his egg begin to hatch as the sun returns.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'As the sun returns, Pero feels his egg begin to tap and crack at last.', composition: 'Penguin looking down at the cracking egg, dawn behind.', light: 'First golden sunrise on the ice.' }) },
      { id: 8, text: { en: `Crack went the shell, and out peeped a tiny fluffy grey chick, blinking up at its father with bright new eyes. "Hello, little one," whispered Pero, his heart bursting with joy. "I kept you safe. I kept my promise." And the chick gave a tiny, happy cheep, snug and warm on its father's feet.` },
        image: IMG, imageAlt: 'A fluffy penguin chick hatching as its father looks on lovingly.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'A fluffy grey chick peeps out of the shell, blinking up at the joyful Pero.', composition: 'Penguin father and newly hatched chick.', light: 'Warm golden dawn glow.' }) },
      { id: 9, text: { en: `The long dark was over, and the sun shone warm on the ice once more. Pero nuzzled his little chick close, prouder and happier than he had ever been. All his patient waiting, through all that cold and dark, had been worth it a thousand times over — for love that waits is love indeed.` },
        image: IMG, imageAlt: 'A proud penguin father with his chick in the morning sun.',
        imagePrompt: P({ cast: [CAST.penguin], scene: 'Pero nuzzles his chick close in the warm returning sun, proud and happy.', composition: 'Father penguin and chick together.', light: 'Warm bright polar morning.' }) }
    ],
    closing: {
      text: { en: `For the truest love is patient and steadfast — it holds on warm and faithful through the longest, darkest night, until the morning comes at last.` },
      image: IMG, imageAlt: 'The sun rising golden over a calm field of polar ice.',
      imagePrompt: P({ scene: 'End vignette: the sun rising golden and gentle over a calm field of polar ice.', composition: 'Simple peaceful icescape at dawn.', light: 'Warm hopeful sunrise.' })
    }
  }));
})(window.APP);

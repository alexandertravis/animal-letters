// ─── The Dolphin and the Lost Gull ────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a brave and helpful heart will go out of
// its way for someone in trouble.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/dolphin.svg';
  var CAST = {
    dolphin: `Delta the dolphin: a sleek, friendly grey dolphin with a curved smile, bright eyes and a brave, helpful heart, leaping through the waves.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'dolphin-rescue',
    title:    { en: "The Dolphin and the Lost Gull" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'dustblue', board: null, color: '#5a7a8a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['dolphin'], coverAnimal: 'dolphin',
    requirements: [{ animalId: 'dolphin', minCount: 1, label: 'Find the Dolphin' }],
    cover: {
      image: IMG, imageAlt: 'A dolphin leaping joyfully from sparkling blue waves.',
      imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta the dolphin leaps joyfully from the sparkling blue sea.', composition: 'Dolphin mid-leap over the waves.', light: 'Bright sparkling sea light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In the wide blue sea lived a dolphin named Delta, who loved to leap and play among the sparkling waves. But more than playing, Delta loved to help — for she was brave and quick, and she knew the ocean better than almost anyone. Whenever a creature was in trouble, Delta was the first to come.` },
        image: IMG, imageAlt: 'A friendly dolphin leaping through ocean waves.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta leaps and plays brightly among the sparkling ocean waves.', composition: 'Joyful dolphin in the open sea.', light: 'Bright sunny sea.' }) },
      { id: 2, text: { en: `One grey, blustery afternoon, the wind blew up rough and wild, and the waves grew tall and white-capped. As Delta swam, she heard a faint, frightened cry over the wind — "Help! Help!" — and there, far from any land, was a little seagull, her wings too soaked and tired to fly, bobbing helplessly on the cold heaving sea.` },
        image: IMG, imageAlt: 'A tired seagull stranded on rough ocean waves.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'A little seagull bobs helplessly, soaked and exhausted, on the rough grey sea.', composition: 'Tiny stranded gull on tall waves.', light: 'Cold blustery grey light.' }) },
      { id: 3, text: { en: `"I flew too far out to sea," wept the little gull, "and now my wings are too wet and tired to lift me. The waves keep washing over me, and I can't see the land, and I'm so frightened!" Delta swam to her at once. "Don't be afraid," she said warmly. "I've got you now. I'll see you safely home."` },
        image: IMG, imageAlt: 'A dolphin reaching a frightened stranded seagull.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta swims to the frightened seagull, reassuring her gently.', composition: 'Dolphin beside the soaked little gull.', light: 'Choppy grey-blue light.' }) },
      { id: 4, text: { en: `But the land was very far away, and the gull was far too tired to swim or fly. So Delta had an idea. "Climb up onto my back," she said, "and hold on tight to my fin. I'll carry you. Just keep watch, and tell me which way looks like home." The grateful gull clambered up onto Delta's smooth back.` },
        image: IMG, imageAlt: 'A seagull climbing onto a dolphin\'s back.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'The little gull clambers onto Delta\'s smooth back, holding tight to her fin.', composition: 'Gull perched on the dolphin\'s back.', light: 'Grey blustery light.' }) },
      { id: 5, text: { en: `Off they set across the heaving sea. The waves were tall and the wind was strong, but Delta was a strong, brave swimmer. She rode up and over each great wave, steady and sure, keeping her back as flat and smooth as she could so the tired little gull would not be tipped off into the cold water.` },
        image: IMG, imageAlt: 'A dolphin carrying a seagull steadily over big waves.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta rides steadily up and over the great waves, carrying the gull safely.', composition: 'Dolphin and gull cresting a wave.', light: 'Dramatic stormy sea light.' }) },
      { id: 6, text: { en: `The journey was long and hard. More than once a huge wave loomed up, but Delta dived smoothly through it and surfaced again with the gull still safe on her back. "Not far now," she called encouragingly. "I can see the cliffs! Hold on, little one — we're nearly there!"` },
        image: IMG, imageAlt: 'A dolphin and gull pressing on toward distant cliffs.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta presses on bravely toward the distant cliffs, the gull holding on.', composition: 'Dolphin and gull, cliffs on the horizon.', light: 'Grey sea brightening ahead.' }) },
      { id: 7, text: { en: `At last the wild sea calmed into a sheltered cove, and there were the tall white cliffs where the gull's family lived. Delta swam gently right up to the rocks, and the little gull hopped safely ashore, her wings drying fast now in the calmer air. She was home — safe and sound!` },
        image: IMG, imageAlt: 'A dolphin bringing a seagull safely to a sheltered cove.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta brings the little gull safely to the rocks of a sheltered cove.', composition: 'Dolphin and gull at the safe shore.', light: 'Calm clearing light.' }) },
      { id: 8, text: { en: `"You saved my life!" cried the little gull, her family swooping down joyfully around her. "You swam all that way through the storm, just for me!" Delta smiled her dolphin smile. "Of course I did," she said. "When someone is in trouble, you help them — that's all there is to it. I'm just glad you're safe."` },
        image: IMG, imageAlt: 'A grateful gull family thanking a dolphin at the shore.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'The grateful gull and her family thank Delta joyfully from the shore.', composition: 'Dolphin in the cove, gulls swooping happily.', light: 'Warm clearing light.' }) },
      { id: 9, text: { en: `And with a flick of her tail and a happy leap, brave Delta turned and swam back out to the open sea, her heart warm and glad. For there is no better feeling in all the wide ocean than knowing you went out of your way, through wind and wave, to bring a frightened friend safely home.` },
        image: IMG, imageAlt: 'A happy dolphin leaping back out to the open sea.',
        imagePrompt: P({ cast: [CAST.dolphin], scene: 'Delta leaps happily back out to the open sea, her heart warm and glad.', composition: 'Dolphin leaping toward the horizon.', light: 'Bright hopeful sea light.' }) }
    ],
    closing: {
      text: { en: `For a brave and helpful heart will swim through any storm for someone in need — and there is no warmer feeling than bringing a friend safely home.` },
      image: IMG, imageAlt: 'Calm blue waves sparkling under a clearing sky.',
      imagePrompt: P({ scene: 'End vignette: calm blue waves sparkling gently under a clearing sky.', composition: 'Simple peaceful seascape.', light: 'Bright calm sea light.' })
    }
  }));
})(window.APP);

// ─── The Tiger and the Pool ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: learn to be a friend to yourself.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/tiger.svg';
  var CAST = {
    tiger: `Tavi the tiger cub: a small orange tiger cub with bold black stripes, big round eyes and a soft, uncertain face.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'tiger-and-the-pool',
    title:    { en: "The Tiger and the Pool" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'terracotta', board: null, color: '#c4623a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['tiger'], coverAnimal: 'tiger',
    requirements: [{ animalId: 'tiger', minCount: 1, label: 'Find the Tiger' }],
    cover: {
      image: IMG, imageAlt: 'A tiger cub peering at his reflection in a jungle pool.',
      imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi the tiger cub peers cautiously at his own reflection in a still jungle pool.', composition: 'Cub above, reflection below in the water.', light: 'Dappled jungle light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Deep in the warm green jungle lived a young tiger cub named Tavi, who was a little shy and a little unsure of himself. He was learning, day by day, to be a fine big tiger — but he did not yet feel very brave, and he often worried that he was not good enough at being a tiger at all.` },
        image: IMG, imageAlt: 'A shy young tiger cub in the jungle.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi the shy tiger cub sits uncertainly among the jungle ferns.', composition: 'Small cub amid big green leaves.', light: 'Soft dappled light.' }) },
      { id: 2, text: { en: `One hot afternoon, Tavi came to a still, clear jungle pool to drink. As he leaned over the water — he froze. For there, staring right back up at him, was another tiger! A bold, striped tiger, looking him straight in the eye. Tavi did not understand that he was only seeing himself.` },
        image: IMG, imageAlt: 'A startled tiger cub seeing his reflection in a pool.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi freezes, startled to see another striped tiger staring up from the pool.', composition: 'Cub and his mirror-image in the water.', light: 'Bright still-water light.' }) },
      { id: 3, text: { en: `"Who are you?" growled Tavi, trying to sound braver than he felt. The tiger in the water growled too, at the very same moment. Tavi bared his little teeth — and so did the other tiger! Tavi swiped a paw — and the water-tiger swiped right back! "He's copying everything I do!" thought Tavi, alarmed.` },
        image: IMG, imageAlt: 'A tiger cub growling at his own reflection.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi growls and swipes at the reflection, which copies his every move.', composition: 'Cub facing off with his own image.', light: 'Bright tense light.' }) },
      { id: 4, text: { en: `Tavi tried to frighten the other tiger away. He puffed himself up and gave his biggest, fiercest ROAR — but the water-tiger roared right back, just as fiercely, and would not budge an inch. Poor Tavi grew quite upset. "Why won't he leave?" he wailed. "He matches me at everything!"` },
        image: IMG, imageAlt: 'A tiger cub roaring at his unbudging reflection.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi roars his fiercest, but the water-tiger roars back and will not leave.', composition: 'Cub roaring at the rippling pool.', light: 'Dramatic bright light.' }) },
      { id: 5, text: { en: `A wise old elephant, drinking nearby, gave a gentle chuckle. "Little cub," she said kindly, "that is no other tiger. That is YOU — your own reflection in the water. He copies you because he IS you. You have been growling and roaring all this time... at yourself."` },
        image: IMG, imageAlt: 'A wise elephant explaining reflections to a tiger cub.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'A wise old elephant gently explains to Tavi that the water-tiger is his own reflection.', composition: 'Elephant and cub at the pool.', light: 'Soft kindly light.' }) },
      { id: 6, text: { en: `Tavi blinked. He leaned over the water again, very slowly this time, and gave a small, shy smile. And the tiger in the pool smiled back — a warm, friendly smile. "That's... me?" he breathed. "Why, he doesn't look frightening at all. He looks rather... nice." For the first time, Tavi truly looked at himself.` },
        image: IMG, imageAlt: 'A tiger cub smiling gently at his own reflection.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi smiles shyly at his reflection, which smiles warmly back.', composition: 'Cub and friendly reflection.', light: 'Gentle warm light.' }) },
      { id: 7, text: { en: `And what he saw was a fine young tiger indeed — bold orange fur, handsome black stripes, bright clever eyes. "I spent all that time growling at myself," Tavi said softly, "when I could have been making friends. If that tiger is me... then I think I should like to be his friend."` },
        image: IMG, imageAlt: 'A tiger cub gazing kindly at himself in the water.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tavi gazes kindly at his own fine reflection, ready to befriend himself.', composition: 'Cub at peace with his image.', light: 'Warm reflective light.' }) },
      { id: 8, text: { en: `The wise elephant nodded. "That is the best friend you will ever have, little one — the one in the water, who is always with you. Be kind to him, and brave for him, and proud of him. For when you are a friend to yourself, you carry that friendship everywhere you go."` },
        image: IMG, imageAlt: 'An elephant and a content tiger cub by the pool.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'The elephant shares her gentle wisdom as Tavi sits content by the pool.', composition: 'Elephant and peaceful cub.', light: 'Soft golden light.' }) },
      { id: 9, text: { en: `Tavi padded home that day standing a little taller. Whenever he felt unsure, he would think of the fine tiger in the pool — himself — and remember to be kind and brave on his own behalf. And little by little, the shy cub grew into a fine big tiger, proud at last to be exactly who he was.` },
        image: IMG, imageAlt: 'A confident young tiger walking proudly through the jungle.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'A more confident Tavi walks proudly home through the jungle, at peace with himself.', composition: 'Self-assured young tiger striding on.', light: 'Bright proud light.' }) }
    ],
    closing: {
      text: { en: `For the one you see in the water goes with you all your life — so be kind to yourself, and brave for yourself, and you will never lack a friend.` },
      image: IMG, imageAlt: 'A calm jungle pool reflecting the green leaves above.',
      imagePrompt: P({ scene: 'End vignette: a calm, clear jungle pool quietly reflecting the green leaves above.', composition: 'Simple still pool and reflection.', light: 'Peaceful dappled glow.' })
    }
  }));
})(window.APP);

// ─── Owl's Night School ───────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: everyone can learn, each in their own way
// and their own time — and learning is a joy.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/owl.svg';
  var CAST = {
    owl: `Professor Olive the owl: a wise, kindly tawny owl with round spectacles, soft feathers and warm, patient eyes, perched by a little lantern.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'owls-night-school',
    title:    { en: "Owl's Night School" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'midnight', board: null, color: '#3a3454',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['owl'], coverAnimal: 'owl',
    requirements: [{ animalId: 'owl', minCount: 1, label: 'Find the Owl' }],
    cover: {
      image: IMG, imageAlt: 'A wise owl with spectacles teaching by lantern-light at night.',
      imagePrompt: P({ cast: [CAST.owl], scene: 'Professor Olive the owl teaches young animals by warm lantern-light in a moonlit clearing.', composition: 'Owl teacher and small pupils by a lantern.', light: 'Warm lantern glow against night blue.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a great old oak, by the light of a little lantern, Professor Olive the owl kept a Night School for all the young animals of the wood. Every evening, when the moon came up, the little ones would gather round to learn — about the stars, the seasons, the names of the trees, and a hundred wonderful things.` },
        image: IMG, imageAlt: 'Young animals gathering to learn from a wise owl at night.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Young animals gather by lantern-light to learn from Professor Olive the owl.', composition: 'Owl teaching a circle of small pupils.', light: 'Cosy lantern glow.' }) },
      { id: 2, text: { en: `All the young animals loved Night School — all except one. A little dormouse named Dot was sure she was not clever at all. The others seemed to learn so quickly, while she had to think things over slowly, and sometimes she got muddled. "I'm just not clever," she sighed. "Not like the others."` },
        image: IMG, imageAlt: 'A small dormouse feeling she is not clever in class.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Little Dot the dormouse sits glumly, certain she is not clever like the others.', composition: 'Downcast dormouse among eager pupils.', light: 'Soft lantern light.' }) },
      { id: 3, text: { en: `One evening, when Professor Olive asked a question, the clever young fox answered in a flash, and the quick rabbit right after. Dot knew the answer too — but by the time she had thought it carefully through, the moment had passed. She crept away afterward, feeling small and slow and silly.` },
        image: IMG, imageAlt: 'A dormouse creeping sadly away from class.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Dot creeps sadly away from the lantern-lit class, feeling slow and silly.', composition: 'Lonely dormouse leaving the lesson.', light: 'Fading lantern glow.' }) },
      { id: 4, text: { en: `But the wise old owl had seen everything, and she came to sit beside the little dormouse. "Dot," she said gently, "do you know what I noticed tonight? When the others answered quickly, they often answered wrong. But you — you took your time, and thought it through, and when you finally spoke, you were exactly right."` },
        image: IMG, imageAlt: 'A wise owl gently encouraging a sad dormouse.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Professor Olive sits beside Dot and gently encourages her.', composition: 'Owl and dormouse in kindly talk.', light: 'Warm lantern glow.' }) },
      { id: 5, text: { en: `"Cleverness is not about being FAST, little one," the owl went on. "Some minds are quick like the fox, and some are deep and careful like yours. Quick is not better than careful — they are simply different. The fox learns one way, and you another. But you BOTH learn, and that is what matters."` },
        image: IMG, imageAlt: 'An owl teaching a dormouse about different ways of learning.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Professor Olive explains that there are many different ways of being clever.', composition: 'Owl teaching the attentive dormouse.', light: 'Soft warm light.' }) },
      { id: 6, text: { en: `Dot thought about this. "So... I'm not slow," she said slowly. "I'm... careful?" "Exactly!" beamed the owl. "And careful is a wonderful thing to be. Now — shall we find the way of learning that suits YOU best? For everyone has their own, and the trick is simply to find it."` },
        image: IMG, imageAlt: 'A dormouse beginning to smile, encouraged by the owl.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Dot begins to smile as she realises careful is its own kind of clever.', composition: 'Brightening dormouse with the owl.', light: 'Warming hopeful light.' }) },
      { id: 7, text: { en: `So the kind owl let Dot learn in her own careful way. She gave her time to think. She let her draw pictures of what she learned, and whisper the answers softly when she was ready. And without the rush, Dot found she could learn anything at all — and remember it better than anyone, too.` },
        image: IMG, imageAlt: 'A happy dormouse learning at her own pace by lantern-light.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Dot happily learns in her own careful way, drawing and thinking by lantern-light.', composition: 'Content dormouse learning at her own pace.', light: 'Cosy lantern glow.' }) },
      { id: 8, text: { en: `Before long, Dot was one of the brightest pupils in the whole Night School — not because she had changed, but because she had stopped trying to learn like the fox, and started learning like herself. And whenever a new little creature felt slow or silly, it was Dot who knew just what to say.` },
        image: IMG, imageAlt: 'A confident dormouse helping a younger pupil learn.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'A confident Dot kindly helps a younger, worried pupil at Night School.', composition: 'Dormouse helping a smaller animal learn.', light: 'Warm encouraging light.' }) },
      { id: 9, text: { en: `And so Owl's Night School went on, evening after evening, full of young animals all learning in their own wonderful ways — the quick ones and the careful ones, the bold ones and the shy. For Professor Olive knew the truest lesson of all: that everyone can learn, each in their own way and their own good time.` },
        image: IMG, imageAlt: 'A wise owl teaching a happy class of all kinds of young animals.',
        imagePrompt: P({ cast: [CAST.owl], scene: 'Professor Olive happily teaches a thriving class of all kinds of young animals.', composition: 'Owl and joyful pupils by lantern-light.', light: 'Warm lantern glow in the moonlit wood.' }) }
    ],
    closing: {
      text: { en: `For everyone can learn — the quick and the careful, the bold and the shy — each in their own way and their own good time. And learning, however you do it, is a joy.` },
      image: IMG, imageAlt: 'A little lantern glowing warmly in a moonlit oak tree.',
      imagePrompt: P({ scene: 'End vignette: a little lantern glowing warmly on a branch of a moonlit oak.', composition: 'Simple still life, lantern in the tree.', light: 'Warm glow against the night.' })
    }
  }));
})(window.APP);

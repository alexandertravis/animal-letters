// ─── The Panda Who Shared His Bamboo ──────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: there is more than enough when we share.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/panda.svg';
  var CAST = {
    panda: `Bao the panda: a round black-and-white panda with soft fur, gentle dark-patched eyes and a calm, kindly manner, munching bamboo.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'panda-bamboo-share',
    title:    { en: "The Panda Who Shared His Bamboo" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'forest', board: null, color: '#3f5a3a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['panda'], coverAnimal: 'panda',
    requirements: [{ animalId: 'panda', minCount: 1, label: 'Find the Panda' }],
    cover: {
      image: IMG, imageAlt: 'A panda sitting happily in a green bamboo grove.',
      imagePrompt: P({ cast: [CAST.panda], scene: 'Bao the panda sits happily munching in a lush green bamboo grove.', composition: 'Panda among tall green bamboo.', light: 'Soft misty mountain light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `High in the misty green mountains lived a panda named Bao, who was lucky enough to live beside the finest bamboo grove for miles around. Tall, sweet, tender bamboo grew there in great green thickets — far, far more than one panda could ever eat. Bao munched contentedly there all day long.` },
        image: IMG, imageAlt: 'A panda munching in a lush bamboo grove.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao munches contentedly in his lush, plentiful bamboo grove.', composition: 'Panda surrounded by green bamboo.', light: 'Gentle misty light.' }) },
      { id: 2, text: { en: `One grey morning, a thin and weary stranger appeared at the edge of the grove — a young panda named Mei, who had travelled a long, hungry way over the mountains. "Please," she said softly, "I have not eaten in two whole days. Might I share just a little of your bamboo?"` },
        image: IMG, imageAlt: 'A thin, weary panda arriving hungry at the bamboo grove.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'A thin, weary young panda arrives hungry at the edge of Bao\'s bamboo grove.', composition: 'Tired traveller panda at the grove edge.', light: 'Soft grey morning light.' }) },
      { id: 3, text: { en: `Now Bao had never had to share his grove before, and for just a moment, a small selfish thought flickered in his mind. "But it's MY bamboo," it whispered. "What if there isn't enough? What if she eats it all?" He looked at his huge green grove, and then at the hungry little stranger.` },
        image: IMG, imageAlt: 'A panda hesitating, looking at his grove and the hungry stranger.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao hesitates, glancing between his vast grove and the hungry young panda.', composition: 'Panda torn, grove on one side, traveller on the other.', light: 'Soft thoughtful light.' }) },
      { id: 4, text: { en: `Then Bao felt ashamed of the selfish thought. He looked again at his grove — so tall, so green, so endless — and at poor hungry Mei, and the choice was easy after all. "Of course you may share," he said warmly. "Come in, come in! There is far more here than I could ever eat alone."` },
        image: IMG, imageAlt: 'A kind panda welcoming the hungry stranger into his grove.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao warmly welcomes Mei into his bamboo grove to share.', composition: 'Panda gesturing welcome, grateful traveller.', light: 'Warming light.' }) },
      { id: 5, text: { en: `So the two pandas sat down together and ate, and ate, and ate. Mei nibbled until she was full at last, the colour returning to her cheeks. And do you know — for all the two of them munched, the great green grove did not look one bit smaller. There was plenty, and more than plenty, for them both.` },
        image: IMG, imageAlt: 'Two pandas happily eating bamboo together.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao and Mei munch bamboo happily together in the plentiful grove.', composition: 'Two pandas sharing the bamboo.', light: 'Cheerful soft light.' }) },
      { id: 6, text: { en: `As they ate, the two pandas talked and laughed and told each other stories, and Bao discovered something wonderful: sharing his bamboo with a friend made the whole grove feel happier than it ever had when he ate there alone. The munching was merrier; the day was brighter. He had gained far more than he gave.` },
        image: IMG, imageAlt: 'Two pandas laughing and talking as they share a meal.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao and Mei laugh and share stories as they eat together.', composition: 'Two happy pandas in conversation.', light: 'Warm friendly light.' }) },
      { id: 7, text: { en: `Mei grew strong again, and stayed to be Bao's friend and neighbour. Together they tended the grove, clearing the old stalks so fresh green shoots could grow, and the bamboo flourished better than ever — for two pandas caring for it could do far more than one.` },
        image: IMG, imageAlt: 'Two pandas tending a flourishing bamboo grove together.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao and Mei tend the bamboo grove together, and it flourishes.', composition: 'Two pandas caring for the thriving grove.', light: 'Bright thriving light.' }) },
      { id: 8, text: { en: `Word spread through the mountains of the kind panda who shared his grove, and now and then another weary traveller would arrive, hungry and hopeful. And every time, Bao welcomed them in. "There is always enough," he would say, "when we are willing to share it."` },
        image: IMG, imageAlt: 'A panda welcoming more travellers to share his grove.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Bao warmly welcomes another weary traveller to share the bamboo grove.', composition: 'Generous panda greeting new friends.', light: 'Warm welcoming light.' }) },
      { id: 9, text: { en: `And so the lonely grove where one panda once ate alone became a happy gathering place full of friends. Bao never went hungry, and never felt lonely again. For he had learned the simplest, truest thing: that the more good things we share, the more there always seems to be.` },
        image: IMG, imageAlt: 'Many happy pandas sharing a flourishing bamboo grove.',
        imagePrompt: P({ cast: [CAST.panda], scene: 'Many happy pandas now share Bao\'s flourishing, welcoming bamboo grove.', composition: 'Grove full of friendly pandas together.', light: 'Warm golden light.' }) }
    ],
    closing: {
      text: { en: `For the good things we cling to alone stay small and lonely — but the good things we share have a way of growing, and growing, and growing.` },
      image: IMG, imageAlt: 'A fresh green bamboo shoot rising in the misty grove.',
      imagePrompt: P({ scene: 'End vignette: a fresh green bamboo shoot rising in the soft misty grove.', composition: 'Simple still life, one bamboo shoot.', light: 'Gentle misty glow.' })
    }
  }));
})(window.APP);

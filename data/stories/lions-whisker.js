// ─── The Lion's Whisker ───────────────────────────────────────────────────────
// Gentle retelling of the folk tale. ~9 pages. Moral: trust is won slowly, with
// patience and gentleness — never by force.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/lion.svg';
  var CAST = {
    lion: `the old lion: a great golden lion with a shaggy mane, sad and lonely eyes, and a wary, gentle heart beneath his fearsome look.`,
    mouse: `Mira the mouse: a small brown mouse with a brave, kind heart and bright eyes.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'lions-whisker',
    title:    { en: "The Lion's Whisker" },
    subtitle: 'a folk tale',
    skin: 'classic', leather: 'gold', board: null, color: '#caa23a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['lion', 'mouse'], coverAnimal: 'lion',
    requirements: [{ animalId: 'lion', minCount: 1, label: 'Find the Lion' }],
    cover: {
      image: IMG, imageAlt: 'A great golden lion resting alone in the grasslands.',
      imagePrompt: P({ cast: [CAST.lion], scene: 'The great old lion rests alone in the golden grasslands, looking lonely.', composition: 'Solitary lion in wide grassland.', light: 'Warm lonely savanna light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `At the edge of the grasslands lived a great old lion, all alone. He had a fearsome roar and a magnificent mane, and every creature kept far, far away from him. But the truth was that the old lion was terribly lonely, and he longed, more than anything, for just one friend.` },
        image: IMG, imageAlt: 'A lonely old lion sitting by himself.',
        imagePrompt: P({ cast: [CAST.lion], scene: 'The lonely old lion sits by himself, longing for a friend.', composition: 'Lion alone, empty grassland.', light: 'Soft melancholy light.' }) },
      { id: 2, text: { en: `Now a little mouse named Mira lived nearby, and her kind heart ached to see the lion so sad and lonely. "I shall be his friend," she decided. But when she crept near, the lion gave a great startled ROAR, and Mira scampered away with her heart pounding. Making friends with a lion, it seemed, would not be easy.` },
        image: IMG, imageAlt: 'A little mouse startled away by a lion\'s roar.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'The lion roars in surprise and little Mira the mouse scampers away.', composition: 'Roaring lion, fleeing mouse.', light: 'Bright startled light.' }) },
      { id: 3, text: { en: `Mira went to the wise old tortoise for advice. "How can I ever befriend such a fearsome lion?" she asked. The tortoise thought slowly. "Trust cannot be hurried, little one," he said. "You must win it the way you grow a garden — gently, patiently, a little each day. Do not rush, and do not force."` },
        image: IMG, imageAlt: 'A wise tortoise giving advice to a little mouse.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'The wise old tortoise gives Mira gentle, patient advice.', composition: 'Tortoise and attentive mouse.', light: 'Calm soft light.' }) },
      { id: 4, text: { en: `So Mira began, ever so patiently. On the first day, she left a single sweet berry at the very edge of the lion's clearing, then tiptoed away before he woke. The lion found it, sniffed it, and ate it up, puzzled but pleased. Who could have left him such a kindness?` },
        image: IMG, imageAlt: 'A mouse leaving a berry at the edge of a lion\'s clearing.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'Mira leaves a single berry at the edge of the lion\'s clearing and tiptoes away.', composition: 'Tiny mouse, distant resting lion.', light: 'Gentle dawn light.' }) },
      { id: 5, text: { en: `Each day, Mira left her gift a tiny bit closer. A little nearer, and a little nearer, day by day by day. The lion grew used to the small brown mouse who brought him berries, and slowly — so slowly — he stopped roaring when he saw her, and began instead to look forward to her coming.` },
        image: IMG, imageAlt: 'A mouse bringing a berry a little closer to a calmer lion.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'Day by day Mira brings her berry closer; the lion grows calm and watchful.', composition: 'Mouse approaching, lion no longer afraid.', light: 'Warming patient light.' }) },
      { id: 6, text: { en: `Many days passed, and a gentle trust grew between them, soft and sure as a seedling. At last there came a morning when Mira walked right up to the great lion and laid the berry by his paw — and he did not roar at all. He only looked at her with his big sad eyes, and gave the smallest, warmest rumble.` },
        image: IMG, imageAlt: 'A mouse placing a berry by a calm lion\'s paw.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'Mira walks right up and places a berry by the lion\'s paw; he rumbles warmly.', composition: 'Mouse beside the gentle lion\'s great paw.', light: 'Tender golden light.' }) },
      { id: 7, text: { en: `"You are the one who has been so kind to me," the lion said softly. "Day after day, you never gave up, never rushed me, never made me afraid. Little mouse — you have done what no creature has ever managed before. You have made a lonely old lion smile." And smile he did, a great warm lion's smile.` },
        image: IMG, imageAlt: 'A lion smiling warmly at his new little friend.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'The lion smiles warmly at Mira, his loneliness melted away.', composition: 'Lion and mouse, a friendship born.', light: 'Warm joyful light.' }) },
      { id: 8, text: { en: `From that day on, the great lion and the little mouse were the closest of friends. They shared their meals and their long sunny afternoons, and Mira would even curl up to nap in the soft warmth of the lion's mane. The lion was never lonely again, all because one small mouse had been so patient.` },
        image: IMG, imageAlt: 'A little mouse napping happily in a lion\'s mane.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'Mira naps cosily in the lion\'s warm mane, the two now firm friends.', composition: 'Mouse nestled in the lion\'s mane.', light: 'Warm peaceful light.' }) },
      { id: 9, text: { en: `And to mark their friendship, the great lion gave Mira one of his own long whiskers to keep — a gift no lion gives lightly, and only to one he truly trusts. "How did you win a lion's whisker?" the other animals marvelled. Mira smiled. "Not by force, and not in a hurry," she said. "Only with patience and kindness, a little each day — until a frightened heart was ready to trust."` },
        image: IMG, imageAlt: 'A lion giving a tiny mouse one of his whiskers as a keepsake.',
        imagePrompt: P({ cast: [CAST.lion, CAST.mouse], scene: 'The great lion gives Mira one of his long whiskers as a token of trust while the animals look on.', composition: 'Lion offering a whisker to the small mouse, onlookers around.', light: 'Bright warm light.' }) }
    ],
    closing: {
      text: { en: `For trust is like a whisker on a lion — it can never be snatched by force, only earned, gently and patiently, a little at a time.` },
      image: IMG, imageAlt: 'A single golden grass-stalk swaying in the savanna at dusk.',
      imagePrompt: P({ scene: 'End vignette: a single golden grass-stalk swaying in the quiet savanna at dusk.', composition: 'Simple still life, grass against the sky.', light: 'Soft golden dusk.' })
    }
  }));
})(window.APP);

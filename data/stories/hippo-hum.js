// ─── The Hippo Who Hummed ─────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: sharing what you love can bring everyone together.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    hippo: `Hetty the hippo: a big round river hippo with a wide smile and a deep, warm humming voice, shy about her singing but full of gentle music.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'hippo-hum',
    title:    { en: "The Hippo Who Hummed" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sky', color: '#5a86a8',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['hippo'], coverAnimal: 'hippo',
    requirements: [{ animalId: 'hippo', minCount: 1, label: 'Find the Hippo' }],
    cover: {
      image: 'assets/images/cartoon/hippo.svg',
      imageAlt: 'A happy hippo half-submerged in a river, humming, with ripples spreading around her.',
      imagePrompt: P({ cast: [CAST.hippo], scene: 'Hetty the hippo hums in a calm river, gentle ripples spreading out around her in rings.', composition: 'Hippo centred, concentric ripples.', light: 'Warm river light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Hetty the hippo had a secret. Down in the cool of the river, where no one could quite hear, she liked to hum. Deep, warm hums that made the water tremble in gentle rings all around her.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A hippo humming quietly underwater, ripples spreading.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hetty hums quietly half-under the river, the water rippling softly around her.', composition: 'Hippo low in calm water, ripples.', light: 'Soft underwater-edge light.' }) },
      { id: 2, text: { en: `But she was far too shy to hum where others might hear. "A hippo is meant to be big and splashy," she thought, "not soft and musical." So she kept her humming for the quiet, deep parts of the river, all to herself.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A shy hippo peeking from the reeds at other animals.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hetty peeks shyly from the reeds at the other river animals, keeping her humming secret.', composition: 'Hippo half-hidden in reeds.', light: 'Dappled reed light.' }) },
      { id: 3, text: { en: `One night a terrible storm came. Thunder boomed and lightning cracked, and all the little animals of the riverbank huddled together, frightened and unable to sleep. The smallest ones cried for their mothers.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'Small animals huddled together on a riverbank in a storm.',
        imagePrompt: P({ scene: 'Small river animals huddle together fearfully on the bank as a storm flashes overhead.', composition: 'Cluster of frightened animals, stormy sky.', light: 'Flashing storm light.' }) },
      { id: 4, text: { en: `Hetty saw how frightened they were, and her gentle heart ached. Without quite thinking, she began, very softly, to hum — a slow, deep, soothing tune, the kind she hummed to herself in the quiet water.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A hippo beginning to hum softly toward frightened animals in the storm.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hetty begins to hum softly toward the huddled, frightened animals in the rain.', composition: 'Hippo turned gently toward the group.', light: 'Soft glow amid storm.' }) },
      { id: 5, text: { en: `The deep hum rolled across the water and over the bank, warm and steady, steadier than the thunder. One by one, the little animals stopped trembling. The hum seemed to wrap around them like a warm, safe blanket.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'Animals calming as a hippo’s hum spreads warmly over them.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'The animals calm as Hetty\'s warm hum seems to wrap around them like a blanket.', composition: 'Soothed animals, hippo humming nearby.', light: 'Gentle warm light through rain.' }) },
      { id: 6, text: { en: `"What a beautiful sound," whispered a tiny mouse, no longer afraid. "Is that you, Hetty?" Hetty almost stopped, shy again — but the little faces looked so peaceful that she kept on humming through the whole long storm.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A small mouse listening peacefully to a humming hippo.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'A tiny mouse listens peacefully as Hetty keeps gently humming.', composition: 'Close on listening mouse, hippo behind.', light: 'Soft calming light.' }) },
      { id: 7, text: { en: `By the time the storm rolled away, every little animal had drifted off to sleep, soothed and safe. Hetty hummed until the last of them was dreaming, and only then did she let her own tired eyes close.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'Sleeping animals and a content hippo as the storm clears.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'The little animals sleep peacefully as the storm clears and Hetty rests at last.', composition: 'Sleeping group, calm hippo, clearing sky.', light: 'Soft clearing moonlight.' }) },
      { id: 8, text: { en: `In the morning, the whole riverbank wanted to hear Hetty hum again. "Please," they begged, "it was the most wonderful sound." And Hetty, blushing but proud, hummed them a bright morning tune in the warm new sun.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A hippo humming happily as animals gather to listen in the morning.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hetty hums a bright tune in the morning sun as the animals gather happily to listen.', composition: 'Hippo performing, eager audience.', light: 'Fresh golden morning.' }) },
      { id: 9, text: { en: `"I always thought my hum was too soft to matter," said Hetty. "But it turned out to be exactly what everyone needed." And never again did she keep her music only to the quiet, deep parts of the river.` },
        image: 'assets/images/cartoon/hippo.svg', imageAlt: 'A proud, happy hippo humming openly in the sunny river.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'A proud, happy Hetty hums openly in the sunny river, no longer shy.', composition: 'Confident hippo, bright river.', light: 'Warm full sunlight.' }) }
    ],
    closing: {
      text: { en: `And on calm evenings, if you sit very still by the river, you may still hear the deep, warm hum of the hippo who learned to share her song.` },
      image: 'assets/images/cartoon/hippo.svg', imageAlt: 'Gentle ripple rings spreading across a calm evening river.',
      imagePrompt: P({ scene: 'End vignette: soft concentric ripple rings spreading across a calm river at dusk.', composition: 'Minimal ripples on still water.', light: 'Quiet dusk glow.' })
    }
  }));
})(window.APP);

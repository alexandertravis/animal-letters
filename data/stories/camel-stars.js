// ─── The Camel Who Carried the Stars ──────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: patience and steadiness carry you through.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    camel: `Cassia the camel: a tall sand-coloured camel with long lashes and a calm, patient gaze, sure-footed and steady across the great desert, carrying a little lantern on her saddle.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'camel-stars',
    title:    { en: "The Camel Who Carried the Stars" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'amber', board: null, color: '#c79434',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['camel'], coverAnimal: 'camel',
    requirements: [{ animalId: 'camel', minCount: 1, label: 'Find the Camel' }],
    cover: {
      image: 'assets/images/cartoon/camel.svg',
      imageAlt: 'A camel walking across a moonlit desert beneath a sky full of stars.',
      imagePrompt: P({ cast: [CAST.camel], scene: 'Cassia the camel walks steadily across moonlit dunes beneath a vast sky of stars, a small lantern glowing on her saddle.', composition: 'Camel small against huge starry sky and dunes.', light: 'Cool moonlight, warm lantern glow.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Cassia the camel knew the desert better than anyone. By day the sand was blazing gold and the sun beat down hard, so the wise travellers of the desert did most of their walking by night, when it was cool and the stars came out.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel resting in shade during the hot desert day.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cassia rests calmly in a patch of shade during the blazing desert day.', composition: 'Camel at rest, golden dunes shimmering.', light: 'Harsh bright desert sun.' }) },
      { id: 2, text: { en: `One evening a small lost firefly landed on Cassia's nose, its little light flickering weakly. "I have flown so far from the oasis," it said, "and I am too tired to glow much longer. Please — can you carry me home across the sand?"` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A tiny firefly resting on a camel’s nose at dusk.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'A small weary firefly with a faint glow rests on Cassia\'s nose at dusk.', composition: 'Close on camel\'s nose and tiny light.', light: 'Soft dusk, faint firefly glow.' }) },
      { id: 3, text: { en: `"Of course," said Cassia kindly. "Climb into my lantern, where the glass will keep you safe, and I will walk you home." And as the firefly settled in, the cool desert night came down, and the first stars pricked the sky.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel with a glowing lantern as stars appear.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The firefly settles into the lantern on Cassia\'s saddle as the first stars appear.', composition: 'Glowing lantern, darkening starry sky.', light: 'Twilight blue with lantern glow.' }) },
      { id: 4, text: { en: `On and on Cassia walked, slow and steady, across the great dark dunes. The sand was soft and shifting, and other creatures might have slipped or strayed — but Cassia placed each broad foot surely, never hurrying, never stopping.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel walking steadily across dark dunes under stars.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cassia walks steadily across vast dark dunes under a sky thick with stars.', composition: 'Lone camel, sweeping starlit dunes.', light: 'Cool starlight, warm lantern.' }) },
      { id: 5, text: { en: `The firefly looked up through the lantern glass at the millions of stars. "They look just like my friends and me," it said softly, "all the little lights, scattered across the dark." Cassia smiled. "Then you are never truly far from home," she said.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A firefly in a lantern gazing up at a starry sky.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The firefly gazes up through the lantern glass at the countless stars overhead.', composition: 'Lantern foreground, immense starfield above.', light: 'Brilliant starlight.' }) },
      { id: 6, text: { en: `A cold wind rose and the sand began to whip and sting. The firefly's light wavered with fright. But Cassia simply lowered her long lashes against the grit, turned her steady shoulder to the wind, and kept on walking, calm as ever.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel walking calmly into a desert wind, lashes lowered.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cassia walks calmly into a rising sandy wind, long lashes lowered, lantern steady.', composition: 'Camel braced against blowing sand.', light: 'Dim windblown starlight, lantern glow.' }) },
      { id: 7, text: { en: `"How are you not afraid?" asked the firefly. "Because I do not need to see the whole journey," said Cassia. "I only need to take the next step, and then the next. Steady feet will carry you anywhere, even through a storm."` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel placing one steady foot forward in the sand.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'A close view of Cassia placing one broad foot surely on the sand, calm and certain.', composition: 'Focus on the steady footfall.', light: 'Soft lantern light on sand.' }) },
      { id: 8, text: { en: `At last, as the sky began to pale, the dark shapes of the oasis palms rose ahead, and a hundred tiny lights came dancing out to meet them — the firefly's whole family, overjoyed. "You carried our little one home!" they cried.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'Many fireflies welcoming a camel arriving at a palm oasis at dawn.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'A swarm of joyful fireflies dances out from a palm oasis to greet Cassia at dawn.', composition: 'Camel arriving, cloud of tiny lights.', light: 'Pale dawn with dancing firefly glow.' }) },
      { id: 9, text: { en: `Cassia opened the lantern and the little firefly flew up to join its family, glowing bright and strong again. "Thank you, steady friend," it called. And Cassia, who had carried a whole little star across the desert, turned for home as the sun came up.` },
        image: 'assets/images/cartoon/camel.svg', imageAlt: 'A camel watching fireflies reunite at an oasis at sunrise.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cassia watches contentedly as the firefly reunites with its glowing family at sunrise.', composition: 'Camel and oasis, warm reunion glow.', light: 'Warm pink-gold sunrise.' }) }
    ],
    closing: {
      text: { en: `And the fireflies of the oasis always said that the steadiest light in all the desert was not in the sky at all — but in the patient heart of a camel.` },
      image: 'assets/images/cartoon/camel.svg', imageAlt: 'A small glowing lantern resting on the sand at dawn.',
      imagePrompt: P({ scene: 'End vignette: a small warm lantern resting on smooth desert sand as dawn breaks.', composition: 'Simple still life, lantern on sand.', light: 'Gentle dawn glow.' })
    }
  }));
})(window.APP);

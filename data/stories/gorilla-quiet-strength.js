// ─── The Gorilla's Quiet Strength ─────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: true strength is gentle, and is best used
// to protect and to help.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/gorilla.svg';
  var CAST = {
    gorilla: `Goro the gorilla: a huge, powerful silverback gorilla with broad shoulders, big gentle hands and calm, wise eyes.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'gorilla-quiet-strength',
    title:    { en: "The Gorilla's Quiet Strength" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'charcoal', board: null, color: '#4a4a4a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['gorilla'], coverAnimal: 'gorilla',
    requirements: [{ animalId: 'gorilla', minCount: 1, label: 'Find the Gorilla' }],
    cover: {
      image: IMG, imageAlt: 'A large gentle gorilla sitting calmly in a green forest.',
      imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro the gorilla sits calmly and powerfully among the green forest leaves.', composition: 'Big gorilla at rest in the forest.', light: 'Soft green forest light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Deep in the green mountain forest lived a gorilla named Goro, the biggest and strongest creature for miles. With his great arms he could bend a thick branch like a blade of grass. But Goro almost never showed how strong he was, for he was the gentlest of giants, calm and quiet and kind.` },
        image: IMG, imageAlt: 'A big gentle gorilla resting peacefully in the forest.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro rests peacefully in the forest, gentle despite his great strength.', composition: 'Calm powerful gorilla among leaves.', light: 'Dappled green light.' }) },
      { id: 2, text: { en: `Some of the younger animals did not understand this. "What good is being so strong," chattered a cheeky young monkey, "if you never use it? You should show off! You should thump your chest and make everyone do as you say!" Goro just smiled. "Strength is not for showing off," he rumbled softly. "It is for helping."` },
        image: IMG, imageAlt: 'A cheeky monkey questioning a calm gorilla.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'A cheeky young monkey questions Goro, who answers calmly.', composition: 'Gorilla and chattering monkey.', light: 'Bright forest light.' }) },
      { id: 3, text: { en: `The monkey did not really believe him. But one stormy afternoon, the sky turned black and the wind began to howl, fiercer and fiercer, until a great old tree at the forest's edge gave an awful groan and began to topple — straight toward the little clearing where the smallest animals were sheltering!` },
        image: IMG, imageAlt: 'A great tree beginning to topple toward small animals in a storm.',
        imagePrompt: P({ scene: 'A huge old tree begins to topple in a fierce storm toward small sheltering animals.', composition: 'Falling tree, tiny animals beneath.', light: 'Dark dramatic storm light.' }) },
      { id: 4, text: { en: `There was no time to run. The little ones froze in terror beneath the falling tree. But Goro moved like lightning. In two great bounds he was there, and he threw up his huge arms and CAUGHT the toppling trunk, holding its enormous weight high above the trembling animals' heads.` },
        image: IMG, imageAlt: 'A mighty gorilla catching a falling tree above small animals.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro catches the falling tree with his mighty arms, holding it above the small animals.', composition: 'Gorilla straining under the great trunk, animals safe below.', light: 'Dramatic storm light.' }) },
      { id: 5, text: { en: `Goro's muscles strained and his feet dug deep, but he held the great tree steady — steady as a mountain — while the little animals scrambled out from underneath to safety. "Go! Quickly! I have it!" he called gently, his voice as calm as ever even under that enormous weight.` },
        image: IMG, imageAlt: 'A gorilla holding up a tree while small animals escape.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro holds the tree steady while the little animals scramble out to safety.', composition: 'Gorilla bracing the trunk, animals fleeing clear.', light: 'Tense stormy light.' }) },
      { id: 6, text: { en: `Only when every last little creature was safely clear did Goro, with a great heave, push the fallen tree gently aside, so that it came to rest on the ground without harming a soul. Then he stood up straight, breathing hard, and the storm blew itself out, and all was still and safe once more.` },
        image: IMG, imageAlt: 'A gorilla gently setting down a tree as the storm clears.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro gently lowers the great tree safely to the ground as the storm passes.', composition: 'Gorilla setting down the trunk, calm returning.', light: 'Clearing post-storm light.' }) },
      { id: 7, text: { en: `The little animals crowded round Goro, safe and grateful. The cheeky monkey hung his head. "I'm sorry, Goro," he said. "I thought strength was for showing off and bossing others about. But you used yours to SAVE us. That's... that's the best kind of strong there is." Goro gave him a kind pat.` },
        image: IMG, imageAlt: 'Grateful animals gathered around a gentle gorilla after the storm.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'The grateful animals and the humbled monkey gather around the gentle Goro.', composition: 'Gorilla surrounded by thankful animals.', light: 'Warm relieved light.' }) },
      { id: 8, text: { en: `"Being strong is not about being fierce, or loud, or in charge," Goro told them quietly. "Anyone can knock things down. Real strength is gentle. It lifts others up. It catches what is falling, and shelters what is small. The strongest thing you can ever do is take care of someone weaker than yourself."` },
        image: IMG, imageAlt: 'A wise gorilla teaching the young animals about gentle strength.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro shares his gentle wisdom about true strength with the young animals.', composition: 'Gorilla and attentive little animals.', light: 'Soft golden light.' }) },
      { id: 9, text: { en: `From that day on, the animals of the forest saw Goro's quietness not as weakness, but as the deepest strength of all. And the cheeky monkey grew up to be gentle and helpful too — for he had learned, from the strongest creature he knew, that the greatest power is a kind and careful heart.` },
        image: IMG, imageAlt: 'A gentle gorilla resting peacefully among happy forest animals.',
        imagePrompt: P({ cast: [CAST.gorilla], scene: 'Goro rests peacefully, respected and loved among the forest animals.', composition: 'Content gorilla among friends.', light: 'Warm forest glow.' }) }
    ],
    closing: {
      text: { en: `For the truest strength is never loud or fierce — it is gentle, and careful, and used to lift others up and keep the small ones safe.` },
      image: IMG, imageAlt: 'A strong tree standing firm in a calm green forest.',
      imagePrompt: P({ scene: 'End vignette: a single strong tree standing firm and calm in a green forest.', composition: 'Simple still tree in the forest.', light: 'Peaceful green light.' })
    }
  }));
})(window.APP);

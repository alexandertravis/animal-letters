// ─── Barley the Patient Ox ────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: real strength is steady and patient.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/ox.svg';
  var CAST = {
    ox: `Barley the ox: a great broad-shouldered ox the colour of warm toffee, with a wide kind face, gentle dark eyes and short curved horns; calm, slow-moving and immensely strong, wearing a simple worn leather yoke.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'patient-ox',
    title:    { en: "Barley the Patient Ox" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'russet', board: null, color: '#9a6a3a',
    wordCount: 430, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['ox'], coverAnimal: 'ox',
    requirements: [{ animalId: 'ox', minCount: 1, label: 'Find the Ox' }],
    cover: {
      image: IMG, imageAlt: 'A large gentle ox standing in a green valley at sunrise.',
      imagePrompt: P({ cast: [CAST.ox], scene: 'Barley the ox stands calmly in a green valley at sunrise, a wooden plough resting behind him.', composition: 'Ox centred and solid, soft hills behind.', light: 'Warm low sunrise gold.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In the green valley of Mossback Farm lived an ox named Barley. He was the strongest creature for miles around — he could pull a loaded cart all day and never grumble — yet he was the gentlest too, and he never once bragged about it.` },
        image: IMG, imageAlt: 'A strong ox pulling a cart along a country lane.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'Barley pulls a laden wooden cart steadily along a country lane.', composition: 'Ox and cart in profile, hedgerows behind.', light: 'Soft morning light.' }) },
      { id: 2, text: { en: `Now there was a young horse on the farm named Dash, who was very quick and very proud of it. "You are so SLOW, Barley," he would laugh, kicking up dust as he raced past. "What good is being strong if you plod along like an old log?"` },
        image: IMG, imageAlt: 'A proud young horse racing past a calm ox.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'A proud young horse gallops past, kicking up dust, while Barley stands calm.', composition: 'Horse blurred with speed, ox steady.', light: 'Bright midday.' }) },
      { id: 3, text: { en: `Barley only smiled. "Slow is not the same as weak," he said kindly. But Dash had already galloped away and did not hear. Barley went back to his work, placing one broad hoof in front of the other, steady as the turning seasons.` },
        image: IMG, imageAlt: 'An ox working steadily in a field, smiling gently.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'Barley works on, calm and content, one hoof steadily before the other.', composition: 'Ox mid-stride in a ploughed field.', light: 'Even afternoon light.' }) },
      { id: 4, text: { en: `One grey morning, disaster struck the lane to market. A huge old oak had fallen in the night and lay across the road, and no cart could pass. The pig, the goat and even quick Dash pushed and heaved, but the great trunk would not budge an inch.` },
        image: IMG, imageAlt: 'Farm animals struggling to move a huge fallen tree across a road.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'A pig, a goat and a horse strain against an enormous fallen oak blocking the lane.', composition: 'Animals small against the great trunk.', light: 'Flat grey morning.' }) },
      { id: 5, text: { en: `Dash backed up and charged the trunk again and again, faster and faster — but speed alone did nothing, and soon he stood panting, out of breath and out of ideas. "It's no use," he wheezed. "Nothing can move it. We shall miss the market for sure."` },
        image: IMG, imageAlt: 'A tired horse panting beside an unmoved log.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'The young horse stands panting and defeated beside the unmoved oak.', composition: 'Exhausted horse, huge log.', light: 'Dull overcast.' }) },
      { id: 6, text: { en: `Then Barley came plodding up. He looked at the oak for a long, calm moment. He set his broad shoulder against it, dug in his hooves, and began to push — not in a great rush, but slowly, steadily, leaning his whole patient weight into the wood.` },
        image: IMG, imageAlt: 'A large ox leaning his shoulder against a fallen tree.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'Barley sets his great shoulder to the oak and leans in with calm, steady power.', composition: 'Low angle on the straining ox.', light: 'Soft grey with a hint of sun.' }) },
      { id: 7, text: { en: `Nothing happened at first. Dash began to snigger. But Barley did not stop, and did not hurry. Creak... the oak shifted a hair. Creeeak... it rolled a little. Step by patient step, the great trunk groaned and turned and began to move aside.` },
        image: IMG, imageAlt: 'The fallen tree slowly beginning to roll aside.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'The great oak begins to roll aside under Barley\'s steady push, the other animals watching in awe.', composition: 'Log moving, animals wide-eyed.', light: 'A break of sun through cloud.' }) },
      { id: 8, text: { en: `With one last steady heave the oak rolled clear of the road, and the way to market lay open. The farm animals cheered and stamped. Dash hung his head. "I am sorry, Barley," he said. "I laughed at you, and all along you were the only one who could help."` },
        image: IMG, imageAlt: 'Animals cheering beside a cleared road as an ox rests.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'The animals cheer beside the cleared lane while Barley rests, calm as ever.', composition: 'Joyful group, open road beyond.', light: 'Warm sunshine returning.' }) },
      { id: 9, text: { en: `Barley nuzzled the young horse gently. "There is a time to be quick, Dash, and a time to be steady," he said. "Do not rush past the slow ones. We may just be the friends you need most one day." And from then on, Dash never called him slow again.` },
        image: IMG, imageAlt: 'A gentle ox nuzzling a young horse as friends.',
        imagePrompt: P({ cast: [CAST.ox], scene: 'Barley gently nuzzles Dash; the two stand as friends in the open lane.', composition: 'Ox and horse close, reconciled.', light: 'Golden afternoon glow.' }) }
    ],
    closing: {
      text: { en: `And whenever something was too heavy or too hard at Mossback Farm, they did not call for the fastest — they called for the one who was patient, steady, and strong.` },
      image: IMG, imageAlt: 'An ox\'s wooden yoke resting in the evening light.',
      imagePrompt: P({ scene: 'End vignette: a worn wooden yoke resting on grass in golden evening light.', composition: 'Simple still life, yoke on grass.', light: 'Warm dusk glow.' })
    }
  }));
})(window.APP);

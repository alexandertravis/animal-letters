// ─── The Moose with the Mighty Antlers ────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: the best use of what you have is to help others.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    moose: `Mortimer the moose: a great tall moose with the widest, mightiest antlers in the northern wood, proud of them at first, with a deep kind voice and a slow gentle walk.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'moose-antlers',
    title:    { en: "The Moose with the Mighty Antlers" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'forest', board: null, color: '#3a4a2f',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['moose'], coverAnimal: 'moose',
    requirements: [{ animalId: 'moose', minCount: 1, label: 'Find the Moose' }],
    cover: {
      image: 'assets/images/cartoon/moose.svg',
      imageAlt: 'A great moose with wide antlers standing tall in a northern forest.',
      imagePrompt: P({ cast: [CAST.moose], scene: 'Mortimer the moose stands tall in a pine forest, his wide mighty antlers spreading like branches.', composition: 'Moose centred, antlers spreading wide.', light: 'Cool northern forest light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Mortimer the moose had the mightiest antlers in the whole northern wood. They were wide as a doorway and tall as a young tree, and Mortimer was very proud of them indeed — perhaps a little too proud.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A proud moose showing off his enormous antlers.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'Mortimer stands proudly displaying his enormous antlers to the forest.', composition: 'Moose front-on, antlers dominating frame.', light: 'Bright forest light.' }) },
      { id: 2, text: { en: `"Look at my mighty antlers," he would say to anyone who passed. "Have you ever seen such fine, grand antlers?" The other animals admired them politely, but Mortimer was so busy showing them off that he never did much else.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A moose boasting to small forest animals about his antlers.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'Mortimer boasts of his antlers to a few politely-listening small animals.', composition: 'Moose mid-boast, small audience.', light: 'Dappled forest light.' }) },
      { id: 3, text: { en: `One autumn the rains came hard, and the river rose, and the wood was soon dotted with deep, cold puddles too wide for the small animals to cross. The mice and the rabbits and the little birds were stranded all over, unable to get home.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'Small animals stranded by wide puddles in a flooded wood.',
        imagePrompt: P({ scene: 'Small forest animals are stranded on patches of ground between wide cold puddles after heavy rain.', composition: 'Scattered animals, water between them.', light: 'Grey rainy light.' }) },
      { id: 4, text: { en: `Mortimer watched a little family of mice shivering on a small island of grass, unable to reach the dry bank. His mighty antlers could not help with that, he thought — and then, all at once, he wondered: perhaps they could.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A moose watching shivering mice on a patch of grass, thinking.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'Mortimer watches a family of shivering mice stranded on a grassy island, an idea forming.', composition: 'Moose looking down, stranded mice.', light: 'Soft grey light.' }) },
      { id: 5, text: { en: `He waded into the cold water and laid his great wide antlers down across the puddle, from the grassy island to the dry bank — a fine, broad, antler bridge. "Climb across," he said gently. "My antlers will hold you."` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A moose laying his wide antlers across water as a bridge.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'Mortimer lowers his wide antlers across the water to make a bridge for the mice.', composition: 'Antler-bridge spanning the puddle.', light: 'Cool wet light.' }) },
      { id: 6, text: { en: `The little mice scampered across the antler bridge, one by one, safe and dry, to the bank. Then Mortimer moved to the next stranded creatures, and the next, laying down his mighty antlers as a bridge again and again.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'Mice crossing safely over a moose’s antler bridge.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'Mice scamper safely across Mortimer\'s antler bridge to the dry bank.', composition: 'Line of mice crossing the antlers.', light: 'Grey-bright wet light.' }) },
      { id: 7, text: { en: `All through the cold, wet day, Mortimer carried and bridged and ferried, until every last stranded creature in the wood was safely home. His antlers were splashed with mud, and he was tired and dripping, but his heart was warm.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A tired, muddy but happy moose after helping all the animals.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'A tired, muddy, happy Mortimer stands in the clearing rain after a day of helping.', composition: 'Weary content moose, calming weather.', light: 'Softening grey light.' }) },
      { id: 8, text: { en: `That evening the whole wood gathered to thank him. "Your antlers really are mighty," squeaked a small mouse, "but it wasn't showing them off that made them grand. It was using them to help us." Mortimer felt prouder than he ever had before.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'Forest animals gathered gratefully around a moose at dusk.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'The grateful forest animals gather around Mortimer at dusk to thank him.', composition: 'Moose surrounded by thankful creatures.', light: 'Warm dusk glow.' }) },
      { id: 9, text: { en: `"I used to think my antlers were grand because everyone looked at them," said Mortimer. "Now I know they are grand because of what they can do." And he never again boasted — he simply helped, which is a far finer thing.` },
        image: 'assets/images/cartoon/moose.svg', imageAlt: 'A humble, happy moose standing among friends in the wood.',
        imagePrompt: P({ cast: [CAST.moose], scene: 'A humble, content Mortimer stands among his many new friends in the evening wood.', composition: 'Moose at ease among friends.', light: 'Golden evening light.' }) }
    ],
    closing: {
      text: { en: `And ever after, whenever the rains rose in the northern wood, the small creatures knew that the mightiest antlers of all would come, lay themselves down, and carry them safely home.` },
      image: 'assets/images/cartoon/moose.svg', imageAlt: 'Wide antlers laid across a puddle reflecting the evening sky.',
      imagePrompt: P({ scene: 'End vignette: wide moose antlers laid across a still puddle reflecting the evening sky.', composition: 'Simple reflective still life.', light: 'Soft evening glow.' })
    }
  }));
})(window.APP);

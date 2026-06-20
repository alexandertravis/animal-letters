// ─── The Three Little Kittens ─────────────────────────────────────────────────
// Gentle retelling of the nursery tale. ~9 pages. Moral: take care of your things,
// and put right what you've let go wrong.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/cat.svg';
  var CAST = {
    kittens: `three little kittens: a ginger, a grey and a black-and-white kitten, small, round-eyed and fluffy, wearing tiny knitted mittens.`,
    cat: `Mother Cat: a gentle tabby cat with a kind face and a neat apron.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'three-kittens',
    title:    { en: "The Three Little Kittens" },
    subtitle: 'a nursery tale',
    skin: 'classic', leather: 'mauve', board: null, color: '#8a5a7a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['cat'], coverAnimal: 'cat',
    requirements: [{ animalId: 'cat', minCount: 1, label: 'Find the Cat' }],
    cover: {
      image: IMG, imageAlt: 'Three little kittens wearing tiny mittens in a cosy kitchen.',
      imagePrompt: P({ cast: [CAST.kittens], scene: 'Three little kittens in tiny knitted mittens sit together in a cosy cottage kitchen.', composition: 'Three kittens in a row, warm kitchen.', light: 'Cosy warm indoor light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Once there were three little kittens — a ginger, a grey, and a black-and-white — who lived with their mother in a cosy cottage. One frosty morning, Mother Cat knitted them each a fine pair of woolly mittens to keep their little paws warm. "Take good care of them," she said. "Mittens are not easy to make."` },
        image: IMG, imageAlt: 'A mother cat giving three kittens new mittens.',
        imagePrompt: P({ cast: [CAST.kittens, CAST.cat], scene: 'Mother Cat hands each of her three kittens a new pair of woolly mittens.', composition: 'Mother and three kittens, mittens in paws.', light: 'Warm morning kitchen light.' }) },
      { id: 2, text: { en: `The kittens were delighted, and out they scampered to play in the frosty garden. They rolled and tumbled and chased their tails all morning long. But they were having such fun that they were not very careful — and somewhere among all the rolling and tumbling, all three pairs of mittens slipped off and were lost.` },
        image: IMG, imageAlt: 'Three kittens playing in a frosty garden.',
        imagePrompt: P({ cast: [CAST.kittens], scene: 'The three kittens tumble and play in the frosty garden, mittens slipping off.', composition: 'Kittens at joyful play outdoors.', light: 'Crisp bright frosty light.' }) },
      { id: 3, text: { en: `When they trooped back inside, cold-pawed and hungry, they looked down — and gasped. "Our mittens! We've lost our mittens!" They went to Mother Cat, ears drooping. "Mother," they mewed sadly, "we are so sorry. We have lost our mittens." Mother Cat looked at their bare little paws.` },
        image: IMG, imageAlt: 'Three sorry kittens telling their mother they lost their mittens.',
        imagePrompt: P({ cast: [CAST.kittens, CAST.cat], scene: 'The three kittens sadly tell Mother Cat they have lost their mittens.', composition: 'Drooping kittens, gentle mother.', light: 'Soft indoor light.' }) },
      { id: 4, text: { en: `"Lost your mittens?" said Mother Cat. "Oh, you careless kittens! Then you shall have no warm pie today, for I cannot have my kittens losing the things I work so hard to make." It was not a cruel thing to say — only true — and the kittens hung their heads, for they knew she was right.` },
        image: IMG, imageAlt: 'A mother cat gently scolding three downcast kittens.',
        imagePrompt: P({ cast: [CAST.kittens, CAST.cat], scene: 'Mother Cat gently but firmly tells the downcast kittens there will be no pie.', composition: 'Mother with paw raised, kittens contrite.', light: 'Warm but serious light.' }) },
      { id: 5, text: { en: `The three little kittens did not sulk or stamp their paws. Instead they said, "Then we shall go straight out and find them!" And out they went again into the cold, this time looking carefully — under the bushes, along the wall, beneath the frosty leaves where they had played.` },
        image: IMG, imageAlt: 'Three kittens carefully searching the garden for mittens.',
        imagePrompt: P({ cast: [CAST.kittens], scene: 'The kittens search carefully under bushes and leaves for their lost mittens.', composition: 'Kittens hunting through the garden.', light: 'Cold bright daylight.' }) },
      { id: 6, text: { en: `They searched high and they searched low. The ginger kitten found one pair caught on a thorn bush. The grey kitten found another pair down by the gate. And the black-and-white kitten found the last pair, a little damp, beneath the garden bench. "Hurrah! We've found them, every one!"` },
        image: IMG, imageAlt: 'Kittens happily finding their lost mittens in the garden.',
        imagePrompt: P({ cast: [CAST.kittens], scene: 'The three kittens happily discover all their lost mittens around the garden.', composition: 'Kittens holding up found mittens.', light: 'Bright cheerful light.' }) },
      { id: 7, text: { en: `But the mittens were muddy and damp from their morning outdoors. So the careful kittens did one more thing: they took the mittens to the wash-tub and scrubbed them clean — scrub, scrub, scrub — and hung them by the fire to dry, until they were as good and woolly and warm as new.` },
        image: IMG, imageAlt: 'Three kittens washing their muddy mittens at a tub.',
        imagePrompt: P({ cast: [CAST.kittens], scene: 'The kittens scrub their muddy mittens clean at the wash-tub.', composition: 'Kittens busy washing mittens.', light: 'Warm domestic light.' }) },
      { id: 8, text: { en: `Then they went to Mother Cat once more. "Mother, see — we have found our mittens, AND washed them clean." Mother Cat's whiskers lifted in a proud smile. "What good little kittens, to put things right yourselves!" she purred. "For that, you shall have your warm pie after all."` },
        image: IMG, imageAlt: 'A proud mother cat with three kittens holding clean mittens.',
        imagePrompt: P({ cast: [CAST.kittens, CAST.cat], scene: 'Mother Cat smiles proudly as the kittens show their found and freshly washed mittens.', composition: 'Proud mother, beaming kittens.', light: 'Warm happy light.' }) },
      { id: 9, text: { en: `So the three little kittens sat down to a fine warm pie, their clean mittens drying by the fire, all snug and content. And from that day on, they took the greatest care of their mittens — for they had learned that the things we are given are worth looking after well.` },
        image: IMG, imageAlt: 'Three happy kittens eating pie by the fire, mittens drying.',
        imagePrompt: P({ cast: [CAST.kittens], scene: 'The three kittens happily eat warm pie by the fire, mittens drying nearby.', composition: 'Cosy kittens at their pie.', light: 'Warm firelit glow.' }) }
    ],
    closing: {
      text: { en: `For everyone loses or muddles things sometimes — what matters most is taking care, owning up, and setting things right again.` },
      image: IMG, imageAlt: 'Three tiny woolly mittens drying by a warm fire.',
      imagePrompt: P({ scene: 'End vignette: three pairs of tiny woolly mittens drying on a line by a warm fire.', composition: 'Simple still life, mittens by the hearth.', light: 'Cosy firelit glow.' })
    }
  }));
})(window.APP);

// ─── The Dancing Hippo ────────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: grace and surprise can come in any shape;
// never judge by size alone.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/hippo.svg';
  var CAST = {
    hippo: `Hattie the hippo: a big round purplish-grey hippo with a wide smile and twinkling eyes; large and heavy on land, but light and graceful in the water.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'hippo-dance',
    title:    { en: "The Dancing Hippo" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'teal', board: null, color: '#2f7a7a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['hippo'], coverAnimal: 'hippo',
    requirements: [{ animalId: 'hippo', minCount: 1, label: 'Find the Hippo' }],
    cover: {
      image: IMG, imageAlt: 'A big happy hippo by a sparkling river.',
      imagePrompt: P({ cast: [CAST.hippo], scene: 'Hattie the hippo stands smiling beside a sparkling river.', composition: 'Big cheerful hippo at the riverside.', light: 'Warm bright river light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `By a wide, sparkling river lived a big, cheerful hippo named Hattie, who loved to dance more than anything in the world. The trouble was that on land, Hattie was very big and very heavy, and when she danced on the riverbank her great feet went THUMP, THUMP, THUMP, and the whole ground shook.` },
        image: IMG, imageAlt: 'A big hippo dancing heavily on the riverbank.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hattie dances heavily on the riverbank, her great feet shaking the ground.', composition: 'Big hippo mid-thumping-dance.', light: 'Bright daylight.' }) },
      { id: 2, text: { en: `The other animals giggled behind their paws. "A hippo dancing? How silly!" laughed the gazelles, who were light and quick. "You're far too big to be graceful, Hattie. Leave the dancing to those of us who are built for it." And they pranced away on their dainty legs, leaving Hattie feeling clumsy and sad.` },
        image: IMG, imageAlt: 'Graceful gazelles laughing at a dancing hippo.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Dainty gazelles giggle at Hattie\'s heavy dancing and prance away.', composition: 'Gazelles laughing, hippo downcast.', light: 'Clear daylight.' }) },
      { id: 3, text: { en: `Hattie hung her head. Perhaps they were right. Perhaps a big heavy hippo was just too clumsy to ever be graceful. She lumbered down to the river to cool off, feeling glum — and slipped quietly into the deep, cool water with a gentle splash.` },
        image: IMG, imageAlt: 'A sad hippo slipping into the cool river.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'A glum Hattie slips quietly into the cool, deep river.', composition: 'Hippo sinking into the water.', light: 'Soft watery light.' }) },
      { id: 4, text: { en: `And then — oh! Something magical happened. Under the water, Hattie was not heavy at all. The water held her up, light as a feather, and her great body turned weightless and free. Without even thinking, she began to dance — and beneath the river, Hattie was the most graceful dancer you ever saw.` },
        image: IMG, imageAlt: 'A hippo dancing gracefully and weightlessly underwater.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Underwater, Hattie dances gracefully and weightlessly, light as a feather.', composition: 'Hippo twirling elegantly beneath the surface.', light: 'Dappled blue-green underwater light.' }) },
      { id: 5, text: { en: `She twirled and she glided. She did slow, graceful spins and gentle, floating leaps, her big body moving as lightly and beautifully as a dancer on a stage. Bubbles rose around her like silver applause. In the water — her own special place — Hattie was not clumsy at all. She was magnificent.` },
        image: IMG, imageAlt: 'A hippo twirling beautifully among silver bubbles underwater.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hattie twirls and glides beautifully underwater amid rising silver bubbles.', composition: 'Elegant hippo dance, bubbles like applause.', light: 'Shimmering underwater light.' }) },
      { id: 6, text: { en: `A little fish darted off to fetch the others. "Come and see! Come and SEE!" Soon the gazelles and the birds and all the animals had gathered at the clear riverbank, peering down into the water — and there was Hattie, dancing the most graceful dance any of them had ever witnessed.` },
        image: IMG, imageAlt: 'Animals gathering at the riverbank to watch the dancing hippo.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Animals crowd the clear riverbank, amazed, watching Hattie dance underwater.', composition: 'Onlookers above, dancing hippo below.', light: 'Bright water-reflected light.' }) },
      { id: 7, text: { en: `The gazelles' mouths fell open. "But — Hattie — that's beautiful!" they gasped. "We had no idea! We thought you were too big to be graceful, and all along you just needed the right place to shine!" Hattie surfaced with a happy splash, beaming from ear to ear.` },
        image: IMG, imageAlt: 'Amazed gazelles praising the surfacing hippo.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'The amazed gazelles praise Hattie as she surfaces, beaming.', composition: 'Hippo surfacing, admiring animals around.', light: 'Bright joyful light.' }) },
      { id: 8, text: { en: `"On land I'm big and heavy," laughed Hattie, "and that's just fine — it's good for wallowing and keeping cool! But in the water, I'm light and free. I'm not clumsy OR graceful, you see — I'm both, depending on where I am. And isn't that a lovely thing to be?"` },
        image: IMG, imageAlt: 'A happy hippo half in the water, content with herself.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hattie rests happily half in the water, content and proud of herself.', composition: 'Cheerful hippo at the water\'s edge.', light: 'Warm contented light.' }) },
      { id: 9, text: { en: `After that, the animals came every day to watch Hattie's wonderful water-dances, and they never laughed at her again. And Hattie danced for the pure joy of it, big and heavy on land, light and lovely in the river — proof that there is grace and surprise hidden in every shape, if only you know where to look.` },
        image: IMG, imageAlt: 'A joyful hippo dancing in the river as animals cheer.',
        imagePrompt: P({ cast: [CAST.hippo], scene: 'Hattie dances joyfully in the river as all the animals cheer her on.', composition: 'Dancing hippo, delighted audience.', light: 'Bright celebratory light.' }) }
    ],
    closing: {
      text: { en: `For grace can hide in the most surprising shapes — so never judge by size alone, and always look for the place where each of us can shine.` },
      image: IMG, imageAlt: 'Gentle silver bubbles rising in a calm sunlit river.',
      imagePrompt: P({ scene: 'End vignette: gentle silver bubbles rising in a calm, sunlit river.', composition: 'Simple still water with rising bubbles.', light: 'Bright peaceful glow.' })
    }
  }));
})(window.APP);

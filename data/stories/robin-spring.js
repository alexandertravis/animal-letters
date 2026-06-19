// ─── The First Robin of Spring ────────────────────────────────────────────────
// Original gentle seasonal tale. ~9 pages. Moral: hope and small kindnesses can
// carry others through a long, hard winter.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/robin.svg';
  var CAST = {
    robin: `Rosie the robin: a round little robin with a warm red-orange breast, soft brown wings and a bright cheerful eye, singing on a snowy branch.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'robin-spring',
    title:    { en: "The First Robin of Spring" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'terracotta', board: null, color: '#c4623a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['robin'], coverAnimal: 'robin',
    requirements: [{ animalId: 'robin', minCount: 1, label: 'Find the Robin' }],
    cover: {
      image: IMG, imageAlt: 'A red-breasted robin singing on a snowy branch.',
      imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie the robin sings brightly on a snow-laden branch in a quiet white wood.', composition: 'Robin on a snowy bough, breast glowing warm.', light: 'Cold soft winter light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `It had been the longest winter anyone could remember. Snow lay deep and heavy over the whole wood, the streams were frozen still, and the days were short and grey. The animals huddled in their burrows and dens, weary and glum, wondering if spring would ever come at all.` },
        image: IMG, imageAlt: 'A snowy quiet wood under a grey winter sky.',
        imagePrompt: P({ scene: 'A deep, quiet snowy wood under a heavy grey winter sky, all still and cold.', composition: 'Wide snowscape, bare dark trees.', light: 'Flat cold grey light.' }) },
      { id: 2, text: { en: `In the very middle of the wood lived a small robin named Rosie, with a breast as warm and red as a glowing ember. While everyone else drooped and grumbled at the endless cold, Rosie did a most surprising thing: every single morning, she sang.` },
        image: IMG, imageAlt: 'A robin singing cheerfully in a snowy tree.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie sings out cheerfully from a snowy tree while the wood lies grey and still.', composition: 'Bright robin singing against the white.', light: 'Pale winter morning.' }) },
      { id: 3, text: { en: `Her song was clear and bright and full of cheer, and it rang out over the snow like a little flame of sound. "How can she sing," grumbled the badger from his den, "when it's so cold and grey?" But he listened all the same — and somehow the grey felt a little less grey.` },
        image: IMG, imageAlt: 'Animals listening from their dens to a robin singing in the snow.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Animals peep from their snowy dens, listening to Rosie\'s bright song.', composition: 'Robin singing, faces peeping out to listen.', light: 'Soft snowy light.' }) },
      { id: 4, text: { en: `Day after day, Rosie sang. When a young rabbit said he had quite given up hope of spring, Rosie hopped to his door and sang just for him. "Spring is coming," her song seemed to say. "Hold on, hold on. I promise it is on its way." And the rabbit found he could believe her.` },
        image: IMG, imageAlt: 'A robin singing at the door of a young rabbit in the snow.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie hops to a young rabbit\'s snowy doorway and sings just for him.', composition: 'Robin and hopeful rabbit at a burrow.', light: 'Tender winter light.' }) },
      { id: 5, text: { en: `Rosie did small kindnesses too. She showed the hungry birds where a few frozen berries still clung to a hidden bush. She carried bright news from den to den. Her warm little breast and her warmer little song became the one cheerful thing in all that long cold wood.` },
        image: IMG, imageAlt: 'A robin showing other birds berries on a snowy bush.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie shows two other birds a cluster of frozen berries on a snowy bush.', composition: 'Robin and birds at a berry bush in snow.', light: 'Cold but hopeful light.' }) },
      { id: 6, text: { en: `Then one morning, Rosie noticed something. As she sang her usual song, a single drop of water fell from a branch — plip! The snow was beginning, just barely, to melt. She sang louder. Another drop fell, and another, until the whole wood was softly dripping.` },
        image: IMG, imageAlt: 'A robin singing as the first snow begins to melt and drip.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie sings as the first drops of meltwater fall from the thawing branches.', composition: 'Robin singing, droplets glinting as snow melts.', light: 'First warm light breaking through.' }) },
      { id: 7, text: { en: `And there — pushing up through the melting snow, right beneath Rosie's branch — came a tiny green shoot, and on it, the very first snowdrop of the year. "Spring!" cried Rosie joyfully. "Spring is here! Wake up, everyone — spring has come at last!"` },
        image: IMG, imageAlt: 'A robin beside the first green shoot and snowdrop in melting snow.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie sings beside the first green shoot and white snowdrop rising through the melting snow.', composition: 'Robin and first flower amid thawing snow.', light: 'Hopeful warm spring light.' }) },
      { id: 8, text: { en: `Out tumbled the animals from their dens, blinking in the bright new warmth — the badger, the rabbit, all of them — to find the snow giving way to green and the air alive with the promise of spring. And they knew exactly whom to thank for keeping their hopes alight.` },
        image: IMG, imageAlt: 'Happy animals emerging into the first warm light of spring.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Animals tumble joyfully from their dens into the warm first light of spring.', composition: 'Glad creatures gathering, snow melting around.', light: 'Bright fresh spring sunshine.' }) },
      { id: 9, text: { en: `"You sang us through the winter, Rosie," said the rabbit. "Your song was the hope we held onto." Rosie's red breast glowed. She had not been able to melt the snow herself — but she had kept hope alive until it melted, and that, she knew, was a kind of magic all its own.` },
        image: IMG, imageAlt: 'A robin singing among grateful animals in the spring sunshine.',
        imagePrompt: P({ cast: [CAST.robin], scene: 'Rosie sings happily among the grateful animals in the warm spring sun.', composition: 'Robin amid celebrating friends, flowers opening.', light: 'Joyful golden spring light.' }) }
    ],
    closing: {
      text: { en: `For one bright song, sung bravely through the dark, can keep a whole wood's hope alive until the spring comes round again.` },
      image: IMG, imageAlt: 'A single snowdrop opening in the spring sunshine.',
      imagePrompt: P({ scene: 'End vignette: a single white snowdrop opening in warm spring sunshine.', composition: 'Simple still life, one snowdrop.', light: 'Gentle spring glow.' })
    }
  }));
})(window.APP);

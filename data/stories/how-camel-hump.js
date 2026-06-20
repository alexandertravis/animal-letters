// ─── How the Camel Got His Hump ───────────────────────────────────────────────
// Gentle 'just-so' tale after Kipling. ~9 pages. Moral: everyone must do their
// fair share of the work.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/camel.svg';
  var CAST = {
    camel: `Cosmo the camel: a sandy-coloured camel with long lashes and a flat back (at first), inclined to be lazy; later, with a fine round hump.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'how-camel-hump',
    title:    { en: "How the Camel Got His Hump" },
    subtitle: "a 'just-so' tale, after Kipling",
    skin: 'classic', leather: 'sienna', board: null, color: '#b07a3a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['camel'], coverAnimal: 'camel',
    requirements: [{ animalId: 'camel', minCount: 1, label: 'Find the Camel' }],
    cover: {
      image: IMG, imageAlt: 'A camel lounging lazily at the edge of a sandy desert.',
      imagePrompt: P({ cast: [CAST.camel], scene: 'Cosmo the camel lounges lazily in the shade at the edge of a golden desert.', composition: 'Camel resting, dunes beyond.', light: 'Warm desert light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In the beginning of years, when the world was new, the camel had no hump at all — just a smooth, flat back. And there lived one camel, named Cosmo, in the middle of a great Howling Desert, because he did not want to work. He was, I am sorry to say, dreadfully, marvellously lazy.` },
        image: IMG, imageAlt: 'A flat-backed camel lazing in the desert.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cosmo the flat-backed camel lazes idly in the great Howling Desert.', composition: 'Idle camel among the dunes.', light: 'Bright desert sun.' }) },
      { id: 2, text: { en: `Now the other animals worked very hard for the people of the world. When the Horse came and said, "Camel, come and trot with us," Cosmo only said "Humph!" When the Dog said, "Camel, come and fetch like us," Cosmo just said "Humph!" And when the Ox said, "Camel, come and plough," he said "Humph!" again.` },
        image: IMG, imageAlt: 'A horse, dog and ox asking a lazy camel to help.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The Horse, Dog and Ox each ask the camel to help; he only answers "Humph!"', composition: 'Working animals, idle camel.', light: 'Clear working daylight.' }) },
      { id: 3, text: { en: `"Humph" was the only word the lazy camel ever said. He would not trot, he would not fetch, he would not plough. He just stood about in the desert, eating sticks and thorns and being idle, while all the other animals did his share of the work as well as their own.` },
        image: IMG, imageAlt: 'A camel idly eating thorns while others work hard.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cosmo idly nibbles thorns while the other animals toil at double work.', composition: 'Lazy camel, busy animals beyond.', light: 'Hot bright light.' }) },
      { id: 4, text: { en: `The poor Horse, Dog and Ox grew very tired indeed, working twice as hard to make up for the idle camel. So they went together to the wise old Spirit of the Desert, who looked after all such matters. "It isn't fair," they said. "The camel will not do a stroke of work, and only ever says 'Humph!'"` },
        image: IMG, imageAlt: 'Tired animals complaining to a desert spirit.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The weary Horse, Dog and Ox complain to the wise Spirit of the Desert.', composition: 'Three tired animals, a swirl of desert spirit.', light: 'Shimmering golden haze.' }) },
      { id: 5, text: { en: `So the Spirit of the Desert went rolling and whirling across the sand to find the camel. "Camel, O Camel," said the Spirit, "I hear you will do no work, and only say 'Humph!' The others are worn quite out doing your share. Will you not come and work like everyone else?" The camel just said — you guessed it — "Humph!"` },
        image: IMG, imageAlt: 'A desert spirit speaking sternly to the lazy camel.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The Spirit of the Desert speaks sternly to the unrepentant camel.', composition: 'Camel facing the swirling desert spirit.', light: 'Dramatic shimmering light.' }) },
      { id: 6, text: { en: `"I shouldn't say that again, if I were you," said the Spirit. But the camel said "Humph!" one more time — and no sooner had he said it than his smooth flat back began to puff and bubble and rise up, until it had swelled into a great big lumpy HUMP! "There," said the Spirit. "That is your very own 'humph'."` },
        image: IMG, imageAlt: 'A camel growing a hump on his back as the spirit watches.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'A great hump swells up on the camel\'s back as the desert spirit looks on.', composition: 'Camel with new-grown hump, spirit beside.', light: 'Magical golden shimmer.' }) },
      { id: 7, text: { en: `"Now," said the Spirit, "because you missed those three days of work while you idled, you must work for three days without stopping to eat — and that hump is just the thing. It will store up your food, so you can go and do your share at last, without grumbling about being hungry."` },
        image: IMG, imageAlt: 'A surprised camel feeling his new hump in the desert.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The camel feels his strange new hump in surprise as the Spirit explains its use.', composition: 'Camel examining his hump.', light: 'Bright revealing light.' }) },
      { id: 8, text: { en: `And so, at last, the camel went to join the others, and began to work — and oh, what a help that hump turned out to be! With his food stored snugly inside it, Cosmo could carry travellers for days and days across the burning sand, far longer than any other animal, without once stopping to eat.` },
        image: IMG, imageAlt: 'A camel carrying loads across the desert, working hard.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'Cosmo works happily now, carrying loads for days across the desert sands.', composition: 'Laden camel crossing the dunes.', light: 'Warm desert sun.' }) },
      { id: 9, text: { en: `So the camel has carried his hump — and pulled his weight — ever since, all because of the days he said "Humph!" instead of doing his share. And though he is a fine hard worker now, he has never quite managed to lose that hump, nor the sulky look that came with it.` },
        image: IMG, imageAlt: 'A hard-working humped camel crossing golden dunes at evening.',
        imagePrompt: P({ cast: [CAST.camel], scene: 'The humped camel strides on across golden dunes at evening, a fine worker at last.', composition: 'Camel and hump against sweeping dunes.', light: 'Glowing desert dusk.' }) }
    ],
    closing: {
      text: { en: `For everyone must do their fair share — and the one who sulks and says 'Humph!' may find themselves carrying a heavier load than the rest.` },
      image: IMG, imageAlt: 'Camel tracks winding across a golden dune at sunset.',
      imagePrompt: P({ scene: 'End vignette: a line of camel tracks winding across a smooth golden dune at sunset.', composition: 'Simple still life, tracks on sand.', light: 'Warm sunset glow.' })
    }
  }));
})(window.APP);

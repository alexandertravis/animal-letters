// ─── The Flamingo Who Was Afraid to Fly ───────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: you belong, and your flock will rise with
// you — courage is easier when you are not alone.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/flamingo.svg';
  var CAST = {
    flamingo: `Fearne the flamingo: a tall, slender pink flamingo with long legs, a graceful curved neck and a gentle, anxious face.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'flamingo-flock',
    title:    { en: "The Flamingo Who Was Afraid to Fly" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'mauve', board: null, color: '#c46a8a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['flamingo'], coverAnimal: 'flamingo',
    requirements: [{ animalId: 'flamingo', minCount: 1, label: 'Find the Flamingo' }],
    cover: {
      image: IMG, imageAlt: 'A pink flamingo standing alone in a shallow lake.',
      imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne the flamingo stands alone in a shallow rosy lake, watching the flock above.', composition: 'Lone flamingo, flock flying distant.', light: 'Soft pink dawn light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On a wide, rosy lake lived a young flamingo named Fearne, among a great flock of pink flamingos. Every season, when the time came, the whole flock would lift into the sky together and fly to their warm winter home far away. Every flamingo flew — every one, that is, except Fearne.` },
        image: IMG, imageAlt: 'A flock of flamingos flying while one stays on the lake.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'The flock of flamingos lifts into the sky while Fearne stays below on the lake.', composition: 'Flamingos rising, one staying behind.', light: 'Warm rosy sky.' }) },
      { id: 2, text: { en: `Fearne was afraid to fly. The sky looked so high and so wide, and the journey so terribly far. "What if I'm not strong enough?" she fretted. "What if I fall? What if I get lost?" So every season she stayed behind on the lake, alone, and watched her family disappear into the clouds without her.` },
        image: IMG, imageAlt: 'A nervous flamingo watching the flock fly away.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne watches anxiously as her flock disappears into the clouds without her.', composition: 'Lone flamingo gazing up at the empty sky.', light: 'Soft wistful light.' }) },
      { id: 3, text: { en: `But this year was different. This year, the winter would come hard and cold to the lake, and there would be no food left. "You must come with us, Fearne," said her mother gently. "You cannot stay behind this time. I know you are afraid — but you are stronger than you think, and you will not be flying alone."` },
        image: IMG, imageAlt: 'A mother flamingo gently encouraging her nervous young one.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne\'s mother gently encourages her to join the flock\'s great flight.', composition: 'Two flamingos, mother reassuring.', light: 'Tender dawn light.' }) },
      { id: 4, text: { en: `On the morning of the great flight, Fearne's tummy was full of butterflies. The whole flock gathered on the lake, hundreds of them, pink as the sunrise. "We rise together, on the count of three," called the lead flamingo. Fearne's heart pounded. "I can't," she whispered. "I'm too afraid."` },
        image: IMG, imageAlt: 'A huge flock of flamingos gathering to take off together.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Hundreds of flamingos gather on the lake to rise together; Fearne trembles.', composition: 'Great pink flock poised to fly.', light: 'Brilliant pink sunrise.' }) },
      { id: 5, text: { en: `"You won't be alone," said her mother, drawing close on one side. Her father drew close on the other. All around her, the flock pressed in warm and near. "We rise together," they said. "Just spread your wings when we do, and let us carry you up. One... two... THREE!"` },
        image: IMG, imageAlt: 'A flock of flamingos surrounding the nervous young one for support.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'The flock gathers warm and close around Fearne as they prepare to rise together.', composition: 'Fearne surrounded and supported by her flock.', light: 'Warm encouraging light.' }) },
      { id: 6, text: { en: `And the whole great flock rose into the air as one — and Fearne, swept up in the middle of them all, spread her wings and rose too! Up, up, up she went, lifted by the rush of a hundred beating wings around her. She was flying! She was really, truly flying!` },
        image: IMG, imageAlt: 'A young flamingo flying for the first time amid the flock.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne rises into the sky for the first time, swept up amid the beating wings of the flock.', composition: 'Flamingo aloft within the rising pink flock.', light: 'Glorious pink-gold sky.' }) },
      { id: 7, text: { en: `And it was not frightening at all — it was wonderful! With her flock all around her, holding her up and showing her the way, the wide sky felt warm and friendly. The lake shrank below, the wind sang in her feathers, and Fearne laughed out loud for the sheer joy of flight.` },
        image: IMG, imageAlt: 'A joyful flamingo flying happily with the flock.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne flies joyfully amid her flock, the lake shrinking far below.', composition: 'Happy flamingo soaring with the flock.', light: 'Bright joyful sky.' }) },
      { id: 8, text: { en: `On and on they flew, a great pink ribbon across the sky, and whenever Fearne grew tired, the flock shifted around her so she could rest in the easy air behind another's wings. "We help each other along," her mother called. "That is what a flock is for. No one flies the whole way alone."` },
        image: IMG, imageAlt: 'A flock of flamingos flying together in a long pink line.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'The flock flies together in a long pink ribbon, taking turns to help each other along.', composition: 'Flamingos in formation across the sky.', light: 'Warm endless sky.' }) },
      { id: 9, text: { en: `At last they reached their warm winter home, and Fearne landed safe and proud among her flock. She had crossed the whole wide sky — she, who had been so afraid! "I could never have done it alone," she said. "But together... together, we can fly anywhere." And she never feared the sky again.` },
        image: IMG, imageAlt: 'A proud flamingo landing safely with her flock at journey\'s end.',
        imagePrompt: P({ cast: [CAST.flamingo], scene: 'Fearne lands safe and proud among her flock at their warm winter home.', composition: 'Flamingos settling at journey\'s end.', light: 'Warm golden arrival light.' }) }
    ],
    closing: {
      text: { en: `For the widest sky is far less frightening when you are not alone — and a good flock will rise with you, and carry you all the way home.` },
      image: IMG, imageAlt: 'A pink feather drifting over a calm rosy lake at dusk.',
      imagePrompt: P({ scene: 'End vignette: a single pink feather drifting down over a calm, rosy lake at dusk.', composition: 'Simple still life, feather over water.', light: 'Soft pink dusk.' })
    }
  }));
})(window.APP);

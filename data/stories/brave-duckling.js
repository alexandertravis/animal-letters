// ─── The Duckling Who Was Afraid of Water ─────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: courage is not having no fear, but trying
// anyway, one small step at a time.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/duck.svg';
  var CAST = {
    duck: `Posy the duckling: a small fluffy yellow duckling with bright eyes and a little orange beak; timid at first, then bravely determined.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'brave-duckling',
    title:    { en: "The Duckling Who Was Afraid of Water" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'dustblue', board: null, color: '#5a7a8a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['duck'], coverAnimal: 'duck',
    requirements: [{ animalId: 'duck', minCount: 1, label: 'Find the Duck' }],
    cover: {
      image: IMG, imageAlt: 'A small yellow duckling peeping nervously at a pond.',
      imagePrompt: P({ cast: [CAST.duck], scene: 'Posy the duckling peeps nervously at the edge of a calm blue pond.', composition: 'Little duckling at the water\'s edge.', light: 'Bright gentle pond light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `By a calm blue pond lived a fluffy little duckling named Posy, and Posy had a secret worry. All her brothers and sisters loved to splash and paddle and dive in the cool water — but Posy was afraid of it. The pond looked so big and so deep, and she had never once dared to go in.` },
        image: IMG, imageAlt: 'A duckling watching her siblings swim while she stays on land.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy watches nervously from the bank as her siblings splash happily in the pond.', composition: 'Ducklings swimming, one on the shore.', light: 'Sunny pond light.' }) },
      { id: 2, text: { en: `"Come in, Posy! The water's lovely!" her siblings would call, paddling about happily. But Posy would shake her little head and stay safely on the grass. "I can't," she whispered. "It's too big and too deep. What if I sink? What if I float away?" And she felt sad and left out.` },
        image: IMG, imageAlt: 'A sad duckling staying on the grass by the pond.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy shakes her head and stays sadly on the grass while the others swim.', composition: 'Lonely duckling on the bank.', light: 'Soft wistful light.' }) },
      { id: 3, text: { en: `Her wise mother duck sat down beside her. "Being brave doesn't mean you're not afraid, my dear," she said gently. "It means doing the thing anyway, one tiny step at a time. You needn't jump in all at once. Shall we just dip in one little webbed toe together, and see?"` },
        image: IMG, imageAlt: 'A mother duck comforting her nervous duckling.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Mother duck sits beside Posy, gently encouraging her to try one small step.', composition: 'Mother and duckling by the water.', light: 'Warm reassuring light.' }) },
      { id: 4, text: { en: `So Posy took a deep breath and dipped in just one toe. The water was cool and tickly — and not so frightening after all! "There," said her mother warmly. "You were braver than you knew." Posy gave a tiny, surprised smile. Perhaps one toe was not so very scary.` },
        image: IMG, imageAlt: 'A duckling carefully dipping one toe into the pond.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy carefully dips a single webbed toe into the cool water, surprised it is not scary.', composition: 'Duckling testing the water\'s edge.', light: 'Bright encouraging light.' }) },
      { id: 5, text: { en: `The next day, Posy waded in up to her little ankles. The day after that, up to her tummy, where the cool water tickled her downy feathers. Each day she went a tiny bit further, and each day she felt a tiny bit braver, until the pond did not seem nearly so big and deep as it once had.` },
        image: IMG, imageAlt: 'A duckling wading a little deeper into the pond each day.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy wades a little deeper into the pond, growing braver day by day.', composition: 'Duckling paddling in the shallows.', light: 'Cheerful sunny light.' }) },
      { id: 6, text: { en: `Then came the morning when Posy waded out just a little too far, and felt the soft mud slip away beneath her feet. "Oh!" she gasped, as the water lifted her up. But she did not sink. She did not float away. Her downy little body bobbed up like a cork — and all at once, Posy was FLOATING!` },
        image: IMG, imageAlt: 'A surprised duckling floating on the water for the first time.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy bobs up and floats for the very first time, eyes wide with surprise.', composition: 'Duckling afloat, ripples around her.', light: 'Sparkling water light.' }) },
      { id: 7, text: { en: `"I'm floating! I'm really floating!" she cried in delight. She gave her little webbed feet a paddle — and she glided forward across the water! Another paddle, and another, and she was SWIMMING, gliding along as easily as her brothers and sisters. It was the most wonderful feeling in the whole world.` },
        image: IMG, imageAlt: 'A joyful duckling swimming across the pond.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy paddles joyfully and glides across the pond, swimming at last.', composition: 'Happy duckling swimming freely.', light: 'Bright joyful light.' }) },
      { id: 8, text: { en: `Her brothers and sisters cheered and splashed around her. "You did it, Posy! You're swimming!" Posy beamed with pride as she paddled among them at last. "I was so afraid," she said, "but I just tried one little step at a time — and look at me now!"` },
        image: IMG, imageAlt: 'Ducklings cheering as the brave duckling swims with them.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'Posy\'s siblings cheer and splash as she swims proudly among them.', composition: 'Ducklings celebrating together in the pond.', light: 'Warm joyful light.' }) },
      { id: 9, text: { en: `From that day on, Posy loved the water best of all. She splashed and paddled and dived from dawn till dusk. And whenever a little creature was afraid to try something new, Posy would tell them her secret: you don't have to be unafraid — you just have to be brave enough to try one small step.` },
        image: IMG, imageAlt: 'A happy duckling playing confidently in the pond.',
        imagePrompt: P({ cast: [CAST.duck], scene: 'A confident, happy Posy splashes and plays in the pond she once feared.', composition: 'Joyful duckling at home in the water.', light: 'Bright sparkling light.' }) }
    ],
    closing: {
      text: { en: `For being brave does not mean having no fear at all — it means taking one small, wobbly step anyway, and then another, until you find you can fly.` },
      image: IMG, imageAlt: 'Gentle ripples spreading across a calm sunlit pond.',
      imagePrompt: P({ scene: 'End vignette: gentle ripples spreading across a calm, sunlit pond.', composition: 'Simple still water with soft ripples.', light: 'Bright peaceful glow.' })
    }
  }));
})(window.APP);

// ─── The Octopus Who Helped Everyone ──────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a gift is happiest when used to help, and
// even the most helpful must remember to rest.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/octopus.svg';
  var CAST = {
    octopus: `Otto the octopus: a cheerful pinky-purple octopus with eight curling arms, big friendly eyes and a wide smile, busy among the coral.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'octopus-juggle',
    title:    { en: "The Octopus Who Helped Everyone" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'plum', board: null, color: '#7a4a7a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['octopus'], coverAnimal: 'octopus',
    requirements: [{ animalId: 'octopus', minCount: 1, label: 'Find the Octopus' }],
    cover: {
      image: IMG, imageAlt: 'A cheerful octopus with eight arms among colourful coral.',
      imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto the octopus smiles among bright coral, his eight arms curling helpfully.', composition: 'Octopus centred in a coral reef.', light: 'Bright dappled underwater light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Down in a bright coral reef lived a friendly octopus named Otto, who had eight long, clever arms — and the kindest heart in the whole sea. With so many arms, Otto could do eight things at once, and he loved nothing better than to help all his neighbours with their busy days.` },
        image: IMG, imageAlt: 'An octopus using many arms to help reef creatures.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto uses several arms at once to help busy reef creatures.', composition: 'Octopus helping in many directions.', light: 'Sunlit reef shallows.' }) },
      { id: 2, text: { en: `One arm could tidy a clam's shell while another untangled a crab from the weeds. One could rock a baby seahorse to sleep while another fetched supper for the eels. All day long, Otto helped and helped, and the whole reef ran smoothly because of his eight willing arms.` },
        image: IMG, imageAlt: 'An octopus helping a clam, a crab, a seahorse and an eel at once.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto helps a clam, a crab, a seahorse and an eel all at the same time.', composition: 'Octopus juggling many helpful tasks.', light: 'Cheerful reef light.' }) },
      { id: 3, text: { en: `The reef folk adored him. "Otto, could you help with this?" "Otto, could you fix that?" From dawn to dusk the calls came in, and Otto said yes to every single one, for he so loved to be helpful — and there always seemed to be one more arm to spare.` },
        image: IMG, imageAlt: 'Sea creatures all calling for the octopus to help.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Reef creatures from all sides call to Otto for help at once.', composition: 'Octopus surrounded by requests.', light: 'Busy bright water.' }) },
      { id: 4, text: { en: `But one busy morning, something went wrong. Everyone needed help at the very same moment — the clam, the crab, the eels, the seahorses, all calling at once! Otto spun this way and that, reaching with all eight arms — and got himself into the most dreadful, tangled muddle.` },
        image: IMG, imageAlt: 'An octopus tangled up trying to help everyone at once.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto tangles all eight arms into a muddle trying to help everyone at once.', composition: 'Octopus in a comical tangle of arms.', light: 'Flurried bright water.' }) },
      { id: 5, text: { en: `His arms were knotted up like a bundle of seaweed, and the harder he wriggled, the worse the tangle grew. "Oh dear," puffed Otto, quite stuck and quite worn out. "I tried to do everything at once for everyone — and now I cannot do anything at all!"` },
        image: IMG, imageAlt: 'A worn-out octopus stuck in a knot of his own arms.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'A worn-out Otto sits stuck in a knot of his own tangled arms.', composition: 'Exhausted octopus in a tangle.', light: 'Softer, tired light.' }) },
      { id: 6, text: { en: `A wise old turtle drifted by. "Otto," she said gently, "even an octopus has only eight arms. You cannot help everyone at the same moment — and you must not forget to rest. Help one friend at a time, and ask the others to wait their turn. They will not mind, you know."` },
        image: IMG, imageAlt: 'A wise old turtle giving advice to a tangled octopus.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'A wise old sea turtle gives gentle advice to the tangled octopus.', composition: 'Turtle and octopus, calm exchange.', light: 'Soft deep-water light.' }) },
      { id: 7, text: { en: `So Otto took a slow breath and carefully untangled himself, arm by arm. Then he helped his friends the new way: one at a time, calm and unhurried, while the others waited patiently. And do you know — everyone was helped just as well, and Otto was not in a muddle at all.` },
        image: IMG, imageAlt: 'An octopus calmly helping one friend while others wait.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto calmly helps one creature at a time while the others wait their turn.', composition: 'Orderly octopus, patient friends in a line.', light: 'Calm clear water.' }) },
      { id: 8, text: { en: `Best of all, with his help spread out one task at a time, Otto found he had a few arms free to rest, and a little time to himself at last. He curled up cosy in his favourite coral nook and had a lovely, well-earned doze — the first he'd had in ages.` },
        image: IMG, imageAlt: 'A content octopus resting cosily in a coral nook.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'Otto curls up to rest cosily in his favourite coral nook.', composition: 'Restful octopus tucked in coral.', light: 'Gentle dim resting light.' }) },
      { id: 9, text: { en: `From then on, Otto was as helpful as ever — but wisely now, one friend at a time, with a rest of his own each day. And the reef ran more happily than it ever had, for a helper who looks after himself too, they all learned, is the very best helper of all.` },
        image: IMG, imageAlt: 'A happy, rested octopus helping among grateful reef friends.',
        imagePrompt: P({ cast: [CAST.octopus], scene: 'A happy, rested Otto helps calmly among his grateful reef friends.', composition: 'Content octopus among the thriving reef.', light: 'Warm thriving reef light.' }) }
    ],
    closing: {
      text: { en: `For even eight willing arms have their limit — and the kindest helper of all is the one who helps each friend in turn, and remembers to rest as well.` },
      image: IMG, imageAlt: 'A quiet coral nook glowing softly in the sea.',
      imagePrompt: P({ scene: 'End vignette: a quiet coral nook glowing softly in the calm sea.', composition: 'Simple peaceful coral scene.', light: 'Soft underwater glow.' })
    }
  }));
})(window.APP);

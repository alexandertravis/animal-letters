// ─── The Parrot Who Repeated Everything ───────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: think before you repeat — kind words are
// worth spreading; unkind ones are best left unsaid.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/parrot.svg';
  var CAST = {
    parrot: `Pico the parrot: a bright, clever parrot with red, blue and yellow feathers and a quick beak, who repeats every word he hears.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'parrot-secret',
    title:    { en: "The Parrot Who Repeated Everything" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'plum', board: null, color: '#7a4a7a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['parrot'], coverAnimal: 'parrot',
    requirements: [{ animalId: 'parrot', minCount: 1, label: 'Find the Parrot' }],
    cover: {
      image: IMG, imageAlt: 'A bright colourful parrot perched in a jungle tree.',
      imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico the parrot perches brightly in a leafy jungle tree, mid-chatter.', composition: 'Colourful parrot on a branch.', light: 'Bright dappled jungle light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a bright jungle full of chatter lived a clever parrot named Pico, who had a remarkable gift: he could repeat any word he heard, perfectly. Whatever was said anywhere in the jungle, Pico would hear it, learn it, and squawk it out again for all to hear. He was, you might say, the jungle's loudest gossip.` },
        image: IMG, imageAlt: 'A chattering parrot repeating words in the jungle.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico chatters and repeats words loudly from his jungle branch.', composition: 'Parrot mid-squawk among the leaves.', light: 'Bright jungle light.' }) },
      { id: 2, text: { en: `The trouble was that Pico repeated EVERYTHING — without ever stopping to think. If a cross monkey grumbled something unkind, Pico would squawk it across the whole jungle. If someone said a careless, hurtful word, Pico would repeat it again and again, until everyone had heard, and feelings were badly hurt.` },
        image: IMG, imageAlt: 'A parrot loudly repeating unkind words as animals look upset.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico loudly repeats an unkind remark, and the animals around look hurt.', composition: 'Squawking parrot, upset animals below.', light: 'Harsh bright light.' }) },
      { id: 3, text: { en: `One day, a careless toucan said something mean about the shy little tapir's funny nose — not really meaning any harm. But Pico heard it, and squawked it out, over and over, all through the jungle: "Funny nose! Funny nose!" until the poor little tapir hid himself away, his feelings quite crushed.` },
        image: IMG, imageAlt: 'A shy tapir hiding sadly as a parrot repeats a mean remark.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'The shy tapir hides away, crushed, as Pico repeats a hurtful remark.', composition: 'Hiding tapir, squawking parrot above.', light: 'Sad muted light.' }) },
      { id: 4, text: { en: `The wise old jaguar saw how sad the little tapir was, and went to have a word with Pico. "Your gift is a powerful one, Pico," she said. "Your voice can travel further than any other in the jungle. But have you ever thought about WHAT you choose to repeat? Words can hurt, you know — or they can heal."` },
        image: IMG, imageAlt: 'A wise jaguar speaking seriously to the parrot.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'The wise old jaguar speaks seriously to Pico about the words he repeats.', composition: 'Jaguar and attentive parrot.', light: 'Soft serious light.' }) },
      { id: 5, text: { en: `Pico had never thought about it at all. He had simply repeated whatever he heard, the moment he heard it. "You mean... I get to CHOOSE?" he said slowly. "Of course," said the jaguar. "Before you repeat a thing, ask yourself: is it kind? Is it true? Is it helpful? If not — perhaps it is better left unsaid."` },
        image: IMG, imageAlt: 'A thoughtful parrot considering the jaguar\'s advice.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico sits thoughtfully, realising he can choose which words to repeat.', composition: 'Pensive parrot on his branch.', light: 'Gentle reflective light.' }) },
      { id: 6, text: { en: `Pico felt terrible about the little tapir. So he decided to use his gift in a brand new way. He flew all around the jungle, and this time he repeated only the KIND things he heard. "The tapir has the gentlest eyes," he had heard the deer say once — so he squawked THAT, far and wide, over and over.` },
        image: IMG, imageAlt: 'A parrot happily spreading kind words through the jungle.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico flies about the jungle joyfully repeating only kind and warm words.', composition: 'Parrot spreading kindness branch to branch.', light: 'Bright warm light.' }) },
      { id: 7, text: { en: `The shy little tapir, hidden away, heard the kind words echoing through the jungle — "gentlest eyes... gentlest eyes..." — and slowly, shyly, he peeped out. The mean words were forgotten now, drowned out by all the lovely ones. And the tapir lifted his head, and smiled, and came back out to play.` },
        image: IMG, imageAlt: 'A cheered-up tapir coming out of hiding, smiling.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'The little tapir peeps out, cheered by the kind words Pico now spreads.', composition: 'Smiling tapir emerging, parrot nearby.', light: 'Warming hopeful light.' }) },
      { id: 8, text: { en: `From then on, Pico became the jungle's bringer of good news. He carried compliments from one friend to another, spread cheerful greetings, and shared kind words far and wide. And whenever he heard something unkind, he simply held his beak shut tight and let it go no further. The jungle had never been such a friendly place.` },
        image: IMG, imageAlt: 'A parrot happily carrying kind messages between jungle animals.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'Pico happily carries kind greetings and compliments between the jungle animals.', composition: 'Cheerful parrot among friendly animals.', light: 'Bright joyful light.' }) },
      { id: 9, text: { en: `And do you know — Pico discovered that spreading kind words felt a hundred times nicer than spreading mean ones ever had. His wonderful voice, which had once caused so much hurt, now carried warmth and friendship all through the trees. For he had learned the most important word of all: think — before you repeat.` },
        image: IMG, imageAlt: 'A happy parrot among cheerful jungle friends.',
        imagePrompt: P({ cast: [CAST.parrot], scene: 'A happy Pico chatters cheerfully among his many jungle friends.', composition: 'Beloved parrot among the friendly jungle.', light: 'Warm golden light.' }) }
    ],
    closing: {
      text: { en: `For words travel far and last long — so before you pass one on, ask if it is kind. The good ones are worth repeating; the unkind are best let go.` },
      image: IMG, imageAlt: 'A single bright feather drifting through green jungle leaves.',
      imagePrompt: P({ scene: 'End vignette: a single bright parrot feather drifting down through green jungle leaves.', composition: 'Simple still life, one colourful feather.', light: 'Soft dappled glow.' })
    }
  }));
})(window.APP);

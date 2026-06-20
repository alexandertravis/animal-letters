// ─── The Lamb Who Cried Wolf ──────────────────────────────────────────────────
// Gentle retelling of Aesop's "Boy Who Cried Wolf". ~9 pages. Moral: a fibber is
// not believed, even when telling the truth. (Kindly — no harm comes to anyone.)
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/sheep.svg';
  var CAST = {
    lamb: `Lucas the lamb: a fluffy young white lamb with a cheeky grin and bright eyes, fond of a joke.`,
    wolf: `the wolf: a lean grey wolf with a sly, hungry look, kept at the edge of the scene.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'lamb-cried-wolf',
    title:    { en: "The Lamb Who Cried Wolf" },
    subtitle: 'after Aesop',
    skin: 'classic', leather: 'slate', board: null, color: '#6a727a',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['sheep', 'wolf'], coverAnimal: 'sheep',
    requirements: [{ animalId: 'sheep', minCount: 1, label: 'Find the Sheep' }],
    cover: {
      image: IMG, imageAlt: 'A cheeky young lamb on a green hillside above a flock.',
      imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas the lamb stands grinning on a green hilltop above the grazing flock.', composition: 'Lamb on a hill, flock below.', light: 'Bright pastoral light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `High on the green hill above the village, a young lamb named Lucas had an important job: to keep watch over the flock while they grazed, and to call out loudly if ever the wolf came down from the woods. It was a fine and trusted job — but Lucas, truth be told, found it just a little bit dull.` },
        image: IMG, imageAlt: 'A young lamb keeping watch over a grazing flock.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas keeps watch over the grazing flock on the green hill, looking a touch bored.', composition: 'Lamb on lookout, sheep grazing.', light: 'Sunny pastoral light.' }) },
      { id: 2, text: { en: `One sleepy afternoon, Lucas had a naughty idea for some fun. He filled his lungs and cried, as loud as he could, "WOLF! WOLF! A wolf is coming!" At once the whole flock came stampeding up the hill in a panic — the old ram, the ewes, everyone — bleating and wide-eyed, ready to help.` },
        image: IMG, imageAlt: 'Sheep stampeding up a hill in alarm.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'The whole flock stampedes up the hill in alarm at Lucas\'s cry.', composition: 'Sheep rushing up, lamb at the top.', light: 'Bright dramatic light.' }) },
      { id: 3, text: { en: `But there was no wolf at all. Lucas rolled about laughing. "Ha! I tricked you! Your faces!" The flock did not think it funny one bit. "That is not a thing to joke about, Lucas," scolded the old ram sternly. "The alarm is for real danger." Grumbling, they trudged back down to their grazing.` },
        image: IMG, imageAlt: 'A lamb laughing while annoyed sheep look on.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas laughs at his trick while the annoyed old ram scolds him.', composition: 'Giggling lamb, cross flock.', light: 'Clear daylight.' }) },
      { id: 4, text: { en: `Now you might think Lucas had learned his lesson — but the trick had been such fun that, a little while later, he did it all over again. "WOLF! WOLF!" he hollered. And once more the poor flock came galloping up the hill in a fright, hearts pounding... only to find Lucas snickering behind a rock.` },
        image: IMG, imageAlt: 'A lamb tricking the flock a second time.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas snickers behind a rock as the flock rushes up a second time.', composition: 'Hiding lamb, frightened flock.', light: 'Bright daylight.' }) },
      { id: 5, text: { en: `"Tricked you AGAIN!" Lucas crowed. But this time nobody laughed, and the old ram's face was very grave indeed. "Mark my words, young lamb," he said. "If you keep crying wolf for fun, then on the day a REAL wolf comes, no one will believe you." Lucas just shrugged and grinned.` },
        image: IMG, imageAlt: 'A grave old ram warning a careless grinning lamb.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'The grave old ram warns the careless, grinning Lucas.', composition: 'Stern ram, shrugging lamb.', light: 'Sober afternoon light.' }) },
      { id: 6, text: { en: `Well — you can guess what happened next. The very next day, as the sun dipped low, Lucas saw two yellow eyes glinting at the edge of the wood, and a real, true wolf came slinking out toward the flock. Lucas's heart leapt into his throat. "WOLF!" he cried. "This time it's REAL! WOLF!"` },
        image: IMG, imageAlt: 'A frightened lamb spotting a real wolf at the wood\'s edge.',
        imagePrompt: P({ cast: [CAST.lamb, CAST.wolf], scene: 'Lucas spots a real wolf slinking from the woods and cries the alarm in fright.', composition: 'Frightened lamb, wolf at the tree line.', light: 'Low golden-grey evening.' }) },
      { id: 7, text: { en: `But down in the village, the flock only shook their heads. "That naughty lamb is crying wolf again," they sighed, and not a single one came running. Lucas called and called until his voice was hoarse, but no help came — for he had used up every bit of their trust on his silly jokes.` },
        image: IMG, imageAlt: 'A lamb crying out alone while no one comes to help.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas cries out desperately and alone; no one comes to help him.', composition: 'Lone lamb calling, empty hillside.', light: 'Lonely fading light.' }) },
      { id: 8, text: { en: `There was no time to lose. Frightened but brave, Lucas did the only thing he could: he dashed to the old warning bell by the gate and rang it with all his might — CLANG, CLANG, CLANG! The sudden clamour startled the wolf so badly that it turned tail and fled straight back into the woods.` },
        image: IMG, imageAlt: 'A brave lamb ringing a loud warning bell to scare off a wolf.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'Lucas bravely rings the loud warning bell, startling the wolf into fleeing.', composition: 'Lamb ringing bell, wolf bolting away.', light: 'Dramatic dusk light.' }) },
      { id: 9, text: { en: `The flock was safe — but Lucas had been very frightened, and very alone, and he never forgot it. From that day on, he never told a false alarm again. And when, weeks later, he truthfully called out about a fox, the whole flock came at once — for now they knew that Lucas's word could be trusted.` },
        image: IMG, imageAlt: 'A wiser lamb trusted by the flock, all gathered safely.',
        imagePrompt: P({ cast: [CAST.lamb], scene: 'A wiser Lucas is trusted again, the whole flock gathered safely around him.', composition: 'Lamb among the reassured flock.', light: 'Warm restored light.' }) }
    ],
    closing: {
      text: { en: `For trust is a precious thing, and once spent on silly fibs, it is very hard to win back — so it is always, always best to tell the truth.` },
      image: IMG, imageAlt: 'An old warning bell hanging by a gate at dusk.',
      imagePrompt: P({ scene: 'End vignette: an old iron warning bell hanging quietly by a wooden gate at dusk.', composition: 'Simple still life, bell by a gate.', light: 'Soft dusk glow.' })
    }
  }));
})(window.APP);

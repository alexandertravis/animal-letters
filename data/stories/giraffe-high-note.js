// ─── The Giraffe Who Reached the Sky ──────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: the thing that makes you different may be
// exactly the gift others need.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/giraffe.svg';
  var CAST = {
    giraffe: `Gigi the giraffe: a gentle giraffe with a very long neck, soft brown patches and kind eyes, a little awkward about being so tall.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'giraffe-high-note',
    title:    { en: "The Giraffe Who Reached the Sky" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'sienna', board: null, color: '#b07a3a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['giraffe'], coverAnimal: 'giraffe',
    requirements: [{ animalId: 'giraffe', minCount: 1, label: 'Find the Giraffe' }],
    cover: {
      image: IMG, imageAlt: 'A tall giraffe stretching her long neck up among the trees.',
      imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi the giraffe stretches her long neck up among the tall acacia trees.', composition: 'Tall giraffe reaching into the treetops.', light: 'Warm savanna light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On the wide grassy savanna lived a giraffe named Gigi, who had the longest neck you ever saw. It stretched up and up, higher than the tallest trees. But Gigi did not feel lucky about her long neck — in fact, she felt rather awkward and out of place. "Why must I be so very tall?" she would sigh.` },
        image: IMG, imageAlt: 'A self-conscious tall giraffe among shorter animals.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi feels awkwardly tall among the shorter animals of the savanna.', composition: 'Towering giraffe, small animals below.', light: 'Bright savanna light.' }) },
      { id: 2, text: { en: `The other animals could do all sorts of clever things. The monkeys could swing, the cheetahs could run, the meerkats could dig. But Gigi felt her long neck was good for nothing much at all, except bumping into branches and making her stick out awkwardly above the crowd. She wished she could be small and ordinary.` },
        image: IMG, imageAlt: 'A giraffe watching other animals do clever things.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi watches the monkeys swing and the cheetahs run, feeling her tallness is useless.', composition: 'Giraffe observing the busy animals.', light: 'Clear daylight.' }) },
      { id: 3, text: { en: `One morning, a terrible cry went up across the savanna. "Help! Help!" A little monkey had climbed far too high in the very tallest tree, chasing a butterfly, and now he was stuck — too high to climb down, too frightened to jump, clinging to a swaying branch right at the top.` },
        image: IMG, imageAlt: 'A little monkey stuck high in a tall tree.',
        imagePrompt: P({ scene: 'A frightened little monkey clings to a swaying branch at the very top of a tall tree.', composition: 'Tiny monkey high in the treetop.', light: 'Bright anxious light.' }) },
      { id: 4, text: { en: `The animals gathered below in a panic. The monkeys could not reach him, the birds were too small to carry him, and the tree was far too high and thin to climb. "However shall we get him down?" they cried. "He's much too high! No one is tall enough to reach him!"` },
        image: IMG, imageAlt: 'Worried animals gathered below a tall tree.',
        imagePrompt: P({ scene: 'Worried animals gather helplessly below the tall tree, unable to reach the stuck monkey.', composition: 'Cluster of animals looking up.', light: 'Tense bright light.' }) },
      { id: 5, text: { en: `No one tall enough... Gigi's heart gave a leap. "I am tall enough," she said quietly. She walked up to the great tall tree, and slowly, carefully, she stretched her long, long neck up and up and up — higher than anyone else could ever reach — right to the very top where the little monkey clung.` },
        image: IMG, imageAlt: 'A giraffe stretching her long neck up to a stuck monkey.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi stretches her long neck right up to the top of the tree, level with the stuck monkey.', composition: 'Giraffe\'s neck reaching the treetop.', light: 'Hopeful bright light.' }) },
      { id: 6, text: { en: `"Climb onto my neck, little one," said Gigi gently. "I've got you. You're quite safe now." The trembling monkey reached out, grabbed hold of Gigi's neck, and slid carefully down its long, smooth slope — all the way down, down, down to the safe soft grass below. He was saved!` },
        image: IMG, imageAlt: 'A monkey sliding safely down a giraffe\'s long neck.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'The little monkey slides safely down Gigi\'s long neck to the ground.', composition: 'Monkey sliding down the giraffe\'s neck.', light: 'Bright relieved light.' }) },
      { id: 7, text: { en: `The whole savanna erupted in cheers. "Gigi, you did it! Only YOU could have reached him! Your long neck saved his life!" The little monkey hugged her gratefully. "Thank you, thank you," he chattered. "I'm so glad you're tall!" And Gigi felt something quite new — a warm glow of pride.` },
        image: IMG, imageAlt: 'Animals cheering for the giraffe who saved the monkey.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'The animals cheer and the rescued monkey hugs Gigi gratefully.', composition: 'Giraffe celebrated by the happy crowd.', light: 'Warm joyful light.' }) },
      { id: 8, text: { en: `"All this time," Gigi said in wonder, "I wished my long neck away — and today it was the one thing that could help. The very thing that made me different was exactly what was needed." She held her head high, prouder of her long neck than she had ever thought possible.` },
        image: IMG, imageAlt: 'A proud giraffe holding her head high.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi holds her head high, proud at last of her long neck.', composition: 'Proud giraffe standing tall.', light: 'Warm golden light.' }) },
      { id: 9, text: { en: `From then on, Gigi never wished to be small and ordinary again. She used her wonderful height to help wherever she could — fetching fruit from the highest branches, spotting danger far across the plains, and reaching whatever no one else could reach. Her difference, she knew now, was her gift.` },
        image: IMG, imageAlt: 'A happy giraffe using her height to help other animals.',
        imagePrompt: P({ cast: [CAST.giraffe], scene: 'Gigi happily uses her height to pick fruit and help her savanna friends.', composition: 'Giraffe helping, animals grateful around her.', light: 'Bright cheerful light.' }) }
    ],
    closing: {
      text: { en: `For the very thing that makes you different from everyone else may turn out to be exactly the gift the world was waiting for.` },
      image: IMG, imageAlt: 'A tall acacia tree against a golden savanna sky.',
      imagePrompt: P({ scene: 'End vignette: a single tall acacia tree silhouetted against a golden savanna sky.', composition: 'Simple tree against the sky.', light: 'Warm sunset glow.' })
    }
  }));
})(window.APP);

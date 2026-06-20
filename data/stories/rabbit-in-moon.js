// ─── The Rabbit in the Moon ───────────────────────────────────────────────────
// Gentle retelling of the Jataka / folk tale. ~9 pages. Moral: selfless kindness
// is the most precious gift of all. (Kindly — no harm comes to the rabbit.)
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/rabbit.svg';
  var CAST = {
    rabbit: `Reni the rabbit: a soft brown rabbit with long ears, gentle eyes and a generous heart.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'rabbit-in-moon',
    title:    { en: "The Rabbit in the Moon" },
    subtitle: 'a folk tale',
    skin: 'classic', leather: 'midnight', board: null, color: '#3a3454',
    wordCount: 425, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['rabbit'], coverAnimal: 'rabbit',
    requirements: [{ animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' }],
    cover: {
      image: IMG, imageAlt: 'A gentle rabbit gazing up at a big bright moon.',
      imagePrompt: P({ cast: [CAST.rabbit], scene: 'Reni the rabbit gazes up at a great bright moon over a moonlit meadow.', composition: 'Rabbit small beneath a huge glowing moon.', light: 'Soft silver moonlight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a moonlit meadow long ago lived three friends — a clever monkey, a sleek otter, and a soft brown rabbit named Reni. Of the three, Reni had the very least: no nimble paws for climbing, no skill for fishing, only a gentle heart. But that gentle heart was the kindest in all the land.` },
        image: IMG, imageAlt: 'A rabbit, monkey and otter together in a moonlit meadow.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'Reni the rabbit sits with her friends the monkey and the otter in a moonlit meadow.', composition: 'Three friends together under the moon.', light: 'Soft silver light.' }) },
      { id: 2, text: { en: `One evening the three friends made a promise: the next day, they would each find something to share with anyone in need. "Kindness given freely," they agreed, "is the finest thing of all." And they each set off to think how best to keep their promise.` },
        image: IMG, imageAlt: 'Three animal friends making a kind promise together.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'The three friends make a promise to share kindness with anyone in need.', composition: 'Animals in earnest, friendly council.', light: 'Gentle dusk light.' }) },
      { id: 3, text: { en: `The very next day, a weary old traveller came limping through the meadow, hungry and footsore and far from home. "Friends," he said, "I have walked a long, long way, and I have nothing left to eat. Can any of you spare a poor old traveller a little food?" At once, the three friends hurried to help.` },
        image: IMG, imageAlt: 'A weary old traveller arriving in the meadow.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'A weary old traveller limps into the meadow and asks the friends for food.', composition: 'Tired traveller, kind animals gathering.', light: 'Warm low evening light.' }) },
      { id: 4, text: { en: `The clever monkey scampered up the trees and gathered an armful of ripe sweet mangoes. The sleek otter slipped into the river and brought back a fine fresh fish. One by one they laid their gifts before the traveller, glad to share. But the little rabbit stood quietly aside, for she had nothing to bring.` },
        image: IMG, imageAlt: 'A monkey and otter bringing fruit and fish to a traveller.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'The monkey brings mangoes and the otter a fish, while the rabbit stands empty-pawed.', composition: 'Generous friends, rabbit watching wistfully.', light: 'Soft golden dusk.' }) },
      { id: 5, text: { en: `Poor Reni had no fruit to pick and no fish to catch. All she could gather was grass, and grass was no food for a hungry traveller. Her gentle heart ached. "I made a promise to share," she thought, "and I cannot bear to give nothing. I must find SOME way to help this poor old soul."` },
        image: IMG, imageAlt: 'A rabbit looking thoughtful, wishing she had something to give.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'Reni looks thoughtful and tender, longing to find a way to help.', composition: 'Pensive rabbit in the evening meadow.', light: 'Wistful dusk light.' }) },
      { id: 6, text: { en: `Then Reni had an idea, born purely out of love. "Dear traveller," she said bravely, "I have no fruit and no fish — but I will gladly give you all that I have, and all that I am, to help you on your way." And she gathered every scrap of her courage, and offered her own self to share, holding nothing back.` },
        image: IMG, imageAlt: 'A brave little rabbit offering all she has to the traveller.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'Reni bravely and lovingly offers everything she has to help the traveller.', composition: 'Selfless rabbit before the old traveller.', light: 'Tender glowing light.' }) },
      { id: 7, text: { en: `But the old traveller was no ordinary traveller at all. He was the great Spirit of the Moon, who had come down to the meadow in disguise, to see for himself which heart was kindest of all. And he was so deeply moved by the little rabbit's selfless love that his eyes filled with silver tears.` },
        image: IMG, imageAlt: 'The traveller revealed as a glowing Moon Spirit.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'The traveller is revealed as the glowing Spirit of the Moon, moved by the rabbit\'s kindness.', composition: 'Radiant moon spirit, humble rabbit.', light: 'Brilliant silver glow.' }) },
      { id: 8, text: { en: `"Dear, generous rabbit," said the Moon Spirit gently, "you offered everything you had, asking nothing in return. Such kindness must never be forgotten." And with a touch as soft as moonlight, he lifted Reni up, up, up into the night sky, and set her safely upon the bright face of the moon itself.` },
        image: IMG, imageAlt: 'A moon spirit lifting a rabbit up toward the bright moon.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'The Moon Spirit gently lifts Reni up toward the glowing moon.', composition: 'Rabbit rising toward the moon on beams of light.', light: 'Radiant silver light.' }) },
      { id: 9, text: { en: `And there she remains to this very day. For if you look up at the full moon on a clear night, and look closely, you will see the soft shape of a little rabbit shining there — a gentle reminder, set in the sky for all the world, that no kindness, however small, is ever truly lost.` },
        image: IMG, imageAlt: 'The shape of a rabbit visible in the full moon.',
        imagePrompt: P({ cast: [CAST.rabbit], scene: 'The gentle shape of a rabbit glows softly in the face of the full moon over the meadow.', composition: 'Full moon with a rabbit\'s shape, meadow below.', light: 'Luminous moonlit night.' }) }
    ],
    closing: {
      text: { en: `So when next you see the rabbit in the moon, remember little Reni — and that the most precious gift of all is a kindness given freely, with nothing asked in return.` },
      image: IMG, imageAlt: 'A full moon shining over a quiet meadow at night.',
      imagePrompt: P({ scene: 'End vignette: a luminous full moon shining over a quiet, sleeping meadow.', composition: 'Simple peaceful moonlit scene.', light: 'Serene silver glow.' })
    }
  }));
})(window.APP);

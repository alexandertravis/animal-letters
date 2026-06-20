// ─── The Bear and the Bees ────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: patience and good manners win what
// grabbing and greed never could.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/bear.svg';
  var CAST = {
    bear: `Bramwell the bear: a big shaggy brown bear with a round tummy, small kind eyes and an enormous love of honey.`,
    bee: `the bees: a friendly bustling swarm of small golden honeybees with gauzy wings.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'bear-and-bees',
    title:    { en: "The Bear and the Bees" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'chestnut', board: null, color: '#6a4a32',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['bear', 'bee'], coverAnimal: 'bear',
    requirements: [{ animalId: 'bear', minCount: 1, label: 'Find the Bear' }],
    cover: {
      image: IMG, imageAlt: 'A big brown bear looking up at a beehive in a tree.',
      imagePrompt: P({ cast: [CAST.bear], scene: 'Bramwell the bear gazes longingly up at a golden beehive high in a tree.', composition: 'Bear below, honey-hive in the branches.', light: 'Warm sunny woodland light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a sunny corner of the woods lived a big brown bear named Bramwell, who loved one thing above all else in the world: honey. Sweet, golden, sticky honey. And one fine morning, his nose led him to a wonderful prize — a great honey-filled beehive, humming high in the branches of an old oak.` },
        image: IMG, imageAlt: 'A bear sniffing out a honey-filled beehive.',
        imagePrompt: P({ cast: [CAST.bear], scene: 'Bramwell sniffs out a golden beehive humming high in an oak tree.', composition: 'Bear nose-up, hive above.', light: 'Bright honey-gold light.' }) },
      { id: 2, text: { en: `"Honey!" rumbled Bramwell, his mouth watering. "And I want it NOW." He did not stop to think, and he certainly did not stop to ask. He simply reared up, gave the hive a great greedy WHACK with his big paw, and grabbed for the honey as fast as he could.` },
        image: IMG, imageAlt: 'A bear greedily swatting at a beehive.',
        imagePrompt: P({ cast: [CAST.bear], scene: 'Bramwell rears up and swats greedily at the beehive.', composition: 'Bear striking the hive, bees stirring.', light: 'Bright, busy light.' }) },
      { id: 3, text: { en: `Well! Out poured the bees in a furious golden cloud. BZZZZZ! They were very cross indeed at having their home walloped, and they buzzed all around poor Bramwell — bzz on his nose, bzz on his ears, bzz on his big sensitive paws — until he ran off howling, with not a drop of honey to show for it.` },
        image: IMG, imageAlt: 'An angry swarm of bees chasing a bear away.',
        imagePrompt: P({ cast: [CAST.bear, CAST.bee], scene: 'A cross golden swarm chases Bramwell away from the hive.', composition: 'Bear fleeing, cloud of bees behind.', light: 'Bright frantic light.' }) },
      { id: 4, text: { en: `Bramwell sat down at a safe distance, rubbing his sore nose and feeling very sorry for himself. "All I wanted was a little honey," he grumbled. "Why must they be so unfriendly?" A wise old badger, passing by, raised an eyebrow. "And how, exactly, did you ask them for it?" she said.` },
        image: IMG, imageAlt: 'A sore-nosed bear grumbling as a badger looks on.',
        imagePrompt: P({ cast: [CAST.bear], scene: 'Bramwell rubs his sore nose and grumbles while a wise badger questions him.', composition: 'Glum bear, knowing badger.', light: 'Soft afternoon light.' }) },
      { id: 5, text: { en: `Bramwell blinked. "Ask them?" he said. "I... I didn't ask. I just grabbed." The badger nodded slowly. "There you are, then. You smashed their home and snatched at their honey. Of course they were cross. Bees work very hard to make that honey. Perhaps if you asked them kindly, things might go quite differently."` },
        image: IMG, imageAlt: 'A wise badger advising a thoughtful bear.',
        imagePrompt: P({ cast: [CAST.bear], scene: 'The wise badger advises a now-thoughtful Bramwell.', composition: 'Badger and bear in conversation.', light: 'Gentle woodland light.' }) },
      { id: 6, text: { en: `Bramwell had never thought of that. So the next morning, he padded slowly and gently back to the oak tree, taking great care not to frighten anyone. "Good morning, bees," he said softly, in his politest voice. "I am terribly sorry I knocked your hive. Please — might I trouble you for just a little honey?"` },
        image: IMG, imageAlt: 'A bear politely approaching the beehive and asking kindly.',
        imagePrompt: P({ cast: [CAST.bear], scene: 'Bramwell approaches the hive gently and asks the bees politely for honey.', composition: 'Calm bear, hive humming, bees curious.', light: 'Soft morning light.' }) },
      { id: 7, text: { en: `The bees buzzed in surprise. No bear had ever said sorry to them before, nor asked so nicely! The queen bee herself flew out to look at him. "Well now," she hummed. "Manners! For a polite bear who asks kindly and does no harm, we are always happy to share a little of our honey."` },
        image: IMG, imageAlt: 'A queen bee greeting a polite bear warmly.',
        imagePrompt: P({ cast: [CAST.bear, CAST.bee], scene: 'The queen bee flies out to greet the surprisingly polite bear.', composition: 'Bear and queen bee, friendly meeting.', light: 'Warm golden light.' }) },
      { id: 8, text: { en: `And so the bees brought Bramwell a great dripping honeycomb, golden and sweet, with no stings and no fuss at all. He thanked them again and again, and promised always to leave them plenty for themselves. The honey, he found, tasted even sweeter for having been kindly given.` },
        image: IMG, imageAlt: 'A happy bear gratefully eating honey shared by the bees.',
        imagePrompt: P({ cast: [CAST.bear, CAST.bee], scene: 'Bramwell gratefully enjoys the golden honeycomb the bees have shared with him.', composition: 'Content bear with honeycomb, bees friendly.', light: 'Warm honey-gold glow.' }) },
      { id: 9, text: { en: `From then on, Bramwell and the bees were the best of friends. He visited often, always asking kindly, always leaving plenty behind — and the bees, in turn, always saved him a share. He had learned the sweetest lesson of all: that good manners earn far more than greedy grabbing ever could.` },
        image: IMG, imageAlt: 'A bear and bees together as friends around the hive.',
        imagePrompt: P({ cast: [CAST.bear, CAST.bee], scene: 'Bramwell and the bees are happy friends, gathered peacefully around the hive.', composition: 'Bear and friendly bees together.', light: 'Golden contented light.' }) }
    ],
    closing: {
      text: { en: `For grabbing and greed earn only stings — but a kind word and good manners can win you a friend, and a share of the honey too.` },
      image: IMG, imageAlt: 'A golden honeycomb dripping on a leaf in the sun.',
      imagePrompt: P({ scene: 'End vignette: a golden honeycomb dripping slowly on a broad leaf in warm sun.', composition: 'Simple still life, honeycomb on a leaf.', light: 'Warm golden glow.' })
    }
  }));
})(window.APP);

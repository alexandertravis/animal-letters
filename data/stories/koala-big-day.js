// ─── Sleepy Koala's Big Day ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: even a sleepy friend will rouse for those they love.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    koala: `Kobi the koala: a round, sleepy grey koala with a big soft nose and droopy eyelids, who loves naps above all things but has a very loyal heart.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'koala-big-day',
    title:    { en: "Sleepy Koala's Big Day" },
    subtitle: 'an original tale',
    skin: 'watercolour', leather: null, board: 'sage', color: '#8a9a8e',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['koala'], coverAnimal: 'koala',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/koala.svg',
      imageAlt: 'A sleepy koala dozing in the fork of a eucalyptus tree.',
      imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi the koala dozes peacefully in the fork of a silvery eucalyptus tree.', composition: 'Koala nestled in branches, leaves framing.', light: 'Soft dappled gum-tree light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Kobi the koala loved to sleep. He slept in the morning and he slept in the afternoon, high in the fork of his favourite gum tree, with his soft nose tucked under one paw. Sleeping, he often said, was his very best thing.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala fast asleep in a tree with his nose tucked under a paw.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi sleeps deeply in his gum tree, nose tucked under a paw.', composition: 'Cosy close shot in the branch fork.', light: 'Warm dappled light.' }) },
      { id: 2, text: { en: `One morning his small friend Wren came fluttering up in a flap. "Kobi! Kobi! It's the Forest Picnic today, and you promised to help me carry the blossoms! Wake up!" Kobi opened one sleepy eye. "Five more minutes," he yawned.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A small bird trying to wake a sleepy koala in a tree.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'A little wren flutters anxiously by Kobi as he cracks open one sleepy eye.', composition: 'Bird fussing, koala barely waking.', light: 'Fresh morning light.' }) },
      { id: 3, text: { en: `Five minutes became ten, and ten became a doze. When Kobi finally blinked awake, the sun was high. "Oh no," he said. "The picnic!" He had slept through the whole morning, and his friend had gone on alone.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala waking with a start, the sun high in the sky.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi jolts awake to find the sun high, alarm on his sleepy face.', composition: 'Koala sitting up suddenly, bright sky.', light: 'High bright midday.' }) },
      { id: 4, text: { en: `Kobi was usually far too sleepy to hurry. But he had made a promise, and his friend needed him. So he did something he almost never did: he climbed down quickly and set off across the forest as fast as his slow legs could go.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala climbing down his tree in a hurry.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi climbs down his gum tree in an unusual hurry, determined.', composition: 'Koala descending the trunk, purposeful.', light: 'Bright midday.' }) },
      { id: 5, text: { en: `He padded past the creek, where he very much wanted to stop and nap on a warm rock. He padded through the ferns, where a soft mossy bed almost called his name. But each time he yawned, he thought of Wren, and kept going.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala walking past a tempting sunny rock, yawning but not stopping.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi pads past a tempting warm rock, yawning hugely but pressing on.', composition: 'Koala walking, cosy nap-spot behind him.', light: 'Warm forest light.' }) },
      { id: 6, text: { en: `When he reached the picnic clearing, poor Wren was trying to carry a great heap of blossoms all by herself, dropping more than she gathered. "Kobi! You came!" she cried, and dropped the lot in surprise and delight.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala arriving to help a little bird buried in blossoms.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi arrives in the picnic clearing where the wren is buried under a tumble of blossoms.', composition: 'Joyful arrival, scattered petals.', light: 'Bright clearing light.' }) },
      { id: 7, text: { en: `Kobi's strong arms, so good at hugging tree trunks, were just right for carrying blossoms. Together they decked the whole clearing in petals while the other animals gasped at how lovely it looked.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala and a bird decorating a clearing with blossoms.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi and the wren drape the picnic clearing in blossoms together.', composition: 'Two friends working, flowery clearing.', light: 'Soft golden afternoon.' }) },
      { id: 8, text: { en: `It was the best Forest Picnic anyone could remember. And when at last the food was eaten and the songs were sung, Kobi found the warmest, softest patch of grass — and there he had the finest, most well-earned nap of his life.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A koala napping happily after the picnic, surrounded by petals.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'A contented Kobi naps on soft grass amid petals after the picnic.', composition: 'Peaceful resting koala, festive remains.', light: 'Mellow late-afternoon glow.' }) },
      { id: 9, text: { en: `"You're the sleepiest koala in the forest," laughed Wren, settling on his ear. "True," said Kobi with a yawn. "But never too sleepy for a friend." And he drifted off with a smile, the petals soft beneath him.` },
        image: 'assets/images/cartoon/koala.svg', imageAlt: 'A bird perched on a sleeping koala’s ear, both content.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'The little wren perches on the ear of the sleeping, smiling Kobi.', composition: 'Tender close shot, friends at rest.', light: 'Warm dusk light.' }) }
    ],
    closing: {
      text: { en: `And ever after, the forest knew: Kobi might be slow to wake, but for a friend in need, he would always, always come.` },
      image: 'assets/images/cartoon/koala.svg', imageAlt: 'A single gum leaf and a blossom resting together on a branch.',
      imagePrompt: P({ scene: 'End vignette: a silvery gum leaf and a single blossom resting together on a branch at dusk.', composition: 'Simple still life.', light: 'Soft evening light.' })
    }
  }));
})(window.APP);

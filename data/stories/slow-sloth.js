// ─── Slowly, Said the Sloth ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: slowing down lets you see what haste misses.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/sloth.svg';
  var CAST = {
    sloth: `Sunny the sloth: a shaggy tan sloth with a round sleepy face, dark patches around gentle eyes and a slow contented smile, hanging from a jungle branch.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'slow-sloth',
    title:    { en: "Slowly, Said the Sloth" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'sage', board: null, color: '#7a8a5a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['sloth'], coverAnimal: 'sloth',
    requirements: [{ animalId: 'sloth', minCount: 1, label: 'Find the Sloth' }],
    cover: {
      image: IMG, imageAlt: 'A smiling sloth hanging from a leafy jungle branch.',
      imagePrompt: P({ cast: [CAST.sloth], scene: 'Sunny the sloth hangs contentedly from a leafy branch, smiling slowly.', composition: 'Sloth on a branch among big jungle leaves.', light: 'Warm dappled jungle light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a tall, leafy tree in the warm green jungle lived a sloth named Sunny. Sunny did everything slowly. He climbed slowly, he ate slowly, he even blinked slowly. While the rest of the jungle rushed and scrambled and hurried about, Sunny simply took his gentle time.` },
        image: IMG, imageAlt: 'A sloth moving slowly along a branch while other animals rush by.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'Sunny moves slowly along his branch while monkeys and birds rush past in a blur.', composition: 'Calm sloth, busy jungle whirling around.', light: 'Bright busy jungle light.' }) },
      { id: 2, text: { en: `The young monkeys found this very funny. "Hurry UP, Sunny!" they chattered, swinging circles around him. "You're missing everything! There's no time to waste!" Sunny only smiled his slow smile. "I am not missing everything," he said. "I think perhaps it is you who are."` },
        image: IMG, imageAlt: 'Young monkeys teasing a slow-moving sloth.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'Cheeky young monkeys swing in circles, teasing the unhurried sloth.', composition: 'Monkeys mid-swing, sloth serene.', light: 'Dappled green light.' }) },
      { id: 3, text: { en: `The monkeys did not understand him. So one morning Sunny said, "Come, spend a single slow day with me, and see." The monkeys giggled, but they were curious, so they agreed — though sitting still even for a moment was the hardest thing they had ever tried.` },
        image: IMG, imageAlt: 'A sloth inviting restless monkeys to sit with him on a branch.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'Sunny gently invites the restless monkeys to settle beside him on the branch.', composition: 'Sloth and fidgety monkeys on a branch.', light: 'Soft morning jungle light.' }) },
      { id: 4, text: { en: `"First," murmured Sunny, "look — really look — at one single leaf." The monkeys huffed, but they looked. And slowly they began to see: the leaf was not just green. It had silver veins, and a fuzz of tiny hairs, and a bead of dew that held a whole tiny rainbow inside.` },
        image: IMG, imageAlt: 'A sloth and monkeys studying a single dewy leaf closely.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'Sunny and the monkeys peer closely at a single dewdrop-jewelled leaf.', composition: 'Heads bent over one bright leaf.', light: 'Sparkling dew-lit close light.' }) },
      { id: 5, text: { en: `"Now," said Sunny, "listen." The monkeys went quiet. And in the stillness they heard things they had always rushed straight past — the hush of the wind in the canopy, the trickle of a hidden stream, a far-off bird singing a song so lovely it made them hold their breath.` },
        image: IMG, imageAlt: 'A sloth and monkeys sitting quietly, listening to the jungle.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'The group sits utterly still, listening to the quiet music of the jungle.', composition: 'Stillness on the branch, ears attentive.', light: 'Calm filtered light.' }) },
      { id: 6, text: { en: `All through that slow day, Sunny showed them his gentle world: the lazy drift of a cloud, the careful march of a beetle, the way the warm light moved across the leaves as the sun crossed the sky. The monkeys, for once, were not bored at all. They were enchanted.` },
        image: IMG, imageAlt: 'Monkeys watching a beetle and clouds with the sloth, calm and amazed.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'The monkeys watch a beetle and drifting clouds, calm and wide-eyed with wonder.', composition: 'Quiet group taking in small marvels.', light: 'Slow-moving warm afternoon light.' }) },
      { id: 7, text: { en: `As the day softened into evening, the smallest monkey leaned against Sunny with a happy sigh. "I never knew the jungle had so much IN it," he said. "We're always going so fast that it all turns into a blur." Sunny nodded his slow nod. "Now you see," he said warmly.` },
        image: IMG, imageAlt: 'A small monkey leaning happily against a sloth at evening.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'The smallest monkey leans contentedly against Sunny as evening softens the jungle.', composition: 'Sloth and small monkey close, restful.', light: 'Warm golden dusk.' }) },
      { id: 8, text: { en: `The monkeys still loved to swing and race and chase, of course — that was their way, and a fine way it was. But now and then, every single day, they remembered to stop. To look at one leaf. To listen. To let the wonderful jungle catch up with them again.` },
        image: IMG, imageAlt: 'Monkeys pausing to look around, with the sloth nearby.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'The monkeys pause mid-play to look and listen, Sunny smiling nearby.', composition: 'Monkeys still for a moment, sloth content.', light: 'Bright but gentle light.' }) },
      { id: 9, text: { en: `And Sunny? Sunny just kept on being Sunny — climbing slowly, eating slowly, blinking slowly, and smiling his slow contented smile. For he had known the secret all along: that the world is full of treasures, and you only ever find them when you slow right down to look.` },
        image: IMG, imageAlt: 'A content sloth smiling slowly on his branch at dusk.',
        imagePrompt: P({ cast: [CAST.sloth], scene: 'Sunny smiles his slow, content smile, hanging peacefully on his branch at dusk.', composition: 'Serene sloth on the branch.', light: 'Soft tranquil dusk glow.' }) }
    ],
    closing: {
      text: { en: `So next time the whole world seems to be rushing by in a blur, remember Sunny — stop, look at one single leaf, and let the wonder catch you up.` },
      image: IMG, imageAlt: 'A single dewy leaf glowing in soft evening light.',
      imagePrompt: P({ scene: 'End vignette: a single dewdrop-jewelled leaf glowing in soft evening light.', composition: 'Simple close-up, one leaf.', light: 'Gentle glowing dusk.' })
    }
  }));
})(window.APP);

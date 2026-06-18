// ─── The Snake Who Couldn't Whistle ───────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: you don't have to do it like everyone else to do it beautifully.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    snake: `Sasha the snake: a slender green grass-snake with bright friendly eyes and a long graceful body, cheerful and determined, who longs to make music with the songbirds.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'snake-song',
    title:    { en: "The Snake Who Couldn't Whistle" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'leaf', board: null, color: '#4a7a3a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['snake'], coverAnimal: 'snake',
    requirements: [{ animalId: 'snake', minCount: 1, label: 'Find the Snake' }],
    cover: {
      image: 'assets/images/cartoon/snake.svg',
      imageAlt: 'A friendly green snake curled on a branch among singing birds.',
      imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha the green snake curls happily on a branch among cheerful songbirds.', composition: 'Snake coiled on a branch, birds around.', light: 'Bright dappled morning light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Sasha the snake loved music more than anything. Every morning she curled on a sunny branch to listen to the songbirds whistle their bright, beautiful tunes, and she wished with all her heart that she could whistle too.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake listening happily to whistling birds on a branch.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha listens with delight to whistling songbirds from her sunny branch.', composition: 'Snake listening, birds singing nearby.', light: 'Bright morning light.' }) },
      { id: 2, text: { en: `So Sasha tried to whistle. She pursed her mouth — but snakes have no lips to purse. She tried to trill — but only a faint hiss came out. She tried and tried, all morning long, but not one whistled note would come.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake trying hard to whistle with no success.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha screws up her face trying to whistle, only a faint puff coming out.', composition: 'Close on the trying, frustrated snake.', light: 'Soft warm light.' }) },
      { id: 3, text: { en: `"It's no use," she sighed. "I shall never make music like the birds." The little wren felt sorry for her. "Maybe singing just isn't a thing snakes can do," she said kindly. Sasha drooped, more sad than she had ever been.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A sad snake drooping on a branch as a wren looks on kindly.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'A sad Sasha droops on the branch while a kind little wren looks on.', composition: 'Dejected snake, sympathetic bird.', light: 'Gentle muted light.' }) },
      { id: 4, text: { en: `That night, sad and sleepless, Sasha slid down to the meadow grass. As she moved, her long body brushed through the dry stalks and made a soft sound — shhhh, shhhh — like wind, or waves, or rain on leaves. She stopped, surprised.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake gliding through dry grass at night, making soft sounds.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha glides through dry meadow grass at night, the stalks making a soft whispering sound.', composition: 'Snake winding through moonlit grass.', light: 'Cool soft moonlight.' }) },
      { id: 5, text: { en: `She tried it again, faster, then slower, this way and that. The grass whispered and rustled in long, lovely rhythms — soft and shushing, rising and falling. It was not whistling. But it was, Sasha realised with a thrill, music all the same.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake weaving patterns through grass, making rhythmic sounds.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha weaves rhythmic patterns through the grass, delighted by the sounds she makes.', composition: 'Snake tracing graceful loops in grass.', light: 'Silvery moonlight.' }) },
      { id: 6, text: { en: `By morning Sasha had learned to make all sorts of sounds — the hush of falling rain, the rustle of autumn leaves, the long soft sigh of the sea — simply by gliding through the grass in different ways. It was a music all her own.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake making music through grass as the sun rises.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'At sunrise Sasha glides through the grass, making soft musical rustling sounds.', composition: 'Snake performing in dewy grass.', light: 'Fresh pink-gold sunrise.' }) },
      { id: 7, text: { en: `When the songbirds woke and began their whistling, Sasha joined in — not whistling, but rustling, a soft shushing rhythm beneath their bright melody. And oh, how lovely the two sounds were together! The birds had never heard the like.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A snake making rustling music as birds whistle along.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Sasha rustles a soft rhythm in the grass while the songbirds whistle their melody above.', composition: 'Snake below, singing birds above, in harmony.', light: 'Bright morning light.' }) },
      { id: 8, text: { en: `"That's the most wonderful sound!" cried the wren. "It's like the whole world breathing. We could never make THAT — it's yours alone." Soon every creature in the wood came to hear the snake and the birds make music together.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'Animals gathering to hear a snake and birds make music.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'Woodland animals gather happily to hear Sasha and the birds perform together.', composition: 'Snake and birds, delighted audience.', light: 'Warm golden light.' }) },
      { id: 9, text: { en: `"I spent so long wishing I could whistle like the birds," said Sasha, "that I nearly missed the music only I could make." And from then on, she never wished to be anything but exactly, wonderfully herself.` },
        image: 'assets/images/cartoon/snake.svg', imageAlt: 'A happy snake making her own music in the sunny grass.',
        imagePrompt: P({ cast: [CAST.snake], scene: 'A joyful Sasha makes her own rustling music in the sunny meadow grass.', composition: 'Content snake performing happily.', light: 'Full warm sunlight.' }) }
    ],
    closing: {
      text: { en: `And on still evenings, if you hear the grass whispering its softest song, it may just be the snake who could not whistle — making music all her own.` },
      image: 'assets/images/cartoon/snake.svg', imageAlt: 'Soft grass stalks swaying in the evening light.',
      imagePrompt: P({ scene: 'End vignette: soft meadow grass stalks swaying gently in the evening breeze.', composition: 'Minimal grass against quiet sky.', light: 'Soft golden dusk.' })
    }
  }));
})(window.APP);

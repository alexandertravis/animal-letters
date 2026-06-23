// ─── The Llama Who Learned to Hum ─────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a calm word beats a cross one.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/llama.svg';
  var CAST = {
    llama: `Lola the llama: a fluffy cream-coloured llama with a long graceful neck, tall ears and big dark eyes; warm-hearted but quick to get cross.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'kind-llama',
    title:    { en: "The Llama Who Learned to Hum" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'buff', board: null, color: '#c9a86a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['llama'], coverAnimal: 'llama',
    requirements: [{ animalId: 'llama', minCount: 1, label: 'Find the Llama' }],
    cover: {
      image: IMG, imageAlt: 'A fluffy llama standing on a green hillside.',
      imagePrompt: P({ cast: [CAST.llama], scene: 'Lola the llama stands calmly on a green hillside under a wide sky.', composition: 'Llama centred on a grassy hill.', light: 'Bright clear highland light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On a breezy green hillside lived a llama named Lola. She was kind and clever and had the softest fleece on the whole hill — but Lola had one little problem. Whenever something went wrong, or somebody annoyed her, she would lose her temper in a flash and... spit!` },
        image: IMG, imageAlt: 'A llama looking cross with her ears back.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola stands with her ears flicked back, looking suddenly cross.', composition: 'Llama close, expression irritable.', light: 'Bright daylight.' }) },
      { id: 2, text: { en: `When the goat nibbled her favourite clover — ptoo! When the wind blew dust in her eyes — ptoo! When her brother trod on her tail — ptoo, ptoo! It did not really help anything, and it upset her friends, but Lola just could not seem to stop herself in time.` },
        image: IMG, imageAlt: 'A llama spitting crossly as a goat backs away.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola spits crossly and a startled goat backs away from her.', composition: 'Llama mid-temper, goat retreating.', light: 'Clear day.' }) },
      { id: 3, text: { en: `One by one, the other animals began to keep their distance. "I do like Lola," sighed the rabbit, "but you never know when she'll blow up." Lola heard this, and it made her sad. "I don't WANT to be cross," she thought. "But by the time I notice, it's already too late."` },
        image: IMG, imageAlt: 'A sad llama watching other animals keep their distance.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola looks sad and lonely as the other animals keep their distance.', composition: 'Lone llama, friends far off.', light: 'Soft overcast.' }) },
      { id: 4, text: { en: `So Lola went to see the wise old alpaca who lived at the very top of the hill. "Whatever can I do?" she asked. "My temper is faster than my thinking." The old alpaca chewed thoughtfully. "When the cross feeling comes," she said, "do not let it out as a spit. Let it out as a hum."` },
        image: IMG, imageAlt: 'A wise old alpaca giving advice to a young llama.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'A wise old alpaca shares quiet advice with Lola at the top of the hill.', composition: 'Two on the hilltop, heads close.', light: 'Gentle high light.' }) },
      { id: 5, text: { en: `"A hum?" said Lola, puzzled. "A hum," nodded the alpaca. "When you feel the heat rising, close your mouth and hum a low, slow tune. By the time the hum is done, the cross feeling will have softened, and you can choose your words instead of spitting them." Lola decided to try.` },
        image: IMG, imageAlt: 'A llama practising humming with her mouth gently closed.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola practises a low, slow hum, eyes closed, her mouth gently shut.', composition: 'Calm llama humming to herself.', light: 'Soft warm light.' }) },
      { id: 6, text: { en: `The very next day, the goat nibbled her clover again. The hot cross feeling came rushing up — but this time Lola closed her mouth and hummed. Mmmmmm. The hum buzzed gently in her chest. And as it faded, so did her temper, just a little, just enough.` },
        image: IMG, imageAlt: 'A llama humming calmly instead of spitting as a goat nibbles nearby.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola hums calmly instead of spitting while the goat nibbles her clover.', composition: 'Llama composed, goat unbothered.', light: 'Bright steady daylight.' }) },
      { id: 7, text: { en: `When the hum was done, Lola found she could speak. "Goat," she said evenly, "that's my clover patch. Would you ask me next time?" "Oh — of course, sorry!" said the goat, who had never meant any harm. And that was that. No spit, no fuss, just two friends sorting it out.` },
        image: IMG, imageAlt: 'A llama and a goat talking kindly together.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola speaks calmly and the goat apologises; the two settle it kindly.', composition: 'Llama and goat in friendly talk.', light: 'Warm afternoon.' }) },
      { id: 8, text: { en: `It was not always easy, and now and then a tiny spit still slipped out. But more and more, the hum came first. And slowly, the animals drifted back. They sat with Lola and grazed beside her, for now they knew that even when she was cross, she would hum it kindly out.` },
        image: IMG, imageAlt: 'A llama grazing happily among returning friends.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'Lola grazes happily as her friends gather close around her once more.', composition: 'Llama amid a content little herd.', light: 'Golden grazing light.' }) },
      { id: 9, text: { en: `In time, the breezy hilltop became known as the most peaceful place around — all because one quick-tempered llama had learned the gentlest trick of all: to hum first, and choose her words second. And her fleece, everyone agreed, had never looked so soft.` },
        image: IMG, imageAlt: 'A calm happy llama on a peaceful green hilltop.',
        imagePrompt: P({ cast: [CAST.llama], scene: 'A calm, happy Lola stands on the peaceful green hilltop among friends.', composition: 'Serene llama, gentle herd, open sky.', light: 'Warm tranquil light.' }) }
    ],
    closing: {
      text: { en: `So if ever a cross feeling comes rushing up faster than your thinking, try what Lola tried — close your mouth, hum a slow little tune, and let your kindness catch up.` },
      image: IMG, imageAlt: 'A soft tuft of llama fleece resting on green grass.',
      imagePrompt: P({ scene: 'End vignette: a soft tuft of cream fleece resting on green grass in the breeze.', composition: 'Simple still life, fleece on grass.', light: 'Gentle breezy daylight.' })
    }
  }));
})(window.APP);

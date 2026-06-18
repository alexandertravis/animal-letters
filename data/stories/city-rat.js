// ─── The Clever City Rat ──────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: cleverness is best when it's used to help.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    rat:   `Remy the rat: a tidy grey city rat in a little waistcoat, quick-witted and resourceful, who knows every alley, pipe and shortcut in the old town.`,
    mouse: `Pip the mouse: a small country mouse with a patched cap, gentle and new to the city, easily lost among the tall buildings.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'city-rat',
    title:    { en: "The Clever City Rat" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'slate', board: null, color: '#5a6068',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['rat', 'mouse'], coverAnimal: 'rat',
    requirements: [{ animalId: 'rat', minCount: 1, label: 'Find the Rat' }],
    cover: {
      image: 'assets/images/cartoon/rat.svg',
      imageAlt: 'A tidy city rat in a waistcoat guiding a small mouse through cobbled streets.',
      imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy the city rat in a waistcoat leads a small lost mouse through lamplit cobbled streets.', composition: 'Two small figures in a tall old town.', light: 'Warm lamplit evening.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Remy the rat knew the old town like the back of his paw. Every alley, every drainpipe, every secret shortcut — Remy knew them all. He was quick and clever, and rather proud of being the cleverest creature in the city.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A clever rat in a waistcoat in a city alley.',
        imagePrompt: P({ cast: [CAST.rat], scene: 'Remy the rat stands confidently in a cobbled city alley, knowing every way.', composition: 'Rat in an atmospheric old alley.', light: 'Warm lamplit dusk.' }) },
      { id: 2, text: { en: `One evening Remy found a small country mouse sitting on a kerb, lost and tearful. "I came to the city to find my cousin," sniffed Pip, "but the streets are so big, and I'm so small, and I can't find my way anywhere at all."` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'A small lost mouse sitting tearful on a city kerb.',
        imagePrompt: P({ cast: [CAST.mouse], scene: 'A small country mouse sits lost and tearful on a city kerb under tall buildings.', composition: 'Tiny mouse, looming city around.', light: 'Soft evening street light.' }) },
      { id: 3, text: { en: `Now, Remy could have shown off all his cleverness, rattled off a hundred shortcuts, and left the mouse more confused than ever. But he looked at Pip's frightened little face, and instead he simply said, "Don't worry. I'll take you there myself."` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A kind rat offering to help a lost mouse.',
        imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy kneels to reassure the lost little mouse with a kind smile.', composition: 'Rat and mouse, gentle exchange.', light: 'Warm lamplight.' }) },
      { id: 4, text: { en: `Through the lamplit streets they went. Remy led Pip along quiet ledges away from the rumbling carts, under a fence to dodge a prowling cat, and through a cosy warm bakery vent that smelled of fresh bread.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A rat leading a mouse along a safe ledge above a busy street.',
        imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy guides Pip along a safe ledge above the bustling lamplit street.', composition: 'Two small figures on a high ledge.', light: 'Glowing city night light.' }) },
      { id: 5, text: { en: `As they went, Remy didn't just lead — he taught. "See the tall clock tower? That's always north. Follow the smell of the river to find your way down. Count the bridges." Pip listened hard and remembered every word.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A rat pointing out city landmarks to an attentive mouse.',
        imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy points out the clock tower and landmarks while Pip listens carefully.', composition: 'Rat gesturing, mouse looking up at the skyline.', light: 'Warm night-city glow.' }) },
      { id: 6, text: { en: `A sudden rainstorm caught them halfway. Quick as a flash, Remy ducked them both into a hollow pipe, dry and snug, and they waited out the downpour together, sharing a crumb of bakery bread and watching the rain sparkle in the lamplight.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A rat and mouse sheltering in a pipe from the rain.',
        imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy and Pip shelter cosily in a pipe, sharing bread as rain sparkles outside.', composition: 'Two friends snug in the pipe mouth.', light: 'Cosy glow against rainy dark.' }) },
      { id: 7, text: { en: `At last they reached a snug little wall-nook, where Pip's cousin lived. "Pip! You found me!" the cousin cried, and there were happy squeaks and hugs all round. Pip turned to Remy, eyes shining. "I'd never have managed without you."` },
        image: 'assets/images/cartoon/mouse.svg', imageAlt: 'Two mice reuniting joyfully as a rat looks on.',
        imagePrompt: P({ scene: 'Pip reunites joyfully with his cousin while Remy the rat looks on, pleased.', composition: 'Two mice hugging, rat smiling nearby.', light: 'Warm welcoming nook light.' }) },
      { id: 8, text: { en: `"You'll manage fine next time," said Remy. "You know the clock tower, the river, the bridges now. I didn't just bring you here — I taught you the way. That's the best kind of help there is." Pip nodded, proud and grateful.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A rat saying goodbye warmly to a more confident mouse.',
        imagePrompt: P({ cast: [CAST.rat, CAST.mouse], scene: 'Remy bids a warm goodbye to a now-confident Pip.', composition: 'Rat and mouse parting fondly.', light: 'Soft lamplit night.' }) },
      { id: 9, text: { en: `Remy trotted home through his beloved streets, feeling cleverer than ever — not for knowing all the shortcuts, but for having used what he knew to help someone find their way. That, he decided, was the cleverest thing of all.` },
        image: 'assets/images/cartoon/rat.svg', imageAlt: 'A happy rat trotting home through lamplit streets at night.',
        imagePrompt: P({ cast: [CAST.rat], scene: 'Remy trots contentedly home through the lamplit cobbled streets at night.', composition: 'Lone happy rat in the glowing city.', light: 'Warm lamplit night.' }) }
    ],
    closing: {
      text: { en: `And ever after, when small travellers got lost in the big old town, they were always told the same thing: find the clever city rat — he'll not just show you the way, he'll teach it to you.` },
      image: 'assets/images/cartoon/rat.svg', imageAlt: 'A lamplit cobbled street with a distant clock tower at night.',
      imagePrompt: P({ scene: 'End vignette: a quiet lamplit cobbled street with a clock tower glowing in the distance.', composition: 'Atmospheric empty street, tower beyond.', light: 'Warm night-city glow.' })
    }
  }));
})(window.APP);

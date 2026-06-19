// ─── Walrus and the Long Winter ───────────────────────────────────────────────
// Original gentle seasonal tale. ~9 pages. Moral: together we keep each other warm.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/walrus.svg';
  var CAST = {
    walrus: `Wilbur the walrus: a big round brown walrus with two long ivory tusks, bristly whiskers and warm kind eyes, lounging on an icy shore.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'walrus-winter',
    title:    { en: "Walrus and the Long Winter" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'navy', board: null, color: '#2f4a6a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['walrus'], coverAnimal: 'walrus',
    requirements: [{ animalId: 'walrus', minCount: 1, label: 'Find the Walrus' }],
    cover: {
      image: IMG, imageAlt: 'A big friendly walrus on a snowy shore by an icy sea.',
      imagePrompt: P({ cast: [CAST.walrus], scene: 'Wilbur the walrus rests on a snowy shore beside a calm icy sea.', composition: 'Walrus on the ice, frozen sea behind.', light: 'Cool pale arctic light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On a far northern shore, where the sea wore a crust of ice and the wind blew sharp and cold, lived a big warm-hearted walrus named Wilbur. He had a thick coat and a round belly and was almost never cold — and he loved nothing better than to keep his friends snug and warm.` },
        image: IMG, imageAlt: 'A warm walrus resting among small arctic animals on the ice.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'Wilbur rests warmly on the ice while small arctic creatures gather near.', composition: 'Big walrus, little animals nearby.', light: 'Soft pale arctic daylight.' }) },
      { id: 2, text: { en: `That year, the winter came early and stayed late, colder and longer than any the animals could recall. The wind howled, the snow piled high, and the smaller creatures of the shore — the little auks and the snow hares — shivered and shook, too cold to sleep a wink.` },
        image: IMG, imageAlt: 'Small arctic animals shivering in a snowstorm.',
        imagePrompt: P({ scene: 'Small arctic birds and hares shiver against a fierce, snowy wind.', composition: 'Tiny animals huddled in blowing snow.', light: 'Harsh blue-white storm light.' }) },
      { id: 3, text: { en: `Wilbur could not bear to see his little friends so cold. "Come here, all of you," he called, "and gather close against my side." So the auks and the hares crept up and snuggled against Wilbur's warm round belly, out of the wind, and at once they began to feel better.` },
        image: IMG, imageAlt: 'Small animals snuggling against a warm walrus.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'Little auks and snow hares snuggle against Wilbur\'s warm side, out of the wind.', composition: 'Walrus sheltering a cluster of small animals.', light: 'Cosy glow against the storm.' }) },
      { id: 4, text: { en: `But the winter grew colder still, and more shivering creatures came — a fox with frosted fur, a pair of lost puffins, a whole family of hares. Soon there were far too many to fit against Wilbur's side, and those at the back were still left shivering out in the cold.` },
        image: IMG, imageAlt: 'More cold animals arriving than can fit beside the walrus.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'More cold animals arrive than can fit against the walrus; some shiver at the back.', composition: 'Crowd of animals, some left in the cold.', light: 'Cold storm-light.' }) },
      { id: 5, text: { en: `Wilbur thought hard. One warm walrus, he saw, could only shelter so many on his own. "We shall need a better way," he said. "If we cannot all fit against ME — then we must all keep each OTHER warm. Everyone, gather in close, in a great big huddle, and press together."` },
        image: IMG, imageAlt: 'A walrus directing animals to huddle together in a circle.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'Wilbur gently directs all the animals to gather into a great warm huddle.', composition: 'Walrus organising a circle of animals.', light: 'Pale storm light, hopeful.' }) },
      { id: 6, text: { en: `So they did. They packed in tight, each one warming the next — fox against hare, puffin against auk, all of them wrapped warmly around big Wilbur in the middle. Body to body, the little bit of warmth in each of them added up into a great cosy warmth for all.` },
        image: IMG, imageAlt: 'Many animals huddled in a warm tight circle on the ice.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'All the animals huddle tightly together in a warm circle around Wilbur.', composition: 'Cosy huddle of many animals on the ice.', light: 'Warm glow within, storm outside.' }) },
      { id: 7, text: { en: `And those on the chilly outside edge of the huddle did not stay there long. Every little while, the animals took turns, shuffling round so that each one had a spell in the warm middle and a spell on the edge. No one was left out, and no one was ever too cold for long.` },
        image: IMG, imageAlt: 'Animals taking turns shuffling round a warm huddle.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'The animals gently shuffle round the huddle so everyone gets a turn in the warm middle.', composition: 'Rotating ring of cosy animals.', light: 'Soft warm communal glow.' }) },
      { id: 8, text: { en: `All through the long, fierce winter the huddle held, warm and snug, while the storm raged itself out around them. Sharing their warmth, taking their turns, looking after one another, the animals of the shore came safely through the coldest winter any of them had ever known.` },
        image: IMG, imageAlt: 'A cosy huddle of animals safe through a winter storm.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'The warm huddle holds snug and safe as the winter storm blows past.', composition: 'Steadfast huddle weathering the storm.', light: 'Warm centre against blue cold.' }) },
      { id: 9, text: { en: `When at last the spring sun rose and the ice began to melt, the animals tumbled apart, warm and well and grateful. "We could never have done it alone," they told Wilbur. "No," he smiled, his whiskers twitching. "But together — together, we kept the whole winter warm."` },
        image: IMG, imageAlt: 'Happy animals around a smiling walrus as spring arrives.',
        imagePrompt: P({ cast: [CAST.walrus], scene: 'The animals gather happily around a smiling Wilbur as the spring sun returns.', composition: 'Joyful group, melting ice, warm sun.', light: 'Bright thawing spring light.' }) }
    ],
    closing: {
      text: { en: `For one warm heart can shelter a few — but a whole crowd, huddled close and taking turns, can keep each other warm through any winter at all.` },
      image: IMG, imageAlt: 'A calm icy shore glowing in the returning spring sun.',
      imagePrompt: P({ scene: 'End vignette: a calm icy northern shore glowing softly in the returning spring sun.', composition: 'Simple peaceful arctic shore.', light: 'Gentle warming light.' })
    }
  }));
})(window.APP);

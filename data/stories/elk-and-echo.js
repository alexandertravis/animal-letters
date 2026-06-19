// ─── The Elk and the Echo ─────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: listening matters as much as speaking.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/elk.svg';
  var CAST = {
    elk: `Eldon the elk: a tall russet-brown elk with a proud spreading crown of antlers, a long gentle face and warm brown eyes; loud-voiced but good-hearted.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'elk-and-echo',
    title:    { en: "The Elk and the Echo" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'forest', board: null, color: '#3f5a3a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['elk'], coverAnimal: 'elk',
    requirements: [{ animalId: 'elk', minCount: 1, label: 'Find the Elk' }],
    cover: {
      image: IMG, imageAlt: 'A tall elk calling out across a misty mountain valley.',
      imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon the elk stands on a ridge and calls out across a misty mountain valley.', composition: 'Elk on a ridge, valley falling away.', light: 'Cool misty mountain morning.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On the high green shoulder of Cloudtop Mountain lived an elk named Eldon, who had the loudest, finest voice of any creature there. When he lifted his head and called, his bugling rang from peak to peak so that every animal for miles could hear him.` },
        image: IMG, imageAlt: 'An elk bugling on a green mountainside.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon lifts his head and bugles on a green mountainside.', composition: 'Elk mid-call, head raised.', light: 'Bright mountain morning.' }) },
      { id: 2, text: { en: `Eldon loved his voice so much that he was always the one talking. At meetings he spoke first and longest. When a friend began a story, Eldon would call over the top of them. "Listen to ME," was his favourite thing to say — and the others slowly stopped trying to speak at all.` },
        image: IMG, imageAlt: 'An elk talking loudly while smaller animals look unheard.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon talks loudly while a rabbit and a bird wait, unable to get a word in.', composition: 'Big elk centre, small animals waiting.', light: 'Clear daylight.' }) },
      { id: 3, text: { en: `One frosty morning Eldon climbed to his favourite ridge and called out, "I am the GRANDEST voice on the mountain!" And back across the valley came an answer: "...grandest voice on the mountain!" Eldon blinked. "Who said that?" he cried. "...who said that?" replied the voice.` },
        image: IMG, imageAlt: 'An elk surprised to hear his own call answered from across a valley.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon looks startled as his own call rings back from the far side of the valley.', composition: 'Elk on ridge, sound returning across mist.', light: 'Crisp frosty light.' }) },
      { id: 4, text: { en: `It was the Echo, of course, though Eldon did not know it. "Show yourself!" he demanded. "...show yourself!" it answered. He grew cross. "You are COPYING me!" "...copying me!" Whatever Eldon shouted, the voice shouted the very same thing straight back, and would not be out-done.` },
        image: IMG, imageAlt: 'An elk shouting crossly across a mountain valley.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon shouts crossly across the valley, frustrated by the answering voice.', composition: 'Elk leaning out, mist-filled gorge.', light: 'Pale cold sun.' }) },
      { id: 5, text: { en: `Eldon bellowed louder and louder, trying to win, until his throat was sore and his legs were tired. But the Echo never grew tired and never gave in. At last he flopped down on the cold grass, worn out and grumpy, with no idea what to do.` },
        image: IMG, imageAlt: 'A tired elk flopping down on a mountainside.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'A worn-out Eldon flops onto the cold grass, voice hoarse.', composition: 'Elk lying tired on the ridge.', light: 'Overcast mountain light.' }) },
      { id: 6, text: { en: `Just then a wise old goat picked her way up the rocks. "Ah," she said, "I see you have met the Echo. You cannot shout it down, you know. The Echo only ever gives back what you give it. If you want it to be gentle, you must be gentle first."` },
        image: IMG, imageAlt: 'A wise old goat speaking to a tired elk on the rocks.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'A wise old goat speaks kindly to the tired elk among the rocks.', composition: 'Goat and elk on a stony ridge.', light: 'Soft grey daylight.' }) },
      { id: 7, text: { en: `Eldon thought about this. Slowly, softly, he called across the valley: "Hello, friend." And back, soft and kind, came the answer: "Hello, friend." He tried again. "I am sorry I shouted." "...I am sorry I shouted," sighed the valley, gently as a lullaby.` },
        image: IMG, imageAlt: 'An elk calling softly and kindly across a calm valley.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon calls softly and kindly; the valley answers gently back.', composition: 'Calm elk, peaceful misty valley.', light: 'Light breaking warm through cloud.' }) },
      { id: 8, text: { en: `And Eldon understood. The whole world had been like the Echo all along: when he only shouted, he only ever heard himself. But when he spoke softly — and waited, and truly listened — there were a hundred gentle voices that had been there the whole time.` },
        image: IMG, imageAlt: 'An elk sitting quietly, listening to the mountain around him.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon sits quietly with ears turned, truly listening to the living mountain.', composition: 'Elk still and attentive, birds nearby.', light: 'Warm clearing light.' }) },
      { id: 9, text: { en: `So Eldon went home and did a brand new thing: he let his friends speak first. He listened to the rabbit's small story and the bird's quiet song, and found them every bit as fine as his own grand voice. And the mountain had never been such a happy place to talk.` },
        image: IMG, imageAlt: 'An elk listening happily as small animals tell their stories.',
        imagePrompt: P({ cast: [CAST.elk], scene: 'Eldon listens happily as a rabbit and a bird share their stories with him.', composition: 'Elk leaning in to listen, friends around.', light: 'Golden afternoon.' }) }
    ],
    closing: {
      text: { en: `For Eldon learned what the Echo knew all along — that a voice is a fine thing, but a listening ear is finer still.` },
      image: IMG, imageAlt: 'Quiet misty mountain peaks at evening.',
      imagePrompt: P({ scene: 'End vignette: quiet layered mountain peaks fading into evening mist.', composition: 'Simple peaceful ridgelines.', light: 'Soft dusk haze.' })
    }
  }));
})(window.APP);

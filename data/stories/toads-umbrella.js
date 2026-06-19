// ─── Toad's Big Umbrella ──────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: there is always room to share.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/toad.svg';
  var CAST = {
    toad: `Tilly the toad: a plump friendly green toad with big golden eyes and a wide cheerful smile, carrying a great round leaf she uses as an umbrella.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'toads-umbrella',
    title:    { en: "Toad's Big Umbrella" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'leaf', board: null, color: '#4f7a3a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['toad'], coverAnimal: 'toad',
    requirements: [{ animalId: 'toad', minCount: 1, label: 'Find the Toad' }],
    cover: {
      image: IMG, imageAlt: 'A cheerful toad sheltering under a big leaf in the rain.',
      imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly the toad shelters happily under a great round leaf as rain falls.', composition: 'Toad centred under leaf-umbrella, rain around.', light: 'Soft rainy-day grey-green.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Down by the reedy pond lived a kind toad named Tilly, who owned the very finest umbrella in all the marsh. It was a great round leaf, broad and green, and whenever the rain came pattering down, Tilly held it high over her head and stayed snug and dry.` },
        image: IMG, imageAlt: 'A toad holding a large round leaf as an umbrella by a pond.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly holds her great leaf-umbrella high beside the reedy pond.', composition: 'Toad and leaf by the water, reeds around.', light: 'Soft overcast.' }) },
      { id: 2, text: { en: `One afternoon the clouds rolled in dark and heavy, and down came the rain — splish, splash, sploosh! Tilly raised her leaf and set off happily along the muddy path, humming a little tune, as comfortable as could be beneath her green roof.` },
        image: IMG, imageAlt: 'A toad walking along a muddy path in heavy rain under a leaf.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly walks the muddy path under her leaf as heavy rain falls all around.', composition: 'Toad mid-step, rain streaking down.', light: 'Dim rainy light.' }) },
      { id: 3, text: { en: `Before long she came upon a small brown beetle, shivering on a stone, his wings too wet to fly. "Oh dear, you're soaked through!" said Tilly. "Quick, come under here with me." And she tilted her leaf so the beetle could scuttle into the dry.` },
        image: IMG, imageAlt: 'A toad sheltering a small beetle under her leaf umbrella.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly tilts her leaf to shelter a shivering beetle from the rain.', composition: 'Toad and tiny beetle sharing the umbrella.', light: 'Wet grey daylight.' }) },
      { id: 4, text: { en: `On they went together, until they found a little mouse with her fur all in dripping points, hiding under a leaf far too small. "There's room for you too," called Tilly. The mouse squeaked thank-you and squeezed in close, and now there were three under the leaf.` },
        image: IMG, imageAlt: 'A toad, beetle and mouse sharing one leaf umbrella in the rain.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'A wet little mouse joins the toad and beetle under the leaf-umbrella.', composition: 'Three friends huddled under one leaf.', light: 'Soft rainy gloom.' }) },
      { id: 5, text: { en: `The beetle began to fret. "But Tilly," he whispered, "if you keep letting everyone in, there won't be enough dry left for YOU." Tilly only smiled. "A little rain on my back won't hurt me," she said, "but a friend left out in the cold would hurt my heart far more."` },
        image: IMG, imageAlt: 'A toad smiling kindly while sharing her umbrella, her back getting wet.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly smiles warmly, her own back catching raindrops as she shelters the others.', composition: 'Toad selfless under tilted leaf.', light: 'Gentle wet light.' }) },
      { id: 6, text: { en: `Just then the rain came harder than ever, and a soggy little sparrow tumbled down with a bedraggled cheep. The leaf was already full — but Tilly thought quickly. "Everyone, lean in close!" she said, and she lifted the leaf as high as her arms could stretch.` },
        image: IMG, imageAlt: 'A toad lifting her leaf high so a wet sparrow can join the group.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Tilly stretches her leaf as high as she can to make room for a soggy sparrow.', composition: 'Toad reaching up, friends gathered beneath.', light: 'Heavy rain, dim light.' }) },
      { id: 7, text: { en: `And what do you know — held up high, the big round leaf was wide enough for everybody after all. Beetle, mouse, sparrow and toad all stood together underneath, warm and dry, while the storm drummed and splashed itself out around them.` },
        image: IMG, imageAlt: 'Four animals sheltering happily together under one big leaf.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'Beetle, mouse, sparrow and toad shelter happily together under the wide leaf.', composition: 'Cosy group beneath the raised leaf.', light: 'Cocoon of warm shelter in the rain.' }) },
      { id: 8, text: { en: `At last the rain grew tired and the clouds slid apart, and out came the sun, bright and golden and warm. One by one the little friends crept out, shook themselves dry, and thanked Tilly with all their hearts before scampering and fluttering home.` },
        image: IMG, imageAlt: 'Animals leaving a leaf umbrella as the sun comes out after rain.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'The friends shake dry and thank Tilly as the sun breaks through after the storm.', composition: 'Animals emerging into sunshine.', light: 'Fresh golden after-rain light.' }) },
      { id: 9, text: { en: `Tilly waved them off, a little damp about the back but warm right through to her toes. For she had learned the loveliest thing about a big umbrella: it is never quite so big as when you are sharing it, and never half so much fun when you are dry all alone.` },
        image: IMG, imageAlt: 'A happy toad waving goodbye under a sunny sky.',
        imagePrompt: P({ cast: [CAST.toad], scene: 'A content, slightly damp Tilly waves her friends off under a clearing sky.', composition: 'Toad with leaf, rainbow forming.', light: 'Warm sunshine and a faint rainbow.' }) }
    ],
    closing: {
      text: { en: `And ever after, whenever the rain came down on the marsh, the little creatures knew exactly where to run — to Tilly, and her big, kind, sharing umbrella.` },
      image: IMG, imageAlt: 'A round green leaf resting beside a puddle in the sun.',
      imagePrompt: P({ scene: 'End vignette: a round green leaf resting beside a sparkling puddle in sunshine.', composition: 'Simple still life, leaf and puddle.', light: 'Bright after-rain glow.' })
    }
  }));
})(window.APP);

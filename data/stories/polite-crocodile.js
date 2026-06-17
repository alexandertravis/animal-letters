// ─── The Polite Crocodile ─────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a gentle heart can change how the world sees you.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    crocodile: `Cyril the crocodile: a long green crocodile with a wide toothy grin that frightens everyone, though he is in truth the gentlest, most polite creature on the river, wearing a small bow tie.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'polite-crocodile',
    title:    { en: "The Polite Crocodile" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'forest', board: null, color: '#2f5e3a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['crocodile'], coverAnimal: 'crocodile',
    requirements: [{ animalId: 'crocodile', minCount: 1, label: 'Find the Crocodile' }],
    cover: {
      image: 'assets/images/cartoon/crocodile.svg',
      imageAlt: 'A smiling crocodile in a bow tie offering a flower with a toothy grin.',
      imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril the crocodile, in a small bow tie, offers a flower with a wide friendly grin.', composition: 'Crocodile front-on, gentle gesture.', light: 'Warm riverbank light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Cyril the crocodile had the widest, toothiest grin on the whole river. The trouble was, every time he smiled to say hello, the other animals took one look at all those teeth and fled in every direction.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile smiling while animals flee from his teeth.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril smiles warmly, but small animals scatter in alarm at his many teeth.', composition: 'Smiling croc centre, animals fleeing.', light: 'Bright riverbank light.' }) },
      { id: 2, text: { en: `"But I only wanted to say good morning," Cyril would sigh, alone again on his log. He was the most polite creature on the river. He said please and thank you. He never pushed in. Yet no one ever stayed to find out.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A lonely crocodile sighing alone on a log.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril sits alone and downcast on his river log.', composition: 'Lonely croc on a log, empty river.', light: 'Soft melancholy light.' }) },
      { id: 3, text: { en: `One day the river ran low, and a little duckling got stuck fast in the drying mud, far from her family. She quacked and struggled but could not pull free, and the hot sun beat down upon her.` },
        image: 'assets/images/cartoon/duck.svg', imageAlt: 'A duckling stuck in drying river mud, distressed.',
        imagePrompt: P({ scene: 'A small duckling is stuck fast in cracked drying mud, quacking for help under a hot sun.', composition: 'Tiny duckling trapped in wide mudflat.', light: 'Harsh bright sun.' }) },
      { id: 4, text: { en: `Cyril heard her cries. He could reach her easily with his long strong jaws — but he knew how frightening his teeth looked. "If I rush in grinning," he thought, "I shall scare her half to death." So he went slowly, and softly, and he did not smile.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile approaching slowly and gently, mouth closed.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril approaches the stuck duckling slowly, mouth gently closed, eyes kind.', composition: 'Careful approach across the mud.', light: 'Bright midday.' }) },
      { id: 5, text: { en: `"Good afternoon," he said gently, very gently. "I should very much like to help you, if you will let me. I promise to be careful." The duckling was frightened, but his voice was so kind that she gave a small, brave nod.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile speaking gently to a frightened duckling.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril speaks softly to the frightened duckling, who gives a tiny nod.', composition: 'Close gentle exchange in the mud.', light: 'Warm soft light.' }) },
      { id: 6, text: { en: `So Cyril, ever so carefully, took the very edge of her tangled reeds — not the duckling herself — between two teeth, and pulled, slow and steady, until she came free of the mud with a soft little pop.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile gently freeing a duckling from the mud.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril gently tugs the reeds to ease the duckling free of the mud.', composition: 'Careful rescue, duckling popping loose.', light: 'Bright relieved light.' }) },
      { id: 7, text: { en: `He carried her on the flat of his snout, like a little raft, back to the deep cool water where her family was frantically searching. "My baby!" cried Mother Duck. "And carried so gently! By a crocodile!"` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile carrying a duckling on his snout to her family.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril carries the duckling safely on his snout toward her overjoyed family.', composition: 'Croc as gentle ferry, ducks ahead.', light: 'Warm reunion light.' }) },
      { id: 8, text: { en: `Word spread up and down the river: the crocodile with all the teeth had the kindest heart of all. And slowly the animals began to stay when he said good morning, and to see, behind the grin, the gentle friend who had always been there.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile happily greeting animals who now stay to talk.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril chats happily on his log as river animals now gather around without fear.', composition: 'Croc surrounded by friendly animals.', light: 'Bright welcoming light.' }) },
      { id: 9, text: { en: `"It turns out," said Cyril, beaming his widest grin while no one ran away at all, "that a smile is only frightening until people know the heart behind it." And on the river, from that day, his grin was the most welcome sight of all.` },
        image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A crocodile grinning happily among friends who are not afraid.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Cyril beams his widest grin among friends who smile warmly back.', composition: 'Joyful croc, accepting friends around.', light: 'Golden afternoon light.' }) }
    ],
    closing: {
      text: { en: `And the politest crocodile on the river was never lonely again — for everyone had learned to look past his teeth and straight into his gentle heart.` },
      image: 'assets/images/cartoon/crocodile.svg', imageAlt: 'A small bow tie resting on a sunny river log.',
      imagePrompt: P({ scene: 'End vignette: a small bow tie resting on a sunlit river log beside a single flower.', composition: 'Simple still life on the log.', light: 'Warm low evening light.' })
    }
  }));
})(window.APP);

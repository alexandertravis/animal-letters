// ─── The Koala's Sleepy Tree ──────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: rest is not laziness; quiet and stillness
// are their own kind of happiness.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/koala.svg';
  var CAST = {
    koala: `Kobi the koala: a round grey koala with a big soft nose, fluffy ears and sleepy, contented eyes, hugging a gum tree.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'koala-sleepy-tree',
    title:    { en: "The Koala's Sleepy Tree" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'sage', board: null, color: '#7a8a5a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['koala'], coverAnimal: 'koala',
    requirements: [{ animalId: 'koala', minCount: 1, label: 'Find the Koala' }],
    cover: {
      image: IMG, imageAlt: 'A sleepy koala hugging a gum tree branch.',
      imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi the koala dozes contentedly, hugging the fork of a leafy gum tree.', composition: 'Koala snug in a gum tree.', light: 'Warm dappled afternoon light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `High in a leafy gum tree lived a koala named Kobi, who knew the great secret of being happy: how to rest. He spent his days dozing snugly in the fork of his favourite branch, nibbling gum leaves, and watching the world drift gently by. Kobi was, quite simply, the most peaceful creature in the bush.` },
        image: IMG, imageAlt: 'A peaceful koala resting in a gum tree.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi rests peacefully in his gum tree, content and unhurried.', composition: 'Restful koala among gum leaves.', light: 'Soft warm dappled light.' }) },
      { id: 2, text: { en: `Down below lived a young possum named Pippa, who never, ever stopped. She dashed and darted from dawn to dark, always busy, always rushing, always sure there was something more to be done. "How can you just SIT there, Kobi?" she would chatter, zipping past. "There's no time to rest! Do, do, DO!"` },
        image: IMG, imageAlt: 'A busy possum rushing past a calm koala.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'A busy young possum dashes past, puzzled by the calm, resting koala.', composition: 'Blur of busy possum, still koala above.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `But all her rushing was wearing poor Pippa quite to pieces. She forgot things, she tripped over things, she snapped crossly at her friends. She was so very tired — and yet she could not seem to stop, because she had quite forgotten how. "Resting is lazy," she insisted. "Only do-nothings rest."` },
        image: IMG, imageAlt: 'An exhausted, frazzled possum running herself ragged.',
        imagePrompt: P({ scene: 'A frazzled, exhausted possum runs herself ragged, too tired to think straight.', composition: 'Worn-out possum mid-dash.', light: 'Harsh tiring light.' }) },
      { id: 4, text: { en: `One evening Pippa was rushing so fast that she tripped right over a root and tumbled down in a dizzy, dishevelled heap. "Oh, I can't go on," she puffed, too tired even to get up. Kobi peered down from his branch. "Come up here and rest a while," he called softly. "Just for a moment. The bush will keep without you."` },
        image: IMG, imageAlt: 'A tumbled, tired possum as a koala invites her to rest.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'A tumbled, exhausted Pippa is gently invited up to rest by Kobi the koala.', composition: 'Fallen possum, kindly koala above.', light: 'Soft evening light.' }) },
      { id: 5, text: { en: `Too weary to argue, Pippa climbed up and settled into the soft fork of the branch beside Kobi. "Now," he murmured, "just be still. You don't have to do anything at all. Breathe slow. Feel the branch hold you. Listen to the leaves." Pippa fidgeted... then, little by little, she grew still.` },
        image: IMG, imageAlt: 'A possum settling to rest beside a calm koala in a tree.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Pippa settles into the branch beside Kobi, slowly growing calm and still.', composition: 'Possum and koala resting together.', light: 'Gentle dusk light.' }) },
      { id: 6, text: { en: `As Pippa rested, a wonderful thing happened. The tired fog in her head began to clear. The achy heaviness in her legs began to ease. She watched the sky turn pink and gold, and felt the warm breeze, and heard the evening birds — small lovely things she had been far too busy to notice for ever so long.` },
        image: IMG, imageAlt: 'A calm possum watching a beautiful sunset from a tree.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Pippa rests calmly beside Kobi, watching a beautiful pink-gold sunset.', composition: 'Possum and koala against a glowing sky.', light: 'Warm sunset glow.' }) },
      { id: 7, text: { en: `"Oh," sighed Pippa happily. "I had forgotten how GOOD it feels to rest." Kobi nodded slowly. "Resting isn't being lazy," he said. "It's how you fill yourself back up. A possum who never rests soon has nothing left to give. But a possum who rests... why, she can do anything, and enjoy it too."` },
        image: IMG, imageAlt: 'A koala sharing wisdom with a now-restful possum.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Kobi shares his gentle wisdom about rest with the now-calm Pippa.', composition: 'Koala and possum in quiet conversation.', light: 'Soft golden light.' }) },
      { id: 8, text: { en: `Pippa stayed and rested the whole evening through, and slept the soundest sleep she'd had in weeks. When morning came, she woke feeling brand new — bright and bouncy and clear-headed, ready for the day. And she found she could do her busy possum-things far better than before, because now she was truly rested.` },
        image: IMG, imageAlt: 'A refreshed possum waking up bright and happy in the morning.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Pippa wakes refreshed and bright in the morning after a good rest.', composition: 'Energised possum greeting the morning.', light: 'Fresh sunrise light.' }) },
      { id: 9, text: { en: `From then on, busy little Pippa always remembered to stop and rest each day, up in Kobi's sleepy gum tree. She was just as lively as ever — but never frazzled, never worn to pieces, ever again. For she had learned the koala's great secret: that knowing how to rest is part of knowing how to live.` },
        image: IMG, imageAlt: 'A possum and koala resting contentedly together in a tree.',
        imagePrompt: P({ cast: [CAST.koala], scene: 'Pippa and Kobi rest contentedly together in the gum tree, firm friends.', composition: 'Possum and koala at peace in the tree.', light: 'Warm tranquil light.' }) }
    ],
    closing: {
      text: { en: `For rest is not the same as laziness — it is how we fill ourselves up again, so that knowing how to be still is part of knowing how to live.` },
      image: IMG, imageAlt: 'A quiet gum tree branch against a soft evening sky.',
      imagePrompt: P({ scene: 'End vignette: a quiet gum tree branch with a few leaves against a soft evening sky.', composition: 'Simple still branch and sky.', light: 'Peaceful dusk glow.' })
    }
  }));
})(window.APP);

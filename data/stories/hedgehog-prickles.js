// ─── Hedgehog's Prickles ──────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: you are loved as you are, and there are
// many ways to show you care.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/hedgehog.svg';
  var CAST = {
    hedgehog: `Holly the hedgehog: a small round hedgehog with a coat of soft brown prickles, a little pointed nose and shy, gentle eyes.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'hedgehog-prickles',
    title:    { en: "Hedgehog's Prickles" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'chestnut', board: null, color: '#6a4a32',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['hedgehog'], coverAnimal: 'hedgehog',
    requirements: [{ animalId: 'hedgehog', minCount: 1, label: 'Find the Hedgehog' }],
    cover: {
      image: IMG, imageAlt: 'A small prickly hedgehog in an autumn wood.',
      imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly the hedgehog stands among autumn leaves in a cosy wood.', composition: 'Little hedgehog among fallen leaves.', light: 'Warm autumn light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a cosy wood, among the fallen leaves, lived a little hedgehog named Holly, who had one small sorrow. She loved her friends dearly — the rabbits, the mice, the moles — but Holly was covered all over in prickles, and so she could never, ever give anyone a hug.` },
        image: IMG, imageAlt: 'A prickly hedgehog watching other animals hug.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly watches wistfully as her soft-furred friends hug one another.', composition: 'Hedgehog apart, friends hugging beyond.', light: 'Soft warm light.' }) },
      { id: 2, text: { en: `When the rabbits hugged each other goodnight, Holly longed to join in. But whenever she came close, "Ouch!" — her prickles poked, and everyone gently backed away. "Sorry, Holly," they would say kindly. "You're just a bit too prickly." And Holly would curl up small, feeling that her prickles made her unlovable.` },
        image: IMG, imageAlt: 'A sad hedgehog curling up, feeling left out.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly curls up sadly, feeling her prickles keep her from being loved.', composition: 'Curled lonely hedgehog.', light: 'Soft melancholy light.' }) },
      { id: 3, text: { en: `"I wish I had soft fur like everyone else," Holly sighed to the wise old owl one evening. "Then my friends could hug me, and I could show them how much I love them." The owl looked at her kindly. "There are a great many ways to show love, little one," she said, "and a hug is only one of them."` },
        image: IMG, imageAlt: 'A wise owl comforting a sad hedgehog.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'The wise old owl gently comforts Holly about her prickles.', composition: 'Owl and hedgehog in quiet talk.', light: 'Soft evening light.' }) },
      { id: 4, text: { en: `"A hug is only one of them?" said Holly, puzzled. "Just so," said the owl. "You have a warm and loving heart, Holly. The trick is to find the ways YOU can show it — ways that suit a hedgehog. I think, if you look, you will find you have gifts that no soft, huggable creature has at all."` },
        image: IMG, imageAlt: 'A hedgehog thinking about the owl\'s wise words.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly sits thoughtfully, considering the owl\'s gentle wisdom.', composition: 'Pensive hedgehog in the moonlight.', light: 'Soft moonlit glow.' }) },
      { id: 5, text: { en: `Holly thought hard. And she began to find her own special ways to show she cared. When the leaves fell, she rolled among them and carried great loads of cosy bedding to her friends on her prickly back — for prickles, it turned out, were perfect for gathering soft leaves to keep everyone warm.` },
        image: IMG, imageAlt: 'A hedgehog carrying leaves on her prickles to friends.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly carries a great load of cosy leaves on her prickly back to her friends.', composition: 'Hedgehog gathering leaves on her spines.', light: 'Warm autumn light.' }) },
      { id: 6, text: { en: `She found more ways, too. She listened, ever so well, whenever a friend was sad. She shared the juiciest berries. She kept watch at night while the others slept, for a hedgehog can curl into a safe little ball that nothing can trouble. Each was its own way of saying, "I love you."` },
        image: IMG, imageAlt: 'A hedgehog kindly helping and listening to her friends.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly listens kindly to a sad friend and shares berries with others.', composition: 'Caring hedgehog among grateful friends.', light: 'Warm friendly light.' }) },
      { id: 7, text: { en: `Her friends noticed, and their hearts filled with warmth. "Holly," said the littlest rabbit one day, "you can't give hugs, it's true. But you take such good care of us, in your own hedgehog way, that we feel your love all the time. We wouldn't change a single prickle of you."` },
        image: IMG, imageAlt: 'Friends warmly telling a hedgehog how much she is loved.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'Holly\'s friends warmly tell her how loved she is, just as she is.', composition: 'Hedgehog surrounded by loving friends.', light: 'Tender warm light.' }) },
      { id: 8, text: { en: `Then the clever little rabbit had an idea. "We can still be close, you know — we just have to be gentle." And he showed Holly how, very softly, a friend could rest a paw on her one smooth little nose, or curl up snug beside her against the leaves. It was not quite a hug — it was a hedgehog-hug, and it was just as warm.` },
        image: IMG, imageAlt: 'A rabbit gently nuzzling a hedgehog\'s soft nose.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'A rabbit gently touches Holly\'s soft nose; friends curl up cosy beside her.', composition: 'Hedgehog and friends sharing a gentle "hedgehog-hug".', light: 'Cosy warm glow.' }) },
      { id: 9, text: { en: `And so Holly learned that her prickles had never made her unlovable at all. She was loved exactly as she was — prickles and all — and she had found a hundred warm and wonderful ways to love her friends right back. And that, she knew at last, was worth far more than the softest fur in the world.` },
        image: IMG, imageAlt: 'A happy hedgehog snuggled cosily among her loving friends.',
        imagePrompt: P({ cast: [CAST.hedgehog], scene: 'A happy Holly nestles cosily among her loving friends in the leaves.', composition: 'Content hedgehog surrounded by friends.', light: 'Warm golden glow.' }) }
    ],
    closing: {
      text: { en: `For you are loved exactly as you are — prickles and all — and there are a hundred warm ways to show you care, if only you look for your own.` },
      image: IMG, imageAlt: 'A cosy pile of autumn leaves in the soft evening light.',
      imagePrompt: P({ scene: 'End vignette: a cosy pile of golden autumn leaves in soft evening light.', composition: 'Simple still life, leaves in a heap.', light: 'Warm gentle glow.' })
    }
  }));
})(window.APP);

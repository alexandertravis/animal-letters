// ─── The Crocodile's Tears ────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: trickery wins nothing lasting; honesty
// and true kindness win real friends.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/crocodile.svg';
  var CAST = {
    crocodile: `Snap the crocodile: a long green crocodile with a toothy grin and clever eyes; a trickster at first, then honest and warm-hearted. Drawn friendly, never frightening.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'crocodile-tears',
    title:    { en: "The Crocodile's Tears" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'leaf', board: null, color: '#4f7a3a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['crocodile'], coverAnimal: 'crocodile',
    requirements: [{ animalId: 'crocodile', minCount: 1, label: 'Find the Crocodile' }],
    cover: {
      image: IMG, imageAlt: 'A green crocodile resting by a muddy riverbank.',
      imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap the crocodile rests by a muddy, sunlit riverbank with a sly grin.', composition: 'Crocodile lounging at the river\'s edge.', light: 'Warm hazy river light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `By the muddy bend of a slow green river lived a crocodile named Snap, who was rather lonely — though it was mostly his own fault. Snap had a clever, sneaky trick that he was much too proud of: he could cry great big crocodile tears whenever he liked, even when he wasn't sad at all.` },
        image: IMG, imageAlt: 'A crocodile pretending to cry by the river.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap the crocodile squeezes out big false tears, looking sly.', composition: 'Crocodile with crocodile tears.', light: 'Bright river light.' }) },
      { id: 2, text: { en: `Snap used his fake tears to trick the other animals. "Boo-hoo," he would sob, "I'm so sad and lonely — won't you come closer and keep me company?" And when a kind creature came near to comfort him, Snap would give a great toothy grin and frighten them, then laugh and laugh at his own clever trick.` },
        image: IMG, imageAlt: 'A crocodile grinning slyly after tricking an animal with false tears.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap grins slyly, having tricked a kind animal with his false tears.', composition: 'Smirking crocodile, startled animal fleeing.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `It seemed like good fun to Snap — but it had a sad result. Soon every animal at the river knew his trick, and no one would come near him at all. "Beware the crocodile's tears," they warned each other. "They're never real." And so, day after day, Snap sat all alone on his muddy bank.` },
        image: IMG, imageAlt: 'A lonely crocodile sitting by himself as animals keep away.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap sits all alone on his bank as the other animals keep their distance.', composition: 'Lonely crocodile, animals far off.', light: 'Soft lonely light.' }) },
      { id: 4, text: { en: `One afternoon, Snap watched a mother duck and her ducklings playing happily together, and a real ache opened up in his heart. He was truly, deeply lonely — and this time, the tears that welled up in his eyes were not pretend at all. They were real, warm, sad tears, and they took him quite by surprise.` },
        image: IMG, imageAlt: 'A crocodile crying real tears as he watches others play.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap watches the happy ducks and feels real, sad tears well up.', composition: 'Wistful crocodile, joyful ducks beyond.', light: 'Tender melancholy light.' }) },
      { id: 5, text: { en: `"Help," he called shakily. "I'm lonely — really, truly lonely this time." But the animals only rolled their eyes. "Ha! Crocodile tears again," they scoffed, and swam on by. And now Snap learned the hard, sad truth: when you have lied so many times, no one believes you even when you finally tell the truth.` },
        image: IMG, imageAlt: 'Animals ignoring a genuinely sad crocodile.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'The animals ignore Snap\'s genuine tears, certain it is another trick.', composition: 'Sad crocodile, animals turning away.', light: 'Cool dejected light.' }) },
      { id: 6, text: { en: `All except one. A small, gentle turtle paddled slowly over. "I have heard about your tricks," she said. "But everyone deserves one true chance. Are these real tears, Snap?" Snap nodded, ashamed. "They are," he whispered. "And I'm so sorry for all my fibbing. I've been lonely a long, long time."` },
        image: IMG, imageAlt: 'A gentle turtle approaching the crying crocodile.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'A gentle turtle paddles over to give the genuinely crying Snap a chance.', composition: 'Turtle and tearful crocodile, tender moment.', light: 'Soft warm light.' }) },
      { id: 7, text: { en: `The kind turtle stayed and talked with Snap all afternoon, and he found that real company was a thousand times nicer than any trick. "I'm done with fibbing," Snap promised. "From now on, my tears will only ever be real, and my smile will only ever be friendly." And he meant it, with all his heart.` },
        image: IMG, imageAlt: 'A crocodile and turtle becoming friends by the river.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap and the turtle talk happily together, becoming true friends.', composition: 'Crocodile and turtle side by side.', light: 'Warm friendly light.' }) },
      { id: 8, text: { en: `Winning back the others' trust was not quick or easy — Snap had a lot of fibs to make up for. But day by day he was honest and kind and gentle, helping where he could and never tricking anyone again. And slowly, one by one, the animals began to believe in him, and to come near once more.` },
        image: IMG, imageAlt: 'A crocodile kindly helping other animals at the river.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap honestly and kindly helps the river animals, slowly earning their trust.', composition: 'Helpful crocodile among warming animals.', light: 'Gentle hopeful light.' }) },
      { id: 9, text: { en: `In time, Snap was lonely no longer. He had real friends — the turtle, the ducks, all of them — won not by clever tricks, but by honesty and kindness. And whenever his eyes filled with tears now, everyone knew at once that they were real. For an honest heart, Snap had learned, is worth more than the cleverest trick.` },
        image: IMG, imageAlt: 'A happy crocodile surrounded by his new friends at the river.',
        imagePrompt: P({ cast: [CAST.crocodile], scene: 'Snap rests happily among his new, true friends at the river.', composition: 'Content crocodile surrounded by friends.', light: 'Warm golden light.' }) }
    ],
    closing: {
      text: { en: `For a clever trick may fool a friend once, but it wins nothing that lasts — only honesty and true kindness can earn a friend for keeps.` },
      image: IMG, imageAlt: 'A calm green river winding past reeds in the evening.',
      imagePrompt: P({ scene: 'End vignette: a calm green river winding gently past tall reeds in the evening.', composition: 'Simple peaceful river scene.', light: 'Soft golden dusk.' })
    }
  }));
})(window.APP);

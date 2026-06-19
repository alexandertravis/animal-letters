// ─── The Snail Who Carried His Home ───────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: home is something you carry inside you.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/snail.svg';
  var CAST = {
    snail: `Sammy the snail: a small cheerful snail with a beautiful spiral shell of honey and amber, two curious eye-stalks and a slow, happy smile.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'snail-carries-home',
    title:    { en: "The Snail Who Carried His Home" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'sienna', board: null, color: '#a9682a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['snail'], coverAnimal: 'snail',
    requirements: [{ animalId: 'snail', minCount: 1, label: 'Find the Snail' }],
    cover: {
      image: IMG, imageAlt: 'A cheerful snail with a spiral shell setting off down a garden path.',
      imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy the snail sets off down a dewy garden path, his spiral shell on his back.', composition: 'Snail beginning a journey, path winding ahead.', light: 'Fresh dewy morning light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `At the bottom of a green garden lived a small snail named Sammy, who carried his house wherever he went — a beautiful spiral shell of honey and amber, curled up snug upon his back. It went everywhere he did, and Sammy thought nothing much of it at all.` },
        image: IMG, imageAlt: 'A snail resting among flowers with his spiral shell.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy rests among low flowers, his spiral shell gleaming on his back.', composition: 'Snail close among garden blooms.', light: 'Soft morning glow.' }) },
      { id: 2, text: { en: `One day a swift on the wind called down to him, "Sammy! Beyond the garden wall there are meadows and streams and wonders you've never dreamed of! Why do you stay in this one small patch?" Sammy's eye-stalks tingled with curiosity. "Beyond the wall...?" he breathed. He decided to go and see.` },
        image: IMG, imageAlt: 'A snail looking up as a bird calls from above the garden wall.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'A swift calls down to Sammy, who gazes up toward the high garden wall.', composition: 'Snail looking up, wall and bird above.', light: 'Bright daytime.' }) },
      { id: 3, text: { en: `So Sammy set off on the greatest journey of his life. He was slow, of course — ever so slow — but he did not mind. Inch by inch he travelled, over pebbles and roots and the long cool blades of grass, with his little house riding safe and snug upon his back the whole way.` },
        image: IMG, imageAlt: 'A snail journeying slowly over pebbles and grass.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy journeys slowly and bravely over pebbles and tall grass.', composition: 'Tiny snail crossing a big green world.', light: 'Dappled travelling light.' }) },
      { id: 4, text: { en: `When darkness fell and the cold dew came, Sammy was not afraid. He simply tucked himself snugly into his shell, warm and dry, and slept soundly wherever he happened to be. "How handy," he thought sleepily, "to carry my own little bedroom about with me."` },
        image: IMG, imageAlt: 'A snail tucked safely inside his shell at night.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy tucks safely into his shell to sleep, snug against the cold dew.', composition: 'Curled snail-shell glowing softly at night.', light: 'Cool moonlight, warm shell.' }) },
      { id: 5, text: { en: `On he travelled, for many days, and oh, the wonders that he saw! A waterfall that roared like thunder. A field of poppies redder than sunset. A pond where the moon came down to swim. The world was every bit as marvellous as the swift had promised — and bigger, far bigger.` },
        image: IMG, imageAlt: 'A small snail gazing at a waterfall and a field of poppies.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy gazes in wonder at a thundering waterfall and a field of red poppies.', composition: 'Little snail before grand wonders.', light: 'Bright wondrous daylight.' }) },
      { id: 6, text: { en: `But after many days, a small new feeling crept into Sammy's heart. It was not unhappiness — he had loved every minute. It was something softer. He found himself thinking of his quiet green garden, and the friendly flowers, and the cosy corner where he had always belonged.` },
        image: IMG, imageAlt: 'A thoughtful snail pausing on his journey, thinking of home.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy pauses thoughtfully on his journey, a gentle longing for home in his eyes.', composition: 'Snail still, gazing back the way he came.', light: 'Soft wistful evening light.' }) },
      { id: 7, text: { en: `Then Sammy laughed his slow snail laugh, for he understood something wonderful. He need never feel truly far from home — because his home was right there on his back, where it had always been! He had carried it with him through every single mile of his great adventure.` },
        image: IMG, imageAlt: 'A snail smiling, realising his home is on his back.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy smiles, realising his cosy home has been with him all along.', composition: 'Happy snail nestled by his shell.', light: 'Warm understanding glow.' }) },
      { id: 8, text: { en: `So Sammy turned his little house about and began the slow, happy journey back, savouring every wonder all over again on the way. And whenever he missed his garden, he simply tucked into his shell, and there was home — cosy and close, just as it had been the whole time.` },
        image: IMG, imageAlt: 'A content snail journeying home through the meadows.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy makes the slow, content journey home through the meadows.', composition: 'Snail heading back, world golden around him.', light: 'Warm homeward light.' }) },
      { id: 9, text: { en: `At last he reached his own green garden again, and the flowers nodded a happy welcome. Sammy settled into his cosy corner, full to the brim with stories and wonders. He had seen the whole wide world — and never once, not for a single moment, had he been away from home.` },
        image: IMG, imageAlt: 'A happy snail home again among welcoming garden flowers.',
        imagePrompt: P({ cast: [CAST.snail], scene: 'Sammy settles happily back into his cosy garden corner, flowers nodding around him.', composition: 'Snail home at last among friendly blooms.', light: 'Golden welcoming light.' }) }
    ],
    closing: {
      text: { en: `For home is not only a place you go back to — it is something warm you carry inside you, wherever in the wide world you may roam.` },
      image: IMG, imageAlt: 'A spiral snail shell resting on a garden leaf at dusk.',
      imagePrompt: P({ scene: 'End vignette: a beautiful spiral snail shell resting on a broad garden leaf at dusk.', composition: 'Simple still life, shell on a leaf.', light: 'Gentle dusk glow.' })
    }
  }));
})(window.APP);

// ─── Kangaroo to the Rescue ───────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: a willing helper and a fast, kind heart
// can save the day.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/kangaroo.svg';
  var CAST = {
    kangaroo: `Kayla the kangaroo: a strong, kind kangaroo with powerful springy legs, a cosy pouch and a friendly, eager face.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'kangaroo-helps',
    title:    { en: "Kangaroo to the Rescue" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'tan', board: null, color: '#b58a4a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['kangaroo'], coverAnimal: 'kangaroo',
    requirements: [{ animalId: 'kangaroo', minCount: 1, label: 'Find the Kangaroo' }],
    cover: {
      image: IMG, imageAlt: 'A kangaroo bounding across the outback.',
      imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla the kangaroo bounds powerfully across the red-gold outback.', composition: 'Kangaroo mid-leap, wide outback behind.', light: 'Warm outback light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Out in the wide red outback lived a kangaroo named Kayla, who had the strongest, springiest legs of any creature around. She could bound across the plain faster than the wind, leaping great distances in a single hop. And more than anything, Kayla loved to use her speed to help.` },
        image: IMG, imageAlt: 'A strong kangaroo bounding fast across the plain.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla bounds swiftly and joyfully across the wide red plain.', composition: 'Kangaroo leaping across the outback.', light: 'Bright warm light.' }) },
      { id: 2, text: { en: `Whenever anyone needed something fetched in a hurry, they called for Kayla. "Kayla, could you carry this message?" "Kayla, could you fetch some water?" And off she would bound, quick as anything, glad to lend her speedy legs and cosy carrying-pouch to whoever needed them.` },
        image: IMG, imageAlt: 'A kangaroo cheerfully helping other animals.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla cheerfully bounds off to help, carrying things in her pouch.', composition: 'Helpful kangaroo on the move.', light: 'Sunny daylight.' }) },
      { id: 3, text: { en: `One scorching afternoon, dark smoke rose on the far horizon. A grass fire had sparked in the dry scrub, far across the plain, and the wind was driving it toward the billabong where the smallest animals lived — the bandicoots, the bilbies, and a nest of tiny baby birds, all of them too slow to escape in time.` },
        image: IMG, imageAlt: 'Smoke rising from a distant grass fire on the plain.',
        imagePrompt: P({ scene: 'Dark smoke rises from a distant grass fire creeping across the dry outback plain.', composition: 'Wide plain with smoke on the horizon.', light: 'Hazy orange-tinged light.' }) },
      { id: 4, text: { en: `"The little ones won't be able to run fast enough!" cried the animals in alarm. "Someone must warn them and carry them to safety — but who is fast enough to reach them in time?" Every eye turned to Kayla. She did not hesitate for a single moment. "I'll go," she said. "Right now."` },
        image: IMG, imageAlt: 'Animals turning to a kangaroo for help as fire approaches.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'The animals turn to Kayla for help; she stands ready and willing to go.', composition: 'Kangaroo stepping forward, worried animals around.', light: 'Tense hazy light.' }) },
      { id: 5, text: { en: `Kayla bounded off faster than she had ever gone — leap, leap, LEAP — her powerful legs eating up the distance, her heart pounding. The smoke grew thicker and the heat grew fiercer, but Kayla did not slow down. She raced straight toward the billabong, where the little animals huddled in fear.` },
        image: IMG, imageAlt: 'A kangaroo bounding at top speed toward danger.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla bounds at top speed toward the billabong, smoke thickening around her.', composition: 'Kangaroo racing through the haze.', light: 'Smoky orange light.' }) },
      { id: 6, text: { en: `"Quickly, everyone — into my pouch and onto my back!" Kayla called. The baby birds nestled into her warm pouch; the bandicoots and bilbies clung tight to her shoulders. When she was sure she had every last little one safely aboard, she turned and bounded away from the fire with all her might.` },
        image: IMG, imageAlt: 'A kangaroo carrying small animals to safety in her pouch.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla gathers the little animals into her pouch and onto her back, then bounds to safety.', composition: 'Kangaroo carrying many small creatures.', light: 'Urgent smoky light.' }) },
      { id: 7, text: { en: `Across the plain she flew, the precious little passengers held safe, the fire crackling behind. Leap after leap after leap, she carried them far away from the smoke and heat, all the way to the cool green safety of the river on the other side, where the fire could never reach.` },
        image: IMG, imageAlt: 'A kangaroo carrying animals to a safe green riverbank.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kayla bounds her little passengers all the way to the safe, cool green riverbank.', composition: 'Kangaroo arriving at the green river.', light: 'Cool relieved green light.' }) },
      { id: 8, text: { en: `She set them down gently on the soft grass — every single one safe and sound, not a feather singed. The little animals cheeped and squeaked with joy and relief, and their families wept happy tears. "Kayla, you saved them all!" they cried. "No one else could have reached them in time!"` },
        image: IMG, imageAlt: 'Grateful animals safe by the river thanking a kangaroo.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'The rescued little animals and their grateful families thank Kayla by the safe river.', composition: 'Joyful reunion on the riverbank.', light: 'Warm relieved light.' }) },
      { id: 9, text: { en: `Kayla caught her breath, tired but happier than she had ever been. Her fast, strong legs had always been good for races and fun — but today they had saved a whole little family. "This," she thought, with a glad and grateful heart, "is the very best thing my speed has ever done."` },
        image: IMG, imageAlt: 'A happy, tired kangaroo resting among the animals she saved.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'A tired, happy Kayla rests among the little animals she carried to safety.', composition: 'Content kangaroo with grateful friends.', light: 'Warm golden evening.' }) }
    ],
    closing: {
      text: { en: `For a willing helper with a kind and ready heart can be the most precious friend of all — especially in the moment of greatest need.` },
      image: IMG, imageAlt: 'A calm green river winding through the outback at dusk.',
      imagePrompt: P({ scene: 'End vignette: a calm green river winding peacefully through the outback at dusk.', composition: 'Simple peaceful river scene.', light: 'Soft golden dusk.' })
    }
  }));
})(window.APP);

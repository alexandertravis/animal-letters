// ─── Counting Down on Buttercup Farm ──────────────────────────────────────────
// Original gentle counting tale. ~9 pages. Soft 1-to-10 counting; moral: everyone
// counts, and everyone has a place.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/cow.svg';
  var CAST = {
    cow: `Clarabelle the cow: a gentle black-and-white cow with a soft face and a little bell, the calm heart of the farmyard.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'farm-friends-count',
    title:    { en: "Counting Down on Buttercup Farm" },
    subtitle: 'an original counting tale',
    skin: 'classic', leather: 'buff', board: null, color: '#c9a86a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['cow', 'hen', 'pig', 'duck'], coverAnimal: 'cow',
    requirements: [{ animalId: 'cow', minCount: 1, label: 'Find the Cow' }],
    cover: {
      image: IMG, imageAlt: 'A gentle cow leading the animals of a sunny farmyard.',
      imagePrompt: P({ cast: [CAST.cow], scene: 'Clarabelle the cow stands in a sunny farmyard with the other animals gathering for a hay-ride.', composition: 'Cow centred, farmyard friends around a hay cart.', light: 'Warm golden farmyard light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On Buttercup Farm, the most exciting day of the year had come: the great Harvest Hay-Ride! Old Clarabelle the cow was in charge, and she rang her little bell. "Everyone gather round," she mooed kindly. "We mustn't set off until every one of us is safely aboard the hay cart. Let us count!"` },
        image: IMG, imageAlt: 'A cow ringing a bell to gather the farm animals.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'Clarabelle rings her bell to gather the excited farm animals for the hay-ride.', composition: 'Cow with bell, animals approaching.', light: 'Bright cheerful morning.' }) },
      { id: 2, text: { en: `"ONE," said Clarabelle, climbing aboard first. "That's me." Up she stepped onto the soft golden hay. The cart wobbled and creaked beneath her, and she settled down with a contented sigh. "Now — who is number two?" she called, looking about the sunny yard.` },
        image: IMG, imageAlt: 'A cow climbing onto a hay cart, counting one.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'Clarabelle climbs aboard the hay cart first, counting "one".', composition: 'Cow stepping onto the cart.', light: 'Golden morning light.' }) },
      { id: 3, text: { en: `"TWO!" clucked the speckled hen, fluttering up in a flurry of feathers. "THREE!" oinked the round pink pig, scrambling up the ramp with a happy grunt. "FOUR!" quacked the duck, waddling aboard and shaking her tail. The hay cart was filling up nicely now.` },
        image: IMG, imageAlt: 'A hen, pig and duck climbing onto a hay cart.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'A hen, a pig and a duck clamber aboard the hay cart one after another.', composition: 'Animals boarding, counting up.', light: 'Sunny busy light.' }) },
      { id: 4, text: { en: `"FIVE and SIX!" baaed two woolly sheep, hopping up side by side. "SEVEN!" neighed the gentle pony. "EIGHT!" brayed the donkey, with a cheerful hee-haw. The cart was getting cosy and crowded, and everyone laughed and shuffled up to make room for the rest.` },
        image: IMG, imageAlt: 'More farm animals climbing onto a crowded hay cart.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'Sheep, a pony and a donkey climb aboard the filling hay cart.', composition: 'Crowded cheerful hay cart.', light: 'Warm sunny light.' }) },
      { id: 5, text: { en: `"NINE!" honked the goose, flapping up to perch on the rail. Clarabelle looked around the happy, hay-filled cart and counted everyone again. "That's nine of us," she said. "Are we all here? Are we ready to go?" "READY!" everyone cheered. And the farmer took up the reins.` },
        image: IMG, imageAlt: 'A goose joining the full hay cart of farm animals.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'A goose flaps up to join the full, happy hay cart as everyone cheers.', composition: 'Goose landing, joyful crowded cart.', light: 'Bright joyful light.' }) },
      { id: 6, text: { en: `But just then, Clarabelle heard the smallest, saddest little "peep." She looked down — and there in the dust below stood the tiniest yellow chick, far too small to climb the ramp, blinking up at the great big cart. "Oh!" cried Clarabelle. "We very nearly forgot someone."` },
        image: IMG, imageAlt: 'A tiny chick peeping up at the big hay cart.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'A tiny yellow chick peeps sadly up at the tall hay cart, too small to climb aboard.', composition: 'Little chick below, big cart above.', light: 'Soft tender light.' }) },
      { id: 7, text: { en: `"Everyone counts on Buttercup Farm," said Clarabelle firmly, "no matter how small." She reached down with her gentle nose and lifted the little chick up, up, up and onto the soft hay, right in the cosiest spot of all. "TEN!" peeped the chick joyfully. "Now we really are all here!"` },
        image: IMG, imageAlt: 'A cow gently lifting a tiny chick onto the hay cart.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'Clarabelle gently lifts the tiny chick up onto the soft hay with her nose.', composition: 'Cow lifting chick, animals welcoming.', light: 'Warm loving light.' }) },
      { id: 8, text: { en: `So off they rolled at last — all TEN of them — down the lane and through the golden fields, the hay cart creaking merrily and the little bell ringing. They sang and they laughed and they counted the haystacks as they passed: one, two, three, all the way to ten and beyond.` },
        image: IMG, imageAlt: 'A full hay cart of happy animals rolling through golden fields.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'The full hay cart of ten happy animals rolls merrily through golden harvest fields.', composition: 'Joyful cart rolling through the countryside.', light: 'Glowing harvest light.' }) },
      { id: 9, text: { en: `And when the lovely ride was done, Clarabelle counted them one last time as they hopped down — ten happy friends, every single one — to be quite sure that nobody, not even the very smallest, was ever left behind. For on Buttercup Farm, each and every friend counts.` },
        image: IMG, imageAlt: 'Happy farm animals hopping down from the hay cart.',
        imagePrompt: P({ cast: [CAST.cow], scene: 'Clarabelle counts the ten happy friends as they hop down from the hay-ride.', composition: 'Animals disembarking, cow counting.', light: 'Warm late-afternoon glow.' }) }
    ],
    closing: {
      text: { en: `One, two, three, four, five, six, seven, eight, nine, ten — and the littlest of all counts every bit as much as the rest.` },
      image: IMG, imageAlt: 'A hay cart and a little bell resting in the evening field.',
      imagePrompt: P({ scene: 'End vignette: a hay cart and a little brass bell resting in a golden evening field.', composition: 'Simple still life, cart and bell.', light: 'Soft golden dusk.' })
    }
  }));
})(window.APP);

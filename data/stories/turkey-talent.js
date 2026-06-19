// ─── The Turkey Who Could Not Fly ─────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: everyone has their own special talent.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/turkey.svg';
  var CAST = {
    turkey: `Toby the turkey: a plump bronze turkey with a fine fan of feathers, a red wattle and a kind round face; earnest and good-natured.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'turkey-talent',
    title:    { en: "The Turkey Who Could Not Fly" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'burgundy', board: null, color: '#7a2f3a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['turkey'], coverAnimal: 'turkey',
    requirements: [{ animalId: 'turkey', minCount: 1, label: 'Find the Turkey' }],
    cover: {
      image: IMG, imageAlt: 'A bronze turkey fanning its feathers in a farmyard.',
      imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby the turkey fans his fine feathers in a sunny farmyard.', composition: 'Turkey displaying, warm yard behind.', light: 'Bright farmyard light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a bustling farmyard lived a turkey named Toby, who wanted more than anything in the world to fly. All around him the other birds soared and swooped — the sparrows, the swallows, even the ducks — wheeling through the bright blue sky while Toby watched from the ground below.` },
        image: IMG, imageAlt: 'A turkey watching other birds fly overhead.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby gazes up wistfully as sparrows and swallows wheel through the sky.', composition: 'Turkey grounded, birds soaring above.', light: 'Clear blue daylight.' }) },
      { id: 2, text: { en: `Toby tried and tried. He flapped his wings with all his might, he ran and jumped, he leaped from the top of the hay bale — but it was no use. He was simply too round and too heavy, and his wings were not made for the sky. Down he came every time, in a flurry of feathers, with a bump.` },
        image: IMG, imageAlt: 'A turkey flapping hard but tumbling back to the ground.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby flaps with all his might but tumbles back to the ground in a flurry.', composition: 'Turkey mid-tumble, feathers flying.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `"It's hopeless," Toby sighed, drooping his fine feathers. "Everyone else can do the one thing I most want to do, and I never will. I am no good at anything at all." He felt very small and very sad, and he went off to mope alone behind the barn.` },
        image: IMG, imageAlt: 'A sad turkey drooping behind a barn.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'A dejected Toby droops his feathers, moping alone behind the barn.', composition: 'Lonely turkey, feathers low.', light: 'Soft overcast light.' }) },
      { id: 4, text: { en: `Now an old hen named Henrietta found him there. "No good at anything?" she clucked. "Why, what a thing to say! You are looking so hard at the one thing you cannot do that you've gone quite blind to all the things you CAN. Come — let us go and find your talent."` },
        image: IMG, imageAlt: 'An old hen encouraging a sad turkey.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Wise old Henrietta the hen encourages the downcast turkey.', composition: 'Hen and turkey, heads together.', light: 'Gentle warm light.' }) },
      { id: 5, text: { en: `So they tried things, one by one. Toby could not fly — but my, how he could RUN! When a fox came sneaking toward the henhouse, it was Toby who thundered across the yard, fast as anything, gobbling a great alarm, and sent that startled fox bolting back over the hedge.` },
        image: IMG, imageAlt: 'A turkey running fast and chasing off a fox.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby runs swiftly across the yard, gobbling loudly, chasing off a startled fox.', composition: 'Turkey at full charge, fox fleeing.', light: 'Dynamic bright light.' }) },
      { id: 6, text: { en: `And that was not all. When the farmyard held its harvest party, it turned out Toby had the grandest voice of any bird there. His big warm gobble-song set everyone's feet tapping, and his magnificent fan of feathers, spread wide, was the most beautiful sight in the whole yard.` },
        image: IMG, imageAlt: 'A turkey singing and displaying feathers at a farmyard party.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby sings his warm gobble-song and fans his feathers at the harvest party.', composition: 'Turkey displaying proudly, animals delighted.', light: 'Festive golden light.' }) },
      { id: 7, text: { en: `The other animals gathered round, clapping and cheering. "Toby, you're wonderful!" they cried. "Nobody runs like you, nobody sings like you, and nobody has feathers half so fine!" Toby looked about him in astonishment. He had been talented all along — just not at flying.` },
        image: IMG, imageAlt: 'Animals cheering for a proud, happy turkey.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'The farmyard animals cheer for a proud, astonished Toby.', composition: 'Turkey centre stage, happy crowd.', light: 'Warm celebratory glow.' }) },
      { id: 8, text: { en: `"I spent so long wishing I were a different bird," Toby said slowly, "that I never saw how fine it is to be THIS one." Henrietta nodded. "Just so," she clucked. "A fish cannot climb and a turkey cannot fly — but oh, the things each one CAN do, if only it looks."` },
        image: IMG, imageAlt: 'A wise hen and a happy turkey talking together.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Henrietta shares her wisdom as a happy, contented Toby listens.', composition: 'Hen and turkey in warm conversation.', light: 'Soft afternoon light.' }) },
      { id: 9, text: { en: `From that day on, Toby never again wished to be anyone but himself. He ran his races, he sang his songs, he fanned his glorious feathers in the sun — proud, at last, of every round and heavy inch of him. And he was, everyone agreed, a most extraordinary turkey indeed.` },
        image: IMG, imageAlt: 'A proud happy turkey running and singing in the sunshine.',
        imagePrompt: P({ cast: [CAST.turkey], scene: 'Toby runs and sings joyfully, proud of exactly who he is.', composition: 'Turkey in full happy display.', light: 'Bright joyful sunshine.' }) }
    ],
    closing: {
      text: { en: `For there is no use wishing to be some other creature — the happiest thing of all is to find what only YOU can do, and do it proudly.` },
      image: IMG, imageAlt: 'A single bronze turkey feather lying in the sunshine.',
      imagePrompt: P({ scene: 'End vignette: a single fine bronze turkey feather lying in warm sunshine.', composition: 'Simple still life, one feather.', light: 'Warm golden glow.' })
    }
  }));
})(window.APP);

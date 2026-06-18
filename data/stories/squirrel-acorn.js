// ─── Squirrel's Forgotten Acorn ───────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: even our small mistakes can grow into good things.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    squirrel: `Skipper the squirrel: a bright red squirrel with a big bushy tail and quick paws, busy and forgetful, forever burying acorns and losing track of where.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'squirrel-acorn',
    title:    { en: "Squirrel's Forgotten Acorn" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'russet', board: null, color: '#a8532a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['squirrel'], coverAnimal: 'squirrel',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/squirrel.svg',
      imageAlt: 'A red squirrel burying an acorn at the foot of a great oak tree.',
      imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper the squirrel pats earth over a buried acorn at the foot of a great oak.', composition: 'Squirrel digging, big oak above.', light: 'Warm autumn light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Skipper the squirrel was the busiest creature in the wood. All autumn long he gathered acorns and buried them — under this root, behind that stone, beside the old stump — so he would have food when winter came.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A busy squirrel gathering acorns in autumn.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper bustles about gathering and burying acorns among autumn leaves.', composition: 'Busy squirrel, scattered acorns.', light: 'Golden autumn light.' }) },
      { id: 2, text: { en: `The only trouble was that Skipper was rather forgetful. He buried so many acorns in so many places that he could never quite remember where they all were. "Oh, I'll remember THIS one," he said each time. He almost never did.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel scratching his head, looking puzzled among many holes.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper scratches his head, puzzled, surrounded by many little dug holes.', composition: 'Confused squirrel, scattered diggings.', light: 'Soft autumn light.' }) },
      { id: 3, text: { en: `One bright morning Skipper buried an especially fine, fat acorn at the edge of the meadow. "I shall definitely remember this spot," he declared. "Right by the... by the... hmm." And off he scampered, and quite forgot it entirely.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel burying a large acorn at the edge of a meadow.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper buries a fine fat acorn at the meadow\'s edge, already half-forgetting.', composition: 'Squirrel and a single special acorn.', light: 'Bright morning light.' }) },
      { id: 4, text: { en: `Winter came, and Skipper dug up his hidden stores — most of them, anyway. He found enough to keep him cosy and fed. But the fine fat acorn at the meadow's edge stayed buried, snug under the frost, all the long winter through.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel in winter digging up buried acorns in the snow.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper digs up acorns from the snowy ground in winter, cosy in a scarf.', composition: 'Squirrel foraging in snow.', light: 'Pale crisp winter light.' }) },
      { id: 5, text: { en: `Spring came. The frost melted, the rains fell, the sun grew warm — and the forgotten acorn, deep in the soft earth, did something Skipper had never expected. It cracked open, and sent down a tiny root, and pushed up a tiny green shoot.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A tiny green shoot sprouting from the ground in spring.',
        imagePrompt: P({ scene: 'A tiny green oak shoot pushes up from soft spring earth where the acorn was buried.', composition: 'Close on the small sprout in damp soil.', light: 'Fresh spring light.' }) },
      { id: 6, text: { en: `Skipper found it by accident, scampering across the meadow. "What's this little tree?" he wondered. "I don't remember planting a tree." An old owl chuckled from above. "But you did," she said. "It was your forgotten acorn."` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel looking curiously at a small sapling as an owl watches.',
        imagePrompt: P({ scene: 'Skipper studies a small green sapling while a wise owl looks on from a branch.', composition: 'Squirrel and sapling, owl above.', light: 'Bright spring light.' }) },
      { id: 7, text: { en: `Year by year, the little shoot grew. It became a sapling, then a young tree, then — over many seasons — a great spreading oak, taller than all the rest, dropping acorns of its own across the whole meadow.` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel beside a growing oak tree over the seasons.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper sits beside the oak as it grows tall and spreading over the seasons.', composition: 'Squirrel small beside a rising oak.', light: 'Warm seasonal light.' }) },
      { id: 8, text: { en: `Squirrels and birds and beetles all came to live in the great oak, and to feast on its acorns each autumn. Skipper sat proudly in its branches. "To think," he said, "all this came from one acorn I forgot to dig up."` },
        image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A squirrel proud in the branches of a great oak full of animals.',
        imagePrompt: P({ cast: [CAST.squirrel], scene: 'Skipper sits proudly in the branches of the great oak, full of birds and creatures.', composition: 'Squirrel high in a bustling oak.', light: 'Golden afternoon light.' }) },
      { id: 9, text: { en: `"Sometimes," said the old owl, "the things we forget, or get a little wrong, turn out to be exactly right in the end." And Skipper, who had always felt rather silly for forgetting, felt rather proud instead.` },
        image: 'assets/images/cartoon/owl.svg', imageAlt: 'An owl and a squirrel together in a great oak tree.',
        imagePrompt: P({ scene: 'The wise owl and proud Skipper sit together in the branches of the great oak.', composition: 'Owl and squirrel side by side in the tree.', light: 'Warm golden light.' }) }
    ],
    closing: {
      text: { en: `And every autumn after, Skipper still buried his acorns and still forgot a few — but now he smiled when he did, wondering which forgotten one might grow into the next great oak.` },
      image: 'assets/images/cartoon/squirrel.svg', imageAlt: 'A single acorn resting beside a tiny oak seedling.',
      imagePrompt: P({ scene: 'End vignette: a single acorn resting in the grass beside a tiny green oak seedling.', composition: 'Simple still life, acorn and sprout.', light: 'Soft warm light.' })
    }
  }));
})(window.APP);

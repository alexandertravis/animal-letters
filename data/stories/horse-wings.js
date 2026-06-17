// ─── The Horse Who Wanted Wings ───────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: there is more than one way to fly.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    horse: `Hattie the horse: a chestnut mare with a flowing cream mane and warm dark eyes, dreamy and full of longing, who gallops like the wind.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'horse-wings',
    title:    { en: "The Horse Who Wanted Wings" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'chestnut', board: null, color: '#8a4a2b',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['horse'], coverAnimal: 'horse',
    requirements: [],
    cover: {
      image: 'assets/images/cartoon/horse.svg',
      imageAlt: 'A chestnut horse galloping across a hilltop with her mane streaming like wings.',
      imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie the horse gallops along a high ridge, cream mane streaming out behind her like wings.', composition: 'Dynamic side gallop along a hilltop, big sky.', light: 'Wide golden afternoon light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Hattie the horse loved to watch the birds. All day she stood at the meadow fence, looking up, wishing more than anything in the world that she too had a pair of wings.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse at a fence gazing up at birds in the sky.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie stands at the meadow fence gazing wistfully up at birds wheeling in the sky.', composition: 'Horse lower, wide sky and birds above.', light: 'Soft daydreaming afternoon light.' }) },
      { id: 2, text: { en: `"If I had wings," she sighed, "I would fly over the hills and the river and the tallest trees. I would touch the clouds." But Hattie had no wings — only four strong legs and a long cream mane.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse looking at her own back, imagining wings.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie glances back at her own shoulders, imagining the wings she does not have.', composition: 'Close on the wistful horse.', light: 'Gentle warm light.' }) },
      { id: 3, text: { en: `She tried tying leaves to her sides. She tried flapping at the top of the hill. She tried jumping off the low wall with her legs spread wide. But each time she came straight back down with a soft thump.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse jumping off a low wall with leaves tied to her sides.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie leaps hopefully off a low stone wall with leaves tied to her flanks, hooves splayed.', composition: 'Mid-air hopeful jump, gentle and funny.', light: 'Bright cheerful light.' }) },
      { id: 4, text: { en: `An old swan watched from the pond. "Why do you want wings so badly?" she asked. "To feel the wind rush past me," said Hattie, "and the ground fall away, and to go fast, fast, fast — to feel free!"` },
        image: 'assets/images/cartoon/swan.svg', imageAlt: 'A swan on a pond talking to a horse at the water’s edge.',
        imagePrompt: P({ scene: 'A serene swan on the pond speaks with Hattie the horse standing at the water\'s edge.', composition: 'Swan on water, horse leaning down to listen.', light: 'Calm pondside light.' }) },
      { id: 5, text: { en: `The swan smiled. "But you already have a way to feel all of that," she said. "You have not tried the one thing horses do better than any bird. You have not really run."` },
        image: 'assets/images/cartoon/swan.svg', imageAlt: 'A swan gesturing with her wing toward open fields.',
        imagePrompt: P({ scene: 'The swan stretches a wing toward the open rolling fields, suggesting something to the horse.', composition: 'Swan gesturing, fields opening beyond.', light: 'Bright open light.' }) },
      { id: 6, text: { en: `So Hattie ran. She started slow, then faster, then faster still, down the long green slope with her mane streaming. The wind roared in her ears. The ground blurred beneath her hooves.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse galloping fast down a green slope, mane flying.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie gallops flat-out down a long green slope, mane and tail flying, the world blurring past.', composition: 'Powerful diagonal gallop, sense of speed.', light: 'Bright wind-blown daylight.' }) },
      { id: 7, text: { en: `For one long, glorious moment, as she leapt a stream, all four hooves left the ground at once — and Hattie flew. Just for a heartbeat. But it was flying, and she felt it all the way to her tail.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse leaping a stream, all four hooves off the ground.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie soars over a glittering stream, all four hooves off the ground, mane fanned out like wings.', composition: 'Mid-leap, suspended, triumphant.', light: 'Glittering sunlit spray.' }) },
      { id: 8, text: { en: `She ran over the hills and along the river and under the tallest trees — all the places she had dreamed of flying over. The wind rushed past. The ground fell away beneath each stride. She was free.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A horse galloping along a river under tall trees.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie gallops joyfully along the winding river beneath tall trees.', composition: 'Sweeping landscape gallop.', light: 'Golden river light.' }) },
      { id: 9, text: { en: `"You were right," Hattie told the swan, breathless and glowing. "I do not need wings to fly. I only needed to run." And the birds, looking down, thought the galloping horse looked very free indeed.` },
        image: 'assets/images/cartoon/horse.svg', imageAlt: 'A happy, breathless horse standing in the sun as birds fly above.',
        imagePrompt: P({ cast: [CAST.horse], scene: 'Hattie stands breathless and glowing in the sun while birds wheel admiringly overhead.', composition: 'Content horse below, birds above, full circle.', light: 'Warm golden light.' }) }
    ],
    closing: {
      text: { en: `And every day after, Hattie ran — not because she could not fly, but because she had found that running was a kind of flying all its own.` },
      image: 'assets/images/cartoon/horse.svg', imageAlt: 'A single cream horseshoe print and a feather on a green hill.',
      imagePrompt: P({ scene: 'End vignette: a single hoofprint in soft turf with one white feather resting beside it on a green hill.', composition: 'Simple still life on the grass.', light: 'Last warm gold of evening.' })
    }
  }));
})(window.APP);

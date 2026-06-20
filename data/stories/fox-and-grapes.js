// ─── The Fox and the Grapes ───────────────────────────────────────────────────
// Gentle retelling of the Aesop fable. ~9 pages. Moral: it is braver to admit you
// wanted something than to pretend you never did.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/fox.svg';
  var CAST = {
    fox: `Finn the fox: a sleek russet fox with a bushy white-tipped tail, bright amber eyes and a clever, expressive face.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'fox-and-grapes',
    title:    { en: "The Fox and the Grapes" },
    subtitle: 'after Aesop',
    skin: 'classic', leather: 'russet', board: null, color: '#a9542a',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['fox'], coverAnimal: 'fox',
    requirements: [{ animalId: 'fox', minCount: 1, label: 'Find the Fox' }],
    cover: {
      image: IMG, imageAlt: 'A fox gazing up at a bunch of grapes on a high vine.',
      imagePrompt: P({ cast: [CAST.fox], scene: 'Finn the fox gazes longingly up at a juicy bunch of grapes hanging on a high vine.', composition: 'Fox below, grapes high above on the vine.', light: 'Warm late-summer light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `One warm afternoon, a fox named Finn was trotting through an orchard when he spied the most delicious-looking grapes he had ever seen. They hung in a fat purple bunch, plump and glistening, high up on a vine, and Finn's mouth began to water at the very sight of them.` },
        image: IMG, imageAlt: 'A fox spotting a juicy bunch of grapes in an orchard.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn spots a plump bunch of glistening grapes high on a vine.', composition: 'Fox looking up, grapes gleaming.', light: 'Golden orchard light.' }) },
      { id: 2, text: { en: `"Those grapes," said Finn, licking his lips, "are exactly what I want." He crouched low, wiggled his haunches, and sprang up at them with all his might. But the grapes hung just a little too high, and his snapping jaws caught nothing but air. Thump — down he came.` },
        image: IMG, imageAlt: 'A fox leaping up but missing the high grapes.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn leaps up at the grapes but his jaws snap on empty air.', composition: 'Fox mid-leap, grapes just out of reach.', light: 'Bright daylight.' }) },
      { id: 3, text: { en: `Finn was not one to give up easily. He backed up further and took a longer run — dash, leap, SNAP! — but again he fell just short. He tried from the left, he tried from the right, he tried a great bounding jump from atop a tree root. Each time, the grapes stayed just out of reach.` },
        image: IMG, imageAlt: 'A determined fox trying again and again to reach the grapes.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn tries leaping again and again from different angles, still falling short.', composition: 'Fox in repeated leaps, grapes above.', light: 'Warm afternoon.' }) },
      { id: 4, text: { en: `He jumped until his legs ached and his tongue lolled and he was quite out of puff. But it was no good. However high he sprang, the grapes dangled tantalisingly beyond the very tip of his nose. At last, panting and dusty, Finn flopped down in the shade to rest.` },
        image: IMG, imageAlt: 'A tired panting fox resting beneath the grapevine.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'A tired, panting Finn flops down in the shade beneath the unreachable grapes.', composition: 'Worn-out fox, grapes still high.', light: 'Dappled shade.' }) },
      { id: 5, text: { en: `Feeling rather grumpy and embarrassed, Finn lifted his nose in the air. "Hmph," he sniffed. "I didn't really want those grapes anyway. They're probably sour and horrid. Only a silly fox would want such nasty green grapes." And he turned to stalk away with his nose held high.` },
        image: IMG, imageAlt: 'A grumpy fox sniffing and turning away from the grapes.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn lifts his nose haughtily and pretends he never wanted the grapes.', composition: 'Fox turning away, nose in air.', light: 'Bright light.' }) },
      { id: 6, text: { en: `But a little owl in the tree had watched the whole thing. "Sour, are they?" she hooted gently. "Yet a moment ago they were exactly what you wanted. It's a funny thing, Fox — calling a thing nasty, just because you couldn't reach it." Finn stopped, his ears going pink.` },
        image: IMG, imageAlt: 'An owl gently questioning a sheepish fox.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'A little owl gently teases the fox, whose ears turn pink with embarrassment.', composition: 'Owl in tree, sheepish fox below.', light: 'Soft warm light.' }) },
      { id: 7, text: { en: `Finn opened his mouth to argue — and then closed it again. The owl was right, and he knew it. He had wanted those grapes very much indeed, and it was only his bruised pride that was calling them sour. Pretending he hadn't cared didn't make the wanting go away. It just made him grumpy.` },
        image: IMG, imageAlt: 'A thoughtful fox realising the truth about himself.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn pauses, thoughtful, realising the truth about his own pride.', composition: 'Reflective fox in the orchard.', light: 'Gentle reflective light.' }) },
      { id: 8, text: { en: `"You're quite right, owl," he admitted with a sheepish grin. "I DID want them, and I couldn't reach them, and that's the honest truth of it." And do you know — the moment he said it out loud, the grumpy feeling melted clean away, and he felt much lighter and better.` },
        image: IMG, imageAlt: 'A fox grinning honestly, feeling lighter and better.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn grins honestly, the grumpiness melting away as he admits the truth.', composition: 'Cheerful honest fox.', light: 'Warm bright light.' }) },
      { id: 9, text: { en: `"Now," said the owl kindly, "shall we find a way together?" And between the two of them — a wise owl above and a clever fox below — they soon shook that bunch of grapes loose, and shared them then and there. And they were not the least bit sour. They were, in fact, perfectly sweet.` },
        image: IMG, imageAlt: 'A fox and owl happily sharing grapes together.',
        imagePrompt: P({ cast: [CAST.fox], scene: 'Finn and the owl happily share the sweet grapes they freed together.', composition: 'Fox and owl sharing the bunch.', light: 'Golden contented light.' }) }
    ],
    closing: {
      text: { en: `For it takes no courage to call a thing sour because we couldn't reach it — but plenty to admit we wanted it, and try a better way.` },
      image: IMG, imageAlt: 'A few sweet grapes resting on an orchard leaf.',
      imagePrompt: P({ scene: 'End vignette: a few sweet purple grapes resting on a broad orchard leaf.', composition: 'Simple still life, grapes on a leaf.', light: 'Warm golden glow.' })
    }
  }));
})(window.APP);

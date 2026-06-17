// ─── Kangaroo's Pocket ────────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: there is always room to help one more.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    kangaroo: `Kira the kangaroo: a soft sandy-brown kangaroo with a big warm pouch and gentle eyes, bounding lightly across the outback, kind to every small creature.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'kangaroo-pocket',
    title:    { en: "Kangaroo's Pocket" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'tan', board: null, color: '#c79a5b',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['kangaroo'], coverAnimal: 'kangaroo',
    requirements: [{ animalId: 'kangaroo', minCount: 1, label: 'Find the Kangaroo' }],
    cover: {
      image: 'assets/images/cartoon/kangaroo.svg',
      imageAlt: 'A kangaroo with a full warm pouch bounding across the sunny outback.',
      imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira the kangaroo bounds across golden outback grass, small faces peeping from her cosy pouch.', composition: 'Dynamic side bound, pouch as the warm centre.', light: 'Bright warm outback sun.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Kira the kangaroo had the cosiest pouch in all the outback. It was soft and warm and just the right size for carrying things, and Kira loved nothing better than to bound across the red sand with someone snug inside.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo bounding across red sand with a cosy pouch.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira bounds happily across the red outback, her cosy pouch swaying.', composition: 'Side bound across open sand.', light: 'Warm midday sun.' }) },
      { id: 2, text: { en: `One hot afternoon, a little lizard sat panting on a baking rock. "It's too hot to walk to the water," he sighed. "Hop in," said Kira, and she tucked him into her pouch and bounded for the cool billabong.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo tucking a small lizard into her pouch.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira gently tucks a small lizard into her warm pouch beside a hot rock.', composition: 'Close on the pouch and grateful lizard.', light: 'Shimmering heat-haze light.' }) },
      { id: 3, text: { en: `Along the way they met a tired little quail who had lost her way. "Plenty of room," said Kira, and in she went too. The pouch was getting fuller, but Kira only bounded a little more carefully.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo with a lizard and a quail peeping from her pouch.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'A lizard and a small quail peep out together from Kira\'s pouch as she bounds on.', composition: 'Pouch with two little passengers.', light: 'Warm afternoon light.' }) },
      { id: 4, text: { en: `Then came a baby possum who had tumbled from his tree, and a beetle with a sore leg, and two lost ants who only wanted to go home. "Room for everyone," said Kira, though the pouch was very full now.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo with a crowded, bulging pouch full of little animals.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira\'s pouch bulges cheerfully with a possum, a beetle and small creatures all peeping out.', composition: 'Comically full pouch, many little faces.', light: 'Bright friendly light.' }) },
      { id: 5, text: { en: `Bound by bound, Kira grew tired. Her legs ached and the pouch was heavy. But every time she looked down at the little faces peeping out, all trusting and grateful, she found just enough bounce for one more hop.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A tired kangaroo bounding on, looking fondly at her full pouch.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'A weary but happy Kira bounds on, glancing fondly at the trusting faces in her pouch.', composition: 'Effortful bound, tender downward glance.', light: 'Lowering golden light.' }) },
      { id: 6, text: { en: `At last they reached the billabong, cool and green and shaded. One by one, Kira lifted each small traveller out and set them gently down by the water. They drank, and rested, and thanked her with every kind of squeak and chirp.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo lifting little animals out of her pouch beside a green billabong.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira lifts the little creatures one by one from her pouch onto the cool shaded bank of a billabong.', composition: 'Kira and water, small animals gathering.', light: 'Cool dappled waterside light.' }) },
      { id: 7, text: { en: `"How did we all fit?" wondered the possum. Kira laughed. "A pouch is a funny thing," she said. "The more love you carry in it, the more room it seems to make." And she dipped her own tired paws in the cool water.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo resting by the water as little animals gather happily around.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira rests at the water\'s edge, the rescued creatures gathered happily around her.', composition: 'Warm group resting scene by the billabong.', light: 'Gentle green-gold light.' }) },
      { id: 8, text: { en: `As the sun went down, the little ones did not want to leave their kind friend. So Kira walked each of them home — the possum to his tree, the quail to her nest, the ants to their hill — with one last gentle ride for each.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo carrying a possum back to his tree at sunset.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'At sunset Kira lifts the baby possum back up to his tree branch.', composition: 'Tender homecoming, warm sky.', light: 'Orange-pink sunset.' }) },
      { id: 9, text: { en: `That night Kira slept very well, with an empty pouch and a full heart. And every creature in the outback knew that if ever they were tired or lost, there was always room in the kangaroo's cosy pocket.` },
        image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'A kangaroo sleeping peacefully under the outback stars.',
        imagePrompt: P({ cast: [CAST.kangaroo], scene: 'Kira sleeps peacefully under a wide starry outback sky, pouch empty, content.', composition: 'Restful night scene, big star-filled sky.', light: 'Soft starlight, deep blue night.' }) }
    ],
    closing: {
      text: { en: `For the kindest pocket in the outback always had room for one more — and Kira would not have had it any other way.` },
      image: 'assets/images/cartoon/kangaroo.svg', imageAlt: 'An empty cosy pouch shape under a starry sky.',
      imagePrompt: P({ scene: 'End vignette: the soft curve of an empty kangaroo pouch silhouetted under a few warm outback stars.', composition: 'Simple, restful silhouette.', light: 'Quiet starlight.' })
    }
  }));
})(window.APP);

// ─── The Monkeys and the Caps ─────────────────────────────────────────────────
// Gentle retelling of the folk tale ("Caps for Sale"). ~9 pages. Moral: a calm
// head and a clever idea solve what shouting never will.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/monkey.svg';
  var CAST = {
    monkey: `the monkeys: a band of cheeky brown monkeys with long tails and bright mischievous eyes, swinging in a tall tree.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'monkey-caps',
    title:    { en: "The Monkeys and the Caps" },
    subtitle: 'a folk tale',
    skin: 'classic', leather: 'chestnut', board: null, color: '#6a4a32',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['monkey'], coverAnimal: 'monkey',
    requirements: [{ animalId: 'monkey', minCount: 1, label: 'Find the Monkey' }],
    cover: {
      image: IMG, imageAlt: 'Cheeky monkeys in a tree wearing colourful caps.',
      imagePrompt: P({ cast: [CAST.monkey], scene: 'A band of cheeky monkeys sit in a tall tree, each wearing a colourful cap.', composition: 'Monkeys in the branches, caps on heads.', light: 'Bright dappled tree light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `There was once a kindly cap-seller who travelled from village to village, selling caps of every colour. He carried his whole shop upon his own head — a tall, wobbling stack of caps, grey ones on the bottom, then brown, then blue, then red, and his own checked cap right on the very top.` },
        image: IMG, imageAlt: 'A cap-seller with a tall stack of colourful caps on his head.',
        imagePrompt: P({ scene: 'A kindly cap-seller walks a country lane balancing a tall stack of colourful caps on his head.', composition: 'Figure with a towering stack of caps.', light: 'Warm travelling daylight.' }) },
      { id: 2, text: { en: `One hot afternoon, tired from his long walk, the cap-seller sat down to rest in the cool shade of a tall tree. He leaned back against the trunk, and before he knew it, his eyes grew heavy and he fell fast asleep — with all his caps still stacked neatly upon his head.` },
        image: IMG, imageAlt: 'A cap-seller asleep under a tree with caps on his head.',
        imagePrompt: P({ scene: 'The cap-seller dozes against a tree trunk, his stack of caps still on his head.', composition: 'Sleeping figure beneath a tall leafy tree.', light: 'Drowsy dappled shade.' }) },
      { id: 3, text: { en: `Now, high in that very tree lived a band of cheeky monkeys, and they had been watching the whole time with great interest. Down they crept, quiet as shadows, and ever so gently lifted the caps off the sleeping man's head — one each — before scampering back up into the branches.` },
        image: IMG, imageAlt: 'Monkeys quietly taking caps from a sleeping man.',
        imagePrompt: P({ cast: [CAST.monkey], scene: 'The cheeky monkeys creep down and quietly take the caps from the sleeping cap-seller.', composition: 'Monkeys sneaking off with caps.', light: 'Dappled mischievous light.' }) },
      { id: 4, text: { en: `When the cap-seller woke and reached up, he felt only his own checked cap left upon his head. "My caps!" he cried, jumping up. He looked left, he looked right, he looked behind the tree — and then he looked UP, and there sat the monkeys, every one of them wearing one of his lovely caps!` },
        image: IMG, imageAlt: 'A man looking up at monkeys wearing his caps in a tree.',
        imagePrompt: P({ cast: [CAST.monkey], scene: 'The cap-seller looks up in dismay at the monkeys, each wearing one of his caps.', composition: 'Man below, capped monkeys above.', light: 'Bright surprised daylight.' }) },
      { id: 5, text: { en: `"You rascals! Give me back my caps!" he shouted, shaking his fist. But the monkeys only shook their little fists right back, copying him exactly. "Chee chee chee!" they chattered. He stamped his foot — and the monkeys stamped their feet. The more he scolded, the more they mocked, and not a single cap came down.` },
        image: IMG, imageAlt: 'A man shaking his fist while monkeys copy him.',
        imagePrompt: P({ cast: [CAST.monkey], scene: 'The man shakes his fist and stamps; the monkeys gleefully copy his every move.', composition: 'Man gesturing, monkeys mirroring him.', light: 'Lively bright light.' }) },
      { id: 6, text: { en: `The cap-seller huffed and puffed until he was quite worn out, and still he had no caps. So at last he stopped, and sat down, and made himself think calmly. "Shouting only makes them shout," he said to himself. "These monkeys love to COPY whatever I do. Now... how might I use that?"` },
        image: IMG, imageAlt: 'A man sitting calmly, thinking of a clever plan.',
        imagePrompt: P({ scene: 'The cap-seller sits down calmly to think of a clever plan to get his caps back.', composition: 'Thoughtful figure beneath the tree.', light: 'Soft thinking light.' }) },
      { id: 7, text: { en: `A clever twinkle came into his eye. Very slowly and deliberately, he took the last cap — his own checked one — off his head... and threw it down hard onto the ground. The monkeys, who simply HAD to copy everything he did, snatched the caps from their own heads and — flump, flump, flump — threw them all down too!` },
        image: IMG, imageAlt: 'A man throwing his cap down and monkeys copying him.',
        imagePrompt: P({ cast: [CAST.monkey], scene: 'The man throws his own cap to the ground, and the monkeys copy, flinging all the caps down.', composition: 'Caps raining down as monkeys imitate.', light: 'Bright triumphant light.' }) },
      { id: 8, text: { en: `Down rained all the caps — grey, brown, blue, and red — landing in a glorious heap on the grass! The cap-seller laughed out loud and gathered them up, brushing them off and stacking them neatly once more upon his head. "Thank you kindly, monkeys!" he called, with a tip of his cap.` },
        image: IMG, imageAlt: 'A happy man gathering up all his fallen caps.',
        imagePrompt: P({ cast: [CAST.monkey], scene: 'The delighted cap-seller gathers his fallen caps as the monkeys chatter above.', composition: 'Man collecting caps, monkeys watching.', light: 'Warm happy light.' }) },
      { id: 9, text: { en: `And off he went down the road, his caps stacked high once more, chuckling all the way. He had not got them back by shouting or stamping or losing his temper — but by keeping a calm head and thinking of a clever plan. And that, he decided, was a far better trick than any monkey's.` },
        image: IMG, imageAlt: 'A cheerful cap-seller walking off with his stacked caps.',
        imagePrompt: P({ scene: 'The cheerful cap-seller walks off down the lane, caps stacked high, chuckling.', composition: 'Figure departing with his caps restored.', light: 'Golden afternoon light.' }) }
    ],
    closing: {
      text: { en: `For when something goes wrong, shouting and stamping rarely help at all — but a calm head and a clever idea can set almost anything right.` },
      image: IMG, imageAlt: 'A single colourful cap resting on the grass under a tree.',
      imagePrompt: P({ scene: 'End vignette: a single red cap resting on green grass beneath a tall tree.', composition: 'Simple still life, one cap on the grass.', light: 'Soft dappled glow.' })
    }
  }));
})(window.APP);

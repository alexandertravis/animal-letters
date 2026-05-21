window.APP = window.APP || {};

// Story definitions. Loaded before js/state.js so APP.STORIES is available
// everywhere at runtime. Each story has:
//   id          — unique key
//   title       — display title
//   color       — cover background colour (one of the app palette tones)
//   requirements — array of { animalId, minCount, label }
//                  animalId: creature ID derived from cartoon image filename
//                  minCount: animalCompletionCounts[id] must be >= this value
//                  label:    human-readable hint shown on locked book tiles
//   pages       — ordered array of { animal, text }
//                  animal: animalId whose cartoon SVG illustrates the page (null = text only)
//                  text:   story text for that page

APP.STORIES = [
  {
    id: 'goldilocks',
    title: 'Goldilocks and the Three Bears',
    color: '#ff8906',
    requirements: [
      { animalId: 'bear', minCount: 3, label: 'Complete Bear 3×' }
    ],
    pages: [
      { animal: 'bear', text: 'Once upon a time, three bears lived in a house in the forest. There was Papa Bear, Mama Bear, and little Baby Bear.' },
      { animal: 'bear', text: 'One day a girl called Goldilocks found the bears’ empty house and went inside. She tasted three bowls of porridge. The little bowl was just right — she ate it all up!' },
      { animal: 'bear', text: 'She tried three chairs. The little chair was just right — but it broke! Then she found three beds and fell fast asleep in Baby Bear’s cosy bed.' },
      { animal: 'bear', text: 'The bears came home. “Someone’s been eating my porridge — and eaten it all up!” cried Baby Bear.' },
      { animal: 'bear', text: '“Someone’s been sleeping in my bed — and she’s still there!” Goldilocks woke up, saw the three bears, jumped out the window, and ran all the way home.' },
    ]
  },

  {
    id: 'three-pigs',
    title: 'The Three Little Pigs',
    color: '#f582ae',
    requirements: [
      { animalId: 'pig',  minCount: 3, label: 'Complete Pig 3×' },
      { animalId: 'wolf', minCount: 1, label: 'Find the Wolf' }
    ],
    pages: [
      { animal: 'pig',  text: 'Once upon a time, three little pigs set off to build their very own homes.' },
      { animal: 'pig',  text: 'The first pig built a house of straw. The second built a house of sticks. The third worked hard and built a house of strong bricks.' },
      { animal: 'wolf', text: 'Then the big bad wolf arrived! He huffed and puffed and blew the straw house down. The first pig ran to his brother’s house!' },
      { animal: 'wolf', text: 'The wolf huffed and puffed again and blew the stick house down too! Both pigs raced to the brick house.' },
      { animal: 'pig',  text: 'The wolf huffed and puffed with all his might — but the brick house stood strong. The three little pigs were safe and lived happily ever after.' },
    ]
  },

  {
    id: 'hare-tortoise',
    title: 'The Hare and the Tortoise',
    color: '#8bd3dd',
    requirements: [
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' },
      { animalId: 'turtle', minCount: 1, label: 'Find the Turtle' }
    ],
    pages: [
      { animal: 'rabbit', text: 'Once upon a time, a hare loved to boast about how fast he could run. “I’m the fastest animal around!” he said.' },
      { animal: 'turtle', text: 'A slow old tortoise heard this and said, “I challenge you to a race!” The hare laughed but agreed.' },
      { animal: 'rabbit', text: 'At the start the hare sprinted far ahead. He was so confident he decided to take a nap under a shady tree.' },
      { animal: 'turtle', text: 'Slowly and steadily the tortoise kept walking. Step by step, he passed the sleeping hare.' },
      { animal: 'turtle', text: 'When the hare woke up he ran as fast as he could — but it was too late! The tortoise had already crossed the finish line. Slow and steady wins the race!' },
    ]
  },

  {
    id: 'ugly-duckling',
    title: 'The Ugly Duckling',
    color: '#5390d9',
    requirements: [
      { animalId: 'duck', minCount: 3, label: 'Complete Duck 3×' },
      { animalId: 'swan', minCount: 1, label: 'Find the Swan' }
    ],
    pages: [
      { animal: 'duck', text: 'Once upon a time, a mother duck waited for her eggs to hatch. One by one, fluffy yellow ducklings appeared — but the last egg was much bigger than the rest.' },
      { animal: 'duck', text: 'From the big egg hatched a grey, clumsy duckling. “What an ugly duckling!” said the other animals. The poor duckling felt very sad and ran away.' },
      { animal: 'duck', text: 'All winter the ugly duckling wandered alone through the cold and snow, with no one to play with.' },
      { animal: 'swan', text: 'When spring came, the duckling saw beautiful white birds gliding on a lake. He swam towards them, certain they would chase him away.' },
      { animal: 'swan', text: 'He looked at his reflection — and saw a beautiful white swan! He had become the most graceful bird of all, and was never lonely again.' },
    ]
  },

  {
    id: 'three-billy-goats',
    title: 'Three Billy Goats Gruff',
    color: '#2dc653',
    requirements: [
      { animalId: 'goat', minCount: 3, label: 'Complete Goat 3×' }
    ],
    pages: [
      { animal: 'goat', text: 'Once upon a time, three Billy Goats Gruff wanted to cross a bridge to eat the sweet green grass on the other side.' },
      { animal: 'goat', text: 'Under the bridge lived a terrible troll with huge eyes and a very loud voice. "Who\'s that trip-trapping over my bridge?" he roared.' },
      { animal: 'goat', text: 'Little Billy Goat crossed first. "Don\'t eat me — wait for my bigger brother!" The troll agreed. Middle Billy Goat said the same thing.' },
      { animal: 'goat', text: 'Then Great Big Billy Goat Gruff came thundering across. The troll leaped up to stop him — but the great big goat tossed him into the river with a mighty crash!' },
      { animal: 'goat', text: 'The troll was never seen again. All three billy goats crossed safely and ate the sweet green grass. Snip, snap, snout — this tale is told out!' },
    ]
  },

  {
    id: 'three-blind-mice',
    title: 'Three Blind Mice',
    color: '#7b2d8b',
    requirements: [
      { animalId: 'mouse', minCount: 3, label: 'Complete Mouse 3×' }
    ],
    pages: [
      { animal: 'mouse', text: 'Three blind mice, three blind mice — see how they run! Three little mice set off on an adventure, bumping into each other and tumbling merrily along.' },
      { animal: 'mouse', text: 'They scurried across a field and smelled something wonderful — a great round cheese sitting on the farmer\'s table! In they crept, sniff sniff sniff.' },
      { animal: 'mouse', text: 'They all ran after the farmer\'s wife, who chased them right out of the kitchen and away across the yard. Did you ever see such a sight in your life?' },
      { animal: 'mouse', text: 'The three mice were brave. They found a cosy barn full of crumbs and made it their home, dancing in a circle and singing their famous song.' },
      { animal: 'mouse', text: 'Three blind mice, three blind mice — they lived happily ever after, dancing and singing and sniffing out cheese wherever they went!' },
    ]
  },

  {
    id: 'hey-diddle-diddle',
    title: 'Hey Diddle Diddle',
    color: '#1b4332',
    requirements: [
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' },
      { animalId: 'dog', minCount: 1, label: 'Find the Dog' },
      { animalId: 'cow', minCount: 1, label: 'Find the Cow' }
    ],
    pages: [
      { animal: 'cat', text: 'Hey diddle diddle, the cat and the fiddle! One magical night, a very musical cat picked up her violin and began to play the most enchanting tune under the bright full moon.' },
      { animal: 'cow', text: 'The cow heard the music and felt so joyful that she jumped right over the moon! Up she soared through the sparkling stars, mooing with delight, and landed gently on the other side.' },
      { animal: 'dog', text: 'The little dog laughed to see such sport — he wagged his tail and yipped with joy, rolling on his back and kicking his paws in the air with glee.' },
      { animal: 'cat', text: 'The dish and the spoon looked at each other, then took each other\'s hand and ran away together into the night, dancing all the way to the edge of the world.' },
      { animal: 'cow', text: 'The cow floated back down from the moon, mooing contentedly. The cat played one last tune, and all the animals fell fast asleep under the stars. The end!' },
    ]
  },

  {
    id: 'owl-pussy-cat',
    title: 'The Owl and the Pussy-Cat',
    color: '#0077b6',
    requirements: [
      { animalId: 'owl', minCount: 1, label: 'Find the Owl' },
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' }
    ],
    pages: [
      { animal: 'owl', text: 'The Owl and the Pussy-Cat went to sea in a beautiful pea-green boat. They packed honey and plenty of money wrapped up in a five-pound note.' },
      { animal: 'cat', text: 'The Pussy-Cat looked up at the stars and sang to the Owl with a beautiful voice. "O lovely Owl! You sing so wonderfully. Will you marry me?" The Owl agreed at once.' },
      { animal: 'owl', text: 'They sailed for a year and a day to the land where the Bong-tree grows. There they found a Piggy-wig with a ring at the end of his nose, his nose — a ring at the end of his nose!' },
      { animal: 'cat', text: 'They bought the ring for a shilling and a turkey who lived on the hill married them that very afternoon. The stars twinkled and the sea shimmered all around.' },
      { animal: 'owl', text: 'They dined on mince and slices of quince, which they ate with a runcible spoon. And hand in hand by the edge of the sand they danced by the light of the moon, the moon — they danced by the light of the moon!' },
    ]
  },
];

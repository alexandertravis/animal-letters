window.APP = window.APP || {};

// Story definitions. Loaded before js/state.js so APP.STORIES is available
// everywhere at runtime. Each story has:
//   id           — unique key
//   title        — display title
//   color        — cover background colour
//   requirements — array of { animalId, minCount, label }
//   pages        — ordered array of { text, image }
//                  text:  story text for that page (shown on left panel)
//                  image: path to the illustration SVG (shown on right panel)
//
// The storyreader adds synthetic title and outro spreads automatically.
// Do NOT add them here — only story content pages belong in this array.

APP.STORIES = [
  {
    id: 'goldilocks',
    title: 'Goldilocks and the Three Bears',
    color: '#ff8906',
    leather: 'burgundy', board: 'sun',
    requirements: [
      { animalId: 'bear', minCount: 3, label: 'Complete Bear 3×' }
    ],
    pages: [
      { text: 'Once upon a time, three bears lived in a house in the forest. There was Papa Bear, Mama Bear, and little Baby Bear.', image: 'assets/images/cartoon/bear.svg' },
      { text: 'One day a girl called Goldilocks found the bears’ empty house and went inside. She tasted three bowls of porridge. The little bowl was just right — she ate it all up!', image: 'assets/images/cartoon/bear.svg' },
      { text: 'She tried three chairs. The little chair was just right — but it broke! Then she found three beds and fell fast asleep in Baby Bear’s cosy bed.', image: 'assets/images/cartoon/bear.svg' },
      { text: 'The bears came home. “Someone’s been eating my porridge — and eaten it all up!” cried Baby Bear.', image: 'assets/images/cartoon/bear.svg' },
      { text: '“Someone’s been sleeping in my bed — and she’s still there!” Goldilocks woke up, saw the three bears, jumped out the window, and ran all the way home.', image: 'assets/images/cartoon/bear.svg' },
    ]
  },

  {
    id: 'three-pigs',
    title: 'The Three Little Pigs',
    color: '#f582ae',
    leather: 'plum', board: 'rose',
    requirements: [
      { animalId: 'pig',  minCount: 3, label: 'Complete Pig 3×' },
      { animalId: 'wolf', minCount: 1, label: 'Find the Wolf' }
    ],
    pages: [
      { text: 'Once upon a time, three little pigs set off to build their very own homes.', image: 'assets/images/cartoon/pig.svg' },
      { text: 'The first pig built a house of straw. The second built a house of sticks. The third worked hard and built a house of strong bricks.', image: 'assets/images/cartoon/pig.svg' },
      { text: 'Then the big bad wolf arrived! He huffed and puffed and blew the straw house down. The first pig ran to his brother’s house!', image: 'assets/images/cartoon/wolf.svg' },
      { text: 'The wolf huffed and puffed again and blew the stick house down too! Both pigs raced to the brick house.', image: 'assets/images/cartoon/wolf.svg' },
      { text: 'The wolf huffed and puffed with all his might — but the brick house stood strong. The three little pigs were safe and lived happily ever after.', image: 'assets/images/cartoon/pig.svg' },
    ]
  },

  {
    id: 'hare-tortoise',
    title: 'The Hare and the Tortoise',
    color: '#8bd3dd',
    leather: 'forest', board: 'sky',
    requirements: [
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' },
      { animalId: 'turtle', minCount: 1, label: 'Find the Turtle' }
    ],
    pages: [
      { text: 'Once upon a time, a hare loved to boast about how fast he could run. “I’m the fastest animal around!” he said.', image: 'assets/images/cartoon/rabbit.svg' },
      { text: 'A slow old tortoise heard this and said, “I challenge you to a race!” The hare laughed but agreed.', image: 'assets/images/cartoon/turtle.svg' },
      { text: 'At the start the hare sprinted far ahead. He was so confident he decided to take a nap under a shady tree.', image: 'assets/images/cartoon/rabbit.svg' },
      { text: 'Slowly and steadily the tortoise kept walking. Step by step, he passed the sleeping hare.', image: 'assets/images/cartoon/turtle.svg' },
      { text: 'When the hare woke up he ran as fast as he could — but it was too late! The tortoise had already crossed the finish line. Slow and steady wins the race!', image: 'assets/images/cartoon/turtle.svg' },
    ]
  },

  {
    id: 'ugly-duckling',
    title: 'The Ugly Duckling',
    color: '#5390d9',
    leather: 'navy', board: 'sky',
    requirements: [
      { animalId: 'duck', minCount: 3, label: 'Complete Duck 3×' },
      { animalId: 'swan', minCount: 1, label: 'Find the Swan' }
    ],
    pages: [
      { text: 'Once upon a time, a mother duck waited for her eggs to hatch. One by one, fluffy yellow ducklings appeared — but the last egg was much bigger than the rest.', image: 'assets/images/cartoon/duck.svg' },
      { text: 'From the big egg hatched a grey, clumsy duckling. “What an ugly duckling!” said the other animals. The poor duckling felt very sad and ran away.', image: 'assets/images/cartoon/duck.svg' },
      { text: 'All winter the ugly duckling wandered alone through the cold and snow, with no one to play with.', image: 'assets/images/cartoon/duck.svg' },
      { text: 'When spring came, the duckling saw beautiful white birds gliding on a lake. He swam towards them, certain they would chase him away.', image: 'assets/images/cartoon/swan.svg' },
      { text: 'He looked at his reflection — and saw a beautiful white swan! He had become the most graceful bird of all, and was never lonely again.', image: 'assets/images/cartoon/swan.svg' },
    ]
  },

  {
    id: 'three-billy-goats',
    title: 'Three Billy Goats Gruff',
    color: '#2dc653',
    leather: 'tan', board: 'sage',
    requirements: [
      { animalId: 'goat', minCount: 3, label: 'Complete Goat 3×' }
    ],
    pages: [
      { text: 'Once upon a time, three Billy Goats Gruff wanted to cross a bridge to eat the sweet green grass on the other side.', image: 'assets/images/cartoon/goat.svg' },
      { text: 'Under the bridge lived a terrible troll with huge eyes and a very loud voice. “Who’s that trip-trapping over my bridge?” he roared.', image: 'assets/images/cartoon/goat.svg' },
      { text: 'Little Billy Goat crossed first. “Don’t eat me — wait for my bigger brother!” The troll agreed. Middle Billy Goat said the same thing.', image: 'assets/images/cartoon/goat.svg' },
      { text: 'Then Great Big Billy Goat Gruff came thundering across. The troll leaped up to stop him — but the great big goat tossed him into the river with a mighty crash!', image: 'assets/images/cartoon/goat.svg' },
      { text: 'The troll was never seen again. All three billy goats crossed safely and ate the sweet green grass. Snip, snap, snout — this tale is told out!', image: 'assets/images/cartoon/goat.svg' },
    ]
  },

  {
    id: 'three-blind-mice',
    title: 'Three Blind Mice',
    color: '#7b2d8b',
    leather: 'plum', board: 'rose',
    requirements: [
      { animalId: 'mouse', minCount: 3, label: 'Complete Mouse 3×' }
    ],
    pages: [
      { text: 'Three blind mice, three blind mice — see how they run! Three little mice set off on an adventure, bumping into each other and tumbling merrily along.', image: 'assets/images/cartoon/mouse.svg' },
      { text: 'They scurried across a field and smelled something wonderful — a great round cheese sitting on the farmer’s table! In they crept, sniff sniff sniff.', image: 'assets/images/cartoon/mouse.svg' },
      { text: 'They all ran after the farmer’s wife, who chased them right out of the kitchen and away across the yard. Did you ever see such a sight in your life?', image: 'assets/images/cartoon/mouse.svg' },
      { text: 'The three mice were brave. They found a cosy barn full of crumbs and made it their home, dancing in a circle and singing their famous song.', image: 'assets/images/cartoon/mouse.svg' },
      { text: 'Three blind mice, three blind mice — they lived happily ever after, dancing and singing and sniffing out cheese wherever they went!', image: 'assets/images/cartoon/mouse.svg' },
    ]
  },

  {
    id: 'hey-diddle-diddle',
    title: 'Hey Diddle Diddle',
    color: '#1b4332',
    leather: 'forest', board: 'sage',
    requirements: [
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' },
      { animalId: 'dog', minCount: 1, label: 'Find the Dog' },
      { animalId: 'cow', minCount: 1, label: 'Find the Cow' }
    ],
    pages: [
      { text: 'Hey diddle diddle, the cat and the fiddle! One magical night, a very musical cat picked up her violin and began to play the most enchanting tune under the bright full moon.', image: 'assets/images/cartoon/cat.svg' },
      { text: 'The cow heard the music and felt so joyful that she jumped right over the moon! Up she soared through the sparkling stars, mooing with delight, and landed gently on the other side.', image: 'assets/images/cartoon/cow.svg' },
      { text: 'The little dog laughed to see such sport — he wagged his tail and yipped with joy, rolling on his back and kicking his paws in the air with glee.', image: 'assets/images/cartoon/dog.svg' },
      { text: 'The dish and the spoon looked at each other, then took each other’s hand and ran away together into the night, dancing all the way to the edge of the world.', image: 'assets/images/cartoon/cat.svg' },
      { text: 'The cow floated back down from the moon, mooing contentedly. The cat played one last tune, and all the animals fell fast asleep under the stars. The end!', image: 'assets/images/cartoon/cow.svg' },
    ]
  },

  {
    id: 'owl-pussy-cat',
    title: 'The Owl and the Pussy-Cat',
    color: '#0077b6',
    leather: 'navy', board: 'sky',
    requirements: [
      { animalId: 'owl', minCount: 1, label: 'Find the Owl' },
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' }
    ],
    pages: [
      { text: 'The Owl and the Pussy-Cat went to sea in a beautiful pea-green boat. They packed honey and plenty of money wrapped up in a five-pound note.', image: 'assets/images/cartoon/owl.svg' },
      { text: 'The Pussy-Cat looked up at the stars and sang to the Owl with a beautiful voice. “O lovely Owl! You sing so wonderfully. Will you marry me?” The Owl agreed at once.', image: 'assets/images/cartoon/cat.svg' },
      { text: 'They sailed for a year and a day to the land where the Bong-tree grows. There they found a Piggy-wig with a ring at the end of his nose, his nose — a ring at the end of his nose!', image: 'assets/images/cartoon/owl.svg' },
      { text: 'They bought the ring for a shilling and a turkey who lived on the hill married them that very afternoon. The stars twinkled and the sea shimmered all around.', image: 'assets/images/cartoon/cat.svg' },
      { text: 'They dined on mince and slices of quince, which they ate with a runcible spoon. And hand in hand by the edge of the sand they danced by the light of the moon, the moon — they danced by the light of the moon!', image: 'assets/images/cartoon/owl.svg' },
    ]
  },
];

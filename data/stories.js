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
];

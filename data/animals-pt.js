window.APP = window.APP || {};

// ── Portuguese animal list ────────────────────────────────────────────────────
// Each entry follows the same schema as data/animals.js.
// Images and audio reuse English assets where the same animal applies.
// Missing image/audio files degrade gracefully (fallback graphic, silent).
//
// Animals whose Portuguese names contain accented characters are commented out
// until their letterData.js stroke entries have been authored.
// Uncomment and add the relevant LETTERS entries once strokes are ready.

APP.ANIMALS_PT = [
  // ── 4-letter names ──────────────────────────────────────────────────────────
  { name: 'GATO',   displayName: 'Gato',   images: { cartoon: 'assets/images/cartoon/cat.svg',    realistic: 'assets/images/realistic/cat.jpg'    }, audio: 'assets/audio/cat.mp3'    },
  { name: 'PATO',   displayName: 'Pato',   images: { cartoon: 'assets/images/cartoon/duck.svg',   realistic: 'assets/images/realistic/duck.jpg'   }, audio: 'assets/audio/duck.mp3'   },
  { name: 'URSO',   displayName: 'Urso',   images: { cartoon: 'assets/images/cartoon/bear.svg',   realistic: 'assets/images/realistic/bear.jpg'   }, audio: 'assets/audio/bear.mp3'   },
  { name: 'LOBO',   displayName: 'Lobo',   images: { cartoon: 'assets/images/cartoon/wolf.svg',   realistic: 'assets/images/realistic/wolf.jpg'   }, audio: 'assets/audio/wolf.mp3'   },
  { name: 'RATO',   displayName: 'Rato',   images: { cartoon: 'assets/images/cartoon/rat.svg',    realistic: 'assets/images/realistic/rat.jpg'    }, audio: 'assets/audio/rat.mp3'    },
  { name: 'BODE',   displayName: 'Bode',   images: { cartoon: 'assets/images/cartoon/goat.svg',   realistic: 'assets/images/realistic/goat.jpg'   }, audio: 'assets/audio/goat.mp3'   },
  // ── 5-letter names ──────────────────────────────────────────────────────────
  { name: 'COBRA',  displayName: 'Cobra',  images: { cartoon: 'assets/images/cartoon/snake.svg',  realistic: 'assets/images/realistic/snake.jpg'  }, audio: 'assets/audio/snake.mp3'  },
  { name: 'TIGRE',  displayName: 'Tigre',  images: { cartoon: 'assets/images/cartoon/tiger.svg',  realistic: 'assets/images/realistic/tiger.jpg'  }, audio: 'assets/audio/tiger.mp3'  },
  { name: 'ZEBRA',  displayName: 'Zebra',  images: { cartoon: 'assets/images/cartoon/zebra.svg',  realistic: 'assets/images/realistic/zebra.jpg'  }, audio: 'assets/audio/zebra.mp3'  },
  { name: 'PORCO',  displayName: 'Porco',  images: { cartoon: 'assets/images/cartoon/pig.svg',    realistic: 'assets/images/realistic/pig.jpg'    }, audio: 'assets/audio/pig.mp3'    },
  // ── 6-letter names ──────────────────────────────────────────────────────────
  { name: 'CAVALO', displayName: 'Cavalo', images: { cartoon: 'assets/images/cartoon/horse.svg',  realistic: 'assets/images/realistic/horse.jpg'  }, audio: 'assets/audio/horse.mp3'  },
  { name: 'MACACO', displayName: 'Macaco', images: { cartoon: 'assets/images/cartoon/monkey.svg', realistic: 'assets/images/realistic/monkey.jpg' }, audio: 'assets/audio/monkey.mp3' },
  { name: 'GIRAFA', displayName: 'Girafa', images: { cartoon: 'assets/images/cartoon/giraffe.svg',realistic: 'assets/images/realistic/giraffe.jpg'}, audio: 'assets/audio/giraffe.mp3'},
  { name: 'COELHO', displayName: 'Coelho', images: { cartoon: 'assets/images/cartoon/rabbit.svg', realistic: 'assets/images/realistic/rabbit.jpg' }, audio: 'assets/audio/rabbit.mp3' },
  // ── Accented names — uncomment once letterData.js strokes are authored ──────
  // { name: 'CÃO',    displayName: 'Cão',    images: { cartoon: 'assets/images/cartoon/dog.svg',    realistic: 'assets/images/realistic/dog.jpg'    }, audio: 'assets/audio/dog.mp3'    },
  // { name: 'LEÃO',   displayName: 'Leão',   images: { cartoon: 'assets/images/cartoon/lion.svg',   realistic: 'assets/images/realistic/lion.jpg'   }, audio: 'assets/audio/lion.mp3'   },
  // { name: 'ONÇA',   displayName: 'Onça',   images: { cartoon: 'assets/images/cartoon/jaguar.svg', realistic: 'assets/images/realistic/jaguar.jpg' }, audio: 'assets/audio/jaguar.mp3' },
];

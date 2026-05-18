window.APP = window.APP || {};

// ── Portuguese animal list ────────────────────────────────────────────────────
// Mirrors data/animals.js exactly — one Portuguese entry per English animal.
// All images and audio reuse the English asset set (same creature, different word).
//
// Accented names (CÃO, LEÃO, ÁGUIA, TUBARÃO) are included and work immediately:
// the accent stroke auto-completes via graceful degradation until stroke paths are
// authored in APP.ACCENTS (js/letterData.js). Children trace the base letter shape.
//
// rato (mouse/rat) → mouse.svg  (both PT words name the same creature)

APP.ANIMALS_PT = [
  // ── 3-letter names ──────────────────────────────────────────────────────────
  { name: 'CÃO',        displayName: 'Cão',        images: { cartoon: 'assets/images/cartoon/dog.svg',       realistic: 'assets/images/realistic/dog.jpg'       }, audio: 'assets/audio/dog.mp3'       },

  // ── 4-letter names ──────────────────────────────────────────────────────────
  { name: 'GATO',       displayName: 'Gato',       images: { cartoon: 'assets/images/cartoon/cat.svg',       realistic: 'assets/images/realistic/cat.jpg'       }, audio: 'assets/audio/cat.mp3'       },
  { name: 'PATO',       displayName: 'Pato',       images: { cartoon: 'assets/images/cartoon/duck.svg',      realistic: 'assets/images/realistic/duck.jpg'      }, audio: 'assets/audio/duck.mp3'      },
  { name: 'URSO',       displayName: 'Urso',       images: { cartoon: 'assets/images/cartoon/bear.svg',      realistic: 'assets/images/realistic/bear.jpg'      }, audio: 'assets/audio/bear.mp3'      },
  { name: 'LOBO',       displayName: 'Lobo',       images: { cartoon: 'assets/images/cartoon/wolf.svg',      realistic: 'assets/images/realistic/wolf.jpg'      }, audio: 'assets/audio/wolf.mp3'      },
  { name: 'RATO',       displayName: 'Rato',       images: { cartoon: 'assets/images/cartoon/mouse.svg',     realistic: 'assets/images/realistic/mouse.jpg'     }, audio: 'assets/audio/mouse.mp3'     },
  { name: 'VACA',       displayName: 'Vaca',       images: { cartoon: 'assets/images/cartoon/cow.svg',       realistic: 'assets/images/realistic/cow.jpg'       }, audio: 'assets/audio/cow.mp3'       },
  { name: 'SAPO',       displayName: 'Sapo',       images: { cartoon: 'assets/images/cartoon/frog.svg',      realistic: 'assets/images/realistic/frog.jpg'      }, audio: 'assets/audio/frog.mp3'      },
  { name: 'LEÃO',       displayName: 'Leão',       images: { cartoon: 'assets/images/cartoon/lion.svg',      realistic: 'assets/images/realistic/lion.jpg'      }, audio: 'assets/audio/lion.mp3'      },

  // ── 5-letter names ──────────────────────────────────────────────────────────
  { name: 'TIGRE',      displayName: 'Tigre',      images: { cartoon: 'assets/images/cartoon/tiger.svg',     realistic: 'assets/images/realistic/tiger.jpg'     }, audio: 'assets/audio/tiger.mp3'     },
  { name: 'ZEBRA',      displayName: 'Zebra',      images: { cartoon: 'assets/images/cartoon/zebra.svg',     realistic: 'assets/images/realistic/zebra.jpg'     }, audio: 'assets/audio/zebra.mp3'     },
  { name: 'PORCO',      displayName: 'Porco',      images: { cartoon: 'assets/images/cartoon/pig.svg',       realistic: 'assets/images/realistic/pig.jpg'       }, audio: 'assets/audio/pig.mp3'       },
  { name: 'VEADO',      displayName: 'Veado',      images: { cartoon: 'assets/images/cartoon/deer.svg',      realistic: 'assets/images/realistic/deer.jpg'      }, audio: 'assets/audio/deer.mp3'      },
  { name: 'PANDA',      displayName: 'Panda',      images: { cartoon: 'assets/images/cartoon/panda.svg',     realistic: 'assets/images/realistic/panda.jpg'     }, audio: 'assets/audio/panda.mp3'     },
  { name: 'ÁGUIA',      displayName: 'Águia',      images: { cartoon: 'assets/images/cartoon/eagle.svg',     realistic: 'assets/images/realistic/eagle.jpg'     }, audio: 'assets/audio/eagle.mp3'     },

  // ── 6-letter names ──────────────────────────────────────────────────────────
  { name: 'CAVALO',     displayName: 'Cavalo',     images: { cartoon: 'assets/images/cartoon/horse.svg',     realistic: 'assets/images/realistic/horse.jpg'     }, audio: 'assets/audio/horse.mp3'     },
  { name: 'COELHO',     displayName: 'Coelho',     images: { cartoon: 'assets/images/cartoon/rabbit.svg',    realistic: 'assets/images/realistic/rabbit.jpg'    }, audio: 'assets/audio/rabbit.mp3'    },
  { name: 'RAPOSA',     displayName: 'Raposa',     images: { cartoon: 'assets/images/cartoon/fox.svg',       realistic: 'assets/images/realistic/fox.jpg'       }, audio: 'assets/audio/fox.mp3'       },
  { name: 'CORUJA',     displayName: 'Coruja',     images: { cartoon: 'assets/images/cartoon/owl.svg',       realistic: 'assets/images/realistic/owl.jpg'       }, audio: 'assets/audio/owl.mp3'       },
  { name: 'ABELHA',     displayName: 'Abelha',     images: { cartoon: 'assets/images/cartoon/bee.svg',       realistic: 'assets/images/realistic/bee.jpg'       }, audio: 'assets/audio/bee.mp3'       },

  // ── 7-letter names ──────────────────────────────────────────────────────────
  { name: 'GALINHA',    displayName: 'Galinha',    images: { cartoon: 'assets/images/cartoon/hen.svg',       realistic: 'assets/images/realistic/hen.jpg'       }, audio: 'assets/audio/hen.mp3'       },
  { name: 'FORMIGA',    displayName: 'Formiga',    images: { cartoon: 'assets/images/cartoon/ant.svg',       realistic: 'assets/images/realistic/ant.jpg'       }, audio: 'assets/audio/ant.mp3'       },
  { name: 'TUBARÃO',    displayName: 'Tubarão',    images: { cartoon: 'assets/images/cartoon/shark.svg',     realistic: 'assets/images/realistic/shark.jpg'     }, audio: 'assets/audio/shark.mp3'     },

  // ── 8-letter names ──────────────────────────────────────────────────────────
  { name: 'PAPAGAIO',   displayName: 'Papagaio',   images: { cartoon: 'assets/images/cartoon/parrot.svg',    realistic: 'assets/images/realistic/parrot.jpg'    }, audio: 'assets/audio/parrot.mp3'    },

  // ── 10-letter names ─────────────────────────────────────────────────────────
  { name: 'CARANGUEJO', displayName: 'Caranguejo', images: { cartoon: 'assets/images/cartoon/crab.svg',      realistic: 'assets/images/realistic/crab.jpg'      }, audio: 'assets/audio/crab.mp3'      },
];

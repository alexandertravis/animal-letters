window.APP = window.APP || {};

// ── Portuguese animal list ────────────────────────────────────────────────────
// All images and audio reuse the English asset set (same creature, different word).
//
// Accented names (CÃO, LEÃO, ÁGUIA, TUBARÃO) are included and work immediately:
// the accent stroke auto-completes via graceful degradation until stroke paths are
// authored in APP.ACCENTS (js/letterData.js). Children trace the base letter shape.

APP.ANIMALS_PT = [
  // ── 3-letter names ──────────────────────────────────────────────────────────
  { name: 'CÃO',        displayName: 'Cão',        images: { cartoon: 'assets/images/cartoon/dog.svg',        realistic: 'assets/images/realistic/dog.jpg'       }, audio: 'assets/audio/dog.mp3'       },

  // ── 4-letter names ──────────────────────────────────────────────────────────
  { name: 'ALCE',       displayName: 'Alce',       images: { cartoon: 'assets/images/cartoon/moose.svg',      realistic: 'assets/images/realistic/moose.jpg'     }, audio: 'assets/audio/moose.mp3'     },
  { name: 'GATO',       displayName: 'Gato',       images: { cartoon: 'assets/images/cartoon/cat.svg',        realistic: 'assets/images/realistic/cat.jpg'       }, audio: 'assets/audio/cat.mp3'       },
  { name: 'LEÃO',       displayName: 'Leão',       images: { cartoon: 'assets/images/cartoon/lion.svg',       realistic: 'assets/images/realistic/lion.jpg'      }, audio: 'assets/audio/lion.mp3'      },
  { name: 'LOBO',       displayName: 'Lobo',       images: { cartoon: 'assets/images/cartoon/wolf.svg',       realistic: 'assets/images/realistic/wolf.jpg'      }, audio: 'assets/audio/wolf.mp3'      },
  { name: 'PATO',       displayName: 'Pato',       images: { cartoon: 'assets/images/cartoon/duck.svg',       realistic: 'assets/images/realistic/duck.jpg'      }, audio: 'assets/audio/duck.mp3'      },
  { name: 'RATO',       displayName: 'Rato',       images: { cartoon: 'assets/images/cartoon/mouse.svg',      realistic: 'assets/images/realistic/mouse.jpg'     }, audio: 'assets/audio/mouse.mp3'     },
  { name: 'SAPO',       displayName: 'Sapo',       images: { cartoon: 'assets/images/cartoon/frog.svg',       realistic: 'assets/images/realistic/frog.jpg'      }, audio: 'assets/audio/frog.mp3'      },
  { name: 'URSO',       displayName: 'Urso',       images: { cartoon: 'assets/images/cartoon/bear.svg',       realistic: 'assets/images/realistic/bear.jpg'      }, audio: 'assets/audio/bear.mp3'      },
  { name: 'VACA',       displayName: 'Vaca',       images: { cartoon: 'assets/images/cartoon/cow.svg',        realistic: 'assets/images/realistic/cow.jpg'       }, audio: 'assets/audio/cow.mp3'       },

  // ── 5-letter names ──────────────────────────────────────────────────────────
  { name: 'ÁGUIA',      displayName: 'Águia',      images: { cartoon: 'assets/images/cartoon/eagle.svg',      realistic: 'assets/images/realistic/eagle.jpg'     }, audio: 'assets/audio/eagle.mp3'     },
  { name: 'BURRO',      displayName: 'Burro',      images: { cartoon: 'assets/images/cartoon/donkey.svg',     realistic: 'assets/images/realistic/donkey.jpg'    }, audio: 'assets/audio/donkey.mp3'    },
  { name: 'CABRA',      displayName: 'Cabra',      images: { cartoon: 'assets/images/cartoon/goat.svg',       realistic: 'assets/images/realistic/goat.jpg'      }, audio: 'assets/audio/goat.mp3'      },
  { name: 'CISNE',      displayName: 'Cisne',      images: { cartoon: 'assets/images/cartoon/swan.svg',       realistic: 'assets/images/realistic/swan.jpg'      }, audio: 'assets/audio/swan.mp3'      },
  { name: 'COALA',      displayName: 'Coala',      images: { cartoon: 'assets/images/cartoon/koala.svg',      realistic: 'assets/images/realistic/koala.jpg'     }, audio: 'assets/audio/koala.mp3'     },
  { name: 'COBRA',      displayName: 'Cobra',      images: { cartoon: 'assets/images/cartoon/snake.svg',      realistic: 'assets/images/realistic/snake.jpg'     }, audio: 'assets/audio/snake.mp3'     },
  { name: 'PANDA',      displayName: 'Panda',      images: { cartoon: 'assets/images/cartoon/panda.svg',      realistic: 'assets/images/realistic/panda.jpg'     }, audio: 'assets/audio/panda.mp3'     },
  { name: 'PEIXE',      displayName: 'Peixe',      images: { cartoon: 'assets/images/cartoon/fish.svg',       realistic: 'assets/images/realistic/fish.jpg'      }, audio: 'assets/audio/fish.mp3'      },
  { name: 'PORCO',      displayName: 'Porco',      images: { cartoon: 'assets/images/cartoon/pig.svg',        realistic: 'assets/images/realistic/pig.jpg'       }, audio: 'assets/audio/pig.mp3'       },
  { name: 'TIGRE',      displayName: 'Tigre',      images: { cartoon: 'assets/images/cartoon/tiger.svg',      realistic: 'assets/images/realistic/tiger.jpg'     }, audio: 'assets/audio/tiger.mp3'     },
  { name: 'TOURO',      displayName: 'Touro',      images: { cartoon: 'assets/images/cartoon/bull.svg',       realistic: 'assets/images/realistic/bull.jpg'      }, audio: 'assets/audio/bull.mp3'      },
  { name: 'VEADO',      displayName: 'Veado',      images: { cartoon: 'assets/images/cartoon/deer.svg',       realistic: 'assets/images/realistic/deer.jpg'      }, audio: 'assets/audio/deer.mp3'      },
  { name: 'ZEBRA',      displayName: 'Zebra',      images: { cartoon: 'assets/images/cartoon/zebra.svg',      realistic: 'assets/images/realistic/zebra.jpg'     }, audio: 'assets/audio/zebra.mp3'     },

  // ── 6-letter names ──────────────────────────────────────────────────────────
  { name: 'ABELHA',     displayName: 'Abelha',     images: { cartoon: 'assets/images/cartoon/bee.svg',        realistic: 'assets/images/realistic/bee.jpg'       }, audio: 'assets/audio/bee.mp3'       },
  { name: 'BALEIA',     displayName: 'Baleia',     images: { cartoon: 'assets/images/cartoon/whale.svg',      realistic: 'assets/images/realistic/whale.jpg'     }, audio: 'assets/audio/whale.mp3'     },
  { name: 'CAMELO',     displayName: 'Camelo',     images: { cartoon: 'assets/images/cartoon/camel.svg',      realistic: 'assets/images/realistic/camel.jpg'     }, audio: 'assets/audio/camel.mp3'     },
  { name: 'CAVALO',     displayName: 'Cavalo',     images: { cartoon: 'assets/images/cartoon/horse.svg',      realistic: 'assets/images/realistic/horse.jpg'     }, audio: 'assets/audio/horse.mp3'     },
  { name: 'COELHO',     displayName: 'Coelho',     images: { cartoon: 'assets/images/cartoon/rabbit.svg',     realistic: 'assets/images/realistic/rabbit.jpg'    }, audio: 'assets/audio/rabbit.mp3'    },
  { name: 'CORUJA',     displayName: 'Coruja',     images: { cartoon: 'assets/images/cartoon/owl.svg',        realistic: 'assets/images/realistic/owl.jpg'       }, audio: 'assets/audio/owl.mp3'       },
  { name: 'GIRAFA',     displayName: 'Girafa',     images: { cartoon: 'assets/images/cartoon/giraffe.svg',    realistic: 'assets/images/realistic/giraffe.jpg'   }, audio: 'assets/audio/giraffe.mp3'   },
  { name: 'GORILA',     displayName: 'Gorila',     images: { cartoon: 'assets/images/cartoon/gorilla.svg',    realistic: 'assets/images/realistic/gorilla.jpg'   }, audio: 'assets/audio/gorilla.mp3'   },
  { name: 'MACACO',     displayName: 'Macaco',     images: { cartoon: 'assets/images/cartoon/monkey.svg',     realistic: 'assets/images/realistic/monkey.jpg'    }, audio: 'assets/audio/monkey.mp3'    },
  { name: 'OURIÇO',     displayName: 'Ouriço',     images: { cartoon: 'assets/images/cartoon/hedgehog.svg',   realistic: 'assets/images/realistic/hedgehog.jpg'  }, audio: 'assets/audio/hedgehog.mp3'  },
  { name: 'RAPOSA',     displayName: 'Raposa',     images: { cartoon: 'assets/images/cartoon/fox.svg',        realistic: 'assets/images/realistic/fox.jpg'       }, audio: 'assets/audio/fox.mp3'       },

  // ── 7-letter names ──────────────────────────────────────────────────────────
  { name: 'CANGURU',    displayName: 'Canguru',    images: { cartoon: 'assets/images/cartoon/kangaroo.svg',   realistic: 'assets/images/realistic/kangaroo.jpg'  }, audio: 'assets/audio/kangaroo.mp3'  },
  { name: 'ESQUILO',    displayName: 'Esquilo',    images: { cartoon: 'assets/images/cartoon/squirrel.svg',   realistic: 'assets/images/realistic/squirrel.jpg'  }, audio: 'assets/audio/squirrel.mp3'  },
  { name: 'FORMIGA',    displayName: 'Formiga',    images: { cartoon: 'assets/images/cartoon/ant.svg',        realistic: 'assets/images/realistic/ant.jpg'       }, audio: 'assets/audio/ant.mp3'       },
  { name: 'GALINHA',    displayName: 'Galinha',    images: { cartoon: 'assets/images/cartoon/hen.svg',        realistic: 'assets/images/realistic/hen.jpg'       }, audio: 'assets/audio/hen.mp3'       },
  { name: 'LAGOSTA',    displayName: 'Lagosta',    images: { cartoon: 'assets/images/cartoon/lobster.svg',    realistic: 'assets/images/realistic/lobster.jpg'   }, audio: 'assets/audio/lobster.mp3'   },
  { name: 'PINGUIM',    displayName: 'Pinguim',    images: { cartoon: 'assets/images/cartoon/penguin.svg',    realistic: 'assets/images/realistic/penguin.jpg'   }, audio: 'assets/audio/penguin.mp3'   },
  { name: 'TUBARÃO',    displayName: 'Tubarão',    images: { cartoon: 'assets/images/cartoon/shark.svg',      realistic: 'assets/images/realistic/shark.jpg'     }, audio: 'assets/audio/shark.mp3'     },

  // ── 8-letter names ──────────────────────────────────────────────────────────
  { name: 'RATAZANA',   displayName: 'Ratazana',   images: { cartoon: 'assets/images/cartoon/rat.svg',        realistic: 'assets/images/realistic/rat.jpg'       }, audio: 'assets/audio/rat.mp3'       },
  { name: 'ELEFANTE',   displayName: 'Elefante',   images: { cartoon: 'assets/images/cartoon/elephant.svg',   realistic: 'assets/images/realistic/elephant.jpg'  }, audio: 'assets/audio/elephant.mp3'  },
  { name: 'FLAMINGO',   displayName: 'Flamingo',   images: { cartoon: 'assets/images/cartoon/flamingo.svg',   realistic: 'assets/images/realistic/flamingo.jpg'  }, audio: 'assets/audio/flamingo.mp3'  },
  { name: 'GOLFINHO',   displayName: 'Golfinho',   images: { cartoon: 'assets/images/cartoon/dolphin.svg',    realistic: 'assets/images/realistic/dolphin.jpg'   }, audio: 'assets/audio/dolphin.mp3'   },
  { name: 'PAPAGAIO',   displayName: 'Papagaio',   images: { cartoon: 'assets/images/cartoon/parrot.svg',     realistic: 'assets/images/realistic/parrot.jpg'    }, audio: 'assets/audio/parrot.mp3'    },

  // ── 9-letter names ──────────────────────────────────────────────────────────
  { name: 'CROCODILO',  displayName: 'Crocodilo',  images: { cartoon: 'assets/images/cartoon/crocodile.svg',  realistic: 'assets/images/realistic/crocodile.jpg' }, audio: 'assets/audio/crocodile.mp3' },
  { name: 'TARTARUGA',  displayName: 'Tartaruga',  images: { cartoon: 'assets/images/cartoon/turtle.svg',     realistic: 'assets/images/realistic/turtle.jpg'    }, audio: 'assets/audio/turtle.mp3'    },

  // ── 10-letter names ─────────────────────────────────────────────────────────
  { name: 'CARANGUEJO', displayName: 'Caranguejo', images: { cartoon: 'assets/images/cartoon/crab.svg',       realistic: 'assets/images/realistic/crab.jpg'      }, audio: 'assets/audio/crab.mp3'      },
  { name: 'HIPOPOTAMO', displayName: 'Hipopótamo', images: { cartoon: 'assets/images/cartoon/hippo.svg',      realistic: 'assets/images/realistic/hippo.jpg'     }, audio: 'assets/audio/hippo.mp3'     },
];

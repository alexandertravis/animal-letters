window.APP = window.APP || {};

// ── French animal list ────────────────────────────────────────────────────────
// All images and audio reuse the English asset set (same creature, different word).
// Tracing names use unaccented uppercase so no new stroke authoring is required.
// Accented characters (É, È, Ê, Â, etc.) can be added once strokes are authored.

APP.ANIMALS_FR = [
  // ── 3-letter names ──────────────────────────────────────────────────────────
  { name: 'ANE',         displayName: 'Âne',         images: { cartoon: 'assets/images/cartoon/donkey.svg',    realistic: 'assets/images/realistic/donkey.jpg'    }, audio: 'assets/audio/donkey.mp3'    },
  { name: 'RAT',         displayName: 'Rat',         images: { cartoon: 'assets/images/cartoon/rat.svg',       realistic: 'assets/images/realistic/rat.jpg'       }, audio: 'assets/audio/rat.mp3'       },

  // ── 4-letter names ──────────────────────────────────────────────────────────
  { name: 'CERF',        displayName: 'Cerf',        images: { cartoon: 'assets/images/cartoon/deer.svg',      realistic: 'assets/images/realistic/deer.jpg'      }, audio: 'assets/audio/deer.mp3'      },
  { name: 'CHAT',        displayName: 'Chat',        images: { cartoon: 'assets/images/cartoon/cat.svg',       realistic: 'assets/images/realistic/cat.jpg'       }, audio: 'assets/audio/cat.mp3'       },
  { name: 'ELAN',        displayName: 'Élan',        images: { cartoon: 'assets/images/cartoon/moose.svg',     realistic: 'assets/images/realistic/moose.jpg'     }, audio: 'assets/audio/moose.mp3'     },
  { name: 'LION',        displayName: 'Lion',        images: { cartoon: 'assets/images/cartoon/lion.svg',      realistic: 'assets/images/realistic/lion.jpg'      }, audio: 'assets/audio/lion.mp3'      },
  { name: 'LOUP',        displayName: 'Loup',        images: { cartoon: 'assets/images/cartoon/wolf.svg',      realistic: 'assets/images/realistic/wolf.jpg'      }, audio: 'assets/audio/wolf.mp3'      },
  { name: 'OURS',        displayName: 'Ours',        images: { cartoon: 'assets/images/cartoon/bear.svg',      realistic: 'assets/images/realistic/bear.jpg'      }, audio: 'assets/audio/bear.mp3'      },

  // ── 5-letter names ──────────────────────────────────────────────────────────
  { name: 'AIGLE',       displayName: 'Aigle',       images: { cartoon: 'assets/images/cartoon/eagle.svg',     realistic: 'assets/images/realistic/eagle.jpg'     }, audio: 'assets/audio/eagle.mp3'     },
  { name: 'CHIEN',       displayName: 'Chien',       images: { cartoon: 'assets/images/cartoon/dog.svg',       realistic: 'assets/images/realistic/dog.jpg'       }, audio: 'assets/audio/dog.mp3'       },
  { name: 'CRABE',       displayName: 'Crabe',       images: { cartoon: 'assets/images/cartoon/crab.svg',      realistic: 'assets/images/realistic/crab.jpg'      }, audio: 'assets/audio/crab.mp3'      },
  { name: 'CYGNE',       displayName: 'Cygne',       images: { cartoon: 'assets/images/cartoon/swan.svg',      realistic: 'assets/images/realistic/swan.jpg'      }, audio: 'assets/audio/swan.mp3'      },
  { name: 'HIBOU',       displayName: 'Hibou',       images: { cartoon: 'assets/images/cartoon/owl.svg',       realistic: 'assets/images/realistic/owl.jpg'       }, audio: 'assets/audio/owl.mp3'       },
  { name: 'KOALA',       displayName: 'Koala',       images: { cartoon: 'assets/images/cartoon/koala.svg',     realistic: 'assets/images/realistic/koala.jpg'     }, audio: 'assets/audio/koala.mp3'     },
  { name: 'LAPIN',       displayName: 'Lapin',       images: { cartoon: 'assets/images/cartoon/rabbit.svg',    realistic: 'assets/images/realistic/rabbit.jpg'    }, audio: 'assets/audio/rabbit.mp3'    },
  { name: 'PANDA',       displayName: 'Panda',       images: { cartoon: 'assets/images/cartoon/panda.svg',     realistic: 'assets/images/realistic/panda.jpg'     }, audio: 'assets/audio/panda.mp3'     },
  { name: 'POULE',       displayName: 'Poule',       images: { cartoon: 'assets/images/cartoon/hen.svg',       realistic: 'assets/images/realistic/hen.jpg'       }, audio: 'assets/audio/hen.mp3'       },
  { name: 'SINGE',       displayName: 'Singe',       images: { cartoon: 'assets/images/cartoon/monkey.svg',    realistic: 'assets/images/realistic/monkey.jpg'    }, audio: 'assets/audio/monkey.mp3'    },
  { name: 'TIGRE',       displayName: 'Tigre',       images: { cartoon: 'assets/images/cartoon/tiger.svg',     realistic: 'assets/images/realistic/tiger.jpg'     }, audio: 'assets/audio/tiger.mp3'     },
  { name: 'VACHE',       displayName: 'Vache',       images: { cartoon: 'assets/images/cartoon/cow.svg',       realistic: 'assets/images/realistic/cow.jpg'       }, audio: 'assets/audio/cow.mp3'       },
  { name: 'ZEBRE',       displayName: 'Zèbre',       images: { cartoon: 'assets/images/cartoon/zebra.svg',     realistic: 'assets/images/realistic/zebra.jpg'     }, audio: 'assets/audio/zebra.mp3'     },

  // ── 6-letter names ──────────────────────────────────────────────────────────
  { name: 'CANARD',      displayName: 'Canard',      images: { cartoon: 'assets/images/cartoon/duck.svg',      realistic: 'assets/images/realistic/duck.jpg'      }, audio: 'assets/audio/duck.mp3'      },
  { name: 'CHEVRE',      displayName: 'Chèvre',      images: { cartoon: 'assets/images/cartoon/goat.svg',      realistic: 'assets/images/realistic/goat.jpg'      }, audio: 'assets/audio/goat.mp3'      },
  { name: 'CHEVAL',      displayName: 'Cheval',      images: { cartoon: 'assets/images/cartoon/horse.svg',     realistic: 'assets/images/realistic/horse.jpg'     }, audio: 'assets/audio/horse.mp3'     },
  { name: 'COCHON',      displayName: 'Cochon',      images: { cartoon: 'assets/images/cartoon/pig.svg',       realistic: 'assets/images/realistic/pig.jpg'       }, audio: 'assets/audio/pig.mp3'       },
  { name: 'FOURMI',      displayName: 'Fourmi',      images: { cartoon: 'assets/images/cartoon/ant.svg',       realistic: 'assets/images/realistic/ant.jpg'       }, audio: 'assets/audio/ant.mp3'       },
  { name: 'GIRAFE',      displayName: 'Girafe',      images: { cartoon: 'assets/images/cartoon/giraffe.svg',   realistic: 'assets/images/realistic/giraffe.jpg'   }, audio: 'assets/audio/giraffe.mp3'   },
  { name: 'HOMARD',      displayName: 'Homard',      images: { cartoon: 'assets/images/cartoon/lobster.svg',   realistic: 'assets/images/realistic/lobster.jpg'   }, audio: 'assets/audio/lobster.mp3'   },
  { name: 'RENARD',      displayName: 'Renard',      images: { cartoon: 'assets/images/cartoon/fox.svg',       realistic: 'assets/images/realistic/fox.jpg'       }, audio: 'assets/audio/fox.mp3'       },
  { name: 'REQUIN',      displayName: 'Requin',      images: { cartoon: 'assets/images/cartoon/shark.svg',     realistic: 'assets/images/realistic/shark.jpg'     }, audio: 'assets/audio/shark.mp3'     },
  { name: 'SOURIS',      displayName: 'Souris',      images: { cartoon: 'assets/images/cartoon/mouse.svg',     realistic: 'assets/images/realistic/mouse.jpg'     }, audio: 'assets/audio/mouse.mp3'     },
  { name: 'TORTUE',      displayName: 'Tortue',      images: { cartoon: 'assets/images/cartoon/turtle.svg',    realistic: 'assets/images/realistic/turtle.jpg'    }, audio: 'assets/audio/turtle.mp3'    },

  // ── 7-letter names ──────────────────────────────────────────────────────────
  { name: 'ABEILLE',     displayName: 'Abeille',     images: { cartoon: 'assets/images/cartoon/bee.svg',       realistic: 'assets/images/realistic/bee.jpg'       }, audio: 'assets/audio/bee.mp3'       },
  { name: 'BALEINE',     displayName: 'Baleine',     images: { cartoon: 'assets/images/cartoon/whale.svg',     realistic: 'assets/images/realistic/whale.jpg'     }, audio: 'assets/audio/whale.mp3'     },
  { name: 'CHAMEAU',     displayName: 'Chameau',     images: { cartoon: 'assets/images/cartoon/camel.svg',     realistic: 'assets/images/realistic/camel.jpg'     }, audio: 'assets/audio/camel.mp3'     },
  { name: 'DAUPHIN',     displayName: 'Dauphin',     images: { cartoon: 'assets/images/cartoon/dolphin.svg',   realistic: 'assets/images/realistic/dolphin.jpg'   }, audio: 'assets/audio/dolphin.mp3'   },
  { name: 'FLAMANT',     displayName: 'Flamant',     images: { cartoon: 'assets/images/cartoon/flamingo.svg',  realistic: 'assets/images/realistic/flamingo.jpg'  }, audio: 'assets/audio/flamingo.mp3'  },
  { name: 'GORILLE',     displayName: 'Gorille',     images: { cartoon: 'assets/images/cartoon/gorilla.svg',   realistic: 'assets/images/realistic/gorilla.jpg'   }, audio: 'assets/audio/gorilla.mp3'   },
  { name: 'POISSON',     displayName: 'Poisson',     images: { cartoon: 'assets/images/cartoon/fish.svg',      realistic: 'assets/images/realistic/fish.jpg'      }, audio: 'assets/audio/fish.mp3'      },
  { name: 'SERPENT',     displayName: 'Serpent',     images: { cartoon: 'assets/images/cartoon/snake.svg',     realistic: 'assets/images/realistic/snake.jpg'     }, audio: 'assets/audio/snake.mp3'     },
  { name: 'TAUREAU',     displayName: 'Taureau',     images: { cartoon: 'assets/images/cartoon/bull.svg',      realistic: 'assets/images/realistic/bull.jpg'      }, audio: 'assets/audio/bull.mp3'      },

  // ── 8-letter names ──────────────────────────────────────────────────────────
  { name: 'ECUREUIL',    displayName: 'Écureuil',    images: { cartoon: 'assets/images/cartoon/squirrel.svg',  realistic: 'assets/images/realistic/squirrel.jpg'  }, audio: 'assets/audio/squirrel.mp3'  },
  { name: 'ELEPHANT',    displayName: 'Éléphant',    images: { cartoon: 'assets/images/cartoon/elephant.svg',  realistic: 'assets/images/realistic/elephant.jpg'  }, audio: 'assets/audio/elephant.mp3'  },
  { name: 'HERISSON',    displayName: 'Hérisson',    images: { cartoon: 'assets/images/cartoon/hedgehog.svg',  realistic: 'assets/images/realistic/hedgehog.jpg'  }, audio: 'assets/audio/hedgehog.mp3'  },
  { name: 'PINGOUIN',    displayName: 'Pingouin',    images: { cartoon: 'assets/images/cartoon/penguin.svg',   realistic: 'assets/images/realistic/penguin.jpg'   }, audio: 'assets/audio/penguin.mp3'   },

  // ── 9-letter names ──────────────────────────────────────────────────────────
  { name: 'CROCODILE',   displayName: 'Crocodile',   images: { cartoon: 'assets/images/cartoon/crocodile.svg', realistic: 'assets/images/realistic/crocodile.jpg' }, audio: 'assets/audio/crocodile.mp3' },
  { name: 'KANGOUROU',   displayName: 'Kangourou',   images: { cartoon: 'assets/images/cartoon/kangaroo.svg',  realistic: 'assets/images/realistic/kangaroo.jpg'  }, audio: 'assets/audio/kangaroo.mp3'  },
  { name: 'PERROQUET',   displayName: 'Perroquet',   images: { cartoon: 'assets/images/cartoon/parrot.svg',    realistic: 'assets/images/realistic/parrot.jpg'    }, audio: 'assets/audio/parrot.mp3'    },

  // ── 10-letter names ─────────────────────────────────────────────────────────
  { name: 'GRENOUILLE',  displayName: 'Grenouille',  images: { cartoon: 'assets/images/cartoon/frog.svg',      realistic: 'assets/images/realistic/frog.jpg'      }, audio: 'assets/audio/frog.mp3'      },

  // ── 11-letter names ─────────────────────────────────────────────────────────
  { name: 'HIPPOPOTAME', displayName: 'Hippopotame', images: { cartoon: 'assets/images/cartoon/hippo.svg',     realistic: 'assets/images/realistic/hippo.jpg'     }, audio: 'assets/audio/hippo.mp3'     },
];

// Edit this file to add or change animals.
// Each entry needs:
//   name         - the word the child traces (uppercase; case is toggled at render time)
//   displayName  - shown on the complete screen
//   images       - cartoon and realistic image paths (either may 404; loader falls back gracefully)
//   audio        - mp3/ogg/wav path (optional; loader skips silently if missing)
window.APP = window.APP || {};
window.APP.ANIMALS = [
  // ── 3-letter animals ──────────────────────────────────────────────────────
  { name: "ANT",       displayName: "Ant",       images: { cartoon: "assets/images/cartoon/ant.svg",       realistic: "assets/images/realistic/ant.jpg"       }, audio: "assets/audio/ant.mp3"       },
  { name: "BEE",       displayName: "Bee",       images: { cartoon: "assets/images/cartoon/bee.svg",       realistic: "assets/images/realistic/bee.jpg"       }, audio: "assets/audio/bee.mp3"       },
  { name: "CAT",       displayName: "Cat",       images: { cartoon: "assets/images/cartoon/cat.svg",       realistic: "assets/images/realistic/cat.jpg"       }, audio: "assets/audio/cat.mp3"       },
  { name: "COW",       displayName: "Cow",       images: { cartoon: "assets/images/cartoon/cow.svg",       realistic: "assets/images/realistic/cow.jpg"       }, audio: "assets/audio/cow.mp3"       },
  { name: "DOG",       displayName: "Dog",       images: { cartoon: "assets/images/cartoon/dog.svg",       realistic: "assets/images/realistic/dog.jpg"       }, audio: "assets/audio/dog.mp3"       },
  { name: "FOX",       displayName: "Fox",       images: { cartoon: "assets/images/cartoon/fox.svg",       realistic: "assets/images/realistic/fox.jpg"       }, audio: "assets/audio/fox.mp3"       },
  { name: "HEN",       displayName: "Hen",       images: { cartoon: "assets/images/cartoon/hen.svg",       realistic: "assets/images/realistic/hen.jpg"       }, audio: "assets/audio/hen.mp3"       },
  { name: "OWL",       displayName: "Owl",       images: { cartoon: "assets/images/cartoon/owl.svg",       realistic: "assets/images/realistic/owl.jpg"       }, audio: "assets/audio/owl.mp3"       },
  { name: "PIG",       displayName: "Pig",       images: { cartoon: "assets/images/cartoon/pig.svg",       realistic: "assets/images/realistic/pig.jpg"       }, audio: "assets/audio/pig.mp3"       },
  { name: "RAT",       displayName: "Rat",       images: { cartoon: "assets/images/cartoon/rat.svg",       realistic: "assets/images/realistic/rat.jpg"       }, audio: "assets/audio/rat.mp3"       },

  // ── 4-letter animals ──────────────────────────────────────────────────────
  { name: "BEAR",      displayName: "Bear",      images: { cartoon: "assets/images/cartoon/bear.svg",      realistic: "assets/images/realistic/bear.jpg"      }, audio: "assets/audio/bear.mp3"      },
  { name: "BULL",      displayName: "Bull",      images: { cartoon: "assets/images/cartoon/bull.svg",      realistic: "assets/images/realistic/bull.jpg"      }, audio: "assets/audio/bull.mp3"      },
  { name: "CRAB",      displayName: "Crab",      images: { cartoon: "assets/images/cartoon/crab.svg",      realistic: "assets/images/realistic/crab.jpg"      }, audio: "assets/audio/crab.mp3"      },
  { name: "DEER",      displayName: "Deer",      images: { cartoon: "assets/images/cartoon/deer.svg",      realistic: "assets/images/realistic/deer.jpg"      }, audio: "assets/audio/deer.mp3"      },
  { name: "DUCK",      displayName: "Duck",      images: { cartoon: "assets/images/cartoon/duck.svg",      realistic: "assets/images/realistic/duck.jpg"      }, audio: "assets/audio/duck.mp3"      },
  { name: "FISH",      displayName: "Fish",      images: { cartoon: "assets/images/cartoon/fish.svg",      realistic: "assets/images/realistic/fish.jpg"      }, audio: "assets/audio/fish.mp3"      },
  { name: "FROG",      displayName: "Frog",      images: { cartoon: "assets/images/cartoon/frog.svg",      realistic: "assets/images/realistic/frog.jpg"      }, audio: "assets/audio/frog.mp3"      },
  { name: "GOAT",      displayName: "Goat",      images: { cartoon: "assets/images/cartoon/goat.svg",      realistic: "assets/images/realistic/goat.jpg"      }, audio: "assets/audio/goat.mp3"      },
  { name: "LION",      displayName: "Lion",      images: { cartoon: "assets/images/cartoon/lion.svg",      realistic: "assets/images/realistic/lion.jpg"      }, audio: "assets/audio/lion.mp3"      },
  { name: "SWAN",      displayName: "Swan",      images: { cartoon: "assets/images/cartoon/swan.svg",      realistic: "assets/images/realistic/swan.jpg"      }, audio: "assets/audio/swan.mp3"      },
  { name: "WOLF",      displayName: "Wolf",      images: { cartoon: "assets/images/cartoon/wolf.svg",      realistic: "assets/images/realistic/wolf.jpg"      }, audio: "assets/audio/wolf.mp3"      },

  // ── 5-letter animals ──────────────────────────────────────────────────────
  { name: "CAMEL",     displayName: "Camel",     images: { cartoon: "assets/images/cartoon/camel.svg",     realistic: "assets/images/realistic/camel.jpg"     }, audio: "assets/audio/camel.mp3"     },
  { name: "EAGLE",     displayName: "Eagle",     images: { cartoon: "assets/images/cartoon/eagle.svg",     realistic: "assets/images/realistic/eagle.jpg"     }, audio: "assets/audio/eagle.mp3"     },
  { name: "HIPPO",     displayName: "Hippo",     images: { cartoon: "assets/images/cartoon/hippo.svg",     realistic: "assets/images/realistic/hippo.jpg"     }, audio: "assets/audio/hippo.mp3"     },
  { name: "HORSE",     displayName: "Horse",     images: { cartoon: "assets/images/cartoon/horse.svg",     realistic: "assets/images/realistic/horse.jpg"     }, audio: "assets/audio/horse.mp3"     },
  { name: "KOALA",     displayName: "Koala",     images: { cartoon: "assets/images/cartoon/koala.svg",     realistic: "assets/images/realistic/koala.jpg"     }, audio: "assets/audio/koala.mp3"     },
  { name: "MOOSE",     displayName: "Moose",     images: { cartoon: "assets/images/cartoon/moose.svg",     realistic: "assets/images/realistic/moose.jpg"     }, audio: "assets/audio/moose.mp3"     },
  { name: "MOUSE",     displayName: "Mouse",     images: { cartoon: "assets/images/cartoon/mouse.svg",     realistic: "assets/images/realistic/mouse.jpg"     }, audio: "assets/audio/mouse.mp3"     },
  { name: "PANDA",     displayName: "Panda",     images: { cartoon: "assets/images/cartoon/panda.svg",     realistic: "assets/images/realistic/panda.jpg"     }, audio: "assets/audio/panda.mp3"     },
  { name: "SHARK",     displayName: "Shark",     images: { cartoon: "assets/images/cartoon/shark.svg",     realistic: "assets/images/realistic/shark.jpg"     }, audio: "assets/audio/shark.mp3"     },
  { name: "SNAKE",     displayName: "Snake",     images: { cartoon: "assets/images/cartoon/snake.svg",     realistic: "assets/images/realistic/snake.jpg"     }, audio: "assets/audio/snake.mp3"     },
  { name: "TIGER",     displayName: "Tiger",     images: { cartoon: "assets/images/cartoon/tiger.svg",     realistic: "assets/images/realistic/tiger.jpg"     }, audio: "assets/audio/tiger.mp3"     },
  { name: "WHALE",     displayName: "Whale",     images: { cartoon: "assets/images/cartoon/whale.svg",     realistic: "assets/images/realistic/whale.jpg"     }, audio: "assets/audio/whale.mp3"     },
  { name: "ZEBRA",     displayName: "Zebra",     images: { cartoon: "assets/images/cartoon/zebra.svg",     realistic: "assets/images/realistic/zebra.jpg"     }, audio: "assets/audio/zebra.mp3"     },

  // ── 6-letter animals ──────────────────────────────────────────────────────
  { name: "DONKEY",    displayName: "Donkey",    images: { cartoon: "assets/images/cartoon/donkey.svg",    realistic: "assets/images/realistic/donkey.jpg"    }, audio: "assets/audio/donkey.mp3"    },
  { name: "MONKEY",    displayName: "Monkey",    images: { cartoon: "assets/images/cartoon/monkey.svg",    realistic: "assets/images/realistic/monkey.jpg"    }, audio: "assets/audio/monkey.mp3"    },
  { name: "PARROT",    displayName: "Parrot",    images: { cartoon: "assets/images/cartoon/parrot.svg",    realistic: "assets/images/realistic/parrot.jpg"    }, audio: "assets/audio/parrot.mp3"    },
  { name: "RABBIT",    displayName: "Rabbit",    images: { cartoon: "assets/images/cartoon/rabbit.svg",    realistic: "assets/images/realistic/rabbit.jpg"    }, audio: "assets/audio/rabbit.mp3"    },
  { name: "TURTLE",    displayName: "Turtle",    images: { cartoon: "assets/images/cartoon/turtle.svg",    realistic: "assets/images/realistic/turtle.jpg"    }, audio: "assets/audio/turtle.mp3"    },

  // ── 7-letter animals ──────────────────────────────────────────────────────
  { name: "DOLPHIN",   displayName: "Dolphin",   images: { cartoon: "assets/images/cartoon/dolphin.svg",   realistic: "assets/images/realistic/dolphin.jpg"   }, audio: "assets/audio/dolphin.mp3"   },
  { name: "GIRAFFE",   displayName: "Giraffe",   images: { cartoon: "assets/images/cartoon/giraffe.svg",   realistic: "assets/images/realistic/giraffe.jpg"   }, audio: "assets/audio/giraffe.mp3"   },
  { name: "GORILLA",   displayName: "Gorilla",   images: { cartoon: "assets/images/cartoon/gorilla.svg",   realistic: "assets/images/realistic/gorilla.jpg"   }, audio: "assets/audio/gorilla.mp3"   },
  { name: "LOBSTER",   displayName: "Lobster",   images: { cartoon: "assets/images/cartoon/lobster.svg",   realistic: "assets/images/realistic/lobster.jpg"   }, audio: "assets/audio/lobster.mp3"   },
  { name: "PENGUIN",   displayName: "Penguin",   images: { cartoon: "assets/images/cartoon/penguin.svg",   realistic: "assets/images/realistic/penguin.jpg"   }, audio: "assets/audio/penguin.mp3"   },

  // ── 8-letter animals ──────────────────────────────────────────────────────
  { name: "ELEPHANT",  displayName: "Elephant",  images: { cartoon: "assets/images/cartoon/elephant.svg",  realistic: "assets/images/realistic/elephant.jpg"  }, audio: "assets/audio/elephant.mp3"  },
  { name: "FLAMINGO",  displayName: "Flamingo",  images: { cartoon: "assets/images/cartoon/flamingo.svg",  realistic: "assets/images/realistic/flamingo.jpg"  }, audio: "assets/audio/flamingo.mp3"  },
  { name: "HEDGEHOG",  displayName: "Hedgehog",  images: { cartoon: "assets/images/cartoon/hedgehog.svg",  realistic: "assets/images/realistic/hedgehog.jpg"  }, audio: "assets/audio/hedgehog.mp3"  },
  { name: "KANGAROO",  displayName: "Kangaroo",  images: { cartoon: "assets/images/cartoon/kangaroo.svg",  realistic: "assets/images/realistic/kangaroo.jpg"  }, audio: "assets/audio/kangaroo.mp3"  },
  { name: "SQUIRREL",  displayName: "Squirrel",  images: { cartoon: "assets/images/cartoon/squirrel.svg",  realistic: "assets/images/realistic/squirrel.jpg"  }, audio: "assets/audio/squirrel.mp3"  },

  // ── 9-letter animals ──────────────────────────────────────────────────────
  { name: "CROCODILE", displayName: "Crocodile", images: { cartoon: "assets/images/cartoon/crocodile.svg", realistic: "assets/images/realistic/crocodile.jpg" }, audio: "assets/audio/crocodile.mp3" },
];

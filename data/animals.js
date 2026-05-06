// Edit this file to add or change animals.
// Each entry needs:
//   name         - the word the child traces (uppercase; case is toggled at render time)
//   displayName  - shown on the complete screen
//   images       - cartoon and realistic image paths (either may 404; loader falls back gracefully)
//   audio        - mp3/ogg/wav path (optional; loader skips silently if missing)
window.APP = window.APP || {};
window.APP.ANIMALS = [
  // ── 3-letter animals ──────────────────────────────────────────────────────
  {
    name: "ANT", displayName: "Ant",
    images: { cartoon: "assets/images/cartoon/ant.svg", realistic: "assets/images/realistic/ant.jpg" },
    audio: "assets/audio/ant.mp3"
  },
  {
    name: "BEE", displayName: "Bee",
    images: { cartoon: "assets/images/cartoon/bee.svg", realistic: "assets/images/realistic/bee.jpg" },
    audio: "assets/audio/bee.mp3"
  },
  {
    name: "CAT", displayName: "Cat",
    images: { cartoon: "assets/images/cartoon/cat.svg", realistic: "assets/images/realistic/cat.jpg" },
    audio: "assets/audio/cat.mp3"
  },
  {
    name: "COW", displayName: "Cow",
    images: { cartoon: "assets/images/cartoon/cow.svg", realistic: "assets/images/realistic/cow.jpg" },
    audio: "assets/audio/cow.mp3"
  },
  {
    name: "DOG", displayName: "Dog",
    images: { cartoon: "assets/images/cartoon/dog.svg", realistic: "assets/images/realistic/dog.jpg" },
    audio: "assets/audio/dog.mp3"
  },
  {
    name: "FOX", displayName: "Fox",
    images: { cartoon: "assets/images/cartoon/fox.svg", realistic: "assets/images/realistic/fox.jpg" },
    audio: "assets/audio/fox.mp3"
  },
  {
    name: "HEN", displayName: "Hen",
    images: { cartoon: "assets/images/cartoon/hen.svg", realistic: "assets/images/realistic/hen.jpg" },
    audio: "assets/audio/hen.mp3"
  },
  {
    name: "OWL", displayName: "Owl",
    images: { cartoon: "assets/images/cartoon/owl.svg", realistic: "assets/images/realistic/owl.jpg" },
    audio: "assets/audio/owl.mp3"
  },
  {
    name: "PIG", displayName: "Pig",
    images: { cartoon: "assets/images/cartoon/pig.svg", realistic: "assets/images/realistic/pig.jpg" },
    audio: "assets/audio/pig.mp3"
  },

  // ── 4-letter animals ──────────────────────────────────────────────────────
  {
    name: "BEAR", displayName: "Bear",
    images: { cartoon: "assets/images/cartoon/bear.svg", realistic: "assets/images/realistic/bear.jpg" },
    audio: "assets/audio/bear.mp3"
  },
  {
    name: "CRAB", displayName: "Crab",
    images: { cartoon: "assets/images/cartoon/crab.svg", realistic: "assets/images/realistic/crab.jpg" },
    audio: "assets/audio/crab.mp3"
  },
  {
    name: "DEER", displayName: "Deer",
    images: { cartoon: "assets/images/cartoon/deer.svg", realistic: "assets/images/realistic/deer.jpg" },
    audio: "assets/audio/deer.mp3"
  },
  {
    name: "DUCK", displayName: "Duck",
    images: { cartoon: "assets/images/cartoon/duck.svg", realistic: "assets/images/realistic/duck.jpg" },
    audio: "assets/audio/duck.mp3"
  },
  {
    name: "FROG", displayName: "Frog",
    images: { cartoon: "assets/images/cartoon/frog.svg", realistic: "assets/images/realistic/frog.jpg" },
    audio: "assets/audio/frog.mp3"
  },
  {
    name: "LION", displayName: "Lion",
    images: { cartoon: "assets/images/cartoon/lion.svg", realistic: "assets/images/realistic/lion.jpg" },
    audio: "assets/audio/lion.mp3"
  },
  {
    name: "WOLF", displayName: "Wolf",
    images: { cartoon: "assets/images/cartoon/wolf.svg", realistic: "assets/images/realistic/wolf.jpg" },
    audio: "assets/audio/wolf.mp3"
  },

  // ── 5-letter animals ──────────────────────────────────────────────────────
  {
    name: "EAGLE", displayName: "Eagle",
    images: { cartoon: "assets/images/cartoon/eagle.svg", realistic: "assets/images/realistic/eagle.jpg" },
    audio: "assets/audio/eagle.mp3"
  },
  {
    name: "HORSE", displayName: "Horse",
    images: { cartoon: "assets/images/cartoon/horse.svg", realistic: "assets/images/realistic/horse.jpg" },
    audio: "assets/audio/horse.mp3"
  },
  {
    name: "MOUSE", displayName: "Mouse",
    images: { cartoon: "assets/images/cartoon/mouse.svg", realistic: "assets/images/realistic/mouse.jpg" },
    audio: "assets/audio/mouse.mp3"
  },
  {
    name: "PANDA", displayName: "Panda",
    images: { cartoon: "assets/images/cartoon/panda.svg", realistic: "assets/images/realistic/panda.jpg" },
    audio: "assets/audio/panda.mp3"
  },
  {
    name: "SHARK", displayName: "Shark",
    images: { cartoon: "assets/images/cartoon/shark.svg", realistic: "assets/images/realistic/shark.jpg" },
    audio: "assets/audio/shark.mp3"
  },
  {
    name: "TIGER", displayName: "Tiger",
    images: { cartoon: "assets/images/cartoon/tiger.svg", realistic: "assets/images/realistic/tiger.jpg" },
    audio: "assets/audio/tiger.mp3"
  },
  {
    name: "ZEBRA", displayName: "Zebra",
    images: { cartoon: "assets/images/cartoon/zebra.svg", realistic: "assets/images/realistic/zebra.jpg" },
    audio: "assets/audio/zebra.mp3"
  },

  // ── 6-letter animals ──────────────────────────────────────────────────────
  {
    name: "PARROT", displayName: "Parrot",
    images: { cartoon: "assets/images/cartoon/parrot.svg", realistic: "assets/images/realistic/parrot.jpg" },
    audio: "assets/audio/parrot.mp3"
  },
  {
    name: "RABBIT", displayName: "Rabbit",
    images: { cartoon: "assets/images/cartoon/rabbit.svg", realistic: "assets/images/realistic/rabbit.jpg" },
    audio: "assets/audio/rabbit.mp3"
  }
];

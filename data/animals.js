// Edit this file to add or change animals.
// Each entry needs:
//   name         - the word the child traces (uppercase by convention; case is toggled at render time)
//   displayName  - shown on the complete screen
//   images       - cartoon and realistic image paths (either may 404; loader falls back gracefully)
//   audio        - mp3/ogg/wav path (optional; loader skips silently if missing)
window.APP = window.APP || {};
window.APP.ANIMALS = [
  {
    name: "CAT",
    displayName: "Cat",
    images: {
      cartoon: "assets/images/cartoon/cat.svg",
      realistic: "assets/images/realistic/cat.jpg"
    },
    audio: "assets/audio/cat.mp3"
  },
  {
    name: "DOG",
    displayName: "Dog",
    images: {
      cartoon: "assets/images/cartoon/dog.svg",
      realistic: "assets/images/realistic/dog.jpg"
    },
    audio: "assets/audio/dog.mp3"
  },
  {
    name: "OWL",
    displayName: "Owl",
    images: {
      cartoon: "assets/images/cartoon/owl.svg",
      realistic: "assets/images/realistic/owl.jpg"
    },
    audio: "assets/audio/owl.mp3"
  }
];

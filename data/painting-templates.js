window.APP = window.APP || {};

// Image-based coloring pages — all served as WebP.
// Requirements: white/light background with bold dark outlines.
// Note: image templates require HTTP/HTTPS (Vercel) — getImageData is
// blocked by the browser's CORS policy on file:// origins.

APP.PAINTING_TEMPLATES = [
  {
    id: 'unicorn',
    label: 'Unicorn',
    type: 'image',
    src: 'assets/images/coloring/unicorn.webp',
    regions: [],
  },

  {
    id: 'dinosaurs',
    label: 'Dinosaurs',
    type: 'image',
    src: 'assets/images/coloring/dinosaurs.webp',
    regions: [],
  },

  {
    id: 'animals',
    label: 'Animals',
    type: 'image',
    src: 'assets/images/coloring/animals.webp',
    regions: [],
  },

  {
    id: 'space-rabbit',
    label: 'Space Rabbit',
    type: 'image',
    src: 'assets/images/coloring/space-rabbit.webp',
    regions: [],
  },

  {
    id: 'kawaii-food',
    label: 'Kawaii Food',
    type: 'image',
    src: 'assets/images/coloring/food.webp',
    regions: [],
  },

  {
    id: 'mushrooms',
    label: 'Mushrooms',
    type: 'image',
    src: 'assets/images/coloring/mushrooms.webp',
    regions: [],
  },
];

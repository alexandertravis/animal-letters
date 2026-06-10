window.APP = window.APP || {};

// Built-in connect-the-dots puzzles.
// Each puzzle has a 200×200 SVG viewBox coordinate space.
// Dots are listed in connection order (dot 1 → 2 → 3 → ...).
// closed:true means the last dot connects back to the first.
// image: null for shape-only puzzles; data-URL for image-backed puzzles.
APP.DOT_PUZZLES = [
  {
    id: 'star',
    name: 'Star',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 12  },
      { x: 121, y: 72  },
      { x: 184, y: 73  },
      { x: 133, y: 111 },
      { x: 152, y: 171 },
      { x: 100, y: 135 },
      { x: 48,  y: 171 },
      { x: 67,  y: 111 },
      { x: 16,  y: 73  },
      { x: 79,  y: 72  },
    ]
  },
  {
    id: 'heart',
    name: 'Heart',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 58  },
      { x: 128, y: 28  },
      { x: 162, y: 42  },
      { x: 168, y: 80  },
      { x: 148, y: 122 },
      { x: 100, y: 163 },
      { x: 52,  y: 122 },
      { x: 32,  y: 80  },
      { x: 38,  y: 42  },
      { x: 72,  y: 28  },
    ]
  },
  {
    id: 'house',
    name: 'House',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 18  },
      { x: 172, y: 90  },
      { x: 172, y: 180 },
      { x: 28,  y: 180 },
      { x: 28,  y: 90  },
    ]
  },
  {
    id: 'fish',
    name: 'Fish',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 35,  y: 100 },
      { x: 25,  y: 70  },
      { x: 65,  y: 58  },
      { x: 115, y: 48  },
      { x: 160, y: 75  },
      { x: 178, y: 100 },
      { x: 160, y: 125 },
      { x: 115, y: 152 },
      { x: 65,  y: 142 },
      { x: 25,  y: 130 },
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 15  },
      { x: 140, y: 55  },
      { x: 170, y: 100 },
      { x: 140, y: 145 },
      { x: 100, y: 185 },
      { x: 60,  y: 145 },
      { x: 30,  y: 100 },
      { x: 60,  y: 55  },
    ]
  },
  {
    id: 'rocket',
    name: 'Rocket',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 12  },
      { x: 125, y: 68  },
      { x: 128, y: 120 },
      { x: 148, y: 148 },
      { x: 128, y: 140 },
      { x: 115, y: 170 },
      { x: 85,  y: 170 },
      { x: 72,  y: 140 },
      { x: 52,  y: 148 },
      { x: 72,  y: 120 },
      { x: 75,  y: 68  },
    ]
  },
  {
    id: 'crown',
    name: 'Crown',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 20,  y: 175 },
      { x: 55,  y: 70  },
      { x: 85,  y: 115 },
      { x: 100, y: 40  },
      { x: 115, y: 115 },
      { x: 145, y: 70  },
      { x: 180, y: 175 },
    ]
  },
  {
    id: 'tree',
    name: 'Tree',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 100, y: 15  },
      { x: 160, y: 130 },
      { x: 125, y: 130 },
      { x: 125, y: 188 },
      { x: 75,  y: 188 },
      { x: 75,  y: 130 },
      { x: 40,  y: 130 },
    ]
  },
  {
    id: 'arrow',
    name: 'Arrow',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 188, y: 100 },
      { x: 120, y: 30  },
      { x: 120, y: 72  },
      { x: 12,  y: 72  },
      { x: 12,  y: 128 },
      { x: 120, y: 128 },
      { x: 120, y: 170 },
    ]
  },
  {
    id: 'moon',
    name: 'Moon',
    viewBox: '0 0 200 200',
    closed: true,
    image: null,
    dots: [
      { x: 115, y: 20  },
      { x: 170, y: 50  },
      { x: 185, y: 100 },
      { x: 170, y: 150 },
      { x: 115, y: 180 },
      { x: 100, y: 155 },
      { x: 90,  y: 100 },
      { x: 100, y: 45  },
    ]
  },
];

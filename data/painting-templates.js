window.APP = window.APP || {};

// To add an image-based coloring page:
// 1. Put the PNG in assets/images/coloring/ (white/transparent bg + dark bold outlines)
// 2. Add an entry: { id, label, type: 'image', src: 'assets/images/coloring/filename.png', regions: [] }
// Note: image templates require HTTP/HTTPS (Vercel) — they won't work from file://

APP.PAINTING_TEMPLATES = [
  {
    id: 'star',
    label: 'Star',
    lineWidth: 6,
    outline: [
      'M 200,40 L 238,147 L 352,151 L 262,220 L 294,329 L 200,265 L 106,329 L 138,220 L 48,151 L 162,147 Z',
    ],
    regions: [
      { number: 1, label: 'yellow', targetColor: '#f6e58d',
        d: 'M 200,40 L 238,147 L 352,151 L 262,220 L 294,329 L 200,265 L 106,329 L 138,220 L 48,151 L 162,147 Z' },
    ],
  },

  {
    id: 'flower',
    label: 'Flower',
    lineWidth: 6,
    outline: [
      // top petal
      'M 200,170 C 180,130 155,80 200,60 C 245,80 220,130 200,170 Z',
      // right petal
      'M 230,200 C 270,180 320,155 340,200 C 320,245 270,220 230,200 Z',
      // bottom petal
      'M 200,230 C 220,270 245,320 200,340 C 155,320 180,270 200,230 Z',
      // left petal
      'M 170,200 C 130,220 80,245 60,200 C 80,155 130,180 170,200 Z',
      // centre
      'M 230,200 A 30,30 0 0 1 170,200 A 30,30 0 0 1 230,200 Z',
    ],
    regions: [
      { number: 1, label: 'pink', targetColor: '#e84393',
        d: 'M 200,170 C 180,130 155,80 200,60 C 245,80 220,130 200,170 Z M 230,200 C 270,180 320,155 340,200 C 320,245 270,220 230,200 Z M 200,230 C 220,270 245,320 200,340 C 155,320 180,270 200,230 Z M 170,200 C 130,220 80,245 60,200 C 80,155 130,180 170,200 Z' },
      { number: 2, label: 'yellow', targetColor: '#f6e58d',
        d: 'M 230,200 A 30,30 0 0 1 170,200 A 30,30 0 0 1 230,200 Z' },
    ],
  },

  {
    id: 'sun',
    label: 'Sun',
    lineWidth: 6,
    outline: [
      // body
      'M 275,200 A 75,75 0 0 1 125,200 A 75,75 0 0 1 275,200 Z',
      // rays — 8 triangles at 45° intervals
      'M 200,110 L 190,125 L 210,125 Z',
      'M 253,147 L 238,147 L 243,162 Z',
      'M 290,200 L 275,190 L 275,210 Z',
      'M 253,253 L 243,238 L 238,253 Z',
      'M 200,290 L 210,275 L 190,275 Z',
      'M 147,253 L 162,253 L 157,238 Z',
      'M 110,200 L 125,210 L 125,190 Z',
      'M 147,147 L 157,162 L 162,147 Z',
    ],
    regions: [
      { number: 1, label: 'yellow', targetColor: '#f6e58d',
        d: 'M 275,200 A 75,75 0 0 1 125,200 A 75,75 0 0 1 275,200 Z' },
      { number: 2, label: 'orange', targetColor: '#f39c12',
        d: 'M 200,110 L 190,125 L 210,125 Z M 253,147 L 238,147 L 243,162 Z M 290,200 L 275,190 L 275,210 Z M 253,253 L 243,238 L 238,253 Z M 200,290 L 210,275 L 190,275 Z M 147,253 L 162,253 L 157,238 Z M 110,200 L 125,210 L 125,190 Z M 147,147 L 157,162 L 162,147 Z' },
    ],
  },

  {
    id: 'house',
    label: 'House',
    lineWidth: 6,
    outline: [
      // walls
      'M 80,220 L 80,340 L 320,340 L 320,220 Z',
      // roof
      'M 60,225 L 200,80 L 340,225 Z',
      // chimney
      'M 260,120 L 260,165 L 285,165 L 285,105 Z',
      // door
      'M 165,340 L 165,270 L 235,270 L 235,340 Z',
      // left window + cross
      'M 100,240 L 100,300 L 155,300 L 155,240 Z M 127,240 L 127,300 M 100,270 L 155,270',
      // right window + cross
      'M 245,240 L 245,300 L 300,300 L 300,240 Z M 272,240 L 272,300 M 245,270 L 300,270',
    ],
    regions: [
      { number: 1, label: 'red', targetColor: '#e74c3c',
        d: 'M 60,225 L 200,80 L 340,225 Z M 260,105 L 260,165 L 285,165 L 285,105 Z' },
      { number: 2, label: 'yellow', targetColor: '#f6e58d',
        d: 'M 80,220 L 80,340 L 320,340 L 320,220 Z' },
      { number: 3, label: 'blue', targetColor: '#2980d9',
        d: 'M 165,340 L 165,270 L 235,270 L 235,340 Z' },
    ],
  },

  {
    id: 'fish',
    label: 'Fish',
    lineWidth: 6,
    outline: [
      // body ellipse
      'M 320,200 A 120,75 0 0 1 80,200 A 120,75 0 0 1 320,200 Z',
      // tail
      'M 80,200 L 30,140 L 30,260 Z',
      // eye
      'M 295,185 A 12,12 0 0 1 271,185 A 12,12 0 0 1 295,185 Z',
      // top fin
      'M 220,125 C 240,100 270,95 260,125 Z',
    ],
    regions: [
      { number: 1, label: 'blue', targetColor: '#2980d9',
        d: 'M 320,200 A 120,75 0 0 1 80,200 A 120,75 0 0 1 320,200 Z' },
      { number: 2, label: 'green', targetColor: '#27ae60',
        d: 'M 80,200 L 30,140 L 30,260 Z' },
    ],
  },

  {
    id: 'balloon',
    label: 'Balloon',
    lineWidth: 6,
    outline: [
      // balloon body
      'M 310,160 A 110,125 0 0 1 90,160 A 110,125 0 0 1 310,160 Z',
      // knot
      'M 195,285 L 200,295 L 205,285 Z',
      // string (wavy)
      'M 200,295 C 185,310 215,325 200,340 C 185,355 215,370 200,385',
    ],
    regions: [
      { number: 1, label: 'pink', targetColor: '#e84393',
        d: 'M 310,160 A 110,125 0 0 1 90,160 A 110,125 0 0 1 310,160 Z' },
    ],
  },

  {
    id: 'butterfly',
    label: 'Butterfly',
    lineWidth: 6,
    outline: [
      // body
      'M 214,200 A 14,60 0 0 1 186,200 A 14,60 0 0 1 214,200 Z',
      // upper left wing
      'M 200,170 C 150,110 60,100 55,160 C 50,210 120,230 200,200 Z',
      // upper right wing
      'M 200,170 C 250,110 340,100 345,160 C 350,210 280,230 200,200 Z',
      // lower left wing
      'M 200,210 C 140,220 70,250 80,290 C 90,320 150,310 200,260 Z',
      // lower right wing
      'M 200,210 C 260,220 330,250 320,290 C 310,320 250,310 200,260 Z',
      // antennae
      'M 197,143 C 175,110 160,95 150,85',
      'M 203,143 C 225,110 240,95 250,85',
    ],
    regions: [
      { number: 1, label: 'purple', targetColor: '#8e44ad',
        d: 'M 200,170 C 150,110 60,100 55,160 C 50,210 120,230 200,200 Z M 200,170 C 250,110 340,100 345,160 C 350,210 280,230 200,200 Z' },
      { number: 2, label: 'pink', targetColor: '#e84393',
        d: 'M 200,210 C 140,220 70,250 80,290 C 90,320 150,310 200,260 Z M 200,210 C 260,220 330,250 320,290 C 310,320 250,310 200,260 Z' },
    ],
  },

  {
    id: 'cat',
    label: 'Cat',
    lineWidth: 6,
    outline: [
      // head
      'M 290,150 A 90,90 0 0 1 110,150 A 90,90 0 0 1 290,150 Z',
      // left ear
      'M 120,90 L 100,45 L 155,75 Z',
      // right ear
      'M 280,90 L 300,45 L 245,75 Z',
      // body
      'M 265,240 A 65,72 0 0 1 135,240 A 65,72 0 0 1 265,240 Z',
      // left eye
      'M 183,135 A 15,18 0 0 1 153,135 A 15,18 0 0 1 183,135 Z',
      // right eye
      'M 247,135 A 15,18 0 0 1 217,135 A 15,18 0 0 1 247,135 Z',
      // nose
      'M 200,158 L 193,168 L 207,168 Z',
      // whiskers left
      'M 190,165 L 130,155 M 190,170 L 130,175',
      // whiskers right
      'M 210,165 L 270,155 M 210,170 L 270,175',
      // tail
      'M 265,240 C 320,260 350,310 310,350',
    ],
    regions: [
      { number: 1, label: 'orange', targetColor: '#f39c12',
        d: 'M 290,150 A 90,90 0 0 1 110,150 A 90,90 0 0 1 290,150 Z M 120,90 L 100,45 L 155,75 Z M 280,90 L 300,45 L 245,75 Z' },
      { number: 2, label: 'orange', targetColor: '#f39c12',
        d: 'M 265,240 A 65,72 0 0 1 135,240 A 65,72 0 0 1 265,240 Z' },
    ],
  },

  {
    id: 'kawaii-food',
    label: 'Kawaii Food',
    type: 'image',
    src: 'assets/images/coloring/food.png',
    regions: [],
  },

  {
    id: 'mushrooms',
    label: 'Mushrooms',
    type: 'image',
    src: 'assets/images/coloring/mushrooms.jpg',
    regions: [],
  },
];

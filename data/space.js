// ─── Space data ───────────────────────────────────────────────────────────────
//
// APP.SPACE.planets       — the 8 planets, in order from the Sun
// APP.SPACE.constellations — simple star patterns for the Stars game (the star
//   array order is the connect-the-dots order)
//
// labelKey → i18n (all 6 locales). Short fact text is English-only in the data.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  APP.SPACE = {
    planets: [
      { id: 'mercury', labelKey: 'space.mercury', color: '#b3a079', size: 0.55, fact: 'Mercury is the smallest planet and closest to the Sun.' },
      { id: 'venus',   labelKey: 'space.venus',   color: '#e6c07a', size: 0.9,  fact: 'Venus is the hottest planet, wrapped in thick clouds.' },
      { id: 'earth',   labelKey: 'space.earth',   color: '#4a90d9', size: 1.0,  fact: 'Earth is our home — the only planet we know with life.' },
      { id: 'mars',    labelKey: 'space.mars',    color: '#c1440e', size: 0.65, fact: 'Mars is the red planet, covered in rusty dust.' },
      { id: 'jupiter', labelKey: 'space.jupiter', color: '#d8a96b', size: 2.2,  fact: 'Jupiter is the biggest planet, a giant ball of gas.' },
      { id: 'saturn',  labelKey: 'space.saturn',  color: '#e3c88f', size: 1.9,  fact: 'Saturn has beautiful rings made of ice and rock.' },
      { id: 'uranus',  labelKey: 'space.uranus',  color: '#9fd8d8', size: 1.35, fact: 'Uranus is a cold blue planet that spins on its side.' },
      { id: 'neptune', labelKey: 'space.neptune', color: '#3b6fd1', size: 1.3,  fact: 'Neptune is a windy blue planet, farthest from the Sun.' }
    ],
    constellations: [
      { id: 'dipper', labelKey: 'space.dipper',
        stars: [{ x: 16, y: 52 }, { x: 32, y: 58 }, { x: 49, y: 56 }, { x: 64, y: 62 }, { x: 64, y: 44 }, { x: 48, y: 40 }, { x: 33, y: 43 }] },
      { id: 'cassiopeia', labelKey: 'space.cassiopeia',
        stars: [{ x: 18, y: 40 }, { x: 35, y: 62 }, { x: 50, y: 44 }, { x: 66, y: 64 }, { x: 82, y: 42 }] }
    ]
  };
})(window.APP);

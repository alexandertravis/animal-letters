window.APP = window.APP || {};
// Greenhouse / Plant-world data. Text is kept as i18n keys (resolved at render
// time via APP.t) rather than hardcoded English, so all six locales work.
// Populated section-by-section: Section 2 (stages), 3 (needs), 4 (pollinate),
// 5 (seasons). Section 1 only establishes the namespace + wiring.
(function (APP) {
  APP.GREENHOUSE = {
    // Life-cycle journey stages (Section 2). Each stage drives one interaction in
    // js/screens/plantgrow.js. `instr`/`fact` are i18n keys (resolved at render
    // time). `type`: 'drag' (drag chip → target zone), 'collect' (tap N items),
    // 'continue' (tap to play an animation). `reveal`/`hide` name plant-part ids
    // that the screen toggles on the persistent SVG. `anim` names an effect layer.
    stages: [
      { id: 'seed',   type: 'drag',     chip: '🌰', target: 'soil',   instr: 'plantgrow.seed',   fact: 'plantgrow.seedFact',   reveal: ['seed'] },
      { id: 'needs',  type: 'collect',  items: [
          { id: 'water', emoji: '💧' }, { id: 'sun', emoji: '☀️' }, { id: 'air', emoji: '💨' }
        ], instr: 'plantgrow.needs', fact: 'plantgrow.needsFact' },
      { id: 'roots',  type: 'continue', chip: '💧', anim: 'water', instr: 'plantgrow.roots',  fact: 'plantgrow.rootsFact',  reveal: ['roots'] },
      { id: 'stem',   type: 'continue', chip: '🌱', anim: 'flow',  instr: 'plantgrow.stem',   fact: 'plantgrow.stemFact',   reveal: ['stem', 'leafL', 'leafR', 'bud'] },
      { id: 'photo',  type: 'continue', chip: '☀️', anim: 'photo', instr: 'plantgrow.photo',  fact: 'plantgrow.photoFact' },
      { id: 'flower', type: 'continue', chip: '🌸', anim: 'bloom', instr: 'plantgrow.flower', fact: 'plantgrow.flowerFact', reveal: ['flower'], hide: ['bud'] },
      { id: 'bee',    type: 'drag',     chip: '🐝', target: 'flower', instr: 'plantgrow.bee',  fact: 'plantgrow.beeFact',    anim: 'pollen' },
      { id: 'fruit',  type: 'continue', chip: '🍅', anim: 'fruit', instr: 'plantgrow.fruit',  fact: 'plantgrow.fruitFact',  reveal: ['fruit'], hide: ['flower'], win: true }
    ],
    // "What plants need" — real needs + distractors (Section 3). The plantneeds
    // screen shows all `needs` plus a random handful of `distractors`, shuffled.
    needs: [
      { id: 'water', emoji: '💧', label: 'plantneeds.water', fact: 'plantneeds.waterFact' },
      { id: 'sun',   emoji: '☀️', label: 'plantneeds.sun',   fact: 'plantneeds.sunFact' },
      { id: 'air',   emoji: '💨', label: 'plantneeds.air',   fact: 'plantneeds.airFact' },
      { id: 'soil',  emoji: '🟤', label: 'plantneeds.soil',  fact: 'plantneeds.soilFact' }
    ],
    distractors: [
      { id: 'toy',   emoji: '🧸' },
      { id: 'sweet', emoji: '🍬' },
      { id: 'shoe',  emoji: '👟' },
      { id: 'ball',  emoji: '⚽' },
      { id: 'tv',    emoji: '📺' }
    ],
    // Vegetable patch / seasons (Section 5). The seasons screen renders one tab
    // per entry (sky tint + crop emoji + creature + spoken fact) plus a quiz.
    seasons: [
      { id: 'spring', label: 'seasons.spring', fact: 'seasons.springFact', sky: '#d4f1ff', crops: ['🌱', '🌷', '🌱', '🌼'], bug: '🐝' },
      { id: 'summer', label: 'seasons.summer', fact: 'seasons.summerFact', sky: '#bdeeff', crops: ['🌿', '🥬', '🌽', '🍅'], bug: '🦋' },
      { id: 'autumn', label: 'seasons.autumn', fact: 'seasons.autumnFact', sky: '#ffe2bd', crops: ['🎃', '🥕', '🍎', '🌽'], bug: '🐞' },
      { id: 'winter', label: 'seasons.winter', fact: 'seasons.winterFact', sky: '#e9f4ff', crops: ['❄️', '🟫', '❄️', '🟫'], bug: '☃️' }
    ]
  };
})(window.APP);

window.APP = window.APP || {};

APP.LOCATIONS = [
  {
    id: 'school',
    labelKey: 'loc.school',
    direct: null,
    bgTrack: 'school',
    games: [
      { id: 'trace',   labelKey: 'school.trace',         art: '✏️',
        go: function(ctx) {
          var animal = APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal);
          if (!animal) { ctx.go('map'); return; }
          APP.startGame(animal);
          APP.state.settings.gameMode = 'trace';
          ctx.go('game');
        }
      },
      { id: 'find',    labelKey: 'school.find',           art: '🔍',
        go: function(ctx) {
          var animal = APP.animals.pickRandom(APP.state.settings.maxLength, APP.state.currentAnimal);
          if (!animal) { ctx.go('map'); return; }
          APP.startGame(animal);
          APP.state.settings.gameMode = 'find';
          ctx.go('findletter');
        }
      },
      { id: 'numbers', labelKey: 'landing.numbers',       art: '🔢', screen: 'numbers' },
      { id: 'letters', labelKey: 'setup.letterPatterns',  art: '🅰️', screen: 'letters' }
    ]
  },
  { id: 'library', labelKey: 'loc.library', direct: 'library', bgTrack: 'library' },
  { id: 'kitchen', labelKey: 'loc.kitchen', direct: 'recipes',  bgTrack: 'kitchen' },
  { id: 'art',     labelKey: 'loc.art',     direct: 'painting', bgTrack: 'default' },
  {
    id: 'games',
    labelKey: 'loc.games',
    direct: null,
    bgTrack: 'games',
    games: [
      { id: 'puzzles',   labelKey: 'landing.puzzles',      art: '🧩', screen: 'puzzles' },
      { id: 'dots',      labelKey: 'landing.dots',         art: '🔵', screen: 'dots' },
      { id: 'tictactoe', labelKey: 'game.tictactoe.title', art: '⭕', screen: 'tictactoe' },
      { id: 'memory',    labelKey: 'game.memory.title',    art: '🃏', screen: 'memory' },
      { id: 'maze',      labelKey: 'game.maze.title',      art: '🐭', screen: 'maze' },
      { id: 'shapes',    labelKey: 'game.shapes.title',    art: '🔺', screen: 'shapes' },
      { id: 'colours',   labelKey: 'game.colours.title',   art: '🌈', screen: 'colours' },
      { id: 'washing',   labelKey: 'game.washing.title',   art: '🧼', screen: 'washing' }
    ]
  },
  { id: 'music', labelKey: 'loc.music', direct: 'music', bgTrack: 'default' },
  { id: 'park',  labelKey: 'loc.park',  direct: 'gallery', bgTrack: 'map' }
];

// Returns the location id that owns the given screen name,
// or null if not found.
APP.locationOf = function (screenName) {
  var SCHOOL_CLAIMS = ['game', 'findletter', 'complete', 'numbers', 'letters', 'progress', 'gallery'];
  if (SCHOOL_CLAIMS.indexOf(screenName) !== -1) return 'school';
  if (screenName === 'library' || screenName === 'storyreader') return 'library';
  if (screenName === 'recipes') return 'kitchen';
  if (screenName === 'painting') return 'art';
  if (screenName === 'music') return 'music';
  for (var i = 0; i < APP.LOCATIONS.length; i++) {
    var loc = APP.LOCATIONS[i];
    if (loc.direct === screenName) return loc.id;
    if (loc.games) {
      for (var j = 0; j < loc.games.length; j++) {
        if (loc.games[j].screen === screenName) return loc.id;
      }
    }
  }
  return null;
};

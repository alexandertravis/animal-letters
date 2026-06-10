window.APP = window.APP || {};
(function(APP) {
  APP.LOCATIONS = [
    {
      id: 'school',
      labelKey: 'loc.school',
      bgTrack: 'school',
      direct: null,
      games: [
        { id: 'trace',    labelKey: 'school.trace',    art: '✏️', screen: 'game' },
        { id: 'find',     labelKey: 'school.find',     art: '🔍', screen: 'findletter' },
        { id: 'numbers',  labelKey: 'loc.numbers',     art: '🔢', screen: 'numbers' },
        { id: 'letters',  labelKey: 'loc.letters',     art: '🔤', screen: 'letters' },
      ]
    },
    { id: 'library', labelKey: 'loc.library',  bgTrack: 'library',  direct: 'library'  },
    { id: 'kitchen', labelKey: 'loc.kitchen',  bgTrack: 'kitchen',  direct: 'recipes'  },
    { id: 'art',     labelKey: 'loc.art',      bgTrack: 'default',  direct: 'painting' },
    {
      id: 'games',
      labelKey: 'loc.games',
      bgTrack: 'games',
      direct: null,
      games: [
        { id: 'puzzles',   labelKey: 'loc.puzzles',              art: '🧩', screen: 'puzzles'   },
        { id: 'dots',      labelKey: 'loc.dots',                 art: '🔵', screen: 'dots'      },
        { id: 'tictactoe', labelKey: 'game.tictactoe.title',     art: '❌', screen: 'tictactoe' },
        { id: 'memory',    labelKey: 'game.memory.title',        art: '🃏', screen: 'memory'    },
        { id: 'maze',      labelKey: 'game.maze.title',          art: '🌀', screen: 'maze'      },
        { id: 'shapes',    labelKey: 'game.shapes.title',        art: '🔷', screen: 'shapes'    },
        { id: 'colours',   labelKey: 'game.colours.title',       art: '🌈', screen: 'colours'   },
        { id: 'washing',   labelKey: 'game.washing.title',       art: '🫧', screen: 'washing'   },
      ]
    },
    { id: 'music',   labelKey: 'loc.music',    bgTrack: 'default',  direct: 'music'    },
    { id: 'park',    labelKey: 'loc.park',     bgTrack: 'map',      direct: 'gallery'  },
  ];

  APP.locationOf = function(screenName) {
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
})(window.APP);

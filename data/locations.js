window.APP = window.APP || {};
(function(APP) {
  APP.LOCATIONS = [
    {
      id: 'school',
      labelKey: 'loc.school',
      bgTrack: 'school',
      direct: null,
      games: [
        { id: 'trace',     labelKey: 'school.trace',           art: '✏️', screen: 'game' },
        { id: 'find',      labelKey: 'school.find',            art: '🔍', screen: 'findletter' },
        { id: 'wordmatch', labelKey: 'game.wordmatch.title',  art: '🔤', screen: 'wordmatch' },
        { id: 'firstletter', labelKey: 'game.firstletter.title', art: '🅰️', screen: 'firstletter' },
        { id: 'calendar',  labelKey: 'game.calendar.title',   art: '📅', screen: 'calendar' },
      ]
    },
    {
      id: 'counting',
      labelKey: 'loc.numbers',
      bgTrack: 'school',
      direct: null,
      games: [
        { id: 'write',  labelKey: 'counting.write',         art: '✏️', screen: 'numbers'     },
        { id: 'count',  labelKey: 'game.countmatch.title',  art: '🔢', screen: 'countmatch'  },
        { id: 'add',    labelKey: 'game.addition.title',    art: '➕', screen: 'addition'    },
        { id: 'bonds',  labelKey: 'game.numberbonds.title', art: '🤝', screen: 'numberbonds' },
        { id: 'times',  labelKey: 'game.times.title',       art: '✖️', screen: 'times'       },
      ]
    },
    {
      id: 'clock',
      labelKey: 'loc.clock',
      bgTrack: 'school',
      direct: null,
      games: [
        { id: 'readclock', labelKey: 'game.readclock.title', art: '🕐', screen: 'readclock' },
        { id: 'sethands',  labelKey: 'game.sethands.title',  art: '🕓', screen: 'sethands'  },
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
        { id: 'puzzles',   labelKey: 'puzzles.title',            art: '🧩', screen: 'puzzles'   },
        { id: 'dots',      labelKey: 'dots.title',               art: '🔵', screen: 'dots'      },
        { id: 'tictactoe', labelKey: 'game.tictactoe.title',     art: '❌', screen: 'tictactoe' },
        { id: 'memory',    labelKey: 'game.memory.title',        art: '🃏', screen: 'memory'    },
        { id: 'maze',      labelKey: 'game.maze.title',          art: '🌀', screen: 'maze'      },
        { id: 'shapes',    labelKey: 'game.shapes.title',        art: '🔷', screen: 'shapes'    },
        { id: 'colours',   labelKey: 'game.colours.title',       art: '🌈', screen: 'colours'   },
        { id: 'washing',   labelKey: 'game.washing.title',       art: '🫧', screen: 'washing'   },
      ]
    },
    {
      id: 'greenhouse',
      labelKey: 'loc.greenhouse',
      bgTrack: 'map',
      direct: null,
      games: [
        { id: 'plantgrow',  labelKey: 'game.plantgrow.title',  art: '🌱', screen: 'plantgrow'  },
        { id: 'plantneeds', labelKey: 'game.plantneeds.title', art: '💧', screen: 'plantneeds' },
        { id: 'pollinate',  labelKey: 'game.pollinate.title',  art: '🐝', screen: 'pollinate'  },
        { id: 'seasons',    labelKey: 'game.seasons.title',    art: '🍂', screen: 'seasons'    },
      ]
    },
    {
      id: 'humanbody',
      labelKey: 'loc.humanbody',
      bgTrack: 'default',
      direct: null,
      games: [
        { id: 'bodylayers', labelKey: 'game.bodylayers.title', art: '🧍', screen: 'bodylayers' },
        { id: 'digestion',  labelKey: 'game.digestion.title',  art: '🍎', screen: 'digestion'  },
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

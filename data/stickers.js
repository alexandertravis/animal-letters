window.APP = window.APP || {};
(function (APP) {
  // Cross-game collectibles. check(games, state) receives APP.progress.all() and
  // APP.state; both may be partial — every predicate must be defensive.
  function wins(games, id) {
    var g = games[id];
    return g && g.wins != null ? g.wins : 0;
  }
  function plays(games, id) {
    var g = games[id];
    return g && g.plays != null ? g.plays : 0;
  }
  function bestStars(games, id) {
    var g = games[id];
    return g && g.bestStars != null ? g.bestStars : 0;
  }

  var ALL_GAME_IDS = ['letters', 'findletter', 'memory', 'tictactoe', 'maze', 'shapes',
    'colours', 'washing', 'music', 'puzzles', 'dots', 'recipes', 'painting'];

  APP.STICKERS = [
    { id: 'first-word',     icon: '✏️', labelKey: 'sticker.firstWord',
      check: function (g) { return wins(g, 'letters') >= 1; } },
    { id: 'word-ten',       icon: '🏆', labelKey: 'sticker.wordTen',
      check: function (g) { return wins(g, 'letters') >= 10; } },
    { id: 'letter-spotter', icon: '🔍', labelKey: 'sticker.letterSpotter',
      check: function (g) { return wins(g, 'findletter') >= 1; } },
    { id: 'little-artist',  icon: '🎨', labelKey: 'sticker.littleArtist',
      check: function (g) { return wins(g, 'painting') >= 1; } },
    { id: 'little-chef',    icon: '🍳', labelKey: 'sticker.littleChef',
      check: function (g) { return wins(g, 'recipes') >= 1; } },
    { id: 'busy-baker',     icon: '🧁', labelKey: 'sticker.busyBaker',
      check: function (g) { return wins(g, 'recipes') >= 5; } },
    { id: 'puzzle-pro',     icon: '🧩', labelKey: 'sticker.puzzlePro',
      check: function (g) { return wins(g, 'puzzles') >= 5; } },
    { id: 'maze-master',    icon: '🌀', labelKey: 'sticker.mazeMaster',
      check: function (g) { return bestStars(g, 'maze') >= 3; } },
    { id: 'memory-whiz',    icon: '🧠', labelKey: 'sticker.memoryWhiz',
      check: function (g) { return bestStars(g, 'memory') >= 3; } },
    { id: 'try-everything', icon: '🌟', labelKey: 'sticker.tryEverything',
      check: function (g) {
        return ALL_GAME_IDS.every(function (id) { return plays(g, id) >= 1; });
      } },
    { id: 'animal-friend',  icon: '🦁', labelKey: 'sticker.animalFriend',
      check: function (g, state) {
        var counts = state && state.animalCompletionCounts;
        return counts ? Object.keys(counts).length >= 10 : false;
      } },
    { id: 'bookworm',       icon: '📚', labelKey: 'sticker.bookworm',
      check: function () {
        return APP.getUnlockedStories ? APP.getUnlockedStories().length >= 1 : false;
      } }
  ];
})(window.APP);

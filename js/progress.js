window.APP = window.APP || {};
(function (APP) {
  var KEY = 'al.progress.games';
  var MAX_STARS = 3;

  function zeros() {
    return { plays: 0, wins: 0, bestStars: 0, lastPlayed: null };
  }

  function allGames() {
    var v = APP.store.get(KEY, {});
    return (v && typeof v === 'object' && !Array.isArray(v)) ? v : {};
  }

  function record(gameId, isWin, stars) {
    if (!gameId) return null;
    var games = allGames();
    var g = games[gameId] != null ? games[gameId] : zeros();
    g.plays = (g.plays != null ? g.plays : 0) + 1;
    if (isWin) {
      g.wins = (g.wins != null ? g.wins : 0) + 1;
      var s = Math.max(0, Math.min(MAX_STARS, stars != null ? stars : 1));
      if (s > (g.bestStars != null ? g.bestStars : 0)) g.bestStars = s;
    }
    g.lastPlayed = new Date().toISOString().slice(0, 10);
    games[gameId] = g;
    APP.store.set(KEY, games);
    return g;
  }

  APP.progress = {
    recordWin: function (gameId, opts) {
      return record(gameId, true, opts && opts.stars);
    },
    recordPlay: function (gameId) {
      return record(gameId, false, null);
    },
    get: function (gameId) {
      var g = allGames()[gameId];
      if (!g) return zeros();
      return {
        plays: g.plays != null ? g.plays : 0,
        wins: g.wins != null ? g.wins : 0,
        bestStars: g.bestStars != null ? g.bestStars : 0,
        lastPlayed: g.lastPlayed != null ? g.lastPlayed : null
      };
    },
    all: function () {
      return allGames();
    }
  };
})(window.APP);

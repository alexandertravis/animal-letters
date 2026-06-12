window.APP = window.APP || {};
(function (APP) {
  var KEY = 'al.progress.games';
  var STICKERS_KEY = 'al.progress.stickers';
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
    checkStickers(games);
    return g;
  }

  function earnedStickers() {
    var v = APP.store.get(STICKERS_KEY, []);
    return Array.isArray(v) ? v : [];
  }

  // Evaluate unearned stickers against the latest progress. Newly earned ids are
  // persisted; the full sticker objects go onto APP.state.newStickers so the next
  // screen render can toast them (drained in main.js).
  function checkStickers(games) {
    if (!APP.STICKERS) return;
    var earned = earnedStickers();
    var newlyEarned = [];
    APP.STICKERS.forEach(function (st) {
      if (earned.indexOf(st.id) !== -1) return;
      var ok = false;
      try { ok = !!st.check(games, APP.state); } catch (_) { /* a broken predicate must never break recording */ }
      if (ok) {
        earned.push(st.id);
        newlyEarned.push(st);
      }
    });
    if (!newlyEarned.length) return;
    APP.store.set(STICKERS_KEY, earned);
    // Only queue toasts for stickers whose persist verifiably landed — if the
    // write silently failed (quota), the sticker stays unearned and will be
    // re-evaluated (and toasted once) on a later record instead of every time.
    var persisted = earnedStickers();
    if (APP.state) {
      if (!APP.state.newStickers) APP.state.newStickers = [];
      newlyEarned.forEach(function (st) {
        if (persisted.indexOf(st.id) !== -1) APP.state.newStickers.push(st);
      });
    }
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
    },
    stickers: function () {
      return earnedStickers();
    }
  };
})(window.APP);

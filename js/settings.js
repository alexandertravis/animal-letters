window.APP = window.APP || {};
(function (APP) {

  // Keys stored under 'al.global' in localStorage
  var GLOBAL_KEYS = ['sfxVol', 'sfxMuted', 'lastSfxVol', 'bgMusicVol', 'bgMusicEnabled'];
  // Keys stored under 'al.game.letters' in localStorage
  var LETTER_KEYS = ['maxLength', 'letterCase', 'depiction', 'revealMode', 'phonics'];

  function load() {
    var g = APP.store.get('al.global', {});
    // new keys — also sync legacy aliases
    if (g.sfxVol !== undefined) { APP.state.settings.sfxVol = g.sfxVol; APP.state.settings.volume = g.sfxVol; }
    if (g.sfxMuted !== undefined) { APP.state.settings.sfxMuted = g.sfxMuted; APP.state.settings.muted = g.sfxMuted; }
    if (g.lastSfxVol !== undefined) { APP.state.settings.lastSfxVol = g.lastSfxVol; APP.state.settings.lastVolume = g.lastSfxVol; }
    if (g.bgMusicVol !== undefined) APP.state.settings.bgMusicVol = g.bgMusicVol;
    if (g.bgMusicEnabled !== undefined) APP.state.settings.bgMusicEnabled = g.bgMusicEnabled;
    // letter game keys
    var l = APP.store.get('al.game.letters', {});
    LETTER_KEYS.forEach(function (k) {
      if (l[k] !== undefined) APP.state.settings[k] = l[k];
    });
  }

  function update(patch) {
    Object.assign(APP.state.settings, patch);
    // sync aliases in both directions
    if (patch.sfxVol !== undefined) APP.state.settings.volume = patch.sfxVol;
    if (patch.volume !== undefined) { APP.state.settings.sfxVol = patch.volume; patch = Object.assign({}, patch, { sfxVol: patch.volume }); }
    if (patch.sfxMuted !== undefined) APP.state.settings.muted = patch.sfxMuted;
    if (patch.muted !== undefined) { APP.state.settings.sfxMuted = patch.muted; patch = Object.assign({}, patch, { sfxMuted: patch.muted }); }
    if (patch.lastSfxVol !== undefined) APP.state.settings.lastVolume = patch.lastSfxVol;
    if (patch.lastVolume !== undefined) { APP.state.settings.lastSfxVol = patch.lastVolume; patch = Object.assign({}, patch, { lastSfxVol: patch.lastVolume }); }

    // persist global keys
    var gPatch = {};
    var anyGlobal = false;
    GLOBAL_KEYS.forEach(function (k) {
      if (patch[k] !== undefined) { gPatch[k] = patch[k]; anyGlobal = true; }
    });
    if (anyGlobal) {
      var cur = APP.store.get('al.global', {});
      APP.store.set('al.global', Object.assign(cur, gPatch));
    }

    // persist letter keys
    var lPatch = {};
    var anyLetter = false;
    LETTER_KEYS.forEach(function (k) {
      if (patch[k] !== undefined) { lPatch[k] = patch[k]; anyLetter = true; }
    });
    if (anyLetter) {
      var curL = APP.store.get('al.game.letters', {});
      APP.store.set('al.game.letters', Object.assign(curL, lPatch));
    }
  }

  // Per-game settings registry
  function game(gameId, defaults) {
    var saved = APP.store.get('al.game.' + gameId, {});
    return Object.assign({}, defaults, saved);
  }

  function saveGame(gameId, obj) {
    APP.store.set('al.game.' + gameId, obj);
  }

  function updateGame(gameId, patch, defaults) {
    var cur = game(gameId, defaults || {});
    var merged = Object.assign(cur, patch);
    saveGame(gameId, merged);
    return merged;
  }

  APP.settings = {
    update: update,
    load: load,
    get: function () { return APP.state.settings; },
    game: game,
    saveGame: saveGame,
    updateGame: updateGame
  };

})(window.APP);

window.APP = window.APP || {};
(function (APP) {
  APP.store = {
    get: function (key, fallback) {
      try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; } catch (_) { return fallback; }
    },
    set: function (key, value) {
      try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
    },
    remove: function (key) {
      try { localStorage.removeItem(key); } catch (_) {}
    }
  };
})(window.APP);

window.APP = window.APP || {};

(function (APP) {
  APP.settings = {
    update(patch) {
      Object.assign(APP.state.settings, patch);
    },
    get() {
      return APP.state.settings;
    }
  };
})(window.APP);

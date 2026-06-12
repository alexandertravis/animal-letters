(function (APP) {
  const root = document.getElementById('app');

  const ctx = {
    go(screen) {
      APP.state.previousScreen = APP.state.screen; // remember where we came from
      APP.state.screen = screen;
      // Stop any in-flight speech so it never carries over into the next screen.
      if (window.speechSynthesis) speechSynthesis.cancel();
      route();
    }
  };

  function route() {
    const screen = APP.screens[APP.state.screen];
    if (!screen) {
      root.innerHTML = `<div style="padding:24px">Unknown screen: ${APP.state.screen}</div>`;
      return;
    }
    screen.render(root, ctx);
  }

  // Gate on document.fonts.ready so the Quicksand font is fully parsed before
  // the first screen renders. Without this, a slow/cold-cache load may render
  // UI text (buttons, name strip, headings) in the fallback font briefly.
  // fonts.ready resolves immediately on repeat loads when the font is cached.
  // Load the persisted language before the first screen renders.
  APP.loadLocale();
  APP.settings.load();
  document.fonts.ready.then(() => route());
})(window.APP);

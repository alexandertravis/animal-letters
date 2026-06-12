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

    // Toast stickers earned on the previous screen, AFTER its own celebration has
    // had time to finish. Toasts are body-level and survive navigation safely.
    if (APP.state.newStickers && APP.state.newStickers.length && APP.ui && APP.ui.stickerToast) {
      const pending = APP.state.newStickers.splice(0);
      // On the stickers screen the intro is still being spoken at toast time —
      // suppress the toast's spoken line there so it doesn't cut the intro off.
      const silent = APP.state.screen === 'stickers';
      pending.forEach(function (st, i) {
        setTimeout(function () { APP.ui.stickerToast(st, { silent: silent }); }, 2200 + i * 1500);
      });
    }
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

(function (APP) {
  const root = document.getElementById('app');

  const ctx = {
    go(screen) {
      APP.state.previousScreen = APP.state.screen; // remember where we came from
      APP.state.screen = screen;
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

  document.addEventListener('DOMContentLoaded', route);
  // If DOMContentLoaded already fired (e.g. defer-less script at end of body), run now.
  if (document.readyState !== 'loading') route();
})(window.APP);

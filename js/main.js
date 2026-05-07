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

  // All <script> tags are at the end of <body> without defer, so the DOM
  // and every APP module are already loaded when this line executes.
  // Calling route() directly avoids a double-render that occurred when both
  // the DOMContentLoaded listener AND the readyState guard fired in sequence.
  route();
})(window.APP);

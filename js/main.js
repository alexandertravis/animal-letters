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
  //
  // document.fonts.ready resolves once all @font-face fonts have either loaded
  // or failed. We wait for it before the first render so that the tracer's
  // <clipPath><text> element (Phase 2) is never built in a fallback font.
  // On a warm cache or fast connection the delay is imperceptible; on slow
  // connections the font-display:swap fallback in CSS prevents blank text
  // while this promise is pending.
  document.fonts.ready.then(route);
})(window.APP);

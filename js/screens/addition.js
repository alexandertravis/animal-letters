window.APP = window.APP || {};
// Addition — stub for Section 1; full game arrives in Section 3.
(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;min-height:100vh;';
    wrap.appendChild(APP.ui.topbar({ ctx: ctx, title: APP.t('game.addition.title') || 'Addition', home: true, back: true }));
    var body = document.createElement('div');
    body.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:24px;text-align:center;';
    body.innerHTML = '<div style="font-size:4rem">➕</div><div style="font-size:1.1rem;color:#667">' + (APP.t('ui.comingSoon') || 'Coming soon!') + '</div>';
    wrap.appendChild(body);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('addition');
  }
  APP.screens = APP.screens || {};
  APP.screens.addition = { render: render };
})(window.APP);

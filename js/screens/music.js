window.APP = window.APP || {};
(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px';
    wrap.innerHTML = '<div style="font-size:4rem">&#x1F3B5;</div><h2>Music — coming soon</h2>';
    var btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Go to map';
    btn.addEventListener('click', function () { ctx.go(APP.screens && APP.screens.map ? 'map' : 'landing'); });
    wrap.appendChild(btn);
    root.appendChild(wrap);
  }
  APP.screens = APP.screens || {};
  APP.screens.music = { render: render };
})(window.APP);

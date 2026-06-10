window.APP = window.APP || {};
(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px';
    wrap.innerHTML = '<div style="font-size:4rem">&#x1F5FA;&#xFE0F;</div><h2>Map — coming soon</h2>';
    var btn = document.createElement('button');
    btn.className = 'btn';
    btn.textContent = 'Go to landing';
    btn.addEventListener('click', function () { ctx.go('landing'); });
    wrap.appendChild(btn);
    root.appendChild(wrap);
  }
  APP.screens = APP.screens || {};
  APP.screens.map = { render: render };
})(window.APP);

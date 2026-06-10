window.APP = window.APP || {};
(function(APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    if (!document.getElementById('location-css')) {
      var style = document.createElement('style');
      style.id = 'location-css';
      style.textContent = [
        '.location-screen{display:flex;flex-direction:column;min-height:100vh;}',
        '.location-body{flex:1;padding:16px;overflow-y:auto;}',
      ].join('');
      document.head.appendChild(style);
    }

    var locId = APP.state.currentLocation;
    var loc = (APP.LOCATIONS || []).find(function(l) { return l.id === locId; });
    if (!loc || !loc.games) { ctx.go('map'); return; }

    if (APP.audio && APP.audio.music) APP.audio.music.play(loc.bgTrack || 'default');

    var wrap = document.createElement('div');
    wrap.className = 'location-screen';

    if (APP.ui && APP.ui.topbar) {
      var topbar = APP.ui.topbar({
        ctx: ctx,
        title: APP.t(loc.labelKey) || loc.id,
        home: true,
        back: 'map'
      });
      wrap.appendChild(topbar);
    } else {
      // Fallback topbar when APP.ui is not loaded
      var topbar = document.createElement('div');
      topbar.className = 'std-topbar';
      topbar.style.cssText = 'display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,.85);';
      var backBtn = document.createElement('button');
      backBtn.className = 'btn icon ghost';
      backBtn.innerHTML = APP.ICONS ? APP.ICONS.home : '🏠';
      backBtn.addEventListener('click', function() { ctx.go('map'); });
      var titleEl = document.createElement('span');
      titleEl.style.cssText = 'flex:1;font-weight:700;font-size:1.1rem;';
      titleEl.textContent = APP.t(loc.labelKey) || loc.id;
      topbar.appendChild(backBtn);
      topbar.appendChild(titleEl);
      wrap.appendChild(topbar);
    }

    var body = document.createElement('div');
    body.className = 'location-body';

    var grid = document.createElement('div');
    grid.className = 'bigbtn-grid';

    loc.games.forEach(function(game) {
      if (!APP.screens || !APP.screens[game.screen]) return;
      var btn;
      if (APP.ui && APP.ui.bigButton) {
        btn = APP.ui.bigButton({
          art: game.art,
          label: APP.t(game.labelKey) || game.id,
          onClick: function() {
            if (APP.audio && APP.audio.sfx && APP.audio.sfx.click) APP.audio.sfx.click();
            ctx.go(game.screen);
          }
        });
      } else {
        // Fallback bigButton when APP.ui is not loaded
        btn = document.createElement('button');
        btn.className = 'bigbtn';
        btn.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:8px;padding:16px;border-radius:16px;border:none;cursor:pointer;background:rgba(255,255,255,.85);font-size:2rem;';
        btn.innerHTML = '<span>' + game.art + '</span><span style="font-size:.85rem;font-weight:700">' + (APP.t(game.labelKey) || game.id) + '</span>';
        (function(screen) {
          btn.addEventListener('click', function() {
            if (APP.audio && APP.audio.sfx && APP.audio.sfx.click) APP.audio.sfx.click();
            ctx.go(screen);
          });
        })(game.screen);
      }
      grid.appendChild(btn);
    });

    body.appendChild(grid);
    wrap.appendChild(body);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.location = { render: render };
})(window.APP);

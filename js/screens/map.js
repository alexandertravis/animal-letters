window.APP = window.APP || {};
(function(APP) {
  var BUILDINGS = {
    school: '<svg viewBox="0 0 120 110"><rect x="15" y="40" width="90" height="65" fill="#ffd166"/><polygon points="60,5 10,45 110,45" fill="#ef476f"/><rect x="20" y="50" width="18" height="18" fill="#a8d8f0"/><rect x="82" y="50" width="18" height="18" fill="#a8d8f0"/><text x="60" y="78" text-anchor="middle" dominant-baseline="middle" font-size="34">🏫</text></svg>',
    library: '<svg viewBox="0 0 120 110"><rect x="10" y="45" width="100" height="60" fill="#c9b99a"/><polygon points="60,8 5,50 115,50" fill="#8b6f47"/><rect x="15" y="55" width="20" height="20" rx="10" fill="#a8d8f0"/><rect x="85" y="55" width="20" height="20" rx="10" fill="#a8d8f0"/><text x="60" y="82" text-anchor="middle" dominant-baseline="middle" font-size="34">📚</text></svg>',
    kitchen: '<svg viewBox="0 0 120 110"><rect x="20" y="40" width="80" height="65" fill="#ffeaa7"/><polygon points="60,5 15,45 105,45" fill="#e17055"/><rect x="22" y="50" width="15" height="15" fill="#a8d8f0"/><rect x="83" y="50" width="15" height="15" fill="#a8d8f0"/><rect x="50" y="25" width="8" height="20" fill="#636e72"/><text x="60" y="80" text-anchor="middle" dominant-baseline="middle" font-size="34">🍳</text></svg>',
    art: '<svg viewBox="0 0 120 110"><rect x="10" y="50" width="100" height="55" fill="#fd79a8"/><polygon points="60,10 5,55 115,55" fill="#e84393"/><rect x="15" y="58" width="22" height="25" fill="#a8d8f0"/><rect x="83" y="58" width="22" height="25" fill="#a8d8f0"/><text x="60" y="84" text-anchor="middle" dominant-baseline="middle" font-size="34">🎨</text></svg>',
    games: '<svg viewBox="0 0 120 110"><rect x="15" y="45" width="90" height="60" fill="#a29bfe"/><rect x="5" y="30" width="25" height="35" fill="#6c5ce7"/><rect x="90" y="30" width="25" height="35" fill="#6c5ce7"/><polygon points="15,30 0,15 30,15" fill="#6c5ce7"/><polygon points="105,30 90,15 120,15" fill="#6c5ce7"/><text x="60" y="80" text-anchor="middle" dominant-baseline="middle" font-size="34">🎲</text></svg>',
    music: '<svg viewBox="0 0 120 110"><rect x="20" y="50" width="80" height="55" fill="#fdcb6e"/><polygon points="60,15 18,55 102,55" fill="#e17055"/><rect x="22" y="60" width="16" height="16" fill="#a8d8f0"/><rect x="82" y="60" width="16" height="16" fill="#a8d8f0"/><text x="60" y="84" text-anchor="middle" dominant-baseline="middle" font-size="34">🎵</text></svg>',
    park: '<svg viewBox="0 0 120 110"><rect x="0" y="70" width="120" height="40" fill="#55efc4"/><ellipse cx="60" cy="55" rx="55" ry="40" fill="#00b894"/><ellipse cx="60" cy="55" rx="40" ry="28" fill="#55efc4"/><rect x="25" y="80" width="8" height="25" fill="#636e72"/><ellipse cx="29" cy="75" rx="12" ry="14" fill="#00b894"/><rect x="87" y="80" width="8" height="25" fill="#636e72"/><ellipse cx="91" cy="75" rx="12" ry="14" fill="#00b894"/><text x="60" y="55" text-anchor="middle" dominant-baseline="middle" font-size="34">🦁</text></svg>',
  };

  function render(root, ctx) {
    root.innerHTML = '';

    if (!document.getElementById('map-css')) {
      var style = document.createElement('style');
      style.id = 'map-css';
      style.textContent = [
        '.map-screen{position:relative;width:100%;min-height:100vh;background:linear-gradient(180deg,#87ceeb 0%,#c8f0c8 70%,#7ec850 100%);overflow:visible;display:flex;flex-direction:column;align-items:center;}',
        '.map-bg{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;}',
        '.map-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:8px 16px 16px;width:100%;max-width:600px;box-sizing:border-box;margin:0 auto;overflow-y:auto;max-height:calc(100dvh - 56px);}',
        '@media(min-width:768px){.map-grid{grid-template-columns:repeat(3,1fr);}}',
        '@media(orientation:landscape) and (max-height:520px){.map-grid{grid-template-columns:repeat(4,1fr);padding-top:8px;}.map-title{font-size:1.3rem;padding:6px 56px 2px;}}',
        '.map-building{position:relative;background:rgba(255,255,255,.35);border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px;border-radius:16px;transition:transform .15s,box-shadow .15s;box-shadow:0 2px 8px rgba(0,0,0,.15);}',
        '.map-building-star{position:absolute;top:6px;right:8px;font-size:.85rem;line-height:1;color:#ffb703;background:rgba(255,255,255,.85);border-radius:999px;padding:3px 6px;box-shadow:0 1px 3px rgba(0,0,0,.2);pointer-events:none;}',
        '.map-building:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,.2);}',
        '.map-building:active{transform:scale(.95);}',
        '.map-building svg{width:100%;max-width:90px;height:auto;filter:drop-shadow(0 2px 4px rgba(0,0,0,.2));}',
        '.map-building-label{font-size:.72rem;font-weight:700;color:#1a3a1a;text-shadow:0 1px 2px rgba(255,255,255,.8);text-align:center;}',
      ].join('');
      document.head.appendChild(style);
    }

    if (APP.audio && APP.audio.music) APP.audio.music.play('map');

    var wrap = document.createElement('div');
    wrap.className = 'map-screen';

    // Background SVG scene
    var bgSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bgSvg.setAttribute('viewBox', '0 0 400 300');
    bgSvg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    bgSvg.setAttribute('class', 'map-bg');
    bgSvg.innerHTML = [
      '<rect width="400" height="300" fill="#87ceeb"/>',
      '<circle cx="340" cy="50" r="35" fill="#ffe066"/>',
      '<ellipse cx="60" cy="280" rx="120" ry="60" fill="#7ec850"/>',
      '<ellipse cx="300" cy="290" rx="150" ry="55" fill="#6abf40"/>',
      '<ellipse cx="180" cy="295" rx="200" ry="50" fill="#5aaf30"/>',
      '<path d="M0,220 Q100,180 200,210 Q300,240 400,200 L400,300 L0,300 Z" fill="#7ec850"/>',
      '<ellipse cx="80" cy="210" rx="35" ry="25" fill="#a8e06e"/>',
      '<ellipse cx="320" cy="215" rx="30" ry="22" fill="#a8e06e"/>',
    ].join('');
    wrap.appendChild(bgSvg);

    // Settings gear always on the far right; continue button on the left when a session exists
    var settingsBtn = document.createElement('button');
    settingsBtn.className = 'btn icon ghost';
    settingsBtn.innerHTML = APP.ICONS ? APP.ICONS.settings : '&#9881;';
    settingsBtn.setAttribute('aria-label', APP.t('ui.settings') || 'Settings');
    settingsBtn.addEventListener('click', function() { ctx.go('setup'); });

    var mapTopbar = APP.ui.topbar({
      ctx: ctx,
      title: APP.t('map.title') || 'Animal Letters',
      home: false,
      back: false,
      right: [settingsBtn]
    });
    mapTopbar.style.position = 'relative';
    mapTopbar.style.zIndex = '1';
    mapTopbar.style.width = '100%';

    // Inject continue button into the left slot if a session exists
    if (APP.state.sessionExists) {
      var contTarget = 'game';
      var contBtn = document.createElement('button');
      contBtn.className = 'btn icon ghost';
      contBtn.innerHTML = APP.ICONS ? APP.ICONS.play : '&#9654;';
      contBtn.setAttribute('aria-label', APP.t('landing.continue') || 'Continue');
      contBtn.title = APP.t('landing.continue') || 'Continue';
      contBtn.addEventListener('click', function() { ctx.go(contTarget); });
      var tbLeft = mapTopbar.querySelector('.tb-left');
      if (tbLeft) tbLeft.appendChild(contBtn);
    }

    wrap.appendChild(mapTopbar);

    // Building buttons grid
    var grid = document.createElement('div');
    grid.className = 'map-grid';

    // True when any game reachable from this building has earned stars.
    function locationHasStars(loc) {
      if (!APP.progress) return false;
      var screens = loc.direct ? [loc.direct] : (loc.games || []).map(function(g) { return g.screen; });
      return screens.some(function(s) {
        var gameId = s === 'game' ? 'letters' : s;
        return APP.progress.get(gameId).bestStars > 0;
      });
    }

    (APP.LOCATIONS || []).forEach(function(loc) {
      var btn = document.createElement('button');
      btn.className = 'map-building';
      btn.innerHTML = (BUILDINGS[loc.id] || '<svg viewBox="0 0 120 110"><rect x="20" y="30" width="80" height="75" fill="#b2bec3"/></svg>') +
        '<span class="map-building-label">' + (APP.t(loc.labelKey) || loc.id) + '</span>' +
        (locationHasStars(loc) ? '<span class="map-building-star">★</span>' : '');

      (function(loc) {
        btn.addEventListener('click', function() {
          if (APP.audio && APP.audio.sfx && APP.audio.sfx.click) APP.audio.sfx.click();
          if (APP.audio && APP.audio.music) APP.audio.music.play(loc.bgTrack || 'default');
          if (loc.direct && APP.screens && APP.screens[loc.direct]) {
            ctx.go(loc.direct);
          } else if (!loc.direct) {
            APP.state.currentLocation = loc.id;
            ctx.go('location');
          }
        });
      })(loc);

      grid.appendChild(btn);
    });

    wrap.appendChild(grid);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('map');
  }

  APP.screens = APP.screens || {};
  APP.screens.map = { render: render };
})(window.APP);

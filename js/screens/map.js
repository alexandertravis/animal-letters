window.APP = window.APP || {};
(function(APP) {
  var BUILDINGS = {
    school: '<svg viewBox="0 0 120 110"><rect x="15" y="40" width="90" height="65" fill="#ffd166"/><polygon points="60,5 10,45 110,45" fill="#ef476f"/><rect x="20" y="50" width="18" height="18" fill="#a8d8f0"/><rect x="82" y="50" width="18" height="18" fill="#a8d8f0"/><circle cx="60" cy="28" r="8" fill="#fff" stroke="#c93a5e" stroke-width="2"/><line x1="60" y1="28" x2="60" y2="23" stroke="#c93a5e" stroke-width="2" stroke-linecap="round"/><line x1="60" y1="28" x2="64" y2="28" stroke="#c93a5e" stroke-width="2" stroke-linecap="round"/><rect x="48" y="72" width="24" height="33" rx="4" fill="#ef476f"/><line x1="60" y1="74" x2="60" y2="105" stroke="#c93a5e" stroke-width="2"/><circle cx="55" cy="89" r="2" fill="#ffd166"/><circle cx="65" cy="89" r="2" fill="#ffd166"/></svg>',
    library: '<svg viewBox="0 0 120 110"><rect x="10" y="45" width="100" height="60" fill="#c9b99a"/><polygon points="60,8 5,50 115,50" fill="#8b6f47"/><rect x="15" y="55" width="20" height="20" rx="10" fill="#a8d8f0"/><rect x="85" y="55" width="20" height="20" rx="10" fill="#a8d8f0"/><rect x="42" y="58" width="6" height="12" fill="#ef476f"/><rect x="49" y="56" width="6" height="14" fill="#118ab2"/><rect x="56" y="59" width="6" height="11" fill="#06d6a0"/><rect x="63" y="57" width="6" height="13" fill="#ffd166"/><rect x="70" y="58" width="6" height="12" fill="#9b5de5"/><rect x="40" y="70" width="38" height="3" fill="#8b6f47"/><rect x="50" y="76" width="20" height="29" rx="3" fill="#6d4c2f"/><circle cx="55" cy="91" r="2" fill="#ffd166"/></svg>',
    kitchen: '<svg viewBox="0 0 120 110"><rect x="20" y="40" width="80" height="65" fill="#ffeaa7"/><polygon points="60,5 15,45 105,45" fill="#e17055"/><rect x="22" y="50" width="15" height="15" fill="#a8d8f0"/><rect x="83" y="50" width="15" height="15" fill="#a8d8f0"/><rect x="50" y="25" width="8" height="20" fill="#636e72"/><path d="M52,74 q4,-7 0,-14" stroke="#b2bec3" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M60,72 q4,-7 0,-14" stroke="#b2bec3" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M68,74 q4,-7 0,-14" stroke="#b2bec3" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="60" cy="79" r="3" fill="#2d3436"/><rect x="44" y="82" width="32" height="6" rx="3" fill="#2d3436"/><rect x="46" y="88" width="28" height="14" rx="4" fill="#636e72"/></svg>',
    art: '<svg viewBox="0 0 120 110"><rect x="10" y="50" width="100" height="55" fill="#fd79a8"/><polygon points="60,10 5,55 115,55" fill="#e84393"/><rect x="15" y="58" width="22" height="25" fill="#a8d8f0"/><rect x="83" y="58" width="22" height="25" fill="#a8d8f0"/><ellipse cx="58" cy="85" rx="17" ry="13" fill="#fff" stroke="#e84393" stroke-width="2"/><circle cx="51" cy="81" r="3" fill="#ef476f"/><circle cx="59" cy="79" r="3" fill="#ffd166"/><circle cx="66" cy="83" r="3" fill="#118ab2"/><circle cx="54" cy="89" r="3" fill="#06d6a0"/><line x1="72" y1="76" x2="84" y2="62" stroke="#8b6f47" stroke-width="3" stroke-linecap="round"/><path d="M84,62 l7,-7 -3,10 z" fill="#ef476f"/></svg>',
    games: '<svg viewBox="0 0 120 110"><rect x="15" y="45" width="90" height="60" fill="#a29bfe"/><rect x="5" y="30" width="25" height="35" fill="#6c5ce7"/><rect x="90" y="30" width="25" height="35" fill="#6c5ce7"/><polygon points="15,30 0,15 30,15" fill="#6c5ce7"/><polygon points="105,30 90,15 120,15" fill="#6c5ce7"/><rect x="44" y="62" width="30" height="30" rx="7" fill="#fff" stroke="#6c5ce7" stroke-width="2"/><circle cx="52" cy="70" r="3" fill="#6c5ce7"/><circle cx="66" cy="70" r="3" fill="#6c5ce7"/><circle cx="59" cy="77" r="3" fill="#6c5ce7"/><circle cx="52" cy="84" r="3" fill="#6c5ce7"/><circle cx="66" cy="84" r="3" fill="#6c5ce7"/></svg>',
    music: '<svg viewBox="0 0 120 110"><rect x="20" y="50" width="80" height="55" fill="#fdcb6e"/><polygon points="60,15 18,55 102,55" fill="#e17055"/><rect x="22" y="60" width="16" height="16" fill="#a8d8f0"/><rect x="82" y="60" width="16" height="16" fill="#a8d8f0"/><circle cx="51" cy="94" r="5" fill="#2d3436"/><rect x="54" y="72" width="3" height="22" fill="#2d3436"/><circle cx="67" cy="90" r="5" fill="#2d3436"/><rect x="70" y="68" width="3" height="22" fill="#2d3436"/><polygon points="54,72 73,68 73,74 54,78" fill="#2d3436"/></svg>',
    park: '<svg viewBox="0 0 120 110"><rect x="0" y="70" width="120" height="40" fill="#55efc4"/><ellipse cx="60" cy="55" rx="55" ry="40" fill="#00b894"/><ellipse cx="60" cy="55" rx="40" ry="28" fill="#55efc4"/><rect x="25" y="80" width="8" height="25" fill="#636e72"/><ellipse cx="29" cy="75" rx="12" ry="14" fill="#00b894"/><rect x="87" y="80" width="8" height="25" fill="#636e72"/><ellipse cx="91" cy="75" rx="12" ry="14" fill="#00b894"/><g fill="#fff" opacity="0.92"><ellipse cx="60" cy="60" rx="9" ry="7"/><circle cx="49" cy="50" r="3.5"/><circle cx="57" cy="46" r="3.5"/><circle cx="65" cy="47" r="3.5"/><circle cx="72" cy="53" r="3.5"/></g></svg>',
    greenhouse: '<svg viewBox="0 0 120 110"><polygon points="60,16 14,50 106,50" fill="#cdeede" stroke="#6fbf9a" stroke-width="2.5"/><line x1="60" y1="16" x2="60" y2="50" stroke="#6fbf9a" stroke-width="2"/><rect x="18" y="48" width="84" height="58" fill="#dff7ec" stroke="#6fbf9a" stroke-width="2.5"/><line x1="39" y1="48" x2="39" y2="106" stroke="#a9ddc6" stroke-width="1.5"/><line x1="60" y1="48" x2="60" y2="106" stroke="#a9ddc6" stroke-width="1.5"/><line x1="81" y1="48" x2="81" y2="106" stroke="#a9ddc6" stroke-width="1.5"/><line x1="18" y1="74" x2="102" y2="74" stroke="#a9ddc6" stroke-width="1.5"/><rect x="25" y="88" width="16" height="14" rx="2" fill="#e8855f"/><path d="M33,88 C29,80 27,76 30,72" fill="none" stroke="#3fa86a" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="29" cy="71" rx="4" ry="2.5" fill="#5bc683" transform="rotate(-35 29 71)"/><path d="M33,88 C37,80 39,77 36,73" fill="none" stroke="#3fa86a" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="37" cy="72" rx="4" ry="2.5" fill="#5bc683" transform="rotate(35 37 72)"/><rect x="79" y="86" width="16" height="16" rx="2" fill="#e8855f"/><line x1="87" y1="86" x2="87" y2="67" stroke="#3fa86a" stroke-width="2.5"/><circle cx="87" cy="62" r="6" fill="#ffd166"/><circle cx="87" cy="62" r="2.5" fill="#e8855f"/><rect x="52" y="82" width="16" height="24" rx="2" fill="#6fbf9a"/><circle cx="64" cy="94" r="1.5" fill="#fff"/></svg>',
    counting: '<svg viewBox="0 0 120 110"><rect x="18" y="44" width="84" height="62" fill="#7ec8e3"/><polygon points="60,12 12,46 108,46" fill="#3a7ca5"/><rect x="26" y="54" width="20" height="17" rx="2" fill="#fff"/><rect x="74" y="54" width="20" height="17" rx="2" fill="#fff"/><rect x="33" y="80" width="17" height="18" rx="3" fill="#ef476f"/><text x="41.5" y="93.5" font-size="13" font-weight="bold" fill="#fff" text-anchor="middle">1</text><rect x="51.5" y="80" width="17" height="18" rx="3" fill="#ffd166"/><text x="60" y="93.5" font-size="13" font-weight="bold" fill="#3a3a3a" text-anchor="middle">2</text><rect x="70" y="80" width="17" height="18" rx="3" fill="#06d6a0"/><text x="78.5" y="93.5" font-size="13" font-weight="bold" fill="#fff" text-anchor="middle">3</text></svg>',
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
        '.map-building{position:relative;background:rgba(255,255,255,.35);border:none;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 8px;min-height:96px;border-radius:16px;transition:transform .15s,box-shadow .15s;box-shadow:0 2px 8px rgba(0,0,0,.15);}',
        '.map-building-star{position:absolute;top:6px;right:8px;font-size:.85rem;line-height:1;color:#ffb703;background:rgba(255,255,255,.85);border-radius:999px;padding:3px 6px;box-shadow:0 1px 3px rgba(0,0,0,.2);pointer-events:none;}',
        '.map-building-star.is-new{animation:mapStarPop .55s cubic-bezier(.34,1.56,.64,1) .4s backwards;}',
        '@keyframes mapStarPop{from{transform:scale(0);}to{transform:scale(1);}}',
        '.map-cloud{animation:mapCloudDrift 75s linear infinite;}',
        '.map-cloud.c2{animation-duration:105s;animation-delay:-45s;}',
        '@keyframes mapCloudDrift{from{transform:translateX(-90px);}to{transform:translateX(470px);}}',
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
      '<circle cx="340" cy="50" r="48" fill="#ffe066" opacity="0.3"/>',
      '<circle cx="340" cy="50" r="35" fill="#ffe066"/>',
      // Drifting clouds: outer <g> positions, inner .map-cloud carries the CSS drift
      '<g transform="translate(0,52)"><g class="map-cloud c1"><ellipse cx="0" cy="0" rx="24" ry="9" fill="#fff" opacity=".85"/><ellipse cx="17" cy="-6" rx="14" ry="8" fill="#fff" opacity=".85"/><ellipse cx="-16" cy="-4" rx="12" ry="7" fill="#fff" opacity=".85"/></g></g>',
      '<g transform="translate(0,98)"><g class="map-cloud c2"><ellipse cx="0" cy="0" rx="18" ry="7" fill="#fff" opacity=".7"/><ellipse cx="13" cy="-5" rx="11" ry="6" fill="#fff" opacity=".7"/></g></g>',
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

    // Pop-in animation only for stars earned since the last map visit.
    var lastSeen = APP.store ? APP.store.get('al.progress.lastSeenStars', {}) : {};
    var seenNow = {};

    (APP.LOCATIONS || []).forEach(function(loc) {
      var hasStars = locationHasStars(loc);
      seenNow[loc.id] = hasStars;
      var btn = document.createElement('button');
      btn.className = 'map-building';
      btn.innerHTML = (BUILDINGS[loc.id] || '<svg viewBox="0 0 120 110"><rect x="20" y="30" width="80" height="75" fill="#b2bec3"/></svg>') +
        '<span class="map-building-label">' + (APP.t(loc.labelKey) || loc.id) + '</span>' +
        (hasStars ? '<span class="map-building-star' + (lastSeen[loc.id] ? '' : ' is-new') + '">★</span>' : '');

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

    if (APP.store) APP.store.set('al.progress.lastSeenStars', seenNow);

    // Sticker book — extra card, deliberately NOT an APP.LOCATIONS entry (it has
    // no games[] and locationOf must not claim it).
    var stickersBtn = document.createElement('button');
    stickersBtn.className = 'map-building';
    stickersBtn.innerHTML =
      '<svg viewBox="0 0 120 110"><rect x="22" y="16" width="76" height="84" rx="8" fill="#ffd166"/><rect x="30" y="24" width="60" height="68" rx="5" fill="#fff7e0"/><circle cx="44" cy="42" r="8" fill="#ff8fa3"/><rect x="58" y="36" width="22" height="12" rx="3" fill="#74c0fc"/><polygon points="48,68 53,78 64,78 55,84 58,94 48,88 38,94 41,84 32,78 43,78" fill="#ffc72c"/></svg>' +
      '<span class="map-building-label">' + ((APP.t && APP.t('stickers.title')) || 'Sticker Book') + '</span>';
    stickersBtn.addEventListener('click', function() {
      if (APP.audio && APP.audio.sfx && APP.audio.sfx.click) APP.audio.sfx.click();
      ctx.go('stickers');
    });
    grid.appendChild(stickersBtn);

    wrap.appendChild(grid);

    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('map');
  }

  APP.screens = APP.screens || {};
  APP.screens.map = { render: render };
})(window.APP);

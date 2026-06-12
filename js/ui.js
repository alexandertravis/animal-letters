window.APP = window.APP || {};
(function (APP) {

  // ── isShortLandscape ────────────────────────────────────────────────────────
  var _slMQ = window.matchMedia
    ? window.matchMedia('(orientation: landscape) and (max-height: 520px)')
    : { matches: false };
  APP.ui = {
    isShortLandscape: function () { return _slMQ.matches; },
    confirm: function (msg) { return window.confirm(msg); }
  };

  // ── topbar ──────────────────────────────────────────────────────────────────
  // opts: { ctx, title:'', home:true, back:true|false|'screenName'|fn,
  //         onRestart:null, settings:{gameId, title, schema, onChange}, right:[] }
  // Returns a div.std-topbar element.
  APP.ui.topbar = function (opts) {
    opts = opts || {};
    var ctx = opts.ctx;
    var bar = document.createElement('div');
    bar.className = 'topbar std-topbar';

    // ── Left group ────────────────────────────────────────────────────────────
    var left = document.createElement('div');
    left.className = 'group tb-left';

    if (opts.home !== false) {
      var homeBtn = _iconBtn(APP.ICONS.home, APP.t ? APP.t('ui.home') : 'Home');
      homeBtn.addEventListener('click', function () {
        var target = APP.screens && APP.screens.map ? 'map' : 'landing';
        if (ctx) ctx.go(target); else APP.goHome && APP.goHome();
      });
      left.appendChild(homeBtn);
    }
    if (opts.back !== false) {
      var backBtn = _iconBtn(APP.ICONS.back, APP.t ? APP.t('ui.back') : 'Back');
      backBtn.addEventListener('click', function () {
        if (typeof opts.back === 'function') { opts.back(); return; }
        if (typeof opts.back === 'string') { if (ctx) ctx.go(opts.back); return; }
        // smart back
        var target = APP.ui.defaultBackTarget(APP.state ? APP.state.screen : null);
        if (ctx) ctx.go(target);
      });
      left.appendChild(backBtn);
    }
    bar.appendChild(left);

    // ── Title ─────────────────────────────────────────────────────────────────
    var titleEl = document.createElement('h2');
    titleEl.className = 'tb-title';
    titleEl.textContent = opts.title || '';
    bar.appendChild(titleEl);

    // ── Right group ───────────────────────────────────────────────────────────
    var right = document.createElement('div');
    right.className = 'group tb-right';

    if (opts.onRestart) {
      var restartBtn = _iconBtn(APP.ICONS.restart, APP.t ? APP.t('ui.restart') : 'Restart');
      restartBtn.addEventListener('click', opts.onRestart);
      right.appendChild(restartBtn);
    }

    // Extra right elements
    if (opts.right && opts.right.length) {
      opts.right.forEach(function (el) { right.appendChild(el); });
    }

    // Settings gear
    if (opts.settings) {
      var cfg = opts.settings;
      var gearBtn = _iconBtn(APP.ICONS.settings, APP.t ? APP.t('ui.settings') : 'Settings');
      gearBtn.addEventListener('click', function () {
        var values = APP.settings ? APP.settings.game(cfg.gameId, {}) : {};
        APP.ui.settingsPanel({
          title: cfg.title || (APP.t ? APP.t('ui.settings') : 'Settings'),
          schema: cfg.schema || [],
          values: values,
          onChange: function (key, val, all) {
            if (APP.settings) APP.settings.updateGame(cfg.gameId, {});
            APP.settings && APP.settings.saveGame(cfg.gameId, all);
            if (cfg.onChange) cfg.onChange(key, val, all);
          }
        });
      });
      right.appendChild(gearBtn);
    }

    bar.appendChild(right);
    return bar;
  };

  // Smart back: previousScreen → owning location → map/landing
  APP.ui.defaultBackTarget = function (currentScreen) {
    var prev = APP.state && APP.state.previousScreen;
    if (prev && prev !== currentScreen && prev !== 'undefined') return prev;
    // find owning location
    if (APP.locationOf && currentScreen) {
      var locId = APP.locationOf(currentScreen);
      if (locId) {
        // If location has a direct target, go to that; else go to 'location' screen
        APP.state && (APP.state.currentLocation = locId);
        return APP.LOCATIONS && APP.LOCATIONS.find(function (l) { return l.id === locId && l.direct; })
          ? APP.LOCATIONS.find(function (l) { return l.id === locId; }).direct
          : 'location';
      }
    }
    return APP.screens && APP.screens.map ? 'map' : 'landing';
  };

  // ── speakIntro ───────────────────────────────────────────────────────────────
  // Speaks the i18n string `intro.<screenId>` aloud, once per screen per session
  // (in-memory only — repeating across sessions is desirable for pre-readers).
  var _spokenIntros = {};
  APP.ui.speakIntro = function (screenId) {
    if (!screenId || _spokenIntros[screenId]) return;
    if (!APP.audio || !APP.audio.speak || !APP.t) return;
    var key = 'intro.' + screenId;
    var text = APP.t(key);
    if (!text || text === key) return; // APP.t echoes the key when missing

    // Only consume the once-per-session slot if speech actually happened
    // (muted children should still hear the intro after unmuting).
    if (APP.audio.speak(text)) _spokenIntros[screenId] = true;
  };

  // ── settingsPanel ────────────────────────────────────────────────────────────
  // Opens a modal with a declarative field schema.
  // schema: [{ key, label /*i18n key or plain string*/, type:'segmented'|'slider'|'toggle'|'select',
  //            options:[{value,label}], min, max, step, display:fn }]
  APP.ui.settingsPanel = function (opts) {
    var overlay = document.createElement('div');
    overlay.className = 'ui-modal';

    var panel = document.createElement('div');
    panel.className = 'ui-panel';

    // Header
    var hdr = document.createElement('div');
    hdr.className = 'ui-panel-hdr';
    var htitle = document.createElement('h3');
    htitle.textContent = opts.title || '';
    var closeBtn = document.createElement('button');
    closeBtn.className = 'btn icon ghost';
    closeBtn.innerHTML = '&#x2715;';
    closeBtn.setAttribute('aria-label', APP.t ? APP.t('ui.close') : 'Close');
    closeBtn.addEventListener('click', function () {
      document.body.removeChild(overlay);
      if (opts.onClose) opts.onClose();
    });
    hdr.appendChild(htitle);
    hdr.appendChild(closeBtn);
    panel.appendChild(hdr);

    // Live values copy (mutated as user changes things)
    var vals = Object.assign({}, opts.values || {});

    function fire(key, val) {
      vals[key] = val;
      if (opts.onChange) opts.onChange(key, val, Object.assign({}, vals));
    }

    // Render fields
    (opts.schema || []).forEach(function (field) {
      var label = field.label && APP.t ? APP.t(field.label) || field.label : (field.label || '');
      var fieldEl = document.createElement('div');
      fieldEl.className = 'field';

      var labelEl = document.createElement('label');
      labelEl.className = 'field-label';
      labelEl.textContent = label;
      fieldEl.appendChild(labelEl);

      if (field.type === 'segmented' || field.type === 'toggle') {
        var segs = field.type === 'toggle'
          ? [{ value: true, label: APP.t ? APP.t('ui.on') : 'On' },
             { value: false, label: APP.t ? APP.t('ui.off') : 'Off' }]
          : (field.options || []);
        var segRow = document.createElement('div');
        segRow.className = 'seg';
        segs.forEach(function (opt) {
          var btn = document.createElement('button');
          btn.className = 'btn ghost seg-btn' + (String(vals[field.key]) === String(opt.value) ? ' active' : '');
          btn.textContent = opt.label && APP.t ? (APP.t(opt.label) || opt.label) : (opt.label || String(opt.value));
          btn.addEventListener('click', function () {
            segRow.querySelectorAll('.seg-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
            fire(field.key, opt.value);
          });
          segRow.appendChild(btn);
        });
        fieldEl.appendChild(segRow);
      } else if (field.type === 'slider') {
        var sliderRow = document.createElement('div');
        sliderRow.className = 'volume-row';
        var slider = document.createElement('input');
        slider.type = 'range';
        var sMin = field.min !== undefined ? field.min : 0;
        var sMax = field.max !== undefined ? field.max : 100;
        slider.min = sMin;
        slider.max = sMax;
        slider.step = field.step || 1;
        // If stored value is already within [min,max], use it directly (integer range
        // sliders). Otherwise treat it as a 0-1 fraction and scale up (legacy vol sliders).
        var rawInit = vals[field.key];
        if (rawInit !== undefined) {
          slider.value = (rawInit >= sMin && rawInit <= sMax) ? rawInit : rawInit * sMax;
        } else {
          slider.value = (sMin + sMax) / 2;
        }
        slider.className = 'vol-slider';
        slider.addEventListener('input', function () {
          var raw = parseFloat(slider.value);
          var v = field.display ? field.display(raw) : raw / (field.max || 100);
          fire(field.key, v);
        });
        sliderRow.appendChild(slider);
        fieldEl.appendChild(sliderRow);
      } else if (field.type === 'select') {
        var sel = document.createElement('select');
        sel.className = 'locale-select';
        (field.options || []).forEach(function (opt) {
          var o = document.createElement('option');
          o.value = opt.value;
          o.textContent = opt.label && APP.t ? (APP.t(opt.label) || opt.label) : (opt.label || String(opt.value));
          if (String(vals[field.key]) === String(opt.value)) o.selected = true;
          sel.appendChild(o);
        });
        sel.addEventListener('change', function () { fire(field.key, sel.value); });
        fieldEl.appendChild(sel);
      }

      panel.appendChild(fieldEl);
    });

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        document.body.removeChild(overlay);
        if (opts.onClose) opts.onClose();
      }
    });
    return overlay;
  };

  // ── bigButton ────────────────────────────────────────────────────────────────
  APP.ui.bigButton = function (opts) {
    var btn = document.createElement('button');
    btn.className = 'bigbtn' + (opts.className ? ' ' + opts.className : '');
    var art = document.createElement('span');
    art.className = 'bigbtn-art';
    art.innerHTML = opts.art || '';
    var lbl = document.createElement('span');
    lbl.className = 'bigbtn-label';
    lbl.textContent = opts.label || '';
    btn.appendChild(art);
    btn.appendChild(lbl);
    if (opts.onClick) btn.addEventListener('click', opts.onClick);
    return btn;
  };

  // ── internal helpers ─────────────────────────────────────────────────────────
  function _iconBtn(iconSvg, ariaLabel) {
    var btn = document.createElement('button');
    btn.className = 'btn icon ghost';
    btn.innerHTML = iconSvg;
    btn.setAttribute('aria-label', ariaLabel);
    return btn;
  }

})(window.APP);

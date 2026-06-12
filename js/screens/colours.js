window.APP = window.APP || {};
(function (APP) {

  var COLOURS = [
    { id: 'red',    hex: '#e74c3c', label: 'colour.red' },
    { id: 'blue',   hex: '#3498db', label: 'colour.blue' },
    { id: 'yellow', hex: '#f1c40f', label: 'colour.yellow' },
    { id: 'green',  hex: '#2ecc71', label: 'colour.green' },
    { id: 'orange', hex: '#e67e22', label: 'colour.orange' },
    { id: 'purple', hex: '#9b59b6', label: 'colour.purple' },
  ];

  // Each colour maps to an array of naturally-coloured emoji so objects vary
  // across rounds while still visually matching the basket colour.
  var COLOUR_EMOJI = {
    red:    ['🍎', '🌹', '🍓', '❤️', '🍅'],
    blue:   ['🫐', '💙', '🐳', '🧢', '💎'],
    yellow: ['🍋', '⭐', '🌻', '🌕', '🍌'],
    green:  ['🥦', '🌿', '🍀', '🌱', '🥝'],
    orange: ['🍊', '🎃', '🥕', '🦊', '🌅'],
    purple: ['🍇', '🔮', '💜', '🪻', '🫛'],
  };

  var DEFAULTS = { numColours: 3 };

  function injectStyles() {
    if (document.getElementById('colours-css')) return;
    var s = document.createElement('style');
    s.id = 'colours-css';
    s.textContent = [
      '.colours-screen{display:flex;flex-direction:column;min-height:100vh;}',
      '.colours-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:16px;gap:20px;overflow-y:auto;}',
      '.colours-objects{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;padding:8px;width:100%;box-sizing:border-box;}',
      '.colour-object{width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;cursor:grab;user-select:none;touch-action:none;box-shadow:0 2px 8px rgba(0,0,0,.2);transition:box-shadow 0.15s;}',
      '.colour-object:active{cursor:grabbing;box-shadow:0 8px 24px rgba(0,0,0,.3);}',
      '.colour-object.sorted{opacity:0;pointer-events:none;}',
      '.colour-clone{position:fixed;pointer-events:none;z-index:999;width:68px;height:68px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:2rem;box-shadow:0 8px 24px rgba(0,0,0,.3);}',
      '.colours-baskets{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:8px;width:100%;box-sizing:border-box;}',
      '.colour-basket{flex:0 0 auto;width:72px;min-width:64px;min-height:72px;border-radius:16px;border:3px dashed rgba(0,0,0,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:8px;font-size:0.72rem;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4);box-sizing:border-box;}',
      '.colour-basket.has-item{border-style:solid;}',
      '@keyframes colours-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}',
      '.colours-shake{animation:colours-shake .35s ease;}',
      '.colours-win{display:flex;flex-direction:column;align-items:center;gap:16px;padding:32px;text-align:center;}',
      '.colours-win h2{font-size:2rem;color:#2ecc71;}',
    ].join('');
    document.head.appendChild(s);
  }

  function speakColour(colourName) {
    if (APP.audio && APP.audio.speak) APP.audio.speak(colourName);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('colours', DEFAULTS);
    var numColours = settings.numColours || DEFAULTS.numColours;

    var activeColours = COLOURS.slice(0, numColours);

    // One object per colour (round-robin), doubling up when there are few
    // colours so there's more to sort. Pick a random emoji per colour per round.
    var total = numColours <= 3 ? numColours * 2 : numColours;
    var shuffledObjects = [];
    var usedEmoji = {};
    for (var k = 0; k < total; k++) {
      var c = activeColours[k % numColours];
      var pool = COLOUR_EMOJI[c.id] || ['⬤'];
      var available = pool.filter(function(e) { return !usedEmoji[e]; });
      if (!available.length) available = pool;
      var picked = available[Math.floor(Math.random() * available.length)];
      usedEmoji[picked] = true;
      shuffledObjects.push({ id: 'obj' + k, emoji: picked, colourId: c.id });
    }

    var sorted = new Array(shuffledObjects.length).fill(false);
    var basketEls = [];
    var objectEls = [];

    var wrap = document.createElement('div');
    wrap.className = 'colours-screen';

    // Topbar
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('game.colours.title') || 'Colour Sort',
      home: true,
      back: true,
      onRestart: function () { render(root, ctx); },
      settings: {
        gameId: 'colours',
        title: APP.t('game.colours.title') || 'Colour Settings',
        schema: [
          {
            type: 'segmented', key: 'numColours', label: APP.t('game.colours.count') || 'Colours',
            options: [{ value: 3, label: '3' }, { value: 4, label: '4' }, { value: 6, label: '6' }]
          }
        ],
        onChange: function (key, val, all) {
          APP.settings.saveGame('colours', all);
          render(root, ctx);
        }
      }
    }));

    var body = document.createElement('div');
    body.className = 'colours-body';

    // Objects tray
    var objRow = document.createElement('div');
    objRow.className = 'colours-objects';

    // Shuffle display order
    var order = shuffledObjects.map(function (_, i) { return i; });
    order.sort(function () { return Math.random() - 0.5; });

    order.forEach(function (objIndex) {
      var obj = shuffledObjects[objIndex];
      var colour = COLOURS.find(function (c) { return c.id === obj.colourId; });
      var el = document.createElement('div');
      el.className = 'colour-object';
      el.dataset.objIndex = objIndex;
      el.style.background = colour.hex;
      el.textContent = obj.emoji;
      objectEls.push(el);
      objRow.appendChild(el);
    });
    body.appendChild(objRow);

    // Baskets row
    var basketRow = document.createElement('div');
    basketRow.className = 'colours-baskets';
    activeColours.forEach(function (colour, i) {
      var basket = document.createElement('div');
      basket.className = 'colour-basket';
      basket.dataset.colourId = colour.id;
      basket.style.background = colour.hex;
      var label = document.createElement('span');
      label.textContent = APP.t(colour.label) || colour.id;
      basket.appendChild(label);
      basketEls.push(basket);
      basketRow.appendChild(basket);
    });
    body.appendChild(basketRow);
    wrap.appendChild(body);
    root.appendChild(wrap);

    // Drag state
    var dragging = null;

    function startDrag(objEl, clientX, clientY) {
      if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.click(); } catch(e){}
      var objIndex = parseInt(objEl.dataset.objIndex, 10);
      var obj = shuffledObjects[objIndex];
      var colour = COLOURS.find(function (c) { return c.id === obj.colourId; });
      var clone = document.createElement('div');
      clone.className = 'colour-clone';
      clone.style.background = colour.hex;
      clone.textContent = obj.emoji;
      clone.style.left = (clientX - 34) + 'px';
      clone.style.top  = (clientY - 34) + 'px';
      document.body.appendChild(clone);
      dragging = { clone: clone, objEl: objEl, objIndex: objIndex };
    }

    function moveDrag(clientX, clientY) {
      if (!dragging) return;
      dragging.clone.style.left = (clientX - 34) + 'px';
      dragging.clone.style.top  = (clientY - 34) + 'px';
    }

    function endDrag(clientX, clientY) {
      if (!dragging) return;
      var d = dragging;
      dragging = null;
      d.clone.remove();

      var obj = shuffledObjects[d.objIndex];

      // Find basket at drop point
      var droppedBasket = null;
      for (var i = 0; i < basketEls.length; i++) {
        var rect = basketEls[i].getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right &&
            clientY >= rect.top  && clientY <= rect.bottom) {
          droppedBasket = basketEls[i];
          break;
        }
      }

      if (!droppedBasket) return;

      var basketColourId = droppedBasket.dataset.colourId;
      if (basketColourId === obj.colourId) {
        // Correct
        sorted[d.objIndex] = true;
        d.objEl.classList.add('sorted');
        droppedBasket.classList.add('has-item');
        var checkMark = document.createElement('span');
        checkMark.textContent = d.objEl.textContent;
        checkMark.style.fontSize = '1.5rem';
        droppedBasket.appendChild(checkMark);
        if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.pop(); } catch(e){}
        // Speak the colour name
        var colourName = APP.t(COLOURS.find(function (c) { return c.id === obj.colourId; }).label) || obj.colourId;
        speakColour(colourName);
        // Check win
        if (sorted.every(function (s) { return s; })) {
          setTimeout(function () { showWin(wrap, body, ctx); }, 300);
        }
      } else {
        // Wrong basket
        if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.wrong(); } catch(e){}
        d.objEl.classList.add('colours-shake');
        d.objEl.addEventListener('animationend', function () {
          d.objEl.classList.remove('colours-shake');
        }, { once: true });
      }
    }

    objectEls.forEach(function (el) {
      el.addEventListener('pointerdown', function (e) {
        e.preventDefault();
        el.setPointerCapture(e.pointerId);
        startDrag(el, e.clientX, e.clientY);
      });
      el.addEventListener('pointermove', function (e) {
        if (dragging && dragging.objEl === el) moveDrag(e.clientX, e.clientY);
      });
      el.addEventListener('pointerup', function (e) {
        if (dragging && dragging.objEl === el) endDrag(e.clientX, e.clientY);
      });
      el.addEventListener('pointercancel', function () {
        if (dragging && dragging.objEl === el) {
          dragging.clone.remove();
          dragging = null;
        }
      });
    });
  }

  function showWin(wrap, body, ctx) {
    if (APP.launchConfetti) APP.launchConfetti();
    body.innerHTML = '';
    var win = document.createElement('div');
    win.className = 'colours-win';
    var h2 = document.createElement('h2');
    h2.textContent = (APP.t('game.colours.win') || 'All sorted!') + ' 🎉';
    var replayBtn = document.createElement('button');
    replayBtn.className = 'btn';
    replayBtn.textContent = APP.t('ui.restart') || 'Play again';
    replayBtn.addEventListener('click', function () {
      var root = wrap.parentElement;
      render(root, ctx);
    });
    win.appendChild(h2);
    win.appendChild(replayBtn);
    body.appendChild(win);
  }

  APP.screens = APP.screens || {};
  APP.screens.colours = { render: render };
})(window.APP);

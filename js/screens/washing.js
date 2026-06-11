window.APP = window.APP || {};
(function (APP) {

  var ANIMAL_EMOJIS = ['🐶', '🐱', '🐸', '🦊', '🐼', '🐨', '🐯', '🐰'];

  var DEFAULTS = { mud: 'light' };

  function injectStyles() {
    if (document.getElementById('washing-css')) return;
    var s = document.createElement('style');
    s.id = 'washing-css';
    s.textContent = [
      '.washing-screen{display:flex;flex-direction:column;min-height:100vh;}',
      '.washing-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:16px;}',
      '.washing-stage{position:relative;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.2);}',
      '.washing-animal{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;}',
      '.washing-canvas{position:absolute;inset:0;width:100%;height:100%;cursor:none;touch-action:none;}',
      '.washing-hint{font-size:0.9rem;color:#888;text-align:center;}',
      '.wash-bubble{position:fixed;border-radius:50%;background:rgba(255,255,255,.75);pointer-events:none;z-index:50;}',
      '@keyframes bubble-float{0%{opacity:.8;transform:translateY(0) scale(1);}100%{opacity:0;transform:translateY(-40px) scale(.5);}}',
      '.washing-win{display:flex;flex-direction:column;align-items:center;gap:16px;padding:32px;text-align:center;}',
      '.washing-win h2{font-size:2rem;color:#3498db;}',
      '.washing-win .emoji{font-size:5rem;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var settings = APP.settings.game('washing', DEFAULTS);
    var mud = settings.mud || DEFAULTS.mud;

    var randomAnimal = ANIMAL_EMOJIS[Math.floor(Math.random() * ANIMAL_EMOJIS.length)];

    var wrap = document.createElement('div');
    wrap.className = 'washing-screen';

    // Topbar
    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t('game.washing.title') || 'Wash the Animal',
      home: true,
      back: true,
      settings: {
        gameId: 'washing',
        title: APP.t('game.washing.title') || 'Washing Settings',
        schema: [
          {
            type: 'segmented', key: 'mud', label: APP.t('game.washing.mud') || 'Mud',
            options: [
              { value: 'light', label: APP.t('game.washing.light') || 'Light' },
              { value: 'heavy', label: APP.t('game.washing.heavy') || 'Heavy' }
            ]
          }
        ],
        onChange: function (key, val, all) {
          APP.settings.saveGame('washing', all);
          render(root, ctx);
        }
      }
    }));

    var body = document.createElement('div');
    body.className = 'washing-body';

    // Stage
    var stageSize = Math.min(300, Math.floor(window.innerWidth * 0.8));
    var stage = document.createElement('div');
    stage.className = 'washing-stage';
    stage.style.width = stageSize + 'px';
    stage.style.height = stageSize + 'px';

    // Animal layer
    var animalDiv = document.createElement('div');
    animalDiv.className = 'washing-animal';
    var animalSpan = document.createElement('span');
    animalSpan.style.fontSize = Math.round(stageSize * 0.6) + 'px';
    animalSpan.style.lineHeight = '1';
    animalSpan.textContent = randomAnimal;
    animalDiv.appendChild(animalSpan);
    stage.appendChild(animalDiv);

    // Canvas
    var canvas = document.createElement('canvas');
    canvas.className = 'washing-canvas';
    canvas.width = stageSize;
    canvas.height = stageSize;
    stage.appendChild(canvas);
    body.appendChild(stage);

    // Hint
    var hint = document.createElement('div');
    hint.className = 'washing-hint';
    hint.textContent = '👆 ' + (APP.t('game.washing.hint') || 'Wipe the mud away!');
    body.appendChild(hint);

    wrap.appendChild(body);
    root.appendChild(wrap);

    // Draw mud as an ellipse roughly over the animal (not the whole canvas),
    // so the mud blob matches the emoji's shape rather than a square.
    var ctx2d = canvas.getContext('2d');
    var mcx = stageSize / 2, mcy = stageSize / 2;
    var mrx = stageSize * 0.46, mry = stageSize * 0.44;
    ctx2d.fillStyle = '#7B5B3A';
    ctx2d.beginPath();
    ctx2d.ellipse(mcx, mcy, mrx, mry, 0, 0, Math.PI * 2);
    ctx2d.fill();
    if (mud === 'heavy') {
      // Darker speckles, clipped to the mud blob via source-atop.
      ctx2d.globalCompositeOperation = 'source-atop';
      for (var i = 0; i < 12; i++) {
        ctx2d.fillStyle = 'rgba(50,30,10,0.4)';
        ctx2d.beginPath();
        ctx2d.ellipse(
          mcx + (Math.random() - 0.5) * mrx * 1.6,
          mcy + (Math.random() - 0.5) * mry * 1.6,
          20 + Math.random() * 30,
          15 + Math.random() * 22,
          Math.random() * Math.PI, 0, Math.PI * 2
        );
        ctx2d.fill();
      }
      ctx2d.globalCompositeOperation = 'source-over';
    }

    // Wiping state
    var isWiping = false;
    var wipeCount = 0;
    var won = false;

    function wipe(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      var localX = (clientX - rect.left) * (canvas.width / rect.width);
      var localY = (clientY - rect.top)  * (canvas.height / rect.height);
      ctx2d.globalCompositeOperation = 'destination-out';
      ctx2d.beginPath();
      ctx2d.arc(localX, localY, mud === 'heavy' ? 20 : 30, 0, Math.PI * 2);
      ctx2d.fill();
      ctx2d.globalCompositeOperation = 'source-over';
      emitBubbles(clientX, clientY);
      wipeCount++;
      if (wipeCount % 20 === 0) checkProgress();
    }

    function emitBubbles(clientX, clientY) {
      var count = 1 + Math.floor(Math.random() * 2);
      for (var b = 0; b < count; b++) {
        var bubble = document.createElement('div');
        bubble.className = 'wash-bubble';
        var size = 4 + Math.floor(Math.random() * 5);
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.left = (clientX + (Math.random() * 20 - 10)) + 'px';
        bubble.style.top  = (clientY + (Math.random() * 20 - 10)) + 'px';
        bubble.style.animation = 'bubble-float 0.6s ease forwards';
        document.body.appendChild(bubble);
        bubble.addEventListener('animationend', function () { bubble.remove(); });
      }
    }

    function checkProgress() {
      if (won) return;
      var data = ctx2d.getImageData(0, 0, canvas.width, canvas.height).data;
      var clean = 0;
      var total = canvas.width * canvas.height;
      for (var idx = 3; idx < data.length; idx += 4) {
        if (data[idx] < 10) clean++;
      }
      if (clean / total >= 0.90) {
        won = true;
        canvas.removeEventListener('pointerdown', onDown);
        canvas.removeEventListener('pointermove', onMove);
        canvas.removeEventListener('pointerup', onUp);
        setTimeout(function () { showWin(body, wrap, ctx, randomAnimal); }, 300);
      }
    }

    function onDown(e) {
      e.preventDefault();
      isWiping = true;
      canvas.setPointerCapture(e.pointerId);
      if (APP.audio && APP.audio._wake) try { APP.audio._wake(); } catch(ex){}
      wipe(e.clientX, e.clientY);
    }
    function onMove(e) {
      if (!isWiping) return;
      wipe(e.clientX, e.clientY);
    }
    function onUp() { isWiping = false; }

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointercancel', onUp);
  }

  function showWin(body, wrap, ctx, animalEmoji) {
    for (var i = 0; i < 3; i++) {
      (function (d) {
        setTimeout(function () {
          if (APP.audio && APP.audio.sfx) try { APP.audio.sfx.pop(); } catch(e){}
        }, d * 200);
      })(i);
    }
    if (APP.launchConfetti) APP.launchConfetti();
    body.innerHTML = '';
    var win = document.createElement('div');
    win.className = 'washing-win';
    var emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = animalEmoji;
    var h2 = document.createElement('h2');
    h2.textContent = (APP.t('game.washing.clean') || 'Sparkling clean!') + ' ✨';
    var replayBtn = document.createElement('button');
    replayBtn.className = 'btn';
    replayBtn.textContent = APP.t('game.washing.another') || 'Wash another';
    replayBtn.addEventListener('click', function () {
      var root = wrap.parentElement;
      render(root, ctx);
    });
    win.appendChild(emoji);
    win.appendChild(h2);
    win.appendChild(replayBtn);
    body.appendChild(win);
  }

  APP.screens = APP.screens || {};
  APP.screens.washing = { render: render };
})(window.APP);

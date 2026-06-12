window.APP = window.APP || {};
(function (APP) {

  function injectStyles() {
    if (document.getElementById('stickers-css')) return;
    var s = document.createElement('style');
    s.id = 'stickers-css';
    s.textContent = [
      '.stickers-screen{display:flex;flex-direction:column;height:100%;}',
      '.stickers-count{text-align:center;font-weight:800;color:var(--ink);padding:8px 0 0;font-size:1.05rem;}',
      '.stickers-grid{display:grid;grid-template-columns:repeat(auto-fill,110px);gap:12px;justify-content:center;padding:14px 16px 28px;overflow-y:auto;flex:1;}',
      '.sticker-cell{display:flex;flex-direction:column;align-items:center;gap:4px;background:white;border-radius:var(--radius);box-shadow:var(--shadow);padding:12px 6px 10px;}',
      // The grey filter sits on the icon span ONLY — a parent filter would also
      // desaturate the label (parent filters always win, see iOS notes).
      '.sticker-icon{font-size:2.6rem;line-height:1.15;}',
      '.sticker-cell.is-locked .sticker-icon{filter:grayscale(1) opacity(.35);}',
      '.sticker-cell.is-locked .sticker-name{opacity:.45;}',
      '.sticker-name{font-size:.72rem;font-weight:700;color:var(--ink);text-align:center;min-height:2em;}',
      '@media(orientation:landscape) and (max-height:520px){.stickers-grid{grid-template-columns:repeat(auto-fill,96px);gap:8px;}.sticker-icon{font-size:2.1rem;}}'
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    injectStyles();
    root.innerHTML = '';

    var wrap = document.createElement('div');
    wrap.className = 'stickers-screen';

    wrap.appendChild(APP.ui.topbar({
      ctx: ctx,
      title: APP.t ? APP.t('stickers.title') : 'Sticker Book',
      home: true,
      back: 'map'
    }));

    var earned = APP.progress ? APP.progress.stickers() : [];
    var defs = APP.STICKERS || [];

    var count = document.createElement('div');
    count.className = 'stickers-count';
    count.textContent = earned.length + ' / ' + defs.length;
    wrap.appendChild(count);

    var grid = document.createElement('div');
    grid.className = 'stickers-grid';

    defs.forEach(function (st) {
      var isEarned = earned.indexOf(st.id) !== -1;
      var cell = document.createElement('div');
      cell.className = 'sticker-cell' + (isEarned ? '' : ' is-locked');

      var icon = document.createElement('span');
      icon.className = 'sticker-icon';
      icon.textContent = st.icon;
      cell.appendChild(icon);

      var name = document.createElement('div');
      name.className = 'sticker-name';
      name.textContent = APP.t ? APP.t(st.labelKey) : st.id;
      cell.appendChild(name);

      if (isEarned) {
        cell.addEventListener('click', function () {
          if (APP.audio && APP.audio.sfx && APP.audio.sfx.pop) APP.audio.sfx.pop();
          if (APP.audio && APP.audio.speak && APP.t) APP.audio.speak(APP.t(st.labelKey));
        });
      }

      grid.appendChild(cell);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);
    if (APP.ui && APP.ui.speakIntro) APP.ui.speakIntro('stickers');
  }

  APP.screens = APP.screens || {};
  APP.screens.stickers = { render: render };
})(window.APP);

window.APP = window.APP || {};

// Developer review screen: lists every animal with its cartoon image,
// display name, letter count, and the name in all three case modes so
// assets and letter data can be checked at a glance.
// Accessible from the Settings screen.
(function (APP) {
  function render(root, ctx) {
    root.innerHTML = '';

    const wrap = document.createElement('div');
    wrap.className = 'devanimals';

    // ── Header ──
    const header = document.createElement('div');
    header.className = 'devanimals-header';
    header.innerHTML = `
      <button class="btn icon ghost" id="dev-back" aria-label="Back">&#8592;</button>
      <h2>Animal Review</h2>
      <span class="devanimals-count">${APP.ANIMALS.length} animals</span>
    `;
    header.querySelector('#dev-back').addEventListener('click', () => ctx.go('setup'));
    wrap.appendChild(header);

    // ── List ──
    const list = document.createElement('div');
    list.className = 'devanimals-list';

    // Group by name length for easier scanning
    const byLength = {};
    APP.ANIMALS.forEach(a => {
      const len = a.name.length;
      if (!byLength[len]) byLength[len] = [];
      byLength[len].push(a);
    });

    Object.keys(byLength).sort((a, b) => a - b).forEach(len => {
      const groupHeader = document.createElement('div');
      groupHeader.className = 'devanimals-group-header';
      groupHeader.textContent = `${len}-letter animals`;
      list.appendChild(groupHeader);

      byLength[len].forEach(animal => {
        const tile = document.createElement('div');
        tile.className = 'devanimals-tile';

        // Image
        const imgWrap = document.createElement('div');
        imgWrap.className = 'devanimals-img';
        const img = new Image();
        img.alt = animal.displayName;
        img.src = animal.images.cartoon;
        img.onerror = () => {
          imgWrap.innerHTML = `<div class="devanimals-fallback">${animal.displayName[0]}</div>`;
        };
        imgWrap.appendChild(img);
        tile.appendChild(imgWrap);

        // Info
        const info = document.createElement('div');
        info.className = 'devanimals-info';

        const nameRow = document.createElement('div');
        nameRow.className = 'devanimals-name';
        nameRow.textContent = animal.displayName;
        info.appendChild(nameRow);

        // Show all three case renderings
        const cases = document.createElement('div');
        cases.className = 'devanimals-cases';
        [
          { label: 'ABC', text: animal.name.toUpperCase() },
          { label: 'Abc', text: animal.displayName },
          { label: 'abc', text: animal.name.toLowerCase() }
        ].forEach(({ label, text }) => {
          const chip = document.createElement('span');
          chip.className = 'dev-chip';
          chip.innerHTML = `<span class="dev-chip-label">${label}</span> ${text}`;
          cases.appendChild(chip);
        });
        info.appendChild(cases);

        // Audio / image paths (helps spot missing assets)
        const assets = document.createElement('div');
        assets.className = 'devanimals-assets';
        const hasCartoon  = animal.images.cartoon  ? '🖼' : '✗';
        const hasRealistic = animal.images.realistic ? '📷' : '✗';
        const hasAudio    = animal.audio             ? '🔊' : '✗';
        assets.innerHTML = `<span title="${animal.images.cartoon}">${hasCartoon} cartoon</span> · <span title="${animal.images.realistic}">${hasRealistic} realistic</span> · <span title="${animal.audio}">${hasAudio} audio</span>`;
        info.appendChild(assets);

        tile.appendChild(info);
        list.appendChild(tile);
      });
    });

    wrap.appendChild(list);
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.devanimals = { render };
})(window.APP);

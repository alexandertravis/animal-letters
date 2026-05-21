window.APP = window.APP || {};

// Developer review screen: lists every animal with its cartoon image,
// display name, letter count, and the name in all three case modes so
// assets and letter data can be checked at a glance.
// "Test" tab lets you pick an animal and trace through its letters
// exactly as the game would present them.
// Accessible from the Settings screen.
(function (APP) {

  // ── Main render ───────────────────────────────────────────────────────────
  function render(root, ctx) {
    root.innerHTML = '';

    let activeView = 'review';
    let testTracer  = null;   // cleaned up on every view switch / new letter

    const wrap = document.createElement('div');
    wrap.className = 'devanimals';

    // ── Header ──────────────────────────────────────────────────────────────
    const header = document.createElement('div');
    header.className = 'devanimals-header';

    const backBtn = document.createElement('button');
    backBtn.className = 'btn icon ghost';
    backBtn.setAttribute('aria-label', 'Back');
    backBtn.innerHTML = APP.ICONS.back;
    backBtn.addEventListener('click', () => {
      if (testTracer) { testTracer.destroy(); testTracer = null; }
      ctx.go('setup');
    });

    const title = document.createElement('h2');
    title.textContent = 'Animal Review';

    // Toggle: Review | Test | Counts
    const toggleGrp = document.createElement('div');
    toggleGrp.className = 'toggle-group';
    ['Review', 'Test', 'Counts'].forEach(label => {
      const btn = document.createElement('button');
      btn.textContent = label;
      btn.className = label.toLowerCase() === activeView ? 'on' : '';
      btn.addEventListener('click', () => {
        if (label.toLowerCase() === activeView) return;
        activeView = label.toLowerCase();
        toggleGrp.querySelectorAll('button').forEach(b =>
          b.classList.toggle('on', b.textContent.toLowerCase() === activeView));
        draw();
      });
      toggleGrp.appendChild(btn);
    });

    const count = document.createElement('span');
    count.className = 'devanimals-count';
    const _allAnimals = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
    count.textContent = `${_allAnimals.length} animals`;

    header.appendChild(backBtn);
    header.appendChild(title);
    header.appendChild(toggleGrp);
    header.appendChild(count);
    wrap.appendChild(header);

    // ── Body (swapped on toggle) ─────────────────────────────────────────────
    function draw() {
      wrap.querySelector('.devanimals-body')?.remove();
      if (testTracer) { testTracer.destroy(); testTracer = null; }

      const body = document.createElement('div');
      body.className = 'devanimals-body';

      if (activeView === 'review')  renderReview(body);
      else if (activeView === 'counts') renderCounts(body);
      else                          renderTest(body);

      wrap.appendChild(body);
    }

    // ── Review view (original list) ──────────────────────────────────────────
    function renderReview(body) {
      body.classList.add('devanimals-review');

      const list = document.createElement('div');
      list.className = 'devanimals-list';

      const animalList = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
      const byLength = new Map();
      animalList.forEach(a => {
        const len = a.name.length;
        if (!byLength.has(len)) byLength.set(len, []);
        byLength.get(len).push(a);
      });

      [...byLength.keys()].sort((a, b) => a - b).forEach(len => {
        const groupHeader = document.createElement('div');
        groupHeader.className = 'devanimals-group-header';
        groupHeader.textContent = `${len}-letter animals`;
        list.appendChild(groupHeader);

        byLength.get(len).forEach(animal => {
          const tile = document.createElement('div');
          tile.className = 'devanimals-tile';

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

          const info = document.createElement('div');
          info.className = 'devanimals-info';

          const nameRow = document.createElement('div');
          nameRow.className = 'devanimals-name';
          nameRow.textContent = animal.displayName;
          info.appendChild(nameRow);

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

          const assets = document.createElement('div');
          assets.className = 'devanimals-assets';
          // These checks confirm a path is configured in animals.js — not that
          // the actual file exists on disk (missing files fall back gracefully).
          const hasCartoon   = animal.images.cartoon   ? '🖼' : '✗';
          const hasRealistic = animal.images.realistic  ? '📷' : '✗';
          const hasAudio     = animal.audio             ? '🔊' : '✗';
          assets.innerHTML = `<span title="${animal.images.cartoon}">${hasCartoon} cartoon</span> · <span title="${animal.images.realistic}">${hasRealistic} realistic</span> · <span title="${animal.audio}">${hasAudio} audio</span>`;
          info.appendChild(assets);

          tile.appendChild(info);
          list.appendChild(tile);
        });
      });

      body.appendChild(list);
    }

    // ── Test view ────────────────────────────────────────────────────────────
    function renderTest(body) {
      body.classList.add('devanimals-test');

      // State
      let currentAnimal    = null;
      let currentLetterIdx = 0;
      let completedSet     = new Set();
      let letterCase       = 'upper';
      let advanceTimer     = null;   // setTimeout ID for the 600 ms auto-advance

      // ── Animal picker ────────────────────────────────────────────────────
      const pickerWrap = document.createElement('div');
      pickerWrap.className = 'devanimals-test-top';

      const picker = document.createElement('div');
      picker.className = 'devanimals-animal-picker';
      const testAnimalList = APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS;
      testAnimalList.slice().sort((a, b) => a.displayName.localeCompare(b.displayName))
        .forEach(animal => {
          const btn = document.createElement('button');
          btn.className = 'devanimals-animal-btn';
          btn.textContent = animal.displayName;
          btn.addEventListener('click', () => startAnimal(animal));
          picker.appendChild(btn);
        });
      pickerWrap.appendChild(picker);

      // Case toggle
      const caseToggle = document.createElement('div');
      caseToggle.className = 'toggle-group';
      [['ABC', 'upper'], ['abc', 'lower']].forEach(([label, val]) => {
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.className = val === letterCase ? 'on' : '';
        btn.addEventListener('click', () => {
          if (letterCase === val) return;
          letterCase = val;
          caseToggle.querySelectorAll('button').forEach(b =>
            b.classList.toggle('on', b === btn));
          if (currentAnimal) { updateStrip(); mountCurrentLetter(); }
        });
        caseToggle.appendChild(btn);
      });
      pickerWrap.appendChild(caseToggle);
      body.appendChild(pickerWrap);

      // ── Stage ────────────────────────────────────────────────────────────
      const stageWrap = document.createElement('div');
      stageWrap.className = 'practice-stage-wrap';

      const stage = document.createElement('div');
      stage.className = 'practice-stage';

      const placeholder = document.createElement('div');
      placeholder.className = 'practice-placeholder';
      placeholder.textContent = 'Select an animal above to start testing';
      stage.appendChild(placeholder);
      stageWrap.appendChild(stage);
      body.appendChild(stageWrap);

      // ── Name strip ───────────────────────────────────────────────────────
      const strip = document.createElement('div');
      strip.className = 'devanimals-strip';
      body.appendChild(strip);

      // ── Controls ─────────────────────────────────────────────────────────
      const controls = document.createElement('div');
      controls.className = 'practice-controls';

      const greatBtn = document.createElement('button');
      greatBtn.className = 'btn practice-great-btn';
      greatBtn.textContent = 'Great Job! 🎉';
      greatBtn.style.visibility = 'hidden';
      greatBtn.addEventListener('click', () => APP.launchConfetti());
      controls.appendChild(greatBtn);

      const resetBtn = document.createElement('button');
      resetBtn.className = 'btn practice-reset-btn';
      resetBtn.textContent = 'Try Again';
      resetBtn.disabled = true;
      resetBtn.addEventListener('click', () => { if (currentAnimal) mountCurrentLetter(); });
      controls.appendChild(resetBtn);

      body.appendChild(controls);

      // ── Helpers ──────────────────────────────────────────────────────────
      function startAnimal(animal) {
        picker.querySelectorAll('.devanimals-animal-btn').forEach(b =>
          b.classList.toggle('active', b.textContent === animal.displayName));

        currentAnimal    = animal;
        currentLetterIdx = 0;
        completedSet     = new Set();
        greatBtn.style.visibility = 'hidden';
        resetBtn.disabled = false;

        rebuildStrip();
        mountCurrentLetter();
      }

      function mountCurrentLetter() {
        // Cancel any pending auto-advance. Without this, a strip-box click during
        // the 600 ms window would set currentLetterIdx to the clicked index, then
        // the timeout would fire, increment it again, and mount the wrong letter.
        if (advanceTimer !== null) { clearTimeout(advanceTimer); advanceTimer = null; }
        if (testTracer) { testTracer.destroy(); testTracer = null; }
        const rawChar = currentAnimal.name[currentLetterIdx];
        const ch = letterCase === 'upper' ? rawChar.toUpperCase() : rawChar.toLowerCase();

        stage.innerHTML = '';
        greatBtn.style.visibility = 'hidden';
        updateStrip();

        testTracer = APP.tracer.mount(stage, ch, {
          onComplete() {
            completedSet.add(currentLetterIdx);
            updateStrip();
            if (APP.audio && APP.audio.letterDone) APP.audio.letterDone();

            if (currentLetterIdx < currentAnimal.name.length - 1) {
              advanceTimer = setTimeout(() => {
                advanceTimer = null;
                currentLetterIdx++;
                mountCurrentLetter();
              }, 600);
            } else {
              greatBtn.style.visibility = 'visible';
              if (APP.audio && APP.audio.wordDone) APP.audio.wordDone();
            }
          }
        });
      }

      function rebuildStrip() {
        strip.innerHTML = '';
        if (!currentAnimal) return;
        currentAnimal.name.split('').forEach((ch, i) => {
          const box = document.createElement('div');
          box.className = 'devanimals-strip-box';
          box.dataset.idx = i;
          // Click a box to jump to that letter
          box.addEventListener('click', () => {
            if (!currentAnimal) return;
            completedSet.delete(i);
            currentLetterIdx = i;
            greatBtn.style.visibility = 'hidden';
            mountCurrentLetter();
          });
          strip.appendChild(box);
        });
        updateStrip();
      }

      function updateStrip() {
        strip.querySelectorAll('.devanimals-strip-box').forEach((box, i) => {
          box.classList.toggle('done',    completedSet.has(i));
          box.classList.toggle('current', i === currentLetterIdx && !completedSet.has(i));
          box.textContent = currentAnimal
            ? (letterCase === 'upper'
                ? currentAnimal.name[i].toUpperCase()
                : currentAnimal.name[i].toLowerCase())
            : '';
        });
      }
    }

    // ── Counts view ──────────────────────────────────────────────────────────
    function renderCounts(body) {
      body.classList.add('devanimals-counts');

      const intro = document.createElement('p');
      intro.className = 'devanimals-counts-intro';
      intro.textContent = 'Manually adjust completion counts to test story unlocks.';
      body.appendChild(intro);

      const resetAll = document.createElement('button');
      resetAll.className = 'btn ghost devanimals-counts-reset';
      resetAll.textContent = 'Reset all counts to 0';
      resetAll.addEventListener('click', () => {
        APP.state.animalCompletionCounts = {};
        APP.state.completedAnimals = new Set();
        APP.saveProgress();
        draw(); // re-render so all inputs reset to 0
      });
      body.appendChild(resetAll);

      const list = document.createElement('div');
      list.className = 'devanimals-counts-list';

      const animalList = (APP.animals ? APP.animals.eligibleAll() : APP.ANIMALS)
        .slice().sort((a, b) => a.displayName.localeCompare(b.displayName));

      animalList.forEach(animal => {
        const id = APP.animalId(animal);
        const currentCount = (APP.state.animalCompletionCounts || {})[id] || 0;

        const row = document.createElement('div');
        row.className = 'devanimals-counts-row';

        const thumb = document.createElement('img');
        thumb.className = 'devanimals-counts-thumb';
        thumb.src = animal.images.cartoon;
        thumb.alt = animal.displayName;
        thumb.onerror = () => { thumb.style.display = 'none'; };
        row.appendChild(thumb);

        const name = document.createElement('span');
        name.className = 'devanimals-counts-name';
        name.textContent = animal.displayName;
        row.appendChild(name);

        const stepper = document.createElement('div');
        stepper.className = 'devanimals-counts-stepper';

        const minusBtn = document.createElement('button');
        minusBtn.className = 'btn icon ghost';
        minusBtn.textContent = '−';
        minusBtn.setAttribute('aria-label', 'Decrease');

        const valueEl = document.createElement('span');
        valueEl.className = 'devanimals-counts-value';
        valueEl.textContent = currentCount;

        const plusBtn = document.createElement('button');
        plusBtn.className = 'btn icon ghost';
        plusBtn.textContent = '+';
        plusBtn.setAttribute('aria-label', 'Increase');

        function applyCount(n) {
          const clamped = Math.max(0, n);
          APP.state.animalCompletionCounts = APP.state.animalCompletionCounts || {};
          APP.state.animalCompletionCounts[id] = clamped;
          // Keep completedAnimals in sync: animals with count > 0 have been seen
          if (clamped > 0) {
            APP.state.completedAnimals.add(id);
          } else {
            APP.state.completedAnimals.delete(id);
          }
          APP.saveProgress();
          valueEl.textContent = clamped;
          minusBtn.disabled = clamped === 0;
        }

        minusBtn.disabled = currentCount === 0;
        minusBtn.addEventListener('click', () => {
          applyCount((APP.state.animalCompletionCounts[id] || 0) - 1);
        });
        plusBtn.addEventListener('click', () => {
          applyCount((APP.state.animalCompletionCounts[id] || 0) + 1);
        });

        stepper.appendChild(minusBtn);
        stepper.appendChild(valueEl);
        stepper.appendChild(plusBtn);
        row.appendChild(stepper);
        list.appendChild(row);
      });

      body.appendChild(list);
    }

    draw();
    root.appendChild(wrap);
  }

  APP.screens = APP.screens || {};
  APP.screens.devanimals = { render };
})(window.APP);

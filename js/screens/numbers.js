window.APP = window.APP || {};

// Numbers practice screen — standalone tracing practice for digits 0-9.
// Modelled on the practice view in letters.js.
(function (APP) {
  const DIGITS = ['0','1','2','3','4','5','6','7','8','9'];

  function render(root, ctx) {
    root.innerHTML = '';

    // Active tracer instance — destroyed whenever digit changes or screen unmounts.
    let practiceTracer = null;

    const wrap = document.createElement('div');
    wrap.className = 'numbers-screen';

    // ── Top bar ──
    const bar = document.createElement('div');
    bar.className = 'topbar';
    bar.innerHTML = `
      <div class="group">
        <button class="btn icon ghost" data-act="home" aria-label="Home">${APP.ICONS.home}</button>
      </div>
      <div class="group">
        <span class="screen-title">${APP.t('landing.numbers')}</span>
      </div>
    `;
    wrap.appendChild(bar);

    bar.querySelector('[data-act=home]').addEventListener('click', () => {
      if (practiceTracer) { practiceTracer.destroy(); practiceTracer = null; }
      ctx.go('landing');
    });

    // ── Body ──
    const body = document.createElement('div');
    body.className = 'practice-panel';

    // Digit picker row
    const picker = document.createElement('div');
    picker.className = 'practice-picker';
    DIGITS.forEach(function (digit) {
      const btn = document.createElement('button');
      btn.className = 'practice-letter-btn';
      btn.textContent = digit;
      btn.addEventListener('click', function () { mountPractice(digit); });
      picker.appendChild(btn);
    });
    body.appendChild(picker);

    // Central stage — the tracer mounts here
    const stageWrap = document.createElement('div');
    stageWrap.className = 'practice-stage-wrap';
    const stage = document.createElement('div');
    stage.className = 'practice-stage';

    const placeholder = document.createElement('div');
    placeholder.className = 'practice-placeholder';
    placeholder.textContent = 'Select a number above to start practising';
    stage.appendChild(placeholder);

    stageWrap.appendChild(stage);
    body.appendChild(stageWrap);

    // Controls bar
    const controls = document.createElement('div');
    controls.className = 'practice-controls';

    const greatBtn = document.createElement('button');
    greatBtn.className = 'btn practice-great-btn';
    greatBtn.textContent = 'Great Job! 🎉';
    greatBtn.style.visibility = 'hidden';
    controls.appendChild(greatBtn);

    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn practice-reset-btn';
    resetBtn.textContent = 'Try Again';
    resetBtn.disabled = true;
    controls.appendChild(resetBtn);

    body.appendChild(controls);
    wrap.appendChild(body);
    root.appendChild(wrap);

    // Mount a digit into the practice stage
    function mountPractice(digit) {
      if (practiceTracer) { practiceTracer.destroy(); practiceTracer = null; }

      picker.querySelectorAll('.practice-letter-btn').forEach(function (b) {
        b.classList.toggle('active', b.textContent === digit);
      });

      stage.innerHTML = '';
      resetBtn.disabled = false;
      greatBtn.style.visibility = 'hidden';

      practiceTracer = APP.tracer.mount(stage, digit, {
        onComplete: function () {
          greatBtn.style.visibility = 'visible';
        }
      });
    }

    greatBtn.addEventListener('click', function () {
      APP.launchConfetti();
    });

    resetBtn.addEventListener('click', function () {
      const active = picker.querySelector('.practice-letter-btn.active');
      if (active) mountPractice(active.textContent);
    });

    // Default to digit '1' on first load
    mountPractice('1');
  }

  APP.screens = APP.screens || {};
  APP.screens.numbers = { render };
})(window.APP);

window.APP = window.APP || {};

(function (APP) {

  var ANIMAL_TYPE = {
    EAGLE:'bird', FLAMINGO:'bird', OWL:'bird', PARROT:'bird',
    PENGUIN:'bird', TOUCAN:'bird', HEN:'bird', DUCK:'bird',
    STORK:'bird', SWAN:'bird', KIWI:'bird', EMU:'bird',
    ANT:'insect', BEE:'insect', BUTTERFLY:'insect',
    DRAGONFLY:'insect', LADYBUG:'insect', GRASSHOPPER:'insect',
    DOLPHIN:'aquatic', FISH:'aquatic', WHALE:'aquatic',
    SEAHORSE:'aquatic', OCTOPUS:'aquatic', SHARK:'aquatic',
    CROCODILE:'reptile', LIZARD:'reptile', SNAKE:'reptile',
    TURTLE:'reptile', CHAMELEON:'reptile', IGUANA:'reptile',
  };

  function animalType(name) { return ANIMAL_TYPE[(name || '').toUpperCase()] || 'mammal'; }

  var TYPE_ANIMS = {
    bird:    ['ga-bird-bob',    'ga-bird-ruff'],
    insect:  ['ga-insect-buzz', 'ga-insect-hop'],
    aquatic: ['ga-aqua-sway',   'ga-aqua-dive'],
    reptile: ['ga-rept-tilt',   'ga-rept-lunge'],
    mammal:  ['ga-mamm-bounce', 'ga-mamm-wag'],
  };

  function injectAnimCss() {
    if (document.getElementById('gallery-anim-css')) return;
    var s = document.createElement('style');
    s.id = 'gallery-anim-css';
    s.textContent = [
      '@keyframes ga-bird-bob{0%,100%{transform:translateY(0) rotate(0)}35%{transform:translateY(-14px) rotate(-6deg)}70%{transform:translateY(-6px) rotate(5deg)}}',
      '@keyframes ga-bird-ruff{0%,100%{transform:rotate(0) scale(1)}20%{transform:rotate(-10deg) scale(1.06)}40%{transform:rotate(10deg) scale(1.06)}60%{transform:rotate(-6deg) scale(1.04)}80%{transform:rotate(6deg) scale(1.03)}}',
      '@keyframes ga-insect-buzz{0%,100%{transform:translate(0,0)}20%{transform:translate(3px,-3px) rotate(4deg)}40%{transform:translate(-3px,3px) rotate(-4deg)}60%{transform:translate(3px,2px)}80%{transform:translate(-2px,-3px) rotate(3deg)}}',
      '@keyframes ga-insect-hop{0%,100%{transform:translateY(0) scaleX(1)}25%{transform:translateY(-20px) scaleX(0.9)}50%{transform:translateY(0) scaleX(1.1)}65%{transform:translateY(-10px) scaleX(0.95)}}',
      '@keyframes ga-aqua-sway{0%,100%{transform:rotate(0) translateX(0)}30%{transform:rotate(-12deg) translateX(-10px)}70%{transform:rotate(12deg) translateX(10px)}}',
      '@keyframes ga-aqua-dive{0%,100%{transform:rotate(0) scale(1)}40%{transform:rotate(15deg) scale(0.9)}60%{transform:rotate(-5deg) scale(1.05)}}',
      '@keyframes ga-rept-tilt{0%,55%,100%{transform:rotate(0)}25%{transform:rotate(-18deg)}}',
      '@keyframes ga-rept-lunge{0%,100%{transform:scale(1) translateX(0)}30%{transform:scale(1.15) translateX(12px)}50%{transform:scale(1) translateX(0)}}',
      '@keyframes ga-mamm-bounce{0%,100%{transform:translateY(0) rotate(0)}25%{transform:translateY(-18px) rotate(-7deg)}50%{transform:translateY(-4px) rotate(4deg)}75%{transform:translateY(-14px) rotate(-4deg)}}',
      '@keyframes ga-mamm-wag{0%,100%{transform:rotate(0) scale(1)}20%{transform:rotate(-14deg) scale(1.05)}50%{transform:rotate(14deg) scale(1.05)}80%{transform:rotate(-8deg) scale(1.03)}}',
      '@keyframes ga-ring{0%,100%{box-shadow:0 0 0 0 rgba(167,139,250,0)}50%{box-shadow:0 0 0 10px rgba(167,139,250,0.5)}}',
      '.ga-ring{animation:ga-ring 0.45s ease;}',
      '.gallery-tile.unlocked img{transform-origin:center bottom;}',
    ].join('');
    document.head.appendChild(s);
  }

  function render(root, ctx) {
    root.innerHTML = '';
    injectAnimCss();

    // Show the current locale's animals.
    // Found-status is tracked by creature ID (image path), so completing "DOG" in
    // English marks the same creature as found when you switch to Portuguese (CÃO).
    const animalList = APP.animals ? APP.animals.eligibleAll() : (APP.ANIMALS || []);

    const total     = animalList.length;
    // Count only found creatures that are in this locale's list
    const localIds  = new Set(animalList.map(a => APP.animalId(a)));
    const doneCount = [...APP.state.completedAnimals].filter(id => localIds.has(id)).length;

    const wrap = document.createElement('div');
    wrap.className = 'gallery';

    // Header
    const countBadge = document.createElement('span');
    countBadge.className = 'gallery-count';
    countBadge.textContent = doneCount + ' / ' + total;

    const topbar = APP.ui.topbar({
      ctx: ctx,
      title: APP.t('landing.myAnimals'),
      home: true,
      back: true,
      right: [countBadge]
    });
    wrap.appendChild(topbar);

    // Grid
    const grid = document.createElement('div');
    grid.className = 'gallery-grid';

    var liveTiles = [];

    animalList.forEach(function (animal) {
      const done   = APP.state.completedAnimals.has(APP.animalId(animal));
      const imgSrc = animal.images.cartoon;

      const tile = document.createElement('div');
      tile.className = 'gallery-tile ' + (done ? 'unlocked' : 'locked');
      tile.dataset.animalName = animal.name;

      // Name row — full name when done, spaced underscores when locked
      const nameEl = document.createElement('div');
      nameEl.className = 'gallery-tile-name';
      if (done) {
        nameEl.textContent = animal.displayName;
      } else {
        // No space separator — CSS letter-spacing provides the gap.
        // Scale font-size so all underscores fit on one row.
        nameEl.textContent = Array(animal.name.length).fill('_').join('');
        nameEl.style.whiteSpace = 'nowrap';
        const n = animal.name.length;
        nameEl.style.fontSize = (n <= 6 ? 1.2 : n <= 8 ? 1.0 : n <= 10 ? 0.85 : 0.72) + 'rem';
      }

      tile.appendChild(nameEl);

      if (done) {
        // Stars row — sits in flex flow immediately below the name
        const starsRow = document.createElement('div');
        starsRow.className = 'gallery-stars-row';
        starsRow.innerHTML = APP.starsHtml ? APP.starsHtml(APP.animalStars(animal), 3) : '';
        tile.appendChild(starsRow);

        // Full image centred in remaining space
        const imgWrap = document.createElement('div');
        imgWrap.className = 'gallery-tile-full';

        const img = new Image();
        img.alt = animal.displayName;

        const fallback = document.createElement('div');
        fallback.className = 'gallery-fallback';
        fallback.textContent = animal.displayName[0].toUpperCase();
        fallback.style.display = 'none';

        img.onerror = () => { img.style.display = 'none'; fallback.style.display = 'flex'; };
        img.src = imgSrc;

        imgWrap.appendChild(img);
        imgWrap.appendChild(fallback);
        tile.appendChild(imgWrap);

        // Click animation + TTS
        var tileAnims = TYPE_ANIMS[animalType(animal.name)];
        var lastAnim = null;
        (function(t, imgEl, anim, displayName) {
          function playAnim() {
            var cls = anim[lastAnim === anim[0] ? 1 : 0];
            lastAnim = cls;
            imgEl.style.animation = '';
            imgEl.offsetWidth; // reflow to restart animation
            imgEl.style.animation = cls + ' 0.6s ease';
            t.classList.add('ga-ring');
            t.addEventListener('animationend', function h() {
              t.classList.remove('ga-ring');
              t.removeEventListener('animationend', h);
            });
            if (window.speechSynthesis) {
              window.speechSynthesis.cancel();
              var utt = new SpeechSynthesisUtterance(displayName);
              var langMap = { en:'en-GB', pt:'pt-PT', fr:'fr-FR', es:'es-ES', de:'de-DE', it:'it-IT' };
              var locale = APP.state && APP.state.settings && APP.state.settings.locale ? APP.state.settings.locale : 'en';
              utt.lang = langMap[locale] || 'en-GB';
              utt.rate = 0.85;
              window.speechSynthesis.speak(utt);
            }
          }
          t.addEventListener('pointerdown', playAnim);
          liveTiles.push({ t: t, img: imgEl, name: displayName });
        })(tile, img, tileAnims, animal.name);

      } else {
        // Spacer pushes the peek strip to the bottom
        const spacer = document.createElement('div');
        spacer.className = 'gallery-tile-spacer';
        tile.appendChild(spacer);

        // Peek strip — shows just the top portion of the image
        const peek = document.createElement('div');
        peek.className = 'gallery-tile-peek';

        const img = new Image();
        img.alt = '';
        img.src = imgSrc;
        // If image fails to load the peek is just empty — that's fine

        peek.appendChild(img);
        tile.appendChild(peek);
      }

      grid.appendChild(tile);
    });

    wrap.appendChild(grid);
    root.appendChild(wrap);

    // Periodic random animation — fires every 3.5–8 seconds on a random unlocked tile
    if (liveTiles.length > 0) {
      (function scheduleNext() {
        var delay = 3500 + Math.random() * 4500;
        var timer = setTimeout(function() {
          if (!document.contains(wrap)) return;
          var entry = liveTiles[Math.floor(Math.random() * liveTiles.length)];
          var anims = TYPE_ANIMS[animalType(entry.name)];
          var cls = anims[Math.floor(Math.random() * anims.length)];
          entry.img.style.animation = '';
          entry.img.offsetWidth;
          entry.img.style.animation = cls + ' 0.6s ease';
          scheduleNext();
        }, delay);
        wrap.addEventListener('DOMNodeRemovedFromDocument', function() { clearTimeout(timer); }, { once: true });
      })();
    }
  }

  APP.screens = APP.screens || {};
  APP.screens.gallery = { render };
})(window.APP);

// ─── Human Body data ──────────────────────────────────────────────────────────
//
// APP.BODY.layers    — body layers, outer → inner (skin … bones)
// APP.BODY.digestion — the journey of food, mouth → large intestine
//
// labelKey → i18n (all 6 locales). Short fact text is English-only in this data
// file (same convention as story prose) — flagged as a scope choice.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  APP.BODY = {
    layers: [
      { id: 'skin',    color: '#f3c9a0', badge: '🧑', labelKey: 'body.skin',
        fact: 'Your skin covers your whole body and keeps germs out.' },
      { id: 'muscles', color: '#cf5b53', badge: '💪', labelKey: 'body.muscles',
        fact: 'Muscles pull on your bones to help you move and play.' },
      { id: 'nerves',  color: '#f2c14e', badge: '⚡', labelKey: 'body.nerves',
        fact: 'Nerves carry fast messages between your body and your brain.' },
      { id: 'organs',  color: '#d98cb3', badge: '❤️', labelKey: 'body.organs',
        fact: 'Organs like your heart and lungs keep you alive inside.' },
      { id: 'bones',   color: '#ecebe2', badge: '🦴', labelKey: 'body.bones',
        fact: 'Bones make a strong frame that holds your whole body up.' }
    ],
    digestion: [
      { id: 'mouth',    badge: '👄', labelKey: 'body.mouth',
        fact: 'Your mouth chews the food into small, soft pieces.' },
      { id: 'foodpipe', badge: '⬇️', labelKey: 'body.foodpipe',
        fact: 'The food slides down a tube called the food pipe.' },
      { id: 'stomach',  badge: '🟠', labelKey: 'body.stomach',
        fact: 'Your stomach squishes the food into a mush.' },
      { id: 'smallInt', badge: '🌀', labelKey: 'body.smallInt',
        fact: 'The small intestine takes the good bits for your body.' },
      { id: 'largeInt', badge: '➰', labelKey: 'body.largeInt',
        fact: 'The large intestine soaks up the last of the water.' }
    ]
  };
})(window.APP);

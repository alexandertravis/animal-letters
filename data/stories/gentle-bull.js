// ─── The Gentle Bull ──────────────────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: it is brave to be yourself, even when others expect otherwise.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    bull: `Barnaby the bull: a big broad-shouldered bull with curved horns and a soft, dreamy expression, who would rather smell the flowers than charge about, with a daisy often tucked behind one ear.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'gentle-bull',
    title:    { en: "The Gentle Bull" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'sienna', board: null, color: '#8a4a2a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['bull'], coverAnimal: 'bull',
    requirements: [{ animalId: 'bull', minCount: 1, label: 'Find the Bull' }],
    cover: {
      image: 'assets/images/cartoon/bull.svg',
      imageAlt: 'A big bull smelling a daisy in a sunny flower meadow, calm and content.',
      imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby the bull stands peacefully in a flower meadow, gently smelling a daisy.', composition: 'Big calm bull among bright flowers.', light: 'Warm sunny meadow light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Barnaby was the biggest, broadest bull in the green valley, with grand curved horns and shoulders like boulders. Everyone expected him to be fierce and to stamp and to snort. But Barnaby liked nothing better than to smell the flowers.` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A large bull peacefully smelling flowers in a meadow.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'The big bull stands peacefully smelling flowers in a sunlit meadow.', composition: 'Bull lowered to the blooms.', light: 'Bright meadow light.' }) },
      { id: 2, text: { en: `While the other young bulls butted heads and kicked up dust and bellowed to show how mighty they were, Barnaby would wander off to the quiet corner of the field, where the daisies grew thickest, and sit and breathe their sweet smell.` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A bull resting among daisies as others tussle in the distance.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby rests among daisies while other bulls tussle and kick dust in the distance.', composition: 'Calm bull foreground, rowdy bulls behind.', light: 'Warm afternoon light.' }) },
      { id: 3, text: { en: `"You're a bull!" the others snorted. "Bulls are supposed to be FIERCE. Why don't you charge? Why don't you stamp? You're far too gentle!" Barnaby only smiled and tucked another daisy behind his ear.` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A bull with a daisy behind his ear smiling calmly.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby smiles calmly, a daisy tucked behind one ear, untroubled by the teasing.', composition: 'Close on the serene daisy-decked bull.', light: 'Soft warm light.' }) },
      { id: 4, text: { en: `One day a great commotion broke out. A little calf had wandered onto the rickety old bridge over the gorge, and a board had cracked, and now the calf stood frozen and frightened above the rushing water below, afraid to move a hoof.` },
        image: 'assets/images/cartoon/cow.svg', imageAlt: 'A small calf frozen on a broken bridge over a gorge.',
        imagePrompt: P({ scene: 'A small calf stands frozen and frightened on a cracked old bridge above a rushing gorge.', composition: 'Tiny calf on a precarious bridge.', light: 'Tense bright light.' }) },
      { id: 5, text: { en: `The fierce young bulls rushed up, snorting and stamping — but all their charging and bellowing only shook the bridge and frightened the calf more. "Stop!" called Barnaby. "Stamping won't help. This needs a gentle touch."` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A calm bull holding up a hoof to stop the charging bulls.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby raises a calm hoof to halt the snorting, stamping young bulls near the bridge.', composition: 'Calm bull stilling the rowdy others.', light: 'Bright tense light.' }) },
      { id: 6, text: { en: `Slowly, softly, Barnaby stepped onto the bridge. He did not stamp. He did not rush. He spoke in his low, kind voice. "There now, little one. I'm here. Just follow me, one small step at a time. I won't let you fall."` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A bull stepping gently onto a bridge toward a scared calf.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby steps gently and slowly onto the bridge, speaking softly to the frightened calf.', composition: 'Big gentle bull approaching small calf.', light: 'Careful bright light.' }) },
      { id: 7, text: { en: `Step by careful step, Barnaby guided the calf back along the safe boards, his great calm body between the little one and the drop. At last they both stepped onto solid ground, and the whole valley let out its breath.` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A bull guiding a calf safely off the bridge to solid ground.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby guides the calf safely off the bridge onto solid ground.', composition: 'Bull and calf reaching safety.', light: 'Relieved warm light.' }) },
      { id: 8, text: { en: `The fierce young bulls were silent. "Your gentleness," one finally admitted, "did what all our charging never could." Barnaby nodded kindly. "Being gentle isn't being weak," he said. "Sometimes it takes the most strength of all."` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'Young bulls looking humbled at the gentle bull and the safe calf.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'The young bulls look humbled at Barnaby standing protectively beside the rescued calf.', composition: 'Gentle bull and calf, humbled bulls.', light: 'Warm afternoon light.' }) },
      { id: 9, text: { en: `From that day, no one teased Barnaby for being gentle. He went on smelling the flowers in his quiet corner — but now, when the others passed, they often stopped to smell them too. And the valley was a kinder place for it.` },
        image: 'assets/images/cartoon/bull.svg', imageAlt: 'A bull and other bulls peacefully smelling flowers together.',
        imagePrompt: P({ cast: [CAST.bull], scene: 'Barnaby and the once-fierce bulls now peacefully smell flowers together in the meadow.', composition: 'Group of bulls calm among blooms.', light: 'Golden evening light.' }) }
    ],
    closing: {
      text: { en: `For the biggest, broadest bull in the valley had shown them all that the bravest thing of all is simply to be gently, truly yourself.` },
      image: 'assets/images/cartoon/bull.svg', imageAlt: 'A single daisy resting on the sunlit grass.',
      imagePrompt: P({ scene: 'End vignette: a single daisy resting on warm sunlit meadow grass.', composition: 'Simple still life of one flower.', light: 'Soft golden light.' })
    }
  }));
})(window.APP);

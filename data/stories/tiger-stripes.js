// ─── The Tiger Who Lost His Stripes ───────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: what makes you you was never really lost.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var CAST = {
    tiger: `Tomas the tiger: a young orange tiger with bold black stripes and round earnest eyes, brave but a little unsure of himself, padding softly through the jungle.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'tiger-stripes',
    title:    { en: "The Tiger Who Lost His Stripes" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'terracotta', board: null, color: '#c2591f',
    wordCount: 430, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['tiger'], coverAnimal: 'tiger',
    requirements: [{ animalId: 'tiger', minCount: 1, label: 'Find the Tiger' }],
    cover: {
      image: 'assets/images/cartoon/tiger.svg',
      imageAlt: 'A young striped tiger looking at his own reflection in a jungle pool.',
      imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas the tiger gazes at his striped reflection in a still jungle pool.', composition: 'Tiger above, reflection below, framed by leaves.', light: 'Dappled green jungle light.' })
    },
    paragraphs: [
      { id: 1, text: { en: `Tomas was a young tiger, and he was very proud of his stripes. They were the boldest, blackest stripes in the whole jungle, and he checked them every morning in the still water of the pool.` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger admiring his stripes in a pool.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas leans over the pool admiring his bold reflection.', composition: 'Close on tiger and mirrored stripes.', light: 'Cool morning light through leaves.' }) },
      { id: 2, text: { en: `One foggy morning, Tomas woke up and could not see his stripes at all. The fog was so thick and so white that his orange fur looked plain and pale. "My stripes!" he cried. "They've gone!"` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger looking down at himself in thick white fog, alarmed.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas stands in thick white fog, looking down at his own dim, washed-out fur in alarm.', composition: 'Tiger softened and pale inside swirling fog.', light: 'Flat white foggy light.' }) },
      { id: 3, text: { en: `He ran to the old owl in the tree. "I have lost my stripes! Have you seen them?" The owl blinked slowly. "Hmm," she said. "Stripes do not usually wander off. But go and ask the others. Look carefully."` },
        image: 'assets/images/cartoon/owl.svg', imageAlt: 'A wise owl on a branch speaking to a worried tiger below.',
        imagePrompt: P({ scene: 'A calm owl on a branch looks down at the anxious foggy tiger asking for help.', composition: 'Owl upper, tiger lower in the mist.', light: 'Soft grey foggy light.' }) },
      { id: 4, text: { en: `Tomas asked the parrot, who was busy with her own bright feathers. He asked the snake, who only said "Sssorry." He asked the deer, who had no stripes to spare. Nobody had seen them.` },
        image: 'assets/images/cartoon/parrot.svg', imageAlt: 'A tiger asking a colourful parrot for help in the fog.',
        imagePrompt: P({ scene: 'A worried tiger speaks with a bright parrot among misty branches.', composition: 'Parrot perched, tiger looking up hopefully.', light: 'Pale foggy daylight.' }) },
      { id: 5, text: { en: `Sad and stripeless, Tomas sat by the pool to wait for the fog to lift. As the sun rose higher, the white mist began to thin, drifting away in soft ribbons between the trees.` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger sitting glumly by a pool as fog begins to lift.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas sits glumly by the pool while thinning fog drifts away in ribbons.', composition: 'Tiger small by the water, mist clearing behind.', light: 'Brightening hazy light.' }) },
      { id: 6, text: { en: `And there, in the clearing water, his reflection came slowly back — orange, and then bolder, and then striped, black as ever. "They were here all along!" he gasped. "The fog only hid them."` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger seeing his bold stripes return in the pool as fog clears.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas beams as his bold stripes reappear in the clearing reflection.', composition: 'Joyful close shot, tiger and bright reflection.', light: 'Warm sunlight breaking through.' }) },
      { id: 7, text: { en: `The old owl glided down. "You see," she said, "the fog did not take your stripes. It only made it hard to see them. The things that make us who we are do not disappear so easily."` },
        image: 'assets/images/cartoon/owl.svg', imageAlt: 'An owl speaking kindly to a happy tiger by the pool.',
        imagePrompt: P({ scene: 'The owl alights beside the relieved tiger, speaking gently in the clearing.', composition: 'Owl and tiger together by the bright pool.', light: 'Warm dappled morning light.' }) },
      { id: 8, text: { en: `Tomas thought about that. "Then I do not need to check them every morning to be sure," he said. "They are mine whether I can see them or not." The owl nodded, pleased.` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger standing tall and confident in the sunshine.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas stands tall and confident in a sunlit clearing, no longer anxious.', composition: 'Proud upright pose in the light.', light: 'Full warm morning sun.' }) },
      { id: 9, text: { en: `After that, Tomas walked through the jungle a little braver than before. And whenever the fog rolled in, he was not afraid. He knew his stripes were waiting, patient and bold, for the sun.` },
        image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A tiger padding calmly through misty jungle, unafraid.',
        imagePrompt: P({ cast: [CAST.tiger], scene: 'Tomas pads calmly and confidently through soft morning mist between the trees.', composition: 'Tiger walking, mist around but no longer worrying.', light: 'Gentle hazy light.' }) }
    ],
    closing: {
      text: { en: `And the boldest stripes in the jungle stayed exactly where they belonged — on the tiger who had learned to trust them.` },
      image: 'assets/images/cartoon/tiger.svg', imageAlt: 'A still jungle pool reflecting orange and black stripes among leaves.',
      imagePrompt: P({ scene: 'End vignette: a still jungle pool holding the gentle reflection of orange-and-black stripes, framed by leaves.', composition: 'Quiet reflection still life.', light: 'Soft warm light.' })
    }
  }));
})(window.APP);

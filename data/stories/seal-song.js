// ─── The Seal Who Found Her Song ──────────────────────────────────────────────
// Original gentle tale. ~9 pages. Moral: your own voice is worth sharing.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/seal.svg';
  var CAST = {
    seal: `Sasha the seal: a sleek silvery-grey seal pup with enormous dark eyes, long whiskers and a shy, sweet face; small among the big seals of the rocks.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'seal-song',
    title:    { en: "The Seal Who Found Her Song" },
    subtitle: 'an original tale',
    skin: 'classic', leather: 'dustblue', board: null, color: '#5a7a8a',
    wordCount: 420, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['seal'], coverAnimal: 'seal',
    requirements: [{ animalId: 'seal', minCount: 1, label: 'Find the Seal' }],
    cover: {
      image: IMG, imageAlt: 'A small seal sitting on a rock by the moonlit sea.',
      imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha the seal pup sits alone on a rock beside the moonlit sea, looking shy.', composition: 'Small seal on a rock, wide sea behind.', light: 'Cool silver moonlight on water.' })
    },
    paragraphs: [
      { id: 1, text: { en: `On the grey rocks at the edge of the sea lived a young seal named Sasha. Every evening, when the moon rose, all the seals would lift their heads and sing — a deep, rolling, beautiful song that drifted far out over the waves. All the seals, that is, except Sasha.` },
        image: IMG, imageAlt: 'Many seals singing on the rocks while one small seal stays quiet.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'The grown seals sing on the moonlit rocks while little Sasha stays quiet at the edge.', composition: 'Chorus of seals, one small silent pup.', light: 'Silver moonlight.' }) },
      { id: 2, text: { en: `Sasha longed to join in. But whenever she opened her mouth to sing, her voice came out small and wobbly, and she felt so shy that she swallowed it right back down. "My song isn't grand like theirs," she sighed. "Better to say nothing at all than to sound silly."` },
        image: IMG, imageAlt: 'A shy little seal looking down, afraid to sing.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha looks down shyly, too nervous to let her small song out.', composition: 'Lone seal, head lowered.', light: 'Soft cool night light.' }) },
      { id: 3, text: { en: `So Sasha kept her song hidden away, deep down inside, where no one could ever hear it. And the longer she kept it hidden, the harder it became to imagine ever letting it out, until she had almost forgotten the song was there at all.` },
        image: IMG, imageAlt: 'A seal alone on a rock looking out to sea at night.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha sits alone gazing out to sea, her song locked quietly inside.', composition: 'Solitary seal, vast dark water.', light: 'Pale moon over waves.' }) },
      { id: 4, text: { en: `Then one foggy night, the fog came down so thick that no one could see a flipper in front of their face. And out on the cold water, a tiny seal pup, littler even than Sasha, became lost — too far from the rocks to find the way back, and far too frightened to call.` },
        image: IMG, imageAlt: 'A tiny seal lost in thick fog on the dark sea.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'A tiny lost seal pup drifts frightened in thick fog far from the rocks.', composition: 'Small pup swallowed by fog.', light: 'Dim grey fog, no moon.' }) },
      { id: 5, text: { en: `The big seals tried to sing the lost pup home, but their deep voices boomed and bounced in the fog until no one could tell which way was which. The little pup only grew more muddled and more afraid, paddling in helpless circles in the dark.` },
        image: IMG, imageAlt: 'Seals singing into the fog trying to guide a lost pup.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'The grown seals boom into the fog, but their deep song echoes and confuses.', composition: 'Seals calling, fog swallowing the sound.', light: 'Thick muffling fog.' }) },
      { id: 6, text: { en: `Sasha's heart ached for the frightened pup. And deep inside her, the little hidden song began to stir. It was not deep and grand like the others — it was high and clear and sweet, like a silver thread. Perhaps, she thought, a clear small voice could cut through the fog where the big ones could not.` },
        image: IMG, imageAlt: 'A small seal taking a brave breath, ready to sing.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha lifts her head and takes a brave breath, her own song rising inside.', composition: 'Little seal gathering courage.', light: 'Faint glow through fog.' }) },
      { id: 7, text: { en: `She opened her mouth, and out it came at last — a high, clear, lovely song, ringing bright and true across the water. It did not boom or bounce. It flew straight as a moonbeam through the fog, on and on, all the way to one small, lost, listening pup.` },
        image: IMG, imageAlt: 'A seal singing a clear bright song across the foggy sea.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha sings a clear bright song that flies straight across the foggy water.', composition: 'Seal singing, a clear path through the fog.', light: 'Song seeming to part the fog.' }) },
      { id: 8, text: { en: `The little pup heard it — a single clear voice to follow — and swam toward it through the fog, closer and closer, until at last it bumped safe and sound right up onto the rocks. The big seals stared in wonder at Sasha. "Your song saved her," they said softly.` },
        image: IMG, imageAlt: 'A rescued pup safe on the rocks beside the singing seal.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'The little pup arrives safe on the rocks, guided home by Sasha\'s song.', composition: 'Reunion on the rocks, seals amazed.', light: 'Fog thinning, moon returning.' }) },
      { id: 9, text: { en: `Sasha glowed with quiet pride. Her song was not the same as anyone else's — and that, she finally understood, was exactly what made it precious. From that night on she sang every evening with all the rest, her clear bright thread shining through the great rolling song of the seals.` },
        image: IMG, imageAlt: 'A happy seal singing proudly among the others under the moon.',
        imagePrompt: P({ cast: [CAST.seal], scene: 'Sasha sings proudly among the chorus, her clear voice bright among the deep.', composition: 'Seal singing happily with the group.', light: 'Clear moonlight, calm sea.' }) }
    ],
    closing: {
      text: { en: `For there is no voice in all the world quite like your own — and the day you are brave enough to share it may be the very day someone needs it most.` },
      image: IMG, imageAlt: 'The calm moonlit sea after the fog has lifted.',
      imagePrompt: P({ scene: 'End vignette: the calm moonlit sea, smooth and silver after the fog has lifted.', composition: 'Simple peaceful seascape.', light: 'Serene silver moonlight.' })
    }
  }));
})(window.APP);

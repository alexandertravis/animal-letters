// ─── The Sheep Who Counted the Stars ──────────────────────────────────────────
// Original gentle bedtime tale. ~9 pages. Soft counting theme; moral: rest comes
// to a calm and grateful heart.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/sheep.svg';
  var CAST = {
    sheep: `Woolly the sheep: a small round lamb with a soft cloud of cream-white fleece, a dark gentle face and sleepy eyes, standing in a moonlit meadow.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'counting-sheep',
    title:    { en: "The Sheep Who Counted the Stars" },
    subtitle: 'an original bedtime tale',
    skin: 'classic', leather: 'arctic', board: null, color: '#7a8aa0',
    wordCount: 415, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['sheep'], coverAnimal: 'sheep',
    requirements: [{ animalId: 'sheep', minCount: 1, label: 'Find the Sheep' }],
    cover: {
      image: IMG, imageAlt: 'A fluffy lamb gazing up at a starry sky in a moonlit meadow.',
      imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly the lamb gazes up at a sky full of stars in a calm moonlit meadow.', composition: 'Small lamb below a wide starry sky.', light: 'Soft silver moonlight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `In a soft green meadow lived a little lamb named Woolly. All the other sheep had a most important job: when a child somewhere could not sleep, that child would count sheep, and one by one the flock would hop gently over a gate in the child's sleepy imagination.` },
        image: IMG, imageAlt: 'A flock of sheep hopping over a gate in a dreamy meadow.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'A dreamy line of sheep hop softly over a wooden gate in a moonlit meadow.', composition: 'Sheep leaping the gate in a gentle row.', light: 'Hazy dreamlike moonlight.' }) },
      { id: 2, text: { en: `Woolly loved her job. She was sheep number one, always first over the gate. Hop — "one!" And off a sleepy child would drift. But there was one small trouble: helping everyone ELSE fall asleep was lovely work, yet Woolly herself could never seem to nod off at all.` },
        image: IMG, imageAlt: 'A wide-awake lamb watching the others sleep.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly lies wide awake while the rest of the flock sleeps peacefully around her.', composition: 'One alert lamb among sleeping sheep.', light: 'Quiet blue night.' }) },
      { id: 3, text: { en: `Night after night, Woolly lay in the cool grass with her eyes wide open. "It isn't fair," she sighed. "I send the whole world to sleep, but who is there to send ME?" She tried counting the other sheep, but she knew them all far too well to find it the least bit dozy.` },
        image: IMG, imageAlt: 'A sleepless lamb sighing in the grass at night.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly sighs, sleepless, lying in the cool grass under the stars.', composition: 'Restless lamb, sleeping flock behind.', light: 'Pale moonlight.' }) },
      { id: 4, text: { en: `One night, the wise old ewe found Woolly still awake. "Little one," she said softly, "you count sheep for the children. But have you ever tried counting something for yourself? Look up. The sky is full of quiet little lights. Try counting those." Woolly turned her face to the stars.` },
        image: IMG, imageAlt: 'An old ewe pointing a young lamb toward the stars.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'A wise old ewe gently turns Woolly\'s gaze up toward the starry sky.', composition: 'Two sheep looking up together.', light: 'Tender moon-and-star light.' }) },
      { id: 5, text: { en: `So Woolly began to count the stars. "One..." — a bright one over the hill. "Two, three..." — a little pair near the moon. "Four, five, six..." Her voice grew soft and slow. The numbers floated up like bubbles, and with each one her heavy eyelids drooped a little lower.` },
        image: IMG, imageAlt: 'A lamb softly counting stars, growing sleepy.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly counts the stars softly, her eyelids growing heavy and slow.', composition: 'Sleepy lamb, twinkling stars above.', light: 'Dreamy star-glow.' }) },
      { id: 6, text: { en: `"Seven... eight... nine..." The meadow was so quiet and the night so kind. Woolly was not in a hurry now, not trying so hard — just counting, gently, grateful for each small light. "Ten..." she breathed. And somewhere between ten and eleven, the loveliest thing began to happen.` },
        image: IMG, imageAlt: 'A very sleepy lamb half-closing its eyes under the stars.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly\'s eyes droop nearly shut as she counts on, calm and unhurried.', composition: 'Lamb almost asleep beneath the stars.', light: 'Soft fading starlight.' }) },
      { id: 7, text: { en: `Her counting slowed... and slowed... and turned into a dream. She dreamed she was floating up among the stars themselves, soft as a cloud, warm as wool, with the gentle moon for a pillow. And for the very first time, little Woolly was fast, fast asleep.` },
        image: IMG, imageAlt: 'A sleeping lamb dreaming among soft clouds and stars.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly sleeps at last, dreaming she floats softly among the warm stars.', composition: 'Dreaming lamb adrift among clouds and stars.', light: 'Gentle dreamlit glow.' }) },
      { id: 8, text: { en: `When the morning came, Woolly woke feeling wonderful — bright and rested and new. She had found her own way to sleep at last. And it had been there all along, hanging quietly over her head every single night, just waiting for her to look up and count.` },
        image: IMG, imageAlt: 'A happy rested lamb waking in a sunny morning meadow.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly wakes bright and rested in a sunny morning meadow.', composition: 'Refreshed lamb in golden grass.', light: 'Soft sunrise gold.' }) },
      { id: 9, text: { en: `So now, when Woolly has sent all the world's children off to sleep, hop by gentle hop, she lies back in the cool grass, turns her face to the sky, and counts her own soft way to dreamland — one star, two stars, three... and a very good night to you, too.` },
        image: IMG, imageAlt: 'A content lamb counting stars peacefully at night.',
        imagePrompt: P({ cast: [CAST.sheep], scene: 'Woolly lies content, counting stars peacefully on her own at night.', composition: 'Calm lamb beneath a starry sky.', light: 'Peaceful silver night.' }) }
    ],
    closing: {
      text: { en: `So when sleep will not come, do as Woolly does: lie still, look up, breathe slow, and count the quiet little lights — one... two... three... goodnight.` },
      image: IMG, imageAlt: 'A few soft stars and a crescent moon over a quiet meadow.',
      imagePrompt: P({ scene: 'End vignette: a crescent moon and a few soft stars over a quiet sleeping meadow.', composition: 'Simple peaceful night sky.', light: 'Calm moonlit hush.' })
    }
  }));
})(window.APP);

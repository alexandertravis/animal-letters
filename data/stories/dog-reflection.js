// ─── The Dog and His Reflection ───────────────────────────────────────────────
// Gentle retelling of the Aesop fable. ~9 pages. Moral: grasping for more can lose
// the good thing you already have.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var P = APP.storyPrompt;
  var IMG = 'assets/images/cartoon/dog.svg';
  var CAST = {
    dog: `Barker the dog: a friendly tan-and-white farm dog with floppy ears, a wagging tail and an eager, open face.`
  };
  APP.STORIES = APP.STORIES || [];
  APP.STORIES.push(new APP.Story({
    id:       'dog-reflection',
    title:    { en: "The Dog and His Reflection" },
    subtitle: 'after Aesop',
    skin: 'classic', leather: 'tan', board: null, color: '#b58a4a',
    wordCount: 410, readMinutes: 4, readingAge: { listen: '3-6', read: '6+' },
    animals: ['dog'], coverAnimal: 'dog',
    requirements: [{ animalId: 'dog', minCount: 1, label: 'Find the Dog' }],
    cover: {
      image: IMG, imageAlt: 'A happy dog carrying a bone across a little bridge.',
      imagePrompt: P({ cast: [CAST.dog], scene: 'Barker the dog trots happily across a little plank bridge with a fine bone in his mouth.', composition: 'Dog with bone on a bridge over a stream.', light: 'Bright cheerful daylight.' })
    },
    paragraphs: [
      { id: 1, text: { en: `A cheerful farm dog named Barker had a wonderful piece of luck one morning: he found the finest, meatiest bone he had ever seen, left over from the butcher's cart. "What a treasure!" he woofed, scooping it up. "I shall take it somewhere quiet, all to myself, and enjoy every bit."` },
        image: IMG, imageAlt: 'A delighted dog finding a big meaty bone.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'Barker delightedly scoops up a fine big bone he has found.', composition: 'Happy dog with his treasure.', light: 'Bright morning light.' }) },
      { id: 2, text: { en: `So off he trotted, tail wagging proudly, the splendid bone clamped tight in his jaws. His path home led him over a little wooden bridge that crossed a slow, clear stream. Barker stepped onto the planks, happy as could be, thinking only of the lovely feast to come.` },
        image: IMG, imageAlt: 'A proud dog trotting onto a bridge with his bone.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'Barker trots proudly onto the wooden bridge, bone held tight.', composition: 'Dog crossing the bridge over the stream.', light: 'Warm clear light.' }) },
      { id: 3, text: { en: `Halfway across, Barker happened to glance down into the still water below. And there — looking right back up at him — was another dog! And THAT dog had a bone too, every bit as big and meaty as his own. Barker did not understand that he was only seeing himself, reflected in the stream.` },
        image: IMG, imageAlt: 'A dog peering down at his own reflection in a stream.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'Barker peers down and sees his own reflection — a dog with a bone — in the still water.', composition: 'Dog above, mirror-dog below in the water.', light: 'Calm reflective light.' }) },
      { id: 4, text: { en: `"Another dog!" thought Barker, with a flash of greed. "And HIS bone looks even bigger than mine! Two bones would be far better than one. If I bark at him and frighten him, perhaps he'll drop it — and then I shall have BOTH." It did not once cross his mind to be content with the fine bone he already had.` },
        image: IMG, imageAlt: 'A greedy-eyed dog eyeing the reflection\'s bone.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'Barker eyes the reflection\'s bone greedily, wanting both for himself.', composition: 'Covetous dog over the water.', light: 'Bright, slightly tense light.' }) },
      { id: 5, text: { en: `So Barker opened his mouth wide to give the other dog a great big bark — "WOOF!" But the moment he opened his jaws, his own splendid bone slipped right out, tumbled down through the air, and fell into the stream with a great big SPLASH.` },
        image: IMG, imageAlt: 'A dog\'s bone falling into the water as he barks.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'As Barker barks, his bone tumbles from his mouth and splashes into the stream.', composition: 'Bone falling, ripples spreading.', light: 'Bright splashing water.' }) },
      { id: 6, text: { en: `The ripples spread, and the water churned, and the other dog with the other bone vanished in a blur — for of course there never had been another dog at all. And worse, far worse: Barker's own wonderful bone was gone too, sunk down deep into the stream, lost for good.` },
        image: IMG, imageAlt: 'A dismayed dog staring at the empty rippling water.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'Barker stares dismayed at the empty, rippling water where both bones have vanished.', composition: 'Crestfallen dog over the disturbed stream.', light: 'Cooler, deflated light.' }) },
      { id: 7, text: { en: `Barker stood on the bridge with his ears drooping and his stomach rumbling, and not a single bone to his name. "Oh, what a foolish dog I've been," he whimpered. "I had a perfectly wonderful bone — and I lost it, all because I was greedy for one I didn't even need."` },
        image: IMG, imageAlt: 'A sad hungry dog with drooping ears on the bridge.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'A sad, hungry Barker droops on the bridge, having lost his bone to greed.', composition: 'Forlorn dog, empty bridge.', light: 'Soft regretful light.' }) },
      { id: 8, text: { en: `A kind old sheepdog ambled by and sat beside him. "There now," she said. "It's a hard way to learn it, but a good lesson all the same. The grass is not always greener, nor the bone always bigger, on the other side. Be glad of what you have, and you'll never go hungry in your heart."` },
        image: IMG, imageAlt: 'A wise old sheepdog comforting the sad dog.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'A kind old sheepdog sits beside Barker, offering gentle comfort and wisdom.', composition: 'Two dogs together on the bridge.', light: 'Warm gentle light.' }) },
      { id: 9, text: { en: `Barker never forgot it. From that day on, whenever he was lucky enough to find a bone, he held it tight and enjoyed it with a grateful heart — and never again let a greedy daydream of MORE make him drop the good thing he already had. And he never went hungry from greed again.` },
        image: IMG, imageAlt: 'A content dog happily enjoying a bone, grateful at last.',
        imagePrompt: P({ cast: [CAST.dog], scene: 'A wiser, content Barker happily enjoys a bone, grateful for what he has.', composition: 'Satisfied dog with his bone.', light: 'Warm contented light.' }) }
    ],
    closing: {
      text: { en: `For the one who is always grasping for more may let slip the good thing in his paws — but a grateful heart is full already.` },
      image: IMG, imageAlt: 'A calm clear stream flowing under a little bridge.',
      imagePrompt: P({ scene: 'End vignette: a calm clear stream flowing quietly beneath a little wooden bridge.', composition: 'Simple peaceful stream scene.', light: 'Soft settled light.' })
    }
  }));
})(window.APP);

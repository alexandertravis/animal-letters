window.APP = window.APP || {};

(function (APP) {
  function eligible(maxLength) {
    return APP.ANIMALS.filter(a => a.name.length <= maxLength);
  }

  APP.animals = {
    pickRandom(maxLength, exclude) {
      const pool = eligible(maxLength).filter(a => !exclude || a.name !== exclude.name);
      // Only compute the full eligible list when the exclusion-filtered pool is empty
      // (i.e. there is only one eligible animal and it is the one being excluded).
      const list = pool.length ? pool : eligible(maxLength);
      if (list.length === 0) return null;
      return list[Math.floor(Math.random() * list.length)];
    },

    // Smarter picker used for "Next Animal" and auto-advance between rounds.
    // After 2 consecutive completions of already-found animals, biases toward
    // unfound animals so children are guided toward completing the gallery.
    // Falls back to normal random selection when all animals have been found,
    // or when the streak hasn't reached 2 yet.
    // Skipping animals does not affect the streak — only completions count.
    pickNext(maxLength, exclude) {
      if (APP.state.consecutiveFoundCount >= 2) {
        const unfound = eligible(maxLength).filter(
          a => !APP.state.completedAnimals.has(a.name)
        );
        if (unfound.length > 0) {
          // Exclude the just-played animal from unfound too — no immediate repeats.
          const pool = exclude ? unfound.filter(a => a.name !== exclude.name) : unfound;
          const list = pool.length ? pool : unfound;
          return list[Math.floor(Math.random() * list.length)];
        }
      }
      // Streak below threshold, or no unfound animals left: normal random.
      return this.pickRandom(maxLength, exclude);
    },

    eligibleCount(maxLength) {
      return eligible(maxLength).length;
    }
  };
})(window.APP);

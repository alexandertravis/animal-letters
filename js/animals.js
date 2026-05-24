window.APP = window.APP || {};

(function (APP) {
  // Return the animal list for the active locale.
  // Falls back to the English list if no locale-specific list exists.
  function getAnimalList() {
    const locale = APP.state && APP.state.settings.locale;
    if (locale && locale !== 'en') {
      const list = APP['ANIMALS_' + locale.toUpperCase()];
      if (list && list.length) return list;
    }
    return APP.ANIMALS;
  }

  function eligible(maxLength) {
    return getAnimalList().filter(a => a.name.length <= maxLength);
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
          a => !APP.state.completedAnimals.has(APP.animalId(a))
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
    },

    // All animals for the current locale (no length filter).
    // Used by setup.js to compute the slider min/max from the active list.
    eligibleAll() {
      return getAnimalList();
    },

    // Return the localised display name for an animal identified by its animalId
    // (the lowercase image filename stem, e.g. 'bear'). Falls back to a
    // capitalised form of the id if the animal isn't in the active locale list.
    displayName(animalId) {
      const list = getAnimalList();
      for (let i = 0; i < list.length; i++) {
        if (APP.animalId(list[i]) === animalId) return list[i].displayName;
      }
      return animalId.charAt(0).toUpperCase() + animalId.slice(1);
    }
  };
})(window.APP);

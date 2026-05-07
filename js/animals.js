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
    eligibleCount(maxLength) {
      return eligible(maxLength).length;
    }
  };
})(window.APP);

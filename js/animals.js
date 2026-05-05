window.APP = window.APP || {};

(function (APP) {
  function eligible(maxLength) {
    return APP.ANIMALS.filter(a => a.name.length <= maxLength);
  }

  APP.animals = {
    pickRandom(maxLength, exclude) {
      const pool = eligible(maxLength).filter(a => !exclude || a.name !== exclude.name);
      const fallback = eligible(maxLength);
      const list = pool.length ? pool : fallback;
      if (list.length === 0) return null;
      return list[Math.floor(Math.random() * list.length)];
    },
    eligibleCount(maxLength) {
      return eligible(maxLength).length;
    }
  };
})(window.APP);

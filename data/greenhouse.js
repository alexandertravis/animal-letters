window.APP = window.APP || {};
// Greenhouse / Plant-world data. Text is kept as i18n keys (resolved at render
// time via APP.t) rather than hardcoded English, so all six locales work.
// Populated section-by-section: Section 2 (stages), 3 (needs), 4 (pollinate),
// 5 (seasons). Section 1 only establishes the namespace + wiring.
(function (APP) {
  APP.GREENHOUSE = {
    // Life-cycle journey stages (Section 2)
    stages: [],
    // "What plants need" — real needs + distractors (Section 3)
    needs: [],
    distractors: [],
    // Vegetable patch / seasons (Section 5)
    seasons: []
  };
})(window.APP);

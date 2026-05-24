window.APP = window.APP || {};

// ── Translation helper ────────────────────────────────────────────────────────
// Loaded after state.js and data/i18n.js.
// Provides APP.t(), APP.setLocale(), APP.loadLocale().

(function (APP) {

  // Look up a translation key for the current locale.
  // Falls back to English if the key is missing in the active locale.
  // Supports simple {placeholder} substitution: APP.t('setup.nameLength', { n: 5 })
  APP.t = function (key, vars) {
    const locale  = (APP.state && APP.state.settings.locale) || 'en';
    const strings = (APP.I18N && APP.I18N[locale]) || (APP.I18N && APP.I18N.en) || {};
    const en      = (APP.I18N && APP.I18N.en)      || {};
    let s = strings[key] !== undefined ? strings[key]
          : en[key]      !== undefined ? en[key]
          : key; // last resort: echo the key so missing strings are obvious
    if (vars) {
      Object.keys(vars).forEach(k => {
        s = s.replace(new RegExp('\\{' + k + '\\}', 'g'), vars[k]);
      });
    }
    return s;
  };

  // Resolve story content (title or page text) for the current locale.
  // Accepts either a plain string (returned as-is, for backward compat) or a
  // { en, pt, fr, es, de, it } locale map — returns the active locale's value,
  // falling back to English if the locale is absent.
  APP.storyText = function (textOrMap) {
    if (!textOrMap) return '';
    if (typeof textOrMap === 'string') return textOrMap;
    const locale = (APP.state && APP.state.settings.locale) || 'en';
    return textOrMap[locale] || textOrMap.en || '';
  };

  // Change the active language. Persists to localStorage.
  // Does NOT re-render — callers must trigger a re-render themselves.
  APP.setLocale = function (locale) {
    if (APP.settings) APP.settings.update({ locale });
    try { localStorage.setItem('locale', locale); } catch (_) {}
  };

  // Load the persisted language on boot, before the first screen renders.
  APP.loadLocale = function () {
    let saved = 'en';
    try { saved = localStorage.getItem('locale') || 'en'; } catch (_) {}
    // Only accept locales we actually have translations for.
    if (!APP.I18N || !APP.I18N[saved]) saved = 'en';
    if (APP.settings) APP.settings.update({ locale: saved });
  };

})(window.APP);

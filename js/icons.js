window.APP = window.APP || {};

// Shared SVG icon strings. All use currentColor so they inherit the button's
// CSS color automatically. stroke-linecap/join="round" for a friendly look.
(function (APP) {
  const S = 'http://www.w3.org/2000/svg';

  function icon(content, size) {
    size = size || 22;
    return `<svg xmlns="${S}" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`;
  }

  APP.ICONS = {
    // House outline with door-notch in floor
    home: icon(
      '<path d="M3 12L12 3l9 9"/>' +
      '<path d="M5 10.5V20a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1V10.5"/>'
    ),

    // Gear: outer ring with 8 teeth + centre circle
    settings: icon(
      '<circle cx="12" cy="12" r="3"/>' +
      '<path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>'
    ),

    // Speaker cone (filled) + two sound-wave arcs
    volumeOn: icon(
      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>' +
      '<path d="M15.54 8.46a5 5 0 010 7.07"/>' +
      '<path d="M19.07 4.93a10 10 0 010 14.14"/>'
    ),

    // Speaker cone (filled) + X cross
    volumeOff: icon(
      '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none"/>' +
      '<line x1="23" y1="9" x2="17" y2="15"/>' +
      '<line x1="17" y1="9" x2="23" y2="15"/>'
    ),
  };
})(window.APP);

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

    // Left-pointing arrow
    back: icon(
      '<line x1="19" y1="12" x2="5" y2="12"/>' +
      '<polyline points="12 19 5 12 12 5"/>'
    ),

    // Circular counter-clockwise arrow (refresh / restart)
    restart: icon(
      '<polyline points="1 4 1 10 7 10"/>' +
      '<path d="M3.51 15a9 9 0 1 0 .49-4.7"/>'
    ),

    // Right-pointing play triangle + vertical bar (skip forward)
    skip: icon(
      '<polygon points="5 4 15 12 5 20 5 4"/>' +
      '<line x1="19" y1="4" x2="19" y2="20"/>'
    ),

    // Paintbrush: handle + bristle head
    brush: icon(
      '<path d="M14 4l6 6-7.5 7.5a3 3 0 01-1.6.83l-4.6.92.92-4.6a3 3 0 01.83-1.6z"/>' +
      '<line x1="13" y1="5" x2="19" y2="11"/>'
    ),

    // Eraser: angled block sweeping along a baseline
    eraser: icon(
      '<path d="M4 16l8-8a2 2 0 012.83 0l3.17 3.17a2 2 0 010 2.83L14 20H7z"/>' +
      '<line x1="4" y1="20" x2="20" y2="20"/>'
    ),

    // Paint bucket: tipped pail with a drip
    fill: icon(
      '<path d="M3 11l8-8 8 8-8 8z"/>' +
      '<path d="M19 14s2 2.5 2 4a2 2 0 01-4 0c0-1.5 2-4 2-4z" fill="currentColor" stroke="none"/>'
    ),

    // Sticker: star (tap to stamp)
    sticker: icon(
      '<polygon points="12 3 14.7 8.6 21 9.3 16.5 13.7 17.6 20 12 17 6.4 20 7.5 13.7 3 9.3 9.3 8.6 12 3"/>'
    ),

    // Undo: curved arrow back to the left
    undo: icon(
      '<polyline points="9 7 4 12 9 17"/>' +
      '<path d="M4 12h11a5 5 0 010 10h-1"/>'
    ),

    // Trash: lid + bin body (clear all)
    trash: icon(
      '<polyline points="3 6 5 6 21 6"/>' +
      '<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>' +
      '<path d="M10 11v6M14 11v6"/>' +
      '<path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>'
    ),
  };
})(window.APP);

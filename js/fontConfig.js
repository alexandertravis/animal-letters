window.APP = window.APP || {};

// ── APP.FONT_CONFIG ────────────────────────────────────────────────────────────
// Single source of truth for the typeface used to render traced letter glyphs.
// Both tracer.js and letters.js read from here — to swap the font in future,
// edit this object (family, weight, file) and tune the numeric constants to
// match the new typeface's metrics.
//
// Values are derived from the Quicksand OS/2 font table via dev/font-metrics.ps1:
//   sCapHeight=700, sxHeight=503, sTypoDescender=-250, unitsPerEm=1000.
// To recalibrate after a font swap, run dev/font-metrics.ps1 and update the
// fontSize* / baseline* constants below using the printed FONT_CONFIG values.
(function (APP) {
  APP.FONT_CONFIG = {
    // ── Font identity ────────────────────────────────────────────────────────
    // family: matches the font-family name declared in @font-face in styles.css.
    family: 'Quicksand',

    // weight used for tracing glyphs — SemiBold (600) gives a clear, child-
    // friendly letterform that is thick enough to trace inside but not so heavy
    // that it loses its distinctive rounded shape.
    weight: 600,

    // file: asset path relative to index.html — single source of truth so a
    // font swap only requires editing this object and the @font-face src above.
    file: 'assets/fonts/Quicksand-VariableFont_wght.ttf',

    // ── SVG viewport ─────────────────────────────────────────────────────────
    // Glyph positioning is based on GUIDE_CONFIG line positions:
    //   top    y=30   — cap line / ascender top
    //   middle y=100  — x-height top
    //   bottom y=170  — baseline (all letters rest here)
    //   lower  y=240  — descender bottom
    //
    // viewBoxH/viewBoxHAccent are reserved for Phase 4 dynamic viewBox logic.
    viewBoxW: 200,
    viewBoxH: 270,        // standard — unaccented uppercase and lowercase
    viewBoxHAccent: 300,  // accented characters that carry a mark above cap-height

    // ── Uppercase glyph positioning ───────────────────────────────────────────
    // Fills cap zone top→bottom (y=30→y=170, width=140).
    // Derived from OS/2 sCapHeight=700, unitsPerEm=1000 → capHeightRatio=0.70.
    //   fontSizeUC = 140 / 0.70 = 200
    //   cap-top = 170 − (200 × 0.70) = 30 ✓
    fontSizeUC: 200,
    baselineUC: 170,

    // ── Standard lowercase (a c e i m n o r s u v w x z) ────────────────────
    // Fills x-height zone only (middle→bottom, y=100→y=170, width=70).
    // Derived from OS/2 sxHeight=503, unitsPerEm=1000 → xHeightRatio=0.503.
    //   fontSizeLC = 70 / 0.503 ≈ 139
    //   x-top = 170 − (139 × 0.503) ≈ 100 ✓
    fontSizeLC: 139,
    baselineLC: 170,

    // ── Ascender-group lowercase (b d f h k l t) ─────────────────────────────
    // Ascenders reach the top guide (y=30) — same full-height zone as uppercase.
    fontSizeAscender: 200,
    baselineAscender: 170,

    // ── Descender-group lowercase (g j p q y) ────────────────────────────────
    // Bowl in x-height zone (y=100→y=170) and tail to lower guide (y=240).
    // Derived: fontSizeDescender = 140 / (xHeightRatio + descenderRatio)
    //          = 140 / (0.503 + 0.25) ≈ 186
    //   x-top  = 193.5 − (186 × 0.503) ≈ 100 ✓
    //   tail   = 193.5 + (186 × 0.25) ≈ 240 ✓
    fontSizeDescender: 186,
    baselineDescender: 193.5,

    // ── Accented uppercase ────────────────────────────────────────────────────
    // Used with viewBoxHAccent (200×300). Slightly smaller to leave headroom for
    // diacritical marks above cap-height. Baseline at the same absolute position.
    fontSizeAccentUC: 175,
    baselineAccentUC: 170,
  };
})(window.APP);

window.APP = window.APP || {};

// ── APP.FONT_CONFIG ────────────────────────────────────────────────────────────
// Single source of truth for the typeface used to render traced letter glyphs.
// Both tracer.js and letters.js read from here — to swap the font in future,
// edit this object (family, weight, file) and tune the numeric constants to
// match the new typeface's metrics.
//
// Phase 2 will use these values to build <clipPath><text> elements in the SVG
// tracer. In Phase 1 they are defined here but not yet consumed by the tracer.
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
    // Fills cap zone top→bottom (y=30→y=170).
    // At Quicksand cap-height ratio ≈ 0.72:
    //   cap-top = baselineUC − (fontSizeUC × 0.72) = 170 − (195 × 0.72) ≈ 29 ✓
    fontSizeUC: 195,
    baselineUC: 170,

    // ── Standard lowercase (a c e i m n o r s u v w x z) ────────────────────
    // Fills x-height zone only (middle→bottom, y=100→y=170).
    // At Quicksand x-height ratio ≈ 0.56:
    //   x-top = baselineLC − (fontSizeLC × 0.56) = 170 − (125 × 0.56) ≈ 100 ✓
    fontSizeLC: 125,
    baselineLC: 170,

    // ── Ascender-group lowercase (b d f h k l t) ─────────────────────────────
    // Ascenders reach the top guide (y=30) — same full-height zone as uppercase.
    fontSizeAscender: 195,
    baselineAscender: 170,

    // ── Descender-group lowercase (g j p q y) ────────────────────────────────
    // Larger font + lower baseline so the bowl sits in the x-height zone and
    // the tail reaches close to the lower guide (y=240).
    // At ratios 0.56 (x-height) and 0.25 (descender):
    //   x-top  = 195 − (155 × 0.56) ≈ 108   (close to middle guide y=100)
    //   tail   = 195 + (155 × 0.25) ≈ 234   (close to lower guide y=240)
    fontSizeDescender: 155,
    baselineDescender: 195,

    // ── Accented uppercase ────────────────────────────────────────────────────
    // Used with viewBoxHAccent (200×300). Slightly smaller to leave headroom for
    // diacritical marks above cap-height. Baseline at the same absolute position.
    fontSizeAccentUC: 175,
    baselineAccentUC: 170,
  };
})(window.APP);

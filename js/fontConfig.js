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
    // All glyphs are rendered inside a 200×270 viewBox. The extra height vs the
    // previous 200×250 gives a small amount of breathing room below the baseline.
    // Accented characters (U+00C0–017E) use viewBoxHAccent, which adds ~30 units
    // of headroom above the cap-height for diacritical marks.
    viewBoxW: 200,
    viewBoxH: 270,        // standard — unaccented uppercase and lowercase
    viewBoxHAccent: 300,  // accented characters that carry a mark above cap-height

    // ── Default font size (viewBox units) ────────────────────────────────────
    // Shared by uppercase, standard lowercase, and ascender-group glyphs.
    // Tuned so the Quicksand cap-height fills from approximately y=30 to y=215,
    // matching the existing guide-line positions used by GUIDE_CONFIG.
    // Will be refined empirically in Phase 2 once the <text> clip is live.
    fontSizeDefault: 185,

    // ── Uppercase glyph positioning ───────────────────────────────────────────
    // baselineUC: y coordinate of the text baseline for uppercase glyphs.
    // Font sits at: cap-height ≈ baselineUC − (fontSizeDefault × capHeightRatio).
    // Quicksand cap-height ratio ≈ 0.72, so cap-top ≈ 215 − (185 × 0.72) ≈ 82.
    baselineUC: 215,

    // ── Standard lowercase glyph positioning ─────────────────────────────────
    // Standard lowercase (a, c, e, m, n, etc.) — same font-size, same baseline.
    // The x-height naturally lands at approximately the middle guide line.
    baselineLC: 215,

    // ── Ascender-group lowercase (b, d, f, h, k, l, t) ───────────────────────
    // Same as standard lowercase — ascenders fill the extra space above x-height.
    baselineAscender: 215,

    // ── Descender-group lowercase (g, j, p, q, y) ────────────────────────────
    // Descenders require the baseline to sit higher so the tail has room below.
    // Shift baseline up ~25 units from the standard position.
    fontSizeDescender: 185,
    baselineDescender: 190,

    // ── Accented character positioning ────────────────────────────────────────
    // Used with viewBoxHAccent (200×300). Baseline is lower in the taller viewBox
    // to keep the letter body in the same visual position while the extra height
    // above y=0 provides headroom for diacritical marks above cap-height.
    fontSizeAccentUC: 175,   // slightly smaller to leave room for the accent mark
    baselineAccentUC: 230,   // baseline sits lower in the taller 300-unit viewBox
  };
})(window.APP);

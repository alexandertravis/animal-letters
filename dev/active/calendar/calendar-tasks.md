# Calendar — Tasks

## Section 1 — Wiring + data  ✅ COMPLETE
- [x] `data/calendar.js`: `APP.CALENDAR.days/months[locale]` (6 locales) + `APP.calendarList(kind,locale)` en-fallback
- [x] Add `calendar` to the `school` location games in `data/locations.js`
- [x] Stub `js/screens/calendar.js`
- [x] index.html: data/calendar.js before locations; screen before main.js
- [x] i18n: 8 calendar UI keys — all 6 locales
- [x] Verified via preview_eval: School shows calendar (5 games), data resolves per locale, stub renders, no console errors

## Section 2 — Calendar screen
- [ ] Days tab: 7 slots + shuffled chips, drag to correct slot, all placed → win
- [ ] Months tab: "what comes next?" 4-choice quiz, N rounds → win
- [ ] speak names; recordWin('calendar'); confetti

## Section 3 — Tests & polish
- [ ] Unit tests: calendar data integrity (6 locales × 7 days / 12 months) + School wiring + i18n; suite green

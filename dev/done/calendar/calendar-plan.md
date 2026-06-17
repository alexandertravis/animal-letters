# Calendar (Days & Months) — Plan

## Goal
Add a Days-of-the-week & Months-of-the-year game to the School building. Phase 4
(final) of the educational-games roadmap.

## Approach
One `calendar` screen with two tabs (Music-Shed-style):
- **Days** — "Order the days": 7 numbered slots + shuffled day chips; drag each to its slot.
- **Months** — "What comes next?": show a month, pick the next from 4 options; several rounds.

Localized day/month names live in a new `data/calendar.js` as per-locale arrays
(like the animals-XX pattern) — avoids ~114 i18n keys. UI strings go in i18n.js.
Reuse: topbar, clone-drag, speak, progress, confetti, tab pattern (seasons.js).

## Sections
1. Wiring: add `calendar` to School games, `data/calendar.js` (localized data), stub, index.html, i18n UI keys.
2. Calendar screen (Days order + Months "what's next" tabs).
3. Tests + polish.

## Constraints
- Week is Monday-first (all six locales). Strict index.html load order (data before locations).
- Navigation safety: guard timers with `wrap.isConnected`.
- Commit + ff-merge to main + push per green checkpoint; test-env cache force-refresh.

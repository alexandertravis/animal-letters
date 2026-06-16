# Greenhouse / Plant World — Plan

## Goal
Add a **Greenhouse building** to the village map opening a hub of four plant activities,
with a staged **life-cycle journey** as the centrepiece. Phase 1 of the larger educational
games roadmap (`~/.claude/plans/i-want-to-include-sparkling-boot.md`).

## Motivation
Broaden the app from letters/play into early science: how plants grow and what they need
(seed→roots→stem→leaves→flower→bee→fruit; water, soil/nutrients, air/CO₂, sunlight;
photosynthesis, pollination, fruiting, seasons, insects).

## Approach
Reuse all existing infrastructure — no new dependencies. New **hub location** (`greenhouse`,
`direct:null`, `games[4]`) rendered by the existing `location` screen. Four new screens:
`plantgrow` (centrepiece), `plantneeds`, `pollinate`, `seasons`. Plant drawn as inline SVG
built up part-by-part; animations via CSS / vendored GSAP with graceful fallback.

Key reuse: `APP.ui.topbar`, `APP.settings.game`, `APP.progress.recordWin`, `APP.launchConfetti`,
`APP.audio.speak`/`sfx`, recipes `makeDraggable`/`hitTest`/`setStep`, colours drag-into-target,
memory `spawnStars`, music-shed tab pattern.

## Sections
1. Building + hub wiring (map SVG, locations entry, i18n, index.html) — greenhouse appears, opens hub.
2. `plantgrow` life-cycle journey (centrepiece).
3. `plantneeds` mini-game.
4. `pollinate` mini-game.
5. `seasons` vegetable patch.
6. Progress/stickers wiring, polish, unit tests for `data/greenhouse.js` helpers.

## Constraints
- No build step; serve over HTTP (`py -m http.server 3456`). Open in Chrome/Edge.
- Strict script load order in index.html: `data/*` before `data/locations.js`; screens before `js/main.js`.
- Navigation safety: cancel timers + `G.killTweensOf('*')` before every `ctx.go`.
- Screenshots time out on continuous SVG animation — verify via `preview_eval`.
- Work inline/sequentially; commit at each green checkpoint (message approval first).

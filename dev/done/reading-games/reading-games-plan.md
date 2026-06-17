# Reading Games — Plan

## Goal
Add two early-reading games to the existing **School** building. Phase 3 of the
educational-games roadmap (`~/.claude/plans/i-want-to-include-sparkling-boot.md`).

## Games (reuse the 51 animals + cartoon SVGs)
| Screen | Game | Pattern |
|---|---|---|
| `wordmatch`  | Word–Picture Match — drag each animal word card onto its picture | clone-drag onto picture targets; speak the word; difficulty = pairs 3/4/5 |
| `firstletter`| Starting Letter — picture says its name on tap; drag it to its starting letter | round-based; 4 letter targets (correct + distractors); 5 rounds |

Distinct from existing `findletter` (tap the correct letter from 4 choices for a shown letter).

## Approach
No new building — add both games to the `school` location `games[]`. Reuse
`APP.animals.eligibleAll()` (locale-aware list with displayName + images.cartoon),
`APP.audio.speak`, clone-drag + hit-test, topbar settings, progress, confetti.

## Sections
1. Wiring: add 2 games to School, 2 stubs, i18n (titles + intros), index.html.
2. `wordmatch`.
3. `firstletter`.
4. Polish + unit tests (i18n completeness + School wiring).

## Constraints
- Animal cartoon SVGs need HTTP (served at :3456). Strict index.html load order.
- Navigation safety: guard timers with `wrap.isConnected`.
- Work inline/sequentially; commit + ff-merge to main + push per green checkpoint.
- Test-env cache: force-refresh changed files via fetch(no-store)+(0,eval) before checking.

# Animals + Stories Expansion — Tasks

## Batch 1 — 20 animals ✅ DONE (commit 77f6ef9)
- [x] 20 cartoon SVGs in `assets/images/cartoon/`
- [x] 20 `APP.ANIMALS` entries appended in `data/animals.js` (pool 50→70)
- [x] `npm test` green (322); SVGs parse-verified; all 20 registered
- [x] Commit

## Story roster (50) — slug · cover animal · theme
### New-animal stories (Batch 2) ✅ DONE — committed, 322 tests, all 10 load
1. [x] patient-ox · ox · steady strength (fable)
2. [x] little-bat-night · bat · the dark isn't scary (bedtime)
3. [x] elk-and-echo · elk · listening (folk)
4. [x] toads-umbrella · toad · sharing in the rain
5. [x] seal-song · seal · finding your voice
6. [x] mole-window · mole · curiosity
7. [x] kind-llama · llama · manners/patience (slug kept, title "Llama Who Learned to Hum")
8. [x] slow-sloth · sloth · slow & steady / mindfulness
9. [x] otters-stone · otter · friendship/treasure
10. [x] rhino-soft-heart · rhino · looks vs kindness

### New-animal stories (Batch 3) ✅ DONE — committed, 322 tests
11. [x] counting-sheep · sheep · bedtime counting (concept)
12. [x] goose-golden-egg · goose (+fox) · contentment vs greed (fable)
13. [x] snail-carries-home · snail · home/journey
14. [x] robin-spring · robin · hope (seasonal)
15. [x] walrus-winter · walrus · warmth/community (seasonal)
16. [x] beaver-bridge · beaver · helpfulness/building
17. [x] badger-garden · badger · quiet wisdom
18. [x] turkey-talent · turkey · find your own talent
19. [x] octopus-juggle · octopus · many hands help (+ remember to rest)
20. [x] peacock-colours · peacock · vanity → generosity

### Classic & existing-animal fables (Batch 4) ✅ DONE — committed, 322 tests
21. [x] fox-and-grapes · fox · sour grapes (fable)
22. [x] dog-reflection · dog · greed (fable)
23. [x] frog-and-ox · frog (+ox) · vanity (fable)
24. [x] lamb-cried-wolf · sheep (+wolf) · honesty (fable)
25. [x] bear-and-bees · bear (+bee) · patience
26. [x] three-kittens · cat · responsibility (nursery)
27. [x] farm-friends-count · cow (+hen,pig,duck) · counting (concept, multi)
28. [x] elephant-trunk · elephant (+crocodile) · Just-So curiosity
29. [x] how-camel-hump · camel · Just-So work ethic
30. [x] rabbit-in-moon · rabbit · selflessness (Jataka)

### Existing-animal tales (Batch 5) ✅ DONE — committed, 322 tests
31. [x] monkey-caps · monkey · cleverness (calm head beats shouting)
32. [x] lions-whisker · lion (+mouse) · patience (folk)
33. [x] penguin-egg · penguin · devotion (winter)
34. [x] brave-duckling · duck · courage
35. [x] two-squirrels · squirrel · sharing
36. [x] tiger-and-the-pool · tiger · self-acceptance (be a friend to yourself)
37. [x] giraffe-high-note · giraffe · your difference is your gift
38. [x] zebra-stripes-night · zebra · identity (Just-So)
39. [x] kangaroo-helps · kangaroo · helpfulness (rescue)
40. [x] koala-sleepy-tree · koala · rest is not laziness

### Existing-animal tales (Batch 6) ✅ DONE — committed, 323 tests
41. [x] panda-bamboo-share · panda · sharing
42. [x] hippo-dance · hippo · surprising grace (renamed from hippo-mud-song)
43. [x] crocodile-tears · crocodile · honesty over trickery
44. [x] flamingo-flock · flamingo · belonging/courage to fly (renamed from flamingo-one-leg,
        to stay distinct from the existing flamingo-balance story)
45. [x] gorilla-quiet-strength · gorilla · true strength is gentle/protective
46. [x] hedgehog-prickles · hedgehog · loved as you are; many ways to show care
47. [x] parrot-secret · parrot · think before you repeat; spread kind words
48. [x] whale-lullaby · whale · bedtime/comfort
49. [x] dolphin-rescue · dolphin · bravery/helpfulness
50. [x] owls-night-school · owl · everyone learns in their own way

## Wrap-up
- [x] Update `tests/stories-content.test.js` baseline (library ≥ 98) + 50-new-id check
- [x] Full `npm test` green — 323 tests
- [x] In-browser: 98 stories load, all 50 new present, no bad covers, reader renders a new story
- [x] merged to main + pushed (594881f); dev docs archived (73499f2)

## FEATURE COMPLETE — MERGED & PUSHED
20 animals (+SVGs) and 50 full-depth stories added. Library 48 → 98.
Branch `feature/animals-stories-expansion`, commits 77f6ef9 → 594881f, merged to
main and pushed; docs archived here (dev/done/).

## CONSISTENCY PASS (2026-06-19, commit e4368af, merged+pushed)
Reviewed all 98 stories. Structural integrity clean. Fixed 10 protagonist
name collisions (renamed only in the new stories — Goro→George, Kira→Kayla,
Kobi→Koda, Bao→Ling, Hattie→Hilda/Holly, Ollie→Otto, Dilly→Posy, Lulu→Lola,
Sasha→Suki) and gave "The Lion's Whisker" a literal whisker payoff. 323 tests.

Notes: leather colours cycled from the valid palette (see context). Themes/slugs
may flex slightly during authoring — keep requirement animalIds valid.

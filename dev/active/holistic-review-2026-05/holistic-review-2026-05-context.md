# Holistic Review 2026-05 — Context

## Branch
`review/holistic-2026-05` — all fixes land here. Main stays clean.

## Key Files Modified

| File | Change |
|------|--------|
| `js/screens/storyreader.js` | `destroyed` flag + ✕ button fix |
| `data/i18n.js` | Translate library keys in PT/FR/ES/DE/IT |
| `tests/state.test.js` | animalId uppercase → lowercase |
| `tests/animals.test.js` | animalId uppercase → lowercase |
| `tests/integration.test.js` | animalId uppercase → lowercase |
| `index.html` | Remove user-scalable=no from viewport |

## Core Decisions

### animalId is always lowercase
`APP.animalId(animal)` = `animal.images.cartoon.split('/').pop().replace('.svg','')` → lowercase.
Tests pre-dated this and stored uppercase names. Fix is in the tests, not production code.

### storyreader `destroyed` flag pattern
`let destroyed = false;` at top of render(). Set `destroyed = true` before ANY `ctx.go()` call (sync or async). Check `if (destroyed) return;` at start of each timer callback. This prevents double-navigation when ✕ is clicked during a closing animation.

### ✕ button during 'closing' phase
The `closeBook()` function guards `phase !== 'open'` so clicking ✕ during 'closing' silently does nothing. Fix: add `|| phase === 'closing'` to the early-exit condition in the ✕ click handler.

### i18n library keys
In PT/FR/ES/DE/IT all 8 library/reader keys were on two concatenated lines — syntactically valid JS but untranslated. Fix: expand to separate lines with proper translations.

## Test AnimalId Mapping
```
Animal.name → APP.animalId() output
'CAT'  → 'cat'
'DOG'  → 'dog'
'ANT'  → 'ant'
'BEE'  → 'bee'
'BEAR' → 'bear'
'DUCK' → 'duck'
'RABBIT' → 'rabbit'
```

## Gotchas
- `animalCompletionCounts[nextAnimal.name]` in integration tests → must use `APP.animalId(nextAnimal)`
- `completedAnimals.has(a.name)` in filter lambdas → must use `APP.animalId(a)`
- `flutterAndClose` timers are inside a `Promise.all().then()` — they still need the `destroyed` guard

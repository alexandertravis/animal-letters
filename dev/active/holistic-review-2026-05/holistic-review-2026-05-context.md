# Holistic Review 2026-05 — Context

## Branch
`review/holistic-2026-05` — all fixes land here. Main stays clean.

## Commits on this branch
| Commit | What |
|--------|------|
| `4b2a62f` | NOW fixes: storyreader timer leak + ✕ button, i18n library keys PT/FR/ES/DE/IT, 26 test animalId fixes, viewport WCAG |
| `c9e7316` | SOON fixes: dead CSS removed, --card token, APP._libCtx smell, touch-action on .book-spread |
| `07b1e95` | feat(i18n): APP.storyText() + all 8 stories translated PT/FR/ES/DE/IT |

## Key Files Modified

| File | Change |
|------|--------|
| `js/screens/storyreader.js` | `destroyed` flag + ✕ button fix; `APP.storyText()` at spread construction |
| `data/i18n.js` | Translate library keys in PT/FR/ES/DE/IT |
| `data/stories.js` | All titles + page text converted to `{ en, pt, fr, es, de, it }` locale maps |
| `js/i18n.js` | Added `APP.storyText(textOrMap)` helper |
| `js/screens/bookCover.js` | `story.title` → `APP.storyText(story.title)` in basic + classic skins |
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

## APP.storyText design
`APP.storyText(textOrMap)` lives in `js/i18n.js` alongside `APP.t`. Accepts either:
- a plain string → returned as-is (backward compat)
- a `{ en, pt, fr, es, de, it }` object → returns `textOrMap[locale] || textOrMap.en || ''`

Called at **spread construction time** in `storyreader.js` render() so `leftContent` and
`rightContent.title` are always plain strings — no changes needed downstream in
`applyLeft`/`applyRight`. Same pattern in `bookCover.js` for the cover title.

## Gotchas
- `animalCompletionCounts[nextAnimal.name]` in integration tests → must use `APP.animalId(nextAnimal)`
- `completedAnimals.has(a.name)` in filter lambdas → must use `APP.animalId(a)`
- `flutterAndClose` timers are inside a `Promise.all().then()` — they still need the `destroyed` guard
- `data/stories.js` title/text fields are now locale maps, not strings — any new story must follow the same shape

# Animals + Stories Expansion — Plan

## Goal
Add **20 new animals** (cartoon SVG + `APP.ANIMALS` entry each) and **50 new
full-depth stories** (~8–9 pages each, existing `APP.Story` template) to the
library, with variety in themes and coverage across a wide range of animals.

## Motivation
User request (2026-06-19): grow the tracing roster and the story library
substantially. Full-depth stories (matching `camel-stars.js` ~400 words / 9
pages), delivered in committed batches.

## Approach
Vanilla JS / `window.APP` IIFE, strict index.html load order. No build.

### Animals (Batch 1)
- 20 child-recognisable animals not already present, spread across letter
  lengths 2–7. Each gets:
  - `assets/images/cartoon/<id>.svg` — hand-authored, ~200×200 viewBox, simple
    flat shapes in the existing house style (see `cat.svg`).
  - An `APP.ANIMALS` entry in `data/animals.js` (name/displayName/images/audio).
    `realistic`/`audio` paths follow convention but 404 gracefully (dirs empty).
- `animalId` = SVG filename without `.svg`.

Chosen 20: ox, bat, elk, toad, seal, mole, llama, sloth, otter, rhino, sheep,
goose, snail, robin, walrus, beaver, badger, turkey, octopus, peacock.

### Stories (Batches 2–6, ~10 per batch)
- One `data/stories/<slug>.js` per story, pushing an `APP.Story` to
  `APP.STORIES`; `<script>` tag added to `index.html` (after `_shared.js`,
  before `js/main.js`).
- Each story full-depth: id, title{en}, subtitle, skin:'classic', leather (from
  the valid LEATHER palette list — see test), color, wordCount, readMinutes,
  readingAge, animals[], coverAnimal, requirements[], cover{}, paragraphs[8–9],
  closing{}. Image prompts via `APP.storyPrompt` (P).
- Covers: use cartoon SVG of the cover animal for `image` (consistent with the
  explore-expansion batch; real WebP illustration is a separate future job).
- **Coverage:** every one of the 20 new animals gets ≥1 story; remaining stories
  spread across existing animals + multi-animal tales.
- **Theme variety:** fable/moral, gentle bedtime, friendship/kindness,
  bravery/adventure, seasonal, rhyming/nursery, concept (counting/sharing),
  cleverness/problem-solving.

## Phases / batches
- [ ] Batch 1 — 20 animals (SVGs + animals.js). Commit.
- [ ] Batch 2 — stories 1–10. Commit.
- [ ] Batch 3 — stories 11–20. Commit.
- [ ] Batch 4 — stories 21–30. Commit.
- [ ] Batch 5 — stories 31–40. Commit.
- [ ] Batch 6 — stories 41–50. Commit.
- [ ] Update `tests/stories-content.test.js` baseline if needed; full `npm test`.

## Verification
- `npm test` green after each batch (story-content + body + others). Update the
  story-count assertions as the library grows.
- In-browser spot check: new animals appear in the tracing pool; new stories
  load and render in the library/reader.

## Constraints
Merge/push needs explicit approval. Work inline (no parallel subagents for impl).
Per-batch commit at green. Don't commit the stray PNG/scratch files.

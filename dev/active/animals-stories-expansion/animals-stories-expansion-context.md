# Animals + Stories Expansion — Context

## Key files
| File | Role |
|---|---|
| `data/animals.js` | `APP.ANIMALS[]` — append new `{name,displayName,images,audio}` entries |
| `assets/images/cartoon/<id>.svg` | one cartoon SVG per animal (200×200, simple flat shapes; see `cat.svg`) |
| `data/stories.js` | `APP.Story` class + `APP.STORIES = []` (load FIRST among stories) |
| `data/stories/_shared.js` | `APP.storyPrompt({cast,scene,composition,light})` → prompt string |
| `data/stories/<slug>.js` | one `APP.Story` per file, pushed to `APP.STORIES` |
| `index.html` | `<script>` tags — `_shared.js` then every story file, before `js/main.js` |
| `tests/stories-content.test.js` | structural guard (see constraints) |

## APP.Story required-ish fields (see data/stories.js + camel-stars.js)
`id` (unique kebab), `title:{en}`, `subtitle`, `skin:'classic'`, `leather` (valid
palette name), `color` (hex), `wordCount`, `readMinutes`, `readingAge`,
`animals:[ids]`, `coverAnimal`, `requirements:[{animalId,minCount,label}]`,
`cover:{image,imageAlt,imagePrompt}`, `paragraphs:[{id,text:{en},image,imageAlt,imagePrompt}]`,
`closing:{text,image,imageAlt,imagePrompt}`. `pages` getter maps paragraphs →
`{text,image}` for the reader.

## Test constraints (MUST satisfy)
- Story ids unique; pages non-empty; every page has `image`.
- Every `coverAnimal` + every listed `animals[]` id exists in `APP.ANIMALS`.
- Every requirement `animalId` exists in `APP.ANIMALS`.
- `skin:'classic'` → `leather` must be one of:
  burgundy, forest, navy, tan, plum, chestnut, slate, teal, mauve, sienna, gold,
  russet, amber, terracotta, leaf, arctic, midnight, buff, dustblue, sage,
  charcoal.
- The story-count assertions in stories-content.test.js will need updating as the
  library grows (currently `>=48` and the explore-expansion id list). Add a new
  assertion / bump baseline rather than editing those into fragile exact lists.

## Conventions / gotchas
- `image` for covers/pages uses the cover animal's cartoon SVG (same as the
  explore-expansion batch) — real WebP illustration is a separate future job;
  the `imagePrompt` is authored ready for that pipeline.
- `animalId` = cartoon filename without `.svg`.
- Port-3456 cache gotcha: data files served stale after reload — force-refresh
  `fetch(url+'?t='+Date.now(),{cache:'no-store'})`+`(0,eval)` before in-browser checks.
- Leather palette is finite (21 names) — cycle through them for variety; the test
  rejects any other name.

## Technologies — 2026-06-19
No new tech. Pure data + SVG additions to the existing vanilla-JS app.

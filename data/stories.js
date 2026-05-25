window.APP = window.APP || {};

// ─── APP.Story class ────────────────────────────────────────────────────────
//
// A richer story container that holds both runtime display data and authoring
// data (image prompts, character bible) for the illustration pipeline.
//
// Fields:
//   id           — string, kebab-case unique key
//   title        — { en, pt, fr, es, de, it } locale map (or plain string)
//   subtitle     — optional string
//   skin         — 'classic' | 'watercolour' | 'basic'
//   leather      — leather cover colour name (classic skin)
//   board        — board cover colour name (watercolour skin)
//   color        — hex fallback / basic skin
//   wordCount    — number
//   readMinutes  — number
//   readingAge   — { listen: '3-6', read: '6+' }
//   rhyme        — boolean
//   rhymeScheme  — 'AABB' | 'ABAB' | null
//   meter        — e.g. '4-beat' | null
//   animals      — string[] animalIds that appear in this story
//   coverAnimal  — string, primary animalId
//   requirements — { animalId, minCount, label }[]
//   cover        — { image, imageAlt, imagePrompt }
//   paragraphs   — { id, text, image, imageAlt, imagePrompt }[]
//   closing      — { text, image, imageAlt, imagePrompt }
//
// The `pages` getter maps paragraphs to { text, image } so APP.Story instances
// are transparently compatible with the existing storyreader (story.pages).

APP.Story = class Story {
  constructor({
    id, title, subtitle,
    skin, leather, board, color,
    wordCount, readMinutes, readingAge,
    rhyme, rhymeScheme, meter,
    animals, coverAnimal, requirements,
    cover, paragraphs, closing
  }) {
    this.id          = id;
    this.title       = title;
    this.subtitle    = subtitle    || null;
    this.skin        = skin        || 'classic';
    this.leather     = leather     || null;
    this.board       = board       || null;
    this.color       = color       || null;
    this.wordCount   = wordCount   || null;
    this.readMinutes = readMinutes || null;
    this.readingAge  = readingAge  || null;
    this.rhyme       = rhyme       || false;
    this.rhymeScheme = rhymeScheme || null;
    this.meter       = meter       || null;
    this.animals     = animals     || [];
    this.coverAnimal = coverAnimal || (animals && animals[0]) || null;
    this.requirements = requirements || [];
    this.cover       = cover       || null;
    this.paragraphs  = paragraphs  || [];
    this.closing     = closing     || null;
  }

  // Backward-compatible getter — storyreader reads story.pages
  get pages() {
    return this.paragraphs.map(p => ({ text: p.text, image: p.image }));
  }
};

// ─── Story definitions ───────────────────────────────────────────────────────
//
// Stories are authored as APP.Story instances, each in their own file under
// data/stories/<slug>.js. Each file pushes to this array on load.
// Load order is controlled by the <script> tags in index.html.

APP.STORIES = [];

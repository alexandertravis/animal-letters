# add-tests — Tasks

## Section 1 — Infrastructure
- [x] Create `package.json` with vitest devDependency and `"test": "vitest run"` script
- [x] Create `vitest.config.js` (jsdom environment, include `tests/**/*.test.js`)
- [x] Create `tests/setup.js` — bootstrap helper that loads modules in correct order
- [x] Run `npm install` and verify `npm test` exits cleanly with 0 tests collected

## Section 2 — state.js tests (`tests/state.test.js`)
- [x] startGame — sets currentAnimal, resets letterIndex to 0, sets sessionExists
- [x] startGame — resets consecutiveFoundCount when animal is not yet found
- [x] startGame — does NOT reset consecutiveFoundCount when animal already found
- [x] advanceLetter — increments letterIndex
- [x] advanceLetter — pushes to completedLetters
- [x] advanceLetter — adds to completedAnimals and sets screen to "complete" on last letter
- [x] advanceLetter — increments animalCompletionCounts correctly
- [x] advanceLetter — increments consecutiveFoundCount when animal was already found
- [x] advanceLetter — calls saveProgress after completion
- [x] skipAnimal — picks a new animal without updating completedAnimals
- [x] skipAnimal — sets screen to "landing" when no eligible animals remain
- [x] saveProgress — writes completedAnimals and animalCompletionCounts to localStorage
- [x] clearProgress — removes localStorage key and resets all three in-memory fields

## Section 3 — animals.js tests (`tests/animals.test.js`)
- [x] eligibleCount — returns correct count for given maxLength
- [x] pickRandom — returns an animal with name.length <= maxLength
- [x] pickRandom — excludes the specified animal when alternatives exist
- [x] pickRandom — returns the excluded animal when it is the only eligible one
- [x] pickRandom — returns null when no animals are eligible
- [x] pickNext — returns a random animal when consecutiveFoundCount < 2
- [x] pickNext — biases toward unfound animals when consecutiveFoundCount >= 2
- [x] pickNext — falls back to pickRandom when all animals are already found

## Section 4 — utils.js tests (`tests/utils.test.js`)
- [x] caseOf — "upper" mode returns full uppercase
- [x] caseOf — "lower" mode returns full lowercase
- [x] caseOf — "proper" mode capitalises first letter only
- [x] isDot — returns true for a zero-length dot path (M x,y)
- [x] isDot — returns false for a normal multi-point path
- [x] dotTransformPos — returns correct {x, y} for given scale/offset params
- [x] launchConfetti — returns a cancel function (handle)

## Section 5 — letterData.js tests (`tests/letterData.test.js`)
- [x] All 26 uppercase letters (A–Z) are defined in APP.LETTERS
- [x] All 26 lowercase letters (a–z) are defined in APP.LETTERS
- [x] Every glyph has a non-empty viewBox string
- [x] Every glyph has at least one stroke
- [x] Every stroke has a non-empty `d` property
- [x] APP.getLetter exists and returns the correct glyph for a given character

## Section 6 — Integration tests (`tests/integration.test.js`)
- [x] Full round-trip: startGame → advanceLetter × N → screen = "complete"
- [x] Save/reload persistence: completedAnimals survives localStorage round-trip
- [x] caseOf × getLetter: every letter returned by getLetter is valid for current case
- [x] Smart randomiser streak + bias: consecutiveFoundCount triggers unfound bias
- [x] skipAnimal integrity: skip does not corrupt state or count as completion
- [x] maxLength cross-module: completion + eligibility + bias respect maxLength

## Section 7 — Pre-commit fixes
- [x] CRITICAL: resetSettings test asserts maxLength resets to correct dynamic default
- [x] HIGH: skipAnimal describe block gets own beforeEach (removes test-order dependency)
- [x] MEDIUM: advanceLetter saveProgress test guards spy.mock.calls[0] with toHaveBeenCalledTimes(1)
- [x] MEDIUM: launchConfetti canvas existence check wrapped in try/finally
- [x] Quality: consolidate redundant APP.ANIMALS beforeEach blocks in animals.test.js

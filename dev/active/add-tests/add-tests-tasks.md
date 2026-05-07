# add-tests — Tasks

## Section 1 — Infrastructure
- [ ] Create `package.json` with vitest devDependency and `"test": "vitest run"` script
- [ ] Create `vitest.config.js` (jsdom environment, include `tests/**/*.test.js`)
- [ ] Create `tests/setup.js` — bootstrap helper that loads modules in correct order
- [ ] Run `npm install` and verify `npm test` exits cleanly with 0 tests collected

## Section 2 — state.js tests (`tests/state.test.js`)
- [ ] startGame — sets currentAnimal, resets letterIndex to 0, sets sessionExists
- [ ] startGame — resets consecutiveFoundCount when animal is not yet found
- [ ] startGame — does NOT reset consecutiveFoundCount when animal already found
- [ ] advanceLetter — increments letterIndex
- [ ] advanceLetter — pushes to completedLetters
- [ ] advanceLetter — adds to completedAnimals and sets screen to "complete" on last letter
- [ ] advanceLetter — increments animalCompletionCounts correctly
- [ ] advanceLetter — increments consecutiveFoundCount when animal was already found
- [ ] advanceLetter — calls saveProgress after completion
- [ ] skipAnimal — picks a new animal without updating completedAnimals
- [ ] skipAnimal — sets screen to "landing" when no eligible animals remain
- [ ] saveProgress — writes completedAnimals and animalCompletionCounts to localStorage
- [ ] clearProgress — removes localStorage key and resets all three in-memory fields

## Section 3 — animals.js tests (`tests/animals.test.js`)
- [ ] eligibleCount — returns correct count for given maxLength
- [ ] pickRandom — returns an animal with name.length <= maxLength
- [ ] pickRandom — excludes the specified animal when alternatives exist
- [ ] pickRandom — returns the excluded animal when it is the only eligible one
- [ ] pickRandom — returns null when no animals are eligible
- [ ] pickNext — returns a random animal when consecutiveFoundCount < 2
- [ ] pickNext — biases toward unfound animals when consecutiveFoundCount >= 2
- [ ] pickNext — falls back to pickRandom when all animals are already found

## Section 4 — utils.js tests (`tests/utils.test.js`)
- [ ] caseOf — "upper" mode returns full uppercase
- [ ] caseOf — "lower" mode returns full lowercase
- [ ] caseOf — "proper" mode capitalises first letter only
- [ ] isDot — returns true for a zero-length dot path (M x,y)
- [ ] isDot — returns false for a normal multi-point path
- [ ] dotTransformPos — returns correct {x, y} for given scale/offset params
- [ ] launchConfetti — returns a cancel function (handle)

## Section 5 — letterData.js tests (`tests/letterData.test.js`)
- [ ] All 26 uppercase letters (A–Z) are defined in APP.LETTERS
- [ ] All 26 lowercase letters (a–z) are defined in APP.LETTERS
- [ ] Every glyph has a non-empty viewBox string
- [ ] Every glyph has at least one stroke
- [ ] Every stroke has a non-empty `d` property
- [ ] APP.getLetter exists and returns the correct glyph for a given character

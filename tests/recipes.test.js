/**
 * tests/recipes.test.js
 *
 * Data integrity for the Recipes play mode. Guards against a recipe with an
 * unknown cookType (would silently fall through to the oven branch) or an
 * unknown ingredient animType (would have no drop animation).
 */
import { describe, it, expect, beforeAll } from 'vitest';

const COOK_TYPES = ['oven', 'pan', 'fry'];
const ANIM_TYPES = ['crack', 'pour', 'chunk', 'sift'];

beforeAll(async () => {
  await import('../data/recipes.js');
});

describe('recipes data', () => {
  it('includes the original and the 3 new recipes', () => {
    const ids = APP.RECIPES.map((r) => r.id);
    ['cake', 'pancake', 'doughnut', 'cookies', 'pizza', 'waffle']
      .forEach((id) => expect(ids, id).toContain(id));
  });

  it('every recipe id is unique', () => {
    const ids = APP.RECIPES.map((r) => r.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every recipe has a valid cookType and the fields the cook step needs', () => {
    APP.RECIPES.forEach((r) => {
      expect(r.name, r.id + ' name').toBeTruthy();
      expect(r.emoji, r.id + ' emoji').toBeTruthy();
      expect(COOK_TYPES, r.id + ' cookType=' + r.cookType).toContain(r.cookType);
      expect(r.batterColor, r.id + ' batterColor').toBeTruthy();
      expect(r.cookedColor, r.id + ' cookedColor').toBeTruthy();
      expect(r.cookedEmoji, r.id + ' cookedEmoji').toBeTruthy();
      expect(r.ingredients.length, r.id + ' ingredients').toBeGreaterThan(0);
      expect(r.toppings.length, r.id + ' toppings').toBeGreaterThan(0);
    });
  });

  it('every ingredient has emoji, label and a valid animType', () => {
    APP.RECIPES.forEach((r) => {
      r.ingredients.forEach((i) => {
        expect(i.emoji, r.id + ' ingredient emoji').toBeTruthy();
        expect(i.label, r.id + ' ingredient label').toBeTruthy();
        expect(ANIM_TYPES, r.id + ' animType=' + i.animType).toContain(i.animType);
      });
    });
  });
});

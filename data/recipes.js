window.APP = window.APP || {};

// Recipe definitions for the Recipes play mode.
// cookType selects the cook mini-step: 'oven' (cake), 'pan' (pancake), 'fry' (doughnut).
(function (APP) {
  APP.RECIPES = [
    {
      id: 'cake',
      name: 'Cake',
      emoji: '🎂',
      cookType: 'oven',
      batterColor: '#e8c98a',
      cookedEmoji: '🍰',
      ingredients: [
        { emoji: '🥚', label: 'Eggs' },
        { emoji: '🥛', label: 'Milk' },
        { emoji: '🧈', label: 'Butter' },
        { emoji: '🌾', label: 'Flour' },
        { emoji: '🍬', label: 'Sugar' },
      ],
      toppings: ['🍓', '🍫', '🍒', '⭐', '🫐'],
    },
    {
      id: 'pancake',
      name: 'Pancake',
      emoji: '🥞',
      cookType: 'pan',
      batterColor: '#f0d9a8',
      cookedEmoji: '🥞',
      ingredients: [
        { emoji: '🥚', label: 'Eggs' },
        { emoji: '🥛', label: 'Milk' },
        { emoji: '🌾', label: 'Flour' },
        { emoji: '🧂', label: 'Salt' },
      ],
      toppings: ['🍓', '🍌', '🍯', '🫐', '🍫'],
    },
    {
      id: 'doughnut',
      name: 'Doughnut',
      emoji: '🍩',
      cookType: 'fry',
      batterColor: '#e8c98a',
      cookedEmoji: '🍩',
      ingredients: [
        { emoji: '🥚', label: 'Eggs' },
        { emoji: '🥛', label: 'Milk' },
        { emoji: '🌾', label: 'Flour' },
        { emoji: '🍬', label: 'Sugar' },
        { emoji: '🧈', label: 'Butter' },
      ],
      toppings: ['🍫', '🍓', '⭐', '🌈'],
    },
  ];
})(window.APP);

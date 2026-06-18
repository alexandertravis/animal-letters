window.APP = window.APP || {};

// Recipe definitions for the Recipes play mode.
// cookType selects the cook mini-step: 'oven' (cake), 'pan' (pancake), 'fry' (doughnut).
// animType on each ingredient selects the drop animation:
//   'crack' = egg halves + yolk  'pour' = tilting jug + stream
//   'chunk' = tumbling rectangles  'sift' = powder particles
(function (APP) {
  APP.RECIPES = [
    {
      id: 'cake',
      name: 'Cake',
      emoji: '🎂',
      cookType: 'oven',
      batterColor: '#e8c98a',
      cookedColor: '#c8845a',
      cookedEmoji: '🍰',
      ingredients: [
        { emoji: '🥚', label: 'Eggs',   animType: 'crack' },
        { emoji: '🥛', label: 'Milk',   animType: 'pour'  },
        { emoji: '🧈', label: 'Butter', animType: 'chunk' },
        { emoji: '🌾', label: 'Flour',  animType: 'sift'  },
        { emoji: '🍬', label: 'Sugar',  animType: 'chunk' },
      ],
      toppings: ['🍓', '🍫', '🍒', '⭐', '🫐'],
    },
    {
      id: 'pancake',
      name: 'Pancake',
      emoji: '🥞',
      cookType: 'pan',
      batterColor: '#f0d9a8',
      cookedColor: '#c89050',
      cookedEmoji: '🥞',
      ingredients: [
        { emoji: '🥚', label: 'Eggs',  animType: 'crack' },
        { emoji: '🥛', label: 'Milk',  animType: 'pour'  },
        { emoji: '🌾', label: 'Flour', animType: 'sift'  },
        { emoji: '🧂', label: 'Salt',  animType: 'sift'  },
      ],
      toppings: ['🍓', '🍌', '🍯', '🫐', '🍫'],
    },
    {
      id: 'doughnut',
      name: 'Doughnut',
      emoji: '🍩',
      cookType: 'fry',
      batterColor: '#e8c98a',
      cookedColor: '#c4843a',
      cookedEmoji: '🍩',
      ingredients: [
        { emoji: '🥚', label: 'Eggs',   animType: 'crack' },
        { emoji: '🥛', label: 'Milk',   animType: 'pour'  },
        { emoji: '🌾', label: 'Flour',  animType: 'sift'  },
        { emoji: '🍬', label: 'Sugar',  animType: 'chunk' },
        { emoji: '🧈', label: 'Butter', animType: 'chunk' },
      ],
      toppings: ['🍫', '🍓', '⭐', '🌈'],
    },
    {
      id: 'cookies',
      name: 'Cookies',
      emoji: '🍪',
      cookType: 'oven',
      batterColor: '#e8c98a',
      cookedColor: '#b5783a',
      cookedEmoji: '🍪',
      ingredients: [
        { emoji: '🥚', label: 'Eggs',      animType: 'crack' },
        { emoji: '🧈', label: 'Butter',    animType: 'chunk' },
        { emoji: '🌾', label: 'Flour',     animType: 'sift'  },
        { emoji: '🍬', label: 'Sugar',     animType: 'chunk' },
        { emoji: '🍫', label: 'Chocolate', animType: 'chunk' },
      ],
      toppings: ['🍫', '⭐', '🥜', '🍒', '🌰'],
    },
    {
      id: 'pizza',
      name: 'Pizza',
      emoji: '🍕',
      cookType: 'oven',
      batterColor: '#f0dca8',
      cookedColor: '#cf6a3a',
      cookedEmoji: '🍕',
      ingredients: [
        { emoji: '🌾', label: 'Flour',  animType: 'sift'  },
        { emoji: '💧', label: 'Water',  animType: 'pour'  },
        { emoji: '🧀', label: 'Cheese', animType: 'chunk' },
        { emoji: '🍅', label: 'Tomato', animType: 'chunk' },
      ],
      toppings: ['🍅', '🧀', '🌶️', '🫒', '🍄'],
    },
    {
      id: 'waffle',
      name: 'Waffle',
      emoji: '🧇',
      cookType: 'pan',
      batterColor: '#f0d9a8',
      cookedColor: '#c89050',
      cookedEmoji: '🧇',
      ingredients: [
        { emoji: '🥚', label: 'Eggs',  animType: 'crack' },
        { emoji: '🥛', label: 'Milk',  animType: 'pour'  },
        { emoji: '🌾', label: 'Flour', animType: 'sift'  },
        { emoji: '🍬', label: 'Sugar', animType: 'chunk' },
      ],
      toppings: ['🍓', '🍌', '🍯', '🫐', '⭐'],
    },
  ];
})(window.APP);

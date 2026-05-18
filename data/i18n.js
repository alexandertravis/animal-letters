window.APP = window.APP || {};

// ── UI string translations ────────────────────────────────────────────────────
// All user-facing strings live here, keyed by locale then by dot-separated key.
// APP.t(key) resolves the active locale's string, falling back to English.
//
// To add a language:
//   1. Add a new locale block below (copy 'en', translate values, keep keys identical)
//   2. Add a button to the language selector in js/screens/setup.js
//   3. Add a data/animals-XX.js file with that language's animal list
//
// Dynamic values use {placeholder} syntax: APP.t('key', { n: 5 }) → "5 letters"

APP.I18N = {
  en: {
    // Landing
    'landing.title':      'Animal Letters',
    'landing.subtitle':   'Trace the letters. Meet the animal!',
    'landing.newGame':    'New Game',
    'landing.continue':   'Continue',
    'landing.myAnimals':  'My Animals',
    'landing.settings':   'Settings',

    // Setup / Settings
    'setup.title':        'Settings',
    'setup.nameLength':   'Longest animal name: {n} letters',
    'setup.letterStyle':  'Letter style',
    'setup.case.upper':   'ABC (uppercase)',
    'setup.case.proper':  'Abc (proper)',
    'setup.case.lower':   'abc (lowercase)',
    'setup.pictures':     'Animal pictures',
    'setup.cartoon':      'Cartoon',
    'setup.realistic':    'Realistic',
    'setup.reveal':       'Show the word as you build it',
    'setup.faint':        'Faint → bold',
    'setup.hidden':       'Hidden → reveal',
    'setup.volume':       'Volume',
    'setup.language':     'Language',
    'setup.back':         'Back',
    'setup.newGame':      'New Game',
    'setup.noAnimals':    'No animals fit that length. Try a longer name length.',
    'setup.gallery':      'Gallery progress',
    'setup.clearGallery': 'Clear gallery ({n} found)',
    'setup.clearConfirm': 'Clear all found animals and start the gallery fresh?',
    'setup.reviewTools':  'Review tools',
    'setup.letterPatterns':'Letter Patterns',
    'setup.animalImages': 'Animal Images',

    // Game
    'game.restart':       'Restart Letter',
    'game.skip':          'Skip Animal',

    // Complete
    'complete.hooray':    'Hooray!',
    'complete.myAnimals': 'My Animals',
    'complete.next':      'Next Animal',
    'complete.greatJob':  'Great Job! 🎉',
  },

  pt: {
    // Landing
    'landing.title':      'Letras dos Animais',
    'landing.subtitle':   'Trace as letras. Conheça o animal!',
    'landing.newGame':    'Novo Jogo',
    'landing.continue':   'Continuar',
    'landing.myAnimals':  'Meus Animais',
    'landing.settings':   'Configurações',

    // Setup / Settings
    'setup.title':        'Configurações',
    'setup.nameLength':   'Nome mais longo: {n} letras',
    'setup.letterStyle':  'Estilo de letra',
    'setup.case.upper':   'ABC (maiúsculas)',
    'setup.case.proper':  'Abc (normal)',
    'setup.case.lower':   'abc (minúsculas)',
    'setup.pictures':     'Imagens de animais',
    'setup.cartoon':      'Desenho',
    'setup.realistic':    'Realista',
    'setup.reveal':       'Mostrar a palavra ao construir',
    'setup.faint':        'Fraco → forte',
    'setup.hidden':       'Oculto → revelar',
    'setup.volume':       'Volume',
    'setup.language':     'Idioma',
    'setup.back':         'Voltar',
    'setup.newGame':      'Novo Jogo',
    'setup.noAnimals':    'Nenhum animal tem esse tamanho. Tente um nome mais longo.',
    'setup.gallery':      'Progresso da galeria',
    'setup.clearGallery': 'Limpar galeria ({n} encontrados)',
    'setup.clearConfirm': 'Limpar todos os animais encontrados e começar de novo?',
    'setup.reviewTools':  'Ferramentas de revisão',
    'setup.letterPatterns':'Padrões de letras',
    'setup.animalImages': 'Imagens de animais',

    // Game
    'game.restart':       'Recomeçar Letra',
    'game.skip':          'Pular Animal',

    // Complete
    'complete.hooray':    'Eba!',
    'complete.myAnimals': 'Meus Animais',
    'complete.next':      'Próximo Animal',
    'complete.greatJob':  'Muito bem! 🎉',
  },
};

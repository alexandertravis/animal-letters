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

// Available locales — drives the language selector in setup.js.
// To add a new language: add an entry here, add a locale block below, and
// add a data/animals-XX.js file. No other code changes are needed.
APP.I18N = {
  LOCALES: [
    { code: 'en', label: 'English',   flag: '🇬🇧' },
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'fr', label: 'Français',  flag: '🇫🇷' },
    { code: 'es', label: 'Español',   flag: '🇪🇸' },
    { code: 'de', label: 'Deutsch',   flag: '🇩🇪' },
    { code: 'it', label: 'Italiano',  flag: '🇮🇹' },
  ],

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

    // Find the Letter
    'settings.gameMode':       'Game Mode',
    'settings.gameMode.trace': 'Trace',
    'settings.gameMode.find':  'Find',

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

    // Find the Letter
    'settings.gameMode':       'Modo de Jogo',
    'settings.gameMode.trace': 'Traçar',
    'settings.gameMode.find':  'Encontrar',

    // Complete
    'complete.hooray':    'Eba!',
    'complete.myAnimals': 'Meus Animais',
    'complete.next':      'Próximo Animal',
    'complete.greatJob':  'Muito bem! 🎉',
  },

  fr: {
    // Landing
    'landing.title':      'Lettres des Animaux',
    'landing.subtitle':   'Tracez les lettres. Rencontrez l\'animal !',
    'landing.newGame':    'Nouveau jeu',
    'landing.continue':   'Continuer',
    'landing.myAnimals':  'Mes Animaux',
    'landing.settings':   'Paramètres',

    // Setup / Settings
    'setup.title':        'Paramètres',
    'setup.nameLength':   'Nom le plus long : {n} lettres',
    'setup.letterStyle':  'Style de lettre',
    'setup.case.upper':   'ABC (majuscules)',
    'setup.case.proper':  'Abc (normale)',
    'setup.case.lower':   'abc (minuscules)',
    'setup.pictures':     'Images d\'animaux',
    'setup.cartoon':      'Dessin',
    'setup.realistic':    'Réaliste',
    'setup.reveal':       'Afficher le mot au fur et à mesure',
    'setup.faint':        'Léger → gras',
    'setup.hidden':       'Caché → révéler',
    'setup.volume':       'Volume',
    'setup.language':     'Langue',
    'setup.back':         'Retour',
    'setup.newGame':      'Nouveau jeu',
    'setup.noAnimals':    'Aucun animal ne correspond. Essayez un nom plus long.',
    'setup.gallery':      'Progression de la galerie',
    'setup.clearGallery': 'Effacer la galerie ({n} trouvés)',
    'setup.clearConfirm': 'Effacer tous les animaux trouvés et recommencer ?',
    'setup.reviewTools':  'Outils de révision',
    'setup.letterPatterns':'Modèles de lettres',
    'setup.animalImages': 'Images d\'animaux',

    // Game
    'game.restart':       'Recommencer la lettre',
    'game.skip':          'Passer l\'animal',

    // Find the Letter
    'settings.gameMode':       'Mode de Jeu',
    'settings.gameMode.trace': 'Tracer',
    'settings.gameMode.find':  'Trouver',

    // Complete
    'complete.hooray':    'Bravo !',
    'complete.myAnimals': 'Mes Animaux',
    'complete.next':      'Animal suivant',
    'complete.greatJob':  'Excellent travail ! 🎉',
  },

  es: {
    // Landing
    'landing.title':      'Letras de Animales',
    'landing.subtitle':   '¡Traza las letras. Conoce al animal!',
    'landing.newGame':    'Nuevo juego',
    'landing.continue':   'Continuar',
    'landing.myAnimals':  'Mis Animales',
    'landing.settings':   'Ajustes',

    // Setup / Settings
    'setup.title':        'Ajustes',
    'setup.nameLength':   'Nombre más largo: {n} letras',
    'setup.letterStyle':  'Estilo de letra',
    'setup.case.upper':   'ABC (mayúsculas)',
    'setup.case.proper':  'Abc (normal)',
    'setup.case.lower':   'abc (minúsculas)',
    'setup.pictures':     'Imágenes de animales',
    'setup.cartoon':      'Dibujo',
    'setup.realistic':    'Realista',
    'setup.reveal':       'Mostrar la palabra al escribir',
    'setup.faint':        'Tenue → negrita',
    'setup.hidden':       'Oculto → revelar',
    'setup.volume':       'Volumen',
    'setup.language':     'Idioma',
    'setup.back':         'Volver',
    'setup.newGame':      'Nuevo juego',
    'setup.noAnimals':    'Ningún animal encaja. Intenta un nombre más largo.',
    'setup.gallery':      'Progreso de la galería',
    'setup.clearGallery': 'Borrar galería ({n} encontrados)',
    'setup.clearConfirm': '¿Borrar todos los animales encontrados y empezar de nuevo?',
    'setup.reviewTools':  'Herramientas de revisión',
    'setup.letterPatterns':'Patrones de letras',
    'setup.animalImages': 'Imágenes de animales',

    // Game
    'game.restart':       'Reiniciar letra',
    'game.skip':          'Saltar animal',

    // Find the Letter
    'settings.gameMode':       'Modo de Juego',
    'settings.gameMode.trace': 'Trazar',
    'settings.gameMode.find':  'Encontrar',

    // Complete
    'complete.hooray':    '¡Hurra!',
    'complete.myAnimals': 'Mis Animales',
    'complete.next':      'Siguiente animal',
    'complete.greatJob':  '¡Muy bien! 🎉',
  },

  de: {
    // Landing
    'landing.title':      'Tierbuchstaben',
    'landing.subtitle':   'Male die Buchstaben. Lerne das Tier kennen!',
    'landing.newGame':    'Neues Spiel',
    'landing.continue':   'Weiter',
    'landing.myAnimals':  'Meine Tiere',
    'landing.settings':   'Einstellungen',

    // Setup / Settings
    'setup.title':        'Einstellungen',
    'setup.nameLength':   'Längster Tiername: {n} Buchstaben',
    'setup.letterStyle':  'Buchstabenstil',
    'setup.case.upper':   'ABC (Großbuchstaben)',
    'setup.case.proper':  'Abc (Normal)',
    'setup.case.lower':   'abc (Kleinbuchstaben)',
    'setup.pictures':     'Tierbilder',
    'setup.cartoon':      'Zeichnung',
    'setup.realistic':    'Realistisch',
    'setup.reveal':       'Wort beim Schreiben anzeigen',
    'setup.faint':        'Blass → fett',
    'setup.hidden':       'Versteckt → enthüllen',
    'setup.volume':       'Lautstärke',
    'setup.language':     'Sprache',
    'setup.back':         'Zurück',
    'setup.newGame':      'Neues Spiel',
    'setup.noAnimals':    'Kein Tier passt. Versuche einen längeren Namen.',
    'setup.gallery':      'Galerie-Fortschritt',
    'setup.clearGallery': 'Galerie löschen ({n} gefunden)',
    'setup.clearConfirm': 'Alle gefundenen Tiere löschen und neu beginnen?',
    'setup.reviewTools':  'Überprüfungswerkzeuge',
    'setup.letterPatterns':'Buchstabenmuster',
    'setup.animalImages': 'Tierbilder',

    // Game
    'game.restart':       'Buchstabe wiederholen',
    'game.skip':          'Tier überspringen',

    // Find the Letter
    'settings.gameMode':       'Spielmodus',
    'settings.gameMode.trace': 'Zeichnen',
    'settings.gameMode.find':  'Finden',

    // Complete
    'complete.hooray':    'Hurra!',
    'complete.myAnimals': 'Meine Tiere',
    'complete.next':      'Nächstes Tier',
    'complete.greatJob':  'Toll gemacht! 🎉',
  },

  it: {
    // Landing
    'landing.title':      'Lettere degli Animali',
    'landing.subtitle':   'Traccia le lettere. Incontra l\'animale!',
    'landing.newGame':    'Nuovo gioco',
    'landing.continue':   'Continua',
    'landing.myAnimals':  'I miei animali',
    'landing.settings':   'Impostazioni',

    // Setup / Settings
    'setup.title':        'Impostazioni',
    'setup.nameLength':   'Nome più lungo: {n} lettere',
    'setup.letterStyle':  'Stile lettera',
    'setup.case.upper':   'ABC (maiuscolo)',
    'setup.case.proper':  'Abc (normale)',
    'setup.case.lower':   'abc (minuscolo)',
    'setup.pictures':     'Immagini animali',
    'setup.cartoon':      'Cartone',
    'setup.realistic':    'Realistico',
    'setup.reveal':       'Mostra la parola mentre scrivi',
    'setup.faint':        'Leggero → grassetto',
    'setup.hidden':       'Nascosto → rivela',
    'setup.volume':       'Volume',
    'setup.language':     'Lingua',
    'setup.back':         'Indietro',
    'setup.newGame':      'Nuovo gioco',
    'setup.noAnimals':    'Nessun animale corrisponde. Prova un nome più lungo.',
    'setup.gallery':      'Progresso galleria',
    'setup.clearGallery': 'Cancella galleria ({n} trovati)',
    'setup.clearConfirm': 'Cancellare tutti gli animali trovati e ricominciare?',
    'setup.reviewTools':  'Strumenti di revisione',
    'setup.letterPatterns':'Modelli di lettere',
    'setup.animalImages': 'Immagini animali',

    // Game
    'game.restart':       'Ripeti la lettera',
    'game.skip':          'Salta animale',

    // Find the Letter
    'settings.gameMode':       'Modalità di Gioco',
    'settings.gameMode.trace': 'Traccia',
    'settings.gameMode.find':  'Trova',

    // Complete
    'complete.hooray':    'Evviva!',
    'complete.myAnimals': 'I miei animali',
    'complete.next':      'Animale successivo',
    'complete.greatJob':  'Ottimo lavoro! 🎉',
  },
};

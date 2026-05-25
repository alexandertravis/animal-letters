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
// The existing plain-object stories below continue to work unchanged.

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
// Plain-object stories (legacy format) and APP.Story instances both work with
// the storyreader. New stories are authored as APP.Story instances, each in
// their own file under data/stories/<slug>.js.
//
// Plain-object fields (for legacy entries below):
//   id           — unique key
//   title        — { en, pt, fr, es, de, it } locale map (or plain string for compat)
//   color        — cover background colour
//   requirements — array of { animalId, minCount, label }
//   pages        — ordered array of { text, image }
//                  text:  { en, pt, fr, es, de, it } locale map for that page
//                  image: path to the illustration SVG (shown on right panel)
//
// The storyreader adds synthetic title and outro spreads automatically.
// Do NOT add them here — only story content pages belong in this array.

APP.STORIES = [
  {
    id: 'goldilocks',
    title: {
      en: 'Goldilocks and the Three Bears',
      pt: 'Cachinhos Dourados e os Três Ursos',
      fr: 'Boucle d\'Or et les Trois Ours',
      es: 'Ricitos de Oro y los Tres Osos',
      de: 'Goldlöckchen und die drei Bären',
      it: 'Riccioli d\'Oro e i Tre Orsi'
    },
    color: '#ff8906',
    leather: 'burgundy', board: 'sun',
    requirements: [
      { animalId: 'bear', minCount: 3, label: 'Complete Bear 3×' }
    ],
    pages: [
      {
        text: {
          en: 'Once upon a time, three bears lived in a house in the forest. There was Papa Bear, Mama Bear, and little Baby Bear.',
          pt: 'Era uma vez, três ursos que viviam numa casa na floresta. Havia o Papá Urso, a Mamã Ursa e o pequeno Bebé Urso.',
          fr: 'Il était une fois trois ours qui vivaient dans une maison dans la forêt. Il y avait Papa Ours, Maman Ours et le petit Bébé Ours.',
          es: 'Érase una vez tres osos que vivían en una casa en el bosque. Había un Papá Oso, una Mamá Osa y un pequeño Osito.',
          de: 'Es war einmal eine Bärenfamilie, die in einem Haus im Wald lebte. Es gab Papa Bär, Mama Bär und den kleinen Baby Bär.',
          it: 'C\'era una volta una famiglia di tre orsi che viveva in una casa nel bosco. C\'erano Papà Orso, Mamma Orsa e il piccolo Orsetto.'
        },
        image: 'assets/images/cartoon/bear.svg'
      },
      {
        text: {
          en: 'One day a girl called Goldilocks found the bears’ empty house and went inside. She tasted three bowls of porridge. The little bowl was just right — she ate it all up!',
          pt: 'Um dia, uma rapariga chamada Cachinhos Dourados encontrou a casa vazia dos ursos e entrou. Provou três tigelas de papa. A tigela pequena estava perfeita — comeu tudo!',
          fr: 'Un jour, une petite fille appelée Boucle d\'Or trouva la maison vide des ours et entra. Elle goûta trois bols de bouillie. Le petit bol était parfait — elle le mangea tout entier !',
          es: 'Un día, una niña llamada Ricitos de Oro encontró la casa vacía de los osos y entró. Probó tres tazones de gachas. ¡El tazón pequeño era perfecto y se lo comió todo!',
          de: 'Eines Tages fand ein Mädchen namens Goldlöckchen das leere Haus der Bären und ging hinein. Sie probierte drei Schüsseln Brei. Die kleine Schüssel war genau richtig — sie aß sie leer!',
          it: 'Un giorno una bambina di nome Riccioli d\'Oro trovò la casa degli orsi vuota ed entrò. Assaggiò tre scodelle di pappa. La scodella piccola era perfetta — la mangiò tutta!'
        },
        image: 'assets/images/cartoon/bear.svg'
      },
      {
        text: {
          en: 'She tried three chairs. The little chair was just right — but it broke! Then she found three beds and fell fast asleep in Baby Bear’s cosy bed.',
          pt: 'Experimentou três cadeiras. A cadeirinha era perfeita — mas partiu-se! Depois encontrou três camas e adormeceu na cama aconchegante do Bebé Urso.',
          fr: 'Elle essaya trois chaises. La petite chaise était parfaite — mais elle se cassa ! Puis elle trouva trois lits et s\'endormit profondément dans le lit douillet de Bébé Ours.',
          es: 'Probó tres sillas. La sillita era perfecta, ¡pero se rompió! Luego encontró tres camas y se quedó dormida en la cómoda camita del Osito.',
          de: 'Sie probierte drei Stühle. Das kleine Stühlchen war genau richtig — aber es zerbrach! Dann fand sie drei Betten und schlief tief und fest in Baby Bärs gemütlichem Bett ein.',
          it: 'Provò tre sedie. La seggiolina era perfetta, ma si ruppe! Poi trovò tre letti e si addormentò nel letto accogliente dell\'Orsetto.'
        },
        image: 'assets/images/cartoon/bear.svg'
      },
      {
        text: {
          en: 'The bears came home. “Someone’s been eating my porridge — and eaten it all up!” cried Baby Bear.',
          pt: '"Alguém comeu a minha papa — e comeu tudo!" chorou o Bebé Urso.',
          fr: '« Quelqu\'un a mangé ma bouillie — et il a tout mangé ! » pleura Bébé Ours.',
          es: '"¡Alguien ha comido mi gachas y se las ha comido todas!" lloró el Osito.',
          de: '„Jemand hat mein Brei gegessen — und alles aufgegessen!", rief Baby Bär.',
          it: '"Qualcuno ha mangiato la mia pappa — e l\'ha mangiata tutta!" pianse l\'Orsetto.'
        },
        image: 'assets/images/cartoon/bear.svg'
      },
      {
        text: {
          en: '“Someone’s been sleeping in my bed — and she’s still there!” Goldilocks woke up, saw the three bears, jumped out the window, and ran all the way home.',
          pt: '"Alguém dormiu na minha cama — e ainda está lá!" Cachinhos Dourados acordou, viu os três ursos, saltou pela janela e correu para casa.',
          fr: '« Quelqu\'un a dormi dans mon lit — et elle est encore là ! » Boucle d\'Or se réveilla, vit les trois ours, sauta par la fenêtre et courut jusqu\'à chez elle.',
          es: '"¡Alguien ha dormido en mi cama y todavía está ahí!" Ricitos de Oro se despertó, vio a los tres osos, saltó por la ventana y corrió a casa.',
          de: '„Jemand hat in meinem Bett geschlafen — und liegt noch drin!" Goldlöckchen wachte auf, sah die drei Bären, sprang aus dem Fenster und lief den ganzen Weg nach Hause.',
          it: '"Qualcuno ha dormito nel mio letto — ed è ancora lì!" Riccioli d\'Oro si svegliò, vide i tre orsi, saltò dalla finestra e corse a casa.'
        },
        image: 'assets/images/cartoon/bear.svg'
      }
    ]
  },

  {
    id: 'three-pigs',
    title: {
      en: 'The Three Little Pigs',
      pt: 'Os Três Porquinhos',
      fr: 'Les Trois Petits Cochons',
      es: 'Los Tres Cerditos',
      de: 'Die drei kleinen Schweinchen',
      it: 'I Tre Porcellini'
    },
    color: '#f582ae',
    leather: 'plum', board: 'rose',
    requirements: [
      { animalId: 'pig',  minCount: 3, label: 'Complete Pig 3×' },
      { animalId: 'wolf', minCount: 1, label: 'Find the Wolf' }
    ],
    pages: [
      {
        text: {
          en: 'Once upon a time, three little pigs set off to build their very own homes.',
          pt: 'Era uma vez, três porquinhos que partiram para construir as suas próprias casas.',
          fr: 'Il était une fois trois petits cochons qui partirent construire leurs propres maisons.',
          es: 'Érase una vez tres cerditos que se fueron a construir sus propias casas.',
          de: 'Es war einmal drei kleine Schweinchen, die aufbrachen, um ihre eigenen Häuser zu bauen.',
          it: 'C\'era una volta tre porcellini che partirono a costruire le loro case.'
        },
        image: 'assets/images/cartoon/pig.svg'
      },
      {
        text: {
          en: 'The first pig built a house of straw. The second built a house of sticks. The third worked hard and built a house of strong bricks.',
          pt: 'O primeiro porquinho construiu uma casa de palha. O segundo construiu uma casa de paus. O terceiro trabalhou muito e construiu uma casa de tijolos resistentes.',
          fr: 'Le premier cochon construisit une maison en paille. Le deuxième construisit une maison en bois. Le troisième travailla dur et construisit une solide maison en briques.',
          es: 'El primer cerdito construyó una casa de paja. El segundo construyó una casa de palos. El tercero trabajó duro y construyó una casa de ladrillos resistentes.',
          de: 'Das erste Schweinchen baute ein Haus aus Stroh. Das zweite baute ein Haus aus Stöcken. Das dritte arbeitete fleißig und baute ein Haus aus festen Ziegelsteinen.',
          it: 'Il primo porcellino costruì una casa di paglia. Il secondo costruì una casa di legno. Il terzo lavorò sodo e costruì una casa di mattoni solidi.'
        },
        image: 'assets/images/cartoon/pig.svg'
      },
      {
        text: {
          en: 'Then the big bad wolf arrived! He huffed and puffed and blew the straw house down. The first pig ran to his brother’s house!',
          pt: 'Então chegou o grande lobo mau! Ele soprou e soprou e derrubou a casa de palha. O primeiro porquinho correu para a casa do irmão!',
          fr: 'Puis le grand méchant loup arriva ! Il souffla, souffla et fit tomber la maison de paille. Le premier cochon courut chez son frère !',
          es: '¡Entonces llegó el gran lobo feroz! Sopló y sopló y derribó la casa de paja. ¡El primer cerdito corrió a la casa de su hermano!',
          de: 'Da kam der böse große Wolf! Er pustete und blies und blies das Strohhaus um. Das erste Schweinchen lief zum Haus seines Bruders!',
          it: 'Poi arrivò il grande lupo cattivo! Soffiò e soffiò e abbatté la casa di paglia. Il primo porcellino corse a casa del fratello!'
        },
        image: 'assets/images/cartoon/wolf.svg'
      },
      {
        text: {
          en: 'The wolf huffed and puffed again and blew the stick house down too! Both pigs raced to the brick house.',
          pt: 'O lobo soprou de novo e derrubou também a casa de paus! Os dois porquinhos correram para a casa de tijolos.',
          fr: 'Le loup souffla encore et fit tomber la maison de bois aussi ! Les deux cochons coururent vers la maison en briques.',
          es: '¡El lobo sopló de nuevo y también derribó la casa de palos! Los dos cerditos corrieron a la casa de ladrillos.',
          de: 'Der Wolf pustete und blies wieder und blies auch das Stockhaus um! Beide Schweinchen rannten zum Backsteinhaus.',
          it: 'Il lupo soffiò ancora e abbatté anche la casa di legno! I due porcellini corsero verso la casa di mattoni.'
        },
        image: 'assets/images/cartoon/wolf.svg'
      },
      {
        text: {
          en: 'The wolf huffed and puffed with all his might — but the brick house stood strong. The three little pigs were safe and lived happily ever after.',
          pt: 'O lobo soprou com toda a sua força — mas a casa de tijolos aguentou firme. Os três porquinhos estavam salvos e viveram felizes para sempre.',
          fr: 'Le loup souffla de toutes ses forces — mais la maison en briques tint bon. Les trois petits cochons étaient saufs et vécurent heureux pour toujours.',
          es: 'El lobo sopló con todas sus fuerzas, pero la casa de ladrillos se mantuvo firme. Los tres cerditos estaban a salvo y vivieron felices para siempre.',
          de: 'Der Wolf pustete aus Leibeskräften — aber das Backsteinhaus hielt stand. Die drei kleinen Schweinchen waren in Sicherheit und lebten glücklich bis ans Ende ihrer Tage.',
          it: 'Il lupo soffiò con tutta la sua forza, ma la casa di mattoni resse. I tre porcellini erano al sicuro e vissero felici e contenti.'
        },
        image: 'assets/images/cartoon/pig.svg'
      }
    ]
  },

  {
    id: 'hare-tortoise',
    title: {
      en: 'The Hare and the Tortoise',
      pt: 'A Lebre e a Tartaruga',
      fr: 'Le Lièvre et la Tortue',
      es: 'La Liebre y la Tortuga',
      de: 'Der Hase und die Schildkröte',
      it: 'La Lepre e la Tartaruga'
    },
    color: '#8bd3dd',
    leather: 'forest', board: 'sky',
    requirements: [
      { animalId: 'rabbit', minCount: 1, label: 'Find the Rabbit' },
      { animalId: 'turtle', minCount: 1, label: 'Find the Turtle' }
    ],
    pages: [
      {
        text: {
          en: 'Once upon a time, a hare loved to boast about how fast he could run. “I’m the fastest animal around!” he said.',
          pt: 'Era uma vez uma lebre que adorava gabar-se de como corria depressa. "Sou o animal mais rápido de todos!" dizia ela.',
          fr: 'Il était une fois un lièvre qui adorait se vanter de sa vitesse. « Je suis l\'animal le plus rapide du coin ! » disait-il.',
          es: 'Érase una vez una liebre que le encantaba presumir de lo rápido que corría. "¡Soy el animal más rápido de todos!" decía.',
          de: 'Es war einmal ein Hase, der sich gern rühmte, wie schnell er laufen konnte. „Ich bin das schnellste Tier weit und breit!", sagte er.',
          it: 'C\'era una volta una lepre che amava vantarsi di quanto corresse veloce. "Sono l\'animale più veloce di tutti!" diceva.'
        },
        image: 'assets/images/cartoon/rabbit.svg'
      },
      {
        text: {
          en: 'A slow old tortoise heard this and said, “I challenge you to a race!” The hare laughed but agreed.',
          pt: 'Uma tartaruga velha e lenta ouviu isto e disse: "Eu desafio-te para uma corrida!" A lebre riu-se mas aceitou.',
          fr: 'Une vieille tortue lente entendit cela et dit : « Je te défie à la course ! » Le lièvre rit mais accepta.',
          es: 'Una tortuga vieja y lenta oyó esto y dijo: "¡Te desafío a una carrera!" La liebre se rió pero aceptó.',
          de: 'Eine alte, langsame Schildkröte hörte das und sagte: „Ich fordere dich zum Wettrennen heraus!" Der Hase lachte, stimmte aber zu.',
          it: 'Una vecchia tartaruga lenta sentì queste parole e disse: "Ti sfido a una gara!" La lepre rise, ma accettò.'
        },
        image: 'assets/images/cartoon/turtle.svg'
      },
      {
        text: {
          en: 'At the start the hare sprinted far ahead. He was so confident he decided to take a nap under a shady tree.',
          pt: 'No início, a lebre correu muito à frente. Estava tão confiante que decidiu fazer uma sesta debaixo de uma árvore à sombra.',
          fr: 'Au départ, le lièvre sprinta loin devant. Il était tellement sûr de lui qu\'il décida de faire une sieste sous un arbre ombragé.',
          es: 'Al principio, la liebre corrió muy por delante. Estaba tan confiada que decidió echarse una siesta bajo un árbol frondoso.',
          de: 'Zu Beginn sprintete der Hase weit voraus. Er war so selbstsicher, dass er beschloss, ein Nickerchen unter einem schattigen Baum zu machen.',
          it: 'All\'inizio la lepre scattò molto avanti. Era così sicura di sé che decise di fare un sonnellino sotto un albero ombroso.'
        },
        image: 'assets/images/cartoon/rabbit.svg'
      },
      {
        text: {
          en: 'Slowly and steadily the tortoise kept walking. Step by step, he passed the sleeping hare.',
          pt: 'Lenta e constantemente, a tartaruga continuou a caminhar. Passo a passo, passou pela lebre adormecida.',
          fr: 'Lentement et régulièrement, la tortue continua d\'avancer. Pas à pas, elle dépassa le lièvre endormi.',
          es: 'Lenta pero constantemente, la tortuga siguió caminando. Paso a paso, pasó junto a la liebre dormida.',
          de: 'Langsam und stetig ging die Schildkröte weiter. Schritt für Schritt überholte sie den schlafenden Hasen.',
          it: 'Lenta ma costante, la tartaruga continuò a camminare. Passo dopo passo, superò la lepre addormentata.'
        },
        image: 'assets/images/cartoon/turtle.svg'
      },
      {
        text: {
          en: 'When the hare woke up he ran as fast as he could — but it was too late! The tortoise had already crossed the finish line. Slow and steady wins the race!',
          pt: 'Quando a lebre acordou, correu o mais depressa que conseguiu — mas era tarde demais! A tartaruga já tinha cruzado a linha de chegada. Devagar e sempre se ganha a corrida!',
          fr: 'Quand le lièvre se réveilla, il courut aussi vite qu\'il put — mais c\'était trop tard ! La tortue avait déjà franchi la ligne d\'arrivée. Rien ne sert de courir, il faut partir à point !',
          es: 'Cuando la liebre se despertó, corrió tan rápido como pudo, ¡pero era demasiado tarde! La tortuga ya había cruzado la línea de meta. ¡El que persevera, triunfa!',
          de: 'Als der Hase aufwachte, rannte er so schnell er konnte — doch es war zu spät! Die Schildkröte hatte die Ziellinie bereits überquert. Langsam und stetig gewinnt das Rennen!',
          it: 'Quando la lepre si svegliò corse più veloce che poteva, ma era troppo tardi! La tartaruga aveva già tagliato il traguardo. Chi va piano, va sano e va lontano!'
        },
        image: 'assets/images/cartoon/turtle.svg'
      }
    ]
  },

  {
    id: 'ugly-duckling',
    title: {
      en: 'The Ugly Duckling',
      pt: 'O Patinho Feio',
      fr: 'Le Vilain Petit Canard',
      es: 'El Patito Feo',
      de: 'Das hässliche Entlein',
      it: 'Il Brutto Anatroccolo'
    },
    color: '#5390d9',
    leather: 'navy', board: 'sky',
    requirements: [
      { animalId: 'duck', minCount: 3, label: 'Complete Duck 3×' },
      { animalId: 'swan', minCount: 1, label: 'Find the Swan' }
    ],
    pages: [
      {
        text: {
          en: 'Once upon a time, a mother duck waited for her eggs to hatch. One by one, fluffy yellow ducklings appeared — but the last egg was much bigger than the rest.',
          pt: 'Era uma vez uma pata que esperava pelos seus ovos. Um a um, surgiram patinhos amarelos e fofinhos — mas o último ovo era muito maior do que os outros.',
          fr: 'Il était une fois une cane qui attendait l\'éclosion de ses œufs. Un à un, de jolis canetons jaunes apparurent — mais le dernier œuf était bien plus grand que les autres.',
          es: 'Érase una vez una pata que esperaba que sus huevos eclosionaran. Uno a uno aparecieron patitos amarillos y esponjosos, pero el último huevo era mucho más grande que los demás.',
          de: 'Es war einmal eine Ente, die auf ihre Eier wartete. Eines nach dem anderen schlüpften flauschige gelbe Entenküken — doch das letzte Ei war viel größer als die anderen.',
          it: 'C\'era una volta una madre anatra che aspettava la schiusa delle sue uova. Uno dopo l\'altro apparvero anatroccoli gialli e soffici, ma l\'ultimo uovo era molto più grande degli altri.'
        },
        image: 'assets/images/cartoon/duck.svg'
      },
      {
        text: {
          en: 'From the big egg hatched a grey, clumsy duckling. “What an ugly duckling!” said the other animals. The poor duckling felt very sad and ran away.',
          pt: 'Do ovo grande nasceu um patinho cinzento e desajeitado. "Que patinho feio!" disseram os outros animais. O pobre patinho ficou muito triste e fugiu.',
          fr: 'Du grand œuf sortit un caneton gris et maladroit. « Quel vilain petit canard ! » dirent les autres animaux. Le pauvre caneton se sentit très triste et s\'enfuit.',
          es: 'Del gran huevo salió un patito gris y torpe. "¡Qué patito tan feo!" dijeron los demás animales. El pobre patito se sintió muy triste y se escapó.',
          de: 'Aus dem großen Ei schlüpfte ein graues, ungeschicktes Entlein. „Was für ein hässliches Entlein!", sagten die anderen Tiere. Das arme Entlein war sehr traurig und lief fort.',
          it: 'Dal grande uovo nacque un anatroccolo grigio e goffo. "Che brutto anatroccolo!" dissero gli altri animali. Il povero anatroccolo era molto triste e se ne andò via.'
        },
        image: 'assets/images/cartoon/duck.svg'
      },
      {
        text: {
          en: 'All winter the ugly duckling wandered alone through the cold and snow, with no one to play with.',
          pt: 'Durante todo o inverno, o patinho feio vagueou sozinho pelo frio e pela neve, sem ninguém com quem brincar.',
          fr: 'Tout l\'hiver, le vilain petit canard erra seul dans le froid et la neige, sans personne avec qui jouer.',
          es: 'Durante todo el invierno, el patito feo vagó solo por el frío y la nieve, sin nadie con quien jugar.',
          de: 'Den ganzen Winter lang wanderte das hässliche Entlein allein durch die Kälte und den Schnee, ohne jemanden zum Spielen.',
          it: 'Per tutto l\'inverno il brutto anatroccolo vagò da solo nel freddo e nella neve, senza nessuno con cui giocare.'
        },
        image: 'assets/images/cartoon/duck.svg'
      },
      {
        text: {
          en: 'When spring came, the duckling saw beautiful white birds gliding on a lake. He swam towards them, certain they would chase him away.',
          pt: 'Quando chegou a primavera, o patinho viu belas aves brancas a deslizar num lago. Nadou na direção delas, certo de que o iriam afastar.',
          fr: 'Quand le printemps arriva, le caneton vit de beaux oiseaux blancs glissant sur un lac. Il nagea vers eux, certain qu\'ils le chasseraient.',
          es: 'Cuando llegó la primavera, el patito vio hermosos pájaros blancos deslizándose en un lago. Nadó hacia ellos, seguro de que lo ahuyentarían.',
          de: 'Als der Frühling kam, sah das Entlein wunderschöne weiße Vögel auf einem See gleiten. Es schwamm auf sie zu, sicher, dass sie es vertreiben würden.',
          it: 'Quando arrivò la primavera, l\'anatroccolo vide bellissimi uccelli bianchi scivolare su un lago. Nuotò verso di loro, certo che lo avrebbero cacciato via.'
        },
        image: 'assets/images/cartoon/swan.svg'
      },
      {
        text: {
          en: 'He looked at his reflection — and saw a beautiful white swan! He had become the most graceful bird of all, and was never lonely again.',
          pt: 'Olhou para o seu reflexo — e viu um belo cisne branco! Tornara-se o pássaro mais elegante de todos, e nunca mais se sentiu sozinho.',
          fr: 'Il regarda son reflet — et vit un magnifique cygne blanc ! Il était devenu l\'oiseau le plus gracieux de tous, et ne fut plus jamais seul.',
          es: 'Miró su reflejo y vio un hermoso cisne blanco. ¡Se había convertido en el pájaro más elegante de todos y nunca más volvió a sentirse solo!',
          de: 'Er schaute auf sein Spiegelbild — und sah einen wunderschönen weißen Schwan! Er war zum anmutigsten aller Vögel geworden und war nie wieder einsam.',
          it: 'Si guardò allo specchio e vide un bellissimo cigno bianco! Era diventato l\'uccello più elegante di tutti e non si sentì mai più solo.'
        },
        image: 'assets/images/cartoon/swan.svg'
      }
    ]
  },

  {
    id: 'three-billy-goats',
    title: {
      en: 'Three Billy Goats Gruff',
      pt: 'Os Três Bodes Brigueiros',
      fr: 'Les Trois Boucs Bourrus',
      es: 'Los Tres Cabritos Gruñones',
      de: 'Die drei Ziegenböcke Gruff',
      it: 'I Tre Capri Brontoloni'
    },
    color: '#2dc653',
    leather: 'tan', board: 'sage',
    requirements: [
      { animalId: 'goat', minCount: 3, label: 'Complete Goat 3×' }
    ],
    pages: [
      {
        text: {
          en: 'Once upon a time, three Billy Goats Gruff wanted to cross a bridge to eat the sweet green grass on the other side.',
          pt: 'Era uma vez, três bodes brigueiros que queriam atravessar uma ponte para comer a erva verde e doce do outro lado.',
          fr: 'Il était une fois trois boucs bourrus qui voulaient traverser un pont pour manger l\'herbe verte et sucrée de l\'autre côté.',
          es: 'Érase una vez tres cabritos gruñones que querían cruzar un puente para comer la hierba verde y dulce del otro lado.',
          de: 'Es war einmal drei Ziegenböcke Gruff, die über eine Brücke gehen wollten, um das süße grüne Gras auf der anderen Seite zu fressen.',
          it: 'C\'era una volta tre capri brontoloni che volevano attraversare un ponte per mangiare l\'erba verde e dolce dall\'altra parte.'
        },
        image: 'assets/images/cartoon/goat.svg'
      },
      {
        text: {
          en: 'Under the bridge lived a terrible troll with huge eyes and a very loud voice. “Who’s that trip-trapping over my bridge?” he roared.',
          pt: 'Debaixo da ponte vivia um troll terrível com olhos enormes e uma voz muito alta. "Quem vai lá a traversar a minha ponte?" rugiu ele.',
          fr: 'Sous le pont vivait un terrible troll aux yeux énormes et à la voix très forte. « Qui est-ce qui trotte-trotte sur mon pont ? » rugit-il.',
          es: 'Bajo el puente vivía un terrible troll con enormes ojos y una voz muy fuerte. "¿Quién trota sobre mi puente?" rugió.',
          de: 'Unter der Brücke lebte ein schrecklicher Troll mit riesigen Augen und sehr lauter Stimme. „Wer trampelt da über meine Brücke?", brüllte er.',
          it: 'Sotto il ponte viveva un terribile troll con occhi enormi e una voce molto forte. "Chi calpesta il mio ponte?" ruggì.'
        },
        image: 'assets/images/cartoon/goat.svg'
      },
      {
        text: {
          en: 'Little Billy Goat crossed first. “Don’t eat me — wait for my bigger brother!” The troll agreed. Middle Billy Goat said the same thing.',
          pt: 'O bode mais pequeno atravessou primeiro. "Não me comas — espera pelo meu irmão maior!" O troll concordou. O bode do meio disse o mesmo.',
          fr: 'Le petit bouc traversa en premier. « Ne me mangez pas — attendez mon grand frère ! » Le troll accepta. Le bouc du milieu dit la même chose.',
          es: 'El cabrito pequeño cruzó primero. "¡No me comas, espera a mi hermano mayor!" El troll aceptó. El cabrito mediano dijo lo mismo.',
          de: 'Der kleine Ziegenbock überquerte zuerst. „Fress mich nicht — warte auf meinen größeren Bruder!" Der Troll stimmte zu. Der mittlere Ziegenbock sagte dasselbe.',
          it: 'Il capro piccolo attraversò per primo. "Non mangiarmi, aspetta il mio fratello più grande!" Il troll accettò. Il capro di mezzo disse la stessa cosa.'
        },
        image: 'assets/images/cartoon/goat.svg'
      },
      {
        text: {
          en: 'Then Great Big Billy Goat Gruff came thundering across. The troll leaped up to stop him — but the great big goat tossed him into the river with a mighty crash!',
          pt: 'Então o Grande Bode Brigueiro atravessou a trovejar. O troll saltou para o parar — mas o grande bode atirou-o ao rio com um estrondo enorme!',
          fr: 'Puis le Grand Bouc Bourru traversa en tonnant. Le troll bondit pour l\'arrêter — mais le grand bouc le jeta dans la rivière avec un fracas retentissant !',
          es: 'Entonces el Gran Cabrito Gruñón cruzó tronando. El troll saltó para detenerlo, ¡pero el gran cabrito lo lanzó al río con un tremendo golpe!',
          de: 'Dann donnerte der große Ziegenbock Gruff über die Brücke. Der Troll sprang auf, um ihn aufzuhalten — doch der riesige Bock warf ihn mit einem gewaltigen Krach in den Fluss!',
          it: 'Poi il Grande Capro Brontolone attraversò tuonando. Il troll saltò per fermarlo, ma il grande capro lo scaraventò nel fiume con un gran fragore!'
        },
        image: 'assets/images/cartoon/goat.svg'
      },
      {
        text: {
          en: 'The troll was never seen again. All three billy goats crossed safely and ate the sweet green grass. Snip, snap, snout — this tale is told out!',
          pt: 'O troll nunca mais foi visto. Os três bodes atravessaram em segurança e comeram a erva verde e doce. Cric, crac, croça — a história está toda dita!',
          fr: 'Le troll ne fut plus jamais vu. Les trois boucs traversèrent en sécurité et mangèrent la belle herbe verte. Cric, crac, croc — le conte est terminé !',
          es: 'El troll no volvió a verse jamás. Los tres cabritos cruzaron sanos y salvos y comieron la hierba verde y dulce. ¡Y colorín colorado, este cuento se ha acabado!',
          de: 'Den Troll sah man nie wieder. Alle drei Ziegenböcke überquerten die Brücke sicher und fraßen das süße grüne Gras. Schnipp, schnapp, schnout — das Märchen ist aus!',
          it: 'Il troll non fu mai più visto. Tutti e tre i capri attraversarono incolumi e mangiarono l\'erba verde e dolce. Cric, crac, croc — la storia è finita!'
        },
        image: 'assets/images/cartoon/goat.svg'
      }
    ]
  },

  {
    id: 'three-blind-mice',
    title: {
      en: 'Three Blind Mice',
      pt: 'Três Ratinhos Cegos',
      fr: 'Trois Souris Aveugles',
      es: 'Tres Ratones Ciegos',
      de: 'Drei blinde Mäuse',
      it: 'Tre Topi Ciechi'
    },
    color: '#7b2d8b',
    leather: 'plum', board: 'rose',
    requirements: [
      { animalId: 'mouse', minCount: 3, label: 'Complete Mouse 3×' }
    ],
    pages: [
      {
        text: {
          en: 'Three blind mice, three blind mice — see how they run! Three little mice set off on an adventure, bumping into each other and tumbling merrily along.',
          pt: 'Três ratinhos cegos, três ratinhos cegos — vejam como correm! Três ratinhos partiram numa aventura, a esbarrar uns nos outros e a rolar alegremente.',
          fr: 'Trois souris aveugles, trois souris aveugles — regardez-les courir ! Trois petites souris partirent à l\'aventure, se heurtant et roulant joyeusement.',
          es: 'Tres ratones ciegos, tres ratones ciegos, ¡mirad cómo corren! Tres ratoncitos se lanzaron a una aventura, chocando entre sí y rodando alegremente.',
          de: 'Drei blinde Mäuse, drei blinde Mäuse — seht, wie sie rennen! Drei kleine Mäuse brachen auf zu einem Abenteuer, stießen gegeneinander und purzelten lustig umher.',
          it: 'Tre topi ciechi, tre topi ciechi — guardate come corrono! Tre topini partirono per un\'avventura, urtandosi e ruzzolando allegramente.'
        },
        image: 'assets/images/cartoon/mouse.svg'
      },
      {
        text: {
          en: 'They scurried across a field and smelled something wonderful — a great round cheese sitting on the farmer’s table! In they crept, sniff sniff sniff.',
          pt: 'Correram por um campo e cheiraram algo maravilhoso — um grande queijo redondo na mesa do agricultor! Entraram a furtivas, sniff sniff sniff.',
          fr: 'Ils coururent à travers un champ et sentirent quelque chose de merveilleux — un grand fromage rond sur la table du fermier ! Ils se glissèrent à l\'intérieur, reniflant, reniflant, reniflant.',
          es: 'Corrieron por un campo y olieron algo maravilloso: ¡un gran queso redondo en la mesa del granjero! Entraron sigilosamente, olfateando sin parar.',
          de: 'Sie huschten über ein Feld und rochen etwas Wunderbares — einen großen runden Käse auf dem Tisch des Bauern! Hinein schlichen sie sich, schnüffelnd, schnüffelnd, schnüffelnd.',
          it: 'Scorrazzarono per un campo e sentirono qualcosa di meraviglioso: un grande formaggio rotondo sul tavolo del contadino! Si infilarono dentro annusando, annusando, annusando.'
        },
        image: 'assets/images/cartoon/mouse.svg'
      },
      {
        text: {
          en: 'They all ran after the farmer’s wife, who chased them right out of the kitchen and away across the yard. Did you ever see such a sight in your life?',
          pt: 'Todos correram atrás da mulher do agricultor, que os perseguiu para fora da cozinha e pelo terreiro fora. Alguma vez viram tal coisa na vida?',
          fr: 'Ils coururent tous derrière la femme du fermier, qui les chassa hors de la cuisine et à travers la cour. A-t-on jamais vu pareille chose ?',
          es: 'Todos corrieron tras la esposa del granjero, que los persiguió fuera de la cocina y por todo el patio. ¿Habéis visto algo así en vuestra vida?',
          de: 'Alle liefen der Bäuerin nach, die sie aus der Küche und über den Hof jagte. Hat man je so etwas gesehen?',
          it: 'Corsero tutti dietro alla moglie del contadino, che li inseguì fuori dalla cucina e attraverso il cortile. Avete mai visto una cosa simile in vita vostra?'
        },
        image: 'assets/images/cartoon/mouse.svg'
      },
      {
        text: {
          en: 'The three mice were brave. They found a cosy barn full of crumbs and made it their home, dancing in a circle and singing their famous song.',
          pt: 'Os três ratinhos eram corajosos. Encontraram um celeiro acolhedor cheio de migalhas e fizeram-no a sua casa, dançando em círculo e cantando a sua famosa canção.',
          fr: 'Les trois souris étaient courageuses. Elles trouvèrent une grange douillette pleine de miettes et en firent leur maison, dansant en rond et chantant leur célèbre chanson.',
          es: 'Los tres ratones eran valientes. Encontraron un granero acogedor lleno de migas y lo convirtieron en su hogar, bailando en círculo y cantando su famosa canción.',
          de: 'Die drei Mäuse waren mutig. Sie fanden eine gemütliche Scheune voller Krümel und machten sie zu ihrem Zuhause, tanzten im Kreis und sangen ihr berühmtes Lied.',
          it: 'I tre topi erano coraggiosi. Trovarono un fienile accogliente pieno di briciole e ne fecero la loro casa, ballando in cerchio e cantando la loro famosa canzone.'
        },
        image: 'assets/images/cartoon/mouse.svg'
      },
      {
        text: {
          en: 'Three blind mice, three blind mice — they lived happily ever after, dancing and singing and sniffing out cheese wherever they went!',
          pt: 'Três ratinhos cegos, três ratinhos cegos — viveram felizes para sempre, a dançar, a cantar e a farejar queijo por onde quer que fossem!',
          fr: 'Trois souris aveugles, trois souris aveugles — elles vécurent heureuses pour toujours, dansant, chantant et reniflant du fromage partout où elles allaient !',
          es: '¡Tres ratones ciegos, tres ratones ciegos! Vivieron felices para siempre, bailando, cantando y olfateando queso adondequiera que fueran.',
          de: 'Drei blinde Mäuse, drei blinde Mäuse — sie lebten glücklich bis ans Ende ihrer Tage, tanzten und sangen und schnüffelten überall nach Käse!',
          it: 'Tre topi ciechi, tre topi ciechi: vissero felici e contenti, ballando, cantando e annusando formaggio ovunque andassero!'
        },
        image: 'assets/images/cartoon/mouse.svg'
      }
    ]
  },

  {
    id: 'hey-diddle-diddle',
    title: {
      en: 'Hey Diddle Diddle',
      pt: 'Arre Burrinho',
      fr: 'Hey Diddle Diddle',
      es: 'Hey Diddle Diddle',
      de: 'Hey Diddle Diddle',
      it: 'Hey Diddle Diddle'
    },
    color: '#1b4332',
    leather: 'forest', board: 'sage',
    requirements: [
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' },
      { animalId: 'dog', minCount: 1, label: 'Find the Dog' },
      { animalId: 'cow', minCount: 1, label: 'Find the Cow' }
    ],
    pages: [
      {
        text: {
          en: 'Hey diddle diddle, the cat and the fiddle! One magical night, a very musical cat picked up her violin and began to play the most enchanting tune under the bright full moon.',
          pt: 'Arre burrinho, o gato e o violino! Numa noite mágica, um gato muito musical pegou no seu violino e começou a tocar a melodia mais encantadora debaixo da lua cheia.',
          fr: 'Hey diddle diddle, le chat et le violon ! Une nuit magique, un chat très musical prit son violon et se mit à jouer l\'air le plus envoûtant sous la pleine lune lumineuse.',
          es: '¡Hey diddle diddle, el gato y el violín! Una noche mágica, un gato muy musical tomó su violín y comenzó a tocar la melodía más encantadora bajo la brillante luna llena.',
          de: 'Hey diddle diddle, die Katze und die Geige! In einer zauberhaften Nacht griff eine sehr musikalische Katze zu ihrer Geige und begann, die bezauberndste Melodie unter dem hellen Vollmond zu spielen.',
          it: 'Hey diddle diddle, il gatto e il violino! Una notte magica, un gatto molto musicale prese il suo violino e iniziò a suonare la melodia più incantevole sotto la luminosa luna piena.'
        },
        image: 'assets/images/cartoon/cat.svg'
      },
      {
        text: {
          en: 'The cow heard the music and felt so joyful that she jumped right over the moon! Up she soared through the sparkling stars, mooing with delight, and landed gently on the other side.',
          pt: 'A vaca ouviu a música e sentiu-se tão feliz que saltou mesmo por cima da lua! Subiu a voar pelas estrelas cintilantes, a mugir de alegria, e pousou suavemente do outro lado.',
          fr: 'La vache entendit la musique et se sentit si joyeuse qu\'elle sauta par-dessus la lune ! Elle s\'envola à travers les étoiles scintillantes, meuglant de bonheur, et atterrit doucement de l\'autre côté.',
          es: 'La vaca escuchó la música y se sintió tan alegre que saltó por encima de la luna. ¡Voló entre las estrellas brillantes, mugiendo de alegría, y aterrizó suavemente al otro lado!',
          de: 'Die Kuh hörte die Musik und war so fröhlich, dass sie direkt über den Mond sprang! Sie schwebte durch die funkelnden Sterne, muhte vor Freude und landete sanft auf der anderen Seite.',
          it: 'La mucca sentì la musica e fu così felice che saltò proprio sopra la luna! Si librò in volo tra le stelle scintillanti, muggendo di gioia, e atterrò dolcemente dall\'altra parte.'
        },
        image: 'assets/images/cartoon/cow.svg'
      },
      {
        text: {
          en: 'The little dog laughed to see such sport — he wagged his tail and yipped with joy, rolling on his back and kicking his paws in the air with glee.',
          pt: 'O cãozinho riu ao ver tal espetáculo — abanou a cauda e latiu de alegria, rolando de costas e chutando as patas no ar com entusiasmo.',
          fr: 'Le petit chien rit en voyant un tel spectacle — il remua la queue et jappa de joie, se roulant sur le dos et agitant ses pattes en l\'air avec allégresse.',
          es: 'El perrito se rió al ver semejante espectáculo: meneó la cola y ladró de alegría, rodando sobre su espalda y agitando las patas en el aire con entusiasmo.',
          de: 'Das Hündchen lachte beim Anblick des Spektakels — es wedelte mit dem Schwanz und bellte vor Freude, rollte sich auf den Rücken und strampelte fröhlich mit den Pfoten in der Luft.',
          it: 'Il cagnolino rise vedendo tale spettacolo: scodinzolò e abbaiò di gioia, rotolando sulla schiena e scalciando le zampe in aria con allegria.'
        },
        image: 'assets/images/cartoon/dog.svg'
      },
      {
        text: {
          en: 'The dish and the spoon looked at each other, then took each other’s hand and ran away together into the night, dancing all the way to the edge of the world.',
          pt: 'O prato e a colher olharam um para o outro, depois de mãos dadas fugiram juntos para a noite, dançando até ao fim do mundo.',
          fr: 'L\'assiette et la cuillère se regardèrent, puis se prirent par la main et s\'enfuirent ensemble dans la nuit, dansant jusqu\'au bout du monde.',
          es: 'El plato y la cuchara se miraron, luego se tomaron de la mano y se escaparon juntos hacia la noche, bailando hasta el fin del mundo.',
          de: 'Der Teller und der Löffel sahen sich an, dann fassten sie sich an den Händen und liefen gemeinsam in die Nacht davon, tanzend bis an den Rand der Welt.',
          it: 'Il piatto e il cucchiaio si guardarono, poi si presero per mano e scapparono insieme nella notte, ballando fino ai confini del mondo.'
        },
        image: 'assets/images/cartoon/cat.svg'
      },
      {
        text: {
          en: 'The cow floated back down from the moon, mooing contentedly. The cat played one last tune, and all the animals fell fast asleep under the stars. The end!',
          pt: 'A vaca pousou de volta da lua, a mugir contente. O gato tocou uma última melodia, e todos os animais adormeceram profundamente sob as estrelas. Fim!',
          fr: 'La vache redescendit doucement de la lune en meuglant d\'aise. Le chat joua un dernier air, et tous les animaux s\'endormirent profondément sous les étoiles. Fin !',
          es: 'La vaca flotó de vuelta desde la luna, mugiendo contenta. El gato tocó una última melodía y todos los animales se quedaron profundamente dormidos bajo las estrellas. ¡Fin!',
          de: 'Die Kuh schwebte zufrieden mühend vom Mond zurück. Die Katze spielte eine letzte Melodie, und alle Tiere schliefen unter den Sternen tief und fest ein. Ende!',
          it: 'La mucca scese fluttuando dalla luna, muggendo soddisfatta. Il gatto suonò un\'ultima melodia e tutti gli animali si addormentarono profondamente sotto le stelle. Fine!'
        },
        image: 'assets/images/cartoon/cow.svg'
      }
    ]
  },

  {
    id: 'owl-pussy-cat',
    title: {
      en: 'The Owl and the Pussy-Cat',
      pt: 'A Coruja e o Gatinho',
      fr: 'Le Hibou et la Minette',
      es: 'El Búho y la Gatita',
      de: 'Die Eule und das Kätzchen',
      it: 'Il Gufo e la Gattina'
    },
    color: '#0077b6',
    leather: 'navy', board: 'sky',
    requirements: [
      { animalId: 'owl', minCount: 1, label: 'Find the Owl' },
      { animalId: 'cat', minCount: 1, label: 'Find the Cat' }
    ],
    pages: [
      {
        text: {
          en: 'The Owl and the Pussy-Cat went to sea in a beautiful pea-green boat. They packed honey and plenty of money wrapped up in a five-pound note.',
          pt: 'A Coruja e o Gatinho foram ao mar num belo barco verde-ervilha. Levaram mel e muito dinheiro embrulhado numa nota de cinco libras.',
          fr: 'Le Hibou et la Minette partirent en mer dans un beau bateau vert pois. Ils emportèrent du miel et beaucoup d\'argent enveloppé dans un billet de cinq livres.',
          es: 'El Búho y la Gatita se fueron al mar en un hermoso bote verde guisante. Llevaron miel y mucho dinero envuelto en un billete de cinco libras.',
          de: 'Die Eule und das Kätzchen fuhren in einem wunderschönen erbsengrünen Boot zur See. Sie packten Honig und jede Menge Geld, eingewickelt in einen Fünfpfundschein.',
          it: 'Il Gufo e la Gattina andarono per mare in una bella barca color verde pisello. Portarono con sé del miele e un sacco di soldi avvolti in una banconota da cinque sterline.'
        },
        image: 'assets/images/cartoon/owl.svg'
      },
      {
        text: {
          en: 'The Pussy-Cat looked up at the stars and sang to the Owl with a beautiful voice. “O lovely Owl! You sing so wonderfully. Will you marry me?” The Owl agreed at once.',
          pt: 'O Gatinho olhou para as estrelas e cantou para a Coruja com uma voz linda. "Ó linda Coruja! Cantas tão maravilhosamente. Queres casar comigo?" A Coruja concordou de imediato.',
          fr: 'La Minette leva les yeux vers les étoiles et chanta pour le Hibou d\'une belle voix. « Ô charmant Hibou ! Tu chantes si merveilleusement. Veux-tu m\'épouser ? » Le Hibou accepta aussitôt.',
          es: 'La Gatita miró las estrellas y cantó al Búho con una hermosa voz. "¡Oh, precioso Búho! Cantas maravillosamente. ¿Quieres casarte conmigo?" El Búho aceptó de inmediato.',
          de: 'Das Kätzchen blickte zu den Sternen hinauf und sang der Eule mit einer wunderschönen Stimme. „Oh, schöne Eule! Du singst so wunderbar. Willst du mich heiraten?" Die Eule stimmte sofort zu.',
          it: 'La Gattina guardò le stelle e cantò al Gufo con una bella voce. "O caro Gufo! Canti così meravigliosamente. Vuoi sposarmi?" Il Gufo accettò subito.'
        },
        image: 'assets/images/cartoon/cat.svg'
      },
      {
        text: {
          en: 'They sailed for a year and a day to the land where the Bong-tree grows. There they found a Piggy-wig with a ring at the end of his nose, his nose — a ring at the end of his nose!',
          pt: 'Navegaram durante um ano e um dia até à terra onde crescem as árvores Bong. Lá encontraram um porquinho com um anel na ponta do nariz, do nariz — um anel na ponta do nariz!',
          fr: 'Ils naviguèrent pendant un an et un jour jusqu\'au pays où pousse le Bong-tree. Là, ils trouvèrent un petit cochon avec un anneau au bout de son nez, son nez — un anneau au bout de son nez !',
          es: 'Navegaron durante un año y un día hasta la tierra donde crece el árbol Bong. Allí encontraron un cerdito con un anillo en la punta de su nariz, su nariz: ¡un anillo en la punta de su nariz!',
          de: 'Sie segelten ein Jahr und einen Tag bis in das Land, wo der Bong-Baum wächst. Dort fanden sie ein Schweinchen mit einem Ring an der Spitze seiner Nase, seiner Nase — ein Ring an der Spitze seiner Nase!',
          it: 'Navigarono per un anno e un giorno fino alla terra dove cresce il Bong-tree. Lì trovarono un porcellino con un anello in cima al naso, al naso — un anello in cima al suo naso!'
        },
        image: 'assets/images/cartoon/owl.svg'
      },
      {
        text: {
          en: 'They bought the ring for a shilling and a turkey who lived on the hill married them that very afternoon. The stars twinkled and the sea shimmered all around.',
          pt: 'Compraram o anel por um xelim e um peru que vivia na colina casou-os nessa própria tarde. As estrelas cintilavam e o mar brilhava à volta.',
          fr: 'Ils achetèrent l\'anneau pour un shilling et un dindon qui vivait sur la colline les maria cet après-midi-là. Les étoiles scintillaient et la mer miroitait tout autour.',
          es: 'Compraron el anillo por un chelín y un pavo que vivía en la colina los casó esa misma tarde. Las estrellas centelleaban y el mar brillaba a su alrededor.',
          de: 'Sie kauften den Ring für einen Schilling und ein Truthahn, der auf dem Hügel lebte, heiratete sie noch am selben Nachmittag. Die Sterne funkelten und das Meer schimmerte ringsum.',
          it: 'Comprarono l\'anello per uno scellino e un tacchino che viveva sulla collina li sposò quel pomeriggio stesso. Le stelle brillavano e il mare scintillava tutt\'intorno.'
        },
        image: 'assets/images/cartoon/cat.svg'
      },
      {
        text: {
          en: 'They dined on mince and slices of quince, which they ate with a runcible spoon. And hand in hand by the edge of the sand they danced by the light of the moon, the moon — they danced by the light of the moon!',
          pt: 'Jantaram carne picada e fatias de marmelo, que comeram com uma colher runcível. E de mão dada à beira da areia dançaram à luz da lua, da lua — dançaram à luz da lua!',
          fr: 'Ils dînèrent de viande hachée et de tranches de coing, qu\'ils mangèrent avec une cuillère runcible. Et main dans la main au bord du sable, ils dansèrent à la lumière de la lune, la lune — ils dansèrent à la lumière de la lune !',
          es: 'Cenaron carne picada y rodajas de membrillo, que comieron con una cuchara rúncible. Y de la mano, a la orilla de la arena, bailaron a la luz de la luna, la luna: ¡bailaron a la luz de la luna!',
          de: 'Sie speisten Hackfleisch und Quittenscheiben, die sie mit einem runciblen Löffel aßen. Und Hand in Hand am Rande des Sandes tanzten sie im Licht des Mondes, des Mondes — sie tanzten im Licht des Mondes!',
          it: 'Cenarono con carne trita e fettine di cotogna, che mangiarono con un cucchiaio runcible. E mano nella mano sul bordo della sabbia danzarono alla luce della luna, della luna — danzarono alla luce della luna!'
        },
        image: 'assets/images/cartoon/owl.svg'
      }
    ]
  }
];

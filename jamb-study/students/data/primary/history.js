/* Primary History — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'history');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Long Ago in Britain',
    description: 'Stone Age life, the Romans, and castles: how people lived long ago. Draft content.',
    lessons: [{
      id: 'primary-history-m1-l1',
      order: 1,
      title: 'Life in the Stone Age',
      objective: 'I can describe how people lived in the Stone Age.',
      minutes: 7,
      recap: 'You described how Stone Age people lived and what they used.',
      blocks: [
        { type: 'text', body: 'Stone Age people lived thousands of years ago, before writing.' },
        { type: 'text', body: 'They hunted animals, gathered plants, and made tools from stone.' },
        { type: 'text', body: 'They built simple shelters and moved to find food.' },
        { type: 'tip', body: 'Stone tools were shaped by chipping one rock with another.' },
        {
          type: 'illustration',
          alt: 'A rough grey stone, like an early hand tool.',
          image: 'assets/3d/rock-3d.png',
          placeholder: 'Stone: chipped into tools for cutting and scraping.'
        },
        { type: 'example', steps: ['People needed a sharp edge.', 'They struck one stone with another.', 'Small flakes fell away.', 'The sharp edge cut meat.'] }
      ],
      vocabulary: [
        { word: 'hunter', meaning: 'A person who finds animals for food.', example: 'Hunters followed animals for food.' },
        { word: 'gather', meaning: 'Collect plants and other food.', example: 'They gathered berries and nuts.' },
        { word: 'shelter', meaning: 'A place that keeps you safe.', example: 'They built a shelter from branches.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What did Stone Age people use to make tools?', options: ['Stone', 'Plastic', 'Metal'], answer: 0, why: 'Stone was strong and easy to shape.' },
        { type: 'multiple_choice', question: 'How did Stone Age people get food?', options: ['Hunting and gathering', 'Buying it', 'Farming only'], answer: 0, why: 'They hunted animals and gathered plants.' },
        { type: 'multiple_choice', question: 'Why did Stone Age people move around?', options: ['To find food', 'To find cars', 'To find books'], answer: 0, why: 'They moved when food ran out nearby.' }
      ]
    }, {
      id: 'primary-history-m1-l2',
      order: 2,
      title: 'The Romans in Britain',
      objective: 'I can describe what the Romans built and brought to Britain.',
      minutes: 7,
      recap: 'You described Roman roads, towns, and daily life in Britain.',
      blocks: [
        { type: 'text', body: 'The Romans came to Britain nearly two thousand years ago.' },
        { type: 'text', body: 'They built straight roads, towns, and public baths.' },
        { type: 'text', body: 'Roman soldiers and settlers changed how people lived.' },
        { type: 'tip', body: 'Many Roman roads still lie under modern streets.' },
        {
          type: 'illustration',
          alt: 'A white stone building with tall columns.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Roman building: columns, arches, and a tiled roof.'
        },
        { type: 'example', steps: ['A town needed fresh water.', 'The Romans built an aqueduct.', 'Water flowed into the town.', 'People used it for baths and drinking.'] }
      ],
      vocabulary: [
        { word: 'Roman', meaning: 'A person from ancient Rome.', example: 'Roman soldiers marched on roads.' },
        { word: 'road', meaning: 'A hard path for travel.', example: 'The Roman road was straight.' },
        { word: 'bath', meaning: 'A place for washing.', example: 'People met at the public bath.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What did the Romans build across Britain?', options: ['Straight roads', 'Tall castles', 'Stone circles'], answer: 0, why: 'Roman roads connected towns and forts.' },
        { type: 'multiple_choice', question: 'Why did Romans build aqueducts?', options: ['To carry water', 'To store food', 'To make music'], answer: 0, why: 'Aqueducts carried water into towns.' },
        { type: 'multiple_choice', question: 'What shows Romans lived in Britain?', options: ['Roman towns and roads', 'Space rockets', 'Steam trains'], answer: 0, why: 'Their buildings and roads still exist.' }
      ]
    }, {
      id: 'primary-history-m1-l3',
      order: 3,
      title: 'Castles and Knights',
      objective: 'I can explain why castles were built and how they were defended.',
      minutes: 7,
      recap: 'You explained why castles were built and how they were defended.',
      blocks: [
        { type: 'text', body: 'Castles were strong homes built to defend against attack.' },
        { type: 'text', body: 'They had thick walls, high towers, and a deep ditch.' },
        { type: 'text', body: 'Knights trained to fight and served a lord.' },
        { type: 'tip', body: 'A moat is a ditch filled with water.' },
        {
          type: 'illustration',
          alt: 'A grey stone castle with tall towers.',
          image: 'assets/3d/castle-3d.png',
          placeholder: 'Castle: thick walls, towers, and a defended gate.'
        },
        { type: 'example', steps: ['Attackers approached the castle.', 'They crossed the deep moat.', 'Guards shot from the walls.', 'The gate held firm.'] }
      ],
      vocabulary: [
        { word: 'castle', meaning: 'A strong building for defence.', example: 'The castle stood on a hill.' },
        { word: 'knight', meaning: 'A trained fighter on horseback.', example: 'The knight wore metal armour.' },
        { word: 'moat', meaning: 'A deep ditch around a castle.', example: 'Water filled the castle moat.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why were castles built?', options: ['For defence', 'For racing', 'For farming'], answer: 0, why: 'Castles protected people from attack.' },
        { type: 'multiple_choice', question: 'What was a moat?', options: ['A water ditch', 'A tall tower', 'A stone wall'], answer: 0, why: 'A moat made it hard to reach the walls.' },
        { type: 'multiple_choice', question: 'What did knights do?', options: ['Fought for a lord', 'Built roads', 'Sold food'], answer: 0, why: 'Knights served lords as trained fighters.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Kings, Queens, and Change',
    description: 'Kings, queens, fire, and travel: how Britain changed over time. Draft content.',
    lessons: [{
      id: 'primary-history-m2-l1',
      order: 1,
      title: 'Kings and Queens',
      objective: 'I can name some British monarchs and describe their role.',
      minutes: 7,
      recap: 'You described the role of kings and queens in Britain.',
      blocks: [
        { type: 'text', body: 'A king or queen is called a monarch.' },
        { type: 'text', body: 'Monarchs ruled Britain and made important decisions.' },
        { type: 'text', body: 'Some monarchs built palaces, roads, and schools.' },
        { type: 'tip', body: 'The crown is a symbol of royal power.' },
        {
          type: 'illustration',
          alt: 'A golden crown with red and blue jewels.',
          image: 'assets/3d/crown-3d.png',
          placeholder: 'Crown: a symbol of the monarch\u2019s authority.'
        },
        { type: 'example', steps: ['A new monarch took the throne.', 'People gathered to watch.', 'The crown was placed on their head.', 'The crowd cheered.'] }
      ],
      vocabulary: [
        { word: 'monarch', meaning: 'A king or queen.', example: 'The monarch lived in a palace.' },
        { word: 'throne', meaning: 'The royal seat of power.', example: 'The queen sat on the throne.' },
        { word: 'reign', meaning: 'The time a monarch rules.', example: 'Her reign lasted many years.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a king or queen called?', options: ['A monarch', 'A knight', 'A soldier'], answer: 0, why: 'A monarch is a king or queen.' },
        { type: 'multiple_choice', question: 'What does a crown symbolise?', options: ['Royal power', 'Farm work', 'Sea travel'], answer: 0, why: 'The crown shows royal authority.' },
        { type: 'multiple_choice', question: 'What is a reign?', options: ['Time a monarch rules', 'A castle wall', 'A type of road'], answer: 0, why: 'A reign is the period of rule.' }
      ]
    }, {
      id: 'primary-history-m2-l2',
      order: 2,
      title: 'The Great Fire of London',
      objective: 'I can describe what happened in the Great Fire of London.',
      minutes: 7,
      recap: 'You described the Great Fire of London and its effects.',
      blocks: [
        { type: 'text', body: 'The Great Fire began in London in 1666.' },
        { type: 'text', body: 'It started in a bakery and spread between wooden houses.' },
        { type: 'text', body: 'The fire lasted four days and destroyed much of the city.' },
        { type: 'tip', body: 'New houses were built from brick after the fire.' },
        {
          type: 'illustration',
          alt: 'Bright orange flames rising from a fire.',
          image: 'assets/3d/fire-3d.png',
          placeholder: 'Fire: how flames spread through wooden streets.'
        },
        { type: 'example', steps: ['A small fire started in a bakery.', 'Wind carried sparks to nearby houses.', 'People used buckets and hooks to fight it.', 'The fire finally stopped.'] }
      ],
      vocabulary: [
        { word: 'bakery', meaning: 'A shop that makes bread.', example: 'The fire began in a bakery.' },
        { word: 'spread', meaning: 'Move and cover more area.', example: 'The flames spread quickly.' },
        { word: 'rebuild', meaning: 'Build something again.', example: 'London had to rebuild its streets.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'When did the Great Fire of London begin?', options: ['1666', '1066', '1766'], answer: 0, why: 'The fire began in 1666.' },
        { type: 'multiple_choice', question: 'Where did the fire start?', options: ['A bakery', 'A castle', 'A ship'], answer: 0, why: 'It started in a bakery on Pudding Lane.' },
        { type: 'multiple_choice', question: 'What helped stop the fire spreading?', options: ['Breaking down houses', 'Adding wood', 'Opening windows'], answer: 0, why: 'Firebreaks removed fuel from the flames.' }
      ]
    }, {
      id: 'primary-history-m2-l3',
      order: 3,
      title: 'Travel and Transport Then and Now',
      objective: 'I can compare transport from the past with transport today.',
      minutes: 7,
      recap: 'You compared old and modern transport and described the changes.',
      blocks: [
        { type: 'text', body: 'People once travelled by horse, boat, or on foot.' },
        { type: 'text', body: 'Steam trains made long journeys faster.' },
        { type: 'text', body: 'Today cars, buses, and planes carry people quickly.' },
        { type: 'tip', body: 'Steam trains burned coal to heat water into steam.' },
        {
          type: 'illustration',
          alt: 'A blue steam train with a tall funnel.',
          image: 'assets/3d/train-3d.png',
          placeholder: 'Steam train: coal, steam, and faster journeys.'
        },
        { type: 'example', steps: ['A journey once took two days by horse.', 'A steam train could do it in hours.', 'Travel became cheaper and faster.'] }
      ],
      vocabulary: [
        { word: 'steam', meaning: 'Hot gas from boiling water.', example: 'Steam pushed the train engine.' },
        { word: 'coach', meaning: 'A carriage pulled by horses.', example: 'A coach carried passengers.' },
        { word: 'engine', meaning: 'A machine that makes movement.', example: 'The engine pulled the train.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What made trains move in the past?', options: ['Steam engines', 'Electric cars', 'Jet engines'], answer: 0, why: 'Steam engines powered early trains.' },
        { type: 'multiple_choice', question: 'How did people travel before trains?', options: ['By horse and boat', 'By plane', 'By rocket'], answer: 0, why: 'Horses and boats were common before trains.' },
        { type: 'multiple_choice', question: 'How has modern travel changed?', options: ['It is faster', 'It is slower', 'It stopped'], answer: 0, why: 'Cars and planes cut journey times.' }
      ]
    }]
  }];
}());

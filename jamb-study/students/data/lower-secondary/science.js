/* Lower Secondary Science — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'science');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Cells and Living Systems',
    description: 'Cells, food webs, and body systems: how living things are built and how they work together. Draft content.',
    lessons: [{
      id: 'lower-secondary-science-m1-l1',
      order: 1,
      title: 'Cells: The Building Blocks',
      objective: 'I can describe the main parts of a cell and their jobs.',
      minutes: 9,
      recap: 'You described cell parts and how they keep a cell working.',
      blocks: [
        { type: 'text', body: 'All living things are made of cells. Most cells are too small to see without a microscope.' },
        { type: 'text', body: 'A cell membrane controls what enters and leaves. The nucleus holds genetic information.' },
        { type: 'text', body: 'Plant cells also have a cell wall and chloroplasts for photosynthesis.' },
        { type: 'tip', body: 'Use a microscope carefully and start on the lowest magnification.' },
        {
          type: 'illustration',
          alt: 'A white laboratory microscope with a prepared slide.',
          image: 'assets/3d/microscope-3d.png',
          placeholder: 'Microscope: cells seen at increasing magnification.'
        },
        { type: 'example', steps: ['Place the slide on the stage.', 'Focus on the lowest power first.', 'Draw what you see and label it.'] }
      ],
      vocabulary: [
        { word: 'cell', meaning: 'The smallest unit of a living thing', example: 'Every living thing is made of cells.' },
        { word: 'nucleus', meaning: 'The part that holds genetic information', example: 'The nucleus controls the cell.' },
        { word: 'membrane', meaning: 'The layer that controls what enters', example: 'The membrane lets water through.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which part controls what enters a cell?', options: ['Nucleus', 'Membrane', 'Chloroplast'], answer: 1, why: 'The cell membrane controls movement in and out.' },
        { type: 'multiple_choice', question: 'What extra part do plant cells have?', options: ['A cell wall', 'A nucleus', 'A membrane'], answer: 0, why: 'Plant cells have a wall for support.' },
        { type: 'multiple_choice', question: 'A cell has no nucleus. Which cell is it likely to be?', options: ['A bacterial cell', 'A plant cell', 'An animal cell'], answer: 0, why: 'Bacterial cells store DNA without a nucleus.' }
      ]
    }, {
      id: 'lower-secondary-science-m1-l2',
      order: 2,
      title: 'Food Chains and Ecosystems',
      objective: 'I can build a food chain and explain what happens when it changes.',
      minutes: 9,
      recap: 'You built food chains and predicted the effects of change.',
      blocks: [
        { type: 'text', body: 'A food chain shows the direction energy flows between living things.' },
        { type: 'text', body: 'Producers make their own food. Consumers eat other living things.' },
        { type: 'text', body: 'Decomposers break down dead material and return nutrients to the soil.' },
        { type: 'tip', body: 'Arrows point from the food to the animal that eats it.' },
        {
          type: 'illustration',
          alt: 'A small green herb plant with several leaves.',
          image: 'assets/3d/herb-3d.png',
          placeholder: 'Herb: a producer at the start of a food chain.'
        },
        { type: 'example', steps: ['Grass is the producer.', 'A rabbit eats the grass.', 'A fox eats the rabbit.'] }
      ],
      vocabulary: [
        { word: 'producer', meaning: 'A living thing that makes its own food', example: 'Green plants are producers.' },
        { word: 'consumer', meaning: 'A living thing that eats other living things', example: 'A rabbit is a consumer.' },
        { word: 'decomposer', meaning: 'A living thing that breaks down dead material', example: 'Fungi are decomposers.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where does energy start in most food chains?', options: ['The Sun', 'The soil', 'The consumer'], answer: 0, why: 'Plants capture sunlight to make food.' },
        { type: 'multiple_choice', question: 'What does an arrow in a food chain show?', options: ['Energy moving to the eater', 'The animal size', 'The distance travelled'], answer: 0, why: 'Arrows point toward the consumer.' },
        { type: 'multiple_choice', question: 'A disease kills most rabbits. What happens next?', options: ['Foxes have less food', 'Grass disappears', 'Foxes multiply quickly'], answer: 0, why: 'Predators lose a food source when prey decline.' }
      ]
    }, {
      id: 'lower-secondary-science-m1-l3',
      order: 3,
      title: 'The Human Body Systems',
      objective: 'I can describe how body systems work together.',
      minutes: 9,
      recap: 'You described how body systems work together.',
      blocks: [
        { type: 'text', body: 'The body has systems that share one job: keeping you alive.' },
        { type: 'text', body: 'The heart pumps blood. Blood carries oxygen and nutrients.' },
        { type: 'text', body: 'The lungs take in oxygen and remove carbon dioxide.' },
        { type: 'text', body: 'The digestive system breaks food into small, usable pieces.' },
        { type: 'tip', body: 'Systems depend on each other, so illness in one affects others.' },
        {
          type: 'illustration',
          alt: 'A glossy red heart model.',
          image: 'assets/3d/red_heart-3d.png',
          placeholder: 'Heart: blood carries oxygen and nutrients around the body.'
        },
        { type: 'example', steps: ['You eat a meal.', 'The digestive system breaks it down.', 'Blood carries nutrients to your cells.'] }
      ],
      vocabulary: [
        { word: 'organ', meaning: 'A body part with a specific job', example: 'The heart is an organ.' },
        { word: 'system', meaning: 'A group of organs working together', example: 'The digestive system absorbs food.' },
        { word: 'oxygen', meaning: 'A gas your cells need to release energy', example: 'Blood carries oxygen around the body.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which organ pumps blood?', options: ['Heart', 'Lungs', 'Stomach'], answer: 0, why: 'The heart pumps blood around the body.' },
        { type: 'multiple_choice', question: 'What do lungs remove from the body?', options: ['Carbon dioxide', 'Food', 'Water'], answer: 0, why: 'Lungs remove carbon dioxide when you breathe out.' },
        { type: 'multiple_choice', question: 'Why do body systems need each other?', options: ['They share oxygen and nutrients', 'They work alone', 'They stop at night'], answer: 0, why: 'Systems rely on shared supplies.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Matter and Energy',
    description: 'Particles, forces, and energy: the rules that explain how matter moves and changes. Draft content.',
    lessons: [{
      id: 'lower-secondary-science-m2-l1',
      order: 1,
      title: 'Particles and States of Matter',
      objective: 'I can explain solids, liquids, and gases using particles.',
      minutes: 9,
      recap: 'You used particles to explain the three states of matter.',
      blocks: [
        { type: 'text', body: 'All matter is made of tiny particles that are always moving.' },
        { type: 'text', body: 'In solids, particles are packed and vibrate in place.' },
        { type: 'text', body: 'In liquids, particles are close but can slide past each other.' },
        { type: 'text', body: 'In gases, particles are far apart and move quickly.' },
        { type: 'tip', body: 'Heating usually makes particles move faster.' },
        {
          type: 'illustration',
          alt: 'A large blue water droplet with a shine.',
          image: 'assets/3d/droplet-3d.png',
          placeholder: 'Droplet: water as a liquid and its particles.'
        },
        { type: 'example', steps: ['Ice is a solid.', 'When heated, it melts into liquid water.', 'More heat turns it into water vapour.'] }
      ],
      vocabulary: [
        { word: 'particle', meaning: 'A tiny piece that makes up matter', example: 'Particles move faster when heated.' },
        { word: 'solid', meaning: 'A state with a fixed shape and volume', example: 'Ice is a solid.' },
        { word: 'gas', meaning: 'A state that spreads to fill space', example: 'Steam is a gas.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How do particles move in a solid?', options: ['They vibrate in place', 'They fly apart', 'They slide freely'], answer: 0, why: 'Solids keep their shape because particles stay packed.' },
        { type: 'multiple_choice', question: 'What happens to particles when a liquid is heated?', options: ['They move faster', 'They disappear', 'They stop moving'], answer: 0, why: 'Heat adds energy and speeds particles up.' },
        { type: 'multiple_choice', question: 'A gas is trapped in a sealed box. What does it do?', options: ['Fills the whole box', 'Stays in one corner', 'Becomes a solid'], answer: 0, why: 'Gas particles spread to fill their container.' }
      ]
    }, {
      id: 'lower-secondary-science-m2-l2',
      order: 2,
      title: 'Forces and Motion',
      objective: 'I can describe how forces change an object\u2019s motion.',
      minutes: 9,
      recap: 'You explained how forces start, stop, and change motion.',
      blocks: [
        { type: 'text', body: 'A force is a push or a pull.' },
        { type: 'text', body: 'Balanced forces do not change motion. Unbalanced forces do.' },
        { type: 'text', body: 'Friction slows objects when surfaces rub together.' },
        { type: 'tip', body: 'Weight is a force caused by gravity pulling on mass.' },
        {
          type: 'illustration',
          alt: 'A white rocket lifting off with orange flames.',
          image: 'assets/3d/rocket-3d.png',
          placeholder: 'Rocket: unbalanced forces change motion.'
        },
        { type: 'example', steps: ['A car is still.', 'The engine pushes it forward.', 'Friction and air resistance push back.'] }
      ],
      vocabulary: [
        { word: 'force', meaning: 'A push or a pull', example: 'A force can change motion.' },
        { word: 'friction', meaning: 'A force that resists sliding', example: 'Friction slows a sliding box.' },
        { word: 'gravity', meaning: 'A force that pulls objects together', example: 'Gravity pulls a ball to Earth.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are the two main kinds of force?', options: ['Pushes and pulls', 'Heats and colds', 'Lights and sounds'], answer: 0, why: 'Forces act as pushes or pulls.' },
        { type: 'multiple_choice', question: 'What happens when forces on an object are balanced?', options: ['Its motion stays the same', 'It speeds up', 'It changes direction'], answer: 0, why: 'Balanced forces cancel out.' },
        { type: 'multiple_choice', question: 'A book slides across a table and slows. Why?', options: ['Friction acts against it', 'Gravity stops', 'The book is weightless'], answer: 0, why: 'Friction opposes the sliding motion.' }
      ]
    }, {
      id: 'lower-secondary-science-m2-l3',
      order: 3,
      title: 'Energy Transfer',
      objective: 'I can describe how energy moves and changes form.',
      minutes: 9,
      recap: 'You traced energy transfers and explained useful and wasted energy.',
      blocks: [
        { type: 'text', body: 'Energy cannot be created or destroyed; it only transfers.' },
        { type: 'text', body: 'Energy can move as heat, light, sound, or movement.' },
        { type: 'text', body: 'Some energy always spreads out as waste heat.' },
        { type: 'tip', body: 'Name the store at the start and the store at the end.' },
        {
          type: 'illustration',
          alt: 'A glowing yellow light bulb on a simple base.',
          image: 'assets/3d/light_bulb-3d.png',
          placeholder: 'Light bulb: electrical energy becomes light and heat.'
        },
        { type: 'example', steps: ['A lamp uses electrical energy.', 'It transfers energy to light and heat.', 'The light is useful; the heat is wasted.'] }
      ],
      vocabulary: [
        { word: 'energy', meaning: 'The ability to make things happen', example: 'Energy moves between stores.' },
        { word: 'transfer', meaning: 'Movement of energy from one store to another', example: 'A lamp transfers energy as light.' },
        { word: 'efficient', meaning: 'Using less energy to do the same job', example: 'An efficient bulb wastes less heat.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What happens to energy in a transfer?', options: ['It changes store', 'It disappears', 'It doubles'], answer: 0, why: 'Energy is conserved but changes form.' },
        { type: 'multiple_choice', question: 'Which output is usually wasted in a lamp?', options: ['Heat', 'Light', 'Colour'], answer: 0, why: 'Most lamps give off unwanted heat.' },
        { type: 'multiple_choice', question: 'A phone battery runs down. Where did the energy go?', options: ['Into light, sound, and heat', 'Into nothing', 'Into the charger'], answer: 0, why: 'The stored energy transferred to useful and waste outputs.' }
      ]
    }]
  }];
}());

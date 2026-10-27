/* Primary Science — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'science');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Living Things',
    description: 'Plants, animals, and the human body: what living things need and how they grow. Draft content.',
    lessons: [{
      id: 'primary-science-m1-l1',
      order: 1,
      title: 'Plants Around Us',
      objective: 'I can name the parts of a plant and say what each part does.',
      minutes: 7,
      recap: 'You named plant parts and explained what each part does.',
      blocks: [
        { type: 'text', body: 'Plants have roots, a stem, leaves, and flowers.' },
        { type: 'text', body: 'Roots take in water. Leaves catch light. Flowers make seeds.' },
        { type: 'text', body: 'A plant grows from a seed when it has water and light.' },
        { type: 'tip', body: 'Water the soil, not just the leaves.' },
        {
          type: 'illustration',
          alt: 'A young green seedling with two small leaves.',
          image: 'assets/3d/seedling-3d.png',
          placeholder: 'Seedling: roots, stem, leaves, and flowers.'
        },
        { type: 'example', steps: ['Look at the seedling.', 'Find the roots under the soil.', 'Name the stem and the leaves.'] }
      ],
      vocabulary: [
        { word: 'root', meaning: 'The part that takes in water.', example: 'The roots drink from the soil.' },
        { word: 'stem', meaning: 'The part that holds the plant up.', example: 'The stem carries water upward.' },
        { word: 'leaf', meaning: 'The part that catches sunlight.', example: 'Each leaf turns toward the light.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which part takes in water?', options: ['Roots', 'Flowers', 'Leaves'], answer: 0, why: 'Roots take in water from the soil.' },
        { type: 'multiple_choice', question: 'What do leaves need to catch?', options: ['Water', 'Light', 'Soil'], answer: 1, why: 'Leaves use light to help the plant grow.' },
        { type: 'multiple_choice', question: 'A seed has water and light. What happens next?', options: ['It grows', 'It melts', 'It floats'], answer: 0, why: 'Water and light help a seed grow.' }
      ]
    }, {
      id: 'primary-science-m1-l2',
      order: 2,
      title: 'Animals and Their Needs',
      objective: 'I can explain what animals need to stay alive and healthy.',
      minutes: 7,
      recap: 'You explained what animals need to survive.',
      blocks: [
        { type: 'text', body: 'Animals need food, water, air, and shelter.' },
        { type: 'text', body: 'Different animals eat different foods.' },
        { type: 'text', body: 'Young animals need care until they can live alone.' },
        { type: 'tip', body: 'All living things need water, even desert animals.' },
        {
          type: 'illustration',
          alt: 'Four paw prints in a row.',
          image: 'assets/3d/paw_prints-3d.png',
          placeholder: 'Paw prints: animals need food, water, air, and shelter.'
        },
        { type: 'example', steps: ['A rabbit needs food and water.', 'It also needs a safe place to hide.', 'Shelter keeps it warm and dry.'] }
      ],
      vocabulary: [
        { word: 'shelter', meaning: 'A safe place to live.', example: 'The burrow is a warm shelter.' },
        { word: 'food', meaning: 'What an animal eats to grow.', example: 'Rabbits eat grass and leaves.' },
        { word: 'young', meaning: 'A baby animal.', example: 'The young rabbit stays near its mother.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which one do all animals need?', options: ['Water', 'Sweets', 'Shoes'], answer: 0, why: 'Every animal needs water to stay alive.' },
        { type: 'multiple_choice', question: 'Why do young animals need care?', options: ['They cannot look after themselves', 'They are always sleepy', 'They do not eat'], answer: 0, why: 'Young animals depend on adults to survive.' },
        { type: 'multiple_choice', question: 'A rabbit hides in a burrow. What need does this meet?', options: ['Shelter', 'Food', 'Water'], answer: 0, why: 'A burrow is a safe shelter.' }
      ]
    }, {
      id: 'primary-science-m1-l3',
      order: 3,
      title: 'Our Bodies',
      objective: 'I can name some body parts and describe how senses help us.',
      minutes: 7,
      recap: 'You named body parts and explained how senses help us.',
      blocks: [
        { type: 'text', body: 'Our senses help us learn about the world.' },
        { type: 'text', body: 'We see, hear, smell, taste, and touch.' },
        { type: 'text', body: 'Bones support the body. Muscles help it move.' },
        { type: 'tip', body: 'Wash your hands before you eat.' },
        {
          type: 'illustration',
          alt: 'A pink model of a human brain.',
          image: 'assets/3d/brain-3d.png',
          placeholder: 'Brain: the senses send information to the brain.'
        },
        { type: 'example', steps: ['You touch a warm cup.', 'Your hand sends a message.', 'Your brain tells you it is warm.'] }
      ],
      vocabulary: [
        { word: 'sense', meaning: 'A way the body learns about the world.', example: 'Sight is one of our senses.' },
        { word: 'bone', meaning: 'A hard part that supports the body.', example: 'Bones keep your body upright.' },
        { word: 'muscle', meaning: 'A body part that helps you move.', example: 'Muscles pull on bones to move them.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How many main senses do we have?', options: ['Five', 'Two', 'Ten'], answer: 0, why: 'We have sight, hearing, smell, taste, and touch.' },
        { type: 'multiple_choice', question: 'What do bones do?', options: ['Support the body', 'Carry food', 'Make light'], answer: 0, why: 'Bones give the body shape and support.' },
        { type: 'multiple_choice', question: 'You smell toast. Which sense is working?', options: ['Smell', 'Sight', 'Hearing'], answer: 0, why: 'Your nose detects the smell.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Materials and Weather',
    description: 'Materials, weather, and forces: how everyday things behave. Draft content.',
    lessons: [{
      id: 'primary-science-m2-l1',
      order: 1,
      title: 'Everyday Materials',
      objective: 'I can describe materials by their properties.',
      minutes: 7,
      recap: 'You described materials by their properties.',
      blocks: [
        { type: 'text', body: 'Materials are what objects are made from.' },
        { type: 'text', body: 'Wood, metal, plastic, glass, and fabric are common.' },
        { type: 'text', body: 'We choose a material for its properties.' },
        { type: 'tip', body: 'Metal is strong but not see-through.' },
        {
          type: 'illustration',
          alt: 'A red clay brick with a soft shadow.',
          image: 'assets/3d/brick-3d.png',
          placeholder: 'Brick: a hard material chosen for strength.'
        },
        { type: 'example', steps: ['A window is made of glass.', 'Glass is transparent.', 'You can see through it.'] }
      ],
      vocabulary: [
        { word: 'material', meaning: 'What an object is made from.', example: 'Wood is a natural material.' },
        { word: 'hard', meaning: 'Not easy to bend or scratch.', example: 'The brick feels very hard.' },
        { word: 'transparent', meaning: 'You can see through it.', example: 'Glass is transparent.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which material is transparent?', options: ['Glass', 'Brick', 'Wood'], answer: 0, why: 'You can see through glass.' },
        { type: 'multiple_choice', question: 'Why is a window made of glass?', options: ['It lets light through', 'It is soft', 'It is heavy'], answer: 0, why: 'Transparent glass lets light in.' },
        { type: 'multiple_choice', question: 'A raincoat should keep water out. Which property matters?', options: ['Waterproof', 'Transparent', 'Heavy'], answer: 0, why: 'A waterproof material keeps rain away.' }
      ]
    }, {
      id: 'primary-science-m2-l2',
      order: 2,
      title: 'Weather and Seasons',
      objective: 'I can describe the weather in each season.',
      minutes: 7,
      recap: 'You described weather in each season.',
      blocks: [
        { type: 'text', body: 'Weather can be sunny, cloudy, rainy, or windy.' },
        { type: 'text', body: 'In spring, plants grow and days get longer.' },
        { type: 'text', body: 'In winter, it is colder and days are shorter.' },
        { type: 'tip', body: 'Watch the sky before you go outside.' },
        {
          type: 'illustration',
          alt: 'A bright yellow sun with soft rays.',
          image: 'assets/3d/sun-3d.png',
          placeholder: 'Sun: the seasons and the weather they bring.'
        },
        { type: 'example', steps: ['The sky turns dark.', 'Rain begins to fall.', 'The ground becomes wet.'] }
      ],
      vocabulary: [
        { word: 'season', meaning: 'A part of the year with its own weather.', example: 'Winter is a cold season.' },
        { word: 'weather', meaning: 'What the sky and air are doing.', example: 'The weather is rainy today.' },
        { word: 'wind', meaning: 'Moving air.', example: 'The wind moves the leaves.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which season is coldest?', options: ['Winter', 'Summer', 'Spring'], answer: 0, why: 'Winter has the coldest weather.' },
        { type: 'multiple_choice', question: 'When do days get longer?', options: ['Spring', 'Autumn', 'Winter'], answer: 0, why: 'Daylight grows longer through spring.' },
        { type: 'multiple_choice', question: 'The sky is dark and water falls. What is the weather?', options: ['Rainy', 'Sunny', 'Snowy'], answer: 0, why: 'Falling water means rain.' }
      ]
    }, {
      id: 'primary-science-m2-l3',
      order: 3,
      title: 'Pushes and Pulls',
      objective: 'I can explain how pushes and pulls move objects.',
      minutes: 7,
      recap: 'You explained how pushes and pulls move objects.',
      blocks: [
        { type: 'text', body: 'A push moves an object away from you.' },
        { type: 'text', body: 'A pull moves an object toward you.' },
        { type: 'text', body: 'Forces can make things start or stop moving.' },
        { type: 'tip', body: 'A heavy object needs a bigger push.' },
        {
          type: 'illustration',
          alt: 'A red and blue horseshoe magnet.',
          image: 'assets/3d/magnet-3d.png',
          placeholder: 'Magnet: pushes, pulls, and movement.'
        },
        { type: 'example', steps: ['Put a toy car on the floor.', 'Push it gently.', 'The car rolls away.'] }
      ],
      vocabulary: [
        { word: 'push', meaning: 'A force moving something away.', example: 'Push the door open.' },
        { word: 'pull', meaning: 'A force moving something closer.', example: 'Pull the wagon behind you.' },
        { word: 'force', meaning: 'A push or a pull.', example: 'A force starts the car moving.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a force?', options: ['A push or a pull', 'A colour', 'A sound'], answer: 0, why: 'Forces act as pushes or pulls.' },
        { type: 'multiple_choice', question: 'You open a door toward you. What did you use?', options: ['A pull', 'A push', 'A bounce'], answer: 0, why: 'Pulling brings the door toward you.' },
        { type: 'multiple_choice', question: 'A box is too heavy to move. What helps?', options: ['A bigger push', 'A smaller push', 'No push'], answer: 0, why: 'Heavier objects need more force.' }
      ]
    }]
  }];
}());

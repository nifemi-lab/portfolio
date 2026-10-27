/* Lower Secondary Physical Education — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'pe');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Physical Skills',
    description: 'Fitness, invasion games, and gymnastics. Draft content.',
    lessons: [{
      id: 'lower-secondary-pe-m1-l1',
      order: 1,
      title: 'Fitness and Endurance',
      objective: 'I can explain how endurance and technique affect performance.',
      minutes: 9,
      recap: 'You explained how endurance and technique affect performance.',
      blocks: [
        { type: 'text', body: 'Endurance is the ability to keep moving for a long time.' },
        { type: 'text', body: 'Aerobic activity uses oxygen steadily; anaerobic activity is short and intense.' },
        { type: 'text', body: 'Pacing and efficient technique help you sustain effort.' },
        { type: 'tip', body: 'Build endurance gradually and include rest days.' },
        {
          type: 'illustration',
          alt: 'A bright running shoe with laces.',
          image: 'assets/3d/running-shoe-3d.png',
          placeholder: 'Running shoe: pacing, endurance, and recovery.'
        },
        { type: 'example', steps: ['Start with a gentle jog.', 'Hold a steady pace.', 'Note how your breathing feels.', 'Record the distance.'] }
      ],
      vocabulary: [
        { word: 'endurance', meaning: 'Ability to keep going.', example: 'Endurance builds with practice.' },
        { word: 'aerobic', meaning: 'Using oxygen steadily.', example: 'Jogging is aerobic.' },
        { word: 'pace', meaning: 'How fast you move.', example: 'Set a steady pace.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is endurance?', options: ['Keeping going over time', 'Moving once', 'Lifting a heavy weight'], answer: 0, why: 'Endurance sustains effort.' },
        { type: 'multiple_choice', question: 'What is aerobic activity?', options: ['Steady activity using oxygen', 'A short sprint', 'A type of stretch'], answer: 0, why: 'Aerobic activity uses oxygen steadily.' },
        { type: 'multiple_choice', question: 'Why take rest days?', options: ['To help the body recover', 'To lose fitness', 'To avoid practice'], answer: 0, why: 'Recovery makes training effective.' }
      ]
    }, {
      id: 'lower-secondary-pe-m1-l2',
      order: 2,
      title: 'Invasion Games',
      objective: 'I can apply attacking and defending skills in an invasion game.',
      minutes: 9,
      recap: 'You applied attacking and defending skills in an invasion game.',
      blocks: [
        { type: 'text', body: 'Invasion games involve moving into an opponent’s space to score.' },
        { type: 'text', body: 'Attackers create space; defenders close space and delay progress.' },
        { type: 'text', body: 'Communication and decisions matter as much as speed.' },
        { type: 'tip', body: 'Scan for space before you receive the ball.' },
        {
          type: 'illustration',
          alt: 'A black-and-white football.',
          image: 'assets/3d/soccer-ball-3d.png',
          placeholder: 'Football: space, passing, and defending.'
        },
        { type: 'example', steps: ['Spread out in attack.', 'Pass into space.', 'Defend goal-side.', 'Communicate with your team.'] }
      ],
      vocabulary: [
        { word: 'attack', meaning: 'Try to score.', example: 'Attack the space.' },
        { word: 'defend', meaning: 'Protect your goal or space.', example: 'Defend as a unit.' },
        { word: 'possession', meaning: 'Control of the ball.', example: 'Keep possession.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do attackers try to do?', options: ['Create and use space', 'Stand still', 'Avoid the ball'], answer: 0, why: 'Attackers exploit space to score.' },
        { type: 'multiple_choice', question: 'What does defending mean?', options: ['Protecting goal-side space', 'Scoring quickly', 'Watching only'], answer: 0, why: 'Defenders restrict space and delay attacks.' },
        { type: 'multiple_choice', question: 'Why communicate?', options: ['To coordinate decisions', 'To make noise', 'To slow play'], answer: 0, why: 'Communication helps teams act together.' }
      ]
    }, {
      id: 'lower-secondary-pe-m1-l3',
      order: 3,
      title: 'Gymnastics',
      objective: 'I can perform a short sequence with control and balance.',
      minutes: 9,
      recap: 'You performed a short sequence with control and balance.',
      blocks: [
        { type: 'text', body: 'Gymnastics uses balances, rolls, jumps, and transitions.' },
        { type: 'text', body: 'Control matters more than difficulty: move deliberately and finish shapes cleanly.' },
        { type: 'text', body: 'Safety means checking mat space and following instructions.' },
        { type: 'tip', body: 'Practise each element before linking them together.' },
        {
          type: 'illustration',
          alt: 'A pair of pink ballet shoes.',
          image: 'assets/3d/ballet-shoes-3d.png',
          placeholder: 'Ballet shoes: control, balance, and sequence.'
        },
        { type: 'example', steps: ['Check the mat space.', 'Hold a balance.', 'Move into a controlled roll.', 'Finish in a clear shape.'] }
      ],
      vocabulary: [
        { word: 'sequence', meaning: 'Linked movements in order.', example: 'Practise the sequence.' },
        { word: 'balance', meaning: 'A held steady position.', example: 'Hold the balance.' },
        { word: 'transition', meaning: 'A move between positions.', example: 'Smooth transitions look controlled.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a sequence link?', options: ['Movements in order', 'Songs together', 'Teams'], answer: 0, why: 'Sequences combine movements.' },
        { type: 'multiple_choice', question: 'What matters most?', options: ['Control', 'Speed', 'Difficulty alone'], answer: 0, why: 'Controlled movement is the priority.' },
        { type: 'multiple_choice', question: 'What should you check first?', options: ['Mat space and safety', 'Your score', 'The audience'], answer: 0, why: 'Safety comes before performance.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Health and Teamwork',
    description: 'Teamwork, swimming, and healthy choices. Draft content.',
    lessons: [{
      id: 'lower-secondary-pe-m2-l1',
      order: 1,
      title: 'Teamwork',
      objective: 'I can explain how communication and roles improve teamwork.',
      minutes: 9,
      recap: 'You explained how communication and roles improve teamwork.',
      blocks: [
        { type: 'text', body: 'Teams work best when members understand their roles and communicate clearly.' },
        { type: 'text', body: 'Good communication is short, timely, and respectful.' },
        { type: 'text', body: 'Encouragement and fair play build trust, especially after mistakes.' },
        { type: 'tip', body: 'Review what worked after each game, not only the score.' },
        {
          type: 'illustration',
          alt: 'A handshake between two people.',
          image: 'assets/3d/handshake-3d.png',
          placeholder: 'Handshake: trust, roles, and fair play.'
        },
        { type: 'example', steps: ['Agree roles before play.', 'Call clear information.', 'Support a teammate after an error.', 'Review the game together.'] }
      ],
      vocabulary: [
        { word: 'role', meaning: 'A job within a team.', example: 'Each player has a role.' },
        { word: 'communication', meaning: 'Sharing information clearly.', example: 'Good communication wins games.' },
        { word: 'fair play', meaning: 'Respectful, honest conduct.', example: 'Fair play matters more than winning.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What helps a team?', options: ['Clear roles and communication', 'Silence', 'Blaming others'], answer: 0, why: 'Roles and communication improve teamwork.' },
        { type: 'multiple_choice', question: 'What is fair play?', options: ['Respectful, honest conduct', 'Ignoring rules', 'Winning at any cost'], answer: 0, why: 'Fair play values respect and honesty.' },
        { type: 'multiple_choice', question: 'Why review a game?', options: ['To learn what to improve', 'To relive mistakes', 'To argue'], answer: 0, why: 'Review supports improvement.' }
      ]
    }, {
      id: 'lower-secondary-pe-m2-l2',
      order: 2,
      title: 'Swimming',
      objective: 'I can describe basic swimming safety and technique.',
      minutes: 9,
      recap: 'You described basic swimming safety and technique.',
      blocks: [
        { type: 'text', body: 'Swimming develops endurance and uses most major muscle groups.' },
        { type: 'text', body: 'Never swim without an adult or lifeguard, and follow pool rules.' },
        { type: 'text', body: 'Good technique includes steady breathing and relaxed movement.' },
        { type: 'tip', body: 'Swim in water you are ready for, not beyond your depth.' },
        {
          type: 'illustration',
          alt: 'A blue diving mask with a snorkel.',
          image: 'assets/3d/diving-mask-3d.png',
          placeholder: 'Diving mask: water safety and technique.'
        },
        { type: 'example', steps: ['Check for a lifeguard.', 'Warm up at the pool edge.', 'Practise steady breathing.', 'Stay within your depth.'] }
      ],
      vocabulary: [
        { word: 'lifeguard', meaning: 'A trained person who watches swimmers.', example: 'The lifeguard watched the pool.' },
        { word: 'breathing', meaning: 'Taking air in and out.', example: 'Control your breathing.' },
        { word: 'depth', meaning: 'How deep the water is.', example: 'Stay in your depth.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who should supervise swimming?', options: ['An adult or lifeguard', 'A friend only', 'No one'], answer: 0, why: 'Supervision keeps swimmers safe.' },
        { type: 'multiple_choice', question: 'What helps technique?', options: ['Steady breathing', 'Holding your breath', 'Splashing only'], answer: 0, why: 'Steady breathing supports relaxed swimming.' },
        { type: 'multiple_choice', question: 'Where should you swim?', options: ['Within your depth', 'Beyond the flags', 'Alone'], answer: 0, why: 'Swim where you are safe and confident.' }
      ]
    }, {
      id: 'lower-secondary-pe-m2-l3',
      order: 3,
      title: 'Healthy Choices',
      objective: 'I can make informed choices about food, rest, and activity.',
      minutes: 9,
      recap: 'You made informed choices about food, rest, and activity.',
      blocks: [
        { type: 'text', body: 'A balanced diet provides energy and the nutrients the body needs.' },
        { type: 'text', body: 'Regular activity, sleep, and hydration support both body and mind.' },
        { type: 'text', body: 'Screens and long sitting can be balanced with movement breaks.' },
        { type: 'tip', body: 'Small, consistent changes are easier to maintain than sudden ones.' },
        {
          type: 'illustration',
          alt: 'A shiny red apple with a green leaf.',
          image: 'assets/3d/red-apple-3d.png',
          placeholder: 'Apple: nutrition, energy, and balance.'
        },
        { type: 'example', steps: ['Choose fruit with a snack.', 'Take a movement break.', 'Drink water regularly.', 'Keep a regular bedtime.'] }
      ],
      vocabulary: [
        { word: 'nutrient', meaning: 'A substance the body needs.', example: 'Fruit provides nutrients.' },
        { word: 'hydration', meaning: 'Having enough water.', example: 'Hydration supports performance.' },
        { word: 'balanced', meaning: 'Having the right mix.', example: 'Keep a balanced routine.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a balanced diet provide?', options: ['Energy and nutrients', 'Only sugar', 'Only water'], answer: 0, why: 'Balance supplies what the body needs.' },
        { type: 'multiple_choice', question: 'What supports recovery?', options: ['Sleep and rest', 'Skipping meals', 'More screens'], answer: 0, why: 'Rest helps the body recover.' },
        { type: 'multiple_choice', question: 'How should you change habits?', options: ['Small and consistent', 'Sudden and extreme', 'Never'], answer: 0, why: 'Small changes are easier to sustain.' }
      ]
    }]
  }];
}());

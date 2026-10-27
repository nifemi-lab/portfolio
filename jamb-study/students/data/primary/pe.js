/* Primary Physical Education — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'pe');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Moving Well',
    description: 'Movement, balls, and balance for young bodies. Draft content.',
    lessons: [{
      id: 'primary-pe-m1-l1',
      order: 1,
      title: 'Movement Skills',
      objective: 'I can move safely in different ways and directions.',
      minutes: 7,
      recap: 'You moved safely in different ways and directions.',
      blocks: [
        { type: 'text', body: 'Moving well means controlling your body while walking, running, jumping, and turning.' },
        { type: 'text', body: 'Look where you are going and leave space around others.' },
        { type: 'text', body: 'Changing speed and direction helps you react to games.' },
        { type: 'tip', body: 'Warm up gently before moving quickly.' },
        {
          type: 'illustration',
          alt: 'A pair of pink ballet shoes.',
          image: 'assets/3d/ballet-shoes-3d.png',
          placeholder: 'Ballet shoes: control, balance, and movement.'
        },
        { type: 'example', steps: ['Walk around the space.', 'Change to a slow jog.', 'Jump and land softly.', 'Check your space again.'] }
      ],
      vocabulary: [
        { word: 'space', meaning: 'Room to move safely.', example: 'Find your own space.' },
        { word: 'control', meaning: 'Keeping your body steady.', example: 'Land with control.' },
        { word: 'direction', meaning: 'The way you move.', example: 'Change direction quickly.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why leave space?', options: ['To move safely', 'To run faster', 'To hide'], answer: 0, why: 'Space prevents collisions.' },
        { type: 'multiple_choice', question: 'How should you land a jump?', options: ['Softly with bent knees', 'Stiffly on heels', 'On one finger'], answer: 0, why: 'Soft landings protect your joints.' },
        { type: 'multiple_choice', question: 'Why change direction?', options: ['To react in games', 'To stand still', 'To get tired'], answer: 0, why: 'Changing direction helps you respond.' }
      ]
    }, {
      id: 'primary-pe-m1-l2',
      order: 2,
      title: 'Ball Skills',
      objective: 'I can roll, throw, and catch a ball with control.',
      minutes: 7,
      recap: 'You rolled, threw, and caught a ball with control.',
      blocks: [
        { type: 'text', body: 'Ball skills include rolling, throwing, catching, and bouncing.' },
        { type: 'text', body: 'Watch the ball and move your hands to meet it.' },
        { type: 'text', body: 'Catching with soft hands stops the ball from bouncing away.' },
        { type: 'tip', body: 'Start close and move further apart as you improve.' },
        {
          type: 'illustration',
          alt: 'A black-and-white football.',
          image: 'assets/3d/soccer-ball-3d.png',
          placeholder: 'Football: rolling, throwing, and catching.'
        },
        { type: 'example', steps: ['Stand close to a partner.', 'Roll the ball gently.', 'Catch with soft hands.', 'Step back and repeat.'] }
      ],
      vocabulary: [
        { word: 'catch', meaning: 'Stop and hold a moving ball.', example: 'Catch with soft hands.' },
        { word: 'throw', meaning: 'Send a ball through the air.', example: 'Throw underarm.' },
        { word: 'control', meaning: 'Keeping the ball close.', example: 'Control the ball with your feet.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How should you catch?', options: ['With soft hands', 'With stiff fingers', 'With your eyes closed'], answer: 0, why: 'Soft hands absorb the ball.' },
        { type: 'multiple_choice', question: 'What should you watch?', options: ['The ball', 'Your shoes', 'The sky'], answer: 0, why: 'Tracking the ball helps you catch.' },
        { type: 'multiple_choice', question: 'How should you start?', options: ['Close together', 'Far apart', 'Back to back'], answer: 0, why: 'Start close and build distance.' }
      ]
    }, {
      id: 'primary-pe-m1-l3',
      order: 3,
      title: 'Balance and Coordination',
      objective: 'I can hold a balance and coordinate simple movements.',
      minutes: 7,
      recap: 'You held a balance and coordinated simple movements.',
      blocks: [
        { type: 'text', body: 'Balance keeps your body steady; coordination joins movements smoothly.' },
        { type: 'text', body: 'Use your arms and focus your eyes to help hold a balance.' },
        { type: 'text', body: 'Practise slowly before adding speed.' },
        { type: 'tip', body: 'Hold a balance for five seconds, then swap sides.' },
        {
          type: 'illustration',
          alt: 'A skateboard with orange wheels.',
          image: 'assets/3d/skateboard-3d.png',
          placeholder: 'Skateboard: balance, control, and coordination.'
        },
        { type: 'example', steps: ['Stand on one foot.', 'Stretch your arms out.', 'Hold for five seconds.', 'Swap to the other foot.'] }
      ],
      vocabulary: [
        { word: 'balance', meaning: 'Staying steady.', example: 'Hold the balance.' },
        { word: 'coordination', meaning: 'Moving body parts together.', example: 'Coordination improves with practice.' },
        { word: 'steady', meaning: 'Not wobbling.', example: 'Keep your body steady.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What helps you balance?', options: ['Using your arms', 'Closing your eyes', 'Holding your breath'], answer: 0, why: 'Arms help you stay steady.' },
        { type: 'multiple_choice', question: 'What is coordination?', options: ['Moving parts together smoothly', 'Moving one finger', 'Standing still'], answer: 0, why: 'Coordination links movements.' },
        { type: 'multiple_choice', question: 'How should you practise?', options: ['Slowly first', 'At full speed', 'Without warming up'], answer: 0, why: 'Slow practice builds control.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Healthy and Active',
    description: 'Team games, athletics, and caring for your body. Draft content.',
    lessons: [{
      id: 'primary-pe-m2-l1',
      order: 1,
      title: 'Team Games',
      objective: 'I can play a small team game and follow the rules.',
      minutes: 8,
      recap: 'You played a small team game and followed the rules.',
      blocks: [
        { type: 'text', body: 'Team games need passing, moving into space, and listening to teammates.' },
        { type: 'text', body: 'Rules keep the game fair and safe for everyone.' },
        { type: 'text', body: 'Good teammates encourage others and take turns.' },
        { type: 'tip', body: 'Call a teammate’s name before passing.' },
        {
          type: 'illustration',
          alt: 'An orange basketball with black lines.',
          image: 'assets/3d/basketball-3d.png',
          placeholder: 'Basketball: passing, space, and teamwork.'
        },
        { type: 'example', steps: ['Find a teammate in space.', 'Call their name.', 'Pass the ball.', 'Move to support them.'] }
      ],
      vocabulary: [
        { word: 'team', meaning: 'A group playing together.', example: 'Our team passed well.' },
        { word: 'pass', meaning: 'Send the ball to a teammate.', example: 'Pass quickly.' },
        { word: 'rule', meaning: 'A guide for fair play.', example: 'Follow the rules.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why follow rules?', options: ['To keep play fair and safe', 'To win faster', 'To avoid teammates'], answer: 0, why: 'Rules protect fair, safe play.' },
        { type: 'multiple_choice', question: 'What should you do before passing?', options: ['Call your teammate', 'Look away', 'Stop moving'], answer: 0, why: 'Calling helps your teammate prepare.' },
        { type: 'multiple_choice', question: 'What makes a good teammate?', options: ['Encouraging others', 'Blaming others', 'Never passing'], answer: 0, why: 'Good teammates support the group.' }
      ]
    }, {
      id: 'primary-pe-m2-l2',
      order: 2,
      title: 'Athletics',
      objective: 'I can run, jump, and throw with a simple technique.',
      minutes: 8,
      recap: 'You ran, jumped, and threw with a simple technique.',
      blocks: [
        { type: 'text', body: 'Athletics includes running, jumping, and throwing events.' },
        { type: 'text', body: 'In running, relax your shoulders and swing your arms.' },
        { type: 'text', body: 'In jumping, bend your knees and land softly.' },
        { type: 'tip', body: 'Warm up and cool down around every session.' },
        {
          type: 'illustration',
          alt: 'A bright running shoe with laces.',
          image: 'assets/3d/running-shoe-3d.png',
          placeholder: 'Running shoe: technique, warm-up, and safety.'
        },
        { type: 'example', steps: ['Warm up with a walk.', 'Jog gently.', 'Practise a standing jump.', 'Cool down and stretch.'] }
      ],
      vocabulary: [
        { word: 'athletics', meaning: 'Running, jumping, and throwing sports.', example: 'Athletics includes sprints.' },
        { word: 'technique', meaning: 'A good way of moving.', example: 'Practise the technique.' },
        { word: 'warm-up', meaning: 'Gentle movement before exercise.', example: 'Start with a warm-up.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does athletics include?', options: ['Running, jumping, and throwing', 'Only swimming', 'Only cycling'], answer: 0, why: 'Athletics covers track and field events.' },
        { type: 'multiple_choice', question: 'Why warm up?', options: ['To prepare the body', 'To get tired', 'To cool down'], answer: 0, why: 'Warm-ups prepare muscles for activity.' },
        { type: 'multiple_choice', question: 'How should you land a jump?', options: ['Softly with bent knees', 'Stiffly', 'On your hands'], answer: 0, why: 'Soft landings reduce strain.' }
      ]
    }, {
      id: 'primary-pe-m2-l3',
      order: 3,
      title: 'Healthy Body',
      objective: 'I can name habits that keep my body healthy.',
      minutes: 7,
      recap: 'You named habits that keep your body healthy.',
      blocks: [
        { type: 'text', body: 'Healthy habits include moving often, eating a balanced diet, and drinking water.' },
        { type: 'text', body: 'Sleep helps your body recover and your mind stay alert.' },
        { type: 'text', body: 'Washing hands and brushing teeth prevent illness.' },
        { type: 'tip', body: 'Choose one healthy habit to practise this week.' },
        {
          type: 'illustration',
          alt: 'A shiny red apple with a green leaf.',
          image: 'assets/3d/red-apple-3d.png',
          placeholder: 'Apple: balanced food and healthy habits.'
        },
        { type: 'example', steps: ['Eat fruit at snack time.', 'Drink water after play.', 'Sleep at a regular time.', 'Wash your hands before eating.'] }
      ],
      vocabulary: [
        { word: 'balanced', meaning: 'Having the right mix.', example: 'Eat a balanced diet.' },
        { word: 'habit', meaning: 'Something you do often.', example: 'Walking is a healthy habit.' },
        { word: 'recover', meaning: 'Get strength back.', example: 'Sleep helps you recover.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a healthy habit?', options: ['Drinking water', 'Skipping sleep', 'Avoiding fruit'], answer: 0, why: 'Water supports a healthy body.' },
        { type: 'multiple_choice', question: 'Why is sleep important?', options: ['It helps recovery', 'It replaces food', 'It builds muscles only'], answer: 0, why: 'Sleep restores body and mind.' },
        { type: 'multiple_choice', question: 'What is a balanced diet?', options: ['The right mix of foods', 'Only sweets', 'Only water'], answer: 0, why: 'Balance means eating a range of foods.' }
      ]
    }]
  }];
}());

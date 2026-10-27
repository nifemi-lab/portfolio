/* GCSE Physical Education — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'pe');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Performance',
    description: 'Fitness, training, and the psychology of sport. Draft content.',
    lessons: [{
      id: 'upper-secondary-pe-m1-l1',
      order: 1,
      title: 'Components of Fitness',
      objective: 'I can define fitness components and link them to sporting demands.',
      minutes: 10,
      recap: 'You defined fitness components and linked them to sporting demands.',
      blocks: [
        { type: 'text', body: 'Health-related fitness includes cardiovascular endurance, muscular strength, muscular endurance, flexibility, and body composition.' },
        { type: 'text', body: 'Skill-related fitness includes speed, agility, balance, coordination, power, and reaction time.' },
        { type: 'text', body: 'Different sports prioritise different components, so training must match the demand.' },
        { type: 'tip', body: 'Name the component, then justify it with an example from the sport.' },
        {
          type: 'illustration',
          alt: 'A bright running shoe with laces.',
          image: 'assets/3d/running-shoe-3d.png',
          placeholder: 'Running shoe: endurance, speed, and training demand.'
        },
        { type: 'example', steps: ['Choose a sport.', 'Identify its main demand.', 'Name the fitness component.', 'Give a specific example.'] }
      ],
      vocabulary: [
        { word: 'cardiovascular', meaning: 'Relating to the heart and lungs.', example: 'Running builds cardiovascular endurance.' },
        { word: 'agility', meaning: 'Changing direction quickly.', example: 'Agility matters in tennis.' },
        { word: 'power', meaning: 'Strength used quickly.', example: 'Jumping needs power.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is health-related fitness?', options: ['Cardiovascular endurance', 'Agility', 'Reaction time'], answer: 0, why: 'Endurance is health-related.' },
        { type: 'multiple_choice', question: 'Which is skill-related fitness?', options: ['Agility', 'Flexibility', 'Body composition'], answer: 0, why: 'Agility is skill-related.' },
        { type: 'multiple_choice', question: 'Why match training to sport?', options: ['Each sport demands different components', 'All sports are identical', 'Training does not matter'], answer: 0, why: 'Specific demands need specific training.' }
      ]
    }, {
      id: 'upper-secondary-pe-m1-l2',
      order: 2,
      title: 'Training Methods',
      objective: 'I can compare training methods and their benefits.',
      minutes: 10,
      recap: 'You compared training methods and their benefits.',
      blocks: [
        { type: 'text', body: 'Continuous training builds endurance; interval training alternates work and rest.' },
        { type: 'text', body: 'Resistance training develops strength; plyometrics develops explosive power.' },
        { type: 'text', body: 'FITT—frequency, intensity, time, type—helps structure a safe programme.' },
        { type: 'tip', body: 'Progressive overload should be gradual to reduce injury risk.' },
        {
          type: 'illustration',
          alt: 'A gold first-place medal on a ribbon.',
          image: 'assets/3d/1st-place-medal-3d.png',
          placeholder: 'Gold medal: structured training and progress.'
        },
        { type: 'example', steps: ['Choose a goal.', 'Select a suitable method.', 'Apply the FITT principle.', 'Increase gradually and review.'] }
      ],
      vocabulary: [
        { word: 'interval', meaning: 'Alternating work and rest.', example: 'Interval training improves speed.' },
        { word: 'overload', meaning: 'Training beyond current capacity.', example: 'Progressive overload builds fitness.' },
        { word: 'plyometrics', meaning: 'Explosive jumping exercises.', example: 'Plyometrics builds power.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does interval training alternate?', options: ['Work and rest', 'Food and sleep', 'Heat and cold'], answer: 0, why: 'Intervals combine effort and recovery.' },
        { type: 'multiple_choice', question: 'What does FITT stand for?', options: ['Frequency, intensity, time, type', 'Fast, intense, tough, total', 'Flex, inhale, turn, twist'], answer: 0, why: 'FITT structures training programmes.' },
        { type: 'multiple_choice', question: 'Why increase gradually?', options: ['To reduce injury risk', 'To avoid progress', 'To train less'], answer: 0, why: 'Gradual overload is safer.' }
      ]
    }, {
      id: 'upper-secondary-pe-m1-l3',
      order: 3,
      title: 'Sports Psychology',
      objective: 'I can explain how motivation and anxiety affect performance.',
      minutes: 10,
      recap: 'You explained how motivation and anxiety affect performance.',
      blocks: [
        { type: 'text', body: 'Motivation can be intrinsic, such as enjoyment, or extrinsic, such as rewards.' },
        { type: 'text', body: 'Arousal affects performance: too little loses focus, too much causes tension.' },
        { type: 'text', body: 'Goal-setting, routines, and self-talk can support concentration and confidence.' },
        { type: 'tip', body: 'Set specific, measurable, achievable goals rather than vague ones.' },
        {
          type: 'illustration',
          alt: 'A pink brain shown from the side.',
          image: 'assets/3d/brain-3d.png',
          placeholder: 'Brain: motivation, arousal, and focus.'
        },
        { type: 'example', steps: ['Set a specific goal.', 'Use a pre-performance routine.', 'Notice tension early.', 'Refocus with self-talk.'] }
      ],
      vocabulary: [
        { word: 'motivation', meaning: 'The drive to act.', example: 'Intrinsic motivation comes from enjoyment.' },
        { word: 'arousal', meaning: 'How alert or tense you feel.', example: 'High arousal can hurt accuracy.' },
        { word: 'self-talk', meaning: 'What you tell yourself.', example: 'Positive self-talk builds confidence.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is intrinsic motivation?', options: ['Drive from enjoyment', 'Drive from prizes', 'Drive from fear'], answer: 0, why: 'Intrinsic motivation comes from within.' },
        { type: 'multiple_choice', question: 'What happens with too much arousal?', options: ['Performance can suffer', 'Focus improves always', 'Nothing changes'], answer: 0, why: 'Excess arousal causes tension and errors.' },
        { type: 'multiple_choice', question: 'Which goal is best?', options: ['Specific and measurable', 'Vague and distant', 'Someone else’s'], answer: 0, why: 'Specific goals guide improvement.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Health and Society',
    description: 'Nutrition, sport in society, and lifelong activity. Draft content.',
    lessons: [{
      id: 'upper-secondary-pe-m2-l1',
      order: 1,
      title: 'Nutrition and Health',
      objective: 'I can explain how nutrition supports performance and recovery.',
      minutes: 10,
      recap: 'You explained how nutrition supports performance and recovery.',
      blocks: [
        { type: 'text', body: 'Carbohydrates provide energy; protein supports repair; fats support long-term energy and health.' },
        { type: 'text', body: 'Vitamins, minerals, and water support many body functions.' },
        { type: 'text', body: 'Timing matters: eating and hydrating around exercise affects performance and recovery.' },
        { type: 'tip', body: 'Balance is more important than any single “superfood”.' },
        {
          type: 'illustration',
          alt: 'A shiny red apple with a green leaf.',
          image: 'assets/3d/red-apple-3d.png',
          placeholder: 'Apple: nutrients, energy, and recovery.'
        },
        { type: 'example', steps: ['Plan a meal before exercise.', 'Drink water during activity.', 'Eat protein after training.', 'Keep meals varied.'] }
      ],
      vocabulary: [
        { word: 'carbohydrate', meaning: 'A main energy source.', example: 'Pasta provides carbohydrate.' },
        { word: 'protein', meaning: 'A nutrient for repair.', example: 'Protein helps muscles recover.' },
        { word: 'hydration', meaning: 'Having enough water.', example: 'Hydration supports performance.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do carbohydrates provide?', options: ['Energy', 'Repair only', 'Water'], answer: 0, why: 'Carbohydrates are a main energy source.' },
        { type: 'multiple_choice', question: 'What supports muscle repair?', options: ['Protein', 'Sugar only', 'Salt only'], answer: 0, why: 'Protein supports repair and growth.' },
        { type: 'multiple_choice', question: 'Why hydrate during exercise?', options: ['To replace lost water', 'To add sugar only', 'To cool the air'], answer: 0, why: 'Hydration maintains performance.' }
      ]
    }, {
      id: 'upper-secondary-pe-m2-l2',
      order: 2,
      title: 'Sport and Society',
      objective: 'I can discuss the social and economic role of sport.',
      minutes: 10,
      recap: 'You discussed the social and economic role of sport.',
      blocks: [
        { type: 'text', body: 'Sport can build community, support health, and create identity.' },
        { type: 'text', body: 'It also involves money, media, sponsorship, and questions about fairness.' },
        { type: 'text', body: 'Access can vary by income, gender, disability, and location.' },
        { type: 'tip', body: 'Support arguments with evidence about participation and access.' },
        {
          type: 'illustration',
          alt: 'A gold trophy cup with handles.',
          image: 'assets/3d/trophy-3d.png',
          placeholder: 'Trophy: sport, community, and commercial pressure.'
        },
        { type: 'example', steps: ['Identify a social benefit.', 'Identify a commercial influence.', 'Consider who has access.', 'Weigh the evidence.'] }
      ],
      vocabulary: [
        { word: 'sponsorship', meaning: 'Money from a company for advertising.', example: 'Sponsorship funds the team.' },
        { word: 'participation', meaning: 'Taking part in an activity.', example: 'Participation has grown.' },
        { word: 'access', meaning: 'The chance to take part.', example: 'Access varies by cost.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can sport build?', options: ['Community and identity', 'Only profit', 'Only buildings'], answer: 0, why: 'Sport can strengthen community.' },
        { type: 'multiple_choice', question: 'What can limit participation?', options: ['Cost and access', 'Only talent', 'Only weather'], answer: 0, why: 'Access barriers affect participation.' },
        { type: 'multiple_choice', question: 'Why examine sponsorship?', options: ['It shapes sport and media', 'It has no effect', 'It only buys equipment'], answer: 0, why: 'Commercial interests influence sport.' }
      ]
    }, {
      id: 'upper-secondary-pe-m2-l3',
      order: 3,
      title: 'Lifelong Activity',
      objective: 'I can plan how to stay active throughout life.',
      minutes: 10,
      recap: 'You planned how to stay active throughout life.',
      blocks: [
        { type: 'text', body: 'Lifelong activity means finding movement you can sustain across different life stages.' },
        { type: 'text', body: 'Enjoyment, social contact, and convenience predict whether habits last.' },
        { type: 'text', body: 'Activity can include walking, cycling, swimming, dance, or sport.' },
        { type: 'tip', body: 'Plan for busy weeks by choosing shorter, easier sessions.' },
        {
          type: 'illustration',
          alt: 'A skateboard with orange wheels.',
          image: 'assets/3d/skateboard-3d.png',
          placeholder: 'Skateboard: enjoyable activity that can last a lifetime.'
        },
        { type: 'example', steps: ['List activities you enjoy.', 'Choose one that fits your week.', 'Set a realistic schedule.', 'Review and adjust monthly.'] }
      ],
      vocabulary: [
        { word: 'lifelong', meaning: 'Continuing through life.', example: 'Walking is a lifelong activity.' },
        { word: 'sustainable', meaning: 'Possible to keep doing.', example: 'Choose a sustainable routine.' },
        { word: 'routine', meaning: 'A regular pattern.', example: 'Build a weekly routine.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What supports lifelong activity?', options: ['Enjoyment and convenience', 'Only competition', 'Only gyms'], answer: 0, why: 'Enjoyable, convenient activity lasts.' },
        { type: 'multiple_choice', question: 'Which counts as activity?', options: ['Walking', 'Only team sport', 'Only running'], answer: 0, why: 'Everyday movement counts.' },
        { type: 'multiple_choice', question: 'What helps in busy weeks?', options: ['Shorter sessions', 'Giving up', 'Skipping sleep'], answer: 0, why: 'Short sessions keep the habit alive.' }
      ]
    }]
  }];
}());

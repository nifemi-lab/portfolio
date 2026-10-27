window.LEARN_TRACKS = {
  version: 1,
  tracks: [
    {
      id: 'primary',
      label: 'Primary',
      stage: 'UK Key Stage 1–2',
      ages: '5–11',
      usEquivalent: 'Elementary',
      tone: 'Warm, concrete, guided',
      subjects: [{
        id: 'maths',
        label: 'Mathematics',
        modules: [{
          id: 'm1',
          order: 1,
          title: 'Counting and Place Value',
          description: 'Count, read, write, and compare whole numbers.',
          lessons: [{
            id: 'primary-maths-m1-l1',
            order: 1,
            title: 'Counting to 20',
            objective: 'I can count, read, and write numbers to 20.',
            minutes: 7,
            recap: 'You counted, read, and wrote numbers to 20.',
            blocks: [
              { type: 'text', body: 'We count in order. Each number is one more than the one before.' },
              { type: 'text', body: 'Say one number for each object you count. The last number tells you the total.' },
              { type: 'tip', body: 'Touch each object once as you say a number.' },
              {
                type: 'illustration',
                alt: 'A wooden abacus with rows of counting beads.',
                image: 'assets/3d/abacus-3d.png',
                placeholder: 'Abacus: rows of beads, counted one by one.'
              },
              { type: 'example', steps: ['Start at 10.', 'Say 11, 12, 13, 14.', 'There are 14 dots.'] }
            ],
            vocabulary: [
              { word: 'digit', meaning: 'A single number symbol from 0 to 9.', example: 'The number 14 has two digits: 1 and 4.' },
              { word: 'count', meaning: 'Say numbers in order, one for each object.', example: 'Count the dots one by one.' },
              { word: 'total', meaning: 'The number you reach after counting everything.', example: 'The total is 14 dots.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'What comes after 16?', options: ['15', '17', '18'], answer: 1, why: 'Counting forward, 17 is one more than 16.' },
              { type: 'multiple_choice', question: 'What is one ten and four ones?', options: ['14', '41', '104'], answer: 0, why: 'One ten and four ones make 14.' },
              { type: 'multiple_choice', question: 'There are 10 dots and 3 more dots. How many altogether?', options: ['12', '13', '30'], answer: 1, why: '10 and 3 more make 13.' }
            ]
          }]
        }]
      }]
    },
    {
      id: 'lower-secondary',
      label: 'Lower Secondary',
      stage: 'UK Key Stage 3 · Years 7–9',
      ages: '11–14',
      usEquivalent: 'Middle School',
      tone: 'Calm, direct, respectful',
      subjects: [{
        id: 'maths',
        label: 'Mathematics',
        modules: [{
          id: 'm1',
          order: 1,
          title: 'Number Foundations',
          description: 'Whole numbers, order of operations, factors, multiples, and primes.',
          lessons: [{
            id: 'lower-secondary-maths-m1-l1',
            order: 1,
            title: 'Integers and Number Lines',
            objective: 'I can place, compare, and order positive and negative integers.',
            minutes: 8,
            recap: 'You placed and compared positive and negative integers.',
            blocks: [
              { type: 'text', body: 'An integer is a whole number. It can be positive, negative, or zero.' },
              { type: 'text', body: 'Positive integers are greater than zero. Negative integers are less than zero.' },
              { type: 'text', body: 'On a number line, numbers increase to the right and decrease to the left.' },
              { type: 'tip', body: 'Zero is neither positive nor negative.' },
              {
                type: 'illustration',
                alt: 'A thermometer with a scale above and below zero.',
                image: 'assets/3d/thermometer-3d.png',
                placeholder: 'Thermometer: a mark below zero is a negative number.'
              },
              { type: 'example', steps: ['Start at 0.', 'Move 4 places to the left.', 'You land on negative 4.', 'So negative 4 is less than 0.'] }
            ],
            vocabulary: [
              { word: 'integer', meaning: 'A whole number: positive, negative, or zero.', example: 'Negative 2 and 7 are integers.' },
              { word: 'negative', meaning: 'A number less than zero.', example: 'Negative 4 is less than zero.' },
              { word: 'positive', meaning: 'A number greater than zero.', example: 'Positive 3 is greater than zero.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Which number is an integer?', options: ['-2', '0.5', '1/3'], answer: 0, why: 'An integer is a whole number, and negative 2 is whole.' },
              { type: 'multiple_choice', question: 'Which is greater, negative 3 or negative 7?', options: ['-3', '-7', 'They are equal'], answer: 0, why: 'On a number line, negative 3 is to the right of negative 7.' },
              { type: 'multiple_choice', question: 'Start at 0 and move 4 places left. Where are you?', options: ['4', '-4', '0'], answer: 1, why: 'Moving left from zero gives a negative number: negative 4.' }
            ]
          }]
        }]
      }]
    },
    {
      id: 'upper-secondary',
      label: 'Upper Secondary',
      stage: 'GCSE Foundation · Maths & Science',
      ages: '14–16',
      usEquivalent: 'High School (grades 9–10)',
      tone: 'Focused, encouraging, no hype',
      subjects: [{
        id: 'maths',
        label: 'Mathematics',
        modules: [{
          id: 'm1',
          order: 1,
          title: 'Number',
          description: 'Fractions, decimals, percentages, percentage change, ratio, and proportion.',
          lessons: [{
            id: 'upper-secondary-maths-m1-l1',
            order: 1,
            title: 'Fractions, Decimals, and Percentages',
            objective: 'I can convert between simple fractions, decimals, and percentages.',
            minutes: 8,
            recap: 'You converted between fractions, decimals, and percentages.',
            blocks: [
              { type: 'text', body: 'A fraction shows part of a whole. The denominator tells how many equal parts there are.' },
              { type: 'text', body: 'The numerator tells how many parts you have. In three quarters, the numerator is 3.' },
              { type: 'text', body: 'A decimal is another way to write a fraction. One half is 0.5.' },
              { type: 'text', body: 'A percentage is a fraction out of 100. Fifty per cent means 50 out of 100.' },
              { type: 'tip', body: '0.75 and 75% mean the same as three quarters.' },
              {
                type: 'illustration',
                alt: 'A slice of pizza: one part of a whole pizza.',
                image: 'assets/3d/pizza-3d.png',
                placeholder: 'Pizza slice: one part of a whole pizza.'
              },
              { type: 'example', steps: ['Take three quarters.', 'Divide 3 by 4 to get 0.75.', 'Multiply 0.75 by 100 to get 75.', 'So three quarters equals 0.75 or 75%.'] }
            ],
            vocabulary: [
              { word: 'numerator', meaning: 'The top number of a fraction.', example: 'In three quarters, 3 is the numerator.' },
              { word: 'denominator', meaning: 'The bottom number of a fraction.', example: 'In three quarters, 4 is the denominator.' },
              { word: 'percentage', meaning: 'A number out of 100.', example: 'Seventy five per cent means 75 out of 100.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Which decimal equals one quarter?', options: ['0.25', '0.4', '1.4'], answer: 0, why: 'One quarter means 1 divided by 4, which is 0.25.' },
              { type: 'multiple_choice', question: 'Which percentage equals 0.6?', options: ['6%', '60%', '600%'], answer: 1, why: '0.6 is 60 hundredths, which is 60%.' },
              { type: 'multiple_choice', question: 'What is one half as a percentage?', options: ['12%', '50%', '100%'], answer: 1, why: 'One half is 0.5, and 0.5 is 50%.' }
            ]
          }]
        }]
      }]
    }
  ]
};

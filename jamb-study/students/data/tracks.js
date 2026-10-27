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
          }, {
            id: 'primary-maths-m1-l2',
            order: 2,
            title: 'Tens and Ones',
            objective: 'I can split numbers to 100 into tens and ones.',
            minutes: 7,
            recap: 'You split numbers into tens and ones and read their place value.',
            blocks: [
              { type: 'text', body: 'A two-digit number has a tens digit and a ones digit.' },
              { type: 'text', body: 'The tens digit counts groups of ten. The ones digit counts extra ones.' },
              { type: 'tip', body: 'In 40, the digit 0 means there are no ones.' },
              {
                type: 'illustration',
                alt: 'A number pad showing the digits one, two, three, and four.',
                image: 'assets/3d/input-numbers-3d.png',
                placeholder: 'Number pad: digits that build a two-digit number.'
              },
              { type: 'example', steps: ['Look at the number 47.', '47 has 4 tens, which make 40.', 'It also has 7 ones.', 'So 47 is 40 and 7.'] }
            ],
            vocabulary: [
              { word: 'tens', meaning: 'Groups of ten inside a number.', example: '40 has 4 tens.' },
              { word: 'ones', meaning: 'The units left after making tens.', example: '47 has 7 ones.' },
              { word: 'place value', meaning: 'What a digit is worth by its position.', example: 'In 52, the 5 is worth 50.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'How many tens are in 52?', options: ['2', '5', '50'], answer: 1, why: 'The tens digit is 5, so there are 5 tens.' },
              { type: 'multiple_choice', question: 'What number is 6 tens and 3 ones?', options: ['36', '63', '603'], answer: 1, why: '6 tens make 60. Adding 3 ones gives 63.' },
              { type: 'multiple_choice', question: 'What number is 8 tens and 1 one?', options: ['18', '81', '80'], answer: 1, why: '8 tens make 80. Adding 1 one gives 81.' }
            ]
          }, {
            id: 'primary-maths-m1-l3',
            order: 3,
            title: 'Comparing Numbers to 100',
            objective: 'I can compare numbers to 100 using less than, greater than, and equal to.',
            minutes: 7,
            recap: 'You compared numbers to 100 using the three comparison symbols.',
            blocks: [
              { type: 'text', body: 'The symbol < means less than. The symbol > means greater than.' },
              { type: 'text', body: 'The symbol = means equal. Both sides have the same value.' },
              { type: 'text', body: 'Compare the tens first. If they match, compare the ones.' },
              { type: 'tip', body: 'The wide open side of the symbol faces the greater number.' },
              {
                type: 'illustration',
                alt: 'A ruler with evenly spaced marks in order.',
                image: 'assets/3d/straight-ruler-3d.png',
                placeholder: 'Ruler: marks further to the right are greater.'
              },
              { type: 'example', steps: ['Compare 34 and 29.', '34 has 3 tens. 29 has 2 tens.', '3 tens is more than 2 tens.', 'So 34 > 29.'] }
            ],
            vocabulary: [
              { word: 'greater', meaning: 'More than another number.', example: '34 is greater than 29.' },
              { word: 'less', meaning: 'Fewer than another number.', example: '29 is less than 34.' },
              { word: 'equal', meaning: 'Exactly the same value.', example: '30 add 4 is equal to 34.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Which symbol fits? 34 __ 29', options: ['<', '>', '='], answer: 1, why: '34 has 3 tens and 29 has 2 tens, so 34 is greater.' },
              { type: 'multiple_choice', question: 'Which number is the greatest?', options: ['71', '67', '70'], answer: 0, why: 'All have 7 tens. 71 has the most ones, so it is greatest.' },
              { type: 'multiple_choice', question: 'Which comparison is true?', options: ['45 < 54', '45 > 54', '45 = 54'], answer: 0, why: '45 has 4 tens and 54 has 5 tens, so 45 is less.' }
            ]
          }]
        }, {
          id: 'm2',
          order: 2,
          title: 'Addition and Subtraction',
          description: 'Add and subtract within 20, then use both in simple word problems.',
          lessons: [{
            id: 'primary-maths-m2-l1',
            order: 1,
            title: 'Adding within 20',
            objective: 'I can add numbers within 20 by making 10 first.',
            minutes: 7,
            recap: 'You added within 20 by making 10 first.',
            blocks: [
              { type: 'text', body: 'Adding joins two amounts to make a total.' },
              { type: 'text', body: 'Making 10 first can help. Fill a number to 10, then add the rest.' },
              { type: 'tip', body: '10 is easy to add to because the tens digit stays the same.' },
              {
                type: 'illustration',
                alt: 'A large plus sign.',
                image: 'assets/3d/plus-3d.png',
                placeholder: 'Plus sign: adding joins two amounts into one total.'
              },
              { type: 'example', steps: ['Add 8 and 5.', '8 needs 2 more to make 10.', 'Take 2 from 5, leaving 3.', '10 and 3 make 13.'] }
            ],
            vocabulary: [
              { word: 'add', meaning: 'Join amounts to find a total.', example: '8 add 5 makes 13.' },
              { word: 'total', meaning: 'The answer when you add.', example: 'The total of 8 and 5 is 13.' },
              { word: 'make ten', meaning: 'Fill a number up to 10 first.', example: '8 needs 2 to make ten.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'What is 7 + 6?', options: ['12', '13', '14'], answer: 1, why: '7 needs 3 to make 10. Then 3 are left, so 13.' },
              { type: 'multiple_choice', question: 'What is 9 + 4?', options: ['12', '13', '14'], answer: 1, why: '9 needs 1 to make 10. Then 3 are left, so 13.' },
              { type: 'multiple_choice', question: 'What is 6 + 6?', options: ['11', '12', '13'], answer: 1, why: '6 needs 4 to make 10. Then 2 are left, so 12.' }
            ]
          }, {
            id: 'primary-maths-m2-l2',
            order: 2,
            title: 'Subtracting within 20',
            objective: 'I can subtract within 20 by counting back.',
            minutes: 7,
            recap: 'You subtracted within 20 by counting back in steps.',
            blocks: [
              { type: 'text', body: 'Subtracting means taking away. The answer is what is left.' },
              { type: 'text', body: 'Counting back works well for small amounts.' },
              { type: 'tip', body: 'Count back to 10 first, then count back the rest.' },
              {
                type: 'illustration',
                alt: 'A large minus sign.',
                image: 'assets/3d/minus-3d.png',
                placeholder: 'Minus sign: subtracting takes an amount away.'
              },
              { type: 'example', steps: ['Subtract 7 from 15.', 'Count back 5 to reach 10.', 'Count back 2 more to reach 8.', 'So 15 subtract 7 is 8.'] }
            ],
            vocabulary: [
              { word: 'subtract', meaning: 'Take one amount away from another.', example: '15 subtract 7 is 8.' },
              { word: 'difference', meaning: 'The answer when you subtract.', example: 'The difference is 8.' },
              { word: 'count back', meaning: 'Say smaller numbers to subtract.', example: 'Count back 3 from 12 to reach 9.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'What is 15 - 7?', options: ['7', '8', '9'], answer: 1, why: 'Count back 5 to 10, then 2 more to 8.' },
              { type: 'multiple_choice', question: 'What is 12 - 5?', options: ['6', '7', '8'], answer: 1, why: 'Count back 2 to 10, then 3 more to 7.' },
              { type: 'multiple_choice', question: 'What is 18 - 9?', options: ['8', '9', '10'], answer: 1, why: 'Count back 8 to 10, then 1 more to 9.' }
            ]
          }, {
            id: 'primary-maths-m2-l3',
            order: 3,
            title: 'Simple Word Problems',
            objective: 'I can choose adding or subtracting to solve a word problem.',
            minutes: 8,
            recap: 'You chose adding or subtracting to solve word problems.',
            blocks: [
              { type: 'text', body: 'A word problem tells a short story with numbers. Read it twice.' },
              { type: 'text', body: 'Are amounts being joined, or is something being taken away?' },
              { type: 'text', body: 'Joining means add. Taking away means subtract.' },
              { type: 'tip', body: 'Words like altogether mean add. Words like left mean subtract.' },
              {
                type: 'illustration',
                alt: 'A shiny red apple.',
                image: 'assets/3d/red-apple-3d.png',
                placeholder: 'One red apple from a counting story.'
              },
              { type: 'example', steps: ['Sam has 9 apples and gives 4 away.', 'Giving away means subtract.', '9 subtract 4 is 5.', 'Sam has 5 apples left.'] }
            ],
            vocabulary: [
              { word: 'word problem', meaning: 'A maths question told as a story.', example: 'The apple story is a word problem.' },
              { word: 'altogether', meaning: 'The total when amounts are joined.', example: '6 and 8 altogether make 14.' },
              { word: 'left', meaning: 'What remains after taking away.', example: 'After 4 go, 5 are left.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'There are 9 birds. 4 fly away. How many are left?', options: ['4', '5', '13'], answer: 1, why: 'Flying away means subtract. 9 subtract 4 is 5.' },
              { type: 'multiple_choice', question: 'Aisha has 6 stickers and gets 8 more. How many altogether?', options: ['13', '14', '15'], answer: 1, why: 'Getting more means add. 6 add 8 is 14.' },
              { type: 'multiple_choice', question: 'Leo has 13 cards and gives 5 away. How many are left?', options: ['7', '8', '18'], answer: 1, why: 'Giving away means subtract. 13 subtract 5 is 8.' }
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

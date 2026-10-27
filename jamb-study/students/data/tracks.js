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
          }, {
            id: 'lower-secondary-maths-m1-l2',
            order: 2,
            title: 'Order of Operations',
            objective: 'I can evaluate expressions using the order of operations.',
            minutes: 8,
            recap: 'You used brackets, then multiplication and division, then addition and subtraction.',
            blocks: [
              { type: 'text', body: 'Some expressions have more than one operation. The order changes the answer.' },
              { type: 'text', body: 'Work through brackets first. Then do multiplication and division, left to right.' },
              { type: 'text', body: 'Finally, do addition and subtraction, also left to right.' },
              { type: 'tip', body: 'Brackets group a calculation so you do it before anything else.' },
              {
                type: 'illustration',
                alt: 'A model of a human brain.',
                image: 'assets/3d/brain-3d.png',
                placeholder: 'Order of operations ladder: brackets, multiply and divide, add and subtract.'
              },
              { type: 'example', steps: ['Work out 2 + 3 × 4.', 'Multiplication comes first: 3 × 4 = 12.', 'Then add 2: 2 + 12 = 14.'] }
            ],
            vocabulary: [
              { word: 'operation', meaning: 'A process such as add, subtract, multiply, or divide.', example: 'Multiplication is an operation.' },
              { word: 'brackets', meaning: 'Symbols that group part of an expression.', example: 'In (2 + 3) × 4, add first.' },
              { word: 'evaluate', meaning: 'Work out the value of an expression.', example: 'Evaluate 2 + 3 × 4 to get 14.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'What is 2 + 3 × 4?', options: ['14', '20', '24'], answer: 0, why: 'Multiply first: 3 × 4 = 12. Then add 2 to get 14.' },
              { type: 'multiple_choice', question: 'What is (2 + 3) × 4?', options: ['14', '20', '24'], answer: 1, why: 'Brackets first: 2 + 3 = 5. Then 5 × 4 = 20.' },
              { type: 'multiple_choice', question: 'What is 12 ÷ 3 + 2?', options: ['6', '8', '18'], answer: 0, why: 'Divide first: 12 ÷ 3 = 4. Then add 2 to get 6.' }
            ]
          }, {
            id: 'lower-secondary-maths-m1-l3',
            order: 3,
            title: 'Factors, Multiples, and Primes',
            objective: 'I can identify factors, multiples, and prime numbers.',
            minutes: 8,
            recap: 'You found factors and multiples and recognised prime numbers.',
            blocks: [
              { type: 'text', body: 'A factor divides a number exactly, with no remainder.' },
              { type: 'text', body: 'A multiple is what you get when you multiply a number by a whole number.' },
              { type: 'text', body: 'A prime number has exactly two factors: 1 and itself.' },
              { type: 'tip', body: '1 is not prime because it has only one factor.' },
              {
                type: 'illustration',
                alt: 'A stack of bricks, like the building blocks of a number.',
                image: 'assets/3d/brick-3d.png',
                placeholder: 'Factor pairs for 12: 1×12, 2×6, 3×4.'
              },
              { type: 'example', steps: ['List the factors of 18.', '1 × 18, 2 × 9, and 3 × 6 work.', 'The factors are 1, 2, 3, 6, 9, and 18.'] }
            ],
            vocabulary: [
              { word: 'factor', meaning: 'A number that divides another exactly.', example: '6 is a factor of 18.' },
              { word: 'multiple', meaning: 'The result of multiplying by a whole number.', example: '20 is a multiple of 5.' },
              { word: 'prime', meaning: 'A number with exactly two factors.', example: '11 is prime.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Which number is a factor of 18?', options: ['4', '6', '8'], answer: 1, why: '18 ÷ 6 = 3 exactly, so 6 is a factor.' },
              { type: 'multiple_choice', question: 'Which number is a multiple of 5?', options: ['12', '20', '24'], answer: 1, why: '5 × 4 = 20, so 20 is a multiple of 5.' },
              { type: 'multiple_choice', question: 'Which number is prime?', options: ['9', '11', '15'], answer: 1, why: '11 has only two factors: 1 and 11.' }
            ]
          }]
        }, {
          id: 'm2',
          order: 2,
          title: 'Algebra Foundations',
          description: 'Write and use expressions, substitute values, and solve one-step equations.',
          lessons: [{
            id: 'lower-secondary-maths-m2-l1',
            order: 1,
            title: 'Writing Expressions',
            objective: 'I can write a simple algebraic expression from words.',
            minutes: 8,
            recap: 'You turned words into expressions using a letter for the unknown.',
            blocks: [
              { type: 'text', body: 'Algebra uses letters to stand for numbers we do not know yet.' },
              { type: 'text', body: 'A letter next to a number means multiply. 3y means 3 times y.' },
              { type: 'text', body: 'Addition and subtraction keep their signs. 4 more than x is x + 4.' },
              { type: 'tip', body: 'Write the letter after the number, so 3y rather than y3.' },
              {
                type: 'illustration',
                alt: 'A keypad showing the letters A, B, C, and D.',
                image: 'assets/3d/input-latin-letters-3d.png',
                placeholder: 'Bar diagram: an unknown bar x plus a bar of 4.'
              },
              { type: 'example', steps: ['Write an expression for 5 more than n.', 'More than means add.', 'Start with n and add 5.', 'The expression is n + 5.'] }
            ],
            vocabulary: [
              { word: 'expression', meaning: 'A maths phrase with numbers, letters, and operations.', example: '3y is an expression.' },
              { word: 'variable', meaning: 'A letter that stands for an unknown number.', example: 'In 2x + 1, x is a variable.' },
              { word: 'term', meaning: 'A part of an expression separated by plus or minus.', example: '2x and 1 are terms.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Which expression means 4 more than x?', options: ['x + 4', '4x', 'x - 4'], answer: 0, why: 'More than means add, so the expression is x + 4.' },
              { type: 'multiple_choice', question: 'Which expression means 3 times y?', options: ['y + 3', '3y', 'y - 3'], answer: 1, why: '3 times y is written as 3y.' },
              { type: 'multiple_choice', question: 'Which expression means 2 less than m?', options: ['m + 2', '2m', 'm - 2'], answer: 2, why: 'Less than means subtract, so the expression is m - 2.' }
            ]
          }, {
            id: 'lower-secondary-maths-m2-l2',
            order: 2,
            title: 'Substitution',
            objective: 'I can substitute a value into an expression and evaluate it.',
            minutes: 8,
            recap: 'You replaced letters with values and worked out the expression.',
            blocks: [
              { type: 'text', body: 'Substitution means replacing a letter with a number.' },
              { type: 'text', body: 'Put the number in place of the letter, then use the order of operations.' },
              { type: 'text', body: 'If a letter appears twice, use the same value both times.' },
              { type: 'tip', body: 'Use brackets when substituting a negative number to avoid sign errors.' },
              {
                type: 'illustration',
                alt: 'A puzzle piece: one value slots in for a letter.',
                image: 'assets/3d/puzzle-piece-3d.png',
                placeholder: 'Expression 4y with a value card showing y = 3.'
              },
              { type: 'example', steps: ['Evaluate 2n + 1 when n = 6.', 'Replace n with 6: 2 × 6 + 1.', 'Multiply first: 12 + 1.', 'The value is 13.'] }
            ],
            vocabulary: [
              { word: 'substitute', meaning: 'Replace a letter with a number.', example: 'Substitute 5 for x.' },
              { word: 'evaluate', meaning: 'Work out the value.', example: 'Evaluate the expression to get 12.' },
              { word: 'value', meaning: 'The number a letter stands for.', example: 'The value of y is 3.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'If x = 5, what is x + 7?', options: ['10', '12', '57'], answer: 1, why: 'Replace x with 5, then 5 + 7 = 12.' },
              { type: 'multiple_choice', question: 'If y = 3, what is 4y?', options: ['7', '12', '43'], answer: 1, why: '4y means 4 × y. With y = 3, that is 12.' },
              { type: 'multiple_choice', question: 'If n = 6, what is 2n + 1?', options: ['12', '13', '14'], answer: 1, why: '2 × 6 = 12, then add 1 to get 13.' }
            ]
          }, {
            id: 'lower-secondary-maths-m2-l3',
            order: 3,
            title: 'Solving One-Step Equations',
            objective: 'I can solve a one-step equation by doing the inverse operation.',
            minutes: 8,
            recap: 'You solved one-step equations using the inverse operation.',
            blocks: [
              { type: 'text', body: 'An equation says two sides are equal. The letter is the unknown.' },
              { type: 'text', body: 'To keep both sides equal, do the same thing to both sides.' },
              { type: 'text', body: 'Undo addition with subtraction. Undo multiplication with division.' },
              { type: 'tip', body: 'Check your answer by substituting it back into the equation.' },
              {
                type: 'illustration',
                alt: 'A balance scale with two equal pans.',
                image: 'assets/3d/balance-scale-3d.png',
                placeholder: 'Balance scale: x + 5 balances 12.'
              },
              { type: 'example', steps: ['Solve x + 5 = 12.', 'Subtract 5 from both sides.', 'x = 12 - 5.', 'So x = 7. Check: 7 + 5 = 12.'] }
            ],
            vocabulary: [
              { word: 'equation', meaning: 'A statement that two expressions are equal.', example: 'x + 5 = 12 is an equation.' },
              { word: 'inverse', meaning: 'The operation that undoes another.', example: 'Subtraction is the inverse of addition.' },
              { word: 'solve', meaning: 'Find the value that makes an equation true.', example: 'Solve x + 5 = 12 to get 7.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Solve x + 5 = 12.', options: ['6', '7', '17'], answer: 1, why: 'Subtract 5 from both sides: x = 7.' },
              { type: 'multiple_choice', question: 'Solve 3x = 15.', options: ['4', '5', '12'], answer: 1, why: 'Divide both sides by 3: x = 5.' },
              { type: 'multiple_choice', question: 'Solve x - 4 = 9.', options: ['5', '13', '36'], answer: 1, why: 'Add 4 to both sides: x = 13.' }
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
          }, {
            id: 'upper-secondary-maths-m1-l2',
            order: 2,
            title: 'Percentage Change',
            objective: 'I can calculate percentage change and apply a percentage increase or decrease.',
            minutes: 9,
            recap: 'You calculated percentage change and applied increases and decreases.',
            blocks: [
              { type: 'text', body: 'Percentage change compares the size of a change with the original amount.' },
              { type: 'text', body: 'Subtract the original value from the new value, divide by the original, then multiply by 100.' },
              { type: 'text', body: 'For an increase, add the change. For a decrease, subtract it.' },
              { type: 'text', body: 'A multiplier does the same job in one step. An increase of 10% uses 1.1.' },
              { type: 'tip', body: 'Always divide by the original value, not the new one.' },
              {
                type: 'illustration',
                alt: 'Two bars: an original amount of 20 and a taller new amount of 25, with the change labelled 5.',
                image: 'assets/3d/chart-increasing-3d.png',
                placeholder: 'Bar chart: original 20, new 25, change 5.'
              },
              { type: 'example', steps: ['A price rises from 20 to 25.', 'The change is 25 - 20 = 5.', 'Divide by 20: 5 ÷ 20 = 0.25.', 'Multiply by 100 to get 25%.'] }
            ],
            vocabulary: [
              { word: 'percentage change', meaning: 'The change written as a percentage of the original.', example: 'The change from 20 to 25 is 25%.' },
              { word: 'original', meaning: 'The starting amount before a change.', example: 'The original price was 20.' },
              { word: 'multiplier', meaning: 'A number that scales an amount in one step.', example: 'For a 10% increase, use 1.1.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'A price rises from 20 to 25. What is the percentage increase?', options: ['5%', '20%', '25%'], answer: 2, why: 'The change is 5. Then 5 ÷ 20 × 100 = 25%.' },
              { type: 'multiple_choice', question: 'A price falls from 80 to 60. What is the percentage decrease?', options: ['20%', '25%', '33%'], answer: 1, why: 'The change is 20. Then 20 ÷ 80 × 100 = 25%.' },
              { type: 'multiple_choice', question: 'Increase 50 by 10%. What is the new amount?', options: ['55', '60', '65'], answer: 0, why: '10% of 50 is 5, and 50 + 5 = 55.' }
            ]
          }, {
            id: 'upper-secondary-maths-m1-l3',
            order: 3,
            title: 'Ratio and Proportion',
            objective: 'I can share an amount in a given ratio.',
            minutes: 9,
            recap: 'You shared amounts in a ratio by finding the value of one part.',
            blocks: [
              { type: 'text', body: 'A ratio compares parts of a whole. The ratio 1:3 means one part to three parts.' },
              { type: 'text', body: 'Add the parts to find the total number of equal parts.' },
              { type: 'text', body: 'Divide the amount by the total parts to find the value of one part.' },
              { type: 'text', body: 'Multiply the value of one part by each ratio number.' },
              { type: 'tip', body: 'Check that the shared amounts add back to the original total.' },
              {
                type: 'illustration',
                alt: 'A bar split into four equal parts, labelled one part and three parts.',
                image: 'assets/3d/chocolate-bar-3d.png',
                placeholder: 'Bar split into four equal parts: 1 part and 3 parts.'
              },
              { type: 'example', steps: ['Share 40 in the ratio 1:3.', 'There are 4 parts in total.', 'One part is 40 ÷ 4 = 10.', 'The shares are 10 and 30.'] }
            ],
            vocabulary: [
              { word: 'ratio', meaning: 'A comparison of two or more amounts.', example: 'The ratio 1:3 has two parts.' },
              { word: 'proportion', meaning: 'A share of a whole in a given ratio.', example: 'Her proportion is 1 part in 4.' },
              { word: 'share', meaning: 'One part of a divided amount.', example: 'The larger share is 30.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Share 40 in the ratio 1:3. What is the larger share?', options: ['10', '30', '39'], answer: 1, why: 'There are 4 parts, so one part is 10. Three parts are 30.' },
              { type: 'multiple_choice', question: 'Share 24 in the ratio 2:1. What is the smaller share?', options: ['8', '12', '16'], answer: 0, why: 'There are 3 parts, so one part is 8. The smaller share is 8.' },
              { type: 'multiple_choice', question: 'Share 50 in the ratio 2:3. What is the smaller share?', options: ['20', '25', '30'], answer: 0, why: 'There are 5 parts, so one part is 10. Two parts are 20.' }
            ]
          }]
        }, {
          id: 'm2',
          order: 2,
          title: 'Algebra',
          description: 'Simplify expressions, solve linear equations, and rearrange formulae.',
          lessons: [{
            id: 'upper-secondary-maths-m2-l1',
            order: 1,
            title: 'Simplifying Expressions',
            objective: 'I can simplify algebraic expressions by collecting like terms.',
            minutes: 8,
            recap: 'You simplified expressions by collecting like terms.',
            blocks: [
              { type: 'text', body: 'Like terms have the same letter, raised to the same power.' },
              { type: 'text', body: 'Collect like terms by adding or subtracting their numbers, called coefficients.' },
              { type: 'text', body: 'Keep the letter the same. 4a and 3a combine to make 7a.' },
              { type: 'text', body: 'A number on its own is a constant term. It only combines with other constants.' },
              { type: 'tip', body: 'Take the sign in front of a term with that term when you move it.' },
              {
                type: 'illustration',
                alt: 'Three a tiles and four a tiles grouped together to make seven a tiles.',
                image: 'assets/3d/coin-3d.png',
                placeholder: 'Tile diagram: 4a plus 3a grouped into 7a.'
              },
              { type: 'example', steps: ['Simplify 5x + 2 - 3x.', '5x - 3x = 2x.', 'The constant is 2.', 'The simplified expression is 2x + 2.'] }
            ],
            vocabulary: [
              { word: 'like terms', meaning: 'Terms with the same letter and power.', example: '4a and 3a are like terms.' },
              { word: 'coefficient', meaning: 'The number in front of a letter.', example: 'In 5x, the coefficient is 5.' },
              { word: 'constant', meaning: 'A term with no letter.', example: 'In 2x + 3, the constant is 3.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Simplify 4a + 3a.', options: ['7a', '7', '12a'], answer: 0, why: '4a and 3a are like terms, so they add to 7a.' },
              { type: 'multiple_choice', question: 'Simplify 5x + 2 - 3x.', options: ['2x + 2', '2x - 2', '8x + 2'], answer: 0, why: '5x - 3x = 2x. The constant 2 stays, giving 2x + 2.' },
              { type: 'multiple_choice', question: 'Simplify 2y + 3 + 4y + 1.', options: ['6y + 4', '6y + 3', '7y + 4'], answer: 0, why: '2y + 4y = 6y and 3 + 1 = 4, so 6y + 4.' }
            ]
          }, {
            id: 'upper-secondary-maths-m2-l2',
            order: 2,
            title: 'Solving Linear Equations',
            objective: 'I can solve a two-step linear equation.',
            minutes: 9,
            recap: 'You solved two-step equations by undoing operations in reverse order.',
            blocks: [
              { type: 'text', body: 'A linear equation has a letter with no power higher than one.' },
              { type: 'text', body: 'Undo the operations in reverse order: deal with addition or subtraction first.' },
              { type: 'text', body: 'Then divide by the coefficient to leave the letter on its own.' },
              { type: 'text', body: 'Whatever you do to one side, do to the other side as well.' },
              { type: 'tip', body: 'Substitute your answer back in to check both sides are equal.' },
              {
                type: 'illustration',
                alt: 'A balance scale with 2x + 5 on one side and 13 on the other.',
                image: 'assets/3d/balance-scale-3d.png',
                placeholder: 'Balance scale: 2x + 5 balances 13.'
              },
              { type: 'example', steps: ['Solve 2x + 5 = 13.', 'Subtract 5: 2x = 8.', 'Divide by 2: x = 4.'] }
            ],
            vocabulary: [
              { word: 'linear', meaning: 'A straight-line relationship where the letter has power one.', example: '2x + 5 = 13 is linear.' },
              { word: 'coefficient', meaning: 'The number multiplying the letter.', example: 'In 2x, the coefficient is 2.' },
              { word: 'solution', meaning: 'The value that makes the equation true.', example: 'The solution is x = 4.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Solve 2x + 5 = 13.', options: ['3', '4', '9'], answer: 1, why: 'Subtract 5 to get 2x = 8, then divide by 2. x = 4.' },
              { type: 'multiple_choice', question: 'Solve 3x - 4 = 11.', options: ['3', '5', '7'], answer: 1, why: 'Add 4 to get 3x = 15, then divide by 3. x = 5.' },
              { type: 'multiple_choice', question: 'Solve 4x + 2 = 18.', options: ['4', '5', '6'], answer: 0, why: 'Subtract 2 to get 4x = 16, then divide by 4. x = 4.' }
            ]
          }, {
            id: 'upper-secondary-maths-m2-l3',
            order: 3,
            title: 'Rearranging Formulae',
            objective: 'I can rearrange a formula to make a different letter the subject.',
            minutes: 9,
            recap: 'You rearranged formulae by undoing operations in reverse order.',
            blocks: [
              { type: 'text', body: 'The subject of a formula is the letter on its own, usually on the left.' },
              { type: 'text', body: 'Rearranging means changing the formula without changing its meaning.' },
              { type: 'text', body: 'Undo operations in reverse order, doing the same to both sides.' },
              { type: 'text', body: 'For y = 2x + 1, subtract 1 first, then divide by 2.' },
              { type: 'tip', body: 'Keep the letter you want on one side and move everything else away.' },
              {
                type: 'illustration',
                alt: 'A flow diagram from x to 2x to 2x + 1, reversing to y minus 1 divided by 2.',
                image: 'assets/3d/counterclockwise-arrows-button-3d.png',
                placeholder: 'Flow diagram: y = 2x + 1, reversed to x = (y - 1) ÷ 2.'
              },
              { type: 'example', steps: ['Make x the subject of y = 4x.', 'Divide both sides by 4.', 'x = y ÷ 4.'] }
            ],
            vocabulary: [
              { word: 'subject', meaning: 'The letter that appears alone in a formula.', example: 'In y = 4x, y is the subject.' },
              { word: 'formula', meaning: 'A rule written with letters and numbers.', example: 'y = 2x + 1 is a formula.' },
              { word: 'rearrange', meaning: 'Change the form of a formula.', example: 'Rearrange y = 4x to get x = y ÷ 4.' }
            ],
            quiz: [
              { type: 'multiple_choice', question: 'Make x the subject of y = x + 5.', options: ['x = y + 5', 'x = y - 5', 'x = 5 - y'], answer: 1, why: 'Subtract 5 from both sides to get x = y - 5.' },
              { type: 'multiple_choice', question: 'Make x the subject of y = 4x.', options: ['x = 4y', 'x = y ÷ 4', 'x = y - 4'], answer: 1, why: 'Divide both sides by 4 to get x = y ÷ 4.' },
              { type: 'multiple_choice', question: 'Make x the subject of y = 2x + 1.', options: ['x = (y - 1) ÷ 2', 'x = (y + 1) ÷ 2', 'x = 2y - 1'], answer: 0, why: 'Subtract 1, then divide by 2, giving x = (y - 1) ÷ 2.' }
            ]
          }]
        }]
      }]
    }
  ]
};

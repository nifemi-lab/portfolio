/* Primary French — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'french');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Bonjour!',
    description: 'Greetings, numbers, and colours in French. Draft content.',
    lessons: [{
      id: 'primary-french-m1-l1',
      order: 1,
      title: 'Greetings',
      objective: 'I can greet someone and say goodbye in French.',
      minutes: 7,
      recap: 'You greeted someone and said goodbye in French.',
      blocks: [
        { type: 'text', body: 'Bonjour means hello or good day.' },
        { type: 'text', body: 'Salut is a friendly hello.' },
        { type: 'text', body: 'Au revoir means goodbye.' },
        { type: 'tip', body: 'Say bonjour when you enter a room.' },
        {
          type: 'illustration',
          alt: 'A white speech balloon with a blue outline.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: bonjour and au revoir.'
        },
        { type: 'example', steps: ['Say bonjour to a friend.', 'Ask ça va?', 'Answer ça va bien.', 'Say au revoir.'] }
      ],
      vocabulary: [
        { word: 'bonjour', meaning: 'Hello or good day.', example: 'Bonjour, madame.' },
        { word: 'salut', meaning: 'A friendly hello.', example: 'Salut, mon ami.' },
        { word: 'au revoir', meaning: 'Goodbye.', example: 'Au revoir et à bientôt.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does bonjour mean?', options: ['Hello', 'Goodbye', 'Thank you'], answer: 0, why: 'Bonjour greets someone politely.' },
        { type: 'multiple_choice', question: 'Which word means goodbye?', options: ['Au revoir', 'Bonjour', 'Salut'], answer: 0, why: 'Au revoir is used when leaving.' },
        { type: 'multiple_choice', question: 'What does ça va? mean?', options: ['How are you?', 'What is this?', 'Where are you?'], answer: 0, why: 'Ça va asks how someone is.' }
      ]
    }, {
      id: 'primary-french-m1-l2',
      order: 2,
      title: 'Numbers',
      objective: 'I can count from one to ten in French.',
      minutes: 7,
      recap: 'You counted from one to ten in French.',
      blocks: [
        { type: 'text', body: 'The French words un to dix mean one to ten.' },
        { type: 'text', body: 'Un, deux, trois are the first three numbers.' },
        { type: 'text', body: 'Numbers help you say your age and count things.' },
        { type: 'tip', body: 'Count aloud slowly to keep the order.' },
        {
          type: 'illustration',
          alt: 'A keypad with number keys one to nine.',
          image: 'assets/3d/input-numbers-3d.png',
          placeholder: 'Numbers: un to dix.'
        },
        { type: 'example', steps: ['Count un, deux, trois.', 'Continue to dix.', 'Point at each number.', 'Say your age in French.'] }
      ],
      vocabulary: [
        { word: 'un', meaning: 'The number one.', example: 'Un chat.' },
        { word: 'cinq', meaning: 'The number five.', example: 'Cinq doigts.' },
        { word: 'dix', meaning: 'The number ten.', example: 'Dix ans.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does trois mean?', options: ['Three', 'Two', 'Ten'], answer: 0, why: 'Trois is the number three.' },
        { type: 'multiple_choice', question: 'Which number is cinq?', options: ['Five', 'Nine', 'One'], answer: 0, why: 'Cinq is the number five.' },
        { type: 'multiple_choice', question: 'What is ten in French?', options: ['Dix', 'Deux', 'Un'], answer: 0, why: 'Dix means ten.' }
      ]
    }, {
      id: 'primary-french-m1-l3',
      order: 3,
      title: 'Colours',
      objective: 'I can name the main colours in French.',
      minutes: 7,
      recap: 'You named the main colours in French.',
      blocks: [
        { type: 'text', body: 'Rouge is red, bleu is blue, and jaune is yellow.' },
        { type: 'text', body: 'Vert is green and noir is black.' },
        { type: 'text', body: 'Colour words describe a noun, so their order matters.' },
        { type: 'tip', body: 'Name the colour of something nearby.' },
        {
          type: 'illustration',
          alt: 'A wooden palette with dabs of coloured paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: rouge, bleu, and jaune.'
        },
        { type: 'example', steps: ['Point to a red book.', 'Say rouge.', 'Point to something blue.', 'Say bleu.'] }
      ],
      vocabulary: [
        { word: 'rouge', meaning: 'The colour red.', example: 'Une pomme rouge.' },
        { word: 'bleu', meaning: 'The colour blue.', example: 'Le ciel est bleu.' },
        { word: 'jaune', meaning: 'The colour yellow.', example: 'Le soleil est jaune.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What colour is rouge?', options: ['Red', 'Green', 'Black'], answer: 0, why: 'Rouge means red.' },
        { type: 'multiple_choice', question: 'What colour is bleu?', options: ['Blue', 'Yellow', 'White'], answer: 0, why: 'Bleu means blue.' },
        { type: 'multiple_choice', question: 'Which word means yellow?', options: ['Jaune', 'Noir', 'Vert'], answer: 0, why: 'Jaune is the colour yellow.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'At School',
    description: 'School words, days, and family in French. Draft content.',
    lessons: [{
      id: 'primary-french-m2-l1',
      order: 1,
      title: 'Classroom Objects',
      objective: 'I can name common classroom objects in French.',
      minutes: 7,
      recap: 'You named common classroom objects in French.',
      blocks: [
        { type: 'text', body: 'Un stylo is a pen and un livre is a book.' },
        { type: 'text', body: 'Une règle is a ruler and un sac is a bag.' },
        { type: 'text', body: 'Le and la mean the, and they match the word’s gender.' },
        { type: 'tip', body: 'Point at each object as you name it.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil with a sharp tip.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: un crayon in the classroom.'
        },
        { type: 'example', steps: ['Hold up a pen.', 'Say un stylo.', 'Hold up a book.', 'Say un livre.'] }
      ],
      vocabulary: [
        { word: 'stylo', meaning: 'A pen.', example: 'Voici un stylo bleu.' },
        { word: 'livre', meaning: 'A book.', example: 'Le livre est ouvert.' },
        { word: 'règle', meaning: 'A ruler.', example: 'Une règle de trente centimètres.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is un stylo?', options: ['A pen', 'A chair', 'A door'], answer: 0, why: 'Un stylo is a pen.' },
        { type: 'multiple_choice', question: 'What is un livre?', options: ['A book', 'A bag', 'A ruler'], answer: 0, why: 'Un livre is a book.' },
        { type: 'multiple_choice', question: 'What is une règle?', options: ['A ruler', 'A pen', 'A desk'], answer: 0, why: 'Une règle is a ruler.' }
      ]
    }, {
      id: 'primary-french-m2-l2',
      order: 2,
      title: 'Days of the Week',
      objective: 'I can say the days of the week in French.',
      minutes: 7,
      recap: 'You said the days of the week in French.',
      blocks: [
        { type: 'text', body: 'The week starts on lundi, which means Monday.' },
        { type: 'text', body: 'Mardi, mercredi, jeudi, and vendredi follow.' },
        { type: 'text', body: 'Samedi and dimanche finish the week.' },
        { type: 'tip', body: 'Say the days in order each morning.' },
        {
          type: 'illustration',
          alt: 'A red bookmark with a gold tassel.',
          image: 'assets/3d/bookmark-3d.png',
          placeholder: 'Bookmark: days of the week.'
        },
        { type: 'example', steps: ['Say lundi.', 'Add mardi.', 'Continue to dimanche.', 'Repeat the full list.'] }
      ],
      vocabulary: [
        { word: 'lundi', meaning: 'Monday.', example: 'Lundi, je vais à l’école.' },
        { word: 'mercredi', meaning: 'Wednesday.', example: 'Mercredi, nous jouons.' },
        { word: 'dimanche', meaning: 'Sunday.', example: 'Dimanche, je me repose.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does lundi mean?', options: ['Monday', 'Sunday', 'Friday'], answer: 0, why: 'Lundi is Monday.' },
        { type: 'multiple_choice', question: 'Which day is mercredi?', options: ['Wednesday', 'Tuesday', 'Saturday'], answer: 0, why: 'Mercredi is Wednesday.' },
        { type: 'multiple_choice', question: 'What is the last day listed?', options: ['Dimanche', 'Jeudi', 'Mardi'], answer: 0, why: 'Dimanche comes at the week’s end.' }
      ]
    }, {
      id: 'primary-french-m2-l3',
      order: 3,
      title: 'Family',
      objective: 'I can name close family members in French.',
      minutes: 7,
      recap: 'You named close family members in French.',
      blocks: [
        { type: 'text', body: 'Mère means mother and père means father.' },
        { type: 'text', body: 'Frère is brother and sœur is sister.' },
        { type: 'text', body: 'Ma and mon mean my, and they match the word.' },
        { type: 'tip', body: 'Use a photo to practise family words.' },
        {
          type: 'illustration',
          alt: 'A glossy red heart shape.',
          image: 'assets/3d/red_heart-3d.png',
          placeholder: 'Heart: family words in French.'
        },
        { type: 'example', steps: ['Name your mère.', 'Name your père.', 'Name a frère or sœur.', 'Say ma famille.'] }
      ],
      vocabulary: [
        { word: 'mère', meaning: 'Mother.', example: 'Ma mère est gentille.' },
        { word: 'père', meaning: 'Father.', example: 'Mon père travaille.' },
        { word: 'sœur', meaning: 'Sister.', example: 'Ma sœur a huit ans.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does mère mean?', options: ['Mother', 'Father', 'Sister'], answer: 0, why: 'Mère means mother.' },
        { type: 'multiple_choice', question: 'What does frère mean?', options: ['Brother', 'Sister', 'Uncle'], answer: 0, why: 'Frère means brother.' },
        { type: 'multiple_choice', question: 'Which word means family?', options: ['Famille', 'Frère', 'Père'], answer: 0, why: 'Famille means family.' }
      ]
    }]
  }];
}());

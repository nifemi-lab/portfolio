/* Lower Secondary French — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'french');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Everyday French',
    description: 'Introductions, food, and shopping in French. Draft content.',
    lessons: [{
      id: 'lower-secondary-french-m1-l1',
      order: 1,
      title: 'Introductions',
      objective: 'I can introduce myself and ask someone’s name.',
      minutes: 8,
      recap: 'You introduced yourself and asked someone’s name.',
      blocks: [
        { type: 'text', body: 'Je m’appelle means my name is.' },
        { type: 'text', body: 'Comment tu t’appelles? asks a friend’s name.' },
        { type: 'text', body: 'J’ai douze ans means I am twelve years old.' },
        { type: 'tip', body: 'Practise the question and answer as a pair.' },
        {
          type: 'illustration',
          alt: 'A white speech balloon with a blue outline.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: je m’appelle and ça va.'
        },
        { type: 'example', steps: ['Say bonjour.', 'Say je m’appelle plus your name.', 'Ask comment tu t’appelles?', 'Answer with your age.'] }
      ],
      vocabulary: [
        { word: 'je m’appelle', meaning: 'My name is.', example: 'Je m’appelle Amara.' },
        { word: 'âge', meaning: 'Age.', example: 'Quel âge as-tu?' },
        { word: 'enchanté', meaning: 'Nice to meet you.', example: 'Enchanté, Luc.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does je m’appelle mean?', options: ['My name is', 'I am hungry', 'I live here'], answer: 0, why: 'It introduces your name.' },
        { type: 'multiple_choice', question: 'What does comment tu t’appelles? ask?', options: ['Someone’s name', 'The time', 'The price'], answer: 0, why: 'It asks what someone is called.' },
        { type: 'multiple_choice', question: 'What does j’ai douze ans mean?', options: ['I am twelve', 'I have twelve books', 'I am tired'], answer: 0, why: 'It states an age of twelve.' }
      ]
    }, {
      id: 'lower-secondary-french-m1-l2',
      order: 2,
      title: 'Food and Drink',
      objective: 'I can order simple food and drink in French.',
      minutes: 8,
      recap: 'You ordered simple food and drink in French.',
      blocks: [
        { type: 'text', body: 'Pain is bread, fromage is cheese, and eau is water.' },
        { type: 'text', body: 'Je voudrais means I would like and is polite.' },
        { type: 'text', body: 'Un and une mean a or an and match the noun.' },
        { type: 'tip', body: 'Say s’il vous plaît after your order.' },
        {
          type: 'illustration',
          alt: 'A golden croissant on a pale background.',
          image: 'assets/3d/croissant-3d.png',
          placeholder: 'Croissant: ordering food in French.'
        },
        { type: 'example', steps: ['Say je voudrais un pain.', 'Add s’il vous plaît.', 'Ask for de l’eau.', 'Say merci.'] }
      ],
      vocabulary: [
        { word: 'pain', meaning: 'Bread.', example: 'Je voudrais du pain.' },
        { word: 'fromage', meaning: 'Cheese.', example: 'Le fromage est bon.' },
        { word: 'eau', meaning: 'Water.', example: 'Un verre d’eau.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is pain?', options: ['Bread', 'Cheese', 'Water'], answer: 0, why: 'Pain means bread.' },
        { type: 'multiple_choice', question: 'What does je voudrais mean?', options: ['I would like', 'I dislike', 'I have paid'], answer: 0, why: 'It is a polite request.' },
        { type: 'multiple_choice', question: 'What is eau?', options: ['Water', 'Milk', 'Juice'], answer: 0, why: 'Eau means water.' }
      ]
    }, {
      id: 'lower-secondary-french-m1-l3',
      order: 3,
      title: 'Shopping',
      objective: 'I can ask the price and pay in French.',
      minutes: 8,
      recap: 'You asked the price and paid in French.',
      blocks: [
        { type: 'text', body: 'Combien ça coûte? means how much does it cost?' },
        { type: 'text', body: 'The answer uses euros, such as trois euros.' },
        { type: 'text', body: 'Je prends means I will take it.' },
        { type: 'tip', body: 'Listen for the number before the word euros.' },
        {
          type: 'illustration',
          alt: 'A gold coin with a raised edge.',
          image: 'assets/3d/coin-3d.png',
          placeholder: 'Coin: prices and paying in French.'
        },
        { type: 'example', steps: ['Ask combien ça coûte?', 'Listen for the price.', 'Say je prends.', 'Pay and say merci.'] }
      ],
      vocabulary: [
        { word: 'combien', meaning: 'How much.', example: 'Combien ça coûte?' },
        { word: 'coûter', meaning: 'To cost.', example: 'Le livre coûte cinq euros.' },
        { word: 'prendre', meaning: 'To take.', example: 'Je prends celui-ci.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does combien mean?', options: ['How much', 'Where', 'When'], answer: 0, why: 'Combien asks about quantity or price.' },
        { type: 'multiple_choice', question: 'What does coûter mean?', options: ['To cost', 'To cook', 'To count'], answer: 0, why: 'Coûter relates to price.' },
        { type: 'multiple_choice', question: 'What does je prends mean?', options: ['I will take it', 'I will leave', 'I will pay later'], answer: 0, why: 'It confirms a purchase.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'The Wider World',
    description: 'Directions, hobbies, and holidays in French. Draft content.',
    lessons: [{
      id: 'lower-secondary-french-m2-l1',
      order: 1,
      title: 'Directions',
      objective: 'I can ask for and follow simple directions.',
      minutes: 8,
      recap: 'You asked for and followed simple directions.',
      blocks: [
        { type: 'text', body: 'Où est la gare? means where is the station?' },
        { type: 'text', body: 'À gauche is left and à droite is right.' },
        { type: 'text', body: 'Tout droit means straight ahead.' },
        { type: 'tip', body: 'Repeat each direction aloud as you walk it.' },
        {
          type: 'illustration',
          alt: 'A folded world map with green and blue areas.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'Map: finding the way in French.'
        },
        { type: 'example', steps: ['Ask où est la gare?', 'Hear tout droit.', 'Turn à gauche.', 'Arrive at the station.'] }
      ],
      vocabulary: [
        { word: 'gauche', meaning: 'Left.', example: 'Tournez à gauche.' },
        { word: 'droite', meaning: 'Right.', example: 'La banque est à droite.' },
        { word: 'tout droit', meaning: 'Straight ahead.', example: 'Allez tout droit.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does à gauche mean?', options: ['To the left', 'To the right', 'Straight on'], answer: 0, why: 'Gauche means left.' },
        { type: 'multiple_choice', question: 'What does tout droit mean?', options: ['Straight ahead', 'Turn back', 'Stop here'], answer: 0, why: 'Tout droit means straight on.' },
        { type: 'multiple_choice', question: 'What is la gare?', options: ['The station', 'The shop', 'The park'], answer: 0, why: 'La gare is a train station.' }
      ]
    }, {
      id: 'lower-secondary-french-m2-l2',
      order: 2,
      title: 'Hobbies',
      objective: 'I can talk about hobbies using simple French verbs.',
      minutes: 8,
      recap: 'You talked about hobbies using simple French verbs.',
      blocks: [
        { type: 'text', body: 'J’aime means I like and je n’aime pas means I do not like.' },
        { type: 'text', body: 'Jouer au foot means to play football.' },
        { type: 'text', body: 'Lire and écouter mean to read and to listen.' },
        { type: 'tip', body: 'Use aimer plus a verb to share a hobby.' },
        {
          type: 'illustration',
          alt: 'A black and white football with pentagon patches.',
          image: 'assets/3d/soccer-ball-3d.png',
          placeholder: 'Football: sports and hobbies in French.'
        },
        { type: 'example', steps: ['Say j’aime jouer au foot.', 'Say j’aime lire.', 'Ask et toi?', 'Answer with your hobby.'] }
      ],
      vocabulary: [
        { word: 'aimer', meaning: 'To like or love.', example: 'J’aime la musique.' },
        { word: 'jouer', meaning: 'To play.', example: 'Nous jouons au tennis.' },
        { word: 'lire', meaning: 'To read.', example: 'J’aime lire le soir.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does j’aime mean?', options: ['I like', 'I hate', 'I need'], answer: 0, why: 'Aimer expresses liking.' },
        { type: 'multiple_choice', question: 'What does jouer mean?', options: ['To play', 'To work', 'To eat'], answer: 0, why: 'Jouer means to play.' },
        { type: 'multiple_choice', question: 'What does lire mean?', options: ['To read', 'To write', 'To run'], answer: 0, why: 'Lire means to read.' }
      ]
    }, {
      id: 'lower-secondary-french-m2-l3',
      order: 3,
      title: 'Holidays',
      objective: 'I can describe a simple holiday in French.',
      minutes: 8,
      recap: 'You described a simple holiday in French.',
      blocks: [
        { type: 'text', body: 'Les vacances means the holidays.' },
        { type: 'text', body: 'Je vais à la plage means I go to the beach.' },
        { type: 'text', body: 'En train and en avion mean by train and by plane.' },
        { type: 'tip', body: 'Add a place after je vais à.' },
        {
          type: 'illustration',
          alt: 'A blue suitcase with a brown handle.',
          image: 'assets/3d/luggage-3d.png',
          placeholder: 'Suitcase: holidays and travel in French.'
        },
        { type: 'example', steps: ['Say je vais en France.', 'Say en train.', 'Say je vais à la plage.', 'Describe one activity.'] }
      ],
      vocabulary: [
        { word: 'vacances', meaning: 'Holidays.', example: 'Les vacances commencent.' },
        { word: 'plage', meaning: 'Beach.', example: 'La plage est proche.' },
        { word: 'voyage', meaning: 'Journey or trip.', example: 'Bon voyage!' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does vacances mean?', options: ['Holidays', 'Homework', 'Weather'], answer: 0, why: 'Vacances means holidays.' },
        { type: 'multiple_choice', question: 'What is la plage?', options: ['The beach', 'The mountain', 'The city'], answer: 0, why: 'Plage means beach.' },
        { type: 'multiple_choice', question: 'What does en train mean?', options: ['By train', 'By car', 'On foot'], answer: 0, why: 'En train describes train travel.' }
      ]
    }]
  }];
}());

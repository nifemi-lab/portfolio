/* Upper Secondary French — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'french');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'French in Use',
    description: 'Describing people, routines, and travel in French. Draft content.',
    lessons: [{
      id: 'upper-secondary-french-m1-l1',
      order: 1,
      title: 'Describing People',
      objective: 'I can describe people using correct adjective agreement.',
      minutes: 9,
      recap: 'You described people using correct adjective agreement.',
      blocks: [
        { type: 'text', body: 'French adjectives usually agree with the noun they describe.' },
        { type: 'text', body: 'Add -e for feminine forms and -s for plurals, with exceptions.' },
        { type: 'text', body: 'Position varies: most adjectives follow the noun, but common short ones precede it.' },
        { type: 'tip', body: 'Check the noun’s gender before choosing the adjective.' },
        {
          type: 'illustration',
          alt: 'A white speech balloon with a blue outline.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: describing people in French.'
        },
        { type: 'example', steps: ['Choose a person.', 'Pick an adjective such as grand.', 'Match its ending to the noun.', 'Build a full sentence.'] }
      ],
      vocabulary: [
        { word: 'accord', meaning: 'Agreement between words.', example: 'L’accord de l’adjectif est important.' },
        { word: 'adjectif', meaning: 'A describing word.', example: 'Grand est un adjectif.' },
        { word: 'féminin', meaning: 'Feminine form.', example: 'Grande est la forme féminine.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do French adjectives usually do?', options: ['Agree with the noun', 'Stay unchanged', 'Become verbs'], answer: 0, why: 'Adjectives match gender and number.' },
        { type: 'multiple_choice', question: 'How do you form most feminine adjectives?', options: ['Add -e', 'Remove a letter', 'Add -ment'], answer: 0, why: 'Most add -e for the feminine.' },
        { type: 'multiple_choice', question: 'Where do most French adjectives go?', options: ['After the noun', 'Before the verb', 'At the end'], answer: 0, why: 'Most follow the noun they describe.' }
      ]
    }, {
      id: 'upper-secondary-french-m1-l2',
      order: 2,
      title: 'Daily Routine',
      objective: 'I can describe a daily routine using reflexive verbs.',
      minutes: 9,
      recap: 'You described a daily routine using reflexive verbs.',
      blocks: [
        { type: 'text', body: 'Reflexive verbs describe actions we do to ourselves, such as se lever.' },
        { type: 'text', body: 'Je me lève means I get up and elle se couche means she goes to bed.' },
        { type: 'text', body: 'Time phrases such as le matin and le soir set the order.' },
        { type: 'tip', body: 'Learn the reflexive pronoun with each verb form.' },
        {
          type: 'illustration',
          alt: 'Two blue arrows forming a circle.',
          image: 'assets/3d/counterclockwise-arrows-button-3d.png',
          placeholder: 'Cycle: a daily routine from morning to night.'
        },
        { type: 'example', steps: ['Say je me lève à sept heures.', 'Add je me lave.', 'Say je me couche à dix heures.', 'Link the routine in order.'] }
      ],
      vocabulary: [
        { word: 'se lever', meaning: 'To get up.', example: 'Je me lève tôt.' },
        { word: 'se coucher', meaning: 'To go to bed.', example: 'Elle se couche à neuf heures.' },
        { word: 'le matin', meaning: 'In the morning.', example: 'Le matin, je me lave.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a reflexive verb?', options: ['An action done to yourself', 'A past action only', 'A type of noun'], answer: 0, why: 'The subject acts on itself.' },
        { type: 'multiple_choice', question: 'What does je me lève mean?', options: ['I get up', 'I sit down', 'I leave'], answer: 0, why: 'Se lever means to get up.' },
        { type: 'multiple_choice', question: 'What does le soir mean?', options: ['In the evening', 'In the morning', 'At noon'], answer: 0, why: 'Le soir refers to evening.' }
      ]
    }, {
      id: 'upper-secondary-french-m1-l3',
      order: 3,
      title: 'Travel and Transport',
      objective: 'I can talk about travel plans using the near future.',
      minutes: 9,
      recap: 'You talked about travel plans using the near future.',
      blocks: [
        { type: 'text', body: 'The near future uses aller plus an infinitive.' },
        { type: 'text', body: 'Je vais prendre le train means I am going to take the train.' },
        { type: 'text', body: 'En and à link travel phrases to places and methods.' },
        { type: 'tip', body: 'Keep the infinitive unchanged after aller.' },
        {
          type: 'illustration',
          alt: 'A blue suitcase with a brown handle.',
          image: 'assets/3d/luggage-3d.png',
          placeholder: 'Suitcase: travel plans in French.'
        },
        { type: 'example', steps: ['Say je vais voyager.', 'Add en train.', 'Say je vais visiter Paris.', 'Ask et toi?'] }
      ],
      vocabulary: [
        { word: 'aller', meaning: 'To go.', example: 'Je vais à Paris.' },
        { word: 'billet', meaning: 'Ticket.', example: 'J’achète un billet.' },
        { word: 'gare', meaning: 'Station.', example: 'La gare est loin.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How is the near future formed?', options: ['Aller plus infinitive', 'Avoir plus noun', 'Être plus adverb'], answer: 0, why: 'Aller carries the future meaning.' },
        { type: 'multiple_choice', question: 'What does je vais prendre mean?', options: ['I am going to take', 'I took', 'I would take'], answer: 0, why: 'It expresses a near-future plan.' },
        { type: 'multiple_choice', question: 'What is un billet?', options: ['A ticket', 'A suitcase', 'A platform'], answer: 0, why: 'Un billet is a ticket.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Culture and Communication',
    description: 'Francophone culture, opinions, and future plans. Draft content.',
    lessons: [{
      id: 'upper-secondary-french-m2-l1',
      order: 1,
      title: 'French-Speaking World',
      objective: 'I can name places where French is spoken.',
      minutes: 9,
      recap: 'You named places where French is spoken.',
      blocks: [
        { type: 'text', body: 'French is spoken in France, Canada, Belgium, Switzerland, and many African countries.' },
        { type: 'text', body: 'La francophonie describes the global community of French speakers.' },
        { type: 'text', body: 'Varieties of French differ in accent, vocabulary, and slang.' },
        { type: 'tip', body: 'Link each country to one fact you find interesting.' },
        {
          type: 'illustration',
          alt: 'A folded world map with green and blue areas.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'Map: French spoken across the world.'
        },
        { type: 'example', steps: ['Name three French-speaking countries.', 'Say one fact about each.', 'Compare two varieties of French.', 'Explain what la francophonie means.'] }
      ],
      vocabulary: [
        { word: 'francophonie', meaning: 'The global French-speaking community.', example: 'La francophonie réunit beaucoup de pays.' },
        { word: 'langue', meaning: 'Language.', example: 'Le français est une langue.' },
        { word: 'pays', meaning: 'Country.', example: 'Ce pays parle français.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where is French spoken?', options: ['Many countries worldwide', 'Only France', 'Only Canada'], answer: 0, why: 'French has speakers across continents.' },
        { type: 'multiple_choice', question: 'What is la francophonie?', options: ['The French-speaking world', 'A French meal', 'A type of school'], answer: 0, why: 'It names the global community.' },
        { type: 'multiple_choice', question: 'How do varieties of French differ?', options: ['Accent and vocabulary', 'Alphabet only', 'Grammar only'], answer: 0, why: 'Speech and words vary by region.' }
      ]
    }, {
      id: 'upper-secondary-french-m2-l2',
      order: 2,
      title: 'Media and Opinions',
      objective: 'I can give an opinion with reasons in French.',
      minutes: 9,
      recap: 'You gave an opinion with reasons in French.',
      blocks: [
        { type: 'text', body: 'Je pense que means I think that and à mon avis means in my opinion.' },
        { type: 'text', body: 'Parce que introduces a reason for your view.' },
        { type: 'text', body: 'Cependant and pourtant contrast two ideas politely.' },
        { type: 'tip', body: 'Add parce que to turn an opinion into an argument.' },
        {
          type: 'illustration',
          alt: 'A white speech balloon with a blue outline.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: sharing opinions in French.'
        },
        { type: 'example', steps: ['State à mon avis.', 'Add your opinion.', 'Give a reason with parce que.', 'Contrast with cependant.'] }
      ],
      vocabulary: [
        { word: 'avis', meaning: 'Opinion.', example: 'À mon avis, c’est vrai.' },
        { word: 'cependant', meaning: 'However.', example: 'Cependant, je doute.' },
        { word: 'parce que', meaning: 'Because.', example: 'Je reste parce que je suis fatigué.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does à mon avis mean?', options: ['In my opinion', 'In my house', 'At my age'], answer: 0, why: 'It introduces a personal view.' },
        { type: 'multiple_choice', question: 'Which word gives a reason?', options: ['Parce que', 'Cependant', 'Pourtant'], answer: 0, why: 'Parce que means because.' },
        { type: 'multiple_choice', question: 'What does cependant do?', options: ['Contrasts ideas', 'Repeats ideas', 'Ends a sentence'], answer: 0, why: 'It signals a contrast.' }
      ]
    }, {
      id: 'upper-secondary-french-m2-l3',
      order: 3,
      title: 'Future Plans',
      objective: 'I can discuss future plans using the simple future.',
      minutes: 9,
      recap: 'You discussed future plans using the simple future.',
      blocks: [
        { type: 'text', body: 'The simple future adds endings to the infinitive, as in je ferai.' },
        { type: 'text', body: 'Je ferai means I will do or make.' },
        { type: 'text', body: 'J’irai and j’aurai are irregular future forms worth learning.' },
        { type: 'tip', body: 'Practise irregular stems as short pairs.' },
        {
          type: 'illustration',
          alt: 'A white thought balloon with a blue outline.',
          image: 'assets/3d/thought-balloon-3d.png',
          placeholder: 'Thought balloon: plans for the future.'
        },
        { type: 'example', steps: ['Choose a plan.', 'Form je plus the future verb.', 'Add a time phrase.', 'Explain your reason.'] }
      ],
      vocabulary: [
        { word: 'avenir', meaning: 'Future.', example: 'Pense à l’avenir.' },
        { word: 'ferai', meaning: 'I will do.', example: 'Je ferai mes devoirs.' },
        { word: 'irai', meaning: 'I will go.', example: 'J’irai en France.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does je ferai mean?', options: ['I will do', 'I did', 'I am doing'], answer: 0, why: 'Ferai is the simple future.' },
        { type: 'multiple_choice', question: 'Which form is irregular?', options: ['J’irai', 'Je parlerai', 'Je finirai'], answer: 0, why: 'Aller has an irregular future stem.' },
        { type: 'multiple_choice', question: 'What does avenir mean?', options: ['Future', 'Past', 'Present'], answer: 0, why: 'Avenir means the future.' }
      ]
    }]
  }];
}());

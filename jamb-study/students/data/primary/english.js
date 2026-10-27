/* Primary English — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading: Letters and Stories',
    description: 'Letters, sounds, simple words, and what happens in a short story. Draft content.',
    lessons: [{
      id: 'primary-english-m1-l1',
      order: 1,
      title: 'Letters and Sounds',
      objective: 'I can match letters to the sounds they make.',
      minutes: 6,
      recap: 'You matched letters to sounds and blended them into words.',
      blocks: [
        { type: 'text', body: 'Letters are symbols. Each letter can make a sound.' },
        { type: 'text', body: 'Blend sounds together to read a word. c-a-t says cat.' },
        { type: 'tip', body: 'Say each sound slowly, then say them faster together.' },
        {
          type: 'illustration',
          alt: 'Three wooden letter tiles showing the letters c, a, and t.',
          image: 'assets/3d/input-latin-letters-3d.png',
          placeholder: 'Letter tiles: c, a, and t blended into cat.'
        },
        { type: 'example', steps: ['Look at the letters c, a, t.', 'Say each sound: c, a, t.', 'Blend them together: cat.'] }
      ],
      vocabulary: [
        { word: 'letter', meaning: 'A written symbol for a sound', example: 'The word cat starts with the letter c.' },
        { word: 'sound', meaning: 'What a letter says when spoken', example: 'The letter m makes the sound mmm.' },
        { word: 'blend', meaning: 'Join sounds to read a word', example: 'Blend c, a, t to read cat.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which word do these sounds make? c-a-t', options: ['cat', 'car', 'cot'], answer: 0, why: 'Blending c, a, and t gives the word cat.' },
        { type: 'multiple_choice', question: 'Which letter starts the word sun?', options: ['n', 's', 'u'], answer: 1, why: 'The word sun begins with the sound s.' },
        { type: 'multiple_choice', question: 'Which sounds blend to make the word map?', options: ['m-a-p', 'm-a-t', 's-a-p'], answer: 0, why: 'm, a, and p blend together to make map.' }
      ]
    }, {
      id: 'primary-english-m1-l2',
      order: 2,
      title: 'Reading Simple Words',
      objective: 'I can read short words by blending their sounds.',
      minutes: 7,
      recap: 'You blended sounds to read short words on your own.',
      blocks: [
        { type: 'text', body: 'Some words are short. You can read them by blending sounds.' },
        { type: 'text', body: 'Point to each letter as you say its sound.' },
        { type: 'text', body: 'Then say the sounds together, without stopping.' },
        { type: 'tip', body: 'If a word is hard, slow down and say each sound again.' },
        {
          type: 'illustration',
          alt: 'An open picture book with large, simple words on the page.',
          image: 'assets/3d/open_book-3d.png',
          placeholder: 'Open book: short words read sound by sound.'
        },
        { type: 'example', steps: ['Read the word hen.', 'Say h-e-n slowly.', 'Blend them: hen.', 'The word is hen.'] }
      ],
      vocabulary: [
        { word: 'read', meaning: 'Look at words and say them', example: 'Read the word hen.' },
        { word: 'word', meaning: 'Letters that make a meaning', example: 'Cat is a short word.' },
        { word: 'sound out', meaning: 'Say each sound in order', example: 'Sound out the word hen.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Read this word: d-o-g. Which word is it?', options: ['dog', 'dig', 'dot'], answer: 0, why: 'The sounds d, o, g blend to make dog.' },
        { type: 'multiple_choice', question: 'Which word rhymes with cat?', options: ['cup', 'hat', 'dog'], answer: 1, why: 'Hat ends with the same sound as cat.' },
        { type: 'multiple_choice', question: 'Which word is short?', options: ['sunshine', 'sunlight', 'sun'], answer: 2, why: 'Sun has three letters, so it is a short word.' }
      ]
    }, {
      id: 'primary-english-m1-l3',
      order: 3,
      title: 'What Happens in a Story',
      objective: 'I can say what happens at the start, middle, and end of a story.',
      minutes: 7,
      recap: 'You found the start, middle, and end of a short story.',
      blocks: [
        { type: 'text', body: 'A story has a beginning, a middle, and an end.' },
        { type: 'text', body: 'The beginning introduces the characters and the place.' },
        { type: 'text', body: 'The middle shows a problem. The end shows how it is solved.' },
        { type: 'tip', body: 'Ask: who, where, what went wrong, and how did it end?' },
        {
          type: 'illustration',
          alt: 'A small stack of storybooks with colourful covers.',
          image: 'assets/3d/books-3d.png',
          placeholder: 'Storybooks: a story opening, a problem, and an ending.'
        },
        { type: 'example', steps: ['Beginning: a boy finds a lost dog.', 'Middle: he searches the park.', 'End: he finds the dog at home.'] }
      ],
      vocabulary: [
        { word: 'character', meaning: 'A person or animal in a story', example: 'The main character is a boy.' },
        { word: 'setting', meaning: 'Where and when a story happens', example: 'The setting is a sunny park.' },
        { word: 'problem', meaning: 'The trouble a character faces', example: 'The lost dog is the problem.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does the beginning of a story usually do?', options: ['Solve the problem', 'Introduce the characters', 'End the story'], answer: 1, why: 'Beginnings introduce who is in the story and where.' },
        { type: 'multiple_choice', question: 'What is the problem in a story?', options: ['The trouble a character faces', 'The title of the book', 'The last page'], answer: 0, why: 'The problem is the difficulty the character must solve.' },
        { type: 'multiple_choice', question: 'A story ends when the character finds her cat. What part is this?', options: ['The end', 'The beginning', 'The middle'], answer: 0, why: 'Finding the cat solves the problem, so it is the ending.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing Clearly',
    description: 'Sentences, capital letters, full stops, and a short story of your own. Draft content.',
    lessons: [{
      id: 'primary-english-m2-l1',
      order: 1,
      title: 'Capital Letters and Full Stops',
      objective: 'I can start sentences with a capital letter and end them with a full stop.',
      minutes: 7,
      recap: 'You used capital letters and full stops to write clear sentences.',
      blocks: [
        { type: 'text', body: 'Every sentence starts with a capital letter.' },
        { type: 'text', body: 'Names of people and places also start with capitals.' },
        { type: 'text', body: 'Most sentences end with a full stop.' },
        { type: 'tip', body: 'Read your sentence aloud. A full stop marks a finished thought.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil resting beside a line of large writing.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: capital at the start, full stop at the end.'
        },
        { type: 'example', steps: ['Read the sentence: the dog runs.', 'Change the first letter to a capital: The.', 'Add a full stop at the end: The dog runs.'] }
      ],
      vocabulary: [
        { word: 'capital', meaning: 'An uppercase letter, like A or B', example: 'The name Sam starts with a capital.' },
        { word: 'full stop', meaning: 'A dot that ends a sentence', example: 'The sentence ends with a full stop.' },
        { word: 'sentence', meaning: 'A complete idea with a capital and stop', example: 'The dog runs is a sentence.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which sentence is correct?', options: ['the cat sleeps.', 'The cat sleeps.', 'The cat sleeps'], answer: 1, why: 'It starts with a capital and ends with a full stop.' },
        { type: 'multiple_choice', question: 'Which word needs a capital letter?', options: ['sam', 'dog', 'run'], answer: 0, why: 'Sam is a person’s name, so it needs a capital.' },
        { type: 'multiple_choice', question: 'What should go at the end of this sentence? I like jam', options: ['A full stop', 'A capital letter', 'Nothing'], answer: 0, why: 'A full stop ends a statement sentence.' }
      ]
    }, {
      id: 'primary-english-m2-l2',
      order: 2,
      title: 'Building a Sentence',
      objective: 'I can build a clear sentence with a subject and a verb.',
      minutes: 7,
      recap: 'You built sentences using a subject and a verb.',
      blocks: [
        { type: 'text', body: 'A sentence needs a subject. The subject tells who or what.' },
        { type: 'text', body: 'A verb tells what the subject does.' },
        { type: 'text', body: 'Put the subject first, then the verb. Tom runs.' },
        { type: 'tip', body: 'Check that your sentence makes sense on its own.' },
        {
          type: 'illustration',
          alt: 'A paper label with a blank line waiting for a name.',
          image: 'assets/3d/label-3d.png',
          placeholder: 'Label: a subject and verb joined into one clear sentence.'
        },
        { type: 'example', steps: ['Choose a subject: the bird.', 'Choose a verb: sings.', 'Join them: The bird sings.'] }
      ],
      vocabulary: [
        { word: 'subject', meaning: 'Who or what the sentence is about', example: 'In The bird sings, the subject is the bird.' },
        { word: 'verb', meaning: 'A word that shows an action', example: 'Sings is a verb.' },
        { word: 'complete', meaning: 'Whole, with nothing missing', example: 'A complete sentence makes sense alone.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which word is the subject in The cat sleeps?', options: ['cat', 'sleeps', 'the'], answer: 0, why: 'The sentence is about the cat.' },
        { type: 'multiple_choice', question: 'Which word is the verb in The rain falls?', options: ['rain', 'falls', 'the'], answer: 1, why: 'Falls tells what the rain does.' },
        { type: 'multiple_choice', question: 'Which group of words is a complete sentence?', options: ['The bus stops.', 'The bus', 'Stops quickly'], answer: 0, why: 'It has a subject and a verb and makes sense.' }
      ]
    }, {
      id: 'primary-english-m2-l3',
      order: 3,
      title: 'Writing a Short Story',
      objective: 'I can plan and write a short story with a beginning, middle, and end.',
      minutes: 8,
      recap: 'You planned and wrote a short story in three parts.',
      blocks: [
        { type: 'text', body: 'Plan first. Decide who is in your story and where it happens.' },
        { type: 'text', body: 'In the middle, give your character a problem to solve.' },
        { type: 'text', body: 'End by showing how the problem is solved.' },
        { type: 'tip', body: 'Use words like first, then, and finally to guide your reader.' },
        {
          type: 'illustration',
          alt: 'A rolled paper scroll with lines of a handwritten story.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: a story planned in beginning, middle, and end.'
        },
        { type: 'example', steps: ['Beginning: Mia finds a key.', 'Middle: she cannot open the door.', 'End: she tries the back door and it opens.'] }
      ],
      vocabulary: [
        { word: 'plan', meaning: 'Decide what happens before writing', example: 'Plan your story in three parts.' },
        { word: 'plot', meaning: 'The events that happen in a story', example: 'The plot of my story is simple.' },
        { word: 'ending', meaning: 'How the story finishes', example: 'The ending solves the problem.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should you do before writing a story?', options: ['Plan the beginning, middle, and end', 'Write the ending first', 'Count the words'], answer: 0, why: 'A quick plan helps the story stay clear.' },
        { type: 'multiple_choice', question: 'Where does the problem usually appear?', options: ['In the middle', 'In the title', 'On the cover'], answer: 0, why: 'The middle builds the trouble the character must solve.' },
        { type: 'multiple_choice', question: 'Which word helps show order?', options: ['Blue', 'Happy', 'Finally'], answer: 2, why: 'Finally shows that an event comes last.' }
      ]
    }]
  }];
}());

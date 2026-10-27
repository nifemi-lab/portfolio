/* Lower Secondary Computing — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'computing');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'How Computers Work',
    description: 'Hardware, data, and networks: the parts behind everyday computing. Draft content.',
    lessons: [{
      id: 'lower-secondary-computing-m1-l1',
      order: 1,
      title: 'Hardware and Software',
      objective: 'I can distinguish hardware from software and give examples.',
      minutes: 8,
      recap: 'You distinguished hardware from software and gave examples.',
      blocks: [
        { type: 'text', body: 'Hardware is the physical equipment you can touch, such as a screen, keyboard, or processor.' },
        { type: 'text', body: 'Software is the set of programs and instructions that run on the hardware.' },
        { type: 'text', body: 'An operating system manages memory, files, and connected devices.' },
        { type: 'tip', body: 'Hardware without software cannot do useful work.' },
        {
          type: 'illustration',
          alt: 'A desktop computer with monitor, keyboard, and case.',
          image: 'assets/3d/desktop-computer-3d.png',
          placeholder: 'Desktop computer: hardware working with software.'
        },
        { type: 'example', steps: ['You press a key on the keyboard.', 'The operating system receives the signal.', 'The word appears on screen.', 'Hardware and software work together.'] }
      ],
      vocabulary: [
        { word: 'hardware', meaning: 'The physical parts of a computer.', example: 'A mouse is hardware.' },
        { word: 'software', meaning: 'Programs that run on a computer.', example: 'A browser is software.' },
        { word: 'processor', meaning: 'The part that carries out instructions.', example: 'The processor runs the program.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is hardware?', options: ['A keyboard', 'A web browser', 'A photo app'], answer: 0, why: 'A keyboard is a physical part.' },
        { type: 'multiple_choice', question: 'Which is software?', options: ['An operating system', 'A monitor', 'A mouse'], answer: 0, why: 'An operating system is a program.' },
        { type: 'multiple_choice', question: 'What does an operating system do?', options: ['Manages the computer', 'Builds the screen', 'Prints paper'], answer: 0, why: 'It manages files, memory, and devices.' }
      ]
    }, {
      id: 'lower-secondary-computing-m1-l2',
      order: 2,
      title: 'Binary and Data',
      objective: 'I can explain how computers store data using binary.',
      minutes: 8,
      recap: 'You explained how computers store data using binary.',
      blocks: [
        { type: 'text', body: 'Computers store data as binary: patterns of 0s and 1s.' },
        { type: 'text', body: 'Each binary digit is called a bit. Eight bits make a byte.' },
        { type: 'text', body: 'A byte can represent a character, such as a letter.' },
        { type: 'tip', body: 'More bits allow larger numbers and more detail.' },
        {
          type: 'illustration',
          alt: 'A keypad showing the digits one, two, three, and four.',
          image: 'assets/3d/input-numbers-3d.png',
          placeholder: 'Number pad: binary digits build every file.'
        },
        { type: 'example', steps: ['A computer reads a 0 or a 1.', 'Eight bits form one byte.', 'The byte represents a letter.', 'Many bytes make a file.'] }
      ],
      vocabulary: [
        { word: 'binary', meaning: 'A system using only 0 and 1.', example: 'Binary stores digital data.' },
        { word: 'bit', meaning: 'A single binary digit.', example: 'One bit is 0 or 1.' },
        { word: 'byte', meaning: 'Eight bits together.', example: 'A byte stores a character.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which digits does binary use?', options: ['0 and 1', '1 and 2', '0 to 9'], answer: 0, why: 'Binary uses only 0 and 1.' },
        { type: 'multiple_choice', question: 'How many bits are in a byte?', options: ['Eight', 'Two', 'Ten'], answer: 0, why: 'A byte contains eight bits.' },
        { type: 'multiple_choice', question: 'What can a byte represent?', options: ['A character', 'A whole film', 'A monitor'], answer: 0, why: 'A byte can store one character.' }
      ]
    }, {
      id: 'lower-secondary-computing-m1-l3',
      order: 3,
      title: 'Networks and the Internet',
      objective: 'I can explain what a network and the internet are.',
      minutes: 8,
      recap: 'You explained what a network and the internet are.',
      blocks: [
        { type: 'text', body: 'A network connects computers so they can share data.' },
        { type: 'text', body: 'The internet is a huge network of networks across the world.' },
        { type: 'text', body: 'Data travels in small packets along cables and wireless links.' },
        { type: 'tip', body: 'A router directs packets between devices and networks.' },
        {
          type: 'illustration',
          alt: 'A blue and green globe showing the Americas.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: networks linked across the world.'
        },
        { type: 'example', steps: ['You open a website.', 'Your device sends a request.', 'The router forwards it.', 'The server sends data back.'] }
      ],
      vocabulary: [
        { word: 'network', meaning: 'Computers linked to share data.', example: 'The school network is fast.' },
        { word: 'internet', meaning: 'The worldwide network of networks.', example: 'The internet links millions of devices.' },
        { word: 'router', meaning: 'A device that directs network traffic.', example: 'The router sends the request.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a network do?', options: ['Shares data between devices', 'Stores paper', 'Makes electricity'], answer: 0, why: 'Networks connect devices to share data.' },
        { type: 'multiple_choice', question: 'What is the internet?', options: ['A worldwide network', 'A single computer', 'A type of screen'], answer: 0, why: 'It links networks around the world.' },
        { type: 'multiple_choice', question: 'What does a router do?', options: ['Directs data packets', 'Types letters', 'Prints files'], answer: 0, why: 'Routers send data to the right place.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Programming and Safety',
    description: 'Algorithms, code, and staying safe online. Draft content.',
    lessons: [{
      id: 'lower-secondary-computing-m2-l1',
      order: 1,
      title: 'Algorithms',
      objective: 'I can write and follow a simple algorithm.',
      minutes: 8,
      recap: 'You wrote and followed a simple algorithm.',
      blocks: [
        { type: 'text', body: 'An algorithm is a set of steps for solving a problem.' },
        { type: 'text', body: 'Good algorithms are clear, ordered, and finite.' },
        { type: 'text', body: 'Flowcharts show decisions with arrows and branches.' },
        { type: 'tip', body: 'Test an algorithm with a simple example first.' },
        {
          type: 'illustration',
          alt: 'A yellow notepad with lined pages.',
          image: 'assets/3d/memo-3d.png',
          placeholder: 'Notepad: ordered steps that solve a task.'
        },
        { type: 'example', steps: ['Start with a number.', 'If it is even, divide it by two.', 'If odd, add one.', 'Repeat until the goal is met.'] }
      ],
      vocabulary: [
        { word: 'algorithm', meaning: 'A set of steps to solve a problem.', example: 'Follow the algorithm in order.' },
        { word: 'flowchart', meaning: 'A diagram showing steps and choices.', example: 'The flowchart shows each branch.' },
        { word: 'decision', meaning: 'A point where a choice is made.', example: 'The decision splits the path.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is an algorithm?', options: ['A set of steps', 'A type of computer', 'A password'], answer: 0, why: 'Algorithms give ordered steps.' },
        { type: 'multiple_choice', question: 'What does a flowchart show?', options: ['Steps and decisions', 'Only colours', 'A finished file'], answer: 0, why: 'Flowcharts map steps and branches.' },
        { type: 'multiple_choice', question: 'Why test an algorithm?', options: ['To check it works', 'To make it longer', 'To hide mistakes'], answer: 0, why: 'Testing reveals errors and gaps.' }
      ]
    }, {
      id: 'lower-secondary-computing-m2-l2',
      order: 2,
      title: 'Introduction to Programming',
      objective: 'I can identify variables, loops, and conditions in code.',
      minutes: 8,
      recap: 'You identified variables, loops, and conditions in code.',
      blocks: [
        { type: 'text', body: 'A variable stores a value that can change, such as a score.' },
        { type: 'text', body: 'A loop repeats instructions until a condition is met.' },
        { type: 'text', body: 'A condition chooses between paths, using if and else.' },
        { type: 'tip', body: 'Programs run in order unless a loop or condition changes it.' },
        {
          type: 'illustration',
          alt: 'A silver laptop open on a desk.',
          image: 'assets/3d/laptop-3d.png',
          placeholder: 'Laptop: variables, loops, and conditions in code.'
        },
        { type: 'example', steps: ['Set score to zero.', 'Repeat five times: add one.', 'If score is five, show a message.', 'The program ends.'] }
      ],
      vocabulary: [
        { word: 'variable', meaning: 'A named store for a changing value.', example: 'The score is a variable.' },
        { word: 'loop', meaning: 'Code that repeats.', example: 'The loop runs five times.' },
        { word: 'condition', meaning: 'A test that chooses a path.', example: 'The condition checks the score.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a variable do?', options: ['Stores a changing value', 'Draws the screen', 'Sends emails'], answer: 0, why: 'Variables hold values such as scores.' },
        { type: 'multiple_choice', question: 'What does a loop do?', options: ['Repeats instructions', 'Stops all code', 'Deletes files'], answer: 0, why: 'Loops repeat until they finish.' },
        { type: 'multiple_choice', question: 'What does a condition do?', options: ['Chooses a path', 'Stores data', 'Turns off power'], answer: 0, why: 'Conditions choose between options.' }
      ]
    }, {
      id: 'lower-secondary-computing-m2-l3',
      order: 3,
      title: 'Cyber Safety',
      objective: 'I can describe common online risks and protective habits.',
      minutes: 8,
      recap: 'You described common online risks and protective habits.',
      blocks: [
        { type: 'text', body: 'Phishing messages pretend to be trusted people to steal details.' },
        { type: 'text', body: 'Strong, unique passwords and two-step checks reduce account risk.' },
        { type: 'text', body: 'Never share personal information with unknown contacts.' },
        { type: 'tip', body: 'Report harmful content and tell a trusted adult.' },
        {
          type: 'illustration',
          alt: 'A golden padlock with a small key.',
          image: 'assets/3d/locked-with-key-3d.png',
          placeholder: 'Padlock: passwords, privacy, and phishing.'
        },
        { type: 'example', steps: ['An email asks for your password.', 'You check the sender address.', 'It looks suspicious.', 'You report and delete it.'] }
      ],
      vocabulary: [
        { word: 'phishing', meaning: 'A trick to steal private details.', example: 'The phishing email looked real.' },
        { word: 'privacy', meaning: 'Control over personal information.', example: 'Privacy settings protect your data.' },
        { word: 'report', meaning: 'Tell a service or adult about harm.', example: 'Report the harmful message.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is phishing?', options: ['A trick to steal details', 'A type of game', 'A safe website'], answer: 0, why: 'Phishing messages impersonate trusted sources.' },
        { type: 'multiple_choice', question: 'Which password is safest?', options: ['A long unique phrase', 'Your birthday', 'Your name'], answer: 0, why: 'Long, unique passwords are harder to guess.' },
        { type: 'multiple_choice', question: 'What should you do with suspicious messages?', options: ['Report and delete', 'Reply with details', 'Share your password'], answer: 0, why: 'Reporting avoids further risk.' }
      ]
    }]
  }];
}());

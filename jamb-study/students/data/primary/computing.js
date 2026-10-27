/* Primary Computing — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'computing');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Computers Around Us',
    description: 'Parts, typing, and online safety: using computers with care. Draft content.',
    lessons: [{
      id: 'primary-computing-m1-l1',
      order: 1,
      title: 'Parts of a Computer',
      objective: 'I can name the main parts of a computer and say what they do.',
      minutes: 7,
      recap: 'You named the main parts of a computer and their jobs.',
      blocks: [
        { type: 'text', body: 'A computer has a screen, keyboard, mouse, and processing unit.' },
        { type: 'text', body: 'The screen shows pictures and words.' },
        { type: 'text', body: 'The keyboard types letters. The mouse moves the pointer.' },
        { type: 'tip', body: 'The computer does the thinking inside its case.' },
        {
          type: 'illustration',
          alt: 'A desktop computer with a screen and keyboard.',
          image: 'assets/3d/desktop-computer-3d.png',
          placeholder: 'Desktop computer: screen, keyboard, mouse, and case.'
        },
        { type: 'example', steps: ['Sit at the computer.', 'Press a key to type.', 'Move the mouse to point.', 'Click to choose.'] }
      ],
      vocabulary: [
        { word: 'screen', meaning: 'The part that shows pictures and words.', example: 'The screen shows a picture.' },
        { word: 'keyboard', meaning: 'The part with letter and number keys.', example: 'The keyboard has many keys.' },
        { word: 'mouse', meaning: 'A hand tool that moves the pointer.', example: 'Move the mouse to point.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which part shows pictures and words?', options: ['The screen', 'The mouse', 'The keyboard'], answer: 0, why: 'The screen displays what the computer is doing.' },
        { type: 'multiple_choice', question: 'Which part types letters?', options: ['The keyboard', 'The screen', 'The case'], answer: 0, why: 'The keyboard has letter and number keys.' },
        { type: 'multiple_choice', question: 'What does the mouse do?', options: ['Moves the pointer', 'Prints words', 'Stores files'], answer: 0, why: 'A mouse moves the pointer on screen.' }
      ]
    }, {
      id: 'primary-computing-m1-l2',
      order: 2,
      title: 'Using a Keyboard',
      objective: 'I can use letter, number, and space keys to type a sentence.',
      minutes: 7,
      recap: 'You typed a sentence using letter, number, and space keys.',
      blocks: [
        { type: 'text', body: 'The keyboard has letter keys, number keys, and a space bar.' },
        { type: 'text', body: 'Press the space bar once between words.' },
        { type: 'text', body: 'The shift key makes a capital letter.' },
        { type: 'tip', body: 'Keep your fingers relaxed and your eyes on the screen.' },
        {
          type: 'illustration',
          alt: 'A white computer keyboard with grey keys.',
          image: 'assets/3d/keyboard-3d.png',
          placeholder: 'Keyboard: letter keys, number keys, and the space bar.'
        },
        { type: 'example', steps: ['Press a letter key.', 'Press the space bar.', 'Hold shift and press a letter.', 'A capital letter appears.'] }
      ],
      vocabulary: [
        { word: 'space bar', meaning: 'The long key that adds a gap.', example: 'Press space bar between words.' },
        { word: 'capital', meaning: 'A large uppercase letter.', example: 'Names begin with a capital.' },
        { word: 'type', meaning: 'Press keys to write on a screen.', example: 'Type your name here.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which key adds a gap between words?', options: ['The space bar', 'The shift key', 'The letter A'], answer: 0, why: 'The space bar adds a space.' },
        { type: 'multiple_choice', question: 'Which key makes a capital letter?', options: ['Shift', 'Space', 'Enter'], answer: 0, why: 'Holding shift gives a capital letter.' },
        { type: 'multiple_choice', question: 'What does typing mean?', options: ['Pressing keys to write', 'Moving the mouse', 'Turning off the screen'], answer: 0, why: 'Typing puts letters on the screen.' }
      ]
    }, {
      id: 'primary-computing-m1-l3',
      order: 3,
      title: 'Keeping Safe Online',
      objective: 'I can name simple ways to stay safe online.',
      minutes: 7,
      recap: 'You named simple ways to stay safe online.',
      blocks: [
        { type: 'text', body: 'Only use websites an adult has checked.' },
        { type: 'text', body: 'Keep your name, address, and school private.' },
        { type: 'text', body: 'Tell an adult if something online feels wrong.' },
        { type: 'tip', body: 'A strong password is long and hard to guess.' },
        {
          type: 'illustration',
          alt: 'A golden padlock with a small key.',
          image: 'assets/3d/locked-with-key-3d.png',
          placeholder: 'Padlock: private details and safe passwords.'
        },
        { type: 'example', steps: ['A stranger sends a message.', 'You do not reply.', 'You show an adult.', 'The adult helps you block it.'] }
      ],
      vocabulary: [
        { word: 'private', meaning: 'Belonging only to you, not public.', example: 'Keep your address private.' },
        { word: 'password', meaning: 'A secret word that keeps an account safe.', example: 'Choose a strong password.' },
        { word: 'adult', meaning: 'A grown-up who can help you.', example: 'Tell a trusted adult.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should you keep private?', options: ['Your home address', 'Your favourite colour', 'The weather'], answer: 0, why: 'Private details should not be shared.' },
        { type: 'multiple_choice', question: 'Who should you tell if something feels wrong?', options: ['A trusted adult', 'A stranger', 'Nobody'], answer: 0, why: 'A trusted adult can help you.' },
        { type: 'multiple_choice', question: 'What makes a strong password?', options: ['Long and hard to guess', 'Your first name', 'The word password'], answer: 0, why: 'Long, unusual passwords are safer.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Making Things Happen',
    description: 'Instructions, simple programs, and digital art. Draft content.',
    lessons: [{
      id: 'primary-computing-m2-l1',
      order: 1,
      title: 'Giving Instructions',
      objective: 'I can give clear, ordered instructions to make something happen.',
      minutes: 7,
      recap: 'You gave clear, ordered instructions to make something happen.',
      blocks: [
        { type: 'text', body: 'An instruction tells someone or something what to do.' },
        { type: 'text', body: 'Steps must be in the right order.' },
        { type: 'text', body: 'Clear instructions use simple, exact words.' },
        { type: 'tip', body: 'One instruction should do one job.' },
        {
          type: 'illustration',
          alt: 'A friendly white robot with blue eyes.',
          image: 'assets/3d/robot-3d.png',
          placeholder: 'Robot: following a short list of instructions.'
        },
        { type: 'example', steps: ['Start with the robot facing forward.', 'Say: move forward two steps.', 'Say: turn right.', 'The robot follows in order.'] }
      ],
      vocabulary: [
        { word: 'instruction', meaning: 'A direction telling what to do.', example: 'Read each instruction carefully.' },
        { word: 'order', meaning: 'The sequence in which steps happen.', example: 'The order of steps matters.' },
        { word: 'robot', meaning: 'A machine that follows instructions.', example: 'The robot moved two steps.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is an instruction?', options: ['A direction to do something', 'A type of screen', 'A picture'], answer: 0, why: 'Instructions tell you what to do.' },
        { type: 'multiple_choice', question: 'Why does order matter?', options: ['Steps must happen in sequence', 'It looks tidy', 'It is louder'], answer: 0, why: 'Wrong order gives the wrong result.' },
        { type: 'multiple_choice', question: 'A robot moves two steps. Then one more. How far?', options: ['Three steps', 'Two steps', 'One step'], answer: 0, why: 'Two steps plus one more make three.' }
      ]
    }, {
      id: 'primary-computing-m2-l2',
      order: 2,
      title: 'Simple Programs',
      objective: 'I can explain what a simple program is and what it does.',
      minutes: 7,
      recap: 'You explained what a simple program is and what it does.',
      blocks: [
        { type: 'text', body: 'A program is a list of instructions for a computer.' },
        { type: 'text', body: 'Computers follow programs very quickly and exactly.' },
        { type: 'text', body: 'A sequence runs from the first line to the last.' },
        { type: 'tip', body: 'A bug is a mistake that stops a program working.' },
        {
          type: 'illustration',
          alt: 'A silver laptop open on a desk.',
          image: 'assets/3d/laptop-3d.png',
          placeholder: 'Laptop: a program running step by step.'
        },
        { type: 'example', steps: ['The program starts.', 'It shows a shape.', 'It waits for a click.', 'It changes colour.'] }
      ],
      vocabulary: [
        { word: 'program', meaning: 'A list of instructions for a computer.', example: 'The program draws a square.' },
        { word: 'sequence', meaning: 'Steps in a fixed order.', example: 'The sequence starts at line one.' },
        { word: 'bug', meaning: 'A mistake in a program.', example: 'The bug stopped the game.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a program?', options: ['A list of instructions', 'A kind of screen', 'A password'], answer: 0, why: 'Programs tell computers what to do.' },
        { type: 'multiple_choice', question: 'What is a sequence?', options: ['Steps in order', 'A random jump', 'A type of mouse'], answer: 0, why: 'A sequence follows a fixed order.' },
        { type: 'multiple_choice', question: 'What is a bug?', options: ['A mistake in a program', 'A computer part', 'A safe website'], answer: 0, why: 'Bugs stop programs working properly.' }
      ]
    }, {
      id: 'primary-computing-m2-l3',
      order: 3,
      title: 'Digital Art',
      objective: 'I can use simple digital tools to make a picture.',
      minutes: 7,
      recap: 'You used simple digital tools to make a picture.',
      blocks: [
        { type: 'text', body: 'Digital art is made with a computer or tablet.' },
        { type: 'text', body: 'Drawing tools include brushes, shapes, and colours.' },
        { type: 'text', body: 'You can undo a mistake with one click.' },
        { type: 'tip', body: 'Save your work before you close the app.' },
        {
          type: 'illustration',
          alt: 'A wooden palette with bright paint colours.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: brushes, colours, and digital shapes.'
        },
        { type: 'example', steps: ['Choose a brush.', 'Pick a colour.', 'Draw a circle.', 'Save the picture.'] }
      ],
      vocabulary: [
        { word: 'digital', meaning: 'Made or stored with a computer.', example: 'This is a digital drawing.' },
        { word: 'brush', meaning: 'A tool that draws lines.', example: 'Pick a thin brush.' },
        { word: 'undo', meaning: 'Take back the last action.', example: 'Press undo to remove it.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is digital art made with?', options: ['A computer or tablet', 'Only paint', 'Only paper'], answer: 0, why: 'Digital art uses electronic tools.' },
        { type: 'multiple_choice', question: 'What does the undo button do?', options: ['Takes back the last action', 'Saves the picture', 'Changes the screen'], answer: 0, why: 'Undo reverses your last step.' },
        { type: 'multiple_choice', question: 'Why should you save your work?', options: ['So it is not lost', 'To make it louder', 'To close the screen'], answer: 0, why: 'Saving keeps your picture for later.' }
      ]
    }]
  }];
}());

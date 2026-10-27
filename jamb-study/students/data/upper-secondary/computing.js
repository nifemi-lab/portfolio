/* GCSE Computing — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'computing');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Computer Systems',
    description: 'Processors, data, and networks: how computer systems work. Draft content.',
    lessons: [{
      id: 'upper-secondary-computing-m1-l1',
      order: 1,
      title: 'CPU and Memory',
      objective: 'I can explain the roles of the CPU, RAM, and storage.',
      minutes: 10,
      recap: 'You explained the roles of the CPU, RAM, and storage.',
      blocks: [
        { type: 'text', body: 'The central processing unit fetches, decodes, and executes instructions.' },
        { type: 'text', body: 'RAM holds data and programs currently in use, and is volatile.' },
        { type: 'text', body: 'Secondary storage keeps files permanently when power is off.' },
        { type: 'tip', body: 'Cache memory sits close to the CPU to speed up access.' },
        {
          type: 'illustration',
          alt: 'A desktop computer with monitor, keyboard, and case.',
          image: 'assets/3d/desktop-computer-3d.png',
          placeholder: 'Desktop computer: CPU, memory, and storage.'
        },
        { type: 'example', steps: ['A program is opened.', 'Its instructions load into RAM.', 'The CPU executes them.', 'Saved data remains in storage.'] }
      ],
      vocabulary: [
        { word: 'CPU', meaning: 'The part that executes instructions.', example: 'The CPU runs the program.' },
        { word: 'RAM', meaning: 'Volatile working memory.', example: 'RAM holds open programs.' },
        { word: 'storage', meaning: 'Long-term memory for files.', example: 'Files stay in storage.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does the CPU do?', options: ['Executes instructions', 'Stores files forever', 'Displays images'], answer: 0, why: 'The CPU fetches, decodes, and executes instructions.' },
        { type: 'multiple_choice', question: 'What is RAM?', options: ['Working memory', 'Permanent storage', 'A screen'], answer: 0, why: 'RAM holds data currently in use.' },
        { type: 'multiple_choice', question: 'What happens to RAM when power is off?', options: ['It loses data', 'It saves files', 'It speeds up'], answer: 0, why: 'RAM is volatile and clears without power.' }
      ]
    }, {
      id: 'upper-secondary-computing-m1-l2',
      order: 2,
      title: 'Data Representation',
      objective: 'I can explain how computers represent data in binary.',
      minutes: 10,
      recap: 'You explained how computers represent data in binary.',
      blocks: [
        { type: 'text', body: 'Computers use binary because electronic circuits have two stable states.' },
        { type: 'text', body: 'Eight bits form a byte, which can store one character.' },
        { type: 'text', body: 'Text uses character sets such as ASCII or Unicode.' },
        { type: 'tip', body: 'Images and sound are also encoded as binary numbers.' },
        {
          type: 'illustration',
          alt: 'A keypad showing the digits one, two, three, and four.',
          image: 'assets/3d/input-numbers-3d.png',
          placeholder: 'Number pad: binary encoding for text and media.'
        },
        { type: 'example', steps: ['A letter has a code number.', 'The number is written in binary.', 'Eight bits store the character.', 'Unicode allows many languages.'] }
      ],
      vocabulary: [
        { word: 'binary', meaning: 'A base-2 number system.', example: 'Binary uses 0 and 1.' },
        { word: 'bit', meaning: 'A single 0 or 1.', example: 'A bit is one binary digit.' },
        { word: 'character set', meaning: 'A table linking codes to characters.', example: 'ASCII is a character set.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why do computers use binary?', options: ['Circuits have two states', 'It looks simple', 'It is faster to type'], answer: 0, why: 'Two stable states map to 0 and 1.' },
        { type: 'multiple_choice', question: 'How many bits make a byte?', options: ['Eight', 'Four', 'Sixteen'], answer: 0, why: 'A byte is eight bits.' },
        { type: 'multiple_choice', question: 'What does Unicode allow?', options: ['Many languages', 'Only numbers', 'No text'], answer: 0, why: 'Unicode supports a wide range of characters.' }
      ]
    }, {
      id: 'upper-secondary-computing-m1-l3',
      order: 3,
      title: 'Networks and Protocols',
      objective: 'I can explain how data moves across networks.',
      minutes: 10,
      recap: 'You explained how data moves across networks.',
      blocks: [
        { type: 'text', body: 'Networks use protocols, which are agreed rules for communication.' },
        { type: 'text', body: 'Data is split into packets that may take different routes.' },
        { type: 'text', body: 'IP addresses identify devices; TCP reassembles the packets.' },
        { type: 'tip', body: 'Encryption protects data from being read in transit.' },
        {
          type: 'illustration',
          alt: 'A blue and green globe showing the Americas.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: packets routed across global networks.'
        },
        { type: 'example', steps: ['A file is split into packets.', 'Each packet gets a destination address.', 'Routers forward them.', 'TCP puts them back in order.'] }
      ],
      vocabulary: [
        { word: 'protocol', meaning: 'An agreed set of communication rules.', example: 'TCP is a protocol.' },
        { word: 'packet', meaning: 'A small unit of network data.', example: 'Packets travel separately.' },
        { word: 'encryption', meaning: 'Encoding data so others cannot read it.', example: 'Encryption protects messages.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a protocol?', options: ['A communication rule', 'A physical cable', 'A web page'], answer: 0, why: 'Protocols define how data is exchanged.' },
        { type: 'multiple_choice', question: 'Why is data split into packets?', options: ['To route it efficiently', 'To make it heavier', 'To hide the file'], answer: 0, why: 'Packets can take different routes.' },
        { type: 'multiple_choice', question: 'What does encryption do?', options: ['Protects data in transit', 'Speeds up typing', 'Deletes packets'], answer: 0, why: 'Encryption keeps data unreadable.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Programming and Security',
    description: 'Algorithms, code, and cybersecurity. Draft content.',
    lessons: [{
      id: 'upper-secondary-computing-m2-l1',
      order: 1,
      title: 'Algorithms and Pseudocode',
      objective: 'I can design an algorithm using pseudocode.',
      minutes: 10,
      recap: 'You designed an algorithm using pseudocode.',
      blocks: [
        { type: 'text', body: 'Pseudocode describes an algorithm in structured plain language.' },
        { type: 'text', body: 'Sequence, selection, and iteration are the three basic constructs.' },
        { type: 'text', body: 'A good algorithm is unambiguous, finite, and correct.' },
        { type: 'tip', body: 'Trace through an algorithm to check each step.' },
        {
          type: 'illustration',
          alt: 'A yellow notepad with lined pages.',
          image: 'assets/3d/memo-3d.png',
          placeholder: 'Notepad: pseudocode for an ordered algorithm.'
        },
        { type: 'example', steps: ['INPUT number', 'IF number > 0 THEN OUTPUT positive', 'ELSE OUTPUT not positive', 'END IF'] }
      ],
      vocabulary: [
        { word: 'pseudocode', meaning: 'Structured plain-language code.', example: 'Pseudocode plans the program.' },
        { word: 'selection', meaning: 'Choosing between paths.', example: 'Selection uses IF and ELSE.' },
        { word: 'iteration', meaning: 'Repeating steps.', example: 'Iteration repeats a block.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is pseudocode?', options: ['Structured plain language', 'A type of hardware', 'A network'], answer: 0, why: 'It describes algorithms without exact syntax.' },
        { type: 'multiple_choice', question: 'Which construct repeats steps?', options: ['Iteration', 'Selection', 'Sequence'], answer: 0, why: 'Iteration repeats instructions.' },
        { type: 'multiple_choice', question: 'Why trace an algorithm?', options: ['To check each step', 'To make it longer', 'To hide errors'], answer: 0, why: 'Tracing reveals mistakes and unexpected results.' }
      ]
    }, {
      id: 'upper-secondary-computing-m2-l2',
      order: 2,
      title: 'Programming Constructs',
      objective: 'I can explain how variables, selection, and iteration work.',
      minutes: 10,
      recap: 'You explained how variables, selection, and iteration work.',
      blocks: [
        { type: 'text', body: 'A variable has a name, a type, and a current value.' },
        { type: 'text', body: 'Selection uses conditions to choose which code runs.' },
        { type: 'text', body: 'Iteration repeats code using a count or a condition.' },
        { type: 'tip', body: 'Keep functions small and names descriptive.' },
        {
          type: 'illustration',
          alt: 'A silver laptop open on a desk.',
          image: 'assets/3d/laptop-3d.png',
          placeholder: 'Laptop: variables, conditions, and loops.'
        },
        { type: 'example', steps: ['Set total to 0.', 'FOR each score', 'ADD score to total', 'OUTPUT total'] }
      ],
      vocabulary: [
        { word: 'variable', meaning: 'A named store for a value.', example: 'Total is a variable.' },
        { word: 'selection', meaning: 'Choosing a path with a condition.', example: 'Selection uses an IF statement.' },
        { word: 'iteration', meaning: 'Repeating a block of code.', example: 'A FOR loop is iteration.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are the three basic constructs?', options: ['Sequence, selection, iteration', 'Input, output, storage', 'Text, image, sound'], answer: 0, why: 'These are the core programming constructs.' },
        { type: 'multiple_choice', question: 'What does selection use?', options: ['A condition', 'A cable', 'A password'], answer: 0, why: 'Conditions decide which branch runs.' },
        { type: 'multiple_choice', question: 'What does iteration do?', options: ['Repeats code', 'Stops the program', 'Stores files'], answer: 0, why: 'Iteration repeats instructions.' }
      ]
    }, {
      id: 'upper-secondary-computing-m2-l3',
      order: 3,
      title: 'Cybersecurity',
      objective: 'I can explain common cyber threats and defences.',
      minutes: 10,
      recap: 'You explained common cyber threats and defences.',
      blocks: [
        { type: 'text', body: 'Malware is software designed to damage or gain unauthorised access.' },
        { type: 'text', body: 'Phishing exploits trust, while weak passwords allow account takeover.' },
        { type: 'text', body: 'Defences include firewalls, updates, strong passwords, and backups.' },
        { type: 'tip', body: 'Two-factor authentication adds a second check at login.' },
        {
          type: 'illustration',
          alt: 'A golden padlock with a small key.',
          image: 'assets/3d/locked-with-key-3d.png',
          placeholder: 'Padlock: malware, phishing, and account defences.'
        },
        { type: 'example', steps: ['A phishing email arrives.', 'The link looks suspicious.', 'The user reports it.', 'The firewall blocks the site.'] }
      ],
      vocabulary: [
        { word: 'malware', meaning: 'Software designed to cause harm.', example: 'Malware can steal data.' },
        { word: 'firewall', meaning: 'A filter for network traffic.', example: 'The firewall blocked the site.' },
        { word: 'backup', meaning: 'A copy of data kept for recovery.', example: 'Keep a backup of your files.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is malware?', options: ['Harmful software', 'A safe update', 'A password'], answer: 0, why: 'Malware damages systems or steals access.' },
        { type: 'multiple_choice', question: 'What does a firewall do?', options: ['Filters network traffic', 'Types documents', 'Stores backups'], answer: 0, why: 'Firewalls block unwanted connections.' },
        { type: 'multiple_choice', question: 'Why use two-factor authentication?', options: ['Adds a second check', 'Removes passwords', 'Speeds up updates'], answer: 0, why: 'It makes account takeover harder.' }
      ]
    }]
  }];
}());

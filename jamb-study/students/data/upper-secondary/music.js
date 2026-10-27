/* GCSE Music — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'music');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Music Theory',
    description: 'Rhythm, melody, harmony, and form at GCSE. Draft content.',
    lessons: [{
      id: 'upper-secondary-music-m1-l1',
      order: 1,
      title: 'Rhythm and Metre',
      objective: 'I can analyse rhythm and metre in a musical extract.',
      minutes: 10,
      recap: 'You analysed rhythm and metre in a musical extract.',
      blocks: [
        { type: 'text', body: 'Rhythm concerns note durations; metre groups beats into bars with a regular pulse.' },
        { type: 'text', body: 'Time signatures show how many beats a bar contains and which note value gets the beat.' },
        { type: 'text', body: 'Syncopation places accents off the expected beat, creating energy and tension.' },
        { type: 'tip', body: 'Clap the main pulse first, then the rhythm, to separate the two.' },
        {
          type: 'illustration',
          alt: 'A red drum with wooden sticks.',
          image: 'assets/3d/drum-3d.png',
          placeholder: 'Drum: pulse, time signature, and syncopation.'
        },
        { type: 'example', steps: ['Identify the pulse.', 'Count the beats in a bar.', 'Clap the rhythm.', 'Spot any syncopation.'] }
      ],
      vocabulary: [
        { word: 'metre', meaning: 'The grouping of beats.', example: 'The metre is 4/4.' },
        { word: 'syncopation', meaning: 'Accents off the main beat.', example: 'Syncopation drives the groove.' },
        { word: 'duration', meaning: 'How long a note lasts.', example: 'Duration shapes rhythm.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a time signature show?', options: ['Beats per bar', 'The key', 'The tempo only'], answer: 0, why: 'It shows how beats are grouped.' },
        { type: 'multiple_choice', question: 'What is syncopation?', options: ['Accents off the beat', 'A slow tempo', 'A loud chord'], answer: 0, why: 'Syncopation displaces accents.' },
        { type: 'multiple_choice', question: 'What is duration?', options: ['How long a note lasts', 'How high it is', 'How loud it is'], answer: 0, why: 'Duration is note length.' }
      ]
    }, {
      id: 'upper-secondary-music-m1-l2',
      order: 2,
      title: 'Melody and Harmony',
      objective: 'I can explain how melody and harmony interact in a piece.',
      minutes: 10,
      recap: 'You explained how melody and harmony interact in a piece.',
      blocks: [
        { type: 'text', body: 'A melody is a succession of pitches; harmony is the simultaneous combination of pitches.' },
        { type: 'text', body: 'Chords can support, colour, or conflict with a melody.' },
        { type: 'text', body: 'Cadences create points of rest or tension at the end of phrases.' },
        { type: 'tip', body: 'Listen to the bass line to hear the harmonic foundation.' },
        {
          type: 'illustration',
          alt: 'A page of musical score with notes on staves.',
          image: 'assets/3d/musical-score-3d.png',
          placeholder: 'Score: melody, chords, and cadence.'
        },
        { type: 'example', steps: ['Identify the melody.', 'Listen for the chords beneath.', 'Find the cadence.', 'Describe the effect.'] }
      ],
      vocabulary: [
        { word: 'melody', meaning: 'A sequence of pitches.', example: 'The melody rises.' },
        { word: 'harmony', meaning: 'Pitches sounding together.', example: 'The harmony is rich.' },
        { word: 'cadence', meaning: 'A closing harmonic move.', example: 'The cadence feels final.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is harmony?', options: ['Pitches sounding together', 'A single melody', 'A drum pattern'], answer: 0, why: 'Harmony combines simultaneous pitches.' },
        { type: 'multiple_choice', question: 'What is a cadence?', options: ['A closing harmonic move', 'A type of drum', 'A repeated note'], answer: 0, why: 'Cadences end phrases.' },
        { type: 'multiple_choice', question: 'What can chords do to a melody?', options: ['Support or colour it', 'Replace it always', 'Remove it'], answer: 0, why: 'Chords shape a melody’s effect.' }
      ]
    }, {
      id: 'upper-secondary-music-m1-l3',
      order: 3,
      title: 'Structure and Form',
      objective: 'I can identify common musical forms and their sections.',
      minutes: 10,
      recap: 'You identified common musical forms and their sections.',
      blocks: [
        { type: 'text', body: 'Form is the overall shape of a piece; common forms include binary, ternary, and verse–chorus.' },
        { type: 'text', body: 'Sections are often labelled with letters, such as A and B, to show repetition and contrast.' },
        { type: 'text', body: 'A bridge or development section introduces new material before a return.' },
        { type: 'tip', body: 'Track the sections while listening and note where ideas repeat.' },
        {
          type: 'illustration',
          alt: 'Two black musical notes joined together.',
          image: 'assets/3d/musical-notes-3d.png',
          placeholder: 'Notes: sections, repetition, and musical form.'
        },
        { type: 'example', steps: ['Listen to the opening.', 'Label it section A.', 'Note the contrasting section B.', 'Mark the return of A.'] }
      ],
      vocabulary: [
        { word: 'form', meaning: 'The overall shape of a piece.', example: 'The form is ternary.' },
        { word: 'section', meaning: 'A distinct part of a piece.', example: 'Section B contrasts.' },
        { word: 'binary', meaning: 'A two-part form.', example: 'Binary form has A and B.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is form?', options: ['The overall shape of a piece', 'The speed', 'The volume'], answer: 0, why: 'Form describes how sections are arranged.' },
        { type: 'multiple_choice', question: 'What does ternary form use?', options: ['A–B–A', 'A only', 'No sections'], answer: 0, why: 'Ternary returns to the opening section.' },
        { type: 'multiple_choice', question: 'Why label sections?', options: ['To show repetition and contrast', 'To tune instruments', 'To set the tempo'], answer: 0, why: 'Labels reveal a piece’s structure.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Music in Context',
    description: 'Culture, performance, and music technology. Draft content.',
    lessons: [{
      id: 'upper-secondary-music-m2-l1',
      order: 1,
      title: 'Music and Culture',
      objective: 'I can discuss how music reflects culture and identity.',
      minutes: 10,
      recap: 'You discussed how music reflects culture and identity.',
      blocks: [
        { type: 'text', body: 'Music carries cultural meaning through instruments, scales, lyrics, and performance traditions.' },
        { type: 'text', body: 'Communities use music for celebration, mourning, worship, and protest.' },
        { type: 'text', body: 'Global exchange blends traditions, which can enrich music and raise questions about ownership.' },
        { type: 'tip', body: 'Ask who performs a style, for whom, and in what setting.' },
        {
          type: 'illustration',
          alt: 'A folded world map with blue oceans.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'World map: music, tradition, and cultural exchange.'
        },
        { type: 'example', steps: ['Choose a musical tradition.', 'Identify its instruments and setting.', 'Explain its role.', 'Consider how it has travelled.'] }
      ],
      vocabulary: [
        { word: 'culture', meaning: 'Shared beliefs and customs.', example: 'Music expresses culture.' },
        { word: 'tradition', meaning: 'A practice passed down.', example: 'The song is a tradition.' },
        { word: 'fusion', meaning: 'A blend of styles.', example: 'The band creates a fusion.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can music express?', options: ['Culture and identity', 'Only volume', 'Only tempo'], answer: 0, why: 'Music carries cultural meaning.' },
        { type: 'multiple_choice', question: 'Why do communities use music?', options: ['For celebration and mourning', 'Only for profit', 'Only for exercise'], answer: 0, why: 'Music marks important moments.' },
        { type: 'multiple_choice', question: 'What is fusion?', options: ['A blend of styles', 'A single note', 'A type of drum'], answer: 0, why: 'Fusion combines musical traditions.' }
      ]
    }, {
      id: 'upper-secondary-music-m2-l2',
      order: 2,
      title: 'Performance',
      objective: 'I can evaluate a performance using musical criteria.',
      minutes: 10,
      recap: 'You evaluated a performance using musical criteria.',
      blocks: [
        { type: 'text', body: 'Evaluation considers accuracy, balance, expression, and ensemble.' },
        { type: 'text', body: 'Performers communicate with an audience through timing, dynamics, and stage presence.' },
        { type: 'text', body: 'Feedback should be specific and focused on what can improve.' },
        { type: 'tip', body: 'Use musical vocabulary rather than “good” or “bad”.' },
        {
          type: 'illustration',
          alt: 'A silver microphone on a stand.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: accuracy, expression, and ensemble.'
        },
        { type: 'example', steps: ['Watch a performance.', 'Note the accuracy and balance.', 'Describe the expression.', 'Suggest one clear improvement.'] }
      ],
      vocabulary: [
        { word: 'ensemble', meaning: 'A group performing together.', example: 'The ensemble stayed together.' },
        { word: 'dynamics', meaning: 'How loud or quiet music is.', example: 'The dynamics varied well.' },
        { word: 'evaluate', meaning: 'Judge with evidence.', example: 'Evaluate the performance.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does evaluation consider?', options: ['Accuracy and expression', 'Only clothes', 'Only ticket price'], answer: 0, why: 'Musical criteria guide evaluation.' },
        { type: 'multiple_choice', question: 'What are dynamics?', options: ['Loud and quiet levels', 'High and low notes', 'Fast and slow speeds'], answer: 0, why: 'Dynamics describe volume.' },
        { type: 'multiple_choice', question: 'How should feedback be?', options: ['Specific and focused', 'Vague and general', 'Only praise'], answer: 0, why: 'Specific feedback helps improvement.' }
      ]
    }, {
      id: 'upper-secondary-music-m2-l3',
      order: 3,
      title: 'Music and Technology',
      objective: 'I can explain how technology changes how music is made and heard.',
      minutes: 10,
      recap: 'You explained how technology changes how music is made and heard.',
      blocks: [
        { type: 'text', body: 'Recording, editing, and digital instruments let musicians shape sound precisely.' },
        { type: 'text', body: 'Streaming and social media change how audiences discover and share music.' },
        { type: 'text', body: 'Technology raises questions about credit, ownership, and fair payment.' },
        { type: 'tip', body: 'Compare a live recording with a studio version to hear the editing.' },
        {
          type: 'illustration',
          alt: 'A pair of blue over-ear headphones.',
          image: 'assets/3d/headphone-3d.png',
          placeholder: 'Headphones: recording, streaming, and digital sound.'
        },
        { type: 'example', steps: ['Record a short phrase.', 'Edit the timing.', 'Add a digital instrument.', 'Compare it with the live take.'] }
      ],
      vocabulary: [
        { word: 'digital', meaning: 'Stored or made by computer.', example: 'The track uses digital instruments.' },
        { word: 'streaming', meaning: 'Playing media online.', example: 'Streaming changed listening habits.' },
        { word: 'edit', meaning: 'Change a recording after capture.', example: 'They edit the vocal track.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can technology change?', options: ['How music is made and heard', 'Only the price', 'Only the venue'], answer: 0, why: 'Technology shapes production and listening.' },
        { type: 'multiple_choice', question: 'What is streaming?', options: ['Playing media online', 'Recording to tape', 'Printing scores'], answer: 0, why: 'Streaming delivers music over the internet.' },
        { type: 'multiple_choice', question: 'What question does technology raise?', options: ['Credit and fair payment', 'Only volume', 'Only tempo'], answer: 0, why: 'Digital music raises ownership questions.' }
      ]
    }]
  }];
}());

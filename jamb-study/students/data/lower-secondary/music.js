/* Lower Secondary Music — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'music');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Elements of Music',
    description: 'Pulse, pitch, harmony, and texture in practice. Draft content.',
    lessons: [{
      id: 'lower-secondary-music-m1-l1',
      order: 1,
      title: 'Pulse and Metre',
      objective: 'I can identify metre and keep a steady pulse in a group.',
      minutes: 9,
      recap: 'You identified metre and kept a steady pulse in a group.',
      blocks: [
        { type: 'text', body: 'Metre groups beats into bars, such as three beats or four beats per bar.' },
        { type: 'text', body: 'A conductor or drummer helps a group stay together.' },
        { type: 'text', body: 'Accents on the first beat make the metre easy to hear.' },
        { type: 'tip', body: 'Count the beats in a bar while you listen.' },
        {
          type: 'illustration',
          alt: 'A red drum with wooden sticks.',
          image: 'assets/3d/drum-3d.png',
          placeholder: 'Drum: accent, pulse, and metre.'
        },
        { type: 'example', steps: ['Listen for the strong beat.', 'Count beats until the pattern repeats.', 'Name the metre.', 'Clap the accents together.'] }
      ],
      vocabulary: [
        { word: 'metre', meaning: 'How beats are grouped into bars.', example: 'The metre is four beats.' },
        { word: 'bar', meaning: 'A group of beats.', example: 'The phrase lasts two bars.' },
        { word: 'accent', meaning: 'A stronger beat.', example: 'The accent falls on beat one.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does metre describe?', options: ['How beats are grouped', 'How loud music is', 'What instruments play'], answer: 0, why: 'Metre groups beats into bars.' },
        { type: 'multiple_choice', question: 'Which beat is often accented?', options: ['The first', 'The last only', 'None'], answer: 0, why: 'The first beat often carries the accent.' },
        { type: 'multiple_choice', question: 'Why count beats?', options: ['To identify the metre', 'To tune an instrument', 'To write lyrics'], answer: 0, why: 'Counting reveals the pattern.' }
      ]
    }, {
      id: 'lower-secondary-music-m1-l2',
      order: 2,
      title: 'Pitch and Melody',
      objective: 'I can describe how pitch and melody shape a piece of music.',
      minutes: 9,
      recap: 'You described how pitch and melody shape a piece of music.',
      blocks: [
        { type: 'text', body: 'Pitch is how high or low a note sounds; melody is a sequence of pitches.' },
        { type: 'text', body: 'Melodies often move by steps or leaps and may rise or fall.' },
        { type: 'text', body: 'A hook is a memorable melodic phrase that listeners remember.' },
        { type: 'tip', body: 'Hum a melody back to test whether you can hear its shape.' },
        {
          type: 'illustration',
          alt: 'Two black musical notes joined together.',
          image: 'assets/3d/musical-notes-3d.png',
          placeholder: 'Notes: pitch, steps, and melodic shape.'
        },
        { type: 'example', steps: ['Listen to a short tune.', 'Hum it back.', 'Mark where it rises.', 'Describe the shape.'] }
      ],
      vocabulary: [
        { word: 'pitch', meaning: 'How high or low a note is.', example: 'The pitch rises.' },
        { word: 'melody', meaning: 'A sequence of notes.', example: 'The melody is catchy.' },
        { word: 'phrase', meaning: 'A short musical idea.', example: 'The phrase repeats.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is melody?', options: ['A sequence of pitches', 'A drum beat', 'A type of chord'], answer: 0, why: 'Melody is a sequence of notes.' },
        { type: 'multiple_choice', question: 'What is a step in a melody?', options: ['Moving to a nearby note', 'Jumping far', 'Stopping'], answer: 0, why: 'Steps move to neighbouring pitches.' },
        { type: 'multiple_choice', question: 'What is a hook?', options: ['A memorable phrase', 'A loud drum', 'A rest'], answer: 0, why: 'Hooks are easy to remember.' }
      ]
    }, {
      id: 'lower-secondary-music-m1-l3',
      order: 3,
      title: 'Harmony and Texture',
      objective: 'I can explain how harmony and texture change a piece.',
      minutes: 9,
      recap: 'You explained how harmony and texture change a piece.',
      blocks: [
        { type: 'text', body: 'Harmony is notes sounded together; a chord combines several notes.' },
        { type: 'text', body: 'Texture describes how many layers are heard and how they relate.' },
        { type: 'text', body: 'Thick texture has many parts; thin texture has few.' },
        { type: 'tip', body: 'Listen for whether the music feels full or sparse.' },
        {
          type: 'illustration',
          alt: 'A page of musical score with notes on staves.',
          image: 'assets/3d/musical-score-3d.png',
          placeholder: 'Score: chords, layers, and musical texture.'
        },
        { type: 'example', steps: ['Listen to a chord.', 'Add a second part.', 'Hear the texture thicken.', 'Remove a part to thin it.'] }
      ],
      vocabulary: [
        { word: 'harmony', meaning: 'Notes sounded together.', example: 'The harmony supports the tune.' },
        { word: 'chord', meaning: 'Several notes played together.', example: 'Play a major chord.' },
        { word: 'texture', meaning: 'How layers of sound combine.', example: 'The texture is thick.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is harmony?', options: ['Notes sounded together', 'A single note', 'A type of drum'], answer: 0, why: 'Harmony combines notes.' },
        { type: 'multiple_choice', question: 'What is a chord?', options: ['Several notes together', 'A repeated rhythm', 'A rest'], answer: 0, why: 'Chords are groups of notes.' },
        { type: 'multiple_choice', question: 'What does texture describe?', options: ['How layers combine', 'How fast the piece is', 'What key it is in'], answer: 0, why: 'Texture is the layering of sound.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Performing and Creating',
    description: 'Orchestral instruments, performance, and composing. Draft content.',
    lessons: [{
      id: 'lower-secondary-music-m2-l1',
      order: 1,
      title: 'Instruments of the Orchestra',
      objective: 'I can group orchestral instruments by family.',
      minutes: 9,
      recap: 'You grouped orchestral instruments by family.',
      blocks: [
        { type: 'text', body: 'Orchestral families are strings, woodwind, brass, and percussion.' },
        { type: 'text', body: 'Each family shares a way of producing sound and a characteristic timbre.' },
        { type: 'text', body: 'Instruments can play different roles: melody, harmony, bass, or rhythm.' },
        { type: 'tip', body: 'Listen to one family at a time to recognise its sound.' },
        {
          type: 'illustration',
          alt: 'A wooden violin with strings and bow.',
          image: 'assets/3d/violin-3d.png',
          placeholder: 'Violin: the string family and its timbre.'
        },
        { type: 'example', steps: ['Listen to a string section.', 'Identify the violins.', 'Listen for the brass entry.', 'Name each family you hear.'] }
      ],
      vocabulary: [
        { word: 'orchestra', meaning: 'A large group of instrumentalists.', example: 'The orchestra tuned up.' },
        { word: 'family', meaning: 'A group of similar instruments.', example: 'Strings are one family.' },
        { word: 'timbre', meaning: 'The character of a sound.', example: 'Brass has a bright timbre.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a string instrument?', options: ['Violin', 'Trumpet', 'Flute'], answer: 0, why: 'Violins belong to the string family.' },
        { type: 'multiple_choice', question: 'How many main orchestral families are there?', options: ['Four', 'Two', 'Ten'], answer: 0, why: 'Strings, woodwind, brass, and percussion.' },
        { type: 'multiple_choice', question: 'What is timbre?', options: ['Sound character', 'Speed', 'Volume only'], answer: 0, why: 'Timbre distinguishes instruments.' }
      ]
    }, {
      id: 'lower-secondary-music-m2-l2',
      order: 2,
      title: 'Singing and Performing',
      objective: 'I can perform with confidence and good technique.',
      minutes: 9,
      recap: 'You performed with confidence and good technique.',
      blocks: [
        { type: 'text', body: 'Good singing starts with posture, relaxed breathing, and clear diction.' },
        { type: 'text', body: 'Performers communicate meaning through expression, not volume alone.' },
        { type: 'text', body: 'Rehearsing in small sections builds confidence and accuracy.' },
        { type: 'tip', body: 'Practise performing to one person before a larger group.' },
        {
          type: 'illustration',
          alt: 'A silver microphone on a stand.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: posture, breath, and expression.'
        },
        { type: 'example', steps: ['Stand tall and relax your shoulders.', 'Breathe from the diaphragm.', 'Sing a short phrase clearly.', 'Add expression.'] }
      ],
      vocabulary: [
        { word: 'posture', meaning: 'How you hold your body.', example: 'Good posture helps singing.' },
        { word: 'diction', meaning: 'Clear pronunciation in singing.', example: 'Clear diction helps the audience.' },
        { word: 'expression', meaning: 'Communicating feeling in performance.', example: 'Add expression to the phrase.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What helps singing?', options: ['Good posture and breathing', 'Shouting', 'Holding your breath'], answer: 0, why: 'Posture and breath support the voice.' },
        { type: 'multiple_choice', question: 'What is diction?', options: ['Clear pronunciation', 'Loud volume', 'Fast tempo'], answer: 0, why: 'Diction makes words clear.' },
        { type: 'multiple_choice', question: 'Why rehearse in sections?', options: ['To build accuracy', 'To skip practice', 'To sing louder'], answer: 0, why: 'Small sections are easier to master.' }
      ]
    }, {
      id: 'lower-secondary-music-m2-l3',
      order: 3,
      title: 'Composing Music',
      objective: 'I can compose a short piece with a clear structure.',
      minutes: 10,
      recap: 'You composed a short piece with a clear structure.',
      blocks: [
        { type: 'text', body: 'Composing starts with an idea: a rhythm, melody, chord pattern, or mood.' },
        { type: 'text', body: 'Structure organises ideas into sections, such as verse and chorus.' },
        { type: 'text', body: 'Contrast and repetition make a piece interesting and memorable.' },
        { type: 'tip', body: 'Record your ideas and label the sections as you build.' },
        {
          type: 'illustration',
          alt: 'A memo pad with lines and a pencil.',
          image: 'assets/3d/memo-3d.png',
          placeholder: 'Memo pad: capturing and organising musical ideas.'
        },
        { type: 'example', steps: ['Choose a mood.', 'Create a four-bar rhythm.', 'Add a contrasting section.', 'Repeat the opening idea.'] }
      ],
      vocabulary: [
        { word: 'compose', meaning: 'Create music.', example: 'We compose a short piece.' },
        { word: 'structure', meaning: 'How sections are arranged.', example: 'The structure has two parts.' },
        { word: 'contrast', meaning: 'A noticeable difference.', example: 'The quiet section adds contrast.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can start a composition?', options: ['A rhythm or melody', 'A price list', 'A costume'], answer: 0, why: 'Composers begin with a musical idea.' },
        { type: 'multiple_choice', question: 'What does structure organise?', options: ['Sections of a piece', 'The audience', 'The instruments only'], answer: 0, why: 'Structure arranges musical sections.' },
        { type: 'multiple_choice', question: 'Why use contrast?', options: ['To keep listeners interested', 'To make it louder', 'To shorten it'], answer: 0, why: 'Contrast adds variety and shape.' }
      ]
    }]
  }];
}());

/* Primary Music — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'music');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Sound and Rhythm',
    description: 'Beat, rhythm, and singing for young musicians. Draft content.',
    lessons: [{
      id: 'primary-music-m1-l1',
      order: 1,
      title: 'Pulse and Beat',
      objective: 'I can find and keep a steady pulse in music.',
      minutes: 7,
      recap: 'You found and kept a steady pulse in music.',
      blocks: [
        { type: 'text', body: 'The pulse is the steady beat that runs through a piece of music.' },
        { type: 'text', body: 'You can feel the pulse by clapping or tapping your foot.' },
        { type: 'text', body: 'Some music is fast and some is slow, but the pulse stays even.' },
        { type: 'tip', body: 'Count 1, 2, 3, 4 aloud to keep the pulse steady.' },
        {
          type: 'illustration',
          alt: 'A red drum with wooden sticks.',
          image: 'assets/3d/drum-3d.png',
          placeholder: 'Drum: a steady pulse you can feel.'
        },
        { type: 'example', steps: ['Listen to a song.', 'Tap the beat on your knee.', 'Count four beats again and again.', 'Keep the pulse steady.'] }
      ],
      vocabulary: [
        { word: 'pulse', meaning: 'The steady beat in music.', example: 'Clap the pulse.' },
        { word: 'tempo', meaning: 'How fast or slow music is.', example: 'The tempo is slow.' },
        { word: 'steady', meaning: 'Even and unchanging.', example: 'Keep a steady beat.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is the pulse?', options: ['The steady beat', 'The words', 'The volume'], answer: 0, why: 'The pulse is the steady beat.' },
        { type: 'multiple_choice', question: 'How can you feel the pulse?', options: ['Tap your foot', 'Cover your ears', 'Close your eyes'], answer: 0, why: 'Tapping helps you feel the beat.' },
        { type: 'multiple_choice', question: 'What is tempo?', options: ['How fast or slow', 'How loud', 'How high'], answer: 0, why: 'Tempo is the speed of the music.' }
      ]
    }, {
      id: 'primary-music-m1-l2',
      order: 2,
      title: 'Rhythm and Pattern',
      objective: 'I can clap simple rhythm patterns.',
      minutes: 7,
      recap: 'You clapped simple rhythm patterns.',
      blocks: [
        { type: 'text', body: 'Rhythm is the pattern of long and short sounds.' },
        { type: 'text', body: 'A rhythm can be clapped, spoken, or played on an instrument.' },
        { type: 'text', body: 'Repeating a rhythm makes a pattern that is easy to remember.' },
        { type: 'tip', body: 'Say the rhythm before you clap it.' },
        {
          type: 'illustration',
          alt: 'Two black musical notes joined together.',
          image: 'assets/3d/musical-notes-3d.png',
          placeholder: 'Musical notes: long and short sounds.'
        },
        { type: 'example', steps: ['Say “long, short, short”.', 'Clap the same pattern.', 'Repeat it three times.', 'Keep the pulse underneath.'] }
      ],
      vocabulary: [
        { word: 'rhythm', meaning: 'A pattern of sounds.', example: 'Clap this rhythm.' },
        { word: 'pattern', meaning: 'A repeated design.', example: 'The rhythm is a pattern.' },
        { word: 'repeat', meaning: 'Do something again.', example: 'Repeat the pattern.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is rhythm?', options: ['A pattern of sounds', 'A type of drum', 'A loud noise'], answer: 0, why: 'Rhythm is a pattern of long and short sounds.' },
        { type: 'multiple_choice', question: 'How can you show a rhythm?', options: ['Clap it', 'Draw it', 'Smell it'], answer: 0, why: 'Rhythms can be clapped or played.' },
        { type: 'multiple_choice', question: 'Why repeat a rhythm?', options: ['It is easier to remember', 'It gets louder', 'It changes key'], answer: 0, why: 'Repetition makes patterns memorable.' }
      ]
    }, {
      id: 'primary-music-m1-l3',
      order: 3,
      title: 'Singing Together',
      objective: 'I can sing with others and follow a leader.',
      minutes: 7,
      recap: 'You sang with others and followed a leader.',
      blocks: [
        { type: 'text', body: 'Singing together needs listening as well as using your voice.' },
        { type: 'text', body: 'A leader can show when to start, stop, and change volume.' },
        { type: 'text', body: 'Warm up your voice gently before singing.' },
        { type: 'tip', body: 'Breathe calmly and sing without shouting.' },
        {
          type: 'illustration',
          alt: 'A silver microphone on a stand.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: singing, listening, and leading.'
        },
        { type: 'example', steps: ['Stand tall and breathe.', 'Follow the leader’s hand.', 'Sing the first line together.', 'Listen and stay together.'] }
      ],
      vocabulary: [
        { word: 'sing', meaning: 'Make music with your voice.', example: 'We sing together.' },
        { word: 'leader', meaning: 'The person who guides the group.', example: 'Watch the leader.' },
        { word: 'volume', meaning: 'How loud or quiet a sound is.', example: 'Lower the volume.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do singers need to do?', options: ['Listen and sing', 'Only shout', 'Only dance'], answer: 0, why: 'Good singing needs listening.' },
        { type: 'multiple_choice', question: 'What does a leader show?', options: ['When to start and stop', 'What to eat', 'Where to sit'], answer: 0, why: 'Leaders guide the group.' },
        { type: 'multiple_choice', question: 'How should you warm up?', options: ['Gently', 'By shouting', 'By holding your breath'], answer: 0, why: 'Gentle warm-ups protect the voice.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Instruments and Listening',
    description: 'Instruments, listening, and making your own music. Draft content.',
    lessons: [{
      id: 'primary-music-m2-l1',
      order: 1,
      title: 'Instruments',
      objective: 'I can name instruments and describe how they make sound.',
      minutes: 8,
      recap: 'You named instruments and described how they make sound.',
      blocks: [
        { type: 'text', body: 'Instruments make sound by vibrating: strings, skins, air, or metal.' },
        { type: 'text', body: 'A guitar uses strings; a drum uses a stretched skin.' },
        { type: 'text', body: 'Different instruments have different timbres, or sound colours.' },
        { type: 'tip', body: 'Listen for the material that is vibrating.' },
        {
          type: 'illustration',
          alt: 'A wooden acoustic guitar with strings.',
          image: 'assets/3d/guitar-3d.png',
          placeholder: 'Guitar: strings vibrating to make sound.'
        },
        { type: 'example', steps: ['Pluck a guitar string.', 'Watch it vibrate.', 'Hear the sound.', 'Stop the string to change the note.'] }
      ],
      vocabulary: [
        { word: 'vibrate', meaning: 'Move quickly back and forth.', example: 'Strings vibrate to make sound.' },
        { word: 'instrument', meaning: 'An object used to make music.', example: 'A drum is an instrument.' },
        { word: 'timbre', meaning: 'The character of a sound.', example: 'Each instrument has a timbre.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How do instruments make sound?', options: ['By vibrating', 'By shining', 'By growing'], answer: 0, why: 'Vibration creates sound.' },
        { type: 'multiple_choice', question: 'Which instrument uses strings?', options: ['Guitar', 'Drum', 'Flute'], answer: 0, why: 'A guitar has vibrating strings.' },
        { type: 'multiple_choice', question: 'What is timbre?', options: ['The character of a sound', 'The speed of a song', 'The size of a room'], answer: 0, why: 'Timbre is the character of a sound.' }
      ]
    }, {
      id: 'primary-music-m2-l2',
      order: 2,
      title: 'Hearing Music',
      objective: 'I can listen carefully and describe what I hear.',
      minutes: 7,
      recap: 'You listened carefully and described what you hear.',
      blocks: [
        { type: 'text', body: 'Active listening means paying attention to instruments, speed, and loudness.' },
        { type: 'text', body: 'Music can be loud or quiet, high or low, smooth or detached.' },
        { type: 'text', body: 'Listening again often reveals details you missed the first time.' },
        { type: 'tip', body: 'Close your eyes and pick out one instrument to follow.' },
        {
          type: 'illustration',
          alt: 'A pair of blue over-ear headphones.',
          image: 'assets/3d/headphone-3d.png',
          placeholder: 'Headphones: focused, active listening.'
        },
        { type: 'example', steps: ['Play a short piece.', 'Listen for the main instrument.', 'Notice the speed and volume.', 'Describe what changed.'] }
      ],
      vocabulary: [
        { word: 'listen', meaning: 'Pay attention to sound.', example: 'Listen to the melody.' },
        { word: 'pitch', meaning: 'How high or low a sound is.', example: 'The pitch rises.' },
        { word: 'describe', meaning: 'Say what something is like.', example: 'Describe the music.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is active listening?', options: ['Paying close attention', 'Hearing without focus', 'Talking over music'], answer: 0, why: 'Active listening is focused attention.' },
        { type: 'multiple_choice', question: 'What does pitch describe?', options: ['High and low sounds', 'Fast and slow', 'Loud and quiet'], answer: 0, why: 'Pitch is how high or low a sound is.' },
        { type: 'multiple_choice', question: 'Why listen again?', options: ['To notice more detail', 'To make it louder', 'To change the song'], answer: 0, why: 'Repeated listening reveals more.' }
      ]
    }, {
      id: 'primary-music-m2-l3',
      order: 3,
      title: 'Making Music',
      objective: 'I can create a short piece using pulse, rhythm, and voice.',
      minutes: 8,
      recap: 'You created a short piece using pulse, rhythm, and voice.',
      blocks: [
        { type: 'text', body: 'A short piece can combine a steady pulse, a repeated rhythm, and a simple melody.' },
        { type: 'text', body: 'Musicians choose a starting sound, then add and change layers.' },
        { type: 'text', body: 'Practising slowly helps a group stay together.' },
        { type: 'tip', body: 'Record your idea so you can remember and improve it.' },
        {
          type: 'illustration',
          alt: 'A page of musical score with notes on staves.',
          image: 'assets/3d/musical-score-3d.png',
          placeholder: 'Score: writing down a musical idea.'
        },
        { type: 'example', steps: ['Set a steady pulse.', 'Clap a short rhythm.', 'Add a sung melody.', 'Repeat and improve it.'] }
      ],
      vocabulary: [
        { word: 'compose', meaning: 'Create a piece of music.', example: 'We compose a short piece.' },
        { word: 'melody', meaning: 'A tune of single notes.', example: 'Sing the melody.' },
        { word: 'layer', meaning: 'A part added to others.', example: 'Add a rhythm layer.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can a short piece combine?', options: ['Pulse, rhythm, and melody', 'Only noise', 'Only words'], answer: 0, why: 'These elements build a piece.' },
        { type: 'multiple_choice', question: 'Why practise slowly?', options: ['To stay together', 'To finish early', 'To sing louder'], answer: 0, why: 'Slow practice improves coordination.' },
        { type: 'multiple_choice', question: 'Why record an idea?', options: ['To remember and improve it', 'To make it longer', 'To hide it'], answer: 0, why: 'Recordings support revision.' }
      ]
    }]
  }];
}());

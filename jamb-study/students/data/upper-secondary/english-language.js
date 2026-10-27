/* GCSE English Language — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english-language');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading and Analysis',
    description: 'Close reading, language analysis, and comparing two texts with evidence. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-language-m1-l1',
      order: 1,
      title: 'Close Reading of Fiction',
      objective: 'I can analyse how a writer shapes meaning through close reading.',
      minutes: 10,
      recap: 'You read closely and explained how details build meaning.',
      blocks: [
        { type: 'text', body: 'Read the passage twice: once for the story, once for the craft.' },
        { type: 'text', body: 'Track shifts in mood, pace, and focus, and ask why they happen.' },
        { type: 'text', body: 'Select short quotations that carry weight rather than long blocks.' },
        { type: 'tip', body: 'Zoom in on a single word or image, then widen out to the whole passage.' },
        {
          type: 'illustration',
          alt: 'An open novel with a bookmark resting across a marked page.',
          image: 'assets/3d/open_book-3d.png',
          placeholder: 'Open novel: close reading from a single word to the whole passage.'
        },
        { type: 'example', steps: ['Notice: the sentences shorten as the storm begins.', 'Zoom: “cracked” suggests sudden damage.', 'Widen: pace and word choice both create panic.'] }
      ],
      vocabulary: [
        { word: 'close reading', meaning: 'Careful study of a short passage', example: 'Close reading reveals how the tension builds.' },
        { word: 'connotation', meaning: 'An idea a word suggests', example: 'The word snakes has a sinister connotation.' },
        { word: 'nuance', meaning: 'A subtle difference in meaning', example: 'The nuance changes how we judge the character.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a second reading focus on?', options: ['How the writer shapes meaning', 'The page number', 'The author’s birthday'], answer: 0, why: 'A second reading moves from story to craft.' },
        { type: 'multiple_choice', question: 'Why choose a short quotation?', options: ['It fills more space', 'It lets you analyse each word closely', 'It avoids explaining'], answer: 1, why: 'Short quotations give room for precise analysis.' },
        { type: 'multiple_choice', question: 'Sentences shorten and verbs become harsh. What effect is likely?', options: ['Growing tension and urgency', 'Calm reflection', 'Gentle humour'], answer: 0, why: 'Short, harsh sentences speed up pace and raise tension.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m1-l2',
      order: 2,
      title: 'Analysing Language and Structure',
      objective: 'I can explain how language and structure create effects on the reader.',
      minutes: 10,
      recap: 'You analysed language choices and structural shifts for effect.',
      blocks: [
        { type: 'text', body: 'Language analysis names a technique, quotes it, and explains the effect.' },
        { type: 'text', body: 'Structure is the order of ideas: openings, shifts, repetition, and endings.' },
        { type: 'text', body: 'Link every effect back to the reader’s experience or the writer’s purpose.' },
        { type: 'tip', body: 'Avoid technique spotting. One well-explained choice beats five named devices.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass enlarging a single printed phrase.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Magnifier: name the choice, quote it, explain the effect.'
        },
        { type: 'example', steps: ['Choice: the writer repeats “again”.', 'Effect: the repetition feels trapped and hopeless.', 'Purpose: it persuades us to pity the speaker.'] }
      ],
      vocabulary: [
        { word: 'structure', meaning: 'The order and arrangement of a text', example: 'The circular structure returns to the opening.' },
        { word: 'effect', meaning: 'The impact a choice has on readers', example: 'The short sentence creates shock.' },
        { word: 'motif', meaning: 'A repeated image or idea', example: 'The river is a motif throughout the novel.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What must follow a quotation in language analysis?', options: ['An explanation of its effect', 'A longer quotation', 'A new paragraph'], answer: 0, why: 'Analysis explains how the words shape meaning.' },
        { type: 'multiple_choice', question: 'Which is a structural feature?', options: ['A simile in one line', 'A shift in time midway through', 'A three-syllable word'], answer: 1, why: 'Structure concerns the arrangement and order of the text.' },
        { type: 'multiple_choice', question: 'A writer repeats “never” three times. What is the likely effect?', options: ['Emphasis and finality', 'Confusion', 'Comedy'], answer: 0, why: 'Repetition stresses the point and closes down hope.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m1-l3',
      order: 3,
      title: 'Comparing Two Texts',
      objective: 'I can compare two texts, explaining similarities and differences with evidence.',
      minutes: 10,
      recap: 'You compared two texts and supported each point with evidence.',
      blocks: [
        { type: 'text', body: 'Read both texts with the same question in mind before you compare.' },
        { type: 'text', body: 'Compare ideas, tone, and method, not just topic.' },
        { type: 'text', body: 'Use connectives such as similarly, whereas, and in contrast.' },
        { type: 'tip', body: 'Balance your response. Give both texts equal attention.' },
        {
          type: 'illustration',
          alt: 'A brass balance scale with two even pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Balance scale: two texts weighed side by side.'
        },
        { type: 'example', steps: ['Both texts describe city life.', 'Text A is admiring, whereas Text B is critical.', 'Text B uses statistics; Text A uses imagery.'] }
      ],
      vocabulary: [
        { word: 'compare', meaning: 'Show similarities and differences', example: 'Compare the two openings.' },
        { word: 'contrast', meaning: 'Show how things differ', example: 'The contrast in tone is striking.' },
        { word: 'perspective', meaning: 'A viewpoint on an issue', example: 'Each writer offers a different perspective.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a comparison cover?', options: ['Ideas, tone, and method', 'Only the topic', 'Only the titles'], answer: 0, why: 'Strong comparison analyses how each text works.' },
        { type: 'multiple_choice', question: 'Which connective signals a difference?', options: ['similarly', 'whereas', 'also'], answer: 1, why: 'Whereas introduces a contrast.' },
        { type: 'multiple_choice', question: 'Text A uses facts; Text B uses images. What is this a comparison of?', options: ['Method', 'Topic', 'Audience'], answer: 0, why: 'Facts and imagery are different techniques or methods.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing',
    description: 'Description, narrative, and persuasive writing shaped for a clear purpose. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-language-m2-l1',
      order: 1,
      title: 'Descriptive Writing',
      objective: 'I can write description that uses precise imagery and varied sentences.',
      minutes: 10,
      recap: 'You used precise imagery and varied sentences to describe a place.',
      blocks: [
        { type: 'text', body: 'Choose a clear viewpoint and keep it consistent throughout.' },
        { type: 'text', body: 'Use sensory detail, but select two or three strong images rather than listing everything.' },
        { type: 'text', body: 'Vary sentence length. A short sentence can sharpen a key moment.' },
        { type: 'tip', body: 'Avoid clichés. Test each image: could it belong to any place?' },
        {
          type: 'illustration',
          alt: 'An artist’s palette with bright dabs of paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: precise sensory images painting a scene.'
        },
        { type: 'example', steps: ['Start wide: the market hums under striped awnings.', 'Zoom in: lemons glow beside a cracked blue bowl.', 'Close with a short sentence: Then silence.'] }
      ],
      vocabulary: [
        { word: 'imagery', meaning: 'Language that creates pictures in the mind', example: 'The imagery of heat makes the market vivid.' },
        { word: 'sensory', meaning: 'Relating to sight, sound, smell, taste, or touch', example: 'Sensory detail brings the scene alive.' },
        { word: 'viewpoint', meaning: 'The position from which a scene is described', example: 'Keep a consistent viewpoint.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What makes description effective?', options: ['Selected, precise images', 'Every possible detail', 'Long words only'], answer: 0, why: 'Careful selection creates a clearer picture than a list.' },
        { type: 'multiple_choice', question: 'Why vary sentence length?', options: ['To fill the page', 'To avoid paragraphs', 'To control pace and emphasis'], answer: 2, why: 'Short sentences can slow or sharpen a moment.' },
        { type: 'multiple_choice', question: 'Which line is the strongest sensory image?', options: ['Lemons glow beside a cracked blue bowl.', 'It was a nice market.', 'There were many things.'], answer: 0, why: 'It gives specific visual detail the reader can picture.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m2-l2',
      order: 2,
      title: 'Narrative Writing',
      objective: 'I can shape a narrative with a clear structure and controlled pace.',
      minutes: 10,
      recap: 'You shaped a narrative with a clear structure and deliberate pace.',
      blocks: [
        { type: 'text', body: 'Begin near the moment of change, not with a long explanation.' },
        { type: 'text', body: 'Use a clear sequence: setup, complication, climax, resolution.' },
        { type: 'text', body: 'Show emotion through action and detail rather than naming it.' },
        { type: 'tip', body: 'Plan the ending first so the whole story points toward it.' },
        {
          type: 'illustration',
          alt: 'A weathered scroll holding a handwritten story.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: a story shaped from setup to resolution.'
        },
        { type: 'example', steps: ['Setup: a girl waits at an empty station.', 'Complication: the last train is cancelled.', 'Resolution: she walks home and notices the town.'] }
      ],
      vocabulary: [
        { word: 'narrative', meaning: 'A story with events and characters', example: 'The narrative follows one night.' },
        { word: 'climax', meaning: 'The moment of greatest tension', example: 'The climax comes at the station.' },
        { word: 'resolution', meaning: 'How the story settles at the end', example: 'The resolution feels quiet but hopeful.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where should a short narrative often begin?', options: ['Near the moment of change', 'With a family history', 'With the ending'], answer: 0, why: 'Starting close to the action hooks the reader.' },
        { type: 'multiple_choice', question: 'How can a writer show fear?', options: ['Through shaking hands and short breaths', 'By writing “she was scared”', 'By listing fears'], answer: 0, why: 'Actions let readers infer emotion.' },
        { type: 'multiple_choice', question: 'What is the climax?', options: ['The opening description', 'The point of greatest tension', 'The final sentence'], answer: 1, why: 'The climax is the peak moment the story builds toward.' }
      ]
    }, {
      id: 'upper-secondary-english-language-m2-l3',
      order: 3,
      title: 'Writing to Argue and Persuade',
      objective: 'I can argue a clear position using structure, evidence, and persuasive devices.',
      minutes: 10,
      recap: 'You argued a clear position using evidence and persuasive structure.',
      blocks: [
        { type: 'text', body: 'Open with a decisive claim, then signpost your main reasons.' },
        { type: 'text', body: 'Build each paragraph around one reason, supported by evidence.' },
        { type: 'text', body: 'Address the counterargument fairly, then show why your position is stronger.' },
        { type: 'tip', body: 'Rhetoric must serve the argument. Do not let devices replace evidence.' },
        {
          type: 'illustration',
          alt: 'A silver microphone standing before a seated audience.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: a speech built on claim, reasons, and proof.'
        },
        { type: 'example', steps: ['Claim: school start times should be later.', 'Evidence: sleep research shows teenagers need nine hours.', 'Rebuttal: early buses can be rescheduled.'] }
      ],
      vocabulary: [
        { word: 'argue', meaning: 'Present reasons for a position', example: 'We argue for a later start.' },
        { word: 'counterargument', meaning: 'The opposing view', example: 'Answer the counterargument directly.' },
        { word: 'rhetoric', meaning: 'Language used to persuade', example: 'Her rhetoric is calm but firm.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should open a persuasive speech?', options: ['A clear claim', 'A long story', 'A list of names'], answer: 0, why: 'A claim tells the audience what you will argue.' },
        { type: 'multiple_choice', question: 'How should a counterargument be treated?', options: ['Acknowledged and answered', 'Ignored completely', 'Repeated as fact'], answer: 0, why: 'Answering it makes your own case more convincing.' },
        { type: 'multiple_choice', question: 'Which is evidence rather than rhetoric?', options: ['Sleep research shows teenagers need nine hours.', 'Everyone knows mornings are hard.', 'Imagine a better day.'], answer: 0, why: 'Research findings can be checked and evaluated.' }
      ]
    }]
  }];
}());

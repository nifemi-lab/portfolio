/* GCSE Art & Design — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'art');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Visual Language',
    description: 'Formal elements, observation, and composition at GCSE. Draft content.',
    lessons: [{
      id: 'upper-secondary-art-m1-l1',
      order: 1,
      title: 'Formal Elements',
      objective: 'I can analyse how formal elements create meaning in an artwork.',
      minutes: 10,
      recap: 'You analysed how formal elements create meaning in an artwork.',
      blocks: [
        { type: 'text', body: 'The formal elements are line, tone, colour, shape, form, texture, pattern, and space.' },
        { type: 'text', body: 'Artists combine these elements deliberately; a change in one alters the whole effect.' },
        { type: 'text', body: 'Analysis moves from description to effect: what is there, and how does it make you respond?' },
        { type: 'tip', body: 'Use precise vocabulary instead of “nice” or “interesting”.' },
        {
          type: 'illustration',
          alt: 'A wooden artist palette with dabs of paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: formal elements working together.'
        },
        { type: 'example', steps: ['Describe the dominant colours.', 'Note the strongest contrast.', 'Explain what draws your eye.', 'Link the effect to the subject.'] }
      ],
      vocabulary: [
        { word: 'formal elements', meaning: 'The basic visual components.', example: 'Tone is a formal element.' },
        { word: 'analyse', meaning: 'Break something down to understand it.', example: 'Analyse the composition.' },
        { word: 'dominant', meaning: 'The most noticeable element.', example: 'Blue is the dominant colour.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a formal element?', options: ['Tone', 'Opinion', 'Price'], answer: 0, why: 'Tone is one of the formal elements.' },
        { type: 'multiple_choice', question: 'What should analysis include?', options: ['Description and effect', 'Only the title', 'Only the price'], answer: 0, why: 'Analysis links what you see to its effect.' },
        { type: 'multiple_choice', question: 'Why avoid vague words?', options: ['Precise vocabulary explains more', 'They are too long', 'They are unkind'], answer: 0, why: 'Precise terms communicate clearly.' }
      ]
    }, {
      id: 'upper-secondary-art-m1-l2',
      order: 2,
      title: 'Observation and Drawing',
      objective: 'I can use observation to improve accuracy in drawing.',
      minutes: 10,
      recap: 'You used observation to improve accuracy in drawing.',
      blocks: [
        { type: 'text', body: 'Observational drawing starts with looking: at edges, angles, proportions, and negative space.' },
        { type: 'text', body: 'Measuring with a pencil or comparing landmarks helps correct errors.' },
        { type: 'text', body: 'Draw lightly at first, then strengthen the lines you trust.' },
        { type: 'tip', body: 'Turn the reference and your drawing upside down to see shapes freshly.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil with a sharp graphite tip.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: looking closely, measuring, and refining.'
        },
        { type: 'example', steps: ['Set up a simple object.', 'Measure its height and width.', 'Sketch the outline lightly.', 'Refine the proportions.'] }
      ],
      vocabulary: [
        { word: 'proportion', meaning: 'The size of parts relative to each other.', example: 'Check the proportions carefully.' },
        { word: 'landmark', meaning: 'A point used for alignment.', example: 'Use the table edge as a landmark.' },
        { word: 'accuracy', meaning: 'How close a drawing is to reality.', example: 'Observation improves accuracy.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does observational drawing begin with?', options: ['Careful looking', 'Colouring', 'Framing'], answer: 0, why: 'Observation starts with looking closely.' },
        { type: 'multiple_choice', question: 'Why measure proportions?', options: ['To keep sizes accurate', 'To choose a title', 'To mix paint'], answer: 0, why: 'Proportion compares parts to the whole.' },
        { type: 'multiple_choice', question: 'Why start lightly?', options: ['So errors are easy to adjust', 'To save paper', 'To finish faster'], answer: 0, why: 'Light lines let you refine safely.' }
      ]
    }, {
      id: 'upper-secondary-art-m1-l3',
      order: 3,
      title: 'Composition and Colour',
      objective: 'I can compose an image using balance, contrast, and colour.',
      minutes: 10,
      recap: 'You composed an image using balance, contrast, and colour.',
      blocks: [
        { type: 'text', body: 'Composition organises a frame; balance can be symmetrical, asymmetrical, or radial.' },
        { type: 'text', body: 'Colour can create mood and guide attention, especially through complementary contrast.' },
        { type: 'text', body: 'Cropping and viewpoint change what the viewer sees and how they feel about it.' },
        { type: 'tip', body: 'Plan two or three thumbnails before committing to a final composition.' },
        {
          type: 'illustration',
          alt: 'A framed landscape painting of hills and sun.',
          image: 'assets/3d/framed-picture-3d.png',
          placeholder: 'Framed picture: composition, colour, and viewpoint.'
        },
        { type: 'example', steps: ['Sketch three thumbnail layouts.', 'Choose the strongest focal point.', 'Test warm and cool colour choices.', 'Refine the final composition.'] }
      ],
      vocabulary: [
        { word: 'balance', meaning: 'A sense of visual stability.', example: 'The frame feels balanced.' },
        { word: 'viewpoint', meaning: 'Where the viewer is positioned.', example: 'A low viewpoint feels dramatic.' },
        { word: 'complementary', meaning: 'Colours opposite each other.', example: 'Blue and orange are complementary.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is asymmetrical balance?', options: ['Unequal but stable arrangement', 'Perfect mirroring', 'Random placement'], answer: 0, why: 'Asymmetry balances visual weight.' },
        { type: 'multiple_choice', question: 'What can complementary colours do?', options: ['Create strong contrast', 'Always match', 'Remove detail'], answer: 0, why: 'Opposite colours intensify each other.' },
        { type: 'multiple_choice', question: 'Why change viewpoint?', options: ['It changes the feel of a scene', 'It dries paint', 'It sizes the frame'], answer: 0, why: 'Viewpoint shapes how a scene is read.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Art and Design Practice',
    description: 'The design process, materials, and culture. Draft content.',
    lessons: [{
      id: 'upper-secondary-art-m2-l1',
      order: 1,
      title: 'The Design Process',
      objective: 'I can describe the stages of a design process from brief to evaluation.',
      minutes: 10,
      recap: 'You described the stages of a design process from brief to evaluation.',
      blocks: [
        { type: 'text', body: 'A design brief states the problem, the user, and the constraints.' },
        { type: 'text', body: 'Designers research, generate ideas, develop a prototype, and test it with users.' },
        { type: 'text', body: 'Evaluation compares the outcome with the brief and identifies improvements.' },
        { type: 'tip', body: 'Record each stage; examiners value evidence of iteration.' },
        {
          type: 'illustration',
          alt: 'A clear straight ruler with marked measurements.',
          image: 'assets/3d/straight-ruler-3d.png',
          placeholder: 'Ruler: specification, accuracy, and iteration.'
        },
        { type: 'example', steps: ['Read the brief carefully.', 'Research the user and materials.', 'Build and test a prototype.', 'Evaluate against the brief.'] }
      ],
      vocabulary: [
        { word: 'brief', meaning: 'A statement of the design problem.', example: 'The brief sets the limits.' },
        { word: 'constraint', meaning: 'A limit on the design.', example: 'Cost is a constraint.' },
        { word: 'iteration', meaning: 'A repeated cycle of improvement.', example: 'Iteration improved the grip.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a brief include?', options: ['Problem, user, and constraints', 'Only a colour', 'Only a price'], answer: 0, why: 'A brief defines the design task.' },
        { type: 'multiple_choice', question: 'Why test a prototype?', options: ['To find problems early', 'To finish quickly', 'To avoid users'], answer: 0, why: 'Testing reveals what needs improving.' },
        { type: 'multiple_choice', question: 'What is iteration?', options: ['Repeating and improving', 'Copying once', 'Giving up'], answer: 0, why: 'Iteration is a cycle of refinement.' }
      ]
    }, {
      id: 'upper-secondary-art-m2-l2',
      order: 2,
      title: 'Materials and Techniques',
      objective: 'I can choose materials and techniques suited to a design purpose.',
      minutes: 10,
      recap: 'You chose materials and techniques suited to a design purpose.',
      blocks: [
        { type: 'text', body: 'Materials have properties: strength, weight, flexibility, cost, and environmental impact.' },
        { type: 'text', body: 'Techniques such as cutting, joining, moulding, and printing suit different materials.' },
        { type: 'text', body: 'Choosing well means matching properties to the job the product must do.' },
        { type: 'tip', body: 'Compare two materials against the same criteria before deciding.' },
        {
          type: 'illustration',
          alt: 'A large stone moai head sculpture.',
          image: 'assets/3d/moai-3d.png',
          placeholder: 'Stone: material properties and carving technique.'
        },
        { type: 'example', steps: ['Define what the product must do.', 'List two possible materials.', 'Compare strength and cost.', 'Choose and justify one.'] }
      ],
      vocabulary: [
        { word: 'property', meaning: 'A characteristic of a material.', example: 'Flexibility is a property.' },
        { word: 'durable', meaning: 'Able to last a long time.', example: 'Stone is durable.' },
        { word: 'technique', meaning: 'A method of making.', example: 'Carving is a technique.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a material property?', options: ['Flexibility', 'Popularity', 'Taste'], answer: 0, why: 'Properties describe material behaviour.' },
        { type: 'multiple_choice', question: 'What should guide material choice?', options: ['The job it must do', 'Only the colour', 'Only fashion'], answer: 0, why: 'Properties must match the purpose.' },
        { type: 'multiple_choice', question: 'What is a technique?', options: ['A making method', 'A type of user', 'A shop'], answer: 0, why: 'Techniques are ways of working.' }
      ]
    }, {
      id: 'upper-secondary-art-m2-l3',
      order: 3,
      title: 'Art, Craft, and Culture',
      objective: 'I can discuss how art reflects and challenges culture.',
      minutes: 10,
      recap: 'You discussed how art reflects and challenges culture.',
      blocks: [
        { type: 'text', body: 'Art can preserve traditions, record history, and express shared identity.' },
        { type: 'text', body: 'It can also challenge power, question norms, and imagine alternatives.' },
        { type: 'text', body: 'Museums and galleries shape which works are seen, so curation carries influence.' },
        { type: 'tip', body: 'Ask who made a work, for whom, and who might be missing from the story.' },
        {
          type: 'illustration',
          alt: 'A folded world map with blue oceans.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'World map: art, identity, and cultural exchange.'
        },
        { type: 'example', steps: ['Choose a cultural artwork.', 'Identify its maker and audience.', 'Consider what it celebrates or questions.', 'Compare responses across cultures.'] }
      ],
      vocabulary: [
        { word: 'culture', meaning: 'Shared beliefs, customs, and arts.', example: 'Art expresses culture.' },
        { word: 'curation', meaning: 'Selecting works for display.', example: 'Curation shapes what we see.' },
        { word: 'identity', meaning: 'Who a person or group is.', example: 'Art can express identity.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can art do for culture?', options: ['Preserve and challenge it', 'Only copy it', 'Only sell it'], answer: 0, why: 'Art both reflects and questions culture.' },
        { type: 'multiple_choice', question: 'Why does curation matter?', options: ['It shapes which works are seen', 'It dries paint', 'It sets prices only'], answer: 0, why: 'Curators influence public understanding.' },
        { type: 'multiple_choice', question: 'What should viewers ask?', options: ['Who made it and for whom', 'Only its price', 'Only its size'], answer: 0, why: 'Context and audience shape meaning.' }
      ]
    }]
  }];
}());

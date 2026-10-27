/* Primary Design & Technology — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'design-technology');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Design and Make',
    description: 'Planning, materials, and joining things safely. Draft content.',
    lessons: [{
      id: 'primary-design-technology-m1-l1',
      order: 1,
      title: 'What Is Design?',
      objective: 'I can explain what design is and why it matters.',
      minutes: 7,
      recap: 'You explained what design is and why it matters.',
      blocks: [
        { type: 'text', body: 'Design means planning something before you make it.' },
        { type: 'text', body: 'Designers think about what a thing must do and who will use it.' },
        { type: 'text', body: 'Good design is useful, safe, and pleasant to look at.' },
        { type: 'tip', body: 'Ask who will use it and what it must do.' },
        {
          type: 'illustration',
          alt: 'A clear plastic ruler with marked measurements.',
          image: 'assets/3d/straight-ruler-3d.png',
          placeholder: 'Ruler: measuring before making.'
        },
        { type: 'example', steps: ['Decide what you will make.', 'Draw a simple plan.', 'Choose your materials.', 'Make it and test it.'] }
      ],
      vocabulary: [
        { word: 'design', meaning: 'Planning how something will be made.', example: 'My design shows a toy car.' },
        { word: 'plan', meaning: 'A drawing or list that guides making.', example: 'Draw a plan first.' },
        { word: 'material', meaning: 'What a thing is made from.', example: 'Wood is a strong material.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does design mean?', options: ['Planning before making', 'Painting a wall', 'Counting money'], answer: 0, why: 'Design is planning before you make.' },
        { type: 'multiple_choice', question: 'Who should designers think about?', options: ['The people who use it', 'Only themselves', 'The weather'], answer: 0, why: 'Good design suits its users.' },
        { type: 'multiple_choice', question: 'What makes good design?', options: ['Useful, safe, and pleasant', 'Loud and bright', 'Big and heavy'], answer: 0, why: 'Use, safety, and looks all matter.' }
      ]
    }, {
      id: 'primary-design-technology-m1-l2',
      order: 2,
      title: 'Materials',
      objective: 'I can choose a suitable material for a simple make.',
      minutes: 7,
      recap: 'You chose a suitable material for a simple make.',
      blocks: [
        { type: 'text', body: 'Wood, fabric, plastic, and metal are common materials.' },
        { type: 'text', body: 'Each material feels and behaves differently.' },
        { type: 'text', body: 'Choose a material that suits the job it must do.' },
        { type: 'tip', body: 'Test a small scrap before you build.' },
        {
          type: 'illustration',
          alt: 'A stack of wooden planks with visible grain.',
          image: 'assets/3d/wood-3d.png',
          placeholder: 'Wood: a strong, natural building material.'
        },
        { type: 'example', steps: ['Decide what the object must do.', 'Compare two materials.', 'Choose the stronger one.', 'Check it is safe to use.'] }
      ],
      vocabulary: [
        { word: 'material', meaning: 'What something is made from.', example: 'Cloth is a soft material.' },
        { word: 'strength', meaning: 'How well a material holds a load.', example: 'Test the strength of wood.' },
        { word: 'flexible', meaning: 'Able to bend without breaking.', example: 'Rubber is flexible.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a common material?', options: ['Wood', 'Cloud', 'Music'], answer: 0, why: 'Wood is used to build things.' },
        { type: 'multiple_choice', question: 'Why compare materials?', options: ['To pick the best one', 'To make noise', 'To waste time'], answer: 0, why: 'Comparing shows which works best.' },
        { type: 'multiple_choice', question: 'What should a material suit?', options: ['The job it must do', 'The colour of shoes', 'The day of the week'], answer: 0, why: 'The job decides the best material.' }
      ]
    }, {
      id: 'primary-design-technology-m1-l3',
      order: 3,
      title: 'Joining and Fixing',
      objective: 'I can describe ways to join materials safely.',
      minutes: 7,
      recap: 'You described ways to join materials safely.',
      blocks: [
        { type: 'text', body: 'Parts can be joined with glue, tape, screws, or hinges.' },
        { type: 'text', body: 'Screws hold firmly and can be undone later.' },
        { type: 'text', body: 'Some tools are sharp, so an adult must help.' },
        { type: 'tip', body: 'Ask an adult before using sharp tools.' },
        {
          type: 'illustration',
          alt: 'A red-handled screwdriver with a metal tip.',
          image: 'assets/3d/screwdriver-3d.png',
          placeholder: 'Screwdriver: joining with screws.'
        },
        { type: 'example', steps: ['Mark where the parts meet.', 'Make a small hole.', 'Turn the screw slowly.', 'Check the join is firm.'] }
      ],
      vocabulary: [
        { word: 'join', meaning: 'To fix two parts together.', example: 'Join the two boards.' },
        { word: 'screw', meaning: 'A metal pin turned into wood.', example: 'Turn the screw gently.' },
        { word: 'hinge', meaning: 'A joint that lets a door swing.', example: 'The hinge lets it open.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which joins two parts?', options: ['Glue', 'A window', 'A song'], answer: 0, why: 'Glue sticks parts together.' },
        { type: 'multiple_choice', question: 'Why use screws instead of glue?', options: ['They can be undone', 'They are sweeter', 'They are invisible'], answer: 0, why: 'Screws can be removed later.' },
        { type: 'multiple_choice', question: 'What should you do before using sharp tools?', options: ['Ask an adult', 'Run quickly', 'Close your eyes'], answer: 0, why: 'An adult keeps tool use safe.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Moving and Making',
    description: 'Wheels, structures, and improving your design. Draft content.',
    lessons: [{
      id: 'primary-design-technology-m2-l1',
      order: 1,
      title: 'Wheels and Axles',
      objective: 'I can explain how wheels and axles help things move.',
      minutes: 8,
      recap: 'You explained how wheels and axles help things move.',
      blocks: [
        { type: 'text', body: 'A wheel turns around a rod called an axle.' },
        { type: 'text', body: 'Wheels reduce friction so a load moves easily.' },
        { type: 'text', body: 'Two wheels and one axle make a simple cart.' },
        { type: 'tip', body: 'Check that the wheels turn freely.' },
        {
          type: 'illustration',
          alt: 'A silver metal gear with teeth around the edge.',
          image: 'assets/3d/gear-3d.png',
          placeholder: 'Gear: turning motion and movement.'
        },
        { type: 'example', steps: ['Cut two cardboard wheels.', 'Push a straw through the middle.', 'Tape the wheels on.', 'Roll the cart along.'] }
      ],
      vocabulary: [
        { word: 'axle', meaning: 'The rod a wheel turns around.', example: 'The straw is the axle.' },
        { word: 'friction', meaning: 'A force that slows sliding.', example: 'Wheels reduce friction.' },
        { word: 'wheel', meaning: 'A round part that turns.', example: 'The cart has four wheels.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a wheel turn around?', options: ['An axle', 'A handle', 'A string'], answer: 0, why: 'The axle is the wheel’s centre rod.' },
        { type: 'multiple_choice', question: 'Why do wheels help loads move?', options: ['They reduce friction', 'They add weight', 'They stop turning'], answer: 0, why: 'Less friction means easier movement.' },
        { type: 'multiple_choice', question: 'What makes a simple cart?', options: ['Two wheels and an axle', 'One flat board', 'A single screw'], answer: 0, why: 'Wheels on an axle roll along.' }
      ]
    }, {
      id: 'primary-design-technology-m2-l2',
      order: 2,
      title: 'Simple Structures',
      objective: 'I can describe how simple structures stay strong.',
      minutes: 8,
      recap: 'You described how simple structures stay strong.',
      blocks: [
        { type: 'text', body: 'A structure holds a load without falling down.' },
        { type: 'text', body: 'Triangles are strong because their sides cannot move.' },
        { type: 'text', body: 'Beams and columns carry weight safely.' },
        { type: 'tip', body: 'Test your structure with a small weight.' },
        {
          type: 'illustration',
          alt: 'A stack of red clay bricks.',
          image: 'assets/3d/brick-3d.png',
          placeholder: 'Brick: strong shapes in a structure.'
        },
        { type: 'example', steps: ['Build a square frame.', 'Push a corner and watch it bend.', 'Add a diagonal brace.', 'Push again: it stays firm.'] }
      ],
      vocabulary: [
        { word: 'structure', meaning: 'Something built to hold a load.', example: 'The bridge is a structure.' },
        { word: 'beam', meaning: 'A long bar that carries weight.', example: 'The beam spans the gap.' },
        { word: 'brace', meaning: 'A part that stops movement.', example: 'Add a brace to the corner.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a structure do?', options: ['Holds a load', 'Makes a sound', 'Changes colour'], answer: 0, why: 'Structures carry weight safely.' },
        { type: 'multiple_choice', question: 'Which shape is strongest?', options: ['Triangle', 'Circle', 'Open square'], answer: 0, why: 'A triangle’s sides cannot move.' },
        { type: 'multiple_choice', question: 'What does a brace do?', options: ['Stops a corner moving', 'Adds paint', 'Makes it heavier'], answer: 0, why: 'A brace holds the shape firm.' }
      ]
    }, {
      id: 'primary-design-technology-m2-l3',
      order: 3,
      title: 'Testing and Improving',
      objective: 'I can test a design and improve one thing.',
      minutes: 7,
      recap: 'You tested a design and improved one thing.',
      blocks: [
        { type: 'text', body: 'Testing shows whether a design works.' },
        { type: 'text', body: 'Find the weakest part before you change anything.' },
        { type: 'text', body: 'Change one thing, then test again.' },
        { type: 'tip', body: 'Change one thing at a time.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass with a blue rim.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Magnifying glass: looking closely at faults.'
        },
        { type: 'example', steps: ['Test the first version.', 'Notice the wobbly part.', 'Add a stronger brace.', 'Test again and compare.'] }
      ],
      vocabulary: [
        { word: 'test', meaning: 'To check whether something works.', example: 'Test the cart on a ramp.' },
        { word: 'improve', meaning: 'To make something better.', example: 'Improve the weak corner.' },
        { word: 'fault', meaning: 'A part that does not work.', example: 'Find the fault first.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why test a design?', options: ['To see if it works', 'To make it pretty', 'To copy it'], answer: 0, why: 'Testing shows what works.' },
        { type: 'multiple_choice', question: 'How many things should you change at once?', options: ['One', 'Five', 'All of them'], answer: 0, why: 'One change shows what helped.' },
        { type: 'multiple_choice', question: 'What is a fault?', options: ['A part that fails', 'A new idea', 'A type of glue'], answer: 0, why: 'A fault stops the design working.' }
      ]
    }]
  }];
}());

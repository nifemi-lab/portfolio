/* Lower Secondary Design & Technology — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'design-technology');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Design Process',
    description: 'The design cycle, research, and sketching ideas. Draft content.',
    lessons: [{
      id: 'lower-secondary-design-technology-m1-l1',
      order: 1,
      title: 'The Design Cycle',
      objective: 'I can describe the stages of the design cycle.',
      minutes: 8,
      recap: 'You described the stages of the design cycle.',
      blocks: [
        { type: 'text', body: 'Designers follow a cycle: investigate, design, make, then evaluate.' },
        { type: 'text', body: 'The cycle repeats because each evaluation shows what to improve next.' },
        { type: 'text', body: 'Working in order keeps a project organised and reduces wasted material.' },
        { type: 'tip', body: 'Write down each stage so you can see your progress.' },
        {
          type: 'illustration',
          alt: 'Two blue arrows forming a circle.',
          image: 'assets/3d/counterclockwise-arrows-button-3d.png',
          placeholder: 'Cycle: investigate, design, make, evaluate.'
        },
        { type: 'example', steps: ['Investigate the problem.', 'Sketch a design.', 'Make a model.', 'Evaluate it and improve.'] }
      ],
      vocabulary: [
        { word: 'iterate', meaning: 'Repeat a process to improve it.', example: 'Iterate after each test.' },
        { word: 'prototype', meaning: 'A first working model.', example: 'Build a cardboard prototype.' },
        { word: 'evaluate', meaning: 'Judge how well something works.', example: 'Evaluate the finished model.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which stage comes first?', options: ['Investigate', 'Evaluate', 'Make'], answer: 0, why: 'Investigation defines the problem.' },
        { type: 'multiple_choice', question: 'Why does the cycle repeat?', options: ['To improve the design', 'To use more material', 'To finish faster'], answer: 0, why: 'Evaluation reveals improvements.' },
        { type: 'multiple_choice', question: 'What does evaluation do?', options: ['Judges how well it works', 'Sells the product', 'Names the maker'], answer: 0, why: 'Evaluation tests success against needs.' }
      ]
    }, {
      id: 'lower-secondary-design-technology-m1-l2',
      order: 2,
      title: 'Research and Specification',
      objective: 'I can turn research into a clear specification.',
      minutes: 8,
      recap: 'You turned research into a clear specification.',
      blocks: [
        { type: 'text', body: 'Research gathers facts about users, materials, and existing products.' },
        { type: 'text', body: 'A design brief states the problem in one short paragraph.' },
        { type: 'text', body: 'A specification lists the requirements the product must meet.' },
        { type: 'tip', body: 'Make every requirement measurable or testable.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass with a blue rim.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Research: finding facts before designing.'
        },
        { type: 'example', steps: ['Interview a user.', 'Note their main needs.', 'Write a short brief.', 'List testable requirements.'] }
      ],
      vocabulary: [
        { word: 'brief', meaning: 'A short statement of the design problem.', example: 'The brief asks for a lamp.' },
        { word: 'specification', meaning: 'A list of requirements a product must meet.', example: 'The specification sets the size.' },
        { word: 'constraint', meaning: 'A limit on the design.', example: 'Cost is a constraint.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a design brief state?', options: ['The problem', 'The price', 'The maker’s name'], answer: 0, why: 'A brief defines the design problem.' },
        { type: 'multiple_choice', question: 'What belongs in a specification?', options: ['Testable requirements', 'Only colours', 'A story'], answer: 0, why: 'Specifications list measurable needs.' },
        { type: 'multiple_choice', question: 'What is a constraint?', options: ['A limit on the design', 'A type of glue', 'A finished product'], answer: 0, why: 'Constraints restrict the options.' }
      ]
    }, {
      id: 'lower-secondary-design-technology-m1-l3',
      order: 3,
      title: 'Sketching Ideas',
      objective: 'I can sketch ideas and label the important parts.',
      minutes: 8,
      recap: 'You sketched ideas and labelled the important parts.',
      blocks: [
        { type: 'text', body: 'Designers sketch many quick ideas before choosing one.' },
        { type: 'text', body: 'Annotated sketches carry labels explaining materials and features.' },
        { type: 'text', body: 'Isometric drawing shows three sides of an object at once.' },
        { type: 'tip', body: 'Keep sketches light so you can adjust them.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil with a sharp tip.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: quick sketches and labels.'
        },
        { type: 'example', steps: ['Sketch six quick ideas.', 'Pick two strong ones.', 'Label the parts.', 'Add notes on materials.'] }
      ],
      vocabulary: [
        { word: 'annotate', meaning: 'Add labels and notes to a drawing.', example: 'Annotate the sketch clearly.' },
        { word: 'isometric', meaning: 'A drawing showing three sides.', example: 'Use isometric view for the box.' },
        { word: 'thumbnail', meaning: 'A small, quick sketch.', example: 'Draw six thumbnails first.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why sketch many ideas?', options: ['To find the best one', 'To waste paper', 'To skip planning'], answer: 0, why: 'Many ideas lead to better choices.' },
        { type: 'multiple_choice', question: 'What does annotate mean?', options: ['Add labels and notes', 'Erase the work', 'Colour it in'], answer: 0, why: 'Annotations explain the drawing.' },
        { type: 'multiple_choice', question: 'What does an isometric drawing show?', options: ['Three sides at once', 'Only the top', 'A flat shadow'], answer: 0, why: 'Isometric shows depth on paper.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Materials and Systems',
    description: 'Materials, mechanisms, and sustainable choices. Draft content.',
    lessons: [{
      id: 'lower-secondary-design-technology-m2-l1',
      order: 1,
      title: 'Materials and Properties',
      objective: 'I can match materials to the properties a product needs.',
      minutes: 8,
      recap: 'You matched materials to the properties a product needs.',
      blocks: [
        { type: 'text', body: 'Wood, metal, plastic, and textiles have different properties.' },
        { type: 'text', body: 'Strength, flexibility, and hardness decide where a material is useful.' },
        { type: 'text', body: 'Designers also consider cost, weight, and how a material ages.' },
        { type: 'tip', body: 'Compare samples before committing to a material.' },
        {
          type: 'illustration',
          alt: 'A stack of red clay bricks.',
          image: 'assets/3d/brick-3d.png',
          placeholder: 'Brick: properties of a building material.'
        },
        { type: 'example', steps: ['List the product’s needs.', 'Compare three materials.', 'Choose the best match.', 'Test a small sample.'] }
      ],
      vocabulary: [
        { word: 'property', meaning: 'A quality a material has.', example: 'Strength is a property.' },
        { word: 'durability', meaning: 'How long something lasts.', example: 'Metal has good durability.' },
        { word: 'malleable', meaning: 'Able to be shaped by pressure.', example: 'Warm clay is malleable.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are properties?', options: ['Qualities of a material', 'Prices only', 'Colours only'], answer: 0, why: 'Properties describe how materials behave.' },
        { type: 'multiple_choice', question: 'What does durability measure?', options: ['How long it lasts', 'How it smells', 'How heavy it is'], answer: 0, why: 'Durability is lasting strength.' },
        { type: 'multiple_choice', question: 'Why compare samples?', options: ['To choose sensibly', 'To collect them', 'To fill time'], answer: 0, why: 'Samples reveal real behaviour.' }
      ]
    }, {
      id: 'lower-secondary-design-technology-m2-l2',
      order: 2,
      title: 'Mechanisms',
      objective: 'I can explain how levers, gears, and pulleys change motion.',
      minutes: 8,
      recap: 'You explained how levers, gears, and pulleys change motion.',
      blocks: [
        { type: 'text', body: 'A lever turns a small force into a larger one.' },
        { type: 'text', body: 'Gears transfer motion between shafts and can change speed.' },
        { type: 'text', body: 'A pulley changes the direction of a pulling force.' },
        { type: 'tip', body: 'Count gear teeth to compare turning speeds.' },
        {
          type: 'illustration',
          alt: 'A silver metal gear with teeth around the edge.',
          image: 'assets/3d/gear-3d.png',
          placeholder: 'Gear: turning motion and speed.'
        },
        { type: 'example', steps: ['Fix a lever on a pivot.', 'Push the long end.', 'Watch the short end lift.', 'Measure the movement.'] }
      ],
      vocabulary: [
        { word: 'lever', meaning: 'A bar that turns on a pivot.', example: 'A beam is a lever.' },
        { word: 'pivot', meaning: 'The point a lever turns around.', example: 'The pin is the pivot.' },
        { word: 'pulley', meaning: 'A wheel that guides a rope.', example: 'The pulley lifts the bucket.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a lever do?', options: ['Magnifies force', 'Makes light', 'Cools air'], answer: 0, why: 'A lever turns force into movement.' },
        { type: 'multiple_choice', question: 'What do gears transfer?', options: ['Motion', 'Water', 'Sound'], answer: 0, why: 'Gears pass motion between shafts.' },
        { type: 'multiple_choice', question: 'What does a pulley change?', options: ['Direction of pull', 'Colour', 'Weight'], answer: 0, why: 'A pulley redirects the force.' }
      ]
    }, {
      id: 'lower-secondary-design-technology-m2-l3',
      order: 3,
      title: 'Sustainability and Evaluation',
      objective: 'I can judge a product’s impact on the environment.',
      minutes: 8,
      recap: 'You judged a product’s impact on the environment.',
      blocks: [
        { type: 'text', body: 'Every product uses energy and materials from the planet.' },
        { type: 'text', body: 'Designers reduce waste by reusing parts and choosing recyclable materials.' },
        { type: 'text', body: 'A life-cycle check follows a product from raw material to disposal.' },
        { type: 'tip', body: 'Ask where materials come from and where they go.' },
        {
          type: 'illustration',
          alt: 'A young green seedling in brown soil.',
          image: 'assets/3d/seedling-3d.png',
          placeholder: 'Seedling: sustainable design choices.'
        },
        { type: 'example', steps: ['List the product’s materials.', 'Find where each comes from.', 'Check what happens at disposal.', 'Suggest one greener choice.'] }
      ],
      vocabulary: [
        { word: 'sustainable', meaning: 'Able to continue without harming the future.', example: 'Use sustainable timber.' },
        { word: 'recycle', meaning: 'Process waste into new material.', example: 'Recycle the packaging.' },
        { word: 'life cycle', meaning: 'Every stage of a product’s existence.', example: 'Check the whole life cycle.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a life-cycle check follow?', options: ['Every stage of a product', 'Only the price', 'Only the colour'], answer: 0, why: 'It covers material to disposal.' },
        { type: 'multiple_choice', question: 'How can designers reduce waste?', options: ['Reuse and recycle', 'Add packaging', 'Use more glue'], answer: 0, why: 'Reuse and recycling cut waste.' },
        { type: 'multiple_choice', question: 'What does sustainable mean?', options: ['Able to continue safely', 'Cheap to buy', 'Easy to break'], answer: 0, why: 'Sustainable choices protect the future.' }
      ]
    }]
  }];
}());

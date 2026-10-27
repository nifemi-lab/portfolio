/* Lower Secondary Art & Design — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'art');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Elements of Art',
    description: 'Line, tone, colour, and texture in two dimensions. Draft content.',
    lessons: [{
      id: 'lower-secondary-art-m1-l1',
      order: 1,
      title: 'Line and Tone',
      objective: 'I can use line and tone to create depth in a drawing.',
      minutes: 9,
      recap: 'You used line and tone to create depth in a drawing.',
      blocks: [
        { type: 'text', body: 'Line describes edges and movement; tone describes how light or dark an area is.' },
        { type: 'text', body: 'Artists build tone with shading, hatching, and gradual blending.' },
        { type: 'text', body: 'Contrast between light and dark can make a flat drawing look three-dimensional.' },
        { type: 'tip', body: 'Squint at your drawing to check the balance of light and dark.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil with a sharp graphite tip.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: line, shading, and contrast.'
        },
        { type: 'example', steps: ['Outline a sphere lightly.', 'Shade the side away from the light.', 'Blend the middle tones.', 'Add a shadow underneath.'] }
      ],
      vocabulary: [
        { word: 'tone', meaning: 'How light or dark something is.', example: 'Add tone to show depth.' },
        { word: 'contrast', meaning: 'A strong difference between tones.', example: 'High contrast looks dramatic.' },
        { word: 'blend', meaning: 'Smoothly join two tones.', example: 'Blend the shading softly.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does tone describe?', options: ['Light and dark', 'Sound', 'Smell'], answer: 0, why: 'Tone is lightness or darkness.' },
        { type: 'multiple_choice', question: 'How can a drawing look three-dimensional?', options: ['Use light and dark contrast', 'Use one flat colour', 'Avoid shadows'], answer: 0, why: 'Contrast creates the illusion of depth.' },
        { type: 'multiple_choice', question: 'What is blending?', options: ['Smoothing tones together', 'Cutting paper', 'Tracing'], answer: 0, why: 'Blending creates gradual shading.' }
      ]
    }, {
      id: 'lower-secondary-art-m1-l2',
      order: 2,
      title: 'Colour and Composition',
      objective: 'I can explain how colour and composition guide the eye.',
      minutes: 9,
      recap: 'You explained how colour and composition guide the eye.',
      blocks: [
        { type: 'text', body: 'Colour can be warm or cool, and complementary colours sit opposite each other on the wheel.' },
        { type: 'text', body: 'Composition is how shapes, colours, and space are arranged within a frame.' },
        { type: 'text', body: 'Artists use focal points, balance, and negative space to guide attention.' },
        { type: 'tip', body: 'Try a quick thumbnail sketch before starting a larger piece.' },
        {
          type: 'illustration',
          alt: 'A wooden artist palette with dabs of paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: colour choices and visual balance.'
        },
        { type: 'example', steps: ['Choose a main subject.', 'Place it off-centre for interest.', 'Use a strong colour as a focal point.', 'Leave quiet space around it.'] }
      ],
      vocabulary: [
        { word: 'composition', meaning: 'The arrangement of a picture.', example: 'The composition feels balanced.' },
        { word: 'focal point', meaning: 'The part you notice first.', example: 'The red boat is the focal point.' },
        { word: 'negative space', meaning: 'Empty space around a subject.', example: 'Negative space gives breathing room.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is composition?', options: ['How a picture is arranged', 'How paint is made', 'How a frame is hung'], answer: 0, why: 'Composition arranges visual elements.' },
        { type: 'multiple_choice', question: 'What is a focal point?', options: ['The first thing you notice', 'The edge of the paper', 'The paint pot'], answer: 0, why: 'Artists guide the eye to a focal point.' },
        { type: 'multiple_choice', question: 'What is negative space?', options: ['Empty space around a subject', 'Dark paint only', 'A type of brush'], answer: 0, why: 'Negative space surrounds the subject.' }
      ]
    }, {
      id: 'lower-secondary-art-m1-l3',
      order: 3,
      title: 'Texture and Pattern',
      objective: 'I can create texture and pattern using simple materials.',
      minutes: 9,
      recap: 'You created texture and pattern using simple materials.',
      blocks: [
        { type: 'text', body: 'Texture is how a surface looks or feels; pattern is a repeated design.' },
        { type: 'text', body: 'Rubbing, printing, and collage can create texture without paint.' },
        { type: 'text', body: 'Patterns can be regular, such as tiles, or irregular, such as scattered leaves.' },
        { type: 'tip', body: 'Collect safe everyday materials and test them on scrap paper.' },
        {
          type: 'illustration',
          alt: 'A single red clay brick.',
          image: 'assets/3d/brick-3d.png',
          placeholder: 'Brick: surface texture and repeating pattern.'
        },
        { type: 'example', steps: ['Place paper over a brick.', 'Rub with a crayon.', 'A rough texture appears.', 'Repeat to build a pattern.'] }
      ],
      vocabulary: [
        { word: 'texture', meaning: 'How a surface looks or feels.', example: 'The wall has rough texture.' },
        { word: 'pattern', meaning: 'A repeated design.', example: 'The tiles form a pattern.' },
        { word: 'collage', meaning: 'Art made from glued materials.', example: 'The collage uses newspaper.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is pattern?', options: ['A repeated design', 'A single mark', 'A type of frame'], answer: 0, why: 'Patterns repeat shapes or marks.' },
        { type: 'multiple_choice', question: 'How can you copy a texture?', options: ['Make a rubbing', 'Sing a note', 'Measure it'], answer: 0, why: 'Rubbings capture surface texture.' },
        { type: 'multiple_choice', question: 'What is collage?', options: ['Art from glued materials', 'A stone carving', 'A pencil sketch'], answer: 0, why: 'Collage combines cut or torn materials.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Design and Making',
    description: 'Everyday design, sculpture, and the ideas behind art. Draft content.',
    lessons: [{
      id: 'lower-secondary-art-m2-l1',
      order: 1,
      title: 'Design in Everyday Life',
      objective: 'I can explain how designers solve everyday problems.',
      minutes: 9,
      recap: 'You explained how designers solve everyday problems.',
      blocks: [
        { type: 'text', body: 'Designers create products that are useful, safe, and attractive.' },
        { type: 'text', body: 'They research users, sketch ideas, build prototypes, and test them.' },
        { type: 'text', body: 'Good design considers cost, materials, and the environment.' },
        { type: 'tip', body: 'A prototype is a rough version made to test an idea.' },
        {
          type: 'illustration',
          alt: 'A clear straight ruler with marked measurements.',
          image: 'assets/3d/straight-ruler-3d.png',
          placeholder: 'Ruler: measuring, planning, and precise design.'
        },
        { type: 'example', steps: ['Notice a bag that hurts your shoulder.', 'Sketch a wider strap.', 'Make a cardboard prototype.', 'Test it and improve the design.'] }
      ],
      vocabulary: [
        { word: 'prototype', meaning: 'An early test version.', example: 'The prototype was cardboard.' },
        { word: 'user', meaning: 'The person a design is for.', example: 'Ask the user what they need.' },
        { word: 'function', meaning: 'What something is designed to do.', example: 'The function is carrying books.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a prototype?', options: ['An early test version', 'A finished product', 'A shop display'], answer: 0, why: 'Prototypes are made to test ideas.' },
        { type: 'multiple_choice', question: 'Why research users?', options: ['To meet their needs', 'To raise the price', 'To copy rivals'], answer: 0, why: 'Design should solve real problems.' },
        { type: 'multiple_choice', question: 'Which matters in good design?', options: ['Cost, materials, and safety', 'Only colour', 'Only size'], answer: 0, why: 'Good design balances several factors.' }
      ]
    }, {
      id: 'lower-secondary-art-m2-l2',
      order: 2,
      title: 'Sculpture and Form',
      objective: 'I can describe how form, space, and material shape a sculpture.',
      minutes: 9,
      recap: 'You described how form, space, and material shape a sculpture.',
      blocks: [
        { type: 'text', body: 'Form is three-dimensional shape; space is the area around and inside it.' },
        { type: 'text', body: 'Sculptors add material, such as clay, or subtract it, such as carving wood.' },
        { type: 'text', body: 'Material affects what a sculpture can do: stone is heavy, wire is light.' },
        { type: 'tip', body: 'Look at the empty spaces as well as the solid parts.' },
        {
          type: 'illustration',
          alt: 'A large stone moai head sculpture.',
          image: 'assets/3d/moai-3d.png',
          placeholder: 'Moai: carved form and monumental scale.'
        },
        { type: 'example', steps: ['Choose a material.', 'Build or carve the main form.', 'Check the space around it.', 'Refine the surface and balance.'] }
      ],
      vocabulary: [
        { word: 'form', meaning: 'A three-dimensional shape.', example: 'The form curves inward.' },
        { word: 'space', meaning: 'Area around or inside a form.', example: 'Space surrounds the sculpture.' },
        { word: 'subtractive', meaning: 'Made by removing material.', example: 'Carving is subtractive.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is form?', options: ['A three-dimensional shape', 'A flat colour', 'A type of brush'], answer: 0, why: 'Form has height, width, and depth.' },
        { type: 'multiple_choice', question: 'Which method removes material?', options: ['Carving', 'Modelling', 'Gluing'], answer: 0, why: 'Carving is subtractive.' },
        { type: 'multiple_choice', question: 'Why does material matter?', options: ['It limits and shapes the design', 'It changes the price only', 'It has no effect'], answer: 0, why: 'Material affects weight and form.' }
      ]
    }, {
      id: 'lower-secondary-art-m2-l3',
      order: 3,
      title: 'Artists and Ideas',
      objective: 'I can explain how artists communicate ideas and feelings.',
      minutes: 9,
      recap: 'You explained how artists communicate ideas and feelings.',
      blocks: [
        { type: 'text', body: 'Artists make choices about subject, colour, and style to communicate meaning.' },
        { type: 'text', body: 'Some art responds to events, beliefs, or protests; some explores pure form.' },
        { type: 'text', body: 'A viewer’s own experience affects how they interpret a work.' },
        { type: 'tip', body: 'Ask what the artist chose to include, and what they left out.' },
        {
          type: 'illustration',
          alt: 'An open book with blank pages.',
          image: 'assets/3d/open_book-3d.png',
          placeholder: 'Open book: art, context, and interpretation.'
        },
        { type: 'example', steps: ['Look at a painting carefully.', 'Notice the colours and subject.', 'Ask what the artist intended.', 'Compare your reading with others.'] }
      ],
      vocabulary: [
        { word: 'interpretation', meaning: 'A personal reading of a work.', example: 'Our interpretations differed.' },
        { word: 'style', meaning: 'A recognisable way of making art.', example: 'The style is bold and simple.' },
        { word: 'context', meaning: 'The setting a work was made in.', example: 'Context shapes meaning.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can artists communicate?', options: ['Ideas and feelings', 'Only facts', 'Only prices'], answer: 0, why: 'Art can carry ideas and emotion.' },
        { type: 'multiple_choice', question: 'What affects interpretation?', options: ['The viewer’s experience', 'The frame size only', 'The room colour'], answer: 0, why: 'Viewers bring their own experience.' },
        { type: 'multiple_choice', question: 'Why consider context?', options: ['It shapes what a work means', 'It tells the price', 'It proves the artist'], answer: 0, why: 'Context helps explain choices.' }
      ]
    }]
  }];
}());

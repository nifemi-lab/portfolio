/* Primary Art & Design — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'art');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Colour and Shape',
    description: 'Colours, lines, and shapes: the building blocks of art. Draft content.',
    lessons: [{
      id: 'primary-art-m1-l1',
      order: 1,
      title: 'Colour and Mixing',
      objective: 'I can name primary colours and mix a secondary colour.',
      minutes: 7,
      recap: 'You named primary colours and mixed a secondary colour.',
      blocks: [
        { type: 'text', body: 'The primary colours are red, yellow, and blue. You cannot mix them from other colours.' },
        { type: 'text', body: 'Mixing two primary colours makes a secondary colour: red and yellow make orange.' },
        { type: 'text', body: 'Artists choose colours to change how a picture feels. Warm colours feel lively.' },
        { type: 'tip', body: 'Try mixing small amounts and add one drop at a time.' },
        {
          type: 'illustration',
          alt: 'A wooden artist palette with dabs of paint.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Artist palette: primary colours and mixed shades.'
        },
        { type: 'example', steps: ['Choose red and yellow paint.', 'Mix them on the palette.', 'Orange appears.', 'Paint a warm sunset.'] }
      ],
      vocabulary: [
        { word: 'primary', meaning: 'A colour you cannot mix.', example: 'Red is a primary colour.' },
        { word: 'secondary', meaning: 'A colour made by mixing two primaries.', example: 'Orange is a secondary colour.' },
        { word: 'palette', meaning: 'A board for mixing paint.', example: 'Paint sits on the palette.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a primary colour?', options: ['Red', 'Orange', 'Green'], answer: 0, why: 'Red cannot be mixed from other colours.' },
        { type: 'multiple_choice', question: 'What does red and yellow make?', options: ['Orange', 'Purple', 'Blue'], answer: 0, why: 'Two primaries make a secondary colour.' },
        { type: 'multiple_choice', question: 'Why do artists choose colours?', options: ['To change the mood', 'To count', 'To write'], answer: 0, why: 'Colour affects how a picture feels.' }
      ]
    }, {
      id: 'primary-art-m1-l2',
      order: 2,
      title: 'Drawing Lines',
      objective: 'I can draw different lines and use them to show texture.',
      minutes: 7,
      recap: 'You drew different lines and used them to show texture.',
      blocks: [
        { type: 'text', body: 'Lines can be straight, curved, thick, thin, long, or short.' },
        { type: 'text', body: 'Artists use lines to make edges, patterns, and textures.' },
        { type: 'text', body: 'Cross-hatching uses crossing lines to make areas look darker.' },
        { type: 'tip', body: 'Hold the pencil lightly for smooth, free lines.' },
        {
          type: 'illustration',
          alt: 'A yellow pencil with a sharp graphite tip.',
          image: 'assets/3d/pencil-3d.png',
          placeholder: 'Pencil: lines, pattern, and texture.'
        },
        { type: 'example', steps: ['Draw a row of straight lines.', 'Add crossing lines over them.', 'The area looks darker.', 'Use it to shade a table.'] }
      ],
      vocabulary: [
        { word: 'line', meaning: 'A mark that joins two points.', example: 'Draw a curved line.' },
        { word: 'texture', meaning: 'How a surface looks or feels.', example: 'Lines can show texture.' },
        { word: 'cross-hatching', meaning: 'Crossing lines used for shading.', example: 'Cross-hatching made it darker.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a type of line?', options: ['Curved', 'Loud', 'Sweet'], answer: 0, why: 'Lines can be curved or straight.' },
        { type: 'multiple_choice', question: 'What can lines show?', options: ['Texture', 'Sound', 'Smell'], answer: 0, why: 'Lines make texture on paper.' },
        { type: 'multiple_choice', question: 'What is cross-hatching?', options: ['Crossing lines for shade', 'Cutting paper', 'Mixing paint'], answer: 0, why: 'Crossing lines darken an area.' }
      ]
    }, {
      id: 'primary-art-m1-l3',
      order: 3,
      title: 'Shapes in Art',
      objective: 'I can use shapes to build a picture.',
      minutes: 7,
      recap: 'You used shapes to build a picture.',
      blocks: [
        { type: 'text', body: 'Shapes are areas closed by lines, such as circles, squares, and triangles.' },
        { type: 'text', body: 'Artists combine simple shapes to make people, buildings, and animals.' },
        { type: 'text', body: 'Large shapes often come first, then smaller details are added.' },
        { type: 'tip', body: 'Sketch the big shapes before the small ones.' },
        {
          type: 'illustration',
          alt: 'A single blue puzzle piece.',
          image: 'assets/3d/puzzle-piece-3d.png',
          placeholder: 'Puzzle piece: shapes fit together.'
        },
        { type: 'example', steps: ['Draw a circle for a head.', 'Add a square for the body.', 'Add triangles for a roof.', 'Join the shapes into a scene.'] }
      ],
      vocabulary: [
        { word: 'shape', meaning: 'A closed area with an outline.', example: 'A circle is a shape.' },
        { word: 'detail', meaning: 'A small part of a picture.', example: 'Add details last.' },
        { word: 'sketch', meaning: 'A quick, light drawing.', example: 'Start with a sketch.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a shape?', options: ['A closed area', 'A type of paint', 'A brush'], answer: 0, why: 'Shapes are closed by lines.' },
        { type: 'multiple_choice', question: 'What should come first?', options: ['Large shapes', 'Tiny details', 'The frame'], answer: 0, why: 'Big shapes guide the picture.' },
        { type: 'multiple_choice', question: 'How do artists build a scene?', options: ['Combine simple shapes', 'Use one line only', 'Avoid outlines'], answer: 0, why: 'Simple shapes combine into scenes.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Making Art',
    description: 'Paint, sculpture, and the art all around us. Draft content.',
    lessons: [{
      id: 'primary-art-m2-l1',
      order: 1,
      title: 'Painting',
      objective: 'I can describe how painters use brushes, paint, and layers.',
      minutes: 8,
      recap: 'You described how painters use brushes, paint, and layers.',
      blocks: [
        { type: 'text', body: 'Painters apply colour with brushes, sponges, or their fingers.' },
        { type: 'text', body: 'A painting is often built in layers, from light background to darker detail.' },
        { type: 'text', body: 'Different brushes make different marks, from wide washes to fine lines.' },
        { type: 'tip', body: 'Let each layer dry before adding the next.' },
        {
          type: 'illustration',
          alt: 'A framed landscape painting of hills and sun.',
          image: 'assets/3d/framed-picture-3d.png',
          placeholder: 'Framed picture: paint, layers, and finish.'
        },
        { type: 'example', steps: ['Paint the sky as a light wash.', 'Let it dry.', 'Add hills with a wider brush.', 'Finish with small details.'] }
      ],
      vocabulary: [
        { word: 'brush', meaning: 'A tool for applying paint.', example: 'Use a fine brush for lines.' },
        { word: 'layer', meaning: 'One coat of paint.', example: 'Wait for the layer to dry.' },
        { word: 'wash', meaning: 'A thin, watery coat of paint.', example: 'The sky is a blue wash.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What applies paint?', options: ['A brush', 'A ruler', 'A pencil case'], answer: 0, why: 'Brushes carry paint to the surface.' },
        { type: 'multiple_choice', question: 'Why wait between layers?', options: ['So the paint dries', 'To mix colours', 'To clean the floor'], answer: 0, why: 'Dry layers stay separate.' },
        { type: 'multiple_choice', question: 'What is a wash?', options: ['A thin coat of paint', 'A thick frame', 'A type of brush'], answer: 0, why: 'A wash is watery and light.' }
      ]
    }, {
      id: 'primary-art-m2-l2',
      order: 2,
      title: 'Making Sculptures',
      objective: 'I can describe how sculptures are made in three dimensions.',
      minutes: 8,
      recap: 'You described how sculptures are made in three dimensions.',
      blocks: [
        { type: 'text', body: 'A sculpture is a three-dimensional artwork you can walk around.' },
        { type: 'text', body: 'Sculptors carve stone or wood, or build up clay and plaster.' },
        { type: 'text', body: 'Shape, balance, and texture matter because a sculpture has depth.' },
        { type: 'tip', body: 'Check a sculpture from several sides as you work.' },
        {
          type: 'illustration',
          alt: 'A large stone moai head sculpture.',
          image: 'assets/3d/moai-3d.png',
          placeholder: 'Moai: carving a solid, three-dimensional form.'
        },
        { type: 'example', steps: ['Start with a lump of clay.', 'Shape the head and shoulders.', 'Smooth the surface.', 'Turn it to check every side.'] }
      ],
      vocabulary: [
        { word: 'sculpture', meaning: 'A three-dimensional artwork.', example: 'The sculpture stands in the park.' },
        { word: 'carve', meaning: 'Cut a shape from solid material.', example: 'They carve the stone.' },
        { word: 'balance', meaning: 'An even, stable arrangement.', example: 'The sculpture has balance.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a sculpture?', options: ['A three-dimensional artwork', 'A flat drawing', 'A type of paint'], answer: 0, why: 'Sculptures have depth.' },
        { type: 'multiple_choice', question: 'How do sculptors work with stone?', options: ['They carve it', 'They fold it', 'They sing to it'], answer: 0, why: 'Carving removes material.' },
        { type: 'multiple_choice', question: 'Why check several sides?', options: ['To keep it balanced', 'To dry the paint', 'To count edges'], answer: 0, why: 'A sculpture is seen from all around.' }
      ]
    }, {
      id: 'primary-art-m2-l3',
      order: 3,
      title: 'Art Around Us',
      objective: 'I can find art and design in everyday places.',
      minutes: 7,
      recap: 'You found art and design in everyday places.',
      blocks: [
        { type: 'text', body: 'Art is not only in galleries. Buildings, signs, clothes, and games are designed too.' },
        { type: 'text', body: 'Designers think about how something looks, works, and lasts.' },
        { type: 'text', body: 'Public art, such as murals and statues, can tell a place’s story.' },
        { type: 'tip', body: 'Look closely at shapes and colours on your way home.' },
        {
          type: 'illustration',
          alt: 'A white classical building with stone columns.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Classical building: design in the world around us.'
        },
        { type: 'example', steps: ['Walk past a school.', 'Notice its sign and windows.', 'Ask why they look that way.', 'Find design choices everywhere.'] }
      ],
      vocabulary: [
        { word: 'design', meaning: 'Planning how something looks and works.', example: 'The sign is a design.' },
        { word: 'mural', meaning: 'A painting on a wall.', example: 'The mural shows the town.' },
        { word: 'gallery', meaning: 'A place that shows art.', example: 'We visited the gallery.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where can art be found?', options: ['In everyday places', 'Only in galleries', 'Only in books'], answer: 0, why: 'Design is all around us.' },
        { type: 'multiple_choice', question: 'What do designers consider?', options: ['Look, use, and strength', 'Only price', 'Only size'], answer: 0, why: 'Good design balances several needs.' },
        { type: 'multiple_choice', question: 'What is a mural?', options: ['A wall painting', 'A stone statue', 'A type of frame'], answer: 0, why: 'Murals are painted on walls.' }
      ]
    }]
  }];
}());

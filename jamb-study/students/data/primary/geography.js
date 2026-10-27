/* Primary Geography — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'primary');
  const subject = track && track.subjects.find((entry) => entry.id === 'geography');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Our World',
    description: 'Maps, continents, and weather: the basics of our world. Draft content.',
    lessons: [{
      id: 'primary-geography-m1-l1',
      order: 1,
      title: 'Maps and Directions',
      objective: 'I can use a map and the four compass directions.',
      minutes: 7,
      recap: 'You used maps and the four main compass directions.',
      blocks: [
        { type: 'text', body: 'A map shows a place from above.' },
        { type: 'text', body: 'Maps use symbols, labels, and a key.' },
        { type: 'text', body: 'North, south, east, and west are compass directions.' },
        { type: 'tip', body: 'On most maps, north points to the top.' },
        {
          type: 'illustration',
          alt: 'A round compass with a red north needle.',
          image: 'assets/3d/compass-3d.png',
          placeholder: 'Compass: north, east, south, and west.'
        },
        { type: 'example', steps: ['Find a point on the map.', 'Turn the compass to north.', 'Walk north to reach the lake.'] }
      ],
      vocabulary: [
        { word: 'map', meaning: 'A drawing of an area from above.', example: 'The map shows our town.' },
        { word: 'north', meaning: 'One of four compass directions.', example: 'North is at the top of the map.' },
        { word: 'key', meaning: 'A list that explains map symbols.', example: 'The key shows a blue lake.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does a map show?', options: ['A place from above', 'A place from space', 'The future'], answer: 0, why: 'Maps show places from above.' },
        { type: 'multiple_choice', question: 'Which direction is usually at the top of a map?', options: ['North', 'South', 'East'], answer: 0, why: 'Maps usually put north at the top.' },
        { type: 'multiple_choice', question: 'You want to go west. Which way on a map?', options: ['Left', 'Right', 'Up'], answer: 0, why: 'West is to the left when north is up.' }
      ]
    }, {
      id: 'primary-geography-m1-l2',
      order: 2,
      title: 'Continents and Oceans',
      objective: 'I can name the continents and oceans of the world.',
      minutes: 7,
      recap: 'You named the continents and oceans of the world.',
      blocks: [
        { type: 'text', body: 'Earth has seven continents and five oceans.' },
        { type: 'text', body: 'A continent is a very large area of land.' },
        { type: 'text', body: 'Asia is the largest continent. Africa is the second largest.' },
        { type: 'tip', body: 'Europe and Asia share one huge landmass.' },
        {
          type: 'illustration',
          alt: 'A blue and green globe showing the Americas.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: continents and oceans across the planet.'
        },
        { type: 'example', steps: ['Look at a globe.', 'Find the blue areas.', 'Blue shows oceans.', 'Green and brown show land.'] }
      ],
      vocabulary: [
        { word: 'continent', meaning: 'A very large area of land.', example: 'Africa is a continent.' },
        { word: 'ocean', meaning: 'A huge body of salt water.', example: 'The Pacific is an ocean.' },
        { word: 'globe', meaning: 'A round model of Earth.', example: 'The globe spins on a stand.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How many continents are there?', options: ['Seven', 'Five', 'Three'], answer: 0, why: 'Earth has seven continents.' },
        { type: 'multiple_choice', question: 'What is the largest continent?', options: ['Asia', 'Africa', 'Europe'], answer: 0, why: 'Asia is the largest continent.' },
        { type: 'multiple_choice', question: 'Which one is an ocean?', options: ['Pacific', 'Africa', 'Asia'], answer: 0, why: 'The Pacific is a vast ocean.' }
      ]
    }, {
      id: 'primary-geography-m1-l3',
      order: 3,
      title: 'Weather Around the World',
      objective: 'I can describe how weather differs around the world.',
      minutes: 7,
      recap: 'You described how weather differs around the world.',
      blocks: [
        { type: 'text', body: 'Weather is what the air and sky are doing.' },
        { type: 'text', body: 'Near the equator, weather is often hot and wet.' },
        { type: 'text', body: 'Near the poles, weather is often cold and icy.' },
        { type: 'tip', body: 'The equator is an imaginary line around Earth\u2019s middle.' },
        {
          type: 'illustration',
          alt: 'A bright yellow sun with warm rays.',
          image: 'assets/3d/sun-3d.png',
          placeholder: 'Sun: heat and light across the planet.'
        },
        { type: 'example', steps: ['The equator receives strong sunlight.', 'Air there is warm.', 'Warm air holds more water.', 'Heavy rain often follows.'] }
      ],
      vocabulary: [
        { word: 'equator', meaning: 'The line around Earth\u2019s middle.', example: 'The equator crosses Africa.' },
        { word: 'polar', meaning: 'Near the North or South Pole.', example: 'Polar regions are very cold.' },
        { word: 'climate', meaning: 'Usual weather over a long time.', example: 'The desert has a dry climate.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where is weather usually hottest?', options: ['Near the equator', 'Near the poles', 'At the top'], answer: 0, why: 'The equator gets the strongest sunlight.' },
        { type: 'multiple_choice', question: 'What is the equator?', options: ['An imaginary line', 'A real road', 'A mountain'], answer: 0, why: 'The equator circles Earth\u2019s middle.' },
        { type: 'multiple_choice', question: 'Why is the weather cold near the poles?', options: ['Less direct sunlight', 'More beaches', 'Fewer clouds'], answer: 0, why: 'Sunlight arrives at a low angle there.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Places and People',
    description: 'Cities, villages, rivers, mountains, and caring for our planet. Draft content.',
    lessons: [{
      id: 'primary-geography-m2-l1',
      order: 1,
      title: 'Cities and Villages',
      objective: 'I can compare life in a city with life in a village.',
      minutes: 7,
      recap: 'You compared cities and villages and described their features.',
      blocks: [
        { type: 'text', body: 'A city is large and has many people and buildings.' },
        { type: 'text', body: 'A village is small and often close to countryside.' },
        { type: 'text', body: 'Cities have more shops and transport. Villages are quieter.' },
        { type: 'tip', body: 'Both cities and villages need clean water and safe homes.' },
        {
          type: 'illustration',
          alt: 'A small house with a red roof and door.',
          image: 'assets/3d/house-3d.png',
          placeholder: 'House: homes in a village or a city street.'
        },
        { type: 'example', steps: ['A village has a few shops.', 'A city has many shops and buses.', 'People choose where to live for different reasons.'] }
      ],
      vocabulary: [
        { word: 'city', meaning: 'A large town with many people.', example: 'The city has busy streets.' },
        { word: 'village', meaning: 'A small settlement in the countryside.', example: 'The village has one school.' },
        { word: 'countryside', meaning: 'Land outside towns and cities.', example: 'Fields and woods are countryside.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which place is usually smaller?', options: ['A village', 'A city', 'A country'], answer: 0, why: 'Villages are smaller than cities.' },
        { type: 'multiple_choice', question: 'What might a city have more of?', options: ['Shops and buses', 'Fields', 'Farm animals'], answer: 0, why: 'Cities have more services and transport.' },
        { type: 'multiple_choice', question: 'Why might someone choose a village?', options: ['A quieter life', 'More traffic', 'Taller buildings'], answer: 0, why: 'Villages are often calmer and quieter.' }
      ]
    }, {
      id: 'primary-geography-m2-l2',
      order: 2,
      title: 'Rivers and Mountains',
      objective: 'I can describe how rivers and mountains shape the land.',
      minutes: 7,
      recap: 'You described how rivers and mountains shape the land.',
      blocks: [
        { type: 'text', body: 'A river is a stream of water flowing to the sea.' },
        { type: 'text', body: 'Rivers start in hills or mountains.' },
        { type: 'text', body: 'Mountains are very high land with steep sides.' },
        { type: 'tip', body: 'Rivers carry soil and stones downstream.' },
        {
          type: 'illustration',
          alt: 'A tall mountain with a snowy peak.',
          image: 'assets/3d/mountain-3d.png',
          placeholder: 'Mountain: high land shaped by weather and time.'
        },
        { type: 'example', steps: ['Rain falls on a mountain.', 'Water runs downhill.', 'Small streams join.', 'A river forms.'] }
      ],
      vocabulary: [
        { word: 'river', meaning: 'Water flowing across the land.', example: 'The river reaches the sea.' },
        { word: 'peak', meaning: 'The top of a mountain.', example: 'Snow covers the peak.' },
        { word: 'valley', meaning: 'Low land between hills or mountains.', example: 'The river runs through a valley.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where does a river often begin?', options: ['In hills or mountains', 'In a city', 'At the beach'], answer: 0, why: 'Rivers begin where rain collects high up.' },
        { type: 'multiple_choice', question: 'What is a peak?', options: ['The top of a mountain', 'The bottom of a river', 'A type of map'], answer: 0, why: 'The peak is the highest point.' },
        { type: 'multiple_choice', question: 'What does a river carry downstream?', options: ['Soil and stones', 'Cars and buses', 'Trees and houses'], answer: 0, why: 'Moving water carries material downstream.' }
      ]
    }, {
      id: 'primary-geography-m2-l3',
      order: 3,
      title: 'Looking After Our Planet',
      objective: 'I can explain simple ways to care for our planet.',
      minutes: 7,
      recap: 'You explained simple ways to care for our planet.',
      blocks: [
        { type: 'text', body: 'Our planet gives us air, water, food, and materials.' },
        { type: 'text', body: 'Litter and waste can harm animals and plants.' },
        { type: 'text', body: 'We can recycle, save water, and plant trees.' },
        { type: 'tip', body: 'Turn off lights you are not using.' },
        {
          type: 'illustration',
          alt: 'A small green seedling growing from soil.',
          image: 'assets/3d/seedling-3d.png',
          placeholder: 'Seedling: planting trees helps the planet.'
        },
        { type: 'example', steps: ['A plastic bottle is dropped.', 'It can reach a river.', 'Recycling keeps it out of nature.'] }
      ],
      vocabulary: [
        { word: 'recycle', meaning: 'Turn waste into something useful.', example: 'We recycle paper and glass.' },
        { word: 'waste', meaning: 'Material we throw away.', example: 'Food waste can be composted.' },
        { word: 'protect', meaning: 'Keep something safe from harm.', example: 'We protect wildlife habitats.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which action helps the planet?', options: ['Recycling waste', 'Dropping litter', 'Wasting water'], answer: 0, why: 'Recycling reduces waste in nature.' },
        { type: 'multiple_choice', question: 'Why is litter harmful?', options: ['It can harm animals', 'It helps plants', 'It cleans rivers'], answer: 0, why: 'Animals can eat or get trapped by litter.' },
        { type: 'multiple_choice', question: 'What can planting trees do?', options: ['Improve the air', 'Make more litter', 'Dry up rivers'], answer: 0, why: 'Trees release oxygen and support life.' }
      ]
    }]
  }];
}());

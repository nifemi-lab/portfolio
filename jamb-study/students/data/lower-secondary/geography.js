/* Lower Secondary Geography — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'geography');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Physical Geography',
    description: 'Tectonics, rivers, and climate: the forces that shape the planet. Draft content.',
    lessons: [{
      id: 'lower-secondary-geography-m1-l1',
      order: 1,
      title: 'Plate Tectonics',
      objective: 'I can explain how plate movement causes tectonic hazards.',
      minutes: 8,
      recap: 'You explained how moving plates cause tectonic hazards.',
      blocks: [
        { type: 'text', body: 'Earth\u2019s crust is broken into large slabs called tectonic plates.' },
        { type: 'text', body: 'They move slowly over the mantle because of heat-driven currents.' },
        { type: 'text', body: 'At boundaries, plates collide, separate, or slide past each other.' },
        { type: 'tip', body: 'Volcanoes and earthquakes are common at plate boundaries.' },
        {
          type: 'illustration',
          alt: 'A volcano with bright lava flowing down.',
          image: 'assets/3d/volcano-3d.png',
          placeholder: 'Volcano: magma rising at a plate boundary.'
        },
        { type: 'example', steps: ['Two plates move apart.', 'Magma rises into the gap.', 'Pressure builds.', 'An eruption occurs.'] }
      ],
      vocabulary: [
        { word: 'magma', meaning: 'Molten rock below the surface.', example: 'Magma rose toward the surface.' },
        { word: 'boundary', meaning: 'Where two plates meet.', example: 'Earthquakes happen at boundaries.' },
        { word: 'eruption', meaning: 'A sudden release from a volcano.', example: 'The eruption sent ash into the sky.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are tectonic plates?', options: ['Large slabs of crust', 'Oceans currents', 'Cloud layers'], answer: 0, why: 'They are huge pieces of Earth\u2019s crust.' },
        { type: 'multiple_choice', question: 'Why do plates move?', options: ['Heat-driven currents', 'Moonlight', 'Rainfall'], answer: 0, why: 'Convection in the mantle moves them.' },
        { type: 'multiple_choice', question: 'Where do volcanoes often form?', options: ['At plate boundaries', 'In deserts', 'On farms'], answer: 0, why: 'Magma rises where plates meet.' }
      ]
    }, {
      id: 'lower-secondary-geography-m1-l2',
      order: 2,
      title: 'Rivers and Flooding',
      objective: 'I can explain how rivers flood and how floods are managed.',
      minutes: 8,
      recap: 'You explained river flooding and how it can be managed.',
      blocks: [
        { type: 'text', body: 'A river runs from its source downhill to its mouth.' },
        { type: 'text', body: 'Heavy rain can raise discharge beyond the channel\u2019s capacity.' },
        { type: 'text', body: 'Flooding is worse when soil is saturated or slopes are steep.' },
        { type: 'tip', body: 'Flood defences include levees, dams, and floodplain storage.' },
        {
          type: 'illustration',
          alt: 'A large blue wave curling and breaking.',
          image: 'assets/3d/water_wave-3d.png',
          placeholder: 'Wave: water rising beyond a river channel.'
        },
        { type: 'example', steps: ['Rain falls for three days.', 'The soil cannot absorb it.', 'The river rises.', 'Water spills onto the floodplain.'] }
      ],
      vocabulary: [
        { word: 'discharge', meaning: 'The volume of water flowing in a river.', example: 'Discharge rose after heavy rain.' },
        { word: 'floodplain', meaning: 'Low land beside a river that floods.', example: 'Houses were built on the floodplain.' },
        { word: 'levee', meaning: 'A raised bank to hold back water.', example: 'The levee protected the village.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What can cause a river to flood?', options: ['Heavy rain', 'Less traffic', 'Cold nights'], answer: 0, why: 'More rain raises river discharge.' },
        { type: 'multiple_choice', question: 'Why does saturated soil increase flooding?', options: ['It absorbs less water', 'It stops rain', 'It heats rivers'], answer: 0, why: 'Full soil lets water run into rivers.' },
        { type: 'multiple_choice', question: 'What is a levee?', options: ['A raised river bank', 'A type of cloud', 'A river animal'], answer: 0, why: 'Levees hold river water back.' }
      ]
    }, {
      id: 'lower-secondary-geography-m1-l3',
      order: 3,
      title: 'Climate and Biomes',
      objective: 'I can describe how climate shapes major biomes.',
      minutes: 8,
      recap: 'You described how climate shapes major world biomes.',
      blocks: [
        { type: 'text', body: 'Climate is the average weather of a place over many years.' },
        { type: 'text', body: 'Temperature and rainfall decide which plants and animals survive.' },
        { type: 'text', body: 'Biomes include rainforests, deserts, grasslands, and tundra.' },
        { type: 'tip', body: 'Deserts form where rainfall is very low.' },
        {
          type: 'illustration',
          alt: 'A dry desert with sand dunes and sun.',
          image: 'assets/3d/desert-3d.png',
          placeholder: 'Desert: hot days, cold nights, and little rain.'
        },
        { type: 'example', steps: ['The Sahara receives little rain.', 'Few plants can survive.', 'Cacti store water.', 'Animals are active at night.'] }
      ],
      vocabulary: [
        { word: 'biome', meaning: 'A large natural region with a shared climate.', example: 'The tundra is a cold biome.' },
        { word: 'tundra', meaning: 'A cold, treeless biome.', example: 'Tundra plants grow low.' },
        { word: 'adapt', meaning: 'Change to survive conditions.', example: 'Desert plants adapt to drought.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is climate?', options: ['Long-term average weather', 'Today\u2019s weather', 'A type of soil'], answer: 0, why: 'Climate is measured over many years.' },
        { type: 'multiple_choice', question: 'Which biome has very little rain?', options: ['Desert', 'Rainforest', 'Tundra'], answer: 0, why: 'Deserts receive very low rainfall.' },
        { type: 'multiple_choice', question: 'How do desert plants survive?', options: ['They store water', 'They eat sand', 'They freeze'], answer: 0, why: 'Storage helps them through dry spells.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Human Geography',
    description: 'Population, cities, and resources: how people live and use the planet. Draft content.',
    lessons: [{
      id: 'lower-secondary-geography-m2-l1',
      order: 1,
      title: 'Population and Migration',
      objective: 'I can explain why populations grow and people migrate.',
      minutes: 8,
      recap: 'You explained population change and why people migrate.',
      blocks: [
        { type: 'text', body: 'Populations change through births, deaths, and migration.' },
        { type: 'text', body: 'Push factors include war, drought, and unemployment.' },
        { type: 'text', body: 'Pull factors include safety, work, and better services.' },
        { type: 'tip', body: 'Migration can bring skills and culture to host countries.' },
        {
          type: 'illustration',
          alt: 'A globe showing continents and blue oceans.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: people moving between regions.'
        },
        { type: 'example', steps: ['A family leaves a drought-hit region.', 'They move to a city with work.', 'They send money home.', 'Both places change.'] }
      ],
      vocabulary: [
        { word: 'migration', meaning: 'Moving to live somewhere new.', example: 'Migration can be voluntary or forced.' },
        { word: 'refugee', meaning: 'A person forced to flee danger.', example: 'The refugee found safety abroad.' },
        { word: 'population', meaning: 'The number of people in a place.', example: 'The population grew quickly.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What causes migration?', options: ['Push and pull factors', 'Only weather', 'Only age'], answer: 0, why: 'People move due to pushes and pulls.' },
        { type: 'multiple_choice', question: 'Which is a push factor?', options: ['War', 'A safe home', 'A new job'], answer: 0, why: 'War forces people to leave.' },
        { type: 'multiple_choice', question: 'Which is a pull factor?', options: ['Work opportunities', 'Crop failure', 'Flooding'], answer: 0, why: 'Jobs attract people to a new place.' }
      ]
    }, {
      id: 'lower-secondary-geography-m2-l2',
      order: 2,
      title: 'Urbanisation',
      objective: 'I can describe the causes and effects of rapid urbanisation.',
      minutes: 8,
      recap: 'You described the causes and effects of rapid urbanisation.',
      blocks: [
        { type: 'text', body: 'Urbanisation is the growth of towns and cities.' },
        { type: 'text', body: 'People move to cities for jobs, schools, and healthcare.' },
        { type: 'text', body: 'Rapid growth can cause traffic, overcrowding, and poor housing.' },
        { type: 'tip', body: 'Some cities plan transport and green space in advance.' },
        {
          type: 'illustration',
          alt: 'A small house with a red roof and door.',
          image: 'assets/3d/house-3d.png',
          placeholder: 'House: housing pressure in growing cities.'
        },
        { type: 'example', steps: ['A village has few jobs.', 'Young people move to a city.', 'The city grows quickly.', 'Housing becomes expensive.'] }
      ],
      vocabulary: [
        { word: 'urbanisation', meaning: 'The growth of cities.', example: 'Urbanisation changed the region.' },
        { word: 'infrastructure', meaning: 'Roads, water, and power systems.', example: 'Cities need new infrastructure.' },
        { word: 'slum', meaning: 'Poor, overcrowded housing.', example: 'The slum lacked clean water.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is urbanisation?', options: ['Growth of cities', 'Decline of farms', 'Rise of oceans'], answer: 0, why: 'Urbanisation means more people live in cities.' },
        { type: 'multiple_choice', question: 'Why do people move to cities?', options: ['Work and services', 'Less transport', 'Fewer schools'], answer: 0, why: 'Cities often offer jobs and services.' },
        { type: 'multiple_choice', question: 'Which problem can rapid growth cause?', options: ['Overcrowding', 'Fewer people', 'Empty streets'], answer: 0, why: 'Housing and services struggle to keep up.' }
      ]
    }, {
      id: 'lower-secondary-geography-m2-l3',
      order: 3,
      title: 'Resources and Sustainability',
      objective: 'I can explain what sustainable resource use means.',
      minutes: 8,
      recap: 'You explained how resources can be used sustainably.',
      blocks: [
        { type: 'text', body: 'Resources include water, food, energy, and raw materials.' },
        { type: 'text', body: 'Some resources renew quickly. Others, like coal, are finite.' },
        { type: 'text', body: 'Sustainability means meeting needs without harming future generations.' },
        { type: 'tip', body: 'Reduce, reuse, and recycle all cut demand for new materials.' },
        {
          type: 'illustration',
          alt: 'A green seedling growing in dark soil.',
          image: 'assets/3d/seedling-3d.png',
          placeholder: 'Seedling: renewable resources and long-term care.'
        },
        { type: 'example', steps: ['A town uses more water.', 'It fixes leaking pipes.', 'It collects rainwater.', 'Demand falls without harming supply.'] }
      ],
      vocabulary: [
        { word: 'renewable', meaning: 'A resource that can be replaced.', example: 'Wind is a renewable resource.' },
        { word: 'finite', meaning: 'Limited and unable to be replaced.', example: 'Coal is finite.' },
        { word: 'sustainable', meaning: 'Able to continue without harm.', example: 'Sustainable farming protects soil.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which resource is renewable?', options: ['Wind', 'Coal', 'Oil'], answer: 0, why: 'Wind is naturally replaced.' },
        { type: 'multiple_choice', question: 'What does finite mean?', options: ['Limited', 'Unlimited', 'Renewable'], answer: 0, why: 'Finite resources can run out.' },
        { type: 'multiple_choice', question: 'What does sustainability protect?', options: ['Future generations', 'Only profits', 'Only roads'], answer: 0, why: 'It meets needs without harming the future.' }
      ]
    }]
  }];
}());

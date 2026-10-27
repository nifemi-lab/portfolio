/* GCSE Geography — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'geography');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Physical Processes',
    description: 'Tectonics, coasts, and ice: processes that shape physical landscapes. Draft content.',
    lessons: [{
      id: 'upper-secondary-geography-m1-l1',
      order: 1,
      title: 'Tectonic Hazards',
      objective: 'I can explain tectonic hazard causes and management.',
      minutes: 10,
      recap: 'You explained tectonic hazard causes and management.',
      blocks: [
        { type: 'text', body: 'Destructive boundaries occur where an oceanic plate subducts beneath a continental plate.' },
        { type: 'text', body: 'Pressure and friction cause earthquakes, while melting rock feeds volcanoes.' },
        { type: 'text', body: 'Constructive boundaries form ridges as plates separate and magma rises.' },
        { type: 'tip', body: 'Monitoring, planning, and building codes reduce hazard risk.' },
        {
          type: 'illustration',
          alt: 'A volcano with bright lava flowing down.',
          image: 'assets/3d/volcano-3d.png',
          placeholder: 'Volcano: subduction, magma, and eruption.'
        },
        { type: 'example', steps: ['An oceanic plate meets a continental plate.', 'The denser plate subducts.', 'Friction builds stress.', 'An earthquake strikes.'] }
      ],
      vocabulary: [
        { word: 'subduction', meaning: 'One plate sinking beneath another.', example: 'Subduction creates deep trenches.' },
        { word: 'hazard', meaning: 'Something that threatens people or places.', example: 'Volcanoes are tectonic hazards.' },
        { word: 'monitoring', meaning: 'Watching to detect changes.', example: 'Scientists use monitoring to predict risk.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What happens at a destructive boundary?', options: ['A plate subducts', 'Plates stop moving', 'Magma disappears'], answer: 0, why: 'Oceanic crust sinks beneath continental crust.' },
        { type: 'multiple_choice', question: 'What causes earthquakes at boundaries?', options: ['Stress from movement', 'Rainfall', 'Sunlight'], answer: 0, why: 'Friction and pressure release suddenly.' },
        { type: 'multiple_choice', question: 'How can risk be reduced?', options: ['Monitoring and planning', 'Ignoring warnings', 'Building on slopes'], answer: 0, why: 'Preparation and codes save lives.' }
      ]
    }, {
      id: 'upper-secondary-geography-m1-l2',
      order: 2,
      title: 'Coasts',
      objective: 'I can explain coastal processes and landform formation.',
      minutes: 10,
      recap: 'You explained coastal processes and how landforms form.',
      blocks: [
        { type: 'text', body: 'Waves erode, transport, and deposit material along coastlines.' },
        { type: 'text', body: 'Longshore drift moves sediment along the shore in a zigzag pattern.' },
        { type: 'text', body: 'Erosion forms cliffs and headlands; deposition builds beaches and spits.' },
        { type: 'tip', body: 'Groynes trap sediment but can starve nearby beaches.' },
        {
          type: 'illustration',
          alt: 'A beach with a striped umbrella and calm sea.',
          image: 'assets/3d/beach_with_umbrella-3d.png',
          placeholder: 'Beach: waves, drift, and sediment movement.'
        },
        { type: 'example', steps: ['Waves strike at an angle.', 'Sediment moves along the beach.', 'The swash pushes material up.', 'Deposition builds a spit.'] }
      ],
      vocabulary: [
        { word: 'erosion', meaning: 'Wearing away of rock or land.', example: 'Waves cause coastal erosion.' },
        { word: 'deposition', meaning: 'Dropping of carried material.', example: 'Deposition builds beaches.' },
        { word: 'sediment', meaning: 'Particles moved by water or wind.', example: 'Longshore drift moves sediment.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What moves sediment along a shore?', options: ['Longshore drift', 'Glaciers', 'Volcanoes'], answer: 0, why: 'Waves move material in a zigzag.' },
        { type: 'multiple_choice', question: 'What does erosion do?', options: ['Wears land away', 'Builds beaches', 'Freezes water'], answer: 0, why: 'Erosion removes rock and soil.' },
        { type: 'multiple_choice', question: 'What do groynes do?', options: ['Trap sediment', 'Heat the sea', 'Stop tides'], answer: 0, why: 'They slow longshore drift.' }
      ]
    }, {
      id: 'upper-secondary-geography-m1-l3',
      order: 3,
      title: 'Glaciation',
      objective: 'I can describe glacial erosion and its landforms.',
      minutes: 10,
      recap: 'You described glacial erosion and its distinctive landforms.',
      blocks: [
        { type: 'text', body: 'Glaciers are slow-moving masses of ice that erode rock.' },
        { type: 'text', body: 'Abrasion and plucking carve valleys, corries, and arêtes.' },
        { type: 'text', body: 'Melting ice deposits till, forming moraines and drumlins.' },
        { type: 'tip', body: 'U-shaped valleys show where glaciers once flowed.' },
        {
          type: 'illustration',
          alt: 'A white snowflake with six branches.',
          image: 'assets/3d/snowflake-3d.png',
          placeholder: 'Snowflake: ice, erosion, and glacial valleys.'
        },
        { type: 'example', steps: ['Snow compacts into ice.', 'The glacier slides downhill.', 'Rock is plucked and abraded.', 'A U-shaped valley remains.'] }
      ],
      vocabulary: [
        { word: 'glacier', meaning: 'A slow-moving mass of ice.', example: 'The glacier carved the valley.' },
        { word: 'abrasion', meaning: 'Rock scraping rock.', example: 'Abrasion smoothed the bedrock.' },
        { word: 'till', meaning: 'Material deposited by a glacier.', example: 'Till covered the valley floor.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a glacier?', options: ['Moving ice', 'A river', 'A desert'], answer: 0, why: 'Glaciers are slow-moving ice masses.' },
        { type: 'multiple_choice', question: 'What does abrasion do?', options: ['Scrapes rock', 'Melts clouds', 'Builds roads'], answer: 0, why: 'Ice drags rock across bedrock.' },
        { type: 'multiple_choice', question: 'What shape is a glacial valley?', options: ['U-shaped', 'V-shaped', 'O-shaped'], answer: 0, why: 'Ice erodes a wide, steep-sided U shape.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Human and Environmental Geography',
    description: 'Resources, cities, and climate: how people use and change environments. Draft content.',
    lessons: [{
      id: 'upper-secondary-geography-m2-l1',
      order: 1,
      title: 'Resource Management',
      objective: 'I can explain resource security and sustainable management.',
      minutes: 10,
      recap: 'You explained resource security and sustainable management.',
      blocks: [
        { type: 'text', body: 'Resource security means reliable access to water, energy, and food.' },
        { type: 'text', body: 'Supply can be increased, demand reduced, or both managed together.' },
        { type: 'text', body: 'Water transfer, desalination, and recycling improve supply in dry regions.' },
        { type: 'tip', body: 'Sustainable schemes balance human need with environmental limits.' },
        {
          type: 'illustration',
          alt: 'A single blue water droplet with a highlight.',
          image: 'assets/3d/droplet-3d.png',
          placeholder: 'Droplet: water supply, demand, and security.'
        },
        { type: 'example', steps: ['A region has low rainfall.', 'Demand exceeds supply.', 'A recycling scheme is built.', 'Pressure on water falls.'] }
      ],
      vocabulary: [
        { word: 'security', meaning: 'Reliable access to a resource.', example: 'Water security protects supply.' },
        { word: 'desalination', meaning: 'Removing salt from seawater.', example: 'Desalination is costly but effective.' },
        { word: 'surplus', meaning: 'More than is needed.', example: 'The region had a water surplus.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is resource security?', options: ['Reliable access', 'Wasting supplies', 'Closing industry'], answer: 0, why: 'It means dependable access to resources.' },
        { type: 'multiple_choice', question: 'What does desalination do?', options: ['Removes salt', 'Adds salt', 'Boils food'], answer: 0, why: 'It turns seawater into fresh water.' },
        { type: 'multiple_choice', question: 'What does sustainable management aim for?', options: ['Balance needs and limits', 'Ignore demand', 'Use everything now'], answer: 0, why: 'It protects resources for the future.' }
      ]
    }, {
      id: 'upper-secondary-geography-m2-l2',
      order: 2,
      title: 'Urban Issues and Challenges',
      objective: 'I can evaluate urban change and sustainable city solutions.',
      minutes: 10,
      recap: 'You evaluated urban change and sustainable city solutions.',
      blocks: [
        { type: 'text', body: 'Urban areas face housing pressure, congestion, and unequal access to services.' },
        { type: 'text', body: 'Rapid growth can create informal settlements and poor sanitation.' },
        { type: 'text', body: 'Successful cities invest in transport, green space, and affordable housing.' },
        { type: 'tip', body: 'Urban regeneration can improve areas but may raise prices and displace residents.' },
        {
          type: 'illustration',
          alt: 'A small house with a red roof and door.',
          image: 'assets/3d/house-3d.png',
          placeholder: 'House: housing demand and urban regeneration.'
        },
        { type: 'example', steps: ['A city population rises quickly.', 'Housing demand outstrips supply.', 'Rents rise.', 'Affordable homes are built.'] }
      ],
      vocabulary: [
        { word: 'regeneration', meaning: 'Improving a declining urban area.', example: 'Regeneration added parks and jobs.' },
        { word: 'congestion', meaning: 'Overcrowded roads or spaces.', example: 'Congestion slows commuters.' },
        { word: 'affordable', meaning: 'Cheap enough for local people.', example: 'The city needs affordable homes.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is an urban challenge?', options: ['Congestion', 'Empty villages', 'Too many forests'], answer: 0, why: 'Traffic and housing strain cities.' },
        { type: 'multiple_choice', question: 'What can regeneration cause?', options: ['Rising prices', 'Falling populations', 'Less transport'], answer: 0, why: 'Improvements can raise rents and displace people.' },
        { type: 'multiple_choice', question: 'What makes a city more sustainable?', options: ['Green space and transport', 'More sprawl', 'Fewer services'], answer: 0, why: 'Parks and public transport reduce pressure.' }
      ]
    }, {
      id: 'upper-secondary-geography-m2-l3',
      order: 3,
      title: 'Climate Change',
      objective: 'I can explain climate change causes, impacts, and responses.',
      minutes: 10,
      recap: 'You explained climate change causes, impacts, and responses.',
      blocks: [
        { type: 'text', body: 'Greenhouse gases trap heat and raise global average temperatures.' },
        { type: 'text', body: 'Burning fossil fuels, deforestation, and farming add carbon dioxide and methane.' },
        { type: 'text', body: 'Impacts include sea-level rise, extreme weather, and ecosystem stress.' },
        { type: 'tip', body: 'Mitigation cuts emissions; adaptation prepares for changes already locked in.' },
        {
          type: 'illustration',
          alt: 'A red thermometer showing a high temperature.',
          image: 'assets/3d/thermometer-3d.png',
          placeholder: 'Thermometer: rising temperatures and climate change.'
        },
        { type: 'example', steps: ['Factories burn coal and oil.', 'Carbon dioxide builds in the atmosphere.', 'More heat is trapped.', 'Global temperatures rise.'] }
      ],
      vocabulary: [
        { word: 'mitigation', meaning: 'Reducing the causes of climate change.', example: 'Renewable energy supports mitigation.' },
        { word: 'adaptation', meaning: 'Preparing for climate impacts.', example: 'Flood defences are adaptation.' },
        { word: 'emission', meaning: 'A gas released into the air.', example: 'Cars produce carbon emissions.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What traps heat in the atmosphere?', options: ['Greenhouse gases', 'Ocean salt', 'Mountain ice'], answer: 0, why: 'Gases such as carbon dioxide trap heat.' },
        { type: 'multiple_choice', question: 'Which activity adds carbon dioxide?', options: ['Burning fossil fuels', 'Planting trees', 'Cycling'], answer: 0, why: 'Coal, oil, and gas release carbon dioxide.' },
        { type: 'multiple_choice', question: 'What is adaptation?', options: ['Preparing for impacts', 'Ignoring risk', 'Increasing emissions'], answer: 0, why: 'Adaptation reduces harm from change.' }
      ]
    }]
  }];
}());

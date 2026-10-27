/* GCSE Physics — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'physics');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Energy and Forces',
    description: 'Energy stores, forces, and waves: the rules behind motion and transfer. Draft content.',
    lessons: [{
      id: 'upper-secondary-physics-m1-l1',
      order: 1,
      title: 'Energy Stores and Transfers',
      objective: 'I can describe energy stores and calculate efficiency.',
      minutes: 10,
      recap: 'You described energy stores, transfers, and efficiency.',
      blocks: [
        { type: 'text', body: 'Energy is stored as kinetic, gravitational, elastic, thermal, or chemical.' },
        { type: 'text', body: 'Energy transfers between stores but is never created or destroyed.' },
        { type: 'text', body: 'Useful output divided by total input gives efficiency.' },
        { type: 'tip', body: 'Efficiency is a ratio, so it has no units.' },
        {
          type: 'illustration',
          alt: 'A glowing yellow light bulb on a simple base.',
          image: 'assets/3d/light_bulb-3d.png',
          placeholder: 'Light bulb: electrical energy transferred to light and heat.'
        },
        { type: 'example', steps: ['A motor takes 100 J of electrical energy.', 'It transfers 70 J to movement.', 'Efficiency is 70 ÷ 100 = 0.70, or 70%.'] }
      ],
      vocabulary: [
        { word: 'kinetic', meaning: 'Energy of a moving object', example: 'A runner has kinetic energy.' },
        { word: 'efficiency', meaning: 'Useful output divided by total input', example: 'Efficiency can be a decimal.' },
        { word: 'transfer', meaning: 'Movement of energy between stores', example: 'A heater transfers thermal energy.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is an energy store?', options: ['Chemical', 'Efficiency', 'Power'], answer: 0, why: 'Chemical energy is stored in fuels and food.' },
        { type: 'multiple_choice', question: 'What is the efficiency of a 200 J input with 50 J useful output?', options: ['0.25', '0.50', '4.0'], answer: 0, why: 'Divide 50 by 200 to get 0.25.' },
        { type: 'multiple_choice', question: 'A falling ball speeds up. Which transfer occurs?', options: ['Gravitational to kinetic', 'Kinetic to chemical', 'Thermal to elastic'], answer: 0, why: 'Height decreases as speed increases.' }
      ]
    }, {
      id: 'upper-secondary-physics-m1-l2',
      order: 2,
      title: 'Forces and Motion',
      objective: 'I can use force, mass, and acceleration relationships.',
      minutes: 10,
      recap: 'You applied force, mass, and acceleration relationships.',
      blocks: [
        { type: 'text', body: 'Resultant force equals mass times acceleration (F = ma).' },
        { type: 'text', body: 'An object stays still or moves steadily when forces balance.' },
        { type: 'text', body: 'Weight equals mass times gravitational field strength (W = mg).' },
        { type: 'tip', body: 'Use newtons for force, kilograms for mass, and m/s² for acceleration.' },
        {
          type: 'illustration',
          alt: 'A white rocket lifting off with orange flames.',
          image: 'assets/3d/rocket-3d.png',
          placeholder: 'Rocket: a resultant force changes an object\u2019s motion.'
        },
        { type: 'example', steps: ['A 2 kg trolley has a resultant force of 6 N.', 'Acceleration is 6 ÷ 2.', 'The trolley accelerates at 3 m/s².'] }
      ],
      vocabulary: [
        { word: 'resultant', meaning: 'The single force replacing several forces', example: 'The resultant force is 6 N.' },
        { word: 'acceleration', meaning: 'Rate of change of velocity', example: 'Acceleration is measured in m/s².' },
        { word: 'weight', meaning: 'The force of gravity on a mass', example: 'Weight is measured in newtons.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is the equation for force?', options: ['F = ma', 'F = mv', 'F = m/a'], answer: 0, why: 'Force equals mass times acceleration.' },
        { type: 'multiple_choice', question: 'What happens when forces are balanced?', options: ['Velocity stays constant', 'Speed always increases', 'Mass changes'], answer: 0, why: 'No resultant force means no acceleration.' },
        { type: 'multiple_choice', question: 'A 4 kg object has a 12 N resultant force. What is its acceleration?', options: ['3 m/s²', '48 m/s²', '0.33 m/s²'], answer: 0, why: 'Divide 12 N by 4 kg.' }
      ]
    }, {
      id: 'upper-secondary-physics-m1-l3',
      order: 3,
      title: 'Waves',
      objective: 'I can describe wave properties and compare wave types.',
      minutes: 10,
      recap: 'You described wave properties and the two wave types.',
      blocks: [
        { type: 'text', body: 'Waves transfer energy without transferring matter.' },
        { type: 'text', body: 'Amplitude is maximum displacement; wavelength is distance between matching points.' },
        { type: 'text', body: 'Frequency is waves per second, measured in hertz.' },
        { type: 'tip', body: 'Wave speed equals frequency times wavelength.' },
        {
          type: 'illustration',
          alt: 'A curling blue ocean wave.',
          image: 'assets/3d/water_wave-3d.png',
          placeholder: 'Wave: amplitude, wavelength, and frequency labelled.'
        },
        { type: 'example', steps: ['A wave has frequency 2 Hz and wavelength 3 m.', 'Speed equals 2 × 3.', 'The wave travels at 6 m/s.'] }
      ],
      vocabulary: [
        { word: 'amplitude', meaning: 'Maximum displacement from rest', example: 'A loud sound has large amplitude.' },
        { word: 'wavelength', meaning: 'Distance between matching wave points', example: 'Wavelength is measured in metres.' },
        { word: 'frequency', meaning: 'Waves passing a point each second', example: 'Frequency is measured in hertz.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do waves transfer?', options: ['Energy', 'Matter', 'Mass'], answer: 0, why: 'Waves move energy, not the medium.' },
        { type: 'multiple_choice', question: 'Which wave is longitudinal?', options: ['Sound', 'Light', 'Radio'], answer: 0, why: 'Sound compresses and rarefies the medium.' },
        { type: 'multiple_choice', question: 'A wave has 5 Hz and 2 m wavelength. What is its speed?', options: ['10 m/s', '2.5 m/s', '7 m/s'], answer: 0, why: 'Multiply frequency by wavelength.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Electricity and Space',
    description: 'Circuits, magnetism, and the universe: charge, fields, and scale. Draft content.',
    lessons: [{
      id: 'upper-secondary-physics-m2-l1',
      order: 1,
      title: 'Electric Circuits',
      objective: 'I can describe current, voltage, and resistance in circuits.',
      minutes: 10,
      recap: 'You described current, voltage, resistance, and circuit rules.',
      blocks: [
        { type: 'text', body: 'Current is the rate of charge flow, measured in amperes.' },
        { type: 'text', body: 'Voltage is energy transferred per unit charge, measured in volts.' },
        { type: 'text', body: 'Resistance opposes current and is measured in ohms.' },
        { type: 'tip', body: 'In series, current is the same; voltage splits.' },
        {
          type: 'illustration',
          alt: 'A white electric plug with two metal pins.',
          image: 'assets/3d/electric_plug-3d.png',
          placeholder: 'Plug: current, voltage, and resistance in a circuit.'
        },
        { type: 'example', steps: ['A 12 V supply drives 3 A through a resistor.', 'Resistance equals voltage divided by current.', 'R = 12 ÷ 3 = 4 Ω.'] }
      ],
      vocabulary: [
        { word: 'current', meaning: 'Rate of charge flow', example: 'Current is measured in amperes.' },
        { word: 'voltage', meaning: 'Energy transferred per unit charge', example: 'Voltage is measured in volts.' },
        { word: 'resistance', meaning: 'Opposition to current', example: 'Resistance is measured in ohms.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is current measured in?', options: ['Amperes', 'Volts', 'Ohms'], answer: 0, why: 'Current is the flow of charge in amperes.' },
        { type: 'multiple_choice', question: 'What happens to current in a series circuit?', options: ['It is the same everywhere', 'It halves at each component', 'It becomes zero'], answer: 0, why: 'There is only one path for charge.' },
        { type: 'multiple_choice', question: 'A 6 V supply drives 2 A. What is the resistance?', options: ['3 Ω', '12 Ω', '0.33 Ω'], answer: 0, why: 'Divide voltage by current.' }
      ]
    }, {
      id: 'upper-secondary-physics-m2-l2',
      order: 2,
      title: 'Magnetism and Electromagnetism',
      objective: 'I can describe magnetic fields and electromagnetic induction.',
      minutes: 10,
      recap: 'You described magnetic fields and how electromagnets work.',
      blocks: [
        { type: 'text', body: 'Magnets have north and south poles; like poles repel.' },
        { type: 'text', body: 'A current-carrying wire creates a magnetic field around it.' },
        { type: 'text', body: 'Changing magnetic fields induce voltage in a conductor.' },
        { type: 'tip', body: 'Use the right-hand rule to predict field direction.' },
        {
          type: 'illustration',
          alt: 'A red and blue horseshoe magnet.',
          image: 'assets/3d/magnet-3d.png',
          placeholder: 'Magnet: field lines and the forces between poles.'
        },
        { type: 'example', steps: ['A wire carries current near a compass.', 'The needle deflects.', 'The current has created a magnetic field.'] }
      ],
      vocabulary: [
        { word: 'field', meaning: 'A region where a force acts', example: 'A magnet has a magnetic field.' },
        { word: 'electromagnet', meaning: 'A magnet made using current', example: 'An electromagnet can switch off.' },
        { word: 'induction', meaning: 'Creating voltage by changing a field', example: 'Generators use induction.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which poles repel?', options: ['North and north', 'North and south', 'South and south only'], answer: 0, why: 'Like poles repel each other.' },
        { type: 'multiple_choice', question: 'What creates an electromagnet?', options: ['Current in a coil', 'A permanent magnet', 'A battery alone'], answer: 0, why: 'Current through a coil produces a field.' },
        { type: 'multiple_choice', question: 'How can voltage be induced?', options: ['Move a magnet near a coil', 'Hold a magnet still', 'Heat a wire'], answer: 0, why: 'A changing field induces voltage.' }
      ]
    }, {
      id: 'upper-secondary-physics-m2-l3',
      order: 3,
      title: 'Space and the Universe',
      objective: 'I can describe the solar system, stars, and the expanding universe.',
      minutes: 10,
      recap: 'You described orbits, star life cycles, and redshift.',
      blocks: [
        { type: 'text', body: 'Gravity keeps planets in orbit around the Sun.' },
        { type: 'text', body: 'Stars form from gas clouds and fuse hydrogen into helium.' },
        { type: 'text', body: 'Redshift shows that distant galaxies move away from us.' },
        { type: 'tip', body: 'Distances in space are measured in light-years, not kilometres.' },
        {
          type: 'illustration',
          alt: 'A purple planet with a wide ring.',
          image: 'assets/3d/ringed_planet-3d.png',
          placeholder: 'Ringed planet: orbits, stars, and the scale of space.'
        },
        { type: 'example', steps: ['A star\u2019s light is shifted toward red.', 'The star is moving away.', 'The universe is expanding.'] }
      ],
      vocabulary: [
        { word: 'orbit', meaning: 'A curved path around a larger object', example: 'Earth orbits the Sun.' },
        { word: 'galaxy', meaning: 'A huge group of stars', example: 'The Milky Way is a galaxy.' },
        { word: 'redshift', meaning: 'Light stretched as a source moves away', example: 'Redshift shows expansion.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What keeps planets in orbit?', options: ['Gravity', 'Magnetism', 'Friction'], answer: 0, why: 'Gravity provides the centripetal force.' },
        { type: 'multiple_choice', question: 'What do stars fuse in their cores?', options: ['Hydrogen into helium', 'Helium into iron', 'Oxygen into carbon'], answer: 0, why: 'Hydrogen fusion releases energy.' },
        { type: 'multiple_choice', question: 'What does redshift suggest?', options: ['Galaxies are moving away', 'Stars are cooling only', 'Light has mass'], answer: 0, why: 'Stretched wavelengths indicate recession.' }
      ]
    }]
  }];
}());

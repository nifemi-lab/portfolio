/* GCSE Chemistry — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'chemistry');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Atomic Structure and Bonding',
    description: 'Atoms, bonding, and structure: how particles arrange and why materials behave. Draft content.',
    lessons: [{
      id: 'upper-secondary-chemistry-m1-l1',
      order: 1,
      title: 'Atoms and the Periodic Table',
      objective: 'I can describe atomic structure and use the periodic table.',
      minutes: 10,
      recap: 'You described atomic structure and periodic trends.',
      blocks: [
        { type: 'text', body: 'Atoms contain protons and neutrons in the nucleus, with electrons in shells.' },
        { type: 'text', body: 'Atomic number equals protons; mass number equals protons plus neutrons.' },
        { type: 'text', body: 'Elements are arranged by atomic number; groups share outer-shell electrons.' },
        { type: 'tip', body: 'Electrons are tiny, so almost all atom mass is in the nucleus.' },
        {
          type: 'illustration',
          alt: 'A blue atom symbol with orbiting paths.',
          image: 'assets/3d/atom_symbol-3d.png',
          placeholder: 'Atom: protons and neutrons in the nucleus, electrons in shells.'
        },
        { type: 'example', steps: ['Sodium has atomic number 11.', 'It has 11 protons and 11 electrons.', 'Mass number 23 means 12 neutrons.'] }
      ],
      vocabulary: [
        { word: 'proton', meaning: 'A positive particle in the nucleus', example: 'Protons define the element.' },
        { word: 'electron', meaning: 'A negative particle in shells', example: 'Electrons occupy shells.' },
        { word: 'isotope', meaning: 'Same protons, different neutrons', example: 'Carbon-14 is an isotope.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does atomic number equal?', options: ['Protons', 'Neutrons', 'Electrons plus neutrons'], answer: 0, why: 'Atomic number is the proton count.' },
        { type: 'multiple_choice', question: 'Where is most atomic mass found?', options: ['Nucleus', 'Outer shell', 'Between shells'], answer: 0, why: 'Protons and neutrons carry nearly all the mass.' },
        { type: 'multiple_choice', question: 'An atom has 12 protons and 14 neutrons. What is its mass number?', options: ['26', '12', '14'], answer: 0, why: 'Add protons and neutrons to get mass number.' }
      ]
    }, {
      id: 'upper-secondary-chemistry-m1-l2',
      order: 2,
      title: 'Ionic and Covalent Bonding',
      objective: 'I can explain ionic and covalent bonding and their properties.',
      minutes: 10,
      recap: 'You explained how ionic and covalent bonds form.',
      blocks: [
        { type: 'text', body: 'Ionic bonds form when electrons transfer from metals to non-metals.' },
        { type: 'text', body: 'Oppositely charged ions attract and form a giant ionic lattice.' },
        { type: 'text', body: 'Covalent bonds form when non-metals share pairs of electrons.' },
        { type: 'tip', body: 'Ionic compounds conduct when molten or dissolved, not solid.' },
        {
          type: 'illustration',
          alt: 'Two interlocking silver chain links.',
          image: 'assets/3d/link-3d.png',
          placeholder: 'Links: bonds hold particles together in a structure.'
        },
        { type: 'example', steps: ['Sodium loses one electron.', 'Chlorine gains one electron.', 'The ions attract and form sodium chloride.'] }
      ],
      vocabulary: [
        { word: 'ion', meaning: 'A charged atom or group of atoms', example: 'Sodium ions are positive.' },
        { word: 'covalent', meaning: 'A bond formed by shared electrons', example: 'Water has covalent bonds.' },
        { word: 'lattice', meaning: 'A regular repeating arrangement', example: 'Salt forms an ionic lattice.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How do ionic bonds form?', options: ['Electron transfer', 'Electron sharing', 'Neutron sharing'], answer: 0, why: 'Metals transfer electrons to non-metals.' },
        { type: 'multiple_choice', question: 'What holds ions together?', options: ['Opposite charges', 'Shared neutrons', 'Magnetism'], answer: 0, why: 'Opposite charges attract.' },
        { type: 'multiple_choice', question: 'Which substance conducts when dissolved?', options: ['An ionic compound', 'A covalent gas', 'A pure metal only'], answer: 0, why: 'Dissolved ions are free to move.' }
      ]
    }, {
      id: 'upper-secondary-chemistry-m1-l3',
      order: 3,
      title: 'Structure and Properties',
      objective: 'I can link a substance\u2019s structure to its properties.',
      minutes: 10,
      recap: 'You linked structure and bonding to material properties.',
      blocks: [
        { type: 'text', body: 'Giant covalent structures have high melting points because many bonds break.' },
        { type: 'text', body: 'Simple molecular substances have weak forces between molecules.' },
        { type: 'text', body: 'Metals have delocalised electrons, so they conduct and bend.' },
        { type: 'tip', body: 'Explain properties from structure, not by memorising lists.' },
        {
          type: 'illustration',
          alt: 'A red clay brick with a soft shadow.',
          image: 'assets/3d/brick-3d.png',
          placeholder: 'Brick: structure and bonding explain how a material behaves.'
        },
        { type: 'example', steps: ['Diamond is a giant covalent structure.', 'Each carbon bonds to four others.', 'It is very hard and has a high melting point.'] }
      ],
      vocabulary: [
        { word: 'molecule', meaning: 'Two or more atoms bonded together', example: 'Water is a molecule.' },
        { word: 'delocalised', meaning: 'Electrons free to move through a metal', example: 'Delocalised electrons conduct.' },
        { word: 'property', meaning: 'A characteristic of a material', example: 'Hardness is a property.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why does diamond have a high melting point?', options: ['Many strong bonds', 'Weak forces', 'Free electrons'], answer: 0, why: 'Giant covalent bonds need lots of energy to break.' },
        { type: 'multiple_choice', question: 'Why do metals conduct electricity?', options: ['Delocalised electrons', 'Ions in a lattice', 'Shared protons'], answer: 0, why: 'Free electrons carry charge.' },
        { type: 'multiple_choice', question: 'A substance is soft and melts easily. What structure is likely?', options: ['Simple molecular', 'Giant ionic', 'Giant covalent'], answer: 0, why: 'Weak forces between molecules break easily.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Reactions and Analysis',
    description: 'Equations, acids, and rates: how reactions happen and how conditions change them. Draft content.',
    lessons: [{
      id: 'upper-secondary-chemistry-m2-l1',
      order: 1,
      title: 'Chemical Reactions and Equations',
      objective: 'I can write and balance simple chemical equations.',
      minutes: 10,
      recap: 'You wrote and balanced equations and described reaction types.',
      blocks: [
        { type: 'text', body: 'A chemical reaction rearranges atoms; mass is conserved.' },
        { type: 'text', body: 'Word equations name reactants and products; symbol equations show formulas.' },
        { type: 'text', body: 'Balance equations by changing coefficients, never subscripts.' },
        { type: 'tip', body: 'Count atoms on both sides before calling an equation balanced.' },
        {
          type: 'illustration',
          alt: 'A glass test tube holding blue liquid.',
          image: 'assets/3d/test_tube-3d.png',
          placeholder: 'Test tube: reactants rearranged into products.'
        },
        { type: 'example', steps: ['Hydrogen reacts with oxygen.', 'The word equation is hydrogen + oxygen → water.', 'Balanced: 2H₂ + O₂ → 2H₂O.'] }
      ],
      vocabulary: [
        { word: 'reactant', meaning: 'A substance used up in a reaction', example: 'Oxygen is a reactant.' },
        { word: 'product', meaning: 'A substance formed in a reaction', example: 'Water is the product.' },
        { word: 'coefficient', meaning: 'A number placed before a formula', example: 'The coefficient 2 balances hydrogen.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What must be conserved in a reaction?', options: ['Atoms', 'Molecules', 'Volume'], answer: 0, why: 'Atoms are rearranged, not created.' },
        { type: 'multiple_choice', question: 'How do you balance an equation?', options: ['Change coefficients', 'Change subscripts', 'Remove products'], answer: 0, why: 'Coefficients adjust amounts without changing formulas.' },
        { type: 'multiple_choice', question: '2H₂ + O₂ → ? What is the product?', options: ['2H₂O', 'H₂O₂', '2HO'], answer: 0, why: 'Two water molecules balance four hydrogen and two oxygen atoms.' }
      ]
    }, {
      id: 'upper-secondary-chemistry-m2-l2',
      order: 2,
      title: 'Acids, Bases, and Salts',
      objective: 'I can describe acid-base reactions and the pH scale.',
      minutes: 10,
      recap: 'You explained neutralisation and how salts form.',
      blocks: [
        { type: 'text', body: 'Acids release hydrogen ions in water; bases neutralise acids.' },
        { type: 'text', body: 'The pH scale runs from 0 to 14; below 7 is acidic, above 7 is alkaline.' },
        { type: 'text', body: 'Acid plus base gives salt plus water in neutralisation.' },
        { type: 'tip', body: 'Use universal indicator to estimate pH, not to identify a salt.' },
        {
          type: 'illustration',
          alt: 'A glass alembic used for heating liquids.',
          image: 'assets/3d/alembic-3d.png',
          placeholder: 'Alembic: acid and base reacting in neutralisation.'
        },
        { type: 'example', steps: ['Hydrochloric acid reacts with sodium hydroxide.', 'The products are sodium chloride and water.', 'The solution becomes neutral.'] }
      ],
      vocabulary: [
        { word: 'acid', meaning: 'A substance that releases hydrogen ions', example: 'Vinegar is an acid.' },
        { word: 'base', meaning: 'A substance that neutralises an acid', example: 'Sodium hydroxide is a base.' },
        { word: 'neutralisation', meaning: 'Acid plus base forming salt and water', example: 'Neutralisation raises pH.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is the pH of a neutral solution?', options: ['7', '0', '14'], answer: 0, why: 'Pure water is neutral at pH 7.' },
        { type: 'multiple_choice', question: 'What are the products of acid plus base?', options: ['Salt and water', 'Salt and oxygen', 'Hydrogen and water'], answer: 0, why: 'Neutralisation forms a salt and water.' },
        { type: 'multiple_choice', question: 'A solution has pH 2. What is it?', options: ['Strongly acidic', 'Neutral', 'Strongly alkaline'], answer: 0, why: 'Low pH values indicate strong acidity.' }
      ]
    }, {
      id: 'upper-secondary-chemistry-m2-l3',
      order: 3,
      title: 'Rates of Reaction',
      objective: 'I can explain how concentration, temperature, and surface area affect rate.',
      minutes: 10,
      recap: 'You explained collision theory and the factors affecting rate.',
      blocks: [
        { type: 'text', body: 'Reactions happen when particles collide with enough energy.' },
        { type: 'text', body: 'Higher temperature, concentration, or surface area increases collision frequency.' },
        { type: 'text', body: 'Catalysts lower the activation energy without being used up.' },
        { type: 'tip', body: 'Rate measures change per unit time, not the total amount produced.' },
        {
          type: 'illustration',
          alt: 'A bright orange flame on a dark background.',
          image: 'assets/3d/fire-3d.png',
          placeholder: 'Flame: reaction rate and the energy needed to start.'
        },
        { type: 'example', steps: ['Powdered calcium carbonate reacts faster than lumps.', 'The powder has more surface area.', 'More particles are exposed to acid.'] }
      ],
      vocabulary: [
        { word: 'catalyst', meaning: 'Speeds up a reaction without being used up', example: 'Enzymes are biological catalysts.' },
        { word: 'activation energy', meaning: 'The minimum energy needed to react', example: 'Catalysts lower activation energy.' },
        { word: 'concentration', meaning: 'Amount of substance in a volume', example: 'Higher concentration speeds reactions.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why does heating speed up a reaction?', options: ['More energetic collisions', 'Fewer particles', 'Lower activation energy'], answer: 0, why: 'Hotter particles collide more often and with more energy.' },
        { type: 'multiple_choice', question: 'What does a catalyst do?', options: ['Lowers activation energy', 'Increases products', 'Changes the equation'], answer: 0, why: 'Catalysts provide an easier reaction path.' },
        { type: 'multiple_choice', question: 'Why does powder react faster than a lump?', options: ['Greater surface area', 'Higher mass', 'Lower temperature'], answer: 0, why: 'More surface is exposed to collisions.' }
      ]
    }]
  }];
}());

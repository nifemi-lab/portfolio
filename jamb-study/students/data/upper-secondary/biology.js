/* GCSE Biology — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'biology');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Cells and Organisation',
    description: 'Cell structure, enzymes, and transport: how cells work and exchange materials. Draft content.',
    lessons: [{
      id: 'upper-secondary-biology-m1-l1',
      order: 1,
      title: 'Cell Structure and Function',
      objective: 'I can compare cell structures and link each to its function.',
      minutes: 10,
      recap: 'You compared cell structures and linked them to their functions.',
      blocks: [
        { type: 'text', body: 'Eukaryotic cells contain membrane-bound organelles. The nucleus holds DNA, while mitochondria release energy through respiration.' },
        { type: 'text', body: 'Ribosomes build proteins. The endoplasmic reticulum folds and transports them, and the Golgi apparatus packages them for use or export.' },
        { type: 'text', body: 'Plant cells add a cellulose cell wall, chloroplasts for photosynthesis, and a permanent vacuole for support.' },
        { type: 'tip', body: 'Link every organelle to a job, not just a label.' },
        {
          type: 'illustration',
          alt: 'A white laboratory microscope with a prepared slide.',
          image: 'assets/3d/microscope-3d.png',
          placeholder: 'Microscope: organelles viewed at increasing magnification.'
        },
        { type: 'example', steps: ['A cell needs lots of energy.', 'It contains many mitochondria.', 'More mitochondria support more respiration.'] }
      ],
      vocabulary: [
        { word: 'organelle', meaning: 'A specialised structure inside a cell', example: 'Mitochondria are organelles.' },
        { word: 'mitochondrion', meaning: 'The organelle where respiration releases energy', example: 'Muscle cells have many mitochondria.' },
        { word: 'ribosome', meaning: 'The organelle that builds proteins', example: 'Ribosomes assemble amino acids.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which organelle releases energy by respiration?', options: ['Mitochondrion', 'Nucleus', 'Vacuole'], answer: 0, why: 'Mitochondria are the site of aerobic respiration.' },
        { type: 'multiple_choice', question: 'What is the function of ribosomes?', options: ['Building proteins', 'Storing water', 'Controlling entry'], answer: 0, why: 'Ribosomes assemble proteins from amino acids.' },
        { type: 'multiple_choice', question: 'A leaf cell is green. Which organelle causes this?', options: ['Chloroplast', 'Nucleus', 'Ribosome'], answer: 0, why: 'Chloroplasts contain chlorophyll for photosynthesis.' }
      ]
    }, {
      id: 'upper-secondary-biology-m1-l2',
      order: 2,
      title: 'Enzymes and Digestion',
      objective: 'I can explain how enzymes break down food during digestion.',
      minutes: 10,
      recap: 'You explained enzyme action and the effect of temperature and pH.',
      blocks: [
        { type: 'text', body: 'Enzymes are proteins that speed up reactions without being used up.' },
        { type: 'text', body: 'Each enzyme has an active site that fits one substrate, like a lock and key.' },
        { type: 'text', body: 'Amylase breaks down starch, protease breaks down protein, and lipase breaks down fat.' },
        { type: 'text', body: 'Temperature and pH change enzyme shape and activity.' },
        { type: 'tip', body: 'Denatured enzymes cannot fit their substrate.' },
        {
          type: 'illustration',
          alt: 'A glass test tube holding blue liquid.',
          image: 'assets/3d/test_tube-3d.png',
          placeholder: 'Test tube: enzyme activity measured under changing conditions.'
        },
        { type: 'example', steps: ['Starch meets amylase in the mouth.', 'The enzyme breaks it into sugars.', 'The sugars are absorbed in the small intestine.'] }
      ],
      vocabulary: [
        { word: 'enzyme', meaning: 'A protein that speeds up a reaction', example: 'Amylase is a digestive enzyme.' },
        { word: 'substrate', meaning: 'The molecule an enzyme acts on', example: 'Starch is the substrate for amylase.' },
        { word: 'denature', meaning: 'Change shape so an enzyme stops working', example: 'High heat denatures enzymes.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What makes enzymes specific?', options: ['Their active site shape', 'Their colour', 'Their size'], answer: 0, why: 'Only matching substrates fit the active site.' },
        { type: 'multiple_choice', question: 'Which enzyme breaks down starch?', options: ['Amylase', 'Protease', 'Lipase'], answer: 0, why: 'Amylase converts starch into sugars.' },
        { type: 'multiple_choice', question: 'An enzyme is heated above its optimum. What happens?', options: ['It denatures', 'It works faster', 'It becomes a substrate'], answer: 0, why: 'Heat changes the active site shape.' }
      ]
    }, {
      id: 'upper-secondary-biology-m1-l3',
      order: 3,
      title: 'Transport in Cells',
      objective: 'I can explain diffusion, osmosis, and active transport.',
      minutes: 10,
      recap: 'You compared diffusion, osmosis, and active transport.',
      blocks: [
        { type: 'text', body: 'Diffusion moves particles from high to low concentration without energy.' },
        { type: 'text', body: 'Osmosis is the diffusion of water across a partially permeable membrane.' },
        { type: 'text', body: 'Active transport moves substances against a concentration gradient and needs energy.' },
        { type: 'tip', body: 'Osmosis is about water only; diffusion covers other particles.' },
        {
          type: 'illustration',
          alt: 'A large blue water droplet with a shine.',
          image: 'assets/3d/droplet-3d.png',
          placeholder: 'Droplet: water moving across a membrane by osmosis.'
        },
        { type: 'example', steps: ['A root hair cell has low mineral concentration.', 'It uses active transport to absorb minerals.', 'Respiration supplies the energy for this.'] }
      ],
      vocabulary: [
        { word: 'diffusion', meaning: 'Movement from high to low concentration', example: 'Oxygen diffuses into blood.' },
        { word: 'osmosis', meaning: 'Water movement across a membrane', example: 'Osmosis moves water into roots.' },
        { word: 'active transport', meaning: 'Movement against a gradient using energy', example: 'Roots use active transport.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which process needs energy?', options: ['Active transport', 'Diffusion', 'Osmosis'], answer: 0, why: 'Active transport moves substances against a gradient.' },
        { type: 'multiple_choice', question: 'What moves during osmosis?', options: ['Water', 'Starch', 'Protein'], answer: 0, why: 'Osmosis is water across a membrane.' },
        { type: 'multiple_choice', question: 'A cell is placed in pure water. What is likely?', options: ['Water enters by osmosis', 'Water leaves by osmosis', 'Nothing moves'], answer: 0, why: 'Water moves toward the higher solute concentration inside.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Genetics and Ecosystems',
    description: 'DNA, inheritance, selection, and ecosystems: how life varies and interacts. Draft content.',
    lessons: [{
      id: 'upper-secondary-biology-m2-l1',
      order: 1,
      title: 'DNA and Inheritance',
      objective: 'I can explain how genes pass traits from parents to offspring.',
      minutes: 10,
      recap: 'You explained genes, alleles, and how traits are inherited.',
      blocks: [
        { type: 'text', body: 'DNA carries the genetic code in a double helix.' },
        { type: 'text', body: 'A gene is a section of DNA that codes for a protein.' },
        { type: 'text', body: 'Alleles are different versions of a gene; dominant alleles mask recessive ones.' },
        { type: 'tip', body: 'Use a Punnett square to predict ratios, not exact outcomes.' },
        {
          type: 'illustration',
          alt: 'A double helix model of DNA in blue and purple.',
          image: 'assets/3d/dna-3d.png',
          placeholder: 'DNA: the double helix that carries genetic code.'
        },
        { type: 'example', steps: ['Both parents carry one dominant brown-eye allele.', 'Their children can inherit brown or blue eyes.', 'The ratio is three brown to one blue.'] }
      ],
      vocabulary: [
        { word: 'gene', meaning: 'A DNA section coding for a protein', example: 'A gene controls eye colour.' },
        { word: 'allele', meaning: 'A version of a gene', example: 'Brown and blue are alleles.' },
        { word: 'dominant', meaning: 'An allele expressed even with one copy', example: 'Brown eyes are dominant.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a gene?', options: ['A section of DNA', 'A whole chromosome', 'A protein'], answer: 0, why: 'Genes are DNA sections that code for proteins.' },
        { type: 'multiple_choice', question: 'What does dominant mean?', options: ['Expressed with one copy', 'Always hidden', 'Only in plants'], answer: 0, why: 'One dominant allele is enough to show the trait.' },
        { type: 'multiple_choice', question: 'Two heterozygous parents have a child. What ratio is expected?', options: ['3:1', '1:1', '4:0'], answer: 0, why: 'A monohybrid cross gives a 3:1 phenotype ratio.' }
      ]
    }, {
      id: 'upper-secondary-biology-m2-l2',
      order: 2,
      title: 'Natural Selection',
      objective: 'I can explain natural selection and how it leads to evolution.',
      minutes: 10,
      recap: 'You explained variation, selection pressure, and adaptation.',
      blocks: [
        { type: 'text', body: 'Individuals in a species vary because of differences in genes.' },
        { type: 'text', body: 'A selection pressure, such as predators or disease, favours useful variations.' },
        { type: 'text', body: 'Survivors reproduce and pass advantageous alleles to their offspring.' },
        { type: 'tip', body: 'Populations evolve, not individuals.' },
        {
          type: 'illustration',
          alt: 'A leafy green tree with a brown trunk.',
          image: 'assets/3d/deciduous_tree-3d.png',
          placeholder: 'Tree: branching relationships and survival over generations.'
        },
        { type: 'example', steps: ['Some beetles are green; others are brown.', 'Birds spot green beetles on brown soil.', 'Brown beetles survive and pass on brown colour.'] }
      ],
      vocabulary: [
        { word: 'variation', meaning: 'Differences between individuals', example: 'Variation gives selection material.' },
        { word: 'adaptation', meaning: 'A feature that improves survival', example: 'Camouflage is an adaptation.' },
        { word: 'evolution', meaning: 'Change in inherited traits over generations', example: 'Evolution follows natural selection.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What provides the variation needed for selection?', options: ['Genetic differences', 'Weather alone', 'Learning'], answer: 0, why: 'Genes create inherited variation.' },
        { type: 'multiple_choice', question: 'Who evolves?', options: ['Populations', 'Individuals', 'Single cells only'], answer: 0, why: 'Allele frequencies change across a population.' },
        { type: 'multiple_choice', question: 'Antibiotics kill most bacteria. What happens to resistant ones?', options: ['They survive and multiply', 'They become weaker', 'They turn into viruses'], answer: 0, why: 'Resistance is selected for and passed on.' }
      ]
    }, {
      id: 'upper-secondary-biology-m2-l3',
      order: 3,
      title: 'Ecosystems and Cycles',
      objective: 'I can explain how organisms interact and how materials cycle.',
      minutes: 10,
      recap: 'You explained interdependence and the carbon and water cycles.',
      blocks: [
        { type: 'text', body: 'An ecosystem includes organisms and the physical environment they share.' },
        { type: 'text', body: 'Food webs show feeding relationships; removing one species affects others.' },
        { type: 'text', body: 'The carbon cycle moves carbon between air, organisms, soil, and fossil fuels.' },
        { type: 'text', body: 'The water cycle moves water through evaporation, condensation, and precipitation.' },
        { type: 'tip', body: 'Energy flows through ecosystems, but matter cycles.' },
        {
          type: 'illustration',
          alt: 'A small green herb plant with several leaves.',
          image: 'assets/3d/herb-3d.png',
          placeholder: 'Ecosystem: organisms, feeding links, and material cycles.'
        },
        { type: 'example', steps: ['Plants absorb carbon dioxide.', 'Animals eat plants and release carbon dioxide.', 'Decomposers return carbon to the soil.'] }
      ],
      vocabulary: [
        { word: 'ecosystem', meaning: 'Organisms and their shared environment', example: 'A pond is an ecosystem.' },
        { word: 'interdependence', meaning: 'Species depending on each other', example: 'Predators and prey are interdependent.' },
        { word: 'decomposer', meaning: 'Breaks down dead material', example: 'Fungi decompose leaves.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do food webs show?', options: ['Feeding relationships', 'Weather patterns', 'Genetic codes'], answer: 0, why: 'Food webs link producers and consumers.' },
        { type: 'multiple_choice', question: 'What cycles through an ecosystem?', options: ['Matter', 'Energy', 'Nothing'], answer: 0, why: 'Carbon and water cycle; energy flows through.' },
        { type: 'multiple_choice', question: 'Decomposers are removed. What is likely?', options: ['Nutrients stop returning to soil', 'Plants grow faster', 'Carbon disappears'], answer: 0, why: 'Decomposers recycle nutrients.' }
      ]
    }]
  }];
}());

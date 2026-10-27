/* Lower Secondary History — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'history');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Medieval to Early Modern',
    description: 'Conquest, belief, and new ideas: Europe from the Middle Ages to the Renaissance. Draft content.',
    lessons: [{
      id: 'lower-secondary-history-m1-l1',
      order: 1,
      title: 'The Norman Conquest',
      objective: 'I can explain how the Norman Conquest changed England.',
      minutes: 8,
      recap: 'You explained how the Norman Conquest changed England.',
      blocks: [
        { type: 'text', body: 'In 1066, William of Normandy defeated King Harold at the Battle of Hastings.' },
        { type: 'text', body: 'William became king and replaced many Anglo-Saxon lords with Norman nobles.' },
        { type: 'text', body: 'The Normans built castles to control towns and land.' },
        { type: 'tip', body: 'The Domesday Book recorded land and wealth for taxation.' },
        {
          type: 'illustration',
          alt: 'A stone castle with tall towers and a gate.',
          image: 'assets/3d/castle-3d.png',
          placeholder: 'Castle: Norman control of towns and land.'
        },
        { type: 'example', steps: ['Harold became king in January 1066.', 'William invaded from Normandy.', 'Harold died at Hastings.', 'William was crowned on Christmas Day.'] }
      ],
      vocabulary: [
        { word: 'conquest', meaning: 'Taking control by force.', example: 'The Norman conquest changed England.' },
        { word: 'noble', meaning: 'A powerful landowner.', example: 'Norman nobles held large estates.' },
        { word: 'invade', meaning: 'Enter a place with an army.', example: 'William invaded England in 1066.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who won the Battle of Hastings?', options: ['William', 'Harold', 'Edward'], answer: 0, why: 'William defeated Harold in 1066.' },
        { type: 'multiple_choice', question: 'Why did the Normans build castles?', options: ['To control land', 'To store crops', 'To hold markets'], answer: 0, why: 'Castles secured Norman power.' },
        { type: 'multiple_choice', question: 'What was the Domesday Book for?', options: ['Recording land and wealth', 'Writing poems', 'Mapping stars'], answer: 0, why: 'It helped the king collect taxes.' }
      ]
    }, {
      id: 'lower-secondary-history-m1-l2',
      order: 2,
      title: 'Religion and the Church',
      objective: 'I can describe the role of the Church in medieval life.',
      minutes: 8,
      recap: 'You described the Church\u2019s role in medieval life.',
      blocks: [
        { type: 'text', body: 'The Church was central to medieval life in Europe.' },
        { type: 'text', body: 'It ran schools, hospitals, and charities, and told people how to live.' },
        { type: 'text', body: 'Monasteries preserved books and educated monks.' },
        { type: 'tip', body: 'Church courts could punish people for religious offences.' },
        {
          type: 'illustration',
          alt: 'A stone church with arches and a tall spire.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Church: worship, learning, and daily rules.'
        },
        { type: 'example', steps: ['A village built a stone church.', 'The priest led weekly worship.', 'Monks copied books by hand.', 'The Church shaped local life.'] }
      ],
      vocabulary: [
        { word: 'monastery', meaning: 'A home for monks.', example: 'Monks lived in the monastery.' },
        { word: 'priest', meaning: 'A religious leader.', example: 'The priest led the service.' },
        { word: 'tithe', meaning: 'A tenth of income given to the Church.', example: 'Farmers paid a tithe each year.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What did monasteries preserve?', options: ['Books', 'Castles', 'Roads'], answer: 0, why: 'Monks copied and kept manuscripts.' },
        { type: 'multiple_choice', question: 'Who led worship in a village church?', options: ['A priest', 'A knight', 'A merchant'], answer: 0, why: 'The priest led church services.' },
        { type: 'multiple_choice', question: 'Why was the Church powerful?', options: ['It shaped daily life', 'It owned no land', 'It avoided education'], answer: 0, why: 'The Church influenced beliefs and laws.' }
      ]
    }, {
      id: 'lower-secondary-history-m1-l3',
      order: 3,
      title: 'The Renaissance',
      objective: 'I can explain what changed during the Renaissance.',
      minutes: 8,
      recap: 'You explained the new ideas and art of the Renaissance.',
      blocks: [
        { type: 'text', body: 'The Renaissance was a period of renewed interest in art and learning.' },
        { type: 'text', body: 'It began in Italian cities such as Florence around the 1400s.' },
        { type: 'text', body: 'Artists studied anatomy, perspective, and classical texts.' },
        { type: 'tip', body: 'Printing helped new ideas spread across Europe.' },
        {
          type: 'illustration',
          alt: 'A wooden artist palette with paint colours.',
          image: 'assets/3d/artist-palette-3d.png',
          placeholder: 'Palette: art, observation, and new techniques.'
        },
        { type: 'example', steps: ['Artists studied ancient Roman art.', 'They used perspective for depth.', 'Printing spread new books.', 'Ideas reached more people.'] }
      ],
      vocabulary: [
        { word: 'renaissance', meaning: 'A rebirth of art and learning.', example: 'The Renaissance began in Italy.' },
        { word: 'perspective', meaning: 'A way to show depth in art.', example: 'Perspective made paintings look real.' },
        { word: 'anatomy', meaning: 'The structure of the body.', example: 'Artists studied anatomy to draw people.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where did the Renaissance begin?', options: ['Italian cities', 'English villages', 'Spanish farms'], answer: 0, why: 'It began in cities such as Florence.' },
        { type: 'multiple_choice', question: 'What did perspective help artists show?', options: ['Depth', 'Sound', 'Weather'], answer: 0, why: 'Perspective creates a sense of depth.' },
        { type: 'multiple_choice', question: 'How did printing help?', options: ['It spread ideas', 'It stopped art', 'It closed schools'], answer: 0, why: 'Printed books reached more readers.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Empire and Industry',
    description: 'Empire, industry, and reform: how Britain changed between 1700 and 1900. Draft content.',
    lessons: [{
      id: 'lower-secondary-history-m2-l1',
      order: 1,
      title: 'The British Empire',
      objective: 'I can explain how the British Empire grew and its effects.',
      minutes: 8,
      recap: 'You explained how the British Empire grew and affected people.',
      blocks: [
        { type: 'text', body: 'The British Empire grew through trade, settlement, and conquest.' },
        { type: 'text', body: 'By 1900, it governed about a quarter of the world\u2019s people.' },
        { type: 'text', body: 'Colonies supplied raw materials and bought British goods.' },
        { type: 'tip', body: 'Empire brought wealth to Britain but harmed many colonised people.' },
        {
          type: 'illustration',
          alt: 'A large sailing ship on blue water.',
          image: 'assets/3d/ship-3d.png',
          placeholder: 'Ship: trade routes linking Britain and its colonies.'
        },
        { type: 'example', steps: ['British ships carried goods across oceans.', 'Colonies sold tea, sugar, and cotton.', 'Profits flowed back to Britain.', 'Local people often lost land and rights.'] }
      ],
      vocabulary: [
        { word: 'empire', meaning: 'A group of lands ruled by one country.', example: 'The British Empire spanned the globe.' },
        { word: 'colony', meaning: 'A territory controlled by another country.', example: 'India was a British colony.' },
        { word: 'trade', meaning: 'Buying and selling goods.', example: 'Trade ships crossed the Atlantic.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How did the British Empire grow?', options: ['Trade and conquest', 'Sport and music', 'Weather and tides'], answer: 0, why: 'Trade, settlement, and conquest expanded it.' },
        { type: 'multiple_choice', question: 'What did colonies supply?', options: ['Raw materials', 'Spacecraft', 'Ice caps'], answer: 0, why: 'Colonies provided goods such as cotton.' },
        { type: 'multiple_choice', question: 'Who often suffered under empire?', options: ['Colonised peoples', 'Only kings', 'Sea birds'], answer: 0, why: 'Many colonised people lost land and rights.' }
      ]
    }, {
      id: 'lower-secondary-history-m2-l2',
      order: 2,
      title: 'The Industrial Revolution',
      objective: 'I can describe how industrialisation changed Britain.',
      minutes: 8,
      recap: 'You described how industrialisation changed work and cities.',
      blocks: [
        { type: 'text', body: 'The Industrial Revolution began in Britain in the late 1700s.' },
        { type: 'text', body: 'Machines moved production from homes to factories.' },
        { type: 'text', body: 'Coal and steam powered trains, ships, and mills.' },
        { type: 'tip', body: 'Factory work was often long, loud, and dangerous.' },
        {
          type: 'illustration',
          alt: 'A tall factory with smoking chimneys.',
          image: 'assets/3d/factory-3d.png',
          placeholder: 'Factory: machines, coal, and mass production.'
        },
        { type: 'example', steps: ['A worker once made cloth at home.', 'New machines wove faster.', 'Factories gathered workers in towns.', 'Towns grew quickly and became crowded.'] }
      ],
      vocabulary: [
        { word: 'industry', meaning: 'Making goods with machines.', example: 'Industry grew in northern towns.' },
        { word: 'factory', meaning: 'A building where goods are made.', example: 'The factory ran through the night.' },
        { word: 'urban', meaning: 'Relating to towns and cities.', example: 'Urban areas grew quickly.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where did the Industrial Revolution begin?', options: ['Britain', 'Egypt', 'Japan'], answer: 0, why: 'It began in Britain in the late 1700s.' },
        { type: 'multiple_choice', question: 'What powered early factories?', options: ['Coal and steam', 'Solar panels', 'Wind farms'], answer: 0, why: 'Coal fuelled steam engines.' },
        { type: 'multiple_choice', question: 'What happened to towns?', options: ['They grew quickly', 'They vanished', 'They stayed the same'], answer: 0, why: 'Workers moved to towns for factory jobs.' }
      ]
    }, {
      id: 'lower-secondary-history-m2-l3',
      order: 3,
      title: 'Protest and Reform',
      objective: 'I can describe how people campaigned for political change.',
      minutes: 8,
      recap: 'You described how campaigners won political reform.',
      blocks: [
        { type: 'text', body: 'In the 1800s, few people could vote.' },
        { type: 'text', body: 'Reformers demanded fairer laws, better pay, and wider voting rights.' },
        { type: 'text', body: 'Peaceful meetings, petitions, and strikes pressured Parliament.' },
        { type: 'tip', body: 'The 1832 Reform Act gave more men the vote.' },
        {
          type: 'illustration',
          alt: 'A blue ballot box with a folded paper.',
          image: 'assets/3d/ballot_box_with_ballot-3d.png',
          placeholder: 'Ballot box: votes and the struggle for reform.'
        },
        { type: 'example', steps: ['A crowd signed a petition.', 'Reformers presented it to Parliament.', 'MPs debated the demand.', 'A new law widened the vote.'] }
      ],
      vocabulary: [
        { word: 'reform', meaning: 'Change made to improve a system.', example: 'Reform widened the vote.' },
        { word: 'petition', meaning: 'A signed request to those in power.', example: 'Thousands signed the petition.' },
        { word: 'strike', meaning: 'Workers refusing to work as a protest.', example: 'The strike lasted three weeks.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What did reformers want?', options: ['Wider voting rights', 'Fewer schools', 'New colonies'], answer: 0, why: 'They wanted fairer political power.' },
        { type: 'multiple_choice', question: 'What is a petition?', options: ['A signed request', 'A factory machine', 'A type of ship'], answer: 0, why: 'Petitions show public support for change.' },
        { type: 'multiple_choice', question: 'What did the 1832 Reform Act do?', options: ['Gave more men the vote', 'Ended all trade', 'Built new castles'], answer: 0, why: 'It expanded who could vote.' }
      ]
    }]
  }];
}());

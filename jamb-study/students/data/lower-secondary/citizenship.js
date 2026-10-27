/* Lower Secondary Citizenship — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'citizenship');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Rights and Responsibilities',
    description: 'Human rights, duties, and the rule of law in everyday life. Draft content.',
    lessons: [{
      id: 'lower-secondary-citizenship-m1-l1',
      order: 1,
      title: 'Human Rights',
      objective: 'I can explain what human rights are and why they matter.',
      minutes: 8,
      recap: 'You explained what human rights are and why they matter.',
      blocks: [
        { type: 'text', body: 'Human rights are basic freedoms that belong to every person from birth, whatever their nationality, belief, or background.' },
        { type: 'text', body: 'The Universal Declaration of Human Rights, agreed in 1948, lists rights such as safety, education, and free speech.' },
        { type: 'text', body: 'Rights protect people from unfair treatment and from abuse of power by governments or other people.' },
        { type: 'tip', body: 'Rights come with duties: respecting the same rights in others.' },
        {
          type: 'illustration',
          alt: 'A golden balance scale with two pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Balance scale: fairness and equal rights.'
        },
        { type: 'example', steps: ['A student is bullied at school.', 'The school protects the right to safety.', 'The bully is held to account.', 'Both students keep their rights.'] }
      ],
      vocabulary: [
        { word: 'rights', meaning: 'Basic freedoms every person has.', example: 'Education is a right.' },
        { word: 'duty', meaning: 'A responsibility to others.', example: 'Respecting others is a duty.' },
        { word: 'equality', meaning: 'Being treated the same way.', example: 'Rights apply to everyone.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are human rights?', options: ['Basic freedoms for everyone', 'Rules for one country', 'Gifts from a school'], answer: 0, why: 'They belong to every person.' },
        { type: 'multiple_choice', question: 'When do human rights begin?', options: ['At birth', 'At age eighteen', 'At secondary school'], answer: 0, why: 'They belong to every person from birth.' },
        { type: 'multiple_choice', question: 'What comes with every right?', options: ['A duty', 'A fee', 'A test'], answer: 0, why: 'Rights bring duties to respect others.' }
      ]
    }, {
      id: 'lower-secondary-citizenship-m1-l2',
      order: 2,
      title: 'Rights and Duties',
      objective: 'I can describe duties that come with rights in a community.',
      minutes: 8,
      recap: 'You described duties that come with rights in a community.',
      blocks: [
        { type: 'text', body: 'Every right is paired with a duty. The right to speak freely comes with a duty to listen and to avoid harming others.' },
        { type: 'text', body: 'Duties include obeying the law, paying taxes, caring for the environment, and respecting other people.' },
        { type: 'text', body: 'In a community, rights and duties balance: each person’s freedom is protected without taking freedom from anyone else.' },
        { type: 'tip', body: 'Think of a duty for every right you value.' },
        {
          type: 'illustration',
          alt: 'A rolled paper scroll tied with a red ribbon.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: rights and duties written down.'
        },
        { type: 'example', steps: ['You have the right to an education.', 'Your duty is to attend and try.', 'The school provides teaching.', 'Everyone benefits from the balance.'] }
      ],
      vocabulary: [
        { word: 'duty', meaning: 'Something you must do.', example: 'Attending school is a duty.' },
        { word: 'responsibility', meaning: 'Being answerable for your actions.', example: 'Take responsibility for your litter.' },
        { word: 'law', meaning: 'A rule enforced by the state.', example: 'The law protects people.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a duty?', options: ['Obeying the law', 'Owning a phone', 'Winning a game'], answer: 0, why: 'Obeying the law is a duty.' },
        { type: 'multiple_choice', question: 'What balances a right?', options: ['A duty', 'A reward', 'A holiday'], answer: 0, why: 'Every right brings a duty.' },
        { type: 'multiple_choice', question: 'Why do citizens pay taxes?', options: ['To fund public services', 'To buy private cars', 'To avoid school'], answer: 0, why: 'Taxes pay for shared services.' }
      ]
    }, {
      id: 'lower-secondary-citizenship-m1-l3',
      order: 3,
      title: 'The Rule of Law',
      objective: 'I can explain why laws apply equally to everyone, including leaders.',
      minutes: 9,
      recap: 'You explained why laws apply equally to everyone.',
      blocks: [
        { type: 'text', body: 'The rule of law means everyone, including leaders, must follow the same laws.' },
        { type: 'text', body: 'No one is above the law. Decisions are made by fair process, not by force or favour.' },
        { type: 'text', body: 'Courts decide guilt using evidence. An independent judge helps keep trials fair.' },
        { type: 'tip', body: 'Laws are published so people know the rules in advance.' },
        {
          type: 'illustration',
          alt: 'A white classical building with stone columns.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Courthouse: equal laws and fair trials.'
        },
        { type: 'example', steps: ['A shopkeeper and a mayor argue.', 'Both go to court.', 'The judge follows the same law.', 'The decision rests on evidence.'] }
      ],
      vocabulary: [
        { word: 'rule of law', meaning: 'Everyone must follow the law.', example: 'Leaders obey the law too.' },
        { word: 'court', meaning: 'A place where cases are judged.', example: 'The court heard the case.' },
        { word: 'evidence', meaning: 'Facts used to prove something.', example: 'The photo was evidence.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does the rule of law mean?', options: ['Everyone follows the law', 'Only citizens follow it', 'Leaders are exempt'], answer: 0, why: 'It applies to everyone equally.' },
        { type: 'multiple_choice', question: 'Who decides a case in court?', options: ['A judge using evidence', 'The loudest person', 'A shopkeeper'], answer: 0, why: 'Evidence guides the judge.' },
        { type: 'multiple_choice', question: 'Why are laws published?', options: ['So people know the rules', 'To hide them', 'To shorten trials'], answer: 0, why: 'Published laws let people follow them.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Democracy and Community',
    description: 'Local democracy, volunteering, and paying for public services. Draft content.',
    lessons: [{
      id: 'lower-secondary-citizenship-m2-l1',
      order: 1,
      title: 'Local Democracy',
      objective: 'I can explain how local councils make choices for a community.',
      minutes: 8,
      recap: 'You explained how local councils make choices for a community.',
      blocks: [
        { type: 'text', body: 'Local councils run services such as rubbish collection, parks, libraries, and local roads.' },
        { type: 'text', body: 'Residents elect councillors. Councillors debate and vote on local decisions.' },
        { type: 'text', body: 'Local democracy lets people shape the place where they live.' },
        { type: 'tip', body: 'Contacting a councillor is one way to raise a local issue.' },
        {
          type: 'illustration',
          alt: 'A ballot box with a paper vote going in.',
          image: 'assets/3d/ballot_box_with_ballot-3d.png',
          placeholder: 'Ballot box: residents choosing councillors.'
        },
        { type: 'example', steps: ['A park needs repairs.', 'Residents tell their councillor.', 'The council votes on funding.', 'The park is repaired.'] }
      ],
      vocabulary: [
        { word: 'council', meaning: 'A local elected government.', example: 'The council runs the library.' },
        { word: 'councillor', meaning: 'An elected local representative.', example: 'Ask your councillor for help.' },
        { word: 'service', meaning: 'Work provided for the public.', example: 'Refuse collection is a service.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who runs local services?', options: ['The local council', 'A football club', 'A single shop'], answer: 0, why: 'Councils provide local services.' },
        { type: 'multiple_choice', question: 'How are councillors chosen?', options: ['By election', 'By lottery', 'By age'], answer: 0, why: 'Residents elect councillors.' },
        { type: 'multiple_choice', question: 'How can residents raise a local issue?', options: ['Tell their councillor', 'Ignore it', 'Move away'], answer: 0, why: 'Councillors act on local concerns.' }
      ]
    }, {
      id: 'lower-secondary-citizenship-m2-l2',
      order: 2,
      title: 'Volunteering',
      objective: 'I can describe how volunteering helps a community.',
      minutes: 8,
      recap: 'You described how volunteering helps a community.',
      blocks: [
        { type: 'text', body: 'Volunteers give their time without payment to help other people.' },
        { type: 'text', body: 'They support food banks, sports clubs, libraries, and neighbourhood clean-up projects.' },
        { type: 'text', body: 'Volunteering builds skills, confidence, and trust between neighbours.' },
        { type: 'tip', body: 'Even one hour a week can make a difference.' },
        {
          type: 'illustration',
          alt: 'A glossy red heart symbol.',
          image: 'assets/3d/red_heart-3d.png',
          placeholder: 'Red heart: giving time to help others.'
        },
        { type: 'example', steps: ['A food bank needs helpers.', 'Volunteers sort donations.', 'Families receive food.', 'The community grows stronger.'] }
      ],
      vocabulary: [
        { word: 'volunteer', meaning: 'Someone who helps without pay.', example: 'She volunteers at the club.' },
        { word: 'charity', meaning: 'An organisation that helps others.', example: 'The charity runs a food bank.' },
        { word: 'community', meaning: 'People living and working together.', example: 'Our community cleaned the park.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a volunteer?', options: ['Someone who helps unpaid', 'A paid official', 'A shop owner'], answer: 0, why: 'Volunteers give time without pay.' },
        { type: 'multiple_choice', question: 'Where might volunteers help?', options: ['A food bank', 'A private vault', 'A closed shop'], answer: 0, why: 'Food banks rely on volunteers.' },
        { type: 'multiple_choice', question: 'What can volunteering build?', options: ['Skills and trust', 'Fines and fees', 'Traffic and noise'], answer: 0, why: 'It builds skills and trust.' }
      ]
    }, {
      id: 'lower-secondary-citizenship-m2-l3',
      order: 3,
      title: 'Money and Public Services',
      objective: 'I can explain how taxes pay for public services.',
      minutes: 8,
      recap: 'You explained how taxes pay for public services.',
      blocks: [
        { type: 'text', body: 'Taxes are payments collected by government from workers, businesses, and shoppers.' },
        { type: 'text', body: 'The money pays for schools, hospitals, roads, and emergency services.' },
        { type: 'text', body: 'Public services are shared: everyone contributes and everyone can use them.' },
        { type: 'tip', body: 'A service used by all needs steady, fair funding.' },
        {
          type: 'illustration',
          alt: 'A single gold coin standing upright.',
          image: 'assets/3d/coin-3d.png',
          placeholder: 'Coin: taxes paying for shared services.'
        },
        { type: 'example', steps: ['A worker pays income tax.', 'The council receives funds.', 'A library stays open.', 'Residents use it free of charge.'] }
      ],
      vocabulary: [
        { word: 'tax', meaning: 'Money paid to government.', example: 'Income tax funds services.' },
        { word: 'public service', meaning: 'A service for everyone.', example: 'Hospitals are public services.' },
        { word: 'budget', meaning: 'A plan for spending money.', example: 'The council set its budget.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What are taxes used for?', options: ['Public services', 'Private holidays', 'Shop profits'], answer: 0, why: 'Taxes fund schools and hospitals.' },
        { type: 'multiple_choice', question: 'Who pays for public services?', options: ['Everyone through taxes', 'Only children', 'Only visitors'], answer: 0, why: 'Shared services are funded by taxes.' },
        { type: 'multiple_choice', question: 'Which is a public service?', options: ['A hospital', 'A private yacht', 'A family dinner'], answer: 0, why: 'Hospitals serve the public.' }
      ]
    }]
  }];
}());

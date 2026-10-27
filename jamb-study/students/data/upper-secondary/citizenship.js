/* GCSE Citizenship — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'citizenship');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Politics and Participation',
    description: 'Elections, Parliament, and the rights protected by law. Draft content.',
    lessons: [{
      id: 'upper-secondary-citizenship-m1-l1',
      order: 1,
      title: 'Democracy and Elections',
      objective: 'I can explain how elections hold governments to account.',
      minutes: 10,
      recap: 'You explained how elections hold governments to account.',
      blocks: [
        { type: 'text', body: 'In a democracy, citizens choose their representatives through regular, free, and fair elections.' },
        { type: 'text', body: 'Candidates campaign and explain their policies. Voters weigh these promises before casting a ballot.' },
        { type: 'text', body: 'After the election, the winning party forms the government, while other parties scrutinise its decisions.' },
        { type: 'tip', body: 'A secret ballot protects each voter’s choice from pressure.' },
        {
          type: 'illustration',
          alt: 'A ballot box with a paper vote going in.',
          image: 'assets/3d/ballot_box_with_ballot-3d.png',
          placeholder: 'Ballot box: free and fair elections.'
        },
        { type: 'example', steps: ['A general election is called.', 'Candidates publish their policies.', 'Voters cast secret ballots.', 'The winning party forms a government.'] }
      ],
      vocabulary: [
        { word: 'democracy', meaning: 'Rule by elected representatives.', example: 'Democracy needs free elections.' },
        { word: 'ballot', meaning: 'A secret vote.', example: 'She cast her ballot.' },
        { word: 'manifesto', meaning: 'A party’s promises to voters.', example: 'The manifesto promised new schools.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What makes an election democratic?', options: ['It is free and fair', 'Only one candidate runs', 'Votes are public'], answer: 0, why: 'Free and fair elections are essential.' },
        { type: 'multiple_choice', question: 'What is a manifesto?', options: ['A party’s promises', 'A voting machine', 'A court ruling'], answer: 0, why: 'It sets out policies for voters.' },
        { type: 'multiple_choice', question: 'Why keep ballots secret?', options: ['To protect voters from pressure', 'To slow counting', 'To hide results'], answer: 0, why: 'Secrecy prevents intimidation.' }
      ]
    }, {
      id: 'upper-secondary-citizenship-m1-l2',
      order: 2,
      title: 'Parliament and Government',
      objective: 'I can distinguish Parliament from the government and describe their roles.',
      minutes: 10,
      recap: 'You distinguished Parliament from the government and described their roles.',
      blocks: [
        { type: 'text', body: 'Parliament makes and checks laws. It includes elected Members of Parliament and the House of Lords.' },
        { type: 'text', body: 'The government runs the country day to day. Its ministers come from the largest party or a coalition.' },
        { type: 'text', body: 'Parliament holds the government to account through debates, committees, and questions.' },
        { type: 'tip', body: 'The opposition challenges the government and offers alternatives.' },
        {
          type: 'illustration',
          alt: 'A white classical building with stone columns.',
          image: 'assets/3d/classical_building-3d.png',
          placeholder: 'Parliament: making laws and checking government.'
        },
        { type: 'example', steps: ['The government proposes a new law.', 'Parliament debates the bill.', 'Committees examine the details.', 'Parliament votes to approve or reject.'] }
      ],
      vocabulary: [
        { word: 'parliament', meaning: 'The body that makes laws.', example: 'Parliament passed the bill.' },
        { word: 'minister', meaning: 'A senior government member.', example: 'The minister answered questions.' },
        { word: 'bill', meaning: 'A proposed law.', example: 'The bill was debated.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does Parliament do?', options: ['Makes and checks laws', 'Runs every school', 'Chooses judges'], answer: 0, why: 'Parliament is the law-making body.' },
        { type: 'multiple_choice', question: 'Who runs the country day to day?', options: ['The government', 'The opposition', 'The courts'], answer: 0, why: 'Ministers run the government.' },
        { type: 'multiple_choice', question: 'What is a bill?', options: ['A proposed law', 'A finished law', 'A tax form'], answer: 0, why: 'A bill becomes law after approval.' }
      ]
    }, {
      id: 'upper-secondary-citizenship-m1-l3',
      order: 3,
      title: 'Rights and the Law',
      objective: 'I can explain how rights are protected by courts and law.',
      minutes: 10,
      recap: 'You explained how rights are protected by courts and law.',
      blocks: [
        { type: 'text', body: 'Rights are protected by laws and enforced by independent courts.' },
        { type: 'text', body: 'A person accused of a crime is presumed innocent until proven guilty.' },
        { type: 'text', body: 'Everyone has the right to a fair trial, legal advice, and an impartial judge.' },
        { type: 'tip', body: 'Rights can be limited only by clear, fair, and proportionate laws.' },
        {
          type: 'illustration',
          alt: 'A golden balance scale with two pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Scales: fairness, evidence, and rights.'
        },
        { type: 'example', steps: ['A person is arrested.', 'They receive legal advice.', 'Evidence is tested in court.', 'The judge reaches a verdict.'] }
      ],
      vocabulary: [
        { word: 'presumption', meaning: 'Assumed true until proven otherwise.', example: 'Innocence is presumed.' },
        { word: 'verdict', meaning: 'A court’s decision.', example: 'The jury reached a verdict.' },
        { word: 'proportionate', meaning: 'No more than necessary.', example: 'The limit was proportionate.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does innocent until proven guilty mean?', options: ['Guilt must be proven', 'Guilt is assumed', 'Trials are optional'], answer: 0, why: 'The prosecution must prove guilt.' },
        { type: 'multiple_choice', question: 'Who should judge a case fairly?', options: ['An impartial judge', 'A friend of the accused', 'A newspaper'], answer: 0, why: 'Impartial judges protect fairness.' },
        { type: 'multiple_choice', question: 'How should limits on rights be set?', options: ['Clearly and proportionately', 'Secretly and widely', 'By rumour'], answer: 0, why: 'Limits must be lawful and proportionate.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Society and Change',
    description: 'Media, protest, and global citizenship in a connected world. Draft content.',
    lessons: [{
      id: 'upper-secondary-citizenship-m2-l1',
      order: 1,
      title: 'Media and Democracy',
      objective: 'I can explain how a free press supports democracy.',
      minutes: 10,
      recap: 'You explained how a free press supports democracy.',
      blocks: [
        { type: 'text', body: 'A free press investigates issues, reports facts, and gives citizens information to judge governments.' },
        { type: 'text', body: 'Media can also spread misinformation, so readers should check sources and evidence.' },
        { type: 'text', body: 'Public service broadcasting aims to inform without commercial or political pressure.' },
        { type: 'tip', body: 'Compare several reliable sources before believing a claim.' },
        {
          type: 'illustration',
          alt: 'A round speech balloon with a tail.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: a free press informs debate.'
        },
        { type: 'example', steps: ['A council makes a decision.', 'A journalist investigates it.', 'Readers check the evidence.', 'Voters hold the council to account.'] }
      ],
      vocabulary: [
        { word: 'free press', meaning: 'Media free from state control.', example: 'A free press reports freely.' },
        { word: 'misinformation', meaning: 'False information spread by mistake.', example: 'Check before sharing misinformation.' },
        { word: 'source', meaning: 'Where information comes from.', example: 'Use a reliable source.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why is a free press important?', options: ['It informs voters', 'It hides evidence', 'It runs elections'], answer: 0, why: 'Information helps voters decide.' },
        { type: 'multiple_choice', question: 'What should you do with a shocking claim?', options: ['Check reliable sources', 'Share it quickly', 'Ignore all news'], answer: 0, why: 'Verify before trusting a claim.' },
        { type: 'multiple_choice', question: 'What is misinformation?', options: ['False information', 'A court verdict', 'A party policy'], answer: 0, why: 'It is false or misleading information.' }
      ]
    }, {
      id: 'upper-secondary-citizenship-m2-l2',
      order: 2,
      title: 'Protest and Change',
      objective: 'I can describe lawful ways citizens campaign for change.',
      minutes: 9,
      recap: 'You described lawful ways citizens campaign for change.',
      blocks: [
        { type: 'text', body: 'Citizens can campaign for change through petitions, letters, marches, and peaceful protest.' },
        { type: 'text', body: 'The right to protest is protected, but it must remain lawful and peaceful.' },
        { type: 'text', body: 'Campaigns often succeed by building public support and persuading decision-makers.' },
        { type: 'tip', body: 'Change can take years; steady, evidence-based argument matters.' },
        {
          type: 'illustration',
          alt: 'A silver microphone on a stand.',
          image: 'assets/3d/microphone-3d.png',
          placeholder: 'Microphone: speaking up for change.'
        },
        { type: 'example', steps: ['A community wants a safer road.', 'Residents start a petition.', 'They meet the council.', 'A crossing is installed.'] }
      ],
      vocabulary: [
        { word: 'petition', meaning: 'A signed request for change.', example: 'They signed the petition.' },
        { word: 'protest', meaning: 'A public show of disagreement.', example: 'The protest was peaceful.' },
        { word: 'campaign', meaning: 'Organised action for a goal.', example: 'The campaign lasted a year.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which is a lawful way to campaign?', options: ['A peaceful march', 'Damage to property', 'Threats to officials'], answer: 0, why: 'Peaceful protest is protected.' },
        { type: 'multiple_choice', question: 'What is a petition?', options: ['A signed request', 'A court order', 'A tax form'], answer: 0, why: 'Petitions gather support for change.' },
        { type: 'multiple_choice', question: 'What usually persuades decision-makers?', options: ['Evidence and public support', 'Silence', 'Rumours'], answer: 0, why: 'Evidence and support drive change.' }
      ]
    }, {
      id: 'upper-secondary-citizenship-m2-l3',
      order: 3,
      title: 'Global Citizenship',
      objective: 'I can explain what it means to be a global citizen.',
      minutes: 9,
      recap: 'You explained what it means to be a global citizen.',
      blocks: [
        { type: 'text', body: 'Global citizens recognise that local choices affect people and environments worldwide.' },
        { type: 'text', body: 'Issues such as climate change, trade, and migration cross national borders.' },
        { type: 'text', body: 'People act globally by supporting fair trade, reducing waste, and learning about other cultures.' },
        { type: 'tip', body: 'Global problems need cooperation between countries and communities.' },
        {
          type: 'illustration',
          alt: 'A globe showing the Americas.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: shared problems and shared responsibility.'
        },
        { type: 'example', steps: ['A shopper chooses fair trade goods.', 'Farmers receive a fair price.', 'Waste and poverty reduce.', 'Local choices have global effects.'] }
      ],
      vocabulary: [
        { word: 'global citizen', meaning: 'Someone aware of worldwide links.', example: 'Global citizens think beyond borders.' },
        { word: 'fair trade', meaning: 'Trade with fair prices and conditions.', example: 'Fair trade supports farmers.' },
        { word: 'cooperation', meaning: 'Working together for a goal.', example: 'Countries need cooperation.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a global citizen?', options: ['Someone aware of worldwide links', 'Someone who never travels', 'A government minister'], answer: 0, why: 'They see local and global connections.' },
        { type: 'multiple_choice', question: 'Which issue crosses borders?', options: ['Climate change', 'A private garden', 'A single classroom'], answer: 0, why: 'Climate change affects every country.' },
        { type: 'multiple_choice', question: 'How can shoppers act globally?', options: ['Choose fair trade goods', 'Ignore labels', 'Waste more'], answer: 0, why: 'Fair trade links local choices to fairness.' }
      ]
    }]
  }];
}());

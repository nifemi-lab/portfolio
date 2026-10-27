/* GCSE History — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'history');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Modern Britain and Conflict',
    description: 'World wars and the Cold War: causes, experience, and consequences. Draft content.',
    lessons: [{
      id: 'upper-secondary-history-m1-l1',
      order: 1,
      title: 'The First World War',
      objective: 'I can explain the causes and consequences of the First World War.',
      minutes: 10,
      recap: 'You explained the causes and consequences of the First World War.',
      blocks: [
        { type: 'text', body: 'The First World War began in 1914 after the assassination of Archduke Franz Ferdinand.' },
        { type: 'text', body: 'Alliances, imperial rivalry, nationalism, and an arms race turned a local crisis into a European war.' },
        { type: 'text', body: 'Trench warfare on the Western Front caused enormous casualties.' },
        { type: 'tip', body: 'The Treaty of Versailles in 1919 imposed harsh terms on Germany.' },
        {
          type: 'illustration',
          alt: 'Two silver swords crossed over a blue shield.',
          image: 'assets/3d/crossed_swords-3d.png',
          placeholder: 'Crossed swords: alliance, conflict, and trench war.'
        },
        { type: 'example', steps: ['An archduke was assassinated in Sarajevo.', 'Alliances pulled countries into war.', 'Trench lines stretched across France.', 'The armistice came in November 1918.'] }
      ],
      vocabulary: [
        { word: 'armistice', meaning: 'An agreement to stop fighting.', example: 'The armistice ended the fighting.' },
        { word: 'trench', meaning: 'A long defensive ditch.', example: 'Soldiers lived in muddy trenches.' },
        { word: 'alliance', meaning: 'An agreement to support another country.', example: 'The alliance drew nations into war.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What triggered the war in 1914?', options: ['An assassination', 'A treaty', 'An election'], answer: 0, why: 'Franz Ferdinand was assassinated in Sarajevo.' },
        { type: 'multiple_choice', question: 'What was trench warfare like?', options: ['Muddy and deadly', 'Safe and easy', 'Quick and clean'], answer: 0, why: 'Trenches offered little protection from shelling.' },
        { type: 'multiple_choice', question: 'What did the Treaty of Versailles do?', options: ['Punished Germany', 'Rewarded Austria', 'Ended all empires'], answer: 0, why: 'It imposed reparations and land losses.' }
      ]
    }, {
      id: 'upper-secondary-history-m1-l2',
      order: 2,
      title: 'The Second World War',
      objective: 'I can explain the causes and impact of the Second World War.',
      minutes: 10,
      recap: 'You explained the causes and impact of the Second World War.',
      blocks: [
        { type: 'text', body: 'The Second World War began in 1939 when Germany invaded Poland.' },
        { type: 'text', body: 'Aggressive expansion, failed appeasement, and unresolved grievances from 1919 contributed to the conflict.' },
        { type: 'text', body: 'The war was global, involving total mobilisation and civilian bombing.' },
        { type: 'tip', body: 'The Holocaust was the Nazi genocide of six million Jewish people.' },
        {
          type: 'illustration',
          alt: 'A white aeroplane flying against a blue sky.',
          image: 'assets/3d/airplane-3d.png',
          placeholder: 'Aeroplane: global conflict and civilian experience.'
        },
        { type: 'example', steps: ['Germany invaded Poland in 1939.', 'Britain and France declared war.', 'The conflict spread worldwide.', 'The war ended in 1945.'] }
      ],
      vocabulary: [
        { word: 'appeasement', meaning: 'Giving in to demands to avoid war.', example: 'Appeasement failed before 1939.' },
        { word: 'genocide', meaning: 'Deliberate destruction of a group.', example: 'The Nazis committed genocide.' },
        { word: 'mobilise', meaning: 'Prepare a country for war.', example: 'Governments mobilised civilians.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What began the war in Europe in 1939?', options: ['Invasion of Poland', 'Sinking of a ship', 'A royal wedding'], answer: 0, why: 'Germany invaded Poland on 1 September.' },
        { type: 'multiple_choice', question: 'What was appeasement?', options: ['Giving in to demands', 'Declaring war', 'Building walls'], answer: 0, why: 'Britain and France hoped to avoid conflict.' },
        { type: 'multiple_choice', question: 'What was the Holocaust?', options: ['Nazi genocide', 'A naval battle', 'A peace treaty'], answer: 0, why: 'The Nazis murdered six million Jewish people.' }
      ]
    }, {
      id: 'upper-secondary-history-m1-l3',
      order: 3,
      title: 'The Cold War',
      objective: 'I can describe the causes and key features of the Cold War.',
      minutes: 10,
      recap: 'You described the causes and key features of the Cold War.',
      blocks: [
        { type: 'text', body: 'The Cold War was a rivalry between the United States and the Soviet Union.' },
        { type: 'text', body: 'It lasted from about 1947 to 1991 and was fought through ideology, spies, and allies.' },
        { type: 'text', body: 'Nuclear weapons made direct war extremely dangerous.' },
        { type: 'tip', body: 'Crises such as the Cuban Missile Crisis brought the world close to war.' },
        {
          type: 'illustration',
          alt: 'A ringed planet floating in dark space.',
          image: 'assets/3d/ringed_planet-3d.png',
          placeholder: 'Ringed planet: space race and nuclear standoff.'
        },
        { type: 'example', steps: ['The two superpowers had different ideologies.', 'Each built nuclear arsenals.', 'They backed rival sides in conflicts.', 'The Soviet Union collapsed in 1991.'] }
      ],
      vocabulary: [
        { word: 'ideology', meaning: 'A system of political ideas.', example: 'The rivals had different ideologies.' },
        { word: 'arsenal', meaning: 'A store of weapons.', example: 'Both sides expanded their arsenals.' },
        { word: 'superpower', meaning: 'A nation with global influence.', example: 'The USA was a superpower.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who were the main Cold War rivals?', options: ['USA and USSR', 'Britain and France', 'China and Japan'], answer: 0, why: 'The USA and Soviet Union led rival blocs.' },
        { type: 'multiple_choice', question: 'Why was direct war avoided?', options: ['Nuclear weapons', 'No armies', 'No allies'], answer: 0, why: 'Nuclear war risked mutual destruction.' },
        { type: 'multiple_choice', question: 'What happened in 1991?', options: ['The USSR collapsed', 'The USA collapsed', 'NATO ended'], answer: 0, why: 'The Soviet Union broke apart in 1991.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Change and Power',
    description: 'Protest, decolonisation, and migration: who gained power in modern Britain. Draft content.',
    lessons: [{
      id: 'upper-secondary-history-m2-l1',
      order: 1,
      title: 'The Suffrage Movement',
      objective: 'I can explain how women won the right to vote in Britain.',
      minutes: 10,
      recap: 'You explained how women won the right to vote in Britain.',
      blocks: [
        { type: 'text', body: 'Before 1918, most women in Britain could not vote in general elections.' },
        { type: 'text', body: 'Campaigners used petitions, speeches, and marches to demand suffrage.' },
        { type: 'text', body: 'Some suffragettes used direct action and faced imprisonment.' },
        { type: 'tip', body: 'The 1918 law gave some women the vote. Equal voting age came in 1928.' },
        {
          type: 'illustration',
          alt: 'A blue ballot box with a folded paper.',
          image: 'assets/3d/ballot_box_with_ballot-3d.png',
          placeholder: 'Ballot box: the campaign for women\u2019s votes.'
        },
        { type: 'example', steps: ['Women organised a mass march.', 'Newspapers reported the campaign.', 'Parliament passed the 1918 law.', 'Women over 30 could vote.'] }
      ],
      vocabulary: [
        { word: 'suffrage', meaning: 'The right to vote.', example: 'Suffrage was won after decades.' },
        { word: 'suffragette', meaning: 'A woman campaigning for the vote.', example: 'The suffragette was arrested.' },
        { word: 'enfranchise', meaning: 'Give someone the right to vote.', example: 'The law enfranchised women.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What did campaigners demand?', options: ['The right to vote', 'Lower taxes', 'New colonies'], answer: 0, why: 'They demanded women\u2019s suffrage.' },
        { type: 'multiple_choice', question: 'What did the 1918 law do?', options: ['Gave some women the vote', 'Banned voting', 'Lowered the age to 16'], answer: 0, why: 'It gave the vote to women over 30.' },
        { type: 'multiple_choice', question: 'When did women get the vote at 21?', options: ['1928', '1918', '1945'], answer: 0, why: 'Equal voting age was reached in 1928.' }
      ]
    }, {
      id: 'upper-secondary-history-m2-l2',
      order: 2,
      title: 'Decolonisation',
      objective: 'I can explain why the British Empire declined after 1945.',
      minutes: 10,
      recap: 'You explained why the British Empire declined after 1945.',
      blocks: [
        { type: 'text', body: 'After 1945, independence movements challenged colonial rule across Asia and Africa.' },
        { type: 'text', body: 'Nationalist leaders argued for self-government and control of resources.' },
        { type: 'text', body: 'Britain often struggled to hold empires that no longer accepted British rule.' },
        { type: 'tip', body: 'India and Pakistan gained independence in 1947.' },
        {
          type: 'illustration',
          alt: 'A globe showing the Americas in blue and green.',
          image: 'assets/3d/globe_showing_americas-3d.png',
          placeholder: 'Globe: independence movements across the empire.'
        },
        { type: 'example', steps: ['Colonial soldiers returned after the war.', 'Nationalist parties gained support.', 'Britain negotiated independence.', 'New nations joined the Commonwealth.'] }
      ],
      vocabulary: [
        { word: 'decolonisation', meaning: 'The end of colonial rule.', example: 'Decolonisation reshaped the world.' },
        { word: 'nationalist', meaning: 'Someone who wants independence.', example: 'Nationalist leaders demanded freedom.' },
        { word: 'self-government', meaning: 'Rule by a country\u2019s own people.', example: 'They demanded self-government.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What challenged colonial rule after 1945?', options: ['Independence movements', 'Colonial taxes', 'Royal tours'], answer: 0, why: 'Nationalist movements demanded freedom.' },
        { type: 'multiple_choice', question: 'When did India gain independence?', options: ['1947', '1918', '1991'], answer: 0, why: 'India and Pakistan became independent in 1947.' },
        { type: 'multiple_choice', question: 'What did nationalist leaders want?', options: ['Self-government', 'More colonies', 'British rule'], answer: 0, why: 'They wanted local control of their countries.' }
      ]
    }, {
      id: 'upper-secondary-history-m2-l3',
      order: 3,
      title: 'Migration to Britain',
      objective: 'I can describe post-war migration and its impact on Britain.',
      minutes: 10,
      recap: 'You described post-war migration and its impact on Britain.',
      blocks: [
        { type: 'text', body: 'After 1945, Britain recruited workers from the Caribbean, South Asia, and beyond.' },
        { type: 'text', body: 'Many migrants filled jobs in transport, factories, and public services.' },
        { type: 'text', body: 'They faced prejudice but also built communities and changed British culture.' },
        { type: 'tip', body: 'The Empire Windrush arrived from the Caribbean in 1948.' },
        {
          type: 'illustration',
          alt: 'A large sailing ship crossing blue water.',
          image: 'assets/3d/ship-3d.png',
          placeholder: 'Ship: migration routes and new communities.'
        },
        { type: 'example', steps: ['Britain needed workers after the war.', 'Migrants arrived from the Caribbean.', 'They took jobs in hospitals and buses.', 'Communities grew across Britain.'] }
      ],
      vocabulary: [
        { word: 'migrant', meaning: 'A person who moves to another country.', example: 'The migrant found work in London.' },
        { word: 'prejudice', meaning: 'Unfair dislike of a group.', example: 'Migrants faced prejudice.' },
        { word: 'commonwealth', meaning: 'A group of countries linked to Britain.', example: 'Many migrants came from the Commonwealth.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why did Britain recruit migrants after 1945?', options: ['Labour shortages', 'Too many homes', 'No transport'], answer: 0, why: 'The economy needed workers.' },
        { type: 'multiple_choice', question: 'Which ship arrived in 1948?', options: ['Empire Windrush', 'Mayflower', 'Titanic'], answer: 0, why: 'The Windrush brought Caribbean migrants.' },
        { type: 'multiple_choice', question: 'What did migrants help build?', options: ['Communities and services', 'Empty factories', 'New colonies'], answer: 0, why: 'They worked in key public services.' }
      ]
    }]
  }];
}());

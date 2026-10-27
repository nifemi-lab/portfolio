/* Lower Secondary Religious Education — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'religious-education');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Beliefs and Practices',
    description: 'What religion is, and two major world faiths. Draft content.',
    lessons: [{
      id: 'lower-secondary-religious-education-m1-l1',
      order: 1,
      title: 'What Is Religion?',
      objective: 'I can describe what religion is and why people follow one.',
      minutes: 8,
      recap: 'You described what religion is and why people follow one.',
      blocks: [
        { type: 'text', body: 'A religion is a set of beliefs about life, purpose, and the sacred, shared by a community.' },
        { type: 'text', body: 'Religions often include stories, rituals, moral rules, and places of worship.' },
        { type: 'text', body: 'People follow a religion for meaning, belonging, comfort, and guidance.' },
        { type: 'tip', body: 'Religions differ, but many share values such as kindness and justice.' },
        {
          type: 'illustration',
          alt: 'A string of round prayer beads.',
          image: 'assets/3d/prayer-beads-3d.png',
          placeholder: 'Prayer beads: ritual and reflection.'
        },
        { type: 'example', steps: ['A family attends a place of worship.', 'They pray and sing together.', 'They learn shared values.', 'The community supports one another.'] }
      ],
      vocabulary: [
        { word: 'religion', meaning: 'Shared beliefs about the sacred.', example: 'Religion can guide daily life.' },
        { word: 'ritual', meaning: 'A repeated symbolic action.', example: 'Prayer is a ritual.' },
        { word: 'worship', meaning: 'Showing devotion to the divine.', example: 'They gather to worship.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a religion?', options: ['Shared beliefs and practices', 'A single rule', 'A type of school'], answer: 0, why: 'Religion includes beliefs and practices.' },
        { type: 'multiple_choice', question: 'What might a religion include?', options: ['Rituals and stories', 'Only silence', 'No community'], answer: 0, why: 'Rituals, stories, and rules are common.' },
        { type: 'multiple_choice', question: 'Why do people follow a religion?', options: ['Meaning and belonging', 'Free money', 'Fame'], answer: 0, why: 'Religion can give meaning and community.' }
      ]
    }, {
      id: 'lower-secondary-religious-education-m1-l2',
      order: 2,
      title: 'Christianity',
      objective: 'I can describe key beliefs and practices in Christianity.',
      minutes: 9,
      recap: 'You described key beliefs and practices in Christianity.',
      blocks: [
        { type: 'text', body: 'Christians believe in one God and follow the teachings of Jesus Christ.' },
        { type: 'text', body: 'The Bible is their sacred text, and Sunday worship often takes place in a church.' },
        { type: 'text', body: 'Baptism and Holy Communion are important practices for many Christians.' },
        { type: 'tip', body: 'Easter and Christmas mark key events in the Christian story.' },
        {
          type: 'illustration',
          alt: 'A simple golden Latin cross.',
          image: 'assets/3d/latin-cross-3d.png',
          placeholder: 'Cross: a central Christian symbol.'
        },
        { type: 'example', steps: ['Christians gather on Sunday.', 'They read from the Bible.', 'They pray and share communion.', 'The community serves others.'] }
      ],
      vocabulary: [
        { word: 'Christianity', meaning: 'The faith following Jesus Christ.', example: 'Christianity has many churches.' },
        { word: 'Bible', meaning: 'The Christian sacred text.', example: 'They read the Bible.' },
        { word: 'communion', meaning: 'A shared Christian ritual.', example: 'Communion is taken in church.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who do Christians follow?', options: ['Jesus Christ', 'Muhammad', 'Abraham'], answer: 0, why: 'Christians follow the teachings of Jesus.' },
        { type: 'multiple_choice', question: 'What is the Christian sacred text?', options: ['The Bible', 'The Qur’an', 'The Torah'], answer: 0, why: 'The Bible is the Christian text.' },
        { type: 'multiple_choice', question: 'Which is a Christian practice?', options: ['Baptism', 'Friday prayer', 'Pilgrimage to Mecca'], answer: 0, why: 'Baptism is a Christian practice.' }
      ]
    }, {
      id: 'lower-secondary-religious-education-m1-l3',
      order: 3,
      title: 'Islam',
      objective: 'I can describe key beliefs and practices in Islam.',
      minutes: 9,
      recap: 'You described key beliefs and practices in Islam.',
      blocks: [
        { type: 'text', body: 'Muslims believe in one God, Allah, and follow the teachings of the Prophet Muhammad.' },
        { type: 'text', body: 'The Qur’an is their sacred text, written in Arabic and recited in worship.' },
        { type: 'text', body: 'Muslims pray five times daily and fast during the month of Ramadan.' },
        { type: 'tip', body: 'Friday prayers bring the community together in a mosque.' },
        {
          type: 'illustration',
          alt: 'A golden crescent moon and star.',
          image: 'assets/3d/crescent-moon-3d.png',
          placeholder: 'Crescent: a symbol linked to Islam.'
        },
        { type: 'example', steps: ['Muslims pray five times a day.', 'They face Mecca during prayer.', 'They fast during Ramadan.', 'They give to those in need.'] }
      ],
      vocabulary: [
        { word: 'Islam', meaning: 'The faith following Allah’s guidance.', example: 'Islam has five pillars.' },
        { word: 'Qur’an', meaning: 'The Muslim sacred text.', example: 'The Qur’an is recited.' },
        { word: 'Ramadan', meaning: 'A month of fasting.', example: 'Ramadan ends with Eid.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is the Muslim sacred text?', options: ['The Qur’an', 'The Bible', 'The Vedas'], answer: 0, why: 'The Qur’an is the Muslim text.' },
        { type: 'multiple_choice', question: 'How often do Muslims pray daily?', options: ['Five times', 'Once', 'Never'], answer: 0, why: 'Five daily prayers are a pillar of Islam.' },
        { type: 'multiple_choice', question: 'What happens during Ramadan?', options: ['Fasting during daylight', 'A harvest festival', 'A long holiday'], answer: 0, why: 'Ramadan is a month of fasting.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Ethics and Community',
    description: 'Judaism, Sikhism, and living well together. Draft content.',
    lessons: [{
      id: 'lower-secondary-religious-education-m2-l1',
      order: 1,
      title: 'Judaism',
      objective: 'I can describe key beliefs and practices in Judaism.',
      minutes: 9,
      recap: 'You described key beliefs and practices in Judaism.',
      blocks: [
        { type: 'text', body: 'Jews believe in one God and follow the Torah and its commandments.' },
        { type: 'text', body: 'The Sabbath, from Friday evening to Saturday evening, is a day of rest and family.' },
        { type: 'text', body: 'Synagogues are places of worship and community, and many Jews keep kosher food rules.' },
        { type: 'tip', body: 'Passover commemorates the Exodus from slavery in Egypt.' },
        {
          type: 'illustration',
          alt: 'A golden seven-branched menorah.',
          image: 'assets/3d/menorah-3d.png',
          placeholder: 'Menorah: a Jewish symbol of light.'
        },
        { type: 'example', steps: ['Families prepare for the Sabbath.', 'They light candles and share a meal.', 'They rest and pray.', 'The community gathers at the synagogue.'] }
      ],
      vocabulary: [
        { word: 'Judaism', meaning: 'The faith of the Jewish people.', example: 'Judaism teaches one God.' },
        { word: 'Torah', meaning: 'The Jewish sacred text.', example: 'The Torah is read aloud.' },
        { word: 'Sabbath', meaning: 'The weekly day of rest.', example: 'The Sabbath begins Friday evening.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is the Jewish sacred text?', options: ['The Torah', 'The Qur’an', 'The Bible'], answer: 0, why: 'The Torah guides Jewish life.' },
        { type: 'multiple_choice', question: 'When does the Sabbath begin?', options: ['Friday evening', 'Monday morning', 'Sunday noon'], answer: 0, why: 'It runs from Friday to Saturday evening.' },
        { type: 'multiple_choice', question: 'What is a synagogue?', options: ['A place of worship', 'A market', 'A school only'], answer: 0, why: 'Synagogues serve worship and community.' }
      ]
    }, {
      id: 'lower-secondary-religious-education-m2-l2',
      order: 2,
      title: 'Sikhism',
      objective: 'I can describe key beliefs and practices in Sikhism.',
      minutes: 9,
      recap: 'You described key beliefs and practices in Sikhism.',
      blocks: [
        { type: 'text', body: 'Sikhs believe in one God and follow the teachings of Guru Nanak and later Gurus.' },
        { type: 'text', body: 'The Guru Granth Sahib is their sacred scripture and is treated with great respect.' },
        { type: 'text', body: 'The gurdwara is a place of worship, and the langar offers free food to all visitors.' },
        { type: 'tip', body: 'Seva, selfless service, is central to Sikh life.' },
        {
          type: 'illustration',
          alt: 'A golden Sikh khanda symbol.',
          image: 'assets/3d/khanda-3d.png',
          placeholder: 'Khanda: a central Sikh symbol.'
        },
        { type: 'example', steps: ['A family visits the gurdwara.', 'They pray and listen to scripture.', 'They share a free meal.', 'They serve the community.'] }
      ],
      vocabulary: [
        { word: 'Sikhism', meaning: 'The faith founded by Guru Nanak.', example: 'Sikhism began in Punjab.' },
        { word: 'gurdwara', meaning: 'A Sikh place of worship.', example: 'The gurdwara serves meals.' },
        { word: 'seva', meaning: 'Selfless service to others.', example: 'Seva is part of Sikh life.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who founded Sikhism?', options: ['Guru Nanak', 'Jesus Christ', 'Moses'], answer: 0, why: 'Guru Nanak founded Sikhism.' },
        { type: 'multiple_choice', question: 'What is the Sikh sacred text?', options: ['The Guru Granth Sahib', 'The Torah', 'The Qur’an'], answer: 0, why: 'It is treated with great respect.' },
        { type: 'multiple_choice', question: 'What is langar?', options: ['A free community meal', 'A private feast', 'A fasting day'], answer: 0, why: 'Langar welcomes everyone.' }
      ]
    }, {
      id: 'lower-secondary-religious-education-m2-l3',
      order: 3,
      title: 'Living Together',
      objective: 'I can explain how people of different beliefs can live well together.',
      minutes: 8,
      recap: 'You explained how people of different beliefs can live well together.',
      blocks: [
        { type: 'text', body: 'A plural society includes people of many beliefs and none.' },
        { type: 'text', body: 'Respect means listening, avoiding insult, and protecting everyone’s freedom of belief.' },
        { type: 'text', body: 'Shared projects and honest dialogue build trust between communities.' },
        { type: 'tip', body: 'Disagreement is allowed; discrimination and violence are not.' },
        {
          type: 'illustration',
          alt: 'A glossy red heart symbol.',
          image: 'assets/3d/red_heart-3d.png',
          placeholder: 'Heart: respect across different beliefs.'
        },
        { type: 'example', steps: ['Two neighbours hold different beliefs.', 'They discuss their views politely.', 'They join a local clean-up.', 'Trust grows between them.'] }
      ],
      vocabulary: [
        { word: 'plural', meaning: 'Including many different groups.', example: 'Britain is a plural society.' },
        { word: 'respect', meaning: 'Treating others with dignity.', example: 'Respect different beliefs.' },
        { word: 'dialogue', meaning: 'A respectful conversation.', example: 'Dialogue reduces misunderstanding.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a plural society?', options: ['One with many beliefs', 'One with one belief', 'One with no laws'], answer: 0, why: 'It includes many beliefs and none.' },
        { type: 'multiple_choice', question: 'What does respect involve?', options: ['Listening to others', 'Mocking beliefs', 'Avoiding all contact'], answer: 0, why: 'Respect means listening and protecting freedom.' },
        { type: 'multiple_choice', question: 'Which is never acceptable?', options: ['Discrimination', 'Polite debate', 'Shared projects'], answer: 0, why: 'Discrimination harms people and is wrong.' }
      ]
    }]
  }];
}());

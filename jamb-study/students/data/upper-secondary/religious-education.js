/* GCSE Religious Studies — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'religious-education');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Religious Traditions',
    description: 'Christianity, Islam, and Judaism in depth. Draft content.',
    lessons: [{
      id: 'upper-secondary-religious-education-m1-l1',
      order: 1,
      title: 'Christianity',
      objective: 'I can explain core Christian beliefs about God, Jesus, and salvation.',
      minutes: 10,
      recap: 'You explained core Christian beliefs about God, Jesus, and salvation.',
      blocks: [
        { type: 'text', body: 'Christians are monotheists: they believe in one God, often described as Father, Son, and Holy Spirit.' },
        { type: 'text', body: 'They believe Jesus Christ is the Son of God, who lived, taught, died on a cross, and rose from the dead.' },
        { type: 'text', body: 'Salvation, or being saved from sin, is central, and Christians trust God’s grace rather than their own merit.' },
        { type: 'tip', body: 'Denominations differ on sacraments, authority, and worship style while sharing core beliefs.' },
        {
          type: 'illustration',
          alt: 'A simple golden Latin cross.',
          image: 'assets/3d/latin-cross-3d.png',
          placeholder: 'Cross: incarnation, sacrifice, and resurrection.'
        },
        { type: 'example', steps: ['Christians read the Bible.', 'They reflect on Jesus’ teaching.', 'They pray for guidance.', 'They serve others in response.'] }
      ],
      vocabulary: [
        { word: 'monotheism', meaning: 'Belief in one God.', example: 'Christianity is monotheistic.' },
        { word: 'incarnation', meaning: 'God becoming human in Jesus.', example: 'The incarnation is central.' },
        { word: 'grace', meaning: 'Undeserved gift from God.', example: 'Salvation comes by grace.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What does monotheism mean?', options: ['Belief in one God', 'Belief in many gods', 'Belief in no god'], answer: 0, why: 'Christians believe in one God.' },
        { type: 'multiple_choice', question: 'What is the incarnation?', options: ['God becoming human', 'A church building', 'A type of prayer'], answer: 0, why: 'Jesus is believed to be God incarnate.' },
        { type: 'multiple_choice', question: 'What is grace?', options: ['An undeserved gift', 'A strict rule', 'A payment'], answer: 0, why: 'Christians see salvation as a gift.' }
      ]
    }, {
      id: 'upper-secondary-religious-education-m1-l2',
      order: 2,
      title: 'Islam',
      objective: 'I can explain core Muslim beliefs about God, prophecy, and the afterlife.',
      minutes: 10,
      recap: 'You explained core Muslim beliefs about God, prophecy, and the afterlife.',
      blocks: [
        { type: 'text', body: 'Muslims believe in one God, Allah, who is merciful and all-powerful.' },
        { type: 'text', body: 'Muhammad is the final prophet, and the Qur’an is understood as God’s revealed word.' },
        { type: 'text', body: 'The Five Pillars guide worship and daily life: declaration, prayer, charity, fasting, and pilgrimage.' },
        { type: 'tip', body: 'Sunni and Shia communities share core beliefs but differ on leadership and some practices.' },
        {
          type: 'illustration',
          alt: 'A golden crescent moon and star.',
          image: 'assets/3d/crescent-moon-3d.png',
          placeholder: 'Crescent: Allah’s guidance through the Qur’an.'
        },
        { type: 'example', steps: ['A Muslim declares faith.', 'They pray five times daily.', 'They give charitable alms.', 'They fast and plan pilgrimage.'] }
      ],
      vocabulary: [
        { word: 'tawhid', meaning: 'The oneness of God.', example: 'Tawhid is central to Islam.' },
        { word: 'prophet', meaning: 'A messenger of God.', example: 'Muhammad is a prophet.' },
        { word: 'zakat', meaning: 'Obligatory charitable giving.', example: 'Zakat supports the poor.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is tawhid?', options: ['The oneness of God', 'A pilgrimage', 'A festival'], answer: 0, why: 'Tawhid affirms one God.' },
        { type: 'multiple_choice', question: 'What is zakat?', options: ['Charitable giving', 'Daily prayer', 'A fast'], answer: 0, why: 'Zakat supports those in need.' },
        { type: 'multiple_choice', question: 'What is the Hajj?', options: ['A pilgrimage to Mecca', 'A weekly meal', 'A sacred text'], answer: 0, why: 'Hajj is a pillar of Islam.' }
      ]
    }, {
      id: 'upper-secondary-religious-education-m1-l3',
      order: 3,
      title: 'Judaism',
      objective: 'I can explain core Jewish beliefs about God and covenant.',
      minutes: 10,
      recap: 'You explained core Jewish beliefs about God and covenant.',
      blocks: [
        { type: 'text', body: 'Judaism teaches that one God made a covenant with the Jewish people and gave the Torah.' },
        { type: 'text', body: 'The Torah and its commandments shape worship, ethics, diet, and the Sabbath.' },
        { type: 'text', body: 'Major festivals recall the Exodus, the giving of the Torah, and the protection of life.' },
        { type: 'tip', body: 'Jewish debate values questioning and argument for its own sake.' },
        {
          type: 'illustration',
          alt: 'A golden seven-branched menorah.',
          image: 'assets/3d/menorah-3d.png',
          placeholder: 'Menorah: covenant, memory, and light.'
        },
        { type: 'example', steps: ['A family observes the Sabbath.', 'They bless wine and bread.', 'They discuss the Torah.', 'They share a slow meal.'] }
      ],
      vocabulary: [
        { word: 'covenant', meaning: 'A sacred binding agreement.', example: 'The covenant shapes Jewish life.' },
        { word: 'mitzvah', meaning: 'A commandment.', example: 'A mitzvah guides conduct.' },
        { word: 'Exodus', meaning: 'The biblical escape from slavery.', example: 'Passover recalls the Exodus.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a covenant?', options: ['A sacred agreement', 'A type of building', 'A holiday'], answer: 0, why: 'The covenant binds God and people.' },
        { type: 'multiple_choice', question: 'What is a mitzvah?', options: ['A commandment', 'A prayer mat', 'A festival'], answer: 0, why: 'Mitzvot shape Jewish life.' },
        { type: 'multiple_choice', question: 'Why is Passover important?', options: ['It recalls the Exodus', 'It marks a harvest only', 'It honours a king'], answer: 0, why: 'It remembers the escape from slavery.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Philosophy and Ethics',
    description: 'Buddhist and Hindu thought, and ethics in society. Draft content.',
    lessons: [{
      id: 'upper-secondary-religious-education-m2-l1',
      order: 1,
      title: 'Buddhism',
      objective: 'I can explain key Buddhist ideas about suffering and the path.',
      minutes: 10,
      recap: 'You explained key Buddhist ideas about suffering and the path.',
      blocks: [
        { type: 'text', body: 'Buddhism began with Siddhartha Gautama, who taught that suffering arises from craving and attachment.' },
        { type: 'text', body: 'The Four Noble Truths diagnose suffering and point to the Eightfold Path of ethical living and meditation.' },
        { type: 'text', body: 'Buddhists seek enlightenment, or awakening, rather than worship of a creator god.' },
        { type: 'tip', body: 'Compassion, non-harm, and mindfulness guide many Buddhist practices.' },
        {
          type: 'illustration',
          alt: 'A golden eight-spoked dharma wheel.',
          image: 'assets/3d/wheel-of-dharma-3d.png',
          placeholder: 'Dharma wheel: the Eightfold Path.'
        },
        { type: 'example', steps: ['A person notices frustration.', 'They examine its cause.', 'They practise mindful breathing.', 'They respond with patience.'] }
      ],
      vocabulary: [
        { word: 'Dukkha', meaning: 'Suffering or dissatisfaction.', example: 'Dukkha is a noble truth.' },
        { word: 'karma', meaning: 'Actions and their effects.', example: 'Karma shapes future experience.' },
        { word: 'meditation', meaning: 'Training attention and awareness.', example: 'Meditation calms the mind.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Who taught the Four Noble Truths?', options: ['Buddha', 'Moses', 'Muhammad'], answer: 0, why: 'The Buddha taught the four truths.' },
        { type: 'multiple_choice', question: 'What is the Eightfold Path?', options: ['A path to awakening', 'A trade route', 'A temple'], answer: 0, why: 'It guides ethics, mind, and wisdom.' },
        { type: 'multiple_choice', question: 'What is karma?', options: ['Actions and their effects', 'A holy book', 'A festival'], answer: 0, why: 'Karma links actions and outcomes.' }
      ]
    }, {
      id: 'upper-secondary-religious-education-m2-l2',
      order: 2,
      title: 'Hinduism',
      objective: 'I can explain key Hindu ideas about duty, liberation, and the divine.',
      minutes: 10,
      recap: 'You explained key Hindu ideas about duty, liberation, and the divine.',
      blocks: [
        { type: 'text', body: 'Hinduism is a family of traditions with many deities, stories, and forms of worship.' },
        { type: 'text', body: 'Brahman is seen as the ultimate reality, and dharma is the duty fitting one’s life and role.' },
        { type: 'text', body: 'Samsara is the cycle of rebirth, and moksha is liberation from that cycle.' },
        { type: 'tip', body: 'Yoga, pilgrimage, and bhakti devotion are among many paths.' },
        {
          type: 'illustration',
          alt: 'A golden Om symbol.',
          image: 'assets/3d/om-3d.png',
          placeholder: 'Om: sound, prayer, and the divine.'
        },
        { type: 'example', steps: ['A student faces a difficult choice.', 'They consider their dharma.', 'They act with honesty.', 'They seek wisdom and peace.'] }
      ],
      vocabulary: [
        { word: 'dharma', meaning: 'Right duty and order.', example: 'Dharma depends on your role.' },
        { word: 'samsara', meaning: 'The cycle of rebirth.', example: 'Samsara continues until moksha.' },
        { word: 'moksha', meaning: 'Liberation from rebirth.', example: 'Moksha ends samsara.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is dharma?', options: ['Duty and right order', 'A pilgrimage', 'A sacred river'], answer: 0, why: 'Dharma is one’s fitting duty.' },
        { type: 'multiple_choice', question: 'What is samsara?', options: ['The cycle of rebirth', 'A temple', 'A festival'], answer: 0, why: 'Samsara is the cycle of rebirth.' },
        { type: 'multiple_choice', question: 'What is moksha?', options: ['Liberation', 'A hymn', 'A meal'], answer: 0, why: 'Moksha is freedom from the cycle.' }
      ]
    }, {
      id: 'upper-secondary-religious-education-m2-l3',
      order: 3,
      title: 'Religion, Ethics, and Society',
      objective: 'I can discuss how religious beliefs shape ethical decisions.',
      minutes: 10,
      recap: 'You discussed how religious beliefs shape ethical decisions.',
      blocks: [
        { type: 'text', body: 'Religious ethics often appeal to sacred texts, tradition, reason, and community guidance.' },
        { type: 'text', body: 'Believers may use rules, principles, or the example of key figures to judge an action.' },
        { type: 'text', body: 'In a plural society, people reason together using evidence and shared values.' },
        { type: 'tip', body: 'Ethical disagreement can be respectful when reasons are examined honestly.' },
        {
          type: 'illustration',
          alt: 'A golden balance scale with two pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Scales: weighing reasons in ethical debate.'
        },
        { type: 'example', steps: ['A community debates a new policy.', 'Religious groups offer reasons.', 'Others question those reasons.', 'A compromise is agreed.'] }
      ],
      vocabulary: [
        { word: 'ethics', meaning: 'Study of right and wrong.', example: 'Ethics asks what we owe others.' },
        { word: 'conscience', meaning: 'A sense of right and wrong.', example: 'Act according to conscience.' },
        { word: 'secular', meaning: 'Not religious.', example: 'A secular state stays neutral.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What do religious ethics often appeal to?', options: ['Texts and tradition', 'Only fashion', 'Only wealth'], answer: 0, why: 'Texts, tradition, and reason all matter.' },
        { type: 'multiple_choice', question: 'What is a secular state?', options: ['A neutral, non-religious state', 'A state with one religion', 'A state with no laws'], answer: 0, why: 'Secular states stay neutral on religion.' },
        { type: 'multiple_choice', question: 'How can ethical debate stay respectful?', options: ['By examining reasons honestly', 'By insulting opponents', 'By ignoring evidence'], answer: 0, why: 'Honest reasoning keeps debate fair.' }
      ]
    }]
  }];
}());

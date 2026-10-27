/* GCSE English Literature — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'upper-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english-literature');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Poetry and Plays',
    description: 'Unseen poetry, Shakespeare, and comparison of poems and their effects. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-literature-m1-l1',
      order: 1,
      title: 'Reading Unseen Poetry',
      objective: 'I can read an unseen poem and explain how it creates meaning.',
      minutes: 10,
      recap: 'You read an unseen poem closely and explained its effects.',
      blocks: [
        { type: 'text', body: 'Read the poem twice: first for the story, then for the feeling.' },
        { type: 'text', body: 'Track who is speaking, what changes, and where the poem turns.' },
        { type: 'text', body: 'Comment on form, imagery, and sound, linking each to meaning.' },
        { type: 'tip', body: 'Uncertainty is acceptable if you explain the effect of the words.' },
        {
          type: 'illustration',
          alt: 'An old scroll with a handwritten poem.',
          image: 'assets/3d/scroll-3d.png',
          placeholder: 'Scroll: an unseen poem read for meaning and effect.'
        },
        { type: 'example', steps: ['Speaker: someone returning to a childhood home.', 'Turn: the poem shifts from joy to loss at line nine.', 'Sound: soft consonants make the ending feel quiet.'] }
      ],
      vocabulary: [
        { word: 'stanza', meaning: 'A group of lines in a poem', example: 'The final stanza returns to the opening image.' },
        { word: 'volta', meaning: 'A turn in a poem’s argument or mood', example: 'The volta changes the tone.' },
        { word: 'enjambment', meaning: 'A sentence running past a line break', example: 'Enjambment quickens the pace.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should a second reading of a poem focus on?', options: ['How the poem creates feeling', 'The poet’s birthday', 'The title’s length'], answer: 0, why: 'A second reading moves from story to technique.' },
        { type: 'multiple_choice', question: 'What is a volta?', options: ['A repeated rhyme', 'A turn in mood or argument', 'A four-line stanza'], answer: 1, why: 'A volta marks a shift in the poem.' },
        { type: 'multiple_choice', question: 'Soft consonants slow the final lines. What effect is likely?', options: ['Calm or sadness', 'Sudden panic', 'Comedy'], answer: 0, why: 'Sound patterns shape the mood of a poem.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m1-l2',
      order: 2,
      title: 'Analysing a Shakespeare Scene',
      objective: 'I can analyse a Shakespeare scene using language, action, and context.',
      minutes: 10,
      recap: 'You analysed a Shakespeare scene through language, action, and context.',
      blocks: [
        { type: 'text', body: 'Establish what happens in the scene before analysing the language.' },
        { type: 'text', body: 'Track how power shifts between characters through what they say and do.' },
        { type: 'text', body: 'Use context only where it sharpens your reading, not as decoration.' },
        { type: 'tip', body: 'Quote briefly and explain the effect of individual words.' },
        {
          type: 'illustration',
          alt: 'Two theatre masks, one smiling and one frowning.',
          image: 'assets/3d/performing-arts-3d.png',
          placeholder: 'Theatre masks: power and emotion in a Shakespeare scene.'
        },
        { type: 'example', steps: ['Action: Lady Macbeth takes control of the plan.', 'Language: she questions Macbeth’s courage.', 'Effect: her authority grows as his confidence falls.'] }
      ],
      vocabulary: [
        { word: 'soliloquy', meaning: 'A speech revealing a character’s private thoughts', example: 'The soliloquy shows his doubt.' },
        { word: 'dramatic irony', meaning: 'When the audience knows more than a character', example: 'Dramatic irony makes the scene tense.' },
        { word: 'iambic pentameter', meaning: 'A ten-syllable line with a steady beat', example: 'The iambic pentameter sounds controlled.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should you establish before analysing language?', options: ['What happens in the scene', 'The theatre’s address', 'The ticket price'], answer: 0, why: 'Understanding events gives language analysis a purpose.' },
        { type: 'multiple_choice', question: 'What is dramatic irony?', options: ['The audience knows more than a character', 'A character speaks alone', 'A rhyming couplet'], answer: 0, why: 'The gap in knowledge creates tension.' },
        { type: 'multiple_choice', question: 'A character’s confident speech is followed by their failure. What effect is created?', options: ['Rhyme', 'Dramatic irony', 'Alliteration'], answer: 1, why: 'The audience sees the gap between words and outcome.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m1-l3',
      order: 3,
      title: 'Comparing Poems',
      objective: 'I can compare two poems, analysing methods and effects together.',
      minutes: 10,
      recap: 'You compared two poems, linking methods to effects.',
      blocks: [
        { type: 'text', body: 'Choose two or three points of comparison rather than listing everything.' },
        { type: 'text', body: 'Compare method and effect, not just subject matter.' },
        { type: 'text', body: 'Use comparative connectives to keep both poems in view.' },
        { type: 'tip', body: 'A strong comparison moves back and forth between the poems.' },
        {
          type: 'illustration',
          alt: 'A brass scale balancing two equal pans.',
          image: 'assets/3d/balance-scale-3d.png',
          placeholder: 'Balance scale: two poems compared point by point.'
        },
        { type: 'example', steps: ['Both poems use nature imagery.', 'Poem A uses it to comfort; Poem B uses it to threaten.', 'The contrast shapes each poem’s ending.'] }
      ],
      vocabulary: [
        { word: 'comparison', meaning: 'A point-by-point analysis of similarities and differences', example: 'My comparison focuses on imagery.' },
        { word: 'method', meaning: 'A technique a writer uses', example: 'Both poets use a regular rhythm.' },
        { word: 'contrast', meaning: 'A clear difference', example: 'The contrast in endings is striking.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'How should a poetry comparison be organised?', options: ['By points linking both poems', 'Poem A then Poem B only', 'By line number'], answer: 0, why: 'Point-by-point comparison keeps both poems in view.' },
        { type: 'multiple_choice', question: 'What is a method?', options: ['A technique the poet uses', 'The poem’s title', 'The poet’s home'], answer: 0, why: 'Method means how the writer creates effects.' },
        { type: 'multiple_choice', question: 'Both poems use storms but to different ends. What should you discuss?', options: ['Only the weather', 'The different effects of the same method', 'The poets’ names'], answer: 1, why: 'Comparison should explain how method creates different effects.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'The Novel and Essays',
    description: 'Nineteenth-century novels, themes, context, and essay craft. Draft content.',
    lessons: [{
      id: 'upper-secondary-english-literature-m2-l1',
      order: 1,
      title: 'Exploring a 19th-Century Novel',
      objective: 'I can analyse a 19th-century novel’s characters, setting, and voice.',
      minutes: 10,
      recap: 'You analysed character, setting, and narrative voice in a novel extract.',
      blocks: [
        { type: 'text', body: 'Read extracts closely, tracking how the narrator shapes our judgement.' },
        { type: 'text', body: 'Consider setting as more than background: it can reflect mood and power.' },
        { type: 'text', body: 'Link character choices to the pressures of the society around them.' },
        { type: 'tip', body: 'Use short quotations as evidence, then explain the writer’s choice.' },
        {
          type: 'illustration',
          alt: 'A stack of worn novels with gilded spines.',
          image: 'assets/3d/books-3d.png',
          placeholder: 'Novels: character, setting, and narrative voice analysed.'
        },
        { type: 'example', steps: ['Narrator: the story is told by a servant.', 'Setting: the grand house feels cold and watchful.', 'Effect: readers see the family through an outsider’s eyes.'] }
      ],
      vocabulary: [
        { word: 'narrator', meaning: 'The voice telling the story', example: 'The narrator is a young servant.' },
        { word: 'setting', meaning: 'Where and when a story takes place', example: 'The setting is a remote country house.' },
        { word: 'omniscient', meaning: 'Knowing the thoughts of all characters', example: 'The omniscient narrator judges everyone.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Why does narrative voice matter?', options: ['It shapes how we judge events', 'It sets the cover price', 'It lists the characters'], answer: 0, why: 'The teller’s perspective influences our sympathies.' },
        { type: 'multiple_choice', question: 'What can setting reveal?', options: ['Only the weather', 'Mood and social power', 'The author’s age'], answer: 1, why: 'Places can embody atmosphere and hierarchy.' },
        { type: 'multiple_choice', question: 'An outsider narrates a wealthy family. What is a likely effect?', options: ['Readers notice hidden tensions', 'Readers learn nothing', 'The story loses conflict'], answer: 0, why: 'An outsider sees details the family hides.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m2-l2',
      order: 2,
      title: 'Themes and Context',
      objective: 'I can explore a theme and connect it to relevant context.',
      minutes: 10,
      recap: 'You explored a theme and linked it to relevant context.',
      blocks: [
        { type: 'text', body: 'A theme is an idea the text explores, not a single moral message.' },
        { type: 'text', body: 'Track a theme across the whole text, noting where it changes.' },
        { type: 'text', body: 'Use context to illuminate the text, and avoid long historical summaries.' },
        { type: 'tip', body: 'Choose the context that best explains a specific moment or choice.' },
        {
          type: 'illustration',
          alt: 'A simple world map with a marked location.',
          image: 'assets/3d/world-map-3d.png',
          placeholder: 'Map: context that shapes a text’s themes.'
        },
        { type: 'example', steps: ['Theme: ambition and its cost.', 'Context: expectations limited women’s choices.', 'Link: the character’s ambition becomes a form of rebellion.'] }
      ],
      vocabulary: [
        { word: 'theme', meaning: 'An idea explored throughout a text', example: 'Ambition is a central theme.' },
        { word: 'context', meaning: 'The background that shapes a text', example: 'Context explains the character’s limits.' },
        { word: 'society', meaning: 'The people and customs around a text', example: 'Society expects her to marry.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is a theme?', options: ['An idea explored across a text', 'A single lesson', 'The plot summary'], answer: 0, why: 'Themes are developed ideas, open to interpretation.' },
        { type: 'multiple_choice', question: 'How should context be used?', options: ['To replace quotations', 'To explain specific moments', 'As a long history lesson'], answer: 1, why: 'Context should sharpen analysis of the text itself.' },
        { type: 'multiple_choice', question: 'A character rejects marriage to pursue work. Which context is most relevant?', options: ['Expectations about women’s roles', 'The price of bread', 'The weather'], answer: 0, why: 'That context directly explains the significance of her choice.' }
      ]
    }, {
      id: 'upper-secondary-english-literature-m2-l3',
      order: 3,
      title: 'Writing a Literature Essay',
      objective: 'I can write a literature essay with a clear argument and integrated evidence.',
      minutes: 10,
      recap: 'You built a literature essay around a clear argument and evidence.',
      blocks: [
        { type: 'text', body: 'Turn the question into a clear thesis in your introduction.' },
        { type: 'text', body: 'Plan two or three points, each with evidence from across the text.' },
        { type: 'text', body: 'Embed short quotations in your sentences and explain their effect.' },
        { type: 'tip', body: 'Every paragraph should advance the argument, not just describe the text.' },
        {
          type: 'illustration',
          alt: 'A red bookmark resting in a closed hardback book.',
          image: 'assets/3d/bookmark-3d.png',
          placeholder: 'Bookmark: signposts that keep an essay’s argument on track.'
        },
        { type: 'example', steps: ['Thesis: ambition drives the tragedy.', 'Point: the hero ignores warnings.', 'Evidence: “I will not yield” shows his certainty.', 'Link: certainty becomes his downfall.'] }
      ],
      vocabulary: [
        { word: 'thesis', meaning: 'The central argument of an essay', example: 'My thesis links ambition to downfall.' },
        { word: 'embed', meaning: 'Include a quotation inside your sentence', example: 'Embed the quotation smoothly.' },
        { word: 'analysis', meaning: 'Explaining how evidence supports a point', example: 'The analysis explains the image’s effect.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should an introduction include?', options: ['A full plot summary', 'The author’s biography', 'A clear thesis'], answer: 2, why: 'A thesis states the argument the essay will prove.' },
        { type: 'multiple_choice', question: 'How should a quotation be used?', options: ['Embedded and explained', 'Listed without comment', 'Repeated three times'], answer: 0, why: 'Explanation turns evidence into argument.' },
        { type: 'multiple_choice', question: 'Which sentence advances an argument?', options: ['The warning shows his pride is already blinding him.', 'He meets a witch.', 'The play is long.'], answer: 0, why: 'It interprets evidence rather than describing plot.' }
      ]
    }]
  }];
}());

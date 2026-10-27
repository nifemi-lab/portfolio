/* Lower Secondary English — 2 modules × 3 lessons. Draft content. */
(function () {
  'use strict';
  const data = window.LEARN_TRACKS;
  const track = data && data.tracks.find((entry) => entry.id === 'lower-secondary');
  const subject = track && track.subjects.find((entry) => entry.id === 'english');
  if (!subject) return;

  subject.modules = [{
    id: 'm1',
    order: 1,
    title: 'Reading for Meaning',
    description: 'Main ideas, inference, evidence, and how writers build characters. Draft content.',
    lessons: [{
      id: 'lower-secondary-english-m1-l1',
      order: 1,
      title: 'Finding the Main Idea',
      objective: 'I can find the main idea and supporting details in a paragraph.',
      minutes: 8,
      recap: 'You found main ideas and the details that support them.',
      blocks: [
        { type: 'text', body: 'The main idea is what a paragraph is mostly about. It is often stated in the first or last sentence.' },
        { type: 'text', body: 'Supporting details explain, prove, or illustrate the main idea. They are usually facts, examples, or reasons.' },
        { type: 'text', body: 'Ask yourself: what single point would be lost if this paragraph disappeared?' },
        { type: 'tip', body: 'A main idea is broader than one detail. If it only names one fact, look again.' },
        {
          type: 'illustration',
          alt: 'A magnifying glass held over lines of printed text.',
          image: 'assets/3d/magnifying-glass-tilted-left-3d.png',
          placeholder: 'Magnifier: the main point underneath the details.'
        },
        { type: 'example', steps: ['Read the paragraph once for meaning.', 'Ask what most sentences have in common.', 'State that shared point in one sentence.'] }
      ],
      vocabulary: [
        { word: 'main idea', meaning: 'The central point of a paragraph', example: 'The main idea is about saving water.' },
        { word: 'detail', meaning: 'A fact or example that supports a point', example: 'The detail gives the amount of water used.' },
        { word: 'summary', meaning: 'A short statement of the main points', example: 'Write a one-sentence summary.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Where is a main idea often stated?', options: ['In the first or last sentence', 'Only in the title', 'In every detail'], answer: 0, why: 'Writers often state it early or sum it up at the end.' },
        { type: 'multiple_choice', question: 'Which sentence is a supporting detail?', options: ['Bees are important.', 'This paragraph is about bees.', 'Bees visit hundreds of flowers a day.'], answer: 2, why: 'The number is a fact that supports the main point.' },
        { type: 'multiple_choice', question: 'A paragraph says gardens need water, weeding, and sunlight. What is the main idea?', options: ['Weeding is hard', 'Gardens need several kinds of care', 'Sunlight is yellow'], answer: 1, why: 'All three details support the same broader point.' }
      ]
    }, {
      id: 'lower-secondary-english-m1-l2',
      order: 2,
      title: 'Inference and Evidence',
      objective: 'I can infer meaning from clues and support my inference with evidence.',
      minutes: 8,
      recap: 'You made inferences and backed them with evidence from the text.',
      blocks: [
        { type: 'text', body: 'An inference is a conclusion you reach from clues in the text.' },
        { type: 'text', body: 'Writers often show feelings through actions instead of naming them.' },
        { type: 'text', body: 'Strong answers link the inference to a quotation or specific detail.' },
        { type: 'tip', body: 'Use the pattern: I think this because the text says...' },
        {
          type: 'illustration',
          alt: 'A white thought bubble floating above an open book.',
          image: 'assets/3d/thought-balloon-3d.png',
          placeholder: 'Thought bubble: clues leading to an unstated idea.'
        },
        { type: 'example', steps: ['Read: Her hands shook as she opened the letter.', 'Infer: she feels nervous.', 'Evidence: her hands shook.'] }
      ],
      vocabulary: [
        { word: 'inference', meaning: 'A conclusion drawn from clues', example: 'My inference is that she is nervous.' },
        { word: 'evidence', meaning: 'Proof taken from the text', example: 'Use a quotation as evidence.' },
        { word: 'imply', meaning: 'Suggest without saying directly', example: 'The shaking hands imply fear.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What is an inference?', options: ['A conclusion based on clues', 'A word’s dictionary meaning', 'The title of a text'], answer: 0, why: 'Readers build inferences from evidence in the text.' },
        { type: 'multiple_choice', question: 'Which detail best supports the idea that Tom is tired?', options: ['He wore a blue coat.', 'He walked to school.', 'He yawned and rubbed his eyes.'], answer: 2, why: 'Yawning and rubbing eyes are signs of tiredness.' },
        { type: 'multiple_choice', question: 'A character says “Fine” and slams the door. What can you infer?', options: ['They are sleepy', 'They are angry', 'They are hungry'], answer: 1, why: 'The slammed door suggests strong frustration.' }
      ]
    }, {
      id: 'lower-secondary-english-m1-l3',
      order: 3,
      title: 'Analysing a Character',
      objective: 'I can describe a character using actions, speech, and reactions.',
      minutes: 8,
      recap: 'You built a character picture from actions, speech, and reactions.',
      blocks: [
        { type: 'text', body: 'Writers reveal character through what people do, say, and think.' },
        { type: 'text', body: 'Notice how other characters react. Their responses show us more.' },
        { type: 'text', body: 'Choose two or three details rather than listing everything.' },
        { type: 'tip', body: 'Avoid labelling a character. Explain which detail gives you that impression.' },
        {
          type: 'illustration',
          alt: 'Theatre masks for comedy and tragedy on a dark stage.',
          image: 'assets/3d/performing-arts-3d.png',
          placeholder: 'Theatre masks: character shown through action and speech.'
        },
        { type: 'example', steps: ['Detail: she shares her lunch every day.', 'Detail: she speaks calmly to new pupils.', 'Conclusion: she is generous and kind.'] }
      ],
      vocabulary: [
        { word: 'characterisation', meaning: 'How a writer builds a character', example: 'The writer uses characterisation through speech.' },
        { word: 'impression', meaning: 'The feeling a character gives you', example: 'She creates a warm impression.' },
        { word: 'motive', meaning: 'The reason a character acts', example: 'His motive is to protect his sister.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which detail best reveals character?', options: ['She has brown hair.', 'She always waits for her friend.', 'She lives in Leeds.'], answer: 1, why: 'Actions show personality more than appearance or place.' },
        { type: 'multiple_choice', question: 'What does a character’s speech reveal?', options: ['Their personality and attitude', 'Their height', 'The weather'], answer: 0, why: 'Word choice and tone show how a character thinks and feels.' },
        { type: 'multiple_choice', question: 'A boy gives his last coin to a stranger. What trait does this suggest?', options: ['Jealousy', 'Carelessness', 'Generosity'], answer: 2, why: 'Giving away something precious suggests generosity.' }
      ]
    }]
  }, {
    id: 'm2',
    order: 2,
    title: 'Writing with Purpose',
    description: 'Paragraphs, persuasion, and formal letters with a clear reader in mind. Draft content.',
    lessons: [{
      id: 'lower-secondary-english-m2-l1',
      order: 1,
      title: 'Paragraphs That Flow',
      objective: 'I can organise ideas into paragraphs that connect clearly.',
      minutes: 8,
      recap: 'You organised ideas into paragraphs with clear links.',
      blocks: [
        { type: 'text', body: 'Each paragraph should make one main point.' },
        { type: 'text', body: 'Start with a topic sentence that names the point.' },
        { type: 'text', body: 'Link sentences with connectives such as however, because, and therefore.' },
        { type: 'tip', body: 'If a sentence does not support the paragraph’s point, move or remove it.' },
        {
          type: 'illustration',
          alt: 'A memo pad with a short list of connected points.',
          image: 'assets/3d/memo-3d.png',
          placeholder: 'Memo: one point per paragraph, linked in order.'
        },
        { type: 'example', steps: ['Topic sentence: School gardens improve wellbeing.', 'Evidence: pupils spend time outdoors.', 'Link: As a result, lessons feel calmer.'] }
      ],
      vocabulary: [
        { word: 'paragraph', meaning: 'A group of sentences about one point', example: 'Begin each paragraph with a clear point.' },
        { word: 'connective', meaning: 'A word that links ideas', example: 'However signals a contrast.' },
        { word: 'topic sentence', meaning: 'The sentence that states a paragraph’s point', example: 'The topic sentence comes first.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'What should each paragraph contain?', options: ['One main point', 'As many ideas as possible', 'Only quotations'], answer: 0, why: 'One point per paragraph keeps writing clear.' },
        { type: 'multiple_choice', question: 'Which word links a cause to its result?', options: ['meanwhile', 'therefore', 'above'], answer: 1, why: 'Therefore introduces a result.' },
        { type: 'multiple_choice', question: 'Which sentence is the best topic sentence?', options: ['We put a bin in the hall.', 'Recycling reduces waste in schools.', 'My teacher is tall.'], answer: 1, why: 'It states a clear point the paragraph can develop.' }
      ]
    }, {
      id: 'lower-secondary-english-m2-l2',
      order: 2,
      title: 'Persuasive Writing',
      objective: 'I can persuade a reader using reasons, evidence, and direct address.',
      minutes: 8,
      recap: 'You persuaded a reader with reasons, evidence, and direct address.',
      blocks: [
        { type: 'text', body: 'State your position clearly in the opening sentence.' },
        { type: 'text', body: 'Give reasons that your reader can check or accept.' },
        { type: 'text', body: 'Use direct address and short rhetorical questions to involve the reader.' },
        { type: 'tip', body: 'A strong argument also acknowledges the other side, then answers it.' },
        {
          type: 'illustration',
          alt: 'A bright speech balloon rising above two speakers.',
          image: 'assets/3d/speech-balloon-3d.png',
          placeholder: 'Speech balloon: a claim, reasons, and a call to action.'
        },
        { type: 'example', steps: ['Claim: Our school should recycle paper.', 'Reason: one tonne of paper saves seventeen trees.', 'Call to action: ask your tutor to add a paper bin today.'] }
      ],
      vocabulary: [
        { word: 'persuade', meaning: 'Convince someone to agree or act', example: 'We persuade readers with reasons.' },
        { word: 'claim', meaning: 'A statement you argue is true', example: 'My claim is that homework helps.' },
        { word: 'rhetorical question', meaning: 'A question asked for effect', example: 'Do we really want more waste?' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which opening best states a position?', options: ['Our town needs a new library.', 'Libraries have books.', 'Some people like reading.'], answer: 0, why: 'It makes a clear, arguable claim.' },
        { type: 'multiple_choice', question: 'Which is the strongest evidence?', options: ['A survey of 200 pupils found 80% wanted later starts.', 'Everyone thinks later starts are nice.', 'I prefer later starts.'], answer: 0, why: 'Survey data is checkable evidence, not just opinion.' },
        { type: 'multiple_choice', question: 'Why use a rhetorical question?', options: ['To give a definition', 'To add a quotation', 'To make the reader think and agree'], answer: 2, why: 'It draws the reader in and points toward your view.' }
      ]
    }, {
      id: 'lower-secondary-english-m2-l3',
      order: 3,
      title: 'Writing a Formal Letter',
      objective: 'I can write a formal letter with the correct layout and tone.',
      minutes: 9,
      recap: 'You wrote a formal letter with a clear layout and polite tone.',
      blocks: [
        { type: 'text', body: 'A formal letter opens with your address and the date.' },
        { type: 'text', body: 'Use a polite greeting such as Dear Ms Patel, and a clear subject line.' },
        { type: 'text', body: 'State your purpose in the first paragraph, then add details and a closing request.' },
        { type: 'tip', body: 'Use Yours sincerely when you know the name, and Yours faithfully when you do not.' },
        {
          type: 'illustration',
          alt: 'A sealed cream envelope with a neat address.',
          image: 'assets/3d/envelope-3d.png',
          placeholder: 'Envelope: address, greeting, purpose, closing.'
        },
        { type: 'example', steps: ['Opening: I am writing to request a new bike rack.', 'Detail: twelve pupils cycle daily with nowhere to park.', 'Closing: I would be grateful for your reply.'] }
      ],
      vocabulary: [
        { word: 'formal', meaning: 'Polite and suitable for official writing', example: 'Use formal language with a headteacher.' },
        { word: 'salutation', meaning: 'The greeting at the start of a letter', example: 'The salutation is Dear Dr Ali.' },
        { word: 'recipient', meaning: 'The person who receives the message', example: 'Our recipient is the headteacher.' }
      ],
      quiz: [
        { type: 'multiple_choice', question: 'Which greeting is formal?', options: ['Dear Ms Patel,', 'Hiya!', 'Yo,'], answer: 0, why: 'Dear with a title and surname is formal.' },
        { type: 'multiple_choice', question: 'Where does the purpose of a formal letter belong?', options: ['In the first paragraph', 'In the signature', 'In the address'], answer: 0, why: 'Readers need the reason for writing immediately.' },
        { type: 'multiple_choice', question: 'Which closing matches a named recipient?', options: ['Yours faithfully,', 'See you,', 'Yours sincerely,'], answer: 2, why: 'Sincerely pairs with a named recipient.' }
      ]
    }]
  }];
}());

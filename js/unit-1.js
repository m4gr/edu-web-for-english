/* ============================================================
   ENGLISH QUEST – UNIT 1 INTERACTIVE SCRIPT
   File: js/unit-1.js
   Part 1 of 4: Data, constants, state, storage helpers
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. CONSTANTS
   ------------------------------------------------------------ */
const U1_CONFIG = {
  unitId: 1,
  unitTitle: 'Getting to Know You',
  pointsPerQuestion: 10,
  totalActivities: 30,
  storageKey: 'englishQuestUnit1',
  langStorageKey: 'englishQuestLang'
};

/* ------------------------------------------------------------
   2. BILINGUAL INTERFACE STRINGS (EN / AR)
   ------------------------------------------------------------
   Unit titles and question content stay in English by design,
   but the interface chrome (labels, buttons, feedback) is
   translated. This mirrors the homepage's TRANSLATIONS object.
   ------------------------------------------------------------ */
const U1_STRINGS = {
  'nav.backHome':      { en: 'Back to Home',                ar: 'العودة للرئيسية' },
  'nav.unitLabel':     { en: 'Unit 1',                      ar: 'الوحدة ١' },

  'hero.eyebrow':      { en: 'UNIT 01',                     ar: 'الوحدة ٠١' },
  'hero.desc':         {
    en: "Let's improve your English skills through fun and interactive activities!",
    ar: 'لنحسّن مهاراتك في اللغة الإنجليزية من خلال أنشطة ممتعة وتفاعلية!'
  },
  'hero.sections':     { en: 'Sections',                    ar: 'أقسام' },
  'hero.activities':   { en: 'Activities',                  ar: 'أنشطة' },
  'hero.xpEarned':     { en: 'XP earned',                   ar: 'نقطة خبرة' },
  'hero.progress':     { en: 'Unit Progress',               ar: 'تقدم الوحدة' },

  'sections.title':    { en: 'Learning Sections',           ar: 'أقسام التعلم' },
  'sections.subtitle': { en: 'Pick a section and start practicing!', ar: 'اختر قسماً وابدأ التدريب!' },

  'section.activities':{ en: 'activities',                  ar: 'أنشطة' },
  'section.start':     { en: 'Start Practice',              ar: 'ابدأ التدريب' },
  'section.retake':    { en: 'Practice Again',              ar: 'تدرب مجدداً' },
  'section.statusNew': { en: 'Not started',                 ar: 'لم يبدأ' },
  'section.statusProg':{ en: 'In progress',                 ar: 'قيد التقدم' },
  'section.statusDone':{ en: 'Completed',                   ar: 'مكتمل' },

  'exercise.exit':     { en: 'Exit Section',                ar: 'الخروج من القسم' },
  'exercise.question': { en: 'Question',                    ar: 'السؤال' },
  'exercise.of':       { en: 'of',                          ar: 'من' },
  'exercise.points':   { en: 'points',                      ar: 'نقاط' },
  'exercise.point':    { en: 'point',                       ar: 'نقطة' },
  'exercise.readingTitle': { en: 'Reading Passage',         ar: 'قطعة القراءة' },

  'type.multipleChoice':  { en: 'Multiple Choice',          ar: 'اختيار من متعدد' },
  'type.fillBlank':       { en: 'Complete the Sentence',    ar: 'أكمل الجملة' },
  'type.matching':        { en: 'Choose the Meaning',       ar: 'اختر المعنى' },
  'type.ordering':        { en: 'Arrange the Sentence',     ar: 'رتّب الجملة' },
  'type.shortAnswer':     { en: 'Short Answer',             ar: 'إجابة قصيرة' },
  'type.longAnswer':      { en: 'Writing',                  ar: 'كتابة' },

  'action.submit':     { en: 'Submit Answer',               ar: 'تحقق من الإجابة' },
  'action.next':       { en: 'Next Question',               ar: 'السؤال التالي' },
  'action.finish':     { en: 'Finish Section',              ar: 'إنهاء القسم' },
  'action.retry':      { en: 'Retry Section',               ar: 'إعادة القسم' },
  'action.backToUnit': { en: 'Back to Unit',                ar: 'العودة للوحدة' },

  'feedback.correct':     { en: 'Correct!',                 ar: 'إجابة صحيحة!' },
  'feedback.incorrect':   { en: 'Not quite right',          ar: 'ليست صحيحة تماماً' },
  'feedback.modelAnswer': { en: 'Model answer',             ar: 'إجابة نموذجية' },
  'feedback.noAnswer':    { en: 'Please type an answer first.', ar: 'يرجى كتابة إجابة أولاً.' },

  'completion.title':     { en: 'Great Job!',               ar: 'عمل رائع!' },
  'completion.subtitle':  { en: 'You completed {section}!',  ar: 'لقد أكملت قسم {section}!' },
  'completion.scoreLabel':{ en: 'Your Score',               ar: 'نتيجتك' },
  'completion.correct':   { en: 'Correct',                  ar: 'صحيحة' },
  'completion.incorrect': { en: 'Incorrect',                ar: 'خاطئة' },

  'progress.overall':  { en: 'Overall progress',            ar: 'التقدم الإجمالي' }
};

/* ------------------------------------------------------------
   3. SECTION METADATA
   ------------------------------------------------------------
   Five sections. Accent color is applied via CSS class
   (data-section). Each section carries its 6 questions.
   ------------------------------------------------------------ */
const SECTIONS = [
  {
    id: 'grammar',
    nameEn: 'Grammar',
    nameAr: 'القواعد',
    descEn: 'Practice present simple, present continuous, and past simple tenses.',
    descAr: 'تدرّب على المضارع البسيط والمضارع المستمر والماضي البسيط.',
    icon: 'bookGrammar'
  },
  {
    id: 'vocabulary',
    nameEn: 'Vocabulary',
    nameAr: 'المفردات',
    descEn: 'Learn words about countries, daily activities, places, and jobs.',
    descAr: 'تعلّم كلمات عن البلدان والأنشطة اليومية والأماكن والمهن.',
    icon: 'bookOpen'
  },
  {
    id: 'speaking',
    nameEn: 'Speaking',
    nameAr: 'المحادثة',
    descEn: 'Choose the right response and build natural English sentences.',
    descAr: 'اختر الرد المناسب وكوّن جملاً إنجليزية طبيعية.',
    icon: 'mic'
  },
  {
    id: 'reading',
    nameEn: 'Reading',
    nameAr: 'القراءة',
    descEn: 'Read a short passage about a new friend and answer questions.',
    descAr: 'اقرأ قطعة قصيرة عن صديق جديد وأجب عن الأسئلة.',
    icon: 'readingBook'
  },
  {
    id: 'writing',
    nameEn: 'Writing',
    nameAr: 'الكتابة',
    descEn: 'Complete sentences, fix mistakes, and write short answers.',
    descAr: 'أكمل الجمل، صحّح الأخطاء، واكتب إجابات قصيرة.',
    icon: 'pencil'
  }
];

/* ------------------------------------------------------------
   4. READING PASSAGE (shared by all Reading questions)
   ------------------------------------------------------------ */
const READING_PASSAGE = {
  title: 'My New Friend',
  paragraphs: [
    'Hello! My name is Sara. I am eleven years old, and I live in Cairo, Egypt. I have a big family: my father, my mother, my two brothers, and my little sister. My father is a doctor, and my mother is a teacher. She teaches English at a primary school.',
    'I go to school from Sunday to Thursday. My favourite subject is science because I love learning about animals. After school, I usually play football with my brothers in the garden. On Fridays, we visit my grandmother and eat a big lunch together.',
    'Last weekend, I met a new friend. Her name is Lina, and she is from Jordan. She speaks Arabic and a little English. We played a game and laughed a lot. I think Lina will be a very good friend!'
  ]
};

/* ------------------------------------------------------------
   5. QUESTION BANK — 30 QUESTIONS (6 per section)
   ------------------------------------------------------------
   Every question has:
     id, type, text, options?, correct, explanation, points,
     modelAnswer?  (for free-response)
     acceptedAnswers? (for lenient checking)
   ------------------------------------------------------------ */
const QUESTIONS = {

  /* ========== GRAMMAR (6) ========== */
  grammar: [
    {
      id: 'g1',
      type: 'multipleChoice',
      text: 'She _____ to school every day.',
      options: ['go', 'goes', 'going', 'went'],
      correct: 'goes',
      explanation: 'With "she" (third person singular), we add -es to the verb in the present simple.',
      points: 10
    },
    {
      id: 'g2',
      type: 'multipleChoice',
      text: 'Look! The children _____ in the garden right now.',
      options: ['play', 'plays', 'are playing', 'played'],
      correct: 'are playing',
      explanation: 'We use the present continuous (are + -ing) for actions happening right now.',
      points: 10
    },
    {
      id: 'g3',
      type: 'multipleChoice',
      text: 'Yesterday, I _____ my grandmother at her house.',
      options: ['visit', 'visits', 'am visiting', 'visited'],
      correct: 'visited',
      explanation: '"Yesterday" signals the past simple, so we use the -ed form "visited".',
      points: 10
    },
    {
      id: 'g4',
      type: 'multipleChoice',
      text: 'My brother and I _____ football every Friday.',
      options: ['plays', 'play', 'is playing', 'are play'],
      correct: 'play',
      explanation: 'With plural subjects like "my brother and I", the verb is "play" (no -s).',
      points: 10
    },
    {
      id: 'g5',
      type: 'multipleChoice',
      text: 'That is _____ book. Please give it to her.',
      options: ['she', 'her', 'hers', 'she’s'],
      correct: 'her',
      explanation: 'Before a noun we use a possessive adjective: her book.',
      points: 10
    },
    {
      id: 'g6',
      type: 'multipleChoice',
      text: '_____ you like ice cream?',
      options: ['Are', 'Do', 'Does', 'Is'],
      correct: 'Do',
      explanation: 'For the present simple question with "you", we use "Do" + base verb.',
      points: 10
    }
  ],

  /* ========== VOCABULARY (6) ========== */
  vocabulary: [
    {
      id: 'v1',
      type: 'multipleChoice',
      text: 'Which word means "a person from Japan"?',
      options: ['Japanese', 'Japan', 'Japany', 'Japanner'],
      correct: 'Japanese',
      explanation: 'The nationality for someone from Japan is "Japanese".',
      points: 10
    },
    {
      id: 'v2',
      type: 'multipleChoice',
      text: 'Choose the place where we borrow books:',
      options: ['library', 'hospital', 'bakery', 'market'],
      correct: 'library',
      explanation: 'A library is where people borrow or read books.',
      points: 10
    },
    {
      id: 'v3',
      type: 'multipleChoice',
      text: 'A person who treats sick people is a _____.',
      options: ['teacher', 'doctor', 'driver', 'farmer'],
      correct: 'doctor',
      explanation: 'A doctor helps people who are sick.',
      points: 10
    },
    {
      id: 'v4',
      type: 'multipleChoice',
      text: 'Choose the correct meaning of "hobby":',
      options: [
        'Something you do for fun in your free time',
        'A job you do for money',
        'A place you visit every day',
        'A type of food'
      ],
      correct: 'Something you do for fun in your free time',
      explanation: 'A hobby is an activity you enjoy doing in your free time (like reading, drawing, or playing football).',
      points: 10
    },
    {
      id: 'v5',
      type: 'multipleChoice',
      text: 'Complete the sentence: "I brush my _____ every morning."',
      options: ['shoes', 'teeth', 'hair', 'hands'],
      correct: 'teeth',
      explanation: 'We "brush our teeth" with a toothbrush and toothpaste.',
      points: 10
    },
    {
      id: 'v6',
      type: 'multipleChoice',
      text: 'Choose the word that describes a very cold season:',
      options: ['summer', 'winter', 'spring', 'autumn'],
      correct: 'winter',
      explanation: 'Winter is the coldest season of the year.',
      points: 10
    }
  ],

  /* ========== SPEAKING (6) ========== */
  speaking: [
    {
      id: 's1',
      type: 'multipleChoice',
      text: 'A: "Hello! What\'s your name?" — B: "_____"',
      options: [
        'I am fine, thank you.',
        'My name is Omar.',
        'Yes, I do.',
        'Goodbye!'
      ],
      correct: 'My name is Omar.',
      explanation: 'When someone asks "What\'s your name?", you answer with your name.',
      points: 10
    },
    {
      id: 's2',
      type: 'multipleChoice',
      text: 'A: "How are you today?" — B: "_____"',
      options: [
        'I am twelve years old.',
        'I am from Egypt.',
        'I am fine, thank you!',
        'Yes, please.'
      ],
      correct: 'I am fine, thank you!',
      explanation: 'The natural answer to "How are you?" is "I am fine, thank you!"',
      points: 10
    },
    {
      id: 's3',
      type: 'multipleChoice',
      text: 'A: "Where are you from?" — B: "_____"',
      options: [
        'I am from Saudi Arabia.',
        'I am fine.',
        'My name is Ali.',
        'I am eleven.'
      ],
      correct: 'I am from Saudi Arabia.',
      explanation: 'When asked where you are from, answer with your country.',
      points: 10
    },
    {
      id: 's4',
      type: 'ordering',
      text: 'Arrange the words to make a correct sentence:',
      // options shown as jumbled words; correct is the ordered sentence
      options: ['name', 'My', 'is', 'Layla'],
      correct: 'My name is Layla',
      explanation: 'The correct order is: "My name is Layla."',
      points: 10
    },
    {
      id: 's5',
      type: 'ordering',
      text: 'Arrange the words to make a correct sentence:',
      options: ['from', 'are', 'Where', 'you'],
      correct: 'Where are you from',
      explanation: 'The correct order is: "Where are you from?"',
      points: 10
    },
    {
      id: 's6',
      type: 'multipleChoice',
      text: 'A: "Nice to meet you!" — B: "_____"',
      options: [
        'Nice to meet you too!',
        'I am sorry.',
        'No, thank you.',
        'See you yesterday.'
      ],
      correct: 'Nice to meet you too!',
      explanation: 'The polite reply to "Nice to meet you!" is "Nice to meet you too!"',
      points: 10
    }
  ],

  /* ========== READING (6) — based on READING_PASSAGE ========== */
  reading: [
    {
      id: 'r1',
      type: 'multipleChoice',
      text: 'How old is Sara?',
      options: ['ten', 'eleven', 'twelve', 'thirteen'],
      correct: 'eleven',
      explanation: 'The passage says: "I am eleven years old."',
      points: 10
    },
    {
      id: 'r2',
      type: 'multipleChoice',
      text: 'What does Sara\'s mother do?',
      options: ['She is a doctor.', 'She is a teacher.', 'She is a nurse.', 'She is a farmer.'],
      correct: 'She is a teacher.',
      explanation: 'The passage says: "My mother is a teacher. She teaches English at a primary school."',
      points: 10
    },
    {
      id: 'r3',
      type: 'multipleChoice',
      text: 'Which subject does Sara like best?',
      options: ['English', 'Maths', 'Science', 'Art'],
      correct: 'Science',
      explanation: 'Sara says: "My favourite subject is science because I love learning about animals."',
      points: 10
    },
    {
      id: 'r4',
      type: 'multipleChoice',
      text: 'Where is Lina from?',
      options: ['Egypt', 'Jordan', 'Saudi Arabia', 'Lebanon'],
      correct: 'Jordan',
      explanation: 'The passage says: "Her name is Lina, and she is from Jordan."',
      points: 10
    },
    {
      id: 'r5',
      type: 'multipleChoice',
      text: 'What does the word "primary" mean in the passage?',
      options: [
        'Related to the first years of school',
        'Very old',
        'Very expensive',
        'Related to sports'
      ],
      correct: 'Related to the first years of school',
      explanation: 'A "primary school" is a school for young children in their first years of education.',
      points: 10
    },
    {
      id: 'r6',
      type: 'multipleChoice',
      text: 'What is the main idea of the passage?',
      options: [
        'Sara introduces herself and talks about her life and new friend.',
        'Sara explains how to cook a big lunch.',
        'Sara describes a football match in Cairo.',
        'Sara talks about her favourite animals.'
      ],
      correct: 'Sara introduces herself and talks about her life and new friend.',
      explanation: 'The passage introduces Sara, her family, school life, and her new friend Lina.',
      points: 10
    }
  ],

  /* ========== WRITING (6) ========== */
  writing: [
    {
      id: 'w1',
      type: 'fillBlank',
      text: 'Complete the sentence: "My name _____ Rami."',
      acceptedAnswers: ['is'],
      correct: 'is',
      explanation: 'The verb "to be" for "my name" is "is": "My name is Rami."',
      modelAnswer: 'My name is Rami.',
      points: 10
    },
    {
      id: 'w2',
      type: 'fillBlank',
      text: 'Complete the sentence: "I _____ from Egypt."',
      acceptedAnswers: ['am'],
      correct: 'am',
      explanation: 'With "I", the verb "to be" is "am": "I am from Egypt."',
      modelAnswer: 'I am from Egypt.',
      points: 10
    },
    {
      id: 'w3',
      type: 'multipleChoice',
      text: 'Fix the sentence. Which version is correct?',
      options: [
        'She go to school every day.',
        'She goes to school every day.',
        'She going to school every day.',
        'She gone to school every day.'
      ],
      correct: 'She goes to school every day.',
      explanation: 'With "she" (third person singular), we add -es: "She goes to school every day."',
      points: 10
    },
    {
      id: 'w4',
      type: 'ordering',
      text: 'Arrange the words to make a correct sentence:',
      options: ['is', 'My', 'teacher', 'mother', 'a'],
      correct: 'My mother is a teacher',
      explanation: 'The correct order is: "My mother is a teacher."',
      points: 10
    },
    {
      id: 'w5',
      type: 'shortAnswer',
      text: 'Write a short sentence about your favourite hobby. (Example: "My favourite hobby is reading.")',
      acceptedAnswers: ['my favourite hobby is reading', 'my favorite hobby is reading', 'i like reading', 'i like playing football', 'i like drawing'],
      modelAnswer: 'My favourite hobby is reading.',
      explanation: 'A good answer uses the pattern: "My favourite hobby is ___." or "I like ___."',
      points: 10
    },
    {
      id: 'w6',
      type: 'shortAnswer',
      text: 'Introduce yourself in one sentence. (Example: "My name is Sara and I am eleven years old.")',
      acceptedAnswers: ['my name is', 'i am', 'i\'m'],
      modelAnswer: 'My name is Sara and I am eleven years old.',
      explanation: 'A good introduction includes your name and maybe your age or where you are from.',
      points: 10
    }
  ]
};

/* ------------------------------------------------------------
   6. ICON LIBRARY (inline SVG strings for section cards)
   ------------------------------------------------------------ */
const U1_ICONS = {
  bookGrammar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>`,
  bookOpen:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  mic:        `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  readingBook:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><line x1="6" y1="9" x2="9" y2="9"/><line x1="15" y1="9" x2="18" y2="9"/></svg>`,
  pencil:     `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>`,
  check:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  close:      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  arrowLeft:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
  star:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  list:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  refresh:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  home:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
};

/* ------------------------------------------------------------
   7. DOM REFERENCES
   ------------------------------------------------------------ */
const U1_DOM = {
  // Views
  overviewView: document.getElementById('unitOverviewView'),
  exerciseView: document.getElementById('exerciseView'),
  completionView: document.getElementById('completionView'),

  // Hero / overview
  heroXp: document.getElementById('heroXp'),
  unitProgressFill: document.getElementById('unitProgressFill'),
  unitProgressPercent: document.getElementById('unitProgressPercent'),
  sectionsGrid: document.getElementById('sectionsGrid'),
  navProgressFill: document.getElementById('navProgressFill'),
  navProgressText: document.getElementById('navProgressText'),

  // Language switcher
  langSwitcher: document.getElementById('langSwitcher'),
  langCurrent: document.getElementById('langCurrent'),

  // Exercise view
  exitSectionBtn: document.getElementById('exitSectionBtn'),
  exerciseSectionName: document.getElementById('exerciseSectionName'),
  exerciseScore: document.getElementById('exerciseScore'),
  questionCounter: document.getElementById('questionCounter'),
  questionProgressPercent: document.getElementById('questionProgressPercent'),
  questionProgressFill: document.getElementById('questionProgressFill'),
  readingPassage: document.getElementById('readingPassage'),
  readingPassageBody: document.getElementById('readingPassageBody'),
  questionCard: document.getElementById('questionCard'),
  questionTypeTag: document.getElementById('questionTypeTag'),
  questionPoints: document.getElementById('questionPoints'),
  questionText: document.getElementById('questionText'),
  questionOptions: document.getElementById('questionOptions'),
  questionInputArea: document.getElementById('questionInputArea'),
  freeTextInput: document.getElementById('freeTextInput'),
  questionFeedback: document.getElementById('questionFeedback'),
  feedbackIcon: document.getElementById('feedbackIcon'),
  feedbackVerdict: document.getElementById('feedbackVerdict'),
  feedbackExplanation: document.getElementById('feedbackExplanation'),
  feedbackModel: document.getElementById('feedbackModel'),
  feedbackModelText: document.getElementById('feedbackModelText'),
  submitAnswerBtn: document.getElementById('submitAnswerBtn'),
  nextQuestionBtn: document.getElementById('nextQuestionBtn'),

  // Completion view
  completionSubtitle: document.getElementById('completionSubtitle'),
  completionScoreValue: document.getElementById('completionScoreValue'),
  completionCorrect: document.getElementById('completionCorrect'),
  completionIncorrect: document.getElementById('completionIncorrect'),
  retrySectionBtn: document.getElementById('retrySectionBtn'),
  backToUnitBtn: document.getElementById('backToUnitBtn')
};

/* ------------------------------------------------------------
   8. STATE
   ------------------------------------------------------------ */
const state = {
  lang: 'en',
  currentSection: null,     // section id string, e.g. 'grammar'
  currentQuestionIndex: 0,
  selectedOption: null,     // for MC/ordering
  userText: '',             // for free-text
  answered: false,          // has the current question been submitted?
  sectionAnswers: [],       // [{ questionId, correct, userAnswer }]
  sectionCorrectCount: 0,
  sectionScorePoints: 0
};

/* ------------------------------------------------------------
   9. LOCALSTORAGE HELPERS
   ------------------------------------------------------------
   Progress structure:
   {
     sections: {
       grammar:    { completed: true, score: 50, total: 60, correct: 5 },
       vocabulary: { completed: false, score: 0, total: 60, correct: 0 },
       ...
     },
     xp: 0,
     lastUpdated: 1234567890
   }
   ------------------------------------------------------------ */
function loadProgress() {
  try {
    const raw = localStorage.getItem(U1_CONFIG.storageKey);
    if (!raw) return createEmptyProgress();
    const parsed = JSON.parse(raw);
    return normalizeProgress(parsed);
  } catch (_) {
    return createEmptyProgress();
  }
}

function saveProgress(progress) {
  try {
    progress.lastUpdated = Date.now();
    localStorage.setItem(U1_CONFIG.storageKey, JSON.stringify(progress));
  } catch (_) { /* storage may be blocked; fail silently */ }
}

function createEmptyProgress() {
  const sections = {};
  SECTIONS.forEach(sec => {
    sections[sec.id] = { completed: false, score: 0, total: QUESTIONS[sec.id].length * U1_CONFIG.pointsPerQuestion, correct: 0 };
  });
  return { sections, xp: 0, lastUpdated: Date.now() };
}

function normalizeProgress(progress) {
  const base = createEmptyProgress();
  if (!progress || typeof progress !== 'object') return base;

  // Merge safely so a partial save doesn't break rendering.
  const merged = { ...base, ...progress };
  merged.sections = { ...base.sections };

  if (progress.sections && typeof progress.sections === 'object') {
    Object.keys(base.sections).forEach(id => {
      const saved = progress.sections[id];
      if (saved && typeof saved === 'object') {
        merged.sections[id] = {
          completed: Boolean(saved.completed),
          score: Number(saved.score) || 0,
          total: Number(saved.total) || base.sections[id].total,
          correct: Number(saved.correct) || 0
        };
      }
    });
  }

  merged.xp = Number(progress.xp) || 0;
  return merged;
}

/* ------------------------------------------------------------
   10. i18n HELPERS
   ------------------------------------------------------------ */
function u1t(key) {
  const entry = U1_STRINGS[key];
  if (!entry) return key;
  return entry[state.lang] || entry.en || key;
}

function u1Format(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

/* ------------------------------------------------------------
   11. LANGUAGE PERSISTENCE
   ------------------------------------------------------------ */
function loadSavedLanguage() {
  try {
    const saved = localStorage.getItem(U1_CONFIG.langStorageKey);
    return saved === 'ar' ? 'ar' : 'en';
  } catch (_) {
    return 'en';
  }
}

function saveLanguage(lang) {
  try {
    localStorage.setItem(U1_CONFIG.langStorageKey, lang);
  } catch (_) { /* ignore */ }
}

/* ------------------------------------------------------------
   12. GLOBAL PROGRESS INSTANCE (kept in memory)
   ------------------------------------------------------------ */
let progress = loadProgress();

// Expose a small debug helper if needed during development
// window.__u1 = { state, progress, QUESTIONS, SECTIONS };
/* ============================================================
   ENGLISH QUEST – UNIT 1 INTERACTIVE SCRIPT
   File: js/unit-1.js
   Part 2 of 4: Rendering, view switching, question display
   ============================================================ */

/* ------------------------------------------------------------
   13. VIEW SWITCHING
   ------------------------------------------------------------ */
function showOverviewView() {
  hideAllViews();
  if (U1_DOM.overviewView) U1_DOM.overviewView.hidden = false;
  updateOverviewProgress();
  // Scroll to top so the user sees the hero first
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showExerciseView() {
  hideAllViews();
  if (U1_DOM.exerciseView) U1_DOM.exerciseView.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showCompletionView() {
  hideAllViews();
  if (U1_DOM.completionView) U1_DOM.completionView.hidden = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function hideAllViews() {
  if (U1_DOM.overviewView) U1_DOM.overviewView.hidden = true;
  if (U1_DOM.exerciseView) U1_DOM.exerciseView.hidden = true;
  if (U1_DOM.completionView) U1_DOM.completionView.hidden = true;
}

/* ------------------------------------------------------------
   14. OVERVIEW PROGRESS (hero + navbar)
   ------------------------------------------------------------ */
function computeOverallProgress() {
  const ids = SECTIONS.map(s => s.id);
  const totalQuestions = ids.reduce((sum, id) => sum + QUESTIONS[id].length, 0);
  const totalPoints = totalQuestions * U1_CONFIG.pointsPerQuestion;

  const earnedPoints = ids.reduce((sum, id) => {
    const s = progress.sections[id];
    return sum + (s?.completed ? s.score : 0);
  }, 0);

  // Percentage based on answered (correct OR incorrect) — but since we
  // only record a section's score when completed, we can compute a more
  // granular number by counting 'correct' answers against total points.
  // Simpler approach that matches Duolingo feel: percentage of total
  // points earned vs total possible.
  const percent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  return { percent, earnedPoints, totalPoints, totalQuestions };
}

function updateOverviewProgress() {
  const { percent, earnedPoints } = computeOverallProgress();

  if (U1_DOM.navProgressFill) U1_DOM.navProgressFill.style.width = `${percent}%`;
  if (U1_DOM.navProgressText) U1_DOM.navProgressText.textContent = `${percent}%`;
  if (U1_DOM.unitProgressFill) U1_DOM.unitProgressFill.style.width = `${percent}%`;
  if (U1_DOM.unitProgressPercent) U1_DOM.unitProgressPercent.textContent = `${percent}%`;
  if (U1_DOM.heroXp) U1_DOM.heroXp.textContent = String(progress.xp || 0);
}

/* ------------------------------------------------------------
   15. SECTION OVERVIEW RENDERING
   ------------------------------------------------------------ */
function renderSections() {
  if (!U1_DOM.sectionsGrid) return;
  U1_DOM.sectionsGrid.innerHTML = '';

  SECTIONS.forEach(section => {
    const card = createSectionCard(section);
    U1_DOM.sectionsGrid.appendChild(card);
  });
}

function createSectionCard(section) {
  const sectionProgress = progress.sections[section.id] || { completed: false, correct: 0, score: 0, total: 0 };
  const questionCount = QUESTIONS[section.id].length;

  const card = document.createElement('article');
  card.className = 'section-card';
  card.setAttribute('data-section', section.id);
  if (sectionProgress.completed) card.classList.add('is-complete');

  // Status pill
  let statusClass = 'status-new';
  let statusLabel = u1t('section.statusNew');
  let statusIcon = '';
  if (sectionProgress.completed) {
    statusClass = 'status-done';
    statusLabel = u1t('section.statusDone');
    statusIcon = U1_ICONS.check;
  } else if (sectionProgress.correct > 0) {
    statusClass = 'status-progress';
    statusLabel = u1t('section.statusProg');
  }

  // Score badge shown only if completed
  const scoreBadge = sectionProgress.completed
    ? `<span class="section-score-badge">${sectionProgress.score} / ${sectionProgress.total}</span>`
    : '';

  const sectionName = state.lang === 'ar' ? section.nameAr : section.nameEn;
  const sectionDesc = state.lang === 'ar' ? section.descAr : section.descEn;
  const startLabel = sectionProgress.completed ? u1t('section.retake') : u1t('section.start');

  card.innerHTML = `
    <div class="section-card-top">
      <div class="section-icon" aria-hidden="true">${U1_ICONS[section.icon] || U1_ICONS.bookOpen}</div>
      <span class="section-status ${statusClass}">${statusIcon}${statusLabel}</span>
    </div>

    <div>
      <h3 class="section-name">${sectionName}</h3>
      <p class="section-desc">${sectionDesc}</p>
    </div>

    <div class="section-meta">
      <span class="section-activity-count">
        ${U1_ICONS.list}
        ${questionCount} ${u1t('section.activities')}
      </span>
      ${scoreBadge}
    </div>

    <button type="button" class="section-start-btn" data-start-section="${section.id}">
      ${startLabel}
      ${U1_ICONS.arrowRight}
    </button>
  `;

  const startBtn = card.querySelector('.section-start-btn');
  startBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    startSection(section.id);
  });

  return card;
}

/* ------------------------------------------------------------
   16. STARTING A SECTION
   ------------------------------------------------------------ */
function startSection(sectionId) {
  const questions = QUESTIONS[sectionId];
  if (!questions || questions.length === 0) return;

  // Reset per-section state
  state.currentSection = sectionId;
  state.currentQuestionIndex = 0;
  state.selectedOption = null;
  state.userText = '';
  state.answered = false;
  state.sectionAnswers = [];
  state.sectionCorrectCount = 0;
  state.sectionScorePoints = 0;

  const sectionMeta = SECTIONS.find(s => s.id === sectionId);
  const displayName = sectionMeta
    ? (state.lang === 'ar' ? sectionMeta.nameAr : sectionMeta.nameEn)
    : sectionId;

  if (U1_DOM.exerciseSectionName) U1_DOM.exerciseSectionName.textContent = displayName;
  if (U1_DOM.exerciseScore) U1_DOM.exerciseScore.textContent = '0';

  showExerciseView();
  renderReadingPassage();
  renderCurrentQuestion();
}

/* ------------------------------------------------------------
   17. READING PASSAGE (shared, only for Reading section)
   ------------------------------------------------------------ */
function renderReadingPassage() {
  if (!U1_DOM.readingPassage || !U1_DOM.readingPassageBody) return;

  const isReading = state.currentSection === 'reading';
  U1_DOM.readingPassage.hidden = !isReading;

  if (!isReading) {
    U1_DOM.readingPassageBody.innerHTML = '';
    return;
  }

  const paragraphs = READING_PASSAGE.paragraphs
    .map(p => `<p>${p}</p>`)
    .join('');
  U1_DOM.readingPassageBody.innerHTML = paragraphs;
}

/* ------------------------------------------------------------
   18. QUESTION RENDERING
   ------------------------------------------------------------ */
function renderCurrentQuestion() {
  if (!state.currentSection) return;

  const questions = QUESTIONS[state.currentSection];
  const question = questions[state.currentQuestionIndex];
  if (!question) return;

  // Reset per-question answer state
  state.selectedOption = null;
  state.userText = '';
  state.answered = false;

  // Header / progress
  updateExerciseProgress();

  // Type tag + points
  if (U1_DOM.questionTypeTag) {
    U1_DOM.questionTypeTag.textContent = typeLabel(question.type);
  }
  if (U1_DOM.questionPoints) {
    const pts = question.points ?? U1_CONFIG.pointsPerQuestion;
    const label = pts === 1 ? u1t('exercise.point') : u1t('exercise.points');
    U1_DOM.questionPoints.textContent = `${pts} ${label}`;
  }

  // Question text
  if (U1_DOM.questionText) {
    U1_DOM.questionText.textContent = question.text;
  }

  // Reset feedback
  resetFeedback();

  // Reset action buttons
  if (U1_DOM.submitAnswerBtn) {
    U1_DOM.submitAnswerBtn.disabled = true;
    U1_DOM.submitAnswerBtn.hidden = false;
    U1_DOM.submitAnswerBtn.textContent = u1t('action.submit');
  }
  if (U1_DOM.nextQuestionBtn) {
    U1_DOM.nextQuestionBtn.hidden = true;
    // Update next button label if this is the last question
    const isLast = state.currentQuestionIndex === questions.length - 1;
    U1_DOM.nextQuestionBtn.innerHTML = isLast
      ? `${u1t('action.finish')} ${U1_ICONS.check}`
      : `${u1t('action.next')} ${U1_ICONS.arrowRight}`;
  }

  // Render options OR input
  if (needsOptions(question)) {
    if (U1_DOM.questionInputArea) U1_DOM.questionInputArea.hidden = true;
    renderOptions(question);
  } else {
    if (U1_DOM.questionOptions) U1_DOM.questionOptions.innerHTML = '';
    renderTextInput(question);
  }
}

function typeLabel(type) {
  switch (type) {
    case 'multipleChoice': return u1t('type.multipleChoice');
    case 'fillBlank':      return u1t('type.fillBlank');
    case 'matching':       return u1t('type.matching');
    case 'ordering':       return u1t('type.ordering');
    case 'shortAnswer':    return u1t('type.shortAnswer');
    case 'longAnswer':     return u1t('type.longAnswer');
    default:               return u1t('type.multipleChoice');
  }
}

function needsOptions(question) {
  return question.type === 'multipleChoice'
      || question.type === 'matching'
      || question.type === 'ordering';
}

/* ------------------------------------------------------------
   19. OPTIONS RENDERING (multiple choice, matching, ordering)
   ------------------------------------------------------------ */
function renderOptions(question) {
  if (!U1_DOM.questionOptions) return;
  U1_DOM.questionOptions.innerHTML = '';

  // For 'ordering', shuffle the options so students must arrange them.
  // For other types, use the array as-is.
  const optionList = question.type === 'ordering'
    ? shuffleArray([...question.options])
    : question.options;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  optionList.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.dataset.option = option;
    btn.innerHTML = `
      <span class="option-marker">${letters[index] || index + 1}</span>
      <span class="option-text">${escapeHtml(option)}</span>
    `;
    btn.addEventListener('click', () => selectOption(btn, option));
    U1_DOM.questionOptions.appendChild(btn);
  });
}

function selectOption(btn, optionValue) {
  if (state.answered) return;

  // Deselect any previously selected
  U1_DOM.questionOptions.querySelectorAll('.option-btn').forEach(el => {
    el.classList.remove('selected');
  });

  btn.classList.add('selected');
  state.selectedOption = optionValue;

  if (U1_DOM.submitAnswerBtn) {
    U1_DOM.submitAnswerBtn.disabled = false;
  }
}

/* ------------------------------------------------------------
   20. TEXT INPUT RENDERING (fill-in / short answer)
   ------------------------------------------------------------ */
function renderTextInput(question) {
  if (!U1_DOM.questionInputArea || !U1_DOM.freeTextInput) return;

  U1_DOM.questionInputArea.hidden = false;

  const input = U1_DOM.freeTextInput;
  // Choose rows based on expected length
  input.rows = question.type === 'longAnswer' ? 4 : (question.type === 'shortAnswer' ? 2 : 1);
  input.value = '';
  input.disabled = false;
  input.placeholder = state.lang === 'ar' ? 'اكتب إجابتك هنا...' : 'Type your answer here...';

  // Remove any previous listener before adding a fresh one
  input.oninput = null;
  input.oninput = () => {
    state.userText = input.value.trim();
    if (U1_DOM.submitAnswerBtn) {
      U1_DOM.submitAnswerBtn.disabled = state.userText.length === 0;
    }
  };
}

/* ------------------------------------------------------------
   21. EXERCISE PROGRESS UPDATE
   ------------------------------------------------------------ */
function updateExerciseProgress() {
  const questions = QUESTIONS[state.currentSection];
  const total = questions.length;
  const current = state.currentQuestionIndex + 1;

  if (U1_DOM.questionCounter) {
    U1_DOM.questionCounter.textContent = `${u1t('exercise.question')} ${current} ${u1t('exercise.of')} ${total}`;
  }

  const percent = Math.round(((current - 1) / total) * 100);
  if (U1_DOM.questionProgressFill) U1_DOM.questionProgressFill.style.width = `${percent}%`;
  if (U1_DOM.questionProgressPercent) U1_DOM.questionProgressPercent.textContent = `${percent}%`;
}

/* ------------------------------------------------------------
   22. FEEDBACK RESET
   ------------------------------------------------------------ */
function resetFeedback() {
  if (!U1_DOM.questionFeedback) return;
  U1_DOM.questionFeedback.hidden = true;
  U1_DOM.questionFeedback.classList.remove('feedback-correct', 'feedback-incorrect');
  if (U1_DOM.feedbackVerdict) U1_DOM.feedbackVerdict.textContent = '';
  if (U1_DOM.feedbackExplanation) U1_DOM.feedbackExplanation.textContent = '';
  if (U1_DOM.feedbackModel) U1_DOM.feedbackModel.hidden = true;
  if (U1_DOM.feedbackModelText) U1_DOM.feedbackModelText.textContent = '';
  if (U1_DOM.feedbackIcon) U1_DOM.feedbackIcon.innerHTML = '';
}

/* ------------------------------------------------------------
   23. UTILITY HELPERS
   ------------------------------------------------------------ */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ------------------------------------------------------------
   24. LANGUAGE APPLY (partial — full handler in Part 4)
   ------------------------------------------------------------ */
function applyLanguageToUI() {
  const html = document.documentElement;
  html.setAttribute('lang', state.lang);
  html.setAttribute('dir', state.lang === 'ar' ? 'rtl' : 'ltr');

  // Switcher label
  if (U1_DOM.langCurrent) {
    U1_DOM.langCurrent.textContent = state.lang === 'ar' ? 'AR' : 'EN';
  }

  // Document title
  document.title = state.lang === 'ar'
    ? 'الوحدة ١ · التعرف عليك · مهمة الإنجليزية'
    : 'Unit 1 · Getting to Know You · English Quest';

  // Static labels present in the HTML (data-i18n style not used here)
  const backHomeText = document.querySelector('.back-home-link span');
  if (backHomeText) {
    // Keep the English label for consistency, but you could translate:
    backHomeText.textContent = u1t('nav.backHome');
  }

  const unitBadge = document.querySelector('.unit-label-badge');
  if (unitBadge) unitBadge.textContent = u1t('nav.unitLabel');

  const heroEyebrow = document.querySelector('.unit-eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = u1t('hero.eyebrow');

  const heroDesc = document.querySelector('.unit-hero-desc');
  if (heroDesc) heroDesc.textContent = u1t('hero.desc');

  // Hero meta chips
  const chips = document.querySelectorAll('.unit-hero-meta .meta-chip span');
  chips.forEach((chip, i) => {
    if (i === 0) {
      const strong = chip.querySelector('strong');
      const count = strong ? strong.textContent : '5';
      chip.innerHTML = `<strong>${count}</strong> ${u1t('hero.sections')}`;
    } else if (i === 1) {
      const strong = chip.querySelector('strong');
      const count = strong ? strong.textContent : '30';
      chip.innerHTML = `<strong>${count}</strong> ${u1t('hero.activities')}`;
    } else if (i === 2) {
      const strong = chip.querySelector('strong');
      const xp = strong ? strong.textContent : '0';
      chip.innerHTML = `<strong>${xp}</strong> ${u1t('hero.xpEarned')}`;
    }
  });

  const unitProgressLabel = document.querySelector('.unit-progress-label span:first-child');
  if (unitProgressLabel) unitProgressLabel.textContent = u1t('hero.progress');

  const sectionsTitle = document.querySelector('.sections-title');
  if (sectionsTitle) sectionsTitle.textContent = u1t('sections.title');

  const sectionsSubtitle = document.querySelector('.sections-subtitle');
  if (sectionsSubtitle) sectionsSubtitle.textContent = u1t('sections.subtitle');

  // Exercise view static labels
  if (U1_DOM.exitSectionBtn) {
    const textNode = Array.from(U1_DOM.exitSectionBtn.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.textContent = ' ' + u1t('exercise.exit');
  }

  const readingHeader = document.querySelector('.reading-passage-header span');
  if (readingHeader) readingHeader.textContent = u1t('exercise.readingTitle');

  // Rerender dynamic content that uses language
  renderSections();
  if (!U1_DOM.exerciseView.hidden && state.currentSection) {
    renderCurrentQuestion();
  }
  updateOverviewProgress();
}

/* ============================================================
   ENGLISH QUEST – UNIT 1 INTERACTIVE SCRIPT
   File: js/unit-1.js
   Part 3 of 4: Answer validation, feedback, navigation, completion
   ============================================================ */

/* ------------------------------------------------------------
   25. SUBMIT ANSWER
   ------------------------------------------------------------
   Called by the Submit button. Checks the current question,
   shows feedback, updates score state, and swaps the buttons.
   ------------------------------------------------------------ */
function submitAnswer() {
  if (!state.currentSection) return;
  if (state.answered) return; // Prevent double-submission

  const questions = QUESTIONS[state.currentSection];
  const question = questions[state.currentQuestionIndex];
  if (!question) return;

  // Guard: ensure the student actually provided something
  if (needsOptions(question) && !state.selectedOption) {
    return;
  }
  if (!needsOptions(question) && !state.userText) {
    return;
  }

  // Evaluate
  const result = evaluateAnswer(question);

  // Record it
  state.answered = true;
  state.sectionAnswers.push({
    questionId: question.id,
    correct: result.correct,
    userAnswer: result.userAnswer
  });

  if (result.correct) {
    const pts = question.points ?? U1_CONFIG.pointsPerQuestion;
    state.sectionCorrectCount += 1;
    state.sectionScorePoints += pts;

    if (U1_DOM.exerciseScore) {
      U1_DOM.exerciseScore.textContent = String(state.sectionScorePoints);
    }
  }

  // Visualise correctness on options if applicable
  if (needsOptions(question)) {
    highlightOptions(question, result.userAnswer);
  }

  // Lock input
  lockInput();

  // Show feedback
  showFeedback(result, question);

  // Swap buttons: hide submit, reveal next
  if (U1_DOM.submitAnswerBtn) U1_DOM.submitAnswerBtn.hidden = true;
  if (U1_DOM.nextQuestionBtn) {
    U1_DOM.nextQuestionBtn.hidden = false;
    U1_DOM.nextQuestionBtn.focus();
  }
}

/* ------------------------------------------------------------
   26. EVALUATE ANSWER (dispatch by type)
   ------------------------------------------------------------ */
function evaluateAnswer(question) {
  switch (question.type) {
    case 'multipleChoice':
    case 'matching':
      return evaluateExactMatch(question);
    case 'ordering':
      return evaluateOrdering(question);
    case 'fillBlank':
      return evaluateFillBlank(question);
    case 'shortAnswer':
    case 'longAnswer':
      return evaluateFreeText(question);
    default:
      return evaluateExactMatch(question);
  }
}

/* ---------- Multiple choice / matching ---------- */
function evaluateExactMatch(question) {
  const user = state.selectedOption || '';
  const expected = question.correct || '';
  const correct = normalize(user) === normalize(expected);
  return { correct, userAnswer: user };
}

/* ---------- Ordering (word arrangement) ---------- */
function evaluateOrdering(question) {
  const user = state.selectedOption || '';
  const expected = question.correct || '';
  const correct = normalize(user) === normalize(expected);
  return { correct, userAnswer: user };
}

/* ---------- Fill-in-the-blank ---------- */
function evaluateFillBlank(question) {
  const user = state.userText || '';
  const accepted = (question.acceptedAnswers || [question.correct])
    .map(normalize)
    .filter(Boolean);
  const correct = accepted.includes(normalize(user));
  return { correct, userAnswer: user };
}

/* ---------- Short/long answer (lenient) ---------- */
function evaluateFreeText(question) {
  const user = state.userText || '';
  const normUser = normalize(user);
  if (!normUser) {
    return { correct: false, userAnswer: user };
  }

  // Accept if any accepted phrase appears in the user's response.
  // This keeps automatic checking friendly for young learners.
  const acceptedList = (question.acceptedAnswers || [])
    .map(normalize)
    .filter(Boolean);

  let correct = false;
  if (acceptedList.length > 0) {
    correct = acceptedList.some(phrase => normUser.includes(phrase));
  }

  // Additional lightweight heuristics for very short answers:
  // if the user typed at least 3 words and we have a model answer,
  // treat a reasonable attempt as correct for short-answer tasks
  // where exact matching is too strict.
  if (!correct && question.type === 'shortAnswer') {
    const wordCount = user.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 3) {
      correct = true;
    }
  }

  // For long answers, require at least a small attempt length.
  if (!correct && question.type === 'longAnswer') {
    const wordCount = user.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 5) {
      correct = true;
    }
  }

  return { correct, userAnswer: user };
}

/* ------------------------------------------------------------
   27. NORMALIZATION HELPER
   ------------------------------------------------------------
   Lowercase, trim, collapse whitespace, strip punctuation.
   Used by all comparison-based evaluations.
   ------------------------------------------------------------ */
function normalize(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/[‘’']/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[.,!?;:—–\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* ------------------------------------------------------------
   28. HIGHLIGHT OPTIONS (after submit)
   ------------------------------------------------------------ */
function highlightOptions(question, userAnswer) {
  if (!U1_DOM.questionOptions) return;

  const buttons = U1_DOM.questionOptions.querySelectorAll('.option-btn');
  const expected = question.type === 'ordering'
    ? normalize(question.correct)
    : normalize(question.correct);
  const picked = normalize(userAnswer);

  buttons.forEach(btn => {
    const value = normalize(btn.dataset.option);
    btn.classList.remove('selected');

    if (value === expected) {
      btn.classList.add('correct');
    } else if (value === picked && picked !== expected) {
      btn.classList.add('incorrect');
    } else {
      btn.classList.add('dimmed');
    }

    btn.disabled = true;
  });
}

/* ------------------------------------------------------------
   29. LOCK INPUT (after submit)
   ------------------------------------------------------------ */
function lockInput() {
  if (U1_DOM.freeTextInput) {
    U1_DOM.freeTextInput.disabled = true;
  }
}

/* ------------------------------------------------------------
   30. SHOW FEEDBACK
   ------------------------------------------------------------ */
function showFeedback(result, question) {
  if (!U1_DOM.questionFeedback) return;

  U1_DOM.questionFeedback.hidden = false;
  U1_DOM.questionFeedback.classList.remove('feedback-correct', 'feedback-incorrect');

  if (result.correct) {
    U1_DOM.questionFeedback.classList.add('feedback-correct');
    if (U1_DOM.feedbackIcon) U1_DOM.feedbackIcon.innerHTML = U1_ICONS.check;
    if (U1_DOM.feedbackVerdict) U1_DOM.feedbackVerdict.textContent = u1t('feedback.correct');
  } else {
    U1_DOM.questionFeedback.classList.add('feedback-incorrect');
    if (U1_DOM.feedbackIcon) U1_DOM.feedbackIcon.innerHTML = U1_ICONS.close;
    if (U1_DOM.feedbackVerdict) U1_DOM.feedbackVerdict.textContent = u1t('feedback.incorrect');
  }

  // Explanation
  if (U1_DOM.feedbackExplanation) {
    U1_DOM.feedbackExplanation.textContent = question.explanation || '';
  }

  // Model answer — shown for free-text types, or when the student was wrong
  const showModel = Boolean(question.modelAnswer) && (!result.correct || !needsOptions(question));
  if (U1_DOM.feedbackModel && U1_DOM.feedbackModelText) {
    if (showModel) {
      U1_DOM.feedbackModel.hidden = false;
      U1_DOM.feedbackModel.querySelector('.model-label').textContent = u1t('feedback.modelAnswer') + ':';
      U1_DOM.feedbackModelText.textContent = question.modelAnswer;
    } else {
      U1_DOM.feedbackModel.hidden = true;
    }
  }
}

/* ------------------------------------------------------------
   31. NEXT QUESTION / FINISH SECTION
   ------------------------------------------------------------ */
function goToNextQuestion() {
  if (!state.currentSection) return;

  const questions = QUESTIONS[state.currentSection];
  const isLast = state.currentQuestionIndex >= questions.length - 1;

  if (isLast) {
    finishSection();
    return;
  }

  state.currentQuestionIndex += 1;
  state.answered = false;
  state.selectedOption = null;
  state.userText = '';
  renderCurrentQuestion();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ------------------------------------------------------------
   32. FINISH SECTION
   ------------------------------------------------------------
   Saves progress to localStorage, updates the global progress
   object, then shows the completion view.
   ------------------------------------------------------------ */
function finishSection() {
  if (!state.currentSection) return;

  const sectionId = state.currentSection;
  const questions = QUESTIONS[sectionId];
  const totalPoints = questions.reduce(
    (sum, q) => sum + (q.points ?? U1_CONFIG.pointsPerQuestion),
    0
  );

  // Save section result
  progress.sections[sectionId] = {
    completed: true,
    score: state.sectionScorePoints,
    total: totalPoints,
    correct: state.sectionCorrectCount
  };

  // Recalculate XP as the sum of all completed section scores
  progress.xp = SECTIONS.reduce((sum, sec) => {
    const s = progress.sections[sec.id];
    return sum + (s?.completed ? s.score : 0);
  }, 0);

  saveProgress(progress);

  // Render completion screen
  renderCompletionView(sectionId);
  showCompletionView();
  updateOverviewProgress();
}

/* ------------------------------------------------------------
   33. RENDER COMPLETION VIEW
   ------------------------------------------------------------ */
function renderCompletionView(sectionId) {
  const sectionMeta = SECTIONS.find(s => s.id === sectionId);
  const displayName = sectionMeta
    ? (state.lang === 'ar' ? sectionMeta.nameAr : sectionMeta.nameEn)
    : sectionId;

  const questions = QUESTIONS[sectionId];
  const totalPoints = questions.reduce(
    (sum, q) => sum + (q.points ?? U1_CONFIG.pointsPerQuestion),
    0
  );
  const incorrectCount = questions.length - state.sectionCorrectCount;

  // Subtitle
  if (U1_DOM.completionSubtitle) {
    U1_DOM.completionSubtitle.textContent = u1Format(
      u1t('completion.subtitle'),
      { section: displayName }
    );
  }

  // Score value
  if (U1_DOM.completionScoreValue) {
    U1_DOM.completionScoreValue.textContent = `${state.sectionScorePoints} / ${totalPoints}`;
  }

  // Correct / incorrect counts
  if (U1_DOM.completionCorrect) {
    U1_DOM.completionCorrect.textContent = String(state.sectionCorrectCount);
  }
  if (U1_DOM.completionIncorrect) {
    U1_DOM.completionIncorrect.textContent = String(incorrectCount);
  }

  // Retry and Back button labels
  if (U1_DOM.retrySectionBtn) {
    U1_DOM.retrySectionBtn.innerHTML =
      `${U1_ICONS.refresh} ${u1t('action.retry')}`;
  }
  if (U1_DOM.backToUnitBtn) {
    U1_DOM.backToUnitBtn.innerHTML =
      ` ${u1t('action.backToUnit')}`;
  }
}

/* ------------------------------------------------------------
   34. RETRY SECTION
   ------------------------------------------------------------
   Restarts the current section from question 1. Does NOT erase
   the previously saved score from localStorage — the new run
   will overwrite the section record when it finishes.
   ------------------------------------------------------------ */
function retryCurrentSection() {
  if (!state.currentSection) {
    showOverviewView();
    return;
  }
  startSection(state.currentSection);
}

/* ------------------------------------------------------------
   35. EXIT SECTION
   ------------------------------------------------------------
   Returns to overview without saving progress. The student can
   resume the section later, but nothing is written to storage
   until they finish it.
   ------------------------------------------------------------ */
function exitSection() {
  state.currentSection = null;
  state.currentQuestionIndex = 0;
  state.selectedOption = null;
  state.userText = '';
  state.answered = false;
  state.sectionAnswers = [];
  state.sectionCorrectCount = 0;
  state.sectionScorePoints = 0;

  showOverviewView();
}

/* ------------------------------------------------------------
   36. BACK TO UNIT (from completion view)
   ------------------------------------------------------------ */
function backToUnit() {
  state.currentSection = null;
  state.currentQuestionIndex = 0;
  state.sectionAnswers = [];
  state.sectionCorrectCount = 0;
  state.sectionScorePoints = 0;

  showOverviewView();
  // Re-render sections so completed badge/score appears immediately
  renderSections();
}

/* ============================================================
   ENGLISH QUEST – UNIT 1 INTERACTIVE SCRIPT
   File: js/unit-1.js
   Part 4 of 4: Event listeners, language switching, initialization
   ============================================================ */

/* ------------------------------------------------------------
   37. EVENT WIRING – EXERCISE VIEW BUTTONS
   ------------------------------------------------------------ */
function initExerciseButtons() {
  // Submit Answer
  if (U1_DOM.submitAnswerBtn) {
    U1_DOM.submitAnswerBtn.addEventListener('click', (event) => {
      event.preventDefault();
      submitAnswer();
    });
  }

  // Next Question / Finish Section
  if (U1_DOM.nextQuestionBtn) {
    U1_DOM.nextQuestionBtn.addEventListener('click', (event) => {
      event.preventDefault();
      goToNextQuestion();
    });
  }

  // Exit Section
  if (U1_DOM.exitSectionBtn) {
    U1_DOM.exitSectionBtn.addEventListener('click', (event) => {
      event.preventDefault();
      exitSection();
    });
  }
}

/* ------------------------------------------------------------
   38. EVENT WIRING – COMPLETION VIEW BUTTONS
   ------------------------------------------------------------ */
function initCompletionButtons() {
  if (U1_DOM.retrySectionBtn) {
    U1_DOM.retrySectionBtn.addEventListener('click', (event) => {
      event.preventDefault();
      retryCurrentSection();
    });
  }

  if (U1_DOM.backToUnitBtn) {
    U1_DOM.backToUnitBtn.addEventListener('click', (event) => {
      event.preventDefault();
      backToUnit();
    });
  }
}

/* ------------------------------------------------------------
   39. EVENT WIRING – LANGUAGE SWITCHER
   ------------------------------------------------------------
   Toggles between English and Arabic, updates the whole UI
   instantly (no reload), persists the choice to localStorage
   using the same key as the homepage so both pages stay in sync.
   ------------------------------------------------------------ */
function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'ar' : 'en';
  saveLanguage(state.lang);
  applyLanguageToUI();

  // If the exercise view is open, refresh the current question
  // so labels (Submit, Next, etc.) re-translate correctly.
  if (state.currentSection && U1_DOM.exerciseView && !U1_DOM.exerciseView.hidden) {
    refreshCurrentQuestionLabels();
  }

  // If the completion view is open, re-render its labels.
  if (U1_DOM.completionView && !U1_DOM.completionView.hidden && state.currentSection) {
    renderCompletionView(state.currentSection);
  }
}

/* ------------------------------------------------------------
   40. REFRESH CURRENT QUESTION LABELS (on language change)
   ------------------------------------------------------------
   When language changes mid-question, we don't want to reset
   the student's typed/selected answer. So we only update labels
   and progress text.
   ------------------------------------------------------------ */
function refreshCurrentQuestionLabels() {
  const questions = QUESTIONS[state.currentSection];
  const question = questions[state.currentQuestionIndex];
  if (!question) return;

  // Update type tag + points label
  if (U1_DOM.questionTypeTag) {
    U1_DOM.questionTypeTag.textContent = typeLabel(question.type);
  }
  if (U1_DOM.questionPoints) {
    const pts = question.points ?? U1_CONFIG.pointsPerQuestion;
    const label = pts === 1 ? u1t('exercise.point') : u1t('exercise.points');
    U1_DOM.questionPoints.textContent = `${pts} ${label}`;
  }

  // Update progress counter
  updateExerciseProgress();

  // Update free-text placeholder if visible
  if (U1_DOM.freeTextInput && !U1_DOM.questionInputArea.hidden) {
    U1_DOM.freeTextInput.placeholder =
      state.lang === 'ar' ? 'اكتب إجابتك هنا...' : 'Type your answer here...';
  }

  // Update action button labels
  if (U1_DOM.submitAnswerBtn) {
    if (U1_DOM.submitAnswerBtn.hidden) {
      // Feedback is visible — Submit is hidden, so just refresh Next
    } else {
      U1_DOM.submitAnswerBtn.textContent = u1t('action.submit');
    }
  }

  if (U1_DOM.nextQuestionBtn && !U1_DOM.nextQuestionBtn.hidden) {
    const isLast = state.currentQuestionIndex >= questions.length - 1;
    U1_DOM.nextQuestionBtn.innerHTML = isLast
      ? `${u1t('action.finish')} ${U1_ICONS.check}`
      : `${u1t('action.next')} ${U1_ICONS.arrowRight}`;
  }

  // Update the feedback panel text if currently visible
  if (U1_DOM.questionFeedback && !U1_DOM.questionFeedback.hidden) {
    const verdict = U1_DOM.feedbackVerdict;
    const isCorrect = U1_DOM.questionFeedback.classList.contains('feedback-correct');
    if (verdict) {
      verdict.textContent = isCorrect
        ? u1t('feedback.correct')
        : u1t('feedback.incorrect');
    }
    // Model answer label
    const modelLabel = U1_DOM.feedbackModel?.querySelector('.model-label');
    if (modelLabel) {
      modelLabel.textContent = u1t('feedback.modelAnswer') + ':';
    }
  }

  // Update exit button label
  if (U1_DOM.exitSectionBtn) {
    const textNode = Array.from(U1_DOM.exitSectionBtn.childNodes).find(
      n => n.nodeType === Node.TEXT_NODE
    );
    if (textNode) textNode.textContent = ' ' + u1t('exercise.exit');
  }

  // Update reading passage header
  const readingHeader = document.querySelector('.reading-passage-header span');
  if (readingHeader) readingHeader.textContent = u1t('exercise.readingTitle');

  // Update exercise section name
  const sectionMeta = SECTIONS.find(s => s.id === state.currentSection);
  if (sectionMeta && U1_DOM.exerciseSectionName) {
    U1_DOM.exerciseSectionName.textContent =
      state.lang === 'ar' ? sectionMeta.nameAr : sectionMeta.nameEn;
  }
}

/* ------------------------------------------------------------
   41. LANGUAGE SWITCHER INIT
   ------------------------------------------------------------ */
function initLanguageSwitcher() {
  if (U1_DOM.langSwitcher) {
    U1_DOM.langSwitcher.addEventListener('click', (event) => {
      event.preventDefault();
      toggleLanguage();
    });
  }
}

/* ------------------------------------------------------------
   42. KEYBOARD SUPPORT
   ------------------------------------------------------------
   - Enter on an option button selects and submits it
   - Enter inside the textarea (with Ctrl/Cmd) submits
   - Number keys 1–4 select options quickly
   - Escape closes the exercise view (back to overview)
   ------------------------------------------------------------ */
function initKeyboardSupport() {
  document.addEventListener('keydown', (event) => {
    // Only respond when exercise view is active
    const inExercise =
      U1_DOM.exerciseView && !U1_DOM.exerciseView.hidden;
    if (!inExercise) return;

    // Escape → exit section
    if (event.key === 'Escape') {
      event.preventDefault();
      exitSection();
      return;
    }

    // Enter with Ctrl/Cmd in textarea submits
    if (
      event.key === 'Enter' &&
      (event.ctrlKey || event.metaKey) &&
      document.activeElement === U1_DOM.freeTextInput
    ) {
      event.preventDefault();
      if (U1_DOM.submitAnswerBtn && !U1_DOM.submitAnswerBtn.disabled && !state.answered) {
        submitAnswer();
      }
      return;
    }

    // Number keys 1–6 select options if focus is not in an input
    if (/^[1-6]$/.test(event.key) && !state.answered) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) {
        return;
      }
      const buttons = U1_DOM.questionOptions?.querySelectorAll('.option-btn');
      if (!buttons || buttons.length === 0) return;
      const idx = parseInt(event.key, 10) - 1;
      if (buttons[idx]) {
        buttons[idx].click();
      }
    }
  });
}

/* ------------------------------------------------------------
   43. HANDLE HOMEPAGE UNIT-CARD LANGUAGE HANDOFF
   ------------------------------------------------------------
   The homepage stores language in 'englishQuestLang'. Unit 1
   reads that same key on load, so students who chose Arabic
   on the homepage arrive here already in Arabic. Nothing extra
   to do here — the initial applyLanguageToUI() handles it.
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   44. INITIAL BOOTSTRAP
   ------------------------------------------------------------ */
function initUnit1() {
  // 1. Load language (from shared localStorage key)
  state.lang = loadSavedLanguage();

  // 2. Apply language to the whole UI (sets html lang/dir,
  //    translates every static label, renders section cards)
  applyLanguageToUI();

  // 3. Render the sections grid
  renderSections();

  // 4. Update the hero/navbar progress from saved data
  updateOverviewProgress();

  // 5. Wire all buttons
  initExerciseButtons();
  initCompletionButtons();
  initLanguageSwitcher();

  // 6. Add keyboard support
  initKeyboardSupport();

  // 7. Ensure only the overview view is visible on load
  showOverviewView();

  // 8. Smooth-scroll the "Back to Home" link so it behaves
  //    nicely even if it's tapped from a scrolled position
  const backLink = document.querySelector('.back-home-link');
  if (backLink) {
    backLink.addEventListener('click', () => {
      // Actual navigation is default (href to index.html) — no
      // preventDefault needed. This listener is reserved for
      // future analytics or transition effects.
    });
  }
}

/* ------------------------------------------------------------
   45. DOM READY
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', initUnit1);

/* ------------------------------------------------------------
   46. OPTIONAL: HARD REFRESH OF LANGUAGE FROM STORAGE
   ------------------------------------------------------------
   If a user has multiple tabs open and switches language on the
   homepage in one tab, this listener keeps Unit 1 in sync the
   next time the tab becomes visible.
   ------------------------------------------------------------ */
window.addEventListener('focus', () => {
  const storedLang = loadSavedLanguage();
  if (storedLang !== state.lang) {
    state.lang = storedLang;
    applyLanguageToUI();
    if (state.currentSection && U1_DOM.exerciseView && !U1_DOM.exerciseView.hidden) {
      refreshCurrentQuestionLabels();
    }
    if (U1_DOM.completionView && !U1_DOM.completionView.hidden && state.currentSection) {
      renderCompletionView(state.currentSection);
    }
  }
});

/* ============================================================
   END OF FILE
   ============================================================ */
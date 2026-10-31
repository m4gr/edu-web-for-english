'use strict';

window.UNIT_1_TRANSLATIONS = {

  common: {
    nav: {
      backHome:      { en: 'Back to Home',    ar: 'العودة للرئيسية' },
      unitLabel:     { en: 'Unit 1',          ar: 'الوحدة ١' },
      progressLabel: { en: 'Unit Progress',   ar: 'تقدم الوحدة' }
    },
    exercise: {
      exit:         { en: 'Exit Section',    ar: 'الخروج من القسم' },
      question:     { en: 'Question',        ar: 'السؤال' },
      of:           { en: 'of',              ar: 'من' },
      points:       { en: 'points',          ar: 'نقاط' },
      point:        { en: 'point',           ar: 'نقطة' },
      readingTitle: { en: 'Reading Passage', ar: 'قطعة القراءة' }
    },
    type: {
      multipleChoice: { en: 'Multiple Choice',       ar: 'اختيار من متعدد' },
      fillBlank:      { en: 'Complete the Sentence', ar: 'أكمل الجملة' },
      matching:       { en: 'Choose the Meaning',    ar: 'اختر المعنى' },
      ordering:       { en: 'Arrange the Sentence',  ar: 'رتّب الجملة' },
      shortAnswer:    { en: 'Short Answer',          ar: 'إجابة قصيرة' },
      longAnswer:     { en: 'Writing',               ar: 'كتابة' }
    },
    action: {
      submit:     { en: 'Submit Answer',  ar: 'تحقق من الإجابة' },
      next:       { en: 'Next Question',  ar: 'السؤال التالي' },
      finish:     { en: 'Finish Section', ar: 'إنهاء القسم' },
      retry:      { en: 'Retry Section',  ar: 'إعادة القسم' },
      backToUnit: { en: 'Back to Unit',   ar: 'العودة للوحدة' }
    },
    feedback: {
      correct:     { en: 'Correct!',        ar: 'إجابة صحيحة!' },
      incorrect:   { en: 'Not quite right', ar: 'ليست صحيحة تماماً' },
      modelAnswer: { en: 'Model answer',    ar: 'إجابة نموذجية' },
      noAnswer:    { en: 'Please type an answer first.', ar: 'يرجى كتابة إجابة أولاً.' }
    },
    completion: {
      title:      { en: 'Great Job!',    ar: 'عمل رائع!' },
      subtitle:   { en: 'You completed {section}!', ar: 'لقد أكملت قسم {section}!' },
      scoreLabel: { en: 'Your Score',    ar: 'نتيجتك' },
      correct:    { en: 'Correct',       ar: 'صحيحة' },
      incorrect:  { en: 'Incorrect',     ar: 'خاطئة' }
    },
    status: {
      new:      { en: 'Not started', ar: 'لم يبدأ' },
      progress: { en: 'In progress', ar: 'قيد التقدم' },
      done:     { en: 'Completed',   ar: 'مكتمل' }
    },
    start: {
      practice: { en: 'Start Practice', ar: 'ابدأ التدريب' },
      retake:   { en: 'Practice Again', ar: 'تدرب مجدداً' }
    },
    section: {
      activities: { en: 'activities', ar: 'أنشطة' }
    }
  },

  hero: {
    eyebrow:          { en: 'UNIT 01',                  ar: 'الوحدة ٠١' },
    title:            { en: 'Getting to Know You',      ar: 'Getting to Know You' },
    desc:             {
      en: "Let's improve your English skills through fun and interactive activities!",
      ar: 'لنحسّن مهاراتك في اللغة الإنجليزية من خلال أنشطة ممتعة وتفاعلية!'
    },
    sections:         { en: 'Sections',                 ar: 'أقسام' },
    activities:       { en: 'Activities',               ar: 'أنشطة' },
    xpEarned:         { en: 'XP earned',                ar: 'نقطة خبرة' },
    progress:         { en: 'Unit Progress',            ar: 'تقدم الوحدة' },
    sectionsTitle:    { en: 'Learning Sections',        ar: 'أقسام التعلم' },
    sectionsSubtitle: { en: 'Pick a section and start practicing!', ar: 'اختر قسماً وابدأ التدريب!' }
  },

  grammar: {
    name: { en: 'Grammar', ar: 'القواعد' },
    desc: { en: 'Practice present simple, present continuous, and past simple tenses.', ar: 'تدرّب على المضارع البسيط والمضارع المستمر والماضي البسيط.' },

    q1: {
      text:        { en: 'She _____ to school every day.', ar: 'She _____ to school every day.' },
      options:     { en: ['go', 'goes', 'going', 'went'], ar: ['go', 'goes', 'going', 'went'] },
      correct:     { en: 'goes', ar: 'goes' },
      explanation: {
        en: 'With "she" (third person singular), we add -es to the verb in the present simple.',
        ar: 'مع "she" (المفرد الغائب) نضيف -es للفعل في المضارع البسيط.'
      }
    },
    q2: {
      text:        { en: 'Look! The children _____ in the garden right now.', ar: 'Look! The children _____ in the garden right now.' },
      options:     { en: ['play', 'plays', 'are playing', 'played'], ar: ['play', 'plays', 'are playing', 'played'] },
      correct:     { en: 'are playing', ar: 'are playing' },
      explanation: {
        en: 'We use the present continuous (are + -ing) for actions happening right now.',
        ar: 'نستخدم المضارع المستمر (are + -ing) للأفعال التي تحدث الآن.'
      }
    },
    q3: {
      text:        { en: 'Yesterday, I _____ my grandmother at her house.', ar: 'Yesterday, I _____ my grandmother at her house.' },
      options:     { en: ['visit', 'visits', 'am visiting', 'visited'], ar: ['visit', 'visits', 'am visiting', 'visited'] },
      correct:     { en: 'visited', ar: 'visited' },
      explanation: {
        en: '"Yesterday" signals the past simple, so we use the -ed form "visited".',
        ar: 'كلمة "Yesterday" تدل على الماضي البسيط، لذا نستخدم الشكل "visited".'
      }
    },
    q4: {
      text:        { en: 'My brother and I _____ football every Friday.', ar: 'My brother and I _____ football every Friday.' },
      options:     { en: ['plays', 'play', 'is playing', 'are play'], ar: ['plays', 'play', 'is playing', 'are play'] },
      correct:     { en: 'play', ar: 'play' },
      explanation: {
        en: 'With plural subjects like "my brother and I", the verb is "play" (no -s).',
        ar: 'مع الفاعل الجمع مثل "my brother and I" نستخدم "play" بدون -s.'
      }
    },
    q5: {
      text:        { en: 'That is _____ book. Please give it to her.', ar: 'That is _____ book. Please give it to her.' },
      options:     { en: ['she', 'her', 'hers', 'she’s'], ar: ['she', 'her', 'hers', 'she’s'] },
      correct:     { en: 'her', ar: 'her' },
      explanation: {
        en: 'Before a noun we use a possessive adjective: her book.',
        ar: 'قبل الاسم نستخدم صفة الملكية: her book.'
      }
    },
    q6: {
      text:        { en: '_____ you like ice cream?', ar: '_____ you like ice cream?' },
      options:     { en: ['Are', 'Do', 'Does', 'Is'], ar: ['Are', 'Do', 'Does', 'Is'] },
      correct:     { en: 'Do', ar: 'Do' },
      explanation: {
        en: 'For the present simple question with "you", we use "Do" + base verb.',
        ar: 'للسؤال في المضارع البسيط مع "you" نستخدم "Do" + الفعل الأساسي.'
      }
    }
  },

  vocabulary: {
    name: { en: 'Vocabulary', ar: 'المفردات' },
    desc: { en: 'Learn words about countries, daily activities, places, and jobs.', ar: 'تعلّم كلمات عن البلدان والأنشطة اليومية والأماكن والمهن.' },

    q1: {
      text:        { en: 'Which word means "a person from Japan"?', ar: 'Which word means "a person from Japan"?' },
      options:     { en: ['Japanese', 'Japan', 'Japany', 'Japanner'], ar: ['Japanese', 'Japan', 'Japany', 'Japanner'] },
      correct:     { en: 'Japanese', ar: 'Japanese' },
      explanation: {
        en: 'The nationality for someone from Japan is "Japanese".',
        ar: 'الجنسية لمن هو من اليابان هي "Japanese".'
      }
    },
    q2: {
      text:        { en: 'Choose the place where we borrow books:', ar: 'Choose the place where we borrow books:' },
      options:     { en: ['library', 'hospital', 'bakery', 'market'], ar: ['library', 'hospital', 'bakery', 'market'] },
      correct:     { en: 'library', ar: 'library' },
      explanation: {
        en: 'A library is where people borrow or read books.',
        ar: 'المكتبة (library) هي المكان الذي يستعير فيه الناس الكتب أو يقرؤونها.'
      }
    },
    q3: {
      text:        { en: 'A person who treats sick people is a _____.', ar: 'A person who treats sick people is a _____.' },
      options:     { en: ['teacher', 'doctor', 'driver', 'farmer'], ar: ['teacher', 'doctor', 'driver', 'farmer'] },
      correct:     { en: 'doctor', ar: 'doctor' },
      explanation: {
        en: 'A doctor helps people who are sick.',
        ar: 'الطبيب (doctor) يساعد المرضى.'
      }
    },
    q4: {
      text: {
        en: 'Choose the correct meaning of "hobby":',
        ar: 'Choose the correct meaning of "hobby":'
      },
      options: {
        en: [
          'Something you do for fun in your free time',
          'A job you do for money',
          'A place you visit every day',
          'A type of food'
        ],
        ar: [
          'Something you do for fun in your free time',
          'A job you do for money',
          'A place you visit every day',
          'A type of food'
        ]
      },
      correct: {
        en: 'Something you do for fun in your free time',
        ar: 'Something you do for fun in your free time'
      },
      explanation: {
        en: 'A hobby is an activity you enjoy doing in your free time (like reading, drawing, or playing football).',
        ar: 'الهواية (hobby) هي نشاط تستمتع به في وقت فراغك مثل القراءة أو الرسم أو لعب كرة القدم.'
      }
    },
    q5: {
      text:        { en: 'Complete the sentence: "I brush my _____ every morning."', ar: 'Complete the sentence: "I brush my _____ every morning."' },
      options:     { en: ['shoes', 'teeth', 'hair', 'hands'], ar: ['shoes', 'teeth', 'hair', 'hands'] },
      correct:     { en: 'teeth', ar: 'teeth' },
      explanation: {
        en: 'We "brush our teeth" with a toothbrush and toothpaste.',
        ar: 'نقول "brush our teeth" أي ننظف أسناننا بالفرشاة والمعجون.'
      }
    },
    q6: {
      text:        { en: 'Choose the word that describes a very cold season:', ar: 'Choose the word that describes a very cold season:' },
      options:     { en: ['summer', 'winter', 'spring', 'autumn'], ar: ['summer', 'winter', 'spring', 'autumn'] },
      correct:     { en: 'winter', ar: 'winter' },
      explanation: {
        en: 'Winter is the coldest season of the year.',
        ar: 'الشتاء (winter) هو أبرد فصل في السنة.'
      }
    }
  },

  speaking: {
    name: { en: 'Speaking', ar: 'المحادثة' },
    desc: { en: 'Choose the right response and build natural English sentences.', ar: 'اختر الرد المناسب وكوّن جملاً إنجليزية طبيعية.' },

    q1: {
      text:        { en: 'A: "Hello! What\'s your name?" — B: "_____"', ar: 'A: "Hello! What\'s your name?" — B: "_____"' },
      options:     { en: ['I am fine, thank you.', 'My name is Omar.', 'Yes, I do.', 'Goodbye!'], ar: ['I am fine, thank you.', 'My name is Omar.', 'Yes, I do.', 'Goodbye!'] },
      correct:     { en: 'My name is Omar.', ar: 'My name is Omar.' },
      explanation: {
        en: 'When someone asks "What\'s your name?", you answer with your name.',
        ar: 'عندما يسأل أحدهم "What\'s your name?" تجيب باسمك.'
      }
    },
    q2: {
      text:        { en: 'A: "How are you today?" — B: "_____"', ar: 'A: "How are you today?" — B: "_____"' },
      options:     { en: ['I am twelve years old.', 'I am from Egypt.', 'I am fine, thank you!', 'Yes, please.'], ar: ['I am twelve years old.', 'I am from Egypt.', 'I am fine, thank you!', 'Yes, please.'] },
      correct:     { en: 'I am fine, thank you!', ar: 'I am fine, thank you!' },
      explanation: {
        en: 'The natural answer to "How are you?" is "I am fine, thank you!"',
        ar: 'الرد الطبيعي على "How are you?" هو "I am fine, thank you!"'
      }
    },
    q3: {
      text:        { en: 'A: "Where are you from?" — B: "_____"', ar: 'A: "Where are you from?" — B: "_____"' },
      options:     { en: ['I am from Saudi Arabia.', 'I am fine.', 'My name is Ali.', 'I am eleven.'], ar: ['I am from Saudi Arabia.', 'I am fine.', 'My name is Ali.', 'I am eleven.'] },
      correct:     { en: 'I am from Saudi Arabia.', ar: 'I am from Saudi Arabia.' },
      explanation: {
        en: 'When asked where you are from, answer with your country.',
        ar: 'عندما يُسأل من أين أنت، أجب باسم بلدك.'
      }
    },
        q4: {
      text: {
        en: 'A: "I\'m from Egypt. Where are you from?" — B: "_____"',
        ar: 'A: "I\'m from Egypt. Where are you from?" — B: "_____"'
      },
      options: {
        en: [
          'I am from Saudi Arabia.',
          'I am twelve years old.',
          'Yes, I do.',
          'Thank you very much.'
        ],
        ar: [
          'I am from Saudi Arabia.',
          'I am twelve years old.',
          'Yes, I do.',
          'Thank you very much.'
        ]
      },
      correct: { en: 'I am from Saudi Arabia.', ar: 'I am from Saudi Arabia.' },
      explanation: {
        en: 'When someone tells you where they are from and asks you the same question, you reply with your own country.',
        ar: 'عندما يخبرك أحدهم من أين هو ويسألك نفس السؤال، تجيب باسم بلدك.'
      }
    },

    q5: {
      text: {
        en: 'A: "Do you have any brothers or sisters?" — B: "_____"',
        ar: 'A: "Do you have any brothers or sisters?" — B: "_____"'
      },
      options: {
        en: [
          'Yes, I have one brother and two sisters.',
          'I am from Jordan.',
          'My name is Layla.',
          'Nice to meet you.'
        ],
        ar: [
          'Yes, I have one brother and two sisters.',
          'I am from Jordan.',
          'My name is Layla.',
          'Nice to meet you.'
        ]
      },
      correct: {
        en: 'Yes, I have one brother and two sisters.',
        ar: 'Yes, I have one brother and two sisters.'
      },
      explanation: {
        en: 'When someone asks about your family, the natural answer is "Yes, I have..." or "No, I don\'t have..." — followed by details.',
        ar: 'عندما يسأل أحدهم عن عائلتك، الإجابة الطبيعية هي "Yes, I have..." أو "No, I don\'t have..." مع التفاصيل.'
      }
    },
    q6: {
      text:        { en: 'A: "Nice to meet you!" — B: "_____"', ar: 'A: "Nice to meet you!" — B: "_____"' },
      options:     { en: ['Nice to meet you too!', 'I am sorry.', 'No, thank you.', 'See you yesterday.'], ar: ['Nice to meet you too!', 'I am sorry.', 'No, thank you.', 'See you yesterday.'] },
      correct:     { en: 'Nice to meet you too!', ar: 'Nice to meet you too!' },
      explanation: {
        en: 'The polite reply to "Nice to meet you!" is "Nice to meet you too!"',
        ar: 'الرد المهذب على "Nice to meet you!" هو "Nice to meet you too!"'
      }
    }
  },

  reading: {
    name: { en: 'Reading', ar: 'القراءة' },
    desc: { en: 'Read a short passage about a new friend and answer questions.', ar: 'اقرأ قطعة قصيرة عن صديق جديد وأجب عن الأسئلة.' },

    passage: {
      en: [
        'Hello! My name is Sara. I am eleven years old, and I live in Cairo, Egypt. I have a big family: my father, my mother, my two brothers, and my little sister. My father is a doctor, and my mother is a teacher. She teaches English at a primary school.',
        'I go to school from Sunday to Thursday. My favourite subject is science because I love learning about animals. After school, I usually play football with my brothers in the garden. On Fridays, we visit my grandmother and eat a big lunch together.',
        'Last weekend, I met a new friend. Her name is Lina, and she is from Jordan. She speaks Arabic and a little English. We played a game and laughed a lot. I think Lina will be a very good friend!'
      ],
      ar: [
        'Hello! My name is Sara. I am eleven years old, and I live in Cairo, Egypt. I have a big family: my father, my mother, my two brothers, and my little sister. My father is a doctor, and my mother is a teacher. She teaches English at a primary school.',
        'I go to school from Sunday to Thursday. My favourite subject is science because I love learning about animals. After school, I usually play football with my brothers in the garden. On Fridays, we visit my grandmother and eat a big lunch together.',
        'Last weekend, I met a new friend. Her name is Lina, and she is from Jordan. She speaks Arabic and a little English. We played a game and laughed a lot. I think Lina will be a very good friend!'
      ]
    },

    q1: {
      text:        { en: 'How old is Sara?', ar: 'How old is Sara?' },
      options:     { en: ['ten', 'eleven', 'twelve', 'thirteen'], ar: ['ten', 'eleven', 'twelve', 'thirteen'] },
      correct:     { en: 'eleven', ar: 'eleven' },
      explanation: {
        en: 'The passage says: "I am eleven years old."',
        ar: 'القطعة تقول: "I am eleven years old."'
      }
    },
    q2: {
      text:        { en: 'What does Sara\'s mother do?', ar: 'What does Sara\'s mother do?' },
      options:     { en: ['She is a doctor.', 'She is a teacher.', 'She is a nurse.', 'She is a farmer.'], ar: ['She is a doctor.', 'She is a teacher.', 'She is a nurse.', 'She is a farmer.'] },
      correct:     { en: 'She is a teacher.', ar: 'She is a teacher.' },
      explanation: {
        en: 'The passage says: "My mother is a teacher. She teaches English at a primary school."',
        ar: 'القطعة تقول: "My mother is a teacher. She teaches English at a primary school."'
      }
    },
    q3: {
      text:        { en: 'Which subject does Sara like best?', ar: 'Which subject does Sara like best?' },
      options:     { en: ['English', 'Maths', 'Science', 'Art'], ar: ['English', 'Maths', 'Science', 'Art'] },
      correct:     { en: 'Science', ar: 'Science' },
      explanation: {
        en: 'Sara says: "My favourite subject is science because I love learning about animals."',
        ar: 'سارة تقول: "My favourite subject is science because I love learning about animals."'
      }
    },
    q4: {
      text:        { en: 'Where is Lina from?', ar: 'Where is Lina from?' },
      options:     { en: ['Egypt', 'Jordan', 'Saudi Arabia', 'Lebanon'], ar: ['Egypt', 'Jordan', 'Saudi Arabia', 'Lebanon'] },
      correct:     { en: 'Jordan', ar: 'Jordan' },
      explanation: {
        en: 'The passage says: "Her name is Lina, and she is from Jordan."',
        ar: 'القطعة تقول: "Her name is Lina, and she is from Jordan."'
      }
    },
    q5: {
      text: {
        en: 'What does the word "primary" mean in the passage?',
        ar: 'What does the word "primary" mean in the passage?'
      },
      options: {
        en: [
          'Related to the first years of school',
          'Very old',
          'Very expensive',
          'Related to sports'
        ],
        ar: [
          'Related to the first years of school',
          'Very old',
          'Very expensive',
          'Related to sports'
        ]
      },
      correct: {
        en: 'Related to the first years of school',
        ar: 'Related to the first years of school'
      },
      explanation: {
        en: 'A "primary school" is a school for young children in their first years of education.',
        ar: 'المدرسة الابتدائية (primary school) هي مدرسة للأطفال الصغار في سنواتهم الأولى من التعليم.'
      }
    },
    q6: {
      text: { en: 'What is the main idea of the passage?', ar: 'What is the main idea of the passage?' },
      options: {
        en: [
          'Sara introduces herself and talks about her life and new friend.',
          'Sara explains how to cook a big lunch.',
          'Sara describes a football match in Cairo.',
          'Sara talks about her favourite animals.'
        ],
        ar: [
          'Sara introduces herself and talks about her life and new friend.',
          'Sara explains how to cook a big lunch.',
          'Sara describes a football match in Cairo.',
          'Sara talks about her favourite animals.'
        ]
      },
      correct: {
        en: 'Sara introduces herself and talks about her life and new friend.',
        ar: 'Sara introduces herself and talks about her life and new friend.'
      },
      explanation: {
        en: 'The passage introduces Sara, her family, school life, and her new friend Lina.',
        ar: 'القطعة تعرّف بسارة وعائلتها وحياتها المدرسية وصديقتها الجديدة لينا.'
      }
    }
  },

  writing: {
    name: { en: 'Writing', ar: 'الكتابة' },
    desc: { en: 'Complete sentences, fix mistakes, and write short answers.', ar: 'أكمل الجمل، صحّح الأخطاء، واكتب إجابات قصيرة.' },

    q1: {
      text:            { en: 'Complete the sentence: "My name _____ Rami."', ar: 'Complete the sentence: "My name _____ Rami."' },
      acceptedAnswers: { en: ['is'], ar: ['is'] },
      explanation: {
        en: 'The verb "to be" for "my name" is "is": "My name is Rami."',
        ar: 'فعل "to be" مع "my name" هو "is": "My name is Rami."'
      },
      modelAnswer: {
        en: 'My name is Rami.',
        ar: 'My name is Rami.'
      }
    },
    q2: {
      text:            { en: 'Complete the sentence: "I _____ from Egypt."', ar: 'Complete the sentence: "I _____ from Egypt."' },
      acceptedAnswers: { en: ['am'], ar: ['am'] },
      explanation: {
        en: 'With "I", the verb "to be" is "am": "I am from Egypt."',
        ar: 'مع "I" نستخدم "am": "I am from Egypt."'
      },
      modelAnswer: {
        en: 'I am from Egypt.',
        ar: 'I am from Egypt.'
      }
    },
    q3: {
      text:        { en: 'Fix the sentence. Which version is correct?', ar: 'Fix the sentence. Which version is correct?' },
      options: {
        en: [
          'She go to school every day.',
          'She goes to school every day.',
          'She going to school every day.',
          'She gone to school every day.'
        ],
        ar: [
          'She go to school every day.',
          'She goes to school every day.',
          'She going to school every day.',
          'She gone to school every day.'
        ]
      },
      correct:     { en: 'She goes to school every day.', ar: 'She goes to school every day.' },
      explanation: {
        en: 'With "she" (third person singular), we add -es: "She goes to school every day."',
        ar: 'مع "she" نضيف -es: "She goes to school every day."'
      }
    },
    q4: {
      text:        { en: 'Arrange the words to make a correct sentence:', ar: 'Arrange the words to make a correct sentence:' },
      options:     { en: ['is', 'My', 'teacher', 'mother', 'a'], ar: ['is', 'My', 'teacher', 'mother', 'a'] },
      correct:     { en: 'My mother is a teacher', ar: 'My mother is a teacher' },
      explanation: {
        en: 'The correct order is: "My mother is a teacher."',
        ar: 'الترتيب الصحيح هو: "My mother is a teacher."'
      }
    },
    q5: {
      text: {
        en: 'Write a short sentence about your favourite hobby. (Example: "My favourite hobby is reading.")',
        ar: 'Write a short sentence about your favourite hobby. (Example: "My favourite hobby is reading.")'
      },
      acceptedAnswers: {
        en: ['my favourite hobby is reading', 'my favorite hobby is reading', 'i like reading', 'i like playing football', 'i like drawing'],
        ar: ['my favourite hobby is reading', 'my favorite hobby is reading', 'i like reading', 'i like playing football', 'i like drawing']
      },
      modelAnswer: {
        en: 'My favourite hobby is reading.',
        ar: 'My favourite hobby is reading.'
      },
      explanation: {
        en: 'A good answer uses the pattern: "My favourite hobby is ___." or "I like ___."',
        ar: 'الإجابة الجيدة تتبع النمط: "My favourite hobby is ___." أو "I like ___."'
      }
    },
    q6: {
      text: {
        en: 'Introduce yourself in one sentence. (Example: "My name is Sara and I am eleven years old.")',
        ar: 'Introduce yourself in one sentence. (Example: "My name is Sara and I am eleven years old.")'
      },
      acceptedAnswers: {
        en: ['my name is', 'i am', "i'm"],
        ar: ['my name is', 'i am', "i'm"]
      },
      modelAnswer: {
        en: 'My name is Sara and I am eleven years old.',
        ar: 'My name is Sara and I am eleven years old.'
      },
      explanation: {
        en: 'A good introduction includes your name and maybe your age or where you are from.',
        ar: 'التعريف الجيد يشمل اسمك وربما عمرك أو من أين أنت.'
      }
    }
  },

  listening: {
    name: { en: 'Listening', ar: 'الاستماع' },
    desc: { en: 'Listen to the "Welcome Back" song and answer questions.', ar: 'استمع إلى أغنية "Welcome Back" وأجب عن الأسئلة.' },

    q1: {
      text: {
        en: 'What is the song mainly about?',
        ar: 'What is the song mainly about?'
      },
      options: {
        en: ['Welcoming students back to school', 'Going on a summer holiday', 'Eating lunch in the cafeteria', 'Playing football after school'],
        ar: ['Welcoming students back to school', 'Going on a summer holiday', 'Eating lunch in the cafeteria', 'Playing football after school']
      },
      correct: { en: 'Welcoming students back to school', ar: 'Welcoming students back to school' },
      explanation: {
        en: 'The song says "Welcome back, welcome back! We\'re so happy to see you!" — it is a welcome-back song for a new school year.',
        ar: 'تقول الأغنية "Welcome back, welcome back! We\'re so happy to see you!" — إنها أغنية ترحيب بالعودة إلى المدرسة.'
      }
    },

    q2: {
      text: {
        en: 'According to the song, what do the teachers plan for you?',
        ar: 'According to the song, what do the teachers plan for you?'
      },
      options: {
        en: ['An exciting year', 'A long holiday', 'A football match', 'A shopping trip'],
        ar: ['An exciting year', 'A long holiday', 'A football match', 'A shopping trip']
      },
      correct: { en: 'An exciting year', ar: 'An exciting year' },
      explanation: {
        en: 'The song says: "Hello to all the teachers, who have planned an exciting year for you."',
        ar: 'تقول الأغنية: "Hello to all the teachers, who have planned an exciting year for you."'
      }
    },

    q3: {
      text: {
        en: 'Who can\'t wait to start the year?',
        ar: 'Who can\'t wait to start the year?'
      },
      options: {
        en: ['All the All Sorts', 'Only the teachers', 'Only the parents', 'Only the new students'],
        ar: ['All the All Sorts', 'Only the teachers', 'Only the parents', 'Only the new students']
      },
      correct: { en: 'All the All Sorts', ar: 'All the All Sorts' },
      explanation: {
        en: 'The song says: "Welcome all the All Sorts who can\'t wait to start the year!"',
        ar: 'تقول الأغنية: "Welcome all the All Sorts who can\'t wait to start the year!"'
      }
    },

    q4: {
      text: {
        en: 'What does the song say we will do together?',
        ar: 'What does the song say we will do together?'
      },
      options: {
        en: ['Work and play', 'Sleep and eat', 'Run and jump', 'Sing and dance'],
        ar: ['Work and play', 'Sleep and eat', 'Run and jump', 'Sing and dance']
      },
      correct: { en: 'Work and play', ar: 'Work and play' },
      explanation: {
        en: 'The song says: "We\'ll work and play together, so, let\'s hear a great big cheer."',
        ar: 'تقول الأغنية: "We\'ll work and play together, so, let\'s hear a great big cheer."'
      }
    },

    q5: {
      text: {
        en: 'Which phrase is repeated many times in the song?',
        ar: 'Which phrase is repeated many times in the song?'
      },
      options: {
        en: ['Hooray! Hooray! Hey, hey hooray!', 'Good morning, good morning!', 'See you later, alligator!', 'Twinkle, twinkle, little star!'],
        ar: ['Hooray! Hooray! Hey, hey hooray!', 'Good morning, good morning!', 'See you later, alligator!', 'Twinkle, twinkle, little star!']
      },
      correct: { en: 'Hooray! Hooray! Hey, hey hooray!', ar: 'Hooray! Hooray! Hey, hey hooray!' },
      explanation: {
        en: 'The line "Hooray! Hooray! Hey, hey hooray!" is repeated several times in the song.',
        ar: 'يتكرر السطر "Hooray! Hooray! Hey, hey hooray!" عدة مرات في الأغنية.'
      }
    },

    q6: {
      text: {
        en: 'How does the song say friends can help you?',
        ar: 'How does the song say friends can help you?'
      },
      options: {
        en: ['They will be here to help you too', 'They will give you money', 'They will do your homework', 'They will take you home'],
        ar: ['They will be here to help you too', 'They will give you money', 'They will do your homework', 'They will take you home']
      },
      correct: { en: 'They will be here to help you too', ar: 'They will be here to help you too' },
      explanation: {
        en: 'The song says: "your friends are here to help you, too."',
        ar: 'تقول الأغنية: "your friends are here to help you, too."'
      }
    }
  },
};

window.unit1T = function (path, lang) {
  if (typeof path !== 'string') return '';
  var parts = path.split('.');
  var node = window.UNIT_1_TRANSLATIONS;
  for (var i = 0; i < parts.length; i++) {
    if (node == null) return path;
    node = node[parts[i]];
  }
  if (node == null) return path;
  if (typeof node === 'object' && !Array.isArray(node)) {
    return node[lang] != null ? node[lang] : (node.en != null ? node.en : path);
  }
  return node;
};

window.unit1Format = function (template, vars) {
  if (typeof template !== 'string') return '';
  return template.replace(/\{(\w+)\}/g, function (_, name) {
    return vars && vars[name] != null ? vars[name] : '';
  });
};

window.UNIT_1_SECTIONS = [
  { id: 'grammar',    key: 'grammar',    icon: 'fa-book' },
  { id: 'vocabulary', key: 'vocabulary', icon: 'fa-book-open' },
  { id: 'speaking',   key: 'speaking',   icon: 'fa-microphone' },
  { id: 'reading',    key: 'reading',    icon: 'fa-book-open-reader' },
  { id: 'writing',    key: 'writing',    icon: 'fa-pencil' },
  { id: 'listening',  key: 'listening',  icon: 'fa-headphones' }
];

window.UNIT_1_META = {
  id: 1,
  storageKey: 'englishQuestUnit1',
  langStorageKey: 'englishQuestLang',
  pointsPerQuestion: 10,
  totalActivities: 36,
  totalSections: 6
};
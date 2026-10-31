'use strict';

window.HOME_TRANSLATIONS = {

    'unit.locked':     { en: 'Coming Soon',        ar: 'قريبًا' },
    'unit.comingSoon': { en: 'Coming Soon',   ar: 'قريباً' },

    'about.title':  { en: 'About the Platform', ar: 'حول المنصة' },
    'about.text':   {
    en: 'All tests and exercises on English Quest are based on the Saudi curriculum for the sixth grade of primary school, English subject.',
    ar: 'جميع الاختبارات والتمارين في مهام الإنجليزية مبنية على المنهج السعودي للصف السادس الابتدائي، مادة اللغة الإنجليزية.'
    },
    'about.point1': { en: 'Aligned with the official Grade 6 English curriculum in Saudi Arabia.', ar: 'متوافق مع منهج اللغة الإنجليزية الرسمي للصف السادس في المملكة العربية السعودية.' },
    'about.point2': { en: 'Covers the core skills: grammar, vocabulary, speaking, reading, and writing.', ar: 'يغطي المهارات الأساسية: القواعد، المفردات، المحادثة، القراءة، والكتابة.' },
    'about.point3': { en: 'Designed for interactive practice and self-paced learning.', ar: 'مصمم للتدريب التفاعلي والتعلم الذاتي.' },

  'nav.home':          { en: 'Home',                ar: 'الرئيسية' },
  'nav.about':         { en: 'About',               ar: 'حول' },
  'nav.grade':         { en: 'Grade 6',             ar: 'الصف السادس ابتدائي' },

  'hero.badge':        { en: '✦ English Quest',     ar: '✦ مهمة الإنجليزية' },
  'hero.title':        { en: 'Hello, Young Learner!', ar: 'مرحباً أيها المتعلم الصغير!' },
  'hero.subtitle':     { en: 'Ready to practice for English?', ar: 'هل أنت مستعد لتمرن مادة الانجليزي؟' },
  'hero.description':  {
    en: 'Explore your lessons, practice your skills, and achieve your learning goals!',
    ar: 'اكتشف دروسك، وطوّر مهاراتك، وحقّق أهدافك التعليمية!'
  },
  'hero.button':       { en: 'Explore Units',       ar: 'استكشف الوحدات' },

  'stats.units':       { en: 'Learning Units',      ar: 'وحدات تعليمية' },
  'stats.lessons':     { en: 'Lessons',             ar: 'دروس' },
  'stats.quizzes':     { en: 'Unit Quizzes',        ar: 'اختبارات الوحدات' },

  'units.title':       { en: 'Explore Your Units',  ar: 'استكشف وحداتك' },
  'units.subtitle':    {
    en: 'Choose a unit and start your learning journey!',
    ar: 'اختر وحدة وابدأ رحلة التعلم!'
  },

  'unit.number':       { en: 'Unit',                ar: 'الوحدة' },
  'unit.quiz':         { en: 'Quiz',                ar: 'اختبار' },
  'unit.lessons':      { en: 'Lessons',             ar: 'دروس' },
  'unit.start':        { en: 'Start Learning',      ar: 'ابدأ التعلم' },
  'unit.ariaLabel':    {
    en: 'Unit {id}: {title}. 6 lessons plus final quiz.',
    ar: 'الوحدة {id}: {title}. ٦ دروس مع اختبار نهائي.'
  },

  'tip.title':         { en: 'Learning Tip',        ar: 'نصيحة تعلم' },
  'tip.text':          {
    en: 'Practice a little every day. Small steps lead to big achievements!',
    ar: 'تدرّب قليلاً كل يوم. الخطوات الصغيرة تؤدي إلى إنجازات كبيرة!'
  },

  'footer.tagline':    { en: 'Learn Something New Every Day.', ar: 'تعلّم شيئاً جديداً كل يوم.' },
  'footer.sub':        { en: 'Grade 6 English Learning Platform', ar: 'منصة تعلّم الإنجليزية للصف السادس ابتدائي' },
  'footer.copyright':  {
    en: '© 2025 English Quest. All rights reserved.',
    ar: '© 2025 مهمة الإنجليزية. جميع الحقوق محفوظة.'
  },

  'modal.title':       { en: 'Coming Soon!',        ar: 'قريباً!' },
  'modal.text':        {
    en: 'This unit will be available soon. Keep practicing!',
    ar: 'ستكون هذه الوحدة متاحة قريباً. استمر في التدريب!'
  },
  'modal.button':      { en: 'Got it!',             ar: 'فهمت!' },
  'modal.unitMessage': {
    en: 'Unit "{title}" will be available soon. Keep practicing!',
    ar: 'وحدة "{title}" ستكون متاحة قريباً. استمر في التدريب!'
  }
};

window.homeT = function (key, lang) {
  const entry = window.HOME_TRANSLATIONS[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
};

window.homeFormat = function (template, vars) {
  if (typeof template !== 'string') return '';
  return template.replace(/\{(\w+)\}/g, (_, name) =>
    vars && vars[name] != null ? vars[name] : ''
  );
};

window.HOME_LANGUAGES = [
  { code: 'en', label: 'EN', name: 'English', dir: 'ltr' },
  { code: 'ar', label: 'AR', name: 'العربية', dir: 'rtl' }
];
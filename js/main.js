/* ============================================================
   ENGLISH QUEST – GRADE 6 HOMEPAGE SCRIPT
   Bilingual support: English (default) + Arabic
   ============================================================ */

'use strict';

/* ------------------------------------------------------------
   1. TRANSLATIONS OBJECT
   ------------------------------------------------------------ */
const TRANSLATIONS = {
  'nav.home':         { en: 'Home',                 ar: 'الرئيسية' },
  'nav.about':        { en: 'About',                ar: 'حول' },
  'nav.grade':        { en: 'Grade 6',              ar: 'الصف السادس' },

  'hero.badge':       { en: '✦ English Quest',      ar: '✦ مهمة الإنجليزية' },
  'hero.title':       { en: 'Hello, Young Learner!', ar: 'مرحباً أيها المتعلم الصغير!' },
  'hero.subtitle':    { en: 'Ready to learn English?', ar: 'هل أنت مستعد لتعلم الإنجليزية؟' },
  'hero.description': {
    en: 'Explore your lessons, practice your skills, and achieve your learning goals!',
    ar: 'اكتشف دروسك، وطوّر مهاراتك، وحقق أهدافك التعليمية!'
  },
  'hero.button':      { en: 'Explore Units',        ar: 'استكشف الوحدات' },

  'stats.units':      { en: 'Learning Units',       ar: 'وحدات تعليمية' },
  'stats.lessons':    { en: 'Lessons',              ar: 'دروس' },
  'stats.quizzes':    { en: 'Unit Quizzes',         ar: 'اختبارات الوحدات' },

  'units.title':      { en: 'Explore Your Units',   ar: 'استكشف وحداتك' },
  'units.subtitle':   {
    en: 'Choose a unit and start your learning journey!',
    ar: 'اختر وحدة وابدأ رحلة التعلم!'
  },

  'tip.title':        { en: 'Learning Tip',         ar: 'نصيحة تعلم' },
  'tip.text':         {
    en: 'Practice a little every day. Small steps lead to big achievements!',
    ar: 'تدرّب قليلاً كل يوم. الخطوات الصغيرة تؤدي إلى إنجازات كبيرة!'
  },

  'footer.tagline':   { en: 'Learn Something New Every Day.', ar: 'تعلّم شيئاً جديداً كل يوم.' },
  'footer.sub':       { en: 'Grade 6 English Learning Platform', ar: 'منصة تعلم الإنجليزية للصف السادس' },
  'footer.copyright': {
    en: '© 2025 English Quest. All rights reserved.',
    ar: '© 2025 مهمة الإنجليزية. جميع الحقوق محفوظة.'
  },

  'modal.title':      { en: 'Coming Soon!',         ar: 'قريباً!' },
  'modal.text':       {
    en: 'This unit will be available soon. Keep practicing!',
    ar: 'ستكون هذه الوحدة متاحة قريباً. استمر في التدريب!'
  },
  'modal.button':     { en: 'Got it!',              ar: 'فهمت!' },

  'unit.number':      { en: 'Unit',                 ar: 'الوحدة' },
  'unit.quiz':        { en: 'Quiz',                 ar: 'اختبار' },
  'unit.lessons':     { en: 'Lessons',              ar: 'دروس' },
  'unit.start':       { en: 'Start Learning',       ar: 'ابدأ التعلم' },
  'unit.lessonsShort':{ en: '6 Lessons',            ar: '٦ دروس' },
  'unit.ariaLabel':   {
    en: 'Unit {id}: {title}. 6 lessons plus final quiz.',
    ar: 'الوحدة {id}: {title}. ٦ دروس مع اختبار نهائي.'
  },
  'modal.unitMessage':{
    en: 'Unit "{title}" will be available soon. Keep practicing!',
    ar: 'وحدة "{title}" ستكون متاحة قريباً. استمر في التدريب!'
  }
};

/* ------------------------------------------------------------
   2. UNIT DATA (titles stay English by design)
   ------------------------------------------------------------ */
const UNIT_DATA = [
  { id: 1, title: 'Getting to Know You',           description: { en: 'Introduce yourself and learn how to greet new friends.', ar: 'قدّم نفسك وتعلّم كيف تحيي أصدقاء جدد.' }, icon: 'users',       lessons: 6, hasQuiz: true },
  { id: 2, title: 'Life Around the World',         description: { en: 'Discover cultures, countries, and everyday life worldwide.', ar: 'اكتشف الثقافات والبلدان والحياة اليومية حول العالم.' }, icon: 'globe',       lessons: 6, hasQuiz: true },
  { id: 3, title: 'What Are You Doing?',           description: { en: 'Talk about actions happening right now with present tenses.', ar: 'تحدّث عن الأفعال التي تحدث الآن باستخدام الأزمنة الحاضرة.' }, icon: 'activity',    lessons: 6, hasQuiz: true },
  { id: 4, title: 'What Do You Want to Be?',       description: { en: 'Explore jobs, dreams, and future ambitions.', ar: 'استكشف المهن والأحلام والطموحات المستقبلية.' }, icon: 'briefcase',   lessons: 6, hasQuiz: true },
  { id: 5, title: 'Did You Have a Nice Weekend?',  description: { en: 'Share past experiences and talk about your free time.', ar: 'شارك تجاربك الماضية وتحدّث عن وقت فراغك.' }, icon: 'calendar',    lessons: 6, hasQuiz: true },
  { id: 6, title: "Let's Go Out!",                 description: { en: 'Make plans, give invitations, and suggest activities.', ar: 'ضع خططاً ووجّه الدعوات واقترح الأنشطة.' }, icon: 'map-pin',     lessons: 6, hasQuiz: true },
  { id: 7, title: "What's the Weather Like?",      description: { en: 'Describe weather conditions and seasons in English.', ar: 'صف حالات الطقس والفصول بالإنجليزية.' }, icon: 'cloud-sun',   lessons: 6, hasQuiz: true },
  { id: 8, title: "What's Wrong?",                 description: { en: 'Express feelings, health problems, and give advice.', ar: 'عبّر عن المشاعر والمشاكل الصحية وقدّم النصائح.' }, icon: 'heart-pulse', lessons: 6, hasQuiz: true }
];

/* ------------------------------------------------------------
   2b. UNIT AVAILABILITY CONFIG
   ------------------------------------------------------------
   Units listed here have a dedicated learning page and will
   navigate to it when clicked. All other units show the
   "Coming Soon" modal.
   ------------------------------------------------------------ */
const AVAILABLE_UNITS = {
  1: 'unit-1.html'
  // 2: 'unit-2.html',  ← add more as they are built
  // 3: 'unit-3.html',
};

/* ------------------------------------------------------------
   3. ICON LIBRARY (inline SVG strings)
   ------------------------------------------------------------ */
const ICONS = {
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  activity: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
  briefcase: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  'map-pin': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  'cloud-sun': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v2"/><path d="M5.22 5.22l1.42 1.42"/><path d="M18.36 6.64l1.42-1.42"/><path d="M22 12h2"/><path d="M2 12h2"/><path d="M4.22 16.78l-1.42 1.42"/><path d="M17.5 19a4.5 4.5 0 1 0-4-6.5"/><path d="M8 19a4.5 4.5 0 1 1 4-6.5"/></svg>`,
  'heart-pulse': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/><path d="M3.5 12h4l1.5-3 3 6 1.5-3h4"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  'arrow-right': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
  'help-circle': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
};

/* ------------------------------------------------------------
   4. DOM REFERENCES
   ------------------------------------------------------------ */
const DOM = {
  unitsGrid: document.getElementById('unitsGrid'),
  exploreBtn: document.getElementById('exploreBtn'),
  mobileToggle: document.querySelector('.mobile-toggle'),
  mobileNav: document.querySelector('.mobile-nav'),
  modal: document.getElementById('comingSoonModal'),
  modalClose: document.getElementById('modalClose'),
  modalBtn: document.getElementById('modalBtn'),
  modalText: document.getElementById('modalText'),
  statUnits: document.getElementById('statUnits'),
  statLessons: document.getElementById('statLessons'),
  statQuizzes: document.getElementById('statQuizzes'),
  langSwitcher: document.getElementById('langSwitcher'),
  langSwitcherMobile: document.getElementById('langSwitcherMobile'),
  langCurrent: document.getElementById('langCurrent'),
  langCurrentMobile: document.getElementById('langCurrentMobile')
};

/* ------------------------------------------------------------
   5. LANGUAGE STATE
   ------------------------------------------------------------ */
const LANG_STORAGE_KEY = 'englishQuestLang';
let currentLang = 'en';

/* ------------------------------------------------------------
   6. TRANSLATION HELPERS
   ------------------------------------------------------------ */
function t(key) {
  const entry = TRANSLATIONS[key];
  if (!entry) return key;
  return entry[currentLang] || entry.en || key;
}

function formatString(template, vars) {
  return template.replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? '');
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const value = t(key);

    if (el.querySelector('svg')) {
      const textNode = Array.from(el.childNodes).find(
        n => n.nodeType === Node.TEXT_NODE && n.textContent.trim() !== ''
      );
      if (textNode) {
        textNode.textContent = value + ' ';
      } else {
        el.insertAdjacentText('afterbegin', value + ' ');
      }
    } else {
      el.textContent = value;
    }
  });

  const logo = document.querySelector('.logo');
  if (logo) logo.setAttribute('aria-label', currentLang === 'ar' ? 'مهمة الإنجليزية - الرئيسية' : 'English Quest home');
}

/* ------------------------------------------------------------
   7. APPLY DIRECTION + LANG
   ------------------------------------------------------------ */
function applyDirection(lang) {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

  const label = lang === 'ar' ? 'AR' : 'EN';
  if (DOM.langCurrent) DOM.langCurrent.textContent = label;
  if (DOM.langCurrentMobile) DOM.langCurrentMobile.textContent = label;

  document.title = lang === 'ar'
    ? 'مهمة الإنجليزية · الصف السادس'
    : 'English Quest · Grade 6';
}

/* ------------------------------------------------------------
   8. RENDER STATISTICS
   ------------------------------------------------------------ */
function renderStats() {
  const totalUnits = UNIT_DATA.length;
  const totalLessons = UNIT_DATA.reduce((sum, u) => sum + u.lessons, 0);
  const totalQuizzes = UNIT_DATA.filter(u => u.hasQuiz).length;

  if (DOM.statUnits) DOM.statUnits.textContent = totalUnits;
  if (DOM.statLessons) DOM.statLessons.textContent = totalLessons;
  if (DOM.statQuizzes) DOM.statQuizzes.textContent = totalQuizzes;
}

/* ------------------------------------------------------------
   9. RENDER UNIT CARDS
   ------------------------------------------------------------ */
function createUnitCard(unit) {
  const card = document.createElement('article');
  card.className = 'unit-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('tabindex', '0');
  card.setAttribute('data-unit-id', unit.id);
  card.dataset.unitTitle = unit.title;

  const ariaTemplate = t('unit.ariaLabel');
  card.setAttribute(
    'aria-label',
    formatString(ariaTemplate, { id: unit.id, title: unit.title })
  );

  const iconSvg = ICONS[unit.icon] || ICONS.book;
  const description = unit.description[currentLang] || unit.description.en;

  card.innerHTML = `
    <div class="unit-card-header">
      <span class="unit-number">${t('unit.number')} ${unit.id}</span>
      ${unit.hasQuiz ? `
        <span class="unit-quiz-indicator" title="${t('unit.quiz')}">
          ${ICONS['help-circle']}
          ${t('unit.quiz')}
        </span>` : ''}
    </div>

    <div class="unit-icon" aria-hidden="true">
      ${iconSvg}
    </div>

    <h3 class="unit-title">${unit.title}</h3>
    <p class="unit-description">${description}</p>

    <div class="unit-footer">
      <span class="unit-lessons">
        ${ICONS.book}
        ${unit.lessons} ${t('unit.lessons')}
      </span>
      <span class="unit-start">
        ${t('unit.start')}
        ${ICONS['arrow-right']}
      </span>
    </div>
  `;

  const activate = () => {
    const targetUrl = AVAILABLE_UNITS[unit.id];
    if (targetUrl) {
      // Unit has a dedicated learning page — navigate to it.
      window.location.href = targetUrl;
    } else {
      // Not built yet — show friendly "Coming Soon" modal.
      openModal(unit.title);
    }
  };

  card.addEventListener('click', activate);

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activate();
    }
  });

  return card;
}

function renderUnits() {
  if (!DOM.unitsGrid) return;
  DOM.unitsGrid.innerHTML = '';
  UNIT_DATA.forEach(unit => {
    DOM.unitsGrid.appendChild(createUnitCard(unit));
  });
}

/* ------------------------------------------------------------
   10. MOBILE NAVIGATION
   ------------------------------------------------------------ */
function toggleMobileNav(forceClose = false) {
  if (!DOM.mobileNav || !DOM.mobileToggle) return;

  const isOpen = !forceClose && !DOM.mobileNav.classList.contains('open');
  DOM.mobileNav.classList.toggle('open', isOpen);
  DOM.mobileToggle.setAttribute('aria-expanded', String(isOpen));
}

function initMobileNav() {
  if (!DOM.mobileToggle) return;

  DOM.mobileToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });

  DOM.mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggleMobileNav(true));
  });

  document.addEventListener('click', (event) => {
    if (!DOM.mobileNav?.classList.contains('open')) return;
    if (DOM.mobileNav.contains(event.target) || DOM.mobileToggle.contains(event.target)) return;
    toggleMobileNav(true);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && DOM.mobileNav?.classList.contains('open')) {
      toggleMobileNav(true);
      DOM.mobileToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && DOM.mobileNav?.classList.contains('open')) {
      toggleMobileNav(true);
    }
  });
}

/* ------------------------------------------------------------
   11. SMOOTH SCROLL – "Explore Units"
   ------------------------------------------------------------ */
function initExploreScroll() {
  if (!DOM.exploreBtn) return;

  DOM.exploreBtn.addEventListener('click', () => {
    const unitsSection = document.getElementById('units');
    if (unitsSection) {
      unitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

/* ------------------------------------------------------------
   12. MODAL ("Coming Soon")
   ------------------------------------------------------------ */
let lastFocusedElement = null;

function openModal(unitTitle) {
  if (!DOM.modal) return;

  lastFocusedElement = document.activeElement;

  if (DOM.modalText) {
    const template = t('modal.unitMessage');
    DOM.modalText.textContent = formatString(template, { title: unitTitle });
  }

  DOM.modal.classList.add('open');
  DOM.modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  setTimeout(() => DOM.modalClose?.focus(), 50);
}

function closeModal() {
  if (!DOM.modal) return;

  DOM.modal.classList.remove('open');
  DOM.modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
  lastFocusedElement = null;
}

function initModal() {
  if (!DOM.modal) return;

  DOM.modalClose?.addEventListener('click', closeModal);
  DOM.modalBtn?.addEventListener('click', closeModal);

  DOM.modal.addEventListener('click', (event) => {
    if (event.target === DOM.modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && DOM.modal.classList.contains('open')) {
      closeModal();
    }
  });

  DOM.modal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = DOM.modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

/* ------------------------------------------------------------
   13. SCROLL ENTRANCE ANIMATIONS
   ------------------------------------------------------------ */
function initScrollAnimations() {
  const revealTargets = document.querySelectorAll(
    '.hero-content, .hero-illustration, .stat-card, .unit-card, .tip-card, .section-header'
  );

  if (!revealTargets.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealTargets.forEach(el => {
    el.classList.add('reveal-init');
    observer.observe(el);
  });
}

/* ------------------------------------------------------------
   14. LANGUAGE SWITCHER
   ------------------------------------------------------------ */
function setLanguage(lang, { persist = true } = {}) {
  if (lang !== 'en' && lang !== 'ar') lang = 'en';
  if (lang === currentLang) {
    applyDirection(lang);
    applyTranslations();
    renderUnits();
    return;
  }

  currentLang = lang;

  applyDirection(lang);
  applyTranslations();
  renderUnits();

  if (DOM.modal?.classList.contains('open')) {
    const activeCard = document.querySelector('.unit-card:focus-within, .unit-card:focus');
    const title = activeCard?.dataset.unitTitle;
    if (title && DOM.modalText) {
      const template = t('modal.unitMessage');
      DOM.modalText.textContent = formatString(template, { title });
    }
  }

  if (persist) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (_) { /* storage may be blocked; fail silently */ }
  }
}

function loadSavedLanguage() {
  let saved = null;
  try {
    saved = localStorage.getItem(LANG_STORAGE_KEY);
  } catch (_) { /* ignore */ }
  return saved === 'ar' ? 'ar' : 'en';
}

function toggleLanguage() {
  const next = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(next);
}

function initLanguageSwitcher() {
  DOM.langSwitcher?.addEventListener('click', toggleLanguage);
  DOM.langSwitcherMobile?.addEventListener('click', toggleLanguage);
}

/* ------------------------------------------------------------
   15. INITIALISE EVERYTHING ON DOM READY
   ------------------------------------------------------------ */
document.addEventListener('DOMContentLoaded', () => {
  currentLang = loadSavedLanguage();

  applyDirection(currentLang);
  applyTranslations();

  renderStats();
  renderUnits();
  initLanguageSwitcher();
  initMobileNav();
  initExploreScroll();
  initModal();
  initScrollAnimations();
});
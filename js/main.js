'use strict';

const UNIT_DATA = [
  { id: 1, title: 'Getting to Know You',          description: { en: 'Introduce yourself and learn how to greet new friends.', ar: 'قدّم نفسك وتعلّم كيف تحيي أصدقاء جدد.' }, icon: 'fa-user-group',    lessons: 6, hasQuiz: true },
  { id: 2, title: 'Life Around the World',        description: { en: 'Discover cultures, countries, and everyday life worldwide.', ar: 'اكتشف الثقافات والبلدان والحياة اليومية حول العالم.' }, icon: 'fa-globe',         lessons: 6, hasQuiz: true },
  { id: 3, title: 'What Are You Doing?',          description: { en: 'Talk about actions happening right now with present tenses.', ar: 'تحدّث عن الأفعال التي تحدث الآن باستخدام الأزمنة الحاضرة.' }, icon: 'fa-bolt',          lessons: 6, hasQuiz: true },
  { id: 4, title: 'What Do You Want to Be?',      description: { en: 'Explore jobs, dreams, and future ambitions.', ar: 'استكشف المهن والأحلام والطموحات المستقبلية.' }, icon: 'fa-briefcase',     lessons: 6, hasQuiz: true },
  { id: 5, title: 'Did You Have a Nice Weekend?', description: { en: 'Share past experiences and talk about your free time.', ar: 'شارك تجاربك الماضية وتحدّث عن وقت فراغك.' }, icon: 'fa-calendar-days', lessons: 6, hasQuiz: true },
  { id: 6, title: "Let's Go Out!",                description: { en: 'Make plans, give invitations, and suggest activities.', ar: 'ضع خططاً ووجّه الدعوات واقترح الأنشطة.' }, icon: 'fa-location-dot',  lessons: 6, hasQuiz: true },
  { id: 7, title: "What's the Weather Like?",     description: { en: 'Describe weather conditions and seasons in English.', ar: 'صف حالات الطقس والفصول بالإنجليزية.' }, icon: 'fa-cloud-sun',     lessons: 6, hasQuiz: true },
  { id: 8, title: "What's Wrong?",                description: { en: 'Express feelings, health problems, and give advice.', ar: 'عبّر عن المشاعر والمشاكل الصحية وقدّم النصائح.' }, icon: 'fa-heart-pulse',   lessons: 6, hasQuiz: true }
];

const AVAILABLE_UNITS = {
  1: 'unit-1/unit-1.html'
};

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

const LANG_STORAGE_KEY = 'englishQuestLang';
let currentLang = 'en';

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;

    const value = homeT(key, currentLang);

    if (el.querySelector('i')) {
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
  if (logo) {
    logo.setAttribute('aria-label', currentLang === 'ar' ? 'مهمة الإنجليزية - الرئيسية' : 'English Quest home');
  }
}

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

function renderStats() {
  const totalUnits = UNIT_DATA.length;
  const totalLessons = UNIT_DATA.reduce((sum, u) => sum + u.lessons, 0);
  const totalQuizzes = UNIT_DATA.filter(u => u.hasQuiz).length;

  if (DOM.statUnits) DOM.statUnits.textContent = totalUnits;
  if (DOM.statLessons) DOM.statLessons.textContent = totalLessons;
  if (DOM.statQuizzes) DOM.statQuizzes.textContent = totalQuizzes;
}

function isUnitAvailable(unitId) {
  return Boolean(AVAILABLE_UNITS[unitId]);
}

function createUnitCard(unit) {
  const available = isUnitAvailable(unit.id);

  const card = document.createElement('article');
  card.className = 'unit-card' + (available ? '' : ' unit-card-locked');
  card.setAttribute('role', 'listitem');
  card.setAttribute('data-unit-id', unit.id);
  card.dataset.unitTitle = unit.title;

  if (available) {
    card.setAttribute('tabindex', '0');
    card.setAttribute(
      'aria-label',
      homeFormat(homeT('unit.ariaLabel', currentLang), { id: unit.id, title: unit.title })
    );
  } else {
    card.setAttribute('tabindex', '-1');
    card.setAttribute('aria-disabled', 'true');
    card.setAttribute(
      'aria-label',
      homeT('unit.locked', currentLang) + ' — ' + unit.title
    );
  }

  const description = unit.description[currentLang] || unit.description.en;
  const quizIndicator = unit.hasQuiz
    ? `<span class="unit-quiz-indicator" title="${homeT('unit.quiz', currentLang)}"><i class="fa-solid fa-circle-question"></i> ${homeT('unit.quiz', currentLang)}</span>`
    : '';

  const lockOverlay = available
    ? ''
    : `<div class="unit-lock-overlay" aria-hidden="true">
         <div class="unit-lock-icon">
           <i class="fa-solid fa-lock"></i>
         </div>
         <span class="unit-lock-text">${homeT('unit.locked', currentLang)}</span>
       </div>`;

  card.innerHTML = `
    <div class="unit-card-header">
      <span class="unit-number">${homeT('unit.number', currentLang)} ${unit.id}</span>
      ${quizIndicator}
    </div>

    <div class="unit-icon" aria-hidden="true">
      <i class="fa-solid ${unit.icon}"></i>
    </div>

    <h3 class="unit-title">${unit.title}</h3>
    <p class="unit-description">${description}</p>

    <div class="unit-footer">
      <span class="unit-lessons">
        <i class="fa-solid fa-book"></i>
        ${unit.lessons} ${homeT('unit.lessons', currentLang)}
      </span>
      <span class="unit-start">
        ${available ? homeT('unit.start', currentLang) : homeT('unit.comingSoon', currentLang)}
        <i class="fa-solid ${available ? 'fa-arrow-right' : 'fa-lock'}"></i>
      </span>
    </div>

    ${lockOverlay}
  `;

  if (available) {
    const activate = () => {
      window.location.href = AVAILABLE_UNITS[unit.id];
    };

    card.addEventListener('click', activate);

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  }

  return card;
}

function renderUnits() {
  if (!DOM.unitsGrid) return;
  DOM.unitsGrid.innerHTML = '';
  UNIT_DATA.forEach(unit => {
    DOM.unitsGrid.appendChild(createUnitCard(unit));
  });
}

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

function initExploreScroll() {
  if (!DOM.exploreBtn) return;

  DOM.exploreBtn.addEventListener('click', () => {
    const unitsSection = document.getElementById('units');
    if (unitsSection) {
      unitsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}

let lastFocusedElement = null;

function openModal(unitTitle) {
  if (!DOM.modal) return;

  lastFocusedElement = document.activeElement;

  if (DOM.modalText) {
    DOM.modalText.textContent = homeFormat(homeT('modal.unitMessage', currentLang), { title: unitTitle });
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

function initScrollAnimations() {
  const revealTargets = document.querySelectorAll(
    '.hero-content, .hero-illustration, .stat-card, .unit-card, .tip-card, .section-header, .about-card'
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
      DOM.modalText.textContent = homeFormat(homeT('modal.unitMessage', currentLang), { title });
    }
  }

  if (persist) {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (_) {}
  }
}

function loadSavedLanguage() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    return saved === 'ar' ? 'ar' : 'en';
  } catch (_) {
    return 'en';
  }
}

function toggleLanguage() {
  const next = currentLang === 'en' ? 'ar' : 'en';
  setLanguage(next);
}

function initLanguageSwitcher() {
  DOM.langSwitcher?.addEventListener('click', toggleLanguage);
  DOM.langSwitcherMobile?.addEventListener('click', toggleLanguage);
}

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
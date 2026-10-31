'use strict';

(function () {
  var STORAGE_PREFIX = 'englishQuestUnit';
  var LANG_KEY = 'englishQuestLang';
  var POINTS_PER_QUESTION = 10;

  var sharedState = {
    lang: 'en'
  };

  function loadLang() {
    try {
      var saved = localStorage.getItem(LANG_KEY);
      return saved === 'ar' ? 'ar' : 'en';
    } catch (e) {
      return 'en';
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
  }

  function storageKeyFor(unitId) {
    return STORAGE_PREFIX + unitId;
  }

  function loadProgress(unitId) {
    var key = storageKeyFor(unitId);
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return emptyProgress();
      var parsed = JSON.parse(raw);
      return normalizeProgress(parsed);
    } catch (e) {
      return emptyProgress();
    }
  }

  function saveProgress(unitId, progress) {
    try {
      progress.lastUpdated = Date.now();
      localStorage.setItem(storageKeyFor(unitId), JSON.stringify(progress));
    } catch (e) {}
  }

  function emptyProgress() {
    return { sections: {}, xp: 0, lastUpdated: Date.now() };
  }

  function normalizeProgress(progress) {
    var base = emptyProgress();
    if (!progress || typeof progress !== 'object') return base;
    if (progress.sections && typeof progress.sections === 'object') {
      Object.keys(progress.sections).forEach(function (id) {
        var s = progress.sections[id];
        if (s && typeof s === 'object') {
          base.sections[id] = {
            completed: Boolean(s.completed),
            score: Number(s.score) || 0,
            total: Number(s.total) || 0,
            correct: Number(s.correct) || 0
          };
        }
      });
    }
    base.xp = Number(progress.xp) || 0;
    return base;
  }

  function getUnitMeta(unitId) {
    if (unitId === 1 && window.UNIT_1_META) return window.UNIT_1_META;
    return { id: unitId, storageKey: STORAGE_PREFIX + unitId, langStorageKey: LANG_KEY, pointsPerQuestion: POINTS_PER_QUESTION, totalActivities: 30, totalSections: 5 };
  }

  function getUnitSections(unitId) {
    if (unitId === 1 && window.UNIT_1_SECTIONS) return window.UNIT_1_SECTIONS;
    return [];
  }

  function tr(unitId, path) {
    if (unitId === 1 && typeof window.unit1T === 'function') {
      return window.unit1T(path, sharedState.lang);
    }
    return path;
  }

  function trFormat(unitId, template, vars) {
    if (unitId === 1 && typeof window.unit1Format === 'function') {
      return window.unit1Format(template, vars);
    }
    return template;
  }

  function getSectionStrings(unitId, sectionId) {
    if (unitId === 1 && window.UNIT_1_TRANSLATIONS && window.UNIT_1_TRANSLATIONS[sectionId]) {
      return window.UNIT_1_TRANSLATIONS[sectionId];
    }
    return null;
  }

  function getQuestion(unitId, sectionId, index) {
    var section = getSectionStrings(unitId, sectionId);
    if (!section) return null;
    var n = index + 1;
    var prefix = 'q' + n + '.';
    var text = tr(unitId, sectionId + '.' + prefix + 'text');
    var options = section[prefix + 'options'] ? section[prefix + 'options'][sharedState.lang] || section[prefix + 'options'].en : null;
    var correct = section[prefix + 'correct'] ? (section[prefix + 'correct'][sharedState.lang] || section[prefix + 'correct'].en) : null;
    var explanation = tr(unitId, sectionId + '.' + prefix + 'explanation');
    var accepted = section[prefix + 'acceptedAnswers'] ? (section[prefix + 'acceptedAnswers'][sharedState.lang] || section[prefix + 'acceptedAnswers'].en) : null;
    var modelAnswer = section[prefix + 'modelAnswer'] ? (section[prefix + 'modelAnswer'][sharedState.lang] || section[prefix + 'modelAnswer'].en) : null;

    if (!text || text === sectionId + '.' + prefix + 'text') return null;

    var type = 'multipleChoice';
    if (accepted) type = 'shortAnswer';
    if (options && options.length && !accepted && correct && options.indexOf(correct) === -1) type = 'ordering';

    return {
      index: index,
      number: n,
      type: type,
      text: text,
      options: options,
      correct: correct,
      explanation: explanation,
      acceptedAnswers: accepted,
      modelAnswer: modelAnswer,
      points: POINTS_PER_QUESTION
    };
  }

  function getAllQuestions(unitId, sectionId) {
    var list = [];
    for (var i = 0; i < 6; i++) {
      var q = getQuestion(unitId, sectionId, i);
      if (q) list.push(q);
    }
    return list;
  }

  function applyDocumentLanguage() {
    var html = document.documentElement;
    html.setAttribute('lang', sharedState.lang);
    html.setAttribute('dir', sharedState.lang === 'ar' ? 'rtl' : 'ltr');

    var label = sharedState.lang === 'ar' ? 'AR' : 'EN';
    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = label;

    document.title = sharedState.lang === 'ar'
      ? 'مهمة الإنجليزية · الصف السادس'
      : 'English Quest · Grade 6';
  }

  function initLanguageSwitcher(onChange) {
    var btn = document.getElementById('langSwitcher');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      sharedState.lang = sharedState.lang === 'en' ? 'ar' : 'en';
      saveLang(sharedState.lang);
      applyDocumentLanguage();
      if (typeof onChange === 'function') onChange(sharedState.lang);
    });
  }

  function normalize(str) {
    if (typeof str !== 'string') return '';
    return str
      .toLowerCase()
      .replace(/[\u2018\u2019']/g, "'")
      .replace(/[\u201C\u201D]/g, '"')
      .replace(/[.,!?;:\u2014\u2013\-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

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
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  window.UnitHero = {
    init: function (unitId) {
      var meta = getUnitMeta(unitId);
      var sections = getUnitSections(unitId);
      var progress = loadProgress(unitId);

      sharedState.lang = loadLang();
      applyDocumentLanguage();

      var eyebrowEl = document.getElementById('heroEyebrow');
      var titleEl = document.getElementById('heroTitle');
      var descEl = document.getElementById('heroDesc');
      var sectionsLabel = document.getElementById('heroSectionsLabel');
      var activitiesLabel = document.getElementById('heroActivitiesLabel');
      var xpEl = document.getElementById('heroXp');
      var xpLabel = document.getElementById('heroXpLabel');
      var progressLabel = document.getElementById('heroProgressLabel');
      var progressPercent = document.getElementById('unitProgressPercent');
      var progressFill = document.getElementById('unitProgressFill');
      var navFill = document.getElementById('navProgressFill');
      var navText = document.getElementById('navProgressText');
      var sectionsTitle = document.getElementById('sectionsTitle');
      var sectionsSubtitle = document.getElementById('sectionsSubtitle');
      var grid = document.getElementById('sectionsGrid');
      var badge = document.getElementById('unitLabelBadge');

      function render() {
        if (eyebrowEl) eyebrowEl.textContent = tr(unitId, 'hero.eyebrow');
        if (titleEl) titleEl.textContent = tr(unitId, 'hero.title');
        if (descEl) descEl.textContent = tr(unitId, 'hero.desc');
        if (sectionsLabel) sectionsLabel.textContent = tr(unitId, 'hero.sections');
        if (activitiesLabel) activitiesLabel.textContent = tr(unitId, 'hero.activities');
        if (xpLabel) xpLabel.textContent = tr(unitId, 'hero.xpEarned');
        if (progressLabel) progressLabel.textContent = tr(unitId, 'hero.progress');
        if (sectionsTitle) sectionsTitle.textContent = tr(unitId, 'hero.sectionsTitle');
        if (sectionsSubtitle) sectionsSubtitle.textContent = tr(unitId, 'hero.sectionsSubtitle');
        if (badge) badge.textContent = tr(unitId, 'common.nav.unitLabel');

        var backSpan = document.querySelector('.back-home-link span');
        if (backSpan) backSpan.textContent = tr(unitId, 'common.nav.backHome');

        var totalPoints = meta.totalActivities * meta.pointsPerQuestion;
        var earnedPoints = 0;
        Object.keys(progress.sections).forEach(function (id) {
          var s = progress.sections[id];
          if (s && s.completed) earnedPoints += s.score;
        });
        var percent = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

        if (xpEl) xpEl.textContent = String(progress.xp || 0);
        if (progressPercent) progressPercent.textContent = percent + '%';
        if (progressFill) progressFill.style.width = percent + '%';
        if (navFill) navFill.style.width = percent + '%';
        if (navText) navText.textContent = percent + '%';

        if (grid) {
          grid.innerHTML = '';
          sections.forEach(function (sec) {
            var secProgress = progress.sections[sec.id] || { completed: false, score: 0, total: 60, correct: 0 };
            var card = document.createElement('div');
            card.className = 'section-card' + (secProgress.completed ? ' is-complete' : '');
            card.setAttribute('data-section', sec.id);

            var statusClass = 'status-new';
            var statusIcon = '';
            var statusLabel = tr(unitId, 'common.status.new');
            if (secProgress.completed) {
              statusClass = 'status-done';
              statusIcon = '<i class="fa-solid fa-check"></i>';
              statusLabel = tr(unitId, 'common.status.done');
            } else if (secProgress.correct > 0) {
              statusClass = 'status-progress';
              statusLabel = tr(unitId, 'common.status.progress');
            }

            var name = tr(unitId, sec.id + '.name');
            var desc = tr(unitId, sec.id + '.desc');
            var startLabel = secProgress.completed ? tr(unitId, 'common.start.retake') : tr(unitId, 'common.start.practice');
            var scoreBadge = secProgress.completed
              ? '<span class="section-score-badge">' + secProgress.score + ' / ' + secProgress.total + '</span>'
              : '';

            card.innerHTML =
              '<div class="section-card-top">' +
                '<div class="section-icon"><i class="fa-solid ' + sec.icon + '"></i></div>' +
                '<span class="section-status ' + statusClass + '">' + statusIcon + statusLabel + '</span>' +
              '</div>' +
              '<div>' +
                '<h3 class="section-name">' + name + '</h3>' +
                '<p class="section-desc">' + desc + '</p>' +
              '</div>' +
              '<div class="section-meta">' +
                '<span class="section-activity-count"><i class="fa-solid fa-list-check"></i> 6 ' + tr(unitId, 'common.section.activities') + '</span>' +
                scoreBadge +
              '</div>' +
              '<a href="' + sec.id + '-practice.html" class="section-start-btn">' +
                startLabel + ' <i class="fa-solid fa-arrow-right"></i>' +
              '</a>';

            grid.appendChild(card);
          });
        }
      }

      render();
      initLanguageSwitcher(render);
    }
  };

  window.UnitPractice = {
    init: function (unitId, sectionId) {
      var meta = getUnitMeta(unitId);
      var questions = getAllQuestions(unitId, sectionId);

      sharedState.lang = loadLang();
      applyDocumentLanguage();

      var state = {
        index: 0,
        selected: null,
        text: '',
        answered: false,
        correctCount: 0,
        score: 0,
        answers: []
      };

      var dom = {
        exitBtn: document.getElementById('exitSectionBtn'),
        sectionName: document.getElementById('exerciseSectionName'),
        scorePill: document.getElementById('exerciseScore'),
        counter: document.getElementById('questionCounter'),
        progressPercent: document.getElementById('questionProgressPercent'),
        progressFill: document.getElementById('questionProgressFill'),
        readingPassage: document.getElementById('readingPassage'),
        readingBody: document.getElementById('readingPassageBody'),
        readingHeader: document.querySelector('.reading-passage-header span'),
        typeTag: document.getElementById('questionTypeTag'),
        points: document.getElementById('questionPoints'),
        qText: document.getElementById('questionText'),
        options: document.getElementById('questionOptions'),
        inputArea: document.getElementById('questionInputArea'),
        freeInput: document.getElementById('freeTextInput'),
        feedback: document.getElementById('questionFeedback'),
        feedbackIcon: document.getElementById('feedbackIcon'),
        feedbackVerdict: document.getElementById('feedbackVerdict'),
        feedbackExplanation: document.getElementById('feedbackExplanation'),
        feedbackModel: document.getElementById('feedbackModel'),
        feedbackModelText: document.getElementById('feedbackModelText'),
        submitBtn: document.getElementById('submitAnswerBtn'),
        nextBtn: document.getElementById('nextQuestionBtn')
      };

      function typeLabel(type) {
        if (type === 'shortAnswer') return tr(unitId, 'common.type.shortAnswer');
        if (type === 'ordering') return tr(unitId, 'common.type.ordering');
        if (type === 'fillBlank') return tr(unitId, 'common.type.fillBlank');
        return tr(unitId, 'common.type.multipleChoice');
      }

      function updateProgress() {
        var total = questions.length;
        var current = state.index + 1;
        if (dom.counter) dom.counter.textContent = tr(unitId, 'common.exercise.question') + ' ' + current + ' ' + tr(unitId, 'common.exercise.of') + ' ' + total;
        var pct = Math.round(((current - 1) / total) * 100);
        if (dom.progressFill) dom.progressFill.style.width = pct + '%';
        if (dom.progressPercent) dom.progressPercent.textContent = pct + '%';
      }

      function resetFeedback() {
        if (!dom.feedback) return;
        dom.feedback.hidden = true;
        dom.feedback.classList.remove('feedback-correct', 'feedback-incorrect');
        if (dom.feedbackVerdict) dom.feedbackVerdict.textContent = '';
        if (dom.feedbackExplanation) dom.feedbackExplanation.textContent = '';
        if (dom.feedbackModel) dom.feedbackModel.hidden = true;
        if (dom.feedbackModelText) dom.feedbackModelText.textContent = '';
        if (dom.feedbackIcon) dom.feedbackIcon.innerHTML = '';
      }

      function renderReading() {
        if (!dom.readingPassage) return;
        if (sectionId !== 'reading') {
          dom.readingPassage.hidden = true;
          return;
        }
        dom.readingPassage.hidden = false;
        if (dom.readingHeader) dom.readingHeader.textContent = tr(unitId, 'common.exercise.readingTitle');
        var paragraphs = (window.UNIT_1_TRANSLATIONS.reading.passage[sharedState.lang] || window.UNIT_1_TRANSLATIONS.reading.passage.en);
        if (dom.readingBody) {
          dom.readingBody.innerHTML = paragraphs.map(function (p) { return '<p>' + escapeHtml(p) + '</p>'; }).join('');
        }
      }

      function renderQuestion() {
        var q = questions[state.index];
        if (!q) return;

        state.selected = null;
        state.text = '';
        state.answered = false;

        updateProgress();
        resetFeedback();
        renderReading();

        if (dom.typeTag) dom.typeTag.textContent = typeLabel(q.type);
        if (dom.points) dom.points.textContent = q.points + ' ' + tr(unitId, q.points === 1 ? 'common.exercise.point' : 'common.exercise.points');
        if (dom.qText) dom.qText.textContent = q.text;

        if (dom.submitBtn) {
          dom.submitBtn.disabled = true;
          dom.submitBtn.hidden = false;
          dom.submitBtn.textContent = tr(unitId, 'common.action.submit');
        }
        if (dom.nextBtn) {
          dom.nextBtn.hidden = true;
          var isLast = state.index === questions.length - 1;
          dom.nextBtn.innerHTML = isLast
            ? tr(unitId, 'common.action.finish') + ' <i class="fa-solid fa-check"></i>'
            : tr(unitId, 'common.action.next') + ' <i class="fa-solid fa-arrow-right"></i>';
        }

        if (q.options && q.options.length) {
          if (dom.inputArea) dom.inputArea.hidden = true;
          renderOptions(q);
        } else {
          if (dom.options) dom.options.innerHTML = '';
          renderInput(q);
        }
      }

      function renderOptions(q) {
        if (!dom.options) return;
        dom.options.innerHTML = '';
        var opts = q.type === 'ordering' ? shuffleArray(q.options.slice()) : q.options;
        var letters = ['A', 'B', 'C', 'D', 'E', 'F'];
        opts.forEach(function (opt, i) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'option-btn';
          btn.setAttribute('data-option', opt);
          btn.innerHTML = '<span class="option-marker">' + (letters[i] || (i + 1)) + '</span><span class="option-text">' + escapeHtml(opt) + '</span>';
          btn.addEventListener('click', function () { selectOption(btn, opt); });
          dom.options.appendChild(btn);
        });
      }

      function selectOption(btn, value) {
        if (state.answered) return;
        var all = dom.options.querySelectorAll('.option-btn');
        for (var i = 0; i < all.length; i++) all[i].classList.remove('selected');
        btn.classList.add('selected');
        state.selected = value;
        if (dom.submitBtn) dom.submitBtn.disabled = false;
      }

      function renderInput(q) {
        if (!dom.inputArea || !dom.freeInput) return;
        dom.inputArea.hidden = false;
        dom.freeInput.value = '';
        dom.freeInput.disabled = false;
        dom.freeInput.rows = q.type === 'shortAnswer' ? 2 : 3;
        dom.freeInput.placeholder = sharedState.lang === 'ar' ? 'اكتب إجابتك هنا...' : 'Type your answer here...';
        dom.freeInput.oninput = function () {
          state.text = dom.freeInput.value.trim();
          if (dom.submitBtn) dom.submitBtn.disabled = state.text.length === 0;
        };
      }

      function lockInput() {
        if (dom.freeInput) dom.freeInput.disabled = true;
        if (dom.options) {
          var all = dom.options.querySelectorAll('.option-btn');
          for (var i = 0; i < all.length; i++) all[i].disabled = true;
        }
      }

      function highlightOptions(q, picked) {
        if (!dom.options) return;
        var expected = normalize(q.correct);
        var chosen = normalize(picked);
        var all = dom.options.querySelectorAll('.option-btn');
        for (var i = 0; i < all.length; i++) {
          var btn = all[i];
          var val = normalize(btn.getAttribute('data-option'));
          btn.classList.remove('selected');
          if (val === expected) btn.classList.add('correct');
          else if (val === chosen) btn.classList.add('incorrect');
          else btn.classList.add('dimmed');
        }
      }

      function evaluate(q) {
        if (q.options && q.options.length) {
          return { correct: normalize(state.selected) === normalize(q.correct), userAnswer: state.selected };
        }
        if (q.acceptedAnswers && q.acceptedAnswers.length) {
          var user = normalize(state.text);
          if (!user) return { correct: false, userAnswer: state.text };
          var ok = q.acceptedAnswers.some(function (a) { return user.indexOf(normalize(a)) !== -1; });
          if (!ok) {
            var words = state.text.trim().split(/\s+/).filter(Boolean).length;
            if (q.type === 'shortAnswer' && words >= 3) ok = true;
            if (q.type === 'longAnswer' && words >= 5) ok = true;
          }
          return { correct: ok, userAnswer: state.text };
        }
        return { correct: false, userAnswer: state.text };
      }

      function showFeedback(result, q) {
        if (!dom.feedback) return;
        dom.feedback.hidden = false;
        dom.feedback.classList.remove('feedback-correct', 'feedback-incorrect');
        if (result.correct) {
          dom.feedback.classList.add('feedback-correct');
          if (dom.feedbackIcon) dom.feedbackIcon.innerHTML = '<i class="fa-solid fa-check"></i>';
          if (dom.feedbackVerdict) dom.feedbackVerdict.textContent = tr(unitId, 'common.feedback.correct');
        } else {
          dom.feedback.classList.add('feedback-incorrect');
          if (dom.feedbackIcon) dom.feedbackIcon.innerHTML = '<i class="fa-solid fa-xmark"></i>';
          if (dom.feedbackVerdict) dom.feedbackVerdict.textContent = tr(unitId, 'common.feedback.incorrect');
        }
        if (dom.feedbackExplanation) dom.feedbackExplanation.textContent = q.explanation || '';
        var showModel = Boolean(q.modelAnswer) && (!result.correct || !q.options);
        if (dom.feedbackModel && dom.feedbackModelText) {
          if (showModel) {
            dom.feedbackModel.hidden = false;
            var label = dom.feedbackModel.querySelector('.model-label');
            if (label) label.textContent = tr(unitId, 'common.feedback.modelAnswer') + ':';
            dom.feedbackModelText.textContent = q.modelAnswer;
          } else {
            dom.feedbackModel.hidden = true;
          }
        }
      }

      function submit() {
        if (state.answered) return;
        var q = questions[state.index];
        if (!q) return;
        if (q.options && q.options.length && !state.selected) return;
        if ((!q.options || !q.options.length) && !state.text) return;

        var result = evaluate(q);
        state.answered = true;
        state.answers.push({ number: q.number, correct: result.correct });
        if (result.correct) {
          state.correctCount += 1;
          state.score += q.points;
          if (dom.scorePill) dom.scorePill.textContent = String(state.score);
        }
        if (q.options && q.options.length) highlightOptions(q, state.selected);
        lockInput();
        showFeedback(result, q);
        if (dom.submitBtn) dom.submitBtn.hidden = true;
        if (dom.nextBtn) { dom.nextBtn.hidden = false; dom.nextBtn.focus(); }
      }

      function finish() {
        var totalPoints = questions.reduce(function (s, q) { return s + q.points; }, 0);
        var progress = loadProgress(unitId);
        progress.sections[sectionId] = {
          completed: true,
          score: state.score,
          total: totalPoints,
          correct: state.correctCount
        };
        progress.xp = Object.keys(progress.sections).reduce(function (sum, id) {
          var s = progress.sections[id];
          return sum + (s && s.completed ? s.score : 0);
        }, 0);
        saveProgress(unitId, progress);
        renderCompletion();
      }

      function renderCompletion() {
        var totalPoints = questions.reduce(function (s, q) { return s + q.points; }, 0);
        var container = document.getElementById('completionView');
        var subtitle = document.getElementById('completionSubtitle');
        var scoreVal = document.getElementById('completionScoreValue');
        var correctEl = document.getElementById('completionCorrect');
        var incorrectEl = document.getElementById('completionIncorrect');
        var retryBtn = document.getElementById('retrySectionBtn');
        var backBtn = document.getElementById('backToUnitBtn');
        var sectionName = tr(unitId, sectionId + '.name');

        if (subtitle) subtitle.textContent = trFormat(unitId, tr(unitId, 'common.completion.subtitle'), { section: sectionName });
        if (scoreVal) scoreVal.textContent = state.score + ' / ' + totalPoints;
        if (correctEl) correctEl.textContent = String(state.correctCount);
        if (incorrectEl) incorrectEl.textContent = String(questions.length - state.correctCount);
        if (retryBtn) retryBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> ' + tr(unitId, 'common.action.retry');
        if (backBtn) backBtn.innerHTML = '<i class="fa-solid fa-house"></i> ' + tr(unitId, 'common.action.backToUnit');

        var exerciseView = document.getElementById('exerciseView');
        if (exerciseView) exerciseView.hidden = true;
        if (container) container.hidden = false;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function next() {
        var isLast = state.index === questions.length - 1;
        if (isLast) { finish(); return; }
        state.index += 1;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function restart() {
        state.index = 0;
        state.selected = null;
        state.text = '';
        state.answered = false;
        state.correctCount = 0;
        state.score = 0;
        state.answers = [];
        if (dom.scorePill) dom.scorePill.textContent = '0';
        var completion = document.getElementById('completionView');
        var exercise = document.getElementById('exerciseView');
        if (completion) completion.hidden = true;
        if (exercise) exercise.hidden = false;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function exit() {
        window.location.href = 'unit-1.html';
      }

      if (dom.sectionName) dom.sectionName.textContent = tr(unitId, sectionId + '.name');
      if (dom.exitBtn) {
        dom.exitBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ' + tr(unitId, 'common.exercise.exit');
        dom.exitBtn.addEventListener('click', exit);
      }
      if (dom.submitBtn) dom.submitBtn.addEventListener('click', function (e) { e.preventDefault(); submit(); });
      if (dom.nextBtn) dom.nextBtn.addEventListener('click', function (e) { e.preventDefault(); next(); });

      var retryBtn = document.getElementById('retrySectionBtn');
      if (retryBtn) retryBtn.addEventListener('click', function (e) { e.preventDefault(); restart(); });

      var backBtn = document.getElementById('backToUnitBtn');
      if (backBtn) backBtn.addEventListener('click', function (e) { e.preventDefault(); exit(); });

      initLanguageSwitcher(function () {
        if (dom.sectionName) dom.sectionName.textContent = tr(unitId, sectionId + '.name');
        if (dom.exitBtn) dom.exitBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i> ' + tr(unitId, 'common.exercise.exit');
        renderQuestion();
      });

      renderQuestion();
    }
  };
})();
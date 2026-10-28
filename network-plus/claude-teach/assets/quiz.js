/* ===========================================================================
   quiz.js — reusable retrieval-practice quiz component.

   Shared across every lesson. Pairs with assets/lesson.css.

   Design constraints (see NOTES.md):
     - One shot per question. No changing an answer after committing: a
       commitment you can retract is not retrieval practice.
     - Feedback is immediate and explains WHY, not just right/wrong.
     - Every question cites the repo file it came from (CLAUDE.md quiz rule).
     - Scores roll up per exam domain, weighted by the real exam weights, so a
       diagnostic reports where study time should actually go.

   Usage:
     Quiz.mount('#quiz', {
       storageKey: 'diag-0001',          // optional; persists answers
       shuffle:    false,                // shuffle option order per question
       domains: {
         d1: { label: 'Networking Concepts', weight: 23 },
         ...
       },
       questions: [
         {
           domain:  'd1',
           stem:    'Question text',
           options: ['a', 'b', 'c', 'd'],
           answer:  0,                   // index into options
           why:     'Explanation shown after answering.',
           source:  'flashcards/1-networking-concepts/1.7-ipv4-addressing.md'
         }
       ],
       onComplete: (result) => {}        // optional
     });
   =========================================================================== */

(function (global) {
  'use strict';

  var REPO_BASE = '../../'; // claude-teach/lessons/ sits two levels below network-plus/

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function shuffled(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function Quiz(root, cfg) {
    this.root = root;
    this.cfg = cfg;
    this.questions = cfg.questions;
    this.domains = cfg.domains || {};
    this.answers = new Array(this.questions.length).fill(null);
    this.answered = 0;
    this.render();
    this.restore();
  }

  Quiz.prototype.render = function () {
    this.root.classList.add('quiz');
    this.root.innerHTML = '';

    // --- sticky progress bar ---
    var prog = el('div', 'quiz__progress');
    this.counter = el('span', null, '0 / ' + this.questions.length);
    this.bar = el('div', 'quiz__bar');
    this.barFill = el('div', 'quiz__bar-fill');
    this.bar.appendChild(this.barFill);
    prog.appendChild(this.counter);
    prog.appendChild(this.bar);
    this.scoreLive = el('span', null, '');
    prog.appendChild(this.scoreLive);
    this.root.appendChild(prog);

    // --- questions ---
    var self = this;
    this.questions.forEach(function (q, i) {
      self.root.appendChild(self.renderQuestion(q, i));
    });

    // --- results panel ---
    this.results = el('div', 'results');
    this.root.appendChild(this.results);
  };

  Quiz.prototype.renderQuestion = function (q, i) {
    var self = this;
    var wrap = el('section', 'q');
    wrap.id = 'q' + (i + 1);

    var head = el('div', 'q__head');
    head.appendChild(el('span', 'q__num', String(i + 1).padStart(2, '0')));
    var dom = this.domains[q.domain];
    if (dom) {
      head.appendChild(el('span', 'badge badge--' + q.domain, dom.label));
    }
    wrap.appendChild(head);

    wrap.appendChild(el('p', 'q__stem', q.stem));

    // Option order: pre-varied in the lesson data unless shuffle is on.
    var order = this.cfg.shuffle
      ? shuffled(q.options.map(function (_, k) { return k; }))
      : q.options.map(function (_, k) { return k; });

    var list = el('ul', 'q__opts');
    var buttons = [];

    order.forEach(function (origIdx) {
      var li = el('li');
      var btn = el('button', 'q__opt', q.options[origIdx]);
      btn.type = 'button';
      btn.dataset.idx = origIdx;
      btn.addEventListener('click', function () {
        self.commit(i, origIdx, buttons, fb, q);
      });
      buttons.push(btn);
      li.appendChild(btn);
      list.appendChild(li);
    });
    wrap.appendChild(list);

    var fb = el('div', 'q__feedback');
    wrap.appendChild(fb);

    this.questions[i]._buttons = buttons;
    this.questions[i]._fb = fb;
    return wrap;
  };

  Quiz.prototype.commit = function (i, chosen, buttons, fb, q) {
    if (this.answers[i] !== null) return; // one shot only
    this.answers[i] = chosen;
    this.answered++;
    this.reveal(i, chosen, buttons, fb, q);
    this.persist();
    this.updateProgress();
    if (this.answered === this.questions.length) this.finish();
  };

  Quiz.prototype.reveal = function (i, chosen, buttons, fb, q) {
    var right = chosen === q.answer;

    buttons.forEach(function (b) {
      var idx = Number(b.dataset.idx);
      b.disabled = true;
      if (idx === q.answer) b.classList.add('q__opt--correct');
      else if (idx === chosen) b.classList.add('q__opt--wrong');
    });

    fb.innerHTML = '';
    var verdict = el(
      'span',
      'q__verdict q__verdict--' + (right ? 'right' : 'wrong'),
      right ? 'Correct' : 'Not quite'
    );
    fb.appendChild(verdict);
    fb.appendChild(el('span', null, q.why));

    if (q.source) {
      var src = el('span', 'q__src');
      src.appendChild(document.createTextNode('Source: '));
      var a = el('a', null, q.source);
      a.href = REPO_BASE + q.source;
      src.appendChild(a);
      fb.appendChild(src);
    }

    fb.classList.add('is-shown');
    fb.classList.add(right ? 'q__feedback--right' : 'q__feedback--wrong');

    // Explanations are full of acronyms too — chip them if abbr.js is loaded.
    if (global.Abbr) global.Abbr.scan(fb);
  };

  Quiz.prototype.updateProgress = function () {
    var n = this.questions.length;
    this.counter.textContent = this.answered + ' / ' + n;
    this.barFill.style.width = (this.answered / n * 100) + '%';
    this.scoreLive.textContent = this.correctCount() + ' right';
  };

  Quiz.prototype.correctCount = function () {
    var self = this, c = 0;
    this.questions.forEach(function (q, i) {
      if (self.answers[i] === q.answer) c++;
    });
    return c;
  };

  /* Per-domain tally plus a weighted overall estimate. The weighted number is
     the useful one: getting every domain-4 question right matters less than
     domain 5, because the exam only gives domain 4 fourteen percent. */
  Quiz.prototype.breakdown = function () {
    var self = this, byDomain = {};

    Object.keys(this.domains).forEach(function (k) {
      byDomain[k] = { right: 0, total: 0, label: self.domains[k].label, weight: self.domains[k].weight || 0 };
    });

    this.questions.forEach(function (q, i) {
      var d = byDomain[q.domain];
      if (!d) return;
      d.total++;
      if (self.answers[i] === q.answer) d.right++;
    });

    var wSum = 0, wScore = 0;
    Object.keys(byDomain).forEach(function (k) {
      var d = byDomain[k];
      d.pct = d.total ? Math.round(d.right / d.total * 100) : null;
      if (d.total && d.weight) { wSum += d.weight; wScore += d.weight * (d.right / d.total); }
    });

    return {
      byDomain: byDomain,
      correct: this.correctCount(),
      total: this.questions.length,
      pct: Math.round(this.correctCount() / this.questions.length * 100),
      weightedPct: wSum ? Math.round(wScore / wSum * 100) : null
    };
  };

  Quiz.prototype.finish = function () {
    var r = this.breakdown();
    var box = this.results;
    box.innerHTML = '';

    box.appendChild(el('p', 'eyebrow', 'Diagnostic result'));

    var score = el('p', 'results__score');
    score.appendChild(document.createTextNode(r.pct + '%'));
    var small = el('small', null, '  ' + r.correct + ' of ' + r.total + ' correct');
    score.appendChild(small);
    box.appendChild(score);

    if (r.weightedPct !== null) {
      box.appendChild(
        el('p', null, 'Weighted by exam domain: ' + r.weightedPct + '%. Passing is 720/900 — roughly 75–80% of questions.')
      );
    }

    box.appendChild(el('h3', null, 'By domain'));

    var self = this;
    Object.keys(r.byDomain).forEach(function (k) {
      var d = r.byDomain[k];
      if (!d.total) return;
      var m = el('div', 'meter');
      m.appendChild(el('span', 'meter__label', d.label));
      var track = el('div', 'meter__track');
      var fill = el('div', 'meter__fill');
      fill.style.background = 'var(--' + k + ')';
      track.appendChild(fill);
      m.appendChild(track);
      m.appendChild(el('span', 'meter__val', d.right + '/' + d.total));
      box.appendChild(m);
      // animate after paint
      requestAnimationFrame(function () { fill.style.width = d.pct + '%'; });
    });

    this.renderLookups(box, r);

    var weak = Object.keys(r.byDomain)
      .filter(function (k) { return r.byDomain[k].total && r.byDomain[k].pct < 100; })
      .sort(function (a, b) { return r.byDomain[a].pct - r.byDomain[b].pct; });

    var next = el('div', 'callout callout--ask');
    next.appendChild(el('span', 'label', 'Next step'));
    var p = el('p');
    if (weak.length) {
      p.textContent =
        'Weakest first: ' +
        weak.slice(0, 3).map(function (k) { return r.byDomain[k].label + ' (' + r.byDomain[k].pct + '%)'; }).join(', ') +
        '. Tell your teacher this breakdown and lesson 0002 will target the worst of it.';
    } else {
      p.textContent =
        'Clean sweep. That means this diagnostic was too easy to locate your ceiling — ask your teacher for a harder sweep with multi-step scenario questions.';
    }
    next.appendChild(p);
    box.appendChild(next);

    box.classList.add('is-shown');
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (typeof this.cfg.onComplete === 'function') this.cfg.onComplete(r);
  };

  /* Acronyms the user had to expand. This is the second axis of the
     diagnostic: a bad score with no lookups is a concept problem, a decent
     score with many lookups is a vocabulary problem, and the two need
     completely different next lessons. */
  Quiz.prototype.renderLookups = function (box, r) {
    if (!global.Abbr) return;
    var terms = global.Abbr.lookups();

    var sec = el('div', 'lookups');
    sec.appendChild(el('h3', null, 'Acronyms you expanded'));

    if (!terms.length) {
      sec.appendChild(
        el('p', null,
          'None. So this score is a clean read on the concepts — the vocabulary was not in your way.')
      );
      box.appendChild(sec);
      return;
    }

    var verdict = r.pct >= 70
      ? 'You scored ' + r.pct + '% while leaning on ' + terms.length + ' lookup' +
        (terms.length === 1 ? '' : 's') +
        '. That points at vocabulary rather than concepts: you understand the ideas but the acronyms are not automatic yet. Drilling the glossary is cheaper and faster than re-studying the domains.'
      : 'You scored ' + r.pct + '% and expanded ' + terms.length + ' acronym' +
        (terms.length === 1 ? '' : 's') +
        '. Worth untangling which answers you lost to the terminology versus the underlying idea — tell your teacher and the next lesson can split them.';

    sec.appendChild(el('p', null, verdict));

    var list = el('ul', 'lookups__list');
    terms.forEach(function (t) { list.appendChild(el('li', null, t)); });
    sec.appendChild(list);

    box.appendChild(sec);
  };

  /* --- persistence: survives a reload so a lesson can be done in sittings --- */

  Quiz.prototype.persist = function () {
    if (!this.cfg.storageKey) return;
    try {
      localStorage.setItem('np-quiz:' + this.cfg.storageKey, JSON.stringify(this.answers));
    } catch (e) { /* private mode, file:// restrictions — degrade silently */ }
  };

  Quiz.prototype.restore = function () {
    if (!this.cfg.storageKey) return;
    var raw;
    try {
      raw = localStorage.getItem('np-quiz:' + this.cfg.storageKey);
    } catch (e) { return; }
    if (!raw) return;

    var saved;
    try { saved = JSON.parse(raw); } catch (e) { return; }
    if (!Array.isArray(saved) || saved.length !== this.questions.length) return;

    var self = this;
    saved.forEach(function (chosen, i) {
      if (chosen === null || chosen === undefined) return;
      var q = self.questions[i];
      self.answers[i] = chosen;
      self.answered++;
      self.reveal(i, chosen, q._buttons, q._fb, q);
    });

    if (this.answered) {
      this.updateProgress();
      this.addResetControl();
      if (this.answered === this.questions.length) this.finish();
    }
  };

  Quiz.prototype.addResetControl = function () {
    var self = this;
    var note = el('div', 'callout');
    note.appendChild(el('span', 'label', 'Resumed'));
    var p = el('p', null, 'Your previous answers were restored. ');
    var btn = el('button', 'q__opt', 'Start over');
    btn.type = 'button';
    btn.style.width = 'auto';
    btn.style.marginTop = '0.6rem';
    btn.addEventListener('click', function () {
      try { localStorage.removeItem('np-quiz:' + self.cfg.storageKey); } catch (e) {}
      location.reload();
    });
    note.appendChild(p);
    note.appendChild(btn);
    this.root.insertBefore(note, this.root.children[1]);
  };

  global.Quiz = {
    mount: function (selector, cfg) {
      var node = typeof selector === 'string' ? document.querySelector(selector) : selector;
      if (!node) throw new Error('Quiz.mount: no element matched ' + selector);
      return new Quiz(node, cfg);
    }
  };
})(window);

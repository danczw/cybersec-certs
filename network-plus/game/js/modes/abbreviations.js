const Abbreviations = (() => {
  let container;
  let sessionStats;
  let abbrevData = [];
  let mode = 'both';
  let activeKeyHandler = null;

  // Recall-first gate. Showing four options immediately only ever tests
  // recognition — you can pick the right answer without being able to produce
  // it. Hiding the options for a few seconds forces an attempt at free recall
  // first, which is what actually builds durable retention.
  const RECALL_KEY = 'netops_recall_delay';
  const RECALL_OPTIONS = [0, 2, 4, 6];
  let recallDelay = 4;
  let recallTimer = null;

  function clearKeyHandler() {
    if (activeKeyHandler) {
      document.removeEventListener('keydown', activeKeyHandler);
      activeKeyHandler = null;
    }
  }

  function clearRecallTimer() {
    if (recallTimer) {
      clearInterval(recallTimer);
      recallTimer = null;
    }
  }

  function loadRecallDelay() {
    try {
      const v = parseInt(localStorage.getItem(RECALL_KEY), 10);
      if (RECALL_OPTIONS.includes(v)) recallDelay = v;
    } catch (e) { /* storage unavailable — keep the default */ }
  }

  function saveRecallDelay() {
    try {
      localStorage.setItem(RECALL_KEY, String(recallDelay));
    } catch (e) { /* no-op */ }
  }

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    if (abbrevData.length === 0) {
      abbrevData = typeof ABBREV_DATA !== 'undefined' ? ABBREV_DATA : [];
    }
    loadRecallDelay();
    showNext();
  }

  function showNext() {
    clearKeyHandler();
    clearRecallTimer();
    container.innerHTML = '';
    if (abbrevData.length < 4) {
      container.innerHTML = '<p>Abbreviation data not loaded.</p>';
      return;
    }

    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const modeBar = document.createElement('div');
    modeBar.className = 'subnet-difficulty-select';
    modeBar.innerHTML = `
      <button class="subnet-diff-btn ${mode === 'both' ? 'active' : ''}" data-mode="both">MIXED</button>
      <button class="subnet-diff-btn ${mode === 'abbrev-to-full' ? 'active' : ''}" data-mode="abbrev-to-full">ABBREV → FULL</button>
      <button class="subnet-diff-btn ${mode === 'full-to-abbrev' ? 'active' : ''}" data-mode="full-to-abbrev">FULL → ABBREV</button>
      <button class="subnet-diff-btn ${mode === 'type-it' ? 'active' : ''}" data-mode="type-it">TYPE IT</button>
    `;
    modeBar.querySelectorAll('.subnet-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        mode = btn.dataset.mode;
        showNext();
      });
    });
    container.appendChild(modeBar);

    const recallBar = document.createElement('div');
    recallBar.className = 'subnet-difficulty-select recall-select';
    recallBar.innerHTML = `
      <span class="recall-label">THINK FIRST</span>
      ${RECALL_OPTIONS.map(s => `
        <button class="subnet-diff-btn ${recallDelay === s ? 'active' : ''}" data-delay="${s}">${s === 0 ? 'OFF' : s + 's'}</button>
      `).join('')}
    `;
    recallBar.querySelectorAll('.subnet-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        recallDelay = parseInt(btn.dataset.delay, 10);
        saveRecallDelay();
        showNext();
      });
    });
    container.appendChild(recallBar);

    let direction;
    if (mode === 'both') {
      const r = Math.random();
      direction = r < 0.33 ? 'abbrev-to-full' : r < 0.66 ? 'full-to-abbrev' : 'type-it';
    } else {
      direction = mode;
    }

    const targetIdx = Math.floor(Math.random() * abbrevData.length);
    const target = abbrevData[targetIdx];

    if (direction === 'type-it') {
      renderTypeQuestion(target);
    } else {
      renderMultipleChoice(target, targetIdx, direction);
    }
  }

  function renderTypeQuestion(target) {
    const wrapper = document.createElement('div');
    wrapper.className = 'question-container';
    wrapper.style.animation = 'fadeIn 0.3s ease';

    wrapper.innerHTML = `
      <div class="question-header">
        <div class="question-meta">
          <span class="difficulty-badge hard">TYPE IT</span>
          <span class="domain-badge">ABBREV → FULL</span>
        </div>
        <span class="question-number">#${sessionStats.answered + 1}</span>
      </div>
      <div class="question-card">
        <div class="question-text">Type the full name for <code>${UI.escapeHtml(target.abbrev)}</code></div>
        <div class="subnet-inputs">
          <div class="subnet-field">
            <label>FULL NAME</label>
            <input type="text" id="abbrev-type-input" autocomplete="off" placeholder="Type the full name...">
          </div>
          <button class="subnet-submit" id="abbrev-type-check">CHECK</button>
        </div>
        <div id="abbrev-type-feedback"></div>
      </div>
    `;

    container.appendChild(wrapper);

    const input = document.getElementById('abbrev-type-input');
    const checkBtn = document.getElementById('abbrev-type-check');
    let answered = false;

    function check() {
      if (answered) return;
      answered = true;

      const userAnswer = input.value.trim();
      const correct = userAnswer.toLowerCase() === target.full.toLowerCase();

      const result = Engine.recordAnswer(`abbrev-type-${target.abbrev}`, 1, 3, correct);
      sessionStats.answered++;
      if (correct) {
        sessionStats.correct++;
        sessionStats.xpEarned += result.xp;
      }

      input.classList.add(correct ? 'valid' : 'invalid');
      input.disabled = true;
      checkBtn.disabled = true;
      UI.updateHeader();

      if (correct) {
        const rect = checkBtn.getBoundingClientRect();
        UI.spawnParticles(rect.left + rect.width / 2, rect.top);
      }

      const feedback = document.getElementById('abbrev-type-feedback');
      feedback.innerHTML = `
        <div class="explanation-card">
          <h4>// ${correct ? 'CORRECT' : 'INCORRECT'}${result.xp ? ' +' + result.xp + ' XP' : ''}</h4>
          <p><strong>${UI.escapeHtml(target.abbrev)}</strong> = ${UI.escapeHtml(target.full)}</p>
          ${target.source ? `<p class="source-ref">Source: ${UI.escapeHtml(target.source)}</p>` : ''}
        </div>
      `;

      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-btn';
      nextBtn.textContent = 'NEXT →';
      nextBtn.addEventListener('click', showNext);
      feedback.appendChild(nextBtn);
      nextBtn.focus();

      setTimeout(() => {
        activeKeyHandler = (e) => {
          if (e.key === 'Enter') showNext();
        };
        document.addEventListener('keydown', activeKeyHandler);
      }, 300);
    }

    checkBtn.addEventListener('click', check);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        check();
      }
    });
    input.focus();
  }

  function renderMultipleChoice(target, targetIdx, direction) {
    const distractors = UI.shuffleArray(abbrevData.filter((_, i) => i !== targetIdx)).slice(0, 3);

    let question, correctAnswer, choices;
    if (direction === 'abbrev-to-full') {
      question = `What does <code>${UI.escapeHtml(target.abbrev)}</code> stand for?`;
      correctAnswer = target.full;
      choices = UI.shuffleArray([target.full, ...distractors.map(d => d.full)]);
    } else {
      question = `What is the abbreviation for <strong>${UI.escapeHtml(target.full)}</strong>?`;
      correctAnswer = target.abbrev;
      choices = UI.shuffleArray([target.abbrev, ...distractors.map(d => d.abbrev)]);
    }

    const gated = recallDelay > 0;

    const wrapper = document.createElement('div');
    wrapper.className = 'question-container';
    wrapper.style.animation = 'fadeIn 0.3s ease';

    wrapper.innerHTML = `
      <div class="question-header">
        <div class="question-meta">
          <span class="difficulty-badge medium">ABBREVIATIONS</span>
          <span class="domain-badge">${direction === 'abbrev-to-full' ? 'ABBREV → FULL' : 'FULL → ABBREV'}</span>
        </div>
        <span class="question-number">#${sessionStats.answered + 1}</span>
      </div>
      <div class="question-card">
        <div class="question-text">${question}</div>
        ${gated ? `
          <div class="recall-gate">
            <p class="recall-prompt">Answer it in your head first — say it out loud if you can.</p>
            <div class="recall-bar"><div class="recall-bar-fill"></div></div>
            <div class="recall-actions">
              <button class="subnet-submit recall-reveal">GOT IT — SHOW OPTIONS</button>
              <span class="recall-count">${recallDelay}</span>
            </div>
          </div>
        ` : ''}
        <div class="answers-list"${gated ? ' hidden' : ''}>
          ${choices.map(c => `<button class="answer-btn" data-answer="${UI.escapeHtml(c)}">${UI.escapeHtml(c)}</button>`).join('')}
        </div>
      </div>
    `;

    let answered = false;
    const buttons = wrapper.querySelectorAll('.answer-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const selected = btn.dataset.answer;
        const correct = selected === correctAnswer;

        const result = Engine.recordAnswer(`abbrev-${target.abbrev}`, 1, 2, correct);
        sessionStats.answered++;
        if (correct) {
          sessionStats.correct++;
          sessionStats.xpEarned += result.xp;
        }

        buttons.forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.answer === correctAnswer) {
            b.classList.add(correct ? 'correct' : 'show-correct');
          }
        });
        if (!correct) btn.classList.add('incorrect');

        if (correct) {
          const rect = btn.getBoundingClientRect();
          UI.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        UI.updateHeader();

        const exp = document.createElement('div');
        exp.className = 'explanation-card';
        exp.innerHTML = `
          <h4>// ${correct ? 'CORRECT' : 'INCORRECT'}${result.xp ? ' +' + result.xp + ' XP' : ''}</h4>
          <p><strong>${UI.escapeHtml(target.abbrev)}</strong> = ${UI.escapeHtml(target.full)}</p>
          ${target.source ? `<p class="source-ref">Source: ${UI.escapeHtml(target.source)}</p>` : ''}
        `;
        wrapper.querySelector('.question-card').appendChild(exp);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'NEXT →';
        nextBtn.addEventListener('click', showNext);
        wrapper.appendChild(nextBtn);

        setTimeout(() => {
          activeKeyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') showNext();
          };
          document.addEventListener('keydown', activeKeyHandler);
        }, 200);
      });
    });

    container.appendChild(wrapper);

    if (gated) startRecallGate(wrapper);
  }

  /* Holds the options back for recallDelay seconds. Revealing early is allowed
     and expected — the moment you have the answer there is nothing left to
     gain from waiting, and forcing a full wait just trains impatience. */
  function startRecallGate(wrapper) {
    const gate = wrapper.querySelector('.recall-gate');
    const fill = wrapper.querySelector('.recall-bar-fill');
    const count = wrapper.querySelector('.recall-count');
    const list = wrapper.querySelector('.answers-list');
    const revealBtn = wrapper.querySelector('.recall-reveal');

    const total = recallDelay * 10; // tenths of a second
    let remaining = total;

    function reveal() {
      clearRecallTimer();
      clearKeyHandler();
      if (gate) gate.remove();
      list.hidden = false;
    }

    fill.style.width = '0%';
    recallTimer = setInterval(() => {
      remaining--;
      fill.style.width = ((total - remaining) / total * 100) + '%';
      count.textContent = Math.max(0, Math.ceil(remaining / 10));
      if (remaining <= 0) reveal();
    }, 100);

    revealBtn.addEventListener('click', reveal);

    activeKeyHandler = (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        reveal();
      }
    };
    document.addEventListener('keydown', activeKeyHandler);
  }

  return { start };
})();

const Abbreviations = (() => {
  let container;
  let sessionStats;
  let abbrevData = [];
  let mode = 'both';
  let activeKeyHandler = null;

  function clearKeyHandler() {
    if (activeKeyHandler) {
      document.removeEventListener('keydown', activeKeyHandler);
      activeKeyHandler = null;
    }
  }

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    if (abbrevData.length === 0) {
      abbrevData = typeof ABBREV_DATA !== 'undefined' ? ABBREV_DATA : [];
    }
    showNext();
  }

  function showNext() {
    clearKeyHandler();
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
        <div class="answers-list">
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
  }

  return { start };
})();

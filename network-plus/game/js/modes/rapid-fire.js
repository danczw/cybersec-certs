const RapidFire = (() => {
  let container;
  let sessionStats;
  let allConcepts;
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
    if (!allConcepts) {
      allConcepts = [];
      for (const domain of GAME_DATA.domains) {
        for (const obj of domain.objectives) {
          for (const concept of obj.concepts) {
            allConcepts.push({ ...concept, domainId: domain.id, objectiveId: obj.id });
          }
        }
      }
    }
    showNext();
  }

  function showNext() {
    clearKeyHandler();
    container.innerHTML = '';

    const concept = Engine.selectNextConcept(allConcepts, Engine.DOMAINS);
    if (!concept) {
      container.innerHTML = '<p>No concepts available.</p>';
      return;
    }

    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const wrapper = document.createElement('div');
    wrapper.className = 'question-container';
    wrapper.style.animation = 'fadeIn 0.3s ease';

    const answers = UI.shuffleArray([concept.answer, ...concept.distractors]);
    const diffLabel = Engine.DIFF_LABELS[concept.difficulty] || 'medium';

    wrapper.innerHTML = `
      <div class="question-header">
        <div class="question-meta">
          <span class="difficulty-badge ${diffLabel}">${diffLabel.toUpperCase()}</span>
          <span class="domain-badge">D${concept.domainId} · ${concept.objectiveId}</span>
        </div>
        <span class="question-number">#${sessionStats.answered + 1}</span>
      </div>
      <div class="question-card">
        <div class="question-text">${UI.escapeHtml(concept.question)}</div>
        <div class="answers-list">
          ${answers.map(a => `<button class="answer-btn" data-answer="${UI.escapeHtml(a)}">${UI.escapeHtml(a)}</button>`).join('')}
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
        const correct = selected === concept.answer;

        const result = Engine.recordAnswer(concept.id, concept.domainId, concept.difficulty, correct);
        sessionStats.answered++;
        if (correct) {
          sessionStats.correct++;
          sessionStats.xpEarned += result.xp;
        }

        buttons.forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.answer === concept.answer) {
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
          <p><strong>${UI.escapeHtml(concept.answer)}</strong></p>
          ${concept.explanation ? `<p>${UI.escapeHtml(concept.explanation)}</p>` : ''}
        `;
        wrapper.querySelector('.question-card').appendChild(exp);

        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'NEXT →';
        nextBtn.addEventListener('click', showNext);
        wrapper.appendChild(nextBtn);

        setTimeout(() => {
          activeKeyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              showNext();
            }
          };
          document.addEventListener('keydown', activeKeyHandler);
        }, 200);
      });
    });

    container.appendChild(wrapper);
  }

  return { start };
})();

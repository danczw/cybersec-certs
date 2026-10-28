const UI = (() => {
  const _escDiv = document.createElement('div');

  function updateHeader() {
    const s = Engine.getState();
    document.getElementById('xp-value').textContent = s.player.totalXP;
    document.getElementById('level-value').textContent = s.player.level;
    document.getElementById('streak-value').textContent = s.player.streak;
  }

  /* Intentionally does nothing. The particle burst belonged to the previous
     arcade treatment; the game now shares the lessons' paper-and-ink design,
     where correctness is signalled typographically instead. Kept as a no-op so
     the call sites across the mode files stay untouched and a future design
     can reinstate a quieter version in one place. */
  function spawnParticles() {}

  function renderSessionStats(sessionStats, opts = {}) {
    const el = document.createElement('div');
    el.className = 'session-stats';
    const accuracy = sessionStats.answered > 0 ? Math.round(sessionStats.correct / sessionStats.answered * 100) : 0;
    let html = `
      <div class="session-stat"><div class="stat-number">${sessionStats.answered}</div><div class="stat-desc">ANSWERED</div></div>
      <div class="session-stat"><div class="stat-number">${accuracy}%</div><div class="stat-desc">ACCURACY</div></div>
      <div class="session-stat"><div class="stat-number">+${sessionStats.xpEarned}</div><div class="stat-desc">SESSION XP</div></div>
    `;
    if (opts.showStreak !== false) {
      html += `<div class="session-stat"><div class="stat-number">${Engine.getState().player.streak}</div><div class="stat-desc">STREAK</div></div>`;
    }
    el.innerHTML = html;
    return el;
  }

  function renderMasteryBars(container) {
    const domainTotals = {};
    for (const domain of GAME_DATA.domains) {
      domainTotals[domain.id] = domain.objectives.reduce((s, o) => s + o.concepts.length, 0);
    }
    let html = '<h3>DOMAIN MASTERY</h3>';
    for (const d of Engine.DOMAINS) {
      const mastery = Engine.getDomainMastery(d.id, domainTotals[d.id] || 0);
      html += `
        <div class="mastery-bar-container">
          <div class="mastery-label">
            <span>${d.id}. ${d.name} (${d.weight}%)</span>
            <span>${mastery}%</span>
          </div>
          <div class="mastery-bar">
            <div class="mastery-fill" style="width: ${mastery}%; background: var(--d${d.id})"></div>
          </div>
        </div>`;
    }
    container.innerHTML = html;
  }

  function renderBackButton() {
    const btn = document.createElement('button');
    btn.className = 'back-btn';
    btn.innerHTML = '← BACK';
    btn.addEventListener('click', () => { window.location.hash = '#/home'; });
    return btn;
  }

  function shuffleArray(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function escapeHtml(str) {
    _escDiv.textContent = str;
    return _escDiv.innerHTML;
  }

  return {
    updateHeader,
    spawnParticles,
    renderSessionStats,
    renderMasteryBars,
    renderBackButton,
    shuffleArray,
    escapeHtml
  };
})();

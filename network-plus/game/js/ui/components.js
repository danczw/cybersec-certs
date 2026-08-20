const UI = (() => {
  const particleContainer = document.getElementById('particle-container');
  const _escDiv = document.createElement('div');

  function updateHeader() {
    const s = Engine.getState();
    document.getElementById('xp-value').textContent = s.player.totalXP;
    document.getElementById('level-value').textContent = s.player.level;
    document.getElementById('streak-value').textContent = s.player.streak;
  }

  function spawnParticles(x, y, count = 12, color = 'var(--accent)') {
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const angle = (Math.PI * 2 * i) / count;
      const dist = 40 + Math.random() * 60;
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.background = color;
      p.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--dy', Math.sin(angle) * dist + 'px');
      particleContainer.appendChild(p);
      setTimeout(() => p.remove(), 1000);
    }
  }

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
    let html = '<h3>// DOMAIN MASTERY</h3>';
    for (const d of Engine.DOMAINS) {
      const mastery = Engine.getDomainMastery(d.id, domainTotals[d.id] || 0);
      html += `
        <div class="mastery-bar-container">
          <div class="mastery-label">
            <span>${d.id}. ${d.name} (${d.weight}%)</span>
            <span>${mastery}%</span>
          </div>
          <div class="mastery-bar">
            <div class="mastery-fill" style="width: ${mastery}%"></div>
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

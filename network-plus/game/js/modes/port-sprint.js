const PortSprint = (() => {
  let container;
  let sessionStats;
  let combo = 0;
  let questionTimer = null;
  let nextTimer = null;
  let questionStart = 0;
  let currentAnswer = null;
  let answered = false;

  const PORTS = [
    { protocol: 'FTP (data)', port: '20', transport: 'TCP' },
    { protocol: 'FTP (control)', port: '21', transport: 'TCP' },
    { protocol: 'SSH', port: '22', transport: 'TCP' },
    { protocol: 'SFTP', port: '22', transport: 'TCP' },
    { protocol: 'Telnet', port: '23', transport: 'TCP' },
    { protocol: 'SMTP', port: '25', transport: 'TCP' },
    { protocol: 'SMTP (TLS)', port: '587', transport: 'TCP' },
    { protocol: 'DNS', port: '53', transport: 'UDP' },
    { protocol: 'DHCP (server)', port: '67', transport: 'UDP' },
    { protocol: 'DHCP (client)', port: '68', transport: 'UDP' },
    { protocol: 'TFTP', port: '69', transport: 'UDP' },
    { protocol: 'HTTP', port: '80', transport: 'TCP' },
    { protocol: 'HTTPS', port: '443', transport: 'TCP' },
    { protocol: 'NTP', port: '123', transport: 'UDP' },
    { protocol: 'SNMP (queries)', port: '161', transport: 'UDP' },
    { protocol: 'SNMP (traps)', port: '162', transport: 'UDP' },
    { protocol: 'LDAP', port: '389', transport: 'TCP' },
    { protocol: 'LDAPS', port: '636', transport: 'TCP' },
    { protocol: 'SMB', port: '445', transport: 'TCP' },
    { protocol: 'Syslog', port: '514', transport: 'UDP' },
    { protocol: 'MS-SQL', port: '1433', transport: 'TCP' },
    { protocol: 'RDP', port: '3389', transport: 'TCP' },
    { protocol: 'SIP', port: '5060', transport: 'TCP' },
    { protocol: 'SIP (encrypted)', port: '5061', transport: 'TCP' },
  ];

  const PROTOCOL_ALIASES = {
    'ftp': ['ftp (data)', 'ftp (control)'],
    'ftp data': ['ftp (data)'],
    'ftp control': ['ftp (control)'],
    'smtp': ['smtp', 'smtp (tls)'],
    'smtp tls': ['smtp (tls)'],
    'dhcp': ['dhcp (server)', 'dhcp (client)'],
    'dhcp server': ['dhcp (server)'],
    'dhcp client': ['dhcp (client)'],
    'snmp': ['snmp (queries)', 'snmp (traps)'],
    'snmp queries': ['snmp (queries)'],
    'snmp traps': ['snmp (traps)'],
    'sip': ['sip', 'sip (encrypted)'],
    'sip encrypted': ['sip (encrypted)'],
    'sftp': ['sftp'],
    'ssh': ['ssh'],
    'dns': ['dns'],
    'tftp': ['tftp'],
    'http': ['http'],
    'https': ['https'],
    'ntp': ['ntp'],
    'ldap': ['ldap'],
    'ldaps': ['ldaps'],
    'smb': ['smb'],
    'cifs': ['smb'],
    'syslog': ['syslog'],
    'ms-sql': ['ms-sql'],
    'mssql': ['ms-sql'],
    'rdp': ['rdp'],
    'telnet': ['telnet'],
  };

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0, bestCombo: 0, totalTime: 0 };
    combo = 0;
    renderModeSelect();
  }

  function renderModeSelect() {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const div = document.createElement('div');
    div.className = 'port-sprint-container';
    div.style.animation = 'fadeIn 0.3s ease';
    div.innerHTML = `
      <h2 class="port-sprint-title">PORT SPRINT</h2>
      <p class="port-sprint-subtitle">Pure recall. No multiple choice. Type fast.</p>
      <div class="port-sprint-modes">
        <button class="port-sprint-mode-btn" data-mode="port">
          <span class="mode-icon">Protocol &rarr; Port</span>
          <span class="mode-desc">See the protocol, type the port number</span>
        </button>
        <button class="port-sprint-mode-btn" data-mode="protocol">
          <span class="mode-icon">Port &rarr; Protocol</span>
          <span class="mode-desc">See the port number, type the protocol name</span>
        </button>
        <button class="port-sprint-mode-btn" data-mode="mixed">
          <span class="mode-icon">Mixed</span>
          <span class="mode-desc">Both directions, randomly alternating</span>
        </button>
      </div>
    `;

    div.querySelectorAll('.port-sprint-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => startRound(btn.dataset.mode));
    });

    container.appendChild(div);
  }

  function startRound(mode) {
    sessionStats = { answered: 0, correct: 0, xpEarned: 0, bestCombo: 0, totalTime: 0 };
    combo = 0;
    showQuestion(mode);
  }

  function renderModeBackButton() {
    const btn = document.createElement('button');
    btn.className = 'back-btn';
    btn.innerHTML = '← BACK';
    btn.addEventListener('click', () => {
      if (questionTimer) { clearInterval(questionTimer); questionTimer = null; }
      if (nextTimer) { clearTimeout(nextTimer); nextTimer = null; }
      renderModeSelect();
    });
    return btn;
  }

  function showQuestion(mode) {
    if (questionTimer) { clearInterval(questionTimer); questionTimer = null; }
    answered = false;
    container.innerHTML = '';
    container.appendChild(renderModeBackButton());

    const statsEl = UI.renderSessionStats(sessionStats, { showStreak: false });
    container.appendChild(statsEl);

    const entry = PORTS[Math.floor(Math.random() * PORTS.length)];
    let direction = mode;
    if (mode === 'mixed') direction = Math.random() < 0.5 ? 'port' : 'protocol';

    let prompt, expectedCheck;
    if (direction === 'port') {
      prompt = entry.protocol;
      currentAnswer = { value: entry.port, display: `${entry.transport} ${entry.port}` };
      expectedCheck = (input) => input.trim() === entry.port;
    } else {
      prompt = `${entry.transport} ${entry.port}`;
      currentAnswer = { value: entry.protocol, display: entry.protocol };
      expectedCheck = (input) => {
        const normalized = input.trim().toLowerCase();
        if (normalized === entry.protocol.toLowerCase()) return true;
        if (PROTOCOL_ALIASES[normalized] && PROTOCOL_ALIASES[normalized].includes(entry.protocol.toLowerCase())) return true;
        return false;
      };
    }

    const div = document.createElement('div');
    div.className = 'port-sprint-container';
    div.style.animation = 'fadeIn 0.2s ease';

    const comboClass = combo >= 10 ? 'combo-fire' : combo >= 5 ? 'combo-hot' : combo >= 3 ? 'combo-warm' : '';
    const comboText = combo > 0 ? `<span class="port-combo ${comboClass}">${combo}x COMBO</span>` : '';

    div.innerHTML = `
      <div class="port-sprint-hud">
        <span class="port-sprint-timer" id="ps-timer">0.0s</span>
        ${comboText}
        <span class="port-sprint-count">#${sessionStats.answered + 1}</span>
      </div>
      <div class="port-sprint-prompt">
        <span class="port-sprint-direction">${direction === 'port' ? 'PORT NUMBER FOR' : 'PROTOCOL FOR'}</span>
        <code class="port-sprint-value">${UI.escapeHtml(prompt)}</code>
      </div>
      <div class="port-sprint-input-area">
        <input type="text" class="port-sprint-input" id="ps-input" autocomplete="off" spellcheck="false" placeholder="${direction === 'port' ? 'Type port number...' : 'Type protocol name...'}">
        <div class="port-sprint-feedback" id="ps-feedback"></div>
      </div>
      <div class="port-sprint-hint">Press Enter to submit &middot; Esc to skip</div>
    `;

    container.appendChild(div);

    const input = document.getElementById('ps-input');
    const timerEl = document.getElementById('ps-timer');
    const feedback = document.getElementById('ps-feedback');

    input.focus();
    questionStart = Date.now();

    questionTimer = setInterval(() => {
      const elapsed = ((Date.now() - questionStart) / 1000).toFixed(1);
      timerEl.textContent = elapsed + 's';
      if (elapsed > 10) timerEl.classList.add('warning');
      if (elapsed > 20) timerEl.classList.add('danger');
    }, 100);

    function submit() {
      if (answered) return;
      answered = true;
      clearInterval(questionTimer);

      const elapsed = Date.now() - questionStart;
      const val = input.value;
      const correct = expectedCheck(val);

      sessionStats.answered++;
      sessionStats.totalTime += elapsed;

      if (correct) {
        sessionStats.correct++;
        combo++;
        if (combo > sessionStats.bestCombo) sessionStats.bestCombo = combo;

        const speedBonus = elapsed < 3000 ? 15 : elapsed < 5000 ? 10 : 5;
        const comboBonus = Math.min(combo, 10) * 2;
        const xp = speedBonus + comboBonus;
        sessionStats.xpEarned += xp;

        const state = Engine.getState();
        state.player.totalXP += xp;
        state.player.level = Engine.getLevel(state.player.totalXP);
        state.player.streak++;
        if (state.player.streak > state.player.bestStreak) state.player.bestStreak = state.player.streak;

        input.classList.add('valid');
        feedback.innerHTML = `<span class="port-correct">CORRECT +${xp} XP</span> <span class="port-speed">${(elapsed / 1000).toFixed(1)}s</span>`;

        const rect = input.getBoundingClientRect();
        UI.spawnParticles(rect.left + rect.width / 2, rect.top);
      } else {
        combo = 0;
        const state = Engine.getState();
        state.player.streak = 0;

        input.classList.add('invalid');
        feedback.innerHTML = `<span class="port-incorrect">INCORRECT</span> <span class="port-answer">${UI.escapeHtml(currentAnswer.display)}</span>`;
      }

      UI.updateHeader();
      input.disabled = true;

      nextTimer = setTimeout(() => showQuestion(mode), correct ? 1200 : 2500);
    }

    function skip() {
      if (answered) return;
      answered = true;
      clearInterval(questionTimer);
      combo = 0;
      sessionStats.answered++;

      input.classList.add('invalid');
      feedback.innerHTML = `<span class="port-skipped">SKIPPED</span> <span class="port-answer">${UI.escapeHtml(currentAnswer.display)}</span>`;
      input.disabled = true;

      nextTimer = setTimeout(() => showQuestion(mode), 2000);
    }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submit();
      if (e.key === 'Escape') skip();
    });
  }

  return { start };
})();

const LayerDrop = (() => {
  let container;
  let timerInterval = null;
  let cleanupHandler = null;

  const LAYERS = [
    { num: 7, name: 'Application' },
    { num: 6, name: 'Presentation' },
    { num: 5, name: 'Session' },
    { num: 4, name: 'Transport' },
    { num: 3, name: 'Network' },
    { num: 2, name: 'Data Link' },
    { num: 1, name: 'Physical' },
  ];

  const ITEMS = [
    // Layer 7 — Application
    { text: 'HTTP', layer: 7, hint: 'Web browsing protocol' },
    { text: 'HTTPS', layer: 7, hint: 'Secure web browsing protocol' },
    { text: 'FTP', layer: 7, hint: 'File transfer protocol' },
    { text: 'SMTP', layer: 7, hint: 'Email sending protocol' },
    { text: 'DNS', layer: 7, hint: 'Domain name resolution' },
    { text: 'DHCP', layer: 7, hint: 'Automatic IP address assignment' },
    { text: 'SNMP', layer: 7, hint: 'Network device monitoring' },
    { text: 'Telnet', layer: 7, hint: 'Unsecure remote terminal access' },
    { text: 'SSH', layer: 7, hint: 'Secure remote terminal access' },
    { text: 'POP3', layer: 7, hint: 'Email retrieval protocol' },
    { text: 'IMAP', layer: 7, hint: 'Email access protocol (server-synced)' },
    { text: 'LDAP', layer: 7, hint: 'Directory services protocol' },
    { text: 'NTP', layer: 7, hint: 'Time synchronization protocol' },
    { text: 'TFTP', layer: 7, hint: 'Simplified file transfer (no auth)' },
    { text: 'RDP', layer: 7, hint: 'Remote desktop protocol' },

    // Layer 6 — Presentation
    { text: 'JPEG', layer: 6, hint: 'Lossy image format' },
    { text: 'GIF', layer: 6, hint: 'Animated image format' },
    { text: 'PNG', layer: 6, hint: 'Lossless image format' },
    { text: 'ASCII', layer: 6, hint: 'Character encoding standard' },
    { text: 'Unicode', layer: 6, hint: 'Universal character encoding' },
    { text: 'MPEG', layer: 6, hint: 'Video compression format' },
    { text: 'TLS/SSL encryption', layer: 6, hint: 'Encrypts data for secure transport' },
    { text: 'Data compression', layer: 6, hint: 'Reduces data size for transmission' },
    { text: 'Character encoding', layer: 6, hint: 'Translates characters to binary' },

    // Layer 5 — Session
    { text: 'NetBIOS', layer: 5, hint: 'Legacy session-layer API for LANs' },
    { text: 'RPC', layer: 5, hint: 'Remote procedure call' },
    { text: 'Session establishment', layer: 5, hint: 'Opening a communication session' },
    { text: 'Session teardown', layer: 5, hint: 'Closing a communication session' },
    { text: 'Half-duplex/full-duplex control', layer: 5, hint: 'Managing dialog direction' },
    { text: 'PPTP', layer: 5, hint: 'Point-to-point tunneling protocol' },
    { text: 'SIP', layer: 5, hint: 'Session initiation protocol (VoIP)' },

    // Layer 4 — Transport
    { text: 'TCP', layer: 4, hint: 'Reliable, connection-oriented transport' },
    { text: 'UDP', layer: 4, hint: 'Fast, connectionless transport' },
    { text: 'Port numbers', layer: 4, hint: 'Identify services/applications' },
    { text: 'Segments', layer: 4, hint: 'TCP data units' },
    { text: 'Datagrams', layer: 4, hint: 'UDP data units' },
    { text: 'Flow control', layer: 4, hint: 'Prevents sender from overwhelming receiver' },
    { text: 'Windowing', layer: 4, hint: 'Controls how much data sent before ACK' },
    { text: 'Three-way handshake', layer: 4, hint: 'SYN, SYN-ACK, ACK' },

    // Layer 3 — Network
    { text: 'IP', layer: 3, hint: 'Logical addressing and routing' },
    { text: 'ICMP', layer: 3, hint: 'Error messaging (ping)' },
    { text: 'OSPF', layer: 3, hint: 'Link-state routing protocol' },
    { text: 'BGP', layer: 3, hint: 'Border gateway protocol (internet routing)' },
    { text: 'RIP', layer: 3, hint: 'Distance-vector routing protocol' },
    { text: 'Routers', layer: 3, hint: 'Forward packets between networks' },
    { text: 'Packets', layer: 3, hint: 'Layer 3 data units' },
    { text: 'Logical addressing', layer: 3, hint: 'IP addresses' },
    { text: 'ARP', layer: 3, hint: 'Resolves IP to MAC address' },
    { text: 'NAT', layer: 3, hint: 'Translates private to public IPs' },
    { text: 'TTL', layer: 3, hint: 'Time to live — limits packet hops' },
    { text: 'Traceroute', layer: 3, hint: 'Maps the path packets take' },

    // Layer 2 — Data Link
    { text: 'Ethernet', layer: 2, hint: 'LAN technology standard (802.3)' },
    { text: 'MAC addresses', layer: 2, hint: 'Physical hardware addresses' },
    { text: 'Switches', layer: 2, hint: 'Forward frames by MAC address' },
    { text: 'Frames', layer: 2, hint: 'Layer 2 data units' },
    { text: 'STP', layer: 2, hint: 'Spanning Tree Protocol — prevents loops' },
    { text: 'VLANs', layer: 2, hint: 'Virtual LANs — logical segmentation' },
    { text: 'PPP', layer: 2, hint: 'Point-to-Point Protocol for WAN links' },
    { text: 'NIC', layer: 2, hint: 'Network interface card (operates at L2)' },

    // Layer 1 — Physical
    { text: 'Cables', layer: 1, hint: 'Physical transmission medium' },
    { text: 'Hubs', layer: 1, hint: 'Repeats signal to all ports' },
    { text: 'Repeaters', layer: 1, hint: 'Amplifies/regenerates signal' },
    { text: 'Bits', layer: 1, hint: 'Layer 1 data units (1s and 0s)' },
    { text: 'RJ-45 connector', layer: 1, hint: 'Ethernet cable connector' },
    { text: 'LC connector', layer: 1, hint: 'Fiber optic connector' },
    { text: 'SC connector', layer: 1, hint: 'Fiber optic push-snap connector' },
    { text: 'Wi-Fi radio signals', layer: 1, hint: 'Wireless electromagnetic waves' },
    { text: 'Electrical signals', layer: 1, hint: 'Copper wire transmission' },
    { text: 'Fiber optic light', layer: 1, hint: 'Light pulses through glass' },
  ];

  const BASE_TIME = 8;
  const MIN_TIME = 3;
  const TIME_DECREASE = 0.3;
  const DECREASE_INTERVAL = 5;
  const MAX_LIVES = 3;

  let gameState;

  function cleanup() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    if (cleanupHandler) {
      window.removeEventListener('hashchange', cleanupHandler);
      cleanupHandler = null;
    }
  }

  function start(main) {
    container = main;
    cleanup();
    cleanupHandler = cleanup;
    window.addEventListener('hashchange', cleanupHandler);
    startGame();
  }

  function startGame() {
    gameState = {
      lives: MAX_LIVES,
      score: 0,
      streak: 0,
      longestStreak: 0,
      correct: 0,
      total: 0,
      items: UI.shuffleArray([...ITEMS]),
      index: 0,
      timeAllowed: BASE_TIME,
    };
    showItem();
  }

  function getTimeAllowed() {
    const reductions = Math.floor(gameState.correct / DECREASE_INTERVAL);
    return Math.max(MIN_TIME, BASE_TIME - reductions * TIME_DECREASE);
  }

  function getStreakMultiplier() {
    if (gameState.streak >= 10) return 2;
    if (gameState.streak >= 5) return 1.5;
    return 1;
  }

  function showItem() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }

    if (gameState.lives <= 0) { showGameOver(); return; }
    if (gameState.index >= gameState.items.length) {
      gameState.items = UI.shuffleArray([...ITEMS]);
      gameState.index = 0;
    }

    const item = gameState.items[gameState.index];
    const timeAllowed = getTimeAllowed();
    let timeLeft = timeAllowed;
    let answered = false;

    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const hud = document.createElement('div');
    hud.className = 'session-stats';
    hud.innerHTML = `
      <div class="session-stat"><div class="stat-number" style="color:#ff4757">${'❤'.repeat(gameState.lives)}${'🖤'.repeat(MAX_LIVES - gameState.lives)}</div><div class="stat-desc">LIVES</div></div>
      <div class="session-stat"><div class="stat-number">${gameState.score}</div><div class="stat-desc">SCORE</div></div>
      <div class="session-stat"><div class="stat-number">${gameState.streak}${gameState.streak >= 5 ? ' ×' + getStreakMultiplier() : ''}</div><div class="stat-desc">STREAK</div></div>
      <div class="session-stat"><div class="stat-number">${gameState.total}</div><div class="stat-desc">ITEMS</div></div>
    `;
    container.appendChild(hud);

    const card = document.createElement('div');
    card.className = 'question-card';
    card.style.animation = 'fadeIn 0.2s ease';
    card.innerHTML = `
      <div style="text-align:center;margin-bottom:0.5rem">
        <span style="font-size:0.75rem;text-transform:uppercase;opacity:0.6;letter-spacing:0.1em">Classify this item</span>
      </div>
      <div style="text-align:center;font-size:1.6rem;font-weight:700;margin-bottom:0.5rem;color:#0f8">${UI.escapeHtml(item.text)}</div>
      <div style="text-align:center;font-size:0.85rem;opacity:0.7;margin-bottom:0.75rem">${UI.escapeHtml(item.hint)}</div>
      <div style="position:relative;height:6px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden">
        <div id="ld-timer-bar" style="height:100%;width:100%;background:#0f8;border-radius:3px;transition:width 0.1s linear"></div>
      </div>
      <div id="ld-timer-text" style="text-align:center;margin-top:0.3rem;font-size:0.8rem;font-variant-numeric:tabular-nums">${timeAllowed.toFixed(1)}s</div>
    `;
    container.appendChild(card);

    const layerGrid = document.createElement('div');
    layerGrid.style.cssText = 'display:flex;flex-direction:column;gap:0.4rem;margin-top:1rem';

    for (const layer of LAYERS) {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.style.cssText = 'width:100%;text-align:left;padding:0.7rem 1rem';
      btn.dataset.layer = layer.num;
      btn.innerHTML = `<strong>${layer.num}</strong> &nbsp;${layer.name}`;
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        clearInterval(timerInterval);
        handleAnswer(layer.num, item, timeLeft, timeAllowed, layerGrid);
      });
      layerGrid.appendChild(btn);
    }
    container.appendChild(layerGrid);

    const timerBar = document.getElementById('ld-timer-bar');
    const timerText = document.getElementById('ld-timer-text');

    timerInterval = setInterval(() => {
      timeLeft -= 0.1;
      if (timeLeft <= 0) {
        timeLeft = 0;
        clearInterval(timerInterval);
        if (!answered) {
          answered = true;
          handleTimeout(item, layerGrid);
        }
      }
      const pct = (timeLeft / timeAllowed) * 100;
      timerBar.style.width = pct + '%';
      if (pct < 30) timerBar.style.background = '#ff4757';
      else if (pct < 60) timerBar.style.background = '#ffa502';
      timerText.textContent = timeLeft.toFixed(1) + 's';
    }, 100);
  }

  function handleAnswer(chosen, item, timeLeft, timeAllowed, layerGrid) {
    const correct = chosen === item.layer;
    gameState.total++;

    const buttons = layerGrid.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
      const l = parseInt(btn.dataset.layer);
      if (l === item.layer) btn.classList.add('correct');
      if (l === chosen && !correct) btn.classList.add('incorrect');
      btn.style.pointerEvents = 'none';
    });

    if (correct) {
      gameState.correct++;
      gameState.streak++;
      if (gameState.streak > gameState.longestStreak) gameState.longestStreak = gameState.streak;

      const speedBonus = timeLeft / timeAllowed;
      const baseXP = 10;
      const multiplier = getStreakMultiplier();
      const xp = Math.round(baseXP * (0.5 + speedBonus * 0.5) * multiplier);
      gameState.score += xp;

      Engine.recordAnswer('layer-drop-' + gameState.index, 1, 1, true);

      const correctBtn = layerGrid.querySelector(`[data-layer="${item.layer}"]`);
      const rect = correctBtn.getBoundingClientRect();
      UI.spawnParticles(rect.left + rect.width / 2, rect.top);

      showFeedback(`+${xp} XP`, true);
    } else {
      gameState.lives--;
      gameState.streak = 0;
      Engine.recordAnswer('layer-drop-' + gameState.index, 1, 1, false);
      showFeedback(`Layer ${item.layer} (${LAYERS.find(l => l.num === item.layer).name})`, false);
    }

    gameState.index++;
    setTimeout(() => showItem(), correct ? 800 : 1500);
  }

  function handleTimeout(item, layerGrid) {
    gameState.total++;
    gameState.lives--;
    gameState.streak = 0;

    const buttons = layerGrid.querySelectorAll('.answer-btn');
    buttons.forEach(btn => {
      const l = parseInt(btn.dataset.layer);
      if (l === item.layer) btn.classList.add('correct');
      btn.style.pointerEvents = 'none';
    });

    Engine.recordAnswer('layer-drop-' + gameState.index, 1, 1, false);
    showFeedback(`TIME UP — Layer ${item.layer} (${LAYERS.find(l => l.num === item.layer).name})`, false);

    gameState.index++;
    setTimeout(() => showItem(), 1800);
  }

  function showFeedback(message, correct) {
    const fb = document.createElement('div');
    fb.style.cssText = `text-align:center;margin-top:0.75rem;font-weight:700;font-size:1.1rem;color:${correct ? '#0f8' : '#ff4757'};animation:fadeIn 0.2s ease`;
    fb.textContent = correct ? '✓ ' + message : '✗ ' + message;
    container.appendChild(fb);
  }

  function showGameOver() {
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const accuracy = gameState.total > 0 ? Math.round((gameState.correct / gameState.total) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'explanation-card';
    card.style.animation = 'fadeIn 0.3s ease';
    card.innerHTML = `
      <h2 style="text-align:center;color:#ff4757;margin-bottom:1rem">GAME OVER</h2>
      <div class="session-stats" style="margin-bottom:1.5rem">
        <div class="session-stat"><div class="stat-number">${gameState.score}</div><div class="stat-desc">TOTAL SCORE</div></div>
        <div class="session-stat"><div class="stat-number">${gameState.correct}/${gameState.total}</div><div class="stat-desc">CLASSIFIED</div></div>
        <div class="session-stat"><div class="stat-number">${accuracy}%</div><div class="stat-desc">ACCURACY</div></div>
        <div class="session-stat"><div class="stat-number">${gameState.longestStreak}</div><div class="stat-desc">BEST STREAK</div></div>
      </div>
      <button class="answer-btn" id="ld-play-again" style="width:100%;font-weight:700;font-size:1.1rem;padding:1rem">PLAY AGAIN</button>
    `;
    container.appendChild(card);

    document.getElementById('ld-play-again').addEventListener('click', startGame);
    UI.updateHeader();
  }

  return { start };
})();

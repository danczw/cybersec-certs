const RouteSelector = (() => {
  let container;
  let sessionStats;
  let currentDifficulty = 1;

  const ROUTE_CODES = { C: 'Directly connected', S: 'Static', D: 'EIGRP', O: 'OSPF', R: 'RIP' };
  const AD_VALUES = { C: 0, S: 1, D: 90, O: 110, R: 120 };
  const INTERFACES = ['GigabitEthernet0/0', 'GigabitEthernet0/1', 'Serial0/3/0', 'Serial0/3/1', 'Ethernet1/0', 'Ethernet1/1'];

  const DIFFICULTIES = [
    { level: 1, name: 'Longest Prefix Match' },
    { level: 2, name: 'Route Selection' },
    { level: 3, name: 'Label the Entry' },
  ];

  const AD_REFERENCE = `
    <details style="margin-top:1rem">
      <summary class="subnet-reference-toggle">ADMINISTRATIVE DISTANCE REFERENCE</summary>
      <table class="binary-ref-table" style="margin-top:0.5rem">
        <thead><tr><th>Source</th><th>AD</th><th>Code</th></tr></thead>
        <tbody>
          <tr><td>Directly connected</td><td>0</td><td>C</td></tr>
          <tr><td>Static</td><td>1</td><td>S</td></tr>
          <tr><td>EIGRP</td><td>90</td><td>D</td></tr>
          <tr><td>OSPF</td><td>110</td><td>O</td></tr>
          <tr><td>RIP</td><td>120</td><td>R</td></tr>
        </tbody>
      </table>
    </details>`;

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    renderDifficultySelect();
  }

  function renderDifficultySelect() {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const div = document.createElement('div');
    div.className = 'route-container';
    div.style.animation = 'fadeIn 0.3s ease';
    div.innerHTML = `
      <h2 class="route-title">ROUTE SELECTOR</h2>
      <p class="route-subtitle">Pick the winning route. Think like a router.</p>
      <div class="route-difficulty-select"></div>
    `;

    const btnContainer = div.querySelector('.route-difficulty-select');
    for (const d of DIFFICULTIES) {
      const btn = document.createElement('button');
      btn.className = 'subnet-diff-btn' + (d.level === currentDifficulty ? ' active' : '');
      btn.textContent = `L${d.level}: ${d.name}`;
      btn.addEventListener('click', () => {
        currentDifficulty = d.level;
        showProblem();
      });
      btnContainer.appendChild(btn);
    }

    container.appendChild(div);
  }

  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function randChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randIP() { return `${randInt(10, 192)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`; }


  function generatePrefixProblem() {
    const a = randInt(10, 192);
    const b = randInt(1, 254);
    const c = randInt(1, 254);
    const d = randInt(1, 254);

    const dest = `${a}.${b}.${c}.${d}`;

    // Compute subnet for /28: network address containing d
    const subnetBlock = Math.floor(d / 16) * 16;

    // Routes that DO match the destination (varying specificity)
    const matching = [
      { network: `${a}.0.0.0`, prefix: 8 },
      { network: `${a}.${b}.0.0`, prefix: 16 },
      { network: `${a}.${b}.${c}.0`, prefix: 24 },
      { network: `${a}.${b}.${c}.${subnetBlock}`, prefix: 28 },
    ];

    // Near-miss routes: same network, different prefix (tricky!)
    // Or same prefix, off-by-one in an octet
    const otherB = b === 254 ? b - 1 : b + 1;
    const otherC = c === 254 ? c - 1 : c + 1;
    const wrongSubnet = subnetBlock >= 240 ? subnetBlock - 16 : subnetBlock + 16;
    const nonMatching = [
      { network: `${a}.${otherB}.0.0`, prefix: 16 },
      { network: `${a}.${b}.${otherC}.0`, prefix: 24 },
      { network: `${a}.${b}.${c}.${wrongSubnet}`, prefix: 28 },
      { network: `${a}.${otherB}.${c}.0`, prefix: 24 },
    ];

    // Pick 2 matching and 2 non-matching (total 4 routes)
    const pickedMatching = UI.shuffleArray(matching).slice(0, 2);
    const pickedNon = UI.shuffleArray(nonMatching).slice(0, 2);

    const bestRoute = pickedMatching.reduce((prev, cur) => cur.prefix > prev.prefix ? cur : prev);

    const allRoutes = [...pickedMatching, ...pickedNon].map(r => {
      const code = randChoice(Object.keys(ROUTE_CODES));
      return {
        code, network: r.network, prefix: r.prefix,
        ad: AD_VALUES[code], metric: randInt(1, 10),
        nextHop: randIP(), iface: randChoice(INTERFACES),
        best: r === bestRoute
      };
    });

    return { routes: UI.shuffleArray(allRoutes), destination: dest, reason: `Longest matching prefix: /${bestRoute.prefix} (non-matching routes ignored regardless of prefix length)` };
  }

  function generateRouteSelectionProblem() {
    const variant = randInt(1, 5);
    const a = randInt(10, 192);
    const b = randInt(1, 254);
    const c = randInt(1, 254);
    const d = randInt(1, 254);
    const dest = `${a}.${b}.${c}.${d}`;
    const otherC = c === 254 ? c - 1 : c + 1;
    const otherB = b === 254 ? b - 1 : b + 1;

    const routes = [];

    if (variant === 1) {
      // Pure AD — all match same prefix, lowest AD wins
      const network = `${a}.${b}.${c}.0`;
      const codes = Object.keys(ROUTE_CODES).sort(() => Math.random() - 0.5).slice(0, 4);
      codes.forEach(code => {
        routes.push({ code, network, prefix: 24, ad: AD_VALUES[code], metric: randInt(1, 10), nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      });
      const bestIdx = routes.reduce((bi, r, i) => r.ad < routes[bi].ad ? i : bi, 0);
      routes[bestIdx].best = true;
      return { routes: UI.shuffleArray(routes), destination: dest, reason: `All match same prefix — lowest AD wins: ${routes[bestIdx].ad} (${ROUTE_CODES[routes[bestIdx].code]})` };
    }

    if (variant === 2) {
      // Non-matching trap — lowest AD route doesn't match destination
      const network = `${a}.${b}.${c}.0`;
      const codes = Object.keys(ROUTE_CODES).filter(x => x !== 'C').sort(() => Math.random() - 0.5).slice(0, 3);
      codes.forEach(code => {
        routes.push({ code, network, prefix: 24, ad: AD_VALUES[code], metric: randInt(1, 10), nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      });
      routes.push({ code: 'C', network: `${a}.${b}.${otherC}.0`, prefix: 24, ad: 0, metric: 0, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      const matching = routes.filter(r => r.network === network);
      const bestIdx = matching.reduce((bi, r, i) => r.ad < matching[bi].ad ? i : bi, 0);
      matching[bestIdx].best = true;
      return { routes: UI.shuffleArray(routes), destination: dest, reason: `Directly connected route to .${otherC}.0 doesn't match → lowest AD among matching: ${matching[bestIdx].ad}` };
    }

    if (variant === 3) {
      // Same AD, metric decides
      const network = `${a}.${b}.${c}.0`;
      const code = randChoice(['O', 'R', 'D']);
      const metrics = [randInt(1, 5), randInt(6, 15), randInt(16, 30)];
      metrics.forEach(m => {
        routes.push({ code, network, prefix: 24, ad: AD_VALUES[code], metric: m, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      });
      const bestIdx = routes.reduce((bi, r, i) => r.metric < routes[bi].metric ? i : bi, 0);
      routes[bestIdx].best = true;
      return { routes: UI.shuffleArray(routes), destination: dest, reason: `Same AD (${AD_VALUES[code]}) — lowest metric wins: ${routes[bestIdx].metric}` };
    }

    if (variant === 4) {
      // Prefix + AD — different prefix lengths, longest matching prefix wins over lower AD
      routes.push({ code: 'C', network: `${a}.${b}.0.0`, prefix: 16, ad: 0, metric: 0, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      const code = randChoice(['R', 'O', 'D']);
      routes.push({ code, network: `${a}.${b}.${c}.0`, prefix: 24, ad: AD_VALUES[code], metric: randInt(1, 5), nextHop: randIP(), iface: randChoice(INTERFACES), best: true });
      routes.push({ code: 'S', network: `${a}.${otherB}.0.0`, prefix: 16, ad: 1, metric: 0, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
      return { routes: UI.shuffleArray(routes), destination: dest, reason: `Longest matching prefix (/24) wins over lower AD — prefix is checked first` };
    }

    // Variant 5: Full combined — trap + prefix + AD + metric
    const code = randChoice(['O', 'R', 'D']);
    routes.push({ code, network: `${a}.${b}.${c}.0`, prefix: 24, ad: AD_VALUES[code], metric: randInt(1, 5), nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
    routes.push({ code, network: `${a}.${b}.${c}.0`, prefix: 24, ad: AD_VALUES[code], metric: randInt(6, 15), nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
    routes.push({ code: 'C', network: `${a}.${b}.${otherC}.0`, prefix: 24, ad: 0, metric: 0, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
    routes.push({ code: 'S', network: `${a}.${b}.0.0`, prefix: 16, ad: 1, metric: 0, nextHop: randIP(), iface: randChoice(INTERFACES), best: false });
    // Best: among matching /24 routes with same AD, lowest metric wins
    const matching24 = routes.filter(r => r.network === `${a}.${b}.${c}.0` && r.prefix === 24);
    const bestRoute = matching24.reduce((br, r) => r.metric < br.metric ? r : br);
    bestRoute.best = true;
    return { routes: UI.shuffleArray(routes), destination: dest, reason: `Trap ignored → /24 beats /16 → same AD (${AD_VALUES[code]}) → lowest metric (${bestRoute.metric}) wins` };
  }

  function formatRouteEntry(r) {
    return `${r.code}  ${r.network}/${r.prefix}  [${r.ad}/${r.metric}]  via ${r.nextHop},  ${r.iface}`;
  }

  function renderModeBackButton() {
    const btn = document.createElement('button');
    btn.className = 'back-btn';
    btn.innerHTML = '← BACK';
    btn.addEventListener('click', renderDifficultySelect);
    return btn;
  }

  function showProblem() {
    container.innerHTML = '';
    container.appendChild(renderModeBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    if (currentDifficulty === 3) {
      showLabelProblem();
      return;
    }

    let problem;
    if (currentDifficulty === 1) problem = generatePrefixProblem();
    else problem = generateRouteSelectionProblem();

    const div = document.createElement('div');
    div.className = 'route-container';
    div.style.animation = 'fadeIn 0.3s ease';

    div.innerHTML = `
      <div class="route-problem">
        <h3>// ${DIFFICULTIES[currentDifficulty - 1].name.toUpperCase()}</h3>
        <div class="route-prompt">
          Destination: <code>${problem.destination}</code>
        </div>
        <div class="route-prompt" style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-secondary)">Which route wins?</div>
        <div class="route-table" id="route-choices"></div>
        <div id="route-feedback"></div>
        ${AD_REFERENCE}
      </div>
    `;

    const choicesEl = div.querySelector('#route-choices');
    problem.routes.forEach((r, i) => {
      const btn = document.createElement('button');
      btn.className = 'route-entry-btn';
      btn.innerHTML = `<code>${UI.escapeHtml(formatRouteEntry(r))}</code>`;
      btn.addEventListener('click', () => handleSelection(problem, i, div));
      choicesEl.appendChild(btn);
    });

    container.appendChild(div);
  }

  function handleSelection(problem, selectedIdx, div) {
    const buttons = div.querySelectorAll('.route-entry-btn');
    const feedbackEl = div.querySelector('#route-feedback');
    const selected = problem.routes[selectedIdx];
    const correct = selected.best;

    sessionStats.answered++;
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      btn.classList.add('disabled');
      if (problem.routes[i].best) btn.classList.add('route-correct');
      if (i === selectedIdx && !correct) btn.classList.add('route-incorrect');
    });

    if (correct) {
      sessionStats.correct++;
      const xp = currentDifficulty >= 3 ? 25 : 15;
      sessionStats.xpEarned += xp;
      const state = Engine.getState();
      state.player.totalXP += xp;
      state.player.level = Engine.getLevel(state.player.totalXP);
      state.player.streak++;
      if (state.player.streak > state.player.bestStreak) state.player.bestStreak = state.player.streak;

      feedbackEl.innerHTML = `<div class="subnet-result correct">CORRECT +${xp} XP — ${UI.escapeHtml(problem.reason)}</div>`;
      const rect = buttons[selectedIdx].getBoundingClientRect();
      UI.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      const state = Engine.getState();
      state.player.streak = 0;
      feedbackEl.innerHTML = `<div class="subnet-result incorrect">INCORRECT — ${UI.escapeHtml(problem.reason)}</div>`;
    }

    UI.updateHeader();

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.textContent = 'NEXT →';
    nextBtn.addEventListener('click', showProblem);
    feedbackEl.appendChild(nextBtn);

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', keyHandler); showProblem(); }
    };
    setTimeout(() => document.addEventListener('keydown', keyHandler), 200);
  }

  function showLabelProblem() {
    const code = randChoice(Object.keys(ROUTE_CODES));
    const network = `${randInt(10, 192)}.${randInt(0, 255)}.${randInt(0, 255)}.0`;
    const prefix = randChoice([8, 16, 24, 28, 30]);
    const ad = AD_VALUES[code];
    const metric = randInt(1, 15);
    const nextHop = randIP();
    const iface = randChoice(INTERFACES);

    const fields = [
      { id: 'code', label: 'Route Code', value: code, hint: ROUTE_CODES[code] },
      { id: 'subnet', label: 'Subnet ID', value: `${network}/${prefix}` },
      { id: 'ad', label: 'Administrative Distance', value: String(ad) },
      { id: 'metric', label: 'Metric', value: String(metric) },
      { id: 'nexthop', label: 'Next Hop', value: nextHop },
      { id: 'iface', label: 'Outgoing Interface', value: iface },
    ];

    const entry = `${code}  ${network}/${prefix}  [${ad}/${metric}]  via ${nextHop},  ${iface}`;

    const div = document.createElement('div');
    div.className = 'route-container';
    div.style.animation = 'fadeIn 0.3s ease';

    div.innerHTML = `
      <div class="route-problem">
        <h3>// LABEL THE ENTRY</h3>
        <div class="route-entry-display"><code>${UI.escapeHtml(entry)}</code></div>
        <div class="route-label-grid" id="label-grid"></div>
        <button class="subnet-submit" id="label-submit">CHECK</button>
        <div id="label-feedback"></div>
        ${AD_REFERENCE}
      </div>
    `;

    const grid = div.querySelector('#label-grid');
    const shuffled = UI.shuffleArray([...fields]);
    shuffled.forEach(f => {
      const row = document.createElement('div');
      row.className = 'route-label-row';
      row.innerHTML = `
        <span class="route-label-value"><code>${UI.escapeHtml(f.value)}</code></span>
        <select class="route-label-select" data-field="${f.id}">
          <option value="">— select —</option>
          ${fields.map(opt => `<option value="${opt.id}">${opt.label}</option>`).join('')}
        </select>
      `;
      grid.appendChild(row);
    });

    div.querySelector('#label-submit').addEventListener('click', () => {
      const selects = div.querySelectorAll('.route-label-select');
      let allCorrect = true;
      let correctCount = 0;

      selects.forEach((sel, i) => {
        const expected = shuffled[i].id;
        if (sel.value === expected) {
          sel.classList.add('valid');
          correctCount++;
        } else {
          sel.classList.add('invalid');
          allCorrect = false;
        }
        sel.disabled = true;
      });

      sessionStats.answered++;
      const feedbackEl = div.querySelector('#label-feedback');

      if (allCorrect) {
        sessionStats.correct++;
        const xp = 30;
        sessionStats.xpEarned += xp;
        const state = Engine.getState();
        state.player.totalXP += xp;
        state.player.level = Engine.getLevel(state.player.totalXP);
        state.player.streak++;
        if (state.player.streak > state.player.bestStreak) state.player.bestStreak = state.player.streak;
        feedbackEl.innerHTML = `<div class="subnet-result correct">ALL CORRECT +${xp} XP</div>`;
      } else {
        const state = Engine.getState();
        state.player.streak = 0;
        feedbackEl.innerHTML = `<div class="subnet-result incorrect">${correctCount}/${fields.length} correct</div>`;
      }

      UI.updateHeader();

      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-btn';
      nextBtn.textContent = 'NEXT →';
      nextBtn.addEventListener('click', showProblem);
      feedbackEl.appendChild(nextBtn);
    });

    container.appendChild(div);
  }

  return { start };
})();

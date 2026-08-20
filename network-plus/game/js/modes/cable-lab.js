const CableLab = (() => {
  let container;
  let sessionStats;
  let currentDifficulty = 1;

  const DIFFICULTIES = [
    { level: 1, name: 'Identify the Connector' },
    { level: 2, name: 'Match the Standard' },
    { level: 3, name: 'Full Scenario' },
  ];

  const CONNECTORS = [
    { name: 'RJ11', type: 'copper', spec: '6P2C', use: 'Analog telephone, DSL', lock: 'Clip' },
    { name: 'RJ45', type: 'copper', spec: '8P8C', use: 'Ethernet', lock: 'Clip' },
    { name: 'F-connector', type: 'copper', spec: 'Single conductor', use: 'Cable modem (coax)', lock: 'Threaded screw' },
    { name: 'BNC', type: 'copper', spec: 'Single conductor', use: 'WAN / coax', lock: 'Bayonet twist' },
    { name: 'SC', type: 'fiber', spec: 'Subscriber Connector', use: 'Data centers, fiber links', lock: 'Push-snap' },
    { name: 'LC', type: 'fiber', spec: 'Local Connector', use: 'High-density fiber, SFP', lock: 'Top clip' },
    { name: 'ST', type: 'fiber', spec: 'Straight Tip', use: 'Older fiber installs', lock: 'Bayonet push-twist' },
    { name: 'MPO', type: 'fiber', spec: 'Multi-fiber Push On', use: '12 fibers in one connector', lock: 'Push-snap' },
  ];

  const STANDARDS = [
    { name: '1000BASE-T', speed: '1 Gbps', media: 'Twisted-pair copper', connector: 'RJ45', distance: '100m', minCat: 'Cat 5' },
    { name: '10GBASE-T', speed: '10 Gbps', media: 'Twisted-pair copper', connector: 'RJ45', distance: '100m', minCat: 'Cat 6a' },
    { name: '1000BASE-SX', speed: '1 Gbps', media: 'Multimode fiber (short wavelength)', connector: 'LC or SC', distance: '550m' },
  ];

  const DISTRACTOR_MEDIA = ['Single-mode fiber', 'Coaxial (RG-6)', 'Twinaxial', 'Multimode fiber (short wavelength)', 'Twisted-pair copper'];
  const DISTRACTOR_SPEEDS = ['100 Mbps', '1 Gbps', '10 Gbps', '40 Gbps', '100 Gbps'];
  const DISTRACTOR_DISTANCES = ['5m', '100m', '550m', '2 km', '100 km'];

  const FIBER_TYPES = [
    { name: 'Multimode', range: 'Up to ~2 km', source: 'LED (inexpensive)', core: 'Larger core', modes: 'Multiple light paths' },
    { name: 'Single-mode', range: 'Up to 100 km', source: 'Laser or intense LED', core: 'Smaller core', modes: 'One light path' },
  ];

  const CABLE_TYPES = [
    { name: 'Twisted pair (UTP/STP)', type: 'copper', maxDist: '100m', use: 'LAN Ethernet', susceptible: 'EMI (mitigated by twist)' },
    { name: 'Coaxial (RG-6)', type: 'copper', maxDist: 'Varies', use: 'Cable modem/internet', susceptible: 'Less than UTP' },
    { name: 'Twinaxial', type: 'copper', maxDist: '5m', use: '10 Gbps Ethernet, SFP+', susceptible: 'Low latency, limited range' },
    { name: 'Multimode fiber', type: 'fiber', maxDist: '~2 km', use: 'Short-range, inexpensive', susceptible: 'Not EMI susceptible' },
    { name: 'Single-mode fiber', type: 'fiber', maxDist: '100 km', use: 'Long-range, backbone', susceptible: 'Not EMI susceptible' },
  ];

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    renderDifficultySelect();
  }

  function renderDifficultySelect() {
    currentDifficulty = null;
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';
    div.innerHTML = `
      <h2 class="route-title">CABLE LAB</h2>
      <p class="route-subtitle">Match cables, connectors, and standards to requirements.</p>
      <div class="route-difficulty-select"></div>
    `;

    const btnContainer = div.querySelector('.route-difficulty-select');
    for (const d of DIFFICULTIES) {
      const btn = document.createElement('button');
      btn.className = 'subnet-diff-btn' + (d.level === currentDifficulty ? ' active' : '');
      btn.textContent = `L${d.level}: ${d.name}`;
      btn.addEventListener('click', () => { currentDifficulty = d.level; showProblem(); });
      btnContainer.appendChild(btn);
    }

    container.appendChild(div);
  }

  function randChoice(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

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

    if (currentDifficulty === 1) showConnectorProblem();
    else if (currentDifficulty === 2) showStandardProblem();
    else showScenarioProblem();
  }

  function showConnectorProblem() {
    const questionTypes = [
      () => {
        const c = randChoice(CONNECTORS);
        return { question: `Which connector is described as: "${c.spec}", used for "${c.use}", with ${c.lock} lock mechanism?`, answer: c.name, options: CONNECTORS.map(x => x.name) };
      },
      () => {
        const c = randChoice(CONNECTORS);
        return { question: `What lock mechanism does the ${c.name} connector use?`, answer: c.lock, options: [...new Set(CONNECTORS.map(x => x.lock))] };
      },
      () => {
        const c = randChoice(CONNECTORS);
        return { question: `What is the ${c.name} connector typically used for?`, answer: c.use, options: CONNECTORS.map(x => x.use) };
      },
      () => {
        const fiber = FIBER_TYPES[Math.floor(Math.random() * 2)];
        return { question: `Which fiber type has "${fiber.range}" range and uses "${fiber.source}"?`, answer: fiber.name, options: FIBER_TYPES.map(x => x.name) };
      },
    ];

    const prob = randChoice(questionTypes)();
    renderMultipleChoice(prob);
  }

  function showStandardProblem() {
    const questionTypes = [
      () => {
        const s = randChoice(STANDARDS);
        return { question: `What speed does ${s.name} provide?`, answer: s.speed, options: [...new Set(STANDARDS.map(x => x.speed))] };
      },
      () => {
        const s = randChoice(STANDARDS);
        return { question: `What media type does ${s.name} use?`, answer: s.media, options: STANDARDS.map(x => x.media) };
      },
      () => {
        const s = STANDARDS.find(x => x.minCat);
        return { question: `What is the minimum cable category for ${s.name}?`, answer: s.minCat, options: ['Cat 5', 'Cat 5e', 'Cat 6', 'Cat 6a'] };
      },
      () => {
        const c = randChoice(CABLE_TYPES);
        return { question: `What is the maximum distance for ${c.name}?`, answer: c.maxDist, options: [...new Set(CABLE_TYPES.map(x => x.maxDist))] };
      },
    ];

    const prob = randChoice(questionTypes)();
    renderMultipleChoice(prob);
  }

  function showScenarioProblem() {
    const scenarios = [
      {
        scenario: 'You need to connect two buildings on a campus 500m apart at 1 Gbps.',
        question: 'Which cable type and standard?',
        answer: 'Multimode fiber — 1000BASE-SX',
        options: ['Twisted pair — 1000BASE-T', 'Multimode fiber — 1000BASE-SX', 'Single-mode fiber', 'Twinaxial — 10GBASE-T'],
        explanation: 'Twisted pair maxes at 100m. Multimode supports up to 550m at 1 Gbps (1000BASE-SX).'
      },
      {
        scenario: 'You need a 10 Gbps connection between two switches in the same rack, under 5 meters.',
        question: 'What is the most cost-effective cable choice?',
        answer: 'Twinaxial (SFP+ DAC)',
        options: ['Twinaxial (SFP+ DAC)', 'Single-mode fiber', 'Cat 6a twisted pair — 10GBASE-T', 'Multimode fiber'],
        explanation: 'Twinax is cheapest for short 10G runs (<5m), lower latency than copper, and no optics needed.'
      },
      {
        scenario: 'A cable modem needs to be connected to the ISP coaxial cable from the wall.',
        question: 'What connector type is used?',
        answer: 'F-connector',
        options: ['F-connector', 'BNC', 'RJ45', 'SC'],
        explanation: 'Cable modems use F-connectors (threaded screw) on coaxial/DOCSIS infrastructure.'
      },
      {
        scenario: 'You are running Ethernet cables through the plenum space above a drop ceiling.',
        question: 'What cable jacket type is required?',
        answer: 'Plenum-rated (FEP or low-smoke PVC)',
        options: ['Plenum-rated (FEP or low-smoke PVC)', 'Standard PVC jacket', 'Any jacket with conduit', 'Outdoor-rated'],
        explanation: 'Plenum spaces share air — plenum-rated cable produces less smoke and fewer toxic fumes in a fire.'
      },
      {
        scenario: 'You need to connect a VoIP phone to an Ethernet wall jack.',
        question: 'What connector is on the Ethernet cable?',
        answer: 'RJ45',
        options: ['RJ45', 'RJ11', 'BNC', 'LC'],
        explanation: 'VoIP phones use Ethernet (RJ45). RJ11 is the old analog telephone connector.'
      },
      {
        scenario: 'A data center needs to run fiber between racks with maximum port density. Each link carries 12 fibers.',
        question: 'Which connector type?',
        answer: 'MPO',
        options: ['MPO', 'LC', 'SC', 'ST'],
        explanation: 'MPO carries 12 fibers in one connector — maximum density for inter-rack fiber.'
      },
      {
        scenario: 'You need to connect two sites 40 km apart with a fiber link.',
        question: 'Which fiber type is required?',
        answer: 'Single-mode fiber',
        options: ['Single-mode fiber', 'Multimode fiber', 'Twinaxial', 'Coaxial'],
        explanation: 'Multimode maxes at ~2 km. Single-mode reaches up to 100 km using laser.'
      },
      {
        scenario: 'An older network closet has fiber connections that use a bayonet push-and-twist mechanism.',
        question: 'What connector type is this?',
        answer: 'ST',
        options: ['ST', 'SC', 'LC', 'MPO'],
        explanation: 'ST (Straight Tip) uses a bayonet push-twist lock. SC snaps, LC clips.'
      },
    ];

    const prob = randChoice(scenarios);
    renderScenario(prob);
  }

  function padOptions(options, answer) {
    const unique = [...new Set(options)];
    if (unique.length >= 4) {
      const others = UI.shuffleArray(unique.filter(o => o !== answer)).slice(0, 3);
      return UI.shuffleArray([answer, ...others]);
    }
    // Pull distractors from relevant pool based on answer content
    let pool = DISTRACTOR_MEDIA;
    if (answer.match(/gbps|mbps/i)) pool = DISTRACTOR_SPEEDS;
    else if (answer.match(/\dm|km/i)) pool = DISTRACTOR_DISTANCES;
    const fillers = pool.filter(x => !unique.includes(x) && x !== answer);
    const padded = [...unique];
    if (!padded.includes(answer)) padded.push(answer);
    while (padded.length < 4 && fillers.length > 0) {
      padded.push(fillers.splice(Math.floor(Math.random() * fillers.length), 1)[0]);
    }
    return UI.shuffleArray(padded.slice(0, 4));
  }

  function renderMultipleChoice(prob) {
    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';

    const finalOptions = padOptions(prob.options, prob.answer);

    div.innerHTML = `
      <div class="route-problem">
        <h3>// ${DIFFICULTIES[currentDifficulty - 1].name.toUpperCase()}</h3>
        <div class="question-text">${UI.escapeHtml(prob.question)}</div>
        <div class="answers-list" id="cable-choices"></div>
        <div id="cable-feedback"></div>
      </div>
    `;

    const choices = div.querySelector('#cable-choices');
    finalOptions.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(prob.answer, opt, div));
      choices.appendChild(btn);
    });

    container.appendChild(div);
  }

  function renderScenario(prob) {
    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';

    const options = UI.shuffleArray(prob.options);

    div.innerHTML = `
      <div class="route-problem">
        <h3>// SCENARIO</h3>
        <div class="cable-scenario">${UI.escapeHtml(prob.scenario)}</div>
        <div class="question-text">${UI.escapeHtml(prob.question)}</div>
        <div class="answers-list" id="cable-choices"></div>
        <div id="cable-feedback"></div>
      </div>
    `;

    const choices = div.querySelector('#cable-choices');
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleAnswer(prob.answer, opt, div, prob.explanation));
      choices.appendChild(btn);
    });

    container.appendChild(div);
  }

  function handleAnswer(correctAnswer, selected, div, explanation) {
    const buttons = div.querySelectorAll('.answer-btn');
    const feedback = div.querySelector('#cable-feedback');
    const correct = selected === correctAnswer;

    sessionStats.answered++;
    buttons.forEach(btn => {
      btn.classList.add('disabled');
      if (btn.textContent === correctAnswer) btn.classList.add(correct ? 'correct' : 'show-correct');
      if (btn.textContent === selected && !correct) btn.classList.add('incorrect');
    });

    if (correct) {
      sessionStats.correct++;
      const xp = currentDifficulty === 3 ? 25 : 15;
      sessionStats.xpEarned += xp;
      const state = Engine.getState();
      state.player.totalXP += xp;
      state.player.level = Engine.getLevel(state.player.totalXP);
      state.player.streak++;
      if (state.player.streak > state.player.bestStreak) state.player.bestStreak = state.player.streak;

      feedback.innerHTML = `<div class="explanation-card"><h4>// CORRECT +${xp} XP</h4>${explanation ? `<p>${UI.escapeHtml(explanation)}</p>` : ''}</div>`;
      const rect = buttons[0].parentElement.getBoundingClientRect();
      UI.spawnParticles(rect.left + rect.width / 2, rect.top);
    } else {
      const state = Engine.getState();
      state.player.streak = 0;
      feedback.innerHTML = `<div class="explanation-card"><h4>// INCORRECT</h4><p><strong>${UI.escapeHtml(correctAnswer)}</strong></p>${explanation ? `<p>${UI.escapeHtml(explanation)}</p>` : ''}</div>`;
    }

    UI.updateHeader();

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.textContent = 'NEXT →';
    nextBtn.addEventListener('click', showProblem);
    feedback.appendChild(nextBtn);

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', keyHandler); showProblem(); }
    };
    setTimeout(() => document.addEventListener('keydown', keyHandler), 200);
  }

  return { start };
})();

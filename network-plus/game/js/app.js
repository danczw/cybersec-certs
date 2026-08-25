const App = (() => {
  const main = document.getElementById('main-content');
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let dots = [];

  function init() {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('hashchange', route);
    startBgAnimation();
    route();
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    rebuildDots();
  }

  function rebuildDots() {
    const gridSize = 40;
    dots = [];
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        dots.push({ x, y, baseAlpha: Math.random() * 0.3 });
      }
    }
  }

  function startBgAnimation() {
    let tick = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick += 0.005;
      for (const dot of dots) {
        const wave = Math.sin(tick + dot.x * 0.01 + dot.y * 0.01) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(0, 255, 136, ${dot.baseAlpha * wave * 0.3})`;
        ctx.fillRect(dot.x, dot.y, 1, 1);
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  function route() {
    const hash = window.location.hash || '#/home';
    main.innerHTML = '';
    UI.updateHeader();

    switch (hash) {
      case '#/home': renderHome(); break;
      case '#/rapid-fire': loadMode(() => typeof RapidFire !== 'undefined' && RapidFire, 'js/modes/rapid-fire.js'); break;
      case '#/subnet': loadMode(() => typeof SubnetArchitect !== 'undefined' && SubnetArchitect, 'js/modes/subnet-architect.js'); break;
      case '#/abbreviations': loadMode(() => typeof Abbreviations !== 'undefined' && Abbreviations, 'js/modes/abbreviations.js'); break;
      case '#/port-sprint': loadMode(() => typeof PortSprint !== 'undefined' && PortSprint, 'js/modes/port-sprint.js'); break;
      case '#/route-selector': loadMode(() => typeof RouteSelector !== 'undefined' && RouteSelector, 'js/modes/route-selector.js'); break;
      case '#/cable-lab': loadMode(() => typeof CableLab !== 'undefined' && CableLab, 'js/modes/cable-lab.js'); break;
      case '#/layer-drop': loadMode(() => typeof LayerDrop !== 'undefined' && LayerDrop, 'js/modes/layer-drop.js'); break;
      case '#/attack-surface': loadMode(() => typeof AttackSurface !== 'undefined' && AttackSurface, 'js/modes/attack-surface.js'); break;
      case '#/triage-sim': loadMode(() => typeof TriageSim !== 'undefined' && TriageSim, 'js/modes/triage-sim.js'); break;
      default: renderHome();
    }
  }

  function loadMode(getModule, script) {
    const mod = getModule();
    if (mod) { mod.start(main); return; }
    const s = document.createElement('script');
    s.src = script;
    s.onload = () => getModule().start(main);
    document.body.appendChild(s);
  }

  function renderHome() {
    const state = Engine.getState();
    const div = document.createElement('div');
    div.className = 'dashboard';
    div.style.animation = 'fadeIn 0.3s ease';

    div.innerHTML = `
      <div class="dashboard-header">
        <h2>Mission Control</h2>
        <p>Select a training module to begin</p>
        <button class="reset-btn" id="reset-progress">RESET PROGRESS</button>
      </div>
      <div class="mode-grid">
        <div class="mode-card" onclick="window.location.hash='#/rapid-fire'">
          <h3>RAPID FIRE</h3>
          <p>Timed quiz across all domains. Spaced repetition brings back weak concepts automatically.</p>
          <div class="mode-meta">
            <span class="mode-tag">ALL DOMAINS</span>
            <span class="mode-tag">SRS</span>
            <span class="mode-tag">WEIGHTED</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/subnet'">
          <h3>SUBNET ARCHITECT</h3>
          <p>Interactive subnetting practice. Binary math, CIDR, network calculations, and VLSM.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 1.7</span>
            <span class="mode-tag">INTERACTIVE</span>
            <span class="mode-tag">PROGRESSIVE</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/abbreviations'">
          <h3>ABBREVIATIONS</h3>
          <p>Match networking abbreviations to their full names and vice versa. Both directions tested.</p>
          <div class="mode-meta">
            <span class="mode-tag">ALL DOMAINS</span>
            <span class="mode-tag">RECALL</span>
            <span class="mode-tag">BIDIRECTIONAL</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/port-sprint'">
          <h3>PORT SPRINT</h3>
          <p>Speed-typing recall. Protocol flashes, you type the port — or vice versa. Combo multiplier rewards streaks.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 1.4</span>
            <span class="mode-tag">SPEED</span>
            <span class="mode-tag">RECALL</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/route-selector'">
          <h3>ROUTE SELECTOR</h3>
          <p>Given a routing table and destination, pick the winning route. Longest prefix, AD tiebreakers, field labeling.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 2.1</span>
            <span class="mode-tag">INTERACTIVE</span>
            <span class="mode-tag">PROGRESSIVE</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/cable-lab'">
          <h3>CABLE LAB</h3>
          <p>Match requirements to the right cable, connector, and standard. Escalates from simple picks to full scenarios.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 1.5</span>
            <span class="mode-tag">SCENARIOS</span>
            <span class="mode-tag">MATCHING</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/layer-drop'">
          <h3>LAYER DROP</h3>
          <p>Sort protocols, devices, and concepts to the correct OSI layer. Timer pressure increases as you go.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 1.1</span>
            <span class="mode-tag">SPEED</span>
            <span class="mode-tag">ARCADE</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/attack-surface'">
          <h3>ATTACK SURFACE</h3>
          <p>Identify attacks from network symptoms, then select the correct defense. Two-phase security challenge.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 4</span>
            <span class="mode-tag">SCENARIOS</span>
            <span class="mode-tag">TWO-PHASE</span>
          </div>
        </div>
        <div class="mode-card" onclick="window.location.hash='#/triage-sim'">
          <h3>TRIAGE SIM</h3>
          <p>Troubleshoot network incidents step by step. Manage your diagnostic budget — wrong moves cost points.</p>
          <div class="mode-meta">
            <span class="mode-tag">DOMAIN 5</span>
            <span class="mode-tag">DECISION TREE</span>
            <span class="mode-tag">BUDGET</span>
          </div>
        </div>
      </div>
      <div class="mastery-section" id="mastery-bars"></div>
      <div class="session-stats">
        <div class="session-stat">
          <div class="stat-number">${state.player.totalXP}</div>
          <div class="stat-desc">TOTAL XP</div>
        </div>
        <div class="session-stat">
          <div class="stat-number">${state.player.bestStreak}</div>
          <div class="stat-desc">BEST STREAK</div>
        </div>
        <div class="session-stat">
          <div class="stat-number">${Object.values(state.concepts).reduce((s, c) => s + c.seen, 0)}</div>
          <div class="stat-desc">QUESTIONS ANSWERED</div>
        </div>
        <div class="session-stat">
          <div class="stat-number">${Engine.getDueCount()}</div>
          <div class="stat-desc">DUE FOR REVIEW</div>
        </div>
      </div>
    `;

    main.appendChild(div);
    UI.renderMasteryBars(document.getElementById('mastery-bars'));

    document.getElementById('reset-progress').addEventListener('click', () => {
      if (confirm('Reset all XP, levels, and streak? This cannot be undone.')) {
        Engine.resetProgress();
        UI.updateHeader();
        route();
      }
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { route };
})();

const SubnetArchitect = (() => {
  let container;
  let currentDifficulty = 1;
  let sessionStats;
  let problemCounter = 0;

  const SUBNET_REF = `
    <details style="margin-top: 1rem;">
      <summary class="subnet-reference-toggle">SUBNET REFERENCE</summary>
      <table class="binary-ref-table">
        <thead><tr><th>Octet 1</th><th>Octet 2</th><th>Octet 3</th><th>Octet 4</th><th>Networks</th><th>Addresses</th><th>Mask</th></tr></thead>
        <tbody>
          <tr><td>/1</td><td>/9</td><td>/17</td><td>/25</td><td>2</td><td>128</td><td>128</td></tr>
          <tr><td>/2</td><td>/10</td><td>/18</td><td>/26</td><td>4</td><td>64</td><td>192</td></tr>
          <tr><td>/3</td><td>/11</td><td>/19</td><td>/27</td><td>8</td><td>32</td><td>224</td></tr>
          <tr><td>/4</td><td>/12</td><td>/20</td><td>/28</td><td>16</td><td>16</td><td>240</td></tr>
          <tr><td>/5</td><td>/13</td><td>/21</td><td>/29</td><td>32</td><td>8</td><td>248</td></tr>
          <tr><td>/6</td><td>/14</td><td>/22</td><td>/30</td><td>64</td><td>4</td><td>252</td></tr>
          <tr><td>/7</td><td>/15</td><td>/23</td><td></td><td>128</td><td>2</td><td>254</td></tr>
          <tr><td>/8</td><td>/16</td><td>/24</td><td></td><td>256</td><td>1</td><td>255</td></tr>
        </tbody>
      </table>
    </details>`;

  const DIFFICULTIES = [
    { level: 1, name: 'Binary Conversion' },
    { level: 2, name: 'CIDR & Masks' },
    { level: 3, name: 'Network Calculations' },
    { level: 4, name: 'VLSM' },
    { level: 5, name: 'Same Subnet?' }
  ];

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    problemCounter = 0;
    renderDifficultySelect();
  }

  function renderDifficultySelect() {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const div = document.createElement('div');
    div.className = 'subnet-container';
    div.style.animation = 'fadeIn 0.3s ease';

    div.innerHTML = `
      <div id="subnet-stats-slot"></div>
      <div class="subnet-difficulty-select">
        ${DIFFICULTIES.map(d => `
          <button class="subnet-diff-btn ${d.level === currentDifficulty ? 'active' : ''}" data-level="${d.level}">
            ${d.level}. ${d.name}
          </button>
        `).join('')}
      </div>
      <div id="subnet-problem-area"></div>
    `;

    container.appendChild(div);

    const statsSlot = document.getElementById('subnet-stats-slot');
    statsSlot.appendChild(UI.renderSessionStats(sessionStats, { showStreak: false }));

    div.querySelectorAll('.subnet-diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentDifficulty = parseInt(btn.dataset.level);
        div.querySelectorAll('.subnet-diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        generateProblem();
      });
    });

    generateProblem();
  }

  function generateProblem() {
    const area = document.getElementById('subnet-problem-area');
    if (!area) return;
    problemCounter++;

    switch (currentDifficulty) {
      case 1: generateBinaryProblem(area); break;
      case 2: generateCidrProblem(area); break;
      case 3: generateCalcProblem(area); break;
      case 4: generateVlsmProblem(area); break;
      case 5: generateSameSubnetProblem(area); break;
    }
  }

  function checkMultiInputs(area, selector, conceptId, successMsg) {
    const inputs = area.querySelectorAll(selector);
    let allCorrect = true;

    inputs.forEach(input => {
      if (input.value.trim() === input.dataset.answer) {
        input.classList.remove('invalid');
        input.classList.add('valid');
      } else {
        input.classList.remove('valid');
        input.classList.add('invalid');
        allCorrect = false;
      }
    });

    const result = Engine.recordAnswer(conceptId, 1, 3, allCorrect);
    sessionStats.answered++;
    if (allCorrect) {
      sessionStats.correct++;
      sessionStats.xpEarned += result.xp;
    }
    UI.updateHeader();

    const feedback = document.getElementById('subnet-feedback');
    if (allCorrect) {
      feedback.innerHTML = `<div class="subnet-result correct">✓ ${successMsg} +${result.xp} XP</div>`;
      const btn = area.querySelector('.subnet-submit');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        UI.spawnParticles(rect.left + rect.width / 2, rect.top);
      }
    } else {
      const corrections = [];
      inputs.forEach(input => {
        if (!input.classList.contains('valid')) {
          corrections.push(`${input.previousElementSibling.textContent}: ${input.dataset.answer}`);
        }
      });
      feedback.innerHTML = `<div class="subnet-result incorrect">✗ Correct answers:<br>${corrections.join('<br>')}</div>`;
    }

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.textContent = 'NEXT PROBLEM →';
    nextBtn.style.marginTop = '1rem';
    nextBtn.addEventListener('click', renderDifficultySelect);
    feedback.appendChild(nextBtn);
  }

  function generateBinaryProblem(area) {
    const direction = Math.random() > 0.5 ? 'to-binary' : 'to-decimal';
    let value, answer, prompt;

    if (direction === 'to-binary') {
      value = Math.floor(Math.random() * 256);
      answer = value.toString(2).padStart(8, '0');
      prompt = `Convert <code>${value}</code> to 8-bit binary`;
    } else {
      value = Math.floor(Math.random() * 256);
      const binary = value.toString(2).padStart(8, '0');
      answer = value.toString();
      prompt = `Convert <code>${binary}</code> to decimal`;
    }

    area.innerHTML = `
      <div class="subnet-problem">
        <h3>// BINARY CONVERSION</h3>
        <div class="subnet-prompt">${prompt}</div>
        <div class="subnet-inputs">
          <div class="subnet-field">
            <label>YOUR ANSWER</label>
            <input type="text" id="subnet-answer" autocomplete="off" placeholder="${direction === 'to-binary' ? '00000000' : '0-255'}">
          </div>
          <button class="subnet-submit" id="subnet-check">CHECK</button>
        </div>
        <div id="subnet-feedback"></div>
        <details style="margin-top: 1rem;">
          <summary class="subnet-reference-toggle">BINARY REFERENCE</summary>
          <table class="binary-ref-table">
            <thead><tr><th>Bit</th><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
            <tbody>
              <tr><td>Position</td><td>7</td><td>6</td><td>5</td><td>4</td><td>3</td><td>2</td><td>1</td><td>0</td></tr>
              <tr><td>Cumulative</td><td>128</td><td>192</td><td>224</td><td>240</td><td>248</td><td>252</td><td>254</td><td>255</td></tr>
            </tbody>
          </table>
        </details>
      </div>
    `;

    setupCheck(answer, `subnet-binary-${currentDifficulty}`);
  }

  function generateCidrProblem(area) {
    const cidrs = [8, 16, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32];
    const cidr = cidrs[Math.floor(Math.random() * cidrs.length)];
    const mask = cidrToMask(cidr);
    const direction = Math.random() > 0.5 ? 'cidr-to-mask' : 'mask-to-cidr';

    let prompt, answer;
    if (direction === 'cidr-to-mask') {
      prompt = `What is the subnet mask for <code>/${cidr}</code>?`;
      answer = mask;
    } else {
      prompt = `What is the CIDR notation for subnet mask <code>${mask}</code>?`;
      answer = '/' + cidr;
    }

    area.innerHTML = `
      <div class="subnet-problem">
        <h3>// CIDR & MASKS</h3>
        <div class="subnet-prompt">${prompt}</div>
        <div class="subnet-inputs">
          <div class="subnet-field">
            <label>YOUR ANSWER</label>
            <input type="text" id="subnet-answer" autocomplete="off" placeholder="${direction === 'cidr-to-mask' ? '255.255.255.0' : '/24'}">
          </div>
          <button class="subnet-submit" id="subnet-check">CHECK</button>
        </div>
        <div id="subnet-feedback"></div>
        ${SUBNET_REF}
      </div>
    `;

    setupCheck(answer, `subnet-cidr-${cidr}`);
  }

  function generateCalcProblem(area) {
    const cidr = [24, 25, 26, 27, 28, 29, 30][Math.floor(Math.random() * 7)];
    const blockSize = 256 - cidrToLastOctet(cidr);
    const networkNum = Math.floor(Math.random() * (256 / blockSize)) * blockSize;
    const hostPart = networkNum + 1 + Math.floor(Math.random() * (blockSize - 2));
    const ip = `192.168.1.${hostPart}`;

    const networkAddr = `192.168.1.${networkNum}`;
    const broadcastAddr = `192.168.1.${networkNum + blockSize - 1}`;
    const firstUsable = `192.168.1.${networkNum + 1}`;
    const lastUsable = `192.168.1.${networkNum + blockSize - 2}`;
    const numHosts = blockSize - 2;

    area.innerHTML = `
      <div class="subnet-problem">
        <h3>// NETWORK CALCULATIONS</h3>
        <div class="subnet-prompt">Given the IP <code>${ip}/${cidr}</code>, calculate:</div>
        <div class="subnet-inputs">
          <div class="subnet-field">
            <label>NETWORK ADDRESS</label>
            <input type="text" class="subnet-calc-input" data-answer="${networkAddr}" autocomplete="off" placeholder="192.168.1.x">
          </div>
          <div class="subnet-field">
            <label>BROADCAST ADDRESS</label>
            <input type="text" class="subnet-calc-input" data-answer="${broadcastAddr}" autocomplete="off" placeholder="192.168.1.x">
          </div>
          <div class="subnet-field">
            <label>FIRST USABLE HOST</label>
            <input type="text" class="subnet-calc-input" data-answer="${firstUsable}" autocomplete="off" placeholder="192.168.1.x">
          </div>
          <div class="subnet-field">
            <label>LAST USABLE HOST</label>
            <input type="text" class="subnet-calc-input" data-answer="${lastUsable}" autocomplete="off" placeholder="192.168.1.x">
          </div>
          <div class="subnet-field">
            <label>NUMBER OF USABLE HOSTS</label>
            <input type="text" class="subnet-calc-input" data-answer="${numHosts}" autocomplete="off" placeholder="0">
          </div>
          <button class="subnet-submit" id="subnet-check-calc">CHECK ALL</button>
        </div>
        <div id="subnet-feedback"></div>
        ${SUBNET_REF}
      </div>
    `;

    document.getElementById('subnet-check-calc').addEventListener('click', () => {
      checkMultiInputs(area, '.subnet-calc-input', `subnet-calc-${cidr}`, 'ALL CORRECT!');
    });
  }

  function generateVlsmProblem(area) {
    const depts = ['Engineering', 'Sales', 'HR', 'IT'];
    const numDepts = 2 + Math.floor(Math.random() * 2);
    const selected = UI.shuffleArray(depts).slice(0, numDepts);
    const hosts = selected.map(() => [6, 14, 30, 62][Math.floor(Math.random() * 4)]);

    const sorted = hosts.map((h, i) => ({ dept: selected[i], hosts: h }))
      .sort((a, b) => b.hosts - a.hosts);

    let nextNetwork = 0;
    const expectedSubnets = sorted.map(s => {
      const needed = s.hosts + 2;
      let block = 4;
      while (block < needed) block *= 2;
      const cidr = 32 - Math.log2(block);
      const subnet = `10.0.0.${nextNetwork}/${cidr}`;
      nextNetwork += block;
      return { dept: s.dept, hosts: s.hosts, subnet, cidr, block };
    });

    area.innerHTML = `
      <div class="subnet-problem">
        <h3>// VLSM DESIGN</h3>
        <div class="subnet-prompt">
          Given network <code>10.0.0.0/24</code>, assign subnets for:<br>
          ${sorted.map(s => `• ${s.dept}: ${s.hosts} hosts needed`).join('<br>')}
          <br><br><em>Allocate largest first. Use the smallest subnet that fits.</em>
        </div>
        <div class="subnet-inputs">
          ${expectedSubnets.map(s => `
            <div class="subnet-field">
              <label>${s.dept} (${s.hosts} hosts)</label>
              <input type="text" class="vlsm-input" data-answer="${s.subnet}" autocomplete="off" placeholder="10.0.0.x/y">
            </div>
          `).join('')}
          <button class="subnet-submit" id="subnet-check-vlsm">CHECK ALL</button>
        </div>
        <div id="subnet-feedback"></div>
        ${SUBNET_REF}
      </div>
    `;

    document.getElementById('subnet-check-vlsm').addEventListener('click', () => {
      checkMultiInputs(area, '.vlsm-input', `subnet-vlsm-${numDepts}`, 'PERFECT VLSM ALLOCATION!');
    });
  }

  function generateSameSubnetProblem(area) {
    const cidr = [24, 25, 26, 27, 28][Math.floor(Math.random() * 5)];
    const blockSize = 256 - cidrToLastOctet(cidr);
    const networkNum = Math.floor(Math.random() * (256 / blockSize)) * blockSize;

    const sameSubnet = Math.random() > 0.4;
    let ip1, ip2;

    ip1 = `192.168.1.${networkNum + 1 + Math.floor(Math.random() * (blockSize - 2))}`;

    if (sameSubnet) {
      ip2 = `192.168.1.${networkNum + 1 + Math.floor(Math.random() * (blockSize - 2))}`;
    } else {
      const otherBlock = (networkNum + blockSize) % 256;
      ip2 = `192.168.1.${otherBlock + 1 + Math.floor(Math.random() * Math.min(blockSize - 2, 255 - otherBlock - 1))}`;
    }

    const answer = sameSubnet ? 'yes' : 'no';

    area.innerHTML = `
      <div class="subnet-problem">
        <h3>// SAME SUBNET?</h3>
        <div class="subnet-prompt">
          Are these two hosts on the same subnet?<br><br>
          Host A: <code>${ip1}/${cidr}</code><br>
          Host B: <code>${ip2}/${cidr}</code>
        </div>
        <div class="answers-list">
          <button class="answer-btn" data-answer="yes">Yes — same subnet</button>
          <button class="answer-btn" data-answer="no">No — different subnets</button>
        </div>
        <div id="subnet-feedback"></div>
        ${SUBNET_REF}
      </div>
    `;

    let answered = false;
    area.querySelectorAll('.answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const correct = btn.dataset.answer === answer;
        const result = Engine.recordAnswer(`subnet-same-${cidr}`, 1, 2, correct);
        sessionStats.answered++;
        if (correct) {
          sessionStats.correct++;
          sessionStats.xpEarned += result.xp;
        }
        UI.updateHeader();

        area.querySelectorAll('.answer-btn').forEach(b => {
          b.classList.add('disabled');
          if (b.dataset.answer === answer) b.classList.add('correct');
        });
        if (!correct) btn.classList.add('incorrect');

        if (correct) {
          const rect = btn.getBoundingClientRect();
          UI.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        const feedback = document.getElementById('subnet-feedback');
        const mask = cidrToMask(cidr);
        const net1 = getNetworkAddress(ip1, cidr);
        const net2 = getNetworkAddress(ip2, cidr);
        feedback.innerHTML = `
          <div class="explanation-card">
            <h4>// ${correct ? 'CORRECT' : 'INCORRECT'} ${result.xp ? '+' + result.xp + ' XP' : ''}</h4>
            <p>Subnet mask: ${mask}<br>
            Host A network: ${net1}<br>
            Host B network: ${net2}<br>
            ${net1 === net2 ? 'Same network → same subnet' : 'Different networks → different subnets'}</p>
          </div>
        `;

        const nextBtn = document.createElement('button');
        nextBtn.className = 'next-btn';
        nextBtn.textContent = 'NEXT PROBLEM →';
        nextBtn.addEventListener('click', renderDifficultySelect);
        feedback.appendChild(nextBtn);
      });
    });
  }

  function setupCheck(answer, conceptId) {
    const input = document.getElementById('subnet-answer');
    const checkBtn = document.getElementById('subnet-check');

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') checkBtn.click();
    });

    checkBtn.addEventListener('click', () => {
      const userAnswer = input.value.trim();
      const correct = userAnswer === answer;
      const difficulty = currentDifficulty <= 2 ? 1 : 2;

      const result = Engine.recordAnswer(conceptId, 1, difficulty, correct);
      sessionStats.answered++;
      if (correct) {
        sessionStats.correct++;
        sessionStats.xpEarned += result.xp;
      }
      UI.updateHeader();

      input.classList.add(correct ? 'valid' : 'invalid');
      const feedback = document.getElementById('subnet-feedback');

      if (correct) {
        feedback.innerHTML = `<div class="subnet-result correct">✓ CORRECT! +${result.xp} XP</div>`;
        const rect = checkBtn.getBoundingClientRect();
        UI.spawnParticles(rect.left + rect.width / 2, rect.top);
      } else {
        feedback.innerHTML = `<div class="subnet-result incorrect">✗ Answer: ${answer}</div>`;
      }

      const nextBtn = document.createElement('button');
      nextBtn.className = 'next-btn';
      nextBtn.textContent = 'NEXT PROBLEM →';
      nextBtn.style.marginTop = '1rem';
      nextBtn.addEventListener('click', renderDifficultySelect);
      feedback.appendChild(nextBtn);
    });

    input.focus();
  }

  function cidrToMask(cidr) {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const bits = Math.min(8, Math.max(0, cidr - i * 8));
      mask.push(256 - Math.pow(2, 8 - bits));
    }
    return mask.join('.');
  }

  function cidrToLastOctet(cidr) {
    if (cidr <= 24) return 0;
    return 256 - Math.pow(2, 32 - cidr);
  }

  function getNetworkAddress(ip, cidr) {
    const parts = ip.split('.').map(Number);
    const mask = cidrToMask(cidr).split('.').map(Number);
    return parts.map((p, i) => p & mask[i]).join('.');
  }

  return { start };
})();

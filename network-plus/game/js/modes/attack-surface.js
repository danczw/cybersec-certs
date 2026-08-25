const AttackSurface = (() => {
  let container;
  let sessionStats;
  let scenarios;
  let currentRound;
  let killChainStreak;
  let phase1Correct;

  const TOTAL_ROUNDS = 10;

  const SCENARIOS = [
    {
      id: 'atk-1',
      difficulty: 1,
      symptoms: 'Switch CAM table is full. All ports are flooding unknown unicast frames. Network performance has degraded significantly. MAC address table shows thousands of entries from a single port.',
      attack: 'MAC Flooding',
      attackChoices: ['MAC Flooding', 'ARP Poisoning', 'DHCP Starvation', 'VLAN Hopping'],
      defense: 'Port Security (limit MAC addresses per port)',
      defenseChoices: ['Port Security (limit MAC addresses per port)', 'Dynamic ARP Inspection', 'DHCP Snooping', 'Private VLANs'],
      explanation: 'MAC flooding overwhelms the switch CAM table, forcing it to flood all frames like a hub. Port security limits the number of MAC addresses learned per port, preventing the attack.',
    },
    {
      id: 'atk-2',
      difficulty: 1,
      symptoms: 'Users report intermittent connectivity issues. ARP cache on multiple hosts shows the gateway MAC address has changed. Wireshark captures show gratuitous ARP replies from an unknown source.',
      attack: 'ARP Poisoning',
      attackChoices: ['ARP Poisoning', 'MAC Flooding', 'DNS Poisoning', 'IP Spoofing'],
      defense: 'Dynamic ARP Inspection (DAI)',
      defenseChoices: ['Dynamic ARP Inspection (DAI)', 'Port Security', 'DHCP Snooping', 'ACL filtering'],
      explanation: 'ARP poisoning sends forged ARP replies to associate the attacker\'s MAC with the gateway IP, intercepting traffic. DAI validates ARP packets against the DHCP snooping binding table.',
    },
    {
      id: 'atk-3',
      difficulty: 1,
      symptoms: 'DHCP pool exhausted — no addresses available for new clients. Monitoring shows thousands of DHCP Discover messages from different MAC addresses originating from the same switch port.',
      attack: 'DHCP Starvation',
      attackChoices: ['DHCP Starvation', 'Rogue DHCP Server', 'MAC Flooding', 'DDoS (SYN Flood)'],
      defense: 'DHCP Snooping',
      defenseChoices: ['DHCP Snooping', 'Port Security', 'Rate Limiting', 'Network Segmentation'],
      explanation: 'DHCP starvation floods the server with requests using spoofed MACs, exhausting the address pool. DHCP snooping limits the rate of DHCP messages on untrusted ports and validates client requests.',
    },
    {
      id: 'atk-4',
      difficulty: 2,
      symptoms: 'Traffic from VLAN 10 appearing on VLAN 20. Packet captures show 802.1Q frames with two VLAN tags. The native VLAN on trunk links matches a user access VLAN.',
      attack: 'VLAN Hopping (Double Tagging)',
      attackChoices: ['VLAN Hopping (Double Tagging)', 'MAC Flooding', 'ARP Poisoning', 'Spanning Tree Attack'],
      defense: 'Disable DTP and change native VLAN to unused ID',
      defenseChoices: ['Disable DTP and change native VLAN to unused ID', 'Port Security', 'Private VLANs', 'Dynamic ARP Inspection'],
      explanation: 'Double-tagging exploits the native VLAN by nesting a hidden tag inside the outer tag, which gets stripped by the first switch. Changing the native VLAN to an unused ID and disabling DTP prevents this attack.',
    },
    {
      id: 'atk-5',
      difficulty: 2,
      symptoms: 'New clients receiving incorrect default gateway and DNS server addresses. A DHCP Offer from an unauthorized IP is observed on the network. Users on one subnet can reach the internet but DNS resolution fails.',
      attack: 'Rogue DHCP Server',
      attackChoices: ['Rogue DHCP Server', 'DHCP Starvation', 'DNS Poisoning', 'Man-in-the-Middle'],
      defense: 'DHCP Snooping (trusted/untrusted ports)',
      defenseChoices: ['DHCP Snooping (trusted/untrusted ports)', 'Port Security', 'Dynamic ARP Inspection', 'ACL on VLAN'],
      explanation: 'A rogue DHCP server hands out malicious network configuration (wrong gateway/DNS) to redirect traffic. DHCP snooping marks legitimate server ports as trusted and drops DHCP Offers from untrusted ports.',
    },
    {
      id: 'atk-6',
      difficulty: 2,
      symptoms: 'Users accessing the company banking portal are redirected to a lookalike site. DNS queries for the bank domain return an IP address not matching the authoritative record. The local DNS cache contains a suspicious entry with a very long TTL.',
      attack: 'DNS Poisoning',
      attackChoices: ['DNS Poisoning', 'ARP Poisoning', 'Phishing', 'URL Hijacking'],
      defense: 'DNSSEC',
      defenseChoices: ['DNSSEC', 'HTTPS enforcement', 'Firewall rules', 'Proxy filtering'],
      explanation: 'DNS poisoning injects forged responses into the resolver cache, mapping legitimate domains to attacker IPs. DNSSEC adds cryptographic signatures to DNS records, allowing resolvers to verify authenticity.',
    },
    {
      id: 'atk-7',
      difficulty: 2,
      symptoms: 'Web server unreachable. Firewall logs show millions of TCP SYN packets per second from random source IPs. Connection state table is full. Half-open connections consuming all server resources.',
      attack: 'DDoS (SYN Flood)',
      attackChoices: ['DDoS (SYN Flood)', 'Brute Force Login', 'DNS Amplification', 'Ping Flood'],
      defense: 'SYN cookies and rate limiting',
      defenseChoices: ['SYN cookies and rate limiting', 'Firewall block rules', 'Load balancer', 'Increase server RAM'],
      explanation: 'SYN floods exploit the TCP handshake by sending SYNs without completing the connection, exhausting the server\'s state table. SYN cookies allow the server to respond without allocating state until the handshake completes, while rate limiting drops excessive traffic.',
    },
    {
      id: 'atk-8',
      difficulty: 1,
      symptoms: 'Security logs show hundreds of failed SSH login attempts per minute from a single IP. Account names being tried match employee directory format (first.last). Failed attempts incrementing sequentially through common password lists.',
      attack: 'Brute Force Login',
      attackChoices: ['Brute Force Login', 'DDoS (SYN Flood)', 'Credential Stuffing', 'Social Engineering'],
      defense: 'Account lockout policy and MFA',
      defenseChoices: ['Account lockout policy and MFA', 'Rate limiting', 'IP blacklisting', 'Stronger encryption'],
      explanation: 'Brute force attacks systematically try credentials until finding a valid combination. Account lockout stops attempts after N failures, and MFA ensures a stolen password alone cannot grant access.',
    },
    {
      id: 'atk-9',
      difficulty: 2,
      symptoms: 'Wireless IDS detects a new access point with the same SSID as the corporate network but different BSSID. Signal strength is unusually strong in the lobby. Multiple users have auto-connected and their traffic is being intercepted.',
      attack: 'Evil Twin AP',
      attackChoices: ['Evil Twin AP', 'Deauthentication Attack', 'War Driving', 'Bluetooth Snarfing'],
      defense: '802.1X authentication and wireless IDS',
      defenseChoices: ['802.1X authentication and wireless IDS', 'MAC filtering', 'Hidden SSID', 'WPA3 only'],
      explanation: 'An evil twin mimics a legitimate AP to lure clients into connecting. 802.1X requires mutual authentication between client and server (via RADIUS), preventing connection to rogue APs. WIDS alerts on unauthorized APs.',
    },
    {
      id: 'atk-10',
      difficulty: 3,
      symptoms: 'Certificate warnings appearing for internal HTTPS sites. Wireshark shows the TLS certificate presented differs from the legitimate server cert. TCP sessions being proxied through unknown IP. Private data visible in decrypted captures at the rogue host.',
      attack: 'Man-in-the-Middle',
      attackChoices: ['Man-in-the-Middle', 'Evil Twin AP', 'DNS Poisoning', 'Session Hijacking'],
      defense: 'End-to-end encryption (TLS/IPSec)',
      defenseChoices: ['End-to-end encryption (TLS/IPSec)', 'VPN tunnel', 'Certificate pinning', 'Network segmentation'],
      explanation: 'Man-in-the-middle intercepts communication between two parties by positioning between them. Properly configured TLS/IPSec with certificate validation ensures data integrity and detects interception through certificate mismatch warnings.',
    },
    {
      id: 'atk-11',
      difficulty: 1,
      symptoms: 'Help desk flooded with calls from users who clicked a link in an email claiming to be from IT. The email requests password resets via a non-corporate URL. Several users have entered credentials on the fake site.',
      attack: 'Social Engineering (Phishing)',
      attackChoices: ['Social Engineering (Phishing)', 'Brute Force Login', 'DNS Poisoning', 'Man-in-the-Middle'],
      defense: 'Security awareness training',
      defenseChoices: ['Security awareness training', 'Email filtering', 'URL blocking', 'Password complexity rules'],
      explanation: 'Phishing uses deceptive communications to trick users into revealing credentials or installing malware. Security awareness training teaches employees to recognize and report social engineering attempts, addressing the human vulnerability directly.',
    },
    {
      id: 'atk-12',
      difficulty: 3,
      symptoms: 'Wireless clients experiencing repeated disconnections. WIDS logs show a burst of 802.11 deauthentication frames with the AP\'s spoofed source address. The deauth reason code is "Class 3 frame received from nonassociated STA."',
      attack: 'Deauthentication Attack',
      attackChoices: ['Deauthentication Attack', 'Evil Twin AP', 'RF Jamming', 'Disassociation Flood'],
      defense: '802.11w (Protected Management Frames)',
      defenseChoices: ['802.11w (Protected Management Frames)', 'Channel hopping', 'Increase AP power', 'MAC filtering'],
      explanation: 'Deauthentication attacks send spoofed management frames to disconnect clients, often as a precursor to an evil twin attack. 802.11w (PMF) encrypts management frames, preventing forgery of deauth/disassoc packets.',
    },
    {
      id: 'atk-13',
      difficulty: 2,
      symptoms: 'Firewall logs show outbound packets with source IPs that don\'t belong to the internal network. IDS alerts on packets with mismatched source IP vs. MAC in the ARP table. Traceroute from external hosts shows asymmetric paths.',
      attack: 'IP Spoofing',
      attackChoices: ['IP Spoofing', 'ARP Poisoning', 'MAC Flooding', 'Route Injection'],
      defense: 'Ingress/egress filtering (ACLs)',
      defenseChoices: ['Ingress/egress filtering (ACLs)', 'Dynamic ARP Inspection', 'Reverse path forwarding', 'Port Security'],
      explanation: 'IP spoofing forges the source IP to bypass access controls or reflect attacks. Ingress filtering (BCP38/RFC 2827) drops packets from external sources claiming internal IPs, while egress filtering blocks outbound packets with non-internal source IPs.',
    },
    {
      id: 'atk-14',
      difficulty: 3,
      symptoms: 'Multiple file shares encrypted simultaneously across departments. A ransom note TXT file appears on affected systems. Network monitoring shows lateral movement over SMB (port 445) from a single compromised workstation. Backup server targeted first.',
      attack: 'Ransomware',
      attackChoices: ['Ransomware', 'Worm Propagation', 'Data Exfiltration', 'Cryptojacking'],
      defense: 'Offline backups and network segmentation',
      defenseChoices: ['Offline backups and network segmentation', 'Antivirus signatures', 'Pay the ransom', 'Full disk encryption'],
      explanation: 'Ransomware encrypts files and demands payment for decryption. Offline (air-gapped) backups ensure recovery without paying, and network segmentation limits lateral movement, preventing spread from one compromised host to the entire network.',
    },
    {
      id: 'atk-15',
      difficulty: 1,
      symptoms: 'Badge reader logs show two entries in rapid succession on the same credential. Security camera shows an unauthorized person following an employee through a secured door before it closes. No badge tap recorded for the second individual.',
      attack: 'Tailgating',
      attackChoices: ['Tailgating', 'Shoulder Surfing', 'Social Engineering (Impersonation)', 'Lock Picking'],
      defense: 'Access control vestibule (mantrap)',
      defenseChoices: ['Access control vestibule (mantrap)', 'Security cameras', 'Badge reader upgrade', 'Security awareness training'],
      explanation: 'Tailgating (piggybacking) occurs when an unauthorized person follows an authorized user through a secured entrance. An access control vestibule (mantrap) uses two interlocking doors — only one opens at a time, forcing individual authentication.',
    },
    {
      id: 'atk-16',
      difficulty: 3,
      symptoms: 'IDS signature alert: "DNS amplification detected." Outbound DNS queries to open resolvers with spoofed source IP matching victim server. Response packets 50x larger than queries. Upstream bandwidth saturated with UDP/53 responses.',
      attack: 'DNS Amplification Attack',
      attackChoices: ['DNS Amplification Attack', 'DDoS (SYN Flood)', 'DNS Poisoning', 'NTP Amplification'],
      defense: 'Response rate limiting and disabling open resolvers',
      defenseChoices: ['Response rate limiting and disabling open resolvers', 'DNSSEC', 'Firewall block on port 53', 'Increase bandwidth'],
      explanation: 'DNS amplification exploits open resolvers by sending small queries with a spoofed source IP, causing large responses to flood the victim. Disabling open resolvers removes the amplification vector, and response rate limiting caps outbound DNS traffic.',
    },
  ];

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0, killChains: 0, phase1Correct: 0, phase2Correct: 0, bestStreak: 0 };
    killChainStreak = 0;
    currentRound = 0;
    scenarios = UI.shuffleArray([...SCENARIOS]).slice(0, TOTAL_ROUNDS);
    showRound();
  }

  function showRound() {
    if (currentRound >= TOTAL_ROUNDS) {
      showEndScreen();
      return;
    }

    const scenario = scenarios[currentRound];
    phase1Correct = false;
    renderPhase1(scenario);
  }

  function renderPhase1(scenario) {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';

    const streakDisplay = killChainStreak > 0 ? `<span class="kill-chain-badge">Kill Chain: ${killChainStreak + 1}x</span>` : '';

    div.innerHTML = `
      <div class="round-header">
        <span class="round-progress">Round ${currentRound + 1}/${TOTAL_ROUNDS}</span>
        ${streakDisplay}
      </div>
      <h3 class="phase-label">Phase: IDENTIFY</h3>
      <div class="question-card cable-scenario">
        <h4>&#9888; ALERT</h4>
        <p>${UI.escapeHtml(scenario.symptoms)}</p>
      </div>
      <p class="phase-prompt">What type of attack is this?</p>
      <div class="answer-choices"></div>
      <div id="phase-feedback"></div>
    `;

    const choices = div.querySelector('.answer-choices');
    const shuffled = UI.shuffleArray([...scenario.attackChoices]);

    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handlePhase1Answer(scenario, choice, div));
      choices.appendChild(btn);
    });

    container.appendChild(div);
  }

  function handlePhase1Answer(scenario, selected, div) {
    const buttons = div.querySelectorAll('.answer-btn');
    const feedback = div.querySelector('#phase-feedback');
    const correct = selected === scenario.attack;

    buttons.forEach(btn => {
      btn.classList.add('disabled');
      if (btn.textContent === scenario.attack) btn.classList.add(correct ? 'correct' : 'show-correct');
      if (btn.textContent === selected && !correct) btn.classList.add('incorrect');
    });

    if (correct) {
      phase1Correct = true;
      sessionStats.phase1Correct++;
      const xp = 15;
      sessionStats.xpEarned += xp;
      const state = Engine.getState();
      state.player.totalXP += xp;
      state.player.level = Engine.getLevel(state.player.totalXP);
      feedback.innerHTML = `<div class="explanation-card"><h4>// CORRECT +15 XP</h4><p>Threat identified. Now select the countermeasure.</p></div>`;
    } else {
      feedback.innerHTML = `<div class="explanation-card"><h4>// INCORRECT</h4><p>The attack was <strong>${UI.escapeHtml(scenario.attack)}</strong>. Now select the countermeasure.</p></div>`;
    }

    UI.updateHeader();

    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.textContent = 'DEFEND →';
    nextBtn.addEventListener('click', () => renderPhase2(scenario));
    feedback.appendChild(nextBtn);

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', keyHandler); renderPhase2(scenario); }
    };
    setTimeout(() => document.addEventListener('keydown', keyHandler), 200);
  }

  function renderPhase2(scenario) {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';

    const streakDisplay = killChainStreak > 0 ? `<span class="kill-chain-badge">Kill Chain: ${killChainStreak + 1}x</span>` : '';

    div.innerHTML = `
      <div class="round-header">
        <span class="round-progress">Round ${currentRound + 1}/${TOTAL_ROUNDS}</span>
        ${streakDisplay}
      </div>
      <h3 class="phase-label">Phase: DEFEND</h3>
      <div class="question-card cable-scenario">
        <h4>THREAT: ${UI.escapeHtml(scenario.attack)}</h4>
        <p>Status: ${phase1Correct ? 'IDENTIFIED &#10003;' : 'MISIDENTIFIED &#10007;'}</p>
      </div>
      <p class="phase-prompt">Select the correct countermeasure:</p>
      <div class="answer-choices"></div>
      <div id="phase-feedback"></div>
    `;

    const choices = div.querySelector('.answer-choices');
    const shuffled = UI.shuffleArray([...scenario.defenseChoices]);

    shuffled.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'answer-btn';
      btn.textContent = choice;
      btn.addEventListener('click', () => handlePhase2Answer(scenario, choice, div));
      choices.appendChild(btn);
    });

    container.appendChild(div);
  }

  function handlePhase2Answer(scenario, selected, div) {
    const buttons = div.querySelectorAll('.answer-btn');
    const feedback = div.querySelector('#phase-feedback');
    const correct = selected === scenario.defense;

    sessionStats.answered++;

    buttons.forEach(btn => {
      btn.classList.add('disabled');
      if (btn.textContent === scenario.defense) btn.classList.add(correct ? 'correct' : 'show-correct');
      if (btn.textContent === selected && !correct) btn.classList.add('incorrect');
    });

    let roundXP = 0;
    const state = Engine.getState();

    if (correct) {
      sessionStats.phase2Correct++;
      roundXP += 15;
    }

    const bothCorrect = phase1Correct && correct;
    const neitherCorrect = !phase1Correct && !correct;

    if (bothCorrect) {
      killChainStreak++;
      if (killChainStreak > sessionStats.bestStreak) sessionStats.bestStreak = killChainStreak;
      const bonus = 20 * killChainStreak;
      roundXP += bonus;
      sessionStats.killChains++;
      sessionStats.xpEarned += roundXP;
      sessionStats.correct++;
      state.player.totalXP += roundXP;
      state.player.level = Engine.getLevel(state.player.totalXP);
      state.player.streak++;
      if (state.player.streak > state.player.bestStreak) state.player.bestStreak = state.player.streak;

      feedback.innerHTML = `<div class="explanation-card"><h4>// KILL CHAIN BROKEN +${15 + roundXP} XP</h4><p>${UI.escapeHtml(scenario.explanation)}</p></div>`;
      const rect = div.querySelector('.question-card').getBoundingClientRect();
      UI.spawnParticles(rect.left + rect.width / 2, rect.top);
    } else if (neitherCorrect) {
      killChainStreak = 0;
      state.player.streak = 0;
      feedback.innerHTML = `<div class="explanation-card"><h4>// ATTACK SUCCEEDED &mdash; 0 XP</h4><p>${UI.escapeHtml(scenario.explanation)}</p></div>`;
    } else {
      killChainStreak = 0;
      sessionStats.xpEarned += roundXP;
      state.player.totalXP += roundXP;
      state.player.level = Engine.getLevel(state.player.totalXP);
      state.player.streak = 0;
      feedback.innerHTML = `<div class="explanation-card"><h4>// PARTIAL CREDIT +${(phase1Correct ? 15 : 0) + roundXP} XP</h4><p>${UI.escapeHtml(scenario.explanation)}</p></div>`;
    }

    UI.updateHeader();

    currentRound++;
    const btnText = currentRound >= TOTAL_ROUNDS ? 'VIEW RESULTS' : 'NEXT ROUND →';
    const nextBtn = document.createElement('button');
    nextBtn.className = 'next-btn';
    nextBtn.textContent = btnText;
    nextBtn.addEventListener('click', showRound);
    feedback.appendChild(nextBtn);

    const keyHandler = (e) => {
      if (e.key === 'Enter' || e.key === ' ') { document.removeEventListener('keydown', keyHandler); showRound(); }
    };
    setTimeout(() => document.addEventListener('keydown', keyHandler), 200);
  }

  function showEndScreen() {
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const phase1Pct = sessionStats.answered > 0 ? Math.round((sessionStats.phase1Correct / sessionStats.answered) * 100) : 0;
    const phase2Pct = sessionStats.answered > 0 ? Math.round((sessionStats.phase2Correct / sessionStats.answered) * 100) : 0;

    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';
    div.innerHTML = `
      <h2 class="route-title">MISSION COMPLETE</h2>
      <div class="explanation-card">
        <table class="binary-ref-table">
          <tbody>
            <tr><td>Total XP Earned</td><td><strong>${sessionStats.xpEarned}</strong></td></tr>
            <tr><td>Kill Chains Broken</td><td><strong>${sessionStats.killChains}/${sessionStats.answered}</strong></td></tr>
            <tr><td>Phase 1 Accuracy (Identify)</td><td><strong>${phase1Pct}%</strong></td></tr>
            <tr><td>Phase 2 Accuracy (Defend)</td><td><strong>${phase2Pct}%</strong></td></tr>
            <tr><td>Longest Kill Chain Streak</td><td><strong>${sessionStats.bestStreak}</strong></td></tr>
          </tbody>
        </table>
      </div>
      <button class="next-btn" id="play-again-btn">PLAY AGAIN</button>
    `;

    div.querySelector('#play-again-btn').addEventListener('click', () => start(container));
    container.appendChild(div);
  }

  return { start };
})();

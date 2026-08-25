const Engine = (() => {
  const STORAGE_KEY = 'netops_command_progress';
  const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000, 13000, 17000, 22000, 28000, 35000, 43000, 52000, 62000];
  const XP_MAP = { 1: 10, 2: 25, 3: 50 };
  const STREAK_MULTIPLIERS = [[10, 3], [5, 2], [3, 1.5]];
  const SRS_INITIAL_INTERVAL = 3600000;

  const DOMAINS = [
    { id: 1, name: 'Networking Concepts', weight: 23 },
    { id: 2, name: 'Network Implementation', weight: 20 },
    { id: 3, name: 'Network Operations', weight: 19 },
    { id: 4, name: 'Network Security', weight: 19 },
    { id: 5, name: 'Network Troubleshooting', weight: 19 },
  ];

  const DIFF_LABELS = { 1: 'easy', 2: 'medium', 3: 'hard' };

  function getDefaultState() {
    return {
      version: '1.0.0',
      player: { totalXP: 0, level: 1, streak: 0, bestStreak: 0 },
      domains: {
        1: { seen: 0, correct: 0 },
        2: { seen: 0, correct: 0 },
        3: { seen: 0, correct: 0 },
        4: { seen: 0, correct: 0 },
      },
      concepts: {},
      sessions: []
    };
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw);
        for (const d of DOMAINS) {
          if (!s.domains[d.id]) s.domains[d.id] = { seen: 0, correct: 0 };
        }
        return s;
      }
    } catch (e) {}
    return getDefaultState();
  }

  let saveTimer = null;
  function save(state) {
    if (saveTimer) return;
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      saveTimer = null;
    }, 1000);
  }

  function saveNow() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  let state = load();

  function getState() { return state; }

  function getLevel(xp) {
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
    }
    return 1;
  }

  function getLevelProgress(xp) {
    const level = getLevel(xp);
    const current = LEVEL_THRESHOLDS[level - 1] || 0;
    const next = LEVEL_THRESHOLDS[level] || current + 1000;
    return (xp - current) / (next - current);
  }

  function getStreakMultiplier(streak) {
    for (const [threshold, mult] of STREAK_MULTIPLIERS) {
      if (streak >= threshold) return mult;
    }
    return 1;
  }

  function recordAnswer(conceptId, domainId, difficulty, correct) {
    const now = Date.now();

    if (!state.concepts[conceptId]) {
      state.concepts[conceptId] = { seen: 0, correct: 0, lastSeen: 0, interval: SRS_INITIAL_INTERVAL, nextDue: 0 };
    }

    const concept = state.concepts[conceptId];
    concept.seen++;
    concept.lastSeen = now;

    if (correct) {
      concept.correct++;
      concept.interval = Math.min(concept.interval * 2, 2592000000);
      state.player.streak++;
      if (state.player.streak > state.player.bestStreak) {
        state.player.bestStreak = state.player.streak;
      }
      state.domains[domainId].correct++;
    } else {
      concept.interval = SRS_INITIAL_INTERVAL;
      state.player.streak = 0;
    }

    concept.nextDue = now + concept.interval;
    state.domains[domainId].seen++;

    let xp = 0;
    if (correct) {
      const base = XP_MAP[difficulty] || 10;
      const mult = getStreakMultiplier(state.player.streak);
      xp = Math.round(base * mult);
      state.player.totalXP += xp;
      state.player.level = getLevel(state.player.totalXP);
    }

    save(state);
    return { xp, streak: state.player.streak, multiplier: getStreakMultiplier(state.player.streak) };
  }

  function getDomainMastery(domainId, totalConcepts) {
    const d = state.domains[domainId];
    if (!d || d.correct === 0 || !totalConcepts) return 0;
    return Math.round((d.correct / totalConcepts) * 100);
  }

  function getDueCount() {
    const now = Date.now();
    let count = 0;
    for (const id in state.concepts) {
      if (state.concepts[id].nextDue <= now) count++;
    }
    return count;
  }

  function getDueConceptIds() {
    const now = Date.now();
    return Object.entries(state.concepts)
      .filter(([_, c]) => c.nextDue <= now)
      .sort((a, b) => a[1].nextDue - b[1].nextDue)
      .map(([id]) => id);
  }

  function selectNextConcept(allConcepts, domainWeights) {
    const dueIds = getDueConceptIds();

    if (dueIds.length > 0) {
      const dueId = dueIds[Math.floor(Math.random() * Math.min(5, dueIds.length))];
      const found = allConcepts.find(c => c.id === dueId);
      if (found) return found;
    }

    const unseenSet = new Set();
    for (const c of allConcepts) {
      if (!state.concepts[c.id]) unseenSet.add(c.id);
    }

    if (unseenSet.size > 0) {
      const domainPool = [];
      for (const w of domainWeights) {
        const domainUnseen = allConcepts.filter(c => c.domainId === w.id && unseenSet.has(c.id));
        for (let i = 0; i < w.weight; i++) {
          if (domainUnseen.length > 0) domainPool.push(domainUnseen);
        }
      }
      if (domainPool.length > 0) {
        const pool = domainPool[Math.floor(Math.random() * domainPool.length)];
        return pool[Math.floor(Math.random() * pool.length)];
      }
    }

    return allConcepts[Math.floor(Math.random() * allConcepts.length)];
  }

  function recordSession(mode, duration, xpEarned, questionsAnswered) {
    state.sessions.push({
      date: new Date().toISOString(),
      mode, duration, xpEarned, questionsAnswered
    });
    if (state.sessions.length > 50) state.sessions = state.sessions.slice(-50);
    save(state);
  }

  function resetProgress() {
    state = getDefaultState();
    saveNow();
  }

  window.addEventListener('beforeunload', saveNow);

  return {
    getState,
    getLevel,
    getLevelProgress,
    getStreakMultiplier,
    recordAnswer,
    getDomainMastery,
    getDueCount,
    getDueConceptIds,
    selectNextConcept,
    recordSession,
    resetProgress,
    DOMAINS,
    DIFF_LABELS,
    XP_MAP
  };
})();

#!/usr/bin/env node
// Generates js/data.js from flashcard markdown files.
// Run: node generate-data.js

const fs = require('fs');
const path = require('path');

const FLASH_DIR = path.join(__dirname, '..', 'flashcards');
const ABBREV_FILE = path.join(__dirname, '..', '..', 'abbreviations.md');
const OVERRIDES_FILE = path.join(__dirname, 'distractor-overrides.json');
const OUTPUT = path.join(__dirname, 'js', 'data.js');

const DOMAIN_META = [
  { id: 1, name: 'Networking Concepts', weight: 23, dir: '1-networking-concepts' },
  { id: 2, name: 'Network Implementation', weight: 20, dir: '2-network-implementation' },
  { id: 3, name: 'Network Operations', weight: 19, dir: '3-network-operations' },
  { id: 4, name: 'Network Security', weight: 19, dir: '4-network-security' },
];

function parseFlashcardFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const cards = [];
  const blocks = content.split(/^---$/m);

  for (const block of blocks) {
    const qMatch = block.match(/\*\*Q:\*\*\s*(.+?)(?:\n|$)/);
    const aMatch = block.match(/\*\*A:\*\*\s*([\s\S]+?)(?=\*\*Difficulty|\*\*Tags|$)/);
    const dMatch = block.match(/\*\*Difficulty:\*\*\s*(\w+)/);

    if (qMatch && aMatch) {
      const answer = aMatch[1].trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
      const diffStr = dMatch ? dMatch[1].toLowerCase() : 'medium';
      const difficulty = diffStr === 'easy' ? 1 : diffStr === 'hard' ? 3 : 2;
      cards.push({ question: qMatch[1].trim(), answer, difficulty });
    }
  }
  return cards;
}

function getObjectiveFromFilename(filename) {
  const match = filename.match(/^(\d+\.\d+)/);
  return match ? match[1] : null;
}

function getTitleFromFilename(filename) {
  return filename
    .replace(/^\d+\.\d+-/, '')
    .replace(/\.md$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

function loadOverrides() {
  if (!fs.existsSync(OVERRIDES_FILE)) return {};
  return JSON.parse(fs.readFileSync(OVERRIDES_FILE, 'utf8'));
}

function classifyQuestion(question, answer) {
  const q = question.toLowerCase();
  const a = answer;
  if (q.match(/what does .+ stand for|what is .+ short for|what does .+ mean.*abbreviat/)) return 'acronym';
  if (q.match(/which.*layer|at which.*osi|what layer|what osi layer/) || a.match(/^Layer \d/)) return 'layer';
  if (a.match(/^(Yes|No)[.,: —–-]/)) return 'yesno';
  if (q.match(/what port|which port|port does|on (tcp|udp) \d+|you see traffic on/i)) return 'port';
  if (q.match(/what (type|kind) of (cable|connector|fiber)|what.*connector|which.*connector/)) return 'connector';
  if (q.match(/what speed|what.*maximum (distance|speed|length)|how (far|fast|long)/)) return 'numeric';
  return 'general';
}

function extractKey(answer, questionType) {
  if (questionType === 'layer') {
    const m = answer.match(/Layer (\d)/i);
    return m ? `layer${m[1]}` : null;
  }
  if (questionType === 'port') {
    const m = answer.match(/\b(TCP|UDP)\s+(\d+)/i);
    return m ? `${m[1].toUpperCase()}${m[2]}` : null;
  }
  // For any question type, prevent duplicate layer references in distractors
  const layerM = answer.match(/^Layer (\d)/i);
  if (layerM) return `layer${layerM[1]}`;
  return null;
}

function scoreCandidateRelevance(candidate, correctAnswer, questionType) {
  let score = 0;
  const lenRatio = Math.min(candidate.length, correctAnswer.length) / Math.max(candidate.length, correctAnswer.length);
  score += lenRatio * 50;

  if (questionType === 'acronym') {
    // Prefer other acronym-style expansions (capitalized words, no long sentences)
    if (candidate.match(/^[A-Z]/) && !candidate.includes(' — ') && candidate.length < 60) score += 40;
    else if (candidate.match(/^[A-Z]/) && candidate.length < 80) score += 20;
    // Penalize answers that are clearly explanations/sentences
    if (candidate.includes('because') || candidate.includes('used for') || candidate.includes('allows')) score -= 20;
  } else if (questionType === 'layer') {
    if (candidate.match(/^Layer \d/i)) score += 50;
    else if (candidate.match(/layer \d/i)) score += 20;
  } else if (questionType === 'yesno') {
    const correctStarts = correctAnswer.match(/^(Yes|No)/i)?.[1]?.toLowerCase();
    const candidateStarts = candidate.match(/^(Yes|No)/i)?.[1]?.toLowerCase();
    if (candidateStarts) score += 20;
    if (candidateStarts && candidateStarts !== correctStarts) score += 20;
  } else if (questionType === 'port') {
    if (candidate.match(/^(TCP|UDP)\s+\d+/i)) score += 50;
    else if (candidate.match(/\b(TCP|UDP)\s+\d+/i)) score += 30;
  } else if (questionType === 'connector') {
    if (candidate.match(/^(RJ\d+|BNC|F-connector|LC|SC|ST)/i)) score += 40;
    else if (candidate.match(/RJ\d+|BNC|F-connector|LC|SC|ST|SFP|fiber|copper|twist/i)) score += 20;
  } else if (questionType === 'numeric') {
    if (candidate.match(/^\d|meters|gbps|mbps|km|feet/i)) score += 30;
  }

  if (lenRatio < 0.3) score -= 30;

  return score;
}

function generateDistractors(correctAnswer, pool, objectiveAnswers, question, count = 3) {
  const questionType = classifyQuestion(question, correctAnswer);
  const correctKey = extractKey(correctAnswer, questionType);

  // For general questions, prefer same-objective answers first
  let candidates;
  if (questionType === 'general') {
    const objCandidates = objectiveAnswers.filter(a => a !== correctAnswer && a.length > 0);
    const poolCandidates = pool.filter(a => a !== correctAnswer && a.length > 0);
    // Score objective-local answers with a bonus
    const objSet = new Set(objCandidates);
    candidates = [...new Set([...objCandidates, ...poolCandidates])].map(c => ({
      answer: c,
      localBonus: objSet.has(c) ? 15 : 0
    }));
  } else {
    candidates = pool.filter(a => a !== correctAnswer && a.length > 0).map(c => ({
      answer: c,
      localBonus: 0
    }));
  }

  const scored = candidates.map(c => ({
    answer: c.answer,
    score: scoreCandidateRelevance(c.answer, correctAnswer, questionType) + c.localBonus,
    key: extractKey(c.answer, questionType)
  }));
  scored.sort((a, b) => b.score - a.score);

  const selected = [];
  const usedKeys = new Set();
  if (correctKey) usedKeys.add(correctKey);

  for (const s of scored) {
    if (selected.length >= count) break;
    if (selected.includes(s.answer)) continue;
    if (s.key && usedKeys.has(s.key)) continue;
    selected.push(s.answer);
    if (s.key) usedKeys.add(s.key);
  }

  while (selected.length < count) {
    selected.push(`Incorrect option ${selected.length + 1}`);
  }

  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }
  return selected;
}

function buildData() {
  const domains = [];
  const allAnswersByDomain = {};

  for (const meta of DOMAIN_META) {
    const dirPath = path.join(FLASH_DIR, meta.dir);
    if (!fs.existsSync(dirPath)) {
      console.warn(`Skipping ${meta.dir}: directory not found`);
      continue;
    }

    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md')).sort();
    const objectives = {};
    const domainAnswers = [];

    for (const file of files) {
      const objId = getObjectiveFromFilename(file);
      if (!objId) continue;

      const title = getTitleFromFilename(file);
      const cards = parseFlashcardFile(path.join(dirPath, file));

      if (!objectives[objId]) {
        objectives[objId] = { id: objId, title: title, concepts: [] };
      }

      for (const card of cards) {
        domainAnswers.push(card.answer);
        objectives[objId].concepts.push(card);
      }
    }

    allAnswersByDomain[meta.id] = domainAnswers;
    domains.push({
      id: meta.id,
      name: meta.name,
      weight: meta.weight,
      objectives: Object.values(objectives)
    });
  }

  // Build typed pools for distractor selection
  const globalAnswers = Object.values(allAnswersByDomain).flat();
  const typedPools = { acronym: [], layer: [], port: [], yesno: [], connector: [], numeric: [], general: [] };

  for (const domain of domains) {
    for (const obj of domain.objectives) {
      for (const concept of obj.concepts) {
        const type = classifyQuestion(concept.question, concept.answer);
        typedPools[type].push(concept.answer);
      }
    }
  }

  // Assign IDs and generate distractors
  let conceptCounter = 0;
  for (const domain of domains) {
    const domainAnswers = allAnswersByDomain[domain.id] || globalAnswers;
    const fallbackPool = domainAnswers.length > 20 ? domainAnswers : globalAnswers;

    for (const obj of domain.objectives) {
      for (const concept of obj.concepts) {
        conceptCounter++;
        concept.id = `${obj.id}.${conceptCounter}`;
        const type = classifyQuestion(concept.question, concept.answer);
        const pool = typedPools[type].length > 10 ? typedPools[type] : fallbackPool;
        const objAnswers = obj.concepts.map(c => c.answer);
        concept.distractors = generateDistractors(concept.answer, pool, objAnswers, concept.question);
        // Truncate long answers for multiple choice viability
        if (concept.answer.length > 200) {
          concept.answer = concept.answer.substring(0, 197) + '...';
        }
        for (let i = 0; i < concept.distractors.length; i++) {
          if (concept.distractors[i].length > 200) {
            concept.distractors[i] = concept.distractors[i].substring(0, 197) + '...';
          }
        }
      }
    }
  }

  // Apply curated distractor overrides (preserves hand-crafted distractors across regeneration)
  const overrides = loadOverrides();
  let overrideCount = 0;
  let newCount = 0;
  for (const domain of domains) {
    for (const obj of domain.objectives) {
      for (const concept of obj.concepts) {
        if (overrides[concept.id]) {
          concept.distractors = overrides[concept.id];
          overrideCount++;
        } else {
          newCount++;
        }
      }
    }
  }
  if (overrideCount > 0) console.log(`  Applied ${overrideCount} curated distractors`);
  if (newCount > 0) console.log(`  ${newCount} new questions using auto-generated distractors`);

  return { meta: { version: '1.0.0', examCode: 'N10-009', generated: new Date().toISOString() }, domains };
}

function parseAbbreviations() {
  if (!fs.existsSync(ABBREV_FILE)) {
    console.warn('abbreviations.md not found');
    return [];
  }
  const content = fs.readFileSync(ABBREV_FILE, 'utf8');
  const entries = [];
  const rowRe = /^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/gm;
  let match;
  while ((match = rowRe.exec(content)) !== null) {
    const abbrev = match[1].trim();
    const full = match[2].trim();
    if (abbrev === 'Abbreviation' || abbrev.startsWith('-')) continue;
    if (abbrev.length > 0 && full.length > 0) {
      entries.push({ abbrev, full });
    }
  }
  return entries;
}

// Generate and write
console.log('Generating game data...');
const data = buildData();

let totalConcepts = 0;
for (const d of data.domains) {
  const count = d.objectives.reduce((s, o) => s + o.concepts.length, 0);
  console.log(`  Domain ${d.id} (${d.name}): ${count} concepts`);
  totalConcepts += count;
}
console.log(`  Total: ${totalConcepts} concepts`);

const abbrevs = parseAbbreviations();
console.log(`  Abbreviations: ${abbrevs.length} entries`);

const output = `// Auto-generated by generate-data.js — do not edit manually\nconst GAME_DATA = ${JSON.stringify(data, null, 2)};\n\nconst ABBREV_DATA = ${JSON.stringify(abbrevs, null, 2)};\n`;
fs.writeFileSync(OUTPUT, output);
console.log(`Written to ${OUTPUT} (${(output.length / 1024).toFixed(0)} KB)`);

#!/usr/bin/env node
// Generates js/data.js from flashcard markdown files.
// Run: node generate-data.js

const fs = require('fs');
const path = require('path');

const FLASH_DIR = path.join(__dirname, '..', 'flashcards');
const ABBREV_FILE = path.join(__dirname, '..', '..', 'abbreviations.md');
const OUTPUT = path.join(__dirname, 'js', 'data.js');

const DOMAIN_META = [
  { id: 1, name: 'Networking Concepts', weight: 23, dir: '1-networking-concepts' },
  { id: 2, name: 'Network Implementation', weight: 20, dir: '2-network-implementation' },
  { id: 3, name: 'Network Operations', weight: 19, dir: '3-network-operations' },
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

function generateDistractors(correctAnswer, allAnswers, count = 3) {
  const candidates = allAnswers.filter(a => a !== correctAnswer && a.length > 0);
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  // If not enough real distractors, generate generic ones
  while (selected.length < count) {
    selected.push(`Incorrect option ${selected.length + 1}`);
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

  // Build global answer pool for distractors
  const globalAnswers = Object.values(allAnswersByDomain).flat();

  // Assign IDs and generate distractors
  let conceptCounter = 0;
  for (const domain of domains) {
    const domainAnswers = allAnswersByDomain[domain.id] || globalAnswers;
    const pool = domainAnswers.length > 20 ? domainAnswers : globalAnswers;

    for (const obj of domain.objectives) {
      for (const concept of obj.concepts) {
        conceptCounter++;
        concept.id = `${obj.id}.${conceptCounter}`;
        concept.distractors = generateDistractors(concept.answer, pool);
        // Truncate long answers for multiple choice viability
        if (concept.answer.length > 150) {
          concept.answer = concept.answer.substring(0, 147) + '...';
        }
        for (let i = 0; i < concept.distractors.length; i++) {
          if (concept.distractors[i].length > 150) {
            concept.distractors[i] = concept.distractors[i].substring(0, 147) + '...';
          }
        }
      }
    }
  }

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

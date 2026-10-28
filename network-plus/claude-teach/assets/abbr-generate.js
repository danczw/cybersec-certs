#!/usr/bin/env node
/* ===========================================================================
   abbr-generate.js — generate assets/abbr-data.js from the canonical glossary.

   Source of truth is abbreviations/abbreviations.md (see NOTES.md: there is
   exactly one glossary in this repo and this is it). Lessons cannot fetch a
   markdown file over file://, so the table is compiled into a JS object that
   assets/abbr.js consumes at runtime.

   Run after adding abbreviations:
       node claude-teach/assets/abbr-generate.js

   Parsing mirrors abbreviations/abbr-generate.js (the Typst/PDF pipeline) so
   both outputs stay in step.
   =========================================================================== */

const fs = require('fs');
const path = require('path');

const INPUT = path.resolve(__dirname, '../../abbreviations/abbreviations.md');
const OUTPUT = path.join(__dirname, 'abbr-data.js');

function parseTable(content) {
  const rows = [];
  for (const line of content.split('\n')) {
    if (!line.startsWith('|')) continue;
    if (/^\|[\s\-:|]+\|$/.test(line)) continue;

    const cells = line.split('|').slice(1, -1).map((c) => c.trim());
    if (cells[0] === 'Abbreviation') continue;
    if (!cells[0]) continue;

    // Source cell looks like: [1.7-ipv4-addressing](network-plus/notes/…md)
    // Paths are repo-root relative; lessons resolve from network-plus/, so
    // strip the leading segment.
    const srcRaw = (cells[2] || '').trim();
    const linkMatch = srcRaw.match(/\[([^\]]+)\]\(([^)]+)\)/);

    rows.push({
      abbr: cells[0],
      full: cells[1] || '',
      note: linkMatch ? linkMatch[1] : '',
      href: linkMatch ? linkMatch[2].replace(/^network-plus\//, '') : ''
    });
  }
  return rows;
}

const rows = parseTable(fs.readFileSync(INPUT, 'utf8'));

if (!rows.length) {
  console.error('abbr-generate: parsed zero rows from ' + INPUT + ' — aborting.');
  process.exit(1);
}

// Longest first, so a scanner matching greedily hits SSID before SSI, etc.
rows.sort((a, b) => b.abbr.length - a.abbr.length || a.abbr.localeCompare(b.abbr));

const map = {};
for (const r of rows) {
  if (map[r.abbr]) continue; // first definition wins; glossary should not dupe
  map[r.abbr] = { full: r.full, note: r.note, href: r.href };
}

const out =
  '/* GENERATED FILE — do not edit.\n' +
  '   Source: abbreviations/abbreviations.md\n' +
  '   Regenerate: node claude-teach/assets/abbr-generate.js\n' +
  '   ' + Object.keys(map).length + ' abbreviations */\n' +
  'window.ABBR_DATA = ' + JSON.stringify(map, null, 0) + ';\n';

fs.writeFileSync(OUTPUT, out);
console.log('abbr-generate: wrote ' + Object.keys(map).length + ' abbreviations to ' + path.relative(process.cwd(), OUTPUT));

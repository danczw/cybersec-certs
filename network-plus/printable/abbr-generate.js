#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '..', 'abbreviations.md');
const OUTPUT = path.join(__dirname, 'abbr-all.typ');

function parseTable(content) {
  const lines = content.split('\n').filter(l => l.startsWith('|'));
  const rows = [];
  for (const line of lines) {
    if (line.match(/^\|[\s-:|]+\|$/)) continue;
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    if (cells[0] === 'Abbreviation') continue;
    const srcRaw = (cells[2] || '').trim();
    const linkMatch = srcRaw.match(/\[([^\]]+)\]/);
    const source = linkMatch ? linkMatch[1] : '';
    rows.push({ abbr: cells[0], full: cells[1], source });
  }
  rows.sort((a, b) => a.abbr.toLowerCase().localeCompare(b.abbr.toLowerCase()));
  return rows;
}

const content = fs.readFileSync(INPUT, 'utf8');
const rows = parseTable(content);

let typ = `// ─── Network+ Abbreviations Reference (generated) ───
#import "abbr-style.typ": *

#set page(paper: "a5", margin: (x: 8mm, top: 10mm, bottom: 12mm),
  footer: context {
    if counter(page).get().first() > 1 [
      #h(1fr)
      #text(size: 7pt, fill: luma(150))[#counter(page).display()]
      #h(1fr)
    ]
  },
)
#set text(font: "Inter", size: 7pt, weight: "medium", fill: rgb("#3d3d3d"))
#set par(leading: 0.5em)

// ─── Cover ───
#align(center + horizon)[
  #block(
    width: 80%,
    inset: 8mm,
    radius: 4mm,
    fill: gradient.linear(rgb("#667eea"), rgb("#764ba2"), angle: 135deg),
  )[
    #align(center)[
      #text(size: 20pt, weight: "bold", fill: white)[Abbreviations]
      #v(2mm)
      #text(size: 11pt, fill: white.transparentize(10%))[CompTIA Network+ N10-009]
    ]
  ]
]

#pagebreak()

#table(
  columns: (auto, 1fr, auto),
  inset: (x: 3pt, y: 2pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Abbr.],
    text(fill: white, weight: "bold")[Full Name],
    text(fill: white, weight: "bold")[Source],
  ),
`;

for (const row of rows) {
  typ += `  [${row.abbr}], [${row.full}], [${row.source}],\n`;
}

typ += `)\n`;

fs.writeFileSync(OUTPUT, typ);
console.log(`Generated abbr-all.typ with ${rows.length} entries`);

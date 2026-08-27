#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const NOTES_DIR = path.join(__dirname, '..', 'notes');
const OUTPUT_DIR = __dirname;

function findNotes() {
  const notes = [];
  const dirs = fs.readdirSync(NOTES_DIR).filter(d =>
    fs.statSync(path.join(NOTES_DIR, d)).isDirectory() && d !== 'ai-generated'
  );
  for (const dir of dirs) {
    const files = fs.readdirSync(path.join(NOTES_DIR, dir))
      .filter(f => f.endsWith('.md'))
      .sort();
    for (const file of files) {
      notes.push(path.join(NOTES_DIR, dir, file));
    }
  }
  return notes;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  }
  return fm;
}

function escapeTypst(text) {
  return text
    .replace(/#/g, '\\#')
    .replace(/@/g, '\\@')
    .replace(/\$/g, '\\$');
}

function convertInline(text) {
  // Protect inline code from further processing
  const codes = [];
  text = text.replace(/`([^`]+)`/g, (_, c) => {
    codes.push(c);
    return `%%CODE${codes.length - 1}%%`;
  });
  // Bold: **text** → placeholder
  const bolds = [];
  text = text.replace(/\*\*(.+?)\*\*/g, (_, b) => {
    bolds.push(b);
    return `%%BOLD${bolds.length - 1}%%`;
  });
  // Escape all remaining asterisks
  text = text.replace(/\*/g, '\\*');
  // Restore bold as Typst *bold* (use #strong[] when adjacent to word chars or content starts with /)
  text = text.replace(/(\w)?%%BOLD(\d+)%%(\w)?/g, (_, before, i, after) => {
    const b = bolds[i];
    if (before || after || b.startsWith('/')) return `${before || ''}#strong[${b}]${after || ''}`;
    return `*${b}*`;
  });
  // Links (strip, keep text)
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Restore inline code
  text = text.replace(/%%CODE(\d+)%%/g, (_, i) => '`' + codes[i] + '`');
  return text;
}

function convertTable(lines) {
  const rows = [];
  for (const line of lines) {
    if (line.match(/^\|[\s-:|]+\|$/)) continue; // separator
    const cells = line.split('|').slice(1, -1).map(c => c.trim());
    rows.push(cells);
  }
  if (rows.length === 0) return '';

  const cols = rows[0].length;
  let out = `#block(breakable: false)[\n#table(\n  columns: ${cols},\n  inset: (x: 3pt, y: 2.5pt),\n  stroke: none,\n`;
  out += `  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },\n`;
  out += `  table.header(\n`;
  out += rows[0].map(h => `    text(fill: white, weight: "bold")[${convertInline(h)}]`).join(',\n') + ',\n';
  out += `  ),\n`;
  for (let i = 1; i < rows.length; i++) {
    out += rows[i].map(c => `  [${convertInline(c)}]`).join(', ') + ',\n';
  }
  out += `)\n]\n`;
  return out;
}

function convertCallout(lines, title) {
  let out = `#callout("${title}")[\n`;
  let inTable = false;
  let tableLines = [];
  let inCode = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/^>\s?/, '');

    if (line.trim().startsWith('```')) {
      if (!inCode) {
        inCode = true;
        out += '  ```\n';
      } else {
        inCode = false;
        out += '  ```\n';
      }
      continue;
    }
    if (inCode) {
      out += `  ${line}\n`;
      continue;
    }

    if (line.startsWith('|') && line.endsWith('|')) {
      inTable = true;
      tableLines.push(line);
      continue;
    }
    if (inTable) {
      out += '  ' + convertTable(tableLines) + '\n';
      tableLines = [];
      inTable = false;
    }

    if (line.trim() === '') {
      out += '\n';
    } else if (line.startsWith('- ')) {
      out += `  - ${convertInline(line.slice(2))}\n`;
    } else if (line.startsWith('  - ')) {
      out += `    - ${convertInline(line.slice(4))}\n`;
    } else {
      out += `  ${convertInline(line)}\n`;
    }
  }
  if (inTable) {
    out += '  ' + convertTable(tableLines) + '\n';
  }
  out += ']\n';
  return out;
}

function convertMarkdown(content, fm) {
  const lines = content.split('\n');
  let out = '';
  let i = 0;
  let firstH2 = true;

  // Skip frontmatter
  if (lines[0] === '---') {
    i = lines.indexOf('---', 1) + 1;
  }

  while (i < lines.length) {
    const line = lines[i];

    // H1 title — skip (shown in header)
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      i++;
      continue;
    }

    // H2 section
    if (line.startsWith('## ')) {
      const title = line.slice(3);
      out += `#section-heading("${title}")\n\n`;
      i++;
      continue;
    }

    // H3 subsection
    if (line.startsWith('### ')) {
      const title = line.slice(4);
      out += `#sub-heading("${title}")\n`;
      i++;
      continue;
    }

    // H4
    if (line.startsWith('#### ')) {
      const title = line.slice(5);
      out += `*${title}*\n\n`;
      i++;
      continue;
    }

    // Callout block
    const calloutMatch = line.match(/^>\s*\[!NOTE\]\s*(Supplementary|Example)/i);
    if (calloutMatch) {
      const calloutTitle = calloutMatch[1];
      const calloutLines = [];
      i++;
      while (i < lines.length && (lines[i].startsWith('>') || lines[i].trim() === '')) {
        if (lines[i].trim() === '' && i + 1 < lines.length && !lines[i + 1].startsWith('>')) break;
        if (lines[i].match(/^>\s*\[!NOTE\]/i)) break;
        calloutLines.push(lines[i]);
        i++;
      }
      out += convertCallout(calloutLines, calloutTitle) + '\n';
      continue;
    }

    // Table
    if (line.startsWith('|') && line.endsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|') && lines[i].endsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      out += convertTable(tableLines) + '\n';
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '');
      out += `+ ${convertInline(text)}\n`;
      i++;
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      out += `- ${convertInline(line.slice(2))}\n`;
      i++;
      continue;
    }

    // Sub-bullet
    if (line.startsWith('  - ')) {
      out += `  - ${convertInline(line.slice(4))}\n`;
      i++;
      continue;
    }

    // Sub-sub-bullet
    if (line.startsWith('    - ')) {
      out += `    - ${convertInline(line.slice(6))}\n`;
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      out += '\n';
      i++;
      continue;
    }

    // Paragraph text
    out += convertInline(line) + '\n';
    i++;
  }

  return out;
}

function generateTypFile(notePath) {
  const content = fs.readFileSync(notePath, 'utf8');
  const fm = parseFrontmatter(content);
  const basename = path.basename(notePath, '.md');
  const objective = fm.objective || basename.split('-')[0];
  const topic = fm.topic || basename.split('-').slice(1).join(' ');
  const domain = fm.domain || '1.0 Networking Concepts';

  const title = `${objective} — ${topic}`;
  const body = convertMarkdown(content, fm);

  let typ = `#import "../template.typ": *\n\n`;
  typ += `#start-note("${title}", "${domain}", "${objective}")\n\n`;
  typ += `#columns(2, gutter: 5mm)[\n\n`;
  typ += body;
  typ += `]\n`;

  const fixPath = path.join(OUTPUT_DIR, 'fixes', `${basename}.js`);
  if (fs.existsSync(fixPath)) {
    typ = require(fixPath)(typ);
  }

  const outPath = path.join(OUTPUT_DIR, 'notes', `${basename}.typ`);
  fs.writeFileSync(outPath, typ);
  return basename;
}

function generateAllNotes(basenames) {
  let typ = `// ─── Network+ Complete Printable Notes ───\n`;
  typ += `#import "template.typ": *\n\n`;
  typ += `#set page(paper: "a4", margin: (x: 10mm, top: 12mm, bottom: 16mm),\n`;
  typ += `  footer: context {\n`;
  typ += `    if counter(page).get().first() > 1 [\n`;
  typ += `      #line(length: 100%, stroke: 0.3pt + luma(220))\n`;
  typ += `      #v(1mm)\n`;
  typ += `      #text(size: 7pt, fill: luma(150))[#note-title.get()]\n`;
  typ += `      #h(1fr)\n`;
  typ += `      #text(size: 7pt, fill: luma(150))[professormesser.com]\n`;
  typ += `      #h(1fr)\n`;
  typ += `      #text(size: 9pt, fill: luma(120))[#counter(page).display()]\n`;
  typ += `    ]\n`;
  typ += `  },\n`;
  typ += `)\n`;
  typ += `#set text(font: "Inter", size: 9pt, weight: "medium", fill: rgb("#3d3d3d"))\n`;
  typ += `#set par(leading: 0.75em)\n`;
  typ += `#set list(spacing: 1.2em)\n`;
  typ += `#set enum(spacing: 1.2em)\n\n`;

  // Cover page
  typ += `// ─── Cover Page ───\n`;
  typ += `#align(center + horizon)[\n`;
  typ += `  #block(\n`;
  typ += `    width: 80%,\n`;
  typ += `    inset: 10mm,\n`;
  typ += `    radius: 4mm,\n`;
  typ += `    fill: gradient.linear(rgb("#667eea"), rgb("#764ba2"), angle: 135deg),\n`;
  typ += `  )[\n`;
  typ += `    #align(center)[\n`;
  typ += `      #text(size: 28pt, weight: "bold", fill: white)[CompTIA Network+]\n`;
  typ += `      #v(3mm)\n`;
  typ += `      #text(size: 16pt, fill: white.transparentize(10%))[N10-009]\n`;
  typ += `      #v(8mm)\n`;
  typ += `      #text(size: 14pt, fill: white.transparentize(20%))[Study Notes]\n`;
  typ += `    ]\n`;
  typ += `  ]\n`;
  typ += `  #v(10mm)\n`;
  typ += `  #text(size: 10pt, fill: luma(120))[Based on Professor Messer video series]\n`;
  typ += `  #v(3mm)\n`;
  typ += `  #text(size: 9pt, fill: luma(150))[professormesser.com]\n`;
  typ += `]\n\n`;

  for (const name of basenames) {
    typ += `#include "notes/${name}.typ"\n`;
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'all-notes.typ'), typ);
}

// Main
const notes = findNotes();
const basenames = [];

for (const note of notes) {
  const name = generateTypFile(note);
  basenames.push(name);
  console.log(`Generated: ${name}.typ`);
}

generateAllNotes(basenames);
console.log(`\nGenerated all-notes.typ with ${basenames.length} includes`);

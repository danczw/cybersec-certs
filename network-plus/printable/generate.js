#!/usr/bin/env node
// Converts a markdown note to printable HTML using the flowing template.
// Usage: node generate.js <path-to-note.md> [output.html]

const fs = require('fs');
const path = require('path');

const inputPath = process.argv[2];
if (!inputPath) {
  console.error('Usage: node generate.js <note.md> [output.html]');
  process.exit(1);
}

const outputPath = process.argv[3] ||
  path.join(__dirname, path.basename(inputPath, '.md') + '.html');

const raw = fs.readFileSync(inputPath, 'utf8');

// --- Parse YAML frontmatter ---
const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
if (!fmMatch) {
  console.error('No YAML frontmatter found');
  process.exit(1);
}

const frontmatter = {};
for (const line of fmMatch[1].split('\n')) {
  const m = line.match(/^(\w+):\s*"?(.+?)"?\s*$/);
  if (m) frontmatter[m[1]] = m[2];
}

const body = fmMatch[2];
const domain = frontmatter.domain || '';
const topic = frontmatter.topic || '';
const objective = frontmatter.objective || '';
const source = frontmatter.source || '';

const domainNum = domain.match(/^(\d)/)?.[1] || '1';

// --- Markdown to HTML conversion ---
function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(text) {
  let s = escapeHtml(text);
  // bold
  s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // inline code
  s = s.replace(/`(.+?)`/g, '<code>$1</code>');
  // italic
  s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
  return s;
}

function parseTable(lines) {
  const rows = lines.map(l =>
    l.replace(/^\|/, '').replace(/\|$/, '').split('|').map(c => c.trim())
  );
  // row[1] is the separator line
  const header = rows[0];
  const dataRows = rows.slice(2);

  let html = '<table>\n<tr>';
  for (const h of header) html += `<th>${inlineMarkdown(h)}</th>`;
  html += '</tr>\n';
  for (const row of dataRows) {
    html += '<tr>';
    for (const cell of row) html += `<td>${inlineMarkdown(cell)}</td>`;
    html += '</tr>\n';
  }
  html += '</table>\n';
  return html;
}

function convertBody(md, opts = {}) {
  const lines = md.split('\n');
  let html = '';
  let i = 0;
  let inCallout = false;
  let calloutLines = [];
  let calloutTitle = '';
  let inSubsection = false;

  function flushCallout() {
    if (!inCallout) return;
    html += '<div class="callout">\n';
    html += `<div class="callout-title">${escapeHtml(calloutTitle)}</div>\n`;
    html += convertBody(calloutLines.join('\n'), { nested: true });
    html += '</div>\n';
    inCallout = false;
    calloutLines = [];
    calloutTitle = '';
  }

  function closeSubsection() {
    if (inSubsection) {
      html += '</div>\n';
      inSubsection = false;
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // Callout block start: > [!NOTE] Title
    if (line.match(/^>\s*\[!NOTE\]/i)) {
      flushCallout();
      calloutTitle = line.replace(/^>\s*\[!NOTE\]\s*/i, '').trim() || 'Supplementary';
      inCallout = true;
      i++;
      continue;
    }

    // Continuation of callout
    if (inCallout && line.startsWith('>')) {
      const content = line.replace(/^>\s?/, '');
      calloutLines.push(content);
      i++;
      continue;
    }

    // End of callout (non-> line)
    if (inCallout && !line.startsWith('>')) {
      flushCallout();
    }

    // Blank line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Headings
    const h1Match = line.match(/^#\s+(.+)/);
    if (h1Match) {
      i++;
      continue;
    }

    const h2Match = line.match(/^##\s+(.+)/);
    if (h2Match) {
      if (!opts.nested) closeSubsection();
      html += `<h2>${inlineMarkdown(h2Match[1])}</h2>\n`;
      i++;
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)/);
    if (h3Match) {
      if (!opts.nested) {
        closeSubsection();
        html += '<div class="subsection">\n';
        inSubsection = true;
      }
      html += `<h3>${inlineMarkdown(h3Match[1])}</h3>\n`;
      i++;
      continue;
    }

    const h4Match = line.match(/^####\s+(.+)/);
    if (h4Match) {
      html += `<h4>${inlineMarkdown(h4Match[1])}</h4>\n`;
      i++;
      continue;
    }

    // Table
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      html += parseTable(tableLines);
      continue;
    }

    // Indented sub-bullets appearing outside a list context
    if (line.match(/^\s{2,}[-*]\s/)) {
      html += '<ul>\n';
      while (i < lines.length && lines[i].match(/^\s{2,}[-*]\s/)) {
        const item = lines[i].replace(/^\s+[-*]\s+/, '');
        html += `<li>${inlineMarkdown(item)}</li>\n`;
        i++;
      }
      html += '</ul>\n';
      continue;
    }

    // Unordered list (with nested sub-bullets)
    if (line.match(/^[-*]\s/)) {
      html += '<ul>\n';
      while (i < lines.length && lines[i].match(/^(\s*)[-*]\s/)) {
        const indent = lines[i].match(/^(\s*)/)[1].length;
        if (indent >= 2) {
          // Sub-bullet: open nested list, collect all at this indent
          html += '<ul>\n';
          while (i < lines.length && lines[i].match(/^\s{2,}[-*]\s/)) {
            const item = lines[i].replace(/^\s+[-*]\s+/, '');
            html += `<li>${inlineMarkdown(item)}</li>\n`;
            i++;
          }
          html += '</ul>\n';
        } else {
          const item = lines[i].replace(/^[-*]\s+/, '');
          html += `<li>${inlineMarkdown(item)}</li>\n`;
          i++;
        }
      }
      html += '</ul>\n';
      continue;
    }

    // Ordered list (with nested sub-bullets)
    if (line.match(/^\d+\.\s/)) {
      html += '<ol class="steps">\n';
      while (i < lines.length && (lines[i].match(/^\d+\.\s/) || lines[i].match(/^\s{2,}[-*]\s/))) {
        if (lines[i].match(/^\s{2,}[-*]\s/)) {
          html += '<ul>\n';
          while (i < lines.length && lines[i].match(/^\s{2,}[-*]\s/)) {
            const item = lines[i].replace(/^\s+[-*]\s+/, '');
            html += `<li>${inlineMarkdown(item)}</li>\n`;
            i++;
          }
          html += '</ul>\n';
        } else {
          const item = lines[i].replace(/^\d+\.\s+/, '');
          html += `<li>${inlineMarkdown(item)}</li>\n`;
          i++;
        }
      }
      html += '</ol>\n';
      continue;
    }

    // Code block
    if (line.startsWith('```')) {
      i++;
      let code = '';
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += escapeHtml(lines[i]) + '\n';
        i++;
      }
      if (i < lines.length) i++;
      html += `<pre>${code.trimEnd()}</pre>\n`;
      continue;
    }

    // Paragraph
    html += `<p>${inlineMarkdown(line)}</p>\n`;
    i++;
  }

  flushCallout();
  if (!opts.nested) closeSubsection();
  return html;
}

const contentHtml = convertBody(body);

// --- Assemble full HTML ---
const templatePath = path.join(__dirname, 'note_template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// Extract just the <style> block from the template
const styleMatch = template.match(/<style>([\s\S]*?)<\/style>/);
const styles = styleMatch ? styleMatch[1] : '';

const sourceHost = source ? new URL(source).hostname : 'professormesser.com';

const finalHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${escapeHtml(topic)} — Network+ Notes</title>
<style>${styles}</style>
</head>
<body>

<div class="document domain-${domainNum}">

  <div class="header">
    <h1>${escapeHtml(topic)}</h1>
    <div class="header-meta">
      <span>${escapeHtml(domain)}</span>
      <span>OBJ ${escapeHtml(objective)}</span>
      <span>CompTIA Network+ N10-009</span>
    </div>
  </div>

  <div class="content">
${contentHtml}
  </div>

  <div class="footer">
    <span>Source: ${escapeHtml(sourceHost)}</span>
  </div>

</div>

</body>
</html>`;

fs.writeFileSync(outputPath, finalHtml);
console.log(`Generated: ${outputPath}`);

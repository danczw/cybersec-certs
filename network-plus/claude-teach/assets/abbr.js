/* ===========================================================================
   abbr.js — click-to-reveal acronym expansion for lessons.

   Why this exists: the user's self-reported bottleneck is often the acronym
   layer, not the concept. Without help, a wrong quiz answer is ambiguous —
   it could mean "does not know what RPO stands for" or "does not understand
   recovery objectives". Those need completely different lessons.

   So: acronyms become click-to-reveal chips, and every reveal is LOGGED. The
   lookup list is diagnostic data. If you looked up nine acronyms and still
   scored well, vocabulary is the bottleneck and the fix is drilling the
   glossary. If you looked up none and scored badly, it is the concepts.

   Deliberately NOT auto-expanded inline:
     1. Expanding "RPO" to "Recovery Point Objective" in a question stem can
        hand over the answer. Recovery POINT → data point. Free marks.
     2. Reveal-on-demand preserves the retrieval attempt. You get one beat to
        recall it yourself before the crutch appears — that beat is the
        learning.

   Quiz options are excluded by default (see EXCLUDE). An acronym chip on one
   option and not the others is a formatting tell, and the whole quiz design
   depends on options being visually indistinguishable.

   Requires: assets/abbr-data.js (generated — run abbr-generate.js)

   Usage:
     Abbr.init();              // scans document body
     Abbr.scan(someElement);   // scan newly inserted content
     Abbr.lookups();           // -> ['RPO', 'SNMP', …] in lookup order
   =========================================================================== */

(function (global) {
  'use strict';

  var REPO_BASE = '../../'; // claude-teach/lessons/ -> network-plus/

  // Never rewrite text inside these.
  var EXCLUDE = 'a, abbr, code, kbd, pre, script, style, button, .q__opts, .no-abbr';

  var data = global.ABBR_DATA || {};
  var seen = {};      // acronym -> true once chipped (first occurrence only)
  var looked = [];    // acronyms the user actually revealed, in order
  var listeners = [];
  var rx = null;
  var openCard = null;

  function escapeRx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  function buildRegex() {
    var keys = Object.keys(data);
    if (!keys.length) return null;
    // Longest first so SSID wins over SSI. Boundaries are hand-rolled rather
    // than \b because acronyms like "PoE" and "802.11" break \b assumptions.
    keys.sort(function (a, b) { return b.length - a.length; });
    return new RegExp('(^|[^A-Za-z0-9])(' + keys.map(escapeRx).join('|') + ')(?![A-Za-z0-9])', 'g');
  }

  function isExcluded(node) {
    for (var n = node.parentNode; n && n.nodeType === 1; n = n.parentNode) {
      if (n.matches && n.matches(EXCLUDE)) return true;
    }
    return false;
  }

  function makeChip(term) {
    var entry = data[term];
    var chip = document.createElement('span');
    chip.className = 'abbr-chip';
    chip.tabIndex = 0;
    chip.setAttribute('role', 'button');
    chip.setAttribute('aria-label', 'Expand ' + term);
    chip.dataset.term = term;
    chip.textContent = term;
    chip.title = 'Click to expand';

    function toggle(e) {
      e.preventDefault();
      e.stopPropagation();
      if (chip.classList.contains('is-open')) { closeCard(); return; }
      reveal(chip, term, entry);
    }

    chip.addEventListener('click', toggle);
    chip.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') toggle(e);
    });
    return chip;
  }

  function closeCard() {
    if (!openCard) return;
    if (openCard.chip) openCard.chip.classList.remove('is-open');
    if (openCard.card && openCard.card.parentNode) openCard.card.parentNode.removeChild(openCard.card);
    openCard = null;
  }

  function reveal(chip, term, entry) {
    closeCard();
    chip.classList.add('is-open', 'is-revealed');

    var card = document.createElement('span');
    card.className = 'abbr-card';

    var full = document.createElement('strong');
    full.textContent = entry.full || '(no expansion recorded)';
    card.appendChild(full);

    if (entry.href) {
      var a = document.createElement('a');
      a.href = REPO_BASE + entry.href;
      a.textContent = entry.note || 'notes';
      a.className = 'abbr-card__src';
      card.appendChild(a);
    }

    chip.appendChild(card);
    openCard = { chip: chip, card: card };

    if (looked.indexOf(term) === -1) {
      looked.push(term);
      persist();
      listeners.forEach(function (fn) { fn(term, looked.slice()); });
    }
  }

  function persist() {
    try { sessionStorage.setItem('np-abbr-lookups', JSON.stringify(looked)); } catch (e) {}
  }

  function scan(root) {
    if (!rx) rx = buildRegex();
    if (!rx) return;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !/[A-Z]/.test(node.nodeValue)) return NodeFilter.FILTER_REJECT;
        if (isExcluded(node)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var targets = [];
    var n;
    while ((n = walker.nextNode())) targets.push(n);

    targets.forEach(function (textNode) {
      var text = textNode.nodeValue;
      rx.lastIndex = 0;

      var frag = null;
      var cursor = 0;
      var m;

      while ((m = rx.exec(text))) {
        var term = m[2];
        if (seen[term]) continue;            // only chip the first occurrence
        seen[term] = true;

        var at = m.index + m[1].length;
        frag = frag || document.createDocumentFragment();
        frag.appendChild(document.createTextNode(text.slice(cursor, at)));
        frag.appendChild(makeChip(term));
        cursor = at + term.length;
      }

      if (frag) {
        frag.appendChild(document.createTextNode(text.slice(cursor)));
        textNode.parentNode.replaceChild(frag, textNode);
      }
    });
  }

  document.addEventListener('click', closeCard);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCard(); });

  global.Abbr = {
    init: function (opts) {
      opts = opts || {};
      data = global.ABBR_DATA || {};
      if (!Object.keys(data).length) {
        console.warn('abbr.js: ABBR_DATA empty — run `node claude-teach/assets/abbr-generate.js`');
        return;
      }
      scan(opts.root || document.body);
    },
    scan: scan,
    lookups: function () { return looked.slice(); },
    onLookup: function (fn) { listeners.push(fn); },
    count: function () { return Object.keys(data).length; }
  };
})(window);

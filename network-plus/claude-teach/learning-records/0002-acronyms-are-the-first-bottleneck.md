# Vocabulary is a separate bottleneck from concepts

The user reports they "often have to look up the abbreviations first". Acronym
recall is therefore a distinct skill layer sitting *in front of* every concept
in this certification, and it has to be measured separately — otherwise no
assessment in this workspace can be interpreted.

**Why it matters:** a missed question is ambiguous by default. "RPO measures
data loss expressed as time" can fail because the user does not know what RPO
expands to, or because they do not understand recovery objectives. The first is
cheap to fix (glossary drilling, days); the second is expensive (re-studying a
domain, weeks). Guessing wrong about which one wastes the expensive option on a
cheap problem.

**What was built in response:**

- `assets/abbr-generate.js` compiles the 234 entries in
  `abbreviations/abbreviations.md` into `assets/abbr-data.js`. The markdown file
  stays the single source of truth — no second glossary.
- `assets/abbr.js` turns acronyms into click-to-reveal chips and **logs every
  reveal**. Reveal-on-demand rather than auto-expansion, for two reasons:
  auto-expanding "RPO" into "Recovery Point Objective" inside a question stem
  leaks the answer, and the one beat where the user tries to recall it unaided
  is where the learning happens.
- Quiz options are excluded from chipping. A chip on one option and not the
  others is a formatting tell, and the quiz design depends on options being
  visually indistinguishable.
- `assets/quiz.js` now reports lookups alongside the score, and interprets the
  two together: decent score + many lookups → vocabulary problem; poor score +
  no lookups → concept problem.

**Implications:**

- Lesson 0001's result panel yields **two** signals, not one. Read both before
  choosing lesson 0002.
- If the vocabulary read comes back as the dominant problem, the next step is
  the Abbreviations mode already built into `game/` (multiple-choice and typed
  recall) rather than a new lesson. Don't build what exists.
- Expand acronyms on first use in all future lesson prose.
- `game/` turns out to have nine modes, not the three documented in `README.md`
  — including `abbreviations`, `port-sprint`, `layer-drop`, `cable-lab`,
  `triage-sim`, `route-selector` and `attack-surface`. Worth surveying properly
  before building any new practice material, since it may already be covered.

See [[0001-mission-and-baseline]].

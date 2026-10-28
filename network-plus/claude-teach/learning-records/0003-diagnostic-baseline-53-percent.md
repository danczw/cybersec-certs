# Diagnostic baseline: 53%, concept-limited rather than vocabulary-limited

Lesson 0001 scored **8/15 (53%)**, weighted the same. Per domain: Concepts 1/3,
Implementation 2/3, Operations 2/3, Security 1/2, Troubleshooting 2/4. Two
acronyms expanded (SFTP, PoE), and PoE was expanded inside post-answer feedback
rather than before answering.

**Evidence and reading:** Passing N10-009 needs roughly 75–80% of questions, so
53% is a genuine gap, not a near miss. Pure guessing on four options returns
25%, so the knowledge is real but unconsolidated.

The decisive signal is the lookup count. With effectively **one** pre-answer
acronym lookup across fifteen questions, the hypothesis from
[[0002-acronyms-are-the-first-bottleneck]] does not explain this result —
vocabulary held up better than the user expected, and the deficit is conceptual.
That record is not wrong (acronym lookup is still a stated habit), but it is not
the binding constraint on scores. Keep expanding acronyms on first use; stop
treating vocabulary as the primary lever.

**Distribution matters as much as the total.** Scores are flat across all five
domains rather than concentrated. No single domain is broken, so there is no
single domain to rescue — this is "coverage written, nothing consolidated", which
matches the baseline in [[0001-mission-and-baseline]]. The implication is that
lesson sequencing should follow *foundational dependency* rather than lowest
score, because a flat profile gives weak signal about what to fix first.

**What lesson 0002 targeted and why.** Concepts was lowest (33%) and all three of
its questions were IPv4 addressing or ports. IPv4 address recognition was chosen
over the alternatives because it is the first move in most troubleshooting
questions too — and troubleshooting is 24% of the exam and the other weak area.
One narrow skill, two weak domains. The specific confirmed miss was the
172.16.0.0/12 upper boundary, so both the /12 and the 192.168 near-miss traps are
drilled explicitly.

**Instrument gap found and fixed.** The 0001 result panel reported per-domain
counts but not *which* items failed, so the pick above rests partly on inference
rather than data. `assets/quiz.js` now emits a copy-pasteable report listing each
missed question by `tag` — a short name for the specific idea tested. Future
lessons must set `tag` on every question.

**Next:** subnetting under time pressure (lesson 0003), gated on the 0002 table
becoming automatic. Seven note files already exist on it, including magic-number
and seven-second methods, so again this is consolidation rather than new content.

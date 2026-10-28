# Mission established; coverage is complete but retention is unmeasured

The mission is N10-009 as a forcing function for durable networking
fundamentals, with security work (Security+ / CySA+ / blue team) as the
follow-on. Not a paper-chase: the user wants to reason about real networks, so
lessons should push application over recognition.

**Evidence:** User selected "fill real knowledge gaps" plus "stepping stone to
security" (and partly "pivot into networking") when asked why. Exam unscheduled,
3+ month horizon — depth before speed.

**Baseline:** Material coverage in this workspace is already effectively
complete — 86 note files and 82 flashcard decks spanning all five domains,
transcribed from the Professor Messer N10-009 course. The user self-assessed as
"unsure, diagnose me", so no domain-level competence can be assumed yet.

**Implications:**

- Do **not** write new content notes. The gap is retention and application, not
  coverage. Lessons should be retrieval practice and scenario reasoning over
  existing material.
- Lesson 0001 is a 15-question weighted diagnostic across all five domains
  rather than a content lesson. Its per-domain breakdown sets the real baseline
  and selects the subject of lesson 0002.
- Lesson format is HTML (`lessons/*.html`) specifically so quizzes can
  auto-grade. The feedback loop is the reason for the format choice.
- `game/` is a supplementary drill resource only — explicitly not the teaching
  spine. See [[notes-game-is-supplementary]] in `NOTES.md`.
- Unconfirmed: whether the user wants hands-on lab work (Wireshark, Packet
  Tracer, the Killercoda labs listed in `resources.md`). The mission implies
  yes. Ask after the diagnostic.

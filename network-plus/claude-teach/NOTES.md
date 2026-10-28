# Working Notes

Scratchpad for user preferences and teaching decisions. Not study material.

## User preferences

- **Be extremely concise.** Sacrifice grammar for concision. No closing
  summaries, no restating what was just done.
- **Lesson format: HTML.** `lessons/*.html`, built from shared components in
  `assets/`. Chosen over markdown specifically for auto-graded quizzes — the
  feedback loop is the point.
- **The game is supplementary.** `game/` (NetOps Command) is an extended drill
  resource for spaced repetition between lessons. It is *not* the teaching
  spine, and lessons should not be built around it. Link to it as optional
  practice; don't extend it unless asked.
- **No external knowledge in flashcards.** Per `CLAUDE.md`: flashcard content
  comes only from the corresponding notes file. Lessons may cite external
  sources, but must mark anything not from the Professor Messer transcript.
- **Acronyms are a known bottleneck.** User's words: *"I often have to look up
  the abbreviations first."* Treat the vocabulary layer as a separate skill from
  the concept layer, because confusing the two makes every assessment
  uninterpretable — a wrong answer might mean "doesn't know RPO expands to
  Recovery Point Objective" rather than "doesn't understand recovery
  objectives". Those need different lessons.

  **In practice:** expand an acronym on first use in prose; make lookup
  available but deliberate in lessons (`assets/abbr.js`); never expand inside
  quiz options, since a chip on one option is a formatting tell; and when the
  user misses a question, ask whether the term or the idea was the problem
  before explaining the idea.

## Workspace mapping

All `/teach`-generated material lives in `network-plus/claude-teach/`, kept apart
from the hand-written study material so the generated and transcribed halves of
the repo never blur together. New lessons, reference sheets, assets and learning
records go **inside** `claude-teach/`.

The `/teach` skill expects certain filenames, and this repo had its own
conventions first. Mapping:

| Skill expects    | This repo uses                      | Note                                         |
|------------------|-------------------------------------|----------------------------------------------|
| `MISSION.md`     | `claude-teach/MISSION.md`           | Moved under claude-teach with everything else.|
| `RESOURCES.md`   | `resources.md` (repo root)          | Lowercase, pre-existing. Single source.      |
| `reference/`     | `claude-teach/reference/`           | Hub; defers to `abbreviations/` for glossary.|
| Glossary         | `abbreviations/abbreviations.md`    | Has a Typst → PDF pipeline. Don't duplicate. |

Do **not** create a second resources or glossary file. Extend the existing ones.

### Relative paths

Lessons sit two levels below `network-plus/`, so links reach study material with
`../../` (`../../flashcards/…`, `../../notes/…`) and reach sibling teach material
with `../` (`../assets/lesson.css`, `../MISSION.md`). `REPO_BASE` in
`assets/quiz.js` encodes this for question source links — update it if the
directory ever moves again.

## Teaching decisions

- **Diagnostic first.** User self-assessed as "unsure — diagnose me", so lesson
  0001 is a weighted 15-question sweep across all five domains rather than a
  content lesson. Results drive lesson 0002.
- **Weighting follows exam domains**, not equal split: D1 23%, D2 20%, D3 19%,
  D4 14%, D5 24%. Domain 5 (troubleshooting) is the single biggest slice and the
  hardest to fake — it needs the most skill practice.
- **Quiz answer hygiene:** all options in a question carry the same word count
  and near-equal character count; correct-answer position is varied across
  questions. No formatting or length tells.

## Open questions

- Does the user want hands-on lab work (Wireshark, Packet Tracer, the
  Killercoda labs in `resources.md`)? Mission implies yes eventually; not yet
  confirmed. Ask after the diagnostic.
- Community participation not yet discussed. See `resources.md` → Wisdom.

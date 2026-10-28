# CompTIA Network+ N10-009 — Resources

Curated, annotated, high-trust only. This file doubles as the `/teach` workspace's
`RESOURCES.md` — see `NOTES.md` for the naming mapping. Lesson claims should cite
something here rather than parametric guesswork.

## Knowledge

### Primary course

- [Professor Messer — N10-009 Network+ Training Course](https://www.professormesser.com/network-plus/n10-009/n10-009-video/n10-009-training-course/)
  87 videos, 12h 55m, structured by exam objective. Free, no signup. **Every note in
  `notes/` derives from this course** — it is the canonical source for this workspace.
  Use for: first exposure to any objective, and for resolving disputes about what a
  note meant.
  - [YouTube playlist mirror](https://www.youtube.com/watch?v=k7IOn3TiUc8&list=PLG49S3nxzAnl_tQe3kvnmeMid0mjF8Le8)
  - [Start Here hub](https://www.professormesser.com/get-n10-009-network-plus-certified/) — links study groups, pop quizzes, Discord
- [Professor Messer — Free weekly pop quiz](https://www.professormesser.com/join-my-pop-quiz-mailing-lists/)
  One question a week by email, plus a browsable archive.
  Use for: zero-effort spacing. Costs nothing and keeps retrieval ticking between lessons.
- [N10-008 → N10-009 differences](https://www.professormesser.com/after-class/differences-between-n10-008-and-n10-009/)
  Use for: sanity-checking any third-party material that might be a version behind.

### Official

- [Official N10-009 exam objectives PDF](https://www.comptia.org/training/resources/exam-objectives)
  The exam's actual contract. Anything absent from it cannot be tested.
  Use for: deciding whether a rabbit hole is in scope. Mirrored locally as `objectives.md`.
- [CompTIA Network+ certification page](https://www.comptia.org/certifications/network)
  Use for: logistics — cost, voucher, retake policy, renewal. Exam released 20 Jun 2024,
  estimated retirement **December 2027**; certification valid three years.
- [CertMaster Practice (700+ questions)](https://www.professormesser.com/n10-009-certmaster-practice/) — paid
  CompTIA's own question bank. The closest thing to real exam phrasing.
  Use for: final readiness check, not early study. Worth the money only once diagnostics
  are consistently above ~80%.

### Books

- [CompTIA Network+ N10-009 Certification Guide (Packt)](https://github.com/PacktPublishing/CompTIA-Network-N10-009-Certification-Guide)
  Companion code repo is free and public; the book itself is paid.
  Use for: a second explanation when a Messer video does not land.

### Labs / hands-on

- [tertiarycourses/TGS-2025054472-NetworkPlus](https://github.com/tertiarycourses/TGS-2025054472-NetworkPlus)
  36 labs across all five domains, runnable in the free Killercoda Ubuntu playground —
  no local VM setup.
  Use for: lowest-friction hands-on practice. Start here before building VMs.
- [CaterinaDA/network-plus-lab](https://github.com/CaterinaDA/network-plus-lab)
  Five-week program using real VMs (Ubuntu, Windows Server 2022), Wireshark, nmap,
  Cisco Packet Tracer.
  Use for: the packet-capture and topology-building skills the mission calls for.
  Heavier setup cost.

### Learning method (not Network+ content)

- [Agarwal & Roediger — *How to Use Retrieval Practice to Improve Learning*](https://pdf.retrievalpractice.org/RetrievalPracticeGuide.pdf)
  Free practitioner guide from the cognitive scientists behind the testing-effect
  literature.
  Use for: justifying why lessons quiz before they explain, and why re-reading notes
  feels productive while doing little.

## Wisdom (Communities)

Not yet discussed with the user — proposals, not commitments. Say the word and these
come out of the file.

- [Professor Messer's Discord](https://www.professormesser.com/discord)
  24/7 chat with a dedicated Network+ room, run by the same person who made the course
  you are studying. Highest-signal option because it is populated by people working
  the exact same objectives.
  Use for: "why is this answer right" questions, and exam-day nerves.
- [Professor Messer monthly live study groups](https://www.professormesser.com/network-plus/n10-009/n10-009-study-group/n10-009-network-study-group-replay/)
  Live monthly Q&A plus a replay archive. Free.
  Use for: hearing which topics other candidates stumble on — a cheap way to find your
  own blind spots.
- [r/CompTIA](https://reddit.com/r/CompTIA)
  Heavy traffic on exam logistics, study plans and pass/fail reports. Moderated against
  braindumps (which are also a certification-agreement violation — avoid).
  Use for: study-plan critique and realistic readiness calibration.
- [r/networking](https://reddit.com/r/networking)
  Working network engineers, not candidates. Low tolerance for exam questions — read,
  do not post exam material.
  Use for: the mission's real goal — seeing how these concepts behave in production.

## Gaps

Things the mission needs and no listed resource covers well:

- **Timed full-length practice exams.** The free options are low quality; CertMaster
  Practice is the only trustworthy paid one found so far. Nothing here trains the
  90-minutes/90-questions pacing problem.
- **Performance-based question (PBQ) practice.** N10-009 includes drag-and-drop and
  simulation items. No free source for these has been identified.
- **Security bridge material.** Mission treats Network+ as a stepping stone to
  security work, but no resource here connects the two deliberately. Worth searching
  once the cert is closer.

## Pruned

- `kamleshsande85/4860_Networking_Question-` — 4860 MCQs, previously listed. Removed:
  unvetted provenance, no answer explanations, and bulk question dumps of unknown origin
  risk drilling wrong answers into storage. Volume is not quality.
- `conwilso92/comptia-networkplus-flashcards` — removed; this repo's own 82 flashcard
  decks are transcript-sourced and already cover the same ground.
- `stephenschoettler/networkplus-notes`, `Harshdeep72/network-plus-garden` — removed;
  both are third-party study notes, one explicitly AI-generated. Redundant against
  `notes/`, and unverifiable as a source of truth.

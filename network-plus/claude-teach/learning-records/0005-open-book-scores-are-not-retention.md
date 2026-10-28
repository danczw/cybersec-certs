# Lesson 0002's score was open-book and therefore not a retention measure

Lesson 0002 returned 9/12 (75%), but the user disclosed: *"I answered a lot of
the questions by looking up the initial explanation."* The first-octet table sat
directly above the drill, so the drill measured table-reading, not retrieval.
Closed-book recall of this material remains **unmeasured**.

**Status:** this supersedes any reading of the 0002 score as evidence of
mastery. It does not supersede [[0003-diagnostic-baseline-53-percent]], whose
conclusion (concept-limited, flat profile) still holds.

**The design error was mine.** A reference table placed above a drill in the same
scroll turns retrieval practice into reading comprehension. The lesson then
reports "retained" when nothing was retrieved — worse than no measurement,
because it is a confident wrong one.

**The misses are still informative, and they form a clean pattern.** All three —
Class D multicast, the class boundaries (191 → B), and NAT for private addresses
— were *absent* from the on-page table. Everything the table covered was
answered correctly; everything it did not was missed. Two conclusions:

1. Those three topics were genuinely **untaught**, not forgotten. The class
   table and NAT lived only in the printable reference sheet, never in the
   lesson body. Lesson 0003 teaches them properly.
2. The 9 correct answers carry close to zero evidence about recall.

**Fixed in the tooling.** `assets/quiz.js` gained `closedBook: '<selector>'`,
which collapses the named teaching element when the drill mounts and inserts a
counted "Peek" control. Peeks are reported alongside the score and lookups.
Peeking is permitted rather than blocked, for the same reason acronym lookups
are logged rather than forbidden: a score with its peek count attached stays
interpretable, and a prohibition just gets worked around silently. Lesson 0002
was retrofitted so a retake is honest.

**Implications:**

- **Every future lesson that drills facts must set `closedBook`.** Teaching
  material and retrieval practice cannot share a visible scroll.
- When the user reports a score, ask for the peek count before drawing any
  conclusion from the number.
- A low closed-book score is more valuable than a high open-book one. Say so
  explicitly, so there is no incentive to peek quietly.
- Gate lesson 0004 (subnetting under time pressure) on 0003 returning ~85% with
  no peeks. The leading-bits insight in 0003 is the deliberate bridge into it.

See [[0004-recall-before-recognition]] — the user had already identified the
same recognition-versus-recall problem in the game, one lesson before this
instance of it surfaced here.

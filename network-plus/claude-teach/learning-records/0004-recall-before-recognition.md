# User identified the recognition/recall gap unprompted

The user asked for the Abbreviations game mode to withhold its four options
for a few seconds, reasoning that immediate options make it "always just
recognition but not knowledge". That is the fluency/storage-strength
distinction, arrived at independently from the experience of drilling.

**Why it matters for teaching:** the user is not merely consuming lessons, they
are critiquing the instructional design. Future lessons can assume the *reason*
for a difficult format is understood and worth stating plainly, rather than
needing to be smuggled in. Desirable difficulty can be named as such.

**Evidence:** unprompted request, with the mechanism correctly identified —
recognition is cued retrieval and much easier than free recall, so a
four-option prompt overstates mastery.

**Implemented:** `game/js/modes/abbreviations.js` now holds the options behind a
countdown (selectable 2s / 4s / 6s / off, persisted to localStorage). Revealing
early is allowed on click or Space/Enter, because once the answer is in hand
there is nothing further to gain from waiting. Typed mode was left alone — it is
already free recall.

**Implications:**

- Apply the same principle in lessons where it fits. Lesson quizzes currently
  show options immediately; a recall beat before reveal is worth considering for
  any future lesson that drills recall of facts rather than reasoning.
- The user's own score reading supports this: lesson 0001 came back 53% with
  almost no acronym lookups (see
  [[0003-diagnostic-baseline-53-percent]]), which means multiple-choice
  recognition was carrying more of the result than it appeared to.
- Watch for the same critique applied to lesson design, and treat it as signal
  rather than noise.

See [[0002-acronyms-are-the-first-bottleneck]].

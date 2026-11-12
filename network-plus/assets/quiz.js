// Usage: <div id="quiz"></div> + renderQuiz("quiz", [{q, a:[...], correct:index, why, src}])
// Immediate feedback per question; running score. No dependencies.
function renderQuiz(id, items) {
  const root = document.getElementById(id);
  let done = 0, right = 0;
  const log = [];
  const title = document.title;
  const out = document.createElement("div");
  out.hidden = true;
  const ta = document.createElement("textarea");
  ta.readOnly = true;
  ta.rows = items.length + 3;
  ta.onclick = () => ta.select();
  const copy = document.createElement("button");
  copy.className = "copy";
  copy.textContent = "Copy";
  copy.onclick = () => { ta.select(); navigator.clipboard?.writeText(ta.value); copy.textContent = "Copied"; };
  out.append(ta, copy);
  const score = document.createElement("div");
  score.className = "score";
  const upd = () => {
    score.textContent = `Score: ${right}/${items.length}` + (done === items.length ? " — done. Paste the block below to your teacher." : "");
    if (done === items.length) {
      ta.value = `${title}\nScore: ${right}/${items.length}\n${log.join("\n")}\nGuesses/unsure: (add here)`;
      out.hidden = false;
    }
  };
  items.forEach((it, n) => {
    const box = document.createElement("div");
    box.className = "q";
    const p = document.createElement("p");
    p.textContent = `${n + 1}. ${it.q}`;
    box.append(p);
    const why = document.createElement("div");
    why.className = "why";
    why.hidden = true;
    const btns = it.a.map((txt, i) => {
      const b = document.createElement("button");
      b.textContent = txt;
      b.onclick = () => {
        btns.forEach((x) => (x.disabled = true));
        btns[it.correct].classList.add("ok");
        if (i === it.correct) right++; else b.classList.add("bad");
        done++;
        log[n] = `${n + 1}. ${i === it.correct ? "RIGHT" : "WRONG"} — ${it.q} | picked: ${it.a[i]}` + (i === it.correct ? "" : ` | correct: ${it.a[it.correct]}`);
        why.textContent = it.why + (it.src ? ` [${it.src}]` : "");
        why.hidden = false;
        upd();
      };
      box.append(b);
      return b;
    });
    box.append(why);
    root.append(box);
  });
  upd();
  root.append(score, out);
}

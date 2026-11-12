// Usage: <div id="quiz"></div> + renderQuiz("quiz", [{q, a:[...], correct:index, why, src}])
// Immediate feedback per question; running score. No dependencies.
function renderQuiz(id, items) {
  const root = document.getElementById(id);
  let done = 0, right = 0;
  const score = document.createElement("div");
  score.className = "score";
  const upd = () => (score.textContent = `Score: ${right}/${items.length}` + (done === items.length ? " — done. Tell the teacher which ones you missed." : ""));
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
  root.append(score);
}

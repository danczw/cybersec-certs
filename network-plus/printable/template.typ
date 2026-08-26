// ─── Shared template for Network+ printable notes ───

#let accent = rgb("#667eea")
#let heading-color = rgb("#2d2d44")
#let accent-light = rgb("#e8ecff")
#let accent-bg = rgb("#f3f5ff")
#let example-accent = rgb("#16a34a")
#let example-bg = rgb("#f0fdf4")

#let note-title = state("note-title", none)
#let note-domain = state("note-domain", none)
#let note-objective = state("note-objective", none)

#let note-header-bar(title, domain, objective) = {
  block(
    width: 100%,
    inset: (x: 5mm, y: 3mm),
    radius: 2mm,
    fill: gradient.linear(accent, rgb("#764ba2"), angle: 135deg),
  )[
    #text(size: 12pt, weight: "bold", fill: white)[#title]
    #h(1fr)
    #text(size: 7.5pt, fill: white.transparentize(10%))[
      #box(inset: (x: 1.5mm, y: 0.3mm), radius: 1.5mm, fill: white.transparentize(80%))[#domain]
      #h(2mm)
      #box(inset: (x: 1.5mm, y: 0.3mm), radius: 1.5mm, fill: white.transparentize(80%))[CompTIA Network+ N10-009]
    ]
  ]
}

#let callout(title, body) = {
  let (col, bg, icon) = if lower(title) == "example" {
    (example-accent, example-bg, "▶")
  } else {
    (accent, accent-bg, "✦")
  }
  block(
    width: 100%,
    inset: (x: 3mm, y: 2.5mm),
    radius: (left: 0mm, right: 2mm),
    stroke: (left: 1mm + col),
    fill: bg,
    breakable: false,
  )[
    #text(size: 7.5pt, weight: "bold", fill: col)[#icon #upper(title) #icon]
    #v(1mm)
    #text(size: 8.5pt)[#body]
  ]
}

#let section-heading(title) = {
  v(5mm, weak: true)
  block(below: 2mm, sticky: true)[
    #text(size: 10.5pt, weight: "bold", fill: heading-color)[#title]
    #v(0.5mm)
    #line(length: 100%, stroke: 0.5pt + accent-light)
  ]
}

#let sub-heading(title) = {
  v(1mm)
  block(below: 3mm, sticky: true)[
    #text(size: 9.5pt, weight: "semibold")[#title]
  ]
}

#let start-note(title, domain, objective) = {
  note-title.update(title)
  note-domain.update(domain)
  note-objective.update(objective)
  pagebreak(weak: true)
  note-header-bar(title, domain, objective)
  v(4mm)
}

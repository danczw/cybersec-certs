// ─── Network+ Complete Printable Notes ───
#import "template.typ": *

#set page(paper: "a4", margin: (x: 14mm, top: 20mm, bottom: 16mm),
  header: context {
    let title = note-title.get()
    let domain = note-domain.get()
    let objective = note-objective.get()
    if title != none and counter(page).get().first() > 1 [
      #block(
        width: 100%,
        inset: (x: 5mm, y: 3mm),
        radius: 2mm,
        fill: gradient.linear(rgb("#667eea"), rgb("#764ba2"), angle: 135deg),
      )[
        #text(size: 12pt, weight: "bold", fill: white)[#title]
        #h(1fr)
        #text(size: 7.5pt, fill: white.transparentize(10%))[
          #box(inset: (x: 1.5mm, y: 0.3mm), radius: 1.5mm, fill: white.transparentize(80%))[#domain]
          #h(2mm)
          #box(inset: (x: 1.5mm, y: 0.3mm), radius: 1.5mm, fill: white.transparentize(80%))[OBJ #objective]
        ]
      ]
    ]
  },
  footer: context {
    if counter(page).get().first() > 1 [
      #line(length: 100%, stroke: 0.3pt + luma(220))
      #v(1mm)
      #text(size: 7pt, fill: luma(150))[Source: www.professormesser.com]
      #h(1fr)
      #text(size: 9pt, fill: luma(120))[#counter(page).display()]
    ]
  },
)
#set text(font: "Inter", size: 9pt, weight: "medium", fill: rgb("#3d3d3d"))
#set par(leading: 0.75em)
#set list(spacing: 1.2em)
#set enum(spacing: 1.2em)

// ─── Cover Page ───
#align(center + horizon)[
  #block(
    width: 80%,
    inset: 10mm,
    radius: 4mm,
    fill: gradient.linear(rgb("#667eea"), rgb("#764ba2"), angle: 135deg),
  )[
    #align(center)[
      #text(size: 28pt, weight: "bold", fill: white)[CompTIA Network+]
      #v(3mm)
      #text(size: 16pt, fill: white.transparentize(10%))[N10-009]
      #v(8mm)
      #text(size: 14pt, fill: white.transparentize(20%))[Study Notes]
    ]
  ]
  #v(10mm)
  #text(size: 10pt, fill: luma(120))[Based on Professor Messer video series]
]

#include "1.1-osi-model.typ"

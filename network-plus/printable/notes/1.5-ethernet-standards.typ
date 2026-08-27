#import "../notes-style.typ": *

#start-note("1.5 — Ethernet Standards", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Most popular networking standard in the world
- Varies in speed, cabling type, connectors, and equipment
- Supports both twisted-pair copper and fiber-optic media
- Standards managed by IEEE 802.3 committee

#section-heading("Standard Naming Convention")


#callout("Example")[
  `1000BASE-T`

  #block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Component],
    text(fill: white, weight: "bold")[Meaning],
  ),
  [1000],   [Speed in Mbps (1000 Mbps = 1 Gbps)],
  [BASE],   [Baseband signaling (single frequency)],
  [T],   [Media type (T = twisted-pair, F/SX = fiber)],
)
]

]


- Number prefix = speed (e.g., 10G = 10 Gbps)
- BASE = baseband (single frequency), contrast with broadband (multiple frequencies)
- Suffix letters hint at media type but are not guaranteed to describe it

#section-heading("Common Standards")


#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Standard],
    text(fill: white, weight: "bold")[Speed],
    text(fill: white, weight: "bold")[Media],
  ),
  [1000BASE-T],   [1 Gbps],   [Twisted-pair copper],
  [10GBASE-T],   [10 Gbps],   [Twisted-pair copper],
  [1000BASE-SX],   [1 Gbps],   [Fiber optic (short wavelength)],
)
]


#section-heading("Key Points")


- IEEE naming conventions are informational but not strict — must read the full standard for exact details
- Baseband = single frequency for data transmission
- Broadband = multiple frequencies for data transmission
- SX suffix = short wavelength fiber optic

]

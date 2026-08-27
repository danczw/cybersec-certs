#import "../template.typ": *

#start-note("1.5 — Optical Fiber", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Transmits data using light (LED or laser)
- Difficult to tap without detection → used on secure networks
- Not susceptible to radio frequency interference
- Longer distances than copper (kilometers vs 100 meters for copper)
- Many different standards and connectors — check device documentation

#section-heading("Cable Structure")


#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Component],
    text(fill: white, weight: "bold")[Description],
  ),
  [Core],   [Highly reflective center — carries light],
  [Cladding],   [Low-reflective layer surrounding the core],
  [Buffer coating],   [Protective outer layer],
  [Ferrule],   [Protective cover at connector end],
)
]


- Light source (LED or laser) on one end, receiver on the other
- Light bounces through the reflective core

#section-heading("Multimode Fiber")


- Short-range communication (up to ~2 km)
- Uses inexpensive light source (LED)
- Larger core (larger than wavelength of light)
- Multiple modes (paths) of light propagate through the fiber

#section-heading("Single-Mode Fiber")


- Long-range communication (up to 100 km)
- Uses intense LED or laser
- Smaller core — only one mode of light propagates
- No need to regenerate signal over long distances

]

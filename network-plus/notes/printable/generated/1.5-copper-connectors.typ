#import "../notes-style.typ": *

#start-note("1.5 — Copper Connectors", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("RJ11 (Registered Jack type 11)")


- 6-position, 2-conductor (6P2C)
- Used for analog telephone and DSL connections
- Smaller than RJ45

#section-heading("RJ45 (Registered Jack type 45)")


- 8-position, 8-conductor (8P8C)
- Used for Ethernet connections
- Slightly larger and wider than RJ11

#section-heading("F-Connector")


- Used for coaxial cable modem connections
- Threaded connector — screws in securely
- Single copper conductor on inside of cable carries the signal
- Also referred to as DOCSIS connector (Data Over Cable Service Interface Specification)
- Connects cable television infrastructure to cable modem

#section-heading("BNC (Bayonet Neill-Concelman)")


- Bayonet connector — push in and twist to lock
- Named after Paul Neill (Bell Labs) and Carl Concelman (Amphenol)
- Used for WAN connections and other coax
- Twist to lock prevents accidental removal — must untwist to remove

#section-heading("Summary")


#block(breakable: false)[
#table(
  columns: 4,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Connector],
    text(fill: white, weight: "bold")[Positions/Conductors],
    text(fill: white, weight: "bold")[Use],
    text(fill: white, weight: "bold")[Lock Mechanism],
  ),
  [RJ11],   [6P2C],   [Analog telephone, DSL],   [Clip],
  [RJ45],   [8P8C],   [Ethernet],   [Clip],
  [F-type],   [Single conductor],   [Cable modem (coax)],   [Threaded screw],
  [BNC],   [Single conductor],   [WAN / coax],   [Bayonet twist],
)
]


]

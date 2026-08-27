#import "template.typ": *

#start-note("1.5 — Copper Cabling", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("Twisted Pair")


- Most common cable type for wired Ethernet
- Multiple wires twisted together in a single sheath
- Wires paired together: transmit+/transmit-, receive+/receive-
- Same signal sent in opposite forms to detect and correct interference
- One wire always moving away from interference due to the twist
- Different pairs have different twist rates
- Cable itself has no speed — the Ethernet standard determines throughput
- IEEE 802.3 standards specify minimum cable category for each Ethernet standard

#sub-heading("Cable Categories")

- Cables classified by category (e.g., Cat 5, Cat 6, Cat 7)
- Ethernet standard specifies minimum category required
- Example: 1000BASE-T requires minimum Cat 5
- Any category at or above minimum will work

#section-heading("Coaxial Cable")


- Two or more forms share a common axis
- Structure (inside out): conductor, insulator, shielding, jacket
- The outer shielding is the second conductor (return path), not just protection
- RG-6: common coax type for cable modem / internet connections

#sub-heading("Twinaxial (Twinax)")

- Two conductors inside the cable
- Associated with 10 Gbps Ethernet
- Often installed as part of SFP+ interface
- Full duplex over a single cable
- Limited to ~5 meters
- Lower cost than fiber optics
- Lower latency than twisted pair

#section-heading("Plenum Cabling")


- Plenum = space between drop ceiling and actual ceiling
- Shared air space where network cables, power, sensors may run
- If no ductwork, air flows through the plenum → concern in fires

#sub-heading("Cable Jacket Types")

#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Type],
    text(fill: white, weight: "bold")[Material],
    text(fill: white, weight: "bold")[Use],
  ),
  [Standard],   [PVC (Polyvinyl Chloride)],   [Non-plenum],
  [Plenum-rated],   [FEP (Fluorinated Ethylene Polymer) or low-smoke PVC],   [Plenum areas],
)
]


- Plenum-rated cable produces less smoke and fewer hazardous fumes in a fire
- Plenum-rated cable is less flexible than standard cable
- Must use plenum-rated cable when installing in shared air spaces

]

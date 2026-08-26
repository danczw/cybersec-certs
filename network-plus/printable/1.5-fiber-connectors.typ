#import "template.typ": *

#start-note("1.5 — Fiber Connectors", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("SC (Subscriber Connector)")


- Also called: square connector, standard connector
- Push-in with snap lock — won't accidentally slip out
- Pull to unlock and remove
- Often combined in pairs (transmit + receive)

#section-heading("LC (Local Connector)")


- Also called: Lucent connector, little connector
- Slightly smaller than SC
- Clip on top locks it in place — push down clip to release
- Often combined in pairs (transmit + receive)

#section-heading("ST (Straight Tip)")


- Bayonet connector — push in and twist to lock
- Reverse twist to unlock and remove
- Protective ferrule around the fiber
- Prevents accidental dislodging in crowded racks

#section-heading("MPO (Multi-fiber Push On)")


- 12 individual fibers in a single connector
- More efficient use of space than individual fiber connectors
- Push-in lock similar to SC — pull slightly to unlock
- Also called MTP (name by Corning) / MTP MPO

#section-heading("Summary")


#block(breakable: false)[
#table(
  columns: 4,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Connector],
    text(fill: white, weight: "bold")[Full Name],
    text(fill: white, weight: "bold")[Lock Mechanism],
    text(fill: white, weight: "bold")[Key Feature],
  ),
  [SC],   [Subscriber Connector],   [Push-snap],   [Square shape, common in DCs],
  [LC],   [Local Connector],   [Top clip],   [Smaller than SC],
  [ST],   [Straight Tip],   [Bayonet (push-twist)],   [Ferrule, twist lock],
  [MPO],   [Multi-fiber Push On],   [Push-snap (like SC)],   [12 fibers in one connector],
)
]


]

#import "template.typ": *

#start-note("1.6 — Network Architectures", "1.0 Networking Concepts", "1.6")

#columns(2, gutter: 5mm)[



#section-heading("Three-Tier Architecture")


- Very common enterprise network design
- Three layers: core, distribution, access

#sub-heading("Core Layer")

- Central point for all resources
- Contains servers, applications, databases, critical services
- Core routers connect resources together
- Analogous to "downtown" of a city

#sub-heading("Distribution Layer")

- Midpoint between users and core resources
- Series of switches providing redundancy and connectivity
- Connects access layer to the core
- Analogous to highways connecting neighborhoods to downtown

#sub-heading("Access Layer")

- Where users physically connect to the network
- Switches located close to users (same floor of a building)
- Connects to one or more distribution switches
- Analogous to local access roads

#sub-heading("Redundancy")

- Multiple links between access and distribution layers
- Often multiple links between distribution and core
- If one component fails, alternate paths complete communication

#sub-heading("Multi-Building Campus")

- Each building has access switches per floor
- Each building's access switches connect to distribution switches
- All distribution switches connect to the core (often in a central data center)

#section-heading("Collapsed Core Architecture")


- Two-tier design — combines core and distribution into one layer
- Access layer remains the same
- More simplified design, easier troubleshooting
- Less expensive — fewer devices to purchase and install
- Less redundancy — not as resilient if a component fails

#section-heading("Data Center Traffic Flow")


#sub-heading("East-West Traffic")

- Traffic origination and destination both within the same data center
- Example: file server sending data to an image server on the same network
- Better response times — all on the same local network

#sub-heading("North-South Traffic")

- Traffic entering or leaving the data center from/to an external source
- Example: traffic to/from the internet
- Different security posture — unknown external origins/destinations

#section-heading("Summary")


#block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Architecture],
    text(fill: white, weight: "bold")[Layers],
    text(fill: white, weight: "bold")[Use Case],
  ),
  [Three-tier],   [Core, Distribution, Access],   [Large enterprise / campus],
  [Collapsed core],   [Core+Dist combined, Access],   [Smaller organizations],
)
]


#block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Traffic Flow],
    text(fill: white, weight: "bold")[Direction],
    text(fill: white, weight: "bold")[Security Concern],
  ),
  [East-West],   [Within data center],   [Lower — internal traffic],
  [North-South],   [Into/out of data center],   [Higher — external source],
)
]


]

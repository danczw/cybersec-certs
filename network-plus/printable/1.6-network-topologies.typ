#import "template.typ": *

#start-note("1.6 — Network Topologies", "1.0 Networking Concepts", "1.6")

#columns(2, gutter: 5mm)[



#section-heading("Star (Hub-and-Spoke)")


- Most popular topology in large networks
- Central device connects all other devices
- All communication passes through the central hub
- Example: switched Ethernet — switch in the middle, all devices connect to it

#section-heading("Mesh")


- Each device/location connects via multiple network paths
- If one link fails, traffic uses an alternate path
- Enables load balancing — split traffic across multiple connections
- Most commonly deployed in WANs to maintain connectivity regardless of link availability
- Can be used in LANs but less common

#section-heading("Point-to-Point")


- Single point connected to a single point
- Common in older WANs: point-to-point T1 or T3 connections
- Also used in LANs: connecting buildings on a campus

#section-heading("Hybrid")


- Combines multiple topology types in one enterprise network
- Example: star in one part, point-to-point in another, mesh in a third
- Reflects reality of large networks — different sections have different needs

#section-heading("Spine and Leaf")


- Used in data centers
- Spine switches at the top, leaf switches in the middle, devices at the bottom
- Every leaf connects to every spine
- Leaf switches do NOT connect directly to each other
- Spine switches do NOT connect directly to each other
- Top-of-rack switching: leaf switch at the top of each physical rack
  - All devices in rack connect to their rack's leaf switch
  - Cabling self-contained within each rack
  - Redundancy via multiple spine connections
  - Performance: never more than one switch hop from any other device
- Cost scales with number of racks — separate switch per rack

#section-heading("Summary")


#block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Topology],
    text(fill: white, weight: "bold")[Description],
    text(fill: white, weight: "bold")[Common Use],
  ),
  [Star],   [Central device, all nodes connect to it],   [LAN (Ethernet)],
  [Mesh],   [Multiple paths between nodes],   [WAN],
  [Point-to-Point],   [Direct link between two endpoints],   [WAN, campus links],
  [Hybrid],   [Mix of multiple topologies],   [Enterprise],
  [Spine & Leaf],   [Two-tier non-interconnected switch layers],   [Data center],
)
]


]

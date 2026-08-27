#import "template.typ": *

#start-note("2.1 — Routing Technologies", "2.0 Network Implementation", "2.1")

#columns(2, gutter: 5mm)[



#section-heading("Routing Tables")


- Every device has a routing table (workstations, servers, routers)
- Router evaluates incoming traffic destination and refers to routing table to determine best route
- Troubleshooting begins and ends with the routing table

#section-heading("Routing Table Entry Components")


```
R  10.10.30.0/24  [120/1]  via 10.10.50.2, 00:00:14, Serial0/3/1

|  Subnet ID       |  Metric   Next Hop      Route     Outgoing
|  w/ Prefix Len   |                         Timer     Interface
|                  Administrative
Route Code         Distance
```

- *Route code* — how the route was learned (C = directly connected, R = RIP, D = EIGRP, etc.)
- *Subnet ID with prefix length* — the network this route reaches (10.10.30.0/24)
- *Administrative distance* — trustworthiness of the route source (120)
- *Metric* — routing protocol's internal value for route preference (1)
- *Next hop* — IP address to forward traffic to (10.10.50.2)
- *Route timestamp* — how long the route has been active (00:00:14 = 14 seconds)
- *Outgoing interface* — physical interface used to reach next hop (Serial0/3/1, sometimes optional)

#section-heading("Route Selection: Prefix Length (Most Specific Route)")


When multiple routes match a destination, the most specific prefix wins.

#callout("Example")[
  Destination 192.168.1.6 with three matching routes:

  1. 192.168.0.0/16
  2. 192.168.1.0/24
  3. 192.168.1.6/32 ← most specific, chosen first

  /32 = single host; longer prefix = more specific = preferred.
]


#section-heading("Route Selection: Administrative Distance")


Used to break ties when identical routes come from different sources. Lower = better.

#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Source],
    text(fill: white, weight: "bold")[Administrative Distance],
  ),
  [Directly connected],   [0],
  [Static route],   [1],
  [EIGRP],   [90],
  [OSPF],   [110],
  [RIP],   [120],
)
]


#section-heading("Route Selection: Routing Metrics")


- Internal value used by a routing protocol to choose between duplicate routes within that protocol
- Cannot compare metrics across different routing protocols (BGP metrics ≠ EIGRP metrics)
- Lower metric = better route
- RIP metric = hop count
- EIGRP metric = composite calculation (different from RIP)

#section-heading("FHRP (First Hop Redundancy Protocol)")


Problem: devices can only configure one default gateway IP address, but redundancy requires multiple routers.

Solution: create a virtual IP address (VIP) shared between routers.

#sub-heading("How It Works")

+ Active router holds the VIP — all traffic flows through it
+ Standby/backup router is on the same subnet, always communicating with the active router
+ If standby detects active router failure → standby becomes active and takes over the VIP
+ End users continue using the same default gateway — failover is seamless

#section-heading("Subinterfaces")


- Multiple virtual interfaces assigned to a single physical interface
- Used when a trunk connection carries multiple VLANs to a router on one physical link
- Each subinterface gets its own IP address, subnet mask, and routing configuration

#sub-heading("Naming Convention")

Physical interface: ethernet1/1
Subinterfaces: ethernet1/1.10, ethernet1/1.20, ethernet1/1.100

#callout("Example")[
  - Three VLANs (red, green, blue) on separate switch ports
  - Single trunk cable between switch and router
  - Router has subinterfaces g0/0.1, g0/0.2, g0/0.3
  - Each subinterface assigned a different IP/subnet for its VLAN

]

]

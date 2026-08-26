#import "template.typ": *

#start-note("2.2 — Interface Configurations", "2.0 Network Implementation", "2.2")

#columns(2, gutter: 5mm)[



#section-heading("Speed and Duplex")


#sub-heading("Speed")

- How fast the connection runs: 10 Mbps, 100 Mbps, 1000 Mbps (1 Gbps), 10 Gbps, or faster
- Must be the same on both sides
- Often set to auto-negotiate
- Mismatched speed → connection will not work at all (no link light)

#sub-heading("Duplex")

#callout("Supplementary")[
  Half duplex = send OR receive, not both simultaneously. Full duplex = send AND receive at the same time.
]


- Half duplex or full duplex
- Must be the same on both sides
- Often set to automatic
- Mismatched duplex → connection operates but with very poor performance under load

#sub-heading("Troubleshooting")

First check speed and duplex match on both sides, then move to IP configuration.

#section-heading("IP Configuration")


Needed for ethernet connections, VLAN configs, management interfaces, etc.

- IP address
- Subnet mask
- Default gateway
- DNS settings

Values assigned by network administrator. Incorrect configuration (wrong gateway, wrong subnet mask) → cannot connect to other IP devices.

#section-heading("Link Aggregation (LAG / Port Bonding)")


- Connecting multiple interfaces together between two devices
- Switch interprets them as one large connection (not a loop)
- Example: four 1 Gbps links = 4 Gbps throughput between devices

#sub-heading("LACP (Link Aggregation Control Protocol)")

- Automatic configuration of link aggregation
- Configure interface as LACP, plug in cables, underlying config happens automatically
- LACP traffic visible between switches in packet captures

#section-heading("MTU (Maximum Transmission Unit)")


- Most efficient communication avoids fragmentation
- Fragmentation slows communication; losing one fragment requires resending entire frame
- MTU usually determined automatically on first connection
- Filtering and firewalls may prevent auto-discovery → may need manual MTU configuration

#section-heading("Jumbo Frames")


- Standard ethernet frame: 1,500 bytes
- Jumbo frame: up to 9,216 bytes MTU (many devices use 9,000 as accepted high end)
- One jumbo frame carries the same data as approximately six normal frames
- Fewer packets to switch/route → transfers more data in shorter time

#sub-heading("Requirement")

- ALL devices in the communication path must understand jumbo frames (switches, routers, endpoints)
- Any device that doesn't support jumbo frames will drop the frames → communication fails

]

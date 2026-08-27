#import "../notes-style.typ": *

#start-note("2.1 — Dynamic Routing", "2.0 Network Implementation", "2.1")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Routers automatically discover routes and update each other
- No manual configuration of individual routes needed
- New routers added → all routers automatically learn the new routes
- Routers removed → all routers automatically remove those routes

#section-heading("Overhead")


- Requires CPU and memory inside the router
- May need additional monitoring to ensure router can handle the load
- Requires initial configuration of the dynamic routing protocol

#section-heading("How Dynamic Routing Works")


+ Router listens for routing updates on local subnet (sent directly or via multicast)
+ Router builds its own routing table from received updates
+ Router sends its own multicast to inform nearby routers of routes it knows
+ Receiving routers interpret updates — determine if it's a better route or secondary route
+ If network changes occur (link added/removed, router added/removed), routers inform all others

#section-heading("Choosing a Routing Protocol")


Factors to consider:

- *Routing decisions* — based on link state (up/down) vs. hop count vs. link speed
- *Convergence time* — how quickly routers adapt to changes (seconds vs. minutes)
- *Router compatibility* — some protocols work across all manufacturers, some are vendor-specific

#section-heading("EIGRP (Enhanced Interior Gateway Routing Protocol)")


- Cisco-centric (proprietary aspects), but may be available on other manufacturers' routers
- Relatively easy to set up
- Converges relatively quickly when changes occur
- Identifies and prevents routing loops
- Efficiently discovers other EIGRP routers with minimum network traffic

#section-heading("OSPF (Open Shortest Path First)")


- Generic/open standard — available on many different manufacturers' devices
- Used within an Autonomous System (AS) — a network you have complete control of
- Link-state protocol — determines best route based on uptime and availability
- Assigns costs to individual links (based on throughput, link status, traversal time)
- Lowest cost and fastest path = best route
- Can load balance across links with identical costs

#section-heading("BGP (Border Gateway Protocol)")


- External gateway protocol — routes traffic outside your AS to other organizations
- Used on WANs and internet connections
- Designed to dynamically update routes across the entire internet
- Sometimes called the "three-napkins protocol" (originally sketched on napkins)
- Used when an organization has one or more internet connections and needs dynamic routing to internet sites

#section-heading("Key Terms")


- *Convergence* — the time it takes for all routers to update their tables after a network change
- *Autonomous System (AS)* — a network under single administrative control
- *Link-state protocol* — makes routing decisions based on link uptime and availability

]

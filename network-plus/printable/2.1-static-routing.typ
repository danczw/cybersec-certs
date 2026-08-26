#import "template.typ": *

#start-note("2.1 — Static Routing", "2.0 Network Implementation", "2.1")

#columns(2, gutter: 5mm)[



#section-heading("How Routers Forward Traffic")


+ Identify destination IP address in incoming packet
+ Examine routing table for best route
+ If destination subnet is directly connected → send to local subnet
+ If not directly connected → forward to next hop (IP of next router)
+ Next router repeats the process until packet reaches final destination
+ If no matching route found → packet is discarded

#section-heading("Routing Table")


- Contains known routes: destination networks and their next hops
- Directly connected subnets are automatically in the table
- Remote subnets must be added (statically or dynamically)

#section-heading("Static Routing")


Manually configuring routes in every router's routing table.

#sub-heading("Advantages")

- Quick to configure on small networks
- No overhead from dynamic routing protocols (no CPU cycles, no memory usage)
- Common for stub networks (remote sites with a single internet connection)
- Relatively secure — no dynamic routing updates that could be manipulated

#sub-heading("Disadvantages")

- Challenging on larger networks (hundreds/thousands of routers)
- Relies on administrator adding correct routes — misconfiguration can create routing loops
- Routes don't change automatically — network changes require manual updates to every affected router
- No automatic rerouting if a link goes down

#section-heading("Static Route Configuration Example")


#callout("Example")[
  Network: three routers, each with local subnets

  - Router 1 directly connected: 10.10.10.0/24, 10.10.40.0/24, 10.10.50.0/24
  - Router 2 directly connected: 10.10.20.0/24 (Jack's network)
  - Router 3 directly connected: 10.10.30.0/24

  Router 1 has no knowledge of 10.10.20.0/24 or 10.10.30.0/24 without static routes.

  *Adding Static Routes to Router 1*

  ```
  ip route 10.10.20.0/24 10.10.40.2
  ip route 10.10.30.0/24 10.10.50.2
  ```

  - 10.10.20.0/24 → next hop 10.10.40.2 (router 2)
  - 10.10.30.0/24 → next hop 10.10.50.2 (router 3)
]


#section-heading("Key Terms")


- *Next hop* — IP address of the next router that should receive the packet
- *Stub network* — remote site with a single connection; all traffic uses one path
- *Routing loop* — misconfiguration where packets cycle between routers without reaching destination

]

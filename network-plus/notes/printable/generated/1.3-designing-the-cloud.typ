#import "../notes-style.typ": *

#start-note("1.3 — Designing the Cloud", "1.0 Networking Concepts", "1.3")

#columns(2, gutter: 5mm)[



#section-heading("Cloud Computing Fundamentals")


- Deploy applications and services with one click, seemingly unlimited resources
- *Elasticity* — scale up during high demand, scale down when demand drops
- Access applications from anywhere in the world
- *Multitenancy* — many customers share the same cloud infrastructure
- Efficiency in technology use and cost

#section-heading("Network Function Virtualization (NFV)")


- When physical servers migrate to cloud, networking infrastructure virtualizes too
- Replaces physical routers/switches/firewalls with virtual
- Same functionality — managed from hypervisor

#callout("Supplementary")[
  Hypervisor: software that creates/runs VMs on physical hardware, allocating CPU, memory, storage, and networking to each VM.
]


- Deploy new firewall/switch/router config instantly
- Flexibility for designing network connectivity and connecting cloud infrastructures globally

#section-heading("Virtual Private Cloud (VPC)")


- Common application instance includes: web server, database server, load balancers, virtual switches/routers, virtual firewalls
- All run inside a VPC
- Larger environments use separate VPCs for different application instances or departments
- Keeps systems separated while managing them as individual virtual appliances

#section-heading("Transit Gateway")


- Cloud router connecting multiple VPCs together
- Allows communication between different VPCs
- Central device that routes traffic between separate virtual private clouds

#section-heading("VPC Connectivity")


#sub-heading("VPN Connection")

- Remote site or user workstation connects via VPN tunnel to transit gateway
- Provides access to private VPCs from outside

#sub-heading("Internet Gateway (VPC Gateway)")

- Makes application instances available to anyone on the internet
- Users anywhere in the world can access your applications

#sub-heading("NAT Gateway (VPC NAT Gateway)")

- NAT = Network Address Translation
- Allows VPC devices to reach the internet
- Translates private IP addresses to public IP addresses
- Security rules allow outbound to internet but can block inbound from external devices

#sub-heading("VPC Endpoint")

- Direct connection from a VPC on one cloud provider to a VPC on another cloud provider
- Used when organizations use multiple cloud providers but need connectivity between them
- Enables private subnet access without traversing the public internet

#callout("Supplementary")[
  ```
  ┌─── Cloud Provider A ────────────────────────────┐
  │                                                 │
  │  ┌─── VPC ────────────────────────────────────┐ │
  │  │                                            │ │
  │  │  ┌─ Public Subnet ─┐  ┌─ Private Subnet ─┐ │ │
  │  │  │ [Public App VM] │  │  [Private VM]    │ │ │
  │  │  └────────▲────────┘  └─────────▲────────┘ │ │
  │  └───────────┼─────────────────────┼──────────┘ │
  │   ┌──────────┴───────┐  ┌──────────┴─────────┐  │
  │   │ Internet Gateway │  │    VPC Endpoint    │  │
  │   └──────────▲───────┘  └──────────▲─────────┘  │
  └──────────────┼─────────────────────┼────────────┘
                 │                     │ (direct)
            ┌────┴─────┐               │
            │ Internet │               │
            └────┬─────┘               │
  ┌──────────────┼─────────────────────┼───────────┐
  │              ▼                     ▼           │
  │         [        Cloud Storage       ]         │
  └─── Cloud Provider B ───────────────────────────┘
  ```

  Public subnet: internet → internet gateway → public app.
  Private subnet: VPC endpoint provides direct private connection, bypassing internet.
]


#section-heading("Network Security Lists")


- Firewall rules applied at VPC level
- Control inbound and outbound traffic
- Based on port numbers and protocols (TCP/UDP)
- Can specify layer 3 addresses: individual IPs, CIDR blocks, IPv4/IPv6 ranges
- Once defined, applied to *all* virtual cloud networks
- Limitation: no granularity — same rules apply everywhere, even where not needed

#section-heading("Network Security Groups")


- Assign rules to individual VNICs
- More granular than security lists — different rules per interface within the same subnet
- Trade-off: more granular but more admin overhead
- If even more security needed, consider a virtual firewall or other virtualized platform

]

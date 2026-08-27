#import "../notes-style.typ": *

#start-note("1.2 — Networking Devices", "1.0 Networking Concepts", "1.2")

#columns(2, gutter: 5mm)[



#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Device],
    text(fill: white, weight: "bold")[OSI Layer],
    text(fill: white, weight: "bold")[Primary Function],
  ),
  [Router],   [3],   [Routes between subnets],
  [Switch],   [2],   [Forwards by MAC address],
  [Firewall/NGFW],   [3, 4 & 7\*],   [Filters/controls traffic],
  [IDS/IPS],   [3, 4 & 7\*],   [Detects/blocks attacks],
  [Load Balancer],   [4 & 7\*],   [Distributes server traffic],
  [Proxy],   [7\*],   [Intermediary for requests],
  [NAS],   [—],   [File-level network storage],
  [SAN],   [—],   [Block-level network storage],
  [Access Point],   [2],   [Bridges wireless and wired],
  [WLC],   [—],   [Centralized AP management],
)
]


\*= inferred, not stated in source

#section-heading("Router")


- Routes data between IP subnets — same data center or across the world
- OSI layer 3 (network layer) device — uses IP addresses to determine next hop
- Layer 3 switch = switch with routing functionality built in (layer 2 switch + layer 3 router in one device)
- Connects diverse network types: LAN/WAN, copper/fiber
- May have many different interfaces for different connection types

#section-heading("Switch")


- Forwards traffic based on MAC addresses — OSI layer 2 (data link) device
- Operates mostly in hardware via ASICs (Application-Specific Integrated Circuits)
- Enterprise features:
  - Power over Ethernet (PoE) — delivers power on same wires as ethernet
  - Layer 3 routing functionality (layer 3 switch)

#section-heading("Firewall")


- Traditional: filters traffic based on TCP/UDP port numbers
- Next-Generation Firewall (NGFW): identifies and controls applications traversing the network
- Additional capabilities:
  - VPN — encrypted site-to-site tunnels
    (firewall-to-firewall)
  - Layer 3 routing — sits at network ingress/egress
  - NAT (Network Address Translation)
  - Dynamic routing protocols
- Manages communication between inside (LAN) and outside (internet)

#section-heading("IDS / IPS")


- IDS (Intrusion Detection System) — detects and alerts on inbound attacks
- IPS (Intrusion Prevention System) — detects and blocks
- Looks for known attack types: OS exploits, application vulnerabilities, buffer overflows, XSS
- Much of this functionality now integrated into NGFWs
- IPS preferred in enterprise — IDS only alerts

#section-heading("Load Balancer")


- Distributes traffic across multiple physical servers
- Transparent to end users — appears as a single server
- Detects server failures, removes failed servers from rotation, maintains uptime
- Optimization features:
  - TCP offload — speeds internal server communication
  - SSL offload — handles encryption for servers
  - Caching — answers requests immediately without hitting backend servers
  - QoS (Quality of Service) — prioritizes certain traffic
  - Application-centric load balancing — routes specific pages to specific servers

#section-heading("Proxy")


- Sits between user and internet, makes requests on user's behalf
- Receives responses, verifies no malicious content, forwards to user
- Features:
  - Caching — returns cached responses, skips internet
  - Access control — authentication for internet access
  - URL filtering and content scanning
- Types:
  - Explicit proxy — requires OS/application configuration
  - Transparent proxy — works invisibly, no client configuration needed

#section-heading("Network-Attached Storage (NAS)")


- Centralized file storage on the network
- File-level access — must transfer entire file to read/modify, write entire file back
- Commonly on isolated high-bandwidth network

#section-heading("Storage Area Network (SAN)")


- Block-level access — read/write only the changed blocks (like a local drive)
- More efficient than NAS for large files with small modifications
- Commonly on isolated high-bandwidth network

#section-heading("Access Point (AP)")


- Bridges wireless (802.11) and wired (802.3) networks
- OSI layer 2 device — translates between wireless and wired at data link layer
- NOT a wireless router — purpose-built for wireless communication only
- Enterprise environments use dedicated APs (not combo router/AP/switch like home)

#section-heading("Wireless LAN Controller")


- Centralized management of all access points from one location ("single pane of glass")
- Capabilities:
  - Deploy new APs with full configuration
  - Performance and security monitoring/alerting
  - Push configuration changes to all APs simultaneously
  - Usage reporting and capacity planning
- Enables seamless roaming between APs
- Typically proprietary — must match AP manufacturer

#callout("Supplementary")[
  *Full data path (all devices inline):*

  ```
   Host A (wireless)
        │
        ▼
   Access Point (L2) ◄──── WLC (central mgmt)
        │
        ▼
   Switch (L2, MAC) ────── NAS / SAN
        │
        ▼
   Proxy (cache/filter/auth outbound)
        │
        ▼
   Router (L3, IP)
        │
        ▼
   Firewall/NGFW (IDS/IPS, NAT, VPN)
        │
   ═════╧══════════════════
        Internet / WAN
   ═════╤══════════════════
        │
        ▼
   Firewall/NGFW (IDS/IPS, NAT, VPN)
        │
        ▼
   Router (L3, IP)
        │
        ▼
   Load Balancer (SSL/TCP offload, QoS)
        │
        ▼
   Switch (L2, MAC) ────── NAS / SAN
        │
        ▼
   Host B (server)
  ```

  *Why this order:*
  1. *AP + WLC* — wireless client joins network
  2. *Switch* — L2 forwarding on local segment; NAS/SAN connect here
  3. *Proxy* — inspects/caches/filters outbound traffic
  4. *Router* — routes toward destination network
  5. *Firewall/NGFW (IDS/IPS)* — last checkpoint before WAN; NAT, VPN
  6. *WAN* — crosses internet
  7. *Firewall/NGFW (IDS/IPS)* — first checkpoint inbound
  8. *Router* — routes into internal network
  9. *Load Balancer* — distributes requests across servers
  10. *Switch* — delivers to server; NAS/SAN on same segment

  Proxy = client side (outbound). Load balancer = server side (inbound). NAS/SAN attach to switches, not inline.

]

]

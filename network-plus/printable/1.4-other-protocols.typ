#import "template.typ": *

#start-note("1.4 — Other Useful Protocols", "1.0 Networking Concepts", "1.4")

#columns(2, gutter: 5mm)[



#section-heading("ICMP (Internet Control Message Protocol)")


- Protocol for checking if devices are alive and operating on the network
- Carried by IP but does NOT use TCP or UDP — it's its own protocol
- Most common use: `ping` command sends ICMP message, waits for response
- Also provides network feedback:
  - Destination network unreachable
  - Time exceeded (TTL expired)

#section-heading("GRE (Generic Routing Encapsulation)")


- Creates tunnels between two endpoints (commonly used with VPNs)
- Encapsulates data within an IP packet, sends across tunnel, decapsulates on other side
- Does NOT provide encryption — need additional VPN protocols for that

#section-heading("VPN Concentrators")


- Purpose-built appliance providing encryption/decryption at a central point
- Often standalone unit or integrated into existing firewall
- Usually hardware with specialized encryption chips for efficiency/throughput
- Can also be software-based for limited users
- Site-to-site VPN: connects corporate network to remote site over public internet using VPN concentrators (firewalls/routers) at each end

#section-heading("IPSec (Internet Protocol Security)")


- One of the most popular protocols for encrypting VPN traffic
- Provides:
  - Encryption (confidentiality)
  - Digital signatures per packet (integrity)
  - Anti-replay functionality
- Standard protocol — works across different manufacturers' devices

#sub-heading("IPSec Protocols")

#block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Protocol],
    text(fill: white, weight: "bold")[Name],
    text(fill: white, weight: "bold")[Function],
  ),
  [AH],   [Authentication Header],   [Integrity/authentication only, no encryption (data sent in clear with hashing)],
  [ESP],   [Encapsulation Security Payload],   [Encrypts data AND provides authentication],
)
]


*AH — IP Packet with Authentication (tunnel mode):*

```
┌───────────────┬────────────┬─────────────────────┬──────────────────────────┐
│ New IP Header │ AH Header  │ IP Header           │ Data                     │
└───────────────┴────────────┴─────────────────────┴──────────────────────────┘
├──────────────────────────── Authenticated ──────────────────────────────────┤
```

*ESP — IPSec Datagram with ESP (tunnel mode):*

```
┌───────────────┬────────────┬─────────────┬──────────┬─────────────┬─────────┐
│ New IP Header │ ESP Header │ IP Header   │ Data     │ ESP Trailer │ ICV     │
└───────────────┴────────────┴─────────────┴──────────┴─────────────┴─────────┘
                             ├──── Encrypted ────────┤
                ├──────────────── Authenticated ─────────────────────┤
```

- ICV = Integrity Check Value (hash using MD5, SHA-1, or SHA-2)

#sub-heading("IKE (Internet Key Exchange)")

- Series of steps performed before sending data to establish the tunnel
- Both sides agree on encryption/decryption keys and parameters
- Agreement = Security Association (SA)

*Phase 1*


- Uses Diffie-Hellman to create shared secret key
- Operates over UDP port 500
- Called ISAKMP (Internet Security Association and Key Management Protocol)

*Phase 2*


- Negotiates ciphers, key sizes
- Negotiates inbound and outbound Security Associations
- Encrypted data sent over ESP tunnel

#sub-heading("Transport Mode vs Tunnel Mode")

*Transport Mode:*
- Inserts IPSec header between original IP header and data
- Encrypts only the data portion
- Original IP header remains in the clear (destination visible to attackers)

```
┌───────────┬────────────────┬───────────────────────┬───────────────┐
│ IP Header │ IPSec Header   │ Data (encrypted)      │ IPSec Trailer │
│ (clear)   │ (clear)        │                       │               │
└───────────┴────────────────┴───────────────────────┴───────────────┘
```

*Tunnel Mode:*
- Original IP header AND data are all encrypted
- Adds new IP header with VPN concentrator as destination
- Attacker cannot see original destination

```
┌────────────┬────────────────┬──────────────────────────────────┬───────────────┐
│ New IP Hdr │ IPSec Header   │ Orig IP Hdr + Data (encrypted)   │ IPSec Trailer │
│ (clear)    │ (clear)        │                                  │               │
└────────────┴────────────────┴──────────────────────────────────┴───────────────┘
```

- Most implementations use tunnel mode for highest security

#callout("Supplementary")[
  *IPSec Protocol × Mode Matrix* — any combination is valid:

  #block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[],
    text(fill: white, weight: "bold")[*Transport Mode*],
    text(fill: white, weight: "bold")[*Tunnel Mode*],
  ),
  [*AH*],   [Authenticates payload + most of original IP header],   [Authenticates entire original packet (new IP header wraps it)],
  [*ESP*],   [Encrypts/authenticates payload only; original IP header exposed],   [Encrypts/authenticates entire original packet; new IP header wraps it],
)
]


  - *Mode* = what gets protected (transport = payload only, tunnel = entire original packet)
  - *Protocol* = how it's protected (AH = integrity only, ESP = encryption + integrity)
  - Most common in practice: *ESP + Tunnel mode* (site-to-site VPNs)
  - AH rarely used alone since ESP provides everything AH does plus encryption
  - Transport mode appears in host-to-host scenarios (e.g., L2TP/IPSec where L2TP provides the tunnel)
]


#section-heading("WebSocket")


#callout("Supplementary")[
  A persistent, full-duplex TCP connection between client and server. Unlike HTTP (request → response → close), a WebSocket stays open so either side can send data at any time without re-establishing the connection. Uses port 80 (ws://) or 443 (wss://). Common uses: real-time chat, live dashboards, multiplayer games.

]

]

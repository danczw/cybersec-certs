#import "template.typ": *

#start-note("1.1 — OSI Model", "1.0 Networking Concepts", "1.1")

#columns(2, gutter: 5mm)[



#section-heading("What It Is")


- Open Systems Interconnection Reference Model
- Broad overview of how data traverses networks — not a detailed specification
- NOT the OSI protocol suite — most protocols today are TCP/IP-based, but OSI model applies to them
- Many protocols can operate at each individual layer (tens or hundreds per layer)
- Common language across IT organizations

#callout("Supplementary")[
  *Data unit names by layer:*

  #block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Layer],
    text(fill: white, weight: "bold")[Unit],
  ),
  [1 Physical],   [Bits],
  [2 Data Link],   [Frames (packet + MAC header + trailer)],
  [3 Network],   [Packets],
  [4 Transport],   [Segments (TCP) / Datagrams (UDP)],
  [5–7],   [Data],
)
]


  Fragmentation at L3 = splitting packets too large for the next network's MTU (Maximum Transmission Unit).
]


#section-heading("The Seven Layers")


#block(breakable: false)[
#table(
  columns: 4,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Layer],
    text(fill: white, weight: "bold")[Name],
    text(fill: white, weight: "bold")[Mnemonic (top-down)],
    text(fill: white, weight: "bold")[Mnemonic (bottom-up)],
  ),
  [7],   [Application],   [#strong[A]ll],   [#strong[A]bbreviations],
  [6],   [Presentation],   [#strong[P]eople],   [#strong[P]ointless],
  [5],   [Session],   [#strong[S]eem],   [#strong[S]tudents],
  [4],   [Transport],   [#strong[T]o],   [#strong[T]each],
  [3],   [Network],   [#strong[N]eed],   [#strong[N]ot],
  [2],   [Data Link],   [#strong[D]ata],   [#strong[D]o],
  [1],   [Physical],   [#strong[P]rocessing],   [#strong[P]lease],
)
]


#section-heading("Layer Details")


#sub-heading("Layer 1 — Physical")

- Physical signals: cables, fiber, wireless
- No real protocols — just getting a signal from A to B
- Problems: bad cable, bad fiber, wireless interference
- Troubleshooting: loopback tests, cable/fiber testing, checking adapter cards

#sub-heading("Layer 2 — Data Link")

- Fundamental communication between two devices
- MAC address layer (Media Access Control) — hardware address of adapter card
- Also called DLC (Data Link Control) layer
- Ethernet adapters, wireless adapters
- Switches forward traffic based on destination MAC address → "switching layer"
- Address types: MAC, EUI-48, EUI-64

#callout("Supplementary")[
  *EUI = Extended Unique Identifier* — a hardware address burned into your network card.

  *EUI-48 (48 bits = 6 bytes)*
  - This IS the standard MAC address
  - Every Wi-Fi card, Ethernet port, etc. has one
  - Format: `00:1A:2B:3C:4D:5E` (six hex pairs)
  - 48 bits = enough unique addresses for every device

  *EUI-64 (64 bits = 8 bytes)*
  - Longer version used by IPv6
  - Device auto-generates it by taking its EUI-48 and inserting `FF:FE` in the middle
  - No manual configuration needed

  *Why two?* EUI-48 was designed for Ethernet/Wi-Fi. IPv6 needed a longer identifier, so EUI-64 was created. Both uniquely identify a network interface at Layer 2.

  For the exam: MAC address = EUI-48 = EUI-64 = all Layer 2 hardware addresses.
]


#sub-heading("Layer 3 — Network")

- Routing layer — routers determine forwarding based on destination IP (Internet Protocol) address
- IP addresses, subnet masks, routing
- Fragmentation: splitting frames/packets into smaller pieces for networks requiring smaller frame sizes, reassembling on the other side

#sub-heading("Layer 4 — Transport")

- "Post office layer" — getting data from A to B
- Protocols: TCP (Transmission Control Protocol), UDP (User Datagram Protocol)
- Segmentation: breaking large data into smaller pieces, reassembling at destination
- Identified by TCP/UDP port numbers

#callout("Supplementary")[
  *TCP vs UDP*

  #block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[],
    text(fill: white, weight: "bold")[TCP],
    text(fill: white, weight: "bold")[UDP],
  ),
  [Connection],   [Yes (handshake first)],   [No],
  [Reliability],   [Guaranteed delivery, ordered],   [Best-effort, no guarantees],
  [Speed],   [Slower],   [Faster],
  [Use cases],   [Web, email, file transfer],   [Video streaming, DNS, gaming],
)
]


  TCP = registered letter with tracking.
  UDP = shouting across a room.
]


#sub-heading("Layer 5 — Session")

- Communication management between endpoints
- Session initiation, stopping, restarting

#callout("Supplementary")[
  *Endpoint:* any device that sends or receives network traffic (e.g., laptop, server, phone).
]


- Control protocols, tunneling

#callout("Supplementary")[
  *Control protocols* manage ongoing communication state (e.g., RPC, NetBIOS).
  *Tunneling* encapsulates one protocol inside another to create a virtual point-to-point link (e.g., PPTP wraps traffic for VPN transport).
]


#sub-heading("Layer 6 — Presentation")

- Puts data into human-readable format
- Character encoding
- Application encryption/decryption (SSL/TLS)
- Often discussed together with layer 7

#callout("Supplementary")[
  *SSL* = Secure Sockets Layer.
  *TLS* = Transport Layer Security (modern successor).
  TLS is the current standard; "SSL" is still used colloquially. In the OSI model, SSL/TLS spans L5–L7 (session management, encryption, and application data encapsulation).
]


#sub-heading("Layer 7 — Application")

- What you see on screen — direct user interaction
- Examples: HTTP, HTTPS, FTP, DNS, POP3
- Thousands of application protocols

#section-heading("Real-World Mapping Summary")


#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Layer],
    text(fill: white, weight: "bold")[What You'll See],
  ),
  [7],   [Application interaction (Gmail, web browser, etc.)],
  [6],   [SSL/TLS encryption/decryption],
  [5],   [Control protocols, tunneling, session start/stop],
  [4],   [TCP/UDP port numbers],
  [3],   [IP addresses, subnet masks, routing],
  [2],   [Ethernet frames, MAC addresses, EUI, switching],
  [1],   [Cables, fiber optic, wireless signals],
)
]


#section-heading("Wireshark Protocol Decode Example")


#callout("Example")[
  Captured frame 88 (2,005 bytes) broken down:

  1. *Frame info* (L1) — physical bytes on wire
  2. *Ethernet II* (L2) — source/destination MAC addresses
  3. *Internet Protocol* (L3) — source/destination IP addresses (e.g., 72.14.247.19 → googlemail.l.google.com)
  4. *TCP* (L4) — source/destination port numbers (destination port 443)
  5. *SSL* (L5/6/7) — session management, encryption/decryption, application data (Google Mail)

  Key insight: Wireshark's decode maps to OSI layers bottom-up (physical → application).

]

]

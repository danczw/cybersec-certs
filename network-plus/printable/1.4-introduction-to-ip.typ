#import "template.typ": *

#start-note("1.4 — Introduction to IP", "1.0 Networking Concepts", "1.4")

#columns(2, gutter: 5mm)[



#section-heading("Data Encapsulation")


- Data is encapsulated within protocols, which are encapsulated within larger protocols
- Ethernet frame structure:
  - Ethernet Header → IP Header → TCP/UDP Header → Application Data → Ethernet Trailer
- Analogy: network = road, IP = truck, TCP/UDP = boxes, application data = items in boxes

  > [!NOTE] Supplementary
  > ```
  > Client                                                     Server
  >
  > ┌──────────┬────────────────────────────────────┬──────────┐
  > │ Ethernet │         Ethernet Payload           │ Ethernet │
  > │ Header   │                                    │ Trailer  │
  > ├──────────┼─────┬──────────────────────────────┼──────────┤
  > │ Ethernet │ IP  │         IP Payload           │ Ethernet │
  > │ Header   │     │                              │ Trailer  │
  > ├──────────┼─────┼─────┬────────────────────────┼──────────┤
  > │ Ethernet │ IP  │ TCP │      TCP Payload       │ Ethernet │
  > │ Header   │     │     │                        │ Trailer  │
  > ├──────────┼─────┼─────┼────────────────────────┼──────────┤
  > │ Ethernet │ IP  │ TCP │      HTTP data         │ Ethernet │
  > │ Header   │     │     │                        │ Trailer  │
  > └──────────┴─────┴─────┴────────────────────────┴──────────┘
  > ```
  > Each layer peels back to reveal the next level of encapsulation.

#section-heading("TCP (Transmission Control Protocol)")


- *Connection-oriented* — formal setup and teardown of sessions
- *Reliable delivery* — receiving device acknowledges receipt of data
- Sender knows if data was properly delivered; can resend if no acknowledgment received
- Packets are numbered — receiver can request specific missing packets without full retransmission
- *Flow control* — receiver tells sender to speed up or slow down
- *Error recovery* — can retransmit lost portions

  > [!NOTE] Supplementary
  > TCP establishes a "connection" (L4), not a "session" in the strict OSI sense. Sessions (L5) handle higher-level dialog management and checkpointing. The three-way handshake synchronizes sequence numbers at the transport layer.

#section-heading("UDP (User Datagram Protocol)")


- *Connectionless* — no formal setup or teardown
- No acknowledgments sent back to sender
- *Unreliable* — not higher chance of failure, just no confirmation of delivery
- No error recovery or retransmission capability
- No flow control — receiver cannot tell sender to adjust speed
- Same probability of successful delivery as TCP; difference is lack of feedback

#section-heading("TCP vs UDP Summary")


#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Feature],
    text(fill: white, weight: "bold")[TCP],
    text(fill: white, weight: "bold")[UDP],
  ),
  [Connection],   [Oriented],   [Connectionless],
  [Acknowledgments],   [Yes],   [No],
  [Reliability],   [Reliable],   [Unreliable],
  [Error recovery],   [Yes],   [No],
  [Flow control],   [Yes],   [No],
  [OSI layer],   [4 (Transport)],   [4 (Transport)],
)


#section-heading("IP Addressing and Ports")


- Destination IP address = which house (device) to deliver to
- TCP/UDP port number = which room (application) within the house
- *Socket* = IP address + protocol (TCP/UDP) + port number

  > [!NOTE] Supplementary
  > A connection is uniquely identified by a *5-tuple*: source IP, source port, destination IP, destination port, and protocol. This is how a server handles thousands of clients on the same port — each connection differs by at least one element.

#section-heading("Port Numbers")


- *Non-ephemeral ports* (0–1,023) — permanent, well-known server ports (e.g., 80, 443)
- *Ephemeral ports* (1,024–65,535) — temporary client ports, randomized per session
- Total range: 0–65,535
- TCP and UDP port numbers are independent — TCP 80 ≠ UDP 80
- Not a hard rule: servers can use ephemeral range, clients can use non-ephemeral

#section-heading("Multiplexing")


- Multiple applications sent simultaneously between same devices using different port numbers
- OSI Layer 4 enables this via unique port numbers per application

#section-heading("Port Numbers and Security")


- Changing port numbers is NOT a security mechanism
- Still need a firewall to allow/disallow traffic
- Changing well-known ports breaks client expectations (clients must be reconfigured)

#section-heading("Practical Example")


- Server 10.0.0.2 runs: web (TCP 80), VoIP (UDP 5004), email (TCP 143)
- Client 10.0.0.1 uses random ephemeral source ports for each session
- Response traffic reverses source/destination ports and IPs
- All three applications communicate simultaneously via different port numbers

]

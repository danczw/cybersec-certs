#import "template.typ": *

#start-note("3.4 — DHCP", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("Background")


- Previously all IPv4 settings (IP address, subnet mask, DNS, etc.) were configured manually on every device
- *BOOTP* (Bootstrap Protocol) was created to automate this, but had limitations:
  - Didn't configure everything automatically
  - Could not recognize when an IP address became available after a device left the network
- *DHCP* (Dynamic Host Configuration Protocol) replaced BOOTP with full automatic address configuration

#section-heading("DORA Process")


Four steps to obtain an IP address automatically:

#sub-heading("Discover")

- Client sends DHCP Discover packet
- Source IP: 0.0.0.0 (client has no IP yet)
- Destination IP: 255.255.255.255 (broadcast)
- Source port: UDP 68
- Destination port: UDP 67
- Broadcast so all devices on subnet see it — DHCP servers can respond

#sub-heading("Offer")

- DHCP server responds with a DHCP Offer
- Source IP: DHCP server's IP (e.g., 10.10.10.99)
- Destination IP: 255.255.255.255 (broadcast, since client has no IP)
- Source port: UDP 67
- Destination port: UDP 68
- If multiple DHCP servers exist, client may receive multiple offers

#sub-heading("Request")

- Client chooses one offer and sends a DHCP Request
- Source IP: 0.0.0.0 (still no IP)
- Destination IP: 255.255.255.255 (broadcast)
- Source port: UDP 68
- Destination port: UDP 67

#sub-heading("Acknowledge")

- DHCP server sends DHCP Acknowledgment
- Source IP: DHCP server's IP
- Destination IP: 255.255.255.255 (broadcast)
- Source port: UDP 67
- Destination port: UDP 68
- Client can now configure all IP settings automatically

#section-heading("DHCP Ports")


#block(breakable: false)[
#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Direction],
    text(fill: white, weight: "bold")[Port],
  ),
  [Client (source)],   [UDP 68],
  [Server (source)],   [UDP 67],
)
]


#section-heading("DHCP Limitation: Broadcasts Don't Cross Routers")


- All DHCP messages are broadcasts (255.255.255.255)
- Broadcasts only reach the local subnet — they do not traverse routers
- Problem for enterprise networks wanting redundant/centralized DHCP servers

#section-heading("DHCP Relay (DHCP Helper)")


- Router feature that forwards DHCP traffic to a server on a different subnet
- Configured on the router with the DHCP server's IP address
- Process:
  1. Client broadcasts DHCP Discover on local subnet
  2. Router with DHCP relay receives the broadcast
  3. Router changes source IP to its own interface IP and destination to the DHCP server IP (broadcast → unicast)
  4. DHCP server responds with unicast back to the router
  5. Router converts the response back to a broadcast on the client's local subnet
  6. Repeats for all four DORA phases
- Allows clients to receive IP addresses from a DHCP server on a completely different subnet

]

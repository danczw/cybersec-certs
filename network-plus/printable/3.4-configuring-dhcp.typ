#import "template.typ": *

#start-note("3.4 — Configuring DHCP", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("DHCP Scope")


- A scope defines the pool of addresses and settings a DHCP server hands out
- Scope contents:
  - IP address range (contiguous pool, e.g., .1 through .100)
  - Excluded addresses (addresses within the range that should not be assigned)
  - Subnet mask
  - Lease duration
  - Optional settings (DNS servers, default gateway, VoIP server, etc.)
- One scope per subnet — each scope is responsible for its subnet's addresses

#section-heading("Address Assignment")


- When a device requests an address, the server picks one from the pool and assigns it
- A lease period is associated with the address — the device can only use it for a limited time
- If the lease is not renewed, the address returns to the pool and can be assigned to another device
- The server tracks MAC-to-IP pairings
- If a device returns to the network and its previous IP is still available, the server reassigns the same IP

#section-heading("Address Reservation")


- Assigns a fixed IP to a specific MAC address via the DHCP server
- Use case: printers, servers, or any device that needs a consistent IP
- Advantage over static configuration: manage all addresses centrally; changes don't require visiting each device
- Also called: static DHCP assignment, static DHCP, or IP reservation
- Reservation table contains: MAC address, reserved IP address, device name

#section-heading("DHCP Lease")


- IP addresses are temporary — leased for a configured duration
- When a device shuts down, it can release the IP back to the pool
- Restarting or reconnecting reinitializes the DHCP process and may restart the lease

#sub-heading("Lease Renewal Timers")

#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Timer],
    text(fill: white, weight: "bold")[Default],
    text(fill: white, weight: "bold")[Behavior],
  ),
  [T1],   [50% of lease time],   [Device attempts to renew with the original DHCP server],
  [T2],   [87.5% (7/8) of lease time],   [Device attempts to renew with any available DHCP server],
)
]


#callout("Example")[
  *Lease Timeline (8-day lease)*

  1. Day 0–4: Normal operation, no renewal needed
  2. Day 4 (T1): Renewal period begins — device contacts original DHCP server
     - If successful: lease resets, timer restarts
  3. Day 7 (T2): Rebinding period — if original server unavailable, device contacts any DHCP server
     - If successful: lease resets with new server
]


#section-heading("DHCP Options")


- Additional TCP/IP settings delivered alongside IP/subnet/gateway
- Defined in the DHCP RFC (originally called vendor extensions in BOOTP)
- 254 usable option numbers available
- Not all DHCP servers support all options — verify server capabilities
- Common options:
  - IP address, subnet mask, default gateway, DNS servers (standard)
  - Option 129: Call server IP address (VoIP)
  - Option 135: HTTP proxy
- Configured under Server Options in the DHCP scope; delivered to all clients connecting to that scope

]

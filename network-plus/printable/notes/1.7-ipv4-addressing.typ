#import "../template.typ": *

#start-note("1.7 — IPv4 Addressing", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("IP Address Fundamentals")


- Unique identifier every device needs to communicate via IP
- Four decimal numbers separated by periods (e.g., 192.168.1.165)
- Each number = 1 octet = 8 bits
- Total: 32 bits (4 bytes / 4 octets)
- Maximum value per octet: 255
- Operates at OSI layer 3 (network layer)

#section-heading("Subnet Mask")


- Also a 4-octet value (e.g., 255.255.255.0)
- Used with IP address to determine what subnet a device is on
- Not transmitted across the network — used locally to decide what's local vs. remote
- Determines which addresses are on the local subnet vs. outside it

#section-heading("Default Gateway")


- IP address of the router on your local subnet
- Used to communicate outside your local subnet
- Must be an address on your local network
- Configured by the network administrator

#section-heading("Special Addresses")


#sub-heading("Loopback")

- Refers to the local device without needing to know its IP
- Range: 127.0.0.1 through 127.255.255.254
- Used to confirm local IP stack is working properly

#sub-heading("Reserved (Class E)")

- Range: 240.0.0.1 through 254.255.255.254
- Set aside for future use or testing
- Should never be assigned to devices

#sub-heading("Virtual IP Address (VIP)")

- Not associated with a physical Ethernet adapter
- Assigned to internals of a device (VMs, router interfaces)
- Allows consistent reference to a device regardless of physical adapter

#section-heading("IP Address Configuration")


#sub-heading("Manual (Static)")

- Historically required visiting each device to configure IP, subnet mask, default gateway
- Any network changes required revisiting the device

#sub-heading("DHCP (Dynamic Host Configuration Protocol)")

- Automatically assigns IP address, subnet mask, default gateway
- Works on wired and wireless networks
- Enables plug-and-play network connectivity

#sub-heading("APIPA (Automatic Private IP Addressing)")

- Assigned when no DHCP server is available
- Link-local address — can only communicate on local subnet (no internet)
- Range: 169.254.0.1 through 169.254.255.254
- Functional range (assigned to devices): 169.254.1.0 through 169.254.254.255
- First and last 256 addresses are reserved
- Uses ARP to confirm no other device has the chosen address

#section-heading("Public vs. Private IP Addresses")


- IPv4 has exhausted all available public address blocks
- Private addresses cannot be routed on the public internet
- NAT converts private → public for internet communication

#sub-heading("RFC 1918 Private Ranges")

#block(breakable: false)[
#table(
  columns: 6,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Range],
    text(fill: white, weight: "bold")[Addresses],
    text(fill: white, weight: "bold")[Class],
    text(fill: white, weight: "bold")[CIDR],
    text(fill: white, weight: "bold")[Subnet Mask],
    text(fill: white, weight: "bold")[Host Bits],
  ),
  [10.0.0.0 – 10.255.255.255],   [16M+],   [1 × A],   [10.0.0.0/8],   [255.0.0.0],   [24],
  [172.16.0.0 – 172.31.255.255],   [1M+],   [16 × B],   [172.16.0.0/12],   [255.240.0.0],   [20],
  [192.168.0.0 – 192.168.255.255],   [65K+],   [256 × C],   [192.168.0.0/16],   [255.255.0.0],   [16],
)
]


]

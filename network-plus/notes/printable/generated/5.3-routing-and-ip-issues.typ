#import "../notes-style.typ": *

#start-note("5.3 — Routing and IP Issues", "5.0 Network Troubleshooting", "5.3")

#columns(2, gutter: 5mm)[



#section-heading("Routing Tables")


- Used to determine the best next hop when forwarding traffic through a router
- Builds a map of where data will be forwarded
- Contains: default gateway configurations, static routes, dynamically learned routes
- If no route exists for a destination, the router drops the traffic
- Router may send back an ICMP host unreachable message to the sender
- When troubleshooting, check the routing table of every router along the path
- Must confirm routes in both directions — to the destination and back to the source
- Helpful to compare routing tables against a network map

#section-heading("Gateway of Last Resort")


- A default route that summarizes all possible destinations into one entry
- Used when no other route in the routing table matches the destination
- Usually added as a static route by the administrator
- Destination is 0.0.0.0/0 — encompasses every host on every network
- If nothing else matches in the routing table, the gateway of last resort is used

#callout("Example")[
  *Routing Table*

  - Directly connected routes (e.g., 10.10.10.0/24, 10.10.40.0/24, 10.10.50.0/24)
  - Static routes (e.g., 10.10.20.0/24)
  - Dynamically learned routes via RIP (e.g., 10.10.30.0/24)
  - Gateway of last resort configured as a static route to 0.0.0.0/0 via a next-hop address
]


#section-heading("Address Pool Exhaustion")


- If DHCP address pool is exhausted, devices receive an APIPA address instead
- APIPA allows communication on the local subnet only — nonroutable
- Cannot communicate outside the local subnet with APIPA

#callout("Supplementary")[
  APIPA = Automatic Private IP Addressing (range 169.254.0.0/16)
]


#sub-heading("Resolution")

- Check DHCP server for available IP addresses
- Add additional addresses to the pool if needed
- Use IPAM (IP Address Management) to monitor pools and availability across DHCP servers
- Decrease lease time if users connect for short periods — frees up addresses faster and minimizes exhaustion

#section-heading("Incorrect IP Configuration")


- Devices may receive wrong IP address, subnet mask, or default gateway
- Confirm received values are correct for the connected interface
- Perform a packet capture to see what other devices on the subnet are configured as
- Check configuration of other devices already on the same network
- Troubleshooting order: ping local address → ping default gateway → ping an address beyond the gateway
- Use ping and traceroute to map position in the network and verify correct assignment

#section-heading("Duplicate IP Addresses")


#sub-heading("Common Causes")

- Manually configured device using an address that exists in a DHCP pool
- Multiple DHCP servers with overlapping pools handing out the same addresses
- Rogue device added to network with DHCP enabled, handing out unexpected addresses

#sub-heading("Detection")

- Older operating systems: two devices fight over priority based on switch MAC address table
- Modern operating systems: duplicate IP discovered when device first connects; prevented with an error message displayed on screen

#sub-heading("Troubleshooting")

- For manually configured devices: check assigned IP address, subnet mask, and default gateway
- Ping the IP address before statically configuring it — a response means it is already in use
- If unexpected device responds to ping: check ARP table to get its MAC address
- Use the switch MAC address table to find which interface the device is plugged into
- For overlapping DHCP pools: perform a packet capture to see what DHCP servers are offering

]

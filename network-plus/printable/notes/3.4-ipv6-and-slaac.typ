#import "../notes-style.typ": *

#start-note("3.4 — IPv6 and SLAAC", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("DHCPv6")


- DHCP for IPv6 uses a similar process to IPv4 DHCP
- Uses redundant DHCP servers for enterprise readiness
- Managed by the DHCP administrator just like IPv4

#section-heading("Stateless Addressing")


- Unlike IPv4, IPv6 devices can assign an IP address to themselves and communicate on the network
- No DHCP server manages the process
- No need to track IP addresses or MAC addresses
- No lease time — the address never needs to be given up

#section-heading("Neighbor Discovery Protocol (NDP)")


- Replaces ARP from IPv4
- ARP uses broadcasts; NDP uses multicast (more efficient)
- Functions:
  - Find other devices on the network
  - Identify routers (router solicitation / router advertisement)
  - Duplicate Address Detection (DAD)

#sub-heading("Router Solicitation (RS)")

- Device sends a multicast asking any routers on the local subnet to respond
- Router replies with a Router Advertisement (RA) directly back to the device

#sub-heading("Router Advertisement (RA)")

- Sent in response to a router solicitation, or unsolicited to all devices on the network
- Unsolicited RAs are sent to a different multicast address than solicited ones
- RA provides local subnet information:
  - Prefix value
  - Prefix length
  - DNS server configuration
  - Other IPv6 configuration parameters

#section-heading("SLAAC (Stateless Address Autoconfiguration)")


- Allows an IPv6 device to create its own routable IP address without a DHCP server

#sub-heading("Process")

+ Device sends Router Solicitation via NDP to determine the local subnet
+ Router responds with Router Advertisement containing the 64-bit subnet prefix
+ Device generates the last 64 bits (interface ID) using one of two methods:
   - Modified MAC address: inserts ff:fe in the middle of the MAC to create 64 bits
   - Random value: generates a random 64-bit interface ID
+ Device runs Duplicate Address Detection (DAD) via NDP to confirm no other device uses that address
+ Device now has a fully routable, unique IPv6 address

#section-heading("Duplicate Address Detection (DAD)")


- Part of NDP
- Checks the network to ensure no other device is using the same IPv6 address
- Addresses the concern that self-assigned addresses could conflict with existing ones

]

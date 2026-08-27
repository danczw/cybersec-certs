#import "../template.typ": *

#start-note("1.4 — Network Communication", "1.0 Networking Concepts", "1.4")

#columns(2, gutter: 5mm)[



#section-heading("Unicast")


- One-to-one communication — one station sends directly to another
- No other device on the network is involved in the conversation
- Used for: web browsing, file transfers, email
- Works with both IPv4 and IPv6
- Disadvantage: to send same data to many devices, must create separate one-to-one sessions for each

#section-heading("Multicast")


- One-to-many-of-many — sends to multiple subscribed recipients simultaneously
- Recipients subscribe to the multicast feed
- Used for: multimedia streaming, stock exchange data, routing updates
- Requires network equipment that understands multicast
- Not typically used across different networks or very large networks
- Works with both IPv4 and IPv6

#section-heading("Anycast")


- One-to-one-of-many — single destination IP address routed to the closest of many devices
- Receiving devices are all configured similarly
- Traffic goes to whichever device is closest (by routing metric)
- Example: anycast DNS — query goes to nearest data center
- Works with both IPv4 and IPv6

#section-heading("Broadcast")


- One-to-all — single packet sent to every device on the local network
- Scope limited to the local broadcast domain (cannot cross routers)
- Used for: routing updates, ARP requests
- IPv4 only — IPv6 replaced broadcast with multicast

]

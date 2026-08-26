#import "template.typ": *

#start-note("5.5 — Command Line Tools", "5.0 Network Troubleshooting", "5.5")

#columns(2, gutter: 5mm)[



#section-heading("ping")


- Tells you if a device on the network is reachable
- Uses ICMP (Internet Control Message Protocol) to query a device and get a response
- Works the same in macOS, Linux, and Windows
- Output shows: bytes sent/received, sequence numbers, TTL, round-trip time
- If device is unreachable, shows timeout messages
- Use Ctrl+C to stop a continuous ping — provides statistics about the session
- One of the first things to do when troubleshooting — "can you ping that host?"

#section-heading("traceroute / tracert")


- Traces the route between your device and the destination
- Maps the entire path, showing every router between source and destination
- Command name: `traceroute` (Linux/macOS), `tracert` (Windows)
- Uses ICMP time to live exceeded error messages

#sub-heading("How Traceroute Works")

+ Sends packet with TTL=1 — first router decreases TTL to 0, sends back TTL exceeded with its IP address
+ Sends packet with TTL=2 — passes first router, second router reports TTL exceeded
+ Continues incrementing TTL until destination is reached
+ Each hop is tested three times by default — output shows three response times per hop

#sub-heading("Traceroute Limitations")

- Many firewalls filter ICMP messages
- Filtered hops show asterisks instead of statistics
- Windows uses ICMP echo requests; other OSes may allow changing the payload type
- Useful to compare two traceroutes to find where a route is failing

#section-heading("nslookup and dig")


- Both query DNS servers and receive responses
- Can look up: canonical names, IP addresses, cache timers, text records, and other DNS records

#sub-heading("nslookup")

- Included with Windows, Linux, and macOS
- Deprecated — goal is to use dig instead
- Shows DNS server used and IP address results for a query

#sub-heading("dig")

- Included with Linux and macOS
- Windows: available via older bind package from isc.org (newer versions no longer include it)
- Shows query details including record type (A record) and responses
- Same information as nslookup, different output format

#section-heading("tcpdump")


- Captures packets from the command line
- Can view on screen or save to a file
- Included with Linux and macOS; Windows alternative: WinDump
- Can capture all packets or apply filters
- Saves files in pcap (packet capture) format — readable by Wireshark and other utilities
- Output shows individual packets with protocol details (IPv4, IPv6, DNS queries, application traffic)

#section-heading("netstat")


- Network statistics — shows active network connections to and from your machine
- Common flags:
  - `netstat -a` — show all active connections (incoming and outgoing)
  - `netstat -b` — show Windows executable making each connection
  - `netstat -n` — show IP addresses only (no DNS name resolution)
- Output shows: protocol, local IP address and port, remote IP address and port, connection state (established, closing, waiting)

#section-heading("ipconfig / ifconfig / ip address")


- Shows local IP address configuration of a device
- *ipconfig* — Windows
  - Shows IPv6, IPv4 address, subnet mask, default gateway
  - `ipconfig /all` — additional details: device name, node type, MAC address, adapter card, DHCP details, DNS servers
- *ifconfig* — Linux/macOS
  - Specify adapter name (e.g., `ifconfig en0`)
  - Shows MAC address, IPv6 address, IPv4 address, and adapter configuration
- *ip address* — newer Linux command, similar information

#section-heading("arp -a")


- Displays the local ARP (Address Resolution Protocol) cache
- Shows IP addresses and their associated MAC addresses on the local subnet
- Works in Linux, macOS, and Windows
- Only shows devices you have recently communicated with
- Pinging a device adds it to the ARP cache
- Useful for looking up a device's MAC address to find it in a switch's MAC address table

]

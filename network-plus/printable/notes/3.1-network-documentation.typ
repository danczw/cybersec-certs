#import "../notes-style.typ": *

#start-note("3.1 — Network Documentation", "3.0 Network Operations", "3.1")

#columns(2, gutter: 5mm)[



#section-heading("Network Maps")


#sub-heading("Physical Network Map")

- Shows physical layout of equipment, cabling, and connections
- Can track cables back to equipment in the room
- Example: internet → router (10.1.1.1) → firewall → core router (10.1.10.1) with physical wires between each

#sub-heading("Logical Network Map")

- Higher-level view of connectivity — not focused on individual interfaces/cables
- Shows how the entire network is connected (e.g., headquarters connected via a cloud)
- Useful for planning additional locations

#sub-heading("Tools")

- Visio, OmniGraffle, Gliffy.com, and others
- Can create both physical and logical maps

#section-heading("Rack Diagrams")


- Physical view as if standing in front of the rack
- Useful when access to data center is restricted
- Allows remote guidance (e.g., "go to unit 14 for the power strip")
- Can include rack location (row and rack identifier)
- Allows specific instructions like "reboot the server at unit 15"

#section-heading("Cable Maps")


- Physical diagram of where wires are installed in a facility
- Usually posted on the wall in the IDF or MDF
- Shows wires running under floor or above ceiling
- Each drop is numbered — correlates desk drops with patch panel connections
- Useful during installation and troubleshooting

#section-heading("Layer 1/2/3 Network Diagrams")


- Combine physical, data link, and network layer views
- Layer 1: physical interfaces where wires connect
- Layer 2: MAC addresses for all components
- Layer 3: IP addresses associated with each MAC address
- Shows which IP → MAC → physical interface

#section-heading("Asset Management")


#sub-heading("Asset Tags")

- Labels on every asset (laptops, desktops, routers, firewalls, switches)
- Used to reference devices in trouble tickets
- Used for financial tracking (depreciation, purchase date, warranty status)
- Visible so support can easily locate them
- May include barcode or RFID
- Identifies owner if a third party finds the device

#sub-heading("Asset Database")

- Centralized database combining: asset tag, device components, and assigned user
- Used by support, accounting, and finance
- Tracks physical location (via assigned user's location)
- Tracks warranty status
- Tracks software/licenses — determines how many licenses to purchase

#section-heading("IP Address Management (IPAM)")


- Solution to plan, track, and configure DHCP and IP address schemes
- Documents which users are using which IP addresses
- Maps users to IP addresses at specific dates/times (useful with dynamic addressing)
- Identifies shortages or problems with IP address configurations
- May lead to modifying IP ranges or adding addresses to DHCP
- Manages all IPv4 and IPv6 addressing from one central console

#section-heading("Service Level Agreement (SLA)")


- Contract defining minimum level of service from a provider
- Example: 99.99% uptime requirement
- Example: no more than four hours of unscheduled downtime
- Provider may quickly dispatch technicians or keep spare equipment on-site

#section-heading("Site Surveys")


- Identify all access points in use (including ones not under your control)
- Document frequencies in use
- Configure systems for minimum interference
- Important in multi-company buildings or large campuses
- Should be performed often in changing environments
- Heat map: walk around with mobile device to document wireless signal propagation

]

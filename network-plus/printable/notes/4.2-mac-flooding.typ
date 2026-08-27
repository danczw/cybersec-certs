#import "../notes-style.typ": *

#start-note("4.2 — MAC Flooding", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("MAC Address Fundamentals")


- MAC = Media Access Control — hardware address of an ethernet adapter
- Unique per device — allows traffic to be sent specifically to one device
- Format: 48 bits (6 bytes), displayed as hexadecimal with colon/period delimiters
- Structure:
  - First 3 bytes: OUI (Organizationally Unique Identifier) — identifies the manufacturer
  - Last 3 bytes: NIC-specific value — serial number of the adapter
- Stored in ROM (Read-Only Memory) of the adapter — called the burned-in address

#section-heading("MAC Address Table (Switch Learning)")


- Switch builds a table of MAC addresses by examining source MAC addresses of inbound frames
- Table maps: source MAC address → switch interface
- Temporary cache — entries discarded after ~5 minutes, must be relearned
- MAC addresses also used by STP (Spanning Tree Protocol) to avoid loops

#sub-heading("Learning Process")

+ Frame arrives at switch with a source MAC address
+ If source MAC is unknown, switch adds it to the table with the receiving interface
+ Future frames with that MAC as a destination are forwarded only to the mapped interface

#sub-heading("Normal Forwarding")

- Switch looks up destination MAC in the table
- If found → sends frame only out the mapped interface (directed conversation)
- Other devices on the switch do not receive the frame

#section-heading("MAC Flooding Attack")


- Attacker sends many frames with different random source MAC addresses
- Fills up the limited MAC address table space
- When table is full and a destination MAC is not found, switch forwards frame to every interface
- Effectively turns the switch into a hub — all traffic sent to all ports
- Attacker can now capture all traffic on the switch, even traffic not destined for them

#sub-heading("Why It Works")

- Normal switch behavior: if destination MAC not in table, flood frame to all interfaces
- Guarantees traffic always reaches its destination
- Attacker exploits this normal process by filling the table with garbage entries

#sub-heading("Mitigation")

- Port security: limits how many MAC addresses can be learned on a single interface
- Makes filling the MAC address table much more difficult

]

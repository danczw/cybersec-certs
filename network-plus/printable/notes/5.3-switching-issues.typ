#import "../template.typ": *

#start-note("5.3 — Switching Issues", "5.0 Network Troubleshooting", "5.3")

#columns(2, gutter: 5mm)[



#section-heading("Switching Loops")


- At the MAC address level, there is no mechanism for counting how many times a frame is seen (no TTL equivalent)
- Frames in a loop will circle indefinitely until a connection is unplugged
- Broadcasts and multicasts amplify the problem — one frame transmitted out every other interface
- IP has a TTL field to prevent packets from looping, but there is nothing in the frame at Layer 2 to prevent loops
- Adding a second connection between switches accidentally creates a loop
- Looping traffic quickly overwhelms both switches and brings the network to a halt

#section-heading("Spanning Tree Protocol (STP)")


- Prevents loops on the network
- Uses Bridge Protocol Data Units (BPDUs) — MAC layer multicast frames sent between switches
- BPDUs contain configuration details and inform of topology changes
- All switches on the local broadcast domain see these multicasts

#sub-heading("BPDU Timers")

- BPDUs sent every 2 seconds by default (hello timer)
- If three consecutive hellos are missed (6 seconds), the link is considered down
- Spanning tree then redesigns the topology to prevent loops

#sub-heading("Root Bridge Election")

- Root bridge elected when the network first starts
- All bridges participate in the election
- Each switch chooses the best connection to communicate to the root bridge
- Root bridge has the lowest bridge ID
- Bridge ID can be manually set between 0 and 61,440
- If multiple switches have the same bridge ID, the lowest MAC address becomes root bridge

#sub-heading("STP Port Roles")

- *Root port* — the port on a non-root switch used to reach the root bridge
- *Designated port* — active port passing traffic
- *Blocked port* — blocked by spanning tree to prevent loops

#callout("Example")[
  *STP Topology*

  ```
  Legend: [RP] Root Port   [DP] Designated Port   [BP] Blocked Port
  
              Bridge 1 (Root)
             [DP]         [DP]
               |            |
           Network M    Network J
               |            |
             [RP]         [RP]
            Bridge 6    Bridge 21
         [DP]   [DP]  [BP]   [DP]
           |      |     |       |
      Network A  Network B  Network C
           |                    |
         [RP]                 [RP]
        Bridge 5           Bridge 11
           [DP]          [BP]
             |             |
             +--Network Y--+
  ```

  - Bridge 1 is root (lowest bridge ID)
  - Blocked ports on Bridge 21 (toward Network B) and Bridge 11 (toward Network Y) prevent loops
  - If Bridge 6's link to Network M fails, spanning tree unblocks alternate paths to restore connectivity
]


#sub-heading("STP Port States")

#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[State],
    text(fill: white, weight: "bold")[Function],
  ),
  [Blocking],   [Not passing traffic; preventing loops],
  [Listening],   [Listening for other switches on the broadcast domain before changes],
  [Learning],   [Adding information to the MAC address table],
  [Forwarding],   [Actively passing traffic],
  [Disabled],   [Administratively turned off by the network administrator],
)
]


#sub-heading("STP Topology Change")

- When a link fails (three missed hellos), spanning tree reconfigures the network
- Blocked ports are unblocked to provide alternate paths
- Network continues to function without loops through the new topology

#section-heading("VLAN Assignment Issues")


- Every switch interface is associated with a particular VLAN
- Access ports are assigned a single VLAN ID
- A device with an IP address that cannot communicate to others on the same network may have a VLAN misconfiguration
- Must check switch configuration to determine which VLAN is assigned to a physical interface
- Resolution: change the VLAN ID on the interface, or move to an interface already configured for the correct VLAN
- Very common issue on networks with many VLANs; resolved relatively quickly

#section-heading("Access Control Lists (ACLs)")


- Even with correct VLAN and routing configuration, ACLs may block traffic
- Check switches and routers for ACLs configured on interfaces
- Should be part of normal troubleshooting when no traffic can communicate between networks

#sub-heading("ACL Best Practices")

- More granular rules at the top of the list (ACL stops evaluating after a match)
- More common matches at the top for efficiency
- Broader controls lower in the ACL
- Disable ACL functionality before making changes (possible to lock yourself out)
- Default behavior on many devices: adding an ACL to an interface implicitly denies all traffic not specifically listed
- An empty ACL effectively filters all communication through that device

]

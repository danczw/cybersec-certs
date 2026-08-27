#import "../template.typ": *

#start-note("5.2 — Interface Issues", "5.0 Network Troubleshooting", "5.2")

#columns(2, gutter: 5mm)[



#section-heading("Interface Monitoring")


- Network administrators monitor interfaces on important devices to detect developing problems
- Allows resolution before an outage occurs
- Can warn of congestion or overutilization — may drive network design changes
- Operating systems provide interface performance feedback under network configurations
- Administrators automate monitoring using SNMP (Simple Network Management Protocol)
- Many devices support MIB-II (Management Information Base) — a standard set of SNMP statistics common across devices
- Proprietary MIBs available for device-specific statistics (firewalls, switches)

#section-heading("Key Interface Metrics")


- *Link status*
  - Whether the link is up or down
  - May indicate cable problem, interface issue, or device reboot
- *Utilization*
  - Total throughput over the connection
  - Ensure sufficient bandwidth for all services
  - Run bandwidth tests to determine actual throughput capacity
- *Errors*
  - CRC errors, runts, giants, drops
  - Often points to cable or interface problems

#section-heading("Ethernet Frame Structure")


#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Field],
    text(fill: white, weight: "bold")[Purpose],
  ),
  [Preamble + SFD],   [Identifies beginning of frame (not visible in packet captures)],
  [Destination MAC],   [Where the frame should go (used by switches for forwarding)],
  [Source MAC],   [Device sending the frame],
  [EtherType],   [Describes what type of data is in the payload],
  [Payload],   [The actual data being transmitted],
  [Frame Check Sequence],   [CRC checksum to verify data integrity],
)
]


#section-heading("CRC Errors")


- Frame Check Sequence contains a checksum calculated at transmission
- Receiving adapter recalculates CRC and compares to the FCS value
- If they match — frame received without corruption
- If mismatch — CRC error counter incremented
- First warning of signal problems on a connection
- Indicates possible cable or interface issue

#section-heading("Runts")


- Frame received that is less than 64 bytes (minimum ethernet frame size)
- Frames below 64 bytes are counted as errors
- Rare on modern full-duplex switch networks
- Common on half-duplex networks during collisions

#section-heading("Giants")


- Frame received larger than 1,518 bytes (default maximum ethernet frame size)
- Jumbo frames can exceed 1,518 bytes but have their own configured maximum
- If a frame exceeds the configured maximum size, it is classified as a giant

#section-heading("Drops")


- Frames lost due to contention or buffering problems
- No room in buffer to hold the frame
- Drop counter increments on the system
- Indicates communication problems on the network

#section-heading("Viewing Error Counters")


- Most devices/operating systems provide a way to view these counters
- Cisco example: `show interface` command displays runts, giants, CRCs, and other errors
- Slowly incrementing CRC errors may indicate developing cable/interface problem

#section-heading("Error Disabled State")


- Device automatically disables an interface without human intervention
- Common triggers:
  - *Interface flapping* — link going up/down repeatedly, causing spanning tree issues
  - *Port security violation* — unauthorized device connected to a secured port
  - *Configuration problems* — incompatible settings
  - *Increasing error counts* — too many errors detected
- Once error disabled, the interface stays off until manually re-enabled
- Must log into switch and administratively re-enable the interface
- If same problem recurs, interface may return to error disabled state

#section-heading("Administratively Down")


- An administrator intentionally disabled the interface
- Not automatic — deliberate action by a human
- Must log in and administratively enable to restore

#section-heading("Suspended Port Status")


- Error occurs the moment the interface is enabled
- Interface connected to an incompatible configuration
- Example: LACP configured on one switch but not the other — interface immediately suspends

]

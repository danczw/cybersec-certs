#import "../template.typ": *

#start-note("3.3 — Network Redundancy", "3.0 Network Operations", "3.3")

#columns(2, gutter: 5mm)[



#section-heading("Active-Passive")


- Two separate pieces of equipment, only one active at any time
- Devices constantly communicate status between each other
- If primary fails, secondary takes over as the primary device
- Configuration between devices must be identical
- Changes to primary config must be copied to secondary
- Real-time information (session tables, routing tables) must also be maintained on secondary
- Secondary has exactly the same configuration as primary so it can take over seamlessly

#callout("Example")[
  *Firewall Active-Passive*

  ```
                      ┌──────────┐
  Internet ──────────►│ FW Active│──────► Router ──► Switch ──► Web Server
                      └──────────┘
                      ┌──────────┐
                      │FW Passive│ (standby, monitoring active FW)
                      └──────────┘
  ```

  - Traffic passes through the active firewall
  - If active firewall fails (power supply, software crash), passive detects it is offline
  - Passive firewall promotes itself to active and becomes the primary device
  - Future communication uses the new active firewall
]


#section-heading("Active-Active")


- Both devices operating simultaneously
- Not as simple as turning both on — requires additional engineering
- Must track data flows across both devices (one direction through one device, return through the other)
- Requires understanding of:
  - Traffic flow directions
  - Routing configuration
  - Switch locations
  - Expected normal traffic flow patterns
- If one device fails, the remaining device continues handling all traffic — no failover process needed

#callout("Example")[
  *Firewall Active-Active*

  ```
                      ┌────────────┐
                  ┌──►│ FW Active 1│───┐
  Internet ───────┤   └────────────┘   ├──► Router ──► Switch ──► Web Server
                  └──►│ FW Active 2│───┘
                      └────────────┘
  ```

  - Traffic flows split across both firewalls
  - One flow may go through FW1, another through FW2
  - If one fails, remaining firewall handles all load
  - Traffic continues to flow normally

]

]

#import "template.typ": *

#start-note("3.2 — SNMP", "3.0 Network Operations", "3.2")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Standard protocol for monitoring and configuring network devices
- Provides a management interface regardless of device manufacturer
- Central network management console queries devices via SNMP
- Queries request specific data (e.g., bytes into a particular interface)
- Response values stored on the management station

#section-heading("MIB (Management Information Base)")


- Central database of parameters stored on each managed device
- SNMP queries specific values using an Object Identifier (OID)
- OID is a series of numbers representing a hierarchical path (e.g., `1.3.6.1.2.1.11.28.0`)
  - 1 = ISO, 3 = org, 6 = DoD, 1 = internet, 2 = management, etc.
- MIB2 (SNMPV2-MIB): standardized set of OIDs identical across devices
- Manufacturer-specific OIDs: unique variables for a specific device
  - Manufacturer provides documentation or a MIB file to import into the management station
- MIB browser/walker: software that cycles through every possible MIB value on a device

#section-heading("Polling")


- All SNMP polling occurs over *UDP port 161*
- Management station queries devices at regular intervals (every 1–5 minutes)
- Collected data over time builds performance graphs and visualizations
- Limitation: problems not detected until next polling interval

#section-heading("SNMP Traps")


- Proactive alarm sent from device to management station without polling
- Uses *UDP port 162*
- Configured on the device with threshold conditions (e.g., CRC error count increases by 5)
- Management station receives trap and can alert staff or run remediation scripts

#section-heading("SNMP Versions")


#table(
  columns: 4,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Version],
    text(fill: white, weight: "bold")[Encryption],
    text(fill: white, weight: "bold")[Bulk Queries],
    text(fill: white, weight: "bold")[Authentication],
  ),
  [v1],   [None],   [No],   [Community string],
  [v2c],   [None],   [Yes],   [Community string],
  [v3],   [Yes],   [Yes],   [Username + password hash],
)


#sub-heading("Version 1")
- Original version — queries structured MIB tables
- All data sent in the clear (no encryption)

#sub-heading("Version 2c")
- Improved efficiency — can query large chunks of data at once
- Still no encryption

#sub-heading("Version 3")
- Adds encryption, message integrity, and authentication
- Most secure — recommended for production use

#section-heading("Authentication")


#sub-heading("Community Strings (v1/v2c)")
- Simple password for accessing SNMP data
- Multiple strings per device:
  - *Read-only* (default: `public`)
  - *Read-write* (default: `private`)
  - *Trap* community string
- Relatively simplistic security

#sub-heading("SNMP v3 Authentication")
- Username and password sent as a password hash
- Much more secure than community strings

]

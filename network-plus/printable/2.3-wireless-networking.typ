#import "template.typ": *

#start-note("2.3 — Wireless Networking", "2.0 Network Implementation", "2.3")

#columns(2, gutter: 5mm)[



#section-heading("Service Sets")


#sub-heading("Independent Basic Service Set (IBSS)")

- Direct device-to-device communication without an access point
- Also called an ad hoc connection
- Common use: configuring IoT devices (door locks, lights) before connecting them to the main network

#sub-heading("SSID (Service Set Identifier)")

- The name of the wireless network
- Appears in the list of available networks on client devices
- Can be configured on multiple access points for coverage across large areas

#sub-heading("BSSID (Basic Service Set Identifier)")

- The hardware address of an individual access point
- Differentiates between access points that share the same SSID
- Example format: 60:3D:26:11:22:33

#sub-heading("ESSID (Extended Service Set Identifier)")

- The shared network name used across multiple access points
- Enables seamless roaming — device moves between APs without notification or interruption
- All APs share the same SSID but have different BSSIDs

#section-heading("Captive Portals")


- Screen presented when first connecting to a wireless network
- May require agreement to terms or authentication (username, password, or other factor)
- Centralized access table tracks authenticated devices
- Unauthenticated devices are redirected to the captive portal
- Access is granted for a predefined time (e.g., 24 hours), then reauthentication is required

#section-heading("Wireless Security Modes")


#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Mode],
    text(fill: white, weight: "bold")[Description],
  ),
  [Open],   [No security, no authentication, anyone can communicate],
  [OWE],   [Encrypts traffic but prevents device-to-device communication],
  [WEP],   [Legacy encryption (insecure)],
  [WPA/WPA2/WPA3],   [Progressively stronger wireless security standards],
  [Personal (PSK)],   [Pre-shared key — everyone uses the same password],
  [Enterprise (802.1X)],   [Individual username/password; disabling account removes access],
)


- PSK example: coffee shop posts the shared password for all customers
- Enterprise: users authenticate with their own corporate credentials

#section-heading("Antenna Types")


#sub-heading("Omnidirectional")

- Distributes signal evenly in all directions
- Common on consumer/home access points
- Ideal when AP is centrally located
- Wasteful if AP is in a corner — signal goes where no one connects

#sub-heading("Directional")

- Focuses signal in a single direction
- Useful for corner placement or building-to-building links
- Measured in decibels of gain
- Every 3 dB of gain doubles the power

#sub-heading("Directional Antenna Types")

#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Type],
    text(fill: white, weight: "bold")[Characteristics],
  ),
  [Yagi],   [Very directional, high gain],
  [Parabolic],   [Focuses signals into a single feed horn; useful over long distances],
)


#section-heading("Access Point Management")


#sub-heading("Autonomous Access Points")

- Standalone devices that operate independently
- No additional hardware or software required
- Common in home environments

#sub-heading("Lightweight Access Points")

- Hardware mounted in ceiling; configuration/intelligence maintained on the switch
- Less expensive to deploy
- Managed centrally

#sub-heading("CAPWAP (Control and Provisioning of Wireless Access Points)")

- Standard for managing wireless access points from one central station
- Central station = wireless LAN controller (WLC)
- Provides a "single pane of glass" view of the wireless infrastructure

#sub-heading("Wireless LAN Controller Functions")

- Deploy new access points
- Monitor existing AP performance
- Push configuration changes to some or all APs
- Generate usage reports (how much bandwidth used, by whom)
- Usually paired with APs from the same manufacturer

]

#import "../template.typ": *

#start-note("2.3 — Network Types", "2.0 Network Implementation", "2.3")

#columns(2, gutter: 5mm)[



#section-heading("Wireless Mesh")


- Multiple access points communicate with each other in a close area
- Client devices connect to one AP and reach the rest of the network through the mesh
- Adding new APs includes them in the mesh automatically
- Non-AP devices can also mesh in an ad hoc form
- Self-healing: if one device leaves, the mesh detects it and maintains connectivity for remaining devices

#section-heading("Ad Hoc (IBSS)")


- Two devices connect directly using 802.11 without an access point
- Also called Independent Basic Service Set (IBSS)
- Can be long-term (two devices permanently connected) or temporary
- Common temporary use: connect to an IoT device, transfer configuration (SSID, security settings), then disable the ad hoc connection so the IoT device joins the main network

#section-heading("Point to Point")


- Connects two locations directly (e.g., building to building)
- Each side has an AP connected to a switch and internal network
- Not all APs support point to point mode — requires both software support and hardware capable of extended distance
- May require additional antennas, power output changes, and appropriate frequencies for longer distances

#section-heading("Infrastructure Mode")


- Most common wireless connection type (home and office)
- Centralized access point that all wireless devices connect to
- Devices communicate to the wired network or other wireless devices through the AP
- Some APs allow device-to-device wireless communication; others isolate devices to only communicate with the AP and networks beyond it

]

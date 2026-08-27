#import "../notes-style.typ": *

#start-note("2.3 — Wireless Technologies", "2.0 Network Implementation", "2.3")

#columns(2, gutter: 5mm)[



#section-heading("IEEE 802.11 Standards")


- IEEE 802.11 committee creates worldwide standards for wireless networking
- Standards have marketing-friendly names:

#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Standard],
    text(fill: white, weight: "bold")[Wi-Fi Name],
  ),
  [802.11ac],   [Wi-Fi 5],
  [802.11ax],   [Wi-Fi 6/6E],
  [802.11be],   [Wi-Fi 7],
)
]


- Future major releases will increment the Wi-Fi number (Wi-Fi 8, 9, etc.)

#section-heading("Wireless Frequencies and Channels")


- 802.11 uses three frequency ranges: 2.4 GHz, 5 GHz, and 6 GHz
- Access points may support one or more of these simultaneously
- Channels are named groupings of frequencies for easy reference
  - Channel 6 = centered on 2.437 GHz
  - Channel 44 = centered on 5.220 GHz

#sub-heading("Channel Bandwidth")

- Each channel uses a range of frequencies around its center (the bandwidth)
- Common bandwidths: 20 MHz, 40 MHz, 80 MHz, 160 MHz

#sub-heading("Frequency Comparison")

#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Band],
    text(fill: white, weight: "bold")[Channels Available],
    text(fill: white, weight: "bold")[Typical Bandwidth],
  ),
  [2.4 GHz],   [3 nonoverlapping],   [20 MHz],
  [5 GHz],   [Many more],   [20–160 MHz],
  [6 GHz],   [Even more],   [20–160 MHz],
)
]


- More available channels = less conflict with nearby networks

#section-heading("Band Steering")


- Modern devices can support multiple frequency bands
- Without band steering: device connects to whichever frequency has the strongest signal
- Strongest signal does not always mean best throughput
- Band steering lets the AP administrator control which frequency a dual-band client uses
  - Example: steer 2.4/5 GHz capable devices to prefer 5 GHz

#section-heading("Regulatory Impacts")


#sub-heading("Country-Specific Regulation")

- Each country manages its own frequency allocations
  - US: Federal Communications Commission (FCC)
- Countries work together to coordinate frequency use

#sub-heading("802.11h Interoperability")

- Adds features so multiple wireless networks can coexist in one area
- Follows guidelines from the International Telecommunications Union (ITU)
- Two key features: Dynamic Frequency Selection (DFS) and Transmit Power Control (TPC)

#sub-heading("Dynamic Frequency Selection (DFS)")

- APs automatically select channels that won't conflict with existing networks
- If the wireless environment changes, the AP changes channels and tells all connected clients to move with it
- Eliminates need for manual channel configuration

#sub-heading("Transmit Power Control (TPC)")

- AP controls client transmit power (rather than client setting its own)
- AP can tell a client to reduce power
- Allows many devices to operate at optimal power without conflicting with other services

]

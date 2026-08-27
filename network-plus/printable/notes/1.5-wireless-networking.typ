#import "../notes-style.typ": *

#start-note("1.5 — Wireless Networking", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("802.11 Standards")


- Managed by IEEE (Institute of Electrical and Electronics Engineers)
- All wireless LAN standards fall under 802.11
- Wi-Fi Alliance tests/certifies devices for interoperability (Wi-Fi trademark logo)

#sub-heading("Generational Naming")

#block(breakable: false)[
#table(
  columns: 4,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Standard],
    text(fill: white, weight: "bold")[Generation],
    text(fill: white, weight: "bold")[Frequencies],
    text(fill: white, weight: "bold")[Max Theoretical Link Rate],
  ),
  [802.11a],   [(Wi-Fi 1)],   [5 GHz],   [6–54 Mbps],
  [802.11b],   [(Wi-Fi 2)],   [2.4 GHz],   [1–11 Mbps],
  [802.11g],   [(Wi-Fi 3)],   [2.4 GHz],   [6–54 Mbps],
  [802.11n],   [Wi-Fi 4],   [2.4 GHz / 5 GHz],   [72–600 Mbps],
  [802.11ac],   [Wi-Fi 5],   [5 GHz],   [433 Mbps – 6.9 Gbps],
  [802.11ax],   [Wi-Fi 6 and 6E],   [2.4 GHz / 5 GHz / 6 GHz],   [574 Mbps – 9.6 Gbps],
  [802.11be],   [Wi-Fi 7],   [2.4 GHz / 5 GHz / 6 GHz],   [1.4–46.1 Gbps],
)
]


- 802.11a/b/g rarely used today; generational names are informal for those
- Newer standards use more antennas/radios → higher link rates
- Link rates are theoretical maximums

#section-heading("Mobile Networking")


#sub-heading("4G / LTE")

- LTE = Long-Term Evolution
- Unified GSM and CDMA into a single standard
- Download speeds: ~150 Mbps
- LTE-A (LTE Advanced): ~300 Mbps

#sub-heading("5G")

- Introduced 2020
- Higher Frequencies
- Goal: up to 10 Gbps throughput
- Typical speeds: 100–900 Mbps
- Enables expanded IoT footprint (more data, faster notifications and monitoring, cloud processing)
- Comparable bandwidth to wired home internet

#section-heading("Satellite Networking")


- Used for remote locations without terrestrial internet access
- Typical speeds: 100 Mbps down / 5 Mbps up

#sub-heading("Latency")

#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Technology],
    text(fill: white, weight: "bold")[Latency],
  ),
  [Traditional satellite],   [~500 ms (250 up + 250 down)],
  [Starlink],   [~40 ms (goal: 20 ms)],
)
]


#sub-heading("Limitations")

- Requires direct line of sight to satellite
- Rain fade — loss of connectivity during storms
- Higher cost and complexity than terrestrial options
- May need backup connectivity for weather outages

]

#import "../notes-style.typ": *

#start-note("1.5 — Network Transceivers", "1.0 Networking Concepts", "1.5")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


#callout("Supplementary")[
  A transceiver is a small module (not a cable) that plugs into a switch/router port. The cable then plugs into the transceiver — it's the middleman between the switch and the cable.
]


- Transceiver = transmitter + receiver combined in one component
- Provides modularity — slide in the appropriate transceiver for your media/network type
- Each interface on a switch can have a different media type
- Transceiver must match the network type (Ethernet transceiver for Ethernet, Fibre Channel for Fibre Channel)
- Modularity comes at additional cost

#section-heading("Transceiver Types")


#block(breakable: false)[
#table(
  columns: 4,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Type],
    text(fill: white, weight: "bold")[Full Name],
    text(fill: white, weight: "bold")[Speed],
    text(fill: white, weight: "bold")[Channels],
  ),
  [SFP],   [Small Form-factor Pluggable],   [1 Gbps],   [1],
  [SFP+],   [Enhanced Small Form-factor Pluggable],   [Up to 16 Gbps],   [1],
  [QSFP],   [Quad Small Form-factor Pluggable],   [4 Gbps],   [4 × SFP],
  [QSFP+],   [Quad Enhanced Small Form-factor Pluggable],   [40 Gbps],   [4 × SFP+],
)
]


#section-heading("Form Factors")


- SFP and SFP+ share the same physical form factor
- QSFP and QSFP+ share the same physical form factor
- QSFP/QSFP+ is slightly larger than SFP/SFP+ but not four times the size
- Space efficiency: four links in less space than four individual SFPs

#section-heading("Key Points")


- Available in both copper and fiber versions
- Can swap copper transceiver for fiber (and vice versa) without changing the switch
- 10 Gbps connections commonly use SFP+
- QSFP+ extends four separate links over a single fiber — cost benefit for equipment and media
- Data center racks are 19 inches wide with limited space → density matters

]

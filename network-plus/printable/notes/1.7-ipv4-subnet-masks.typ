#import "../notes-style.typ": *

#start-note("1.7 — IPv4 Subnet Masks", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("Classless Subnetting (CIDR)")


- Replaced class-based subnetting in 1993
- Classless Inter-Domain Routing (CIDR)
- Subnet mask can be any length, not limited to /8, /16, /24
- CIDR block notation: /n where n = number of 1-bits in the mask

#section-heading("CIDR Block Notation")


- /24 = 255.255.255.0
- /16 = 255.255.0.0
- /8 = 255.0.0.0
- Common format: 192.168.1.44/24 (IP address with mask length)

#section-heading("Where Each Notation Is Used")


- Operating systems (e.g., Windows): expect decimal subnet mask
- Routers/switches: often expect CIDR block notation
- Check device documentation for preferred format

#section-heading("Subnet Mask Structure")


- Contiguous 1's on the left, 0's on the right
- 1-bits = network portion
- 0-bits = host portion
- Never mixed (no 0 between 1's)

#section-heading("Binary-to-Decimal Subnet Octet Values")


#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Binary],
    text(fill: white, weight: "bold")[Decimal],
    text(fill: white, weight: "bold")[CIDR bits in octet],
  ),
  [00000000],   [0],   [0],
  [10000000],   [128],   [1],
  [11000000],   [192],   [2],
  [11100000],   [224],   [3],
  [11110000],   [240],   [4],
  [11111000],   [248],   [5],
  [11111100],   [252],   [6],
  [11111110],   [254],   [7],
  [11111111],   [255],   [8],
)
]


#section-heading("Conversion Examples")


#callout("Example")[
  #strong[/12 = 255.240.0.0]

  - Binary: 11111111.11110000.00000000.00000000
  - Network bits: 12 | Host bits: 20

]

#callout("Example")[
  #strong[/16 = 255.255.0.0]

  - Binary: 11111111.11111111.00000000.00000000
  - Network bits: 16 | Host bits: 16

]

#callout("Example")[
  #strong[/19 = 255.255.224.0]

  - Binary: 11111111.11111111.11100000.00000000
  - Network bits: 19 | Host bits: 13

]

#callout("Example")[
  #strong[/20 = 255.255.240.0]

  - Binary: 11111111.11111111.11110000.00000000
  - Network bits: 20 | Host bits: 12

]

#callout("Example")[
  #strong[/26 = 255.255.255.192]

  - Binary: 11111111.11111111.11111111.11000000
  - Network bits: 26 | Host bits: 6

]

]

#import "template.typ": *

#start-note("1.7 — Calculating IPv4 Subnets and Hosts", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("Why Subnet?")


- Impossible for one device to know every other device's location
- Subnetting creates smaller networks
- Routers forward traffic between subnets to reach any destination

#section-heading("Variable-Length Subnet Masks (VLSM)")


- Subnet masks not limited to classful boundaries (/8, /16, /24)
- Any number of bits can be used for the mask
- Network admin controls exact network size
- Analogy: cutting a pizza into however many slices you need

#section-heading("Subnet Mask Anatomy")


```
    [  Network bits  |  Subnet bits  |  Host bits  ]
      (default class)   (borrowed)     (remaining)
```

- Network bits: default from the class (A=8, B=16, C=24)
- Subnet bits: borrowed from host portion beyond the default
- Host bits: whatever remains after network + subnet bits

#callout("Supplementary")[
  Subnets are a design tool, not a protocol feature. Routers only see the total prefix length — they don't distinguish between "class network bits" and "borrowed subnet bits." A routing table entry is just prefix + length (e.g., 10.1.1.0/24). The class-based breakdown only matters to the admin deciding how to carve up address space. Once advertised, it's all just prefix length pointing to a next hop.
]


#section-heading("Formulas")


- *Number of subnets* = 2^(subnet bits)
- *Hosts per subnet* = 2^(host bits) − 2
  - Subtract 2 for network address and broadcast address

#section-heading("Calculation Examples")


#callout("Example")[
  *10.1.1.0/24 (Class A, default /8)*

  - Subnet bits borrowed: 24 − 8 = 16
  - Host bits remaining: 32 − 24 = 8
  - Subnets: 2^16 = 65,536
  - Hosts per subnet: 2^8 − 2 = 254

]

#callout("Example")[
  *192.168.11.0/26 (Class C, default /24)*

  - Subnet bits borrowed: 26 − 24 = 2
  - Host bits remaining: 32 − 26 = 6
  - Subnets: 2^2 = 4
  - Hosts per subnet: 2^6 − 2 = 62

]

#callout("Example")[
  *172.16.55.0/21 (Class B, default /16)*

  - Subnet bits borrowed: 21 − 16 = 5
  - Host bits remaining: 32 − 21 = 11
  - Subnets: 2^5 = 32
  - Hosts per subnet: 2^11 − 2 = 2,046
]


#section-heading("Powers of 2 Reference")


#block(breakable: false)[
#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[2^n],
    text(fill: white, weight: "bold")[Value],
  ),
  [2^1],   [2],
  [2^2],   [4],
  [2^3],   [8],
  [2^4],   [16],
  [2^5],   [32],
  [2^6],   [64],
  [2^7],   [128],
  [2^8],   [256],
  [2^9],   [512],
  [2^10],   [1,024],
  [2^11],   [2,048],
  [2^12],   [4,096],
  [2^16],   [65,536],
)
]


]

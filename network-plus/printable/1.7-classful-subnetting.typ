#import "template.typ": *

#start-note("1.7 — Classful Subnetting", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Class-based subnetting not used since 1993
- Still referenced colloquially (class A, B, C)
- Classes serve as the starting point for subnetting calculations

#section-heading("IP Address Classes")


#block(breakable: false)[
#table(
  columns: 6,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Class],
    text(fill: white, weight: "bold")[First Octet],
    text(fill: white, weight: "bold")[First Bits],
    text(fill: white, weight: "bold")[Default Subnet Mask],
    text(fill: white, weight: "bold")[Network Bits],
    text(fill: white, weight: "bold")[Host Bits],
  ),
  [A],   [0–127],   [0],   [255.0.0.0],   [8],   [24],
  [B],   [128–191],   [10],   [255.255.0.0],   [16],   [16],
  [C],   [192–223],   [110],   [255.255.255.0],   [24],   [8],
  [D],   [224–239],   [1110],   [(multicast)],   [—],   [—],
  [E],   [240–255],   [1111],   [(reserved)],   [—],   [—],
)
]


- Class D: multicast, not assigned to individual devices
- Class E: reserved, not used for any purpose

#section-heading("Network/Host Bit Split")


```
            255         0           0           0
Class A  11111111 . 00000000 . 00000000 . 00000000
         [Net (8)]  [            Hosts (24)       ]

            255        255          0           0
Class B  11111111 . 11111111 . 00000000 . 00000000
         [   Network (16)   ]  [    Hosts (16)    ]

            255        255         255          0
Class C  11111111 . 11111111 . 11111111 . 00000000
         [       Network (24)          ]  [Host(8)]
```

#section-heading("Determining Class from IP Address")


- Look at the first octet only
- Examples:
  - 17.22.90.7 → first octet 17 → Class A
  - 220.10.77.40 → first octet 220 → Class C
  - 165.245.0.1 → first octet 165 → Class B
  - 192.1.12.5 → first octet 192 → Class C

#section-heading("Four Important Subnet Values")


#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Value],
    text(fill: white, weight: "bold")[How to Calculate],
  ),
  [Network address],   [Set all host bits to 0],
  [First usable host],   [Network address + 1],
  [Broadcast address],   [Set all host bits to 1],
  [Last usable host],   [Broadcast address − 1],
)
]


#section-heading("Calculation Examples")


#callout("Example")[
  *Class A: 10.74.222.11 /8*

  - Network/host split: 10 | 74.222.11
  - Network address: 10.0.0.0
  - First host: 10.0.0.1
  - Broadcast: 10.255.255.255
  - Last host: 10.255.255.254

]

#callout("Example")[
  *Class B: 172.16.88.200 /16*

  - Network/host split: 172.16 | 88.200
  - Network address: 172.16.0.0
  - First host: 172.16.0.1
  - Broadcast: 172.16.255.255
  - Last host: 172.16.255.254

]

#callout("Example")[
  *Class C: 192.168.4.77 /24*

  - Network/host split: 192.168.4 | 77
  - Network address: 192.168.4.0
  - First host: 192.168.4.1
  - Broadcast: 192.168.4.255
  - Last host: 192.168.4.254

]

]

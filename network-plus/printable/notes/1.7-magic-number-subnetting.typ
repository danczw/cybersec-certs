#import "../template.typ": *

#start-note("1.7 — Magic Number Subnetting", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("The Subnetting Problem")


Given 192.168.1.0/24, find optimal subnet mask for 40 devices per subnet:

#block(breakable: false)[
#table(
  columns: 4,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Mask],
    text(fill: white, weight: "bold")[CIDR],
    text(fill: white, weight: "bold")[Subnets],
    text(fill: white, weight: "bold")[Hosts/Subnet],
  ),
  [255.255.255.0],   [/24],   [1],   [254],
  [255.255.255.128],   [/25],   [2],   [126],
  [255.255.255.192],   [/26],   [4],   [62],
  [255.255.255.224],   [/27],   [8],   [30],
)
]


Answer: /26 — smallest mask that still supports 40+ hosts per subnet.

#section-heading("Four Values to Calculate")


+ *Network address (subnet ID)* — first address in the subnet
+ *Broadcast address* — last address in the subnet
+ *First usable host* — subnet ID + 1
+ *Last usable host* — broadcast − 1

#section-heading("Magic Number Method Steps")


No binary-to-decimal conversions needed — uses simple subtraction and multiples.

+ Convert subnet mask to decimal (if not already)
+ Identify the *interesting octet* — the octet that is neither 255 nor 0
+ Calculate magic number: *256 − interesting octet value*
+ Determine host ranges (multiples of the magic number)
+ Find which range the IP falls into
+ Network address = first value in that range
+ Broadcast address = subnet ID + magic number − 1

#section-heading("CIDR-to-Interesting-Octet Reference")


#block(breakable: false)[
#table(
  columns: 9,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
    text(fill: white, weight: "bold")[.],
  ),
  [CIDR for interesting octet 2],   [/9],   [/10],   [/11],   [/12],   [/13],   [/14],   [/15],   [/16],
  [CIDR for interesting octet 3],   [/17],   [/18],   [/19],   [/20],   [/21],   [/22],   [/23],   [/24],
  [CIDR for interesting octet 4],   [/25],   [/26],   [/27],   [/28],   [/29],   [/30],   [],   [],
  [Magic number],   [128],   [64],   [32],   [16],   [8],   [4],   [2],   [1],
  [Subnet mask],   [128],   [192],   [224],   [240],   [248],   [252],   [254],   [255],
)
]


/31 and /32 are not included — /31 leaves no room for hosts, /32 leaves 0 host bits.

#section-heading("Subnet ID Rules")


- If mask octet = 255 → copy IP address octet down
- If mask octet = 0 → write 0
- If mask octet = interesting → use magic number to find range start

#section-heading("Broadcast Address Rules")


- If mask octet = 255 → copy subnet ID octet down
- If mask octet = 0 → write 255
- If mask octet = interesting → subnet ID + magic number − 1

#callout("Example")[
  *165.245.77.14 / 255.255.240.0*

  #block(breakable: false)[
#table(
  columns: 5,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Octet],
    text(fill: white, weight: "bold")[Mask],
    text(fill: white, weight: "bold")[IP],
    text(fill: white, weight: "bold")[Subnet ID],
    text(fill: white, weight: "bold")[Broadcast],
  ),
  [1],   [255],   [165],   [165],   [165],
  [2],   [255],   [245],   [245],   [245],
  [3],   [240],   [77],   [64],   [79],
  [4],   [0],   [14],   [0],   [255],
)
]


  - Interesting octet: 3 (mask = 240)
  - Magic number: 256 − 240 = 16
  - Ranges: 0–15, 16–31, 32–47, 48–63, *64–79*, 80–95...
  - IP octet 3 = 77 → falls in 64–79
  - Subnet ID: 165.245.64.0
  - Broadcast: 165.245.79.255
  - First host: 165.245.64.1
  - Last host: 165.245.79.254

]

#callout("Example")[
  *10.180.122.244 / 255.248.0.0*

  #block(breakable: false)[
#table(
  columns: 5,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Octet],
    text(fill: white, weight: "bold")[Mask],
    text(fill: white, weight: "bold")[IP],
    text(fill: white, weight: "bold")[Subnet ID],
    text(fill: white, weight: "bold")[Broadcast],
  ),
  [1],   [255],   [10],   [10],   [10],
  [2],   [248],   [180],   [176],   [183],
  [3],   [0],   [122],   [0],   [255],
  [4],   [0],   [244],   [0],   [255],
)
]


  - Interesting octet: 2 (mask = 248)
  - Magic number: 256 − 248 = 8
  - Ranges: 0–7, 8–15, ... *176–183*, ...
  - IP octet 2 = 180 → falls in 176–183
  - Subnet ID: 10.176.0.0
  - Broadcast: 10.183.255.255
  - First host: 10.176.0.1
  - Last host: 10.183.255.254

]

#callout("Example")[
  *172.16.242.133/27*

  #block(breakable: false)[
#table(
  columns: 5,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Octet],
    text(fill: white, weight: "bold")[Mask],
    text(fill: white, weight: "bold")[IP],
    text(fill: white, weight: "bold")[Subnet ID],
    text(fill: white, weight: "bold")[Broadcast],
  ),
  [1],   [255],   [172],   [172],   [172],
  [2],   [255],   [16],   [16],   [16],
  [3],   [255],   [242],   [242],   [242],
  [4],   [224],   [133],   [128],   [159],
)
]


  - Interesting octet: 4 (mask = 224, /27)
  - Magic number: 256 − 224 = 32
  - Ranges: 0–31, 32–63, 64–95, 96–127, *128–159*, ...
  - IP octet 4 = 133 → falls in 128–159
  - Subnet ID: 172.16.242.128
  - Broadcast: 172.16.242.159
  - First host: 172.16.242.129
  - Last host: 172.16.242.158

]

]

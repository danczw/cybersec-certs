#import "template.typ": *

#start-note("1.7 — Seven Second Subnetting", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- No math involved — all values predefined in a chart created at the start
- Only arithmetic: adding/subtracting 1 for first/last IP
- Same structure as magic number method but eliminates the 256 − mask calculation

#section-heading("The Chart")


#table(
  columns: 7,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[CIDR (octet 1)],
    text(fill: white, weight: "bold")[CIDR (octet 2)],
    text(fill: white, weight: "bold")[CIDR (octet 3)],
    text(fill: white, weight: "bold")[CIDR (octet 4)],
    text(fill: white, weight: "bold")[Networks],
    text(fill: white, weight: "bold")[Addresses],
    text(fill: white, weight: "bold")[Subnet Mask],
  ),
  [/1],   [/9],   [/17],   [/25],   [2],   [128],   [128],
  [/2],   [/10],   [/18],   [/26],   [4],   [64],   [192],
  [/3],   [/11],   [/19],   [/27],   [8],   [32],   [224],
  [/4],   [/12],   [/20],   [/28],   [16],   [16],   [240],
  [/5],   [/13],   [/21],   [/29],   [32],   [8],   [248],
  [/6],   [/14],   [/22],   [/30],   [64],   [4],   [252],
  [/7],   [/15],   [/23],   [],   [128],   [2],   [254],
  [/8],   [/16],   [/24],   [],   [256],   [1],   [255],
)


- Networks column: start at 2, double down
- Addresses column: start at 128, halve down

#section-heading("Subnet Boundaries Chart (Optional)")


Pre-written ranges to quickly locate which block an IP falls into:

- 128 addresses: 0–127, 128–255
- 64 addresses: 0–63, 64–127, 128–191, 192–255
- 32 addresses: 0–31, 32–63, 64–95, 96–127, 128–159, 160–191, 192–223, 224–255
- 16 addresses: 0–15, 16–31, 32–47, 48–63, 64–79, 80–95, 96–111, 112–127, 128–143, 144–159, 160–175, 176–191, 192–207, 208–223, 224–239, 240–255
- 8 addresses: multiples of 8 (0, 8, 16, 24...)
- 4 addresses: multiples of 4 (0, 4, 8, 12...)

#section-heading("Four-Step Process")


+ Convert CIDR to decimal subnet mask (use chart)
+ Determine subnet/network address
+ Determine broadcast address
+ Calculate first IP (subnet + 1) and last IP (broadcast − 1)

#section-heading("Rules")


#sub-heading("Subnet Address")

- Mask = 255 → bring down the IP address octet
- Mask = 0 → bring down 0
- Mask = interesting → find which block the IP falls into, use start of that block

#sub-heading("Broadcast Address")

- Mask = 255 → bring down the address octet
- Mask = 0 → use 255
- Mask = interesting → next block start − 1

#section-heading("Example 1: 165.245.12.88/24")


- /24 → third octet → mask 255 → full mask: 255.255.255.0
- Subnet: 165.245.12.0 (octets 1–3 mask=255 copy down, octet 4 mask=0 use 0)
- Broadcast: 165.245.12.255 (octets 1–3 copy down, octet 4 mask=0 use 255)
- First IP: 165.245.12.1
- Last IP: 165.245.12.254

#section-heading("Example 2: 165.245.12.88/26")


- /26 → fourth octet → mask 192 → full mask: 255.255.255.192
- Addresses per subnet: 64
- IP octet 4 = 88 → falls in block 64–127
- Subnet: 165.245.12.64
- Broadcast: 165.245.12.127 (next block starts at 128, minus 1)
- First IP: 165.245.12.65
- Last IP: 165.245.12.126

#section-heading("Example 3: 165.245.12.88/20")


- /20 → third octet → mask 240 → full mask: 255.255.240.0
- Addresses per subnet: 16
- IP octet 3 = 12 → falls in block 0–15
- Subnet: 165.245.0.0
- Broadcast: 165.245.15.255 (next block starts at 16, minus 1 = 15)
- First IP: 165.245.0.1
- Last IP: 165.245.15.254

#section-heading("Example 4: 18.172.200.77/11")


- /11 → second octet → mask 224 → full mask: 255.224.0.0
- Addresses per subnet: 32
- IP octet 2 = 172 → falls in block 160–191
- Subnet: 18.160.0.0
- Broadcast: 18.191.255.255 (next block starts at 192, minus 1 = 191)
- First IP: 18.160.0.1
- Last IP: 18.191.255.254

#section-heading("Example 5: 18.172.200.77/17")


- /17 → third octet → mask 128 → full mask: 255.255.128.0
- Addresses per subnet: 128
- IP octet 3 = 200 → falls in block 128–255
- Subnet: 18.172.128.0
- Broadcast: 18.172.255.255 (last address in block)
- First IP: 18.172.128.1
- Last IP: 18.172.255.254

#section-heading("Exam Tips")


- Write chart on dry erase board at testing center or type into notepad for online exam
- Bring your own fine tip dry erase pen (check with testing center first)
- Find the shortcut that works best for you — seven second, magic number, or other

]

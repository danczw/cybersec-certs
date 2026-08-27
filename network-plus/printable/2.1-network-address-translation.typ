#import "template.typ": *

#start-note("2.1 — Network Address Translation", "2.0 Network Implementation", "2.1")

#columns(2, gutter: 5mm)[



#section-heading("The Problem")


- IPv4 supports only 4.29 billion addresses — completely exhausted
- Estimated 20–30 billion devices connected to the internet
- NAT extends the functionality of IPv4

#section-heading("RFC 1918 Private IP Ranges")


Not routable on the public internet; used internally in homes and businesses.

#block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Range],
    text(fill: white, weight: "bold")[Typical Use],
  ),
  [10.0.0.0 – 10.255.255.255],   [Large enterprises],
  [172.16.0.0 – 172.31.255.255],   [Mid-size networks],
  [192.168.0.0 – 192.168.255.255],   [Home networks],
)
]


#section-heading("How NAT Works (Standard)")


Translates one IP address to a different IP address (private → public).

+ Internal device sends packet with private source IP
+ NAT router receives packet, recognizes private source IP
+ Router translates source IP to an available public IP from its pool
+ Packet goes to destination with public source IP
+ Return traffic comes back to the public IP
+ NAT router translates destination IP back to the original private IP
+ Internal device receives the response

Each internal device using standard NAT requires its own public IP address.

#section-heading("NAT Overload / PAT (Port Address Translation)")


Translates both the IP address AND the port number — allows many devices to share one public IP.

#sub-heading("How It Works")

+ Internal device sends packet with private IP + source port (e.g., 10.10.20.50:3233)
+ NAT router translates to public IP + different port (e.g., 94.1.1.1:1055)
+ Router stores mapping in NAT table (private IP:port ↔ public IP:port)
+ Another device (e.g., 10.10.20.70:5782) gets the same public IP but a different port (94.1.1.1:1056)
+ Many internal devices share one public IP — differentiated by port number

#callout("Example")[
  *NAT Table*

  #block(breakable: false)[
#table(
  columns: 2,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Private Address],
    text(fill: white, weight: "bold")[Public Address],
  ),
  [10.10.20.50:3233],   [94.1.1.1:1055],
  [10.10.20.70:5782],   [94.1.1.1:1056],
)
]


  Port numbers increment for each new session — same public IP, different port.

]

]

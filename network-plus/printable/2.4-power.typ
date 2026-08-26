#import "template.typ": *

#start-note("2.4 — Power", "2.0 Network Implementation", "2.4")

#columns(2, gutter: 5mm)[



#section-heading("Electrical Safety")


- Never put yourself in contact with any voltage
- Always disconnect from power source before working on a device
- Some devices store charge in capacitors (CRT monitors, laser printers) — can shock even when disconnected
- Never connect any part of your body to a ground wire or anything that might be energized

#section-heading("Electrical Terms")


#block(breakable: false)[
#table(
  columns: 4,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Term],
    text(fill: white, weight: "bold")[Abbreviation],
    text(fill: white, weight: "bold")[Description],
    text(fill: white, weight: "bold")[Hose Analogy],
  ),
  [Ampere],   [A (amp)],   [Rate of electrons moving past a point per second],   [Hose diameter],
  [Voltage],   [V (volt)],   [Pressure of electricity flowing through a wire],   [Water pressure],
  [Watt],   [W],   [Power being used — calculated as volts × amps],   [Total water flow],
)
]


- Example: 120V × 0.5A = 60W

#section-heading("AC (Alternating Current)")


- Current changes direction as it moves through wire (represented by wavy line)
- Easy to distribute over long distances — used for homes and offices
- US/Canada: 110–120V at 60 Hz
- Europe: 220–240V at 50 Hz

#section-heading("DC (Direct Current)")


- Current moves in a single direction with constant voltage
- Symbol: solid line on top with dashed lines below
- Electrical components use DC to operate
- Power supplies in devices (or in the power cord) convert AC to DC

#section-heading("UPS (Uninterruptible Power Supply)")


- Connected to power source with internal batteries for backup
- Protects against:
  - Power outages
  - Brownouts (voltage drops)
  - Surges (voltage spikes)

#sub-heading("UPS Types")

#block(breakable: false)[
#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Type],
    text(fill: white, weight: "bold")[Description],
  ),
  [Offline/Standby],   [Activates after power loss; small gap may reboot devices],
  [Line-Interactive],   [Compensates for brownouts by increasing power when voltage drops],
  [Online/Double-Conversion],   [Always runs from battery; losing power has no effect on systems],
)
]


#sub-heading("UPS Features")

- Automatic shutdown when batteries are low
- Varying battery capacities
- Different numbers of outlets
- Additional interfaces for phone lines or cable modem connections

#section-heading("PDU (Power Distribution Unit)")


- Looks like a surge suppressor but is an intelligent device
- Rack-mountable
- Allows remote connection and management of each interface
- Can power off/on devices from a remote location
- Has an ethernet connection with an IP address and built-in web server

]

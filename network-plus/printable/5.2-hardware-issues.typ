#import "template.typ": *

#start-note("5.2 — Hardware Issues", "5.0 Network Troubleshooting", "5.2")

#columns(2, gutter: 5mm)[



#section-heading("Power over Ethernet (PoE)")


- Provides power over the same wire used for data
- Simplifies installation — no separate power cable needed
- Common devices: telephones, access points, cameras

#sub-heading("PoE Power Sources")

- *Endspan* — power built into the switch itself (PoE switch)
- *Midspan* — separate device (injector) between the switch and PoE device that injects power onto the wires

#sub-heading("PoE Standards")

#table(
  columns: 4,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Standard],
    text(fill: white, weight: "bold")[DC Power Output],
    text(fill: white, weight: "bold")[Maximum Current],
    text(fill: white, weight: "bold")[Typical Devices],
  ),
  [PoE],   [15.4 watts],   [350 mA],   [Simple telephones, small access points],
  [PoE+],   [25.5 watts],   [600 mA],   [Larger telephones, cameras],
  [PoE++ Type 3],   [51 watts],   [600 mA],   [Laptops, PTZ cameras],
  [PoE++ Type 4],   [71.3 watts],   [960 mA],   [Laptops, PTZ cameras],
)


- PoE++ supports additional Ethernet standards: 2.5-gigabit, 5-gigabit, and 10-gigabit

#sub-heading("PoE Compatibility")

- Switch and device must use compatible PoE standards
- A PoE+ switch cannot power a PoE++ device
- Some switches have all interfaces PoE-capable; others have a mix of PoE, PoE+, and PoE++ ports
- Switches have a maximum total PoE power budget (e.g., 200W or 720W)
- Must add up all connected devices' maximum power draw and ensure it is under the switch's capacity

#section-heading("Transceiver Mismatches")


- Transceivers provide modular connections for Ethernet devices
- Fiber transceivers must match the type of fiber being connected
- Wavelength marked on the transceiver (e.g., 850 nm or 1310 nm)
- All wavelengths must match throughout the entire link
- Mismatched transceivers cause signal loss, increasing error counters, loss of signal, or network slowdown
- Transceivers look nearly identical — wavelength markings are very small
- Once plugged into a switch, markings are no longer visible — may need to check switch specifications or physically remove the transceiver to read the label

#section-heading("Transceiver Signal Strength (Power Budget)")


- Each device has a *sensitivity level* — minimum signal it can receive and still interpret properly
- Important for long runs with many connections in the middle

#sub-heading("Power Budget Calculation")

+ Determine transmitted power (measured in dBm — decibels per milliwatt)
+ Calculate signal loss from:
   - Media distance (fiber length)
   - Connectors and splices (each reduces signal)
+ Subtract total signal loss from transmitted power = received power
+ Compare received power to receiver sensitivity value

#sub-heading("Interpreting Results")

- Sensitivity values are negative (signal decreases through media)
- If received power ≥ sensitivity value → good signal
- If received power < sensitivity value → insufficient signal
- Example: transceiver with receiver sensitivity of -17 dBm
  - Received power of -17 dBm or higher (e.g., -14 dBm) → good
  - Received power of -20 dBm → not enough signal

]

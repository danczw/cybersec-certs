#import "../notes-style.typ": *

#start-note("5.2 — Cable Issues", "5.0 Network Troubleshooting", "5.2")

#columns(2, gutter: 5mm)[



#section-heading("Fiber Optic Mismatches")


- Multimode fiber — light uses multiple paths (modes) through the fiber
- Single mode fiber — light uses a single path through the fiber
- Fiber core sizes:
  - Multimode: 50 micron or 62.5 micron (cladding brings total to 125 micron)
  - Single mode: ~9 micron (cladding brings total to 125 micron)
- All three types feel identical in hand (125 micron total diameter)
- Mixing fiber types causes signal errors and communication failure
- Fiber often color-coded, but cannot always rely on color
- Check writing on the outside of the fiber for type/size documentation

#section-heading("Copper Cable Categories")


- Cable construction standardized by TIA (Telecommunications Industry Association)
- TIA sets manufacturing standards and tests for qualification
- Cables qualify as a specific category after testing
- Different categories support different signal types/speeds
- IEEE ethernet standards specify minimum cable category:

#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Ethernet Standard],
    text(fill: white, weight: "bold")[Cable Category],
    text(fill: white, weight: "bold")[Maximum Supported Distance],
  ),
  [1000BASE-T],   [Category 5],   [100 meters],
  [1000BASE-T],   [Category 5e (enhanced)],   [100 meters],
  [10GBASE-T],   [Category 6],   [Unshielded: 55m / Shielded: 100m],
  [10GBASE-T],   [Category 6A (augmented)],   [100 meters],
  [10GBASE-T],   [Category 7 (shielded only)],   [100 meters],
  [40GBASE-T],   [Category 8 (shielded only)],   [30 meters],
)
]


#section-heading("Bandwidth vs. Throughput")


- *Bandwidth*
  - theoretical maximum data rate over a link (bits per second)
  - the size of the pipe
- *Throughput*
  - actual amount of data transferred in a time frame (bits/sec or bytes/sec)
  - how much water is flowing through the pipe
- May need to convert between bits and bytes when comparing

#section-heading("Distance Limitations")


- Every cable standard has a maximum distance while maintaining signal quality
- Part of the IEEE standard specification
- Example: 1000BASE-T = Cat 5, 100 meters max

#section-heading("Cable Testing")


- Use a cable tester to validate installed cables
- Tests similar to TIA category qualification tests
- Tester reports which category the installed cable matches
- Wrong category = errors on the link = slowdown
- Physical errors often caused by signal attenuation or complete signal loss
- CRC errors indicate physical layer problems

#section-heading("UTP vs. STP")


- *UTP (Unshielded Twisted Pair)*
  - four pairs of wires, no shield, each pair twisted
- *STP (Shielded Twisted Pair)*
  - shield around entire cable and/or individual pairs
  - Includes grounding wire for the shield
  - More resistant to electrical interference
  - Must peel back shielding to terminate into RJ45 or punchdown block

#section-heading("Crosstalk (XT)")


- Signal from one pair leaking into another pair of wires
- Types of crosstalk measurements:
  - *NEXT (Near-End Crosstalk)* — measured at the end closest to the testing device; usually strongest signal point
  - *FEXT (Far-End Crosstalk)* — measured at the far end of the cable
  - *Alien crosstalk* — interference from other nearby cables
  - *ACR (Attenuation to Crosstalk Ratio)* — compares signal (insertion) loss vs. near-end crosstalk; effectively a signal-to-noise ratio
- Signal-to-noise ratio:
  - 10:1 = signal is 10x stronger than noise (good)
  - 1:1 = signal equals noise (bad)
- Reducing crosstalk:
  - Reconnect/re-terminate the cable
  - Maintain as many twists as possible (untwist minimally for termination)
  - Cat 6A uses larger cable with spacer between pairs
  - Test cables to verify category compliance

#section-heading("EMI (Electromagnetic Interference)")


- Affects both UTP and STP cables
- Maintain shield integrity on STP — any break allows EMI in
- Respect minimum bend radius (check cable documentation)
- Never use staples on network cables
- Limit plastic cable ties; use Velcro instead to avoid crimping wires
- Avoid running near:
  - Power cords
  - Fluorescent lights
  - Electrical systems/generators
  - Fire prevention components
- Test cable signal-to-noise ratio if EMI is suspected

#section-heading("Attenuation")


- Loss of signal strength over distance
- Occurs in both copper and fiber optic connections
- Same concept as wireless signal weakening with distance from antenna
- Reason for distance limitations in IEEE standards

#section-heading("Cable Termination Issues")


- Connectors look similar but may have different specifications
- Quality varies between installers
- Use someone well-versed in network cable installation standards
- Pin-to-pin matching: pin 1 to pin 1, pin 2 to pin 2, etc.
- Mismatched pins can cause:
  - Speed drops (e.g., expecting 1 Gbps but only getting 100 Mbps)
  - Complete signal loss (e.g., pin 1 connected to pin 2 and vice versa)
- *Crossed pairs* — pin 1 connects to pin 3, pin 3 to pin 1 (half the wires crossed, half straight)
  - Can occur at RJ45 crimp or punchdown block
  - Check every connection along the path
  - Cable tester easily identifies crossed pairs
- *Auto-MDIX* — ethernet chipset detects cable cross and reverses it electronically
  - Not always enabled or supported on every chipset
  - Best practice: properly terminate cables rather than relying on Auto-MDIX

]

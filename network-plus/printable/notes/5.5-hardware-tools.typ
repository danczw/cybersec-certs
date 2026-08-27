#import "../template.typ": *

#start-note("5.5 — Hardware Tools", "5.0 Network Troubleshooting", "5.5")

#columns(2, gutter: 5mm)[



#section-heading("Tone Generator and Inductive Probe")


- Used to find a single cable in a large bunch of cables
- Tone generator puts an analog tone on the wire
- Inductive probe listens for the tone — only needs to get close to the cable (does not require direct contact)
- Tone generator connects via: modular jack, coax connection, punchdown block, or alligator clips
- Use the probe to move across cables until the tone is identified
- Many tone generator/probe combos also double as a cable tester

#section-heading("Cable Tester")


- Checks continuity from one end of a cable to the other
- Verifies pin-to-pin connections (pin 1 to pin 1, pin 2 to pin 2, etc.)
- Identifies:
  - Pins that are not connected
  - Shorts in the cable
  - Crossed wires (e.g., pin 1 connects to pin 3)
- Simple continuity test only — does not show signal capacity or cable category
- Verifies proper punchdown or correct connectors on both ends
- Lights up pins 1 through 8 in order if wired correctly

#section-heading("Network Taps")


- Intercepts network traffic and sends a copy to a protocol analyzer or packet capture device
- Physical tap: physically breaks the connection and inserts the tap in the middle
  - May require downtime to install
  - *Passive tap* — not powered; often used for optical fiber
  - *Active tap* — requires additional power to regenerate the signal
- Tap has in/out connections for the network link and separate monitor ports for the analyzer

#section-heading("Port Mirroring / SPAN")


- SPAN (Switched Port Analyzer) — a function within the switch itself
- Tells the switch to copy data from any interface and send it to a different interface where a protocol analyzer is connected
- No physical break in the connection needed
- Limitation: limited bandwidth available
  - Example: tapping a link with 2 Gbps total (1 Gbps each direction) but mirror port only has 1 Gbps to the analyzer
- For very large bandwidth uses, a physical tap may be preferred over port mirroring

#section-heading("Wireless Survey Tools")


- Gather details about what is going over the air
- Provide information about signal coverage
- Identify potential interference (especially from other access points)
- May be built into the OS or access point, or a third-party tool

#section-heading("Wi-Fi Analyzer")


- Provides detailed wireless information; may require specialized hardware
- Sees all 802.11 information going through the air
- Shows: channel strengths, channels in use, access points in the area, potential sources of interference
- Advanced versions include a *spectrum analyzer*:
  - Shows an entire range of frequencies
  - Displays every signal broadcast on those frequencies (802.11 or other sources)
  - Can verify interference from third-party equipment or microwave ovens
- Signal-to-noise ratio visible in analyzer output — narrow ratio indicates weak signal relative to noise; wide separation indicates strong signal

#section-heading("Visual Fault Locator")


- A light source specifically designed for optical fiber (like a flashlight for fiber)
- Used to identify breaks in fiber optics
- Light leaks out from around a break, making it visible
- May need to turn off room lights to see clearly
- Can locate faults before installing a fiber patch into the network
- Low-tech but very effective at finding fiber problems

]

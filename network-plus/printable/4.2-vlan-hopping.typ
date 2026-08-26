#import "template.typ": *

#start-note("4.2 — VLAN Hopping", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- VLANs separate different parts of a network (e.g., marketing, accounting, shipping/receiving; or home: normal traffic, IoT, cameras)
- Devices on one VLAN cannot communicate with another VLAN without a router
- VLAN hopping bypasses this restriction without a router
- Two methods: switch spoofing and double tagging

#section-heading("Switch Spoofing")


- Exploits switch autoconfiguration (trunk negotiation)
- Switch automatically determines if connected device is another switch
- If detected as a switch, it configures a trunk connection between interfaces
- Attacker pretends to be a switch → gains trunk access → can send traffic to any VLAN on that port

#callout("Supplementary")[
  A *trunk* is a switch port configured to carry traffic for multiple VLANs simultaneously between switches using 802.1Q tags. Contrast with an *access port*, which carries traffic for a single VLAN and connects to end devices.
]


#sub-heading("Mitigation")

- Disable trunk autonegotiation
- Manually configure trunk interfaces
- Configure which specific VLANs are allowed to pass between switches

#section-heading("Double Tagging")


- Exploits the native VLAN configuration on switches
- Attacker crafts a frame with two 802.1Q VLAN tags
- One-way attack only — no response can be received (useful for DoS)

#sub-heading("Double Tagging Diagram")

```
Attacker      Switch 1        Trunk         Switch 2      Victim
(VLAN 10)        |      (VLANs 10 & 20)        |       (VLAN 20)
    |            |       Native VLAN: 10        |            |
    |            |                              |            |
    |-- Frame -->|                              |            |
    |            |                              |            |
    | +--------+--------+--------+------+       |            |
    | |Eth Hdr |802.1Q: |802.1Q: | Data |       |            |
    | |        |VLAN 10 |VLAN 20 |      |       |            |
    | +--------+--------+--------+------+       |            |
    |            |                              |            |
    |            |-- Strips VLAN 10 tag, ------>|            |
    |            |   forwards on native VLAN    |            |
    |            |                              |            |
    |            | +--------+--------+------+   |            |
    |            | |Eth Hdr |802.1Q: | Data |   |            |
    |            | |        |VLAN 20 |      |   |            |
    |            | +--------+--------+------+   |            |
    |            |                              |            |
    |            |                              |-- Deliver->|
    |            |                              |  to VLAN 20|
```

#sub-heading("How Double Tagging Works")

+ Attacker (on VLAN 10) creates a frame with two tags: outer tag = VLAN 10, inner tag = VLAN 20
+ First switch reads the outer VLAN 10 tag, removes it, forwards frame onto VLAN 10 (native VLAN on the trunk)
+ Frame arrives at second switch with only the VLAN 20 tag remaining
+ Second switch interprets it as a trunked frame for VLAN 20, removes the tag, delivers to victim on VLAN 20

#sub-heading("Requirements for Double Tagging")

- Attacker must be on the same VLAN as the trunk's native VLAN
- Native VLAN is typically VLAN 1 by default

#sub-heading("Mitigation")

- Don't place users on the native VLAN
- Change the native VLAN ID from the default (VLAN 1) to another value
- Force tagging of the native VLAN for all trunk traffic

]

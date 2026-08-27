// ─── Network+ Complete Printable Notes ───
#import "notes-style.typ": *

#set page(paper: "a4", margin: (x: 10mm, top: 12mm, bottom: 16mm),
  footer: context {
    if counter(page).get().first() > 1 [
      #line(length: 100%, stroke: 0.3pt + luma(220))
      #v(1mm)
      #text(size: 7pt, fill: luma(150))[#note-title.get()]
      #h(1fr)
      #text(size: 7pt, fill: luma(150))[professormesser.com]
      #h(1fr)
      #text(size: 9pt, fill: luma(120))[#counter(page).display()]
    ]
  },
)
#set text(font: "Inter", size: 9pt, weight: "medium", fill: rgb("#3d3d3d"))
#set par(leading: 0.75em)
#set list(spacing: 1.2em)
#set enum(spacing: 1.2em)

// ─── Cover Page ───
#align(center + horizon)[
  #block(
    width: 80%,
    inset: 10mm,
    radius: 4mm,
    fill: gradient.linear(rgb("#667eea"), rgb("#764ba2"), angle: 135deg),
  )[
    #align(center)[
      #text(size: 28pt, weight: "bold", fill: white)[CompTIA Network+]
      #v(3mm)
      #text(size: 16pt, fill: white.transparentize(10%))[N10-009]
      #v(8mm)
      #text(size: 14pt, fill: white.transparentize(20%))[Study Notes]
    ]
  ]
  #v(10mm)
  #text(size: 10pt, fill: luma(120))[Based on Professor Messer video series]
  #v(3mm)
  #text(size: 9pt, fill: luma(150))[professormesser.com]
]

#include "generated/1.1-osi-model.typ"
#include "generated/1.2-networking-devices.typ"
#include "generated/1.2-networking-functions.typ"
#include "generated/1.3-cloud-models.typ"
#include "generated/1.3-designing-the-cloud.typ"
#include "generated/1.4-common-ports.typ"
#include "generated/1.4-introduction-to-ip.typ"
#include "generated/1.4-network-communication.typ"
#include "generated/1.4-other-protocols.typ"
#include "generated/1.5-copper-cabling.typ"
#include "generated/1.5-copper-connectors.typ"
#include "generated/1.5-ethernet-standards.typ"
#include "generated/1.5-fiber-connectors.typ"
#include "generated/1.5-network-transceivers.typ"
#include "generated/1.5-optical-fiber.typ"
#include "generated/1.5-wireless-networking.typ"
#include "generated/1.6-network-architectures.typ"
#include "generated/1.6-network-topologies.typ"
#include "generated/1.7-binary-math.typ"
#include "generated/1.7-calculating-ipv4-subnets-and-hosts.typ"
#include "generated/1.7-classful-subnetting.typ"
#include "generated/1.7-ipv4-addressing.typ"
#include "generated/1.7-ipv4-subnet-masks.typ"
#include "generated/1.7-magic-number-subnetting.typ"
#include "generated/1.7-seven-second-subnetting.typ"
#include "generated/2.1-dynamic-routing.typ"
#include "generated/2.1-network-address-translation.typ"
#include "generated/2.1-routing-technologies.typ"
#include "generated/2.1-static-routing.typ"
#include "generated/2.2-interface-configurations.typ"
#include "generated/2.2-spanning-tree-protocol.typ"
#include "generated/2.2-vlans-and-trunking.typ"
#include "generated/2.3-network-types.typ"
#include "generated/2.3-wireless-encryption.typ"
#include "generated/2.3-wireless-networking.typ"
#include "generated/2.3-wireless-technologies.typ"
#include "generated/2.4-environmental-factors.typ"
#include "generated/2.4-installing-networks.typ"
#include "generated/2.4-power.typ"
#include "generated/3.1-configuration-management.typ"
#include "generated/3.1-life-cycle-management.typ"
#include "generated/3.1-network-documentation.typ"
#include "generated/3.2-logs-and-monitoring.typ"
#include "generated/3.2-network-solutions.typ"
#include "generated/3.2-snmp.typ"
#include "generated/3.3-disaster-recovery.typ"
#include "generated/3.3-network-redundancy.typ"
#include "generated/3.4-configuring-dhcp.typ"
#include "generated/3.4-dhcp.typ"
#include "generated/3.4-dns-records.typ"
#include "generated/3.4-ipv6-and-slaac.typ"
#include "generated/3.4-overview-of-dns.typ"
#include "generated/3.4-time-protocols.typ"
#include "generated/3.5-remote-access.typ"
#include "generated/3.5-vpns.typ"
#include "generated/4.1-authentication.typ"
#include "generated/4.1-regulatory-compliance.typ"
#include "generated/4.1-security-concepts.typ"
#include "generated/4.1-security-technologies.typ"
#include "generated/4.1-segmentation-enforcement.typ"
#include "generated/4.2-arp-dns-poisoning.typ"
#include "generated/4.2-denial-of-service.typ"
#include "generated/4.2-mac-flooding.typ"
#include "generated/4.2-malware.typ"
#include "generated/4.2-rogue-services.typ"
#include "generated/4.2-social-engineering.typ"
#include "generated/4.2-vlan-hopping.typ"
#include "generated/4.3-device-security.typ"
#include "generated/4.3-security-rules.typ"
#include "generated/5.1-network-troubleshooting-methodology.typ"
#include "generated/5.2-cable-issues.typ"
#include "generated/5.2-hardware-issues.typ"
#include "generated/5.2-interface-issues.typ"
#include "generated/5.3-routing-and-ip-issues.typ"
#include "generated/5.3-switching-issues.typ"
#include "generated/5.4-performance-issues.typ"
#include "generated/5.4-wireless-issues.typ"
#include "generated/5.5-basic-network-device-commands.typ"
#include "generated/5.5-command-line-tools.typ"
#include "generated/5.5-hardware-tools.typ"
#include "generated/5.5-software-tools.typ"

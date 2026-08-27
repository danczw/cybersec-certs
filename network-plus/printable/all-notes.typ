// ─── Network+ Complete Printable Notes ───
#import "template.typ": *

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

#include "notes/1.1-osi-model.typ"
#include "notes/1.2-networking-devices.typ"
#include "notes/1.2-networking-functions.typ"
#include "notes/1.3-cloud-models.typ"
#include "notes/1.3-designing-the-cloud.typ"
#include "notes/1.4-common-ports.typ"
#include "notes/1.4-introduction-to-ip.typ"
#include "notes/1.4-network-communication.typ"
#include "notes/1.4-other-protocols.typ"
#include "notes/1.5-copper-cabling.typ"
#include "notes/1.5-copper-connectors.typ"
#include "notes/1.5-ethernet-standards.typ"
#include "notes/1.5-fiber-connectors.typ"
#include "notes/1.5-network-transceivers.typ"
#include "notes/1.5-optical-fiber.typ"
#include "notes/1.5-wireless-networking.typ"
#include "notes/1.6-network-architectures.typ"
#include "notes/1.6-network-topologies.typ"
#include "notes/1.7-binary-math.typ"
#include "notes/1.7-calculating-ipv4-subnets-and-hosts.typ"
#include "notes/1.7-classful-subnetting.typ"
#include "notes/1.7-ipv4-addressing.typ"
#include "notes/1.7-ipv4-subnet-masks.typ"
#include "notes/1.7-magic-number-subnetting.typ"
#include "notes/1.7-seven-second-subnetting.typ"
#include "notes/2.1-dynamic-routing.typ"
#include "notes/2.1-network-address-translation.typ"
#include "notes/2.1-routing-technologies.typ"
#include "notes/2.1-static-routing.typ"
#include "notes/2.2-interface-configurations.typ"
#include "notes/2.2-spanning-tree-protocol.typ"
#include "notes/2.2-vlans-and-trunking.typ"
#include "notes/2.3-network-types.typ"
#include "notes/2.3-wireless-encryption.typ"
#include "notes/2.3-wireless-networking.typ"
#include "notes/2.3-wireless-technologies.typ"
#include "notes/2.4-environmental-factors.typ"
#include "notes/2.4-installing-networks.typ"
#include "notes/2.4-power.typ"
#include "notes/3.1-configuration-management.typ"
#include "notes/3.1-life-cycle-management.typ"
#include "notes/3.1-network-documentation.typ"
#include "notes/3.2-logs-and-monitoring.typ"
#include "notes/3.2-network-solutions.typ"
#include "notes/3.2-snmp.typ"
#include "notes/3.3-disaster-recovery.typ"
#include "notes/3.3-network-redundancy.typ"
#include "notes/3.4-configuring-dhcp.typ"
#include "notes/3.4-dhcp.typ"
#include "notes/3.4-dns-records.typ"
#include "notes/3.4-ipv6-and-slaac.typ"
#include "notes/3.4-overview-of-dns.typ"
#include "notes/3.4-time-protocols.typ"
#include "notes/3.5-remote-access.typ"
#include "notes/3.5-vpns.typ"
#include "notes/4.1-authentication.typ"
#include "notes/4.1-regulatory-compliance.typ"
#include "notes/4.1-security-concepts.typ"
#include "notes/4.1-security-technologies.typ"
#include "notes/4.1-segmentation-enforcement.typ"
#include "notes/4.2-arp-dns-poisoning.typ"
#include "notes/4.2-denial-of-service.typ"
#include "notes/4.2-mac-flooding.typ"
#include "notes/4.2-malware.typ"
#include "notes/4.2-rogue-services.typ"
#include "notes/4.2-social-engineering.typ"
#include "notes/4.2-vlan-hopping.typ"
#include "notes/4.3-device-security.typ"
#include "notes/4.3-security-rules.typ"
#include "notes/5.1-network-troubleshooting-methodology.typ"
#include "notes/5.2-cable-issues.typ"
#include "notes/5.2-hardware-issues.typ"
#include "notes/5.2-interface-issues.typ"
#include "notes/5.3-routing-and-ip-issues.typ"
#include "notes/5.3-switching-issues.typ"
#include "notes/5.4-performance-issues.typ"
#include "notes/5.4-wireless-issues.typ"
#include "notes/5.5-basic-network-device-commands.typ"
#include "notes/5.5-command-line-tools.typ"
#include "notes/5.5-hardware-tools.typ"
#include "notes/5.5-software-tools.typ"

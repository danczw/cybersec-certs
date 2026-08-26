// ─── Network+ Complete Printable Notes ───
#import "template.typ": *

#set page(paper: "a4", margin: (x: 14mm, top: 12mm, bottom: 16mm),
  footer: context {
    if counter(page).get().first() > 1 [
      #line(length: 100%, stroke: 0.3pt + luma(220))
      #v(1mm)
      #text(size: 7pt, fill: luma(150))[Source: www.professormesser.com]
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
]

#include "1.1-osi-model.typ"
#include "1.2-networking-devices.typ"
#include "1.2-networking-functions.typ"
#include "1.3-cloud-models.typ"
#include "1.3-designing-the-cloud.typ"
#include "1.4-common-ports.typ"
#include "1.4-introduction-to-ip.typ"
#include "1.4-network-communication.typ"
#include "1.4-other-protocols.typ"
#include "1.5-copper-cabling.typ"
#include "1.5-copper-connectors.typ"
#include "1.5-ethernet-standards.typ"
#include "1.5-fiber-connectors.typ"
#include "1.5-network-transceivers.typ"
#include "1.5-optical-fiber.typ"
#include "1.5-wireless-networking.typ"
#include "1.6-network-architectures.typ"
#include "1.6-network-topologies.typ"
#include "1.7-binary-math.typ"
#include "1.7-calculating-ipv4-subnets-and-hosts.typ"
#include "1.7-classful-subnetting.typ"
#include "1.7-ipv4-addressing.typ"
#include "1.7-ipv4-subnet-masks.typ"
#include "1.7-magic-number-subnetting.typ"
#include "1.7-seven-second-subnetting.typ"
#include "2.1-dynamic-routing.typ"
#include "2.1-network-address-translation.typ"
#include "2.1-routing-technologies.typ"
#include "2.1-static-routing.typ"
#include "2.2-interface-configurations.typ"
#include "2.2-spanning-tree-protocol.typ"
#include "2.2-vlans-and-trunking.typ"
#include "2.3-network-types.typ"
#include "2.3-wireless-encryption.typ"
#include "2.3-wireless-networking.typ"
#include "2.3-wireless-technologies.typ"
#include "2.4-environmental-factors.typ"
#include "2.4-installing-networks.typ"
#include "2.4-power.typ"
#include "3.1-configuration-management.typ"
#include "3.1-life-cycle-management.typ"
#include "3.1-network-documentation.typ"
#include "3.2-logs-and-monitoring.typ"
#include "3.2-network-solutions.typ"
#include "3.2-snmp.typ"
#include "3.3-disaster-recovery.typ"
#include "3.3-network-redundancy.typ"
#include "3.4-configuring-dhcp.typ"
#include "3.4-dhcp.typ"
#include "3.4-dns-records.typ"
#include "3.4-ipv6-and-slaac.typ"
#include "3.4-overview-of-dns.typ"
#include "3.4-time-protocols.typ"
#include "3.5-remote-access.typ"
#include "3.5-vpns.typ"
#include "4.1-authentication.typ"
#include "4.1-regulatory-compliance.typ"
#include "4.1-security-concepts.typ"
#include "4.1-security-technologies.typ"
#include "4.1-segmentation-enforcement.typ"
#include "4.2-arp-dns-poisoning.typ"
#include "4.2-denial-of-service.typ"
#include "4.2-mac-flooding.typ"
#include "4.2-malware.typ"
#include "4.2-rogue-services.typ"
#include "4.2-social-engineering.typ"
#include "4.2-vlan-hopping.typ"
#include "4.3-device-security.typ"
#include "4.3-security-rules.typ"
#include "5.1-network-troubleshooting-methodology.typ"
#include "5.2-cable-issues.typ"
#include "5.2-hardware-issues.typ"
#include "5.2-interface-issues.typ"
#include "5.3-routing-and-ip-issues.typ"
#include "5.3-switching-issues.typ"
#include "5.4-performance-issues.typ"
#include "5.4-wireless-issues.typ"
#include "5.5-basic-network-device-commands.typ"
#include "5.5-command-line-tools.typ"
#include "5.5-hardware-tools.typ"
#include "5.5-software-tools.typ"

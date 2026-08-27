#import "../notes-style.typ": *

#start-note("4.2 — Rogue Services", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("Rogue DHCP Server")


- No security built into the DHCP protocol
- Any device can respond to DHCP requests — legitimate or not
- Damage: duplicate IP addresses, invalid IPs, loss of internet connectivity, network shutdown

#sub-heading("Mitigation")

- *DHCP snooping* — enterprise switch feature that examines all DHCP requests and only allows responses from legitimate servers
- *Active Directory authorization* — Microsoft AD determines which DHCP servers are authorized to hand out IPs
- If found: remove rogue server from network, then renew all IP addresses to ensure everyone has a legitimate IP

#section-heading("Rogue Access Points")


- Access points are inexpensive and can be plugged into any ethernet connection
- May not be malicious — employee trying to expand wireless coverage
- Creates security issues: without proper security, anyone can access the network
- Can also be created via OS wireless sharing feature (turns a computer into an access point)

#sub-heading("Detection")

- Periodic network scans
- Physically walk the facility with a wireless analyzer

#sub-heading("Mitigation")

- *802.1X (Network Access Control)* — requires authentication before granting network access
- Even if a rogue AP is plugged in, users can't access the network without proper authentication

#section-heading("Wireless Evil Twin")


- Malicious rogue access point designed to look exactly like legitimate APs at a location
- Combines phishing techniques with wireless networking technology
- Characteristics:
  - Same or very similar SSID (wireless network name)
  - Similar security settings
  - May duplicate captive portal configuration
  - Increased radio output power to overpower legitimate APs — becomes primary AP for the area

#sub-heading("Mitigation")

- Always use encrypted traffic (VPN or HTTPS)
- Even if connected to an evil twin, encrypted data can't be read

#section-heading("On-Path Attacks (Man in the Middle)")


- Attacker sits in the middle of a conversation between two devices
- Receives information, examines it, possibly changes it, then forwards it
- Source and destination have no idea the attacker is in the middle or that data was changed

#sub-heading("Types of On-Path Attacks")

- Wireless evil twin
- ARP poisoning
- Session hijacking
- HTTPS spoofing
- Wi-Fi eavesdropping

#sub-heading("General Mitigation")

- Encrypt all data — even if attacker is in the middle, they cannot read the information

]

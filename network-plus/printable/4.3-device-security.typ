#import "template.typ": *

#start-note("4.3 — Device Security", "4.0 Network Security", "4.3")

#columns(2, gutter: 5mm)[



#section-heading("Disabling Unused Ports (Network Services)")


- Every network-based service has an open port number visible to others on the network
- Open ports are entry points into services running on the system
- If a service is no longer in use: close it and ensure the port is not externally accessible
- Port range: 0–65,535
- Use a firewall to control which devices can connect to open ports
- Use tools like Nmap to scan for open ports and decide which to keep or close

#section-heading("Changing Default Credentials")


- Switches, routers, firewalls, and other devices ship with standard default credentials
- Many devices don't force you to change them
- Default credentials often provide full administrative access
- Leaving defaults allows anyone who knows them complete control of the system
- Database of default credentials available at routerpasswords.com

#section-heading("Port Security (Switch Feature)")


- Prevents unauthorized devices from connecting to a switch interface
- Based on MAC address of connected devices
- Configuration options:
  - Set how many MAC addresses are allowed per interface
  - Specify exact MAC addresses allowed on an interface
  - Switch monitors and records MAC addresses of connected devices
- If unexpected device connects: port security activates
- Default action on many switches: immediately disable the interface and notify the network administrator

#section-heading("Disabling Unused Switch Interfaces")


- Best practice: disable interfaces until someone needs them
- Requires additional administration (tracking enabled/disabled state)
- Makes the network much more secure

#section-heading("Network Access Control (NAC) / 802.1X")


- Requires authentication before any device can communicate on the network
- Applies to wired and wireless connections
- User must provide username and password before gaining network access

#section-heading("MAC Address Filtering")


- Limits network access based on hardware (MAC) address of devices
- Useful for keeping unauthorized devices off the network
- Challenge: MAC addresses can be administratively changed (software configuration)
- Attacker can capture packets, find valid MACs, wait for one to leave, then spoof it
- Categorized as *security through obscurity* — knowing the method makes it easy to circumvent

#section-heading("Key Management")


- Third-party software to manage authentication details, certificates, encryption keys, SSH keys
- Capabilities from a single console:
  - Create keys for specific services or cloud providers
  - Associate keys with specific users or services
  - Track expiration dates
  - Renew or revoke keys
  - Monitor key usage and access
- Manages: SSL certificates, SSH keys, license details, certificate authorities
- Generates reports: SSH reports, landing server reports, private key reports

]

#import "../template.typ": *

#start-note("3.5 — Virtual Private Networks", "3.0 Network Operations", "3.5")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


- Encrypts data that would normally be sent in the clear across public networks (e.g., the internet)
- Allows secure communication over untrusted networks

#section-heading("VPN Concentrator")


- Encrypts and decrypts VPN traffic
- Usually built into modern firewalls
- Can be dedicated hardware designed for encryption/decryption or software installed on an existing server

#section-heading("Client-to-Site VPN")


- VPN client software installed on the user's workstation
- Client communicates back to a VPN concentrator at the corporate network
- Example: laptop at a coffee shop connecting securely to corporate
- Can be manually enabled/disabled or configured as always-on
- Flow:
  - Client encrypts → sends over internet → concentrator decrypts → forwards to internal network
  - Return traffic: corporate network → concentrator encrypts → sends over internet → client decrypts

#section-heading("Site-to-Site VPN")


- Encrypts all communication between two sites over a VPN tunnel
- Commonly configured as always-on
- Built into existing firewalls at each location — VPN concentrator function enabled on both sides
- Users at remote sites are unaware encryption is occurring

#section-heading("Clientless VPN")


- No separate VPN client software required
- Runs inside a browser using HTML5
- Uses the Web Cryptography API to provide encrypted tunnel within the browser
- Only requirement: an HTML5-compliant browser
- User visits the appropriate web page and the API provides VPN functionality

#section-heading("Full Tunnel vs. Split Tunnel")


#sub-heading("Full Tunnel")

- All traffic from the client traverses the VPN tunnel
- No special forwarding decisions — everything goes through the VPN
- Third-party traffic (e.g., external websites) also goes through concentrator, gets decrypted, then redirected to the internet
- Return traffic from external sites goes back through the concentrator and VPN tunnel

#sub-heading("Split Tunnel")

- Some traffic goes through the VPN tunnel (corporate-bound)
- Other traffic (non-corporate) is sent directly to the internet without traversing the VPN
- Client workstation has two paths:
  1. VPN tunnel → concentrator → corporate network
  2. Direct internet → third-party websites
- VPN client recognizes destination and routes accordingly
- More efficient for third-party website communication while maintaining secure corporate access

]

#import "../template.typ": *

#start-note("3.5 — Remote Access", "3.0 Network Operations", "3.5")

#columns(2, gutter: 5mm)[



#section-heading("SSH (Secure Shell)")


- Provides encrypted terminal/console access to remote devices (switches, routers, firewalls)
- All traffic encrypted — username, password, and all other data protected from capture
- Uses TCP port 22
- Replaces Telnet (TCP port 23) which provides same console-based view but no encryption
- Best practice: always use SSH, never use Telnet

#section-heading("Remote Desktop")


#sub-heading("RDP (Remote Desktop Protocol)")

- Microsoft protocol for graphical remote control of Windows machines
- Access and use the desktop as if sitting in front of the monitor and keyboard
- Clients available for nearly any operating system

#sub-heading("VNC (Virtual Network Computing)")

- Uses RFB (Remote Frame Buffer) protocol
- Similar function to RDP but runs on many different operating systems
- Common choice for help desk/support teams needing to remotely control desktops

#section-heading("API (Application Programming Interface)")


- Used to make changes to hundreds or thousands of devices
- Connects and controls devices using the language the device expects
- Allows automation with error handling capabilities
- More control than command-line scripts/batch files when problems occur

#section-heading("Console Connection")


- Direct physical connection to the device via a separate console port
- Serial connection types: RJ45 serial, DB9 serial, or USB
- Text-based interface requiring knowledge of the device's CLI
- Works even when network connectivity is lost (cannot ping or SSH)
- Requires a laptop/desktop with a serial port or USB-to-serial adapter

#section-heading("Jump Server")


- Single device you connect to first, then jump to other devices within the organization
- External connection via VPN tunnel or SSH
- Externally facing — must be highly hardened:
  - Multi-factor authentication required
  - Always kept up to date with security patches
  - High level of authentication to prevent brute force attacks
- Eliminates need to set up separate connections to each individual device

#callout("Supplementary")[
  The "band" refers to the network itself. In-band = managing a device over the same network it carries traffic on. Out-of-band = a separate, dedicated connection (serial/USB/modem) independent of that network.
]


#section-heading("In-Band Management")


- Connect to a device over the existing network using an IP address
- Device is assigned a management IP address, subnet mask, and networking details
- Access via SSH or web-based front end (internal web server)
- Management interface can be a separate interface or built into existing interfaces
- Example: switch with a dedicated 10/100/1000 management interface port

#section-heading("Out-of-Band Management")


- Uses a serial interface that does not use the existing network
- Separate management/console interface via serial or USB connection
- Can connect a modem to the console/COM port for dial-in access via phone line
- Works even when the network is down
- COM server: dial into one server, then jump to other devices through that connection

]

#import "template.typ": *

#start-note("3.1 — Life Cycle Management", "3.0 Network Operations", "3.1")

#columns(2, gutter: 5mm)[



#section-heading("End of Life (EOL)")


- Manufacturer no longer supports a product
- May continue providing security patches and updates
- No new software versions or feature enhancements
- Triggers planning and budgeting for replacement over time

#section-heading("End of Support (EOS)")


- No patches, updates, new features, or anything from the manufacturer
- Significant security concern — no future security updates ever
- More urgent than EOL

#section-heading("Patches and Bug Fixes")


- Important for maintaining uptime, availability, and stability
- Also close security holes
- Many organizations provide monthly updates on a recurring schedule
- Allows planning deployment around known time frames
- Occasional out-of-schedule updates for zero-day or significant security events

#section-heading("Operating System Updates")


- Constant updates across Windows, Linux, iOS, Android, etc.
- Include bug fixes and security patches
- Also internal configuration changes:
  - User account modifications
  - Minimum password length increases
  - Password complexity changes
  - Access method modifications
  - Built-in firewall configuration changes (limit by IP/URL)
  - Anti-malware/antivirus updates

#section-heading("Firmware Updates")


- Software running on purpose-built appliances/hardware (printers, cable modems, etc.)
- Devices have their own embedded operating system — no direct OS access
- Updates close security holes
- May be done over the network or require physical connection
- Best practice: save firmware binaries for rollback if new version has problems
- Challenge: hardware manufacturers may not maintain firmware promptly
  - Example: Trane Comfortlink II thermostat — vulnerabilities reported April 2014, final fix January 2016

#section-heading("Decommissioning")


- Process of disposing of an asset no longer needed
- Applies to desktops, laptops, mobile devices, and other outdated equipment
- Must sanitize media or destroy the device to protect data
- May involve legal issues — certain data cannot be destroyed
- May need to store equipment securely until proper disposal is possible
- Never dispose of in normal trash — someone will access the data
- Recycling must protect confidentiality of data on devices

#section-heading("Change Management")


- Managed process for tracking, monitoring, and modifying changes
- Covers: software upgrades, firewall configurations, router tables, other modifications
- Clearly defined process includes:
  - How often changes can be made
  - Window for making changes
  - Process for installing changes
  - Process for rolling back if problems occur
- Everyone must understand and follow the centralized change management process

#section-heading("Service Requests / Help Desk")


- Help desk receives phone calls and inputs tickets into a process tracking system
- Tickets are triaged and assigned to someone who can resolve the problem
- Ticket is closed after resolution, then move to next
- Almost every organization has a process tracking system

]

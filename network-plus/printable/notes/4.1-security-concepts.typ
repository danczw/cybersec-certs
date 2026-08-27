#import "../template.typ": *

#start-note("4.1 — Security Concepts", "4.0 Network Security", "4.1")

#columns(2, gutter: 5mm)[



#section-heading("States of Data")


#sub-heading("Data in Transit (Data in-Motion)")

- Information transferred over a wired or wireless network
- Network infrastructure (switches, routers) designed to forward traffic, not protect it
- Security provided by other devices: firewalls, intrusion prevention systems
  - Monitor traffic, decide to forward or block, inspect for malicious content
- Encryption for data in transit: TLS (Transport Layer Security) and IPsec (Internet Protocol Security)

#sub-heading("Data at Rest")

- Information saved to a hard drive, SSD, or any other storage device
- Encryption types:
  - Full disk encryption (entire disk)
  - Database encryption (single part or entire database)
  - File/folder encryption (individual files or folders)
- Security policies applied via ACLs (Access Control Lists)
  - Determine which users have access or no access to data
  - System administrator or data owner controls permissions
  - Usually part of the operating system

#section-heading("PKI (Public Key Infrastructure)")


- Policies and control of all encryption keys and certificates
- Not a small undertaking — significant work to create, with ongoing changes and updates
- Organizations often begin PKI when adding encryption keys to web servers or signing certificates
- Becomes a requirement for maintaining and managing all security assets organization-wide

#section-heading("Digital Certificates and Trust")


#sub-heading("Digital Certificates")

- Assign a level of trust to a user or device
- Binds a public key with a digital signature and details about the key holder (name, organization, etc.)
- Digitally signed by a central Certificate Authority (CA) to add trust

#sub-heading("Web of Trust")

- Distributed form of trust (alternative to centralized CA)
- If A trusts B and B trusts C, then A can also trust C

#sub-heading("Certificate Authority (CA)")

- Centralized authority that all certificates start from
- Anything signed by the CA can be trusted anywhere in the organization
- CA digitally signs certificates — anyone can examine who signed and determine trust
- Options:
  - Internal CA: organization builds and self-signs its own certificates
  - Third-party CA: independent authority (useful for internet-facing trust)
- Certificate process built into Windows Domain services; third-party options available for other OS

#section-heading("IAM (Identity and Access Management)")


- Process of managing permissions and access to data
- Components:
  - Access control: ensure users only access information needed for their job
  - Authentication: verify the user is who they claim to be
  - Authorization: grant appropriate permissions once authenticated
  - Auditing: track and monitor who accessed data and when

#sub-heading("Least Privilege")

- Users only have rights and permissions necessary for their job function — no additional access
- Reason administrator access is not assigned to every system
- Limits access to applications and data per job function

#sub-heading("Role-Based Access Control (RBAC)")

- Separate individuals into roles (e.g., shipping/receiving staff, manager, vice president)
- Administrator determines role definitions and associated permissions
- Users assigned to appropriate roles
- In Windows: implemented through groups — one group per role, users assigned to groups

#section-heading("Geographic Restrictions")


#sub-heading("Methods to Determine Location")

- IP address (not always accurate)
- GPS (Global Positioning System)
- Wireless network name / access point location

#sub-heading("Geofencing")

- Allows or disallows access to information based on physical location
- Example: sensitive data only viewable from within corporate headquarters building
- VPN users may get different permissions based on connection location

#section-heading("Physical Security")


#sub-heading("CCTV (Closed Circuit Television)")

- Cameras deployed around buildings/campus
- Modern features: motion detection, license plate reading, facial recognition
- All cameras networked to central storage for long-term retention
- Administrator can review any feed at any historical time frame

#sub-heading("Door Locks")

- Conventional lock: physical key, may include deadbolt
- Electronic reader: personal identification code (PIN)
- Token-based: RFID badge with electronic reader
- Biometric: hand print, fingerprint, retina scan
- Multi-factor: combining methods (e.g., badge + PIN)

]

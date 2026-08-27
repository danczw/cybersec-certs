#import "../template.typ": *

#start-note("1.4 — Common Ports", "1.0 Networking Concepts", "1.4")

#columns(2, gutter: 5mm)[



#section-heading("FTP (File Transfer Protocol)")


- Generic file transfer, cross-platform
- *TCP 20* — data transfer (active mode)
- *TCP 21* — control/commands
- Supports authentication (username/password)
- File operations: transfer, list, add, delete, rename

#section-heading("SSH (Secure Shell) — TCP 22")


- Encrypted text-based remote terminal access
- All communication sent in encrypted form
- *SFTP (Secure FTP)* also uses TCP 22
  - File transfer encrypted via SSH protocol
  - Same file management capabilities as FTP
  - SSH is the underlying protocol for both remote terminal and secure file transfer

#section-heading("Telnet — TCP 23")


- Telecommunication Network
- Non-encrypted remote terminal (looks like SSH)
- All data sent in the clear — including login credentials
- Rarely used today; replaced by SSH

#section-heading("SMTP (Simple Mail Transfer Protocol)")


- *TCP 25* — server-to-server email transfer, plain text
- *TCP 587* — SMTP with TLS encryption
- Sending email and server-to-server transfer
- Receiving/managing inbox uses IMAP or POP3

#section-heading("DNS (Domain Name System)")


- Translates FQDNs to IP addresses
- *UDP 53* — standard name queries
- *TCP 53* — large transfers
  (zone transfers, oversized responses)
- Critical — without it, no name resolution

#section-heading("DHCP (Dynamic Host Configuration Protocol)")


- Automatic IP address configuration for network devices
- *UDP 67* — DHCP server
- *UDP 68* — DHCP client
- Pool of IP addresses assigned to connecting devices
- *Lease time* — IP address assigned temporarily; must renew at expiration
- *DHCP reservation* — permanently assigns IP to a specific MAC address
- Home: integrated into wireless router; enterprise: standalone servers

#section-heading("TFTP (Trivial File Transfer Protocol) — UDP 69")


- Simple, fast file transfers with no authentication
- No directory listing or file management — just transfer
- Use case: VoIP phone boots via PoE → DHCP for IP → TFTP for config file
- Minimal overhead, very efficient

#section-heading("HTTP / HTTPS")


- Hypertext Transfer Protocol
- *TCP 80* — HTTP, unencrypted web traffic
- *TCP 443* — HTTPS, encrypted via SSL/TLS
- Browser-based communication
- Most modern sites default to HTTPS (TCP 443)

#section-heading("NTP (Network Time Protocol) — UDP 123")


- Synchronizes clocks across all network devices (OS, routers, switches)
- Critical for correlating log files across diverse devices
- ~1ms accuracy between devices on same network
- Syncs multiple times per day automatically
- Configurable interval (hourly, daily, etc.)

#section-heading("SNMP (Simple Network Management Protocol)")


- *UDP 161* — queries (management station → device)
- *UDP 162* — traps (device → management station, proactive alerts called SNMP traps)
- Used to monitor device performance, traffic, and status
- *Version 1* — single query/response, no encryption
- *Version 2* — bulk transfers, still no encryption
- *Version 3* — message integrity, authentication, and encryption

#section-heading("LDAP (Lightweight Directory Access Protocol)")


- *TCP 389* — LDAP
- *TCP 636* — LDAP Secure (LDAPS)
- Database of network devices and users
- Hierarchical structure: Organization → Organizational Units (OUs) → Common Names (CNs)
- Easy to query and retrieve stored information

#section-heading("SMB (Server Message Block) — TCP 445")


- Also called CIFS (Common Internet File System)
- Microsoft file/printer sharing and authentication
- Built into Windows (File Explorer), no extra software
- File shares, remote printing, file locking, permissions
- Older versions used NetBIOS; modern versions use TCP 445 directly

#section-heading("Syslog — UDP 514")


- Standardized protocol for transferring logs to central location
- Used with SIEM
- Consolidates logs from routers/switches/firewalls/servers

#section-heading("MS-SQL (Microsoft SQL Server) — TCP 1433")


- Microsoft's structured query language database server
- SQL provides standard language for querying/retrieving database data
- Other SQL databases use different port numbers

#section-heading("RDP (Remote Desktop Protocol) — TCP 3389")


- View and control remote Windows desktops
- Clients available for Windows, macOS, Linux, iOS, Android

#section-heading("SIP (Session Initiation Protocol)")


- *TCP 5060* — unencrypted
- *TCP 5061* — encrypted
- VoIP control protocol: initiates calls, disconnects sessions
- Also: video conferencing, IM, file transfers

#section-heading("Quick Reference")


#block(breakable: false)[
#table(
  columns: 3,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Protocol],
    text(fill: white, weight: "bold")[Port(s)],
    text(fill: white, weight: "bold")[Transport],
  ),
  [FTP],   [20, 21],   [TCP],
  [SSH/SFTP],   [22],   [TCP],
  [Telnet],   [23],   [TCP],
  [SMTP],   [25, 587],   [TCP],
  [DNS],   [53],   [UDP/TCP],
  [DHCP],   [67, 68],   [UDP],
  [TFTP],   [69],   [UDP],
  [HTTP],   [80],   [TCP],
  [HTTPS],   [443],   [TCP],
  [NTP],   [123],   [UDP],
  [SNMP],   [161, 162],   [UDP],
  [LDAP],   [389, 636],   [TCP],
  [SMB],   [445],   [TCP],
  [Syslog],   [514],   [UDP],
  [MS-SQL],   [1433],   [TCP],
  [RDP],   [3389],   [TCP],
  [SIP],   [5060, 5061],   [TCP],
)
]


]

#import "../template.typ": *

#start-note("3.4 — Time Protocols", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("NTP (Network Time Protocol)")


- Synchronizes clocks across all network devices (laptops, desktops, switches, routers, firewalls)
- Critical for comparing log files and timestamps from multiple devices
- Automatic process — devices update their clocks on a configurable schedule (daily, hourly, etc.)
- Accuracy: devices typically differ by only milliseconds

#sub-heading("NTP Server")

- Listens on UDP port 123
- Responds to time requests from NTP clients
- Does not modify its own time — uses a separate NTP client to query a different NTP server for updates
- Organizations can use external NTP servers or run their own internal NTP servers

#sub-heading("NTP Client")

- Software that queries the NTP server to obtain time updates
- A single device can run both an NTP client and NTP server simultaneously

#section-heading("NTP Security Concerns")


- By default, NTP sends information in the clear (unencrypted)
- Time is an important security concern:
  - Kerberos authentication fails if client and server timestamps differ by more than 5 minutes
  - An attacker providing wrong time could cause a denial of service

#section-heading("NTS (Network Time Security)")


- Adds authentication to NTP so responses can be trusted
- Requires an NTS Key Exchange (NTS-KE) server on the network
- Two-step process:
  1. Client performs TLS handshake with NTS-KE server and receives a cookie
  2. Client includes the cookie in the NTP request to the NTP server to prove authentication
- NTP server responds with a trusted timestamp

```
NTS-KE Server  ════════════════════════════════════════
                  ↑            ↑           ↓
             TLS Handshake   Request    Response
                  |            |       (with cookies)
Client         ════════════════════════════════════════
                                          ↓           ↑
                                     NTP Request   NTP Response
                                     (with cookie)
NTP Server     ════════════════════════════════════════
```

#section-heading("PTP (Precision Time Protocol)")


- Hardware-based time synchronization with nanosecond granularity
- Much more precise than NTP (which achieves ~10 milliseconds on local servers)
- Used in industrial environments requiring very precise timestamps
- Requires separate dedicated hardware:
  - Has its own operating system
  - Runs without delays from third-party processes
  - Provides the most accurate timestamps possible

]

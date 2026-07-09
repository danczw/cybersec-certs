# Ports and Protocols Flashcards

**Q:** What port does FTP use for data transfer?
**A:** Port 20 (TCP)
**Difficulty:** Easy
**Tags:** ports, ftp, domain-1

---

**Q:** What port does FTP use for control/commands?
**A:** Port 21 (TCP)
**Difficulty:** Easy
**Tags:** ports, ftp, domain-1

---

**Q:** What port does SSH use?
**A:** Port 22 (TCP)
**Difficulty:** Easy
**Tags:** ports, ssh, domain-1

---

**Q:** What port does Telnet use, and why should it be avoided?
**A:** Port 23 (TCP). Transmits data in plaintext including credentials — use SSH instead.
**Difficulty:** Easy
**Tags:** ports, telnet, security, domain-1

---

**Q:** What port does SMTP use?
**A:** Port 25 (TCP) — sending email
**Difficulty:** Easy
**Tags:** ports, smtp, email, domain-1

---

**Q:** What port does DNS use, and what transport protocols?
**A:** Port 53, uses both TCP and UDP. UDP for standard queries, TCP for zone transfers and large responses.
**Difficulty:** Medium
**Tags:** ports, dns, domain-1

---

**Q:** What ports does DHCP use?
**A:** Port 67 (server) and 68 (client), both UDP
**Difficulty:** Medium
**Tags:** ports, dhcp, domain-1

---

**Q:** What port does TFTP use, and how does it differ from FTP?
**A:** Port 69 (UDP). No authentication, no directory listing, no encryption — used for simple transfers like firmware updates and PXE boot.
**Difficulty:** Medium
**Tags:** ports, tftp, domain-1

---

**Q:** What port does HTTP use?
**A:** Port 80 (TCP)
**Difficulty:** Easy
**Tags:** ports, http, domain-1

---

**Q:** What port does POP3 use?
**A:** Port 110 (TCP) — downloads email from server
**Difficulty:** Easy
**Tags:** ports, pop3, email, domain-1

---

**Q:** What port does NTP use?
**A:** Port 123 (UDP) — time synchronization
**Difficulty:** Medium
**Tags:** ports, ntp, domain-1

---

**Q:** What port does SNMP use for queries vs traps?
**A:** Port 161 (queries/polling) and 162 (traps/alerts), both UDP
**Difficulty:** Medium
**Tags:** ports, snmp, monitoring, domain-1

---

**Q:** What port does LDAP use?
**A:** Port 389 (TCP) — directory services
**Difficulty:** Medium
**Tags:** ports, ldap, domain-1

---

**Q:** What port does HTTPS use?
**A:** Port 443 (TCP)
**Difficulty:** Easy
**Tags:** ports, https, domain-1

---

**Q:** What port does SMB/CIFS use?
**A:** Port 445 (TCP) — Windows file/printer sharing
**Difficulty:** Medium
**Tags:** ports, smb, domain-1

---

**Q:** What port does Syslog use?
**A:** Port 514 (UDP) — centralized log collection
**Difficulty:** Medium
**Tags:** ports, syslog, monitoring, domain-1

---

**Q:** What port does RDP use?
**A:** Port 3389 (TCP)
**Difficulty:** Easy
**Tags:** ports, rdp, domain-1

---

**Q:** What are the three IANA port ranges?
**A:** Well-known (0-1023), Registered (1024-49151), Dynamic/Ephemeral (49152-65535)
**Difficulty:** Medium
**Tags:** ports, fundamentals, domain-1

---

**Q:** What is a socket (in networking)?
**A:** The combination of IP address + protocol (TCP or UDP) + port number
**Difficulty:** Medium
**Tags:** fundamentals, domain-1

---

**Q:** Name three key differences between TCP and UDP.
**A:** TCP: connection-oriented, reliable delivery, flow control. UDP: connectionless, best-effort, no flow control. TCP is slower due to overhead; UDP is faster.
**Difficulty:** Medium
**Tags:** tcp, udp, transport, domain-1

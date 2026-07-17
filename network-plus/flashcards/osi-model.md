# OSI Model Flashcards

**Q:** What does OSI stand for?
**A:** Open Systems Interconnection Reference Model
**Difficulty:** Easy
**Tags:** osi, fundamentals, domain-1, prof-messer

---

**Q:** Name the 7 OSI layers from bottom to top.
**A:** Physical, Data Link, Network, Transport, Session, Presentation, Application (Layers 1-7)
**Difficulty:** Easy
**Tags:** osi, fundamentals, domain-1, prof-messer

---

**Q:** Is the OSI model a protocol suite?
**A:** No. It's a conceptual framework. Most protocols today are TCP/IP-based, but the OSI model can describe them all.
**Difficulty:** Easy
**Tags:** osi, fundamentals, domain-1, prof-messer

---

**Q:** What does MAC stand for in MAC address?
**A:** Media Access Control
**Difficulty:** Easy
**Tags:** osi, mac, domain-1, prof-messer

---

**Q:** What is another name for a MAC address?
**A:** Data Link Control (DLC) address, or Extended Unique Identifier (EUI-48 / EUI-64)
**Difficulty:** Medium
**Tags:** osi, mac, domain-1, prof-messer

---

**Q:** At which OSI layer do switches operate?
**A:** Layer 2 (Data Link) — they use MAC addresses to forward frames
**Difficulty:** Easy
**Tags:** osi, switches, domain-1, prof-messer

---

**Q:** At which OSI layer do routers operate?
**A:** Layer 3 (Network) — they use IP addresses to route packets
**Difficulty:** Easy
**Tags:** osi, routers, domain-1, prof-messer

---

**Q:** Which OSI layer handles fragmentation and reassembly of packets?
**A:** Layer 3 (Network) — splits frames into smaller pieces for transit across networks with smaller MTU, reassembles at destination
**Difficulty:** Medium
**Tags:** osi, fragmentation, domain-1, prof-messer

---

**Q:** What two protocols operate at OSI Layer 4?
**A:** TCP (Transmission Control Protocol) and UDP (User Datagram Protocol)
**Difficulty:** Easy
**Tags:** osi, transport, domain-1, prof-messer

---

**Q:** Why is Layer 4 sometimes called the "post office layer"?
**A:** It's responsible for getting data reliably from source to destination — like delivering a letter
**Difficulty:** Easy
**Tags:** osi, transport, domain-1, prof-messer

---

**Q:** What does the Session layer (L5) manage?
**A:** Communication management between endpoints — initiation, stopping, and restarting of sessions. Also handles control protocols and tunneling.
**Difficulty:** Medium
**Tags:** osi, session, domain-1, prof-messer

---

**Q:** What does the Presentation layer (L6) handle?
**A:** Character encoding, application encryption/decryption (SSL/TLS), and formatting data for human consumption
**Difficulty:** Medium
**Tags:** osi, presentation, domain-1, prof-messer

---

**Q:** Which OSI layer handles encryption/decryption (SSL/TLS)?
**A:** Layer 6 (Presentation)
**Difficulty:** Medium
**Tags:** osi, encryption, domain-1, prof-messer

---

**Q:** Name 3 protocols at OSI Layer 7.
**A:** HTTP, HTTPS, FTP, DNS, SMTP, POP3 (any 3)
**Difficulty:** Easy
**Tags:** osi, protocols, domain-1, prof-messer

---

**Q:** What type of troubleshooting is done at Layer 1?
**A:** Loopback tests, cable/fiber testing, checking adapter cards, verifying signal can traverse the physical medium
**Difficulty:** Medium
**Tags:** osi, troubleshooting, domain-1, prof-messer

---

**Q:** If you see a TCP/UDP port number in a packet capture, which OSI layer are you looking at?
**A:** Layer 4 (Transport)
**Difficulty:** Easy
**Tags:** osi, transport, domain-1, prof-messer

---

**Q:** In a Wireshark decode, which OSI layer does the "Ethernet II" line with source/destination MAC correspond to?
**A:** Layer 2 (Data Link)
**Difficulty:** Easy
**Tags:** osi, wireshark, domain-1, prof-messer

---

**Q:** In a Wireshark decode, where does SSL/TLS fit in the OSI model?
**A:** It encapsulates Layers 5, 6, and 7 — session management, encryption/decryption, and application data
**Difficulty:** Hard
**Tags:** osi, wireshark, ssl, domain-1, prof-messer

---

**Q:** A user reports they cannot reach a website. The IP address pings fine but HTTPS fails. Which OSI layers are likely involved?
**A:** Layers 5-7 (Session/Presentation/Application) — physical connectivity works (L1-3), transport likely works (L4 if ping succeeds), issue is likely SSL/TLS or application layer
**Difficulty:** Hard
**Tags:** osi, troubleshooting, domain-1, prof-messer

---

**Q:** A switch cannot forward traffic to a device. Which OSI layer is the problem at?
**A:** Layer 2 (Data Link) — switches forward based on destination MAC address
**Difficulty:** Easy
**Tags:** osi, switches, domain-1, prof-messer

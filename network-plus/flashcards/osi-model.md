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
**A:** Layer 3 (Network) — splits packets into smaller pieces for transit across networks with smaller MTU, reassembles at destination
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
**A:** Character encoding, application encryption/decryption (SSL/TLS), and data format translation between systems (e.g., EBCDIC to ASCII, compression, media formats)
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
**A:** Layers 4-7 — ping (ICMP) only proves L1-3 work. Issue could be TCP connection (L4), SSL/TLS handshake (L5-6), or application layer (L7)
**Difficulty:** Hard
**Tags:** osi, troubleshooting, domain-1, prof-messer

---

**Q:** A switch cannot forward traffic to a device. Which OSI layer is the problem at?
**A:** Layer 2 (Data Link) — switches forward based on destination MAC address
**Difficulty:** Easy
**Tags:** osi, switches, domain-1, prof-messer

---

**Q:** What is the data unit at Layer 2 called?
**A:** Frame — consists of a packet wrapped with a MAC header and trailer (error checking)
**Difficulty:** Easy
**Tags:** osi, data-units, domain-1, prof-messer

---

**Q:** What is the data unit at Layer 3 called?
**A:** Packet
**Difficulty:** Easy
**Tags:** osi, data-units, domain-1, prof-messer

---

**Q:** What is the data unit at Layer 4 called for TCP? For UDP?
**A:** TCP = segments, UDP = datagrams
**Difficulty:** Medium
**Tags:** osi, data-units, transport, domain-1, prof-messer

---

**Q:** What does MTU stand for, and what layer is it relevant to?
**A:** Maximum Transmission Unit — relevant at Layer 3 (Network). Packets too large for the next network's MTU are fragmented.
**Difficulty:** Medium
**Tags:** osi, fragmentation, mtu, domain-1, prof-messer

---

**Q:** What is fragmentation in the context of Layer 3?
**A:** Splitting packets that exceed the next network's MTU into smaller pieces, then reassembling them at the destination
**Difficulty:** Medium
**Tags:** osi, fragmentation, domain-1, prof-messer

---

**Q:** What is the difference between segmentation (L4) and fragmentation (L3)?
**A:** Segmentation (L4) breaks application data into segments/datagrams for transport. Fragmentation (L3) splits packets too large for the next network's MTU.
**Difficulty:** Hard
**Tags:** osi, fragmentation, transport, domain-1, prof-messer

---

**Q:** What is an EUI-48?
**A:** Extended Unique Identifier (48-bit) — the standard MAC address burned into a network interface card (e.g., 00:1A:2B:3C:4D:5E)
**Difficulty:** Medium
**Tags:** osi, mac, eui, domain-1, prof-messer

---

**Q:** How is EUI-64 derived from EUI-48?
**A:** Split EUI-48 in half, insert FF:FE in the middle, and flip the 7th bit (U/L bit) to create a 64-bit identifier used by IPv6
**Difficulty:** Hard
**Tags:** osi, mac, eui, ipv6, domain-1, prof-messer

---

**Q:** What is the difference between TCP and UDP?
**A:** TCP is connection-oriented with guaranteed ordered delivery (slower). UDP is connectionless with best-effort delivery (faster).
**Difficulty:** Easy
**Tags:** osi, transport, tcp, udp, domain-1, prof-messer

---

**Q:** Give two use cases for TCP and two for UDP.
**A:** TCP: web browsing, email. UDP: video streaming, DNS.
**Difficulty:** Medium
**Tags:** osi, transport, tcp, udp, domain-1, prof-messer

---

**Q:** What does Layer 5 (Session) manage?
**A:** Communication management between endpoints — initiation, stopping, restarting of sessions. Also handles control protocols and tunneling.
**Difficulty:** Medium
**Tags:** osi, session, domain-1, prof-messer

---

**Q:** What is tunneling at Layer 5?
**A:** Encapsulating one protocol inside another to create a virtual point-to-point link (e.g., PPTP wraps traffic for VPN transport)
**Difficulty:** Medium
**Tags:** osi, session, tunneling, domain-1, prof-messer

---

**Q:** What is the difference between SSL and TLS?
**A:** SSL (Secure Sockets Layer) is the older protocol; TLS (Transport Layer Security) is the modern successor. TLS is the current standard, but "SSL" is still used colloquially.
**Difficulty:** Easy
**Tags:** osi, encryption, ssl, tls, domain-1, prof-messer

---

**Q:** Which OSI layers does SSL/TLS span?
**A:** Layers 5–7 — session management (L5), encryption/decryption (L6), and application data encapsulation (L7)
**Difficulty:** Hard
**Tags:** osi, encryption, ssl, tls, domain-1, prof-messer

---

**Q:** In a Wireshark decode, what does the "Internet Protocol" line correspond to?
**A:** Layer 3 (Network) — shows source and destination IP addresses
**Difficulty:** Easy
**Tags:** osi, wireshark, domain-1, prof-messer

---

**Q:** In a Wireshark decode, what does the "TCP" line with port numbers correspond to?
**A:** Layer 4 (Transport) — shows source and destination port numbers
**Difficulty:** Easy
**Tags:** osi, wireshark, transport, domain-1, prof-messer

---

**Q:** A user can ping an IP address but cannot load the website over HTTPS. What OSI layers should you troubleshoot?
**A:** Layers 5–7 — ping proves L1–3 work. The issue is likely SSL/TLS (L6) or application layer (L7).
**Difficulty:** Hard
**Tags:** osi, troubleshooting, domain-1, prof-messer

---

**Q:** What troubleshooting is done at Layer 1 (Physical)?
**A:** Loopback tests, cable/fiber testing, checking adapter cards, verifying signal traverses the physical medium
**Difficulty:** Medium
**Tags:** osi, troubleshooting, physical, domain-1, prof-messer

---

**Q:** What does DLC stand for in the context of Layer 2?
**A:** Data Link Control — another name for the MAC address / Layer 2 address
**Difficulty:** Medium
**Tags:** osi, mac, domain-1, prof-messer

---

**Q:** A device has a MAC address issue. Which OSI layer is the problem at?
**A:** Layer 2 (Data Link) — MAC addresses operate at this layer
**Difficulty:** Easy
**Tags:** osi, mac, troubleshooting, domain-1, prof-messer

---

**Q:** You see destination port 443 in a packet capture. What layer and what protocol?
**A:** Layer 4 (Transport), typically TCP. Port 443 is HTTPS.
**Difficulty:** Medium
**Tags:** osi, transport, wireshark, domain-1, prof-messer

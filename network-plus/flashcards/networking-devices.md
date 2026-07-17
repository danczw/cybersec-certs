# Networking Devices Flashcards

**Q:** At which OSI layer does a router operate?
**A:** Layer 3 (Network) — uses IP addresses to determine next hop
**Difficulty:** Easy
**Tags:** router, devices, domain-1, prof-messer

---

**Q:** What is a layer 3 switch?
**A:** A switch with routing functionality built in — combines a layer 2 switch and layer 3 router in one device
**Difficulty:** Easy
**Tags:** switch, router, devices, domain-1, prof-messer

---

**Q:** What does ASIC stand for, and where is it used?
**A:** Application-Specific Integrated Circuit — the hardware inside switches that enables high-speed forwarding
**Difficulty:** Medium
**Tags:** switch, devices, domain-1, prof-messer

---

**Q:** At which OSI layer does a switch operate?
**A:** Layer 2 (Data Link) — forwards traffic based on MAC addresses
**Difficulty:** Easy
**Tags:** switch, devices, domain-1, prof-messer

---

**Q:** What is PoE?
**A:** Power over Ethernet — delivers electrical power on the same wires as the ethernet data connection
**Difficulty:** Easy
**Tags:** switch, poe, devices, domain-1, prof-messer

---

**Q:** What is the difference between a traditional firewall and an NGFW?
**A:** Traditional firewalls filter by TCP/UDP port number; NGFWs (Next-Generation Firewalls) identify and control specific applications traversing the network
**Difficulty:** Medium
**Tags:** firewall, ngfw, devices, domain-1, prof-messer

---

**Q:** Name four additional capabilities commonly found in firewalls.
**A:** VPN, layer 3 routing, NAT (Network Address Translation), dynamic routing protocols
**Difficulty:** Medium
**Tags:** firewall, devices, domain-1, prof-messer

---

**Q:** What is the difference between IDS and IPS?
**A:** IDS (Intrusion Detection System) alerts on attacks; IPS (Intrusion Prevention System) alerts AND blocks attacks
**Difficulty:** Easy
**Tags:** ids, ips, devices, domain-1, prof-messer

---

**Q:** Why is IPS preferred over IDS in enterprise networks?
**A:** IDS can only alert — it cannot block malicious traffic. IPS can actively prevent attacks from reaching the network.
**Difficulty:** Easy
**Tags:** ids, ips, devices, domain-1, prof-messer

---

**Q:** Name three types of attacks that IDS/IPS can detect.
**A:** Buffer overflows, cross-site scripting (XSS), OS/application exploits targeting known vulnerabilities (any 3)
**Difficulty:** Medium
**Tags:** ids, ips, devices, domain-1, prof-messer

---

**Q:** What does a load balancer do?
**A:** Distributes incoming traffic across multiple physical servers to maintain uptime and availability
**Difficulty:** Easy
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** How does a load balancer handle server failures?
**A:** Detects the failure, removes the server from rotation, continues serving traffic with remaining healthy servers
**Difficulty:** Medium
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** What is SSL offloading on a load balancer?
**A:** The load balancer handles encryption/decryption instead of the backend servers, reducing server workload
**Difficulty:** Medium
**Tags:** load-balancer, ssl, devices, domain-1, prof-messer

---

**Q:** Name four optimization features of a load balancer.
**A:** TCP offload, SSL offload, caching, QoS (Quality of Service) prioritization
**Difficulty:** Hard
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** What is the purpose of a proxy server?
**A:** Sits between user and internet — makes requests on user's behalf, inspects responses for malicious content, then forwards to user
**Difficulty:** Easy
**Tags:** proxy, devices, domain-1, prof-messer

---

**Q:** What is the difference between an explicit proxy and a transparent proxy?
**A:** Explicit proxy requires OS/application configuration to use; transparent proxy works invisibly with no client changes
**Difficulty:** Medium
**Tags:** proxy, devices, domain-1, prof-messer

---

**Q:** What is the difference between NAS and SAN storage access?
**A:** NAS provides file-level access (transfer entire file to read/modify); SAN provides block-level access (read/write only changed blocks)
**Difficulty:** Medium
**Tags:** nas, san, storage, devices, domain-1, prof-messer

---

**Q:** Why is a SAN more efficient than a NAS for large files?
**A:** Block-level access means only modified blocks are written, not the entire file
**Difficulty:** Medium
**Tags:** nas, san, storage, devices, domain-1, prof-messer

---

**Q:** At which OSI layer does a wireless access point operate?
**A:** Layer 2 (Data Link) — bridges 802.11 wireless and 802.3 ethernet networks
**Difficulty:** Easy
**Tags:** wireless, ap, devices, domain-1, prof-messer

---

**Q:** How does an enterprise access point differ from a home wireless router?
**A:** An enterprise AP is purpose-built for wireless only; a home router combines router + AP + switch in one device
**Difficulty:** Easy
**Tags:** wireless, ap, devices, domain-1, prof-messer

---

**Q:** What is a wireless LAN controller?
**A:** A centralized management device for all access points — deploy configs, monitor, push changes, and enable seamless roaming from one location
**Difficulty:** Medium
**Tags:** wireless, wlc, devices, domain-1, prof-messer

---

**Q:** Are wireless LAN controllers typically vendor-agnostic?
**A:** No — they are typically proprietary and must match the AP manufacturer
**Difficulty:** Easy
**Tags:** wireless, wlc, devices, domain-1, prof-messer

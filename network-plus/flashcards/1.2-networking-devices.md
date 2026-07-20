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

---

**Q:** What does a router connect in terms of network types?
**A:** Diverse network types — LAN to WAN, copper to fiber. May have many different interfaces for different connection types.
**Difficulty:** Easy
**Tags:** router, devices, domain-1, prof-messer

---

**Q:** Where does a firewall typically sit in the network?
**A:** At the ingress/egress point — managing communication between inside (LAN) and outside (internet)
**Difficulty:** Easy
**Tags:** firewall, devices, domain-1, prof-messer

---

**Q:** What is NAT?
**A:** Network Address Translation — translates private internal IP addresses to public addresses (and vice versa) as traffic crosses the firewall
**Difficulty:** Easy
**Tags:** firewall, nat, devices, domain-1, prof-messer

---

**Q:** Where is IDS/IPS functionality commonly integrated in modern networks?
**A:** Inside next-generation firewalls (NGFWs)
**Difficulty:** Easy
**Tags:** ids, ips, ngfw, devices, domain-1, prof-messer

---

**Q:** What is application-centric load balancing?
**A:** Routing specific pages or application paths to specific servers (e.g., /api goes to backend pool, /images goes to media pool)
**Difficulty:** Hard
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** Why is a load balancer transparent to end users?
**A:** It appears as a single server — users don't know their requests are being distributed across multiple physical servers
**Difficulty:** Easy
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** What is TCP offloading on a load balancer?
**A:** The load balancer manages TCP connections (handshakes, acknowledgements, retransmissions) on behalf of backend servers, freeing their CPU for application work
**Difficulty:** Medium
**Tags:** load-balancer, tcp, devices, domain-1, prof-messer

---

**Q:** What is caching on a load balancer?
**A:** Answering requests immediately from stored responses without hitting backend servers
**Difficulty:** Easy
**Tags:** load-balancer, devices, domain-1, prof-messer

---

**Q:** Name three features of a proxy server.
**A:** Caching (returns stored responses), access control (require authentication), URL filtering and content scanning
**Difficulty:** Medium
**Tags:** proxy, devices, domain-1, prof-messer

---

**Q:** How does a proxy server protect users?
**A:** It receives responses from the internet, verifies no malicious content, then forwards the safe response to the user
**Difficulty:** Easy
**Tags:** proxy, devices, domain-1, prof-messer

---

**Q:** What is the difference between file-level and block-level storage access?
**A:** File-level (NAS): must transfer entire file to read/modify. Block-level (SAN): read/write only the changed blocks, like a local drive.
**Difficulty:** Medium
**Tags:** nas, san, storage, devices, domain-1, prof-messer

---

**Q:** What type of network are NAS and SAN commonly placed on?
**A:** Commonly on an isolated high-bandwidth network
**Difficulty:** Medium
**Tags:** nas, san, storage, devices, domain-1, prof-messer

---

**Q:** What does an access point bridge?
**A:** 802.11 (wireless) and 802.3 (wired ethernet) networks at Layer 2
**Difficulty:** Easy
**Tags:** wireless, ap, devices, domain-1, prof-messer

---

**Q:** Name four capabilities of a wireless LAN controller.
**A:** Deploy new APs with full configuration, performance/security monitoring, push config changes to all APs simultaneously, usage reporting and capacity planning
**Difficulty:** Hard
**Tags:** wireless, wlc, devices, domain-1, prof-messer

---

**Q:** How does a WLC enable seamless roaming?
**A:** Centralized management means all APs share configuration and session state, so clients can move between APs without dropping connection
**Difficulty:** Medium
**Tags:** wireless, wlc, devices, domain-1, prof-messer

---

**Q:** What is the typical data flow order from a wireless client to a remote server (all devices inline)?
**A:** Host → Access Point → Switch → Proxy → Router → Firewall/NGFW → WAN → Firewall/NGFW → Router → Load Balancer → Switch → Server
**Difficulty:** Hard
**Tags:** devices, data-flow, domain-1, prof-messer

---

**Q:** Why does a proxy sit on the client side and a load balancer on the server side?
**A:** Proxy filters/caches outbound requests from clients. Load balancer distributes inbound requests across servers.
**Difficulty:** Medium
**Tags:** proxy, load-balancer, data-flow, devices, domain-1, prof-messer

---

**Q:** What is "single pane of glass" management in the context of wireless?
**A:** A wireless LAN controller providing centralized management of all access points from one interface
**Difficulty:** Easy
**Tags:** wireless, wlc, devices, domain-1, prof-messer

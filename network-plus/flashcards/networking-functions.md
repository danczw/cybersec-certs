# Networking Functions Flashcards

**Q:** What is a CDN?
**A:** Content Delivery Network — distributes data efficiently from a central point to end users by caching content at geographically distributed servers
**Difficulty:** Easy
**Tags:** cdn, functions, domain-1, prof-messer

---

**Q:** Why is a CDN faster than a single centralized server?
**A:** Users access the nearest CDN server instead of all going to one server that might be on another part of the world
**Difficulty:** Easy
**Tags:** cdn, functions, domain-1, prof-messer

---

**Q:** What is a VPN?
**A:** Virtual Private Network — connects to a remote network with all data encrypted, secure even across insecure networks like the public internet
**Difficulty:** Easy
**Tags:** vpn, functions, domain-1, prof-messer

---

**Q:** What is a VPN concentrator / head-end device?
**A:** The central connection point for all VPN users — a purpose-built appliance for high-speed encryption and decryption of network data in real time
**Difficulty:** Medium
**Tags:** vpn, concentrator, functions, domain-1, prof-messer

---

**Q:** Where is VPN concentrator functionality often integrated?
**A:** Within a next-generation firewall
**Difficulty:** Easy
**Tags:** vpn, concentrator, ngfw, functions, domain-1, prof-messer

---

**Q:** Can VPN concentrators run as software?
**A:** Yes — smaller networks can use software-based VPN concentrators on an existing OS. Windows, macOS, and Linux also ship with built-in VPN client software.
**Difficulty:** Easy
**Tags:** vpn, concentrator, functions, domain-1, prof-messer

---

**Q:** What is QoS?
**A:** Quality of Service — prioritizes certain applications over others on the network, controlling bandwidth usage and data rates
**Difficulty:** Easy
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** What are two other names for QoS?
**A:** Traffic shaping or packet shaping
**Difficulty:** Medium
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** Give an example of QoS prioritization.
**A:** Real-time audio/video gets higher priority than file transfers
**Difficulty:** Easy
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** On which devices is QoS configured?
**A:** Firewalls, routers, or switches
**Difficulty:** Medium
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** What is TTL?
**A:** Time to Live — a timer that limits how long a task/packet persists on the network. When TTL reaches zero, the task/packet is dropped.
**Difficulty:** Easy
**Tags:** ttl, functions, domain-1, prof-messer

---

**Q:** What does TTL represent in IP?
**A:** The number of hops a packet will go through a router. Each router decreases TTL by 1; when it reaches zero, the packet is discarded.
**Difficulty:** Medium
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** What are the default TTL values for macOS/Linux and Windows?
**A:** macOS/Linux = 64 hops, Windows = 128 hops
**Difficulty:** Medium
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** What is a routing loop?
**A:** Router A thinks the next hop is Router B, and Router B thinks the next hop is Router A — the packet bounces back and forth indefinitely
**Difficulty:** Medium
**Tags:** ttl, routing-loop, functions, domain-1, prof-messer

---

**Q:** How does TTL prevent routing loops?
**A:** Each router decreases TTL by 1. When TTL reaches zero, the router discards the packet, ending the loop.
**Difficulty:** Easy
**Tags:** ttl, routing-loop, functions, domain-1, prof-messer

---

**Q:** What commonly causes a routing loop?
**A:** A single IP address mistake in a static route configuration
**Difficulty:** Medium
**Tags:** ttl, routing-loop, functions, domain-1, prof-messer

---

**Q:** How would a routing loop appear in a traceroute?
**A:** The route repeats: 10.1.10.1 → 10.2.10.2 → 10.1.10.1 → 10.2.10.2 and so on until TTL is reached
**Difficulty:** Medium
**Tags:** ttl, routing-loop, functions, domain-1, prof-messer

---

**Q:** Where is the TTL field located in an IP packet?
**A:** In the IPv4 header
**Difficulty:** Easy
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** What does TTL represent in DNS?
**A:** The number of seconds a DNS resolution should be cached locally. After TTL expires, the client must query DNS again.
**Difficulty:** Medium
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** A DNS record has a TTL of 300. What does this mean?
**A:** Cache the DNS resolution for 300 seconds (5 minutes). After that, query DNS again for a fresh resolution.
**Difficulty:** Easy
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** How does DNS TTL help administrators who change a server's IP address?
**A:** They can be relatively secure that most users will have the updated IP address within the TTL window
**Difficulty:** Medium
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** What is the typical number of hops between a user and an internet destination?
**A:** Around 12 to 16 hops
**Difficulty:** Medium
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** How does TTL meaning differ between IP and DNS?
**A:** In IP, TTL = number of router hops. In DNS, TTL = number of seconds to cache a record.
**Difficulty:** Hard
**Tags:** ttl, ip, dns, functions, domain-1, prof-messer

---

**Q:** What does CDN stand for?
**A:** Content Delivery Network
**Difficulty:** Easy
**Tags:** cdn, functions, domain-1, prof-messer

---

**Q:** A website like YouTube is accessible worldwide with low latency. What technology makes this possible?
**A:** A CDN — content is cached at geographically distributed servers so users access the nearest one
**Difficulty:** Easy
**Tags:** cdn, functions, domain-1, prof-messer

---

**Q:** Why would a company use a VPN for remote workers?
**A:** It allows employees to connect to the corporate network with all data encrypted, even across the insecure public internet
**Difficulty:** Easy
**Tags:** vpn, functions, domain-1, prof-messer

---

**Q:** Why does a VPN concentrator need purpose-built hardware?
**A:** The encryption and decryption process requires high throughput to support hundreds or thousands of simultaneous users in real time
**Difficulty:** Medium
**Tags:** vpn, concentrator, functions, domain-1, prof-messer

---

**Q:** A network admin wants video calls to have priority over file downloads. What should they configure?
**A:** QoS (Quality of Service) — also called traffic shaping or packet shaping
**Difficulty:** Easy
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** Can QoS devices identify specific applications?
**A:** Yes — devices may have a pre-built list of applications and also allow adding custom applications to the list
**Difficulty:** Medium
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** What two problems does TTL solve?
**A:** Prevents infinite routing loops and clears stale cached data
**Difficulty:** Medium
**Tags:** ttl, functions, domain-1, prof-messer

---

**Q:** A packet has a TTL of 58. What does this mean?
**A:** The packet can pass through 58 more routers before being discarded
**Difficulty:** Easy
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** Why is the default TTL (64 or 128) much higher than a typical internet path (12-16 hops)?
**A:** It gives plenty of room to get data across the internet without accidentally dropping packets, while still catching routing loops
**Difficulty:** Medium
**Tags:** ttl, ip, functions, domain-1, prof-messer

---

**Q:** What command can you use to look up a domain's DNS TTL?
**A:** nslookup or dig (e.g., dig www.professormesser.com)
**Difficulty:** Medium
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** What happens when a DNS cache entry's TTL expires?
**A:** The local cache removes that resolution. The next lookup requires a fresh DNS query.
**Difficulty:** Easy
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** A website is cached locally but the admin changed the server IP 3 minutes ago. The DNS TTL is 300 seconds. Will you see the new IP?
**A:** Not yet — 300 seconds (5 minutes) haven't elapsed, so your cache still has the old IP. After 5 minutes, the cache clears and a new query returns the updated IP.
**Difficulty:** Hard
**Tags:** ttl, dns, functions, domain-1, prof-messer

---

**Q:** What does VPN stand for?
**A:** Virtual Private Network
**Difficulty:** Easy
**Tags:** vpn, functions, domain-1, prof-messer

---

**Q:** What does QoS stand for?
**A:** Quality of Service
**Difficulty:** Easy
**Tags:** qos, functions, domain-1, prof-messer

---

**Q:** What does TTL stand for?
**A:** Time to Live
**Difficulty:** Easy
**Tags:** ttl, functions, domain-1, prof-messer

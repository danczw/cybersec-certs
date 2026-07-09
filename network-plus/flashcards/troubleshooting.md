# Troubleshooting Flashcards

**Q:** What are the 6 steps of the CompTIA troubleshooting methodology?
**A:** 1) Identify the problem, 2) Establish a theory, 3) Test the theory, 4) Establish a plan of action, 5) Verify full system functionality, 6) Document findings
**Difficulty:** Medium
**Tags:** troubleshooting, methodology, domain-5

---

**Q:** A user can ping 8.8.8.8 but cannot browse to google.com. What's the most likely issue?
**A:** DNS resolution failure. Internet connectivity works (ping by IP succeeds), but name resolution is failing.
**Difficulty:** Easy
**Tags:** troubleshooting, dns, scenario, domain-5

---

**Q:** What command flushes the local DNS cache on Windows?
**A:** `ipconfig /flushdns`
**Difficulty:** Easy
**Tags:** troubleshooting, dns, commands, domain-5

---

**Q:** What does `traceroute` (Linux) / `tracert` (Windows) do?
**A:** Shows the hop-by-hop path to a destination, displaying each router along the way and latency per hop. Uses incrementing TTL values.
**Difficulty:** Easy
**Tags:** troubleshooting, commands, domain-5

---

**Q:** What is a TDR used for?
**A:** Time Domain Reflectometer — tests copper cable length and locates breaks/faults by measuring signal reflection time
**Difficulty:** Medium
**Tags:** troubleshooting, cabling, tools, domain-5

---

**Q:** What is an OTDR used for?
**A:** Optical Time Domain Reflectometer — tests fiber optic cable, locates breaks, splices, and measures attenuation
**Difficulty:** Medium
**Tags:** troubleshooting, cabling, fiber, tools, domain-5

---

**Q:** A workstation gets a 169.254.x.x address. What does this indicate?
**A:** APIPA address — the device could not reach a DHCP server. Check DHCP server status, network connectivity, and DHCP relay agents.
**Difficulty:** Easy
**Tags:** troubleshooting, dhcp, apipa, domain-5

---

**Q:** What is attenuation?
**A:** The loss of signal strength over distance. Solved by using repeaters, shorter cable runs, or higher-quality cable.
**Difficulty:** Easy
**Tags:** troubleshooting, cabling, domain-5

---

**Q:** What is crosstalk (NEXT)?
**A:** Electromagnetic interference between adjacent wire pairs in a cable. Near-End Crosstalk (NEXT) is measured at the transmitting end. Mitigated by proper twisting and shielded cable.
**Difficulty:** Medium
**Tags:** troubleshooting, cabling, domain-5

---

**Q:** For 2.4 GHz Wi-Fi, which channels should you use to avoid overlap?
**A:** Channels 1, 6, and 11 — these are the only non-overlapping channels in the 2.4 GHz band
**Difficulty:** Medium
**Tags:** troubleshooting, wireless, domain-5

---

**Q:** What does `netstat -an` show?
**A:** All active connections and listening ports in numeric format (no DNS resolution of addresses)
**Difficulty:** Medium
**Tags:** troubleshooting, commands, domain-5

---

**Q:** User can't reach any network resources. Ping to default gateway fails. What do you check first?
**A:** Physical layer: cable connected? Link light on NIC/switch? Correct port? Then check IP configuration (correct IP/mask for the subnet).
**Difficulty:** Medium
**Tags:** troubleshooting, methodology, scenario, domain-5

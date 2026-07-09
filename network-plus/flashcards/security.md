# Network Security Flashcards

**Q:** What is the CIA triad?
**A:** Confidentiality, Integrity, Availability — the three pillars of information security
**Difficulty:** Easy
**Tags:** security, cia, domain-4

---

**Q:** What does AAA stand for in network security?
**A:** Authentication (who are you), Authorization (what can you do), Accounting (what did you do)
**Difficulty:** Easy
**Tags:** security, aaa, domain-4

---

**Q:** RADIUS vs TACACS+: key differences?
**A:** RADIUS: UDP 1812/1813, encrypts password only, combines auth+authz. TACACS+: TCP 49, encrypts entire payload, separates all AAA functions.
**Difficulty:** Hard
**Tags:** security, aaa, radius, tacacs, domain-4

---

**Q:** What is a VLAN hopping attack?
**A:** Attacker uses double-tagging (802.1Q) to send frames to a VLAN they shouldn't access. Mitigated by disabling DTP, setting native VLAN to unused VLAN.
**Difficulty:** Hard
**Tags:** security, attacks, vlan, domain-4

---

**Q:** What is MAC flooding?
**A:** Overwhelming a switch's CAM table with fake MAC addresses, causing it to flood all traffic like a hub — enabling eavesdropping. Mitigated by port security.
**Difficulty:** Medium
**Tags:** security, attacks, switching, domain-4

---

**Q:** What is ARP poisoning?
**A:** Sending forged ARP replies to associate attacker's MAC with a victim's IP, enabling man-in-the-middle attacks. Mitigated by Dynamic ARP Inspection (DAI).
**Difficulty:** Medium
**Tags:** security, attacks, arp, domain-4

---

**Q:** What is Zero Trust architecture?
**A:** Security model that assumes no implicit trust — every user, device, and connection must be continuously verified regardless of network location. Uses microsegmentation and least privilege.
**Difficulty:** Medium
**Tags:** security, zero-trust, domain-4

---

**Q:** What is 802.1X?
**A:** Port-based Network Access Control (NAC). Requires authentication before granting network access. Uses supplicant → authenticator → authentication server (RADIUS).
**Difficulty:** Hard
**Tags:** security, nac, 802.1x, domain-4

---

**Q:** What is DHCP snooping?
**A:** Switch feature that filters DHCP messages from untrusted ports, preventing rogue DHCP servers from assigning incorrect network settings.
**Difficulty:** Medium
**Tags:** security, dhcp, hardening, domain-4

---

**Q:** What is the difference between split tunnel and full tunnel VPN?
**A:** Split tunnel: only corporate-destined traffic goes through VPN. Full tunnel: all traffic routes through VPN. Split is faster but less secure.
**Difficulty:** Medium
**Tags:** security, vpn, domain-4

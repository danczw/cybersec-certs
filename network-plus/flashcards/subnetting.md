# Subnetting Flashcards

**Q:** What is the formula for calculating the number of usable hosts in a subnet?
**A:** 2^h - 2 (where h = number of host bits). Subtract 2 for network address and broadcast address.
**Difficulty:** Easy
**Tags:** subnetting, formulas, domain-1

---

**Q:** What is the formula for calculating the number of subnets?
**A:** 2^n (where n = number of bits borrowed from the host portion)
**Difficulty:** Easy
**Tags:** subnetting, formulas, domain-1

---

**Q:** What is the subnet mask for /27?
**A:** 255.255.255.224 (32 - 27 = 5 host bits, block size = 32)
**Difficulty:** Medium
**Tags:** subnetting, cidr, domain-1

---

**Q:** How many usable hosts in a /26 network?
**A:** 62 (2^6 - 2 = 62, since 32 - 26 = 6 host bits)
**Difficulty:** Medium
**Tags:** subnetting, domain-1

---

**Q:** What is the block size for a /28 subnet?
**A:** 16 (256 - 240 = 16, or 2^4 = 16)
**Difficulty:** Medium
**Tags:** subnetting, domain-1

---

**Q:** Given 192.168.1.0/24, you need at least 50 hosts per subnet. What is the best prefix?
**A:** /26 (gives 62 usable hosts). /27 only gives 30 hosts — not enough.
**Difficulty:** Hard
**Tags:** subnetting, scenario, domain-1

---

**Q:** What are the three RFC 1918 private IPv4 ranges?
**A:** 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16
**Difficulty:** Easy
**Tags:** ipv4, private, domain-1

---

**Q:** What is APIPA, and what range does it use?
**A:** Automatic Private IP Addressing. Range: 169.254.0.0/16. Assigned when DHCP is unavailable.
**Difficulty:** Medium
**Tags:** ipv4, dhcp, domain-1

---

**Q:** What is the purpose of a /30 subnet?
**A:** Point-to-point links (2 usable hosts — one for each end of the link)
**Difficulty:** Medium
**Tags:** subnetting, routing, domain-1

---

**Q:** What is CIDR?
**A:** Classless Inter-Domain Routing. Replaces classful addressing with variable-length subnet masks (e.g., /22 instead of fixed /8, /16, /24).
**Difficulty:** Medium
**Tags:** subnetting, cidr, domain-1

---

**Q:** How do you calculate the block size from a subnet mask?
**A:** 256 minus the interesting octet value. E.g., mask 255.255.255.192 → 256 - 192 = 64
**Difficulty:** Medium
**Tags:** subnetting, formulas, domain-1

---

**Q:** IPv6: What is the link-local prefix?
**A:** fe80::/10
**Difficulty:** Medium
**Tags:** ipv6, domain-1

---

**Q:** IPv6: How many bits in an IPv6 address?
**A:** 128 bits (vs 32 for IPv4)
**Difficulty:** Easy
**Tags:** ipv6, domain-1

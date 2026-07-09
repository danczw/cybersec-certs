# Troubleshooting Practice Scenarios

## Scenario 1: DNS Failure

**Scenario:** A user reports they cannot browse to any websites. They can access file shares on the local network by IP address. You run `ping 8.8.8.8` from their workstation and get successful replies. You run `nslookup google.com` and it times out.

**Question:** What is the most likely cause, and what steps would you take to resolve it?

**Answer:** DNS resolution failure. The user has IP connectivity (ping works) and local access, but name resolution is broken.

**Explanation:** Steps: (1) Check configured DNS servers with `ipconfig /all`. (2) Try `nslookup google.com 8.8.8.8` to test against a known-good DNS. (3) If that works, the internal DNS server is the problem — either down or misconfigured. (4) Run `ipconfig /flushdns` to clear cached bad entries. (5) As a temporary fix, change DNS to 8.8.8.8. (6) Investigate the internal DNS server.

---

## Scenario 2: DHCP Issue

**Scenario:** Multiple users in the accounting department report they cannot access any network resources. You check one workstation and find it has an IP address of 169.254.45.12 with a subnet mask of 255.255.0.0. Other departments are working normally.

**Question:** What is the problem and what should you investigate?

**Answer:** The workstations are using APIPA addresses because they cannot reach a DHCP server.

**Explanation:** 169.254.x.x indicates APIPA — assigned when DHCP fails. Since only one department is affected: (1) Check if the accounting VLAN is correctly configured on the switch. (2) Verify the DHCP scope for that subnet has available addresses (not exhausted). (3) Check if a DHCP relay agent (ip helper-address) is configured on the router for that VLAN. (4) Verify the DHCP server is running and has a scope for that subnet. (5) Check for a rogue DHCP server that may have exhausted the legitimate scope.

---

## Scenario 3: Slow Network Performance

**Scenario:** Users complain that accessing a specific internal server is extremely slow. You run `ping server01` and observe response times of 150-300ms (normally <1ms on LAN). There is no packet loss. Other servers respond normally.

**Question:** What could cause high latency to only one server on the LAN?

**Answer:** Possible causes: duplex mismatch on the server's NIC or switch port, network congestion on the path to that server, a failing NIC, or the server is overloaded (CPU/memory exhaustion causing delayed responses).

**Explanation:** (1) Check duplex settings — a mismatch (one side auto, other side forced) causes collisions and retransmissions. (2) Check switch port errors (`show interface` for CRC errors, late collisions). (3) Check server resource utilization (CPU, RAM, disk I/O). (4) Run `pathping` or `tracert` to see if latency is introduced at a specific hop. (5) Try a different switch port or cable to rule out physical issues.

---

## Scenario 4: VLAN Misconfiguration

**Scenario:** A new employee's workstation was just connected to a switch port. They can ping other devices in their cubicle area but cannot reach the department file server or the internet. The switch port link light is green.

**Question:** What is the most likely cause?

**Answer:** The switch port is likely assigned to the wrong VLAN, or hasn't been assigned to any VLAN (defaulting to VLAN 1 while the department uses a different VLAN).

**Explanation:** (1) Check which VLAN the port is assigned to (`show vlan brief`). (2) Verify the expected VLAN for that department. (3) Assign the port to the correct VLAN. (4) Verify the user gets a DHCP address from the correct scope. (5) Confirm connectivity to the file server and internet. Common after new port activations or office moves.

---

## Scenario 5: Wireless Connectivity

**Scenario:** Users in a conference room report intermittent Wi-Fi disconnections. Signal strength shows 2-3 bars. The conference room is between two access points. The issue is worse during lunch hours.

**Question:** What is the likely cause and how would you resolve it?

**Answer:** Co-channel interference (both APs on the same or overlapping channels) and/or interference from microwave ovens during lunch.

**Explanation:** (1) Check channel assignments — adjacent APs on 2.4 GHz should use channels 1, 6, or 11 to avoid overlap. (2) Survey for interference sources (microwaves operate at 2.4 GHz). (3) Consider switching the conference room AP to 5 GHz band (shorter range but less interference). (4) Adjust AP power levels to reduce overlap. (5) If using 2.4 GHz, ensure non-overlapping channel assignment.

---

## Scenario 6: Subnet Calculation

**Scenario:** You need to design a network for a small office with 4 departments: Sales (28 users), Engineering (50 users), HR (12 users), and Management (6 users). You've been allocated the 10.0.1.0/24 network.

**Question:** What subnet sizes would you assign to each department?

**Answer:**
- Engineering (50 users): /26 — gives 62 hosts (block of 64). Range: 10.0.1.0/26
- Sales (28 users): /27 — gives 30 hosts (block of 32). Range: 10.0.1.64/27
- HR (12 users): /28 — gives 14 hosts (block of 16). Range: 10.0.1.96/28
- Management (6 users): /29 — gives 6 hosts (block of 8). Range: 10.0.1.112/29

**Explanation:** Always allocate the largest subnet first to maintain alignment. Each subnet must have enough host bits: 2^h - 2 ≥ required hosts. Leave room for growth where possible. Total used: 64 + 32 + 16 + 8 = 120 addresses out of 256 available, leaving space for future expansion.

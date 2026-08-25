const TriageSim = (() => {
  let container;
  let sessionStats;
  let currentScenario;
  let currentStep;
  let budget;
  let methodologyStep;
  let activeKeyHandler = null;

  const MAX_BUDGET = 10;
  const DOMAIN_ID = 5;

  const METHODOLOGY_STEPS = [
    'Identify', 'Theory', 'Test', 'Plan', 'Implement', 'Verify', 'Document'
  ];

  const SCENARIOS = [
    {
      id: 'triage-dns',
      title: 'Building B Internet Outage',
      description: 'Users in Building B report they cannot access the internet or any external websites. Internal file shares work fine. Building A users have no issues.',
      difficulty: 1,
      steps: [
        {
          prompt: 'What is your first diagnostic action?',
          methodology: 0,
          choices: [
            { text: 'Run nslookup on a Building B workstation', correct: true, feedback: 'nslookup times out — no DNS response received. The workstation is configured to use 10.1.2.10 as its DNS server.', cost: 0 },
            { text: 'Replace the uplink cable to Building B switch', correct: false, feedback: 'Link lights are active and internal resources work. Physical layer is not the issue.', cost: 2 },
            { text: 'Reboot the Building B switch', correct: false, feedback: 'Risky without diagnosis. Switch reboots but the problem persists — internal comms still work.', cost: 3 },
            { text: 'Ping the default gateway from Building B', correct: true, feedback: 'Gateway responds with <1ms latency. Layer 3 path to the router is healthy.', cost: 0 }
          ]
        },
        {
          prompt: 'DNS is not resolving. What do you check next?',
          methodology: 1,
          choices: [
            { text: 'Ping the DNS server at 10.1.2.10', correct: true, feedback: 'Ping to 10.1.2.10 fails — destination host unreachable. The DNS server is not reachable from Building B.', cost: 0 },
            { text: 'Change workstation DNS to 8.8.8.8 manually', correct: false, feedback: 'Using 8.8.8.8 works for this workstation but does not identify the root cause for the entire building.', cost: 2 },
            { text: 'Check if the DNS service is running on the server', correct: false, feedback: 'You cannot reach the server console from Building B. Building A admin confirms DNS service is running and responding to their queries.', cost: 1 },
            { text: 'Flush the DNS cache on the workstation', correct: false, feedback: 'Cache flushed but resolution still fails — the issue is not stale cache entries.', cost: 1 }
          ]
        },
        {
          prompt: 'The DNS server is unreachable from Building B but works from Building A. What do you investigate?',
          methodology: 2,
          choices: [
            { text: 'Check ACLs on the router interface facing Building B', correct: true, feedback: 'You find an ACL that was recently modified — it blocks traffic to the 10.1.2.0/24 subnet from Building B sources.', cost: 0 },
            { text: 'Check the ARP table on the Building B switch', correct: false, feedback: 'ARP table shows the gateway MAC correctly. Layer 2 resolution is fine.', cost: 1 },
            { text: 'Run a traceroute to the DNS server', correct: true, feedback: 'Traceroute shows the first hop (gateway) responds, then "!H" (host unreachable) — traffic is being filtered.', cost: 0 },
            { text: 'Check spanning tree on Building B switch', correct: false, feedback: 'STP shows all ports in forwarding state. This is not an L2 loop issue.', cost: 2 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'ACL on the router is blocking Building B from reaching the DNS server subnet', correct: true },
          { text: 'DNS server is down and needs to be restarted', correct: false },
          { text: 'Building B switch has a bad uplink port', correct: false },
          { text: 'DHCP is assigning the wrong DNS server address', correct: false }
        ]
      }
    },
    {
      id: 'triage-dhcp',
      title: 'New Devices Cannot Connect',
      description: 'Help desk reports that new devices plugged into the network receive a 169.254.x.x address. Existing connected devices work fine and retain their IPs.',
      difficulty: 1,
      steps: [
        {
          prompt: 'A new laptop gets a 169.254.x.x address. What do you do first?',
          methodology: 0,
          choices: [
            { text: 'Run ipconfig /release and /renew on the laptop', correct: true, feedback: 'DHCP request times out — no DHCPOFFER received. The client is broadcasting but getting no response.', cost: 0 },
            { text: 'Check the DHCP server scope', correct: true, feedback: 'DHCP server shows 254/254 addresses leased in this scope. The pool is completely exhausted.', cost: 0 },
            { text: 'Replace the Ethernet cable', correct: false, feedback: 'Link light is active and the laptop can ping other devices via static IP. Physical layer is fine.', cost: 2 },
            { text: 'Reboot the DHCP server', correct: false, feedback: 'Server reboots, but existing leases persist and the pool is still full.', cost: 2 }
          ]
        },
        {
          prompt: 'The DHCP scope is exhausted. Existing devices hold valid leases. What do you investigate?',
          methodology: 1,
          choices: [
            { text: 'Review the lease table for stale or unknown MAC addresses', correct: true, feedback: 'You find 80+ leases held by MAC addresses that do not match any known devices — possible rogue DHCP clients or old devices never cleaned up.', cost: 0 },
            { text: 'Extend the subnet to /23 to add addresses', correct: false, feedback: 'This would work but changes the network architecture without understanding why addresses were exhausted.', cost: 2 },
            { text: 'Reduce the lease duration to 1 hour', correct: false, feedback: 'Lease time changed, but current leases remain active until they expire at their original duration.', cost: 1 },
            { text: 'Check for a rogue DHCP server on the network', correct: false, feedback: 'No rogue DHCP detected. Only one DHCP server is responding on this segment.', cost: 1 }
          ]
        },
        {
          prompt: 'Many leases are held by unknown MAC addresses. What is your next action?',
          methodology: 2,
          choices: [
            { text: 'Delete stale leases for unknown MACs and reduce lease time', correct: true, feedback: 'Clearing 80 stale leases frees addresses. Reducing lease time to 4 hours prevents future exhaustion.', cost: 0 },
            { text: 'Enable DHCP snooping on the switches', correct: false, feedback: 'Good security practice but does not immediately resolve the address exhaustion issue.', cost: 1 },
            { text: 'Add a second DHCP scope on a different subnet', correct: false, feedback: 'Creates a new subnet but existing clients expect the original range. Adds routing complexity.', cost: 2 },
            { text: 'Block all unknown MAC addresses at the switch port level', correct: false, feedback: 'Port security could help prevent future issues but does not free up current leases.', cost: 1 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'DHCP scope exhausted by stale leases from decommissioned devices', correct: true },
          { text: 'Rogue DHCP server is handing out addresses from a different range', correct: false },
          { text: 'DHCP relay agent is misconfigured on the router', correct: false },
          { text: 'The subnet mask is incorrect, limiting available addresses', correct: false }
        ]
      }
    },
    {
      id: 'triage-duplex',
      title: 'Painfully Slow File Transfers',
      description: 'Users on the 3rd floor report that file transfers to the server are extremely slow (under 1 Mbps on a Gigabit network). Web browsing and email seem mostly unaffected.',
      difficulty: 2,
      steps: [
        {
          prompt: 'File transfers are crawling on 3rd floor. Where do you start?',
          methodology: 0,
          choices: [
            { text: 'Check interface statistics on the 3rd floor switch uplink', correct: true, feedback: 'Interface shows thousands of late collisions, CRC errors, and runts on the uplink port — classic duplex mismatch indicators.', cost: 0 },
            { text: 'Run a speed test from a 3rd floor workstation', correct: false, feedback: 'Speed test to internet shows 50 Mbps (normal for WAN). LAN transfer to server shows under 1 Mbps. Issue is internal.', cost: 1 },
            { text: 'Replace the uplink cable between floors', correct: false, feedback: 'Cable replaced but performance is unchanged. The cable tested fine with a cable tester.', cost: 2 },
            { text: 'Check the server NIC for errors', correct: false, feedback: 'Server NIC shows no errors — it is negotiated at 1 Gbps full duplex. Issue is not at the server end.', cost: 1 }
          ]
        },
        {
          prompt: 'You see late collisions and CRC errors on the uplink. What do you suspect?',
          methodology: 1,
          choices: [
            { text: 'Duplex mismatch — one side is half, other is full duplex', correct: true, feedback: 'Checking the port config: the 3rd floor switch uplink is hard-set to 100 Mbps half-duplex, while the core switch port is set to auto-negotiate (chose full duplex).', cost: 0 },
            { text: 'Failing switch port with bad hardware', correct: false, feedback: 'Moving to another port produces the same symptoms. The issue follows the configuration, not the hardware.', cost: 2 },
            { text: 'Excessive broadcast traffic causing congestion', correct: false, feedback: 'Broadcast traffic is under 2% of total bandwidth — well within normal parameters.', cost: 1 },
            { text: 'MTU mismatch causing fragmentation', correct: false, feedback: 'MTU is 1500 on both sides. Fragmentation is not occurring.', cost: 1 }
          ]
        },
        {
          prompt: 'Duplex mismatch confirmed. The 3rd floor uplink is hard-set to half-duplex. How do you resolve it?',
          methodology: 4,
          choices: [
            { text: 'Set both sides to auto-negotiate (or match at 1 Gbps full-duplex)', correct: true, feedback: 'Both ports set to auto-negotiate. They settle on 1 Gbps full duplex. Late collisions stop immediately.', cost: 0 },
            { text: 'Set both sides to 100 Mbps full-duplex', correct: false, feedback: 'This eliminates the mismatch but leaves the link at 100 Mbps — below the Gigabit design spec.', cost: 1 },
            { text: 'Set both sides to half-duplex to match', correct: false, feedback: 'Matching at half-duplex removes errors but dramatically reduces throughput. Not an appropriate fix for Gigabit infrastructure.', cost: 2 },
            { text: 'Replace the 3rd floor switch with a new model', correct: false, feedback: 'The switch supports Gigabit — it was just misconfigured. Hardware replacement is unnecessary.', cost: 3 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'Duplex mismatch — uplink hard-set to half-duplex against an auto-negotiating port', correct: true },
          { text: 'Faulty Ethernet cable causing signal degradation', correct: false },
          { text: 'Switch port rate-limited by QoS policy', correct: false },
          { text: 'Network congestion from excessive multicast traffic', correct: false }
        ]
      }
    },
    {
      id: 'triage-routing-loop',
      title: 'Intermittent Timeouts to Remote Site',
      description: 'Users report intermittent connectivity to a branch office server (10.20.1.5). Traceroutes show packets bouncing between two routers before "TTL exceeded" appears.',
      difficulty: 3,
      steps: [
        {
          prompt: 'Traceroute shows packets looping between two routers. What do you examine first?',
          methodology: 0,
          choices: [
            { text: 'Check the routing tables on both routers', correct: true, feedback: 'Router A has a static route to 10.20.1.0/24 pointing to Router B. Router B has a default route pointing back to Router A. Neither has a connected route to the destination.', cost: 0 },
            { text: 'Check interface status on both routers', correct: false, feedback: 'All interfaces show up/up with no errors. Physical connectivity is not the problem.', cost: 1 },
            { text: 'Clear the ARP cache on both routers', correct: false, feedback: 'ARP caches cleared. The loop persists — this is a Layer 3 routing issue, not Layer 2.', cost: 2 },
            { text: 'Increase TTL on the source host', correct: false, feedback: 'Increasing TTL just means packets loop longer before being dropped. The loop still exists.', cost: 2 }
          ]
        },
        {
          prompt: 'Router B is sending traffic back to Router A because of a default route. Why has the valid path disappeared?',
          methodology: 1,
          choices: [
            { text: 'Check if the WAN link to the branch office is down', correct: true, feedback: 'The WAN interface on Router B to the branch is down (line protocol down). The connected route was withdrawn, leaving only the default route back to Router A.', cost: 0 },
            { text: 'Check for route poisoning in the routing protocol', correct: false, feedback: 'These are static routes — no dynamic routing protocol is in use on this path.', cost: 1 },
            { text: 'Look for a route redistribution issue', correct: false, feedback: 'No redistribution configured between these routers. Routes are all static.', cost: 1 },
            { text: 'Check for an MTU black hole', correct: false, feedback: 'Small pings still loop. MTU is not relevant here — traffic of all sizes follows the same routing loop.', cost: 2 }
          ]
        },
        {
          prompt: 'The WAN link to the branch is down, causing the routing loop. What is the proper fix?',
          methodology: 4,
          choices: [
            { text: 'Restore the WAN link and add a null route (blackhole) as a fallback to prevent loops', correct: true, feedback: 'WAN link restored after hardware fault fixed. A static route to Null0 for 10.20.1.0/24 with AD 254 is added — if the connected route disappears again, traffic is dropped instead of looping.', cost: 0 },
            { text: 'Remove the default route from Router B', correct: false, feedback: 'Removing the default route breaks all other traffic from Router B. This is too broad a fix.', cost: 2 },
            { text: 'Add an IP SLA to monitor the WAN link and pull the static route', correct: true, feedback: 'IP SLA configured to track the WAN peer. If the link goes down, the static route is automatically withdrawn. Good preventive measure.', cost: 0 },
            { text: 'Lower the TTL threshold to detect loops faster', correct: false, feedback: 'Detecting loops faster does not prevent them. Traffic is still black-holed for users.', cost: 3 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'WAN link failure caused static route withdrawal, creating a routing loop via default route', correct: true },
          { text: 'Routing protocol convergence delay during failover', correct: false },
          { text: 'Incorrect subnet mask on the WAN interface', correct: false },
          { text: 'TTL value set too low on the source device', correct: false }
        ]
      }
    },
    {
      id: 'triage-vlan',
      title: 'New VLAN Cannot Reach Gateway',
      description: 'IT deployed a new VLAN 50 for the accounting department. Hosts get correct IPs (10.50.1.x/24) from DHCP but cannot ping their gateway (10.50.1.1) or reach any other network.',
      difficulty: 2,
      steps: [
        {
          prompt: 'Hosts on VLAN 50 cannot reach their gateway. What do you check first?',
          methodology: 0,
          choices: [
            { text: 'Verify the switch has VLAN 50 created and ports are assigned correctly', correct: true, feedback: 'VLAN 50 exists on the access switch. Ports are assigned to VLAN 50. Hosts are in the correct VLAN.', cost: 0 },
            { text: 'Check if the gateway IP 10.50.1.1 is configured on the Layer 3 device', correct: true, feedback: 'The core switch/router does NOT have an SVI or subinterface for VLAN 50. There is no Layer 3 interface with IP 10.50.1.1.', cost: 0 },
            { text: 'Replace the Ethernet cables to the accounting workstations', correct: false, feedback: 'Link lights are active on all ports. Workstations see each other within VLAN 50. Physical layer is fine.', cost: 2 },
            { text: 'Reboot the access switch', correct: false, feedback: 'Switch reboots, VLAN 50 comes back up, same problem persists. Rebooting was not the issue.', cost: 3 }
          ]
        },
        {
          prompt: 'The Layer 3 device has no interface for VLAN 50. What else might be missing?',
          methodology: 1,
          choices: [
            { text: 'Check if VLAN 50 is allowed on the trunk between access and distribution switches', correct: true, feedback: 'The trunk link only allows VLANs 1,10,20,30,40. VLAN 50 is not in the allowed list — traffic cannot traverse the trunk.', cost: 0 },
            { text: 'Check DHCP relay configuration', correct: false, feedback: 'DHCP works because the DHCP server is on the same access switch. Inter-VLAN is the issue.', cost: 1 },
            { text: 'Check for STP issues blocking VLAN 50 ports', correct: false, feedback: 'STP shows all VLAN 50 ports in forwarding state. No blocked ports.', cost: 1 },
            { text: 'Check if hosts have the correct subnet mask', correct: false, feedback: 'All hosts show /24 mask via DHCP. Subnet configuration is correct.', cost: 1 }
          ]
        },
        {
          prompt: 'VLAN 50 needs an SVI and trunk access. What do you implement?',
          methodology: 4,
          choices: [
            { text: 'Add VLAN 50 to trunk allowed list and create SVI with IP 10.50.1.1/24 on the L3 switch', correct: true, feedback: 'VLAN 50 added to trunk. SVI created: interface vlan 50, ip address 10.50.1.1 255.255.255.0, no shutdown. Hosts can now reach the gateway.', cost: 0 },
            { text: 'Change VLAN 50 hosts to use a gateway in an existing VLAN', correct: false, feedback: 'This would break the VLAN segmentation design. Accounting must remain isolated in VLAN 50.', cost: 2 },
            { text: 'Create a static route on the access switch for VLAN 50', correct: false, feedback: 'The access switch is Layer 2 only — it cannot route traffic. Routing must happen on the L3 device.', cost: 2 },
            { text: 'Move accounting ports to VLAN 1 temporarily', correct: false, feedback: 'This restores connectivity but violates the security segmentation requirement and is not a real fix.', cost: 3 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'No SVI/L3 interface for VLAN 50 and VLAN not allowed on the trunk', correct: true },
          { text: 'DHCP server assigning wrong gateway address to clients', correct: false },
          { text: 'Spanning tree blocking the VLAN 50 root port', correct: false },
          { text: 'Access switch ports configured as trunk instead of access mode', correct: false }
        ]
      }
    },
    {
      id: 'triage-wireless',
      title: 'Wireless Drops in Conference Room',
      description: 'Users in the main conference room experience frequent Wi-Fi disconnections and extremely slow speeds during meetings. Other areas of the office are unaffected.',
      difficulty: 2,
      steps: [
        {
          prompt: 'Wi-Fi is unreliable only in the conference room. What do you investigate first?',
          methodology: 0,
          choices: [
            { text: 'Perform a wireless site survey / check channel utilization in that area', correct: true, feedback: 'Wi-Fi analyzer shows three APs on channel 6 (including yours) with overlapping coverage in the conference room. Channel utilization is 85%.', cost: 0 },
            { text: 'Check the AP nearest the conference room for hardware faults', correct: false, feedback: 'AP is functioning normally — firmware current, interface up, connected clients responding.', cost: 1 },
            { text: 'Increase transmit power on the nearby AP', correct: false, feedback: 'Higher power increases interference with adjacent APs and neighboring office APs. Problem worsens.', cost: 2 },
            { text: 'Replace the conference room AP with a newer model', correct: false, feedback: 'New AP has same interference problem. The issue is environmental, not hardware.', cost: 3 }
          ]
        },
        {
          prompt: 'Three APs share channel 6 with overlapping coverage. What do you determine?',
          methodology: 1,
          choices: [
            { text: 'Co-channel interference — too many APs on the same channel in close proximity', correct: true, feedback: 'Confirmed: your AP, plus two from the neighboring tenant, all on channel 6. The 2.4 GHz spectrum in this area is saturated.', cost: 0 },
            { text: 'The AP firmware needs updating to support better roaming', correct: false, feedback: 'Firmware is current. The issue is RF environment, not software capability.', cost: 1 },
            { text: 'Too many clients on the conference room AP', correct: false, feedback: 'Even with only 2 clients connected, speeds are poor in the conference room. Client count is not the primary issue.', cost: 1 },
            { text: 'WPA3 encryption overhead is causing slowdowns', correct: false, feedback: 'Encryption overhead is negligible. Same problem occurs regardless of security protocol.', cost: 2 }
          ]
        },
        {
          prompt: 'Co-channel interference from neighboring APs is confirmed. How do you resolve this?',
          methodology: 4,
          choices: [
            { text: 'Move your AP to a non-overlapping channel (1 or 11) and enable 5 GHz band steering', correct: true, feedback: 'AP moved to channel 1 on 2.4 GHz. 5 GHz band steering enabled for dual-band clients. Conference room speeds return to normal.', cost: 0 },
            { text: 'Disable 2.4 GHz entirely and use only 5 GHz', correct: false, feedback: 'Some legacy devices only support 2.4 GHz. Disabling it breaks connectivity for those clients.', cost: 1 },
            { text: 'Add a directional antenna pointed at the conference room', correct: false, feedback: 'Directional antenna focuses signal but does not reduce incoming interference from neighboring APs on the same channel.', cost: 2 },
            { text: 'Contact the neighboring tenant to coordinate channel assignments', correct: true, feedback: 'Coordinating with neighbors helps long-term. Combined with moving to a non-overlapping channel, interference is minimized.', cost: 0 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'Co-channel interference from multiple APs on the same 2.4 GHz channel', correct: true },
          { text: 'Defective wireless access point hardware', correct: false },
          { text: 'Conference room walls attenuating the wireless signal', correct: false },
          { text: 'Too many concurrent clients exceeding AP capacity', correct: false }
        ]
      }
    },
    {
      id: 'triage-cable',
      title: 'Intermittent Connectivity at Desk 14',
      description: 'A single user at desk 14 reports their network drops out every few minutes. Connection comes back on its own after 10-30 seconds. Other users on the same switch are fine.',
      difficulty: 1,
      steps: [
        {
          prompt: 'One user has intermittent drops. Others on the same switch are fine. What do you check?',
          methodology: 0,
          choices: [
            { text: 'Check interface error counters on the switch port for desk 14', correct: true, feedback: 'Switch port shows incrementing CRC errors and input errors. Link flaps logged every 2-5 minutes. Physical layer issue indicated.', cost: 0 },
            { text: 'Check the user workstation NIC driver and settings', correct: false, feedback: 'NIC driver is current. NIC diagnostics pass. When connected via a different cable run, the workstation works perfectly.', cost: 1 },
            { text: 'Move the user to a different switch port', correct: false, feedback: 'Problem follows the user to the new port — it is not a switch port failure. The cable run is the common factor.', cost: 1 },
            { text: 'Check for IP address conflicts', correct: false, feedback: 'No duplicate IP detected. ARP table shows only one MAC for this IP. Not an addressing issue.', cost: 2 }
          ]
        },
        {
          prompt: 'CRC errors and link flaps on the port. The cable run is suspect. How do you confirm?',
          methodology: 2,
          choices: [
            { text: 'Test the cable run with a cable tester/certifier', correct: true, feedback: 'Cable certifier shows pair 3-6 has intermittent continuity failure — the cable passes sometimes but fails under movement or temperature change. Near-end crosstalk also elevated.', cost: 0 },
            { text: 'Swap the patch cable at the desk', correct: false, feedback: 'Patch cable replaced. Link flaps continue. The issue is in the structured cabling (wall run), not the patch cord.', cost: 1 },
            { text: 'Check the patch panel connection in the telecom closet', correct: true, feedback: 'Inspecting the patch panel: desk 14 punch-down shows a loose wire on pin 3. Wire is not fully seated in the IDC slot.', cost: 0 },
            { text: 'Run a packet capture to look for errors', correct: false, feedback: 'Capture shows retransmissions and TCP resets during the outages, confirming drops, but does not identify the physical cause.', cost: 1 }
          ]
        },
        {
          prompt: 'Cable fault identified — loose punch-down on pair 3. What is the resolution?',
          methodology: 4,
          choices: [
            { text: 'Re-terminate the cable at the patch panel using a punch-down tool', correct: true, feedback: 'Pair 3 re-punched and seated properly. Cable certifier now shows all pairs passing. CRC errors stop and link is stable.', cost: 0 },
            { text: 'Run a completely new cable from the telecom closet to desk 14', correct: false, feedback: 'Works but excessive — the existing cable is fine except for the termination point. Running new cable is costly and time-consuming.', cost: 2 },
            { text: 'Add a network switch at the desk to boost the signal', correct: false, feedback: 'Hubs and switches do not fix physical layer cable faults. CRC errors will still occur on the bad segment.', cost: 3 },
            { text: 'Configure the switch port to ignore CRC errors', correct: false, feedback: 'You cannot configure a port to ignore CRC errors. Corrupt frames are always dropped at Layer 2.', cost: 3 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'Loose cable termination at the patch panel causing intermittent physical layer failures', correct: true },
          { text: 'Failing switch port with bad transceiver', correct: false },
          { text: 'Electromagnetic interference from nearby power cables', correct: false },
          { text: 'Workstation NIC set to wrong speed/duplex', correct: false }
        ]
      }
    },
    {
      id: 'triage-firewall',
      title: 'New Application Cannot Connect',
      description: 'A newly deployed web application on server 10.1.5.20 (port 8443) is unreachable from workstations. The server responds to pings and SSH (port 22) from the same workstations.',
      difficulty: 2,
      steps: [
        {
          prompt: 'The app on port 8443 is unreachable but ping and SSH work. What do you check first?',
          methodology: 0,
          choices: [
            { text: 'Verify the application is listening on port 8443 (netstat/ss on the server)', correct: true, feedback: 'ss -tlnp shows the app listening on 0.0.0.0:8443. The service is running and bound to all interfaces.', cost: 0 },
            { text: 'Check DNS resolution of the server hostname', correct: false, feedback: 'Hostname resolves to 10.1.5.20 correctly. You can already ping it — DNS is fine.', cost: 1 },
            { text: 'Restart the application service', correct: false, feedback: 'Service restarted. Still unreachable from workstations. The app was already running correctly.', cost: 2 },
            { text: 'Check if the workstation has a proxy configured', correct: false, feedback: 'No proxy configured. Direct connections are used. This is not a proxy issue.', cost: 1 }
          ]
        },
        {
          prompt: 'The app is listening. Ping and SSH work but port 8443 is blocked. What is the likely cause?',
          methodology: 1,
          choices: [
            { text: 'A firewall rule is blocking port 8443 (check host firewall and network firewall)', correct: true, feedback: 'The network firewall rule set allows ports 22, 80, 443 to the server subnet but has no rule for 8443. Traffic is being dropped by default-deny.', cost: 0 },
            { text: 'The application has an IP whitelist rejecting connections', correct: false, feedback: 'App configuration shows no IP restrictions. It accepts connections from any source.', cost: 1 },
            { text: 'Port 8443 is being NAT-translated to a different port', correct: false, feedback: 'NAT table shows no translation rules for this server. Traffic arrives with original destination port.', cost: 1 },
            { text: 'The server NIC has a VLAN tag mismatch', correct: false, feedback: 'If VLAN was wrong, ping and SSH would also fail. VLAN is correct.', cost: 2 }
          ]
        },
        {
          prompt: 'Firewall is blocking 8443. What is the proper remediation?',
          methodology: 4,
          choices: [
            { text: 'Add a firewall rule permitting TCP 8443 to 10.1.5.20 from the workstation subnet', correct: true, feedback: 'Rule added: permit tcp 10.1.1.0/24 host 10.1.5.20 eq 8443. Application is immediately accessible.', cost: 0 },
            { text: 'Disable the firewall entirely for testing', correct: false, feedback: 'Disabling the firewall exposes all services. This is a security violation even for testing.', cost: 3 },
            { text: 'Change the application to use port 443 instead', correct: false, feedback: 'Port 443 may conflict with another service, and changing app ports is not the correct solution for a firewall policy gap.', cost: 2 },
            { text: 'Move the server to the same subnet as the workstations', correct: false, feedback: 'This bypasses network segmentation security and is architecturally inappropriate.', cost: 3 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'Network firewall default-deny rule blocking port 8443 — no permit rule exists for the new app', correct: true },
          { text: 'Application crashed and is not listening on the port', correct: false },
          { text: 'DNS returning wrong IP address for the server', correct: false },
          { text: 'TCP port exhaustion on the server', correct: false }
        ]
      }
    },
    {
      id: 'triage-arp',
      title: 'Two Devices Fighting Over an IP',
      description: 'The monitoring system alerts that 10.1.1.50 is flapping between two MAC addresses. The server at that IP intermittently loses connectivity and logs show ARP conflicts.',
      difficulty: 3,
      steps: [
        {
          prompt: 'ARP conflict detected for 10.1.1.50. How do you identify the offending device?',
          methodology: 0,
          choices: [
            { text: 'Check the switch MAC address table for both MACs to find their ports', correct: true, feedback: 'MAC aa:bb:cc:11:22:33 is on port Gi0/5 (the legitimate server). MAC dd:ee:ff:44:55:66 is on port Gi0/12 — an unknown device.', cost: 0 },
            { text: 'Capture ARP traffic to see which device sends gratuitous ARPs', correct: true, feedback: 'Packet capture shows dd:ee:ff:44:55:66 broadcasting gratuitous ARP claiming 10.1.1.50 every 30 seconds. This is the rogue.', cost: 0 },
            { text: 'Shut down the server to see if the conflict stops', correct: false, feedback: 'Shutting down the production server causes an outage. The rogue device takes over the IP entirely now.', cost: 3 },
            { text: 'Flush the ARP cache on all devices', correct: false, feedback: 'ARP caches cleared, but within seconds the conflict returns as both devices reassert their claim.', cost: 2 }
          ]
        },
        {
          prompt: 'The rogue device is on port Gi0/12. What is your next step?',
          methodology: 2,
          choices: [
            { text: 'Administratively shut down port Gi0/12 to stop the conflict immediately', correct: true, feedback: 'Port shut. ARP flapping stops instantly. The legitimate server at 10.1.1.50 is now stable. You can trace the cable to identify the rogue device.', cost: 0 },
            { text: 'Change the legitimate server to a different IP address', correct: false, feedback: 'Moving the server IP requires DNS and application config changes across many systems. It avoids the conflict but does not address the rogue device.', cost: 2 },
            { text: 'Add a static ARP entry on the gateway for the correct MAC', correct: false, feedback: 'Static ARP on the gateway helps the gateway but other hosts on the segment still get poisoned by the gratuitous ARPs.', cost: 1 },
            { text: 'Enable port security on all switch ports', correct: false, feedback: 'Good long-term measure but takes time to configure across all ports. Does not immediately stop the conflict.', cost: 1 }
          ]
        },
        {
          prompt: 'Conflict stopped. What should you implement to prevent this in the future?',
          methodology: 5,
          choices: [
            { text: 'Enable Dynamic ARP Inspection (DAI) and DHCP snooping on the VLAN', correct: true, feedback: 'DAI validates ARP packets against the DHCP snooping binding table. Rogue ARP announcements will be dropped by the switch.', cost: 0 },
            { text: 'Assign static IPs to all devices on this subnet', correct: false, feedback: 'Static IPs do not prevent a rogue device from claiming any address. The device was likely already statically configured.', cost: 2 },
            { text: 'Move to a /30 subnet so only two IPs are available', correct: false, feedback: 'Impractical — this subnet has many legitimate hosts. Breaking it into /30s would require massive re-architecture.', cost: 3 },
            { text: 'Configure port security to limit one MAC per port', correct: true, feedback: 'Port security with MAC address limiting ensures only authorized devices connect. Combined with DAI, this provides defense in depth.', cost: 0 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'Rogue device statically configured with a duplicate IP sending gratuitous ARPs', correct: true },
          { text: 'DHCP server assigning the same IP to two different devices', correct: false },
          { text: 'ARP cache poisoning attack from a compromised workstation', correct: false },
          { text: 'Spanning tree reconvergence causing MAC table flapping', correct: false }
        ]
      }
    },
    {
      id: 'triage-stp',
      title: 'Network Meltdown After Switch Added',
      description: 'After connecting a new switch to the network, the entire VLAN experiences severe performance degradation. CPU on existing switches spikes to 100%. Broadcast storm detected.',
      difficulty: 3,
      steps: [
        {
          prompt: 'Broadcast storm after new switch added. What do you check immediately?',
          methodology: 0,
          choices: [
            { text: 'Check spanning tree topology — is the new switch participating in STP?', correct: true, feedback: 'The new switch has STP disabled entirely. Both uplink ports are forwarding, creating a Layer 2 loop between existing switches.', cost: 0 },
            { text: 'Disconnect the new switch immediately', correct: true, feedback: 'Disconnecting stops the broadcast storm instantly. Network recovers within seconds as the loop is broken.', cost: 0 },
            { text: 'Check the new switch for a firmware bug', correct: false, feedback: 'Firmware version check takes time while the network is melting down. This is not the priority.', cost: 2 },
            { text: 'Increase bandwidth on the uplinks to handle the extra traffic', correct: false, feedback: 'Broadcast storms consume infinite bandwidth — no amount of capacity will help. The loop must be broken.', cost: 3 }
          ]
        },
        {
          prompt: 'The new switch has STP disabled and two uplinks creating a loop. What do you verify before reconnecting?',
          methodology: 1,
          choices: [
            { text: 'Enable STP on the new switch and configure BPDU guard on edge ports', correct: true, feedback: 'STP enabled (RSTP mode to match the network). Root bridge priority set high so it does not become root. BPDU guard enabled on access ports.', cost: 0 },
            { text: 'Connect only one uplink to avoid the loop', correct: false, feedback: 'Single uplink works but removes redundancy. If that link fails, the switch is isolated. STP should handle dual uplinks.', cost: 1 },
            { text: 'Set the new switch as the root bridge for all VLANs', correct: false, feedback: 'Making a new edge switch the root bridge is architecturally wrong — it forces suboptimal traffic paths through an access-layer device.', cost: 3 },
            { text: 'Enable loop guard on all trunk ports', correct: false, feedback: 'Loop guard prevents loops when BPDUs stop being received but the root cause here is STP being entirely disabled on the new switch.', cost: 1 }
          ]
        },
        {
          prompt: 'STP is enabled on the new switch. What additional safeguards should exist on the existing infrastructure?',
          methodology: 5,
          choices: [
            { text: 'Enable BPDU guard on all access ports and root guard on distribution ports', correct: true, feedback: 'BPDU guard shuts down ports if an unauthorized switch is connected. Root guard prevents rogue switches from becoming root bridge. Defense in depth.', cost: 0 },
            { text: 'Disable all unused ports on existing switches', correct: false, feedback: 'Good security hygiene but does not specifically prevent STP issues when new switches are legitimately connected to active ports.', cost: 1 },
            { text: 'Enable storm control on all trunk ports', correct: true, feedback: 'Storm control rate-limits broadcast traffic. If a loop forms, the storm is contained before it saturates the network.', cost: 0 },
            { text: 'Change from RSTP to PVST+ for faster convergence', correct: false, feedback: 'Both protocols prevent loops when configured correctly. Changing the STP version does not address the root cause of a switch with STP disabled.', cost: 2 }
          ]
        }
      ],
      rootCause: {
        text: 'What is the root cause?',
        choices: [
          { text: 'New switch with STP disabled created a Layer 2 loop via dual uplinks', correct: true },
          { text: 'Trunk port misconfiguration causing VLAN leak between switches', correct: false },
          { text: 'MAC address table overflow causing flooding on all ports', correct: false },
          { text: 'Faulty switch hardware sending corrupted BPDUs', correct: false }
        ]
      }
    }
  ];

  function clearKeyHandler() {
    if (activeKeyHandler) {
      document.removeEventListener('keydown', activeKeyHandler);
      activeKeyHandler = null;
    }
  }

  function start(main) {
    container = main;
    sessionStats = { answered: 0, correct: 0, xpEarned: 0 };
    renderScenarioSelect();
  }

  function renderScenarioSelect() {
    clearKeyHandler();
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());

    const div = document.createElement('div');
    div.className = 'cable-container';
    div.style.animation = 'fadeIn 0.3s ease';

    div.innerHTML = `
      <h2 class="route-title">TRIAGE SIM</h2>
      <p class="route-subtitle">Troubleshoot network incidents. Choose wisely — wrong moves cost diagnostic budget.</p>
      <div class="scenario-grid"></div>
    `;

    const grid = div.querySelector('.scenario-grid');
    for (const scenario of SCENARIOS) {
      const card = document.createElement('div');
      card.className = 'mode-card';
      const diffLabel = Engine.DIFF_LABELS[scenario.difficulty] || 'medium';
      card.innerHTML = `
        <h3>${UI.escapeHtml(scenario.title)}</h3>
        <p>${UI.escapeHtml(scenario.description)}</p>
        <div class="mode-meta">
          <span class="mode-tag">DOMAIN 5</span>
          <span class="mode-tag difficulty-badge ${diffLabel}">${diffLabel.toUpperCase()}</span>
          <span class="mode-tag">${scenario.steps.length + 1} STEPS</span>
        </div>
      `;
      card.addEventListener('click', () => startScenario(scenario));
      grid.appendChild(card);
    }

    container.appendChild(div);
  }

  function startScenario(scenario) {
    currentScenario = scenario;
    currentStep = 0;
    budget = MAX_BUDGET;
    methodologyStep = 0;
    showStep();
  }

  function renderBudgetMeter() {
    const pct = Math.round((budget / MAX_BUDGET) * 100);
    let color = 'var(--accent)';
    if (pct <= 30) color = '#ff4444';
    else if (pct <= 60) color = '#ffaa00';
    return `
      <div class="mastery-bar-container" style="margin-bottom: 1rem;">
        <div class="mastery-label">
          <span>DIAGNOSTIC BUDGET</span>
          <span>${budget} / ${MAX_BUDGET}</span>
        </div>
        <div class="mastery-bar">
          <div class="mastery-fill" style="width: ${pct}%; background: ${color};"></div>
        </div>
      </div>
    `;
  }

  function renderMethodologyTracker(activeIdx) {
    return `
      <div class="methodology-tracker" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem;">
        ${METHODOLOGY_STEPS.map((step, i) => {
          let cls = 'mode-tag';
          if (i === activeIdx) cls += ' active-step';
          else if (i < activeIdx) cls += ' completed-step';
          return `<span class="${cls}" style="${i === activeIdx ? 'background: var(--accent); color: var(--bg);' : i < activeIdx ? 'opacity: 0.5;' : 'opacity: 0.3;'}">${step}</span>`;
        }).join('')}
      </div>
    `;
  }

  function showStep() {
    clearKeyHandler();
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const step = currentScenario.steps[currentStep];
    const methIdx = step ? step.methodology : 6;

    const wrapper = document.createElement('div');
    wrapper.className = 'question-container';
    wrapper.style.animation = 'fadeIn 0.3s ease';

    const shuffledChoices = UI.shuffleArray(step.choices);

    wrapper.innerHTML = `
      ${renderBudgetMeter()}
      ${renderMethodologyTracker(methIdx)}
      <div class="question-header">
        <div class="question-meta">
          <span class="difficulty-badge ${Engine.DIFF_LABELS[currentScenario.difficulty]}">${(Engine.DIFF_LABELS[currentScenario.difficulty] || 'medium').toUpperCase()}</span>
          <span class="domain-badge">D5 · Step ${currentStep + 1}/${currentScenario.steps.length + 1}</span>
        </div>
        <span class="question-number">${UI.escapeHtml(currentScenario.title)}</span>
      </div>
      <div class="question-card">
        ${currentStep === 0 ? `<div class="scenario-description" style="margin-bottom: 1rem; padding: 0.75rem; border-left: 3px solid var(--accent); opacity: 0.9;">${UI.escapeHtml(currentScenario.description)}</div>` : ''}
        <div class="question-text">${UI.escapeHtml(step.prompt)}</div>
        <div class="answers-list">
          ${shuffledChoices.map((c, i) => `<button class="answer-btn" data-idx="${i}">${UI.escapeHtml(c.text)}</button>`).join('')}
        </div>
      </div>
    `;

    let answered = false;
    const buttons = wrapper.querySelectorAll('.answer-btn');

    buttons.forEach((btn, btnIdx) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const choiceIdx = parseInt(btn.dataset.idx);
        const choice = shuffledChoices[choiceIdx];
        const correct = choice.correct;

        budget -= choice.cost;
        if (budget < 0) budget = 0;

        sessionStats.answered++;
        if (correct) sessionStats.correct++;

        buttons.forEach(b => {
          b.classList.add('disabled');
          const bIdx = parseInt(b.dataset.idx);
          if (shuffledChoices[bIdx].correct) {
            b.classList.add(correct && b === btn ? 'correct' : 'show-correct');
          }
        });
        if (!correct) btn.classList.add('incorrect');

        if (correct) {
          const rect = btn.getBoundingClientRect();
          UI.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        const exp = document.createElement('div');
        exp.className = 'explanation-card';
        exp.innerHTML = `
          <h4>// ${correct ? 'GOOD CALL' : 'COSTLY MOVE'}${choice.cost > 0 ? ' (-' + choice.cost + ' budget)' : ''}</h4>
          <p>${UI.escapeHtml(choice.feedback)}</p>
        `;
        wrapper.querySelector('.question-card').appendChild(exp);

        // Update budget display
        const budgetContainer = wrapper.querySelector('.mastery-bar-container');
        if (budgetContainer) {
          budgetContainer.outerHTML = renderBudgetMeter();
        }

        if (budget <= 0) {
          const failDiv = document.createElement('div');
          failDiv.className = 'explanation-card';
          failDiv.innerHTML = `
            <h4>// BUDGET EXHAUSTED</h4>
            <p>You ran out of diagnostic budget. The incident escalates to a senior engineer.</p>
            <p><strong>Root cause was:</strong> ${UI.escapeHtml(currentScenario.rootCause.choices.find(c => c.correct).text)}</p>
          `;
          wrapper.querySelector('.question-card').appendChild(failDiv);

          Engine.recordAnswer(currentScenario.id, DOMAIN_ID, currentScenario.difficulty, false);
          UI.updateHeader();

          const retryBtn = document.createElement('button');
          retryBtn.className = 'next-btn';
          retryBtn.textContent = 'TRY AGAIN';
          retryBtn.addEventListener('click', () => startScenario(currentScenario));
          wrapper.appendChild(retryBtn);

          const menuBtn = document.createElement('button');
          menuBtn.className = 'next-btn';
          menuBtn.style.marginLeft = '0.5rem';
          menuBtn.textContent = 'ALL SCENARIOS';
          menuBtn.addEventListener('click', renderScenarioSelect);
          wrapper.appendChild(menuBtn);
        } else {
          const nextBtn = document.createElement('button');
          nextBtn.className = 'next-btn';
          nextBtn.textContent = 'NEXT →';
          nextBtn.addEventListener('click', () => {
            currentStep++;
            if (currentStep < currentScenario.steps.length) {
              showStep();
            } else {
              showRootCause();
            }
          });
          wrapper.appendChild(nextBtn);

          setTimeout(() => {
            activeKeyHandler = (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                currentStep++;
                if (currentStep < currentScenario.steps.length) {
                  showStep();
                } else {
                  showRootCause();
                }
              }
            };
            document.addEventListener('keydown', activeKeyHandler);
          }, 200);
        }

        container.appendChild(wrapper);
      });
    });

    container.appendChild(wrapper);
  }

  function showRootCause() {
    clearKeyHandler();
    container.innerHTML = '';
    container.appendChild(UI.renderBackButton());
    container.appendChild(UI.renderSessionStats(sessionStats));

    const rc = currentScenario.rootCause;
    const shuffledChoices = UI.shuffleArray(rc.choices);

    const wrapper = document.createElement('div');
    wrapper.className = 'question-container';
    wrapper.style.animation = 'fadeIn 0.3s ease';

    wrapper.innerHTML = `
      ${renderBudgetMeter()}
      ${renderMethodologyTracker(6)}
      <div class="question-header">
        <div class="question-meta">
          <span class="difficulty-badge ${Engine.DIFF_LABELS[currentScenario.difficulty]}">${(Engine.DIFF_LABELS[currentScenario.difficulty] || 'medium').toUpperCase()}</span>
          <span class="domain-badge">D5 · ROOT CAUSE</span>
        </div>
        <span class="question-number">${UI.escapeHtml(currentScenario.title)}</span>
      </div>
      <div class="question-card">
        <div class="question-text">${UI.escapeHtml(rc.text)}</div>
        <div class="answers-list">
          ${shuffledChoices.map((c, i) => `<button class="answer-btn" data-idx="${i}">${UI.escapeHtml(c.text)}</button>`).join('')}
        </div>
      </div>
    `;

    let answered = false;
    const buttons = wrapper.querySelectorAll('.answer-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const choiceIdx = parseInt(btn.dataset.idx);
        const choice = shuffledChoices[choiceIdx];
        const correct = choice.correct;

        sessionStats.answered++;
        if (correct) sessionStats.correct++;

        // Calculate XP based on remaining budget
        const budgetBonus = correct ? budget : 0;
        const baseXp = Engine.XP_MAP[currentScenario.difficulty] || 25;
        const totalXp = correct ? baseXp + (budgetBonus * 5) : 0;

        const result = Engine.recordAnswer(currentScenario.id, DOMAIN_ID, currentScenario.difficulty, correct);
        if (correct) sessionStats.xpEarned += result.xp;
        UI.updateHeader();

        buttons.forEach(b => {
          b.classList.add('disabled');
          const bIdx = parseInt(b.dataset.idx);
          if (shuffledChoices[bIdx].correct) {
            b.classList.add(correct ? 'correct' : 'show-correct');
          }
        });
        if (!correct) btn.classList.add('incorrect');

        if (correct) {
          const rect = btn.getBoundingClientRect();
          UI.spawnParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        const exp = document.createElement('div');
        exp.className = 'explanation-card';
        if (correct) {
          exp.innerHTML = `
            <h4>// INCIDENT RESOLVED +${result.xp} XP</h4>
            <p>Correct! Budget remaining: ${budget}/${MAX_BUDGET}</p>
            <p><strong>${UI.escapeHtml(shuffledChoices.find(c => c.correct).text)}</strong></p>
          `;
        } else {
          exp.innerHTML = `
            <h4>// INCORRECT DIAGNOSIS</h4>
            <p><strong>Root cause:</strong> ${UI.escapeHtml(shuffledChoices.find(c => c.correct).text)}</p>
          `;
        }
        wrapper.querySelector('.question-card').appendChild(exp);

        const btnRow = document.createElement('div');
        btnRow.style.display = 'flex';
        btnRow.style.gap = '0.5rem';
        btnRow.style.marginTop = '1rem';

        const retryBtn = document.createElement('button');
        retryBtn.className = 'next-btn';
        retryBtn.textContent = 'RETRY';
        retryBtn.addEventListener('click', () => startScenario(currentScenario));
        btnRow.appendChild(retryBtn);

        const menuBtn = document.createElement('button');
        menuBtn.className = 'next-btn';
        menuBtn.textContent = 'ALL SCENARIOS';
        menuBtn.addEventListener('click', renderScenarioSelect);
        btnRow.appendChild(menuBtn);

        wrapper.appendChild(btnRow);

        setTimeout(() => {
          activeKeyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              renderScenarioSelect();
            }
          };
          document.addEventListener('keydown', activeKeyHandler);
        }, 200);
      });
    });

    container.appendChild(wrapper);
  }

  return { start };
})();

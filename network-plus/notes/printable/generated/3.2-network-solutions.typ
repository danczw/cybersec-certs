#import "../notes-style.typ": *

#start-note("3.2 — Network Solutions", "3.0 Network Operations", "3.2")

#columns(2, gutter: 5mm)[



#section-heading("Network Discovery")


- Techniques for identifying devices on the network:
  - *LLDP* (Link Layer Discovery Protocol): standard discovery protocol on switches
  - *CDP* (Cisco Discovery Protocol): Cisco's proprietary version
  - Ping scans and port scans
  - Commercial network scanners
  - SNMP
- Some organizations run discovery scans nightly to track what's installed
- Others run scans only during troubleshooting
- Daily scans + reporting can reveal what traffic is on the network and which devices are sending it

#section-heading("Traffic Analysis")


- Detailed frame-by-frame / packet-by-packet description of traffic flowing across the network
- Often summarized into simplified views
- Firewall log data includes:
  - Timestamp of each traffic flow
  - Protocol (TCP/UDP)
  - Port numbers
  - Client IP address and server IP address
  - Host names (via DNS resolution)
  - Bytes transferred
- Stored long-term for reports and forensics

#section-heading("Performance Monitoring")


- Gathering overall performance data from devices:
  - Network utilization statistics
  - Error overview
- Methods: SNMP, NetFlow statistics, protocol analysis (frame level), software agents on devices
- Helps determine if network is highly utilized or experiencing errors

#section-heading("Availability Monitoring")


- Simple metric: device is up (green) or down (red)
- Provides instant visibility into device status
- Can trigger alarms and alerts:
  - Email messages
  - Helpdesk tickets
  - Notifications to responsible staff
- Real-time view of current status
- Historical data collected over time for availability reports
- For deeper performance details, drill down into NetFlow or SNMP

#section-heading("Configuration File Management")


- Devices (switches, routers, firewalls) have configuration files
- Can back up and restore configurations
- Configuration files may be version-specific:
  - Older config may not load on a newer software version
  - May need to downgrade firmware/software to restore an older config
- Must store both configuration files and previous firmware/software versions
- Multiple identical devices (e.g., 10 web servers): compare and contrast configs to verify consistency
- Ongoing monitoring of config files with alerts if unauthorized changes occur
- Integrated with change control process — standardized method for modifying configurations

]

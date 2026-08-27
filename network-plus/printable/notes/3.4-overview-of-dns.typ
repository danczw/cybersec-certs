#import "../notes-style.typ": *

#start-note("3.4 — An Overview of DNS", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("Purpose")


- Translates domain names (e.g., www.professormesser.com) into IP addresses
- A hierarchical database of names

#section-heading("DNS Hierarchy")


- Starts at the root (single dot `.`)
- Below the root: Top Level Domains (TLDs)
  - Generic: .com, .org, .net, etc.
  - Country codes: .us, .ca, .uk, etc.
- Below TLDs: domain names (e.g., professormesser)
- Full path from host to root = Fully Qualified Domain Name (FQDN)
  - Example: www.professormesser.com

#sub-heading("DNS Hierarchy Diagram")

```
                     . (root)              ← Root
                        │
         ┌────────┬─────┴─────┬────────┐
         │        │           │        │
       .com     .net        .edu     .org  ← TLDs
         │
  .professormesser                         ← Second-Level
         │
  ┌──────┼──────┬──────┬──────┐
  │      │      │      │      │
 www   live   mail   east   west           ← Subdomains
                       │      │
                    ┌──┴──┐ ┌─┴──┐
                    │     │ │    │
                  trey katie ethan judy    ← Hosts
```

#section-heading("DNS Infrastructure")


- Root DNS servers: 13 server clusters, over 1,000 actual servers
- Root servers manage the TLDs
- Organizations can structure subdomains under their domain (e.g., east.professormesser.com, west.professormesser.com)

#section-heading("DNS Server Types")


#sub-heading("Primary DNS Server")

- Contains all zone information for the DNS domain
- All configuration changes and updates happen here

#sub-heading("Secondary DNS Server")

- Receives zone information from the primary server (read-only)
- Provides redundancy — if primary is unavailable, secondary still resolves
- End users cannot tell which server answered their query

#section-heading("Local Name Resolution (Hosts File)")


- Resolves names locally without querying a DNS server
- Use cases: testing servers, overriding incorrect DNS information
- File name: `hosts`
- Windows location: `windows/system32/drivers/etc/hosts`
- Simple text file mapping IP addresses to names
- Stored as read-only by default — must change permissions to edit
- Some applications ignore the hosts file and query DNS directly — check documentation

#section-heading("Forward and Reverse Lookups")


#sub-heading("Forward Lookup")

- Provide a name → DNS returns an IP address
- Most common DNS operation

#sub-heading("Reverse Lookup (Reverse DNS)")

- Provide an IP address → DNS returns a name
- Must be separately configured on the DNS server
- The forward name and reverse name may differ

#section-heading("Authoritative vs. Nonauthoritative")


#sub-heading("Authoritative Server")

- The primary DNS server for a DNS zone
- The authority for all records in that domain

#sub-heading("Nonauthoritative Server")

- A secondary server or caching server
- Returns cached information, not directly from the zone owner
- Cached information could be outdated if the authoritative server was recently changed

#section-heading("Time to Live (TTL)")


- Configured on the authoritative DNS server
- Specifies how long (in seconds) a nonauthoritative server may cache a record
- After TTL expires, cached data is deleted and subsequent queries go to the authoritative server
- Example: TTL of 300 = information cached for a maximum of 5 minutes

#section-heading("Recursive DNS Queries")


- Process by which a local DNS server resolves a name on behalf of the client
- The client (resolver) only contacts its local DNS server
- Local DNS server does all the work behind the scenes
- Results are cached for subsequent requests

#sub-heading("Recursive Query Process")

+ Resolver sends query to local DNS server (e.g., www.professormesser.com)
+ Local DNS server queries root server → root returns address of .com name server
+ Local DNS server queries .com name server → returns address of professormesser.com name server
+ Local DNS server queries professormesser.com name server → returns IP for www.professormesser.com
+ Local DNS server returns answer to resolver and caches it

#section-heading("DNS Security")


#sub-heading("Problems with Traditional DNS")

- Traffic sent in the clear — anyone monitoring can see queried hostnames
- Responses are not authenticated — no way to verify responses are legitimate (could be spoofed)

#sub-heading("DNSSEC (Domain Name Security Extensions)")

- Digitally signs DNS responses
- Verifies responses came from a trusted source
- Confirms data has not been modified in transit
- Requires additional configuration on the DNS server
- Does NOT encrypt traffic — queries are still visible

#sub-heading("DNS over TLS (DoT)")

- Encrypts DNS traffic using TLS
- Uses TCP port 853
- Similar encryption to HTTPS web communication

#sub-heading("DNS over HTTPS (DoH)")

- Sends DNS queries over standard HTTPS
- Uses TCP port 443
- Traffic looks identical to normal encrypted web traffic in packet captures
- Some modern browsers use DoH by default

]

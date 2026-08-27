#import "../template.typ": *

#start-note("3.4 — DNS Records", "3.0 Network Operations", "3.4")

#columns(2, gutter: 5mm)[



#section-heading("Resource Records")


- Individual entries in a DNS configuration file
- Each record provides different types of information:
  - Name-to-IP resolution
  - Certificates for DNS validation
  - Aliases of host names
  - Mail server locations
  - And many others

#section-heading("SOA (Start of Authority)")


- First record at the top of a DNS configuration file
- Provides an overview of the DNS zone:
  - DNS zone details (which domain this config belongs to)
  - Serial number
  - Retry information
  - Expiration details
  - How long information should be stored

#section-heading("A and AAAA Records")


- Define the IP address of a host — the core record for name resolution
- A record: IPv4 address
- AAAA record: IPv6 address
- Same functionality, different IP version
- Example A record: `www.professormesser.com IN A 162.159.246.164`

#section-heading("CNAME (Canonical Name) Record")


- Creates an alias that points to another name
- Use case: single server with one IP address referenced by multiple names
- Querying a CNAME requires two lookups:
  1. DNS returns the canonical name (the target)
  2. If the target IP is not cached, a second query resolves the target's IP
- Example:
  - chat.example.com → CNAME → mail.example.com
  - ftp.example.com → CNAME → mail.example.com
  - www.example.com → CNAME → mail.example.com

#section-heading("MX (Mail Exchanger) Record")


- Specifies the mail server responsible for receiving email for the domain
- Resolving the MX record gives a name (e.g., mail.example.com), not an IP
- A separate A record lookup is needed to get the mail server's IP address

#section-heading("TXT (Text) Record")


- Stores human-readable text information in DNS
- Used for multiple purposes:

#sub-heading("SPF (Sender Policy Framework)")

- Specifies which email servers are authorized to send mail on behalf of the domain
- Prevents unauthorized servers from spoofing email
- Receiving mail servers check the SPF record to verify the sender is authorized

#sub-heading("DKIM (Domain Keys Identified Mail)")

- Digitally signs outgoing emails
- The public key needed to verify signatures is stored in a TXT record
- Receiving servers use the public key from DNS to verify the digital signature

#section-heading("NS (Name Server) Record")


- Specifies where the name servers for the domain are located
- Critical for name resolution — without NS records, the domain cannot be found
- Multiple NS records provide redundancy (e.g., ns1.example.com, ns2.example.com)

#section-heading("PTR (Pointer) Record")


- Used for reverse DNS lookups — resolves an IP address to a name
- Separate from forward (A/AAAA) records; must be configured independently
- IP addresses are stored in reverse order in the DNS configuration
- Example: querying 192.168.23.15 returns www.example.com

]

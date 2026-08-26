#import "template.typ": *

#start-note("4.3 — Security Rules", "4.0 Network Security", "4.3")

#columns(2, gutter: 5mm)[



#section-heading("Access Control Lists (ACLs)")


- List of traffic that is allowed and traffic that is disallowed
- Criteria can include: source IP, destination IP, port number, time of day, application
- Can combine criteria into complex rules
- Can group IP addresses — some allowed, some denied
- Found on: routers, firewalls, operating systems, anything that makes access decisions

#section-heading("Firewall Rules")


- Complex form of an ACL
- Components: rule name, source/destination zone, source/destination address, destination port, username
- Very specific and fine-grained security controls

#sub-heading("Rule Processing")

- Interpreted top-to-bottom — first match wins
- More specific rules placed at the top
- More general rules placed lower
- *Implicit deny* — if no rule matches, traffic is automatically denied (no explicit rule needed)

#sub-heading("Example Rule Set")

#table(
  columns: 6,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Rule],
    text(fill: white, weight: "bold")[Remote IP],
    text(fill: white, weight: "bold")[Remote Port],
    text(fill: white, weight: "bold")[Local Port],
    text(fill: white, weight: "bold")[Protocol],
    text(fill: white, weight: "bold")[Action],
  ),
  [1],   [All],   [Any],   [22 (SSH)],   [TCP],   [Allow],
  [2],   [All],   [Any],   [80 (HTTP)],   [TCP],   [Allow],
  [3],   [All],   [Any],   [443 (HTTPS)],   [TCP],   [Allow],
  [4],   [All],   [Any],   [3389 (RDP)],   [TCP],   [Allow],
  [5],   [All],   [53 (DNS)],   [Any],   [UDP],   [Allow],
  [6],   [All],   [123 (NTP)],   [Any],   [UDP],   [Allow],
  [7],   [All],   [Any],   [Any],   [ICMP],   [Deny],
)


#callout("Supplementary")[
  Rules 1–4 are *incoming* (allowing outside devices to connect to local services). Rules 5–6 are *outgoing* (allowing this server to make DNS/NTP requests). Rule 7 is *incoming* (denying inbound ICMP/ping).
]


#section-heading("Content Filtering")


#sub-heading("URL Filtering")

- Filter traffic based on specific URLs or categories of URLs (auction, hacking, travel, recreation, etc.)
- Also called URI (Uniform Resource Identifier) filtering
- Uses Allow lists and Block lists
- Categories are easier to manage than individual URLs
- Users try to circumvent — combine with firewall rules
- Most next-generation firewalls have URL filtering built in

#sub-heading("Other Content Filtering")

- Filter based on data content: internal documents, financial details
- Prevent non-safe-for-work content
- Parental controls at home
- Antivirus/antimalware — filters malicious software in network traffic

#section-heading("Screened Subnet")


- Separate area of the network for services made available to the public
- Hosts public web servers, public email servers
- Visitors directed to screened subnet, away from internal services
- Internal network remains isolated — internal users can still reach the internet

```
                    +----------------------------+
                    |     Screened Subnet        |
                    |  [Switch] --- [Server]     |
                    +-------------+--------------+
                                  |
                                  |
   [Internet] ---- [Firewall] ----+
                                  |
                                  |
                    +-------------+--------------+
                    |     Internal Network       |
                    | [Switch] --- [Workstation] |
                    +----------------------------+
```

#section-heading("Security Zones")


- Broad labels used in firewall rules instead of IP address ranges
- Simplify security policies — rules reference zone names instead of specific addresses

#sub-heading("Examples of Zones")

- Trusted / Untrusted
- Internal / External
- Inside / Internet / Server / Databases / Screened subnet

#sub-heading("Zone-Based Firewall Rules")

- "Trusted zone can communicate to untrusted zone" — no IPs or ports needed
- "Untrusted zone can access screened subnet"
- "Untrusted zone denied from trusted zone"
- More zones = more granularity in firewall rules

]

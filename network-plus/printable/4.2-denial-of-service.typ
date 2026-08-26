#import "template.typ": *

#start-note("4.2 — Denial of Service", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("DoS Overview")


- Action or series of actions that causes a service to fail
- Often an overloading of a system so no resources are available to legitimate users
- Methods:
  - Overwhelm server capabilities
  - Exploit a vulnerability in an OS or application to cause failure
- Motivations:
  - Competitive advantage (competitors identified as attackers)
  - Distraction — keep troubleshooting resources busy while attacking another part of the network
- Physical DoS: pulling main power for an entire facility

#section-heading("Accidental Denial of Service")


- Connecting switches without spanning tree protocol → network loop → traffic overwhelms switches
- Downloading a large file (e.g., Linux distribution) on limited-bandwidth internet connection
- Physical environment issues: water leak or roof leak taking out part of a data center

#section-heading("DDoS (Distributed Denial of Service)")


- Multiple devices acting in unison to cause a denial of service
- Example: botnet takes over millions of personal computers, all directing traffic at one server
- Coordinated attack from devices located anywhere in the world
- *Asymmetric threat* — attacker uses very few resources to bring down systems with many more resources

#section-heading("DDoS Reflection and Amplification")


- Attacker sends small amount of information; internet protocols multiply it into much larger traffic directed at victim
- Doesn't require many resources from the attacker
- Protocols used for amplification: NTP, DNS, ICMP

#sub-heading("DNS Amplification Example")

- Normal DNS query: small request, small response (IP address)
- Amplified DNS query: request with ANY parameter returns much larger response (e.g., DNSSEC key information)
- Example: 28-byte query → 1,300-byte response

#sub-heading("DNS Amplification Attack Flow")

+ Botnet command and control sends instructions to botnet
+ Botnet sends small DNS queries to open DNS resolvers on the internet
+ Botnet devices spoof the source address to be the victim's IP
+ DNS resolvers send amplified responses to the victim (spoofed address)
+ Amplified traffic overwhelms victim's web server resources

]

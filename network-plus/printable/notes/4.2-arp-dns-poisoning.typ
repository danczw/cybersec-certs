#import "../template.typ": *

#start-note("4.2 — ARP and DNS Poisoning", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("Spoofing")


- Pretending to be another person or device
- Examples: fake web server, fake DNS server, email address spoofing, caller ID spoofing
- Commonly used for on-path attacks — sitting in the middle of a conversation to monitor or change its contents

#callout("Supplementary")[
  ARP = Address Resolution Protocol — resolves IP addresses to MAC addresses on a local network.
]


#section-heading("ARP Poisoning (IP Spoofing)")


- Attacker pretends to be an IP address they are not
- Also called IP spoofing

#sub-heading("How ARP Works")

+ Device needs the MAC address of another device it wants to communicate with (only has the IP)
+ ARP sends a broadcast: "Who has [IP address]? I need that MAC address."
+ Device with that IP responds with its MAC address
+ Requester caches the response in a local ARP cache

#sub-heading("The Vulnerability")

- No authentication or security in the ARP process
- ARP accepts any response, even unsolicited ones

#sub-heading("ARP Poisoning Attack")

+ Attacker sends an ARP response to the victim — even without a request
+ Response spoofs the router's IP but contains the attacker's MAC address
+ Victim's ARP cache is updated with the attacker's MAC for the router's IP
+ All traffic from victim to router is now sent to the attacker first
+ Attacker forwards traffic to the legitimate router — neither victim nor router knows

#sub-heading("Result")

- On-path attack: attacker intercepts and forwards all traffic between victim and router
- Neither side realizes there's an attacker in the middle

#section-heading("DNS Poisoning (DNS Spoofing)")


- Modifying information on the DNS server itself, or modifying DNS responses in transit
- Also called DNS spoofing

#sub-heading("Methods")

- *Modify the host file on the client* — host file has higher priority than DNS responses; entries always take precedence over DNS
- *Send fake responses to legitimate DNS requests* — requires changing information on the fly (on-path attack)
- *Hack into the DNS server* — change the DNS configuration directly

#sub-heading("DNS Poisoning Attack Flow")

+ DNS server contains the legitimate IP for a domain
+ Attacker either performs ARP poisoning to intercept DNS traffic, or hacks the DNS server directly
+ Attacker changes the stored IP to the attacker's IP
+ Subsequent DNS queries return the poisoned address
+ Victim's cache stores the spoofed IP
+ Victim communicates with the attacker's server instead of the legitimate one

]

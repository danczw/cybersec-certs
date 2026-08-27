#import "../template.typ": *

#start-note("4.1 — Security Technologies", "4.0 Network Security", "4.1")

#columns(2, gutter: 5mm)[



#section-heading("Honeypots")


- Virtual network with virtual servers/components designed to attract attackers
- Attacks are usually automated scripts/programs, not interactive humans
- Purpose: observe attacker behavior and techniques
- Many open-source versions available
- Constant battle: attackers are good at detecting what's real vs. fake

#section-heading("Honeynets")


- Larger deception framework combining multiple honeypot components
- Includes: servers, workstations, routers, firewalls, switches, proxy servers, NAS
- Commonly virtual devices — can build any number to attract attackers
- Goal: make the environment seem real enough for attackers to move laterally

#section-heading("Risk")


- Exposure to something harmful or dangerous
- Describes how possible it is for something bad to happen
- Constant concern for every organization; grows with organization size
- Must be considered when: expanding, adding applications, making configuration changes
- Used in business decisions: continue with a task or add security controls

#section-heading("Vulnerabilities")


- Weaknesses in a system (e.g., operating system, application)
- If exploited, could allow unauthorized access to systems or data
- Undiscovered vulnerabilities may have existed for months or years
- Types:
  - Data injection
  - Authentication flaws
  - Exposed data
  - Security misconfiguration

#section-heading("Exploits")


- When someone takes advantage of a vulnerability to gain access to a system or data
- Can be straightforward (e.g., embedded username in code) or complex (multi-step attack)
- Distinct from vulnerability: vulnerability = weakness, exploit = act of using it

#section-heading("Threats")


- What is used by an attacker to exploit a vulnerability
- Can be intentional (attacker) or accidental (fire, flood)
- Internet threats often originate outside the organization

#sub-heading("Threat Process")

+ Operating system has a vulnerability
+ Threat agent creates a threat action
+ Threat action exploits the vulnerability
+ Result: system unavailability, data breach, or data exposure

#section-heading("CIA Triad")


- Three fundamental principles of IT security
- Also called AIC triad (to differentiate from Central Intelligence Agency)

#sub-heading("Confidentiality")

- Protecting data from unauthorized access
- Methods: restricting access, encrypting data

#sub-heading("Integrity")

- Data has not been modified by unauthorized third parties
- Messages across network can't be modified without detection
- Commonly associated with digital signatures

#sub-heading("Availability")

- Systems and data remain accessible to authorized users
- Security measures must not impair overall system access

]

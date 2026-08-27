#import "../notes-style.typ": *

#start-note("4.2 — Social Engineering", "4.0 Network Security", "4.2")

#columns(2, gutter: 5mm)[



#section-heading("Phishing")


- Social engineering with spoofing — pretending to be someone else to obtain personal information
- Indicators of phishing:
  - URL doesn't match the expected domain
  - Graphics slightly off
  - Spelling/grammar errors
  - Mismatched fonts
  - Generic greeting ("Dear User")
  - Missing punctuation
  - Sender's email domain doesn't match the claimed organization
- Goal: trick victim into entering credentials on a fake page, sending them directly to the attacker
- Never click links inside email messages

#section-heading("Shoulder Surfing")


- Viewing someone's screen in a public location (airport, restaurant, coffee shop)
- Can also be done from a distance using binoculars or a telescope from another building
- Advanced version: malware enabling the victim's camera to watch them remotely

#sub-heading("Mitigation")

- Be aware of surroundings — sit with back to wall
- Avoid viewing sensitive information in public
- Use privacy filters on LCD screens — display appears black from side angles
- Position monitors away from windows (also helps with glare)

#section-heading("Tailgating")


- Following an authorized person through a secured door without their knowledge
- Example: catching a door before it closes after someone badges in and walks away

#section-heading("Piggybacking")


- Authorized person knowingly lets an unauthorized person in
- Example: carrying donuts/lunch and asking someone to hold the door

#sub-heading("Tailgating/Piggybacking Mitigation")

- Visitor badge policy — visitors must wear visible badges
- Challenge people without badges — ask where their badge is
- One-person-at-a-time badging — physically close door between each person
- Access control vestibule (airlock) — mechanical enforcement allowing only one person at a time
- Train employees to look for things out of the ordinary

#section-heading("Dumpster Diving")


- Going through an organization's trash to find sensitive information
- Garbage bins often open and unlocked
- Information found: names (for impersonation/phishing), contact information, project details
- Best timing: end of a quarter or end of a big project
- Legality (US): generally legal if trash has been thrown out, unless on private property with no-trespassing signs or local/state regulations prohibit it

#sub-heading("Mitigation")

- Lock up garbage bins
- Fence around the area
- Monitoring cameras
- Shred sensitive information (or use third-party shredding service)
- Burn sensitive documents (common in government)

]

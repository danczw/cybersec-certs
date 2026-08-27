#import "../template.typ": *

#start-note("2.3 — Wireless Encryption", "2.0 Network Implementation", "2.3")

#columns(2, gutter: 5mm)[



#section-heading("Wireless Security Goals")


- Authentication: limit network access (username, password, multi-factor)
- Confidentiality: encrypt all data sent over the wireless network
- Integrity: message integrity check verifies received data matches what was sent

#section-heading("WEP (Wired Equivalent Privacy)")


- One of the first wireless encryption methods
- Has significant cryptographic vulnerabilities
- Needed to be replaced quickly

#section-heading("WPA (Wi-Fi Protected Access)")


- Temporary stopgap between insecure WEP and a more secure replacement
- Designed to work on the same hardware as WEP
- Known to need enhanced security beyond what this initial version provided

#section-heading("WPA2 (Wi-Fi Protected Access Version 2)")


- Available since 2004
- Uses CCMP (Counter Mode with Cipher Block Chaining Message Authentication Code Protocol / Counter/CBC-MAC)
- Combines encryption and integrity in the same protocol
- Encryption: AES
- Message integrity check: CBC-MAC

#section-heading("WPA3 (Wi-Fi Protected Access Version 3)")


- Introduced in 2018
- Uses GCMP (Galois Counter Mode Protocol)
- Encryption: AES
- Message integrity check: GMAC (Galois Message Authentication Code)

#section-heading("Best Practice")


- Use the highest level of security available on APs and client devices
- Upgrade all devices to use the most capable security method available

]

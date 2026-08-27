#import "../notes-style.typ": *

#start-note("4.1 — Regulatory Compliance", "4.0 Network Security", "4.1")

#columns(2, gutter: 5mm)[



#section-heading("Compliance Overview")


- Ongoing challenge: maintaining compliance with laws, policies, procedures, or rules
- Some compliance driven by type of business; others by state, local, or international laws
- Consequences of non-compliance: fines, incarceration, or loss of employment
- Scope: national, territory, state, domestic, or international requirements

#section-heading("Data Localization")


- Data collected by a country must stay inside that country
- Must understand where data is supposed to be located and where it can move once stored

#section-heading("GDPR (General Data Protection Regulation)")


- Regulation associated with the European Union
- Protects privacy of data associated with individuals residing in the EU
- Protected data includes: name, address, photo, email address, bank information, websites visited
- Requirements:
  - Data collected on EU citizens must be stored in the EU (data localization)
  - Users can decide where their data goes
  - Users can choose to have their data removed from sites
- Goal: give individuals control over their own data
- Often described as "right to be forgotten" — better described as a way for individuals to protect data they own

#section-heading("PCI DSS (Payment Card Industry Data Security Standard)")


- Not a law — a standard created by the payment card industry
- Designed to protect credit card information
- Organizations are audited for compliance
- Non-compliance consequence: may lose ability to process credit cards

#sub-heading("Six Areas of Focus")

+ *Build and maintain secure networks and systems* — protect data moving across the network
+ *Protect cardholder data* — especially private information
+ *Maintain a vulnerability management program* — critical for organizations storing credit card data
+ *Implement strong access control measures* — limit who can access credit card data
+ *Regularly monitor and test networks* — ensure policies are working as expected
+ *Maintain an information security policy* — broader scope protecting all organizational data

]

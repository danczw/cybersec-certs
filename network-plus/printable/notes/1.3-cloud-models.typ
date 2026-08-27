#import "../notes-style.typ": *

#start-note("1.3 — Cloud Models", "1.0 Networking Concepts", "1.3")

#columns(2, gutter: 5mm)[



#section-heading("Cloud Deployment Types")


- *Public cloud* — accessible to anyone on the internet
- *Private cloud* — internal use only, deployed in your own virtualized local data center
- *Hybrid cloud* — combination of public and private clouds for different applications

#section-heading("Software as a Service (SaaS)")


- On-demand software accessed via browser login
- Someone else writes, manages, and upgrades the application
- Your data stored on a third-party cloud platform
- No local installation, no development work required
- Centralized management of application and data
- Complete application offering
- Examples: Google Mail, Office 365

#section-heading("Infrastructure as a Service (IaaS)")


- Also called Hardware as a Service (HaaS)
- Cloud provides computing resources (hardware); you install and manage your own software
- You handle upgrades, data, access, and security
- Data in cloud but you have more control
- Example: web hosting where you buy server time

#section-heading("Platform as a Service (PaaS)")


- Middle ground between SaaS and IaaS
- Cloud provider gives you tools/building blocks to develop your own application
- You manage development and customization
- Provider manages the underlying engine/platform that runs the application
- You maintain apps; provider maintains platform
- Example: Salesforce.com

#section-heading("Cloud Responsibility Matrix")


#block(breakable: false)[
#table(
  columns: 5,
  inset: (x: 3pt, y: 2.5pt),
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Layer],
    text(fill: white, weight: "bold")[SaaS],
    text(fill: white, weight: "bold")[PaaS],
    text(fill: white, weight: "bold")[IaaS],
    text(fill: white, weight: "bold")[On-Prem],
  ),
  [Information and Data],   [Customer],   [Customer],   [Customer],   [Customer],
  [Devices (Mobile and PCs)],   [Customer],   [Customer],   [Customer],   [Customer],
  [Accounts and Identities],   [Customer],   [Customer],   [Customer],   [Customer],
  [Identity and Directory Infra],   [Shared],   [Shared],   [Customer],   [Customer],
  [Applications],   [Provider],   [Shared],   [Customer],   [Customer],
  [Network Controls],   [Provider],   [Shared],   [Customer],   [Customer],
  [Operating Systems],   [Provider],   [Provider],   [Customer],   [Customer],
  [Physical Hosts],   [Provider],   [Provider],   [Provider],   [Customer],
  [Physical Network],   [Provider],   [Provider],   [Provider],   [Customer],
  [Physical Datacenter],   [Provider],   [Provider],   [Provider],   [Customer],
)
]


Key takeaway: the more "as a service" you use, the less responsibility you take on — but also less control.

]

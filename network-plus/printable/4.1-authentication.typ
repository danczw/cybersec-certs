#import "template.typ": *

#start-note("4.1 — Authentication", "4.0 Network Security", "4.1")

#columns(2, gutter: 5mm)[



#section-heading("AAA Framework")


- *Identification* — public information (username, email address); does not grant access alone
- *Authentication* — proving identity with private information (password, authentication factor)
- *Authorization* — providing appropriate access to files, directories, network areas based on identity
- *Accounting* — tracking login/logout events, failed authentication attempts, other session details

#section-heading("Common AAA Authentication Flow")


+ Client sends credentials (username, password, other factors) to a network device (e.g., VPN concentrator)
+ Device forwards credentials to AAA server
+ AAA server validates against stored credentials
+ If matched, server sends approval back to the device
+ Client gains network access

#section-heading("Single Sign-On (SSO)")


- Authenticate once, access all authorized resources for the session
- Usually time-limited (often 24 hours)
- Not all authentication methods support SSO

#section-heading("RADIUS (Remote Authentication Dial-In User Service)")


- Very common AAA protocol, around for a long time
- Supported across many operating systems and devices
- Used for VPN concentrators, server authentication, 802.1X wireless authentication
- Name references dial-in origins but works on modern networks
- Often a default option on firewalls, VPN concentrators, and other network devices

#section-heading("LDAP (Lightweight Directory Access Protocol)")


- Protocol for reading and writing to a centralized network directory
- Provides context beyond simple username/password lists (departments, locations, organization)
- Based on ITU X.500 standard
- "Lightweight" version of the original Directory Access Protocol (DAP)
- Used by: Windows Active Directory, Apple OpenDirectory, Novell eDirectory

#sub-heading("X.500 Distinguished Names")

- Attributes provide hierarchical context for objects

#block(breakable: false)[
#table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Attribute],
    text(fill: white, weight: "bold")[Field],
    text(fill: white, weight: "bold")[Usage],
  ),
  [CN],   [Common Name],   [Identifies the person or object],
  [OU],   [Organizational Unit],   [A unit or department within the organization],
  [O],   [Organization],   [The name of the organization],
  [L],   [Locality],   [Usually a city or area],
  [ST],   [State],   [A state, province, or county within a country],
  [C],   [Country],   [The country's 2-character ISO code (e.g., c=US or c=GB)],
  [DC],   [Domain Component],   [Components of the object's domain],
)
]


- Example for a web server named WIDGETWEB:
  - CN=WIDGETWEB, OU=Marketing, O=Widget, L=London, DC=widget.com

#sub-heading("X.500 Directory Information Tree")

- Hierarchical structure of objects
- *Containers* — higher-level grouping objects (countries, departments)
- *Leaf objects* — individual users or devices at the bottom of the tree

#section-heading("SAML (Security Assertion Markup Language)")


- Open standard for authentication and authorization
- Not designed for mobile devices — limitation for multi-device scenarios
- Three components in SAML authentication flow:
  1. *Resource server* — holds the protected resource
  2. *Client* — user's browser
  3. *Authorization server* — validates credentials

#sub-heading("SAML Authentication Flow")

```
  Resource Server           Client (Browser)        Authorization Server
        |                         |                        |
        |<---- User accesses -----|                        |
        |     application URL     |                        |
        |                         |                        |
        |-- Sends signed/encr.  ->|                        |
        | SAML request, redirects |                        |
        | user to Auth. Server    |                        |
        |                         |--- User logs in ------>|
        |                         |                        |
        |                         |<-- Auth successful, ---|
        |                         |  SAML token generated  |
        |<---- User presents -----|                        |
        |        SAML token       |                        |
        |                         |                        |
        |- SAML token verified, ->|                        |
        |     access granted      |                        |
        |                         |                        |
```

#section-heading("TACACS (Terminal Access Controller Access-Control System)")


- Originally used to control access to dial-up lines on ARPANET
- Latest version: TACACS+
- Historically Cisco-centric but made public as an open standard in 1993
- Available for integration into any authentication system

#section-heading("Multifactor Authentication (MFA)")


- Requires multiple authentication factors to prove identity
- Factor categories:
  - *Something you know* — password, PIN
  - *Something you have* — mobile phone, hardware token
  - *Something you are* — biometrics (fingerprint)
  - *Somewhere you are* — GPS location

#section-heading("TOTP (Time-based One-Time Password)")


- Algorithm integrated into mobile authenticator apps
- Uses a pre-shared secret key + current time to generate pseudorandom codes
- Codes change periodically (typically every 30 seconds)
- Both client and server must be time-synchronized (via NTP)
- Used by Google, Facebook, Microsoft, and many others
- Falls under "something you have" factor

]

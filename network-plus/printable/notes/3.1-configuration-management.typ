#import "../template.typ": *

#start-note("3.1 — Configuration Management", "3.0 Network Operations", "3.1")

#columns(2, gutter: 5mm)[



#section-heading("Need for Configuration Management")


- Changes are inevitable: OS updates, patches, application updates, firewall configs, new applications
- Need a formal process — know when changes occur, plan for them, inform everyone
- Documentation is critical for rebuilding systems after a disaster

#section-heading("Production Configuration")


- The configuration used when a switch, router, or firewall is working perfectly after initial setup
- Standard configuration rolled out for each production system
- Covers all aspects: hardware/firmware versions, device driver updates, software versions
- Certain software versions may work better or worse than others
- Extensive testing done behind the scenes before deploying to production
- Not installed directly into production to "see how it runs"

#section-heading("Backup Configurations")


- Not every scenario can be tested in lab — need a plan to revert if something goes wrong
- Standard operating procedure: make a backup before any change
- Applies to firewalls, switches, routers, operating systems, and anything else being changed
- Methods:
  - Copy files that will be updated (e.g., a single configuration file)
  - VM snapshot — saves files, configuration, and everything at that point in time
- Can revert to backup immediately if there's a problem
- Also useful for reverting later if you decide to go back to previous configuration

#section-heading("Baseline / Golden Configuration")


- Deploying an application involves many components (workstation configs, firewall changes, application server)
- Document every aspect of the application installation
- Golden configuration certifies the application will work properly if all configs are in place
- Used to verify proper software and correct configurations
- Integrity checks compare production configuration against the baseline/golden config
- If differences found:
  - Update production to match golden config, OR
  - Update baseline to match new production configuration
- After changes, the new version becomes the baseline for integrity checks going forward

]

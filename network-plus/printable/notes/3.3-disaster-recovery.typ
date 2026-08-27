#import "../template.typ": *

#start-note("3.3 — Disaster Recovery", "3.0 Network Operations", "3.3")

#columns(2, gutter: 5mm)[



#section-heading("Disaster Recovery Plan (DRP)")


- Covers every aspect and detail of handling outages or significant problems affecting organizational goals
- Technologies involved in recovery:
  - Backups
  - Offsite data replication
  - Cloud-based alternatives (recreate on-site servers in the cloud)
  - Completely separate remote site
- Third-party services:
  - Contract for a temporary facility to move operations to
  - Recovery services that come in and manage the disaster recovery process

#section-heading("Recovery Metrics")


#sub-heading("Recovery Time Objective (RTO)")

- Amount of time to get back up and running after an outage
- Goal: as close to zero as possible
- Measured from the outage to when normal service level is restored
- Example: web server fails, RTO = 1 hour to become available again

#sub-heading("Recovery Point Objective (RPO)")

- Amount of data (measured in time) lost when an outage occurs
- Goal: as close to zero as possible
- Represents the gap between the last data recovery point (backup/replication) and the outage
- Determined based on available resources and backup frequency
- Varies by data type:
  - Banking transactions / patient info: very short RPO (< 1 hour)
  - Website updates / internal documents: longer RPO (1–2 hours)

#sub-heading("RTO vs RPO on a Timeline")

```
        Data                                            Service
        recovery                                        back
        point              Outage                       online
          ✓                  ✗                            ✓
Time ─────●──────────────────●────────────────────────────●──────►
          |     Lost data    |          Downtime          |
          |← RPO ───────────→|←─────────── RTO ──────────→|
```

- Data recovery point (backup/replication) occurs
- Outage happens sometime after
- *RPO* = time between the data recovery point and the outage (data lost)
- *RTO* = time between the outage and services coming back online (downtime)

#sub-heading("Mean Time to Repair (MTTR)")

- Average time to resolve an issue (statistical, based on historical data)
- Example: average time to replace a failed router

#callout("Supplementary")[
  MTTR vs RTO: RTO is a forward-looking target (how long recovery \*should\* take). MTTR is a backward-looking average (how long repairs \*actually\* take across multiple incidents).
]


#sub-heading("Mean Time Between Failures (MTBF)")

- Average time a device is expected to operate before failing
- Presented as a single time frame based on multiple criteria
- Example: firewall with MTBF of 20 years
- Helps plan how many backup units to purchase

#section-heading("Site Resiliency")


- Process of moving operations from primary data center to a temporary facility and back
- Steps:
  1. Prepare disaster-recovery site (power, hardware, data)
  2. Move from primary location to backup facility when disaster occurs
  3. Work from backup facility until problem is resolved (hours to months)
  4. Move assets and data back to original location

#sub-heading("Cold Site")

- Empty building with no equipment, no data, no people
- Must bring backup tapes/equipment and transport people
- Lot of work when disaster is called
- Least expensive option

#sub-heading("Hot Site")

- Exact replica of primary data center
- Same hardware (purchase additional units when buying for primary)
- Applications and data replicated/backed up continuously
- Can move in and be up and running relatively quickly
- No need to install hardware, applications, or recover from backups
- Most expensive option

#sub-heading("Warm Site")

- Between a cold site and a hot site
- Some level of infrastructure: power, racks, possibly some hardware
- Need to bring data and recover from backup tapes
- Different levels of service available — choose how much hardware/data to stage

#section-heading("Disaster Recovery Testing")


#sub-heading("Tabletop Exercise")

- Everyone sits around a conference table and steps through simulated disaster scenarios
- Describes what each person/department would do
- No physical movement of backups or equipment
- Verifies logistics are in place
- Takes about a day or two
- All key players participate

#sub-heading("Validation Tests")

- Full-blown disaster-recovery site test (once or multiple times per year)
- Follow a specific scenario (e.g., fire destroys building, geographic evacuation)
- Go through the same process as actual disaster recovery without moving production
- Document what worked and what needs to be fixed
- Allows ongoing improvements for efficiency

]

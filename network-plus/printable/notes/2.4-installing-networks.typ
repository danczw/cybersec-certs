#import "../notes-style.typ": *

#start-note("2.4 — Installing Networks", "2.0 Network Implementation", "2.4")

#columns(2, gutter: 5mm)[



#section-heading("Distribution Frames")


#callout("Supplementary")[
  *Terminating* = connecting the end of a cable to a connector or contact point (RJ45 plug, punch down block, fiber connector, etc.) so it can carry a signal and interface with equipment.

  *Punch down* = a termination method where wires are pressed into slots on a punch down block using a special tool. The tool forces wire into a metal contact that cuts through insulation and makes the electrical connection — no stripping or soldering needed.
]


- Area where cables are passively terminated (punch down blocks, patch panels)
- Usually on the back wall of a data center
- Terminates LAN and voice communication cables
- The entire room is often referred to as the distribution frame room

#sub-heading("Main Distribution Frame (MDF)")

- Single room — the data center or central point of the network
- WAN connections and internal LAN connections are punched down here
- Perfect testing point for both internal and external connections
- Even without large punch down blocks, the central data center room is often called the MDF

#sub-heading("Intermediate Distribution Frame (IDF)")

- Usually on a separate floor or in a separate building
- Directly connected to the MDF
- Includes switches, routers, and other equipment
- Common in medium to large environments
- Users on a floor connect to a switch in the IDF, which connects back to the core switch in the MDF

#section-heading("Racks")


- Standard width: 19 inches
- Equipment designed to fit the 19-inch width
- Height measured in rack units (U) — 1U = 1.75 inches
- Most racks are approximately 42U in height
- Depth varies — must match equipment length
- Equipment can be stacked to maximize space

#sub-heading("Locked Racks")

- Provide additional security and control over components
- Installed side by side to optimize data center space
- Door on front with lock to prevent unauthorized access
- Ventilation in front, top, and bottom for proper cooling

#section-heading("HVAC (Heating, Ventilating, and Air Conditioning)")


- Required to cool data center equipment running constantly
- Must support the heat load, have sufficient power, and integrate with fire systems
- Much more complex than a simple air conditioner

#sub-heading("Hot and Cold Aisles")

- Cold aisle: front of servers — cold air pulled in
- Hot aisle: back of servers — hot air blown out
- Equipment must be installed with correct orientation (intake from cold aisle, exhaust to hot aisle)

#sub-heading("Airflow Cycle (Raised Floor)")

+ HVAC creates cold air sent under a raised floor
+ Vents in floor allow cold air into the cold aisle
+ Servers pull in cold air from the front
+ Heated air exits the back into the hot aisle
+ Hot air rises to the ceiling
+ HVAC pulls hot air back in, re-cools, and repeats

#sub-heading("Alternative (No Raised Floor)")

- Cold air blown directly into cold aisle from above
- Cold aisles may be covered with plastic to contain cold air
- Hot air goes back into the ceiling and returns to HVAC

#section-heading("Cable Infrastructure")


#sub-heading("Patch Panels")

- Single cable runs from each desk back to the IDF
- Back side: 110 block where wires are punched down
- Front side: RJ45 modular connectors
- Patch cables connect from patch panel RJ45 to switch ports
- Installed cables from patch panel to desks are never moved once installed
- Numbered connections identify which desk each port serves

#sub-heading("Moves, Adds, and Changes")

- Move: relocate a patch cable to a different connection
- Add: connect new employees without running new cables (already run to desks)
- Change: only internal IDF connections need to change

#sub-heading("Fiber Optic Distribution Panel")

- Brings in fiber runs from other buildings or floors
- Must not exceed the bend radius when routing fiber
- Large loops maintain proper bend radius inside the panel
- Service loop: extra fiber wrapped around for future flexibility (extend or move without rerunning fiber)

]

#import "template.typ": *

#start-note("2.4 — Environmental Factors", "2.0 Network Implementation", "2.4")

#columns(2, gutter: 5mm)[



#section-heading("Data Center Power Usage")


- Approximately 9% of all US power consumption is used by data centers
- Much of this power goes to managing the environment (humidity, temperature, other controls)

#section-heading("Humidity")


- High humidity → condensation (water in data center)
- Low humidity → excessive static discharge (harmful to equipment)
- Ideal range: 40%–60%
  - High enough to prevent static discharge
  - Low enough to prevent condensation
- Can vary by geography

#section-heading("Temperature")


- Equipment generates heat that must be cooled
- Optimal range: 64–81°F
- Cooling equipment constantly works to maintain this range
- External influences can affect temperature:
  - Outdoor temperature increases/decreases add load to cooling systems
  - Increased system load creates more heat, requiring additional cooling

#section-heading("HVAC")


- Well-engineered system designed to maintain specific humidity and temperature
- Sensors located throughout the data center
- Ensures consistent temperature and humidity across the entire facility

#section-heading("Fire Suppression")


- Data centers contain large amounts of electrical equipment — water is not suitable
- Tank in back of data center contains inert gas or chemical agent
- Designed to suppress fire or remove oxygen from the air
- When fire alarm is pulled, chemicals are dispersed throughout the entire data center
- May cause damage to equipment but prevents fire from spreading
- Integrated with HVAC: fire detection shuts down HVAC to prevent oxygen from feeding the fire

]

#import "template.typ": *

#start-note("1.7 — Binary Math", "1.0 Networking Concepts", "1.7")

#columns(2, gutter: 5mm)[



#section-heading("Fundamentals")


- Binary uses two numbers: 0 and 1
- Each 0 or 1 is a *bit*
- 8 bits = 1 *byte* (also called an *octet*)

#section-heading("Conversion Chart")


- Start from right with 1, double each position moving left
- 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1
- Chart can extend left: 256, 512, 1024, etc.
- Each position is a power of 2 (2^0 = 1, 2^1 = 2, 2^2 = 4, ...)

#section-heading("Binary to Decimal")


+ Write binary value under the conversion chart
+ Where binary digit is 0 → value is 0
+ Where binary digit is 1 → take the chart number above it
+ Add all values together

#callout("Example")[
  #table(
  columns: 3,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Binary],
    text(fill: white, weight: "bold")[Calculation],
    text(fill: white, weight: "bold")[Decimal],
  ),
  [00000010],   [2],   [2],
  [10000010],   [128 + 2],   [130],
  [11111111],   [128+64+32+16+8+4+2+1],   [255],
)

]


#section-heading("Decimal to Binary")


+ Write conversion chart above empty 8-bit placeholders
+ Starting from left (128): is the running total ≤ target?
   - Yes → place 1, add that value to running total
   - No → place 0, move to next column
+ Repeat for each column until all 8 bits are filled

#callout("Example")[
  *154 Decimal*

  #table(
  columns: 8,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[128],
    text(fill: white, weight: "bold")[64],
    text(fill: white, weight: "bold")[32],
    text(fill: white, weight: "bold")[16],
    text(fill: white, weight: "bold")[8],
    text(fill: white, weight: "bold")[4],
    text(fill: white, weight: "bold")[2],
    text(fill: white, weight: "bold")[1],
  ),
  [1],   [0],   [0],   [1],   [1],   [0],   [1],   [0],
)


  - 128 ≤ 154? Yes → 1 (running: 128)
  - 128+64=192 ≤ 154? No → 0
  - 128+32=160 ≤ 154? No → 0
  - 128+16=144 ≤ 154? Yes → 1 (running: 144)
  - 144+8=152 ≤ 154? Yes → 1 (running: 152)
  - 152+4=156 ≤ 154? No → 0
  - 152+2=154 ≤ 154? Yes → 1 (running: 154)
  - 154+1=155 ≤ 154? No → 0

  Result: 10011010
]


#section-heading("Bit Count and Possible Values")


- With 8 bits, any value 0–255 can be represented
- Total possible values = 2^n (where n = number of bits)

#table(
  columns: 2,
  stroke: none,
  fill: (_, row) => if row == 0 { accent } else if calc.even(row) { accent-bg } else { none },
  table.header(
    text(fill: white, weight: "bold")[Bits],
    text(fill: white, weight: "bold")[Possible Values (2^n)],
  ),
  [2],   [4],
  [3],   [8],
  [4],   [16],
  [5],   [32],
  [6],   [64],
  [7],   [128],
  [8],   [256],
)


]

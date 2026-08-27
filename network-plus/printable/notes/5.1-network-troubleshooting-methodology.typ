#import "../template.typ": *

#start-note("5.1 — Network Troubleshooting Methodology", "5.0 Network Troubleshooting", "5.1")

#columns(2, gutter: 5mm)[



#section-heading("Overview")


+ Identify the problem
+ Establish a theory of probable cause
+ Test the theory
+ Establish a plan of action
+ Implement the solution
+ Verify full system functionality
+ Document findings

```
╭────────╮   ┌──────────┐   ┌──────────┐   ┌──────────┐
│It's    │──▶│ Identify │──▶│Establish │──▶│ Test the │
│broken! │   │  Problem │   │ a Theory │   │  Theory  │
╰────────╯   └──────────┘   └────▲─────┘   └─────┬────┘
                                 │               │
                       Not fixed!│               ▼
                                 │         ◇──────────◇
                                 └─────No──│ Working? │
                                           ◇─────┬────◇
                                            Yes! │
                                                 ▼
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ Document │◀──│  Verify  │◀──│Implement │◀──│ Plan of  │
│ Findings │   │  System  │   │ the Plan │   │  Action  │
└─────┬────┘   └──────────┘   └──────────┘   └──────────┘
      ▼
╭──────────╮
│  Done!   │
╰──────────╯
```

#section-heading("Step 1: Identify the Problem")


- May be obvious (e.g., severed cable) or require investigation
- Attempt to duplicate the issue
- Talk to users — gather their experiences and observations
- Combine user reports with statistics/metrics from routers and switches
- Consider multiple symptoms working together
- Ask: what has changed since it last worked?
  - Cables moved in wiring closet
  - System powered off
  - Configuration changes
- Build a lab to duplicate the problem — easier to find root cause
- Break large problems into smaller components

#section-heading("Step 2: Establish a Theory of Probable Cause")


- Start with obvious/quick-to-solve problems (e.g., swap a cable)
- Use OSI model approaches:
  - *Top-down* — start at application layer, work down (good for existing networks)
  - *Bottom-up* — start at physical layer, work up (good for new implementations)
- Eliminate variables — if issue appears on multiple OSes, OS is not the cause

#section-heading("Step 3: Test the Theory")


- Execute steps to confirm/deny the theory
- Make changes in a lab environment and evaluate the effect
- If theory is confirmed — proceed to plan of action
- If theory is not confirmed — return to Step 2 and establish a new theory

#section-heading("Step 4: Establish a Plan of Action")


- Determine how to implement the fix in production
- Some changes can be made during business hours; many require change control
- Prepare contingencies:
  - Plan B (and Plan C) if primary plan fails
  - Rollback process to revert to previous state

#section-heading("Step 5: Implement the Solution")


- Apply the fix during the assigned change control window
- Implementation team may differ from troubleshooting team
  - Troubleshooting team determines the fix
  - Operations team implements the change

#section-heading("Step 6: Verify Full System Functionality")


- Confirm with end users that the problem is resolved
- Not confirmed until users verify
- Discuss preventive measures with users
  - Users may suggest workflow improvements
  - IT may suggest technology-based prevention

#section-heading("Step 7: Document Findings")


- Document the process followed
- Document the specific change that resolved the issue
- Store in help desk database or knowledge base
- Enables future reference if the problem recurs

]

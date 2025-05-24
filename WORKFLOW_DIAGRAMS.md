# Sewer Inspection Workflow Diagrams & State Machines

## Table of Contents
1. [Inspection Lifecycle State Machine](#inspection-lifecycle-state-machine)
2. [User Journey Flow](#user-journey-flow)
3. [Data Flow Diagram](#data-flow-diagram)
4. [Access Point Workflow](#access-point-workflow)
5. [Report Generation Process](#report-generation-process)

## Inspection Lifecycle State Machine

```
┌─────────────┐
│  SCHEDULED  │ ◄─── Initial state when inspection is created
└──────┬──────┘
       │
       │ User saves location data
       ▼
┌─────────────┐
│   ACTIVE    │ ◄─── Inspection in progress
└──────┬──────┘
       │
       │ User clicks "Complete Inspection"
       ▼
┌─────────────┐
│  COMPLETED  │ ◄─── Final state, report available
└─────────────┘
```

### State Transitions
- **SCHEDULED → ACTIVE**: Triggered when location data is saved
- **ACTIVE → COMPLETED**: Triggered when user completes inspection
- No backward transitions allowed

## User Journey Flow

```
START
  │
  ▼
┌─────────────────┐
│ Select Client   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌──────────────┐
│ Enter Property  │────►│ New Client?  │
│    Address      │     └──────┬───────┘
└────────┬────────┘            │ Yes
         │                     ▼
         │              ┌──────────────┐
         │              │Create Client │
         │              └──────┬───────┘
         │                     │
         │◄────────────────────┘
         │
         ▼
┌─────────────────┐
│ Set Inspection  │
│     Details     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save Overview   │────► Status: SCHEDULED
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Enter Location  │
│     Details     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Save Location   │────► Status: ACTIVE
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Add Access      │◄────┐
│     Point       │     │
└────────┬────────┘     │
         │              │
         ▼              │
┌─────────────────┐     │
│ Add Observations│     │
└────────┬────────┘     │
         │              │
         ▼              │
┌─────────────────┐     │
│ More Access     │─Yes─┘
│    Points?      │
└────────┬────────┘
         │ No
         ▼
┌─────────────────┐
│Complete Inspect.│────► Status: COMPLETED
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Generate Report  │
└────────┬────────┘
         │
         ▼
        END
```

## Data Flow Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CLIENT    │     │ INSPECTION  │     │   ACCESS    │
│   CONTEXT   │────►│   CONTEXT   │────►│   POINTS    │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  LOCATION   │     │OBSERVATIONS │
                    │    DATA     │     │    DATA     │
                    └──────┬──────┘     └──────┬──────┘
                           │                    │
                           └────────┬───────────┘
                                    ▼
                            ┌─────────────┐
                            │   REPORT    │
                            │ GENERATION  │
                            └─────────────┘
```

### Data Dependencies
- **Client Context**: Required for all inspections
- **Inspection Context**: Contains property address, dates, overview
- **Location Data**: Occupancy, outbuilding, CCCSD info
- **Access Points**: Multiple per inspection, contains pipe details
- **Observations**: Multiple per access point, contains defects

## Access Point Workflow

```
┌──────────────────┐
│ Select Location  │
│      Type        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Build Location   │
│   Description    │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Enter Access     │
│    Details       │
└────────┬─────────┘
         │
    ┌────┴────┐
    │ Has BOPD?│
    └────┬────┘
         │
    ┌────┴────┐
    │   Yes   │────► Enter BOPD Condition
    └─────────┘
         │
         ▼
┌──────────────────┐
│ Save Access      │
│     Point        │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ Add Observation  │◄────┐
└────────┬─────────┘     │
         │               │
    ┌────┴────┐          │
    │  More?  │─────Yes──┘
    └────┬────┘
         │ No
         ▼
┌──────────────────┐
│ Return to Access │
│   Points List    │
└──────────────────┘
```

## Report Generation Process

```
┌─────────────────┐
│   Inspection    │
│   Completed     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Gather All Data │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Apply Conditional│
│     Rules       │
└────────┬────────┘
         │
    ┌────┴────────────────┐
    │ Root Cut Performed? │────Yes───► Add Warranty Section
    └────────┬────────────┘
             │ No
             ▼
    ┌────────────────────┐
    │ City-Specific?     │────Yes───► Add City Notes
    └────────┬───────────┘
             │ No
             ▼
    ┌────────────────────┐
    │ One-Way Access?    │────Yes───► Add Uninspected Note
    └────────┬───────────┘
             │ No
             ▼
    ┌────────────────────┐
    │ No BOPD Present?   │────Yes───► Add BOPD Recommendation
    └────────┬───────────┘
             │ No
             ▼
┌─────────────────┐
│ Calculate       │
│ Serviceability  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Generate Photos │
│    Section      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Compile Final   │
│     Report      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Display/Print  │
│     Report      │
└─────────────────┘
```

## Business Logic Decision Trees

### Serviceability Determination

```
                    ┌─────────────┐
                    │ Observations│
                    └──────┬──────┘
                           │
                ┌──────────┴──────────┐
                │ Major Defects?      │
                │ (holes, collapse)   │
                └──────────┬──────────┘
                     ┌─────┴─────┐
                     │    Yes    │────► NOT SERVICEABLE
                     └───────────┘
                           │ No
                           ▼
                ┌─────────────────────┐
                │ Significant Roots?  │
                │ (>50% blockage)     │
                └──────────┬──────────┘
                     ┌─────┴─────┐
                     │    Yes    │────► PARTIALLY SERVICEABLE
                     └───────────┘
                           │ No
                           ▼
                ┌─────────────────────┐
                │ Minor Issues?       │
                │ (roots, debris)     │
                └──────────┬──────────┘
                     ┌─────┴─────┐
                     │    Yes    │────► SERVICEABLE WITH MAINTENANCE
                     └───────────┘
                           │ No
                           ▼
                    ┌─────────────┐
                    │ SERVICEABLE │
                    └─────────────┘
```

### Location Builder Logic

```
┌──────────────┐     ┌──────────────┐
│ Foundation   │     │Property Line │
│    Edge      │     │              │
└──────┬───────┘     └──────┬───────┘
       │                     │
       ▼                     ▼
┌──────────────┐     ┌──────────────┐
│Select Position     │Select Position
│ front/back/        │ front/back/
│ left/right         │ left/right
└──────┬───────┘     └──────┬───────┘
       │                     │
       ▼                     ▼
┌──────────────┐     ┌──────────────┐
│Add Modifiers │     │Add Modifiers │
│ -of residence│     │ -corner      │
│ -under window│     │              │
└──────┬───────┘     └──────┬───────┘
       │                     │
       ▼                     ▼
┌──────────────┐     ┌──────────────┐
│Add Reference │     │Add Reference │
│ -entry       │     │ -walk        │
│ -porch       │     │ -driveway    │
└──────┬───────┘     └──────┬───────┘
       │                     │
       └─────────┬───────────┘
                 ▼
         ┌──────────────┐
         │Generate Text │
         │ Description  │
         └──────────────┘
```

## Error Handling States

```
┌─────────────┐
│   ERROR     │
│   STATE     │
└──────┬──────┘
       │
       ├─► Network Error ────► Retry with exponential backoff
       │
       ├─► Validation Error ─► Show inline error message
       │
       ├─► Server Error ────► Display error modal
       │
       └─► Auth Error ──────► Redirect to login (future)
```

## Component Communication Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Header    │     │   Context   │     │   Database  │
│  Component  │────►│   Provider  │◄────│    (API)    │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
┌─────────────┐     ┌─────────────┐   ┌─────────────┐
│  Overview   │     │  Location   │   │   Access    │
│    Form     │     │    Form     │   │   Points    │
└─────────────┘     └─────────────┘   └─────────────┘
```

These diagrams illustrate the complete workflow and state management of the sewer inspection application, showing how data flows through the system and how different states trigger various actions and transitions.
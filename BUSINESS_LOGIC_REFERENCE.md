# Sewer Inspection Report Generator - Business Logic & Constants Reference

## Table of Contents
1. [Material Types](#material-types)
2. [Direction/Access Types](#directionaccess-types)
3. [BOPD Types](#bopd-types)
4. [Inspection Status Workflow](#inspection-status-workflow)
5. [Form Field Metadata](#form-field-metadata)
6. [Business Rules](#business-rules)
7. [Report Generation Logic](#report-generation-logic)
8. [City-Specific Configurations](#city-specific-configurations)

## Material Types

### Pipe Materials
```javascript
{
  "ci": "Cast Iron",
  "ac": "Asbestos Cement", 
  "abs": "ABS Plastic",
  "vcp": "VCP Clay",
  "pvc": "PVC Plastic",
  "orbg": "Orangeburg",
  "hdpe": "HDPE",
  "cipp": "Cure-in-place-pipe",
  "dip": "Ductile Iron Pipe"
}
```

### Usage
- Used for access material selection
- Used for initial pipe material
- Used in material change observations
- Displayed in reports with full names

## Direction/Access Types

### Cleanout Directions
```javascript
{
  "one_way": "One-Way",
  "two_way": "Two-Way",
  "break_in": "Break-In access",
  "stub": "Stub access",
  "toilet": "Toilet access",
  "roof": "Roof access"
}
```

### Business Rules
- One-way cleanouts only allow downstream inspection
- Two-way cleanouts allow both upstream and downstream inspection
- Break-in access indicates no formal cleanout exists
- Toilet/roof access are alternative entry points

## BOPD Types

### Backwater Overflow Prevention Device Types
```javascript
{
  "none": "No BOPD",
  "popper": "Popper",
  "mushroom": "Mushroom Cap",
  "check_valve": "Check Valve",
  "relief": "Relief Valve"
}
```

### BOPD Conditions
```javascript
{
  "good": "Good condition",
  "broken": "Broken",
  "missing": "Missing",
  "ball": "Ball type",
  "too_low": "Too Low",
  "too_high": "Too High"
}
```

## Inspection Status Workflow

### Status Values
1. **scheduled** - Inspection is scheduled but not started
2. **active_inspection** - Inspection is in progress
3. **completed_inspection** - Inspection is complete

### Status Transitions
```
scheduled → active_inspection → completed_inspection
```

### Trigger Points
- `scheduled` → `active_inspection`: When location data is saved
- `active_inspection` → `completed_inspection`: When "Complete Inspection" is clicked

## Form Field Metadata

### Job Overview Fields
```javascript
{
  inspection_date: { type: 'date', required: true },
  property_address: { type: 'text', required: true },
  property_address_street: { type: 'text', required: true },
  property_address_city: { type: 'text', required: true },
  property_address_state: { type: 'text', required: true },
  property_address_zip: { type: 'text', required: true },
  prelisting: { type: 'boolean', choices: ['yes', 'no'] },
  root_cut: { type: 'boolean', choices: ['yes', 'no'] },
  opening_observations: { type: 'textarea' },
  usb_num: { type: 'text' }
}
```

### Location Fields
```javascript
{
  occupancy: { 
    type: 'radio', 
    choices: ['occupied', 'vacant', 'unknown'],
    required: true 
  },
  outbuilding: { 
    type: 'boolean', 
    choices: ['yes', 'no'],
    has_children: true 
  },
  outbuilding_has_plumbing: { 
    type: 'boolean',
    depends_on: 'outbuilding',
    show_when: 'yes'
  },
  outbuilding_has_cleanout: {
    type: 'boolean',
    depends_on: 'outbuilding_has_plumbing',
    show_when: 'yes'
  },
  cccsd: { 
    type: 'boolean',
    choices: ['yes', 'no'],
    has_children: true
  },
  cccsd_unpermitted_work: {
    type: 'boolean',
    depends_on: 'cccsd',
    show_when: 'yes'
  }
}
```

### Access Details Fields
```javascript
{
  pipe_diameter: { 
    type: 'radio',
    choices: ['3', '4', '6'],
    required: true,
    unit: 'inches'
  },
  cleanout_direction: {
    type: 'radio',
    choices: ['one_way', 'two_way', 'break_in', 'stub', 'toilet', 'roof'],
    required: true
  },
  access_material: {
    type: 'radio',
    choices: ['ci', 'ac', 'abs', 'vcp', 'pvc', 'orbg'],
    required: true
  },
  bopd_type: {
    type: 'radio',
    choices: ['none', 'popper', 'mushroom', 'check_valve', 'relief'],
    required: true
  },
  bopd_condition: {
    type: 'radio',
    choices: ['good', 'broken', 'missing', 'ball', 'too_low', 'too_high'],
    depends_on: 'bopd_type',
    show_when: '!none'
  },
  cleanout_issues: {
    type: 'checkbox',
    choices: ['below_grade', 'excess_vegetation']
  }
}
```

### Observation Fields
```javascript
{
  footage: {
    type: 'number',
    required: true,
    min: 0,
    step: 0.1,
    unit: 'feet'
  },
  upstream: {
    type: 'boolean',
    default: false,
    description: 'Direction of observation (false = downstream)'
  },
  loss_of_crosssection: {
    type: 'number',
    min: 0,
    max: 100,
    step: 10,
    unit: 'percent'
  },
  line_notation: {
    ti: 'Tie-In',
    ltl: 'Line Turns Left',
    ltr: 'Line Turns Right',
    ltu: 'Line Turns Up',
    ltd: 'Line Turns Down',
    ltf: 'Line Turns Flat',
    intro_water_grade: 'Introduce Water - Grade',
    intro_water_debris: 'Introduce Water - Debris',
    intro_water_camera: 'Introduce Water - Camera',
    main: '@ Main',
    locate: 'Locate (with depth)'
  }
}
```

## Business Rules

### Root Cut Warranty
- If root cutting is performed, warranty is valid for 1 year from inspection date
- Warranty only applies to root-related stoppages
- Must be documented in report

### Inspection Completeness
- All access points must have at least one observation
- Footage must be recorded for each observation
- Final observation should indicate end point (main or obstruction)

### Report Requirements
- Must include all areas of concern with photos
- Serviceability conclusion is required
- Recommendations must match serviceability status

### Serviceability Classifications
1. **Serviceable** - Line functions as designed
2. **Serviceable with Maintenance Requirements** - Functions but needs scheduled maintenance
3. **Partially Serviceable** - Likely to have issues, needs immediate attention
4. **Not Serviceable** - Cannot convey waste, requires immediate repair/replacement

### Photo Requirements
- Downstream concerns shown first
- Upstream concerns shown second
- Each concern must have footage reference
- Defect alert icon marks areas of concern

## Report Generation Logic

### Conditional Sections
1. **Root Cut Warranty** - Only if `root_cut = true`
2. **City-Specific Notes** - Based on property city
3. **BOPD Recommendations** - If `bopd_type = none`
4. **Access Type Notes** - Based on `cleanout_direction`
5. **Uninspected Lateral** - If `cleanout_direction = one_way`

### Calculated Fields
```javascript
// Warranty Expiration
warranty_expires = inspection_date + 1 year

// Total Inspected Length
total_length = sum of max footage for each access point

// Uninspected Lateral
if (cleanout_direction === 'one_way') {
  uninspected = "Any pipe upstream of 1-way cleanout, length and condition unknown"
} else {
  uninspected = "N/A"
}
```

### Report Sections Order
1. Header with logo
2. Inspection metadata
3. Video links
4. Certificate/Warranty (conditional)
5. Opening notes
6. Guidelines for proper use
7. Serviceability conclusion
8. Recommendations
9. Areas of concern (with photos)
10. Sewer line description
11. Scope and limitations
12. Definitions

## City-Specific Configurations

### Available Cities
- Livermore, CA
- Tracy, CA
- Brentwood, CA
- Antioch, CA
- Pittsburg, CA
- Vallejo, CA

### City-Specific Elements
1. **Boilerplate Text** - Each city has specific opening notes
2. **Upper Lateral Notes** - Some cities have specific requirements
3. **CCCSD Jurisdiction** - Central Contra Costa Sanitary District rules
4. **Permit Requirements** - Varies by city

### CCCSD Special Rules
- Additional inspection requirements
- Specific BOPD recommendations
- Unpermitted work notifications
- Special report sections

## Validation Rules

### Required Fields by Section
1. **Client Creation**
   - Organization name OR contact name
   - At least one phone number
   - Client type

2. **Inspection Creation**
   - Client selection
   - Property address
   - Inspection date

3. **Access Point**
   - Location description
   - Pipe diameter
   - Cleanout direction
   - Access material

4. **Observation**
   - Footage
   - At least one observation type

### Data Constraints
- Footage must increase within same direction
- Percentage values: 0-100
- Dates cannot be in future
- Phone numbers: 10 digits
- ZIP codes: 5 digits

## Special Scenarios

### Multiple Access Points
- Each access point tracked separately
- Observations linked to specific access
- Report combines all access points

### Material Changes
- Tracked as observations
- Must specify new material type
- Common at property line transitions

### Standing/Under Water
- Requires start and end footage
- May indicate grade issues
- Special report notes required

### Root Observations
- Modifiers: in_flow_line, continuous, fine
- Percentage of blockage required
- Triggers warranty if cut

This reference guide should be used in conjunction with the codebase to understand the complete business logic and ensure consistent implementation across the application.
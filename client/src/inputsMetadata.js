export const jobOverview = {
    inspection_date: {input_type: 'date', name: 'inspection_date', placeholder: 'Today\'s Date', value_datatype: 'date', value_choices: []},
    property_address: {input_type: 'text', name: 'property_address', placeholder: 'Property Address', value_datatype: 'string', value_choices: []}, // user input string
    opening_observations: {input_type: 'textarea', name: 'opening_observations', placeholder: 'Opening Observations', value_datatype: 'string', value_choices: []},
    prelisting: {input_type: 'radio', name: 'prelisting', placeholder: 'Prelisting', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    check_num: {input_type: 'number', name: 'check_num', placeholder: 'Check#', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}, // number
    online: {input_type: 'radio', name: 'online', placeholder: 'Online', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    cc_attached: {input_type: 'radio', name: 'cc_attached', placeholder: 'CC Attached', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    usb_num: {input_type: 'number', name: 'usb_num', placeholder: 'USB#', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}
}

export const jobLocation = {
    occupancy: {input_type: 'checkbox', name: 'occupancy', placeholder: 'occupancy', value_datatype: 'string', value_choices: ['occupied', 'vacant', 'unknown']},
    outbuilding: {input_type: 'radio', name: 'outbuilding', placeholder: 'Outbuilding', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if_outbuilding: {
        has_plumbing: {input_type: 'radio', name: 'has_plumbing', placeholder: 'Has Plumbing', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        if_has_plumbing: {
            cleanout: {input_type: 'radio', name: 'cleanout', placeholder: 'Cleanout', value_datatype: 'boolean', value_choices: ['yes', 'no']},
            pipe_diameter: {input_type: 'checkbox', name: 'pipe_diameter', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: [ '3', '4', 'other' ]},
            pipe_diameter_if_other:  {input_type: 'text', name: 'pipe_diameter_if_other', placeholder: 'Other', value_datatype: 'string', value_choices: []}
        }
    },
    cccusd: {input_type: 'radio', name: 'cccusd', placeholder: 'CCCUSD', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if_cccsd: {
        unpermitted_work: {input_type: 'radio', name: 'unpermitted_work', placeholder: 'Unpermitted Work', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    },
    push_to_main_rewrite: {input_type: 'radio', name: 'push_to_main_rewrite', placeholder: 'Push To Main Rewrite', value_datatype: 'boolean', value_choices: ['yes', 'no']}
}

export const accessLocation = {
    location: {input_type: 'checkbox', name: 'location', placeholder: 'Location', value_datatype: 'string', value_choices: ['foundation_edge', 'property_line']}, 
    location_position: {input_type: 'checkbox', name: 'location_position', placeholder: 'Location Position', value_datatype: 'string', value_choices: ['front', 'back', 'left', 'right']},
    location_position_modifier: {input_type: 'checkbox', name: 'location_position_modifier', placeholder: 'Location Position Modifier', value_datatype: 'string', value_choices: ['of_residence', 'corner', 'under_window']},
    entry: {input_type: 'checkbox', name: 'entry', placeholder: 'Entry', value_datatype: 'string', value_choices: ['left', 'right']}, 
    porch: {input_type: 'checkbox', name: 'porch', placeholder: 'Porch', value_datatype: 'string', value_choices: ['left', 'right']},
    walk: {input_type: 'checkbox', name: 'walk', placeholder: 'Walk', value_datatype: 'string', value_choices: ['left', 'right']}, 
    'in': {input_type: 'radio', name: 'in', placeholder: 'In', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    under_deck: {input_type: 'radio', name: 'under_deck', placeholder: 'Under Deck', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    under: {input_type: 'text', name: 'under', placeholder: 'Under', value_datatype: 'string', value_choices: []}

}

export const accessDetails = {
    pipe_diameter: {input_type: 'checkbox', name: 'pipe_diameter', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: ['3','4','6']},  // number in in
    direction: {input_type: 'checkbox', name: 'direction', placeholder: 'Direction', value_datatype: 'string', value_choices: ['one_way', 'two_way']}, 
    location: {input_type: 'checkbox', name: 'location', placeholder: 'Location', value_datatype: 'string', value_choices: ['stub','break_in','roof']}, 
    bopd: {input_type: 'checkbox', name: 'bopd', placeholder: 'BOPD', value_datatype: 'string', value_choices: ['none','check_valve','mushroom','popper','relief']}, 
    access_material: {input_type: 'checkbox', name: 'access_material', placeholder: 'Access Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg']}, 
    initial_pipe_material: {input_type: 'checkbox', name: 'initial_pipe_material', placeholder: 'Initial Pipe Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg','hdpe']}, 
    clean_out: {input_type: 'checkbox', name: 'clean_out', placeholder: 'Clean Out', value_datatype: 'string', value_choices: ['below_grade','excess_vegetation']}, 
    bopd_condition: {input_type: 'checkbox', name: 'bopd_condition', placeholder: 'BOPD Condition', value_datatype: 'string', value_choices: ['broken','missing','ball','too_low','too_high']}
}



export const observations= {
    footage: {input_type: 'number', name: 'footage', placeholder: 'Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // number in ft
    blockage: {
        roots: {input_type: 'radio', name: 'roots', placeholder: 'Roots', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        debris: {input_type: 'radio', name: 'debris', placeholder: 'Debris', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        if_debris: {
            loose: {input_type: 'radio', name: 'loose', placeholder: 'Loose', value_datatype: 'boolean', value_choices: ['yes', 'no']},
            attached_to_wall: {input_type: 'radio', name: 'attached_to_wall', placeholder: 'Attached To Wall', value_datatype: 'boolean', value_choices: ['yes', 'no']}
        },
        pct_loss_cross_section: {input_type: 'number', name: 'pct_loss_cross_section', placeholder: '% loss of cross section', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}, // number as percentage
        continuous: {input_type: 'radio', name: 'continuous', placeholder: 'Continuous', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    },
    standing_water: {input_type: 'radio', name: 'standing_water', placeholder: 'Standing Water', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if_standing_water: {
        start: {input_type: 'number', name: 'standing_water_start', placeholder: 'Start Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // number in ft
        end: {input_type: 'number', name: 'standing_water_end', placeholder: 'End Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []} // number in ft
    },
    under_water: {input_type: 'radio', name: 'under_water', placeholder: 'Under Water', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if_under_water: {
        start: {input_type: 'number', name: 'under_water_start', placeholder: 'Start Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // ft
        end: {input_type: 'number', name: 'under_water_end', placeholder: 'End Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []} // ft
    },
    pipe_issue: {
        crack: {input_type: 'radio', name: 'crack', placeholder: 'Crack', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        separated_joint: {input_type: 'radio', name: 'separated_joint', placeholder: 'Separated Joint', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        hole: {input_type: 'radio', name: 'hole', placeholder: 'Hole', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    },
    observations: {input_type: 'textarea', name: 'observations', placeholder: 'Observations', value_datatype: 'string', value_choices: []}
}
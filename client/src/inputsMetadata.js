export const jobOverview = {
    inspection_date: {input_type: 'date', name: 'inspection_date', id: 'inspection_date_date_input', placeholder: 'Today\'s Date', value_datatype: 'date', value_choices: []},
    property_address: {input_type: 'text', name: 'property_address', id: 'property_address_text_input', placeholder: 'Property Address', value_datatype: 'string', value_choices: []}, // user input string
    opening_observations: {input_type: 'textarea', name: 'opening_observations', id: 'opening_observations_textarea_input', placeholder: 'Opening Observations', value_datatype: 'string', value_choices: []},
    prelisting: {input_type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', placeholder: 'Prelisting', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    check_num: {input_type: 'number', name: 'check_num', id: 'check_num_number_input', placeholder: 'Check#', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}, // number
    online: {input_type: 'radio', name: 'online', id: 'online_radio_input', placeholder: 'Online', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    cc_attached: {input_type: 'radio', name: 'cc_attached', id: 'cc_attached_radio_input', placeholder: 'CC Attached', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    usb_num: {input_type: 'number', name: 'usb_num', id: 'usb_num_number_input', placeholder: 'USB#', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}
}
export const jobLocation = {
    occupancy: {input_type: 'radio', name: 'occupancy', id: 'occupancy_radio_input', placeholder: 'Occupancy', value_datatype: 'string', value_choices: ['occupied', 'vacant', 'unknown']},
    outbuilding: {input_type: 'radio', name: 'outbuilding', id: 'outbuilding_radio_input', placeholder: 'Outbuilding', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if__outbuilding: {
        has_plumbing: {input_type: 'radio', name: 'has_plumbing', id: 'has_plumbing_radio_input', placeholder: 'Has Plumbing', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        if__has_plumbing: {
            cleanout: {input_type: 'radio', name: 'cleanout', id: 'cleanout_radio_input', placeholder: 'Cleanout', value_datatype: 'boolean', value_choices: ['yes', 'no']},
            pipe_diameter: {input_type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_radio_input', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: [ '3', '4', 'other' ]},
            if__pipe_diameter__other: {input_type: 'text', name: 'if__pipe_diameter__other', id: 'if__pipe_diameter__other_text_input', placeholder: 'Other', value_datatype: 'string', value_choices: []}
        }
    },
    cccusd: {input_type: 'radio', name: 'cccusd', id: 'cccusd_radio_input', placeholder: 'CCCUSD', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if__cccsd: {
        unpermitted_work: {input_type: 'radio', name: 'unpermitted_work', id: 'unpermitted_work_radio_input', placeholder: 'Unpermitted Work', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    }
    // push_to_main_rewrite: {input_type: 'radio', name: 'push_to_main_rewrite', id: 'push_to_main_rewrite_radio_input', placeholder: 'Push To Main Rewrite', value_datatype: 'boolean', value_choices: ['yes', 'no']}
}

export const accessLocation = {
    location: {input_type: 'radio', name: 'location', id: 'location_checkbox_input', placeholder: 'Location', value_datatype: 'string', value_choices: ['foundation_edge', 'property_line']}, 
    location_position: {input_type: 'checkbox', name: 'location_position', id: 'location_position_checkbox_input', placeholder: 'Location Position', value_datatype: 'string', value_choices: ['front', 'back', 'left', 'right']},
    location_position_modifier: {input_type: 'checkbox', name: 'location_position_modifier', id: 'location_position_modifier_checkbox_input', placeholder: 'Location Position Modifier', value_datatype: 'string', value_choices: ['of_residence', 'corner', 'under_window']},
    entry: {input_type: 'radio', name: 'entry', id: 'entry_checkbox_input', placeholder: 'Entry', value_datatype: 'string', value_choices: ['left', 'right', 'none']}, 
    porch: {input_type: 'radio', name: 'porch', id: 'porch_checkbox_input', placeholder: 'Porch', value_datatype: 'string', value_choices: ['left', 'right', 'none']},
    walk: {input_type: 'radio', name: 'walk', id: 'walk_checkbox_input', placeholder: 'Walk', value_datatype: 'string', value_choices: ['left', 'right', 'none']}, 
    'in': {input_type: 'radio', name: 'in', id: 'in_radio_input', placeholder: 'In', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    under_deck: {input_type: 'radio', name: 'under_deck', id: 'under_deck_radio_input', placeholder: 'Under Deck', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    under: {input_type: 'text', name: 'under', id: 'under_text_input', placeholder: 'Under', value_datatype: 'string', value_choices: []}

}

export const accessDetails = {
    pipe_diameter: {input_type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_checkbox_input', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: ['3','4','6']},  // number in in
    direction: {input_type: 'radio', name: 'direction', id: 'direction_checkbox_input', placeholder: 'Direction', value_datatype: 'string', value_choices: ['one_way', 'two_way']}, 
    location: {input_type: 'radio', name: 'location', id: 'location_checkbox_input', placeholder: 'Location', value_datatype: 'string', value_choices: ['stub','break_in','roof']}, 
    bopd: {input_type: 'radio', name: 'bopd', id: 'bopd_checkbox_input', placeholder: 'BOPD', value_datatype: 'string', value_choices: ['none','check_valve','mushroom','popper','relief']}, 
    access_material: {input_type: 'radio', name: 'access_material', id: 'access_material_checkbox_input', placeholder: 'Access Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg']}, 
    initial_pipe_material: {input_type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_checkbox_input', placeholder: 'Initial Pipe Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg','hdpe']}, 
    clean_out: {input_type: 'checkbox', name: 'clean_out', id: 'clean_out_checkbox_input', placeholder: 'Clean Out', value_datatype: 'string', value_choices: ['below_grade','excess_vegetation']}, 
    bopd_condition: {input_type: 'checkbox', name: 'bopd_condition', id: 'bopd_condition_checkbox_input', placeholder: 'BOPD Condition', value_datatype: 'string', value_choices: ['broken','missing','ball','too_low','too_high']}
}



export const observations= {
    footage: {input_type: 'number', name: 'footage', id: 'footage_number_input', placeholder: 'Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // number in ft
    blockage: {
        roots: {input_type: 'radio', name: 'roots', id: 'roots_radio_input', placeholder: 'Roots', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        debris: {input_type: 'radio', name: 'debris', id: 'debris_radio_input', placeholder: 'Debris', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        if__debris: {
            loose: {input_type: 'radio', name: 'loose', id: 'loose_radio_input', placeholder: 'Loose', value_datatype: 'boolean', value_choices: ['yes', 'no']},
            attached_to_wall: {input_type: 'radio', name: 'attached_to_wall', id: 'attached_to_wall_radio_input', placeholder: 'Attached To Wall', value_datatype: 'boolean', value_choices: ['yes', 'no']}
        },
        pct_loss_cross_section: {input_type: 'number', name: 'pct_loss_cross_section', id: 'pct_loss_cross_section_number_input', placeholder: '% loss of cross section', value_datatype: 'number', number: {step_interval: 1, min: 0}, value_choices: []}, // number as percentage
        continuous: {input_type: 'radio', name: 'continuous', id: 'continuous_radio_input', placeholder: 'Continuous', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    },
    standing_water: {input_type: 'radio', name: 'standing_water', id: 'standing_water_radio_input', placeholder: 'Standing Water', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if__standing_water: {
        start: {input_type: 'number', name: 'standing_water_start', id: 'standing_water_start_number_input', placeholder: 'Start Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // number in ft
        end: {input_type: 'number', name: 'standing_water_end', id: 'standing_water_end_number_input', placeholder: 'End Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []} // number in ft
    },
    under_water: {input_type: 'radio', name: 'under_water', id: 'under_water_radio_input', placeholder: 'Under Water', value_datatype: 'boolean', value_choices: ['yes', 'no']},
    if__under_water: {
        start: {input_type: 'number', name: 'under_water_start', id: 'under_water_start_number_input', placeholder: 'Start Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []}, // ft
        end: {input_type: 'number', name: 'under_water_end', id: 'under_water_end_number_input', placeholder: 'End Footage', value_datatype: 'number', number: {step_interval: 0.1, min: 0}, value_choices: []} // ft
    },
    pipe_issue: {
        crack: {input_type: 'radio', name: 'crack', id: 'pipe_issue__crack_radio_input', placeholder: 'Crack (is whack)', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        separated_joint: {input_type: 'radio', name: 'separated_joint', id: 'pipe_issue__separated_joint_radio_input', placeholder: 'Separated Joint', value_datatype: 'boolean', value_choices: ['yes', 'no']},
        hole: {input_type: 'radio', name: 'hole', id: 'pipe_issue__hole_radio_input', placeholder: 'Hole', value_datatype: 'boolean', value_choices: ['yes', 'no']}
    },
    observations: {input_type: 'textarea', name: 'observations', id: 'observations_textarea_input', placeholder: 'Additional Observations', value_datatype: 'string', value_choices: []}
}
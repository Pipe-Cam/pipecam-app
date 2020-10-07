const inputElements = {
    overview: {
        job_overview: {
            inspection_date: {input_type: 'date', name: 'inspection_date', placeholder: 'Today\'s Date', value_datatype: 'date', value_choices: []},
            property_address: {input_type: 'text', name: 'property_address', placeholder: 'Property Address', value_datatype: 'string', value_choices: []}, // user input string
            opening_observations: {input_type: 'textarea', name: 'opening_observations', placeholder: 'Opening Observations', value_datatype: 'string', value_choices: []},
            prelisting: {input_type: 'radio', name: 'prelisting', placeholder: 'Prelisting', value_datatype: 'boolean', value_choices: [true, false]},
            check_num: {input_type: 'number', name: 'check_num', placeholder: 'Check#', value_datatype: 'number', value_choices: []}, // number
            online: {input_type: 'radio', name: 'online', placeholder: 'Online', value_datatype: 'boolean', value_choices: [true, false]},
            cc_attached: {input_type: 'radio', name: 'cc_attached', placeholder: 'CC Attached', value_datatype: 'boolean', value_choices: [true, false]},
            usb_num: {input_type: 'number', name: 'usb_num', placeholder: 'USB#', value_datatype: 'number', value_choices: []}
        },
        job_location: {
            occupancy: {input_type: 'checkbox', name: 'occupancy', placeholder: 'occupancy', value_datatype: 'string', value_choices: ['occupied', 'vacant', 'unknown']},
            outbuilding: {input_type: 'radio', name: 'online', placeholder: 'Online', value_datatype: 'boolean', value_choices: [true, false]},
            if_outbuilding: {
                has_plumbing: {input_type: 'radio', name: 'has_plumbing', placeholder: 'Has Plumbing', value_datatype: 'boolean', value_choices: [true, false]},
                if_has_plumbing: {
                    cleanout: {input_type: 'radio', name: 'cleanout', placeholder: 'Cleanout', value_datatype: 'boolean', value_choices: [true, false]},
                    pipe_diameter: {input_type: 'checkbox', name: 'pipe_diameter', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: [ '3', '4', 'other' ]},
                    pipe_diameter_if_other:  {input_type: 'text', name: 'pipe_diameter_if_other', placeholder: 'Other', value_datatype: 'string', value_choices: []}
                }
            },
            cccusd: {input_type: 'radio', name: 'cccusd', placeholder: 'CCCUSD', value_datatype: 'boolean', value_choices: [true, false]},
            if_cccsd: {
                unpermitted_work: {input_type: 'radio', name: 'unpermitted_work', placeholder: 'Unpermitted Work', value_datatype: 'boolean', value_choices: [true, false]}
            },
            push_to_main_rewrite: {input_type: 'radio', name: 'push_to_main_rewrite', placeholder: 'Push To Main Rewrite', value_datatype: 'boolean', value_choices: [true, false]}
        },    
        access_location: {
            location: {input_type: 'checkbox', name: 'location', placeholder: 'Location', value_datatype: 'string', value_choices: ['foundation_edge', 'property_line']}, 
            location_position: {input_type: 'checkbox', name: 'location_position', placeholder: 'Location Position', value_datatype: 'string', value_choices: ['front', 'back', 'left', 'right']},
            location_position_modifier: {input_type: 'checkbox', name: 'location_position_modifier', placeholder: 'Location Position Modifier', value_datatype: 'string', value_choices: ['of_residence', 'corner', 'under_window']},
            entry: {input_type: 'checkbox', name: 'entry', placeholder: 'Entry', value_datatype: 'string', value_choices: ['left', 'right']}, 
            porch: {input_type: 'checkbox', name: 'porch', placeholder: 'Porch', value_datatype: 'string', value_choices: ['left', 'right']},
            walk: {input_type: 'checkbox', name: 'walk', placeholder: 'Walk', value_datatype: 'string', value_choices: ['left', 'right']}, 
            'in': {input_type: 'radio', name: 'in', placeholder: 'In', value_datatype: 'boolean', value_choices: [true, false]},
            under_deck: {input_type: 'radio', name: 'under_deck', placeholder: 'Under Deck', value_datatype: 'boolean', value_choices: [true, false]},
            under: {input_type: 'text', name: 'under', placeholder: 'Under', value_datatype: 'string', value_choices: []}

        },
        access_details: {
            pipe_diameter: {input_type: 'checkbox', name: 'pipe_diameter', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: ['3','4','6']},  // number in in
            direction: {input_type: 'checkbox', name: 'direction', placeholder: 'Direction', value_datatype: 'string', value_choices: ['one_way', 'two_way']}, 
            location: {input_type: 'checkbox', name: 'location', placeholder: 'Location', value_datatype: 'string', value_choices: ['stub','break_in','roof']}, 
            bopd: {input_type: 'checkbox', name: 'bopd', placeholder: 'BOPD', value_datatype: 'string', value_choices: ['none','check_valve','mushroom','popper','relief']}, 
            access_material: {input_type: 'checkbox', name: 'access_material', placeholder: 'Access Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg']}, 
            initial_pipe_material: {input_type: 'checkbox', name: 'initial_pipe_material', placeholder: 'Initial Pipe Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg','hdpe']}, 
            clean_out: {input_type: 'checkbox', name: 'clean_out', placeholder: 'Clean Out', value_datatype: 'string', value_choices: ['below_grade','excess_vegetation']}, 
            bopd_condition: {input_type: 'checkbox', name: 'bopd_condition', placeholder: 'BOPD Condition', value_datatype: 'string', value_choices: ['broken','missing','ball','too_low','too_high']}
        }
    },
    observations: {
        footage: {input_type: 'number', name: 'footage', placeholder: 'Footage', value_datatype: 'number', value_choices: []}, // number in ft
        blockage: {
            roots: {input_type: 'radio', name: 'roots', placeholder: 'Roots', value_datatype: 'boolean', value_choices: [true, false]},
            debris: {input_type: 'radio', name: 'debris', placeholder: 'Debris', value_datatype: 'boolean', value_choices: [true, false]},
            if_debris: {
                loose: {input_type: 'radio', name: 'loose', placeholder: 'Loose', value_datatype: 'boolean', value_choices: [true, false]},
                attached_to_wall: {input_type: 'radio', name: 'attached_to_wall', placeholder: 'Attached To Wall', value_datatype: 'boolean', value_choices: [true, false]}
            },
            pct_loss_cross_section: {input_type: 'number', name: 'pct_loss_cross_section', placeholder: '% loss of cross section', value_datatype: 'number', value_choices: []}, // number as percentage
            continuous: {input_type: 'radio', name: 'continuous', placeholder: 'Continuous', value_datatype: 'boolean', value_choices: [true, false]}
        },
        standing_water: {input_type: 'radio', name: 'standing_water', placeholder: 'Standing Water', value_datatype: 'boolean', value_choices: [true, false]},
        if_standing_water: {
            start: {input_type: 'number', name: 'standing_water_start', placeholder: 'Start Footage', value_datatype: 'number', value_choices: []}, // number in ft
            end: {input_type: 'number', name: 'standing_water_end', placeholder: 'End Footage', value_datatype: 'number', value_choices: []} // number in ft
        },
        under_water: {input_type: 'radio', name: 'under_water', placeholder: 'Under Water', value_datatype: 'boolean', value_choices: [true, false]},
        if_under_water: {
            start: {input_type: 'number', name: 'under_water_start', placeholder: 'Start Footage', value_datatype: 'number', value_choices: []}, // ft
            end: {input_type: 'number', name: 'under_water_end', placeholder: 'End Footage', value_datatype: 'number', value_choices: []} // ft
        },
        pipe_issue: {
            crack: {input_type: 'radio', name: 'crack', placeholder: 'Crack', value_datatype: 'boolean', value_choices: [true, false]},
            separated_joint: {input_type: 'radio', name: 'separated_joint', placeholder: 'Separated Joint', value_datatype: 'boolean', value_choices: [true, false]},
            hole: {input_type: 'radio', name: 'hole', placeholder: 'Hole', value_datatype: 'boolean', value_choices: [true, false]}
        },
        observations: {input_type: 'textarea', name: 'observations', placeholder: 'Observations', value_datatype: 'string', value_choices: []}
    }
}

export default inputElements;

// // inspector's narration worksheet PAGE 1
// const inspectionOverview = {
//     job_overview: {
//         inspection_date: '', // date
//         property_address: '', // user input string
//         opening_observations: '',
//         prelisting: [ true, false ],
//         check_num: '', // number
//         online: [ true, false ],
//         cc_attached: [ true, false ],
//         usb_num: '' // number
//     },
//     job_location: {
//         occupancy: [ 'occupied', 'vacant', 'unknown' ],
//         outbuilding: [ true, false ],
//         if_outbuilding: {
//             has_plumbing: [ true, false ],
//             if_has_plumbing: {
//                 cleanout: [ true, false ],
//                 pipe_diameter: [ '3', '4', 'other' ],
//                 pipe_diameter_if_other: '' // user input string
//             }
//         },
//         cccusd: [ true, false ],
//         if_cccsd: {
//             unpermitted_work: [ true, false ]
//         },
//         push_to_main_rewrite: [ true, false ]
//     },    
//     access_location: {
//         location: ['foundation_edge', 'property_line'],
//         location_position: [ 'front', 'back', 'left', 'right'],
//         location_position_modifier: ['of_residence', 'corner', 'under_window' ],
//         entry: [ 'left', 'right' ],
//         porch: [ 'left', 'right' ],
//         walk: [ 'left', 'right' ],
//         'in': [ true, false ],
//         under_deck: [ true, false ],
//         under: '' // user input string
//     },
//     access_details: {
//         pipe_diameter: ['3','4','6'], // number in ft
//         direction: ['one_way', 'two_way'],
//         location: ['stub','break_in','roof'],
//         bopd: ['none','check_valve','mushroom','popper','relief'],
//         access_material: ['ci','abs','vcp','pvc','orbg'],
//         initial_pipe_material: ['ci','abs','vcp','pvc','orbg','hdpe'],
//         clean_out: ['below_grade','excess_vegetation'],
//         bopd_condition: ['broken','missing','ball','too_low','too_high']
//     }
// }

// // inspector's narration worksheet PAGE 2
// const inspectionObservations = {
//     footage: '', // number in ft
//     blockage: {
//         roots: [ true, false ],
//         debris: [ true, false],
//         if_debris: {
//             loose: [ true, false],
//             attached_to_wall: [ true, false ]
//         },
//         pct_loss_cross_section: '', // number as percentage
//         continuous: [ true, false ]
//     },
//     standing_water: [ true, false ],
//     if_standing_water: {
//         start: '', // number in ft
//         end: '' // number in ft
//     },
//     under_water: [ true, false ],
//     if_under_water: {
//         start: '', // ft
//         end: '' // ft
//     },
//     pipe_issue: {
//         crack: [ true, false ],
//         separated_joint: [ true, false ],
//         hole: [ true, false ]
//     },
//     observations: '' // user input string
// }

// // immediate corrective action
// const immediateCorrectiveAction = {}

// form inputs generation details
// {input_type: '', name: '', placeholder: '', value_datatype: '', value_choices: []}
// {input_type: 'checkbox', name: '', placeholder: '', value_datatype: '', value_choices: []}
// {input_type: 'text', name: '', placeholder: '', value_datatype: '', value_choices: []}
// {input_type: 'number', name: '', placeholder: '', value_datatype: 'number', value_choices: []}
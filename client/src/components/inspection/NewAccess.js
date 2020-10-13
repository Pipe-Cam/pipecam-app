import React from 'react'

function NewAccess() {
    const handleUpdateNewAccessState = () => {
        console.log('handleUpdateNewAccessState')
    }

    return (
        <>
            <div className="row justify-content-center py-5">
                <div className="col col-12">
                    <AccessLocation handleUpdateNewAccessState={handleUpdateNewAccessState}/>
                </div>
            </div>
            <div className="row justify-content-center py-5">
                <div className="col col-12">
                    <AccessDetails handleUpdateNewAccessState={handleUpdateNewAccessState}/>
                </div>
            </div>
            <div className="row justify-content-center py-5">
                <div className="col col-12">
                    <button className="btn-primary btn-lg float-right" type="submit" name="submit">&nbsp; Add Access &nbsp;</button>
                </div>
            </div>
        </>
    )
}

export default NewAccess


const accessLocation = {
    location: {input_type: 'radio', name: 'location', id: 'location_checkbox_input', placeholder: 'Location', value_datatype: 'string', value_choices: ['foundation_edge', 'property_line'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    location_position: {input_type: 'checkbox', name: 'location_position', id: 'location_position_checkbox_input', placeholder: 'Location Position', value_datatype: 'string', value_choices: ['front', 'back', 'left', 'right'], depends_on_id: '', has_children: false, display: 'inherit'},
    location_position_modifier: {input_type: 'checkbox', name: 'location_position_modifier', id: 'location_position_modifier_checkbox_input', placeholder: 'Location Position Modifier', value_datatype: 'string', value_choices: ['of_residence', 'corner', 'under_window'], depends_on_id: '', has_children: false, display: 'inherit'},
    entry: {input_type: 'radio', name: 'entry', id: 'entry_checkbox_input', placeholder: 'Entry', value_datatype: 'string', value_choices: ['left', 'right', 'none'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    porch: {input_type: 'radio', name: 'porch', id: 'porch_checkbox_input', placeholder: 'Porch', value_datatype: 'string', value_choices: ['left', 'right', 'none'], depends_on_id: '', has_children: false, display: 'inherit'},
    walk: {input_type: 'radio', name: 'walk', id: 'walk_checkbox_input', placeholder: 'Walk', value_datatype: 'string', value_choices: ['left', 'right', 'none'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    'in': {input_type: 'radio', name: 'in', id: 'in_radio_input', placeholder: 'In', value_datatype: 'boolean', value_choices: ['yes', 'no'], depends_on_id: '', has_children: false, display: 'inherit'},
    under_deck: {input_type: 'radio', name: 'under_deck', id: 'under_deck_radio_input', placeholder: 'Under Deck', value_datatype: 'boolean', value_choices: ['yes', 'no'], depends_on_id: '', has_children: false, display: 'inherit'},
    under: {input_type: 'text', name: 'under', id: 'under_text_input', placeholder: 'Under', value_datatype: 'string', value_choices: [], depends_on_id: '', has_children: false, display: 'inherit'}
}


const AccessLocation = (props) => {
    const {handleUpdateNewAccessState} = props

    return(
        <div className="mt-3 pt-3 pb-2 px-4 border">
            <h1>New Access</h1>
            <div className="p-4 my-3 border">
                <h3>Access Location</h3>
                <div className="my-5">
                    <div className="h6">Location</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'foundation_edge'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Foundation Edge</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'property_line'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Property Line</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Location Position</div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="front" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Front</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="back" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Back</label>
                    </div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="left" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Left</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="right" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Right</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Location Position Modifier</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="of_residence" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Of Residence</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="corner" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Corner</label>
                    </div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="under_window" onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Under Window</label>
                    </div>

                </div>

                <div className="my-5">
                    <div className="h6">Entry</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'left'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'right'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'none', checked: true}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Porch</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'left'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'right'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'none', checked: true}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Walk</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'left'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'right'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'none', checked: true}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">In</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'yes'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'no'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Under Deck</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'yes'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">Yes</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'no'}} onChange={handleUpdateNewAccessState}/>
                        <label className="form-check-label radio-button-label">No</label>
                    </div>
                </div>

                <div>
                    <label className="h6" htmlFor='property_address'>Under</label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'property_address', id: 'property_address_text_input'}} onChange={handleUpdateNewAccessState}/>
                </div>
            </div>
        </div>
    )
}


const accessDetails = {
    pipe_diameter: {input_type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_checkbox_input', placeholder: 'Pipe Diameter', value_datatype: 'string', value_choices: ['3','4','6'], depends_on_id: '', has_children: false, display: 'inherit'},  // number in in
    direction: {input_type: 'radio', name: 'direction', id: 'direction_checkbox_input', placeholder: 'Direction', value_datatype: 'string', value_choices: ['one_way', 'two_way'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    location: {input_type: 'radio', name: 'location', id: 'location_checkbox_input', placeholder: 'Location', value_datatype: 'string', value_choices: ['stub','break_in','roof'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    bopd: {input_type: 'radio', name: 'bopd', id: 'bopd_checkbox_input', placeholder: 'BOPD', value_datatype: 'string', value_choices: ['none','check_valve','mushroom','popper','relief'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    access_material: {input_type: 'radio', name: 'access_material', id: 'access_material_checkbox_input', placeholder: 'Access Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    initial_pipe_material: {input_type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_checkbox_input', placeholder: 'Initial Pipe Material', value_datatype: 'string', value_choices: ['ci','abs','vcp','pvc','orbg','hdpe'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    clean_out: {input_type: 'checkbox', name: 'clean_out', id: 'clean_out_checkbox_input', placeholder: 'Clean Out', value_datatype: 'string', value_choices: ['below_grade','excess_vegetation'], depends_on_id: '', has_children: false, display: 'inherit'}, 
    bopd_condition: {input_type: 'checkbox', name: 'bopd_condition', id: 'bopd_condition_checkbox_input', placeholder: 'BOPD Condition', value_datatype: 'string', value_choices: ['broken','missing','ball','too_low','too_high'], depends_on_id: '', has_children: false, display: 'inherit'}
}

const AccessDetails = (props) => {
    const {handleUpdateNewAccessState} = props

    return(
        <div className="p-4 my-3 border">
            <h3>Access Details</h3>
            <div className="my-5">
                <div className="h6">Pipe Diameter</div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: '3'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">3"</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: '4'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">4"</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: '6'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">6"</label>
                </div>
            </div>
            <div className="my-5">
                <div className="h6">Direction</div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'one_way'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">One Way</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'two_way'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">Two Way</label>
                </div>
            </div>
            <div className="my-5">
                <div className="h6">Opening</div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="stub" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Stub</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="break_in" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Break In</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="roof" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Roof</label>
                </div>

            </div>
            <div className="my-5">
                <div className="h6">BOPD</div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'none'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">None</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'check_valve'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">Check Valve</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'mushroom'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">Mushroom</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'popper'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">Popper</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'relief'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">Relief</label>
                </div>
            </div>

            <div className="my-5">
                <div className="h6">BOPD Condition</div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="broken" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Broken</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="missing" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Missing</label>
                </div>

                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="ball" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Ball</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="too_low" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Too Low</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="too_high" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Too High</label>
                </div>
            </div>

            <div className="my-5">
                <div className="h6">Access Material</div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'ci'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">CI</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'abs'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">ABS</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'vcp'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">VCP</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'pvc'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">PVC</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'orbg'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">ORBG</label>
                </div>
            </div>
            <div className="my-5">
                <div className="h6">Initial Pipe Material</div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'ci'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">CI</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'abs'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">ABS</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'vcp'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">VCP</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'pvc'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">PVC</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: '', id: '', value: 'orbg'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">ORBG</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'prelisting', id: 'prelisting_radio_input', value: 'hdpe'}} onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label">HDPE</label>
                </div>
            </div>

            <div className="my-5">
                <div className="h6">Clean Out</div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox1" value="below_grade" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox1">Below Grade</label>
                </div>
                <div className="form-check form-check-inline mr-5">
                    <input className="form-check-input radio-button" type="checkbox" id="inlineCheckbox2" value="excess_vegetation" onChange={handleUpdateNewAccessState}/>
                    <label className="form-check-label radio-button-label" htmlFor="inlineCheckbox2">Excess Vegetation</label>
                </div>
            </div>
        </div>
    )
}
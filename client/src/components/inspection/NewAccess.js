import React, {useContext, useState} from 'react'
import Observations from './Observations'
import InspectionContext from '../../context/InspectionContext'

function NewAccess() {
    const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const [newAccessState, setNewAccessState] = useState({location: {}, details: {}, observations: []})
    const [accessNumber, setAccessNumber] = useState(0)

    const handleNewAccessLocationState = (e) => {
        console.log('handleNewAccessLocationState')
        let objBranch = 'location'
        let name = e.target.name
        let type = e.target.type
        let id = e.target.id
        console.log(name, e.target.value, type, id)
        
        let tmpAccessLocation = newAccessState
        
        if(name){
            tmpAccessLocation[objBranch][name] = e.target.value
        } else {
            tmpAccessLocation[objBranch][id] = e.target.value
        }
        
        setNewAccessState({...tmpAccessLocation})
        console.log(newAccessState)

    }
    
    const handleNewAccessDetailsState = (e) => {
        console.log('handleNewAccessLocationState')
        let objBranch = 'details'
        let name = e.target.name
        let type = e.target.type
        let id = e.target.id
        console.log(name, e.target.value, type, id)
        
        let tmpAccessDetails = newAccessState
        
        if(name){
            tmpAccessDetails[objBranch][name] = e.target.value
        } else {
            tmpAccessDetails[objBranch][id] = e.target.value
        }
        
        setNewAccessState({...tmpAccessDetails})
        console.log(newAccessState)
    }

    const disableButton = (btnId) => {
        document.getElementById(btnId).setAttribute('disabled', true)
    }

    const handleCreateAccess = (e) => {
        e.preventDefault()
        disableButton('add_access_btn')

        let newAccessNum = Object.keys(job.access).length + 1
        setAccessNumber(newAccessNum)

        let tmpJob = job;
        tmpJob['access'][newAccessNum.toString()] = newAccessState
        setJob(tmpJob)
        setAppNav('observations')
    }

    if(appNav === 'new_access'){
        return (
            <>
                <h1>New Access</h1>
                <div className="border px-4 py-3">
                    <form onSubmit={handleCreateAccess}>
                        <div className="row justify-content-center">
                            <div className="col col-12">
                                <AccessLocation {...{handleNewAccessLocationState}} />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col col-12">
                                <AccessDetails {...{handleNewAccessDetailsState}} />
                            </div>
                        </div>
                        <div className="row justify-content-center mt-3">
                            <div className="col col-12">
                                <button id="add_access_btn" className="btn-primary btn-lg float-right" type="submit" name="submit">&nbsp; Add Access &nbsp;</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    } else if(appNav === 'observations') {
        return(
            <Observations {...{accessNumber}}/>
        )
    }

}

export default NewAccess


const AccessLocation = (props) => {
    const {handleNewAccessLocationState} = props
   
    return(
        <div className="py-3 px-4 border">
            <div className="">
                <h3>Access Location</h3>
                <div className="my-5">
                    <div className="h6">Location</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'location', id: 'location_radio_foundation_edge', value: 'foundation_edge'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Foundation Edge</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'location', id: 'location_radio_property_line', value: 'property_line'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Property Line</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Location Position</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_front" value="front" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_front">Front</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_back" value="back" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_back">Back</label>
                    </div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_left" value="left" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_left">Left</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_right" value="right" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_right">Right</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Location Position Modifier</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_of_residence" value="of_residence" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_of_residence">Of Residence</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_corner" value="corner" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_corner">Corner</label>
                    </div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_under_window" value="under_window" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_under_window">Under Window</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_in" value="in" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_in">In</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_under_deck" value="Under Deck" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_under_deck">Under Deck</label>
                    </div>
                </div>

                <div>
                    <label className="h6" htmlFor='location_position_modifier_text_manual'>Location Position Modifier (specify)</label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'location_position_modifier_manual', id: 'location_position_modifier_manual', placeholder: 'optional'}} onChange={handleNewAccessLocationState}/>
                </div>

                <div className="my-5">
                    <div className="h6">Entry</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_none', value: 'none'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Porch</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_none', value: 'none'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Walk</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_none', value: 'none'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AccessDetails = (props) => {
    const {handleNewAccessDetailsState} = props

    return(

        <div className="py-3 px-4 border">
            <div className="">
                <h3>Access Details</h3>
                <div className="my-5">
                    <div className="h6">Pipe Diameter</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_3', value: '3'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">3"</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_4', value: '4'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">4"</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_6', value: '6'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">6"</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Direction</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'direction', id: 'direction_one_way', value: 'one_way'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">One Way</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'direction', id: 'direction_two_way', value: 'two_way'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Two Way</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Opening Modifier</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="opening_stub" value="stub" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="opening_stub">Stub</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="opening_break_in" value="break_in" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="opening_break_in">Break In</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="opening_roof" value="roof" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="opening_roof">Roof</label>
                    </div>

                </div>
                <div className="my-5">
                    <div className="h6">BOPD</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_none', value: 'none'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_check_valve', value: 'check_valve'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Check Valve</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_mushroom', value: 'mushroom'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Mushroom</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_popper', value: 'popper'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Popper</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_relief', value: 'relief'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Relief</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">BOPD Condition</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="bopd_condition_broken" value="broken" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="bopd_condition_broken">Broken</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="bopd_condition_missing" value="missing" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="bopd_condition_missing">Missing</label>
                    </div>

                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="bopd_condition_ball" value="ball" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="bopd_condition_ball">Ball</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-button" type="checkbox" id="bopd_condition_too_low" value="too_low" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="bopd_condition_too_low">Too Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input radio-button" type="checkbox" id="bopd_condition_too_high" value="too_high" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="bopd_condition_too_high">Too High</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Access Material</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_ci', value: 'ci'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">CI</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_abs', value: 'abs'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">ABS</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_vcp', value: 'vcp'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">VCP</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_pvc', value: 'pvc'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">PVC</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_orbg', value: 'orbg'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">ORBG</label>
                    </div>
                </div>
                <div className="my-5">
                    <div className="h6">Initial Pipe Material</div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_ci', value: 'ci'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">CI</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_abs', value: 'abs'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">ABS</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_vcp', value: 'vcp'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">VCP</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_pvc', value: 'pvc'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">PVC</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_orbg', value: 'orbg'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">ORBG</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_hdpe', value: 'hdpe'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">HDPE</label>
                    </div>
                </div>

                <div className="my-5">
                    <div className="h6">Clean Out</div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="clean_out_below_grade" value="below_grade" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="clean_out_below_grade">Below Grade</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input className="form-check-input radio-button" type="checkbox" id="clean_out_excess_vegetation" value="excess_vegetation" onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label" htmlFor="clean_out_excess_vegetation">Excess Vegetation</label>
                    </div>
                </div>
            </div>
        </div>


    )
}
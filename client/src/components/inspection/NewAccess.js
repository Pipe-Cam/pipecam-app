import React, {useState, useEffect, useRef} from 'react'
import {useHistory, useParams} from 'react-router-dom'

import {getInspectionById} from '../../db/read'
import {updateInspectionById} from '../../db/write'
// import ObservationHome from './ObservationHome'
// import InspectionContext from '../../context/InspectionContext'

// TODO: 
// x. load ui
// x. form elements save to state onChange behavior
// x. get inspectionData from database
// x. handle undefined query string
// x. determine if access data exists,
// x. determine if access[accessNumber] exists, if yes then load access values into form
// 7. onSubmit, save access state data to db
// 8. redirect back to /access/:id

function NewAccess() {
    // const {job, setJob, appNav, setAppNav} = useContext(InspectionContext)
    const [inspectionData, setInspectionData] = useState(null)
    const newAccessPlaceholder = {location: {}, details: {}, observations: []}
    const [newAccessState, setNewAccessState] = useState(newAccessPlaceholder)
    const [accessNumber, setAccessNumber] = useState(null)
    
    let {id} = useParams()
    let history = useHistory()
    
    useEffect(()=>{
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)
        let accessNum = urlParams.get('access')

        if(!isNaN(accessNum) && accessNum !== null){
            setAccessNumber(accessNum)
        }

        getInspectionDataOnLoad(id, accessNum)

    },[])

    useEffect(() => {
        if(inspectionData){
            console.log(inspectionData)

            let accessDataExists = doesAccessObjExist(inspectionData)
            console.log('access data exists: ', accessDataExists)
            let accessNumberExists = false;

            if(accessDataExists){
                accessNumberExists = doesAccessNumberExist(accessNumber, inspectionData)
            }

            if(accessNumberExists){
                preloadFormData()
            }
        }
    }, [, inspectionData])

    const doesAccessObjExist = (data) => {
        let dataKeys = Object.keys(data)
        return dataKeys.includes('access')
    }

    const doesAccessNumberExist = (accessNum, data) => {
        let dataKeys = Object.keys(data)
        return dataKeys.includes(accessNum)
    }

    const getInspectionDataOnLoad = async (id, accessNum) => {
        console.log(id)
        console.log(accessNum)
        let inspectionDataJSON = await getInspectionById(id)
        var inspectionDataObj;

        try {
            inspectionDataObj = JSON.parse(inspectionDataJSON)[0]
            // console.log(inspectionDataObj)
            setInspectionData(inspectionDataObj)
        } catch(err){
            console.log(err)
        } 
    }

    const preloadFormData = () => {
        try {
            let accessData = inspectionData.access.accessNumber
            let accessDataKeys = Object.keys(accessData)

            accessDataKeys.forEach(item => {
                document.getElementById(item).value = accessData[item]
            })
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateAccessStateOnChange = (e, objBranch) => {
        let name = e.target.id    
        let type = e.target.type
        let val = e.target.value

        if(type === 'checkbox'){
            val = e.target.checked
        }

        let tmpAccessState = newAccessState
        
        tmpAccessState[objBranch][name] = val
        setNewAccessState({...tmpAccessState})
        console.log(newAccessState)
    }

    const handleNewAccessLocationState = (e) => {
        console.log({name: e.target.id, value: e.target.value})

        if(e.target.value !== 'Select...'){
            let objBranch = 'location'
            handleUpdateAccessStateOnChange(e, objBranch)
        }
    }
    
    const handleNewAccessDetailsState = (e) => {
        console.log({name: e.target.id, value: e.target.value})

        if(e.target.value !== 'Select...'){
            let objBranch = 'details'
            handleUpdateAccessStateOnChange(e, objBranch)
        }
    }

    const disableButton = (btnId) => {
        document.getElementById(btnId).setAttribute('disabled', true)
    }

    const handleUpdateAccess = async (e) => {
        e.preventDefault()
        disableButton('add_access_btn')

        console.log("inspection id: ", id)
        console.log(newAccessState)
        console.log('accessNumber: ', accessNumber)

        var tmpAccessObj = {};
        if(inspectionData.access){
            tmpAccessObj = inspectionData.access
        }
        
        let useNumber = accessNumber
        if(isNaN(Number(accessNumber))){
            useNumber = "1"
        }

        tmpAccessObj[useNumber] = newAccessState
        await updateInspectionById(id, {access: tmpAccessObj, last_modified: new Date()})
        history.push(`/access/${id}`)
        window.location.reload()
    }

    // if(appNav === 'new_access'){
        return (
            <>
                <h1>New Access</h1>
                <div className="px-4 py-3">
                    <form onSubmit={handleUpdateAccess}>
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
                                <button className="btn-primary btn-lg float-right" type="submit" name="submit" id="add_access_btn">&nbsp; Add Access &nbsp;</button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        )
    // } else if(appNav === 'observations' || appNav === 'new_observation') {
    //     return(
    //         <ObservationHome {...{accessNumber, setAccessNumber}}/>
    //     )
    // }

}

export default NewAccess


const AccessLocation = (props) => {
    const {handleNewAccessLocationState} = props

    const locationRef = useRef(null)
    const entryRef = useRef(null)
    const walkRef = useRef(null)
    const porchRef = useRef(null)


    // useEffect(()=>{
    //     [walkRef, porchRef, entryRef, foundationEdgeRef].forEach(item => {
    //         handleNewAccessLocationStateDefault(item.current)
    //     })
    // }, [])

    return(
        <div className="py-3 px-4 border bg-foreground">
            <div className="">
                <h3>Access Location</h3>
                <div className="my-5">
                    <div className="h6">Location</div>
                    <select ref={locationRef} className="custom-select" id="location" onChange={handleNewAccessLocationState}>
                        <option>Select...</option>
                        <option value="foundation_edge">Foundation Edge</option>
                        <option value="property_line">Property Line</option>
                    </select>        
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={foundationEdgeRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'location', id: 'location_radio_foundation_edge', value: 'foundation_edge', defaultChecked: 'checked'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Foundation Edge</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'location', id: 'location_radio_property_line', value: 'property_line'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Property Line</label>
                    </div> */}
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
                        <input className="form-check-input radio-button" type="checkbox" id="location_position_modifier_under_deck" value="under_deck" onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label" htmlFor="location_position_modifier_under_deck">Under Deck</label>
                    </div>
                </div>

                <div>
                    <label className="h6" htmlFor='location_position_modifier_text_manual'>Location Position Modifier (specify)</label>
                    <input {...{className: 'form-control mb-3', type: 'text', name: 'location_position_modifier_manual', id: 'location_position_modifier_manual', placeholder: '(Optional)'}} onChange={handleNewAccessLocationState}/>
                </div>

                <div className="my-5">
                    <div className="h6">Entry</div>
                    <select ref={entryRef} className="custom-select" id="entry" defaultValue="none" onChange={handleNewAccessLocationState}>
                        {/* <option>Select...</option> */}
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="none">None</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={entryRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'entry', id: 'entry_checkbox_none', value: 'none', defaultChecked: 'checked'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div> */}
                </div>
                
                <div className="my-5">
                    <div className="h6">Porch</div>
                    <select ref={porchRef} className="custom-select" id="porch" defaultValue="none" onChange={handleNewAccessLocationState}>
                        {/* <option>Select...</option> */}
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="none">None</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={porchRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'porch', id: 'porch_checkbox_none', value: 'none', defaultChecked: 'checked'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div> */}
                </div>
                
                <div className="my-5">
                    <div className="h6">Walk</div>
                    <select ref={walkRef} className="custom-select" id="walk" defaultValue="none" onChange={handleNewAccessLocationState}>
                        {/* <option>Select...</option> */}
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                        <option value="none">None</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_left', value: 'left'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Left</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_right', value: 'right'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">Right</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input ref={walkRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'walk', id: 'walk_checkbox_none', value: 'none', defaultChecked: 'checked'}} onChange={handleNewAccessLocationState}/>
                        <label className="form-check-label radio-button-label">None</label>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

const AccessDetails = (props) => {
    const {handleNewAccessDetailsState} = props
    
    const pipeDiameterRef = useRef(null)
    const directionRef = useRef(null)
    const bopdRef = useRef(null)
    const accessMaterialRef = useRef(null)
    const initialPipeMaterialRef = useRef(null)

    // useEffect(()=>{
    //     [pipeDiameterRef,
    //     directionRef,
    //     bopdRef,
    //     accessMaterialRef,
    //     initialPipeMaterialRef].forEach(item => {
    //         handleNewAccessDetailsStateDefault(item.current)
    //     })

    // }, [])

    return(

        <div className="py-3 px-4 border bg-foreground">
            <div className="">
                <h3>Access Details</h3>
                <div className="my-5">
                    <div className="h6">Pipe Diameter</div>
                    <select ref={pipeDiameterRef} className="custom-select" id="pipe_diameter" onChange={handleNewAccessDetailsState}>
                        <option>Select...</option>
                        <option value="3">3"</option>
                        <option value="4">4"</option>
                        <option value="6">6"</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={pipeDiameterRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_3', value: '3', defaultChecked: 'checked'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">3"</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_4', value: '4'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">4"</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'pipe_diameter', id: 'pipe_diameter_6', value: '6'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">6"</label>
                    </div> */}
                </div>
                <div className="my-5">
                    <div className="h6">Direction</div>
                    <select ref={directionRef} className="custom-select" id="direction" onChange={handleNewAccessDetailsState}>
                        <option>Select...</option>
                        <option value="one_way">One-Way</option>
                        <option value="two_way">Two-Way</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={directionRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'direction', id: 'direction_one_way', value: 'one_way', defaultChecked: 'checked'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">One Way</label>
                    </div>
                    <div className="form-check form-check-inline mr-5">
                        <input {...{className: 'form-check-input radio-button', type: 'radio', name: 'direction', id: 'direction_two_way', value: 'two_way'}} onChange={handleNewAccessDetailsState}/>
                        <label className="form-check-label radio-button-label">Two Way</label>
                    </div> */}
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
                    <select ref={bopdRef} className="custom-select" id="bopd" defaultValue="none" onChange={handleNewAccessDetailsState}>
                        {/* <option>Select...</option> */}
                        <option value="none">None</option>
                        <option value="check_valve">Check Valve</option>
                        <option value="mushroom">Mushroom</option>
                        <option value="popper">Popper</option>
                        <option value="relief">Relief</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={bopdRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'bopd', id: 'bopd_none', value: 'none', defaultChecked: 'checked'}} onChange={handleNewAccessDetailsState}/>
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
                    </div> */}
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
                    <select ref={accessMaterialRef} className="custom-select" id="access_material" onChange={handleNewAccessDetailsState}>
                        <option>Select...</option>
                        <option value="ci">CI</option>
                        <option value="ac">AC</option>
                        <option value="abs">ABS</option>
                        <option value="vcp">VCP</option>
                        <option value="pvc">PVC</option>
                        <option value="orbg">ORBG</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={accessMaterialRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'access_material', id: 'access_material_ci', value: 'ci', defaultChecked: 'checked'}} onChange={handleNewAccessDetailsState}/>
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
                    </div> */}
                </div>
                <div className="my-5">
                    <div className="h6">Initial Pipe Material</div>
                    <select ref={initialPipeMaterialRef} className="custom-select" id="initial_pipe_material" onChange={handleNewAccessDetailsState}>
                        <option>Select...</option>
                        <option value="ci">CI</option>
                        <option value="ac">AC</option>
                        <option value="abs">ABS</option>
                        <option value="vcp">VCP</option>
                        <option value="pvc">PVC</option>
                        <option value="orbg">ORBG</option>
                        <option value="hdpe">HDPE</option>
                    </select> 
                    {/* <div className="form-check form-check-inline mr-5">
                        <input ref={initialPipeMaterialRef} {...{className: 'form-check-input radio-button', type: 'radio', name: 'initial_pipe_material', id: 'initial_pipe_material_ci', value: 'ci', defaultChecked: 'checked'}} onChange={handleNewAccessDetailsState}/>
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
                    </div> */}
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